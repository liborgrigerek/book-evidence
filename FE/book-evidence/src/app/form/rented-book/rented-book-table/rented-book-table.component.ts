import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { Subject } from 'rxjs/internal/Subject';
import { EntityDataSource } from '../../../model/entity-datasource';
import { EditRentedBookComponent } from '../edit-rented-book/edit-rented-book.component';
import { MatDialog } from '@angular/material/dialog';
import { DeleteRentedBookComponent } from '../delete-rented-book/delete-rented-book.component';
import { MessageService } from 'src/app/service/message.service';
import { MessageButtonGroup, MessageType } from 'src/app/model/message';
import { Book } from 'src/app/model/book';
import { Reader } from 'src/app/model/reader';
import { BookService } from 'src/app/service/book.service';
import { ReaderService } from 'src/app/service/reader.service';

@Component({
  selector: 'app-rented-book-table',
  templateUrl: './rented-book-table.component.html',
  styleUrls: ['./rented-book-table.component.scss']
})
export class RentedBookTableComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<Book>;
  dataSource: EntityDataSource<Book>;
  searchText: string = '';
  searchSubject$ = new Subject<string>();
  allBooks: Book[] = [];
  allReaders: Reader[] = [];

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['bookAuthor', 'bookTitle', 'reader', 'rentedWhen', 'rentedUntil', 'action'];

  /**
   * Constructor.
   * @param dialog            MatDialog.
   * @param bookService       book service.
   * @param readerService     reader service.
   */
  constructor(
    public dialog: MatDialog,
    private bookService: BookService,
    private readerService: ReaderService,
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
    this.loadData(true, true, true);
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
   * Adds a new rented book.
   */
  rentBook(): void {
    const rentedWhen = new Date();
    const rentedUntil = new Date();
    rentedUntil.setMonth(rentedWhen.getMonth()+1); // 1 month by default
    const dialogRef = this.dialog.open(EditRentedBookComponent, {
      data: {
        rentedBook : this.allBooks[0],
        allBooks: this.allBooks,
        allReaders: this.allReaders
      }
    });
    dialogRef.afterClosed().subscribe({
      next: (rentedBook) => {
        rentedBook.rentedWhen = rentedWhen;
        rentedBook.rentedUntil = rentedUntil;
        if (rentedBook) {
          // add a new rentedBook
          console.debug('rentedBook=', rentedBook);
          this.bookService.saveBook(rentedBook).subscribe({
            next: (savedRentedBook) => {
              console.debug('savedRentedBook=', savedRentedBook);
              this.loadData(false, false, true);
              // show confirmation message
              this.messageService.addMessage({
                type: MessageType.INFO,
                text: 'Book has been rented.',
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
   * Edits given rented book.
   * @param rentedBook rented book to be edited.
   */
  editRentedBook(rentedBook: Book): void {
    const dialogRef = this.dialog.open(EditRentedBookComponent, {
      data: {
        rentedBook: rentedBook
      }
    });
    dialogRef.afterClosed().subscribe({
      next: (rentedBook) => {
        if (rentedBook) {
          // update rented book
         this.bookService.saveBook(rentedBook).subscribe({
            next: (savedRentedBook) => {
              console.info('savedRentedBook=', savedRentedBook);
              // show confirmation message
              this.messageService.addMessage({
                type: MessageType.INFO,
                text: 'Entity has been saved.',
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
   * Deletes given rented book.
   * @param rentedBook rented book to be deleted.
   */
  deleteRentedBook(rentedBook: Book): void {
    const dialogRef = this.dialog.open(DeleteRentedBookComponent, {
      data: {rentedBook: rentedBook}
    });
    dialogRef.afterClosed().subscribe({
      next: (result) => {
        if (result && rentedBook.reader && rentedBook.reader.id) {
         rentedBook.reader = undefined;
         rentedBook.rentedWhen = undefined;
         rentedBook.rentedUntil = undefined;
         this.bookService.saveBook(rentedBook).subscribe({
            next: (result) => {
              console.info('deletedRentedBook=', result);
              if (result) {
                this.loadData(false, false, true);
                // show confirmation message
                this.messageService.addMessage({
                  type: MessageType.INFO,
                  text: 'Reader has returned a book.',
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

  private loadData(reloadBooks: boolean, reloadReaders: boolean, reloadRentedBooks: boolean): void {
    if (reloadBooks) {
      this.bookService.getAllBooks().subscribe({
        next: (books) => this.allBooks = books.sort((a,b) => a.label.localeCompare(b.label))
      });  
    }
    if (reloadReaders) {
      this.readerService.getAllReaders().subscribe({
        next: (readers) => this.allReaders = readers.sort((a,b) => a.fullname.localeCompare(b.fullname))
      })  
    }
    if (reloadRentedBooks) {
      this.bookService.getAllRentedBooks().subscribe({
        next: rentedBooks => {
          // redefine the datasource
          this.dataSource = new EntityDataSource(rentedBooks, this.searchSubject$);
          this.refreshTable();
        }
      });  
    }
  }

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
