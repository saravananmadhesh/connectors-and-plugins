# Events & Interactions — Dialog (ASP.NET Core)

## Table of Contents
- [Lifecycle Events](#lifecycle-events)
- [User Interaction Events](#user-interaction-events)
- [Overlay Interactions](#overlay-interactions)
- [Dragging & Resizing](#dragging--resizing)
- [Event Best Practices](#event-best-practices)

## Lifecycle Events

### Before Open Event

Triggered before the dialog opens:

```csharp
<ejs-dialog id="openingDialog" 
    header="Before Open Event" 
    width="500px"
    beforeOpen="onBeforeOpen">
    <e-content-template>
        <p>This dialog fires a beforeOpen event.</p>
    </e-content-template>
</ejs-dialog>

<button class="e-btn" onclick="showDialog()">Open Dialog</button>

<script>
    function onBeforeOpen(args) {
        console.log('Dialog is about to open');
        
        // Validate or prevent opening
        if (someCondition) {
            args.cancel = true; // Prevent dialog from opening
            console.log('Dialog opening cancelled');
        }
    }

    function showDialog() {
        document.getElementById('openingDialog').ej2_instances[0].show();
    }
</script>
```

### Open Event

Triggered after the dialog opens:

```csharp
<ejs-dialog id="openedDialog" 
    header="Open Event" 
    width="500px"
    open="onDialogOpen">
    <e-content-template>
        <input type="text" id="focusField" placeholder="Focus here" />
    </e-content-template>
</ejs-dialog>

<script>
    function onDialogOpen(args) {
        console.log('Dialog has opened');
        
        // Set focus to first input
        document.getElementById('focusField').focus();
        
        // Load content
        loadInitialData();
    }

    function loadInitialData() {
        console.log('Loading data...');
    }
</script>
```

### Before Close Event

Triggered before the dialog closes:

```csharp
<ejs-dialog id="beforeCloseDialog" 
    header="Before Close Event" 
    width="500px"
    beforeClose="onBeforeClose">
    <e-content-template>
        <p>Unsaved changes will be lost if you close this dialog.</p>
    </e-content-template>
    <e-dialog-buttons>
        <e-dialog-dialogbutton buttonModel="closeBtn" click="closeDialog"></e-dialog-dialogbutton>
    </e-dialog-buttons>
</ejs-dialog>

<script>
    var unsavedChanges = true;

    function onBeforeClose(args) {
        if (unsavedChanges) {
            var shouldClose = confirm('You have unsaved changes. Close anyway?');
            if (!shouldClose) {
                args.cancel = true;
                console.log('Dialog close cancelled');
            }
        }
    }

    function closeDialog() {
        document.getElementById('beforeCloseDialog').ej2_instances[0].hide();
    }
</script>
```

### Close Event

Triggered after the dialog closes:

```csharp
<ejs-dialog id="closedDialog" 
    header="Close Event" 
    width="500px"
    close="onDialogClose">
    <e-content-template>
        <p>The close event fires after this dialog is closed.</p>
    </e-content-template>
</ejs-dialog>

<script>
    function onDialogClose(args) {
        console.log('Dialog has closed');
        
        // Cleanup
        clearTimeout(timer);
        resetForm();
    }

    var timer;
    function resetForm() {
        console.log('Resetting form data');
    }
</script>
```

## User Interaction Events

### Button Click Events

Handle button clicks in dialog footer:

```csharp
@{
    var deleteBtn = new ButtonModel { content = "Delete", cssClass = "e-flat", isPrimary = true };
    var cancelBtn = new ButtonModel { content = "Cancel", cssClass = "e-flat" };
}
<ejs-dialog id="buttonClickDialog" 
    header="Confirm Deletion" 
    is-modal="true" 
    width="450px">
    <e-dialog-buttons>
        <e-dialog-dialogbutton buttonModel="deleteBtn" click="onDeleteClick"></e-dialog-dialogbutton>
        <e-dialog-dialogbutton buttonModel="cancelBtn" click="onCancelClick"></e-dialog-dialogbutton>
    </e-dialog-buttons>
    <e-content-template>
        <p>Are you sure you want to delete this item?</p>
    </e-content-template>
</ejs-dialog>

<script>
    function onDeleteClick(event) {
        console.log('Delete button clicked');
        
        // Perform deletion
        performDelete();
        
        // Close dialog
        document.getElementById('buttonClickDialog').ej2_instances[0].hide();
    }

    function onCancelClick(event) {
        console.log('Cancel button clicked');
        document.getElementById('buttonClickDialog').ej2_instances[0].hide();
    }

    function performDelete() {
        console.log('Deleting item...');
    }
</script>
```

### Close Icon Click

Handle close icon click via the `before-close` event:

```csharp
<ejs-dialog id="closeIconClickDialog" 
    header="Close Icon" 
    showCloseIcon="true" 
    width="500px"
    beforeClose="onBeforeCloseIcon">
    <e-content-template>
        <p>Clicking the X icon will close this dialog.</p>
    </e-content-template>
</ejs-dialog>

<script>
    function onBeforeCloseIcon(args) {
        console.log('Dialog is about to close');
    }
</script>
```

## Overlay Interactions

### Overlay Click Event

Execute code when user clicks the modal overlay:

```csharp
<ejs-dialog id="overlayClickDialog" 
    header="Click Overlay" 
    isModal="true" 
    width="500px"
    overlayClick="onOverlayClick"
    visible="false">
    <e-content-template>
        <p>Click the overlay (dark area) to see the overlayClick event fire.</p>
        <p id="overlayClickCount">Overlay clicks: 0</p>
    </e-content-template>
</ejs-dialog>

<button class="e-btn" onclick="showOverlayDialog()">Show Dialog</button>

<script>
    var overlayClickCount = 0;

    function onOverlayClick() {
        overlayClickCount++;
        console.log('Overlay clicked:', overlayClickCount);
        document.getElementById('overlayClickCount').textContent = 
            'Overlay clicks: ' + overlayClickCount;
    }

    function showOverlayDialog() {
        document.getElementById('overlayClickDialog').ej2_instances[0].show();
    }
</script>
```

### Close on Overlay Click

Close dialog when user clicks the modal overlay:

```csharp
<ejs-dialog id="overlayNoCloseDialog" 
    heModal="true" 
    width="500px"
    overlayC0px"
    overlay-click="onOverlayClickClose">
    <e-content-template>
        <p>Click the overlay to close this dialog.</p>
    </e-content-template>
    <e-dialog-buttons>
        <e-dialog-dialogbutton content="OK" click="closeDialogManual"></e-dialog-dialogbutton>
    </e-dialog-buttons>
</ejs-dialog>

<script>
    function onOverlayClickClose() {
        document.getElementById('overlayNoCloseDialog').ej2_instances[0].hide();
    }

    function closeDialogManual() {
        document.getElementById('overlayNoCloseDialog').ej2_instances[0].hide();
    }
</script>
```

## Dragging & Resizing

### Drag Start Event

Detect when user starts dragging dialog:

```csharp
<ejs-dialog id="dragStartDialog" 
    header="Drag Start Event" 
    allowDragging="true" 
    width="500px"
    dragStart="onDragStart"
    visible="false">
    <e-content-template>
        <p>Drag this dialog to see the dragStart event.</p>
        <p id="dragStatus">Status: Not dragging</p>
    </e-content-template>
</ejs-dialog>

<script>
    function onDragStart(args) {
        console.log('Drag started', args);
        document.getElementById('dragStatus').textContent = 'Status: Dragging...';
    }
</script>
```

### Dragging Event

Fired continuously while dragging:

```csharp
<ejs-dialog id="draggingDialog" 
    headeDragging="true" 
    width="500px"
    drag="onDragging"
    visible="false
    drag="onDragging">
    <e-content-template>
        <p>Watch the coordinates update as you drag.</p>
        <p id="dragCoords">X: 0, Y: 0</p>
    </e-content-template>
</ejs-dialog>

<script>
    function onDragging(args) {
        console.log('Dragging at:', args.event.clientX, args.event.clientY);
        document.getElementById('dragCoords').textContent = 
            'X: ' + Math.round(args.event.clientX) + 
            ', Y: ' + Math.round(args.event.clientY);
    }
</script>
```

### Drag Stop Event

Fired when dragging stops:

```csharp
<ejs-dialog id="dragStopDialog" 
    header="Drag Stop Event" 
    allowDragging="true" 
    visible="false"
    width="500px"
    dragStop="onDragStop">
    <e-content-template>
        <p>Drag this dialog and check the console.</p>
        <p id="dragStopStatus">Status: Ready to drag</p>
    </e-content-template>
</ejs-dialog>

<script>
    function onDragStop(args) {
        console.log('Drag stopped', args);
        var dialog = document.getElementById('dragStopDialog').ej2_instances[0];
        console.log('Final position:', dialog.position);
        document.getElementById('dragStopStatus').textContent = 
            'Stopped at: ' + JSON.stringify(dialog.position);
    }
</script>
```

### Resize Start/Stop Events

Track resizing operations:

```csharp
<ejs-dialog id="resizeDialog" 
    header="Resize Events" 
    enableResize="true" 
    width="500px" 
    height="300px"
    resizeStart="onResizeStar
    visible="false"t"
    resizing="onResizing"
    resizeStop="onResizeStop">
    <e-content-template>
        <p>Resize this dialog to see events.</p>
        <p id="resizeStatus">Status: Not resizing</p>
    </e-content-template>
</ejs-dialog>

<script>
    function onResizeStart(args) {
        console.log('Resize started');
        document.getElementById('resizeStatus').textContent = 'Status: Resizing...';
    }

    function onResizing(args) {
        console.log('Resizing...');
    }

    function onResizeStop(args) {
        console.log('Resize stopped');
        document.getElementById('resizeStatus').textContent = 'Resize stopped';
    }
</script>
```

## Event Best Practices

### Prevent Memory Leaks

Unsubscribe from events when dialog is destroyed:

```csharp
<ejs-dialog id="cleanupDialog" 
    header="Event Cleanup" 
    width="500px"
    open="onDialogOpen"
    close="onDialogClose">
    <e-content-template>
        <p>Events are properly cleaned up when dialog closes.</p>
    </e-content-template>
</ejs-dialog>

<script>
    var dialogObj;

    function onDialogOpen(args) {
        dialogObj = document.getElementById('cleanupDialog').ej2_instances[0];
        
        // Attach additional event listeners
        window.addEventListener('resize', handleWindowResize);
        console.log('Event listeners attached');
    }

    function onDialogClose(args) {
        // Remove event listeners
        window.removeEventListener('resize', handleWindowResize);
        console.log('Event listeners removed');
    }

    function handleWindowResize() {
        console.log('Window resized');
    }
</script>
```

### Event Throttling

Prevent excessive event firing:

```csharp
<script>
    function throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        }
    }

    var onDraggingThrottled = throttle(function(args) {
        console.log('Dragging (throttled):', args.event.clientX);
    }, 100);
</script>
```

### Event Logging

Create comprehensive event logging:

```csharp
<ejs-dialog id="loggingDialog" 
    header="Event Logging" 
    width="500px"
    before-open="logEvent"
    open="logEvent"
    before-close="logEvent"
    close="logEvent">
    <e-content-template>
        <div>
            <p>All events are logged:</p>
            <ul id="eventLog"></ul>
        </div>
    </e-content-template>
</ejs-dialog>

<script>
    var eventLog = [];

    function logEvent(args) {
        var timestamp = new Date().toLocaleTimeString();
        var eventName = args.name || 'Unknown';
        var logEntry = timestamp + ' - ' + eventName;
        
        eventLog.push(logEntry);
        console.log(logEntry);
        
        // Update UI (limit to last 10 events)
        var ul = document.getElementById('eventLog');
        var li = document.createElement('li');
        li.textContent = logEntry;
        ul.appendChild(li);
        
        if (ul.children.length > 10) {
            ul.removeChild(ul.firstChild);
        }
    }
</script>
```

### Async Event Handling

Handle asynchronous operations in events:

```csharp
<ejs-dialog id="asyncDialog" 
    header="Async Events" 
    width="500px"
    open="onDialogOpenAsync"
    visible="false">
    <e-content-template>
        <p id="loadingStatus">Loading...</p>
    </e-content-template>
</ejs-dialog>

<button class="e-btn" onclick="showAsyncDialog()">Show Dialog</button>

<script>
    async function onDialogOpenAsync(args) {
        try {
            console.log('Starting async operation');
            const data = await fetchData();
            console.log('Data loaded:', data);
            document.getElementById('loadingStatus').innerHTML = 
                '<strong>Data loaded successfully!</strong>';
        } catch (error) {
            console.error('Error loading data:', error);
            document.getElementById('loadingStatus').innerHTML = 
                '<span style="color: red;">Error loading data</span>';
        }
    }

    async function fetchData() {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve({message: 'Sample data'});
            }, 2000);
        });
    }

    function showAsyncDialog() {
        document.getElementById('asyncDialog').ej2_instances[0].show();
    }
</script>
```

