# Clipboard Operations in JavaScript Grid

## Table of Contents
- [Overview](#overview)
- [Copy and Paste](#copy-and-paste)
  - [Copy Selected Cell](#copy-selected-cell)
  - [Copy with Column Headers](#copy-with-column-headers)
  - [Paste from External Source](#paste-from-external-source)
- [Clipboard Events](#clipboard-events)
  - [Before Copy Event](#before-copy-event)
  - [Before Paste Event](#before-paste-event)
- [Custom Clipboard Actions](#custom-clipboard-actions)
  - [Custom Copy Formatter](#custom-copy-formatter)
  - [Smart Paste with Validation](#smart-paste-with-validation)

## When to Use This Reference

- Copy selected cell or row data to clipboard
- Paste data from external sources into grid
- Configure clipboard copy format (plain text, HTML)
- Customize copy behavior for specific columns
- Handle paste operations with data validation

## Overview

Clipboard operations in Syncfusion Grid allow copying and pasting grid data within the grid and between external applications (Excel, Notepad, etc.).

## Copy and Paste

### Copy Selected Cell

```ts
import { Grid, Column, Clipboard, Selection } from '@syncfusion/ej2-grids';

const gridData: object[] = window.gridData;

const grid: Grid = new Grid({
  dataSource: gridData,
  allowSelection: true,
  selectionSettings: { mode: 'Cell', type: 'Multiple' },
  enableClipboard: true,
  allowPaging: true,
  allowSorting: true,
  columns: [
    { field: 'OrderID', headerText: 'Order ID', width: 120 },
    { field: 'CustomerID', headerText: 'Customer ID', width: 150 },
    { field: 'Freight', headerText: 'Freight', width: 120 }
  ],
  clipboardCopy: (args) => {
    console.log('Clipboard copy event', args);
  }
});

grid.appendTo('#Grid');
```

User can select cells and press Ctrl+C to copy selected cells to clipboard.

### Copy with Column Headers

```ts
const grid: Grid = new Grid({
  dataSource: gridData,
  enableClipboard: true,
  allowSelection: true,
  selectionSettings: { mode: 'Row', type: 'Multiple' },
  clipboardSettings: {
    copyWithHeader: true
  },
  columns: [/* ... */]
});

grid.appendTo('#Grid');
```

This includes the column headers when performing Ctrl+C.

### Paste from External Source

```ts
const grid: Grid = new Grid({
  dataSource: gridData,
  enableClipboard: true,
  allowPaging: true,
  editSettings: { allowAdding: true, allowEditing: true, allowDeleting: true },
  columns: [/* ... */],
  beforePaste: (args: any) => {
    // args.data is parsed clipboard rows
    console.log('Before paste callback', args.data);
  }
});

grid.appendTo('#Grid');

// To allow pasting custom content from outside (e.g., csv text), handle the document paste event:
window.addEventListener('paste', (evt: ClipboardEvent) => {
  if (!evt.clipboardData) return;
  const raw = evt.clipboardData.getData('text');
  const lines = raw.split('\n').map(line => line.trim()).filter(Boolean);

  const records = lines.map(line => {
    const cells = line.split('\t');
    return {
      OrderID: Number(cells[0]),
      CustomerID: cells[1],
      Freight: parseFloat(cells[2])
    };
  });

  records.forEach(rec => grid.addRecord(rec));
});
```

## Clipboard Events

### Before Copy Event

```ts
function beforeCopyHandler(args: any): void {
  console.log('beforeCopy args:', args);
  // Enforce copy only for selected rows, transform data if needed
  if (args.data) {
    args.data = args.data.map((item: any) => {
      return { ...item, Status: (item as any).Status?.toUpperCase() };
    });
  }
}

const grid: Grid = new Grid({
  dataSource: gridData,
  enableClipboard: true,
  selectionSettings: { mode: 'Row', type: 'Multiple' },
  beforeCopy: beforeCopyHandler,
  columns: [/* ... */]
});

grid.appendTo('#Grid');
```

### Before Paste Event

```ts
function beforePasteHandler(args: any): void {
  console.log('beforePaste args:', args);
  // args.data includes transformed clipboard rows
  const sanitized = args.data.filter((row: any) => !!row.OrderID);
  args.data = sanitized;
}

const grid: Grid = new Grid({
  dataSource: gridData,
  enableClipboard: true,
  editSettings: { allowAdding: true, allowEditing: true },
  beforePaste: beforePasteHandler,
  columns: [/* ... */]
});

grid.appendTo('#Grid');
```

## Custom Clipboard Actions

### Custom Copy Formatter

```ts
function customBeforeCopy(args: any): void {
  args.data = args.data.map((dataItem: any) => {
    return {
      ...dataItem,
      Freight: `$${parseFloat(dataItem.Freight).toFixed(2)}`,
      OrderDate: new Date(dataItem.OrderDate).toLocaleDateString()
    };
  });
}

const grid: Grid = new Grid({
  dataSource: gridData,
  enableClipboard: true,
  beforeCopy: customBeforeCopy,
  columns: [/* ... */]
});

grid.appendTo('#Grid');
```

### Smart Paste with Validation

```ts
function smartBeforePaste(args: any): void {
  const parsed = (args.data as any[]).map((item: any) => {
    const orderID = Number(item.OrderID);
    if (isNaN(orderID) || !item.CustomerID) {
      throw new Error('Invalid row detected: OrderID and CustomerID required');
    }
    return {
      OrderID: orderID,
      CustomerID: String(item.CustomerID),
      Freight: Number(item.Freight) || 0
    };
  });

  args.data = parsed;
}

const grid: Grid = new Grid({
  dataSource: gridData,
  enableClipboard: true,
  editSettings: { allowAdding: true, allowEditing: true },
  beforePaste: smartBeforePaste,
  columns: [/* ... */]
});

grid.appendTo('#Grid');
```

## Notes

- Add `Clipboard` service to the Grid module configuration when using dependency injection or frameworks.
- Use `grid.copy()`, `grid.paste()` methods for explicit programmatic actions when appropriate.
- For full compatibility with Excel and other apps, ensure `copyWithHeader` setting is true.
