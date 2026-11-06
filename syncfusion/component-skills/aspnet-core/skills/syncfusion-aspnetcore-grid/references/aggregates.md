# Aggregates — Syncfusion ASP.NET Core Grid

## Table of Contents
- [Overview](#overview)
- [Footer Aggregates](#footer-aggregates)
- [Group and Caption Aggregates](#group-and-caption-aggregates)
- [Custom Aggregate](#custom-aggregate)
- [Reactive Aggregates](#reactive-aggregates)

## When to Use This

- Display summary calculations in footer rows
- Show aggregate values in group captions
- Calculate totals, averages, counts, min, and max values
- Provide quick data insights to users

---

## Overview

Aggregates display summary values (sum, average, count, min, max) in footer or group rows. Define inside `<e-grid-aggregates>`.

Built-in aggregate types: `Sum`, `Average`, `Min`, `Max`, `Count`, `TrueCount`, `FalseCount`, `Custom`.

---

## Footer Aggregates

Show totals at the bottom of the grid using `footerTemplate`:

```cshtml
<ejs-grid id="Grid" dataSource="@ViewBag.DataSource">
    <e-grid-aggregates>
        <e-grid-aggregate>
            <e-aggregate-columns>
                <e-aggregate-column field="Freight" type="Sum" footerTemplate="Sum: ${Sum}"></e-aggregate-column>
                <e-aggregate-column field="Freight" type="Average" footerTemplate="Avg: ${Average}"></e-aggregate-column>
                <e-aggregate-column field="OrderID" type="Count" footerTemplate="Count: ${Count}"></e-aggregate-column>
            </e-aggregate-columns>
        </e-grid-aggregate>
    </e-grid-aggregates>
</ejs-grid>
```

---

## Group and Caption Aggregates

Show aggregate values inside group caption rows (`groupCaptionTemplate`) or group footer rows (`groupFooterTemplate`):

```cshtml
<ejs-grid id="Grid" dataSource="@ViewBag.DataSource" allowGrouping="true">
    <e-grid-groupsettings>
        <e-group-columns>
            <e-group-column>ShipCountry</e-group-column>
        </e-group-columns>
    </e-grid-groupsettings>
    <e-grid-aggregates>
        <e-grid-aggregate>
            <e-aggregate-columns>
                <e-aggregate-column field="Freight" type="Sum"
                                    groupCaptionTemplate="Sum: ${Sum}"
                                    groupFooterTemplate="Sum: ${Sum}"></e-aggregate-column>
            </e-aggregate-columns>
        </e-grid-aggregate>
    </e-grid-aggregates>
</ejs-grid>
```

---

## Custom Aggregate

Define your own aggregation logic with `type="Custom"` and a JavaScript function:


```javascript
function customAggregateFn(data) {
    // data is the full dataset visible in grid
    return data.result.filter(item => item.ShipCountry === 'Brazil').length;
}
```

Assign to aggregate column:
```cshtml
<e-aggregate-column field="ShipCountry" type="Custom"
                    customAggregate="customAggregateFn"
                    footerTemplate="Brazil Count: ${Custom}"></e-aggregate-column>
```

---

## Reactive Aggregates

Update aggregate values in real time during batch editing (without saving) using `<e-grid-editSettings>` with `mode="Batch"` and enabling reactive aggregates:


> Reactive aggregates recalculate as cells are edited in Batch mode, giving users immediate feedback on totals.
