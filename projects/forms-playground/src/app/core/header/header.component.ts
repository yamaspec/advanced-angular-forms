import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
    selector: 'app-header',
    standalone: true,
    imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule],
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit {
    // Template-Driven solution
    // searchString: string = "";

    // Reactive form solution
    reactiveSearchString = new FormControl('');

    constructor() {}

    ngOnInit(): void {
        // Reactive form solution
        this.reactiveSearchString.valueChanges.pipe(
            debounceTime(300),
            distinctUntilChanged(),
            // switchMapt(string => ...http.call(string...))
        ).subscribe(console.log);
    }

    // Template driven solution
    onSearchStringChange(event: string) {
        // Not easy to use delay: setTimeout()
        // Save previous value and compare with new one to know if it deserves to trigger the search.
        console.log("onSearchStringChange: ", event);
    }

}
