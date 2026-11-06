# Symbol Palette in Syncfusion ASP.NET Core Diagram

## Table of Contents
- [Basic Symbol Palette Setup](#basic-symbol-palette-setup)
- [Defining Palettes and Symbols](#defining-palettes-and-symbols)
- [Symbol Info and Labels](#symbol-info-and-labels)
- [Symbol Preview](#symbol-preview)
- [Palette Interaction](#palette-interaction)
- [Search Functionality](#search-functionality)
- [Tooltip on Symbols](#tooltip-on-symbols)
- [Runtime Operations](#runtime-operations)
- [Connector Palettes](#connector-palettes)
- [BPMN and UML Symbol Palettes](#bpmn-and-uml-symbol-palettes)

## Basic Symbol Palette Setup

Add the symbol palette component alongside the diagram:

```cshtml
<div style="display: flex;">
    <ejs-symbolpalette id="symbolpalette"
        height="700px"
        width="250px"
        symbolHeight="80"
        symbolWidth="80"
        palettes="@ViewBag.palettes"
        getSymbolInfo="getSymbolInfo"
        getNodeDefaults="getNodeDefaults">
    </ejs-symbolpalette>

    <ejs-diagram id="diagram"
        width="calc(100% - 250px)"
        height="700px"
        nodes="@ViewBag.nodes">
    </ejs-diagram>
</div>
<ejs-scripts></ejs-scripts>
<script>
    function getNodeDefaults(symbol) {
        symbol.width = 100;
        symbol.height = 60;
        return symbol;
    }

    function getSymbolInfo(symbol) {
        return { fit: true };
    }
</script>
```

## Defining Palettes and Symbols

```csharp
// Controller
var basicShapes = new List<DiagramNode>
{
    new DiagramNode
    {
        Id = "rect",
        Shape = new { type = "Basic", shape = "Rectangle" },
        Style = new NodeStyleNodes { StrokeColor = "#757575" }
    },
    new DiagramNode
    {
        Id = "ellipse",
        Shape = new { type = "Basic", shape = "Ellipse" },
        Style = new NodeStyleNodes { StrokeColor = "#757575" }
    },
    new DiagramNode
    {
        Id = "diamond",
        Shape = new { type = "Basic", shape = "Diamond" },
        Style = new NodeStyleNodes { StrokeColor = "#757575" }
    },
    new DiagramNode
    {
        Id = "pentagon",
        Shape = new { type = "Basic", shape = "Pentagon" },
        Style = new NodeStyleNodes { StrokeColor = "#757575" }
    }
};

var flowShapes = new List<DiagramNode>
{
    new DiagramNode
    {
        Id = "terminator",
        Shape = new { type = "Flow", shape = "Terminator" },
        Style = new NodeStyleNodes { StrokeColor = "#757575" }
    },
    new DiagramNode
    {
        Id = "process",
        Shape = new { type = "Flow", shape = "Process" },
        Style = new NodeStyleNodes { StrokeColor = "#757575" }
    },
    new DiagramNode
    {
        Id = "decision",
        Shape = new { type = "Flow", shape = "Decision" },
        Style = new NodeStyleNodes { StrokeColor = "#757575" }
    }
};

ViewBag.palettes = new List<SymbolPalettePalette>
{
    new SymbolPalettePalette
    {
        Id = "basicPalette",
        Expanded = true,
        Symbols = basicShapes,
        Title = "Basic Shapes",
        IconCss = "e-ddb-icons e-basic"
    },
    new SymbolPalettePalette
    {
        Id = "flowPalette",
        Expanded = true,
        Symbols = flowShapes,
        Title = "Flowchart Shapes",
        IconCss = "e-ddb-icons e-flow"
    }
};
```

## Symbol Info and Labels

Customize how symbols are displayed and labelled in the palette:

```javascript
function getSymbolInfo(symbol) {
    return {
        fit: true,           // scale symbol to fill the palette cell
        width: 80,           // cell width override
        height: 80,          // cell height override
        showTooltip: true,   // show tooltip on hover
        description: {
            text: symbol.id,            // label below symbol
            overflow: 'Wrap',           // 'Wrap' | 'Clip' | 'Ellipsis'
            wrap: 'WrapWithOverflow'
        }
    };
}
```

| Property | Type | Description |
|----------|------|-------------|
| `fit` | boolean | Scale symbol to fill the cell |
| `width` | number | Override cell width |
| `height` | number | Override cell height |
| `showTooltip` | boolean | Show tooltip when hovering |
| `description.text` | string | Label shown below the symbol |
| `description.overflow` | string | `"Wrap"` / `"Clip"` / `"Ellipsis"` |

## Symbol Preview

Control the size of the drag preview shown when dragging from the palette:

```cshtml
<ejs-symbolpalette id="symbolpalette"
    height="700px" width="250px"
    symbolHeight="80" symbolWidth="80"
    palettes="@ViewBag.palettes"
    getSymbolInfo="getSymbolInfo">
    <e-symbolpalette-symbolpreview width="100" height="100">
        <e-symbolpreview-offset x="0.5" y="0.5"></e-symbolpreview-offset>
    </e-symbolpalette-symbolpreview>
</ejs-symbolpalette>
```

`offset` controls where the cursor attaches to the preview (0–1 range, 0.5 = center).

## Palette Interaction

### Prevent Palette Collapse

```cshtml
<ejs-symbolpalette id="symbolpalette"
    palettes="@ViewBag.palettes"
    paletteExpanding="onPaletteExpanding">
</ejs-symbolpalette>
<script>
    function onPaletteExpanding(args) {
        // args.palette = the palette being expanded/collapsed
        // args.isExpanded = target state
        if (args.palette.id === 'basicPalette') {
            args.cancel = true;  // prevent collapse of this palette
        }
    }
</script>
```

### Disable Drag from Palette

```cshtml
<ejs-symbolpalette id="symbolpalette"
    palettes="@ViewBag.palettes"
    allowDrag="false">
</ejs-symbolpalette>
```

### dragEnter Event (Diagram Side)

Handle the `dragEnter` event on the diagram to customize the node when it's dropped from the palette:

```cshtml
<ejs-diagram id="diagram"
    dragEnter="onDragEnter">
</ejs-diagram>
<script>
    function onDragEnter(args) {
        var shape = args.element;
        if (shape.shape && shape.shape.type === 'Flow') {
            shape.width = 120;
            shape.height = 60;
        }
    }
</script>
```

## Search Functionality

Enable symbol search across all palettes:

```cshtml
<ejs-symbolpalette id="symbolpalette"
    palettes="@ViewBag.palettes"
    enableSearch="true"
    symbolHeight="80"
    symbolWidth="80">
</ejs-symbolpalette>
```

Symbols are matched by their `id` value.

## Tooltip on Symbols

### Using Node Tooltip Property

```csharp
new DiagramNode
{
    Id = "processShape",
    Shape = new { type = "Flow", shape = "Process" },
    Tooltip = new DiagramDiagramTooltip { Content = "Process — Represents an operation or action" },
    Constraints = NodeConstraints.Default | NodeConstraints.Tooltip
}
```

### Using getSymbolInfo Tooltip

```javascript
function getSymbolInfo(symbol) {
    return {
        fit: true,
        showTooltip: true,
        description: { text: symbol.id }
    };
}
```

## Runtime Operations

### Add New Palette Item

```javascript
var diagram = document.getElementById('diagram').ej2_instances[0];
var palette = document.getElementById('symbolpalette').ej2_instances[0];

var newSymbol = {
    id: 'star',
    shape: { type: 'Basic', shape: 'Star' },
    style: { strokeColor: '#757575' }
};

palette.addPaletteItem('basicPalette', newSymbol);
```

### Remove Palette Item

```javascript
palette.removePaletteItem('basicPalette', 'star');
```

### Add New Palette

```javascript
var newPalette = {
    id: 'customPalette',
    expanded: true,
    symbols: [
        { id: 'custom1', shape: { type: 'Path', data: 'M0,0 L100,0 L50,100 Z' } }
    ],
    title: 'Custom Shapes'
};

palette.addPalettes(newPalette);
```

## Connector Palettes

Include connectors in the symbol palette:

```csharp
var connectorPalette = new List<DiagramConnector>
{
    new DiagramConnector
    {
        Id = "straightLine",
        Type = Segments.Straight,
        TargetDecorator = new ConnectorDecorator { Shape = DecoratorShapes.Arrow }
    },
    new DiagramConnector
    {
        Id = "orthogonalLine",
        Type = Segments.Orthogonal,
        TargetDecorator = new ConnectorDecorator { Shape = DecoratorShapes.Arrow }
    },
    new DiagramConnector
    {
        Id = "bezierLine",
        Type = Segments.Bezier,
        TargetDecorator = new ConnectorDecorator { Shape = DecoratorShapes.Arrow }
    }
};

ViewBag.palettes = new List<SymbolPalettePalette>
{
    new SymbolPalettePalette
    {
        Id = "connectorPalette",
        Expanded = true,
        Symbols = connectorPalette,   // connectors go in Symbols
        Title = "Connectors"
    }
};
```

```cshtml
<ejs-symbolpalette id="symbolpalette"
    palettes="@ViewBag.palettes"
    getConnectorDefaults="getConnectorDefaults">
</ejs-symbolpalette>
<script>
    function getConnectorDefaults(connector) {
        connector.style.strokeColor = '#757575';
        return connector;
    }
</script>
```

## BPMN and UML Symbol Palettes

### BPMN Symbols

```csharp
var bpmnSymbols = new List<DiagramNode>
{
    new DiagramNode
    {
        Id = "bpmnStart",
        Width = 50, Height = 50,
        Shape = new BpmnShapes
        {
            Type = "Bpmn",
            Shape = "Event",
            Event = new DiagramBpmnEvent
            {
                Event = BpmnEvents.Start,
                Trigger = BpmnTriggers.None
            }
        }
    },
    new DiagramNode
    {
        Id = "bpmnTask",
        Width = 100, Height = 70,
        Shape = new BpmnShapes
        {
            Type = "Bpmn",
            Shape = "Activity",
            Activity = new DiagramBpmnActivity
            {
                Activity = BpmnActivities.Task
            }
        }
    }
};
```

### UML Classifier Symbols

```csharp
var umlSymbols = new List<DiagramNode>
{
    new DiagramNode
    {
        Id = "umlClass",
        Shape = new UmlClassifierShapeModel
        {
            Type = "UMLClassifier",
            Class = new Class { Name = "Class" }
        }
    },
    new DiagramNode
    {
        Id = "umlInterface",
        Shape = new UmlClassifierShapeModel
        {
            Type = "UMLClassifier",
            Interface = new Interface { Name = "Interface" }
        }
    }
};
```
