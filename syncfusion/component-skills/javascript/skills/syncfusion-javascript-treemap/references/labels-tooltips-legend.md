# TreeMap Labels, Tooltips, and Legend in TypeScript and JavaScript

## Table of Contents

- #prerequisites
- #data-labels
  - #enable-labels
  - #label-positioning
- #label-formatting
  - #format-string-syntax
  - #number-formatting-in-labels
  - #multi-line-labels
- #label-templates
  - #basic-label-template
  - #advanced-template-with-styling
  - #template-with-conditional-values
  - #template-positioning
- #handling-label-intersections
  - #intersect-action-options
  - #trim-long-labels
  - #wrap-labels-by-word
  - #hide-overlapping-labels
- #tooltips
  - #enable-tooltips
  - #default-tooltip-behavior
- #tooltip-formatting
  - #format-with-multiple-fields
  - #format-numeric-values
  - #format-currency-values
- #tooltip-templates
  - #custom-tooltip-template
  - #tooltip-with-images
- #legend-configuration
  - #enable-legend
  - #legend-positioning
  - #legend-with-title
  - #legend-item-styling
- #selection-and-highlight
  - #select-treemap-items
  - #highlight-treemap-items
- #complete-typescript-example
- #complete-javascript-example
- #best-practices
  - #use-clear-label-text
  - #avoid-overcrowding-labels
  - #show-additional-information-in-tooltips
  - #use-legends-for-categorical-data
  - #keep-typescript-types-explicit
- #troubleshooting

## Prerequisites

Install the TreeMap package in the application.

```bash
npm install @syncfusion/ej2-treemap
```

Add a container element to the HTML page.

```html
<div id="container"></div>
```

You can optionally specify a fixed height for the TreeMap container.

```html
<style>
  #container {
    display: block;
    width: 100%;
    height: 500px;
  }
</style>
```

The TypeScript examples import the required classes from the `@syncfusion/ej2-treemap` package.

```typescript
import { TreeMap } from '@syncfusion/ej2-treemap';
```

When a feature such as tooltip, legend, selection, or highlight is enabled, import and inject the corresponding module.

```typescript
import {
  TreeMap,
  TreeMapTooltip,
  TreeMapLegend,
  TreeMapSelection,
  TreeMapHighlight
} from '@syncfusion/ej2-treemap';

TreeMap.Inject(
  TreeMapTooltip,
  TreeMapLegend,
  TreeMapSelection,
  TreeMapHighlight
);
```

The JavaScript examples in this document use the Syncfusion EJ2 global namespace.

```javascript
ej.treemap.TreeMap.Inject(
  ej.treemap.TreeMapTooltip,
  ej.treemap.TreeMapLegend,
  ej.treemap.TreeMapSelection,
  ej.treemap.TreeMapHighlight
);
```

> Inject only the modules required by the application.

## Data Labels

TreeMap data labels are configured using `leafItemSettings`.

The primary label properties include:

- `labelPath`: Specifies the data-source field displayed as the label.
- `showLabels`: Shows or hides leaf-item labels.
- `labelPosition`: Positions the label inside each leaf item.
- `labelFormat`: Combines multiple data fields in the label text.
- `labelStyle`: Customizes the appearance of label text.
- `labelTemplate`: Renders custom HTML content as the label.
- `templatePosition`: Positions the label template.
- `interSectAction`: Controls labels that exceed the available item area.

### Enable Labels

Set `labelPath` to the field that should be displayed as the label. Labels are visible by default, but `showLabels` can be set explicitly for clarity.

#### TypeScript

```typescript
import { TreeMap } from '@syncfusion/ej2-treemap';

interface ProductData {
  Product: string;
  Sales: number;
}

const data: ProductData[] = [
  { Product: 'Laptop', Sales: 15000 },
  { Product: 'Phone', Sales: 12000 },
  { Product: 'Tablet', Sales: 8000 }
];

const treemap: TreeMap = new TreeMap({
  dataSource: data,
  weightValuePath: 'Sales',
  leafItemSettings: {
    labelPath: 'Product',
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

#### JavaScript

```javascript
var data = [
  { Product: 'Laptop', Sales: 15000 },
  { Product: 'Phone', Sales: 12000 },
  { Product: 'Tablet', Sales: 8000 }
];

var treemap = new ej.treemap.TreeMap({
  dataSource: data,
  weightValuePath: 'Sales',
  leafItemSettings: {
    labelPath: 'Product',
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

### Label Positioning

Use `labelPosition` to position the label inside each TreeMap item.

#### TypeScript

```typescript
const treemap: TreeMap = new TreeMap({
  dataSource: data,
  weightValuePath: 'Sales',
  leafItemSettings: {
    labelPath: 'Product',
    showLabels: true,
    labelPosition: 'Center',
    gap: 4,
    border: {
      color: '#ffffff',
      width: 1
    }
  }
});

treemap.appendTo('#container');
```

#### JavaScript

```javascript
var treemap = new ej.treemap.TreeMap({
  dataSource: data,
  weightValuePath: 'Sales',
  leafItemSettings: {
    labelPath: 'Product',
    showLabels: true,
    labelPosition: 'Center',
    gap: 4,
    border: {
      color: '#ffffff',
      width: 1
    }
  }
});

treemap.appendTo('#container');
```

Common label positions include:

- `TopLeft`
- `TopCenter`
- `TopRight`
- `CenterLeft`
- `Center`
- `CenterRight`
- `BottomLeft`
- `BottomCenter`
- `BottomRight`

## Label Formatting

Use `labelFormat` to combine multiple data-source fields in a label.

Field names are specified using the `${FieldName}` placeholder syntax.

### Format String Syntax

#### TypeScript

```typescript
import { TreeMap } from '@syncfusion/ej2-treemap';

interface ProductData {
  Product: string;
  Sales: number;
}

const data: ProductData[] = [
  { Product: 'Laptop', Sales: 15000 },
  { Product: 'Phone', Sales: 12000 }
];

const treemap: TreeMap = new TreeMap({
  dataSource: data,
  weightValuePath: 'Sales',
  leafItemSettings: {
    labelPath: 'Product',
    showLabels: true,
    labelFormat: '${Product}: ${Sales}',
    gap: 4,
    border: {
      color: '#ffffff',
      width: 1
    }
  }
});

treemap.appendTo('#container');
```

#### JavaScript

```javascript
var data = [
  { Product: 'Laptop', Sales: 15000 },
  { Product: 'Phone', Sales: 12000 }
];

var treemap = new ej.treemap.TreeMap({
  dataSource: data,
  weightValuePath: 'Sales',
  leafItemSettings: {
    labelPath: 'Product',
    showLabels: true,
    labelFormat: '${Product}: ${Sales}',
    gap: 4,
    border: {
      color: '#ffffff',
      width: 1
    }
  }
});

treemap.appendTo('#container');
```

### Number Formatting in Labels

Use the TreeMap `format` property to format the value identified by `weightValuePath`.

The `useGroupingSeparator` property can be used to display a grouping separator in numeric values.

#### TypeScript

```typescript
import { TreeMap } from '@syncfusion/ej2-treemap';

interface ProductData {
  Product: string;
  Sales: number;
}

const data: ProductData[] = [
  { Product: 'Laptop', Sales: 15000.25 },
  { Product: 'Phone', Sales: 12000.5 }
];

const treemap: TreeMap = new TreeMap({
  dataSource: data,
  weightValuePath: 'Sales',
  format: 'n2',
  useGroupingSeparator: true,
  leafItemSettings: {
    labelPath: 'Product',
    showLabels: true,
    labelFormat: '${Product}: ${Sales}',
    gap: 4,
    border: {
      color: '#ffffff',
      width: 1
    }
  }
});

treemap.appendTo('#container');
```

#### JavaScript

```javascript
var data = [
  { Product: 'Laptop', Sales: 15000.25 },
  { Product: 'Phone', Sales: 12000.5 }
];

var treemap = new ej.treemap.TreeMap({
  dataSource: data,
  weightValuePath: 'Sales',
  format: 'n2',
  useGroupingSeparator: true,
  leafItemSettings: {
    labelPath: 'Product',
    showLabels: true,
    labelFormat: '${Product}: ${Sales}',
    gap: 4,
    border: {
      color: '#ffffff',
      width: 1
    }
  }
});

treemap.appendTo('#container');
```

### Multi-Line Labels

Use `labelFormat` with HTML line breaks for a simple multi-line label.

#### TypeScript

```typescript
const treemap: TreeMap = new TreeMap({
  dataSource: data,
  weightValuePath: 'Sales',
  leafItemSettings: {
    labelPath: 'Product',
    showLabels: true,
    labelPosition: 'Center',
    labelFormat: '${Product}<br/>Sales: ${Sales}',
    gap: 4,
    border: {
      color: '#ffffff',
      width: 1
    }
  }
});

treemap.appendTo('#container');
```

#### JavaScript

```javascript
var treemap = new ej.treemap.TreeMap({
  dataSource: data,
  weightValuePath: 'Sales',
  leafItemSettings: {
    labelPath: 'Product',
    showLabels: true,
    labelPosition: 'Center',
    labelFormat: '${Product}<br/>Sales: ${Sales}',
    gap: 4,
    border: {
      color: '#ffffff',
      width: 1
    }
  }
});

treemap.appendTo('#container');
```

Use `labelTemplate` instead when custom HTML structure or detailed styling is required.

## Label Templates

Use `labelTemplate` when the label requires custom HTML markup, multiple elements, or more styling control than `labelFormat` provides.

### Basic Label Template

#### TypeScript

```typescript
import { TreeMap } from '@syncfusion/ej2-treemap';

interface ProductData {
  Product: string;
  Sales: number;
}

const data: ProductData[] = [
  { Product: 'Laptop', Sales: 15000 },
  { Product: 'Phone', Sales: 12000 }
];

const treemap: TreeMap = new TreeMap({
  dataSource: data,
  weightValuePath: 'Sales',
  leafItemSettings: {
    labelPath: 'Product',
    showLabels: true,
    labelTemplate:
      '<div style="color:white;font-weight:700;">${Product}</div>',
    templatePosition: 'Center',
    gap: 4,
    border: {
      color: '#ffffff',
      width: 1
    }
  }
});

treemap.appendTo('#container');
```

#### JavaScript

```javascript
var data = [
  { Product: 'Laptop', Sales: 15000 },
  { Product: 'Phone', Sales: 12000 }
];

var treemap = new ej.treemap.TreeMap({
  dataSource: data,
  weightValuePath: 'Sales',
  leafItemSettings: {
    labelPath: 'Product',
    showLabels: true,
    labelTemplate:
      '<div style="color:white;font-weight:700;">${Product}</div>',
    templatePosition: 'Center',
    gap: 4,
    border: {
      color: '#ffffff',
      width: 1
    }
  }
});

treemap.appendTo('#container');
```

### Advanced Template with Styling

#### TypeScript

```typescript
const labelTemplate: string = `
  <div style="
    padding:8px;
    background:rgba(0, 0, 0, 0.45);
    border-radius:6px;
    color:white;
    text-align:center;
  ">
    <div style="font-size:14px;font-weight:700;">
      \${Product}
    </div>
    <div style="font-size:12px;">
      Sales: \${Sales}
    </div>
  </div>
`;

const treemap: TreeMap = new TreeMap({
  dataSource: data,
  weightValuePath: 'Sales',
  leafItemSettings: {
    labelPath: 'Product',
    showLabels: true,
    labelTemplate: labelTemplate,
    templatePosition: 'Center',
    gap: 4,
    border: {
      color: '#ffffff',
      width: 1
    }
  }
});

treemap.appendTo('#container');
```

#### JavaScript

```javascript
var labelTemplate = [
  '<div style="',
  'padding:8px;',
  'background:rgba(0, 0, 0, 0.45);',
  'border-radius:6px;',
  'color:white;',
  'text-align:center;',
  '">',
  '<div style="font-size:14px;font-weight:700;">',
  '${Product}',
  '</div>',
  '<div style="font-size:12px;">',
  'Sales: ${Sales}',
  '</div>',
  '</div>'
].join('');

var treemap = new ej.treemap.TreeMap({
  dataSource: data,
  weightValuePath: 'Sales',
  leafItemSettings: {
    labelPath: 'Product',
    showLabels: true,
    labelTemplate: labelTemplate,
    templatePosition: 'Center',
    gap: 4,
    border: {
      color: '#ffffff',
      width: 1
    }
  }
});

treemap.appendTo('#container');
```

> In a TypeScript template literal, escape TreeMap placeholders as `\${FieldName}`. This prevents JavaScript from evaluating the placeholder before the TreeMap template engine processes it.

### Template with Conditional Values

TreeMap template placeholders display values from the bound data. When conditional presentation is required, calculate the required values before assigning the data source.

#### TypeScript

```typescript
import { TreeMap } from '@syncfusion/ej2-treemap';

interface ProductData {
  Product: string;
  Sales: number;
}

interface ProductTemplateData extends ProductData {
  LabelColor: string;
  LabelWeight: string;
  Performance: string;
}

const rawData: ProductData[] = [
  { Product: 'Laptop', Sales: 15000 },
  { Product: 'Phone', Sales: 9000 }
];

const data: ProductTemplateData[] = rawData.map(
  (item: ProductData): ProductTemplateData => ({
    ...item,
    LabelColor: item.Sales > 10000 ? '#166534' : '#9a3412',
    LabelWeight: item.Sales > 10000 ? '700' : '400',
    Performance: item.Sales > 10000 ? 'High' : 'Standard'
  })
);

const treemap: TreeMap = new TreeMap({
  dataSource: data,
  weightValuePath: 'Sales',
  leafItemSettings: {
    labelPath: 'Product',
    showLabels: true,
    labelTemplate: `
      <div style="
        color:\${LabelColor};
        font-weight:\${LabelWeight};
        text-align:center;
      ">
        <div>\${Product}</div>
        <div style="font-size:11px;">\${Performance}</div>
      </div>
    `,
    templatePosition: 'Center',
    gap: 4,
    border: {
      color: '#ffffff',
      width: 1
    }
  }
});

treemap.appendTo('#container');
```

#### JavaScript

```javascript
var rawData = [
  { Product: 'Laptop', Sales: 15000 },
  { Product: 'Phone', Sales: 9000 }
];

var data = rawData.map(function (item) {
  return {
    Product: item.Product,
    Sales: item.Sales,
    LabelColor: item.Sales > 10000 ? '#166534' : '#9a3412',
    LabelWeight: item.Sales > 10000 ? '700' : '400',
    Performance: item.Sales > 10000 ? 'High' : 'Standard'
  };
});

var treemap = new ej.treemap.TreeMap({
  dataSource: data,
  weightValuePath: 'Sales',
  leafItemSettings: {
    labelPath: 'Product',
    showLabels: true,
    labelTemplate:
      '<div style="' +
      'color:${LabelColor};' +
      'font-weight:${LabelWeight};' +
      'text-align:center;' +
      '">' +
      '<div>${Product}</div>' +
      '<div style="font-size:11px;">${Performance}</div>' +
      '</div>',
    templatePosition: 'Center',
    gap: 4,
    border: {
      color: '#ffffff',
      width: 1
    }
  }
});

treemap.appendTo('#container');
```

### Template Positioning

Use `templatePosition` to position the label template inside the TreeMap item.

#### TypeScript

```typescript
const treemap: TreeMap = new TreeMap({
  dataSource: data,
  weightValuePath: 'Sales',
  leafItemSettings: {
    labelPath: 'Product',
    labelTemplate:
      '<div style="color:white;">${Product}</div>',
    templatePosition: 'Center'
  }
});

treemap.appendTo('#container');
```

#### JavaScript

```javascript
var treemap = new ej.treemap.TreeMap({
  dataSource: data,
  weightValuePath: 'Sales',
  leafItemSettings: {
    labelPath: 'Product',
    labelTemplate:
      '<div style="color:white;">${Product}</div>',
    templatePosition: 'Center'
  }
});

treemap.appendTo('#container');
```

Common template positions include:

- `TopLeft`
- `TopCenter`
- `TopRight`
- `CenterLeft`
- `Center`
- `CenterRight`
- `BottomLeft`
- `BottomCenter`
- `BottomRight`

## Handling Label Intersections

Use `interSectAction` to control the behavior of labels when their content exceeds the available TreeMap item area.

### Intersect Action Options

Common intersect actions include:

- `Trim`: Trims label text that exceeds the available area.
- `Hide`: Hides labels that cannot fit in the item.
- `Wrap`: Wraps label content based on the available width.
- `WrapByWord`: Wraps the label at word boundaries.

### Trim Long Labels

Use `Trim` when the label should remain on one line.

#### TypeScript

```typescript
const treemap: TreeMap = new TreeMap({
  dataSource: data,
  weightValuePath: 'Sales',
  leafItemSettings: {
    labelPath: 'Product',
    showLabels: true,
    interSectAction: 'Trim',
    gap: 4,
    border: {
      color: '#ffffff',
      width: 1
    }
  }
});

treemap.appendTo('#container');
```

#### JavaScript

```javascript
var treemap = new ej.treemap.TreeMap({
  dataSource: data,
  weightValuePath: 'Sales',
  leafItemSettings: {
    labelPath: 'Product',
    showLabels: true,
    interSectAction: 'Trim',
    gap: 4,
    border: {
      color: '#ffffff',
      width: 1
    }
  }
});

treemap.appendTo('#container');
```

### Wrap Labels by Word

Use `WrapByWord` to wrap long labels at word boundaries.

#### TypeScript

```typescript
const treemap: TreeMap = new TreeMap({
  dataSource: data,
  weightValuePath: 'Sales',
  leafItemSettings: {
    labelPath: 'Product',
    showLabels: true,
    interSectAction: 'WrapByWord',
    gap: 4,
    border: {
      color: '#ffffff',
      width: 1
    }
  }
});

treemap.appendTo('#container');
```

#### JavaScript

```javascript
var treemap = new ej.treemap.TreeMap({
  dataSource: data,
  weightValuePath: 'Sales',
  leafItemSettings: {
    labelPath: 'Product',
    showLabels: true,
    interSectAction: 'WrapByWord',
    gap: 4,
    border: {
      color: '#ffffff',
      width: 1
    }
  }
});

treemap.appendTo('#container');
```

### Hide Overlapping Labels

Use `Hide` when displaying an incomplete label would reduce readability.

#### TypeScript

```typescript
const treemap: TreeMap = new TreeMap({
  dataSource: data,
  weightValuePath: 'Sales',
  leafItemSettings: {
    labelPath: 'Product',
    showLabels: true,
    interSectAction: 'Hide'
  }
});

treemap.appendTo('#container');
```

#### JavaScript

```javascript
var treemap = new ej.treemap.TreeMap({
  dataSource: data,
  weightValuePath: 'Sales',
  leafItemSettings: {
    labelPath: 'Product',
    showLabels: true,
    interSectAction: 'Hide'
  }
});

treemap.appendTo('#container');
```

## Tooltips

Tooltips display additional information when a user points to a TreeMap item.

The `TreeMapTooltip` module must be injected before enabling tooltip functionality.

### Enable Tooltips

#### TypeScript

```typescript
import {
  TreeMap,
  TreeMapTooltip
} from '@syncfusion/ej2-treemap';

TreeMap.Inject(TreeMapTooltip);

interface ProductData {
  Product: string;
  Sales: number;
}

const data: ProductData[] = [
  { Product: 'Laptop', Sales: 15000 },
  { Product: 'Phone', Sales: 12000 }
];

const treemap: TreeMap = new TreeMap({
  dataSource: data,
  weightValuePath: 'Sales',
  tooltipSettings: {
    visible: true
  },
  leafItemSettings: {
    labelPath: 'Product'
  }
});

treemap.appendTo('#container');
```

#### JavaScript

```javascript
ej.treemap.TreeMap.Inject(
  ej.treemap.TreeMapTooltip
);

var data = [
  { Product: 'Laptop', Sales: 15000 },
  { Product: 'Phone', Sales: 12000 }
];

var treemap = new ej.treemap.TreeMap({
  dataSource: data,
  weightValuePath: 'Sales',
  tooltipSettings: {
    visible: true
  },
  leafItemSettings: {
    labelPath: 'Product'
  }
});

treemap.appendTo('#container');
```

### Default Tooltip Behavior

Tooltips are disabled by default.

When `tooltipSettings.visible` is set to `true`, the default tooltip displays information based on the field configured through `weightValuePath`.

Use `tooltipSettings.format` or `tooltipSettings.template` when predictable user-facing content is required.

## Tooltip Formatting

Use `tooltipSettings.format` when plain text or simple HTML content is sufficient.

### Format with Multiple Fields

#### TypeScript

```typescript
import {
  TreeMap,
  TreeMapTooltip
} from '@syncfusion/ej2-treemap';

TreeMap.Inject(TreeMapTooltip);

interface ProductData {
  Product: string;
  Sales: number;
  Category: string;
}

const data: ProductData[] = [
  {
    Product: 'Laptop',
    Sales: 15000,
    Category: 'Electronics'
  },
  {
    Product: 'Chair',
    Sales: 8000,
    Category: 'Furniture'
  }
];

const treemap: TreeMap = new TreeMap({
  dataSource: data,
  weightValuePath: 'Sales',
  tooltipSettings: {
    visible: true,
    format:
      'Product: ${Product}<br/>' +
      'Sales: ${Sales}<br/>' +
      'Category: ${Category}'
  },
  leafItemSettings: {
    labelPath: 'Product'
  }
});

treemap.appendTo('#container');
```

#### JavaScript

```javascript
ej.treemap.TreeMap.Inject(
  ej.treemap.TreeMapTooltip
);

var data = [
  {
    Product: 'Laptop',
    Sales: 15000,
    Category: 'Electronics'
  },
  {
    Product: 'Chair',
    Sales: 8000,
    Category: 'Furniture'
  }
];

var treemap = new ej.treemap.TreeMap({
  dataSource: data,
  weightValuePath: 'Sales',
  tooltipSettings: {
    visible: true,
    format:
      'Product: ${Product}<br/>' +
      'Sales: ${Sales}<br/>' +
      'Category: ${Category}'
  },
  leafItemSettings: {
    labelPath: 'Product'
  }
});

treemap.appendTo('#container');
```

### Format Numeric Values

Use `format` and `useGroupingSeparator` on the TreeMap to format numeric values associated with `weightValuePath`.

#### TypeScript

```typescript
const treemap: TreeMap = new TreeMap({
  dataSource: data,
  weightValuePath: 'Sales',
  format: 'n2',
  useGroupingSeparator: true,
  tooltipSettings: {
    visible: true,
    format: '${Product}: ${Sales}'
  },
  leafItemSettings: {
    labelPath: 'Product'
  }
});

treemap.appendTo('#container');
```

#### JavaScript

```javascript
var treemap = new ej.treemap.TreeMap({
  dataSource: data,
  weightValuePath: 'Sales',
  format: 'n2',
  useGroupingSeparator: true,
  tooltipSettings: {
    visible: true,
    format: '${Product}: ${Sales}'
  },
  leafItemSettings: {
    labelPath: 'Product'
  }
});

treemap.appendTo('#container');
```

### Format Currency Values

Use a currency format such as `c2` when `weightValuePath` represents a monetary value.

#### TypeScript

```typescript
import {
  TreeMap,
  TreeMapTooltip
} from '@syncfusion/ej2-treemap';

TreeMap.Inject(TreeMapTooltip);

interface ProductPrice {
  Product: string;
  Price: number;
}

const data: ProductPrice[] = [
  { Product: 'Laptop', Price: 1200 },
  { Product: 'Phone', Price: 900 }
];

const treemap: TreeMap = new TreeMap({
  dataSource: data,
  weightValuePath: 'Price',
  format: 'c2',
  useGroupingSeparator: true,
  tooltipSettings: {
    visible: true,
    format: '${Product}: ${Price}'
  },
  leafItemSettings: {
    labelPath: 'Product'
  }
});

treemap.appendTo('#container');
```

#### JavaScript

```javascript
ej.treemap.TreeMap.Inject(
  ej.treemap.TreeMapTooltip
);

var data = [
  { Product: 'Laptop', Price: 1200 },
  { Product: 'Phone', Price: 900 }
];

var treemap = new ej.treemap.TreeMap({
  dataSource: data,
  weightValuePath: 'Price',
  format: 'c2',
  useGroupingSeparator: true,
  tooltipSettings: {
    visible: true,
    format: '${Product}: ${Price}'
  },
  leafItemSettings: {
    labelPath: 'Product'
  }
});

treemap.appendTo('#container');
```

## Tooltip Templates

Use `tooltipSettings.template` when the tooltip requires custom HTML markup or rich visual content.

### Custom Tooltip Template

#### TypeScript

```typescript
import {
  TreeMap,
  TreeMapTooltip
} from '@syncfusion/ej2-treemap';

TreeMap.Inject(TreeMapTooltip);

interface ProductData {
  Product: string;
  Sales: number;
  Profit: number;
}

const data: ProductData[] = [
  { Product: 'Laptop', Sales: 15000, Profit: 25 },
  { Product: 'Phone', Sales: 12000, Profit: 18 }
];

const treemap: TreeMap = new TreeMap({
  dataSource: data,
  weightValuePath: 'Sales',
  tooltipSettings: {
    visible: true,
    template: `
      <div style="
        background:#111827;
        color:white;
        padding:10px;
        border-radius:6px;
      ">
        <div style="font-weight:700;">\${Product}</div>
        <div>Sales: \${Sales}</div>
        <div>Profit: \${Profit}%</div>
      </div>
    `
  },
  leafItemSettings: {
    labelPath: 'Product'
  }
});

treemap.appendTo('#container');
```

#### JavaScript

```javascript
ej.treemap.TreeMap.Inject(
  ej.treemap.TreeMapTooltip
);

var data = [
  { Product: 'Laptop', Sales: 15000, Profit: 25 },
  { Product: 'Phone', Sales: 12000, Profit: 18 }
];

var treemap = new ej.treemap.TreeMap({
  dataSource: data,
  weightValuePath: 'Sales',
  tooltipSettings: {
    visible: true,
    template:
      '<div style="' +
      'background:#111827;' +
      'color:white;' +
      'padding:10px;' +
      'border-radius:6px;' +
      '">' +
      '<div style="font-weight:700;">${Product}</div>' +
      '<div>Sales: ${Sales}</div>' +
      '<div>Profit: ${Profit}%</div>' +
      '</div>'
  },
  leafItemSettings: {
    labelPath: 'Product'
  }
});

treemap.appendTo('#container');
```

### Tooltip with Images

Image URLs and alternate text can be obtained from fields in the bound data.

#### TypeScript

```typescript
import {
  TreeMap,
  TreeMapTooltip
} from '@syncfusion/ej2-treemap';

TreeMap.Inject(TreeMapTooltip);

interface ProductData {
  Product: string;
  Sales: number;
  Description: string;
  ImageUrl: string;
}

const data: ProductData[] = [
  {
    Product: 'Laptop',
    Sales: 15000,
    Description: 'Portable computer',
    ImageUrl: 'assets/laptop.png'
  },
  {
    Product: 'Chair',
    Sales: 8000,
    Description: 'Office chair',
    ImageUrl: 'assets/chair.png'
  }
];

const treemap: TreeMap = new TreeMap({
  dataSource: data,
  weightValuePath: 'Sales',
  tooltipSettings: {
    visible: true,
    template: `
      <div style="
        display:flex;
        gap:10px;
        align-items:center;
        padding:8px;
      ">
        \${ImageUrl}
        <div>
          <div style="font-weight:700;">\${Product}</div>
          <div>\${Description}</div>
        </div>
      </div>
    `
  },
  leafItemSettings: {
    labelPath: 'Product'
  }
});

treemap.appendTo('#container');
```

#### JavaScript

```javascript
ej.treemap.TreeMap.Inject(
  ej.treemap.TreeMapTooltip
);

var data = [
  {
    Product: 'Laptop',
    Sales: 15000,
    Description: 'Portable computer',
    ImageUrl: 'assets/laptop.png'
  },
  {
    Product: 'Chair',
    Sales: 8000,
    Description: 'Office chair',
    ImageUrl: 'assets/chair.png'
  }
];

var treemap = new ej.treemap.TreeMap({
  dataSource: data,
  weightValuePath: 'Sales',
  tooltipSettings: {
    visible: true,
    template:
      '<div style="display:flex;gap:10px;align-items:center;padding:8px;">' +
      '${ImageUrl}' +
      '<div>' +
      '<div style="font-weight:700;">${Product}</div>' +
      '<div>${Description}</div>' +
      '</div>' +
      '</div>'
  },
  leafItemSettings: {
    labelPath: 'Product'
  }
});

treemap.appendTo('#container');
```

> Only use trusted image URLs in tooltip templates. Sanitize or validate externally supplied values before rendering them as HTML.

## Legend Configuration

The TreeMap legend explains how item colors correspond to ranges or categories.

Inject the `TreeMapLegend` module before enabling the legend.

For categorical data:

1. Set `equalColorValuePath` to the category field.
2. Configure equal-value entries in `leafItemSettings.colorMapping`.
3. Set `legendSettings.visible` to `true`.

### Enable Legend

#### TypeScript

```typescript
import {
  TreeMap,
  TreeMapLegend
} from '@syncfusion/ej2-treemap';

TreeMap.Inject(TreeMapLegend);

interface ProductData {
  Product: string;
  Sales: number;
  Category: string;
}

const data: ProductData[] = [
  {
    Product: 'Laptop',
    Sales: 15000,
    Category: 'Electronics'
  },
  {
    Product: 'Chair',
    Sales: 8000,
    Category: 'Furniture'
  },
  {
    Product: 'Shirt',
    Sales: 5000,
    Category: 'Clothing'
  }
];

const treemap: TreeMap = new TreeMap({
  dataSource: data,
  weightValuePath: 'Sales',
  equalColorValuePath: 'Category',
  legendSettings: {
    visible: true
  },
  leafItemSettings: {
    labelPath: 'Product',
    colorMapping: [
      {
        value: 'Electronics',
        color: '#2563eb',
        label: 'Electronics'
      },
      {
        value: 'Furniture',
        color: '#16a34a',
        label: 'Furniture'
      },
      {
        value: 'Clothing',
        color: '#ea580c',
        label: 'Clothing'
      }
    ]
  }
});

treemap.appendTo('#container');
```

#### JavaScript

```javascript
ej.treemap.TreeMap.Inject(
  ej.treemap.TreeMapLegend
);

var data = [
  {
    Product: 'Laptop',
    Sales: 15000,
    Category: 'Electronics'
  },
  {
    Product: 'Chair',
    Sales: 8000,
    Category: 'Furniture'
  },
  {
    Product: 'Shirt',
    Sales: 5000,
    Category: 'Clothing'
  }
];

var treemap = new ej.treemap.TreeMap({
  dataSource: data,
  weightValuePath: 'Sales',
  equalColorValuePath: 'Category',
  legendSettings: {
    visible: true
  },
  leafItemSettings: {
    labelPath: 'Product',
    colorMapping: [
      {
        value: 'Electronics',
        color: '#2563eb',
        label: 'Electronics'
      },
      {
        value: 'Furniture',
        color: '#16a34a',
        label: 'Furniture'
      },
      {
        value: 'Clothing',
        color: '#ea580c',
        label: 'Clothing'
      }
    ]
  }
});

treemap.appendTo('#container');
```

### Legend Positioning

Use `legendSettings.position` to position the legend.

#### TypeScript

```typescript
const treemap: TreeMap = new TreeMap({
  dataSource: data,
  weightValuePath: 'Sales',
  equalColorValuePath: 'Category',
  legendSettings: {
    visible: true,
    position: 'Top'
  },
  leafItemSettings: {
    labelPath: 'Product',
    colorMapping: colorMapping
  }
});

treemap.appendTo('#container');
```

#### JavaScript

```javascript
var treemap = new ej.treemap.TreeMap({
  dataSource: data,
  weightValuePath: 'Sales',
  equalColorValuePath: 'Category',
  legendSettings: {
    visible: true,
    position: 'Top'
  },
  leafItemSettings: {
    labelPath: 'Product',
    colorMapping: colorMapping
  }
});

treemap.appendTo('#container');
```

Common legend positions include:

- `Top`
- `Bottom`
- `Left`
- `Right`
- `Float`

### Legend with Title

#### TypeScript

```typescript
const treemap: TreeMap = new TreeMap({
  dataSource: data,
  weightValuePath: 'Sales',
  equalColorValuePath: 'Category',
  legendSettings: {
    visible: true,
    position: 'Bottom',
    title: 'Product Categories'
  },
  leafItemSettings: {
    labelPath: 'Product',
    colorMapping: colorMapping
  }
});

treemap.appendTo('#container');
```

#### JavaScript

```javascript
var treemap = new ej.treemap.TreeMap({
  dataSource: data,
  weightValuePath: 'Sales',
  equalColorValuePath: 'Category',
  legendSettings: {
    visible: true,
    position: 'Bottom',
    title: 'Product Categories'
  },
  leafItemSettings: {
    labelPath: 'Product',
    colorMapping: colorMapping
  }
});

treemap.appendTo('#container');
```

### Legend Item Styling

Use `legendSettings.border` and `legendSettings.textStyle` to customize the legend.

#### TypeScript

```typescript
const treemap: TreeMap = new TreeMap({
  dataSource: data,
  weightValuePath: 'Sales',
  equalColorValuePath: 'Category',
  legendSettings: {
    visible: true,
    position: 'Bottom',
    border: {
      color: '#333333',
      width: 1
    },
    textStyle: {
      color: '#333333',
      fontFamily: 'Arial',
      size: '14px'
    }
  },
  leafItemSettings: {
    labelPath: 'Product',
    colorMapping: colorMapping
  }
});

treemap.appendTo('#container');
```

#### JavaScript

```javascript
var treemap = new ej.treemap.TreeMap({
  dataSource: data,
  weightValuePath: 'Sales',
  equalColorValuePath: 'Category',
  legendSettings: {
    visible: true,
    position: 'Bottom',
    border: {
      color: '#333333',
      width: 1
    },
    textStyle: {
      color: '#333333',
      fontFamily: 'Arial',
      size: '14px'
    }
  },
  leafItemSettings: {
    labelPath: 'Product',
    colorMapping: colorMapping
  }
});

treemap.appendTo('#container');
```

## Selection and Highlight

Selection and highlight provide visual feedback for TreeMap items.

Inject the corresponding module before enabling each feature:

- `TreeMapSelection` for selection.
- `TreeMapHighlight` for highlighting.
- `TreeMapLegend` when a legend is displayed.

### Select TreeMap Items

#### TypeScript

```typescript
import {
  TreeMap,
  TreeMapLegend,
  TreeMapSelection
} from '@syncfusion/ej2-treemap';

TreeMap.Inject(
  TreeMapLegend,
  TreeMapSelection
);

interface ProductData {
  Product: string;
  Sales: number;
  Category: string;
}

const data: ProductData[] = [
  {
    Product: 'Laptop',
    Sales: 15000,
    Category: 'Electronics'
  },
  {
    Product: 'Chair',
    Sales: 8000,
    Category: 'Furniture'
  }
];

const treemap: TreeMap = new TreeMap({
  dataSource: data,
  weightValuePath: 'Sales',
  equalColorValuePath: 'Category',
  legendSettings: {
    visible: true
  },
  selectionSettings: {
    enable: true,
    fill: '#dbeafe',
    border: {
      color: '#1d4ed8',
      width: 2
    }
  },
  leafItemSettings: {
    labelPath: 'Product',
    colorMapping: [
      {
        value: 'Electronics',
        color: '#2563eb',
        label: 'Electronics'
      },
      {
        value: 'Furniture',
        color: '#16a34a',
        label: 'Furniture'
      }
    ]
  }
});

treemap.appendTo('#container');
```

#### JavaScript

```javascript
ej.treemap.TreeMap.Inject(
  ej.treemap.TreeMapLegend,
  ej.treemap.TreeMapSelection
);

var data = [
  {
    Product: 'Laptop',
    Sales: 15000,
    Category: 'Electronics'
  },
  {
    Product: 'Chair',
    Sales: 8000,
    Category: 'Furniture'
  }
];

var treemap = new ej.treemap.TreeMap({
  dataSource: data,
  weightValuePath: 'Sales',
  equalColorValuePath: 'Category',
  legendSettings: {
    visible: true
  },
  selectionSettings: {
    enable: true,
    fill: '#dbeafe',
    border: {
      color: '#1d4ed8',
      width: 2
    }
  },
  leafItemSettings: {
    labelPath: 'Product',
    colorMapping: [
      {
        value: 'Electronics',
        color: '#2563eb',
        label: 'Electronics'
      },
      {
        value: 'Furniture',
        color: '#16a34a',
        label: 'Furniture'
      }
    ]
  }
});

treemap.appendTo('#container');
```

### Highlight TreeMap Items

#### TypeScript

```typescript
import {
  TreeMap,
  TreeMapLegend,
  TreeMapHighlight
} from '@syncfusion/ej2-treemap';

TreeMap.Inject(
  TreeMapLegend,
  TreeMapHighlight
);

const treemap: TreeMap = new TreeMap({
  dataSource: data,
  weightValuePath: 'Sales',
  equalColorValuePath: 'Category',
  legendSettings: {
    visible: true
  },
  highlightSettings: {
    enable: true,
    fill: '#fde68a',
    border: {
      color: '#d97706',
      width: 2
    }
  },
  leafItemSettings: {
    labelPath: 'Product',
    colorMapping: [
      {
        value: 'Electronics',
        color: '#2563eb',
        label: 'Electronics'
      },
      {
        value: 'Furniture',
        color: '#16a34a',
        label: 'Furniture'
      }
    ]
  }
});

treemap.appendTo('#container');
```

#### JavaScript

```javascript
ej.treemap.TreeMap.Inject(
  ej.treemap.TreeMapLegend,
  ej.treemap.TreeMapHighlight
);

var treemap = new ej.treemap.TreeMap({
  dataSource: data,
  weightValuePath: 'Sales',
  equalColorValuePath: 'Category',
  legendSettings: {
    visible: true
  },
  highlightSettings: {
    enable: true,
    fill: '#fde68a',
    border: {
      color: '#d97706',
      width: 2
    }
  },
  leafItemSettings: {
    labelPath: 'Product',
    colorMapping: [
      {
        value: 'Electronics',
        color: '#2563eb',
        label: 'Electronics'
      },
      {
        value: 'Furniture',
        color: '#16a34a',
        label: 'Furniture'
      }
    ]
  }
});

treemap.appendTo('#container');
```

## Complete TypeScript Example

The following example combines labels, templates, tooltips, categorical color mapping, legend, selection, and highlight.

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
  <title>TreeMap Labels, Tooltips, and Legend</title>

  <style>
    body {
      margin: 0;
      padding: 24px;
      font-family: Arial, sans-serif;
      background: #f8fafc;
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
  <h1>Product Sales TreeMap</h1>
  <div id="container"></div>
</body>
</html>
```

### index.ts

```typescript
import {
  TreeMap,
  TreeMapTooltip,
  TreeMapLegend,
  TreeMapSelection,
  TreeMapHighlight
} from '@syncfusion/ej2-treemap';

TreeMap.Inject(
  TreeMapTooltip,
  TreeMapLegend,
  TreeMapSelection,
  TreeMapHighlight
);

interface ProductData {
  Product: string;
  Sales: number;
  Category: string;
  Profit: number;
  Description: string;
  ImageUrl: string;
}

const data: ProductData[] = [
  {
    Product: 'Laptop',
    Sales: 15000,
    Category: 'Electronics',
    Profit: 25,
    Description: 'Portable computer',
    ImageUrl: 'assets/laptop.png'
  },
  {
    Product: 'Phone',
    Sales: 12000,
    Category: 'Electronics',
    Profit: 20,
    Description: 'Mobile communication device',
    ImageUrl: 'assets/phone.png'
  },
  {
    Product: 'Chair',
    Sales: 8000,
    Category: 'Furniture',
    Profit: 15,
    Description: 'Ergonomic office chair',
    ImageUrl: 'assets/chair.png'
  },
  {
    Product: 'Desk',
    Sales: 6500,
    Category: 'Furniture',
    Profit: 12,
    Description: 'Office work desk',
    ImageUrl: 'assets/desk.png'
  },
  {
    Product: 'Shirt',
    Sales: 5000,
    Category: 'Clothing',
    Profit: 18,
    Description: 'Cotton shirt',
    ImageUrl: 'assets/shirt.png'
  }
];

const treemap: TreeMap = new TreeMap({
  dataSource: data,
  weightValuePath: 'Sales',
  equalColorValuePath: 'Category',
  format: 'n0',
  useGroupingSeparator: true,

  titleSettings: {
    text: 'Sales by Product Category',
    textStyle: {
      size: '18px',
      fontWeight: '600'
    }
  },

  leafItemSettings: {
    labelPath: 'Product',
    showLabels: true,
    labelPosition: 'Center',
    interSectAction: 'WrapByWord',
    labelTemplate: `
      <div style="
        text-align:center;
        color:white;
        font-weight:600;
        padding:4px;
      ">
        <div>\${Product}</div>
        <div style="font-size:11px;">
          \${Sales}
        </div>
      </div>
    `,
    templatePosition: 'Center',
    gap: 4,
    border: {
      color: '#ffffff',
      width: 1
    },
    colorMapping: [
      {
        value: 'Electronics',
        color: '#2563eb',
        label: 'Electronics'
      },
      {
        value: 'Furniture',
        color: '#16a34a',
        label: 'Furniture'
      },
      {
        value: 'Clothing',
        color: '#ea580c',
        label: 'Clothing'
      }
    ]
  },

  tooltipSettings: {
    visible: true,
    template: `
      <div style="
        display:flex;
        gap:10px;
        align-items:center;
        min-width:210px;
        background:#111827;
        color:white;
        padding:10px;
        border-radius:8px;
      ">
        \${ImageUrl}
        <div>
          <div style="font-weight:700;">
            \${Product}
          </div>
          <div>Sales: \${Sales}</div>
          <div>Category: \${Category}</div>
          <div>Profit: \${Profit}%</div>
        </div>
      </div>
    `
  },

  legendSettings: {
    visible: true,
    position: 'Bottom',
    title: 'Product Categories',
    border: {
      color: '#d1d5db',
      width: 1
    },
    textStyle: {
      color: '#111827',
      fontFamily: 'Arial',
      size: '13px'
    }
  },

  selectionSettings: {
    enable: true,
    fill: '#93c5fd',
    border: {
      color: '#1d4ed8',
      width: 2
    }
  },

  highlightSettings: {
    enable: true,
    fill: '#fde68a',
    border: {
      color: '#d97706',
      width: 2
    }
  }
});

treemap.appendTo('#container');
```

## Complete JavaScript Example

The JavaScript example uses the Syncfusion EJ2 global namespace.

Ensure the required Syncfusion EJ2 TreeMap scripts and theme styles are loaded before executing this code.

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
  <title>TreeMap Labels, Tooltips, and Legend</title>

  <style>
    body {
      margin: 0;
      padding: 24px;
      font-family: Arial, sans-serif;
      background: #f8fafc;
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
  <h1>Product Sales TreeMap</h1>
  <div id="container"></div>

  <script scr="index.js"></script>
</body>
</html>
```

### index.js

```javascript
ej.treemap.TreeMap.Inject(
  ej.treemap.TreeMapTooltip,
  ej.treemap.TreeMapLegend,
  ej.treemap.TreeMapSelection,
  ej.treemap.TreeMapHighlight
);

var data = [
  {
    Product: 'Laptop',
    Sales: 15000,
    Category: 'Electronics',
    Profit: 25,
    Description: 'Portable computer',
    ImageUrl: 'assets/laptop.png'
  },
  {
    Product: 'Phone',
    Sales: 12000,
    Category: 'Electronics',
    Profit: 20,
    Description: 'Mobile communication device',
    ImageUrl: 'assets/phone.png'
  },
  {
    Product: 'Chair',
    Sales: 8000,
    Category: 'Furniture',
    Profit: 15,
    Description: 'Ergonomic office chair',
    ImageUrl: 'assets/chair.png'
  },
  {
    Product: 'Desk',
    Sales: 6500,
    Category: 'Furniture',
    Profit: 12,
    Description: 'Office work desk',
    ImageUrl: 'assets/desk.png'
  },
  {
    Product: 'Shirt',
    Sales: 5000,
    Category: 'Clothing',
    Profit: 18,
    Description: 'Cotton shirt',
    ImageUrl: 'assets/shirt.png'
  }
];

var treemap = new ej.treemap.TreeMap({
  dataSource: data,
  weightValuePath: 'Sales',
  equalColorValuePath: 'Category',
  format: 'n0',
  useGroupingSeparator: true,

  titleSettings: {
    text: 'Sales by Product Category',
    textStyle: {
      size: '18px',
      fontWeight: '600'
    }
  },

  leafItemSettings: {
    labelPath: 'Product',
    showLabels: true,
    labelPosition: 'Center',
    interSectAction: 'WrapByWord',
    labelTemplate:
      '<div style="' +
      'text-align:center;' +
      'color:white;' +
      'font-weight:600;' +
      'padding:4px;' +
      '">' +
      '<div>${Product}</div>' +
      '<div style="font-size:11px;">${Sales}</div>' +
      '</div>',
    templatePosition: 'Center',
    gap: 4,
    border: {
      color: '#ffffff',
      width: 1
    },
    colorMapping: [
      {
        value: 'Electronics',
        color: '#2563eb',
        label: 'Electronics'
      },
      {
        value: 'Furniture',
        color: '#16a34a',
        label: 'Furniture'
      },
      {
        value: 'Clothing',
        color: '#ea580c',
        label: 'Clothing'
      }
    ]
  },

  tooltipSettings: {
    visible: true,
    template:
      '<div style="' +
      'display:flex;' +
      'gap:10px;' +
      'align-items:center;' +
      'min-width:210px;' +
      'background:#111827;' +
      'color:white;' +
      'padding:10px;' +
      'border-radius:8px;' +
      '">' +
      '${ImageUrl}' +
      '<div>' +
      '<div style="font-weight:700;">${Product}</div>' +
      '<div>Sales: ${Sales}</div>' +
      '<div>Category: ${Category}</div>' +
      '<div>Profit: ${Profit}%</div>' +
      '</div>' +
      '</div>'
  },

  legendSettings: {
    visible: true,
    position: 'Bottom',
    title: 'Product Categories',
    border: {
      color: '#d1d5db',
      width: 1
    },
    textStyle: {
      color: '#111827',
      fontFamily: 'Arial',
      size: '13px'
    }
  },

  selectionSettings: {
    enable: true,
    fill: '#93c5fd',
    border: {
      color: '#1d4ed8',
      width: 2
    }
  },

  highlightSettings: {
    enable: true,
    fill: '#fde68a',
    border: {
      color: '#d97706',
      width: 2
    }
  }
});

treemap.appendTo('#container');
```

## Best Practices

### Use Clear Label Text

Keep labels short and immediately understandable.

#### Recommended

```typescript
leafItemSettings: {
  labelPath: 'Product',
  labelFormat: '${Product}: ${Sales}'
}
```

```javascript
leafItemSettings: {
  labelPath: 'Product',
  labelFormat: '${Product}: ${Sales}'
}
```

### Avoid Overcrowding Labels

Do not place all available information inside the label.

#### Avoid

```typescript
leafItemSettings: {
  labelPath: 'Product',
  labelFormat:
    '${Product} ${Sales} ${Category} ${Profit} ${Description}'
}
```

```javascript
leafItemSettings: {
  labelPath: 'Product',
  labelFormat:
    '${Product} ${Sales} ${Category} ${Profit} ${Description}'
}
```

Move secondary information such as category, profit, and description into the tooltip.

### Show Additional Information in Tooltips

Use labels for primary identification and tooltips for supporting details.

```typescript
tooltipSettings: {
  visible: true,
  format:
    'Product: ${Product}<br/>' +
    'Sales: ${Sales}<br/>' +
    'Category: ${Category}'
}
```

```javascript
tooltipSettings: {
  visible: true,
  format:
    'Product: ${Product}<br/>' +
    'Sales: ${Sales}<br/>' +
    'Category: ${Category}'
}
```

### Use Legends for Categorical Data

Set `equalColorValuePath` to the field that identifies the category.

```typescript
equalColorValuePath: 'Category'
```

```javascript
equalColorValuePath: 'Category'
```

Provide matching equal-value color mappings.

```typescript
leafItemSettings: {
  colorMapping: [
    {
      value: 'Electronics',
      color: '#2563eb',
      label: 'Electronics'
    },
    {
      value: 'Furniture',
      color: '#16a34a',
      label: 'Furniture'
    }
  ]
}
```

Enable the legend and inject `TreeMapLegend`.

```typescript
TreeMap.Inject(TreeMapLegend);

const treemap: TreeMap = new TreeMap({
  legendSettings: {
    visible: true
  }
});
```

### Keep TypeScript Types Explicit

Define interfaces for the TreeMap data rather than using broad types for all values.

#### Recommended

```typescript
interface ProductData {
  Product: string;
  Sales: number;
  Category: string;
}

const data: ProductData[] = [
  {
    Product: 'Laptop',
    Sales: 15000,
    Category: 'Electronics'
  }
];
```

Explicit interfaces improve editor assistance and help detect invalid data before runtime.

## Troubleshooting

### Labels Are Not Displayed

Confirm that:

1. `labelPath` matches an existing field in the data source.
2. `showLabels` is not set to `false`.
3. Each data item contains the label field.
4. `weightValuePath` contains valid numeric values.
5. The TreeMap container has a visible width and height.

```typescript
leafItemSettings: {
  labelPath: 'Product',
  showLabels: true
}
```

```javascript
leafItemSettings: {
  labelPath: 'Product',
  showLabels: true
}
```

### Labels Are Truncated Unexpectedly

Set an appropriate `interSectAction`.

```typescript
leafItemSettings: {
  labelPath: 'Product',
  interSectAction: 'WrapByWord'
}
```

Use `Trim` when a single-line label is preferred or `Hide` when incomplete labels should not be shown.

### Tooltip Is Not Displayed

Confirm that `TreeMapTooltip` is imported and injected in TypeScript.

```typescript
import {
  TreeMap,
  TreeMapTooltip
} from '@syncfusion/ej2-treemap';

TreeMap.Inject(TreeMapTooltip);
```

Enable tooltip visibility.

```typescript
tooltipSettings: {
  visible: true
}
```

For the global JavaScript version, inject the module from the EJ2 namespace.

```javascript
ej.treemap.TreeMap.Inject(
  ej.treemap.TreeMapTooltip
);
```

### Tooltip Placeholders Are Displayed as Literal Text

Confirm that each placeholder matches a real field in the data source.

```typescript
tooltipSettings: {
  visible: true,
  format: '${Product}: ${Sales}'
}
```

When using a TypeScript template literal, escape TreeMap placeholders.

```typescript
const template: string = `
  <div>\${Product}: \${Sales}</div>
`;
```

Without the backslash, JavaScript attempts to evaluate `${Product}` while creating the string.

### Legend Is Not Displayed

Confirm that:

1. `TreeMapLegend` is injected.
2. `legendSettings.visible` is `true`.
3. A valid color-mapping source is configured.
4. `equalColorValuePath` matches the categorical field when equal color mapping is used.
5. Every `colorMapping.value` corresponds to a data-source category.

```typescript
TreeMap.Inject(TreeMapLegend);
```

```typescript
const treemap: TreeMap = new TreeMap({
  equalColorValuePath: 'Category',
  legendSettings: {
    visible: true
  },
  leafItemSettings: {
    colorMapping: [
      {
        value: 'Electronics',
        color: '#2563eb',
        label: 'Electronics'
      }
    ]
  }
});
```

### Selection Is Not Working

Inject `TreeMapSelection` and enable selection.

```typescript
TreeMap.Inject(TreeMapSelection);
```

```typescript
selectionSettings: {
  enable: true
}
```

For JavaScript:

```javascript
ej.treemap.TreeMap.Inject(
  ej.treemap.TreeMapSelection
);
```

### Highlight Is Not Working

Inject `TreeMapHighlight` and enable highlighting.

```typescript
TreeMap.Inject(TreeMapHighlight);
```

```typescript
highlightSettings: {
  enable: true
}
```

For JavaScript:

```javascript
ej.treemap.TreeMap.Inject(
  ej.treemap.TreeMapHighlight
);
```

### TreeMap Is Not Visible

Confirm that:

1. The target element exists before `appendTo` is called.
2. The selector passed to `appendTo` is correct.
3. The container has a nonzero width and height.
4. The required Syncfusion styles and scripts are loaded.
5. No earlier JavaScript error prevents initialization.

```html
<div id="container"></div>
```

```css
#container {
  width: 100%;
  height: 500px;
}
```

```typescript
treemap.appendTo('#container');
```

### Images Are Not Displayed in Tooltip Templates

Confirm that:

1. `ImageUrl` exists in every required data item.
2. The file path is valid relative to the deployed application.
3. The image is included in the application output.
4. The server allows the image to be loaded.
5. The placeholder uses the exact case of the data field.

```typescript
interface ProductData {
  Product: string;
  Sales: number;
  ImageUrl: string;
}
```

```typescript
tooltipSettings: {
  visible: true,
  template:
    '${ImageUrl}'
}
```

Use trusted image sources and validate externally supplied content before inserting it into an HTML template.