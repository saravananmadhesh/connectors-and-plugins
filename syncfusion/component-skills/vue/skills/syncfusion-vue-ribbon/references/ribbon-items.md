# Ribbon Items in Vue Ribbon Component

## Table of Contents
- [Overview](#overview)
- [Built-in Item Types](#built-in-item-types)
- [Button Items](#button-items)
- [CheckBox Items](#checkbox-items)
- [DropDown Items](#dropdown-items)
- [SplitButton Items](#splitbutton-items)
- [ComboBox Items](#combobox-items)
- [ColorPicker Items](#colorpicker-items)
- [GroupButton Items](#groupbutton-items)
- [Gallery Items](#gallery-items)
- [Custom Template Items](#custom-template-items)
- [Display Options](#display-options)
- [Item Sizing](#item-sizing)
- [Enable/Disable Items](#enabledisable-items)

## Overview

The Ribbon component supports eight built-in item types, each designed for specific interactions. Items are added to collections within groups and configured through their respective settings models.

## Built-in Item Types

| Item Type | Purpose | Configuration Model |
|-----------|---------|-------------------|
| `Button` | Clickable button with optional toggle | `RibbonButtonSettingsModel` |
| `CheckBox` | Binary selection with label | `RibbonCheckBoxSettingsModel` |
| `DropDown` | Button with dropdown menu | `RibbonDropDownSettingsModel` |
| `SplitButton` | Primary action + dropdown | `RibbonSplitButtonSettingsModel` |
| `ComboBox` | Editable dropdown with filtering | `RibbonComboBoxSettingsModel` |
| `ColorPicker` | Color selection palette | `RibbonColorPickerSettingsModel` |
| `GroupButton` | Group of related buttons | `RibbonGroupButtonSettingsModel` |
| `Gallery` | Visual item collection | `RibbonGallerySettingsModel` |
| `Template` | Custom HTML content | `itemTemplate` property |

## Button Items

Buttons are the most common ribbon items, providing clickable actions with optional icons and text.

### Basic Button

```vue
<e-ribbon-item type="Button" :buttonSettings="cutButton"></e-ribbon-item>

<script setup>
const cutButton = { 
  iconCss: "e-icons e-cut", 
  content: "Cut" 
};
</script>
```

### Toggle Button

Set `isToggle` to `true` for toggle behavior:

```vue
<e-ribbon-item type="Button" :buttonSettings="boldButton"></e-ribbon-item>

<script setup>
const boldButton = { 
  iconCss: "e-icons e-bold", 
  content: "Bold",
  isToggle: true 
};
</script>
```

### Button Properties

```javascript
const buttonSettings = {
  content: "Button Text",      // Button label
  iconCss: "e-icons e-icon",   // Icon CSS class
  isToggle: false,             // Toggle button behavior
  clicked: (args) => {         // Click event handler
    console.log('Button clicked');
  }
};
```

## CheckBox Items

CheckBoxes provide binary selection with optional labels.

### Basic CheckBox

```vue
<e-ribbon-item type="CheckBox" :checkBoxSettings="rulerSettings"></e-ribbon-item>

<script setup>
const rulerSettings = {
  label: 'Ruler',
  checked: false
};
</script>
```

### CheckBox with Initial State

```vue
<e-ribbon-item type="CheckBox" :checkBoxSettings="gridSettings"></e-ribbon-item>

<script setup>
const gridSettings = {
  label: 'Show Gridlines',
  checked: true,
  labelPosition: 'After'
};
</script>
```

### Label Positioning

The `labelPosition` property controls label placement:

```vue
<script setup>
const settings = {
  label: 'Ruler',
  checked: true,
  labelPosition: 'Before'  // 'Before' or 'After' (default)
};
</script>
```

### CheckBox Properties

```javascript
const checkBoxSettings = {
  label: "Checkbox Label",     // Label text
  checked: false,              // Initial checked state
  labelPosition: 'After',      // 'Before' or 'After'
  change: (args) => {          // Change event handler
    console.log('Checked:', args.checked);
  }
};
```

## DropDown Items

DropDown buttons display a menu of items when clicked.

### Basic DropDown

```vue
<e-ribbon-item type="DropDown" :dropDownSettings="tableSettings"></e-ribbon-item>

<script setup>
const tableSettings = {
  content: 'Table',
  iconCss: 'e-icons e-table',
  items: [
    { text: 'Insert Table' },
    { text: 'Draw Table' },
    { text: 'Convert Table' }
  ]
};
</script>
```

### DropDown with Target Element

Use a target element for custom dropdown content:

```vue
<template>
  <div>
    <ejs-ribbon>
      <e-ribbon-tabs>
        <e-ribbon-tab header="Insert">
          <e-ribbon-groups>
            <e-ribbon-group header="Tables">
              <e-ribbon-collections>
                <e-ribbon-collection>
                  <e-ribbon-items>
                    <e-ribbon-item type="DropDown" :dropDownSettings="tableSettings"></e-ribbon-item>
                  </e-ribbon-items>
                </e-ribbon-collection>
              </e-ribbon-collections>
            </e-ribbon-group>
          </e-ribbon-groups>
        </e-ribbon-tab>
      </e-ribbon-tabs>
    </ejs-ribbon>
    <ejs-listview id='tableList' :dataSource='tableOptions' headerTitle='Table' :showHeader='true'></ejs-listview>
  </div>
</template>

<script setup>
import { ListViewComponent as EjsListview } from '@syncfusion/ej2-vue-lists';

const tableOptions = [
  { text: 'Insert Table' },
  { text: 'This device' },
  { text: 'Convert Table' }
];

const tableSettings = {
  content: 'Table',
  iconCss: 'e-icons e-table',
  target: '#tableList'
};
</script>
```

### Create Popup on Demand

Improve performance by creating the popup only when opened:

```vue
<script setup>
const tableSettings = {
  content: 'Table',
  iconCss: 'e-icons e-table',
  items: [/* items */],
  createPopupOnClick: true
};
</script>
```

### Customize Dropdown Items

Use `beforeItemRender` to apply custom CSS:

```vue
<script setup>
const tableSettings = {
  content: 'Table',
  iconCss: 'e-icons e-table',
  items: [
    { text: 'Insert Table' },
    { text: 'Draw Table' }
  ],
  beforeItemRender: (args) => {
    if (args.item.text === 'Insert Table') {
      args.element.classList.add('e-custom-class');
    }
  }
};
</script>

<style>
.e-custom-class {
  color: green;
  font-weight: bold;
}
</style>
```

## SplitButton Items

SplitButtons combine a primary action button with a dropdown menu.

### Basic SplitButton

```vue
<e-ribbon-item type="SplitButton" :splitButtonSettings="pasteSettings"></e-ribbon-item>

<script setup>
const pasteSettings = {
  iconCss: 'e-icons e-paste',
  content: 'Paste',
  items: [
    { text: 'Keep Source Format' },
    { text: 'Merge format' },
    { text: 'Keep text only' }
  ]
};
</script>
```

### SplitButton with Target

```vue
<template>
  <div>
    <ejs-ribbon>
      <!-- Ribbon content -->
      <e-ribbon-item type="SplitButton" :splitButtonSettings="pasteSettings"></e-ribbon-item>
    </ejs-ribbon>
    <ejs-listview id='pasteList' :dataSource='pasteOptions' headerTitle='Paste' :showHeader='true'></ejs-listview>
  </div>
</template>

<script setup>
const pasteOptions = [
  { text: 'Keep Source Format' },
  { text: 'Merge format' },
  { text: 'Keep text only' }
];

const pasteSettings = {
  content: 'Paste',
  iconCss: 'e-icons e-paste',
  target: '#pasteList'
};
</script>
```

### SplitButton Events

```javascript
const pasteSettings = {
  iconCss: 'e-icons e-paste',
  content: 'Paste',
  items: [/* items */],
  click: (args) => {
    console.log('Primary button clicked');
  },
  select: (args) => {
    console.log('Menu item selected:', args.item.text);
  }
};
```

## ComboBox Items

ComboBoxes provide searchable dropdowns with data binding.

### Basic ComboBox

```vue
<e-ribbon-item type="ComboBox" :comboBoxSettings="fontOptions"></e-ribbon-item>

<script setup>
const fontOptions = {
  dataSource: ['Arial', 'Calibri', 'Georgia', 'Times New Roman', 'Verdana'],
  index: 1,
  width: '150px'
};
</script>
```

### ComboBox with Filtering

Enable filtering to search items:

```vue
<script setup>
const fontOptions = {
  dataSource: ['Algerian', 'Arial', 'Calibri', 'Cambria', 'Georgia'],
  allowFiltering: true,
  index: 2,
  width: '150px'
};
</script>
```

### ComboBox with Sorting

Sort items in ascending or descending order:

```vue
<script setup>
const fontOptions = {
  dataSource: ['Arial', 'Calibri', 'Georgia', 'Verdana'],
  sortOrder: 'Ascending',  // 'None', 'Ascending', or 'Descending'
  index: 0,
  width: '150px'
};
</script>
```

### ComboBox Properties

```javascript
const comboBoxSettings = {
  dataSource: [],              // Array of items
  index: 0,                    // Selected item index
  width: '150px',              // ComboBox width
  allowFiltering: false,       // Enable search filtering
  sortOrder: 'None',           // Sort order
  placeholder: 'Select...',    // Placeholder text
  change: (args) => {          // Change event
    console.log('Selected:', args.value);
  }
};
```

## ColorPicker Items

ColorPickers allow users to select colors from a palette.

### Basic ColorPicker

```vue
<template>
  <ejs-ribbon>
    <e-ribbon-tabs>
      <e-ribbon-tab header="Home">
        <e-ribbon-groups>
          <e-ribbon-group header="Font">
            <e-ribbon-collections>
              <e-ribbon-collection>
                <e-ribbon-items>
                  <e-ribbon-item type="ColorPicker" :colorPickerSettings="colorPicker"></e-ribbon-item>
                </e-ribbon-items>
              </e-ribbon-collection>
            </e-ribbon-collections>
          </e-ribbon-group>
        </e-ribbon-groups>
      </e-ribbon-tab>
    </e-ribbon-tabs>
  </ejs-ribbon>
</template>

<script setup>
import { provide } from 'vue';
import { RibbonColorPicker } from '@syncfusion/ej2-vue-ribbon';

// Inject ColorPicker module
provide('ribbon', [RibbonColorPicker]);

const colorPicker = {
  value: '#123456'
};
</script>
```

### ColorPicker Properties

```javascript
const colorPickerSettings = {
  value: '#FF0000',            // Selected color (hex)
  columns: 10,                 // Number of columns in palette
  showButtons: true,           // Show apply/cancel buttons
  change: (args) => {          // Change event
    console.log('Color selected:', args.value);
  }
};
```

## GroupButton Items

GroupButtons display a set of related buttons with single or multiple selection modes.

### Basic GroupButton (Icon Only)

```vue
<e-ribbon-item type="GroupButton" :allowedSizes="smallSize" :groupButtonSettings="alignmentButtons">
</e-ribbon-item>

<script setup>
import { RibbonItemSize } from '@syncfusion/ej2-vue-ribbon';

const smallSize = RibbonItemSize.Small;

const alignmentButtons = {
  items: [
    { iconCss: 'e-icons e-align-left' },
    { iconCss: 'e-icons e-align-center' },
    { iconCss: 'e-icons e-align-right' },
    { iconCss: 'e-icons e-justify' }
  ]
};
</script>
```

### GroupButton with Content

```vue
<script setup>
const alignmentButtons = {
  items: [
    { iconCss: 'e-icons e-align-left', content: 'Align Left' },
    { iconCss: 'e-icons e-align-center', content: 'Align Center' },
    { iconCss: 'e-icons e-align-right', content: 'Align Right' },
    { iconCss: 'e-icons e-justify', content: 'Justify' }
  ]
};
</script>
```

### Single Selection Mode

Allow only one button to be selected at a time:

```vue
<script setup>
import { RibbonGroupButtonSelection } from '@syncfusion/ej2-vue-ribbon';

const alignmentButtons = {
  selection: RibbonGroupButtonSelection.Single,
  items: [
    { iconCss: 'e-icons e-align-left', content: 'Align Left', selected: true },
    { iconCss: 'e-icons e-align-center', content: 'Align Center' },
    { iconCss: 'e-icons e-align-right', content: 'Align Right' }
  ]
};
</script>
```

### Multiple Selection Mode

Allow multiple buttons to be selected:

```vue
<script setup>
import { RibbonGroupButtonSelection } from '@syncfusion/ej2-vue-ribbon';

const formattingButtons = {
  selection: RibbonGroupButtonSelection.Multiple,
  items: [
    { iconCss: 'e-icons e-bold', content: 'Bold', selected: true },
    { iconCss: 'e-icons e-italic', content: 'Italic' },
    { iconCss: 'e-icons e-underline', content: 'Underline' },
    { iconCss: 'e-icons e-strikethrough', content: 'Strikethrough' }
  ]
};
</script>
```

### GroupButton in Simplified Layout

In simplified mode, GroupButton renders as a dropdown with the selected item's icon displayed:

```vue
<ejs-ribbon activeLayout="Simplified">
  <e-ribbon-tabs>
    <e-ribbon-tab header="Home">
      <e-ribbon-groups>
        <e-ribbon-group header="Paragraph">
          <e-ribbon-collections>
            <e-ribbon-collection>
              <e-ribbon-items>
                <e-ribbon-item type="GroupButton" :allowedSizes="smallSize" :groupButtonSettings="alignmentButtons">
                </e-ribbon-item>
              </e-ribbon-items>
            </e-ribbon-collection>
          </e-ribbon-collections>
        </e-ribbon-group>
      </e-ribbon-groups>
    </e-ribbon-tab>
  </e-ribbon-tabs>
</ejs-ribbon>
```

## Gallery Items

Gallery items display collections of related items. See [gallery-items.md](gallery-items.md) for comprehensive coverage.

### Basic Gallery

```vue
<e-ribbon-item type="Gallery" :gallerySettings="styleGallery"></e-ribbon-item>

<script setup>
import { provide } from 'vue';
import { RibbonGallery } from '@syncfusion/ej2-vue-ribbon';

provide('ribbon', [RibbonGallery]);

const styleGallery = {
  groups: [{
    header: 'Styles',
    items: [
      { content: 'Normal' },
      { content: 'Heading 1' },
      { content: 'Heading 2' }
    ]
  }]
};
</script>
```

## Custom Template Items

Create custom items using templates for maximum flexibility.

### Basic Template Item

```vue
<template>
  <ejs-ribbon>
    <e-ribbon-tabs>
      <e-ribbon-tab header="Home">
        <e-ribbon-groups>
          <e-ribbon-group header="Custom">
            <e-ribbon-collections>
              <e-ribbon-collection>
                <e-ribbon-items>
                  <e-ribbon-item type="Template" :itemTemplate="'customItem'">
                    <template v-slot:customItem="{ data }">
                      <div :class="'custom-template ' + data.activeSize">
                        <span class="e-icons e-video"></span>
                        <span class="text">Video</span>
                      </div>
                    </template>
                  </e-ribbon-item>
                </e-ribbon-items>
              </e-ribbon-collection>
            </e-ribbon-collections>
          </e-ribbon-group>
        </e-ribbon-groups>
      </e-ribbon-tab>
    </e-ribbon-tabs>
  </ejs-ribbon>
</template>

<style>
.custom-template {
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.custom-template.Large {
  flex-direction: column;
}

.custom-template.Large .e-icons {
  font-size: 35px;
}

.custom-template.Medium .e-icons,
.custom-template.Small .e-icons {
  font-size: 20px;
  margin: 15px 5px;
}

.custom-template.Small .text {
  display: none;
}
</style>
```

### Template with Form Inputs

```vue
<e-ribbon-item type="Template" :itemTemplate="'formTemplate'">
  <template v-slot:formTemplate="{ data }">
    <div :class="'form-template ' + data.activeSize">
      <label for="fname">First name:</label>
      <input type="text" id="fname" name="fname" />
      <label for="lname">Last name:</label>
      <input type="text" id="lname" name="lname" />
    </div>
  </template>
</e-ribbon-item>

<style>
.form-template input {
  margin-left: 10px;
  width: 100px;
}

.form-template.Medium {
  display: flex;
  align-items: center;
}

.form-template.Medium input {
  height: 14px;
  margin-right: 10px;
}
</style>
```

## Item Settings Interface

The `settings` property on RibbonItemModel provides access to item-specific configuration options.

### RibbonItemSettings Properties

```javascript
const itemSettings = {
  // Button settings (when type="Button")
  buttonSettings: {
    content: 'Button Text',
    iconCss: 'e-icons e-icon',
    isToggle: false,
    clicked: (args) => { }
  },
  
  // CheckBox settings (when type="CheckBox")
  checkBoxSettings: {
    label: 'Label',
    checked: false,
    labelPosition: 'After'
  },
  
  // DropDown settings (when type="DropDown")
  dropDownSettings: {
    content: 'Dropdown',
    items: [],
    target: '#targetId'
  },
  
  // ComboBox settings (when type="ComboBox")
  comboBoxSettings: {
    dataSource: [],
    index: 0,
    width: '150px',
    allowFiltering: true
  },
  
  // ColorPicker settings (when type="ColorPicker")
  colorPickerSettings: {
    value: '#FF0000'
  },
  
  // Gallery settings (when type="Gallery")
  gallerySettings: {
    groups: [],
    itemCount: 3
  }
};
```

### Using Settings Property

Configure items with the settings object:

```vue
<e-ribbon-item 
  type="Button" 
  :settings="itemSettings">
</e-ribbon-item>

<script setup>
const itemSettings = {
  buttonSettings: {
    content: 'Click Me',
    iconCss: 'e-icons e-cut',
    clicked: () => {
      console.log('Button clicked');
    }
  }
};
</script>
```

### Item Settings by Type

#### Button Item Settings
```vue
<script setup>
const buttonSettings = {
  buttonSettings: {
    content: 'Bold',
    iconCss: 'e-icons e-bold',
    isToggle: true,
    clicked: (args) => {
      console.log('Toggle state:', args.isSelected);
    }
  }
};
</script>
```

#### CheckBox Item Settings
```vue
<script setup>
const checkBoxSettings = {
  checkBoxSettings: {
    label: 'Show Gridlines',
    checked: true,
    labelPosition: 'After',
    change: (args) => {
      console.log('Checked:', args.checked);
    }
  }
};
</script>
```

#### ComboBox Item Settings
```vue
<script setup>
const comboBoxSettings = {
  comboBoxSettings: {
    dataSource: ['Arial', 'Calibri', 'Georgia'],
    index: 1,
    width: '150px',
    allowFiltering: true,
    change: (args) => {
      console.log('Selected:', args.value);
    }
  }
};
</script>
```

---

## Display Options

Control where items appear using the `displayOptions` property.

### Display in Classic Layout Only

```vue
<e-ribbon-item type="Button" :displayOptions="classicOnly" :buttonSettings="cutButton">
</e-ribbon-item>

<script setup>
import { DisplayMode } from '@syncfusion/ej2-vue-ribbon';

const classicOnly = DisplayMode.Classic;
const cutButton = { iconCss: 'e-icons e-cut', content: 'Cut' };
</script>
```

### Display in Simplified Layout Only

```vue
<e-ribbon-item type="Button" :displayOptions="simplifiedOnly" :buttonSettings="cutButton">
</e-ribbon-item>

<script setup>
import { DisplayMode } from '@syncfusion/ej2-vue-ribbon';

const simplifiedOnly = DisplayMode.Simplified;
const cutButton = { iconCss: 'e-icons e-cut', content: 'Cut' };
</script>
```

### Display in Overflow Only

```vue
<e-ribbon-item type="Button" :displayOptions="overflowOnly" :buttonSettings="cutButton">
</e-ribbon-item>

<script setup>
import { DisplayMode } from '@syncfusion/ej2-vue-ribbon';

const overflowOnly = DisplayMode.Overflow;
const cutButton = { iconCss: 'e-icons e-cut', content: 'Cut' };
</script>
```

## Item Sizing

Control item sizes using the `allowedSizes` property.

### Available Sizes

```javascript
import { RibbonItemSize } from '@syncfusion/ej2-vue-ribbon';

const largeSize = RibbonItemSize.Large;    // Large icon with text below
const mediumSize = RibbonItemSize.Medium;  // Small icon with text beside
const smallSize = RibbonItemSize.Small;    // Small icon only
```

### Setting Allowed Sizes

```vue
<!-- Large size only -->
<e-ribbon-item type="Button" :allowedSizes="largeSize" :buttonSettings="editorButton">
</e-ribbon-item>

<!-- Medium and Small sizes -->
<e-ribbon-item type="Button" :allowedSizes="[mediumSize, smallSize]" :buttonSettings="cutButton">
</e-ribbon-item>

<script setup>
import { RibbonItemSize } from '@syncfusion/ej2-vue-ribbon';

const largeSize = RibbonItemSize.Large;
const mediumSize = RibbonItemSize.Medium;
const smallSize = RibbonItemSize.Small;

const editorButton = { iconCss: 'e-icons e-edit', content: 'Editor' };
const cutButton = { iconCss: 'e-icons e-cut', content: 'Cut' };
</script>
```

**Resizing Behavior:**
- Items automatically resize based on available space
- Transitions: Large → Medium → Small
- Only sizes in `allowedSizes` are used

## Enable/Disable Items

Control item interactivity with the `disabled` property.

### Disabling Items

```vue
<!-- Disabled button -->
<e-ribbon-item type="Button" :disabled="true" :buttonSettings="cutButton"></e-ribbon-item>

<!-- Disabled checkbox -->
<e-ribbon-item type="CheckBox" :disabled="true" :checkBoxSettings="rulerSettings"></e-ribbon-item>

<!-- Disabled dropdown -->
<e-ribbon-item type="DropDown" :disabled="true" :dropDownSettings="tableSettings"></e-ribbon-item>

<script setup>
const cutButton = { iconCss: 'e-icons e-cut', content: 'Cut' };
const rulerSettings = { label: 'Ruler', checked: true };
const tableSettings = { content: 'Table', iconCss: 'e-icons e-table', items: [] };
</script>
```

### Dynamic Enable/Disable

Use refs to dynamically enable/disable items:

```vue
<template>
  <button @click="toggleItem">Toggle Cut Button</button>
  <ejs-ribbon ref="ribbonRef">
    <!-- Ribbon content -->
  </ejs-ribbon>
</template>

<script setup>
import { ref } from 'vue';

const ribbonRef = ref(null);

const toggleItem = () => {
  const ribbon = ribbonRef.value;
  const item = ribbon.getItem('cutButton');
  
  if (item.disabled) {
    ribbon.enableItem('cutButton');
  } else {
    ribbon.disableItem('cutButton');
  }
};
</script>
```

## Complete Example

Here's a comprehensive example demonstrating all item types:

```vue
<template>
  <ejs-ribbon>
    <e-ribbon-tabs>
      <e-ribbon-tab header="Home">
        <e-ribbon-groups>
          <e-ribbon-group header="Clipboard" orientation="Column">
            <e-ribbon-collections>
              <e-ribbon-collection>
                <e-ribbon-items>
                  <e-ribbon-item type="SplitButton" :allowedSizes="largeSize" :splitButtonSettings="pasteSettings">
                  </e-ribbon-item>
                </e-ribbon-items>
              </e-ribbon-collection>
              <e-ribbon-collection>
                <e-ribbon-items>
                  <e-ribbon-item type="Button" :buttonSettings="cutButton"></e-ribbon-item>
                  <e-ribbon-item type="Button" :buttonSettings="copyButton"></e-ribbon-item>
                </e-ribbon-items>
              </e-ribbon-collection>
            </e-ribbon-collections>
          </e-ribbon-group>

          <e-ribbon-group header="Font" orientation="Row">
            <e-ribbon-collections>
              <e-ribbon-collection>
                <e-ribbon-items>
                  <e-ribbon-item type="ComboBox" :comboBoxSettings="fontOptions"></e-ribbon-item>
                  <e-ribbon-item type="ComboBox" :comboBoxSettings="sizeOptions"></e-ribbon-item>
                </e-ribbon-items>
              </e-ribbon-collection>
              <e-ribbon-collection>
                <e-ribbon-items>
                  <e-ribbon-item type="ColorPicker" :allowedSizes="smallSize" :colorPickerSettings="colorPicker">
                  </e-ribbon-item>
                  <e-ribbon-item type="Button" :allowedSizes="smallSize" :buttonSettings="boldButton"></e-ribbon-item>
                  <e-ribbon-item type="Button" :allowedSizes="smallSize" :buttonSettings="italicButton"></e-ribbon-item>
                </e-ribbon-items>
              </e-ribbon-collection>
            </e-ribbon-collections>
          </e-ribbon-group>

          <e-ribbon-group header="Paragraph">
            <e-ribbon-collections>
              <e-ribbon-collection>
                <e-ribbon-items>
                  <e-ribbon-item type="GroupButton" :allowedSizes="smallSize" :groupButtonSettings="alignmentButtons">
                  </e-ribbon-item>
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
                  <e-ribbon-item type="DropDown" :allowedSizes="largeSize" :dropDownSettings="tableSettings">
                  </e-ribbon-item>
                </e-ribbon-items>
              </e-ribbon-collection>
            </e-ribbon-collections>
          </e-ribbon-group>
        </e-ribbon-groups>
      </e-ribbon-tab>

      <e-ribbon-tab header="View">
        <e-ribbon-groups>
          <e-ribbon-group header="Show">
            <e-ribbon-collections>
              <e-ribbon-collection>
                <e-ribbon-items>
                  <e-ribbon-item type="CheckBox" :checkBoxSettings="rulerSettings"></e-ribbon-item>
                  <e-ribbon-item type="CheckBox" :checkBoxSettings="gridSettings"></e-ribbon-item>
                </e-ribbon-items>
              </e-ribbon-collection>
            </e-ribbon-collections>
          </e-ribbon-group>
        </e-ribbon-groups>
      </e-ribbon-tab>
    </e-ribbon-tabs>
  </ejs-ribbon>
</template>

<script setup>
import { provide } from 'vue';
import { RibbonComponent as EjsRibbon, RibbonItemSize, RibbonGroupButtonSelection, RibbonColorPicker,
         RibbonTabsDirective as ERibbonTabs, RibbonTabDirective as ERibbonTab,
         RibbonGroupsDirective as ERibbonGroups, RibbonGroupDirective as ERibbonGroup,
         RibbonCollectionsDirective as ERibbonCollections, RibbonCollectionDirective as ERibbonCollection,
         RibbonItemsDirective as ERibbonItems, RibbonItemDirective as ERibbonItem
} from '@syncfusion/ej2-vue-ribbon';

provide('ribbon', [RibbonColorPicker]);

const largeSize = RibbonItemSize.Large;
const smallSize = RibbonItemSize.Small;

const pasteSettings = {
  iconCss: 'e-icons e-paste',
  content: 'Paste',
  items: [
    { text: 'Keep Source Format' },
    { text: 'Merge format' },
    { text: 'Keep text only' }
  ]
};
const cutButton = { iconCss: 'e-icons e-cut', content: 'Cut' };
const copyButton = { iconCss: 'e-icons e-copy', content: 'Copy' };
const boldButton = { iconCss: 'e-icons e-bold', content: 'Bold', isToggle: true };
const italicButton = { iconCss: 'e-icons e-italic', content: 'Italic', isToggle: true };

const fontOptions = {
  dataSource: ['Arial', 'Calibri', 'Georgia', 'Times New Roman'],
  index: 1,
  width: '140px'
};
const sizeOptions = {
  dataSource: ['10', '12', '14', '16', '18', '20'],
  index: 2,
  width: '60px'
};

const colorPicker = { value: '#123456' };

const alignmentButtons = {
  selection: RibbonGroupButtonSelection.Single,
  items: [
    { iconCss: 'e-icons e-align-left', selected: true },
    { iconCss: 'e-icons e-align-center' },
    { iconCss: 'e-icons e-align-right' },
    { iconCss: 'e-icons e-justify' }
  ]
};

const tableSettings = {
  iconCss: 'e-icons e-table',
  content: 'Table',
  items: [
    { text: 'Insert Table' },
    { text: 'Draw Table' },
    { text: 'Convert Table' }
  ]
};

const rulerSettings = { label: 'Ruler', checked: false };
const gridSettings = { label: 'Gridlines', checked: true };
</script>
```

This comprehensive coverage of all item types enables you to build rich, functional ribbon interfaces.
