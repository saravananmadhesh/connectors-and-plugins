# Localization and Accessibility in Dropdown Tree

## Table of Contents
- [Localization Overview](#localization-overview)
- [Key Messages](#key-messages)
- [Setting Locale](#setting-locale)
- [Creating Custom Locales](#creating-custom-locales)
- [Accessibility Features](#accessibility-features)
- [Keyboard Navigation](#keyboard-navigation)
- [WCAG Compliance](#wcag-compliance)
- [Best Practices](#best-practices)

---

## Localization Overview

The Dropdown Tree control supports localization through the Localization library, allowing you to display text in different languages. By default, the control uses English (en) locale.

**Default Localized Strings:**

| Key | Default Text | Purpose |
|-----|--------------|---------|
| `noRecordsTemplate` | "No records found" | Message when data source is empty |
| `actionFailureTemplate` | "Request failed" | Message when data fetch fails |
| `overflowCountTemplate` | "+${count} more.." | Text when items exceed display space |
| `totalCountTemplate` | "${count} selected" | Text showing total selected items |

---

## Key Messages

### Default Locale (English)

These are the default English text values used throughout the Dropdown Tree:

```typescript
{
    noRecordsTemplate: 'No records found',
    actionFailureTemplate: 'Request failed',
    overflowCountTemplate: '+${count} more..',
    totalCountTemplate: '${count} selected'
}
```

### Using Default Locale

By default, no configuration is needed:

```typescript
import { DropDownTree } from '@syncfusion/ej2-dropdowns';

let dropDownTree = new DropDownTree({
    fields: { dataSource: [], text: 'name', value: 'id' },
    placeholder: 'Select an item'
    // Locale defaults to 'en' automatically
});

dropDownTree.appendTo('#ddtElement');
// "No records found" displays (English)
```

---

## Setting Locale

### Change Application Locale

Set the locale for the entire application using the `L10n` module:

```typescript
import { L10n } from '@syncfusion/ej2-base';
import { DropDownTree } from '@syncfusion/ej2-dropdowns';

// Set locale to Spanish
L10n.setLocale('es');

let dropDownTree = new DropDownTree({
    fields: { dataSource: data, text: 'name', value: 'id' },
    placeholder: 'Selecciona un elemento'
});

dropDownTree.appendTo('#ddtElement');
// Spanish locale is now used for all Syncfusion controls
```

### Supported Locales

Common locale codes:
- `en` - English (default)
- `de` - German
- `es` - Spanish
- `fr` - French
- `it` - Italian
- `ja` - Japanese
- `ko` - Korean
- `pt` - Portuguese
- `ru` - Russian
- `zh` - Chinese

### Component-Level Locale

Set locale for only the Dropdown Tree control:

```typescript
import { DropDownTree } from '@syncfusion/ej2-dropdowns';

let dropDownTree = new DropDownTree({
    fields: { dataSource: data, text: 'name', value: 'id' },
    locale: 'es'  // Spanish for this control only
});

dropDownTree.appendTo('#ddtElement');
```

---

## Creating Custom Locales

### Define Custom Locale

Create custom translations for specific languages:

```typescript
import { L10n } from '@syncfusion/ej2-base';
import { DropDownTree } from '@syncfusion/ej2-dropdowns';

// Define custom locale for French
L10n.load({
    'fr': {
        'dropdowns': {
            noRecordsTemplate: 'Aucun enregistrement trouvé',
            actionFailureTemplate: 'Échec de la demande',
            overflowCountTemplate: '+${count} plus..',
            totalCountTemplate: '${count} sélectionné(s)'
        }
    }
});

// Set application locale to French
L10n.setLocale('fr');

let dropDownTree = new DropDownTree({
    fields: { dataSource: data, text: 'name', value: 'id' }
});

dropDownTree.appendTo('#ddtElement');
// French text will now display
```

### Custom Locale for German

```typescript
import { L10n } from '@syncfusion/ej2-base';

L10n.load({
    'de': {
        'dropdowns': {
            noRecordsTemplate: 'Keine Datensätze gefunden',
            actionFailureTemplate: 'Anfrage fehlgeschlagen',
            overflowCountTemplate: '+${count} weitere..',
            totalCountTemplate: '${count} ausgewählt'
        }
    }
});

L10n.setLocale('de');
```

### Custom Locale for Japanese

```typescript
import { L10n } from '@syncfusion/ej2-base';

L10n.load({
    'ja': {
        'dropdowns': {
            noRecordsTemplate: 'レコードが見つかりません',
            actionFailureTemplate: 'リクエストが失敗しました',
            overflowCountTemplate: '+${count} 件以上...',
            totalCountTemplate: '${count} 件選択済み'
        }
    }
});

L10n.setLocale('ja');
```

### Custom Locale for Arabic (RTL)

```typescript
import { L10n } from '@syncfusion/ej2-base';

L10n.load({
    'ar': {
        'dropdowns': {
            noRecordsTemplate: 'لم يتم العثور على سجلات',
            actionFailureTemplate: 'فشل الطلب',
            overflowCountTemplate: '+${count} المزيد..',
            totalCountTemplate: '${count} محدد'
        }
    }
});

L10n.setLocale('ar');
```

### Override Specific Text

Customize individual text strings without changing the locale:

```typescript
import { DropDownTree } from '@syncfusion/ej2-dropdowns';

let dropDownTree = new DropDownTree({
    fields: { dataSource: data, text: 'name', value: 'id' },
    
    // Custom text overrides locale defaults
    noRecordsTemplate: 'Sorry, no items found!',
    actionFailureTemplate: 'Oops! Failed to load data.'
});

dropDownTree.appendTo('#ddtElement');
```

---

## Accessibility Features

### Overview

The Dropdown Tree control includes built-in accessibility features:

- **Keyboard Navigation**: Full keyboard support for menu interaction
- **ARIA Attributes**: Proper semantic markup for screen readers
- **Screen Reader Support**: Compatible with JAWS, NVDA, and other assistive technology
- **Focus Management**: Clear focus indicators and logical tab order
- **Color Independence**: Features not dependent on color alone

### Enabled by Default

```typescript
import { DropDownTree } from '@syncfusion/ej2-dropdowns';

let dropDownTree = new DropDownTree({
    fields: { dataSource: data, text: 'name', value: 'id' },
    placeholder: 'Select an option',
    // Accessibility automatically enabled - no configuration needed
});

dropDownTree.appendTo('#ddtElement');
// Built-in ARIA attributes and keyboard support are active
```

---

## Keyboard Navigation

### Common Keyboard Shortcuts

| Key | Action |
|-----|--------|
| **Alt + Down Arrow** | Open the dropdown popup |
| **Alt + Up Arrow** | Close the dropdown popup |
| **Down Arrow** | Move focus to next item |
| **Up Arrow** | Move focus to previous item |
| **Home** | Move focus to first item |
| **End** | Move focus to last item |
| **Space** | Toggle checkbox (if enabled) |
| **Enter** | Select the focused item |
| **Escape** | Close the popup |
| **Tab** | Move to next control |
| **Shift + Tab** | Move to previous control |

### Keyboard Navigation Example

```typescript
import { DropDownTree } from '@syncfusion/ej2-dropdowns';

let dropDownTree = new DropDownTree({
    fields: { dataSource: data, text: 'name', value: 'id' },
    showCheckBox: true,
    placeholder: 'Use keyboard to navigate'
});

dropDownTree.appendTo('#ddtElement');

// User interaction:
// 1. Press Alt+Down to open
// 2. Use Up/Down arrows to navigate items
// 3. Press Space to toggle checkbox
// 4. Press Enter to select
// 5. Press Escape to close
```

### Custom Keyboard Handling

Listen to keyboard events if you need custom behavior:

```typescript
let dropDownTree = new DropDownTree({
    fields: { dataSource: data, text: 'name', value: 'id' },
    keyDown: function(args) {
        if (args.keyCode === 13) {  // Enter key
            console.log('Enter pressed');
        }
    }
});

dropDownTree.appendTo('#ddtElement');
```

---

## WCAG Compliance

The Dropdown Tree control adheres to WCAG 2.1 Level AA standards:

### Perceived - Keyboard and Vision

- **Contrast**: Text and UI elements have sufficient color contrast (4.5:1 for text)
- **Resizable Text**: Works with zoom and text resizing
- **Keyboard Access**: All functionality available via keyboard

### Operable - Keyboard and Navigation

- **Keyboard Navigation**: All features accessible with keyboard
- **User Control**: No auto-playing content or keyboard traps
- **Focus Visible**: Clear visual focus indicator
- **Tab Order**: Logical tab order for navigation

### Understandable - Labels and Language

- **Labels**: Input has associated label or placeholder
- **Instructions**: User guidance for using controls
- **Predictable**: Consistent behavior and navigation

### Robust - Code Quality

- **ARIA Compliance**: Proper ARIA attributes and roles
- **HTML Validity**: Valid markup structure
- **Assistive Tech**: Compatible with screen readers and adaptive technology

### Testing for Compliance

Example accessibility checklist:

```typescript
// 1. Verify keyboard navigation works
// 2. Test with screen reader (NVDA, JAWS)
// 3. Check focus indicators are visible
// 4. Verify color contrast meets WCAG standards
// 5. Test with Windows High Contrast mode
// 6. Validate with browser accessibility inspector

let dropDownTree = new DropDownTree({
    fields: { dataSource: data, text: 'name', value: 'id' },
    
    // Accessibility properties
    ariaLabel: 'Select a category',  // Label for screen readers
    placeholder: 'Choose option',     // Visible hint
    
    // Ensure sufficient size for touch targets (44x44px minimum)
    height: '44px'
});

dropDownTree.appendTo('#ddtElement');
```

---

## Screen Reader Compatibility

### Announced Content

Screen readers announce:

1. **Control Label**: "Select dropdown tree input"
2. **State**: "Popup opened/closed"
3. **Item Text**: Name of focused item
4. **Hierarchy**: Item level/parent information
5. **Selection**: Checkbox state if enabled

### Testing with Screen Readers

**NVDA (Windows):**
1. Download NVDA from nvaccess.org
2. Start NVDA in test mode
3. Tab to Dropdown Tree
4. Use keyboard to navigate
5. Listen to announcements

**JAWS (Windows):**
1. Open web page with Dropdown Tree
2. Press Tab to focus element
3. Arrow keys to navigate
4. JAWS announces item text and state

**VoiceOver (Mac/iOS):**
1. Enable VoiceOver: Cmd+F5
2. Use VO+Arrow keys to navigate
3. Read content and state announcements

---

## Best Practices

### For Developers

1. **Always provide a label** for the Dropdown Tree:
```html
<label for="ddtElement">Select Category:</label>
<input type="text" id="ddtElement" />
```

2. **Use meaningful placeholder text**:
```typescript
placeholder: 'Choose an option'  // Clear instruction
// Not: placeholder: 'Select...'  // Vague
```

3. **Test with keyboard only** - Don't rely on mouse

4. **Use semantic HTML** structures

5. **Ensure color contrast** - Use CSS contrast checker tools

### For Testing

1. **Keyboard Testing**:
   - Open Dropdown Tree
   - Navigate without mouse
   - Verify all features work

2. **Screen Reader Testing**:
   - Use NVDA or JAWS
   - Verify announcements make sense
   - Check hierarchy is clear

3. **Visual Testing**:
   - Zoom to 200%
   - Test with High Contrast mode
   - Check focus indicators are visible

4. **Automated Testing**:
   - Use axe DevTools
   - Run accessibility scanner
   - Check ARIA validity

### For Users

1. **Enable accessibility features** in their device
2. **Use keyboard navigation** - Alt+Down to open
3. **Enable screen reader** for better experience
4. **Increase text size** if needed (supports zoom)

---

## Localization + Accessibility Example

Complete example with both localization and accessibility:

```typescript
import { L10n } from '@syncfusion/ej2-base';
import { DropDownTree } from '@syncfusion/ej2-dropdowns';

// Define Spanish locale
L10n.load({
    'es': {
        'dropdowns': {
            noRecordsTemplate: 'No se encontraron registros',
            actionFailureTemplate: 'Solicitud fallida'
        }
    }
});

L10n.setLocale('es');

// Create Dropdown Tree with localization and accessibility
let dropDownTree = new DropDownTree({
    fields: {
        dataSource: categoriesData,
        text: 'name',
        value: 'id',
        parentValue: 'parentId'
    },
    
    // Localization
    locale: 'es',
    
    // Accessibility
    ariaLabel: 'Selector de categoría',
    placeholder: 'Elige una categoría',
    
    // Features
    showCheckBox: true,
    height: '44px'
});

dropDownTree.appendTo('#ddtElement');
```

**Result:** 
- English interface in Spanish
- Fully keyboard navigable
- Screen reader compatible
- Touch-friendly (44px height)
- WCAG compliant

---

## Additional Resources

- **WCAG 2.1 Guidelines**: https://www.w3.org/WAI/WCAG21/quickref/
- **ARIA Authoring Practices**: https://www.w3.org/WAI/ARIA/apg/
- **WebAIM Resources**: https://webaim.org/
- **Syncfusion Accessibility**: https://www.syncfusion.com/accessibility
