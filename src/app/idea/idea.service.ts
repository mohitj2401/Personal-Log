import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Idea } from './idea';

@Injectable({
  providedIn: 'root'
})
export class IdeaService {

  baseUrl = 'http://127.0.0.1:1800/idea';
  constructor(private http: HttpClient) { }


  getIdeas(): Observable<Idea[]> {
    return this.http.get<Idea[]>(this.baseUrl).pipe();
  }
  addIdea(idea: Idea): Observable<any> {
    return this.http.post(this.baseUrl, idea, { responseType: 'text' }).pipe();
  }
  editIdea(idea: Idea): Observable<any> {
    return this.http.put(this.baseUrl, idea, { responseType: 'text' }).pipe();
  }
  deleteIdea(ideaId): Observable<any> {
    return this.http.delete(this.baseUrl + "/" + ideaId, { responseType: 'text' }).pipe();
  }
}
