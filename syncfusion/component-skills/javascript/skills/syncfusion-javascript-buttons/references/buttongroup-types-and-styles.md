# ButtonGroup - Types and Styles (TypeScript)

## Table of Contents
- [Basic ButtonGroup](#basic-buttongroup)
- [Color Styles](#color-styles)
- [Orientation](#orientation)
- [Selection Modes](#selection-modes)
- [Button Types](#button-types)

## Basic ButtonGroup

Create a basic horizontal button group:

```typescript
import { createButtonGroup } from '@syncfusion/ej2-buttons';

const groupDiv = document.getElementById('buttonGroup')!;
groupDiv.innerHTML = `
  <button class="e-btn">Option 1</button>
  <button class="e-btn">Option 2</button>
  <button class="e-btn">Option 3</button>
`;

createButtonGroup(groupDiv);
```

**HTML:**
```html
<div id="buttonGroup">
  <button class="e-btn">Option 1</button>
  <button class="e-btn">Option 2</button>
  <button class="e-btn">Option 3</button>
</div>
```

## Color Styles

Apply color classes to button group:

```typescript
import { createButtonGroup } from '@syncfusion/ej2-buttons';

// Primary color group
const primaryGroup = document.getElementById('primaryGroup')!;
primaryGroup.innerHTML = `
  <button class="e-btn">Left</button>
  <button class="e-btn">Center</button>
  <button class="e-btn">Right</button>
`;
primaryGroup.classList.add('e-primary');
createButtonGroup(primaryGroup);

// Success color group
const successGroup = document.getElementById('successGroup')!;
successGroup.innerHTML = `
  <button class="e-btn">Save</button>
  <button class="e-btn">Update</button>
  <button class="e-btn">Delete</button>
`;
successGroup.classList.add('e-success');
createButtonGroup(successGroup);

// Warning color group
const warningGroup = document.getElementById('warningGroup')!;
warningGroup.innerHTML = `
  <button class="e-btn">Yes</button>
  <button class="e-btn">No</button>
  <button class="e-btn">Cancel</button>
`;
warningGroup.classList.add('e-warning');
createButtonGroup(warningGroup);
```

**Available Color Classes:**
- `e-primary` - Primary brand color
- `e-success` - Success/positive (green)
- `e-info` - Info/informational (blue)
- `e-warning` - Warning/caution (orange)
- `e-danger` - Danger/destructive (red)

## Orientation

### Horizontal (Default)
```typescript
import { createButtonGroup } from '@syncfusion/ej2-buttons';

const groupDiv = document.getElementById('horizontalGroup')!;
groupDiv.innerHTML = `
  <button class="e-btn">Left</button>
  <button class="e-btn">Center</button>
  <button class="e-btn">Right</button>
`;

// Default is horizontal
createButtonGroup(groupDiv);
```

### Vertical
```typescript
import { createButtonGroup } from '@syncfusion/ej2-buttons';

const groupDiv = document.getElementById('verticalGroup')!;
groupDiv.innerHTML = `
  <button class="e-btn">Top</button>
  <button class="e-btn">Middle</button>
  <button class="e-btn">Bottom</button>
`;

// Add e-vertical class for vertical layout
groupDiv.classList.add('e-vertical');
createButtonGroup(groupDiv);
```

**HTML:**
```html
<!-- Vertical ButtonGroup -->
<div id="verticalGroup" class="e-vertical">
  <button class="e-btn">Top</button>
  <button class="e-btn">Middle</button>
  <button class="e-btn">Bottom</button>
</div>
```

## Selection Modes

### No Selection (View Only)
```typescript
import { createButtonGroup } from '@syncfusion/ej2-buttons';

const groupDiv = document.getElementById('viewGroup')!;
groupDiv.innerHTML = `
  <button class="e-btn">Read</button>
  <button class="e-btn">Help</button>
  <button class="e-btn">About</button>
`;

createButtonGroup(groupDiv);
```

### Single Selection (Radio)
```typescript
import { createButtonGroup } from '@syncfusion/ej2-buttons';

const groupDiv = document.getElementById('singleGroup')!;
groupDiv.innerHTML = `
  <input type="radio" name="view" id="grid" />
  <label for="grid" class="e-btn">Grid</label>
  <input type="radio" name="view" id="list" />
  <label for="list" class="e-btn">List</label>
  <input type="radio" name="view" id="card" />
  <label for="card" class="e-btn">Card</label>
`;

createButtonGroup(groupDiv);

// Handle selection
groupDiv.addEventListener('change', (event: Event): void => {
  const target = event.target as HTMLInputElement;
  console.log('Selected view:', target.id);
});
```

### Multiple Selection (Checkbox)
```typescript
import { createButtonGroup } from '@syncfusion/ej2-buttons';

const groupDiv = document.getElementById('multiGroup')!;
groupDiv.innerHTML = `
  <input type="checkbox" id="bold" />
  <label for="bold" class="e-btn">Bold</label>
  <input type="checkbox" id="italic" />
  <label for="italic" class="e-btn">Italic</label>
  <input type="checkbox" id="underline" />
  <label for="underline" class="e-btn">Underline</label>
`;

createButtonGroup(groupDiv);

// Handle selection
groupDiv.addEventListener('change', (event: Event): void => {
  const target = event.target as HTMLInputElement;
  console.log(`${target.id} ${target.checked ? 'enabled' : 'disabled'}`);
});
```

## Button Types

### Flat Buttons
```typescript
import { createButtonGroup } from '@syncfusion/ej2-buttons';

const groupDiv = document.getElementById('flatGroup')!;
groupDiv.innerHTML = `
  <button class="e-btn e-flat">Option 1</button>
  <button class="e-btn e-flat">Option 2</button>
  <button class="e-btn e-flat">Option 3</button>
`;

groupDiv.classList.add('e-primary');
createButtonGroup(groupDiv);
```

### Outline Buttons
```typescript
import { createButtonGroup } from '@syncfusion/ej2-buttons';

const groupDiv = document.getElementById('outlineGroup')!;
groupDiv.innerHTML = `
  <button class="e-btn e-outline">Option 1</button>
  <button class="e-btn e-outline">Option 2</button>
  <button class="e-btn e-outline">Option 3</button>
`;

groupDiv.classList.add('e-primary');
createButtonGroup(groupDiv);
```

### Icon Buttons
```typescript
import { createButtonGroup } from '@syncfusion/ej2-buttons';

const groupDiv = document.getElementById('iconGroup')!;
groupDiv.innerHTML = `
  <button class="e-btn">
    <span class="e-icons e-align-left"></span>
  </button>
  <button class="e-btn">
    <span class="e-icons e-align-center"></span>
  </button>
  <button class="e-btn">
    <span class="e-icons e-align-right"></span>
  </button>
`;

groupDiv.classList.add('e-primary');
createButtonGroup(groupDiv);
```

## Complex Example

Combine styles and selection modes:

```typescript
import { createButtonGroup } from '@syncfusion/ej2-buttons';

// Text alignment toolbar
const alignGroup = document.getElementById('alignGroup')!;
alignGroup.innerHTML = `
  <input type="radio" name="align" id="left" />
  <label for="left" class="e-btn">
    <span class="e-icons e-align-left"></span>
  </label>
  <input type="radio" name="align" id="center" />
  <label for="center" class="e-btn">
    <span class="e-icons e-align-center"></span>
  </label>
  <input type="radio" name="align" id="right" />
  <label for="right" class="e-btn">
    <span class="e-icons e-align-right"></span>
  </label>
`;

alignGroup.classList.add('e-primary');
createButtonGroup(alignGroup);

// Format toolbar
const formatGroup = document.getElementById('formatGroup')!;
formatGroup.innerHTML = `
  <input type="checkbox" id="bold" />
  <label for="bold" class="e-btn">
    <span class="e-icons e-bold"></span>
  </label>
  <input type="checkbox" id="italic" />
  <label for="italic" class="e-btn">
    <span class="e-icons e-italic"></span>
  </label>
  <input type="checkbox" id="underline" />
  <label for="underline" class="e-btn">
    <span class="e-icons e-underline"></span>
  </label>
`;

formatGroup.classList.add('e-primary');
createButtonGroup(formatGroup);
```

## CSS Classes Reference

| Class | Purpose |
|-------|---------|
| `e-btn-group` | Applied automatically to container |
| `e-primary` | Primary color |
| `e-success` | Success color |
| `e-info` | Info color |
| `e-warning` | Warning color |
| `e-danger` | Danger color |
| `e-vertical` | Vertical layout |
| `e-flat` | Flat button style |
| `e-outline` | Outline button style |
| `e-small` | Small size |
| `e-large` | Large size |
| `e-active` | Active/selected state |
