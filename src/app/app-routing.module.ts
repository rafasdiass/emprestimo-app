import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoanFormComponent } from './components/loan-form/loan-form.component';
import { LoanStatusComponent } from './components/loan-status/loan-status.component';

const routes: Routes = [
  { path: 'loan-form', component: LoanFormComponent },
  { path: 'loan-status', component: LoanStatusComponent },
  { path: '', redirectTo: '/loan-form', pathMatch: 'full' }, // Página inicial redireciona para o formulário de empréstimo
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
