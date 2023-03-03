import { HttpClient } from '@angular/common/http';
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
}
