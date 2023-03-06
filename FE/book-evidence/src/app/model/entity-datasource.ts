import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { debounceTime, map } from 'rxjs/operators';
import { Observable, of as observableOf, merge, Subject } from 'rxjs';
import { Entity } from './entity';

/**
 * Data source for the Entity.
 * This class encapsulates all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class EntityDataSource<T extends Entity> extends DataSource<T> {
  data: T[] = [];
  paginator: MatPaginator | undefined;
  sort: MatSort | undefined;
  filter: Observable<string>;
  keyword: string = '';
  contentChanged = new Subject<boolean>();

  /**
   * Constructor.
   * @param data   list of entities shown in the table.
   * @param filter filter for data filtering.
   */
  constructor(data: T[], filter: Observable<string>) {
    super();
    this.data = data;
    this.filter = filter;
    this.filter.pipe(
      debounceTime(400) // delay search a bit
    ).subscribe({
      next: (keyword) => {
        this.keyword = keyword;
        this.contentChanged.next(true);
      }
    })
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<T[]> {
    if (this.paginator && this.sort && this.filter) {
      // Combine everything that affects the rendered data into one update
      // stream for the data-table to consume.
      return merge(observableOf(this.data), this.contentChanged, this.paginator.page, this.sort.sortChange)
        .pipe(map(() => {
          return this.getPagedData(this.getSortedData(this.getFilteredData([...this.data ], this.keyword)));
        }));
    } else {
      throw Error('Please set the paginator, sort and filter on the data source before connecting.');
    }
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect(): void {}

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: T[]): T[] {
    if (this.paginator) {
      const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
      return data.splice(startIndex, this.paginator.pageSize);
    } else {
      return data;
    }
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: T[]): T[] {
    if (this.sort && this.sort.active && this.sort.direction !== '') {
      const isAsc = this.sort?.direction === 'asc';
      const colName = this.sort?.active;
      return data.sort((a, b) => a.compareWith(b, colName, isAsc));
    } else {
      return data;
    }
  }

  /**
   * Returns filtered data.
   * @param data    data to be filtered.
   * @param keyword keyword used for filtering.
   * @returns filtered data.
   */
  private getFilteredData(data: T[], keyword: string): T[] {
    return data.filter(author => author.filterBy(keyword));
  }
}
