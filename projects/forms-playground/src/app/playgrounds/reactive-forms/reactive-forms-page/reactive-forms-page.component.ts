import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

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
    years = this.getYears();
    
    form = new FormGroup({
        firstName: new FormControl<string>('Marcus'),       // string and null values are allowed.
        lastName: new FormControl('Latrell'),               // Could be Untyped: UntypedFormControl('Latrell')
        nickName: new FormControl('Slinger', { nonNullable: true }),   // string only and define value by default.
        email: new FormControl('slinger@gmail.com'),
        yearOfBirth: new FormControl(this.years[this.years.length - 1], { nonNullable: true }),  // number and value by default.
        passport: new FormControl('PB123456'),
        address: new FormGroup({                            // Could be Untyped: UntypedFormGroup({...})
            fullAddress: new FormControl('', { nonNullable: true }),
            city: new FormControl('', { nonNullable: true }),
            postCode: new FormControl(0, { nonNullable: true })
        }),
        phones: new FormArray([                             // Could be Untyped: UntypedFormArray([...])
            new FormGroup({
                label: new FormControl(this.phoneLabels[0], { nonNullable: true }),
                phone: new FormControl('')
            })
        ])
    });

    private getYears() {
        const now = new Date().getUTCFullYear();
        return Array(now - (now - 40)).fill('').map((_, idx) => now - idx);
    }

    constructor() {}

    ngOnInit(): void {}

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
        
    }

}
