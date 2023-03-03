import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Author } from '../author/author-datasource';

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
    return this.http.get<Author[]>('author/all')
  }
}
