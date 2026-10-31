# Columns Configuration

Complete guide to configuring and customizing Kanban columns, which represent each stage of your workflow process.

## Table of Contents
- [Overview](#overview)
- [Single-Key Mapping](#single-key-mapping)
- [Multi-Key Mapping](#multi-key-mapping)
- [Header Text](#header-text)
- [Header Template](#header-template)
- [Toggle Columns](#toggle-columns)
- [Initially Collapsed Columns](#initially-collapsed-columns)
- [Column Drag and Drop](#column-drag-and-drop)
- [Stacked Headers](#stacked-headers)

## Overview

Kanban columns represent each stage of your workflow process. Column definitions serve as the schema for organizing cards on the board. All Kanban operations—drag-and-drop, swimlane grouping, and toggle functionality—are based on column definitions.

**Key concepts:**
- Columns categorize cards based on a `keyField` value
- The `keyField` property is mandatory for rendering columns
- Cards are distributed to columns by matching data field values to column keys

## Single-Key Mapping

Kanban columns are categorized by mapping a key from the data source using the `keyField` property at the Kanban level. Each column's `keyField` property corresponds to values in the data source.

```typescript
import { Kanban } from '@syncfusion/ej2-kanban';
import { kanbanData } from './datasource';

const kanbanObj: Kanban = new Kanban({
    dataSource: kanbanData,
    keyField: 'Status',  // Field name in data source
    columns: [
        { headerText: 'Backlog', keyField: 'Open' },
        { headerText: 'In Progress', keyField: 'InProgress' },
        { headerText: 'Testing', keyField: 'Testing' },
        { headerText: 'Done', keyField: 'Close' }
    ],
    cardSettings: {
        contentField: 'Summary',
        headerField: 'Id'
    }
});
kanbanObj.appendTo('#Kanban');
```

**How it works:**
- Cards with `Status: 'Open'` appear in the "Backlog" column
- Cards with `Status: 'InProgress'` appear in the "In Progress" column
- And so on...

> **Important:** The `keyField` property is mandatory to render columns on the Kanban board.

## Multi-Key Mapping

You can map multiple keys to a single column, allowing cards with different status values to appear in the same column.

```typescript
import { Kanban } from '@syncfusion/ej2-kanban';
import { kanbanData } from './datasource';

const kanbanObj: Kanban = new Kanban({
    dataSource: kanbanData,
    keyField: 'Status',
    columns: [
        { headerText: 'Backlog', keyField: 'Open, Validate' },  // Multiple keys
        { headerText: 'In Progress', keyField: 'InProgress' },
        { headerText: 'Testing', keyField: 'Testing' },
        { headerText: 'Done', keyField: 'Close' }
    ],
    cardSettings: {
        contentField: 'Summary',
        headerField: 'Id'
    }
});
kanbanObj.appendTo('#Kanban');
```

**Use case:** Combine related workflow stages into a single column. In this example, both "Open" and "Validate" status cards appear in the "Backlog" column.

**Key format:** Separate multiple keys with commas and spaces: `'Open, Validate'`

## Header Text

Customize the column header text using the `headerText` property.

```typescript
const kanbanObj: Kanban = new Kanban({
    dataSource: kanbanData,
    keyField: 'Status',
    columns: [
        { headerText: 'To Do', keyField: 'Open' },
        { headerText: 'Development', keyField: 'InProgress' },
        { headerText: 'QA Testing', keyField: 'Testing' },
        { headerText: 'Completed', keyField: 'Close' }
    ],
    cardSettings: {
        contentField: 'Summary',
        headerField: 'Id'
    }
});
kanbanObj.appendTo('#Kanban');
```

**If you don't specify `headerText`:** The column will render without any header text (empty header).

## Header Template

Customize column headers with HTML or CSS elements using the `template` property.

### Available Template Data

When using header templates, you have access to:
- `keyField`: The column's key field value
- `headerText`: The column's header text
- `minCount`: Minimum card count for validation
- `maxCount`: Maximum card count for validation
- `allowToggle`: Whether column can be toggled
- `isExpanded`: Current expansion state
- `showItemCount`: Whether to show card count
- `count`: Current number of cards in the column

### Example with Custom Template

```typescript
import { Kanban } from '@syncfusion/ej2-kanban';
import { kanbanData } from './datasource';

const kanbanObj: Kanban = new Kanban({
    dataSource: kanbanData,
    keyField: 'Status',
    columns: [
        { headerText: 'Backlog', keyField: 'Open', template: '#headerTemplate' },
        { headerText: 'In Progress', keyField: 'InProgress', template: '#headerTemplate' },
        { headerText: 'Review', keyField: 'Review', template: '#headerTemplate' },
        { headerText: 'Done', keyField: 'Close', template: '#headerTemplate' }
    ],
    cardSettings: {
        contentField: 'Summary',
        headerField: 'Id'
    }
});
kanbanObj.appendTo('#Kanban');
```

**HTML Template Example:**
```html
<script id="headerTemplate" type="text/x-template">
    <div class="header-template-wrap">
        <div class="header-icon"></div>
        <div class="header-text">${headerText}</div>
        <div class="card-count">${count} items</div>
    </div>
</script>
```

## Toggle Columns

Allow columns to expand or collapse using the `allowToggle` property.

```typescript
import { Kanban } from '@syncfusion/ej2-kanban';
import { kanbanData } from './datasource';

const kanbanObj: Kanban = new Kanban({
    dataSource: kanbanData,
    keyField: 'Status',
    columns: [
        { headerText: 'Backlog', keyField: 'Open', allowToggle: true },
        { headerText: 'In Progress', keyField: 'InProgress', allowToggle: true },
        { headerText: 'Testing', keyField: 'Testing', allowToggle: true },
        { headerText: 'Done', keyField: 'Close', allowToggle: true }
    ],
    cardSettings: {
        contentField: 'Summary',
        headerField: 'Id'
    }
});
kanbanObj.appendTo('#Kanban');
```

**Behavior:**
- An expand/collapse icon appears in the column header
- Click the icon to toggle the column's expanded/collapsed state
- Collapsed columns show a narrow vertical strip with the header text

> **Note:** By default, collapsed column width is set to 50px.

## Initially Collapsed Columns

Render columns in a collapsed state on initialization using the `isExpanded` property.

```typescript
import { Kanban } from '@syncfusion/ej2-kanban';
import { kanbanData } from './datasource';

const kanbanObj: Kanban = new Kanban({
    dataSource: kanbanData,
    keyField: 'Status',
    columns: [
        { 
            headerText: 'Backlog', 
            keyField: 'Open', 
            allowToggle: true, 
            isExpanded: false  // Start collapsed
        },
        { 
            headerText: 'In Progress', 
            keyField: 'InProgress', 
            allowToggle: true 
        },
        { 
            headerText: 'Testing', 
            keyField: 'Testing', 
            allowToggle: true, 
            isExpanded: false  // Start collapsed
        },
        { 
            headerText: 'Done', 
            keyField: 'Close', 
            allowToggle: true 
        }
    ],
    cardSettings: {
        contentField: 'Summary',
        headerField: 'Id'
    }
});
kanbanObj.appendTo('#Kanban');
```

**Important:** The `isExpanded` property only works when `allowToggle` is enabled for that column.

In this example:
- "Backlog" and "Testing" columns start collapsed
- "In Progress" and "Done" columns start expanded

## Column Drag and Drop

Enable dynamic column reordering through drag-and-drop interactions.

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
    allowColumnDragAndDrop: true  // Enable column reordering
});
kanbanObj.appendTo('#Kanban');
```

**Behavior:**
- Users can drag a column header to a new position
- Visual feedback highlights potential drop locations
- Column order changes dynamically
- All cards within the column move with it

**Use cases:**
- Allow users to customize workflow order
- Adapt board layout to team preferences
- Reorder stages during retrospectives

## Stacked Headers

Group related columns under a common header for visual organization.

```typescript
import { Kanban } from '@syncfusion/ej2-kanban';
import { kanbanData } from './datasource';

const kanbanObj: Kanban = new Kanban({
    dataSource: kanbanData,
    keyField: 'Status',
    columns: [
        { headerText: 'Backlog', keyField: 'Open' },
        { headerText: 'In Progress', keyField: 'InProgress' },
        { headerText: 'Review', keyField: 'Review' },
        { headerText: 'Done', keyField: 'Close' }
    ],
    stackedHeaders: [
        { text: 'To Do', keyFields: 'Open' },
        { text: 'Development Phase', keyFields: 'InProgress, Review' },
        { text: 'Done', keyFields: 'Close' }
    ],
    cardSettings: {
        contentField: 'Summary',
        headerField: 'Id'
    }
});
kanbanObj.appendTo('#Kanban');
```

**Stacked Header Configuration:**
- `text`: The header text for the grouped columns
- `keyFields`: Comma-separated column keys to group together

**In this example:**
- "To Do" header spans the "Open" column
- "Development Phase" header spans "InProgress" and "Review" columns
- "Done" header spans the "Close" column

**Visual result:**
```
┌────────┬─────────────────────────┬──────┐
│ To Do  │  Development Phase      │ Done │
├────────┼────────────┬────────────┼──────┤
│Backlog │In Progress │   Review   │ Done │
└────────┴────────────┴────────────┴──────┘
```

**Use cases:**
- Organize workflow phases (Planning, Execution, Completion)
- Group by responsibility (Dev, QA, Operations)
- Show high-level process stages

## Column Configuration Summary

### Essential Properties

| Property | Type | Description |
|----------|------|-------------|
| `keyField` | string | Value(s) from data source to match (required) |
| `headerText` | string | Display text for column header |
| `allowToggle` | boolean | Enable expand/collapse functionality |
| `isExpanded` | boolean | Initial expansion state (requires `allowToggle`) |
| `template` | string | Custom header template selector |
| `minCount` | number | Minimum card count (for validation) |
| `maxCount` | number | Maximum card count (for validation) |
| `showItemCount` | boolean | Display card count in header |

### Kanban-Level Properties

| Property | Type | Description |
|----------|------|-------------|
| `keyField` | string | Data source field name for categorization (required) |
| `columns` | Array | Column definitions |
| `stackedHeaders` | Array | Grouped header definitions |
| `allowColumnDragAndDrop` | boolean | Enable column reordering |

## Best Practices

1. **Keep keyField values consistent**: Ensure data values match column keyField definitions exactly.

2. **Use meaningful header text**: Column headers should clearly describe the workflow stage.

3. **Limit multi-key mappings**: Too many keys in one column can make the board confusing.

4. **Use stacked headers for clarity**: When you have many columns, group them logically.

5. **Consider toggle for less-used columns**: Columns like "Archive" or "Backlog" can start collapsed.

6. **Test column drag-drop carefully**: Ensure your workflow logic doesn't depend on fixed column order if you enable reordering.

## Troubleshooting

**Cards not appearing in columns:**
- Verify `keyField` at Kanban level matches your data field name
- Check that data values match column `keyField` values exactly (case-sensitive)

**Toggle icons not showing:**
- Ensure `allowToggle: true` is set on the column

**isExpanded not working:**
- `allowToggle` must be `true` for `isExpanded` to work

**Stacked headers overlapping:**
- Verify `keyFields` values match actual column `keyField` properties
- Ensure no duplicate keys across stacked headers
