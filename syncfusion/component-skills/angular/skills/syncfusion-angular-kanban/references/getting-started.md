# Getting Started with Angular Kanban

## Table of Contents
- [Installation](#installation)
- [Module Setup](#module-setup)
- [CSS Imports](#css-imports)
- [Basic Component](#basic-component)
- [Sample Data](#sample-data)
- [First Running Board](#first-running-board)

## Installation

Install the Syncfusion Angular Kanban package using npm:

```bash
npm install @syncfusion/ej2-angular-kanban
```

This package includes:
- Core Kanban component (`KanbanModule`)
- Type definitions and models
- Built-in themes (Material, Bootstrap, Fabric, etc.)
- Required dependencies (ej2-base, ej2-buttons, ej2-dropdowns, ej2-popups, ej2-layouts)

## Module Setup

Import `KanbanModule` in your component:

```typescript
import { Component } from '@angular/core';
import { KanbanModule } from '@syncfusion/ej2-angular-kanban';
import { CardSettingsModel } from '@syncfusion/ej2-angular-kanban';

@Component({
  selector: 'app-kanban',
  standalone: true,
  imports: [KanbanModule],
  template: `<ejs-kanban></ejs-kanban>`
})
export class KanbanComponent {}
```

**For traditional NgModule setup:**

```typescript
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { KanbanModule } from '@syncfusion/ej2-angular-kanban';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, KanbanModule],
  bootstrap: [AppComponent]
})
export class AppModule {}
```

## CSS Imports

Add Kanban CSS styles to `styles.css` in your project root:

```css
@import '../node_modules/@syncfusion/ej2-base/styles/material3.css';
@import '../node_modules/@syncfusion/ej2-buttons/styles/material3.css';
@import '../node_modules/@syncfusion/ej2-dropdowns/styles/material3.css';
@import '../node_modules/@syncfusion/ej2-inputs/styles/material3.css';
@import '../node_modules/@syncfusion/ej2-layouts/styles/material3.css';
@import '../node_modules/@syncfusion/ej2-navigations/styles/material3.css';
@import '../node_modules/@syncfusion/ej2-popups/styles/material3.css';
@import '../node_modules/@syncfusion/ej2-kanban/styles/material3.css';
```

**Available themes:**
- `material3.css` (default)
- `material.css`
- `bootstrap5.css`
- `bootstrap4.css`
- `bootstrap.css`
- `fabric.css`
- `high-contrast.css`

Choose one theme based on your design requirements.

## Basic Component

The minimal Kanban setup requires three properties:

1. **`keyField`** - Maps data field to columns
2. **`dataSource`** - Array of task objects
3. **`cardSettings`** - Specifies which fields render in cards

```typescript
import { Component } from '@angular/core';
import { KanbanModule } from '@syncfusion/ej2-angular-kanban';
import { CardSettingsModel } from '@syncfusion/ej2-angular-kanban';

@Component({
  selector: 'app-kanban',
  standalone: true,
  imports: [KanbanModule],
  template: `
    <ejs-kanban 
      keyField="Status"
      [dataSource]="data"
      [cardSettings]="cardSettings">
      <e-columns>
        <e-column headerText="To Do" keyField="Open"></e-column>
        <e-column headerText="In Progress" keyField="InProgress"></e-column>
        <e-column headerText="Done" keyField="Close"></e-column>
      </e-columns>
    </ejs-kanban>
  `
})
export class KanbanComponent {
  cardSettings: CardSettingsModel = {
    headerField: 'Id',
    contentField: 'Summary'
  };

  data = [
    { Id: 1, Status: 'Open', Summary: 'Research new technologies' },
    { Id: 2, Status: 'InProgress', Summary: 'Design architecture' },
    { Id: 3, Status: 'Close', Summary: 'Implementation complete' }
  ];
}
```

**Key bindings:**
- `keyField="Status"` - Kanban looks for "Status" field in each data object
- `cardSettings.headerField: 'Id'` - Displays card ID at top
- `cardSettings.contentField: 'Summary'` - Displays task description

## Sample Data

A typical Kanban data object contains:

```typescript
export const kanbanData = [
  {
    Id: 1,
    Status: 'Open',
    Summary: 'Analyze the new requirements gathered from the customer.',
    Type: 'Epic',
    Priority: 'Critical',
    Tags: 'Analyze',
    Estimate: 3.5,
    Assignee: 'Nancy Davloio',
    RankId: 1
  },
  {
    Id: 2,
    Status: 'InProgress',
    Summary: 'Improve application performance',
    Type: 'Epic',
    Priority: 'High',
    Tags: 'Performance',
    Estimate: 5.5,
    Assignee: 'Janet Issues',
    RankId: 2
  },
  {
    Id: 3,
    Status: 'Testing',
    Summary: 'Fix the issues reported in the IE browser',
    Type: 'Bug',
    Priority: 'Medium',
    Tags: 'Bug,IE',
    Estimate: 2.5,
    Assignee: 'Janet Issues',
    RankId: 3
  },
  {
    Id: 4,
    Status: 'Testing',
    Summary: 'Fix the issues reported by the customer.',
    Type: 'Bug',
    Priority: 'Low',
    Tags: 'Customer',
    Estimate: 3.5,
    Assignee: 'Steven Walker',
    RankId: 4
  },
  {
    Id: 5,
    Status: 'Close',
    Summary: 'Analyze SQL server 2008 connection.',
    Type: 'Story',
    Priority: 'Critical',
    Tags: 'Grid,Sql',
    Estimate: 2,
    Assignee: 'Michael Suyama',
    RankId: 5
  }
];
```

**Data field mapping:**
- `Id` - Unique identifier (used as card header)
- `Status` - Column mapping field (Open, InProgress, Testing, Close)
- `Summary` - Card content/description
- `Type` - Optional: Epic, Bug, Story, Task
- `Priority` - Optional: Critical, High, Medium, Low
- `Assignee` - Optional: User name (used for swimlanes)
- `Tags` - Optional: Comma-separated tags
- `Estimate` - Optional: Story points or time estimate
- `RankId` - Optional: Card order within column

## First Running Board

Complete example with all essential setup:

```typescript
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { KanbanModule } from '@syncfusion/ej2-angular-kanban';
import { CardSettingsModel } from '@syncfusion/ej2-angular-kanban';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, KanbanModule],
  template: `
    <div class="container">
      <h1>Project Task Board</h1>
      <ejs-kanban 
        keyField="Status"
        [dataSource]="tasks"
        [cardSettings]="cardSettings">
        <e-columns>
          <e-column headerText="📋 To Do" keyField="Open"></e-column>
          <e-column headerText="🔨 In Progress" keyField="InProgress"></e-column>
          <e-column headerText="✅ Done" keyField="Close"></e-column>
        </e-columns>
      </ejs-kanban>
    </div>
  `,
  styles: [`
    .container {
      padding: 20px;
      font-family: Arial, sans-serif;
    }
    h1 {
      color: #333;
      margin-bottom: 20px;
    }
  `]
})
export class AppComponent {
  cardSettings: CardSettingsModel = {
    headerField: 'Id',
    contentField: 'Summary',
    showHeader: true
  };

  tasks = [
    { Id: 'Task-1', Status: 'Open', Summary: 'Design homepage mockup' },
    { Id: 'Task-2', Status: 'Open', Summary: 'Create database schema' },
    { Id: 'Task-3', Status: 'InProgress', Summary: 'Implement authentication' },
    { Id: 'Task-4', Status: 'InProgress', Summary: 'API endpoint development' },
    { Id: 'Task-5', Status: 'Close', Summary: 'Testing framework setup' },
    { Id: 'Task-6', Status: 'Close', Summary: 'Documentation complete' }
  ];
}
```

**Run the application:**

```bash
ng serve
```

Visit `http://localhost:4200` to see your Kanban board. Cards can be dragged between columns immediately (drag-and-drop is enabled by default).

## Next Steps

- **To customize cards:** Read columns-and-swimlanes.md
- **To add data binding:** Read cards-and-data-binding.md
- **To handle events:** Read events.md
- **To use methods:** Read methods.md
