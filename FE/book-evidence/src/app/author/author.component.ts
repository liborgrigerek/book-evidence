import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { Subject } from 'rxjs/internal/Subject';
import { AuthorService } from '../service/author.service';
import { AuthorDataSource, Author } from './author-datasource';

@Component({
  selector: 'app-author',
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.scss']
})
export class AuthorComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<Author>;
  dataSource: AuthorDataSource;
  searchText: string = '';
  searchSubject$ = new Subject<string>();

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'firstname', 'lastname'];

  constructor(private authorService: AuthorService) {
    this.dataSource = new AuthorDataSource([], this.searchSubject$);
  }

  ngOnInit(): void {

    // load data from API
    this.authorService.getAllAuthors().subscribe({
      next: data => {
        // redefine the datasource
        this.dataSource = new AuthorDataSource(data, this.searchSubject$);
        this.refreshTable();
      }
    });
  }

  ngAfterViewInit(): void {
    this.refreshTable();
  }

  onSearchInputChange($event:string): void {
    // emit changed value
    this.searchSubject$.next($event);
  }

  private refreshTable(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;  
  }
}
