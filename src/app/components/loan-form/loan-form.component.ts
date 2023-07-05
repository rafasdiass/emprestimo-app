import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { cpfValidator, cnpjValidator } from '../../validator/custom-validators';
import { Loan } from '../../models/loan.model';

@Component({
  selector: 'app-loan-form',
  templateUrl: './loan-form.component.html',
  styleUrls: ['./loan-form.component.scss']
})
export class LoanFormComponent implements OnInit {
  loanForm!: FormGroup;
  loanId!: string;
  loanStatus: string = '';
  documentControl: AbstractControl | null = null;
  previousDocumentType: string = '';
  isDocumentValid: boolean = false; // Adicionada propriedade para rastrear a validade do campo "Documento"

  constructor(private formBuilder: FormBuilder, private http: HttpClient) { }

  ngOnInit() {
    this.loanForm = this.formBuilder.group({
      personType: ['', Validators.required],
      document: [null, Validators.required],
      name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]],
      activeDebt: ['', Validators.required],
      loanValue: ['', Validators.required],
    });

    if (this.loanForm) {
      this.documentControl = this.loanForm.get('document');
      if (this.documentControl) {
        this.documentControl.valueChanges.subscribe((personType: string) => {
          if (personType !== this.previousDocumentType) {
            this.previousDocumentType = personType;
            if (personType === 'PF') {
              this.documentControl?.setValidators([Validators.required, cpfValidator()]);
            } else {
              this.documentControl?.setValidators([Validators.required, cnpjValidator()]);
            }
            this.documentControl?.updateValueAndValidity();
            this.isDocumentValid = this.documentControl?.valid ?? false; // Atualiza a validade do campo "Documento"
          }
        });

      }
    }
  }

  onSubmit() {
    if (this.loanForm && this.loanForm.valid && this.isDocumentValid) {
      const loanValue = this.loanForm.get('loanValue')?.value;
      const activeDebt = this.loanForm.get('activeDebt')?.value;

      if (loanValue > 50000 || loanValue > activeDebt / 2) {
        alert('Empréstimo negado');
        return;
      }

      this.http.post<any>('http://localhost:3000/loan', this.loanForm.value)
        .toPromise()
        .then((response: any) => {
          if (response && response.documentNumber) {
            alert('Empréstimo aprovado');
            this.loanId = response.documentNumber;
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
