# Styling & Customization

## Table of Contents
- [Theme Selection](#theme-selection)
- [CSS Class Customization](#css-class-customization)
- [Dark Mode](#dark-mode)
- [Custom Day Cell Styling](#custom-day-cell-styling)
- [Component Width & Sizing](#component-width--sizing)
- [Responsive Layout](#responsive-layout)
- [Advanced CSS Customization](#advanced-css-customization)

## Theme Selection

### Available Themes

```typescript
export class AppComponent {
  // Available Syncfusion themes
  themes = {
    material3: 'Material Design 3 (Default, Modern)',
    bootstrap5: 'Bootstrap 5 (Professional)',
    fluent: 'Microsoft Fluent Design',
    fabric: 'Office Fabric Theme',
    tailwind: 'Tailwind CSS (Utility-first)'
  };
  
  selectedTheme: string = 'material3';
}
```

### Switching Themes

```css
/* Include theme CSS files for each theme option */

/* Material Design 3 (Default) */
@import '../node_modules/@syncfusion/ej2-base/styles/material3.css';
@import '../node_modules/@syncfusion/ej2-calendars/styles/material3.css';

/* Bootstrap 5 */
/* @import '../node_modules/@syncfusion/ej2-base/styles/bootstrap5.css';
@import '../node_modules/@syncfusion/ej2-calendars/styles/bootstrap5.css'; */

/* Microsoft Fluent */
/* @import '../node_modules/@syncfusion/ej2-base/styles/fluent.css';
@import '../node_modules/@syncfusion/ej2-calendars/styles/fluent.css'; */
```

```typescript
// Note: Theme switching at runtime typically requires CSS class management
// or dynamic style injection (advanced topic)
export class AppComponent {
  currentTheme: string = 'material3';
  
  // For bootstrap5 theme example
  // Add class to body or root element
  setTheme(theme: string): void {
    this.currentTheme = theme;
    // Theme change would require CSS class or dynamic import
  }
}
```

## CSS Class Customization

### DateRangePicker CSS Classes

| Class | Purpose | Target |
|-------|---------|--------|
| `.e-daterangepicker` | Main container | Component wrapper |
| `.e-input` | Input field | Text input element |
| `.e-input-group` | Input group | Input wrapper |
| `.e-input-group-icon` | Input icon | Calendar icon |
| `.e-calendar` | Calendar wrapper | Calendar container |
| `.e-range-header` | Range header | Header section |
| `.e-day` | Day cell | Individual date |
| `.e-selected` | Selected dates | Highlighted dates |
| `.e-today` | Today marker | Current date |
| `.e-disabled` | Disabled dates | Non-selectable dates |
| `.e-popup` | Popup container | Calendar popup |
| `.e-apply` | Apply button | Confirm button |
| `.e-cancel` | Cancel button | Cancel button |

### Custom CSS Class Application

```typescript
export class AppComponent {
  startDate: Date = new Date();
  endDate: Date = new Date();
  
  // Apply custom CSS class to component
  customClass: string = 'my-daterangepicker';
}
```

```html
<ejs-daterangepicker 
  [startDate]="startDate"
  [endDate]="endDate"
  [cssClass]="customClass">
</ejs-daterangepicker>
```

```css
/* Custom styling for DateRangePicker */
:host ::ng-deep .my-daterangepicker {
  /* Component styling */
}

:host ::ng-deep .my-daterangepicker .e-input {
  border: 2px solid #3f51b5;
  border-radius: 8px;
  padding: 10px;
  font-size: 16px;
}

:host ::ng-deep .my-daterangepicker .e-calendar {
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
}

:host ::ng-deep .my-daterangepicker .e-day:hover {
  background-color: #e8eaf6;
}

:host ::ng-deep .my-daterangepicker .e-selected {
  background-color: #3f51b5;
  color: white;
  border-radius: 4px;
}
```

## Dark Mode

### Implementing Dark Mode

```typescript
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  isDarkMode: boolean = false;
  startDate: Date = new Date();
  endDate: Date = new Date();
  
  ngOnInit(): void {
    // Detect system dark mode preference
    this.isDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
  }
  
  toggleDarkMode(): void {
    this.isDarkMode = !this.isDarkMode;
    this.applyTheme();
  }
  
  private applyTheme(): void {
    if (this.isDarkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }
}
```

```html
<div [class.dark-mode]="isDarkMode">
  <button (click)="toggleDarkMode()">
    {{ isDarkMode ? '☀️ Light Mode' : '🌙 Dark Mode' }}
  </button>
  
  <ejs-daterangepicker 
    [startDate]="startDate"
    [endDate]="endDate"
    placeholder="Select date range">
  </ejs-daterangepicker>
</div>
```

```css
/* Dark mode styling */
:root {
  --bg-primary: #ffffff;
  --bg-secondary: #f5f5f5;
  --text-primary: #1a1a1a;
  --text-secondary: #666666;
  --border-color: #e0e0e0;
}

body.dark-mode {
  --bg-primary: #1e1e1e;
  --bg-secondary: #2d2d2d;
  --text-primary: #f5f5f5;
  --text-secondary: #b0b0b0;
  --border-color: #404040;
}

:host ::ng-deep .e-daterangepicker {
  background-color: var(--bg-primary);
  color: var(--text-primary);
}

:host ::ng-deep .e-input {
  background-color: var(--bg-primary);
  color: var(--text-primary);
  border-color: var(--border-color);
}

:host ::ng-deep .e-calendar {
  background-color: var(--bg-secondary);
  color: var(--text-primary);
}
```

## Custom Day Cell Styling

### Highlight Specific Dates

```typescript
export class AppComponent {
  startDate: Date = new Date(2026, 2, 1);
  endDate: Date = new Date(2026, 2, 31);
  
  // Special dates to highlight
  specialDates: Date[] = [
    new Date(2026, 2, 5),    // Birthday
    new Date(2026, 2, 15),   // Holiday
    new Date(2026, 2, 25)    // Event
  ];
  
  onRenderDayCell(args: any): void {
    // Check if date is special
    for (const special of this.specialDates) {
      if (args.date.toDateString() === special.toDateString()) {
        // Add custom styling
        args.element.classList.add('special-date');
        args.element.innerHTML += '<span class="badge">★</span>';
        break;
      }
    }
  }
}
```

```html
<ejs-daterangepicker 
  [startDate]="startDate"
  [endDate]="endDate"
  (renderDayCell)="onRenderDayCell($event)">
</ejs-daterangepicker>
```

```css
:host ::ng-deep .special-date {
  background-color: #fff3e0 !important;
  font-weight: bold;
  position: relative;
}

:host ::ng-deep .special-date .badge {
  position: absolute;
  top: 2px;
  right: 2px;
  color: #f57c00;
  font-size: 12px;
}
```

### Disable Weekend Styling

```typescript
export class AppComponent {
  startDate: Date = new Date(2026, 2, 2);  // Monday
  endDate: Date = new Date(2026, 2, 13);   // Friday
  
  onRenderDayCell(args: any): void {
    const dayOfWeek = args.date.getDay();
    
    // Disable and style weekends
    if (dayOfWeek === 0 || dayOfWeek === 6) {
      args.isDisabled = true;
      args.element.classList.add('weekend');
    }
  }
}
```

```css
:host ::ng-deep .weekend {
  background-color: #f0f0f0;
  color: #ccc;
  cursor: not-allowed;
  opacity: 0.5;
}
```

## Component Width & Sizing

### Set Component Width

```typescript
export class AppComponent {
  startDate: Date = new Date();
  endDate: Date = new Date();
  
  // Different width options
  widths = {
    narrow: '250px',
    medium: '350px',
    wide: '450px',
    fullWidth: '100%'
  };
  
  selectedWidth: string = 'medium';
}
```

```html
<div>
  <select [(ngModel)]="selectedWidth">
    <option value="narrow">Narrow (250px)</option>
    <option value="medium">Medium (350px)</option>
    <option value="wide">Wide (450px)</option>
    <option value="fullWidth">Full Width</option>
  </select>
  
  <ejs-daterangepicker 
    [startDate]="startDate"
    [endDate]="endDate"
    [width]="widths[selectedWidth]">
  </ejs-daterangepicker>
</div>
```

### Responsive Sizing

```typescript
export class AppComponent {
  startDate: Date = new Date();
  endDate: Date = new Date();
  
  @HostListener('window:resize', ['$event'])
  onResize(event: any): void {
    // Handle responsive sizing
    console.log('Window resized');
  }
}
```

```css
/* Responsive sizing */
:host ::ng-deep .e-daterangepicker {
  /* Desktop: full width up to max */
  width: 100%;
  max-width: 400px;
  
  /* Tablet */
  @media (max-width: 768px) {
    max-width: 100%;
  }
  
  /* Mobile */
  @media (max-width: 480px) {
    width: 100%;
    max-width: 100%;
  }
}
```

## Responsive Layout

### Mobile-Optimized Layout

```typescript
export class AppComponent {
  startDate: Date = new Date();
  endDate: Date = new Date();
  
  isMobile: boolean = window.innerWidth < 768;
  
  @HostListener('window:resize')
  onWindowResize(): void {
    this.isMobile = window.innerWidth < 768;
  }
}
```

```html
<div [class.mobile]="isMobile" [class.desktop]="!isMobile">
  <div class="form-group">
    <label for="daterange">Select Date Range</label>
    <ejs-daterangepicker 
      id="daterange"
      [startDate]="startDate"
      [endDate]="endDate"
      [width]="isMobile ? '100%' : '350px'">
    </ejs-daterangepicker>
  </div>
</div>
```

```css
.mobile {
  padding: 10px;
}

.mobile :host ::ng-deep .e-daterangepicker {
  width: 100%;
  font-size: 16px;  /* Prevent iOS zoom */
}

.desktop {
  padding: 20px;
}

.desktop :host ::ng-deep .e-daterangepicker {
  width: 350px;
  max-width: 100%;
}
```

## Advanced CSS Customization

### Custom Theme with CSS Variables

```css
/* Define custom theme with CSS variables */
:root {
  --drp-primary: #3f51b5;
  --drp-primary-dark: #303f9f;
  --drp-accent: #ff4081;
  --drp-bg: #ffffff;
  --drp-text: #1a1a1a;
  --drp-border: #e0e0e0;
  --drp-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

body.dark-mode {
  --drp-primary: #5e6fa3;
  --drp-primary-dark: #3f51b5;
  --drp-bg: #1e1e1e;
  --drp-text: #f5f5f5;
  --drp-border: #404040;
}

:host ::ng-deep .e-daterangepicker {
  background-color: var(--drp-bg);
  color: var(--drp-text);
}

:host ::ng-deep .e-input {
  border: 2px solid var(--drp-border);
  border-radius: 8px;
  background-color: var(--drp-bg);
  color: var(--drp-text);
  padding: 10px 12px;
  transition: all 0.3s ease;
}

:host ::ng-deep .e-input:focus {
  border-color: var(--drp-primary);
  box-shadow: 0 0 0 3px rgba(63, 81, 181, 0.1);
  outline: none;
}

:host ::ng-deep .e-calendar {
  background-color: var(--drp-bg);
  box-shadow: var(--drp-shadow);
  border-radius: 12px;
  overflow: hidden;
}

:host ::ng-deep .e-range-header {
  background: linear-gradient(135deg, var(--drp-primary), var(--drp-primary-dark));
  color: white;
}

:host ::ng-deep .e-selected {
  background-color: var(--drp-primary);
  color: white;
  border-radius: 4px;
}

:host ::ng-deep .e-day:hover {
  background-color: var(--drp-accent);
  cursor: pointer;
}

:host ::ng-deep .e-day:focus {
  outline: 2px solid var(--drp-primary);
  outline-offset: -2px;
}
```

### Animation and Transitions

```css
:host ::ng-deep .e-popup {
  animation: slideIn 0.3s ease-out;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

:host ::ng-deep .e-day {
  transition: all 0.2s ease;
}

:host ::ng-deep .e-day:hover {
  transform: scale(1.05);
  box-shadow: inset 0 0 0 2px var(--drp-accent);
}
```

---

**Next Step:** For internationalization and localization, read [globalization-and-localization.md](globalization-and-localization.md).
