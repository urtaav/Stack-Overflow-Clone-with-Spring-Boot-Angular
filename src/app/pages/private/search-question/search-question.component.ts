import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { PaginatorModule } from 'primeng/paginator';
import { QuestionCardComponent } from '../../../shared/components/question-card/question-card.component';
import { Question } from '../../../model/Question.interface';
import { QuestionService } from '../../../services/question.service';
import { InputTextModule } from 'primeng/inputtext';
import { SingleQuestion } from '../../../model/SingleQuestion.interface';

@Component({
  selector: 'app-search-question',
  standalone: true,
  imports: [ButtonModule,RouterLink,PaginatorModule,QuestionCardComponent,InputTextModule],
  templateUrl: './search-question.component.html',
  styleUrl: './search-question.component.scss'
})
export class SearchQuestionComponent {

  private questionService:QuestionService = inject(QuestionService);

  questionCollection:Question[] = [];
  first: number = 0;
  rows: number = 3;
  pageNumber:number = 0;
  totalRecords: number = 0;

  ngOnInit(): void {

  }


  
  search = (value:any) => {
    console.log(value);
    this.questionService.searchQuestionByTitle({ pageNumber: this.pageNumber + 1, size: this.rows, sort: 'createdDate', direction: 'DESC',title:value}).subscribe({
      next: (response:any) => {
        console.log(this.questionCollection)
        console.log("searchQuestionByTitle ",response);
        this.questionCollection = response.questionDtoList;
        this.totalRecords = response.totalElements;
      }
    })
  }

  onPageChange(event: any) {
    console.log(event)
      this.first = event.first;
      this.rows = event.rows;
      this.pageNumber = event.page;
  }
}
