import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Diary } from './diary';

@Injectable({
  providedIn: 'root'
})
export class DiaryService {

  baseUrl = 'http://127.0.0.1:1700/diary';
  constructor(private http: HttpClient) { }


  getDiary(): Observable<Diary[]> {
    return this.http.get<Diary[]>(this.baseUrl).pipe();
  }
  addDiary(diary: Diary): Observable<any> {
    return this.http.post(this.baseUrl, diary,{responseType:'text'}).pipe();
  }
  editDiary(diary: Diary): Observable<any> {
    return this.http.put(this.baseUrl, diary,{responseType:'text'}).pipe();
  }
  deleteDiary(diaryId): Observable<any> {
    return this.http.delete(this.baseUrl + "/" + diaryId,{responseType:'text'}).pipe();
  }
}
