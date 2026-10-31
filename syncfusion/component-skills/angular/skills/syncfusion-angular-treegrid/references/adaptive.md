---
name: Adaptive
description: 'Adaptive design in Syncfusion Angular TreeGrid - responsive grid layout, mobile optimization, and breakpoint configuration.'
---

# Adaptive Design

Adaptive design makes TreeGrid responsive and mobile-friendly with automatic layout adjustments.

## When to Use

Use adaptive design when you need to:
- **Mobile support** — Make TreeGrid work on phones and tablets
- **Portrait/landscape** — Reflow layout for orientation changes
- **Cross-device consistency** — Work seamlessly on all devices

## Table of Contents
- [Enable Adaptive](#enable-adaptive)
- [Mobile Layout](#mobile-layout)
- [Responsive Breakpoints](#responsive-breakpoints)

## Enable Adaptive

### Responsive Layout

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-treegrid',
  template: `
    <ejs-treegrid 
      [dataSource]='data'
      [childMapping]='childMapping'
      [enableAdaptiveUI]='true'
      [height]='auto'>
      <e-columns>
        <e-column field='TaskID' headerText='Task ID' width='90'></e-column>
        <e-column field='TaskName' headerText='Task Name' width='200'></e-column>
      </e-columns>
    </ejs-treegrid>
  `
})
export class AppComponent {
  public data: Object[] = [];
  public childMapping: string = 'subtasks';
}
```

## Responsive Breakpoints

### Adaptive Columns

```typescript
public data: Object[] = [];

// Adjust columns based on screen size
adjustColumns() {
  if (window.innerWidth < 768) {
    // Show only essential columns on mobile
  }
}
```

### CSS Media Queries

```css
@media (max-width: 768px) {
  .e-treegrid {
    font-size: 12px;
  }
  
  .e-treegrid .e-columnheader {
    height: 40px;
  }
}
```
