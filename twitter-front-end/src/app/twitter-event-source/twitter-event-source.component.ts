import { Component, OnInit } from '@angular/core';
import { EventSourceService  } from '../service/event-source.service';
import { Observer } from 'rxjs';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-twitter-event-source',
  templateUrl: './twitter-event-source.component.html',
  styleUrls: ['./twitter-event-source.component.css']
})
export class TwitterEventSourceComponent implements OnInit {
  private tweets = []

  constructor(private eventSourceService:EventSourceService) { }

  ngOnInit() {
    this.eventSourceService.eventSourceData({}).subscribe(e =>{
      this.tweets.unshift(e);
    })
  }

}
