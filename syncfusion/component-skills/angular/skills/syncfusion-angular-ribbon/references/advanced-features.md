# Advanced Features

## Table of Contents
- [Contextual Tabs](#contextual-tabs)
- [Keytips for Keyboard Navigation](#keytips-for-keyboard-navigation)
- [Gallery Items](#gallery-items)
- [Help Pane Templates](#help-pane-templates)
- [Tooltip Configuration](#tooltip-configuration)
- [RTL Support](#rtl-support)
- [Accessibility Features](#accessibility-features)

## Contextual Tabs

### Overview

Contextual tabs are tabs that appear and disappear based on user selection or application state. They provide context-specific commands that are only relevant when certain content is selected.

**Use cases:**
- Format tab appears when text is selected
- Design tab appears when image is selected
- Table tools appear when table is active

### Contextual Tab Configuration

The `contextualTabs` property accepts an array of `RibbonContextualTabSettingsModel` objects:

```typescript
import { Component } from "@angular/core";
import { RibbonModule } from '@syncfusion/ej2-angular-ribbon';
import { RibbonContextualTabSettingsModel } from '@syncfusion/ej2-angular-ribbon';

@Component({
  imports: [ RibbonModule ],
  standalone: true,
  selector: "app-root",
  template: `
    <ejs-ribbon id="ribbon" [contextualTabs]="contextualTabSettings">
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
  public pasteButton = { iconCss: "e-icons e-paste", content: "Paste" };
  
  public contextualTabSettings: RibbonContextualTabSettingsModel[] = [
    {
      visible: true,
      isSelected: false,
      tabs: [
        {
          id: "format-tab",
          header: "Format",
          groups: [
            {
              header: "Text Formatting",
              collections: [
                {
                  items: [
                    { 
                      type: "Button", 
                      buttonSettings: { 
                        iconCss: "e-icons e-bold", 
                        content: "Bold" 
                      } 
                    }
                  ]
                }
              ]
            }
          ]
        }
      ]
    }
  ];
}
```

### RibbonContextualTabSettingsModel Properties

| Property | Type | Description |
|----------|------|-------------|
| `visible` | boolean | Whether the contextual tab is visible |
| `isSelected` | boolean | Whether the contextual tab is selected |
| `tabs` | RibbonTabModel[] | Array of tabs in the contextual group |

### Creating Contextual Tabs

```typescript
import { Component, ViewChild } from "@angular/core";
import { RibbonModule } from '@syncfusion/ej2-angular-ribbon';
import { Ribbon } from '@syncfusion/ej2-ribbon';
import { RibbonTabModel, RibbonButtonSettingsModel } from '@syncfusion/ej2-angular-ribbon';

@Component({
  imports: [ RibbonModule ],
  standalone: true,
  selector: "app-root",
  template: `
    <div>
      <button (click)="showFormatTab()">Select Text</button>
      <button (click)="hideFormatTab()">Deselect</button>
      
      <ejs-ribbon #ribbonObj id="ribbon">
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
    </div>
  `,
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @ViewChild('ribbonObj') ribbonObj!: Ribbon;
  
  public pasteButton: RibbonButtonSettingsModel = { iconCss: "e-icons e-paste", content: "Paste" };
  
  public showFormatTab() {
    if (this.ribbonObj) {
      // Add contextual tab
      const formatTab: RibbonTabModel = {
        header: "Format",
        groups: [
          {
            header: "Text Formatting",
            collections: [
              {
                items: [
                  { type: "Button", buttonSettings: { iconCss: "e-icons e-bold", content: "Bold" } }
                ]
              }
            ]
          }
        ]
      };
      this.ribbonObj.addTab(formatTab, 1);  // Add at index 1
    }
  }
  
  public hideFormatTab() {
    if (this.ribbonObj) {
      this.ribbonObj.removeTab(1);  // Remove tab at index 1
    }
  }
}
```

### Dynamic Tab Management

```typescript
// Add tab at specific position
ribbon.addTab(tabModel, index);

// Remove tab by index
ribbon.removeTab(index);

// Get all tabs
const tabs = ribbon.tabs;

// Enable/disable tab
ribbon.enableTab(index, true/false);
```

## Keytips for Keyboard Navigation

### Overview

Keytips provide keyboard shortcuts for ribbon commands, enabling power users to operate without mouse. Press Alt to activate keytip mode.

### Enable Keytips

First, enable keytips at the ribbon level:

```typescript
import { Component } from "@angular/core";
import { RibbonModule } from '@syncfusion/ej2-angular-ribbon';

@Component({
  imports: [ RibbonModule ],
  standalone: true,
  selector: "app-root",
  template: `
    <ejs-ribbon id="ribbon" [enableKeyTips]="true">
      <e-ribbon-tabs>
        <e-ribbon-tab header="Home" keyTip="H">
          <!-- Tabs, groups, and items -->
        </e-ribbon-tab>
      </e-ribbon-tabs>
    </ejs-ribbon>
  `
})
export class AppComponent {}
```

**Note:** Set `enableKeyTips` to `true` to activate keytip functionality. When enabled, users can press Alt to show keytip badges on all ribbon elements that have a keyTip property defined.

### Implementing Keytips

```typescript
import { Component } from "@angular/core";
import { RibbonModule } from '@syncfusion/ej2-angular-ribbon';
import { RibbonButtonSettingsModel } from '@syncfusion/ej2-angular-ribbon';

@Component({
  imports: [ RibbonModule ],
  standalone: true,
  selector: "app-root",
  template: `
    <ejs-ribbon id="ribbon">
      <e-ribbon-tabs>
        <e-ribbon-tab header="Home" keyTip="H">
          <e-ribbon-groups>
            <e-ribbon-group header="Clipboard">
              <e-ribbon-collections>
                <e-ribbon-collection>
                  <e-ribbon-items>
                    <e-ribbon-item type="Button" 
                      keyTip="P"
                      [buttonSettings]="pasteButton">
                    </e-ribbon-item>
                    <e-ribbon-item type="Button"
                      keyTip="X" 
                      [buttonSettings]="cutButton">
                    </e-ribbon-item>
                    <e-ribbon-item type="Button"
                      keyTip="C" 
                      [buttonSettings]="copyButton">
                    </e-ribbon-item>
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
  public cutButton: RibbonButtonSettingsModel = { iconCss: "e-icons e-cut", content: "Cut" };
  public copyButton: RibbonButtonSettingsModel = { iconCss: "e-icons e-copy", content: "Copy" };
}
```

**Usage:**
- Press Alt to show keytip hints
- Press keytip letter to execute command
- Example: Alt + H opens Home tab, then P for Paste

## Gallery Items

### Overview

Gallery items display visual options for selection, such as styles, themes, or templates. Users click to preview and apply selections from a grid of visual choices.

**Use cases:**
- Style galleries (Normal, Heading 1, Heading 2)
- Color themes
- Chart templates
- Table styles
- Shape galleries

### Gallery Configuration

The `gallerySettings` property configures gallery behavior and content:

**RibbonGallerySettingsModel Properties:**

| Property | Type | Description |
|----------|------|-------------|
| `groups` | GalleryGroupModel[] | Array of gallery groups with items |
| `itemCount` | number | Number of items to display in a row |
| `items` | GalleryItemModel[] | Array of gallery items |
| `popupHeight` | string | Height of gallery popup |
| `popupWidth` | string | Width of gallery popup |
| `template` | string \| function | Custom template for gallery items |

### Basic Gallery

```typescript
import { Component } from "@angular/core";
import { RibbonModule } from '@syncfusion/ej2-angular-ribbon';
import { RibbonGallerySettingsModel } from '@syncfusion/ej2-angular-ribbon';

@Component({
  imports: [ RibbonModule ],
  standalone: true,
  selector: "app-root",
  template: `
    <ejs-ribbon id="ribbon">
      <e-ribbon-tabs>
        <e-ribbon-tab header="Design">
          <e-ribbon-groups>
            <e-ribbon-group header="Styles">
              <e-ribbon-collections>
                <e-ribbon-collection>
                  <e-ribbon-items>
                    <e-ribbon-item type="Gallery" [gallerySettings]="gallerySettings"></e-ribbon-item>
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
  public gallerySettings: RibbonGallerySettingsModel = {
    itemCount: 3,
    items: [
      { text: "Normal", iconCss: "e-icons e-normal" },
      { text: "Heading 1", iconCss: "e-icons e-h1" },
      { text: "Heading 2", iconCss: "e-icons e-h2" },
      { text: "Title", iconCss: "e-icons e-title" },
      { text: "Subtitle", iconCss: "e-icons e-subtitle" }
    ]
  };
}
```

### Gallery with Groups

Organize gallery items into logical groups:

```typescript
public gallerySettings: RibbonGallerySettingsModel = {
  itemCount: 4,
  popupWidth: "400px",
  popupHeight: "300px",
  groups: [
    {
      header: "Text Styles",
      items: [
        { text: "Normal", iconCss: "e-icons e-normal" },
        { text: "Heading 1", iconCss: "e-icons e-h1" },
        { text: "Heading 2", iconCss: "e-icons e-h2" }
      ]
    },
    {
      header: "Special Styles",
      items: [
        { text: "Quote", iconCss: "e-icons e-quote" },
        { text: "Code", iconCss: "e-icons e-code" }
      ]
    }
  ]
};
```

### Gallery with Custom Template

Create custom gallery item rendering:

```typescript
@Component({
  template: `
    <ejs-ribbon id="ribbon">
      <e-ribbon-tabs>
        <e-ribbon-tab header="Design">
          <e-ribbon-groups>
            <e-ribbon-group header="Themes">
              <e-ribbon-collections>
                <e-ribbon-collection>
                  <e-ribbon-items>
                    <e-ribbon-item type="Gallery" [gallerySettings]="themeGallery"></e-ribbon-item>
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
  public themeGallery: RibbonGallerySettingsModel = {
    itemCount: 3,
    template: '<div class="theme-item" style="background: ${color};"><span>${text}</span></div>',
    items: [
      { text: "Blue Theme", color: "#007bff" },
      { text: "Green Theme", color: "#28a745" },
      { text: "Red Theme", color: "#dc3545" },
      { text: "Purple Theme", color: "#6f42c1" }
    ]
  };
}
```

### Gallery Item Selection

Handle gallery item selection:

```typescript
import { GallerySelectEventArgs } from '@syncfusion/ej2-ribbon';

@Component({
  template: `
    <ejs-ribbon id="ribbon" (gallerySelect)="onGallerySelect($event)">
      <!-- Gallery items -->
    </ejs-ribbon>
  `
})
export class AppComponent {
  public onGallerySelect(args: GallerySelectEventArgs) {
    console.log("Selected item:", args.item);
    // Apply the selected style/theme
  }
}
```

## Help Pane Templates

### Overview

Help pane templates provide contextual help or tooltips alongside ribbon commands.

### Help Pane Configuration

```typescript
import { Component } from "@angular/core";
import { RibbonModule } from '@syncfusion/ej2-angular-ribbon';

@Component({
  imports: [ RibbonModule ],
  standalone: true,
  selector: "app-root",
  template: `
    <ejs-ribbon id="ribbon" [helpPaneTemplate]="helpTemplate">
      <ng-template #helpTemplate>
        <div style="padding: 10px; background: #f5f5f5; border-radius: 4px;">
          <h3>Help & Tips</h3>
          <p>Click a command to learn more about it.</p>
          <div id="help-content"></div>
        </div>
      </ng-template>
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
  public pasteButton = { iconCss: "e-icons e-paste", content: "Paste" };
}
```

## Tooltip Configuration

### Button Tooltips

```typescript
import { Component } from "@angular/core";
import { RibbonModule } from '@syncfusion/ej2-angular-ribbon';
import { RibbonButtonSettingsModel } from '@syncfusion/ej2-angular-ribbon';
import { TooltipEventArgs } from "@syncfusion/ej2-popups";

@Component({
  imports: [ RibbonModule ],
  standalone: true,
  selector: "app-root",
  template: `
    <ejs-ribbon id="ribbon">
      <e-ribbon-tabs>
        <e-ribbon-tab header="Home">
          <e-ribbon-groups>
            <e-ribbon-group header="Clipboard">
              <e-ribbon-collections>
                <e-ribbon-collection>
                  <e-ribbon-items>
                    <e-ribbon-item type="Button" [buttonSettings]="pasteButton"></e-ribbon-item>
                    <e-ribbon-item type="Button" [buttonSettings]="cutButton"></e-ribbon-item>
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
  public pasteButton: RibbonButtonSettingsModel = {
    iconCss: "e-icons e-paste",
    content: "Paste",
    toolTip: "Paste content (Ctrl+V)"
  };
  
  public cutButton: RibbonButtonSettingsModel = {
    iconCss: "e-icons e-cut",
    content: "Cut",
    toolTip: "Cut selected content (Ctrl+X)"
  };
}
```

Tooltips appear on hover and provide helpful information about commands.

## RTL Support

### Right-to-Left Layout

```typescript
import { Component } from "@angular/core";
import { RibbonModule } from '@syncfusion/ej2-angular-ribbon';

@Component({
  imports: [ RibbonModule ],
  standalone: true,
  selector: "app-root",
  template: `
    <div dir="rtl">
      <ejs-ribbon id="ribbon" enableRtl="true">
        <e-ribbon-tabs>
          <e-ribbon-tab header="الرئيسية">
            <e-ribbon-groups>
              <e-ribbon-group header="الحافظة">
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
    </div>
  `,
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public pasteButton = { iconCss: "e-icons e-paste", content: "لصق" };
}
```

**Features:**
- Text direction reversed (right-to-left)
- Layout mirrored appropriately
- Icon positions adjusted
- Support for Arabic, Hebrew, Persian languages

## Accessibility Features

### ARIA and Semantic HTML

The Ribbon component includes built-in accessibility support:

```typescript
import { Component } from "@angular/core";
import { RibbonModule } from '@syncfusion/ej2-angular-ribbon';

@Component({
  imports: [ RibbonModule ],
  standalone: true,
  selector: "app-root",
  template: `
    <ejs-ribbon id="ribbon" role="application" [ariaLabel]="'Main application ribbon'">
      <e-ribbon-tabs>
        <e-ribbon-tab header="Home" [ariaLabel]="'Home tab with clipboard commands'">
          <e-ribbon-groups>
            <e-ribbon-group header="Clipboard" [ariaLabel]="'Clipboard group with copy, cut, paste commands'">
              <e-ribbon-collections>
                <e-ribbon-collection>
                  <e-ribbon-items>
                    <e-ribbon-item type="Button" 
                      [buttonSettings]="pasteButton"
                      [ariaLabel]="'Paste button, paste content from clipboard'">
                    </e-ribbon-item>
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
  public pasteButton = { 
    iconCss: "e-icons e-paste", 
    content: "Paste",
    toolTip: "Paste content (Ctrl+V)"
  };
}
```

### Keyboard Navigation

- **Tab:** Navigate between items
- **Enter/Space:** Activate button
- **Arrow keys:** Navigate within groups
- **Alt:** Activate keytip mode
- **Escape:** Close menus/popups

### Screen Reader Support

- Proper ARIA labels for all elements
- Semantic HTML structure
- Descriptive tooltips
- Tab order management
- Focus indicators

### Color Contrast

Ribbon uses color combinations that meet WCAG AA standards:
- Text color: `#333333` on light backgrounds
- Selected state: Clear visual distinction
- Disabled state: Reduced opacity

### Best Practices for Accessibility

1. **Always include labels** for all ribbon items
2. **Use meaningful icons** with text labels
3. **Provide keyboard shortcuts** via keytips
4. **Test with screen readers** (NVDA, JAWS)
5. **Ensure focus management** between controls
6. **Use semantic grouping** for related commands

---
