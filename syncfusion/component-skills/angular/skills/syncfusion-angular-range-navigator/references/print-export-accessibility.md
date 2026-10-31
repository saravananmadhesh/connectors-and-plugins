# Export, Print & Accessibility

The Range Navigator component supports exporting to various image formats (PNG, JPEG, SVG, PDF), printing functionality, and comprehensive accessibility features including WCAG 2.2 compliance, keyboard navigation, and screen reader support.

## Table of Contents

- [Accessibility](#accessibility)
  - [Accessibility Compliance](#accessibility-compliance)
  - [WAI-ARIA Attributes](#wai-aria-attributes)
  - [Screen Reader Support](#screen-reader-support)
  - [Color Contrast](#color-contrast)
  - [Accessibility Testing](#accessibility-testing)
  - [Complete Accessible Example](#complete-accessible-example)
- [Export Formats](#export-formats)
- [Basic Export](#basic-export)
  - [Export to PNG](#export-to-png)
  - [Export to JPEG](#export-to-jpeg)
  - [Export to PDF](#export-to-pdf)
- [Export with Custom Filename](#export-with-custom-filename)
- [Print Functionality](#print-functionality)
  - [Basic Print](#basic-print)
  - [Keyboard Shortcut for Print](#keyboard-shortcut-for-print)
- [Multiple Export Options](#multiple-export-options)
- [Format Comparison](#format-comparison)
- [Browser Compatibility](#browser-compatibility)
- [When to Use Each Format](#when-to-use-each-format)
  - [PNG](#png)
  - [JPEG](#jpeg)
  - [SVG](#svg)
  - [PDF](#pdf)
- [Export Method Signature](#export-method-signature)
- [Print Method Signature](#print-method-signature)
- [Best Practices](#best-practices)
- [Common Use Cases](#common-use-cases)
  - [Report Generation](#report-generation)
  - [Web Sharing](#web-sharing)
  - [High-Quality Print](#high-quality-print)
  - [Email Attachment](#email-attachment)

---

## Accessibility

The Range Navigator component follows accessibility guidelines and standards, including ADA, Section 508, and WCAG 2.2, ensuring the component is usable by people with disabilities.

### Accessibility Compliance

The Range Navigator component meets the following accessibility standards:

| Standard | Support | Description |
|----------|---------|-------------|
| **WCAG 2.2** | ✅ Yes | Web Content Accessibility Guidelines 2.2 |
| **Section 508** | ✅ Yes | U.S. federal accessibility requirements |
| **ADA** | ✅ Yes | Americans with Disabilities Act |
| **Screen Reader** | ✅ Yes | NVDA, JAWS, VoiceOver support |
| **Right-To-Left** | ✅ Yes | RTL language support |
| **Color Contrast** | ✅ Yes | WCAG AA/AAA contrast ratios |
| **Mobile Support** | ✅ Yes | Touch and gesture support |
| **Keyboard Navigation** | ✅ Yes | Full keyboard accessibility |
| **Axe-core Validation** | ✅ Yes | Automated accessibility testing |

### WAI-ARIA Attributes

The Range Navigator implements proper WAI-ARIA attributes for accessibility:

#### ARIA Roles

```typescript
@Component({
  template: `
    <ejs-rangenavigator 
      id="rangeNavigator"
      valueType="DateTime">
      <e-rangenavigator-series-collection>
        <e-rangenavigator-series 
          [dataSource]="data" 
          xName="date" 
          yName="value" 
          type="Area">
        </e-rangenavigator-series>
      </e-rangenavigator-series-collection>
    </ejs-rangenavigator>
  `
})
export class AccessibleRangeNavigatorComponent {
  data = [
    { date: new Date(2023, 0, 1), value: 100 },
    { date: new Date(2023, 1, 1), value: 110 }
  ];
}
```

**ARIA Attributes Used**:

| Attribute | Purpose | Applied To |
|-----------|---------|------------|
| `role="region"` | Identifies the Range Navigator as a landmark region | Root element |
| `aria-label` | Provides accessible name for the component | Root element |

The Range Navigator automatically includes appropriate ARIA attributes for accessibility.


### Screen Reader Support

The Range Navigator provides comprehensive screen reader support, ensuring users with visual impairments can navigate and interact with the component.

#### Screen Reader Announcements

```typescript
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 
  RangeNavigatorAllModule, // Using AllModule to resolve potential testing issues
  AreaSeriesService, 
  DateTimeService, 
  RangeTooltipService 
} from '@syncfusion/ej2-angular-charts';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RangeNavigatorAllModule],
  providers: [AreaSeriesService, DateTimeService, RangeTooltipService],
  template: `
    <div role="main" aria-label="Data Visualization">
      <h2 id="chart-title">Sales Range Navigator</h2>
      
      <p id="chart-description">
        Select a date range to filter sales data from January to April 2023.
      </p>

      <ejs-rangenavigator
        id="rangeNavigator"
        valueType="DateTime"
        labelFormat="MMM"
        [tooltip]="tooltipSettings"
        aria-labelledby="chart-title"
        aria-describedby="chart-description">
        
        <e-rangenavigator-series-collection>
          <e-rangenavigator-series
            [dataSource]="data"
            xName="date"
            yName="value"
            type="Area">
          </e-rangenavigator-series>
        </e-rangenavigator-series-collection>
        
      </ejs-rangenavigator>
    </div>
  `
})
export class AppComponent {
  public data: Object[] = [
    { date: new Date(2023, 0, 1), value: 100 },
    { date: new Date(2023, 1, 1), value: 110 },
    { date: new Date(2023, 2, 1), value: 105 },
    { date: new Date(2023, 3, 1), value: 115 }
  ];

  public tooltipSettings: Object = {
    enable: true
  };
}
```

```typescript
import { Component } from '@angular/core';
import { 
    RangeNavigatorModule, 
    AreaSeriesService, 
    DateTimeService 
} from '@syncfusion/ej2-angular-charts';

@Component({
    selector: 'app-screen-reader',
    standalone: true,
    imports: [RangeNavigatorModule],
    providers: [AreaSeriesService, DateTimeService],
    template: `
        <ejs-rangenavigator 
            id="rangeNavigator"
            valueType="DateTime"
            (changed)="announceChange($event)">
            <e-rangenavigator-series-collection>
                <e-rangenavigator-series 
                    [dataSource]="stockData" 
                    xName="date" 
                    yName="price" 
                    type="Area">
                </e-rangenavigator-series>
            </e-rangenavigator-series-collection>
        </ejs-rangenavigator>
        <div aria-live="polite" aria-atomic="true" class="sr-only">
            {{ screenReaderMessage }}
        </div>`
})
export class ScreenReaderComponent {
    public stockData = [
        { date: new Date(2023, 0, 1), price: 100 },
        { date: new Date(2023, 6, 1), price: 150 }
    ];
    public screenReaderMessage = '';
    public announceChange(args: any): void {
        const startDate = args.start.toLocaleDateString();
        const endDate = args.end.toLocaleDateString();
        this.screenReaderMessage = `Range updated: from ${startDate} to ${endDate}`;
    }
}
```

### Color Contrast

The Range Navigator maintains WCAG AA and AAA color contrast ratios:

```typescript
@Component({
  template: `
    <ejs-rangenavigator 
      [labelStyle]="accessibleLabelStyle"
      theme="HighContrast"
      [navigatorStyleSettings]="accessibleStyle">
      <!-- series -->
    </ejs-rangenavigator>
  `
})
export class HighContrastComponent {
  // WCAG AA compliant colors (4.5:1 contrast ratio)
  accessibleLabelStyle = {
    color: '#212121',        // High contrast on white background
    size: '14px',
    fontWeight: '600'
  };

  accessibleStyle = {
    selectedRegionColor: 'rgba(33, 150, 243, 0.4)',
    thumb: {
      fill: '#1976D2',       // 4.5:1 contrast ratio
      border: { 
        color: '#ffffff', 
        width: 2 
      }
    }
  };
}
```

### Accessibility Testing

The Range Navigator has been validated using:

#### Automated Testing Tools

1. **Accessibility Checker**
   - NPM package: `accessibility-checker`
   - Validates against WCAG 2.2 standards

2. **Axe-core**
   - NPM package: `axe-core`
   - Comprehensive accessibility testing

#### Using Axe-core

```bash
# Install axe-core
npm install --save-dev axe-core

# Install accessibility testing tools
npm install --save-dev @axe-core/puppeteer
```

#### Running Accessibility Tests

```bash
# Install testing tools
npm install --save-dev accessibility-checker axe-core

# Run accessibility tests
npm run accessibility-test
```

### Complete Accessible Example

```typescript
import { Component } from '@angular/core';
import {CommonModule} from '@angular/common';
import { 
    RangeNavigatorModule, 
    AreaSeriesService, 
    DateTimeService,
    RangeTooltipService 
} from '@syncfusion/ej2-angular-charts';

@Component({
    selector: 'app-accessible-range-navigator',
    standalone: true,
    imports: [RangeNavigatorModule,CommonModule],
    providers: [AreaSeriesService, DateTimeService, RangeTooltipService],
    styles: [`
        .sr-only {
            position: absolute;
            left: -10000px;
            width: 1px;
            height: 1px;
            overflow: hidden;
        }

    `],
    template: `
        <div>
            <h2 id="chart-title">Sales Data Range Selector</h2>
            <ejs-rangenavigator 
                id="rangeNavigator"
                valueType="DateTime"
                labelFormat="MMM yyyy"
                [value]="initialRange"
                [tooltip]="tooltipSettings"
                theme ="HighContrast"
                [labelStyle]="accessibleLabelStyle"
                [navigatorStyleSettings]="accessibleStyle"
                (changed)="onRangeChange($event)">
                <e-rangenavigator-series-collection>
                    <e-rangenavigator-series 
                        [dataSource]="salesData" 
                        xName="date" 
                        yName="sales" 
                        type="Area">
                    </e-rangenavigator-series>
                </e-rangenavigator-series-collection>
            </ejs-rangenavigator>
            <p id="chart-instructions" class="sr-only">
                Interactive range selector for sales data spanning January to December 2023.
            </p>
            <div aria-live="polite" aria-atomic="true" class="sr-only">
                {{ liveRegionMessage }}
            </div>
            <div aria-live="polite" style="margin-top: 20px;">
                <strong>Selected Range:</strong> 
                {{ selectedStart | date:'mediumDate' }} to {{ selectedEnd | date:'mediumDate' }}
            </div>
        </div>`
})
export class  AccessibleRangeNavigatorComponent  {
    public salesData = [
        { date: new Date(2023, 0, 1), sales: 150 },
        { date: new Date(2023, 1, 1), sales: 180 },
        { date: new Date(2023, 2, 1), sales: 160 },
        { date: new Date(2023, 3, 1), sales: 200 },
        { date: new Date(2023, 4, 1), sales: 190 },
        { date: new Date(2023, 5, 1), sales: 220 },
        { date: new Date(2023, 6, 1), sales: 210 },
        { date: new Date(2023, 7, 1), sales: 230 },
        { date: new Date(2023, 8, 1), sales: 215 },
        { date: new Date(2023, 9, 1), sales: 240 },
        { date: new Date(2023, 10, 1), sales: 235 },
        { date: new Date(2023, 11, 1), sales: 260 }
    ];

    public initialRange = [new Date(2023, 0, 1), new Date(2023, 11, 31)];
    public selectedStart = new Date(2023, 0, 1);
    public selectedEnd = new Date(2023, 11, 31);
    public liveRegionMessage = '';

    // High contrast, WCAG compliant styling
    public accessibleLabelStyle = {
        color: '#212121',
        size: '14px',
        fontWeight: '600'
    };

    public accessibleStyle = {
        selectedRegionColor: 'rgba(33, 150, 243, 0.3)',
        thumb: {
            type: 'Circle',
            width: 24,
            height: 24,
            fill: '#1976D2',
            border: { width: 3, color: '#ffffff' }
        }
    };

    public tooltipSettings = {
        enable: true,
        displayMode: 'Always'
    };

    public onRangeChange(args: any): void {
        this.selectedStart = args.start;
        this.selectedEnd = args.end;
        
        // Update live region for screen readers
        this.liveRegionMessage = `Range updated: from ${args.start.toLocaleDateString()} to ${args.end.toLocaleDateString()}`;
}
```

---

## Export Formats

The Range Navigator supports four export formats:

| Format | Extension | Use Case |
|--------|-----------|----------|
| PNG | .png | High-quality raster images with transparency support |
| JPEG | .jpeg/.jpg | Compressed raster images for smaller file sizes |
| SVG | .svg | Scalable vector graphics for infinite scaling |
| PDF | .pdf | Portable document format for printing and sharing |

## Basic Export

### Export to PNG

```typescript
import { Component, ViewChild } from '@angular/core';
import { 
    RangeNavigatorModule, 
    AreaSeriesService, 
    DateTimeService, 
    RangeNavigatorComponent 
} from '@syncfusion/ej2-angular-charts';

@Component({
    selector: 'app-container',
    standalone: true,
    imports: [RangeNavigatorModule],
    providers: [AreaSeriesService, DateTimeService],
    template: `
        <div>
            <button (click)="handleExportPNG()">Export as PNG</button>
            <ejs-rangenavigator #rangeNavigator id="rangeNavigator" 
                valueType="DateTime" labelFormat="MMM">
                <e-rangenavigator-series-collection>
                    <e-rangenavigator-series [dataSource]="data" xName="date" yName="value" type="Area">
                    </e-rangenavigator-series>
                </e-rangenavigator-series-collection>
            </ejs-rangenavigator>
        </div>`
})
export class AppComponent {
    @ViewChild('rangeNavigator') public rangeObj?: RangeNavigatorComponent;

    public data: any[] = [
        { date: new Date(2023, 0, 1), value: 100 },
        { date: new Date(2023, 1, 1), value: 110 },
        { date: new Date(2023, 5, 1), value: 125 }
    ];

    handleExportPNG() {
        this.rangeObj?.export('PNG', 'RangeNavigator');
    }
}

```

### Export to JPEG

```typescript
import { Component, ViewChild } from '@angular/core';
import { 
    RangeNavigatorModule, 
    AreaSeriesService, 
    DateTimeService,
    RangeNavigatorComponent,
    ExportType
} from '@syncfusion/ej2-angular-charts';

@Component({
    selector: 'app-container',
    standalone: true,
    imports: [RangeNavigatorModule],
    providers: [AreaSeriesService, DateTimeService],
    template: `
        <div>
            <button (click)="export('JPEG')">Export JPEG</button>
            <button (click)="export('SVG')">Export SVG</button>
            <button (click)="export('PDF')">Export PDF</button>
            
            <ejs-rangenavigator #rangeNavigator id="rangeNavigator" 
                valueType="DateTime" labelFormat="MMM">
                <e-rangenavigator-series-collection>
                    <e-rangenavigator-series [dataSource]="data" xName="date" yName="value" type="Area">
                    </e-rangenavigator-series>
                </e-rangenavigator-series-collection>
            </ejs-rangenavigator>
        </div>`
})
export class AppComponent {
    @ViewChild('rangeNavigator') public rangeObj?: RangeNavigatorComponent;

    public data: any[] = [
        { date: new Date(2023, 0, 1), value: 100 },
        { date: new Date(2023, 1, 1), value: 110 },
        { date: new Date(2023, 2, 1), value: 105 },
        { date: new Date(2023, 3, 1), value: 115 }
    ];

    public export(type: ExportType): void {
        // Arguments: format, fileName
        this.rangeObj?.export(type, 'RangeNavigator');
    }
}

```

### Export to PDF

```typescript
import { Component, ViewChild } from '@angular/core';
import { 
    RangeNavigatorModule, 
    AreaSeriesService, 
    DateTimeService,
    RangeNavigatorComponent 
} from '@syncfusion/ej2-angular-charts';

@Component({
    selector: 'app-container',
    standalone: true,
    imports: [RangeNavigatorModule],
    providers: [AreaSeriesService, DateTimeService],
    template: `
        <div>
            <button (click)="handleExportPDF()">Export as PDF</button>
            
            <ejs-rangenavigator 
                #rangeNavigator 
                id="rangeNavigator" 
                valueType="DateTime" 
                labelFormat="MMM">
                <e-rangenavigator-series-collection>
                    <e-rangenavigator-series 
                        [dataSource]="data" 
                        xName="date" 
                        yName="value" 
                        type="Area">
                    </e-rangenavigator-series>
                </e-rangenavigator-series-collection>
            </ejs-rangenavigator>
        </div>`
})
export class AppComponent {
    // Access the RangeNavigator instance (equivalent to useRef)
    @ViewChild('rangeNavigator')
    public rangeObj?: RangeNavigatorComponent;

    public data: any[] = [
        { date: new Date(2023, 0, 1), value: 100 },
        { date: new Date(2023, 1, 1), value: 110 },
        { date: new Date(2023, 2, 1), value: 105 },
        { date: new Date(2023, 3, 1), value: 115 }
    ];

    public handleExportPDF(): void {
        // Call the export method directly on the component instance
        this.rangeObj?.export('PDF', 'RangeNavigator');
    }
}

```

## Export with Custom Filename

Specify a custom filename when exporting:

```typescript
import { Component, ViewChild } from '@angular/core';
import { 
    RangeNavigatorModule, 
    AreaSeriesService, 
    DateTimeService,
    RangeNavigatorComponent,
    ExportType
} from '@syncfusion/ej2-angular-charts';

@Component({
    selector: 'app-container',
    standalone: true,
    imports: [RangeNavigatorModule],
    providers: [AreaSeriesService, DateTimeService],
    template: `
        <div>
            <button (click)="handleExport('PNG')">Export PNG</button>
            <button (click)="handleExport('JPEG')">Export JPEG</button>
            <button (click)="handleExport('SVG')">Export SVG</button>
            <button (click)="handleExport('PDF')">Export PDF</button>
            
            <ejs-rangenavigator 
                #rangeNavigator 
                id="rangeNavigator" 
                valueType="DateTime" 
                labelFormat="MMM">
                <e-rangenavigator-series-collection>
                    <e-rangenavigator-series 
                        [dataSource]="data" 
                        xName="date" 
                        yName="value" 
                        type="Area">
                    </e-rangenavigator-series>
                </e-rangenavigator-series-collection>
            </ejs-rangenavigator>
        </div>`
})
export class AppComponent {
    @ViewChild('rangeNavigator')
    public rangeObj?: RangeNavigatorComponent;

    public data: any[] = [
        { date: new Date(2023, 0, 1), value: 100 },
        { date: new Date(2023, 1, 1), value: 110 },
        { date: new Date(2023, 2, 1), value: 105 },
        { date: new Date(2023, 3, 1), value: 115 }
    ];

    public handleExport(format: ExportType): void {
        const timestamp = new Date().toISOString().split('T')[0];
        const filename = `Sales_Report_${timestamp}`;
        
        // Accessing the component instance method
        this.rangeObj?.export(format, filename);
    }
}

```

## Print Functionality

### Basic Print

```typescript
import { Component, ViewChild, HostListener } from '@angular/core';
import { 
    RangeNavigatorModule, 
    AreaSeriesService, 
    DateTimeService,
    RangeNavigatorComponent 
} from '@syncfusion/ej2-angular-charts';

@Component({
    selector: 'app-container',
    standalone: true,
    imports: [RangeNavigatorModule],
    // 2. Add PrintService to the providers array
    providers: [AreaSeriesService, DateTimeService],
    template: `
        <div>
            <button (click)="handlePrint()">Print (or press P)</button>
            <ejs-rangenavigator #rangeNavigator id="rangeNavigator" 
                valueType="DateTime" labelFormat="MMM">
                <e-rangenavigator-series-collection>
                    <e-rangenavigator-series [dataSource]="data" xName="date" yName="value" type="Area">
                    </e-rangenavigator-series>
                </e-rangenavigator-series-collection>
            </ejs-rangenavigator>
        </div>`
})
export class AppComponent {
    @ViewChild('rangeNavigator') public rangeObj?: RangeNavigatorComponent;

    public data: any[] = [
        { date: new Date(2023, 0, 1), value: 100 },
        { date: new Date(2023, 1, 1), value: 110 },
        { date: new Date(2023, 2, 1), value: 105 },
        { date: new Date(2023, 3, 1), value: 115 }
    ];

    @HostListener('window:keydown', ['$event'])
    handleKeyboardEvent(event: KeyboardEvent) {
        if ( event.key === 'p'|| event.key === 'P') {
            event.preventDefault();
            this.handlePrint();
        }
    }

    public handlePrint(): void {
        // 3. The print method now executes via the injected service
        this.rangeObj?.print();
    }
}


```

### Keyboard Shortcut for Print

Print using keyboard shortcut (Ctrl+P):

```typescript
import { Component, ViewChild, HostListener } from '@angular/core';
import { 
    RangeNavigatorModule, 
    AreaSeriesService, 
    DateTimeService, 
    RangeNavigatorComponent 
} from '@syncfusion/ej2-angular-charts';

@Component({
    selector: 'app-container',
    standalone: true,
    imports: [RangeNavigatorModule],
    // 2. Provide the necessary services
    providers: [AreaSeriesService, DateTimeService],
    template: `
        <div>
            <button (click)="handlePrint()">Print (or press Ctrl+P)</button>
            
            <ejs-rangenavigator 
                #rangeNavigator 
                id="rangeNavigator" 
                valueType="DateTime" 
                labelFormat="MMM">
                <e-rangenavigator-series-collection>
                    <e-rangenavigator-series 
                        [dataSource]="data" 
                        xName="date" 
                        yName="value" 
                        type="Area">
                    </e-rangenavigator-series>
                </e-rangenavigator-series-collection>
            </ejs-rangenavigator>
        </div>`
})
export class AppComponent {
    // 3. Create a reference to the component
    @ViewChild('rangeNavigator') public rangeObj?: RangeNavigatorComponent;

    public data: any[] = [
        { date: new Date(2023, 0, 1), value: 100 },
        { date: new Date(2023, 1, 1), value: 110 },
        { date: new Date(2023, 2, 1), value: 105 },
        { date: new Date(2023, 3, 1), value: 115 }
    ];

    // 4. Handle the keyboard shortcut globally
    @HostListener('window:keydown', ['$event'])
    handleKeyboardEvent(event: KeyboardEvent) {
        if (event.ctrlKey && (event.key === 'p' || event.key === 'P')) {
            event.preventDefault();
            this.handlePrint();
        }
    }

    public handlePrint(): void {
        // 5. Trigger the print method
        if (this.rangeObj) {
            this.rangeObj.print();
        }
    }
}

```

## Multiple Export Options

Provide multiple export formats:

```typescript
import { Component, ViewChild } from '@angular/core';
import { 
    RangeNavigatorModule, 
    AreaSeriesService, 
    DateTimeService, 
    RangeTooltipService,
    ExportType,        
    RangeNavigatorComponent 
} from '@syncfusion/ej2-angular-charts';

@Component({
    selector: 'app-container',
    standalone: true,
    imports: [RangeNavigatorModule],
    providers: [
        AreaSeriesService, 
        DateTimeService, 
        RangeTooltipService
    ],
    template: `
        <div>
            <div style="margin-bottom: 10px;">
                <button (click)="handleExport('PNG')">📷 PNG</button>
                <button (click)="handleExport('JPEG')">🖼️ JPEG</button>
                <button (click)="handleExport('SVG')">📐 SVG</button>
                <button (click)="handleExport('PDF')">📄 PDF</button>
                <button (click)="handlePrint()">🖨️ Print</button>
            </div>
            
            <ejs-rangenavigator 
                #rangeNavigator 
                id="rangeNavigator" 
                valueType="DateTime" 
                labelFormat="MMM yyyy"
                [tooltip]="{ enable: true }">
                <e-rangenavigator-series-collection>
                    <e-rangenavigator-series 
                        [dataSource]="data" 
                        xName="date" 
                        yName="value" 
                        type="Area">
                    </e-rangenavigator-series>
                </e-rangenavigator-series-collection>
            </ejs-rangenavigator>
        </div>`
})
export class AppComponent {
    @ViewChild('rangeNavigator') public rangeObj?: RangeNavigatorComponent;

    public data: any[] = [
        { date: new Date(2023, 0, 1), value: 100 },
        { date: new Date(2023, 1, 1), value: 110 },
        { date: new Date(2023, 2, 1), value: 105 },
        { date: new Date(2023, 3, 1), value: 115 },
        { date: new Date(2023, 4, 1), value: 120 },
        { date: new Date(2023, 5, 1), value: 125 }
    ];

    public handleExport(format: string): void {
        // format needs to be cast to ExportType (PNG, JPEG, SVG, or PDF)
        this.rangeObj?.export(format as ExportType, 'RangeNavigator');
    }

    public handlePrint(): void {
        this.rangeObj?.print();
    }
}

```


## Format Comparison

| Format | Best For | File Size | Quality | Scalability |
|--------|----------|-----------|---------|-------------|
| **PNG** | Web, presentations, transparency | Medium | High | Fixed resolution |
| **JPEG** | Photos, compressed images | Small | Good | Fixed resolution |
| **SVG** | Print, infinite scaling | Small | Perfect | Infinite |
| **PDF** | Reports, documents, printing | Medium | High | High |

## Browser Compatibility

Export and print features are supported in:
- Chrome
- Firefox
- Safari
- Edge
- Opera

## When to Use Each Format

### PNG
- Web applications
- Presentations
- Need transparency support
- High-quality raster images

### JPEG
- Email attachments (smaller file size)
- Compressed storage
- No transparency needed

### SVG
- Print materials
- Responsive web design
- Infinite scaling needed
- Smallest file size for vector graphics

### PDF
- Reports and documentation
- Professional printing
- Multi-page documents
- Archival purposes

## Export Method Signature

```typescript
export(
  type: 'PNG' | 'JPEG' | 'SVG' | 'PDF',
  fileName: string,
  orientation?: 'Portrait' | 'Landscape',
  controls?: RangeNavigatorComponent[],
  width?: number,
  height?: number,
  isVertical?: boolean
): void
```

## Print Method Signature

```typescript
print(id?: string | string[]): void
```

## Best Practices

1. **Filename Convention**: Use descriptive names with timestamps
2. **Format Selection**: Choose based on use case (see comparison table)
3. **Quality**: PNG/PDF for high quality, JPEG for smaller size
4. **User Choice**: Provide multiple export options
5. **Feedback**: Show success/error messages after export
6. **Accessibility**: Include keyboard shortcuts (Ctrl+P)
7. **Ref Management**: Always use refs to access export methods

## Common Use Cases

### Report Generation
```typescript
// Export as PDF for reports
this.RangeObj?.export('PDF', 'Monthly_Sales_Report');
```

### Web Sharing
```typescript
// Export as PNG for web sharing
this.RangeObj?.export('PNG', 'Range_Chart');
```

### High-Quality Print
```typescript
// Export as SVG for print
this.RangeObj?.export('SVG', 'Print_Ready_Chart');
```

### Email Attachment
```typescript
// Export as JPEG for smaller size
this.RangeObj?.export('JPEG', 'Chart_Summary');
```
