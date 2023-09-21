import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function banWords(bannedWords: string[] = []): ValidatorFn {
    return (control: AbstractControl<string | null>): ValidationErrors | null => {
        if (bannedWords.length > 0) {
            let bannedWord: (string | undefined) = bannedWords.find(
                (word: string) => 
                word.toLowerCase() === control.value?.toLocaleLowerCase()
            );
            if (bannedWord) {
                return { banWords: { bannedWords: bannedWord } };
            }
        }
        return null;
    }
}