# Overflow Modes in Breadcrumb Control

## Table of Contents
- [Overflow Behavior Overview](#overflow-behavior-overview)
- [Collapsed Mode](#collapsed-mode)
- [Hidden Mode](#hidden-mode)
- [Menu Mode](#menu-mode)
- [Wrap Mode](#wrap-mode)
- [Scroll Mode](#scroll-mode)
- [None Mode](#none-mode)
- [Choosing the Right Mode](#choosing-the-right-mode)
- [Overflow Mode Examples](#overflow-mode-examples)

## Overflow Behavior Overview

When breadcrumbs have many items, they can exceed the available container space. The `overflowMode` property controls how excess items are displayed, and `maxItems` determines the threshold.

### Overflow Properties

**maxItems** (`number`)
- Specifies how many breadcrumb items to display before overflow occurs
- Example: `maxItems="3"` shows 3 items, hides excess
- Type: Integer
- Default: No limit (all items shown)

**overflowMode** (`string` | `BreadcrumbOverflowMode`)
- Determines how to handle items exceeding maxItems
- Possible values: Collapsed, Hidden, Menu, Wrap, Scroll, None
- Default: Default (hidden with expand/collapse)
- Type: String or enum

### How Overflow Works

1. **Calculate visible items:** Based on maxItems value
2. **Determine display mode:** Use overflowMode
3. **Handle excess:** Show/hide/wrap remaining items
4. **Allow user interaction:** Expand, navigate submenu, or scroll

### Basic Overflow Example

```cshtml
<!-- Without overflow handling (all items shown on one line) -->
<ejs-breadcrumb>
    <e-breadcrumb-items>
        <e-breadcrumb-item text="Home"></e-breadcrumb-item>
        <e-breadcrumb-item text="Level1"></e-breadcrumb-item>
        <e-breadcrumb-item text="Level2"></e-breadcrumb-item>
        <e-breadcrumb-item text="Level3"></e-breadcrumb-item>
        <e-breadcrumb-item text="Level4"></e-breadcrumb-item>
        <e-breadcrumb-item text="Level5"></e-breadcrumb-item>
        <e-breadcrumb-item text="Level6"></e-breadcrumb-item>
    </e-breadcrumb-items>
</ejs-breadcrumb>

<!-- With overflow handling -->
<ejs-breadcrumb overflowMode="Collapsed" maxItems="3">
    <e-breadcrumb-items>
        <!-- Same items -->
    </e-breadcrumb-items>
</ejs-breadcrumb>
```

## Collapsed Mode

Collapsed mode shows the first and last breadcrumb items and hides the rest behind a collapsible icon. When clicked, all items become visible.

### Collapsed Mode Syntax

```cshtml
<ejs-breadcrumb overflowMode="Collapsed" maxItems="3">
    <e-breadcrumb-items>
        <e-breadcrumb-item text="Home" url="~/"></e-breadcrumb-item>
        <e-breadcrumb-item text="Documents" url="~/documents"></e-breadcrumb-item>
        <e-breadcrumb-item text="Projects" url="~/documents/projects"></e-breadcrumb-item>
        <e-breadcrumb-item text="Active" url="~/documents/projects/active"></e-breadcrumb-item>
        <e-breadcrumb-item text="Phase1" url="~/documents/projects/active/phase1"></e-breadcrumb-item>
        <e-breadcrumb-item text="Current"></e-breadcrumb-item>
    </e-breadcrumb-items>
</ejs-breadcrumb>
```

**Display:**
- Default: `Home ... Current` (with icon between)
- After expanding: `Home > Documents > Projects > Active > Phase1 > Current`

### Collapsed Mode Behavior

1. **Default view:** Shows first item, last item, and collapsed icon
2. **Click collapsed icon:** All items expand and become visible
3. **Visual indicator:** Icon indicates more items are hidden
4. **Best for:** Long hierarchies where first and last are most important

### Collapsed Mode Use Cases

- File paths: First folder and current file visible
- Hierarchical navigation: Show entry point and destination
- Docs/Knowledge bases: Show top-level section and current page
- Admin panels: Show root and current location

## Hidden Mode

Hidden mode shows the maximum number of items that fit in the container space. Hidden items become visible when you click previous items (progressive disclosure).

### Hidden Mode Syntax

```cshtml
<ejs-breadcrumb overflowMode="Hidden" maxItems="3">
    <e-breadcrumb-items>
        <e-breadcrumb-item text="Home" url="~/"></e-breadcrumb-item>
        <e-breadcrumb-item text="Level1" url="~/level1"></e-breadcrumb-item>
        <e-breadcrumb-item text="Level2" url="~/level1/level2"></e-breadcrumb-item>
        <e-breadcrumb-item text="Level3" url="~/level1/level2/level3"></e-breadcrumb-item>
        <e-breadcrumb-item text="Level4" url="~/level1/level2/level3/level4"></e-breadcrumb-item>
        <e-breadcrumb-item text="Level5"></e-breadcrumb-item>
    </e-breadcrumb-items>
</ejs-breadcrumb>
```

**Display Behavior:**
- Shows: `Home > Level1 > Level2`
- Click "Level1": Shows `Level1 > Level2 > Level3`
- Click "Level2": Shows `Level2 > Level3 > Level4`
- Continue clicking to reveal earlier items

### Hidden Mode Behavior

1. **Initial view:** Shows maxItems items
2. **Progressive reveal:** Click earlier items to show preceding items
3. **Always shows last:** Current item remains visible
4. **Best for:** Deep hierarchies with mobile/responsive design

### Hidden Mode Use Cases

- Responsive breadcrumbs that adapt to screen width
- Mobile navigation (limited space)
- Deep document hierarchies
- Progressive path revelation

## Menu Mode

Menu mode displays the items that fit and creates a dropdown submenu for remaining items. Users access hidden items through a dropdown menu.

### Menu Mode Syntax

```cshtml
<ejs-breadcrumb overflowMode="Menu" maxItems="3">
    <e-breadcrumb-items>
        <e-breadcrumb-item text="Home" url="~/"></e-breadcrumb-item>
        <e-breadcrumb-item text="Products" url="~/products"></e-breadcrumb-item>
        <e-breadcrumb-item text="Electronics" url="~/products/electronics"></e-breadcrumb-item>
        <e-breadcrumb-item text="Computers" url="~/products/electronics/computers"></e-breadcrumb-item>
        <e-breadcrumb-item text="Laptops" url="~/products/electronics/computers/laptops"></e-breadcrumb-item>
        <e-breadcrumb-item text="Gaming Laptops"></e-breadcrumb-item>
    </e-breadcrumb-items>
</ejs-breadcrumb>
```

**Display:**
- Shows: `Home > Products > [dropdown v]`
- Dropdown contains: Electronics, Computers, Laptops, Gaming Laptops
- Users click dropdown to access hidden items

### Menu Mode Behavior

1. **Visible items:** Shows maxItems items
2. **Dropdown trigger:** Menu icon appears after last visible item
3. **Submenu:** Hidden items displayed in dropdown
4. **Best for:** Lists with many items that need organization

### Menu Mode Use Cases

- Large category hierarchies
- File browsers with deep nesting
- Multi-level navigation systems
- Sites with extensive breadcrumb paths

## Wrap Mode

Wrap mode wraps items to multiple lines when they exceed the container width. Instead of hiding items, they flow to the next line.

### Wrap Mode Syntax

```cshtml
<ejs-breadcrumb overflowMode="Wrap" maxItems="6">
    <e-breadcrumb-items>
        <e-breadcrumb-item text="Home" url="~/"></e-breadcrumb-item>
        <e-breadcrumb-item text="Documentation" url="~/docs"></e-breadcrumb-item>
        <e-breadcrumb-item text="Components" url="~/docs/components"></e-breadcrumb-item>
        <e-breadcrumb-item text="Navigation" url="~/docs/components/nav"></e-breadcrumb-item>
        <e-breadcrumb-item text="Breadcrumb" url="~/docs/components/nav/breadcrumb"></e-breadcrumb-item>
        <e-breadcrumb-item text="Overview"></e-breadcrumb-item>
    </e-breadcrumb-items>
</ejs-breadcrumb>
```

**Display (with limited width):**
```
Home > Documentation > Components
Navigation > Breadcrumb > Overview
```

### Wrap Mode Behavior

1. **Line 1:** Shows items until width exceeded
2. **Line 2+:** Remaining items wrap to new lines
3. **All visible:** Every item is always visible
4. **Best for:** Wide layouts with responsive design

### Wrap Mode Use Cases

- Desktop applications with wide layouts
- Responsive breadcrumbs on larger screens
- Technical documentation with deep hierarchies
- Sites where all breadcrumbs should be visible

## Scroll Mode

Scroll mode displays an HTML scrollbar when breadcrumbs exceed the container width. Users scroll horizontally to see all items.

### Scroll Mode Syntax

```cshtml
<ejs-breadcrumb overflowMode="Scroll" maxItems="10">
    <e-breadcrumb-items>
        <e-breadcrumb-item text="Company" url="~/"></e-breadcrumb-item>
        <e-breadcrumb-item text="Departments" url="~/departments"></e-breadcrumb-item>
        <e-breadcrumb-item text="Engineering" url="~/departments/engineering"></e-breadcrumb-item>
        <e-breadcrumb-item text="Software" url="~/departments/engineering/software"></e-breadcrumb-item>
        <e-breadcrumb-item text="Backend" url="~/departments/engineering/software/backend"></e-breadcrumb-item>
        <e-breadcrumb-item text="Team" url="~/departments/engineering/software/backend/team"></e-breadcrumb-item>
        <e-breadcrumb-item text="Projects" url="~/departments/engineering/software/backend/team/projects"></e-breadcrumb-item>
        <e-breadcrumb-item text="Active"></e-breadcrumb-item>
    </e-breadcrumb-items>
</ejs-breadcrumb>
```

**Display:**
- All items visible in a horizontally scrollable container
- Scrollbar appears at bottom
- User scrolls to see all breadcrumbs

### Scroll Mode Behavior

1. **Container width limit:** Breadcrumb container has fixed width
2. **Horizontal scrollbar:** Appears when items overflow
3. **All visible:** Every item accessible via scrolling
4. **Best for:** Desktop with many items

### Scroll Mode Use Cases

- Complex system navigation
- Deep file hierarchies
- Very long breadcrumb trails
- Desktop-only interfaces

## None Mode

None mode displays all breadcrumb items on a single line without any truncation, wrapping, or scrolling. If items exceed width, they overflow the container.

### None Mode Syntax

```cshtml
<ejs-breadcrumb overflowMode="None">
    <e-breadcrumb-items>
        <e-breadcrumb-item text="Home" url="~/"></e-breadcrumb-item>
        <e-breadcrumb-item text="Products" url="~/products"></e-breadcrumb-item>
        <e-breadcrumb-item text="Electronics" url="~/products/electronics"></e-breadcrumb-item>
        <e-breadcrumb-item text="Laptops" url="~/products/electronics/laptops"></e-breadcrumb-item>
        <e-breadcrumb-item text="Gaming Laptops"></e-breadcrumb-item>
    </e-breadcrumb-items>
</ejs-breadcrumb>
```

**Display:** All items on single line (may overflow container)

### None Mode Behavior

1. **No truncation:** All items displayed
2. **No scrolling:** No scrollbar added
3. **No wrapping:** Single line only
4. **Best for:** Small number of items

### None Mode Use Cases

- Simple breadcrumbs with few items
- Layouts with plenty of horizontal space
- When all items must always be visible

## Choosing the Right Mode

| Mode | Items | Space | Mobile | Best For |
|------|-------|-------|--------|----------|
| **Collapsed** | Many | Limited | ✓ Good | "First > Last" view |
| **Hidden** | Many | Limited | ✓ Good | Progressive reveal |
| **Menu** | Many | Limited | ✓ Good | Organized lists |
| **Wrap** | Many | Wide | ✓ Fair | Multi-line display |
| **Scroll** | Many | Limited | ✗ Poor | Horizontal scroll |
| **None** | Few | Ample | ✓ Fair | Simple, all visible |

### Decision Tree

```
Do you have many breadcrumb items?
├─ NO → Use "None" mode
└─ YES
    ├─ Is space very limited (mobile)?
    │   ├─ Yes, show first & last → "Collapsed"
    │   ├─ Yes, progressive reveal → "Hidden"
    │   └─ Yes, organized menu → "Menu"
    └─ Is space wider (desktop)?
        ├─ Use wrapping → "Wrap"
        └─ Use horizontal scroll → "Scroll"
```

## Overflow Mode Examples

### Example 1: Mobile-Friendly with Collapsed

```cshtml
<ejs-breadcrumb overflowMode="Collapsed" maxItems="2">
    <e-breadcrumb-items>
        <e-breadcrumb-item text="Home" url="~/"></e-breadcrumb-item>
        <e-breadcrumb-item text="Shop" url="~/shop"></e-breadcrumb-item>
        <e-breadcrumb-item text="Electronics" url="~/shop/electronics"></e-breadcrumb-item>
        <e-breadcrumb-item text="Laptops" url="~/shop/electronics/laptops"></e-breadcrumb-item>
        <e-breadcrumb-item text="Gaming" url="~/shop/electronics/laptops/gaming"></e-breadcrumb-item>
    </e-breadcrumb-items>
</ejs-breadcrumb>
```

**Result:** Shows `Home [icon] Gaming`, expands to show all on click

### Example 2: Responsive with Wrap

```cshtml
<div style="width: 100%;">
    <ejs-breadcrumb overflowMode="Wrap">
        <e-breadcrumb-items>
            <e-breadcrumb-item text="Projects" url="~/projects"></e-breadcrumb-item>
            <e-breadcrumb-item text="MyProject" url="~/projects/myproject"></e-breadcrumb-item>
            <e-breadcrumb-item text="Src" url="~/projects/myproject/src"></e-breadcrumb-item>
            <e-breadcrumb-item text="Components" url="~/projects/myproject/src/components"></e-breadcrumb-item>
            <e-breadcrumb-item text="Layout.cshtml"></e-breadcrumb-item>
        </e-breadcrumb-items>
    </ejs-breadcrumb>
</div>
```

**Result:** Items wrap to multiple lines as needed

### Example 3: Organized with Menu

```cshtml
<ejs-breadcrumb overflowMode="Menu" maxItems="3">
    <e-breadcrumb-items>
        <e-breadcrumb-item text="Docs" url="~/docs"></e-breadcrumb-item>
        <e-breadcrumb-item text="API" url="~/docs/api"></e-breadcrumb-item>
        <e-breadcrumb-item text="Components" url="~/docs/api/components"></e-breadcrumb-item>
        <e-breadcrumb-item text="Navigation" url="~/docs/api/components/navigation"></e-breadcrumb-item>
        <e-breadcrumb-item text="Breadcrumb" url="~/docs/api/components/navigation/breadcrumb"></e-breadcrumb-item>
        <e-breadcrumb-item text="Properties"></e-breadcrumb-item>
    </e-breadcrumb-items>
</ejs-breadcrumb>
```

**Result:** Shows `Docs > API > Components [dropdown v]` with hidden items in menu

### Example 4: Simplified with Hidden

```cshtml
<ejs-breadcrumb overflowMode="Hidden" maxItems="2">
    <e-breadcrumb-items>
        <e-breadcrumb-item text="A" url="~/a"></e-breadcrumb-item>
        <e-breadcrumb-item text="B" url="~/a/b"></e-breadcrumb-item>
        <e-breadcrumb-item text="C" url="~/a/b/c"></e-breadcrumb-item>
        <e-breadcrumb-item text="D" url="~/a/b/c/d"></e-breadcrumb-item>
        <e-breadcrumb-item text="E"></e-breadcrumb-item>
    </e-breadcrumb-items>
</ejs-breadcrumb>
```

**Result:** Default shows `D > E`, click to progressively reveal B, C, A

---

## Summary

Overflow modes provide flexible solutions for displaying many breadcrumb items:
- **Collapsed:** Best for mobile/limited space (show first & last)
- **Hidden:** Best for responsive design (progressive reveal)
- **Menu:** Best for organized overflow (dropdown list)
- **Wrap:** Best for responsive desktop (multi-line)
- **Scroll:** Best for horizontal scrolling (all visible)
- **None:** Best for few items (single line)

Choose based on your content volume, available space, and user expectations.
