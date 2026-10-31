# TreeMap Selection and Interactivity in TypeScript and JavaScript

## Table of Contents

- #prerequisites
- #selection-configuration
- #selection-customization
  - #selection-color
  - #selection-border
  - #selection-opacity
  - #selection-mode
- #highlight-effects
  - #highlight-mode
- #selection-events
  - #handle-item-click
  - #handle-item-selected
  - #handle-item-highlighted
- #programmatic-selection
  - #select-an-item
  - #select-a-group
  - #deselect-an-item-or-group
- #legend-interaction
  - #selection-through-the-legend
  - #highlight-through-the-legend
- #double-click-interaction
- #right-click-context-menu
- #clear-selection
- #complete-typescript-example
- #complete-javascript-example
- #best-practices
  - #provide-visual-feedback
  - #differentiate-selection-and-highlight
  - #show-selection-status
  - #provide-clear-selection-actions
  - #do-not-assume-multiple-selection
  - #provide-keyboard-accessible-actions
- #troubleshooting

## Prerequisites

Install the Syncfusion EJ2 TreeMap package.

```bash
npm install @syncfusion/ej2-treemap
```

Add a TreeMap container to the HTML page.

```html
<div id="container"></div>
```

Define a visible size for the container.

```html
<style>
  #container {
    display: block;
    width: 100%;
    height: 500px;
  }
</style>
```

For TypeScript, import the required TreeMap classes from `@syncfusion/ej2-treemap`.

```typescript
import {
  TreeMap,
  TreeMapSelection,
  TreeMapHighlight
} from '@syncfusion/ej2-treemap';
```

Inject the required interaction modules before creating the TreeMap.

```typescript
TreeMap.Inject(
  TreeMapSelection,
  TreeMapHighlight
);
```

For JavaScript applications that use the EJ2 global namespace, inject the modules as follows.

```javascript
ej.treemap.TreeMap.Inject(
  ej.treemap.TreeMapSelection,
  ej.treemap.TreeMapHighlight
);
```

Inject only the modules required by the application.

## Selection Configuration

Use `selectionSettings` to enable selection and customize the selected state.

The primary selection properties are:

- `enable`: Enables or disables selection.
- `fill`: Specifies the selected-item fill.
- `border`: Specifies the selected-item border.
- `opacity`: Specifies the selected-item opacity.
- `mode`: Specifies which related items participate in selection.

### TypeScript

```typescript
import {
  TreeMap,
  TreeMapSelection
} from '@syncfusion/ej2-treemap';

TreeMap.Inject(TreeMapSelection);

interface ProductData {
  Product: string;
  Sales: number;
}

const data: ProductData[] = [
  {
    Product: 'Laptop',
    Sales: 15000
  },
  {
    Product: 'Phone',
    Sales: 12000
  },
  {
    Product: 'Tablet',
    Sales: 8000
  }
];

const treemap: TreeMap = new TreeMap({
  dataSource: data,
  weightValuePath: 'Sales',

  selectionSettings: {
    enable: true,
    fill: '#0066cc',
    opacity: '1',
    border: {
      color: '#000000',
      width: 2
    }
  },

  leafItemSettings: {
    labelPath: 'Product',
    showLabels: true,
    gap: 4,
    border: {
      color: '#ffffff',
      width: 1
    }
  }
});

treemap.appendTo('#container');
```

### JavaScript

```javascript
ej.treemap.TreeMap.Inject(
  ej.treemap.TreeMapSelection
);

var data = [
  {
    Product: 'Laptop',
    Sales: 15000
  },
  {
    Product: 'Phone',
    Sales: 12000
  },
  {
    Product: 'Tablet',
    Sales: 8000
  }
];

var treemap = new ej.treemap.TreeMap({
  dataSource: data,
  weightValuePath: 'Sales',

  selectionSettings: {
    enable: true,
    fill: '#0066cc',
    opacity: '1',
    border: {
      color: '#000000',
      width: 2
    }
  },

  leafItemSettings: {
    labelPath: 'Product',
    showLabels: true,
    gap: 4,
    border: {
      color: '#ffffff',
      width: 1
    }
  }
});

treemap.appendTo('#container');
```

## Selection Customization

Selection appearance is controlled by `selectionSettings`.

### Selection Color

Use `fill` to specify the selected-item color.

#### TypeScript

```typescript
selectionSettings: {
  enable: true,
  fill: '#c2410c',
  border: {
    color: '#431407',
    width: 2
  }
}
```

#### JavaScript

```javascript
selectionSettings: {
  enable: true,
  fill: '#c2410c',
  border: {
    color: '#431407',
    width: 2
  }
}
```

Choose a selection fill that differs clearly from the normal item colors.

### Selection Border

Use `selectionSettings.border` to emphasize the selected item.

#### TypeScript

```typescript
selectionSettings: {
  enable: true,
  fill: '#2563eb',
  border: {
    color: '#111827',
    width: 3
  }
}
```

#### JavaScript

```javascript
selectionSettings: {
  enable: true,
  fill: '#2563eb',
  border: {
    color: '#111827',
    width: 3
  }
}
```

A visible border helps distinguish selected items even when the selected fill is similar to an existing category color.

### Selection Opacity

Use `selectionSettings.opacity` to control selected-item opacity.

#### TypeScript

```typescript
selectionSettings: {
  enable: true,
  fill: '#2563eb',
  opacity: '0.75',
  border: {
    color: '#1e3a8a',
    width: 2
  }
}
```

#### JavaScript

```javascript
selectionSettings: {
  enable: true,
  fill: '#2563eb',
  opacity: '0.75',
  border: {
    color: '#1e3a8a',
    width: 2
  }
}
```

Avoid reducing opacity so much that labels and item boundaries become difficult to read.

### Selection Mode

Use `mode` to control the relationship between the directly selected item and related hierarchy items.

Common modes include:

- `Item`
- `Child`
- `Parent`
- `All`

#### TypeScript

```typescript
selectionSettings: {
  enable: true,
  mode: 'Item',
  fill: '#2563eb',
  border: {
    color: '#111827',
    width: 2
  }
}
```

#### JavaScript

```javascript
selectionSettings: {
  enable: true,
  mode: 'Item',
  fill: '#2563eb',
  border: {
    color: '#111827',
    width: 2
  }
}
```

Use `Item` when only the directly selected item should receive the selection appearance.

Use hierarchy-related modes only when selecting related parent or child items is meaningful to users.

## Highlight Effects

Use `highlightSettings` to apply pointer-hover highlighting.

The `TreeMapHighlight` module must be injected before highlighting is enabled.

### TypeScript

```typescript
import {
  TreeMap,
  TreeMapHighlight
} from '@syncfusion/ej2-treemap';

TreeMap.Inject(TreeMapHighlight);

interface ProductData {
  Product: string;
  Sales: number;
}

const data: ProductData[] = [
  {
    Product: 'Laptop',
    Sales: 15000
  },
  {
    Product: 'Phone',
    Sales: 12000
  },
  {
    Product: 'Tablet',
    Sales: 8000
  }
];

const treemap: TreeMap = new TreeMap({
  dataSource: data,
  weightValuePath: 'Sales',

  highlightSettings: {
    enable: true,
    fill: '#facc15',
    opacity: '1',
    border: {
      color: '#a16207',
      width: 2
    }
  },

  leafItemSettings: {
    labelPath: 'Product'
  }
});

treemap.appendTo('#container');
```

### JavaScript

```javascript
ej.treemap.TreeMap.Inject(
  ej.treemap.TreeMapHighlight
);

var data = [
  {
    Product: 'Laptop',
    Sales: 15000
  },
  {
    Product: 'Phone',
    Sales: 12000
  },
  {
    Product: 'Tablet',
    Sales: 8000
  }
];

var treemap = new ej.treemap.TreeMap({
  dataSource: data,
  weightValuePath: 'Sales',

  highlightSettings: {
    enable: true,
    fill: '#facc15',
    opacity: '1',
    border: {
      color: '#a16207',
      width: 2
    }
  },

  leafItemSettings: {
    labelPath: 'Product'
  }
});

treemap.appendTo('#container');
```

### Highlight Mode

The highlight mode controls which hierarchy items are highlighted.

#### TypeScript

```typescript
highlightSettings: {
  enable: true,
  mode: 'Item',
  fill: '#facc15',
  border: {
    color: '#a16207',
    width: 2
  }
}
```

#### JavaScript

```javascript
highlightSettings: {
  enable: true,
  mode: 'Item',
  fill: '#facc15',
  border: {
    color: '#a16207',
    width: 2
  }
}
```

Keep selection and highlight visually distinct:

```typescript
selectionSettings: {
  enable: true,
  fill: '#2563eb',
  border: {
    color: '#1e3a8a',
    width: 2
  }
},

highlightSettings: {
  enable: true,
  fill: '#facc15',
  border: {
    color: '#a16207',
    width: 2
  }
}
```

## Selection Events

TreeMap provides events for monitoring item interaction and state changes.

Relevant events include:

- `click`
- `itemClick`
- `itemSelected`
- `itemHighlight`
- `itemMove`
- `mouseMove`

Use `itemClick` for a click on a rendered TreeMap item.

Use `itemSelected` when application logic must react after TreeMap selection occurs.

Use `itemHighlight` when application logic must react to item highlighting.

## Handle Item Click

### TypeScript

```typescript
import {
  TreeMap,
  IItemClickEventArgs
} from '@syncfusion/ej2-treemap';

function updateStatus(message: string): void {
  const status: HTMLElement | null =
    document.getElementById('interaction-status');

  if (status) {
    status.textContent = message;
  }
}

const treemap: TreeMap = new TreeMap({
  dataSource: data,
  weightValuePath: 'Sales',

  leafItemSettings: {
    labelPath: 'Product'
  },

  itemClick: (args: IItemClickEventArgs): void => {
    console.log(args);
    updateStatus('A TreeMap item was clicked.');
  }
});

treemap.appendTo('#container');
```

### JavaScript

```javascript
function updateStatus(message) {
  var status =
    document.getElementById('interaction-status');

  if (status) {
    status.textContent = message;
  }
}

var treemap = new ej.treemap.TreeMap({
  dataSource: data,
  weightValuePath: 'Sales',

  leafItemSettings: {
    labelPath: 'Product'
  },

  itemClick: function (args) {
    console.log(args);
    updateStatus('A TreeMap item was clicked.');
  }
});

treemap.appendTo('#container');
```

### HTML

```html
<p
  id="interaction-status"
  role="status"
  aria-live="polite"
>
  No interaction yet.
</p>

<div id="container"></div>
```

The exact event data available can vary according to whether the target is a leaf, hierarchy group, label, or legend-related item.

Inspect and validate the event object before using optional item details.

## Handle Item Selected

Use `itemSelected` to respond after the TreeMap selection state changes.

### TypeScript

```typescript
import {
  TreeMap,
  TreeMapSelection,
  IItemSelectedEventArgs
} from '@syncfusion/ej2-treemap';

TreeMap.Inject(TreeMapSelection);

const treemap: TreeMap = new TreeMap({
  dataSource: data,
  weightValuePath: 'Sales',

  selectionSettings: {
    enable: true,
    fill: '#2563eb',
    border: {
      color: '#111827',
      width: 2
    }
  },

  leafItemSettings: {
    labelPath: 'Product'
  },

  itemSelected: (
    args: IItemSelectedEventArgs
  ): void => {
    console.log('Selection changed:', args);
    updateStatus('TreeMap selection changed.');
  }
});

treemap.appendTo('#container');
```

### JavaScript

```javascript
ej.treemap.TreeMap.Inject(
  ej.treemap.TreeMapSelection
);

var treemap = new ej.treemap.TreeMap({
  dataSource: data,
  weightValuePath: 'Sales',

  selectionSettings: {
    enable: true,
    fill: '#2563eb',
    border: {
      color: '#111827',
      width: 2
    }
  },

  leafItemSettings: {
    labelPath: 'Product'
  },

  itemSelected: function (args) {
    console.log('Selection changed:', args);
    updateStatus('TreeMap selection changed.');
  }
});

treemap.appendTo('#container');
```

Prefer `itemSelected` over manually assuming that every click changed the selection.

## Handle Item Highlighted

Use `itemHighlight` to react to highlight changes.

### TypeScript

```typescript
import {
  TreeMap,
  TreeMapHighlight,
  IItemHighlightEventArgs
} from '@syncfusion/ej2-treemap';

TreeMap.Inject(TreeMapHighlight);

const treemap: TreeMap = new TreeMap({
  dataSource: data,
  weightValuePath: 'Sales',

  highlightSettings: {
    enable: true,
    fill: '#facc15',
    border: {
      color: '#a16207',
      width: 2
    }
  },

  leafItemSettings: {
    labelPath: 'Product'
  },

  itemHighlight: (
    args: IItemHighlightEventArgs
  ): void => {
    console.log('Item highlighted:', args);
  }
});

treemap.appendTo('#container');
```

### JavaScript

```javascript
ej.treemap.TreeMap.Inject(
  ej.treemap.TreeMapHighlight
);

var treemap = new ej.treemap.TreeMap({
  dataSource: data,
  weightValuePath: 'Sales',

  highlightSettings: {
    enable: true,
    fill: '#facc15',
    border: {
      color: '#a16207',
      width: 2
    }
  },

  leafItemSettings: {
    labelPath: 'Product'
  },

  itemHighlight: function (args) {
    console.log('Item highlighted:', args);
  }
});

treemap.appendTo('#container');
```

Avoid placing essential application behavior only in a hover event because hovering is not available to all users or input methods.

## Programmatic Selection

Use the TreeMap `selectItem()` method to select or deselect a known item or hierarchy path.

The first argument is the level-order path. The second argument determines whether the path is selected or deselected.

```typescript
treemap.selectItem(levelOrder, isSelected);
```

Programmatic selection requires `TreeMapSelection` to be injected and selection to be enabled.

## Select an Item

The level-order path must reflect the configured hierarchy.

For the following configuration:

```typescript
levels: [
  {
    groupPath: 'Category'
  }
],

leafItemSettings: {
  labelPath: 'Product'
}
```

the path for the Laptop leaf under Electronics is:

```typescript
[
  'Electronics',
  'Laptop'
]
```

### TypeScript

```typescript
import {
  TreeMap,
  TreeMapSelection
} from '@syncfusion/ej2-treemap';

TreeMap.Inject(TreeMapSelection);

interface ProductData {
  Category: string;
  Product: string;
  Sales: number;
}

const data: ProductData[] = [
  {
    Category: 'Electronics',
    Product: 'Laptop',
    Sales: 15000
  },
  {
    Category: 'Electronics',
    Product: 'Phone',
    Sales: 12000
  },
  {
    Category: 'Furniture',
    Product: 'Chair',
    Sales: 8000
  }
];

const treemap: TreeMap = new TreeMap({
  dataSource: data,
  weightValuePath: 'Sales',

  levels: [
    {
      groupPath: 'Category'
    }
  ],

  selectionSettings: {
    enable: true,
    fill: '#2563eb',
    border: {
      color: '#111827',
      width: 2
    }
  },

  leafItemSettings: {
    labelPath: 'Product'
  }
});

treemap.appendTo('#container');

function selectLaptop(): void {
  treemap.selectItem(
    ['Electronics', 'Laptop'],
    true
  );
}
```

### JavaScript

```javascript
ej.treemap.TreeMap.Inject(
  ej.treemap.TreeMapSelection
);

var data = [
  {
    Category: 'Electronics',
    Product: 'Laptop',
    Sales: 15000
  },
  {
    Category: 'Electronics',
    Product: 'Phone',
    Sales: 12000
  },
  {
    Category: 'Furniture',
    Product: 'Chair',
    Sales: 8000
  }
];

var treemap = new ej.treemap.TreeMap({
  dataSource: data,
  weightValuePath: 'Sales',

  levels: [
    {
      groupPath: 'Category'
    }
  ],

  selectionSettings: {
    enable: true,
    fill: '#2563eb',
    border: {
      color: '#111827',
      width: 2
    }
  },

  leafItemSettings: {
    labelPath: 'Product'
  }
});

treemap.appendTo('#container');

function selectLaptop() {
  treemap.selectItem(
    ['Electronics', 'Laptop'],
    true
  );
}
```

## Select a Group

Pass the group path to select a known hierarchy group.

### TypeScript

```typescript
function selectElectronics(): void {
  treemap.selectItem(
    ['Electronics'],
    true
  );
}
```

### JavaScript

```javascript
function selectElectronics() {
  treemap.selectItem(
    ['Electronics'],
    true
  );
}
```

The effect of group selection can also depend on the configured selection mode.

## Deselect an Item or Group

Pass `false` as the second argument.

### TypeScript

```typescript
function deselectLaptop(): void {
  treemap.selectItem(
    ['Electronics', 'Laptop'],
    false
  );
}

function deselectElectronics(): void {
  treemap.selectItem(
    ['Electronics'],
    false
  );
}
```

### JavaScript

```javascript
function deselectLaptop() {
  treemap.selectItem(
    ['Electronics', 'Laptop'],
    false
  );
}

function deselectElectronics() {
  treemap.selectItem(
    ['Electronics'],
    false
  );
}
```

## Legend Interaction

TreeMap legend items can participate in selection and highlighting when the corresponding features are enabled.

Required modules include:

- `TreeMapLegend`
- `TreeMapSelection` for selection
- `TreeMapHighlight` for highlighting

The legend also requires a meaningful color source, such as equal-value color mapping.

## Selection Through the Legend

### TypeScript

```typescript
import {
  TreeMap,
  TreeMapLegend,
  TreeMapSelection
} from '@syncfusion/ej2-treemap';

TreeMap.Inject(
  TreeMapLegend,
  TreeMapSelection
);

interface ProductData {
  Product: string;
  Sales: number;
  Category: string;
}

const data: ProductData[] = [
  {
    Product: 'Laptop',
    Sales: 15000,
    Category: 'Electronics'
  },
  {
    Product: 'Phone',
    Sales: 12000,
    Category: 'Electronics'
  },
  {
    Product: 'Chair',
    Sales: 8000,
    Category: 'Furniture'
  }
];

const treemap: TreeMap = new TreeMap({
  dataSource: data,
  weightValuePath: 'Sales',
  equalColorValuePath: 'Category',

  legendSettings: {
    visible: true,
    title: 'Product categories'
  },

  selectionSettings: {
    enable: true,
    fill: '#60a5fa',
    border: {
      color: '#1e3a8a',
      width: 2
    }
  },

  leafItemSettings: {
    labelPath: 'Product',
    colorMapping: [
      {
        value: 'Electronics',
        color: '#075985',
        label: 'Electronics'
      },
      {
        value: 'Furniture',
        color: '#166534',
        label: 'Furniture'
      }
    ]
  }
});

treemap.appendTo('#container');
```

### JavaScript

```javascript
ej.treemap.TreeMap.Inject(
  ej.treemap.TreeMapLegend,
  ej.treemap.TreeMapSelection
);

var treemap = new ej.treemap.TreeMap({
  dataSource: data,
  weightValuePath: 'Sales',
  equalColorValuePath: 'Category',

  legendSettings: {
    visible: true,
    title: 'Product categories'
  },

  selectionSettings: {
    enable: true,
    fill: '#60a5fa',
    border: {
      color: '#1e3a8a',
      width: 2
    }
  },

  leafItemSettings: {
    labelPath: 'Product',
    colorMapping: [
      {
        value: 'Electronics',
        color: '#075985',
        label: 'Electronics'
      },
      {
        value: 'Furniture',
        color: '#166534',
        label: 'Furniture'
      }
    ]
  }
});

treemap.appendTo('#container');
```

## Highlight Through the Legend

### TypeScript

```typescript
import {
  TreeMap,
  TreeMapLegend,
  TreeMapHighlight
} from '@syncfusion/ej2-treemap';

TreeMap.Inject(
  TreeMapLegend,
  TreeMapHighlight
);

const treemap: TreeMap = new TreeMap({
  dataSource: data,
  weightValuePath: 'Sales',
  equalColorValuePath: 'Category',

  legendSettings: {
    visible: true,
    title: 'Product categories'
  },

  highlightSettings: {
    enable: true,
    fill: '#facc15',
    border: {
      color: '#a16207',
      width: 2
    }
  },

  leafItemSettings: {
    labelPath: 'Product',
    colorMapping: [
      {
        value: 'Electronics',
        color: '#075985',
        label: 'Electronics'
      },
      {
        value: 'Furniture',
        color: '#166534',
        label: 'Furniture'
      }
    ]
  }
});

treemap.appendTo('#container');
```

### JavaScript

```javascript
ej.treemap.TreeMap.Inject(
  ej.treemap.TreeMapLegend,
  ej.treemap.TreeMapHighlight
);

var treemap = new ej.treemap.TreeMap({
  dataSource: data,
  weightValuePath: 'Sales',
  equalColorValuePath: 'Category',

  legendSettings: {
    visible: true,
    title: 'Product categories'
  },

  highlightSettings: {
    enable: true,
    fill: '#facc15',
    border: {
      color: '#a16207',
      width: 2
    }
  },

  leafItemSettings: {
    labelPath: 'Product',
    colorMapping: [
      {
        value: 'Electronics',
        color: '#075985',
        label: 'Electronics'
      },
      {
        value: 'Furniture',
        color: '#166534',
        label: 'Furniture'
      }
    ]
  }
});

treemap.appendTo('#container');
```

## Double-Click Interaction

TreeMap does not expose a dedicated `doubleClick` property in its documented EJ2 TypeScript model.

Use the native `dblclick` event on the TreeMap host element when the application requires a double-click action.

### TypeScript

```typescript
const container: HTMLElement | null =
  document.getElementById('container');

container?.addEventListener(
  'dblclick',
  (event: MouseEvent): void => {
    const target: Element | null =
      event.target as Element | null;

    console.log(
      'TreeMap double-click target:',
      target
    );

    updateStatus(
      'The TreeMap was double-clicked.'
    );
  }
);
```

### JavaScript

```javascript
var container =
  document.getElementById('container');

if (container) {
  container.addEventListener(
    'dblclick',
    function (event) {
      console.log(
        'TreeMap double-click target:',
        event.target
      );

      updateStatus(
        'The TreeMap was double-clicked.'
      );
    }
  );
}
```

A native double-click listener identifies the DOM target, but it does not automatically provide the same semantic item arguments as `itemClick`.

If the application needs item-specific double-click behavior, store the most recent validated `itemClick` details and use them only when the double-click occurs immediately afterward.

Do not make important functionality available only through double-click because it is difficult to discover and is not equally convenient across input methods.

## Right-Click Context Menu

TreeMap does not expose a dedicated `rightClick` property in its documented EJ2 TypeScript model.

Use the native `contextmenu` event on the TreeMap host element.

### TypeScript

```typescript
const container: HTMLElement | null =
  document.getElementById('container');

container?.addEventListener(
  'contextmenu',
  (event: MouseEvent): void => {
    event.preventDefault();

    const target: Element | null =
      event.target as Element | null;

    console.log(
      'TreeMap context-menu target:',
      target
    );

    updateStatus(
      'The TreeMap context menu was requested.'
    );
  }
);
```

### JavaScript

```javascript
var container =
  document.getElementById('container');

if (container) {
  container.addEventListener(
    'contextmenu',
    function (event) {
      event.preventDefault();

      console.log(
        'TreeMap context-menu target:',
        event.target
      );

      updateStatus(
        'The TreeMap context menu was requested.'
      );
    }
  );
}
```

Call `preventDefault()` only when the application provides an accessible replacement for the browser context menu.

A custom context menu should also support:

- Keyboard activation
- Visible focus
- Arrow-key navigation
- Escape to close
- Focus restoration
- Accessible names and roles

## Clear Selection

A reliable application-level approach is to track every level-order path selected programmatically and deselect each tracked path using `selectItem(path, false)`.

### TypeScript

```typescript
const selectedPaths: string[][] = [];

function pathsMatch(
  first: string[],
  second: string[]
): boolean {
  return (
    first.length === second.length &&
    first.every(
      (value: string, index: number): boolean =>
        value === second[index]
    )
  );
}

function trackSelectedPath(
  path: string[]
): void {
  const alreadyTracked: boolean =
    selectedPaths.some(
      (existing: string[]): boolean =>
        pathsMatch(existing, path)
    );

  if (!alreadyTracked) {
    selectedPaths.push([...path]);
  }
}

function selectPath(path: string[]): void {
  treemap.selectItem(path, true);
  trackSelectedPath(path);
}

function clearTrackedSelection(): void {
  selectedPaths.forEach(
    (path: string[]): void => {
      treemap.selectItem(path, false);
    }
  );

  selectedPaths.length = 0;
  updateSelectedCount();
}
```

### JavaScript

```javascript
var selectedPaths = [];

function pathsMatch(first, second) {
  return (
    first.length === second.length &&
    first.every(function (value, index) {
      return value === second[index];
    })
  );
}

function trackSelectedPath(path) {
  var alreadyTracked =
    selectedPaths.some(function (existing) {
      return pathsMatch(existing, path);
    });

  if (!alreadyTracked) {
    selectedPaths.push(path.slice());
  }
}

function selectPath(path) {
  treemap.selectItem(path, true);
  trackSelectedPath(path);
}

function clearTrackedSelection() {
  selectedPaths.forEach(function (path) {
    treemap.selectItem(path, false);
  });

  selectedPaths.length = 0;
  updateSelectedCount();
}
```

This approach clears selection paths controlled by the application. If users can also select items directly, synchronize the tracked state using the validated `itemSelected` event data.

## Complete TypeScript Example

The following example includes:

- Leaf and group selection
- Hover highlighting
- Selection and highlight modules
- Category legend
- Programmatic selection
- Tracked programmatic selection paths
- Clear-selection action
- Item-click and item-selected events
- Native double-click handling
- Native context-menu handling
- Accessible action controls
- Selection and interaction status

### index.html

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />

  <meta
    name="viewport"
    content="width=device-width, initial-scale=1.0"
  />

  <title>
    Interactive TreeMap
  </title>

  <style>
    body {
      margin: 0;
      padding: 24px;
      box-sizing: border-box;
      background: #f8fafc;
      color: #111827;
      font-family: Arial, Helvetica, sans-serif;
    }

    main {
      max-width: 1200px;
      margin: 0 auto;
    }

    h1 {
      margin: 0 0 8px;
      font-size: 24px;
    }

    .description {
      max-width: 75ch;
      margin: 0 0 16px;
      line-height: 1.5;
    }

    .toolbar {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      margin-bottom: 12px;
    }

    .toolbar button {
      min-height: 42px;
      padding: 8px 14px;
      border: 2px solid #1d4ed8;
      border-radius: 6px;
      background: #ffffff;
      color: #1e3a8a;
      font: inherit;
      font-weight: 600;
      cursor: pointer;
    }

    .toolbar button:hover {
      background: #dbeafe;
    }

    .toolbar button:focus-visible {
      outline: 3px solid #f59e0b;
      outline-offset: 2px;
    }

    .status-panel {
      display: grid;
      gap: 6px;
      margin-bottom: 12px;
      padding: 12px;
      border: 1px solid #94a3b8;
      border-radius: 8px;
      background: #ffffff;
    }

    .status-panel p {
      margin: 0;
    }

    #container {
      display: block;
      width: 100%;
      height: 520px;
      background: #ffffff;
    }
  </style>
</head>
<body>
  <main>
    <h1>Interactive Product Sales TreeMap</h1>

    <p class="description">
      Select or highlight TreeMap items. Use the
      buttons to select known hierarchy paths or
      clear selections created by these controls.
    </p>

    <div
      class="toolbar"
      role="group"
      aria-label="TreeMap selection actions"
    >
      <button id="select-laptop" type="button">
        Select Laptop
      </button>

      <button id="select-electronics" type="button">
        Select Electronics Group
      </button>

      <button id="deselect-laptop" type="button">
        Deselect Laptop
      </button>

      <button id="clear-selection" type="button">
        Clear Tracked Selection
      </button>
    </div>

    <section
      class="status-panel"
      aria-label="TreeMap interaction status"
    >
      <p>
        <strong>Tracked selections:</strong>
        <span id="selected-count">0</span>
      </p>

      <p
        id="interaction-status"
        role="status"
        aria-live="polite"
      >
        No interaction yet.
      </p>
    </section>

    <div id="container"></div>
  </main>
</body>
</html>
```

### index.ts

```typescript
import {
  TreeMap,
  TreeMapLegend,
  TreeMapSelection,
  TreeMapHighlight,
  IItemClickEventArgs,
  IItemSelectedEventArgs,
  IItemHighlightEventArgs
} from '@syncfusion/ej2-treemap';

TreeMap.Inject(
  TreeMapLegend,
  TreeMapSelection,
  TreeMapHighlight
);

interface ProductData {
  Category: string;
  Product: string;
  Sales: number;
}

const data: ProductData[] = [
  {
    Category: 'Electronics',
    Product: 'Laptop',
    Sales: 15000
  },
  {
    Category: 'Electronics',
    Product: 'Phone',
    Sales: 12000
  },
  {
    Category: 'Electronics',
    Product: 'Tablet',
    Sales: 8000
  },
  {
    Category: 'Furniture',
    Product: 'Chair',
    Sales: 9000
  },
  {
    Category: 'Furniture',
    Product: 'Desk',
    Sales: 6500
  },
  {
    Category: 'Clothing',
    Product: 'Shirt',
    Sales: 5000
  }
];

const selectedPaths: string[][] = [];

function updateStatus(message: string): void {
  const status: HTMLElement | null =
    document.getElementById(
      'interaction-status'
    );

  if (status) {
    status.textContent = message;
  }
}

function updateSelectedCount(): void {
  const selectedCount: HTMLElement | null =
    document.getElementById(
      'selected-count'
    );

  if (selectedCount) {
    selectedCount.textContent =
      selectedPaths.length.toString();
  }
}

function pathsMatch(
  first: string[],
  second: string[]
): boolean {
  return (
    first.length === second.length &&
    first.every(
      (value: string, index: number): boolean =>
        value === second[index]
    )
  );
}

function hasTrackedPath(
  path: string[]
): boolean {
  return selectedPaths.some(
    (existing: string[]): boolean =>
      pathsMatch(existing, path)
  );
}

function trackPath(path: string[]): void {
  if (!hasTrackedPath(path)) {
    selectedPaths.push([...path]);
  }

  updateSelectedCount();
}

function untrackPath(path: string[]): void {
  const index: number =
    selectedPaths.findIndex(
      (existing: string[]): boolean =>
        pathsMatch(existing, path)
    );

  if (index !== -1) {
    selectedPaths.splice(index, 1);
  }

  updateSelectedCount();
}

const treemap: TreeMap = new TreeMap({
  dataSource: data,
  weightValuePath: 'Sales',
  equalColorValuePath: 'Category',

  titleSettings: {
    text: 'Product Sales by Category',
    textStyle: {
      color: '#111827',
      size: '18px',
      fontFamily: 'Arial',
      fontWeight: '700'
    }
  },

  levels: [
    {
      groupPath: 'Category',
      groupGap: 7,
      headerHeight: 36,
      headerFormat: '${Category}',
      headerAlignment: 'Center',
      headerStyle: {
        color: '#111827',
        size: '13px',
        fontWeight: '600'
      }
    }
  ],

  selectionSettings: {
    enable: true,
    mode: 'Item',
    fill: '#2563eb',
    opacity: '1',
    border: {
      color: '#111827',
      width: 3
    }
  },

  highlightSettings: {
    enable: true,
    mode: 'Item',
    fill: '#facc15',
    opacity: '1',
    border: {
      color: '#a16207',
      width: 2
    }
  },

  legendSettings: {
    visible: true,
    position: 'Bottom',
    title: 'Product categories'
  },

  leafItemSettings: {
    labelPath: 'Product',
    showLabels: true,
    labelFormat: '${Product}: ${Sales}',
    labelPosition: 'Center',
    interSectAction: 'WrapByWord',
    gap: 4,
    border: {
      color: '#ffffff',
      width: 2
    },
    labelStyle: {
      color: '#ffffff',
      size: '13px',
      fontFamily: 'Arial',
      fontWeight: '600'
    },
    colorMapping: [
      {
        value: 'Electronics',
        color: '#075985',
        label: 'Electronics'
      },
      {
        value: 'Furniture',
        color: '#166534',
        label: 'Furniture'
      },
      {
        value: 'Clothing',
        color: '#9a3412',
        label: 'Clothing'
      }
    ]
  },

  itemClick: (
    args: IItemClickEventArgs
  ): void => {
    console.log('Item click:', args);

    updateStatus(
      'A TreeMap item was clicked.'
    );
  },

  itemSelected: (
    args: IItemSelectedEventArgs
  ): void => {
    console.log(
      'Item selected:',
      args
    );

    updateStatus(
      'The TreeMap selection changed.'
    );
  },

  itemHighlight: (
    args: IItemHighlightEventArgs
  ): void => {
    console.log(
      'Item highlighted:',
      args
    );
  }
});

treemap.appendTo('#container');

function addAction(
  id: string,
  action: () => void
): void {
  const button: HTMLElement | null =
    document.getElementById(id);

  button?.addEventListener(
    'click',
    action
  );
}

addAction(
  'select-laptop',
  (): void => {
    const path: string[] = [
      'Electronics',
      'Laptop'
    ];

    treemap.selectItem(path, true);
    trackPath(path);

    updateStatus(
      'Laptop was selected programmatically.'
    );
  }
);

addAction(
  'select-electronics',
  (): void => {
    const path: string[] = [
      'Electronics'
    ];

    treemap.selectItem(path, true);
    trackPath(path);

    updateStatus(
      'The Electronics group was selected.'
    );
  }
);

addAction(
  'deselect-laptop',
  (): void => {
    const path: string[] = [
      'Electronics',
      'Laptop'
    ];

    treemap.selectItem(path, false);
    untrackPath(path);

    updateStatus(
      'Laptop was deselected.'
    );
  }
);

addAction(
  'clear-selection',
  (): void => {
    selectedPaths.forEach(
      (path: string[]): void => {
        treemap.selectItem(path, false);
      }
    );

    selectedPaths.length = 0;
    updateSelectedCount();

    updateStatus(
      'Tracked selections were cleared.'
    );
  }
);

const container: HTMLElement | null =
  document.getElementById('container');

container?.addEventListener(
  'dblclick',
  (): void => {
    updateStatus(
      'The TreeMap was double-clicked.'
    );
  }
);

container?.addEventListener(
  'contextmenu',
  (event: MouseEvent): void => {
    event.preventDefault();

    updateStatus(
      'A context-menu action was requested.'
    );
  }
);
```

## Complete JavaScript Example

The JavaScript example uses the Syncfusion EJ2 global namespace.

Use the same `index.html` from the complete TypeScript example.

### index.js

```javascript
ej.treemap.TreeMap.Inject(
  ej.treemap.TreeMapLegend,
  ej.treemap.TreeMapSelection,
  ej.treemap.TreeMapHighlight
);

var data = [
  {
    Category: 'Electronics',
    Product: 'Laptop',
    Sales: 15000
  },
  {
    Category: 'Electronics',
    Product: 'Phone',
    Sales: 12000
  },
  {
    Category: 'Electronics',
    Product: 'Tablet',
    Sales: 8000
  },
  {
    Category: 'Furniture',
    Product: 'Chair',
    Sales: 9000
  },
  {
    Category: 'Furniture',
    Product: 'Desk',
    Sales: 6500
  },
  {
    Category: 'Clothing',
    Product: 'Shirt',
    Sales: 5000
  }
];

var selectedPaths = [];

function updateStatus(message) {
  var status =
    document.getElementById(
      'interaction-status'
    );

  if (status) {
    status.textContent = message;
  }
}

function updateSelectedCount() {
  var selectedCount =
    document.getElementById(
      'selected-count'
    );

  if (selectedCount) {
    selectedCount.textContent =
      String(selectedPaths.length);
  }
}

function pathsMatch(first, second) {
  return (
    first.length === second.length &&
    first.every(function (value, index) {
      return value === second[index];
    })
  );
}

function hasTrackedPath(path) {
  return selectedPaths.some(
    function (existing) {
      return pathsMatch(existing, path);
    }
  );
}

function trackPath(path) {
  if (!hasTrackedPath(path)) {
    selectedPaths.push(path.slice());
  }

  updateSelectedCount();
}

function untrackPath(path) {
  var index = selectedPaths.findIndex(
    function (existing) {
      return pathsMatch(existing, path);
    }
  );

  if (index !== -1) {
    selectedPaths.splice(index, 1);
  }

  updateSelectedCount();
}

var treemap = new ej.treemap.TreeMap({
  dataSource: data,
  weightValuePath: 'Sales',
  equalColorValuePath: 'Category',

  titleSettings: {
    text: 'Product Sales by Category',
    textStyle: {
      color: '#111827',
      size: '18px',
      fontFamily: 'Arial',
      fontWeight: '700'
    }
  },

  levels: [
    {
      groupPath: 'Category',
      groupGap: 7,
      headerHeight: 36,
      headerFormat: '${Category}',
      headerAlignment: 'Center',
      headerStyle: {
        color: '#111827',
        size: '13px',
        fontWeight: '600'
      }
    }
  ],

  selectionSettings: {
    enable: true,
    mode: 'Item',
    fill: '#2563eb',
    opacity: '1',
    border: {
      color: '#111827',
      width: 3
    }
  },

  highlightSettings: {
    enable: true,
    mode: 'Item',
    fill: '#facc15',
    opacity: '1',
    border: {
      color: '#a16207',
      width: 2
    }
  },

  legendSettings: {
    visible: true,
    position: 'Bottom',
    title: 'Product categories'
  },

  leafItemSettings: {
    labelPath: 'Product',
    showLabels: true,
    labelFormat: '${Product}: ${Sales}',
    labelPosition: 'Center',
    interSectAction: 'WrapByWord',
    gap: 4,
    border: {
      color: '#ffffff',
      width: 2
    },
    labelStyle: {
      color: '#ffffff',
      size: '13px',
      fontFamily: 'Arial',
      fontWeight: '600'
    },
    colorMapping: [
      {
        value: 'Electronics',
        color: '#075985',
        label: 'Electronics'
      },
      {
        value: 'Furniture',
        color: '#166534',
        label: 'Furniture'
      },
      {
        value: 'Clothing',
        color: '#9a3412',
        label: 'Clothing'
      }
    ]
  },

  itemClick: function (args) {
    console.log('Item click:', args);

    updateStatus(
      'A TreeMap item was clicked.'
    );
  },

  itemSelected: function (args) {
    console.log(
      'Item selected:',
      args
    );

    updateStatus(
      'The TreeMap selection changed.'
    );
  },

  itemHighlight: function (args) {
    console.log(
      'Item highlighted:',
      args
    );
  }
});

treemap.appendTo('#container');

function addAction(id, action) {
  var button =
    document.getElementById(id);

  if (button) {
    button.addEventListener(
      'click',
      action
    );
  }
}

addAction(
  'select-laptop',
  function () {
    var path = [
      'Electronics',
      'Laptop'
    ];

    treemap.selectItem(path, true);
    trackPath(path);

    updateStatus(
      'Laptop was selected programmatically.'
    );
  }
);

addAction(
  'select-electronics',
  function () {
    var path = [
      'Electronics'
    ];

    treemap.selectItem(path, true);
    trackPath(path);

    updateStatus(
      'The Electronics group was selected.'
    );
  }
);

addAction(
  'deselect-laptop',
  function () {
    var path = [
      'Electronics',
      'Laptop'
    ];

    treemap.selectItem(path, false);
    untrackPath(path);

    updateStatus(
      'Laptop was deselected.'
    );
  }
);

addAction(
  'clear-selection',
  function () {
    selectedPaths.forEach(function (path) {
      treemap.selectItem(path, false);
    });

    selectedPaths.length = 0;
    updateSelectedCount();

    updateStatus(
      'Tracked selections were cleared.'
    );
  }
);

var container =
  document.getElementById('container');

if (container) {
  container.addEventListener(
    'dblclick',
    function () {
      updateStatus(
        'The TreeMap was double-clicked.'
      );
    }
  );

  container.addEventListener(
    'contextmenu',
    function (event) {
      event.preventDefault();

      updateStatus(
        'A context-menu action was requested.'
      );
    }
  );
}
```

## Best Practices

## Provide Visual Feedback

Use a visually distinct fill and border for selected items.

### TypeScript

```typescript
selectionSettings: {
  enable: true,
  fill: '#2563eb',
  border: {
    color: '#111827',
    width: 3
  }
}
```

### JavaScript

```javascript
selectionSettings: {
  enable: true,
  fill: '#2563eb',
  border: {
    color: '#111827',
    width: 3
  }
}
```

Do not rely only on a subtle fill variation. A visible border improves identification.

## Differentiate Selection and Highlight

Selection represents a persistent state. Highlight normally represents a temporary pointer-hover state.

Use different colors for each state.

```typescript
selectionSettings: {
  enable: true,
  fill: '#2563eb',
  border: {
    color: '#111827',
    width: 3
  }
},

highlightSettings: {
  enable: true,
  fill: '#facc15',
  border: {
    color: '#a16207',
    width: 2
  }
}
```

Avoid using two shades of the same color when the difference may be difficult to identify.

## Show Selection Status

Provide text feedback when selection affects the application.

```html
<p
  id="interaction-status"
  role="status"
  aria-live="polite"
>
  No selection.
</p>
```

```typescript
function updateStatus(message: string): void {
  const status: HTMLElement | null =
    document.getElementById(
      'interaction-status'
    );

  if (status) {
    status.textContent = message;
  }
}
```

Use `itemSelected` to update application state after TreeMap selection changes.

## Provide Clear Selection Actions

Use native buttons for application-controlled selection.

```html
<button id="select-laptop" type="button">
  Select Laptop
</button>

<button id="clear-selection" type="button">
  Clear Tracked Selection
</button>
```

Do not use clickable `<div>` or `<span>` elements as buttons.

## Do Not Assume Multiple Selection

Do not describe the TreeMap as providing arbitrary multi-selection unless that behavior has been explicitly validated for the intended configuration and interaction flow.

The selection `mode` controls hierarchy relationships such as item, parent, child, or all. It should not automatically be treated as a general multiple-selection switch.

When the application programmatically manages several paths:

1. Store each selected level-order path.
2. Call `selectItem(path, true)` to select it.
3. Call `selectItem(path, false)` to deselect it.
4. Synchronize application state with `itemSelected`.
5. Test interactions involving both items and legend entries.

## Provide Keyboard-Accessible Actions

Native TreeMap pointer interactions should not be the only way to perform important actions.

Provide buttons for actions such as:

- Select an important group
- Select a known item
- Clear selection
- Open details
- Apply a filter

Ensure that buttons have:

- Clear visible labels
- Logical focus order
- Visible focus indication
- Status feedback

## Troubleshooting

### Selection Does Not Work

Confirm that `TreeMapSelection` is imported and injected.

```typescript
import {
  TreeMap,
  TreeMapSelection
} from '@syncfusion/ej2-treemap';

TreeMap.Inject(TreeMapSelection);
```

Enable selection.

```typescript
selectionSettings: {
  enable: true
}
```

For JavaScript:

```javascript
ej.treemap.TreeMap.Inject(
  ej.treemap.TreeMapSelection
);
```

### Highlight Does Not Work

Confirm that `TreeMapHighlight` is imported and injected.

```typescript
import {
  TreeMap,
  TreeMapHighlight
} from '@syncfusion/ej2-treemap';

TreeMap.Inject(TreeMapHighlight);
```

Enable highlighting.

```typescript
highlightSettings: {
  enable: true
}
```

For JavaScript:

```javascript
ej.treemap.TreeMap.Inject(
  ej.treemap.TreeMapHighlight
);
```

### Selection and Highlight Look Similar

Use clearly different colors and borders.

```typescript
selectionSettings: {
  enable: true,
  fill: '#2563eb',
  border: {
    color: '#111827',
    width: 3
  }
},

highlightSettings: {
  enable: true,
  fill: '#facc15',
  border: {
    color: '#a16207',
    width: 2
  }
}
```

### Item Click Is Not Triggered

Use the `itemClick` event in the TreeMap configuration.

```typescript
const treemap: TreeMap = new TreeMap({
  itemClick: (
    args: IItemClickEventArgs
  ): void => {
    console.log(args);
  }
});
```

For JavaScript:

```javascript
var treemap = new ej.treemap.TreeMap({
  itemClick: function (args) {
    console.log(args);
  }
});
```

Do not use Angular event-binding syntax in pure TypeScript or JavaScript.

```html
<!-- Angular syntax. Do not use in EJ2 TypeScript. -->
<ejs-treemap
  (itemClick)="onItemClick($event)"
></ejs-treemap>
```

### Item Selected Is Not Triggered

Confirm that selection is enabled and `TreeMapSelection` is injected.

```typescript
const treemap: TreeMap = new TreeMap({
  selectionSettings: {
    enable: true
  },

  itemSelected: (
    args: IItemSelectedEventArgs
  ): void => {
    console.log(args);
  }
});
```

### Programmatic Selection Selects the Wrong Item

Verify the order of fields in `levels`.

```typescript
levels: [
  {
    groupPath: 'Category'
  }
]
```

Verify the leaf label field.

```typescript
leafItemSettings: {
  labelPath: 'Product'
}
```

Use the complete level-order path.

```typescript
treemap.selectItem(
  ['Electronics', 'Laptop'],
  true
);
```

A missing group segment or incorrect letter casing can prevent the expected item from being selected.

### Group Selection Does Not Work as Expected

Use the group path.

```typescript
treemap.selectItem(
  ['Electronics'],
  true
);
```

Also verify the selection mode.

```typescript
selectionSettings: {
  enable: true,
  mode: 'Item'
}
```

Test `Item`, `Child`, `Parent`, and `All` against the actual hierarchy before choosing a mode.

### Legend Selection Does Not Work

Confirm that:

1. `TreeMapLegend` is injected.
2. `TreeMapSelection` is injected.
3. Selection is enabled.
4. The legend is visible.
5. A valid color mapping is configured.
6. `equalColorValuePath` matches the category field.

```typescript
TreeMap.Inject(
  TreeMapLegend,
  TreeMapSelection
);
```

```typescript
const treemap: TreeMap = new TreeMap({
  equalColorValuePath: 'Category',

  legendSettings: {
    visible: true
  },

  selectionSettings: {
    enable: true
  }
});
```

### Legend Highlight Does Not Work

Inject both the legend and highlight modules.

```typescript
TreeMap.Inject(
  TreeMapLegend,
  TreeMapHighlight
);
```

Enable highlight.

```typescript
highlightSettings: {
  enable: true
}
```

### Double-Click Handler Does Not Run

Attach a native `dblclick` listener after the TreeMap container exists.

```typescript
const container: HTMLElement | null =
  document.getElementById('container');

container?.addEventListener(
  'dblclick',
  (): void => {
    console.log('Double-clicked');
  }
);
```

Do not configure `doubleClick` as a TreeMap model property unless it is supported by the installed package version and API definition.

### Right-Click Handler Does Not Run

Use the native `contextmenu` event.

```typescript
const container: HTMLElement | null =
  document.getElementById('container');

container?.addEventListener(
  'contextmenu',
  (event: MouseEvent): void => {
    event.preventDefault();
    console.log('Context menu requested');
  }
);
```

Do not configure `rightClick` as a TreeMap model property unless it is supported by the installed package version and API definition.

### Clear Selection Leaves Some Items Selected

The tracked-path approach only clears paths known to the application.

To keep it synchronized:

1. Track paths selected programmatically.
2. Listen to `itemSelected`.
3. Validate the event data for the installed EJ2 version.
4. Add or remove the corresponding path from application state.
5. Consider interactions initiated through legend items.
6. Deselect every tracked path with `selectItem(path, false)`.

### Interaction Status Is Not Announced

Use a live status element.

```html
<p
  id="interaction-status"
  role="status"
  aria-live="polite"
>
  No interaction yet.
</p>
```

Update its text when the interaction state changes.

```typescript
updateStatus(
  'The Electronics group was selected.'
);
```

### TreeMap Is Not Visible

Confirm that the target element exists.

```html
<div id="container"></div>
```

Give it a nonzero height.

```css
#container {
  width: 100%;
  height: 500px;
}
```

Append the TreeMap using the correct selector.

```typescript
treemap.appendTo('#container');
```

Also verify that the required EJ2 scripts, styles, and package versions are configured correctly.