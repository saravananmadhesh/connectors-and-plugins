# TreeMap Levels and Layout in TypeScript and JavaScript

## Table of Contents

- #prerequisites
- #configuring-multiple-hierarchy-levels
  - #how-hierarchy-levels-work
- #group-padding-and-spacing
  - #group-gap
  - #group-padding
  - #leaf-item-gap
- #layout-types
  - #squarified-layout
  - #sliceanddicevertical
  - #sliceanddicehorizontal
  - #sliceanddiceauto
- #header-formatting-and-styling
  - #display-level-headers
  - #header-format-with-data-binding
  - #header-alignment
  - #header-templates
- #header-height-and-styling
  - #custom-header-height
  - #header-text-styling
  - #group-fill-and-border
  - #multi-level-header-styling
- #complete-typescript-example
- #complete-javascript-example
- #best-practices
  - #use-clear-and-descriptive-group-paths
  - #avoid-ambiguous-field-names
  - #match-the-layout-to-the-data
  - #use-appropriate-header-heights
  - #use-group-gap-and-padding-carefully
  - #limit-hierarchy-depth
- #troubleshooting

## Prerequisites

Install the Syncfusion EJ2 TreeMap package.

```bash
npm install @syncfusion/ej2-treemap
```

Add a container element to the HTML page.

```html
<div id="container"></div>
```

Define a visible width and height for the TreeMap container.

```html
<style>
  #container {
    display: block;
    width: 100%;
    height: 520px;
  }
</style>
```

For TypeScript, import the `TreeMap` class from the `@syncfusion/ej2-treemap` package.

```typescript
import { TreeMap } from '@syncfusion/ej2-treemap';
```

Create the TreeMap and append it to the target element.

```typescript
const treemap: TreeMap = new TreeMap({
  dataSource: [],
  weightValuePath: 'Sales'
});

treemap.appendTo('#container');
```

For JavaScript applications that use the EJ2 global script, create the TreeMap through the `ej.treemap` namespace.

```javascript
var treemap = new ej.treemap.TreeMap({
  dataSource: [],
  weightValuePath: 'Sales'
});

treemap.appendTo('#container');
```

## Configuring Multiple Hierarchy Levels

Use the `levels` collection to group flat data into multiple hierarchy levels.

Each level uses `groupPath` to identify the data-source field used for grouping. Define the levels from the outermost group to the innermost group.

The final leaf items are configured through `leafItemSettings`.

### TypeScript

```typescript
import { TreeMap } from '@syncfusion/ej2-treemap';

interface SalesData {
  Continent: string;
  Country: string;
  City: string;
  Sales: number;
}

const data: SalesData[] = [
  {
    Continent: 'Asia',
    Country: 'India',
    City: 'Delhi',
    Sales: 15000
  },
  {
    Continent: 'Asia',
    Country: 'India',
    City: 'Mumbai',
    Sales: 12000
  },
  {
    Continent: 'Asia',
    Country: 'Japan',
    City: 'Tokyo',
    Sales: 11000
  },
  {
    Continent: 'Europe',
    Country: 'Germany',
    City: 'Berlin',
    Sales: 8000
  }
];

const treemap: TreeMap = new TreeMap({
  dataSource: data,
  weightValuePath: 'Sales',
  levels: [
    {
      groupPath: 'Continent'
    },
    {
      groupPath: 'Country'
    }
  ],
  leafItemSettings: {
    labelPath: 'City',
    showLabels: true,
    gap: 4,
    border: {
      color: '#ffffff',
      width: 1
    }
  }
});

treemap.appendTo('#container');
```

### JavaScript

```javascript
var data = [
  {
    Continent: 'Asia',
    Country: 'India',
    City: 'Delhi',
    Sales: 15000
  },
  {
    Continent: 'Asia',
    Country: 'India',
    City: 'Mumbai',
    Sales: 12000
  },
  {
    Continent: 'Asia',
    Country: 'Japan',
    City: 'Tokyo',
    Sales: 11000
  },
  {
    Continent: 'Europe',
    Country: 'Germany',
    City: 'Berlin',
    Sales: 8000
  }
];

var treemap = new ej.treemap.TreeMap({
  dataSource: data,
  weightValuePath: 'Sales',
  levels: [
    {
      groupPath: 'Continent'
    },
    {
      groupPath: 'Country'
    }
  ],
  leafItemSettings: {
    labelPath: 'City',
    showLabels: true,
    gap: 4,
    border: {
      color: '#ffffff',
      width: 1
    }
  }
});

treemap.appendTo('#container');
```

### How Hierarchy Levels Work

In this example:

- Level 0 uses `groupPath: 'Continent'` and creates the outer groups.
- Level 1 uses `groupPath: 'Country'` and creates groups inside each continent.
- `leafItemSettings.labelPath: 'City'` displays the final leaf-item text.
- `weightValuePath: 'Sales'` determines the area occupied by every leaf item.

The order of the `levels` collection is significant.

```typescript
levels: [
  { groupPath: 'Continent' },
  { groupPath: 'Country' }
]
```

Reversing the fields changes the hierarchy.

```typescript
levels: [
  { groupPath: 'Country' },
  { groupPath: 'Continent' }
]
```

Use an order that reflects the logical relationship in the data.

## Group Padding and Spacing

TreeMap provides separate settings for spacing around groups, spacing between grouped items, and spacing between leaf items.

- `groupGap` controls the gap between level items.
- `groupPadding` controls the internal padding of a hierarchy group.
- `leafItemSettings.gap` controls the gap between final leaf items.

### Group Gap

Use `groupGap` in each level to visually separate groups.

#### TypeScript

```typescript
const treemap: TreeMap = new TreeMap({
  dataSource: data,
  weightValuePath: 'Sales',
  levels: [
    {
      groupPath: 'Continent',
      groupGap: 8
    },
    {
      groupPath: 'Country',
      groupGap: 5
    }
  ],
  leafItemSettings: {
    labelPath: 'City',
    gap: 3
  }
});

treemap.appendTo('#container');
```

#### JavaScript

```javascript
var treemap = new ej.treemap.TreeMap({
  dataSource: data,
  weightValuePath: 'Sales',
  levels: [
    {
      groupPath: 'Continent',
      groupGap: 8
    },
    {
      groupPath: 'Country',
      groupGap: 5
    }
  ],
  leafItemSettings: {
    labelPath: 'City',
    gap: 3
  }
});

treemap.appendTo('#container');
```

Use a larger `groupGap` when stronger visual separation is required.

```typescript
levels: [
  {
    groupPath: 'Category',
    groupGap: 10
  }
]
```

Avoid excessively large gaps because they reduce the space available for data rectangles and labels.

### Group Padding

Use `groupPadding` to control the space inside a group boundary.

#### TypeScript

```typescript
const treemap: TreeMap = new TreeMap({
  dataSource: data,
  weightValuePath: 'Sales',
  levels: [
    {
      groupPath: 'Continent',
      groupGap: 8,
      groupPadding: 12
    },
    {
      groupPath: 'Country',
      groupGap: 5,
      groupPadding: 8
    }
  ],
  leafItemSettings: {
    labelPath: 'City',
    gap: 3
  }
});

treemap.appendTo('#container');
```

#### JavaScript

```javascript
var treemap = new ej.treemap.TreeMap({
  dataSource: data,
  weightValuePath: 'Sales',
  levels: [
    {
      groupPath: 'Continent',
      groupGap: 8,
      groupPadding: 12
    },
    {
      groupPath: 'Country',
      groupGap: 5,
      groupPadding: 8
    }
  ],
  leafItemSettings: {
    labelPath: 'City',
    gap: 3
  }
});

treemap.appendTo('#container');
```

Outer levels can use more padding than inner levels to reinforce the hierarchy.

### Leaf Item Gap

Use `leafItemSettings.gap` to separate the final data rectangles.

#### TypeScript

```typescript
leafItemSettings: {
  labelPath: 'City',
  showLabels: true,
  gap: 4,
  border: {
    color: '#ffffff',
    width: 1
  }
}
```

#### JavaScript

```javascript
leafItemSettings: {
  labelPath: 'City',
  showLabels: true,
  gap: 4,
  border: {
    color: '#ffffff',
    width: 1
  }
}
```

Use small leaf gaps when the TreeMap contains many items. Large gaps can make small values difficult to identify.

## Layout Types

Use the `layoutType` property to control how TreeMap rectangles are arranged.

The available layouts are:

- `Squarified`
- `SliceAndDiceVertical`
- `SliceAndDiceHorizontal`
- `SliceAndDiceAuto`

## Squarified Layout

`Squarified` is the default layout. It attempts to produce balanced rectangles based on the available width and height.

### TypeScript

```typescript
const treemap: TreeMap = new TreeMap({
  dataSource: data,
  weightValuePath: 'Sales',
  layoutType: 'Squarified',
  levels: [
    {
      groupPath: 'Continent'
    },
    {
      groupPath: 'Country'
    }
  ],
  leafItemSettings: {
    labelPath: 'City'
  }
});

treemap.appendTo('#container');
```

### JavaScript

```javascript
var treemap = new ej.treemap.TreeMap({
  dataSource: data,
  weightValuePath: 'Sales',
  layoutType: 'Squarified',
  levels: [
    {
      groupPath: 'Continent'
    },
    {
      groupPath: 'Country'
    }
  ],
  leafItemSettings: {
    labelPath: 'City'
  }
});

treemap.appendTo('#container');
```

Use `Squarified` for:

- General-purpose dashboards
- Area comparison
- Datasets containing many values
- Improved label readability
- Containers without a required directional layout

## SliceAndDiceVertical

`SliceAndDiceVertical` arranges items in vertical slices.

### TypeScript

```typescript
const treemap: TreeMap = new TreeMap({
  dataSource: data,
  weightValuePath: 'Sales',
  layoutType: 'SliceAndDiceVertical',
  levels: [
    {
      groupPath: 'Continent'
    },
    {
      groupPath: 'Country'
    }
  ],
  leafItemSettings: {
    labelPath: 'City'
  }
});

treemap.appendTo('#container');
```

### JavaScript

```javascript
var treemap = new ej.treemap.TreeMap({
  dataSource: data,
  weightValuePath: 'Sales',
  layoutType: 'SliceAndDiceVertical',
  levels: [
    {
      groupPath: 'Continent'
    },
    {
      groupPath: 'Country'
    }
  ],
  leafItemSettings: {
    labelPath: 'City'
  }
});

treemap.appendTo('#container');
```

Use `SliceAndDiceVertical` when:

- A vertical arrangement is easier to scan.
- Directional comparison is important.
- A slice-and-dice representation is preferred.
- The resulting narrow rectangles still provide enough space for labels.

## SliceAndDiceHorizontal

`SliceAndDiceHorizontal` arranges items in horizontal slices.

### TypeScript

```typescript
const treemap: TreeMap = new TreeMap({
  dataSource: data,
  weightValuePath: 'Sales',
  layoutType: 'SliceAndDiceHorizontal',
  levels: [
    {
      groupPath: 'Continent'
    },
    {
      groupPath: 'Country'
    }
  ],
  leafItemSettings: {
    labelPath: 'City'
  }
});

treemap.appendTo('#container');
```

### JavaScript

```javascript
var treemap = new ej.treemap.TreeMap({
  dataSource: data,
  weightValuePath: 'Sales',
  layoutType: 'SliceAndDiceHorizontal',
  levels: [
    {
      groupPath: 'Continent'
    },
    {
      groupPath: 'Country'
    }
  ],
  leafItemSettings: {
    labelPath: 'City'
  }
});

treemap.appendTo('#container');
```

Use `SliceAndDiceHorizontal` when:

- A horizontal arrangement is easier to scan.
- The application requires directional grouping.
- The layout provides sufficient height for labels.

## SliceAndDiceAuto

`SliceAndDiceAuto` automatically selects the slicing direction based on the available area.

### TypeScript

```typescript
const treemap: TreeMap = new TreeMap({
  dataSource: data,
  weightValuePath: 'Sales',
  layoutType: 'SliceAndDiceAuto',
  levels: [
    {
      groupPath: 'Continent'
    },
    {
      groupPath: 'Country'
    }
  ],
  leafItemSettings: {
    labelPath: 'City'
  }
});

treemap.appendTo('#container');
```

### JavaScript

```javascript
var treemap = new ej.treemap.TreeMap({
  dataSource: data,
  weightValuePath: 'Sales',
  layoutType: 'SliceAndDiceAuto',
  levels: [
    {
      groupPath: 'Continent'
    },
    {
      groupPath: 'Country'
    }
  ],
  leafItemSettings: {
    labelPath: 'City'
  }
});

treemap.appendTo('#container');
```

`SliceAndDiceAuto` remains a slice-and-dice layout. It adapts the slicing direction to the dimensions available at each level.

## Header Formatting and Styling

Level headers can be configured using the following properties:

- `showHeader`
- `headerFormat`
- `headerAlignment`
- `headerHeight`
- `headerStyle`
- `headerTemplate`
- `fill`
- `border`
- `opacity`

### Display Level Headers

Level headers are displayed by default. Use `showHeader` to control their visibility explicitly.

#### TypeScript

```typescript
levels: [
  {
    groupPath: 'Continent',
    showHeader: true
  },
  {
    groupPath: 'Country',
    showHeader: true
  }
]
```

#### JavaScript

```javascript
levels: [
  {
    groupPath: 'Continent',
    showHeader: true
  },
  {
    groupPath: 'Country',
    showHeader: true
  }
]
```

To hide the header for a specific level:

```typescript
levels: [
  {
    groupPath: 'Continent',
    showHeader: true
  },
  {
    groupPath: 'Country',
    showHeader: false
  }
]
```

The group can still be rendered when its header is hidden.

### Header Format with Data Binding

Use `headerFormat` to customize level-header text.

Field placeholders use the `${FieldName}` syntax.

#### TypeScript

```typescript
const treemap: TreeMap = new TreeMap({
  dataSource: data,
  weightValuePath: 'Sales',
  levels: [
    {
      groupPath: 'Continent',
      headerFormat: '${Continent}'
    },
    {
      groupPath: 'Country',
      headerFormat: '${Country}'
    }
  ],
  leafItemSettings: {
    labelPath: 'City'
  }
});

treemap.appendTo('#container');
```

#### JavaScript

```javascript
var treemap = new ej.treemap.TreeMap({
  dataSource: data,
  weightValuePath: 'Sales',
  levels: [
    {
      groupPath: 'Continent',
      headerFormat: '${Continent}'
    },
    {
      groupPath: 'Country',
      headerFormat: '${Country}'
    }
  ],
  leafItemSettings: {
    labelPath: 'City'
  }
});

treemap.appendTo('#container');
```

Additional static text can be combined with a field placeholder.

```typescript
levels: [
  {
    groupPath: 'Continent',
    headerFormat: 'Continent: ${Continent}'
  },
  {
    groupPath: 'Country',
    headerFormat: 'Country: ${Country}'
  }
]
```

Only use placeholders that correspond to fields available in the bound data.

If calculated or aggregated values are required in a header, prepare the values in the data source before assigning it to the TreeMap.

### Header Alignment

Use `headerAlignment` to position text within a level header.

#### TypeScript

```typescript
levels: [
  {
    groupPath: 'Continent',
    headerFormat: '${Continent}',
    headerAlignment: 'Center'
  }
]
```

#### JavaScript

```javascript
levels: [
  {
    groupPath: 'Continent',
    headerFormat: '${Continent}',
    headerAlignment: 'Center'
  }
]
```

The supported alignment values are:

- `Near`
- `Center`
- `Far`

`Near` is the default alignment.

### Header Templates

Use `headerTemplate` when a header requires custom HTML markup instead of plain formatted text.

#### TypeScript

When a JavaScript or TypeScript template literal is used, escape the TreeMap placeholders so JavaScript does not evaluate them.

```typescript
const treemap: TreeMap = new TreeMap({
  dataSource: data,
  weightValuePath: 'Sales',
  levels: [
    {
      groupPath: 'Continent',
      headerHeight: 38,
      headerTemplate: `
        <div style="
          padding:6px 10px;
          color:#ffffff;
          font-weight:700;
        ">
          \${Continent}
        </div>
      `
    }
  ],
  leafItemSettings: {
    labelPath: 'City'
  }
});

treemap.appendTo('#container');
```

#### JavaScript

```javascript
var treemap = new ej.treemap.TreeMap({
  dataSource: data,
  weightValuePath: 'Sales',
  levels: [
    {
      groupPath: 'Continent',
      headerHeight: 38,
      headerTemplate:
        '<div style="' +
        'padding:6px 10px;' +
        'color:#ffffff;' +
        'font-weight:700;' +
        '">' +
        '${Continent}' +
        '</div>'
    }
  ],
  leafItemSettings: {
    labelPath: 'City'
  }
});

treemap.appendTo('#container');
```

Use `headerFormat` for simple text. Use `headerTemplate` only when custom markup or advanced styling is required.

## Header Height and Styling

### Custom Header Height

Use `headerHeight` to control the vertical space reserved for a level header.

#### TypeScript

```typescript
levels: [
  {
    groupPath: 'Category',
    headerHeight: 50
  }
]
```

#### JavaScript

```javascript
levels: [
  {
    groupPath: 'Category',
    headerHeight: 50
  }
]
```

Use a larger header height when:

- The group name is important.
- The header uses a larger font.
- A custom header template requires additional space.
- The outer level must be visually prominent.

Avoid using large headers for deeply nested levels because they reduce the area available to the leaf items.

### Header Text Styling

Use `headerStyle` to customize level-header text.

#### TypeScript

```typescript
levels: [
  {
    groupPath: 'Region',
    headerFormat: '${Region}',
    fill: '#2563eb',
    headerStyle: {
      color: '#ffffff',
      fontFamily: 'Arial',
      size: '14px',
      fontWeight: '600',
      fontStyle: 'Normal',
      opacity: 1
    }
  }
]
```

#### JavaScript

```javascript
levels: [
  {
    groupPath: 'Region',
    headerFormat: '${Region}',
    fill: '#2563eb',
    headerStyle: {
      color: '#ffffff',
      fontFamily: 'Arial',
      size: '14px',
      fontWeight: '600',
      fontStyle: 'Normal',
      opacity: 1
    }
  }
]
```

Ensure that the header text has enough contrast with the group fill color.

### Group Fill and Border

Use `fill` to customize the level-group background and `border` to define the group boundary.

#### TypeScript

```typescript
levels: [
  {
    groupPath: 'Region',
    fill: '#dbeafe',
    border: {
      color: '#1d4ed8',
      width: 2
    }
  }
]
```

#### JavaScript

```javascript
levels: [
  {
    groupPath: 'Region',
    fill: '#dbeafe',
    border: {
      color: '#1d4ed8',
      width: 2
    }
  }
]
```

A visible border is especially useful when adjacent groups use similar colors.

### Multi-Level Header Styling

Style hierarchy levels differently to distinguish outer and inner groups.

#### TypeScript

```typescript
const treemap: TreeMap = new TreeMap({
  dataSource: data,
  weightValuePath: 'Sales',
  levels: [
    {
      groupPath: 'Continent',
      groupGap: 8,
      groupPadding: 10,
      showHeader: true,
      headerFormat: '${Continent}',
      headerAlignment: 'Center',
      headerHeight: 46,
      fill: '#1d4ed8',
      border: {
        color: '#1e3a8a',
        width: 2
      },
      headerStyle: {
        size: '16px',
        fontWeight: '700',
        color: '#ffffff'
      }
    },
    {
      groupPath: 'Country',
      groupGap: 5,
      groupPadding: 7,
      showHeader: true,
      headerFormat: '${Country}',
      headerAlignment: 'Near',
      headerHeight: 34,
      fill: '#dbeafe',
      border: {
        color: '#93c5fd',
        width: 1
      },
      headerStyle: {
        size: '13px',
        fontWeight: '500',
        color: '#111827'
      }
    }
  ],
  leafItemSettings: {
    labelPath: 'City',
    showLabels: true,
    gap: 4
  }
});

treemap.appendTo('#container');
```

#### JavaScript

```javascript
var treemap = new ej.treemap.TreeMap({
  dataSource: data,
  weightValuePath: 'Sales',
  levels: [
    {
      groupPath: 'Continent',
      groupGap: 8,
      groupPadding: 10,
      showHeader: true,
      headerFormat: '${Continent}',
      headerAlignment: 'Center',
      headerHeight: 46,
      fill: '#1d4ed8',
      border: {
        color: '#1e3a8a',
        width: 2
      },
      headerStyle: {
        size: '16px',
        fontWeight: '700',
        color: '#ffffff'
      }
    },
    {
      groupPath: 'Country',
      groupGap: 5,
      groupPadding: 7,
      showHeader: true,
      headerFormat: '${Country}',
      headerAlignment: 'Near',
      headerHeight: 34,
      fill: '#dbeafe',
      border: {
        color: '#93c5fd',
        width: 1
      },
      headerStyle: {
        size: '13px',
        fontWeight: '500',
        color: '#111827'
      }
    }
  ],
  leafItemSettings: {
    labelPath: 'City',
    showLabels: true,
    gap: 4
  }
});

treemap.appendTo('#container');
```

Outer-level headers are larger and more prominent, while inner-level headers are compact and visually secondary.

## Complete TypeScript Example

The following example combines:

- Two hierarchy levels
- Squarified layout
- Group gaps and padding
- Formatted and styled headers
- Leaf-item labels
- Label-intersection handling
- Explicit TypeScript data types

### index.html

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />

  <meta
    name="viewport"
    content="width=device-width, initial-scale=1.0"
  />

  <title>TreeMap Levels and Layout</title>

  <style>
    body {
      margin: 0;
      padding: 24px;
      background: #f8fafc;
      font-family: Arial, sans-serif;
    }

    h1 {
      margin: 0 0 20px;
      color: #111827;
      font-size: 24px;
    }

    #container {
      display: block;
      width: 100%;
      height: 560px;
      background: #ffffff;
    }
  </style>
</head>
<body>
  <h1>Regional Product Sales</h1>
  <div id="container"></div>
</body>
</html>
```

### index.ts

```typescript
import { TreeMap } from '@syncfusion/ej2-treemap';

interface HierarchicalSalesData {
  Region: string;
  Country: string;
  Product: string;
  Sales: number;
}

const hierarchicalData: HierarchicalSalesData[] = [
  {
    Region: 'Asia',
    Country: 'India',
    Product: 'Software',
    Sales: 15000
  },
  {
    Region: 'Asia',
    Country: 'India',
    Product: 'Services',
    Sales: 9500
  },
  {
    Region: 'Asia',
    Country: 'China',
    Product: 'Hardware',
    Sales: 18000
  },
  {
    Region: 'Asia',
    Country: 'Japan',
    Product: 'Services',
    Sales: 12000
  },
  {
    Region: 'Europe',
    Country: 'Germany',
    Product: 'Services',
    Sales: 12000
  },
  {
    Region: 'Europe',
    Country: 'Germany',
    Product: 'Hardware',
    Sales: 9000
  },
  {
    Region: 'Europe',
    Country: 'France',
    Product: 'Software',
    Sales: 10000
  },
  {
    Region: 'Europe',
    Country: 'Italy',
    Product: 'Hardware',
    Sales: 13000
  }
];

const treemap: TreeMap = new TreeMap({
  dataSource: hierarchicalData,
  weightValuePath: 'Sales',
  layoutType: 'Squarified',

  titleSettings: {
    text: 'Sales by Region, Country, and Product',
    textStyle: {
      color: '#111827',
      size: '18px',
      fontFamily: 'Arial',
      fontWeight: '600'
    }
  },

  levels: [
    {
      groupPath: 'Region',
      groupGap: 8,
      groupPadding: 10,
      showHeader: true,
      headerFormat: '${Region}',
      headerAlignment: 'Center',
      headerHeight: 46,
      fill: '#1d4ed8',
      opacity: 1,
      border: {
        color: '#1e3a8a',
        width: 2
      },
      headerStyle: {
        color: '#ffffff',
        fontFamily: 'Arial',
        size: '16px',
        fontWeight: '700',
        opacity: 1
      }
    },
    {
      groupPath: 'Country',
      groupGap: 5,
      groupPadding: 7,
      showHeader: true,
      headerFormat: '${Country}',
      headerAlignment: 'Near',
      headerHeight: 34,
      fill: '#dbeafe',
      opacity: 1,
      border: {
        color: '#93c5fd',
        width: 1
      },
      headerStyle: {
        color: '#111827',
        fontFamily: 'Arial',
        size: '13px',
        fontWeight: '500',
        opacity: 1
      }
    }
  ],

  leafItemSettings: {
    labelPath: 'Product',
    showLabels: true,
    labelPosition: 'Center',
    interSectAction: 'WrapByWord',
    gap: 4,
    fill: '#0f766e',
    border: {
      color: '#ffffff',
      width: 1
    },
    labelStyle: {
      color: '#ffffff',
      fontFamily: 'Arial',
      size: '12px',
      fontWeight: '600'
    }
  }
});

treemap.appendTo('#container');
```

## Complete JavaScript Example

The following example uses the Syncfusion EJ2 global JavaScript namespace.

Ensure that the required Syncfusion EJ2 theme stylesheet and TreeMap script are loaded before `index.js`.

### index.html

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />

  <meta
    name="viewport"
    content="width=device-width, initial-scale=1.0"
  />

  <title>TreeMap Levels and Layout</title>

  <style>
    body {
      margin: 0;
      padding: 24px;
      background: #f8fafc;
      font-family: Arial, sans-serif;
    }

    h1 {
      margin: 0 0 20px;
      color: #111827;
      font-size: 24px;
    }

    #container {
      display: block;
      width: 100%;
      height: 560px;
      background: #ffffff;
    }
  </style>
</head>
<body>
  <h1>Regional Product Sales</h1>
  <div id="container"></div>

  <script scr="index.js"></script>
</body>
</html>
```

### index.js

```javascript
var hierarchicalData = [
  {
    Region: 'Asia',
    Country: 'India',
    Product: 'Software',
    Sales: 15000
  },
  {
    Region: 'Asia',
    Country: 'India',
    Product: 'Services',
    Sales: 9500
  },
  {
    Region: 'Asia',
    Country: 'China',
    Product: 'Hardware',
    Sales: 18000
  },
  {
    Region: 'Asia',
    Country: 'Japan',
    Product: 'Services',
    Sales: 12000
  },
  {
    Region: 'Europe',
    Country: 'Germany',
    Product: 'Services',
    Sales: 12000
  },
  {
    Region: 'Europe',
    Country: 'Germany',
    Product: 'Hardware',
    Sales: 9000
  },
  {
    Region: 'Europe',
    Country: 'France',
    Product: 'Software',
    Sales: 10000
  },
  {
    Region: 'Europe',
    Country: 'Italy',
    Product: 'Hardware',
    Sales: 13000
  }
];

var treemap = new ej.treemap.TreeMap({
  dataSource: hierarchicalData,
  weightValuePath: 'Sales',
  layoutType: 'Squarified',

  titleSettings: {
    text: 'Sales by Region, Country, and Product',
    textStyle: {
      color: '#111827',
      size: '18px',
      fontFamily: 'Arial',
      fontWeight: '600'
    }
  },

  levels: [
    {
      groupPath: 'Region',
      groupGap: 8,
      groupPadding: 10,
      showHeader: true,
      headerFormat: '${Region}',
      headerAlignment: 'Center',
      headerHeight: 46,
      fill: '#1d4ed8',
      opacity: 1,
      border: {
        color: '#1e3a8a',
        width: 2
      },
      headerStyle: {
        color: '#ffffff',
        fontFamily: 'Arial',
        size: '16px',
        fontWeight: '700',
        opacity: 1
      }
    },
    {
      groupPath: 'Country',
      groupGap: 5,
      groupPadding: 7,
      showHeader: true,
      headerFormat: '${Country}',
      headerAlignment: 'Near',
      headerHeight: 34,
      fill: '#dbeafe',
      opacity: 1,
      border: {
        color: '#93c5fd',
        width: 1
      },
      headerStyle: {
        color: '#111827',
        fontFamily: 'Arial',
        size: '13px',
        fontWeight: '500',
        opacity: 1
      }
    }
  ],

  leafItemSettings: {
    labelPath: 'Product',
    showLabels: true,
    labelPosition: 'Center',
    interSectAction: 'WrapByWord',
    gap: 4,
    fill: '#0f766e',
    border: {
      color: '#ffffff',
      width: 1
    },
    labelStyle: {
      color: '#ffffff',
      fontFamily: 'Arial',
      size: '12px',
      fontWeight: '600'
    }
  }
});

treemap.appendTo('#container');
```

## Best Practices

### Use Clear and Descriptive Group Paths

Use data-source field names that communicate the purpose of each hierarchy level.

#### Recommended

```typescript
levels: [
  {
    groupPath: 'Department'
  },
  {
    groupPath: 'Category'
  },
  {
    groupPath: 'Region'
  }
]
```

```javascript
levels: [
  {
    groupPath: 'Department'
  },
  {
    groupPath: 'Category'
  },
  {
    groupPath: 'Region'
  }
]
```

Clear field names make the hierarchy easier to understand, maintain, and debug.

### Avoid Ambiguous Field Names

Avoid unclear abbreviations.

#### Avoid

```typescript
levels: [
  {
    groupPath: 'D'
  },
  {
    groupPath: 'Cat'
  }
]
```

```javascript
levels: [
  {
    groupPath: 'D'
  },
  {
    groupPath: 'Cat'
  }
]
```

Prefer complete names such as `Department` and `Category`.

### Match the Layout to the Data

Use `Squarified` when balanced rectangles and area comparison are the primary requirements.

```typescript
layoutType: 'Squarified'
```

Use a slice-and-dice layout when directional grouping is more important.

```typescript
layoutType: 'SliceAndDiceVertical'
```

```typescript
layoutType: 'SliceAndDiceHorizontal'
```

Use `SliceAndDiceAuto` when the slicing direction should adapt to the available area.

```typescript
layoutType: 'SliceAndDiceAuto'
```

Test the selected layout with realistic data and at the actual container size. Labels that work in one layout may be truncated in another.

### Use Appropriate Header Heights

Use larger headers for outer levels and more compact headers for inner levels.

```typescript
levels: [
  {
    groupPath: 'Category',
    headerHeight: 46
  },
  {
    groupPath: 'SubCategory',
    headerHeight: 32
  }
]
```

Very large headers reduce the space available for leaf items.

### Use Group Gap and Padding Carefully

Use `groupGap` to separate neighboring groups.

```typescript
levels: [
  {
    groupPath: 'Region',
    groupGap: 8
  }
]
```

Use `groupPadding` to provide internal spacing inside the group.

```typescript
levels: [
  {
    groupPath: 'Region',
    groupPadding: 10
  }
]
```

Use `leafItemSettings.gap` to separate final leaf rectangles.

```typescript
leafItemSettings: {
  labelPath: 'Product',
  gap: 4
}
```

Avoid combining large values for all three settings because they can consume a significant portion of the available rendering area.

### Limit Hierarchy Depth

A concise hierarchy is easier to scan.

```typescript
levels: [
  {
    groupPath: 'Region'
  },
  {
    groupPath: 'Country'
  },
  {
    groupPath: 'Category'
  }
]
```

Three levels are often easier to understand than a deeply nested hierarchy. Add more levels only when the relationships remain clear and the TreeMap has sufficient rendering space.

## Troubleshooting

### Groups Are Not Displayed

Confirm that:

1. `levels` contains at least one configuration object.
2. Every `groupPath` matches a field in the data source.
3. The field name uses the correct letter casing.
4. Group fields contain valid values.
5. `weightValuePath` points to a numeric field.

```typescript
const data = [
  {
    Region: 'Asia',
    Country: 'India',
    Sales: 15000
  }
];

const treemap: TreeMap = new TreeMap({
  dataSource: data,
  weightValuePath: 'Sales',
  levels: [
    {
      groupPath: 'Region'
    },
    {
      groupPath: 'Country'
    }
  ]
});
```

### Header Is Not Displayed

Confirm that `showHeader` is not set to `false`.

```typescript
levels: [
  {
    groupPath: 'Region',
    showHeader: true
  }
]
```

Also verify that `headerHeight` is large enough to display the configured text.

```typescript
levels: [
  {
    groupPath: 'Region',
    showHeader: true,
    headerHeight: 36
  }
]
```

### Header Placeholder Is Displayed as Literal Text

Confirm that the placeholder exactly matches the data-source field.

```typescript
levels: [
  {
    groupPath: 'Region',
    headerFormat: '${Region}'
  }
]
```

The placeholder is case-sensitive.

```typescript
// Incorrect when the data field is named Region.
headerFormat: '${region}'
```

### Template Placeholder Causes a TypeScript Error

When using a JavaScript or TypeScript template literal, escape TreeMap placeholders.

```typescript
const template: string = `
  <div>\${Region}</div>
`;
```

Without the backslash, JavaScript attempts to evaluate `${Region}` while constructing the string.

With a regular quoted string, escaping is not required.

```typescript
const template: string = '<div>${Region}</div>';
```

### Group Spacing Is Too Large

Reduce `groupGap` and `groupPadding`.

```typescript
levels: [
  {
    groupPath: 'Region',
    groupGap: 5,
    groupPadding: 8
  }
]
```

Also check `leafItemSettings.gap`.

```typescript
leafItemSettings: {
  labelPath: 'Product',
  gap: 2
}
```

Large spacing values are especially noticeable when the TreeMap contains many small data items.

### Leaf Labels Are Not Displayed

Confirm that:

1. `leafItemSettings.labelPath` matches a data-source field.
2. `showLabels` is `true`.
3. The leaf item has enough space for the label.
4. The container has a valid size.

```typescript
leafItemSettings: {
  labelPath: 'Product',
  showLabels: true,
  interSectAction: 'WrapByWord'
}
```

Use `Trim`, `Wrap`, `WrapByWord`, or `Hide` based on the desired overflow behavior.

### Layout Type Is Not Applied

Use one of the supported layout values.

```typescript
layoutType: 'Squarified'
```

```typescript
layoutType: 'SliceAndDiceVertical'
```

```typescript
layoutType: 'SliceAndDiceHorizontal'
```

```typescript
layoutType: 'SliceAndDiceAuto'
```

Ensure that the value uses the correct spelling and letter casing.

### TreeMap Is Not Visible

Confirm that the target element exists before `appendTo` is called.

```html
<div id="container"></div>
```

Give the container a nonzero height.

```css
#container {
  width: 100%;
  height: 560px;
}
```

Append the TreeMap using the correct selector.

```typescript
treemap.appendTo('#container');
```

Also verify that the required Syncfusion EJ2 scripts and styles are loaded and that no earlier JavaScript error prevents TreeMap initialization.

### TypeScript Reports Invalid Property Values

Use explicit data and TreeMap types.

```typescript
interface SalesData {
  Region: string;
  Country: string;
  Product: string;
  Sales: number;
}

const data: SalesData[] = [
  {
    Region: 'Asia',
    Country: 'India',
    Product: 'Software',
    Sales: 15000
  }
];

const treemap: TreeMap = new TreeMap({
  dataSource: data,
  weightValuePath: 'Sales'
});
```

Explicit types provide editor assistance and make invalid configuration values easier to identify before runtime.