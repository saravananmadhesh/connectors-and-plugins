# Angular Integration

Use Angular features with MaskedTextBox for template-driven forms, reactive forms, component lifecycle management, and programmatic access. Template reference variables and ViewChild enable access to component methods.

## Relevant Angular Features

| Feature | Use in MaskedTextBox |
|---------|---------------------|
| `ngModel` | Two-way binding for template-driven forms |
| `FormControl` | Individual control binding in reactive forms |
| `FormGroup` | Group multiple controls in reactive forms |
| `ngOnInit` | Initialize component properties on component load |
| `ngAfterViewInit` | Access template reference variables after view initialization |
| `ViewChild` | Get reference to the MaskedTextBox instance programmatically |
| `@Input/@Output` | Pass data in and out of components |

## Template-Driven Forms with ngModel

### Component

```typescript
import { Component } from '@angular/core';
import { MaskedTextBoxModule } from '@syncfusion/ej2-angular-inputs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [MaskedTextBoxModule]
})
export class AppComponent {
  phone: string = '';
  phoneMask: string = '000-000-0000';

  onPhoneChange(value: string): void {
    console.log('Phone value changed to:', value);
  }
}
```

### Template

```html
<ejs-maskedtextbox
  [(ngModel)]="phone"
  [mask]="phoneMask"
  (change)="onPhoneChange(phone)"
  placeholder="Phone Number"
  floatLabelType="Always">
</ejs-maskedtextbox>

<p>Phone: {{ phone }}</p>
```

> `[(ngModel)]` creates two-way binding — changes in the component update the template, and user input updates the component.

## Reactive Forms with FormControl

### Component

```typescript
import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MaskedTextBoxModule } from '@syncfusion/ej2-angular-inputs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [MaskedTextBoxModule]
})
export class AppComponent implements OnInit {
  phoneControl: FormControl;
  phoneMask: string = '000-000-0000';

  ngOnInit(): void {
    this.phoneControl = new FormControl(
      '',
      [Validators.required]
    );
  }

  onSubmit(): void {
    if (this.phoneControl.valid) {
      console.log('Form value:', this.phoneControl.value);
    }
  }
}
```

### Template

```html
<ejs-maskedtextbox
  [formControl]="phoneControl"
  [mask]="phoneMask"
  placeholder="Phone Number"
  floatLabelType="Always">
</ejs-maskedtextbox>

<button (click)="onSubmit()" [disabled]="!phoneControl.valid">Submit</button>
```

## Reactive Forms with FormGroup

When managing multiple masked inputs in a form, `FormGroup` keeps control updates organized and predictable.

### Component

```typescript
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MaskedTextBoxModule } from '@syncfusion/ej2-angular-inputs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [MaskedTextBoxModule]
})
export class AppComponent implements OnInit {
  form: FormGroup;
  phoneMask: string = '000-000-0000';
  postalMask: string = '000-000';

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      phone: ['', Validators.required],
      postal: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    // Subscribe to form value changes
    this.form.valueChanges.subscribe((value) => {
      console.log('Form changed:', value);
    });
  }

  onSubmit(): void {
    if (this.form.valid) {
      console.log('Form submitted:', this.form.value);
    }
  }
}
```

### Template

```html
<form [formGroup]="form" (ngSubmit)="onSubmit()">
  <ejs-maskedtextbox
    formControlName="phone"
    [mask]="phoneMask"
    placeholder="Phone Number"
    floatLabelType="Always">
  </ejs-maskedtextbox>

  <ejs-maskedtextbox
    formControlName="postal"
    [mask]="postalMask"
    placeholder="Postal Code"
    floatLabelType="Always">
  </ejs-maskedtextbox>

  <button type="submit" [disabled]="!form.valid">Submit</button>
</form>
```

## Programmatic Access with ViewChild

Use `@ViewChild` to get a reference to the MaskedTextBox instance and call methods like `focusIn()`, `getMaskedValue()`, etc.

### Component

```typescript
import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { MaskedTextBoxModule } from '@syncfusion/ej2-angular-inputs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [MaskedTextBoxModule]
})
export class AppComponent implements AfterViewInit {
  @ViewChild('maskInput') maskInput: any;
  phoneMask: string = '000-000-0000';

  ngAfterViewInit(): void {
    // Auto-focus on component load
    this.maskInput.focusIn();
  }

  getMaskedValue(): void {
    const raw = this.maskInput.value;           // "1234567890"
    const masked = this.maskInput.getMaskedValue(); // "123-456-7890"
    console.log('Raw:', raw, 'Masked:', masked);
  }

  clearValue(): void {
    this.maskInput.value = '';
  }
}
```

### Template

```html
<ejs-maskedtextbox
  #maskInput
  [mask]="phoneMask"
  placeholder="Phone Number"
  floatLabelType="Always">
</ejs-maskedtextbox>

<button (click)="getMaskedValue()">Get Masked Value</button>
<button (click)="clearValue()">Clear</button>
```

## Auto-Focus on Component Load

Combine `ngAfterViewInit`, `@ViewChild`, and the `focusIn()` method to automatically focus the MaskedTextBox when the component loads.

### Component

```typescript
import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { MaskedTextBoxModule } from '@syncfusion/ej2-angular-inputs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [MaskedTextBoxModule]
})
export class AppComponent implements AfterViewInit {
  @ViewChild('productKey') productKeyInput: any;
  productKeyMask: string = '000-000-000-000';

  ngAfterViewInit(): void {
    this.productKeyInput.focusIn();
  }
}
```

### Template

```html
<ejs-maskedtextbox
  #productKey
  [mask]="productKeyMask"
  placeholder="Product Key"
  floatLabelType="Always">
</ejs-maskedtextbox>
```

## Multiple Masked Inputs with QueryList

For multiple instances of the same component, use `@ViewChildren` and `QueryList`:

### Component

```typescript
import { Component, ViewChildren, AfterViewInit, QueryList } from '@angular/core';
import { MaskedTextBoxModule } from '@syncfusion/ej2-angular-inputs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [MaskedTextBoxModule]
})
export class AppComponent implements AfterViewInit {
  @ViewChildren('maskInputs') maskInputs: QueryList<any>;

  masks = [
    { name: 'phone', mask: '000-000-0000', label: 'Phone' },
    { name: 'postal', mask: '000-000', label: 'Postal' },
    { name: 'product', mask: '000-000-000-000', label: 'Product Key' }
  ];

  ngAfterViewInit(): void {
    // Focus first input
    if (this.maskInputs.length > 0) {
      this.maskInputs.first.focusIn();
    }
  }

  focusInput(index: number): void {
    if (index >= 0 && index < this.maskInputs.length) {
      this.maskInputs.toArray()[index].focusIn();
    }
  }
}
```

### Template

```html
<div *ngFor="let maskConfig of masks; let i = index">
  <label>{{ maskConfig.label }}</label>
  <ejs-maskedtextbox
    #maskInputs
    [mask]="maskConfig.mask"
    [placeholder]="maskConfig.label"
    floatLabelType="Always">
  </ejs-maskedtextbox>
</div>

<button (click)="focusInput(0)">Focus Phone</button>
<button (click)="focusInput(1)">Focus Postal</button>
<button (click)="focusInput(2)">Focus Product</button>
```

## Component Lifecycle

### OnInit and OnDestroy

```typescript
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { MaskedTextBoxModule } from '@syncfusion/ej2-angular-inputs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [MaskedTextBoxModule]
})
export class AppComponent implements OnInit, OnDestroy {
  @ViewChild('maskInput') maskInput: any;
  phoneMask: string = '000-000-0000';
  phone: string = '';

  ngOnInit(): void {
    console.log('Component initialized');
  }

  ngOnDestroy(): void {
    console.log('Component destroyed');
    // Cleanup if needed
    if (this.maskInput) {
      this.maskInput.destroy();
    }
  }
}
```

## Reference Documentation

For complete Angular integration documentation, visit:
https://ej2.syncfusion.com/angular/documentation/maskedtextbox/getting-started
