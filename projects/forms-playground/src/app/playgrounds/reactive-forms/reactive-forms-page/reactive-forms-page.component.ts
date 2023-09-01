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
    
    form = new FormGroup({
        firstName: new FormControl('Marcus'),
        lastName: new FormControl('Latrell'),
        nickName: new FormControl('Slinger'),
        email: new FormControl('slinger@gmail.com'),
        yearOfBirth: new FormControl(1984),
        passport: new FormControl('PB123456'),
        address: new FormGroup({
            fullAddress: new FormControl(''),
            city: new FormControl(''),
            postCode: new FormControl(0)
        }),
        phones: new FormArray([
            new FormGroup({
                label: new FormControl(this.phoneLabels[0]),
                phone: new FormControl('')
            })
        ])
    });

    get years() {
        const now = new Date().getUTCFullYear();
        return Array(now - (now - 40)).fill('').map((_, idx) => now - idx);
    }

    constructor() {}

    ngOnInit(): void {}

    addPhone() {
        let phone: string | undefined | null = this.form.controls.phones.controls[0]?.controls.phone.value;
        if ((phone && phone.length > 0) || this.form.controls.phones.length === 0) {
            this.form.controls.phones.insert(0, new FormGroup({
                label: new FormControl(this.phoneLabels[0]),
                phone: new FormControl('')
            }));
        }
    }

    removePhone(index: number) {
        this.form.controls.phones.removeAt(index);
    }

}
