---
name: syncfusion-javascript-kanban
description: "Implement Syncfusion TypeScript Kanban board for visual task management and workflow tracking. Use this when working with task boards, workflow visualization, or agile project management. This skill covers Kanban board setup, column configuration, card management, swimlanes, drag-and-drop interactions, and WIP limits for TypeScript applications."
metadata:
  author: "Syncfusion Inc"
  version: "34.1.29"
  category: "Data Visualization"
---

# Implementing Kanban Board

Guide for implementing and customizing the Syncfusion TypeScript Kanban board - a visual task management control that displays work at various stages using columns, cards, and swimlanes.

## When to Use This Skill

Use this skill when you need to:
- **Implement a Kanban board** for task or workflow management
- **Create visual workflows** with drag-and-drop card interactions
- **Build agile project boards** with columns representing workflow stages
- **Group tasks by categories** using swimlanes (e.g., by assignee, priority, team)
- **Manage work-in-progress limits** with card validation per column
- **Enable card editing** with dialogs for add/edit/delete operations
- **Bind data** from local arrays, remote APIs, or OData services
- **Customize card layouts** with templates for specific business requirements
- **Track project status** with visual representation across multiple stages

## Control Overview

The Kanban board is a powerful visual management tool that helps teams:
- Visualize work stages with customizable columns
- Move cards through workflow stages with drag-and-drop
- Group related work with swimlanes
- Track progress with card counts and WIP limits
- Edit tasks with built-in or custom dialogs
- Support responsive layouts for desktop and mobile

**Key Capabilities:**
- Multiple column configurations (single-key, multi-key, stacked headers)
- Rich card customization (templates, selection, styling)
- Flexible data binding (local, remote, OData)
- Advanced features (localization, persistence, virtual scrolling)

## Documentation and Navigation Guide

### Getting Started
📄 **Read:** [references/getting-started.md](references/getting-started.md)
- Installation and package dependencies
- Setting up Vite TypeScript project
- CSS imports and theme configuration
- Basic Kanban initialization
- Column setup with keyField mapping
- Populating cards with dataSource
- First working example

### Columns Configuration
📄 **Read:** [references/columns.md](references/columns.md)
- Single-key and multi-key column mapping
- Column header text and custom templates
- Toggle columns (expand/collapse functionality)
- Initially collapsed columns
- Column drag-and-drop reordering
- Stacked headers for grouping columns
- Column properties and configuration

### Cards Management
📄 **Read:** [references/cards.md](references/cards.md)
- Card structure (header and content)
- Drag-and-drop behavior within and between columns
- Card header and content field mapping
- Custom card templates
- Card selection (single and multiple)
- Showing/hiding card headers
- cardSettings configuration

### Swimlane Grouping
📄 **Read:** [references/swimlane.md](references/swimlane.md)
- Rendering swimlane rows for grouping
- keyField mapping for categorization
- Custom row text with textField
- Swimlane row templates
- Sorting swimlane rows (ascending/descending)
- Drag-and-drop across swimlanes
- Empty row rendering
- Card count display per swimlane
- Frozen rows for always-visible headers

### Data Binding
📄 **Read:** [references/data-binding.md](references/data-binding.md)
- Local data binding with JSON arrays
- DataManager integration
- Remote data binding with APIs
- OData services integration
- Web API binding
- CRUD operations with remote data
- Data adapters and adaptors

### Dialog for Add/Edit/Delete
📄 **Read:** [references/dialog.md](references/dialog.md)
- Default built-in dialog
- Dialog fields mapping to data source
- Custom fields configuration
- Field types (String, Numeric, TextArea, DropDown, TextBox)
- Dialog templates for custom layouts
- Validation in dialog forms
- dialogSettings properties

### Drag-and-Drop Features
📄 **Read:** [references/drag-and-drop.md](references/drag-and-drop.md)
- Card drag-and-drop within columns
- Card drag-and-drop between columns
- Column drag-and-drop reordering
- Swimlane drag-and-drop interactions
- Enabling/disabling drag-and-drop
- Drag-drop events and customization

### Customization and Styling
📄 **Read:** [references/customization.md](references/customization.md)
- Setting dimensions (height, width)
- CSS styling and custom themes
- Tooltip configuration
- Template customization options
- Built-in themes (Material, Bootstrap, Fabric, Tailwind)
- Custom theme creation

### Advanced Features
📄 **Read:** [references/advanced-features.md](references/advanced-features.md)
- Localization for multi-language support
- State persistence across sessions
- Priority field mapping and visualization
- Card validation and WIP limits
- Virtual scrolling for large datasets
- Sort configuration options

### Accessibility
📄 **Read:** [references/accessibility.md](references/accessibility.md)
- WCAG compliance features
- Keyboard navigation support
- ARIA attributes for screen readers
- Accessible card and column interactions

### Responsive Design
📄 **Read:** [references/responsive-mode.md](references/responsive-mode.md)
- Responsive layout behavior
- Mobile and tablet device support
- Adaptive column rendering
- Touch interaction support

### API Reference - Properties
📄 **Read:** [references/properties.md](references/properties.md)
- Complete list of all Kanban properties
- dataSource, keyField, columns configuration
- cardSettings, swimlaneSettings, dialogSettings
- Drag-and-drop properties (allowDragAndDrop, allowColumnDragAndDrop)
- Dimension properties (height, width)
- Sorting, stacked headers, constraints
- Localization, persistence, virtualization
- Property types, defaults, and examples

### API Reference - Events
📄 **Read:** [references/events.md](references/events.md)
- Complete list of all Kanban events
- Action events (actionBegin, actionComplete, actionFailure)
- Card interaction events (cardClick, cardDoubleClick, cardRendered)
- Drag-and-drop events (dragStart, drag, dragStop)
- Column drag events (columnDragStart, columnDrag, columnDrop)
- Dialog events (dialogOpen, dialogClose)
- Data events (dataBinding, dataBound)
- Event arguments and use cases

### API Reference - Methods
📄 **Read:** [references/methods.md](references/methods.md)
- Complete list of all Kanban public methods
- Card management (addCard, deleteCard, updateCard, getCardDetails)
- Column management (addColumn, deleteColumn, showColumn, hideColumn)
- Data query methods (getColumnData, getSwimlaneData, getSelectedCards)
- Dialog methods (openDialog, closeDialog)
- Utility methods (refresh, destroy, dataBind)
- Method signatures, parameters, and return types

### Troubleshooting and How-To
📄 **Read:** [references/troubleshooting.md](references/troubleshooting.md)
- Dynamically changing columns
- Filtering and searching cards
- Header double-click customization
- Common issues and solutions
- Performance optimization tips

## Quick Start Example

```typescript
// 1. Install the package
// npm install @syncfusion/ej2-kanban

// 2. Import Kanban component
import { Kanban } from '@syncfusion/ej2-kanban';

// 3. Define your data
const kanbanData = [
    {
        Id: 1,
        Status: 'Open',
        Summary: 'Analyze the new requirements',
        Priority: 'Low',
        Assignee: 'Nancy Davloio'
    },
    {
        Id: 2,
        Status: 'InProgress',
        Summary: 'Improve application performance',
        Priority: 'Normal',
        Assignee: 'Andrew Fuller'
    },
    {
        Id: 3,
        Status: 'Testing',
        Summary: 'Fix the issues reported',
        Priority: 'High',
        Assignee: 'Janet Leverling'
    },
    {
        Id: 4,
        Status: 'Close',
        Summary: 'Validate new requirements',
        Priority: 'Low',
        Assignee: 'Nancy Davloio'
    }
];

// 4. Initialize Kanban with basic configuration
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
    }
});

// 5. Render to DOM element
kanbanObj.appendTo('#Kanban');
```

## Common Patterns

### Pattern 1: Kanban with Swimlanes

```typescript
const kanbanObj: Kanban = new Kanban({
    dataSource: kanbanData,
    keyField: 'Status',
    columns: [
        { headerText: 'To Do', keyField: 'Open' },
        { headerText: 'In Progress', keyField: 'InProgress' },
        { headerText: 'Testing', keyField: 'Testing' },
        { headerText: 'Done', keyField: 'Close' }
    ],
    cardSettings: {
        contentField: 'Summary',
        headerField: 'Id'
    },
    swimlaneSettings: {
        keyField: 'Assignee',  // Group by assignee
        allowDragAndDrop: true  // Allow dragging across swimlanes
    }
});
kanbanObj.appendTo('#Kanban');
```

### Pattern 2: Kanban with Stacked Headers

```typescript
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
        { text: 'Completed', keyFields: 'Close' }
    ],
    cardSettings: {
        contentField: 'Summary',
        headerField: 'Id'
    }
});
kanbanObj.appendTo('#Kanban');
```

### Pattern 3: Remote Data Binding with OData

```typescript
import { Kanban } from '@syncfusion/ej2-kanban';
import { DataManager, ODataAdaptor } from '@syncfusion/ej2-data';

const dataManager = new DataManager({
    url: 'https://services.syncfusion.com/js/production/api/Kanban',
    adaptor: new ODataAdaptor
});

const kanbanObj: Kanban = new Kanban({
    dataSource: dataManager,
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
    }
});
kanbanObj.appendTo('#Kanban');
```

### Pattern 4: Custom Card Template

```typescript
const kanbanObj: Kanban = new Kanban({
    dataSource: kanbanData,
    keyField: 'Status',
    columns: [
        { headerText: 'To Do', keyField: 'Open' },
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

// Define template in HTML
// <script id="cardTemplate" type="text/x-template">
//     <div class="custom-card">
//         <div class="card-header">${Id}</div>
//         <div class="card-content">${Summary}</div>
//         <div class="card-footer">
//             <span class="priority ${Priority}">${Priority}</span>
//             <span class="assignee">${Assignee}</span>
//         </div>
//     </div>
// </script>
```

## Key Configuration Options

### Essential Properties

- **dataSource**: Array or DataManager - Card data source
- **keyField**: string - Field name that maps to column keyField values
- **columns**: Array - Column definitions with headerText and keyField
- **cardSettings**: Object - Card display configuration
  - `headerField`: string - Unique identifier field (mandatory)
  - `contentField`: string - Main content display field
  - `template`: string - Custom card template
- **swimlaneSettings**: Object - Swimlane configuration
  - `keyField`: string - Field for grouping cards
  - `textField`: string - Display text for swimlane headers
  - `allowDragAndDrop`: boolean - Enable cross-swimlane dragging

### Common Options

- **allowDragAndDrop**: boolean - Enable card drag-and-drop (default: true)
- **allowKeyboard**: boolean - Enable keyboard interactions
- **height**: string/number - Board height
- **width**: string/number - Board width
- **dialogSettings**: Object - Dialog customization
- **sortSettings**: Object - Card sorting configuration
- **stackedHeaders**: Array - Grouped column headers

## Common Use Cases

1. **Software Development Sprint Board**
   - Columns: Backlog → In Progress → Code Review → Testing → Done
   - Swimlanes: By assignee or by feature
   - WIP limits per column

2. **Customer Support Ticket Tracking**
   - Columns: New → Assigned → In Progress → Waiting → Resolved
   - Swimlanes: By priority or support tier
   - Custom card templates with ticket details

3. **Content Publishing Workflow**
   - Columns: Ideas → Draft → Review → Approved → Published
   - Swimlanes: By author or content type
   - Dialogs for adding metadata

4. **Manufacturing Process Flow**
   - Columns: Order Received → In Production → Quality Check → Shipped
   - Swimlanes: By product line
   - Remote data binding to production system

5. **Recruitment Pipeline**
   - Columns: Applied → Phone Screen → Interview → Offer → Hired
   - Swimlanes: By position or recruiter
   - Card templates with candidate information

---

**Next Steps:** Read the getting-started reference to set up your first Kanban board, then explore specific features based on your requirements.
