import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Loan } from '../models/loan.model';
import { LoanStatusResponse } from '../models/loanstatusresponse.model';

@Injectable({
  providedIn: 'root'
})
export class LoanService {
  private baseURL = 'http://localhost:3000';

  constructor(private httpClient: HttpClient) { }

  createLoan(loan: Loan): Observable<any> {
    return this.httpClient.post(`${this.baseURL}/loan`, loan);
  }

  getLoanStatus(name: string, documentNumber: string): Observable<LoanStatusResponse> {
    const params = new HttpParams().set('name', name).set('documentNumber', documentNumber);
    return this.httpClient.get<LoanStatusResponse>(`${this.baseURL}/loan-status`, { params });
  }
}
