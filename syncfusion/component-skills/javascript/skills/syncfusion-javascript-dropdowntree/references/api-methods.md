# API Methods Reference

### Component Lifecycle Methods

#### appendTo(selector)
Appends the control to the specified HTML element.

**Parameters:**
- `selector` (string | HTMLElement, optional): Target element or selector

**Returns:** void

```typescript
let ddtree = new DropDownTree({
    fields: { dataSource: data, value: 'id', text: 'name', child: 'items' }
});

// Append to element with ID
ddtree.appendTo('#ddtElement');

// Or append to element object
let element = document.getElementById('ddtElement');
ddtree.appendTo(element);
```

#### dataBind()
Applies pending property changes immediately.

**Returns:** void

```typescript
let ddtree = new DropDownTree({
    fields: { dataSource: data, value: 'id', text: 'name', child: 'items' }
});
ddtree.appendTo('#ddtElement');

// Update properties
ddtree.fields = { dataSource: newData, value: 'id', text: 'name' };
ddtree.dataBind();  // Apply changes
```

#### refresh()
Re-renders the component with current properties.

**Returns:** void

```typescript
let ddtree = new DropDownTree({
    fields: { dataSource: data, value: 'id', text: 'name', child: 'items' }
});
ddtree.appendTo('#ddtElement');

// Modify data and refresh
ddtree.fields.dataSource = updatedData;
ddtree.refresh();
```

#### destroy()
Removes the component from DOM and cleans up resources.

**Returns:** void

```typescript
let ddtree = new DropDownTree({
    fields: { dataSource: data, value: 'id', text: 'name', child: 'items' }
});
ddtree.appendTo('#ddtElement');

// Later, destroy the component
ddtree.destroy();
```

### Data & Value Methods

#### getValue()
Gets the current selected value(s).

**Returns:** string[]

```typescript
let ddtree = new DropDownTree({
    fields: { dataSource: data, value: 'id', text: 'name', child: 'items' },
    value: ['1', '3']
});
ddtree.appendTo('#ddtElement');

let selectedValues = ddtree.value;  // ['1', '3']
```

#### setText()
Sets the display text programmatically.

**Returns:** void

```typescript
let ddtree = new DropDownTree({
    fields: { dataSource: data, value: 'id', text: 'name', child: 'items' }
});
ddtree.appendTo('#ddtElement');

ddtree.text = 'Selected Item';
```

#### clear()
Clears all selected values.

**Returns:** void

```typescript
let ddtree = new DropDownTree({
    fields: { dataSource: data, value: 'id', text: 'name', child: 'items' },
    showCheckBox: true
});
ddtree.appendTo('#ddtElement');

// Later, clear selection
ddtree.clear();  // All checkboxes unchecked, value set to null
```

#### getData(item)
Gets the updated data source or specific item data.

**Parameters:**
- `item` (string | Element, optional): Item value or element

**Returns:** { [key: string]: Object }[]

```typescript
let ddtree = new DropDownTree({
    fields: { dataSource: data, value: 'id', text: 'name', child: 'items' }
});
ddtree.appendTo('#ddtElement');

// Get all data
let allData = ddtree.getData();

// Get specific item data
let itemData = ddtree.getData('1');  // Get item with value '1'
```

#### selectAll(state)
Selects or deselects all items (when showCheckBox is true).

**Parameters:**
- `state` (boolean): true to select all, false to deselect all

**Returns:** void

```typescript
let ddtree = new DropDownTree({
    fields: { dataSource: data, value: 'id', text: 'name', child: 'items' },
    showCheckBox: true
});
ddtree.appendTo('#ddtElement');

// Select all items
ddtree.selectAll(true);

// Deselect all items
ddtree.selectAll(false);
```

### Popup Methods

#### showPopup()
Opens the dropdown popup.

**Returns:** void

```typescript
let ddtree = new DropDownTree({
    fields: { dataSource: data, value: 'id', text: 'name', child: 'items' }
});
ddtree.appendTo('#ddtElement');

// Open popup
ddtree.showPopup();
```

#### hidePopup()
Closes the dropdown popup.

**Returns:** void

```typescript
let ddtree = new DropDownTree({
    fields: { dataSource: data, value: 'id', text: 'name', child: 'items' }
});
ddtree.appendTo('#ddtElement');

// Close popup
ddtree.hidePopup();
```

#### ensureVisible(item)
Scrolls to ensure an item is visible in the list.

**Parameters:**
- `item` (string | Element): Item value or item element

**Returns:** void

```typescript
let ddtree = new DropDownTree({
    fields: { dataSource: data, value: 'id', text: 'name', child: 'items' }
});
ddtree.appendTo('#ddtElement');

// Ensure item with value '5' is visible
ddtree.ensureVisible('5');

// Or pass element
let element = document.querySelector('[data-value="5"]');
ddtree.ensureVisible(element);
```

### DOM Methods

#### getRootElement()
Returns the root element of the component.

**Returns:** HTMLElement

```typescript
let ddtree = new DropDownTree({
    fields: { dataSource: data, value: 'id', text: 'name', child: 'items' }
});
ddtree.appendTo('#ddtElement');

let rootElement = ddtree.getRootElement();
console.log(rootElement.classList);
```

### Event Management Methods

#### addEventListener(eventName, handler)
Adds an event listener.

**Parameters:**
- `eventName` (string): Name of the event
- `handler` (Function): Callback function

**Returns:** void

```typescript
let ddtree = new DropDownTree({
    fields: { dataSource: data, value: 'id', text: 'name', child: 'items' }
});
ddtree.appendTo('#ddtElement');

// Add event listener
ddtree.addEventListener('change', (args) => {
    console.log('Selected:', args.value);
});
```

#### removeEventListener(eventName, handler)
Removes an event listener.

**Parameters:**
- `eventName` (string): Name of the event
- `handler` (Function): Callback function to remove

**Returns:** void

```typescript
const changeHandler = (args) => {
    console.log('Changed:', args.value);
};

let ddtree = new DropDownTree({
    fields: { dataSource: data, value: 'id', text: 'name', child: 'items' }
});
ddtree.appendTo('#ddtElement');

ddtree.addEventListener('change', changeHandler);

// Later remove the listener
ddtree.removeEventListener('change', changeHandler);
```

### Module Injection

#### Inject(moduleList)
Dynamically injects required modules.

**Parameters:**
- `moduleList` (Function[]): List of modules to inject

**Returns:** void

```typescript
import { DropDownTree, Inject } from '@syncfusion/ej2-dropdowns';

let ddtree = new DropDownTree({
    fields: { dataSource: data, value: 'id', text: 'name', child: 'items' }
});

// Inject modules if needed
DropDownTree.Inject();
ddtree.appendTo('#ddtElement');
```
