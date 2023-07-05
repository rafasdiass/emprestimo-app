import { Component } from '@angular/core';
import { cpf as CPF, cnpj as CNPJ } from 'cpf-cnpj-validator';
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

  constructor(private loanService: LoanService) {}

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

  onSubmit() {
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
        documentNumber: this.loanForm.document!,
        activeDebt: activeDebt,
        loanValue: loanValue
      };

      this.loanService.createLoan(loanData)
      .toPromise()
      .then((response: any) => {
        if (response && response.message) {
          alert(response.message);
        } else {
          alert('Empréstimo aprovado, mas não foi possível obter o número do documento.');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
    }
  }
}
