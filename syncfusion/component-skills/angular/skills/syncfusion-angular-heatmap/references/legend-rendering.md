# Legend Rendering

**API Reference:** [references/api-reference.md](references/api-reference.md)

## Table of Contents

- [Legend Basics](#legend-basics)
  - [Enable/Disable Legend](#enabledisable-legend)
  - [Legend Visibility](#legend-visibility)
- [Legend Positioning](#legend-positioning)
  - [Position Options](#position-options)
  - [Complete Positioning Example](#complete-positioning-example)
- [Legend Alignment](#legend-alignment)
  - [Alignment Options](#alignment-options)
- [Legend Appearance](#legend-appearance)
  - [Size and Borders](#size-and-borders)
  - [Label Styling](#label-styling)
  - [Complete Styling Example](#complete-styling-example)
- [Interactive Legend](#interactive-legend)
  - [Legend Interaction Pattern](#legend-interaction-pattern)
- [Custom Legend Formatting](#custom-legend-formatting)
  - [Format Legend Labels](#format-legend-labels)
  - [Legend with Custom Color Mapping](#legend-with-custom-color-mapping)
  - [Legend Events](#legend-events)
- [Best Practices](#best-practices)
  - [Do](#do)
  - [Don't](#dont)


## Legend Basics

The legend displays the color-to-value mapping for heatmap cells, helping users interpret the visualization.

### Enable/Disable Legend

```typescript
import { Component, ViewEncapsulation } from '@angular/core';
import { HeatMapModule, LegendService } from '@syncfusion/ej2-angular-heatmap';

@Component({
    selector: 'my-app',
    standalone: true,
    imports: [HeatMapModule],
    providers: [LegendService],
    template: `
       <ejs-heatmap id='container' style="display:block;" 
            [dataSource]='dataSource' 
            [xAxis]='xAxis'  
            [yAxis]='yAxis'
            [titleSettings]='titleSettings' 
            [paletteSettings]='paletteSettings' 
            [legendSettings]='legendSettings' 
            [cellSettings]='cellSettings'>
        </ejs-heatmap>`,
    encapsulation: ViewEncapsulation.None
})
export class AppComponent {

    // 2D Array Datasource (12 Rows x 6 Columns)
    public dataSource: number[][] = [
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
        [74, 33, 88, 23, 86, 59]
    ];

    public titleSettings: Object = {
        text: 'Sales Revenue per Employee (in 1000 US$)',
        textStyle: {
            size: '15px',
            fontWeight: '500',
            fontFamily: 'Segoe UI'
        }
    };

    public xAxis: Object = {
        labels: ['Nancy', 'Andrew', 'Janet', 'Margaret', 'Steven', 'Michael', 'Robert', 'Laura', 'Anne', 'Paul', 'Karin', 'Mario'],
        valueType: 'Category'
    };

    public yAxis: Object = {
        labels: ['Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat'],
        valueType: 'Category'
    };

    public cellSettings: Object = {
        showLabel: false,
    };

    public paletteSettings: Object = {
        palette: [
            { value: 0, color: '#C2E7EC' },
            { value: 10, color: '#AEDFE6' },
            { value: 20, color: '#9AD7E0' },
            { value: 30, color: '#72C7D4' },
            { value: 40, color: '#5EBFCE' },
            { value: 50, color: '#4AB7C8' },
            { value: 60, color: '#309DAE' },
            { value: 70, color: '#2B8C9B' },
            { value: 80, color: '#206974' },
            { value: 90, color: '#15464D' },
            { value: 100, color: '#000000' },
        ],
    };

    public legendSettings: Object = {
        visible: true,
        height: '150px',
        width: '50px'
    };
}
```

### Legend Visibility

```typescript
// Hide legend completely
legendSettings: any = {
    visible: false
};

// Show legend (default)
legendSettings: any = {
    visible: true
};
```

## Legend Positioning

Position the legend relative to the heatmap.

### Position Options

```typescript
// Right side (default)
legendSettings: any = {
    position: 'Right',
    height: '200px',
    width: '40px'
};

// Left side
legendSettings: any = {
    position: 'Left',
    height: '200px',
    width: '40px'
};

// Top
legendSettings: any = {
    position: 'Top',
    height: '40px',
    width: '100%'
};

// Bottom
legendSettings: any = {
    position: 'Bottom',
    height: '50px',
    width: '100%'
};
```

### Complete Positioning Example

```typescript
import { Component, ViewEncapsulation } from '@angular/core';
import { HeatMapModule, LegendService } from '@syncfusion/ej2-angular-heatmap';

@Component({
    selector: 'my-app',
    standalone: true,
    imports: [HeatMapModule],
    providers: [LegendService],
    template: `
        <ejs-heatmap id='container' style="display:block;" 
            [dataSource]='dataSource' 
            [xAxis]='xAxis' 
            [yAxis]='yAxis'
            [titleSettings]='titleSettings' 
            [legendSettings]='legendSettings'>
        </ejs-heatmap>`,
    encapsulation: ViewEncapsulation.None
})
export class AppComponent {
    // 2D Array Datasource
    public dataSource: number[][] = [
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
        [74, 33, 88, 23, 86, 59]
    ];

    public titleSettings: Object = {
        text: 'Sales Revenue per Employee (in 1000 US$)',
        textStyle: {
            size: '15px',
            fontWeight: '500',
            fontFamily: 'Segoe UI'
        }
    };

    public xAxis: Object = {
        labels: ['Nancy', 'Andrew', 'Janet', 'Margaret', 'Steven', 'Michael', 'Robert', 'Laura', 'Anne', 'Paul', 'Karin', 'Mario']
    };

    public yAxis: Object = {
        labels: ['Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat']
    };

    public legendSettings: Object = {
        position: 'Top',
        height: '50px',
        width: '100%'
    };
}
```

## Legend Alignment

Align legend items within the legend container.

### Alignment Options

```typescript
// Horizontal alignment
legendSettings: any = {
    position: 'Right',
    alignment: 'Center'  // or 'Near', 'Far'
};

// For vertical legend (Right/Left positions)
legendSettings: any = {
    position: 'Right',
    alignment: 'Near'   // Align to top
};

legendSettings: any = {
    position: 'Right',
    alignment: 'Far'    // Align to bottom
};

// For horizontal legend (Top/Bottom positions)
legendSettings: any = {
    position: 'Bottom',
    alignment: 'Near'   // Align to left
};

legendSettings: any = {
    position: 'Bottom',
    alignment: 'Far'    // Align to right
};
```

## Legend Appearance

Customize the visual appearance of the legend.

### Size and Borders

```typescript
legendSettings: any = {
    position: 'Right',
    height: '250px',      // Legend height
    width: '60px',        // Legend width
};
```

### Label Styling

```typescript
legendSettings: any = {
    labelDisplayType: 'Trim',    // 'Trim' or 'WrapByWord'
    labelFormat: '${value}',     // Custom label format
    textStyle: {
        size: '12px',
        color: '#000',
        fontFamily: 'Segoe UI'
    }
};
```

### Complete Styling Example

```typescript
import { Component, ViewEncapsulation } from '@angular/core';
import { HeatMapModule, LegendService } from '@syncfusion/ej2-angular-heatmap';

@Component({
    selector: 'my-app',
    standalone: true,
    imports: [HeatMapModule],
    providers: [LegendService],
    template: `
       <ejs-heatmap id='container' 
            [dataSource]='dataSource' 
            [legendSettings]='legendSettings'>
        </ejs-heatmap>`,
    encapsulation: ViewEncapsulation.None
})
export class AppComponent {
    public dataSource: number[][] = [
        [73, 39, 26, 39, 94, 0],
        [93, 58, 53, 38, 26, 68]
    ];

    // Comprehensive Legend Settings
    public legendSettings: Object = {
        // Position: 'Top', 'Bottom', 'Left', or 'Right'
        position: 'Bottom', 
        
        // Alignment: 'Near', 'Center', or 'Far'
        alignment: 'Center', 
        
        // Physical dimensions (can be pixels or percentage)
        height: '100px',
        width: '70%',
        
        // Label appearance customization
        textStyle: {
            size: '14px',
            fontWeight: '600',
            fontFamily: 'Segoe UI',
            color: '#333333',
            fontStyle: 'Italic'
        },
        
        // Optional: Title for the legend itself
        title: {
            text: 'Revenue Scale',
            textStyle: {
                size: '12px',
                fontWeight: 'Bold'
            }
        }
    };
}
```

## Interactive Legend

Enable users to interact with the legend to filter or highlight data.

### Legend Interaction Pattern

```typescript
import { Component, ViewEncapsulation } from '@angular/core';
import { 
    HeatMapModule, 
    TooltipService, 
    LegendService, 
    ILoadedEventArgs 
} from '@syncfusion/ej2-angular-heatmap';

@Component({
    selector: 'my-app',
    standalone: true,
    imports: [HeatMapModule],
    providers: [TooltipService, LegendService],
    template: `
        <div class="control-container">
            <div class="button-panel" style="margin-bottom: 20px;">
                <button (click)='toggleLegend()'>Toggle Legend</button>
                <button (click)='changeLegendPosition()'>Change Position ({{currentPosition}})</button>
            </div>
            <ejs-heatmap id='heatmap' 
                [dataSource]='dataSource'
                [xAxis]='xAxis'
                [yAxis]='yAxis'
                [legendSettings]='legendSettings'
                (load)='onLoad($event)'>
            </ejs-heatmap>
        </div>`,
    encapsulation: ViewEncapsulation.None
})
export class AppComponent {
    // Stores the instance captured from the load event
    private heatmapInstance: any;

    public dataSource: number[][] = [
        [10000, 18000], 
        [25000, 32000]
    ];

    public xAxis: Object = { valueType: 'Category', labels: ['Q1', 'Q2'] };
    public yAxis: Object = { valueType: 'Category', labels: ['Product A', 'Product B'] };

    public legendSettings: any = {
        visible: true,
        position: 'Right',
        height: '200px',
        width: '40px'
    };

    public currentPosition: string = 'Right';
    private positions: string[] = ['Right', 'Bottom', 'Left', 'Top'];
    private positionIndex: number = 0;

    // Capture the instance before the component fully renders
    public onLoad(args: ILoadedEventArgs): void {
        this.heatmapInstance = args.heatmap;
        console.log("Instance captured via load event:", this.heatmapInstance);
    }

    public toggleLegend(): void {
        this.legendSettings.visible = !this.legendSettings.visible;
        // Use the captured instance to refresh the UI
        if (this.heatmapInstance) {
            this.heatmapInstance.refresh();
        }
    }

    public changeLegendPosition(): void {
        this.positionIndex = (this.positionIndex + 1) % this.positions.length;
        this.currentPosition = this.positions[this.positionIndex];
        this.legendSettings.position = this.currentPosition;
        
        if (this.heatmapInstance) {
            this.heatmapInstance.refresh();
        }
    }
}

```

## Custom Legend Formatting

### Format Legend Labels

```typescript
legendSettings: any = {
    labelFormat: '${value}%',  // Show percentage
};

// Example: Show in thousands
labelFormat: '${value/1000}k'   // 50000 → "50k"
labelFormat: '${value.toFixed(0)}'  // Format with decimals
```

### Legend with Custom Color Mapping

```typescript
import { Component, ViewEncapsulation } from '@angular/core';
import { HeatMapModule, LegendService } from '@syncfusion/ej2-angular-heatmap';

@Component({
    selector: 'my-app',
    standalone: true,
    imports: [HeatMapModule],
    providers: [LegendService],
    template: `
       <ejs-heatmap id='container' style="display:block;" 
            [dataSource]='dataSource' 
            [xAxis]='xAxis' 
            [yAxis]='yAxis'
            [titleSettings]='titleSettings' 
            [paletteSettings]='paletteSettings' 
            [legendSettings]='legendSettings'>
        </ejs-heatmap>`,
    encapsulation: ViewEncapsulation.None
})
export class AppComponent {

    // 2D Array Datasource (12 Rows x 6 Columns)
    public dataSource: number[][] = [
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
        [74, 33, 88, 23, 86, 59]
    ];

    public titleSettings: Object = {
        text: 'Sales Revenue per Employee (in 1000 US$)',
        textStyle: {
            size: '15px',
            fontWeight: '500',
            fontFamily: 'Segoe UI'
        }
    };

    public xAxis: Object = {
        labels: ['Nancy', 'Andrew', 'Janet', 'Margaret', 'Steven', 'Michael', 'Robert', 'Laura', 'Anne', 'Paul', 'Karin', 'Mario'],
        valueType: 'Category'
    };

    public yAxis: Object = {
        labels: ['Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat'],
        valueType: 'Category'
    };

    public paletteSettings: Object = {
        palette: [
            { color: '#C06C84', label: 'Low', value: 50 },
            { color: '#6C5B7B', label: 'Moderate', value: 80 },
            { color: '#355C7D', label: 'High', value: 100 }
        ],
        type: 'Gradient'
    };

    public legendSettings: Object = {
        visible: true,
        position: 'Bottom'
    };
}
```

### Legend Events

```typescript
import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { HeatMapModule} from '@syncfusion/ej2-angular-heatmap'
import { TooltipService, LegendService} from '@syncfusion/ej2-angular-heatmap'
import { Component, ViewEncapsulation } from '@angular/core';
import { HeatMap, Tooltip, Legend, ILegendRenderEventArgs } from '@syncfusion/ej2-angular-heatmap';
HeatMap.Inject(Tooltip, Legend);

@Component({
imports: [ HeatMapModule ],
providers: [TooltipService, LegendService],
standalone: true,
    selector: 'my-app',
    template:
        `<ejs-heatmap id='container' (legendRender)=(legendRender($event)) style="display:block;" [dataSource]='dataSource' [xAxis]='xAxis' [yAxis]='yAxis'
       [titleSettings]='titleSettings'>
        </ejs-heatmap>`,
    encapsulation: ViewEncapsulation.None
})
export class AppComponent {
    public legendRender(args: ILegendRenderEventArgs): void {
        console.log("The legend render event has been triggered!!!");
    }
    public dataSource: Object[] = [
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
    public titleSettings: Object = {
        text: 'Sales Revenue per Employee (in 1000 US$)',
        textStyle: {
            size: '15px',
            fontWeight: '500',
            fontStyle: 'Normal',
            fontFamily: 'Segoe UI'
        }
    };
    public xAxis: Object = {
        labels: ['Nancy', 'Andrew', 'Janet', 'Margaret', 'Steven',
            'Michael', 'Robert', 'Laura', 'Anne', 'Paul', 'Karin', 'Mario'],
    };
    public yAxis: Object = {
        labels: ['Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat'],
    };
}
```

## Best Practices

### Do

- **Use legend for value interpretation:** Users should understand color meaning
- **Position legend strategically:** Bottom/Right for common left-to-right reading
- **Format labels clearly:** Include units (%, $, etc.)
- **Use gradient legend for continuous data:** More intuitive than fixed
- **Test legend visibility:** Especially important for color-blind users

### Don't

- **Don't hide legend entirely:** Users need value context
- **Don't use poor color contrast:** Ensure readability
- **Don't overlap legend with data:** Give it dedicated space
- **Don't use obscure label formats:** Keep it simple and clear
- **Don't ignore accessibility:** Provide alternative representations

