# Styling and Appearance

## CSS Theming

The Block Editor supports multiple built-in themes through CSS files.


### Applying Themes

Change the theme by updating the CSS link in `_Layout.cshtml`:

```razor
<!-- Material Theme (Default) -->
<link rel="stylesheet" href="https://cdn.syncfusion.com/ej2/dist/ej2.min.css" />

<!-- Bootstrap 5 Theme -->
<link rel="stylesheet" href="https://cdn.syncfusion.com/ej2/dist/bootstrap5.min.css" />

<!-- Fluent Theme -->
<link rel="stylesheet" href="https://cdn.syncfusion.com/ej2/dist/fluent.min.css" />

<!-- Tailwind Theme -->
<link rel="stylesheet" href="https://cdn.syncfusion.com/ej2/dist/tailwind.min.css" />

<!-- Fabric Theme -->
<link rel="stylesheet" href="https://cdn.syncfusion.com/ej2/dist/fabric.min.css" />
```

### Dark Theme Variants

Add `-dark` before `.min.css` for dark theme:

```html
<!-- Material Dark Theme -->
<link rel="stylesheet" href="https://cdn.syncfusion.com/ej2/dist/ej2-dark.min.css" />

<!-- Bootstrap 5 Dark Theme -->
<link rel="stylesheet" href="https://cdn.syncfusion.com/ej2/dist/bootstrap5-dark.min.css" />

<!-- Fluent Dark Theme -->
<link rel="stylesheet" href="https://cdn.syncfusion.com/ej2/dist/fluent-dark.min.css" />

<!-- Tailwind Dark Theme -->
<link rel="stylesheet" href="https://cdn.syncfusion.com/ej2/dist/tailwind-dark.min.css" />

<!-- Fabric Dark Theme -->
<link rel="stylesheet" href="https://cdn.syncfusion.com/ej2/dist/fabric-dark.min.css" />
```

## Width and Height

Control the editor's dimensions:

```razor
<!-- With percentage -->
<ejs-blockeditor id="block-editor" height="80vh" width="100%"></ejs-blockeditor>

<!-- With specific pixel values -->
<ejs-blockeditor id="block-editor" height="500px" width="800px"></ejs-blockeditor>

<!-- Container styling -->
<div id='blockeditor-container' style="height: calc(100vh - 100px);">
    <ejs-blockeditor id="block-editor"></ejs-blockeditor>
</div>
```

## Text Color Configuration

### Font Color Settings

Configure the font color picker that appears in the inline toolbar using `e-blockeditor-fontcolorsettings`:

```razor
<ejs-blockeditor id="block-editor">
    <e-blockeditor-fontcolorsettings 
        default="#ff0000"
        mode="ColorModeType.Palette"
        columns="10"
        modeSwitcher="false">
    </e-blockeditor-fontcolorsettings>
</ejs-blockeditor>
```

### Font Color Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `default` | string | "#ff0000" | Default text color applied when clicking the font color button |
| `mode` | ColorModeType | Palette | Color selection mode: `Palette` or `Picker` |
| `columns` | number | 10 | Number of columns in the color palette grid |
| `modeSwitcher` | bool | false | Show toggle button to switch between Palette and Picker modes |
| `colorCode` | object | *(see below)* | Custom color groups with hex color arrays |

### Background Color Settings

Configure the background color (text highlight) picker using `e-blockeditor-backgroundcolorsettings`:

```razor
<ejs-blockeditor id="block-editor">
    <e-blockeditor-backgroundcolorsettings 
        default="#ffff00"
        mode="ColorModeType.Palette"
        columns="5"
        modeSwitcher="true">
    </e-blockeditor-backgroundcolorsettings>
</ejs-blockeditor>
```

### Background Color Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `default` | string | "#ffff00" | Default background color (yellow highlight) |
| `mode` | ColorModeType | Palette | Color selection mode: `Palette` or `Picker` |
| `columns` | number | 5 | Number of columns in the color palette grid |
| `modeSwitcher` | bool | false | Show mode switcher button |
| `colorCode` | object | *(see below)* | Custom color groups for highlights |

### Color Modes

**Palette Mode** - Displays a predefined grid of colors:

```razor
<ejs-blockeditor id="block-editor">
    <e-blockeditor-fontcolorsettings 
        mode="ColorModeType.Palette"
        columns="8">
    </e-blockeditor-fontcolorsettings>
</ejs-blockeditor>
```

**Picker Mode** - Shows a full color picker for RGB/HEX selection:

```razor
<ejs-blockeditor id="block-editor">
    <e-blockeditor-fontcolorsettings 
        mode="ColorModeType.Picker">
    </e-blockeditor-fontcolorsettings>
</ejs-blockeditor>
```

**Mode Switcher** - Allow users to toggle between modes:

```razor
<ejs-blockeditor id="block-editor">
    <e-blockeditor-fontcolorsettings 
        mode="ColorModeType.Palette"
        modeSwitcher="true">
    </e-blockeditor-fontcolorsettings>
</ejs-blockeditor>
```

### Custom Color Palettes

Define custom color groups for branded color schemes:

```csharp
public IActionResult CustomColors()
{
    // Brand colors
    var brandColors = new
    {
        Brand = new string[] 
        { 
            "#1e3a8a", "#3b82f6", "#60a5fa", "#93c5fd", "#dbeafe" 
        },
        Accent = new string[] 
        { 
            "#7c3aed", "#a78bfa", "#c4b5fd", "#e9d5ff", "#f5f3ff" 
        },
        Neutral = new string[] 
        { 
            "#111827", "#4b5563", "#9ca3af", "#d1d5db", "#f3f4f6" 
        }
    };
    
    var highlightColors = new
    {
        Highlight = new string[] 
        { 
            "#fef08a", "#fde047", "#facc15", "#eab308", "#ca8a04" 
        },
        Alert = new string[] 
        { 
            "#fecaca", "#fca5a5", "#f87171", "#ef4444", "#dc2626" 
        },
        Success = new string[] 
        { 
            "#bbf7d0", "#86efac", "#4ade80", "#22c55e", "#16a34a" 
        }
    };
    
    ViewBag.FontColorCode = brandColors;
    ViewBag.BackgroundColorCode = highlightColors;
    
    return View();
}
```

**View:**

```razor
@{
    var fontColorCode = ViewBag.FontColorCode;
    var backgroundColorCode = ViewBag.BackgroundColorCode;
}

<ejs-blockeditor id="block-editor">
    <e-blockeditor-fontcolorsettings 
        default="#1e3a8a"
        mode="@ColorModeType.Palette"
        columns="5"
        modeSwitcher="true"
        colorCode="@fontColorCode">
    </e-blockeditor-fontcolorsettings>
    
    <e-blockeditor-backgroundcolorsettings 
        default="#fef08a"
        mode="@ColorModeType.Palette"
        columns="5"
        modeSwitcher="true"
        colorCode="@backgroundColorCode">
    </e-blockeditor-backgroundcolorsettings>
</ejs-blockeditor>
```

### Standard Color Palette Example

Using the default Syncfusion color palette:

```razor
<ejs-blockeditor id="block-editor">
    <e-blockeditor-fontcolorsettings 
        default="#000000"
        mode="ColorModeType.Palette"
        columns="10"
        modeSwitcher="false">
    </e-blockeditor-fontcolorsettings>
    
    <e-blockeditor-backgroundcolorsettings 
        default="#ffff00"
        mode="ColorModeType.Palette"
        columns="5"
        modeSwitcher="false">
    </e-blockeditor-backgroundcolorsettings>
</ejs-blockeditor>
```

### Color Picker with Mode Switcher

Allow users to choose between palette grid and color picker:

```razor
<div id="color-editor-container">
    <h3>Rich Text Formatting with Colors</h3>
    
    <ejs-blockeditor id="color-editor" height="500px">
        <e-blockeditor-fontcolorsettings 
            default="#2563eb"
            mode="ColorModeType.Palette"
            columns="8"
            modeSwitcher="true">
        </e-blockeditor-fontcolorsettings>
        
        <e-blockeditor-backgroundcolorsettings 
            default="#fde047"
            mode="ColorModeType.Palette"
            columns="6"
            modeSwitcher="true">
        </e-blockeditor-backgroundcolorsettings>
        
        <e-blockeditor-toolbarsettings 
            enable="true"
            items="@(new string[] { 
                "Bold", "Italic", "Underline", "StrikeThrough", 
                "FontColor", "BackgroundColor", 
                "OrderedList", "UnorderedList" 
            })">
        </e-blockeditor-toolbarsettings>
    </ejs-blockeditor>
</div>

<style>
    #color-editor-container {
        margin: 20px auto;
        max-width: 900px;
    }
</style>
```

### Material Design Color Palette

Use Material Design colors:

```csharp
public IActionResult MaterialDesignColors()
{
    var materialColors = new
    {
        Red = new string[] 
        { 
            "#ffebee", "#ffcdd2", "#ef9a9a", "#e57373", "#ef5350",
            "#f44336", "#e53935", "#d32f2f", "#c62828", "#b71c1c"
        },
        Blue = new string[] 
        { 
            "#e3f2fd", "#bbdefb", "#90caf9", "#64b5f6", "#42a5f5",
            "#2196f3", "#1e88e5", "#1976d2", "#1565c0", "#0d47a1"
        },
        Green = new string[] 
        { 
            "#e8f5e9", "#c8e6c9", "#a5d6a7", "#81c784", "#66bb6a",
            "#4caf50", "#43a047", "#388e3c", "#2e7d32", "#1b5e20"
        },
        Orange = new string[] 
        { 
            "#fff3e0", "#ffe0b2", "#ffcc80", "#ffb74d", "#ffa726",
            "#ff9800", "#fb8c00", "#f57c00", "#ef6c00", "#e65100"
        }
    };
    
    ViewBag.MaterialColors = materialColors;
    return View();
}
```

### Complete Color Configuration Example

```csharp
public IActionResult ColorFormattingEditor()
{
    // Font colors - professional palette
    var fontColors = new
    {
        Primary = new string[] 
        { 
            "#1e293b", "#334155", "#475569", "#64748b", "#94a3b8" 
        },
        Accent = new string[] 
        { 
            "#0ea5e9", "#06b6d4", "#14b8a6", "#10b981", "#84cc16" 
        },
        Warm = new string[] 
        { 
            "#dc2626", "#ea580c", "#f59e0b", "#eab308", "#84cc16" 
        }
    };
    
    // Background colors - subtle highlights
    var backgroundColors = new
    {
        Neutral = new string[] 
        { 
            "#f8fafc", "#f1f5f9", "#e2e8f0", "#cbd5e1", "#94a3b8" 
        },
        Info = new string[] 
        { 
            "#dbeafe", "#bfdbfe", "#93c5fd", "#60a5fa", "#3b82f6" 
        },
        Warning = new string[] 
        { 
            "#fef3c7", "#fde68a", "#fcd34d", "#fbbf24", "#f59e0b" 
        },
        Success = new string[] 
        { 
            "#d1fae5", "#a7f3d0", "#6ee7b7", "#34d399", "#10b981" 
        },
        Error = new string[] 
        { 
            "#fee2e2", "#fecaca", "#fca5a5", "#f87171", "#ef4444" 
        }
    };
    
    ViewBag.FontColors = fontColors;
    ViewBag.BackgroundColors = backgroundColors;
    
    return View();
}
```

**View:**

```razor
@{
    var fontColors = ViewBag.FontColors;
    var backgroundColors = ViewBag.BackgroundColors;
}

<div id="formatting-editor-container">
    <h2>Professional Document Editor</h2>
    <p>Use the toolbar to apply text colors and highlights to your content.</p>
    
    <ejs-blockeditor id="formatting-editor" 
                     height="600px"
                     width="100%">
        <e-blockeditor-fontcolorsettings 
            default="#1e293b"
            mode="ColorModeType.Palette"
            columns="5"
            modeSwitcher="true"
            colorCode="@fontColors">
        </e-blockeditor-fontcolorsettings>
        
        <e-blockeditor-backgroundcolorsettings 
            default="#fef3c7"
            mode="ColorModeType.Palette"
            columns="5"
            modeSwitcher="true"
            colorCode="@backgroundColors">
        </e-blockeditor-backgroundcolorsettings>
        
        <e-blockeditor-toolbarsettings 
            enable="true"
            popupWidth="100%"
            items="@(new string[] { 
                "Bold", "Italic", "Underline", "StrikeThrough",
                "Subscript", "Superscript",
                "FontColor", "BackgroundColor",
                "LowerCase", "UpperCase",
                "OrderedList", "UnorderedList",
                "Indent", "Outdent",
                "Undo", "Redo"
            })">
        </e-blockeditor-toolbarsettings>
    </ejs-blockeditor>
</div>

<style>
    #formatting-editor-container {
        margin: 30px auto;
        max-width: 1000px;
        padding: 20px;
        background: #ffffff;
        border-radius: 8px;
        box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    }
    
    #formatting-editor-container h2 {
        color: #1e293b;
        margin-bottom: 10px;
    }
    
    #formatting-editor-container p {
        color: #64748b;
        margin-bottom: 20px;
    }
</style>
```

## Block Styling with CSS Class

### Apply CSS Classes to Blocks

Use the `CssClass` property to apply custom styling to individual blocks:

```csharp
new BlockModel
{
    id = "info-block",
    blockType = "Paragraph",
    CssClass = "info-block",
    content = new List<object>
    {
        new { contentType = "Text", content = "Important information" }
    }
}

new BlockModel
{
    id = "warning-block",
    blockType = "Paragraph",
    CssClass = "warning-block",
    content = new List<object>
    {
        new { contentType = "Text", content = "Warning message" }
    }
}

new BlockModel
{
    id = "success-block",
    blockType = "Paragraph",
    CssClass = "success-block",
    content = new List<object>
    {
        new { contentType = "Text", content = "Success notification" }
    }
}
```

### Custom Block Styling CSS

```css
/* Info Block */
.e-block.info-block {
    background-color: #e6f3ff;
    border-left: 4px solid #007bff;
    padding: 15px;
    border-radius: 4px;
    color: #004085;
    margin-bottom: 10px;
}

/* Warning Block */
.e-block.warning-block {
    background-color: #fff8e1;
    border-left: 4px solid #ffc107;
    padding: 15px;
    border-radius: 4px;
    color: #856404;
    margin-bottom: 10px;
}

/* Success Block */
.e-block.success-block {
    background-color: #e8f5e9;
    border-left: 4px solid #28a745;
    padding: 15px;
    border-radius: 4px;
    color: #155724;
    margin-bottom: 10px;
}

/* Error Block */
.e-block.error-block {
    background-color: #fdecea;
    border-left: 4px solid #dc3545;
    padding: 15px;
    border-radius: 4px;
    color: #721c24;
    margin-bottom: 10px;
}

/* Custom Font Block */
.e-block.custom-font {
    font-family: 'Georgia', serif;
    font-size: 18px;
    color: #4a4a4a;
    border-bottom: 2px dotted #ccc;
    padding: 10px;
}

/* Highlighted Block */
.e-block.highlight {
    background-color: #fffacd;
    padding: 10px;
    border-radius: 4px;
}
```

## Typography Options

### Text Formatting Within Blocks

Apply formatting to text content:

```razor
<!-- Bold text -->
<strong>Bold text</strong>

<!-- Italic text -->
<em>Italic text</em>

<!-- Underlined text -->
<u>Underlined text</u>

<!-- Strikethrough text -->
<s>Strikethrough text</s>

<!-- Combined formatting -->
<strong><em>Bold italic</em></strong>
```

### Keyboard Shortcuts for Formatting

| Formatting | Windows | Mac |
|-----------|---------|-----|
| Bold | Ctrl+B | ⌘+B |
| Italic | Ctrl+I | ⌘+I |
| Underline | Ctrl+U | ⌘+U |
| Strikethrough | Ctrl+Shift+X | ⌘+⇧+X |

### Custom Typography CSS

```css
.e-block strong {
    font-weight: 700;
    color: #333;
}

.e-block em {
    font-style: italic;
    color: #555;
}

.e-block u {
    text-decoration: underline;
    color: #007bff;
}

.e-block s {
    text-decoration: line-through;
    color: #999;
}

.e-block code {
    background-color: #f5f5f5;
    padding: 2px 6px;
    border-radius: 3px;
    font-family: 'Courier New', monospace;
    font-size: 0.9em;
}
```

## Indentation and Nesting

### Visual Indentation with CSS

```css
/* Block indentation styling */
.e-block {
    margin-left: 0;
}

.e-block.indent-1 {
    margin-left: 30px;
}

.e-block.indent-2 {
    margin-left: 60px;
}

.e-block.indent-3 {
    margin-left: 90px;
}

/* Nested block styling */
.e-block-nested {
    border-left: 3px solid #ddd;
    padding-left: 15px;
    margin-left: 10px;
}
```

### Apply Indentation to Blocks

```csharp
new BlockModel
{
    blockType = "Paragraph",
    indent = 0,
    content = new List<object>
    {
        new { contentType = "Text", content = "No indentation" }
    }
}

new BlockModel
{
    blockType = "Paragraph",
    indent = 1,
    content = new List<object>
    {
        new { contentType = "Text", content = "One level indent" }
    }
}

new BlockModel
{
    blockType = "Paragraph",
    indent = 2,
    content = new List<object>
    {
        new { contentType = "Text", content = "Two levels indent" }
    }
}
```

## Placeholder Customization

### Set Block Placeholders

```csharp
new BlockModel
{
    id = "collapsible-custom",
    blockType = "CollapsibleHeading",
    properties = new
    {
        level = 1,
        isExpanded = false,
        placeholder = "Enter section title here",
        children = new List<BlockModel>()
    }
}

new BlockModel
{
    id = "collapsible-para-custom",
    blockType = "CollapsibleParagraph",
    properties = new
    {
        isExpanded = false,
        placeholder = "Click to expand and add content",
        children = new List<BlockModel>()
    }
}
```

### Global Placeholder Styling

```css
.e-block[data-placeholder]::before {
    content: attr(data-placeholder);
    color: #999;
    font-style: italic;
}

.e-blockeditor .e-placeholder {
    color: #999;
    font-style: italic;
}
```

## Dark Mode Support

### Enable Dark Mode

Add dark theme CSS:

```html
<link rel="stylesheet" href="https://cdn.syncfusion.com/ej2/dist/ej2-dark.min.css" />
```

### Custom Dark Mode CSS

```css
/* Dark mode container */
.blockeditor-dark {
    background-color: #1e1e1e;
    color: #e0e0e0;
}

.blockeditor-dark .e-block {
    background-color: #2d2d2d;
    color: #e0e0e0;
    border-color: #444;
}

.blockeditor-dark .e-block.info-block {
    background-color: #1a3a52;
    border-left-color: #4da6ff;
    color: #90caf9;
}

.blockeditor-dark .e-block.warning-block {
    background-color: #332200;
    border-left-color: #ffb74d;
    color: #ffe082;
}

.blockeditor-dark .e-block.success-block {
    background-color: #1b3a1b;
    border-left-color: #66bb6a;
    color: #81c784;
}

.blockeditor-dark .e-toolbar {
    background-color: #2d2d2d;
    border-color: #444;
}

.blockeditor-dark .e-toolbar .e-btn {
    color: #e0e0e0;
}

.blockeditor-dark .e-toolbar .e-btn:hover {
    background-color: #444;
}
```

## Complete Styling Example

```razor
@using Syncfusion.EJ2.BlockEditor

<div id='blockeditor-container'>
    <ejs-blockeditor id="block-editor" 
                     height="500px" 
                     width="100%"
                     blocks="@ViewBag.BlocksData"
                     cssClass="custom-editor">
    </ejs-blockeditor>
</div>

<style>
    /* Container styling */
    #blockeditor-container {
        margin: 20px auto;
        max-width: 900px;
        padding: 20px;
        background-color: #f8f9fa;
        border-radius: 8px;
        box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    }
    
    /* Block types styling */
    .e-block.info-block {
        background-color: #e6f3ff;
        border-left: 4px solid #007bff;
        padding: 15px;
        border-radius: 4px;
        color: #004085;
    }
    
    .e-block.warning-block {
        background-color: #fff8e1;
        border-left: 4px solid #ffc107;
        padding: 15px;
        border-radius: 4px;
        color: #856404;
    }
    
    .e-block.success-block {
        background-color: #e8f5e9;
        border-left: 4px solid #28a745;
        padding: 15px;
        border-radius: 4px;
        color: #155724;
    }
    
    .e-block.error-block {
        background-color: #fdecea;
        border-left: 4px solid #dc3545;
        padding: 15px;
        border-radius: 4px;
        color: #721c24;
    }
    
    /* Readonly styling */
    .readonly-mode {
        opacity: 0.8;
        cursor: not-allowed;
        background-color: #f5f5f5;
    }
    
    .readonly-mode .e-block-content {
        color: #6c757d;
        user-select: text;
        cursor: default;
    }
    
    /* Custom theme */
    .custom-editor {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        border-radius: 12px;
        padding: 20px;
    }
    
    .custom-editor .e-block {
        border-radius: 8px;
        margin-bottom: 10px;
        backdrop-filter: blur(10px);
        background-color: rgba(255, 255, 255, 0.9);
        transition: all 0.3s ease;
    }
    
    .custom-editor .e-block:hover {
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    }
    
    .custom-editor .e-block-content {
        color: #2d3748;
        font-weight: 500;
        line-height: 1.6;
    }
    
    /* Typography */
    .e-block strong {
        font-weight: 700;
        color: #333;
    }
    
    .e-block em {
        font-style: italic;
        color: #666;
    }
    
    .e-block u {
        text-decoration: underline;
        color: #007bff;
    }
    
    .e-block s {
        text-decoration: line-through;
        color: #999;
    }
    
    .e-block code {
        background-color: #f5f5f5;
        padding: 2px 6px;
        border-radius: 3px;
        font-family: 'Courier New', monospace;
        font-size: 0.9em;
    }
    
    /* Indentation */
    .e-block.indent-1 {
        margin-left: 30px;
    }
    
    .e-block.indent-2 {
        margin-left: 60px;
    }
    
    .e-block.indent-3 {
        margin-left: 90px;
    }
</style>
```

Styling and appearance customization allows you to create Block Editor instances that perfectly match your application's design system and user interface requirements.
