# Timezone

## Table of Contents
1. [Scheduler Timezone](#scheduler-timezone)
2. [Event-Specific Timezones](#event-specific-timezones)
3. [IANA Timezone Names](#iana-timezone-names)
4. [Timezone Conversion](#timezone-conversion)
5. [Display Timezone](#display-timezone)

## Scheduler Timezone

Set scheduler to specific timezone:

```cshtml
@using Syncfusion.EJ2.Schedule

@(Html.EJS().Schedule("schedule")
    .Width("100%")
    .Height("550px")
    .Timezone("America/New_York")
    .EventSettings(new ScheduleEventSettings { DataSource = ViewBag.appointments })
    .SelectedDate(new DateTime(2018, 2, 15))
    .Render()
)
```

### Common Timezones
- **US/Canada**: America/New_York, America/Chicago, America/Denver, America/Los_Angeles
- **UK/Europe**: Europe/London, Europe/Paris, Europe/Berlin, Europe/Moscow
- **Asia/Pacific**: Asia/Tokyo, Asia/Shanghai, Asia/Hong_Kong, Australia/Sydney, Asia/Singapore
- **India**: Asia/Kolkata
- **UTC**: UTC

## Event-Specific Timezones

Set timezone for individual appointments:

```csharp
new ScheduleEvent {
    Subject = "International Meeting",
    StartTime = new DateTime(2024, 1, 15, 14, 0, 0),
    EndTime = new DateTime(2024, 1, 15, 15, 0, 0),
    StartTimezone = "America/New_York",
    EndTimezone = "America/New_York"
}
```

### Different Start/End Timezones
```csharp
new ScheduleEvent {
    Subject = "Global Sync",
    StartTime = new DateTime(2024, 1, 15, 9, 0, 0),
    StartTimezone = "America/Los_Angeles",
    EndTime = new DateTime(2024, 1, 15, 12, 0, 0),
    EndTimezone = "America/New_York"
}
```

## IANA Timezone Names

Standard timezone identifiers:

| Region | Timezone |
|--------|----------|
| North America | America/New_York, America/Chicago, America/Denver, America/Los_Angeles, America/Anchorage, Pacific/Honolulu |
| South America | America/Sao_Paulo, America/Buenos_Aires, America/Lima |
| Europe | Europe/London, Europe/Paris, Europe/Berlin, Europe/Stockholm, Europe/Moscow, Europe/Athens |
| Africa | Africa/Cairo, Africa/Johannesburg, Africa/Lagos, Africa/Nairobi |
| Middle East | Asia/Dubai, Asia/Kolkata, Asia/Bangkok, Asia/Singapore |
| East Asia | Asia/Tokyo, Asia/Seoul, Asia/Shanghai, Asia/Hong_Kong, Asia/Bangkok |
| Australia | Australia/Sydney, Australia/Melbourne, Australia/Brisbane, Australia/Perth |
| Pacific | Pacific/Auckland, Pacific/Fiji |
| UTC | UTC |

## Timezone Conversion

Handle timezone conversions:

```javascript
function convertToUserTimezone(utcDate, targetTimezone) {
    // Get current scheduler timezone
    var schedule = document.getElementById('schedule').ej2_instances[0];
    var schedulerTz = schedule.timezone;
    
    // Convert UTC to target timezone
    var options = { timeZone: targetTimezone };
    var localDate = new Date(utcDate.toLocaleString('en-US', options));
    
    return localDate;
}

// Usage
var utcDate = new Date('2024-01-15T14:00:00Z');
var nyTime = convertToUserTimezone(utcDate, 'America/New_York');
console.log(nyTime);
```

### Convert to Multiple Timezones
```javascript
function showInMultipleTimezones(event) {
    var timezones = ['America/New_York', 'Europe/London', 'Asia/Tokyo'];
    var times = {};
    
    timezones.forEach(tz => {
        var options = { timeZone: tz, year: 'numeric', month: '2-digit', day: '2-digit', 
                       hour: '2-digit', minute: '2-digit', second: '2-digit' };
        times[tz] = event.StartTime.toLocaleString('en-US', options);
    });
    
    return times;
}
```

## Display Timezone

Show timezone info in appointments:

```html
<script id="eventTemplate" type="text/x-template">
    <div class="e-appointment-content">
        <div class="subject">@Html.Encode("${Subject}")</div>
        <div class="e-timezone">
            ${StartTimezone ? '(' + StartTimezone + ')' : ''}
        </div>
    </div>
</script>
```

### Timezone Label in Editor
```html
<tr>
    <td class="e-textlabel">Start Timezone</td>
    <td>
        <select id="StartTimezone" name="StartTimezone" class="e-field">
            <option value="UTC">UTC</option>
            <option value="America/New_York">Eastern Time</option>
            <option value="America/Chicago">Central Time</option>
            <option value="America/Denver">Mountain Time</option>
            <option value="America/Los_Angeles">Pacific Time</option>
            <option value="Europe/London">GMT</option>
            <option value="Europe/Paris">CET</option>
            <option value="Asia/Tokyo">JST</option>
        </select>
    </td>
</tr>
```

### Daylight Saving Time
```cshtml
// Automatically handles DST transitions
@Html.EJS().Schedule("Schedule")
    .Timezone("America/New_York") // DST applied automatically
    .Render()
```
