import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { TwitterEventSourceComponent } from './twitter-event-source/twitter-event-source.component';


@NgModule({
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: '', component: TwitterEventSourceComponent },
    ])
  ],
  declarations: [
    TwitterEventSourceComponent,
   
  ],
  bootstrap: [ TwitterEventSourceComponent ]
})
export class AppModule { }

