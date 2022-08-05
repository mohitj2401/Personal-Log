import { Injectable } from '@angular/core';
import { catchError, Observable, tap } from 'rxjs';
import { Story } from './story';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StoryService {
  baseUrl = 'http://127.0.0.1:1900/story';
  constructor(private http: HttpClient) { }


  getStories(): Observable<Story[]> {
    return this.http.get<Story[]>(this.baseUrl).pipe();
  }
  addStories(story: Story): Observable<any> {
    return this.http.post(this.baseUrl, story).pipe();
  }
  editStories(story: Story): Observable<any> {
    return this.http.put(this.baseUrl, story).pipe();
  }
  deleteStory(storyId): Observable<any> {
    return this.http.delete(this.baseUrl + "/" + storyId).pipe();
  }
}
