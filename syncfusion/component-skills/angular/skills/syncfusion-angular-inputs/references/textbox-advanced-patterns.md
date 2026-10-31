# Advanced Patterns and Use Cases

This file covers advanced implementation patterns, custom validation, form integration, performance optimization, and common pitfalls with solutions.

## Custom Input Validation Patterns

### Real-Time Email Validation

```typescript
import { Component } from '@angular/core';
import { TextBoxModule } from '@syncfusion/ej2-angular-inputs';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { debounceTime, Subject } from 'rxjs';

@Component({
  selector: 'app-email-validator',
  standalone: true,
  imports: [TextBoxModule, FormsModule, CommonModule],
  template: `
    <div style="margin: 50px;">
      <label>Email Validation</label>
      <ejs-textbox 
        [(ngModel)]="email"
        placeholder="Enter email"
        [cssClass]="getEmailValidationClass()"
        (input)="onEmailInput()"
        [appendTemplate]="'statusIcon'"
      ></ejs-textbox>
      <ng-template #statusIcon>
        <span *ngIf="isValidating">⏳</span>
        <span *ngIf="!isValidating && isValidEmail">✓</span>
        <span *ngIf="!isValidating && !isValidEmail && email">✕</span>
      </ng-template>
      <p>{{ validationMessage }}</p>
    </div>
  `
})
export class EmailValidatorComponent {
  email = '';
  isValidating = false;
  isValidEmail = false;
  validationMessage = '';
  private emailSubject = new Subject<string>();

  constructor() {
    this.emailSubject
      .pipe(debounceTime(500))
      .subscribe(email => this.validateEmailAsync(email));
  }

  onEmailInput() {
    this.emailSubject.next(this.email);
  }

  validateEmailAsync(email: string) {
    if (!email) {
      this.validationMessage = '';
      return;
    }

    this.isValidating = true;
    // Simulate API call
    setTimeout(() => {
      const isValid = this.isValidEmailFormat(email);
      this.isValidEmail = isValid;
      this.isValidating = false;
      this.validationMessage = isValid ? '✓ Email is valid' : '✕ Invalid email format';
    }, 1000);
  }

  isValidEmailFormat(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  getEmailValidationClass(): string {
    if (!this.email) return '';
    return this.isValidEmail ? 'e-success' : 'e-error';
  }
}
```

### Phone Number Formatting

```typescript
@Component({
  selector: 'app-phone-formatter',
  standalone: true,
  imports: [TextBoxModule, FormsModule, CommonModule],
  template: `
    <div style="margin: 50px;">
      <label>Phone Number</label>
      <ejs-textbox 
        [(ngModel)]="phoneFormatted"
        placeholder="(123) 456-7890"
        (input)="onPhoneInput($event)"
        [htmlAttributes]="{ type: 'tel', maxlength: '14' }"
      ></ejs-textbox>
      <p style="font-size: 12px; color: #666;">Raw value: {{ phoneRaw }}</p>
    </div>
  `
})
export class PhoneFormatterComponent {
  phoneFormatted = '';
  phoneRaw = '';

  onPhoneInput(event: any) {
    const input = event.value;
    // Remove non-digits
    this.phoneRaw = input.replace(/\D/g, '');
    
    // Format as (XXX) XXX-XXXX
    if (this.phoneRaw.length <= 3) {
      this.phoneFormatted = this.phoneRaw;
    } else if (this.phoneRaw.length <= 6) {
      this.phoneFormatted = `(${this.phoneRaw.slice(0, 3)}) ${this.phoneRaw.slice(3)}`;
    } else {
      this.phoneFormatted = `(${this.phoneRaw.slice(0, 3)}) ${this.phoneRaw.slice(3, 6)}-${this.phoneRaw.slice(6, 10)}`;
    }
  }
}
```

### Credit Card Input

```typescript
@Component({
  selector: 'app-credit-card',
  standalone: true,
  imports: [TextBoxModule, FormsModule, CommonModule],
  template: `
    <div style="margin: 50px;">
      <label>Card Number</label>
      <ejs-textbox 
        [(ngModel)]="cardFormatted"
        placeholder="1234 5678 9012 3456"
        (input)="formatCardNumber($event)"
        [cssClass]="getCardValidClass()"
        [htmlAttributes]="{ maxlength: '19' }"
      ></ejs-textbox>
      <p style="font-size: 12px; color: #666;">
        Card Type: {{ getCardType() }}
      </p>
    </div>
  `
})
export class CreditCardComponent {
  cardFormatted = '';
  cardRaw = '';

  formatCardNumber(event: any) {
    const input = event.value;
    this.cardRaw = input.replace(/\D/g, '');
    
    // Format as XXXX XXXX XXXX XXXX
    const groups = this.cardRaw.match(/.{1,4}/g) || [];
    this.cardFormatted = groups.join(' ');
  }

  getCardType(): string {
    if (this.cardRaw.startsWith('4')) return 'Visa';
    if (this.cardRaw.startsWith('5')) return 'Mastercard';
    if (this.cardRaw.startsWith('3')) return 'Amex';
    return 'Unknown';
  }

  getCardValidClass(): string {
    if (this.cardRaw.length !== 16) return '';
    return this.isValidCardNumber() ? 'e-success' : 'e-error';
  }

  isValidCardNumber(): boolean {
    // Luhn algorithm
    let sum = 0;
    let isEven = false;
    for (let i = this.cardRaw.length - 1; i >= 0; i--) {
      let digit = parseInt(this.cardRaw.charAt(i), 10);
      if (isEven) {
        digit *= 2;
        if (digit > 9) digit -= 9;
      }
      sum += digit;
      isEven = !isEven;
    }
    return sum % 10 === 0;
  }
}
```

---

## Form Integration Patterns

### Multi-Step Form

```typescript
@Component({
  selector: 'app-multi-step-form',
  standalone: true,
  imports: [TextBoxModule, FormsModule, CommonModule],
  template: `
    <div style="margin: 50px; max-width: 500px;">
      <h2>Registration Form - Step {{ currentStep }}/3</h2>

      <!-- Step 1: Personal Info -->
      <div *ngIf="currentStep === 1">
        <h3>Personal Information</h3>
        <ejs-textbox 
          [(ngModel)]="form.firstName"
          placeholder="First Name"
          [floatLabelType]="'Auto'"
        ></ejs-textbox>
        <ejs-textbox 
          [(ngModel)]="form.lastName"
          placeholder="Last Name"
          [floatLabelType]="'Auto'"
          style="margin-top: 15px;"
        ></ejs-textbox>
      </div>

      <!-- Step 2: Contact Info -->
      <div *ngIf="currentStep === 2">
        <h3>Contact Information</h3>
        <ejs-textbox 
          [(ngModel)]="form.email"
          placeholder="Email"
          [htmlAttributes]="{ type: 'email' }"
          [floatLabelType]="'Auto'"
        ></ejs-textbox>
        <ejs-textbox 
          [(ngModel)]="form.phone"
          placeholder="Phone"
          [htmlAttributes]="{ type: 'tel' }"
          [floatLabelType]="'Auto'"
          style="margin-top: 15px;"
        ></ejs-textbox>
      </div>

      <!-- Step 3: Confirmation -->
      <div *ngIf="currentStep === 3">
        <h3>Review</h3>
        <div style="background: #f3f4f6; padding: 15px; border-radius: 4px;">
          <p><strong>Name:</strong> {{ form.firstName }} {{ form.lastName }}</p>
          <p><strong>Email:</strong> {{ form.email }}</p>
          <p><strong>Phone:</strong> {{ form.phone }}</p>
        </div>
      </div>

      <!-- Navigation -->
      <div style="margin-top: 20px; display: flex; gap: 10px;">
        <button 
          (click)="previousStep()" 
          [disabled]="currentStep === 1"
          style="padding: 10px 20px;"
        >
          Back
        </button>
        <button 
          (click)="nextStep()" 
          [disabled]="currentStep === 3 || !isStepValid()"
          style="padding: 10px 20px; background: #2563eb; color: white; border: none; cursor: pointer;"
        >
          {{ currentStep === 3 ? 'Submit' : 'Next' }}
        </button>
      </div>
    </div>
  `
})
export class MultiStepFormComponent {
  currentStep = 1;
  form = {
    firstName: '',
    lastName: '',
    email: '',
    phone: ''
  };

  nextStep() {
    if (this.isStepValid() && this.currentStep < 3) {
      this.currentStep++;
    } else if (this.currentStep === 3) {
      this.submitForm();
    }
  }

  previousStep() {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  isStepValid(): boolean {
    switch (this.currentStep) {
      case 1:
        return this.form.firstName.trim() !== '' && this.form.lastName.trim() !== '';
      case 2:
        return this.form.email.includes('@') && this.form.phone.length >= 10;
      case 3:
        return true;
      default:
        return false;
    }
  }

  submitForm() {
    console.log('Form submitted:', this.form);
  }
}
```

### Dynamic Form Fields

```typescript
@Component({
  selector: 'app-dynamic-form',
  standalone: true,
  imports: [TextBoxModule, FormsModule, CommonModule],
  template: `
    <div style="margin: 50px;">
      <h2>Dynamic Phone Numbers</h2>
      <button (click)="addPhoneField()">+ Add Phone</button>
      
      <div *ngFor="let phone of phoneNumbers; let i = index" style="margin: 15px 0;">
        <ejs-textbox 
          [(ngModel)]="phoneNumbers[i]"
          placeholder="Enter phone number"
          [htmlAttributes]="{ type: 'tel' }"
        ></ejs-textbox>
        <button 
          (click)="removePhoneField(i)" 
          style="margin-left: 10px; color: #dc2626;"
        >
          Remove
        </button>
      </div>
    </div>
  `
})
export class DynamicFormComponent {
  phoneNumbers: string[] = [''];

  addPhoneField() {
    this.phoneNumbers.push('');
  }

  removePhoneField(index: number) {
    this.phoneNumbers.splice(index, 1);
  }
}
```

---

## Performance Optimization

### Virtualization for Large Lists

```typescript
@Component({
  selector: 'app-perf-large-list',
  standalone: true,
  imports: [TextBoxModule, FormsModule, CommonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div style="margin: 50px;">
      <ejs-textbox 
        [(ngModel)]="searchTerm"
        placeholder="Search"
        (input)="onSearch()"
      ></ejs-textbox>
      
      <div style="height: 400px; overflow-y: auto; margin-top: 15px;">
        <div *ngFor="let item of filteredItems; trackBy: trackByFn">
          {{ item }}
        </div>
      </div>
    </div>
  `
})
export class PerfLargeListComponent implements OnInit {
  searchTerm = '';
  items: string[] = [];
  filteredItems: string[] = [];

  ngOnInit() {
    // Generate large list
    this.items = Array.from({ length: 10000 }, (_, i) => `Item ${i}`);
    this.filteredItems = this.items;
  }

  onSearch() {
    this.filteredItems = this.items.filter(item =>
      item.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  trackByFn(index: number): number {
    return index;
  }
}

import { ChangeDetectionStrategy } from '@angular/core';
```

### Debounced Search

```typescript
@Component({
  selector: 'app-debounced-search',
  standalone: true,
  imports: [TextBoxModule, FormsModule, CommonModule],
  template: `
    <div style="margin: 50px;">
      <ejs-textbox 
        [(ngModel)]="searchTerm"
        placeholder="Search (auto-debounced)"
        (input)="onSearch($event)"
      ></ejs-textbox>
      <p *ngIf="isSearching">Searching...</p>
      <div>
        <p *ngFor="let result of searchResults">{{ result }}</p>
      </div>
    </div>
  `
})
export class DebouncedSearchComponent {
  searchTerm = '';
  searchResults: string[] = [];
  isSearching = false;
  private searchSubject = new Subject<string>();

  constructor() {
    this.searchSubject
      .pipe(debounceTime(300))
      .subscribe(term => this.performSearch(term));
  }

  onSearch(event: any) {
    this.searchSubject.next(event.value);
  }

  performSearch(term: string) {
    if (!term) {
      this.searchResults = [];
      return;
    }

    this.isSearching = true;
    // Simulate API call
    setTimeout(() => {
      this.searchResults = [
        `Result for "${term}" 1`,
        `Result for "${term}" 2`,
        `Result for "${term}" 3`
      ];
      this.isSearching = false;
    }, 500);
  }
}

import { Subject, debounceTime } from 'rxjs';
```

---

## Common Pitfalls and Solutions

### Pitfall 1: Two-Way Binding Not Updating View

```typescript
// ❌ Wrong: Missing FormsModule
@Component({
  imports: [TextBoxModule],
  template: `<ejs-textbox [(ngModel)]="value"></ejs-textbox>`
})

// ✅ Correct: FormsModule imported
@Component({
  imports: [TextBoxModule, FormsModule],
  template: `<ejs-textbox [(ngModel)]="value"></ejs-textbox>`
})
export class CorrectComponent {
  value = '';
}
```

### Pitfall 2: Change Detection Issues

```typescript
// ❌ Problem: Form value not reflecting in template
onSubmit() {
  this.form.name = 'new value'; // Direct assignment may not trigger detection
}

// ✅ Solution: Use object spread or change detection
onSubmit() {
  this.form = { ...this.form, name: 'new value' }; // Triggers change detection
}
```

### Pitfall 3: Memory Leaks with Subscriptions

```typescript
// ❌ Problematic: Subscription not unsubscribed
export class BadComponent implements OnInit {
  constructor(private service: MyService) {}

  ngOnInit() {
    this.service.getData().subscribe(data => {
      // Memory leak: subscription never unsubscribed
    });
  }
}

// ✅ Solution: Unsubscribe or use async pipe
export class GoodComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();

  constructor(private service: MyService) {}

  ngOnInit() {
    this.service.getData()
      .pipe(takeUntil(this.destroy$))
      .subscribe(data => { /* ... */ });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
```

### Pitfall 4: Losing Focus on Re-render

```typescript
// ❌ Problem: Focus lost during validation re-render
validateField() {
  this.errors = this.validate(this.value); // May trigger re-render
  // Focus is lost if component re-renders
}

// ✅ Solution: Use ViewChild to manage focus
@ViewChild('textbox') textboxRef!: ElementRef;

validateField() {
  this.errors = this.validate(this.value);
  // Keep focus after validation
  setTimeout(() => {
    if (this.textboxRef?.nativeElement) {
      this.textboxRef.nativeElement.querySelector('input')?.focus();
    }
  });
}
```

### Pitfall 5: Validation Timing Issues

```typescript
// ❌ Problem: Validating on every keystroke (expensive)
onKeypress() {
  this.validateEmail(); // Called for every character
}

// ✅ Solution: Use debounce
private emailSubject = new Subject<string>();

ngOnInit() {
  this.emailSubject
    .pipe(debounceTime(500))
    .subscribe(email => this.validateEmail(email));
}

onInput(email: string) {
  this.emailSubject.next(email); // Debounced
}
```

---

## Best Practices Summary

1. **Always import FormsModule** for two-way binding
2. **Use TrackBy** in *ngFor loops for performance
3. **Debounce search/validation** operations
4. **Unsubscribe from Observables** to prevent memory leaks
5. **Use aria-describedby** for error messages
6. **Set appropriate input types** (email, tel, number, etc.)
7. **Validate on blur** not on every keystroke
8. **Provide clear error messages** for accessibility
9. **Use CSS classes** for validation states
10. **Test keyboard navigation** in your forms

