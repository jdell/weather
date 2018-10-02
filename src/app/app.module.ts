import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppComponent } from './app.component';
import { SearchComponent } from './search/search.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatSelectModule, MatInputModule, MatCardModule, MatDatepickerModule, MatNativeDateModule, MatTabsModule} from '@angular/material';
import { DataService } from './services/data.service';
import { CanvasJsRendererComponent } from './canvas-js-renderer/canvas-js-renderer.component';
import { RequestCacheService } from './services/request-cache.service';
import { CachingInterceptorService } from './services/caching-interceptor.service';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    CanvasJsRendererComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatSelectModule,
    MatInputModule,
    MatCardModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ReactiveFormsModule,
    FlexLayoutModule
  ],
  providers: [
    DataService,
    RequestCacheService,
    { provide: HTTP_INTERCEPTORS, useClass: CachingInterceptorService, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
