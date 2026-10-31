# Getting Started with Kanban

Complete guide to setting up and initializing the Syncfusion TypeScript Kanban board in your application.

## Dependencies

The Kanban component requires the following Syncfusion packages:

```javascript
|-- @syncfusion/ej2-kanban
    |-- @syncfusion/ej2-base
    |-- @syncfusion/ej2-buttons
    |-- @syncfusion/ej2-data
    |-- @syncfusion/ej2-dropdowns
    |-- @syncfusion/ej2-icons
    |-- @syncfusion/ej2-inputs
    |-- @syncfusion/ej2-layouts
    |-- @syncfusion/ej2-lists
    |-- @syncfusion/ej2-navigations
    |-- @syncfusion/ej2-popups
    |-- @syncfusion/ej2-splitbuttons
```

## Set Up Development Environment

### Create Vite TypeScript Project

Run the following commands to create a TypeScript Vite application:

```bash
npm create vite@latest my-app
```

To set up a TypeScript application, use the TypeScript template:

```bash
npm create vite@latest my-app -- --template vanilla-ts
cd my-app
npm run dev
```

### Install Syncfusion Kanban Package

Install the Kanban component from the Syncfusion npm registry:

```bash
npm install @syncfusion/ej2-kanban
```

## Import CSS Styles

Kanban CSS files are available in the ej2-kanban package and its sub-component folders. Import the required styles in your `src/style.css` file.

### Tailwind 3 Theme Example

```css
@import '../node_modules/@syncfusion/ej2-base/styles/tailwind3.css';
@import '../node_modules/@syncfusion/ej2-buttons/styles/tailwind3.css';
@import '../node_modules/@syncfusion/ej2-dropdowns/styles/tailwind3.css';
@import '../node_modules/@syncfusion/ej2-inputs/styles/tailwind3.css';
@import '../node_modules/@syncfusion/ej2-layouts/styles/tailwind3.css';
@import '../node_modules/@syncfusion/ej2-navigations/styles/tailwind3.css';
@import '../node_modules/@syncfusion/ej2-popups/styles/tailwind3.css';
@import '../node_modules/@syncfusion/ej2-kanban/styles/tailwind3.css';
```

### Available Built-in Themes

- **Material**: Material design theme
- **Bootstrap 3**: Bootstrap 3 theme
- **Bootstrap 4**: Bootstrap 4 theme
- **Bootstrap 5**: Bootstrap 5 theme
- **Fabric**: Microsoft Fabric theme
- **Tailwind**: Tailwind CSS theme
- **Tailwind 3**: Tailwind CSS 3 theme
- **Fluent**: Microsoft Fluent design
- **High Contrast**: High contrast theme for accessibility

Replace `tailwind3` in the import paths with your preferred theme name.

## HTML Setup

Add an HTML div element with an `id` attribute to your `index.html` file:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <title>Kanban Typescript Component</title>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no" />
    <meta name="description" content="Essential JS 2" />
    <meta name="author" content="Syncfusion" />
    <link rel="shortcut icon" href="resources/favicon.ico" />
</head>
<body>
    <!--Element where the Kanban will be rendered-->
    <div id="Kanban"></div>
</body>
</html>
```

## Initialize Empty Kanban

Import the Kanban component in your `main.ts` file and initialize it:

```typescript
import { Kanban } from '@syncfusion/ej2-kanban';

const kanbanObj: Kanban = new Kanban({
    columns: [
        { headerText: 'Backlog', keyField: 'Open' },
        { headerText: 'In Progress', keyField: 'InProgress' },
        { headerText: 'Testing', keyField: 'Testing' },
        { headerText: 'Done', keyField: 'Close' }
    ]
});
kanbanObj.appendTo('#Kanban');
```

Run the application:

```bash
npm run dev
```

This will display an empty Kanban board with four columns.

## Populating Cards

To populate the Kanban with cards, define a data source using the `dataSource` property.

### Define Data Source

Create a `datasource.ts` file:

```typescript
export const kanbanData: Object[] = [
    {
        Id: 1,
        Status: 'Open',
        Summary: 'Analyze the new requirements gathered from the customer.',
        Type: 'Story',
        Priority: 'Low',
        Tags: 'Analyze,Customer',
        Estimate: 3.5,
        Assignee: 'Nancy Davloio',
        RankId: 1
    },
    {
        Id: 2,
        Status: 'InProgress',
        Summary: 'Improve application performance',
        Type: 'Improvement',
        Priority: 'Normal',
        Tags: 'Improvement',
        Estimate: 6,
        Assignee: 'Andrew Fuller',
        RankId: 1
    },
    {
        Id: 3,
        Status: 'Open',
        Summary: 'Arrange a web meeting with the customer to get new requirements.',
        Type: 'Others',
        Priority: 'Critical',
        Tags: 'Meeting',
        Estimate: 5.5,
        Assignee: 'Janet Leverling',
        RankId: 2
    },
    {
        Id: 4,
        Status: 'InProgress',
        Summary: 'Fix the issues reported in the IE browser.',
        Type: 'Bug',
        Priority: 'Release Breaker',
        Tags: 'IE',
        Estimate: 2.5,
        Assignee: 'Janet Leverling',
        RankId: 2
    },
    {
        Id: 5,
        Status: 'Testing',
        Summary: 'Fix the issues reported by the customer.',
        Type: 'Bug',
        Priority: 'Low',
        Tags: 'Customer',
        Estimate: 3.5,
        Assignee: 'Steven walker',
        RankId: 1
    }
];
```

### Bind Data to Kanban

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
    }
});
kanbanObj.appendTo('#Kanban');
```

### Key Properties Explained

- **dataSource**: The data collection for cards
- **keyField**: The field in the data that maps to column `keyField` values (e.g., 'Status')
- **columns**: Array defining each column with `headerText` and `keyField`
- **cardSettings.headerField**: Unique identifier for each card (mandatory, acts as card ID)
- **cardSettings.contentField**: The field to display as card content

## Enable Swimlane

Swimlanes group cards into horizontal rows based on a field value.

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
        keyField: 'Assignee'  // Group cards by Assignee
    }
});
kanbanObj.appendTo('#Kanban');
```

This will group cards into rows based on the `Assignee` field value.

## Complete Working Example

Here's a complete, copy-paste-ready example:

**index.html:**
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <title>Kanban Board</title>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
</head>
<body>
    <div id="Kanban"></div>
</body>
</html>
```

**src/style.css:**
```css
@import '../node_modules/@syncfusion/ej2-base/styles/tailwind3.css';
@import '../node_modules/@syncfusion/ej2-buttons/styles/tailwind3.css';
@import '../node_modules/@syncfusion/ej2-dropdowns/styles/tailwind3.css';
@import '../node_modules/@syncfusion/ej2-inputs/styles/tailwind3.css';
@import '../node_modules/@syncfusion/ej2-layouts/styles/tailwind3.css';
@import '../node_modules/@syncfusion/ej2-navigations/styles/tailwind3.css';
@import '../node_modules/@syncfusion/ej2-popups/styles/tailwind3.css';
@import '../node_modules/@syncfusion/ej2-kanban/styles/tailwind3.css';
```

**src/main.ts:**
```typescript
import { Kanban } from '@syncfusion/ej2-kanban';
import './style.css';

const kanbanData = [
    { Id: 1, Status: 'Open', Summary: 'Task 1', Assignee: 'Nancy' },
    { Id: 2, Status: 'InProgress', Summary: 'Task 2', Assignee: 'Andrew' },
    { Id: 3, Status: 'Testing', Summary: 'Task 3', Assignee: 'Janet' },
    { Id: 4, Status: 'Close', Summary: 'Task 4', Assignee: 'Nancy' }
];

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
kanbanObj.appendTo('#Kanban');
```

Run with:
```bash
npm run dev
```

## Common Pitfalls

1. **Missing headerField**: The `cardSettings.headerField` is mandatory. Without it, cards won't render.

2. **Mismatched keyField values**: Ensure column `keyField` values match the data values in your `keyField` property.
   - Example: If `keyField: 'Status'`, your data must have a `Status` field with values like 'Open', 'InProgress', etc.

3. **Missing CSS imports**: Without importing styles, the Kanban will render but won't be styled correctly.

4. **Incorrect element selector**: Ensure `appendTo('#Kanban')` matches your HTML element's ID.

## Next Steps

- Customize columns with headers, templates, and toggle features
- Configure card layouts and templates
- Enable swimlanes for grouping
- Set up remote data binding
- Add dialogs for card editing
