````markdown
# CRUD Actions

## Table of Contents
1. [Create Appointments](#create-appointments)
2. [Edit Appointments](#edit-appointments)
3. [Delete Appointments](#delete-appointments)
4. [Editor Window](#editor-window)
5. [Quick Info Popup](#quick-info-popup)
6. [Validation](#validation)

## Create Appointments

Add new appointments:

```cshtml
@using Syncfusion.EJ2.Schedule

@(Html.EJS().Schedule("schedule")
    .Height("550px")
    .Width("100%")
    .EventSettings(new ScheduleEventSettings { DataSource = ViewBag.datasource })
    .SelectedDate(new DateTime(2018, 2, 15))
    .Render()
)
```

### Programmatic Creation
```javascript
var schedule = document.getElementById('schedule').ej2_instances[0];
var newEvent = {
    Subject: 'Client Meeting',
    StartTime: new Date(2024, 0, 15, 10, 0, 0),
    EndTime: new Date(2024, 0, 15, 11, 0, 0),
    Location: 'Office',
    ResourceId: 1
};
schedule.addEvent(newEvent);
```

### Via Double-Click
- Double-click any cell to open editor
- Enter appointment details
- Click Save

## Edit Appointments

Modify existing appointments:

```cshtml
@using Syncfusion.EJ2.Schedule

@(Html.EJS().Schedule("schedule")
    .Height("550px")
    .Width("100%")
    .EventSettings(new ScheduleEventSettings { DataSource = ViewBag.datasource })
    .SelectedDate(new DateTime(2018, 2, 15))
    .Views(ViewBag.view)
    .Render()
)
```

```javascript
// Click on appointment to edit
var schedule = document.getElementById('schedule').ej2_instances[0];
var event = schedule.getEventDetails(eventId);
schedule.openEditor(event);
```

### Edit Recurring Events

```javascript
function editRecurringEvent(event) {
    if (event.RecurrenceRule) {
        // Show options: Edit this event only, or all in series
        schedule.openRecurrenceEditor(event);
    }
}
```

## Delete Appointments

Remove appointments:

```cshtml
@using Syncfusion.EJ2.Schedule

@(Html.EJS().Schedule("schedule")
    .Height("550px")
    .Width("100%")
    .EventSettings(new ScheduleEventSettings { DataSource = ViewBag.datasource })
    .SelectedDate(new DateTime(2018, 2, 15))
    .Views(ViewBag.view)
    .Render()
)
```

### Programmatic Delete
```javascript
var schedule = document.getElementById('schedule').ej2_instances[0];
schedule.deleteEvent(eventId);
```

### Delete Recurring Events
```javascript
function deleteRecurringEvent(event) {
    if (event.RecurrenceRule) {
        // Delete only this occurrence or entire series
        schedule.deleteEvent(event);
    }
}
```

## Editor Window

Customize the appointment editor:

```cshtml
@using Syncfusion.EJ2.Schedule

@(Html.EJS().Schedule("schedule")
    .Height("550px")
    .Width("100%")
    .EventSettings(new ScheduleEventSettings { DataSource = ViewBag.datasource })
    .SelectedDate(new DateTime(2018, 2, 15))
    .Views(ViewBag.view)
    .Render()
)
```

### Custom Editor Template
```html
<script id="editorTemplate" type="text/x-template">
    <table class="e-schedule-form">
        <tbody>
            <tr>
                <td class="e-textlabel">Subject</td>
                <td>
                    <input id="Subject" name="Subject" type="text" class="e-field" />
                </td>
            </tr>
            <tr>
                <td class="e-textlabel">Location</td>
                <td>
                    <input id="Location" name="Location" type="text" class="e-field" />
                </td>
            </tr>
            <tr>
                <td class="e-textlabel">Start Time</td>
                <td>
                    <input id="StartTime" name="StartTime" type="datetime-local" class="e-field" />
                </td>
            </tr>
            <tr>
                <td class="e-textlabel">End Time</td>
                <td>
                    <input id="EndTime" name="EndTime" type="datetime-local" class="e-field" />
                </td>
            </tr>
        </tbody>
    </table>
</script>
```

## Quick Info Popup

Show quick appointment details:

```cshtml
@using Syncfusion.EJ2.Schedule

@(Html.EJS().Schedule("schedule")
    .Height("550px")
    .Width("100%")
    .EventSettings(new ScheduleEventSettings { DataSource = ViewBag.datasource })
    .SelectedDate(new DateTime(2018, 2, 15))
    .Views(ViewBag.view)
    .Render()
)
```

### Quick Info Template
```html
<script id="quickTemplate" type="text/x-template">
    <div class="e-quick-info">
        <div class="e-title">${Subject}</div>
        <div class="e-time">
            <i class="e-icons e-clock"></i>
            ${StartTime} - ${EndTime}
        </div>
        <div class="e-location">
            <i class="e-icons e-location"></i>
            ${Location}
        </div>
        <div class="e-actions">
            <button class="e-edit-btn">Edit</button>
            <button class="e-delete-btn">Delete</button>
        </div>
    </div>
</script>
```

## Validation

### Client-Side Validation (JavaScript)

```cshtml
.ActionBegin("onActionBegin")
```

```javascript
// ✅ SECURE: Client-side validation (not sufficient alone)
function onActionBegin(args) {
    if (args.requestType === 'eventCreate' || args.requestType === 'eventChange') {
        var data = args.data;
        var errors = [];
        
        // Subject required and length check
        if (!data.Subject || data.Subject.trim() === '') {
            errors.push('Subject is required');
        } else if (data.Subject.length > 200) {
            errors.push('Subject cannot exceed 200 characters');
        }
        
        // Validate time
        if (data.StartTime >= data.EndTime) {
            errors.push('End time must be after start time');
        }
        
        // Validate duration (max 8 hours)
        var duration = (new Date(data.EndTime) - new Date(data.StartTime)) / (1000 * 60 * 60);
        if (duration > 8) {
            errors.push('Appointment duration cannot exceed 8 hours');
        }
        
        // Check for conflicts
        if (hasConflict(data)) {
            errors.push('This time slot conflicts with an existing appointment');
        }
        
        if (errors.length > 0) {
            alert('Please fix the following errors:\n' + errors.join('\n'));
            args.cancel = true;
        }
    }
}

function hasConflict(event) {
    var schedule = document.getElementById('schedule').ej2_instances[0];
    var events = schedule.getEvents();
    
    return events.some(e => 
        e.Id !== event.Id &&
        event.StartTime < e.EndTime &&
        event.EndTime > e.StartTime
    );
}
```

### Server-Side Validation (C#) — **REQUIRED**

```csharp
// Models/AppointmentData.cs
using System;
using System.ComponentModel.DataAnnotations;

public class AppointmentData
{
    [Key]
    public int Id { get; set; }

    [Required(ErrorMessage = "Subject is required")]
    [StringLength(200, MinimumLength = 3, 
        ErrorMessage = "Subject must be between 3 and 200 characters")]
    public string Subject { get; set; }

    [Required(ErrorMessage = "Start time is required")]
    [DataType(DataType.DateTime)]
    public DateTime StartTime { get; set; }

    [Required(ErrorMessage = "End time is required")]
    [DataType(DataType.DateTime)]
    public DateTime EndTime { get; set; }

    [StringLength(300, ErrorMessage = "Location cannot exceed 300 characters")]
    public string Location { get; set; }

    [Required]
    public string OwnerId { get; set; }
}

// Controllers/SchedulerController.cs
[Authorize]
[ValidateAntiForgeryToken]
[HttpPost]
public ActionResult UpdateEvents([FromBody] CRUDModel<AppointmentData> value)
{
    try
    {
        var userId = GetCurrentUserId();
        
        // ✅ Validate model state
        if (!ModelState.IsValid)
        {
            return Json(new { success = false, message = "Validation failed" });
        }

        // Process added appointments
        if (value.added != null && value.added.Count > 0)
        {
            foreach (var item in value.added)
            {
                // ✅ Validate duration
                if ((item.EndTime - item.StartTime).TotalHours > 8)
                {
                    return Json(new { success = false, 
                        message = "Appointment duration cannot exceed 8 hours" });
                }

                // ✅ Verify no conflicts
                var hasConflict = _context.Events
                    .Any(e => e.OwnerId == userId &&
                         e.StartTime < item.EndTime &&
                         e.EndTime > item.StartTime);
                
                if (hasConflict)
                {
                    return Json(new { success = false, 
                        message = "This time slot is already booked" });
                }

                // ✅ Set ownership
                item.OwnerId = userId;
                _context.Events.Add(item);
            }
        }

        // Process modified appointments
        if (value.changed != null && value.changed.Count > 0)
        {
            foreach (var item in value.changed)
            {
                // ✅ Verify user owns this appointment
                var existing = _context.Events
                    .FirstOrDefault(e => e.Id == item.Id && e.OwnerId == userId);

                if (existing == null)
                {
                    _logger.LogWarning($"Unauthorized modification attempt by {userId}");
                    return Json(new { success = false, message = "Unauthorized" });
                }

                // ✅ Validate modified data
                if ((item.EndTime - item.StartTime).TotalHours > 8)
                {
                    return Json(new { success = false, 
                        message = "Invalid appointment duration" });
                }

                existing.Subject = item.Subject;
                existing.StartTime = item.StartTime;
                existing.EndTime = item.EndTime;
                existing.Location = item.Location;
            }
        }

        // Process deleted appointments
        if (value.deleted != null && value.deleted.Count > 0)
        {
            foreach (var item in value.deleted)
            {
                // ✅ Verify user owns this appointment
                var existing = _context.Events
                    .FirstOrDefault(e => e.Id == item.Id && e.OwnerId == userId);

                if (existing == null)
                {
                    _logger.LogWarning($"Unauthorized deletion by {userId}");
                    return Json(new { success = false, message = "Unauthorized" });
                }

                _context.Events.Remove(existing);
            }
        }

        _context.SaveChanges();
        return Json(new { success = true });
    }
    catch (Exception ex)
    {
        // ✅ Log error but return generic message
        _logger.LogError(ex, "Error updating appointments");
        return Json(new { success = false, 
            message = "An error occurred while saving your changes" });
    }
}
```