import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { AnswerDto } from '../model/AnswerRequest.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AnswerService {


  private http:HttpClient = inject(HttpClient);

  postAnswer = (request:AnswerDto) => {
    return this.http.post<AnswerDto>(`http://localhost:9090/api/answer`,request);
  }
  
  postAnswerImage = (file:any,answerId:any):Observable<string> => {
    return this.http.post<string>(`http://localhost:9090/image/${answerId}`,file,{  responseType: 'text' as 'json' } );
  }

  postImage(file: File, answerId: number): Observable<string> {
    const formData = new FormData();
    formData.append('image', file, file.name);
    return this.http.post<string>(`http://localhost:9090/image/${answerId}`, formData, { responseType: 'text'  as 'json'});
  }

  approveAnswer = (answerId:number) =>{
    return this.http.get(`http://localhost:9090/api/answer/approved/${answerId}`);
  }

}
