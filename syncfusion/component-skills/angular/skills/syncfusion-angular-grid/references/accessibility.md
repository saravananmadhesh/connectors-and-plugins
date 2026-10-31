# Accessibility (WCAG 2.2 & Section 508) in Angular Grid

## Table of Contents
- [When to Use This Skill](#when-to-use-this-skill)
- [Overview](#overview)
- [Keyboard Navigation](#keyboard-navigation)
- [WCAG 2.2 Compliance](#wcag-22-compliance)
- [WAI-ARIA Implementation](#wai-aria-implementation)
- [Screen Reader Support](#screen-reader-support)
- [Color Contrast](#color-contrast)
- [Focus Management](#focus-management)
- [Accessibility Testing](#accessibility-testing)

## When to Use This Skill

Use this skill when you need to:
- **Ensure WCAG 2.2 compliance** — Build grids that meet Web Content Accessibility Guidelines Level AA standards
- **Support keyboard navigation** — Enable users to navigate grids without a mouse
- **Screen reader support** — Ensure screen readers can interpret and announce grid content properly
- **Section 508 compliance** — Meet U.S. federal accessibility requirements
- **Color contrast** — Verify that text and UI elements meet contrast ratio requirements
- **Focus management** — Implement proper focus handling and visual indicators
- **WAI-ARIA implementation** — Use ARIA attributes correctly for rich internet applications
- **Accessibility testing** — Test and validate grids for compliance with accessibility standards
- **Inclusive design** — Support users with disabilities including visual, motor, and cognitive impairments

## Overview

Syncfusion Angular Grid is built with accessibility as a core principle, supporting:
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

```typescript
import { Component } from '@angular/core';
import { GridComponent } from '@syncfusion/ej2-angular-grids';

@Component({
  selector: 'app-grid',
  template: `
    <ejs-grid #grid
      [dataSource]="data"
      [allowKeyboard]="true"
      [allowPaging]="true">
      <e-columns>
        <e-column field="OrderID" headerText="Order ID" width="100"></e-column>
        <e-column field="CustomerID" headerText="Customer" width="120"></e-column>
      </e-columns>
    </ejs-grid>
  `
})
export class AppGridComponent {
  data = [];
  
  constructor() {
    // allowKeyboard=true is enabled by default
  }
}
```

### Tab Index Order

Maintain logical tab order:

```typescript
<ejs-grid [dataSource]="data" tabIndex="1">
  <e-columns>
    <!-- columns -->
  </e-columns>
</ejs-grid>
```

### Keyboard Event Handling

```typescript
import { Component, ViewChild } from '@angular/core';
import { GridComponent } from '@syncfusion/ej2-angular-grids';

@Component({
  selector: 'app-grid',
  template: `
    <div (keydown)="handleKeyDown($event)">
      <ejs-grid #grid [dataSource]="data">
        <e-columns>
          <!-- columns -->
        </e-columns>
      </ejs-grid>
    </div>
  `
})
export class AppComponent {
  @ViewChild('grid') gridInstance: GridComponent;
  data = [];

  handleKeyDown(event: KeyboardEvent) {
    if (event.key === 'F2') {
      // Custom action on F2
      const selectedRows = this.gridInstance.getSelectedRows();
      if (selectedRows.length > 0) {
        this.gridInstance.startEdit(selectedRows[0]);
      }
    }
  }
}
```

---

## WCAG 2.2 Compliance

### Perceivable

Information must be presentable to users:

```typescript
// ✅ Provide text alternatives for images
<e-column field="Photo" headerText="Employee Photo">
  <ng-template #template let-data>
    <img [src]="data.Photo" 
         [alt]="'Photo of ' + data.FirstName + ' ' + data.LastName"
         style="width: 32px; height: 32px;"</e-column>
  </ng-template>
</e-column>

// ✅ Use semantic HTML
<ejs-grid [dataSource]="data" ariaLabel="Employee data grid">
  <e-columns>
    <!-- columns -->
  </e-columns>
</ejs-grid>

// ✅ Sufficient contrast ratios (4.5:1 for normal text)
<div [style]="{'color': '#000000', 'background-color': '#FFFFFF'}">
  High contrast text
</div>
```

### Operable

Users must be able to navigate and interact:

```typescript
// ✅ Keyboard accessible
<ejs-grid [dataSource]="data" [allowKeyboard]="true" [allowSelection]="true">
  <e-columns>
    <!-- columns -->
  </e-columns>
</ejs-grid>

// ✅ Provide skip links
import { Component } from '@angular/core';

@Component({
  selector: 'app-grid',
  template: `
    <a href="#main-grid" class="skip-link">Skip to grid</a>
    <ejs-grid id="main-grid" [dataSource]="data">
      <e-columns>
        <!-- columns -->
      </e-columns>
    </ejs-grid>
  `
})
export class AppComponent {
  data = [];
}
```

### Understandable

Content must be clear and predictable:

```typescript
// ✅ Use clear labels
<e-column field="OrderDate" headerText="Order Date" type="date" format="MM/dd/yyyy"></e-column>

// ✅ Predictable behavior
// ✅ Predictable behavior
(actionBegin)="handleActionBegin($event)"

// ✅ Clear instructions
<label for="grid-filter">Filter by customer:</label>
<ejs-grid id="grid-filter" [dataSource]="data" [allowFiltering]="true">
  <e-columns>
    <!-- columns -->
  </e-columns>
</ejs-grid>
```

### Robust

Content must work with assistive technologies:

```typescript
// ✅ Valid HTML
<ejs-grid
  [dataSource]="data"
  role="region"
  aria-label="Sales orders table"
>
  <e-columns>
    <!-- columns -->
  </e-columns>
</ejs-grid>

// ✅ Proper attribute usage
<e-column
  field="Verified"
  headerText="Verified"
  type="boolean"
  [displayAsCheckBox]="true"
  [attr.aria-label]="'Is verified'"
></e-column>
```

---

## WAI-ARIA Implementation

### ARIA Attributes

Syncfusion Grid automatically adds ARIA attributes:

```typescript
// Automatically added by Grid:
// role='grid'
// role='row' for each row
// role='gridcell' for each cell
// role='button' for headers (clickable)
// aria-selected='true/false'
// aria-sort='ascending/descending/none'
// aria-expanded='true/false' (for detail rows)
// aria-disabled='true/false'
// aria-readonly='true/false'

<ejs-grid
  [dataSource]="data"
  [allowSorting]="true"
  [detailTemplate]="detailTemplate"
>
  <e-columns>
    <!-- columns -->
  </e-columns>
</ejs-grid>
```

### Custom ARIA Labels

```typescript
<ejs-grid
  [dataSource]="data"
  ariaLabel="Employee database"
>
  <ng-template #rowTemplate let-data>
    <tr [attr.aria-label]="'Employee ' + data.FirstName + ' ' + data.LastName">
      <td>{{data.FirstName}}</td>
      <td>{{data.LastName}}</td>
    </tr>
  </ng-template>
  <e-columns>
    <!-- columns -->
  </e-columns>
</ejs-grid>
```

### ARIA Live Regions

Announce dynamic content changes:

```typescript
import { Component, ViewChild } from '@angular/core';
import { GridComponent } from '@syncfusion/ej2-angular-grids';

@Component({
  selector: 'app-grid',
  template: `
    <div>
      <div role="status" aria-live="polite" aria-atomic="true" class="sr-only">
        {{announcement}}
      </div>

      <ejs-grid #grid [dataSource]="data" (recordDoubleClick)="handleRowAction('Row opened')">
        <e-columns>
          <!-- columns -->
        </e-columns>
      </ejs-grid>
    </div>
  `
})
export class AppAriaGridComponent {

  handleRowAction(action: string) {
    this.announcement = action + ' performed';
    setTimeout(() => this.announcement = '', 1000);
  }
}
```

---

## Screen Reader Support

### Test with NVDA/JAWS

1. Install NVDA (free) or JAWS
2. Enable screen reader
3. Tab through grid
4. Verify announcements

### Announce Selection

```typescript
import { Component, ViewChild, OnInit } from '@angular/core';
import { GridComponent } from '@syncfusion/ej2-angular-grids';

@Component({
  selector: 'app-announce-selection',
  template: `<ejs-grid #grid [dataSource]="data"
    [selectionSettings]="{ type: 'Multiple', mode: 'Row' }"
    (rowSelected)="onRowSelected($event)">
    <e-columns>
      <!-- columns -->
    </e-columns>
  </ejs-grid>`
})
export class GridAnnounceSelectionComponent implements OnInit {
  @ViewChild('grid') gridInstance: GridComponent;
  data: any[] = [];

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    // Load grid data
  }

  onRowSelected(args: any) {
    const announcement = 'Row ' + args.data.OrderID + ' selected';
  this.announceToScreenReader(announcement);
}

annonounceToScreenReader(message: string) {
  const announcement = document.createElement('div');
  announcement.setAttribute('role', 'status');
  announcement.setAttribute('aria-live', 'polite');
  announcement.className = 'sr-only';
  announcement.textContent = message;
  document.body.appendChild(announcement);
  
  setTimeout(() => announcement.remove(), 1000);
}
```

### Describe Complex Cells

```typescript
// Add descriptions for complex content
<e-column field="Status" headerText="Status">
  <ng-template #template let-data>
    <div>
      <span [style]="{
        'background-color': data.Status === 'Active' ? 'green' : 'red',
        'color': 'white',
        'padding': '4px 8px',
        'border-radius': '4px'
      }"
      [attr.aria-label]="'Status: ' + data.Status">
        {{data.Status}}
      </span>
    </div>
  </ng-template>
</e-column>
```

### Header Descriptions

```typescript
<e-column field="Freight" headerText="Freight Cost">
  <ng-template #template>
    <div>
      <span>Freight Cost (USD)</span>
      <span class="sr-only">Shipping cost in US dollars</span>
    </div>
  </ng-template>
</e-column>
```

---

## Color Contrast

### WCAG AA Requirements

- **Normal text**: 4.5:1 ratio
- **Large text** (18+ or 14+ bold): 3:1 ratio

### Contrast Check

```typescript
// ✅ Good contrast (Black on White = 21:1)
<div [style]="{ 'color': '#000000', 'background-color': '#FFFFFF' }">
  Text with excellent contrast
</div>

// ✅ Good for large text (3:1)
<div [style]="{ 'color': '#0066CC', 'background-color': '#FFFFFF', 'font-size': '18px', 'font-weight': 'bold' }">
  Large blue text
</div>

// ❌ Bad contrast (Gray on White = 1.5:1)
<div [style]="{ 'color': '#CCCCCC', 'background-color': '#FFFFFF' }">
  Poor contrast text (fail)
</div>
```

### Apply to Grid

```typescript
// Custom theme with good contrast
const gridStyles = `
  .e-grid .e-gridcontent td {
    color: #000000;  /* High contrast */
    background-color: #FFFFFF;
  }
  
  .e-grid .e-headercell {
    color: #FFFFFF;
    background-color: #0066CC;  /* 4.5:1 ratio */
  }
  
  .e-grid .e-selectionbackground {
    background-color: #0066CC;
    color: #FFFFFF;
  }
`;

<ejs-grid [dataSource]="data">
  <e-columns>
    <!-- columns -->
  </e-columns>
</ejs-grid>
```

---

## Focus Management

### Visible Focus Indicator

```typescript
const focusStyles = `
  .e-grid .e-gridcontent td:focus,
  .e-grid .e-headercell:focus {
    outline: 3px solid #4A90E2;
    outline-offset: 2px;
  }
`;

<ejs-grid [dataSource]="data">
  <e-columns>
    <!-- columns -->
  </e-columns>
</ejs-grid>
```

### Restore Focus on Dialog Close

```typescript
import { Component, ViewChild } from '@angular/core';
import { GridComponent } from '@syncfusion/ej2-angular-grids';

@Component({
  selector: 'app-grid',
  template: `
    <ejs-grid #grid [dataSource]="data" 
              [editSettings]="{ mode: 'Dialog', allowEditing: true }"
              (actionBegin)="handleActionBegin($event)"
              (actionComplete)="handleActionComplete($event)">
      <e-columns>
        <!-- columns -->
      </e-columns>
    </ejs-grid>
  `
})
export class AppFocusGridComponent {
  @ViewChild('grid') gridInstance: GridComponent;
  data = [];
  previousFocus: any;

  handleActionBegin(args: any) {
    if (args.requestType === 'beginEdit') {
      this.previousFocus = document.activeElement;
    }
  }

  handleActionComplete(args: any) {
    if (args.requestType === 'save') {
      if (this.previousFocus) {
        (this.previousFocus as any).focus();
      }
    }
  }
}
```

### Logical Tab Order

```typescript
<ejs-grid [dataSource]="data" [editSettings]="{ mode: 'Dialog' }">
  <e-columns>
    <e-column field="FirstName" headerText="First Name" width="100" [tabIndex]="0"></e-column>
    <e-column field="LastName" headerText="Last Name" width="100" [tabIndex]="1"></e-column>
  </e-columns>
</ejs-grid>
```

---

## Accessibility Testing

### Automated Testing with axe DevTools

```typescript
import { TestBed, ComponentFixture } from '@angular/core/testing';

test('grid should be accessible', async () => {
  const fixture = TestBed.createComponent(GridComponent);
  const component = fixture.componentInstance;
  fixture.detectChanges();
  
  const container = fixture.nativeElement;
  // Use accessibility testing library (e.g., axe-core)
  // const results = await axe(container);
  // Verify no accessibility violations
});
```

### Manual Testing Checklist

- [ ] All features keyboard accessible
- [ ] Tab order is logical
- [ ] Focus indicators visible
- [ ] No keyboard traps
- [ ] Color not only differentiator
- [ ] Contrast ratios met (4.5:1)
- [ ] Headings properly structured
- [ ] Labels associated with inputs
- [ ] Form validation messages clear
- [ ] Dynamic content announced
- [ ] Images have alt text
- [ ] Links have descriptive text
- [ ] No auto-playing audio/video
- [ ] Resizable text works
- [ ] Works with screen readers
- [ ] Responsive on mobile with zoom

### Browser Extensions for Testing

- **axe DevTools**: Accessibility checker
- **WAVE**: Web accessibility tool
- **Lighthouse**: Built-in Chrome audit
- **NVDA**: Free screen reader (Windows)
- **JAWS**: Professional screen reader

### Test Report Template

```
Grid Accessibility Audit - [Date]

✅ Keyboard Navigation
 - All functions accessible
 - Logical tab order
 - No keyboard traps

✅ WCAG 2.2 Compliance
 - Level A: PASSED
 - Level AA: PASSED

✅ Screen Reader Support
 - NVDA: PASSED
 - JAWS: PASSED

✅ Color & Contrast
 - Text: 4.5:1
 - UI Components: 3:1

Notes:
- [Any issues found]
```
