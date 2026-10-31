---
name: syncfusion-javascript-treemap
description: Create and customize Syncfusion TreeMap components in TypeScript and JavaScript for hierarchical data visualization. Use this skill when you need to implement a TreeMap, visualize hierarchical data structures, configure multi-level layouts, apply color mapping, enable drilldown navigation, add labels and tooltips, configure legends, handle selection and highlight, export to images or PDF, print, or customize internationalization and accessibility. Covers installation, data binding, layout types, levels, color mapping, labels, tooltips, legends, drilldown, interactivity, print/export, RTL, locale formatting, and accessibility.
metadata:
  author: "Syncfusion Inc"
  version: "34.1.29"
  category: "Data Visualization"
---

# Implementing Syncfusion TreeMap with TypeScript and JavaScript

The TreeMap component visualizes hierarchical or grouped data as nested rectangles. Each rectangle represents a data item, and its size is determined by a numeric field mapped through `weightValuePath`. TreeMaps are useful for displaying structures such as product categories, regional breakdowns, market segments, or any grouped dataset where relative magnitude matters. This guide covers both TypeScript and JavaScript implementations.

## When to Use This Skill

- **Visualizing hierarchical data**: Display grouped or multi-level data such as regions, departments, or product categories
- **Multi-level data visualization**: Show parent-child relationships using `levels` and `groupPath`
- **Creating drill-down interfaces**: Enable interactive navigation through hierarchy levels
- **Color-coding data**: Use range, equal, desaturation, palette, or direct color binding
- **Adding interactive features**: Implement selection, highlight, click, double-click, and right-click interactions
- **Customizing appearance**: Modify layout, colors, borders, labels, headers, legends, and templates
- **Displaying supplementary information**: Add labels, tooltips, legends, and formatted values
- **Exporting visualizations**: Print or export as PNG, JPEG, SVG, or PDF
- **International support**: Enable RTL, locale-specific number formatting, and culture-aware display
- **Accessibility**: Improve screen reader support, ARIA naming, contrast, and focus behavior

## Documentation and Navigation Guide

Choose your reference based on what you need to accomplish:

### API Reference
📄 **Read:** `references/api-reference.md`

### Getting Started
📄 **Read:** `references/getting-started.md`
- Installation and npm package setup
- Importing `TreeMapModule`
- Creating your first TreeMap component
- Theme and style configuration
- Basic component with simple data

### Data Binding
📄 **Read:** `references/data-binding.md`
- Binding flat collections
- Grouping data with `levels`
- Mapping data source properties to TreeMap fields
- Configuring `weightValuePath` for item sizing
- Dynamic data updates and state-driven binding

### Color Mapping
📄 **Read:** `references/color-mapping.md`
- Range color mapping for numeric values
- Equal color mapping for category-based colors
- Desaturation color mapping with opacity
- Palette-based coloring
- Direct color binding with `colorValuePath`
- Gradient colors with `leafItemSettings.colorMapping`

### Drilldown and Navigation
📄 **Read:** `references/drilldown-and-navigation.md`
- Enabling drilldown functionality
- Parent-child navigation with `levels`
- `drillDownView` behavior
- Breadcrumb navigation
- Drill events (`drillStart`, `drillEnd`)
- Resetting to root through application state when needed

### Levels and Layout
📄 **Read:** `references/levels-and-layout.md`
- Configuring multiple hierarchy levels
- `groupPath` and grouped rendering
- Layout types (`Squarified`, `SliceAndDiceVertical`, `SliceAndDiceHorizontal`, `SliceAndDiceAuto`)
- Group spacing and leaf gaps
- Header formatting and styling
- Header templates and header sizing

### Labels, Tooltips, and Legend
📄 **Read:** `references/labels-tooltips-legend.md`
- Data label configuration and formatting
- Label templates and template positioning
- Handling label intersections and overflow
- Tooltip visibility and formatting
- Custom tooltip templates
- Legend display and configuration
- Coordinating legend with color mapping, selection, and highlight

### Selection and Interactivity
📄 **Read:** `references/selection-interactivity.md`
- Enabling selection and highlight
- Customizing selection colors and borders
- Legend-based selection and hover interaction
- Click, item-selected, double-click, and right-click events
- Programmatic selection with `selectItem(...)`
- Managing single-item or multi-item workflows in application state

### Print, Export, and Accessibility
📄 **Read:** `references/print-export-accessibility.md`
- Print functionality
- Image export (PNG, JPEG, SVG)
- PDF export with orientation options
- Base64 export handling
- WCAG accessibility support
- Screen reader support and ARIA labels
- Contrast and focus considerations

### Internationalization
📄 **Read:** `references/internationalization.md`
- Right-to-left (RTL) rendering
- Locale configuration and number formatting
- Globalization for labels and tooltips
- Render direction configuration
- Multi-language data binding
- Cultural customization with `setCulture()` and `setCurrencyCode()`

## Quick Start

### TypeScript

```typescript
import { TreeMap } from '@syncfusion/ej2-treemap';

const data = [
    { Category: 'Electronics', Item: 'Laptops', Size: 150 },
    { Category: 'Electronics', Item: 'Phones', Size: 200 },
    { Category: 'Furniture', Item: 'Chairs', Size: 100 },
    { Category: 'Furniture', Item: 'Tables', Size: 120 }
];

const treeMap = new TreeMap({
    dataSource: data,
    weightValuePath: 'Size',
    levels: [
        { groupPath: 'Category' }
    ],
    leafItemSettings: {
        labelPath: 'Item',
        gap: 4,
        border: { color: '#ffffff', width: 1 }
    }
});

treeMap.appendTo('#treemap-container');
```

### HTML Container

```html
<div id="treemap-container" style="width: 100%; height: 500px;"></div>
```

### JavaScript

```javascript
var data = [
    { Category: 'Electronics', Item: 'Laptops', Size: 150 },
    { Category: 'Electronics', Item: 'Phones', Size: 200 },
    { Category: 'Furniture', Item: 'Chairs', Size: 100 },
    { Category: 'Furniture', Item: 'Tables', Size: 120 }
];

var treeMap = new ej.treemap.TreeMap({
    dataSource: data,
    weightValuePath: 'Size',
    levels: [
        { groupPath: 'Category' }
    ],
    leafItemSettings: {
        labelPath: 'Item',
        gap: 4,
        border: { color: '#ffffff', width: 1 }
    }
});

treeMap.appendTo('#treemap-container');
```

## Common Patterns

### Pattern 1: Basic Hierarchical Visualization

Display grouped hierarchical data using `levels` and `groupPath`.

```typescript
import { TreeMap } from '@syncfusion/ej2-treemap';

const treeMap = new TreeMap({
    dataSource: data,
    weightValuePath: 'Value',
    levels: [
        { groupPath: 'Region', headerFormat: '${Region}' },
        { groupPath: 'Country', headerFormat: '${Country}' }
    ],
    leafItemSettings: {
        labelPath: 'Country'
    }
});

treeMap.appendTo('#treemapContainer');
```

### Pattern 2: Color-Mapped Values

Use range color mapping through `rangeColorValuePath` and `leafItemSettings.colorMapping`.

```typescript
import { TreeMap } from '@syncfusion/ej2-treemap';

const treeMap = new TreeMap({
    dataSource: data,
    weightValuePath: 'Value',
    rangeColorValuePath: 'Value',
    leafItemSettings: {
        labelPath: 'Name',
        colorMapping: [
            { from: 0, to: 50, color: '#3498db' },
            { from: 50, to: 100, color: '#e74c3c' }
        ]
    }
});

treeMap.appendTo('#treemapContainer');
```

### Pattern 3: Interactive Drilldown

Enable drilldown with breadcrumb navigation for exploring grouped levels.

```typescript
import { TreeMap } from '@syncfusion/ej2-treemap';

const treeMap = new TreeMap({
    dataSource: data,
    weightValuePath: 'Value',
    enableDrillDown: true,
    enableBreadcrumb: true,
    breadcrumbConnector: ' / ',
    levels: [
        { groupPath: 'Region' },
        { groupPath: 'Country' }
    ],
    leafItemSettings: {
        labelPath: 'Item'
    }
});

treeMap.appendTo('#treemapContainer');
```

## Key Props and Configuration

| Property | Type | Purpose |
|----------|------|---------|
| `dataSource` | `object[]` | Data collection for TreeMap items |
| `weightValuePath` | `string` | Numeric field used to size each item |
| `leafItemSettings` | `object` | Leaf item configuration such as labels, borders, templates, and color mapping |
| `levels` | `object[]` | Hierarchy configuration using `groupPath` and header settings |
| `layoutType` | `'Squarified' \| 'SliceAndDiceVertical' \| 'SliceAndDiceHorizontal' \| 'SliceAndDiceAuto'` | Rectangle arrangement algorithm |
| `colorValuePath` | `string` | Data field used for direct item color assignment |
| `equalColorValuePath` | `string` | Data field used for category-based color mapping |
| `rangeColorValuePath` | `string` | Data field used for numeric range color mapping |
| `enableDrillDown` | `boolean` | Enables drilldown navigation through grouped levels |
| `enableBreadcrumb` | `boolean` | Displays breadcrumb navigation during drilldown |
| `legendSettings` | `object` | Legend display and styling configuration |
| `tooltipSettings` | `object` | Tooltip visibility, formatting, and template configuration |
| `selectionSettings` | `object` | Selection appearance and behavior configuration |
| `highlightSettings` | `object` | Hover highlight appearance configuration |
| `enableRtl` | `boolean` | Enables right-to-left rendering |
| `locale` | `string` | Overrides the component culture |
| `format` | `string` | Applies numeric formatting such as `n2`, `c`, or `p` |
| `useGroupingSeparator` | `boolean` | Enables culture-aware number grouping separators |
| `allowPrint` | `boolean` | Enables print support |
| `allowImageExport` | `boolean` | Enables image export support |
| `allowPdfExport` | `boolean` | Enables PDF export support |
| `description` | `string` | Adds descriptive accessibility text for the component |
| `tabIndex` | `number` | Controls focus order for the TreeMap container |

## Implementation Notes

- Instantiate TreeMap using `new TreeMap()` constructor and `appendTo()` method for both TypeScript and JavaScript.
- Register required services for features like legend, tooltips, selection, and export:
  - `TreeMapLegendService`, `TreeMapTooltipService`, `TreeMapSelectionService`, `TreeMapHighlightService`
  - `PrintService`, `ImageExportService`, `PdfExportService`
- For color mapping, configure `leafItemSettings.colorMapping` and pair it with `equalColorValuePath` or `rangeColorValuePath` when needed.
- For programmatic selection, use `selectItem(levelOrder, isSelected?)` method for updating selection state.
- For accessibility, rely on TreeMap's built-in ARIA support, meaningful titles, labels, legends, descriptions, and strong color contrast (WCAG 2.1 Level AA).
- For keyboard navigation, implement surrounding HTML controls for enhanced interaction patterns beyond default TreeMap keyboard support.
- Both TypeScript and JavaScript implementations share the same API surface and configuration patterns.