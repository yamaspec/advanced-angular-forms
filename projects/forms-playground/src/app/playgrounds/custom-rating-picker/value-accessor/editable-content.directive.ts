import { Directive, ElementRef, HostListener, Renderer2, SecurityContext } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';

const DEFAULT_REVIEW_TEMPLATE = `
    <h4 data-placeholder="Title..."></h4>
    <p data-placeholder="Describe your experience..."></p>
`;

@Directive({
    selector: '[formControlName][contenteditable],[formControl][contenteditable],[ngModel][contenteditable]',
    standalone: true,
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: EditableContentValueAccessor,
            multi: true
        }
    ]
})
export class EditableContentValueAccessor implements ControlValueAccessor {

    onChange!: (newValue: string) => void;
    onTouch!: () => void;

    @HostListener('input', ['$event']) onInput(event: Event) {
        this.onChange((event.target as HTMLElement).innerHTML);
    }

    @HostListener('blur', ['$event']) onBlur() {
        this.onTouch();
    }
    
    constructor(
        private renderer: Renderer2,
        private elementRef: ElementRef,
        private sanitizer: DomSanitizer
    ) { }

    writeValue(obj: any): void {
        console.log('writeValue Method has been called.', obj);
        this.renderer.setProperty(
            this.elementRef.nativeElement,
            'innerHTML',
            this.sanitizer.sanitize( SecurityContext.HTML, obj) || DEFAULT_REVIEW_TEMPLATE
        );
    }

    registerOnChange(fn: any): void {
        console.log('registerOnChange Method has been called.', fn);
        this.onChange = fn;
    }
    
    registerOnTouched(fn: any): void {
        console.log('registerOnTouched Method has been called.', fn);
        this.onTouch = fn;
    }

    setDisabledState?(isDisabled: boolean): void {
        console.log('setDisabledState Method has been called.', isDisabled);
        this.renderer.setProperty(
            this.elementRef.nativeElement,
            'contentEditable',
            !isDisabled
        );
    }

}
