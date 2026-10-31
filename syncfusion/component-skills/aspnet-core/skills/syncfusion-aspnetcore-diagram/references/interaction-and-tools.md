# Interaction and Tools in Syncfusion ASP.NET Core Diagram

## Table of Contents
- [Selection](#selection)
- [Drag, Resize, and Rotate](#drag-resize-and-rotate)
- [Drawing Tools](#drawing-tools)
- [Diagram Tools Enum](#diagram-tools-enum)
- [Constraints](#constraints)
- [Undo and Redo](#undo-and-redo)
- [Custom History](#custom-history)
- [Context Menu](#context-menu)
- [Keyboard Shortcuts](#keyboard-shortcuts)

## Selection

### Programmatic Selection

```javascript
var diagram = document.getElementById('diagram').ej2_instances[0];

// Select a single node by reference
var node = diagram.getObject('node1');
diagram.select([node]);

// Select all nodes and connectors
diagram.selectAll();

// Clear selection
diagram.clearSelection();
```

### Inspecting Selected Items

```javascript
// Get selected nodes and connectors
var selectedNodes = diagram.selectedItems.nodes;
var selectedConnectors = diagram.selectedItems.connectors;

console.log('Selected nodes:', selectedNodes.map(n => n.id));
```

### selectionChange Event

```cshtml
<ejs-diagram id="diagram" selectionChange="onSelectionChange">
</ejs-diagram>
<script>
    function onSelectionChange(args) {
        // args.newValue = array of newly selected elements
        // args.oldValue = array of previously selected elements
        // args.cause = 'Interaction' | 'Programmatic'
        if (args.newValue.length > 0) {
            console.log('Selected:', args.newValue[0].id);
        }
    }
</script>
```

## Drag, Resize, and Rotate

### positionChange Event

```cshtml
<ejs-diagram id="diagram" positionChange="onPositionChange">
</ejs-diagram>
<script>
    function onPositionChange(args) {
        // args.source = moved element
        // args.oldValue = { offsetX, offsetY }
        // args.newValue = { offsetX, offsetY }
        console.log('Moved to', args.newValue.offsetX, args.newValue.offsetY);
    }
</script>
```

### sizeChange Event

```cshtml
<ejs-diagram id="diagram" sizeChange="onSizeChange">
</ejs-diagram>
<script>
    function onSizeChange(args) {
        // args.source = resized element
        // args.oldValue = { width, height, offsetX, offsetY }
        // args.newValue = { width, height, offsetX, offsetY }
    }
</script>
```

### rotateChange Event

```cshtml
<ejs-diagram id="diagram" rotateChange="onRotateChange">
</ejs-diagram>
<script>
    function onRotateChange(args) {
        // args.source = rotated element
        // args.oldValue = { rotateAngle }
        // args.newValue = { rotateAngle }
    }
</script>
```

## Drawing Tools

Enable drawing mode to allow users to draw shapes on the canvas:

### Draw Rectangle

```javascript
var diagram = document.getElementById('diagram').ej2_instances[0];

diagram.drawingObject = {
    shape: { type: 'Basic', shape: 'Rectangle' },
    style: { fill: '#6BA5D7', strokeColor: '#4674CE' }
};
diagram.tool = ej.diagrams.DiagramTools.DrawOnce;
```

### Draw Polygon

```javascript
diagram.drawingObject = {
    shape: { type: 'Basic', shape: 'Polygon' }
};
diagram.tool = ej.diagrams.DiagramTools.ContinuousDraw;
```
### Draw Path

```javascript
diagram.drawingObject = {
    shape: { type: 'Path', data: 'M140 20C73 20 20 74 20 140c0 135 136 170 228 303 88-132 229-173 229-303 0-66-54-120-120-120-48 0-90 28-109 69-19-41-60-69-108-69z' }
};
diagram.tool = ej.diagrams.DiagramTools.ContinuousDraw;
```

### Draw Connector

```javascript
diagram.drawingObject = {
    type: 'Straight',
    targetDecorator: { shape: 'Arrow' }
};
diagram.tool = ej.diagrams.DiagramTools.DrawOnce;
```

### elementDraw Event

```cshtml
<ejs-diagram id="diagram" elementDraw="onElementDraw">
</ejs-diagram>
<script>
    function onElementDraw(args) {
        // args.source = source node (for connectors)
        console.log('Drew:', args.source.id);
    }
</script>
```

## Diagram Tools Enum

```javascript
// Single tool values
ej.diagrams.DiagramTools.None              // Disable all interactions
ej.diagrams.DiagramTools.SingleSelect      // Select one element at a time
ej.diagrams.DiagramTools.MultipleSelect    // Rubber-band multi-select
ej.diagrams.DiagramTools.ZoomPan           // Pan and zoom only
ej.diagrams.DiagramTools.DrawOnce          // Draw one shape, then revert to select
ej.diagrams.DiagramTools.ContinuousDraw     // Draw shapes repeatedly

// Combine tools with bitwise OR
diagram.tool = ej.diagrams.DiagramTools.DrawOnce | ej.diagrams.DiagramTools.ZoomPan;
```

Set tool via ViewBag (at page load):

```csharp
ViewBag.tool = DiagramTools.MultipleSelect;
```

```cshtml
<ejs-diagram id="diagram" tool="@ViewBag.tool">
</ejs-diagram>
```

## Constraints

### DiagramConstraints

```csharp
// Enable line routing
ViewBag.constraints = DiagramConstraints.Default | DiagramConstraints.LineRouting;

// Enable virtualization for large diagrams
ViewBag.constraints = DiagramConstraints.Default | DiagramConstraints.Virtualization;

// Enable bridging (line-crossing arcs)
ViewBag.constraints = DiagramConstraints.Default | DiagramConstraints.Bridging;

// Combined
ViewBag.constraints = DiagramConstraints.Default
    | DiagramConstraints.LineRouting
    | DiagramConstraints.Bridging
    | DiagramConstraints.Virtualization;
```

```cshtml
<ejs-diagram id="diagram" constraints="@ViewBag.constraints">
</ejs-diagram>
```

| Value     | Description                                                             |
|----------------|-------------------------------------------------------------------------|
| `None`           | Disable all diagram functionalities.                                     |
| `Bridging`       | Enables or disables Bridging support for connectors in the diagram.      |
| `UndoRedo`       | Enables or disables the Undo/Redo support for the diagram.               |
| `UserInteraction`| Enables or disables user interaction support for the diagram.            |
| `ApiUpdate`      | Enables or disables API update support for the diagram.                  |
| `PageEditable`   | Enables or disables Page Editable support for the diagram.               |
| `Zoom`           | Enables or disables Zoom support for the diagram.                        |
| `PanX`           | Enables or disables panning in the X‑coordinate for the diagram.         |
| `PanY`           | Enables or disables panning in the Y‑coordinate for the diagram.         |
| `Pan`            | Enables or disables panning on both X and Y coordinates for the diagram. |
| `ZoomTextEdit`   | Enables or disables zooming the text box while editing text.             |
| `Tooltip`        | Enables or disables the tooltip for the diagram.                         |
| `Virtualization` | Enables or disables Virtualization support for the diagram.              |
| `LineRouting`    | Enables or disables line routing.                                        |
| `Default`        | Enables or disables all constraints in the diagram.                      |

### NodeConstraints

```csharp
// Remove specific constraints (bitwise NOT)
var node = new DiagramNode
{
    Id = "lockedNode",
    Constraints = NodeConstraints.Default & ~NodeConstraints.Drag     // cannot be moved
};

// Disable rotation only
var node2 = new DiagramNode
{
    Id = "noRotate",
    Constraints = NodeConstraints.Default & ~NodeConstraints.Rotate
};

// Read-only node
var node3 = new DiagramNode
{
    Id = "readOnly",
    Constraints = NodeConstraints.None | NodeConstraints.Select   // select but can't edit
};
```

| Value              | Description                                                              |
|-------------------------|--------------------------------------------------------------------------|
| `None`                    | Disable all node constraints.                                            |
| `Select`                  | Enables or disables the node to be selected.                             |
| `Drag`                    | Enables or disables the node to be dragged.                              |
| `Rotate`                  | Enables or disables the node to be rotated.                              |
| `Shadow`                  | Enables or disables the node to display shadow.                          |
| `PointerEvents`           | Enables or disables the node to provide pointer option.                  |
| `Delete`                  | Enables or disables the node to be deleted.                              |
| `InConnect`               | Enables or disables node to provide in connect option.                   |
| `OutConnect`              | Enables or disables node to provide out connect option.                  |
| `AllowDrop`               | Enables node to provide allow‑to‑drop option.                            |
| `Individual`              | Enables node to provide individual resize option.                        |
| `ResizeNorthEast`         | Enables or disables resize NorthEast side of the node.                   |
| `ResizeEast`              | Enables or disables resize East side of the node.                        |
| `ResizeSouthEast`         | Enables or disables resize SouthEast side of the node.                   |
| `ResizeSouth`             | Enables or disables resize South side of the node.                       |
| `ResizeSouthWest`         | Enables or disables resize SouthWest side of the node.                   |
| `ResizeWest`              | Enables or disables resize West side of the node.                        |
| `ResizeNorthWest`         | Enables or disables resize NorthWest side of the node.                   |
| `ResizeNorth`             | Enables or disables resize North side of the node.                       |
| `AspectRatio`             | Enables the aspect‑ratio lock of the node.                               |
| `ReadOnly`                | Enables the ReadOnly support for annotation in the node.                 |
| `HideThumbs`              | Enables hiding all resize thumbs for the node.                           |
| `Tooltip`                 | Enables or disables tooltip for the node.                                |
| `InheritTooltip`          | Enables or disables inheriting tooltip option from parent object.        |
| `Resize`                  | Enables or disables resizing/expansion/compression of a node.            |
| `Inherit`                 | Enables node to inherit interaction options from parent object.          |
| `Expandable`              | Enables node to provide expandable option.                               |
| `AllowMovingOutsideLane`  | Enables or disables child movement outside the parent swimlane.          |
| `Default`                 | Enables all default constraints for the node.                            |

### ConnectorConstraints

```csharp
var connector = new DiagramConnector
{
    Id = "conn1",
    // Remove ability to select
    Constraints = ConnectorConstraints.Default & ~ConnectorConstraints.Select
};
```
| Value              | Description                                                                      |
|-------------------------|----------------------------------------------------------------------------------|
| `None`                    | Disable all connector constraints.                                               |
| `Select`                  | Enables or disables connector selection.                                        |
| `Delete`                  | Enables or disables connector deletion.                                         |
| `Drag`                    | Enables or disables connector dragging.                                         |
| `DragSourceEnd`           | Enables connector source end to be selected.                                    |
| `DragTargetEnd`           | Enables connector target end to be selected.                                    |
| `DragSegmentThumb`        | Enables control point and end point of each segment in a connector for editing. |
| `Interaction`             | Enables or disables interaction for the connector.                              |
| `AllowDrop`               | Enables allow‑drop support for the connector.                                   |
| `Bridging`                | Enables bridging for the connector.                                             |
| `InheritBridging`         | Enables connector to inherit bridging option from the parent object.            |
| `BridgeObstacle`          | Enables or disables bridge obstacles when connectors overlap.                   |
| `PointerEvents`           | Enables pointer events for the connector.                                       |
| `ConnectToNearByNode`     | Enables connecting to the nearest node.                                         |
| `ConnectToNearByPort`     | Enables connecting to the nearest port.                                         |
| `Tooltip`                 | Enables or disables tooltip for connectors.                                     |
| `LineRouting`             | Enables or disables line routing for the connector.                             |
| `InheritLineRouting`      | Enables or disables inheriting routing option from the parent object.           |
| `InheritTooltip`          | Enables or disables inheriting tooltip option from the parent object.           |
| `ConnectToNearByElement`  | Enables connecting to the nearest elements.                                     |
| `InheritSegmentThumbShape`| Enables or disables inheriting the value of segmentThumbShape.                  |


### AnnotationConstraints

```csharp
var annotation = new DiagramNodeAnnotation
{
    Content = "Label",
    Constraints = AnnotationConstraints.Default | AnnotationConstraints.Drag
};
```
| Value       | Description                                                           |
|------------------|-----------------------------------------------------------------------|
| `ReadOnly`         | Enables or disables the ReadOnly constraint for the annotation.       |
| `InheritReadOnly`  | Enables or disables inheriting the ReadOnly option from the parent.   |
| `Select`           | Enables or disables select support for the annotation.                |
| `Drag`             | Enables or disables drag support for the annotation.                  |
| `Resize`           | Enables or disables resize support for the annotation.                |
| `Rotate`           | Enables or disables rotate support for the annotation.                |
| `Interaction`      | Enables interaction for the annotation.                               |
| `None`             | Disables all constraints for the annotation.                          |


## Undo and Redo

```javascript
var diagram = document.getElementById('diagram').ej2_instances[0];

// Undo last action
diagram.undo();

// Redo last undone action
diagram.redo();
```

Keyboard shortcuts work automatically: `Ctrl+Z` (undo), `Ctrl+Y` (redo).

### Batch History Actions

Group multiple actions into a single undo step:

```javascript
diagram.startGroupAction();

// All changes between start and end are one history entry
diagram.nodes[0].offsetX += 50;
diagram.dataBind();
diagram.nodes[1].offsetX += 50;
diagram.dataBind();

diagram.endGroupAction();
// Now Ctrl+Z undoes all moves at once
```

### historyChange Event

```cshtml
<ejs-diagram id="diagram" historyChange="onHistoryChange">
</ejs-diagram>
<script>
    function onHistoryChange(args) {
        // args.action = 'AddEntry' | 'Undo' | 'Redo'
        // args.undoStack = current undo stack
        // args.redoStack = current redo stack
        console.log('History action:', args.action);
        console.log('Undo stack size:', args.undoStack.length);
    }
</script>
```

### Inspect Undo/Redo Stacks

```javascript
console.log('Undo entries:', diagram.historyManager.undoStack);
console.log('Redo entries:', diagram.historyManager.redoStack);
```

## Custom History

Push custom entries to the undo/redo stack:

```javascript
var customEntry = {
    undoObject: { nodeId: 'node1', oldColor: '#6BA5D7' },
    redoObject: { nodeId: 'node1', newColor: '#FF6347' }
};

// canLog controls whether this entry is saved
diagram.historyManager.canLog = function(entry) {
    return entry;  // return null to skip logging
};

diagram.historyManager.push(customEntry);
```

Handle custom undo/redo:

```javascript
diagram.historyManager.undo = function(args) {
    var node = diagram.getObject(args.undoObject.nodeId);
    node.style.fill = args.undoObject.oldColor;
    diagram.dataBind();
};

diagram.historyManager.redo = function(args) {
    var node = diagram.getObject(args.redoObject.nodeId);
    node.style.fill = args.redoObject.newColor;
    diagram.dataBind();
};
```

## Context Menu

Enable built-in context menu:

```cshtml
<ejs-diagram id="diagram"
    contextMenuSettings="@ViewBag.contextMenuSettings"
    contextMenuClick="onContextMenuClick">
</ejs-diagram>
```

```csharp
ViewBag.contextMenuSettings = new DiagramContextMenuSettings
{
    Show = true
};
```

### Custom Context Menu Items

```csharp
ViewBag.contextMenuSettings = new DiagramContextMenuSettings
{
    Show = true,
    Items = new List<DiagramContextMenuItem>
    {
        new DiagramContextMenuItem { Text = "Clone", Id = "clone", Target = ".e-diagramcontent" },
        new DiagramContextMenuItem { Text = "Lock",  Id = "lock",  Target = ".e-diagramcontent" }
    },
    ShowCustomMenuOnly = false
};
```

```javascript
function onContextMenuClick(args) {
    var diagram = document.getElementById('diagram').ej2_instances[0];
    if (args.item.id === 'clone') {
        diagram.copy();
        diagram.paste();
    }
    if (args.item.id === 'lock') {
        var nodes = diagram.selectedItems.nodes;
        nodes.forEach(function(n) {
            n.constraints =
          ej.diagrams.NodeConstraints.PointerEvents |
          ej.diagrams.NodeConstraints.Select |
          ej.diagrams.NodeConstraints.ReadOnly;
            diagram.dataBind();
        });
    }
}
```

## Keyboard Shortcuts

Default keyboard shortcuts available in the diagram:

| Shortcut Key            | Command                 | Description                                                                                     |
|-------------------------|-------------------------|-------------------------------------------------------------------------------------------------|
| Ctrl + A                | selectAll               | Select all nodes/connectors in the diagram.                                                     |
| Ctrl + C                | copy                    | Copy the diagram selected elements.                                                             |
| Ctrl + V                | paste                   | Pastes the copied elements.                                                                     |
| Ctrl + X                | cut                     | Cuts the selected elements.                                                                     |
| Ctrl + Z                | undo                    | Reverses the last editing action performed on the diagram.                                      |
| Ctrl + Y                | redo                    | Restores the last undone action.                                                                |
| Delete                  | delete                  | Deletes the selected elements.                                                                   |
| Ctrl/Shift + Click      | Multiple selection       | Selector binds all selected nodes/connectors.                                                   |
| Up Arrow                | nudge("up")             | Moves the selected elements upward by 1 px.                                                     |
| Down Arrow              | nudge("down")           | Moves the selected elements downward by 1 px.                                                   |
| Left Arrow              | nudge("left")           | Moves the selected elements left by 1 px.                                                       |
| Right Arrow             | nudge("right")          | Moves the selected elements right by 1 px.                                                      |
| Ctrl + MouseWheel       | zoom                    | Zoom in/out the diagram.                                                                        |
| F2                      | startLabelEditing       | Starts to edit the label of the selected element.                                               |
| Esc                     | endLabelEditing         | Stops editing and sets label to view mode.                                                      |
| Tab                     | Tab to Focus            | Select next diagram element in rendering order.                                                 |
| Shift + Tab             | Go to Previous Object   | Selects previous object based on z‑order.                                                       |
| Ctrl + B                | Bold                    | Toggle bold formatting for selected text.                                                       |
| Ctrl + I                | Italic                  | Toggle italic formatting for selected text.                                                     |
| Ctrl + U                | Underline               | Toggle underline formatting for selected text.                                                  |
| Ctrl + D                | Duplicate               | Duplicate the selected shape.                                                                   |
| Ctrl + G                | Group                   | Group selected shapes into a single unit.                                                       |
| Ctrl + Shift + U        | UnGroup                 | Ungroup shapes in a grouped selection.                                                          |
| Ctrl + R                | Rotate clockwise        | Rotate selected nodes clockwise.                                                                |
| Ctrl + L                | Rotate anti‑clockwise   | Rotate selected nodes counterclockwise.                                                         |
| Ctrl + H                | Flip Horizontal         | Flip selected elements horizontally.                                                            |
| Ctrl + J                | Flip Vertical           | Flip selected elements vertically.                                                              |
| Ctrl + 1                | Pointer tool            | Activate the pointer tool.                                                                      |
| Ctrl + 2                | Text tool               | Activate the text tool.                                                                         |
| Ctrl + 3                | Connector tool          | Activate the connector tool.                                                                    |
| Ctrl + 5                | Freeform tool           | Activate the freeform tool.                                                                     |
| Ctrl + 6                | Line tool               | Activate the polyline tool.                                                                     |
| Ctrl + +                | Zoom In                 | Zoom in the diagram.                                                                            |
| Ctrl + -                | Zoom Out                | Zoom out the diagram.                                                                           |
| Shift + Up Arrow        | Up                      | Moves selected elements upward by 5 px.                                                         |
| Shift + Down Arrow      | Down                    | Moves selected elements downward by 5 px.                                                       |
| Shift + Left Arrow      | Left                    | Moves selected elements left by 5 px.                                                           |
| Shift + Right Arrow     | Right                   | Moves selected elements right by 5 px.                                                          |
| Ctrl + Shift + L        | Align Text Left         | Align selected text to the left.                                                                |
| Ctrl + Shift + C        | Center Text Horizontally| Center the selected text horizontally.                                                          |
| Ctrl + Shift + R        | Align Text Right        | Align the selected text to the right.                                                           |
| Ctrl + Shift + J        | Justify Text Horizontally| Justify text horizontally.                                                                       |
| Ctrl + Shift + E        | Top‑align Text Vertically| Align selected text to the top.                                                                  |
| Ctrl + Shift + M        | Center Text Vertically  | Center the selected text vertically.                                                            |
| Ctrl + Shift + V        | Bottom‑align Text Vertically | Align selected text to the bottom.                                                          |
| Ctrl + Shift + B        | Send To Back            | Send selected shape backward behind others.                                                     |
| Ctrl + Shift + F        | Bring To Front          | Bring selected shape in front of others.                                                        |
| Ctrl + [                | Send Backward           | Move selected shape backward one layer.                                                         |
| Ctrl + ]                | Bring Forward           | Move selected shape forward one layer.                                                          |
