import { FormGroup } from '@angular/forms';

export function markAsDirty(form: FormGroup) {
  Object.entries(form.controls).forEach(([key, control]) => {
    control.markAsDirty();
    control.updateValueAndValidity();
  });
}
