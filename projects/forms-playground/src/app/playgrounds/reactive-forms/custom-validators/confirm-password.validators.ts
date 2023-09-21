import { AbstractControl, ValidationErrors } from "@angular/forms";

export function confirmPassword(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');
    const error = { confirmPassword: { mismatch: true } };
    if (password?.value === confirmPassword?.value) {
        return null;
    }
    confirmPassword?.setErrors(error);
    return  error;
}