# ButtonGroup - How-To Patterns (TypeScript)

## Table of Contents
- [Add Icons to Buttons](#add-icons-to-buttons)
- [Create Rounded ButtonGroup](#create-rounded-buttongroup)
- [Disable Individual Buttons](#disable-individual-buttons)
- [Vertical Orientation](#vertical-orientation)
- [RTL Support](#rtl-support)
- [Get Selected Buttons](#get-selected-buttons)

## Add Icons to Buttons

```typescript
import { createButtonGroup } from '@syncfusion/ej2-buttons';

const groupDiv = document.getElementById('iconGroup')!;
groupDiv.innerHTML = `
  <button class="e-btn">
    <span class="e-icons e-align-left"></span> Left
  </button>
  <button class="e-btn">
    <span class="e-icons e-align-center"></span> Center
  </button>
  <button class="e-btn">
    <span class="e-icons e-align-right"></span> Right
  </button>
`;

groupDiv.classList.add('e-primary');
createButtonGroup(groupDiv);
```

## Create Rounded ButtonGroup

```typescript
import { createButtonGroup } from '@syncfusion/ej2-buttons';

const groupDiv = document.getElementById('roundGroup')!;
groupDiv.innerHTML = `
  <button class="e-btn e-round-corner">Option 1</button>
  <button class="e-btn e-round-corner">Option 2</button>
  <button class="e-btn e-round-corner">Option 3</button>
`;

groupDiv.classList.add('e-primary');
groupDiv.classList.add('e-round-corner');
createButtonGroup(groupDiv);
```

## Disable Individual Buttons

```typescript
import { createButtonGroup } from '@syncfusion/ej2-buttons';

const groupDiv = document.getElementById('disableGroup')!;
groupDiv.innerHTML = `
  <button class="e-btn">Enabled</button>
  <button class="e-btn" disabled>Disabled</button>
  <button class="e-btn">Enabled</button>
`;

createButtonGroup(groupDiv);

// Programmatically disable
const buttons = groupDiv.querySelectorAll('button');
buttons.forEach((btn, index) => {
  if (index === 1) {
    btn.setAttribute('disabled', '');
  }
});
```

## Vertical Orientation

```typescript
import { createButtonGroup } from '@syncfusion/ej2-buttons';

const groupDiv = document.getElementById('verticalGroup')!;
groupDiv.innerHTML = `
  <button class="e-btn">Top</button>
  <button class="e-btn">Middle</button>
  <button class="e-btn">Bottom</button>
`;

groupDiv.classList.add('e-vertical');
groupDiv.classList.add('e-primary');
createButtonGroup(groupDiv);
```

## RTL Support

```typescript
import { createButtonGroup } from '@syncfusion/ej2-buttons';
import { enableRtl } from '@syncfusion/ej2-base';

// Enable RTL globally
enableRtl(true);

const groupDiv = document.getElementById('rtlGroup')!;
groupDiv.innerHTML = `
  <button class="e-btn">يمين</button>
  <button class="e-btn">وسط</button>
  <button class="e-btn">يسار</button>
`;

groupDiv.classList.add('e-primary');
createButtonGroup(groupDiv);
```

## Get Selected Buttons

```typescript
import { createButtonGroup } from '@syncfusion/ej2-buttons';

const groupDiv = document.getElementById('selectGroup')!;
groupDiv.innerHTML = `
  <input type="radio" name="option" id="opt1" value="option1" />
  <label for="opt1" class="e-btn">Option 1</label>
  <input type="radio" name="option" id="opt2" value="option2" />
  <label for="opt2" class="e-btn">Option 2</label>
  <input type="radio" name="option" id="opt3" value="option3" />
  <label for="opt3" class="e-btn">Option 3</label>
`;

createButtonGroup(groupDiv);

// Get selected
function getSelectedButtons(): string[] {
  return Array.from(groupDiv.querySelectorAll('input:checked'))
    .map(input => (input as HTMLInputElement).value);
}

console.log('Selected:', getSelectedButtons());
```
