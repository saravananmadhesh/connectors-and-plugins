# Gallery Items in Vue Ribbon Component

## Table of Contents
- [Overview](#overview)
- [Enabling Gallery](#enabling-gallery)
- [Basic Gallery](#basic-gallery)
- [Gallery Groups](#gallery-groups)
- [Gallery Items](#gallery-items)
- [Item Count and Height](#item-count-and-height)
- [Popup Dimensions](#popup-dimensions)
- [Item Orientation](#item-orientation)
- [Gallery Events](#gallery-events)
- [Custom Templates](#custom-templates)
- [Common Patterns](#common-patterns)
- [Complete Example](#complete-example)

## Overview

Gallery items display collections of related visual options in a grid format. They're perfect for presenting styles, themes, color schemes, and other visual choices.

**Key Features:**
- Grid-based visual presentation
- Organized into groups
- Dropdown popup for expanded view
- Support for custom templates
- Hover and selection events
- Configurable item count and dimensions

## Enabling Gallery

Enable gallery items using the `RibbonGallery` module.

### Basic Setup

```vue
<template>
  <ejs-ribbon>
    <e-ribbon-tabs>
      <e-ribbon-tab header="Home">
        <e-ribbon-groups>
          <e-ribbon-group header="Gallery">
            <e-ribbon-collections>
              <e-ribbon-collection>
                <e-ribbon-items>
                  <e-ribbon-item type="Gallery" :gallerySettings="styleGallery"></e-ribbon-item>
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
import { RibbonComponent as EjsRibbon, RibbonGallery,
         RibbonTabsDirective as ERibbonTabs, RibbonTabDirective as ERibbonTab,
         RibbonGroupsDirective as ERibbonGroups, RibbonGroupDirective as ERibbonGroup,
         RibbonCollectionsDirective as ERibbonCollections, RibbonCollectionDirective as ERibbonCollection,
         RibbonItemsDirective as ERibbonItems, RibbonItemDirective as ERibbonItem
} from '@syncfusion/ej2-vue-ribbon';

// Inject Gallery module
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

## Basic Gallery

Create a simple gallery with items.

### Simple Text Gallery

```vue
<script setup>
import { provide } from 'vue';
import { RibbonGallery } from '@syncfusion/ej2-vue-ribbon';

provide('ribbon', [RibbonGallery]);

const styleGallery = {
  groups: [{
    header: 'Styles',
    items: [
      { content: 'Normal' },
      { content: 'No Spacing' },
      { content: 'Heading 1' },
      { content: 'Heading 2' },
      { content: 'Title' },
      { content: 'Subtitle' }
    ]
  }]
};
</script>
```

### Gallery with Icons

```vue
<script setup>
const iconGallery = {
  groups: [{
    header: 'Shapes',
    items: [
      { content: 'Rectangle', iconCss: 'e-icons e-rectangle' },
      { content: 'Circle', iconCss: 'e-icons e-circle' },
      { content: 'Triangle', iconCss: 'e-icons e-triangle' },
      { content: 'Star', iconCss: 'e-icons e-star' }
    ]
  }]
};
</script>
```

## Gallery Groups

Organize gallery items into logical groups.

### Single Group

```vue
<script setup>
const gallerySettings = {
  groups: [{
    header: 'Themes',
    items: [
      { content: 'Light' },
      { content: 'Dark' },
      { content: 'Blue' }
    ]
  }]
};
</script>
```

### Multiple Groups

```vue
<script setup>
const gallerySettings = {
  groups: [
    {
      header: 'Built-in Styles',
      items: [
        { content: 'Normal' },
        { content: 'Heading 1' },
        { content: 'Heading 2' },
        { content: 'Title' }
      ]
    },
    {
      header: 'Custom Styles',
      items: [
        { content: 'Quote' },
        { content: 'Intense Quote' },
        { content: 'Book Title' }
      ]
    }
  ]
};
</script>
```

### Group with CSS Classes

Apply styling to groups:

```vue
<script setup>
const colorGallery = {
  groups: [
    {
      header: 'Theme Colors',
      cssClass: 'theme-colors-group',
      items: [
        { content: 'Blue', cssClass: 'color-blue' },
        { content: 'Red', cssClass: 'color-red' },
        { content: 'Green', cssClass: 'color-green' }
      ]
    },
    {
      header: 'Standard Colors',
      cssClass: 'standard-colors-group',
      items: [
        { content: 'Black', cssClass: 'color-black' },
        { content: 'White', cssClass: 'color-white' }
      ]
    }
  ]
};
</script>

<style>
.color-blue { background-color: #0078d4; color: white; }
.color-red { background-color: #d13438; color: white; }
.color-green { background-color: #107c10; color: white; }
.color-black { background-color: #000; color: white; }
.color-white { background-color: #fff; color: black; border: 1px solid #ccc; }
</style>
```

## Gallery Items

Configure individual gallery items.

### Item Properties

```javascript
const galleryItem = {
  content: 'Item Text',           // Display content
  iconCss: 'e-icons e-icon',      // Icon CSS class
  cssClass: 'custom-class',       // Custom CSS class
  htmlAttributes: {               // HTML attributes
    'data-value': 'value',
    'title': 'Tooltip text'
  }
};
```

### Items with Custom CSS

```vue
<script setup>
const styleGallery = {
  groups: [{
    header: 'Text Styles',
    items: [
      { 
        content: 'Normal',
        cssClass: 'style-normal',
        htmlAttributes: { 'title': 'Normal text style' }
      },
      { 
        content: 'Heading 1',
        cssClass: 'style-heading1',
        htmlAttributes: { 'title': 'Large heading' }
      },
      { 
        content: 'Heading 2',
        cssClass: 'style-heading2',
        htmlAttributes: { 'title': 'Medium heading' }
      }
    ]
  }]
};
</script>

<style>
.style-normal {
  font-size: 14px;
  font-weight: normal;
}

.style-heading1 {
  font-size: 24px;
  font-weight: bold;
  color: #0078d4;
}

.style-heading2 {
  font-size: 18px;
  font-weight: bold;
  color: #106ebe;
}
</style>
```

## Item Count and Height

Control how many items are visible and their height.

### Item Count

Set the number of visible items in the ribbon:

```vue
<e-ribbon-item type="Gallery" :gallerySettings="styleGallery"></e-ribbon-item>

<script setup>
const styleGallery = {
  itemCount: 3,  // Show 3 items in ribbon
  groups: [{
    items: [
      { content: 'Style 1' },
      { content: 'Style 2' },
      { content: 'Style 3' },
      { content: 'Style 4' },
      { content: 'Style 5' }
    ]
  }]
};
</script>
```

**Behavior:**
- If items exceed `itemCount`, a dropdown arrow appears
- Click the arrow to see all items in a popup
- Default: Shows all items up to available space

### Item Height

Set the height of gallery items:

```vue
<script setup>
const styleGallery = {
  itemCount: 3,
  itemHeight: '60px',  // Custom item height
  groups: [{
    items: [
      { content: 'Normal' },
      { content: 'Heading 1' },
      { content: 'Heading 2' }
    ]
  }]
};
</script>
```

## Popup Dimensions

Configure the dropdown popup size.

### Popup Height and Width

```vue
<script setup>
const styleGallery = {
  itemCount: 3,
  popupHeight: '400px',
  popupWidth: '600px',
  groups: [{
    items: [
      { content: 'Style 1' },
      { content: 'Style 2' },
      { content: 'Style 3' },
      { content: 'Style 4' },
      { content: 'Style 5' },
      { content: 'Style 6' }
    ]
  }]
};
</script>
```

### Popup with Scrolling

Large galleries automatically get scrollbars:

```vue
<script setup>
const largeGallery = {
  itemCount: 3,
  popupHeight: '300px',
  popupWidth: '500px',
  groups: [
    {
      header: 'Built-in Styles',
      items: Array.from({ length: 20 }, (_, i) => ({
        content: `Style ${i + 1}`
      }))
    }
  ]
};
</script>
```

## Item Orientation

Control gallery item layout direction.

### Row Orientation (Default)

Items arranged horizontally:

```vue
<script setup>
const gallerySettings = {
  itemOrientation: 'Row',  // Horizontal layout
  groups: [{
    items: [
      { content: 'Item 1' },
      { content: 'Item 2' },
      { content: 'Item 3' }
    ]
  }]
};
</script>
```

### Column Orientation

Items arranged vertically:

```vue
<script setup>
const gallerySettings = {
  itemOrientation: 'Column',  // Vertical layout
  groups: [{
    items: [
      { content: 'Item 1' },
      { content: 'Item 2' },
      { content: 'Item 3' }
    ]
  }]
};
</script>
```

## Gallery Events

Handle gallery interactions.

### Select Event

Triggered when an item is selected:

```vue
<e-ribbon-item type="Gallery" :gallerySettings="styleGallery"></e-ribbon-item>

<script setup>
const styleGallery = {
  groups: [{
    items: [
      { content: 'Normal' },
      { content: 'Heading 1' }
    ]
  }],
  select: (args) => {
    console.log('Selected item:', args.item.content);
    console.log('Selected item index:', args.itemIndex);
    console.log('Group index:', args.groupIndex);
    
    // Apply the selected style
    applyStyle(args.item.content);
  }
};

const applyStyle = (styleName) => {
  console.log('Applying style:', styleName);
};
</script>
```

### Before Select Event

Triggered before item selection (can be cancelled):

```vue
<script setup>
const styleGallery = {
  groups: [{ items: [{ content: 'Style 1' }] }],
  beforeSelect: (args) => {
    console.log('About to select:', args.item.content);
    
    // Cancel selection based on condition
    if (args.item.content === 'Disabled Style') {
      args.cancel = true;
    }
  }
};
</script>
```

### Hover Event

Triggered when hovering over items:

```vue
<script setup>
const styleGallery = {
  groups: [{ items: [{ content: 'Style 1' }] }],
  hover: (args) => {
    console.log('Hovering over:', args.item.content);
    // Show preview
    previewStyle(args.item.content);
  }
};

const previewStyle = (styleName) => {
  console.log('Previewing:', styleName);
};
</script>
```

### Popup Open and Close Events

```vue
<script setup>
const styleGallery = {
  groups: [{ items: [{ content: 'Style 1' }] }],
  popupOpen: () => {
    console.log('Gallery popup opened');
  },
  popupClose: () => {
    console.log('Gallery popup closed');
  }
};
</script>
```

## Custom Templates

Use templates for rich visual galleries.

### HTML Template

```vue
<script setup>
const colorGallery = {
  groups: [{
    header: 'Colors',
    items: [
      { 
        content: `
          <div class="color-item">
            <div class="color-box" style="background-color: #0078d4;"></div>
            <span>Blue</span>
          </div>
        `
      },
      { 
        content: `
          <div class="color-item">
            <div class="color-box" style="background-color: #d13438;"></div>
            <span>Red</span>
          </div>
        `
      },
      { 
        content: `
          <div class="color-item">
            <div class="color-box" style="background-color: #107c10;"></div>
            <span>Green</span>
          </div>
        `
      }
    ]
  }]
};
</script>

<style>
.color-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
}

.color-box {
  width: 50px;
  height: 50px;
  border-radius: 4px;
  margin-bottom: 5px;
  border: 2px solid #ccc;
}

.color-item span {
  font-size: 12px;
}
</style>
```

### Image-Based Gallery

```vue
<script setup>
const themeGallery = {
  itemHeight: '100px',
  groups: [{
    header: 'Themes',
    items: [
      { 
        content: `
          <div class="theme-item">
            <img src="theme-light.png" alt="Light" />
            <span>Light</span>
          </div>
        `
      },
      { 
        content: `
          <div class="theme-item">
            <img src="theme-dark.png" alt="Dark" />
            <span>Dark</span>
          </div>
        `
      }
    ]
  }]
};
</script>

<style>
.theme-item {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.theme-item img {
  width: 80px;
  height: 60px;
  border: 1px solid #ccc;
  margin-bottom: 5px;
}
</style>
```

## Common Patterns

### Style Gallery Pattern

```vue
<script setup>
const styleGallery = {
  itemCount: 4,
  popupHeight: '350px',
  popupWidth: '500px',
  groups: [
    {
      header: 'Built-in Styles',
      items: [
        { content: 'Normal', cssClass: 'style-normal' },
        { content: 'Heading 1', cssClass: 'style-h1' },
        { content: 'Heading 2', cssClass: 'style-h2' },
        { content: 'Title', cssClass: 'style-title' },
        { content: 'Subtitle', cssClass: 'style-subtitle' },
        { content: 'Quote', cssClass: 'style-quote' }
      ]
    }
  ],
  select: (args) => {
    console.log('Apply style:', args.item.content);
  }
};
</script>
```

### Color Palette Pattern

```vue
<script setup>
const colorGallery = {
  itemHeight: '40px',
  popupHeight: '300px',
  popupWidth: '400px',
  groups: [
    {
      header: 'Theme Colors',
      items: [
        { content: '<div class="color-swatch" style="background: #0078d4;"></div>' },
        { content: '<div class="color-swatch" style="background: #d13438;"></div>' },
        { content: '<div class="color-swatch" style="background: #107c10;"></div>' },
        { content: '<div class="color-swatch" style="background: #ff8c00;"></div>' }
      ]
    },
    {
      header: 'Standard Colors',
      items: [
        { content: '<div class="color-swatch" style="background: #000;"></div>' },
        { content: '<div class="color-swatch" style="background: #fff; border: 1px solid #ccc;"></div>' },
        { content: '<div class="color-swatch" style="background: #808080;"></div>' }
      ]
    }
  ],
  select: (args) => {
    console.log('Color selected');
  }
};
</script>

<style>
.color-swatch {
  width: 50px;
  height: 30px;
  border-radius: 2px;
}
</style>
```

### Table Style Gallery Pattern

```vue
<script setup>
const tableStyleGallery = {
  itemCount: 3,
  itemHeight: '80px',
  popupHeight: '400px',
  popupWidth: '600px',
  groups: [{
    header: 'Table Styles',
    items: [
      { 
        content: `
          <div class="table-preview">
            <div class="table-style-1">
              <div class="row header">Header</div>
              <div class="row">Row 1</div>
              <div class="row">Row 2</div>
            </div>
            <span>Light Grid</span>
          </div>
        `
      },
      { 
        content: `
          <div class="table-preview">
            <div class="table-style-2">
              <div class="row header">Header</div>
              <div class="row">Row 1</div>
              <div class="row">Row 2</div>
            </div>
            <span>Dark Grid</span>
          </div>
        `
      }
    ]
  }]
};
</script>

<style>
.table-preview {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.table-style-1,
.table-style-2 {
  width: 80px;
  border: 1px solid #ccc;
  margin-bottom: 5px;
}

.row {
  padding: 4px;
  border-bottom: 1px solid #ddd;
  font-size: 10px;
}

.table-style-1 .header {
  background: #f0f0f0;
  font-weight: bold;
}

.table-style-2 .header {
  background: #333;
  color: white;
  font-weight: bold;
}
</style>
```

## Complete Example

Full gallery implementation with events:

```vue
<template>
  <div>
    <div class="preview">
      <h3>Preview</h3>
      <div :class="'preview-content ' + selectedStyle">
        {{ previewText }}
      </div>
    </div>
    
    <ejs-ribbon>
      <e-ribbon-tabs>
        <e-ribbon-tab header="Home">
          <e-ribbon-groups>
            <e-ribbon-group header="Styles">
              <e-ribbon-collections>
                <e-ribbon-collection>
                  <e-ribbon-items>
                    <e-ribbon-item type="Gallery" :gallerySettings="styleGallery"></e-ribbon-item>
                  </e-ribbon-items>
                </e-ribbon-collection>
              </e-ribbon-collections>
            </e-ribbon-group>
            
            <e-ribbon-group header="Colors">
              <e-ribbon-collections>
                <e-ribbon-collection>
                  <e-ribbon-items>
                    <e-ribbon-item type="Gallery" :gallerySettings="colorGallery"></e-ribbon-item>
                  </e-ribbon-items>
                </e-ribbon-collection>
              </e-ribbon-collections>
            </e-ribbon-group>
          </e-ribbon-groups>
        </e-ribbon-tab>
      </e-ribbon-tabs>
    </ejs-ribbon>
  </div>
</template>

<script setup>
import { ref, provide } from 'vue';
import { RibbonComponent as EjsRibbon, RibbonGallery,
         RibbonTabsDirective as ERibbonTabs, RibbonTabDirective as ERibbonTab,
         RibbonGroupsDirective as ERibbonGroups, RibbonGroupDirective as ERibbonGroup,
         RibbonCollectionsDirective as ERibbonCollections, RibbonCollectionDirective as ERibbonCollection,
         RibbonItemsDirective as ERibbonItems, RibbonItemDirective as ERibbonItem
} from '@syncfusion/ej2-vue-ribbon';

provide('ribbon', [RibbonGallery]);

const selectedStyle = ref('normal');
const previewText = ref('This is sample text to preview styles');

const styleGallery = {
  itemCount: 4,
  popupHeight: '350px',
  popupWidth: '500px',
  groups: [
    {
      header: 'Quick Styles',
      items: [
        { content: 'Normal', cssClass: 'gallery-normal' },
        { content: 'Heading 1', cssClass: 'gallery-h1' },
        { content: 'Heading 2', cssClass: 'gallery-h2' },
        { content: 'Title', cssClass: 'gallery-title' },
        { content: 'Subtitle', cssClass: 'gallery-subtitle' },
        { content: 'Quote', cssClass: 'gallery-quote' }
      ]
    }
  ],
  hover: (args) => {
    console.log('Hovering:', args.item.content);
  },
  select: (args) => {
    console.log('Selected:', args.item.content);
    selectedStyle.value = args.item.cssClass.replace('gallery-', '');
  }
};

const colorGallery = {
  itemHeight: '40px',
  itemCount: 5,
  popupHeight: '250px',
  groups: [{
    header: 'Colors',
    items: [
      { content: '<div class="color-box blue"></div>' },
      { content: '<div class="color-box red"></div>' },
      { content: '<div class="color-box green"></div>' },
      { content: '<div class="color-box orange"></div>' },
      { content: '<div class="color-box purple"></div>' }
    ]
  }],
  select: (args) => {
    console.log('Color selected');
  }
};
</script>

<style>
.preview {
  margin-bottom: 20px;
  padding: 20px;
  border: 1px solid #ccc;
}

.preview-content {
  padding: 15px;
  margin-top: 10px;
}

.preview-content.normal { font-size: 14px; }
.preview-content.h1 { font-size: 28px; font-weight: bold; color: #0078d4; }
.preview-content.h2 { font-size: 20px; font-weight: bold; color: #106ebe; }
.preview-content.title { font-size: 32px; font-weight: bold; }
.preview-content.subtitle { font-size: 16px; font-style: italic; color: #666; }
.preview-content.quote { font-style: italic; border-left: 3px solid #ccc; padding-left: 15px; }

.gallery-normal { font-size: 14px; }
.gallery-h1 { font-size: 18px; font-weight: bold; color: #0078d4; }
.gallery-h2 { font-size: 16px; font-weight: bold; color: #106ebe; }
.gallery-title { font-size: 20px; font-weight: bold; }
.gallery-subtitle { font-size: 14px; font-style: italic; color: #666; }
.gallery-quote { font-style: italic; }

.color-box {
  width: 40px;
  height: 30px;
  border-radius: 2px;
  border: 1px solid #ccc;
}

.color-box.blue { background: #0078d4; }
.color-box.red { background: #d13438; }
.color-box.green { background: #107c10; }
.color-box.orange { background: #ff8c00; }
.color-box.purple { background: #5c2d91; }
</style>
```

This comprehensive gallery implementation provides rich visual options with full customization and event handling.
