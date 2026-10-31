# Adaptive

## Table of Contents
- [When to Use This Skill](#when-to-use-this-skill)
- [Overview](#overview)
- [Responsive Grid Layout](#responsive-grid-layout)

## When to Use This Skill

Use this skill when you need to:
- **Support mobile devices** — Adapt grid layout for smaller screens and touch interfaces
- **Tablet compatibility** — Optimize grid display for tablet devices
- **Responsive design** — Automatically adjust columns and visibility based on screen size
- **Adaptive UI** — Enable the grid to respond dynamically to viewport changes
- **Minimal width columns** — Configure columns to hide or adjust when space is limited
- **Touch-friendly interaction** — Support tap-based navigation and controls on mobile devices
- **Responsive navigation** — Ensure grid controls and toolbars work on various screen sizes

## Overview

Adaptive mode provides responsive grid layout for mobile and tablet devices. Grid automatically adjusts column visibility and behavior based on screen size.

## Responsive Grid Layout

Enable adaptive/responsive mode:

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-adaptive-grid',
  template: `
    <p style="padding: 10px; color: #666;">
      Resize browser or view on mobile to see adaptive behavior
    </p>
    <div class="e-bigger">
      <ejs-grid [dataSource]="data" 
                [enableAdaptiveUI]="true"
                [allowPaging]="true"
                height="400">
        <e-columns>
          <e-column field="OrderID" headerText="Order ID" width="100" minWidth="50"></e-column>
          <e-column field="CustomerName" headerText="Customer Name" width="150" minWidth="80"></e-column>
          <e-column field="ShipCity" headerText="Ship City" width="150" minWidth="80"></e-column>
          <e-column field="Freight" headerText="Freight" type="number" format="C2" width="120" minWidth="60"></e-column>
        </e-columns>
      </ejs-grid>
    </div>
  `
})
export class AdaptiveGridComponent {
  data = [
    { OrderID: 10248, CustomerName: 'VINET', ShipCity: 'Reims', Freight: 32.38 },
    { OrderID: 10249, CustomerName: 'TOMSP', ShipCity: 'München', Freight: 11.61 },
    { OrderID: 10250, CustomerName: 'HANAR', ShipCity: 'Rio de Janeiro', Freight: 65.83 },
    { OrderID: 10251, CustomerName: 'VICTE', ShipCity: 'Rio de Janeiro', Freight: 41.34 }
  ];
}
```
