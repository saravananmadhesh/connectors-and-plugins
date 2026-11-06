# Dynamic Pane Manipulation

Programmatically add, remove, and manage panes at runtime to create responsive, user-driven interfaces.

## Adding Panes

### Add Pane with addPane() Method

```typescript
import { Component, ViewChild } from '@angular/core';
import { SplitterModule, SplitterComponent, PanePropertiesModel } from '@syncfusion/ej2-angular-layouts';

@Component({
  selector: 'app-add-pane',
  standalone: true,
  imports: [SplitterModule],
  template: `
    <div style='margin-bottom: 20px'>
      <button class='e-btn' (click)='addPane()'>Add Pane</button>
      <p>Panes: {{ getPaneCount() }}</p>
    </div>

    <ejs-splitter #splitter height='250px' width='600px'>
      <e-panes>
        <e-pane size='150px'>
          <ng-template #content>
            <div class='content'>Pane 1</div>
          </ng-template>
        </e-pane>
        <e-pane size='150px'>
          <ng-template #content>
            <div class='content'>Pane 2</div>
          </ng-template>
        </e-pane>
      </e-panes>
    </ejs-splitter>
  `,
  styles: [`
    .content {
      padding: 15px;
      text-align: center;
    }

    button {
      padding: 8px 15px;
      background: #28a745;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }

    button:hover {
      background: #218838;
    }
  `]
})
export class AddPaneComponent {
  @ViewChild('splitter') splitterObj?: SplitterComponent;

  // Define new pane properties
  paneDetails: PanePropertiesModel = {
    size: '190px',
    content: 'New Pane',
    min: '30px',
    max: '250px'
  };

  addPane(): void {
    if (this.splitterObj) {
      // Add pane at index 1 (between first and second pane)
      this.splitterObj.addPane(this.paneDetails, 1);
    }
  }

  getPaneCount(): number {
    return this.splitterObj ? this.splitterObj.paneSettings.length : 0;
  }
}
```

### Add Pane with HTML Content

```typescript
paneDetails: PanePropertiesModel = {
  size: '150px',
  content: '<div style="padding: 15px; text-align: center;"><h4>New Panel</h4><p>Dynamically added</p></div>',
  min: '50px',
  max: '300px'
};

addPane(): void {
  this.splitterObj!.addPane(this.paneDetails, 0); // Add at beginning
}
```

### Add Pane with ng-template-like Content

```typescript
// Content as HTML string
paneDetails: PanePropertiesModel = {
  size: '200px',
  content: `
    <div style="padding: 20px;">
      <h3>Dynamic Pane</h3>
      <p>Added at runtime: ${new Date().toLocaleTimeString()}</p>
    </div>
  `,
  min: '100px'
};
```

### Insert at Specific Position

```typescript
addPane(): void {
  // Add at index 0 (beginning)
  this.splitterObj!.addPane(this.paneDetails, 0);
  
  // Add at index 1 (middle)
  this.splitterObj!.addPane(this.paneDetails, 1);
  
  // Add at end (no index = append)
  this.splitterObj!.addPane(this.paneDetails);
}
```

### Multiple Add Operations

```typescript
import { Component, ViewChild } from '@angular/core';
import { SplitterModule, SplitterComponent, PanePropertiesModel } from '@syncfusion/ej2-angular-layouts';

@Component({
  selector: 'app-multi-add',
  standalone: true,
  imports: [SplitterModule],
  template: `
    <button class='e-btn' (click)='addThreePanes()'>Add 3 Panes</button>
    <ejs-splitter #splitter height='300px' width='100%'>
      <e-panes>
        <e-pane size='150px'>
          <ng-template #content>
            <div class='content'>Initial Pane</div>
          </ng-template>
        </e-pane>
      </e-panes>
    </ejs-splitter>
  `,
  styles: [`
    button {
      padding: 10px 20px;
      margin-bottom: 10px;
      background: #007bff;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }

    .content {
      padding: 15px;
      text-align: center;
    }
  `]
})
export class MultiAddComponent {
  @ViewChild('splitter') splitterObj?: SplitterComponent;

  addThreePanes(): void {
    const panes: PanePropertiesModel[] = [
      { size: '100px', content: 'New Pane 1', min: '50px' },
      { size: '100px', content: 'New Pane 2', min: '50px' },
      { size: '100px', content: 'New Pane 3', min: '50px' }
    ];

    panes.forEach((pane, index) => {
      this.splitterObj!.addPane(pane, index + (this.splitterObj?.paneSettings.length || 0));
    });
  }
}
```

---

## Removing Panes

### Remove Pane with removePane() Method

```typescript
import { Component, ViewChild } from '@angular/core';
import { SplitterModule, SplitterComponent } from '@syncfusion/ej2-angular-layouts';

@Component({
  selector: 'app-remove-pane',
  standalone: true,
  imports: [SplitterModule],
  template: `
    <div style='margin-bottom: 20px'>
      <button class='e-btn' (click)='removePane()'>Remove Pane</button>
      <p>Panes: {{ getPaneCount() }}</p>
    </div>

    <ejs-splitter #splitter height='250px' width='600px'>
      <e-panes>
        <e-pane size='200px'>
          <ng-template #content>
            <div class='content'>Pane 1</div>
          </ng-template>
        </e-pane>
        <e-pane size='200px'>
          <ng-template #content>
            <div class='content'>Pane 2</div>
          </ng-template>
        </e-pane>
        <e-pane size='200px'>
          <ng-template #content>
            <div class='content'>Pane 3</div>
          </ng-template>
        </e-pane>
      </e-panes>
    </ejs-splitter>
  `,
  styles: [`
    .content {
      padding: 15px;
      text-align: center;
    }

    button {
      padding: 8px 15px;
      background: #dc3545;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }

    button:hover {
      background: #c82333;
    }
  `]
})
export class RemovePaneComponent {
  @ViewChild('splitter') splitterObj?: SplitterComponent;

  removePane(): void {
    if (this.splitterObj) {
      const paneCount = this.splitterObj.paneSettings.length;
      
      // Keep at least 1 pane
      if (paneCount > 1) {
        // Remove pane at index 1 (middle pane)
        this.splitterObj.removePane(1);
      } else {
        alert('Cannot remove last pane');
      }
    }
  }

  getPaneCount(): number {
    return this.splitterObj ? this.splitterObj.paneSettings.length : 0;
  }
}
```

### Remove by Index

```typescript
// Remove first pane (index 0)
this.splitterObj!.removePane(0);

// Remove middle pane (index 1)
this.splitterObj!.removePane(1);

// Remove last pane
const lastIndex = this.splitterObj!.paneSettings.length - 1;
this.splitterObj!.removePane(lastIndex);
```

### Conditional Removal

```typescript
removeLastPane(): void {
  const paneCount = this.splitterObj!.paneSettings.length;
  
  if (paneCount > 2) {
    this.splitterObj!.removePane(paneCount - 1);
  }
}

removeAllButFirst(): void {
  while (this.splitterObj!.paneSettings.length > 1) {
    this.splitterObj!.removePane(1);
  }
}
```

---

## Pane Constraints: Min & Max Sizes

### Add Pane with Constraints

```typescript
import { Component, ViewChild } from '@angular/core';
import { SplitterModule, SplitterComponent, PanePropertiesModel } from '@syncfusion/ej2-angular-layouts';

@Component({
  selector: 'app-constrained-pane',
  standalone: true,
  imports: [SplitterModule],
  template: `
    <button class='e-btn' (click)='addConstrainedPane()'>Add Constrained Pane</button>

    <ejs-splitter #splitter height='250px' width='600px'>
      <e-panes>
        <e-pane size='150px'>
          <ng-template #content>
            <div class='content'>Base Pane</div>
          </ng-template>
        </e-pane>
      </e-panes>
    </ejs-splitter>
  `,
  styles: [`
    .content {
      padding: 15px;
      text-align: center;
    }

    button {
      padding: 10px 20px;
      margin-bottom: 10px;
      background: #007bff;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
  `]
})
export class ConstrainedPaneComponent {
  @ViewChild('splitter') splitterObj?: SplitterComponent;

  paneDetails: PanePropertiesModel = {
    size: '150px',
    content: 'Constrained Pane',
    min: '60px',    // Can't shrink below 60px
    max: '300px'    // Can't grow beyond 300px
  };

  addConstrainedPane(): void {
    this.splitterObj!.addPane(this.paneDetails);
  }
}
```

### Percentage-Based Constraints

```typescript
paneDetails: PanePropertiesModel = {
  size: '30%',
  content: 'Responsive Pane',
  min: '15%',     // Minimum 15% of container
  max: '50%'      // Maximum 50% of container
};
```

---

## Real-World Examples

### Tabbed Interface with Dynamic Tabs

```typescript
import { Component, ViewChild } from '@angular/core';
import { SplitterModule, SplitterComponent, PanePropertiesModel } from '@syncfusion/ej2-angular-layouts';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dynamic-tabs',
  standalone: true,
  imports: [SplitterModule, CommonModule],
  template: `
    <div class='controls'>
      <input 
        [(ngModel)]='tabName' 
        placeholder='Tab name'
        (keyup.enter)='addTab()' />
      <button class='e-btn' (click)='addTab()'>Add Tab</button>
      <button class='e-btn' (click)='removeLastTab()' [disabled]='tabs.length <= 1'>
        Remove Last
      </button>
      <p>Total tabs: {{ tabs.length }}</p>
    </div>

    <ejs-splitter #splitter height='300px' width='100%'>
      <e-panes>
        <e-pane size='150px'>
          <ng-template #content>
            <div class='tab-list'>
              <div *ngFor='let tab of tabs; let i = index' class='tab-item'>
                <strong>{{ tab }}</strong>
              </div>
            </div>
          </ng-template>
        </e-pane>
        <e-pane>
          <ng-template #content>
            <div class='tab-content'>
              <p>Tab content goes here</p>
            </div>
          </ng-template>
        </e-pane>
      </e-panes>
    </ejs-splitter>
  `,
  styles: [`
    .controls {
      padding: 15px;
      background-color: #f5f5f5;
      margin-bottom: 10px;
      border-radius: 4px;
    }

    input {
      padding: 8px;
      border: 1px solid #ddd;
      border-radius: 4px;
      margin-right: 10px;
    }

    button {
      padding: 8px 15px;
      background: #007bff;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      margin-right: 5px;
    }

    button:hover {
      background: #0056b3;
    }

    button:disabled {
      background: #ccc;
      cursor: not-allowed;
    }

    .tab-list {
      padding: 15px;
      background-color: #fafafa;
    }

    .tab-item {
      padding: 10px;
      border-bottom: 1px solid #eee;
      cursor: pointer;
    }

    .tab-item:hover {
      background-color: #e8e8e8;
    }

    .tab-content {
      padding: 20px;
    }
  `]
})
export class DynamicTabsComponent {
  @ViewChild('splitter') splitterObj?: SplitterComponent;
  
  tabName = '';
  tabs: string[] = ['Overview', 'Settings'];

  addTab(): void {
    if (this.tabName.trim()) {
      this.tabs.push(this.tabName);
      this.tabName = '';
    }
  }

  removeLastTab(): void {
    if (this.tabs.length > 1) {
      this.tabs.pop();
    }
  }
}
```

### Editor with Add/Remove Panes

```typescript
import { Component, ViewChild } from '@angular/core';
import { SplitterModule, SplitterComponent, PanePropertiesModel } from '@syncfusion/ej2-angular-layouts';

@Component({
  selector: 'app-editor-panes',
  standalone: true,
  imports: [SplitterModule],
  template: `
    <div class='toolbar'>
      <button class='e-btn' (click)='splitPane()'>Split View</button>
      <button class='e-btn' (click)='closePane()' [disabled]='getPaneCount() <= 1'>Close</button>
      <span>Views: {{ getPaneCount() }}</span>
    </div>

    <ejs-splitter #splitter height='400px' width='100%'>
      <e-panes>
        <e-pane size='300px' min='150px'>
          <ng-template #content>
            <div class='editor-pane'>
              <div class='editor-tab'>main.ts</div>
              <div class='editor-content'>
                <pre><code>import {{ bootstrapApplication }} from '@angular/platform-browser';
import {{ AppComponent }} from './app.component';</code></pre>
              </div>
            </div>
          </ng-template>
        </e-pane>
        <e-pane size='300px' min='150px'>
          <ng-template #content>
            <div class='editor-pane'>
              <div class='editor-tab'>app.component.ts</div>
              <div class='editor-content'>
                <pre><code>export class AppComponent {{
  title = 'My App';
}}</code></pre>
              </div>
            </div>
          </ng-template>
        </e-pane>
      </e-panes>
    </ejs-splitter>
  `,
  styles: [`
    .toolbar {
      display: flex;
      gap: 10px;
      align-items: center;
      padding: 15px;
      background-color: #f5f5f5;
      border-bottom: 1px solid #ddd;
    }

    button {
      padding: 8px 15px;
      background: #007bff;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }

    button:hover:not(:disabled) {
      background: #0056b3;
    }

    button:disabled {
      background: #ccc;
      cursor: not-allowed;
    }

    .editor-pane {
      display: flex;
      flex-direction: column;
      height: 100%;
    }

    .editor-tab {
      background-color: #f5f5f5;
      padding: 10px 15px;
      border-bottom: 1px solid #ddd;
      font-weight: bold;
    }

    .editor-content {
      flex: 1;
      overflow: auto;
      background-color: #1e1e1e;
      color: #d4d4d4;
      padding: 15px;
      font-family: 'Courier New', monospace;
    }

    pre {
      margin: 0;
    }
  `]
})
export class EditorPanesComponent {
  @ViewChild('splitter') splitterObj?: SplitterComponent;
  paneCounter = 2;

  splitPane(): void {
    this.paneCounter++;
    const newPane: PanePropertiesModel = {
      size: '300px',
      min: '150px',
      content: `
        <div style="padding: 15px; background: #fafafa;">
          <h4>Pane ${this.paneCounter}</h4>
          <p>Dynamically added editor pane</p>
        </div>
      `
    };

    this.splitterObj!.addPane(newPane);
  }

  closePane(): void {
    const count = this.getPaneCount();
    if (count > 1) {
      this.splitterObj!.removePane(count - 1);
    }
  }

  getPaneCount(): number {
    return this.splitterObj ? this.splitterObj.paneSettings.length : 0;
  }
}
```

---

## Best Practices

✓ Always check pane count before removing (keep at least 1 pane)
✓ Set sensible min/max constraints to prevent broken layouts
✓ Use size='auto' for flexible panes when adding dynamically
✓ Test performance with many dynamically added panes
✓ Clean up references when removing panes
✓ Consider user experience (animations, feedback)
✓ Provide undo/redo for complex multi-pane operations

---

## Methods & Events Reference

### Methods

The Splitter component provides the following public methods for programmatic control:

#### `addPane(paneProperties: PanePropertiesModel, index?: number): void`

Adds a new pane to the Splitter at the specified index or at the end.

**Parameters:**
- `paneProperties` (PanePropertiesModel): Configuration object for the new pane
- `index` (optional, number): Position to insert the pane (0-based). If omitted, pane is appended

**Example:**
```typescript
const newPane: PanePropertiesModel = {
  size: '200px',
  content: '<div>New Pane</div>',
  min: '100px',
  max: '400px',
  collapsible: true
};

// Add at end
this.splitterRef.addPane(newPane);

// Insert at index 1
this.splitterRef.addPane(newPane, 1);
```

#### `removePane(index: number): void`

Removes the pane at the specified index.

**Parameters:**
- `index` (number): 0-based index of pane to remove

**Example:**
```typescript
// Remove first pane
this.splitterRef.removePane(0);

// Remove last pane
const lastIndex = this.splitterRef.paneSettings.length - 1;
this.splitterRef.removePane(lastIndex);
```

#### `expand(index: number): void`

Expands (shows) a collapsed pane at the specified index.

**Parameters:**
- `index` (number): 0-based index of pane to expand

**Example:**
```typescript
// Expand first pane
this.splitterRef.expand(0);
```

#### `collapse(index: number): void`

Collapses (hides) an expanded pane at the specified index.

**Parameters:**
- `index` (number): 0-based index of pane to collapse

**Example:**
```typescript
// Collapse pane at index 1
this.splitterRef.collapse(1);
```

---

### Events

Subscribe to Splitter events using Angular's event binding `(eventName)="handler($event)"`.

#### `created`

**When it fires:** After the Splitter component and all panes are initialized and rendered  
**Argument:** Generic `Object`

```typescript
<ejs-splitter (created)="onCreated()">
  <e-panes>
    <e-pane><ng-template #content>Content</ng-template></e-pane>
  </e-panes>
</ejs-splitter>

onCreated() {
  console.log('Splitter component created and ready');
  // Initialize custom logic, fetch data, setup listeners
}
```

#### `resizeStart`

**When it fires:** When user begins dragging a separator (mouse down)  
**Argument:** `ResizeEventArgs`

**ResizeEventArgs Properties:**
- `cancel` (boolean): Set to `true` to prevent resize
- `element` (HTMLElement): Root element of resizing pane
- `event` (Event): Native DOM mouse event
- `index` (number[]): Index of pane being resized
- `pane` (HTMLElement[]): Pane DOM elements
- `separator` (HTMLElement): Separator element being dragged

```typescript
import { ResizeEventArgs } from '@syncfusion/ej2-angular-layouts';

onResizeStart(args: ResizeEventArgs) {
  console.log('Resize started for pane:', args.index);
  
  // Prevent resize if certain conditions met
  if (this.shouldLockResize()) {
    args.cancel = true;
  }
}
```

#### `resizing`

**When it fires:** Continuously while user is dragging separator (high frequency)  
**Argument:** `ResizingEventArgs`

**ResizingEventArgs Properties:**
- `element` (HTMLElement): Root element of resizing pane
- `event` (Event): Native DOM event
- `index` (number[]): Index of resizing pane
- `pane` (HTMLElement[]): Pane elements
- **`paneSize` (number[]):** Current pane sizes during resize operation
- `separator` (HTMLElement): Separator element

```typescript
import { ResizingEventArgs } from '@syncfusion/ej2-angular-layouts';

onResizing(args: ResizingEventArgs) {
  // Monitor pane sizes in real-time
  console.log('Current sizes:', args.paneSize);
  
  // Update UI or perform validations
  this.updatePaneSizeDisplay(args.paneSize);
}

updatePaneSizeDisplay(sizes: number[]) {
  this.displayedSizes = sizes.map(s => Math.round(s) + 'px').join(' | ');
}
```

#### `resizeStop`

**When it fires:** When user completes resize (releases mouse)  
**Argument:** `ResizingEventArgs`

**ResizingEventArgs Properties:** Same as `resizing` event

```typescript
import { ResizingEventArgs } from '@syncfusion/ej2-angular-layouts';

onResizeStop(args: ResizingEventArgs) {
  console.log('Resize completed');
  console.log('Final pane sizes:', args.paneSize);
  
  // Persist size to localStorage/server
  localStorage.setItem('splitterSizes', JSON.stringify(args.paneSize));
}
```

#### `beforeExpand`

**When it fires:** Just before a pane begins expanding (can be cancelled)  
**Argument:** `BeforeExpandEventArgs`

**BeforeExpandEventArgs Properties:**
- **`cancel` (boolean):** Set to `true` to prevent expansion
- `element` (HTMLElement): Root element
- `event` (Event): Default event arguments
- `index` (number[]): Index of pane being expanded
- `pane` (HTMLElement[]): Pane elements
- `separator` (HTMLElement): Split-bar element

```typescript
import { BeforeExpandEventArgs } from '@syncfusion/ej2-angular-layouts';

onBeforeExpand(args: BeforeExpandEventArgs) {
  console.log('Before expanding pane:', args.index);
  
  // Validate before allowing expand
  if (this.hasUnsavedChanges()) {
    args.cancel = true;
    alert('Please save changes first');
  }
}
```

#### `expanded`

**When it fires:** After a pane successfully expands (is now visible)  
**Argument:** `ExpandedEventArgs`

**ExpandedEventArgs Properties:**
- `element` (HTMLElement): Root element
- `event` (Event): Default event arguments
- `index` (number[]): Index of expanded pane
- `pane` (HTMLElement[]): Pane elements
- `separator` (HTMLElement): Split-bar element

```typescript
import { ExpandedEventArgs } from '@syncfusion/ej2-angular-layouts';

onExpanded(args: ExpandedEventArgs) {
  console.log('Pane expanded:', args.index);
  
  // Trigger animations or load deferred content
  this.loadPaneContent(args.index[0]);
}
```

#### `beforeCollapse`

**When it fires:** Just before a pane begins collapsing (can be cancelled)  
**Argument:** `BeforeExpandEventArgs`

**BeforeExpandEventArgs Properties:**
- **`cancel` (boolean):** Set to `true` to prevent collapse
- `element` (HTMLElement): Root element
- `event` (Event): Default event arguments
- `index` (number[]): Index of pane being collapsed
- `pane` (HTMLElement[]): Pane elements
- `separator` (HTMLElement): Split-bar element

```typescript
import { BeforeExpandEventArgs } from '@syncfusion/ej2-angular-layouts';

onBeforeCollapse(args: BeforeExpandEventArgs) {
  console.log('Before collapsing pane:', args.index);
  
  // Prevent collapse under conditions
  if (this.isOnlyVisiblePane(args.index[0])) {
    args.cancel = true;
    alert('Cannot collapse - this is the only visible pane');
  }
}
```

#### `collapsed`

**When it fires:** After a pane successfully collapses (is now hidden)  
**Argument:** `ExpandedEventArgs`

**ExpandedEventArgs Properties:**
- `element` (HTMLElement): Root element
- `event` (Event): Default event arguments
- `index` (number[]): Index of collapsed pane
- `pane` (HTMLElement[]): Pane elements
- `separator` (HTMLElement): Split-bar element

```typescript
import { ExpandedEventArgs } from '@syncfusion/ej2-angular-layouts';

onCollapsed(args: ExpandedEventArgs) {
  console.log('Pane collapsed:', args.index);
  
  // Cleanup or save state
  this.unloadPaneContent(args.index[0]);
  this.savePaneState();
}
```

#### `beforeSanitizeHtml`

**When it fires:** Before HTML content in panes is sanitized for security  
**Argument:** `BeforeSanitizeHtmlArgs`

**BeforeSanitizeHtmlArgs Properties:**
- `cancel` (boolean): Set to `true` to prevent default sanitization
- `helper` (Function): Callback for custom sanitization returning HTML string
- `selectors` (SanitizeSelectors): Object with tag/attribute blocklists

```typescript
import { BeforeSanitizeHtmlArgs } from '@syncfusion/ej2-angular-layouts';

onBeforeSanitizeHtml(args: BeforeSanitizeHtmlArgs) {
  console.log('HTML sanitization in progress');
  console.log('Blocked selectors:', args.selectors);
  
  // Custom sanitization if needed
  if (args.helper) {
    const sanitized = args.helper();
    console.log('Sanitized HTML:', sanitized);
  }
}
```

See [Security Best Practices](security-best-practices.md) for detailed sanitization examples.

---

### Complete Event Handling Example

```typescript
import { Component, ViewChild } from '@angular/core';
import { SplitterComponent, ResizingEventArgs, ExpandedEventArgs, BeforeExpandEventArgs, ResizeEventArgs } from '@syncfusion/ej2-angular-layouts';
import { SplitterModule } from '@syncfusion/ej2-angular-layouts';

@Component({
  selector: 'app-splitter-events',
  standalone: true,
  imports: [SplitterModule],
  template: `
    <div class="event-monitor">
      <h4>Event Monitor</h4>
      <div class="event-log">{{ eventLog }}</div>
    </div>

    <ejs-splitter 
      #splitter
      height="500px" 
      width="100%"
      (created)="onCreated()"
      (resizeStart)="onResizeStart($event)"
      (resizing)="onResizing($event)"
      (resizeStop)="onResizeStop($event)"
      (beforeExpand)="onBeforeExpand($event)"
      (expanded)="onExpanded($event)"
      (beforeCollapse)="onBeforeCollapse($event)"
      (collapsed)="onCollapsed($event)"
    >
      <e-panes>
        <e-pane size="250px" [collapsible]="true">
          <ng-template #content>
            <div class="pane-content">
              <h3>Left Panel</h3>
              <p>Drag separator to resize</p>
            </div>
          </ng-template>
        </e-pane>
        <e-pane [collapsible]="true">
          <ng-template #content>
            <div class="pane-content">
              <h3>Main Content</h3>
              <p>Watch events in monitor above</p>
            </div>
          </ng-template>
        </e-pane>
        <e-pane size="300px" [collapsible]="true">
          <ng-template #content>
            <div class="pane-content">
              <h3>Right Panel</h3>
              <p>All events logged above</p>
            </div>
          </ng-template>
        </e-pane>
      </e-panes>
    </ejs-splitter>
  `,
  styles: [`
    .event-monitor {
      margin-bottom: 10px;
      padding: 10px;
      background-color: #f5f5f5;
      border-radius: 4px;
    }

    .event-log {
      height: 80px;
      overflow-y: auto;
      background-color: white;
      border: 1px solid #ddd;
      padding: 8px;
      font-family: monospace;
      font-size: 11px;
      line-height: 1.4;
    }

    .pane-content {
      padding: 20px;
    }
  `]
})
export class SplitterEventsComponent {
  @ViewChild('splitter') splitterRef!: SplitterComponent;
  eventLog = 'Waiting for events...';

  private addLog(message: string) {
    const timestamp = new Date().toLocaleTimeString();
    this.eventLog = `[${timestamp}] ${message}\n` + this.eventLog;
  }

  onCreated() {
    this.addLog('✓ Splitter created');
  }

  onResizeStart(args: ResizeEventArgs) {
    this.addLog(`▶ Resize started - Pane: ${args.index?.[0]}`);
  }

  onResizing(args: ResizingEventArgs) {
    this.addLog(`◇ Resizing - Sizes: ${args.paneSize?.map(s => Math.round(s)).join(', ')}px`);
  }

  onResizeStop(args: ResizingEventArgs) {
    this.addLog(`✓ Resize stopped - Final: ${args.paneSize?.map(s => Math.round(s)).join(', ')}px`);
  }

  onBeforeExpand(args: BeforeExpandEventArgs) {
    this.addLog(`? Before expand - Pane: ${args.index?.[0]}`);
  }

  onExpanded(args: ExpandedEventArgs) {
    this.addLog(`✓ Expanded - Pane: ${args.index?.[0]}`);
  }

  onBeforeCollapse(args: BeforeExpandEventArgs) {
    this.addLog(`? Before collapse - Pane: ${args.index?.[0]}`);
  }

  onCollapsed(args: ExpandedEventArgs) {
    this.addLog(`✓ Collapsed - Pane: ${args.index?.[0]}`);
  }
}
```

---

**For comprehensive API reference including all properties, see:** [API Reference](api-reference.md)

