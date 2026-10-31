# Kanban Properties Reference

Complete reference for all properties available in the Syncfusion TypeScript Kanban component.

## Overview

The Kanban component provides extensive configuration through properties that control behavior, appearance, data binding, and interactions. This reference covers all available properties with their types, default values, and use cases.

## Core Properties

### dataSource

**Type:** `Record[] | DataManager`  
**Default:** `[]`

**Description:** Binds card data to the Kanban. Accepts either a JavaScript object array or a DataManager instance for remote data.

**Use Cases:**
- Local data binding with JSON arrays
- Remote data binding with APIs
- OData service integration
- Dynamic data loading

**Example:**
```typescript
// Local array
const kanbanData = [
    { Id: 1, Status: 'Open', Summary: 'Task 1' },
    { Id: 2, Status: 'InProgress', Summary: 'Task 2' }
];

const kanbanObj = new Kanban({
    dataSource: kanbanData
});

// Remote data with DataManager
const dataManager = new DataManager({
    url: 'https://api.example.com/tasks',
    adaptor: new WebApiAdaptor()
});

const kanbanObj = new Kanban({
    dataSource: dataManager
});
```

### keyField

**Type:** `string`  
**Default:** `null`

**Description:** Specifies the field name from the data source that maps to column keyField values. This is the critical field that determines which column a card belongs to.

**Use Cases:**
- Map cards to columns
- Define workflow stages
- Control card placement

**Example:**
```typescript
const kanbanObj = new Kanban({
    dataSource: kanbanData,
    keyField: 'Status', // Maps to Status field in data
    columns: [
        { keyField: 'Open', headerText: 'To Do' },
        { keyField: 'InProgress', headerText: 'In Progress' }
    ]
});
```

### columns

**Type:** `ColumnsModel[]`  
**Default:** `[]`

**Description:** Defines the Kanban board columns with their properties.

**ColumnsModel Interface:**
- `headerText: string` - Column header title
- `keyField: string | number` - Column key (single or comma-separated for multi-key)
- `allowDrag: boolean` - Enable column drag
- `allowDrop: boolean` - Enable card drop
- `allowToggle: boolean` - Enable expand/collapse
- `isExpanded: boolean` - Initial expanded state
- `minCount: number` - Minimum card count
- `maxCount: number` - Maximum card count (WIP limit)
- `showAddButton: boolean` - Show add button
- `showItemCount: boolean` - Show card count
- `template: string | Function` - Column template
- `transitionColumns: string[]` - Valid target columns for transitions

**Example:**
```typescript
columns: [
    {
        headerText: 'To Do',
        keyField: 'Open',
        allowToggle: true,
        isExpanded: true,
        showItemCount: true
    },
    {
        headerText: 'In Progress',
        keyField: 'InProgress',
        maxCount: 5, // WIP limit
        showAddButton: true,
        transitionColumns: ['Testing', 'Close']
    }
]
```

## Card Settings

### cardSettings

**Type:** `CardSettingsModel`  
**Default:** `{}`

**Description:** Configures card display properties.

**CardSettingsModel Interface:**
- `headerField: string` - Card header text field (typically ID)
- `contentField: string` - Card content text field
- `tagsField: string` - Card tags/labels field
- `grabberField: string` - Card color field
- `footerCssField: string` - Card footer icons field
- `template: string | Function` - Custom card template
- `selectionType: SelectionType` - Card selection mode ('Single' | 'Multiple' | 'None')
- `showHeader: boolean` - Show/hide card headers

**Example:**
```typescript
cardSettings: {
    headerField: 'Id',
    contentField: 'Summary',
    tagsField: 'Tags',
    grabberField: 'Color',
    showHeader: true,
    selectionType: 'Multiple'
}
```

### cardHeight

**Type:** `string`  
**Default:** `'auto'`

**Description:** Sets the height of each card. Use 'auto' for content-based height or specify pixel values like '100px'.

**Example:**
```typescript
cardHeight: '120px' // Fixed height
cardHeight: 'auto'  // Auto-adjust to content
```

## Swimlane Settings

### swimlaneSettings

**Type:** `SwimlaneSettingsModel`  
**Default:** `{}`

**Description:** Configures swimlane rows for grouping cards.

**SwimlaneSettingsModel Interface:**
- `keyField: string` - Field for swimlane grouping
- `textField: string` - Swimlane header text field
- `template: string | Function` - Swimlane row template
- `allowDragAndDrop: boolean` - Enable drag-drop across swimlanes
- `showEmptyRow: boolean` - Show empty swimlane rows
- `showUnassignedRow: boolean` - Show unassigned row for cards without swimlane value
- `showItemCount: boolean` - Display card count per swimlane
- `enableFrozenRows: boolean` - Freeze swimlane rows
- `sortDirection: SortDirection` - Sort order ('Ascending' | 'Descending')
- `sortComparer: Function` - Custom sort function

**Example:**
```typescript
swimlaneSettings: {
    keyField: 'Assignee',
    textField: 'Assignee',
    showItemCount: true,
    allowDragAndDrop: true,
    sortDirection: 'Ascending',
    showUnassignedRow: true
}
```

## Dialog Settings

### dialogSettings

**Type:** `DialogSettingsModel`  
**Default:** `{}`

**Description:** Configures the add/edit dialog.

**DialogSettingsModel Interface:**
- `fields: DialogFieldsModel[]` - Dialog field configurations
- `template: string | Function` - Custom dialog template
- `model: DialogModel` - Dialog component properties (width, height, etc.)

**DialogFieldsModel:**
- `text: string` - Field label
- `key: string` - Data source field name
- `type: string` - Field type ('TextBox' | 'DropDown' | 'Numeric' | 'TextArea')
- `validationRules: Object` - Validation rules

**Example:**
```typescript
dialogSettings: {
    fields: [
        { text: 'ID', key: 'Id', type: 'TextBox' },
        { text: 'Status', key: 'Status', type: 'DropDown' },
        { text: 'Priority', key: 'Priority', type: 'DropDown' },
        { text: 'Summary', key: 'Summary', type: 'TextArea' }
    ]
}
```

## Drag-and-Drop Properties

### allowDragAndDrop

**Type:** `boolean`  
**Default:** `true`

**Description:** Enables or disables card drag-and-drop within the board.

**Example:**
```typescript
allowDragAndDrop: true  // Enable drag-drop
allowDragAndDrop: false // Disable drag-drop
```

### allowColumnDragAndDrop

**Type:** `boolean`  
**Default:** `false`

**Description:** Enables or disables column reordering via drag-and-drop.

**Example:**
```typescript
allowColumnDragAndDrop: true // Allow column reordering
```

### externalDropId

**Type:** `string[]`  
**Default:** `[]`

**Description:** Specifies IDs of external Kanban boards where cards can be dropped (for multi-board scenarios).

**Example:**
```typescript
externalDropId: ['#SecondKanban', '#ThirdKanban']
```

## Dimension Properties

### height

**Type:** `string | number`  
**Default:** `'auto'`

**Description:** Sets the Kanban board height. Accepts pixel values, percentages, or 'auto'.

**Example:**
```typescript
height: '600px'
height: '100%'
height: 600
height: 'auto'
```

### width

**Type:** `string | number`  
**Default:** `'auto'`

**Description:** Sets the Kanban board width. Accepts pixel values, percentages, or 'auto'.

**Example:**
```typescript
width: '100%'
width: '1200px'
width: 1200
width: 'auto'
```

## Sorting Properties

### sortSettings

**Type:** `SortSettingsModel`  
**Default:** `{}`

**Description:** Configures card sorting within columns.

**SortSettingsModel Interface:**
- `sortBy: SortOrderBy` - Sort order type ('DataSourceOrder' | 'Index' | 'Custom')
- `field: string` - Field name to sort by
- `direction: SortDirection` - Sort direction ('Ascending' | 'Descending')

**Example:**
```typescript
sortSettings: {
    sortBy: 'Index',
    field: 'Priority',
    direction: 'Ascending'
}
```

## Stacked Headers

### stackedHeaders

**Type:** `StackedHeadersModel[]`  
**Default:** `[]`

**Description:** Groups columns under stacked headers.

**StackedHeadersModel Interface:**
- `text: string` - Stacked header text
- `keyFields: string` - Comma-separated column keys

**Example:**
```typescript
stackedHeaders: [
    { text: 'To Do', keyFields: 'Open' },
    { text: 'Development', keyFields: 'InProgress,Review' },
    { text: 'Done', keyFields: 'Testing,Close' }
]
```

## Accessibility and Keyboard

### allowKeyboard

**Type:** `boolean`  
**Default:** `true`

**Description:** Enables keyboard interactions for accessibility.

**Keyboard Shortcuts:**
- `Tab` - Navigate between cards
- `Enter` - Open card edit dialog
- `Delete` - Delete selected card
- `Ctrl+Enter` - Save and close dialog
- `Escape` - Close dialog
- `Arrow keys` - Navigate cards

**Example:**
```typescript
allowKeyboard: true // Enable keyboard navigation
```

## Constraint and Validation

### constraintType

**Type:** `ConstraintType`  
**Default:** `'Column'`

**Description:** Defines validation scope for min/max count constraints.

**Values:**
- `'Column'` - Apply constraints per column
- `'Swimlane'` - Apply constraints per swimlane

**Example:**
```typescript
constraintType: 'Column' // Validate WIP limits per column
```

## Localization

### locale

**Type:** `string`  
**Default:** `''` (uses 'en-US')

**Description:** Sets the culture/language for the component.

**Supported Cultures:** 'en-US', 'de-DE', 'fr-FR', 'es-ES', 'ja-JP', etc.

**Example:**
```typescript
import { L10n } from '@syncfusion/ej2-base';

L10n.load({
    'de-DE': {
        'kanban': {
            'items': 'Einträge',
            'min': 'Minimum',
            'max': 'Maximum'
        }
    }
});

const kanbanObj = new Kanban({
    locale: 'de-DE',
    dataSource: kanbanData
});
```

## Persistence

### enablePersistence

**Type:** `boolean`  
**Default:** `false`

**Description:** Persists Kanban state (column order, data source) across page reloads using browser localStorage.

**Example:**
```typescript
enablePersistence: true // Save state in localStorage
```

## Tooltip

### enableTooltip

**Type:** `boolean`  
**Default:** `false`

**Description:** Enables tooltips on card hover.

**Example:**
```typescript
enableTooltip: true
```

### tooltipTemplate

**Type:** `string | Function`  
**Default:** `null`

**Description:** Custom template for card tooltips. Works only when `enableTooltip` is true.

**Example:**
```typescript
tooltipTemplate: '#tooltipTemplate',
enableTooltip: true

// HTML template
// <script id="tooltipTemplate" type="text/x-template">
//     <div class="tooltip-content">
//         <h4>${Summary}</h4>
//         <p>Priority: ${Priority}</p>
//         <p>Assignee: ${Assignee}</p>
//     </div>
// </script>
```

## Virtualization

### enableVirtualization

**Type:** `boolean`  
**Default:** `false`

**Description:** Enables virtual scrolling for large datasets. Renders only visible cards for improved performance.

**Use Cases:**
- Boards with thousands of cards
- Performance optimization
- Large data sets

**Example:**
```typescript
enableVirtualization: true // Enable for large datasets
```

## RTL Support

### enableRtl

**Type:** `boolean`  
**Default:** `false`

**Description:** Enables right-to-left rendering for RTL languages (Arabic, Hebrew).

**Example:**
```typescript
enableRtl: true // Enable RTL mode
```

## Security

### enableHtmlSanitizer

**Type:** `boolean`  
**Default:** `true`

**Description:** Prevents cross-site scripting (XSS) by sanitizing HTML in data entry fields.

**Example:**
```typescript
enableHtmlSanitizer: true // Recommended for security
```

## Advanced Query

### query

**Type:** `Query`  
**Default:** `null`

**Description:** Defines external query for advanced data filtering/processing with DataManager.

**Example:**
```typescript
import { Query } from '@syncfusion/ej2-data';

const query = new Query()
    .where('Priority', 'equal', 'High')
    .take(50);

const kanbanObj = new Kanban({
    dataSource: dataManager,
    query: query
});
```

## Display Options

### showEmptyColumn

**Type:** `boolean`  
**Default:** `false`

**Description:** Shows columns even when they have no cards.

**Example:**
```typescript
showEmptyColumn: true // Show all columns regardless of card count
```

### cssClass

**Type:** `string`  
**Default:** `null`

**Description:** Adds custom CSS class names to the Kanban root element for styling.

**Example:**
```typescript
cssClass: 'custom-kanban high-contrast-theme'
```

## Best Practices

1. **Always specify keyField** - Required for proper card-column mapping
2. **Use cardSettings.headerField** - Mandatory unique identifier for cards
3. **Enable enableHtmlSanitizer** - Prevent XSS attacks
4. **Set maxCount for WIP limits** - Control work-in-progress
5. **Use enableVirtualization for large datasets** - Improve performance with 1000+ cards
6. **Configure allowKeyboard** - Ensure accessibility compliance
7. **Use transitionColumns** - Enforce workflow rules
8. **Enable enablePersistence** - Preserve user preferences

## Common Property Combinations

### Pattern 1: Basic Kanban

```typescript
{
    dataSource: kanbanData,
    keyField: 'Status',
    columns: [
        { headerText: 'Open', keyField: 'Open' },
        { headerText: 'In Progress', keyField: 'InProgress' },
        { headerText: 'Done', keyField: 'Close' }
    ],
    cardSettings: {
        headerField: 'Id',
        contentField: 'Summary'
    }
}
```

### Pattern 2: Kanban with WIP Limits

```typescript
{
    dataSource: kanbanData,
    keyField: 'Status',
    columns: [
        { headerText: 'Open', keyField: 'Open', maxCount: 10 },
        { headerText: 'In Progress', keyField: 'InProgress', maxCount: 5 },
        { headerText: 'Testing', keyField: 'Testing', maxCount: 3 }
    ],
    constraintType: 'Column'
}
```

### Pattern 3: Swimlane Kanban

```typescript
{
    dataSource: kanbanData,
    keyField: 'Status',
    columns: columns,
    swimlaneSettings: {
        keyField: 'Assignee',
        showItemCount: true,
        allowDragAndDrop: true
    }
}
```

### Pattern 4: High-Performance Kanban

```typescript
{
    dataSource: largeDataSet,
    keyField: 'Status',
    columns: columns,
    enableVirtualization: true,
    height: '600px'
}
```

---

**Related:** [events.md](./events.md) | [methods.md](./methods.md) | [getting-started.md](./getting-started.md)
