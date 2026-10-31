# Configuring Dashboard Layout Grid System

## Table of Contents
- [Understanding the Grid System](#understanding-the-grid-system)
- [Columns Property](#columns-property)
- [Cell Spacing Configuration](#cell-spacing-configuration)
- [Cell Aspect Ratio](#cell-aspect-ratio)
- [Panel Positioning](#panel-positioning)
- [Layout Structure Examples](#layout-structure-examples)
- [Advanced Configuration Patterns](#advanced-configuration-patterns)

## Understanding the Grid System

The Dashboard Layout uses a grid-based system where content is arranged in a flexible grid. The grid consists of:

- **Columns** - Number of vertical divisions in the grid
- **Rows** - Automatically calculated based on panel placement
- **Cells** - Individual grid units where panels are placed
- **Cell Spacing** - Gaps between adjacent panels

Every panel occupies one or more grid cells defined by its width (sizeX) and height (sizeY) in cell units, not pixels.

## Columns Property

The `columns` property defines the number of vertical divisions in your dashboard layout. This is the primary parameter that controls your grid structure.

### Basic Column Configuration

```html
<!-- 2-column layout -->
<ejs-dashboardlayout id="dashboard2" columns="2">
    <e-dashboardlayout-panels>
        <e-dashboardlayout-panel id="panel1" sizeX="1" sizeY="1" row="0" col="0" 
                                 header="<div>Panel 1</div>" 
                                 content="<div>Left side content</div>">
        </e-dashboardlayout-panel>
        <e-dashboardlayout-panel id="panel2" sizeX="1" sizeY="1" row="0" col="1" 
                                 header="<div>Panel 2</div>" 
                                 content="<div>Right side content</div>">
        </e-dashboardlayout-panel>
    </e-dashboardlayout-panels>
</ejs-dashboardlayout>

<!-- 3-column layout -->
<ejs-dashboardlayout id="dashboard3" columns="3">
    <e-dashboardlayout-panels>
        <e-dashboardlayout-panel id="panel1" sizeX="1" sizeY="1" row="0" col="0" 
                                 header="<div>Panel 1</div>" 
                                 content="<div>Content</div>">
        </e-dashboardlayout-panel>
        <e-dashboardlayout-panel id="panel2" sizeX="1" sizeY="1" row="0" col="1" 
                                 header="<div>Panel 2</div>" 
                                 content="<div>Content</div>">
        </e-dashboardlayout-panel>
        <e-dashboardlayout-panel id="panel3" sizeX="1" sizeY="1" row="0" col="2" 
                                 header="<div>Panel 3</div>" 
                                 content="<div>Content</div>">
        </e-dashboardlayout-panel>
    </e-dashboardlayout-panels>
</ejs-dashboardlayout>

<!-- 6-column layout (most common for dashboards) -->
<ejs-dashboardlayout id="dashboard6" columns="6">
    <e-dashboardlayout-panels>
        <!-- Panels can span 1, 2, 3, or 6 columns -->
    </e-dashboardlayout-panels>
</ejs-dashboardlayout>
```

### Column Count Best Practices

- **Columns="2"** - Simple 2-panel layouts, side-by-side content
- **Columns="3"** - Three-column layouts, balanced spacing
- **Columns="4"** - Four-panel grids, squared content areas
- **Columns="6"** - Most flexible, supports 1, 2, 3, or 6-column panels
- **Columns="12"** - Maximum granularity, similar to Bootstrap 12-column system

For most dashboard applications, a 6-column layout provides the best balance between flexibility and layout control.

### Dynamic Column Configuration

Configure columns from your C# model based on user preferences or responsive design:

In `DashboardLayout.cshtml.cs`:

```csharp
public class DashboardLayoutModel : PageModel
{
    public int DashboardColumns { get; set; }

    public void OnGet(string layout = "default")
    {
        // Vary columns based on layout selection
        DashboardColumns = layout switch
        {
            "compact" => 4,
            "standard" => 6,
            "expanded" => 12,
            _ => 6
        };
    }
}
```

In `DashboardLayout.cshtml`:

```html
<ejs-dashboardlayout id="dashboard" columns="@Model.DashboardColumns">
    <!-- Panels -->
</ejs-dashboardlayout>
```

## Cell Spacing Configuration

Cell spacing defines the gaps between adjacent panels both horizontally and vertically. The `cellSpacing` property accepts an array with two values: `[horizontal, vertical]`.

### Basic Cell Spacing

```html
@{
    var defaultSpacing = new double[] { 5, 5 };
    var customSpacing = new double[] { 10, 15 };
    var noSpacing = new double[] { 0, 0 };
    var largeSpacing = new double[] { 20, 25 };
}

<!-- Default spacing [5, 5] pixels -->
<ejs-dashboardlayout id="dashboard" columns="6" cellSpacing="@defaultSpacing">
    <!-- Panels with 5px horizontal and 5px vertical spacing -->
</ejs-dashboardlayout>

<!-- Custom spacing: 10px horizontal, 15px vertical -->
<ejs-dashboardlayout id="dashboard" 
                      columns="6" 
                      cellSpacing="@customSpacing">
    <!-- Panels with 10px horizontal and 15px vertical spacing -->
</ejs-dashboardlayout>

<!-- No spacing between panels -->
<ejs-dashboardlayout id="dashboard" 
                      columns="6" 
                      cellSpacing="@noSpacing">
    <!-- Panels touching each other -->
</ejs-dashboardlayout>

<!-- Large spacing for visual separation -->
<ejs-dashboardlayout id="dashboard" 
                      columns="6" 
                      cellSpacing="@largeSpacing">
    <!-- Panels with generous spacing -->
</ejs-dashboardlayout>
```

### Cell Spacing in Page Model

Define cell spacing in your C# code for consistency across multiple dashboards:

```csharp
public class DashboardLayoutModel : PageModel
{
    public double[] DefaultSpacing => new double[] { 10, 10 };
    public double[] CompactSpacing => new double[] { 5, 5 };
    public double[] LargeSpacing => new double[] { 20, 20 };

    public void OnGet()
    {
        // Use DefaultSpacing in your view
    }
}
```

In your view:

```html
<ejs-dashboardlayout id="dashboard" 
                      columns="6" 
                      cellSpacing="@Model.DefaultSpacing">
    <!-- Panels -->
</ejs-dashboardlayout>
```

## Cell Aspect Ratio

The `cellAspectRatio` property controls the width-to-height ratio of grid cells. This affects how square or rectangular your grid cells appear.

### Setting Cell Aspect Ratio

```html
<!-- Square cells (1:1 ratio) - default -->
<ejs-dashboardlayout id="dashboard1" columns="6" cellAspectRatio="1">
    <!-- Each cell is square -->
</ejs-dashboardlayout>

<!-- Wider cells (1.5:1 ratio) -->
<ejs-dashboardlayout id="dashboard2" columns="6" cellAspectRatio="1.5">
    <!-- Cells are 1.5 times wider than tall -->
</ejs-dashboardlayout>

<!-- Taller cells (0.67:1 ratio) -->
<ejs-dashboardlayout id="dashboard3" columns="6" cellAspectRatio="0.67">
    <!-- Cells are narrower and taller -->
</ejs-dashboardlayout>

<!-- Very wide cells (2:1 ratio) -->
<ejs-dashboardlayout id="dashboard4" columns="6" cellAspectRatio="2">
    <!-- Cells are twice as wide as they are tall -->
</ejs-dashboardlayout>
```

### Aspect Ratio Impact

- **AspectRatio="1"** (square) - Default, balanced appearance
- **AspectRatio="1.5"** (wider) - Good for chart panels, more horizontal space
- **AspectRatio="2"** (very wide) - Ideal for timeline or horizontal content
- **AspectRatio="0.75"** (taller) - Good for vertical content stacks

### Responsive Aspect Ratios

Adjust aspect ratio based on content type:

```csharp
public class DashboardLayoutModel : PageModel
{
    public double GetAspectRatio(string dashboardType)
    {
        return dashboardType switch
        {
            "charts" => 1.5,      // Wider for charts
            "metrics" => 1.0,     // Square for KPI cards
            "timeline" => 2.0,    // Very wide for timelines
            _ => 1.0
        };
    }
}
```

## Panel Positioning

Panels are positioned within the grid using `row` and `col` properties. These define the starting position of each panel in the grid.

### Understanding Row and Column Indexing

- **row** - The vertical position (0-based index from top)
- **col** - The horizontal position (0-based index from left)
- **sizeX** - Panel width in grid cells
- **sizeY** - Panel height in grid cells

### Basic Panel Positioning

```html
<ejs-dashboardlayout id="dashboard" columns="6">
    <e-dashboardlayout-panels>
        <!-- Panel at row 0, col 0, spanning 2 columns and 1 row -->
        <e-dashboardlayout-panel id="panel1" row="0" col="0" sizeX="2" sizeY="1" 
                                 header="<div>Top Left</div>" 
                                 content="<div>Content</div>">
        </e-dashboardlayout-panel>

        <!-- Panel at row 0, col 2, spanning 4 columns and 2 rows -->
        <e-dashboardlayout-panel id="panel2" row="0" col="2" sizeX="4" sizeY="2" 
                                 header="<div>Top Right</div>" 
                                 content="<div>Content</div>">
        </e-dashboardlayout-panel>

        <!-- Panel at row 1, col 0, spanning 2 columns and 1 row -->
        <e-dashboardlayout-panel id="panel3" row="1" col="0" sizeX="2" sizeY="1" 
                                 header="<div>Middle Left</div>" 
                                 content="<div>Content</div>">
        </e-dashboardlayout-panel>

        <!-- Panel at row 2, col 0, spanning 6 columns and 1 row (full width) -->
        <e-dashboardlayout-panel id="panel4" row="2" col="0" sizeX="6" sizeY="1" 
                                 header="<div>Full Width</div>" 
                                 content="<div>Content</div>">
        </e-dashboardlayout-panel>
    </e-dashboardlayout-panels>
</ejs-dashboardlayout>
```

### Common Layout Patterns

```html
<!-- 2x2 Grid Layout -->
<ejs-dashboardlayout id="grid2x2" columns="2">
    <e-dashboardlayout-panels>
        <e-dashboardlayout-panel id="p1" row="0" col="0" sizeX="1" sizeY="1" 
                                 header="<div>Panel 1</div>" 
                                 content="<div>Top Left</div>">
        </e-dashboardlayout-panel>
        <e-dashboardlayout-panel id="p2" row="0" col="1" sizeX="1" sizeY="1" 
                                 header="<div>Panel 2</div>" 
                                 content="<div>Top Right</div>">
        </e-dashboardlayout-panel>
        <e-dashboardlayout-panel id="p3" row="1" col="0" sizeX="1" sizeY="1" 
                                 header="<div>Panel 3</div>" 
                                 content="<div>Bottom Left</div>">
        </e-dashboardlayout-panel>
        <e-dashboardlayout-panel id="p4" row="1" col="1" sizeX="1" sizeY="1" 
                                 header="<div>Panel 4</div>" 
                                 content="<div>Bottom Right</div>">
        </e-dashboardlayout-panel>
    </e-dashboardlayout-panels>
</ejs-dashboardlayout>

<!-- Sidebar + Main Content Layout -->
<ejs-dashboardlayout id="sidebar-layout" columns="4">
    <e-dashboardlayout-panels>
        <!-- Sidebar panel (narrower) -->
        <e-dashboardlayout-panel id="sidebar" row="0" col="0" sizeX="1" sizeY="3" 
                                 header="<div>Navigation</div>" 
                                 content="<div>Sidebar content</div>">
        </e-dashboardlayout-panel>

        <!-- Main content area (wider) -->
        <e-dashboardlayout-panel id="main-content" row="0" col="1" sizeX="3" sizeY="3" 
                                 header="<div>Main Content</div>" 
                                 content="<div>Main dashboard content</div>">
        </e-dashboardlayout-panel>
    </e-dashboardlayout-panels>
</ejs-dashboardlayout>

<!-- Asymmetric Layout -->
<ejs-dashboardlayout id="asymmetric" columns="6">
    <e-dashboardlayout-panels>
        <!-- Large main panel -->
        <e-dashboardlayout-panel id="main" row="0" col="0" sizeX="4" sizeY="2" 
                                 header="<div>Main Report</div>" 
                                 content="<div>Large content area</div>">
        </e-dashboardlayout-panel>

        <!-- Two smaller panels stacked on the right -->
        <e-dashboardlayout-panel id="top-right" row="0" col="4" sizeX="2" sizeY="1" 
                                 header="<div>KPI 1</div>" 
                                 content="<div>Metric 1</div>">
        </e-dashboardlayout-panel>
        <e-dashboardlayout-panel id="bottom-right" row="1" col="4" sizeX="2" sizeY="1" 
                                 header="<div>KPI 2</div>" 
                                 content="<div>Metric 2</div>">
        </e-dashboardlayout-panel>
    </e-dashboardlayout-panels>
</ejs-dashboardlayout>
```

## Layout Structure Examples

### Example 1: Sales Dashboard (6-Column Layout)

```html
@{
    var cellSpacing = new double[] { 10, 10 };
}

<ejs-dashboardlayout id="sales-dashboard" 
                      columns="6" 
                      cellSpacing="@cellSpacing"
                      allowDragging="true"
                      allowFloating="true">
    <e-dashboardlayout-panels>
        <!-- Top row: Key metrics -->
        <e-dashboardlayout-panel id="total-sales" row="0" col="0" sizeX="2" sizeY="1" 
                                 header="<div>Total Sales</div>"
                                 content="<div><strong>$2.5M</strong></div>">
        </e-dashboardlayout-panel>
        <e-dashboardlayout-panel id="avg-order" row="0" col="2" sizeX="2" sizeY="1" 
                                 header="<div>Avg Order Value</div>"
                                 content="<div><strong>$450</strong></div>">
        </e-dashboardlayout-panel>
        <e-dashboardlayout-panel id="conversion" row="0" col="4" sizeX="2" sizeY="1" 
                                 header="<div>Conversion Rate</div>"
                                 content="<div><strong>3.2%</strong></div>">
        </e-dashboardlayout-panel>

        <!-- Middle row: Charts -->
        <e-dashboardlayout-panel id="sales-chart" row="1" col="0" sizeX="3" sizeY="2" 
                                 header="<div>Sales Trend</div>"
                                 content="<div>Chart placeholder</div>">
        </e-dashboardlayout-panel>
        <e-dashboardlayout-panel id="category-breakdown" row="1" col="3" sizeX="3" sizeY="2" 
                                 header="<div>By Category</div>"
                                 content="<div>Chart placeholder</div>">
        </e-dashboardlayout-panel>

        <!-- Bottom row: Tables -->
        <e-dashboardlayout-panel id="top-products" row="3" col="0" sizeX="6" sizeY="2" 
                                 header="<div>Top Products</div>"
                                 content="<div>Table placeholder</div>">
        </e-dashboardlayout-panel>
    </e-dashboardlayout-panels>
</ejs-dashboardlayout>
```

### Example 2: Analytics Dashboard (12-Column Layout for Fine Control)

```html
@{
    var cellSpacing = new double[] { 15, 15 };
}

<ejs-dashboardlayout id="analytics-dashboard" 
                      columns="12" 
                      cellSpacing="@cellSpacing"
                      allowDragging="true"
                      allowFloating="true">
    <e-dashboardlayout-panels>
        <!-- Header metrics row -->
        <e-dashboardlayout-panel id="visits" row="0" col="0" sizeX="3" sizeY="1" 
                                 header="<div>Visits</div>"
                                 content="<div>125,450</div>">
        </e-dashboardlayout-panel>
        <e-dashboardlayout-panel id="users" row="0" col="3" sizeX="3" sizeY="1" 
                                 header="<div>Unique Users</div>"
                                 content="<div>98,320</div>">
        </e-dashboardlayout-panel>
        <e-dashboardlayout-panel id="bounce-rate" row="0" col="6" sizeX="3" sizeY="1" 
                                 header="<div>Bounce Rate</div>"
                                 content="<div>42.3%</div>">
        </e-dashboardlayout-panel>
        <e-dashboardlayout-panel id="avg-duration" row="0" col="9" sizeX="3" sizeY="1" 
                                 header="<div>Avg Duration</div>"
                                 content="<div>4:32</div>">
        </e-dashboardlayout-panel>

        <!-- Content area -->
        <e-dashboardlayout-panel id="traffic-chart" row="1" col="0" sizeX="7" sizeY="3" 
                                 header="<div>Traffic Over Time</div>"
                                 content="<div>Large chart</div>">
        </e-dashboardlayout-panel>
        <e-dashboardlayout-panel id="referrers" row="1" col="7" sizeX="5" sizeY="3" 
                                 header="<div>Top Referrers</div>"
                                 content="<div>Referrer list</div>">
        </e-dashboardlayout-panel>
    </e-dashboardlayout-panels>
</ejs-dashboardlayout>
```

## Advanced Configuration Patterns

### Pattern 1: Responsive Configuration

Create different configurations for different screen sizes:

```csharp
public class DashboardLayoutModel : PageModel
{
    public LayoutConfig GetLayoutConfig(string deviceType)
    {
        return deviceType switch
        {
            "mobile" => new LayoutConfig 
            { 
                Columns = 2,
                CellSpacing = new double[] { 5, 5 }
            },
            "tablet" => new LayoutConfig 
            { 
                Columns = 4,
                CellSpacing = new double[] { 8, 8 }
            },
            "desktop" => new LayoutConfig 
            { 
                Columns = 6,
                CellSpacing = new double[] { 10, 10 }
            },
            _ => new LayoutConfig { Columns = 6, CellSpacing = new double[] { 10, 10 } }
        };
    }
}

public class LayoutConfig
{
    public int Columns { get; set; }
    public double[] CellSpacing { get; set; }
}
```

### Pattern 2: Template-Based Layout Presets

Store common layout configurations:

```csharp
public class LayoutPresets
{
    public static class Sales
    {
        public const int Columns = 6;
        public static double[] CellSpacing = new double[] { 10, 10 };
    }

    public static class Analytics
    {
        public const int Columns = 12;
        public static double[] CellSpacing = new double[] { 15, 15 };
    }

    public static class Financial
    {
        public const int Columns = 4;
        public static double[] CellSpacing = new double[] { 8, 8 };
    }
}
```

Usage in view:

```html
<ejs-dashboardlayout id="dashboard" 
                      columns="@LayoutPresets.Sales.Columns"
                      cellSpacing="@LayoutPresets.Sales.CellSpacing">
    <!-- Panels -->
</ejs-dashboardlayout>
```

### Pattern 3: Grid Visualization Helper

Enable grid lines to visualize your layout during development:

```html
<ejs-dashboardlayout id="dashboard" 
                      columns="6"
                      showGridLines="true">
    <!-- Grid lines visible in development -->
</ejs-dashboardlayout>
```

Set to `false` in production:

```html
<ejs-dashboardlayout id="dashboard" 
                      columns="6"
                      showGridLines="@(ViewData["ShowGridLines"] ?? false)">
    <!-- Grid lines hidden in production -->
</ejs-dashboardlayout>
```

