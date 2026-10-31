# Accessibility — Syncfusion EJ2 JavaScript DropdownButton

## Compliance Summary

| Accessibility Criteria | Support |
|------------------------|---------|
| WCAG 2.2 | ✅ Full |
| Section 508 | ✅ Full |
| Screen Reader | ✅ Full |
| Right-To-Left (RTL) | ✅ Full |
| Color Contrast | ✅ Full |
| Mobile Device | ✅ Full |
| Keyboard Navigation | ✅ Full |
| accessibility-checker validation | ✅ Full |
| axe-core validation | ✅ Full |

---

## WAI-ARIA Attributes

The DropdownButton component automatically manages the following ARIA attributes:

| Attribute | Purpose | Example |
|-----------|---------|---------|
| `role="button"` | Identifies the trigger element as a button | `role="button"` |
| `role="menu"` | Identifies the popup container | `role="menu"` |
| `role="menuitem"` | Identifies each popup item | `role="menuitem"` |
| `aria-haspopup` | Indicates the button controls a popup menu | `aria-haspopup="menu"` |
| `aria-expanded` | Reflects whether popup is open (`true`) or closed (`false`) | `aria-expanded="false"` |
| `aria-owns` | Links the button to its popup in accessibility tree | `aria-owns="popup-id"` |
| `aria-disabled` | Marks button as disabled | `aria-disabled="true"` |
| `aria-label` | Provides accessible name for icon-only buttons | `aria-label="Menu"` |

No manual ARIA wiring is required — the component handles these automatically.

---

## Keyboard Interaction

| Key | Action |
|-----|--------|
| `Enter` / `Space` | Opens the popup (or activates highlighted item and closes) |
| `Down Arrow` | Moves focus to next popup item |
| `Up Arrow` | Moves focus to previous popup item |
| `Alt + Down Arrow` | Opens the popup |
| `Alt + Up Arrow` | Closes the popup |
| `Escape` | Closes the popup |
| `Home` | Moves focus to first item |
| `End` | Moves focus to last item |
| `Tab` | Moves focus out of the popup |

### Example: Full Keyboard Navigation

```typescript
import { DropdownButton, ItemModel } from '@syncfusion/ej2-splitbuttons';
import { enableRipple } from '@syncfusion/ej2-base';

enableRipple(true);

const items: ItemModel[] = [
  { text: 'Edit', id: 'edit' },
  { text: 'Copy', id: 'copy' },
  { text: 'Delete', id: 'delete' },
];

const dropdown = new DropdownButton({
  items: items,
  content: 'Actions'
});
dropdown.appendTo('#dropdownbutton');

// All keyboard navigation works automatically!
// Users can Tab to button → Space/Enter to open → Arrow keys to navigate → Enter to select
```

---

## Screen Reader Support

### Automatic Announcements

The component automatically announces:
- Button purpose and state (open/closed)
- Popup items and their properties
- Selection feedback
- Disabled states

### Testing with Screen Readers

- **NVDA** (Windows): Free, open-source
- **JAWS** (Windows): Commercial
- **VoiceOver** (macOS/iOS): Built-in
- **TalkBack** (Android): Built-in

### Example: Adding Descriptive Labels

```typescript
import { DropdownButton, ItemModel } from '@syncfusion/ej2-splitbuttons';
import { enableRipple } from '@syncfusion/ej2-base';

enableRipple(true);

const items: ItemModel[] = [
  { text: 'Save Document', id: 'save' },
  { text: 'Export as PDF', id: 'export-pdf' },
  { separator: true },
  { text: 'Delete Document', id: 'delete' },
];

const dropdown = new DropdownButton({
  items: items,
  iconCss: 'e-icons e-file',
  content: 'File'
});
dropdown.appendTo('#dropdownbutton');

// Add descriptive aria-label to container
const element = dropdown.element;
element.setAttribute('aria-label', 'File menu with save, export, and delete options');
```

---

## Color Contrast

All theme colors meet WCAG AA standards for color contrast:

| Theme | Contrast Ratio |
|-------|---|
| Material 3 | ✅ > 4.5:1 |
| Bootstrap 5 | ✅ > 4.5:1 |
| Fluent 2 | ✅ > 4.5:1 |
| Fabric | ✅ > 4.5:1 |
| Tailwind 3 | ✅ > 4.5:1 |

---

## Right-to-Left (RTL) Support

Enable RTL layout for Arabic, Hebrew, Urdu, and other RTL languages:

```typescript
import { DropdownButton, ItemModel } from '@syncfusion/ej2-splitbuttons';
import { enableRipple } from '@syncfusion/ej2-base';

enableRipple(true);

const items: ItemModel[] = [
  { text: 'حفظ', id: 'save' },           // Save
  { text: 'نسخ', id: 'copy' },           // Copy
  { text: 'حذف', id: 'delete' },         // Delete
];

const dropdown = new DropdownButton({
  items: items,
  iconCss: 'e-icons e-file',
  enableRtl: true,
  content: 'قائمة الملف'                  // File Menu
});
dropdown.appendTo('#dropdownbutton');
```

**HTML:**
```html
<div id="dropdownbutton" dir="rtl"></div>
```

---

## Disabled State

A disabled button is excluded from tab order and not interactive:

```typescript
import { DropdownButton, ItemModel } from '@syncfusion/ej2-splitbuttons';
import { enableRipple } from '@syncfusion/ej2-base';

enableRipple(true);

// Disabled button
const disabledDropdown = new DropdownButton({
  items: items,
  disabled: true,
  content: 'Unavailable'
});
disabledDropdown.appendTo('#disabled-dropdown');

// Programmatically enable/disable
function toggleDisabled(): void {
  disabledDropdown.disabled = !disabledDropdown.disabled;
}
```

The `aria-disabled="true"` attribute is set automatically.

---

## Icon-Only Button Accessibility

For icon-only buttons, add an `aria-label` to describe the purpose:

```typescript
import { DropdownButton, ItemModel } from '@syncfusion/ej2-splitbuttons';
import { enableRipple } from '@syncfusion/ej2-base';

enableRipple(true);

const items: ItemModel[] = [
  { text: 'New', iconCss: 'e-icons e-new' },
  { text: 'Open', iconCss: 'e-icons e-open' },
  { text: 'Save', iconCss: 'e-icons e-save' },
];

const dropdown = new DropdownButton({
  items: items,
  iconCss: 'e-icons e-menu',
  cssClass: 'e-caret-hide'  // Hide dropdown arrow
});
dropdown.appendTo('#dropdownbutton');

// Add aria-label for screen readers
dropdown.element.setAttribute('aria-label', 'File menu: New, Open, Save');
```

---

## Mobile Accessibility

The component is fully accessible on mobile devices:
- Touch targets are >= 44×44 pixels
- Tap to open popup
- Touch item to select
- Swipe gestures supported
- Screen reader support on iOS (VoiceOver) and Android (TalkBack)

### Example: Mobile-Friendly Setup

```typescript
import { DropdownButton, ItemModel } from '@syncfusion/ej2-splitbuttons';
import { enableRipple } from '@syncfusion/ej2-base';

enableRipple(true);

const items: ItemModel[] = [
  { text: 'Action 1', iconCss: 'e-icons e-one' },
  { text: 'Action 2', iconCss: 'e-icons e-two' },
  { text: 'Action 3', iconCss: 'e-icons e-three' },
];

const dropdown = new DropdownButton({
  items: items,
  cssClass: 'e-large',    // Larger touch targets
  iconCss: 'e-icons e-menu',
  content: 'Menu'
});
dropdown.appendTo('#dropdownbutton');
```

---

## Best Practices

1. **Use Semantic Text**: Avoid generic text like "Click Here" or "Item 1". Use descriptive labels.
   ```typescript
   // ❌ Bad
   { text: 'Item 1' }
   
   // ✅ Good
   { text: 'Export as PDF' }
   ```

2. **Group Related Items**: Use separators to group related actions.
   ```typescript
   const items: ItemModel[] = [
     { text: 'New Document' },
     { text: 'Open Document' },
     { separator: true },
     { text: 'Close Document' },
   ];
   ```

3. **Icon + Text Combination**: Pair icons with descriptive text when possible.
   ```typescript
   { text: 'Save', iconCss: 'e-icons e-save' }
   ```

4. **Add aria-label for Icon-Only Buttons**:
   ```typescript
   dropdown.element.setAttribute('aria-label', 'Open main menu');
   ```

5. **Test with Assistive Technologies**: Use real screen readers and keyboard-only navigation.
   - NVDA, JAWS, VoiceOver
   - Keyboard-only: Tab, Enter, Space, Arrows
   - axe DevTools, accessibility-checker

6. **Handle Disabled States**: Make disabled items visually and semantically clear.
   ```typescript
   const items: ItemModel[] = [
     { text: 'Save', disabled: false },
     { text: 'Archive', disabled: true },  // Disabled item
   ];
   ```

---

## Compliance Validation Tools

- **axe-core**: https://www.npmjs.com/package/axe-core
- **accessibility-checker**: https://www.npmjs.com/package/accessibility-checker
- **WAVE**: https://wave.webaim.org/
- **Lighthouse**: Built into Chrome DevTools

### Running axe-core

```typescript
// Install: npm install --save-dev axe-core
import * as axe from 'axe-core';

axe.run((results: any) => {
  console.log(results.violations);
});
```

---

## Related Resources

- [WCAG 2.2 Guidelines](https://www.w3.org/WAI/WCAG22/quickref/)
- [Section 508 Standards](https://www.section508.gov/)
- [WAI-ARIA Authoring Practices](https://www.w3.org/WAI/ARIA/apg/)
- [Syncfusion Accessibility Documentation](https://ej2.syncfusion.com/documentation/common/accessibility/)
