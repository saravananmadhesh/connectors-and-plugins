---
name: responsive-adaptive
description: 'Responsive and adaptive design in Syncfusion Grid: mobile layouts, touch interactions, responsive columns, media queries.'
---

# Responsive and Adaptive Design

## Table of Contents
- [Responsive Overview](#responsive-overview)
- [Mobile Grid Layout](#mobile-grid-layout)
- [Touch Interactions](#touch-interactions)
- [Responsive Columns](#responsive-columns)
- [Stack Mode](#stack-mode)
- [Media Queries](#media-queries)
- [Responsive Examples](#responsive-examples)

## When to Use This Reference

- Make grid responsive on mobile and tablet devices
- Implement adaptive layouts for different screen sizes
- Configure column visibility based on device width
- Handle touch interactions and scrolling
- Ensure usability across all device sizes

## Responsive Overview

The Syncfusion Grid supports responsive design for desktop, tablet, and mobile devices with automatic layout adjustments based on screen size.

### Key Features
- Automatic column hiding on smaller screens
- Touch-friendly interactions (tap, swipe, pinch)
- Stack mode for mobile (vertical layout)
- Responsive toolbar and pagination
- Adaptive filtering and editing

## Mobile Grid Layout

### Enable Responsive Grid

```ts
import { Grid, Page, Edit, Toolbar, Selection } from '@syncfusion/ej2-grids';

Grid.Inject(Page, Edit, Toolbar, Selection);

const data = [
  { OrderID: 10248, CustomerName: 'VINET', OrderDate: new Date(1996, 6, 4), Freight: 32.38, Status: 'Active' },
  { OrderID: 10249, CustomerName: 'TOMSP', OrderDate: new Date(1996, 6, 5), Freight: 11.61, Status: 'Inactive' }
];

const grid = new Grid({
  dataSource: data,
  columns: [
    { field: 'OrderID', headerText: 'Order ID', width: 100, minWidth: 80 },
    { field: 'CustomerName', headerText: 'Customer Name', width: 150, minWidth: 100 },
    { field: 'OrderDate', headerText: 'Order Date', type: 'date', width: 130, minWidth: 100 },
    { field: 'Freight', headerText: 'Freight', type: 'number', format: 'C2', width: 120, minWidth: 80 },
    { field: 'Status', headerText: 'Status', width: 100, minWidth: 80 }
  ],
  allowPaging: true,
  allowSorting: true,
  allowFiltering: true,
  editSettings: { mode: 'Dialog', allowEditing: true },
  toolbar: ['Add', 'Edit', 'Delete', 'Update', 'Cancel'],
  height: '100%'  // Fill parent container
});

grid.appendTo('#grid');
```

### Mobile-First Container

```html
<!DOCTYPE html>
<html>
<head>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    * {
      box-sizing: border-box;
    }
    
    body {
      font-family: Arial, sans-serif;
      margin: 0;
      padding: 10px;
      background-color: #f5f5f5;
    }
    
    .grid-container {
      width: 100%;
      height: 100vh;
      background-color: white;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      overflow: hidden;
    }
    
    /* Tablet (768px and up) */
    @media (min-width: 768px) {
      .grid-container {
        margin: 0 auto;
        max-width: 95%;
      }
    }
    
    /* Desktop (1024px and up) */
    @media (min-width: 1024px) {
      .grid-container {
        max-width: 100%;
      }
    }
  </style>
</head>
<body>
  <div class="grid-container">
    <div id="grid"></div>
  </div>
</body>
</html>
```

## Touch Interactions

### Enable Touch Support

```ts
import { Grid, Page, Selection } from '@syncfusion/ej2-grids';

Grid.Inject(Page, Selection);

const grid = new Grid({
  dataSource: data,
  columns: [
    { field: 'OrderID', headerText: 'Order ID', width: 100 },
    { field: 'CustomerName', headerText: 'Customer Name', width: 150 },
    { field: 'Freight', headerText: 'Freight', width: 120 }
  ],
  allowPaging: true,
  allowSelection: true,
  selectionSettings: { type: 'Multiple', mode: 'Row' },
  rowHeight: 48  // Larger row height for touch
});

grid.appendTo('#grid');

// Touch events
grid.rowSelecting = (args: any) => {
  console.log('Row selected by touch:', args.data);
};

grid.cellClick = (args: any) => {
  console.log('Cell touched:', args);
};
```

### Touch-Friendly Toolbar

```ts
import { Grid, Toolbar, Edit, Page } from '@syncfusion/ej2-grids';

Grid.Inject(Toolbar, Edit, Page);

const grid = new Grid({
  dataSource: data,
  columns: [...],
  editSettings: { mode: 'Dialog', allowEditing: true, allowAdding: true, allowDeleting: true },
  toolbar: [
    { text: 'Add', tooltipText: 'Add new row', prefixIcon: 'e-icons e-plus', id: 'grid_add' },
    { text: 'Edit', tooltipText: 'Edit selected row', prefixIcon: 'e-icons e-edit', id: 'grid_edit' },
    { text: 'Delete', tooltipText: 'Delete selected row', prefixIcon: 'e-icons e-trash', id: 'grid_delete' },
    { text: 'Save', tooltipText: 'Save changes', prefixIcon: 'e-icons e-save', id: 'grid_save' }
  ]
});

grid.appendTo('#grid');
```

### Swipe Actions

```ts
import { Grid, Page } from '@syncfusion/ej2-grids';

Grid.Inject(Page);

const grid = new Grid({
  dataSource: data,
  columns: [...]
});

grid.appendTo('#grid');

// Handle swipe gestures
let touchStartX = 0;

grid.element.addEventListener('touchstart', (e) => {
  touchStartX = e.touches[0].clientX;
});

grid.element.addEventListener('touchend', (e) => {
  const touchEndX = e.changedTouches[0].clientX;
  const diff = touchEndX - touchStartX;
  
  if (diff > 50) {
    // Swiped right
    console.log('Swiped right');
  } else if (diff < -50) {
    // Swiped left
    console.log('Swiped left');
  }
});
```

## Responsive Columns

### Hide Columns on Small Screens

```ts
import { Grid, Page } from '@syncfusion/ej2-grids';

Grid.Inject(Page);

const grid = new Grid({
  dataSource: data,
  columns: [
    { 
      field: 'OrderID', 
      headerText: 'Order ID', 
      width: 100,
      visible: true,
      hideAtMedia: '(max-width: 480px)'  // Hide on mobile
    },
    { 
      field: 'CustomerName', 
      headerText: 'Customer', 
      width: 150,
      visible: true,
      hideAtMedia: '(max-width: 1024px)'  // Hide on tablet and mobile
    },
    { 
      field: 'Freight', 
      headerText: 'Freight', 
      width: 120,
      visible: true,
      minWidth: 100
    },
    { 
      field: 'OrderDate', 
      headerText: 'Date', 
      type: 'date',
      width: 130,
      visible: true,
      hideAtMedia: '(max-width: 768px)'  // Hide on mobile
    }
  ],
  allowPaging: true
});

grid.appendTo('#grid');
```

### Dynamic Column Visibility

```ts
const grid = new Grid({
  dataSource: data,
  columns: [...]
});

grid.appendTo('#grid');

// Check screen size and adjust columns
const handleResize = () => {
  const width = window.innerWidth;
  
  if (width < 480) {
    // Mobile: Show only essential columns
    grid.hideColumns(['OrderDate', 'CustomerName']);
  } else if (width < 768) {
    // Tablet: Show more columns
    grid.hideColumns(['OrderDate']);
    grid.showColumns(['CustomerName']);
  } else {
    // Desktop: Show all columns
    grid.showColumns(['OrderDate', 'CustomerName']);
  }
};

window.addEventListener('resize', handleResize);
handleResize();  // Initial check
```

### Flexible Column Width

```ts
const grid = new Grid({
  dataSource: data,
  columns: [
    { 
      field: 'OrderID', 
      headerText: 'Order ID', 
      width: '20%'  // Percentage width
    },
    { 
      field: 'CustomerName', 
      headerText: 'Customer', 
      width: '30%',
      minWidth: 120  // Minimum width
    },
    { 
      field: 'Freight', 
      headerText: 'Freight', 
      width: '25%',
      minWidth: 100
    },
    { 
      field: 'Status', 
      headerText: 'Status', 
      width: '25%',
      minWidth: 80
    }
  ],
  allowResizing: true,
  allowPaging: true
});

grid.appendTo('#grid');
```

## Stack Mode

### Enable Stack Layout for Mobile

```ts
import { Grid, Page, Edit } from '@syncfusion/ej2-grids';

Grid.Inject(Page, Edit);

const grid = new Grid({
  dataSource: data,
  columns: [
    { field: 'OrderID', headerText: 'Order ID', width: 100 },
    { field: 'CustomerName', headerText: 'Customer Name', width: 150 },
    { field: 'OrderDate', headerText: 'Order Date', type: 'date', width: 130 },
    { field: 'Freight', headerText: 'Freight', type: 'number', format: 'C2', width: 120 },
    { field: 'Status', headerText: 'Status', width: 100 }
  ],
  allowPaging: true,
  editSettings: { mode: 'Dialog', allowEditing: true },
  pageSettings: { pageSize: 10 }
});

grid.appendTo('#grid');

// Enable stack mode for small screens
const handleMobileLayout = () => {
  const width = window.innerWidth;
  
  if (width < 768) {
    // Stack mode CSS
    const style = document.createElement('style');
    style.textContent = `
      .e-grid .e-rowcell {
        display: block;
        width: 100%;
        padding: 12px;
        border-bottom: 1px solid #ddd;
      }
      
      .e-grid .e-headercell {
        display: none;  /* Hide headers in stack mode */
      }
      
      .e-grid .e-rowcell::before {
        content: attr(data-label);
        font-weight: bold;
        display: block;
        margin-bottom: 4px;
      }
    `;
    document.head.appendChild(style);
    
    // Add data-label attributes
    const columnNames = ['Order ID', 'Customer', 'Date', 'Freight', 'Status'];
    grid.columns.forEach((col, idx) => {
      grid.columns[idx].headerTemplate = columnNames[idx];
    });
  }
};

window.addEventListener('resize', handleMobileLayout);
handleMobileLayout();
```

## Media Queries

### Responsive CSS

```css
/* Base styles (Mobile First) */
.e-grid {
  width: 100%;
  overflow-x: auto;  /* Allow horizontal scroll on mobile */
}

.e-grid .e-rowcell {
  padding: 12px 8px;
  font-size: 14px;
}

.e-grid .e-headercell {
  padding: 12px 8px;
  font-size: 13px;
}

/* Tablet (768px and up) */
@media (min-width: 768px) {
  .e-grid .e-rowcell {
    padding: 14px 12px;
    font-size: 13px;
  }
  
  .e-grid .e-headercell {
    padding: 14px 12px;
    font-size: 12px;
  }
}

/* Laptop/Desktop (1024px and up) */
@media (min-width: 1024px) {
  .e-grid {
    overflow-x: visible;
  }
  
  .e-grid .e-rowcell {
    padding: 16px;
    font-size: 13px;
  }
  
  .e-grid .e-headercell {
    padding: 16px;
    font-size: 12px;
    font-weight: bold;
  }
}

/* Extra Large (1440px and up) */
@media (min-width: 1440px) {
  .e-grid-container {
    max-width: 1400px;
    margin: 0 auto;
  }
}
```

## Responsive Examples

### Mobile-Optimized Grid

```ts
import { Grid, Page, Edit, Toolbar, Selection, Sort, Filter } from '@syncfusion/ej2-grids';

Grid.Inject(Page, Edit, Toolbar, Selection, Sort, Filter);

const mobileGrid = new Grid({
  dataSource: data,
  columns: [
    { 
      field: 'OrderID', 
      headerText: 'ID', 
      width: 70,
      hideAtMedia: '(max-width: 480px)'
    },
    { 
      field: 'CustomerName', 
      headerText: 'Customer', 
      width: 150,
      hideAtMedia: '(max-width: 1024px)'
    },
    { 
      field: 'Freight', 
      headerText: 'Freight', 
      type: 'number',
      format: 'C2',
      width: 100,
      minWidth: 80
    },
    { 
      field: 'Status', 
      headerText: 'Status', 
      width: 100,
      minWidth: 80
    }
  ],
  allowPaging: true,
  pageSettings: { pageSize: 15 },
  allowSorting: true,
  allowFiltering: true,
  filterSettings: { type: 'Menu' },
  editSettings: { mode: 'Dialog', allowEditing: true, allowAdding: false, allowDeleting: false },
  toolbar: ['Edit', 'Search'],
  rowHeight: 48,  // Touch-friendly height
  allowSelection: true,
  selectionSettings: { type: 'Single', mode: 'Row' }
});

mobileGrid.appendTo('#mobilegrid');
```

### Tablet-Optimized Grid

```ts
const tabletGrid = new Grid({
  dataSource: data,
  columns: [
    { field: 'OrderID', headerText: 'Order ID', width: 100 },
    { field: 'CustomerName', headerText: 'Customer Name', width: 180 },
    { field: 'OrderDate', headerText: 'Order Date', type: 'date', width: 150 },
    { field: 'Freight', headerText: 'Freight', type: 'number', format: 'C2', width: 120 },
    { field: 'Status', headerText: 'Status', width: 120 }
  ],
  allowPaging: true,
  pageSettings: { pageSize: 20 },
  allowSorting: true,
  allowFiltering: true,
  allowGrouping: true,
  editSettings: { mode: 'Dialog', allowEditing: true, allowAdding: true, allowDeleting: true },
  toolbar: ['Add', 'Edit', 'Delete', 'Update', 'Cancel', 'Search'],
  rowHeight: 44,
  allowSelection: true,
  selectionSettings: { type: 'Multiple', mode: 'Row' }
});

tabletGrid.appendTo('#tabletgrid');
```

### Desktop Grid

```ts
const desktopGrid = new Grid({
  dataSource: data,
  columns: [
    { field: 'OrderID', headerText: 'Order ID', width: 100, allowSorting: true },
    { field: 'CustomerName', headerText: 'Customer Name', width: 200, allowSorting: true },
    { field: 'OrderDate', headerText: 'Order Date', type: 'date', width: 150, allowSorting: true },
    { field: 'Freight', headerText: 'Freight', type: 'number', format: 'C2', width: 120, allowSorting: true },
    { field: 'ShipCity', headerText: 'Ship City', width: 150, hideAtMedia: '(max-width: 768px)' },
    { field: 'Status', headerText: 'Status', width: 120, allowSorting: true }
  ],
  allowPaging: true,
  pageSettings: { pageSize: 25 },
  allowSorting: true,
  allowFiltering: true,
  allowGrouping: true,
  allowSelection: true,
  editSettings: { mode: 'Dialog', allowEditing: true, allowAdding: true, allowDeleting: true },
  toolbar: ['Add', 'Edit', 'Delete', 'Update', 'Cancel', 'Search', 'ExcelExport', 'PdfExport'],
  rowHeight: 40,
  selectionSettings: { type: 'Multiple', mode: 'Row' },
  allowExcelExport: true,
  allowPdfExport: true,
  allowResizing: true,
  allowReordering: true
});

desktopGrid.appendTo('#desktopgrid');
```

### Orientation Change Handling

```ts
import { Grid, Page, Edit } from '@syncfusion/ej2-grids';

Grid.Inject(Page, Edit);

const responsiveGrid = new Grid({
  dataSource: data,
  columns: [...]
});

responsiveGrid.appendTo('#grid');

// Handle orientation change
window.addEventListener('orientationchange', () => {
  const orientation = window.innerWidth > window.innerHeight ? 'landscape' : 'portrait';
  
  if (orientation === 'landscape') {
    responsiveGrid.showColumns(['ShipCity']);
    responsiveGrid.pageSettings.pageSize = 25;
  } else {
    responsiveGrid.hideColumns(['ShipCity']);
    responsiveGrid.pageSettings.pageSize = 10;
  }
  
  responsiveGrid.refresh();
  console.log('Orientation changed to:', orientation);
});
```
