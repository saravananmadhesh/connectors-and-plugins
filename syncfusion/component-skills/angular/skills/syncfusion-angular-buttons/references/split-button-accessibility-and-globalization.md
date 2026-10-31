# Accessibility & Globalization

## Table of Contents
- [WCAG 2.2 Compliance](#wcag-22-compliance)
- [ARIA Attributes & Roles](#aria-attributes--roles)
- [Keyboard Navigation](#keyboard-navigation)
- [Screen Reader Support](#screen-reader-support)
- [RTL Support](#rtl-support)
- [Localization](#localization)
- [Language-Specific Formatting](#language-specific-formatting)
- [Accessibility Testing](#accessibility-testing)

## WCAG 2.2 Compliance

The SplitButton component meets WCAG 2.2 Level AA standards:

### Perceivable

```html
<!-- Good: Clear labels and visual indicators -->
<ejs-splitbutton 
  content="Save"
  iconCss="e-icons e-save"
  title="Save document (Ctrl+S)"
  [items]="items">
</ejs-splitbutton>
```

**Criteria Met:**
- Adequate color contrast (4.5:1 for text)
- Icons accompanied by text labels
- Hover/focus states visually distinct
- Error messages clearly displayed

### Operable

```typescript
export class AppComponent {
  public items: ItemModel[] = [
    { text: 'Save' },
    { text: 'Save As' },
    { text: 'Export' }
  ];
}
```

**Criteria Met:**
- Keyboard accessible (Tab, Enter, Arrow keys)
- Touch target size minimum 44x44 pixels
- No keyboard trap (can tab away)
- Sufficient time to interact

### Understandable

```html
<!-- Clear, descriptive labels -->
<ejs-splitbutton 
  content="Actions"
  title="Document Actions Menu"
  [items]="items">
</ejs-splitbutton>

<!-- Visible focus indicators -->
<style>
  :host ::ng-deep .e-split-button:focus {
    outline: 2px solid #0066cc;
    outline-offset: 2px;
  }
</style>
```

**Criteria Met:**
- Clear, consistent labels
- Predictable navigation
- Visible focus indicators
- Consistent component behavior

### Robust

```typescript
// Semantic HTML and proper event handling
export class AppComponent {
  onItemSelect(args: any): void {
    // Properly announces changes to assistive technology
    console.log('Item selected:', args.item.text);
  }
}
```

**Criteria Met:**
- Semantic HTML structure
- Proper ARIA implementation
- Works with screen readers
- Valid markup

## ARIA Attributes & Roles

### Button Role

```html
<!-- Implicit button role -->
<ejs-splitbutton 
  content="Menu"
  [items]="items"
  aria-label="Open menu"
  aria-describedby="menu-description">
</ejs-splitbutton>

<div id="menu-description">Menu with save options</div>
```

### HasPopup Attribute

```html
<!-- Indicates button has popup menu -->
<ejs-splitbutton 
  content="Actions"
  [items]="items"
  aria-haspopup="menu"
  aria-expanded="false">
</ejs-splitbutton>
```

**Note:** `aria-expanded` changes automatically based on popup state.

### Label Attributes

```html
<!-- Use aria-label for icon-only buttons -->
<ejs-splitbutton 
  content=""
  iconCss="e-icons e-menu"
  [items]="items"
  aria-label="Document menu"
  title="Open document menu">
</ejs-splitbutton>

<!-- Use aria-labelledby for complex labels -->
<span id="button-label">Choose Document Action</span>
<ejs-splitbutton 
  content="Actions"
  [items]="items"
  aria-labelledby="button-label">
</ejs-splitbutton>
```

### Complete ARIA Implementation

```typescript
export class AccessibleSplitButtonComponent {
  @ViewChild('splitBtn') splitButtonRef!: SplitButtonComponent;
  
  public items: ItemModel[] = [
    { text: 'Save Document' },
    { text: 'Save As' },
    { text: 'Export PDF' }
  ];
  
  isMenuOpen: boolean = false;
  
  onOpen(): void {
    this.isMenuOpen = true;
  }
  
  onClose(): void {
    this.isMenuOpen = false;
  }
  
  onItemSelect(args: any): void {
    console.log(`${args.item.text} selected`);
  }
}
```

```html
<ejs-splitbutton 
  #splitBtn
  content="Document"
  [items]="items"
  aria-haspopup="menu"
  [attr.aria-expanded]="isMenuOpen"
  aria-label="Document actions menu"
  (open)="onOpen()"
  (close)="onClose()"
  (select)="onItemSelect($event)">
</ejs-splitbutton>
```

## Keyboard Navigation

### Standard Keyboard Keys

| Key | Action |
|-----|--------|
| `Tab` | Move to next focusable element |
| `Shift+Tab` | Move to previous focusable element |
| `Enter` | Activate button, select focused item |
| `Space` | Activate button (if focused) |
| `ArrowDown` | Open menu, move to next item |
| `ArrowUp` | Open menu, move to previous item |
| `Escape` | Close menu |

### Keyboard Handler Example

```typescript
export class KeyboardAccessibleComponent {
  @ViewChild('splitBtn') splitButtonRef!: SplitButtonComponent;
  
  public items: ItemModel[] = [
    { id: '1', text: 'Save' },
    { id: '2', text: 'Export' },
    { id: '3', text: 'Print' }
  ];
  
  onKeyDown(event: KeyboardEvent): void {
    switch (event.key) {
      case 'Enter':
      case ' ':
        event.preventDefault();
        this.splitButtonRef.toggle();
        break;
      case 'Escape':
        event.preventDefault();
        this.splitButtonRef.toggle();  // toggle() closes if open
        break;
      case 'ArrowDown':
        event.preventDefault();
        this.splitButtonRef.toggle();  // toggle() opens if closed
        break;
    }
  }
}
```

```html
<ejs-splitbutton 
  #splitBtn
  content="Menu"
  [items]="items"
  (keydown)="onKeyDown($event)">
</ejs-splitbutton>
```

### Navigation with Custom Shortcuts

```typescript
export class CustomShortcutsComponent {
  @HostListener('window:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent): void {
    // Ctrl+Alt+S = Save
    if (event.ctrlKey && event.altKey && event.key === 's') {
      event.preventDefault();
      this.save();
    }
    
    // Ctrl+Alt+E = Export
    if (event.ctrlKey && event.altKey && event.key === 'e') {
      event.preventDefault();
      this.export();
    }
  }
  
  private save(): void {
    console.log('Save action');
  }
  
  private export(): void {
    console.log('Export action');
  }
}
```

## Screen Reader Support

### Announcing State Changes

```typescript
export class ScreenReaderSupportComponent {
  @ViewChild('splitBtn') splitButtonRef!: SplitButtonComponent;
  @ViewChild('liveRegion') liveRegion!: ElementRef;
  
  public items: ItemModel[] = [
    { text: 'Save' },
    { text: 'Export' }
  ];
  
  onOpen(): void {
    this.announceToScreenReader('Menu opened with 2 options');
  }
  
  onClose(): void {
    this.announceToScreenReader('Menu closed');
  }
  
  onItemSelect(args: any): void {
    this.announceToScreenReader(`${args.item.text} selected`);
  }
  
  private announceToScreenReader(message: string): void {
    if (this.liveRegion) {
      this.liveRegion.nativeElement.textContent = message;
    }
  }
}
```

```html
<!-- Live region for screen reader announcements -->
<div aria-live="polite" aria-atomic="true" class="sr-only" #liveRegion></div>

<ejs-splitbutton 
  #splitBtn
  content="Actions"
  [items]="items"
  (open)="onOpen()"
  (close)="onClose()"
  (select)="onItemSelect($event)">
</ejs-splitbutton>
```

```css
/* Screen reader only content */
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}
```

### Testing with Screen Readers

- **NVDA (Free)**: Windows
- **JAWS**: Commercial, Windows
- **VoiceOver**: macOS/iOS built-in
- **TalkBack**: Android built-in

Test keyboard navigation:
- Press `Tab` to focus button
- Press `Enter` or `Space` to open menu
- Press `ArrowDown` to navigate items
- Press `Enter` to select item
- Screen reader should announce all interactions

## RTL Support

### Enable RTL Layout

```typescript
export class RTLSplitButtonComponent {
  @ViewChild('splitBtn') splitButtonRef!: SplitButtonComponent;
  
  enableRtl: boolean = false;
  
  public items: ItemModel[] = [
    { text: 'حفظ', iconCss: 'e-icons e-save' },           // Save (Arabic)
    { text: 'تصدير', iconCss: 'e-icons e-export' },      // Export (Arabic)
    { text: 'طباعة', iconCss: 'e-icons e-print' }        // Print (Arabic)
  ];
  
  toggleRTL(): void {
    this.enableRtl = !this.enableRtl;
  }
}
```

```html
<ejs-splitbutton 
  #splitBtn
  content="الإجراءات"
  [items]="items"
  [enableRtl]="enableRtl"
  locale="ar-SA">
</ejs-splitbutton>

<button (click)="toggleRTL()">Toggle RTL/LTR</button>
```

### RTL CSS

```css
/* Automatically applied when enableRtl is true */
:host ::ng-deep [dir="rtl"] .e-split-button {
  direction: rtl;
  text-align: right;
}

:host ::ng-deep [dir="rtl"] .e-split-button .e-icon {
  margin-left: 8px;
  margin-right: 0;
}

:host ::ng-deep [dir="rtl"] .e-dropdown-popup .e-list-item {
  text-align: right;
}
```

## Localization

### Language Setup

```typescript
import { L10n } from '@syncfusion/ej2-base';

// Define localization strings
L10n.load({
  'ar-SA': {
    'splitbutton': {
      'actionButtonTitle': 'اضغط للقائمة'
    }
  },
  'fr-FR': {
    'splitbutton': {
      'actionButtonTitle': 'Appuyez pour le menu'
    }
  },
  'es-ES': {
    'splitbutton': {
      'actionButtonTitle': 'Presione para el menú'
    }
  }
});

@Component({
  selector: 'app-localized-splitbutton',
  template: `
    <ejs-splitbutton 
      content="Actions"
      [items]="items"
      [locale]="currentLocale">
    </ejs-splitbutton>
  `
})
export class LocalizedSplitButtonComponent {
  currentLocale: string = 'en-US';
  
  public items: ItemModel[] = [
    { text: 'Save' },
    { text: 'Export' },
    { text: 'Print' }
  ];
  
  changeLocale(locale: string): void {
    this.currentLocale = locale;
  }
}
```

### Localized Item Content

```typescript
export class LocalizedItemsComponent {
  currentLanguage: string = 'en';
  
  get items(): ItemModel[] {
    return this.getItemsByLanguage(this.currentLanguage);
  }
  
  private getItemsByLanguage(language: string): ItemModel[] {
    const translations: {[key: string]: ItemModel[]} = {
      'en': [
        { text: 'Save', iconCss: 'e-icons e-save' },
        { text: 'Export', iconCss: 'e-icons e-export' }
      ],
      'es': [
        { text: 'Guardar', iconCss: 'e-icons e-save' },
        { text: 'Exportar', iconCss: 'e-icons e-export' }
      ],
      'fr': [
        { text: 'Enregistrer', iconCss: 'e-icons e-save' },
        { text: 'Exporter', iconCss: 'e-icons e-export' }
      ],
      'ar': [
        { text: 'حفظ', iconCss: 'e-icons e-save' },
        { text: 'تصدير', iconCss: 'e-icons e-export' }
      ]
    };
    
    return translations[language] || translations['en'];
  }
  
  changeLanguage(language: string): void {
    this.currentLanguage = language;
  }
}
```

```html
<div style="margin-bottom: 20px;">
  <button (click)="changeLanguage('en')">English</button>
  <button (click)="changeLanguage('es')">Español</button>
  <button (click)="changeLanguage('fr')">Français</button>
  <button (click)="changeLanguage('ar')">العربية</button>
</div>

<ejs-splitbutton 
  content="Actions"
  [items]="items">
</ejs-splitbutton>
```

## Language-Specific Formatting

### Number and Currency Formatting

```typescript
export class LocaleFormattingComponent {
  @ViewChild('splitBtn') splitButtonRef!: SplitButtonComponent;
  
  currentLocale: string = 'en-US';
  
  public items: ItemModel[] = [
    { text: 'Price: 1000' },
    { text: 'Quantity: 5' },
    { text: 'Total: 5000' }
  ];
  
  updateForLocale(locale: string): void {
    this.currentLocale = locale;
    
    // Format items based on locale
    if (locale === 'en-US') {
      this.items[0].text = `Price: $1,000.00`;
    } else if (locale === 'de-DE') {
      this.items[0].text = `Preis: 1.000,00 €`;
    } else if (locale === 'fr-FR') {
      this.items[0].text = `Prix: 1 000,00 €`;
    }
  }
}
```

### Date and Time Formatting

```typescript
export class DateTimeFormattingComponent {
  currentLocale: string = 'en-US';
  
  get items(): ItemModel[] {
    const now = new Date();
    const formatter = new Intl.DateTimeFormat(this.currentLocale, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
    
    const formattedDate = formatter.format(now);
    
    return [
      { text: `Current: ${formattedDate}` },
      { text: 'Schedule' },
      { text: 'Reschedule' }
    ];
  }
  
  changeLocale(locale: string): void {
    this.currentLocale = locale;
  }
}
```

## Accessibility Testing

### Automated Testing

```typescript
// Using jest-axe for accessibility testing
import { axe } from 'jest-axe';

describe('SplitButton Accessibility', () => {
  it('should have no accessibility violations', async () => {
    const { container } = render(
      '<ejs-splitbutton content="Test" [items]="items"></ejs-splitbutton>'
    );
    
    const results = await axe(container);
    expect(results).toHaveNoViolations();
  });
});
```

### Manual Testing Checklist

- [ ] Keyboard navigation works (Tab, Enter, Escape, Arrow keys)
- [ ] Focus indicator visible at all times
- [ ] All text has sufficient color contrast (4.5:1)
- [ ] Screen reader announces button purpose
- [ ] All items are accessible via keyboard
- [ ] RTL layout works correctly for RTL languages
- [ ] Tooltips/titles are present and descriptive
- [ ] No keyboard traps exist
- [ ] Touch targets are at least 44x44 pixels
- [ ] Error messages are clear and associated with controls

Your accessibility implementation is complete! Explore [reactive-forms-integration.md](reactive-forms-integration.md) for forms integration.
