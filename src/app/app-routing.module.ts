import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoanFormComponent } from './components/loan-form/loan-form.component';
import { LoanStatusComponent } from './components/loan-status/loan-status.component';

const routes: Routes = [
  { path: 'solicitar-emprestimo', component: LoanFormComponent },
  { path: 'status-emprestimo', component: LoanStatusComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
