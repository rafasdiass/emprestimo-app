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
  loanStatus: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private loanService: LoanService
  ) {
    this.loanForm = this.formBuilder.group({
      name: '',
      documentNumber: '',
    });
  }

  ngOnInit() {
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
    const name = this.loanForm.get('name')?.value;
    const documentNumber = this.loanForm.get('documentNumber')?.value;

    if (name && documentNumber) {
      this.loanService.getLoanStatus(documentNumber)
        .subscribe((response: any) => {
          this.loanStatus = response.status;
        }, (error) => {
          console.error('Error:', error);
        });
    }
  }

  checkLoanStatus() {
    const name = this.loanForm.get('name')?.value;
    const documentNumber = this.loanForm.get('documentNumber')?.value;

    if (name && documentNumber) {
      this.loanService.getLoanStatus(documentNumber)
        .subscribe((response: any) => {
          this.loanStatus = response.status;
        }, (error) => {
          console.error('Error:', error);
        });
    }
  }
}
