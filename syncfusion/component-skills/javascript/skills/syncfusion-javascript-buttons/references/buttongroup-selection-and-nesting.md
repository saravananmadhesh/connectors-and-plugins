# ButtonGroup - Selection and Nesting (TypeScript)

## Table of Contents
- [Single Selection Mode](#single-selection-mode)
- [Multiple Selection Mode](#multiple-selection-mode)
- [Setting Initial Selection](#setting-initial-selection)
- [Programmatic Selection](#programmatic-selection)
- [Nesting with DropDownButton](#nesting-with-dropdownbutton)
- [Nesting with SplitButton](#nesting-with-splitbutton)

## Single Selection Mode

Single selection (radio-button behavior) - only one button can be selected:

```typescript
import { createButtonGroup } from '@syncfusion/ej2-buttons';

const singleGroup = document.getElementById('singleGroup')!;
singleGroup.innerHTML = `
  <input type="radio" name="view" id="grid" value="grid" />
  <label for="grid" class="e-btn">Grid View</label>
  <input type="radio" name="view" id="list" value="list" />
  <label for="list" class="e-btn">List View</label>
  <input type="radio" name="view" id="card" value="card" />
  <label for="card" class="e-btn">Card View</label>
`;

createButtonGroup(singleGroup);

// Handle selection changes
singleGroup.addEventListener('change', (event: Event): void => {
  const target = event.target as HTMLInputElement;
  console.log('Selected view:', target.value);
});
```

**HTML:**
```html
<div id="singleGroup">
  <input type="radio" name="view" id="grid" value="grid" />
  <label for="grid" class="e-btn">Grid View</label>
  <input type="radio" name="view" id="list" value="list" />
  <label for="list" class="e-btn">List View</label>
  <input type="radio" name="view" id="card" value="card" />
  <label for="card" class="e-btn">Card View</label>
</div>
```

## Multiple Selection Mode

Multiple selection (checkbox behavior) - multiple buttons can be selected:

```typescript
import { createButtonGroup } from '@syncfusion/ej2-buttons';

const multiGroup = document.getElementById('multiGroup')!;
multiGroup.innerHTML = `
  <input type="checkbox" id="bold" value="bold" />
  <label for="bold" class="e-btn">Bold</label>
  <input type="checkbox" id="italic" value="italic" />
  <label for="italic" class="e-btn">Italic</label>
  <input type="checkbox" id="underline" value="underline" />
  <label for="underline" class="e-btn">Underline</label>
  <input type="checkbox" id="strikethrough" value="strikethrough" />
  <label for="strikethrough" class="e-btn">Strikethrough</label>
`;

createButtonGroup(multiGroup);

// Handle selection changes
multiGroup.addEventListener('change', (event: Event): void => {
  const target = event.target as HTMLInputElement;
  console.log(`${target.value} ${target.checked ? 'enabled' : 'disabled'}`);
  
  // Get all selected
  const selected = Array.from(multiGroup.querySelectorAll('input:checked'))
    .map(input => (input as HTMLInputElement).value);
  console.log('All selected:', selected);
});
```

**HTML:**
```html
<div id="multiGroup">
  <input type="checkbox" id="bold" value="bold" />
  <label for="bold" class="e-btn">Bold</label>
  <input type="checkbox" id="italic" value="italic" />
  <label for="italic" class="e-btn">Italic</label>
  <input type="checkbox" id="underline" value="underline" />
  <label for="underline" class="e-btn">Underline</label>
</div>
```

## Setting Initial Selection

Pre-select buttons using HTML attributes:

```typescript
import { createButtonGroup } from '@syncfusion/ej2-buttons';

// Single selection with initial value
const singleGroup = document.getElementById('singleGroup')!;
singleGroup.innerHTML = `
  <input type="radio" name="size" id="small" value="small" />
  <label for="small" class="e-btn">Small</label>
  <input type="radio" name="size" id="medium" value="medium" checked />
  <label for="medium" class="e-btn">Medium</label>
  <input type="radio" name="size" id="large" value="large" />
  <label for="large" class="e-btn">Large</label>
`;

createButtonGroup(singleGroup);

// Multiple selection with initial values
const multiGroup = document.getElementById('multiGroup')!;
multiGroup.innerHTML = `
  <input type="checkbox" id="email" value="email" checked />
  <label for="email" class="e-btn">Email</label>
  <input type="checkbox" id="sms" value="sms" checked />
  <label for="sms" class="e-btn">SMS</label>
  <input type="checkbox" id="push" value="push" />
  <label for="push" class="e-btn">Push</label>
`;

createButtonGroup(multiGroup);
```

## Programmatic Selection

Select/deselect buttons via JavaScript:

```typescript
import { createButtonGroup } from '@syncfusion/ej2-buttons';

const groupDiv = document.getElementById('programGroup')!;
groupDiv.innerHTML = `
  <input type="radio" name="option" id="opt1" value="option1" />
  <label for="opt1" class="e-btn">Option 1</label>
  <input type="radio" name="option" id="opt2" value="option2" />
  <label for="opt2" class="e-btn">Option 2</label>
  <input type="radio" name="option" id="opt3" value="option3" />
  <label for="opt3" class="e-btn">Option 3</label>
`;

createButtonGroup(groupDiv);

// Programmatically select option 2
const opt2Input = document.getElementById('opt2') as HTMLInputElement;
opt2Input.checked = true;
opt2Input.dispatchEvent(new Event('change', { bubbles: true }));

// For multiple selection
const multiGroup = document.getElementById('multiGroup')!;
multiGroup.innerHTML = `
  <input type="checkbox" id="read" value="read" />
  <label for="read" class="e-btn">Read</label>
  <input type="checkbox" id="write" value="write" />
  <label for="write" class="e-btn">Write</label>
  <input type="checkbox" id="delete" value="delete" />
  <label for="delete" class="e-btn">Delete</label>
`;

createButtonGroup(multiGroup);

// Select read and write
const readInput = document.getElementById('read') as HTMLInputElement;
const writeInput = document.getElementById('write') as HTMLInputElement;
readInput.checked = true;
writeInput.checked = true;
readInput.dispatchEvent(new Event('change', { bubbles: true }));
```

## Nesting with DropDownButton

Combine ButtonGroup with DropDownButton:

```typescript
import { createButtonGroup } from '@syncfusion/ej2-buttons';
import { DropDownButton, ItemModel } from '@syncfusion/ej2-splitbuttons';

const groupDiv = document.getElementById('nestedGroup')!;
groupDiv.innerHTML = `
  <button id="editBtn" class="e-btn">Edit</button>
  <button id="moreBtn" class="e-btn">More</button>
  <button class="e-btn">Save</button>
`;

// Create button group
createButtonGroup(groupDiv);

// Add dropdown to "More" button
const moreBtn = document.getElementById('moreBtn')!;
const items: ItemModel[] = [
  { text: 'Cut' },
  { text: 'Copy' },
  { text: 'Paste' }
];

const dropdownBtn = new DropDownButton({
  items: items,
  cssClass: 'e-btn',
  iconPosition: 'Right'
});
dropdownBtn.appendTo(moreBtn);
```

## Nesting with SplitButton

Combine ButtonGroup with SplitButton:

```typescript
import { createButtonGroup } from '@syncfusion/ej2-buttons';
import { SplitButton, ItemModel } from '@syncfusion/ej2-splitbuttons';

const groupDiv = document.getElementById('nestedGroup')!;
groupDiv.innerHTML = `
  <button class="e-btn">New</button>
  <button id="pasteBtn" class="e-btn">Paste</button>
  <button class="e-btn">Delete</button>
`;

// Create button group
createButtonGroup(groupDiv);

// Add split button to "Paste" button
const pasteBtn = document.getElementById('pasteBtn')!;
const items: ItemModel[] = [
  { text: 'Paste Special' },
  { text: 'Paste as Link' },
  { text: 'Paste Format Only' }
];

const splitBtn = new SplitButton({
  items: items,
  cssClass: 'e-btn'
});
splitBtn.appendTo(pasteBtn);
```

## Complete Example

Full integration with multiple features:

```typescript
import { createButtonGroup } from '@syncfusion/ej2-buttons';

// Toolbar with view options (single selection)
const viewToolbar = document.getElementById('viewToolbar')!;
viewToolbar.innerHTML = `
  <input type="radio" name="view" id="gridView" value="grid" checked />
  <label for="gridView" class="e-btn">
    <span class="e-icons e-grid-3x3"></span> Grid
  </label>
  <input type="radio" name="view" id="listView" value="list" />
  <label for="listView" class="e-btn">
    <span class="e-icons e-list-unordered"></span> List
  </label>
`;

viewToolbar.classList.add('e-primary');
createButtonGroup(viewToolbar);

// Format options (multiple selection)
const formatToolbar = document.getElementById('formatToolbar')!;
formatToolbar.innerHTML = `
  <input type="checkbox" id="bold" value="bold" />
  <label for="bold" class="e-btn">
    <span class="e-icons e-bold"></span>
  </label>
  <input type="checkbox" id="italic" value="italic" />
  <label for="italic" class="e-btn">
    <span class="e-icons e-italic"></span>
  </label>
  <input type="checkbox" id="underline" value="underline" />
  <label for="underline" class="e-btn">
    <span class="e-icons e-underline"></span>
  </label>
`;

formatToolbar.classList.add('e-primary');
createButtonGroup(formatToolbar);

// Track changes
viewToolbar.addEventListener('change', (event: Event): void => {
  const target = event.target as HTMLInputElement;
  console.log('View changed to:', target.value);
});

formatToolbar.addEventListener('change', (event: Event): void => {
  const selected = Array.from(formatToolbar.querySelectorAll('input:checked'))
    .map(input => (input as HTMLInputElement).value);
  console.log('Format applied:', selected);
});
```
