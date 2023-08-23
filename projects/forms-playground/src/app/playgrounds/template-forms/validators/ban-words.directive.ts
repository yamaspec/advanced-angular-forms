import { Directive, Input } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';

@Directive({
    selector: '[appBanWords]',
    standalone: true,
    providers: [
        {
            provide: NG_VALIDATORS, 
            useExisting: BanWordsDirective,
            multi: true
        }
    ]
})
export class BanWordsDirective implements Validator {
    @Input() set appBanWords( value: string | string[] ) {
        this.bannedWords = Array.isArray(value) ? value : [value];
    };

    private bannedWords: string[] = [];

    constructor() { }

    validate(control: AbstractControl<string>): ValidationErrors | null {
        let foundBannedWord;
        if (control.value && control.value.length > 0 && this.bannedWords.length > 0) {
            foundBannedWord = this.bannedWords.find( word => word.toLowerCase() === control.value.toLowerCase());
        }
        return !foundBannedWord ? null : { appBanWords: {bannedWord: foundBannedWord} };
    }

}
