# Accessibility and Migration

## Table of Contents
- [WCAG 2.2 and Section 508 Compliance](#wcag-22-and-section-508-compliance)
- [Keyboard Navigation Support](#keyboard-navigation-support)
- [ARIA Attributes](#aria-attributes)
- [Screen Reader Compatibility](#screen-reader-compatibility)
- [Migration from CSS TextBox](#migration-from-css-textbox)
- [RTL and Mobile Accessibility](#rtl-and-mobile-accessibility)

---

## WCAG 2.2 and Section 508 Compliance

The Syncfusion Angular TextBox component is built with accessibility compliance in mind, supporting:

- **WCAG 2.2**: Web Content Accessibility Guidelines Level AA
- **Section 508**: US Federal accessibility standard
- **ADA**: Americans with Disabilities Act compliance
- **Color Contrast**: Minimum 4.5:1 for text

### Accessible TextBox Implementation

```typescript
import { Component, ViewChild } from '@angular/core';
import { TextBoxComponent, TextBoxModule } from '@syncfusion/ej2-angular-inputs';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-accessible-textbox',
  standalone: true,
  imports: [TextBoxModule, FormsModule],
  template: `
    <div style="margin: 50px;">
      <h2>Accessible Contact Form</h2>
      <form (ngSubmit)="submitForm()">
        <!-- Name field -->
        <div style="margin: 20px 0;">
          <label for="userName">
            <span style="color: #dc2626;">*</span> Full Name
          </label>
          <ejs-textbox 
            id="userName"
            [(ngModel)]="form.name"
            name="name"
            placeholder="Enter your full name"
            [floatLabelType]="'Auto'"
            [htmlAttributes]="{ 'aria-required': 'true', 'aria-describedby': 'nameHelp' }"
          ></ejs-textbox>
          <p id="nameHelp" style="font-size: 12px; color: #666; margin-top: 4px;">
            Please enter your first and last name
          </p>
        </div>

        <!-- Email field -->
        <div style="margin: 20px 0;">
          <label for="userEmail">
            <span style="color: #dc2626;">*</span> Email Address
          </label>
          <ejs-textbox 
            id="userEmail"
            [(ngModel)]="form.email"
            name="email"
            placeholder="your@email.com"
            [floatLabelType]="'Auto'"
            [htmlAttributes]="{ type: 'email', 'aria-required': 'true', 'aria-invalid': 'false', 'aria-describedby': 'emailHelp' }"
          ></ejs-textbox>
          <p id="emailHelp" style="font-size: 12px; color: #666; margin-top: 4px;">
            We'll never share your email
          </p>
        </div>

        <!-- Message field -->
        <div style="margin: 20px 0;">
          <label for="userMessage">Message</label>
          <ejs-textbox 
            id="userMessage"
            [(ngModel)]="form.message"
            name="message"
            placeholder="Your message here"
            [multiline]="true"
            [floatLabelType]="'Auto'"
            [htmlAttributes]="{ 'aria-describedby': 'messageHelp charCount' }"
            (created)="onMessageCreated()"
          ></ejs-textbox>
          <p id="messageHelp" style="font-size: 12px; color: #666;">
            Share your thoughts and feedback
          </p>
          <p id="charCount" style="font-size: 12px; color: #999;">
            {{ form.message.length }} characters
          </p>
        </div>

        <button type="submit" [disabled]="!isFormValid()" aria-label="Submit form">
          Submit Form
        </button>
      </form>
    </div>
  `
})
export class AccessibleTextboxComponent {
  @ViewChild('userMessage') messageBox!: TextBoxComponent;
  form = { name: '', email: '', message: '' };

  onMessageCreated(): void {
    this.messageBox.addAttributes({ rows: '5' } as any);
  }

  isFormValid(): boolean {
    return this.form.name.trim() !== '' && this.form.email.includes('@');
  }

  submitForm() {
    if (this.isFormValid()) {
      console.log('Form submitted:', this.form);
    }
  }
}
```

### Compliance Checklist

```
✓ WCAG 2.2 Level AA compliant
✓ Keyboard navigation support
✓ Screen reader compatible
✓ Color contrast ratio ≥4.5:1
✓ Form labels associated with inputs
✓ Error messages linked via aria-describedby
✓ Validation states announced
✓ Focus indicators visible
```

---

## Keyboard Navigation Support

The TextBox component supports comprehensive keyboard navigation.

### Supported Keyboard Shortcuts

| Key(s) | Action |
|--------|--------|
| `Tab` | Move focus to TextBox |
| `Shift + Tab` | Move focus to previous element |
| `Home` | Move cursor to beginning of text |
| `End` | Move cursor to end of text |
| `Ctrl + A` | Select all text |
| `Ctrl + C` | Copy selected text |
| `Ctrl + X` | Cut selected text |
| `Ctrl + V` | Paste from clipboard |
| `Backspace` | Delete character before cursor |
| `Delete` | Delete character after cursor |
| `Arrow Keys` | Move cursor left/right |

### Keyboard Navigation Example

```typescript
@Component({
  selector: 'app-keyboard-nav',
  standalone: true,
  imports: [TextBoxModule, FormsModule, CommonModule],
  template: `
    <div style="margin: 50px;">
      <p>Use Tab/Shift+Tab to navigate between fields:</p>
      
      <div style="margin: 15px 0;">
        <label for="field1">First Name</label>
        <ejs-textbox 
          id="field1"
          placeholder="Press Tab to move next"
        ></ejs-textbox>
      </div>

      <div style="margin: 15px 0;">
        <label for="field2">Last Name</label>
        <ejs-textbox 
          id="field2"
          placeholder="Press Tab to move next"
        ></ejs-textbox>
      </div>

      <div style="margin: 15px 0;">
        <label for="field3">Email</label>
        <ejs-textbox 
          id="field3"
          placeholder="Last field - Shift+Tab to go back"
          [htmlAttributes]="{ type: 'email' }"
        ></ejs-textbox>
      </div>
    </div>
  `
})
export class KeyboardNavComponent {}
```

### Focus Management

```typescript
@Component({
  selector: 'app-focus-management',
  standalone: true,
  imports: [TextBoxModule],
  template: `
    <div style="margin: 50px;">
      <ejs-textbox 
        #textbox
        placeholder="Click or Tab to focus"
        [cssClass]="isFocused ? 'focused' : ''"
        (focus)="onFocus()"
        (blur)="onBlur()"
      ></ejs-textbox>
    </div>
  `,
  styles: [`
    :host ::ng-deep .e-float-input.focused {
      outline: 2px solid #2563eb;
      outline-offset: 2px;
    }
  `]
})
export class FocusManagementComponent {
  isFocused = false;

  onFocus() {
    this.isFocused = true;
    console.log('Field focused');
  }

  onBlur() {
    this.isFocused = false;
    console.log('Field blurred');
  }
}
```

---

## ARIA Attributes

Use ARIA attributes to provide additional context and semantic meaning to assistive technologies.

### Common ARIA Attributes

Pass ARIA attributes through the [`htmlAttributes`](api.md#htmlattributes) property so they are correctly applied to the underlying input/textarea element:

```typescript
import { Component } from '@angular/core';
import { TextBoxModule } from '@syncfusion/ej2-angular-inputs';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-aria-attrs',
  standalone: true,
  imports: [TextBoxModule, FormsModule],
  template: `
    <div style="margin: 50px;">
      <!-- aria-label: Provides accessible name when label not visible -->
      <ejs-textbox 
        placeholder="Search"
        [htmlAttributes]="{ 'aria-label': 'Search products' }"
      ></ejs-textbox>

      <!-- aria-labelledby: Links to label element -->
      <h3 id="nameLabel">Your Name</h3>
      <ejs-textbox 
        placeholder="Enter name"
        [htmlAttributes]="{ 'aria-labelledby': 'nameLabel' }"
      ></ejs-textbox>

      <!-- aria-describedby: Links to description text -->
      <label for="password">Password</label>
      <ejs-textbox 
        id="password"
        placeholder="At least 8 characters"
        [htmlAttributes]="{ 'aria-describedby': 'passReqs' }"
      ></ejs-textbox>
      <p id="passReqs">Must contain uppercase, number, and special character</p>

      <!-- aria-required: Indicates required field -->
      <label for="email">Email *</label>
      <ejs-textbox 
        id="email"
        placeholder="your@email.com"
        [htmlAttributes]="{ 'aria-required': 'true' }"
      ></ejs-textbox>

      <!-- aria-invalid: Indicates validation state -->
      <label for="phone">Phone</label>
      <ejs-textbox 
        id="phone"
        placeholder="123-456-7890"
        [htmlAttributes]="{ 'aria-invalid': 'false' }"
      ></ejs-textbox>

      <!-- aria-disabled: Indicates disabled state -->
      <label for="readonly">Account Status</label>
      <ejs-textbox 
        id="readonly"
        value="Active"
        [readonly]="true"
        [htmlAttributes]="{ 'aria-disabled': 'true' }"
      ></ejs-textbox>
    </div>
  `
})
export class AriaAttributesComponent {}
```

### Dynamic ARIA Attributes

Use a computed `htmlAttributes` object to dynamically update ARIA attributes:

```typescript
@Component({
  selector: 'app-dynamic-aria',
  standalone: true,
  imports: [TextBoxModule, FormsModule],
  template: `
    <div style="margin: 50px;">
      <label for="username">Username</label>
      <ejs-textbox 
        id="username"
        [(ngModel)]="username"
        placeholder="Username"
        [htmlAttributes]="usernameHtmlAttrs"
        (input)="updateAriaAttrs()"
      ></ejs-textbox>
      <p 
        *ngIf="!isValidUsername() && username" 
        id="usernameError" 
        style="color: #dc2626;"
      >
        Username must be 3-20 characters
      </p>
    </div>
  `
})
export class DynamicAriaComponent {
  username = '';
  usernameHtmlAttrs: { [key: string]: string } = {};

  isValidUsername(): boolean {
    return this.username.length >= 3 && this.username.length <= 20;
  }

  updateAriaAttrs(): void {
    const invalid = !this.isValidUsername();
    this.usernameHtmlAttrs = {
      'aria-invalid': String(invalid),
      ...(invalid && this.username ? { 'aria-describedby': 'usernameError' } : {})
    };
  }
}
```

---

## Screen Reader Compatibility

Screen readers announce TextBox content and state to users with visual impairments.

### Screen Reader Friendly Form

```typescript
@Component({
  selector: 'app-screen-reader-form',
  standalone: true,
  imports: [TextBoxModule, FormsModule, CommonModule],
  template: `
    <div style="margin: 50px;">
      <h1>Registration Form</h1>
      <form (ngSubmit)="submitForm()">
        <!-- Field with clear label -->
        <div style="margin: 20px 0;">
          <label for="firstName">
            First Name
            <span style="color: #dc2626; margin-left: 4px;">*</span>
            <span class="sr-only">(required)</span>
          </label>
          <ejs-textbox 
            id="firstName"
            [(ngModel)]="form.firstName"
            name="firstName"
            placeholder="John"
            [htmlAttributes]="{ 'aria-required': 'true', 'aria-describedby': 'firstNameDesc' }"
          ></ejs-textbox>
          <p id="firstNameDesc" class="sr-only">
            Enter your first name
          </p>
        </div>

        <!-- Field with error handling -->
        <div style="margin: 20px 0;">
          <label for="email">
            Email Address
            <span style="color: #dc2626; margin-left: 4px;">*</span>
          </label>
          <ejs-textbox 
            id="email"
            [(ngModel)]="form.email"
            name="email"
            placeholder="john@example.com"
            [htmlAttributes]="emailHtmlAttrs"
            (input)="validateEmail()"
          ></ejs-textbox>
          <div id="emailErrors" class="sr-only">
            <p *ngFor="let error of emailErrors">{{ error }}</p>
          </div>
        </div>

        <button type="submit" aria-label="Submit registration form">
          Submit
        </button>
      </form>
    </div>
  `,
  styles: [`
    .sr-only {
      position: absolute;
      width: 1px;
      height: 1px;
      padding: 0;
      margin: -1px;
      overflow: hidden;
      clip: rect(0, 0, 0, 0);
      white-space: nowrap;
      border: 0;
    }
  `]
})
export class ScreenReaderFormComponent {
  form = { firstName: '', email: '' };
  emailErrors: string[] = [];
  emailHtmlAttrs: { [key: string]: string } = {
    type: 'email',
    'aria-invalid': 'false',
    'aria-describedby': 'emailErrors'
  };

  submitForm() {
    this.validateEmail();
  }

  validateEmail() {
    this.emailErrors = [];
    if (!this.form.email) {
      this.emailErrors.push('Email is required');
    } else if (!this.form.email.includes('@')) {
      this.emailErrors.push('Email must contain @ symbol');
    }
    this.emailHtmlAttrs = {
      ...this.emailHtmlAttrs,
      'aria-invalid': String(this.emailErrors.length > 0)
    };
  }
}
```

---

## Migration from CSS TextBox

If migrating from the old CSS-based TextBox to the Angular component, follow this guide.

### Old CSS-Based TextBox

```html
<!-- Old approach (CSS TextBox) -->
<div class="e-input-group">
  <input class="e-input" type="text" placeholder="Enter name">
  <span class="e-input-group-icon e-icon-search"></span>
</div>
```

### New Angular Component

```typescript
// New approach (Angular TextBox Component)
import { TextBoxModule } from '@syncfusion/ej2-angular-inputs';

@Component({
  imports: [TextBoxModule],
  template: `
    <ejs-textbox 
      placeholder="Enter name"
      [appendTemplate]="'searchIcon'"
    ></ejs-textbox>
    <ng-template #searchIcon>
      <span class="e-icon-search"></span>
    </ng-template>
  `
})
```

### Migration Mapping

| Old (CSS) | New (Angular) | Notes |
|-----------|---------------|-------|
| `.e-input` | `<ejs-textbox>` | Component replaces static HTML |
| `.e-input-group` | Auto-generated | Wrapper created automatically |
| HTML attributes | `[htmlAttributes]` | Configure via property |
| Manual events | `(input)`, `(change)` | Angular event binding |
| CSS classes | `[cssClass]` | Pass validation classes |
| Icons (HTML) | Templates | Use `[prependTemplate]` / `[appendTemplate]` |
| Labels (HTML) | `[floatLabelType]` | Built-in floating label support |

### Step-by-Step Migration Example

```typescript
// BEFORE: CSS TextBox approach
/*
<div class="e-input-group">
  <input 
    id="username" 
    class="e-input" 
    type="text" 
    placeholder="Username"
  >
  <span class="e-input-group-icon">👤</span>
</div>
*/

// AFTER: Angular Component approach
@Component({
  selector: 'app-migrated-textbox',
  standalone: true,
  imports: [TextBoxModule, FormsModule],
  template: `
    <ejs-textbox 
      id="username"
      [(ngModel)]="username"
      placeholder="Username"
      [prependTemplate]="'userIcon'"
      [floatLabelType]="'Auto'"
    ></ejs-textbox>
    <ng-template #userIcon>
      <span>👤</span>
    </ng-template>
  `
})
export class MigratedTextboxComponent {
  username = '';
}
```

### Benefits of Migration

1. **Better API**: Cleaner, more intuitive component interface
2. **Two-Way Binding**: Built-in `[(ngModel)]` support
3. **Events**: Proper Angular event handling with RxJS support
4. **Validation**: Integrated validation state management
5. **Accessibility**: WCAG 2.2 compliant out of the box
6. **Type Safety**: Full TypeScript support
7. **Performance**: Optimized rendering and change detection

---

## RTL and Mobile Accessibility

### Right-to-Left (RTL) Support

The TextBox component automatically adapts to RTL languages (Arabic, Hebrew, etc.):

```typescript
@Component({
  selector: 'app-rtl-support',
  standalone: true,
  imports: [TextBoxModule],
  template: `
    <!-- RTL enabled -->
    <div dir="rtl" style="margin: 50px;">
      <h2>مرحبا</h2>
      <ejs-textbox 
        placeholder="أدخل اسمك"
        [floatLabelType]="'Auto'"
      ></ejs-textbox>
    </div>

    <!-- LTR for comparison -->
    <div dir="ltr" style="margin: 50px;">
      <h2>Hello</h2>
      <ejs-textbox 
        placeholder="Enter your name"
        [floatLabelType]="'Auto'"
      ></ejs-textbox>
    </div>
  `
})
export class RtlSupportComponent {}
```

### Mobile Accessibility

```typescript
@Component({
  selector: 'app-mobile-accessible',
  standalone: true,
  imports: [TextBoxModule],
  template: `
    <div style="margin: 20px; max-width: 100%;">
      <!-- Larger touch target for mobile -->
      <ejs-textbox 
        placeholder="Search"
        [cssClass]="'mobile-friendly'"
      ></ejs-textbox>
    </div>
  `,
  styles: [`
    :host ::ng-deep .e-float-input.mobile-friendly {
      /* Minimum 44x44px touch target */
      min-height: 44px;
    }

    :host ::ng-deep .e-float-input.mobile-friendly input {
      font-size: 16px; /* Prevents auto-zoom on focus */
      padding: 12px;
    }

    /* Better spacing on mobile */
    @media (max-width: 480px) {
      :host ::ng-deep .e-float-input {
        width: 100%;
        margin-bottom: 16px;
      }
    }
  `]
})
export class MobileAccessibleComponent {}
```

### High Contrast Mode Support

```typescript
@Component({
  selector: 'app-high-contrast',
  standalone: true,
  imports: [TextBoxModule],
  styles: [`
    :host ::ng-deep {
      /* High contrast mode adjustments */
      @media (prefers-contrast: more) {
        .e-float-input {
          border-width: 2px;
          border-color: #000;
        }

        .e-float-input input {
          color: #000;
          background-color: #fff;
        }

        .e-float-input label {
          font-weight: bold;
          color: #000;
        }
      }

      /* Reduced motion support */
      @media (prefers-reduced-motion: reduce) {
        .e-float-input label {
          transition: none;
        }
      }
    }
  `],
  template: `
    <ejs-textbox 
      placeholder="High contrast compatible"
      [floatLabelType]="'Auto'"
    ></ejs-textbox>
  `
})
export class HighContrastComponent {}
```

---

## Next Steps

- Review [getting-started.md](getting-started.md) for basic setup
- Explore [validation-states.md](validation-states.md) for validation patterns
- Check [styling-appearance.md](styling-appearance.md) for visual customization

