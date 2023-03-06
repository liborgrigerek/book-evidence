import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Author } from '../model/author';

@Injectable({
  providedIn: 'root'
})
export class AuthorService {

  constructor(private http: HttpClient) { }

  /**
   * Returns all authors.
   * @returns all authors.
   */
  getAllAuthors(): Observable<Author[]> {
    return this.http.get<Author[]>('author/all').pipe(
      map((authors) => {
        // create Author objects from data from JSON deserializer (because Author is an instance of class, not interface. Otherwise no method is defined on Author instances.).
        const definedAuthors: Author[] = [];
        authors.forEach(author => definedAuthors.push(new Author(author.id, author.firstname, author.lastname)));
        return definedAuthors;
      })
    );
  }

  /**
   * Saves given author.
   * @param author author to be saved.
   * @returns updated entity.
   */
  saveAuthor(author:Author): Observable<Author> {
    return this.http.post<Author>('author/save', author).pipe(
      map(
        (author) => new Author(author.id, author.firstname, author.lastname)
      )
    )
  }

  /**
   * Deletes given author.
   * @param authorId id of author to be deleted.
   */
  deleteAuthor(authorId:number): Observable<boolean> {
    const options = {
      params: new HttpParams().set('id', authorId)
    }
    return this.http.delete<Author>('author/delete', options).pipe(
      map(
        () => true
      )
    )
  }
}
