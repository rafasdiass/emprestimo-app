import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Loan } from '../models/loan.model';

@Injectable({
  providedIn: 'root'
})
export class LoanService {
  private baseURL = 'http://localhost:3000';

  constructor(private httpClient: HttpClient) { }

  createLoan(loan: Loan): Observable<any> {
    return this.httpClient.post(`${this.baseURL}/loan`, loan);
  }

  getLoanStatus(id: string): Observable<any> {
    return this.httpClient.get(`${this.baseURL}/loan-status/${id}`);
  }
}
