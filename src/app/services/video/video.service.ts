import { Injectable } from '@angular/core';
import { Http, Response} from '@angular/http';
import 'rxjs/add/operator/map';
// import { VoteService } from '../vote/vote.service';

@Injectable()
export class VideoService {

  public videoElement:any;
  public currentPath:string = "testpathstring";
  public currentTitle:string = "loading...";
  public currentVideoID:string = "initial_videoID";
  public currentTime:number = 0;
  public currentDesc:string = "";
  public totalTime:number = 0;
  public isPlaying:boolean = false;
  public isMuted:boolean = false;
  public playlist:Array<object> = [];
  public showDetails:boolean = false;
  public VOD_ENDPOINT:string = "https://kd1qq5azha.execute-api.us-east-1.amazonaws.com/api/GetVODList";

  public videoPrefix:string = "https://vote.frac.io/transcoded/";
  public videoSuffix:string = "/transcoded-web.mp4";

  constructor(
    private http:Http,
    // private Vote:VoteService
  ){}

  appSetup(v:string) {
    this.videoElement = <HTMLVideoElement> document.getElementById(v);
    this.currentPath = "";
    this.currentTitle = "";
    // window.setInterval(this.timerFired, 500);
    // console.log("Entered Video Service 'appSetup '");
  };

  gatherJSON = () => {
      this.http.get(this.VOD_ENDPOINT)
          .map((res:Response) => res.json())
          .subscribe(
              data => {
                  this.playlist = data;
                  // console.log(this.playlist);
                  this.selectedVideo(0);
                  console.log(this.playlist);
              }
          );
  };

  selectedVideo = (i:number) => {
      this.currentTitle = this.playlist[i]['FileName'];
      this.videoElement.src = this.videoPrefix + this.playlist[i]['FileName'] + this.videoSuffix;
      this.muteVideo();
      this.videoElement.play();
      this.isPlaying = true;
      this.currentVideoID = this.playlist[i]['VideoID'];
      // this.Vote.updateCurrentVotes();
  };

  muteVideo() {
      this.videoElement.volume = 0;
      this.isMuted = true;
  };

  timerFired() {
    console.log("Timer Fired");
  };

}
