# Interactivity, Events & Accessibility

**API Reference:** [references/api-reference.md](references/api-reference.md)

## Table of Contents

- [Cell Selection](#cell-selection)
  - [Enable Selection](#enable-selection)
  - [Selection Types](#selection-types)
- [Tooltips and Data Labels](#tooltips-and-data-labels)
  - [Enable Tooltips](#enable-tooltips)
  - [Custom Tooltip Template](#custom-tooltip-template)
  - [Tooltip Appearance](#tooltip-appearance)
- [Cell Events](#cell-events)
  - [Cell Click Event](#cell-click-event)
  - [Multiple Event Handling](#multiple-event-handling)
- [Data Label Formatting](#data-label-formatting)
  - [Basic Data Labels](#basic-data-labels)
  - [Custom Label Formatting](#custom-label-formatting)
  - [Label Styling](#label-styling)
- [WCAG Accessibility](#wcag-accessibility)
  - [Basic Accessibility Setup](#basic-accessibility-setup)
  - [WCAG Level AA Checklist](#wcag-level-aa-checklist)
- [Screen Reader Support](#screen-reader-support)
  - [ARIA Attributes](#aria-attributes)
  - [Accessible Data Table Alternative](#accessible-data-table-alternative)
- [Best Practices](#best-practices)
  - [Do](#do)
  - [Dont](#dont)

## Cell Selection

Enable users to select and interact with heatmap cells.

### Enable Selection

```typescript
import { Component, ViewEncapsulation } from '@angular/core';
import { HeatMapModule } from '@syncfusion/ej2-angular-heatmap';
import { ISelectedEventArgs } from '@syncfusion/ej2-heatmap';

@Component({
    imports: [HeatMapModule],
    standalone: true,
    selector: 'my-app',
    template: `
        <div>
            <p>Selected Cell: {{ selectedCell }}</p>
            <ejs-heatmap #heatmap id='heatmap' 
                [dataSource]='dataSource'
                [xAxis]='xAxis'
                [yAxis]='yAxis'
                [allowSelection]='true'
                [cellSettings]='cellSettings'
                (cellSelected)='onCellSelect($event)'>
            </ejs-heatmap>
        </div>
    `,
    encapsulation: ViewEncapsulation.None
})
export class AppComponent {
    /**
     * 2D Datasource:
     * Row 1 (A): [Q1, Q2]
     * Row 2 (B): [Q1, Q2]
     */
    dataSource: number[][] = [
        [10, 15], // Product A values for Q1 and Q2
        [20, 25]  // Product B values for Q1 and Q2
    ];

    xAxis: Object = { 
        valueType: 'Category', 
        labels: ['Q1', 'Q2'] 
    };

    yAxis: Object = { 
        valueType: 'Category', 
        labels: ['A', 'B'] 
    };

    cellSettings: Object = {
        showLabel: true
    };

    selectedCell: string = 'None';

    onCellSelect(args: ISelectedEventArgs) {
        console.log(args.data[0].value);
        // When using 2D arrays, event.xValue and event.yValue return the label names
        this.selectedCell = args.data[0].value.toString();
        //console.log('Cell selected:', event);
    }
}
```

### Selection Types

```typescript
// Single cell selection
allowSelection: true  // Default

// Multiple cell selection
enableMultiSelect : true

// Range selection (not directly supported, use events for custom logic)
```

## Tooltips and Data Labels

Display detailed information on hover and within cells.

### Enable Tooltips

```typescript
import { Component, ViewEncapsulation } from '@angular/core';
import { HeatMapModule, TooltipService } from '@syncfusion/ej2-angular-heatmap';

@Component({
    selector: 'my-app',
    standalone: true,
    imports: [HeatMapModule],
    providers: [TooltipService],
    template: `
        <ejs-heatmap id='container' style="display:block;" 
            [dataSource]='dataSource' 
            [xAxis]='xAxis' 
            [yAxis]='yAxis'
            [titleSettings]='titleSettings' 
            [cellSettings]='cellSettings' 
            [showTooltip]='showTooltip'>
        </ejs-heatmap>`,
    encapsulation: ViewEncapsulation.None
})
export class AppComponent {
    // X-Axis: 8 Countries
    public xAxis: Object = {
        labels: ['Canada', 'China', 'Egypt', 'Mexico', 'Norway', 'Russia', 'UK', 'USA'],
        valueType: 'Category'
    };

    // Y-Axis: 10 Years
    public yAxis: Object = {
        labels: ['2000', '2001', '2002', '2003', '2004', '2005', '2006', '2007', '2008', '2009'],
        valueType: 'Category'
    };

    /**
     * 2D Array DataSource:
     * Each inner array represents one Year (Y-Axis)
     * Each value in that array represents a Country (X-Axis)
     */
    public dataSource: number[][] = [
        [0.72, 2.28, 2.02, 3.21, 3.22, 3.30, 5.80, 6.91], // 2000
        [0.71, 2.29, 2.17, 3.26, 3.13, 3.39, 5.74, 7.40], // 2001
        [0.71, 2.09, 2.30, 3.45, 3.04, 3.40, 5.64, 8.13], // 2002
        [0.67, 1.84, 2.39, 3.47, 2.95, 3.48, 5.44, 8.80], // 2003
        [0.72, 1.64, 2.36, 3.42, 2.69, 3.60, 5.18, 9.04], // 2004
        [0.53, 1.49, 2.52, 3.34, 2.49, 3.67, 5.08, 9.24], // 2005
        [0.53, 1.49, 2.62, 3.14, 2.27, 3.73, 5.07, 9.43], // 2006
        [0.56, 1.39, 2.57, 2.83, 2.18, 3.79, 5.00, 9.35], // 2007
        [0.58, 1.32, 2.57, 2.64, 2.06, 3.79, 5.35, 9.49], // 2008
        [0.56, 1.23, 2.74, 2.61, 1.87, 4.07, 5.47, 9.69]  // 2009
    ];

    public titleSettings: Object = {
        text: 'Crude Oil Production of Non-OPEC Countries (Million barrels per day)',
        textStyle: {
            size: '15px',
            fontWeight: '500',
            fontFamily: 'Segoe UI'
        }
    };

    public cellSettings: Object = {
        showLabel: false,
    };

    public showTooltip: boolean = true;
}
```

### Custom Tooltip Template

```typescript
tooltipSettings: Object = {
    enable: true,
    template: `
        <div>
            Tooltip Template
        </div>
    `
};
```

### Tooltip Appearance

```typescript
tooltipSettings: Object = {
    border: {
        color: '#333',
        width: 1
    },
    fill: '#FFF',
    textStyle: {
        color: '#000',
        size: '12px'
    },
};
```

## Cell Events

Handle various cell interaction events.

### Cell Click Event

```typescript
import { Component, ViewEncapsulation } from '@angular/core';
import { HeatMapModule, TooltipService } from '@syncfusion/ej2-angular-heatmap';
import { ICellClickEventArgs } from '@syncfusion/ej2-heatmap';

@Component({
    selector: 'my-app',
    standalone: true,
    imports: [HeatMapModule],
    providers: [TooltipService], // SelectionService removed
    template: `
        <ejs-heatmap id='heatmap' 
            [dataSource]='dataSource'
            (cellClick)='onCellClick($event)'>
        </ejs-heatmap>
        <p>Status: {{ status }}</p>
    `,
})
export class AppComponent {
    public dataSource: number[][] = [[10, 15], [18, 20]];
    public status: string = 'Ready';

    // Triggered immediately when a cell is clicked
    public onCellClick(args: ICellClickEventArgs): void {
        // ICellClickEventArgs provides the value, xLabel, and yLabel directly
        this.status = `Clicked Value: ${args.value} (Cell: ${args.xLabel}, ${args.yLabel})`;
    }
}
```

### Multiple Event Handling

```typescript
import { Component, ViewEncapsulation } from '@angular/core';
import { 
    HeatMapModule, 
    TooltipService
} from '@syncfusion/ej2-angular-heatmap';
import { 
    ISelectedEventArgs, 
    ITooltipEventArgs,
} from '@syncfusion/ej2-heatmap';

@Component({
    selector: 'my-app',
    standalone: true,
    imports: [HeatMapModule],
    providers: [TooltipService],
    template: `
        <div>
            <p style="font-family: 'Segoe UI'; font-weight: 500;">Status: {{ status }}</p>
            <ejs-heatmap id='heatmap' 
                [dataSource]='dataSource'
                [xAxis]='xAxis'
                [yAxis]='yAxis'
                [allowSelection]='true'
                [showTooltip]='true'
                (cellSelected)='onCellSelect($event)'
                (cellRender)='onCellRender($event)'>
            </ejs-heatmap>
        </div>
    `,
    encapsulation: ViewEncapsulation.None
})
export class AppComponent {
    // 2D Datasource for Product A and B across Q1 and Q2
    public dataSource: number[][] = [
        [10, 15], // Product A
        [18, 20]  // Product B
    ];

    public xAxis: Object = {
        labels: ['Q1', 'Q2'],
        valueType: 'Category'
    };

    public yAxis: Object = {
        labels: ['A', 'B'],
        valueType: 'Category'
    };

    public status: string = 'Ready';

    // Updates the status string when a cell is clicked
    public onCellSelect(args: ISelectedEventArgs): void {
        if (args.data && args.data.length > 0) {
            this.status = `Selected Value: ${args.data[0].value}`;
        }
    }

    // Formats the display text (e.g., dividing value by 2 and adding currency)
    public onCellRender(args: any): void {
        if (args.value !== null) {
            args.displayText = '$ ' + (args.value / 2) + 'K';
        }
    }
}
```

## Data Label Formatting

Display and format values within heatmap cells.

### Basic Data Labels

```typescript
import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { HeatMapModule} from '@syncfusion/ej2-angular-heatmap'
import { TooltipService} from '@syncfusion/ej2-angular-heatmap'
import { Component, ViewEncapsulation } from '@angular/core';

@Component({
imports: [ HeatMapModule ],
providers: [TooltipService],
standalone: true,
    selector: 'my-app',
    template:
       `<ejs-heatmap id='container' style="display:block;" [dataSource]='dataSource' [xAxis]='xAxis' [yAxis]='yAxis'
       [titleSettings]='titleSettings' [cellSettings]='cellSettings'>
        </ejs-heatmap>`,
    encapsulation: ViewEncapsulation.None
})
export class AppComponent{

    dataSource: Object[] = [
        [73, 39, 26, 39, 94, 0],
        [93, 58, 53, 38, 26, 68],
        [99, 28, 22, 4, 66, 90],
        [14, 26, 97, 69, 69, 3],
        [7, 46, 47, 47, 88, 6],
        [41, 55, 73, 23, 3, 79],
        [56, 69, 21, 86, 3, 33],
        [45, 7, 53, 81, 95, 79],
        [60, 77, 74, 68, 88, 51],
        [25, 25, 10, 12, 78, 14],
        [25, 56, 55, 58, 12, 82],
        [74, 33, 88, 23, 86, 59]];

    titleSettings: Object = {
        text: 'Sales Revenue per Employee (in 1000 US$)',
        textStyle: {
            size: '15px',
            fontWeight: '500',
            fontStyle: 'Normal',
            fontFamily: 'Segoe UI'
        }
    };
    xAxis: Object = {
        labels: ['Nancy', 'Andrew', 'Janet', 'Margaret', 'Steven',
        'Michael', 'Robert', 'Laura', 'Anne', 'Paul', 'Karin',   'Mario'],
    };
    yAxis: Object = {
        labels: ['Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat'],
    };
    cellSettings: Object = {
        format: '{value} K'
    };
}
```

### Custom Label Formatting

```typescript
// Show as thousands
cellSettings: Object = {
    showLabel: true,
    format: '${value/1000}k'
};

// Show as percentage
cellSettings: Object = {
    showLabel: true,
    format: '${(value/100).toFixed(1)}%'
};

// Custom calculation
cellSettings: Object = {
    showLabel: true,
    format: '${value > 20000 ? "High" : "Low"}'
};
```

### Label Styling

```typescript
cellSettings: Object = {
    showLabel: true,
    format: '${value}',
    textStyle: {
        color: '#FFFFFF',
        size: '14px',
        fontFamily: 'Segoe UI',
        bold: true
    },
    border: {
        color: '#333',
        width: 1
    }
};
```

## WCAG Accessibility

Ensure heatmaps meet accessibility standards for all users.

### Basic Accessibility Setup

```typescript
import { Component, ViewEncapsulation } from '@angular/core';
import { HeatMapModule, TooltipService, LegendService } from '@syncfusion/ej2-angular-heatmap';

@Component({
    selector: 'my-app',
    standalone: true,
    imports: [HeatMapModule],
    providers: [TooltipService, LegendService],
    template: `
        <div role='figure' [attr.aria-label]='accessibilityLabel'>
            <h2>Sales Performance Heatmap</h2>
            <ejs-heatmap id='heatmap' 
                [dataSource]='dataSource'
                [xAxis]='xAxis'
                [yAxis]='yAxis'
                [cellSettings]='cellSettings'
                [legendSettings]='legendSettings'>
            </ejs-heatmap>
            <p id='heatmap-description' class='sr-only' style="display:none;">
                This heatmap displays sales revenue by product and quarter.
                Lighter colors = lower revenue, darker colors = higher revenue.
            </p>
        </div>
    `,
    encapsulation: ViewEncapsulation.None
})
export class AppComponent {
    /**
     * 2D Datasource:
     * Rows represent Product A and Product B
     * Columns represent Q1 and Q2
     */
    public dataSource: number[][] = [
        [45000, 52000], // Product A: Q1, Q2
        [38000, 41000]  // Product B: Q1, Q2
    ];

    public xAxis: Object = { 
        labels: ['Q1', 'Q2'], 
        valueType: 'Category' 
    };

    public yAxis: Object = { 
        labels: ['Product A', 'Product B'], 
        valueType: 'Category' 
    };

    public accessibilityLabel = 'Heatmap showing sales revenue by product and quarter. Values range from $38,000 to $52,000.';

    public cellSettings: Object = {
        showLabel: true,
        format: '${value}'
    };

    public legendSettings: Object = {
        visible: true,
        position: 'Bottom'
    };
}
```

### WCAG Level AA Checklist

- ✅ **Color Contrast:** Ensure text on cell background meets 4.5:1 ratio
- ✅ **ARIA Labels:** Proper aria-labels and roles

## Screen Reader Support

Make heatmaps usable with screen readers.

### ARIA Attributes

```typescript
@Component({
    template: `
        <div role='figure' 
            [attr.aria-label]=''Sales Heatmap by Product and Quarter''
            [attr.aria-describedby]=''heatmap-description''>
            <ejs-heatmap id='heatmap' 
                [dataSource]='dataSource'
                [cellSettings]='cellSettings'
                [tooltip]='tooltipSettings'>
            </ejs-heatmap>
            <div id='heatmap-description' class='sr-only'>
                Heatmap showing sales revenue. Rows represent products A, B, C.
                Columns represent quarters Q1-Q4. Values range from $10k to $50k.
            </div>
        </div>
    `,
    styles: [`
        .sr-only {
            position: absolute;
            width: 1px;
            height: 1px;
            padding: 0;
            margin: -1px;
            overflow: hidden;
            clip: rect(0,0,0,0);
            border: 0;
        }
    `]
})
export class ScreenReaderComponent {
    // ...
}
```

### Accessible Data Table Alternative

```typescript
@Component({
    template: `
        <div>
            <!-- Heatmap for visual users -->
            <div [attr.aria-hidden]='true'>
                <ejs-heatmap id='heatmap' [dataSource]='dataSource'>
                </ejs-heatmap>
            </div>

            <!-- Data table for screen readers -->
            <table class='sr-only' role='region' 
                [attr.aria-label]=''Sales Data Table''>
                <caption>Sales data by product and quarter</caption>
                <thead>
                    <tr>
                        <th>Product</th>
                        <th>Q1</th>
                        <th>Q2</th>
                        <th>Q3</th>
                        <th>Q4</th>
                    </tr>
                </thead>
                <tbody>
                    <tr *ngFor='let row of tableData'>
                        <td>{{ row.product }}</td>
                        <td *ngFor='let value of row.values'>{{ value }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    `
})
export class AccessibleAlternativeComponent {
    tableData: Object[] = [];
}
```

## Best Practices

### Do

- **Provide tooltips:** Essential for detailed value inspection
- **Use keyboard navigation:** Full tab and arrow key support
- **Include ARIA labels:** Screen reader users need context
- **Ensure color contrast:** Text readable on all backgrounds
- **Offer alternative:** Provide data table for screen readers
- **Test with tools:** Use aXe, WAVE, NVDA, JAWS

### Don't

- **Don't rely on hover alone:** Keyboard users can't hover
- **Don't use poor color contrast:** Fails WCAG AA/AAA
- **Don't hide important info in tooltips:** Make it accessible
- **Don't forget focus indicators:** Users need to see focused cells
- **Don't skip ARIA attributes:** Context needed for assistive tech
- **Don't use image-only heatmaps:** No alternative for screen readers

