# Print, Export, and Accessibility in Angular TreeMap

## Table of Contents

- [Print Functionality](#print-functionality)
  - [Enable Print](#enable-print)
  - [Print Options](#print-options)
- [Image Export](#image-export)
  - [Export as PNG](#export-as-png)
  - [Export as JPEG](#export-as-jpeg)
  - [Export as SVG](#export-as-svg)
  - [Export to Base64](#export-to-base64)
  - [Export Configuration](#export-configuration)
- [PDF Export](#pdf-export)
  - [Enable PDF Export](#enable-pdf-export)
  - [PDF Orientation](#pdf-orientation)
  - [Multiple Exports](#multiple-exports)
- [Complete Export Example](#complete-export-example)
- [Accessibility Overview](#accessibility-overview)
  - [Accessibility Standards](#accessibility-standards)
- [WCAG Compliance](#wcag-compliance)
  - [Semantic HTML](#semantic-html)
  - [Color Contrast](#color-contrast)
- [Screen Reader Support](#screen-reader-support)
  - [ARIA Labels](#aria-labels)
  - [Custom Accessibility Labels](#custom-accessibility-labels)
- [Color Contrast Best Practices](#color-contrast-best-practices)
  - [DO: Use High Contrast Colors](#do-use-high-contrast-colors)
  - [DON'T: Use Low Contrast Combinations](#dont-use-low-contrast-combinations)
  - [Accessible Color Palette](#accessible-color-palette)
- [Complete Accessible TreeMap](#complete-accessible-treemap)
- [Accessibility Checklist](#accessibility-checklist)
- [Testing for Accessibility](#testing-for-accessibility)
  - [Browser DevTools](#browser-devtools)
  - [Screen Reader Testing](#screen-reader-testing)
- [Troubleshooting](#troubleshooting)

## Print Functionality

Syncfusion Angular TreeMap supports built-in printing through the `allowPrint` property and the `print()` instance method.

### Enable Print

```typescript
import { Component, signal, ViewChild } from '@angular/core';
import {
  TreeMapModule,
  TreeMapComponent as SyncTreeMapComponent,
  PrintService
} from '@syncfusion/ej2-angular-treemap';

@Component({
  selector: 'app-treemap',
  standalone: true,
  imports: [TreeMapModule],
  providers: [PrintService],
  template: `
    <div class="toolbar">
      <button type="button" (click)="printTreeMap()">Print</button>
    </div>

    <ejs-treemap
      #treemap
      id="treemap-container"
      [dataSource]="data()"
      weightValuePath="Sales"
      [allowPrint]="true"
      [leafItemSettings]="leafItemSettings">
    </ejs-treemap>
  `,
  styles: [`
    :host {
      display: block;
      padding: 12px;
      box-sizing: border-box;
      font-family: Arial, Helvetica, sans-serif;
    }

    .toolbar {
      margin-bottom: 12px;
    }

    button {
      padding: 8px 12px;
      border: 1px solid #cbd5e1;
      background: #ffffff;
      border-radius: 8px;
      cursor: pointer;
    }

    #treemap-container {
      display: block;
      width: 100%;
      height: 520px;
    }
  `]
})
export class TreeMapComponent {
  @ViewChild('treemap')
  public treemap?: SyncTreeMapComponent;

  public data = signal([
    { Product: 'Laptop', Sales: 15000 },
    { Product: 'Phone', Sales: 12000 }
  ]);

  public leafItemSettings = {
    labelPath: 'Product',
    gap: 4,
    border: { color: '#ffffff', width: 1 }
  };

  public printTreeMap(): void {
    this.treemap?.print();
  }
}
```

**Key Properties:**

- `allowPrint`: Enables print capability.
- `print()`: Opens the browser print flow for the TreeMap.

### Print Options

Use the `print()` method on the TreeMap instance to print the rendered TreeMap.

```typescript
public printTreeMap(): void {
  this.treemap?.print();
}
```

## Image Export

TreeMap supports built-in image export through `allowImageExport` and the `export()` instance method.

### Export as PNG

```typescript
import { Component, signal, ViewChild } from '@angular/core';
import {
  TreeMapModule,
  TreeMapComponent as SyncTreeMapComponent,
  ImageExportService
} from '@syncfusion/ej2-angular-treemap';

@Component({
  selector: 'app-treemap',
  standalone: true,
  imports: [TreeMapModule],
  providers: [ImageExportService],
  template: `
    <button type="button" (click)="exportPNG()">Export PNG</button>

    <ejs-treemap
      #treemap
      [dataSource]="data()"
      weightValuePath="Sales"
      [allowImageExport]="true"
      [leafItemSettings]="leafItemSettings">
    </ejs-treemap>
  `
})
export class TreeMapComponent {
  @ViewChild('treemap')
  public treemap?: SyncTreeMapComponent;

  public data = signal([
    { Product: 'Laptop', Sales: 15000 },
    { Product: 'Phone', Sales: 12000 }
  ]);

  public leafItemSettings = {
    labelPath: 'Product'
  };

  public exportPNG(): void {
    this.treemap?.export('PNG', 'treemap');
  }
}
```

### Export as JPEG

```typescript
public exportJPEG(): void {
  this.treemap?.export('JPEG', 'treemap');
}
```

### Export as SVG

```typescript
public exportSVG(): void {
  this.treemap?.export('SVG', 'treemap');
}
```

### Export to Base64

Use `allowDownload = false` when you want the exported result programmatically. Base64 export is useful for image workflows such as preview, upload, or storage. Use `PNG` or `JPEG` for this pattern.

```typescript
public async exportBase64(): Promise<void> {
  if (!this.treemap) {
    return;
  }

  const base64Data = await this.treemap.export(
    'PNG',
    'treemap',
    undefined,
    false
  );

  console.log(base64Data);
}
```

### Export Configuration

```typescript
export(
  type: 'PNG' | 'JPEG' | 'SVG' | 'PDF',
  fileName: string,
  orientation?: PdfPageOrientation,
  allowDownload?: boolean
)
```

- `orientation` is used for PDF export.
- `allowDownload` can be set to `false` when you want the result programmatically instead of downloading immediately.

## PDF Export

TreeMap supports built-in PDF export through `allowPdfExport` and the `export()` instance method.

### Enable PDF Export

```typescript
import { Component, signal, ViewChild } from '@angular/core';
import {
  TreeMapModule,
  TreeMapComponent as SyncTreeMapComponent,
  PdfExportService
} from '@syncfusion/ej2-angular-treemap';

@Component({
  selector: 'app-treemap',
  standalone: true,
  imports: [TreeMapModule],
  providers: [PdfExportService],
  template: `
    <button type="button" (click)="exportPDF()">Export PDF</button>

    <ejs-treemap
      #treemap
      [dataSource]="data()"
      weightValuePath="Sales"
      [allowPdfExport]="true"
      [leafItemSettings]="leafItemSettings">
    </ejs-treemap>
  `
})
export class TreeMapComponent {
  @ViewChild('treemap')
  public treemap?: SyncTreeMapComponent;

  public data = signal([
    { Product: 'Laptop', Sales: 15000 },
    { Product: 'Phone', Sales: 12000 }
  ]);

  public leafItemSettings = {
    labelPath: 'Product'
  };

  public exportPDF(): void {
    this.treemap?.export('PDF', 'treemap');
  }
}
```

### PDF Orientation

Use `PdfPageOrientation.Portrait` or `PdfPageOrientation.Landscape` when exporting PDF.

```typescript
import { PdfPageOrientation } from '@syncfusion/ej2-pdf-export';

public exportPDFPortrait(): void {
  this.treemap?.export('PDF', 'treemap', PdfPageOrientation.Portrait);
}

public exportPDFLandscape(): void {
  this.treemap?.export('PDF', 'treemap', PdfPageOrientation.Landscape);
}
```

### Multiple Exports

Each export call produces a separate export action.

```typescript
import { PdfPageOrientation } from '@syncfusion/ej2-pdf-export';

public exportAll(): void {
  this.treemap?.export('PNG', 'treemap');
  this.treemap?.export('JPEG', 'treemap');
  this.treemap?.export('SVG', 'treemap');
  this.treemap?.export('PDF', 'treemap', PdfPageOrientation.Landscape);
}
```

## Complete Export Example

```typescript
import { Component, signal, ViewChild } from '@angular/core';
import {
  TreeMapModule,
  TreeMapComponent as SyncTreeMapComponent,
  PrintService,
  ImageExportService,
  PdfExportService
} from '@syncfusion/ej2-angular-treemap';
import { PdfPageOrientation } from '@syncfusion/ej2-pdf-export';

@Component({
  selector: 'app-treemap',
  standalone: true,
  imports: [TreeMapModule],
  providers: [PrintService, ImageExportService, PdfExportService],
  template: `
    <div class="toolbar">
      <button type="button" (click)="exportPNG()">PNG</button>
      <button type="button" (click)="exportJPEG()">JPEG</button>
      <button type="button" (click)="exportSVG()">SVG</button>
      <button type="button" (click)="exportPDF()">PDF</button>
      <button type="button" (click)="printTreeMap()">Print</button>
    </div>

    <ejs-treemap
      #treemap
      id="treemap-container"
      [dataSource]="data()"
      weightValuePath="Sales"
      [allowPrint]="true"
      [allowImageExport]="true"
      [allowPdfExport]="true"
      [leafItemSettings]="leafItemSettings">
    </ejs-treemap>
  `,
  styles: [`
    :host {
      display: block;
      padding: 12px;
      box-sizing: border-box;
      font-family: Arial, Helvetica, sans-serif;
    }

    .toolbar {
      display: flex;
      gap: 8px;
      margin-bottom: 12px;
      flex-wrap: wrap;
    }

    .toolbar button {
      padding: 8px 12px;
      border: 1px solid #cbd5e1;
      background: #ffffff;
      border-radius: 8px;
      cursor: pointer;
    }

    #treemap-container {
      display: block;
      width: 100%;
      height: 520px;
    }
  `]
})
export class TreeMapExportComponent {
  @ViewChild('treemap')
  public treemap?: SyncTreeMapComponent;

  public data = signal([
    { Product: 'Laptop', Sales: 15000 },
    { Product: 'Phone', Sales: 12000 },
    { Product: 'Tablet', Sales: 8000 }
  ]);

  public leafItemSettings = {
    labelPath: 'Product',
    gap: 4,
    border: { color: '#ffffff', width: 1 }
  };

  public exportPNG(): void {
    this.treemap?.export('PNG', 'treemap');
  }

  public exportJPEG(): void {
    this.treemap?.export('JPEG', 'treemap');
  }

  public exportSVG(): void {
    this.treemap?.export('SVG', 'treemap');
  }

  public exportPDF(): void {
    this.treemap?.export('PDF', 'treemap', PdfPageOrientation.Portrait);
  }

  public printTreeMap(): void {
    this.treemap?.print();
  }
}
```

## Accessibility Overview

Syncfusion Angular TreeMap includes built-in accessibility support and follows common accessibility guidance.

### Accessibility Standards

TreeMap accessibility support aligns with commonly referenced standards such as:

- WCAG 2.2
- Section 508
- ADA
- WAI-ARIA patterns

## WCAG Compliance

### Semantic HTML

TreeMap renders accessibility roles and labels for its own structure.

**Built-in TreeMap accessibility patterns include:**

- `role="region"` for non-interactive TreeMap areas
- `role="button"` for interactive areas such as selection or highlight capable items
- `aria-label` for title, subtitle, data labels, legend title, and legend item labels

### Color Contrast

Color contrast depends on the fill, palette, template styling, and label colors you choose.

```typescript
public leafItemSettings = {
  labelPath: 'Product',
  fill: '#0066cc',
  labelStyle: {
    color: '#ffffff'
  }
};
```

Use high-contrast text over each fill color, especially when labels remain visible inside leaf rectangles.

## Screen Reader Support

TreeMap supports screen reader announcements for visible and named TreeMap content.

### ARIA Labels

TreeMap automatically exposes accessible labels for:

- data labels
- title
- subtitle
- legend title
- legend item labels

### Custom Accessibility Labels

Use meaningful TreeMap text such as a clear title, readable labels, descriptive tooltips, legends, and an optional `description` value.

```typescript
import { Component, signal } from '@angular/core';
import {
  TreeMapModule,
  TreeMapTooltipService,
  TreeMapLegendService
} from '@syncfusion/ej2-angular-treemap';

@Component({
  selector: 'app-treemap',
  standalone: true,
  imports: [TreeMapModule],
  providers: [TreeMapTooltipService, TreeMapLegendService],
  template: `
    <ejs-treemap
      [dataSource]="data()"
      weightValuePath="Sales"
      [description]="'Product sales distribution by category'"
      [titleSettings]="titleSettings"
      [leafItemSettings]="leafItemSettings"
      [tooltipSettings]="tooltipSettings"
      [legendSettings]="legendSettings">
    </ejs-treemap>
  `
})
export class TreeMapComponent {
  public data = signal([
    { Product: 'Laptop', Sales: 15000, Category: 'Electronics' },
    { Product: 'Chair', Sales: 8000, Category: 'Furniture' }
  ]);

  public titleSettings = {
    text: 'Product Sales by Category'
  };

  public leafItemSettings = {
    labelPath: 'Product'
  };

  public tooltipSettings = {
    visible: true,
    format: 'Product: ${Product}<br/>Sales: ${Sales}<br/>Category: ${Category}'
  };

  public legendSettings = {
    visible: true
  };
}
```

## Color Contrast Best Practices

### DO: Use High Contrast Colors

```typescript
public leafItemSettings = {
  fill: '#0066cc',
  labelStyle: {
    color: '#ffffff'
  }
};
```

Dark fill with light text is generally safer for readability.

### DON'T: Use Low Contrast Combinations

```typescript
public leafItemSettings = {
  fill: '#0066dd',
  labelStyle: {
    color: '#0055cc'
  }
};
```

Avoid similar foreground and background colors because labels become hard to read.

### Accessible Color Palette

Use clearly separated colors for categories and keep label contrast readable.

```typescript
public palette = [
  '#0066cc',
  '#006600',
  '#cc0000',
  '#ffcc00'
];
```

## Complete Accessible TreeMap

```typescript
import { Component, signal } from '@angular/core';
import {
  TreeMapModule,
  TreeMapTooltipService,
  TreeMapLegendService
} from '@syncfusion/ej2-angular-treemap';

@Component({
  selector: 'app-treemap',
  standalone: true,
  imports: [TreeMapModule],
  providers: [TreeMapTooltipService, TreeMapLegendService],
  template: `
    <ejs-treemap
      id="treemap-container"
      [dataSource]="data()"
      weightValuePath="Sales"
      [description]="'Accessible treemap showing product sales grouped by category'"
      [titleSettings]="titleSettings"
      [tabIndex]="0"
      [leafItemSettings]="leafItemSettings"
      [tooltipSettings]="tooltipSettings"
      [legendSettings]="legendSettings">
    </ejs-treemap>
  `,
  styles: [`
    #treemap-container {
      display: block;
      width: 100%;
      height: 520px;
    }
  `]
})
export class TreeMapAccessibleComponent {
  public data = signal([
    { Product: 'Laptop', Sales: 15000, Category: 'Electronics' },
    { Product: 'Chair', Sales: 8000, Category: 'Furniture' },
    { Product: 'Shirt', Sales: 5000, Category: 'Clothing' }
  ]);

  public titleSettings = {
    text: 'Product Sales by Category'
  };

  public leafItemSettings = {
    labelPath: 'Product',
    showLabels: true,
    labelFormat: '${Product}: ${Sales}',
    fill: '#0066cc',
    labelStyle: {
      color: '#ffffff'
    },
    gap: 4,
    border: { color: '#ffffff', width: 1 }
  };

  public tooltipSettings = {
    visible: true,
    format: 'Product: ${Product}<br/>Sales: ${Sales}<br/>Category: ${Category}'
  };

  public legendSettings = {
    visible: true
  };
}
```

## Accessibility Checklist

- use a meaningful TreeMap title
- provide readable data labels
- use strong text-to-fill contrast
- provide tooltip context when labels are short
- provide a legend when color carries meaning
- avoid using color as the only indicator
- set `tabIndex` if focus order matters in the page
- provide clear surrounding controls for print and export workflows
- test with real assistive technologies

## Testing for Accessibility

### Browser DevTools

Use browser accessibility inspection tools to validate:

- contrast
- focusability
- ARIA names
- semantic structure

### Screen Reader Testing

Test with common screen readers and confirm that the TreeMap title, data labels, and legend content are spoken clearly.

Recommended practical test flow:

1. verify the title is announced
2. verify visible labels are announced
3. verify legend item labels are announced
4. verify tooltip-only information is also available somewhere meaningful if it is essential

## Troubleshooting

**Issue:** Print button does nothing

**Solution:** Make sure `allowPrint` is enabled, `PrintService` is provided, and the TreeMap instance is available through `@ViewChild`.

```typescript
providers: [PrintService]
```

```typescript
[allowPrint]="true"
```

```typescript
@ViewChild('treemap')
public treemap?: SyncTreeMapComponent;
```

**Issue:** Image export is not working

**Solution:** Make sure `allowImageExport` is enabled and `ImageExportService` is provided.

```typescript
providers: [ImageExportService]
```

```typescript
[allowImageExport]="true"
```

**Issue:** PDF export is not working

**Solution:** Make sure `allowPdfExport` is enabled and `PdfExportService` is provided.

```typescript
providers: [PdfExportService]
```

```typescript
[allowPdfExport]="true"
```

**Issue:** Base64 export is undefined

**Solution:** Check that the TreeMap instance exists before calling `export(...)`, and use `allowDownload = false`.

```typescript
public async exportBase64(): Promise<void> {
  if (!this.treemap) {
    return;
  }

  const base64Data = await this.treemap.export(
    'PNG',
    'treemap',
    undefined,
    false
  );

  console.log(base64Data);
}
```

**Issue:** Screen reader output feels unclear

**Solution:** Provide meaningful title, description, labels, and legend text.

```typescript
public titleSettings = {
  text: 'Product Sales by Category'
};
```

```typescript
[description]="'Accessible treemap showing product sales grouped by category'"
```

**Issue:** Focus order is not clear in the page

**Solution:** Use `tabIndex` to place the TreeMap in the page focus flow.

```typescript
[tabIndex]="0"
```

