# Accessibility (WCAG 2.2 & Section 508) in JavaScript Grid

## Table of Contents
- [Overview](#overview)
- [Keyboard Navigation](#keyboard-navigation)
- [WCAG 2.2 Compliance](#wcag-22-compliance)
- [WAI-ARIA Implementation](#wai-aria-implementation)
- [Screen Reader Support](#screen-reader-support)
- [Color Contrast & Focus](#color-contrast--focus)
- [Testing & Best Practices](#testing--best-practices)

## When to Use This Reference

- Enable keyboard navigation (Tab, Arrow, Enter, Escape keys)
- Ensure WCAG 2.2 Level AA compliance for grid accessibility
- Implement screen reader support (NVDA, JAWS)
- Add proper semantic ARIA attributes and live regions
- Configure color contrast ratios for visibility
- Manage focus restoration and keyboard-only navigation

## Overview

Syncfusion JavaScript Grid supports **WCAG 2.2 Level AA**, **Section 508**, and **WAI-ARIA 1.2**:
- Keyboard-only navigation
- Screen reader compatibility (NVDA, JAWS)
- Automatic ARIA attributes
- Focus management and restoration
- High contrast themes

---

## Keyboard Navigation

### Navigation Keys

| Key | Action |
|-----|--------|
| **Tab / Shift+Tab** | Next/previous cell |
| **Arrow Keys** | Navigate rows/columns |
| **Ctrl + Home/End** | First/last cell |
| **Page Up/Down** | Previous/next page |
| **Space** | Select row/checkbox |
| **Enter** | Edit cell/confirm |
| **Escape** | Cancel edit/close |
| **Ctrl + A/C/X/V** | Select all/copy/cut/paste |

### Enable Keyboard Navigation

```ts
import { Grid, Page, Inject } from '@syncfusion/ej2-grids';

Grid.Inject(Page);

const grid = new Grid({
  dataSource: data,
  allowKeyboard: true,  // Default: true
  allowPaging: true,
  columns: [
    { field: 'OrderID', headerText: 'Order ID', width: 100 },
    { field: 'CustomerID', headerText: 'Customer', width: 120 }
  ]
});

grid.appendTo('#grid');

// Custom F2 action
document.addEventListener('keydown', (e: KeyboardEvent) => {
  if (e.key === 'F2') {
    const selectedRows = grid.getSelectedRowIndexes();
    if (selectedRows.length > 0) {
      grid.startEdit(grid.getRowByIndex(selectedRows[0]));
    }
  }
});
```

---

## WCAG 2.2 Compliance

### Perceivable
Information must be presentable to users:

```ts
// ✅ provide alt text for images
const grid = new Grid({
  dataSource: data,
  columns: [
    {
      field: 'Photo',
      headerText: 'Photo',
      width: 100,
      template: (props: any) => 
        `<img src="${props.Photo}" alt="Photo of ${props.FirstName}" style="width: 32px;"/>`
    },
    { field: 'FirstName', headerText: 'First Name', width: 120 }
  ]
});

// ✅ Use semantic HTML with ARIA labels
const grid = new Grid({
  dataSource: data,
  ariaLabel: 'Employee database',
  columns: [...]
});

// ✅ Sufficient contrast ratios (4.5:1 normal, 3:1 large)
const styles = `
  #grid .e-gridcontent td { color: #000000; background: #FFFFFF; }
  #grid .e-headercell { color: #FFFFFF; background: #0066CC; }
`;
```

### Operable
Users must be able to navigate and interact:

```ts
// ✅ Keyboard accessible
const grid = new Grid({
  dataSource: data,
  allowKeyboard: true,
  allowSelection: true,
  selectionSettings: { type: 'Multiple', mode: 'Row' },
  columns: [...]
});

// ✅ Skip links (in HTML)
// <a href="#main-grid" class="skip-link">Skip to grid</a>
// <div id="main-grid"></div>
```

### Understandable
Content must be clear and predictable:

```ts
// ✅ Clear labels and formats
const grid = new Grid({
  dataSource: data,
  columns: [
    { field: 'OrderID', headerText: 'Order ID', width: 100, textAlign: 'Right' },
    { field: 'OrderDate', headerText: 'Order Date', type: 'date', format: 'MM/dd/yyyy' },
    { field: 'Freight', headerText: 'Freight Amount', type: 'number', format: 'C2' }
  ],
  actionComplete: (args: any) => {
    if (args.requestType === 'save') {
      announceToScreenReader('Record saved successfully');
    }
  }
});

function announceToScreenReader(message: string) {
  const div = document.createElement('div');
  div.setAttribute('role', 'status');
  div.setAttribute('aria-live', 'polite');
  div.style.position = 'absolute';
  div.style.left = '-10000px';
  div.textContent = message;
  document.body.appendChild(div);
  setTimeout(() => div.remove(), 1000);
}
```

---

## WAI-ARIA Implementation

### Automatic ARIA Attributes

Grid automatically adds:
- `role='grid'` on grid element
- `role='row'` on each data row
- `role='gridcell'` on each cell
- `role='button'` on sortable headers
- `aria-selected='true/false'` for selected rows
- `aria-sort='ascending/descending/none'` for sorted columns
- `aria-expanded='true/false'` for detail rows

```ts
const grid = new Grid({
  dataSource: data,
  allowSorting: true,
  allowSelection: true,
  columns: [...]
});

grid.appendTo('#grid');
```

### Custom ARIA Labels

```ts
const grid = new Grid({
  dataSource: data,
  ariaLabel: 'Employee database grid',
  columns: [
    { field: 'FirstName', headerText: 'First Name', width: 120 },
    { field: 'LastName', headerText: 'Last Name', width: 120 },
    { field: 'Email', headerText: 'Email Address', width: 150 }
  ]
});

grid.appendTo('#grid');
```

### ARIA Live Regions

```ts
import { Grid, Edit, Inject } from '@syncfusion/ej2-grids';

Grid.Inject(Edit);

function announceToScreenReader(message: string) {
  const announcer = document.createElement('div');
  announcer.setAttribute('role', 'status');
  announcer.setAttribute('aria-live', 'polite');
  announcer.setAttribute('aria-atomic', 'true');
  announcer.style.position = 'absolute';
  announcer.style.left = '-10000px';
  announcer.textContent = message;
  document.body.appendChild(announcer);
  setTimeout(() => announcer.remove(), 1000);
}

const grid = new Grid({
  dataSource: data,
  editSettings: { allowEditing: true, allowAdding: true, mode: 'Dialog' },
  actionComplete: (args: any) => {
    if (args.requestType === 'save') {
      announceToScreenReader(`Record ${args.data?.OrderID} saved`);
    } else if (args.requestType === 'add') {
      announceToScreenReader('New record added');
    }
  },
  rowSelected: (args: any) => {
    const count = grid.getSelectedRowIndexes().length;
    announceToScreenReader(`Row selected. Total selected: ${count}`);
  },
  columns: [...]
});

grid.appendTo('#grid');
```

---

## Screen Reader Support

### Test with NVDA/JAWS
1. Install NVDA (free, Windows) or JAWS
2. Enable screen reader
3. Tab through grid
4. Verify announcements

### Describe Complex Cells

```ts
const grid = new Grid({
  dataSource: data,
  columns: [
    {
      field: 'Status',
      headerText: 'Status',
      width: 120,
      template: (props: any) => {
        const color = props.Status === 'Active' ? 'green' : 'red';
        const text = props.Status === 'Active' ? 'Active' : 'Inactive';
        return `<div style="background-color: ${color}; color: white; padding: 4px 8px; border-radius: 4px;" aria-label="Status: ${text}">
          ${text}
        </div>`;
      }
    },
    { field: 'OrderID', headerText: 'Order ID', width: 100 }
  ]
});

grid.appendTo('#grid');
```

### Header Descriptions

```ts
const grid = new Grid({
  dataSource: data,
  columns: [
    {
      field: 'Freight',
      headerText: 'Freight Cost (USD)',
      width: 120,
      tooltip: 'Shipping cost in US dollars',
      template: (props: any) => 
        `<span aria-label="Freight: $${props.Freight.toFixed(2)}">${props.Freight.toFixed(2)}</span>`
    },
    { field: 'OrderID', headerText: 'Order ID', width: 100 }
  ]
});

grid.appendTo('#grid');
```

---

## Color Contrast & Focus

### WCAG AA Contrast Requirements
- **Normal text**: 4.5:1 ratio
- **Large text** (18px+): 3:1 ratio

### Apply Contrast

```ts
// ✅ Good: Black on White (21:1)
// ✅ Good for large: Blue on White (#0066CC on #FFFFFF = 3:1)
// ❌ Avoid: Gray on White (1.5:1) - fails WCAG

const styles = `
  #grid .e-gridcontent td {
    color: #000000;
    background-color: #FFFFFF;
  }
  
  #grid .e-headercell {
    color: #FFFFFF;
    background-color: #0066CC;
    font-weight: bold;
  }
  
  #grid .e-selectionbackground {
    background-color: #0066CC;
    color: #FFFFFF;
  }
`;

const styleEl = document.createElement('style');
styleEl.textContent = styles;
document.head.appendChild(styleEl);
```

### Focus Management

```ts
// ✅ Visible focus indicator
const focusStyles = `
  #grid .e-gridcontent td:focus,
  #grid .e-headercell:focus {
    outline: 3px solid #4A90E2;
    outline-offset: 2px;
  }
`;

const styleEl = document.createElement('style');
styleEl.textContent = focusStyles;
document.head.appendChild(styleEl);

// ✅ Restore focus after dialog close
import { Grid, Edit, Inject } from '@syncfusion/ej2-grids';

Grid.Inject(Edit);

let previousFocus: HTMLElement | null = null;

const grid = new Grid({
  dataSource: data,
  editSettings: { allowEditing: true, mode: 'Dialog' },
  actionBegin: (args: any) => {
    if (args.requestType === 'beginEdit') {
      previousFocus = document.activeElement as HTMLElement;
    }
  },
  actionComplete: (args: any) => {
    if (args.requestType === 'save' && previousFocus) {
      previousFocus.focus();
    }
  },
  columns: [...]
});

grid.appendTo('#grid');
```

---

## Testing & Best Practices

### Manual Testing Checklist

- [ ] All features keyboard accessible (Tab, Enter, Escape, Arrows)
- [ ] Tab order logical (left-to-right, top-to-bottom)
- [ ] Focus indicators visible (3px+ outline)
- [ ] No keyboard traps
- [ ] Color not sole differentiator
- [ ] Contrast ratios met (4.5:1, 3:1)
- [ ] Labels clear and descriptive
- [ ] Validation messages announced
- [ ] Dynamic updates announced
- [ ] Works with NVDA/JAWS
- [ ] Responsive at 200% zoom
- [ ] Print-friendly styles

### Testing Tools

| Tool | Purpose |
|------|---------|
| **axe DevTools** | Automated accessibility checker |
| **WAVE** | Visual feedback on accessibility |
| **Lighthouse** | Chrome built-in audit |
| **NVDA** | Free Windows screen reader |
| **JAWS** | Professional screen reader |
| **Color Contrast Analyzer** | Verify contrast ratios |

### Best Practices

1. **Enable keyboard navigation** (default: true)
   ```ts
   allowKeyboard: true
   ```

2. **Add ARIA labels for context**
   ```ts
   ariaLabel: 'Employee database'
   ```

3. **Maintain contrast ratios**
   - 4.5:1 for normal text
   - 3:1 for large text

4. **Announce dynamic changes**
   ```ts
   actionComplete: (args) => announceToScreenReader('Saved')
   ```

5. **Test with assistive technology**
   - Use NVDA or JAWS
   - Test keyboard navigation
   - Verify announcements

6. **Implement focus management**
   - Show visible focus indicator
   - Restore focus after dialogs
   - Maintain logical tab order

7. **Use ARIA appropriately**
   - Let Grid handle automatic ARIA
   - Add custom ARIA for complex content
   - Use aria-live for updates

8. **Ensure responsive at zoom**
   - Test at 200% zoom
   - Text resizable without loss
   - No horizontal scrolling at 200%

---

## Common Pitfalls to Avoid

❌ **Don't use color only**
```ts
// BAD - Status only by color
template: (props: any) => `
  <div style="background-color: ${props.Status === 'Active' ? 'green' : 'red'}"></div>
`;

// GOOD - Include text
template: (props: any) => `
  <div aria-label="Status: ${props.Status}" style="background-color: ${props.Status === 'Active' ? 'green' : 'red'}">
    ${props.Status === 'Active' ? '✓' : '✗'} ${props.Status}
  </div>
`;
```

❌ **Don't disable keyboard navigation**
```ts
// BAD
allowKeyboard: false

// GOOD
allowKeyboard: true  // or omit (default)
```

❌ **Don't trap keyboard focus**
Ensure users can escape any component with Escape or Tab.

❌ **Don't use poor contrast**
```ts
// BAD: #CCCCCC on #FFFFFF = 1.5:1 (fails)
// GOOD: #000000 on #FFFFFF = 21:1 (passes)
```

---

## Mandatory Accessibility Rules

| Rule | Requirement |
|------|-------------|
| **Keyboard Access** | All features accessible via keyboard (always enabled) |
| **ARIA Labels** | Add `ariaLabel` property for grid context |
| **Focus Indicator** | 3px outline minimum, visible at all times |
| **Contrast** | Text 4.5:1, UI components 3:1 ratio |
| **Announcements** | Use `actionComplete`, `rowSelected` events to announce |
| **Testing** | Must test with keyboard and screen readers |
| **Tab Order** | Maintain logical visual order (automatic) |
| **No Traps** | Users can exit any component easily |
