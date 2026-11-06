# Item Configuration in Syncfusion TypeScript Toolbar

## Table of Contents
- [Button Items](#button-items)
- [Separator Items](#separator-items)
- [Input Items](#input-items)
- [Item Alignment](#item-alignment)
- [Tab Key Navigation](#tab-key-navigation)
- [Complete Configuration Example](#complete-configuration-example)

## Button Items

**Button** is the default item type for toolbar items. Button items display text and/or icons.

### Button Properties

| Property | Type | Description |
|----------|------|-------------|
| `text` | string | Text displayed on the button |
| `id` | string | Unique identifier for the button (auto-generated if not provided) |
| `prefixIcon` | string | Icon class positioned before text |
| `suffixIcon` | string | Icon class positioned after text (ignored if prefixIcon exists) |
| `width` | string/number | Width of the button (e.g., "100px", "auto") |
| `align` | 'Left' \| 'Center' \| 'Right' | Alignment position in toolbar |
| `tooltipText` | string | Hint text shown on hover |
| `disabled` | boolean | Enable/disable the button |
| `tabIndex` | number | Tab navigation order |
| `click` | Function | Click event handler |

### Basic Button Example

```typescript
let toolbar: Toolbar = new Toolbar({
    items: [
        { text: 'Cut' },
        { text: 'Copy' },
        { text: 'Paste' }
    ]
});
toolbar.appendTo('#element');
```

### Button with Icons

```typescript
let toolbar: Toolbar = new Toolbar({
    items: [
        { prefixIcon: 'e-cut-icon tb-icons', text: 'Cut' },
        { prefixIcon: 'e-copy-icon tb-icons', text: 'Copy' },
        { prefixIcon: 'e-paste-icon tb-icons', text: 'Paste' },
        { prefixIcon: 'e-bold-icon tb-icons', text: 'Bold' },
        { suffixIcon: 'e-icons e-arrow-down', text: 'More' }
    ]
});
toolbar.appendTo('#element');
```

### Button with ID and Width

```typescript
let toolbar: Toolbar = new Toolbar({
    items: [
        { id: 'cut-btn', text: 'Cut', width: '80px' },
        { id: 'copy-btn', text: 'Copy', width: '80px' },
        { id: 'paste-btn', text: 'Paste', width: '80px' }
    ]
});
toolbar.appendTo('#element');

// Access items by ID
let cutButton = toolbar.items.find(item => item.id === 'cut-btn');
```

### Button with Click Handler

```typescript
function handleCut() {
    console.log('Cut action triggered');
}

let toolbar: Toolbar = new Toolbar({
    items: [
        { text: 'Cut', click: handleCut }
    ]
});
toolbar.appendTo('#element');
```

## Separator Items

The **Separator** type adds a vertical dividing line between groups of toolbar items for visual organization.

### Separator Properties

| Property | Type | Description |
|----------|------|-------------|
| `type` | 'Separator' | Item type identifier |

### Separator Example

```typescript
let toolbar: Toolbar = new Toolbar({
    items: [
        { text: 'Cut' },
        { text: 'Copy' },
        { type: 'Separator' },    // Visual separator
        { text: 'Paste' },
        { type: 'Separator' },
        { text: 'Undo' },
        { text: 'Redo' }
    ]
});
toolbar.appendTo('#element');
```

**Important:** Separators at the first or last position will not be visible.

**Anti-pattern (will not display):**
```typescript
let toolbar: Toolbar = new Toolbar({
    items: [
        { type: 'Separator' },   // ❌ First item - invisible
        { text: 'Cut' },
        { text: 'Copy' },
        { type: 'Separator' }    // ❌ Last item - invisible
    ]
});
```

## Input Items

**Input** items embed Syncfusion input components (NumericTextBox, DropDownList, CheckBox, RadioButton, etc.) directly into the toolbar.

### Input Item Properties

| Property | Type | Description |
|----------|------|-------------|
| `type` | 'Input' | Must be 'Input' for input components |
| `template` | ComponentInstance | Syncfusion component instance |

### NumericTextBox Example

```typescript
import { Toolbar } from '@syncfusion/ej2-navigations';
import { NumericTextBox } from '@syncfusion/ej2-inputs';

let toolbar: Toolbar = new Toolbar({
    items: [
        { text: 'Cut' },
        { text: 'Copy' },
        { type: 'Separator' },
        { 
            type: 'Input',
            template: new NumericTextBox({ 
                format: 'c2',         // Currency format
                value: 1,
                width: 150 
            })
        }
    ]
});
toolbar.appendTo('#element');
```

### DropDownList Example

```typescript
import { Toolbar } from '@syncfusion/ej2-navigations';
import { DropDownList } from '@syncfusion/ej2-dropdowns';

let sports: string[] = ['Badminton', 'Cricket', 'Football', 'Golf', 'Tennis'];

let toolbar: Toolbar = new Toolbar({
    items: [
        { text: 'Cut' },
        { type: 'Separator' },
        {
            type: 'Input',
            template: new DropDownList({
                dataSource: sports,
                width: 120,
                index: 0,  // Default selection
                placeholder: 'Select Sport'
            })
        }
    ]
});
toolbar.appendTo('#element');
```

### CheckBox Example

```typescript
import { Toolbar } from '@syncfusion/ej2-navigations';
import { CheckBox } from '@syncfusion/ej2-buttons';

let toolbar: Toolbar = new Toolbar({
    items: [
        { text: 'Bold' },
        { text: 'Italic' },
        { type: 'Separator' },
        {
            type: 'Input',
            template: new CheckBox({
                label: 'Enable Features',
                checked: true
            })
        }
    ]
});
toolbar.appendTo('#element');
```

### RadioButton Example

```typescript
import { Toolbar } from '@syncfusion/ej2-navigations';
import { RadioButton } from '@syncfusion/ej2-buttons';

let toolbar: Toolbar = new Toolbar({
    items: [
        {
            type: 'Input',
            template: new RadioButton({
                label: 'Option 1',
                name: 'choice',
                checked: true
            })
        },
        { type: 'Separator' },
        {
            type: 'Input',
            template: new RadioButton({
                label: 'Option 2',
                name: 'choice'
            })
        }
    ]
});
toolbar.appendTo('#element');
```

### Mixed Components Example

```typescript
import { Toolbar } from '@syncfusion/ej2-navigations';
import { NumericTextBox } from '@syncfusion/ej2-inputs';
import { DropDownList } from '@syncfusion/ej2-dropdowns';
import { CheckBox, RadioButton } from '@syncfusion/ej2-buttons';

let sportsData: string[] = ['Badminton', 'Cricket', 'Football', 'Golf', 'Tennis'];

let toolbar: Toolbar = new Toolbar({
    items: [
        { text: 'Cut' },
        { text: 'Copy' },
        { type: 'Separator' },
        { text: 'Undo' },
        { text: 'Redo' },
        { type: 'Separator' },
        {
            type: 'Input',
            template: new NumericTextBox({
                format: 'c2',
                value: 1,
                width: 150
            })
        },
        { type: 'Separator' },
        {
            type: 'Input',
            template: new DropDownList({
                dataSource: sportsData,
                width: 120,
                index: 2
            })
        },
        { type: 'Separator' },
        {
            type: 'Input',
            template: new CheckBox({
                label: 'Checkbox',
                checked: true
            })
        },
        { type: 'Separator' },
        {
            type: 'Input',
            template: new RadioButton({
                label: 'Radio',
                name: 'default',
                checked: true
            })
        }
    ]
});
toolbar.appendTo('#element');
```

## Item Alignment

Use the `align` property to position items on the toolbar (left, center, or right).

### Alignment Properties

| Value | Description |
|-------|-------------|
| `'Left'` (default) | Item positioned on the left side |
| `'Center'` | Item positioned in the center |
| `'Right'` | Item positioned on the right side |

### Alignment Example

```typescript
let toolbar: Toolbar = new Toolbar({
    items: [
        { text: 'Cut' },
        { text: 'Copy' },
        { text: 'Paste' },
        { type: 'Separator', align: 'Right' },  // Push following items to right
        { text: 'Save', align: 'Right' },
        { text: 'Help', align: 'Right' }
    ]
});
toolbar.appendTo('#element');
```

**Result:** Cut, Copy, Paste on the left | Save, Help on the right

### Center Alignment

```typescript
let toolbar: Toolbar = new Toolbar({
    items: [
        { text: 'Edit' },
        { text: 'View', align: 'Center' },
        { text: 'Help', align: 'Right' }
    ]
});
toolbar.appendTo('#element');
```

## Tab Key Navigation

The `tabIndex` property enables Tab/Shift+Tab keyboard navigation between toolbar items.

### TabIndex Properties

| Value | Behavior |
|-------|----------|
| Positive number | Item included in tab order |
| 0 | Item included, order based on DOM position |
| Negative or not set | Item skipped in tab navigation |

### Tab Navigation Example

```typescript
import {Toolbar} from '@syncfusion/ej2-navigations';

let toolbar: Toolbar = new Toolbar({
    items: [
        { text: 'Item 1', tabIndex: 1 },      // First in tab order
        { text: 'Item 2', tabIndex: 2 },      // Second in tab order
        { text: 'Item 3', tabIndex: 3 }       // Third in tab order
    ]
});
toolbar.appendTo('#element');
```

### DOM-Based Tab Navigation

```typescript
let toolbar: Toolbar = new Toolbar({
    items: [
        { text: 'Item 1', tabIndex: 0 },      // Tab order based on DOM
        { text: 'Item 2', tabIndex: 0 },
        { text: 'Item 3', tabIndex: 0 }
    ]
});
toolbar.appendTo('#element');
```

## Complete Configuration Example

```typescript
import { Toolbar } from '@syncfusion/ej2-navigations';
import { NumericTextBox } from '@syncfusion/ej2-inputs';
import { DropDownList } from '@syncfusion/ej2-dropdowns';

let sampleData: string[] = ['Option1', 'Option2', 'Option3'];

let toolbar: Toolbar = new Toolbar({
    width: 600,
    items: [
        // Left-aligned items
        { text: 'Cut', prefixIcon: 'e-cut-icon tb-icons', id: 'cut', tooltipText: 'Cut', tabIndex: 1 },
        { text: 'Copy', prefixIcon: 'e-copy-icon tb-icons', id: 'copy', tooltipText: 'Copy', tabIndex: 2 },
        { text: 'Paste', prefixIcon: 'e-paste-icon tb-icons', id: 'paste', disabled: false, tooltipText: 'Paste', tabIndex: 3 },
        { type: 'Separator' },
        
        // Design controls
        { text: 'Bold', prefixIcon: 'e-bold-icon tb-icons', tabIndex: 4 },
        { text: 'Italic', prefixIcon: 'e-italic-icon tb-icons', tabIndex: 5 },
        { text: 'Underline', prefixIcon: 'e-underline-icon tb-icons', tabIndex: 6 },
        { type: 'Separator' },
        
        // Input component
        {
            type: 'Input',
            template: new DropDownList({
                dataSource: sampleData,
                width: 100
            })
        },
        { type: 'Separator' },
        
        // Right-aligned items
        { text: 'Save', align: 'Right', tooltipText: 'Save Changes', tabIndex: 7 },
        { text: 'Help', align: 'Right', tooltipText: 'Get Help', tabIndex: 8 }
    ]
});

toolbar.appendTo('#element');
```

---

**Key Takeaways:**
- Use `text` for button labels and `prefixIcon`/`suffixIcon` for icons
- Separate item groups visually with `Separator` type (not at start/end)
- Embed Syncfusion components using `Input` type with `template` property
- Control layout with `align` property ('Left', 'Center', 'Right')
- Enable keyboard navigation with `tabIndex` property
