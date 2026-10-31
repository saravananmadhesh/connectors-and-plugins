# Printing in JavaScript Grid

## Table of Contents
- [Overview](#overview)
- [Basic Printing](#basic-printing)
- [Print Configuration](#print-configuration)
- [Print Customization](#print-customization)

## When to Use This Reference

- Configure grid printing and page layouts
- Apply print-specific styling and formatting
- Customize print content and headers/footers
- Print selected rows or filtered data
- Handle print preview and browser print dialogs

## Overview

Print functionality allows users to print grid data with customizable templates, styling, and layout options.

## Basic Printing

### Enable Print

```ts
import { Grid, Toolbar, Print } from '@syncfusion/ej2-grids';

const grid: Grid = new Grid({
  dataSource: data,
  toolbar: ['Print'],
  columns: [
    { field: 'OrderID', headerText: 'Order ID', width: 120 },
    { field: 'CustomerID', headerText: 'Customer ID', width: 150 },
    { field: 'Freight', headerText: 'Freight', width: 120, format: 'C2' }
  ]
});

grid.appendTo('#Grid');
```

### Programmatic Print

```ts
const grid: Grid = new Grid({
  dataSource: data,
  columns: [
    { field: 'OrderID', headerText: 'Order ID', width: 120 },
    { field: 'CustomerID', headerText: 'Customer ID', width: 150 },
    { field: 'Freight', headerText: 'Freight', width: 120, format: 'C2' }
  ]
});

grid.appendTo('#Grid');

const printGrid = (): void => {
  grid.print();
};

document.getElementById('printBtn')?.addEventListener('click', printGrid);
```

## Print Configuration

### Print Specific Columns

```ts
const printSettings: any = {
  columns: ['OrderID', 'CustomerID', 'Freight']
};

grid.print(printSettings);
```

### Print Selected Rows Only

```ts
const printSelected = (): void => {
  const selectedRecords: object[] = grid.getSelectedRecords();
  grid.print({
    dataSource: selectedRecords
  });
};
```

### Print Filtered Data

```ts
const printFiltered = (): void => {
  const filteredData: object[] = grid.getCurrentViewRecords();
  grid.print({
    dataSource: filteredData
  });
};
```

## Print Customization

### Custom Print Template

```ts
const printTemplate = (props: object[]): void => {
  let html: string = '<div class="print-container">';
  html += '<h2>Orders Report</h2>';
  html += '<table>';
  html += '<tr><th>Order ID</th><th>Customer</th><th>Freight</th></tr>';
  
  props.forEach((row: any) => {
    html += `<tr>
      <td>${row.OrderID}</td>
      <td>${row.CustomerID}</td>
      <td>$${row.Freight.toFixed(2)}</td>
    </tr>`;
  });
  
  html += '</table></div>';
};

const printWithTemplate = (): void => {
  grid.print({
    theme: { borders: { borderWidth: 1 } }
  });
};
```

### Print Styling

```ts
const printStyles: string = `
  @media print {
    .e-grid {
      font-family: Arial, sans-serif;
    }
    
    .e-grid .e-table {
      border-collapse: collapse;
    }
    
    .e-grid .e-th, .e-grid .e-td {
      border: 1px solid #000;
      padding: 8px;
    }
    
    .no-print {
      display: none;
    }
  }
`;

const styleElement: HTMLStyleElement = document.createElement('style');
styleElement.textContent = printStyles;
document.head.appendChild(styleElement);
```
