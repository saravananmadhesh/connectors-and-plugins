# Properties Reference for Angular Kanban

## Table of Contents
- [Core Properties](#core-properties)
- [CardSettingsModel](#cardsettingsmodel)
- [ColumnsModel](#columnsmodel)
- [SwimlaneSettingsModel](#swimlanesettingsmodel)
- [Dialog and Tooltip Settings](#dialog-and-tooltip-settings)
- [Responsive Properties](#responsive-properties)
- [Selection and Interaction](#selection-and-interaction)

## Core Properties

### allowDragAndDrop: boolean

Enables or disables drag-and-drop functionality.

```typescript
<ejs-kanban [allowDragAndDrop]="true"></ejs-kanban>
```

- **Default:** `true`
- **When to use:** Set to `false` for read-only boards or custom drag handlers
- **Example:** Disable drag for presentation mode

```typescript
allowDragAndDrop: boolean = this.isEditMode ? true : false;
```

### allowKeyboard: boolean

Enables keyboard navigation and shortcuts.

```typescript
<ejs-kanban [allowKeyboard]="true"></ejs-kanban>
```

- **Default:** `true`
- **Supported keys:**
  - Arrow keys - Navigate cards
  - Space - Select card
  - Enter - Open card
  - Escape - Close dialog
- **When to use:** Disable for touch-only interfaces

### allowSelection: boolean

Enables card selection via click/touch.

```typescript
<ejs-kanban [allowSelection]="true"></ejs-kanban>
```

- **Default:** `true`
- **Works with:** `selectionType` property

### keyField: string

**REQUIRED** - The data field that maps cards to columns.

```typescript
<ejs-kanban keyField="Status"></ejs-kanban>

// Data must have matching field
{ Id: 1, Status: 'Open', Summary: 'Task 1' }
```

- **Example values:** 'Status', 'Priority', 'Stage'
- **Data field values must match column keyFields**

### dataSource: Object[] | DataManager

The data source for Kanban (array or DataManager).

```typescript
// Array
<ejs-kanban [dataSource]="[
  { Id: 1, Status: 'Open', Summary: 'Task 1' }
]"></ejs-kanban>

// DataManager
import { DataManager } from '@syncfusion/ej2-data';
dataSource = new DataManager({
  url: 'https://api.example.com/tasks',
  adaptor: new UrlAdaptor()
});
```

### height: string | number

Board height (pixels or auto).

```typescript
<ejs-kanban height="600px"></ejs-kanban>
<ejs-kanban height="100%"></ejs-kanban>
<ejs-kanban [height]="600"></ejs-kanban>
```

- **Default:** `auto`
- **Values:** '400px', '80%', 400, 'auto'

### width: string | number

Board width (pixels or auto).

```typescript
<ejs-kanban width="1200px"></ejs-kanban>
```

### cardHeight: string | number

Individual card height in pixels.

```typescript
<ejs-kanban cardHeight="120px"></ejs-kanban>
```

- **Default:** `auto`
- **Use for:** Fixed-height cards

### scrollSettings: ScrollSettingsModel

Configure scrolling behavior.

```typescript
scrollSettings: ScrollSettingsModel = {
  height: 600,
  allowScroll: true
};
```

## CardSettingsModel

Configuration for card appearance and field mapping:

```typescript
import { CardSettingsModel } from '@syncfusion/ej2-angular-kanban';

cardSettings: CardSettingsModel = {
  headerField: 'Id',
  contentField: 'Summary',
  tagsField: 'Tags',
  grabberField: 'Priority',
  footerCssField: 'StatusIcon',
  template: null,
  selectionType: 'Single',
  showHeader: true
};
```

### headerField: string

Data field displayed as card header (usually ID).

```typescript
cardSettings: { headerField: 'Id' }
// Data: { Id: 'TASK-123', ... }
// Displays: TASK-123 at top of card
```

### contentField: string

Data field displayed as card content (usually summary/description).

```typescript
cardSettings: { contentField: 'Summary' }
// Data: { Summary: 'Implement authentication', ... }
// Displays: Full task description in card body
```

### tagsField: string

Data field for tags/labels display.

```typescript
cardSettings: { tagsField: 'Tags' }
// Data: { Tags: 'Auth,Security,High-Priority', ... }
// Displays: Tags as pills at bottom of card
```

### grabberField: string

Data field for card color indicator (left border).

```typescript
cardSettings: { grabberField: 'Priority' }
// Data: { Priority: 'High', ... }
// Grabber color based on priority
```

### footerCssField: string

CSS class field for card footer styling.

```typescript
cardSettings: { footerCssField: 'StatusIcon' }
// Data: { StatusIcon: 'e-card-critical', ... }
// CSS class applied to card footer
```

### selectionType: 'Single' | 'Multiple'

Card selection mode.

```typescript
cardSettings: { selectionType: 'Multiple' }
```

- **Single** - Only one card can be selected
- **Multiple** - Ctrl+Click to select multiple cards

### showHeader: boolean

Show/hide card headers.

```typescript
cardSettings: { showHeader: false }  // Hide headers
```

### template: string | Function

Custom card template HTML.

```typescript
cardSettings: {
  template: `
    <div style="padding: 10px;">
      <strong>${ data.Id }</strong>
      <p>${ data.Summary }</p>
    </div>
  `
}
```

## ColumnsModel

Configuration for Kanban columns:

```typescript
import { ColumnsModel } from '@syncfusion/ej2-angular-kanban';

columns: ColumnsModel[] = [
  {
    headerText: 'To Do',
    keyField: 'Open',
    allowToggle: true,
    isExpanded: true,
    minCount: 1,
    maxCount: 5,
    showItemCount: true
  }
];
```

### headerText: string

Column header title displayed to users.

```typescript
{ headerText: 'In Progress' }
```

### keyField: string | string[]

Maps data field values to column.

```typescript
// Single key
{ keyField: 'Open' }

// Multiple keys (array)
[{ keyField: ['Open', 'New'] }]
```

All data items with Status='Open' or Status='New' appear in this column.

### allowToggle: boolean

Enable collapse/expand column.

```typescript
{ allowToggle: true }  // Users can collapse column
```

### isExpanded: boolean

Column default expanded state.

```typescript
{ isExpanded: false }  // Column starts collapsed
```

### minCount: number

Minimum cards allowed (WIP limit).

```typescript
{ minCount: 1 }  // Warn if column has 0 cards
```

### maxCount: number

Maximum cards allowed (WIP limit).

```typescript
{ maxCount: 5 }  // Error if trying to add 6th card
```

### showItemCount: boolean

Display card count in column header.

```typescript
{ showItemCount: true }  // Shows "In Progress (3)"
```

### template: string | Function

Custom column header template.

```typescript
{
  template: `
    <div style="display: flex; gap: 8px;">
      <span>⚙️</span>
      <span>In Progress</span>
    </div>
  `
}
```

### transitionColumns: string[]

Defines the column transition - specifies which columns cards can be moved to from this column.

```typescript
{
  headerText: 'In Progress',
  keyField: 'InProgress',
  transitionColumns: ['Testing', 'Close']  // Can only move to Testing or Close
}
```

- **When to use:** Enforce workflow rules and prevent invalid state transitions
- **Example:** Cards in 'To Do' can only move to 'In Progress', not directly to 'Done'

```typescript
columns: ColumnsModel[] = [
  {
    headerText: 'To Do',
    keyField: 'Open',
    transitionColumns: ['InProgress']  // Can only move to In Progress
  },
  {
    headerText: 'In Progress',
    keyField: 'InProgress',
    transitionColumns: ['Testing', 'Open']  // Can move to Testing or back to Open
  },
  {
    headerText: 'Testing',
    keyField: 'Testing',
    transitionColumns: ['Close', 'InProgress']  // Can complete or send back
  },
  {
    headerText: 'Done',
    keyField: 'Close',
    transitionColumns: []  // No transitions from Done (final state)
  }
];
```

### allowDrag: boolean

Enable or disable column drag functionality.

```typescript
{ allowDrag: true }  // Allow reordering this column
```

### allowDrop: boolean

Enable or disable dropping cards into this column.

```typescript
{ allowDrop: false }  // Prevent cards from being dropped here
```

### showAddButton: boolean

Display add button in column header for creating new cards.

```typescript
{ showAddButton: true }  // Shows + button in column header
```

## SwimlaneSettingsModel

Configuration for swimlane grouping:

```typescript
import { SwimlaneSettingsModel } from '@syncfusion/ej2-angular-kanban';

swimlaneSettings: SwimlaneSettingsModel = {
  keyField: 'Assignee',
  template: null,
  allowDragAndDrop: true
};
```

### keyField: string

**REQUIRED** - Data field for swimlane grouping.

```typescript
swimlaneSettings: { keyField: 'Assignee' }
// Groups cards by Assignee field
```

Common grouping fields:
- `Assignee` - By team member
- `Priority` - By importance level
- `Epic` - By feature/epic
- `Department` - By team

### template: string | Function

Custom swimlane header template.

```typescript
swimlaneSettings: {
  template: `
    <div style="background: #f5f5f5; padding: 10px;">
      <strong>${ data.key }</strong> (${data.count} cards)
    </div>
  `
}
```

### allowDragAndDrop: boolean

Allow dragging between swimlanes.

```typescript
swimlaneSettings: { allowDragAndDrop: true }
```

## Dialog and Tooltip Settings

### dialogSettings: DialogSettingsModel

Add/Edit card dialog configuration:

```typescript
dialogSettings: DialogSettingsModel = {
  fields: [
    { text: 'ID', key: 'Id', type: 'TextBox' },
    { text: 'Summary', key: 'Summary', type: 'TextArea' },
    { text: 'Status', key: 'Status', type: 'Dropdown' }
  ],
  template: null
};
```

### tooltipSettings: TooltipSettingsModel

Card tooltip configuration:

```typescript
tooltipSettings: TooltipSettingsModel = {
  template: `
    <div>
      <strong>${ data.Id }</strong>
      <p>${ data.Summary }</p>
      <p>Assigned: ${data.Assignee}</p>
    </div>
  `
};
```

## Responsive Properties

### responsiveSettings: ResponsiveSettingsModel

Mobile/tablet responsive configuration:

```typescript
responsiveSettings: ResponsiveSettingsModel = {
  maxWidth: 600  // Switch layout at 600px
};
```

## Selection and Interaction

### selectedCards: string[] | number[]

Initially selected card IDs.

```typescript
selectedCards: [1, 2, 3]
```

### stackedHeaders: StackedHeadersModel[]

Group columns under parent headers:

```typescript
stackedHeaders: StackedHeadersModel[] = [
  {
    text: 'Development',
    keyFields: 'InProgress'
  },
  {
    text: 'Testing',
    keyFields: 'Testing'  // Multiple columns grouped under Testing
  },
  {
    text: 'Complete',
    keyFields: 'Close'  // Single column
  }
];
```

---

## Complete Property Example

```typescript
import { Component } from '@angular/core';
import { KanbanModule } from '@syncfusion/ej2-angular-kanban';
import { CardSettingsModel, ColumnsModel } from '@syncfusion/ej2-angular-kanban';

@Component({
  selector: 'app-kanban',
  standalone: true,
  imports: [KanbanModule],
  template: `
    <ejs-kanban
      keyField="Status"
      [dataSource]="data"
      [cardSettings]="cardSettings"
      [allowDragAndDrop]="true"
      [allowKeyboard]="true"
      [allowSelection]="true"
      height="600px"
      width="100%"
      [cardHeight]="120">
      <e-columns>
        <e-column 
          headerText="To Do" 
          keyField="Open"
          [showItemCount]="true"
          minCount="1"
          maxCount="5">
        </e-column>
        <e-column 
          headerText="In Progress" 
          keyField="InProgress"
          [showItemCount]="true"
          minCount="0"
          maxCount="3">
        </e-column>
        <e-column 
          headerText="Done" 
          keyField="Close">
        </e-column>
      </e-columns>
    </ejs-kanban>
  `
})
export class KanbanComponent {
  cardSettings: CardSettingsModel = {
    headerField: 'Id',
    contentField: 'Summary',
    tagsField: 'Tags',
    grabberField: 'Priority',
    showHeader: true,
    selectionType: 'Multiple'
  };

  data = [
    { Id: 1, Status: 'Open', Summary: 'Design UI', Tags: 'UI,Design', Priority: 'High' },
    { Id: 2, Status: 'InProgress', Summary: 'Implement features', Tags: 'Dev', Priority: 'Medium' }
  ];
}
```
