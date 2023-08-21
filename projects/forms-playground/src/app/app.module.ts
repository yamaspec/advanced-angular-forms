import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TemplateFormsPageComponent } from './playgrounds/template-forms/template-forms-page/template-forms-page.component';
import { HeaderComponent } from './core/header/header.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    TemplateFormsPageComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
