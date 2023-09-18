import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormArray, FormBuilder, FormControl, FormGroup, FormRecord, ReactiveFormsModule, Validators } from '@angular/forms';
import { Observable, tap } from 'rxjs';
import { UserSkillsService } from '../../../core/user-skills.service';

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
export class ReactiveFormsPageComponent implements OnInit {

    phoneLabels: string[] = ["Mobile", "Work", "Home"];
    years: number[] = this.getYears();
    skills$!: Observable<string[]>;
    
    form = this.formBuilder.group({
        firstName: ['Marcus', [Validators.required, Validators.minLength(2)]],
        lastName: ['Aurelius', [Validators.required, Validators.minLength(2)]],
        nickName: ['', 
            [
                Validators.required, 
                Validators.minLength(2), 
                Validators.pattern(/^[\w.]+$/)
            ]
        ],
        email: ['slinger@gmail.com', [Validators.email, Validators.required]],
        yearOfBirth: [
            this.formBuilder.nonNullable.control(this.years[this.years.length - 1]),
            Validators.required
        ],
        passport: ['PB123456', Validators.pattern(/^[A-Z]{2}[0-9]{6}$/)],
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
        skills: new FormRecord<FormControl<boolean>>({})
        // skills: this.formBuilder.record<boolean>({})    // Record is available since Angular 14.2
    });
    // Skills with FormGroup example:
    // skills: new FormGroup<{ [key: string]: FormControl<boolean> }>({})

    private getYears(): number[] {
        const now = new Date().getUTCFullYear();
        return Array(now - (now - 40)).fill('').map((_, idx) => now - idx);
    }

    constructor(private userSkills: UserSkillsService, private formBuilder: FormBuilder) {}

    ngOnInit(): void {
        this.skills$ = this.userSkills.getSkills().pipe(
            tap(skills => this.buildSkillControls(skills))
        );
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

}
