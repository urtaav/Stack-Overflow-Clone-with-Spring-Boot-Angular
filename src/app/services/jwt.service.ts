import { Injectable } from '@angular/core';
import { User } from '../model/User.interface';

@Injectable({
    providedIn: 'root',
    
  })
export class LocalStorageService {

    set(key: string, value: string) {
        localStorage.setItem(key, value);
    }

    get(key: string) {
        return localStorage.getItem(key);
    }

    remove(key: string) {
        localStorage.removeItem(key);
    }

    getUserId = () => {
       const currentUser =  localStorage.getItem('user');
       if(currentUser){
        let user:User = JSON.parse(currentUser);
        return user.id;
       }
       return 0;
    }
}