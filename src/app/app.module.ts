import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ColorsListComponent } from './components/colors-list/colors-list.component';
import { ColorComponent } from './components/color/color.component';

@NgModule({
  declarations: [
    AppComponent,
    ColorsListComponent,
    ColorComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
