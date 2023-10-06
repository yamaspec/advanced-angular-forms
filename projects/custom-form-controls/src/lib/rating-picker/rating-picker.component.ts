import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, HostBinding, HostListener, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

export type RatingOptions = 'great' | 'good' | 'neutral' | 'bad' | null;

@Component({
    selector: 'cfc-rating-picker',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './rating-picker.component.html',
    styleUrls: ['./rating-picker.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: RatingPickerComponent,
            multi: true
        }
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class RatingPickerComponent implements OnInit, OnChanges, ControlValueAccessor {

    @Input() value: RatingOptions = null;
    @Input() disabled: boolean = false;
    @Output() changed = new EventEmitter<RatingOptions>();
    @Input() @HostBinding('attr.tabIndex') tabIndex = 0;             // Makes the element focusable.
    @HostListener('blur') onBlur() { this.onTouch(); }

    onChange: (newValue: RatingOptions) => void = () => {};
    onTouch: () => void = () => {};

    constructor(private changeDetectorRef: ChangeDetectorRef) { }

    ngOnInit(): void {}

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['value']) {
            this.onChange(changes['value'].currentValue);
        }
    }

    writeValue(obj: RatingOptions): void {
        this.value = obj;
        this.changeDetectorRef.markForCheck();
    }

    registerOnChange(fn: any): void {
        this.onChange = fn;
    }

    registerOnTouched(fn: any): void {
        this.onTouch = fn;
    }

    setDisabledState?(isDisabled: boolean): void {
        this.disabled = isDisabled;
        this.changeDetectorRef.markForCheck();
    }

    setValue(value: RatingOptions) {
        if (!this.disabled) {
            this.value = value;
            this.onChange(value);
            this.onTouch();
            this.changed.emit(value);
        }
    }
}
