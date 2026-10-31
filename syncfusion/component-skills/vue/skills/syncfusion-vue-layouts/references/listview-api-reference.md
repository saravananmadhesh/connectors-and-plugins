# ListView API Reference (Vue 3)

## Table of Contents
- [Properties](#properties)
- [Methods](#methods)
- [Events](#events)
- [Field Settings](#field-settings)
- [Type Specifications](#type-specifications)

## Properties

### Data Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `dataSource` | `Array \| DataManager` | `[]` | Data source for the list |
| `fields` | `FieldSettingsModel` | `{ text: 'text', id: 'id' }` | Maps data fields to list properties |
| `headerTitle` | `string` | `null` | Title for the list header |

### Appearance Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `cssClass` | `string` | `''` | Custom CSS class for the list |
| `enableRtl` | `boolean` | `false` | Right-to-left layout |
| `width` | `number \| string` | `''` | List width |
| `height` | `number \| string` | `''` | List height |

### Behavior Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `showCheckBox` | `boolean` | `false` | Show checkboxes for items |
| `checkBoxPosition` | `'Left' \| 'Right'` | `'Left'` | Checkbox position |
| `showIcon` | `boolean` | `false` | Show item icons |
| `showImage` | `boolean` | `false` | Show item images |
| `sortOrder` | `'None' \| 'Ascending' \| 'Descending'` | `'None'` | Sort order |
| `enableVirtualization` | `boolean` | `false` | Enable virtual scrolling |
| `enableHtmlSanitizer` | `boolean` | `true` | Sanitize HTML in templates |

### Template Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `template` | `string \| function` | `null` | Custom item template |
| `headerTemplate` | `string \| function` | `null` | Custom header template |
| `groupTemplate` | `string \| function` | `null` | Custom group template |
| `showHeader` | `boolean` | `false` | Show list header |

### Accessibility Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `ariaAttributes` | `object` | `null` | Custom ARIA attributes |
| `htmlAttributes` | `object` | `null` | Custom HTML attributes |

## Methods

### Data Methods

| Method | Parameters | Returns | Description |
|--------|-----------|---------|-------------|
| `addItem(items, fields?)` | `Array, FieldSettingsModel?` | `void` | Add items to the list |
| `removeItem(item)` | `object` | `void` | Remove a specific item |
| `removeMultipleItems(items)` | `Array` | `void` | Remove multiple items |
| `selectItem(item)` | `object` | `void` | Programmatically select an item |
| `selectMultipleItems(items)` | `Array` | `void` | Select multiple items |

### UI Methods

| Method | Parameters | Returns | Description |
|--------|-----------|---------|-------------|
| `refreshItemHeight()` | - | `void` | Recalculate item heights (for virtualization) |
| `showItem(item)` | `object` | `void` | Scroll to specific item |
| `getSelectedItems()` | - | `Array` | Get currently selected items |

### Data Binding Methods

| Method | Parameters | Returns | Description |
|--------|-----------|---------|-------------|
| `getData()` | - | `Array` | Get current data source |

## Events

### Selection Events

| Event | Args | Description |
|-------|------|-------------|
| `select` | `SelectEventArgs` | Item selected (programmatic or user) |
| `actionBegin` | `ActionEventArgs` | Action started (selection, etc.) |
| `actionComplete` | `ActionEventArgs` | Action completed |
| `actionFailure` | `ActionEventArgs` | Action failed |

### Scroll Events

| Event | Args | Description |
|-------|------|-------------|
| `scroll` | `ScrollEventArgs` | List scrolled |

### Data Events

| Event | Args | Description |
|-------|------|-------------|
| `change` | `ChangeEventArgs` | Data source changed |

### Event Argument Types

```typescript
interface SelectEventArgs {
  item: object | object[];   // Selected item(s)
  text: string;              // Selected text
  index: number;             // Item index
  event: Event;              // Original event
  isInteracted: boolean;     // User interaction vs programmatic
  cancel: boolean;           // Set to true to cancel
}

interface ActionEventArgs {
  action: string;            // Action name
  items: object[];           // Affected items
  cancel: boolean;
}

interface ScrollEventArgs {
  scrollDirection: 'Up' | 'Down' | 'Left' | 'Right';
  scrollTop: number;
  scrollLeft: number;
}
```

## Field Settings

### FieldSettingsModel Interface

```typescript
interface FieldSettingsModel {
  id?: string;          // Field name for unique identifier
  text?: string;        // Field name for display text
  iconCss?: string;     // Field name for icon class
  image?: string;       // Field name for image URL
  groupBy?: string;     // Field name for grouping
  child?: string;       // Field name for nested children
  tooltip?: string;     // Field name for tooltip text
  enabled?: string;     // Field name for enabled state
  isChecked?: string;   // Field name for checkbox state
  sortBy?: string;      // Field name for custom sorting
  htmlAttributes?: string;  // Field name for HTML attributes
}
```

### Default Field Mappings

```javascript
const defaultFields = {
  id: 'id',
  text: 'text',
  iconCss: 'iconCss',
  image: 'imageUrl',
  groupBy: null,
  child: 'child',
  tooltip: 'tooltip',
  enabled: 'enabled',
  isChecked: 'isChecked'
};
```

## Type Specifications

### TypeScript Interfaces

```typescript
import { ListViewComponent } from '@syncfusion/ej2-vue-lists';

interface ListViewItem {
  id: string | number;
  text: string;
  iconCss?: string;
  imageUrl?: string;
  isChecked?: boolean;
  enabled?: boolean;
  tooltip?: string;
  child?: ListViewItem[];
  [key: string]: any;  // Custom fields
}

interface FieldSettingsModel {
  id?: string;
  text?: string;
  iconCss?: string;
  image?: string;
  groupBy?: string;
  child?: string;
  tooltip?: string;
  enabled?: string;
  isChecked?: string;
  sortBy?: string;
}

// Component instance type
const listViewRef = ref<InstanceType<typeof ListViewComponent> | null>(null);
```

### Common Imports

```javascript
import { ListViewComponent } from '@syncfusion/ej2-vue-lists';
import { DataManager, ODataAdaptor, Query, Predicate } from '@syncfusion/ej2-data';
```

## Complete Usage Example

```vue
<template>
  <ListViewComponent
    ref="listViewRef"
    id="full-example"
    :dataSource="data"
    :fields="fields"
    :showCheckBox="true"
    :showIcon="true"
    :showImage="true"
    :sortOrder="'Ascending'"
    :enableVirtualization="false"
    :enableRtl="false"
    :cssClass="'custom-list'"
    :headerTemplate="headerTpl"
    :template="itemTpl"
    :groupTemplate="groupTpl"
    width="100%"
    height="500px"
    @select="onSelect"
    @actionBegin="onActionBegin"
    @actionComplete="onActionComplete"
    @change="onChange"
  />
</template>

<script setup>
import { ref } from 'vue';
import { ListViewComponent } from '@syncfusion/ej2-vue-lists';

const listViewRef = ref(null);

const data = ref([
  { id: 1, name: 'Apple', category: 'Fruit', iconCss: 'e-icons e-apple', image: 'apple.jpg' }
]);

const fields = {
  id: 'id',
  text: 'name',
  iconCss: 'iconCss',
  image: 'image',
  groupBy: 'category'
};

const headerTpl = '<div class="list-header">My Items</div>';

const itemTpl = (data) => {
  return `<div class="item">
    <span class="${data.iconCss}"></span>
    <span>${data.name}</span>
  </div>`;
};

const groupTpl = (data) => {
  return `<div class="group-header">${data.category}</div>`;
};

const onSelect = (args) => console.log('Selected:', args);
const onActionBegin = (args) => console.log('Action begin:', args);
const onActionComplete = (args) => console.log('Action complete:', args);
const onChange = (args) => console.log('Changed:', args);
</script>
```

## Best Practices

1. **Always provide field mappings**: For non-default data structures

2. **Use TypeScript**: For type safety with the component instance

3. **Handle errors**: Catch API failures in remote data scenarios

4. **Validate events**: Check `isInteracted` to distinguish user vs programmatic actions

5. **Optimize templates**: Avoid expensive operations in template functions

6. **Use refs sparingly**: Only when imperative access is needed

7. **Test edge cases**: Empty data, single item, very large datasets

**Next:** Learn about [accessibility and events](listview-accessibility-events.md) for full a11y support.
