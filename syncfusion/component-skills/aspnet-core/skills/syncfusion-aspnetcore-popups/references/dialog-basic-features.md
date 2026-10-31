# Basic Features — Dialog (ASP.NET Core)

## Table of Contents
- [Modal Behavior](#modal-behavior)
- [Header Configuration](#header-configuration)
- [Footer Buttons](#footer-buttons)
- [Close Icon](#close-icon)
- [Dialog Size](#dialog-size)
- [Draggable Dialog](#draggable-dialog)
- [Resizable Dialog](#resizable-dialog)
- [Show/Hide Methods](#showhide-methods)

## Modal Behavior

### Modal Dialog (Overlay)

A modal dialog prevents user interaction with page content behind it. Use `is-modal="true"`:

```csharp
<ejs-dialog id="modalDialog" 
    header="Attention Required" 
    isModal="true" 
    width="500px">
    <e-content-template>
        <p>This is a modal dialog. Interact with it first before accessing the page.</p>
    </e-content-template>
</ejs-dialog>

<button class="e-btn" onclick="openModal()">Open Modal</button>

<script>
    function openModal() {
        document.getElementById('modalDialog').ej2_instances[0].show();
    }
</script>
```

**Behavior:** Overlay blocks clicks, dims background, and prevents scrolling on body.

### Non-Modal Dialog

Allow interaction with page content while dialog is open:

```csharp
<ejs-dialog id="nonModalDialog" 
    header="Information" 
    isModal="false" 
    width="500px">
    <e-content-template>
        <p>You can still interact with the page while this dialog is open.</p>
    </e-content-template>
</ejs-dialog>
```

### Handling Overlay Click

Execute code when user clicks the modal overlay:

```csharp
<ejs-dialog id="overlayDialog" 
    header="Click Overlay to Close" 
    isModal="true" 
    width="500px"
    overlayClick="onOverlayClick">
    <e-content-template>
        <p>Clicking the overlay will close this dialog.</p>
    </e-content-template>
</ejs-dialog>

<script>
    function onOverlayClick() {
        var dialog = document.getElementById('overlayDialog').ej2_instances[0];
        dialog.hide();
    }
</script>
```

## Header Configuration

### Custom Header Text

```csharp
<ejs-dialog id="headerDialog" header="Welcome to Our Application">
    <e-content-template>
        <p>Custom header text appears in the title bar.</p>
    </e-content-template>
</ejs-dialog>
```

### Header with HTML Content

Use `<e-header-template>` for rich HTML in the header:

```csharp
<ejs-dialog id="htmlHeaderDialog" width="500px">
    <e-header-template>
        <div style="display: flex; justify-content: space-between; align-items: center;">
            <span><strong>User Profile</strong></span>
            <span style="color: #999; font-size: 12px;">ID: 12345</span>
        </div>
    </e-header-template>
    <e-content-template>
        <p>Dialog with custom header template.</p>
    </e-content-template>
</ejs-dialog>
```

### Removing Header

Omit the `header` property to render without header:

```csharp
<ejs-dialog id="noHeaderDialog" width="500px">
    <e-content-template>
        <p>This dialog has no header bar.</p>
    </e-content-template>
</ejs-dialog>
```

## Footer Buttons

### Button Types

Create primary and secondary buttons:

```csharp
<ejs-dialog id="buttonTypesDialog" 
    header="Action Required" 
    is-modal="true" 
    width="450px">
    <e-dialog-buttons>
        <!-- Primary button (focused on open) -->
        <e-dialog-dialogbutton content="Save" 
            isPrimary="true" 
            click="onSave"></e-dialog-dialogbutton>
        
        <!-- Secondary button -->
        <e-dialog-dialogbutton content="Cancel" 
            click="onCancel"></e-dialog-dialogbutton>
    </e-dialog-buttons>
    <e-content-template>
        <p>Choose an action:</p>
    </e-content-template>
</ejs-dialog>

<script>
    function onSave() {
        console.log('Saving...');
        document.getElementById('buttonTypesDialog').ej2_instances[0].hide();
    }

    function onCancel() {
        document.getElementById('buttonTypesDialog').ej2_instances[0].hide();
    }
</script>
```

### Button CSS Classes

Apply custom CSS classes to buttons:

```csharp
<e-dialog-buttons>
    <e-dialog-dialogbutton content="Delete" 
        cssClass="e-danger" 
        click="onDelete"></e-dialog-dialogbutton>
    <e-dialog-dialogbutton content="Archive" 
        cssClass="e-warning" 
        click="onArchive"></e-dialog-dialogbutton>
</e-dialog-buttons>
```

**Available classes:** `e-primary`, `e-success`, `e-warning`, `e-danger`, `e-info`

### Many Button Example

```csharp
<e-dialog-buttons>
    <e-dialog-dialogbutton content="Yes" isPrimary="true" click="onYes"></e-dialog-dialogbutton>
    <e-dialog-dialogbutton content="No" click="onNo"></e-dialog-dialogbutton>
    <e-dialog-dialogbutton content="Maybe Later" click="onLater"></e-dialog-dialogbutton>
</e-dialog-buttons>
```

## Close Icon

### Show Close Icon

Display the close (X) button in the header:

```csharp
<ejs-dialog id="closeIconDialog" 
    header="Can Be Closed" 
    showCloseIcon="true" 
    width="500px">
    <e-content-template>
        <p>Click the X button to close this dialog.</p>
    </e-content-template>
</ejs-dialog>
```

### Hide Close Icon

```csharp
<ejs-dialog id="noCloseDialog" 
    header="Must Use Buttons" 
    showCloseIcon="false" 
    width="500px">
    <e-dialog-buttons>
        <e-dialog-dialogbutton content="OK" isPrimary="true" click="onOk"></e-dialog-dialogbutton>
    </e-dialog-buttons>
    <e-content-template>
        <p>You must click OK to close this dialog.</p>
    </e-content-template>
</ejs-dialog>
```

## Dialog Size

### Fixed Dimensions

Set explicit width and height:

```csharp
<ejs-dialog id="sizedDialog" 
    header="Fixed Size" 
    width="600px" 
    height="400px">
    <e-content-template>
        <p>This dialog is 600px wide and 400px tall.</p>
    </e-content-template>
</ejs-dialog>
```

### Percentage Size

```csharp
<ejs-dialog id="percentDialog" 
    header="Responsive Size" 
    width="80%" 
    height="70%">
    <e-content-template>
        <p>This dialog takes up 80% width and 70% height of the viewport.</p>
    </e-content-template>
</ejs-dialog>
```

### Min Height

Constrain dialog minimum height:

```csharp
<ejs-dialog id="constrainedDialog" 
    header="Constrained" 
    width="500px" 
    minHeight="200px">
    <e-content-template>
        <p>This dialog has a minimum height of 200px.</p>
    </e-content-template>
</ejs-dialog>
```

## Draggable Dialog

### Enable Dragging

Allow users to move the dialog by dragging the header:

```csharp
<ejs-dialog id="draggableDialog" 
    header="Drag This Dialog" 
    allowDragging="true" 
    width="500px">
    <e-content-template>
        <p>Click and drag the header to move this dialog around the page.</p>
    </e-content-template>
</ejs-dialog>
```

**Requirement:** Header must be enabled for dragging to work.

### Dragging with Modal

Dragging is supported in both modal and non-modal dialogs:

```csharp
<ejs-dialog id="draggableModalDialog" 
    header="Draggable Modal" 
    allowDragging="true" 
    isModal="true" 
    width="500px">
    <e-content-template>
        <p>You can drag even a modal dialog by its header.</p>
    </e-content-template>
</ejs-dialog>
```

## Resizable Dialog

### Enable Resizing

Allow users to resize the dialog by dragging edges/corners:

```csharp
<ejs-dialog id="resizableDialog" 
    header="Resize Me" 
    enableResize="true" 
    width="500px" 
    height="300px">
    <e-content-template>
        <p>Drag the bottom-right corner or edges to resize this dialog.</p>
    </e-content-template>
</ejs-dialog>
```

### Resize with Min Height

Control resize bounds using `min-height`:

```csharp
<ejs-dialog id="constrainedResizeDialog" 
    header="Constrained Resize" 
    enableResize="true" 
    width="500px" 
    height="300px"
    minHeight="150px">
    <e-content-template>
        <p>Resizing is constrained to a minimum height of 150px.</p>
    </e-content-template>
</ejs-dialog>
```

## Show/Hide Methods

### Show Dialog

Open the dialog programmatically:

```csharp
<ejs-dialog id="methodDialog" header="Show/Hide Example" visible="false">
    <e-content-template>
        <p>This dialog is initially hidden.</p>
    </e-content-template>
</ejs-dialog>

<button class="e-btn" onclick="showDialog()">Show</button>

<script>
    function showDialog() {
        var dialog = document.getElementById('methodDialog').ej2_instances[0];
        dialog.show();
    }
</script>
```

### Hide Dialog

Close the dialog programmatically:

```javascript
function hideDialog() {
    var dialog = document.getElementById('methodDialog').ej2_instances[0];
    dialog.hide();
}
```

### Toggle Dialog

```javascript
function toggleDialog() {
    var dialog = document.getElementById('methodDialog').ej2_instances[0];
    if (dialog.visible) {
        dialog.hide();
    } else {
        dialog.show();
    }
}
```

## Edge Cases

### Dialog Overflow Content
If content exceeds dialog size, apply scrolling:

```csharp
<ejs-dialog id="scrollDialog" header="Scrollable Content" width="500px" height="300px">
    <e-content-template>
        <div style="overflow-y: auto; max-height: 100%; padding: 20px;">
            <!-- Large content here -->
        </div>
    </e-content-template>
</ejs-dialog>
```

### Focus Management
Primary buttons automatically receive focus on dialog open. Use keyboard navigation (Tab/Shift+Tab) to move between focusable elements.

### Nested Dialogs
Avoid nesting dialogs as it creates complex z-index and accessibility issues. Use a single dialog or load content dynamically instead.

