# Responsive Design in Angular Grid

## Table of Contents
- [When to Use This Skill](#when-to-use-this-skill)
- [Overview](#overview)
- [Adaptive Grid](#adaptive-grid)
- [Mobile Optimization](#mobile-optimization)
- [Column Visibility](#column-visibility)
- [Touch Interactions](#touch-interactions)
- [Breakpoints](#breakpoints)
- [Responsive Examples](#responsive-examples)

## When to Use This Skill

Use this skill when you need to:
- **Mobile-friendly grids** — Optimize grid for mobile and tablet devices
- **Adaptive layouts** — Automatically adjust layout based on screen size
- **Column visibility** — Hide columns on small screens
- **Touch support** — Support touch interactions on mobile devices
- **Responsive columns** — Change column widths for different breakpoints
- **Multi-device support** — Build grids that work on desktop, tablet, mobile
- **Accessibility on mobile** — Ensure keyboard and screen reader support on mobile

## Overview

Syncfusion Grid provides built-in responsive features for mobile and desktop devices, automatically adjusting layout and interactions based on screen size.

---

## Adaptive Grid

### Enable Adaptive UI

```typescript
import { Component } from '@angular/core';
import { FilterService, SortService, EditService, ToolbarService } from '@syncfusion/ej2-angular-grids';

@Component({
  selector: 'app-grid',
  template: `
    <ejs-grid [dataSource]="data"
              [enableAdaptiveUI]="true"
              [allowFiltering]="true"
              [allowSorting]="true"
              [allowPaging]="true"
              [editSettings]="{ mode: 'Dialog', allowEditing: true }">
      <e-columns>
        <e-column field="OrderID" headerText="Order ID" width="150" [isPrimaryKey]="true"></e-column>
        <e-column field="CustomerID" headerText="Customer" width="150"></e-column>
        <e-column field="Freight" headerText="Freight" width="150" format="C2"></e-column>
      </e-columns>
    </ejs-grid>
  `,
  providers: [FilterService, SortService, EditService, ToolbarService]
})
export class GridComponent {
  data = [];
}
```

### Adaptive Dialog vs Inline

```typescript
// In component template
<ejs-grid
  [dataSource]="data"
  [enableAdaptiveUI]="true"
  [editSettings]="editSettings"
>
  <!-- Automatically adapts dialogs -->
</ejs-grid>

// In component class
export class AdaptiveGridComponent {
  editSettings: any = {
    mode: 'Dialog',  // Dialogs become full-screen on mobile
    allowEditing: true
  };
}
```

### Vertical Row Rendering

Display rows vertically on mobile:

```typescript
import { Component, ViewChild } from '@angular/core';
import { GridComponent, ColumnsDirective, ColumnDirective, Inject, Page } from '@syncfusion/ej2-angular-grids';

@Component({
  selector: 'app-vertical-grid',
  template: `
    <ejs-grid
      [dataSource]="data"
      [enableAdaptiveUI]="true"
      rowRenderingMode="Vertical"
    >
      <e-columns>
        <e-column field="OrderID" headerText="Order ID" width="150"></e-column>
        <e-column field="CustomerID" headerText="Customer ID" width="150"></e-column>
        <e-column field="Freight" headerText="Freight" width="150"></e-column>
      </e-columns>
    </ejs-grid>
  `,
  providers: [Page]
})
export class VerticalGridComponent {
  data: any[] = [];
}
```

## Mobile Optimization

### Responsive Grid with Media Queries

```typescript
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-grid',
  template: `
    <ejs-grid [dataSource]="data"
              [enableAdaptiveUI]="isMobile"
              [height]="isMobile ? '100vh' : '600px'">
      <e-columns>
        <e-column field="OrderID" headerText="Order ID" width="100"></e-column>
        <e-column field="CustomerID" headerText="Customer" [width]="isMobile ? '150' : '120'"></e-column>
      </e-columns>
    </ejs-grid>
  `
})
export class GridComponent implements OnInit, OnDestroy {
  data = [];
  isMobile = window.innerWidth < 768;
  resizeListener: any;

  ngOnInit() {
    this.resizeListener = this.handleResize.bind(this);
    window.addEventListener('resize', this.resizeListener);
  }

  ngOnDestroy() {
    window.removeEventListener('resize', this.resizeListener);
  }

  handleResize() {
    this.isMobile = window.innerWidth < 768;
  }
}
```

### Touch-Optimized Rows

```typescript
const mobileStyles = `
  @media (max-width: 768px) {
    .e-grid .e-row {
      height: 44px;  /* Touch-friendly row height */
    }
    
    .e-grid .e-gridcontent td {
      padding: 12px 8px;  /* Larger touch targets */
    }
    
    .e-grid button {
      min-width: 48px;  /* iOS touch recommendation */
      min-height: 48px;
    }
  }
`;

<style>{mobileStyles}</style>
<ejs-grid [dataSource]="data}>
  <!-- columns -->
</ejs-grid>
```

### Hide Secondary Columns on Mobile

```typescript
import { Component, ViewChild, OnInit } from '@angular/core';
import { GridComponent } from '@syncfusion/ej2-angular-grids';

@Component({
  selector: 'app-hide-secondary-columns',
  template: `<ejs-grid #grid
    [dataSource]="data"
    [enableAdaptiveUI]="true">
    <e-columns>
      <e-column field="OrderID" headerText="Order ID" width="100"></e-column>
      <e-column 
        field="CustomerID" 
        headerText="Customer" 
        width="100"
        hideAtMedia="(max-width: 768px)"></e-column>
      <e-column 
        field="OrderDate" 
        headerText="Date" 
        width="100"
        hideAtMedia="(max-width: 600px)"></e-column>
      <e-column field="Freight" headerText="Freight" width="100"></e-column>
    </e-columns>
  </ejs-grid>`
})
export class GridHideSecondaryColumnsComponent implements OnInit {
  @ViewChild('grid') gridInstance: GridComponent;
  data: any[] = [];

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    // Load grid data
  }
}
```

## Column Visibility

### Show/Hide Columns Based on Screen Size

```typescript
import { Component, OnInit, OnDestroy } from '@angular/core';
import { GridComponent } from '@syncfusion/ej2-angular-grids';

@Component({
  selector: 'app-responsive-columns',
  template: `
    <ejs-grid [dataSource]="data">
      <e-columns>
        <e-column field="OrderID" [hidden]="!isColumnVisible('OrderID')"></e-column>
        <e-column field="CustomerID" [hidden]="!isColumnVisible('CustomerID')"></e-column>
        <e-column field="OrderDate" [hidden]="!isColumnVisible('OrderDate')"></e-column>
        <e-column field="Freight" [hidden]="!isColumnVisible('Freight')"></e-column>
        <e-column field="Status" [hidden]="!isColumnVisible('Status')"></e-column>
      </e-columns>
    </ejs-grid>
  `
})
export class ResponsiveColumnsComponent implements OnInit, OnDestroy {
  screenSize: number = window.innerWidth;
  data: any[] = [];
  private resizeListener: any;

  ngOnInit() {
    this.resizeListener = window.addEventListener('resize', () => {
      this.screenSize = window.innerWidth;
    });
  }

  isColumnVisible(columnName: string): boolean {
    if (this.screenSize < 600) {
      return ['OrderID', 'Freight'].includes(columnName);  // Mobile: essential columns only
    } else if (this.screenSize < 1024) {
      return ['OrderID', 'CustomerID', 'Freight'].includes(columnName);  // Tablet
    } else {
      return ['OrderID', 'CustomerID', 'OrderDate', 'Freight', 'Status'].includes(columnName);  // Desktop
    }
  }

  ngOnDestroy() {
    window.removeEventListener('resize', this.resizeListener as any);
  }
}
```

### Column Chooser for Mobile

```typescript
import { Component, ViewChild, OnInit } from '@angular/core';
import { GridComponent, ColumnChooser } from '@syncfusion/ej2-angular-grids';

@Component({
  selector: 'app-column-chooser-mobile',
  template: `<ejs-grid #grid
    [dataSource]="data"
    [enableAdaptiveUI]="true"
    [toolbar]="['ColumnChooser']"
    [showColumnChooser]="true">
    <e-columns>
      <e-column field="OrderID" headerText="Order ID" width="100"></e-column>
      <e-column field="CustomerID" headerText="Customer" width="120"></e-column>
      <e-column field="OrderDate" headerText="Date" width="100"></e-column>
      <e-column field="Freight" headerText="Freight" width="100"></e-column>
    </e-columns>
  </ejs-grid>`,
  providers: [ColumnChooser]
})
export class GridColumnChooserMobileComponent implements OnInit {
  @ViewChild('grid') gridInstance: GridComponent;
  data: any[] = [];

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    // Load grid data
  }
}
```

---

## Touch Interactions

### Touch-Friendly Selection

```typescript
import { Component, ViewChild, OnInit } from '@angular/core';
import { GridComponent, ColumnsDirective, ColumnDirective } from '@syncfusion/ej2-angular-grids';

@Component({
  selector: 'app-touch-friendly-selection',
  template: `<ejs-grid #grid
    [dataSource]="data"
    [allowSelection]="true"
    [selectionSettings]="selectionSettings">
    <e-columns>
      <e-column type='checkbox' width='60'></e-column>  <!-- Easy touch target -->
      <e-column field='OrderID' headerText='Order ID' width='100'></e-column>
      <e-column field='CustomerID' headerText='Customer' width='100'></e-column>
    </e-columns>
  </ejs-grid>`
})
export class GridTouchFriendlySelectionComponent implements OnInit {
  @ViewChild('grid') gridInstance: GridComponent;
  data: any[] = [];
  selectionSettings: any = { type: 'Multiple', mode: 'Row', checkboxOnly: true };

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    // Load grid data
  }
}
```

### Swipe Actions (Custom)

```typescript
import { Component, ViewChild, OnInit } from '@angular/core';
import { GridComponent } from '@syncfusion/ej2-angular-grids';

@Component({
  selector: 'app-swipe-actions',
  template: `<ejs-grid #grid [dataSource]="data"></ejs-grid>`
})
export class GridWithSwipeActionsComponent implements OnInit {
  @ViewChild('grid') gridInstance: GridComponent;
  data: any[] = [];
  touchStartX = 0;

  ngOnInit() {
    this.addTouchListeners();
  }

  addTouchListeners() {
    // Attach touch event handlers to grid
  }

  onTouchStart(e: TouchEvent) {
    this.touchStartX = e.touches[0].clientX;
  }

  onTouchEnd(e: TouchEvent) {
    const touchEndX = e.changedTouches[0].clientX;
    const diff = this.touchStartX - touchEndX;

    if (Math.abs(diff) > 50) {  // Swipe threshold
      if (diff > 0) {
        // Swiped left - show delete button
        console.log('Swiped left');
      } else {
        // Swiped right - show more options
        console.log('Swiped right');
      }
    }
  }
}
```

### Long Press for Context Menu

```typescript
import { Component } from '@angular/core';
import { GridComponent } from '@syncfusion/ej2-angular-grids';

@Component({
  selector: 'app-long-press',
  template: `
    <div 
      (mousedown)="onMouseDown()"
      (mouseup)="onMouseUp()"
      (touchstart)="onMouseDown()"
      (touchend)="onMouseUp()">
      <ejs-grid [dataSource]="data" [contextMenuItems]="contextMenuItems">
        <!-- columns -->
      </ejs-grid>
    </div>
  `
})
export class GridWithLongPressComponent {
  data: any[] = [];
  contextMenuItems = ['Copy', 'Edit', 'Delete'];
  private longPressTimer: any;

  onMouseDown() {
    this.longPressTimer = setTimeout(() => {
      // Show context menu
      this.showContextMenu();
    }, 500);  // Long press duration
  }

  onMouseUp() {
    clearTimeout(this.longPressTimer);
  }

  showContextMenu() {
    // Show context menu logic
    console.log('Show context menu');
  }
}
```

---

## Breakpoints

### Device Breakpoints

```typescript
// Standard breakpoints
const breakpoints = {
  mobile: '(max-width: 600px)',      // < 600px
  tablet: '(min-width: 601px) and (max-width: 1024px)',  // 601-1024px
  desktop: '(min-width: 1025px)'     // > 1024px
};
```

### CSS Breakpoint Styles

```css
/* Mobile - small phones */
@media (max-width: 600px) {
  .e-grid {
    font-size: 14px;
  }
  
  .e-grid .e-row {
    height: 48px;
  }
  
  .e-grid .e-gridcontent td {
    padding: 12px 8px;
  }
}

/* Tablet */
@media (min-width: 601px) and (max-width: 1024px) {
  .e-grid {
    font-size: 15px;
  }
  
  .e-grid .e-row {
    height: 40px;
  }
}

/* Desktop */
@media (min-width: 1025px) {
  .e-grid {
    font-size: 14px;
  }
  
  .e-grid .e-row {
    height: 36px;
  }
}
```

---

## Responsive Examples

### Complete Responsive Grid

```typescript
import { Component, OnInit, OnDestroy } from '@angular/core';
import { GridComponent } from '@syncfusion/ej2-angular-grids';

@Component({
  selector: 'app-responsive-grid',
  template: `
    <div class="responsive-grid-container">
      <style>
        @media (max-width: 768px) {
          .responsive-grid-container .e-grid {
            font-size: 13px;
          }
          
          .responsive-grid-container .e-grid .e-row {
            height: 44px;
          }
          
          .responsive-grid-container .e-grid .e-gridcontent td {
            padding: 10px 6px;
          }
        }
      </style>

      <ejs-grid
        [dataSource]="data"
        [enableAdaptiveUI]="isMobile"
        [allowPaging]="true"
        [allowSorting]="true"
        [allowFiltering]="true"
        [editSettings]="editSettings"
        [toolbar]="toolbar"
        [pageSettings]="pageSettings"
        [height]="gridHeight"
      >
        <e-columns>
          <e-column type="checkbox" [width]="isMobile ? '40' : '60'"></e-column>
          <e-column field="OrderID" headerText="Order ID" [width]="isMobile ? '80' : '100'" isPrimaryKey="true"></e-column>
          <e-column field="CustomerID" headerText="Customer" [width]="isMobile ? '100' : '120'"></e-column>
          <e-column field="Freight" headerText="Freight" [width]="isMobile ? '80' : '100'" format="C2"></e-column>
          <e-column field="Status" headerText="Status" [width]="isMobile ? '80' : '100'"></e-column>
        </e-columns>
      </ejs-grid>
    </div>
  `
})
export class ResponsiveOrderGridComponent implements OnInit, OnDestroy {
  isMobile: boolean = window.innerWidth < 768;
  data: any[] = [];
  editSettings: any;
  toolbar: any[];
  pageSettings: any;
  gridHeight: string;
  private resizeListener: any;

  ngOnInit() {
    this.updateResponsiveSettings();
    this.resizeListener = window.addEventListener('resize', () => {
      this.isMobile = window.innerWidth < 768;
      this.updateResponsiveSettings();
    });
  }

  updateResponsiveSettings() {
    this.editSettings = { mode: this.isMobile ? 'Dialog' : 'Inline' };
    this.toolbar = ['Add', 'Edit', 'Delete', 'Update', 'Cancel', 'Search'];
    this.pageSettings = { pageSize: this.isMobile ? 10 : 12 };
    this.gridHeight = this.isMobile ? '100vh' : '600px';
  }

  ngOnDestroy() {
    window.removeEventListener('resize', this.resizeListener as any);
  }
}
```

### Complete Responsive Grid (Updated Template)

```typescript
    <div class='responsive-grid-container'>
      <style>{`
        @media (max-width: 768px) {
          .responsive-grid-container .e-grid {
            font-size: 13px;
          }
          
          .responsive-grid-container .e-grid .e-row {
            height: 44px;
          }
          
          .responsive-grid-container .e-grid .e-gridcontent td {
            padding: 10px 6px;
          }
        }
      `}</style>

      <ejs-grid
        [dataSource]="data"
        [enableAdaptiveUI]="isMobile"
        [allowPaging]="true"
        [allowSorting]="true"
        [allowFiltering]="true"
        [editSettings]="editSettings"
        [toolbar]="toolbar"
        [pageSettings]="pageSettings"
        [height]="gridHeight"
      >
        <e-columns>
          <e-column 
            type="checkbox" 
            [width]="isMobile ? '40' : '60'"
         ></e-column>
          <e-column 
            field="OrderID" 
            headerText="Order ID" 
            [width]="isMobile ? '80' : '100'"
            [isPrimaryKey]="true"
         ></e-column>
          <e-column 
            field="CustomerID" 
            headerText="Customer" 
            [width]="isMobile ? '100' : '120'"
            hideAtMedia="(max-width: 600px)"
         ></e-column>
          <e-column 
            field="Freight" 
            headerText="Freight" 
            [width]="isMobile ? '80' : '100'"
            format="C2"
         ></e-column>
          <e-column 
            field="Status" 
            headerText="Status" 
            [width]="isMobile ? '80' : '100'"></e-column>
        </e-columns>
      </ejs-grid>
    </div>
  `
})
export class CompleteResponsiveGridComponent implements OnInit, OnDestroy {
  isMobile: boolean = window.innerWidth < 768;
  data: any[] = [];
  private resizeListener: any;

  ngOnInit() {
    this.resizeListener = window.addEventListener('resize', () => {
      this.isMobile = window.innerWidth < 768;
    });
  }

  ngOnDestroy() {
    window.removeEventListener('resize', this.resizeListener as any);
  }
}
```

### Horizontal Scroll on Mobile

```typescript
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-horizontal-scroll-grid',
  template: `
    <style>
      @media (max-width: 768px) {
        .e-grid {
          overflow-x: auto;
        }
        
        .e-grid .e-gridheader .e-headercell {
          min-width: 100px;
        }
        
        .e-grid .e-gridcontent td {
          min-width: 100px;
        }
      }
    </style>
    <ejs-grid [dataSource]="data">
      <e-columns>
        <!-- columns -->
      </e-columns>
    </ejs-grid>
  `
})
export class HorizontalScrollGridComponent {
  data: any[] = [];
}
```
