import { Component, OnInit, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { Question } from '../../../model/Question.interface';
import { QuestionService } from '../../../services/question.service';
import { PaginatorModule } from 'primeng/paginator';
import { QuestionCardComponent } from '../../../shared/components/question-card/question-card.component';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [ButtonModule,RouterLink,PaginatorModule,QuestionCardComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit{

  private questionService:QuestionService = inject(QuestionService);

  questionCollection:Question[] = [];
  first: number = 0;
  rows: number = 3;
  pageNumber:number = 0;
  totalRecords: number = 0;

  ngOnInit(): void {
    this.getQuestions();
  }

  getQuestions = () => {
    this.questionService.getQuestions({ pageNumber: this.pageNumber + 1, size: this.rows, sort: 'createdDate', direction: 'DESC' }).subscribe({
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
