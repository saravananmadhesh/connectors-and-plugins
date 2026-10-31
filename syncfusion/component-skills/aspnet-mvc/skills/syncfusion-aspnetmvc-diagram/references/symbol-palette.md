# Symbol Palette in Syncfusion ASP.NET MVC Diagram

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
    @(Html.EJS().SymbolPalette("symbolpalette")
        .Height("700px")
        .Width("250px")
        .SymbolHeight(80)
        .SymbolWidth(80)
        .Palettes(ViewBag.palettes)
        .GetSymbolInfo("getSymbolInfo")
        .GetNodeDefaults("getNodeDefaults")
        .Render())

    @(Html.EJS().Diagram("diagram")
        .Width("calc(100% - 250px)")
        .Height("700px")
        .Nodes(ViewBag.nodes)
        .Render())
</div>
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
        Shape = new DiagramBasicShape{ Type = Shapes.Basic, Shape = BasicShapes.Rectangle  },
        Style = new NodeStyleNodes { StrokeColor = "#757575" }
    },
    new DiagramNode
    {
        Id = "ellipse",
        Shape = new DiagramBasicShape{ Type = Shapes.Basic, Shape = BasicShapes.Ellipse  },
        Style = new NodeStyleNodes { StrokeColor = "#757575" }
    },
    new DiagramNode
    {
        Id = "diamond",
        Shape = new DiagramBasicShape{ Type = Shapes.Basic, Shape = BasicShapes.Diamond  },
        Style = new NodeStyleNodes { StrokeColor = "#757575" }
    },
    new DiagramNode
    {
        Id = "pentagon",
        Shape = new DiagramBasicShape{ Type = Shapes.Basic, Shape = BasicShapes.Pentagon  },
        Style = new NodeStyleNodes { StrokeColor = "#757575" }
    }
};

var flowShapes = new List<DiagramNode>
{
    new DiagramNode
    {
        Id = "terminator",
        Shape = new DiagramFlowShape{ Type = Shapes.Flow, Shape = FlowShapes.Terminator  },
        Style = new NodeStyleNodes { StrokeColor = "#757575" }
    },
    new DiagramNode
    {
        Id = "process",
         Shape = new DiagramFlowShape{ Type = Shapes.Flow, Shape = FlowShapes.Process  },
        Style = new NodeStyleNodes { StrokeColor = "#757575" }
    },
    new DiagramNode
    {
        Id = "decision",
         Shape = new DiagramFlowShape{ Type = Shapes.Flow, Shape = FlowShapes.Decision  },
        Style = new NodeStyleNodes { StrokeColor = "#757575" }
    }
};

var palettes = new List<SymbolPalettePalette>
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
ViewBag.Palettes = palettes;
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

```csharp
// Configure Symbol Preview in controller
ViewBag.symbolPreview = new SymbolPaletteSymbolPreview
{
    Width = 100,
    Height = 100,
    Offset = new SymbolPalettePoint { X = 0.5, Y = 0.5 }
};
```

```cshtml
@(Html.EJS().SymbolPalette("symbolpalette")
    .Height("700px")
    .Width("250px")
    .SymbolHeight(80)
    .SymbolWidth(80)
    .Palettes(ViewBag.palettes)
    .SymbolPreview(ViewBag.symbolPreview)
    .GetSymbolInfo("getSymbolInfo")
    .Render())
```

`offset` controls where the cursor attaches to the preview (0–1 range, 0.5 = center).

## Palette Interaction

### Prevent Palette Collapse

```cshtml
@(Html.EJS().SymbolPalette("symbolpalette")
    .Palettes(ViewBag.palettes)
    .PaletteExpanding("onPaletteExpanding")
    .Render())
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
@(Html.EJS().SymbolPalette("symbolpalette")
    .Palettes(ViewBag.palettes)
    .AllowDrag(false)
    .Render())
```

### dragEnter Event (Diagram Side)

Handle the `dragEnter` event on the diagram to customize the node when it's dropped from the palette:

```cshtml
@(Html.EJS().Diagram("diagram")
    .DragEnter("onDragEnter")
    .Render())
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
@(Html.EJS().SymbolPalette("symbolpalette")
    .Palettes(ViewBag.palettes)
    .EnableSearch(true)
    .SymbolHeight(80)
    .SymbolWidth(80)
    .Render())
```

Symbols are matched by their `id` value.

## Tooltip on Symbols

### Using Node Tooltip Property

```csharp
new DiagramNode
{
    Id = "processShape",
    Shape = new DiagramFlowShape{ Type = Shapes.Flow, Shape = FlowShapes.Process  },
    Tooltip = new DiagramDiagramTooltip { Content = "Process — Represents an operation or action" },
    Constraints = NodeConstraints.Default | NodeConstraints.Tooltip
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
palette.addPalettes([newPalette])  // (palette, isExpanded, insertAt)
```

## Connector Palettes

Include connectors in the symbol palette:

```cshtml
@(Html.EJS().SymbolPalette("symbolpalette")
    .Palettes(ViewBag.palettes)
    .GetConnectorDefaults("getConnectorDefaults")
    .Render())
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
        Shape = new DiagramBpmnShape
        {
            Type = Shapes.Bpmn,
            Shape = BpmnShapes.Event,
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
        Shape = new DiagramBpmnShape
        {
            Type = Shapes.Bpmn,
            Shape = BpmnShapes.Activity,
            Activity = new DiagramBpmnActivity
            {
                Activity = BpmnActivities.Task
            }
        }
    }
};

var palettes = new List<SymbolPalettePalette>
{
    new SymbolPalettePalette
    {
        Id = "basicPalette",
        Expanded = true,
        Symbols = bpmnSymbols,
        Title = "Basic Shapes",
        IconCss = "e-ddb-icons e-basic"
    },
};
 
ViewBag.Palettes = palettes;
```

### UML Classifier Symbols

```csharp
var umlSymbols = new List<DiagramNode>
{
    new DiagramNode
    {
        Id = "umlClass",
        Shape = new DiagramUmlClassifierShape
        {
            Type = Shapes.UmlClassifier,
            Classifier = ClassifierShape.Class,
            ClassShape = new DiagramUmlClass { Name = "Class" }
        }
    },
    new DiagramNode
    {
        Id = "umlInterface",
        Shape = new DiagramUmlClassifierShape
        {
            Type = Shapes.UmlClassifier,
            Classifier = ClassifierShape.Interface,
            InterfaceShape = new DiagramUmlInterface { Name = "Interface" }
        }
    }
};

var palettes = new List<SymbolPalettePalette>
{
    new SymbolPalettePalette
    {
        Id = "umlpalette",
        Expanded = true,
        Symbols = umlSymbols,
        Title = "Basic Shapes",
        IconCss = "e-ddb-icons e-basic"
    },
};
 
ViewBag.Palettes = palettes;
```
