import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { LoanService } from '../../services/loan.service';

@Component({
  selector: 'app-loan-status',
  templateUrl: './loan-status.component.html',
  styleUrls: ['./loan-status.component.scss']
})
export class LoanStatusComponent implements OnInit {
  loanForm: FormGroup;
  loanId!: string;
  loanStatus: string = '';

  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, private loanService: LoanService) {
    this.loanForm = this.formBuilder.group({
      name: '',
      documentNumber: '',
    });
  }

  ngOnInit() {
    // Carregar o nome e o número do documento dos parâmetros de consulta
    this.route.queryParams.subscribe(params => {
      this.loanForm.patchValue({
        name: params['name'],
        documentNumber: params['documentNumber'],
      });
      if (params['name'] && params['documentNumber']) {
        this.checkLoanStatus();
      }
    });
  }

  onSubmit() {
    this.loanService.createLoan(this.loanForm.value)
      .toPromise()
      .then((response: any) => {
        this.loanId = response.loanId;
        this.checkLoanStatus();
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  checkLoanStatus() {
    const name = this.loanForm.get('name')?.value;
    const documentNumber = this.loanForm.get('documentNumber')?.value;

    if (name && documentNumber) {
      this.loanService.getLoanStatus(documentNumber)
        .toPromise()
        .then((response: any) => {
          this.loanStatus = response.status;
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    }
  }
}
