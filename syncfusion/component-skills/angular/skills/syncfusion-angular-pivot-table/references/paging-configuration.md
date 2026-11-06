# Paging Configuration

## ⚠️ SECURITY NOTICE

When using server-side paging with remote APIs, **always use trusted, authenticated endpoints**. See [core-concepts.md Security Best Practices](./core-concepts.md#security-best-practices) for comprehensive security guidelines.

## Table of Contents
- [Overview](#overview)
- [Basic Setup](#basic-setup)
- [Page Settings](#page-settings)
- [Pager UI Configuration](#pager-ui-configuration)
- [Custom Paging](#custom-paging)
- [Performance & Limits](#performance--limits)

---

## Overview

Paging divides large datasets into manageable pages, improving performance and user experience. Instead of rendering all 100,000 rows at once, paging shows only visible rows on demand. The pivot table supports both row-based and column-based paging.

**When to Use:**
- Large datasets (10K+ rows)
- Limited memory environments
- Smoother user experience
- Bandwidth optimization
- Server-side processing scenarios

---

## Basic Setup

### Enable Paging

```typescript
import { Component, OnInit } from '@angular/core';
import { PivotViewModule, PagerService } from '@syncfusion/ej2-angular-pivotview';
import { PageSettingsModel } from '@syncfusion/ej2-pivotview';

@Component({
  imports: [PivotViewModule],
  providers: [PagerService],  // REQUIRED
  selector: 'app-pivot-grid',
  template: `
    <ejs-pivotview
      #pivotview
      id='PivotView'
      [dataSourceSettings]="dataSourceSettings"
      [enablePaging]="true"
      [pageSettings]="pageSettings"
      [height]="'500px'"
      [width]="'100%'">
    </ejs-pivotview>
  `
})
export class PivotGridComponent implements OnInit {
  public dataSourceSettings: any;
  public pageSettings: PageSettingsModel;

  ngOnInit(): void {
    this.dataSourceSettings = {
      dataSource: [
        { Country: 'USA', Amount: 100 },
        { Country: 'Canada', Amount: 80 }
        // ... thousands more records
      ],
      rows: [{ name: 'Country' }],
      values: [{ name: 'Amount', type: 'Sum' }]
    };

    // Configure paging
    this.pageSettings = {
      rowPageSize: 10,         // Rows per page
      columnPageSize: 5,       // Columns per page
      currentRowPage: 1,       // Start at page 1
      currentColumnPage: 1
    };
  }
}
```

**Important:** PagerService must be injected or pager UI won't appear.

---

## Page Settings

### Configuration Properties

```typescript
import { PageSettingsModel } from '@syncfusion/ej2-angular-pivotview';

public pageSettings: PageSettingsModel = {
  // Row paging
  rowPageSize: 10,            // Records per row page (default: 10)
  currentRowPage: 1,          // Current row page (1-based index)
  
  // Column paging
  columnPageSize: 5,          // Columns per column page (default: 5)
  currentColumnPage: 1        // Current column page
};
```

### Understanding Row vs Column Paging

```
ROW PAGING (Vertical):
┌─────────────────────────────┐
│ Page 1: Rows 1-10           │  <- Users see first 10 rows
├─────────────────────────────┤
│ [ prev ]  Page 1 of 50  [next] │  <- Navigation controls
└─────────────────────────────┘

COLUMN PAGING (Horizontal):
┌─────────────────────────────┐
│ Page 1 of 5                 │
│ (Columns 1-5)               │
│ [ prev ]  [next ]            │
└─────────────────────────────┘

Both pages work independently:
User can be on row page 2, column page 3 simultaneously
```

### Dynamic Page Size Changes

```typescript
@Component({
  template: `
    <ejs-pivotview
      [pageSettings]="pageSettings"
      (dataBound)="onDataBound()">
    </ejs-pivotview>
    <button (click)="changePageSize(25)">Show 25 rows</button>
  `
})
export class PivotGridComponent {
  public pageSettings: PageSettingsModel;

  changePageSize(size: number): void {
    this.pageSettings = {
      ...this.pageSettings,
      rowPageSize: size,
      currentRowPage: 1  // Reset to first page
    };
  }

  onDataBound(): void {
    console.log('Current row page:', this.pageSettings.currentRowPage);
    console.log('Page size:', this.pageSettings.rowPageSize);
  }
}
```

---

## Pager UI Configuration

### Pager Settings Properties

```typescript
import { PagerSettingsModel } from '@syncfusion/ej2-angular-pivotview';

@Component({
  template: `
    <ejs-pivotview
      [enablePaging]="true"
      [pagerSettings]="pagerSettings">
    </ejs-pivotview>
  `
})
export class PivotGridComponent implements OnInit {
  public pagerSettings: PagerSettingsModel = {
    // Visibility
    position: 'Bottom',           // 'Top' or 'Bottom'
    showRowPager: true,           // Show row pager
    showColumnPager: true,        // Show column pager
    
    // Layout
    enableCompactView: false,     // Compact layout (fewer buttons)
    isInversed: false,            // Swap row/column pager position
    
    // Page size dropdown
    showRowPageSize: true,        // Show "Rows per page" dropdown
    showColumnPageSize: true,     // Show "Columns per page" dropdown
    rowPageSizes: [10, 20, 50, 100],      // Row page size options
    columnPageSizes: [5, 10, 15, 20],     // Column page size options
    
    // Custom
    template: ''                  // Custom pager HTML template
  };
}
```

### Pager Position

```typescript
// Bottom position (default)
public pagerSettings: PagerSettingsModel = {
  position: 'Bottom'
};

// Top position
public pagerSettings: PagerSettingsModel = {
  position: 'Top'
};

// Both (add second pager)
// Requires custom template implementation
```

### Inverse Pager Layout

```typescript
// Default: Row pager on left, Column pager on right
public pagerSettings: PagerSettingsModel = {
  isInversed: false
  // Row Pager | Column Pager
};

// Inversed: Column pager on left, Row pager on right
public pagerSettings: PagerSettingsModel = {
  isInversed: true
  // Column Pager | Row Pager
};
```

### Compact View

Minimize pager UI for space efficiency:

```typescript
// Full pager
public pagerSettings: PagerSettingsModel = {
  enableCompactView: false
  // Shows: [prev] Page 1 of 50 [next] | Rows per page: [dropdown]
};

// Compact pager
public pagerSettings: PagerSettingsModel = {
  enableCompactView: true
  // Shows only: [prev] [next] (minimal space)
};
```

### Show/Hide Pager Components

```typescript
public pagerSettings: PagerSettingsModel = {
  // Show or hide row pager
  showRowPager: true,       // Default: true
  
  // Show or hide column pager
  showColumnPager: true,    // Default: true
  
  // Show or hide page size selector
  showRowPageSize: true,    // Default: true
  showColumnPageSize: true  // Default: true
};

// Example: Hide page size, keep navigation
public pagerSettings: PagerSettingsModel = {
  showRowPager: true,
  showColumnPager: true,
  showRowPageSize: false,   // Hide "Rows per page" dropdown
  showColumnPageSize: false
};
```

### Customize Page Size Options

```typescript
public pagerSettings: PagerSettingsModel = {
  // Row page sizes
  rowPageSizes: [5, 10, 25, 50, 100],
  
  // Column page sizes
  columnPageSizes: [3, 5, 10, 15]
};

// User sees these options in dropdown:
// Rows per page: [5] [10] [25] [50] [100]
// Columns per page: [3] [5] [10] [15]
```

---

## Custom Paging

### Custom Pager Template

```typescript
@Component({
  template: `
    <ejs-pivotview
      [enablePaging]="true"
      [pagerSettings]="pagerSettings"
      (dataBound)="onDataBound()">
    </ejs-pivotview>
    
    <!-- Custom Pager UI -->
    <div id="rowPagerContainer"></div>
    <div id="columnPagerContainer"></div>
  `
})
export class PivotGridComponent implements OnInit {
  public pagerSettings: PagerSettingsModel = {
    template: 'customPagerTemplate',
    showRowPager: false,      // Disable built-in
    showColumnPager: false
  };

  onDataBound(): void {
    this.renderCustomPager();
  }

  renderCustomPager(): void {
    // Create custom pager elements
    // Update based on current page and total pages
  }
}
```

### Responsive Pager Settings

```typescript
@Component({
  template: `
    <ejs-pivotview
      [enablePaging]="true"
      [pagerSettings]="getResponsivePagerSettings()">
    </ejs-pivotview>
  `
})
export class PivotGridComponent {
  getResponsivePagerSettings(): PagerSettingsModel {
    const isMobile = window.innerWidth < 768;
    const isTablet = window.innerWidth < 1024;

    return {
      position: 'Bottom',
      showRowPager: true,
      showColumnPager: !isMobile,      // Hide on mobile
      showRowPageSize: !isMobile,      // Hide on mobile
      showColumnPageSize: !isMobile,
      enableCompactView: isMobile,     // Compact on mobile
      rowPageSizes: isMobile ? [5, 10] : [10, 20, 50, 100],
      columnPageSizes: isMobile ? [3, 5] : [5, 10, 15, 20]
    };
  }
}
```

---

## Performance & Limits

### Page Size Recommendations

| Dataset Size | Recommended Row Page Size | Recommended Column Page Size | Notes |
|--------------|---------------------------|------------------------------|-------|
| <1,000 rows | No paging | No paging | Fast enough without paging |
| 1,000-10,000 | 20-50 | 5-10 | Good balance |
| 10,000-100,000 | 50-100 | 10-20 | Moderate load |
| 100,000+ | 100-200 | 20+ | May need server-side processing |

### Performance Tuning

```typescript
@Component({
  template: `
    <ejs-pivotview
      [enablePaging]="true"
      [pageSettings]="pageSettings"
      [enableVirtualization]="true"
      [allowDataCompression]="true"
      [allowSinglePage]="false">
    </ejs-pivotview>
  `
})
export class PivotGridComponent implements OnInit {
  public pageSettings: PageSettingsModel = {
    rowPageSize: 100,        // Larger pages for fewer loads
    columnPageSize: 20
  };
  
  ngOnInit(): void {
    // Use virtual scrolling WITH paging for best performance
    // Use data compression to reduce duplicate records
  }
}
```

### Paging with Server-Side Processing

```typescript
@Component({
  template: `
    <ejs-pivotview
      [dataSourceSettings]="dataSourceSettings"
      [enablePaging]="true"
      [pageSettings]="pageSettings"
      (beforeServiceInvoke)="onBeforeService($event)">
    </ejs-pivotview>
  `
})
export class PivotGridComponent implements OnInit {
  public dataSourceSettings: any = {
    mode: 'Server',
    url: 'https://your-api.com/pivot',
    rows: [{ name: 'Country' }],
    columns: [{ name: 'Product' }],
    values: [{ name: 'Amount' }]
  };

  public pageSettings: PageSettingsModel = {
    rowPageSize: 50,
    columnPageSize: 10
  };

  onBeforeService(args: any): void {
    // Server receives page info in request
    // Server returns only the requested page
    // Reduces network traffic significantly
  }
}
```

---

## Common Scenarios

### Large Report with Paging

```typescript
public dataSourceSettings: any = {
  dataSource: largeDataset,  // 500K+ records
  rows: [{ name: 'Year' }, { name: 'Country' }],
  columns: [{ name: 'Product' }, { name: 'Quarter' }],
  values: [{ name: 'Amount' }]
};

public pageSettings: PageSettingsModel = {
  rowPageSize: 50,
  columnPageSize: 15,
  currentRowPage: 1,
  currentColumnPage: 1
};

public pagerSettings: PagerSettingsModel = {
  position: 'Bottom',
  showRowPager: true,
  showColumnPager: true,
  rowPageSizes: [25, 50, 100, 200],
  columnPageSizes: [10, 15, 20, 30]
};

// Users see first 50 rows × 15 columns only
// Can navigate through pages smoothly
```

### Mobile-Optimized Paging

```typescript
public pagerSettings: PagerSettingsModel = {
  position: 'Top',              // Easy access on mobile
  enableCompactView: true,      // Minimal space
  showRowPager: true,
  showColumnPager: false,       // Hide column pager
  showRowPageSize: true,
  showColumnPageSize: false,
  rowPageSizes: [5, 10, 20]     // Limited options
};

public pageSettings: PageSettingsModel = {
  rowPageSize: 10,
  columnPageSize: 3   // Very few columns on mobile
};
```

---

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Pager not appearing | Ensure `PagerService` is injected in providers |
| Pager doesn't update | Check `enablePaging` is set to true |
| Page size dropdown missing | Set `showRowPageSize: true` in pagerSettings |
| Can't navigate pages | Verify `currentRowPage` is valid (1-based index) |
| Performance issues | Reduce `rowPageSize` |

---

## Next Steps

- **Server-Side Processing**: Implement server-side paging for huge datasets
- **Custom Templates**: Create branded pager UI
- **Responsive Design**: Adapt paging for different screen sizes
