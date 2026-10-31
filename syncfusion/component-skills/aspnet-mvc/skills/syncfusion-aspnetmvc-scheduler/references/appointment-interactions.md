# Appointment Interactions

This guide covers interactive appointment features including drag-and-drop, resizing, inline editing, and preventing overlaps.

## Table of Contents
- [Drag and Drop](#drag-and-drop)
- [Multi-Appointment Drag](#multi-appointment-drag)
- [Drag Configuration](#drag-configuration)
- [Appointment Resizing](#appointment-resizing)
- [Resize Configuration](#resize-configuration)
- [External Drag Sources](#external-drag-sources)
- [Preventing Overlaps](#preventing-overlaps)
- [Blocking Time Slots](#blocking-time-slots)
- [Read-Only Appointments](#read-only-appointments)

## Drag and Drop

Enable rescheduling appointments by dragging them to new time slots.

### Basic Drag and Drop

```cshtml
@Html.EJS().Schedule("scheduler")
    .AllowDragAndDrop(true)  // Enabled by default
    .EventSettings(e => e.DataSource(Model))
    .Render()
```

**Supported Views:** Day, Week, Work Week, Month, Timeline views (not Agenda, Month-Agenda, Year)

**Mobile Support:** Tap and hold appointment, then drag to new location.

### Disabling Drag and Drop

```cshtml
@Html.EJS().Schedule("scheduler")
    .AllowDragAndDrop(false)  // Disable drag-drop
    .EventSettings(e => e.DataSource(Model))
    .Render()
```

## Multi-Appointment Drag

Select and drag multiple appointments simultaneously.

```cshtml
@Html.EJS().Schedule("scheduler")
    .AllowDragAndDrop(true)
    .AllowMultiDrag(true)  // Enable multi-appointment drag
    .EventSettings(e => e.DataSource(Model))
    .Render()
```

**Usage:**
1. Hold `Ctrl` key
2. Click multiple appointments to select
3. Release `Ctrl` key
4. Drag any selected appointment
5. All selected appointments move together

**Cross-Resource Drag:** When dragging multiple appointments from different resources, all move to the target resource.

**Note:** Multi-drag not supported on mobile devices.

## Drag Configuration

### Preventing Drag on Specific Targets

Exclude specific areas from drag operations:

```cshtml
@Html.EJS().Schedule("scheduler")
    .DragStart("onDragStart")
    .EventSettings(e => e.DataSource(Model))
    .Render()

<script>
    function onDragStart(args) {
        // Prevent dragging to all-day row
        args.excludeSelectors = '.e-all-day-cells';
    }
</script>
```

### Disabling Scroll During Drag

Prevent automatic scrolling when dragging to edges:

```cshtml
<script>
    function onDragStart(args) {
        args.scroll = { enable: false };  // Disable scroll
    }
</script>
```

### Controlling Scroll Speed

```cshtml
<script>
    function onDragStart(args) {
        args.scroll = {
            enable: true,
            scrollBy: 20,      // Pixels to scroll (default: 30)
            timeDelay: 50      // Milliseconds delay (default: 100)
        };
    }
</script>
```

### Auto-Navigation on Drag

Enable date range navigation when dragging to edges:

```cshtml
<script>
    function onDragStart(args) {
        args.navigation = {
            enable: true,      // Enable auto-navigation
            timeDelay: 1500    // Hold time in ms (default: 2000)
        };
    }
</script>
```

**Behavior:** Hold appointment at left/right edge for specified time → Scheduler navigates to previous/next date range.

### Setting Drag Interval

Control time increment during drag:

```cshtml
<script>
    function onDragStart(args) {
        args.interval = 15;  // Drag in 15-minute increments (default: 30)
    }
</script>
```

## Appointment Resizing

Adjust appointment duration by dragging its top or bottom handles.

### Basic Resizing

```cshtml
@Html.EJS().Schedule("scheduler")
    .AllowResizing(true)  // Enabled by default
    .EventSettings(e => e.DataSource(Model))
    .Render()
```

**Supported Views:** Day, Week, Work Week, Month, Timeline views (not Agenda, Month-Agenda)

### Disabling Resize

```cshtml
@Html.EJS().Schedule("scheduler")
    .AllowResizing(false)
    .EventSettings(e => e.DataSource(Model))
    .Render()
```

## Resize Configuration

### Disabling Scroll During Resize

```cshtml
@Html.EJS().Schedule("scheduler")
    .ResizeStart("onResizeStart")
    .EventSettings(e => e.DataSource(Model))
    .Render()

<script>
    function onResizeStart(args) {
        args.scroll = { enable: false };
    }
</script>
```

### Controlling Resize Scroll Speed

```cshtml
<script>
    function onResizeStart(args) {
        args.scroll = {
            enable: true,
            scrollBy: 25,
            timeDelay: 60
        };
    }
</script>
```

### Setting Resize Interval

```cshtml
<script>
    function onResizeStart(args) {
        args.interval = 10;  // Resize in 10-minute increments (default: 30)
    }
</script>
```

## External Drag Sources

Drag items from external sources (TreeView, ListView, etc.) into Scheduler.

### Drag from TreeView

```cshtml
@* TreeView with meeting types *@
@Html.EJS().TreeView("treeview")
    .Fields(new TreeViewFieldsSettings { DataSource = ViewBag.MeetingTypes, Id = "Id", Text = "Text" })
    .AllowDragAndDrop(true)
    .NodeDragStop("onTreeDragStop")
    .Render()

@Html.EJS().Schedule("scheduler")
    .EventSettings(e => e.DataSource(Model))
    .Render()

<script>
    function onTreeDragStop(args) {
        if (args.target.classList.contains('e-work-cells') || 
            args.target.classList.contains('e-all-day-cells')) {
            
            var scheduleObj = document.getElementById('scheduler').ej2_instances[0];
            var cellData = scheduleObj.getCellDetails(args.target);
            
            // Create new appointment from dragged item
            var eventData = {
                Subject: args.draggedNodeData.text,
                StartTime: cellData.startTime,
                EndTime: cellData.endTime,
                IsAllDay: cellData.isAllDay
            };
            
            scheduleObj.addEvent(eventData);
        }
    }
</script>
```

### Opening Editor on Drag Stop

Show editor dialog after dragging appointment:

```cshtml
@Html.EJS().Schedule("scheduler")
    .DragStop("onDragStop")
    .EventSettings(e => e.DataSource(Model))
    .Render()

<script>
    function onDragStop(args) {
        args.cancel = true;  // Cancel auto-save
        
        var scheduleObj = document.getElementById('scheduler').ej2_instances[0];
        scheduleObj.openEditor(args.data, 'Save');  // Open editor with dragged data
    }
</script>
```

## Preventing Overlaps

Prevent overlapping appointments with `allowOverlap` property.

### Basic Overlap Prevention

```cshtml
@Html.EJS().Schedule("scheduler")
    .AllowOverlap(false)  // Prevent overlaps (default: true)
    .EventSettings(e => e.DataSource(Model))
    .Render()
```

**Behavior:**
- **Initial Load:** Prioritizes longer duration and all-day events when conflicts exist
- **Recurring Events:** Shows all except conflicting occurrences
- **User Actions:** Blocks creation/editing if overlap detected, shows alert
- **Dynamic Series:** Prevents series creation if internal conflicts found

### Overlap Alert Customization

```cshtml
@Html.EJS().Schedule("scheduler")
    .AllowOverlap(false)
    .PopupOpen("onPopupOpen")
    .EventSettings(e => e.DataSource(Model))
    .Render()

<script>
    function onPopupOpen(args) {
        if (args.type === 'QuickInfo' && args.data.overlapEvents) {
            console.log('Overlapping events:', args.data.overlapEvents);
            // Customize alert message
        }
    }
</script>
```

### Advanced Overlap Check

Check overlaps beyond visible date range:

```cshtml
@Html.EJS().Schedule("scheduler")
    .AllowOverlap(false)
    .ActionBegin("onActionBegin")
    .EventSettings(e => e.DataSource(Model))
    .Render()

<script>
    function onActionBegin(args) {
        if (args.requestType === 'eventCreate' || args.requestType === 'eventChange') {
            var scheduleObj = document.getElementById('scheduler').ej2_instances[0];
            
            // Custom validation: check ALL appointments
            args.promise = new Promise((resolve, reject) => {
                $.ajax({
                    url: '/Schedule/CheckOverlap',
                    type: 'POST',
                    data: JSON.stringify(args.data),
                    contentType: 'application/json',
                    success: function(hasOverlap) {
                        if (hasOverlap) {
                            scheduleObj.openOverlapAlert();  // Show alert
                            reject();
                        } else {
                            resolve();
                        }
                    }
                });
            });
        }
    }
</script>
```

### Limiting Overlaps

Allow limited overlaps (e.g., max 2 appointments per slot):

```cshtml
<script>
    function onActionBegin(args) {
        if (args.requestType === 'eventCreate') {
            var scheduleObj = document.getElementById('scheduler').ej2_instances[0];
            var eventData = args.data[0];
            
            // Get events in same time slot
            var events = scheduleObj.getEvents(eventData.StartTime, eventData.EndTime);
            
            if (events.length >= 2) {  // Max 2 appointments
                args.cancel = true;
                alert('Maximum 2 appointments allowed in this time slot.');
            }
        }
    }
</script>
```

## Blocking Time Slots

Prevent appointment creation on specific times using `IsBlock` field.

### Single Block Event

```csharp
// Controller
appData.Add(new AppointmentData
{
    Id = 100,
    Subject = "Lunch Break",
    StartTime = new DateTime(2026, 4, 10, 12, 0, 0),
    EndTime = new DateTime(2026, 4, 10, 13, 0, 0),
    IsBlock = true  // Blocks this time range
});
```

**Effect:** Users cannot create, drag, or resize appointments into blocked time slots.

### Recurring Block Events

```csharp
appData.Add(new AppointmentData
{
    Id = 101,
    Subject = "Maintenance Window",
    StartTime = new DateTime(2026, 4, 8, 2, 0, 0),
    EndTime = new DateTime(2026, 4, 8, 4, 0, 0),
    IsBlock = true,
    RecurrenceRule = "FREQ=WEEKLY;BYDAY=SU"  // Block every Sunday 2-4 AM
});
```

### Styling Block Events

```css
.e-schedule .e-block-appointment {
    background-color: #f5f5f5;
    color: #999;
    border: 1px dashed #ccc;
}
```

## Read-Only Appointments

Make specific appointments uneditable.

### Making Appointments Read-Only

```csharp
// Controller
appData.Add(new AppointmentData
{
    Id = 200,
    Subject = "Company All-Hands",
    StartTime = new DateTime(2026, 4, 15, 10, 0, 0),
    EndTime = new DateTime(2026, 4, 15, 11, 0, 0),
    IsReadonly = true  // Prevents editing/deleting
});
```

### Conditional Read-Only

Make past appointments read-only:

```cshtml
@Html.EJS().Schedule("scheduler")
    .EventRendered("onEventRendered")
    .EventSettings(e => e.DataSource(Model))
    .Render()

<script>
    function onEventRendered(args) {
        var currentDate = new Date();
        if (args.data.EndTime < currentDate) {
            args.data.IsReadonly = true;  // Make past events read-only
        }
    }
</script>
```

### Read-Only for Specific Users

```cshtml
<script>
    function onActionBegin(args) {
        var currentUser = '@User.Identity.Name';
        
        if (args.requestType === 'eventChange' || args.requestType === 'eventRemove') {
            var event = args.data;
            if (event.Organizer !== currentUser) {
                args.cancel = true;
                alert('You can only edit your own appointments.');
            }
        }
    }
</script>
```

## Restricting Event Creation

Limit appointment creation on specific cells.

### Using isSlotAvailable

```cshtml
@Html.EJS().Schedule("scheduler")
    .ActionBegin("onActionBegin")
    .EventSettings(e => e.DataSource(Model))
    .Render()

<script>
    function onActionBegin(args) {
        if (args.requestType === 'eventCreate') {
            var scheduleObj = document.getElementById('scheduler').ej2_instances[0];
            var eventData = args.data[0];
            
            // Check if slot is available (no overlaps)
            if (!scheduleObj.isSlotAvailable(eventData)) {
                args.cancel = true;
                alert('This time slot is already occupied.');
            }
        }
    }
</script>
```

### Time-Based Restrictions

```cshtml
<script>
    function onCellClick(args) {
        var clickedTime = args.startTime.getHours();
        
        // Prevent booking before 8 AM or after 6 PM
        if (clickedTime < 8 || clickedTime >= 18) {
            args.cancel = true;
            alert('Appointments can only be created between 8 AM and 6 PM.');
        }
    }
</script>
```

### Resource-Based Restrictions

```cshtml
<script>
    function onActionBegin(args) {
        if (args.requestType === 'eventCreate') {
            var event = args.data[0];
            var resourceId = event.RoomId;
            
            // Room 3 is under maintenance
            if (resourceId === 3) {
                args.cancel = true;
                alert('Room 3 is currently unavailable.');
            }
        }
    }
</script>
```

## Best Practices

### Performance
- Disable unnecessary features (`AllowDragAndDrop`, `AllowResizing`) if not needed
- Use `isSlotAvailable` efficiently (cache results when possible)
- Debounce custom validation in `ActionBegin` event
- Minimize DOM manipulations in drag/resize events

### User Experience
- Provide visual feedback during drag (cursor changes, hover states)
- Show validation messages immediately (don't wait for server)
- Implement optimistic UI updates for responsiveness
- Use `DragStop` event to confirm or cancel drags
- Disable features that don't apply to your use case

### Validation
- Validate on client AND server side
- Check overlaps before allowing drag/resize
- Respect blocked time slots
- Consider timezone differences in validation logic
- Provide clear error messages

### Touch Support
- Test drag-drop on mobile devices
- Adjust touch target sizes for small screens
- Implement long-press for context actions
- Provide alternative input methods for complex scenarios

## Common Scenarios

### Appointment Booking System

```cshtml
@Html.EJS().Schedule("scheduler")
    .AllowDragAndDrop(false)  // Prevent accidental moves
    .AllowResizing(false)     // Fixed duration appointments
    .AllowOverlap(false)      // One appointment per slot
    .ActionBegin("validateBooking")
    .EventSettings(e => e.DataSource(Model))
    .Render()

<script>
    function validateBooking(args) {
        if (args.requestType === 'eventCreate') {
            var appointment = args.data[0];
            var duration = (appointment.EndTime - appointment.StartTime) / (1000 * 60);
            
            // Enforce 30-minute minimum
            if (duration < 30) {
                args.cancel = true;
                alert('Minimum appointment duration is 30 minutes.');
            }
        }
    }
</script>
```

### Resource Scheduling with Capacity

```cshtml
<script>
    function onActionBegin(args) {
        if (args.requestType === 'eventCreate' || args.requestType === 'eventChange') {
            var scheduleObj = document.getElementById('scheduler').ej2_instances[0];
            var event = args.data[0];
            
            // Get resource capacity
            var resource = getResourceById(event.RoomId);
            var existingEvents = scheduleObj.getEvents(event.StartTime, event.EndTime);
            var roomEvents = existingEvents.filter(e => e.RoomId === event.RoomId);
            
            if (roomEvents.length >= resource.Capacity) {
                args.cancel = true;
                alert(resource.Text + ' is at full capacity for this time.');
            }
        }
    }
</script>
```

## Next Steps

- **Appointment styling** → See [appointment-customization.md](appointment-customization.md)
- **Event editor** → See [crud-actions.md](crud-actions.md)
- **Resources** → See [resources.md](resources.md)
- **Data binding** → See [data-binding.md](data-binding.md)
