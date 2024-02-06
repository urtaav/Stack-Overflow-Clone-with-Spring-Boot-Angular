import { JsonPipe, NgClass } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { ChipsModule } from 'primeng/chips';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { QuestionService } from '../../../services/question.service';
import { LocalStorageService } from '../../../services/jwt.service';

@Component({
  selector: 'app-question',
  standalone: true,
  imports: [ButtonModule, InputTextModule, RouterLink, ReactiveFormsModule, ToastModule, NgClass, JsonPipe, ChipsModule, InputTextareaModule],
  templateUrl: './question.component.html',
  styleUrl: './question.component.scss',
  providers: [MessageService]
})
export class QuestionComponent {
  private messageService: MessageService = inject(MessageService);
  private fb: FormBuilder = inject(FormBuilder);
  private router: Router = inject(Router);
  private questionService:QuestionService = inject(QuestionService);
  private localStorageService:LocalStorageService = inject(LocalStorageService);
  public submitted: boolean = false;


  questionForm: FormGroup = this.fb.group({
    title: ['', [Validators.required]],
    tags: [[]],
    body: ['', [Validators.required]],
    userId:[this.localStorageService.getUserId()]
  });

  get title() {
    return this.questionForm.get('title') as FormControl;
  }
  get body() {
    return this.questionForm.get('body') as FormControl;
  }
  get tags() {
    return this.questionForm.get('tags') as FormControl;
  }


  onSubmit = () => {
    console.log("submit", this.questionForm.value);
    this.submitted = true;
    if (this.questionForm.invalid) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Los campos marcados  con * son requeridos' });
      return;
    }

    this.questionService.addQuestion(this.questionForm.value).subscribe({
      next: (response) => {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Register successfull' });
      },
      complete:() => {
        setTimeout(() => {
          this.router.navigate(["/user/dashboard"]);
        }, 1200);
      }
    })
  }
}
