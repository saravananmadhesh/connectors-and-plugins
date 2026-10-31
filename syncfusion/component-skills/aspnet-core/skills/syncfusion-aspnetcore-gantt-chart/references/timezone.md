``markdown
# Timezone — Syncfusion ASP.NET Core Gantt Chart

## Table of Contents
- [Overview](#overview)
- [How JavaScript Dates Work](#how-javascript-dates-work)
- [Display the Same Time Everywhere (UTC)](#display-the-same-time-everywhere-utc)
- [CRUD Operations with Timezone](#crud-operations-with-timezone)
- [Timezone Utility Methods](#timezone-utility-methods)

---

## Overview

By default, the Gantt Chart uses the **local system timezone** of the browser. To display dates consistently for all users regardless of their local timezone — or to work with a specific geographic timezone — use the 	imezone property.

| Property | Type | Description |
|---|---|---|
| timezone | string | IANA timezone string (e.g., "UTC", "America/New_York") or omit for local system timezone |

---

## How JavaScript Dates Work

JavaScript's 
new Date() always returns the current date/time in the **local browser timezone**. For example:

`
Wed Dec 12 2018 05:23:27 GMT+0530 (India Standard Time)
`

When dates are stored in a database in UTC and displayed on clients in different timezones, the rendered times will differ unless you normalise them using the 	imezone property.

---

## Display the Same Time Everywhere (UTC)

Set timezone="UTC" to ensure all users — regardless of their local timezone — see the same date and time values as stored in the database. This prevents timezone-offset shifts on the chart timeline.

`cshtml
<ejs-gantt id='Gantt' dataSource="ViewBag.dataSource"
           timezone="UTC" durationUnit="Hour"
           height="450px" includeWeekend="true" dateFormat="hh:mm a">
    <e-gantt-taskfields id="TaskId" name="TaskName" startDate="StartDate"
                        endDate="EndDate" duration="Duration" progress="Progress"
                        dependency="Predecessor" parentID="ParentID">
    </e-gantt-taskfields>
    <e-gantt-dayworkingtimecollection>
        <e-gantt-dayworkingtime from="0" to="24"></e-gantt-dayworkingtime>
    </e-gantt-dayworkingtimecollection>
    <e-gantt-timelinesettings timelineUnitSize="65">
        <e-timelinesettings-toptier unit="Day" format="MMM dd, y"></e-timelinesettings-toptier>
        <e-timelinesettings-bottomtier unit="Hour" format="hh:mm a"></e-timelinesettings-bottomtier>
    </e-gantt-timelinesettings>
</ejs-gantt>
`

**Common 	imezone values:**

| Value | Region |
|---|---|
| "UTC" | Coordinated Universal Time |
| "America/New_York" | Eastern Time (US & Canada) |
| "America/Los_Angeles" | Pacific Time (US & Canada) |
| "Europe/London" | GMT/BST (UK) |
| "Europe/Paris" | Central European Time |
| "Asia/Tokyo" | Japan Standard Time |
| "Asia/Kolkata" | India Standard Time |

---

## CRUD Operations with Timezone

When a specific timezone is set, all editing operations (add, edit, delete) are performed in that timezone. Before saving to the database, the Gantt converts the data back to the original local time internally so that the server always receives timezone-consistent values.

`cshtml
<ejs-gantt id='Gantt' dataSource="ViewBag.dataSource"
           timezone="America/New_York" durationUnit="Hour"
           height="450px" includeWeekend="true" dateFormat="hh:mm a">
    <e-gantt-taskfields id="TaskId" name="TaskName" startDate="StartDate"
                        endDate="EndDate" duration="Duration" progress="Progress"
                        dependency="Predecessor" parentID="ParentID">
    </e-gantt-taskfields>
    <e-gantt-editsettings allowAdding="true" allowEditing="true" allowDeleting="true"
                          allowTaskbarEditing="true" showDeleteConfirmDialog="true">
    </e-gantt-editsettings>
    <e-gantt-dayworkingtimecollection>
        <e-gantt-dayworkingtime from="0" to="24"></e-gantt-dayworkingtime>
    </e-gantt-dayworkingtimecollection>
    <e-gantt-timelinesettings timelineUnitSize="65">
        <e-timelinesettings-toptier unit="Day" format="MMM dd, y"></e-timelinesettings-toptier>
        <e-timelinesettings-bottomtier unit="Hour" format="hh:mm a"></e-timelinesettings-bottomtier>
    </e-gantt-timelinesettings>
</ejs-gantt>
`

> For an hour-level timeline, set durationUnit="Hour", extend working time to from="0" to="24", and configure the bottom tier as unit="Hour".

---

## Timezone Utility Methods

The Syncfusion Timezone class (from ej.schedule.Timezone) provides helper methods for programmatic timezone conversions.

### offset(date, timezone)

Calculates the UTC offset (in minutes) between a UTC date and the given timezone.

| Parameter | Type | Description |
|---|---|---|
| date | Date | UTC time as a Date object |
| timezone | string | IANA timezone string |

**Returns:** 
number (offset in minutes)

`javascript
// Assume local timezone is IST (UTC+05:30)
var timezone = new ej.schedule.Timezone();
var date = new Date(2018, 11, 5, 15, 25, 11);
var timeZoneOffset = timezone.offset(date, "Europe/Paris");
console.log(timeZoneOffset); // -60
`

---

### convert(date, fromOffset, toOffset)

Converts a date from one timezone to another.

| Parameter | Type | Description |
|---|---|---|
| date | Date | UTC time as a Date object |
| fromOffset | number/string | Source timezone (offset in minutes or IANA string) |
| toOffset | number/string | Target timezone (offset in minutes or IANA string) |

**Returns:** Date

`javascript
var timezone = new ej.schedule.Timezone();
var date = new Date(2018, 11, 5, 15, 25, 11);
var convertedDate = timezone.convert(date, "Europe/Paris", "Asia/Tokyo");
console.log(convertedDate); // 2018-12-05T17:55:11.000Z

var convertedDate1 = timezone.convert(date, 60, -360);
console.log(convertedDate1); // 2018-12-05T16:55:11.000Z
`

---

### 
remove(date, timezone)

Removes the timezone offset from a UTC date, returning it in local time.

| Parameter | Type | Description |
|---|---|---|
| date | Date | UTC time as a Date object |
| timezone | string | IANA timezone string |

**Returns:** Date

`javascript
var timezone = new ej.schedule.Timezone();
var date = new Date(2018, 11, 5, 15, 25, 11);
var convertedDate = timezone.remove(date, "Europe/Paris");
console.log(convertedDate); // 2018-12-05T14:25:11.000Z
`

---
