# Selection and Interactivity in Angular TreeMap

## Table of Contents 

- [Selection Configuration](#selection-configuration)
- [Selection Customization](#selection-customization)
  - [Selection Color](#selection-color)
  - [Selection Border Styling](#selection-border-styling)
  - [Opacity for Selected Items](#opacity-for-selected-items)
- [Highlight Effects](#highlight-effects)
- [Click Events and Selection](#click-events-and-selection)
  - [Handle Item Click](#handle-item-click)
  - [Event Properties](#event-properties)
  - [Programmatic Selection](#programmatic-selection)
- [Legend Interaction](#legend-interaction)
  - [Selection via Legend](#selection-via-legend)
  - [Highlight via Legend Hover](#highlight-via-legend-hover)
- [Double-Click Interaction](#double-click-interaction)
  - [Handle Double-Click](#handle-double-click)
- [Right-Click Context Menu](#right-click-context-menu)
  - [Handle Right-Click](#handle-right-click)
- [Group Selection](#group-selection)
  - [Select by Group](#select-by-group)
- [Clear Selection](#clear-selection)
  - [Deselect All Items](#deselect-all-items)
- [Complete Interactive Example](#complete-interactive-example)
- [Best Practices](#best-practices)
  - [DO: Provide Visual Feedback for Selection](#do-provide-visual-feedback-for-selection)
  - [DON'T: Use Similar Colors for Selection and Highlight](#dont-use-similar-colors-for-selection-and-highlight)
  - [DO: Show Count of Selected Items](#do-show-count-of-selected-items)
  - [DO: Provide Clear Selection Actions](#do-provide-clear-selection-actions)
  - [DO: Handle Multiple Selection Properly](#do-handle-multiple-selection-properly)
  - [Troubleshooting](#troubleshooting)

## Selection Configuration

Syncfusion Angular TreeMap supports built-in item selection through `selectionSettings` and hover interaction through `highlightSettings`. Use `selectItem(levelOrder, isSelected?)` when you need programmatic selection or deselection.

```typescript
import { Component, signal } from '@angular/core';
import {
  TreeMapModule,
  TreeMapSelectionService
} from '@syncfusion/ej2-angular-treemap';

@Component({
  selector: 'app-treemap',
  standalone: true,
  imports: [TreeMapModule],
  providers: [TreeMapSelectionService],
  template: `
    <ejs-treemap
      id="treemap-container"
      [dataSource]="data()"
      weightValuePath="Sales"
      [selectionSettings]="selectionSettings"
      [leafItemSettings]="leafItemSettings">
    </ejs-treemap>
  `,
  styles: [`
    #treemap-container {
      display: block;
      width: 100%;
      height: 500px;
    }
  `]
})
export class TreeMapComponent {
  public data = signal([
    { Product: 'Laptop', Sales: 15000 },
    { Product: 'Phone', Sales: 12000 },
    { Product: 'Tablet', Sales: 8000 }
  ]);

  public selectionSettings = {
    enable: true,
    fill: '#0066cc',
    border: { color: '#000000', width: 2 }
  };

  public leafItemSettings = {
    labelPath: 'Product',
    gap: 4,
    border: { color: '#ffffff', width: 1 }
  };
}
```

**Key Properties:**

- `enable`: Enables or disables selection.
- `fill`: Applies the selection color.
- `border`: Defines the border color and width for selected items.

## Selection Customization

Selection appearance is controlled through the `selectionSettings` object.

### Selection Color

```typescript
public selectionSettings = {
  enable: true,
  fill: '#ff6600',
  border: { color: '#333333', width: 2 }
};
```

### Selection Border Styling

```typescript
public selectionSettings = {
  enable: true,
  fill: '#0066cc',
  border: { color: '#333333', width: 3 }
};
```

### Opacity for Selected Items

Use an RGBA color in `fill` when you want a semi-transparent selection style.

```typescript
public selectionSettings = {
  enable: true,
  fill: 'rgba(0, 102, 204, 0.7)',
  border: { color: '#003366', width: 2 }
};
```

## Highlight Effects

Use `highlightSettings` to apply hover-based highlighting.

```typescript
import { Component, signal } from '@angular/core';
import {
  TreeMapModule,
  TreeMapHighlightService
} from '@syncfusion/ej2-angular-treemap';

@Component({
  selector: 'app-treemap',
  standalone: true,
  imports: [TreeMapModule],
  providers: [TreeMapHighlightService],
  template: `
    <ejs-treemap
      [dataSource]="data()"
      weightValuePath="Sales"
      [highlightSettings]="highlightSettings"
      [leafItemSettings]="leafItemSettings">
    </ejs-treemap>
  `
})
export class TreeMapComponent {
  public data = signal([
    { Product: 'Laptop', Sales: 15000 },
    { Product: 'Phone', Sales: 12000 },
    { Product: 'Tablet', Sales: 8000 }
  ]);

  public highlightSettings = {
    enable: true,
    fill: '#ffcc00',
    border: { color: '#ff9900', width: 2 }
  };

  public leafItemSettings = {
    labelPath: 'Product'
  };
}
```

## Click Events and Selection

TreeMap provides interaction events such as `itemClick`, `itemSelected`, `doubleClick`, and `rightClick`. Use these events to update surrounding Angular UI, show the selected item, or trigger application logic.

### Handle Item Click

```typescript
import { Component, signal } from '@angular/core';
import {
  TreeMapModule,
  IItemClickEventArgs
} from '@syncfusion/ej2-angular-treemap';

@Component({
  selector: 'app-treemap',
  standalone: true,
  imports: [TreeMapModule],
  template: `
    <ejs-treemap
      [dataSource]="data()"
      weightValuePath="Sales"
      [leafItemSettings]="leafItemSettings"
      (itemClick)="onItemClick($event)">
    </ejs-treemap>

    <p>{{ lastAction() }}</p>
  `
})
export class TreeMapComponent {
  public data = signal([
    { Product: 'Laptop', Sales: 15000 },
    { Product: 'Phone', Sales: 12000 }
  ]);

  public leafItemSettings = {
    labelPath: 'Product'
  };

  public lastAction = signal('No interaction yet.');

  public onItemClick(args: IItemClickEventArgs): void {
    const eventArgs = args as {
      name?: string;
      item?: { name?: string };
    };

    const itemName =
      eventArgs.item?.name ||
      eventArgs.name ||
      'Unknown item';

    this.lastAction.set(`Item clicked: ${itemName}`);
  }
}
```

### Event Properties

Use the event object to read the clicked item information. A practical approach is to read the display name, group name, and level-order information, then derive your own selection key from the grouped data.

```typescript
public onItemClick(args: IItemClickEventArgs): void {
  const eventArgs = args as {
    name?: string;
    groupName?: string;
    item?: {
      name?: string;
      groupName?: string;
      levelOrderName?: string;
    };
  };

  const itemName =
    eventArgs.item?.name ||
    eventArgs.name ||
    'Unknown item';

  const groupName =
    eventArgs.item?.groupName ||
    eventArgs.groupName ||
    '';

  const levelOrderName =
    eventArgs.item?.levelOrderName ||
    '';

  this.lastAction.set(
    `Item: ${itemName} | Group: ${groupName || 'N/A'} | Level Order: ${levelOrderName || 'N/A'}`
  );
}
```

### Programmatic Selection

Use `selectItem(levelOrder, isSelected?)` for programmatic selection and deselection.

```typescript
import { Component, signal, ViewChild } from '@angular/core';
import {
  TreeMapModule,
  TreeMapComponent as SyncTreeMapComponent,
  TreeMapSelectionService
} from '@syncfusion/ej2-angular-treemap';

@Component({
  selector: 'app-treemap',
  standalone: true,
  imports: [TreeMapModule],
  providers: [TreeMapSelectionService],
  template: `
    <button type="button" (click)="selectKnownItem()">Select Known Item</button>

    <ejs-treemap
      #treemap
      [dataSource]="data()"
      weightValuePath="Sales"
      [selectionSettings]="selectionSettings"
      [levels]="levels"
      [leafItemSettings]="leafItemSettings">
    </ejs-treemap>
  `
})
export class TreeMapComponent {
  @ViewChild('treemap')
  public treemap?: SyncTreeMapComponent;

  public data = signal([
    { Category: 'Electronics', Product: 'Laptop', Sales: 15000 },
    { Category: 'Electronics', Product: 'Phone', Sales: 12000 },
    { Category: 'Furniture', Product: 'Chair', Sales: 8000 }
  ]);

  public levels = [
    { groupPath: 'Category' }
  ];

  public leafItemSettings = {
    labelPath: 'Product'
  };

  public selectionSettings = {
    enable: true,
    fill: '#0066cc',
    border: { color: '#000000', width: 2 }
  };

  public selectKnownItem(): void {
    const levelOrder = ['Electronics', 'Laptop'];
    this.treemap?.selectItem(levelOrder, true);
  }
}
```

**Important:** `selectItem(...)` requires the level-order path of the group or item being selected.

## Legend Interaction

TreeMap selection and highlight can work together with legend interaction.

### Selection via Legend

When selection is enabled and the legend is visible, interacting with legend items can select the related TreeMap items.

```typescript
import { Component, signal } from '@angular/core';
import {
  TreeMapModule,
  TreeMapLegendService,
  TreeMapSelectionService
} from '@syncfusion/ej2-angular-treemap';

@Component({
  selector: 'app-treemap',
  standalone: true,
  imports: [TreeMapModule],
  providers: [TreeMapLegendService, TreeMapSelectionService],
  template: `
    <ejs-treemap
      [dataSource]="data()"
      weightValuePath="Sales"
      equalColorValuePath="Category"
      [legendSettings]="legendSettings"
      [selectionSettings]="selectionSettings"
      [leafItemSettings]="leafItemSettings">
    </ejs-treemap>
  `
})
export class TreeMapComponent {
  public data = signal([
    { Product: 'Laptop', Sales: 15000, Category: 'Electronics' },
    { Product: 'Phone', Sales: 12000, Category: 'Electronics' },
    { Product: 'Chair', Sales: 8000, Category: 'Furniture' }
  ]);

  public legendSettings = {
    visible: true
  };

  public selectionSettings = {
    enable: true,
    fill: '#0066cc',
    border: { color: '#000000', width: 2 }
  };

  public leafItemSettings = {
    labelPath: 'Product',
    colorMapping: [
      { value: 'Electronics', color: '#2563eb', label: 'Electronics' },
      { value: 'Furniture', color: '#16a34a', label: 'Furniture' }
    ]
  };
}
```

### Highlight via Legend Hover

When highlight is enabled and the legend is visible, hovering related legend items can highlight the matching TreeMap items.

```typescript
import { Component, signal } from '@angular/core';
import {
  TreeMapModule,
  TreeMapLegendService,
  TreeMapHighlightService
} from '@syncfusion/ej2-angular-treemap';

@Component({
  selector: 'app-treemap',
  standalone: true,
  imports: [TreeMapModule],
  providers: [TreeMapLegendService, TreeMapHighlightService],
  template: `
    <ejs-treemap
      [dataSource]="data()"
      weightValuePath="Sales"
      equalColorValuePath="Category"
      [legendSettings]="legendSettings"
      [highlightSettings]="highlightSettings"
      [leafItemSettings]="leafItemSettings">
    </ejs-treemap>
  `
})
export class TreeMapComponent {
  public data = signal([
    { Product: 'Laptop', Sales: 15000, Category: 'Electronics' },
    { Product: 'Chair', Sales: 8000, Category: 'Furniture' }
  ]);

  public legendSettings = {
    visible: true
  };

  public highlightSettings = {
    enable: true,
    fill: '#ffcc00',
    border: { color: '#ff9900', width: 2 }
  };

  public leafItemSettings = {
    labelPath: 'Product',
    colorMapping: [
      { value: 'Electronics', color: '#2563eb', label: 'Electronics' },
      { value: 'Furniture', color: '#16a34a', label: 'Furniture' }
    ]
  };
}
```

## Double-Click Interaction

Use the `doubleClick` event to handle double-click interactions.

### Handle Double-Click

```typescript
import { Component, signal } from '@angular/core';
import {
  TreeMapModule,
  IDoubleClickEventArgs
} from '@syncfusion/ej2-angular-treemap';

@Component({
  selector: 'app-treemap',
  standalone: true,
  imports: [TreeMapModule],
  template: `
    <ejs-treemap
      [dataSource]="data()"
      weightValuePath="Sales"
      [leafItemSettings]="leafItemSettings"
      (doubleClick)="onDoubleClick($event)">
    </ejs-treemap>

    <p>{{ lastAction() }}</p>
  `
})
export class TreeMapComponent {
  public data = signal([
    { Product: 'Laptop', Sales: 15000 },
    { Product: 'Phone', Sales: 12000 }
  ]);

  public leafItemSettings = {
    labelPath: 'Product'
  };

  public lastAction = signal('No interaction yet.');

  public onDoubleClick(args: IDoubleClickEventArgs): void {
    const eventArgs = args as {
      name?: string;
      item?: { name?: string };
    };

    const itemName =
      eventArgs.item?.name ||
      eventArgs.name ||
      'Unknown item';

    this.lastAction.set(`TreeMap double-clicked: ${itemName}`);
  }
}
```

## Right-Click Context Menu

Use the `rightClick` event to handle context-menu style interactions.

### Handle Right-Click

```typescript
import { Component, signal } from '@angular/core';
import {
  TreeMapModule,
  IMouseMoveEventArgs
} from '@syncfusion/ej2-angular-treemap';

@Component({
  selector: 'app-treemap',
  standalone: true,
  imports: [TreeMapModule],
  template: `
    <ejs-treemap
      [dataSource]="data()"
      weightValuePath="Sales"
      [leafItemSettings]="leafItemSettings"
      (rightClick)="onRightClick($event)">
    </ejs-treemap>

    <p>{{ lastAction() }}</p>
  `
})
export class TreeMapComponent {
  public data = signal([
    { Product: 'Laptop', Sales: 15000 },
    { Product: 'Phone', Sales: 12000 }
  ]);

  public leafItemSettings = {
    labelPath: 'Product'
  };

  public lastAction = signal('No interaction yet.');

  public onRightClick(args: IMouseMoveEventArgs): void {
    const eventArgs = args as {
      name?: string;
      item?: { name?: string };
    };

    const itemName =
      eventArgs.item?.name ||
      eventArgs.name ||
      'Unknown item';

    this.lastAction.set(`TreeMap right-clicked: ${itemName}`);
  }
}
```

## Group Selection

TreeMap supports selecting groups and items through `selectItem(...)`.

### Select by Group

```typescript
import { Component, signal, ViewChild } from '@angular/core';
import {
  TreeMapModule,
  TreeMapComponent as SyncTreeMapComponent,
  TreeMapSelectionService
} from '@syncfusion/ej2-angular-treemap';

@Component({
  selector: 'app-treemap',
  standalone: true,
  imports: [TreeMapModule],
  providers: [TreeMapSelectionService],
  template: `
    <button type="button" (click)="selectElectronicsGroup()">Select Electronics Group</button>

    <ejs-treemap
      #treemap
      [dataSource]="data()"
      weightValuePath="Sales"
      [selectionSettings]="selectionSettings"
      [levels]="levels"
      [leafItemSettings]="leafItemSettings">
    </ejs-treemap>
  `
})
export class TreeMapComponent {
  @ViewChild('treemap')
  public treemap?: SyncTreeMapComponent;

  public data = signal([
    { Category: 'Electronics', Product: 'Laptop', Sales: 15000 },
    { Category: 'Electronics', Product: 'Phone', Sales: 12000 },
    { Category: 'Furniture', Product: 'Chair', Sales: 8000 }
  ]);

  public levels = [
    { groupPath: 'Category' }
  ];

  public selectionSettings = {
    enable: true,
    fill: '#0066cc',
    border: { color: '#000000', width: 2 }
  };

  public leafItemSettings = {
    labelPath: 'Product'
  };

  public selectElectronicsGroup(): void {
    const groupLevelOrder = ['Electronics'];
    this.treemap?.selectItem(groupLevelOrder, true);
  }
}
```

## Clear Selection

Clear selection by deselecting the tracked level-order paths that you maintain in application state.

### Deselect All Items

```typescript
import { Component, signal, ViewChild } from '@angular/core';
import {
  TreeMapModule,
  TreeMapComponent as SyncTreeMapComponent,
  TreeMapSelectionService
} from '@syncfusion/ej2-angular-treemap';

type TreeMapEventDetails = {
  name?: string;
  groupName?: string;
  levelOrderName?: string;
  item?: {
    name?: string;
    groupName?: string;
    levelOrderName?: string;
  };
};

@Component({
  selector: 'app-treemap',
  standalone: true,
  imports: [TreeMapModule],
  providers: [TreeMapSelectionService],
  template: `
    <button type="button" (click)="clearSelection()">Clear Selection</button>

    <ejs-treemap
      #treemap
      id="treemap-container"
      [dataSource]="data()"
      weightValuePath="Sales"
      [selectionSettings]="selectionSettings"
      [levels]="levels"
      [leafItemSettings]="leafItemSettings"
      (itemClick)="onItemClick($event)">
    </ejs-treemap>
  `,
  styles: [`
    #treemap-container {
      display: block;
      width: 100%;
      height: 500px;
      margin-top: 12px;
    }
  `]
})
export class TreeMapComponent {
  @ViewChild('treemap')
  public treemap?: SyncTreeMapComponent;

  public data = signal([
    { Category: 'Electronics', Product: 'Laptop', Sales: 15000 },
    { Category: 'Electronics', Product: 'Phone', Sales: 12000 },
    { Category: 'Furniture', Product: 'Chair', Sales: 8000 }
  ]);

  public levels = [
    { groupPath: 'Category' }
  ];

  public selectionSettings = {
    enable: true,
    fill: '#0066cc',
    border: { color: '#000000', width: 2 }
  };

  public leafItemSettings = {
    labelPath: 'Product'
  };

  public selectedLevelOrders = signal<string[][]>([]);

  public onItemClick(args: any): void {
    const levelOrder = this.getLevelOrder(args);

    if (!levelOrder) {
      return;
    }

    if (this.hasLevelOrder(levelOrder)) {
      this.selectedLevelOrders.update((items) =>
        items.filter(
          (existing) =>
            !(
              existing.length === levelOrder.length &&
              existing.every((value, index) => value === levelOrder[index])
            )
        )
      );
    } else {
      this.selectedLevelOrders.update((items) => [...items, levelOrder]);
    }
  }

  public clearSelection(): void {
    for (const levelOrder of this.selectedLevelOrders()) {
      this.treemap?.selectItem(levelOrder, false);
    }

    this.selectedLevelOrders.set([]);
  }

  private getEventDetails(args: any): TreeMapEventDetails {
    return args as TreeMapEventDetails;
  }

  private getLevelOrder(args: any): string[] | null {
    const details = this.getEventDetails(args);
    const levelOrderName = details.levelOrderName || details.item?.levelOrderName;

    if (levelOrderName) {
      return levelOrderName
        .split('#')
        .map((part) => part.trim())
        .filter(Boolean);
    }

    const groupName = details.item?.groupName || details.groupName;
    const itemName = details.item?.name || details.name;

    if (groupName && itemName && groupName !== itemName) {
      return [groupName, itemName];
    }

    if (groupName) {
      return [groupName];
    }

    if (itemName) {
      return [itemName];
    }

    return null;
  }

  private hasLevelOrder(levelOrder: string[]): boolean {
    return this.selectedLevelOrders().some(
      (existing) =>
        existing.length === levelOrder.length &&
        existing.every((value, index) => value === levelOrder[index])
    );
  }
}
```

## Complete Interactive Example

```typescript
import { Component, signal, computed, ViewChild } from '@angular/core';
import {
  TreeMapModule,
  TreeMapComponent as SyncTreeMapComponent,
  TreeMapLegendService,
  TreeMapSelectionService,
  TreeMapHighlightService,
  IItemClickEventArgs,
  IDoubleClickEventArgs,
  IMouseMoveEventArgs
} from '@syncfusion/ej2-angular-treemap';

type TreeMapEventDetails = {
  name?: string;
  groupName?: string;
  levelOrderName?: string;
  item?: {
    name?: string;
    groupName?: string;
    levelOrderName?: string;
  };
};

@Component({
  selector: 'app-treemap',
  standalone: true,
  imports: [TreeMapModule],
  providers: [
    TreeMapLegendService,
    TreeMapSelectionService,
    TreeMapHighlightService
  ],
  template: `
    <div class="toolbar">
      <button type="button" (click)="selectElectronicsGroup()">Select Electronics Group</button>
      <button type="button" (click)="clearSelection()">Clear</button>
      <span class="status">Tracked selections: {{ selectedCount() }}</span>
    </div>

    <ejs-treemap
      #treemap
      id="treemap-container"
      [dataSource]="data()"
      weightValuePath="Sales"
      equalColorValuePath="Category"
      [selectionSettings]="selectionSettings"
      [highlightSettings]="highlightSettings"
      [legendSettings]="legendSettings"
      [levels]="levels"
      [leafItemSettings]="leafItemSettings"
      (itemClick)="onItemClick($event)"
      (doubleClick)="onDoubleClick($event)"
      (rightClick)="onRightClick($event)">
    </ejs-treemap>

    <div class="event-panel">
      <h3>Last Interaction</h3>
      <p>{{ lastAction() }}</p>

      <h3 class="selected-title">Tracked Level Orders</h3>
      @if (selectedLevelOrders().length > 0) {
        <ul class="selected-list">
          @for (item of selectedLevelOrders(); track item.join(' > ')) {
            <li>{{ item.join(' > ') }}</li>
          }
        </ul>
      } @else {
        <p>No tracked selections.</p>
      }
    </div>
  `,
  styles: [`
    :host {
      display: block;
      padding: 12px;
      box-sizing: border-box;
      font-family: Arial, Helvetica, sans-serif;
    }

    .toolbar {
      display: flex;
      gap: 8px;
      align-items: center;
      flex-wrap: wrap;
      margin-bottom: 12px;
    }

    .toolbar button {
      padding: 8px 12px;
      border: 1px solid #cbd5e1;
      background: #ffffff;
      border-radius: 8px;
      cursor: pointer;
    }

    .status {
      margin-left: 8px;
      color: #374151;
    }

    #treemap-container {
      display: block;
      width: 100%;
      height: 520px;
    }

    .event-panel {
      margin-top: 16px;
      border: 1px solid #d1d5db;
      border-radius: 10px;
      padding: 12px;
      background: #f9fafb;
    }

    .event-panel h3 {
      margin: 0 0 8px;
      font-size: 16px;
    }

    .event-panel p {
      margin: 0 0 8px;
      color: #111827;
    }

    .selected-title {
      margin-top: 12px !important;
    }

    .selected-list {
      margin: 0;
      padding-left: 18px;
    }

    .selected-list li {
      margin-bottom: 6px;
    }
  `]
})
export class TreeMapComponent {
  @ViewChild('treemap')
  public treemap?: SyncTreeMapComponent;

  public data = signal([
    { Category: 'Electronics', Product: 'Laptop', Sales: 15000 },
    { Category: 'Electronics', Product: 'Phone', Sales: 12000 },
    { Category: 'Furniture', Product: 'Chair', Sales: 8000 },
    { Category: 'Clothing', Product: 'Shirt', Sales: 5000 }
  ]);

  public levels = [
    { groupPath: 'Category' }
  ];

  public selectionSettings = {
    enable: true,
    fill: '#0066cc',
    border: { color: '#000000', width: 2 }
  };

  public highlightSettings = {
    enable: true,
    fill: '#ffcc00',
    border: { color: '#ff9900', width: 2 }
  };

  public legendSettings = {
    visible: true
  };

  public leafItemSettings = {
    labelPath: 'Product',
    gap: 4,
    border: { color: '#ffffff', width: 1 },
    colorMapping: [
      { value: 'Electronics', color: '#2563eb', label: 'Electronics' },
      { value: 'Furniture', color: '#16a34a', label: 'Furniture' },
      { value: 'Clothing', color: '#ea580c', label: 'Clothing' }
    ]
  };

  public selectedLevelOrders = signal<string[][]>([]);
  public selectedCount = computed(() => this.selectedLevelOrders().length);
  public lastAction = signal('No interaction yet.');

  public onItemClick(args: IItemClickEventArgs): void {
    const itemName = this.getItemName(args);
    const levelOrder = this.getLevelOrder(args);

    if (levelOrder) {
      this.toggleTrackedLevelOrder(levelOrder);
    }

    this.lastAction.set(`Item clicked: ${itemName}`);
  }

  public onDoubleClick(args: IDoubleClickEventArgs): void {
    const itemName = this.getItemName(args);
    this.lastAction.set(`TreeMap double-clicked: ${itemName}`);
  }

  public onRightClick(args: IMouseMoveEventArgs): void {
    const itemName = this.getItemName(args);
    this.lastAction.set(`TreeMap right-clicked: ${itemName}`);
  }

  public selectElectronicsGroup(): void {
    const groupLevelOrder = ['Electronics'];
    this.treemap?.selectItem(groupLevelOrder, true);

    if (!this.hasLevelOrder(groupLevelOrder)) {
      this.selectedLevelOrders.update((items) => [...items, groupLevelOrder]);
    }

    this.lastAction.set('Selected group: Electronics');
  }

  public clearSelection(): void {
    for (const levelOrder of this.selectedLevelOrders()) {
      this.treemap?.selectItem(levelOrder, false);
    }

    this.selectedLevelOrders.set([]);
    this.lastAction.set('Selections cleared');
  }

  private getEventDetails(
    args: IItemClickEventArgs | IDoubleClickEventArgs | IMouseMoveEventArgs
  ): TreeMapEventDetails {
    return args as unknown as TreeMapEventDetails;
  }

  private getItemName(
    args: IItemClickEventArgs | IDoubleClickEventArgs | IMouseMoveEventArgs
  ): string {
    const details = this.getEventDetails(args);

    return (
      details.item?.name ||
      details.name ||
      details.item?.groupName ||
      details.groupName ||
      'Unknown item'
    );
  }

  private getLevelOrder(
    args: IItemClickEventArgs | IDoubleClickEventArgs | IMouseMoveEventArgs
  ): string[] | null {
    const details = this.getEventDetails(args);
    const levelOrderName = details.levelOrderName || details.item?.levelOrderName;

    if (levelOrderName) {
      return levelOrderName
        .split('#')
        .map((part) => part.trim())
        .filter(Boolean);
    }

    const groupName = details.item?.groupName || details.groupName;
    const itemName = details.item?.name || details.name;

    if (groupName && itemName && groupName !== itemName) {
      return [groupName, itemName];
    }

    if (groupName) {
      return [groupName];
    }

    if (itemName) {
      return [itemName];
    }

    return null;
  }

  private toggleTrackedLevelOrder(levelOrder: string[]): void {
    if (this.hasLevelOrder(levelOrder)) {
      this.selectedLevelOrders.update((items) =>
        items.filter(
          (existing) =>
            !(
              existing.length === levelOrder.length &&
              existing.every((value, index) => value === levelOrder[index])
            )
        )
      );
    } else {
      this.selectedLevelOrders.update((items) => [...items, levelOrder]);
    }
  }

  private hasLevelOrder(levelOrder: string[]): boolean {
    return this.selectedLevelOrders().some(
      (existing) =>
        existing.length === levelOrder.length &&
        existing.every((value, index) => value === levelOrder[index])
    );
  }
}
```

## Best Practices

### DO: Provide Visual Feedback for Selection

Use clearly distinct `fill` and `border` values in `selectionSettings` so selected items stand out immediately.

```typescript
public selectionSettings = {
  enable: true,
  fill: '#0066cc',
  border: { color: '#000000', width: 2 }
};
```

### DON'T: Use Similar Colors for Selection and Highlight

Selection and hover highlight should look different enough that users can tell whether an item is merely hovered or actually selected.

```typescript
public selectionSettings = {
  enable: true,
  fill: '#0066cc',
  border: { color: '#000000', width: 2 }
};

public highlightSettings = {
  enable: true,
  fill: '#ffcc00',
  border: { color: '#ff9900', width: 2 }
};
```

### DO: Show Count of Selected Items

Maintain a signal or derived state value and update the selected count from your application selection flow.

```typescript
public selectedCount = computed(() => this.selectedLevelOrders().length);
```

### DO: Provide Clear Selection Actions

Provide clear Angular actions such as “Select group” and “Clear selection”.

```typescript
<button type="button" (click)="selectElectronicsGroup()">Select Electronics Group</button>
<button type="button" (click)="clearSelection()">Clear</button>
```

### DO: Handle Multiple Selection Properly

Track selected level-order paths in application state and update them through your click and programmatic selection logic.

### Troubleshooting

**Issue:** Selection is not working

**Solution:** Ensure selection is enabled and use the `selectionSettings` binding.

```typescript
public selectionSettings = {
  enable: true,
  fill: '#0066cc',
  border: { color: '#000000', width: 2 }
};
```

**Issue:** Highlight and selection look too similar

**Solution:** Use clearly contrasting colors for `selectionSettings.fill` and `highlightSettings.fill`.

```typescript
public selectionSettings = {
  enable: true,
  fill: '#0066cc'
};

public highlightSettings = {
  enable: true,
  fill: '#ffcc00'
};
```

**Issue:** Click or selection-related event is not firing

**Solution:** Use the event names `itemClick`, `doubleClick`, and `rightClick`.

```typescript
(itemClick)="onItemClick($event)"
(doubleClick)="onDoubleClick($event)"
(rightClick)="onRightClick($event)"
```

**Issue:** Programmatic selection code is not selecting the expected item

**Solution:** Use the correct level-order path with `selectItem(levelOrder, isSelected?)`.

```typescript
this.treemap?.selectItem(['Electronics', 'Laptop'], true);
```

