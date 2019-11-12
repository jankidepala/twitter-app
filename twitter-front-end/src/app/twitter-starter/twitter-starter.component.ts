import { Component, OnInit } from '@angular/core';
import { StreamTwitterService } from '../../service/stream.service';
import { Observable } from 'rxjs';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { EventSourceService } from '../service/event-source.service';

@Component({
  selector: 'twitter-starter',
  templateUrl: './twitter-starter.component.html',
  styleUrls: ['./twitter-starter.component.css']
})

export class TwitterStarter implements OnInit {
  private tweets = [];
  isNotLoaded: boolean = false;
  myForm = new FormGroup({
    fieldTweetValues: new FormControl('house|cuervos'),
    fieldUserValue: new FormControl('user-19|55'),
    fieldVerifiedValue: new FormControl('true'),
    fieldLanguageValue: new FormControl(''),
    operatorTweet: new FormControl('contains'),
    operatorUser: new FormControl('contains'),
    operatorVerified: new FormControl('equals'),
    operatorLang: new FormControl('contains')

  })

  constructor(private streamService: StreamTwitterService, private eventSourceService: EventSourceService) { }
  ngOnInit() { }
  closeStream() {
    this.eventSourceService.closeStream();
  }
  submitForm() {
    this.isNotLoaded = true;
    this.eventSourceService.closeStream();
    let _f = this.myForm.controls;
    var t = [
      { field: 'tweet', operator: 'contains', val: 'house' },
      { field: 'user', operator: 'contains', val: 'user-19' },
      { field: 'verified', operator: 'contains', val: true },
      { field: 'lang', operator: 'contains', val: 'fr' },
    ];
    let _obj = []
    

    if (!!_f.fieldTweetValues.value) {
      let m = {}
      m['field'] = 'tweet'; 
      m['operator'] = _f.operatorTweet.value;
      m['val'] =  _f.fieldTweetValues.value;
      _obj[0] = m;
    }

    if (!!_f.fieldUserValue.value) {
      let m = {}
      m['field'] = 'user'; 
      m['operator'] = _f.operatorUser.value;
      m['val'] =  _f.fieldUserValue.value;
      _obj[1] = m;
    }

    if (!!_f.fieldLanguageValue.value) {
      let m = {}
      m['field'] = 'lang'; 
      m['operator'] = _f.operatorLang.value;
      m['val'] =  _f.fieldLanguageValue.value;
      _obj[2] = m;
    }
    if (!!_f.fieldVerifiedValue.value) {
      let m = {}
      m['field'] = 'verified'; 
      m['operator'] = _f.operatorVerified.value;
      m['val'] =  _f.fieldVerifiedValue.value;
      _obj[3] = m;
    }
    console.log(_obj)

    this.eventSourceService.eventSourceData(_obj).subscribe(e => {
      this.isNotLoaded = false;
      this.tweets.unshift(e);
    })

  }

}
