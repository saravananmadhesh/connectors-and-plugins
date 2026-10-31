# Context Menu

## Table of Contents
1. [Enable Context Menu](#enable-context-menu)
2. [Default Menu Items](#default-menu-items)
3. [Custom Menu Items](#custom-menu-items)
4. [Menu Item Selection](#menu-item-selection)
5. [Conditional Display](#conditional-display)

## Enable Context Menu

Display context menu on right-click:

```cshtml
@using Syncfusion.EJ2.Schedule

@(Html.EJS().Schedule("schedule")
    .Width("100%")
    .Height("650px")
    .EventSettings(new ScheduleEventSettings { DataSource = ViewBag.datasource })
    .SelectedDate(new DateTime(2018, 2, 15))
    .AllowDragAndDrop(false)
    .AllowResizing(false)
    .Render()
)

@(Html.EJS().ContextMenu("contextmenu")
    .CssClass("schedule-context-menu")
    .BeforeOpen("onContextMenuBeforeOpen")
    .Select("onMenuItemSelect")
    .Target(".e-schedule")
    .Items(ViewBag.menuItems)
    .Render()
)
```

## Default Menu Items

Built-in menu options:

| Item | Context | Description |
|------|---------|-------------|
| New | Empty cell | Create new appointment |
| Cut | Appointment | Cut appointment |
| Copy | Appointment | Copy appointment |
| Paste | Cell | Paste appointment |
| Edit | Appointment | Edit appointment details |
| Delete | Appointment | Remove appointment |
| Save | Editor | Save changes |
| Cancel | Editor | Cancel editing |

### Enable All Defaults
```cshtml
.ContextMenuItems(new string[] { "New", "Edit", "Delete", "Copy" })
```

## Custom Menu Items

Add custom menu options:

```cshtml
@Html.EJS().Schedule("schedule")
    .ContextMenuItems(new ContextMenuItemModel[] {
        new ContextMenuItemModel { Text = "New Event", IconCss = "e-icons e-plus" },
        new ContextMenuItemModel { Text = "New Recurring", IconCss = "e-icons e-repeat" },
        new ContextMenuItemModel { Text = "Duplicate", IconCss = "e-icons e-copy" },
        new ContextMenuItemModel { Text = "Mark as Done", IconCss = "e-icons e-checkmark" },
        new ContextMenuItemModel { Text = "Delete", IconCss = "e-icons e-delete" }
    })
    .ContextMenuItemClick("onContextMenuClick")
    .Render()
```

## Menu Item Selection

Handle menu selection:

```javascript
function onMenuItemSelect(args) {
    var scheduleObj = document.querySelector(".e-schedule").ej2_instances[0];
    var selectedMenuItem = args.item.id;
    var eventObj;
    if (selectedTarget.classList.contains('e-appointment')) {
        eventObj = scheduleObj.getEventDetails(selectedTarget);
    }
    switch (selectedMenuItem) {
        case 'Today':
            scheduleObj.selectedDate = new Date();
            break;
        case 'Add':
            var selectedCells = scheduleObj.getSelectedElements();
            var activeCellsData = scheduleObj.getCellDetails(selectedCells.length > 0 ? selectedCells : selectedTarget);
            scheduleObj.openEditor(activeCellsData, 'Add');
            break;
        case 'Delete':
            scheduleObj.deleteEvent(eventObj);
            break;
    }
}
```

## Conditional Display

Show/hide menu items based on context:

```javascript
function onContextMenuBeforeOpen(args) {
    var scheduleObj = document.querySelector(".e-schedule").ej2_instances[0];
    scheduleObj.closeQuickInfoPopup();
    var targetElement = args.event.target;
    
    if (ej.base.closest(targetElement, '.e-contextmenu')) {
        return;
    }
    
    selectedTarget = ej.base.closest(targetElement, '.e-appointment,.e-work-cells');
    if (ej.base.isNullOrUndefined(selectedTarget)) {
        args.cancel = true;
        return;
    }
    
    if (selectedTarget.classList.contains('e-appointment')) {
        var eventObj = scheduleObj.getEventDetails(selectedTarget);
        if (eventObj.RecurrenceRule) {
            this.showItems(['EditRecurrenceEvent', 'DeleteRecurrenceEvent'], true);
            this.hideItems(['Add', 'Today', 'Save', 'Delete'], true);
        } else {
            this.showItems(['Save', 'Delete'], true);
            this.hideItems(['Add', 'Today', 'EditRecurrenceEvent', 'DeleteRecurrenceEvent'], true);
        }
        return;
    }
    this.hideItems(['Save', 'Delete', 'EditRecurrenceEvent', 'DeleteRecurrenceEvent'], true);
    this.showItems(['Add', 'Today'], true);
}
```
