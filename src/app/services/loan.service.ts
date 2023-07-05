import { Injectable } from '@angular/core';
import { Loan } from '../models/loan.model';
import { Observable } from 'rxjs';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class LoanService {
  constructor(private apiService: ApiService) { }

  createLoan(loan: Loan): Observable<any> {
    return this.apiService.post('loan', loan);
  }

  getLoanStatus(id: string): Observable<any> {
    return this.apiService.get(`loan-status/${id}`);
  }
}
