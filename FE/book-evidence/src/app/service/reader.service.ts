import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Reader } from '../model/reader';

@Injectable({
  providedIn: 'root'
})
export class ReaderService {

  constructor(private http: HttpClient) { }

  /**
   * Returns all readers.
   * @returns all readers.
   */
  getAllReaders(): Observable<Reader[]> {
    return this.http.get<Reader[]>('reader/all').pipe(
      map((reader) => {
        // create Reader objects from data from JSON deserializer (because Reeader is an instance of class, not interface. Otherwise no method is defined on Reader instances.).
        const definedReaders: Reader[] = [];
        reader.forEach(reader => definedReaders.push(new Reader(reader.id, reader.firstname, reader.lastname, reader.street, reader.city, reader.zipCode)));
        return definedReaders;
      })
    );
  }

  /**
   * Saves given reader.
   * @param reader reader to be saved.
   * @returns updated entity.
   */
  saveReader(reader:Reader): Observable<Reader> {
    return this.http.post<Reader>('reader/save', reader).pipe(
      map(
        (reader) => new Reader(reader.id, reader.firstname, reader.lastname, reader.street, reader.city, reader.zipCode)
      )
    )
  }

  /**
   * Deletes given reader.
   * @param readerId id of reader to be deleted.
   */
  deleteReader(readerid:number): Observable<boolean> {
    const options = {
      params: new HttpParams().set('id', readerid)
    }
    return this.http.delete<Reader>('reader/delete', options).pipe(
      map(
        () => true
      )
    )
  }
}
