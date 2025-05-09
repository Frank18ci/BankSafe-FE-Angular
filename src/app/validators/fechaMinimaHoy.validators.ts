import { of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { AbstractControl, ValidationErrors } from '@angular/forms';
import { Observable } from 'rxjs';

export function fechaMinimaValidator(control: AbstractControl): Observable<ValidationErrors | null> {
  const valor = control.value;
  const regex = /^(0[1-9]|[1-2][0-9]|3[0-1])\/(0[1-9]|1[0-2])\/[0-9]{4}$/;

  if (regex.test(valor)) {
    return of({ min: true }).pipe(delay(0));
  }

  if (!valor) return of(null);

  const fechaIngresada = new Date(valor);
  const hoy = new Date();
  hoy.setHours(0, 0, 0, 0);
  fechaIngresada.setHours(0, 0, 0, 0);

  if (fechaIngresada.getTime() < hoy.getTime()) {
    return of({ min: true }).pipe(delay(0));
  }

  return of(null).pipe(delay(0));
}