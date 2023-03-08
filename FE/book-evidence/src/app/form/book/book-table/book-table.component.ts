import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { Subject } from 'rxjs/internal/Subject';
import { BookService } from '../../../service/book.service';
import { EntityDataSource } from '../../../model/entity-datasource';
import { Book } from '../../../model/book';
import { EditBookComponent } from '../edit-book/edit-book.component';
import { MatDialog } from '@angular/material/dialog';
import { DeleteBookComponent } from '../delete-book/delete-book.component';
import { MessageService } from 'src/app/service/message.service';
import { MessageButtonGroup, MessageType } from 'src/app/model/message';
import { Author } from 'src/app/model/author';
import { AuthorService } from 'src/app/service/author.service';

@Component({
  selector: 'app-book-table',
  templateUrl: './book-table.component.html',
  styleUrls: ['./book-table.component.scss']
})
export class BookTableComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<Book>;
  dataSource: EntityDataSource<Book>;
  searchText: string = '';
  searchSubject$ = new Subject<string>();
  allAuthors: Author[] = [];

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'author', 'title', 'releaseYear', 'description', 'action'];

  /**
   * Constructor.
   * @param dialog         MatDialog.
   * @param authorService  author service.
   * @param bookService    book service.
   * @param messageService mesage service.
   */
  constructor(
    public dialog: MatDialog,
    private authorService: AuthorService,
    private bookService: BookService,
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
      next: (authors) => this.allAuthors = authors.sort((a,b) => a.fullname.localeCompare(b.fullname)),
    });
    this.bookService.getAllBooks().subscribe({
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
   * Adds a new book.
   */
  addNewBook(): void {
    const newBook = new Book(undefined, undefined, '', undefined, '');
    const dialogRef = this.dialog.open(EditBookComponent, {
      data: {
        book: newBook,
        allAuthors: this.allAuthors
      }
    });
    dialogRef.afterClosed().subscribe({
      next: (book) => {
        if (book) {
          // add a new author
         this.bookService.saveBook(book).subscribe({
            next: (savedBook) => {
              console.info('savedBook=', savedBook);
              this.dataSource.data.push(savedBook);
              // show confirmation message
              this.messageService.addMessage({
                type: MessageType.INFO,
                text: 'Book has been saved.',
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
   * Edits given book.
   * @param book book to be edited.
   */
  editBook(book: Book): void {
    const dialogRef = this.dialog.open(EditBookComponent, {
      data: {book: book}
    });
    dialogRef.afterClosed().subscribe({
      next: (book) => {
        if (book) {
          // update author
         this.bookService.saveBook(book).subscribe({
            next: (savedBook) => {
              console.info('savedBook=', savedBook);
              // show confirmation message
              this.messageService.addMessage({
                type: MessageType.INFO,
                text: 'Book has been saved.',
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
   * Deletes given book.
   * @param book book to be deleted.
   */
  deleteBook(book: Book): void {
    const dialogRef = this.dialog.open(DeleteBookComponent, {
      data: {book: book}
    });
    dialogRef.afterClosed().subscribe({
      next: (result) => {
        if (result && book.id) {
          // delete book
         this.bookService.deleteBook(book.id).subscribe({
            next: (result) => {
              console.info('deletedBook=', result);
              if (result) {
                const data = this.dataSource.data.filter((a) => a.id !== book.id);
                this.dataSource.data = data;
                // show confirmation message
                this.messageService.addMessage({
                  type: MessageType.INFO,
                  text: 'Book has been deleted.',
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
    this.table.dataSource = this.dataSource;  
    this.dataSource.contentChanged.next(true);
  }
}
