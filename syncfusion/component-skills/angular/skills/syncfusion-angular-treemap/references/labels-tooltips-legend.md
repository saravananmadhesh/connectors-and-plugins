# Labels, Tooltips, and Legend in Angular TreeMap

## Table of Contents

- [Data Labels](#data-labels)
  - [Enable Labels](#enable-labels)
  - [Label Positioning](#label-positioning)
- [Label Formatting](#label-formatting)
  - [Format String Syntax](#format-string-syntax)
  - [Number Formatting in Labels](#number-formatting-in-labels)
  - [Multi-Line Labels](#multi-line-labels)
- [Label Templates](#label-templates)
  - [Basic Label Template](#basic-label-template)
  - [Advanced Template with Styling](#advanced-template-with-styling)
  - [Template with Conditional Logic](#template-with-conditional-logic)
  - [Template Positioning](#template-positioning)
- [Handling Label Intersections](#handling-label-intersections)
  - [InterSectAction Options](#intersectaction-options)
  - [Trim Long Labels](#trim-long-labels)
  - [Wrap Text to Multiple Lines](#wrap-text-to-multiple-lines)
- [Tooltips](#tooltips)
  - [Enable Tooltips](#enable-tooltips)
  - [Default Tooltip Behavior](#default-tooltip-behavior)
- [Tooltip Formatting](#tooltip-formatting)
  - [Format with Multiple Fields](#format-with-multiple-fields)
  - [Format with Currency](#format-with-currency)
- [Tooltip Templates](#tooltip-templates)
  - [Custom Tooltip Template](#custom-tooltip-template)
  - [Tooltip with Images](#tooltip-with-images)
- [Legend Configuration](#legend-configuration)
  - [Enable Legend](#enable-legend)
  - [Legend Positioning](#legend-positioning)
  - [Legend with Title](#legend-with-title)
  - [Legend Item Styling](#legend-item-styling)
- [Legend and Item Synchronization](#legend-and-item-synchronization)
  - [Click Legend to Select Items](#click-legend-to-select-items)
  - [Highlight on Legend Hover](#highlight-on-legend-hover)
- [Complete Example with All Features](#complete-example-with-all-features)
- [Best Practices](#best-practices)
  - [DO: Use Clear Label Text](#do-use-clear-label-text)
  - [DON'T: Overcrowd Labels](#dont-overcrowd-labels)
  - [DO: Show Related Information in Tooltips](#do-show-related-information-in-tooltips)
  - [DO: Use Legend for Categorical Data](#do-use-legend-for-categorical-data)
  - [Troubleshooting](#troubleshooting)

## Data Labels

TreeMap data labels are configured through `leafItemSettings`. The main label options are `labelPath`, `showLabels`, `labelPosition`, `labelFormat`, `labelTemplate`, `templatePosition`, and `interSectAction`.

### Enable Labels

```typescript
import { Component, signal } from '@angular/core';
import { TreeMapModule } from '@syncfusion/ej2-angular-treemap';

@Component({
  selector: 'app-treemap',
  standalone: true,
  imports: [TreeMapModule],
  template: `
    <ejs-treemap
      id="treemap-container"
      [dataSource]="data()"
      weightValuePath="Sales"
      [leafItemSettings]="leafItemSettings">
    </ejs-treemap>
  `,
  styles: [`
    #treemap-container {
      display: block;
      width: 100%;
      height: 500px;
    }
  `]
})
export class TreeMapComponent {
  public data = signal([
    { Product: 'Laptop', Sales: 15000 },
    { Product: 'Phone', Sales: 12000 },
    { Product: 'Tablet', Sales: 8000 }
  ]);

  public leafItemSettings = {
    labelPath: 'Product',
    showLabels: true,
    gap: 4,
    border: { color: '#ffffff', width: 1 }
  };
}
```

**Built-in label properties:**

- `labelPath`: field used as the label text
- `showLabels`: shows or hides labels
- `labelPosition`: places the label inside the item
- `labelFormat`: formats label text
- `labelTemplate`: renders custom label content
- `templatePosition`: places template content inside the item
- `interSectAction`: controls label overflow behavior

### Label Positioning

Use `labelPosition` to place the label inside the item.

```typescript
public leafItemSettings = {
  labelPath: 'Product',
  showLabels: true,
  labelPosition: 'Center',
  gap: 4,
  border: { color: '#ffffff', width: 1 }
};
```

**Common positions:**

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

Use `labelFormat` when you want simple text composition. If you also want culture-aware number formatting, combine the TreeMap `format` property with the label text.

### Format String Syntax

```typescript
import { Component, signal } from '@angular/core';
import { TreeMapModule } from '@syncfusion/ej2-angular-treemap';

@Component({
  selector: 'app-treemap',
  standalone: true,
  imports: [TreeMapModule],
  template: `
    <ejs-treemap
      [dataSource]="data()"
      weightValuePath="Sales"
      [leafItemSettings]="leafItemSettings">
    </ejs-treemap>
  `
})
export class TreeMapComponent {
  public data = signal([
    { Product: 'Laptop', Sales: 15000 },
    { Product: 'Phone', Sales: 12000 }
  ]);

  public leafItemSettings = {
    labelPath: 'Product',
    showLabels: true,
    labelFormat: '${Product}: ${Sales}',
    gap: 4,
    border: { color: '#ffffff', width: 1 }
  };
}
```

### Number Formatting in Labels

Use the TreeMap `format` property for numeric formatting and keep the label text simple.

```typescript
import { Component, signal } from '@angular/core';
import { TreeMapModule } from '@syncfusion/ej2-angular-treemap';

@Component({
  selector: 'app-treemap',
  standalone: true,
  imports: [TreeMapModule],
  template: `
    <ejs-treemap
      [dataSource]="data()"
      weightValuePath="Sales"
      format="n2"
      [useGroupingSeparator]="true"
      [leafItemSettings]="leafItemSettings">
    </ejs-treemap>
  `
})
export class TreeMapComponent {
  public data = signal([
    { Product: 'Laptop', Sales: 15000.25 },
    { Product: 'Phone', Sales: 12000.5 }
  ]);

  public leafItemSettings = {
    labelPath: 'Product',
    showLabels: true,
    labelFormat: '${Product}: ${Sales}',
    gap: 4,
    border: { color: '#ffffff', width: 1 }
  };
}
```

### Multi-Line Labels

Use `labelTemplate` when you want predictable multi-line label layout.

```typescript
import { Component, signal } from '@angular/core';
import { TreeMapModule } from '@syncfusion/ej2-angular-treemap';

@Component({
  selector: 'app-treemap',
  standalone: true,
  imports: [TreeMapModule],
  template: `
    <ejs-treemap
      [dataSource]="data()"
      weightValuePath="Sales"
      [leafItemSettings]="leafItemSettings">
    </ejs-treemap>
  `
})
export class TreeMapComponent {
  public data = signal([
    { Product: 'Laptop', Sales: 15000 },
    { Product: 'Phone', Sales: 12000 }
  ]);

  public leafItemSettings = {
    labelPath: 'Product',
    showLabels: true,
    labelTemplate: `
      <div style="text-align:center; color:white; font-weight:600;">
        <div>\${Product}</div>
        <div>\${Sales}</div>
      </div>
    `,
    templatePosition: 'Center',
    gap: 4,
    border: { color: '#ffffff', width: 1 }
  };
}
```

## Label Templates

Use `labelTemplate` when you need custom markup or more control than `labelFormat` can provide.

### Basic Label Template

```typescript
import { Component, signal } from '@angular/core';
import { TreeMapModule } from '@syncfusion/ej2-angular-treemap';

@Component({
  selector: 'app-treemap',
  standalone: true,
  imports: [TreeMapModule],
  template: `
    <ejs-treemap
      [dataSource]="data()"
      weightValuePath="Sales"
      [leafItemSettings]="leafItemSettings">
    </ejs-treemap>
  `
})
export class TreeMapComponent {
  public data = signal([
    { Product: 'Laptop', Sales: 15000 },
    { Product: 'Phone', Sales: 12000 }
  ]);

  public leafItemSettings = {
    labelPath: 'Product',
    showLabels: true,
    labelTemplate: `<div style="color:white; font-weight:700;">\${Product}</div>`,
    templatePosition: 'Center',
    gap: 4,
    border: { color: '#ffffff', width: 1 }
  };
}
```

### Advanced Template with Styling

```typescript
public leafItemSettings = {
  labelPath: 'Product',
  showLabels: true,
  labelTemplate: `
    <div style="padding:8px; background:rgba(0,0,0,0.45); border-radius:6px; color:white;">
      <div style="font-size:14px; font-weight:700;">\${Product}</div>
      <div style="font-size:12px;">Sales: \${Sales}</div>
    </div>
  `,
  templatePosition: 'Center',
  gap: 4,
  border: { color: '#ffffff', width: 1 }
};
```

### Template with Conditional Logic

Prepare conditional values in the bound data and reference them inside the label template.

```typescript
import { Component, computed, signal } from '@angular/core';
import { TreeMapModule } from '@syncfusion/ej2-angular-treemap';

@Component({
  selector: 'app-treemap',
  standalone: true,
  imports: [TreeMapModule],
  template: `
    <ejs-treemap
      [dataSource]="dataWithStyles()"
      weightValuePath="Sales"
      [leafItemSettings]="leafItemSettings">
    </ejs-treemap>
  `
})
export class TreeMapComponent {
  public rawData = signal([
    { Product: 'Laptop', Sales: 15000 },
    { Product: 'Phone', Sales: 9000 }
  ]);

  public dataWithStyles = computed(() =>
    this.rawData().map((item) => ({
      ...item,
      LabelColor: item.Sales > 10000 ? 'green' : 'orange',
      LabelWeight: item.Sales > 10000 ? '700' : '400'
    }))
  );

  public leafItemSettings = {
    labelPath: 'Product',
    showLabels: true,
    labelTemplate: `
      <div style="color:\${LabelColor}; font-weight:\${LabelWeight};">
        \${Product}
      </div>
    `,
    templatePosition: 'Center',
    gap: 4,
    border: { color: '#ffffff', width: 1 }
  };
}
```

### Template Positioning

Use `templatePosition` to place label template content.

```typescript
public leafItemSettings = {
  labelPath: 'Product',
  showLabels: true,
  labelTemplate: `<div style="color:white;">\${Product}</div>`,
  templatePosition: 'Center',
  gap: 4,
  border: { color: '#ffffff', width: 1 }
};
```

**Common positions:**

- `Top`
- `Center`
- `Bottom`

## Handling Label Intersections

Use `interSectAction` to control how labels behave when space is limited.

### InterSectAction Options

```typescript
public leafItemSettings = {
  labelPath: 'Product',
  showLabels: true,
  interSectAction: 'Trim',
  gap: 4,
  border: { color: '#ffffff', width: 1 }
};
```

**Built-in actions:**

- `None`
- `Trim`
- `Wrap`
- `Hide`

### Trim Long Labels

```typescript
public leafItemSettings = {
  labelPath: 'Product',
  showLabels: true,
  interSectAction: 'Trim',
  gap: 4,
  border: { color: '#ffffff', width: 1 }
};
```

Use `Trim` when the item rectangle is too small for the full label.

### Wrap Text to Multiple Lines

```typescript
public leafItemSettings = {
  labelPath: 'Product',
  showLabels: true,
  interSectAction: 'Wrap',
  gap: 4,
  border: { color: '#ffffff', width: 1 }
};
```

Use `Wrap` when you want long labels to stay visible across multiple lines.

## Tooltips

Tooltips are configured through `tooltipSettings`. Include `TreeMapTooltipService` when tooltip behavior is enabled.

### Enable Tooltips

```typescript
import { Component, signal } from '@angular/core';
import {
  TreeMapModule,
  TreeMapTooltipService
} from '@syncfusion/ej2-angular-treemap';

@Component({
  selector: 'app-treemap',
  standalone: true,
  imports: [TreeMapModule],
  providers: [TreeMapTooltipService],
  template: `
    <ejs-treemap
      [dataSource]="data()"
      weightValuePath="Sales"
      [tooltipSettings]="tooltipSettings"
      [leafItemSettings]="leafItemSettings">
    </ejs-treemap>
  `
})
export class TreeMapComponent {
  public data = signal([
    { Product: 'Laptop', Sales: 15000 },
    { Product: 'Phone', Sales: 12000 }
  ]);

  public tooltipSettings = {
    visible: true
  };

  public leafItemSettings = {
    labelPath: 'Product'
  };
}
```

### Default Tooltip Behavior

When tooltip is enabled, TreeMap shows item-related information. If you want reliable, user-facing text, define a `format` or `template` explicitly.

## Tooltip Formatting

Use `tooltipSettings.format` when plain text with multiple fields is enough.

### Format with Multiple Fields

```typescript
import { Component, signal } from '@angular/core';
import {
  TreeMapModule,
  TreeMapTooltipService
} from '@syncfusion/ej2-angular-treemap';

@Component({
  selector: 'app-treemap',
  standalone: true,
  imports: [TreeMapModule],
  providers: [TreeMapTooltipService],
  template: `
    <ejs-treemap
      [dataSource]="data()"
      weightValuePath="Sales"
      [tooltipSettings]="tooltipSettings"
      [leafItemSettings]="leafItemSettings">
    </ejs-treemap>
  `
})
export class TreeMapComponent {
  public data = signal([
    { Product: 'Laptop', Sales: 15000, Category: 'Electronics' },
    { Product: 'Chair', Sales: 8000, Category: 'Furniture' }
  ]);

  public tooltipSettings = {
    visible: true,
    format: 'Product: ${Product}<br/>Sales: ${Sales}<br/>Category: ${Category}'
  };

  public leafItemSettings = {
    labelPath: 'Product'
  };
}
```

### Format with Currency

Combine the TreeMap `format` property with tooltip text when you want currency-aware values.

```typescript
import { Component, signal } from '@angular/core';
import {
  TreeMapModule,
  TreeMapTooltipService
} from '@syncfusion/ej2-angular-treemap';

@Component({
  selector: 'app-treemap',
  standalone: true,
  imports: [TreeMapModule],
  providers: [TreeMapTooltipService],
  template: `
    <ejs-treemap
      [dataSource]="data()"
      weightValuePath="Price"
      format="c2"
      [useGroupingSeparator]="true"
      [tooltipSettings]="tooltipSettings"
      [leafItemSettings]="leafItemSettings">
    </ejs-treemap>
  `
})
export class TreeMapComponent {
  public data = signal([
    { Product: 'Laptop', Price: 1200 },
    { Product: 'Phone', Price: 900 }
  ]);

  public tooltipSettings = {
    visible: true,
    format: '${Product}: ${Price}'
  };

  public leafItemSettings = {
    labelPath: 'Product'
  };
}
```

## Tooltip Templates

Use `tooltipSettings.template` when you need rich custom markup.

### Custom Tooltip Template

```typescript
import { Component, signal } from '@angular/core';
import {
  TreeMapModule,
  TreeMapTooltipService
} from '@syncfusion/ej2-angular-treemap';

@Component({
  selector: 'app-treemap',
  standalone: true,
  imports: [TreeMapModule],
  providers: [TreeMapTooltipService],
  template: `
    <ejs-treemap
      [dataSource]="data()"
      weightValuePath="Sales"
      [tooltipSettings]="tooltipSettings"
      [leafItemSettings]="leafItemSettings">
    </ejs-treemap>
  `
})
export class TreeMapComponent {
  public data = signal([
    { Product: 'Laptop', Sales: 15000, Profit: 25 },
    { Product: 'Phone', Sales: 12000, Profit: 18 }
  ]);

  public tooltipSettings = {
    visible: true,
    template: `
      <div style="background:#333; color:white; padding:10px; border-radius:6px;">
        <div style="font-weight:700;">\${Product}</div>
        <div>Sales: \${Sales}</div>
        <div>Profit: \${Profit}%</div>
      </div>
    `
  };

  public leafItemSettings = {
    labelPath: 'Product'
  };
}
```

### Tooltip with Images

Use fields from the bound data to render rich tooltip content such as images and descriptions.

```typescript
public tooltipSettings = {
  visible: true,
  template: `
    <div style="display:flex; gap:10px; align-items:center;">
      <img src="\${ImageUrl}" alt="\${Product}" style="width:40px; height:40px; object-fit:cover; border-radius:4px;" />
      <div>
        <div style="font-weight:700;">\${Product}</div>
        <div>\${Description}</div>
      </div>
    </div>
  `
};
```

## Legend Configuration

Legend support is built in. Include `TreeMapLegendService` when legend behavior is enabled.

### Enable Legend

```typescript
import { Component, signal } from '@angular/core';
import {
  TreeMapModule,
  TreeMapLegendService
} from '@syncfusion/ej2-angular-treemap';

@Component({
  selector: 'app-treemap',
  standalone: true,
  imports: [TreeMapModule],
  providers: [TreeMapLegendService],
  template: `
    <ejs-treemap
      [dataSource]="data()"
      weightValuePath="Sales"
      equalColorValuePath="Category"
      [legendSettings]="legendSettings"
      [leafItemSettings]="leafItemSettings">
    </ejs-treemap>
  `
})
export class TreeMapComponent {
  public data = signal([
    { Product: 'Laptop', Sales: 15000, Category: 'Electronics' },
    { Product: 'Chair', Sales: 8000, Category: 'Furniture' },
    { Product: 'Shirt', Sales: 5000, Category: 'Clothing' }
  ]);

  public legendSettings = {
    visible: true
  };

  public leafItemSettings = {
    labelPath: 'Product',
    colorMapping: [
      { value: 'Electronics', color: '#2563eb', label: 'Electronics' },
      { value: 'Furniture', color: '#16a34a', label: 'Furniture' },
      { value: 'Clothing', color: '#ea580c', label: 'Clothing' }
    ]
  };
}
```

### Legend Positioning

Use `legendSettings.position` to place the legend.

```typescript
public legendSettings = {
  visible: true,
  position: 'Top'
};
```

**Common positions:**

- `Top`
- `Bottom`
- `Left`
- `Right`

### Legend with Title

```typescript
public legendSettings = {
  visible: true,
  position: 'Bottom',
  title: 'Product Categories'
};
```

### Legend Item Styling

```typescript
public legendSettings = {
  visible: true,
  border: { color: '#333333', width: 1 },
  textStyle: {
    color: '#333333',
    fontFamily: 'Arial',
    size: '14px'
  }
};
```

## Legend and Item Synchronization

Legend interaction can be combined with selection and highlight features. Include the related services when these behaviors are enabled.

### Click Legend to Select Items

Enable selection and legend support together when you want legend interaction to affect the related TreeMap items.

```typescript
import { Component, signal } from '@angular/core';
import {
  TreeMapModule,
  TreeMapLegendService,
  TreeMapSelectionService
} from '@syncfusion/ej2-angular-treemap';

@Component({
  selector: 'app-treemap',
  standalone: true,
  imports: [TreeMapModule],
  providers: [TreeMapLegendService, TreeMapSelectionService],
  template: `
    <ejs-treemap
      [dataSource]="data()"
      weightValuePath="Sales"
      equalColorValuePath="Category"
      [legendSettings]="legendSettings"
      [selectionSettings]="selectionSettings"
      [leafItemSettings]="leafItemSettings">
    </ejs-treemap>
  `
})
export class TreeMapComponent {
  public data = signal([
    { Product: 'Laptop', Sales: 15000, Category: 'Electronics' },
    { Product: 'Chair', Sales: 8000, Category: 'Furniture' }
  ]);

  public legendSettings = {
    visible: true
  };

  public selectionSettings = {
    enable: true,
    fill: '#dbeafe',
    border: { color: '#1d4ed8', width: 1 }
  };

  public leafItemSettings = {
    labelPath: 'Product',
    colorMapping: [
      { value: 'Electronics', color: '#2563eb', label: 'Electronics' },
      { value: 'Furniture', color: '#16a34a', label: 'Furniture' }
    ]
  };
}
```

### Highlight on Legend Hover

Enable highlight and legend support together when you want legend hover to affect the related TreeMap items.

```typescript
import { Component, signal } from '@angular/core';
import {
  TreeMapModule,
  TreeMapLegendService,
  TreeMapHighlightService
} from '@syncfusion/ej2-angular-treemap';

@Component({
  selector: 'app-treemap',
  standalone: true,
  imports: [TreeMapModule],
  providers: [TreeMapLegendService, TreeMapHighlightService],
  template: `
    <ejs-treemap
      [dataSource]="data()"
      weightValuePath="Sales"
      equalColorValuePath="Category"
      [legendSettings]="legendSettings"
      [highlightSettings]="highlightSettings"
      [leafItemSettings]="leafItemSettings">
    </ejs-treemap>
  `
})
export class TreeMapComponent {
  public data = signal([
    { Product: 'Laptop', Sales: 15000, Category: 'Electronics' },
    { Product: 'Chair', Sales: 8000, Category: 'Furniture' }
  ]);

  public legendSettings = {
    visible: true
  };

  public highlightSettings = {
    enable: true,
    fill: '#fde68a',
    border: { color: '#d97706', width: 1 }
  };

  public leafItemSettings = {
    labelPath: 'Product',
    colorMapping: [
      { value: 'Electronics', color: '#2563eb', label: 'Electronics' },
      { value: 'Furniture', color: '#16a34a', label: 'Furniture' }
    ]
  };
}
```

## Complete Example with All Features

```typescript
import { Component, signal } from '@angular/core';
import {
  TreeMapModule,
  TreeMapTooltipService,
  TreeMapLegendService,
  TreeMapSelectionService,
  TreeMapHighlightService
} from '@syncfusion/ej2-angular-treemap';

@Component({
  selector: 'app-treemap',
  standalone: true,
  imports: [TreeMapModule],
  providers: [
    TreeMapTooltipService,
    TreeMapLegendService,
    TreeMapSelectionService,
    TreeMapHighlightService
  ],
  template: `
    <ejs-treemap
      id="treemap-container"
      [dataSource]="data()"
      weightValuePath="Sales"
      equalColorValuePath="Category"
      format="n0"
      [useGroupingSeparator]="true"
      [leafItemSettings]="leafItemSettings"
      [tooltipSettings]="tooltipSettings"
      [legendSettings]="legendSettings"
      [selectionSettings]="selectionSettings"
      [highlightSettings]="highlightSettings">
    </ejs-treemap>
  `,
  styles: [`
    #treemap-container {
      display: block;
      width: 100%;
      height: 560px;
    }
  `]
})
export class TreeMapComponent {
  public data = signal([
    {
      Product: 'Laptop',
      Sales: 15000,
      Category: 'Electronics',
      Profit: 25,
      Description: 'Portable computer',
      ImageUrl: 'assets/laptop.png'
    },
    {
      Product: 'Chair',
      Sales: 8000,
      Category: 'Furniture',
      Profit: 15,
      Description: 'Office chair',
      ImageUrl: 'assets/chair.png'
    },
    {
      Product: 'Shirt',
      Sales: 5000,
      Category: 'Clothing',
      Profit: 18,
      Description: 'Cotton shirt',
      ImageUrl: 'assets/shirt.png'
    }
  ]);

  public leafItemSettings = {
    labelPath: 'Product',
    showLabels: true,
    labelPosition: 'Center',
    interSectAction: 'Wrap',
    labelTemplate: `
      <div style="text-align:center; color:white; font-weight:600; padding:4px;">
        <div>\${Product}</div>
        <div style="font-size:11px;">\${Sales}</div>
      </div>
    `,
    templatePosition: 'Center',
    gap: 4,
    border: { color: '#ffffff', width: 1 },
    colorMapping: [
      { value: 'Electronics', color: '#2563eb', label: 'Electronics' },
      { value: 'Furniture', color: '#16a34a', label: 'Furniture' },
      { value: 'Clothing', color: '#ea580c', label: 'Clothing' }
    ]
  };

  public tooltipSettings = {
    visible: true,
    template: `
      <div style="display:flex; gap:10px; align-items:center; background:#111827; color:white; padding:10px; border-radius:8px;">
        <img src="\${ImageUrl}" alt="\${Product}" style="width:40px; height:40px; object-fit:cover; border-radius:4px;" />
        <div>
          <div style="font-weight:700;">\${Product}</div>
          <div>Sales: \${Sales}</div>
          <div>Category: \${Category}</div>
          <div>Profit: \${Profit}%</div>
        </div>
      </div>
    `
  };

  public legendSettings = {
    visible: true,
    position: 'Bottom',
    title: 'Product Categories',
    border: { color: '#d1d5db', width: 1 },
    textStyle: {
      color: '#111827',
      fontFamily: 'Arial',
      size: '13px'
    }
  };

  public selectionSettings = {
    enable: true,
    fill: '#dbeafe',
    border: { color: '#2563eb', width: 1 }
  };

  public highlightSettings = {
    enable: true,
    fill: '#fde68a',
    border: { color: '#d97706', width: 1 }
  };
}
```

## Best Practices

### DO: Use Clear Label Text

```typescript
public leafItemSettings = {
  labelPath: 'Product',
  labelFormat: '${Product}: ${Sales}'
};
```

Keep labels compact and understandable.

### DON'T: Overcrowd Labels

```typescript
public leafItemSettings = {
  labelPath: 'Product',
  labelFormat: '${Product} ${Sales} ${Category} ${Profit} ${Description}'
};
```

When too much information is packed into labels, readability drops quickly. Move secondary information into tooltips instead.

### DO: Show Related Information in Tooltips

```typescript
public tooltipSettings = {
  visible: true,
  format: 'Name: ${Product}<br/>Value: ${Sales}<br/>Category: ${Category}'
};
```

Tooltips are the best place for extra context that does not need to stay visible all the time.

### DO: Use Legend for Categorical Data

```typescript
equalColorValuePath="Category"
```

```typescript
public legendSettings = {
  visible: true
};
```

Legends are most helpful when color represents category meaning.

### Troubleshooting

**Issue:** Labels are not showing

**Solution:** Verify that `labelPath` matches a real field in the data source and that labels are enabled.

```typescript
public leafItemSettings = {
  labelPath: 'Product',
  showLabels: true
};
```

**Issue:** Tooltip is not showing on hover

**Solution:** Enable tooltip visibility and provide the tooltip service.

```typescript
providers: [TreeMapTooltipService]
```

```typescript
public tooltipSettings = {
  visible: true
};
```

**Issue:** Legend is not showing

**Solution:** Enable legend visibility, include the legend service, and make sure the TreeMap has a meaningful legend source such as category-based color mapping.

```typescript
providers: [TreeMapLegendService]
```

```typescript
public legendSettings = {
  visible: true
};
```

**Issue:** Legend interaction is not syncing with item states

**Solution:** Enable the related settings and providers explicitly.

```typescript
providers: [TreeMapSelectionService, TreeMapHighlightService]
```

```typescript
public selectionSettings = {
  enable: true
};

public highlightSettings = {
  enable: true
};
```