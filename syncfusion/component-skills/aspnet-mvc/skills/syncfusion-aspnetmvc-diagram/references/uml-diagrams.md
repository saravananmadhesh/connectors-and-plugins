# UML Diagrams in Syncfusion ASP.NET MVC Diagram

## Table of Contents
- [UML Class Diagrams](#uml-class-diagrams)
- [UML Interface and Enumeration](#uml-interface-and-enumeration)
- [UML Relationships (Connectors)](#uml-relationships-connectors)
- [UML Activity Diagrams](#uml-activity-diagrams)
- [Runtime Operations](#runtime-operations)
- [UML in Symbol Palette](#uml-in-symbol-palette)

## UML Class Diagrams

Use the `UMLClassifier` shape type for class diagram nodes:

```csharp
// Controller / PageModel
var nodes = new List<DiagramNode>
{
    new DiagramNode
    {
        Id = "Order",
        OffsetX = 200, OffsetY = 200, Width = 180, Height = 150,
        Shape = new DiagramUmlClassifierShape
        {
            Type = Shapes.UmlClassifier,
            ClassShape = new DiagramUmlClass
            {
                Name = "Order",
                Attributes = new List<DiagramUmlClassAttribute>
                {
                    new DiagramUmlClassAttribute { Name = "orderId",    Type = "string",   Scope = UmlScope.Public },
                    new DiagramUmlClassAttribute { Name = "totalPrice", Type = "double",   Scope = UmlScope.Private },
                    new DiagramUmlClassAttribute { Name = "status",     Type = "OrderStatus", Scope = UmlScope.Protected }
                },
                Methods = new List<DiagramUmlClassMethod>
                {
                    new DiagramUmlClassMethod
                    {
                        Name = "calculateTotal",
                        Type = "double",
                        Scope = UmlScope.Public,
                        Parameters = new List<DiagramMethodArgument>
                        {
                            new DiagramMethodArgument { Name = "taxRate", Type = "double" }
                        }
                    }
                }
            }
        }
    }
};
ViewBag.nodes = nodes;
```

```cshtml
@(Html.EJS().Diagram("diagram")
    .Width("100%")
    .Height("550px")
    .Nodes(ViewBag.nodes)
    .Render())
```

### UML Scope Values

| `UMLScope` | UML Symbol | Description |
|-----------|-----------|-------------|
| `Public` | `+` | Accessible from anywhere |
| `Private` | `-` | Accessible only within class |
| `Protected` | `#` | Accessible within class and subclasses |
| `Package` | `~` | Accessible within the same package |

## UML Interface and Enumeration

### Interface

```csharp
 Shape = new DiagramUmlClassifierShape
 {
     Type = Shapes.UmlClassifier,
     InterfaceShape = new DiagramUmlInterface
     {
         Name = "IPaymentProcessor",
         Attributes = new List<DiagramUmlClassAttribute>
         {
             new DiagramUmlClassAttribute { Name = "currency", Type = "string", Scope = UmlScope.Public }
         },
         Methods = new List<DiagramUmlClassMethod>
         {
             new DiagramUmlClassMethod { Name = "processPayment", Type = "bool", Scope = UmlScope.Public }
         }
     }
 }
```

### Enumeration

```csharp
Shape = new DiagramUmlClassifierShape
{
    Type = Shapes.UmlClassifier,
    EnumerationShape = new DiagramUmlEnumeration
    {
        Name = "OrderStatus",
        Members = new List<DiagramUmlEnumerationMember>
        {
            new DiagramUmlEnumerationMember { Name = "Pending" },
            new DiagramUmlEnumerationMember { Name = "Processing" },
            new DiagramUmlEnumerationMember { Name = "Shipped" },
            new DiagramUmlEnumerationMember { Name = "Delivered" }
        },
    },
    Classifier = ClassifierShape.Enumeration
}
```

## UML Relationships (Connectors)

Use the `UmlClassifier` connector shape for relationships:

```csharp
var connectors = new List<DiagramConnector>
{
// Association
new DiagramConnector
{
    Id = "assoc1",
    SourceID = "Order", TargetID = "Customer",
    Shape = new { type = "UmlClassifier", relationship = "Association", association = "Directional" }
},

// Aggregation
new DiagramConnector
{
    Id = "agg1",
    SourceID = "Order", TargetID = "OrderLine",
    Shape = new { type = "UmlClassifier", relationship = "Aggregation" }
},

// Composition (strong ownership)
new DiagramConnector
{
    Id = "comp1",
    SourceID = "Order", TargetID = "Address",
    Shape = new { type = "UmlClassifier", relationship = "Composition" }
},

// Dependency
new DiagramConnector
{
    Id = "dep1",
    SourceID = "OrderService", TargetID = "IPaymentProcessor",
    Shape = new { type = "UmlClassifier", relationship = "Dependency" }
},

// Inheritance / Generalization
new DiagramConnector
{
    Id = "inherit1",
    SourceID = "PremiumOrder", TargetID = "Order",
    Shape = new { type = "UmlClassifier", relationship = "Inheritance" }
},

// Realization (class implements interface)
new DiagramConnector
{
    Id = "realize1",
    SourceID = "PayPalProcessor", TargetID = "IPaymentProcessor",
    Shape = new { type = "UmlClassifier", relationship = "Realization" }
}
};
ViewBag.connectors = connectors;
```

### Multiplicity

```csharp
Shape = new
{
    type = "UmlClassifier",
    relationship = "Association",
    multiplicity = new
    {
        type = "OneToMany",
        source = new { optional = true, lowerBounds = "1", upperBounds = "1" },
        target = new { optional = true, lowerBounds = "0", upperBounds = "N" }
    }
}
```

`multiplicity.type` values: `"OneToOne"`, `"OneToMany"`, `"ManyToOne"`, `"ManyToMany"`

## UML Activity Diagrams

Activity diagrams use the `UmlActivity` shape type:

```csharp
// Initial Node
var nodes = new List<DiagramNode>
{
   new DiagramNode
{
    Id = "initial",
    OffsetX = 200, OffsetY = 50, Width = 30, Height = 30,
    Shape = new DiagramUmlActivityShape { Type = Shapes.UmlActivity, Shape = UmlActivityShapes.InitialNode }
},

// Action
new DiagramNode
{
    Id = "action1",
    OffsetX = 200, OffsetY = 150, Width = 150, Height = 60,
    Shape = new DiagramUmlActivityShape { Type = Shapes.UmlActivity, Shape = UmlActivityShapes.Action }
},

// Decision
new DiagramNode
{
    Id = "decision",
    OffsetX = 200, OffsetY = 270, Width = 60, Height = 60,
    Shape = new DiagramUmlActivityShape { Type = Shapes.UmlActivity, Shape = UmlActivityShapes.Decision }
},

// Fork / Join
new DiagramNode
{
    Id = "fork",
    OffsetX = 200, OffsetY = 380, Width = 10, Height = 80,
    Shape = new DiagramUmlActivityShape { Type = Shapes.UmlActivity, Shape = UmlActivityShapes.ForkNode }
},

// Final Node
new DiagramNode
{
    Id = "final",
    OffsetX = 200, OffsetY = 500, Width = 30, Height = 30,
    Shape = new DiagramUmlActivityShape { Type = Shapes.UmlActivity, Shape = UmlActivityShapes.FinalNode }
}
};
ViewBag.nodes = nodes;
```

### Activity Shape Values

| Shape | Description |
|-------|-------------|
| `InitialNode` | Filled circle — start |
| `FinalNode` | Circle in circle — end |
| `Action` | Rounded rectangle |
| `Decision` | Diamond — branch point |
| `MergeNode` | Diamond — merge point |
| `ForkNode` | Thick horizontal/vertical bar — fork |
| `JoinNode` | Thick bar — join synchronization |
| `TimeEvent` | Hourglass shape |
| `AcceptingEvent` | Concave pentagon |
| `SendSignal` | Pentagon (pointing right) |
| `ReceiveSignal` | Pentagon (pointing left) |
| `StructuredNode` | Rounded rectangle with corners |
| `Note` | Dog-eared rectangle |

### Activity Connectors

```csharp
// Control flow (default)
var connectors = new List<DiagramConnector>
{
new DiagramConnector
{
    Id = "ctrl1",
    SourceID = "initial", TargetID = "action1",
    Shape = new { type = "UmlActivity", flow = "Control" }
},

// Object flow (data flow)
new DiagramConnector
{
    Id = "obj1",
    SourceID = "action1", TargetID = "decision",
    Shape = new { type = "UmlActivity", flow = "Object" }
},

// Exception flow
new DiagramConnector
{
    Id = "exc1",
    SourceID = "decision", TargetID = "fork",
    Shape = new { type = "UmlActivity", flow = "Exception" }
}
};
ViewBag.connectors = connectors;
```

## Runtime Operations

### Add Members to UML Node

```javascript
var diagram = document.getElementById('diagram').ej2_instances[0];
var node = diagram.getObject('Order');

// Add an attribute
let node = diagram.nameTable['class'];
  let attribute = { name: 'accepted', type: 'Date', style: { color: 'red' } };
  /**
   * parameter 1 — Specifies the existing UmlClass node in the diagram to which you intend to add child elements.
   * parameter 2 — Specify the child elements, such as attributes,  members, or methods, to be added to the UML class.
   * parameter 3 — Specify the enum that you intend to add to the UML class.
   */
  diagram.addChildToUmlNode(node, attribute, 'Attribute');

// Add a method
let node = diagram.nameTable['class'];
  let method = {
    name: 'getHistory',
    style: { color: 'red' },
    parameters: [{ name: 'Date', style: {} }],
    type: 'History',
  };
  /**
   * parameter 1 — Specifies the existing UmlClass node in the diagram to which you intend to add child elements.
   * parameter 2 — Specify the child elements, such as attributes,  members, or methods, to be added to the UML class.
   * parameter 3 — Specify the enum that you intend to add to the UML class.
   */
  diagram.addChildToUmlNode(node, method, 'Method');

// Add an enumeration member
 let node = diagram.nameTable['enumeration'];
  let member = {
    name: 'Checking new',
    style: { color: 'red' },
    isSeparator: true,
  };
  /**
   * parameter 1 — Specifies the existing UmlClass node in the diagram to which you intend to add child elements.
   * parameter 2 — Specify the child elements, such as attributes,  members, or methods, to be added to the UML class.
   * parameter 3 — Specify the enum that you intend to add to the UML class.
   */
  diagram.addChildToUmlNode(node, member, 'Member');
```

### Editing at Runtime

Double-click a class name, attribute, or method cell to enter inline editing mode. Press Enter to confirm or Escape to cancel.

## UML in Symbol Palette

Add UML classifier shapes to the symbol palette for drag-and-drop:

```csharp
// In Controller
var paletteSymbols = new List<DiagramNode>
{
    new DiagramNode
    {
        Id = "classSymbol",
        Width = 100, Height = 80,
        Shape = new DiagramUmlClassifierShape
        {
            Type = Shapes.UmlClassifier,
            Classifier = ClassifierShape.Class
        }
    },
    new DiagramNode
    {
        Id = "interfaceSymbol",
        Width = 100, Height = 60,
        Shape = new DiagramUmlClassifierShape
        {
            Type = Shapes.UmlClassifier,
            Classifier = ClassifierShape.Interface
        }
    },
    new DiagramNode
    {
        Id = "enumSymbol",
        Width = 100, Height = 60,
        Shape = new DiagramUmlClassifierShape
        {
            Type = Shapes.UmlClassifier,
            Classifier = ClassifierShape.Enumeration
        }
    }
};

var palettes = new List<SymbolPalettePalette>
{
    new SymbolPalettePalette
    {
        Id = "umlpalette",
        Expanded = true,
        Symbols = paletteSymbols,
        Title = "Basic Shapes",
        IconCss = "e-ddb-icons e-basic"
    },
};

ViewBag.palettes = palettes;
```

```cshtml
@(Html.EJS().SymbolPalette("symbolpalette")
    .SymbolHeight(80)
    .SymbolWidth(100)
    .Palettes(ViewBag.palettes)
    .Render())
```
