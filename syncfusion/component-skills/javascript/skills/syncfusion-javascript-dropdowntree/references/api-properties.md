# API Properties Reference

### Essential Properties

#### dataSource (via fields)
**Type:** Array | DataManager

Specifies the data source for the Dropdown Tree.

```typescript
// Local data
let ddtree = new DropDownTree({
    fields: { dataSource: localArray, value: 'id', text: 'name', child: 'items' }
});

// Remote data
let ddtree = new DropDownTree({
    fields: { 
        dataSource: new DataManager({ url: 'api/data' }),
        value: 'id',
        text: 'name'
    }
});
```

#### fields
**Type:** FieldsModel

Configures data source field mapping.

```typescript
let ddtree = new DropDownTree({
    fields: {
        dataSource: data,
        value: 'id',
        text: 'name',
        child: 'children',
        expanded: 'isExpanded'
    }
});
ddtree.appendTo('#ddtElement');
```

#### value
**Type:** string[]

Gets or sets the selected item value(s).

```typescript
let ddtree = new DropDownTree({
    fields: { dataSource: data, value: 'id', text: 'name', child: 'items' }
});
ddtree.appendTo('#ddtElement');

// Get selected values
console.log(ddtree.value);  // ['1', '3']

// Set selected values
ddtree.value = ['2', '4'];
```

#### text
**Type:** string

Gets or sets the display text of the selected item.

```typescript
let ddtree = new DropDownTree({
    fields: { dataSource: data, value: 'id', text: 'name', child: 'items' }
});
ddtree.appendTo('#ddtElement');

// Get display text
console.log(ddtree.text);  // 'Selected Item Name'

// Set text (programmatically)
ddtree.text = 'New Text';
```

### Selection & Checkbox Properties

#### showCheckBox
**Type:** boolean  
**Default:** false

Enables checkboxes for multi-selection.

```typescript
let ddtree = new DropDownTree({
    fields: { dataSource: data, value: 'id', text: 'name', child: 'items' },
    showCheckBox: true  // Display checkboxes
});
ddtree.appendTo('#ddtElement');
```

#### allowMultiSelection
**Type:** boolean  
**Default:** false

Enables multi-selection using Ctrl+Click or Shift+Click.

```typescript
let ddtree = new DropDownTree({
    fields: { dataSource: data, value: 'id', text: 'name', child: 'items' },
    allowMultiSelection: true  // Allow Ctrl/Shift click
});
ddtree.appendTo('#ddtElement');
```

#### showSelectAll
**Type:** boolean  
**Default:** false

Shows Select All checkbox in header.

```typescript
let ddtree = new DropDownTree({
    fields: { dataSource: data, value: 'id', text: 'name', child: 'items' },
    showCheckBox: true,
    showSelectAll: true  // Display Select All option
});
ddtree.appendTo('#ddtElement');
```

#### selectAllText
**Type:** string  
**Default:** "Select All"

Text for the Select All checkbox.

```typescript
let ddtree = new DropDownTree({
    fields: { dataSource: data, value: 'id', text: 'name', child: 'items' },
    showCheckBox: true,
    showSelectAll: true,
    selectAllText: 'Check All Items'
});
ddtree.appendTo('#ddtElement');
```

#### unSelectAllText
**Type:** string  
**Default:** "Unselect All"

Text for the Unselect All checkbox.

```typescript
let ddtree = new DropDownTree({
    fields: { dataSource: data, value: 'id', text: 'name', child: 'items' },
    showCheckBox: true,
    showSelectAll: true,
    unSelectAllText: 'Uncheck All Items'
});
ddtree.appendTo('#ddtElement');
```

#### mode
**Type:** Mode  
**Default:** "Default"

Sets visibility mode for multi-selection display.

**Mode Values:**
- `Default`: Box mode on focus, Delimiter mode on blur
- `Box`: Display selected items as chips
- `Delimiter`: Display selected items as delimited text
- `Custom`: Use customTemplate

```typescript
// Box mode (chips)
let ddtree = new DropDownTree({
    fields: { dataSource: data, value: 'id', text: 'name', child: 'items' },
    mode: 'Box',
    allowMultiSelection: true
});
ddtree.appendTo('#ddtElement');

// Delimiter mode
let ddtree2 = new DropDownTree({
    fields: { dataSource: data, value: 'id', text: 'name', child: 'items' },
    mode: 'Delimiter',
    delimiterChar: ';',
    allowMultiSelection: true
});
ddtree2.appendTo('#ddtElement2');

// Custom mode
let ddtree3 = new DropDownTree({
    fields: { dataSource: data, value: 'id', text: 'name', child: 'items' },
    mode: 'Custom',
    customTemplate: '<span>${name} (${count} items)</span>',
    allowMultiSelection: true
});
ddtree3.appendTo('#ddtElement3');
```

#### delimiterChar
**Type:** string  
**Default:** ","

Separator character for delimiter mode.

```typescript
let ddtree = new DropDownTree({
    fields: { dataSource: data, value: 'id', text: 'name', child: 'items' },
    mode: 'Delimiter',
    delimiterChar: '; ',  // Use semicolon and space
    allowMultiSelection: true
});
ddtree.appendTo('#ddtElement');
```

#### customTemplate
**Type:** string | Function

Custom template for multi-selection display.

```typescript
let ddtree = new DropDownTree({
    fields: { dataSource: data, value: 'id', text: 'name', child: 'items' },
    mode: 'Custom',
    customTemplate: '<div class="custom-display">${text} - ${value}</div>',
    allowMultiSelection: true
});
ddtree.appendTo('#ddtElement');
```

### Template Properties

#### itemTemplate
**Type:** string | Function

Customizes individual list items.

```typescript
let ddtree = new DropDownTree({
    fields: { dataSource: data, value: 'id', text: 'name', child: 'items' },
    itemTemplate: '<div><strong>${name}</strong> <small>${department}</small></div>'
});
ddtree.appendTo('#ddtElement');
```

#### valueTemplate
**Type:** string | Function

Customizes selected value display.

```typescript
let ddtree = new DropDownTree({
    fields: { dataSource: data, value: 'id', text: 'name', child: 'items' },
    valueTemplate: '<span class="badge">${name}</span>'
});
ddtree.appendTo('#ddtElement');
```

#### headerTemplate
**Type:** string | Function

Customizes popup header.

```typescript
let ddtree = new DropDownTree({
    fields: { dataSource: data, value: 'id', text: 'name', child: 'items' },
    headerTemplate: '<div class="header-custom"><span>Select Items</span></div>'
});
ddtree.appendTo('#ddtElement');
```

#### footerTemplate
**Type:** string | Function

Customizes popup footer.

```typescript
let ddtree = new DropDownTree({
    fields: { dataSource: data, value: 'id', text: 'name', child: 'items' },
    footerTemplate: '<div class="footer-custom"><button>Apply</button></div>'
});
ddtree.appendTo('#ddtElement');
```

#### noRecordsTemplate
**Type:** string | Function

Displays when no data is available.

```typescript
let ddtree = new DropDownTree({
    fields: { dataSource: data, value: 'id', text: 'name', child: 'items' },
    noRecordsTemplate: '<div class="no-data">No items found</div>'
});
ddtree.appendTo('#ddtElement');
```

#### actionFailureTemplate
**Type:** string | Function

Displays when data fetch fails.

```typescript
let ddtree = new DropDownTree({
    fields: { dataSource: data, value: 'id', text: 'name', child: 'items' },
    actionFailureTemplate: '<div class="error">Failed to load data</div>'
});
ddtree.appendTo('#ddtElement');
```

### Popup & Display Properties

#### placeholder
**Type:** string

Hint text displayed in empty input.

```typescript
let ddtree = new DropDownTree({
    fields: { dataSource: data, value: 'id', text: 'name', child: 'items' },
    placeholder: 'Select an item...'
});
ddtree.appendTo('#ddtElement');
```

#### popupHeight
**Type:** string | number

Height of the popup list.

```typescript
let ddtree = new DropDownTree({
    fields: { dataSource: data, value: 'id', text: 'name', child: 'items' },
    popupHeight: '300px'  // or 300
});
ddtree.appendTo('#ddtElement');
```

#### popupWidth
**Type:** string | number

Width of the popup list.

```typescript
let ddtree = new DropDownTree({
    fields: { dataSource: data, value: 'id', text: 'name', child: 'items' },
    popupWidth: '400px'  // or 400
});
ddtree.appendTo('#ddtElement');
```

#### width
**Type:** string | number

Width of the Dropdown Tree component.

```typescript
let ddtree = new DropDownTree({
    fields: { dataSource: data, value: 'id', text: 'name', child: 'items' },
    width: '100%'  // or '500px' or 500
});
ddtree.appendTo('#ddtElement');
```

#### showDropDownIcon
**Type:** boolean  
**Default:** true

Shows/hides the dropdown arrow icon.

```typescript
let ddtree = new DropDownTree({
    fields: { dataSource: data, value: 'id', text: 'name', child: 'items' },
    showDropDownIcon: false  // Hide dropdown icon
});
ddtree.appendTo('#ddtElement');
```

#### showClearButton
**Type:** boolean  
**Default:** false

Shows/hides the clear button.

```typescript
let ddtree = new DropDownTree({
    fields: { dataSource: data, value: 'id', text: 'name', child: 'items' },
    showClearButton: true  // Show clear button
});
ddtree.appendTo('#ddtElement');
```

#### destroyPopupOnHide
**Type:** boolean  
**Default:** true

Whether to destroy popup when closed.

```typescript
let ddtree = new DropDownTree({
    fields: { dataSource: data, value: 'id', text: 'name', child: 'items' },
    destroyPopupOnHide: false  // Keep popup in DOM
});
ddtree.appendTo('#ddtElement');
```

### Filtering Properties

#### allowFiltering
**Type:** boolean  
**Default:** false

Enables search/filter functionality.

```typescript
let ddtree = new DropDownTree({
    fields: { dataSource: data, value: 'id', text: 'name', child: 'items' },
    allowFiltering: true  // Enable filter bar
});
ddtree.appendTo('#ddtElement');
```

#### filterBarPlaceholder
**Type:** string

Placeholder for the filter bar.

```typescript
let ddtree = new DropDownTree({
    fields: { dataSource: data, value: 'id', text: 'name', child: 'items' },
    allowFiltering: true,
    filterBarPlaceholder: 'Search items...'
});
ddtree.appendTo('#ddtElement');
```

#### filterType
**Type:** TreeFilterType

Filter matching type.

**TreeFilterType Values:**
- `StartsWith`: Matches from beginning
- `EndsWith`: Matches at end
- `Contains`: Matches anywhere

```typescript
let ddtree = new DropDownTree({
    fields: { dataSource: data, value: 'id', text: 'name', child: 'items' },
    allowFiltering: true,
    filterType: 'Contains'  // Match anywhere in text
});
ddtree.appendTo('#ddtElement');
```

#### ignoreCase
**Type:** boolean  
**Default:** true

Case-insensitive filtering.

```typescript
let ddtree = new DropDownTree({
    fields: { dataSource: data, value: 'id', text: 'name', child: 'items' },
    allowFiltering: true,
    ignoreCase: false  // Case-sensitive
});
ddtree.appendTo('#ddtElement');
```

#### ignoreAccent
**Type:** boolean  
**Default:** false

Ignore accent marks in filtering.

```typescript
let ddtree = new DropDownTree({
    fields: { dataSource: data, value: 'id', text: 'name', child: 'items' },
    allowFiltering: true,
    ignoreAccent: true  // Ignore é, ñ, etc.
});
ddtree.appendTo('#ddtElement');
```

### Sorting Properties

#### sortOrder
**Type:** SortOrder  
**Default:** "None"

Sort order for items.

**SortOrder Values:**
- `Ascending`: A to Z
- `Descending`: Z to A
- `None`: No sorting

```typescript
// Ascending sort
let ddtree = new DropDownTree({
    fields: { dataSource: data, value: 'id', text: 'name', child: 'items' },
    sortOrder: 'Ascending'
});
ddtree.appendTo('#ddtElement');

// Descending sort
let ddtree2 = new DropDownTree({
    fields: { dataSource: data, value: 'id', text: 'name', child: 'items' },
    sortOrder: 'Descending'
});
ddtree2.appendTo('#ddtElement2');
```

### Styling & Layout Properties

#### cssClass
**Type:** string

CSS classes for custom styling.

```typescript
let ddtree = new DropDownTree({
    fields: { dataSource: data, value: 'id', text: 'name', child: 'items' },
    cssClass: 'custom-dropdown-tree custom-style'
});
ddtree.appendTo('#ddtElement');
```

#### floatLabelType
**Type:** FloatLabelType

Floating label behavior.

**FloatLabelType Values:**
- `Never`: Label doesn't float
- `Always`: Label always floats
- `Auto`: Float on focus/input

```typescript
let ddtree = new DropDownTree({
    fields: { dataSource: data, value: 'id', text: 'name', child: 'items' },
    floatLabelType: 'Auto'
});
ddtree.appendTo('#ddtElement');
```

#### wrapText
**Type:** boolean  
**Default:** false

Wrap selected items into multiple lines.

```typescript
let ddtree = new DropDownTree({
    fields: { dataSource: data, value: 'id', text: 'name', child: 'items' },
    allowMultiSelection: true,
    wrapText: true  // Wrap to multiple lines
});
ddtree.appendTo('#ddtElement');
```

#### zIndex
**Type:** number

Z-index of the popup.

```typescript
let ddtree = new DropDownTree({
    fields: { dataSource: data, value: 'id', text: 'name', child: 'items' },
    zIndex: 1100
});
ddtree.appendTo('#ddtElement');
```

### State & Behavior Properties

#### enabled
**Type:** boolean  
**Default:** true

Enable/disable the component.

```typescript
let ddtree = new DropDownTree({
    fields: { dataSource: data, value: 'id', text: 'name', child: 'items' },
    enabled: true
});
ddtree.appendTo('#ddtElement');

// Disable later
ddtree.enabled = false;
```

#### readonly
**Type:** boolean  
**Default:** false

Make the input read-only.

```typescript
let ddtree = new DropDownTree({
    fields: { dataSource: data, value: 'id', text: 'name', child: 'items' },
    readonly: true  // User cannot type
});
ddtree.appendTo('#ddtElement');
```

#### changeOnBlur
**Type:** boolean  
**Default:** true

Fire change event on blur or immediately on selection.

```typescript
let ddtree = new DropDownTree({
    fields: { dataSource: data, value: 'id', text: 'name', child: 'items' },
    changeOnBlur: false  // Fire change immediately
});
ddtree.appendTo('#ddtElement');
```

... (truncated for brevity in file)