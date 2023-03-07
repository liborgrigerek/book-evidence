import { Injectable } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Subject } from 'rxjs/internal/Subject';
import { Message } from '../model/message';

@Injectable({
  providedIn: 'root'
})
export class MessageService  {
  private _subject$ = new Subject<Message>();

  constructor() {
  }

  addMessage(message: Message) {
    this._subject$.next(message);
  }

  getObservable(): Observable<Message> {
    return this._subject$.asObservable();
  }
}
