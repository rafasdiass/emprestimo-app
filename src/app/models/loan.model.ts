export type PersonType = 'PF' | 'PJ';

export interface Loan {
  personType: PersonType;
  document: string;
  name: string;
  documentNumber: string;
  activeDebt: number;
  loanValue: number;
}
