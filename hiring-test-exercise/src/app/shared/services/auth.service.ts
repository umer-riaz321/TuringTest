import { Injectable } from '@angular/core';
import gql from 'graphql-tag';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthResponseType } from '../models/user.model';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  public currentUserSubject: BehaviorSubject<AuthResponseType>;
  public currentUser: Observable<AuthResponseType>;

  LOGIN_USER = gql` mutation Login($input: LoginInput!) {
    login(input: $input) {
      access_token
      refresh_token
      user {
        id
        username
      }
    }
  }`;

  constructor(private apiService: ApiService) {
    const item: any = localStorage.getItem('currentUser');
    this.currentUserSubject = new BehaviorSubject<AuthResponseType>(JSON.parse(item));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): AuthResponseType {
    return this.currentUserSubject.value;
  }

  login(input: any): any {
    return this.apiService.mutate(this.LOGIN_USER, { input });
  }
}
