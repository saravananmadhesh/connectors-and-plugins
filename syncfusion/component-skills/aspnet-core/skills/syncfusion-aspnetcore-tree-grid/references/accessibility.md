# Accessibility — Syncfusion ASP.NET Core TreeGrid

## Table of Contents

- [Overview](#overview)
- [WAI-ARIA Attributes](#wai-aria-attributes)
- [Keyboard Navigation](#keyboard-navigation)
- [RTL Support](#rtl-right-to-left-support)
- [Accessibility Best Practices](#accessibility-best-practices)

## When to Use This Skill

Use this reference when you need to:
- Ensure WCAG 2.2 AA compliance for accessibility standards
- Support screen reader users with proper ARIA attributes
- Enable full keyboard navigation for all TreeGrid features
- Support right-to-left (RTL) languages (Arabic, Hebrew, etc.)
- Improve color contrast for visibility
- Provide semantic markup for assistive technologies
- Implement accessible toolbar and context menu
- Test and validate accessibility in your implementation

## Overview

The Syncfusion ASP.NET Core TreeGrid meets the following accessibility standards:

| Criteria | Support Level |
|----------|--------------|
| WCAG 2.2 | AA |
| Section 508 | ✅ Full |
| Screen Reader | ⚠️ Partial |
| Right-To-Left (RTL) | ✅ Full |
| Color Contrast | ✅ Full |
| Mobile Device | ✅ Full |
| Keyboard Navigation | ✅ Full |

---

## WAI-ARIA Attributes

The TreeGrid automatically applies the following ARIA attributes for screen reader compatibility:

| Attribute | Purpose |
|-----------|---------|
| `role="treegrid"` | Identifies the component as a hierarchical data grid |
| `aria-selected` | Reflects single or multi-row selection state |
| `aria-expanded` | Indicates whether a tree node is expanded or collapsed |
| `aria-sort` | Conveys current sort order for column headers |
| `aria-busy` | Signals loading state to screen readers |
| `aria-invalid` | Marks invalid form field input during editing |
| `aria-grabbed` | Indicates drag state for row drag-and-drop |
| `aria-owns` | Establishes relationships between parent and child elements |
| `aria-label` | Provides accessible names for icon-only controls (e.g., close button) |

No additional configuration is needed to enable ARIA attributes — TreeGrid applies them automatically.

---

## Keyboard Navigation

TreeGrid supports full keyboard navigation for users relying on keyboard or assistive technologies.

### Navigation

| Key | Action |
|-----|--------|
| `DownArrow` | Move focus down one row/cell |
| `UpArrow` | Move focus up one row/cell |
| `LeftArrow` | Move focus left one cell |
| `RightArrow` | Move focus right one cell |
| `Home` | Move focus to the first cell in the row |
| `End` | Move focus to the last cell in the row |
| `Ctrl + Home` | Move focus to the first row |
| `Ctrl + End` | Move focus to the last row |
| `Tab` | Move focus to next cell |
| `Shift + Tab` | Move focus to previous cell |

### Selection

| Key | Action |
|-----|--------|
| `Ctrl + A` | Select all rows/cells |
| `Esc` | Deselect all rows/cells |
| `Shift + DownArrow` | Extend selection downward |
| `Shift + UpArrow` | Extend selection upward |
| `Shift + LeftArrow` | Extend cell selection left |
| `Shift + RightArrow` | Extend cell selection right |

### Sorting

| Key | Action |
|-----|--------|
| `Enter` (on header) | Sort ascending/descending |
| `Shift + Enter` (on header) | Clear sort for that column |
| `Ctrl + Enter` (on header) | Multi-column sort |

### Editing

| Key | Action |
|-----|--------|
| `Enter` | Complete cell edit and move down |
| `Esc` | Cancel current edit |

### Paging

| Key | Action |
|-----|--------|
| `PageDown` | Go to next page |
| `PageUp` | Go to previous page |
| `Alt + PageDown` | Go to next page |
| `Alt + PageUp` | Go to previous page |
| `Ctrl + Alt + PageDown` | Go to last page |
| `Ctrl + Alt + PageUp` | Go to first page |

### Tree Expansion

| Key | Action |
|-----|--------|
| `Ctrl + Shift + DownArrow` | Expand selected group/node |
| `Ctrl + DownArrow` | Expand all visible groups |
| `Ctrl + Shift + UpArrow` | Collapse selected group/node |
| `Ctrl + UpArrow` | Collapse all visible groups |

### Other

| Key | Action |
|-----|--------|
| `Ctrl + P` | Print the TreeGrid |

---

## RTL (Right-to-Left) Support

Enable RTL for Arabic, Hebrew, Urdu, and other right-to-left languages:

```cshtml
<ejs-treegrid id="TreeGrid" dataSource="ViewBag.datasource" childMapping="Children"
              treeColumnIndex="1" enableRtl="true" locale="ar">
    <e-treegrid-columns>
        <e-treegrid-column field="TaskId" headerText="Task ID" width="100"></e-treegrid-column>
        <e-treegrid-column field="TaskName" headerText="Task Name" width="200"></e-treegrid-column>
        <e-treegrid-column field="Duration" headerText="Duration" width="120"></e-treegrid-column>
    </e-treegrid-columns>
</ejs-treegrid>
```

---

## Accessibility Best Practices

### Provide Meaningful Column Headers

Always set `headerText` on all columns so screen readers can announce column context:

```cshtml
<e-treegrid-column field="TaskId" headerText="Task ID" width="100"></e-treegrid-column>
<e-treegrid-column field="TaskName" headerText="Task Name" width="200"></e-treegrid-column>
```

### Use a Primary Key for Edit Operations

Set `isPrimaryKey="true"` on one column to ensure accurate ARIA state tracking during editing:

```cshtml
<e-treegrid-column field="TaskId" headerText="Task ID" isPrimaryKey="true" width="100"></e-treegrid-column>
```

### Keyboard-Accessible Toolbar

Toolbar items are keyboard-accessible by default. Users can Tab into the toolbar and press Enter/Space to activate items. Ensure custom toolbar items include descriptive `tooltipText`:

```cshtml
<ejs-treegrid id="TreeGrid" dataSource="ViewBag.datasource" childMapping="Children"
              treeColumnIndex="1"
              toolbar="@(new List<object>() { new { text = "Refresh", tooltipText = "Refresh data", id = "toolbarRefresh", prefixIcon = "e-refresh" } })"
              toolbarClick="toolbarClickHandler">
    <!-- columns -->
</ejs-treegrid>
```

### Color Contrast

Syncfusion themes (Fluent, Bootstrap, Material) are built with WCAG AA-compliant color contrast ratios. Avoid overriding default theme colors without verifying contrast ratios.

### Screen Reader Notes

Screen reader support is **partial** — the following interactions are supported:
- Row/cell navigation and selection announcements
- Expand/collapse state announcements via `aria-expanded`
- Sort state announcements via `aria-sort`
- Loading state via `aria-busy`

Complex interactions like drag-and-drop and context menus may have limited screen reader support.
