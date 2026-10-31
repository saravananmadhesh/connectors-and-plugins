# Accessibility & Localization

## Table of Contents
- [Accessibility Standards](#accessibility-standards)
- [ARIA Attributes](#aria-attributes)
- [Keyboard Navigation](#keyboard-navigation)
- [Screen Reader Support](#screen-reader-support)
- [Focus Management](#focus-management)
- [Color & Contrast](#color--contrast)
- [Localization](#localization)
- [Right-to-Left (RTL)](#right-to-left-rtl)
- [Testing Accessibility](#testing-accessibility)
- [Common Patterns](#common-patterns)
- [Troubleshooting](#troubleshooting)

---

## Accessibility Standards

### WCAG 2.2 Compliance

**ComboBox meets:**
- **WCAG 2.2 Level AA** - Industry standard accessibility
- **Section 508** - U.S. government accessibility requirements
- **ADA** - Americans with Disabilities Act

**ComboBox supports:**
- ✓ Keyboard navigation (arrow keys, Tab, Enter, Escape)
- ✓ Screen reader announcements
- ✓ ARIA roles and attributes
- ✓ Focus indicators
- ✓ Color contrast (4.5:1 ratio)
- ✓ Mobile accessibility

```typescript
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComboBoxComponent } from '@syncfusion/ej2-angular-dropdowns';

@Component({
  selector: 'app-accessible',
  standalone: true,
  imports: [CommonModule, ComboBoxComponent],
  template: `
    <!-- ComboBox is accessible by default -->
    <ejs-combobox
      [dataSource]="items"
      placeholder="Select an option"
      [enabled]="true">
    </ejs-combobox>
  `
})
export class AccessibleComponent {
  items = ['Option 1', 'Option 2', 'Option 3'];
}

// ✓ Out of the box: WCAG 2.2 compliant
```

---

## ARIA Attributes

### ComboBox ARIA Roles

**Automatically applied:**

```
Component Element → role="combobox"
List Items → role="option"
List Popup → role="listbox"
```

**ARIA attributes set automatically:**

| Attribute | Value | Purpose |
|-----------|-------|---------|
| `aria-haspopup` | `listbox` | Indicates popup exists |
| `aria-expanded` | `true/false` | Indicates if popup open |
| `aria-selected` | `true/false` | Indicates selected item |
| `aria-owns` | `popup-id` | Links popup to input |
| `aria-activedescendant` | `item-id` | Highlights focused item |
| `aria-disabled` | `true/false` | Disabled state |
| `aria-readonly` | `true/false` | Read-only state |

```typescript
// No manual setup needed - Syncfusion handles all ARIA automatically
@Component({
  template: `
    <ejs-combobox
      [dataSource]="items"
      placeholder="Search items">
      <!-- ARIA attributes added automatically -->
    </ejs-combobox>
  `
})
export class AriaComponent {
  items = ['Item 1', 'Item 2', 'Item 3'];
}

// Generated HTML will have:
// <input aria-haspopup="listbox" aria-expanded="false" role="combobox" />
```

---

### Custom ARIA Labels

**Use when:** Default labels need clarification

```typescript
@Component({
  template: `
    <label id="product-label">Select a Product</label>
    
    <ejs-combobox
      [dataSource]="products"
      [htmlAttributes]="{ 'aria-labelledby': 'product-label' }"
      placeholder="Choose">
    </ejs-combobox>
    
    <div id="product-help">
      Select from available products or type to search.
    </div>
  `
})
export class CustomAriaComponent {
  products = ['Laptop', 'Monitor', 'Keyboard'];
}
```

---

## Keyboard Navigation

### Supported Keyboard Shortcuts

**ComboBox is fully keyboard accessible:**

| Key | Action |
|-----|--------|
| **Arrow Down** | Move to next item |
| **Arrow Up** | Move to previous item |
| **Page Down** | Jump to next page |
| **Page Up** | Jump to previous page |
| **Home** | Jump to first item |
| **End** | Jump to last item |
| **Enter** | Select focused item |
| **Tab** | Move focus out of ComboBox |
| **Shift + Tab** | Move focus to previous element |
| **Alt + Down** | Open dropdown |
| **Alt + Up** | Close dropdown |
| **Esc** | Close dropdown, keep selection |
| **Ctrl + A** | Select all text (when filtering) |
| **Backspace** | Delete character (when filtering) |

---

### Keyboard-Only Navigation Example

```typescript
// User can navigate and select using ONLY keyboard:
// 1. Tab to ComboBox
// 2. Type "Lap" → filters to "Laptop"
// 3. Arrow Down → highlights next item
// 4. Enter → selects highlighted item
// 5. Shift+Tab → moves to previous form field

@Component({
  template: `
    <input placeholder="Name">
    
    <ejs-combobox
      [dataSource]="products"
      [allowFiltering]="true"
      placeholder="Product">
    </ejs-combobox>
    
    <button>Submit</button>
  `
})
export class KeyboardNavComponent {
  products = ['Laptop', 'Monitor', 'Keyboard', 'Mouse'];
}

// All keyboard shortcuts work automatically
```

---

---

## Screen Reader Support

### Default Screen Reader Experience

**For visually impaired users, screen readers announce:**

1. **Label:** "Select a product"
2. **Role:** "combobox"
3. **State:** "collapsed" or "expanded"
4. **Instructions:** "Type to search"
5. **Item count:** "5 items available"
6. **Selected item:** "Laptop selected"
7. **Filtering:** "Results: 2 items"

```typescript
@Component({
  template: `
    <label for="product-combo">Select a Product</label>
    
    <ejs-combobox
      id="product-combo"
      [dataSource]="products"
      [allowFiltering]="true"
      placeholder="Type to search...">
    </ejs-combobox>
  `
})
export class ScreenReaderComponent {
  products = ['Laptop', 'Monitor', 'Keyboard', 'Mouse'];
}

// Screen reader announces:
// "Select a Product, combobox, collapsed, 4 items available,
//  type to search, use arrow keys to navigate"
```

---

### Test with Screen Readers

**NVDA (Free, Windows):**
```bash
# Download: https://www.nvaccess.org/
# Start NVDA, tab to ComboBox, and test navigation
```

**JAWS (Commercial, Windows):**
```bash
# Professional screen reader for Windows
```

**VoiceOver (Free, macOS):**
```bash
# Built-in: Cmd + F5 to enable
```

**TalkBack (Free, Android):**
```bash
# Built-in screen reader for Android devices
```

---

## Focus Management

### Visible Focus Indicators

**Ensure focus is always visible:**

```typescript
@Component({
  template: `
    <ejs-combobox
      [dataSource]="items"
      cssClass="accessible-combo"
      placeholder="Select">
    </ejs-combobox>
  `,
  styles: [`
    :host ::ng-deep .accessible-combo.e-combobox:focus-within {
      outline: 2px solid #007bff;
      outline-offset: 2px;
      border-radius: 4px;
    }
    
    /* Enhanced focus for keyboard users */
    :host ::ng-deep .accessible-combo .e-input:focus {
      box-shadow: 0 0 0 3px rgba(0, 123, 255, 0.25);
    }
  `]
})
export class FocusIndicatorComponent {
  items = ['Item 1', 'Item 2', 'Item 3'];
}
```

---

### Manage Focus Programmatically

```typescript
import { Component, ViewChild } from '@angular/core';
import { ComboBoxComponent } from '@syncfusion/ej2-angular-dropdowns';

@Component({
  template: `
    <button (click)="setFocus()">Focus ComboBox</button>
    
    <ejs-combobox
      #combo
      [dataSource]="items">
    </ejs-combobox>
  `
})
export class ManageFocusComponent {
  @ViewChild('combo') comboBox!: ComboBoxComponent;
  items = ['Item 1', 'Item 2', 'Item 3'];

  setFocus() {
    // Move focus to ComboBox
    this.comboBox.focusIn();
  }
}
```

---

### Focus Trap for Modal

```typescript
@Component({
  template: `
    <div class="modal-dialog">
      <ejs-combobox #firstCombo [dataSource]="items1"></ejs-combobox>
      <!-- other controls -->
      <ejs-combobox #lastCombo [dataSource]="items2"></ejs-combobox>
      
      <button (click)="closeModal()">Close</button>
    </div>
  `
})
export class ModalComponent {
  @ViewChild('firstCombo') firstCombo!: ComboBoxComponent;
  @ViewChild('lastCombo') lastCombo!: ComboBoxComponent;

  items1 = ['A', 'B'];
  items2 = ['X', 'Y'];

  onKeyDown(event: KeyboardEvent) {
    if (event.key === 'Tab') {
      const focusedElement = document.activeElement;
      
      if (event.shiftKey && focusedElement === this.firstCombo.element) {
        // Trap: wrap to last element
        event.preventDefault();
        this.lastCombo.focusIn();
      }
    }
  }

  closeModal() {
    // Return focus to triggering button
    (document.querySelector('[data-toggle="modal"]') as HTMLElement)?.focus();
  }
}
```

---

## Color & Contrast

### Color Contrast Compliance

**ComboBox meets WCAG AA standard (4.5:1 ratio):**

```css
/* Default theme has adequate contrast */
.e-combobox {
  color: #212529;           /* Dark text */
  background-color: #fff;   /* Light background */
  /* Contrast ratio: 9.3:1 → WCAG AAA */
}

.e-combobox:hover {
  border-color: #007bff;    /* 8.5:1 contrast */
}

.e-combobox:focus {
  border-color: #0056b3;    /* Even better contrast */
}
```

---

### Don't Rely on Color Alone

```typescript
@Component({
  template: `
    <!-- ❌ Wrong: Color only -->
    <div [style.background]="isError ? 'red' : 'green'">
      Status
    </div>
    
    <!-- ✓ Correct: Color + icon/text -->
    <div [ngClass]="isError ? 'error' : 'success'">
      <span *ngIf="isError">❌ Error</span>
      <span *ngIf="!isError">✓ Success</span>
    </div>
  `,
  styles: [`
    .error {
      color: #dc3545;        /* Red for color-blind users */
      border: 2px solid;     /* Visual indicator */
    }
    .success {
      color: #28a745;
      border: 2px solid;
    }
  `]
})
export class ContrastComponent {
  isError = false;
}
```

---

## Localization

### Language Support

**Syncfusion ComboBox supports 60+ languages:**

```typescript
import { Component } from '@angular/core';
import { ComboBoxComponent } from '@syncfusion/ej2-angular-dropdowns';

// L10n supports: English, Spanish, German, French, etc.
@Component({
  template: `
    <ejs-combobox
      [dataSource]="items"
      locale="es"
      placeholder="Seleccionar elemento">
    </ejs-combobox>
  `
})
export class LocalizationComponent {
  items = ['Item 1', 'Item 2', 'Item 3'];
}

// Available locales: 'en', 'es', 'fr', 'de', 'ja', 'zh', 'ar', etc.
```

---

### Custom Localization Strings

```typescript
import { Component, OnInit } from '@angular/core';
import { L10n } from '@syncfusion/ej2-base';

@Component({
  template: `
    <ejs-combobox
      [dataSource]="items"
      locale="es"
      placeholder="Seleccionar">
    </ejs-combobox>
  `
})
export class CustomLocaleComponent implements OnInit {
  items = ['Opción 1', 'Opción 2', 'Opción 3'];

  ngOnInit() {
    // Define custom Spanish strings
    L10n.load({
      es: {
        'dropdowns': {
          'noRecordsTemplate': 'No se encontraron resultados',
          'actionFailureTemplate': 'Error al cargar datos',
          'overflowItemsCount': 'Más elementos'
        }
      }
    });
  }
}
```

---

### Multi-Language Support

```typescript
import { Component } from '@angular/core';
import { L10n } from '@syncfusion/ej2-base';

@Component({
  template: `
    <select (change)="changeLanguage($event.target.value)">
      <option value="en">English</option>
      <option value="es">Español</option>
      <option value="fr">Français</option>
      <option value="ar">العربية</option>
    </select>
    
    <ejs-combobox
      [dataSource]="items"
      [locale]="currentLocale"
      [placeholder]="placeholders[currentLocale]">
    </ejs-combobox>
  `
})
export class MultiLanguageComponent {
  currentLocale = 'en';
  items = ['Item 1', 'Item 2', 'Item 3'];

  placeholders: { [key: string]: string } = {
    en: 'Select item',
    es: 'Seleccionar elemento',
    fr: 'Sélectionner un élément',
    ar: 'اختر عنصرا'
  };

  changeLanguage(locale: string) {
    this.currentLocale = locale;
  }
}
```

---

## Right-to-Left (RTL)

### Enable RTL

**Use when:** Supporting Arabic, Hebrew, Persian, Urdu languages

```typescript
@Component({
  template: `
    <ejs-combobox
      [dataSource]="items"
      [enableRtl]="true"
      placeholder="اختر عنصرا">
    </ejs-combobox>
  `
})
export class RTLComponent {
  items = ['عنصر 1', 'عنصر 2', 'عنصر 3'];
}
```

---

### RTL with Localization

```typescript
@Component({
  template: `
    <ejs-combobox
      [dataSource]="items"
      locale="ar"
      [enableRtl]="true"
      placeholder="اختر عنصرا">
    </ejs-combobox>
  `
})
export class RTLLocaleComponent {
  items = [
    { id: 1, ar_name: 'الخيار الأول', en_name: 'Option 1' },
    { id: 2, ar_name: 'الخيار الثاني', en_name: 'Option 2' }
  ];
}
```

---

## Testing Accessibility

### Automated Testing with axe-core

```bash
npm install --save-dev axe-core @axe-core/webdriverjs
```

```typescript
import * as axe from 'axe-core';

describe('ComboBox Accessibility', () => {
  it('should have no accessibility violations', async () => {
    const results = await axe.run();
    expect(results.violations).toHaveLength(0);
  });
});
```

---

### Manual Testing Checklist

```
☐ Keyboard Navigation:
  ☐ Tab to ComboBox
  ☐ Arrow keys navigate items
  ☐ Enter selects item
  ☐ Escape closes dropdown

☐ Screen Reader:
  ☐ Label announced
  ☐ Role announced (combobox)
  ☐ Item count announced
  ☐ Selected item announced

☐ Focus Indicators:
  ☐ Visible focus outline
  ☐ At least 2px visible

☐ Color Contrast:
  ☐ Text: 4.5:1 ratio
  ☐ UI components: 3:1 ratio

☐ Mobile:
  ☐ Touch targets ≥ 44x44px
  ☐ Readable without zoom
```

---

## Common Patterns

### Pattern 1: Required Field with ARIA

```typescript
@Component({
  template: `
    <label for="combo-1">
      Select Product <span aria-label="required">*</span>
    </label>
    
    <ejs-combobox
      id="combo-1"
      [dataSource]="products"
      required
      [htmlAttributes]="{ 'aria-required': 'true' }"
      placeholder="Choose">
    </ejs-combobox>
    
    <div id="combo-error" *ngIf="showError">
      This field is required
    </div>
  `
})
export class RequiredFieldComponent {
  products = ['A', 'B', 'C'];
  showError = false;
}
```

---

### Pattern 2: Grouped Items with Labels

```typescript
@Component({
  template: `
    <fieldset>
      <legend>Programming Languages</legend>
      
      <ejs-combobox
        [dataSource]="languages"
        fields="{ text: 'name', value: 'id', groupBy: 'type' }"
        placeholder="Select language">
      </ejs-combobox>
    </fieldset>
  `
})
export class GroupedAccessibleComponent {
  languages = [
    { id: 1, name: 'JavaScript', type: 'Web' },
    { id: 2, name: 'TypeScript', type: 'Web' },
    { id: 3, name: 'Python', type: 'Backend' },
    { id: 4, name: 'Java', type: 'Backend' }
  ];
}
```

---

### Pattern 3: Accessible Error Messages

```typescript
@Component({
  template: `
    <div [attr.aria-live]="'polite'" [attr.aria-atomic]="'true'">
      <ejs-combobox
        [dataSource]="items"
        [attr.aria-describedby]="showError ? 'error-msg' : null"
        (change)="validate()"
        required>
      </ejs-combobox>
      
      <div *ngIf="showError" id="error-msg" role="alert" style="color: red;">
        Please select an option
      </div>
    </div>
  `
})
export class ErrorMessageComponent {
  items = ['A', 'B', 'C'];
  showError = false;

  validate() {
    // Validation logic
  }
}
```

---

## Troubleshooting

### Issue: Screen reader not announcing items

**Cause:** Missing ARIA attributes or role

**Fix:**
```typescript
// ComboBox has correct roles by default
// Ensure you're not overriding with custom HTML
<ejs-combobox
  [dataSource]="items"
  placeholder="Select">
  <!-- Don't add custom roles here -->
</ejs-combobox>
```

---

### Issue: Focus trap not working in modal

**Cause:** Tab focus not managed at modal level

**Fix:**
```typescript
onKeyDown(event: KeyboardEvent) {
  if (event.key === 'Tab') {
    const focusableElements = this.modal.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];

    if (event.shiftKey && document.activeElement === firstElement) {
      event.preventDefault();
      (lastElement as HTMLElement).focus();
    } else if (!event.shiftKey && document.activeElement === lastElement) {
      event.preventDefault();
      (firstElement as HTMLElement).focus();
    }
  }
}
```

---

### Issue: RTL layout flipped incorrectly

**Cause:** Missing `enableRtl` property on the component

**Fix:**
```typescript
<ejs-combobox
  [dataSource]="items"
  [enableRtl]="true">
</ejs-combobox>
```

---

Your ComboBox is now fully accessible and localized! Review the [SKILL.md](../SKILL.md) for a complete overview of all available features.
