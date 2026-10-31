# Styling and Customization

## Table of Contents
- [CSS Class Customization](#css-class-customization)
- [Theme Selection](#theme-selection)
- [Dark Mode Implementation](#dark-mode-implementation)
- [Width and Z-Index Configuration](#width-and-z-index-configuration)
- [HTML Attribute Injection](#html-attribute-injection)
- [Placeholder and Enabled State Styling](#placeholder-and-enabled-state-styling)
- [Disabled State Styling](#disabled-state-styling)
- [Custom CSS Examples](#custom-css-examples)

## CSS Class Customization

Add custom CSS classes to the TimePicker component using the `cssClass` property:

```typescript
// app.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  selectedTime: Date = new Date();
  
  // Single custom class
  customClass: string = 'custom-timepicker';
  
  // Multiple classes
  multipleClasses: string = 'custom-timepicker primary-input';
}
```

```html
<!-- app.component.html -->
<ejs-timepicker
  [(ngModel)]="selectedTime"
  [cssClass]="customClass">
</ejs-timepicker>
```

```css
/* app.component.css */
:host ::ng-deep .custom-timepicker {
  font-size: 14px;
  border-color: #007bff;
}

:host ::ng-deep .custom-timepicker .e-input-group {
  border-radius: 4px;
}

:host ::ng-deep .custom-timepicker .e-input {
  padding: 10px 12px;
}

:host ::ng-deep .primary-input .e-input {
  border: 2px solid #007bff;
}
```

## Theme Selection

Choose from available Syncfusion themes:

```typescript
// app.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  selectedTime: Date = new Date();
  currentTheme: string = 'material3';
}
```

### Available Themes

```css
/* In styles.css or component - choose ONE theme */

/* Material Design 3 (Default) */
@import '../node_modules/@syncfusion/ej2-base/styles/material3.css';
@import '../node_modules/@syncfusion/ej2-calendars/styles/material3.css';

/* Bootstrap 5 */
/* @import '../node_modules/@syncfusion/ej2-base/styles/bootstrap5.css';
@import '../node_modules/@syncfusion/ej2-calendars/styles/bootstrap5.css'; */

/* Microsoft Fluent */
/* @import '../node_modules/@syncfusion/ej2-base/styles/fluent.css';
@import '../node_modules/@syncfusion/ej2-calendars/styles/fluent.css'; */

/* Tailwind CSS */
/* @import '../node_modules/@syncfusion/ej2-base/styles/tailwind.css';
@import '../node_modules/@syncfusion/ej2-calendars/styles/tailwind.css'; */

/* Office Fabric */
/* @import '../node_modules/@syncfusion/ej2-base/styles/fabric.css';
@import '../node_modules/@syncfusion/ej2-calendars/styles/fabric.css'; */
```

### Dynamic Theme Switching

```typescript
export class AppComponent {
  selectedTime: Date = new Date();
  currentTheme: string = 'material3';
  
  changeTheme(theme: string): void {
    this.currentTheme = theme;
    
    // Remove old theme
    const oldLink = document.querySelector(`link[data-theme]`);
    if (oldLink) {
      oldLink.remove();
    }
    
    // Load new theme
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = `../node_modules/@syncfusion/ej2-calendars/styles/${theme}.css`;
    link.setAttribute('data-theme', theme);
    document.head.appendChild(link);
  }
}
```

```html
<div>
  <ejs-timepicker [(ngModel)]="selectedTime"></ejs-timepicker>
  
  <div style="margin-top: 15px;">
    <button (click)="changeTheme('material3')">Material 3</button>
    <button (click)="changeTheme('bootstrap5')">Bootstrap 5</button>
    <button (click)="changeTheme('fluent')">Fluent</button>
    <button (click)="changeTheme('tailwind')">Tailwind</button>
    <p>Current Theme: {{ currentTheme }}</p>
  </div>
</div>
```

## Dark Mode Implementation

Enable dark mode by adding a dark theme CSS class:

```typescript
// app.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  selectedTime: Date = new Date();
  isDarkMode: boolean = false;
  
  toggleDarkMode(): void {
    this.isDarkMode = !this.isDarkMode;
    
    // Apply to document
    const element = document.documentElement;
    if (this.isDarkMode) {
      element.classList.add('e-dark');
    } else {
      element.classList.remove('e-dark');
    }
  }
}
```

```html
<!-- app.component.html -->
<div [class.dark-theme]="isDarkMode">
  <ejs-timepicker
    [(ngModel)]="selectedTime"
    placeholder="Select time">
  </ejs-timepicker>
  
  <button (click)="toggleDarkMode()" style="margin-top: 15px;">
    {{ isDarkMode ? 'Light Mode' : 'Dark Mode' }}
  </button>
</div>
```

```css
/* app.component.css */
.dark-theme {
  background-color: #1e1e1e;
  color: #ffffff;
}

:host ::ng-deep .e-dark .e-timepicker {
  background-color: #252526;
  color: #ffffff;
}

:host ::ng-deep .e-dark .e-input {
  background-color: #3c3c3c;
  border-color: #555555;
  color: #ffffff;
}

:host ::ng-deep .e-dark .e-popup {
  background-color: #252526;
  border-color: #555555;
}

:host ::ng-deep .e-dark .e-list-item {
  color: #ffffff;
}

:host ::ng-deep .e-dark .e-list-item:hover {
  background-color: #404040;
}
```

## Width and Z-Index Configuration

Control component width and popup stacking order:

```typescript
// app.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  selectedTime: Date = new Date();
  
  // Set width as string or number
  width: string = '100%';          // Full width
  // width: string = '300px';       // Fixed width
  // width: number = 250;           // Number converts to pixels
  
  // Set z-index for popup stacking
  zIndex: number = 1000;           // Default
  // zIndex: number = 9999;         // High z-index for modal dialogs
}
```

```html
<!-- app.component.html -->
<div style="padding: 20px;">
  <div style="max-width: 500px;">
    <label>Full Width TimePicker:</label>
    <ejs-timepicker
      [(ngModel)]="selectedTime"
      [width]="width"
      [zIndex]="zIndex"
      placeholder="Select time">
    </ejs-timepicker>
  </div>
  
  <div style="margin-top: 20px; max-width: 250px;">
    <label>Fixed Width (250px):</label>
    <ejs-timepicker
      [(ngModel)]="selectedTime"
      width="250px"
      placeholder="Select time">
    </ejs-timepicker>
  </div>
</div>
```

### Responsive Width

```typescript
export class AppComponent {
  selectedTime: Date = new Date();
  
  getResponsiveWidth(): string {
    const width = window.innerWidth;
    if (width < 600) {
      return '100%';    // Mobile
    } else if (width < 1024) {
      return '80%';     // Tablet
    } else {
      return '400px';   // Desktop
    }
  }
}
```

```html
<ejs-timepicker
  [(ngModel)]="selectedTime"
  [width]="getResponsiveWidth()">
</ejs-timepicker>
```

## HTML Attribute Injection

Inject custom HTML attributes using the `htmlAttributes` property:

```typescript
// app.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent {
  selectedTime: Date = new Date();
  
  // Custom HTML attributes
  htmlAttributes = {
    'data-test-id': 'appointment-timepicker',
    'aria-label': 'Select appointment time',
    'data-analytics': 'timepicker-1',
    'autocomplete': 'off'
  };
}
```

```html
<!-- app.component.html -->
<ejs-timepicker
  [(ngModel)]="selectedTime"
  [htmlAttributes]="htmlAttributes"
  placeholder="Select time">
</ejs-timepicker>
```

### Accessibility Attributes

```typescript
export class AppComponent {
  selectedTime: Date = new Date();
  
  accessibilityAttributes = {
    'aria-label': 'Select appointment time',
    'aria-required': 'true',
    'aria-describedby': 'time-help',
    'role': 'combobox'
  };
}
```

## Placeholder and Enabled State Styling

Style the placeholder text and enabled/disabled states:

```typescript
// app.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  selectedTime: Date = new Date();
  isEnabled: boolean = true;
  
  toggleEnabled(): void {
    this.isEnabled = !this.isEnabled;
  }
}
```

```html
<!-- app.component.html -->
<div style="padding: 20px;">
  <ejs-timepicker
    [(ngModel)]="selectedTime"
    [enabled]="isEnabled"
    placeholder="Select appointment time">
  </ejs-timepicker>
  
  <button (click)="toggleEnabled()" style="margin-top: 10px;">
    {{ isEnabled ? 'Disable' : 'Enable' }}
  </button>
</div>
```

```css
/* app.component.css */

/* Placeholder styling */
:host ::ng-deep .e-timepicker .e-input::placeholder {
  color: #999999;
  opacity: 1;
  font-style: italic;
}

/* Enabled state */
:host ::ng-deep .e-timepicker .e-input:enabled {
  background-color: #ffffff;
  border-color: #cccccc;
  color: #000000;
  cursor: pointer;
}

:host ::ng-deep .e-timepicker .e-input:enabled:focus {
  border-color: #007bff;
  box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.25);
}

/* Disabled state */
:host ::ng-deep .e-timepicker .e-input:disabled {
  background-color: #f5f5f5;
  border-color: #e3e3e3;
  color: #999999;
  cursor: not-allowed;
  opacity: 0.6;
}

:host ::ng-deep .e-timepicker.e-disabled .e-input-group-icon {
  color: #999999;
  cursor: not-allowed;
}
```

## Disabled State Styling

Comprehensive styling for disabled states:

```css
/* app.component.css */

/* Disabled input */
:host ::ng-deep .e-timepicker.e-disabled {
  opacity: 0.6;
}

:host ::ng-deep .e-timepicker.e-disabled .e-input {
  background-color: #f5f5f5;
  border-color: #e3e3e3;
}

:host ::ng-deep .e-timepicker.e-disabled .e-input-group-icon {
  opacity: 0.5;
  color: #999999;
}

/* Disabled popup items */
:host ::ng-deep .e-timepicker .e-list-item.e-disable-item {
  background-color: #f5f5f5;
  color: #999999;
  cursor: not-allowed;
  opacity: 0.5;
}

/* Readonly styling */
:host ::ng-deep .e-timepicker.e-read-only .e-input {
  background-color: #fafafa;
  cursor: default;
}
```

## Custom CSS Examples

### Example 1: Material Design Styling

```css
/* Material Design custom styling */
:host ::ng-deep .material-custom .e-timepicker {
  --primary-color: #6200ee;
  --accent-color: #03dac6;
  --surface-color: #121212;
}

:host ::ng-deep .material-custom .e-input {
  border-bottom: 2px solid #6200ee;
  font-size: 14px;
  font-weight: 500;
  letter-spacing: 0.5px;
}

:host ::ng-deep .material-custom .e-input:focus {
  border-bottom-color: #03dac6;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

:host ::ng-deep .material-custom .e-input-group-icon {
  color: #6200ee;
  font-size: 20px;
}
```

### Example 2: Bootstrap-inspired Styling

```css
/* Bootstrap-inspired styling */
:host ::ng-deep .bootstrap-custom .e-input {
  padding: 6px 12px;
  border: 1px solid #ced4da;
  border-radius: 4px;
  font-size: 14px;
  line-height: 1.5;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
}

:host ::ng-deep .bootstrap-custom .e-input:focus {
  border-color: #80bdff;
  box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
}

:host ::ng-deep .bootstrap-custom .e-input:disabled {
  background-color: #e9ecef;
  color: #6c757d;
}
```

### Example 3: Modern Gradient Styling

```css
/* Modern gradient styling */
:host ::ng-deep .gradient-custom .e-input {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: #ffffff;
  border: none;
  border-radius: 8px;
  padding: 12px 16px;
  font-weight: 500;
}

:host ::ng-deep .gradient-custom .e-input::placeholder {
  color: rgba(255, 255, 255, 0.7);
}

:host ::ng-deep .gradient-custom .e-input-group-icon {
  color: #ffffff;
}

:host ::ng-deep .gradient-custom .e-popup {
  border-radius: 8px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
}
```

### Example 4: Minimalist Clean Design

```css
/* Minimalist clean design */
:host ::ng-deep .clean-custom {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
}

:host ::ng-deep .clean-custom .e-input {
  border: none;
  border-bottom: 2px solid #e0e0e0;
  padding: 8px 0;
  font-size: 15px;
  background: transparent;
  transition: border-color 0.3s ease;
}

:host ::ng-deep .clean-custom .e-input:focus {
  border-bottom-color: #333333;
  outline: none;
}

:host ::ng-deep .clean-custom .e-input-group-icon {
  color: #666666;
  font-size: 18px;
}
```

### Example 5: Compact Mobile Styling

```css
/* Compact mobile styling */
@media (max-width: 768px) {
  :host ::ng-deep .mobile-compact .e-input {
    padding: 14px 12px;
    font-size: 16px;  /* Prevents zoom on iOS */
    border-radius: 6px;
  }
  
  :host ::ng-deep .mobile-compact .e-input-group-icon {
    padding: 12px;
    font-size: 22px;
  }
  
  :host ::ng-deep .mobile-compact .e-popup {
    border-radius: 12px 12px 0 0;  /* Top-only radius */
  }
}
```

## Combining Multiple Customizations

```typescript
export class AppComponent {
  selectedTime: Date = new Date();
  isEnabled: boolean = true;
  isDarkMode: boolean = false;
  
  customConfig = {
    cssClass: 'custom-timepicker material-design',
    width: '100%',
    zIndex: 1000
  };
  
  htmlAttributes = {
    'data-test-id': 'appointment-time',
    'aria-label': 'Select appointment time'
  };
}
```

```html
<ejs-timepicker
  [(ngModel)]="selectedTime"
  [cssClass]="customConfig.cssClass"
  [width]="customConfig.width"
  [zIndex]="customConfig.zIndex"
  [enabled]="isEnabled"
  [htmlAttributes]="htmlAttributes"
  [class.e-dark]="isDarkMode"
  placeholder="Select time">
</ejs-timepicker>
```
