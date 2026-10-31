# Complete API Reference

## Table of Contents
- [Toolbar Component Properties](#toolbar-component-properties)
- [Toolbar Events](#toolbar-events) (5 events)
- [Toolbar Methods](#toolbar-methods) (7 methods)
- [Item Configuration Properties](#item-configuration-properties)
- [Types & Enums](#types--enums)
- [Complete API Examples](#complete-api-examples)

---

## Toolbar Component Properties

### allowKeyboard

Enables or disables keyboard interaction in the toolbar. When set to true, allows navigation using keyboard keys.

**Type:** `boolean`  
**Default:** `true`

```typescript
import { ToolbarModule } from '@syncfusion/ej2-angular-navigations';
import { Component } from '@angular/core';

@Component({
  imports: [ToolbarModule],
  standalone: true,
  selector: 'app-toolbar',
  template: `
    <ejs-toolbar [allowKeyboard]="isKeyboardEnabled">
      <e-items>
        <e-item text='Cut' id='cut'></e-item>
        <e-item text='Copy' id='copy'></e-item>
        <e-item text='Paste' id='paste'></e-item>
      </e-items>
    </ejs-toolbar>
    
    <button (click)="toggleKeyboard()">
      {{ isKeyboardEnabled ? 'Disable' : 'Enable' }} Keyboard
    </button>
  `
})
export class AppComponent {
  isKeyboardEnabled: boolean = true;

  toggleKeyboard() {
    this.isKeyboardEnabled = !this.isKeyboardEnabled;
  }
}
```

**Keyboard Shortcuts:**
- **Tab/Shift+Tab**: Navigate to next/previous item
- **Arrow Keys**: Move focus left/right within items
- **Enter/Space**: Activate focused button item
- **Home**: Move to first item
- **End**: Move to last item

---

### cssClass

Sets custom CSS classes to the root element of the toolbar for styling customization.

**Type:** `string`  
**Default:** `''`

```typescript
import { ToolbarModule } from '@syncfusion/ej2-angular-navigations';
import { Component } from '@angular/core';

@Component({
  imports: [ToolbarModule],
  standalone: true,
  selector: 'app-toolbar',
  template: `
    <ejs-toolbar cssClass="custom-toolbar dark-theme">
      <e-items>
        <e-item text='Home'></e-item>
        <e-item text='About'></e-item>
        <e-item text='Services'></e-item>
      </e-items>
    </ejs-toolbar>
  `,
  styles: [`
    :host ::ng-deep .custom-toolbar.dark-theme {
      background: #2c3e50;
      color: #ecf0f1;
    }
    
    :host ::ng-deep .custom-toolbar.dark-theme .e-toolbar-item .e-tbar-btn {
      color: #ecf0f1;
      border-color: #34495e;
    }
    
    :host ::ng-deep .custom-toolbar.dark-theme .e-toolbar-item .e-tbar-btn:hover {
      background: #34495e;
    }
  `]
})
export class AppComponent { }
```

---

### enableCollision

Controls popup collision detection. When enabled, adjusts popup positioning to avoid viewport overflow in Popup mode.

**Type:** `boolean`  
**Default:** `true`

```typescript
import { ToolbarModule } from '@syncfusion/ej2-angular-navigations';
import { Component } from '@angular/core';

@Component({
  imports: [ToolbarModule],
  standalone: true,
  selector: 'app-toolbar',
  template: `
    <ejs-toolbar 
      overflowMode="Popup" 
      [enableCollision]="collisionEnabled"
      width="300px">
      <e-items>
        <e-item text='Cut' overflow='Show'></e-item>
        <e-item text='Copy' overflow='Show'></e-item>
        <e-item text='Paste' overflow='Show'></e-item>
        <e-item type='Separator'></e-item>
        <e-item text='Bold' overflow='Hide'></e-item>
        <e-item text='Italic' overflow='Hide'></e-item>
        <e-item text='Underline' overflow='Hide'></e-item>
      </e-items>
    </ejs-toolbar>
    
    <div style="margin-top: 20px;">
      <label>
        <input type="checkbox" [checked]="collisionEnabled" 
               (change)="collisionEnabled = !collisionEnabled">
        Enable Collision Detection
      </label>
    </div>
  `
})
export class AppComponent {
  collisionEnabled: boolean = true;
}
```

---

### enableHtmlSanitizer

Controls HTML content sanitization. When enabled, prevents cross-site scripting (XSS) attacks by sanitizing HTML content.

**Type:** `boolean`  
**Default:** `true`

```typescript
import { ToolbarModule } from '@syncfusion/ej2-angular-navigations';
import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  imports: [ToolbarModule],
  standalone: true,
  selector: 'app-toolbar',
  template: `
    <ejs-toolbar [enableHtmlSanitizer]="sanitizeEnabled">
      <e-items>
        <!-- Safe HTML content -->
        <e-item template="<strong>Bold Text</strong>"></e-item>
        <!-- Template with script (will be sanitized if enabled) -->
        <e-item template="<span id='safe'>Safe Content</span>"></e-item>
      </e-items>
    </ejs-toolbar>
    
    <div style="margin-top: 20px;">
      <p>Sanitization: {{ sanitizeEnabled ? 'ENABLED' : 'DISABLED' }}</p>
      <button (click)="toggleSanitization()">
        {{ sanitizeEnabled ? 'Disable' : 'Enable' }} Sanitization
      </button>
    </div>
  `
})
export class AppComponent {
  sanitizeEnabled: boolean = true;

  toggleSanitization() {
    this.sanitizeEnabled = !this.sanitizeEnabled;
  }
}
```

---

### enablePersistence

Persists the toolbar state (item visibility, overflow state) between page reloads using browser localStorage.

**Type:** `boolean`  
**Default:** `false`

```typescript
import { ToolbarModule } from '@syncfusion/ej2-angular-navigations';
import { Component } from '@angular/core';

@Component({
  imports: [ToolbarModule],
  standalone: true,
  selector: 'app-toolbar',
  template: `
    <ejs-toolbar 
      id="persistToolbar"
      [enablePersistence]="true"
      overflowMode="Popup"
      width="300px">
      <e-items>
        <e-item text='Cut' overflow='Show' [visible]="true"></e-item>
        <e-item text='Copy' overflow='Show' [visible]="true"></e-item>
        <e-item text='Paste' overflow='Show' [visible]="true"></e-item>
        <e-item type='Separator' [visible]="true"></e-item>
        <e-item text='Bold' overflow='Hide' [visible]="true"></e-item>
        <e-item text='Italic' overflow='Hide' [visible]="true"></e-item>
      </e-items>
    </ejs-toolbar>
    
    <p>Toolbar state persisted. Refresh the page to verify state is maintained.</p>
  `
})
export class AppComponent { }
```

---

### enableRtl

Enables Right-to-Left (RTL) direction for the toolbar. Essential for Arabic, Hebrew, and other RTL languages.

**Type:** `boolean`  
**Default:** `false`

```typescript
import { ToolbarModule } from '@syncfusion/ej2-angular-navigations';
import { Component } from '@angular/core';

@Component({
  imports: [ToolbarModule],
  standalone: true,
  selector: 'app-toolbar',
  template: `
    <div [dir]="rtlEnabled ? 'rtl' : 'ltr'">
      <ejs-toolbar [enableRtl]="rtlEnabled">
        <e-items>
          <e-item text='صفحة' prefixIcon='e-icons e-home'></e-item>
          <e-item text='حول' prefixIcon='e-icons e-info'></e-item>
          <e-item text='خدمات' prefixIcon='e-icons e-settings'></e-item>
          <e-item text='اتصل' prefixIcon='e-icons e-phone' align='Right'></e-item>
        </e-items>
      </ejs-toolbar>
      
      <div style="margin-top: 20px;">
        <button (click)="rtlEnabled = !rtlEnabled">
          {{ rtlEnabled ? 'Switch to LTR' : 'Switch to RTL' }}
        </button>
      </div>
    </div>
  `,
  styles: [`
    :host ::ng-deep .e-rtl {
      direction: rtl;
    }
  `]
})
export class AppComponent {
  rtlEnabled: boolean = false;
}
```

---

### height

Specifies the height of the toolbar in pixels, percentages, or as a number (treated as pixels).

**Type:** `string | number`  
**Default:** `auto`

```typescript
import { ToolbarModule } from '@syncfusion/ej2-angular-navigations';
import { Component } from '@angular/core';

@Component({
  imports: [ToolbarModule],
  standalone: true,
  selector: 'app-toolbar',
  template: `
    <div>
      <h3>Height: {{ selectedHeight }}</h3>
      
      <ejs-toolbar [height]="selectedHeight">
        <e-items>
          <e-item text='Cut' prefixIcon='e-icons e-cut'></e-item>
          <e-item text='Copy' prefixIcon='e-icons e-copy'></e-item>
          <e-item text='Paste' prefixIcon='e-icons e-paste'></e-item>
        </e-items>
      </ejs-toolbar>
      
      <div style="margin-top: 20px;">
        <button (click)="selectedHeight = '40px'">Standard (40px)</button>
        <button (click)="selectedHeight = '60px'">Large (60px)</button>
        <button (click)="selectedHeight = '30px'">Compact (30px)</button>
        <button (click)="selectedHeight = '100%'">Full Height (100%)</button>
      </div>
    </div>
  `
})
export class AppComponent {
  selectedHeight: string | number = '40px';
}
```

---

### items

Array of item configuration objects that define toolbar items, their properties, and behavior.

**Type:** `ItemModel[]`  
**Default:** `[]`

```typescript
import { ToolbarModule } from '@syncfusion/ej2-angular-navigations';
import { Component } from '@angular/core';
import { ItemModel } from '@syncfusion/ej2-angular-navigations';

@Component({
  imports: [ToolbarModule],
  standalone: true,
  selector: 'app-toolbar',
  template: `
    <ejs-toolbar [items]="toolbarItems"></ejs-toolbar>
    
    <div style="margin-top: 20px;">
      <button (click)="addItem()">Add Item</button>
      <button (click)="removeLastItem()">Remove Last Item</button>
    </div>
  `
})
export class AppComponent {
  toolbarItems: ItemModel[] = [
    { text: 'Cut', prefixIcon: 'e-icons e-cut', tooltipText: 'Cut (Ctrl+X)' },
    { text: 'Copy', prefixIcon: 'e-icons e-copy', tooltipText: 'Copy (Ctrl+C)' },
    { text: 'Paste', prefixIcon: 'e-icons e-paste', tooltipText: 'Paste (Ctrl+V)' },
    { type: 'Separator' },
    { text: 'Undo', prefixIcon: 'e-icons e-undo', tooltipText: 'Undo' },
    { text: 'Redo', prefixIcon: 'e-icons e-redo', tooltipText: 'Redo' }
  ];

  addItem() {
    this.toolbarItems.push({
      text: `Item ${this.toolbarItems.length}`,
      prefixIcon: 'e-icons e-more'
    });
  }

  removeLastItem() {
    if (this.toolbarItems.length > 0) {
      this.toolbarItems.pop();
    }
  }
}
```

---

### locale

Sets the locale for the toolbar component. Affects text display and RTL direction.

**Type:** `string`  
**Default:** `'en-US'`

```typescript
import { ToolbarModule } from '@syncfusion/ej2-angular-navigations';
import { Component } from '@angular/core';

@Component({
  imports: [ToolbarModule],
  standalone: true,
  selector: 'app-toolbar',
  template: `
    <ejs-toolbar [locale]="currentLocale">
      <e-items>
        <e-item text='Home' prefixIcon='e-icons e-home'></e-item>
        <e-item text='Search' prefixIcon='e-icons e-search'></e-item>
        <e-item text='Settings' prefixIcon='e-icons e-settings' align='Right'></e-item>
      </e-items>
    </ejs-toolbar>
    
    <div style="margin-top: 20px;">
      <button (click)="currentLocale = 'en-US'">English (US)</button>
      <button (click)="currentLocale = 'de'">German</button>
      <button (click)="currentLocale = 'fr'">French</button>
      <button (click)="currentLocale = 'ar'">Arabic (RTL)</button>
    </div>
  `
})
export class AppComponent {
  currentLocale: string = 'en-US';
}
```

---

### overflowMode

Specifies how toolbar items are displayed when content exceeds container width.

**Type:** `OverflowMode` ('Scrollable' | 'Popup' | 'MultiRow' | 'Extended')  
**Default:** `'Scrollable'`

```typescript
import { ToolbarModule } from '@syncfusion/ej2-angular-navigations';
import { Component } from '@angular/core';
import { OverflowMode } from '@syncfusion/ej2-angular-navigations';

@Component({
  imports: [ToolbarModule],
  standalone: true,
  selector: 'app-toolbar',
  template: `
    <div>
      <h3>Overflow Mode: {{ currentMode }}</h3>
      
      <ejs-toolbar 
        [overflowMode]="currentMode"
        width="350px">
        <e-items>
          <e-item text='Cut' prefixIcon='e-icons e-cut' overflow='Show'></e-item>
          <e-item text='Copy' prefixIcon='e-icons e-copy' overflow='Show'></e-item>
          <e-item text='Paste' prefixIcon='e-icons e-paste' overflow='Show'></e-item>
          <e-item type='Separator'></e-item>
          <e-item text='Bold' prefixIcon='e-icons e-bold' overflow='Hide'></e-item>
          <e-item text='Italic' prefixIcon='e-icons e-italic' overflow='Hide'></e-item>
          <e-item text='Underline' prefixIcon='e-icons e-underline' overflow='Hide'></e-item>
          <e-item text='Font Color' prefixIcon='e-icons e-font-color' overflow='Hide'></e-item>
          <e-item text='Align Left' prefixIcon='e-icons e-align-left' overflow='None'></e-item>
          <e-item text='Align Center' prefixIcon='e-icons e-align-center' overflow='None'></e-item>
        </e-items>
      </ejs-toolbar>
      
      <div style="margin-top: 20px;">
        <button (click)="currentMode = 'Scrollable'">Scrollable</button>
        <button (click)="currentMode = 'Popup'">Popup</button>
        <button (click)="currentMode = 'MultiRow'">MultiRow</button>
        <button (click)="currentMode = 'Extended'">Extended</button>
      </div>
    </div>
  `
})
export class AppComponent {
  currentMode: OverflowMode = 'Scrollable';
}
```

---

### scrollStep

Defines the distance (in pixels) to scroll when clicking navigation arrows in Scrollable mode.

**Type:** `number`  
**Default:** `null`

```typescript
import { ToolbarModule } from '@syncfusion/ej2-angular-navigations';
import { Component } from '@angular/core';

@Component({
  imports: [ToolbarModule],
  standalone: true,
  selector: 'app-toolbar',
  template: `
    <div>
      <h3>Scroll Step: {{ scrollStepValue }}px</h3>
      
      <ejs-toolbar 
        width="300px"
        [scrollStep]="scrollStepValue">
        <e-items>
          <e-item text='Item 1' prefixIcon='e-icons e-cut'></e-item>
          <e-item text='Item 2' prefixIcon='e-icons e-copy'></e-item>
          <e-item text='Item 3' prefixIcon='e-icons e-paste'></e-item>
          <e-item text='Item 4' prefixIcon='e-icons e-undo'></e-item>
          <e-item text='Item 5' prefixIcon='e-icons e-redo'></e-item>
          <e-item text='Item 6' prefixIcon='e-icons e-bold'></e-item>
          <e-item text='Item 7' prefixIcon='e-icons e-italic'></e-item>
          <e-item text='Item 8' prefixIcon='e-icons e-underline'></e-item>
        </e-items>
      </ejs-toolbar>
      
      <div style="margin-top: 20px;">
        <button (click)="scrollStepValue = 30">Small (30px)</button>
        <button (click)="scrollStepValue = 50">Medium (50px)</button>
        <button (click)="scrollStepValue = 100">Large (100px)</button>
        <button (click)="scrollStepValue = 150">Extra Large (150px)</button>
      </div>
    </div>
  `
})
export class AppComponent {
  scrollStepValue: number = 50;
}
```

---

### width

Specifies the width of the toolbar in pixels, percentages, or as a number (treated as pixels).

**Type:** `string | number`  
**Default:** `'auto'`

```typescript
import { ToolbarModule } from '@syncfusion/ej2-angular-navigations';
import { Component } from '@angular/core';

@Component({
  imports: [ToolbarModule],
  standalone: true,
  selector: 'app-toolbar',
  template: `
    <div>
      <h3>Width: {{ selectedWidth }}</h3>
      
      <ejs-toolbar [width]="selectedWidth">
        <e-items>
          <e-item text='Home'></e-item>
          <e-item text='About'></e-item>
          <e-item text='Services'></e-item>
          <e-item text='Contact' align='Right'></e-item>
        </e-items>
      </ejs-toolbar>
      
      <div style="margin-top: 20px;">
        <button (click)="selectedWidth = '300px'">300px</button>
        <button (click)="selectedWidth = '500px'">500px</button>
        <button (click)="selectedWidth = '100%'">Full Width (100%)</button>
        <button (click)="selectedWidth = '80%'">80% Width</button>
      </div>
    </div>
  `
})
export class AppComponent {
  selectedWidth: string | number = '100%';
}
```

---

## Toolbar Events

### beforeCreate

Fires before the toolbar component is rendered. Use this event to modify toolbar configuration before initialization.

**Event Arguments:** `BeforeCreateArgs`
- `enableCollision` (boolean): Control popup collision detection before creation
- `name` (string): Event name ('beforeCreate')
- `scrollStep` (number): Configure scrolling distance before creation

```typescript
import { ToolbarModule } from '@syncfusion/ej2-angular-navigations';
import { Component } from '@angular/core';
import { BeforeCreateArgs } from '@syncfusion/ej2-angular-navigations';

@Component({
  imports: [ToolbarModule],
  standalone: true,
  selector: 'app-toolbar',
  template: `
    <ejs-toolbar (beforeCreate)="onBeforeCreate($event)">
      <e-items>
        <e-item text='Cut'></e-item>
        <e-item text='Copy'></e-item>
        <e-item text='Paste'></e-item>
      </e-items>
    </ejs-toolbar>
    
    <p>{{ beforeCreateMessage }}</p>
  `
})
export class AppComponent {
  beforeCreateMessage: string = '';

  onBeforeCreate(args: BeforeCreateArgs) {
    console.log('beforeCreate Event', args);
    
    // Modify configuration before toolbar creation
    args.scrollStep = 100;
    args.enableCollision = true;
    
    this.beforeCreateMessage = `Toolbar about to be created with scrollStep: ${args.scrollStep}px`;
  }
}
```

---

### clicked

Fires when a toolbar item is clicked. Use this event to handle item actions and prevent default behavior if needed.

**Event Arguments:** `ClickEventArgs`
- `cancel` (boolean): Set to true to prevent the click action
- `item` (ItemModel): The clicked item object with all its properties
- `name` (string): Event name ('clicked')
- `originalEvent` (Event): The native DOM event object

```typescript
import { ToolbarModule } from '@syncfusion/ej2-angular-navigations';
import { Component } from '@angular/core';
import { ClickEventArgs } from '@syncfusion/ej2-angular-navigations';

@Component({
  imports: [ToolbarModule],
  standalone: true,
  selector: 'app-toolbar',
  template: `
    <ejs-toolbar (clicked)="onToolbarClicked($event)">
      <e-items>
        <e-item text='Save' id='save' prefixIcon='e-icons e-save'></e-item>
        <e-item text='Delete' id='delete' prefixIcon='e-icons e-delete'></e-item>
        <e-item text='Edit' id='edit' prefixIcon='e-icons e-edit'></e-item>
      </e-items>
    </ejs-toolbar>
    
    <div style="margin-top: 20px;">
      <p>Clicked Item: {{ clickedItemText }}</p>
      <p>{{ clickMessage }}</p>
    </div>
  `
})
export class AppComponent {
  clickedItemText: string = 'None';
  clickMessage: string = '';

  onToolbarClicked(args: ClickEventArgs) {
    // Prevent deletion without confirmation
    if (args.item?.id === 'delete') {
      if (!confirm('Are you sure you want to delete?')) {
        args.cancel = true;
        this.clickMessage = 'Delete action cancelled';
        return;
      }
    }

    this.clickedItemText = args.item?.text || 'Unknown';
    this.clickMessage = `Item clicked: ${args.name}`;
    
    // Handle specific items
    switch (args.item?.id) {
      case 'save':
        this.clickMessage = 'Saving...';
        break;
      case 'delete':
        this.clickMessage = 'Deleting...';
        break;
      case 'edit':
        this.clickMessage = 'Editing...';
        break;
    }
  }
}
```

---

### created

Fires after the toolbar component is created and rendered. Use this event for post-initialization setup.

**Event Arguments:** `Event`
- Standard DOM Event object

```typescript
import { ToolbarModule } from '@syncfusion/ej2-angular-navigations';
import { Component, ViewChild } from '@angular/core';
import { ToolbarComponent } from '@syncfusion/ej2-angular-navigations';

@Component({
  imports: [ToolbarModule],
  standalone: true,
  selector: 'app-toolbar',
  template: `
    <ejs-toolbar (created)="onToolbarCreated()">
      <e-items>
        <e-item text='Item 1'></e-item>
        <e-item text='Item 2'></e-item>
        <e-item text='Item 3'></e-item>
      </e-items>
    </ejs-toolbar>
    
    <div style="margin-top: 20px;">
      <p>{{ creationMessage }}</p>
      <p>Toolbar Dimensions: {{ toolbarDimensions }}</p>
    </div>
  `
})
export class AppComponent {
  @ViewChild('toolbar') toolbarComponent!: ToolbarComponent;
  
  creationMessage: string = '';
  toolbarDimensions: string = '';

  onToolbarCreated() {
    this.creationMessage = 'Toolbar successfully created!';
    
    // Access toolbar element and get dimensions
    const toolbarElement = document.querySelector('.e-toolbar');
    if (toolbarElement) {
      const width = toolbarElement.clientWidth;
      const height = toolbarElement.clientHeight;
      this.toolbarDimensions =`W: ${width}px, H: ${height}px`;
    }
    
    console.log('Toolbar creation complete');
  }
}
```

---

### keyDown

Fires when keyboard interaction occurs on the toolbar (arrow keys, Tab, etc.). Use this event to handle custom keyboard behaviors and navigation.

**Event Arguments:** `KeyDownEventArgs`
- `cancel` (boolean): Set to true to prevent the default keyboard action
- `currentItem` (HTMLElement): The currently focused toolbar item element
- `name` (string): Event name ('keyDown')
- `nextItem` (HTMLElement): The next toolbar item element in navigation direction
- `originalEvent` (KeyboardEventArgs): The native keyboard event object

```typescript
import { ToolbarModule } from '@syncfusion/ej2-angular-navigations';
import { Component } from '@angular/core';
import { KeyDownEventArgs } from '@syncfusion/ej2-angular-navigations';

@Component({
  imports: [ToolbarModule],
  standalone: true,
  selector: 'app-toolbar',
  template: `
    <ejs-toolbar [allowKeyboard]="true" (keyDown)="onKeyDown($event)">
      <e-items>
        <e-item text='Cut' id='cut' prefixIcon='e-icons e-cut'></e-item>
        <e-item text='Copy' id='copy' prefixIcon='e-icons e-copy'></e-item>
        <e-item text='Paste' id='paste' prefixIcon='e-icons e-paste'></e-item>
        <e-item type='Separator'></e-item>
        <e-item text='Undo' id='undo' prefixIcon='e-icons e-undo'></e-item>
        <e-item text='Redo' id='redo' prefixIcon='e-icons e-redo'></e-item>
      </e-items>
    </ejs-toolbar>
    
    <div style="margin-top: 20px;">
      <p>Last Key Pressed: {{ lastKeyPressed }}</p>
      <p>Current Item: {{ currentItemText }}</p>
    </div>
  `
})
export class AppComponent {
  lastKeyPressed: string = 'None';
  currentItemText: string = 'None';

  onKeyDown(args: KeyDownEventArgs) {
    const event = args.originalEvent as KeyboardEvent;
    
    // Log keyboard interactions
    this.lastKeyPressed = event.key;
    
    // Get current item text from button element
    const button = args.currentItem?.querySelector('.e-tbar-btn');
    if (button) {
      this.currentItemText = button.textContent || 'Unknown';
    }

    // Custom keyboard shortcut handling
    if (event.ctrlKey && event.key === 'z') {
      // Handle custom Ctrl+Z behavior
      console.log('Custom Undo action');
      args.cancel = true; // Prevent default behavior
    }

    if (event.ctrlKey && event.key === 'y') {
      // Handle custom Ctrl+Y behavior
      console.log('Custom Redo action');
      args.cancel = true;
    }

    // Log navigation
    if (event.key === 'ArrowRight' && args.nextItem) {
      console.log('Moving to next item:', args.nextItem);
    }
  }
}
```

---

### destroyed

Fires when the toolbar component is destroyed or removed from the DOM. Use this event for cleanup operations.

**Event Arguments:** `Event`
- Standard DOM Event object

```typescript
import { ToolbarModule } from '@syncfusion/ej2-angular-navigations';
import { Component } from '@angular/core';

@Component({
  imports: [ToolbarModule],
  standalone: true,
  selector: 'app-toolbar',
  template: `
    <div>
      <ejs-toolbar *ngIf="showToolbar" (destroyed)="onToolbarDestroyed()">
        <e-items>
          <e-item text='Save' id='save' prefixIcon='e-icons e-save'></e-item>
          <e-item text='Delete' id='delete' prefixIcon='e-icons e-delete'></e-item>
          <e-item text='Edit' id='edit' prefixIcon='e-icons e-edit'></e-item>
        </e-items>
      </ejs-toolbar>
      
      <div style="margin-top: 20px;">
        <button (click)="toggleToolbar()">
          {{ showToolbar ? 'Hide' : 'Show' }} Toolbar
        </button>
        <p>{{ destroyedMessage }}</p>
      </div>
    </div>
  `
})
export class AppComponent {
  showToolbar: boolean = true;
  destroyedMessage: string = '';

  toggleToolbar() {
    this.showToolbar = !this.showToolbar;
    if (!this.showToolbar) {
      this.destroyedMessage = '';
    }
  }

  onToolbarDestroyed() {
    // Cleanup operations
    this.destroyedMessage = 'Toolbar has been destroyed. Performing cleanup...';
    
    // Clear any cached data related to toolbar
    console.log('Toolbar destroyed - cleanup complete');
    
    // Unsubscribe from any observables
    // Close any open modals or popups
    // Restore scroll position or focus
  }
}
```

---

## Toolbar Methods

### addItems

Adds new items to the Toolbar. Accepts an array of items to be inserted at a specified index.

**Method Signature:**
```typescript
addItems(items: ItemModel[], index?: number): void
```

**Parameters:**
- `items` (ItemModel[]): Array of items to be added to the Toolbar
- `index` (number, optional): Position to insert items. Default is 0 (beginning)

```typescript
import { ToolbarModule } from '@syncfusion/ej2-angular-navigations';
import { Component, ViewChild } from '@angular/core';
import { ToolbarComponent, ItemModel } from '@syncfusion/ej2-angular-navigations';

@Component({
  imports: [ToolbarModule],
  standalone: true,
  selector: 'app-toolbar',
  template: `
    <ejs-toolbar #toolbar>
      <e-items>
        <e-item text='Cut' id='cut' prefixIcon='e-icons e-cut'></e-item>
        <e-item text='Copy' id='copy' prefixIcon='e-icons e-copy'></e-item>
      </e-items>
    </ejs-toolbar>
    
    <div style="margin-top: 20px;">
      <button (click)="addNewItems()">Add Items at End</button>
      <button (click)="addAtBeginning()">Add Items at Beginning</button>
      <p>{{ statusMessage }}</p>
    </div>
  `
})
export class AppComponent {
  @ViewChild('toolbar') toolbar!: ToolbarComponent;
  statusMessage: string = '';

  addNewItems() {
    const newItems: ItemModel[] = [
      { text: 'Paste', prefixIcon: 'e-icons e-paste' },
      { type: 'Separator' },
      { text: 'Undo', prefixIcon: 'e-icons e-undo' }
    ];
    
    // Add items at the end
    this.toolbar.addItems(newItems);
    this.statusMessage = 'Added items at the end';
  }

  addAtBeginning() {
    const newItems: ItemModel[] = [
      { text: 'New', prefixIcon: 'e-icons e-new' },
      { text: 'Open', prefixIcon: 'e-icons e-open' }
    ];
    
    // Add items at index 0 (beginning)
    this.toolbar.addItems(newItems, 0);
    this.statusMessage = 'Added items at the beginning';
  }
}
```

---

### destroy

Removes the toolbar component from the DOM and cleans up all related events. Use this method for proper cleanup when component is being destroyed.

**Method Signature:**
```typescript
destroy(): void
```

```typescript
import { ToolbarModule } from '@syncfusion/ej2-angular-navigations';
import { Component, ViewChild, OnDestroy } from '@angular/core';
import { ToolbarComponent } from '@syncfusion/ej2-angular-navigations';

@Component({
  imports: [ToolbarModule],
  standalone: true,
  selector: 'app-toolbar',
  template: `
    <div *ngIf="showToolbar">
      <ejs-toolbar #toolbar>
        <e-items>
          <e-item text='Item 1'></e-item>
          <e-item text='Item 2'></e-item>
        </e-items>
      </ejs-toolbar>
    </div>
    
    <button (click)="destroyToolbar()">Destroy Toolbar</button>
  `
})
export class AppComponent implements OnDestroy {
  @ViewChild('toolbar') toolbar!: ToolbarComponent;
  showToolbar: boolean = true;

  destroyToolbar() {
    // Properly destroy the toolbar component
    if (this.toolbar) {
      this.toolbar.destroy();
      this.showToolbar = false;
    }
  }

  ngOnDestroy() {
    // Cleanup when component is destroyed
    if (this.toolbar) {
      this.toolbar.destroy();
    }
  }
}
```

---

### disable

Enable or disable the entire Toolbar component. When disabled, all toolbar items become inactive.

**Method Signature:**
```typescript
disable(value: boolean): void
```

**Parameters:**
- `value` (boolean): true to disable, false to enable

```typescript
import { ToolbarModule } from '@syncfusion/ej2-angular-navigations';
import { Component, ViewChild } from '@angular/core';
import { ToolbarComponent } from '@syncfusion/ej2-angular-navigations';

@Component({
  imports: [ToolbarModule],
  standalone: true,
  selector: 'app-toolbar',
  template: `
    <ejs-toolbar #toolbar>
      <e-items>
        <e-item text='Cut' prefixIcon='e-icons e-cut'></e-item>
        <e-item text='Copy' prefixIcon='e-icons e-copy'></e-item>
        <e-item text='Paste' prefixIcon='e-icons e-paste'></e-item>
      </e-items>
    </ejs-toolbar>
    
    <div style="margin-top: 20px;">
      <button (click)="toggleDisable()">
        {{ isDisabled ? 'Enable' : 'Disable' }} Toolbar
      </button>
      <p>Toolbar is {{ isDisabled ? 'DISABLED' : 'ENABLED' }}</p>
    </div>
  `
})
export class AppComponent {
  @ViewChild('toolbar') toolbar!: ToolbarComponent;
  isDisabled: boolean = false;

  toggleDisable() {
    this.isDisabled = !this.isDisabled;
    this.toolbar.disable(this.isDisabled);
  }
}
```

---

### enableItems

Enable or disable specific toolbar items. Items can be referenced by index, HTMLElement, or NodeList.

**Method Signature:**
```typescript
enableItems(items: number | HTMLElement | NodeList, isEnable?: boolean): void
```

**Parameters:**
- `items` (number | HTMLElement | NodeList): Index, DOM element, or NodeList of items to enable/disable
- `isEnable` (boolean, optional): true to enable, false to disable. Default is true

```typescript
import { ToolbarModule } from '@syncfusion/ej2-angular-navigations';
import { Component, ViewChild } from '@angular/core';
import { ToolbarComponent } from '@syncfusion/ej2-angular-navigations';

@Component({
  imports: [ToolbarModule],
  standalone: true,
  selector: 'app-toolbar',
  template: `
    <ejs-toolbar #toolbar>
      <e-items>
        <e-item text='Cut' id='cut' prefixIcon='e-icons e-cut'></e-item>
        <e-item text='Copy' id='copy' prefixIcon='e-icons e-copy'></e-item>
        <e-item text='Paste' id='paste' prefixIcon='e-icons e-paste'></e-item>
        <e-item text='Undo' id='undo' prefixIcon='e-icons e-undo'></e-item>
      </e-items>
    </ejs-toolbar>
    
    <div style="margin-top: 20px;">
      <button (click)="togglePasteItem()">
        {{ pasteDisabled ? 'Enable' : 'Disable' }} Paste
      </button>
      <button (click)="disableByIndex(0)">Disable Cut (Index 0)</button>
      <button (click)="enableAll()">Enable All Items</button>
    </div>
  `
})
export class AppComponent {
  @ViewChild('toolbar') toolbar!: ToolbarComponent;
  pasteDisabled: boolean = false;

  togglePasteItem() {
    const pasteElement = document.getElementById('paste');
    this.pasteDisabled = !this.pasteDisabled;
    this.toolbar.enableItems(pasteElement, !this.pasteDisabled);
  }

  disableByIndex(index: number) {
    // Disable item at specific index
    this.toolbar.enableItems(index, false);
  }

  enableAll() {
    // Enable all toolbar items
    const allItems = document.querySelectorAll('.e-toolbar-item');
    this.toolbar.enableItems(allItems, true);
  }
}
```

---

### hideItem

Show or hide a specific toolbar item by index or element reference.

**Method Signature:**
```typescript
hideItem(index: number | HTMLElement | Element, value?: boolean): void
```

**Parameters:**
- `index` (number | HTMLElement | Element): Index or element reference of the item
- `value` (boolean, optional): true to hide, false to show. Default is false

```typescript
import { ToolbarModule } from '@syncfusion/ej2-angular-navigations';
import { Component, ViewChild } from '@angular/core';
import { ToolbarComponent } from '@syncfusion/ej2-angular-navigations';

@Component({
  imports: [ToolbarModule],
  standalone: true,
  selector: 'app-toolbar',
  template: `
    <ejs-toolbar #toolbar>
      <e-items>
        <e-item text='File' id='file' prefixIcon='e-icons e-folder'></e-item>
        <e-item text='Edit' id='edit' prefixIcon='e-icons e-edit'></e-item>
        <e-item text='View' id='view' prefixIcon='e-icons e-view'></e-item>
        <e-item text='Format' id='format' prefixIcon='e-icons e-format'></e-item>
        <e-item text='Tools' id='tools' prefixIcon='e-icons e-settings'></e-item>
      </e-items>
    </ejs-toolbar>
    
    <div style="margin-top: 20px;">
      <button (click)="toggleFormatItem()">
        {{ formatHidden ? 'Show' : 'Hide' }} Format Menu
      </button>
      <button (click)="hideByIndex(4)">Hide Tools Menu</button>
    </div>
  `
})
export class AppComponent {
  @ViewChild('toolbar') toolbar!: ToolbarComponent;
  formatHidden: boolean = false;

  toggleFormatItem() {
    const formatElement = document.getElementById('format');
    this.formatHidden = !this.formatHidden;
    this.toolbar.hideItem(formatElement, this.formatHidden);
  }

  hideByIndex(index: number) {
    // Hide item at specific index
    this.toolbar.hideItem(index, true);
  }
}
```

---

### refreshOverflow

Refresh the toolbar component without re-rendering. Useful after dynamically adding/removing items or changing the container size.

**Method Signature:**
```typescript
refreshOverflow(): void
```

```typescript
import { ToolbarModule } from '@syncfusion/ej2-angular-navigations';
import { Component, ViewChild } from '@angular/core';
import { ToolbarComponent, ItemModel } from '@syncfusion/ej2-angular-navigations';

@Component({
  imports: [ToolbarModule],
  standalone: true,
  selector: 'app-toolbar',
  template: `
    <div [style.width]="toolbarWidth">
      <ejs-toolbar #toolbar overflowMode="Popup">
        <e-items>
          <e-item text='Item 1'></e-item>
          <e-item text='Item 2'></e-item>
          <e-item text='Item 3'></e-item>
          <e-item text='Item 4'></e-item>
          <e-item text='Item 5'></e-item>
        </e-items>
      </ejs-toolbar>
    </div>
    
    <div style="margin-top: 20px;">
      <button (click)="narrowToolbar()">Narrow (300px)</button>
      <button (click)="normalToolbar()">Normal (600px)</button>
      <button (click)="wideToolbar()">Wide (800px)</button>
      <p>Width: {{ toolbarWidth }}</p>
    </div>
  `
})
export class AppComponent {
  @ViewChild('toolbar') toolbar!: ToolbarComponent;
  toolbarWidth: string = '600px';

  narrowToolbar() {
    this.toolbarWidth = '300px';
    // Refresh after width change to recalculate overflow
    setTimeout(() => this.toolbar.refreshOverflow(), 100);
  }

  normalToolbar() {
    this.toolbarWidth = '600px';
    setTimeout(() => this.toolbar.refreshOverflow(), 100);
  }

  wideToolbar() {
    this.toolbarWidth = '800px';
    setTimeout(() => this.toolbar.refreshOverflow(), 100);
  }
}
```

---

### removeItems

Remove one or more items from the toolbar by index, element reference, or array of items.

**Method Signature:**
```typescript
removeItems(args: number | HTMLElement | NodeList | Element | HTMLElement[]): void
```

**Parameters:**
- `args` (number | HTMLElement | NodeList | Element | HTMLElement[]): Index, DOM element, or array of elements to remove

```typescript
import { ToolbarModule } from '@syncfusion/ej2-angular-navigations';
import { Component, ViewChild } from '@angular/core';
import { ToolbarComponent } from '@syncfusion/ej2-angular-navigations';

@Component({
  imports: [ToolbarModule],
  standalone: true,
  selector: 'app-toolbar',
  template: `
    <ejs-toolbar #toolbar>
      <e-items>
        <e-item text='Cut' id='cut' prefixIcon='e-icons e-cut'></e-item>
        <e-item text='Copy' id='copy' prefixIcon='e-icons e-copy'></e-item>
        <e-item text='Paste' id='paste' prefixIcon='e-icons e-paste'></e-item>
        <e-item type='Separator' id='sep1'></e-item>
        <e-item text='Undo' id='undo' prefixIcon='e-icons e-undo'></e-item>
        <e-item text='Redo' id='redo' prefixIcon='e-icons e-redo'></e-item>
      </e-items>
    </ejs-toolbar>
    
    <div style="margin-top: 20px;">
      <button (click)="removeByIndex(0)">Remove Cut (Index 0)</button>
      <button (click)="removeByElement()">Remove Paste (Element)</button>
      <button (click)="removeMultiple()">Remove Undo & Redo</button>
      <button (click)="resetToolbar()">Reset Toolbar</button>
    </div>
  `
})
export class AppComponent {
  @ViewChild('toolbar') toolbar!: ToolbarComponent;

  removeByIndex(index: number) {
    this.toolbar.removeItems(index);
    console.log(`Item at index ${index} removed`);
  }

  removeByElement() {
    const pasteElement = document.getElementById('paste');
    if (pasteElement) {
      this.toolbar.removeItems(pasteElement);
      console.log('Paste item removed');
    }
  }

  removeMultiple() {
    const undoElement = document.getElementById('undo');
    const redoElement = document.getElementById('redo');
    
    if (undoElement && redoElement) {
      // Remove multiple elements
      this.toolbar.removeItems([undoElement, redoElement]);
      console.log('Multiple items removed');
    }
  }

  resetToolbar() {
    // Add items back
    this.toolbar.addItems([
      { text: 'Undo', id: 'undo', prefixIcon: 'e-icons e-undo' },
      { text: 'Redo', id: 'redo', prefixIcon: 'e-icons e-redo' }
    ]);
  }
}
```

---

## Item Configuration Properties

### align

Aligns the toolbar item to the left, center, or right side of the toolbar.

**Type:** `ItemAlign` ('Left' | 'Center' | 'Right')  
**Default:** `'Left'`

```typescript
import { ToolbarModule } from '@syncfusion/ej2-angular-navigations';
import { Component } from '@angular/core';

@Component({
  imports: [ToolbarModule],
  standalone: true,
  selector: 'app-toolbar',
  template: `
    <ejs-toolbar>
      <e-items>
        <e-item text='Home' align='Left'></e-item>
        <e-item text='About' align='Left'></e-item>
        <e-item text='Center Item' align='Center'></e-item>
        <e-item text='Search' align='Right'></e-item>
        <e-item text='Settings' align='Right'></e-item>
      </e-items>
    </ejs-toolbar>
  `
})
export class AppComponent { }
```

---

### cssClass

Adds custom CSS classes to individual toolbar items for styling.

**Type:** `string`  
**Default:** `''`

```typescript
import { ToolbarModule } from '@syncfusion/ej2-angular-navigations';
import { Component } from '@angular/core';

@Component({
  imports: [ToolbarModule],
  standalone: true,
  selector: 'app-toolbar',
  template: `
    <ejs-toolbar>
      <e-items>
        <e-item text='Primary' cssClass='primary-btn'></e-item>
        <e-item text='Success' cssClass='success-btn' type='Separator'></e-item>
        <e-item text='Danger' cssClass='danger-btn'></e-item>
      </e-items>
    </ejs-toolbar>
  `,
  styles: [`
    :host ::ng-deep .primary-btn.e-tbar-btn {
      background: #2196f3;
      color: white;
    }
    
    :host ::ng-deep .success-btn.e-tbar-btn {
      background: #4caf50;
      color: white;
    }
    
    :host ::ng-deep .danger-btn.e-tbar-btn {
      background: #f44336;
      color: white;
    }
  `]
})
export class AppComponent { }
```

---

### disabled

Disables the toolbar item, making it unclickable and visually grayed out.

**Type:** `boolean`  
**Default:** `false`

```typescript
import { ToolbarModule } from '@syncfusion/ej2-angular-navigations';
import { Component } from '@angular/core';
import { ItemModel } from '@syncfusion/ej2-angular-navigations';

@Component({
  imports: [ToolbarModule],
  standalone: true,
  selector: 'app-toolbar',
  template: `
    <ejs-toolbar [items]="toolbarItems"></ejs-toolbar>
    
    <div style="margin-top: 20px;">
      <button (click)="toggleDisabled('paste')">
        {{ isPasteDisabled ? 'Enable' : 'Disable' }} Paste
      </button>
    </div>
  `
})
export class AppComponent {
  isPasteDisabled: boolean = true;

  toolbarItems: ItemModel[] = [
    { text: 'Cut', prefixIcon: 'e-icons e-cut', disabled: false },
    { text: 'Copy', prefixIcon: 'e-icons e-copy', disabled: false },
    { text: 'Paste', id: 'paste', prefixIcon: 'e-icons e-paste', disabled: true }
  ];

  toggleDisabled(itemId: string) {
    const item = this.toolbarItems.find(i => i.id === itemId);
    if (item) {
      item.disabled = !item.disabled;
      if (itemId === 'paste') {
        this.isPasteDisabled = item.disabled;
      }
    }
  }
}
```

---

### htmlAttributes

Adds HTML attributes to the item element, supporting style, class, data attributes, etc.

**Type:** `{ [key: string]: string }`  
**Default:** `{}`

```typescript
import { ToolbarModule } from '@syncfusion/ej2-angular-navigations';
import { Component } from '@angular/core';

@Component({
  imports: [ToolbarModule],
  standalone: true,
  selector: 'app-toolbar',
  template: `
    <ejs-toolbar>
      <e-items>
        <e-item 
          text='Custom Item'
          [htmlAttributes]="{ 'data-test-id': 'custom-item', style: 'min-width: 150px;' }">
        </e-item>
        <e-item 
          text='Styled Item'
          [htmlAttributes]="{ style: 'background: #fff9c4; padding: 10px;' }">
        </e-item>
      </e-items>
    </ejs-toolbar>
  `
})
export class AppComponent { }
```

---

### id

Specifies a unique identifier for the toolbar item.

**Type:** `string`  
**Default:** `''`

```typescript
import { ToolbarModule } from '@syncfusion/ej2-angular-navigations';
import { Component } from '@angular/core';

@Component({
  imports: [ToolbarModule],
  standalone: true,
  selector: 'app-toolbar',
  template: `
    <ejs-toolbar (clicked)="onItemClick($event)">
      <e-items>
        <e-item text='Save' id='saveBtn'></e-item>
        <e-item text='Edit' id='editBtn'></e-item>
        <e-item text='Delete' id='deleteBtn'></e-item>
      </e-items>
    </ejs-toolbar>
  `
})
export class AppComponent {
  onItemClick(event: any) {
    console.log(`Clicked item ID: ${event.item?.id}`);
  }
}
```

---

### overflow

Controls where an item is displayed in Popup mode overflow.

**Type:** `OverflowOption` ('Show' | 'Hide' | 'None')  
**Default:** `'None'`

```typescript
import { ToolbarModule } from '@syncfusion/ej2-angular-navigations';
import { Component } from '@angular/core';

@Component({
  imports: [ToolbarModule],
  standalone: true,
  selector: 'app-toolbar',
  template: `
    <ejs-toolbar overflowMode="Popup" width="300px">
      <e-items>
        <!-- Always visible on toolbar -->
        <e-item text='Cut' overflow='Show' prefixIcon='e-icons e-cut'></e-item>
        <!-- Always visible in popup -->
        <e-item text='Copy' overflow='Hide' prefixIcon='e-icons e-copy'></e-item>
        <!-- Normal priority, moves to popup when needed -->
        <e-item text='Paste' overflow='None' prefixIcon='e-icons e-paste'></e-item>
        <!-- Normal priority -->
        <e-item text='Format' overflow='None' prefixIcon='e-icons e-format'></e-item>
      </e-items>
    </ejs-toolbar>
  `
})
export class AppComponent { }
```

---

### prefixIcon

Displays an icon before the item text.

**Type:** `string`  
**Default:** `''`

```typescript
import { ToolbarModule } from '@syncfusion/ej2-angular-navigations';
import { Component } from '@angular/core';

@Component({
  imports: [ToolbarModule],
  standalone: true,
  selector: 'app-toolbar',
  template: `
    <ejs-toolbar>
      <e-items>
        <e-item text='Home' prefixIcon='e-icons e-home'></e-item>
        <e-item text='Cut' prefixIcon='e-icons e-cut'></e-item>
        <e-item text='Copy' prefixIcon='e-icons e-copy'></e-item>
        <e-item text='Paste' prefixIcon='e-icons e-paste'></e-item>
        <e-item text='Bold' prefixIcon='e-icons e-bold'></e-item>
      </e-items>
    </ejs-toolbar>
  `
})
export class AppComponent { }
```

---

### suffixIcon

Displays an icon after the item text.

**Type:** `string`  
**Default:** `''`

```typescript
import { ToolbarModule } from '@syncfusion/ej2-angular-navigations';
import { Component } from '@angular/core';

@Component({
  imports: [ToolbarModule],
  standalone: true,
  selector: 'app-toolbar',
  template: `
    <ejs-toolbar>
      <e-items>
        <e-item text='Download' suffixIcon='e-icons e-download'></e-item>
        <e-item text='Upload' suffixIcon='e-icons e-upload'></e-item>
        <e-item text='Settings' suffixIcon='e-icons e-settings'></e-item>
      </e-items>
    </ejs-toolbar>
  `
})
export class AppComponent { }
```

---

### showAlwaysInPopup

Defines the priority of items to always display in popup. Maintains toolbar item on popup always but does not work for toolbar priority items.

**Type:** `boolean`  
**Default:** `false`

```typescript
import { ToolbarModule } from '@syncfusion/ej2-angular-navigations';
import { Component } from '@angular/core';

@Component({
  imports: [ToolbarModule],
  standalone: true,
  selector: 'app-toolbar',
  template: `
    <ejs-toolbar overflowMode="Popup" width="350px">
      <e-items>
        <e-item text='Cut' prefixIcon='e-icons e-cut' overflow='Show'></e-item>
        <e-item text='Copy' prefixIcon='e-icons e-copy' overflow='Show'></e-item>
        <e-item text='Paste' prefixIcon='e-icons e-paste' overflow='Show'></e-item>
        <e-item type='Separator'></e-item>
        <e-item 
          text='Always in Popup' 
          prefixIcon='e-icons e-more'
          [showAlwaysInPopup]="true"
          overflow='None'>
        </e-item>
        <e-item 
          text='Normal Item' 
          prefixIcon='e-icons e-settings'
          [showAlwaysInPopup]="false">
        </e-item>
      </e-items>
    </ejs-toolbar>
  `
})
export class AppComponent { }
```

---

### showTextOn

Specifies when item text is displayed in Popup mode.

**Type:** `DisplayMode` ('Toolbar' | 'Overflow' | 'Both')  
**Default:** `'Both'`

```typescript
import { ToolbarModule } from '@syncfusion/ej2-angular-navigations';
import { Component } from '@angular/core';

@Component({
  imports: [ToolbarModule],
  standalone: true,
  selector: 'app-toolbar',
  template: `
    <ejs-toolbar overflowMode="Popup" width="300px">
      <e-items>
        <e-item 
          text='Show Both' 
          showTextOn='Both'
          prefixIcon='e-icons e-cut'
          overflow='Show'>
        </e-item>
        <e-item 
          text='Only In Popup' 
          showTextOn='Overflow'
          prefixIcon='e-icons e-copy'
          overflow='Show'>
        </e-item>
        <e-item 
          text='Only On Toolbar' 
          showTextOn='Toolbar'
          prefixIcon='e-icons e-paste'
          overflow='Hide'>
        </e-item>
      </e-items>
    </ejs-toolbar>
  `
})
export class AppComponent { }
```

---

### tabIndex

Specifies the tab order for keyboard navigation.

**Type:** `number`  
**Default:** `0`

```typescript
import { ToolbarModule } from '@syncfusion/ej2-angular-navigations';
import { Component } from '@angular/core';

@Component({
  imports: [ToolbarModule],
  standalone: true,
  selector: 'app-toolbar',
  template: `
    <ejs-toolbar [allowKeyboard]="true">
      <e-items>
        <e-item text='Primary' [tabIndex]="1"></e-item>
        <e-item text='Secondary' [tabIndex]="2"></e-item>
        <e-item text='Tertiary' [tabIndex]="3"></e-item>
      </e-items>
    </ejs-toolbar>
    
    <p>Use Tab key to navigate items in order</p>
  `
})
export class AppComponent { }
```

---

### template

Renders custom HTML or Angular components as toolbar items.

**Type:** `string | object`  
**Default:** `undefined`

```typescript
import { ToolbarModule } from '@syncfusion/ej2-angular-navigations';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  imports: [ToolbarModule, FormsModule],
  standalone: true,
  selector: 'app-toolbar',
  template: `
    <ejs-toolbar>
      <e-items>
        <e-item text='Regular Item'></e-item>
        <e-item template="<input type='text' placeholder='Search...' style='padding: 5px;'></e-item>
        <e-item template="<select style='padding: 5px;'><option>All</option><option>Images</option><option>Videos</option></select>"></e-item>
      </e-items>
    </ejs-toolbar>
  `
})
export class AppComponent { }
```

---

### text

Specifies the text content displayed on the toolbar item.

**Type:** `string`  
**Default:** `''`

```typescript
import { ToolbarModule } from '@syncfusion/ej2-angular-navigations';
import { Component } from '@angular/core';

@Component({
  imports: [ToolbarModule],
  standalone: true,
  selector: 'app-toolbar',
  template: `
    <ejs-toolbar>
      <e-items>
        <e-item text='File'></e-item>
        <e-item text='Edit'></e-item>
        <e-item text='View'></e-item>
        <e-item text='Help' align='Right'></e-item>
      </e-items>
    </ejs-toolbar>
  `
})
export class AppComponent { }
```

---

### tooltipText

Specifies text displayed when hovering over the toolbar item.

**Type:** `string`  
**Default:** `''`

```typescript
import { ToolbarModule } from '@syncfusion/ej2-angular-navigations';
import { Component } from '@angular/core';

@Component({
  imports: [ToolbarModule],
  standalone: true,
  selector: 'app-toolbar',
  template: `
    <ejs-toolbar>
      <e-items>
        <e-item 
          text='Save'
          prefixIcon='e-icons e-save'
          tooltipText='Save Document (Ctrl+S)'>
        </e-item>
        <e-item 
          text='Delete'
          prefixIcon='e-icons e-delete'
          tooltipText='Delete Selected Item'>
        </e-item>
        <e-item 
          text='Settings'
          prefixIcon='e-icons e-settings'
          tooltipText='Open Settings'>
        </e-item>
      </e-items>
    </ejs-toolbar>
  `
})
export class AppComponent { }
```

---

### type

Specifies the type of toolbar item (Button, Separator, or Input).

**Type:** `ItemType` ('Button' | 'Separator' | 'Input')  
**Default:** `'Button'`

```typescript
import { ToolbarModule } from '@syncfusion/ej2-angular-navigations';
import { Component } from '@angular/core';

@Component({
  imports: [ToolbarModule],
  standalone: true,
  selector: 'app-toolbar',
  template: `
    <ejs-toolbar>
      <e-items>
        <e-item text='Cut' type='Button'></e-item>
        <e-item text='Copy' type='Button'></e-item>
        <e-item type='Separator'></e-item>
        <e-item text='Paste' type='Button'></e-item>
        <e-item type='Input' template="<input type='text' placeholder='Search...' />"></e-item>
      </e-items>
    </ejs-toolbar>
  `
})
export class AppComponent { }
```

---

### visible

Controls whether the toolbar item is visible or hidden.

**Type:** `boolean`  
**Default:** `true`

```typescript
import { ToolbarModule } from '@syncfusion/ej2-angular-navigations';
import { Component } from '@angular/core';
import { ItemModel } from '@syncfusion/ej2-angular-navigations';

@Component({
  imports: [ToolbarModule],
  standalone: true,
  selector: 'app-toolbar',
  template: `
    <ejs-toolbar [items]="toolbarItems"></ejs-toolbar>
    
    <div style="margin-top: 20px;">
      <label>
        <input type="checkbox" [checked]="showAdvanced" 
               (change)="toggleAdvancedOptions()">
        Show Advanced Options
      </label>
    </div>
  `
})
export class AppComponent {
  showAdvanced: boolean = false;

  toolbarItems: ItemModel[] = [
    { text: 'Cut', prefixIcon: 'e-icons e-cut', visible: true },
    { text: 'Copy', prefixIcon: 'e-icons e-copy', visible: true },
    { text: 'Paste', prefixIcon: 'e-icons e-paste', visible: true },
    { type: 'Separator', visible: true },
    { text: 'Advanced 1', visible: false },
    { text: 'Advanced 2', visible: false }
  ];

  toggleAdvancedOptions() {
    this.showAdvanced = !this.showAdvanced;
    this.toolbarItems.forEach((item, idx) => {
      if (idx > 3) {
        item.visible = this.showAdvanced;
      }
    });
  }
}
```

---

### width

Specifies the width of the toolbar item in pixels or percentage.

**Type:** `number | string`  
**Default:** `auto`

```typescript
import { ToolbarModule } from '@syncfusion/ej2-angular-navigations';
import { Component } from '@angular/core';

@Component({
  imports: [ToolbarModule],
  standalone: true,
  selector: 'app-toolbar',
  template: `
    <ejs-toolbar>
      <e-items>
        <e-item text='Short' width='60px'></e-item>
        <e-item text='Medium Width Item' width='150px'></e-item>
        <e-item text='Wide Item' width='250px'></e-item>
      </e-items>
    </ejs-toolbar>
  `
})
export class AppComponent { }
```

---

### click

Specifies a custom click event handler for individual toolbar items. When defined, executes the handler function when the item is clicked instead of relying solely on the toolbar's `clicked` event.

**Type:** `Function | string`  
**Default:** `undefined`

```typescript
import { ToolbarModule, ClickEventArgs } from '@syncfusion/ej2-angular-navigations';
import { Component } from '@angular/core';

@Component({
  imports: [ToolbarModule],
  standalone: true,
  selector: 'app-toolbar',
  template: `
    <ejs-toolbar>
      <e-items>
        <e-item
          id="save"
          text="Save"
          prefixIcon="e-icons e-save"
          (click)="handleClick($event)"
        >
        </e-item>

        <e-item
          id="delete"
          text="Delete"
          prefixIcon="e-icons e-delete"
          (click)="handleClick($event)"
        >
        </e-item>

        <e-item
          id="print"
          text="Print"
          prefixIcon="e-icons e-print"
          (click)="handleClick($event)"
        >
        </e-item>
      </e-items>
    </ejs-toolbar>

    <div style="margin-top: 20px;">
      <p>Last Action: {{ lastAction }}</p>
    </div>
  `
})
export class AppComponent {
  lastAction: string = 'None';

  handleClick(args: ClickEventArgs): void {
    const id = args.item?.id;

    switch (id) {
      case 'save':
        this.handleSave();
        break;
      case 'delete':
        this.handleDelete();
        break;
      case 'print':
        this.handlePrint();
        break;
      default:
        this.lastAction = 'Unknown action';
    }
  }

  handleSave(): void {
    this.lastAction = 'Saving document...';
    console.log('Save item clicked');
  }

  handleDelete(): void {
    if (confirm('Are you sure you want to delete?')) {
      this.lastAction = 'Item deleted';
      console.log('Delete confirmed');
    } else {
      this.lastAction = 'Delete cancelled';
    }
  }

  handlePrint(): void {
    this.lastAction = 'Printing document...';
    window.print();
  }
}
```

---

## Types & Enums

### ItemType

Enum for toolbar item types:

```typescript
enum ItemType {
  Button = 'Button',      // Standard clickable button
  Separator = 'Separator', // Visual divider line
  Input = 'Input'         // Input container for templates
}
```

### ItemAlign

Enum for item alignment:

```typescript
enum ItemAlign {
  Left = 'Left',      // Align to left
  Center = 'Center',  // Align to center
  Right = 'Right'     // Align to right
}
```

### OverflowMode

Enum for overflow behavior:

```typescript
enum OverflowMode {
  Scrollable = 'Scrollable',  // Horizontal scrolling with arrows
  Popup = 'Popup',            // Items move to dropdown popup
  MultiRow = 'MultiRow',      // Items wrap to multiple rows
  Extended = 'Extended'       // Items expand in next row with button
}
```

### OverflowOption

Enum for item overflow priority:

```typescript
enum OverflowOption {
  Show = 'Show',    // Always visible on toolbar
  Hide = 'Hide',    // Always visible in popup
  None = 'None'     // Normal priority (default)
}
```

### DisplayMode

Enum for text display in popup mode:

```typescript
enum DisplayMode {
  Toolbar = 'Toolbar',    // Text shown only on toolbar
  Overflow = 'Overflow',  // Text shown only in popup
  Both = 'Both'           // Text shown on both toolbar and popup
}
```

---

## Complete API Examples

### Example 1: Advanced Toolbar with All Features

```typescript
import { ToolbarModule } from '@syncfusion/ej2-angular-navigations';
import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { ToolbarComponent, ItemModel } from '@syncfusion/ej2-angular-navigations';

@Component({
  imports: [ToolbarModule, CommonModule],
  standalone: true,
  selector: 'app-toolbar',
  template: `
    <ejs-toolbar 
      #toolbar
      [allowKeyboard]="true"
      [enableRtl]="isRtl"
      cssClass="custom-toolbar"
      [overflowMode]="overflow"
      [width]="width"
      [height]="height"
      [items]="toolbarItems"
      (beforeCreate)="onBeforeCreate($event)"
      (clicked)="onClicked($event)"
      (created)="onCreated()">
    </ejs-toolbar>
    
    <div style="margin: 20px; padding: 20px; background: #f5f5f5;">
      <h3>Toolbar Status</h3>
      <p>Selected Item: {{ selectedItem }}</p>
      <p>Total Items: {{ toolbarItems.length }}</p>
      
      <div style="margin-top: 20px;">
        <button (click)="changeOverflow('Scrollable')">Scrollable</button>
        <button (click)="changeOverflow('Popup')">Popup</button>
        <button (click)="isRtl = !isRtl">Toggle RTL</button>
        <button (click)="addItem()">Add Item</button>
      </div>
    </div>
  `,
  styles: [`
    :host ::ng-deep .custom-toolbar {
      background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
    }
    
    :host ::ng-deep .custom-toolbar .e-tbar-btn {
      color: #fff;
      border: none;
    }
  `]
})
export class AppComponent {
  @ViewChild('toolbar') toolbarComponent!: ToolbarComponent;
  
  isRtl: boolean = false;
  overflow: string = 'Scrollable';
  width: string = '100%';
  height: string = '50px';
  selectedItem: string = 'None';

  toolbarItems: ItemModel[] = [
    { text: 'New', prefixIcon: 'e-icons e-new', id: 'new' },
    { text: 'Open', prefixIcon: 'e-icons e-open', id: 'open' },
    { text: 'Save', prefixIcon: 'e-icons e-save', id: 'save' },
    { type: 'Separator' },
    { text: 'Cut', prefixIcon: 'e-icons e-cut', id: 'cut' },
    { text: 'Copy', prefixIcon: 'e-icons e-copy', id: 'copy' },
    { text: 'Paste', prefixIcon: 'e-icons e-paste', id: 'paste', disabled: true },
    { type: 'Separator' },
    { text: 'Undo', prefixIcon: 'e-icons e-undo', id: 'undo' },
    { text: 'Redo', prefixIcon: 'e-icons e-redo', id: 'redo' },
    { text: 'Help', prefixIcon: 'e-icons e-help', align: 'Right', id: 'help' }
  ];

  onBeforeCreate(args: any) {
    console.log('Toolbar about to be created');
  }

  onClicked(args: any) {
    this.selectedItem = args.item?.text || 'Unknown';
  }

  onCreated() {
    console.log('Toolbar created successfully');
  }

  changeOverflow(mode: string) {
    this.overflow = mode;
  }

  addItem() {
    this.toolbarItems.push({
      text: `Item ${this.toolbarItems.length}`,
      prefixIcon: 'e-icons e-more'
    });
  }
}
```

---

### Example 2: Responsive Toolbar with Dynamic Configuration

```typescript
import { ToolbarModule } from '@syncfusion/ej2-angular-navigations';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ItemModel } from '@syncfusion/ej2-angular-navigations';

@Component({
  imports: [ToolbarModule, CommonModule],
  standalone: true,
  selector: 'app-toolbar',
  template: `
    <ejs-toolbar 
      [overflowMode]="isMobile ? 'Popup' : 'Scrollable'"
      [scrollStep]="isMobile ? 30 : 50"
      [width]="'100%'"
      [items]="toolbarItems">
    </ejs-toolbar>
  `
})
export class AppComponent implements OnInit {
  isMobile: boolean = false;

  toolbarItems: ItemModel[] = [
    { text: 'Home', prefixIcon: 'e-icons e-home' },
    { text: 'Product', prefixIcon: 'e-icons e-boxes' },
    { text: 'Service', prefixIcon: 'e-icons e-settings' },
    { type: 'Separator' },
    { text: 'Account', align: 'Right', prefixIcon: 'e-icons e-user' }
  ];

  ngOnInit() {
    this.checkScreenSize();
    window.addEventListener('resize', () => this.checkScreenSize());
  }

  checkScreenSize() {
    this.isMobile = window.innerWidth < 768;
  }
}
```