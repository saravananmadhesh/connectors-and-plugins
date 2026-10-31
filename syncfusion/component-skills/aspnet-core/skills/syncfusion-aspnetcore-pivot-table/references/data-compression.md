# Data Compression in Pivot Table

## Table of Contents
- [Overview](#overview)
- [When to Use Data Compression](#when-to-use-data-compression)
- [Enabling AllowDataCompression](#enabling-allowdatacompression)
- [How Compression Works](#how-compression-works)
- [Performance Impact](#performance-impact)
- [Compression Requirements](#compression-requirements)
- [Supported Aggregation Types](#supported-aggregation-types)
- [Unsupported Aggregation Types](#unsupported-aggregation-types)
- [DistinctCount Behavior](#distinctcount-behavior)
- [Calculated Field Limitations](#calculated-field-limitations)
- [Data Type Support](#data-type-support)

## Overview

**Data compression** compresses large datasets by removing duplicate records, keeping only unique combinations of field values. Works best with high-repetition data.

**Use Case:** 1M sales records with only 600K unique combinations result in 40% reduction.

## When to Use Data Compression

### Ideal Scenarios

✓ **High Repetition Data** (repeated product/region combinations)
✓ **Virtual Scrolling** with large datasets
✓ **Transaction Data** (many similar records)
✓ **Network Optimization** (mobile users)

### Not Recommended For

❌ Already uniquely aggregated data
❌ Time-series data with every record distinct
❌ Complex calculated fields

## Enabling AllowDataCompression

### Basic Configuration

```html
<ejs-pivotview id="pivotview" height="600" width="100%" enableVirtualization="true" allowDataCompression="true">
    <e-datasourcesettings dataSource="@ViewBag.DataSource">
        <e-rows>
            <e-field name="Product"></e-field>
        </e-rows>
        <e-columns>
            <e-field name="Region"></e-field>
        </e-columns>
        <e-values>
            <e-field name="Sales" type="Sum"></e-field>
        </e-values>
    </e-datasourcesettings>
</ejs-pivotview>
```

### With Server-Side Engine

```html
<ejs-pivotview id="PivotView" height="300" width="100%" enableVirtualization="true" allowDataCompression="true">
    <e-datasourcesettings dataSource="@ViewBag.Url" type="Pivot" mode="Server">
        <e-rows>
            <e-field name="Product"></e-field>
        </e-rows>
        <e-columns>
            <e-field name="Region"></e-field>
        </e-columns>
        <e-values>
            <e-field name="Sales" type="Sum"></e-field>
        </e-values>
    </e-datasourcesettings>
</ejs-pivotview>
```

## How Compression Works

### Compression Algorithm

```
Step 1: Read Raw Data (1M records)
Step 2: Extract Unique Keys (Product + Region + Year)
Step 3: Aggregate Per Key (SUM measures)
Step 4: Output Compressed Dataset (600K records)
```

### Performance Impact Example

**Without Compression (1M records):**
- Load Time: 10-15 seconds
- Browser Memory: 200-300 MB
- Scrolling FPS: 15-20 FPS (choppy)

**With Compression (600K unique):**
- Load Time: 3-5 seconds (70% faster)
- Browser Memory: 50-75 MB (75% less)
- Scrolling FPS: 55 FPS (smooth, 3x better)

## Compression Requirements

### Mandatory Pairing

**AllowDataCompression MUST be used with EnableVirtualization:**

```html
<!-- ✓ CORRECT: Both enabled -->
<ejs-pivotview id="pivotview" enableVirtualization="true" allowDataCompression="true">
</ejs-pivotview>

<!-- ❌ WRONG: Compression without virtual scrolling -->
<ejs-pivotview id="pivotview" allowDataCompression="true">
</ejs-pivotview>
```

### Data Type Support

✓ **Supported:** SQL Server, CSV, JSON, DataTable, IEnumerable<T>
❌ **Not Supported:** OLAP cubes

## Supported Aggregation Types

### Aggregation Types That Work Correctly

| Type | Behavior | Use Cases |
|------|----------|-----------|
| **Sum** | Aggregates correctly | Sales, quantities, totals |
| **Count** | Counts records | Number of transactions |
| **Min** | Returns minimum | Lowest price |
| **Max** | Returns maximum | Highest price |
| **Average** | Sums then divides | Unit prices, efficiency |

## Unsupported Aggregation Types

### Auto-Convert to Sum

These types auto-convert to **Sum** with compression:

- **PopulationStDev** → Sum
- **SampleStDev** → Sum
- **PopulationVariance** → Sum
- **SampleVariance** → Sum

### Workaround: Pre-Calculate

```html
<!-- Pre-calculate statistics before compression -->
<ejs-pivotview id="pivotview" enableVirtualization="true" allowDataCompression="true">
    <e-datasourcesettings dataSource="@ViewBag.PreprocessedData">
        <e-values>
            <e-field name="PriceStdDev" type="Sum"></e-field>
            <e-field name="PriceAverage" type="Avg"></e-field>
        </e-values>
    </e-datasourcesettings>
</ejs-pivotview>
```

## DistinctCount Behavior

### DistinctCount Converts to Count

With compression enabled:
- **Expected:** DistinctCount(CustomerId) = 1,250 unique customers
- **Actual:** Count(CustomerId) = 2,500 customer references (WRONG!)

### When to Use Alternative

**For small datasets (< 50K records):**
```html
<ejs-pivotview id="pivotview">
    <e-datasourcesettings dataSource="@ViewBag.DataSource">
        <e-values>
            <e-field name="CustomerId" type="DistinctCount"></e-field>
        </e-values>
    </e-datasourcesettings>
</ejs-pivotview>
```

**For large datasets (> 50K records):**
```html
<ejs-pivotview id="pivotview" enableVirtualization="true" allowDataCompression="true">
    <e-datasourcesettings dataSource="@ViewBag.DataSource">
        <e-values>
            <e-field name="CustomerId" type="Count"></e-field>
        </e-values>
    </e-datasourcesettings>
</ejs-pivotview>
```

## Calculated Field Limitations

### ⚠️ Calculated Fields Revert Aggregation

Calculated fields lose custom aggregation with compression:

```html
<!-- Aggregation type gets reverted with compression -->
<ejs-pivotview id="pivotview" enableVirtualization="true" allowDataCompression="true">
    <e-datasourcesettings dataSource="@ViewBag.DataSource">
        <e-calculatedfieldsettings>
            <e-field name="Profit Margin" formula="(Profit/Sales)*100"></e-field>
        </e-calculatedfieldsettings>
        <e-values>
            <!-- Average aggregation may revert to Sum -->
            <e-field name="Profit Margin" type="Avg"></e-field>
        </e-values>
    </e-datasourcesettings>
</ejs-pivotview>
```

### Workaround: Pre-Calculate in Backend

Calculate complex metrics before pivot table:

```csharp
// Pre-process data with calculated values
var processedData = RawData
    .GroupBy(x => new { x.Product, x.Region })
    .Select(g => new {
        Product = g.Key.Product,
        Region = g.Key.Region,
        Sales = g.Sum(x => x.Amount),
        Profit = g.Sum(x => x.Profit),
        ProfitMargin = (g.Sum(x => x.Profit) / g.Sum(x => x.Amount)) * 100  // Pre-calculated
    })
    .ToList();

// Use pre-calculated data
var json = JsonConvert.SerializeObject(processedData);
ViewBag.DataSource = json;
```

Then in view:
```html
<ejs-pivotview id="pivotview" enableVirtualization="true" allowDataCompression="true">
    <e-datasourcesettings dataSource="@ViewBag.DataSource">
        <e-values>
            <e-field name="ProfitMargin" type="Avg"></e-field>
        </e-values>
    </e-datasourcesettings>
</ejs-pivotview>
```

## Important Notes

- **Always pair** allowDataCompression with enableVirtualization
- **Pre-calculate** complex metrics and distinct counts before compression
- **Not recommended** for already-aggregated data or time-series data
- **Test performance** with your actual dataset before deployment
- **Database aggregation** may be better alternative for very large datasets (>10M rows)
- **Calculated fields** should be pre-processed for accurate results with compression
