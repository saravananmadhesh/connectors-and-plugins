# Kanban Customization Reference

This reference provides comprehensive information about customizing the appearance and layout of the Syncfusion TypeScript Kanban component, including dimensions, styling, and tooltips.

## Table of Contents

- [Dimensions](#dimensions)
- [Styling](#styling)
- [Tooltips](#tooltips)
- [Edge Cases and Troubleshooting](#edge-cases-and-troubleshooting)

## Dimensions

The Kanban component supports three types of dimension values for both height and width: Auto, Pixel, and Percentage.

### Auto Height and Width

When height and width are set to `auto`, the Kanban tries to match the dimensions of its parent container. By default, both properties use `auto` values.

```typescript
import { Kanban } from '@syncfusion/ej2-kanban';
import { kanbanData } from './datasource';

let kanbanObj: Kanban = new Kanban({
    dataSource: kanbanData,
    keyField: 'Status',
    columns: [
        { headerText: 'Backlog', keyField: 'Open' },
        { headerText: 'In Progress', keyField: 'InProgress' },
        { headerText: 'Testing', keyField: 'Testing' },
        { headerText: 'Done', keyField: 'Close' }
    ],
    width: 'auto',
    height: 'auto',
    cardSettings: {
        contentField: 'Summary',
        headerField: 'Id'
    }
});
kanbanObj.appendTo('#Kanban');
```

**Behavior**: The parent container's width/height will be the sum of the Kanban and its children elements.

### Height and Width in Pixels

The Kanban renders exactly as per the given pixel values. Accepts both string and number formats.

```typescript
import { Kanban } from '@syncfusion/ej2-kanban';
import { kanbanData } from './datasource';

let kanbanObj: Kanban = new Kanban({
    dataSource: kanbanData,
    keyField: 'Status',
    columns: [
        { headerText: 'Backlog', keyField: 'Open' },
        { headerText: 'In Progress', keyField: 'InProgress' },
        { headerText: 'Testing', keyField: 'Testing' },
        { headerText: 'Done', keyField: 'Close' }
    ],
    width: 650,           // Number format
    height: '550px',      // String format with unit
    cardSettings: {
        contentField: 'Summary',
        headerField: 'Id'
    }
});
kanbanObj.appendTo('#Kanban');
```

### Height and Width in Percentage

When dimensions are given in percentage, the Kanban becomes as wide/tall as the parent container.

```typescript
import { Kanban } from '@syncfusion/ej2-kanban';
import { kanbanData } from './datasource';

let kanbanObj: Kanban = new Kanban({
    dataSource: kanbanData,
    keyField: 'Status',
    columns: [
        { headerText: 'Backlog', keyField: 'Open' },
        { headerText: 'In Progress', keyField: 'InProgress' },
        { headerText: 'Testing', keyField: 'Testing' },
        { headerText: 'Done', keyField: 'Close' }
    ],
    width: '100%',
    height: '100%',
    cardSettings: {
        contentField: 'Summary',
        headerField: 'Id'
    }
});
kanbanObj.appendTo('#Kanban');
```

**Note**: Ensure the parent container has defined dimensions when using percentage values.

### Mixed Dimension Types

You can mix different dimension types:

```typescript
width: '80%',    // Percentage
height: 600      // Pixels
```

## Styling

Customize the Kanban appearance by overriding default CSS classes or creating custom themes using [Theme Studio](https://ej2.syncfusion.com/themestudio/?theme=material).

### CSS Classes Reference

| CSS Class | Purpose |
|-----------|---------|
| `.e-kanban .e-kanban-table` | Customize the entire Kanban board |
| `.e-kanban .e-kanban-header .e-header-cells` | Header cells styling |
| `.e-kanban .e-kanban-header .e-header-cells .e-header-wrap .e-header-title` | Header title styling |
| `.e-kanban .e-kanban-header .e-header-cells.e-min-color` | Header cells minimum color |
| `.e-kanban .e-kanban-header .e-header-cells.e-max-color` | Header cells maximum color |
| `.e-kanban .e-kanban-header .e-header-cells.e-collapsed.e-min-color` | Collapsed column minimum color |
| `.e-kanban .e-kanban-header .e-header-cells.e-collapsed.e-max-color` | Collapsed column maximum color |
| `.e-kanban .e-kanban-header .e-header-cells .e-header-text` | Header text |
| `.e-kanban .e-kanban-header .e-header-cells .e-item-count` | Header item count |
| `.e-kanban .e-kanban-header .e-header-cells .e-limits` | Header cells limits |
| `.e-kanban .e-kanban-header .e-header-cells .e-limits .e-min-count` | Minimum count display |
| `.e-kanban .e-kanban-header .e-header-cells .e-limits .e-max-count` | Maximum count display |
| `.e-kanban .e-kanban-content` | Content area styling |
| `.e-kanban .e-kanban-content .e-content-row .e-content-cells .e-limits` | Content cell limits |
| `.e-kanban .e-kanban-content .e-content-row .e-content-cells.e-min-color` | Content cells minimum color |
| `.e-kanban .e-kanban-content .e-content-row .e-content-cells.e-max-color` | Content cells maximum color |
| `.e-kanban .e-kanban-content .e-content-row .e-content-cells.e-collapsed .e-collapse-header-text` | Collapsed header text |
| `.e-kanban .e-kanban-content .e-content-row .e-content-cells .e-show-add-button` | Add button styling |
| `.e-kanban .e-kanban-content .e-content-row .e-content-cells .e-card-wrapper .e-empty-card` | Empty card cells |
| `.e-kanban .e-kanban-content .e-content-row .e-content-cells .e-card-wrapper .e-card` | Card styling |
| `.e-kanban .e-kanban-content .e-content-row .e-content-cells .e-card-wrapper .e-card .e-card-header .e-card-header-title` | Card header title |
| `.e-kanban .e-kanban-content .e-content-row .e-content-cells .e-card-wrapper .e-card .e-card-footer` | Card footer |
| `.e-kanban .e-kanban-content .e-content-row .e-content-cells .e-card-wrapper .e-card .e-card-content` | Card content |
| `.e-kanban .e-kanban-content .e-content-row .e-content-cells .e-card-wrapper .e-card.e-card-color` | Card color |
| `.e-kanban .e-kanban-content .e-content-row .e-content-cells .e-card-wrapper .e-card .e-card-tags` | Card tags container |
| `.e-kanban .e-kanban-content .e-content-row .e-content-cells .e-card-wrapper .e-card .e-card-tag` | Individual card tag |
| `.e-kanban .e-kanban-content .e-content-row.e-swimlane-row .e-content-cells .e-swimlane-header .e-swimlane-row-expand` | Swimlane expand icon |
| `.e-kanban .e-kanban-content .e-content-row.e-swimlane-row .e-content-cells .e-swimlane-header .e-swimlane-row-collapse` | Swimlane collapse icon |
| `.e-kanban .e-kanban-content .e-content-row.e-swimlane-row .e-content-cells .e-swimlane-header .e-swimlane-text` | Swimlane header text |
| `.e-kanban .e-kanban-content .e-content-row.e-swimlane-row .e-content-cells .e-swimlane-header .e-item-count` | Swimlane item count |
| `.e-kanban .e-kanban-content .e-content-row:not(.e-swimlane-row) .e-content-cells.e-dropping` | Card dropping state |

### Custom Styling Examples

#### Customizing Header Colors

```css
/* Custom header background */
.e-kanban .e-kanban-header .e-header-cells {
    background-color: #4a90e2;
    color: white;
}

/* Custom header title */
.e-kanban .e-kanban-header .e-header-cells .e-header-title {
    font-weight: bold;
    font-size: 16px;
}
```

#### Customizing Card Appearance

```css
/* Card styling */
.e-kanban .e-card {
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    padding: 12px;
    margin-bottom: 8px;
}

/* Card header */
.e-kanban .e-card .e-card-header {
    background-color: #f5f5f5;
    padding: 8px;
    border-radius: 4px;
}

/* Card content */
.e-kanban .e-card .e-card-content {
    margin-top: 8px;
    color: #333;
}

/* Selected card */
.e-kanban .e-card.e-selection {
    border: 2px solid #4a90e2;
    background-color: #e3f2fd;
}
```

#### Column Constraints Styling

```css
/* Minimum constraint warning */
.e-kanban .e-header-cells.e-min-color {
    background-color: #fff3cd;
    border-color: #ffc107;
}

/* Maximum constraint warning */
.e-kanban .e-header-cells.e-max-color {
    background-color: #f8d7da;
    border-color: #dc3545;
}
```

#### Fixed Header Position

Create a fixed header that stays visible during scrolling:

```css
/* Fixed Kanban content height */
.e-kanban .e-kanban-content {
    height: 500px;
}

/* Sticky header */
.e-kanban-header {
    position: -webkit-sticky;
    position: sticky;
    z-index: 100;
    top: 0;
}
```

**Note**: This approach does not affect the Kanban content's height.

#### Swimlane Styling

```css
/* Swimlane header */
.e-kanban .e-swimlane-header {
    background-color: #e9ecef;
    font-weight: 600;
    padding: 10px;
}

/* Swimlane text */
.e-kanban .e-swimlane-text {
    color: #495057;
    font-size: 14px;
}
```

## Tooltips

Tooltips display card information when hovering over card elements. Enable using the `enableTooltip` property.

### Basic Tooltip Implementation

```typescript
import { Kanban } from '@syncfusion/ej2-kanban';
import { kanbanData } from './datasource';

let kanbanObj: Kanban = new Kanban({
    dataSource: kanbanData,
    keyField: 'Status',
    columns: [
        { headerText: 'Backlog', keyField: 'Open' },
        { headerText: 'In Progress', keyField: 'InProgress' },
        { headerText: 'Testing', keyField: 'Testing' },
        { headerText: 'Done', keyField: 'Close' }
    ],
    cardSettings: {
        contentField: 'Summary',
        headerField: 'Id'
    },
    enableTooltip: true
});
kanbanObj.appendTo('#Kanban');
```

**Behavior**: Tooltip content is dynamically set based on the card data.

### Tooltip Template

Customize tooltip content with HTML or CSS using the `tooltipTemplate` property.

```typescript
import { Kanban } from '@syncfusion/ej2-kanban';
import { kanbanData } from './datasource';

let kanbanObj: Kanban = new Kanban({
    dataSource: kanbanData,
    keyField: 'Status',
    columns: [
        { headerText: 'Backlog', keyField: 'Open' },
        { headerText: 'In Progress', keyField: 'InProgress' },
        { headerText: 'Testing', keyField: 'Testing' },
        { headerText: 'Done', keyField: 'Close' }
    ],
    cardSettings: {
        contentField: 'Summary',
        headerField: 'Id'
    },
    enableTooltip: true,
    tooltipTemplate: '#tooltipTemplate'
});
kanbanObj.appendTo('#Kanban');
```

#### Tooltip Template HTML

```html
<script id="tooltipTemplate" type="text/x-template">
    <div class="custom-tooltip">
        <div class="tooltip-header">
            <strong>ID:</strong> ${Id}
        </div>
        <div class="tooltip-content">
            <div><strong>Status:</strong> ${Status}</div>
            <div><strong>Assignee:</strong> ${Assignee}</div>
            <div><strong>Priority:</strong> ${Priority}</div>
            <div><strong>Summary:</strong> ${Summary}</div>
        </div>
    </div>
</script>
```

#### Tooltip Template CSS

```css
.custom-tooltip {
    background-color: white;
    border: 1px solid #ddd;
    border-radius: 4px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
    padding: 12px;
    max-width: 300px;
}

.custom-tooltip .tooltip-header {
    background-color: #4a90e2;
    color: white;
    padding: 8px;
    margin: -12px -12px 8px -12px;
    border-radius: 4px 4px 0 0;
}

.custom-tooltip .tooltip-content {
    font-size: 13px;
    line-height: 1.6;
}

.custom-tooltip .tooltip-content div {
    margin-bottom: 4px;
}
```

### Custom Element Tooltips

To show tooltips on custom Kanban elements, add the `e-tooltip-text` class:

```html
<div class="e-tooltip-text" title="Custom tooltip content">
    Custom Element
</div>
```

### Advanced Tooltip Styling

```css
/* Tooltip container */
.e-tooltip-wrap.e-popup {
    border-radius: 6px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

/* Tooltip arrow */
.e-tooltip-wrap .e-arrow-tip {
    color: #333;
}

/* Tooltip content */
.e-tooltip-wrap .e-tip-content {
    padding: 12px;
    font-size: 13px;
    background-color: #333;
    color: white;
}
```

## Edge Cases and Troubleshooting

### Dimension Issues

**Issue**: Kanban not displaying at full size
- **Solution**: Ensure parent container has defined dimensions when using percentage values
- **Solution**: Check for CSS conflicts that might override dimensions

**Issue**: Scrollbars appearing unexpectedly
- **Solution**: Use `overflow: hidden` on parent container
- **Solution**: Adjust dimensions to account for padding and borders

**Issue**: Responsive layout not working
- **Solution**: Use percentage-based dimensions
- **Solution**: Implement CSS media queries for different screen sizes

### Styling Issues

**Issue**: Custom styles not applying
- **Solution**: Ensure CSS specificity is sufficient to override default styles
- **Solution**: Use `!important` sparingly, only when necessary
- **Solution**: Check CSS load order

**Issue**: Fixed header not staying fixed
- **Solution**: Verify parent container doesn't have `overflow: auto`
- **Solution**: Ensure z-index is high enough
- **Solution**: Check for conflicting position properties

**Issue**: Card colors not changing
- **Solution**: Target the correct CSS class (`.e-card` or `.e-card-color`)
- **Solution**: Check if inline styles are overriding CSS

### Tooltip Issues

**Issue**: Tooltips not appearing
- **Solution**: Verify `enableTooltip` is set to `true`
- **Solution**: Check if tooltip template ID matches
- **Solution**: Ensure elements have hoverable area

**Issue**: Tooltip template not rendering
- **Solution**: Verify template script tag has correct `type` attribute
- **Solution**: Check template syntax and field bindings
- **Solution**: Ensure template is in DOM before Kanban initialization

**Issue**: Tooltip positioning incorrect
- **Solution**: Check for CSS transforms on parent elements
- **Solution**: Adjust tooltip position using CSS
- **Solution**: Verify viewport constraints

### Best Practices

#### Dimensions
1. Use percentage for responsive layouts
2. Use pixels for fixed-size applications
3. Always set dimensions on parent container when using percentage
4. Test across different screen sizes

#### Styling
1. Create custom themes using Theme Studio for consistent appearance
2. Use CSS variables for easy theme customization
3. Maintain specificity balance in CSS
4. Test styling across different browsers
5. Use CSS preprocessing (SASS/LESS) for complex themes

#### Tooltips
1. Keep tooltip content concise and relevant
2. Use templates for rich content
3. Test tooltip rendering performance with many cards
4. Ensure tooltips are accessible (keyboard navigation)
5. Consider mobile devices where hover doesn't exist

### Performance Considerations

- Avoid complex CSS selectors
- Minimize use of box-shadow and gradients
- Use CSS transforms for animations
- Optimize tooltip templates for quick rendering
- Consider lazy loading for large datasets

### Accessibility

- Ensure sufficient color contrast ratios
- Provide keyboard navigation support
- Use semantic HTML in templates
- Add ARIA attributes where needed
- Test with screen readers
