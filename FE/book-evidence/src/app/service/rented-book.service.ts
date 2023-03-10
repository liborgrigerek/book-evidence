import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Author } from '../model/author';
import { Book } from '../model/book';
import { Reader } from '../model/reader';
import { RentedBook } from '../model/rented-book';

@Injectable({
  providedIn: 'root'
})
export class RentedBookService {

  constructor(private http: HttpClient) { }

  /**
   * Returns all rented books.
   * @returns all rented books.
   */
  getAllRentedBooks(): Observable<RentedBook[]> {
    return this.http.get<RentedBook[]>('rented-book/all').pipe(
      map((rentedBooks) => {
        // create RentedBooks objects from data from JSON deserializer (because RentedBook is an instance of class, not interface. Otherwise no method is defined on RentedBook instances.).
        const definedRentedBooks: RentedBook[] = [];
        rentedBooks.forEach(rb => {
          const b = rb.book;
          const r = rb.reader;
          const author = new Author(b?.author?.id, b?.author?.firstname, b?.author?.lastname);
          const book = new Book(b?.id, author, b?.title, b?.releaseYear, b?.description);
          const reader = new Reader(r?.id, r?.firstname, r?.lastname, r?.street, r?.street, r?.zipCode);
          const rentedBook = new RentedBook(book, reader, rb.rentedWhen, rb.rentedUntil);
          definedRentedBooks.push(rentedBook);
        });
        return definedRentedBooks;
      })
    );
  }

  /**
   * Saves given rented book.
   * @param rentedBook rented book to be saved.
   * @returns updated entity.
   */
  saveRentedBook(rentedBook:RentedBook): Observable<RentedBook> {
    return this.http.post<RentedBook>('rented-book/save', rentedBook).pipe(
      map(
        (rb) => {
          const b = rb.book;
          const r = rb.reader;
          const author = new Author(b?.author?.id, b?.author?.firstname, b?.author?.lastname);
          const book = new Book(b?.id, author, b?.title, b?.releaseYear, b?.description);
          const reader = new Reader(r?.id, r?.firstname, r?.lastname, r?.street, r?.street, r?.zipCode);
          return new RentedBook(book, reader, rb.rentedWhen, rb.rentedUntil);
        })
    );
  }

  /**
   * Deletes given rented book.
   * @param bookId id of book of rented book.
   * @param readerId id of reader of rented book.
   */
  deleteRentedBook(bookId: number, readerId: number): Observable<boolean> {
    const options = {
      params: new HttpParams()
        .set('bookid', bookId)
        .set('readerid', readerId)
    }
    return this.http.delete<Author>('rented-book/delete', options).pipe(
      map(
        () => true
      )
    )
  }
}
