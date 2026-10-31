# Swimlane Configuration

Complete guide to configuring and customizing swimlanes, which provide horizontal categorization of cards on the Kanban board.

## Table of Contents
- [Overview](#overview)
- [Render Swimlane Row](#render-swimlane-row)
- [Custom Row Text](#custom-row-text)
- [Swimlane Template](#swimlane-template)
- [Sorting Swimlanes](#sorting-swimlanes)
- [Drag-and-Drop Across Swimlanes](#drag-and-drop-across-swimlanes)
- [Empty Swimlane Rows](#empty-swimlane-rows)
- [Card Count Display](#card-count-display)
- [Frozen Swimlane Rows](#frozen-swimlane-rows)

## Overview

Swimlanes are horizontal categorizations of cards on the Kanban board. They group cards into rows, bringing transparency to the workflow process.

**Key concepts:**
- Swimlanes group cards based on a field value (e.g., by assignee, priority, team)
- Each swimlane row spans across all columns
- Cards within a swimlane can be moved between columns
- Optional: Cards can be dragged between swimlanes

## Render Swimlane Row

Cards are grouped based on the `keyField` property in `swimlaneSettings` and displayed in rows separated by columns.

### Basic Swimlane Configuration

```typescript
import { Kanban } from '@syncfusion/ej2-kanban';
import { kanbanData } from './datasource';

const kanbanObj: Kanban = new Kanban({
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
    swimlaneSettings: {
        keyField: 'Assignee'  // Group cards by Assignee field
    }
});
kanbanObj.appendTo('#Kanban');
```

**How it works:**
- Cards with `Assignee: 'Nancy Davloio'` appear in the "Nancy Davloio" swimlane row
- Cards with `Assignee: 'Andrew Fuller'` appear in the "Andrew Fuller" swimlane row
- Each swimlane row contains columns for the workflow stages

> **Important:** It's mandatory to define `keyField` in `swimlaneSettings` to render swimlane rows.

## Custom Row Text

Customize the swimlane row header text using the `textField` property.

### Using textField

```typescript
import { Kanban } from '@syncfusion/ej2-kanban';
import { kanbanData } from './datasource';

const kanbanObj: Kanban = new Kanban({
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
    swimlaneSettings: {
        keyField: 'Assignee',
        textField: 'AssigneeName'  // Display name field
    }
});
kanbanObj.appendTo('#Kanban');
```

**textField behavior:**
- If `textField` is defined, it displays the value from that field
- If `textField` is not defined, it automatically uses `keyField` value
- If the mapping `textField` key is not present in the data, it falls back to `keyField`

**Example data structure:**
```typescript
const kanbanData = [
    {
        Id: 1,
        Status: 'Open',
        Summary: 'Task description',
        Assignee: 'emp001',           // keyField value
        AssigneeName: 'Nancy Davloio'  // textField value (displayed)
    }
];
```

> **Note:** Defining `textField` is optional. The control will automatically consider `keyField` for swimlane row header text if `textField` is not specified.

## Swimlane Template

Customize swimlane row headers with HTML elements using the `template` property.

### Available Template Data

When using swimlane templates, you have access to:
- `keyField`: The swimlane's key field value
- `textField`: The swimlane's text field value  
- `count`: Number of cards in this swimlane row

### Example with Custom Template

```typescript
import { Kanban } from '@syncfusion/ej2-kanban';
import { kanbanData } from './datasource';

const kanbanObj: Kanban = new Kanban({
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
    swimlaneSettings: {
        keyField: 'Assignee',
        textField: 'AssigneeName',
        template: '#swimlaneTemplate'  // Reference to template
    }
});
kanbanObj.appendTo('#Kanban');
```

### HTML Template Example

```html
<script id="swimlaneTemplate" type="text/x-template">
    <div class="swimlane-template">
        <div class="swimlane-header">
            <div class="avatar">
                <img src="images/${keyField}.png" alt="${textField}" />
            </div>
            <div class="swimlane-info">
                <div class="assignee-name">${textField}</div>
                <div class="task-count">${count} tasks</div>
            </div>
        </div>
    </div>
</script>
```

### Custom CSS for Templates

```css
.swimlane-template {
    padding: 10px;
    background: #f5f5f5;
    border-bottom: 2px solid #ddd;
}

.swimlane-header {
    display: flex;
    align-items: center;
    gap: 12px;
}

.avatar img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    object-fit: cover;
}

.assignee-name {
    font-weight: 600;
    font-size: 1rem;
    color: #333;
}

.task-count {
    font-size: 0.85rem;
    color: #666;
}
```

## Sorting Swimlanes

Control the order of swimlane rows using the `sortBy` property.

### Sort Ascending (Default)

```typescript
import { Kanban } from '@syncfusion/ej2-kanban';
import { kanbanData } from './datasource';

const kanbanObj: Kanban = new Kanban({
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
    swimlaneSettings: {
        keyField: 'Assignee',
        sortBy: 'Ascending'  // Default - A to Z
    }
});
kanbanObj.appendTo('#Kanban');
```

### Sort Descending

```typescript
const kanbanObj: Kanban = new Kanban({
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
    swimlaneSettings: {
        keyField: 'Assignee',
        sortBy: 'Descending'  // Z to A
    }
});
kanbanObj.appendTo('#Kanban');
```

**Sort behavior:**
- **Ascending**: Alphabetical order (A-Z) or numerical order (0-9)
- **Descending**: Reverse alphabetical order (Z-A) or reverse numerical (9-0)
- Sorting is based on the `textField` value (or `keyField` if `textField` is not defined)

## Drag-and-Drop Across Swimlanes

By default, Kanban does not allow dragging cards across swimlane rows. Enable cross-swimlane dragging with the `allowDragAndDrop` property.

### Enable Cross-Swimlane Dragging

```typescript
import { Kanban } from '@syncfusion/ej2-kanban';
import { kanbanData } from './datasource';

const kanbanObj: Kanban = new Kanban({
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
    swimlaneSettings: {
        keyField: 'Assignee',
        allowDragAndDrop: true  // Enable cross-swimlane dragging
    }
});
kanbanObj.appendTo('#Kanban');
```

**Default behavior (allowDragAndDrop: false):**
- Cards can be dragged between columns within the same swimlane row
- Cards cannot be dragged to different swimlane rows
- Swimlane grouping is strictly maintained

**Enabled behavior (allowDragAndDrop: true):**
- Cards can be dragged between columns
- Cards can be dragged to different swimlane rows
- Dragging a card to a different swimlane updates the card's grouping field value

**Use cases:**
- **Reassigning tasks**: Drag a card from one assignee's swimlane to another
- **Changing priorities**: Move cards between priority-based swimlanes
- **Team rebalancing**: Distribute work across team swimlanes

## Empty Swimlane Rows

Render empty swimlane rows for field values that have no cards.

### Enable Empty Rows

```typescript
import { Kanban } from '@syncfusion/ej2-kanban';
import { kanbanData } from './datasource';

const kanbanObj: Kanban = new Kanban({
    dataSource: kanbanData,
    keyField: 'Status',
    columns: [
        { headerText: 'Backlog', keyField: 'Open' },
        { headerText: 'In Progress', keyField: 'InProgress' },
        { headerText: 'Done', keyField: 'Close' }
    ],
    cardSettings: {
        contentField: 'Summary',
        headerField: 'Id'
    },
    swimlaneSettings: {
        keyField: 'Assignee',
        showEmptyRow: true  // Show rows even without cards
    }
});
kanbanObj.appendTo('#Kanban');
```

**Behavior:**
- If a mapped `keyField` value exists in the data but has no cards, an empty swimlane row is rendered
- Empty rows show the swimlane header but no cards
- Useful for showing all team members or categories even if they have no current work

**Use cases:**
- Display all team members (even those with no current tasks)
- Show all priorities or categories for completeness
- Maintain consistent board structure

## Card Count Display

Show or hide the total number of cards in each swimlane row header.

### Enable Card Count (Default)

```typescript
import { Kanban } from '@syncfusion/ej2-kanban';
import { kanbanData } from './datasource';

const kanbanObj: Kanban = new Kanban({
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
    swimlaneSettings: {
        keyField: 'Assignee',
        showItemCount: true  // Default - show card count
    }
});
kanbanObj.appendTo('#Kanban');
```

### Disable Card Count

```typescript
const kanbanObj: Kanban = new Kanban({
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
    swimlaneSettings: {
        keyField: 'Assignee',
        showItemCount: false  // Hide card count
    }
});
kanbanObj.appendTo('#Kanban');
```

**Display format:** "5 items" or "1 item" (localized)

> **Localization:** The "items" text supports localization for internationalization.

## Frozen Swimlane Rows

Make the current swimlane row header always visible when scrolling the Kanban content.

### Enable Frozen Rows

```typescript
import { Kanban } from '@syncfusion/ej2-kanban';
import { kanbanData } from './datasource';

const kanbanObj: Kanban = new Kanban({
    dataSource: kanbanData,
    keyField: 'Status',
    height: 500,  // Fixed height enables scrolling
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
    swimlaneSettings: {
        keyField: 'Assignee',
        enableFrozenRows: true  // Keep current swimlane header visible
    }
});
kanbanObj.appendTo('#Kanban');
```

**Behavior:**
- As you scroll through the Kanban content, the current swimlane row header stays visible at the top
- The header text changes dynamically as you scroll into different swimlane rows
- Provides context about which swimlane you're currently viewing

> **Important:** This feature only works when Kanban content scrolling is enabled (set a fixed `height` for the Kanban).

**Requirements:**
- Kanban must have a fixed height (e.g., `height: 500`)
- Multiple swimlane rows must exist
- Content must be scrollable

## Swimlane Settings Summary

### Essential Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `keyField` | string | - | Data field for grouping cards (required) |
| `textField` | string | - | Data field for display text (optional) |
| `template` | string | - | Custom header template selector |
| `sortBy` | string | 'Ascending' | 'Ascending' or 'Descending' |
| `allowDragAndDrop` | boolean | false | Enable cross-swimlane dragging |
| `showEmptyRow` | boolean | false | Show rows with no cards |
| `showItemCount` | boolean | true | Display card count in header |
| `enableFrozenRows` | boolean | false | Keep current header visible when scrolling |

## Best Practices

1. **Choose meaningful grouping**: Select a `keyField` that provides clear categorization (assignee, priority, team, project).

2. **Use textField for readability**: If your data has IDs, map `textField` to a human-readable name field.

3. **Enable cross-swimlane dragging carefully**: Only enable if your workflow allows reassignment or re-categorization.

4. **Consider frozen rows for many swimlanes**: Helps maintain context when scrolling through many rows.

5. **Show empty rows for completeness**: Useful for seeing all team members or all categories at a glance.

6. **Customize templates for rich information**: Use templates to show avatars, metrics, or additional context.

## Troubleshooting

**Swimlanes not rendering:**
- Verify `keyField` in `swimlaneSettings` maps to a valid data field
- Check that data contains the mapped field
- Ensure data has varied values for the grouping field

**Cross-swimlane dragging not working:**
- Check `allowDragAndDrop` is set to `true` in `swimlaneSettings`
- Verify cards are not in disabled state

**Frozen rows not working:**
- Ensure Kanban has a fixed height
- Verify content is scrollable (more content than visible area)
- Check `enableFrozenRows` is `true`

**Empty rows not showing:**
- Verify `showEmptyRow` is `true`
- Check that data actually has the field values you expect to see
- Ensure the field values exist in at least one data record

**Template not applying:**
- Ensure template ID matches (including '#' prefix)
- Verify template script tag is in the DOM before initialization
- Check template data bindings use correct field names
