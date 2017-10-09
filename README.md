# Frac-vote-web Front End

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.2.6.

Part of a larger project, with these components:
[Acme-Voting](https://github.com/cnidus/acme-voting): API + lambda back-ends.
[octank-lambda-auth](https://github.com/cnidus/octank-lambda-auth)


![alt text](/Architecture.png "Frac-Voting Architecture Diagram")

## Quick start
  git clone https://github.com/cnidus/frac-vote-web.git
  cd frac-vote-web
  npm install

Edit the auth details. This is based on https://github.com/cnidus/octank-lambda-auth. Deploy that first.
  vi src/environments/environment.ml.ts
  Replace the "login: <login url>" with your own string.

Change the deployment parameters to match your environment.
  vi package.json
  Replace 'frac-voting' in "pushtos3" script with your s3 ID.
  Replace 'E1KZNVNAWWOG9W' in "clear-cdn" script with your cloudfront distribution-id

Modify the API endpoints:
  vi src/app/services/video/video.service.ts
  Replace VOD_ENDPOINT:string = "https://<YourAPIEndpointHere.amazonaws.com/api/GetVODList";
  Replace videoPrefix:string = "https://<YourDNSNameHere>/transcoded/";

  vi src/app/services/vote/vote.service.ts
  Replace VOTECAST_ENDPOINT:string = "https://<YourAPIEndpointHere>.amazonaws.com/api/CastVote";
  Replace VOTETOTAL_ENDPOINT:string = "https://<YourAPIEndpointHere>.amazonaws.com/api/GetVoteTotals";

  vi src/app/services/aws/aws.service.ts
  Change IdentityPoolId:string = '<YourIdentityPoolIDHere>';   // unauthenticated cognito Role

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `-prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).
Before running the tests make sure you are serving the app via `ng serve`.
