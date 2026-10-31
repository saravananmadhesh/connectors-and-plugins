# Customization and Styling in Angular DropDownList

## Table of Contents
- [CSS Architecture Overview](#css-architecture-overview)
- [cssClass Property](#cssclass-property)
- [Customizing the Wrapper Element](#customizing-the-wrapper-element)
- [Customizing the Dropdown Icon](#customizing-the-dropdown-icon)
- [Focus Color Customization](#focus-color-customization)
- [Outline Theme Focus Color](#outline-theme-focus-color)
- [Disabled State Text Color](#disabled-state-text-color)
- [Float Label Styling](#float-label-styling)
- [Placeholder Text Color](#placeholder-text-color)
- [Popup and List Item Appearance](#popup-and-list-item-appearance)
- [Hover, Focus, and Active Item Colors](#hover-focus-and-active-item-colors)
- [Mandatory Asterisk Pattern](#mandatory-asterisk-pattern)
- [Theme Options](#theme-options)
- [Localization](#localization)
- [RTL Support](#rtl-support)

---

## CSS Architecture Overview

Syncfusion uses BEM-style CSS classes with the `e-` prefix. The DropDownList main wrapper has class `.e-ddl`. Override styles in your global `styles.css` or component styles (use `::ng-deep` or `:host ::ng-deep` if scoped):

```css
/* Global override in styles.css — preferred */
.e-ddl .e-input { color: #333; }

/* Component-scoped override */
:host ::ng-deep .e-ddl .e-input { color: #333; }
```

---

## cssClass Property

| Detail | Value |
|---|---|
| **Property** | `cssClass` |
| **Type** | `string` |
| **Default** | `null` |

The `cssClass` property applies one or more custom CSS class names to the **root element** of the DropDownList component (the `.e-ddl` wrapper). Use it to scope all style overrides to a specific instance without affecting other DropDownList components on the page.

### Basic Usage

```html
<ejs-dropdownlist
  [dataSource]="sportsData"
  cssClass="my-custom-ddl"
  placeholder="Select a game">
</ejs-dropdownlist>
```

This renders as:
```html
<span class="e-control-wrapper e-ddl e-lib e-keyboard my-custom-ddl ...">
```

### Scoped Style Overrides with cssClass

Because `cssClass` is applied to the root wrapper, you can scope all your CSS rules to that class and avoid conflicts with other components:

```typescript
@Component({
  selector: 'app-root',
  styles: [`
    /* Scoped to only this DropDownList instance */
    ::ng-deep .country-picker .e-input {
      font-size: 14px;
      color: #1a1a2e;
      background-color: #f0f4ff;
      border-radius: 4px;
    }

    ::ng-deep .country-picker .e-input-group-icon.e-ddl-icon::before {
      color: #4361ee;
    }

    /* Popup inherits the cssClass too — target popup-level styles */
    ::ng-deep .country-picker.e-popup .e-list-item.e-hover {
      background-color: #e8edff;
      color: #4361ee;
    }

    ::ng-deep .country-picker.e-popup .e-list-item.e-active {
      background-color: #4361ee;
      color: #ffffff;
    }
  `],
  template: `
    <ejs-dropdownlist
      [dataSource]="countryData"
      [fields]="fields"
      cssClass="country-picker"
      placeholder="Select a country">
    </ejs-dropdownlist>
  `
})
export class AppComponent {
  public countryData = [
    { Name: 'Australia', Code: 'AU' },
    { Name: 'Canada', Code: 'CA' }
  ];
  public fields = { text: 'Name', value: 'Code' };
}
```

> **Important:** The popup element also receives the `cssClass` value. You can target it using `.your-class.e-popup` or `.your-class .e-list-item`.

### Multiple CSS Classes

Pass a space-separated string to apply multiple classes simultaneously:

```html
<ejs-dropdownlist
  [dataSource]="data"
  cssClass="compact-ddl dark-theme"
  placeholder="Select">
</ejs-dropdownlist>
```

```css
:host ::ng-deep .compact-ddl .e-input { 
  padding: 4px 8px; 
  height: 28px; 
}

:host ::ng-deep .dark-theme .e-input { 
  background: #1e1e2e; 
  color: #cdd6f4; 
}
```

### Applying cssClass Conditionally (Angular State)

Use property binding to dynamically add or remove CSS classes based on component state:

```typescript
@Component({
  selector: 'app-root',
  styles: [`
    ::ng-deep .has-error .e-input {
      border-color: #d32f2f;
      background-color: #ffebee;
    }

    ::ng-deep .has-success .e-input {
      border-color: #388e3c;
      background-color: #e8f5e9;
    }
  `],
  template: `
    <ejs-dropdownlist
      [dataSource]="['Option A', 'Option B', 'Option C']"
      [cssClass]="selectedValue ? 'has-success' : 'has-error'"
      [(value)]="selectedValue"
      placeholder="Select an option"
      (change)="onValueChange()">
    </ejs-dropdownlist>
  `
})
export class AppComponent {
  public selectedValue: string | null = null;

  onValueChange() {
    // CSS class updates reactively based on selectedValue
  }
}
```

### Built-in Utility Classes

Syncfusion provides predefined CSS classes for common states. Combine them with `cssClass`:

| Class | Effect | Usage |
|---|---|---|
| `e-error` | Red border — validation error state | `cssClass="e-error"` |
| `e-success` | Green border — validation success state | `cssClass="e-success"` |
| `e-warning` | Yellow border — warning state | `cssClass="e-warning"` |

```html
<!-- Show validation error -->
<ejs-dropdownlist
  [dataSource]="data"
  [cssClass]="isInvalid ? 'e-error' : ''"
  placeholder="Required field">
</ejs-dropdownlist>
```

---

## Customizing the Wrapper Element

Change the input font, color, and background:

```css
.e-ddl.e-input-group.e-control-wrapper .e-input {
  font-size: 16px;
  font-family: 'Segoe UI', sans-serif;
  color: #ab3243;
  background: #f0f8ff;
}
```

---

## Customizing the Dropdown Icon

Change the color and size of the chevron/arrow icon:

```css
.e-ddl.e-input-group .e-input-group-icon,
.e-ddl.e-input-group.e-control-wrapper .e-input-group-icon:hover {
  color: #bb233d;
  font-size: 14px;
}
```

---

## Focus Color Customization

Customize the animated underline that appears when the input is focused (Material theme):

```css
.e-ddl.e-input-group.e-control-wrapper.e-input-focus::before,
.e-ddl.e-input-group.e-control-wrapper.e-input-focus::after {
  background: #c000ff;
}
```

---

## Outline Theme Focus Color

For the outline (bordered box) input variant, customize the border and shadow on focus:

```css
.e-outline.e-input-group.e-input-focus:hover:not(.e-success):not(.e-warning):not(.e-error):not(.e-disabled),
.e-outline.e-input-group.e-input-focus:not(.e-success):not(.e-warning):not(.e-error):not(.e-disabled) {
  border-color: #b1bd15;
  box-shadow: inset 1px 1px #b1bd15, inset -1px 0 #b1bd15, inset 0 -1px #b1bd15;
}
```

---

## Disabled State Text Color

Customize the text color when the component or item is disabled:

```css
.e-input-group.e-control-wrapper .e-input[disabled] {
  -webkit-text-fill-color: #aaa;
  color: #aaa;
}
```

---

## Float Label Styling

When using a float label (label that moves up when focused), customize the label's focus color and animation line:

```css
/* Animated underline color */
.e-float-input.e-input-group:not(.e-float-icon-left) .e-float-line::before,
.e-float-input.e-input-group:not(.e-float-icon-left) .e-float-line::after {
  background-color: #2319b8;
}

/* Float label text color when focused */
.e-ddl.e-lib.e-input-group.e-control-wrapper.e-float-input.e-input-focus .e-float-text.e-label-top {
  color: #2319b8;
}
```

**Add a float label in the template:**

```html
<ejs-dropdownlist
  [dataSource]="sports"
  floatLabelType="Auto"
  placeholder="Select a sport">
</ejs-dropdownlist>
```

`floatLabelType` values: `'Never'` (always placeholder), `'Always'` (always floating), `'Auto'` (floats on focus/value).

---

## Placeholder Text Color

```css
.e-ddl.e-input-group input.e-input::placeholder {
  color: #999;
  font-style: italic;
}
```

---

## Popup and List Item Appearance

Customize the popup list container and every list item:

```css
/* All list items */
.e-dropdownbase .e-list-item,
.e-dropdownbase .e-list-item.e-item-focus {
  background-color: #f9f9f9;
  color: #333;
  font-family: 'Segoe UI', sans-serif;
  min-height: 32px;
}

/* Popup container */
.e-popup.e-ddl {
  border-radius: 4px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
}
```

---

## Hover, Focus, and Active Item Colors

```css
/* Hovered, focused, or selected active items */
.e-dropdownbase .e-list-item.e-item-focus,
.e-dropdownbase .e-list-item.e-active,
.e-dropdownbase .e-list-item.e-active.e-hover,
.e-dropdownbase .e-list-item.e-hover {
  background-color: #e8f4fd;
  color: #0078d4;
}
```

---

## Mandatory Asterisk Pattern

Add a visible asterisk (`*`) to float labels and placeholders to indicate required fields:

```typescript
@Component({
  standalone: true,
  imports: [DropDownListModule],
  selector: 'app-root',
  styles: [`
    /* Show asterisk after float label */
    ::ng-deep .e-input-group.e-control-wrapper.e-float-input .e-float-text::after {
      content: ' *';
      color: red;
    }
  `],
  template: `
    <ejs-dropdownlist
      [dataSource]="sports"
      floatLabelType="Auto"
      placeholder="Select a sport (required)">
    </ejs-dropdownlist>
  `
})
export class AppComponent {
  public sports = ['Cricket', 'Football', 'Tennis'];
}
```

---

## Theme Options

Syncfusion provides several built-in themes. Import the desired theme in `styles.css` or `angular.json`:

| Theme | Import suffix |
|---|---|
| Material 3 (default) | `material3.css` |
| Material | `material.css` |
| Bootstrap 5 | `bootstrap5.css` |
| Fluent | `fluent.css` |
| Tailwind CSS | `tailwind.css` |
| High Contrast | `highcontrast.css` |

```css
/* Switch to Bootstrap 5 theme */
@import '../node_modules/@syncfusion/ej2-base/styles/bootstrap5.css';
@import '../node_modules/@syncfusion/ej2-dropdowns/styles/bootstrap5.css';
@import '../node_modules/@syncfusion/ej2-angular-dropdowns/styles/bootstrap5.css';
/* ... other dependencies */
```

**Theme Studio:** For fully custom themes (custom colors, fonts, spacing), use [Syncfusion Theme Studio](https://ej2.syncfusion.com/themestudio/) to generate a custom CSS file.

---

## Localization

Translate the built-in text strings (`noRecordsTemplate`, `actionFailureTemplate`) using the `L10n` class:

```typescript
import { Component, OnInit } from '@angular/core';
import { L10n } from '@syncfusion/ej2-base';
import { DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';

// Register locale strings before component loads
L10n.load({
  'fr-BE': {
    'dropdowns': {
      'noRecordsTemplate': 'Aucun enregistrement trouvé',
      'actionFailureTemplate': 'La demande a échoué'
    }
  }
});

@Component({
  standalone: true,
  imports: [DropDownListModule],
  selector: 'app-root',
  template: `
    <ejs-dropdownlist
      [dataSource]="emptyData"
      locale="fr-BE"
      placeholder="Sélectionner">
    </ejs-dropdownlist>
  `
})
export class AppComponent implements OnInit {
  public emptyData: string[] = [];

  ngOnInit(): void {
    // Data intentionally empty to show noRecordsTemplate
  }
}
```

**Default locale keys:**

| Key | Default (en-US) |
|---|---|
| `noRecordsTemplate` | `No records found` |
| `actionFailureTemplate` | `The request failed` |

> Call `L10n.load()` before the Angular bootstrap (e.g., in `main.ts` or before `@Component` initialization) to ensure translations are available at render time.

---

## RTL Support

Enable right-to-left layout with `[enableRtl]="true"`:

```html
<ejs-dropdownlist
  [dataSource]="sports"
  [enableRtl]="true"
  placeholder="اختر">
</ejs-dropdownlist>
```

RTL flips the text direction, icon position, and popup alignment. This is useful for Arabic, Hebrew, and Persian locales.

---

## See Also

- [Getting Started](getting-started.md) — theme import setup
- [Disabled Items and Forms](disabled-items-and-forms.md) — form integration
- Accessibility — WCAG compliance and keyboard navigation
