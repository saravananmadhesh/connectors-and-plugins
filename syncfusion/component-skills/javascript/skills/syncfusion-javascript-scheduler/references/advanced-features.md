# Advanced Features Reference

## Table of contents

- [Virtual Scrolling](#virtual-scrolling)
    - [`allowVirtualScrolling` (View-level Property)](#allowvirtualscrolling-view-level-property)
- [Row Auto Height](#row-auto-height)
- [State Persistence](#state-persistence)
- [Context Menu Integration](#context-menu-integration)
- [Scheduler Interactions Reference](#scheduler-interactions-reference)
- [`openEditor()` Method](#openeditor-method)
- [`getEventDetails()` Method](#geteventdetails-method)
- [Quick Reference: Advanced Properties](#quick-reference-advanced-properties)

## Virtual Scrolling

Enable virtual scrolling for timeline views with many resources. Resources and events load on demand as the user scrolls.

### `allowVirtualScrolling` (View-level Property)

Set `allowVirtualScrolling: true` inside the view configuration object:

```ts
import { Schedule, TimelineViews, TimelineMonth, TimelineYear, Resize, DragAndDrop } from '@syncfusion/ej2-schedule';

Schedule.Inject(TimelineViews, TimelineMonth, TimelineYear, Resize, DragAndDrop);

let scheduleObj: Schedule = new Schedule({
    height: '550px',
    width: '100%',
    currentView: 'TimelineMonth',
    views: [
        { option: 'TimelineMonth', allowVirtualScrolling: true },
        { option: 'TimelineYear', orientation: 'Vertical', allowVirtualScrolling: true }
    ],
    group: {
        byGroupID: false,
        resources: ['Owners']
    },
    resources: [
        {
            field: 'OwnerId', title: 'Owner',
            name: 'Owners', allowMultiple: true,
            dataSource: ownerData,
            textField: 'Text', idField: 'Id', colorField: 'Color'
        }
    ],
    selectedDate: new Date(2018, 4, 1),
    eventSettings: { dataSource: eventData }
});
scheduleObj.appendTo('#Schedule');
```

> Virtual scrolling is supported on Timeline views and Agenda view. Set `allowVirtualScrolling: true` in the Agenda view configuration to enable lazy loading of events in the Agenda view.

---

## Row Auto Height

### `rowAutoHeight` Property

Automatically adjust row height based on the number of overlapping appointments instead of showing a `+n more` indicator. Default is `false`. Applicable to **Timeline views** and **Month view** only.

```ts
import { Schedule, Month } from '@syncfusion/ej2-schedule';

Schedule.Inject(Month);

let scheduleObj: Schedule = new Schedule({
    width: '100%',
    height: '450px',
    selectedDate: new Date(2018, 1, 15),
    currentView: 'Month',
    rowAutoHeight: true,
    views: ['Month'],
    eventSettings: { dataSource: scheduleData }
});
scheduleObj.appendTo('#Schedule');
```

---

## State Persistence

### `enablePersistence` Property

Persist the `currentView`, `selectedDate`, and scroll position in `localStorage` across page refreshes. Default is `false`.

> The Scheduler `id` attribute is required when enabling state persistence.

```ts
import { Schedule, Day, Week, WorkWeek, Month } from '@syncfusion/ej2-schedule';

Schedule.Inject(Day, Week, WorkWeek, Month);

let scheduleObj: Schedule = new Schedule({
    width: '100%',
    height: '450px',
    selectedDate: new Date(2018, 1, 15),
    currentView: 'Month',
    enablePersistence: true,
    views: ['Day', 'Week', 'WorkWeek', 'Month'],
    eventSettings: { dataSource: scheduleData }
});
scheduleObj.appendTo('#Schedule');   // ensure the target element has an id="Schedule"
```

---

## Context Menu Integration

The Scheduler does not have a built-in context menu. Integrate the EJ2 `ContextMenu` component externally, targeting the `.e-schedule` element.

### Key Scheduler Methods Used with Context Menu

| Method | Description |
|---|---|
| `openEditor(data, action)` | Opens the event editor window. `action` can be `'Add'` or `'Edit'`. |
| `deleteEvent(id/data, type)` | Deletes an event. |
| `getEventDetails(element)` | Returns the event data object from an appointment DOM element. |
| `closeQuickInfoPopup()` | Closes the quick info popup if open. |

```ts
import { closest, isNullOrUndefined, removeClass, remove } from '@syncfusion/ej2-base';
import { Schedule, Day, Week, WorkWeek, Month, Agenda, CellClickEventArgs } from '@syncfusion/ej2-schedule';
import { ContextMenu, MenuItemModel, BeforeOpenCloseMenuEventArgs, MenuEventArgs } from '@syncfusion/ej2-navigations';

Schedule.Inject(Day, Week, WorkWeek, Month, Agenda);

let scheduleObj: Schedule = new Schedule({
    width: '100%',
    height: '550px',
    selectedDate: new Date(2018, 1, 15),
    eventSettings: { dataSource: scheduleData }
});
scheduleObj.appendTo('#Schedule');

let selectedTarget: Element;
let menuItems: MenuItemModel[] = [
    { text: 'New Event', iconCss: 'e-icons new', id: 'Add' },
    { text: 'New Recurring Event', iconCss: 'e-icons recurrence', id: 'AddRecurrence' },
    { text: 'Today', iconCss: 'e-icons today', id: 'Today' },
    { text: 'Edit Event', iconCss: 'e-icons edit', id: 'Save' },
    { text: 'Delete Event', iconCss: 'e-icons delete', id: 'Delete' }
];

let menuObj: ContextMenu = new ContextMenu({
    target: '.e-schedule',
    items: menuItems,
    beforeOpen: onContextMenuBeforeOpen,
    select: onMenuItemSelect,
    cssClass: 'schedule-context-menu'
});
menuObj.appendTo('#ContextMenu');

function onContextMenuBeforeOpen(args: BeforeOpenCloseMenuEventArgs): void {
    scheduleObj.closeQuickInfoPopup();
    let targetElement: HTMLElement = <HTMLElement>args.event.target;
    selectedTarget = closest(targetElement, '.e-appointment,.e-work-cells');
    if (isNullOrUndefined(selectedTarget)) {
        args.cancel = true;
    }
}

function onMenuItemSelect(args: MenuEventArgs): void {
    let selectedMenuItem: string = args.item.id;
    // Handle menu actions based on selectedMenuItem
}
```

---

## Scheduler Interactions Reference

Source: `docs/scheduler-interactions.md`

| Action | Mouse | Touch |
|---|---|---|
| Single cell click | Select cell | Show `+` icon; tap again to open editor |
| Multiple cell selection | Click and drag | Not supported via touch |
| Event selection | Single click | Tap-hold to select and show popup |
| Multiple event selection | `Ctrl` + click events | Tap-hold first, then single tap others |
| Date navigation | Click Previous/Next icons | Swipe left/right (disable via `allowSwiping: false`) |
| Drag and drop | Click and drag event | Tap-hold then drag |
| Event resize | Hover edges then drag | Touch event edge and drag |
| Open editor | Double-click cell or event | Double-click, or tap `+` icon on cell |
| Quick info popup | Single click cell/event | Single tap event (not cell) |

### `allowSwiping` Property

Prevent swipe navigation on touch devices:

```ts
let scheduleObj: Schedule = new Schedule({
    allowSwiping: false,
    eventSettings: { dataSource: scheduleData }
});
```

---

## `openEditor()` Method

Open the Scheduler editor window programmatically.

```ts
// Open editor in Add mode for a cell
scheduleObj.openEditor(cellData, 'Add');

// Open editor in Edit mode for an existing event
scheduleObj.openEditor(eventData, 'Edit');
```

---

## `getEventDetails()` Method

Retrieve the event data object from an appointment HTML element.

```ts
let eventObj: { [key: string]: Object } = <{ [key: string]: Object }>scheduleObj.getEventDetails(appointmentElement);
```

---

## Quick Reference: Advanced Properties

| Property | Type | Default | Description |
|---|---|---|---|
| `rowAutoHeight` | boolean | `false` | Auto-adjust row height for overlapping events |
| `enablePersistence` | boolean | `false` | Persist state in localStorage |
| `allowSwiping` | boolean | `true` | Allow swipe navigation on touch |
| `allowMultiCellSelection` | boolean | `true` | Allow selecting multiple cells |
| `allowMultiRowSelection` | boolean | `true` | Allow selecting multiple rows |
| `views[].allowVirtualScrolling` | boolean | `false` | Enable virtual scrolling per view |
