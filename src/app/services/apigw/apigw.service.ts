import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import * as AWS from 'aws-sdk';

@Injectable()
export class AwsService {
  static authResult = new Subject<boolean>();

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
      IdentityPoolId: 'us-east-1:b0453bc5-1210-48c0-a375-24fc84114a9c',  // unauthenticated cognito Role
      Logins: Logins
    })
  }

  // The APIGateway client
  // userInfoApiGoogle(accessKey,secretKey,sessionToken,name,surname,email,region,callback){
  //   let body = {
  //     name : name,
  //     surname : surname,
  //     email: email
  //   };
  //
  //   let userData;
  //
  //   let apigClient = apigClientFactory.newClient({
  //       accessKey: accessKey,
  //       secretKey: secretKey,
  //       sessionToken: sessionToken,
  //       region: region // The region where the API is deployed
  //   });
  //   apigClient.googlePost({},body,{})
  //     .then(function(response) {
  //       console.log("Send user data to API");
  //     }).catch(function (response) {
  //       console.log(response);
  //   });
  //   apigClient.googleGet({},{})
  //     .then(function(response) {
  //       console.log("Retrieve data from API");
  //       userData = response.data.Items[0];
  //       callback.googleCallbackWithData(userData);
  //     }).catch(function (response) {
  //       console.log(response);
  //     });
  // }
}
