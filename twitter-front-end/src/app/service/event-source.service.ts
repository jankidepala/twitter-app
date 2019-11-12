import { Injectable } from '@angular/core';
import { Observable } from 'rxjs'
import { EventSourcePolyfill } from 'ng-event-source';
import { TwitterEventSourceComponent } from '../twitter-event-source/twitter-event-source.component';

@Injectable({
  providedIn: 'root'
})
export class EventSourceService {
  private url = 'http://tweet-service.herokuapp.com/stream';
  private eventSource = new EventSourcePolyfill(this.url, { heartbeatTimeout: 5000, connectionTimeout: -0 });

  constructor() { }

  closeStream() {
    this.eventSource.close();
  }
  doSSE(t, data, observer) {
    let condition1 = true;
    let condition2 = true;
    let condition3 = true;
    let condition4 = true;

    if (!!t[0] && t[0].field == 'tweet' && t[0].operator == 'contains') {
     var reg = new RegExp(t[0].val, "g");
      condition1 = data.tweet.match(reg) != null ? true : false
    }
    else if (!!t[0] && t[0].field == 'tweet' && t[0].operator == 'equals') {
      condition1 = data.tweet == t[0].val;
    }

    if (!!t[1] && t[1].field == 'user' && t[1].operator == 'contains') {
      condition2 = data.user.match(new RegExp(t[1].val, "i")) != null ? true : false
    }

    else if (!!t[1] && t[1].field == 'user' && t[1].operator == 'equals') {
      condition2 = data.user == t[1].val;
    }

    if (!!t[2] && t[2].field == 'lang' && t[2].operator == 'contains') {
      condition3 = data.lang.match(new RegExp(t[2].val, "i")) != null ? true : false
    }
    else if (!!t[2] && t[2].field == 'lang' && t[2].operator == 'equals') {
      condition3 = data.lang == t[2].val;
    }

    else if (!!t[3] && t[3].field == 'verified' && t[3].operator == 'equals') {
      condition4 = data.verified == Boolean(t[3].val);
    }

    condition1 && condition2 && condition3 && condition4
    ? observer.next(data)
    : null;
    
}

  eventSourceData(t): Observable<any> {
    return new Observable<any>(observer => {
      this.eventSource = new EventSourcePolyfill(this.url, { heartbeatTimeout: 5000, connectionTimeout: -0 });
      this.eventSource.onmessage = (e) => {
        var data = JSON.parse(e.data);
        this.doSSE(t, data, observer);
      }
      return () => {
        this.eventSource.close();
      };
    })
  }
}