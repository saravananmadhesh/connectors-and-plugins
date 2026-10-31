# Templates and Customization Guide

## Table of Contents
- [Template-Based Rendering](#template-based-rendering)
- [HTML Template Structure](#html-template-structure)
- [Item Templates](#item-templates)
- [Popup Customization](#popup-customization)
- [Button Text Modes](#button-text-modes)
- [CSS Class Customization](#css-class-customization)
- [Menu Component Integration](#menu-component-integration)
- [Advanced Customization Examples](#advanced-customization-examples)

## Template-Based Rendering

The Toolbar can be rendered using HTML templates instead of the item collection. This approach provides maximum flexibility for complex custom layouts and styling.

### When to Use Template Rendering

Use template-based rendering when you:
- Need **custom HTML structure** beyond standard buttons
- Want to use **existing HTML markup** without converting to items
- Require **complex styling** with nested elements
- Need to maintain **existing DOM structure** for JavaScript compatibility
- Build **dynamic layouts** that change based on conditions

### Item-Based vs. Template-Based

| Aspect | Item-Based | Template-Based |
|--------|-----------|-----------------|
| **Simplicity** | Easy; declarative markup | More verbose; requires HTML structure |
| **Flexibility** | Limited to predefined item types | Full HTML customization |
| **Performance** | Optimized rendering | Standard DOM rendering |
| **Responsive** | Built-in responsive modes | Requires manual implementation |
| **Use Cases** | Standard toolbars | Custom/complex layouts |

## HTML Template Structure

For template-based rendering, follow this specific DOM structure:

```html
<div id="template_toolbar">         <!-- Root Toolbar Container -->
    <div>                           <!-- Items Container -->
        <div>Item 1</div>           <!-- Individual Toolbar Item -->
        <div>Item 2</div>           <!-- Individual Toolbar Item -->
    </div>
</div>
```

### Template Rendering Example

```html
<!-- Initialize Toolbar with template content -->
<ejs-toolbar id="templateToolbar">
    <e-toolbar-items>
        <e-content-template>
            <div>
                <!-- Item 1: Simple text button -->
                <div>File</div>
                
                <!-- Item 2: Button with icon class -->
                <div class="e-btn">
                    <span class="e-icons e-new"></span>
                    New
                </div>
                
                <!-- Item 3: Separator -->
                <div class="e-separator"></div>
                
                <!-- Item 4: Dropdown button -->
                <div class="e-btn e-dropdown-btn">
                    <span class="e-icons e-format"></span>
                    Format
                    <span class="e-icons e-dropdown-arrow"></span>
                </div>
            </div>
        </e-content-template>
    </e-toolbar-items>
</ejs-toolbar>
```

The `<e-content-template>` element allows you to define the toolbar content using custom HTML markup.

## Item Templates

Item templates provide a way to customize individual item content while keeping the toolbar item collection approach.

### String-Based Item Template

Define item content as an HTML string:

```html
<ejs-toolbar id="stringTemplateToolbar">
    <e-toolbar-items>
        <!-- Text-only item -->
        <e-toolbar-item text="Save"></e-toolbar-item>
        
        <!-- Custom template as HTML string -->
        <e-toolbar-item type="Button">
            <e-content-template>
                <div class="custom-item">
                    <span class="e-icons e-custom-icon"></span>
                    <span>Custom Button</span>
                </div>
            </e-content-template>
        </e-toolbar-item>
        
        <!-- Checkbox in template -->
        <e-toolbar-item type="Input">
            <e-content-template>
                <div><input type="checkbox" id="chk1" checked=""> 
                    <label for="chk1">Accept Terms</label></div>
            </e-content-template>
        </e-toolbar-item>
    </e-toolbar-items>
</ejs-toolbar>
```

### Query Selector Template

Use query selectors to reference HTML elements defined elsewhere on the page:

```html
<!-- Template definition -->
<script type="text/template" id="customTemplate">
    <div style="padding: 5px 10px;">
        <span class="e-icons e-template-icon"></span>
        <span>Template Item</span>
    </div>
</script>

<!-- Toolbar using selector template -->
<ejs-toolbar id="selectorTemplateToolbar">
    <e-toolbar-items>
        <e-toolbar-item text="New"></e-toolbar-item>
        
        <!-- Template referenced by ID -->
        <e-toolbar-item type="Button" template="#customTemplate">
        </e-toolbar-item>
    </e-toolbar-items>
</ejs-toolbar>
```

## Popup Customization

When using template-based rendering with popup mode, apply CSS classes to items to customize overflow behavior.

### Overflow Classes

| Class | Equivalent Property | Behavior |
|-------|-------------------|----------|
| `e-overflow-show` | `overflow="show"` | Always visible on toolbar (primary priority) |
| `e-overflow-hide` | `overflow="hide"` | Always in popup (secondary priority) |
| `e-popup-text` | `showTextOn="Overflow"` | Text visible only in popup |
| `e-toolbar-text` | `showTextOn="Toolbar"` | Text visible only on toolbar |

### Template Popup Customization Example

```html
<ejs-toolbar id="popupCustomToolbar" overflowMode="Popup">
    <e-toolbar-items>
        <e-content-template>
            <div>
                <!-- Always visible file operations -->
                <div class="e-overflow-show">
                    <span class="e-icons e-new"></span>
                    New
                </div>
                
                <div class="e-overflow-show">
                    <span class="e-icons e-open"></span>
                    Open
                </div>
                
                <!-- Separator -->
                <div class="e-separator"></div>
                
                <!-- Popup-only advanced features -->
                <div class="e-overflow-hide">
                    <span class="e-icons e-settings"></span>
                    Settings
                </div>
                
                <div class="e-overflow-hide">
                    <span class="e-icons e-help"></span>
                    Help
                </div>
            </div>
        </e-content-template>
    </e-toolbar-items>
</ejs-toolbar>
```

## Button Text Modes

Control text visibility in toolbar vs. popup using CSS classes:

### Text Visibility Classes

```html
<ejs-toolbar id="textModeToolbar">
    <e-toolbar-items>
        <e-content-template>
            <div>
                <!-- Text in both toolbar and popup (default) -->
                <div>
                    <span class="e-icons e-save"></span>
                    Save
                </div>
                
                <!-- Text only in toolbar (compact toolbar) -->
                <div class="e-toolbar-text">
                    <span class="e-icons e-print"></span>
                    Print
                </div>
                
                <!-- Text only in popup (icon-only toolbar) -->
                <div class="e-popup-text">
                    <span class="e-icons e-export"></span>
                    Export
                </div>
                
                <!-- Icon-only (use with tooltips) -->
                <div title="Settings">
                    <span class="e-icons e-settings"></span>
                </div>
            </div>
        </e-content-template>
    </e-toolbar-items>
</ejs-toolbar>
```

### Combined Customization Classes

```html
<ejs-toolbar id="combinedToolbar" overflowMode="Popup">
    <e-toolbar-items>
        <e-content-template>
            <div>
                <!-- Always visible with text in both places -->
                <div class="e-overflow-show">
                    <span class="e-icons e-new"></span>
                    New
                </div>
                
                <!-- Popup item with text only in popup -->
                <div class="e-overflow-hide e-popup-text">
                    <span class="e-icons e-export"></span>
                    Export
                </div>
                
                <!-- Visible if space, text on toolbar only -->
                <div class="e-toolbar-text">
                    <span class="e-icons e-print"></span>
                    Print
                </div>
            </div>
        </e-content-template>
    </e-toolbar-items>
</ejs-toolbar>
```

## CSS Class Customization

The `cssClass` property and inline styles customize toolbar appearance.

### Applying CSS Classes

```html
<ejs-toolbar id="styledToolbar" cssClass="custom-toolbar primary-theme">
    <e-toolbar-items>
        <e-toolbar-item text="Button 1" cssClass="btn-primary"></e-toolbar-item>
        <e-toolbar-item text="Button 2" cssClass="btn-secondary"></e-toolbar-item>
    </e-toolbar-items>
</ejs-toolbar>
```

### CSS Styling Rules

```css
/* Toolbar root styles */
.custom-toolbar {
    background: linear-gradient(to right, #667eea 0%, #764ba2 100%);
    padding: 10px 20px;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

/* Individual button styles -->
.custom-toolbar .btn-primary {
    background-color: #667eea;
    color: white;
    border-radius: 4px;
    padding: 8px 12px;
    transition: background-color 0.3s;
}

.custom-toolbar .btn-primary:hover {
    background-color: #5568d3;
}

.custom-toolbar .btn-secondary {
    background-color: #764ba2;
    color: white;
    border-radius: 4px;
}

/* Separator styling -->
.custom-toolbar .e-separator {
    background-color: rgba(255, 255, 255, 0.3);
    margin: 0 10px;
}
```

## Menu Component Integration

Integrate the Menu component within toolbar items for dropdown navigation menus.

### Menu in Content Template

```html
@{
    ViewBag.FileMenuItems = new List<dynamic>()
    {
        new { text = "New", iconCss = "e-icons e-new" },
        new { text = "Open", iconCss = "e-icons e-open" },
        new { text = "Save", iconCss = "e-icons e-save" },
        new { separator = true },
        new { text = "Exit", iconCss = "e-icons e-exit" }
    };

    ViewBag.EditMenuItems = new List<dynamic>()
    {
        new { text = "Undo", iconCss = "e-icons e-undo" },
        new { text = "Redo", iconCss = "e-icons e-redo" },
        new { separator = true },
        new { text = "Cut", iconCss = "e-icons e-cut" },
        new { text = "Copy", iconCss = "e-icons e-copy" },
        new { text = "Paste", iconCss = "e-icons e-paste" }
    };
}

<ejs-toolbar id="menuToolbar">
    <e-toolbar-items>
        <!-- File Menu -->
        <e-toolbar-item type="Button">
            <e-content-template>
                <ejs-menu id="fileMenu" items="@ViewBag.FileMenuItems" 
                         showItemCount="false">
                </ejs-menu>
            </e-content-template>
        </e-toolbar-item>
        
        <!-- Edit Menu -->
        <e-toolbar-item type="Button">
            <e-content-template>
                <ejs-menu id="editMenu" items="@ViewBag.EditMenuItems" 
                         showItemCount="false">
                </ejs-menu>
            </e-content-template>
        </e-toolbar-item>
        
        <e-toolbar-item type="Separator"></e-toolbar-item>
        
        <!-- Standard buttons -->
        <e-toolbar-item text="Save" prefixIcon="e-save-icon"></e-toolbar-item>
    </e-toolbar-items>
</ejs-toolbar>
```

**Code-Behind** (if needed):

```csharp
public void OnGet()
{
    // ViewBag properties set above
}
```

## Advanced Customization Examples

### Editor Toolbar with Full Customization

```html
@{
    ViewBag.Fonts = new List<dynamic>()
    {
        new { text = "Arial", value = "Arial" },
        new { text = "Times New Roman", value = "TimesNewRoman" },
        new { text = "Courier New", value = "CourierNew" }
    };

    ViewBag.FontSizes = Enumerable.Range(8, 73)
        .Select(i => new { text = i.ToString(), value = i })
        .ToList();
}

<ejs-toolbar id="richEditorToolbar" cssClass="editor-toolbar">
    <e-toolbar-items>
        <!-- File operations -->
        <e-toolbar-item text="New" prefixIcon="e-new-icon" tooltipText="New" 
                       overflow="show"></e-toolbar-item>
        <e-toolbar-item text="Open" prefixIcon="e-open-icon" tooltipText="Open" 
                       overflow="show"></e-toolbar-item>
        <e-toolbar-item text="Save" prefixIcon="e-save-icon" tooltipText="Save" 
                       overflow="show"></e-toolbar-item>
        
        <e-toolbar-item type="Separator"></e-toolbar-item>
        
        <!-- Undo/Redo -->
        <e-toolbar-item text="Undo" prefixIcon="e-undo-icon" tooltipText="Undo"></e-toolbar-item>
        <e-toolbar-item text="Redo" prefixIcon="e-redo-icon" tooltipText="Redo"></e-toolbar-item>
        
        <e-toolbar-item type="Separator"></e-toolbar-item>
        
        <!-- Font controls -->
        <e-toolbar-item type="Input">
            <e-content-template>
                <ejs-dropdownlist id="fontFamily" dataSource="@ViewBag.Fonts" 
                                 fields="@(new { text = "text", value = "value" })" 
                                 width="120px" placeholder="Font"></ejs-dropdownlist>
            </e-content-template>
        </e-toolbar-item>
        
        <e-toolbar-item type="Input">
            <e-content-template>
                <ejs-dropdownlist id="fontSize" dataSource="@ViewBag.FontSizes" 
                                 fields="@(new { text = "text", value = "value" })" 
                                 width="80px" placeholder="Size"></ejs-dropdownlist>
            </e-content-template>
        </e-toolbar-item>
        
        <e-toolbar-item type="Separator"></e-toolbar-item>
        
        <!-- Formatting buttons -->
        <e-toolbar-item text="Bold" prefixIcon="e-bold-icon" tooltipText="Bold (Ctrl+B)" 
                       cssClass="format-btn"></e-toolbar-item>
        <e-toolbar-item text="Italic" prefixIcon="e-italic-icon" tooltipText="Italic (Ctrl+I)" 
                       cssClass="format-btn"></e-toolbar-item>
        <e-toolbar-item text="Underline" prefixIcon="e-underline-icon" 
                       tooltipText="Underline (Ctrl+U)" cssClass="format-btn"></e-toolbar-item>
        
        <!-- Advanced features in popup -->
        <e-toolbar-item text="Insert Link" prefixIcon="e-link-icon" 
                       overflow="hide" tooltipText="Insert Hyperlink"></e-toolbar-item>
        <e-toolbar-item text="Insert Image" prefixIcon="e-image-icon" 
                       overflow="hide" tooltipText="Insert Image"></e-toolbar-item>
        <e-toolbar-item text="Insert Table" prefixIcon="e-table-icon" 
                       overflow="hide" tooltipText="Insert Table"></e-toolbar-item>
    </e-toolbar-items>
</ejs-toolbar>

<style>
    .editor-toolbar {
        background: #f5f5f5;
        border: 1px solid #ddd;
        border-radius: 4px;
        padding: 8px;
    }
    
    .editor-toolbar .e-toolbar-item {
        margin: 0 2px;
    }
    
    .editor-toolbar .format-btn {
        min-width: 50px;
    }
</style>
```

### Dashboard Filter Toolbar

```html
<ejs-toolbar id="filterToolbar" overflowMode="Popup" cssClass="filter-toolbar">
    <e-toolbar-items>
        <e-toolbar-item type="Input" overflow="show">
            <e-content-template>
                <ejs-dropdownlist id="statusFilter" dataSource="@ViewBag.Statuses" 
                                 placeholder="All Statuses" width="150px">
                </ejs-dropdownlist>
            </e-content-template>
        </e-toolbar-item>
        
        <e-toolbar-item type="Input" overflow="show">
            <e-content-template>
                <ejs-datepicker id="dateFrom" placeholder="From Date" width="120px">
                </ejs-datepicker>
            </e-content-template>
        </e-toolbar-item>
        
        <e-toolbar-item type="Input" overflow="show">
            <e-content-template>
                <ejs-datepicker id="dateTo" placeholder="To Date" width="120px">
                </ejs-datepicker>
            </e-content-template>
        </e-toolbar-item>
        
        <e-toolbar-item type="Separator"></e-toolbar-item>
        
        <e-toolbar-item text="Search" prefixIcon="e-search-icon" 
                       cssClass="btn-primary"></e-toolbar-item>
        <e-toolbar-item text="Reset" prefixIcon="e-reset-icon" 
                       cssClass="btn-secondary"></e-toolbar-item>
        
        <e-toolbar-item text="Export" prefixIcon="e-export-icon" 
                       overflow="hide" align="Right"></e-toolbar-item>
    </e-toolbar-items>
</ejs-toolbar>

<style>
    .filter-toolbar {
        background: #ffffff;
        border-bottom: 2px solid #007bff;
        padding: 15px;
        display: flex;
        gap: 10px;
        flex-wrap: wrap;
    }
    
    .filter-toolbar .btn-primary {
        background-color: #007bff;
        color: white;
    }
    
    .filter-toolbar .btn-secondary {
        background-color: #6c757d;
        color: white;
    }
</style>
```

These customization patterns provide comprehensive flexibility for building specialized toolbars tailored to specific application requirements.
