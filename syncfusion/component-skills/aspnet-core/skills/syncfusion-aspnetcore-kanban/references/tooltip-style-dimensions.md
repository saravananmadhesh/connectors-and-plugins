# Tooltip, Style, and Dimensions in Syncfusion ASP.NET Core Kanban

## Table of Contents
- [Default Tooltip](#default-tooltip)
- [Custom Tooltip Template](#custom-tooltip-template)
- [Tooltip on Custom Elements](#tooltip-on-custom-elements)
- [CSS Class Reference](#css-class-reference)
- [Sticky Column Headers](#sticky-column-headers)
- [Board Dimensions](#board-dimensions)

## Default Tooltip

Enable hover tooltips on cards with `enableTooltip`:

```html
<ejs-kanban id="Kanban" keyField="Status" dataSource="@ViewBag.data"
    enableTooltip="true">
    <e-kanban-columns>
        <e-kanban-column headerText="To Do" keyField="Open"></e-kanban-column>
        <e-kanban-column headerText="Done" keyField="Close"></e-kanban-column>
    </e-kanban-columns>
    <e-kanban-cardsettings contentField="Summary" headerField="Title"></e-kanban-cardsettings>
</ejs-kanban>
```

The default tooltip shows all the card's data fields as key-value pairs when hovering over a card.

## Custom Tooltip Template

Replace the default tooltip content with a custom HTML template:

```html
<ejs-kanban id="Kanban" keyField="Status" dataSource="@ViewBag.data"
    enableTooltip="true" tooltipTemplate="tooltipTemp">
    <e-kanban-columns>
        <e-kanban-column headerText="To Do" keyField="Open"></e-kanban-column>
        <e-kanban-column headerText="Done" keyField="Close"></e-kanban-column>
    </e-kanban-columns>
    <e-kanban-cardsettings contentField="Summary" headerField="Title"></e-kanban-cardsettings>
</ejs-kanban>

<script id="tooltipTemp" type="text/x-template">
    <div class="e-kanbantooltiptemp">
        <table>
            <tbody>
                <tr>
                    <td class="details">
                        <table>
                            <colgroup>
                                <col style="width:30%">
                                <col style="width:70%">
                            </colgroup>
                            <tbody>
                                <tr>
                                    <td class="CardHeader">Assignee:</td>
                                    <td>${Assignee}</td>
                                </tr>
                                <tr>
                                    <td class="CardHeader">Type:</td>
                                    <td>${Type}</td>
                                </tr>
                                <tr>
                                    <td class="CardHeader">Estimate:</td>
                                    <td>${Estimate}</td>
                                </tr>
                                <tr>
                                    <td class="CardHeader">Summary:</td>
                                    <td>${Summary}</td>
                                </tr>
                            </tbody>
                        </table>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</script>
```

- `tooltipTemplate` value is the `id` of a `<script type="text/x-template">` block (without the `#` prefix)
- Use `${fieldName}` syntax to render card data field values
- The template receives the full card data object as context

## Tooltip on Custom Elements

Show a tooltip when hovering over custom HTML elements inside a card template:

```html
<script id="cardTemplate" type="text/x-template">
    <div class="card-template">
        <span class="e-tooltip-text">${Tags}</span>
    </div>
</script>
```

Add the CSS class `e-tooltip-text` to any element within a card template to enable the tooltip trigger on hover for that specific element. This works in combination with `enableTooltip="true"` and an optional `tooltipTemplate`.

## CSS Class Reference

Use these CSS classes to customize Kanban appearance:

| CSS Class | Targets |
|---|---|
| `.e-kanban` | Root Kanban container |
| `.e-kanban .e-kanban-table` | Kanban table element |
| `.e-kanban-header` | Column header row container |
| `.e-header-cells` | Individual column header cell |
| `.e-header-text` | Column header text label |
| `.e-item-count` | Card count badge in column header |
| `.e-min-color` | Count badge when below `minCount` |
| `.e-max-color` | Count badge when above `maxCount` |
| `.e-kanban-content` | Scrollable content area below headers |
| `.e-content-cells` | Individual column content cell |
| `.e-card-wrapper` | Container wrapping all cards in a column |
| `.e-card-wrapper .e-card` | Individual card element |
| `.e-card-header` | Card header row |
| `.e-card-header-title` | Card header title text |
| `.e-card-content` | Card body content text |
| `.e-swimlane-header` | Swimlane row header container |
| `.e-swimlane-text` | Swimlane row label text |
| `.e-swimlane-row` | Full swimlane row (header + card cells) |

**Example — custom card styling:**

```css
.e-kanban .e-card-wrapper .e-card {
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.e-kanban .e-card-header-title {
    font-weight: 600;
    color: #333;
}

.e-kanban .e-swimlane-header {
    background-color: #f0f4f8;
}
```

## Sticky Column Headers

Make the column header row sticky so it stays visible when scrolling down through many cards:

```css
.e-kanban .e-kanban-content {
    height: 500px;
    overflow-y: auto;
}

.e-kanban .e-kanban-header {
    position: sticky;
    top: 0;
    z-index: 100;
}
```

Apply this CSS to make the board fixed-height with a scrolling content area, while the column headers remain pinned at the top.

For Theme Studio customization, visit: https://ej2.syncfusion.com/themestudio/

## Board Dimensions

Control the overall width and height of the Kanban board:

```html
<!-- Auto width and height (default — fits parent container) -->
<ejs-kanban id="Kanban" keyField="Status" dataSource="@ViewBag.data"
    width="auto" height="auto">

<!-- Fixed pixel dimensions -->
<ejs-kanban id="Kanban" keyField="Status" dataSource="@ViewBag.data"
    width="800" height="600">

<!-- Percentage of parent container -->
<ejs-kanban id="Kanban" keyField="Status" dataSource="@ViewBag.data"
    width="100%" height="80%">
```

| Value type | Example | Behavior |
|---|---|---|
| `auto` | `width="auto"` | Fills parent container size (default) |
| Pixels (number) | `height="600"` | Exact pixel dimensions |
| Pixels (string) | `width="550px"` | Exact pixel dimensions |
| Percentage | `height="100%"` | Relative to parent container |

The `height` property is especially useful in combination with sticky headers — set a fixed height to create a scrollable card area while keeping headers visible.
