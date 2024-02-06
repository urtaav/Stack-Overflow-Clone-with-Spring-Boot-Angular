import { Component, Input, inject } from '@angular/core';
import { Question } from '../../../model/Question.interface';
import { RouterLink } from '@angular/router';
import { ChipModule } from 'primeng/chip';
import { DatePipe, NgClass } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { VoteQuestionService } from '../../../services/vote-question.service';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { LocalStorageService } from '../../../services/jwt.service';
import { DateAgoPipe } from '../../pipes/DateAgo.pipe';

@Component({
  selector: 'app-question-card',
  standalone: true,
  imports: [
    RouterLink,
    ChipModule,
    DatePipe,
    ButtonModule,
    ToastModule,
    NgClass,
    DateAgoPipe],
  templateUrl: './question-card.component.html',
  styleUrl: './question-card.component.scss',
  providers:[MessageService]
})
export class QuestionCardComponent {

  @Input({required:true}) question!:Question;
  @Input() isTitleRouting:boolean = false;

  private voteService:VoteQuestionService = inject(VoteQuestionService);
  private messageService: MessageService = inject(MessageService);
  private localStorageService: LocalStorageService = inject(LocalStorageService);

  onVote = (typeVote:string,voted:number | string) => {
    console.log({typeVote,voted});
    if(voted === 1 || voted === '-1'){
      this.messageService.add({ severity: 'info', summary: 'Uppz!', detail: 'Your are already voted to this question' });
      return;
    }
    this.voteService.addVoteQuestion(typeVote,this.localStorageService.getUserId(),this.question.id).subscribe({
      next: (response) => {
        console.log("voted",response);
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Vote successfull' });
      }
    })
  }
}
