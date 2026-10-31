# Markers in Sparklines

Markers highlight important data points in a sparkline, making peaks, valleys, and specific values visually distinct.

## Table of Contents

- [Adding Markers to All Points](#adding-markers-to-all-points)
- [Markers for Specific Points](#markers-for-specific-points)
  - [Start and End Points](#start-and-end-points)
  - [High and Low Points](#high-and-low-points)
  - [Negative Points](#negative-points)
  - [Combining Multiple Marker Types](#combining-multiple-marker-types)
- [Customizing Marker Appearance](#customizing-marker-appearance)
  - [Basic Customization](#basic-customization)
  - [Advanced Customization](#advanced-customization)
  - [Marker Properties](#marker-properties)
- [Real-World Examples](#real-world-examples)
  - [Sales Performance Tracking](#sales-performance-tracking)
  - [Network Uptime Monitoring](#network-uptime-monitoring)
  - [Temperature Extremes](#temperature-extremes)
- [Marker Interaction with Data Labels](#marker-interaction-with-data-labels)
- [Troubleshooting](#troubleshooting)
  - [Issue: Markers Not Appearing](#issue-markers-not-appearing)
  - [Issue: Markers Overlapping Data](#issue-markers-overlapping-data)
  - [Issue: Custom Colors Not Applied](#issue-custom-colors-not-applied)
- [Performance Tips](#performance-tips)

## Adding Markers to All Points

To display markers for every data point:

```typescript
import { SparklineModule } from '@syncfusion/ej2-angular-charts'
import { Component } from '@angular/core';

@Component({
  imports: [SparklineModule],
  standalone: true,
  selector: 'app-container',
  template: `<ejs-sparkline 
    id='sparkline-container'
    [dataSource]="data"
    type="Line"
    [markerSettings]="{ visible: ['All'] }"
    height="100px"
    width="200px">
  </ejs-sparkline>`
})
export class AppComponent {
  data = [2, 6, 4, 8, 5, 1, 7]
}
```

**Output:** A marker (small dot) appears at each data point.

## Markers for Specific Points

Highlight only important points to reduce visual clutter:

### Start and End Points

Show markers only at the first and last data points:

```typescript
@Component({
  template: `<ejs-sparkline id='container' width='350px' height='200px' [markerSettings] ='markerSettings' [dataSource]="data" >
    </ejs-sparkline>`
})
export class StartEndMarkersComponent {
   public data: object[] = [0, 6, 4, 1, 3, 2, 5] as any;
    public markerSettings: object= {
        visible: ['Start', 'End']
    };
  
}
```

**Use Case:** Quickly compare beginning and ending values.

### High and Low Points

Emphasize the maximum and minimum values:

```typescript
@Component({
  template: `<ejs-sparkline id='container' width='350px' height='200px' [markerSettings] ='markerSettings' [dataSource]="data" >
    </ejs-sparkline>`
})
export class HighLowMarkersComponent {
   public data: object[] = [0, 6, 4, 1, 3, 2, 5] as any;
    public markerSettings: object= {
        visible: ['High', 'Low']
    };
  
}
```

**Output:** Markers highlight the highest value (160) and lowest value (50).

### Negative Points

Mark negative values (useful for financial data):

```typescript
@Component({
  template: `<ejs-sparkline id='container' width='350px' height='200px'[dataSource]="data" >
    </ejs-sparkline>`
})
export class NegativeMarkersComponent {
   public data: object[] = [10, 5, -8, 12, -3, 15, 8]  // Negative values marked
}
```

**Use Case:** Financial losses, error rates, or deficit months.

### Combining Multiple Marker Types

Show multiple marker types simultaneously:

```typescript
@Component({
  template: `<ejs-sparkline id='container' width='350px' height='200px' [markerSettings] ='markerSettings' [dataSource]="data" >
    </ejs-sparkline>`
})
export class CombinedMarkersComponent {
   public data: object[] = [0, 6, 4, 1, 3, 2, 5] as any;
    public markerSettings: object= {
        visible: ['High', 'Low', 'Negative', 'Start', 'End']
    };
}
```

## Customizing Marker Appearance

### Basic Customization

Change marker color, size, and border:

```typescript
@Component({
  template: `<ejs-sparkline id='container' width='350px' height='200px' [markerSettings] ='markerSettings' [dataSource]="data" >
    </ejs-sparkline>`
})
export class CustomMarkersComponent {
   public data: object[] = [0, 6, 4, 1, 3, 2, 5] as any;
    public markerSettings: object= {
       visible: ['All'],
            fill: '#FF5733',
            border: { color: '#000' },
            size: 8 
    };
}
```

**Output:** Larger orange markers with black borders on all points.

### Advanced Customization

Customize opacity and border width:

```typescript
markerSettings = {
  visible: ['High', 'Low'],
  fill: '#4472C4',
  size: 10,
  opacity: 0.8,
  border: {
    color: '#1F497D',
    width: 2
  }
}
```

### Marker Properties

| Property | Type | Default | Purpose |
|----------|------|---------|---------|
| `visible` | Array | [] | Points to mark: All, Start, End, High, Low, Negative |
| `fill` | string | '#4472C4' | Marker background color |
| `size` | number | 4 | Marker diameter in pixels |
| `opacity` | number | 1 | Transparency (0-1) |
| `border.color` | string | - | Border color |
| `border.width` | number | 0 | Border thickness |

## Real-World Examples

### Sales Performance Tracking

Highlight peaks and troughs in weekly sales:

```typescript
@Component({
  imports: [SparklineModule],
  standalone: true,
  template: `<div>
    <p>Sales Trend (with high/low markers)</p>
    <ejs-sparkline 
      [dataSource]="weeklySales"
      xName="day"
      yName="amount"
      valueType="Category"
      type="Column"
      [markerSettings]="{ 
        visible: ['High', 'Low'],
        fill: '#E74C3C',
        size: 8
      }">
    </ejs-sparkline>
  </div>`
})
export class SalesTrackingComponent {
  weeklySales = [
    { day: 'Mon', amount: 2000 },
    { day: 'Tue', amount: 2500 },
    { day: 'Wed', amount: 1800 },
    { day: 'Thu', amount: 3500 },  // High
    { day: 'Fri', amount: 1200 },  // Low
    { day: 'Sat', amount: 2800 }
  ]
}
```

### Network Uptime Monitoring

Mark when network goes down (negative):

```typescript
@Component({
  template: `<ejs-sparkline id='container'   xName="hour"
    yName="status"
    type="Line"
    valueType="Category"
    type="Area" width='350px' height='200px'  [markerSettings] ='markerSettings'  [dataSource]="hourlyTemp" >
    </ejs-sparkline>`
})
export class UptimeMonitorComponent {
   hourlyTemp = [
        { hour: 1, status: 1 },
    { hour: 2, status: 1 },
    { hour: 3, status: -1 },  // Downtime
    { hour: 4, status: 1 },
    { hour: 5, status: -1 },  // Downtime
    { hour: 6, status: 1 }
      ]
    public markerSettings: object= {
        visible: ['Negative'],
        fill: '#E74C3C',
        size: 10
    };
}
```

### Temperature Extremes

Mark high and low temperatures throughout the day:

```typescript
@Component({
  template: `<ejs-sparkline id='container'  xName="hour"
    yName="celsius"
    valueType="Category"
    type="Area" width='350px' height='200px'  [markerSettings] ='markerSettings'  [dataSource]="hourlyTemp" >
    </ejs-sparkline>`
})
export class TempMonitorComponent {
   hourlyTemp = [
        { hour: '6am', celsius: 12 },
        { hour: '12pm', celsius: 28 },  // High
        { hour: '6pm', celsius: 20 },
        { hour: '12am', celsius: 8 }    // Low
      ]
    public markerSettings: object= {
        visible: ['High', 'Low']
    };
}
```

## Marker Interaction with Data Labels

You can combine markers with data labels for richer information:

```typescript
@Component({
  template: `<ejs-sparkline id='container' width='350px' height='200px'  [dataLabelSettings] = 'dataLabelSettings' [markerSettings] ='markerSettings'  [dataSource]="data" >
    </ejs-sparkline>`
})
export class MarkersWithLabelsComponent {
  public data: object[] = [0, 6, 4, 1, 3, 2, 5] as any;
    public markerSettings: object= {
        visible: ['High', 'Low']
    };
   
    public dataLabelSettings: object ={
        visible: ['High', 'Low']
    };
}
```

**Output:** Each high/low point shows both a marker and its value label.

## Troubleshooting

### Issue: Markers Not Appearing

**Cause:** `markerSettings` object not provided or `visible` array is empty.

**Solution:**
```typescript
// ✗ Wrong - visible is empty
[markerSettings]="{ visible: [] }"

// ✓ Correct
[markerSettings]="{ visible: ['All'] }"
// or
[markerSettings]="{ visible: ['High', 'Low'] }"
```

### Issue: Markers Overlapping Data

**Cause:** Markers are too large or too close together.

**Solution:** Reduce marker size or use specific marker types instead of 'All':
```typescript
[markerSettings]="{ 
  visible: ['High', 'Low'],  // Only specific points
  size: 5                      // Smaller markers
}"
```

### Issue: Custom Colors Not Applied

**Cause:** Property names or syntax issues.

**Solution:** Verify correct property structure:
```typescript
// ✓ Correct structure
[markerSettings]="{ 
  fill: '#FF0000',
  border: { color: '#000' }
}"
```

## Performance Tips

- **Limit marker types** - Use specific types ('High', 'Low') instead of 'All' for large datasets
- **Reduce marker size** - Larger markers may impact performance with dense data
- **Line vs. Column** - Column sparklines with markers render faster than lines with many points
- For 1000+ points, avoid 'All' markers; use 'High', 'Low', or 'Negative' instead
