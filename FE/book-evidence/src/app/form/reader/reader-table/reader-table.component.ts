import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { Subject } from 'rxjs/internal/Subject';
import { ReaderService } from '../../../service/reader.service';
import { EntityDataSource } from '../../../model/entity-datasource';
import { Reader } from '../../../model/reader';
import { EditReaderComponent } from '../edit-reader/edit-reader.component';
import { MatDialog } from '@angular/material/dialog';
import { DeleteReaderComponent } from '../delete-reader/delete-reader.component';
import { MessageService } from 'src/app/service/message.service';
import { MessageButtonGroup, MessageType } from 'src/app/model/message';

@Component({
  selector: 'app-reader-table',
  templateUrl: './reader-table.component.html',
  styleUrls: ['./reader-table.component.scss']
})
export class ReaderTableComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<Reader>;
  dataSource: EntityDataSource<Reader>;
  searchText: string = '';
  searchSubject$ = new Subject<string>();

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'firstname', 'lastname', 'street', 'city', 'zipCode', 'action'];

  /**
   * Constructor.
   * @param dialog        MatDialog.
   * @param readerService reader service.
   */
  constructor(
    public dialog: MatDialog,
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
    this.readerService.getAllReaders().subscribe({
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
   * Adds a new reader.
   */
  addNewReader(): void {
    const newReader = new Reader(undefined, '', '', '', '', '');
    const dialogRef = this.dialog.open(EditReaderComponent, {
      data: {reader: newReader}
    });
    dialogRef.afterClosed().subscribe({
      next: (reader) => {
        if (reader) {
          // add a new reader
         this.readerService.saveReader(reader).subscribe({
            next: (savedReader) => {
              console.info('savedReader=', savedReader);
              this.dataSource.data.push(savedReader);
              // show confirmation message
              this.messageService.addMessage({
                type: MessageType.INFO,
                text: 'Reader has been saved.',
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
   * Edits given reader.
   * @param reader reader to be edited.
   */
  editReader(reader: Reader): void {
    const dialogRef = this.dialog.open(EditReaderComponent, {
      data: {reader: reader}
    });
    dialogRef.afterClosed().subscribe({
      next: (reader) => {
        if (reader) {
          // update reader
         this.readerService.saveReader(reader).subscribe({
            next: (savedReader) => {
              console.info('savedReader=', savedReader);
              // show confirmation message
              this.messageService.addMessage({
                type: MessageType.INFO,
                text: 'Reader has been saved.',
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
   * Deletes given readed.
   * @param reader reader to be deleted.
   */
  deleteReader(reader: Reader): void {
    const dialogRef = this.dialog.open(DeleteReaderComponent, {
      data: {reader: reader}
    });
    dialogRef.afterClosed().subscribe({
      next: (result) => {
        if (result && reader.id) {
          // delete reader
         this.readerService.deleteReader(reader.id).subscribe({
            next: (result) => {
              console.info('deletedReader=', result);
              if (result) {
                const data = this.dataSource.data.filter((a) => a.id !== reader.id);
                this.dataSource.data = data;
                // show confirmation message
                this.messageService.addMessage({
                  type: MessageType.INFO,
                  text: 'Reader has been deleted.',
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
