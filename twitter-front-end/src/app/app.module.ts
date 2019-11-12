import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';

import { TwitterStarter } from './twitter-starter/twitter-starter.component';
import { StreamTwitterService} from '../service/stream.service';
import { TwitterEventSourceComponent } from './twitter-event-source/twitter-event-source.component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,

    RouterModule.forRoot([
      { path: '', component: TwitterStarter },
      { path: 'twit', component: TwitterEventSourceComponent },
    ])
  ],
  declarations: [
    AppComponent,
    TwitterStarter,
    TwitterEventSourceComponent
  ],
  providers: [
    StreamTwitterService
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }