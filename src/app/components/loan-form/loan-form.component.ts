import { Component } from '@angular/core';
import { cpf as CPF, cnpj as CNPJ } from 'cpf-cnpj-validator';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Loan, PersonType } from '../../models/loan.model';
import { LoanService } from '../../services/loan.service';

@Component({
  selector: 'app-loan-form',
  templateUrl: './loan-form.component.html',
  styleUrls: ['./loan-form.component.scss']
})
export class LoanFormComponent {
  loanForm: Partial<Loan> = {
    personType: 'PF', // define um valor inicial para evitar undefined
    document: '',
    name: '',
    activeDebt: 0,
    loanValue: 0
  };

  isDocumentValid: boolean = false;
  hideCPF: boolean = false;

  constructor(private loanService: LoanService, private modalService: NgbModal) {}

  onPersonTypeChange() {
    this.updateDocumentValidity();
  }

  onDocumentChange() {
    this.updateDocumentValidity();
  }

  private updateDocumentValidity() {
    const document = this.loanForm.document;

    if (this.loanForm.personType === 'PF') {
      this.isDocumentValid = CPF.isValid(document || '');
    } else if (this.loanForm.personType === 'PJ') {
      this.isDocumentValid = CNPJ.isValid(document || '');
    } else {
      this.isDocumentValid = false;
    }
  }

  onSubmit(content: any) {
    const loanValue = Number(this.loanForm.loanValue);
    const activeDebt = Number(this.loanForm.activeDebt);

    if (this.isDocumentValid && activeDebt && loanValue) {
      if (loanValue > 50000 || loanValue > activeDebt / 2) {
        alert('Empréstimo negado');
        return;
      }

      const loanData: Loan = {
        personType: this.loanForm.personType as PersonType,
        document: this.loanForm.document!,
        name: this.loanForm.name!,
        documentNumber: this.loanForm.documentNumber!,
        activeDebt: activeDebt,
        loanValue: loanValue
      };

      this.loanService.createLoan(loanData)
      .subscribe((response: any) => {
        console.log('Resposta do servidor:', response);
        if (response && response.message) {
          this.openModal(content);
        } else {
          alert('Empréstimo aprovado, mas não foi possível obter o número do documento.');
        }
      }, (error) => {
        console.error('Error:', error);
      });
    }
  }

  openModal(content: any) {
    this.modalService.open(content).result.then((result) => {
      console.log(`Closed with: ${result}`);
    }, (reason) => {
      console.log(`Dismissed with: ${reason}`);
    });
  }
}
