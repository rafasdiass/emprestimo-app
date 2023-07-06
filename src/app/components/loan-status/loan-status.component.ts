// loan-status.component.ts

import { Component, AfterViewInit } from '@angular/core';
import { LoanService } from '../../services/loan.service';
import { LoanStatusResponse } from '../../models/loanstatusresponse.model';

declare var bootstrap: any;

@Component({
  selector: 'app-loan-status',
  templateUrl: './loan-status.component.html',
  styleUrls: ['./loan-status.component.scss']
})
export class LoanStatusComponent implements AfterViewInit {
  name: string = '';
  documentNumber: string = '';

  loanStatusResponse: LoanStatusResponse | null = null;

  private modal: any;

  constructor(private loanService: LoanService) {}

  ngAfterViewInit() {
    this.modal = new bootstrap.Modal(document.getElementById('statusModal'), {
      keyboard: false
    });
  }

  onCheckStatus() {
    this.loanService.getLoanStatus(this.name, this.documentNumber)
      .subscribe((response: LoanStatusResponse) => {
        this.loanStatusResponse = response;
        this.modal.show();
      }, (error) => {
        console.error('Error:', error);
        this.loanStatusResponse = null;
      });
  }
}
