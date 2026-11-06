# Styling & Customization

## Table of Contents
- [CSS Class Customization](#css-class-customization)
- [Theme Selection](#theme-selection)
- [Dark Mode](#dark-mode)
- [Component Sizing](#component-sizing)
- [CSS Variables & Custom Properties](#css-variables--custom-properties)
- [Calendar Mode Selection](#calendar-mode-selection)
- [Day Header Formats](#day-header-formats)
- [Advanced Customization](#advanced-customization)

## CSS Class Customization

### CSS Class Property

The `cssClass` property adds custom CSS classes to the component root:

```typescript
export class AppComponent {
  selectedDateTime: Date = new Date();
  customClass: string = 'my-custom-datetimepicker';
}
```

```html
<ejs-datetimepicker
  [(ngModel)]="selectedDateTime"
  [cssClass]="customClass">
</ejs-datetimepicker>
```

```css
/* app.component.css */
.my-custom-datetimepicker {
  width: 100%;
  max-width: 400px;
}

.my-custom-datetimepicker .e-input-group {
  border: 2px solid #2196f3;
  border-radius: 8px;
}

.my-custom-datetimepicker .e-input {
  font-size: 14px;
  padding: 12px;
}

.my-custom-datetimepicker .e-icons {
  color: #2196f3;
}
```

### Multiple CSS Classes

```typescript
export class AppComponent {
  selectedDateTime: Date = new Date();
  
  get customClass(): string {
    return 'custom-picker primary-border rounded-input';
  }
}
```

```css
/* Apply multiple classes for layered styling */
.custom-picker {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.primary-border {
  border-color: #1976d2;
}

.rounded-input {
  border-radius: 12px;
}

.custom-picker .e-calendar {
  border: 1px solid #e0e0e0;
}

.custom-picker .e-time-picker {
  background: #f5f5f5;
}
```

## Theme Selection

### Available Themes

Syncfusion provides multiple built-in themes:

```typescript
export class AppComponent {
  selectedDateTime: Date = new Date();
  
  themes = [
    'Material 3',
    'Material 3 Dark',
    'Bootstrap 5',
    'Bootstrap 5 Dark',
    'Fluent',
    'Fluent Dark',
    'Tailwind',
    'Tailwind Dark',
    'Fabric',
    'Fabric Dark'
  ];
  
  selectedTheme: string = 'Material 3';
}
```

### Switching Themes

```typescript
export class ThemedPickerComponent {
  selectedDateTime: Date = new Date();
  selectedTheme: string = 'material3';
  
  themes = [
    { value: 'material3', label: 'Material 3' },
    { value: 'bootstrap5', label: 'Bootstrap 5' },
    { value: 'fluent', label: 'Fluent' },
    { value: 'tailwind', label: 'Tailwind' },
    { value: 'fabric', label: 'Fabric' }
  ];
  
  onThemeChange(): void {
    // Remove old theme
    this.removeTheme();
    // Load new theme
    this.loadTheme(this.selectedTheme);
  }
  
  private removeTheme(): void {
    const links = document.querySelectorAll('link[data-theme]');
    links.forEach(link => link.remove());
  }
  
  private loadTheme(theme: string): void {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = `/assets/themes/${theme}.css`;
    link.setAttribute('data-theme', theme);
    document.head.appendChild(link);
  }
}
```

```html
<div style="margin-bottom: 20px;">
  <label>Select Theme:</label>
  <select [(ngModel)]="selectedTheme" (change)="onThemeChange()">
    <option *ngFor="let t of themes" [value]="t.value">
      {{ t.label }}
    </option>
  </select>
</div>

<ejs-datetimepicker
  [(ngModel)]="selectedDateTime"
  placeholder="Select date and time">
</ejs-datetimepicker>
```

### Theme CSS Import Example

```css
/* styles.css - Select one theme */

/* Material 3 (recommended) */
@import '../node_modules/@syncfusion/ej2-base/styles/material3.css';
@import '../node_modules/@syncfusion/ej2-calendars/styles/material3.css';
@import '../node_modules/@syncfusion/ej2-inputs/styles/material3.css';
@import '../node_modules/@syncfusion/ej2-popups/styles/material3.css';

/* Or Bootstrap 5 */
/* @import '../node_modules/@syncfusion/ej2-base/styles/bootstrap5.css';
@import '../node_modules/@syncfusion/ej2-calendars/styles/bootstrap5.css';
@import '../node_modules/@syncfusion/ej2-inputs/styles/bootstrap5.css';
@import '../node_modules/@syncfusion/ej2-popups/styles/bootstrap5.css'; */
```

## Dark Mode

### Global Dark Mode

```typescript
export class AppComponent {
  selectedDateTime: Date = new Date();
  isDarkMode: boolean = false;
  
  toggleDarkMode(): void {
    this.isDarkMode = !this.isDarkMode;
    const body = document.body;
    
    if (this.isDarkMode) {
      body.classList.add('e-dark');
    } else {
      body.classList.remove('e-dark');
    }
  }
}
```

```html
<button (click)="toggleDarkMode()">
  {{ isDarkMode ? '☀️ Light Mode' : '🌙 Dark Mode' }}
</button>

<ejs-datetimepicker
  [(ngModel)]="selectedDateTime">
</ejs-datetimepicker>
```

### Dark Theme CSS Import

```css
/* styles.css */
@import '../node_modules/@syncfusion/ej2-base/styles/material3-dark.css';
@import '../node_modules/@syncfusion/ej2-calendars/styles/material3-dark.css';
@import '../node_modules/@syncfusion/ej2-inputs/styles/material3-dark.css';
@import '../node_modules/@syncfusion/ej2-popups/styles/material3-dark.css';
```

### Conditional Dark Mode

```typescript
export class AppComponent {
  selectedDateTime: Date = new Date();
  
  ngOnInit(): void {
    // Detect system dark mode preference
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    
    if (prefersDark.matches) {
      document.body.classList.add('e-dark');
    }
    
    // Listen for changes
    prefersDark.addListener((e) => {
      if (e.matches) {
        document.body.classList.add('e-dark');
      } else {
        document.body.classList.remove('e-dark');
      }
    });
  }
}
```

## Component Sizing

### Width Property

Control the component width:

```typescript
export class AppComponent {
  selectedDateTime: Date = new Date();
  
  width1: string | number = '100%';      // Full width
  width2: string | number = 400;         // Pixel width
  width3: string | number = '50%';       // Percentage width
  width4: string | number = 'auto';      // Auto width
}
```

```html
<!-- Full width -->
<ejs-datetimepicker
  [(ngModel)]="selectedDateTime"
  [width]="width1"
  placeholder="Full width">
</ejs-datetimepicker>

<!-- Fixed 400px -->
<ejs-datetimepicker
  [(ngModel)]="selectedDateTime"
  [width]="width2"
  placeholder="400px fixed">
</ejs-datetimepicker>

<!-- 50% of container -->
<ejs-datetimepicker
  [(ngModel)]="selectedDateTime"
  [width]="width3"
  placeholder="50% width">
</ejs-datetimepicker>
```

### Responsive Width

```typescript
export class AppComponent {
  selectedDateTime: Date = new Date();
  screenSize: string = 'desktop';
  
  get pickerWidth(): string | number {
    switch(this.screenSize) {
      case 'mobile':
        return '100%';
      case 'tablet':
        return '90%';
      case 'desktop':
        return 400;
      default:
        return '100%';
    }
  }
  
  ngOnInit(): void {
    window.addEventListener('resize', () => {
      this.updateScreenSize();
    });
  }
  
  private updateScreenSize(): void {
    const width = window.innerWidth;
    if (width < 576) this.screenSize = 'mobile';
    else if (width < 992) this.screenSize = 'tablet';
    else this.screenSize = 'desktop';
  }
}
```

### Z-Index Management

```typescript
export class AppComponent {
  selectedDateTime: Date = new Date();
  
  // Control popup z-index for layering
  zIndex: number = 1000; // Default
}
```

```html
<ejs-datetimepicker
  [(ngModel)]="selectedDateTime"
  [zIndex]="zIndex"
  placeholder="Select date and time">
</ejs-datetimepicker>
```

## CSS Variables & Custom Properties

### Override Theme Colors

```css
/* app.component.css */
:host ::ng-deep .e-datetimepicker {
  --primary-color: #1976d2;
  --primary-hover: #135ba1;
  --primary-active: #0d47a1;
  --surface-color: #ffffff;
  --text-color: #212121;
  --border-color: #e0e0e0;
}

:host ::ng-deep .e-calendar {
  --day-cell-hover: #f5f5f5;
  --selected-day-bg: #1976d2;
  --selected-day-color: #ffffff;
  --today-border: #ff9800;
}
```

### Custom Styling Elements

```css
/* Customize input field */
:host ::ng-deep .e-datetimepicker .e-input-group {
  background: #f9f9f9;
  border: 2px solid #e0e0e0;
  border-radius: 8px;
  transition: all 0.3s ease;
}

:host ::ng-deep .e-datetimepicker .e-input-group:hover {
  border-color: #1976d2;
}

:host ::ng-deep .e-datetimepicker .e-input {
  padding: 12px 16px;
  font-size: 14px;
  color: #212121;
}

/* Customize popup */
:host ::ng-deep .e-datetimepicker .e-popup {
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

/* Customize calendar cells */
:host ::ng-deep .e-calendar .e-day-cell {
  border-radius: 4px;
  transition: all 0.2s ease;
}

:host ::ng-deep .e-calendar .e-day-cell:hover {
  background: #f5f5f5;
}

:host ::ng-deep .e-calendar .e-day-cell.e-selected {
  background: #1976d2;
  color: #ffffff;
  border-radius: 4px;
}
```

## Calendar Mode Selection

### Gregorian Calendar (Default)

```typescript
export class AppComponent {
  selectedDateTime: Date = new Date();
  calendarMode: string = 'Gregorian';
}
```

```html
<ejs-datetimepicker
  [(ngModel)]="selectedDateTime"
  [calendarMode]="calendarMode">
</ejs-datetimepicker>
```

### Islamic Calendar

```typescript
export class AppComponent {
  selectedDateTime: Date = new Date();
  calendarMode: string = 'Islamic'; // Hijri calendar
}
```

```html
<ejs-datetimepicker
  [(ngModel)]="selectedDateTime"
  [calendarMode]="calendarMode"
  [locale]="'ar-AE'">
</ejs-datetimepicker>
```

## Day Header Formats

### Day Header Format Options

Control how day names appear in calendar header:

```typescript
export class AppComponent {
  selectedDateTime: Date = new Date();
  
  dayHeaderFormat: string = 'Short'; // Default
  
  formats = [
    { value: 'Short', label: 'Short (Su, Mo, Tu...)' },
    { value: 'Narrow', label: 'Narrow (S, M, T...)' },
    { value: 'Abbreviated', label: 'Abbreviated (Sun, Mon, Tue...)' },
    { value: 'Wide', label: 'Wide (Sunday, Monday, Tuesday...)' }
  ];
}
```

```html
<div style="margin-bottom: 15px;">
  <label>Day Header Format:</label>
  <select [(ngModel)]="dayHeaderFormat">
    <option *ngFor="let f of formats" [value]="f.value">
      {{ f.label }}
    </option>
  </select>
</div>

<ejs-datetimepicker
  [(ngModel)]="selectedDateTime"
  [dayHeaderFormat]="dayHeaderFormat">
</ejs-datetimepicker>
```

### Format Examples

| Format | Example Output |
|--------|-----------------|
| Short | Su, Mo, Tu, We, Th, Fr, Sa |
| Narrow | S, M, T, W, T, F, S |
| Abbreviated | Sun, Mon, Tue, Wed, Thu, Fri, Sat |
| Wide | Sunday, Monday, Tuesday, Wednesday, Thursday, Friday, Saturday |

## Advanced Customization

### Custom Hour Attribute

```typescript
export class AppComponent {
  selectedDateTime: Date = new Date();
  
  htmlAttributes = {
    'aria-label': 'Select appointment date and time',
    'data-test-id': 'appointment-picker',
    'tabindex': '0'
  };
}
```

```html
<ejs-datetimepicker
  [(ngModel)]="selectedDateTime"
  [htmlAttributes]="htmlAttributes">
</ejs-datetimepicker>
```

### Complete Custom Component

```typescript
export class CustomPickerComponent {
  selectedDateTime: Date = new Date();
  
  // Full customization
  config = {
    format: 'dd/MM/yyyy hh:mm a',
    timeFormat: 'hh:mm a',
    cssClass: 'custom-modern-picker',
    width: '100%',
    zIndex: 1000,
    dayHeaderFormat: 'Abbreviated',
    floatLabelType: 'Auto'
  };
  
  htmlAttributes = {
    'aria-label': 'Date and time picker'
  };
  
  keyConfigs = {
    select: 'space',
    home: 'ctrl+home'
  };
}
```

```html
<ejs-datetimepicker
  [(ngModel)]="selectedDateTime"
  [format]="config.format"
  [timeFormat]="config.timeFormat"
  [cssClass]="config.cssClass"
  [width]="config.width"
  [zIndex]="config.zIndex"
  [dayHeaderFormat]="config.dayHeaderFormat"
  [floatLabelType]="config.floatLabelType"
  [htmlAttributes]="htmlAttributes"
  [keyConfigs]="keyConfigs"
  placeholder="Select date and time">
</ejs-datetimepicker>
```

```css
/* Modern custom styling */
.custom-modern-picker {
  --primary: #6366f1;
  --primary-hover: #4f46e5;
}

.custom-modern-picker .e-input-group {
  background: linear-gradient(135deg, #f5f3ff 0%, #faf8ff 100%);
  border: 2px solid #e9e5ff;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(99, 102, 241, 0.08);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.custom-modern-picker .e-input-group:hover {
  border-color: #d4c5fc;
  box-shadow: 0 4px 16px rgba(99, 102, 241, 0.12);
}

.custom-modern-picker .e-input-group.e-focus {
  border-color: #6366f1;
  box-shadow: 0 0 0 4px rgba(99, 102, 241, 0.1);
}

.custom-modern-picker .e-input {
  font-weight: 500;
  letter-spacing: 0.3px;
}

.custom-modern-picker .e-calendar .e-day-cell.e-selected {
  background: linear-gradient(135deg, #6366f1 0%, #4f46e5 100%);
  border-radius: 8px;
}
```
