# Styling and Customization

## Table of Contents
- [CSS Customization Overview](#css-customization-overview)
- [Wrapper Element Styling](#wrapper-element-styling)
- [Icon Customization](#icon-customization)
- [Input Field Styling](#input-field-styling)
- [Full-Screen Mode on Mobile](#full-screen-mode-on-mobile)
- [Placeholder and ReadOnly States](#placeholder-and-readonly-states)
- [Dark Mode and Theme Integration](#dark-mode-and-theme-integration)
- [Practical Styling Examples](#practical-styling-examples)
- [Troubleshooting](#troubleshooting)

## CSS Customization Overview

DatePicker styling uses CSS classes applied to wrapper, input, and calendar elements. Customize by targeting these classes with CSS rules.

**Key classes:**
- `.e-input-group` - Wrapper containing input and icon
- `.e-input` - The text input field
- `.e-input-group-icon` - Calendar button icon
- `.e-popup` - Calendar popup container
- `.e-calendar` - Calendar grid

## Wrapper Element Styling

Customize the container around the input field:

### Change Height and Font Size

```typescript
import { Component } from '@angular/core';
import { DatePickerModule } from '@syncfusion/ej2-angular-calendars';
import '@syncfusion/ej2-angular-calendars/styles/material.css';

@Component({
  selector: 'app-datepicker',
  standalone: true,
  imports: [DatePickerModule],
  styles: [`
    :host ::ng-deep .e-input-group input.e-input,
    :host ::ng-deep .e-input-group.e-control-wrapper input.e-input {
      height: 40px;
      font-size: 18px;
      padding: 8px 12px;
    }
  `],
  template: `
    <ejs-datepicker
      placeholder="Select date">
    </ejs-datepicker>
  `
})
export class DatePickerComponent {}
```

**Result:** Input field is 40px tall with larger 18px font

### Custom Border and Shadow

```typescript
@Component({
  styles: [`
    :host ::ng-deep .e-input-group {
      border: 2px solid #4CAF50;
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }
    
    :host ::ng-deep .e-input-group input.e-input {
      border: none;
      outline: none;
    }
  `],
  template: `<ejs-datepicker></ejs-datepicker>`
})
export class CustomBorderComponent {}
```

**Result:** Green border, rounded corners, subtle shadow

### Padding and Spacing

```typescript
@Component({
  styles: [`
    :host ::ng-deep .e-input-group {
      padding: 12px;
      margin: 8px 0;
    }
  `],
  template: `<ejs-datepicker></ejs-datepicker>`
})
export class PaddingComponent {}
```

## Icon Customization

Customize the calendar button icon:

### Change Icon Color

```typescript
@Component({
  styles: [`
    :host ::ng-deep .e-input-group .e-input-group-icon:last-child {
      color: #2196F3;
      font-size: 16px;
    }
  `],
  template: `<ejs-datepicker></ejs-datepicker>`
})
export class IconColorComponent {}
```

**Result:** Calendar icon is blue and 16px

### Change Icon Background

```typescript
@Component({
  styles: [`
    :host ::ng-deep .e-input-group .e-input-group-icon:last-child {
      background-color: #e0e0e0;
      padding: 8px;
      border-radius: 4px;
    }
  `],
  template: `<ejs-datepicker></ejs-datepicker>`
})
export class IconBackgroundComponent {}
```

**Result:** Calendar icon has light gray background

### Custom Icon (Using Font Awesome or Other Icon Library)

```typescript
import { Component } from '@angular/core';
import { DatePickerModule } from '@syncfusion/ej2-angular-calendars';

@Component({
  selector: 'app-custom-icon',
  standalone: true,
  imports: [DatePickerModule],
  styles: [`
    :host ::ng-deep .e-input-group .e-input-group-icon::before {
      content: '📅';
      font-size: 20px;
    }
  `],
  template: `
    <ejs-datepicker></ejs-datepicker>
  `
})
export class CustomIconComponent {}
```

**Result:** Calendar icon replaced with emoji 📅

## Input Field Styling

### Focused State

```typescript
@Component({
  styles: [`
    :host ::ng-deep .e-input-group.e-input-focus input.e-input {
      border-color: #2196F3;
      box-shadow: 0 0 8px rgba(33, 150, 243, 0.2);
      background-color: #f0f7ff;
    }
  `],
  template: `<ejs-datepicker></ejs-datepicker>`
})
export class FocusStateComponent {}
```

**Result:** Blue border and light blue background when input focused

### Error/Invalid State

```typescript
@Component({
  styles: [`
    :host ::ng-deep .e-input-group.e-error input.e-input {
      border-color: #f44336;
      background-color: #ffebee;
    }
    
    :host ::ng-deep .e-input-group.e-error .e-input-group-icon {
      color: #f44336;
    }
  `],
  template: `<ejs-datepicker></ejs-datepicker>`
})
export class ErrorStateComponent {}
```

**Result:** Red border and light red background for out-of-range dates

### Disabled State

```typescript
@Component({
  styles: [`
    :host ::ng-deep .e-input-group.e-disabled input.e-input {
      background-color: #f5f5f5;
      color: #999;
      cursor: not-allowed;
    }
  `],
  template: `
    <ejs-datepicker [enabled]="false"></ejs-datepicker>
  `
})
export class DisabledStateComponent {}
```

## Full-Screen Mode on Mobile

Enable full-screen calendar view on mobile/tablet devices:

### Basic Full-Screen Setup

```typescript
@Component({
  selector: 'app-fullscreen',
  standalone: true,
  imports: [DatePickerModule],
  template: `
    <ejs-datepicker
      [fullScreenMode]="true"
      placeholder="Select date">
    </ejs-datepicker>
  `
})
export class FullScreenComponent {}
```

**Result:** On mobile, calendar takes full screen instead of popup

### Conditional Full-Screen (Mobile Only)

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-responsive-fullscreen',
  standalone: true,
  imports: [DatePickerModule],
  template: `
    <ejs-datepicker
      [fullScreenMode]="isMobile()"
      placeholder="Select date">
    </ejs-datepicker>
  `
})
export class ResponsiveFullScreenComponent {
  isMobile(): boolean {
    return window.innerWidth < 768;
  }
}
```

**Result:** Full-screen mode only on devices < 768px wide

## Placeholder and ReadOnly States

### Custom Placeholder Text

```typescript
@Component({
  template: `
    <ejs-datepicker
      placeholder="Click to select a date"
      placeholderStyle="color: #999; font-style: italic;">
    </ejs-datepicker>
  `
})
export class PlaceholderComponent {}
```

### ReadOnly DatePicker

Display date without allowing edit:

```typescript
@Component({
  selector: 'app-readonly',
  standalone: true,
  imports: [DatePickerModule, FormsModule],
  template: `
    <ejs-datepicker
      [(ngModel)]="selectedDate"
      [readonly]="true"
      placeholder="Date display only">
    </ejs-datepicker>
  `
})
export class ReadOnlyComponent {
  selectedDate = new Date(2024, 2, 15); // March 15, 2024
}
```

**Result:** Shows date but input can't be edited. Calendar icon opens calendar (can select different date via calendar, but not by typing).

### Completely Disabled DatePicker

```typescript
@Component({
  template: `
    <ejs-datepicker
      [enabled]="false"
      placeholder="Disabled DatePicker">
    </ejs-datepicker>
  `
})
export class DisabledComponent {}
```

**Result:** Input grayed out, icon and popup inaccessible

## Dark Mode and Theme Integration

### Apply Material Dark Theme

```typescript
import { Component } from '@angular/core';
import { DatePickerModule } from '@syncfusion/ej2-angular-calendars';
import '@syncfusion/ej2-angular-calendars/styles/material-dark.css';

@Component({
  selector: 'app-dark-mode',
  standalone: true,
  imports: [DatePickerModule],
  template: `
    <ejs-datepicker placeholder="Dark theme"></ejs-datepicker>
  `
})
export class DarkModeComponent {}
```

**Result:** DatePicker uses dark material theme (dark backgrounds, light text)

### Bootstrap Dark Theme

```typescript
import '@syncfusion/ej2-angular-calendars/styles/bootstrap-dark.css';
```

### Fluent Light/Dark Themes

```typescript
import '@syncfusion/ej2-angular-calendars/styles/fluent.css';        // Light
import '@syncfusion/ej2-angular-calendars/styles/fluent-dark.css';   // Dark
```

### Tailwind Theme

```typescript
import '@syncfusion/ej2-angular-calendars/styles/tailwind.css';
```

### Dynamic Theme Switching

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-theme-switcher',
  standalone: true,
  imports: [DatePickerModule],
  template: `
    <button (click)="switchTheme()">Toggle Dark Mode</button>
    <ejs-datepicker placeholder="Select date"></ejs-datepicker>
  `
})
export class ThemeSwitcherComponent {
  isDarkMode = false;

  switchTheme() {
    this.isDarkMode = !this.isDarkMode;
    const theme = this.isDarkMode ? 'dark' : 'light';
    document.body.setAttribute('data-theme', theme);
  }
}
```

Add CSS variables to support theme switching:
```css
body[data-theme='light'] {
  color-scheme: light;
}

body[data-theme='dark'] {
  color-scheme: dark;
}
```

## Practical Styling Examples

### Example 1: Modern Rounded DatePicker

```typescript
@Component({
  selector: 'app-modern-style',
  standalone: true,
  imports: [DatePickerModule],
  styles: [`
    :host ::ng-deep .e-input-group {
      border: none;
      border-bottom: 2px solid #e0e0e0;
      border-radius: 8px;
      background: #f9f9f9;
      transition: all 0.3s;
    }
    
    :host ::ng-deep .e-input-group.e-input-focus {
      border-bottom-color: #2196F3;
      background: #fff;
      box-shadow: 0 2px 8px rgba(33, 150, 243, 0.1);
    }
    
    :host ::ng-deep .e-input-group input.e-input {
      background: transparent;
      font-size: 16px;
      padding: 12px;
    }
  `],
  template: `<ejs-datepicker placeholder="Select date"></ejs-datepicker>`
})
export class ModernStyleComponent {}
```

### Example 2: Compact DatePicker

```typescript
@Component({
  styles: [`
    :host ::ng-deep .e-input-group {
      height: 32px;
      border-radius: 4px;
    }
    
    :host ::ng-deep .e-input-group input.e-input {
      font-size: 13px;
      padding: 4px 8px;
      height: 100%;
    }
    
    :host ::ng-deep .e-input-group-icon {
      font-size: 14px;
    }
  `],
  template: `<ejs-datepicker placeholder="Date"></ejs-datepicker>`
})
export class CompactComponent {}
```

### Example 3: Material Design DatePicker

```typescript
@Component({
  styles: [`
    :host ::ng-deep .e-input-group {
      border: none;
      border-bottom: 1px solid rgba(0, 0, 0, 0.12);
      background: transparent;
      padding: 0;
    }
    
    :host ::ng-deep .e-input-group input.e-input {
      padding: 8px 0;
      font-size: 16px;
      letter-spacing: 0.5px;
    }
    
    :host ::ng-deep .e-input-group.e-input-focus {
      border-bottom: 2px solid #2196F3;
    }
  `],
  template: `<ejs-datepicker placeholder="Select date"></ejs-datepicker>`
})
export class MaterialDesignComponent {}
```

## Troubleshooting

### Issue: CSS changes not taking effect

**Problem:** Custom CSS not applying to DatePicker

**Solution:** Use `::ng-deep` selector for deep component styling:

```typescript
styles: [`
  :host ::ng-deep .e-input-group {
    border: 2px solid blue;
  }
`]
```

### Issue: Theme CSS not loading

**Problem:** DatePicker appears unstyled (no borders, colors)

**Solution:** Import theme CSS in main.ts:

```typescript
// main.ts
import '@syncfusion/ej2-angular-calendars/styles/material.css';
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent);
```

### Issue: Icon overlapping text

**Problem:** Calendar icon sits on top of typed text

**Solution:** Adjust padding or icon positioning:

```typescript
styles: [`
  :host ::ng-deep .e-input-group input.e-input {
    padding-right: 40px;
  }
  
  :host ::ng-deep .e-input-group-icon {
    right: 10px;
  }
`]
```

### Issue: Full-screen mode not working on mobile

**Problem:** Calendar still pops up instead of full-screen

**Solution:** Verify device detection and fullScreenMode property:

```typescript
[fullScreenMode]="isMobileDevice()"

isMobileDevice(): boolean {
  const userAgent = navigator.userAgent;
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
}
```

---

**Related References:**
- [Getting Started](getting-started.md)
- [Accessibility and Forms](accessibility-and-forms.md)
