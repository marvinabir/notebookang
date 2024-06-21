import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotesService {
  private apiUrl = 'http://localhost:3000/api/notes';

  constructor(private http: HttpClient) {}

  getNotes(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  addNote(note: any): Observable<any> {
    return this.http.post(this.apiUrl, note);
  }

  updateNote(note: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${note.id}`, note);
  }

  deleteNote(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
