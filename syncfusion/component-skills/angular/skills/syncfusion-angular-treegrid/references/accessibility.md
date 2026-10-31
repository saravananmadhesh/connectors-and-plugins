---
name: Accessibility
description: 'Accessibility in Syncfusion Angular TreeGrid - WCAG 2.1 conformance, ARIA labels, keyboard navigation, screen reader support, and inclusive design.'
---

# Accessibility (a11y)

Implement accessible TreeGrid with WCAG 2.1 Level AA conformance for inclusive user experiences.

## When to Use

Use accessibility features when you need to:
- **Keyboard navigation** — Enable full keyboard-only usage without a mouse
- **ARIA labels** — Provide semantic meaning to assistive technologies
- **Accessibility testing** — Validate compliance with tools and standards

## Table of Contents
- [ARIA Labels and Attributes](#aria-labels-and-attributes)
- [Keyboard Navigation](#keyboard-navigation)

## ARIA Labels and Attributes

### Grid Container ARIA

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-treegrid',
  template: `
    <ejs-treegrid 
      #treegrid
      [dataSource]='data'
      [childMapping]='childMapping'
      role='grid'
      aria-label='Task Management TreeGrid'
      aria-describedby='grid-description'>
      <e-columns>
        <e-column 
          field='TaskID' 
          headerText='Task ID'
          role='columnheader'
          aria-label='Task Identifier'
          width='90'>
        </e-column>
        <e-column 
          field='TaskName' 
          headerText='Task Name'
          role='columnheader'
          aria-label='Task Name or Description'
          width='200'>
        </e-column>
        <e-column 
          field='Priority' 
          headerText='Priority'
          role='columnheader'
          aria-label='Task Priority Level'
          width='100'>
        </e-column>
      </e-columns>
    </ejs-treegrid>
    <div id='grid-description' style='display:none;'>
      Interactive task hierarchy with filtering, sorting, and editing capabilities
    </div>
  `
})
export class AppComponent {
  public data: Object[] = [];
  public childMapping: string = 'subtasks';
}
```

### Row and Cell ARIA

```typescript
onRowDataBound(args: any) {
  // Add ARIA attributes to rows
  args.row.setAttribute('role', 'row');
  args.row.setAttribute('aria-rowindex', args.rowIndex + 1);
  
  // Add ARIA to cells
  const cells = args.row.querySelectorAll('td');
  cells.forEach((cell: any, index: number) => {
    cell.setAttribute('role', 'gridcell');
    cell.setAttribute('aria-colindex', index + 1);
  });
}
```

### Expand/Collapse ARIA

```typescript
template: `
  <ejs-treegrid 
    (rowExpanding)='onRowExpanding($event)'
    (rowCollapsing)='onRowCollapsing($event)'>
    <!-- columns -->
  </ejs-treegrid>
`

onRowExpanding(args: any) {
  const expandBtn = args.row.querySelector('[role="button"]');
  if (expandBtn) {
    expandBtn.setAttribute('aria-expanded', 'true');
    expandBtn.setAttribute('aria-label', `Expand ${args.data.TaskName}`);
  }
}

onRowCollapsing(args: any) {
  const expandBtn = args.row.querySelector('[role="button"]');
  if (expandBtn) {
    expandBtn.setAttribute('aria-expanded', 'false');
    expandBtn.setAttribute('aria-label', `Collapse ${args.data.TaskName}`);
  }
}
```

---

## Keyboard Navigation

### Enable Complete Keyboard Support

```typescript
@Component({
  selector: 'app-treegrid',
  template: `
    <ejs-treegrid 
      #treegrid
      [dataSource]='data'
      [childMapping]='childMapping'
      >
      <e-columns>
        <e-column field='TaskID' headerText='Task ID' width='90'></e-column>
        <e-column field='TaskName' headerText='Task Name' width='200'></e-column>
      </e-columns>
    </ejs-treegrid>
  `
})
export class AppComponent {
  @ViewChild('treegrid') treegrid!: TreeGridComponent;
  
  public data: Object[] = [];
  public childMapping: string = 'subtasks';
}
```

## Best Practices Summary

1. **ARIA First** - Use semantic HTML and ARIA to describe structure
2. **Keyboard Support** - All functionality must work without mouse
3. **Screen Readers** - Test with actual screen readers, not just assertions

---
