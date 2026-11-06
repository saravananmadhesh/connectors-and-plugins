# Gallery Items

This guide covers Gallery items in the Ribbon, which provide visual grids of selectable options like styles, templates, or presets. **Gallery items require the RibbonGallery module.**

## Table of Contents

- [Gallery Overview](#gallery-overview)
- [Module Injection](#module-injection)
- [Basic Gallery Setup](#basic-gallery-setup)
- [Gallery Groups](#gallery-groups)
- [Gallery Items](#gallery-items)
- [Item Content and Icons](#item-content-and-icons)
- [Item Attributes](#item-attributes)
- [Customizing Gallery Appearance](#customizing-gallery-appearance)
- [Disabling Gallery Items](#disabling-gallery-items)
- [Gallery Item Dimensions](#gallery-item-dimensions)
- [Displayed Item Count](#displayed-item-count)
- [Pre-Selecting Items](#pre-selecting-items)
- [Gallery Popup Configuration](#gallery-popup-configuration)
- [Custom Templates](#custom-templates)
- [Gallery Events](#gallery-events)
- [Gallery Event Arguments](#gallery-event-arguments)
- [Complete Examples](#complete-examples)

## Gallery Overview

Gallery items display a scrollable grid of visual options, commonly used for:

- **Style galleries**: Table styles, text styles, shape styles
- **Template galleries**: Document templates, slide layouts
- **Color schemes**: Theme colors, preset palettes
- **Icon libraries**: Symbol sets, emoji pickers
- **Quick access**: Recently used items, favorites

**Key features:**
- Visual grid layout with icons and text
- Organized into groups with headers
- Popup view for expanded selection
- Item selection with visual feedback
- Custom dimensions and item counts

## Module Injection

Gallery items require the `RibbonGallery` module:

```typescript
import { Ribbon, RibbonGallery } from "@syncfusion/ej2-ribbon";

// Inject Gallery module
Ribbon.Inject(RibbonGallery);
```

**Important:** Always inject `RibbonGallery` before creating a Ribbon with Gallery items.

## Basic Gallery Setup

Create a simple Gallery item:

```typescript
import { RibbonItemType } from "@syncfusion/ej2-ribbon";

let tabs = [{
    header: "Home",
    groups: [{
        header: "Styles",
        collections: [{
            items: [{
                type: RibbonItemType.Gallery,
                gallerySettings: {
                    groups: [{
                        header: "Quick Styles",
                        items: [
                            { content: "Normal" },
                            { content: "Heading 1" },
                            { content: "Heading 2" },
                            { content: "Title" }
                        ]
                    }]
                }
            }]
        }]
    }]
}];
```

## Gallery Groups

Organize gallery items into logical groups with headers:

```typescript
{
    type: RibbonItemType.Gallery,
    gallerySettings: {
        groups: [{
            header: "Light Styles",
            items: [
                { content: "Light Grid" },
                { content: "Light List" }
            ]
        }, {
            header: "Dark Styles",
            items: [
                { content: "Dark Grid" },
                { content: "Dark List" }
            ]
        }, {
            header: "Accent Styles",
            items: [
                { content: "Accent 1" },
                { content: "Accent 2" }
            ]
        }]
    }
}
```

**Key points:**
- Each group has a `header` property
- Groups appear sequentially in the gallery
- Group headers help users find options quickly

## Gallery Items

Define items within each group:

```typescript
{
    groups: [{
        header: "Table Styles",
        items: [
            { 
                content: "Plain Table 1",
                id: "table-1"
            },
            { 
                content: "Plain Table 2",
                id: "table-2"
            },
            { 
                content: "Grid Table",
                id: "table-grid"
            }
        ]
    }]
}
```

**Item properties:**
- `content` (string): Display text
- `id` (string): Unique identifier for selection events
- `iconCss` (string): Icon CSS class
- `cssClass` (string): Custom CSS class for styling
- `disabled` (boolean): Disable the item
- `htmlAttributes` (object): Custom HTML attributes

## Item Content and Icons

Add icons to gallery items for visual identification:

```typescript
{
    groups: [{
        header: "Symbols",
        items: [
            { 
                content: "Check Mark",
                iconCss: "e-icons e-check"
            },
            { 
                content: "Cross",
                iconCss: "e-icons e-close"
            },
            { 
                content: "Star",
                iconCss: "e-icons e-star"
            },
            { 
                content: "Heart",
                iconCss: "e-icons e-heart"
            }
        ]
    }]
}
```

**Icon-only items:**

```typescript
{
    groups: [{
        header: "Shapes",
        items: [
            { iconCss: "e-icons e-circle" },
            { iconCss: "e-icons e-rectangle" },
            { iconCss: "e-icons e-triangle" }
        ]
    }]
}
```

## Item Attributes

Add custom HTML attributes to gallery items:

```typescript
{
    groups: [{
        header: "Styles",
        items: [
            { 
                content: "Heading 1",
                htmlAttributes: {
                    "data-style": "h1",
                    "data-size": "24"
                }
            },
            { 
                content: "Heading 2",
                htmlAttributes: {
                    "data-style": "h2",
                    "data-size": "20"
                }
            }
        ]
    }]
}
```

**Use cases:**
- Store metadata for processing
- Add accessibility attributes
- Attach data for event handlers

## Customizing Gallery Appearance

Apply custom CSS classes to gallery items:

```typescript
{
    groups: [{
        header: "Color Themes",
        items: [
            { 
                content: "Blue Theme",
                cssClass: "theme-blue"
            },
            { 
                content: "Red Theme",
                cssClass: "theme-red"
            },
            { 
                content: "Green Theme",
                cssClass: "theme-green"
            }
        ]
    }]
}
```

**CSS example:**

```css
.theme-blue {
    background-color: #0078d4;
    color: white;
}

.theme-red {
    background-color: #d13438;
    color: white;
}

.theme-green {
    background-color: #107c10;
    color: white;
}
```

## Disabling Gallery Items

Disable specific items in the gallery:

```typescript
{
    groups: [{
        header: "Templates",
        items: [
            { 
                content: "Template 1",
                disabled: false
            },
            { 
                content: "Template 2 (Premium)",
                disabled: true // Disabled for non-premium users
            },
            { 
                content: "Template 3",
                disabled: false
            }
        ]
    }]
}
```

**Key points:**
- Disabled items appear grayed out
- Disabled items cannot be selected
- Use for conditional availability (permissions, licenses)

## Gallery Item Dimensions

Configure the size of individual gallery items:

```typescript
{
    type: RibbonItemType.Gallery,
    gallerySettings: {
        itemWidth: "80px",
        itemHeight: "60px",
        groups: [{
            header: "Styles",
            items: [
                { content: "Style 1" },
                { content: "Style 2" }
            ]
        }]
    }
}
```

**Properties:**
- `itemWidth` (string): Width of each gallery item (default: "auto")
- `itemHeight` (string): Height of each gallery item (default: "auto")

**Use cases:**
- Large items: Style previews with detailed content
- Small items: Icon grids, color swatches
- Square items: Shape libraries, symbol pickers

## Displayed Item Count

Control how many items are visible before scrolling:

```typescript
{
    type: RibbonItemType.Gallery,
    gallerySettings: {
        itemCount: 3, // Show 3 items initially
        groups: [{
            header: "Recent Documents",
            items: [
                { content: "Document 1" },
                { content: "Document 2" },
                { content: "Document 3" },
                { content: "Document 4" },
                { content: "Document 5" }
            ]
        }]
    }
}
```

**Key points:**
- `itemCount` sets the number of visible items in the Ribbon
- Additional items are accessible via scroll buttons
- Clicking the gallery opens a popup with all items

## Pre-Selecting Items

Set a default selected item in the gallery:

```typescript
{
    type: RibbonItemType.Gallery,
    gallerySettings: {
        selectedItemIndex: 1, // Select second item (0-indexed)
        groups: [{
            header: "Styles",
            items: [
                { content: "Normal", id: "normal" },
                { content: "Heading 1", id: "h1" }, // Pre-selected
                { content: "Heading 2", id: "h2" }
            ]
        }]
    }
}
```

**Properties:**
- `selectedItemIndex` (number): 0-based index of selected item across all groups

**Example with multiple groups:**

```typescript
{
    gallerySettings: {
        selectedItemIndex: 5, // 6th item overall (group 1: 0-2, group 2: 3-5)
        groups: [{
            header: "Group 1",
            items: [
                { content: "Item 1" }, // Index 0
                { content: "Item 2" }, // Index 1
                { content: "Item 3" }  // Index 2
            ]
        }, {
            header: "Group 2",
            items: [
                { content: "Item 4" }, // Index 3
                { content: "Item 5" }, // Index 4
                { content: "Item 6" }  // Index 5 (selected)
            ]
        }]
    }
}
```

## Gallery Popup Configuration

Customize the popup that appears when clicking the gallery:

```typescript
{
    type: RibbonItemType.Gallery,
    gallerySettings: {
        popupWidth: "400px",
        popupHeight: "300px",
        groups: [{
            header: "All Styles",
            items: [
                // Many items...
            ]
        }]
    }
}
```

**Popup properties:**
- `popupWidth` (string): Width of the popup (default: "auto")
- `popupHeight` (string): Height of the popup (default: "auto")

**Use cases:**
- Wide popups: Multi-column layouts
- Tall popups: Long lists of items
- Fixed dimensions: Consistent popup size

## Custom Templates

Use templates for rich gallery item content:

```typescript
{
    type: RibbonItemType.Gallery,
    gallerySettings: {
        template: '<div class="gallery-item" style="background-color: ${color};">' +
                  '  <span>${name}</span>' +
                  '</div>',
        groups: [{
            header: "Colors",
            items: [
                { name: "Red", color: "#ff0000" },
                { name: "Blue", color: "#0000ff" },
                { name: "Green", color: "#00ff00" }
            ]
        }]
    }
}
```

**Template with HTML:**

```typescript
{
    gallerySettings: {
        template: '<div class="custom-style">' +
                  '  <img src="${imageUrl}" alt="${title}" />' +
                  '  <h4>${title}</h4>' +
                  '  <p>${description}</p>' +
                  '</div>',
        groups: [{
            header: "Templates",
            items: [
                { 
                    title: "Business Letter",
                    description: "Professional letterhead",
                    imageUrl: "/images/letter.png"
                },
                { 
                    title: "Invoice",
                    description: "Standard invoice format",
                    imageUrl: "/images/invoice.png"
                }
            ]
        }]
    }
}
```

## Gallery Events

Handle gallery item selection:

```typescript
{
    type: RibbonItemType.Gallery,
    gallerySettings: {
        groups: [{
            header: "Styles",
            items: [
                { content: "Normal", id: "normal" },
                { content: "Heading 1", id: "h1" }
            ]
        }],
        select: (args) => {
            console.log("Selected item:", args.item.content);
            console.log("Item ID:", args.item.id);
            // Apply selected style
        },
        popupOpen: (args) => {
            console.log("Gallery popup opened");
        },
        popupClose: (args) => {
            console.log("Gallery popup closed");
        }
    }
}
```

**Available events:**
- `select`: Triggered when an item is selected
- `popupOpen`: Triggered when popup opens
- `popupClose`: Triggered when popup closes
- `beforeSelect`: Triggered before item selection (cancellable)

## Gallery Event Arguments

The gallery events pass arguments containing information about the selected item and event context:

### Select Event Arguments

The `select` event provides `GallerySelectEventArgs` with item and selection details:

```typescript
{
    type: RibbonItemType.Gallery,
    gallerySettings: {
        groups: [{
            header: "Styles",
            items: [
                { content: "Style 1", id: "style-1" },
                { content: "Style 2", id: "style-2" }
            ]
        }],
        select: (args: GallerySelectEventArgs) => {
            // args.item - The selected gallery item
            console.log("Item content:", args.item.content);
            console.log("Item ID:", args.item.id);
            console.log("Item disabled:", args.item.disabled);
            
            // Apply styling or process selection
            if (args.item.id === "style-1") {
                applyStyle1();
            } else if (args.item.id === "style-2") {
                applyStyle2();
            }
        }
    }
}
```

### Before Select Event Arguments

The `beforeSelect` event provides `GalleryBeforeSelectEventArgs` which is cancellable:

```typescript
{
    type: RibbonItemType.Gallery,
    gallerySettings: {
        groups: [{
            header: "Templates",
            items: [
                { content: "Template 1", id: "tmpl-1" },
                { content: "Template 2", id: "tmpl-2" }
            ]
        }],
        beforeSelect: (args: GalleryBeforeSelectEventArgs) => {
            // args.item - The item about to be selected
            // args.cancel - Set to true to prevent selection
            
            // Validate selection
            if (isLockedItem(args.item.id)) {
                args.cancel = true; // Prevent selection
                showMessage("This item is locked");
                return;
            }
            
            // Check permissions
            if (!userHasPermission(args.item.id)) {
                args.cancel = true;
                showMessage("You don't have permission to use this item");
            }
        }
    }
}
```

### Popup Event Arguments

The `popupOpen` and `popupClose` events provide popup state information:

```typescript
{
    type: RibbonItemType.Gallery,
    gallerySettings: {
        groups: [{ /* items */ }],
        popupOpen: (args: GalleryPopupEventArgs) => {
            console.log("Gallery popup is opening");
            // Load dynamic content
            loadGalleryItems();
            
            // Track analytics
            trackGalleryOpen();
        },
        popupClose: (args: GalleryPopupEventArgs) => {
            console.log("Gallery popup is closing");
            // Cleanup or save state
            saveGalleryState();
        }
    }
}
```

### Event Argument Properties

**GallerySelectEventArgs:**
- `item` (GalleryItemModel): The selected gallery item with properties:
  - `content` (string): Display text
  - `id` (string): Unique identifier
  - `iconCss` (string): Icon CSS class
  - `cssClass` (string): Custom CSS classes
  - `disabled` (boolean): Whether item is disabled
  - `htmlAttributes` (object): Custom HTML attributes

**GalleryBeforeSelectEventArgs (extends GallerySelectEventArgs):**
- `item` (GalleryItemModel): The item about to be selected
- `cancel` (boolean, settable): Set to true to prevent selection

**GalleryPopupEventArgs:**
- `type` (string): "popupOpen" or "popupClose"

### Complete Event Handling Example

```typescript
let galleryConfig: any = {
    type: RibbonItemType.Gallery,
    gallerySettings: {
        itemCount: 4,
        popupWidth: "500px",
        groups: [{
            header: "Document Styles",
            items: [
                { content: "Normal", id: "normal", iconCss: "e-icons e-document" },
                { content: "Report", id: "report", iconCss: "e-icons e-report", disabled: true },
                { content: "Proposal", id: "proposal", iconCss: "e-icons e-proposal" },
                { content: "Invoice", id: "invoice", iconCss: "e-icons e-invoice" }
            ]
        }, {
            header: "Templates",
            items: [
                { content: "Template 1", id: "tmpl-1" },
                { content: "Template 2", id: "tmpl-2" }
            ]
        }],
        beforeSelect: (args: GalleryBeforeSelectEventArgs) => {
            // Check if selection is allowed
            if (args.item.disabled) {
                args.cancel = true;
                return;
            }
            
            // Check user permissions
            if (!canUseItem(args.item.id)) {
                args.cancel = true;
                showUpgradeDialog();
            }
        },
        select: (args: GallerySelectEventArgs) => {
            // Process the selected item
            console.log("Style selected:", args.item.content);
            
            // Update UI or apply template
            switch (args.item.id) {
                case "normal":
                    applyNormalStyle();
                    break;
                case "report":
                    applyReportStyle();
                    break;
                case "proposal":
                    applyProposalStyle();
                    break;
                case "invoice":
                    applyInvoiceStyle();
                    break;
                default:
                    loadTemplate(args.item.id);
            }
        },
        popupOpen: (args: GalleryPopupEventArgs) => {
            console.log("Gallery popup opened");
            // Load additional templates on demand
            loadAdditionalTemplates();
            
            // Track usage
            recordEvent("gallery_open", { timestamp: Date.now() });
        },
        popupClose: (args: GalleryPopupEventArgs) => {
            console.log("Gallery popup closed");
            // Cleanup resources
            clearTemporaryData();
        }
    }
};

function canUseItem(itemId: string): boolean {
    // Check user subscription or permissions
    return currentUser.isPremium || freeTierItems.includes(itemId);
}

function showUpgradeDialog() {
    console.log("Please upgrade to use this feature");
}

function recordEvent(eventName: string, data: any) {
    // Analytics tracking
    console.log(eventName, data);
}
```

## Complete Examples

### Example 1: Table Style Gallery

```typescript
import { Ribbon, RibbonTabModel, RibbonItemType, RibbonGallery } from "@syncfusion/ej2-ribbon";

Ribbon.Inject(RibbonGallery);

let tabs: RibbonTabModel[] = [{
    header: "Design",
    groups: [{
        header: "Table Styles",
        collections: [{
            items: [{
                type: RibbonItemType.Gallery,
                gallerySettings: {
                    itemWidth: "80px",
                    itemHeight: "50px",
                    itemCount: 4,
                    popupWidth: "400px",
                    popupHeight: "300px",
                    groups: [{
                        header: "Light",
                        items: [
                            { content: "Light 1", cssClass: "table-light-1" },
                            { content: "Light 2", cssClass: "table-light-2" },
                            { content: "Light 3", cssClass: "table-light-3" }
                        ]
                    }, {
                        header: "Medium",
                        items: [
                            { content: "Medium 1", cssClass: "table-medium-1" },
                            { content: "Medium 2", cssClass: "table-medium-2" }
                        ]
                    }, {
                        header: "Dark",
                        items: [
                            { content: "Dark 1", cssClass: "table-dark-1" },
                            { content: "Dark 2", cssClass: "table-dark-2" }
                        ]
                    }],
                    select: (args) => {
                        console.log("Apply table style:", args.item.content);
                    }
                }
            }]
        }]
    }]
}];

let ribbon: Ribbon = new Ribbon({ tabs: tabs });
ribbon.appendTo("#ribbon");
```

### Example 2: Document Template Gallery

```typescript
let tabs: RibbonTabModel[] = [{
    header: "File",
    groups: [{
        header: "New",
        collections: [{
            items: [{
                type: RibbonItemType.Gallery,
                gallerySettings: {
                    itemWidth: "120px",
                    itemHeight: "100px",
                    itemCount: 3,
                    selectedItemIndex: 0,
                    groups: [{
                        header: "Blank",
                        items: [
                            { content: "Blank Document", iconCss: "e-icons e-file-new" }
                        ]
                    }, {
                        header: "Recent Templates",
                        items: [
                            { content: "Business Letter", id: "letter" },
                            { content: "Resume", id: "resume" },
                            { content: "Invoice", id: "invoice" }
                        ]
                    }, {
                        header: "Online Templates",
                        items: [
                            { content: "Newsletter", id: "newsletter" },
                            { content: "Brochure", id: "brochure" },
                            { content: "Report", id: "report" }
                        ]
                    }],
                    select: (args) => {
                        console.log("Create document from template:", args.item.id);
                        // Load template
                    }
                }
            }]
        }]
    }]
}];
```

### Example 3: Symbol Picker Gallery

```typescript
let tabs: RibbonTabModel[] = [{
    header: "Insert",
    groups: [{
        header: "Symbols",
        collections: [{
            items: [{
                type: RibbonItemType.Gallery,
                gallerySettings: {
                    itemWidth: "40px",
                    itemHeight: "40px",
                    itemCount: 6,
                    popupWidth: "300px",
                    groups: [{
                        header: "Common Symbols",
                        items: [
                            { iconCss: "e-icons e-check", id: "check" },
                            { iconCss: "e-icons e-close", id: "close" },
                            { iconCss: "e-icons e-star", id: "star" },
                            { iconCss: "e-icons e-heart", id: "heart" },
                            { iconCss: "e-icons e-info", id: "info" },
                            { iconCss: "e-icons e-warning", id: "warning" }
                        ]
                    }, {
                        header: "Arrows",
                        items: [
                            { iconCss: "e-icons e-arrow-up", id: "up" },
                            { iconCss: "e-icons e-arrow-down", id: "down" },
                            { iconCss: "e-icons e-arrow-left", id: "left" },
                            { iconCss: "e-icons e-arrow-right", id: "right" }
                        ]
                    }],
                    select: (args) => {
                        console.log("Insert symbol:", args.item.id);
                        // Insert symbol at cursor
                    }
                }
            }]
        }]
    }]
}];
```

These examples demonstrate different gallery use cases: table styles with visual previews, document templates with categories, and symbol pickers with icon-based items.
