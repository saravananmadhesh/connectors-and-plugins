# File Menu and Backstage Views

## Table of Contents
- [File Menu Overview](#file-menu-overview)
- [Adding File Menu](#adding-file-menu)
- [Menu Items Configuration](#menu-items-configuration)
- [Backstage View](#backstage-view)
- [Adding Backstage Items](#adding-backstage-items)
- [Backstage Footer Items](#backstage-footer-items)
- [Backstage Customization](#backstage-customization)

## File Menu Overview

The File Menu is a quick-access menu for document operations like New, Open, Save, and Print. It provides an alternative to the traditional menu bar.

**Key characteristics:**
- Dropdown button at ribbon start
- Contains frequently used document operations
- Optional component (disabled by default)
- Fully customizable menu items

## Adding File Menu

### Basic File Menu

```typescript
import { Component } from "@angular/core";
import { RibbonModule, RibbonFileMenuService } from '@syncfusion/ej2-angular-ribbon';
import { FileMenuSettingsModel, RibbonButtonSettingsModel } from '@syncfusion/ej2-angular-ribbon';

@Component({
  imports: [ RibbonModule ],
  providers: [ RibbonFileMenuService ],
  standalone: true,
  selector: "app-root",
  template: `
    <ejs-ribbon id="ribbon" [fileMenu]="fileSettings">
      <e-ribbon-tabs>
        <e-ribbon-tab header="Home">
          <e-ribbon-groups>
            <e-ribbon-group header="Clipboard">
              <e-ribbon-collections>
                <e-ribbon-collection>
                  <e-ribbon-items>
                    <e-ribbon-item type="Button" [buttonSettings]="pasteButton"></e-ribbon-item>
                  </e-ribbon-items>
                </e-ribbon-collection>
              </e-ribbon-collections>
            </e-ribbon-group>
          </e-ribbon-groups>
        </e-ribbon-tab>
      </e-ribbon-tabs>
    </ejs-ribbon>
  `
})
export class AppComponent {
  public pasteButton: RibbonButtonSettingsModel = { iconCss: "e-icons e-paste", content: "Paste" };
  
  public fileSettings: FileMenuSettingsModel = {
    visible: true,
    menuItems: [
      { text: "New", iconCss: "e-icons e-file-new", id: "new" },
      { text: "Open", iconCss: "e-icons e-folder-open", id: "open" },
      { text: "Save", iconCss: "e-icons e-save", id: "save" },
      { text: "Save As", iconCss: "e-icons e-save", id: "saveAs" },
      { text: "Print", iconCss: "e-icons e-print", id: "print" }
    ]
  };
}
```

**Important:** Include `RibbonFileMenuService` provider for file menu functionality.

## Menu Items Configuration

### File Menu Properties

| Property | Type | Description |
|----------|------|-------------|
| `visible` | boolean | Show/hide file menu button |
| `text` | string | File menu button text |
| `menuItems` | MenuItemModel[] | Array of menu items |
| `itemTemplate` | string \| object | Template for file menu items |
| `popupTemplate` | string \| HTMLElement | Custom content for popup |
| `animationSettings` | MenuAnimationSettingsModel | Animation settings for sub menu |
| `showItemOnClick` | boolean | Show sub menu only on click |
| `keyTip` | string | Keytip content for keyboard navigation |
| `ribbonTooltipSettings` | RibbonTooltipModel | Tooltip settings for file menu button |

### Menu Item Properties

| Property | Type | Description |
|----------|------|-------------|
| `text` | string | Menu item label |
| `iconCss` | string | Icon CSS class |
| `id` | string | Unique identifier |
| `separator` | boolean | Render as separator line |
| `items` | MenuItemModel[] | Submenu items |

### Menu Item with Submenu

```typescript
public fileSettings: FileMenuSettingsModel = {
  visible: true,
  menuItems: [
    { 
      text: "New", 
      iconCss: "e-icons e-file-new", 
      id: "new",
      items: [
        { text: "Blank Document", id: "blank" },
        { text: "From Template", id: "template" }
      ]
    },
    { text: "Open", iconCss: "e-icons e-folder-open", id: "open" },
    { separator: true },
    { text: "Exit", iconCss: "e-icons e-close", id: "exit" }
  ]
};
```

### Menu Item Separator

```typescript
public fileSettings: FileMenuSettingsModel = {
  visible: true,
  menuItems: [
    { text: "New", iconCss: "e-icons e-file-new", id: "new" },
    { text: "Open", iconCss: "e-icons e-folder-open", id: "open" },
    { separator: true },  // Visual separator
    { text: "Exit", iconCss: "e-icons e-close", id: "exit" }
  ]
};
```

### Item Template

Customize file menu item rendering with templates:

```typescript
public fileSettings: FileMenuSettingsModel = {
  visible: true,
  text: "File",
  itemTemplate: '<div class="custom-menu-item"><span class="menu-icon ${iconCss}"></span><span class="menu-text">${text}</span></div>',
  menuItems: [
    { text: "New", iconCss: "e-icons e-file-new", id: "new" },
    { text: "Open", iconCss: "e-icons e-folder-open", id: "open" }
  ]
};
```

### Popup Template

Customize the entire file menu popup content:

```typescript
public fileSettings: FileMenuSettingsModel = {
  visible: true,
  text: "File",
  popupTemplate: `
    <div style="padding: 20px;">
      <h3>File Operations</h3>
      <button class="e-btn">New Document</button>
      <button class="e-btn">Open Document</button>
    </div>
  `,
  menuItems: []
};
```

### Animation Settings

Configure sub menu animations:

```typescript
public fileSettings: FileMenuSettingsModel = {
  visible: true,
  text: "File",
  animationSettings: {
    effect: 'SlideDown',
    duration: 400,
    easing: 'ease'
  },
  menuItems: [
    { 
      text: "New", 
      items: [
        { text: "Blank Document" },
        { text: "From Template" }
      ]
    }
  ]
};
```

### Show Item on Click

Control sub menu opening behavior:

```typescript
public fileSettings: FileMenuSettingsModel = {
  visible: true,
  text: "File",
  showItemOnClick: true,  // Sub menu opens only on click, not on hover
  menuItems: [
    { 
      text: "New", 
      items: [
        { text: "Blank Document" },
        { text: "From Template" }
      ]
    }
  ]
};
```

### Keytip and Tooltip

Add keyboard shortcuts and tooltips:

```typescript
public fileSettings: FileMenuSettingsModel = {
  visible: true,
  text: "File",
  keyTip: "F",  // Press Alt+F to open
  ribbonTooltipSettings: {
    title: "File Menu",
    content: "Access file operations like New, Open, Save, and Print"
  },
  menuItems: [
    { text: "New", iconCss: "e-icons e-file-new", id: "new" },
    { text: "Open", iconCss: "e-icons e-folder-open", id: "open" }
  ]
};
```

### File Menu Events

File menu supports several events for handling user interactions:

```typescript
import { Component } from "@angular/core";
import { RibbonModule, RibbonFileMenuService } from '@syncfusion/ej2-angular-ribbon';
import { FileMenuSettingsModel } from '@syncfusion/ej2-angular-ribbon';
import { FileMenuEventArgs, FileMenuBeforeOpenCloseEventArgs, FileMenuOpenCloseEventArgs } from '@syncfusion/ej2-ribbon';

@Component({
  imports: [ RibbonModule ],
  providers: [ RibbonFileMenuService ],
  standalone: true,
  selector: "app-root",
  template: `
    <ejs-ribbon id="ribbon" [fileMenu]="fileSettings"></ejs-ribbon>
  `
})
export class AppComponent {
  public fileSettings: FileMenuSettingsModel = {
    visible: true,
    text: "File",
    menuItems: [
      { text: "New", iconCss: "e-icons e-file-new", id: "new" },
      { text: "Open", iconCss: "e-icons e-folder-open", id: "open" }
    ],
    beforeOpen: (args: FileMenuBeforeOpenCloseEventArgs) => {
      console.log("File menu about to open", args);
      // args.cancel = true;  // Cancel opening if needed
    },
    open: (args: FileMenuOpenCloseEventArgs) => {
      console.log("File menu opened", args);
    },
    beforeClose: (args: FileMenuBeforeOpenCloseEventArgs) => {
      console.log("File menu about to close", args);
    },
    close: (args: FileMenuOpenCloseEventArgs) => {
      console.log("File menu closed", args);
    },
    beforeItemRender: (args: FileMenuEventArgs) => {
      console.log("Rendering menu item", args.item);
    },
    select: (args: FileMenuEventArgs) => {
      console.log("Menu item selected", args.item);
      if (args.item.id === "new") {
        console.log("Creating new document...");
      }
    }
  };
}
```

**Available File Menu Events:**
- `beforeOpen` - Before file menu popup opens (cancelable)
- `open` - After file menu popup opens
- `beforeClose` - Before file menu popup closes (cancelable)
- `close` - After file menu popup closes
- `beforeItemRender` - While rendering each menu item
- `select` - When menu item is selected

## Backstage View

### Backstage Overview

The Backstage view is a modern replacement for the File Menu. It displays application-level information and settings in a full-page overlay.

**Features:**
- Left sidebar with item list
- Right content area for item details
- Application-level operations
- Professional office-like appearance
- Replaces traditional file menu

### Basic Backstage

```typescript
import { Component } from "@angular/core";
import { RibbonModule, RibbonBackstageService } from '@syncfusion/ej2-angular-ribbon';
import { BackStageMenuModel, BackstageItemModel, RibbonButtonSettingsModel } from '@syncfusion/ej2-angular-ribbon';

@Component({
  imports: [ RibbonModule ],
  providers: [ RibbonBackstageService ],
  standalone: true,
  selector: "app-root",
  template: `
    <ejs-ribbon id="ribbon" [backStageMenu]="backstageSettings">
      <e-ribbon-tabs>
        <e-ribbon-tab header="Home">
          <e-ribbon-groups>
            <e-ribbon-group header="Clipboard">
              <e-ribbon-collections>
                <e-ribbon-collection>
                  <e-ribbon-items>
                    <e-ribbon-item type="Button" [buttonSettings]="pasteButton"></e-ribbon-item>
                  </e-ribbon-items>
                </e-ribbon-collection>
              </e-ribbon-collections>
            </e-ribbon-group>
          </e-ribbon-groups>
        </e-ribbon-tab>
      </e-ribbon-tabs>
    </ejs-ribbon>
  `
})
export class AppComponent {
  public pasteButton: RibbonButtonSettingsModel = { iconCss: "e-icons e-paste", content: "Paste" };
  
  public backstageSettings: BackStageMenuModel = {
    text: "File",
    visible: true,
    items: [
      { 
        id: "home", 
        text: "Home", 
        iconCss: "e-icons e-home", 
        content: "<div style='padding: 20px;'><h2>Welcome</h2><p>Start a new document or open recent files.</p></div>" 
      }
    ],
    backButton: {
      text: "Close",
      visible: true
    }
  };
}
```

**Important:** Include `RibbonBackstageService` provider for backstage functionality.

## Adding Backstage Items

### Backstage Menu Properties

| Property | Type | Description |
|----------|------|-------------|
| `visible` | boolean | Show/hide backstage button |
| `text` | string | Backstage button text |
| `items` | BackstageItemModel[] | Array of backstage items |
| `backButton` | BackstageBackButtonModel | Back button configuration |
| `width` | string | Width of backstage menu |
| `height` | string | Height of backstage menu |
| `target` | string \| HTMLElement | Element for positioning |
| `template` | string \| object | Template for backstage content |
| `keyTip` | string | Keytip content for keyboard navigation |
| `ribbonTooltipSettings` | RibbonTooltipModel | Tooltip settings for backstage button |

### Backstage Item Properties

| Property | Type | Description |
|----------|------|-------------|
| `id` | string | Unique identifier |
| `text` | string | Item label in sidebar |
| `iconCss` | string | Icon CSS class |
| `content` | string | HTML content for right panel |
| `separator` | boolean | Render as separator |
| `isFooter` | boolean | Position item in footer |

### Multiple Backstage Items

```typescript
public menuItems: BackstageItemModel[] = [
  { 
    id: "home", 
    text: "Home", 
    iconCss: "e-icons e-home", 
    content: this.getHomeContent() 
  },
  { 
    id: "new", 
    text: "New", 
    iconCss: "e-icons e-file-new", 
    content: this.getNewContent() 
  },
  { 
    id: "open", 
    text: "Open", 
    iconCss: "e-icons e-folder-open", 
    content: this.getOpenContent() 
  },
  { 
    id: "save", 
    text: "Save", 
    iconCss: "e-icons e-save", 
    content: this.getSaveContent() 
  }
];

public backstageSettings: BackStageMenuModel = {
  text: "File",
  visible: true,
  items: this.menuItems,
  backButton: { text: "Close" }
};

public getHomeContent(): string {
  return "<div style='padding: 20px;'><h2>Home</h2><p>Recent documents and options.</p></div>";
}

public getNewContent(): string {
  return "<div style='padding: 20px;'><h2>New</h2><p>Create new document.</p></div>";
}

public getOpenContent(): string {
  return "<div style='padding: 20px;'><h2>Open</h2><p>Open existing document.</p></div>";
}

public getSaveContent(): string {
  return "<div style='padding: 20px;'><h2>Save</h2><p>Save document.</p></div>";
}
```

## Backstage Footer Items

### Adding Footer Items

Footer items appear at the bottom of the backstage item list:

```typescript
public menuItems: BackstageItemModel[] = [
  { 
    id: "home", 
    text: "Home", 
    iconCss: "e-icons e-home", 
    content: this.getHomeContent() 
  },
  { 
    id: "new", 
    text: "New", 
    iconCss: "e-icons e-file-new", 
    content: this.getNewContent() 
  },
  { separator: true, isFooter: true },
  { 
    id: "options", 
    text: "Options", 
    isFooter: true, 
    content: this.getOptionsContent() 
  },
  { 
    id: "account", 
    text: "Account", 
    isFooter: true, 
    content: this.getAccountContent() 
  }
];

public backstageSettings: BackStageMenuModel = {
  text: "File",
  visible: true,
  items: this.menuItems,
  backButton: { text: "Close" }
};
```

Footer items are positioned at the bottom, separated by a separator line.

### Footer Content Example

```typescript
public getOptionsContent(): string {
  return `
    <div style='padding: 20px;'>
      <h3>Options</h3>
      <ul>
        <li><label><input type='checkbox' checked> AutoSave</label></li>
        <li><label><input type='checkbox' checked> Spell Check</label></li>
      </ul>
    </div>
  `;
}
```

## Backstage Customization

### Back Button Customization

```typescript
public backstageSettings: BackStageMenuModel = {
  text: "File",
  visible: true,
  items: this.menuItems,
  backButton: {
    text: "Back to Document",
    iconCss: "e-icons e-arrow-left",
    visible: true
  }
};
```

### Backstage Width and Height

```typescript
public backstageSettings: BackStageMenuModel = {
  text: "File",
  visible: true,
  width: "700px",
  height: "500px",
  items: this.menuItems,
  backButton: { text: "Close" }
};
```

If not set, dimensions adjust to content.

### Backstage Target Element

```typescript
public backstageSettings: BackStageMenuModel = {
  text: "File",
  visible: true,
  target: "#backstageContainer",  // Position relative to element
  items: this.menuItems,
  backButton: { text: "Close" }
};
```

Target element must have `position: relative` CSS property.

### Backstage Template

Customize the entire backstage layout:

```typescript
public backstageSettings: BackStageMenuModel = {
  text: "File",
  visible: true,
  template: `
    <div class="custom-backstage">
      <div class="backstage-sidebar">Custom Navigation</div>
      <div class="backstage-content">Custom Content</div>
    </div>
  `,
  items: []
};
```

### Backstage Keytip and Tooltip

Add keyboard shortcuts and tooltips:

```typescript
public backstageSettings: BackStageMenuModel = {
  text: "File",
  visible: true,
  keyTip: "F",  // Press Alt+F to open
  ribbonTooltipSettings: {
    title: "File Backstage",
    content: "Access file operations and application settings"
  },
  items: this.menuItems,
  backButton: { text: "Close" }
};
```

### Complete Backstage Example

```typescript
import { Component } from "@angular/core";
import { RibbonModule, RibbonBackstageService } from '@syncfusion/ej2-angular-ribbon';
import { BackStageMenuModel, BackstageItemModel, RibbonButtonSettingsModel } from '@syncfusion/ej2-angular-ribbon';

@Component({
  imports: [ RibbonModule ],
  providers: [ RibbonBackstageService ],
  standalone: true,
  selector: "app-root",
  template: `
    <ejs-ribbon id="ribbon" [backStageMenu]="backstageSettings">
      <e-ribbon-tabs>
        <e-ribbon-tab header="Home">
          <e-ribbon-groups>
            <e-ribbon-group header="Clipboard">
              <e-ribbon-collections>
                <e-ribbon-collection>
                  <e-ribbon-items>
                    <e-ribbon-item type="Button" [buttonSettings]="pasteButton"></e-ribbon-item>
                    <e-ribbon-item type="Button" [buttonSettings]="cutButton"></e-ribbon-item>
                    <e-ribbon-item type="Button" [buttonSettings]="copyButton"></e-ribbon-item>
                  </e-ribbon-items>
                </e-ribbon-collection>
              </e-ribbon-collections>
            </e-ribbon-group>
          </e-ribbon-groups>
        </e-ribbon-tab>
      </e-ribbon-tabs>
    </ejs-ribbon>
  `,
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public pasteButton: RibbonButtonSettingsModel = { iconCss: "e-icons e-paste", content: "Paste" };
  public cutButton: RibbonButtonSettingsModel = { iconCss: "e-icons e-cut", content: "Cut" };
  public copyButton: RibbonButtonSettingsModel = { iconCss: "e-icons e-copy", content: "Copy" };
  
  public getBackstageContent(item: string): string {
    const contents: any = {
      "home": "<div style='padding: 20px;'><div style='margin-bottom: 20px;'><strong>Home</strong></div><div style='padding: 12px 0px;'><span>Recent Documents</span></div></div>",
      "new": "<div style='padding: 20px;'><div style='margin-bottom: 20px;'><strong>Create New</strong></div><div><button class='e-control e-btn'>Blank Document</button></div></div>",
      "open": "<div style='padding: 20px;'><div style='margin-bottom: 20px;'><strong>Open Document</strong></div><div><button class='e-control e-btn'>Browse Computer</button></div></div>",
      "save": "<div style='padding: 20px;'><div style='margin-bottom: 20px;'><strong>Save</strong></div><div><button class='e-control e-btn'>Save</button><button class='e-control e-btn'>Save As</button></div></div>",
      "print": "<div style='padding: 20px;'><div style='margin-bottom: 20px;'><strong>Print</strong></div><div><button class='e-control e-btn'>Print</button></div></div>",
      "options": "<div style='padding: 20px;'><div style='margin-bottom: 20px;'><strong>Options</strong></div><div><label><input type='checkbox' checked> AutoSave</label></div></div>"
    };
    return contents[item] || "";
  }
  
  public menuItems: BackstageItemModel[] = [
    { id: "home", text: "Home", iconCss: "e-icons e-home", content: this.getBackstageContent("home") },
    { id: "new", text: "New", iconCss: "e-icons e-file-new", content: this.getBackstageContent("new") },
    { id: "open", text: "Open", iconCss: "e-icons e-folder-open", content: this.getBackstageContent("open") },
    { id: "save", text: "Save", iconCss: "e-icons e-save", content: this.getBackstageContent("save") },
    { id: "print", text: "Print", iconCss: "e-icons e-print", content: this.getBackstageContent("print") },
    { separator: true, isFooter: true },
    { id: "options", text: "Options", isFooter: true, content: this.getBackstageContent("options") }
  ];
  
  public backstageSettings: BackStageMenuModel = {
    text: "File",
    visible: true,
    width: "600px",
    height: "500px",
    items: this.menuItems,
    backButton: {
      text: "Back",
      visible: true
    }
  };
}
```

---
