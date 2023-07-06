// loan-status.component.ts

import { Component } from '@angular/core';
import { LoanService } from '../../services/loan.service';
import { LoanStatusResponse } from '../../models/loanstatusresponse.model';

@Component({
  selector: 'app-loan-status',
  templateUrl: './loan-status.component.html',
  styleUrls: ['./loan-status.component.scss']
})
export class LoanStatusComponent {
  name: string = '';
  documentNumber: string = '';

  loanStatusResponse: LoanStatusResponse | null = null;

  constructor(private loanService: LoanService) { }

  onCheckStatus() {
    this.loanService.getLoanStatus(this.name, this.documentNumber)
      .subscribe((response: LoanStatusResponse) => {
        this.loanStatusResponse = response;
      }, (error) => {
        console.error('Error:', error);
        this.loanStatusResponse = null;
      });
  }
}
