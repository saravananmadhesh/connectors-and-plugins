---
name: global-local
description: 'Global and local configuration in Syncfusion Grid: grid-level settings, column-specific configuration, configuration precedence.'
---

# Global and Local Configuration

## Table of Contents
- [Overview](#overview)
- [Global Settings](#global-settings)
- [Local Column Configuration](#local-column-configuration)
- [Configuration Precedence](#configuration-precedence)

## When to Use This Reference

- Configure language and localization settings globally
- Apply culture-specific number and date formatting
- Set local overrides for specific grid instances
- Manage multi-language support in grids
- Customize locale-specific behaviors and labels

## Overview

Grid configuration can be set globally on the grid component or locally on individual columns. Local settings override global settings.

## Global Settings

### Grid-Level Configuration

Global settings apply to all columns:

```ts
import { Grid, Page, Sort, Filter, Group } from '@syncfusion/ej2-grids';

Grid.Inject(Page, Sort, Filter, Group);

const data = [
  { OrderID: 10248, CustomerID: 'VINET', Freight: 32.38 },
  { OrderID: 10249, CustomerID: 'TOMSP', Freight: 11.61 }
];

const globalConfig = {
  allowSorting: true,
  allowFiltering: true,
  allowGrouping: true,
  allowSelection: true,
  allowPaging: true,
  pageSettings: { pageSize: 12 },
  height: '500px',
  width: '100%'
};

const grid = new Grid({
  dataSource: data,
  columns: [
    { field: 'OrderID', headerText: 'Order ID', width: 100 },
    { field: 'CustomerID', headerText: 'Customer', width: 120 },
    { field: 'Freight', headerText: 'Freight', width: 100 }
  ],
  ...globalConfig
});

grid.appendTo('#grid');
```

### Common Global Properties

```ts
const globalSettings = {
  // Selection settings
  allowSelection: true,
  selectionSettings: { type: 'Multiple', mode: 'Row' },

  // Sorting settings
  allowSorting: true,
  allowMultiSorting: true,
  sortSettings: { columns: [] },

  // Filtering settings
  allowFiltering: true,
  filterSettings: { type: 'FilterBar' },

  // Grouping settings
  allowGrouping: true,
  groupSettings: { showDropArea: true },

  // Paging
  allowPaging: true,
  pageSettings: { pageSize: 12, pageCount: 5 },

  // Display
  height: '500px',
  width: '100%',
  rowHeight: 36,

  // Features
  allowExcelExport: true,
  allowPdfExport: true,
  allowPrinting: true,
  enableVirtualization: true
};

const grid = new Grid({
  dataSource: data,
  columns: [...],
  ...globalSettings
});

grid.appendTo('#grid');
```

## Local Column Configuration

### Column-Level Settings

Settings specific to individual columns:

```ts
const grid = new Grid({
  dataSource: data,
  columns: [
    {
      // Column 1: Sortable, not filterable
      field: 'OrderID',
      headerText: 'Order ID',
      width: 100,
      allowSorting: true,
      allowFiltering: false,
      allowGrouping: false
    },
    {
      // Column 2: Filterable, not sortable
      field: 'CustomerID',
      headerText: 'Customer',
      width: 120,
      allowSorting: false,
      allowFiltering: true,
      allowGrouping: true
    },
    {
      // Column 3: Frozen, not editable
      field: 'OrderDate',
      headerText: 'Order Date',
      width: 130,
      type: 'date',
      isFrozen: true,
      allowEditing: false
    }
  ]
});

grid.appendTo('#grid');
```

### Local Column Priority Settings

```ts
const columns = [
  {
    field: 'Freight',
    headerText: 'Freight',
    width: 100,
    format: 'C2',
    textAlign: 'Right',
    allowSorting: true,
    allowFiltering: true,
    allowEditing: true,
    allowGrouping: true,
    displayAsCheckBox: false,
    visible: true
  }
];

const grid = new Grid({
  dataSource: data,
  columns: columns,
  allowSorting: true,
  allowFiltering: true
});

grid.appendTo('#grid');
```

## Configuration Precedence

### Precedence Order

Local (Column) > Global (Grid) > Defaults

```ts
const grid = new Grid({
  dataSource: data,
  // Global setting: All columns sorting enabled
  allowSorting: true,
  columns: [
    {
      // Uses global sorting: true
      field: 'OrderID',
      headerText: 'Order ID'
    },
    {
      // Overrides global with local sorting: false
      field: 'CustomerID',
      headerText: 'Customer',
      allowSorting: false
    },
    {
      // Uses global sorting: true
      field: 'Freight',
      headerText: 'Freight'
    }
  ]
});

grid.appendTo('#grid');
```

### Configuration Examples

```ts
const grid = new Grid({
  dataSource: data,
  // Global settings
  allowSorting: true,
  allowFiltering: true,
  allowGrouping: true,
  allowSelection: true,
  selectionSettings: { type: 'Multiple', mode: 'Row' },
  pageSettings: { pageSize: 20 },
  height: '500px',
  columns: [
    {
      // Inherits all global settings
      field: 'OrderID',
      headerText: 'Order ID',
      width: 100
    },
    {
      // Local: Sorting disabled, but filtering/grouping enabled (global)
      field: 'CustomerID',
      headerText: 'Customer',
      width: 120,
      allowSorting: false
    },
    {
      // Local: Custom format, frozen
      field: 'Freight',
      headerText: 'Freight',
      width: 100,
      format: 'C2',
      isFrozen: true,
      allowGrouping: false
    },
    {
      // Local: Read-only, not editable
      field: 'OrderDate',
      headerText: 'Order Date',
      type: 'date',
      allowEditing: false,
      allowFiltering: false
    }
  ]
});

grid.appendTo('#grid');
```

### Override Global Settings Per Column

```ts
const columnFields = ['OrderID', 'CustomerID', 'Freight', 'OrderDate'];

const columns = columnFields.map(field => ({
  field: field,
  headerText: field,
  allowSorting: field !== 'InternalNotes',
  allowFiltering: field !== 'InternalID',
  allowGrouping: field !== 'CreatedDate'
}));

const grid = new Grid({
  dataSource: data,
  columns: columns
});

grid.appendTo('#grid');
```

## Advanced Override Patterns

### Dynamic Global Configuration

```ts
import { Grid, Page, Sort, Filter, Group } from '@syncfusion/ej2-grids';

Grid.Inject(Page, Sort, Filter, Group);

const data = [...];
let gridInstance: Grid;

const config = {
  allowSorting: true,
  allowFiltering: true,
  allowGrouping: false,
  pageSize: 20
};

// Create grid with initial config
const grid = new Grid({
  dataSource: data,
  columns: [
    { field: 'OrderID', headerText: 'Order ID', width: 100 },
    { field: 'CustomerID', headerText: 'Customer', width: 120 }
  ],
  allowSorting: config.allowSorting,
  allowFiltering: config.allowFiltering,
  allowGrouping: config.allowGrouping,
  pageSettings: { pageSize: config.pageSize }
});

grid.appendTo('#grid');
gridInstance = grid;

// Dynamically update global settings
function toggleSorting() {
  config.allowSorting = !config.allowSorting;
  gridInstance.allowSorting = config.allowSorting;
}

document.getElementById('toggleSort').addEventListener('click', toggleSorting);
document.getElementById('toggleFilter').addEventListener('click', () => {
  config.allowFiltering = !config.allowFiltering;
  gridInstance.allowFiltering = config.allowFiltering;
});
```

### Conditional Column Configuration

```ts
import { Grid, Page, Sort, Filter, Group, Edit } from '@syncfusion/ej2-grids';

Grid.Inject(Page, Sort, Filter, Group, Edit);

const data = [...];
let userRole = 'viewer'; // 'viewer', 'editor', 'admin'

function getColumnConfig(field: string, role: string) {
  const baseConfig = {
    field: field,
    headerText: field,
    width: 100
  };

  switch(role) {
    case 'viewer':
      return { 
        ...baseConfig, 
        allowEditing: false, 
        allowFiltering: true 
      };
    case 'editor':
      return { 
        ...baseConfig, 
        allowEditing: true, 
        allowFiltering: true, 
        allowSorting: true 
      };
    case 'admin':
      return { 
        ...baseConfig, 
        allowEditing: true, 
        allowFiltering: true, 
        allowSorting: true, 
        allowGrouping: true 
      };
    default:
      return baseConfig;
  }
}

const columnFields = ['OrderID', 'CustomerID', 'Freight'];

const columns = columnFields.map(field => 
  getColumnConfig(field, userRole)
);

const grid = new Grid({
  dataSource: data,
  columns: columns
});

grid.appendTo('#grid');

// Change role and recreate columns
function changeRole(newRole: string) {
  userRole = newRole;
  grid.columns = columnFields.map(field => 
    getColumnConfig(field, userRole)
  );
}
```

### Environment-Based Configuration

```ts
// config.ts
export const gridConfig = {
  development: {
    allowSorting: true,
    allowFiltering: true,
    allowGrouping: true,
    enableVirtualization: false,
    pageSettings: { pageSize: 10 }
  },
  production: {
    allowSorting: true,
    allowFiltering: false,
    allowGrouping: false,
    enableVirtualization: true,
    pageSettings: { pageSize: 50 }
  }
};

export const getGridConfig = () => {
  const env = (process.env.NODE_ENV || 'production') as 'development' | 'production';
  return gridConfig[env];
};

// app.ts
import { Grid } from '@syncfusion/ej2-grids';
import { getGridConfig } from './config';

const config = getGridConfig();

const grid = new Grid({
  dataSource: data,
  columns: [...],
  ...config
});

grid.appendTo('#grid');
```

### Theme-Based Configuration

```ts
import { Grid } from '@syncfusion/ej2-grids';

let theme = 'light';
let gridInstance: Grid;

const themeConfig = {
  light: {
    height: '500px',
    rowHeight: 36
  },
  dark: {
    height: '500px',
    rowHeight: 36
  }
};

const grid = new Grid({
  dataSource: data,
  columns: [...],
  ...themeConfig['light']
});

grid.appendTo('#grid');
gridInstance = grid;

// Switch theme
function switchTheme(newTheme: 'light' | 'dark') {
  theme = newTheme;
  gridInstance.height = themeConfig[newTheme].height;
  
  // Update CSS class
  const gridElement = document.getElementById('grid');
  gridElement?.classList.toggle('dark-theme', theme === 'dark');
  gridElement?.classList.toggle('light-theme', theme === 'light');
}
```

## Best Practices

### Configuration Checklist

1. **Define Global Defaults** - Set common behavior at grid level
2. **Override Selectively** - Use local config only when needed
3. **Document Precedence** - Document which settings override others
4. **Constants for Configs** - Store repeated configs as constants
5. **Lazy Load Complex Configs** - Load heavy configs on demand
6. **Test Precedence** - Verify local settings override globals
7. **Version Control** - Track config changes in git

### Configuration Template

```ts
const defaultGridConfig = {
  // Layout
  height: '600px',
  width: '100%',
  rowHeight: 36,

  // Features
  allowPaging: true,
  allowSorting: true,
  allowFiltering: true,
  allowGrouping: true,
  allowSelection: true,
  allowExcelExport: true,
  allowPdfExport: true,

  // Settings
  pageSettings: { pageSize: 20, pageCount: 5 },
  sortSettings: { columns: [] },
  filterSettings: { type: 'FilterBar' },
  selectionSettings: { type: 'Multiple', mode: 'Row' },

  // Performance
  enableVirtualization: false,
  enableInfiniteScrolling: false
};

export function createGridConfig(overrides: any = {}) {
  return {
    ...defaultGridConfig,
    ...overrides
  };
}

// Usage
const grid = new Grid({
  dataSource: data,
  columns: [...],
  ...createGridConfig({ height: '700px', pageSettings: { pageSize: 50 } })
});

grid.appendTo('#grid');
```

### Configuration Composition

```ts
// base-config.ts
export const baseGridConfig = {
  allowPaging: true,
  pageSettings: { pageSize: 20 },
  height: '500px'
};

// feature-configs.ts
export const sortingConfig = {
  allowSorting: true,
  allowMultiSorting: true
};

export const filteringConfig = {
  allowFiltering: true,
  filterSettings: { type: 'FilterBar' }
};

// app.ts
import { Grid } from '@syncfusion/ej2-grids';
import { baseGridConfig, sortingConfig, filteringConfig } from './configs';

const grid = new Grid({
  dataSource: data,
  columns: [...],
  ...baseGridConfig,
  ...sortingConfig,
  ...filteringConfig
});

grid.appendTo('#grid');
```
