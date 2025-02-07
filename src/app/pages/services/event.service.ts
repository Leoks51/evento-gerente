import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { Events } from '../../models/events.model';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  private API = 'http://localhost:3000/events';

  constructor(
    public http: HttpClient
  ) { }

  getAllEvents(): Observable<Events[]>{
    return this.http.get<Events[]>(this.API)
  }

  createEvent(event: Events): Observable<Events> {
    return this.http.post<Events>(this.API, event);
  }

  deleteEvent(eventId: number): Observable<any> {
    const url = `${this.API}/${eventId}`;
    return this.http.delete(url);
  }

  updateEvent(event: Events): Observable<Events> {
    return this.http.patch<Events>(`${this.API}/${event.id}`, event);
  }
  
}
