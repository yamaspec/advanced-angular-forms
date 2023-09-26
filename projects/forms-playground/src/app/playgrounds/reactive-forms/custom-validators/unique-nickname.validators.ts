import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidator, ValidationErrors } from '@angular/forms';
import { Observable, catchError, map, of } from 'rxjs';
import { SharedApiAccessService } from '../../../services/shared-api-access.service';

@Injectable({
  providedIn: 'root'
})
export class UniqueNicknameValidator implements AsyncValidator {

    constructor(private sharedApiAccessService: SharedApiAccessService) { }

    validate(control: AbstractControl<string>): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
        return this.sharedApiAccessService.checkNickName(control.value).pipe(
            map((users: unknown[]) => users.length === 0 ? null : { uniqueNickName: {isTaken: true}}),
            catchError(() => of( {uniqueNickName: { isError: true} } ))
        );
    }

    // registerOnValidatorChange?(fn: () => void): void {
    //     throw new Error('Method not implemented.');
    // }
}
