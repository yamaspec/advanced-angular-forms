import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { UserInfo } from '../../../core/user-info';

@Component({
    selector: 'app-template-forms-page',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './template-forms-page.component.html',
    styleUrls: [
        '../../common-page.scss',
        '../../common-form.scss',
        './template-forms-page.component.scss'
        ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TemplateFormsPageComponent implements OnInit {

    userInfo: UserInfo = {
        firstName: 'Marcus',
        lastName: 'Aurelius',
        nickName: 'Honcho',
        email: 'marcus.aurelius@gmail.com',
        yearOfBirth: 1984,
        passport: 'PB4521B4587',
        fullAddress: 'Palatine Ave',
        city: 'Rome',
        postCode: 1000
    };

    constructor() { }

    get years() {
        const now = new Date().getUTCFullYear();
        return Array(now - (now - 40)).fill('').map((_, idx) => now - idx);
    }

    ngOnInit(): void {
    }

    onSubmitForm(form: NgForm, event: SubmitEvent) {
        // Reset form values after submitting
        this.userInfo = {
            firstName: '',
            lastName: '',
            nickName: '',
            email: '',
            yearOfBirth: 0,
            passport: '',
            fullAddress: '',
            city: '',
            postCode: 0
        };
    }

}
