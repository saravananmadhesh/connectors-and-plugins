# Cell Customization

## Table of Contents
- [Cell Dimensions](#cell-dimensions)
- [Customize Cell Size with CSS](#customize-cell-size-with-css)
- [Cell Availability Check](#cell-availability-check)
- [Validate Slot Availability](#validate-slot-availability)
- [Cell Templates](#cell-templates)
- [Apply Custom Content with cellTemplate](#apply-custom-content-with-celltemplate)
- [renderCell Event](#rendercell-event)
- [Customize Cells Using renderCell Event](#customize-cells-using-rendercell-event)
- [Element Types for renderCell](#element-types-for-rendercell)
- [Customize Weekend Cell Background](#customize-weekend-cell-background)
- [Month View Cell Header](#month-view-cell-header)
- [Customize Month Cell Header](#customize-month-cell-header)
- [Date Range Restrictions](#date-range-restrictions)
- [Set Minimum and Maximum Dates](#set-minimum-and-maximum-dates)
- [Multiple Cell Selection](#multiple-cell-selection)
- [Disable Multiple Selection](#disable-multiple-selection)
- [Best Practices](#best-practices)
- [Common Scenarios](#common-scenarios)
- [Highlight Special Dates](#highlight-special-dates)
- [Disable Specific Cells](#disable-specific-cells)
- [Department-Specific Colors](#department-specific-colors)
- [Time Slot Restrictions](#time-slot-restrictions)
- [Custom Date Formats](#custom-date-formats)

Customize Scheduler cell appearance, dimensions, and behavior using templates, events, and CSS.

## Cell Dimensions

### Customize Cell Size with CSS

Control the height and width of cells using the `cssClass` property:

```typescript
import { Component, ViewEncapsulation } from '@angular/core';
import { ScheduleModule, EventSettingsModel } from '@syncfusion/ej2-angular-schedule';
import { DayService, WeekService, MonthService } from '@syncfusion/ej2-angular-schedule';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ScheduleModule],
  providers: [DayService, WeekService, MonthService],
  template: `
    <ejs-schedule 
      width='100%' 
      height='550px' 
      cssClass='schedule-cell-dimension'
      [selectedDate]='selectedDate'
      [eventSettings]='eventSettings'>
    </ejs-schedule>
  `,
  styles: [`
    .schedule-cell-dimension.e-schedule .e-vertical-view .e-date-header-wrap table col,
    .schedule-cell-dimension.e-schedule .e-vertical-view .e-content-wrap table col {
      width: 200px;
    }

    .schedule-cell-dimension.e-schedule .e-vertical-view .e-time-cells-wrap table td,
    .schedule-cell-dimension.e-schedule .e-vertical-view .e-work-cells {
      height: 100px;
    }

    .schedule-cell-dimension.e-schedule .e-month-view .e-work-cells,
    .schedule-cell-dimension.e-schedule .e-month-view .e-date-header-wrap table col {
      width: 200px;
    }

    .schedule-cell-dimension.e-schedule .e-month-view .e-work-cells {
      height: 200px;
    }
  `],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  public selectedDate: Date = new Date(2024, 0, 15);
  public eventSettings: EventSettingsModel = {
    dataSource: [] // Your event data
  };
}
```

**CSS Targets**:
- **Vertical Views (Day/Week)**: 
  - Column width: `.e-vertical-view .e-content-wrap table col`
  - Row height: `.e-vertical-view .e-work-cells`
  - Time cell height: `.e-vertical-view .e-time-cells-wrap table td`
- **Month View**:
  - Cell width: `.e-month-view .e-date-header-wrap table col`
  - Cell height: `.e-month-view .e-work-cells`

## Cell Availability Check

### Validate Slot Availability

Check if a time slot is available before allowing event creation using `isSlotAvailable` method:

```typescript
import { Component, ViewChild } from '@angular/core';
import { ScheduleComponent, ScheduleModule, EventSettingsModel, ActionEventArgs } from '@syncfusion/ej2-angular-schedule';
import { DayService, WeekService, MonthService } from '@syncfusion/ej2-angular-schedule';
import { EventFieldsMapping } from '@syncfusion/ej2-angular-schedule';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ScheduleModule],
  providers: [DayService, WeekService, MonthService],
  template: `
    <ejs-schedule 
      #schedule
      width='100%' 
      height='550px'
      [selectedDate]='selectedDate'
      [eventSettings]='eventSettings'
      (actionBegin)='onActionBegin($event)'>
    </ejs-schedule>
  `
})
export class AppComponent {
  @ViewChild('schedule') public scheduleObj!: ScheduleComponent;
  
  public selectedDate: Date = new Date(2024, 0, 15);
  
  public eventSettings: EventSettingsModel = {
    dataSource: [] // Your event data
  };
  
  onActionBegin(args: ActionEventArgs): void {
    if (args.requestType === 'eventCreate' && (args.data as Object[]).length > 0) {
      const eventData = (args.data as Object[])[0] as { [key: string]: any };
      const eventField = this.scheduleObj.eventFields as EventFieldsMapping;
      const startDate: Date = eventData[eventField.startTime || ''] as Date;
      const endDate: Date = eventData[eventField.endTime || ''] as Date;
      
      // Cancel event creation if slot is not available
      args.cancel = !this.scheduleObj.isSlotAvailable(startDate, endDate);
    }
  }
}
```

**Important Notes**:
- `isSlotAvailable` verifies appointments only within the current view's date range
- Does not evaluate recurrence occurrences beyond the visible date range
- Returns `true` if slot is free, `false` if occupied

## Cell Templates

### Apply Custom Content with cellTemplate

Customize cell backgrounds with images, text, or HTML using `cellTemplate`:

```typescript
import { Component, ViewEncapsulation } from '@angular/core';
import { ScheduleModule, View } from '@syncfusion/ej2-angular-schedule';
import { DayService, WeekService, MonthService } from '@syncfusion/ej2-angular-schedule';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ScheduleModule, CommonModule],
  providers: [DayService, WeekService, MonthService],
  template: `
    <ejs-schedule 
      width='100%' 
      height='550px'
      cssClass='schedule-cell-template'
      [selectedDate]='selectedDate'
      [(currentView)]='currentView'>
      <ng-template #cellTemplate let-data>
        <div class="templatewrap" *ngIf="data.type == 'workCells'" [innerHTML]="getWorkCellText(data.date)"></div>
        <div class="templatewrap" *ngIf="data.type == 'monthCells'" [innerHTML]="getMonthCellText(data.date)"></div>
      </ng-template>
    </ejs-schedule>
  `,
  styles: [`
    .schedule-cell-template.e-schedule .e-month-view .e-work-cells {
      position: relative;
    }
    
    .templatewrap {
      text-align: center;
      position: absolute;
      width: 100%;
    }
    
    .templatewrap img {
      width: 20px;
      height: 20px;
    }
  `],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  public selectedDate: Date = new Date(2024, 11, 16);
  public currentView: View = 'Week';
  
  getMonthCellText(date: Date): string {
    if (date.getMonth() === 10 && date.getDate() === 23) {
      return '<img src="url" />';
    } else if (date.getMonth() === 11 && date.getDate() === 9) {
      return '<img src="url" />';
    } else if (date.getMonth() === 11 && date.getDate() === 13) {
      return '<img src="url" />';
    } else if (date.getMonth() === 11 && date.getDate() === 22) {
      return '<img src="url" />';
    } else if (date.getMonth() === 11 && date.getDate() === 24) {
      return '<img src="url" />';
    } else if (date.getMonth() === 11 && date.getDate() === 25) {
      return '<img src="url" />';
    } else if (date.getMonth() === 0 && date.getDate() === 1) {
      return '<img src="url" />';
    } else if (date.getMonth() === 0 && date.getDate() === 14) {
      return '<img src="url" />';
    }
    return '';
  }
  
  getWorkCellText(date: Date): string {
    const weekEnds: number[] = [0, 6];
    if (weekEnds.indexOf(date.getDay()) >= 0) {
      return "<img src='url' />";
    }
    return '';
  }
}
```

**Template Context**:
- `data.date`: Current cell's date
- `data.type`: Cell type (`'workCells'`, `'monthCells'`, etc.)
- Returns HTML string for rendering

## renderCell Event

### Customize Cells Using renderCell Event

Alternative to templates for programmatic cell customization:

```typescript
import { Component, ViewEncapsulation } from '@angular/core';
import { ScheduleModule, EventSettingsModel, RenderCellEventArgs } from '@syncfusion/ej2-angular-schedule';
import { DayService, WeekService, MonthService } from '@syncfusion/ej2-angular-schedule';
import { createElement } from '@syncfusion/ej2-base';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ScheduleModule],
  providers: [DayService, WeekService, MonthService],
  template: `
    <ejs-schedule 
      width='100%' 
      height='550px'
      currentView='Month'
      [selectedDate]='selectedDate'
      [eventSettings]='eventSettings'
      (renderCell)='onRenderCell($event)'>
    </ejs-schedule>
  `,
  styles: [`
    .templatewrap {
      text-align: center;
      width: 100%;
    }
    
    .templatewrap img {
      width: 20px;
      height: 20px;
    }
  `],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  public selectedDate: Date = new Date(2024, 0, 14);
  
  public eventSettings: EventSettingsModel = {
    dataSource: [] // Your event data
  };
  
  onRenderCell(args: RenderCellEventArgs): void {
    if (args.elementType === 'workCells' || args.elementType === 'monthCells') {
      const weekEnds: number[] = [0, 6];
      if (args.date && weekEnds.indexOf(args.date.getDay()) >= 0) {
        const ele: HTMLElement = createElement('div', {
          innerHTML: "<img src='url' />",
          className: 'templatewrap'
        });
        args.element.appendChild(ele);
      }
    }
  }
}
```

### Element Types for renderCell

Check `args.elementType` to target specific cell types:

| Element Type | Description |
|--------------|-------------|
| `dateHeader` | Header cell rendering |
| `monthDay` | Header cell in Month view |
| `resourceHeader` | Resource header cell |
| `alldayCells` | All-day cell rendering |
| `emptyCells` | Empty cell on header bar |
| `resourceGroupCells` | Work cells for parent resource |
| `workCells` | Work cell rendering |
| `monthCells` | Month cell rendering |
| `majorSlot` | Major time slot cell |
| `minorSlot` | Minor time slot cell |
| `weekNumberCell` | Cell displaying week number |

### Customize Weekend Cell Background

Change background color of weekend cells:

```typescript
import { Component, ViewEncapsulation } from '@angular/core';
import { ScheduleModule, EventSettingsModel, RenderCellEventArgs, View } from '@syncfusion/ej2-angular-schedule';
import { DayService, WeekService, MonthService } from '@syncfusion/ej2-angular-schedule';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ScheduleModule],
  providers: [DayService, WeekService, MonthService],
  template: `
    <ejs-schedule 
      width='100%' 
      height='650px'
      cssClass='schedule-cell-customization'
      [selectedDate]='selectedDate'
      [eventSettings]='eventSettings'
      [(currentView)]='currentView'
      (renderCell)='onRenderCell($event)'>
    </ejs-schedule>
  `,
  styles: [`
    .schedule-cell-customization.e-schedule .e-month-view .e-work-cells:not(.e-work-days) {
      background-color: #f08080;
    }
  `],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  public selectedDate: Date = new Date(2024, 0, 15);
  public currentView: View = 'Week';
  
  public eventSettings: EventSettingsModel = {
    dataSource: [] // Your event data
  };
  
  onRenderCell(args: RenderCellEventArgs): void {
    if (args.elementType === 'workCells') {
      // Change color of weekend columns in Week view
      if (args.date) {
        if (args.date.getDay() === 6) {
          (args.element as any).style.background = '#ffdea2';
        }
        if (args.date.getDay() === 0) {
          (args.element as any).style.background = '#ffdea2';
        }
      }
    }
  }
}
```

**CSS Approach for Month View**:
- Use `.e-work-cells:not(.e-work-days)` selector for weekend cells
- `renderCell` event for Week/Day views
- Combine both for comprehensive coverage

## Month View Cell Header

### Customize Month Cell Header

Use `cellHeaderTemplate` to customize date headers in Month view:

```typescript
import { Component, ViewEncapsulation } from '@angular/core';
import { ScheduleModule } from '@syncfusion/ej2-angular-schedule';
import { MonthService } from '@syncfusion/ej2-angular-schedule';
import { Internationalization } from '@syncfusion/ej2-base';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ScheduleModule],
  providers: [MonthService],
  template: `
    <ejs-schedule 
      width='100%' 
      height='550px'
      cssClass='schedule-cell-header-template'>
      <ng-template #cellHeaderTemplate let-data>
        <div class="date-text">{{getDateHeaderText(data.date)}}</div>
      </ng-template>
      <e-views>
        <e-view option='Month'></e-view>
      </e-views>
    </ejs-schedule>
  `,
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  private instance: Internationalization = new Internationalization();
  
  getDateHeaderText = (value: Date): string => {
    return this.instance.formatDate(value, { skeleton: 'Ed' });
  };
}
```

**Template Context**:
- `data.date`: Cell's date value
- Use `Internationalization` for locale-aware formatting
- Only applies to Month view

## Date Range Restrictions

### Set Minimum and Maximum Dates

Restrict navigation to specific date range using `minDate` and `maxDate`:

```typescript
import { Component } from '@angular/core';
import { ScheduleModule, EventSettingsModel, View } from '@syncfusion/ej2-angular-schedule';
import { DayService, WeekService, MonthService } from '@syncfusion/ej2-angular-schedule';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ScheduleModule],
  providers: [DayService, WeekService, MonthService],
  template: `
    <ejs-schedule 
      width='100%' 
      height='550px'
      [selectedDate]='selectedDate'
      [minDate]='minDate'
      [maxDate]='maxDate'
      [currentView]='currentView'
      [eventSettings]='eventSettings'>
    </ejs-schedule>
  `
})
export class AppComponent {
  public selectedDate: Date = new Date(2024, 0, 17);
  public minDate: Date = new Date(2023, 3, 17);
  public maxDate: Date = new Date(2025, 7, 17);
  public currentView: View = 'Month';
  
  public eventSettings: EventSettingsModel = {
    dataSource: [] // Your event data
  };
}
```

**Default Values**:
- `minDate`: `new Date(1900, 0, 1)`
- `maxDate`: `new Date(2099, 11, 31)`
- Dates beyond range are disabled for navigation

## Multiple Cell Selection

### Disable Multiple Selection

Control multi-cell and multi-row selection behavior:

```typescript
import { Component } from '@angular/core';
import { ScheduleModule, EventSettingsModel } from '@syncfusion/ej2-angular-schedule';
import { DayService, WeekService, MonthService } from '@syncfusion/ej2-angular-schedule';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ScheduleModule],
  providers: [DayService, WeekService, MonthService],
  template: `
    <ejs-schedule 
      width='100%' 
      height='550px'
      [allowMultiCellSelection]='false'
      [allowMultiRowSelection]='false'
      [eventSettings]='eventSettings'>
    </ejs-schedule>
  `
})
export class AppComponent {
  public eventSettings: EventSettingsModel = {
    dataSource: [] // Your event data
  };
}
```

**Properties**:
- `allowMultiCellSelection`: Enable/disable multi-cell selection (default: `true`)
- `allowMultiRowSelection`: Enable/disable multi-row selection (default: `true`)

## Best Practices

1. **CSS Classes**: Use `cssClass` for dimension changes to maintain consistency
2. **Performance**: Avoid heavy computations in `renderCell` event (fires for every cell)
3. **Templates vs Events**: Use templates for static content, events for dynamic logic
4. **Position**: Set parent position to `relative` when using absolute-positioned templates
5. **Element Types**: Check `elementType` to avoid applying styles to wrong cells
6. **Weekend Styling**: Combine CSS and `renderCell` for comprehensive coverage
7. **Date Range**: Set `minDate` and `maxDate` for restricted scheduling scenarios
8. **Slot Availability**: Use `isSlotAvailable` to prevent double booking
9. **Cell Headers**: Use `cellHeaderTemplate` for Month view customization
10. **Selection**: Disable multi-selection for simpler UX in single-event scenarios

## Common Scenarios

### Highlight Special Dates
Use `cellTemplate` with date checks to display icons or colors for holidays, birthdays, or events.

### Disable Specific Cells
Apply CSS class in `renderCell` to visually disable and prevent interaction with certain cells.

### Department-Specific Colors
Color-code cells based on resource or department using `renderCell` event.

### Time Slot Restrictions
Combine `isSlotAvailable` with custom logic to enforce business rules (e.g., no evening appointments).

### Custom Date Formats
Use `cellHeaderTemplate` with `Internationalization` for locale-specific date displays.
