import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {HttpClientJsonpModule, HttpClientModule} from '@angular/common/http';
import {ShareOpComponent} from './operators/share-op.component';
import {SwitchMapComponent} from './operators/switch-map.component';
import {DebounceTimeComponent} from './operators/debounce-time.component';
import {FormsModule} from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {WikiSearchService} from './services/wiki-search.service';
import {TakeComponent} from './operators/take/take.component';

@NgModule({
  declarations: [
    AppComponent,
    ShareOpComponent,
    SwitchMapComponent,
    DebounceTimeComponent,
    TakeComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    HttpClientJsonpModule,
    NgbModule,
  ],
  providers: [
    WikiSearchService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
