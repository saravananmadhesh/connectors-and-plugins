# Responsive Layouts

## Table of Contents
- [Overview](#overview)
- [Enabling Responsive Behavior](#enabling-responsive-behavior)
- [Media Query Configuration](#media-query-configuration)
- [Floating Panels](#floating-panels)
- [RTL Support](#rtl-support)
- [Mobile Optimization](#mobile-optimization)
- [Adaptive Layout Patterns](#adaptive-layout-patterns)
- [Complete Responsive Examples](#complete-responsive-examples)

## Overview

Dashboard Layout provides responsive capabilities through the `mediaQuery` property (default: 'max-width:600px') and floating panel support via `allowFloating` (default: true). These features allow dashboards to adapt their layout across different screen sizes and orientations. The `enableRtl` property adds support for right-to-left languages, ensuring your dashboard works seamlessly in international applications.

## Enabling Responsive Behavior

### Floating Panels

The `allowFloating` property enables panels to float above other panels when there's insufficient space:

```html
<!-- Enable floating panels -->
<ejs-dashboardlayout id="dashboard" 
                      allowFloating="true"
                      columns="6">
    <e-dashboardlayout-panels>
        <e-dashboardlayout-panel id="panel1" sizeX="3" sizeY="1" row="0" col="0"
                                 header="<div>Panel 1</div>"
                                 content="<div>This panel can float</div>">
        </e-dashboardlayout-panel>
        <e-dashboardlayout-panel id="panel2" sizeX="3" sizeY="1" row="0" col="3"
                                 header="<div>Panel 2</div>"
                                 content="<div>This panel can also float</div>">
        </e-dashboardlayout-panel>
    </e-dashboardlayout-panels>
</ejs-dashboardlayout>
```

### RTL Support

The `enableRtl` property enables right-to-left layout for languages like Arabic and Hebrew:

```html
<!-- Enable RTL (right-to-left) layout -->
<ejs-dashboardlayout id="dashboard" 
                      enableRtl="true"
                      columns="6">
    <e-dashboardlayout-panels>
        <e-dashboardlayout-panel id="panel1" sizeX="2" sizeY="1" row="0" col="0"
                                 header="<div>لوحة المعلومات</div>"
                                 content="<div>محتوى اللوحة</div>">
        </e-dashboardlayout-panel>
    </e-dashboardlayout-panels>
</ejs-dashboardlayout>
```

### Toggling Responsive Features at Runtime

```javascript
var dashboardObj = document.getElementById('dashboard').ej2_instances[0];

// Enable floating
dashboardObj.allowFloating = true;

// Enable RTL
dashboardObj.enableRtl = true;
```

## Media Query Configuration

### Understanding Media Queries

The `mediaQuery` property defines breakpoints for responsive layout adjustments. When the viewport width matches a media query, the dashboard layout responds by adjusting columns and panel sizes.

### Basic Media Query Setup

```html
<ejs-dashboardlayout id="dashboard" 
                      columns="6"
                      mediaQuery="(max-width: 768px)">
    <e-dashboardlayout-panels>
        <e-dashboardlayout-panel id="panel1" sizeX="2" sizeY="1" row="0" col="0"
                                 header="<div>Responsive Panel</div>"
                                 content="<div>Adjusts for smaller screens</div>">
        </e-dashboardlayout-panel>
    </e-dashboardlayout-panels>
</ejs-dashboardlayout>
```

### Multiple Media Query Breakpoints in C#

```csharp
public class DashboardLayoutModel : PageModel
{
    public string[] GetResponsiveBreakpoints()
    {
        return new string[]
        {
            "(max-width: 480px)",    // Mobile
            "(max-width: 768px)",    // Tablet
            "(min-width: 769px and max-width: 1024px)",  // Small Desktop
            "(min-width: 1025px)"    // Large Desktop
        };
    }

    public Dictionary<string, int> GetColumnsForBreakpoint()
    {
        return new Dictionary<string, int>
        {
            { "(max-width: 480px)", 1 },      // 1 column on mobile
            { "(max-width: 768px)", 2 },      // 2 columns on tablet
            { "(min-width: 769px and max-width: 1024px)", 3 },  // 3 on small desktop
            { "(min-width: 1025px)", 6 }      // 6 columns on large desktop
        };
    }
}
```

### Responsive Layout Configuration Example

```html
<!-- Mobile-first responsive layout -->
<ejs-dashboardlayout id="dashboard" 
                      columns="1"
                      mediaQuery="(max-width: 768px)"
                      allowFloating="true">
    <e-dashboardlayout-panels>
        <e-dashboardlayout-panel id="kpi-1" sizeX="1" sizeY="1" row="0" col="0"
                                 header="<div>Revenue</div>"
                                 content="<div>$125,000</div>">
        </e-dashboardlayout-panel>
        <e-dashboardlayout-panel id="kpi-2" sizeX="1" sizeY="1" row="1" col="0"
                                 header="<div>Orders</div>"
                                 content="<div>1,234</div>">
        </e-dashboardlayout-panel>
        <e-dashboardlayout-panel id="chart-1" sizeX="1" sizeY="2" row="2" col="0"
                                 header="<div>Sales Trend</div>"
                                 content="<div>Chart component here</div>">
        </e-dashboardlayout-panel>
    </e-dashboardlayout-panels>
</ejs-dashboardlayout>
```

## Floating Panels

### How Floating Works

When `allowFloating` is enabled and layout space is insufficient:
- Panels automatically adjust their stack position
- Panels can overlay others instead of pushing them off-screen
- Floating is useful for complex responsive layouts

### Floating with Size Constraints

```html
<ejs-dashboardlayout id="dashboard" 
                      allowFloating="true"
                      columns="6"
                      mediaQuery="(max-width: 768px)">
    <e-dashboardlayout-panels>
        <!-- These panels will float on small screens -->
        <e-dashboardlayout-panel id="sidebar" sizeX="2" sizeY="3" row="0" col="0"
                                 header="<div>Sidebar</div>"
                                 content="<div>Navigation content</div>">
        </e-dashboardlayout-panel>
        <e-dashboardlayout-panel id="main" sizeX="4" sizeY="3" row="0" col="2"
                                 header="<div>Main Content</div>"
                                 content="<div>Main dashboard content</div>">
        </e-dashboardlayout-panel>
    </e-dashboardlayout-panels>
</ejs-dashboardlayout>

<script>
    document.addEventListener('DOMContentLoaded', function() {
        var dashboardObj = document.getElementById('dashboard').ej2_instances[0];
        
        dashboardObj.addEventListener('change', function(args) {
            if (window.innerWidth <= 768) {
                // On mobile, floating is active
                console.log('Floating mode: active');
            }
        });
    });
</script>
```

## RTL Support

### Setting RTL Direction

```html
<!-- ASP.NET Core view with RTL support -->
<ejs-dashboardlayout id="dashboard" 
                      enableRtl="true"
                      columns="6"
                      class="e-rtl">
    <e-dashboardlayout-panels>
        <e-dashboardlayout-panel id="panel1" sizeX="2" sizeY="1" row="0" col="0"
                                 header="<div>لوحة</div>"
                                 content="<div>محتوى</div>">
        </e-dashboardlayout-panel>
    </e-dashboardlayout-panels>
</ejs-dashboardlayout>
```

### RTL with CSS

```html
<html dir="rtl">
<head>
    <link href="https://cdn.jsdelivr.net/npm/@syncfusion/ej2-base/styles/material.css" rel="stylesheet" />
    <link href="https://cdn.jsdelivr.net/npm/@syncfusion/ej2-layouts/styles/material.css" rel="stylesheet" />
</head>
<body>
    <ejs-dashboardlayout id="dashboard" enableRtl="true">
        <e-dashboardlayout-panels>
            <!-- Panels -->
        </e-dashboardlayout-panels>
    </ejs-dashboardlayout>
</body>
</html>
```

### Runtime RTL Toggle

```javascript
function toggleRTL() {
    var dashboardObj = document.getElementById('dashboard').ej2_instances[0];
    var htmlElement = document.documentElement;
    
    if (dashboardObj.enableRtl) {
        dashboardObj.enableRtl = false;
        htmlElement.removeAttribute('dir');
    } else {
        dashboardObj.enableRtl = true;
        htmlElement.setAttribute('dir', 'rtl');
    }
}
```

## Mobile Optimization

### Mobile-Specific Configuration

```html
<!-- Mobile-optimized dashboard -->
<ejs-dashboardlayout id="dashboard" 
                      columns="2"
                      mediaQuery="(max-width: 640px)"
                      allowFloating="true"
                      cellSpacing="@(new double[] { 3, 3 })"
                      cellAspectRatio="2">
    <e-dashboardlayout-panels>
        <!-- Small, stacked panels for mobile -->
        <e-dashboardlayout-panel id="mobile-1" sizeX="1" sizeY="1" row="0" col="0"
                                 header="<div>KPI 1</div>"
                                 content="<div>Value 1</div>">
        </e-dashboardlayout-panel>
        <e-dashboardlayout-panel id="mobile-2" sizeX="1" sizeY="1" row="0" col="1"
                                 header="<div>KPI 2</div>"
                                 content="<div>Value 2</div>">
        </e-dashboardlayout-panel>
        <e-dashboardlayout-panel id="mobile-chart" sizeX="2" sizeY="1" row="1" col="0"
                                 header="<div>Chart</div>"
                                 content="<div>Mobile-friendly chart</div>">
        </e-dashboardlayout-panel>
    </e-dashboardlayout-panels>
</ejs-dashboardlayout>
```

### Device Detection and Adaptation

```javascript
function getDeviceType() {
    var width = window.innerWidth;
    
    if (width < 480) {
        return 'mobile';
    } else if (width < 768) {
        return 'tablet';
    } else if (width < 1024) {
        return 'small-desktop';
    } else {
        return 'large-desktop';
    }
}

function applyDeviceSpecificLayout() {
    var dashboardObj = document.getElementById('dashboard').ej2_instances[0];
    var deviceType = getDeviceType();
    var panels = dashboardObj.serialize();
    
    panels.forEach(function(panel) {
        switch(deviceType) {
            case 'mobile':
                panel.sizeX = 2;
                panel.sizeY = Math.ceil(panel.sizeY * 1.5);
                break;
            case 'tablet':
                panel.sizeX = Math.min(panel.sizeX, 3);
                panel.sizeY = Math.ceil(panel.sizeY * 1.2);
                break;
            case 'large-desktop':
                // Use default
                break;
        }
        dashboardObj.updatePanel(panel);
    });
}

window.addEventListener('resize', applyDeviceSpecificLayout);
applyDeviceSpecificLayout();
```

## Adaptive Layout Patterns

### Pattern 1: Progressive Enhancement

```html
<!-- Desktop-first, adapts downward -->
<ejs-dashboardlayout id="dashboard" 
                      columns="6"
                      mediaQuery="(max-width: 1024px)"
                      allowFloating="true">
    <e-dashboardlayout-panels>
        <!-- Large panels on desktop -->
        <e-dashboardlayout-panel id="main-chart" sizeX="4" sizeY="2" row="0" col="0"
                                 header="<div>Revenue Chart</div>"
                                 content="<div>Large chart - optimized for desktop</div>">
        </e-dashboardlayout-panel>
        <e-dashboardlayout-panel id="kpi-panel" sizeX="2" sizeY="2" row="0" col="4"
                                 header="<div>KPIs</div>"
                                 content="<div>Key metrics</div>">
        </e-dashboardlayout-panel>
    </e-dashboardlayout-panels>
</ejs-dashboardlayout>

<script>
    var dashboardObj = document.getElementById('dashboard').ej2_instances[0];
    
    dashboardObj.addEventListener('change', function() {
        var width = window.innerWidth;
        var panelRef = document.getElementById('main-chart');
        
        // Adapt panels based on screen size
        if (width < 768) {
            // Stack on mobile
            dashboardObj.columns = 2;
        } else if (width < 1024) {
            // Intermediate layout
            dashboardObj.columns = 4;
        } else {
            // Full desktop layout
            dashboardObj.columns = 6;
        }
    });
</script>
```

### Pattern 2: Collapsible Sidebar

```html
<div class="dashboard-container">
    <button id="toggleSidebarBtn" class="btn btn-outline-primary">
        <i class="fas fa-bars"></i> Menu
    </button>
    
    <ejs-dashboardlayout id="dashboard" 
                          columns="6"
                          allowDragging="true"
                          allowFloating="true">
        <e-dashboardlayout-panels>
            <e-dashboardlayout-panel id="sidebar" sizeX="1" sizeY="3" row="0" col="0"
                                     header="<div>Navigation</div>"
                                     content="<div>Menu items</div>">
            </e-dashboardlayout-panel>
            <e-dashboardlayout-panel id="content" sizeX="5" sizeY="3" row="0" col="1"
                                     header="<div>Dashboard</div>"
                                     content="<div>Main content</div>">
            </e-dashboardlayout-panel>
        </e-dashboardlayout-panels>
    </ejs-dashboardlayout>
</div>

<style>
    .dashboard-container {
        position: relative;
    }
    
    #toggleSidebarBtn {
        display: none;
        margin-bottom: 10px;
    }
    
    @media (max-width: 768px) {
        #toggleSidebarBtn {
            display: block;
        }
    }
</style>

<script>
    document.getElementById('toggleSidebarBtn').addEventListener('click', function() {
        var sidebar = document.getElementById('sidebar');
        var dashboardObj = document.getElementById('dashboard').ej2_instances[0];
        
        if (sidebar.style.display === 'none') {
            sidebar.style.display = 'block';
        } else {
            sidebar.style.display = 'none';
        }
    });
</script>
```

### Pattern 3: Adaptive Grid Columns

```javascript
var columnBreakpoints = {
    480: { columns: 1, floatingEnabled: true },
    768: { columns: 2, floatingEnabled: true },
    1024: { columns: 4, floatingEnabled: false },
    1440: { columns: 6, floatingEnabled: false }
};

function updateColumnsForWidth() {
    var dashboardObj = document.getElementById('dashboard').ej2_instances[0];
    var width = window.innerWidth;
    var breakpoints = Object.keys(columnBreakpoints)
        .map(Number)
        .sort(function(a, b) { return b - a; });
    
    for (var i = 0; i < breakpoints.length; i++) {
        if (width >= breakpoints[i]) {
            var config = columnBreakpoints[breakpoints[i]];
            dashboardObj.columns = config.columns;
            dashboardObj.allowFloating = config.floatingEnabled;
            console.log('Adjusted to ' + config.columns + ' columns');
            break;
        }
    }
}

window.addEventListener('resize', updateColumnsForWidth);
updateColumnsForWidth();
```

## Complete Responsive Examples

### Example 1: Full Responsive Dashboard

```html
<!-- Responsive dashboard with all features -->
<ejs-dashboardlayout id="dashboard" 
                      columns="6"
                      mediaQuery="(max-width: 768px)"
                      allowFloating="true"
                      allowDragging="true"
                      allowResizing="true"
                      enablePersistence="true"
                      cellSpacing="@(new double[] { 5, 5 })"
                      cellAspectRatio="1"
                      change="onLayoutChange">
    <e-dashboardlayout-panels>
        <e-dashboardlayout-panel id="kpi-1" sizeX="2" sizeY="1" row="0" col="0"
                                 header="<div>Revenue</div>"
                                 content="<div class='kpi-value'>$125,000</div><div class='kpi-label'>Monthly Revenue</div>">
        </e-dashboardlayout-panel>
        <e-dashboardlayout-panel id="kpi-2" sizeX="2" sizeY="1" row="0" col="2"
                                 header="<div>Orders</div>"
                                 content="<div class='kpi-value'>1,234</div><div class='kpi-label'>Total Orders</div>">
        </e-dashboardlayout-panel>
        <e-dashboardlayout-panel id="kpi-3" sizeX="2" sizeY="1" row="0" col="4"
                                 header="<div>Customers</div>"
                                 content="<div class='kpi-value'>567</div><div class='kpi-label'>Active Customers</div>">
        </e-dashboardlayout-panel>
        <e-dashboardlayout-panel id="chart-1" sizeX="4" sizeY="2" row="1" col="0"
                                 header="<div>Sales Trend</div>"
                                 content="<div>Chart placeholder</div>">
        </e-dashboardlayout-panel>
        <e-dashboardlayout-panel id="chart-2" sizeX="2" sizeY="2" row="1" col="4"
                                 header="<div>Top Products</div>"
                                 content="<div>Product list</div>">
        </e-dashboardlayout-panel>
    </e-dashboardlayout-panels>
</ejs-dashboardlayout>

<script>
    function onLayoutChange(args) {
        var width = window.innerWidth;
        var dashboardObj = document.getElementById('dashboard').ej2_instances[0];
        
        if (width < 480) {
            console.log('Mobile layout activated');
        } else if (width < 768) {
            console.log('Tablet layout activated');
        } else {
            console.log('Desktop layout activated');
        }
    }
</script>

<style>
    .kpi-value {
        font-size: 24px;
        font-weight: bold;
        color: #007bff;
    }
    
    .kpi-label {
        font-size: 12px;
        color: #666;
        margin-top: 5px;
    }
    
    @media (max-width: 768px) {
        .kpi-value {
            font-size: 18px;
        }
        
        .kpi-label {
            font-size: 10px;
        }
    }
</style>
```

### Example 2: RTL Dashboard

```html
<!-- Right-to-left dashboard for Arabic/Hebrew -->
<ejs-dashboardlayout id="dashboard" 
                      enableRtl="true"
                      columns="6"
                      allowFloating="true"
                      allowDragging="true">
    <e-dashboardlayout-panels>
        <e-dashboardlayout-panel id="panel1" sizeX="2" sizeY="1" row="0" col="0"
                                 header="<div>الإحصائيات</div>"
                                 content="<div>محتوى الإحصائيات</div>">
        </e-dashboardlayout-panel>
        <e-dashboardlayout-panel id="panel2" sizeX="2" sizeY="1" row="0" col="2"
                                 header="<div>المبيعات</div>"
                                 content="<div>محتوى المبيعات</div>">
        </e-dashboardlayout-panel>
        <e-dashboardlayout-panel id="panel3" sizeX="2" sizeY="2" row="0" col="4"
                                 header="<div>الرسوم البيانية</div>"
                                 content="<div>محتوى الرسوم البيانية</div>">
        </e-dashboardlayout-panel>
    </e-dashboardlayout-panels>
</ejs-dashboardlayout>
```

### Example 3: Mobile-First Responsive

```html
<!-- Start with 1 column, expand on larger screens -->
<ejs-dashboardlayout id="dashboard" 
                      columns="1"
                      mediaQuery="(min-width: 768px)"
                      allowFloating="true">
    <e-dashboardlayout-panels>
        <e-dashboardlayout-panel id="m1" sizeX="1" sizeY="1" row="0" col="0"
                                 header="<div>Widget 1</div>"
                                 content="<div>Content 1</div>">
        </e-dashboardlayout-panel>
        <e-dashboardlayout-panel id="m2" sizeX="1" sizeY="1" row="1" col="0"
                                 header="<div>Widget 2</div>"
                                 content="<div>Content 2</div>">
        </e-dashboardlayout-panel>
        <e-dashboardlayout-panel id="m3" sizeX="1" sizeY="1" row="2" col="0"
                                 header="<div>Widget 3</div>"
                                 content="<div>Content 3</div>">
        </e-dashboardlayout-panel>
    </e-dashboardlayout-panels>
</ejs-dashboardlayout>

<script>
    document.addEventListener('DOMContentLoaded', function() {
        var dashboardObj = document.getElementById('dashboard').ej2_instances[0];
        
        function adjustLayout() {
            var width = window.innerWidth;
            var targetColumns = width < 768 ? 1 : (width < 1024 ? 2 : 4);
            
            if (dashboardObj.columns !== targetColumns) {
                dashboardObj.columns = targetColumns;
                dashboardObj.refresh();
            }
        }
        
        window.addEventListener('resize', adjustLayout);
        adjustLayout();
    });
</script>
```

### Example 4: Adaptive Panel Sizes

```javascript
var screenConfigurations = {
    'mobile': {
        columns: 2,
        cellSpacing: [3, 3],
        floatingEnabled: true,
        panelSizes: {
            'kpi': { sizeX: 1, sizeY: 1 },
            'chart': { sizeX: 2, sizeY: 2 },
            'table': { sizeX: 2, sizeY: 2 }
        }
    },
    'tablet': {
        columns: 3,
        cellSpacing: [5, 5],
        floatingEnabled: false,
        panelSizes: {
            'kpi': { sizeX: 1, sizeY: 1 },
            'chart': { sizeX: 2, sizeY: 2 },
            'table': { sizeX: 3, sizeY: 2 }
        }
    },
    'desktop': {
        columns: 6,
        cellSpacing: [5, 5],
        floatingEnabled: false,
        panelSizes: {
            'kpi': { sizeX: 2, sizeY: 1 },
            'chart': { sizeX: 4, sizeY: 2 },
            'table': { sizeX: 6, sizeY: 2 }
        }
    }
};

function getScreenType() {
    var width = window.innerWidth;
    return width < 768 ? 'mobile' : (width < 1024 ? 'tablet' : 'desktop');
}

function applyScreenConfiguration() {
    var dashboardObj = document.getElementById('dashboard').ej2_instances[0];
    var screenType = getScreenType();
    var config = screenConfigurations[screenType];
    
    dashboardObj.columns = config.columns;
    dashboardObj.cellSpacing = config.cellSpacing;
    dashboardObj.allowFloating = config.floatingEnabled;
    
    var panels = dashboardObj.serialize();
    panels.forEach(function(panel) {
        var panelType = panel.id.split('-')[0];
        var sizes = config.panelSizes[panelType];
        
        if (sizes) {
            panel.sizeX = sizes.sizeX;
            panel.sizeY = sizes.sizeY;
            dashboardObj.updatePanel(panel);
        }
    });
    
    console.log('Applied configuration for:', screenType);
}

window.addEventListener('resize', applyScreenConfiguration);
applyScreenConfiguration();
```

