import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { Subject } from 'rxjs/internal/Subject';
import { AuthorService } from '../../../service/author.service';
import { EntityDataSource } from '../../../model/entity-datasource';
import { Author } from '../../../model/author';
import { EditAuthorComponent } from '../edit-author/edit-author.component';
import { MatDialog } from '@angular/material/dialog';
import { DeleteAuthorComponent } from '../delete-author/delete-author.component';
import { MessageService } from 'src/app/service/message.service';
import { MessageButtonGroup, MessageType } from 'src/app/model/message';

@Component({
  selector: 'app-author-table',
  templateUrl: './author-table.component.html',
  styleUrls: ['./author-table.component.scss']
})
export class AuthorTableComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<Author>;
  dataSource: EntityDataSource<Author>;
  searchText: string = '';
  searchSubject$ = new Subject<string>();

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'firstname', 'lastname', 'action'];

  /**
   * Constructor.
   * @param dialog        MatDialog.
   * @param authorService author service.
   */
  constructor(
    public dialog: MatDialog,
    private authorService: AuthorService,
    private messageService: MessageService
  ) {
    // init empty datasource
    this.dataSource = new EntityDataSource([], this.searchSubject$);
  }

  /**
   * Initializes the content of a component.
   */
  ngOnInit(): void {
    // load data from API
    this.authorService.getAllAuthors().subscribe({
      next: data => {
        // redefine the datasource
        this.dataSource = new EntityDataSource(data, this.searchSubject$);
        this.refreshTable();
      }
    });
  }

  /**
   * Updates table when the content has changed.
   */
  ngAfterViewInit(): void {
    this.refreshTable();
  }

  /**
   * Emits changed value to trigger reload of table.
   * @param $event changed value.
   */
  onSearchInputChange($event:string): void {
    // emit changed value
    this.searchSubject$.next($event);
  }

  /**
   * Adds a new author.
   */
  addNewAuthor(): void {
    const newAuthor = new Author(undefined, '', '');
    const dialogRef = this.dialog.open(EditAuthorComponent, {
      data: {author: newAuthor}
    });
    dialogRef.afterClosed().subscribe({
      next: (author) => {
        if (author) {
          // add a new author
         this.authorService.saveAuthor(author).subscribe({
            next: (savedAuthor) => {
              console.info('savedAuthor=', savedAuthor);
              this.dataSource.data.push(savedAuthor);
              // show confirmation message
              this.messageService.addMessage({
                type: MessageType.INFO,
                text: 'Author has been saved.',
                buttonGroup: MessageButtonGroup.OK,
                afterClose: (clickedButton) => {
                  // do nothing
                }
              });
            },
            complete: () => this.refreshTable()
          })
        }
      }
    });
  }

  /**
   * Edits given author.
   * @param author author to be edited.
   */
  editAuthor(author: Author): void {
    const dialogRef = this.dialog.open(EditAuthorComponent, {
      data: {author: author}
    });
    dialogRef.afterClosed().subscribe({
      next: (author) => {
        if (author) {
          // update author
         this.authorService.saveAuthor(author).subscribe({
            next: (savedAuthor) => {
              console.info('savedAuthor=', savedAuthor);
              // show confirmation message
              this.messageService.addMessage({
                type: MessageType.INFO,
                text: 'Author has been saved.',
                buttonGroup: MessageButtonGroup.OK,
                afterClose: (clickedButton) => {
                  // do nothing
                }
              });
            },
            complete: () => this.refreshTable()
          })
        }
      }
    });
  }

  /**
   * Deletes given author.
   * @param author author to be deleted.
   */
  deleteAuthor(author: Author): void {
    const dialogRef = this.dialog.open(DeleteAuthorComponent, {
      data: {author: author}
    });
    dialogRef.afterClosed().subscribe({
      next: (result) => {
        if (result && author.id) {
          // delete author
         this.authorService.deleteAuthor(author.id).subscribe({
            next: (result) => {
              console.info('deletedAuthor=', result);
              if (result) {
                const data = this.dataSource.data.filter((a) => a.id !== author.id);
                this.dataSource.data = data;
                // show confirmation message
                this.messageService.addMessage({
                  type: MessageType.INFO,
                  text: 'Author has been deleted.',
                  buttonGroup: MessageButtonGroup.OK,
                  afterClose: (clickedButton) => {
                    // do nothing
                  }
                });
              }
            },
            complete: () => this.refreshTable()
          })
        }
      }
    });
  }

  // private methods

  /**
   * Refreshes the table.
   */
  private refreshTable(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource ? this.dataSource : [];
    this.dataSource.contentChanged.next(true);
  }
}
