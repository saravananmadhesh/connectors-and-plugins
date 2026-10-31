# Adornments in MaskedTextBox

Adornments let you attach custom content — icons, buttons, separators, or labels — before or after the masked input. In Angular, you can achieve this using CSS classes or by wrapping the component in a container with custom elements.

## Common Use Cases

- **Entry guidance**: Add a user/phone icon to indicate expected input type
- **Quick actions**: Include a send button, clear button, or copy icon
- **Context labels**: Add static prefixes like country code `+1` or suffixes like `MHz`
- **Visual feedback**: Show status indicators adjacent to the input

## Using CSS Classes (Prepend Icons)

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
  phoneMask: string = '000-000-0000';
}
```

### Template

```html
<!-- Wrapping MaskedTextBox with prepend and append elements -->
<div class="e-input-group e-prepend-mask">
  <span class="e-icons e-user"></span>
  <span class="e-input-separator"></span>
  <ejs-maskedtextbox
    [mask]="phoneMask"
    promptChar="#"
    placeholder="Enter phone number"
    floatLabelType="Auto">
  </ejs-maskedtextbox>
  <span class="e-input-separator"></span>
  <span class="e-icons e-send"></span>
</div>
```

### CSS

```css
.e-input-group.e-prepend-mask {
  display: flex;
  align-items: center;
  border: 1px solid #d3d3d3;
  border-radius: 4px;
  padding: 0 8px;
}

.e-input-group .e-input-separator {
  width: 1px;
  height: 24px;
  background-color: #d3d3d3;
  margin: 0 8px;
}

.e-input-group .e-icons {
  cursor: pointer;
  font-size: 16px;
  color: #999;
}

.e-input-group .e-icons:hover {
  color: #333;
}

.e-input-group ejs-maskedtextbox {
  flex: 1;
  border: none;
  outline: none;
}
```

## Using ng-template for Dynamic Adornments

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
  phoneMask: string = '000-000-0000';
  userIcon: string = 'e-user';
  sendIcon: string = 'e-send';

  onSendClick(): void {
    console.log('Send button clicked');
  }
}
```

### Template

```html
<div class="e-input-group e-prepend-mask">
  <!-- Prepend content -->
  <span [ngClass]="['e-icons', userIcon]"></span>
  <span class="e-input-separator"></span>

  <!-- MaskedTextBox -->
  <ejs-maskedtextbox
    [mask]="phoneMask"
    promptChar="#"
    placeholder="Enter phone number"
    floatLabelType="Auto">
  </ejs-maskedtextbox>

  <!-- Append content -->
  <span class="e-input-separator"></span>
  <button (click)="onSendClick()" class="e-btn e-icon-btn">
    <span [ngClass]="['e-icons', sendIcon]"></span>
  </button>
</div>
```

## Advanced Example with Reactive Forms

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
  isValid: boolean = false;

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      phone: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.form.get('phone')?.statusChanges.subscribe(() => {
      this.isValid = this.form.get('phone')?.valid || false;
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
  <div class="e-input-group e-prepend-mask" [ngClass]="{ 'e-success': isValid }">
    <span class="e-icons e-mobile"></span>
    <span class="e-input-separator"></span>

    <ejs-maskedtextbox
      formControlName="phone"
      [mask]="phoneMask"
      placeholder="Phone Number"
      floatLabelType="Auto">
    </ejs-maskedtextbox>

    <span class="e-input-separator"></span>
    <span *ngIf="isValid" class="e-icons e-check" style="color: green;"></span>
  </div>

  <button type="submit" [disabled]="!form.valid">Submit</button>
</form>
```

## CSS for Icon States

```css
.e-input-group.e-success {
  border-color: #4caf50;
}

.e-input-group.e-success .e-check {
  color: #4caf50;
}

.e-btn.e-icon-btn {
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.e-btn.e-icon-btn:hover {
  background-color: #f5f5f5;
  border-radius: 4px;
}

.e-btn.e-icon-btn:active {
  background-color: #e0e0e0;
}
```

## Notes

- Use `e-input-separator` span between the icon and the input for proper visual separation
- Use `e-input-group` class for proper wrapper styling
- Use `e-prepend-mask` class to align the input wrapper when using prepend icons
- Use Syncfusion built-in icon classes (`e-icons e-user`, `e-icons e-send`, etc.) or any custom icon library
- Combine with Angular's `ngClass` and event binding for dynamic adornments
- Works seamlessly with ngModel and reactive forms

## Reference Documentation

For complete adornments documentation, visit:
https://ej2.syncfusion.com/angular/documentation/maskedtextbox/adornments
