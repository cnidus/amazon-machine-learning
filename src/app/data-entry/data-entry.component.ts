import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AwsService } from '../services/aws/aws.service';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';
import { VideoService } from '../services/video/video.service';
import { VoteService } from '../services/vote/vote.service';
// import { VideoOptionsComponent } from '../video-options/video-options.component';



@Component({
  selector: 'app-data-entry',
  templateUrl: './data-entry.component.html',
  styleUrls: ['./data-entry.component.css'],
  providers: [VideoService, VoteService],
})

export class DataEntryComponent implements OnInit {
  // dataForm: FormGroup;
  votetotals: {};
  VODList: any;

  VOTE_ENDPOINT: "https://3u55ylts79.execute-api.us-east-1.amazonaws.com/api/";
  CACHEDTOTALS: "https://vote.frac.io/votetotals.json";
  VOD_ENDPOINT: "'https://kd1qq5azha.execute-api.us-east-1.amazonaws.com/api/GetVODList";

  constructor(
    // private fb: FormBuilder,
    private AWS: AwsService,
    public Vote: VoteService,
    public Video: VideoService,
    // private ds: DataFormService,
    private rt: Router,
    private http: HttpClient,

  ) { }

  ngOnInit() {
    this.Video.appSetup('videoDisplay');
    this.AWS.setAWS();
    this.Video.gatherJSON();
    // this.Vote.getAllVoteTotals();
    this.Vote.updateCurrentVotes(this.Video.currentVideoID);
    this.Vote.appSetup();
  }

}
