import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { DITokens } from '../utils/di.tokens';
import { BaseService } from './base.service';
import { StorageService } from './storage.service';

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

  constructor(
    private $base: BaseService,
    @Inject(DITokens.API_ENDPOINT) private endpoint: string
  ) {}

  signIn(email: string, password: string) {
    return this.$base.post(`${this.endpoint}/api/auth/signin`, {
      email,
      password,
    });
  }

  singUp(email: string, password: string) {
    return this.$base.post(`${this.endpoint}/api/auth/signup`, {
      email,
      password,
    });
  }
}
