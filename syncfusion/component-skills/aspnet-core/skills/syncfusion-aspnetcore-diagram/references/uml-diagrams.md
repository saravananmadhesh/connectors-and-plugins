# UML Diagrams in Syncfusion ASP.NET Core Diagram

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
        Shape = new UmlClassifierShapeModel()
        {
            Type = "UMLClassifier",
            Class = new Class()
            {
                Name = "Order",
                Attributes = new List<UMLProperty>
                {
                    new UMLProperty() { Name = "orderId",    Type = "string",   Scope = UMLScope.Public },
                    new UMLProperty() { Name = "totalPrice", Type = "double",   Scope = UMLScope.Private },
                    new UMLProperty() { Name = "status",     Type = "OrderStatus", Scope = UMLScope.Protected }
                },
                Methods = new List<UMLMethods>
                {
                    new UMLMethods()
                    {
                        Name = "calculateTotal",
                        Type = "double",
                        Scope = UMLScope.Public,
                        Parameters = new List<UMLMethodParameter>
                        {
                            new UMLMethodParameter() { Name = "taxRate", Type = "double" }
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
<ejs-diagram id="diagram" width="100%" height="550px" nodes="@ViewBag.nodes">
</ejs-diagram>
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
Shape = new UmlClassifierShapeModel()
{
    Type = "UMLClassifier",
    Interface = new Interface()
    {
        Name = "IPaymentProcessor",
        Attributes = new List<UMLProperty>
        {
            new UMLProperty() { Name = "currency", Type = "string", Scope = UMLScope.Public }
        },
        Methods = new List<UMLMethods>
        {
            new UMLMethods() { Name = "processPayment", Type = "bool", Scope = UMLScope.Public }
        }
    }
}
```

### Enumeration

```csharp
Shape = new UmlClassifierShapeModel()
{
    Type = "UMLClassifier",
    Enumeration = new Enumeration()
    {
        Name = "OrderStatus",
        Members = new List<UMLEnumerationMember>
        {
            new UMLMembers() { Name = "Pending" },
            new UMLMembers() { Name = "Processing" },
            new UMLMembers() { Name = "Shipped" },
            new UMLMembers() { Name = "Delivered" }
        }
    }
}
```

## UML Relationships (Connectors)

Use the `UmlClassifier` connector shape for relationships:

```csharp
// Association
new DiagramConnector
{
    Id = "assoc1",
    SourceID = "Order", TargetID = "Customer",
    Shape = new { type = "UmlClassifier", relationship = "Association", association = "Directional" }
}

// Aggregation
new DiagramConnector
{
    Id = "agg1",
    SourceID = "Order", TargetID = "OrderLine",
    Shape = new { type = "UmlClassifier", relationship = "Aggregation" }
}

// Composition (strong ownership)
new DiagramConnector
{
    Id = "comp1",
    SourceID = "Order", TargetID = "Address",
    Shape = new { type = "UmlClassifier", relationship = "Composition" }
}

// Dependency
new DiagramConnector
{
    Id = "dep1",
    SourceID = "OrderService", TargetID = "IPaymentProcessor",
    Shape = new { type = "UmlClassifier", relationship = "Dependency" }
}

// Inheritance / Generalization
new DiagramConnector
{
    Id = "inherit1",
    SourceID = "PremiumOrder", TargetID = "Order",
    Shape = new { type = "UmlClassifier", relationship = "Inheritance" }
}

// Realization (class implements interface)
new DiagramConnector
{
    Id = "realize1",
    SourceID = "PayPalProcessor", TargetID = "IPaymentProcessor",
    Shape = new { type = "UmlClassifier", relationship = "Realization" }
}
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
new DiagramNode
{
    Id = "initial",
    OffsetX = 200, OffsetY = 50, Width = 30, Height = 30,
    Shape = new { type = "UmlActivity", shape = "InitialNode" }
}

// Action
new DiagramNode
{
    Id = "action1",
    OffsetX = 200, OffsetY = 150, Width = 150, Height = 60,
    Shape = new { type = "UmlActivity", shape = "Action" }
}

// Decision
new DiagramNode
{
    Id = "decision",
    OffsetX = 200, OffsetY = 270, Width = 60, Height = 60,
    Shape = new { type = "UmlActivity", shape = "Decision" }
}

// Fork / Join
new DiagramNode
{
    Id = "fork",
    OffsetX = 200, OffsetY = 380, Width = 10, Height = 80,
    Shape = new { type = "UmlActivity", shape = "ForkNode" }
}

// Final Node
new DiagramNode
{
    Id = "final",
    OffsetX = 200, OffsetY = 500, Width = 30, Height = 30,
    Shape = new { type = "UmlActivity", shape = "FinalNode" }
}
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
new DiagramConnector
{
    Id = "ctrl1",
    SourceID = "action1", TargetID = "decision",
    Shape = new { type = "UmlActivity", flow = "Control" }
}

// Object flow (data flow)
new DiagramConnector
{
    Id = "obj1",
    SourceID = "action1", TargetID = "action2",
    Shape = new { type = "UmlActivity", flow = "Object" }
}

// Exception flow
new DiagramConnector
{
    Id = "exc1",
    SourceID = "action1", TargetID = "errorHandler",
    Shape = new { type = "UmlActivity", flow = "Exception" }
}
```

## Runtime Operations

### Add Members to UML Node

```javascript
var diagram = document.getElementById('diagram').ej2_instances[0];
var node = diagram.getObject('Order');

// Add an attribute
diagram.addChildToUmlNode(node,
    { name: 'discount', type: 'double', scope: 'Private' },
    'Attributes');

// Add a method
diagram.addChildToUmlNode(node,
    { name: 'applyDiscount', type: 'void', scope: 'Public' },
    'Methods');

// Add an enumeration member
var enumNode = diagram.getObject('OrderStatus');
diagram.addChildToUmlNode(enumNode,
    { name: 'Cancelled' },
    'Members');
```

### Editing at Runtime

Double-click a class name, attribute, or method cell to enter inline editing mode. Press Enter to confirm or Escape to cancel.

## UML in Symbol Palette

Add UML classifier shapes to the symbol palette for drag-and-drop:

```csharp
// In Controller
var paletteSymbols = new List<DiagramNode>
{
    new DiagramNode()
    {
        Id = "classSymbol",
        Width = 100, Height = 80,
        Shape = new UmlClassifierShapeModel()
        {
            Type = "UMLClassifier",
            Classifier = "Class"
        }
    },
    new DiagramNode()
    {
        Id = "interfaceSymbol",
        Width = 100, Height = 60,
        Shape = new UmlClassifierShapeModel()
        {
            Type = "UMLClassifier",
            Classifier = "Interface"
        }
    },
    new DiagramNode()
    {
        Id = "enumSymbol",
        Width = 100, Height = 60,
        Shape = new UmlClassifierShapeModel()
        {
            Type = "UMLClassifier",
            Classifier = "Enumeration"
        }
    }
};

ViewBag.paletteSymbols = paletteSymbols;
```

```cshtml
<ejs-symbolpalette id="symbolpalette"
    symbolHeight="80" symbolWidth="100"
    palettes="@ViewBag.palettes">
</ejs-symbolpalette>
```
