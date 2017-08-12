import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import * as AWS from 'aws-sdk';

@Injectable()
export class AwsService {

  constructor() {
    AWS.config.region = 'us-east-1';
  }

  getAWS() {
    return AWS;
  }

  predict(formData: any): Observable<any> {
    let prediction = new Subject<{}>();
    let machinelearning = new AWS.MachineLearning();
    let params = {
      MLModelId: 'ml-ioqoyyKwND1', /* required */
      PredictEndpoint: 'https://realtime.machinelearning.us-east-1.amazonaws.com', /* required */
      Record: formData
    }

    machinelearning.predict(params, (err, data) => {
      if (err) {
        console.log(err, err.stack); // an error occurred
        prediction.next(err);
      }
      else {
        console.log(data);           // successful response
        prediction.next(data);
      }
    });

    return prediction.asObservable()
  }
}
