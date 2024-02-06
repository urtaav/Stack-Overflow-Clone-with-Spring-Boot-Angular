import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { DividerModule } from 'primeng/divider';
import { InputTextModule } from 'primeng/inputtext';
import { AuthService } from '../../services/auth.service';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { LoginResponse } from '../../model/loginResponse.interface';
import { LocalStorageService } from '../../services/jwt.service';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ButtonModule, CheckboxModule, DividerModule, InputTextModule, RouterLink, ReactiveFormsModule, ToastModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  providers: [MessageService]
})
export class LoginComponent {

  private authService: AuthService = inject(AuthService);
  private messageService: MessageService = inject(MessageService);
  private fb: FormBuilder = inject(FormBuilder);
  private router:Router = inject(Router);
  private ls:LocalStorageService = inject(LocalStorageService);
  
  loginForm: FormGroup = this.fb.group({
    email: [''],
    password: ['']
  });


  onSubmit = () => {
    console.log("submit", this.loginForm.value);
    if (this.loginForm.invalid) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Los campos marcados  con * son requeridos' });
      return;
    }

    this.authService.signin(this.loginForm.value).subscribe({
      next: (response: LoginResponse) => {
        console.log(response);
        this.ls.set('stackoverflowToken',response.jwt);
        this.authService.getUser(response.jwt).subscribe({
          next: (userinfo) =>{
            console.log(userinfo);
          }
        })
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Login successfull' });
        console.log(this.ls.getUserId());
      },
      complete: () => {
        this.router.navigate(["/user/dashboard"]);
      }
    });
  }
}
