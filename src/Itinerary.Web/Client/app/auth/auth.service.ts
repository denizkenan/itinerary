﻿import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions, Response } from '@angular/http';

import { AuthHttp, tokenNotExpired } from 'angular2-jwt';
import 'rxjs/add/observable/interval';
import 'rxjs/add/observable/throw';
import 'rxjs/add/observable/timer';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

import { AppConfig } from '../core/app-config';
import { AuthTokenStorageService, TokenType } from './auth-token-storage.service';
import { AuthResult } from './models';

@Injectable()
export class AuthService {

  constructor(
    private http: Http,
    private authHttp: AuthHttp,
    private storageService: AuthTokenStorageService) {
  }

  private getRequestOptions(): RequestOptions {
    const headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    return new RequestOptions({ headers });
  }

  public loggedIn(): boolean {
    return tokenNotExpired();
  }

  public signin(username: string, password: string): Observable<AuthResult> {
    const request: any = {
      client_id: AppConfig.identityInfo.clientId,
      grant_type: AppConfig.identityInfo.grantType,
      scope: AppConfig.identityInfo.scope,
      username,
      password
    };

    return this.http.post(
      AppConfig.authTokenEndpoint,
      this.urlEncode(request),
      this.getRequestOptions())
      .map((response: Response) => {
        this.store(response.json());
        return new AuthResult(true, null);
      }).catch((error: any) => {
        const body: any = error.json();
        return Observable.throw(new AuthResult(false, body.error_description));
      });
  }

  private urlEncode(obj: object): string {
    const urlSearchParams = new URLSearchParams();
    for (const key of Object.keys(obj)) {
      urlSearchParams.append(key, obj[key]);
    }
    return urlSearchParams.toString();
  }

  private store(body: any): void {
    this.storageService.setToken(TokenType.AccessToken, body.access_token);
    this.storageService.setToken(TokenType.RefreshToken, body.refresh_token);
  }
}