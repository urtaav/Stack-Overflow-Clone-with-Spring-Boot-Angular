import { Routes } from '@angular/router';
import { SkeletonComponent } from './layout/skeleton/skeleton.component';

export const routes: Routes = [
    {
        path:"",
        loadComponent: () => import('./pages/login/login.component').then(m => m.LoginComponent) 
    },
    {
        path:"signup",
        loadComponent: () => import('./pages/signup/signup.component').then(m => m.SignupComponent) 
    },
    {
        path:"user",
        component:SkeletonComponent,
        children:[
            {
                path:"dashboard",
                loadComponent: () => import('./pages/private/dashboard/dashboard.component').then(m => m.DashboardComponent) 
            },
            {
                path:"question",
                loadComponent: () => import('./pages/private/question/question.component').then(m => m.QuestionComponent) 
            },
            {
                path:"question/:questionId",
                loadComponent: () => import('./pages/private/view-question/view-question.component').then(m => m.ViewQuestionComponent) 
            },
            {
                path:"my-questions",
                loadComponent: () => import('./pages/private/my-questions/my-questions.component').then(m => m.MyQuestionsComponent) 
            },
            {
                path:"search",
                loadComponent: () => import('./pages/private/search-question/search-question.component').then(m => m.SearchQuestionComponent) 
            },
            
        ]
    }
];
