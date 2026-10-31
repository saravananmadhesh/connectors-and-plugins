# Accessibility (WCAG 2.2 & Section 508) in ASP.NET Core Grid

## Table of Contents
- [Overview](#overview)
- [Keyboard Navigation](#keyboard-navigation)
- [WCAG 2.2 Compliance](#wcag-22-compliance)
- [WAI-ARIA Implementation](#wai-aria-implementation)
- [Screen Reader Support](#screen-reader-support)
- [Color Contrast](#color-contrast)
- [Focus Management](#focus-management)
- [Accessibility Testing](#accessibility-testing)

## Overview

Syncfusion ASP.NET Core Grid is built with accessibility as a core principle, supporting:
- **WCAG 2.2** (Web Content Accessibility Guidelines Level AA)
- **Section 508** (U.S. accessibility standards)
- **WAI-ARIA 1.2** (Web Accessibility Initiative - Accessible Rich Internet Applications)
- **Keyboard-only navigation**
- **Screen reader compatibility**

---

## Keyboard Navigation

### Grid Navigation Keys

| Key | Action |
|-----|--------|
| **Tab** | Move to next cell/control |
| **Shift + Tab** | Move to previous cell/control |
| **Arrow Keys** | Navigate within rows/columns |
| **Ctrl + Home** | Go to first cell |
| **Ctrl + End** | Go to last cell |
| **Page Up** | Previous page (paging enabled) |
| **Page Down** | Next page (paging enabled) |
| **Space** | Select row/check checkbox |
| **Enter** | Edit cell / Confirm action |
| **Escape** | Cancel edit / Close dialog |
| **Ctrl + A** | Select all |
| **Ctrl + C** | Copy (with clipboard enabled) |
| **Ctrl + X** | Cut (with clipboard enabled) |
| **Ctrl + V** | Paste (with clipboard enabled) |

### Enable Keyboard Navigation

Keyboard navigation is enabled by default. Disable if needed:

```cshtml
<ejs-grid id="Grid" dataSource="@ViewBag.DataSource" 
          allowKeyboard="false">
    <e-grid-columns>
        <e-grid-column field="OrderID" headerText="Order ID" width="100"></e-grid-column>
        <e-grid-column field="CustomerID" headerText="Customer" width="120"></e-grid-column>
    </e-grid-columns>
</ejs-grid>
```

### Keyboard Event Handling

```cshtml
<ejs-grid id="Grid" dataSource="@ViewBag.DataSource"
          onKeyDown="onGridKeyDown">
    <e-grid-columns>
        <e-grid-column field="OrderID" headerText="Order ID" width="100"></e-grid-column>
    </e-grid-columns>
</ejs-grid>

<script>
function onGridKeyDown(args) {
    if (args.keyCode === 113) { // F2
        var grid = document.getElementById('Grid').ej2_instances[0];
        if (grid.getSelectedRowIndexes().length > 0) {
            grid.startEdit(grid.getSelectedRowIndexes()[0]);
        }
    }
}
</script>
```

---

## WCAG 2.2 Compliance

The Grid component follows WCAG 2.2 guidelines:

- **Perceivable**: Color contrast ratios of at least 4.5:1 for text
- **Operable**: Full keyboard accessibility
- **Understandable**: Clear labels and semantic HTML
- **Robust**: Compatible with assistive technologies

---

## WAI-ARIA Implementation

The Grid uses WAI-ARIA roles and attributes:

```html
<!-- Grid role -->
<div role="grid" aria-label="Order Details">
    <!-- Row role -->
    <div role="row">
        <div role="gridcell" aria-colindex="1">Data</div>
        <div role="gridcell" aria-colindex="2">Data</div>
    </div>
</div>
```

### Accessible Column Headers

Set `headerText` with meaningful labels:

```cshtml
<e-grid-column field="OrderID" 
               headerText="Order Identification Number" 
               ariaLabel="Order ID">
</e-grid-column>
```

---

## Screen Reader Support

### Enable Screen Reader Announcements

```cshtml
<ejs-grid id="Grid" dataSource="@ViewBag.DataSource"
          enableAccessibility="true">
    <e-grid-columns>
        <e-grid-column field="OrderID" headerText="Order ID" width="100"></e-grid-column>
        <e-grid-column field="CustomerID" headerText="Customer" width="120"></e-grid-column>
        <e-grid-column field="Freight" headerText="Freight" format="C2" width="100"></e-grid-column>
    </e-grid-columns>
</ejs-grid>
```

### Announcements for Actions

The Grid automatically announces:
- Grid initialization
- Row selection changes
- Edit mode activation
- Sort and filter changes
- Page navigation

---

## Color Contrast

Ensure text and background colors meet WCAG AA standards (4.5:1 ratio for normal text).

### Customize Grid Colors for Accessibility

```css
/* High contrast header */
.e-grid .e-headercell {
    background-color: #003d5c;  /* Dark blue */
    color: #ffffff;              /* White text */
}

/* High contrast rows */
.e-grid .e-row {
    background-color: #ffffff;   /* White background */
    color: #000000;              /* Black text */
}

/* Selected row with high contrast */
.e-grid .e-selectionbackground {
    background-color: #0056a4;   /* Blue */
    color: #ffffff;              /* White text */
}
```

---

## Focus Management

### Visible Focus Indicators

Ensure focus indicators are visible for keyboard navigation:

```css
/* Visible focus on cells */
.e-grid .e-row .e-rowcell:focus {
    outline: 2px solid #0056a4;
    outline-offset: -2px;
}

/* Visible focus on buttons */
.e-grid .e-btn:focus {
    outline: 2px solid #0056a4;
}
```

### Tab Order Management

Control tab order using `tabIndex`:

```cshtml
<ejs-grid id="Grid" tabIndex="0">
    <e-grid-columns>
        <e-grid-column field="OrderID" headerText="Order ID"></e-grid-column>
    </e-grid-columns>
</ejs-grid>
```

---

## Accessibility Testing

### Manual Testing Checklist

- [ ] Navigate grid using only keyboard (Tab, Arrow keys, etc.)
- [ ] Verify all actions work without mouse
- [ ] Test with screen readers (NVDA, JAWS)
- [ ] Check color contrast ratios (use contrast analyzer tools)
- [ ] Verify focus indicators are visible
- [ ] Test with browser zoom at 200%
- [ ] Validate semantic HTML structure

### Automated Testing Tools

- **axe DevTools**: Browser extension for accessibility audits
- **WAVE**: WebAIM contrast checker
- **Lighthouse**: Built into Chrome DevTools
- **NVDA**: Free screen reader

### Test with Screen Readers

```cshtml
<!-- Example grid for screen reader testing -->
<ejs-grid id="AccessibleGrid" 
          dataSource="@ViewBag.DataSource"
          enableAccessibility="true"
          allowPaging="true"
          allowFiltering="true"
          allowSorting="true">
    <e-grid-columns>
        <e-grid-column field="OrderID" headerText="Order ID" width="100" isPrimaryKey="true"></e-grid-column>
        <e-grid-column field="CustomerID" headerText="Customer ID" width="120"></e-grid-column>
        <e-grid-column field="Freight" headerText="Freight Amount" format="C2" width="100"></e-grid-column>
        <e-grid-column field="OrderDate" headerText="Order Date" type="date" format="yMd" width="130"></e-grid-column>
    </e-grid-columns>
    <e-grid-pageSettings pageSize="12"></e-grid-pageSettings>
</ejs-grid>
```

### Key Announcements Expected

- "Grid 'Order Details' loading"
- "Row 1, Order ID, 10248"
- "Customer ID, VINET, selected"
- "Sorted by Order ID, ascending"
- "Filtered by Freight greater than 100"
- "Page 2 of 5"

---

## Best Practices

1. **Always use `headerText`**: Provides context for screen readers
2. **Meaningful labels**: Use descriptive column names
3. **Enable `enableAccessibility`**: Activates ARIA announcements
4. **Test with assistive tech**: Don't assume — test with actual screen readers
5. **Provide alternatives**: For complex visualizations, provide data tables
6. **Color not alone**: Don't rely on color alone for meaning
7. **Keyboard support**: Ensure all features work keyboard-accessible
8. **Focus visible**: Always show focus indicators
