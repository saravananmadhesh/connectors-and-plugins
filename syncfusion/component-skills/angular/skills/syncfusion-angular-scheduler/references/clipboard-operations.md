# Clipboard Operations

## Table of Contents
- [Enable Clipboard Functionality](#enable-clipboard-functionality)
- [Keyboard Shortcuts](#keyboard-shortcuts)
- [Programmatic Methods](#programmatic-methods)
- [copy Method](#copy-method)
- [cut Method](#cut-method)
- [paste Method](#paste-method)
- [Context Menu Integration](#context-menu-integration)
- [Modify Content Before Pasting](#modify-content-before-pasting)
- [Best Practices](#best-practices)
- [Common Scenarios](#common-scenarios)
- [Disable Paste for Specific Times](#disable-paste-for-specific-times)
- [Copy from Grid to Scheduler](#copy-from-grid-to-scheduler)
- [Duplicate with Time Offset](#duplicate-with-time-offset)
- [Add Metadata on Copy](#add-metadata-on-copy)
- [Restrict Cut Permission](#restrict-cut-permission)

Enable users to cut, copy, and paste appointments using keyboard shortcuts or programmatic methods for efficient schedule management.

## Enable Clipboard Functionality

Activate clipboard features by setting the `allowClipboard` property to `true`:

```typescript
import { Component } from '@angular/core';
import { ScheduleModule, EventSettingsModel } from '@syncfusion/ej2-angular-schedule';
import { DayService, WeekService, MonthService } from '@syncfusion/ej2-angular-schedule';
import { extend } from '@syncfusion/ej2-base';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ScheduleModule],
  providers: [DayService, WeekService, MonthService],
  template: `
    <ejs-schedule 
      height='550px'
      [selectedDate]='selectedDate'
      [eventSettings]='eventSettings'
      [allowClipboard]='true'
      [showQuickInfo]='false'>
    </ejs-schedule>
  `
})
export class AppComponent {
  public selectedDate: Date = new Date(2024, 0, 15);
  
  public eventSettings: EventSettingsModel = {
    dataSource: extend([], [], undefined, true) as Record<string, any>[]
  };
}
```

**Prerequisites**:
- `allowKeyboardInteraction` must be `true` (default)
- Optionally disable `showQuickInfo` for cleaner UX

## Keyboard Shortcuts

| Operation | Windows/Linux | Mac   | Description                                    |
|-----------|---------------|-------|------------------------------------------------|
| Copy      | Ctrl+C        | Cmd+C | Duplicate appointment to clipboard             |
| Cut       | Ctrl+X        | Cmd+X | Move appointment to clipboard (removes from current slot) |
| Paste     | Ctrl+V        | Cmd+V | Insert copied/cut appointment into selected slot |

**Usage Flow**:
1. Click an appointment to select it
2. Press **Ctrl+C** (copy) or **Ctrl+X** (cut)
3. Click a target time slot
4. Press **Ctrl+V** to paste

## Programmatic Methods

### copy Method

Duplicate the selected appointment to clipboard:

```typescript
copy(appointments?: Record<string, any>[] | Record<string, any>): void
```

### cut Method

Remove the selected appointment and move to clipboard:

```typescript
cut(appointments?: Record<string, any>[] | Record<string, any>): void
```

### paste Method

Insert clipboard content into a target cell:

```typescript
paste(targetElement: HTMLElement): void
```

**Parameters**:
- `appointments`: Appointment object(s) to copy/cut (optional, uses selection if omitted)
- `targetElement`: Scheduler work cell where appointment will be pasted

## Context Menu Integration

Implement clipboard operations via context menu:

```typescript
import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { ScheduleComponent, ScheduleModule, EventSettingsModel } from '@syncfusion/ej2-angular-schedule';
import { DayService, WeekService, MonthService } from '@syncfusion/ej2-angular-schedule';
import { ContextMenuComponent, ContextMenuModule, MenuItemModel, BeforeOpenCloseMenuEventArgs, MenuEventArgs } from '@syncfusion/ej2-angular-navigations';
import { closest, isNullOrUndefined, remove, extend } from '@syncfusion/ej2-base';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ScheduleModule, ContextMenuModule],
  providers: [DayService, WeekService, MonthService],
  template: `
    <ejs-schedule 
      #scheduleObj
      height='550px'
      [selectedDate]='selectedDate'
      [allowClipboard]='true'
      [showQuickInfo]='false'
      [eventSettings]='eventSettings'>
    </ejs-schedule>
    
    <ejs-contextmenu 
      #menuObj
      cssClass='schedule-context-menu'
      target='.e-schedule'
      [items]='menuItems'
      (beforeOpen)='onContextMenuBeforeOpen($event)'
      (select)='onMenuItemSelect($event)'>
    </ejs-contextmenu>
  `,
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  @ViewChild('scheduleObj') public scheduleObj!: ScheduleComponent;
  @ViewChild('menuObj') public menuObj!: ContextMenuComponent;
  
  public selectedDate: Date = new Date(2024, 0, 15);
  public selectedTarget!: Element;
  public targetElement!: HTMLElement;
  
  public eventSettings: EventSettingsModel = {
    dataSource: extend([], [], undefined, true) as Record<string, any>[]
  };
  
  public menuItems: MenuItemModel[] = [
    { text: 'Cut Event', iconCss: 'e-icons e-cut', id: 'Cut' },
    { text: 'Copy Event', iconCss: 'e-icons e-copy', id: 'Copy' },
    { text: 'Paste', iconCss: 'e-icons e-paste', id: 'Paste' }
  ];
  
  onContextMenuBeforeOpen(args: BeforeOpenCloseMenuEventArgs): void {
    const newEventElement: HTMLElement = document.querySelector('.e-new-event') as HTMLElement;
    if (newEventElement) {
      remove(newEventElement);
    }
    this.scheduleObj.closeQuickInfoPopup();
    this.targetElement = args.event.target as HTMLElement;
    
    if (closest(this.targetElement, '.e-contextmenu')) {
      return;
    }
    
    this.selectedTarget = closest(this.targetElement, '.e-appointment,.e-work-cells,' +
      '.e-vertical-view .e-date-header-wrap .e-all-day-cells,.e-vertical-view .e-date-header-wrap .e-header-cells') as Element;
    
    if (isNullOrUndefined(this.selectedTarget)) {
      args.cancel = true;
      return;
    }
    
    if (this.selectedTarget.classList.contains('e-appointment')) {
      this.menuObj.showItems(['Cut', 'Copy'], true);
      this.menuObj.hideItems(['Paste'], true);
    } else {
      this.menuObj.showItems(['Paste'], true);
      this.menuObj.hideItems(['Cut', 'Copy'], true);
    }
  }
  
  onMenuItemSelect(args: MenuEventArgs): void {
    const selectedMenuItem: string = args.item.id as string;
    switch (selectedMenuItem) {
      case 'Cut':
        this.scheduleObj.cut([this.selectedTarget] as HTMLElement[]);
        break;
      case 'Copy':
        this.scheduleObj.copy([this.selectedTarget] as HTMLElement[]);
        break;
      case 'Paste':
        this.scheduleObj.paste(this.targetElement);
        break;
    }
  }
}
```

**Context Menu Logic**:
- Show Cut/Copy when right-clicking appointment
- Show Paste when right-clicking empty cell
- Hide irrelevant options dynamically

## Modify Content Before Pasting

Intercept and modify appointment data before pasting using `beforePaste` event:

```typescript
import { Component } from '@angular/core';
import { ScheduleModule, EventSettingsModel, BeforePasteEventArgs } from '@syncfusion/ej2-angular-schedule';
import { DayService, WeekService, MonthService } from '@syncfusion/ej2-angular-schedule';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [ScheduleModule],
  providers: [DayService, WeekService, MonthService],
  template: `
    <ejs-schedule 
      height='550px'
      [selectedDate]='selectedDate'
      [eventSettings]='eventSettings'
      [allowClipboard]='true'
      [showQuickInfo]='false'
      (beforePaste)='onBeforePaste($event)'>
    </ejs-schedule>
  `
})
export class AppComponent {
  public selectedDate: Date = new Date(2024, 0, 15);
  
  public eventSettings: EventSettingsModel = {
    dataSource: []
  };
  
  onBeforePaste(args: BeforePasteEventArgs): void {
    // Modify appointment data before pasting
    if (args.data) {
      const data = args.data as any[];
      data.forEach((appointment: any) => {
        // Add custom modifications
        appointment.Description = appointment.Description + ' (Copied)';
        appointment.Location = appointment.Location || 'Default Location';
        
        // Adjust time by 1 hour
        appointment.StartTime = new Date(appointment.StartTime.getTime() + 60 * 60 * 1000);
        appointment.EndTime = new Date(appointment.EndTime.getTime() + 60 * 60 * 1000);
      });
    }
  }
}
```

**beforePaste Event Args**:
- `data`: Array of appointment objects being pasted
- `cancel`: Set to `true` to prevent paste operation
- Modify `data` directly to change appointment properties

## Best Practices

1. **Keyboard Focus**: Ensure `allowKeyboardInteraction: true` for shortcuts
2. **Context Menu**: Provide visual clipboard operations for discoverability
3. **beforePaste**: Validate and sanitize data before pasting
4. **Quick Info**: Disable (`showQuickInfo: false`) to avoid popup conflicts
5. **Field Mapping**: Ensure pasted data matches `eventSettings.fields` structure
6. **Time Validation**: Check for conflicts in `beforePaste` event
7. **User Feedback**: Show toast notifications after successful clipboard operations
8. **Multi-Selection**: Use array parameter in `copy`/`cut` for batch operations
9. **Cancel Paste**: Set `args.cancel = true` in `beforePaste` to prevent invalid pastes
10. **Cross-Application**: Use `beforePaste` to transform external data (e.g., from Grid)

## Common Scenarios

### Disable Paste for Specific Times
Check target cell time in `beforePaste` and cancel if outside business hours.

### Copy from Grid to Scheduler
Map grid columns to scheduler fields in `beforePaste` event.

### Duplicate with Time Offset
Add 1 hour to start/end times when pasting to avoid overlap.

### Add Metadata on Copy
Append "Copy of" to subject or add creation timestamp.

### Restrict Cut Permission
Check user role before allowing `cut` operation via context menu logic.
