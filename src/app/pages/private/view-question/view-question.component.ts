import { Component, inject } from '@angular/core';
import { QuestionCardComponent } from '../../../shared/components/question-card/question-card.component';
import { ActivatedRoute, Router } from '@angular/router';
import { Question } from '../../../model/Question.interface';
import { QuestionService } from '../../../services/question.service';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ButtonModule } from 'primeng/button';
import { FileUploadModule } from 'primeng/fileupload';
import { AnswerService } from '../../../services/answer.service';
import { AnswerDto } from '../../../model/AnswerRequest.interface';
import { SingleQuestion } from '../../../model/SingleQuestion.interface';
import { Answer } from '../../../model/Answer.interface';
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { DatePipe } from '@angular/common';
import { LocalStorageService } from '../../../services/jwt.service';
import { VoteQuestionService } from '../../../services/vote-question.service';
import { DividerModule } from 'primeng/divider';
import { DateAgoPipe } from '../../../shared/pipes/DateAgo.pipe';
@Component({
  selector: 'app-view-question',
  standalone: true,
  imports: [
    QuestionCardComponent, 
    InputTextareaModule,
    ButtonModule, 
    FileUploadModule,
    ReactiveFormsModule, 
    ToastModule, 
    DatePipe,
    InputTextareaModule,
    DividerModule,
    DateAgoPipe],
  templateUrl: './view-question.component.html',
  styleUrl: './view-question.component.scss',
  providers: [MessageService]
})
export class ViewQuestionComponent {
  private activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  private questionService: QuestionService = inject(QuestionService);
  private answerService: AnswerService = inject(AnswerService);
  private fb: FormBuilder = inject(FormBuilder);
  private messageService: MessageService = inject(MessageService);
  private router: Router = inject(Router);
  private localStorageService: LocalStorageService = inject(LocalStorageService);
  private voteQuestionService: VoteQuestionService = inject(VoteQuestionService);

  question!: Question;
  answers: Answer[] = [];
  imagePreview!: string | ArrayBuffer | null;

  _questionId!: number;
  displayButton: boolean = false;

  answerForm: FormGroup = this.fb.group({
    body: ['', Validators.required],
    image: [''],
    userId: [this.localStorageService.getUserId()],
    questionId: []
  });

  get questionId() {
    return this.answerForm.get('questionId') as FormControl;
  }

  ngOnInit(): void {
    const id = this.activatedRoute.snapshot.paramMap.get('questionId') || 0; //get from route snapshot

    if (id) {
      this._questionId = parseInt(id);
      this.getQuestionById()
    }
    this.questionId.patchValue(this._questionId);
  }

  getQuestionById = () => {
    this.questionService.getQuestionById(this._questionId, this.localStorageService.getUserId()).subscribe({
      next: (response: SingleQuestion) => {
        console.log(response)
        this.question = response.questionDTO;
        this.answers = response.answerDtoList;
        if (this.localStorageService.getUserId() === this.question.userId) {
          this.displayButton = true;
        }
      }
    });
  }
  onSelect(event: any) {
    this.answerForm.get("image")?.patchValue(event.files[0]);
    this.previewImage();
  }
  onSubmit = () => {
    if (this.answerForm.invalid) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Los campos marcados con * son obligatorios' });
      return;
    }

    this.answerService.postAnswer(this.answerForm.value).subscribe({
      next: (response: AnswerDto) => {
        if (response.id) {
          this.answerService.postImage(this.answerForm.get("image")?.value, response.id).subscribe({
            next: (response) => {
              this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Post successfull' });
            },
            complete: () => {
              this.router.navigate(["/user/dashboard"]);
            }
          });
        }
      }
    })
  }
  approveAnswer = (answerId: number) => {
    this.answerService.approveAnswer(answerId).subscribe({
      next: () => {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Approve Answer successfull' });
        this.getQuestionById();
      },
      error: () => {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Approve Answer fail!' });
      }
    })

  }
  onVote = (typeVote: string, voted: number | string, answerId: number) => {
    console.log({ typeVote, voted });
    if (voted === 1 || voted === '-1') {
      this.messageService.add({ severity: 'info', summary: 'Uppz!', detail: 'Your are already voted to this answer' });
      return;
    }
    this.voteQuestionService.addVoteAnswer(typeVote, this.localStorageService.getUserId(), answerId).subscribe({
      next: (response) => {
        console.log("voted", response);
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Vote successfull' });
        this.getQuestionById()
      }
    })
  }

  postComment = (answerId: number, comment: string) => {
    console.log({ answerId, comment });
    if (!comment) return;
    this.voteQuestionService.postCommentAnswer(answerId, comment, this.localStorageService.getUserId()).subscribe({
      next: (response) => {
        console.log("postCommentAnswer", response);
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Comment successfull' });
        this.getQuestionById()
      }
    })
  }
  private previewImage = () => {
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result;
    }
    reader.readAsDataURL(this.answerForm.get("image")?.value);
  }

}
