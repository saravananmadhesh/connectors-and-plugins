````markdown
# API Reference for Angular Dropdown Tree - Comprehensive Guide

Complete reference documentation for all properties, methods, and events when implementing the Syncfusion Angular Dropdown Tree component. This guide covers every available property organized by category with practical examples and use cases.

**Component Selector:** `<ejs-dropdowntree>`

**Module:** `DropDownTreeModule` from `@syncfusion/ej2-angular-dropdowns`

**TypeScript Interface:** `DropDownTreeComponent`

## Table of Contents
- [Core Properties](#core-properties)
- [Fields Configuration](#fields-configuration)
- [Tree Settings](#tree-settings)
- [Data Binding Examples](#data-binding-examples)
- [Display Properties](#display-properties)
- [Selection Properties](#selection-properties)
- [Template Properties](#template-properties)
- [Search and Filtering](#search-and-filtering)
- [Localization and Accessibility](#localization-and-accessibility)
- [State Management](#state-management)
- [Individual Property Examples](#individual-property-examples)
- [Common Events](#common-events)
- [Methods](#methods)
- [Best Practices](#best-practices)
- [Troubleshooting](#troubleshooting)

---

## Core Properties

### Essential Data Binding Properties

| Property | Type | Default | Required | Purpose |
|----------|------|---------|----------|---------|
| `fields` | FieldsModel | - | ✓ | Maps data source properties to component fields |
| `value` | string\|string[] | null | - | Currently selected item value(s) |
| `text` | string | "" | - | Display text of selected item(s) |
| `enabled` | boolean | true | - | Enable/disable component interactions |
| `placeholder` | string | "" | - | Hint text displayed when no item is selected |

#### Basic Data Binding Example

```typescript
import { Component } from '@angular/core';
import { DropDownTreeModule } from '@syncfusion/ej2-angular-dropdowns';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-basic-binding',
  template: `
    <div class="control-section">
      <ejs-dropdowntree #ddt
        id='dropdowntree'
        [fields]='fields'
        [(value)]='selectedValue'
        placeholder='Select an item'>
      </ejs-dropdowntree>
      <p>Selected: {{ selectedValue }}</p>
    </div>
  `,
  standalone: true,
  imports: [DropDownTreeModule, FormsModule]
})
export class BasicBindingComponent {
  public data = [
    { id: 1, name: 'Parent 1', hasChild: true, expanded: true },
    { id: 2, pid: 1, name: 'Child 1.1' },
    { id: 3, pid: 1, name: 'Child 1.2' },
    { id: 4, name: 'Parent 2', hasChild: true }
  ];

  public fields = {
    dataSource: this.data,
    value: 'id',
    text: 'name',
    parentValue: 'pid',
    hasChildren: 'hasChild'
  };

  public selectedValue: string = '';
}
```

---

## Display Properties

Complete control over component appearance and user interface.

| Property | Type | Default | Purpose |
|----------|------|---------|---------|
| `popupHeight` | string\|number | "300px" | Height of expanded dropdown popup |
| `popupWidth` | string\|number | auto | Width of expanded dropdown popup (inherits component width if auto) |
| `width` | string\|number | auto | Width of component input element |
| `cssClass` | string | "" | CSS class(es) for custom styling (applied to component and popup) |
| `showDropDownIcon` | boolean | true | Show/hide dropdown arrow button |
| `showClearButton` | boolean | false | Show/hide clear button (X) to reset selection |
| `wrapText` | boolean | false | Wrap long selected text to multiple lines |
| `zIndex` | number | 1000 | Z-index value of popup for stacking context |
| `readonly` | boolean | false | Make input read-only (popup still accessible) |

### Display Configuration Example

```typescript
@Component({
  selector: 'app-display-config',
  template: `
    <ejs-dropdowntree [fields]='fields'
      [popupHeight]='400'
      [popupWidth]='350'
      [width]='300'
      [showClearButton]='true'
      [showDropDownIcon]='true'
      [wrapText]='true'
      [readonly]='false'
      cssClass='custom-dropdown-tree'
      [zIndex]='1005'>
    </ejs-dropdowntree>
  `,
  styles: [`
    :host ::ng-deep .custom-dropdown-tree.e-dropdown-tree {
      border: 2px solid #2196F3;
      border-radius: 4px;
    }
    :host ::ng-deep .custom-dropdown-tree.e-dropdown-tree .e-input-group {
      padding: 8px 12px;
    }
  `]
})
export class DisplayConfigComponent {
  public fields = { /* ... */ };
}
```

---

## Selection Properties

Control selection behavior, modes, and multi-selection features.

| Property | Type | Default | Purpose |
|----------|------|---------|---------|
| `showCheckBox` | boolean | false | Display checkboxes for multi-selection |
| `allowMultiSelection` | boolean | false | Enable multi-selection with Ctrl+Click/Shift+Click |
| `showSelectAll` | boolean | false | Display "Select All" checkbox in popup header |
| `selectAllText` | string | "Select All" | Label for Select All checkbox (unchecked state) |
| `unSelectAllText` | string | "Unselect All" | Label for Select All checkbox (checked state) |
| `mode` | "Default"\|"Custom"\|"Box"\|"Delimiter" | "Default" | How selected items display in input |
| `delimiterChar` | string | "," | Delimiter for "Delimiter" mode (separates multiple selections) |
| `changeOnBlur` | boolean | true | Fire change event on blur (false = on every selection) |

### Selection Modes Explained

**Mode: "Default"**
- Single selection shows item name
- Multiple selections show "N item(s) selected"

**Mode: "Box"**
- Multiple selections display as individual chips/tags
- Each item has a remove button
- Wraps to multiple lines if needed

**Mode: "Delimiter"**
- Multiple selections shown as comma-separated text
- More compact than "Box" mode

**Mode: "Custom"**
- Use custom template to display selections
- Access `${value.length}` in template

### Multi-Selection Example

```typescript
@Component({
  selector: 'app-multi-selection',
  template: `
    <div class="section">
      <h4>Independent Multi-Selection</h4>
      <ejs-dropdowntree [fields]='fields'
        [showCheckBox]='true'
        mode='Delimiter'
        delimiterChar=' | '
        [allowMultiSelection]='true'
        (change)='onSelectionChange($event)'>
      </ejs-dropdowntree>
    </div>
    
    <div class="section">
      <h4>With Auto-Check Hierarchy</h4>
      <ejs-dropdowntree [fields]='fields'
        [showCheckBox]='true'
        [showSelectAll]='true'
        selectAllText='Check All Items'
        unSelectAllText='Uncheck All Items'
        [treeSettings]='{ autoCheck: true }'
        mode='Box'>
      </ejs-dropdowntree>
    </div>
  `,
  standalone: true,
  imports: [DropDownTreeModule]
})
export class MultiSelectionComponent {
  public fields = { /* ... */ };
  
  onSelectionChange(event: any) {
    console.log('Selected values:', event.value);
    console.log('Item count:', event.value ? event.value.length : 0);
  }
}
```

---

## Fields Configuration

The `fields` property (FieldsModel) maps data source properties to component fields.

### Available Field Properties

| Property | Type | Purpose |
|----------|------|---------|
| `dataSource` | Array\|DataManager | **Required.** Data source array or remote DataManager |
| `value` | string | **Required.** Unique identifier field name |
| `text` | string | **Required.** Display text field name |
| `child` | string\|FieldsModel | **Required for hierarchy.** Child items field (for nested data) OR object with child fields config |
| `parentValue` | string | **Required for hierarchy.** Parent ID field (for flat/self-referential data) |
| `hasChildren` | string | Indicates if node has children (boolean or count field) |
| `expanded` | string | Field name to mark items expanded by default |
| `selected` | string | Field name to mark items pre-selected |
| `query` | Query | External DataManager query to execute |
| `tableName` | string | Table name for server-side data fetching |
| `iconCss` | string | CSS class field for item icons |
| `imageUrl` | string | Image URL field for item images |
| `tooltip` | string | Tooltip text field |
| `selectable` | string | Boolean field to disable item selection |
| `htmlAttributes` | string | HTML attributes field |

### Complete Fields Configuration Example

```typescript
@Component({
  selector: 'app-fields-config',
  template: `<ejs-dropdowntree [fields]='fields'></ejs-dropdowntree>`
})
export class FieldsConfigComponent {
  public data = [
    {
      id: 1,
      name: 'Engineering',
      dept_code: 'ENG',
      manager: 'John Doe',
      hasChild: true,
      expanded: true,
      icon: 'e-icons e-people',
      tooltip: 'Engineering Department',
      children: [
        {
          id: 2,
          pid: 1,
          name: 'Frontend Team',
          dept_code: 'ENG-FE',
          manager: 'Jane Smith',
          icon: 'e-icons e-settings',
          tooltip: 'Frontend Development'
        },
        {
          id: 3,
          pid: 1,
          name: 'Backend Team',
          dept_code: 'ENG-BE',
          manager: 'Bob Johnson',
          icon: 'e-icons e-settings',
          tooltip: 'Backend Development'
        }
      ]
    },
    {
      id: 4,
      name: 'Marketing',
      dept_code: 'MKT',
      manager: 'Alice Wonder',
      hasChild: false,
      icon: 'e-icons e-megaphone',
      tooltip: 'Marketing Department'
    }
  ];

  public fields = {
    // Data source binding
    dataSource: this.data,
    
    // Identifier and display
    value: 'id',
    text: 'name',
    
    // Hierarchical structure
    child: 'children',  // Use this for nested data
    // OR
    // parentValue: 'pid',  // Use for flat data with parent IDs
    
    // Visual indicators
    hasChildren: 'hasChild',
    expanded: 'expanded',
    iconCss: 'icon',
    tooltip: 'tooltip',
    
    // Note: 'selected' is a field name, not a field configuration
    // Use data[i].selected = true to pre-select items
  };
}
```

### Fields Example with Remote Data

```typescript
import { DataManager, ODataV4Adaptor } from '@syncfusion/ej2-data';

@Component({
  template: `<ejs-dropdowntree [fields]='fields'></ejs-dropdowntree>`
})
export class RemoteDataComponent {
  public data = new DataManager({
    url: 'url',
    adaptor: new ODataV4Adaptor,
    crossDomain: true
  });

  public fields = {
    dataSource: this.data,
    value: 'departmentId',
    text: 'departmentName',
    hasChildren: 'hasSubDepartments',
    child: {
      dataSource: new DataManager({
        url: 'url',
        adaptor: new ODataV4Adaptor
      }),
      value: 'teamId',
      text: 'teamName',
      parentValue: 'parentDepartmentId'
    }
  };
}
```

---

## Tree Settings

The `treeSettings` property (TreeSettingsModel) controls tree-specific behaviors.

| Property | Type | Default | Purpose |
|----------|------|---------|---------|
| `autoCheck` | boolean | false | Synchronize parent-child checkbox states |
| `checkDisabledChildren` | boolean | false | Include disabled children when parent is checked |
| `loadOnDemand` | boolean | false | Lazy-load children on parent expansion (for remote data) |
| `expandOn` | "Auto"\|"Click"\|"DblClick"\|"None" | "Auto" | Action to expand/collapse nodes |

### Tree Settings Example

```typescript
@Component({
  selector: 'app-tree-settings',
  template: `
    <ejs-dropdowntree [fields]='fields'
      [showCheckBox]='true'
      [treeSettings]='treeSettings'></ejs-dropdowntree>
  `
})
export class TreeSettingsComponent {
  public treeSettings = {
    autoCheck: true,              // Parent-child sync on checkbox
    checkDisabledChildren: false,  // Don't check disabled children
    expandOn: 'Click',             // Single click to expand
    loadOnDemand: false            // Load all data at once
  };

  public fields = { /* ... */ };
}
```

### Lazy Loading with loadOnDemand

```typescript
import { DataManager, ODataV4Adaptor } from '@syncfusion/ej2-data';

@Component({
  template: `<ejs-dropdowntree [fields]='fields'
    [treeSettings]='{ loadOnDemand: true }'></ejs-dropdowntree>`
})
export class LazyLoadComponent {
  public data = new DataManager({
    url: 'url',
    adaptor: new ODataV4Adaptor
  });

  public fields = {
    dataSource: this.data,
    value: 'id',
    text: 'name',
    hasChildren: 'hasChild',  // Critical: tells component which nodes are expandable
    child: {
      dataSource: new DataManager({
        url: 'url/nodes?parentId=${id}',
        adaptor: new ODataV4Adaptor
      }),
      value: 'id',
      text: 'name',
      parentValue: 'parentId'
    }
  };
}
```

---

## Template Properties

Comprehensive templating for custom UI rendering throughout the component.

| Property | Type | Purpose |
|----------|------|---------|
| `itemTemplate` | string\|Function | Customize each tree item content |
| `valueTemplate` | string\|Function | Customize selected item display in input |
| `headerTemplate` | string\|Function | Add custom content above popup items |
| `footerTemplate` | string\|Function | Add custom content below popup items |
| `noRecordsTemplate` | string\|Function | Display when no data or no search results |
| `actionFailureTemplate` | string\|Function | Display when remote data fetch fails |
| `customTemplate` | string\|Function | Display format for multi-selected items (with mode="Custom") |

### Item Template Example

```typescript
@Component({
  selector: 'app-item-template',
  template: `
    <ejs-dropdowntree [fields]='fields'
      [itemTemplate]='itemTemplate'
      [popupHeight]='300'></ejs-dropdowntree>
  `,
  styles: [`
    .item-container { display: flex; gap: 10px; align-items: center; }
    .item-icon { font-size: 18px; }
    .item-info { display: flex; flex-direction: column; }
    .item-title { font-weight: 500; }
    .item-subtitle { font-size: 12px; color: #666; }
  `]
})
export class ItemTemplateComponent {
  public data = [
    { id: 1, name: 'John Doe', role: 'Manager', icon: '👨‍💼', hasChild: true },
    { id: 2, pid: 1, name: 'Jane Smith', role: 'Developer', icon: '👩‍💻' }
  ];

  // Template syntax uses ${}
  public itemTemplate = 
    `<div class="item-container">
      <span class="item-icon">\${icon}</span>
      <div class="item-info">
        <span class="item-title">\${name}</span>
        <span class="item-subtitle">\${role}</span>
      </div>
    </div>`;

  public fields = {
    dataSource: this.data,
    value: 'id',
    text: 'name',
    parentValue: 'pid',
    hasChildren: 'hasChild'
  };
}
```

### Value Template Example

```typescript
@Component({
  template: `<ejs-dropdowntree [fields]='fields'
    [valueTemplate]='valueTemplate'></ejs-dropdowntree>`
})
export class ValueTemplateComponent {
  public data = [
    { id: 1, name: 'John', title: 'CEO' },
    { id: 2, name: 'Jane', title: 'CTO' }
  ];

  public valueTemplate = '<div>\${name} - <strong>\${title}</strong></div>';

  public fields = { /* ... */ };
}
```

### Custom Multi-Selection Template

```typescript
@Component({
  template: `<ejs-dropdowntree [fields]='fields'
    [showCheckBox]='true'
    mode='Custom'
    [customTemplate]='customTemplate'></ejs-dropdowntree>`
})
export class CustomTemplateComponent {
  public fields = { /* ... */ };

  // Display count with icon
  public customTemplate = '📋 \${value.length} item(s) selected';
  
  // Alternative: Show first few items
  // public customTemplate = '\${value.slice(0, 2).join(", ")}\${value.length > 2 ? " +" + (value.length - 2) : ""}';
}
```

---

## Search and Filtering

Enable interactive search/filtering in the dropdown popup.

| Property | Type | Default | Purpose |
|----------|------|---------|---------|
| `allowFiltering` | boolean | false | Show search bar in popup |
| `filterBarPlaceholder` | string | "" | Placeholder text in filter bar |
| `filterType` | "StartsWith"\|"EndsWith"\|"Contains" | "StartsWith" | Filter matching strategy |
| `ignoreCase` | boolean | true | Case-insensitive search |
| `ignoreAccent` | boolean | false | Ignore diacritical marks (é, ñ, etc.) |

### Filtering Example

```typescript
@Component({
  selector: 'app-filtering',
  template: `
    <ejs-dropdowntree [fields]='fields'
      [allowFiltering]='true'
      filterBarPlaceholder='Search departments...'
      filterType='Contains'
      [ignoreCase]='true'
      [ignoreAccent]='false'
      (filtering)='onFiltering($event)'>
    </ejs-dropdowntree>
  `
})
export class FilteringComponent {
  public fields = { /* ... */ };

  onFiltering(event: any) {
    // Access current filter text
    console.log('Filter text:', event.text);
    // Can modify event.cancel = true to prevent filtering
  }
}
```

---

## Localization and Accessibility

Support for multiple languages and accessibility features.

| Property | Type | Purpose |
|----------|------|---------|
| `locale` | string | Language/culture code (e.g., "en", "es", "fr", "de", "ar") |
| `enableRtl` | boolean | Enable right-to-left direction for RTL languages |
| `floatLabelType` | "Never"\|"Always"\|"Auto" | Floating label behavior for form layouts |

### Localization Example

```typescript
import { registerLocale, L10n } from '@syncfusion/ej2-base';

// Define custom translations
L10n.load({
  'es': {
    'dropdowntree': {
      'actionFailureTemplate': 'No se pudo cargar los datos',
      'noRecordsTemplate': 'Sin registros disponibles'
    }
  }
});

@Component({
  template: `<ejs-dropdowntree [fields]='fields'
    locale='es'></ejs-dropdowntree>`
})
export class LocaleComponent {
  public fields = { /* ... */ };
}
```

### Accessibility Example

```typescript
@Component({
  template: `
    <label for="ddt1" class="form-label">Select Department:</label>
    <ejs-dropdowntree id='ddt1'
      [fields]='fields'
      floatLabelType='Auto'
      [htmlAttributes]='{ "aria-label": "Department selection", "aria-describedby": "hint1" }'></ejs-dropdowntree>
    <small id="hint1">Select one or more departments from the list</small>
  `
})
export class AccessibilityComponent {
  public fields = { /* ... */ };
}
```

---

## State Management

Control component persistence and state.

| Property | Type | Default | Purpose |
|----------|------|---------|---------|
| `enablePersistence` | boolean | false | Save state to localStorage on blur |
| `destroyPopupOnHide` | boolean | true | Remove popup from DOM on hide (false keeps for performance) |
| `enableHtmlSanitizer` | boolean | true | Sanitize HTML in templates to prevent XSS |
| `changeOnBlur` | boolean | true | Trigger change event on blur only |

### Persistence Example

```typescript
@Component({
  selector: 'app-persistence',
  template: `<ejs-dropdowntree id='persistentDDT'
    [fields]='fields'
    [enablePersistence]='true'></ejs-dropdowntree>`,
  standalone: true,
  imports: [DropDownTreeModule]
})
export class PersistenceComponent {
  // Component value automatically restores on page reload
  public fields = { /* ... */ };
}
```

---

## Individual Property Examples

Focused examples for each property without existing samples.

### 1. showClearButton - Display Clear Button

Shows an "X" button to clear the current selection.

```typescript
@Component({
  selector: 'app-clear-button',
  template: `
    <div class="example">
      <h4>Without Clear Button</h4>
      <ejs-dropdowntree [fields]='fields'
        [showClearButton]='false'
        placeholder='Select an item'>
      </ejs-dropdowntree>
    </div>

    <div class="example">
      <h4>With Clear Button</h4>
      <ejs-dropdowntree [fields]='fields'
        [showClearButton]='true'
        placeholder='Select an item'
        (change)='onValueChange($event)'>
      </ejs-dropdowntree>
      <p>Selected: {{ currentValue }}</p>
    </div>
  `,
  styles: [`
    .example { margin: 20px; }
  `],
  standalone: true,
  imports: [DropDownTreeModule, CommonModule]
})
export class ClearButtonComponent {
  public fields = { 
    dataSource: [
      { id: 1, name: 'Item 1' },
      { id: 2, name: 'Item 2' },
      { id: 3, name: 'Item 3' }
    ],
    value: 'id',
    text: 'name'
  };

  public currentValue = '';

  onValueChange(event: any) {
    this.currentValue = event.value || 'None';
  }
}
```

### 2. wrapText - Wrap Long Selected Text

Controls whether long text wraps to multiple lines.

```typescript
@Component({
  selector: 'app-wrap-text',
  template: `
    <div class="example">
      <h4>Without Text Wrapping (wrapText=false)</h4>
      <ejs-dropdowntree [fields]='fields'
        [wrapText]='false'
        [width]='200'
        placeholder='Select an item'>
      </ejs-dropdowntree>
    </div>

    <div class="example">
      <h4>With Text Wrapping (wrapText=true)</h4>
      <ejs-dropdowntree [fields]='fields'
        [wrapText]='true'
        [width]='200'
        placeholder='Select an item'>
      </ejs-dropdowntree>
    </div>
  `,
  styles: [`
    .example { margin: 20px; }
  `],
  standalone: true,
  imports: [DropDownTreeModule]
})
export class WrapTextComponent {
  public fields = {
    dataSource: [
      { id: 1, name: 'This is a very long item name that might exceed the width' },
      { id: 2, name: 'Another long product description here' },
      { id: 3, name: 'Short' }
    ],
    value: 'id',
    text: 'name'
  };
}
```

### 3. zIndex - Control Stacking Order

Adjusts the z-index of the dropdown popup for proper layering with other elements.

```typescript
@Component({
  selector: 'app-zindex',
  template: `
    <div class="modal-overlay" [style.zIndex]="1001">
      <div class="modal-content">
        <h4>Modal with Dropdown (zIndex=1005)</h4>
        <ejs-dropdowntree [fields]='fields'
          [zIndex]='1005'
          placeholder='Select an item'>
        </ejs-dropdowntree>
      </div>
    </div>
  `,
  styles: [`
    .modal-overlay {
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0,0,0,0.5);
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .modal-content {
      background: white;
      padding: 20px;
      border-radius: 8px;
      width: 400px;
    }
  `],
  standalone: true,
  imports: [DropDownTreeModule, CommonModule]
})
export class ZIndexComponent {
  public fields = { /* ... */ };
}
```

### 4. changeOnBlur - Control Change Event Timing

Determines when the change event fires: on blur or on every selection.

```typescript
@Component({
  selector: 'app-change-on-blur',
  template: `
    <div class="example">
      <h4>Change on Blur (changeOnBlur=true) - Default</h4>
      <ejs-dropdowntree [fields]='fields'
        [changeOnBlur]='true'
        (change)='logChange("On Blur", $event)'
        placeholder='Select an item'>
      </ejs-dropdowntree>
      <p>Change events: {{ changeCountBlur }}</p>
    </div>

    <div class="example">
      <h4>Change on Every Selection (changeOnBlur=false)</h4>
      <ejs-dropdowntree [fields]='fields'
        [changeOnBlur]='false'
        (change)='logChange("Every Selection", $event)'
        placeholder='Select an item'>
      </ejs-dropdowntree>
      <p>Change events: {{ changeCountImmediate }}</p>
    </div>
  `,
  styles: [`
    .example { margin: 20px; border: 1px solid #ccc; padding: 15px; }
  `],
  standalone: true,
  imports: [DropDownTreeModule, CommonModule]
})
export class ChangeOnBlurComponent {
  public fields = { /* ... */ };
  public changeCountBlur = 0;
  public changeCountImmediate = 0;

  logChange(mode: string, event: any) {
    if (mode === 'On Blur') {
      this.changeCountBlur++;
      console.log(`Change event (${mode}):`, event.value);
    } else {
      this.changeCountImmediate++;
      console.log(`Change event (${mode}):`, event.value);
    }
  }
}
```

### 5. readonly - Read-Only Mode

Makes the input read-only while still allowing popup access.

```typescript
@Component({
  selector: 'app-readonly',
  template: `
    <div class="example">
      <h4>Normal Mode (readonly=false)</h4>
      <ejs-dropdowntree [fields]='fields'
        [readonly]='false'
        placeholder='Type or select an item'>
      </ejs-dropdowntree>
    </div>

    <div class="example">
      <h4>Read-Only Mode (readonly=true)</h4>
      <p><small>Input cannot be typed, but popup still opens</small></p>
      <ejs-dropdowntree [fields]='fields'
        [readonly]='true'
        [value]='preselectedValue'
        placeholder='Cannot type here'>
      </ejs-dropdowntree>
    </div>
  `,
  styles: [`
    .example { margin: 20px; }
  `],
  standalone: true,
  imports: [DropDownTreeModule, CommonModule]
})
export class ReadOnlyComponent {
  public fields = { /* ... */ };
  public preselectedValue = '1';
}
```

### 6. enableHtmlSanitizer - Security Control

Sanitizes HTML in templates to prevent XSS attacks.

```typescript
@Component({
  selector: 'app-html-sanitizer',
  template: `
    <div class="example">
      <h4>HTML Sanitizer Enabled (Security ON)</h4>
      <ejs-dropdowntree [fields]='fields'
        [itemTemplate]='itemTemplateStr'
        [enableHtmlSanitizer]='true'
        placeholder='Select an item'>
      </ejs-dropdowntree>
    </div>

    <div class="example">
      <h4>HTML Sanitizer Disabled (USE WITH CAUTION)</h4>
      <p><small style="color: red;">⚠️ Only disable if you trust all data sources</small></p>
      <ejs-dropdowntree [fields]='fields'
        [itemTemplate]='itemTemplateStr'
        [enableHtmlSanitizer]='false'
        placeholder='Select an item'>
      </ejs-dropdowntree>
    </div>
  `,
  styles: [`
    .example { margin: 20px; }
  `],
  standalone: true,
  imports: [DropDownTreeModule, CommonModule]
})
export class HtmlSanitizerComponent {
  public fields = {
    dataSource: [
      { id: 1, name: 'Safe Text', html: '<span>Item 1</span>' },
      { id: 2, name: 'With Formatting', html: '<strong>Item 2</strong>' }
    ],
    value: 'id',
    text: 'name'
  };

  public itemTemplateStr = '<div>\${html}</div>';
}
```

### 7. floatLabelType - Floating Label Behavior

Controls how placeholder/label behaves in form layouts.

```typescript
@Component({
  selector: 'app-float-label',
  template: `
    <div class="form-group">
      <h4>Float Label: Never</h4>
      <ejs-dropdowntree [fields]='fields'
        floatLabelType='Never'
        placeholder='Select an item'>
      </ejs-dropdowntree>
    </div>

    <div class="form-group">
      <h4>Float Label: Always</h4>
      <ejs-dropdowntree [fields]='fields'
        floatLabelType='Always'
        placeholder='Select an item'>
      </ejs-dropdowntree>
    </div>

    <div class="form-group">
      <h4>Float Label: Auto</h4>
      <ejs-dropdowntree [fields]='fields'
        floatLabelType='Auto'
        placeholder='Select an item (floats on focus)'>
      </ejs-dropdowntree>
    </div>
  `,
  styles: [`
    .form-group { margin: 30px 0; }
  `],
  standalone: true,
  imports: [DropDownTreeModule]
})
export class FloatLabelComponent {
  public fields = { /* ... */ };
}
```

### 8. ignoreAccent - Accent-Insensitive Search

Search ignores diacritical marks (accents).

```typescript
@Component({
  selector: 'app-ignore-accent',
  template: `
    <div class="example">
      <h4>Ignore Accents (ignoreAccent=true)</h4>
      <p><small>Searching "café" will find "cafe" and vice versa</small></p>
      <ejs-dropdowntree [fields]='fields'
        [allowFiltering]='true'
        filterBarPlaceholder='Search items...'
        [ignoreAccent]='true'
        filterType='Contains'>
      </ejs-dropdowntree>
    </div>

    <div class="example">
      <h4>Respect Accents (ignoreAccent=false)</h4>
      <p><small>Searching "café" will NOT find "cafe"</small></p>
      <ejs-dropdowntree [fields]='fields'
        [allowFiltering]='true'
        filterBarPlaceholder='Search items...'
        [ignoreAccent]='false'
        filterType='Contains'>
      </ejs-dropdowntree>
    </div>
  `,
  styles: [`
    .example { margin: 20px; }
  `],
  standalone: true,
  imports: [DropDownTreeModule]
})
export class IgnoreAccentComponent {
  public fields = {
    dataSource: [
      { id: 1, name: 'Café' },
      { id: 2, name: 'Naïve' },
      { id: 3, name: 'Résumé' },
      { id: 4, name: 'Piñata' }
    ],
    value: 'id',
    text: 'name'
  };
}
```

### 9. destroyPopupOnHide - Popup DOM Management

Controls whether the popup is removed from DOM on hide.

```typescript
@Component({
  selector: 'app-destroy-popup',
  template: `
    <div class="example">
      <h4>Destroy on Hide (destroyPopupOnHide=true) - Default</h4>
      <p><small>Popup removed from DOM when closed (lower memory)</small></p>
      <ejs-dropdowntree [fields]='fields'
        [destroyPopupOnHide]='true'
        placeholder='Select an item'>
      </ejs-dropdowntree>
    </div>

    <div class="example">
      <h4>Keep in DOM (destroyPopupOnHide=false)</h4>
      <p><small>Popup kept in DOM for performance (faster re-open)</small></p>
      <ejs-dropdowntree [fields]='fields'
        [destroyPopupOnHide]='false'
        placeholder='Select an item'>
      </ejs-dropdowntree>
    </div>
  `,
  styles: [`
    .example { margin: 20px; }
  `],
  standalone: true,
  imports: [DropDownTreeModule]
})
export class DestroyPopupComponent {
  public fields = { /* ... */ };
}
```

### 10. sortOrder - Sort Data Items

Sorts the items in the popup list.

```typescript
@Component({
  selector: 'app-sort-order',
  template: `
    <div class="example">
      <h4>No Sorting (sortOrder='None') - Default</h4>
      <ejs-dropdowntree [fields]='fields'
        sortOrder='None'
        placeholder='Select an item'>
      </ejs-dropdowntree>
    </div>

    <div class="example">
      <h4>Ascending Order (sortOrder='Ascending')</h4>
      <ejs-dropdowntree [fields]='fields'
        sortOrder='Ascending'
        placeholder='Select an item (A-Z)'>
      </ejs-dropdowntree>
    </div>

    <div class="example">
      <h4>Descending Order (sortOrder='Descending')</h4>
      <ejs-dropdowntree [fields]='fields'
        sortOrder='Descending'
        placeholder='Select an item (Z-A)'>
      </ejs-dropdowntree>
    </div>
  `,
  styles: [`
    .example { margin: 20px; }
  `],
  standalone: true,
  imports: [DropDownTreeModule]
})
export class SortOrderComponent {
  public fields = {
    dataSource: [
      { id: 1, name: 'Zebra' },
      { id: 2, name: 'Apple' },
      { id: 3, name: 'Mango' },
      { id: 4, name: 'Banana' }
    ],
    value: 'id',
    text: 'name'
  };
}
```

### 11. htmlAttributes - Add Custom HTML Attributes

Add custom HTML attributes for accessibility and data attributes.

```typescript
@Component({
  selector: 'app-html-attributes',
  template: `
    <ejs-dropdowntree [fields]='fields'
      [htmlAttributes]='customAttributes'
      placeholder='Select a department'>
    </ejs-dropdowntree>
  `,
  standalone: true,
  imports: [DropDownTreeModule]
})
export class HtmlAttributesComponent {
  public fields = {
    dataSource: [
      { id: 1, name: 'Engineering', dept_code: 'ENG' },
      { id: 2, name: 'Marketing', dept_code: 'MKT' },
      { id: 3, name: 'Sales', dept_code: 'SAL' }
    ],
    value: 'id',
    text: 'name'
  };

  public customAttributes = {
    'aria-label': 'Department selection dropdown',
    'aria-describedby': 'dept-help-text',
    'data-testid': 'department-selector',
    'data-component': 'dropdown-tree',
    'role': 'combobox',
    'aria-expanded': 'false',
    'aria-controls': 'popup-list'
  };
}
```

### Combined Example - Multiple Properties

Real-world example combining multiple properties:

```typescript
@Component({
  selector: 'app-combined-properties',
  template: `
    <div class="container">
      <h3>Advanced Configuration Example</h3>
      
      <ejs-dropdowntree #advancedDDT
        [fields]='fields'
        [(value)]='selectedValue'
        [showCheckBox]='true'
        [showClearButton]='true'
        [wrapText]='true'
        [readonly]='false'
        mode='Box'
        [allowFiltering]='true'
        filterBarPlaceholder='Search departments...'
        filterType='Contains'
        [ignoreAccent]='true'
        [floatLabelType]='floatLabel'
        [enablePersistence]='true'
        [destroyPopupOnHide]='false'
        [enableHtmlSanitizer]='true'
        [changeOnBlur]='true'
        [treeSettings]='{ autoCheck: true }'
        [zIndex]='1005'
        [htmlAttributes]='accessibilityAttrs'
        sortOrder='Ascending'
        (change)='onSelectionChange($event)'
        (beforeOpen)='onBeforeOpen($event)'>
      </ejs-dropdowntree>

      <div class="info">
        <p><strong>Selected Items:</strong> {{ selectedValue | json }}</p>
        <p><strong>Item Count:</strong> {{ itemCount }}</p>
      </div>
    </div>
  `,
  styles: [`
    .container { max-width: 600px; margin: 20px auto; }
    .info { margin-top: 20px; padding: 15px; background: #f5f5f5; border-radius: 4px; }
  `],
  standalone: true,
  imports: [DropDownTreeModule, CommonModule, JsonPipe]
})
export class CombinedPropertiesComponent {
  @ViewChild('advancedDDT') dropdown!: DropDownTreeComponent;

  public selectedValue: string[] = [];
  public itemCount = 0;
  public floatLabel: FloatLabelType = 'Auto';

  public fields = {
    dataSource: [
      {
        id: 1,
        name: 'Engineering Department',
        hasChild: true,
        expanded: true,
        children: [
          { id: 2, pid: 1, name: 'Frontend Development' },
          { id: 3, pid: 1, name: 'Backend Development' },
          { id: 4, pid: 1, name: 'DevOps' }
        ]
      },
      {
        id: 5,
        name: 'Sales Department',
        hasChild: true,
        children: [
          { id: 6, pid: 5, name: 'Sales Team North' },
          { id: 7, pid: 5, name: 'Sales Team South' }
        ]
      }
    ],
    value: 'id',
    text: 'name',
    hasChildren: 'hasChild',
    expanded: 'expanded',
    child: 'children'
  };

  public accessibilityAttrs = {
    'aria-label': 'Department and team selection',
    'data-testid': 'org-structure-selector'
  };

  onSelectionChange(event: any) {
    this.itemCount = event.value ? event.value.length : 0;
    console.log('Selection changed:', this.selectedValue);
  }

  onBeforeOpen(event: any) {
    console.log('Popup about to open');
  }
}
```

---

## Common Events

Events triggered during component lifecycle and user interactions.

### Selection Events

| Event | Args | When | Usage |
|-------|------|------|-------|
| `change` | DdtChangeEventArgs | Selection changes | Track value changes |
| `select` | DdtSelectEventArgs | Item selected | Item-specific logic |

### Popup Events

| Event | Args | When | Usage |
|-------|------|------|-------|
| `open` | DdtPopupEventArgs | Popup opens (after animation) | Initialize popup content |
| `close` | DdtPopupEventArgs | Popup closes (after animation) | Cleanup resources |
| `beforeOpen` | DdtBeforeOpenEventArgs | Before popup opens | Validate/prevent opening |

### Data Events

| Event | Args | When | Usage |
|-------|------|------|-------|
| `dataBound` | DdtDataBoundEventArgs | Data loaded | Update UI after data load |
| `actionFailure` | Object | Remote data fetch fails | Handle errors |
| `filtering` | DdtFilteringEventArgs | Filter text entered | Custom filtering logic |

### Component Events

| Event | Args | When | Usage |
|-------|------|------|-------|
| `created` | Object | Component created | Initialize |
| `destroyed` | Object | Component destroyed | Cleanup |

### User Interaction Events

| Event | Args | When | Usage |
|-------|------|------|-------|
| `focus` | DdtFocusEventArgs | Component gets focus | Track focus state |
| `blur` | Object | Component loses focus | Validate on blur |
| `keyPress` | DdtKeyPressEventArgs | Key pressed | Custom key handling |

### Events Example

```typescript
@Component({
  selector: 'app-events',
  template: `
    <ejs-dropdowntree #ddt
      [fields]='fields'
      (change)='onSelectionChange($event)'
      (open)='onPopupOpen($event)'
      (close)='onPopupClose($event)'
      (focus)='onFocus($event)'
      (blur)='onBlur($event)'
      (dataBound)='onDataBound($event)'
      (actionFailure)='onDataError($event)'>
    </ejs-dropdowntree>
  `,
  standalone: true,
  imports: [DropDownTreeModule]
})
export class EventsComponent {
  @ViewChild('ddt') dropdowntree!: DropDownTreeComponent;

  public fields = { /* ... */ };

  onSelectionChange(event: any) {
    console.log('Value changed to:', event.value);
  }

  onPopupOpen(event: any) {
    console.log('Popup opened');
  }

  onPopupClose(event: any) {
    console.log('Popup closed');
  }

  onFocus(event: any) {
    console.log('Component focused');
  }

  onBlur(event: any) {
    console.log('Component lost focus');
  }

  onDataBound(event: any) {
    console.log('Data bound, record count:', event.data.length);
  }

  onDataError(event: any) {
    console.error('Data load failed:', event);
  }
}
```

---

## Methods

Programmatic control of the component using ViewChild reference.

| Method | Parameters | Returns | Purpose |
|--------|-----------|---------|---------|
| `showPopup()` | - | void | Open the dropdown popup |
| `hidePopup()` | - | void | Close the dropdown popup |
| `refresh()` | - | void | Refresh component and data |
| `clearSelection()` | - | void | Clear all selected values |
| `expandAll()` | - | void | Expand all tree nodes |
| `collapseAll()` | - | void | Collapse all tree nodes |

### Methods Example

```typescript
@Component({
  selector: 'app-methods',
  template: `
    <ejs-dropdowntree #ddt [fields]='fields'></ejs-dropdowntree>
    
    <div class="button-group">
      <button (click)='openDropdown()'>Open</button>
      <button (click)='closeDropdown()'>Close</button>
      <button (click)='clearAll()'>Clear Selection</button>
      <button (click)='expandAll()'>Expand All</button>
      <button (click)='collapseAll()'>Collapse All</button>
      <button (click)='getSelected()'>Get Selected</button>
    </div>
    <p>Selected: {{ selectedValues }}</p>
  `,
  standalone: true,
  imports: [DropDownTreeModule, CommonModule]
})
export class MethodsComponent {
  @ViewChild('ddt') dropdowntree!: DropDownTreeComponent;

  public fields = { /* ... */ };
  public selectedValues = '';

  openDropdown() {
    this.dropdowntree.showPopup();
  }

  closeDropdown() {
    this.dropdowntree.hidePopup();
  }

  clearAll() {
    this.dropdowntree.value = null;
  }

  expandAll() {
    this.dropdowntree.expandAll();
  }

  collapseAll() {
    this.dropdowntree.collapseAll();
  }

  getSelected() {
    this.selectedValues = this.dropdowntree.value || 'None';
  }
}
```

---

## Complete Properties Reference

### Comprehensive Property List (All Properties)

| Category | Properties | Type | Default |
|----------|-----------|------|---------|
| **Data Binding** | fields, value, text | FieldsModel, string/string[], string | - |
| **Enable/Disable** | enabled, readonly | boolean | true, false |
| **Display** | placeholder, width, popupHeight, popupWidth | string | - |
| **Selection UI** | showCheckBox, allowMultiSelection, mode | boolean, Mode enum | false, "Default" |
| **Checkbox Labels** | showSelectAll, selectAllText, unSelectAllText | boolean, string | false, "Select All", "Unselect All" |
| **Multi-Select Display** | delimiterChar, customTemplate, wrapText | string | "," |
| **Visual Styling** | cssClass, showDropDownIcon, showClearButton, zIndex | string, boolean, number | - |
| **Filtering** | allowFiltering, filterBarPlaceholder, filterType | boolean, string, TreeFilterType | false |
| **Filter Behavior** | ignoreCase, ignoreAccent | boolean | true, false |
| **Localization** | locale, enableRtl, floatLabelType | string, boolean, FloatLabelType | "en-US", false |
| **State Management** | enablePersistence, destroyPopupOnHide | boolean | false, true |
| **Security** | enableHtmlSanitizer | boolean | true |
| **Change Behavior** | changeOnBlur | boolean | true |
| **Sorting** | sortOrder | SortOrder enum | "None" |
| **HTML Attributes** | htmlAttributes | Record<string, string> | {} |

### Detailed Property Descriptions

**Core Data Properties**

```typescript
// fields: FieldsModel - Maps data properties to component
fields: {
  dataSource: array | DataManager,  // Data source
  value: string,                      // Unique ID field
  text: string,                       // Display text field
  child?: string,                     // Child items array (hierarchical)
  parentValue?: string,               // Parent ID field (self-referential)
  hasChildren?: string,               // Has children indicator field
  expanded?: string,                  // Expanded state field
  selected?: string,                  // Pre-selected state field
  iconCss?: string,                   // Icon CSS class field
  imageUrl?: string,                  // Image URL field
  tooltip?: string,                   // Tooltip text field
  selectable?: string,                // Selectable state field
  htmlAttributes?: string             // HTML attributes field
}

// value: string | string[] - Selected item value(s)
value: '1'                    // Single selection
value: ['1', '2', '3']        // Multiple selections (with checkboxes)

// text: string | string[] - Display text of selected item(s)
text: 'Category Name'         // Single selection
text: ['Item1', 'Item2']      // Multiple selections
```

**Display Properties**

```typescript
// placeholder: string - Hint text when no item selected
placeholder: 'Select a category'

// width: string | number - Component width
width: '300px'              // String with unit
width: 300                  // Number (interpreted as pixels)
width: '100%'               // Percentage

// popupHeight: string | number - Dropdown popup height
popupHeight: '300px'        // Fixed height with scrolling
popupHeight: 300

// popupWidth: string | number - Dropdown popup width (default: component width)
popupWidth: '400px'
popupWidth: '100%'

// cssClass: string - CSS classes for styling
cssClass: 'custom-dropdown-tree my-custom-style'

// showDropDownIcon: boolean - Show/hide dropdown arrow
showDropDownIcon: true

// showClearButton: boolean - Show/hide clear (X) button
showClearButton: true

// zIndex: number - Z-index stacking order
zIndex: 1005

// wrapText: boolean - Wrap text to multiple lines
wrapText: true
```

**Selection Properties**

```typescript
// showCheckBox: boolean - Enable checkboxes for multi-selection
showCheckBox: true          // Shows checkboxes before each item

// allowMultiSelection: boolean - Allow Ctrl+Click multi-selection
allowMultiSelection: true

// showSelectAll: boolean - Show "Select All" checkbox in header
showSelectAll: true

// selectAllText: string - Label when Select All is unchecked
selectAllText: 'Check All'

// unSelectAllText: string - Label when Select All is checked  
unSelectAllText: 'Uncheck All'

// mode: Mode enum - How selected items display
mode: 'Default'             // Shows "N items selected"
mode: 'Box'                 // Shows chips/tags
mode: 'Delimiter'           // Shows comma-separated text
mode: 'Custom'              // Uses customTemplate

// delimiterChar: string - Separator for Delimiter mode
delimiterChar: ','          // Default
delimiterChar: ' | '        // Custom separator
delimiterChar: ';'

// customTemplate: string | Function - Template for Custom mode
customTemplate: '${value.length} selected'

// changeOnBlur: boolean - Fire change event on blur (false = on every selection)
changeOnBlur: true          // Default: only on blur
changeOnBlur: false         // Fire on every selection
```

**Filtering Properties**

```typescript
// allowFiltering: boolean - Enable search bar in popup
allowFiltering: true

// filterBarPlaceholder: string - Placeholder in filter bar
filterBarPlaceholder: 'Search items...'

// filterType: TreeFilterType - Filter matching strategy
filterType: 'StartsWith'    // Match beginning of text
filterType: 'EndsWith'      // Match end of text
filterType: 'Contains'      // Match anywhere in text

// ignoreCase: boolean - Case-insensitive search
ignoreCase: true            // 'ABC' matches 'abc'

// ignoreAccent: boolean - Ignore diacritical marks
ignoreAccent: true          // 'café' matches 'cafe'
ignoreAccent: false         // Exact accent matching
```

**Localization Properties**

```typescript
// locale: string - Language/culture code
locale: 'en'                // English
locale: 'es'                // Spanish
locale: 'fr'                // French
locale: 'de'                // German
locale: 'ar'                // Arabic (with RTL)

// enableRtl: boolean - Right-to-left text direction
enableRtl: true             // For Arabic, Hebrew, Urdu

// floatLabelType: FloatLabelType - Floating label behavior
floatLabelType: 'Never'     // Label never floats
floatLabelType: 'Always'    // Label always floats
floatLabelType: 'Auto'      // Float on focus/value
```

**State Management Properties**

```typescript
// enabled: boolean - Enable/disable component
enabled: true               // Component enabled
enabled: false              // Component disabled (grayed out)

// readonly: boolean - Read-only mode (popup still accessible)
readonly: false             // Normal mode
readonly: true              // Read-only, can't type

// enablePersistence: boolean - Save state to localStorage
enablePersistence: false    // Default: no persistence
enablePersistence: true     // Save value between page loads

// destroyPopupOnHide: boolean - Remove popup from DOM on hide
destroyPopupOnHide: true    // Default: remove on hide
destroyPopupOnHide: false   // Keep in DOM for performance

// enableHtmlSanitizer: boolean - Security: sanitize HTML in templates
enableHtmlSanitizer: true   // Default: sanitize (safe)
enableHtmlSanitizer: false  // Allow raw HTML (use with caution)

// sortOrder: SortOrder - Sort items
sortOrder: 'None'           // No sorting (default)
sortOrder: 'Ascending'      // A-Z
sortOrder: 'Descending'     // Z-A
```

**Template Properties**

```typescript
// itemTemplate: string | Function - Template for each tree item
itemTemplate: '<div>${name} (${code})</div>'

// valueTemplate: string | Function - Template for selected display
valueTemplate: '<div>${name} - ${dept}</div>'

// headerTemplate: string | Function - Template above items
headerTemplate: '<div class="header">Select an item</div>'

// footerTemplate: string | Function - Template below items
footerTemplate: '<div class="footer">Total: ${count}</div>'

// noRecordsTemplate: string | Function - Template when no data
noRecordsTemplate: '<div>No items found</div>'

// actionFailureTemplate: string | Function - Template on error
actionFailureTemplate: '<div>Failed to load data</div>'
```

**HTML Attributes**

```typescript
// htmlAttributes: Record<string, string> - Add HTML attributes
htmlAttributes: {
  'aria-label': 'Category selection',
  'aria-describedby': 'cat-help',
  'data-testid': 'category-dropdown'
}
```

## Best Practices

### 1. Correct Field Mapping

**✓ Good:** Clear, explicit field mapping matching your data structure
```typescript
fields: {
  dataSource: this.data,
  value: 'employeeId',      // Use descriptive names
  text: 'employeeName',
  parentValue: 'managerId',
  hasChildren: 'hasReports'
}
```

**✗ Bad:** Generic field names that don't match data
```typescript
fields: {
  dataSource: this.data,
  value: 'id',              // Generic, ambiguous
  text: 'text',             // Misleading
  parentValue: 'parent'
}
```

### 2. Performance Optimization

**For Large Datasets (1000+ items):**
```typescript
// Enable lazy loading with remote data
treeSettings: {
  loadOnDemand: true
},
fields: {
  dataSource: new DataManager({ url: 'api/nodes' }),
  hasChildren: 'hasChild',  // Critical for lazy load
  child: { /* child config */ }
}

// Use virtual scrolling in templates
popupHeight: '300px'  // Fixed height triggers scroll
```

### 3. Template Safety

**✓ Good:** Use Angular's interpolation safely
```typescript
itemTemplate = '<div>${sanitize(name)}</div>';
enableHtmlSanitizer: true  // Default security
```

**✗ Bad:** Raw HTML that could contain XSS
```typescript
itemTemplate = '<div>' + unsafeData + '</div>';
```

### 4. Selection Validation

**✓ Good:** Validate selection before submission
```typescript
onSubmit() {
  if (!this.dropdowntree.value || this.dropdowntree.value.length === 0) {
    this.showError('Please select at least one item');
    return;
  }
  this.processSelection();
}
```

### 5. Error Handling

**✓ Good:** Handle remote data failures
```typescript
(actionFailure)='handleDataError($event)'

handleDataError(event: any) {
  console.error('Data load failed:', event);
  this.showNotification('Unable to load data. Please try again.');
}
```

---

## Troubleshooting

### Data Not Displaying

**Problem:** Popup opens but no items visible

**Solutions:**
1. Verify field mappings - ensure `value`, `text`, and `dataSource` are correct
2. Check console for errors
3. Verify data structure matches field configuration
4. For hierarchical data, ensure `parentValue` or `child` is properly mapped

```typescript
// Debug: Log the fields configuration
console.log('Fields:', this.fields);
console.log('Data:', this.data);
```

### Checkboxes Not Working

**Problem:** Checkboxes don't appear or don't function

**Solutions:**
1. Ensure `showCheckBox: true` is set
2. For auto-check, set `treeSettings: { autoCheck: true }`
3. Verify data has proper hierarchy (parent-child relationship)
4. Check that `hasChildren` field is correctly mapped

### Remote Data Not Loading

**Problem:** DataManager fails to fetch data

**Solutions:**
1. Verify API endpoint URL is correct
2. Check CORS headers on server
3. Verify DataManager adaptor matches API type (ODataV4, RestAdapter, etc.)
4. Check network requests in browser DevTools
5. Implement `actionFailure` event handler for error logging

### Template Not Rendering

**Problem:** Custom template shows raw text instead of formatted content

**Solutions:**
1. Use correct interpolation syntax: `${propertyName}`
2. Ensure property names match data object
3. Use single quotes for strings: `'${name}'`
4. Test simple template first: `'<div>${name}</div>'`

---
