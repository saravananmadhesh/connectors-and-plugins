# Cell Customization

## Table of Contents
1. [Cell Templates](#cell-templates)
2. [RenderCell Event](#rendercell-event)
3. [Cell Click Handling](#cell-click-handling)
4. [Cell Styling](#cell-styling)
5. [Work Hours Highlighting](#work-hours-highlighting)

## Cell Templates

Create custom cell content:

```cshtml
@using Syncfusion.EJ2.Schedule

@{
    var template = "${if(type === 'monthCells')}<div class='templatewrap'>${getCellContent(data.date)}</div>${/if}";
}

@(Html.EJS().Schedule("schedule")
    .Width("100%")
    .Height("550px")
    .CellTemplate(@template)
    .SelectedDate(new DateTime(2017, 12, 15))
    .Render()
)

<style>
    .e-schedule .e-month-view .e-work-cells {
        position: relative;
    }
    .e-schedule .templatewrap {
        text-align: center;
        position: absolute;
        width: 100%;
    }
</style>

<script type="text/javascript">
    function getCellContent(date) {
        if (date.getMonth() === 11 && date.getDate() === 25) {
            return '<div class="caption">Christmas Day</div>';
        } else if (date.getMonth() === 0 && date.getDate() === 1) {
            return '<div class="caption">New Year\'s Day</div>';
        }
        return '';
    }
</script>
```

## RenderCell Event

Customize cells after rendering:

```cshtml
@using Syncfusion.EJ2.Schedule

@(Html.EJS().Schedule("schedule")
    .Width("100%")
    .Height("550px")
    .RenderCell("onRenderCell")
    .SelectedDate(new DateTime(2018, 2, 15))
    .Render()
)

<script type="text/javascript">
    function onRenderCell(args) {
        if (args.element.classList.contains('e-work-hours') && (args.date.getDay() === 1)) {
            args.element.style.background = '#1aaa55';
        } else if (args.element.classList.contains('e-work-hours') && (args.date.getDay() === 2)) {
            args.element.style.background = '#357cd2';
        } else if (args.element.classList.contains('e-work-hours') && (args.date.getDay() === 5)) {
            args.element.style.background = '#00bdae';
        }
    }
</script>
```

## Cell Click Handling

Handle cell click events:

```cshtml
.CellClick("onCellClick")
```

```javascript
function onCellClick(args) {
    var cellDate = args.startTime;
    var endDate = args.endTime;
    var resource = args.groupIndex;
    
    // Create appointment on cell click
    var newEvent = {
        Subject: 'New Event',
        StartTime: cellDate,
        EndTime: new Date(cellDate.getTime() + 30 * 60000)
    };
    
    console.log('Cell clicked:', cellDate);
}
```

## Cell Styling

Apply custom CSS to cells:

```css
.e-schedule .e-work-cells {
    background-color: #FAFAFA;
}

.e-schedule .e-weekend-cells {
    background-color: #F5F5F5;
}

.e-schedule .holiday-cell {
    background-color: #FFE4E1 !important;
    font-weight: bold;
}

.e-schedule .non-work-hours {
    background-color: #E8E8E8;
    opacity: 0.5;
}
```

## Work Hours Highlighting

Highlight working hours:

```cshtml
@Html.EJS().Schedule("schedule")
    .TimeScale(new ScheduleTimeScale {
        Enable = true,
        Interval = 60,
        SlotCount = 1
    })
    .WorkDays(new int[] { 1, 2, 3, 4, 5 }) // Mon-Fri
    .WorkHours(new ScheduleWorkHours {
        Highlight = true,
        Start = "09:00",
        End = "17:00"
    })
    .Render()
```

### Working Hours Range
- Start time: Business hours begin
- End time: Business hours end
- Non-working hours appear grayed out

### CSS for Non-Work Hours
```css
.e-schedule .e-non-work-hours {
    background-color: #F0F0F0;
}
```
