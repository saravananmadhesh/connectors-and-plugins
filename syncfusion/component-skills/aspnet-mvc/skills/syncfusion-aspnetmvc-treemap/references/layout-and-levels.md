# Layout and Levels in ASP.NET MVC TreeMap Control

## Table of Contents
- [Overview](#overview)
- [Layout Types](#layout-types)
- [Squarified Layout (Default)](#squarified-layout-default)
- [Horizontal Layout](#horizontal-layout)
- [Vertical Layout](#vertical-layout)
- [Auto Layout](#auto-layout)
- [Levels Configuration](#levels-configuration)
- [Advanced Layout Techniques](#advanced-layout-techniques)
- [Layout Best Practices](#layout-best-practices)

## Overview

TreeMap layout controls how rectangles are arranged and nested. Levels configuration defines how hierarchical data is displayed across multiple layers. Together, these features allow you to optimize visual hierarchy and readability for your specific data.

### Core Layout Properties

| Property | Purpose | Default |
|----------|---------|---------|
| **LayoutType** | How rectangles are positioned | Squarified |
| **Levels** | Hierarchical grouping configuration | None |
| **GroupPath** | Property name for grouping (per level) | None |
| **GroupIdPath** | ID for group identification | None |
| **GroupColorValuePath** | Color value for group | None |

## Layout Types

TreeMap supports four distinct layout algorithms, each optimizing for different data visualization needs.

### Squarified Layout (Default)

Squarified layout arranges rectangles as close to squares as possible, minimizing aspect ratio distortion. This is the default and most commonly used layout.

**When to use:**
- General-purpose data visualization
- When you want uniform, balanced rectangle sizes
- Mixed data ranges
- Default choice unless specific need otherwise

**Characteristics:**
- ✅ Most balanced visual appearance
- ✅ Best for human perception (closest to squares)
- ✅ Handles varied data ranges well
- ✅ Default layout type
- ❌ Less predictable ordering than other layouts

**Example:**

```razor
@Html.EJS().TreeMap("container")
    .DataSource(Model)
    .WeightValuePath("Value")
    .LayoutType(TreemapLayoutType.Squarified)  // Explicit (also default)
    .Levels(levels =>
    {
        levels.GroupPath("Category").Add();
    })
    .Render();
```

### Horizontal Layout

Horizontal layout arranges rectangles in horizontal strips or rows. Items flow left to right, then down to the next row.

**When to use:**
- Wide displays or dashboards
- Data that naturally flows left-to-right
- Timeline or sequential data
- Widescreen presentations

**Characteristics:**
- ✅ Predictable horizontal flow
- ✅ Good for wide layouts
- ✅ Clear left-to-right reading order
- ❌ Tall, narrow rectangles on narrow screens
- ❌ Less square-like than Squarified

**Example:**

```csharp
// Controller
public ActionResult HorizontalLayout()
{
    var data = new List<object>
    {
        new { Month = "Jan", Sales = 150 },
        new { Month = "Feb", Sales = 200 },
        new { Month = "Mar", Sales = 175 },
        new { Month = "Apr", Sales = 220 },
        new { Month = "May", Sales = 180 },
        new { Month = "Jun", Sales = 240 }
    };
    return View(data);
}
```

**View:**
```razor
@Model List<object>

@Html.EJS().TreeMap("container")
    .DataSource(Model)
    .WeightValuePath("Sales")
    .LayoutType(TreemapLayoutType.Horizontal)
    .Levels(levels =>
    {
        levels.GroupPath("Month").Add();
    })
    .LeafItemSettings(leaf => leaf.LabelPath("Month"))
    .Render();

<style>
    #container {
        height: 400px;
        width: 800px;  /* Wide layout */
    }
</style>
```

**Expected Output:**
- Rectangles arranged in horizontal rows
- June (largest, 240 sales) positioned prominently
- Rectangles wider than they are tall

### Vertical Layout

Vertical layout arranges rectangles in vertical strips or columns. Items flow top to bottom, then right to the next column.

**When to use:**
- Tall displays or portrait-oriented screens
- Data naturally organized in columns
- Mobile or narrow-width layouts
- Vertical scrolling content

**Characteristics:**
- ✅ Predictable vertical flow
- ✅ Good for tall displays
- ✅ Clear top-to-bottom reading order
- ❌ Wide, short rectangles on wide screens
- ❌ Less square-like than Squarified

**Example:**

```razor
@Html.EJS().TreeMap("container")
    .DataSource(Model)
    .WeightValuePath("Value")
    .LayoutType(TreemapLayoutType.Vertical)
    .Levels(levels =>
    {
        levels.GroupPath("Category").Add();
    })
    .LeafItemSettings(leaf => leaf.LabelPath("Category"))
    .Render();

<style>
    #container {
        height: 800px;  /* Tall layout */
        width: 400px;   /* Narrow width */
    }
</style>
```

**Expected Output:**
- Rectangles arranged in vertical columns
- Items flow top to bottom per column
- Rectangles taller than they are wide

### Auto Layout

Auto layout selects between horizontal and vertical based on container dimensions. It automatically adapts to the available space.

**When to use:**
- Responsive designs that adapt to screen size
- Unknown or variable container dimensions
- Multi-device support (desktop, tablet, mobile)
- Dynamic layouts

**Characteristics:**
- ✅ Automatically adapts to container
- ✅ Best for responsive design
- ✅ Optimizes for available space
- ✅ No manual width/height management needed
- ❌ Layout may change unexpectedly on resize

**Example:**

```razor
@Html.EJS().TreeMap("container")
    .DataSource(Model)
    .WeightValuePath("Value")
    .LayoutType(TreemapLayoutType.Auto)  // Automatically chooses layout
    .Levels(levels =>
    {
        levels.GroupPath("Category").Add();
    })
    .Render();

<style>
    #container {
        height: 100%;  /* Fill available space */
        width: 100%;
    }
</style>
```

**Expected Output:**
- On wide containers: Horizontal-like layout
- On tall containers: Vertical-like layout
- Adapts automatically to window resizing

## Levels Configuration

Levels define how hierarchical data is grouped and displayed. Each level corresponds to a hierarchy depth (parent group, child group, etc.).

### Single-Level Configuration

For flat data with one grouping level:

```razor
@Html.EJS().TreeMap("container")
    .DataSource(new List<object>
    {
        new { Department = "Sales", Employees = 45 },
        new { Department = "Engineering", Employees = 120 },
        new { Department = "Marketing", Employees = 30 }
    })
    .WeightValuePath("Employees")
    .Levels(levels =>
    {
        levels.GroupPath("Department").Add();
    })
    .Render();
```

**Result:** Groups items by Department, creating rectangles for Sales, Engineering, Marketing.

### Two-Level Hierarchy

For data with parent-child relationships:

```csharp
// Controller data
var data = new List<object>
{
    // Level 1: Regions
    new { Id = 1, ParentId = null, Name = "North America", Value = 100 },
    new { Id = 2, ParentId = null, Name = "Europe", Value = 80 },
    
    // Level 2: Countries
    new { Id = 3, ParentId = 1, Name = "USA", Value = 70 },
    new { Id = 4, ParentId = 1, Name = "Canada", Value = 30 },
    new { Id = 5, ParentId = 2, Name = "Germany", Value = 50 },
    new { Id = 6, ParentId = 2, Name = "France", Value = 30 }
};
```

**View with Two Levels:**
```razor
@Html.EJS().TreeMap("container")
    .DataSource(Model)
    .WeightValuePath("Value")
    .Levels(levels =>
    {
        levels.GroupPath("Name").Add();  // Level 1: Regions
        levels.GroupPath("Name").Add();  // Level 2: Countries
    })
    .LeafItemSettings(leaf => leaf.LabelPath("Name"))
    .Render();
```

**Result:**
- Large rectangles for Regions (North America, Europe)
- Smaller rectangles within each region for Countries
- Visible nesting showing parent-child relationship

### Three-Level Hierarchy

For complex data with multiple hierarchy levels:

```csharp
// Controller data
var data = new List<object>
{
    // Level 1: Continent
    new { Id = 1, ParentId = null, Name = "Asia", Value = 200 },
    
    // Level 2: Country
    new { Id = 2, ParentId = 1, Name = "India", Value = 100 },
    
    // Level 3: City
    new { Id = 3, ParentId = 2, Name = "Delhi", Value = 40 },
    new { Id = 4, ParentId = 2, Name = "Mumbai", Value = 60 }
};
```

**View with Three Levels:**
```razor
@Html.EJS().TreeMap("container")
    .DataSource(Model)
    .WeightValuePath("Value")
    .Levels(levels =>
    {
        levels.GroupPath("Name").Add();  // Level 1: Continents
        levels.GroupPath("Name").Add();  // Level 2: Countries
        levels.GroupPath("Name").Add();  // Level 3: Cities
    })
    .LeafItemSettings(leaf => leaf.LabelPath("Name"))
    .Render();
```

**Result:**
- Three-level nesting: Continent → Country → City
- Each level visually contained within its parent
- Nested rectangle structure clearly shows hierarchy

### Levels Properties

#### GroupPath
Specifies the property name used for grouping at each level:

```razor
.Levels(levels =>
{
    levels.GroupPath("Continent").Add();   // Level 1: Group by continent
    levels.GroupPath("Country").Add();     // Level 2: Group by country
})
```

#### GroupIdPath (Optional)
Specifies the property name for unique group identification:

```razor
.Levels(levels =>
{
    levels.GroupPath("Department")
          .GroupIdPath("DepartmentId")
          .Add();
})
```

#### GroupColorValuePath (Optional)
Specifies which property determines group color:

```razor
.Levels(levels =>
{
    levels.GroupPath("Category")
          .GroupColorValuePath("Performance")
          .Add();
})
```

## Advanced Layout Techniques

### Combining Layouts with Color Mapping

Apply layout with color mapping for visual clarity:

```razor
@Html.EJS().TreeMap("container")
    .DataSource(Model)
    .WeightValuePath("Revenue")
    .RangeColorValuePath("Revenue")
    .LayoutType(TreemapLayoutType.Squarified)
    .ColorMapping(colors =>
    {
        colors.From(0).To(1000).Color("Red").Add();
        colors.From(1000).To(5000).Color("Yellow").Add();
        colors.From(5000).To(10000).Color("Green").Add();
    })
    .Levels(levels =>
    {
        levels.GroupPath("Region").Add();
        levels.GroupPath("Country").Add();
    })
    .Render();
```

### Layout with Padding and Spacing

Add visual separation between items:

```razor
@Html.EJS().TreeMap("container")
    .DataSource(Model)
    .LayoutType(TreemapLayoutType.Horizontal)
    .Padding(2)  // 2px gap between items
    .Levels(levels =>
    {
        levels.GroupPath("Category").Add();
    })
    .Render();
```

### Responsive Layout Selection

Change layout based on screen size:

```csharp
// JavaScript
function handleResize() {
    var width = window.innerWidth;
    var treemap = document.getElementById('container').ej2_instances[0];
    
    if (width > 1000) {
        treemap.layoutType = 'Horizontal';  // Wide screen
    } else if (width > 600) {
        treemap.layoutType = 'Squarified';  // Medium screen
    } else {
        treemap.layoutType = 'Vertical';    // Mobile
    }
}

window.addEventListener('resize', handleResize);
```

## Layout Best Practices

### 1. Choose Layout Based on Data

| Data Type | Recommended Layout | Reason |
|-----------|-------------------|--------|
| **Time Series** | Horizontal | Natural left-to-right flow |
| **Hierarchical** | Squarified | Balanced, most readable |
| **Mobile View** | Vertical | Fits narrow screens |
| **Dashboard** | Auto | Adapts to container |
| **Comparison** | Squarified | Equal visual weight |

### 2. Consider Container Dimensions

```csharp
// Wide container (1200+ pixels)
.LayoutType(TreemapLayoutType.Horizontal)

// Square container
.LayoutType(TreemapLayoutType.Squarified)

// Tall container (mobile)
.LayoutType(TreemapLayoutType.Vertical)

// Unknown/responsive
.LayoutType(TreemapLayoutType.Auto)
```

### 3. Limit Hierarchy Depth

More than 3 levels becomes hard to visualize:

```razor
// ✅ Good: 2-3 levels
.Levels(levels =>
{
    levels.GroupPath("Region").Add();
    levels.GroupPath("Country").Add();
})

// ⚠️ Acceptable: 3 levels
.Levels(levels =>
{
    levels.GroupPath("Region").Add();
    levels.GroupPath("Country").Add();
    levels.GroupPath("City").Add();
})

// ❌ Avoid: 5+ levels (too complex)
```

### 4. Use Clear GroupPath Names

```csharp
// ✅ Clear
.GroupPath("Department")
.GroupPath("Team")

// ❌ Vague
.GroupPath("Group1")
.GroupPath("Group2")
```

### 5. Match Layout to Display

```razor
// Desktop (wide layout)
<div id="treemap-desktop" style="height: 600px; width: 1200px;">
    @Html.EJS().TreeMap("treemap-desktop")
        .LayoutType(TreemapLayoutType.Horizontal)
        .Render();
</div>

// Mobile (vertical layout)
<div id="treemap-mobile" style="height: 800px; width: 100%;">
    @Html.EJS().TreeMap("treemap-mobile")
        .LayoutType(TreemapLayoutType.Vertical)
        .Render();
</div>
```

### 6. Document Your Hierarchy

Add comments explaining levels:

```razor
@Html.EJS().TreeMap("container")
    .DataSource(Model)
    .Levels(levels =>
    {
        // Level 1: Top-level grouping by product line
        levels.GroupPath("ProductLine").Add();
        
        // Level 2: Sub-grouping by product category
        levels.GroupPath("Category").Add();
    })
    .Render();
```

## Troubleshooting Layout and Levels

### Issue: Rectangles Not Grouped Correctly

**Cause:** GroupPath property name doesn't match data.

**Solution:**
1. Verify GroupPath matches your data property names
2. Check property name case (case-sensitive)
3. Ensure property exists in your data

```csharp
// ✅ Correct
.GroupPath("Department")
data: new { Department = "Sales", ... }

// ❌ Incorrect
.GroupPath("Dept")  // Doesn't match "Department"
data: new { Department = "Sales", ... }
```

### Issue: Single Large Rectangle Instead of Multiple

**Cause:** Missing or incorrect Levels configuration.

**Solution:**
```razor
// ✅ Correct: Levels defined
.Levels(levels =>
{
    levels.GroupPath("Category").Add();
})

// ❌ Incorrect: No levels
// (Missing .Levels() - all data in one rectangle)
```

### Issue: Hierarchy Not Visible

**Cause:** Multi-level data but only one GroupPath defined.

**Solution:**
```csharp
// Data with 2 levels
var data = new List<object>
{
    new { Category = "A", SubCategory = "A1", Value = 100 }
};

// ✅ Correct: Define both levels
.Levels(levels =>
{
    levels.GroupPath("Category").Add();
    levels.GroupPath("SubCategory").Add();
})

// ❌ Incorrect: Only one level defined
.Levels(levels =>
{
    levels.GroupPath("Category").Add();
})
```

### Issue: Layout Changes Unexpectedly

**Cause:** Using Auto layout on screen resize.

**Solution:**
1. Use fixed layout type if layout should not change
2. Or intentionally use Auto for responsive behavior

```razor
// ✅ If you want fixed layout
.LayoutType(TreemapLayoutType.Squarified)

// ✅ If you want responsive
.LayoutType(TreemapLayoutType.Auto)

// ❌ Switching between layouts dynamically
// (causes unexpected changes)
```

### Issue: Text Labels Overlap in Narrow Rectangles

**Cause:** Vertical or Horizontal layout creates long, thin rectangles.

**Solution:**
1. Use Squarified layout for better text fit
2. Use Auto layout to adapt
3. Hide labels on small items

```razor
// Change layout
.LayoutType(TreemapLayoutType.Squarified)

// Or hide labels for small items
.LeafItemSettings(leaf =>
{
    leaf.LabelPath("Name")
        .Gap(5);  // Add gap for text visibility
})
```

