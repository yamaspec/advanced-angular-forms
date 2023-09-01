import { AfterViewInit, ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { UserInfo } from '../../../core/user-info';
import { BanWordsDirective } from '../validators/ban-words.directive';
import { PasswordShouldMatchDirective } from '../validators/password-should-match.directive';
import { UniqueNicknameDirective } from '../validators/unique-nickname.directive';

@Component({
    selector: 'app-template-forms-page',
    standalone: true,
    imports: [
        CommonModule, 
        FormsModule, 
        BanWordsDirective, 
        PasswordShouldMatchDirective, 
        UniqueNicknameDirective
    ],
    templateUrl: './template-forms-page.component.html',
    styleUrls: [
        '../../common-page.scss',
        '../../common-form.scss',
        './template-forms-page.component.scss'
        ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TemplateFormsPageComponent implements OnInit, AfterViewInit {

    userInfo: UserInfo = {
        firstName: 'Marcus',
        lastName: 'Aurelius',
        nickName: 'Honcho',
        email: 'marcus.aurelius@gmail.com',
        yearOfBirth: 1984,
        passport: 'PB123456',
        fullAddress: 'Palatine Ave',
        city: 'Rome',
        postCode: 1000,
        password: '',
        confirmPassword: ''
    };

    // this.userInfo cannot be used because it may be different than the form's model structure.
    // An ngForm may have groups, control names that differ from the UserInfo interface structure.
    private initialFormValues: unknown;
    @ViewChild(NgForm) formDirective!: NgForm;

    get isAdult() {
        return (new Date().getFullYear() - this.userInfo.yearOfBirth) >= 18;
    }

    get years() {
        const now = new Date().getUTCFullYear();
        return Array(now - (now - 40)).fill('').map((_, idx) => now - idx);
    }

    constructor() {}

    ngOnInit(): void {}

    ngAfterViewInit(): void {
        // The task to add controls to my ngForm is a Promise.
        // Thus, I have to put my control value assignment in the async tasks queue.
        // Otherwise, it will execute first and will be overwritten by addControl() method.
        queueMicrotask(() => {
            this.initialFormValues = this.formDirective.value;
        });
    }

    onSubmitForm(event: SubmitEvent) {
        console.log("Form: ", this.formDirective.value);
        // Reset form values after submitting
        // Strategy 1: Reset form values, validation statuses, making controls untouched, pristine, etc.
        // form.resetForm();

        // Strategy 2: Reset only control statuses but ot values
        this.formDirective.resetForm(this.formDirective.value);
        // Reset values to last submission values.
        this.initialFormValues = this.formDirective.value;
    }

    onReset(event: Event) {
        // To allow my method to execute and assign my values instead of the async Angular reset method.
        event.preventDefault();
        this.formDirective.resetForm(this.formDirective.value);
    }

}
