# Accessibility & Standards

## Table of Contents
- [Compliance Standards](#compliance-standards)
- [ARIA Attributes](#aria-attributes)
- [Keyboard Navigation](#keyboard-navigation)
- [Screen Reader Support](#screen-reader-support)
- [Focus Management](#focus-management)
- [Color & Contrast](#color--contrast)
- [Testing Accessibility](#testing-accessibility)
- [Common Issues](#common-issues)

## Compliance Standards

### WCAG 2.2 Level AA Compliance

MultiSelect component meets WCAG 2.2 Level AA standards:

```typescript
import { MultiSelect } from '@syncfusion/ej2-dropdowns';

const multiSelect = new MultiSelect({
  dataSource: items,
  fields: { text: 'name', value: 'id' },

  // Accessibility features (many enabled by default)
  placeholder: 'Select items',
  enabled: true,
  readonly: false
});

multiSelect.appendTo('#multiselect');
```

### Compliance Checklist

- ✓ Keyboard navigation support
- ✓ Screen reader compatibility (NVDA, JAWS, VoiceOver)
- ✓ Color contrast ratios (4.5:1 for text)
- ✓ Focus indicators visible
- ✓ ARIA roles and attributes
- ✓ Semantic HTML
- ✓ No keyboard traps
- ✓ Sensible tab order

### Section 508 Compliance

Section 508 compliance aligned with WCAG 2.2:

```html
<!-- 1. Providing clear labels via HTML -->
<label for="multiselect">Select your preferences:</label>
<input id="multiselect" type="text" />
```

```typescript
// 2. The component renders semantic ARIA roles automatically
// 3. Keyboard navigation is built-in
// 4. Screen reader support is automatic via ARIA roles
const ms = new MultiSelect({
  dataSource: items,
  placeholder: 'Select your preferences'
});
ms.appendTo('#multiselect');
```

## ARIA Attributes

### Automatic ARIA Setup

MultiSelect automatically sets many ARIA attributes:

```typescript
// Inspecting rendered HTML reveals:
// <input role="combobox" aria-haspopup="listbox" aria-expanded="false" />
// <ul role="listbox">
//   <li role="option" aria-selected="false">Item 1</li>
//   <li role="option" aria-selected="true">Item 2</li>
// </ul>

const multiSelect = new MultiSelect({
  dataSource: items,
  placeholder: 'Select items'
});
```

### ARIA Labels via HTML

Use the HTML `<label>` element with matching `for` and `id` attributes to associate accessible labels with the MultiSelect input:

```html
<label for="employee-select">Employee selection list</label>
<input id="employee-select" type="text" />
```

```typescript
const multiSelect = new MultiSelect({
  dataSource: employees,
  fields: { text: 'name', value: 'id' },
  placeholder: 'Search and select employees'
});

multiSelect.appendTo('#employee-select');
```

### ARIA Live Regions

The MultiSelect renders with built-in ARIA roles (`combobox`, `listbox`, `option`) that screen readers detect automatically. Use the `htmlAttributes` property to add additional accessibility attributes if needed:

```typescript
const multiSelect = new MultiSelect({
  dataSource: items,
  fields: { text: 'name', value: 'id' },
  htmlAttributes: { 'aria-label': 'Select items', 'aria-live': 'polite' },
  change: () => {
    const count = Array.isArray(multiSelect.value) ? multiSelect.value.length : 0;
    // Screen reader announces selection changes via ARIA roles
    console.log(`${count} items selected`);
  }
});
```

## Keyboard Navigation

### Keyboard Shortcuts

| Key | Action |
|-----|--------|
| <kbd>Arrow Down</kbd> | Move focus to next item |
| <kbd>Arrow Up</kbd> | Move focus to previous item |
| <kbd>Home</kbd> | Move focus to first item |
| <kbd>End</kbd> | Move focus to last item |
| <kbd>Enter</kbd> | Select/deselect focused item |
| <kbd>Space</kbd> | Select/deselect focused item (in checkbox mode) |
| <kbd>Tab</kbd> | Move focus to next control |
| <kbd>Shift+Tab</kbd> | Move focus to previous control |
| <kbd>Esc</kbd> | Close dropdown |
| <kbd>Alt+Down</kbd> | Open dropdown |
| <kbd>Alt+Up</kbd> | Close dropdown |

### Testing Keyboard Navigation

```typescript
// Example form navigable by keyboard only
const multiSelect = new MultiSelect({
  dataSource: items,
  placeholder: 'Select items (use arrow keys to navigate)'
});

multiSelect.appendTo('#multiselect');

// Test: Tab to input, Alt+Down to open, Arrow keys to navigate, Enter to select
```

**How to test:**
1. Unplug mouse
2. Use only keyboard to interact
3. Verify all functionality works
4. Ensure logical tab order

### Custom Keyboard Handlers

Add additional keyboard shortcuts:

```typescript
const multiSelect = new MultiSelect({
  dataSource: items,
  placeholder: 'Select items'
});

multiSelect.appendTo('#multiselect');

// Add custom keyboard handler
document.addEventListener('keydown', (e) => {
  if (e.ctrlKey && e.key === 'a') {
    // Ctrl+A to select all
    e.preventDefault();
    if (multiSelect.dataSource) {
      const allIds = multiSelect.dataSource.map((d: any) => d.id || d);
      multiSelect.values = allIds;
      multiSelect.refresh();
    }
  }
});
```

## Screen Reader Support

### Enable Screen Reader Announcements

Use `htmlAttributes` to pass additional ARIA attributes and provide an accessible label via HTML `<label>`:

```html
<label for="emp-select">Select employee from list</label>
<input id="emp-select" type="text" />
```

```typescript
const multiSelect = new MultiSelect({
  dataSource: employees,
  fields: { text: 'name', value: 'id' },
  htmlAttributes: { 'aria-live': 'polite' },
  change: () => {
    const selectedCount = Array.isArray(multiSelect.value) ? multiSelect.value.length : 0;
    const totalCount = (multiSelect.dataSource as any[])?.length || 0;

    // Screen readers announce selections via built-in ARIA roles
    console.log(`${selectedCount} of ${totalCount} selected`);
  }
});

multiSelect.appendTo('#emp-select');
```

### Test with Screen Readers

**NVDA (Windows):**
```
1. Download NVDA from nvaccess.org
2. Start NVDA
3. Navigate page with keyboard
4. Listen for announcements
```

**JAWS (Windows - paid):**
```
Similar to NVDA, use keyboard navigation
```

**VoiceOver (macOS/iOS):**
```
Command+F5 to enable
Use VO (Control+Option) + arrow keys
```

### Helpful Screen Reader Hints

Use standard HTML attributes alongside the `htmlAttributes` property to associate descriptions with the input:

```html
<!-- Explicit label helps screen readers -->
<label for="select-employees">Select team members:</label>

<!-- Add additional context -->
<small id="select-help">
  Use arrow keys to navigate, Enter to select multiple items
</small>

<input id="select-employees" type="text" />
```

```typescript
const multiSelect = new MultiSelect({
  dataSource: items,
  htmlAttributes: { 'aria-describedby': 'select-help' }
});
multiSelect.appendTo('#select-employees');
```

## Focus Management

### Visible Focus Indicators

Ensure focus is visible:

```css
/* Default focus styling (often sufficient) */
.e-multiselect.e-focus {
  outline: 2px solid #3f51b5;
  outline-offset: 2px;
}

/* Enhanced focus for better visibility */
.e-multiselect:focus-within {
  border-color: #3f51b5;
  box-shadow: 0 0 0 3px rgba(63, 81, 181, 0.1);
}

/* List item focus */
.e-multiselect .e-list-item:focus {
  outline: 2px solid #3f51b5;
  background: #f5f5f5;
}

.e-multiselect .e-list-item.e-active {
  background: #e3f2fd;
  border-left: 3px solid #3f51b5;
}
```

### Focus Order

```typescript
// Ensure logical tab order
// In HTML: tabindex should follow logical flow
<form>
  <input id="name" type="text" tabindex="1" />
  <input id="email" type="email" tabindex="2" />
  <input id="items" type="text" tabindex="3" />
  <button tabindex="4">Submit</button>
</form>

const multiSelect = new MultiSelect({
  dataSource: items
});

multiSelect.appendTo('#items');
```

### Focus Events

```typescript
const multiSelect = new MultiSelect({
  dataSource: items,
  
  focus: () => {
    console.log('MultiSelect focused');
    // Announce to screen readers
  },
  
  blur: () => {
    console.log('MultiSelect lost focus');
  }
});
```

## Color & Contrast

### WCAG Color Contrast Requirements

- Normal text: 4.5:1 minimum
- Large text (18pt+): 3:1 minimum
- UI components: 3:1 minimum

### Check Contrast Ratios

```css
/* Good: Dark text on light background */
.e-multiselect.e-field {
  background: #ffffff;  /* White */
  color: #212121;       /* Dark gray/black - 17:1 ratio ✓ */
}

/* Better: With active state */
.e-multiselect .e-list-item.e-active {
  background: #e3f2fd;  /* Light blue */
  color: #1565c0;       /* Dark blue - 9:1 ratio ✓ */
}

/* Avoid: Light on light */
/* background: #ffffff; color: #f0f0f0; */ /* ✗ No contrast */
```

### Test Contrast Tools

- WebAIM Contrast Checker
- axe DevTools browser extension
- Lighthouse in Chrome DevTools
- ColorBrewer for color-blind safe palettes

## Testing Accessibility

### Automated Testing

```typescript
// Using axe DevTools (browser extension)
// Or Lighthouse in DevTools

// Manual checks:
// 1. Keyboard navigation only (mouse unplugged)
// 2. Screen reader testing (NVDA, JAWS, VoiceOver)
// 3. Browser zoom (200%)
// 4. High contrast mode
// 5. Motion sensitivity testing
```

### Accessibility Checklist

```
□ Can navigate with Tab key
□ Can select items with Enter/Space
□ Focus indicators visible
□ Color not only difference (icons/text too)
□ Labels associated with inputs
□ ARIA attributes present
□ Screen reader announces items
□ Works at 200% zoom
□ Keyboard shortcuts documented
□ No flashing (>3/second)
□ Touch targets ≥44×44 pixels
```

## Common Issues

### Issue: Focus Not Visible

**Problem:** Can't see which item has focus  
**Solution:** Add focus styles

```css
/* Add to your CSS */
.e-multiselect .e-list-item:focus {
  outline: 2px solid #3f51b5;  /* Visible outline */
  outline-offset: -2px;
}
```

### Issue: Screen Reader Doesn't Announce

**Problem:** Screen reader silent on selection change  
**Solution:** Pass `aria-live` via `htmlAttributes`

```typescript
const ms = new MultiSelect({
  dataSource: items,
  htmlAttributes: { 'aria-live': 'polite' },
  change: () => {
    // Screen reader announces changes via built-in ARIA roles
  }
});
```

### Issue: Keyboard Navigation Doesn't Work

**Problem:** Arrow keys don't navigate items  
**Cause:** Usually missing focus on dropdown

```typescript
// Ensure element can receive focus
const ms = new MultiSelect({
  dataSource: items,
  enabled: true  // Must be enabled
});

ms.appendTo('#multiselect');

// Make sure container has proper tabindex
document.getElementById('multiselect').tabIndex = 0;
```

### Issue: Labels Not Associated

**Problem:** Screen reader doesn't read input label  
**Solution:** Properly associate label with input using matching `for` and `id` attributes

```html
<!-- ✗ Wrong - no association -->
<label>Select items:</label>
<input id="items" type="text" />

<!-- ✓ Correct - for attribute matches id -->
<label for="items">Select items:</label>
<input id="items" type="text" />
```

```typescript
const ms = new MultiSelect({
  dataSource: items
});

ms.appendTo('#items');
```

## Next Steps

- **Common Patterns:** See [how-to-guide.md](how-to-guide.md)
- **Customization:** See [customization-templates.md](customization-templates.md)
- **Performance:** See [virtual-scrolling.md](virtual-scrolling.md)
