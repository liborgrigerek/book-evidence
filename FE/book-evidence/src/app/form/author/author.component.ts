import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { Subject } from 'rxjs/internal/Subject';
import { AuthorService } from '../../service/author.service';
import { EntityDataSource } from '../../model/entity-datasource';
import { Author } from '../../model/author';
import { EditAuthorComponent } from '../edit-author/edit-author.component';
import { MatDialog } from '@angular/material/dialog';

export interface AuthorDialogData {
  author : Author;
}

@Component({
  selector: 'app-author',
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.scss']
})
export class AuthorComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<Author>;
  dataSource: EntityDataSource<Author>;
  searchText: string = '';
  searchSubject$ = new Subject<string>();

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'firstname', 'lastname'];

  /**
   * Constructor.
   * @param dialog        MatDialog.
   * @param authorService author service.
   */
  constructor(
    public dialog: MatDialog,
    private authorService: AuthorService
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
              console.log('savedAuthor=', savedAuthor);
              this.dataSource.data.push(savedAuthor);
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
    this.table.dataSource = this.dataSource;  
  }
}
