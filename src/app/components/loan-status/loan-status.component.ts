
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-loan-status',
  templateUrl: './loan-status.component.html',
  styleUrls: ['./loan-status.component.scss']
})
export class LoanStatusComponent implements OnInit {
  loanStatus: string = '';

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.http.get('http://localhost:3000/loan-status')
      .pipe(map((response: any) => {
        this.loanStatus = response.status;
      }))
      .subscribe();
  }
}
