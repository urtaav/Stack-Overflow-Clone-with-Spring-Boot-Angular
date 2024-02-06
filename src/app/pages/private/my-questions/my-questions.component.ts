import { Component, inject } from '@angular/core';
import { QuestionService } from '../../../services/question.service';
import { ButtonModule } from 'primeng/button';
import { RouterLink } from '@angular/router';
import { PaginatorModule } from 'primeng/paginator';
import { QuestionCardComponent } from '../../../shared/components/question-card/question-card.component';
import { Question } from '../../../model/Question.interface';
import { LocalStorageService } from '../../../services/jwt.service';

@Component({
  selector: 'app-my-questions',
  standalone: true,
  imports: [ButtonModule,RouterLink,PaginatorModule,QuestionCardComponent],
  templateUrl: './my-questions.component.html',
  styleUrl: './my-questions.component.scss'
})
export class MyQuestionsComponent {
  private questionService:QuestionService = inject(QuestionService);
  private localStorageService:LocalStorageService = inject(LocalStorageService);

  questionCollection:Question[] = [];
  first: number = 0;
  rows: number = 3;
  pageNumber:number = 0;
  totalRecords: number = 0;

  ngOnInit(): void {
    this.getQuestions();
  }

  getQuestions = () => {
    const userId = this.localStorageService.getUserId();
    this.questionService.getQuestionsByUserId({ pageNumber: this.pageNumber + 1, size: this.rows, sort: 'createdDate', direction: 'DESC',userId }).subscribe({
      next: (response:any) => {
        console.log("response",response);
        this.questionCollection = response.questionDTOList;
        this.totalRecords = response.totalElements;
      }
    })
  }
 

  onPageChange(event: any) {
    console.log(event)
      this.first = event.first;
      this.rows = event.rows;
      this.pageNumber = event.page;
      this.getQuestions()
  }
}
