# Visual Customization & Rendering

**API Reference:** [references/api-reference.md](references/api-reference.md)

## Table of Contents

- [Color Palettes](#color-palettes)
  - [Custom Color Array](#custom-color-array)
- [Value-Based Color Mapping](#value-based-color-mapping)
  - [Gradient Palette (Continuous)](#gradient-palette-continuous)
  - [Fixed Palette (Discrete)](#fixed-palette-discrete)
  - [Example: Performance Heatmap](#example-performance-heatmap)
- [Rendering Modes](#rendering-modes)
  - [Auto Mode (Default)](#auto-mode-default)
  - [SVG Rendering](#svg-rendering)
  - [Canvas Rendering](#canvas-rendering)
  - [Complete Rendering Example](#complete-rendering-example)
- [Cell Styling](#cell-styling)
  - [Cell Border and Background](#cell-border-and-background)
- [Bubble Heatmap Variation](#bubble-heatmap-variation)
  - [Bubble Heatmap Setup](#bubble-heatmap-setup)
  - [Bubble Type Options](#bubble-type-options)
- [Responsive Design](#responsive-design)
  - [Responsive Container](#responsive-container)
  - [Adaptive Font Sizing](#adaptive-font-sizing)
- [Best Practices](#best-practices)
  - [Do](#do)
  - [Don't](#dont)


## Color Palettes

HeatMap provides predefined palettes and custom color mapping options.

### Custom Color Array

```typescript
paletteSettings: any = {
    type: 'Gradient',
    palette: ['#FFFFFF', '#E3165B']  // White to deep pink
};

// Multi-color gradient
paletteSettings: any = {
    type: 'Gradient',
    palette: [
        '#00008B',  // Dark blue (low values)
        '#0000CD',  // Medium blue
        '#1E90FF',  // Dodger blue
        '#87CEEB',  // Sky blue
        '#FFFFFF',  // White (middle)
        '#FFD700',  // Gold
        '#FFA500',  // Orange
        '#FF4500',  // Orange-red
        '#FF0000'   // Red (high values)
    ]
};
```

## Value-Based Color Mapping

Map specific value ranges to specific colors.

### Gradient Palette (Continuous)

```typescript
import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { HeatMapModule} from '@syncfusion/ej2-angular-heatmap'
import { LegendService} from '@syncfusion/ej2-angular-heatmap'
import { Component, ViewEncapsulation } from '@angular/core';

@Component({
imports: [ HeatMapModule ],
providers: [ LegendService],
standalone: true,
    selector: 'my-app',
    template:
       `<ejs-heatmap id='container' style="display:block;" [dataSource]='dataSource' [xAxis]='xAxis' [yAxis]='yAxis'
       [titleSettings]='titleSettings' [paletteSettings]='paletteSettings' [legendSettings]='legendSettings'>
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
    public paletteSettings: Object = {
        palette: [
            { color: '#C06C84', label:'Low', value:50 },
            { color: '#6C5B7B', label:'Moderate', value:80 },
            { color: '#355C7D', label:'High', value: 100 }
        ],
        type: "Gradient"
    };
    public legendSettings: Object = {
        visible: true,
    };
 }
```

### Fixed Palette (Discrete)

```typescript
paletteSettings: any = {
    type: 'Fixed',
    palette: [
        { value: 10, color: '#FF0000' },     // 0-10: Red (low)
        { value: 20, color: '#FFA500' },     // 10-20: Orange
        { value: 30, color: '#FFFF00' },     // 20-30: Yellow
        { value: 40, color: '#00FF00' },     // 30-40: Green
        { value: 50, color: '#00FF00' }      // 40+: Dark Green (high)
    ]
};
```

### Example: Performance Heatmap

```typescript
// Excellent: Green, Good: Light Green, Average: Yellow, Poor: Orange, Bad: Red
paletteSettings: any = {
    type: 'Fixed',
    palette: [
        { value: 60, color: '#FF0000' },      // <60: Red (Bad)
        { value: 70, color: '#FFA500' },      // 60-70: Orange (Poor)
        { value: 80, color: '#FFFF00' },      // 70-80: Yellow (Average)
        { value: 90, color: '#90EE90' },      // 80-90: Light Green (Good)
        { value: 100, color: '#00AA00' }      // 90-100: Green (Excellent)
    ]
};
```

## Rendering Modes

Choose between SVG (scalable) and Canvas (performance) rendering.

### Auto Mode (Default)

```typescript
// Automatically switches based on data size
    renderingMode: 'Auto'  // SVG for small, Canvas for large
```

### SVG Rendering

```typescript
    renderingMode: 'SVG'  // Vector rendering, better for small datasets
```

**Advantages:**
- Crisp, scalable output
- Better for printing
- Interactive features fully supported
- Smaller datasets (< 10k cells)

**Disadvantages:**
- Slower with large datasets
- DOM overhead

### Canvas Rendering

```typescript
    renderingMode: 'Canvas'  // Raster rendering, better for large datasets
```

**Advantages:**
- High performance with large datasets
- Handles 100k+ cells efficiently
- Lower memory usage
- Faster rendering

**Disadvantages:**
- No built-in interactivity
- Lower visual quality when zoomed

### Complete Rendering Example

```typescript
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { HeatMapModule, TooltipService, LegendService } from '@syncfusion/ej2-angular-heatmap';

@Component({
    selector: 'my-app',
    standalone: true,
    imports: [HeatMapModule],
    providers: [TooltipService, LegendService],
    template: `
        <div class="control-section">
            <div style="margin-bottom: 20px;">
                <label style="font-weight: 600; margin-right: 10px;">Rendering Mode:</label>
                <select (change)='changeRenderingMode($event)' style="padding: 5px; border-radius: 4px;">
                    <option value="Auto">Auto</option>
                    <option value="SVG">SVG</option>
                    <option value="Canvas">Canvas</option>
                </select>
            </div>
            
            <ejs-heatmap id='heatmap' 
                [dataSource]='dataSource'
                [xAxis]='xAxis'
                [yAxis]='yAxis'
                [renderingMode]='renderingMode'
                [titleSettings]='titleSettings'>
            </ejs-heatmap>
        </div>
    `,
    encapsulation: ViewEncapsulation.None
})
export class AppComponent implements OnInit {
    // 100x100 2D Array (10,000 cells)
    public dataSource: number[][] = [];
    public renderingMode: string = 'Auto';

    public xAxis: Object = {
        title: { text: 'X-Axis Range' },
        minimum: 0,
        maximum: 99,
        valueType: 'Numeric'
    };

    public yAxis: Object = {
        title: { text: 'Y-Axis Range' },
        minimum: 0,
        maximum: 99,
        valueType: 'Numeric'
    };

    public titleSettings: Object = {
        text: 'Performance Test: 10,000 Cells',
        textStyle: { size: '15px', fontWeight: '500' }
    };

    ngOnInit(): void {
        // Initialize 100x100 2D array
        const data: number[][] = [];
        for (let i = 0; i < 100; i++) {
            data[i] = [];
            for (let j = 0; j < 100; j++) {
                data[i][j] = Math.floor(Math.random() * 100);
            }
        }
        this.dataSource = data;
    }

    // Updates the rendering engine dynamically
    public changeRenderingMode(event: any): void {
        this.renderingMode = event.target.value;
    }
}
```

## Cell Styling

Customize individual cell appearance.

### Cell Border and Background

```typescript
import { Component, ViewEncapsulation } from '@angular/core';
import { HeatMapModule, TooltipService, LegendService } from '@syncfusion/ej2-angular-heatmap';

@Component({
    selector: 'my-app',
    standalone: true,
    imports: [HeatMapModule],
    providers: [TooltipService, LegendService],
    template: `
        <ejs-heatmap id='heatmap' 
            [dataSource]='dataSource'
            [xAxis]='xAxis'
            [yAxis]='yAxis'
            [cellSettings]='cellSettings'
            [titleSettings]='titleSettings'>
        </ejs-heatmap>
    `,
    encapsulation: ViewEncapsulation.None
})
export class AppComponent {
    // 2D Datasource: Rows are Products, Columns are Quarters
    public dataSource: number[][] = [
        [10, 15], // Product A: Q1, Q2
        [20, 25]  // Product B: Q1, Q2
    ];

    public xAxis: Object = { 
        valueType: 'Category', 
        labels: ['Q1', 'Q2'] 
    };

    public yAxis: Object = { 
        valueType: 'Category', 
        labels: ['Product A', 'Product B'] 
    };

    public titleSettings: Object = {
        text: 'Styled Revenue HeatMap',
        textStyle: { size: '15px', fontWeight: '500', fontFamily: 'Segoe UI' }
    };

    public cellSettings: Object = {
        showLabel: true,
        // Correction: property is 'format', not 'labelFormat'
        format: '${value}K',
        border: {
            color: '#333333',
            width: 2
        },
        textStyle: {
            color: '#000000',
            size: '14px',
            fontFamily: 'Segoe UI'
        }
    };
}
```

## Bubble Heatmap Variation

Use bubbles instead of rectangular cells for alternative visualization.

### Bubble Heatmap Setup

```typescript
import { Component, ViewEncapsulation } from '@angular/core';
import { 
    HeatMapModule, 
    LegendService, 
    TooltipService 
} from '@syncfusion/ej2-angular-heatmap';

@Component({
    selector: 'my-app',
    standalone: true,
    imports: [HeatMapModule],
    providers: [LegendService, TooltipService],
    template: `
       <ejs-heatmap id='container' style="display:block;" 
            [dataSource]='dataSource' 
            [xAxis]='xAxis' 
            [yAxis]='yAxis'
            [titleSettings]='titleSettings' 
            [paletteSettings]='paletteSettings' 
            [cellSettings]='cellSettings' 
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
            { color: '#C06C84' },
            { color: '#6C5B7B' },
            { color: '#355C7D' }
        ],
        type: 'Gradient'
    };

    public cellSettings: Object = {
        border: { width: 1 },
        showLabel: false,
        // Configures the heatmap to render bubbles instead of rectangles
        tileType: 'Bubble',
        bubbleType: 'Size'
    };

    public legendSettings: Object = {
        visible: true,
        position: 'Bottom'
    };
}
```

### Bubble Type Options

```typescript
// Size-based bubbles
cellSettings: any = {
    bubbleType: 'Size'  // Larger bubbles = higher values
};

// Color and size both encode values
cellSettings: any = {
    bubbleType: 'SizeAndColor'  // Use both dimensions
};

// Multiple bubble representations
cellSettings: any = {
    bubbleType: 'Sector'  // Pie slice representation
};
```

## Responsive Design

Make heatmaps responsive to different screen sizes.

### Responsive Container

```typescript
import { Component, ViewEncapsulation } from '@angular/core';
import { HeatMapModule, TooltipService, LegendService } from '@syncfusion/ej2-angular-heatmap';

@Component({
    selector: 'my-app',
    standalone: true,
    imports: [HeatMapModule],
    providers: [TooltipService, LegendService],
    template: `
        <div class='heatmap-container'>
            <ejs-heatmap id='heatmap' 
                [dataSource]='dataSource'
                [xAxis]='xAxis'
                [yAxis]='yAxis'
                [titleSettings]='titleSettings'
                width='100%'
                height='100%'>
            </ejs-heatmap>
        </div>
    `,
    styles: [`
        /* Container defines the responsive boundaries */
        .heatmap-container {
            width: 100%;
            height: 500px;
            margin: 20px 0;
            border: 1px solid #eee;
        }
        
        /* Tablets */
        @media (max-width: 768px) {
            .heatmap-container {
                height: 350px;
            }
        }
        
        /* Mobile Devices */
        @media (max-width: 480px) {
            .heatmap-container {
                height: 250px;
            }
        }
    `],
    encapsulation: ViewEncapsulation.None
})
export class AppComponent {
    // 2D Datasource for reliable mapping
    public dataSource: number[][] = [
        [10, 15], // Product A: Q1, Q2
        [20, 25]  // Product B: Q1, Q2
    ];

    public xAxis: Object = { 
        valueType: 'Category', 
        labels: ['Q1', 'Q2'] 
    };

    public yAxis: Object = { 
        valueType: 'Category', 
        labels: ['Product A', 'Product B'] 
    };

    public titleSettings: Object = {
        text: 'Responsive Sales Performance',
        textStyle: { size: '15px', fontWeight: '500' }
    };
}
```

### Adaptive Font Sizing

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
        <div id='heatmap-container' style="width: 100%; height: 400px;">
            <ejs-heatmap id='heatmap' 
                [dataSource]='dataSource'
                [xAxis]='xAxis'
                [yAxis]='yAxis'
                [cellSettings]='cellSettings'
                (load)='onHeatMapLoad($event)'>
            </ejs-heatmap>
        </div>
    `,
    encapsulation: ViewEncapsulation.None
})
export class AppComponent {
    private heatmapInstance: any;

    // 2D Datasource: [Product A: Q1, Q2], [Product B: Q1, Q2]
    public dataSource: number[][] = [
        [45, 52], 
        [38, 41]
    ];

    public xAxis: Object = { valueType: 'Category', labels: ['Q1', 'Q2'] };
    public yAxis: Object = { valueType: 'Category', labels: ['Product A', 'Product B'] };

    public cellSettings: any = {
        showLabel: true,
        textStyle: {
            size: '14px',
            fontFamily: 'Segoe UI'
        }
    };

    /**
     * Triggered before the heatmap is rendered.
     * We capture the instance and adjust settings based on the container width.
     */
    public onHeatMapLoad(args: ILoadedEventArgs): void {
        this.heatmapInstance = args.heatmap;
        const container = document.getElementById('heatmap-container');
        
        if (container && this.heatmapInstance) {
            const width = container.clientWidth;    
            // Logic to adjust font size dynamically based on pixel width
            if (width < 500) {
                this.cellSettings.textStyle.size = '10px';
            } else if (width < 800) {
                this.cellSettings.textStyle.size = '12px';
            } else {
                this.cellSettings.textStyle.size = '14px';
            }
        }
    }
}
```

## Best Practices

### Do

- **Use appropriate color palettes:** Red-yellow-green for performance, viridis for general data
- **Test rendering mode:** Use Auto or Canvas for large datasets
- **Ensure color contrast:** Especially for accessibility
- **Label cells clearly:** Show values inside or via tooltips
- **Make responsive:** Works on mobile and desktop

### Don't

- **Don't use rainbow palette indiscriminately:** Can be hard to interpret
- **Don't force SVG mode on large datasets:** Causes performance issues
- **Don't use low contrast colors:** Accessibility issues
- **Don't add too many visual effects:** Can distract from data
- **Don't ignore color blindness:** Test with accessibility tools

