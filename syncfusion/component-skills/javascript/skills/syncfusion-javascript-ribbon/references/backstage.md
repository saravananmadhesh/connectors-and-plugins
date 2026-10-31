# Backstage Menu

This guide covers the Backstage feature in the Ribbon, which provides a full-page menu view for application-level operations, settings, and information. **Backstage requires the RibbonBackstage module.**

## Table of Contents

- [Backstage Overview](#backstage-overview)
- [Module Injection](#module-injection)
- [Basic Backstage Setup](#basic-backstage-setup)
- [Adding Backstage Items](#adding-backstage-items)
- [Item Content](#item-content)
- [Footer Items](#footer-items)
- [Adding Separators](#adding-separators)
- [Back Button Customization](#back-button-customization)
- [Target Element](#target-element)
- [Using Templates](#using-templates)
- [Width and Height Configuration](#width-and-height-configuration)
- [Backstage Events](#backstage-events)
- [Backstage Module Methods](#backstage-module-methods)
- [Complete Examples](#complete-examples)

## Backstage Overview

The Backstage provides a full-screen overlay menu for application operations:

**Comparison with File Menu:**
- **File Menu**: Dropdown menu, compact, quick actions
- **Backstage**: Full-page view, detailed content, complex workflows

**Common use cases:**
- Account management and user profiles
- Application settings and preferences
- Document properties and metadata
- Print preview and settings
- File sharing and export options
- Help and about information

**Key features:**
- Full-page or partial overlay
- Left sidebar navigation with item content on right
- Footer items for secondary actions
- Custom templates for rich content
- Back button to return to document

## Module Injection

Backstage requires the `RibbonBackstage` module:

```typescript
import { Ribbon, RibbonBackstage } from "@syncfusion/ej2-ribbon";

// Inject Backstage module
Ribbon.Inject(RibbonBackstage);
```

**Important:** Always inject `RibbonBackstage` before creating a Ribbon with backstage.

## Basic Backstage Setup

Create a simple Backstage:

```typescript
import { Ribbon, RibbonBackstage } from "@syncfusion/ej2-ribbon";
import { BackstageItemModel } from "@syncfusion/ej2-ribbon";

Ribbon.Inject(RibbonBackstage);

let backstageItems: BackstageItemModel[] = [
    {
        id: "home",
        text: "Home",
        content: "<div style='padding: 20px;'><h2>Home</h2><p>Welcome to the application!</p></div>"
    },
    {
        id: "new",
        text: "New",
        content: "<div style='padding: 20px;'><h2>New Document</h2><p>Create a new document.</p></div>"
    },
    {
        id: "open",
        text: "Open",
        content: "<div style='padding: 20px;'><h2>Open</h2><p>Open an existing document.</p></div>"
    }
];

let ribbon: Ribbon = new Ribbon({
    backStageMenu: {
        visible: true,
        items: backstageItems
    },
    tabs: []
});

ribbon.appendTo("#ribbon");
```

**Key points:**
- `visible: true` enables the Backstage
- Each item has `id`, `text`, and `content`
- Content is HTML displayed when item is selected

## Adding Backstage Items

Define backstage items with icons and content:

```typescript
let backstageItems: BackstageItemModel[] = [
    {
        id: "info",
        text: "Info",
        iconCss: "e-icons e-info",
        content: "<div class='info-content'>" +
                 "  <h2>Document Information</h2>" +
                 "  <p>Title: My Document</p>" +
                 "  <p>Author: John Doe</p>" +
                 "  <p>Created: 2026-03-15</p>" +
                 "</div>"
    },
    {
        id: "save",
        text: "Save As",
        iconCss: "e-icons e-save",
        content: "<div class='save-content'>" +
                 "  <h2>Save Document</h2>" +
                 "  <p>Choose location and format...</p>" +
                 "</div>"
    },
    {
        id: "print",
        text: "Print",
        iconCss: "e-icons e-print",
        content: "<div class='print-content'>" +
                 "  <h2>Print Settings</h2>" +
                 "  <p>Configure print options...</p>" +
                 "</div>"
    }
];
```

**Item properties:**
- `id` (string, required): Unique identifier
- `text` (string, required): Display text in sidebar
- `iconCss` (string): Icon CSS class
- `content` (string): HTML content displayed on right side
- `isFooter` (boolean): Display in footer area
- `separator` (boolean): Add separator after item
- `disabled` (boolean): Disable the item
- `keyTip` string | Specifies the keytip content.

## Item Content

Define rich HTML content for backstage items:

### Simple Content

```typescript
{
    id: "about",
    text: "About",
    iconCss: "e-icons e-info",
    content: "<div style='padding: 20px;'>" +
             "  <h2>About Application</h2>" +
             "  <p>Version 1.0.0</p>" +
             "  <p>Copyright © 2026</p>" +
             "</div>"
}
```

### Rich Content with Multiple Sections

```typescript
{
    id: "settings",
    text: "Settings",
    iconCss: "e-icons e-settings",
    content: "<div class='settings-content'>" +
             "  <h2>Application Settings</h2>" +
             "  <section>" +
             "    <h3>General</h3>" +
             "    <p>Configure general settings...</p>" +
             "  </section>" +
             "  <section>" +
             "    <h3>Appearance</h3>" +
             "    <p>Customize appearance...</p>" +
             "  </section>" +
             "</div>"
}
```

### Content with Interactive Elements

```typescript
{
    id: "account",
    text: "Account",
    iconCss: "e-icons e-user",
    content: "<div class='account-content'>" +
             "  <h2>Account Settings</h2>" +
             "  <div class='profile'>" +
             "    <img src='avatar.jpg' alt='Profile' />" +
             "    <p>John Doe</p>" +
             "    <p>john.doe@example.com</p>" +
             "  </div>" +
             "  <button class='e-btn e-primary'>Manage Account</button>" +
             "  <button class='e-btn'>Sign Out</button>" +
             "</div>"
}
```

## Footer Items

Add items to the footer area for secondary actions:

```typescript
let backstageItems: BackstageItemModel[] = [
    // Regular items
    {
        id: "new",
        text: "New",
        iconCss: "e-icons e-file-new",
        content: "<div><h2>New Document</h2></div>"
    },
    {
        id: "open",
        text: "Open",
        iconCss: "e-icons e-folder-open",
        content: "<div><h2>Open Document</h2></div>"
    },
    // Footer items
    {
        id: "options",
        text: "Options",
        iconCss: "e-icons e-settings",
        keyTip: "O", 
        isFooter: true, // Display in footer
        content: "<div><h2>Options</h2><p>Configure application options...</p></div>"
    },
    {
        id: "help",
        text: "Help",
        iconCss: "e-icons e-help",
        isFooter: true,
        content: "<div><h2>Help</h2><p>Get help and support...</p></div>"
    }
];
```

**Footer characteristics:**
- Displayed at bottom of sidebar
- Visually separated from main items
- Used for settings, help, about, etc.

## Adding Separators

Add visual separators between items:

```typescript
let backstageItems: BackstageItemModel[] = [
    {
        id: "new",
        text: "New",
        iconCss: "e-icons e-file-new",
        content: "<div><h2>New</h2></div>"
    },
    {
        id: "open",
        text: "Open",
        iconCss: "e-icons e-folder-open",
        content: "<div><h2>Open</h2></div>",
        separator: true // Add separator after this item
    },
    {
        id: "save",
        text: "Save",
        iconCss: "e-icons e-save",
        content: "<div><h2>Save</h2></div>"
    },
    {
        id: "print",
        text: "Print",
        iconCss: "e-icons e-print",
        content: "<div><h2>Print</h2></div>",
        separator: true
    }
];
```

**Key points:**
- `separator: true` adds a horizontal line after the item
- Helps group related items visually

## Back Button Customization

Customize the back button that closes the Backstage:

```typescript
let ribbon: Ribbon = new Ribbon({
    backStageMenu: {
        visible: true,
        text: "File", // Button text to open backstage (default: "File")
        backButton: {
            text: "Close", // Back button text (default: "Back")
            iconCss: "e-icons e-close" // Back button icon
        },
        items: backstageItems
    },
    tabs: []
});
```

**Properties:**
- `text` (string): Text on File/backstage button
- `backButton.text` (string): Text on back button
- `backButton.iconCss` (string): Icon for back button

## Target Element

Control where the Backstage overlay appears:

```typescript
let ribbon: Ribbon = new Ribbon({
    backStageMenu: {
        visible: true,
        target: "#backstageContainer", // Target element ID
        items: backstageItems
    },
    tabs: []
});
```

**HTML:**

```html
<div id="ribbon"></div>
<div id="backstageContainer" style="position: relative; height: 100vh;"></div>
```

**Key points:**
- By default, Backstage overlays the entire document
- Set `target` to display in a specific container
- Target element should have positioning context

## Using Templates

Use custom templates for backstage item content:

```typescript
let ribbon: Ribbon = new Ribbon({
    backStageMenu: {
        visible: true,
        items: backstageItems,
        template: '<div class="custom-backstage-item">' +
                  '  <div class="sidebar-item">' +
                  '    <span class="${iconCss}"></span>' +
                  '    <span>${text}</span>' +
                  '  </div>' +
                  '</div>',
        contentTemplate: '<div class="custom-content">' +
                        '  <h1>${title}</h1>' +
                        '  <p>${description}</p>' +
                        '</div>'
    },
    tabs: []
});
```

**Template types:**
- `template`: Template for sidebar items
- `contentTemplate`: Template for item content area

## Width and Height Configuration

Set Backstage dimensions:

```typescript
let ribbon: Ribbon = new Ribbon({
    backStageMenu: {
        visible: true,
        width: "600px", // Backstage width (default: "auto")
        height: "100%", // Backstage height (default: "100%")
        items: backstageItems
    },
    tabs: []
});
```

**Dimension options:**
- **Fixed**: `"600px"`, `"400px"`
- **Percentage**: `"80%"`, `"100%"`
- **Auto**: `"auto"` (fits content)

## Backstage Events

Handle Backstage interactions:

### Item Click Event

```typescript
let ribbon: Ribbon = new Ribbon({
    backStageMenu: {
        visible: true,
        items: backstageItems,
        itemSelect: (args) => {
            console.log("Backstage item selected:", args.item.id);
            
            switch (args.item.id) {
                case "new":
                    createNewDocument();
                    break;
                case "open":
                    openDocument();
                    break;
                case "save":
                    saveDocument();
                    break;
            }
        }
    },
    tabs: []
});
```

### Backstage Open/Close Events

```typescript
let ribbon: Ribbon = new Ribbon({
    backStageMenu: {
        visible: true,
        items: backstageItems,
        open: (args) => {
            console.log("Backstage opened");
            // Load dynamic content
        },
        close: (args) => {
            console.log("Backstage closed");
            // Save state or cleanup
        }
    },
    tabs: []
});
```

**Available events:**
- `itemSelect`: Triggered when item is selected
- `open`: Triggered when Backstage opens
- `close`: Triggered when Backstage closes
- `beforeOpen`: Triggered before Backstage opens
- `beforeClose`: Triggered before Backstage closes

## Backstage Module Methods

The `RibbonBackstage` module provides methods for programmatically managing backstage items and visibility:

### Adding Items to Backstage

Add items dynamically after ribbon initialization:

```typescript
let ribbon: Ribbon = new Ribbon({
    backStageMenu: {
        visible: true,
        items: [
            { id: "new", text: "New", content: "<div>New content</div>" }
        ]
    },
    tabs: []
});

ribbon.appendTo("#ribbon");

// Add items dynamically
let newItems: BackstageItemModel[] = [
    { 
        id: "recent", 
        text: "Recent", 
        content: "<div><h2>Recent Documents</h2></div>" 
    },
    { 
        id: "templates", 
        text: "Templates", 
        content: "<div><h2>Templates</h2></div>" 
    }
];

// Use ribbon's item management methods
newItems.forEach(item => {
    // Add custom logic to manage items
    ribbon.backStageMenu.items.push(item);
});
```

### Removing Backstage Items

Remove items from backstage programmatically:

```typescript
// Remove item by ID
function removeBackstageItem(itemId: string) {
    if (ribbon.backStageMenu.items) {
        ribbon.backStageMenu.items = ribbon.backStageMenu.items.filter(
            item => item.id !== itemId
        );
    }
}

// Example: Remove "Recent" item
removeBackstageItem("recent");
```

### Hiding and Showing Backstage

Control backstage visibility:

```typescript
// Show backstage
function showBackstage() {
    if (ribbon.backStageMenu) {
        ribbon.backStageMenu.visible = true;
    }
}

// Hide backstage
function hideBackstage() {
    if (ribbon.backStageMenu) {
        ribbon.backStageMenu.visible = false;
    }
}

// Toggle backstage
function toggleBackstage() {
    if (ribbon.backStageMenu) {
        ribbon.backStageMenu.visible = !ribbon.backStageMenu.visible;
    }
}
```

### Updating Backstage Items

Modify existing backstage items:

```typescript
function updateBackstageItem(itemId: string, updates: Partial<BackstageItemModel>) {
    if (ribbon.backStageMenu.items) {
        const item = ribbon.backStageMenu.items.find(i => i.id === itemId);
        if (item) {
            Object.assign(item, updates);
        }
    }
}

// Example: Update item text
updateBackstageItem("new", { text: "New Document" });

// Example: Update item content
updateBackstageItem("info", { 
    content: "<div style='padding: 20px;'><h2>Updated Info</h2><p>New content</p></div>" 
});

// Example: Disable/Enable item
updateBackstageItem("templates", { disabled: true });
```

## Complete Examples

### Example 1: Document Editor Backstage

```typescript
import { Ribbon, RibbonBackstage } from "@syncfusion/ej2-ribbon";
import { BackstageItemModel } from "@syncfusion/ej2-ribbon";

Ribbon.Inject(RibbonBackstage);

let backstageItems: BackstageItemModel[] = [
    {
        id: "info",
        text: "Info",
        iconCss: "e-icons e-info",
        content: "<div class='backstage-content' style='padding: 30px;'>" +
                 "  <h1>Document Properties</h1>" +
                 "  <div style='margin-top: 20px;'>" +
                 "    <p><strong>Title:</strong> Annual Report 2026</p>" +
                 "    <p><strong>Author:</strong> John Doe</p>" +
                 "    <p><strong>Last Modified:</strong> March 27, 2026</p>" +
                 "    <p><strong>Size:</strong> 2.5 MB</p>" +
                 "  </div>" +
                 "</div>"
    },
    {
        id: "new",
        text: "New",
        iconCss: "e-icons e-file-new",
        content: "<div class='backstage-content' style='padding: 30px;'>" +
                 "  <h1>Create New Document</h1>" +
                 "  <div class='template-grid'>" +
                 "    <div class='template'>Blank Document</div>" +
                 "    <div class='template'>Business Letter</div>" +
                 "    <div class='template'>Resume</div>" +
                 "    <div class='template'>Report</div>" +
                 "  </div>" +
                 "</div>"
    },
    {
        id: "open",
        text: "Open",
        iconCss: "e-icons e-folder-open",
        content: "<div class='backstage-content' style='padding: 30px;'>" +
                 "  <h1>Open Document</h1>" +
                 "  <button class='e-btn e-primary'>Browse Files</button>" +
                 "  <h2 style='margin-top: 30px;'>Recent Documents</h2>" +
                 "  <ul>" +
                 "    <li>Document1.docx</li>" +
                 "    <li>Presentation.pptx</li>" +
                 "    <li>Spreadsheet.xlsx</li>" +
                 "  </ul>" +
                 "</div>",
        separator: true
    },
    {
        id: "save-as",
        text: "Save As",
        iconCss: "e-icons e-save",
        content: "<div class='backstage-content' style='padding: 30px;'>" +
                 "  <h1>Save Document As</h1>" +
                 "  <p>Choose a location and file format:</p>" +
                 "  <button class='e-btn'>This PC</button>" +
                 "  <button class='e-btn'>OneDrive</button>" +
                 "  <button class='e-btn'>SharePoint</button>" +
                 "</div>"
    },
    {
        id: "print",
        text: "Print",
        iconCss: "e-icons e-print",
        content: "<div class='backstage-content' style='padding: 30px;'>" +
                 "  <h1>Print</h1>" +
                 "  <div class='print-settings'>" +
                 "    <p><strong>Printer:</strong> Microsoft Print to PDF</p>" +
                 "    <p><strong>Copies:</strong> 1</p>" +
                 "    <p><strong>Orientation:</strong> Portrait</p>" +
                 "  </div>" +
                 "  <button class='e-btn e-primary'>Print</button>" +
                 "</div>",
        separator: true
    },
    {
        id: "share",
        text: "Share",
        iconCss: "e-icons e-share",
        content: "<div class='backstage-content' style='padding: 30px;'>" +
                 "  <h1>Share Document</h1>" +
                 "  <p>Share with people or get a sharing link</p>" +
                 "  <button class='e-btn e-primary'>Share</button>" +
                 "</div>"
    },
    {
        id: "export",
        text: "Export",
        iconCss: "e-icons e-export",
        content: "<div class='backstage-content' style='padding: 30px;'>" +
                 "  <h1>Export Document</h1>" +
                 "  <div class='export-options'>" +
                 "    <button class='e-btn'>Export to PDF</button>" +
                 "    <button class='e-btn'>Export to HTML</button>" +
                 "    <button class='e-btn'>Export to Image</button>" +
                 "  </div>" +
                 "</div>"
    },
    // Footer items
    {
        id: "options",
        text: "Options",
        iconCss: "e-icons e-settings",
        isFooter: true,
        content: "<div class='backstage-content' style='padding: 30px;'>" +
                 "  <h1>Application Options</h1>" +
                 "  <div class='options-sections'>" +
                 "    <h3>General</h3>" +
                 "    <p>Configure general settings</p>" +
                 "    <h3>Display</h3>" +
                 "    <p>Customize display options</p>" +
                 "    <h3>Save</h3>" +
                 "    <p>Configure auto-save settings</p>" +
                 "  </div>" +
                 "</div>"
    },
    {
        id: "help",
        text: "Help",
        iconCss: "e-icons e-help",
        isFooter: true,
        content: "<div class='backstage-content' style='padding: 30px;'>" +
                 "  <h1>Help & Support</h1>" +
                 "  <ul>" +
                 "    <li><a href='#'>Documentation</a></li>" +
                 "    <li><a href='#'>Video Tutorials</a></li>" +
                 "    <li><a href='#'>Contact Support</a></li>" +
                 "    <li><a href='#'>About</a></li>" +
                 "  </ul>" +
                 "</div>"
    }
];

let ribbon: Ribbon = new Ribbon({
    backStageMenu: {
        visible: true,
        text: "File",
        backButton: {
            text: "Back",
            iconCss: "e-icons e-arrow-left"
        },
        items: backstageItems,
        itemSelect: (args) => {
            console.log("Selected:", args.item.id);
            handleBackstageAction(args.item.id);
        }
    },
    tabs: [/* tabs configuration */]
});

ribbon.appendTo("#ribbon");

function handleBackstageAction(id: string) {
    switch (id) {
        case "new":
            console.log("Create new document");
            break;
        case "open":
            console.log("Open document");
            break;
        case "save-as":
            console.log("Save as dialog");
            break;
        case "print":
            console.log("Print dialog");
            break;
    }
}
```

### Example 2: Application Settings Backstage

```typescript
let backstageItems: BackstageItemModel[] = [
    {
        id: "account",
        text: "Account",
        iconCss: "e-icons e-user",
        content: "<div style='padding: 30px;'>" +
                 "  <h1>Account Information</h1>" +
                 "  <div class='user-profile'>" +
                 "    <h3>John Doe</h3>" +
                 "    <p>john.doe@example.com</p>" +
                 "    <button class='e-btn e-primary'>Manage Account</button>" +
                 "    <button class='e-btn'>Sign Out</button>" +
                 "  </div>" +
                 "</div>"
    },
    {
        id: "preferences",
        text: "Preferences",
        iconCss: "e-icons e-settings",
        content: "<div style='padding: 30px;'>" +
                 "  <h1>User Preferences</h1>" +
                 "  <section>" +
                 "    <h3>Theme</h3>" +
                 "    <select class='e-input'>" +
                 "      <option>Light</option>" +
                 "      <option>Dark</option>" +
                 "    </select>" +
                 "  </section>" +
                 "  <section>" +
                 "    <h3>Language</h3>" +
                 "    <select class='e-input'>" +
                 "      <option>English</option>" +
                 "      <option>Spanish</option>" +
                 "    </select>" +
                 "  </section>" +
                 "</div>"
    },
    {
        id: "about",
        text: "About",
        iconCss: "e-icons e-info",
        isFooter: true,
        content: "<div style='padding: 30px;'>" +
                 "  <h1>About Application</h1>" +
                 "  <p><strong>Version:</strong> 1.0.0</p>" +
                 "  <p><strong>Build:</strong> 2026.03.27</p>" +
                 "  <p>Copyright © 2026 Company Name</p>" +
                 "</div>"
    }
];

let ribbon: Ribbon = new Ribbon({
    backStageMenu: {
        visible: true,
        text: "Menu",
        items: backstageItems
    },
    tabs: []
});

ribbon.appendTo("#ribbon");
```

These examples demonstrate comprehensive Backstage configurations for document editors and application settings.
