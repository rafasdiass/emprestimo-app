import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-loan-form',
  templateUrl: './loan-form.component.html',
  styleUrls: ['./loan-form.component.scss']
})
export class LoanFormComponent implements OnInit {
  loanForm: FormGroup;
  errorMessage: string = '';

  constructor(private formBuilder: FormBuilder, private http: HttpClient, private router: Router) {
    this.loanForm = this.formBuilder.group({
      personType: ['', Validators.required],
      document: ['', Validators.required],
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      documentNumber: ['', Validators.required],
      activeDebt: ['', Validators.required],
      loanValue: ['', Validators.required],
    });
  }

  ngOnInit() {
  }

  onSubmit() {
    if (this.loanForm.valid) {
      this.http.post('http://localhost:3000/loan', this.loanForm.value)
      .pipe(map((response: any) => {
        if (response.status === 'approved') {
          console.log('Empréstimo aprovado');
          this.router.navigate(['/status-emprestimo', 'approved']);
        } else {
          this.errorMessage = response.message;
          console.log('Empréstimo rejeitado:', response.message);
          this.router.navigate(['/status-emprestimo', 'rejected']);
        }
      }))
      .subscribe();
    }
  }
}
