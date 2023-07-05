import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { cpfValidator, cnpjValidator } from '../../validator/custom-validators';
import { Loan } from '../../models/loan.model';

@Component({
  selector: 'app-loan-form',
  templateUrl: './loan-form.component.html',
  styleUrls: ['./loan-form.component.scss']
})
export class LoanFormComponent {
  loanForm: FormGroup;
  isDocumentValid: boolean = false;

  constructor(private http: HttpClient) {
    this.loanForm = new FormGroup({
      personType: new FormControl('', Validators.required),
      document: new FormControl(null, Validators.required),
      name: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]),
      activeDebt: new FormControl('', Validators.required),
      loanValue: new FormControl('', Validators.required)
    });
  }

  onPersonTypeChange() {
    this.updateDocumentValidity();
  }

  onDocumentChange() {
    this.updateDocumentValidity();
  }

  private updateDocumentValidity() {
    const personTypeControl = this.loanForm.get('personType');
    const documentControl = this.loanForm.get('document');

    if (personTypeControl && documentControl) {
      const personType = personTypeControl.value;
      const document = documentControl.value;

      if (personType === 'PF') {
        this.isDocumentValid = cpfValidator()(document) === null;
        documentControl.setValidators([Validators.required, cpfValidator()]);
      } else if (personType === 'PJ') {
        this.isDocumentValid = cnpjValidator()(document) === null;
        documentControl.setValidators([Validators.required, cnpjValidator()]);
      } else {
        this.isDocumentValid = false;
        documentControl.setValidators(null);
      }

      documentControl.updateValueAndValidity();
    }
  }

  onSubmit() {
    if (this.loanForm.valid && this.isDocumentValid) {
      const loanValue = this.loanForm.get('loanValue')?.value;
      const activeDebt = this.loanForm.get('activeDebt')?.value;

      if (loanValue > 50000 || loanValue > activeDebt / 2) {
        alert('Empréstimo negado');
        return;
      }

      const loanData: Loan = {
        personType: this.loanForm.get('personType')?.value,
        document: this.loanForm.get('document')?.value,
        name: this.loanForm.get('name')?.value,
        documentNumber: '',
        activeDebt: this.loanForm.get('activeDebt')?.value,
        loanValue: loanValue
      };

      this.http.post<any>('http://localhost:3000/loan', loanData)
        .toPromise()
        .then((response: any) => {
          if (response && response.documentNumber) {
            alert('Empréstimo aprovado');
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
