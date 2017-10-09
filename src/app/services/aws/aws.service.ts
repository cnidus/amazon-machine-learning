import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import * as AWS from 'aws-sdk';

@Injectable()
export class AwsService {
  static authResult = new Subject<boolean>();
  public CognitoID:string = "";

  constructor() {
    this.setAWS()
  }

  isAuthenticated() {
    let authParams = JSON.parse(localStorage.getItem('authParams'))
    if (authParams && (authParams.google || authParams.facebook)) {
      AwsService.authResult.next(true);
      return true;
    } else {
      AwsService.authResult.next(false);
      return false
    }
  }

  getAWS() {
    return AWS;
  }

  setAWS() {
    const IdentityPoolId:string = 'us-east-1:b0453bc5-1210-48c0-a375-24fc84114a9c';
    let Logins;
    let storageToken = JSON.parse(localStorage.getItem('authParams'))

    if (storageToken && storageToken.google) {
      Logins = {
        'accounts.google.com': storageToken.google.id_token
      }
    } else if (storageToken && storageToken.facebook) {
      Logins = {
        'graph.facebook.com': storageToken.facebook.access_token
      }
    }
    // Cognito Credential mapping
    AWS.config.region = 'us-east-1';
    AWS.config.credentials = new AWS.CognitoIdentityCredentials({
      IdentityPoolId: IdentityPoolId,  // unauthenticated cognito Role
      Logins: Logins
    });

    // Get the CognitoID and store in a local variable.
    (AWS.config.credentials as AWS.Credentials).get( (err) => { } );
    this.CognitoID = localStorage.getItem('aws.cognito.identity-id.' + IdentityPoolId);
  }

}
