# Checkbox Features in Angular Dropdown Tree

## Table of Contents
- [Overview](#overview)
- [Enable Checkboxes](#enable-checkboxes)
- [Multi-Selection Behavior](#multi-selection-behavior)
- [Auto-Check Functionality](#auto-check-functionality)
- [Select All Feature](#select-all-feature)
- [Checkbox State Management](#checkbox-state-management)
- [Code Examples](#code-examples)

## Overview

The Dropdown Tree checkbox feature enables multi-selection of tree items without affecting the dropdown's visual appearance. Users can check multiple items simultaneously across different hierarchical levels. The component supports three modes of checkbox behavior:

1. **Independent** - Each item checked/unchecked independently (default)
2. **Auto-Check** - Parent-child synchronization with hierarchical consistency
3. **Select All** - Convenient header checkbox to select/deselect all items at once

## Enable Checkboxes

Enable checkboxes by setting the `showCheckBox` property to `true`:

```typescript
import { Component } from '@angular/core';
import { DropDownTreeModule } from '@syncfusion/ej2-angular-dropdowns';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-checkbox-example',
  template: `<ejs-dropdowntree id='dropdowntree' 
                [fields]='fields' 
                [showCheckBox]='true'
                placeholder='Select items (checkboxes enabled)'></ejs-dropdowntree>`,
  standalone: true,
  imports: [DropDownTreeModule, FormsModule, ReactiveFormsModule]
})
export class CheckboxExampleComponent {
  public data = [
    { id: 1, name: 'Discover Music', hasChild: true, expanded: true },
    { id: 2, pid: 1, name: 'Hot Singles' },
    { id: 3, pid: 1, name: 'Rising Artists' },
    { id: 4, pid: 1, name: 'Live Music' },
    { id: 6, pid: 1, name: 'Best of 2017 So Far' },
    { id: 7, name: 'Sales and Events', hasChild: true },
    { id: 8, pid: 7, name: '100 Albums - $5 Each' },
    { id: 9, pid: 7, name: 'Hip-Hop and R&B Sale' },
    { id: 10, pid: 7, name: 'CD Deals' }
  ];

  public fields = {
    dataSource: this.data,
    value: 'id',
    text: 'name',
    parentValue: 'pid',
    hasChildren: 'hasChild'
  };
}
```

**Result:** A checkbox appears before each item text in the popup, allowing multi-selection without visual disruption to the compact dropdown UI.

## Multi-Selection Behavior

When checkboxes are enabled (and `autoCheck` is false), each item can be independently checked or unchecked:

### Example: Independent Checkbox Selection

```typescript
@Component({
  template: `<ejs-dropdowntree id='dropdowntree' 
                [fields]='fields' 
                [showCheckBox]='true'
                (change)='onSelectionChanged($event)'></ejs-dropdowntree>`
})
export class IndependentCheckboxComponent {
  public fields = { dataSource: this.data, /* ... */ };

  onSelectionChanged(event: any) {
    // Access selected items
    const selectedItems = event.value; // Array of selected values
    console.log('Selected:', selectedItems);
  }
}
```

**Behavior:**
- Checking a child item does NOT automatically check the parent
- Checking a parent item does NOT automatically check children
- Users have full control over selection combinations
- Display in input shows "2 item(s) selected" format

**Use case:** When selections are independent (e.g., selecting individual features to enable, not requiring parent-child consistency).

## Auto-Check Functionality

Auto-check creates hierarchical checkbox behavior where parent and child selections are synchronized. Enable it through the `treeSettings` property:

```typescript
import { Component } from '@angular/core';
import { DropDownTreeModule } from '@syncfusion/ej2-angular-dropdowns';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-auto-check',
  template: `<ejs-dropdowntree id='dropdowntree' 
                [fields]='fields' 
                [showCheckBox]='true'
                [treeSettings]='{ autoCheck: true }'
                placeholder='Select with hierarchical sync'></ejs-dropdowntree>`,
  standalone: true,
  imports: [DropDownTreeModule, FormsModule, ReactiveFormsModule]
})
export class AutoCheckComponent {
  public data = [
    { id: 1, name: 'Discover Music', hasChild: true, expanded: true },
    { id: 2, pid: 1, name: 'Hot Singles' },
    { id: 3, pid: 1, name: 'Rising Artists' },
    { id: 4, pid: 1, name: 'Live Music' },
    { id: 7, name: 'Sales and Events', hasChild: true },
    { id: 8, pid: 7, name: '100 Albums - $5 Each' },
    { id: 9, pid: 7, name: 'Hip-Hop and R&B Sale' }
  ];

  public fields = {
    dataSource: this.data,
    value: 'id',
    text: 'name',
    parentValue: 'pid',
    hasChildren: 'hasChild'
  };
}
```

### Auto-Check Rules

1. **All children checked → Parent automatically checked**
   - When all child items are checked, the parent becomes fully checked

2. **Some children checked → Parent becomes intermediate**
   - When only some children are checked, the parent shows a "partially filled" checkbox (intermediate state)

3. **Parent checked → All children automatically checked**
   - Checking a parent automatically checks all its children recursively

4. **Last child unchecked → Parent becomes unchecked**
   - When the last checked child is unchecked, the parent reverts to unchecked state

**Example Scenario:**
```
Initial state:
☐ Music
  ☐ Hot Singles
  ☐ Rising Artists
  ☐ Live Music

User checks "Hot Singles" and "Rising Artists":
☐ Music (becomes ◐ intermediate - 2/3 children checked)
  ☑ Hot Singles
  ☑ Rising Artists
  ☐ Live Music

User clicks parent checkbox:
☑ Music (now fully checked)
  ☑ Hot Singles
  ☑ Rising Artists
  ☑ Live Music (automatically checked)
```

**Use case:** Hierarchical selections where checking a category should include all subcategories (permissions, product features, organizational units).

## Select All Feature

The Select All feature adds a checkbox in the popup header to quickly select or deselect all items:

```typescript
import { Component } from '@angular/core';
import { DropDownTreeModule } from '@syncfusion/ej2-angular-dropdowns';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-select-all',
  template: `<ejs-dropdowntree id='dropdowntree' 
                [fields]='fields' 
                [showCheckBox]='true'
                [showSelectAll]='true'
                selectAllText='Check All'
                unSelectAllText='Uncheck All'
                placeholder='Select with Select All option'></ejs-dropdowntree>`,
  standalone: true,
  imports: [DropDownTreeModule, FormsModule, ReactiveFormsModule]
})
export class SelectAllComponent {
  public data = [
    { id: 1, name: 'Discover Music', hasChild: true, expanded: true },
    { id: 2, pid: 1, name: 'Hot Singles' },
    { id: 3, pid: 1, name: 'Rising Artists' },
    { id: 4, pid: 1, name: 'Live Music' },
    { id: 6, pid: 1, name: 'Best of 2017 So Far' },
    { id: 7, name: 'Sales and Events', hasChild: true },
    { id: 8, pid: 7, name: '100 Albums - $5 Each' },
    { id: 9, pid: 7, name: 'Hip-Hop and R&B Sale' },
    { id: 10, pid: 7, name: 'CD Deals' }
  ];

  public fields = {
    dataSource: this.data,
    value: 'id',
    text: 'name',
    parentValue: 'pid',
    hasChildren: 'hasChild'
  };
}
```

### Select All Properties

| Property | Type | Default | Purpose |
|----------|------|---------|---------|
| `showSelectAll` | boolean | false | Enable/disable header checkbox |
| `selectAllText` | string | "Select All" | Label when unchecked |
| `unSelectAllText` | string | "Unselect All" | Label when checked |

**Header behavior:**
- Unchecked: Clicking selects all items + updates label to `unSelectAllText`
- Checked: Clicking deselects all items + updates label to `selectAllText`
- Partial: Shows intermediate state if some items are checked

**Use case:** For datasets with 5+ items where manual selection becomes tedious (bulk import/export, permission management).

## Checkbox State Management

### Accessing Selected Items

```typescript
@Component({
  selector: 'app-state-management',
  template: `<ejs-dropdowntree id='dropdowntree' 
                #tree
                [fields]='fields' 
                [showCheckBox]='true'></ejs-dropdowntree>
              <button (click)='getSelectedItems()'>Get Selected</button>`,
  standalone: true,
  imports: [DropDownTreeModule, FormsModule, ReactiveFormsModule]
})
export class StateManagementComponent {
  @ViewChild('tree') dropdowntree: DropDownTreeComponent;

  public fields = { dataSource: this.data, /* ... */ };

  getSelectedItems() {
    // Access the dropdown tree component
    const selectedValues = this.dropdowntree.value; // Array of checked item values
    console.log('Checked items:', selectedValues);
  }
}
```

### Pre-Selecting Items

Set `selected: true` in data to pre-check items:

```typescript
public data = [
  { id: 1, name: 'Music', hasChild: true, selected: true }, // Pre-checked
  { id: 2, pid: 1, name: 'Hot Singles', selected: true },   // Pre-checked
  { id: 3, pid: 1, name: 'Rising Artists' }
];
```

**Note:** When using auto-check with pre-selected items, ensure parent-child relationships are consistent or let auto-check synchronize them on load.

### Programmatic Selection

```typescript
@ViewChild('tree') dropdowntree: DropDownTreeComponent;

selectSpecificItems() {
  // Programmatically set checked items
  this.dropdowntree.value = [2, 3, 5]; // Check items with these values
}
```

### Intermediate State Detection

Auto-check intermediate states help users understand partial parent selection:

```
☐ No children checked → unchecked
◐ Some children checked → intermediate (visually distinct)
☑ All children checked → fully checked
```

The intermediate checkbox is purely visual and updates automatically when auto-check is enabled.

**Best Practices:**
- Use auto-check for hierarchical permission/category selection
- Use independent checkboxes for unrelated multi-selection
- Use Select All for 5+ item lists to reduce selection time
- Combine with form validation to ensure valid selection states
