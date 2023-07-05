import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoanFormComponent } from './components/loan-form/loan-form.component';
import { LoanStatusComponent } from './components/loan-status/loan-status.component';

@NgModule({
  declarations: [
    AppComponent,
    LoanFormComponent,
    LoanStatusComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
