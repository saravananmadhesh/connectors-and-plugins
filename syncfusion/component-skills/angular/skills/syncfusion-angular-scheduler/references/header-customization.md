# Header Customization

## Table of Contents
- [Header Bar](#header-bar)
- [Show or Hide Header Bar](#show-or-hide-header-bar)
- [Customize with Toolbar Items](#customize-with-toolbar-items)
- [Customize with Action Events](#customize-with-action-events)
- [Adaptive UI - Header Bar Popup](#adaptive-ui---header-bar-popup)
- [Date Header Customization](#date-header-customization)
- [Using dateHeaderTemplate](#using-dateheadertemplate)
- [Using renderCell for Month View](#using-rendercell-for-month-view)
- [Customize Date Range Text](#customize-date-range-text)
- [Header Rows (Timeline Views)](#header-rows-timeline-views)
- [Available Header Row Options](#available-header-row-options)
- [Display Year and Month Only](#display-year-and-month-only)
- [Display Week Numbers](#display-week-numbers)
- [Full Year Timeline](#full-year-timeline)
- [Custom Header Row Templates](#custom-header-row-templates)
- [Best Practices](#best-practices)
- [Common Scenarios](#common-scenarios)
- [Remove Create Button](#remove-create-button)
- [Resource Filter in Header](#resource-filter-in-header)
- [Project Timeline (Year View)](#project-timeline-year-view)
- [Weather Display](#weather-display)
- [Week-Based Planning](#week-based-planning)

Customize the Scheduler header bar and timeline header rows to control navigation, add custom elements, and display additional date information.

## Header Bar

### Show or Hide Header Bar

Control the visibility of the default header bar using `showHeaderBar` property:

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
      [selectedDate]='selectedDate'
      [views]='views'
      [eventSettings]='eventSettings'
      [showHeaderBar]='showHeaderBar'>
    </ejs-schedule>
  `
})
export class AppComponent {
  public selectedDate: Date = new Date(2024, 0, 15);
  public views: string[] = ['Day', 'Week', 'WorkWeek'];
  public showHeaderBar: boolean = false;
  
  public eventSettings: EventSettingsModel = {
    dataSource: [] // Your event data
  };
}
```

**Header Bar Contains** (by default):
- Previous/Next navigation buttons
- Date range text display
- Today button
- View switcher dropdown
- Create new event button

### Customize with Toolbar Items

Add custom items to the header bar using the `toolbarItems` property:

```typescript
import { Component, ViewChild } from '@angular/core';
import { ScheduleComponent, ScheduleModule, EventSettingsModel } from '@syncfusion/ej2-angular-schedule';
import { MonthService } from '@syncfusion/ej2-angular-schedule';
import { DropDownListModule, ChangeEventArgs } from '@syncfusion/ej2-angular-dropdowns';
import { extend } from '@syncfusion/ej2-base';
import { Query, Predicate } from '@syncfusion/ej2-data';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ScheduleModule, DropDownListModule],
  providers: [MonthService],
  template: `
    <ejs-schedule 
      #scheduleObj
      width='100%' 
      height='650px'
      [selectedDate]='selectedDate'
      [eventSettings]='eventSettings'>
      <e-resources>
        <e-resource 
          field="OwnerId" 
          title="Owner" 
          name="Owners"
          [dataSource]='ownerDataSource' 
          textField='OwnerText'
          idField='OwnerId' 
          colorField='Color'>
        </e-resource>
      </e-resources>
      <e-views>
        <e-view option="Month"></e-view>
      </e-views>
      <e-toolbaritems>
        <e-toolbaritem name="Previous" align="Left"></e-toolbaritem>
        <e-toolbaritem name="Next" align="Left"></e-toolbaritem>
        <e-toolbaritem name="DateRangeText" align="Left"></e-toolbaritem>
        <e-toolbaritem name="Today" align="Right"></e-toolbaritem>
        <e-toolbaritem name="Custom" align="Center">
          <ng-template #template>
            <ejs-dropdownlist 
              id='ddlelement' 
              [value]="1"
              [dataSource]='ownerDataSource' 
              [fields]='fields'
              (change)="onChange($event)">
            </ejs-dropdownlist>
          </ng-template>
        </e-toolbaritem>
      </e-toolbaritems>
    </ejs-schedule>
  `
})
export class AppComponent {
  @ViewChild('scheduleObj') public scheduleObj!: ScheduleComponent;
  
  public selectedDate: Date = new Date(2024, 0, 15);
  public fields: Object = { text: 'OwnerText', value: 'OwnerId' };
  
  public eventSettings: EventSettingsModel = {
    dataSource: extend([], [], true) as Record<string, any>[],
    query: new Query().where('OwnerId', 'equal', 1)
  };
  
  public ownerDataSource: Object[] = [
    { OwnerText: 'Margaret', OwnerId: 1, Color: '#ea7a57' },
    { OwnerText: 'Robert', OwnerId: 2, Color: '#df5286' },
    { OwnerText: 'Laura', OwnerId: 3, Color: '#865fcf' }
  ];
  
  onChange(args: ChangeEventArgs) {
    const predicate = new Predicate('OwnerId', 'equal', parseInt(args.value as string, 10));
    this.scheduleObj.eventSettings.query = new Query().where(predicate);
  }
}
```

**Default Toolbar Item Names**:
- `'Previous'` - Navigate to previous date range
- `'Next'` - Navigate to next date range
- `'Today'` - Navigate to today's date
- `'DateRangeText'` - Display current date range
- `'NewEvent'` - Create new event button
- `'Views'` - View switcher dropdown
- `'Custom'` - Custom content (requires template)

**Alignment Options**:
- `'Left'` - Align to left side
- `'Center'` - Align to center
- `'Right'` - Align to right side

### Customize with Action Events

Add custom elements dynamically using `actionBegin` and `actionComplete` events:

```typescript
import { Component, ViewChild } from '@angular/core';
import { ScheduleComponent, ScheduleModule, EventSettingsModel, ActionEventArgs, ToolbarActionArgs } from '@syncfusion/ej2-angular-schedule';
import { MonthService } from '@syncfusion/ej2-angular-schedule';
import { createElement, compile } from '@syncfusion/ej2-base';
import { ItemModel } from '@syncfusion/ej2-navigations';
import { Popup } from '@syncfusion/ej2-popups';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ScheduleModule],
  providers: [MonthService],
  template: `
    <ejs-schedule 
      #schedule
      width='100%' 
      height='550px'
      [selectedDate]='selectedDate'
      [views]='views'
      [eventSettings]='eventSettings'
      [currentView]='currentView'
      (actionBegin)='onActionBegin($event)'
      (actionComplete)='onActionComplete($event)'>
    </ejs-schedule>
  `
})
export class AppComponent {
  @ViewChild('schedule') public scheduleObj!: ScheduleComponent;
  
  public selectedDate: Date = new Date(2024, 0, 15);
  public views: string[] = ['Month'];
  public currentView: string = 'Month';
  public profilePopup?: Popup;
  
  public eventSettings: EventSettingsModel = {
    dataSource: [] // Your event data
  };
  
  onActionBegin(args: ActionEventArgs & ToolbarActionArgs): void {
    if (args.requestType === 'toolbarItemRendering') {
      const userIconItem: ItemModel = {
        align: 'Right',
        prefixIcon: 'user-icon',
        text: 'Nancy',
        cssClass: 'e-schedule-user-icon'
      };
      (args.items as ItemModel[]).push(userIconItem);
    }
  }
  
  onActionComplete(args: ActionEventArgs): void {
    const scheduleElement: HTMLElement = this.scheduleObj.element;
    
    if (args.requestType === 'toolBarItemRendered') {
      const userIconEle: HTMLElement = scheduleElement.querySelector('.e-schedule-user-icon') as HTMLElement;
      
      userIconEle.onclick = () => {
        if (this.profilePopup) {
          this.profilePopup.relateTo = userIconEle;
          this.profilePopup.dataBind();
          
          if (this.profilePopup.element.classList.contains('e-popup-close')) {
            this.profilePopup.show();
          } else {
            this.profilePopup.hide();
          }
        }
      };
      
      // Create popup content
      const userContentEle: HTMLElement = createElement('div', {
        className: 'e-profile-wrapper'
      });
      (scheduleElement.parentElement as HTMLElement).appendChild(userContentEle);
      
      const getDOMString = compile('<div class="profile-container">' +
        '<div class="profile-image"></div>' +
        '<div class="content-wrap">' +
        '<div class="name">Nancy</div>' +
        '<div class="destination">Product Manager</div>' +
        '<div class="status"><div class="status-icon"></div>Online</div>' +
        '</div></div>');
      const output = getDOMString({});
      
      this.profilePopup = new Popup(userContentEle, {
        content: output[0] as HTMLElement,
        relateTo: userIconEle,
        position: { X: 'left', Y: 'bottom' },
        collision: { X: 'flip', Y: 'flip' },
        targetType: 'relative',
        viewPortElement: scheduleElement,
        width: 185,
        height: 80
      });
      this.profilePopup.hide();
    }
  }
}
```

**Action Events for Header**:
- `toolbarItemRendering`: Modify items before rendering
- `toolBarItemRendered`: Access items after rendering

### Adaptive UI - Header Bar Popup

Move view options to a popup menu for compact layouts using `enableAdaptiveUI`:

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
      [selectedDate]='selectedDate'
      [eventSettings]='eventSettings'
      [enableAdaptiveUI]='true'>
    </ejs-schedule>
  `
})
export class AppComponent {
  public selectedDate: Date = new Date(2024, 0, 15);
  
  public eventSettings: EventSettingsModel = {
    dataSource: [] // Your event data
  };
}
```

**Adaptive UI Benefits**:
- Moves view switcher and create button to popup
- Optimizes header space for mobile devices
- Better UX on small screens

## Date Header Customization

### Using dateHeaderTemplate

Customize date header cells in Day, Week, and WorkWeek views:

```typescript
import { Component, ViewEncapsulation } from '@angular/core';
import { ScheduleModule, EventSettingsModel } from '@syncfusion/ej2-angular-schedule';
import { DayService, WeekService, TimelineViewsService, TimelineMonthService } from '@syncfusion/ej2-angular-schedule';
import { Internationalization } from '@syncfusion/ej2-base';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ScheduleModule],
  providers: [DayService, WeekService, TimelineViewsService, TimelineMonthService],
  template: `
    <ejs-schedule 
      width='100%' 
      height='550px'
      cssClass='schedule-date-header-template'
      [selectedDate]='selectedDate'
      [views]='views'
      [eventSettings]='eventSettings'>
      <ng-template #dateHeaderTemplate let-data>
        <div class="date-text">{{getDateHeaderText(data.date)}}</div>
        <div [innerHTML]="getWeather(data.date)"></div>
      </ng-template>
    </ejs-schedule>
  `,
  styles: [`
    .weather-text {
      padding: 5px;
      color: #e3165b;
      font-weight: 500;
    }
  `],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  public selectedDate: Date = new Date(2024, 0, 15);
  public views: string[] = ['Day', 'Week', 'TimelineWorkWeek', 'TimelineMonth'];
  
  public eventSettings: EventSettingsModel = {
    dataSource: [] // Your event data
  };
  
  private instance: Internationalization = new Internationalization();
  
  getDateHeaderText = (value: Date): string => {
    return this.instance.formatDate(value, { skeleton: 'Ed' });
  };
  
  getWeather = (value: Date): string => {
    const weatherMap: { [key: number]: string } = {
      0: '25°C', 1: '18°C', 2: '10°C', 3: '16°C',
      4: '8°C', 5: '27°C', 6: '17°C'
    };
    return `<div class="weather-text">${weatherMap[value.getDay()]}</div>`;
  };
}
```

**Template Context**:
- `data.date`: Current cell's date value
- Applies to Day, Week, WorkWeek, Timeline views
- Does NOT apply to Month view (use `renderCell` instead)

### Using renderCell for Month View

Customize month cell headers using `renderCell` event:

```typescript
import { Component, ViewEncapsulation } from '@angular/core';
import { ScheduleModule, EventSettingsModel, RenderCellEventArgs } from '@syncfusion/ej2-angular-schedule';
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
      cssClass='schedule-date-header-template'
      [selectedDate]='selectedDate'
      [views]='views'
      [eventSettings]='eventSettings'
      (renderCell)='onRenderCell($event)'>
    </ejs-schedule>
  `,
  styles: [`
    .weather-text {
      float: right;
      margin: -20px 2px 0 0;
      color: #EA7A57;
    }
  `],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  public selectedDate: Date = new Date(2024, 0, 15);
  public views: string[] = ['Month'];
  
  public eventSettings: EventSettingsModel = {
    dataSource: [] // Your event data
  };
  
  onRenderCell(args: RenderCellEventArgs): void {
    if (args.elementType === 'monthCells') {
      const ele: Element = document.createElement('div');
      ele.innerHTML = this.getWeather(args.date as Date);
      args.element.appendChild(ele.firstChild as Node);
    }
  }
  
  getWeather(value: Date): string {
    const weatherMap: { [key: number]: string } = {
      0: '25°C', 1: '18°C', 2: '10°C', 3: '16°C',
      4: '8°C', 5: '27°C', 6: '17°C'
    };
    return `<div class="weather-text">${weatherMap[value.getDay()]}</div>`;
  }
}
```

### Customize Date Range Text

Override the default date range display in the header using `dateRangeTemplate`:

```typescript
import { Component } from '@angular/core';
import { ScheduleModule } from '@syncfusion/ej2-angular-schedule';
import { DayService, WeekService, MonthService } from '@syncfusion/ej2-angular-schedule';
import { Internationalization } from '@syncfusion/ej2-base';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ScheduleModule],
  providers: [DayService, WeekService, MonthService],
  template: `
    <ejs-schedule 
      width='100%' 
      height='650px'>
      <ng-template #dateRangeTemplate let-data>
        <div class="date-text">
          {{getDateRange(data.startDate)}} - {{getDateRange(data.endDate)}}
        </div>
      </ng-template>
      <e-views>
        <e-view option="Day"></e-view>
        <e-view option="Week"></e-view>
        <e-view option="Month"></e-view>
      </e-views>
    </ejs-schedule>
  `
})
export class AppComponent {
  private instance: Internationalization = new Internationalization();
  
  getDateRange = (value: Date): string => {
    return this.instance.formatDate(value, { skeleton: 'MMMd' });
  };
}
```

**Template Context**:
- `data.startDate`: View's start date
- `data.endDate`: View's end date
- `data.currentView`: Current view name

## Header Rows (Timeline Views)

### Available Header Row Options

Timeline views support additional header rows for displaying year, month, week, date, and hour:

```typescript
import { Component } from '@angular/core';
import { ScheduleModule, EventSettingsModel } from '@syncfusion/ej2-angular-schedule';
import { TimelineViewsService } from '@syncfusion/ej2-angular-schedule';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ScheduleModule],
  providers: [TimelineViewsService],
  template: `
    <ejs-schedule 
      width='100%' 
      height='550px'
      [selectedDate]='selectedDate'
      [eventSettings]='eventSettings'
      startHour='09:00'
      endHour='18:00'>
      <e-header-rows>
        <e-header-row option='Year'></e-header-row>
        <e-header-row option='Month'></e-header-row>
        <e-header-row option='Week'></e-header-row>
        <e-header-row option='Date'></e-header-row>
        <e-header-row option='Hour'></e-header-row>
      </e-header-rows>
      <e-views>
        <e-view option='TimelineWeek'></e-view>
      </e-views>
    </ejs-schedule>
  `
})
export class AppComponent {
  public selectedDate: Date = new Date(2024, 11, 31);
  
  public eventSettings: EventSettingsModel = {
    dataSource: [] // Your event data
  };
}
```

**Header Row Options**:
- `'Year'` - Display year row
- `'Month'` - Display month row
- `'Week'` - Display week number row
- `'Date'` - Display date row
- `'Hour'` - Display hour row (not for TimelineMonth)

### Display Year and Month Only

Show only year and month header rows:

```typescript
<ejs-schedule 
  width='100%' 
  height='550px'
  [selectedDate]='selectedDate'
  [eventSettings]='eventSettings'>
  <e-header-rows>
    <e-header-row option='Year'></e-header-row>
    <e-header-row option='Month'></e-header-row>
  </e-header-rows>
  <e-views>
    <e-view option='TimelineMonth' [interval]="24"></e-view>
  </e-views>
</ejs-schedule>
```

### Display Week Numbers

Show week numbers in a separate header row:

```typescript
<ejs-schedule 
  width='100%' 
  height='550px'
  [selectedDate]='selectedDate'
  [eventSettings]='eventSettings'>
  <e-header-rows>
    <e-header-row option='Week'></e-header-row>
    <e-header-row option='Date'></e-header-row>
    <e-header-row option='Hour'></e-header-row>
  </e-header-rows>
  <e-views>
    <e-view option='TimelineWeek' [interval]="3"></e-view>
  </e-views>
</ejs-schedule>
```

### Full Year Timeline

Display a complete year in Timeline Month view:

```typescript
import { Component } from '@angular/core';
import { ScheduleModule, EventSettingsModel } from '@syncfusion/ej2-angular-schedule';
import { TimelineMonthService } from '@syncfusion/ej2-angular-schedule';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ScheduleModule],
  providers: [TimelineMonthService],
  template: `
    <ejs-schedule 
      width='100%' 
      height='550px'
      [selectedDate]='selectedDate'
      [eventSettings]='eventSettings'>
      <e-header-rows>
        <e-header-row option='Month'></e-header-row>
        <e-header-row option='Date'></e-header-row>
      </e-header-rows>
      <e-views>
        <e-view option='TimelineMonth' [interval]="12"></e-view>
      </e-views>
    </ejs-schedule>
  `
})
export class AppComponent {
  public selectedDate: Date = new Date(2024, 0, 1);
  
  public eventSettings: EventSettingsModel = {
    dataSource: [] // Your event data
  };
}
```

**Interval Property**:
- Set to `12` for full year display
- Set to `24` for two-year display
- Multiplies the default view range

### Custom Header Row Templates

Customize header row content with templates:

```typescript
import { Component } from '@angular/core';
import { ScheduleModule, EventSettingsModel, CellTemplateArgs } from '@syncfusion/ej2-angular-schedule';
import { TimelineMonthService, getWeekNumber, getWeekLastDate } from '@syncfusion/ej2-angular-schedule';
import { Internationalization } from '@syncfusion/ej2-base';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ScheduleModule],
  providers: [TimelineMonthService],
  template: `
    <ejs-schedule 
      width='100%' 
      height='550px'
      [selectedDate]='selectedDate'
      [eventSettings]='eventSettings'>
      <e-header-rows>
        <e-header-row option='Year'>
          <ng-template #template let-data>
            <span [innerHTML]="getYearDetails(data)"></span>
          </ng-template>
        </e-header-row>
        <e-header-row option='Month'>
          <ng-template #template let-data>
            <span [innerHTML]="getMonthDetails(data)"></span>
          </ng-template>
        </e-header-row>
        <e-header-row option='Week'>
          <ng-template #template let-data>
            <span [innerHTML]="getWeekDetails(data)"></span>
          </ng-template>
        </e-header-row>
        <e-header-row option='Date'></e-header-row>
      </e-header-rows>
      <e-views>
        <e-view option='TimelineMonth'></e-view>
      </e-views>
    </ejs-schedule>
  `
})
export class AppComponent {
  public selectedDate: Date = new Date(2024, 0, 1);
  private instance: Internationalization = new Internationalization();
  
  public eventSettings: EventSettingsModel = {
    dataSource: [] // Your event data
  };
  
  getYearDetails(value: CellTemplateArgs): string {
    return 'Year: ' + this.instance.formatDate(value.date as Date, { skeleton: 'y' });
  }
  
  getMonthDetails(value: CellTemplateArgs): string {
    return 'Month: ' + this.instance.formatDate(value.date as Date, { skeleton: 'yMMM' });
  }
  
  getWeekDetails(value: CellTemplateArgs): string {
    return 'Week: ' + getWeekNumber(getWeekLastDate(value.date as Date, 0));
  }
}
```

**Template Context**:
- `data.date`: Current header cell's date
- Use `Internationalization` for formatting
- Helper functions: `getWeekNumber`, `getWeekLastDate`

## Best Practices

1. **Header Bar Visibility**: Hide header bar (`showHeaderBar: false`) for embedded or kiosk scenarios
2. **Toolbar Customization**: Use `toolbarItems` for declarative approach, `actionBegin` for dynamic logic
3. **Adaptive UI**: Enable for mobile-responsive applications
4. **Date Header Templates**: Use for weather, holidays, or resource indicators
5. **Header Rows**: Limit to 3-4 rows to avoid visual clutter
6. **Full Year View**: Combine `interval: 12` with Year/Month header rows
7. **Performance**: Avoid heavy logic in template functions (called frequently)
8. **Internationalization**: Use `Internationalization` for locale-aware formatting
9. **Custom Alignment**: Place important actions on `Right`, filters in `Center`
10. **Popup Integration**: Use `actionComplete` to attach event handlers to custom items

## Common Scenarios

### Remove Create Button
Exclude `'NewEvent'` from `toolbarItems` to hide the create button.

### Resource Filter in Header
Add DropDownList as custom toolbar item to filter events by resource.

### Project Timeline (Year View)
Use `interval: 12`, Year/Month header rows for project planning interfaces.

### Weather Display
Use `dateHeaderTemplate` to show weather icons/temperatures fetched from API.

### Week-Based Planning
Show week numbers using `<e-header-row option='Week'>` for ISO week-based scheduling.
