import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { QuestionRequest } from '../model/QuestionRequest.interface';
import { QuestionResponse } from '../model/QuestionResponse.interface';
import { Observable, map } from 'rxjs';
import { SingleQuestion } from '../model/SingleQuestion.interface';
import { Answer } from '../model/Answer.interface';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {


  private http: HttpClient = inject(HttpClient);

  getQuestions = (params: { pageNumber?: number, size?: number, sort?: string, direction?: string } = {}): Observable<QuestionResponse> => {
    const { pageNumber, size, sort, direction } = params;

    let url = `http://localhost:9090/api/question/questions`;

    // Concatenar parámetros solo si tienen un valor
    if (pageNumber !== undefined) {
      url += `?pageNumber=${pageNumber}`;
    }
    if (size !== undefined) {
      url += `${url.includes('?') ? '&' : '?'}size=${size}`;
    }
    if (sort !== undefined) {
      url += `${url.includes('?') ? '&' : '?'}sort=${sort}`;
    }
    if (direction !== undefined) {
      url += `${url.includes('?') ? '&' : '?'}direction=${direction}`;
    }
    return this.http.get<QuestionResponse>(url);
  }

  addQuestion = (request: QuestionRequest) => {
    return this.http.post<any>(`http://localhost:9090/api/question`, request);
  }

  getQuestionById = (questionId: number,userId:number): Observable<SingleQuestion> => {
    return this.http.get<SingleQuestion>(`http://localhost:9090/api/question/${questionId}/${userId}`).pipe(
      map((singleQuestion: SingleQuestion) => {


        const obj: SingleQuestion = {
          questionDTO: singleQuestion.questionDTO,
          answerDtoList: singleQuestion.answerDtoList.map((answer: Answer) => {
            if (answer.file) {
              answer.fileSrc = `data:${answer.file.type};base64,${answer.file.data}`;
            }
            return answer;
          })
        }
        return obj;
      }),

    )
  }
  getQuestionsByUserId = (params: { pageNumber?: number, size?: number, sort?: string, direction?: string, userId: number }): Observable<QuestionResponse> => {
      const { pageNumber, size, sort, direction, userId } = params;
    
      let url = `http://localhost:9090/api/question/questions`;
    
      // Concatenar parámetros solo si tienen un valor
      if (pageNumber !== undefined) {
        url += `?pageNumber=${pageNumber}`;
      }
      if (size !== undefined) {
        url += `${url.includes('?') ? '&' : '?'}size=${size}`;
      }
      if (sort !== undefined) {
        url += `${url.includes('?') ? '&' : '?'}sort=${sort}`;
      }
      if (direction !== undefined) {
        url += `${url.includes('?') ? '&' : '?'}direction=${direction}`;
      }
    
      // Agregar userId como parámetro requerido
      url += `${url.includes('?') ? '&' : '?'}userId=${userId}`;
    
      return this.http.get<QuestionResponse>(url);
    };

    
  searchQuestionByTitle = (params: { pageNumber?: number, size?: number, sort?: string, direction?: string, title: number }): Observable<any> => {
    const { pageNumber, size, sort, direction, title } = params;
  
    let url = `http://localhost:9090/api/question/search`;
  
    // Concatenar parámetros solo si tienen un valor
    if (pageNumber !== undefined) {
      url += `?pageNumber=${pageNumber}`;
    }
    if (size !== undefined) {
      url += `${url.includes('?') ? '&' : '?'}size=${size}`;
    }
    if (sort !== undefined) {
      url += `${url.includes('?') ? '&' : '?'}sort=${sort}`;
    }
    if (direction !== undefined) {
      url += `${url.includes('?') ? '&' : '?'}direction=${direction}`;
    }
  
    // Agregar userId como parámetro requerido
    url += `${url.includes('?') ? '&' : '?'}title=${title}`;
  
    return this.http.get<any>(url);
  };
    
}
