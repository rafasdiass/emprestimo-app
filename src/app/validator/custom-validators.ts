import { AbstractControl, ValidatorFn } from '@angular/forms';
import * as CPF from 'cpf-cnpj-validator';
import { CustomValidationErrors } from '../models/customvalidation.model';

export function cpfValidator(): ValidatorFn {
  return (control: AbstractControl): CustomValidationErrors | null => {
    if (control.value && !CPF.cpf.isValid(control.value)) {
      return { cpfInvalid: true };
    }
    return null;
  };
}

export function cnpjValidator(): ValidatorFn {
  return (control: AbstractControl): CustomValidationErrors | null => {
    if (control.value && !CPF.cnpj.isValid(control.value)) {
      return { cnpjInvalid: true };
    }
    return null;
  };
}
