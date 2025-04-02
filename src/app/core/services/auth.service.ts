import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { DITokens } from '../utils/di.tokens';
import { BaseService } from './base.service';
import { StorageService } from './storage.service';
import { SignInForm } from '../../domains/auth/sign-in/sign-in.component';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  get accessToken(): string | null {
    return StorageService.getItem('accessToken');
  }

  set accessToken(v: string) {
    StorageService.setItem('accessToken', v);
  }

  constructor(private $base: BaseService) {}

  login(model: SignInForm) {
    console.log(model);
  }

  signIn(email: string, password: string) {
    return this.$base.post(`auth/signin`, {
      email,
      password,
    });
  }

  singUp(email: string, password: string) {
    return this.$base.post(`auth/signup`, {
      email,
      password,
    });
  }
}
