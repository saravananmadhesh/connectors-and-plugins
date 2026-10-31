# Tabs, Groups, and Items Structure

## Table of Contents
- [Understanding the Hierarchy](#understanding-the-hierarchy)
- [Adding and Configuring Tabs](#adding-and-configuring-tabs)
- [Adding and Configuring Groups](#adding-and-configuring-groups)
- [Collections and Items](#collections-and-items)
- [Item Size Configuration](#item-size-configuration)
- [Orientation Settings](#orientation-settings)
- [Complete Structured Example](#complete-structured-example)

## Understanding the Hierarchy

The Ribbon uses a hierarchical structure to organize commands:

```
Ribbon (container)
└── Tabs (major feature categories)
    └── Groups (related commands within a tab)
        └── Collections (visual groupings)
            └── Items (individual commands)
```

Each level provides organization and visual structure:

- **Tab:** Groups related features (Home, Insert, View, etc.)
- **Group:** Organizes related commands (Clipboard, Font, Editor, etc.)
- **Collection:** Visual separation within a group
- **Item:** Individual command (Button, DropDown, CheckBox, etc.)

## Adding and Configuring Tabs

### Basic Tab Addition

```typescript
import { Component } from "@angular/core";
import { RibbonModule } from '@syncfusion/ej2-angular-ribbon';

@Component({
  imports: [ RibbonModule ],
  standalone: true,
  selector: "app-root",
  template: `
    <ejs-ribbon id="ribbon">
      <e-ribbon-tabs>
        <e-ribbon-tab header="Home"></e-ribbon-tab>
        <e-ribbon-tab header="Insert"></e-ribbon-tab>
        <e-ribbon-tab header="View"></e-ribbon-tab>
      </e-ribbon-tabs>
    </ejs-ribbon>
  `
})
export class AppComponent { }
```

### Tab Properties

| Property | Type | Description |
|----------|------|-------------|
| `header` | string | Tab title displayed in ribbon bar |
| `id` | string | Unique identifier for the tab |
| `groups` | RibbonGroupModel[] | Array of groups in the tab |

### Tab with ID

```html
<e-ribbon-tabs>
  <e-ribbon-tab id="home-tab" header="Home">
    <!-- groups here -->
  </e-ribbon-tab>
</e-ribbon-tabs>
```

## Adding and Configuring Groups

### Basic Group Addition

```html
<e-ribbon-tabs>
  <e-ribbon-tab header="Home">
    <e-ribbon-groups>
      <e-ribbon-group header="Clipboard"></e-ribbon-group>
      <e-ribbon-group header="Font"></e-ribbon-group>
      <e-ribbon-group header="Editor"></e-ribbon-group>
    </e-ribbon-groups>
  </e-ribbon-tab>
</e-ribbon-tabs>
```

### Group Properties

| Property | Type | Description |
|----------|------|-------------|
| `header` | string | Group title/label |
| `id` | string | Unique group identifier |
| `orientation` | "Row" \| "Column" | Layout direction |
| `isCollapsible` | boolean | Allow group collapse |
| `enableGroupOverflow` | boolean | Show overflow button when items don't fit |
| `groupIconCss` | string | Icon for group launcher/overflow |
| `showLauncherIcon` | boolean | Display launcher icon button |

### Group with Orientation

```typescript
import { Component } from "@angular/core";
import { RibbonModule } from '@syncfusion/ej2-angular-ribbon';

@Component({
  imports: [ RibbonModule ],
  standalone: true,
  selector: "app-root",
  template: `
    <ejs-ribbon id="ribbon">
      <e-ribbon-tabs>
        <e-ribbon-tab header="Home">
          <e-ribbon-groups>
            <!-- Row orientation (horizontal, default) -->
            <e-ribbon-group header="Clipboard" orientation="Row">
            </e-ribbon-group>
            
            <!-- Column orientation (vertical) -->
            <e-ribbon-group header="Font" orientation="Column">
            </e-ribbon-group>
          </e-ribbon-groups>
        </e-ribbon-tab>
      </e-ribbon-tabs>
    </ejs-ribbon>
  `
})
export class AppComponent { }
```

### Group with Launcher Icon

```html
<e-ribbon-group header="Font" 
  groupIconCss="e-icons e-bold" 
  [showLauncherIcon]="true">
</e-ribbon-group>
```

The launcher icon provides access to advanced options for the group.

**Note:** The `launcherIconCss` property at the Ribbon level sets the default icon CSS for all group launcher icons. Individual groups can override this using `groupIconCss`.

```typescript
@Component({
  template: `
    <ejs-ribbon id="ribbon" launcherIconCss="e-icons e-settings">
      <!-- All groups will use this icon unless overridden -->
      <e-ribbon-tabs>
        <e-ribbon-tab header="Home">
          <e-ribbon-groups>
            <e-ribbon-group header="Font" [showLauncherIcon]="true">
              <!-- Uses default e-settings icon -->
            </e-ribbon-group>
            <e-ribbon-group header="Paragraph" 
              [showLauncherIcon]="true"
              groupIconCss="e-icons e-paragraph">
              <!-- Overrides with e-paragraph icon -->
            </e-ribbon-group>
          </e-ribbon-groups>
        </e-ribbon-tab>
      </e-ribbon-tabs>
    </ejs-ribbon>
  `
})
```

### Non-Collapsible Groups

```html
<e-ribbon-group header="Clipboard" [isCollapsible]="false">
</e-ribbon-group>
```

Groups are collapsible by default in Simplified layout.

### Group Overflow Handling

```html
<e-ribbon-group header="Font" 
  orientation="Row" 
  [enableGroupOverflow]="true">
</e-ribbon-group>
```

When enabled, items overflow into a dropdown menu when space is limited.

## Collections and Items

### Understanding Collections

Collections provide visual groupings within a group. They help organize related items visually.

```html
<e-ribbon-group header="Clipboard" orientation="Row">
  <e-ribbon-collections>
    <!-- Collection 1: Paste operations -->
    <e-ribbon-collection>
      <e-ribbon-items>
        <e-ribbon-item type="SplitButton" [splitButtonSettings]="pasteSettings"></e-ribbon-item>
      </e-ribbon-items>
    </e-ribbon-collection>
    
    <!-- Collection 2: Cut/Copy operations -->
    <e-ribbon-collection>
      <e-ribbon-items>
        <e-ribbon-item type="Button" [buttonSettings]="cutButton"></e-ribbon-item>
        <e-ribbon-item type="Button" [buttonSettings]="copyButton"></e-ribbon-item>
      </e-ribbon-items>
    </e-ribbon-collection>
  </e-ribbon-collections>
</e-ribbon-group>
```

Collections are separated visually by vertical lines in the ribbon.

### Adding Items to Collections

```typescript
import { Component } from "@angular/core";
import { RibbonModule } from '@syncfusion/ej2-angular-ribbon';
import { RibbonButtonSettingsModel, RibbonDropDownSettingsModel } from '@syncfusion/ej2-angular-ribbon';
import { ItemModel } from "@syncfusion/ej2-angular-splitbuttons";

@Component({
  imports: [ RibbonModule ],
  standalone: true,
  selector: "app-root",
  template: `
    <ejs-ribbon id="ribbon">
      <e-ribbon-tabs>
        <e-ribbon-tab header="Home">
          <e-ribbon-groups>
            <e-ribbon-group header="Clipboard" orientation="Row">
              <e-ribbon-collections>
                <e-ribbon-collection>
                  <e-ribbon-items>
                    <e-ribbon-item type="Button" [buttonSettings]="boldButton"></e-ribbon-item>
                    <e-ribbon-item type="Button" [buttonSettings]="italicButton"></e-ribbon-item>
                    <e-ribbon-item type="Button" [buttonSettings]="underlineButton"></e-ribbon-item>
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
  public boldButton: RibbonButtonSettingsModel = { iconCss: "e-icons e-bold", content: "Bold" };
  public italicButton: RibbonButtonSettingsModel = { iconCss: "e-icons e-italic", content: "Italic" };
  public underlineButton: RibbonButtonSettingsModel = { iconCss: "e-icons e-underline", content: "Underline" };
}
```

## Item Size Configuration

### Understanding Item Sizes

Items can display in three sizes:
- **Large:** Large icon with text label (default)
- **Medium:** Medium icon with text label
- **Small:** Small icon only

```typescript
import { RibbonItemSize } from '@syncfusion/ej2-angular-ribbon';

public largeSize: RibbonItemSize = RibbonItemSize.Large;
public mediumSize: RibbonItemSize = RibbonItemSize.Medium;
public smallSize: RibbonItemSize = RibbonItemSize.Small;
```

### Setting Item Sizes

```html
<e-ribbon-item type="Button" 
  [allowedSizes]="largeSize" 
  [buttonSettings]="largeButton">
</e-ribbon-item>

<e-ribbon-item type="Button" 
  [allowedSizes]="smallSize" 
  [buttonSettings]="smallButton">
</e-ribbon-item>
```

### Multiple Allowed Sizes

Items automatically adjust sizes based on available space:

```typescript
import { RibbonItemSize } from '@syncfusion/ej2-angular-ribbon';

export class AppComponent {
  // Item can be Large, Medium, or Small depending on space
  public allowedSizes = [
    RibbonItemSize.Large,
    RibbonItemSize.Medium,
    RibbonItemSize.Small
  ];
}
```

## Orientation Settings

### Row Orientation (Horizontal)

```html
<e-ribbon-group header="Clipboard" orientation="Row">
  <e-ribbon-collections>
    <e-ribbon-collection>
      <e-ribbon-items>
        <e-ribbon-item type="Button" [buttonSettings]="cutButton"></e-ribbon-item>
        <e-ribbon-item type="Button" [buttonSettings]="copyButton"></e-ribbon-item>
      </e-ribbon-items>
    </e-ribbon-collection>
  </e-ribbon-collections>
</e-ribbon-group>
```

Items flow horizontally left to right.

### Column Orientation (Vertical)

```html
<e-ribbon-group header="Font" orientation="Column">
  <e-ribbon-collections>
    <e-ribbon-collection>
      <e-ribbon-items>
        <e-ribbon-item type="Button" [buttonSettings]="boldButton"></e-ribbon-item>
        <e-ribbon-item type="Button" [buttonSettings]="italicButton"></e-ribbon-item>
      </e-ribbon-items>
    </e-ribbon-collection>
  </e-ribbon-collections>
</e-ribbon-group>
```

Items stack vertically top to bottom.

## Complete Structured Example

```typescript
import { Component } from "@angular/core";
import { RibbonModule } from '@syncfusion/ej2-angular-ribbon';
import { RibbonButtonSettingsModel, RibbonSplitButtonSettingsModel, RibbonDropDownSettingsModel, RibbonItemSize } from '@syncfusion/ej2-angular-ribbon';
import { ItemModel } from "@syncfusion/ej2-angular-splitbuttons";

@Component({
  imports: [ RibbonModule ],
  standalone: true,
  selector: "app-root",
  template: `
    <ejs-ribbon id="ribbon">
      <e-ribbon-tabs>
        <!-- HOME TAB -->
        <e-ribbon-tab header="Home">
          <e-ribbon-groups>
            <!-- Clipboard Group (Row orientation) -->
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
            
            <!-- Font Group (Column orientation) -->
            <e-ribbon-group header="Font" orientation="Row">
              <e-ribbon-collections>
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
        
        <!-- INSERT TAB -->
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
  `,
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public largeSize: RibbonItemSize = RibbonItemSize.Large;
  public smallSize: RibbonItemSize = RibbonItemSize.Small;
  
  public pasteSettings: RibbonSplitButtonSettingsModel = { 
    iconCss: "e-icons e-paste", 
    items: [
      { text: "Keep Source Format" }, 
      { text: "Merge format" }, 
      { text: "Keep text only" }
    ], 
    content: "Paste" 
  };
  
  public cutButton: RibbonButtonSettingsModel = { iconCss: "e-icons e-cut", content: "Cut" };
  public copyButton: RibbonButtonSettingsModel = { iconCss: "e-icons e-copy", content: "Copy" };
  public boldButton: RibbonButtonSettingsModel = { iconCss: "e-icons e-bold", content: "Bold" };
  public italicButton: RibbonButtonSettingsModel = { iconCss: "e-icons e-italic", content: "Italic" };
  public underlineButton: RibbonButtonSettingsModel = { iconCss: "e-icons e-underline", content: "Underline" };
  
  public tableOptions: ItemModel[] = [
    { text: "Insert Table" }, 
    { text: "This device" }, 
    { text: "Convert Table" }, 
    { text: "Excel SpreadSheet" }
  ];
  
  public tableSettings: RibbonDropDownSettingsModel = { 
    iconCss: "e-icons e-table", 
    content: "Table", 
    items: this.tableOptions 
  };
}
```

---
