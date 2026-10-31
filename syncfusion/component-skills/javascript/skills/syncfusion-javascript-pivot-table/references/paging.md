# Paging in Pivot View

## ⚠️ SECURITY NOTICE

**Remote data sources MUST use authenticated, configuration-based endpoints.** Never hardcode API URLs.

✅ **Required Security Controls:**
- Configuration-based URLs (environment variables or config files)
- Authentication headers for API requests
- HTTPS/SSL for all remote connections

## Overview

Paging divides large datasets into manageable pages, allowing users to navigate through row and column data page-by-page. This approach improves performance by rendering only the current page instead of the entire dataset, and provides a familiar navigation experience. Paging is ideal when virtual scrolling isn't suitable or when you prefer explicit page-based navigation.

## When to Use

Use paging when you need to:
- Divide data into logical chunks for easy navigation
- Provide explicit "Next/Previous" or page number navigation
- Display page size options to users
- Reduce initial rendering time for large datasets
- Limit memory usage with explicit page boundaries  
- Support older browsers with better performance
- Replace virtual scrolling with a familiar UI pattern

**Note:** Paging and virtual scrolling are mutually exclusive. Use only one at a time.

## Basic Setup

> **⚠️ SECURITY:** Use configuration-based URLs. See security notice at top of document.

**Step 1 — Create configuration file (config.ts):**
```typescript
export const appConfig = {
    apiUrl: process.env.API_URL || 'https://your-api-server.com/api/orders'
};
```

**Step 2 — Enable paging with secure configuration:**

```typescript
import { PivotView, Pager, IDataSet } from '@syncfusion/ej2-pivotview';
import { DataManager, WebApiAdaptor } from '@syncfusion/ej2-data';
import { appConfig } from './config';

PivotView.Inject(Pager);

let remoteData: DataManager = new DataManager({
    url: appConfig.apiUrl,  // Configuration-based URL
    adaptor: new WebApiAdaptor,
    crossDomain: true
});

let pivotObj: PivotView = new PivotView({
    dataSourceSettings: {
        type: 'JSON',
        dataSource: remoteData,
        expandAll: true,
        columns: [{ name: 'ProductName', caption: 'Product Name' }],
        rows: [
            { name: 'ShipCountry', caption: 'Ship Country' },
            { name: 'ShipCity', caption: 'Ship City' }
        ],
        formatSettings: [{ name: 'UnitPrice', format: 'C0' }],
        values: [
            { name: 'Quantity' },
            { name: 'UnitPrice', caption: 'Unit Price' }
        ],
        filters: []
    },
    width: '100%',
    height: 350,
    enablePaging: true,
    pageSettings: {
        rowPageSize: 10,              // Rows per page
        columnPageSize: 5,             // Columns per page
        currentRowPage: 1,             // Starting row page
        currentColumnPage: 1           // Starting column page
    },
    pagerSettings: {
        position: 'Bottom',            // Pager position
        enableCompactView: false,
        showColumnPager: true,
        showRowPager: true,
        columnPageSizes: [5, 10, 20, 50, 100],
        rowPageSizes: [10, 50, 100, 200],
        isInversed: false,
        showColumnPageSize: true,
        showRowPageSize: true
    },
    gridSettings: { columnWidth: 120 }
});

pivotObj.appendTo('#PivotTable');
```

## Pager UI Configuration

The built-in pager UI appears at the bottom by default with navigation controls and page size selectors.

### Pager Position

Position the pager at the top or bottom of the pivot table:

```typescript
let pivotObj: PivotView = new PivotView({
    dataSourceSettings: { /* ... */ },
    enablePaging: true,
    pageSettings: {
        rowPageSize: 10,
        columnPageSize: 5,
        currentColumnPage: 1,
        currentRowPage: 1
    },
    pagerSettings: {
        position: 'Top'  // Place pager above pivot table
    }
});
```

**Options**: `'Top'` or `'Bottom'` (default)

### Inverse Pager Layout

Swap the positions of row and column pagers:

```typescript
pagerSettings: {
    isInversed: true  // Column pager on left, row pager on right
}
```

### Compact View

Display only navigation buttons for minimal space usage:

```typescript
pagerSettings: {
    enableCompactView: true  // Simplified pager UI
}
```

## Customizing Pager Settings

### Configure Page Sizes

Define available page size options:

```typescript
let pivotObj: PivotView = new PivotView({
    dataSourceSettings: { /* ... */ },
    enablePaging: true,
    pageSettings: {
        rowPageSize: 10,
        columnPageSize: 5,
        currentColumnPage: 1,
        currentRowPage: 1
    },
    pagerSettings: {
        // Available row page sizes
        rowPageSizes: [5, 10, 20, 50, 100, 200],
        
        // Available column page sizes
        columnPageSizes: [2, 5, 10, 20, 50],
        
        // Show page size dropdown
        showRowPageSize: true,
        showColumnPageSize: true
    }
});
```

### Hide Pager Controls

Hide specific pager elements:

```typescript
pagerSettings: {
    showRowPager: false,      // Hide row pager
    showColumnPager: true,    // Keep column pager
    showRowPageSize: false,   // Hide row page size selector
    showColumnPageSize: true  // Keep column page size selector
}
```

## Advanced Paging Example

Complete paging setup with customization:

```typescript
import { PivotView, Pager, IDataSet } from '@syncfusion/ej2-pivotview';

PivotView.Inject(Pager);

let pivotObj: PivotView = new PivotView({
    dataSourceSettings: {
        dataSource: largeDataSet as IDataSet[],
        expandAll: true,
        columns: [
            { name: 'Year', caption: 'Production Year' },
            { name: 'Quarter' }
        ],
        rows: [
            { name: 'Country' },
            { name: 'Products' }
        ],
        values: [
            { name: 'Sold', caption: 'Units Sold' },
            { name: 'Amount', caption: 'Sold Amount' }
        ],
        filters: [],
        formatSettings: [
            { name: 'Amount', format: 'C0' }
        ]
    },
    width: '100%',
    height: 350,
    
    // Enable paging
    enablePaging: true,
    
    // Initial page settings
    pageSettings: {
        rowPageSize: 20,              // Show 20 rows per page
        columnPageSize: 10,            // Show 10 columns per page
        currentRowPage: 1,
        currentColumnPage: 1
    },
    
    // Pager customization
    pagerSettings: {
        position: 'Bottom',
        enableCompactView: false,
        showColumnPager: true,
        showRowPager: true,
        isInversed: false,
        showColumnPageSize: true,
        showRowPageSize: true,
        columnPageSizes: [5, 10, 20, 50],
        rowPageSizes: [10, 20, 50, 100]
    },
    
    gridSettings: {
        columnWidth: 120
    }
});

pivotObj.appendTo('#PivotTable');
```

## Programmatic Paging Control

Navigate pages and change settings via code:

```typescript
import { PivotView } from '@syncfusion/ej2-pivotview';

let pivotObj: PivotView;

// Go to specific row page
function goToRowPage(pageNumber: number) {
    pivotObj.pageSettings.currentRowPage = pageNumber;
}

// Go to specific column page
function goToColumnPage(pageNumber: number) {
    pivotObj.pageSettings.currentColumnPage = pageNumber;
}

// Change row page size
function setRowPageSize(size: number) {
    pivotObj.pageSettings.rowPageSize = size;
}

// Change column page size  
function setColumnPageSize(size: number) {
    pivotObj.pageSettings.columnPageSize = size;
}

// Get current page information
function getPagingInfo() {
    return {
        currentRowPage: pivotObj.pageSettings.currentRowPage,
        currentColumnPage: pivotObj.pageSettings.currentColumnPage,
        rowPageSize: pivotObj.pageSettings.rowPageSize,
        columnPageSize: pivotObj.pageSettings.columnPageSize
    };
}

// Add custom navigation buttons
document.getElementById('nextBtn').onclick = () => {
    const current = pivotObj.pageSettings.currentRowPage;
    pivotObj.pageSettings.currentRowPage = current + 1;
};

document.getElementById('prevBtn').onclick = () => {
    const current = pivotObj.pageSettings.currentRowPage;
    if (current > 1) {
        pivotObj.pageSettings.currentRowPage = current - 1;
    }
};
```

## Common Patterns

### Pattern 1: Simple Paging with Standard Sizes

```typescript
let pivotObj: PivotView = new PivotView({
    dataSourceSettings: { /* ... */ },
    enablePaging: true,
    pageSettings: {
        rowPageSize: 10,
        columnPageSize: 5
    },
    pagerSettings: {
        position: 'Bottom'
    }
});
```

### Pattern 2: User-Configurable Paging

```typescript
pagerSettings: {
    rowPageSizes: [5, 10, 25, 50, 100],
    columnPageSizes: [3, 5, 10, 20],
    showRowPageSize: true,
    showColumnPageSize: true,
    enableCompactView: false
}
```

### Pattern 3: Minimal Pager (Compact View)

```typescript
pagerSettings: {
    enableCompactView: true,
    position: 'Top',
    showRowPageSize: false,
    showColumnPageSize: false
}
```

## Paging Events

Handle paging interactions:

```typescript
let pivotObj: PivotView = new PivotView({
    dataSourceSettings: { /* ... */ },
    enablePaging: true,
    
    // Triggered before page change
    resizing: (args) => {
        console.log('Page changing:', args);
    },
    
    // Triggered after page loaded
    dataBound: () => {
        console.log('Page data loaded');
    }
});
```

## API Reference

### Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `enablePaging` | boolean | false | Enables/disables paging feature |
| `pageSettings` | PageSettings | — | Configuration for initial paging state |
| `pagerSettings` | PagerSettings | — | Configuration for pager UI |

### PageSettings Object

| Property | Type | Description |
|----------|------|-------------|
| `currentRowPage` | number | Current row page number (1-based) |
| `currentColumnPage` | number | Current column page number (1-based) |
| `rowPageSize` | number | Number of rows displayed per page |
| `columnPageSize` | number | Number of columns displayed per page |

### PagerSettings Object

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `position` | string | 'Bottom' | Pager position: 'Top' or 'Bottom' |
| `enableCompactView` | boolean | false | Show only navigation buttons |
| `showColumnPager` | boolean | true | Show/hide column pager |
| `showRowPager` | boolean | true | Show/hide row pager |
| `isInversed` | boolean | false | Swap row and column pager positions |
| `showColumnPageSize` | boolean | true | Show column page size selector |
| `showRowPageSize` | boolean | true | Show row page size selector |
| `columnPageSizes` | number[] | [5,10,20,50] | Available column page sizes |
| `rowPageSizes` | number[] | [10,50,100] | Available row page sizes |

## Performance Considerations

**Paging vs. Virtual Scrolling:**

| Aspect | Paging | Virtual Scrolling |
|--------|--------|-------------------|
| User Interaction | Click buttons/pages | Continuous scroll |
| Memory Usage | Very Low | Low-Medium |
| Initial Load | Very Fast | Fast |
| Navigation | Explicit | Implicit |
| Best For | Explicit boundaries | Continuous data |

## Troubleshooting

### Pager Not Appearing

**Problem:** Pager UI doesn't show
- Verify `Pager` module is injected: `PivotView.Inject(Pager)`
- Check that `enablePaging` is set to `true`
- Ensure `pagerSettings` is properly configured

### Page Navigation Not Working

**Problem:** Clicking pager buttons doesn't change pages
- Check `pageSettings` values are valid (currentPage >= 1)
- Verify page size is reasonable for dataset
- Look for JavaScript errors in console

### Performance Still Poor

**Problem:** Paging doesn't improve performance
- Reduce `rowPageSize` and `columnPageSize` values
- Apply data compression alongside paging
- Use server-side paging with remote data

## Best Practices

1. **Choose appropriate page sizes** - Balance visibility with performance
2. **Provide user control** - Show page size dropdown for flexibility
3. **Position thoughtfully** - Top pager for mobile, bottom for desktop
4. **Use compact view sparingly** - Show full controls for typical users
5. **Set reasonable defaults** - Start with 10-20 rows per page
6. **Combine with other features** - Use with filtering for focused analysis
7. **Test with real data** - Verify performance with actual dataset sizes
8. **Consider server-side paging** - For very large remote datasets


