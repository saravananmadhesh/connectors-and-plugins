# How-To Guides – ASP.NET Core Calendar

## Table of Contents
- [Change the First Day of the Week](#change-the-first-day-of-the-week)
- [Customize the Calendar Day Header](#customize-the-calendar-day-header)
- [Render the Calendar with Week Numbers](#render-the-calendar-with-week-numbers)
- [Select a Sequence of Dates](#select-a-sequence-of-dates)
- [Set a Clear Button in the Calendar](#set-a-clear-button-in-the-calendar)
- [Show Dates of Other Months](#show-dates-of-other-months)
- [Skip a Month in the Calendar](#skip-a-month-in-the-calendar)

---

## Change the First Day of the Week

Use `firstDayOfWeek` to set the starting day of the week. Values: 0 = Sunday, 1 = Monday, ..., 6 = Saturday.

> By default, the first day of the week is determined by the current culture.

```cshtml
@* Start week on Tuesday (2) *@
<ejs-calendar id="calendar" firstDayOfWeek="2"></ejs-calendar>
```

```cshtml
@* Start week on Monday (1) *@
<ejs-calendar id="calendar" firstDayOfWeek="1"></ejs-calendar>
```

---

## Customize the Calendar Day Header

Change the day name format in the header row using `dayHeaderFormat`:

| Format | Example |
|--------|---------|
| `Short` (default) | Su, Mo, Tu |
| `Narrow` | S, M, T |
| `Abbreviated` | Sun, Mon, Tue |
| `Wide` | Sunday, Monday, Tuesday |

```cshtml
@* Narrow: single character per day *@
<ejs-calendar id="calendar"
    dayHeaderFormat="Syncfusion.EJ2.Calendars.DayHeaderFormats.Narrow">
</ejs-calendar>
```

```cshtml
@* Abbreviated: 3-letter day names *@
<ejs-calendar id="calendar"
    dayHeaderFormat="Syncfusion.EJ2.Calendars.DayHeaderFormats.Abbreviated">
</ejs-calendar>
```

```cshtml
@* Wide: full day names *@
<ejs-calendar id="calendar"
    dayHeaderFormat="Syncfusion.EJ2.Calendars.DayHeaderFormats.Wide">
</ejs-calendar>
```

---

## Render the Calendar with Week Numbers

Enable the `weekNumber` property to display ISO week numbers in a column on the left:

```cshtml
<ejs-calendar id="calendar" weekNumber="true"></ejs-calendar>
```

Combine with `weekRule` to control which week is considered the first:

```cshtml
<ejs-calendar id="calendar"
    weekNumber="true"
    weekRule="Syncfusion.EJ2.Calendars.WeekRule.FirstFourDayWeek">
</ejs-calendar>
```

---

## Select a Sequence of Dates

Select all dates in a week when the user picks any date, using `isMultiSelection` and `values` with the `change` event:

```cshtml
<ejs-calendar id="calendar"
    isMultiSelection="true"
    change="onCalendarChange">
</ejs-calendar>

<script>
    function onCalendarChange(args) {
        var calObj = document.getElementById('calendar').ej2_instances[0];
        if (!args.value) return;

        var selected = new Date(args.value);
        var dayOfWeek = selected.getDay(); // 0=Sun

        var weekStart = new Date(selected);
        weekStart.setDate(selected.getDate() - dayOfWeek);

        var weekDates = [];
        for (var i = 0; i < 7; i++) {
            var d = new Date(weekStart);
            d.setDate(weekStart.getDate() + i);
            weekDates.push(d);
        }
        calObj.values = weekDates;
    }
</script>
```

---

## Set a Clear Button in the Calendar

Add a custom "Clear" button to the Calendar footer using the `created` event:

```cshtml
<ejs-calendar id="calendar" created="onCalendarCreated"></ejs-calendar>

<script>
    function onCalendarCreated() {
        var calObj = document.getElementById('calendar').ej2_instances[0];

        // Create footer container
        var footer = document.createElement('div');
        footer.className = 'e-footer';

        // Create Clear button
        var clearBtn = new ej.buttons.Button({ content: 'Clear' });
        var btnElem = document.createElement('button');
        btnElem.id = 'clearButton';
        footer.appendChild(btnElem);
        clearBtn.appendTo('#clearButton');

        // Append footer to Calendar element
        calObj.element.appendChild(footer);

        // Bind click to clear value
        btnElem.addEventListener('click', function () {
            calObj.value = null;
        });
    }
</script>
```

**Key points:**
1. Use the `created` event to access the rendered Calendar DOM element
2. Apply the `e-footer` class so the div acts as the footer section
3. Use `calObj.value = null` to clear the selection programmatically

---

## Show Dates of Other Months

By default, days from adjacent months are hidden. Apply these CSS rules to reveal them:

```css
.e-calendar .e-content tr.e-month-hide,
.e-calendar .e-content td.e-other-month > span.e-day {
    display: block;
}

.e-calendar .e-content td.e-month-hide,
.e-calendar .e-content td.e-other-month {
    pointer-events: auto;
    touch-action: auto;
}
```

```cshtml
<ejs-calendar id="calendar"></ejs-calendar>
```

With this CSS, the grid rows are always fully populated with dates from the previous and next month, creating a consistent 6-row grid.

---

## Skip a Month in the Calendar

Use the `navigated` event with the `navigateTo` method to skip forward or backward by 2 months instead of 1 when clicking navigation arrows:

```cshtml
<ejs-calendar id="calendar" navigated="onNavigated"></ejs-calendar>

<script>
    var skipFlag = false;

    function onNavigated(args) {
        if (skipFlag) {
            skipFlag = false;
            return;
        }

        var calObj = document.getElementById('calendar').ej2_instances[0];
        var currentView = calObj.currentView();

        if (currentView === 'Month') {
            var navigatedDate = new Date(args.date);
            // Determine direction from the navigated event
            // and move one extra month
            navigatedDate.setMonth(navigatedDate.getMonth() + (args.date > calObj.value ? 1 : -1));
            skipFlag = true;
            calObj.navigateTo('Month', navigatedDate);
        }
    }
</script>
```

**How it works:**
- The `navigated` event fires each time the view navigates
- The `navigateTo` method programmatically jumps to a specified date and view
- `skipFlag` prevents infinite recursion when `navigateTo` itself triggers `navigated`
