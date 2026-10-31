# Validation States and Error Handling

## Table of Contents
- [Error, Warning, and Success States](#error-warning-and-success-states)
- [CSS Class Approach](#css-class-approach)
- [Visual Feedback Patterns](#visual-feedback-patterns)
- [Required Field Indicators](#required-field-indicators)
- [Form Integration](#form-integration)
- [Custom Error Messages](#custom-error-messages)

---

## Error, Warning, and Success States

The TextBox component supports three distinct visual validation states through CSS classes: error, warning, and success. These states provide immediate visual feedback to users about input validity.

### Error State

Indicates invalid input that requires correction.

```typescript
import { Component } from '@angular/core';
import { TextBoxModule } from '@syncfusion/ej2-angular-inputs';

@Component({
  selector: 'app-error-state',
  standalone: true,
  imports: [TextBoxModule],
  template: `
    <div style="margin: 50px;">
      <h2>Error State TextBox</h2>
      <ejs-textbox 
        placeholder="Input with error"
        cssClass="e-error"
        floatLabelType="Auto"
      ></ejs-textbox>
      <p style="color: #dc2626; margin-top: 8px;">Invalid email format</p>
    </div>
  `
})
export class ErrorStateComponent {}
```

### Warning State

Suggests potential issues or recommendations.

```typescript
<ejs-textbox 
  placeholder="Input with warning"
  cssClass="e-warning"
  floatLabelType="Auto"
></ejs-textbox>
<p style="color: #ffca1c; margin-top: 8px;">Password is weak</p>
```

### Success State

Confirms valid input.

```typescript
<ejs-textbox 
  placeholder="Input with success"
  cssClass="e-success"
  floatLabelType="Auto"
></ejs-textbox>
<p style="color: #22b24b; margin-top: 8px;">Username is available</p>
```

### All Three States Together

```typescript
import { Component } from '@angular/core';
import { TextBoxModule } from '@syncfusion/ej2-angular-inputs';

@Component({
  selector: 'app-validation-states',
  standalone: true,
  imports: [TextBoxModule],
  template: `
    <div style="margin: 50px;">
      <ejs-textbox placeholder="Input with warning" cssClass="e-warning"></ejs-textbox>
      <ejs-textbox placeholder="Input with error" cssClass="e-error"></ejs-textbox>
      <ejs-textbox placeholder="Input with success" cssClass="e-success"></ejs-textbox>
    </div>
  `
})
export class ValidationStatesComponent {}
```

---

## CSS Class Approach

### Dynamic CSS Classes

```typescript
import { Component } from '@angular/core';
import { TextBoxModule } from '@syncfusion/ej2-angular-inputs';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dynamic-validation',
  standalone: true,
  imports: [TextBoxModule, FormsModule, CommonModule],
  template: `
    <div style="margin: 50px;">
      <ejs-textbox 
        [(ngModel)]="email"
        placeholder="Email"
        [cssClass]="getValidationClass()"
        [floatLabelType]="'Auto'"
        (change)="onEmailChange()"
      ></ejs-textbox>
      <p [ngClass]="getStatusClass()">{{ validationMessage }}</p>
    </div>
  `,
  styles: [`
    :host ::ng-deep .error-text { color: #dc2626; }
    :host ::ng-deep .warning-text { color: #ffca1c; }
    :host ::ng-deep .success-text { color: #22b24b; }
  `]
})
export class DynamicValidationComponent {
  email = '';
  validationMessage = '';

  getValidationClass(): string {
    if (!this.email) return '';
    if (this.isValidEmail()) return 'e-success';
    if (this.email.length < 5) return 'e-warning';
    return 'e-error';
  }

  getStatusClass(): string {
    if (this.getValidationClass() === 'e-error') return 'error-text';
    if (this.getValidationClass() === 'e-warning') return 'warning-text';
    if (this.getValidationClass() === 'e-success') return 'success-text';
    return '';
  }

  onEmailChange() {
    if (!this.email) {
      this.validationMessage = '';
    } else if (this.isValidEmail()) {
      this.validationMessage = '✓ Valid email';
    } else if (this.email.length < 5) {
      this.validationMessage = '⚠ Email too short';
    } else {
      this.validationMessage = '✕ Invalid email format';
    }
  }

  isValidEmail(): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(this.email);
  }
}
```

### Multiple Validation States

```typescript
@Component({
  selector: 'app-multi-validation',
  standalone: true,
  imports: [TextBoxModule, FormsModule, CommonModule],
  template: `
    <div style="margin: 50px;">
      <h3>Username</h3>
      <ejs-textbox 
        [(ngModel)]="username"
        placeholder="3-20 characters"
        [cssClass]="getUsernameClass()"
        (change)="validateUsername()"
      ></ejs-textbox>
      <p [ngClass]="getMessageClass(username)">{{ usernameMessage }}</p>

      <h3>Password</h3>
      <ejs-textbox 
        [(ngModel)]="password"
        type="password"
        placeholder="Min 8 characters"
        [cssClass]="getPasswordClass()"
        (change)="validatePassword()"
      ></ejs-textbox>
      <p [ngClass]="getMessageClass(password)">{{ passwordMessage }}</p>

      <h3>Confirm Password</h3>
      <ejs-textbox 
        [(ngModel)]="confirmPassword"
        type="password"
        placeholder="Match password"
        [cssClass]="getConfirmPasswordClass()"
        (change)="validateConfirmPassword()"
      ></ejs-textbox>
      <p [ngClass]="getMessageClass(confirmPassword)">{{ confirmMessage }}</p>
    </div>
  `,
  styles: [`
    :host ::ng-deep .error-text { color: #dc2626; }
    :host ::ng-deep .success-text { color: #22b24b; }
  `]
})
export class MultiValidationComponent {
  username = '';
  password = '';
  confirmPassword = '';
  usernameMessage = '';
  passwordMessage = '';
  confirmMessage = '';

  getUsernameClass(): string {
    if (!this.username) return '';
    return (this.username.length >= 3 && this.username.length <= 20) ? 'e-success' : 'e-error';
  }

  getPasswordClass(): string {
    if (!this.password) return '';
    return this.password.length >= 8 ? 'e-success' : 'e-error';
  }

  getConfirmPasswordClass(): string {
    if (!this.confirmPassword) return '';
    return this.confirmPassword === this.password ? 'e-success' : 'e-error';
  }

  getMessageClass(field: string): string {
    if (!field) return '';
    // Determine class based on field validation
    return 'error-text'; // Simplified
  }

  validateUsername() {
    if (this.username.length < 3) {
      this.usernameMessage = '✕ Too short (min 3)';
    } else if (this.username.length > 20) {
      this.usernameMessage = '✕ Too long (max 20)';
    } else {
      this.usernameMessage = '✓ Valid username';
    }
  }

  validatePassword() {
    if (this.password.length < 8) {
      this.passwordMessage = '✕ Too short (min 8)';
    } else {
      this.passwordMessage = '✓ Strong password';
    }
  }

  validateConfirmPassword() {
    if (this.confirmPassword !== this.password) {
      this.confirmMessage = '✕ Passwords do not match';
    } else {
      this.confirmMessage = '✓ Passwords match';
    }
  }
}
```

---

## Visual Feedback Patterns

### Pattern 1: Real-Time Validation

```typescript
@Component({
  selector: 'app-realtime-validation',
  standalone: true,
  imports: [TextBoxModule, FormsModule, CommonModule],
  template: `
    <div style="margin: 50px;">
      <ejs-textbox 
        [(ngModel)]="username"
        placeholder="Username"
        [cssClass]="getValidationState()"
        (input)="validateUsername()"
      ></ejs-textbox>
      <div style="margin-top: 10px;">
        <p [ngClass]="getValidationState() === 'e-success' ? 'success' : 'error'">
          {{ feedbackMessage }}
        </p>
      </div>
    </div>
  `,
  styles: [`
    .success { color: #22b24b; }
    .error { color: #dc2626; }
  `]
})
export class RealtimeValidationComponent {
  username = '';
  feedbackMessage = '';

  validateUsername() {
    if (!this.username) {
      this.feedbackMessage = '';
    } else if (this.username.length < 3) {
      this.feedbackMessage = `${3 - this.username.length} more character(s) needed`;
    } else if (this.username.match(/^[a-zA-Z0-9_]*$/)) {
      this.feedbackMessage = 'Username is valid';
    } else {
      this.feedbackMessage = 'Only alphanumeric and underscore allowed';
    }
  }

  getValidationState(): string {
    if (!this.username) return '';
    if (this.username.length >= 3 && this.username.match(/^[a-zA-Z0-9_]*$/)) {
      return 'e-success';
    }
    return 'e-error';
  }
}
```

### Pattern 2: Validation with Async Checking

```typescript
@Component({
  selector: 'app-async-validation',
  standalone: true,
  imports: [TextBoxModule, FormsModule, CommonModule],
  template: `
    <div style="margin: 50px;">
      <ejs-textbox 
        [(ngModel)]="email"
        placeholder="Email"
        [cssClass]="validationState"
        [appendTemplate]="'statusIcon'"
        (blur)="checkEmailAvailability()"
      ></ejs-textbox>
      <ng-template #statusIcon>
        <span *ngIf="isChecking">⏳</span>
        <span *ngIf="!isChecking && validationState === 'e-success'">✓</span>
        <span *ngIf="!isChecking && validationState === 'e-error'">✕</span>
      </ng-template>
      <p>{{ statusMessage }}</p>
    </div>
  `
})
export class AsyncValidationComponent {
  email = '';
  validationState = '';
  isChecking = false;
  statusMessage = '';

  checkEmailAvailability() {
    if (!this.email) return;
    
    this.isChecking = true;
    this.statusMessage = 'Checking availability...';

    // Simulate API call
    setTimeout(() => {
      const isAvailable = Math.random() > 0.5;
      if (isAvailable) {
        this.validationState = 'e-success';
        this.statusMessage = '✓ Email is available';
      } else {
        this.validationState = 'e-error';
        this.statusMessage = '✕ Email already registered';
      }
      this.isChecking = false;
    }, 1000);
  }
}
```

---

## Required Field Indicators

### Asterisk for Required Fields

```typescript
import { Component } from '@angular/core';
import { TextBoxModule } from '@syncfusion/ej2-angular-inputs';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-required-field',
  standalone: true,
  imports: [TextBoxModule, FormsModule],
  template: `
    <div style="margin: 50px;">
      <label>
        <span style="color: #dc2626;">*</span> Full Name
      </label>
      <ejs-textbox 
        [(ngModel)]="fullName"
        placeholder="Enter your full name"
        [floatLabelType]="'Auto'"
      ></ejs-textbox>

      <label style="margin-top: 20px;">
        <span style="color: #dc2626;">*</span> Email
      </label>
      <ejs-textbox 
        [(ngModel)]="email"
        placeholder="Enter email"
        [htmlAttributes]="{ type: 'email' }"
        [floatLabelType]="'Auto'"
      ></ejs-textbox>

      <label style="margin-top: 20px;">
        Phone <span style="color: #999;">(optional)</span>
      </label>
      <ejs-textbox 
        [(ngModel)]="phone"
        placeholder="Enter phone"
        [htmlAttributes]="{ type: 'tel' }"
        [floatLabelType]="'Auto'"
      ></ejs-textbox>
    </div>
  `
})
export class RequiredFieldComponent {
  fullName = '';
  email = '';
  phone = '';
}
```

### CSS Approach for Asterisk via Float Label

For floating-label TextBoxes, add the asterisk to the float label automatically using the `.e-float-input.e-control-wrapper .e-float-text::after` CSS selector:

```css
/* Add mandatory asterisk to floating labels */
.e-float-input.e-control-wrapper .e-float-text::after {
  content: ' *';
  color: #dc2626;
  font-weight: bold;
}
```

```typescript
import { Component } from '@angular/core';
import { TextBoxModule } from '@syncfusion/ej2-angular-inputs';

@Component({
  selector: 'app-required-asterisk',
  standalone: true,
  imports: [TextBoxModule],
  template: `
    <div style="margin: 50px;">
      <h4>Floating label as auto</h4>
      <ejs-textbox placeholder="First Name" floatLabelType="Auto"></ejs-textbox>

      <h4>Floating label as always</h4>
      <ejs-textbox placeholder="First Name" floatLabelType="Always"></ejs-textbox>
    </div>
  `
})
export class RequiredAsteriskComponent {}
```

---

## Form Integration

### Contact Form with Validation

```typescript
@Component({
  selector: 'app-contact-form',
  standalone: true,
  imports: [TextBoxModule, FormsModule, CommonModule],
  template: `
    <form (ngSubmit)="submitForm()" style="margin: 50px;">
      <h2>Contact Form</h2>

      <div style="margin: 20px 0;">
        <label>Name *</label>
        <ejs-textbox 
          [(ngModel)]="form.name"
          name="name"
          placeholder="Your name"
          [cssClass]="form.name ? 'e-success' : ''"
          [floatLabelType]="'Auto'"
        ></ejs-textbox>
        <p *ngIf="!form.name && submitted" style="color: #dc2626;">Name is required</p>
      </div>

      <div style="margin: 20px 0;">
        <label>Email *</label>
        <ejs-textbox 
          [(ngModel)]="form.email"
          name="email"
          placeholder="Your email"
          [htmlAttributes]="{ type: 'email' }"
          [cssClass]="isValidEmail(form.email) ? 'e-success' : (form.email ? 'e-error' : '')"
          [floatLabelType]="'Auto'"
        ></ejs-textbox>
        <p *ngIf="form.email && !isValidEmail(form.email)" style="color: #dc2626;">
          Invalid email format
        </p>
      </div>

      <div style="margin: 20px 0;">
        <label>Phone</label>
        <ejs-textbox 
          [(ngModel)]="form.phone"
          name="phone"
          placeholder="Your phone"
          [htmlAttributes]="{ type: 'tel' }"
          [floatLabelType]="'Auto'"
        ></ejs-textbox>
      </div>

      <button 
        type="submit" 
        [disabled]="!isFormValid()"
        style="padding: 10px 20px; background: #2563eb; color: white; border: none; cursor: pointer; border-radius: 4px;"
      >
        Submit
      </button>

      <p *ngIf="submitted && isFormValid()" style="color: #22b24b; margin-top: 10px;">
        ✓ Form submitted successfully!
      </p>
    </form>
  `
})
export class ContactFormComponent {
  form = { name: '', email: '', phone: '' };
  submitted = false;

  isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  isFormValid(): boolean {
    return this.form.name.trim() !== '' && this.isValidEmail(this.form.email);
  }

  submitForm() {
    this.submitted = true;
    if (this.isFormValid()) {
      console.log('Form submitted:', this.form);
      // Send to server
    }
  }
}
```

---

## Custom Error Messages

### Dynamic Error Messages

```typescript
@Component({
  selector: 'app-custom-errors',
  standalone: true,
  imports: [TextBoxModule, FormsModule, CommonModule],
  template: `
    <div style="margin: 50px;">
      <ejs-textbox 
        [(ngModel)]="password"
        type="password"
        placeholder="Create password"
        [cssClass]="getPasswordValidationState()"
        (input)="validatePassword()"
      ></ejs-textbox>
      <div style="margin-top: 10px;">
        <p *ngFor="let error of passwordErrors" style="color: #dc2626; margin: 5px 0;">
          ✕ {{ error }}
        </p>
        <p *ngIf="passwordErrors.length === 0 && password" style="color: #22b24b;">
          ✓ Password meets all requirements
        </p>
      </div>

      <div style="margin-top: 20px;">
        <h4>Requirements:</h4>
        <ul style="font-size: 12px;">
          <li [ngClass]="password.length >= 8 ? 'met' : 'unmet'">At least 8 characters</li>
          <li [ngClass]="/[a-z]/.test(password) ? 'met' : 'unmet'">Lowercase letter</li>
          <li [ngClass]="/[A-Z]/.test(password) ? 'met' : 'unmet'">Uppercase letter</li>
          <li [ngClass]="/[0-9]/.test(password) ? 'met' : 'unmet'">Number</li>
          <li [ngClass]="/[!@#$%^&*]/.test(password) ? 'met' : 'unmet'">Special character</li>
        </ul>
      </div>
    </div>
  `,
  styles: [`
    .met { color: #22b24b; }
    .unmet { color: #999; }
  `]
})
export class CustomErrorsComponent {
  password = '';
  passwordErrors: string[] = [];

  validatePassword() {
    this.passwordErrors = [];

    if (this.password.length < 8) {
      this.passwordErrors.push('Password must be at least 8 characters');
    }
    if (!/[a-z]/.test(this.password)) {
      this.passwordErrors.push('Must contain lowercase letter');
    }
    if (!/[A-Z]/.test(this.password)) {
      this.passwordErrors.push('Must contain uppercase letter');
    }
    if (!/[0-9]/.test(this.password)) {
      this.passwordErrors.push('Must contain number');
    }
    if (!/[!@#$%^&*]/.test(this.password)) {
      this.passwordErrors.push('Must contain special character (!@#$%^&*)');
    }
  }

  getPasswordValidationState(): string {
    if (!this.password) return '';
    return this.passwordErrors.length === 0 ? 'e-success' : 'e-error';
  }
}
```

---

## Next Steps

- Learn about [styling-appearance.md](styling-appearance.md) to customize validation state colors
- Explore [accessibility-migration.md](accessibility-migration.md) for ARIA attributes in validation
- Check [adornments-customization.md](adornments-customization.md) for validation icons

