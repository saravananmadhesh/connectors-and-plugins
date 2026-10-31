# Adornments and Customization

## Table of Contents
- [Prepend and Append Templates](#prepend-and-append-templates)
- [Icon Adornments](#icon-adornments)
- [Button Adornments](#button-adornments)
- [Validation Status Indicators](#validation-status-indicators)
- [Unit Indicators](#unit-indicators)
- [Advanced Adornment Patterns](#advanced-adornment-patterns)
- [Performance and Accessibility](#performance-and-accessibility)

---

## Prepend and Append Templates

Adornments allow you to add custom content before (prepend) or after (append) the TextBox input. This is useful for visual context, units, icons, and action buttons.

### Basic Prepend Template

```typescript
import { Component } from '@angular/core';
import { TextBoxModule } from '@syncfusion/ej2-angular-inputs';

@Component({
  selector: 'app-prepend-template',
  standalone: true,
  imports: [TextBoxModule],
  template: `
    <div style="margin: 50px;">
      <h2>TextBox with Prepend Icon</h2>
      <ejs-textbox 
        placeholder="Search"
        [prependTemplate]="'prependTemplate'"
      ></ejs-textbox>
      <ng-template #prependTemplate>
        <span style="padding: 0 10px; color: #666;">🔍</span>
      </ng-template>
    </div>
  `
})
export class PrependTemplateComponent {}
```

### Basic Append Template

```typescript
<div style="margin: 50px;">
  <h2>TextBox with Append Icon</h2>
  <ejs-textbox 
    placeholder="Password"
    [appendTemplate]="'appendTemplate'"
  ></ejs-textbox>
  <ng-template #appendTemplate>
    <span style="padding: 0 10px; cursor: pointer;">👁️</span>
  </ng-template>
</div>
```

### Combined Prepend and Append

```typescript
<ejs-textbox 
  placeholder="Email"
  [prependTemplate]="'prependTemplate'"
  [appendTemplate]="'appendTemplate'"
></ejs-textbox>

<ng-template #prependTemplate>
  <span style="padding: 0 10px;">📧</span>
</ng-template>

<ng-template #appendTemplate>
  <span style="padding: 0 10px; cursor: pointer;">✓</span>
</ng-template>
```

---

## Icon Adornments

Icons provide visual context indicating the expected input type or purpose.

### Email Icon

```typescript
@Component({
  selector: 'app-email-icon',
  standalone: true,
  imports: [TextBoxModule],
  template: `
    <ejs-textbox 
      placeholder="Email Address"
      [floatLabelType]="'Auto'"
      [prependTemplate]="'emailIcon'"
      [htmlAttributes]="{ type: 'email' }"
    ></ejs-textbox>
    <ng-template #emailIcon>
      <i style="padding: 0 10px; color: #2563eb;">✉️</i>
    </ng-template>
  `
})
export class EmailIconComponent {}
```

### User/Account Icon

```typescript
<ejs-textbox 
  placeholder="Username"
  [floatLabelType]="'Auto'"
  [prependTemplate]="'userIcon'"
></ejs-textbox>
<ng-template #userIcon>
  <i style="padding: 0 10px; color: #7c3aed;">👤</i>
</ng-template>
```

### Search Icon

```typescript
<ejs-textbox 
  placeholder="Search"
  [appendTemplate]="'searchIcon'"
  [showClearButton]="true"
></ejs-textbox>
<ng-template #searchIcon>
  <i style="padding: 0 10px; cursor: pointer; color: #666;">🔍</i>
</ng-template>
```

### Location Icon

```typescript
<ejs-textbox 
  placeholder="Address"
  [prependTemplate]="'locationIcon'"
></ejs-textbox>
<ng-template #locationIcon>
  <i style="padding: 0 10px; color: #dc2626;">📍</i>
</ng-template>
```

### Phone Icon

```typescript
<ejs-textbox 
  placeholder="Phone Number"
  [prependTemplate]="'phoneIcon'"
  [htmlAttributes]="{ type: 'tel' }"
></ejs-textbox>
<ng-template #phoneIcon>
  <i style="padding: 0 10px; color: #059669;">☎️</i>
</ng-template>
```

---

## Button Adornments

Add interactive buttons for actions like showing/hiding passwords, clearing content, or validating input.

### Password Visibility Toggle

```typescript
import { Component } from '@angular/core';
import { TextBoxModule } from '@syncfusion/ej2-angular-inputs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-password-toggle',
  standalone: true,
  imports: [TextBoxModule, CommonModule],
  template: `
    <div style="margin: 50px;">
      <h2>Password with Visibility Toggle</h2>
      <ejs-textbox 
        [type]="passwordVisible ? 'text' : 'password'"
        placeholder="Enter password"
        [floatLabelType]="'Auto'"
        [appendTemplate]="'toggleTemplate'"
      ></ejs-textbox>
      <ng-template #toggleTemplate>
        <button 
          type="button"
          (click)="togglePassword()"
          style="
            padding: 0 10px;
            border: none;
            background: none;
            cursor: pointer;
            font-size: 18px;
          "
        >
          {{ passwordVisible ? '👁️' : '👁️‍🗨️' }}
        </button>
      </ng-template>
    </div>
  `
})
export class PasswordToggleComponent {
  passwordVisible = false;

  togglePassword() {
    this.passwordVisible = !this.passwordVisible;
  }
}
```

### Clear Button in Adornment

```typescript
@Component({
  selector: 'app-clear-adornment',
  standalone: true,
  imports: [TextBoxModule, FormsModule, CommonModule],
  template: `
    <ejs-textbox 
      [(ngModel)]="searchValue"
      placeholder="Search"
      [appendTemplate]="'clearButton'"
      (input)="onInput()"
    ></ejs-textbox>
    <ng-template #clearButton>
      <button 
        *ngIf="searchValue"
        type="button"
        (click)="clearSearch()"
        style="
          padding: 0 10px;
          border: none;
          background: none;
          cursor: pointer;
          color: #666;
        "
      >
        ✕
      </button>
    </ng-template>
  `
})
export class ClearAdornmentComponent {
  searchValue = '';

  onInput() {
    // Real-time search updates
  }

  clearSearch() {
    this.searchValue = '';
  }
}
```

### Validation Button

```typescript
@Component({
  selector: 'app-validate-button',
  standalone: true,
  imports: [TextBoxModule, FormsModule, CommonModule],
  template: `
    <ejs-textbox 
      [(ngModel)]="email"
      placeholder="Email"
      [appendTemplate]="'validateButton'"
      [htmlAttributes]="{ type: 'email' }"
    ></ejs-textbox>
    <ng-template #validateButton>
      <button 
        type="button"
        (click)="validateEmail()"
        style="
          padding: 5px 10px;
          border: 1px solid #ccc;
          background: #f0f0f0;
          cursor: pointer;
          border-radius: 4px;
        "
      >
        ✓
      </button>
    </ng-template>
    <p *ngIf="validationStatus">{{ validationStatus }}</p>
  `
})
export class ValidateButtonComponent {
  email = '';
  validationStatus = '';

  validateEmail() {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailRegex.test(this.email)) {
      this.validationStatus = '✓ Valid email';
    } else {
      this.validationStatus = '✗ Invalid email';
    }
  }
}
```

---

## Validation Status Indicators

Display visual indicators for validation status (error, warning, success) within adornments.

### Success Indicator

```typescript
@Component({
  selector: 'app-success-indicator',
  standalone: true,
  imports: [TextBoxModule, FormsModule, CommonModule],
  template: `
    <ejs-textbox 
      [(ngModel)]="username"
      placeholder="Username"
      [appendTemplate]="'statusIndicator'"
      (change)="validateUsername()"
    ></ejs-textbox>
    <ng-template #statusIndicator>
      <span *ngIf="isValid" style="color: #22b24b; font-size: 18px;">✓</span>
      <span *ngIf="!isValid && username" style="color: #dc2626; font-size: 18px;">✕</span>
    </ng-template>
  `
})
export class SuccessIndicatorComponent {
  username = '';
  isValid = false;

  validateUsername() {
    this.isValid = this.username.length >= 3;
  }
}
```

### Error Indicator

```typescript
<ejs-textbox 
  placeholder="Password"
  [type]="'password'"
  [appendTemplate]="'errorIcon'"
  [cssClass]="passwordStrength === 'weak' ? 'e-error' : ''"
></ejs-textbox>
<ng-template #errorIcon>
  <span *ngIf="passwordStrength === 'weak'" style="color: #dc2626;">⚠️</span>
  <span *ngIf="passwordStrength === 'strong'" style="color: #22b24b;">✓</span>
</ng-template>
```

### Warning Indicator

```typescript
<ejs-textbox 
  placeholder="Card Number"
  [appendTemplate]="'warningIcon'"
  [cssClass]="isExpiringSoon ? 'e-warning' : ''"
></ejs-textbox>
<ng-template #warningIcon>
  <span *ngIf="isExpiringSoon" style="color: #ffca1c;">⚠️</span>
</ng-template>
```

---

## Unit Indicators

Show units, currency symbols, or measurement indicators adjacent to input.

### Currency Symbol

```typescript
<ejs-textbox 
  placeholder="Amount"
  [prependTemplate]="'currencySymbol'"
  [htmlAttributes]="{ type: 'number', step: '0.01' }"
></ejs-textbox>
<ng-template #currencySymbol>
  <span style="padding: 0 10px; color: #666; font-weight: bold;">$</span>
</ng-template>
```

### Percentage Symbol

```typescript
<ejs-textbox 
  placeholder="Discount"
  [appendTemplate]="'percentageSymbol'"
  [htmlAttributes]="{ type: 'number', min: '0', max: '100' }"
></ejs-textbox>
<ng-template #percentageSymbol>
  <span style="padding: 0 10px; color: #666;">%</span>
</ng-template>
```

### Temperature Unit

```typescript
<ejs-textbox 
  placeholder="Temperature"
  [appendTemplate]="'tempUnit'"
  [htmlAttributes]="{ type: 'number' }"
></ejs-textbox>
<ng-template #tempUnit>
  <span style="padding: 0 10px; color: #666;">°C</span>
</ng-template>
```

### Domain Extension

```typescript
<ejs-textbox 
  placeholder="Username"
  [appendTemplate]="'domainExt'"
></ejs-textbox>
<ng-template #domainExt>
  <span style="padding: 0 10px; color: #999;">@example.com</span>
</ng-template>
```

### Weight Unit

```typescript
<ejs-textbox 
  placeholder="Weight"
  [appendTemplate]="'weightUnit'"
  [htmlAttributes]="{ type: 'number', step: '0.1' }"
></ejs-textbox>
<ng-template #weightUnit>
  <span style="padding: 0 10px; color: #666;">kg</span>
</ng-template>
```

---

## Advanced Adornment Patterns

### Dynamic Adornment Based on Input Type

```typescript
@Component({
  selector: 'app-dynamic-adornment',
  standalone: true,
  imports: [TextBoxModule, FormsModule, CommonModule],
  template: `
    <ejs-textbox 
      [(ngModel)]="inputValue"
      [prependTemplate]="'dynamicIcon'"
      placeholder="Enter value"
    ></ejs-textbox>
    <ng-template #dynamicIcon>
      <span style="padding: 0 10px; font-size: 16px;">
        {{ getIconForValue() }}
      </span>
    </ng-template>
  `
})
export class DynamicAdornmentComponent {
  inputValue = '';

  getIconForValue(): string {
    if (!this.inputValue) return '?';
    if (/^\d+$/.test(this.inputValue)) return '🔢';
    if (this.inputValue.includes('@')) return '📧';
    return '📝';
  }
}
```

### Adornment with Dropdown Menu

```typescript
@Component({
  selector: 'app-adornment-menu',
  standalone: true,
  imports: [TextBoxModule, CommonModule],
  template: `
    <ejs-textbox 
      placeholder="Select currency"
      [appendTemplate]="'currencyMenu'"
    ></ejs-textbox>
    <ng-template #currencyMenu>
      <select 
        style="border: none; background: none; cursor: pointer;"
        (change)="onCurrencyChange($event)"
      >
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="GBP">GBP</option>
      </select>
    </ng-template>
  `
})
export class AdornmentMenuComponent {
  selectedCurrency = 'USD';

  onCurrencyChange(event: Event) {
    this.selectedCurrency = (event.target as HTMLSelectElement).value;
  }
}
```

### Loading State Adornment

```typescript
@Component({
  selector: 'app-loading-adornment',
  standalone: true,
  imports: [TextBoxModule, FormsModule, CommonModule],
  template: `
    <ejs-textbox 
      [(ngModel)]="searchTerm"
      placeholder="Search..."
      [appendTemplate]="'loadingSpinner'"
      (input)="onSearch()"
    ></ejs-textbox>
    <ng-template #loadingSpinner>
      <span *ngIf="isLoading" style="padding: 0 10px;">⏳</span>
    </ng-template>
  `
})
export class LoadingAdornmentComponent {
  searchTerm = '';
  isLoading = false;

  onSearch() {
    if (this.searchTerm) {
      this.isLoading = true;
      // Simulate API call
      setTimeout(() => {
        this.isLoading = false;
      }, 1000);
    }
  }
}
```

---

## Performance and Accessibility

### Performance Best Practices

1. **Avoid Heavy Computations in Templates**
```typescript
// ❌ Bad: Expensive operation in template
{{ getIconForValue() }}

// ✅ Good: Pre-compute in component
ngOnInit() {
  this.icon = this.getIconForValue();
}
```

2. **Memoize Dynamic Icons**
```typescript
private iconCache = new Map<string, string>();

getIconForValue(): string {
  if (this.iconCache.has(this.inputValue)) {
    return this.iconCache.get(this.inputValue)!;
  }
  const icon = this.computeIcon();
  this.iconCache.set(this.inputValue, icon);
  return icon;
}
```

3. **Use TrackBy for Lists**
```typescript
trackByIndex(index: number): number {
  return index;
}

// In template
<ejs-textbox *ngFor="let item of items; trackBy: trackByIndex"></ejs-textbox>
```

### Accessibility Considerations

1. **Use Title Attributes**
```typescript
<ng-template #clearButton>
  <button 
    type="button"
    title="Clear this field"
    aria-label="Clear search"
    (click)="clear()"
  >
    ✕
  </button>
</ng-template>
```

2. **Keyboard Navigation**
```typescript
<ng-template #actionButton>
  <button 
    type="button"
    tabindex="0"
    (keydown.enter)="onAction()"
    (click)="onAction()"
  >
    Action
  </button>
</ng-template>
```

3. **Color Contrast**
```typescript
// Use high contrast colors for icon indicators
<span style="color: #000080;">✓</span> <!-- Good contrast -->
<span style="color: #cccccc;">✓</span> <!-- Poor contrast -->
```

---

## Next Steps

- Learn about [validation-states.md](validation-states.md) for comprehensive validation patterns
- Explore [styling-appearance.md](styling-appearance.md) for advanced CSS customization
- Check [input-features.md](input-features.md) for more state management options

