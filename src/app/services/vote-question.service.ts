import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class VoteQuestionService {
  private http: HttpClient = inject(HttpClient);


  addVoteQuestion = (voteType: string, userId: number, questionId: number) => {
    console.log(voteType,
      userId,
      questionId)
    return this.http.post<any>(`http://localhost:9090/api/vote`, {
      voteType,
      userId,
      questionId
    });
  }

  addVoteAnswer = (voteType: string, userId: number, answerId: number) => {
    console.log(voteType,
      userId,
      answerId)
    return this.http.post<any>(`http://localhost:9090/api/vote/answer-vote`, {
      voteType,
      userId,
      answerId
    });
  }

  postCommentAnswer = (answerId:number,comment:string, userId:number) => {
    return this.http.post<any>(`http://localhost:9090/api/answer/comment`, {
      answerId,
      body:comment,
      userId
    });
  }
}
