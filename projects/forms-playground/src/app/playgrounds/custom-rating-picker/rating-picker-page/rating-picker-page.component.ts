import { CUSTOM_ELEMENTS_SCHEMA, ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import '@polymer/paper-input/paper-textarea';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { EditableContentValueAccessor } from '../value-accessor/editable-content.directive';
import { RatingPickerComponent } from 'custom-form-controls';
import { Rating } from './rating-picker.types';

@Component({
    selector: 'app-rating-picker-page',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, EditableContentValueAccessor, RatingPickerComponent],
    templateUrl: './rating-picker-page.component.html',
    styleUrls: [
        '../../common-page.scss',
        './rating-picker-page.component.scss',
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class RatingPickerPageComponent implements OnInit {

    form = this.formBuilder.group<Rating>({
        reviewText: '',
        reviewRating: null
    });

    constructor(private formBuilder: FormBuilder) {}

    ngOnInit(): void {}

    onSubmit() {
        console.log("this.form: ", this.form.value);
        this.form.reset();
    }

    // onInputHandler(event: Event) {
    //     console.log("onInputHandler: ", event);
    // }

}
