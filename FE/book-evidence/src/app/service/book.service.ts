import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Author } from '../model/author';
import { Book } from '../model/book';
import { Reader } from '../model/reader';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(private http: HttpClient) { }

  /**
   * Returns all books.
   * @returns all books.
   */
  getAllBooks(): Observable<Book[]> {
    return this.http.get<Book[]>('book/all').pipe(
      map((books) => {
        // create Book objects from data from JSON deserializer (because Book is an instance of class, not interface. Otherwise no method is defined on Book instances.).
        const definedBooks: Book[] = [];
        books.forEach(b => {
          const book : Book = this.createBook(b);
          definedBooks.push(book);
        });
        return definedBooks;
      })
    );
  }

  /**
   * Returns all rented books.
   * @returns all rented books.
   */
  getAllRentedBooks(): Observable<Book[]> {
    return this.http.get<Book[]>('book/rentedbooks').pipe(
      map((books) => {
        // create Book objects from data from JSON deserializer (because Book is an instance of class, not interface. Otherwise no method is defined on Book instances.).
        const definedBooks: Book[] = [];
        books.forEach(b => {
          const book : Book = this.createBook(b);
          definedBooks.push(book);
        });
        return definedBooks;
      })
    );
  }

  /**
   * Saves given book.
   * @param book book to be saved.
   * @returns updated entity.
   */
  saveBook(book:Book): Observable<Book> {
    return this.http.post<Book>('book/save', book).pipe(
      map(
        (b) => {
          const book : Book = this.createBook(b);
          return book;
        }
      )
    )
  }

  /**
   * Deletes given book.
   * @param bookId id of book to be deleted.
   */
  deleteBook(bookId:number): Observable<boolean> {
    const options = {
      params: new HttpParams().set('id', bookId)
    }
    return this.http.delete<Book>('book/delete', options).pipe(
      map(
        () => true
      )
    )
  }

  private createBook(b: Book): Book {
    const book = new Book(b.id, b.title, b.releaseYear, b.description);
    book.author = (b.author) ? new Author(b.author.id, b.author.firstname, b.author.lastname) : undefined;
    book.reader = (b.reader) ? new Reader(b.reader.id, b.reader.firstname, b.reader.lastname, b.reader.street, b.reader.city, b.reader.zipCode) : undefined;
    book.rentedWhen = (b.rentedWhen) ? new Date(b.rentedWhen) : undefined;
    book.rentedUntil = (b.rentedWhen) ? new Date(b.rentedWhen) : undefined;
    return book;
  }
}
