# Advanced Features

## Table of Contents
- [Virtual Scrolling](#virtual-scrolling)
- [Row Auto Height](#row-auto-height)
- [Lazy Loading (enableLazyLoading)](#lazy-loading-enablelazyloading)
- [Dimensions Configuration](#dimensions-configuration)
- [Set Custom Width and Height](#set-custom-width-and-height)
- [Responsive Width](#responsive-width)
- [Cell Dimensions via CSS](#cell-dimensions-via-css)
- [Best Practices](#best-practices)

Explore advanced Scheduler capabilities including virtual scrolling, row auto-height, and dimensions configuration.

## Virtual Scrolling

Enable virtual scrolling for better performance with large datasets or extended timelines:

```typescript
import { Component } from '@angular/core';
import { ScheduleModule, EventSettingsModel } from '@syncfusion/ej2-angular-schedule';
import { TimelineViewsService, TimelineMonthService } from '@syncfusion/ej2-angular-schedule';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ScheduleModule],
  providers: [TimelineViewsService, TimelineMonthService],
  template: `
    <ejs-schedule 
      width='100%' 
      height='550px'
      [selectedDate]='selectedDate'
      [eventSettings]='eventSettings'>
      <e-views>
        <e-view option='TimelineMonth' [allowVirtualScrolling]='true' [isSelected]='true'></e-view>
      </e-views>
    </ejs-schedule>
  `
})
export class AppComponent {
  public selectedDate: Date = new Date(2024, 0, 15);
  public eventSettings: EventSettingsModel = { dataSource: [] };
}
```

**Benefits**:
- Renders only visible portion of timeline
- Improves performance with large date ranges
- Reduces initial load time
- Smooth scrolling experience

**Supported Views**:
- Timeline Day
- Timeline Week
- Timeline WorkWeek
- Timeline Month

## Row Auto Height

Automatically adjust cell heights based on appointment count:

```typescript
import { Component } from '@angular/core';
import { ScheduleModule, EventSettingsModel } from '@syncfusion/ej2-angular-schedule';
import { MonthService } from '@syncfusion/ej2-angular-schedule';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ScheduleModule],
  providers: [MonthService],
  template: `
    <ejs-schedule 
      width='100%' 
      height='550px'
      [selectedDate]='selectedDate'
      [eventSettings]='eventSettings'
      [rowAutoHeight]='true'>
      <e-views>
        <e-view option='Month'></e-view>
      </e-views>
    </ejs-schedule>
  `
})
export class AppComponent {
  public selectedDate: Date = new Date(2024, 0, 15);
  public eventSettings: EventSettingsModel = { dataSource: [] };
}
```

**Behavior**:
- Expands cells to fit all appointments
- Eliminates "+N more" indicator
- Better visibility of all events
- Especially useful in Month view

## Lazy Loading (enableLazyLoading)

Enable lazy loading to fetch event data on-demand from a remote `DataManager` for the visible date range or visible resource rows, instead of loading the entire dataset up front. This is useful when working with very large remote datasets.

```typescript
import { Component } from '@angular/core';
import { ScheduleModule, EventSettingsModel } from '@syncfusion/ej2-angular-schedule';
import { MonthService, TimelineMonthService } from '@syncfusion/ej2-angular-schedule';
import { DataManager, WebApiAdaptor } from '@syncfusion/ej2-data';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ScheduleModule],
  providers: [MonthService, TimelineMonthService],
  template: `
    <ejs-schedule 
      width='100%' 
      height='550px'
      [selectedDate]='selectedDate'
      [eventSettings]='eventSettings'>
      <e-views>
        <e-view option='TimelineMonth' enableLazyLoading='true' [isSelected]='true'></e-view>
        <e-view option='Month' enableLazyLoading='true'></e-view>
      </e-views>
    </ejs-schedule>
  `
})
export class AppComponent {
  public selectedDate: Date = new Date(2024, 0, 15);

  private dataManager: DataManager = new DataManager({
    url: 'https://your-api.example.com/api/events',
    adaptor: new WebApiAdaptor(),
    crossDomain: true
  });

  public eventSettings: EventSettingsModel = {
    dataSource: this.dataManager
  };
}
```

**Benefits**:
- Loads events on-demand for the visible date range or visible resource rows
- Reduces initial load time and memory footprint
- Supports very large remote datasets
- Works with resource grouping (lazy loads per resource)

**Note**: `eventSettings.dataSource` must be a remote `DataManager` and the server endpoint should support filtering events by date and/or resource.

## Dimensions Configuration

### Set Custom Width and Height

```typescript
<ejs-schedule 
  width='1200px' 
  height='650px'
  [selectedDate]='selectedDate'
  [eventSettings]='eventSettings'>
</ejs-schedule>
```

### Responsive Width

```typescript
<ejs-schedule 
  width='100%' 
  height='100vh'
  [selectedDate]='selectedDate'
  [eventSettings]='eventSettings'>
</ejs-schedule>
```

### Cell Dimensions via CSS

```css
/* Customize cell height in vertical views */
.e-schedule .e-vertical-view .e-time-cells-wrap table td,
.e-schedule .e-vertical-view .e-work-cells {
  height: 100px;
}

/* Customize column width */
.e-schedule .e-vertical-view .e-date-header-wrap table col,
.e-schedule .e-vertical-view .e-content-wrap table col {
  width: 150px;
}
```

## Best Practices

1. **Virtual Scrolling**: Enable for Timeline views with intervals > 3 months
2. **Row Auto Height**: Use when all events must be visible without interaction
3. **Lazy Loading**: Use `enableLazyLoading='true'` per view with a remote `DataManager` when working with very large datasets to reduce initial load time and memory usage
4. **Fixed Dimensions**: Use pixel values for fixed layouts (dashboards)
5. **Responsive Dimensions**: Use percentage/vh for full-page applications
6. **Cell Height**: Balance between readability and screen space
7. **Performance**: Test with realistic data volumes before enabling features
8. **Mobile**: Disable row auto height on mobile to prevent excessive scrolling
9. **Memory**: Monitor memory usage with virtual scrolling enabled
10. **Combination**: Can combine virtual scrolling with other performance optimizations
11. **Testing**: Verify scrolling behavior across different browsers
