import { ChangeDetectorRef, Directive } from '@angular/core';
import { AbstractControl, AsyncValidator, NG_ASYNC_VALIDATORS, ValidationErrors } from '@angular/forms';
import { Observable, catchError, finalize, map, of } from 'rxjs';
import { SharedApiAccessService } from '../../../services/shared-api-access.service';

@Directive({
    selector: '[appUniqueNickname]',
    standalone: true,
    providers: [
        {
            provide: NG_ASYNC_VALIDATORS,
            multi: true,
            useExisting: UniqueNicknameDirective
        }
    ]
})
export class UniqueNicknameDirective implements AsyncValidator {

    constructor(private service: SharedApiAccessService, private changeDetector: ChangeDetectorRef) { }

    validate(control: AbstractControl<string>): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
        return  this.service.checkNickName(control.value)
                .pipe(
                    map(users => {
                        return users.length === 0 ? null : { appUniqueNickname: { isTaken: true }};
                    }),
                    catchError(() => of(( {appUniqueNickname: { error: true} } ))),
                    finalize(() => this.changeDetector.markForCheck())
                );
    }
}
