import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { debounceTime, map } from 'rxjs/operators';
import { Observable, of as observableOf, merge, Subject } from 'rxjs';

/**
 * Author model.
 */
export interface Author {
  id: number;
  firstname: string;
  lastname: string;
}

/**
 * Data source for the Author view. 
 * This class encapsulates all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class AuthorDataSource extends DataSource<Author> {
  data: Author[] = [];
  paginator: MatPaginator | undefined;
  sort: MatSort | undefined;
  filter: Observable<string>;
  keyword: string = '';
  keywordChanged = new Subject<boolean>();

  constructor(data: Author[], filter: Observable<string>) {
    super();
    this.data = data;
    this.filter = filter;
    this.filter.pipe(
      debounceTime(400) // delay search a bit
    ).subscribe({
      next: (keyword) => {
        this.keyword = keyword;
        this.keywordChanged.next(true);
      }
    })
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<Author[]> {
    if (this.paginator && this.sort && this.filter) {
      // Combine everything that affects the rendered data into one update
      // stream for the data-table to consume.
      return merge(observableOf(this.data), this.keywordChanged, this.paginator.page, this.sort.sortChange)
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
  private getPagedData(data: Author[]): Author[] {
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
  private getSortedData(data: Author[]): Author[] {
    if (!this.sort || !this.sort.active || this.sort.direction === '') {
      return data;
    }
    return data.sort((a, b) => {
      const isAsc = this.sort?.direction === 'asc';
      switch (this.sort?.active) {
        case 'lastname': return compare(a.lastname, b.lastname, isAsc);
        case 'firstname': return compare(a.firstname, b.firstname, isAsc);
        case 'id': return compare(+a.id, +b.id, isAsc);
        default: return 0;
      }
    });
  }

  private getFilteredData(data: Author[], keyword: string): Author[] {
    return data.filter(author => (author.firstname+author.lastname).toLowerCase().includes(keyword.toLowerCase()));
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a: string | number, b: string | number, isAsc: boolean): number {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
