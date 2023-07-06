// loan-status.component.ts
import { Component } from '@angular/core';
import { LoanService } from '../../services/loan.service';
import { LoanStatusResponse } from '../../models/loanstatusresponse.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-loan-status',
  templateUrl: './loan-status.component.html',
  styleUrls: ['./loan-status.component.scss']
})
export class LoanStatusComponent {
  name: string = '';
  documentNumber: string = '';
  loanStatusResponse: LoanStatusResponse | null = null;
  hideCPF: boolean = false; // Nova propriedade para controlar a exibição do CPF/CNPJ

  constructor(private loanService: LoanService, private modalService: NgbModal) {}

  onCheckStatus(content: any) {
    this.loanService.getLoanStatus(this.name, this.documentNumber)
      .subscribe((response: LoanStatusResponse) => {
        this.loanStatusResponse = response;
        this.modalService.open(content); // open the modal
      }, (error) => {
        console.error('Error:', error);
        this.loanStatusResponse = null;
      });
  }
}
