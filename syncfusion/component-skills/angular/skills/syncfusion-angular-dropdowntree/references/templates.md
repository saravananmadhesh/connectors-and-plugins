# Templates and Customization in Angular Dropdown Tree

## Table of Contents
- [Overview](#overview)
- [Item Template](#item-template)
- [Value Template](#value-template)
- [Header Template](#header-template)
- [Footer Template](#footer-template)
- [No Records Template](#no-records-template)
- [Action Failure Template](#action-failure-template)
- [Custom Multi-Selection Display](#custom-multi-selection-display)
- [Template Expression Syntax](#template-expression-syntax)
- [Code Examples](#code-examples)

## Overview

The Dropdown Tree provides comprehensive templating support to customize virtually every visual aspect of the component. Templates allow you to display rich, formatted content beyond plain text, including metadata, icons, status indicators, and complex data structures. All templates use Syncfusion's template engine with interpolation syntax for dynamic data binding.

## Item Template

The `itemTemplate` property customizes how each tree item is rendered. This is ideal for displaying complex information, icons, status indicators, or metadata alongside the main text.

### Basic Item Template

```typescript
import { Component } from '@angular/core';
import { DropDownTreeModule } from '@syncfusion/ej2-angular-dropdowns';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-item-template',
  template: `<ejs-dropdowntree id='dropdownTree' 
                [fields]='fields' 
                [itemTemplate]='itemTemplate'
                [popupHeight]='height'></ejs-dropdowntree>`,
  standalone: true,
  imports: [DropDownTreeModule, FormsModule, ReactiveFormsModule]
})
export class ItemTemplateComponent {
  public data = [
    { id: 1, name: 'Steven Buchanan', job: 'General Manager', hasChild: true, expanded: true },
    { id: 2, pid: 1, name: 'Laura Callahan', job: 'Product Manager', hasChild: true },
    { id: 3, pid: 2, name: 'Andrew Fuller', job: 'Team Lead', hasChild: true },
    { id: 4, pid: 3, name: 'Anne Dodsworth', job: 'Developer' }
  ];

  public fields = {
    dataSource: this.data,
    value: 'id',
    text: 'name',
    parentValue: 'pid',
    hasChildren: 'hasChild'
  };

  public height = '300px';

  // Custom template for each item: name - job
  public itemTemplate = '<div><span class="ename">${name} - </span><span class="ejob">${job}</span></div>';
}
```

**Result:** Each tree item displays as:
```
Steven Buchanan - General Manager
  Laura Callahan - Product Manager
    Andrew Fuller - Team Lead
```

### Item Template with Icons and Status

```typescript
@Component({
  template: `<ejs-dropdowntree id='dropdowntree' 
                [fields]='fields' 
                [itemTemplate]='itemTemplate'></ejs-dropdowntree>`
})
export class ItemTemplateIconsComponent {
  public data = [
    { id: 1, name: 'Steven Buchanan', status: 'busy', icon: '🔴', hasChild: true },
    { id: 2, pid: 1, name: 'Laura Callahan', status: 'online', icon: '🟢' }
  ];

  public itemTemplate = 
    '<div>' +
      '<span class="icon">${icon}</span> ' +
      '<span class="name">${name}</span> ' +
      '<span class="status" [class]="status">(${status})</span>' +
    '</div>';

  public fields = { dataSource: this.data, /* ... */ };
}
```

**When to use:** When items contain metadata (status, category, department, metadata flags) that users need to see at a glance.

## Value Template

The `valueTemplate` property customizes how the selected item(s) are displayed in the input field itself (not in the popup).

```typescript
import { Component } from '@angular/core';
import { DropDownTreeModule } from '@syncfusion/ej2-angular-dropdowns';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-value-template',
  template: `<ejs-dropdowntree id='dropdownTree' 
                [fields]='fields' 
                [valueTemplate]='valueTemplate'
                [popupHeight]='height'
                [placeholder]='watermark'></ejs-dropdowntree>`,
  standalone: true,
  imports: [DropDownTreeModule, FormsModule, ReactiveFormsModule]
})
export class ValueTemplateComponent {
  public data = [
    { id: 1, name: 'Steven Buchanan', job: 'General Manager', hasChild: true, expanded: true },
    { id: 2, pid: 1, name: 'Laura Callahan', job: 'Product Manager' },
    { id: 3, pid: 1, name: 'Andrew Fuller', job: 'Team Lead' }
  ];

  public fields = {
    dataSource: this.data,
    value: 'id',
    text: 'name',
    parentValue: 'pid',
    hasChildren: 'hasChild'
  };

  public height = '300px';
  public watermark = 'Select an employee';

  // Display format: "Name - Job Title"
  public valueTemplate = '<div><span class="ename">${name} - </span><span class="ejob">${job}</span></div>';
}
```

**Result:** When user selects "Laura Callahan", the input shows:
```
Laura Callahan - Product Manager
```

**When to use:** To provide context about the selected item beyond just the name (job title, department, ID).

## Header Template

The `headerTemplate` property adds custom content at the top of the popup list. This is useful for instructions, filters, or custom controls.

```typescript
@Component({
  selector: 'app-header-template',
  template: `<ejs-dropdowntree id='dropdownTree' 
                [fields]='fields' 
                [popupHeight]='height'
                [placeholder]='watermark'
                [headerTemplate]='headerTemplate'></ejs-dropdowntree>`,
  standalone: true,
  imports: [DropDownTreeModule, FormsModule, ReactiveFormsModule]
})
export class HeaderTemplateComponent {
  public data = [
    { id: 1, name: 'Steven Buchanan', hasChild: true, expanded: true },
    { id: 2, pid: 1, name: 'Laura Callahan', hasChild: true }
  ];

  public fields = { 
    dataSource: this.data, 
    text: 'name', 
    value: 'id', 
    parentValue: 'pid', 
    hasChildren: 'hasChild' 
  };

  public height = '300px';
  public watermark = 'Select an employee';

  // Custom header: instruction text
  public headerTemplate = '<div class="head"> Employee List </div>';
}
```

**When to use:** 
- Provide selection instructions
- Add filtering/search hints
- Display totals or counts
- Include help text for complex selections

## Footer Template

The `footerTemplate` property adds custom content at the bottom of the popup list.

```typescript
@Component({
  selector: 'app-footer-template',
  template: `<ejs-dropdowntree id='dropdownTree' 
                [fields]='fields' 
                [popupHeight]='height'
                [placeholder]='watermark'
                [footerTemplate]='footerTemplate'></ejs-dropdowntree>`,
  standalone: true,
  imports: [DropDownTreeModule, FormsModule, ReactiveFormsModule]
})
export class FooterTemplateComponent {
  public data = [
    { id: 1, name: 'Steven Buchanan', hasChild: true, expanded: true },
    { id: 2, pid: 1, name: 'Laura Callahan' },
    { id: 3, pid: 1, name: 'Andrew Fuller' }
  ];

  public fields = { 
    dataSource: this.data, 
    text: 'name', 
    value: 'id', 
    parentValue: 'pid', 
    hasChildren: 'hasChild' 
  };

  public height = '300px';
  public watermark = 'Select an employee';

  // Display item count dynamically
  public footerTemplate = 
    "<span class='foot'> Total number of employees: " + 
    this.data.length + 
    "</span>";
}
```

**When to use:**
- Display item counts or statistics
- Add "Add new item" buttons
- Show pagination info
- Display data source metadata

## No Records Template

The `noRecordsTemplate` displays custom content when no items match a search filter or when the data source is empty.

```typescript
@Component({
  selector: 'app-no-records',
  template: `<ejs-dropdowntree id='dropdownTree' 
                [fields]='fields' 
                [popupHeight]='height'
                [placeholder]='watermark'
                [noRecordsTemplate]='noRecordsTemplate'></ejs-dropdowntree>`,
  standalone: true,
  imports: [DropDownTreeModule, FormsModule, ReactiveFormsModule]
})
export class NoRecordsComponent {
  public data = []; // Empty data source

  public fields = { 
    dataSource: this.data, 
    text: 'name', 
    value: 'id', 
    parentValue: 'pid', 
    hasChildren: 'hasChild' 
  };

  public height = '300px';
  public watermark = 'Select an employee';

  // Custom message when no data available
  public noRecordsTemplate = '<span class="norecord"> NO DATA AVAILABLE</span>';
}
```

**When to use:**
- Provide friendly messages for empty states
- Guide users on next actions
- Display loading indicators
- Show troubleshooting hints

## Action Failure Template

The `actionFailureTemplate` displays custom error messages when remote data fetches fail.

```typescript
import { DataManager, ODataV4Adaptor } from '@syncfusion/ej2-data';

@Component({
  selector: 'app-action-failure',
  template: `<ejs-dropdowntree id='dropdowntree' 
                [fields]='fields' 
                [actionFailureTemplate]='actionFailureTemplate'></ejs-dropdowntree>`
})
export class ActionFailureComponent {
  // Invalid URL to trigger error
  public data = new DataManager({
    url: 'url',
    adaptor: new ODataV4Adaptor,
    crossDomain: true
  });

  public fields = {
    dataSource: this.data,
    value: 'id',
    text: 'name'
  };

  // Custom error message
  public actionFailureTemplate = 
    '<div style="padding: 20px; color: red; text-align: center;">' +
      '<p>⚠️ Failed to load data</p>' +
      '<p style="font-size: 12px;">Please check your connection and try again</p>' +
    '</div>';
}
```

**When to use:**
- Handle network failures gracefully
- Display API error messages
- Guide users to retry
- Log error information for debugging

## Custom Multi-Selection Display

When multiple items are selected via checkboxes, the `mode` property set to "Custom" combined with `customTemplate` allows custom display formatting:

```typescript
import { Component } from '@angular/core';
import { DropDownTreeModule } from '@syncfusion/ej2-angular-dropdowns';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-custom-multi-selection',
  template: `<ejs-dropdowntree id='dropdowntree' 
                [fields]='fields' 
                [showCheckBox]='true'
                [mode]='mode'
                [customTemplate]='customTemplate'
                [treeSettings]='{ autoCheck: true }'></ejs-dropdowntree>`,
  standalone: true,
  imports: [DropDownTreeModule, FormsModule, ReactiveFormsModule]
})
export class CustomMultiSelectionComponent {
  public data = [
    { id: 1, name: 'Music', hasChild: true, expanded: true },
    { id: 2, pid: 1, name: 'Hot Singles' },
    { id: 3, pid: 1, name: 'Rising Artists' },
    { id: 7, name: 'Videos', hasChild: true },
    { id: 8, pid: 7, name: 'Action' },
    { id: 9, pid: 7, name: 'Drama' }
  ];

  public fields = {
    dataSource: this.data,
    value: 'id',
    text: 'name',
    parentValue: 'pid',
    hasChildren: 'hasChild'
  };

  public mode = 'Custom';

  // Default: shows "N item(s) selected"
  public customTemplate = '${value.length} item(s) selected';

  // Alternative: "Selected count: N"
  // public customTemplate = 'Selected count: ${value.length}';
}
```

**Template Variables:**
- `${value.length}` - Number of selected items
- `${value.join(', ')}` - Comma-separated list of values

**Examples:**
```typescript
// Show count
public customTemplate = '📋 ${value.length} selected';

// Show range
public customTemplate = '${value.length > 3 ? value.length + " items selected" : value.join(", ")}';

// Show first few items
public customTemplate = 'Selected: ${value.slice(0, 2).join(", ")}${value.length > 2 ? " +" + (value.length - 2) : ""}';
```

**When to use:** To provide context-aware displays for multi-selection scenarios (progress indicators, item previews, counts with icons).

## Template Expression Syntax

### Basic Interpolation

Use `${}` syntax to access data properties:

```html
<!-- Simple property -->
<div>${name}</div>

<!-- Nested property -->
<div>${employee.department}</div>

<!-- Method call -->
<div>${getDisplayName()}</div>
```

### Conditionals

```html
<!-- if-like ternary -->
<div>${status === 'active' ? '🟢 Active' : '🔴 Inactive'}</div>

<!-- Complex expression -->
<div>${level > 2 ? 'Senior ' + title : 'Junior ' + title}</div>
```

### Array Operations

```html
<!-- Array length -->
<div>Team size: ${team.length}</div>

<!-- Array filtering (in custom functions) -->
<div>${getVisibleMembers(item).join(", ")}</div>
```

### CSS Classes

Combine template data with styles:

```html
<div [class]="status">
  <span class="icon">${getIcon(type)}</span>
  <span class="text">${name}</span>
</div>
```

**Best Practices:**
- Keep templates simple; complex logic belongs in component methods
- Use meaningful CSS classes for styling
- Access only top-level data properties for performance
- Test templates with edge cases (empty strings, null values, special characters)
