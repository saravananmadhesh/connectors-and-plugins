# Styling and Appearance

## Table of Contents

- [When to Use This Feature](#when-to-use-this-feature)
- [Overview](#overview)
- [CSS Classes Reference](#css-classes-reference)
- [Custom Theme Options](#custom-theme-options)

## When to Use This Feature

Customize Tree Grid styling when you need to:

- Match your application's branding and color scheme
- Create a consistent look and feel across your UI
- Modify the appearance of specific areas (headers, rows, cells)
- Apply alternate row coloring for better readability
- Highlight selected rows or cells
- Customize header styling
- Style summary or footer rows
- Create custom themes for all ASP.NET Core controls

## Overview

To modify the Tree Grid appearance, you need to override the default CSS of the Tree Grid. The Tree Grid provides a comprehensive set of CSS classes that allow you to customize virtually every aspect of its appearance. You can override the styling of the root element, headers, body content, selection states, pagers, and summary sections.

The Tree Grid uses semantic CSS class names that correspond to different sections of the control, making it straightforward to identify which classes to override for specific styling needs.

## CSS Classes Reference

The following CSS classes are available for customizing Tree Grid appearance:

### Root Element

| Class | Description |
|-------|-------------|
| `e-treegrid` | This class is added to the root element (div) of the Tree Grid control. Use this to override the overall appearance and background color of the entire Tree Grid. |

### Header Styling

| Class | Description |
|-------|-------------|
| `e-gridheader` | This class is added to the root element of the header. You can use this to override the thin line between header and content of the Tree Grid. |
| `e-table` | This class is added to the table element of the Tree Grid header. This CSS class makes table width as 100%. |
| `e-columnheader` | This class is added to the 'tr' (table row) of the Tree Grid header. Use this to style the entire header row. |
| `e-headercell` | This class is added to 'th' (table header) elements of Tree Grid header. You can override the background color of headers and border color using this class. |
| `e-headercelldiv` | This class is added to the div element that is present within the 'th' element in the header. We recommend using this class to override the skeleton layout of the header cells. |

### Body Content Styling

| Class | Description |
|-------|-------------|
| `e-gridcontent` | This class is added to the root of body content. Use this to override the background color of the body content area. |
| `e-table` | This class is added to the table of content. This CSS class makes table width as 100%. |
| `e-altrow` | This class is added to alternate rows of the Tree Grid. Use this to override the alternate row color of the Tree Grid for better readability. |
| `e-rowcell` | This class is added to all cells in the Tree Grid. Use this to override the appearance and styling of individual cells. |
| `e-groupcaption` | This class is added to the 'td' (table data) of group caption rows. Use this to change the background color of caption cells. |

### Selection and Hover Styling

| Class | Description |
|-------|-------------|
| `e-selectionbackground` | This class is added to row cells when they are selected. Use this to override the selection appearance and highlight color. |
| `e-hover` | This class is added to rows of the Tree Grid when hovering over them. Use this to customize the hover state appearance. |

### Pager Styling

| Class | Description |
|-------|-------------|
| `e-pager` | This class is added to the root element of the pager. Use this to change the appearance, background color, and font color of the pager. |
| `e-pagercontainer` | This class is added to numeric items of the pager. Use this to style the numeric pagination items. |
| `e-parentmsgbar` | This class is added to the pager information area. Use this to style the pager info message. |

### Summary and Footer Styling

| Class | Description |
|-------|-------------|
| `e-gridfooter` | This class is added to the root of the summary footer div. Use this to override the appearance of the summary section. |
| `e-summaryrow` | This class is added to rows of the Tree Grid summary. Use this to style the summary rows. |
| `e-summarycell` | This class is added to cells of the summary row. Use this to override the background color and styling of summary cells. |

## CSS Override Examples

### Header Styling

To customize the header appearance, override the header-related CSS classes:

```css
/* Override header background color and cell styling */
.e-treegrid .e-gridheader {
    background-color: #f5f5f5;
}

.e-treegrid .e-headercell {
    background-color: #2c3e50;
    color: white;
    font-weight: bold;
    border-color: #34495e;
}

.e-treegrid .e-headercelldiv {
    padding: 12px 8px;
}
```

### Row and Alternate Row Styling

To customize row appearance including alternate rows:

```css
/* Override row styling */
.e-treegrid .e-row {
    background-color: white;
    border-bottom: 1px solid #ecf0f1;
}

/* Override alternate row color */
.e-treegrid .e-altrow {
    background-color: #f9f9f9;
}

/* Override hover row color */
.e-treegrid .e-hover {
    background-color: #ecf0f1;
}
```

### Cell Styling

To customize individual cell appearance:

```css
/* Override cell styling */
.e-treegrid .e-rowcell {
    padding: 10px 8px;
    border-color: #ecf0f1;
}

/* Override group caption cell */
.e-treegrid .e-groupcaption {
    background-color: #e8e8e8;
    font-weight: bold;
}
```

### Selection Styling

To customize selected row and cell appearance:

```css
/* Override selection background */
.e-treegrid .e-selectionbackground {
    background-color: #3498db;
    color: white;
}
```

### Summary Styling

To customize the summary section:

```css
/* Override summary footer */
.e-treegrid .e-gridfooter {
    background-color: #ecf0f1;
    border-top: 1px solid #bdc3c7;
}

/* Override summary rows */
.e-treegrid .e-summaryrow {
    background-color: #f5f5f5;
}

/* Override summary cells */
.e-treegrid .e-summarycell {
    background-color: #f5f5f5;
    font-weight: bold;
    border-color: #bdc3c7;
}
```

## Custom Theme Options

### Using Theme Studio

For a comprehensive and easy way to create custom themes for all ASP.NET Core controls, including the Tree Grid, you can use Syncfusion's Theme Studio.

Theme Studio allows you to:

- Create custom themes visually without writing CSS
- Ensure consistent styling across all controls
- Export theme CSS files for use in your application
- Customize colors, fonts, and spacing for the entire control library

To use Theme Studio, visit: ej2.syncfusion.com/themestudio/?theme=material

Theme Studio provides a user-friendly interface for selecting colors and styles that will be applied to all Syncfusion controls uniformly, ensuring a cohesive design system for your entire application.
