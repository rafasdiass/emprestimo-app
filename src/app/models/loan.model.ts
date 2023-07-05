export interface Loan {
  personType: 'PF' | 'PJ';
  document: string;
  name: string;
  documentNumber: string;
  activeDebt: number;
  loanValue: number;
}
