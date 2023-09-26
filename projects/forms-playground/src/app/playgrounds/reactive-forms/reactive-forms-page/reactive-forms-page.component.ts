import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormArray, FormBuilder, FormControl, FormGroup, FormRecord, ReactiveFormsModule, Validators } from '@angular/forms';
import { Observable, Subscription, bufferCount, filter, startWith, tap } from 'rxjs';
import { UserSkillsService } from '../../../core/user-skills.service';
import { banWords } from '../custom-validators/ban-words.validators';
import { confirmPassword } from '../custom-validators/confirm-password.validators';
import { UniqueNicknameValidator } from '../custom-validators/unique-nickname.validators';

@Component({
    selector: 'app-reactive-forms-page',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule],
    templateUrl: './reactive-forms-page.component.html',
    styleUrls: [
        '../../common-page.scss',
        '../../common-form.scss',
        './reactive-forms-page.component.scss'
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReactiveFormsPageComponent implements OnInit, OnDestroy {

    phoneLabels: string[] = ["Mobile", "Work", "Home"];
    years: number[] = this.getYears();
    skills$!: Observable<string[]>;
    private ageValidators!: Subscription;
    private formPendingState!: Subscription;
    
    form = this.formBuilder.group({
        firstName: ['Marcus', [Validators.required, Validators.minLength(2), banWords(['test', 'card'])]],
        lastName: ['Aurelius', [Validators.required, Validators.minLength(2)]],
        nickName: ['',
            // This control is different to allow the unique Nickname validator to call the API just on blur.
            {
                validators: [
                    Validators.required, 
                    Validators.minLength(2), 
                    Validators.pattern(/^[\w.]+$/),
                    banWords(['anonymous', 'dummy']),
                ],
                asyncValidators: [
                    this.uniqueNicknameValidator.validate.bind(this.uniqueNicknameValidator)
                ],
                updateOn: "blur"
            },
        ],
        email: ['slinger@gmail.com', [Validators.email, Validators.required]],
        yearOfBirth: [this.years[this.years.length - 1], Validators.required],
        passport: ['PB123456', [Validators.pattern(/^[A-Z]{2}[0-9]{6}$/), Validators.required]],
        address: this.formBuilder.nonNullable.group({                      // Could be Untyped: UntypedFormGroup({...})
            fullAddress: ['', Validators.required],
            city: ['', Validators.required],
            postCode: [0, Validators.required],
        }),
        phones: this.formBuilder.array([                             // Could be Untyped: UntypedFormArray([...])
            this.formBuilder.group({
                label: this.formBuilder.nonNullable.control(this.phoneLabels[0]),
                phone: ''
            })
        ]),
        skills: new FormRecord<FormControl<boolean>>({}),
        password: this.formBuilder.group({
            password: ['', [Validators.required, Validators.minLength(6)]],
            confirmPassword: ''
        },
        {
            // Assign the validator to the group in order to have access to all controls and compare them.
            validators: confirmPassword
        })
    });
    // Record is available since Angular 14.2: skills: this.formBuilder.record<boolean>({})
    // Skills with FormGroup example: skills: new FormGroup<{ [key: string]: FormControl<boolean> }>({})

    private getYears(): number[] {
        const now = new Date().getUTCFullYear();
        return Array(now - (now - 40)).fill('').map((_, idx) => now - idx);
    }

    constructor(
        private userSkills: UserSkillsService, 
        private formBuilder: FormBuilder,
        private uniqueNicknameValidator: UniqueNicknameValidator,
        private changeDetectorRef: ChangeDetectorRef
    ) {}

    ngOnInit(): void {
        this.skills$ = this.userSkills.getSkills().pipe(
            tap(skills => this.buildSkillControls(skills))
        );
        this.ageValidators = this.form.controls.yearOfBirth.valueChanges
        .pipe(
            tap(() => this.form.controls.passport.markAsDirty()),
            startWith(this.form.controls.yearOfBirth.value)
        )
        .subscribe(yearOfBirth => {
            // Note: Validators using functions as minLength(10) require to use a variable in order to modify them:
            // dynamicLength = Validators.minLength(10);
            // this.form.controls.passport.addValidators(this.dynamicLength)
            this.isAdult(yearOfBirth)
                ? this.form.controls.passport.addValidators(Validators.required)
                : this.form.controls.passport.removeValidators(Validators.required);
            this.form.controls.passport.updateValueAndValidity();
        });
        this.formPendingState = this.form.statusChanges.pipe(
            bufferCount(2, 1),
            filter(([prevState]) => prevState === "PENDING")
        ).subscribe(() => this.changeDetectorRef.markForCheck());
    }

    ngOnDestroy(): void {
        this.ageValidators.unsubscribe();
        this.formPendingState.unsubscribe();
    }

    addPhone() {
        let phone: string | undefined | null = this.form.controls.phones.controls[0]?.controls.phone.value;
        if ((phone && phone.length > 0) || this.form.controls.phones.length === 0) {
            this.form.controls.phones.insert(0, new FormGroup({
                label: new FormControl(this.phoneLabels[0], { nonNullable: true }),
                phone: new FormControl('')
            }));
        }
    }

    removePhone(index: number) {
        this.form.controls.phones.removeAt(index);
    }

    onSubmit() {
        console.log(this.form.controls);
    }

    buildSkillControls(skills: string[]) {
        skills.forEach((skill: string) => {
            this.form.controls.skills.addControl(skill, new FormControl(false, { nonNullable: true }));
        });
    }

    private isAdult(yearOfBirth: (number | null)): boolean {
        let isAdult: boolean = false;
        if (yearOfBirth) {
            let thisYear: number = new Date().getUTCFullYear()
            isAdult = (thisYear - yearOfBirth >= 18);
        }
        return isAdult;
    }

}
