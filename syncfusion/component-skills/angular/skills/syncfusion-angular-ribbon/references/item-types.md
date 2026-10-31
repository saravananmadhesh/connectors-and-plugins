# Item Types and Configuration

## Table of Contents
- [Overview of Built-in Items](#overview-of-built-in-items)
- [Button Items](#button-items)
- [CheckBox Items](#checkbox-items)
- [DropDown Items](#dropdown-items)
- [SplitButton Items](#splitbutton-items)
- [ComboBox Items](#combobox-items)
- [ColorPicker Items](#colorpicker-items)
- [GroupButton Items](#groupbutton-items)

## Overview of Built-in Items

The Ribbon component supports seven built-in item types, each serving different purposes:

| Item Type | Purpose | Example |
|-----------|---------|---------|
| Button | Simple clickable command | Cut, Copy, Bold |
| CheckBox | Binary on/off state | Ruler, Gridlines |
| DropDown | List of options | Table, Font style |
| SplitButton | Primary action + dropdown | Paste with options |
| ComboBox | Editable dropdown | Font size, Font family |
| ColorPicker | Color selection | Font color, Fill color |
| GroupButton | Related option buttons | View modes, Alignment |
| Gallery | Visual selection grid | Styles, themes, templates |

## Common Item Properties

These properties apply to all ribbon item types:

| Property | Type | Description |
|----------|------|-------------|
| `type` | RibbonItemType | Type of item (Button, CheckBox, etc.) |
| `id` | string | Unique identifier for the item |
| `cssClass` | string | Custom CSS class for styling |
| `disabled` | boolean | Whether the item is disabled |
| `allowedSizes` | RibbonItemSize | Allowed sizes (Large, Medium, Small) |
| `activeSize` | RibbonItemSize | Current active size of the item |
| `displayOptions` | DisplayMode | Display options for the item |
| `keyTip` | string | Keyboard shortcut key |
| `ribbonTooltipSettings` | RibbonTooltipModel | Tooltip configuration |
| `itemTemplate` | string \| object \| HTMLElement | Custom template for item |

### Disabled Items

Disable items to prevent user interaction:

```typescript
public disabledButton: RibbonButtonSettingsModel = {
  iconCss: "e-icons e-save",
  content: "Save",
  disabled: true  // Item is disabled
};
```

In template:

```html
<e-ribbon-item type="Button" 
  [disabled]="true"
  [buttonSettings]="saveButton">
</e-ribbon-item>
```

### Active Size

Control the current displayed size of an item:

```typescript
import { RibbonItemSize } from '@syncfusion/ej2-angular-ribbon';

@Component({
  template: `
    <e-ribbon-item type="Button" 
      [activeSize]="currentSize"
      [allowedSizes]="allowedSizesList"
      [buttonSettings]="pasteButton">
    </e-ribbon-item>
  `
})
export class AppComponent {
  public currentSize = RibbonItemSize.Large;
  public allowedSizesList = RibbonItemSize.Large | RibbonItemSize.Medium | RibbonItemSize.Small;
  public pasteButton = { iconCss: "e-icons e-paste", content: "Paste" };
}
```

### Display Options

Control when items are displayed:

```typescript
import { DisplayMode } from '@syncfusion/ej2-angular-ribbon';

@Component({
  template: `
    <e-ribbon-item type="Button" 
      [displayOptions]="displayMode"
      [buttonSettings]="printButton">
    </e-ribbon-item>
  `
})
export class AppComponent {
  // DisplayMode values: Auto | Classic | Simplified | Overflow
  public displayMode = DisplayMode.Auto;
  public printButton = { iconCss: "e-icons e-print", content: "Print" };
}
```

### Item Template

Customize item rendering with templates:

```typescript
@Component({
  template: `
    <e-ribbon-item type="Button" 
      [itemTemplate]="customTemplate"
      [buttonSettings]="customButton">
    </e-ribbon-item>
    
    <ng-template #customTemplate let-data>
      <div class="custom-item">
        <span class="custom-icon {{data.buttonSettings.iconCss}}"></span>
        <span class="custom-text">{{data.buttonSettings.content}}</span>
        <span class="badge">New</span>
      </div>
    </ng-template>
  `
})
export class AppComponent {
  public customButton = { iconCss: "e-icons e-paste", content: "Paste" };
}
```

### Item-Level Tooltips

Configure tooltips for individual items:

```typescript
import { RibbonTooltipModel } from '@syncfusion/ej2-angular-ribbon';

@Component({
  template: `
    <e-ribbon-item type="Button" 
      [ribbonTooltipSettings]="tooltipConfig"
      [buttonSettings]="pasteButton">
    </e-ribbon-item>
  `
})
export class AppComponent {
  public pasteButton = { iconCss: "e-icons e-paste", content: "Paste" };
  
  public tooltipConfig: RibbonTooltipModel = {
    id: "paste-tooltip",
    title: "Paste (Ctrl+V)",
    content: "Insert content from clipboard",
    iconCss: "e-icons e-paste",
    cssClass: "custom-tooltip"
  };
}
```

**RibbonTooltipModel Properties:**
- `id` - Unique identifier for tooltip
- `title` - Tooltip header
- `content` - Tooltip body text
- `iconCss` - Icon CSS class
- `cssClass` - Custom CSS class for styling

## Button Items

### Basic Button

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
        <e-ribbon-tab header="Home">
          <e-ribbon-groups>
            <e-ribbon-group header="Clipboard">
              <e-ribbon-collections>
                <e-ribbon-collection>
                  <e-ribbon-items>
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
  public cutButton: RibbonButtonSettingsModel = { 
    iconCss: "e-icons e-cut", 
    content: "Cut" 
  };
}
```

### Button with Properties

| Property | Type | Description |
|----------|------|-------------|
| `iconCss` | string | CSS class for icon |
| `content` | string | Button text label |
| `isToggle` | boolean | Act as toggle button |
| `disabled` | boolean | Disable button |
| `toolTip` | string | Tooltip text |

### Toggle Button

Toggle buttons maintain on/off state:

```typescript
public toggleButton: RibbonButtonSettingsModel = { 
  iconCss: "e-icons e-bold", 
  content: "Bold",
  isToggle: true 
};
```

Click toggles between active (pressed) and inactive state.

### Disabled Button

```typescript
public disabledButton: RibbonButtonSettingsModel = { 
  iconCss: "e-icons e-paste", 
  content: "Paste",
  disabled: true 
};
```

### Button with Tooltip

```typescript
public buttonWithTooltip: RibbonButtonSettingsModel = { 
  iconCss: "e-icons e-save", 
  content: "Save",
  toolTip: "Save the document (Ctrl+S)" 
};
```

## CheckBox Items

### Basic CheckBox

```typescript
import { RibbonCheckBoxSettingsModel } from '@syncfusion/ej2-angular-ribbon';

@Component({
  imports: [ RibbonModule ],
  standalone: true,
  selector: "app-root",
  template: `
    <ejs-ribbon id="ribbon">
      <e-ribbon-tabs>
        <e-ribbon-tab header="View">
          <e-ribbon-groups>
            <e-ribbon-group header="Show">
              <e-ribbon-collections>
                <e-ribbon-collection>
                  <e-ribbon-items>
                    <e-ribbon-item type="CheckBox" [checkBoxSettings]="ruler"></e-ribbon-item>
                    <e-ribbon-item type="CheckBox" [checkBoxSettings]="gridlines"></e-ribbon-item>
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
  public ruler: RibbonCheckBoxSettingsModel = { 
    label: "Ruler", 
    checked: false 
  };
  
  public gridlines: RibbonCheckBoxSettingsModel = { 
    label: "Gridlines", 
    checked: true 
  };
}
```

### CheckBox Properties

| Property | Type | Description |
|----------|------|-------------|
| `label` | string | Checkbox label text |
| `checked` | boolean | Initial checked state |
| `labelPosition` | "Before" \| "After" | Label position relative to checkbox |

## DropDown Items

### Basic DropDown

```typescript
import { RibbonDropDownSettingsModel } from '@syncfusion/ej2-angular-ribbon';
import { ItemModel } from "@syncfusion/ej2-angular-splitbuttons";

@Component({
  imports: [ RibbonModule ],
  standalone: true,
  template: `
    <ejs-ribbon id="ribbon">
      <e-ribbon-tabs>
        <e-ribbon-tab header="Insert">
          <e-ribbon-groups>
            <e-ribbon-group header="Tables">
              <e-ribbon-collections>
                <e-ribbon-collection>
                  <e-ribbon-items>
                    <e-ribbon-item type="DropDown" [dropDownSettings]="tableSettings"></e-ribbon-item>
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

### DropDown Properties

| Property | Type | Description |
|----------|------|-------------|
| `iconCss` | string | Icon CSS class |
| `content` | string | Button text label |
| `items` | ItemModel[] | List of options |

## SplitButton Items

### Basic SplitButton

```typescript
import { RibbonSplitButtonSettingsModel } from '@syncfusion/ej2-angular-ribbon';
import { ItemModel } from "@syncfusion/ej2-angular-splitbuttons";

@Component({
  imports: [ RibbonModule ],
  standalone: true,
  template: `
    <ejs-ribbon id="ribbon">
      <e-ribbon-tabs>
        <e-ribbon-tab header="Home">
          <e-ribbon-groups>
            <e-ribbon-group header="Clipboard">
              <e-ribbon-collections>
                <e-ribbon-collection>
                  <e-ribbon-items>
                    <e-ribbon-item type="SplitButton" [splitButtonSettings]="pasteSettings"></e-ribbon-item>
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
  public pasteSettings: RibbonSplitButtonSettingsModel = {
    iconCss: "e-icons e-paste",
    items: [
      { text: "Keep Source Format" },
      { text: "Merge format" },
      { text: "Keep text only" }
    ],
    content: "Paste"
  };
}
```

### SplitButton Behavior

- **Left click:** Executes primary paste action
- **Right click/dropdown:** Shows paste options
- Useful for commands with variations

## ComboBox Items

### Basic ComboBox

```typescript
import { RibbonComboBoxSettingsModel } from '@syncfusion/ej2-angular-ribbon';

@Component({
  imports: [ RibbonModule ],
  standalone: true,
  template: `
    <ejs-ribbon id="ribbon">
      <e-ribbon-tabs>
        <e-ribbon-tab header="Home">
          <e-ribbon-groups>
            <e-ribbon-group header="Font">
              <e-ribbon-collections>
                <e-ribbon-collection>
                  <e-ribbon-items>
                    <e-ribbon-item type="ComboBox" [comboBoxSettings]="fontsizeSettings"></e-ribbon-item>
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
  public fontSizes: string[] = ["8", "9", "10", "11", "12", "14", "16", "18", "20", "22", "24", "26"];
  
  public fontsizeSettings: RibbonComboBoxSettingsModel = {
    dataSource: this.fontSizes,
    index: 4,  // "12" selected by default
    width: "65px",
    allowFiltering: true
  };
}
```

### ComboBox Properties

| Property | Type | Description |
|----------|------|-------------|
| `dataSource` | string[] \| object[] | List of options |
| `index` | number | Default selected index |
| `width` | string | ComboBox width |
| `allowFiltering` | boolean | Enable search/filter |

### Font Family ComboBox

```typescript
public fontFamilies: string[] = [
  "Algerian", "Arial", "Calibri", "Cambria", "Courier New",
  "Georgia", "Impact", "Segoe UI", "Times New Roman", "Verdana"
];

public fontstyleSettings: RibbonComboBoxSettingsModel = {
  dataSource: this.fontFamilies,
  index: 3,  // "Cambria" selected by default
  width: "150px",
  allowFiltering: true
};
```

## ColorPicker Items

### Basic ColorPicker

```typescript
import { RibbonColorPickerSettingsModel } from '@syncfusion/ej2-angular-ribbon';
import { RibbonColorPickerService } from '@syncfusion/ej2-angular-ribbon';

@Component({
  imports: [ RibbonModule ],
  providers: [ RibbonColorPickerService ],
  standalone: true,
  template: `
    <ejs-ribbon id="ribbon">
      <e-ribbon-tabs>
        <e-ribbon-tab header="Home">
          <e-ribbon-groups>
            <e-ribbon-group header="Font">
              <e-ribbon-collections>
                <e-ribbon-collection>
                  <e-ribbon-items>
                    <e-ribbon-item type="ColorPicker" [allowedSizes]="smallSize" [colorPickerSettings]="colorSettings"></e-ribbon-item>
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
  public smallSize = RibbonItemSize.Small;
  
  public colorSettings: RibbonColorPickerSettingsModel = {
    value: "#123456"  // Default color
  };
}
```

### ColorPicker Features

- Click to open color palette
- Select from predefined colors
- Custom color input
- Color preview
- Must include `RibbonColorPickerService` provider

## GroupButton Items

### Basic GroupButton

```typescript
import { RibbonGroupButtonSettingsModel } from '@syncfusion/ej2-angular-ribbon';

@Component({
  imports: [ RibbonModule ],
  standalone: true,
  template: `
    <ejs-ribbon id="ribbon">
      <e-ribbon-tabs>
        <e-ribbon-tab header="View">
          <e-ribbon-groups>
            <e-ribbon-group header="Views">
              <e-ribbon-collections>
                <e-ribbon-collection>
                  <e-ribbon-items>
                    <e-ribbon-item type="GroupButton" [groupButtonSettings]="alignmentGroup"></e-ribbon-item>
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
  public alignmentGroup: RibbonGroupButtonSettingsModel = {
    items: [
      { iconCss: "e-icons e-align-left", content: "Left" },
      { iconCss: "e-icons e-align-center", content: "Center" },
      { iconCss: "e-icons e-align-right", content: "Right" }
    ]
  };
}
```

### GroupButton Behavior

- Only one button can be selected at a time
- Useful for mutually exclusive options
- Examples: alignment, text layout, view modes

---
