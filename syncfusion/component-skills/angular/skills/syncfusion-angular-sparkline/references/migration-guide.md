# Migration Guide: EJ1 to EJ2 Angular Sparkline

This guide helps you migrate from the legacy EJ1 (Essential JS 1) Sparkline to the modern EJ2 Angular Sparkline component.

## Table of Contents

- [Key Differences](#key-differences)
- [Package and Setup Migration](#package-and-setup-migration)
  - [EJ1 Setup](#ej1-setup)
  - [EJ2 Setup](#ej2-setup)
- [Component Declaration Migration](#component-declaration-migration)
  - [EJ1 Approach](#ej1-approach)
  - [EJ2 Approach](#ej2-approach)
- [API Property Migration](#api-property-migration)
  - [Common Property Mappings](#common-property-mappings)
  - [Data Binding Migration](#data-binding-migration)
- [Marker Configuration Migration](#marker-configuration-migration)
  - [EJ1 Marker Setup](#ej1-marker-setup)
  - [EJ2 Marker Setup](#ej2-marker-setup)
- [Data Label Configuration Migration](#data-label-configuration-migration)
  - [EJ1 Data Labels](#ej1-data-labels)
  - [EJ2 Data Labels](#ej2-data-labels)
- [Tooltip Configuration Migration](#tooltip-configuration-migration)
  - [EJ1 Tooltips](#ej1-tooltips)
  - [EJ2 Tooltips](#ej2-tooltips)
- [Event Migration](#event-migration)
  - [EJ1 Events](#ej1-events)
  - [EJ2 Events](#ej2-events)
- [Type System Migration](#type-system-migration)
  - [EJ1 Type Names](#ej1-type-names)
  - [EJ2 Type Names](#ej2-type-names)
- [Complete Migration Example](#complete-migration-example)
  - [EJ1 Implementation](#ej1-implementation)
  - [EJ2 Implementation](#ej2-implementation)
- [Breaking Changes](#breaking-changes)
  - [Removed Features](#removed-features)
  - [Changed Default Values](#changed-default-values)
- [Service Migration](#service-migration)
  - [EJ1 Services](#ej1-services)
  - [EJ2 Services](#ej2-services)
- [Testing and Validation](#testing-and-validation)
  - [Test Checklist](#test-checklist)
  - [Performance Comparison](#performance-comparison)
- [Troubleshooting Migration Issues](#troubleshooting-migration-issues)
  - [Issue: Sparkline Not Rendering](#issue-sparkline-not-rendering)
  - [Issue: Data Not Binding](#issue-data-not-binding)
  - [Issue: Old jQuery Code Breaking](#issue-old-jquery-code-breaking)
- [Resources](#resources)
- [Getting Help](#getting-help)


## Key Differences

| Aspect | EJ1 | EJ2 |
|--------|-----|-----|
| **Package** | jquery.ej2.sparkline.js | @syncfusion/ej2-angular-charts |
| **Framework** | jQuery-based | Angular standalone/module |
| **Data Binding** | Direct array or URL | Strongly typed with mapping |
| **Properties** | CamelCase | CamelCase (same) |
| **Events** | jQuery events | Angular events |
| **Build** | Script tags | npm package, tree-shakeable |

## Package and Setup Migration

### EJ1 Setup

```html
<!-- EJ1: Script tag approach -->
<script src="jquery.min.js"></script>
<script src="ej.web.all.min.js"></script>

<div id="sparkline"></div>

<script>
  $("#sparkline").ejSparkline({
    dataSource: [2, 6, 4, 8, 5],
    type: "Line"
  });
</script>
```

### EJ2 Setup

```typescript
// EJ2: Angular component approach
import { SparklineModule } from '@syncfusion/ej2-angular-charts'
import { Component } from '@angular/core'

@Component({
  imports: [SparklineModule],
  standalone: true,
  template: `<ejs-sparkline 
    [dataSource]="[2, 6, 4, 8, 5]"
    type="Line">
  </ejs-sparkline>`
})
export class AppComponent { }
```

## Component Declaration Migration

### EJ1 Approach

```html
<!-- HTML initialization -->
<div id="sparkline" data-role="ejsparkline" data-type="Line"></div>

<script>
  // jQuery selector approach
  $("#sparkline").ejSparkline({
    dataSource: chartData,
    height: 100,
    width: 200
  });
</script>
```

### EJ2 Approach

```typescript
// Component-based approach
@Component({
  imports: [SparklineModule],
  standalone: true,
  template: `<ejs-sparkline 
    [dataSource]="chartData"
    height="100px"
    width="200px"
    type="Line">
  </ejs-sparkline>`
})
export class SparklineComponent {
  chartData = [...]
}
```

## API Property Migration

### Common Property Mappings

| EJ1 Property | EJ2 Property | Notes |
|--------------|--------------|-------|
| `dataSource` | `dataSource` | Same, but uses binding `[dataSource]` |
| `type` | `type` | Line, Column, Area, Pie, WinLoss (WinLoss replaces ColumnWinLoss) |
| `xName` | `xName` | Maps object field for X values |
| `yName` | `yName` | Maps object field for Y values |
| `height` | `height` | Use string units: "100px" |
| `width` | `width` | Use string units: "200px" |
| `fill` | `fill` | Line/area color |
| `border` | `border` | New object structure: `{ color, width }` |
| `markerSettings` | `markerSettings` | Configuration object with `visible`, `fill`, `size` |
| `tooltipSettings` | `tooltipSettings` | Requires service injection |

### Data Binding Migration

**EJ1:**
```typescript
// Direct array
dataSource: [10, 15, 12, 20]

// Object array with properties
dataSource: [
  { xVal: 'Jan', yVal: 100 },
  { xVal: 'Feb', yVal: 150 }
],
xName: 'xVal',
yName: 'yVal'
```

**EJ2:**
```typescript
// Same syntax, but with TypeScript typing
dataSource = [10, 15, 12, 20]

// Object array (TypeScript preferred)
dataSource = [
  { xVal: 'Jan', yVal: 100 },
  { xVal: 'Feb', yVal: 150 }
]

// In template:
xName="xVal"
yName="yVal"
```

## Marker Configuration Migration

### EJ1 Marker Setup

```javascript
$("#sparkline").ejSparkline({
  markerSettings: {
    visible: ['All'],
    fill: 'red',
    size: 5,
    border: { color: 'blue' }
  }
});
```

### EJ2 Marker Setup

```typescript
@Component({
  template: `<ejs-sparkline 
    [markerSettings]="markerConfig">
  </ejs-sparkline>`
})
export class MarkerComponent {
  markerConfig = {
    visible: ['All'],
    fill: 'red',
    size: 5,
    border: { color: 'blue' }
  }
}
```

## Data Label Configuration Migration

### EJ1 Data Labels

```javascript
$("#sparkline").ejSparkline({
  dataLabelSettings: {
    visible: ['All'],
    fill: 'white',
    textStyle: {
      color: 'black'
    }
  }
});
```

### EJ2 Data Labels

```typescript
@Component({
  template: `<ejs-sparkline 
    [dataLabelSettings]="labelConfig">
  </ejs-sparkline>`
})
export class LabelComponent {
  labelConfig = {
    visible: ['All'],
    fill: 'white',
    textStyle: {
      color: 'black'
    }
  }
}
```

## Tooltip Configuration Migration

### EJ1 Tooltips

```javascript
// EJ1: Tooltip via simple property
$("#sparkline").ejSparkline({
  tooltip: {
    visible: true,
    template: 'Value: #point.y#'
  }
});
```

### EJ2 Tooltips

```typescript
// EJ2: Requires service injection + template syntax
import { SparklineModule, SparklineTooltipService } from '@syncfusion/ej2-angular-charts'

@Component({
  imports: [SparklineModule],
  standalone: true,
  providers: [SparklineTooltipService],
  template: `<ejs-sparkline 
    [tooltipSettings]="{ 
      visible: true,
      format: 'Value: ${y}'
    }">
  </ejs-sparkline>`
})
export class TooltipComponent { }
```

## Event Migration

### EJ1 Events

```javascript
// EJ1: jQuery event binding
$("#sparkline").ejSparkline({
  pointRegionMouseEnter: function(args) {
    console.log('Point entered:', args);
  }
});
```

### EJ2 Events

```typescript
// EJ2: Angular event binding
@Component({
  template: `<ejs-sparkline 
    (pointRegionMouseEnter)="onPointEnter($event)">
  </ejs-sparkline>`
})
export class EventComponent {
  onPointEnter(args: any) {
    console.log('Point entered:', args);
  }
}
```

## Type System Migration

### EJ1 Type Names

```javascript
type: 'Line'        // Line chart
type: 'Column'      // Column chart
type: 'Area'        // Area chart
type: 'Pie'         // Pie chart
type: 'ColumnWinLoss'  // Win-Loss
```

### EJ2 Type Names

```typescript
type="Line"        // Line chart (same)
type="Column"      // Column chart (same)
type="Area"        // Area chart (same)
type="Pie"         // Pie chart (same)
type="WinLoss"     // Win-Loss (simplified)
```

## Complete Migration Example

### EJ1 Implementation

```html
<!DOCTYPE html>
<html>
<head>
  <script src="jquery.min.js"></script>
  <script src="ej.web.all.min.js"></script>
  <link rel="stylesheet" href="ej.web.all.css" />
</head>
<body>
  <div id="sparkline"></div>
  
  <script>
    var salesData = [
      { month: 'Jan', amount: 5000 },
      { month: 'Feb', amount: 7000 },
      { month: 'Mar', amount: 6500 }
    ];
    
    $("#sparkline").ejSparkline({
      dataSource: salesData,
      type: 'Column',
      xName: 'month',
      yName: 'amount',
      height: 100,
      width: 250,
      markerSettings: {
        visible: ['High', 'Low'],
        fill: 'red'
      },
      tooltip: {
        visible: true
      }
    });
  </script>
</body>
</html>
```

### EJ2 Implementation

```typescript
import { SparklineModule, SparklineTooltipService } from '@syncfusion/ej2-angular-charts'
import { Component } from '@angular/core'

@Component({
  imports: [SparklineModule],
  standalone: true,
  providers: [SparklineTooltipService],
  selector: 'app-root',
  template: `<ejs-sparkline 
    [dataSource]="salesData"
    type="Column"
    xName="month"
    yName="amount"
    valueType='Category'
    height="100px"
    width="250px"
    [markerSettings]="{ 
      visible: ['High', 'Low'],
      fill: 'red'
    }"
    [tooltipSettings]="tooltipSettings">
  </ejs-sparkline>`
})
export class AppComponent {
  salesData = [
    { month: 'Jan', amount: 5 },
    { month: 'Feb', amount: 7 },
    { month: 'Mar', amount: 6.5 }
  ]
    tooltipSettings = { 
        visible: true,
        format: '${month}: $${amount}k'
      }
}
```

## Breaking Changes

### Removed Features

The following EJ1 features are not available in EJ2:

| Feature | EJ1 | EJ2 | Workaround |
|---------|-----|-----|-----------|
| URL-based data | ✓ | ✗ | Fetch data before binding |
| Print capability | ✓ | ✗ | Use browser print API |
| Export to image | ✓ | ✗ | Use dom-to-image library |
| Theme customizer | ✓ | ✗ | Use CSS custom properties |

### Changed Default Values

| Property | EJ1 Default | EJ2 Default |
|----------|-------------|-------------|
| `type` | 'Column' | 'Line' |
| `height` | 'auto' | '100px' |
| `fill` | Varies | '#6200EE' |

## Service Migration

### EJ1 Services

```javascript
// Services were implicit, no registration needed
```

### EJ2 Services

```typescript
// Services must be explicitly injected
import { SparklineTooltipService } from '@syncfusion/ej2-angular-charts'

@Component({
  providers: [SparklineTooltipService]  // ← Required
})
```

## Testing and Validation

### Test Checklist

After migrating, verify:

- [ ] Sparkline renders correctly
- [ ] Data displays accurately
- [ ] Markers appear in correct positions
- [ ] Data labels format correctly
- [ ] Tooltips show on hover
- [ ] Type changes work (Line, Column, Area, etc.)
- [ ] Colors apply correctly
- [ ] Responsive sizing works
- [ ] RTL support functions (if needed)
- [ ] Performance is acceptable with large datasets

### Performance Comparison

EJ2 typically offers:
- **30-50% faster** initial render
- **40% smaller** bundle size (tree-shakeable)
- **Better memory** management with large datasets
- **Improved** event handling

## Troubleshooting Migration Issues

### Issue: Sparkline Not Rendering

**Cause:** Module not imported or service not provided.

**Solution:**
```typescript
@Component({
  imports: [SparklineModule],  // ← Required
  providers: [SparklineTooltipService]  // ← If using tooltips
})
```

### Issue: Data Not Binding

**Cause:** Property names don't match data object.

**Solution:** Verify exact property names:
```typescript
// ✓ Correct
xName="month"  // Matches object property name
yName="amount"

// ✗ Wrong
xName="monthName"  // Doesn't match
yName="value"
```

### Issue: Old jQuery Code Breaking

**Cause:** EJ2 doesn't support jQuery selectors.

**Solution:** Use Angular template binding instead:
```typescript
// ✗ Old approach won't work
$("#sparkline").ejSparkline(...)

// ✓ New approach
@Component({
  template: `<ejs-sparkline [dataSource]="data"></ejs-sparkline>`
})
```

## Resources

- **Official Migration Guide:** https://ej2.syncfusion.com/angular/documentation/sparkline/sparkline-types/
- **API Reference:** https://ej2.syncfusion.com/angular/documentation/api/sparkline/
- **GitHub Examples:** https://github.com/syncfusion/ej2-angular-samples

## Getting Help

If you encounter migration issues:

1. Check the EJ2 [API documentation](https://ej2.syncfusion.com/angular/documentation/api/sparkline/)
2. Review the [feature comparison](https://ej2.syncfusion.com/angular/documentation/sparkline/overview/)
3. Post on [Syncfusion forums](https://www.syncfusion.com/forums/)
4. Contact [Syncfusion support](https://support.syncfusion.com/)
