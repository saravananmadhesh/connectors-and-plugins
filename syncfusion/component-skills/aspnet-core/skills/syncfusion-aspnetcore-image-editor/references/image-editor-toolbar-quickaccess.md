# Toolbar & Quick Access Toolbar — Syncfusion ASP.NET Core Image Editor

## Table of Contents
- [Built-In Toolbar Items](#built-in-toolbar-items)
- [Customizing the Toolbar](#customizing-the-toolbar)
  - [Add Custom Items](#add-custom-items)
  - [Hide the Toolbar](#hide-the-toolbar)
  - [Show Only Specific Items](#show-only-specific-items)
- [Toolbar Template](#toolbar-template)
- [Contextual Toolbar](#contextual-toolbar)
  - [Customize Contextual Toolbar](#customize-contextual-toolbar)
  - [Add Items to Contextual Toolbar](#add-items-to-contextual-toolbar)
  - [Enable or Disable Contextual Items](#enable-or-disable-contextual-items)
- [Toolbar Events](#toolbar-events)
- [Quick Access Toolbar](#quick-access-toolbar)
  - [ShowQuickAccessToolbar Property](#showquickaccesstoolbar-property)
  - [Add Custom Items to Quick Access Toolbar](#add-custom-items-to-quick-access-toolbar)
  - [QuickAccessToolbarTemplate Property](#quickaccesstoolbartemplate-property)
  - [Quick Access Toolbar Events](#quick-access-toolbar-events)

---

## Built-In Toolbar Items

The following items are available by default in the Image Editor toolbar:

| Item | Description |
|------|-------------|
| `Open` | Open an image from the file system |
| `Undo` | Undo the last action |
| `Redo` | Redo the last undone action |
| `ZoomIn` | Zoom in on the image |
| `ZoomOut` | Zoom out on the image |
| `Crop` | Open crop/transform contextual toolbar |
| `RotateLeft` | Rotate image 90° counter-clockwise |
| `RotateRight` | Rotate image 90° clockwise |
| `HorizontalFlip` | Flip horizontally |
| `VerticalFlip` | Flip vertically |
| `Straightening` | Open straighten slider |
| `Annotate` | Open annotation contextual toolbar |
| `Finetune` | Open fine-tune contextual toolbar |
| `Filter` | Open filter contextual toolbar |
| `Frame` | Open frame contextual toolbar |
| `Resize` | Open resize dialog |
| `Redact` | Open redact contextual toolbar |
| `Reset` | Revert all changes to original |
| `Save` | Save/export the image |

---

## Customizing the Toolbar

### Add Custom Items

Add custom toolbar buttons alongside the default items using the `toolbar` attribute with an object array:

```cshtml
@{
    var imageTool = new object[] {
        "Undo", "Redo",
        new { text = "Rotate 90°", tooltipText = "Rotate Right", prefixIcon = "e-icons e-rotate-right", id = "customRotate" },
        new { text = "Flip H", tooltipText = "Flip Horizontal", prefixIcon = "e-icons e-flip-horizontal", id = "customFlip" },
        new { text = "Save PNG", tooltipText = "Save as PNG", prefixIcon = "e-icons e-save", id = "customSave" }
    };
}
<ejs-imageeditor id="image-editor" toolbar="@imageTool"
                 toolbarItemClicked="onToolbarItemClicked">
</ejs-imageeditor>

<script>
function onToolbarItemClicked(args) {
    var imageEditorObj = ej.base.getComponent(document.getElementById('image-editor'), 'image-editor');
    if (args.item.text === 'Rotate 90°') {
        imageEditorObj.rotate(90);
    } else if (args.item.text === 'Flip H') {
        imageEditorObj.flip('Horizontal');
    } else if (args.item.text === 'Save PNG') {
        imageEditorObj.export('PNG');
    }
}
</script>
```

### Hide the Toolbar

Set `toolbar` to an empty array to remove the toolbar entirely:

```cshtml
@{
    var imageTool = new string[] { };
}
<ejs-imageeditor id="image-editor" toolbar="@imageTool"></ejs-imageeditor>
```

When the toolbar is hidden, all editing must be driven by custom buttons or programmatic calls.

### Show Only Specific Items

List only the items you want using a string array:

```cshtml
@{
    var imageTool = new string[] { "Undo", "Redo", "Crop", "Save" };
}
<ejs-imageeditor id="image-editor" toolbar="@imageTool"></ejs-imageeditor>
```

---

## Toolbar Template

Replace the entire toolbar with a fully custom HTML template using `toolbarTemplate`. When this property is defined, the `toolbar` property has no effect.

```cshtml
<ejs-imageeditor id="image-editor" toolbarTemplate="#customToolbarTemplate"></ejs-imageeditor>

<script id="customToolbarTemplate" type="text/x-template">
    <div class="custom-toolbar">
        <button onclick="doRotate()">↺ Rotate</button>
        <button onclick="doFlip()">⇄ Flip</button>
        <button onclick="toggleFhd()">✏ Draw</button>
        <button onclick="doSave()">💾 Save</button>
    </div>
</script>

<script>
function doRotate() {
    ej.base.getComponent(document.getElementById('image-editor'), 'image-editor').rotate(90);
}

function doFlip() {
    ej.base.getComponent(document.getElementById('image-editor'), 'image-editor').flip('Horizontal');
}

var fhdEnabled = false;
function toggleFhd() {
    fhdEnabled = !fhdEnabled;
    ej.base.getComponent(document.getElementById('image-editor'), 'image-editor').freeHandDraw(fhdEnabled);
}

function doSave() {
    ej.base.getComponent(document.getElementById('image-editor'), 'image-editor').export('PNG');
}
</script>
```

---

## Contextual Toolbar

The contextual toolbar appears automatically when the user selects an operation (e.g., Crop, Annotate). It provides operation-specific options.

### Customize Contextual Toolbar

Use the `ToolbarUpdating` event to add or remove items from contextual toolbars:

```cshtml
<ejs-imageeditor id="image-editor" toolbarUpdating="onToolbarUpdating"></ejs-imageeditor>

<script>
function onToolbarUpdating(args) {
    // args.toolbarItems - array of items in the current contextual toolbar
    // Remove unwanted items from freehand draw contextual toolbar
    if (args.toolbarItems && args.toolbarItems.length > 0) {
        // Keep only stroke color for freehand draw — remove stroke width, separator, remove
        args.toolbarItems = args.toolbarItems.filter(function(item) {
            return item.text === 'StrokeColor';
        });
    }
}
</script>
```

### Add Items to Contextual Toolbar

Extend the contextual toolbar for text annotations:

```cshtml
<ejs-imageeditor id="image-editor" toolbarUpdating="onToolbarUpdating"
                 toolbarItemClicked="onToolbarItemClicked"></ejs-imageeditor>

<script>
function onToolbarUpdating(args) {
    // Add a custom "Bold All" button to the text annotation toolbar
    if (args.toolbarItems) {
        var hasTextItems = args.toolbarItems.some(function(item) {
            return item.text === 'FontFamily';
        });
        if (hasTextItems) {
            args.toolbarItems.push({
                type: 'Button',
                text: 'Bold All',
                prefixIcon: 'e-icons e-bold',
                tooltipText: 'Make all text bold'
            });
        }
    }
}

function onToolbarItemClicked(args) {
    if (args.item.text === 'Bold All') {
        // Custom logic for the added button
        console.log('Bold All clicked');
    }
}
</script>
```

### Enable or Disable Contextual Items

To disable a default contextual item, set `disabled: true` on the item within `ToolbarUpdating`:

```javascript
function onToolbarUpdating(args) {
    if (args.toolbarItems) {
        args.toolbarItems.forEach(function(item) {
            if (item.text === 'Remove') {
                item.disabled = true;
            }
        });
    }
}
```

---

## Toolbar Events

### ToolbarCreated Event

Fires once after the main toolbar is fully initialized:

```cshtml
<ejs-imageeditor id="image-editor" toolbarCreated="onToolbarCreated"></ejs-imageeditor>

<script>
function onToolbarCreated(args) {
    console.log('Toolbar ready');
    // Good place to add event listeners or access toolbar items
}
</script>
```

### ToolbarItemClicked Event

Fires when any toolbar item (main or contextual) is clicked:

```cshtml
<ejs-imageeditor id="image-editor" toolbarItemClicked="onToolbarItemClicked"></ejs-imageeditor>

<script>
function onToolbarItemClicked(args) {
    // args.item.text      - text label of the clicked item
    // args.item.type      - item type
    // args.originalEvent  - browser click event
    console.log('Toolbar item clicked:', args.item.text);
}
</script>
```

---

## Quick Access Toolbar

The Quick Access Toolbar (QAT) appears when an annotation is selected, offering fast actions like duplicate, delete, and edit text.

### ShowQuickAccessToolbar Property

Show or hide the Quick Access Toolbar:

```cshtml
<!-- Show (default) -->
<ejs-imageeditor id="image-editor" showQuickAccessToolbar="true"></ejs-imageeditor>

<!-- Hide -->
<ejs-imageeditor id="image-editor" showQuickAccessToolbar="false"></ejs-imageeditor>
```

### Add Custom Items to Quick Access Toolbar

Use `QuickAccessToolbarOpen` to customize QAT items when it opens:

```cshtml
<ejs-imageeditor id="image-editor"
                 quickAccessToolbarOpen="onQATOpen"
                 quickAccessToolbarItemClick="onQATItemClick">
</ejs-imageeditor>

<script>
function onQATOpen(args) {
    // args.toolbarItems - current QAT items array
    // Add a custom "Copy Style" item
    if (args.toolbarItems) {
        args.toolbarItems.push({
            type: 'Button',
            text: 'Copy Style',
            prefixIcon: 'e-icons e-copy',
            tooltipText: 'Copy annotation style'
        });
    }
}

function onQATItemClick(args) {
    if (args.item.text === 'Copy Style') {
        console.log('Copy style clicked on annotation');
    }
}
</script>
```

### QuickAccessToolbarTemplate Property

Replace the entire Quick Access Toolbar with a custom template:

```cshtml
<ejs-imageeditor id="image-editor"
                 quickAccessToolbarTemplate="#customQATTemplate">
</ejs-imageeditor>

<script id="customQATTemplate" type="text/x-template">
    <div class="custom-qat">
        <button onclick="duplicateAnnotation()">Duplicate</button>
        <button onclick="deleteAnnotation()">Delete</button>
    </div>
</script>
```

### Quick Access Toolbar Events

```cshtml
<ejs-imageeditor id="image-editor"
                 quickAccessToolbarOpen="onQATOpen"
                 quickAccessToolbarItemClick="onQATItemClick">
</ejs-imageeditor>

<script>
function onQATOpen(args) {
    // Fired when QAT opens for a selected annotation
    // args.toolbarItems - items in the QAT
    console.log('QAT opened with items:', args.toolbarItems.length);
}

function onQATItemClick(args) {
    // Fired when a QAT item is clicked
    // args.item - the clicked toolbar item
    console.log('QAT item clicked:', args.item.text);
}
</script>
```
