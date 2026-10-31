# API Reference - Splitter Component

Complete reference for Syncfusion Angular Splitter component properties, methods, and events with working code examples.

## Table of Contents

- [Component Properties](#component-properties)
- [Pane Properties](#pane-properties)
- [Methods](#methods)
- [Events](#events)
  - [Most Common Events](#most-common-events)
  - [All Events Reference](#all-events-reference)

---

## Component Properties

Properties available on the main `<ejs-splitter>` element for configuring the Splitter component.

### `orientation`

**Type:** `'Horizontal'` | `'Vertical'`  
**Default:** `'Horizontal'`  
**Description:** Specifies whether panes are arranged horizontally (left-to-right) or vertically (top-to-bottom).

```typescript
// Horizontal layout (default)
<ejs-splitter orientation="Horizontal" height="400px">
  <e-panes>
    <e-pane size="200px"><ng-template #content>Left</ng-template></e-pane>
    <e-pane><ng-template #content>Right</ng-template></e-pane>
  </e-panes>
</ejs-splitter>

// Vertical layout
<ejs-splitter orientation="Vertical" height="400px">
  <e-panes>
    <e-pane size="150px"><ng-template #content>Top</ng-template></e-pane>
    <e-pane><ng-template #content>Bottom</ng-template></e-pane>
  </e-panes>
</ejs-splitter>
```

### `height`

**Type:** `string` | `number`  
**Description:** Sets the height of the Splitter component. Accept pixel values (e.g., `'400px'`) or percentages (e.g., `'100%'`).

```typescript
// Fixed pixel height
<ejs-splitter height="500px" width="100%">
  <e-panes>
    <e-pane><ng-template #content>Content</ng-template></e-pane>
  </e-panes>
</ejs-splitter>

// Percentage height with numeric value
<ejs-splitter [height]="600" width="100%">
  <e-panes>
    <e-pane><ng-template #content>Content</ng-template></e-pane>
  </e-panes>
</ejs-splitter>
```

### `width`

**Type:** `string` | `number`  
**Description:** Sets the width of the Splitter component. Accept pixel values or percentages.

```typescript
// Full width responsive
<ejs-splitter width="100%" height="400px">
  <e-panes>
    <e-pane><ng-template #content>Content</ng-template></e-pane>
  </e-panes>
</ejs-splitter>

// Fixed pixel width
<ejs-splitter width="800px" height="400px">
  <e-panes>
    <e-pane><ng-template #content>Content</ng-template></e-pane>
  </e-panes>
</ejs-splitter>
```

### `paneSettings`

**Type:** `PanePropertiesModel[]`  
**Description:** Array of pane configuration objects defining properties for each pane (alternative to inline pane elements).

```typescript
import { Component } from '@angular/core';
import { PanePropertiesModel } from '@syncfusion/ej2-angular-layouts';

@Component({
  selector: 'app-splitter',
  template: `<ejs-splitter [paneSettings]="paneSettings" height="400px" width="100%"></ejs-splitter>`
})
export class SplitterComponent {
  public paneSettings: PanePropertiesModel[] = [
    { size: '250px', content: 'Left Pane', collapsible: true },
    { size: '250px', content: 'Right Pane', collapsible: false }
  ];
}
```

### `separatorSize`

**Type:** `number`  
**Default:** `null`  
**Description:** Specifies the width (horizontal) or height (vertical) of the separator line in pixels.

```typescript
// Custom separator size
<ejs-splitter height="400px" width="100%" [separatorSize]="8">
  <e-panes>
    <e-pane size="250px"><ng-template #content>Left</ng-template></e-pane>
    <e-pane><ng-template #content>Right</ng-template></e-pane>
  </e-panes>
</ejs-splitter>

// Thick separator for easier interaction
<ejs-splitter height="400px" width="100%" [separatorSize]="12">
  <e-panes>
    <e-pane size="200px"><ng-template #content>Pane 1</ng-template></e-pane>
    <e-pane><ng-template #content>Pane 2</ng-template></e-pane>
  </e-panes>
</ejs-splitter>
```

### `enabled`

**Type:** `boolean`  
**Default:** `true`  
**Description:** Enables or disables the entire Splitter component. When disabled, users cannot interact with panes or separators.

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-splitter',
  template: `
    <button (click)="toggleEnabled()">Toggle Splitter</button>
    <ejs-splitter [enabled]="isEnabled" height="400px" width="100%">
      <e-panes>
        <e-pane><ng-template #content>Content</ng-template></e-pane>
      </e-panes>
    </ejs-splitter>
  `
})
export class SplitterComponent {
  isEnabled = true;

  toggleEnabled() {
    this.isEnabled = !this.isEnabled;
  }
}
```

### `enableRtl`

**Type:** `boolean`  
**Default:** `false`  
**Description:** Enables right-to-left (RTL) layout for languages like Arabic, Hebrew, and Persian.

```typescript
// RTL support for Arabic
<ejs-splitter [enableRtl]="true" height="400px" width="100%">
  <e-panes>
    <e-pane size="250px"><ng-template #content>القائمة</ng-template></e-pane>
    <e-pane><ng-template #content>المحتوى</ng-template></e-pane>
  </e-panes>
</ejs-splitter>

// Dynamic RTL toggle
import { Component } from '@angular/core';

@Component({
  selector: 'app-rtl-splitter',
  template: `
    <button (click)="toggleRTL()">Toggle RTL</button>
    <ejs-splitter [enableRtl]="isRTL" height="400px" width="100%">
      <e-panes>
        <e-pane size="200px"><ng-template #content>Navigation</ng-template></e-pane>
        <e-pane><ng-template #content>Content</ng-template></e-pane>
      </e-panes>
    </ejs-splitter>
  `
})
export class RtlSplitterComponent {
  isRTL = false;

  toggleRTL() {
    this.isRTL = !this.isRTL;
  }
}
```

### `enableReversePanes`

**Type:** `boolean`  
**Default:** `true`  
**Description:** When enabled, reorders panes in the splitter (useful for responsive layouts).

```typescript
<ejs-splitter [enableReversePanes]="false" height="400px" width="100%">
  <e-panes>
    <e-pane size="250px"><ng-template #content>Pane 1</ng-template></e-pane>
    <e-pane size="250px"><ng-template #content>Pane 2</ng-template></e-pane>
    <e-pane><ng-template #content>Pane 3</ng-template></e-pane>
  </e-panes>
</ejs-splitter>
```

### `enablePersistence`

**Type:** `boolean`  
**Default:** `false`  
**Description:** Persists component state (pane sizes, collapsed state) in browser localStorage across page reloads.

```typescript
// Persist splitter state
<ejs-splitter [enablePersistence]="true" height="400px" width="100%" id="splitter">
  <e-panes>
    <e-pane size="250px"><ng-template #content>Left</ng-template></e-pane>
    <e-pane><ng-template #content>Right</ng-template></e-pane>
  </e-panes>
</ejs-splitter>

// Component will restore pane sizes on page reload
```

### `enableHtmlSanitizer`

**Type:** `boolean`  
**Default:** `true`  
**Description:** Enables HTML sanitization to prevent cross-site scripting (XSS) attacks in pane content. See [Security Best Practices](security-best-practices.md) for details.

```typescript
// Enable sanitization (default, recommended)
<ejs-splitter [enableHtmlSanitizer]="true" height="400px" width="100%">
  <e-panes>
    <e-pane [content]="'<strong>Safe Content</strong>'"></e-pane>
  </e-panes>
</ejs-splitter>

// Disable sanitization (ONLY for trusted content)
<ejs-splitter [enableHtmlSanitizer]="false" height="400px" width="100%">
  <e-panes>
    <e-pane [content]="trustedHtmlContent"></e-pane>
  </e-panes>
</ejs-splitter>
```

### `locale`

**Type:** `string`  
**Default:** `'en-US'`  
**Description:** Specifies the locale for the component, affecting text direction and formatting for internationalization.

```typescript
// Spanish locale
<ejs-splitter locale="es" height="400px" width="100%">
  <e-panes>
    <e-pane><ng-template #content>Contenido</ng-template></e-pane>
  </e-panes>
</ejs-splitter>

// Arabic locale with RTL
<ejs-splitter locale="ar" [enableRtl]="true" height="400px" width="100%">
  <e-panes>
    <e-pane><ng-template #content>المحتوى</ng-template></e-pane>
  </e-panes>
</ejs-splitter>
```

### `cssClass`

**Type:** `string`  
**Description:** Applies custom CSS class(es) to the root element of the Splitter for custom styling.

```typescript
// Single custom class
<ejs-splitter cssClass="custom-splitter" height="400px" width="100%">
  <e-panes>
    <e-pane><ng-template #content>Content</ng-template></e-pane>
  </e-panes>
</ejs-splitter>

// Multiple classes
<ejs-splitter cssClass="custom-splitter dark-theme premium" height="400px" width="100%">
  <e-panes>
    <e-pane><ng-template #content>Content</ng-template></e-pane>
  </e-panes>
</ejs-splitter>

// CSS
<style>
.custom-splitter {
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.custom-splitter.dark-theme {
  background-color: #1e1e1e;
  color: #ffffff;
}
</style>
```

---

## Pane Properties

Properties available on each `<e-pane>` element for configuring individual panes.

### `size`

**Type:** `string`  
**Description:** Sets the initial size of the pane in pixels (`'200px'`), percentages (`'30%'`), or auto-sizing.

```typescript
// Fixed pixel size
<e-pane size="250px"><ng-template #content>Sidebar</ng-template></e-pane>

// Percentage of container
<e-pane size="30%"><ng-template #content>Left Panel</ng-template></e-pane>

// Auto-sizing (flexible)
<e-pane><ng-template #content>Main Content</ng-template></e-pane>

// Mixed sizing example
<ejs-splitter height="400px" width="100%">
  <e-panes>
    <e-pane size="200px"><ng-template #content>Fixed Sidebar</ng-template></e-pane>
    <e-pane size="50%"><ng-template #content>Main (50%)</ng-template></e-pane>
    <e-pane><ng-template #content>Flexible</ng-template></e-pane>
  </e-panes>
</ejs-splitter>
```

### `min`

**Type:** `string`  
**Description:** Sets the minimum size a pane can be resized to, preventing it from becoming too small. Use pixels or percentages.

```typescript
// Minimum 100 pixels
<e-pane size="250px" min="100px"><ng-template #content>Content</ng-template></e-pane>

// Minimum 15% of container
<e-pane size="30%" min="15%"><ng-template #content>Panel</ng-template></e-pane>

// Comprehensive example with constraints
<ejs-splitter height="400px" width="100%">
  <e-panes>
    <e-pane size="250px" min="150px" max="400px">
      <ng-template #content>Constrained Pane</ng-template>
    </e-pane>
    <e-pane min="200px">
      <ng-template #content>Main Content</ng-template>
    </e-pane>
  </e-panes>
</ejs-splitter>
```

### `max`

**Type:** `string`  
**Description:** Sets the maximum size a pane can be resized to. Use pixels or percentages.

```typescript
// Maximum 500 pixels
<e-pane size="300px" max="500px"><ng-template #content>Content</ng-template></e-pane>

// Maximum 60% of container
<e-pane size="40%" max="60%"><ng-template #content>Panel</ng-template></e-pane>

// Sidebar with constraints
<ejs-splitter height="400px" width="100%">
  <e-panes>
    <e-pane size="250px" min="100px" max="350px">
      <ng-template #content>Constrained Sidebar</ng-template>
    </e-pane>
    <e-pane>
      <ng-template #content>Main Content</ng-template>
    </e-pane>
  </e-panes>
</ejs-splitter>
```

### `resizable`

**Type:** `boolean`  
**Default:** `true`  
**Description:** Enables or disables resizing for the specific pane. Fixed panes cannot be dragged.

```typescript
// Non-resizable sidebar (fixed)
<ejs-splitter height="400px" width="100%">
  <e-panes>
    <e-pane size="250px" [resizable]="false">
      <ng-template #content>Fixed Sidebar</ng-template>
    </e-pane>
    <e-pane [resizable]="true">
      <ng-template #content>Resizable Content</ng-template>
    </e-pane>
  </e-panes>
</ejs-splitter>

// All panes except first are resizable
<ejs-splitter height="400px" width="100%">
  <e-panes>
    <e-pane size="200px" [resizable]="false"><ng-template #content>Panel 1</ng-template></e-pane>
    <e-pane [resizable]="true"><ng-template #content>Panel 2</ng-template></e-pane>
    <e-pane [resizable]="true"><ng-template #content>Panel 3</ng-template></e-pane>
  </e-panes>
</ejs-splitter>
```

### `collapsible`

**Type:** `boolean`  
**Default:** `false`  
**Description:** Makes a pane collapsible by showing an expand/collapse icon in the separator. Users can click to hide/show the pane.

```typescript
// Collapsible panes
<ejs-splitter height="400px" width="100%">
  <e-panes>
    <e-pane size="200px" [collapsible]="true">
      <ng-template #content>Filters (Collapsible)</ng-template>
    </e-pane>
    <e-pane [collapsible]="true">
      <ng-template #content>Dashboard</ng-template>
    </e-pane>
  </e-panes>
</ejs-splitter>

// Mixed collapsible and fixed panes
<ejs-splitter height="500px" width="100%">
  <e-panes>
    <e-pane size="250px" [collapsible]="true">
      <ng-template #content>Left Sidebar (Collapsible)</ng-template>
    </e-pane>
    <e-pane [collapsible]="false">
      <ng-template #content>Main Content (Not Collapsible)</ng-template>
    </e-pane>
    <e-pane size="300px" [collapsible]="true">
      <ng-template #content>Right Panel (Collapsible)</ng-template>
    </e-pane>
  </e-panes>
</ejs-splitter>
```

### `collapsed`

**Type:** `boolean`  
**Default:** `false`  
**Description:** When `true`, the pane starts in a collapsed (hidden) state on component initialization.

```typescript
// Start with first pane collapsed
<ejs-splitter height="400px" width="100%">
  <e-panes>
    <e-pane size="200px" [collapsible]="true" [collapsed]="true">
      <ng-template #content>Initially Hidden</ng-template>
    </e-pane>
    <e-pane [collapsible]="true" [collapsed]="false">
      <ng-template #content>Initially Visible</ng-template>
    </e-pane>
  </e-panes>
</ejs-splitter>

// Component control
import { Component, ViewChild } from '@angular/core';
import { SplitterComponent } from '@syncfusion/ej2-angular-layouts';

@Component({
  selector: 'app-splitter',
  template: `
    <button (click)="togglePane()">Toggle First Pane</button>
    <ejs-splitter #splitter height="400px" width="100%">
      <e-panes>
        <e-pane size="200px" [collapsible]="true" [collapsed]="isCollapsed">
          <ng-template #content>Dynamic Pane</ng-template>
        </e-pane>
        <e-pane>
          <ng-template #content>Content</ng-template>
        </e-pane>
      </e-panes>
    </ejs-splitter>
  `
})
export class SplitterDemoComponent {
  @ViewChild('splitter') splitterRef!: SplitterComponent;
  isCollapsed = false;

  togglePane() {
    this.isCollapsed = !this.isCollapsed;
  }
}
```

### `content`

**Type:** `string` | `HTMLElement`  
**Description:** Specifies pane content as HTML string, plain text, or DOM element (alternative to ng-template).

```typescript
// String content
<e-pane content="<strong>HTML Content</strong>"></e-pane>

// Plain text
<e-pane content="Simple Text"></e-pane>

// Template content (recommended for complex layouts)
<e-pane>
  <ng-template #content>
    <div class="pane-content">
      <h3>Pane Title</h3>
      <p>Complex content with Angular bindings</p>
    </div>
  </ng-template>
</e-pane>

// Dynamic content from component
import { Component } from '@angular/core';

@Component({
  selector: 'app-splitter',
  template: `
    <ejs-splitter height="400px" width="100%">
      <e-panes>
        <e-pane [content]="dynamicContent"></e-pane>
      </e-panes>
    </ejs-splitter>
  `
})
export class SplitterComponent {
  dynamicContent = '<p>Dynamic HTML Content</p>';
}
```

### `cssClass`

**Type:** `string`  
**Description:** Applies custom CSS class(es) to individual pane elements for targeted styling.

```typescript
// Custom pane styling
<ejs-splitter height="400px" width="100%">
  <e-panes>
    <e-pane size="250px" cssClass="sidebar-pane">
      <ng-template #content>Sidebar</ng-template>
    </e-pane>
    <e-pane cssClass="main-pane highlighted">
      <ng-template #content>Main Content</ng-template>
    </e-pane>
  </e-panes>
</ejs-splitter>

// CSS
<style>
.sidebar-pane {
  background-color: #f5f5f5;
  padding: 15px;
  border-right: 1px solid #ddd;
}

.main-pane {
  background-color: #ffffff;
  padding: 20px;
}

.main-pane.highlighted {
  border: 2px solid #007bff;
}
</style>
```

---

## Methods

Public instance methods for programmatic control of the Splitter component. Access via ViewChild reference.

### `addPane(paneProperties, index)`

**Returns:** `void`  
**Description:** Dynamically adds a new pane at the specified index with given properties.

```typescript
import { Component, ViewChild } from '@angular/core';
import { SplitterComponent } from '@syncfusion/ej2-angular-layouts';
import { PanePropertiesModel } from '@syncfusion/ej2-angular-layouts';

@Component({
  selector: 'app-splitter',
  template: `
    <button (click)="addNewPane()">Add Pane</button>
    <ejs-splitter #splitter height="400px" width="100%">
      <e-panes>
        <e-pane size="250px"><ng-template #content>Pane 1</ng-template></e-pane>
        <e-pane><ng-template #content>Pane 2</ng-template></e-pane>
      </e-panes>
    </ejs-splitter>
  `
})
export class SplitterComponent {
  @ViewChild('splitter') splitterRef!: SplitterComponent;

  // Add pane at end
  addNewPane() {
    const newPane: PanePropertiesModel = {
      size: '200px',
      content: '<div>New Pane</div>',
      collapsible: true
    };

    const index = this.splitterRef.paneSettings.length;
    this.splitterRef.addPane(newPane, index);
  }

  // Add pane at specific index
  addPaneAtIndex() {
    const newPane: PanePropertiesModel = {
      size: '150px',
      content: '<div>Inserted Pane</div>',
      min: '100px',
      max: '300px'
    };
    this.splitterRef.addPane(newPane, 1); // Insert at index 1
  }

  // Add pane with complex content
  addComplexPane() {
    const newPane: PanePropertiesModel = {
      size: '300px',
      content: '<h3>Dynamic Content</h3><p>Added at runtime</p>',
      collapsible: true,
      cssClass: 'new-pane'
    };
    const index = this.splitterRef.paneSettings.length;
    this.splitterRef.addPane(newPane, index);
  }
}
```

**Real-world Example - Tabbed Interface:**

```typescript
import { Component, ViewChild } from '@angular/core';
import { SplitterComponent } from '@syncfusion/ej2-angular-layouts';
import { PanePropertiesModel } from '@syncfusion/ej2-angular-layouts';

@Component({
  selector: 'app-tabbed-splitter',
  template: `
    <div>
      <input [(ngModel)]="newTabName" placeholder="Tab name" />
      <button (click)="addTab()">Add Tab</button>
    </div>
    <ejs-splitter #splitter orientation="Horizontal" height="400px" width="100%"></ejs-splitter>
  `
})
export class TabbedSplitterComponent {
  @ViewChild('splitter') splitterRef!: SplitterComponent;
  newTabName = '';
  tabCount = 0;

  addTab() {
    if (this.newTabName.trim()) {
      const tabPane: PanePropertiesModel = {
        size: '200px',
        content: `<div><strong>${this.newTabName}</strong><p>Content for tab ${++this.tabCount}</p></div>`,
        collapsible: true
      };
      const index = this.splitterRef.paneSettings.length;
      this.splitterRef.addPane(tabPane, index);
      this.newTabName = '';
    }
  }
}
```

### `removePane(index)`

**Returns:** `void`  
**Description:** Removes the pane at the specified index from the Splitter.

```typescript
import { Component, ViewChild } from '@angular/core';
import { SplitterComponent } from '@syncfusion/ej2-angular-layouts';

@Component({
  selector: 'app-splitter',
  template: `
    <button (click)="removeLast()">Remove Last Pane</button>
    <button (click)="removeFirst()">Remove First Pane</button>
    <ejs-splitter #splitter height="400px" width="100%">
      <e-panes>
        <e-pane size="200px"><ng-template #content>Pane 1</ng-template></e-pane>
        <e-pane size="200px"><ng-template #content>Pane 2</ng-template></e-pane>
        <e-pane><ng-template #content>Pane 3</ng-template></e-pane>
      </e-panes>
    </ejs-splitter>
  `
})
export class SplitterComponent {
  @ViewChild('splitter') splitterRef!: SplitterComponent;

  removeLast() {
    const paneCount = this.splitterRef.paneSettings.length;
    if (paneCount > 0) {
      this.splitterRef.removePane(paneCount - 1);
    }
  }

  removeFirst() {
    if (this.splitterRef.paneSettings.length > 0) {
      this.splitterRef.removePane(0);
    }
  }
}
```

**Real-world Example - Closable Tabs:**

```typescript
import { Component, ViewChild } from '@angular/core';
import { SplitterComponent } from '@syncfusion/ej2-angular-layouts';
import { PanePropertiesModel } from '@syncfusion/ej2-angular-layouts';

@Component({
  selector: 'app-closable-tabs',
  template: `
    <button (click)="addTab('New Tab')">Add Tab</button>
    <button (click)="closeLastTab()">Close Last Tab</button>
    <ejs-splitter #splitter orientation="Horizontal" height="400px" width="100%"></ejs-splitter>
  `
})
export class ClosableTabsComponent {
  @ViewChild('splitter') splitterRef!: SplitterComponent;

  tabCount = 0;

  addTab(name: string): void {
    const tabPane: PanePropertiesModel = {
      size: '200px',
      content: `
        <div style="display: flex; justify-content: space-between;">
          <span>${name} ${++this.tabCount}</span>
        </div>
      `,
      collapsible: true
    };

    const index = this.splitterRef.paneSettings.length;
    this.splitterRef.addPane(tabPane, index);
  }

  closeTab(index: number): void {
    if (index >= 0 && index < this.splitterRef.paneSettings.length) {
      this.splitterRef.removePane(index);
    }
  }

  closeLastTab(): void {
    const paneCount = this.splitterRef.paneSettings.length;
    if (paneCount > 0) {
      this.splitterRef.removePane(paneCount - 1);
    }
  }
}
```

### `expand(index)`

**Returns:** `void`  
**Description:** Expands (shows) a collapsed pane at the given index.

```typescript
import { Component, ViewChild } from '@angular/core';
import { SplitterComponent } from '@syncfusion/ej2-angular-layouts';

@Component({
  selector: 'app-splitter',
  template: `
    <button (click)="expandFirstPane()">Expand Pane 0</button>
    <ejs-splitter #splitter height="400px" width="100%">
      <e-panes>
        <e-pane size="200px" [collapsible]="true" [collapsed]="true">
          <ng-template #content>Pane 1 (Collapsed)</ng-template>
        </e-pane>
        <e-pane [collapsible]="true">
          <ng-template #content>Pane 2</ng-template>
        </e-pane>
      </e-panes>
    </ejs-splitter>
  `
})
export class SplitterComponent {
  @ViewChild('splitter') splitterRef!: SplitterComponent;

  expandFirstPane() {
    this.splitterRef.expand(0);
  }
}
```

### `collapse(index)`

**Returns:** `void`  
**Description:** Collapses (hides) an expanded pane at the given index.

```typescript
import { Component, ViewChild } from '@angular/core';
import { SplitterComponent } from '@syncfusion/ej2-angular-layouts';

@Component({
  selector: 'app-splitter',
  template: `
    <button (click)="collapseFirstPane()">Collapse Pane 0</button>
    <ejs-splitter #splitter height="400px" width="100%">
      <e-panes>
        <e-pane size="200px" [collapsible]="true">
          <ng-template #content>Pane 1</ng-template>
        </e-pane>
        <e-pane [collapsible]="true">
          <ng-template #content>Pane 2</ng-template>
        </e-pane>
      </e-panes>
    </ejs-splitter>
  `
})
export class SplitterComponent {
  @ViewChild('splitter') splitterRef!: SplitterComponent;

  collapseFirstPane() {
    this.splitterRef.collapse(0);
  }
}
```

---

## Events

The Splitter component emits events at various lifecycle and user interaction points. Subscribe using Angular's event binding syntax `(eventName)="handler($event)"`.

### Most Common Events

#### `created`

**Trigger:** After the Splitter component and all panes are initialized  
**Argument Type:** `Object`  
**Description:** Fired once when the component is fully created and ready for interaction.

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-splitter',
  template: `
    <ejs-splitter (created)="onCreated()" height="400px" width="100%">
      <e-panes>
        <e-pane><ng-template #content>Content</ng-template></e-pane>
      </e-panes>
    </ejs-splitter>
  `
})
export class SplitterComponent {
  onCreated() {
    console.log('Splitter created and ready');
    // Initialize custom logic, fetch data, etc.
  }
}
```

#### `resizing`

**Trigger:** While user is dragging the separator (continuous updates)  
**Argument Type:** `ResizingEventArgs`  
**Description:** Fired continuously while resizing occurs. Use to monitor pane size changes in real-time.

**ResizingEventArgs Properties:**
- `element` (HTMLElement): Root element of the resizing pane
- `event` (Event): Native DOM event object
- `index` (number[]): Index of resizing pane
- `pane` (HTMLElement[]): Pane elements
- `paneSize` (number[]): **Current pane sizes** during resize
- `separator` (HTMLElement): Separator element being dragged

```typescript
import { Component } from '@angular/core';
import { ResizingEventArgs } from '@syncfusion/ej2-angular-layouts';

@Component({
  selector: 'app-splitter',
  template: `
    <div>Current sizes: {{ paneSize }}</div>
    <ejs-splitter (resizing)="onResizing($event)" height="400px" width="100%">
      <e-panes>
        <e-pane size="250px"><ng-template #content>Left Pane</ng-template></e-pane>
        <e-pane><ng-template #content>Right Pane</ng-template></e-pane>
      </e-panes>
    </ejs-splitter>
  `
})
export class SplitterComponent {
  paneSize = '';

  onResizing(event: ResizingEventArgs) {
    console.log('Resizing in progress');
    console.log('Pane sizes:', event.paneSize);
    console.log('Pane index:', event.index);
    this.paneSize = event.paneSize?.join(', ') || '';
  }
}
```

#### `resizeStop`

**Trigger:** When user completes resizing (releases mouse)  
**Argument Type:** `ResizingEventArgs`  
**Description:** Fired when resize operation completes. Use to persist final pane sizes or trigger post-resize updates.

```typescript
import { Component } from '@angular/core';
import { ResizingEventArgs } from '@syncfusion/ej2-angular-layouts';

@Component({
  selector: 'app-splitter',
  template: `
    <ejs-splitter (resizeStop)="onResizeStop($event)" height="400px" width="100%">
      <e-panes>
        <e-pane size="250px"><ng-template #content>Left</ng-template></e-pane>
        <e-pane><ng-template #content>Right</ng-template></e-pane>
      </e-panes>
    </ejs-splitter>
  `
})
export class SplitterComponent {
  onResizeStop(event: ResizingEventArgs) {
    console.log('Resize completed');
    console.log('Final pane size:', event.paneSize);
    // Save final sizes to localStorage or server
    localStorage.setItem('paneSize', JSON.stringify(event.paneSize));
  }
}
```

#### `beforeExpand`

**Trigger:** Before a pane is expanded (can be prevented)  
**Argument Type:** `BeforeExpandEventArgs`  
**Description:** Fired before expand action. Set `cancel = true` in event handler to prevent expansion.

**BeforeExpandEventArgs Properties:**
- `cancel` (boolean): Set to `true` to prevent expansion
- `element` (HTMLElement): Root element after control created
- `event` (Event): Default event arguments
- `index` (number[]): Index of pane being expanded
- `pane` (HTMLElement[]): Pane elements
- `separator` (HTMLElement): Respective split-bar element

```typescript
import { Component } from '@angular/core';
import { BeforeExpandEventArgs } from '@syncfusion/ej2-angular-layouts';

@Component({
  selector: 'app-splitter',
  template: `
    <ejs-splitter (beforeExpand)="onBeforeExpand($event)" height="400px" width="100%">
      <e-panes>
        <e-pane size="200px" [collapsible]="true" [collapsed]="true">
          <ng-template #content>Pane 1</ng-template>
        </e-pane>
        <e-pane [collapsible]="true">
          <ng-template #content>Pane 2</ng-template>
        </e-pane>
      </e-panes>
    </ejs-splitter>
  `
})
export class SplitterComponent {
  onBeforeExpand(event: BeforeExpandEventArgs) {
    console.log('Before expand - index:', event.index);
    // Prevent expansion under certain conditions
    if (event.index && event.index[0] === 0) {
      // Allow only pane 0 to expand
      event.cancel = false;
    }
  }
}
```

#### `expanded`

**Trigger:** After a pane is successfully expanded  
**Argument Type:** `ExpandedEventArgs`  
**Description:** Fired after expand completes. Pane is now visible and fully rendered.

**ExpandedEventArgs Properties:**
- `element` (HTMLElement): Root element after control created
- `event` (Event): Default event arguments
- `index` (number[]): Index of expanded pane
- `pane` (HTMLElement[]): Pane elements
- `separator` (HTMLElement): Split-bar element

```typescript
import { Component } from '@angular/core';
import { ExpandedEventArgs } from '@syncfusion/ej2-angular-layouts';

@Component({
  selector: 'app-splitter',
  template: `
    <ejs-splitter (expanded)="onExpanded($event)" height="400px" width="100%">
      <e-panes>
        <e-pane size="200px" [collapsible]="true">
          <ng-template #content>Expandable Pane</ng-template>
        </e-pane>
        <e-pane [collapsible]="true">
          <ng-template #content>Content</ng-template>
        </e-pane>
      </e-panes>
    </ejs-splitter>
  `
})
export class SplitterComponent {
  onExpanded(event: ExpandedEventArgs) {
    console.log('Pane expanded - index:', event.index);
    console.log('Expanded element:', event.element);
    // Trigger animations or load content
  }
}
```

#### `beforeCollapse`

**Trigger:** Before a pane is collapsed (can be prevented)  
**Argument Type:** `BeforeExpandEventArgs`  
**Description:** Fired before collapse action. Set `cancel = true` to prevent collapse.

```typescript
import { Component } from '@angular/core';
import { BeforeExpandEventArgs } from '@syncfusion/ej2-angular-layouts';

@Component({
  selector: 'app-splitter',
  template: `
    <ejs-splitter (beforeCollapse)="onBeforeCollapse($event)" height="400px" width="100%">
      <e-panes>
        <e-pane size="200px" [collapsible]="true">
          <ng-template #content>Pane 1</ng-template>
        </e-pane>
        <e-pane [collapsible]="true">
          <ng-template #content>Pane 2</ng-template>
        </e-pane>
      </e-panes>
    </ejs-splitter>
  `
})
export class SplitterComponent {
  onBeforeCollapse(event: BeforeExpandEventArgs) {
    console.log('Before collapse - index:', event.index);
    // Validate before collapsing
    if (this.hasUnsavedChanges()) {
      event.cancel = true; // Prevent collapse if unsaved changes
      alert('Please save changes before collapsing');
    }
  }

  hasUnsavedChanges(): boolean {
    // Your validation logic
    return false;
  }
}
```

#### `collapsed`

**Trigger:** After a pane is successfully collapsed  
**Argument Type:** `ExpandedEventArgs`  
**Description:** Fired after collapse completes. Pane is now hidden.

```typescript
import { Component } from '@angular/core';
import { ExpandedEventArgs } from '@syncfusion/ej2-angular-layouts';

@Component({
  selector: 'app-splitter',
  template: `
    <ejs-splitter (collapsed)="onCollapsed($event)" height="400px" width="100%">
      <e-panes>
        <e-pane size="200px" [collapsible]="true">
          <ng-template #content>Collapsible Pane</ng-template>
        </e-pane>
        <e-pane [collapsible]="true">
          <ng-template #content>Content</ng-template>
        </e-pane>
      </e-panes>
    </ejs-splitter>
  `
})
export class SplitterComponent {
  onCollapsed(event: ExpandedEventArgs) {
    console.log('Pane collapsed - index:', event.index);
    // Cleanup or save state
  }
}
```

### All Events Reference

#### `resizeStart`

**Trigger:** When user starts dragging a separator  
**Argument Type:** `ResizeEventArgs`  
**Description:** Fired when resize begins (before `resizing` event).

**ResizeEventArgs Properties:**
- `cancel` (boolean): Set to `true` to prevent resize
- `element` (HTMLElement): Root element of resizing pane
- `event` (Event): Contains native DOM event
- `index` (number[]): Index of resizing pane
- `pane` (HTMLElement[]): Pane elements
- `separator` (HTMLElement): Separator element

```typescript
import { Component } from '@angular/core';
import { ResizeEventArgs } from '@syncfusion/ej2-angular-layouts';

@Component({
  selector: 'app-splitter',
  template: `
    <ejs-splitter (resizeStart)="onResizeStart($event)" height="400px" width="100%">
      <e-panes>
        <e-pane size="250px"><ng-template #content>Pane 1</ng-template></e-pane>
        <e-pane><ng-template #content>Pane 2</ng-template></e-pane>
      </e-panes>
    </ejs-splitter>
  `
})
export class SplitterComponent {
  onResizeStart(event: ResizeEventArgs) {
    console.log('Resize started at pane index:', event.index);
    // Prevent resize under conditions
    if (this.shouldPreventResize()) {
      event.cancel = true;
    }
  }

  shouldPreventResize(): boolean {
    return false; // Your logic
  }
}
```

#### `beforeSanitizeHtml`

**Trigger:** Before HTML content is sanitized for security  
**Argument Type:** `BeforeSanitizeHtmlArgs`  
**Description:** Fired when HTML is about to be sanitized. Allows custom sanitization logic. See [Security Best Practices](security-best-practices.md).

**BeforeSanitizeHtmlArgs Properties:**
- `cancel` (boolean): Prevent default sanitization
- `helper` (Function): Callback returning sanitized HTML string
- `selectors` (SanitizeSelectors): Block lists for tags/attributes

```typescript
import { Component } from '@angular/core';
import { BeforeSanitizeHtmlArgs } from '@syncfusion/ej2-angular-layouts';

@Component({
  selector: 'app-splitter',
  template: `
    <ejs-splitter (beforeSanitizeHtml)="onBeforeSanitize($event)" height="400px" width="100%">
      <e-panes>
        <e-pane [content]="htmlContent"></e-pane>
      </e-panes>
    </ejs-splitter>
  `
})
export class SplitterComponent {
  htmlContent = '<div><strong>Safe Content</strong></div>';

  onBeforeSanitize(event: BeforeSanitizeHtmlArgs) {
    console.log('HTML sanitization in progress');
    console.log('Blocked selectors:', event.selectors);
    // Custom sanitization if needed
    if (event.helper) {
      // Perform custom cleaning
      const cleaned = event.helper();
      console.log('Cleaned HTML:', cleaned);
    }
  }
}
```

---

## Complete Working Examples

### Example 1: Dashboard with All Events

```typescript
import { Component, ViewChild } from '@angular/core';
import { SplitterComponent, ResizingEventArgs, ExpandedEventArgs, BeforeExpandEventArgs } from '@syncfusion/ej2-angular-layouts';

@Component({
  selector: 'app-dashboard',
  template: `
    <div class="dashboard">
      <div class="event-log">
        <h4>Event Log</h4>
        <div>{{ eventMessages }}</div>
      </div>
      <ejs-splitter 
        #splitter
        height="500px" 
        width="100%"
        (created)="onCreated()"
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
              <div class="sidebar">Filters Panel</div>
            </ng-template>
          </e-pane>
          <e-pane [collapsible]="true">
            <ng-template #content>
              <div class="content">Dashboard Content</div>
            </ng-template>
          </e-pane>
          <e-pane size="300px" [collapsible]="true">
            <ng-template #content>
              <div class="details">Details Panel</div>
            </ng-template>
          </e-pane>
        </e-panes>
      </ejs-splitter>
    </div>
  `,
  styles: [`
    .event-log { margin-bottom: 10px; }
    .sidebar, .content, .details { padding: 15px; }
  `]
})
export class DashboardComponent {
  @ViewChild('splitter') splitterRef!: SplitterComponent;
  eventMessages = 'Waiting for events...';

  onCreated() {
    this.log('✓ Splitter created');
  }

  onResizing(event: ResizingEventArgs) {
    this.log(`▶ Resizing... Sizes: ${event.paneSize?.join(', ')}`);
  }

  onResizeStop(event: ResizingEventArgs) {
    this.log(`✓ Resize stopped at ${event.paneSize?.join(', ')}`);
  }

  onBeforeExpand(event: BeforeExpandEventArgs) {
    this.log(`? Before expand pane ${event.index?.[0]}`);
  }

  onExpanded(event: ExpandedEventArgs) {
    this.log(`✓ Pane ${event.index?.[0]} expanded`);
  }

  onBeforeCollapse(event: BeforeExpandEventArgs) {
    this.log(`? Before collapse pane ${event.index?.[0]}`);
  }

  onCollapsed(event: ExpandedEventArgs) {
    this.log(`✓ Pane ${event.index?.[0]} collapsed`);
  }

  log(message: string) {
    this.eventMessages = message + '\n' + this.eventMessages;
  }
}
```

---

**Reference:** For more information on specific features, see:
- [Dynamic Pane Manipulation](dynamic-manipulation.md) for `addPane()` and `removePane()` patterns
- [Security Best Practices](security-best-practices.md) for HTML sanitization
- [Content Loading](content-loading.md) for content property types
