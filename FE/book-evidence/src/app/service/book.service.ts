import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Author } from '../model/author';
import { Book } from '../model/book';

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
        books.forEach(book => {
          const author = (book.author) ? new Author(book.author.id, book.author.firstname, book.author.lastname) : undefined;
          definedBooks.push(
            new Book(book.id, author, book.title, book.releaseYear, book.description)
          );
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
        (book) => {
          const author = (book.author) ? new Author(book.author.id, book.author.firstname, book.author.lastname) : undefined;
          return new Book(book.id, author, book.title, book.releaseYear, book.description);
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
}
