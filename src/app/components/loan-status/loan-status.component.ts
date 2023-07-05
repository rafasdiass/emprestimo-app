import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-loan-status',
  templateUrl: './loan-status.component.html',
  styleUrls: ['./loan-status.component.scss']
})
export class LoanStatusComponent implements OnInit {
  loanForm: FormGroup;
  loanId!: string;
  loanStatus: string = '';

  constructor(private http: HttpClient, private formBuilder: FormBuilder) {
    this.loanForm = this.formBuilder.group({
      personType: '',
      document: '',
      name: '',
      documentNumber: '',
      activeDebt: '',
      loanValue: '',
    });
  }

  ngOnInit() {
    // Nada a ser feito aqui
  }

  onSubmit() {
    this.http.post('http://localhost:3000/loan', this.loanForm.value)
      .pipe(
        map((response: any) => {
          this.loanId = response.loanId;
          this.checkLoanStatus();
        }),
        catchError(error => {
          console.error('Error:', error);
          return throwError(error);
        })
      )
      .subscribe();
  }

  checkLoanStatus() {
    this.http.get(`http://localhost:3000/loan-status/${this.loanId}`)
      .pipe(
        map((response: any) => {
          this.loanStatus = response.status;
        }),
        catchError(error => {
          console.error('Error:', error);
          return throwError(error);
        })
      )
      .subscribe(
        () => {},
        error => {
          console.error('Subscription error:', error);
        }
      );
  }
}
