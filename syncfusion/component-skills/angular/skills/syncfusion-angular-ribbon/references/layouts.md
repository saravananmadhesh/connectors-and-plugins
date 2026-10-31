# Ribbon Layouts and Resizing

## Table of Contents
- [Layout Overview](#layout-overview)
- [Classic Layout](#classic-layout)
- [Simplified Layout](#simplified-layout)
- [Switching Between Layouts](#switching-between-layouts)
- [Item Size Configuration](#item-size-configuration)
- [Responsive Resizing Behavior](#responsive-resizing-behavior)
- [Complete Layout Example](#complete-layout-example)

## Layout Overview

The Ribbon component supports two distinct layout modes:

| Layout | Description | Use Case |
|--------|-------------|----------|
| **Classic** | Traditional multi-row ribbon with all groups visible | Desktop applications, office-like interfaces |
| **Simplified** | Collapsible groups, optimized for smaller screens | Web applications, responsive designs |

The active layout is controlled using the `activeLayout` property.

### Ribbon Layout Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `activeLayout` | RibbonLayout \| string | RibbonLayout.Classic | Specifies active layout (Classic or Simplified) |
| `contextualTabs` | RibbonContextualTabSettingsModel[] | [] | Array of contextual tab configurations |
| `enableKeyTips` | boolean | false | Enable keytips for keyboard navigation |
| `hideLayoutSwitcher` | boolean | false | Hide the layout switcher button |
| `layoutSwitcherKeyTip` | string | '' | Key tip for layout switcher icon |
| `isMinimized` | boolean | false | Whether ribbon is minimized (only tab header shown) |
| `selectedTab` | number | 0 | Index of current active tab |
| `width` | string \| number | '100%' | Width of the ribbon |
| `enablePersistence` | boolean | false | Persist component state between page reloads |
| `locale` | string | 'en-us' | Localization value for controls |
| `tabAnimation` | TabAnimationSettingsModel | {...} | Animation settings for tab content |

## Classic Layout

### Classic Layout Characteristics

- **Default layout mode**
- Groups display in multiple rows
- All items always visible
- Tab overflow handled automatically
- Best for desktop applications

### Basic Classic Layout

```typescript
import { Component } from "@angular/core";
import { RibbonModule } from '@syncfusion/ej2-angular-ribbon';
import { RibbonLayout } from '@syncfusion/ej2-angular-ribbon';
import { RibbonButtonSettingsModel, RibbonSplitButtonSettingsModel } from '@syncfusion/ej2-angular-ribbon';
import { ItemModel } from "@syncfusion/ej2-angular-splitbuttons";

@Component({
  imports: [ RibbonModule ],
  standalone: true,
  selector: "app-root",
  template: `
    <ejs-ribbon id="ribbon" [activeLayout]="ribbonLayout">
      <e-ribbon-tabs>
        <e-ribbon-tab header="Home">
          <e-ribbon-groups>
            <e-ribbon-group header="Clipboard" orientation="Row">
              <e-ribbon-collections>
                <e-ribbon-collection>
                  <e-ribbon-items>
                    <e-ribbon-item type="SplitButton" [allowedSizes]="largeSize" [splitButtonSettings]="pasteSettings"></e-ribbon-item>
                  </e-ribbon-items>
                </e-ribbon-collection>
                <e-ribbon-collection>
                  <e-ribbon-items>
                    <e-ribbon-item type="Button" [buttonSettings]="cutButton"></e-ribbon-item>
                    <e-ribbon-item type="Button" [buttonSettings]="copyButton"></e-ribbon-item>
                  </e-ribbon-items>
                </e-ribbon-collection>
              </e-ribbon-collections>
            </e-ribbon-group>
            <e-ribbon-group header="Font" orientation="Row">
              <e-ribbon-collections>
                <e-ribbon-collection>
                  <e-ribbon-items>
                    <e-ribbon-item type="Button" [allowedSizes]="smallSize" [buttonSettings]="boldButton"></e-ribbon-item>
                    <e-ribbon-item type="Button" [allowedSizes]="smallSize" [buttonSettings]="italicButton"></e-ribbon-item>
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
  public ribbonLayout: RibbonLayout = RibbonLayout.Classic;
  
  public largeSize = RibbonItemSize.Large;
  public smallSize = RibbonItemSize.Small;
  
  public pasteSettings: RibbonSplitButtonSettingsModel = {
    iconCss: "e-icons e-paste",
    items: [
      { text: "Keep Source Format" },
      { text: "Merge format" }
    ],
    content: "Paste"
  };
  
  public cutButton: RibbonButtonSettingsModel = { iconCss: "e-icons e-cut", content: "Cut" };
  public copyButton: RibbonButtonSettingsModel = { iconCss: "e-icons e-copy", content: "Copy" };
  public boldButton: RibbonButtonSettingsModel = { iconCss: "e-icons e-bold", content: "Bold" };
  public italicButton: RibbonButtonSettingsModel = { iconCss: "e-icons e-italic", content: "Italic" };
}
```

## Simplified Layout

### Simplified Layout Characteristics

- Groups collapse into single buttons
- Groups can be expanded on-demand
- More compact interface
- Optimized for responsive/mobile layouts
- Groups are collapsible by default

### Basic Simplified Layout

```typescript
import { Component } from "@angular/core";
import { RibbonModule } from '@syncfusion/ej2-angular-ribbon';
import { RibbonLayout } from '@syncfusion/ej2-angular-ribbon';

@Component({
  imports: [ RibbonModule ],
  standalone: true,
  selector: "app-root",
  template: `
    <ejs-ribbon id="ribbon" [activeLayout]="ribbonLayout">
      <e-ribbon-tabs>
        <e-ribbon-tab header="Home">
          <e-ribbon-groups>
            <e-ribbon-group header="Clipboard" orientation="Row">
              <!-- Items here -->
            </e-ribbon-group>
          </e-ribbon-groups>
        </e-ribbon-tab>
      </e-ribbon-tabs>
    </ejs-ribbon>
  `
})
export class AppComponent {
  public ribbonLayout: RibbonLayout = RibbonLayout.Simplified;
}
```

In Simplified layout, groups display as collapsible buttons that expand to show their content.

### Non-Collapsible Groups in Simplified Layout

```html
<e-ribbon-group header="Clipboard" [isCollapsible]="false">
  <!-- This group stays expanded even in Simplified layout -->
</e-ribbon-group>
```

## Switching Between Layouts

### Dynamic Layout Switching

```typescript
import { Component } from "@angular/core";
import { RibbonModule } from '@syncfusion/ej2-angular-ribbon';
import { RibbonLayout } from '@syncfusion/ej2-angular-ribbon';

@Component({
  imports: [ RibbonModule ],
  standalone: true,
  selector: "app-root",
  template: `
    <div>
      <div>
        <button (click)="switchLayout('Classic')">Classic Layout</button>
        <button (click)="switchLayout('Simplified')">Simplified Layout</button>
      </div>
      
      <ejs-ribbon id="ribbon" [activeLayout]="activeLayout">
        <e-ribbon-tabs>
          <e-ribbon-tab header="Home">
            <e-ribbon-groups>
              <e-ribbon-group header="Clipboard">
                <!-- Items -->
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
  public activeLayout: RibbonLayout = RibbonLayout.Classic;
  
  public switchLayout(layout: string) {
    if (layout === 'Classic') {
      this.activeLayout = RibbonLayout.Classic;
    } else if (layout === 'Simplified') {
      this.activeLayout = RibbonLayout.Simplified;
    }
  }
}
```

### Hide Layout Switcher

Hide the built-in layout switcher button:

```typescript
@Component({
  template: `
    <ejs-ribbon id="ribbon" 
      [activeLayout]="activeLayout"
      [hideLayoutSwitcher]="true">
      <!-- Tabs -->
    </ejs-ribbon>
  `
})
export class AppComponent {
  public activeLayout = RibbonLayout.Classic;
}
```

### Layout Switcher with Keytip

Add keyboard shortcut to layout switcher:

```typescript
@Component({
  template: `
    <ejs-ribbon id="ribbon" 
      [activeLayout]="activeLayout"
      [layoutSwitcherKeyTip]="'L'">
      <!-- Press Alt+L to toggle layout -->
      <!-- Tabs -->
    </ejs-ribbon>
  `
})
export class AppComponent {
  public activeLayout = RibbonLayout.Classic;
}
```

### Minimized Ribbon

Show only tab headers when minimized:

```typescript
@Component({
  template: `
    <ejs-ribbon id="ribbon" 
      [isMinimized]="isMinimized">
      <e-ribbon-tabs>
        <e-ribbon-tab header="Home">
          <!-- Groups -->
        </e-ribbon-tab>
      </e-ribbon-tabs>
    </ejs-ribbon>
    
    <button (click)="toggleMinimize()">Toggle Minimize</button>
  `
})
export class AppComponent {
  public isMinimized = false;
  
  public toggleMinimize() {
    this.isMinimized = !this.isMinimized;
  }
}
```

### Selected Tab Control

Programmatically control the active tab:

```typescript
@Component({
  template: `
    <ejs-ribbon id="ribbon" [selectedTab]="selectedTabIndex">
      <e-ribbon-tabs>
        <e-ribbon-tab header="Home"></e-ribbon-tab>
        <e-ribbon-tab header="Insert"></e-ribbon-tab>
        <e-ribbon-tab header="View"></e-ribbon-tab>
      </e-ribbon-tabs>
    </ejs-ribbon>
    
    <button (click)="selectTab(0)">Home</button>
    <button (click)="selectTab(1)">Insert</button>
    <button (click)="selectTab(2)">View</button>
  `
})
export class AppComponent {
  public selectedTabIndex = 0;
  
  public selectTab(index: number) {
    this.selectedTabIndex = index;
  }
}
```

### Enable Persistence

Persist ribbon state across page reloads:

```typescript
@Component({
  template: `
    <ejs-ribbon id="ribbon" 
      [enablePersistence]="true"
      [selectedTab]="selectedTabIndex">
      <!-- State (selected tab, layout, etc.) persists across reloads -->
      <e-ribbon-tabs>
        <e-ribbon-tab header="Home"></e-ribbon-tab>
        <e-ribbon-tab header="Insert"></e-ribbon-tab>
      </e-ribbon-tabs>
    </ejs-ribbon>
  `
})
export class AppComponent {
  public selectedTabIndex = 0;
}
```

### Localization

Set locale for ribbon controls:

```typescript
import { L10n, setCulture } from '@syncfusion/ej2-base';

// Load locale strings
L10n.load({
  'de': {
    'ribbon': {
      'OverflowButton': 'Mehr',
      'LayoutSwitcher': 'Layout wechseln'
    }
  }
});

@Component({
  template: `
    <ejs-ribbon id="ribbon" [locale]="'de'">
      <e-ribbon-tabs>
        <e-ribbon-tab header="Start"></e-ribbon-tab>
      </e-ribbon-tabs>
    </ejs-ribbon>
  `
})
export class AppComponent {}
```

### Tab Animation Settings

Configure tab transition animations:

```typescript
import { TabAnimationSettingsModel } from '@syncfusion/ej2-angular-ribbon';

@Component({
  template: `
    <ejs-ribbon id="ribbon" [tabAnimation]="animationSettings">
      <e-ribbon-tabs>
        <e-ribbon-tab header="Home"></e-ribbon-tab>
        <e-ribbon-tab header="Insert"></e-ribbon-tab>
      </e-ribbon-tabs>
    </ejs-ribbon>
  `
})
export class AppComponent {
  public animationSettings: TabAnimationSettingsModel = {
    previous: { 
      effect: 'SlideLeftIn', 
      duration: 400, 
      easing: 'ease' 
    },
    next: { 
      effect: 'SlideRightIn', 
      duration: 400, 
      easing: 'ease' 
    }
  };
}
```

### Width Configuration

Set ribbon width:

```typescript
@Component({
  template: `
    <!-- Percentage width -->
    <ejs-ribbon id="ribbon1" [width]="'100%'">
      <!-- Tabs -->
    </ejs-ribbon>
    
    <!-- Fixed pixel width -->
    <ejs-ribbon id="ribbon2" [width]="1200">
      <!-- Tabs -->
    </ejs-ribbon>
  `
})
export class AppComponent {}
```

## Item Size Configuration

### Defining Item Sizes

The `allowedSizes` property specifies which sizes an item can display:

```typescript
import { RibbonItemSize } from '@syncfusion/ej2-angular-ribbon';

public largeSize = RibbonItemSize.Large;      // Large icon with text
public mediumSize = RibbonItemSize.Medium;    // Medium icon with text
public smallSize = RibbonItemSize.Small;      // Small icon only
```

### Size Hierarchy

Items automatically resize based on available space:

1. **Large** - Default, full icon + text label
2. **Medium** - Slightly smaller icon + text
3. **Small** - Icon only, most compact

When ribbon width decreases, items transition: Large → Medium → Small

### Multiple Allowed Sizes

```html
<!-- Item can be Large or Small -->
<e-ribbon-item type="Button" 
  [allowedSizes]="[RibbonItemSize.Large, RibbonItemSize.Small]" 
  [buttonSettings]="buttonSettings">
</e-ribbon-item>
```

### Force Specific Size

```html
<!-- Item always displays as Small (icon only) -->
<e-ribbon-item type="Button" 
  [allowedSizes]="smallSize" 
  [buttonSettings]="buttonSettings">
</e-ribbon-item>
```

## Responsive Resizing Behavior

### How Resizing Works

1. **Window/ribbon width decreases**
2. **Items shrink in order:**
   - Large items → Medium items
   - Medium items → Small items
   - Overflow occurs if insufficient space

3. **Overflow handling:**
   - Items move to overflow dropdown
   - Group overflow button appears
   - User clicks to access hidden items

### Configure Overflow Handling

```html
<e-ribbon-group header="Font" 
  orientation="Row" 
  [enableGroupOverflow]="true">
  <!-- Items with overflow support -->
</e-ribbon-group>
```

### Responsive Example

```typescript
import { Component } from "@angular/core";
import { RibbonModule } from '@syncfusion/ej2-angular-ribbon';
import { RibbonItemSize } from '@syncfusion/ej2-angular-ribbon';

@Component({
  imports: [ RibbonModule ],
  standalone: true,
  selector: "app-root",
  template: `
    <ejs-ribbon id="ribbon">
      <e-ribbon-tabs>
        <e-ribbon-tab header="Home">
          <e-ribbon-groups>
            <e-ribbon-group header="Text Formatting" orientation="Row" [enableGroupOverflow]="true">
              <e-ribbon-collections>
                <e-ribbon-collection>
                  <e-ribbon-items>
                    <!-- Large when space available, shrinks to Small -->
                    <e-ribbon-item type="Button" 
                      [allowedSizes]="[RibbonItemSize.Large, RibbonItemSize.Medium, RibbonItemSize.Small]" 
                      [buttonSettings]="boldButton">
                    </e-ribbon-item>
                    
                    <!-- Always small -->
                    <e-ribbon-item type="Button" 
                      [allowedSizes]="smallSize" 
                      [buttonSettings]="italicButton">
                    </e-ribbon-item>
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
  public boldButton = { iconCss: "e-icons e-bold", content: "Bold" };
  public italicButton = { iconCss: "e-icons e-italic", content: "Italic" };
  public smallSize = RibbonItemSize.Small;
}
```

## Complete Layout Example

```typescript
import { Component } from "@angular/core";
import { RibbonModule } from '@syncfusion/ej2-angular-ribbon';
import { RibbonLayout, RibbonItemSize } from '@syncfusion/ej2-angular-ribbon';
import { RibbonButtonSettingsModel, RibbonSplitButtonSettingsModel, RibbonDropDownSettingsModel, RibbonComboBoxSettingsModel } from '@syncfusion/ej2-angular-ribbon';
import { ItemModel } from "@syncfusion/ej2-angular-splitbuttons";

@Component({
  imports: [ RibbonModule ],
  standalone: true,
  selector: "app-root",
  template: `
    <div style="margin: 20px;">
      <div style="margin-bottom: 10px;">
        <label>Layout:</label>
        <select [(ngModel)]="activeLayout">
          <option [value]="classicLayout">Classic</option>
          <option [value]="simplifiedLayout">Simplified</option>
        </select>
      </div>
      
      <ejs-ribbon id="ribbon" [activeLayout]="activeLayout">
        <e-ribbon-tabs>
          <e-ribbon-tab header="Home">
            <e-ribbon-groups>
              <!-- Clipboard Group -->
              <e-ribbon-group header="Clipboard" orientation="Row" [enableGroupOverflow]="true">
                <e-ribbon-collections>
                  <e-ribbon-collection>
                    <e-ribbon-items>
                      <e-ribbon-item type="SplitButton" 
                        [allowedSizes]="largeSize" 
                        [splitButtonSettings]="pasteSettings">
                      </e-ribbon-item>
                    </e-ribbon-items>
                  </e-ribbon-collection>
                  <e-ribbon-collection>
                    <e-ribbon-items>
                      <e-ribbon-item type="Button" [buttonSettings]="cutButton"></e-ribbon-item>
                      <e-ribbon-item type="Button" [buttonSettings]="copyButton"></e-ribbon-item>
                    </e-ribbon-items>
                  </e-ribbon-collection>
                </e-ribbon-collections>
              </e-ribbon-group>
              
              <!-- Font Group -->
              <e-ribbon-group header="Font" orientation="Row" [enableGroupOverflow]="true" groupIconCss="e-icons e-bold">
                <e-ribbon-collections>
                  <e-ribbon-collection>
                    <e-ribbon-items>
                      <e-ribbon-item type="ComboBox" [comboBoxSettings]="fontstyleSettings"></e-ribbon-item>
                      <e-ribbon-item type="ComboBox" [comboBoxSettings]="fontsizeSettings"></e-ribbon-item>
                    </e-ribbon-items>
                  </e-ribbon-collection>
                  <e-ribbon-collection>
                    <e-ribbon-items>
                      <e-ribbon-item type="Button" [allowedSizes]="smallSize" [buttonSettings]="boldButton"></e-ribbon-item>
                      <e-ribbon-item type="Button" [allowedSizes]="smallSize" [buttonSettings]="italicButton"></e-ribbon-item>
                      <e-ribbon-item type="Button" [allowedSizes]="smallSize" [buttonSettings]="underlineButton"></e-ribbon-item>
                    </e-ribbon-items>
                  </e-ribbon-collection>
                </e-ribbon-collections>
              </e-ribbon-group>
            </e-ribbon-groups>
          </e-ribbon-tab>
          
          <e-ribbon-tab header="Insert">
            <e-ribbon-groups>
              <e-ribbon-group header="Tables">
                <e-ribbon-collections>
                  <e-ribbon-collection>
                    <e-ribbon-items>
                      <e-ribbon-item type="DropDown" [allowedSizes]="largeSize" [dropDownSettings]="tableSettings"></e-ribbon-item>
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
  public activeLayout: RibbonLayout = RibbonLayout.Classic;
  public classicLayout: RibbonLayout = RibbonLayout.Classic;
  public simplifiedLayout: RibbonLayout = RibbonLayout.Simplified;
  
  public largeSize = RibbonItemSize.Large;
  public smallSize = RibbonItemSize.Small;
  
  public pasteSettings: RibbonSplitButtonSettingsModel = {
    iconCss: "e-icons e-paste",
    items: [
      { text: "Keep Source Format" },
      { text: "Merge format" }
    ],
    content: "Paste"
  };
  
  public cutButton: RibbonButtonSettingsModel = { iconCss: "e-icons e-cut", content: "Cut" };
  public copyButton: RibbonButtonSettingsModel = { iconCss: "e-icons e-copy", content: "Copy" };
  public boldButton: RibbonButtonSettingsModel = { iconCss: "e-icons e-bold", content: "Bold" };
  public italicButton: RibbonButtonSettingsModel = { iconCss: "e-icons e-italic", content: "Italic" };
  public underlineButton: RibbonButtonSettingsModel = { iconCss: "e-icons e-underline", content: "Underline" };
  
  public fontFamilies: string[] = ["Arial", "Calibri", "Cambria", "Georgia", "Impact", "Times New Roman", "Verdana"];
  public fontSizes: string[] = ["8", "9", "10", "11", "12", "14", "16", "18", "20", "22", "24"];
  
  public fontstyleSettings: RibbonComboBoxSettingsModel = {
    dataSource: this.fontFamilies,
    index: 1,
    width: "150px",
    allowFiltering: true
  };
  
  public fontsizeSettings: RibbonComboBoxSettingsModel = {
    dataSource: this.fontSizes,
    index: 4,
    width: "65px",
    allowFiltering: true
  };
  
  public tableOptions: ItemModel[] = [
    { text: "Insert Table" },
    { text: "Draw Table" },
    { text: "Convert Table" }
  ];
  
  public tableSettings: RibbonDropDownSettingsModel = {
    iconCss: "e-icons e-table",
    content: "Table",
    items: this.tableOptions
  };
}
```

---
