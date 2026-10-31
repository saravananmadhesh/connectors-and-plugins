# Visual Elements and Data Display in Syncfusion Angular Bullet Chart

## Table of Contents

- [Value Bar Configuration](#value-bar-configuration)
  - [Basic Value Bar](#basic-value-bar)
  - [Value Bar Types](#value-bar-types)
  - [Value Bar Color Customization](#value-bar-color-customization)
  - [Value Bar Height](#value-bar-height)
  - [Value Bar Border](#value-bar-border)
  - [Complete Value Bar Example](#complete-value-bar-example)
- [Target Bar Configuration](#target-bar-configuration)
  - [Basic Target Bar](#basic-target-bar)
  - [Target Bar Types](#target-bar-types)
  - [Target Bar Color](#target-bar-color)
  - [Target Bar Width](#target-bar-width)
  - [Target Bar Customization Example](#target-bar-customization-example)
- [Data Labels](#data-labels)
  - [Enable Data Labels](#enable-data-labels)
  - [Data Label Configuration](#data-label-configuration)
  - [Data Label Styling](#data-label-styling)
  - [Complete Data Label Example](#complete-data-label-example)
- [Tooltips](#tooltips)
  - [Enable Basic Tooltip](#enable-basic-tooltip)
  - [Tooltip Customization](#tooltip-customization)
  - [Custom Tooltip Template](#custom-tooltip-template)
  - [Advanced Tooltip Example](#advanced-tooltip-example)
- [Title and Subtitle](#title-and-subtitle)
  - [Basic Title](#basic-title)
  - [Title and Subtitle Usage](#title-and-subtitle-usage)
  - [Title Positioning](#title-positioning)
  - [Title Styling](#title-styling)
- [Chart Dimensions](#chart-dimensions)
  - [Container-Based Sizing](#container-based-sizing)
  - [Explicit Pixel Sizing](#explicit-pixel-sizing)
  - [Responsive Percentage Sizing](#responsive-percentage-sizing)
  - [Default Dimensions](#default-dimensions)
- [Complete Visual Elements Example](#complete-visual-elements-example)
- [Best Practices](#best-practices)


## Value Bar Configuration

The value bar (also called actual bar or feature bar) displays the primary measurement value in the Bullet Chart.

### Basic Value Bar

Map your data value to the value bar:

```typescript
<ejs-bulletchart 
    [dataSource]='data'
    valueField='value'
    targetField='target'>
</ejs-bulletchart>

// Component data
public data = [
    { value: 100, target: 80 },
    { value: 200, target: 180 }
];
```

### Value Bar Types

Change the shape of the value bar:

```typescript
// Type: 'Rect' (default) or 'Dot'
<ejs-bulletchart 
    type='Rect'>
</ejs-bulletchart>
```

**Type Options:**

| Type | Appearance | Use Case |
|------|-----------|----------|
| `'Rect'` | Rectangular bar | Default, most common |
| `'Dot'` | Circular dot marker | When space is limited |

**Example: Dot Type**

```typescript
<ejs-bulletchart 
    type='Dot'
    [dataSource]='data'
    valueField='value'
    targetField='target'>
</ejs-bulletchart>
```

### Value Bar Color Customization

#### Solid Fill Color

Set a single fill color for all value bars:

```typescript
<ejs-bulletchart 
    valueFill='#4472C4'>
</ejs-bulletchart>
```

#### Data-Driven Fill Color

Apply different colors from your data:

```typescript
public data = [
    { value: 100, target: 80, color: '#FF6B6B' },
    { value: 200, target: 180, color: '#4ECDC4' },
    { value: 300, target: 280, color: '#95E1D3' }
];

template = `<ejs-bulletchart 
    [dataSource]='data'
    valueFill='color'>
</ejs-bulletchart>`
```

### Value Bar Height

Control the thickness of the value bar:

```typescript
// Height in pixels
<ejs-bulletchart 
    [valueHeight]='8'>
</ejs-bulletchart>
```

### Value Bar Border

Customize the border of the value bar:

```typescript
public valueBorder = {
    color: '#2E2E2E',    // Border color
    width: 2             // Border width in pixels
};

template = `<ejs-bulletchart 
    [valueBorder]='valueBorder'>
</ejs-bulletchart>`
```

### Complete Value Bar Example

```typescript
import { Component, OnInit } from '@angular/core';
import { BulletChartModule } from '@syncfusion/ej2-angular-charts';

@Component({
    imports: [BulletChartModule],
    standalone: true,
    template: `<ejs-bulletchart 
        [dataSource]='data'
        valueField='value'
        targetField='target'
        type='Rect'
        valueFill='#007AFF'
        [valueHeight]='10'
        [valueBorder]='valueBorder'>
    </ejs-bulletchart>`
})
export class AppComponent implements OnInit {
    public data: any;
    public valueBorder: any;

    ngOnInit(): void {
        this.data = [
            { value: 100, target: 80 },
            { value: 200, target: 180 },
            { value: 300, target: 280 }
        ];

        this.valueBorder = {
            color: '#1A1A1A',
            width: 1
        };
    }
}
```

---

## Target Bar Configuration

The target bar (also called comparative bar or goal marker) displays the target/benchmark value.

### Basic Target Bar

```typescript
<ejs-bulletchart 
    [dataSource]='data'
    valueField='value'
    targetField='target'>
</ejs-bulletchart>
```

### Target Bar Types

Customize the target bar marker shape:

```typescript
// targetTypes: 'Rect', 'Circle', or 'Cross'
<ejs-bulletchart 
    [targetTypes]='targetTypes'>
</ejs-bulletchart>
export class AppComponent {
  public targetTypes: string[] = ['Circle'];
}
```

**Type Options:**

| Type | Icon | Use Case |
|------|------|----------|
| `'Rect'` | Rectangle | Default, traditional |
| `'Circle'` | Circle | Modern, clean look |
| `'Cross'` | Cross/Plus | Clear distinction from value bar |

**Visual Comparison:**

```typescript
// Rect (default) - Sharp, traditional look
<ejs-bulletchart targetTypes='Rect'></ejs-bulletchart>

// Circle - Rounded, modern appearance
<ejs-bulletchart targetTypes='Circle'></ejs-bulletchart>

// Cross - Prominent, easy to spot
<ejs-bulletchart targetTypes='Cross'></ejs-bulletchart>
```

### Target Bar Color

Set the fill color of the target bar:

```typescript
<ejs-bulletchart 
    targetColor='#FF6B6B'>
</ejs-bulletchart>
```

### Target Bar Width

Control the size/width of the target marker:

```typescript
<ejs-bulletchart 
    [targetWidth]='4'>
</ejs-bulletchart>
```

### Target Bar Customization Example

```typescript
<ejs-bulletchart 
    [dataSource]='data'
    valueField='value'
    targetField='target'
    targetTypes='Circle'
    targetColor='#E81E63'
    [targetWidth]='6'>
</ejs-bulletchart>
```

---

## Data Labels

Display the actual value on the chart:

### Enable Data Labels

```typescript
<ejs-bulletchart 
    [dataLabel]='{ enable: true }'>
</ejs-bulletchart>
```

### Data Label Configuration

```typescript
public dataLabelConfig = {
    enable: true,
    format: 'n0'        // Format the displayed value
};

template = `<ejs-bulletchart 
    [dataLabel]='dataLabelConfig'>
</ejs-bulletchart>`
```

### Data Label Styling

Customize the appearance of data labels:

```typescript
public dataLabelStyle = {
    color: '#333333',
    fontFamily: 'Arial',
    fontSize: '12px',
    fontWeight: '500',
    fontStyle: 'Normal',
    opacity: 1
};

public dataLabelConfig = {
    enable: true,
    labelStyle: this.dataLabelStyle
};

template = `<ejs-bulletchart 
    [dataLabel]='dataLabelConfig'>
</ejs-bulletchart>`
```

### Complete Data Label Example

```typescript
import { Component, OnInit } from '@angular/core';
import { BulletChartModule } from '@syncfusion/ej2-angular-charts';

@Component({
    imports: [BulletChartModule],
    standalone: true,
    template: `<ejs-bulletchart 
        [dataSource]='data'
        valueField='value'
        targetField='target'
        [dataLabel]='dataLabelConfig'>
    </ejs-bulletchart>`
})
export class AppComponent implements OnInit {
    public data: any;
    public dataLabelConfig: any;

    ngOnInit(): void {
        this.data = [
            { value: 25000, target: 30000 },
            { value: 28000, target: 30000 },
            { value: 35000, target: 30000 }
        ];

        this.dataLabelConfig = {
            enable: true,
            format: 'c0',  // Currency format
            labelStyle: {
                color: '#666666',
                fontSize: '13px',
                fontWeight: 'Bold'
            }
        };
    }
}
```

---

## Tooltips

Display information when users hover over the chart:

### Enable Basic Tooltip

```typescript
import { BulletChartModule, BulletTooltipService } 
    from '@syncfusion/ej2-angular-charts';

@Component({
    imports: [BulletChartModule],
    providers: [BulletTooltipService],
    template: `<ejs-bulletchart 
        [tooltip]='{ enable: true }'>
    </ejs-bulletchart>`
})
export class AppComponent { }
```

### Tooltip Customization

```typescript
public tooltipConfig = {
    enable: true,
    fill: '#ffffff',           // Background color
    border: {
        color: '#cccccc',
        width: 1
    },
    textStyle: {
        color: '#333333',
        fontFamily: 'Arial',
        fontSize: '12px'
    }
};

template = `<ejs-bulletchart 
    [tooltip]='tooltipConfig'>
</ejs-bulletchart>`
```

### Custom Tooltip Template

Display custom HTML in tooltips using placeholder values:

```typescript
public tooltipTemplate = '<div style="padding: 5px;">' +
    'Value: <b>${value}</b><br/>' +
    'Target: <b>${target}</b><br/>' +
    'Category: <b>${category}</b>' +
    '</div>';

template = `<ejs-bulletchart 
    [tooltip]='{ enable: true, template: tooltipTemplate }'>
</ejs-bulletchart>`
```

**Available Placeholders:**

| Placeholder | Displays |
|------------|----------|
| `${value}` | Actual/feature measure value |
| `${target}` | Target/comparative measure value |
| `${category}` | Category label (if categoryField is set) |

### Advanced Tooltip Example

```typescript
import { Component, OnInit } from '@angular/core';
import { BulletChartModule, BulletTooltipService } 
    from '@syncfusion/ej2-angular-charts';

@Component({
    imports: [BulletChartModule],
    standalone: true,
    selector:'app-container',
    providers: [BulletTooltipService],
    template: `<ejs-bulletchart 
        [dataSource]='data'
        valueField='value'
        targetField='target'
        categoryField='category'
        [tooltip]='tooltipConfig'>
    </ejs-bulletchart>`
})
export class AppComponent implements OnInit {
    public data: any;
    public tooltipConfig: any;

    ngOnInit(): void {
        this.data = [
            { category: 'Q1', value: 25000, target: 30000 },
            { category: 'Q2', value: 28000, target: 30000 },
            { category: 'Q3', value: 35000, target: 30000 }
        ];

        this.tooltipConfig = {
            enable: true,
            template: '<div style="padding: 8px; background: #f0f0f0;">' +
                'Actual: $${value}<br/>' +
                'Target: $${target}<br/>'+
                '</div>',
            fill: '#ffffff',
            border: { color: '#999999', width: 2 },
            textStyle: {
                color: '#333333',
                fontSize: '12px'
            }
        };
    }
}
```

---

## Title and Subtitle

Add context information to your chart:

### Basic Title

```typescript
<ejs-bulletchart 
    title='Sales Performance'>
</ejs-bulletchart>
```

### Title and Subtitle Usage

```typescript
<ejs-bulletchart 
    title='Quarterly Sales'
    subtitle='Actual vs Target'>
</ejs-bulletchart>
```

### Title Positioning

```typescript
// titlePosition: 'Top' (default), 'Bottom', 'Left', 'Right'
<ejs-bulletchart 
    title='Performance Metrics'
    titlePosition='Bottom'>
</ejs-bulletchart>
```

### Title Styling

```typescript
public titleStyle = {
    color: '#333333',
    fontFamily: 'Arial',
    fontSize: '16px',
    fontWeight: 'Bold',
    fontStyle: 'Normal',
    opacity: 1
};

public subtitleStyle = {
    color: '#666666',
    fontFamily: 'Arial',
    fontSize: '12px',
    fontWeight: 'Normal'
};

template = `<ejs-bulletchart 
    title='Main Title'
    subtitle='Sub Title'
    [titleStyle]='titleStyle'
    [subtitleStyle]='subtitleStyle'>
</ejs-bulletchart>`
```

---

## Chart Dimensions

Control the size of the Bullet Chart:

### Container-Based Sizing

The chart automatically sizes to fit its container:

```html
<div style="width: 650px; height: 350px;">
    <ejs-bulletchart></ejs-bulletchart>
</div>
```

### Explicit Pixel Sizing

Set specific dimensions:

```typescript
<ejs-bulletchart 
    width='600px'
    height='300px'>
</ejs-bulletchart>
```

### Responsive Percentage Sizing

Use percentages for responsive design:

```typescript
<ejs-bulletchart 
    width='100%'
    height='50%'>
</ejs-bulletchart>
```

### Default Dimensions

If no size is specified:
- **Width**: 100% of container
- **Height**: 126px

---

## Complete Visual Elements Example

```typescript
import { Component, OnInit } from '@angular/core';
import { BulletChartModule, BulletTooltipService } 
    from '@syncfusion/ej2-angular-charts';

@Component({
    imports: [BulletChartModule],
    standalone: true,
    providers: [BulletTooltipService],
    template: `<div style="width: 800px; height: 400px;">
        <ejs-bulletchart 
            [dataSource]='chartData'
            valueField='value'
            targetField='target'
            categoryField='category'
            title='Department Performance Dashboard'
            subtitle='Actual vs Target'
            titlePosition='Top'
            type='Rect'
            valueFill='#007AFF'
            [valueHeight]='10'
            [valueBorder]='valueBorder'
            targetTypes='Circle'
            targetColor='#FF6B6B'
            [targetWidth]='5'
            [dataLabel]='dataLabelConfig'
            [tooltip]='tooltipConfig'
            width='100%'
            height='100%'>
        </ejs-bulletchart>
    </div>`
})
export class AppComponent implements OnInit {
    public chartData: any;
    public valueBorder: any;
    public dataLabelConfig: any;
    public tooltipConfig: any;

    ngOnInit(): void {
        this.chartData = [
            { category: 'Sales', value: 75, target: 80 },
            { category: 'Marketing', value: 65, target: 75 },
            { category: 'Operations', value: 85, target: 80 }
        ];

        this.valueBorder = { color: '#1A1A1A', width: 1 };

        this.dataLabelConfig = {
            enable: true,
            labelStyle: { color: '#333333', fontSize: '11px' }
        };

        this.tooltipConfig = {
            enable: true,
            template: '<div style="padding: 8px;">' +
                '<b>${category}</b><br/>' +
                'Actual: ${value}<br/>' +
                'Target: ${target}</div>',
            fill: '#ffffff',
            border: { color: '#999999', width: 1 }
        };
    }
}
```

## Best Practices

1. **Use clear, descriptive titles** - Help users understand the visualization
2. **Keep labels readable** - Avoid overlapping or too-small text
3. **Test tooltip templates** - Ensure placeholders display correctly
4. **Maintain consistent colors** - Use meaningful color schemes
5. **Optimize chart size** - Balance visibility with screen space
6. **Provide context** - Use subtitles and labels for clarity
7. **Test responsiveness** - Ensure charts look good on all devices
