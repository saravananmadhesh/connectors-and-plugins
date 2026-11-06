# Cards Configuration

Complete guide to configuring and customizing Kanban cards, which represent individual tasks or work items on the board.

## Table of Contents
- [Overview](#overview)
- [Drag-and-Drop](#drag-and-drop)
- [Card Header](#card-header)
- [Card Content](#card-content)
- [Card Template](#card-template)
- [Card Selection](#card-selection)
- [Multiple Selection](#multiple-selection)

## Overview

Cards are the main elements in the Kanban board, representing task information with headers and content. The header and content of a card are fetched from corresponding mapping fields in your data source. Card layouts can be fully customized using templates.

**Key concepts:**
- Cards display data from your data source
- Each card must have a unique identifier (headerField)
- Cards can be dragged between columns and swimlanes
- Cards support single and multiple selection
- Custom templates allow complete layout control

## Drag-and-Drop

Transit or change card positions using drag-and-drop functionality.

### Enable/Disable Drag-and-Drop

By default, the `allowDragAndDrop` property is enabled, allowing cards to be moved:
- **Column-to-column**: Move cards between different workflow stages
- **Within column**: Reorder cards within the same column

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
    allowDragAndDrop: true  // Default is true
});
kanbanObj.appendTo('#Kanban');
```

### Disable Drag-and-Drop

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
    allowDragAndDrop: false  // Disable dragging
});
kanbanObj.appendTo('#Kanban');
```

**Use case for disabling:** View-only boards, completed sprints, or boards requiring approval workflow.

### Visual Feedback

When dragging cards:
- A dotted border appears on Kanban cells (except the dragged clone)
- Indicates possible drop locations
- Provides clear visual guidance for where cards can be placed

## Card Header

The card header displays a unique identifier for each card.

### Configure Header Field

Map the `headerField` property to a unique field in your data source:

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
        headerField: 'Id'  // Maps to 'Id' field in data
    }
});
kanbanObj.appendTo('#Kanban');
```

> **Critical:** The `headerField` property is mandatory to render cards. It acts as a unique identifier and prevents card data duplication. You cannot change the `headerField` value using the `updateCard` method or server-side updates.

### Show/Hide Card Header

Control header visibility using the `showHeader` property:

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
        showHeader: false,  // Hide card headers
        contentField: 'Summary',
        headerField: 'Id'  // Still required even when hidden
    }
});
kanbanObj.appendTo('#Kanban');
```

**Note:** By default, `showHeader` is `true`. Even when hiding headers, you must still define `headerField`.

## Card Content

The card's content is fetched from the data source using the `contentField` property.

### Basic Content Configuration

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
        contentField: 'Summary',  // Maps to 'Summary' field in data
        headerField: 'Id'
    }
});
kanbanObj.appendTo('#Kanban');
```

### Empty Content

If `contentField` is not specified, cards render with empty content (only the header will be visible).

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
        headerField: 'Id'
        // No contentField - cards will have empty body
    }
});
kanbanObj.appendTo('#Kanban');
```

## Card Template

Customize the card layout beyond the default header and content structure using templates.

### Basic Template Example

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
        headerField: 'Id',
        template: '#cardTemplate'  // Reference to template element
    }
});
kanbanObj.appendTo('#Kanban');
```

### HTML Template Definition

Define the template in your HTML:

```html
<script id="cardTemplate" type="text/x-template">
    <div class="card-template">
        <div class="card-header">
            <span class="card-id">#${Id}</span>
            <span class="card-type ${Type}">${Type}</span>
        </div>
        <div class="card-content">
            <p class="card-summary">${Summary}</p>
        </div>
        <div class="card-footer">
            <div class="card-priority">
                <span class="priority-label">Priority:</span>
                <span class="priority-value ${Priority}">${Priority}</span>
            </div>
            <div class="card-assignee">
                <span class="assignee-icon">👤</span>
                <span class="assignee-name">${Assignee}</span>
            </div>
        </div>
        <div class="card-tags">
            ${Tags}
        </div>
    </div>
</script>
```

### Template with Conditional Logic

```html
<script id="cardTemplate" type="text/x-template">
    <div class="card-template priority-${Priority}">
        <div class="card-header">
            <span class="card-id">#${Id}</span>
            {{if Type === 'Bug'}}
                <span class="card-badge bug">🐛 Bug</span>
            {{/if}}
            {{if Type === 'Story'}}
                <span class="card-badge story">📖 Story</span>
            {{/if}}
        </div>
        <div class="card-content">${Summary}</div>
        <div class="card-meta">
            <span class="estimate">⏱️ ${Estimate}h</span>
            <span class="assignee">👤 ${Assignee}</span>
        </div>
    </div>
</script>
```

### Custom CSS for Templates

```css
.card-template {
    padding: 10px;
    border-radius: 4px;
    background: #fff;
    box-shadow: 0 1px 3px rgba(0,0,0,0.1);
}

.card-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 8px;
    font-weight: 600;
}

.card-type.Bug {
    background: #ffebee;
    color: #c62828;
    padding: 2px 8px;
    border-radius: 3px;
    font-size: 0.75rem;
}

.card-type.Story {
    background: #e3f2fd;
    color: #1565c0;
    padding: 2px 8px;
    border-radius: 3px;
    font-size: 0.75rem;
}

.priority-value.Critical {
    color: #d32f2f;
    font-weight: bold;
}

.priority-value.High {
    color: #f57c00;
}

.priority-value.Normal {
    color: #388e3c;
}

.priority-value.Low {
    color: #757575;
}
```

## Card Selection

Enable card selection for interaction and bulk operations.

### Selection Types

The `selectionType` property controls how cards can be selected:

- **None**: No cards can be selected
- **Single**: Only one card can be selected at a time
- **Multiple**: Multiple cards can be selected simultaneously

### Single Selection (Default)

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
        headerField: 'Id',
        selectionType: 'Single'  // Default
    }
});
kanbanObj.appendTo('#Kanban');
```

**Behavior:** Click a card to select it. Clicking another card deselects the first and selects the new one.

### Disable Selection

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
        headerField: 'Id',
        selectionType: 'None'
    }
});
kanbanObj.appendTo('#Kanban');
```

**Use case:** View-only boards or when selection might cause confusion.

## Multiple Selection

Enable multiple card selection for bulk operations.

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
        headerField: 'Id',
        selectionType: 'Multiple'
    }
});
kanbanObj.appendTo('#Kanban');
```

### Selection Methods

**Random selection with Ctrl + Click:**
- Hold `Ctrl` key and click cards to select/deselect individual cards
- Selected cards are highlighted
- Each card can be independently selected

**Continuous selection with Shift + Click:**
- Click the first card
- Hold `Shift` key and click another card
- All cards between the two clicks are selected

**Mouse-only selection:**
- Single click selects one card
- Ctrl+Click adds/removes cards from selection
- Shift+Click selects range

**Keyboard selection:**
- Use arrow keys to navigate
- Use `Ctrl+Space` or `Enter` to toggle selection
- Use `Shift+Arrow keys` for range selection

### Use Cases for Multiple Selection

1. **Bulk status updates**: Select multiple cards and move them together
2. **Batch deletion**: Select and delete multiple completed tasks
3. **Assignment**: Select cards to assign to a team member
4. **Reporting**: Select cards to generate reports on specific work items
5. **Priority adjustment**: Select related cards to update priority

## Card Settings Summary

### Essential Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `headerField` | string | - | Unique identifier field (required) |
| `contentField` | string | - | Content display field |
| `template` | string | - | Custom card template selector |
| `showHeader` | boolean | true | Show/hide card headers |
| `selectionType` | string | 'Single' | 'None', 'Single', or 'Multiple' |

### Additional Properties

| Property | Type | Description |
|----------|------|-------------|
| `grabberField` | string | Field for custom drag handle |
| `tagsField` | string | Field for displaying tags |
| `footerCssField` | string | Field for footer CSS class |

## Best Practices

1. **Always define headerField**: It's mandatory and must be unique for each card.

2. **Use meaningful content**: Map `contentField` to the most important information users need to see at a glance.

3. **Keep templates simple**: Complex templates can impact performance with many cards.

4. **Test selection behavior**: Ensure single vs. multiple selection matches your workflow needs.

5. **Consider accessibility**: When hiding headers, ensure cards are still distinguishable.

6. **Style templates consistently**: Maintain visual consistency across all card states.

## Troubleshooting

**Cards not rendering:**
- Verify `headerField` is defined and maps to a unique field
- Check that data source contains the mapped fields

**Empty cards:**
- Check `contentField` maps to a valid field in your data
- Verify data source has values for that field

**Template not applying:**
- Ensure template ID matches (including '#' prefix)
- Verify template script tag is in the DOM before Kanban initialization

**Selection not working:**
- Check `selectionType` is set correctly
- Ensure cards are not disabled
- Verify no CSS is preventing pointer events

**Drag-and-drop not working:**
- Check `allowDragAndDrop` is true (default)
- Ensure cards are not in disabled state
- Verify no overlaying elements blocking interaction
