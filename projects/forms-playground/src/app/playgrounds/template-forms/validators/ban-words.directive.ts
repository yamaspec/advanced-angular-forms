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
        this.onChange();
    };

    private bannedWords: string[] = [];
    private onChange: () => void = () => {};

    constructor() { }

    /**
     * @description
     * Check for banned words present in the field
     * 
     * @param control The control of type AbstractControl to validate against
     * @returns ValidationErrors or null
     */
    validate(control: AbstractControl<string>): ValidationErrors | null {
        let foundBannedWord;
        if (control.value && control.value.length > 0 && this.bannedWords.length > 0) {
            foundBannedWord = this.bannedWords.find( word => word.toLowerCase() === control.value.toLowerCase());
        }
        return !foundBannedWord ? null : { appBanWords: {bannedWord: foundBannedWord} };
    }

    registerOnValidatorChange(fn: () => void) {
        this.onChange = fn;
    }

}
