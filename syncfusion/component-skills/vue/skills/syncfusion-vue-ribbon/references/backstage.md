# Backstage View in Vue Ribbon Component

## Table of Contents
- [Overview](#overview)
- [Enabling Backstage](#enabling-backstage)
- [Adding Backstage Items](#adding-backstage-items)
- [Item Templates](#item-templates)
- [Footer Items](#footer-items)
- [Back Button](#back-button)
- [Backstage Size](#backstage-size)
- [Auto Close](#auto-close)
- [Backstage Events](#backstage-events)
- [Use Cases](#use-cases)
- [Complete Example](#complete-example)

## Overview

The Backstage View provides a full-screen menu experience similar to Microsoft Office's File tab. It overlays the entire ribbon and displays application-level options like account settings, document properties, and preferences.

**Key Differences from File Menu:**
- Full-screen overlay vs dropdown menu
- Custom content templates vs simple menu items
- Better for complex settings and information displays
- Modern, immersive user experience

## Enabling Backstage

Enable backstage using the `RibbonBackstage` module.

### Basic Backstage

```vue
<template>
  <ejs-ribbon>
    <e-ribbon-tabs>
      <e-ribbon-tab header="Home">
        <!-- Tab content -->
      </e-ribbon-tab>
    </e-ribbon-tabs>
    <e-ribbon-backstage text="File" :backStageMenu="backstageItems" :visible="true"></e-ribbon-backstage>
  </ejs-ribbon>
</template>

<script setup>
import { provide } from 'vue';
import { RibbonComponent as EjsRibbon, RibbonBackstage,
         RibbonTabsDirective as ERibbonTabs, RibbonTabDirective as ERibbonTab,
         RibbonBackstageDirective as ERibbonBackstage
} from '@syncfusion/ej2-vue-ribbon';

// Inject Backstage module
provide('ribbon', [RibbonBackstage]);

const backstageItems = [
  { text: 'New', iconCss: 'e-icons e-file-new', content: 'New document content' },
  { text: 'Open', iconCss: 'e-icons e-folder-open', content: 'Open document content' }
];
</script>
```

### Visibility Control

Toggle backstage visibility:

```vue
<e-ribbon-backstage text="File" :backStageMenu="backstageItems" :visible="true"></e-ribbon-backstage>

<script setup>
// Set visible: false to hide backstage button
const backstageVisible = false;
</script>
```

## Adding Backstage Items

Backstage items are configured using `BackstageItemModel`.

### Simple Items with Text Content

```vue
<script setup>
import { provide } from 'vue';
import { RibbonBackstage } from '@syncfusion/ej2-vue-ribbon';

provide('ribbon', [RibbonBackstage]);

const backstageItems = [
  { 
    id: 'new',
    text: 'New', 
    iconCss: 'e-icons e-file-new',
    content: '<h3>Create New Document</h3><p>Start with a blank document or choose from templates.</p>'
  },
  { 
    id: 'open',
    text: 'Open', 
    iconCss: 'e-icons e-folder-open',
    content: '<h3>Open Document</h3><p>Browse for files on your computer or cloud storage.</p>'
  },
  { 
    id: 'save',
    text: 'Save', 
    iconCss: 'e-icons e-save',
    content: '<h3>Save Document</h3><p>Save your work to prevent data loss.</p>'
  }
];
</script>
```

### Separator Items

Add separators to organize backstage items:

```vue
<script setup>
const backstageItems = [
  { text: 'New', iconCss: 'e-icons e-file-new', content: 'New content' },
  { text: 'Open', iconCss: 'e-icons e-folder-open', content: 'Open content' },
  { separator: true },
  { text: 'Info', iconCss: 'e-icons e-info', content: 'Document info' },
  { text: 'Print', iconCss: 'e-icons e-print', content: 'Print options' }
];
</script>
```

## Item Templates

Use templates for rich content displays.

### HTML Content Template

```vue
<script setup>
const backstageItems = [
  { 
    text: 'Info', 
    iconCss: 'e-icons e-info',
    content: `
      <div class="backstage-info">
        <h2>Document Properties</h2>
        <div class="property">
          <label>Title:</label>
          <span>My Document</span>
        </div>
        <div class="property">
          <label>Author:</label>
          <span>John Doe</span>
        </div>
        <div class="property">
          <label>Created:</label>
          <span>January 15, 2024</span>
        </div>
        <div class="property">
          <label>Modified:</label>
          <span>January 20, 2024</span>
        </div>
      </div>
    `
  }
];
</script>

<style>
.backstage-info {
  padding: 20px;
}

.backstage-info h2 {
  margin-bottom: 20px;
}

.property {
  display: flex;
  margin-bottom: 10px;
}

.property label {
  font-weight: bold;
  width: 100px;
}
</style>
```

### Form Template

```vue
<script setup>
const backstageItems = [
  { 
    text: 'Account', 
    iconCss: 'e-icons e-user',
    content: `
      <div class="backstage-account">
        <h2>Account Settings</h2>
        <form>
          <div class="form-group">
            <label for="username">Username:</label>
            <input type="text" id="username" value="john.doe@example.com" readonly />
          </div>
          <div class="form-group">
            <label for="displayname">Display Name:</label>
            <input type="text" id="displayname" value="John Doe" />
          </div>
          <div class="form-group">
            <button type="button" class="e-btn e-primary">Update Profile</button>
            <button type="button" class="e-btn">Sign Out</button>
          </div>
        </form>
      </div>
    `
  }
];
</script>

<style>
.backstage-account {
  padding: 20px;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

.form-group input {
  width: 300px;
  padding: 5px;
}

.form-group button {
  margin-right: 10px;
}
</style>
```

### List Template

```vue
<script setup>
const backstageItems = [
  { 
    text: 'Recent', 
    iconCss: 'e-icons e-folder',
    content: `
      <div class="backstage-recent">
        <h2>Recent Documents</h2>
        <ul class="recent-list">
          <li>
            <span class="e-icons e-file"></span>
            <div>
              <strong>Project Report.docx</strong>
              <small>Documents • Today at 2:30 PM</small>
            </div>
          </li>
          <li>
            <span class="e-icons e-file"></span>
            <div>
              <strong>Budget 2024.xlsx</strong>
              <small>Spreadsheets • Yesterday</small>
            </div>
          </li>
          <li>
            <span class="e-icons e-file"></span>
            <div>
              <strong>Presentation.pptx</strong>
              <small>Presentations • Jan 18</small>
            </div>
          </li>
        </ul>
      </div>
    `
  }
];
</script>

<style>
.backstage-recent {
  padding: 20px;
}

.recent-list {
  list-style: none;
  padding: 0;
}

.recent-list li {
  display: flex;
  align-items: center;
  padding: 10px;
  border-bottom: 1px solid #e0e0e0;
  cursor: pointer;
}

.recent-list li:hover {
  background-color: #f5f5f5;
}

.recent-list .e-icons {
  font-size: 32px;
  margin-right: 15px;
  color: #0078d4;
}

.recent-list strong {
  display: block;
  margin-bottom: 3px;
}

.recent-list small {
  color: #666;
}
</style>
```

## Footer Items

Place items at the bottom of the backstage menu.

### Adding Footer Items

```vue
<script setup>
const backstageItems = [
  { text: 'New', iconCss: 'e-icons e-file-new', content: 'New content' },
  { text: 'Open', iconCss: 'e-icons e-folder-open', content: 'Open content' },
  { separator: true },
  { 
    text: 'Options', 
    iconCss: 'e-icons e-settings', 
    content: 'Settings content',
    isFooter: true  // Place in footer
  },
  { 
    text: 'Exit', 
    iconCss: 'e-icons e-close', 
    content: '',
    isFooter: true  // Place in footer
  }
];
</script>
```

**Footer Behavior:**
- Items with `isFooter: true` appear at bottom
- Maintains separation from main content
- Common for Options, Help, Exit

## Back Button

Customize the back button that closes backstage.

### Default Back Button

By default, a back arrow button appears:

```vue
<e-ribbon-backstage text="File" :backStageMenu="backstageItems"></e-ribbon-backstage>
```

### Custom Back Button Text

Customize the back button:

```vue
<e-ribbon-backstage 
  text="File" 
  :backStageMenu="backstageItems"
  :backButton="{ text: 'Close', iconCss: 'e-icons e-close' }">
</e-ribbon-backstage>
```

### Back Button Properties

```javascript
const backButtonConfig = {
  text: 'Back',              // Button text
  iconCss: 'e-icons e-arrow-left',  // Icon class
  visible: true              // Show/hide button
};
```

## Backstage Size

Control backstage dimensions.

### Custom Width and Height

```vue
<e-ribbon-backstage 
  text="File" 
  :backStageMenu="backstageItems"
  width="600px"
  height="400px">
</e-ribbon-backstage>
```

### Header Height

Control the backstage header height:

```vue
<e-ribbon-backstage 
  text="File" 
  :backStageMenu="backstageItems"
  headerHeight="60px">
</e-ribbon-backstage>
```

## Auto Close

Control backstage closing behavior.

### Auto Close on Item Click (Default)

Backstage closes automatically when clicking items:

```vue
<e-ribbon-backstage 
  text="File" 
  :backStageMenu="backstageItems"
  :autoClose="true">
</e-ribbon-backstage>
```

### Manual Close

Keep backstage open after item clicks:

```vue
<e-ribbon-backstage 
  text="File" 
  :backStageMenu="backstageItems"
  :autoClose="false">
</e-ribbon-backstage>
```

## Backstage Events

Handle backstage interactions with events.

### Item Click Event

Triggered when a backstage item is clicked:

```vue
<e-ribbon-backstage 
  text="File" 
  :backStageMenu="backstageItems"
  @itemClick="onItemClick">
</e-ribbon-backstage>

<script setup>
const onItemClick = (args) => {
  console.log('Item clicked:', args.item.text);
  console.log('Item ID:', args.item.id);
  
  if (args.item.id === 'exit') {
    // Perform cleanup
    console.log('Exiting application...');
  }
};
</script>
```

### Before Open and Close Events

```vue
<e-ribbon-backstage 
  text="File" 
  :backStageMenu="backstageItems"
  @beforeOpen="onBeforeOpen"
  @beforeClose="onBeforeClose">
</e-ribbon-backstage>

<script setup>
const onBeforeOpen = (args) => {
  console.log('Backstage opening...');
  // args.cancel = true to prevent opening
};

const onBeforeClose = (args) => {
  console.log('Backstage closing...');
  // args.cancel = true to prevent closing
};
</script>
```

### Open and Close Events

```vue
<e-ribbon-backstage 
  text="File" 
  :backStageMenu="backstageItems"
  @open="onOpen"
  @close="onClose">
</e-ribbon-backstage>

<script setup>
const onOpen = () => {
  console.log('Backstage opened');
  // Load data, update content
};

const onClose = () => {
  console.log('Backstage closed');
  // Cleanup, save state
};
</script>
```

## Use Cases

### Application Settings

```vue
<script setup>
const backstageItems = [
  { 
    text: 'Settings', 
    iconCss: 'e-icons e-settings',
    content: `
      <div class="settings">
        <h2>Application Settings</h2>
        <div class="setting-group">
          <h3>General</h3>
          <label><input type="checkbox" checked /> Show startup screen</label>
          <label><input type="checkbox" /> Auto-save every 10 minutes</label>
        </div>
        <div class="setting-group">
          <h3>Display</h3>
          <label><input type="checkbox" checked /> Show ruler</label>
          <label><input type="checkbox" checked /> Show gridlines</label>
        </div>
      </div>
    `
  }
];
</script>
```

### User Information

```vue
<script setup>
const backstageItems = [
  { 
    text: 'Account', 
    iconCss: 'e-icons e-user',
    content: `
      <div class="user-info">
        <div class="profile">
          <img src="avatar.jpg" alt="User Avatar" />
          <h2>John Doe</h2>
          <p>john.doe@example.com</p>
        </div>
        <div class="subscription">
          <h3>Subscription: Premium</h3>
          <p>Valid until: December 31, 2024</p>
          <button class="e-btn e-primary">Manage Subscription</button>
        </div>
      </div>
    `
  }
];
</script>
```

### Document Properties

```vue
<script setup>
const backstageItems = [
  { 
    text: 'Info', 
    iconCss: 'e-icons e-info',
    content: `
      <div class="doc-info">
        <h2>Document Information</h2>
        <table>
          <tr><td><strong>Size:</strong></td><td>45 KB</td></tr>
          <tr><td><strong>Pages:</strong></td><td>12</td></tr>
          <tr><td><strong>Words:</strong></td><td>3,245</td></tr>
          <tr><td><strong>Characters:</strong></td><td>18,567</td></tr>
        </table>
      </div>
    `
  }
];
</script>
```

## Complete Example

Full backstage implementation with multiple items:

```vue
<template>
  <ejs-ribbon>
    <e-ribbon-tabs>
      <e-ribbon-tab header="Home">
        <e-ribbon-groups>
          <e-ribbon-group header="Clipboard">
            <e-ribbon-collections>
              <e-ribbon-collection>
                <e-ribbon-items>
                  <e-ribbon-item type="Button" :buttonSettings="cutButton"></e-ribbon-item>
                  <e-ribbon-item type="Button" :buttonSettings="copyButton"></e-ribbon-item>
                </e-ribbon-items>
              </e-ribbon-collection>
            </e-ribbon-collections>
          </e-ribbon-group>
        </e-ribbon-groups>
      </e-ribbon-tab>
    </e-ribbon-tabs>
    
    <e-ribbon-backstage 
      text="File"
      :backStageMenu="backstageItems"
      :visible="true"
      :autoClose="true"
      width="700px"
      headerHeight="50px"
      :backButton="backButtonConfig"
      @itemClick="onItemClick"
      @open="onBackstageOpen"
      @close="onBackstageClose">
    </e-ribbon-backstage>
  </ejs-ribbon>
</template>

<script setup>
import { provide } from 'vue';
import { RibbonComponent as EjsRibbon, RibbonBackstage,
         RibbonTabsDirective as ERibbonTabs, RibbonTabDirective as ERibbonTab,
         RibbonGroupsDirective as ERibbonGroups, RibbonGroupDirective as ERibbonGroup,
         RibbonCollectionsDirective as ERibbonCollections, RibbonCollectionDirective as ERibbonCollection,
         RibbonItemsDirective as ERibbonItems, RibbonItemDirective as ERibbonItem,
         RibbonBackstageDirective as ERibbonBackstage
} from '@syncfusion/ej2-vue-ribbon';

provide('ribbon', [RibbonBackstage]);

const backstageItems = [
  { 
    id: 'new',
    text: 'New', 
    iconCss: 'e-icons e-file-new',
    content: '<div class="content"><h2>Create New Document</h2><p>Start with a blank document.</p></div>'
  },
  { 
    id: 'open',
    text: 'Open', 
    iconCss: 'e-icons e-folder-open',
    content: '<div class="content"><h2>Open Document</h2><p>Browse for existing files.</p></div>'
  },
  { separator: true },
  { 
    id: 'info',
    text: 'Info', 
    iconCss: 'e-icons e-info',
    content: `
      <div class="content">
        <h2>Document Properties</h2>
        <table>
          <tr><td><strong>Title:</strong></td><td>My Document</td></tr>
          <tr><td><strong>Author:</strong></td><td>John Doe</td></tr>
          <tr><td><strong>Created:</strong></td><td>Jan 15, 2024</td></tr>
        </table>
      </div>
    `
  },
  { 
    id: 'print',
    text: 'Print', 
    iconCss: 'e-icons e-print',
    content: '<div class="content"><h2>Print Document</h2><p>Configure print settings.</p></div>'
  },
  { separator: true },
  { 
    id: 'settings',
    text: 'Settings', 
    iconCss: 'e-icons e-settings',
    content: '<div class="content"><h2>Application Settings</h2><p>Customize your experience.</p></div>',
    isFooter: true
  },
  { 
    id: 'exit',
    text: 'Exit', 
    iconCss: 'e-icons e-close',
    content: '',
    isFooter: true
  }
];

const backButtonConfig = {
  text: 'Close',
  iconCss: 'e-icons e-arrow-left'
};

const cutButton = { iconCss: 'e-icons e-cut', content: 'Cut' };
const copyButton = { iconCss: 'e-icons e-copy', content: 'Copy' };

const onItemClick = (args) => {
  console.log('Clicked:', args.item.text);
  
  if (args.item.id === 'exit') {
    console.log('Exiting application');
  }
};

const onBackstageOpen = () => {
  console.log('Backstage opened');
};

const onBackstageClose = () => {
  console.log('Backstage closed');
};
</script>

<style>
.content {
  padding: 30px;
}

.content h2 {
  margin-bottom: 15px;
}

.content table {
  width: 100%;
  border-collapse: collapse;
}

.content table tr {
  border-bottom: 1px solid #e0e0e0;
}

.content table td {
  padding: 10px;
}
</style>
```

This comprehensive backstage implementation provides a modern, full-screen application menu experience.
