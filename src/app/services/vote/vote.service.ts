import { Injectable } from '@angular/core';
import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AwsService } from '../aws/aws.service';
import { BrowserModule } from '@angular/platform-browser';
import { Http, Response } from '@angular/http';
import { VideoService } from '../video/video.service';

@Injectable()
export class VoteService {
  // public allvotes:any;
  public votes:any = {};
  // public ALLVOTETOTAL_ENDPOINT:string = "https://3u55ylts79.execute-api.us-east-1.amazonaws.com/api/GetAllVoteTotals";
  private VOTECAST_ENDPOINT:string = "https://3u55ylts79.execute-api.us-east-1.amazonaws.com/api/CastVote";
  private VOTETOTAL_ENDPOINT:string = "https://3u55ylts79.execute-api.us-east-1.amazonaws.com/api/GetVoteTotals";
  public currentUpVotes:string ="null";
  public currentDnVotes:string ="null";

  constructor(
    private http:Http,
    private Video:VideoService,
    private AWS:AwsService
  ){}

  appSetup() {
    console.log("Entered VoteService 'appSetup '");
    window.setInterval(this.timerFired, 500);
  };

  // getAllVoteTotals = () => {
  //     this.http.get(this.ALLVOTETOTAL_ENDPOINT)
  //         .map((res:Response) => res.json())
  //         .subscribe(
  //             data => {
  //                 this.allvotes = data;
  //                 console.log(this.allvotes);
  //             }
  //         );
  // };

  updateCurrentVotes(videoId:string) {
    this.http.get(this.VOTETOTAL_ENDPOINT + '/' + videoId)
        .map((res:Response) => res.json())
        .subscribe(
            data => {
                this.votes = data[videoId].Votes;
                this.currentUpVotes = this.votes.safe;
                this.currentDnVotes = this.votes.out;
            }
        );
  };

  sendVote(vote:string) {
      const postbody = {CognitoID: this.AWS.CognitoID, VideoID: this.Video.currentVideoID, Vote: vote};
      console.log(postbody);
      const req = this.http.post(
        this.VOTECAST_ENDPOINT, postbody
      );
      // console.log(req);
      req.subscribe();
      this.updateCurrentVotes(this.Video.currentVideoID);
  };

  timerFired = () => {
    // console.log("Vote timer fired")
    this.updateCurrentVotes(this.Video.currentVideoID);
  };
}
