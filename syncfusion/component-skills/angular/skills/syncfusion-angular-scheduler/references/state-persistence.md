# State Persistence

## Table of Contents
- [Enable State Persistence](#enable-state-persistence)
- [Requirements](#requirements)
- [Clear Persisted State](#clear-persisted-state)
- [Custom State Management](#custom-state-management)
- [Best Practices](#best-practices)

Save and restore the Scheduler state (current view, selected date, scroll position) across sessions using browser storage.

## Enable State Persistence

Set `enablePersistence` to automatically save Scheduler state to localStorage:

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
      id='schedule'
      width='100%' 
      height='550px'
      [selectedDate]='selectedDate'
      [eventSettings]='eventSettings'
      [enablePersistence]='true'>
    </ejs-schedule>
  `
})
export class AppComponent {
  public selectedDate: Date = new Date(2024, 0, 15);
  public eventSettings: EventSettingsModel = { dataSource: [] };
}
```

**Persisted Properties**:
- `currentView` - Active view (Day/Week/Month)
- `selectedDate` - Currently displayed date
- `scrollLeft` - Horizontal scroll position (Timeline views)
- `scrollTop` - Vertical scroll position

**Storage Key**: Component `id` + `_persistence` (e.g., `schedule_persistence`)

## Requirements

- **Component ID**: Must set `id` property for unique storage key
- **Browser Support**: localStorage must be available
- **Same Origin**: Works only within same domain/protocol

## Clear Persisted State

Remove saved state programmatically:

```typescript
import { Component, ViewChild, OnInit } from '@angular/core';
import { ScheduleComponent } from '@syncfusion/ej2-angular-schedule';

@Component({
  selector: 'app-root',
  template: `
    <button (click)="clearState()">Clear Saved State</button>
    <ejs-schedule 
      #schedule
      id='schedule'
      [enablePersistence]='true'>
    </ejs-schedule>
  `
})
export class AppComponent implements OnInit {
  @ViewChild('schedule') public scheduleObj!: ScheduleComponent;
  
  ngOnInit() {
    // Clear state on component init if needed
    // localStorage.removeItem('schedule_persistence');
  }
  
  clearState(): void {
    localStorage.removeItem('schedule_persistence');
    location.reload(); // Reload to apply default state
  }
}
```

## Custom State Management

Implement custom persistence logic:

```typescript
import { Component, ViewChild, OnDestroy } from '@angular/core';
import { ScheduleComponent, EventSettingsModel } from '@syncfusion/ej2-angular-schedule';

@Component({
  selector: 'app-root',
  template: `
    <ejs-schedule 
      #schedule
      id='schedule'
      [(currentView)]='currentView'
      [(selectedDate)]='selectedDate'
      [eventSettings]='eventSettings'>
    </ejs-schedule>
  `
})
export class AppComponent implements OnDestroy {
  @ViewChild('schedule') public scheduleObj!: ScheduleComponent;
  
  public currentView: any = this.loadState('currentView', 'Week');
  public selectedDate: Date = new Date(this.loadState('selectedDate', new Date().toISOString()));
  public eventSettings: EventSettingsModel = { dataSource: [] };
  
  loadState(key: string, defaultValue: any): any {
    const saved = sessionStorage.getItem(`schedule_${key}`);
    return saved ? JSON.parse(saved) : defaultValue;
  }
  
  ngOnDestroy() {
    // Save state before component destruction
    sessionStorage.setItem('schedule_currentView', JSON.stringify(this.currentView));
    sessionStorage.setItem('schedule_selectedDate', JSON.stringify(this.selectedDate));
  }
}
```

## Best Practices

1. **Unique IDs**: Ensure unique component IDs when using multiple Schedulers
2. **Privacy**: Use `sessionStorage` for sensitive applications
3. **Versioning**: Include version number in storage key for breaking changes
4. **Migration**: Provide migration logic when persisted structure changes
5. **Validation**: Validate loaded state before applying
6. **Fallback**: Always provide default values if persistence fails
7. **Testing**: Test with disabled localStorage (private browsing)
8. **Storage Limits**: localStorage has ~5-10MB limit per domain
9. **Clear on Logout**: Remove persisted state on user logout
10. **Documentation**: Inform users about state persistence behavior
