# Styling & Customization

## Table of Contents
- [CSS Classes](#css-classes)
- [Theme Selection](#theme-selection)
- [Dark Mode](#dark-mode)
- [Icon Configuration](#icon-configuration)
- [Custom CSS Classes](#custom-css-classes)
- [RTL Support](#rtl-support)
- [Size Variations](#size-variations)
- [Color Variations](#color-variations)
- [Advanced Styling](#advanced-styling)

## CSS Classes

SplitButton uses standard Syncfusion CSS classes for styling:

### Main Component Classes

```css
/* Main split button container */
.e-split-button {
  display: inline-flex;
  align-items: center;
  border-radius: 4px;
}

/* Primary button area */
.e-split-button .e-btn {
  border: 1px solid #d3d3d3;
  background-color: #f5f5f5;
}

/* Dropdown arrow button */
.e-split-button .e-split-button-arrow {
  width: 28px;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Dropdown popup container */
.e-split-button .e-dropdown-popup {
  min-width: 150px;
}

/* Dropdown item */
.e-split-button .e-dropdown-popup .e-list-item {
  padding: 10px 15px;
}

/* Dropdown item hover state */
.e-split-button .e-dropdown-popup .e-list-item:hover {
  background-color: #f0f0f0;
}

/* Dropdown separator */
.e-split-button .e-dropdown-popup .e-separator {
  height: 1px;
  background-color: #e8e8e8;
  margin: 5px 0;
}
```

### State Classes

```css
/* Disabled state */
.e-split-button.e-disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

/* Focused state */
.e-split-button:focus,
.e-split-button .e-btn:focus {
  outline: 2px solid #0066cc;
}

/* Active/selected state */
.e-split-button.e-active {
  background-color: #e3f2fd;
}
```

## Theme Selection

### Material Design 3 Theme (Default)

```css
/* styles.css or app.component.css */
@import '../node_modules/@syncfusion/ej2-base/styles/material3.css';
@import '../node_modules/@syncfusion/ej2-buttons/styles/material3.css';
@import '../node_modules/@syncfusion/ej2-popups/styles/material3.css';
@import '../node_modules/@syncfusion/ej2-splitbuttons/styles/material3.css';
```

### Bootstrap 5 Theme

```css
@import '../node_modules/@syncfusion/ej2-base/styles/bootstrap5.css';
@import '../node_modules/@syncfusion/ej2-buttons/styles/bootstrap5.css';
@import '../node_modules/@syncfusion/ej2-popups/styles/bootstrap5.css';
@import '../node_modules/@syncfusion/ej2-splitbuttons/styles/bootstrap5.css';
```

### Fluent Design Theme

```css
@import '../node_modules/@syncfusion/ej2-base/styles/fluent.css';
@import '../node_modules/@syncfusion/ej2-buttons/styles/fluent.css';
@import '../node_modules/@syncfusion/ej2-popups/styles/fluent.css';
@import '../node_modules/@syncfusion/ej2-splitbuttons/styles/fluent.css';
```

### Tailwind Theme

```css
@import '../node_modules/@syncfusion/ej2-base/styles/tailwind.css';
@import '../node_modules/@syncfusion/ej2-buttons/styles/tailwind.css';
@import '../node_modules/@syncfusion/ej2-popups/styles/tailwind.css';
@import '../node_modules/@syncfusion/ej2-splitbuttons/styles/tailwind.css';
```

### Fabric Theme

```css
@import '../node_modules/@syncfusion/ej2-base/styles/fabric.css';
@import '../node_modules/@syncfusion/ej2-buttons/styles/fabric.css';
@import '../node_modules/@syncfusion/ej2-popups/styles/fabric.css';
@import '../node_modules/@syncfusion/ej2-splitbuttons/styles/fabric.css';
```

### Theme Switcher

```typescript
export class ThemeSwitcherComponent {
  currentTheme: string = 'material3';
  
  switchTheme(theme: string): void {
    // Remove current theme
    this.removeThemeLink(this.currentTheme);
    
    // Add new theme
    this.loadThemeLink(theme);
    
    this.currentTheme = theme;
  }
  
  private loadThemeLink(theme: string): void {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = `../node_modules/@syncfusion/ej2-splitbuttons/styles/${theme}.css`;
    link.id = `theme-${theme}`;
    document.head.appendChild(link);
  }
  
  private removeThemeLink(theme: string): void {
    const link = document.getElementById(`theme-${theme}`);
    if (link) {
      link.remove();
    }
  }
}
```

```html
<div style="margin-bottom: 20px;">
  <button (click)="switchTheme('material3')">Material 3</button>
  <button (click)="switchTheme('bootstrap5')">Bootstrap 5</button>
  <button (click)="switchTheme('fluent')">Fluent</button>
  <button (click)="switchTheme('tailwind')">Tailwind</button>
</div>

<ejs-splitbutton 
  content="Actions"
  [items]="items">
</ejs-splitbutton>
```

## Dark Mode

### Enable Dark Mode

```typescript
export class AppComponent {
  @ViewChild('splitBtn') splitButtonRef!: SplitButtonComponent;
  
  isDarkMode: boolean = false;
  
  ngOnInit(): void {
    this.initializeDarkMode();
  }
  
  toggleDarkMode(): void {
    this.isDarkMode = !this.isDarkMode;
    this.applyDarkMode();
  }
  
  private initializeDarkMode(): void {
    // Check system preference or localStorage
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    this.isDarkMode = prefersDark;
    this.applyDarkMode();
  }
  
  private applyDarkMode(): void {
    const htmlElement = document.documentElement;
    
    if (this.isDarkMode) {
      htmlElement.classList.add('e-dark');
    } else {
      htmlElement.classList.remove('e-dark');
    }
    
    // Save preference
    localStorage.setItem('dark-mode', this.isDarkMode ? 'true' : 'false');
  }
}
```

### Dark Mode CSS

```css
/* app.component.css */
:host ::ng-deep.e-dark .e-split-button {
  background-color: #2d2d2d;
  color: #ffffff;
  border-color: #404040;
}

:host ::ng-deep.e-dark .e-split-button .e-btn {
  background-color: #3d3d3d;
  color: #ffffff;
  border-color: #505050;
}

:host ::ng-deep.e-dark .e-dropdown-popup {
  background-color: #2d2d2d;
}

:host ::ng-deep.e-dark .e-list-item {
  color: #ffffff;
}

:host ::ng-deep.e-dark .e-list-item:hover {
  background-color: #404040;
}
```

## Icon Configuration

### Icon Position (Prefix/Suffix)

```typescript
export class AppComponent {
  public items: ItemModel[] = [
    { text: 'Save', iconCss: 'e-icons e-save' },
    { text: 'Export', iconCss: 'e-icons e-export' }
  ];
}
```

```html
<!-- Icon on left (default) -->
<ejs-splitbutton 
  content="Save"
  iconCss="e-icons e-save"
  [items]="items">
</ejs-splitbutton>
```

### Icon Sizing

```css
/* app.component.css */
:host ::ng-deep .e-split-button .e-icon {
  font-size: 16px;
}

:host ::ng-deep .e-split-button .e-dropdown-popup .e-list-item .e-icon {
  font-size: 14px;
}

/* Large icons */
:host ::ng-deep .e-split-button.e-large .e-icon {
  font-size: 20px;
}

/* Small icons */
:host ::ng-deep .e-split-button.e-small .e-icon {
  font-size: 12px;
}
```

### Icon Spacing

```css
:host ::ng-deep .e-split-button .e-icon {
  margin-right: 8px;
}

:host ::ng-deep .e-split-button-arrow {
  margin-left: 8px;
}

:host ::ng-deep .e-list-item .e-icon {
  margin-right: 10px;
}
```

## Custom CSS Classes

### Apply Custom CSS Class

```typescript
export class AppComponent {
  public items: ItemModel[] = [
    { text: 'Option 1' },
    { text: 'Option 2' }
  ];
}
```

```html
<ejs-splitbutton 
  content="Custom Style"
  cssClass="custom-split-button"
  [items]="items">
</ejs-splitbutton>
```

```css
/* app.component.css */
:host ::ng-deep .custom-split-button {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border-radius: 6px;
  box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
}

:host ::ng-deep .custom-split-button .e-btn {
  background: transparent;
  border: none;
  color: white;
  font-weight: 600;
  padding: 10px 20px;
}

:host ::ng-deep .custom-split-button .e-split-button-arrow {
  border-left: 1px solid rgba(255, 255, 255, 0.3);
  color: white;
}

:host ::ng-deep .custom-split-button .e-dropdown-popup {
  background: white;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

:host ::ng-deep .custom-split-button .e-list-item {
  padding: 12px 16px;
  border-bottom: 1px solid #f0f0f0;
}

:host ::ng-deep .custom-split-button .e-list-item:hover {
  background-color: #f5f5f5;
  padding-left: 20px;
  transition: all 0.2s ease;
}

:host ::ng-deep .custom-split-button .e-list-item:last-child {
  border-bottom: none;
}
```

## RTL Support

### Enable RTL

```typescript
export class AppComponent {
  @ViewChild('splitBtn') splitButtonRef!: SplitButtonComponent;
  
  enableRtl: boolean = false;
  
  toggleRTL(): void {
    this.enableRtl = !this.enableRtl;
  }
}
```

```html
<ejs-splitbutton 
  content="الإجراءات"
  [items]="items"
  [enableRtl]="enableRtl">
</ejs-splitbutton>

<button (click)="toggleRTL()">Toggle RTL</button>
```

### RTL CSS

```css
/* Automatically applied when enableRtl is true */
:host ::ng-deep [dir="rtl"] .e-split-button {
  direction: rtl;
  text-align: right;
}

:host ::ng-deep [dir="rtl"] .e-list-item .e-icon {
  margin-right: 0;
  margin-left: 10px;
}

:host ::ng-deep [dir="rtl"] .e-split-button .e-split-button-arrow {
  border-right: 1px solid #d3d3d3;
  border-left: none;
}
```

## Size Variations

### Small Button

```typescript
export class AppComponent {
  public items: ItemModel[] = [
    { text: 'Small Option 1' },
    { text: 'Small Option 2' }
  ];
}
```

```html
<ejs-splitbutton 
  content="Small"
  cssClass="e-small"
  [items]="items">
</ejs-splitbutton>
```

```css
:host ::ng-deep .e-split-button.e-small {
  padding: 4px 8px;
  font-size: 12px;
}

:host ::ng-deep .e-split-button.e-small .e-btn {
  padding: 4px 8px;
}

:host ::ng-deep .e-split-button.e-small .e-icon {
  font-size: 12px;
}
```

### Large Button

```html
<ejs-splitbutton 
  content="Large"
  cssClass="e-large"
  [items]="items">
</ejs-splitbutton>
```

```css
:host ::ng-deep .e-split-button.e-large {
  padding: 12px 20px;
  font-size: 16px;
  border-radius: 8px;
}

:host ::ng-deep .e-split-button.e-large .e-btn {
  padding: 12px 20px;
}

:host ::ng-deep .e-split-button.e-large .e-icon {
  font-size: 20px;
}
```

### Responsive Sizing

```css
/* Mobile devices */
@media (max-width: 768px) {
  :host ::ng-deep .e-split-button {
    padding: 8px 12px;
    font-size: 14px;
  }
}

/* Tablets and larger */
@media (min-width: 769px) {
  :host ::ng-deep .e-split-button {
    padding: 10px 16px;
    font-size: 14px;
  }
}

/* Desktop */
@media (min-width: 1024px) {
  :host ::ng-deep .e-split-button {
    padding: 12px 20px;
    font-size: 14px;
  }
}
```

## Color Variations

### Primary Button

```html
<ejs-splitbutton 
  content="Primary"
  cssClass="e-primary"
  [items]="items">
</ejs-splitbutton>
```

```css
:host ::ng-deep .e-split-button.e-primary {
  background-color: #0066cc;
  color: white;
}

:host ::ng-deep .e-split-button.e-primary .e-btn {
  background-color: #0066cc;
  color: white;
  border-color: #0066cc;
}

:host ::ng-deep .e-split-button.e-primary .e-btn:hover {
  background-color: #0052a3;
}
```

### Success Button

```html
<ejs-splitbutton 
  content="Success"
  cssClass="e-success"
  [items]="items">
</ejs-splitbutton>
```

```css
:host ::ng-deep .e-split-button.e-success {
  background-color: #28a745;
  color: white;
}

:host ::ng-deep .e-split-button.e-success .e-btn {
  background-color: #28a745;
  color: white;
  border-color: #28a745;
}
```

### Danger Button

```html
<ejs-splitbutton 
  content="Delete"
  cssClass="e-danger"
  [items]="items">
</ejs-splitbutton>
```

```css
:host ::ng-deep .e-split-button.e-danger {
  background-color: #dc3545;
  color: white;
}

:host ::ng-deep .e-split-button.e-danger .e-btn {
  background-color: #dc3545;
  color: white;
  border-color: #dc3545;
}

:host ::ng-deep .e-split-button.e-danger .e-btn:hover {
  background-color: #c82333;
}
```

## Advanced Styling

### Gradient Buttons

```css
:host ::ng-deep .gradient-split-button {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}

:host ::ng-deep .gradient-split-button .e-btn {
  background: transparent;
  border: none;
  color: white;
}
```

### Shadow Effects

```css
:host ::ng-deep .shadow-split-button {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
}

:host ::ng-deep .shadow-split-button:hover {
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.25);
}
```

### Border Radius Variations

```css
:host ::ng-deep .rounded-split-button {
  border-radius: 8px;
  overflow: hidden;
}

:host ::ng-deep .pill-split-button {
  border-radius: 24px;
  padding: 8px 20px;
}

:host ::ng-deep .sharp-split-button {
  border-radius: 0;
}
```

### Animation

```css
@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

:host ::ng-deep .e-dropdown-popup {
  animation: slideDown 0.2s ease-out;
}
```

Your styling is now complete! Explore [templates-and-icons.md](templates-and-icons.md) for advanced icon options.
