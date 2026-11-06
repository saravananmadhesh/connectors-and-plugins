# API Events Reference

### Event Arguments Structure

Each event provides specific argument objects with relevant properties.

### Selection Events

#### select
Triggers when an item is selected (with mouse/keyboard).

**Event Arguments:** `DdtSelectEventArgs`

| Property | Type | Description |
|----------|------|-------------|
| `action` | string | "select" or "unselect" |
| `item` | HTMLLIElement | Selected DOM element |
| `itemData` | { [key: string]: Object } | Item data object |
| `isInteracted` | boolean | User interaction flag |

```typescript
let ddtree = new DropDownTree({
    fields: { dataSource: data, value: 'id', text: 'name', child: 'items' },
    select: (args: DdtSelectEventArgs) => {
        console.log('Selected:', args.itemData.name);
        console.log('Action:', args.action);  // 'select' or 'unselect'
        console.log('Item Element:', args.item);
        console.log('Is User Interaction:', args.isInteracted);
    }
});
ddtree.appendTo('#ddtElement');
```

#### change
Triggers when the value changes (on blur by default).

**Event Arguments:** `DdtChangeEventArgs`

| Property | Type | Description |
|----------|------|-------------|
| `value` | string[] | New selected values |
| `oldValue` | string[] | Previous selected values |
| `element` | HTMLElement | Root component element |
| `isInteracted` | boolean | User interaction flag |
| `e` | MouseEvent \| KeyboardEvent | Original event |

```typescript
let ddtree = new DropDownTree({
    fields: { dataSource: data, value: 'id', text: 'name', child: 'items' },
    change: (args: DdtChangeEventArgs) => {
        console.log('New Values:', args.value);
        console.log('Old Values:', args.oldValue);
        console.log('Changed by user:', args.isInteracted);
    }
});
ddtree.appendTo('#ddtElement');
```

### Data Events

#### dataBound
Triggers when data is successfully bound to the component.

**Event Arguments:** `DdtDataBoundEventArgs`

| Property | Type | Description |
|----------|------|-------------|
| `data` | { [key: string]: Object }[] | Loaded data array |

```typescript
let ddtree = new DropDownTree({
    fields: { 
        dataSource: new DataManager({ url: 'api/items' }),
        value: 'id',
        text: 'name'
    },
    dataBound: (args: DdtDataBoundEventArgs) => {
        console.log('Data loaded:', args.data.length, 'items');
    }
});
ddtree.appendTo('#ddtElement');
```

#### actionFailure
Triggers when remote data fetch fails.

**Event Arguments:** Object

```typescript
let ddtree = new DropDownTree({
    fields: { 
        dataSource: new DataManager({ url: 'api/items' }),
        value: 'id',
        text: 'name'
    },
    actionFailure: () => {
        console.log('Failed to load data');
    }
});
ddtree.appendTo('#ddtElement');
```

### Filtering Events

#### filtering
Triggers when text is typed in the filter bar.

**Event Arguments:** `DdtFilteringEventArgs`

| Property | Type | Description |
|----------|------|-------------|
| `text` | string | Filter text value |
| `cancel` | boolean | Cancel filtering |
| `preventDefaultAction` | boolean | Prevent internal filtering |
| `fields` | FieldsModel | Current fields configuration |
| `event` | Event | Input event object |

```typescript
let ddtree = new DropDownTree({
    fields: { dataSource: data, value: 'id', text: 'name', child: 'items' },
    allowFiltering: true,
    filtering: (args: DdtFilteringEventArgs) => {
        console.log('Filter text:', args.text);
        
        if (args.text.length < 2) {
            args.cancel = true;  // Cancel filtering
        }
    }
});
ddtree.appendTo('#ddtElement');
```

### Popup Events

#### beforeOpen
Triggers before popup opens.

**Event Arguments:** `DdtBeforeOpenEventArgs`

| Property | Type | Description |
|----------|------|-------------|
| `cancel` | boolean | Prevent popup opening |

```typescript
let ddtree = new DropDownTree({
    fields: { dataSource: data, value: 'id', text: 'name', child: 'items' },
    beforeOpen: (args: DdtBeforeOpenEventArgs) => {
        console.log('Popup about to open');
        // args.cancel = true;  // Prevent opening
    }
});
ddtree.appendTo('#ddtElement');
```

#### open
Triggers after popup opens (animation complete).

**Event Arguments:** `DdtPopupEventArgs`

| Property | Type | Description |
|----------|------|-------------|
| `popup` | Popup | Popup instance |
| `cancel` | boolean | Prevent popup action |

```typescript
let ddtree = new DropDownTree({
    fields: { dataSource: data, value: 'id', text: 'name', child: 'items' },
    open: (args: DdtPopupEventArgs) => {
        console.log('Popup opened');
        console.log('Popup element:', args.popup);
    }
});
ddtree.appendTo('#ddtElement');
```

#### close
Triggers after popup closes (animation complete).

**Event Arguments:** `DdtPopupEventArgs`

| Property | Type | Description |
|----------|------|-------------|
| `popup` | Popup | Popup instance |
| `cancel` | boolean | Prevent popup close |

```typescript
let ddtree = new DropDownTree({
    fields: { dataSource: data, value: 'id', text: 'name', child: 'items' },
    close: (args: DdtPopupEventArgs) => {
        console.log('Popup closed');
    }
});
ddtree.appendTo('#ddtElement');
```

### Focus Events

#### focus
Triggers when component receives focus.

**Event Arguments:** `DdtFocusEventArgs`

| Property | Type | Description |
|----------|------|-------------|
| `event` | MouseEvent \| FocusEvent \| TouchEvent \| KeyboardEvent | Original event |
| `isInteracted` | boolean | User interaction flag |

```typescript
let ddtree = new DropDownTree({
    fields: { dataSource: data, value: 'id', text: 'name', child: 'items' },
    focus: (args: DdtFocusEventArgs) => {
        console.log('Component focused');
        console.log('Was user interaction:', args.isInteracted);
    }
});
ddtree.appendTo('#ddtElement');
```

#### blur
Triggers when component loses focus.

**Event Arguments:** Object

```typescript
let ddtree = new DropDownTree({
    fields: { dataSource: data, value: 'id', text: 'name', child: 'items' },
    blur: () => {
        console.log('Component blur');
    }
});
ddtree.appendTo('#ddtElement');
```

### Keyboard Events

#### keyPress
Triggers on keyboard key press.

**Event Arguments:** `DdtKeyPressEventArgs`

| Property | Type | Description |
|----------|------|-------------|
| `event` | KeyboardEventArgs | Keyboard event details |
| `cancel` | boolean | Cancel key press action |

```typescript
let ddtree = new DropDownTree({
    fields: { dataSource: data, value: 'id', text: 'name', child: 'items' },
    keyPress: (args: DdtKeyPressEventArgs) => {
        console.log('Key pressed');
        
        if (args.event.key === 'Escape') {
            args.cancel = true;  // Cancel ESC key behavior
        }
    }
});
ddtree.appendTo('#ddtElement');
```

### Component Lifecycle Events

#### created
Triggers after component is successfully created.

**Event Arguments:** Object

```typescript
let ddtree = new DropDownTree({
    fields: { dataSource: data, value: 'id', text: 'name', child: 'items' },
    created: () => {
        console.log('DropDownTree component created');
    }
});
ddtree.appendTo('#ddtElement');
```

#### destroyed
Triggers after component is destroyed.

**Event Arguments:** Object

```typescript
let ddtree = new DropDownTree({
    fields: { dataSource: data, value: 'id', text: 'name', child: 'items' },
    destroyed: () => {
        console.log('DropDownTree component destroyed');
    }
});
ddtree.appendTo('#ddtElement');

// Later
ddtree.destroy();  // Triggers destroyed event
```
