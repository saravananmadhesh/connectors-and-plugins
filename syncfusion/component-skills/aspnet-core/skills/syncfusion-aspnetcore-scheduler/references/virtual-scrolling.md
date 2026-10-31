# Virtual Scrolling in ASP.NET Core Scheduler

## Table of Contents
- [Overview](#overview)
- [Enable Virtual Scrolling](#enable-virtual-scrolling)
- [Generate Large Datasets](#generate-large-datasets)


---

## Overview

The Syncfusion ASP.NET Core Scheduler supports **virtual scrolling** to efficiently render large datasets in views. Only the events visible in the current viewport are rendered, which significantly improves rendering performance and reduces DOM load when thousands of appointments are bound.

Virtual scrolling is enabled per view using the `allowVirtualScrolling` property on the `e-schedule-view` tag.

---

## Enable Virtual Scrolling

Set `allowVirtualScrolling="true"` on the desired view.

```cshtml
@page
@model EJ2CoreSampleBrowser.Pages.Schedule.VirtualScrolling

@using Syncfusion.EJ2

@{
    var virtualDataSource = new VirtualScrolling().generateStaticEvents(new DateTime(DateTime.Today.Year, 4, 1), 300, 12);
    var resources = new VirtualScrolling().GenerateResourceData(1, 300);
    var resourceData = new string[] { "Resources" };
}

<ejs-schedule id="schedule" cssClass="virtual-scroll" width="100%" height="650"
              selectedDate="new DateTime(DateTime.Today.Year, 4, 1)"
              currentView="TimelineMonth">
    <e-schedule-views>
        <e-schedule-view option="TimelineMonth" eventTemplate="#timeline-event-template" allowVirtualScrolling="true"></e-schedule-view>
        <e-schedule-view option="Month" eventTemplate="#timeline-event-template" allowVirtualScrolling="true"></e-schedule-view>
    </e-schedule-views>
    <e-schedule-group enableCompactView="false" resources="@resourceData"></e-schedule-group>
    <e-schedule-resources>
        <e-schedule-resource field="ResourceId" dataSource="@resources" title="Resource" name="Resources"
                             textField="Text" idField="Id" colorField="Color" allowMultiple="true"></e-schedule-resource>
    </e-schedule-resources>
    <e-schedule-eventsettings dataSource="@virtualDataSource"></e-schedule-eventsettings>
</ejs-schedule>
```

---

## Generate Large Datasets

Create large event and resource collections in the PageModel to feed the Scheduler.

```csharp
using Microsoft.AspNetCore.Mvc.RazorPages;

namespace EJ2CoreSampleBrowser.Pages.Schedule;

public class VirtualScrolling : PageModel
{
    public List<ResourceData> GenerateResourceData(int start, int end)
    {
        List<ResourceData> resources = new List<ResourceData>(300);
        var colors = new string[] { "#ff8787", "#9775fa", "#748ffc", "#3bc9db", "#69db7c",
            "#fdd835", "#748ffc", "#9775fa", "#df5286", "#7fa900",
            "#fec200", "#5978ee", "#00bdae", "#ea80fc"};
        for (int a = start; a <= end; a++)
        {
            int index = a % colors.Length;
            index = index == 0 ? (colors.Length / a) : index;
            resources.Add(new ResourceData { Id = a, Text = "Resource " + a, Color = colors[index] });
        }
        return resources;
    }

    public List<EventData> generateStaticEvents(DateTime date, int v1, int v2)
    {
        List<EventData> data = new List<EventData>(3600);
        var id = 1;
        for (var i = 0; i < 300; i++)
        {
            Random random = new Random();
            List<int> listNumbers = new List<int>();
            int[] randomCollection = new int[24];
            int number;
            int max = 30;
            for (int a = 0; a < 12; a++)
            {
                do { number = random.Next(max); } while (listNumbers.Contains(number));
                listNumbers.Add(number);
                var startDate = date.AddDays(number + (i % 2));
                startDate = startDate.AddMilliseconds((((number % 10) * 10) * (1000 * 60)));
                var endDate = startDate.AddMilliseconds(((1440 + 30) * (1000 * 60)));
                data.Add(new EventData
                {
                    Id = id, Subject = "Event #" + id, StartTime = startDate, EndTime = endDate,
                    IsAllDay = (id % 10 == 0) ? false : true, ResourceId = i + 1
                });
                id++;
            }
        }
        return data;
    }
}

public class EventData
{
    public int Id { get; set; }
    public string Subject { get; set; }
    public DateTime StartTime { get; set; }
    public DateTime EndTime { get; set; }
    public bool IsAllDay { get; set; }
    public int ResourceId { get; set; }
}

public class ResourceData
{
    public int Id { get; set; }
    public string Text { get; set; }
    public string Color { get; set; }
}
```
