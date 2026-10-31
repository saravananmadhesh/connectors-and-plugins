# UML Class Diagram in Blazor Diagram

A UML class diagram models object-oriented structure using classifier nodes (classes, interfaces, enumerations) and relationship connectors. Use `UmlClassifierShape` on `Node` objects and `RelationShip` on `Connector` objects — do not use `UmlSequenceDiagramModel` for class diagrams.

### UML Class Node
```razor
@using Syncfusion.Blazor.Diagram

<SfDiagramComponent Height="600px" Nodes="@nodes" />

@code {
    DiagramObjectCollection<Node> nodes = new DiagramObjectCollection<Node>();

    protected override void OnInitialized()
    {
        nodes.Add(new Node()
        {
            ID = "vehicleNode", OffsetX = 300, OffsetY = 250, Width = 220,
            Shape = new UmlClassifierShape()
            {
                Classifier = ClassifierShape.Class,
                ClassShape = new UmlClass()
                {
                    Name = "Vehicle",
                    Attributes = new DiagramObjectCollection<UmlClassAttribute>()
                    {
                        new UmlClassAttribute() { Name = "make",  Type = "string", Scope = UmlScope.Private },
                        new UmlClassAttribute() { Name = "model", Type = "string", Scope = UmlScope.Private }
                    },
                    Methods = new DiagramObjectCollection<UmlClassMethod>()
                    {
                        new UmlClassMethod() { Name = "Start",      Type = "void", Scope = UmlScope.Public },
                        new UmlClassMethod()
                        {
                            Name = "Accelerate", Type = "void", Scope = UmlScope.Public,
                            Parameters = new DiagramObjectCollection<UmlTypedElement>()
                            {
                                new UmlTypedElement() { Name = "speed", Type = "int" }
                            }
                        }
                    }
                }
            }
        });
    }
}
```

### Key Gotchas

| Issue | Explanation |
|---|---|
| **Do not set `Height` on UML nodes** | `UmlClassifierShape` auto-adjusts height. Setting it explicitly breaks layout. |
| **Resize from East handle only** | Only the right handle is supported for resize. |

## Classifier Nodes

Assign `UmlClassifierShape` to a `Node.Shape`. The `Classifier` property determines the node type.

| `ClassifierShape` | Visual | Use When |
|---|---|---|
| `Class` | Name + Attributes + Operations | Concrete or abstract class |
| `Interface` | «interface» + Name + Operations | Contract definition |
| `Enumeration` | «enumeration» + Name + Members | Fixed set of named constants |

> Auto-adjusts height — never set explicit `Height`. Resize via East handle only.

### UML Class
```razor
nodes.Add(new Node()
{
    ID = "animalNode", OffsetX = 300, OffsetY = 300, Width = 220,
    Shape = new UmlClassifierShape()
    {
        Classifier = ClassifierShape.Class,
        ClassShape = new UmlClass()
        {
            Name = "Animal",
            Attributes = new DiagramObjectCollection<UmlClassAttribute>()
            {
                new UmlClassAttribute() { Name = "name", Type = "string", Scope = UmlScope.Private },
                new UmlClassAttribute() { Name = "age",  Type = "int",    Scope = UmlScope.Private }
            },
            Methods = new DiagramObjectCollection<UmlClassMethod>()
            {
                new UmlClassMethod() { Name = "eat",   Type = "void", Scope = UmlScope.Public },
                new UmlClassMethod()
                {
                    Name = "move", Type = "void", Scope = UmlScope.Public,
                    Parameters = new DiagramObjectCollection<UmlTypedElement>()
                    {
                        new UmlTypedElement() { Name = "speed", Type = "int" }
                    }
                }
            }
        }
    }
});
```

### UML Interface
```razor
nodes.Add(new Node()
{
    ID = "movableInterface", OffsetX = 550, OffsetY = 200, Width = 220,
    Shape = new UmlClassifierShape()
    {
        Classifier = ClassifierShape.Interface,
        InterfaceShape = new UmlInterface()
        {
            Name = "IMovable",
            Methods = new DiagramObjectCollection<UmlClassMethod>()
            {
                new UmlClassMethod() { Name = "Move", Type = "void", Scope = UmlScope.Public },
                new UmlClassMethod() { Name = "Stop", Type = "void", Scope = UmlScope.Public }
            }
        }
    }
});
```

### UML Enumeration
```razor
nodes.Add(new Node()
{
    ID = "directionEnum", OffsetX = 300, OffsetY = 500, Width = 200,
    Shape = new UmlClassifierShape()
    {
        Classifier = ClassifierShape.Enumeration,
        EnumerationShape = new UmlEnumeration()
        {
            Name = "Direction",
            Members = new DiagramObjectCollection<UmlEnumerationMember>()
            {
                new UmlEnumerationMember() { Name = "North" },
                new UmlEnumerationMember() { Name = "South" },
                new UmlEnumerationMember() { Name = "East"  },
                new UmlEnumerationMember() { Name = "West"  }
            }
        }
    }
});
```

### Visibility Scopes

| `UmlScope` | Symbol | Meaning |
|---|---|---|
| `Public`    | `+` | Accessible from anywhere |
| `Private`   | `-` | Class-only access |
| `Protected` | `#` | Class + subclasses |
| `Package`   | `~` | Same package |

### Method Parameters
```razor
new UmlClassMethod()
{
    Name = "Transfer", Type = "bool", Scope = UmlScope.Public,
    Parameters = new DiagramObjectCollection<UmlTypedElement>()
    {
        new UmlTypedElement() { Name = "targetAccount", Type = "Account" },
        new UmlTypedElement() { Name = "amount",        Type = "decimal" }
    }
}
// Renders: + Transfer(targetAccount : Account, amount : decimal) : bool
```

### Separator Rows
```razor
Attributes = new DiagramObjectCollection<UmlClassAttribute>()
{
    new UmlClassAttribute() { Name = "id",   Type = "int",    Scope = UmlScope.Public },
    new UmlClassAttribute() { IsSeparator = true },   // horizontal divider
    new UmlClassAttribute() { Name = "name", Type = "string", Scope = UmlScope.Public }
}
```
Style the separator line:
```razor
new UmlClassAttribute()
{
    IsSeparator    = true,
    SeparatorStyle = new ShapeStyle() { StrokeColor = "#999999", StrokeDashArray = "4,2" }
}
```

### Property Reference — Classifier Members

| Type | Property | Description |
|---|---|---|
| `UmlClassAttribute` | `Name`, `Type`, `Scope` | Member name, data type, visibility |
| `UmlClassAttribute` | `IsSeparator`, `SeparatorStyle` | Horizontal divider and its style |
| `UmlClassAttribute` | `Style` | Row-level `TextStyle` |
| `UmlClassMethod` | `Name`, `Type`, `Scope`, `Parameters` | Method signature |
| `UmlClassMethod` | `IsSeparator`, `SeparatorStyle`, `Style` | Separator / row style |
| `UmlTypedElement` | `Name`, `Type` | Method parameter |
| `UmlEnumerationMember` | `Name`, `IsSeparator`, `SeparatorStyle`, `Style` | Enum literal / separator |

---

## Appearance Customization

### Classifier Header

Style the name compartment via `UmlClassifierShape.HeaderStyle`:
```razor
Shape = new UmlClassifierShape()
{
    Classifier  = ClassifierShape.Class,
    HeaderStyle = new TextStyle() { Fill = "#1565C0", Color = "white", Bold = true },
    ClassShape  = new UmlClass() { Name = "Customer" }
}
```

### Section Headers

Configure each compartment with `UmlSectionHeaderSettings`:
```razor
ClassShape = new UmlClass()
{
    Name = "Customer",
    AttributeHeaderSettings = new UmlSectionHeaderSettings()
    {
        HeaderText             = "Properties",
        Style                  = new TextStyle() { Fill = "#475569", Color = "#FFFFFF", Bold = true },
        EnableAddAction        = true,
        EnableRemoveAction     = true,
        IsExpanded             = true,
        ShowExpandCollapseIcon = true
    },
    MethodHeaderSettings = new UmlSectionHeaderSettings()
    {
        HeaderText             = "Operations",
        Style                  = new TextStyle() { Fill = "#64748B", Color = "#FFFFFF", Bold = true },
        EnableAddAction        = true,
        EnableRemoveAction     = true,
        IsExpanded             = true,
        ShowExpandCollapseIcon = true
    }
}
```
For enumerations use `MemberHeaderSettings` on `UmlEnumeration`.

### Row-Level Styling

Apply `TextStyle` to individual `UmlClassAttribute`, `UmlClassMethod`, or `UmlEnumerationMember`:
```razor
new UmlClassAttribute()
{
    Name = "email", Type = "string", Scope = UmlScope.Private,
    Style = new TextStyle() { Fill = "#F8FAFC", Color = "#334155" }
}
```

### Full Styled Example
```razor
@using Syncfusion.Blazor.Diagram

<SfDiagramComponent Height="600px" Nodes="@nodes">
    <SnapSettings Constraints="SnapConstraints.None" />
</SfDiagramComponent>

@code {
    DiagramObjectCollection<Node> nodes = new DiagramObjectCollection<Node>();

    protected override void OnInitialized()
    {
        nodes.Add(new Node()
        {
            ID = "customerNode", OffsetX = 300, OffsetY = 350, Width = 240,
            Shape = new UmlClassifierShape()
            {
                Classifier  = ClassifierShape.Class,
                HeaderStyle = new TextStyle() { Fill = "#334155", Color = "#FFFFFF", Bold = true },
                ClassShape  = new UmlClass()
                {
                    Name = "Customer",
                    AttributeHeaderSettings = new UmlSectionHeaderSettings()
                    {
                        HeaderText             = "Properties",
                        ShowExpandCollapseIcon = false,
                        IsExpanded             = true,
                        Style = new TextStyle() { Fill = "#475569", Color = "#FFFFFF", Bold = true }
                    },
                    MethodHeaderSettings = new UmlSectionHeaderSettings()
                    {
                        HeaderText             = "Operations",
                        ShowExpandCollapseIcon = true,
                        EnableAddAction        = true,
                        EnableRemoveAction     = true,
                        IsExpanded             = true,
                        Style = new TextStyle() { Fill = "#64748B", Color = "#FFFFFF", Bold = true }
                    },
                    Attributes = new DiagramObjectCollection<UmlClassAttribute>()
                    {
                        new UmlClassAttribute()
                        {
                            Name = "CustomerId", Type = "int", Scope = UmlScope.Public,
                            Style = new TextStyle() { Fill = "#E2E8F0", Color = "#334155" }
                        },
                        new UmlClassAttribute()
                        {
                            Name = "Email", Type = "string", Scope = UmlScope.Private,
                            Style = new TextStyle() { Fill = "#F1F5F9", Color = "#334155" }
                        }
                    },
                    Methods = new DiagramObjectCollection<UmlClassMethod>()
                    {
                        new UmlClassMethod()
                        {
                            Name = "PlaceOrder", Type = "void", Scope = UmlScope.Public,
                            Style = new TextStyle() { Fill = "#F8FAFC", Color = "#475569" }
                        },
                        new UmlClassMethod()
                        {
                            Name = "GetOrderHistory", Type = "List<Order>", Scope = UmlScope.Public,
                            Style = new TextStyle() { Fill = "#F8FAFC", Color = "#475569" }
                        }
                    }
                }
            }
        });
    }
}
```

### Property Reference — Appearance

| Type | Property | Type | Description |
|---|---|---|---|
| `UmlClassifierShape` | `HeaderStyle` | `TextStyle` | Styles the name compartment |
| `UmlSectionHeaderSettings` | `HeaderText` | `string` | Label for the section row |
| `UmlSectionHeaderSettings` | `Style` | `TextStyle` | Section header background and text |
| `UmlSectionHeaderSettings` | `EnableAddAction` | `bool` | Show (+) button (default `true`) |
| `UmlSectionHeaderSettings` | `EnableRemoveAction` | `bool` | Show (-) button (default `true`) |
| `UmlSectionHeaderSettings` | `IsExpanded` | `bool` | Section expanded by default (default `true`) |
| `UmlSectionHeaderSettings` | `ShowExpandCollapseIcon` | `bool` | Show chevron toggle (default `true`) |
| `TextStyle` | `Fill` | `string` | Background fill color |
| `TextStyle` | `Color` | `string` | Text color |
| `TextStyle` | `Bold`, `Italic` | `bool` | Font weight / style |
| `TextStyle` | `FontSize`, `FontFamily` | `double` / `string` | Font size and family |
| `TextStyle` | `Opacity` | `double` | 0.0-1.0 |

---

## Relationships

Assign a `RelationShip` shape to a `Connector` and set `RelationshipShape` to a `Relationship` enum value.

### Relationship Types

| `Relationship` | Visual | Description |
|---|---|---|
| `Association`  | Solid line ± arrows | Structural link between classifiers |
| `Aggregation`  | Solid line + hollow ◇ | Weak whole-part; part can exist independently |
| `Composition`  | Solid line + filled ◇ | Strong whole-part; part cannot exist independently |
| `Inheritance`  | Solid line + open △ | Subclass extends superclass |
| `Dependency`   | Dashed line + open → | One classifier depends on another |
| `Realization`  | Dashed line + open △ | Class implements an interface |

### Basic Connectors
```razor
@using Syncfusion.Blazor.Diagram

<SfDiagramComponent Height="600px" Connectors="@connectors" />

@code {
    DiagramObjectCollection<Connector> connectors = new DiagramObjectCollection<Connector>();

    protected override void OnInitialized()
    {
        connectors.Add(new Connector()
        {
            ID          = "inheritanceConn",
            SourcePoint = new DiagramPoint() { X = 200, Y = 400 },
            TargetPoint = new DiagramPoint() { X = 200, Y = 200 },
            Type        = ConnectorSegmentType.Straight,
            Shape       = new RelationShip() { RelationshipShape = Relationship.Inheritance }
        });

        connectors.Add(new Connector()
        {
            ID          = "dependencyConn",
            SourcePoint = new DiagramPoint() { X = 600, Y = 300 },
            TargetPoint = new DiagramPoint() { X = 750, Y = 300 },
            Type        = ConnectorSegmentType.Straight,
            Shape       = new RelationShip() { RelationshipShape = Relationship.Dependency }
        });
    }
}
```

### Association Directionality

Applies only when `RelationshipShape = Relationship.Association`:

| `AssociationFlow` | Description |
|---|---|
| `Directional`   | Arrow source → target (→) |
| `BiDirectional` | Arrows at both ends (↔) |

```razor
Shape = new RelationShip()
{
    RelationshipShape = Relationship.Association,
    AssociationType   = AssociationFlow.Directional
}
```

### Multiplicity Labels
```razor
Shape = new RelationShip()
{
    RelationshipShape = Relationship.Aggregation,
    Multiplicity      = new ClassifierMultiplicity()
    {
        Source = new MultiplicityLabel() { LowerBounds = "1", UpperBounds = "1" },
        Target = new MultiplicityLabel() { LowerBounds = "0", UpperBounds = "*" }
    }
}
// Renders: 1..1 ◇────── 0..*
```

**Common patterns:**

| Pattern | LowerBounds | UpperBounds |
|---|---|---|
| Exactly one | `"1"` | `"1"` |
| Zero or one | `"0"` | `"1"` |
| Zero or many | `"0"` | `"*"` |
| One or many | `"1"` | `"*"` |

### Connecting Nodes by ID

Use `SourceID` / `TargetID` (preferred over fixed coordinates):
```razor
connectors.Add(new Connector()
{
    ID       = "realizationConn",
    SourceID = "circle",
    TargetID = "iShape",
    Type     = ConnectorSegmentType.Orthogonal,
    Shape    = new RelationShip() { RelationshipShape = Relationship.Realization }
});
```

### Multi-Relationship Example
```razor
@using Syncfusion.Blazor.Diagram

<SfDiagramComponent Height="800px" Nodes="@nodes" Connectors="@connectors" />

@code {
    DiagramObjectCollection<Node>      nodes      = new DiagramObjectCollection<Node>();
    DiagramObjectCollection<Connector> connectors = new DiagramObjectCollection<Connector>();

    protected override void OnInitialized()
    {
        nodes.Add(new Node()
        {
            ID = "person", OffsetX = 300, OffsetY = 150, Width = 200,
            Shape = new UmlClassifierShape()
            {
                Classifier = ClassifierShape.Class,
                ClassShape = new UmlClass()
                {
                    Name = "Person",
                    Attributes = new DiagramObjectCollection<UmlClassAttribute>()
                    {
                        new UmlClassAttribute() { Name = "name", Type = "string", Scope = UmlScope.Protected }
                    }
                }
            }
        });

        nodes.Add(new Node()
        {
            ID = "employee", OffsetX = 300, OffsetY = 380, Width = 200,
            Shape = new UmlClassifierShape()
            {
                Classifier = ClassifierShape.Class,
                ClassShape = new UmlClass()
                {
                    Name = "Employee",
                    Attributes = new DiagramObjectCollection<UmlClassAttribute>()
                    {
                        new UmlClassAttribute() { Name = "employeeId", Type = "int", Scope = UmlScope.Private }
                    }
                }
            }
        });

        nodes.Add(new Node()
        {
            ID = "department", OffsetX = 600, OffsetY = 380, Width = 200,
            Shape = new UmlClassifierShape()
            {
                Classifier = ClassifierShape.Class,
                ClassShape = new UmlClass() { Name = "Department" }
            }
        });

        // Inheritance: Employee extends Person
        connectors.Add(new Connector()
        {
            ID = "c1", SourceID = "employee", TargetID = "person",
            Type  = ConnectorSegmentType.Orthogonal,
            Shape = new RelationShip() { RelationshipShape = Relationship.Inheritance }
        });

        // Composition: Department 1 ──◆ 1..* Employee
        connectors.Add(new Connector()
        {
            ID = "c2", SourceID = "department", TargetID = "employee",
            Type  = ConnectorSegmentType.Orthogonal,
            Shape = new RelationShip()
            {
                RelationshipShape = Relationship.Composition,
                Multiplicity      = new ClassifierMultiplicity()
                {
                    Source = new MultiplicityLabel() { LowerBounds = "1", UpperBounds = "1" },
                    Target = new MultiplicityLabel() { LowerBounds = "1", UpperBounds = "*" }
                }
            }
        });
    }
}
```

### Property Reference — Relationships

| Type | Property | Description |
|---|---|---|
| `RelationShip` | `RelationshipShape` | `Relationship` enum value |
| `RelationShip` | `AssociationType` | `AssociationFlow` (Association only) |
| `RelationShip` | `Multiplicity` | `ClassifierMultiplicity` for cardinality labels |
| `ClassifierMultiplicity` | `Source`, `Target` | `MultiplicityLabel` at each end |
| `MultiplicityLabel` | `LowerBounds`, `UpperBounds` | Cardinality strings (e.g., `"0"`, `"*"`) |

---

## Runtime Management & Interactions

### Add Members at Runtime

Get the node via `diagram.GetObject(id)`, cast its `Shape` to `UmlClassifierShape`, then call `Add()` on the target collection:

```razor
<SfDiagramComponent @ref="diagram" Height="500px" Nodes="@nodes" />
<button @onclick="AddAttribute">Add Attribute</button>

@code {
    SfDiagramComponent diagram;
    DiagramObjectCollection<Node> nodes = new DiagramObjectCollection<Node>();

    protected override void OnInitialized()
    {
        nodes.Add(new Node()
        {
            ID = "classNode", OffsetX = 300, OffsetY = 250, Width = 200,
            Shape = new UmlClassifierShape()
            {
                Classifier = ClassifierShape.Class,
                ClassShape = new UmlClass()
                {
                    Name = "Product",
                    Attributes = new DiagramObjectCollection<UmlClassAttribute>()
                    {
                        new UmlClassAttribute() { Name = "id", Type = "int", Scope = UmlScope.Private }
                    }
                }
            }
        });
    }

    void AddAttribute()
    {
        UmlClassifierShape shape = (diagram.GetObject("classNode") as Node).Shape as UmlClassifierShape;
        shape.ClassShape.Attributes.Add(new UmlClassAttribute() { Name = "price", Type = "decimal", Scope = UmlScope.Private });
    }
}
```

### Remove Members at Runtime

```csharp
// By index
UmlClassifierShape shape = (diagram.GetObject("classNode") as Node).Shape as UmlClassifierShape;
if (shape.ClassShape.Attributes.Count > 0)
    shape.ClassShape.Attributes.RemoveAt(0);

// By instance
shape.ClassShape.Attributes.Remove(attributeToRemove);
```

### Collection Events

`DiagramObjectCollection<T>` fires `CollectionChanging` (before) and `CollectionChanged` (after) for Add, Remove, and Reset:

```csharp
protected override void OnInitialized()
{
    nodes[0].Annotations.CollectionChanging += (s, args) =>
    {
        if (args.Action == CollectionChangedAction.Add)
        {
            ShapeAnnotation ann = args.NewValue as ShapeAnnotation;
            if (string.IsNullOrWhiteSpace(ann?.Content)) args.Cancel = true;
        }
    };
    nodes[0].Annotations.CollectionChanged += (s, args) =>
    {
        Console.WriteLine($"Collection {args.Action}: {(args.NewValue as ShapeAnnotation)?.Content}");
    };
}
```

| Property | Description |
|---|---|
| `args.Action` | `Add`, `Remove`, or `Reset` |
| `args.NewValue` | Item being added (`null` for Remove) |
| `args.OldValue` | Item being removed (`null` for Add) |
| `args.Cancel` | Set `true` in `CollectionChanging` to abort |

### Inline Text Editing

| Action | Result |
|---|---|
| Double-click annotation | Opens inline text editor |
| `F2` (element selected) | Opens editor for the first annotation |
| `Escape` | Exits without saving |
| `Enter` / `Shift+Enter` | Commits / inserts newline |

```csharp
// Programmatic — first annotation
await diagram.StartTextEdit(node);

// Programmatic — specific annotation
await diagram.StartTextEdit(node, "annotationId");
```

### Symbol Palette Integration

```razor
@using Syncfusion.Blazor.Diagram
@using Syncfusion.Blazor.Diagram.SymbolPalette

<div style="display:flex; gap:16px;">
    <SfSymbolPaletteComponent Height="700px" Width="200px"
                              @ref="@_symbolPalette"
                              Palettes="@palettes"
                              SymbolDragPreviewSize="@symbolDragPreviewSize" />
    <SfDiagramComponent @ref="@_diagram" Height="700px" Width="100%" Nodes="@nodes" />
</div>

@code {
    private SfSymbolPaletteComponent? _symbolPalette;
    private SfDiagramComponent? _diagram;
    DiagramObjectCollection<Node> nodes = new DiagramObjectCollection<Node>();
    DiagramObjectCollection<Palette> palettes = new DiagramObjectCollection<Palette>();
    private DiagramSize symbolDragPreviewSize = new DiagramSize() { Width = 100, Height = 100 };

    protected override void OnInitialized()
    {
        DiagramObjectCollection<NodeBase> umlShapes = new DiagramObjectCollection<NodeBase>()
        {
            new Node() { ID = "umlClass",     Width = 150, Shape = new UmlClassifierShape() { Classifier = ClassifierShape.Class,        ClassShape       = new UmlClass()       { Name = "Class"       } } },
            new Node() { ID = "umlInterface", Width = 150, Shape = new UmlClassifierShape() { Classifier = ClassifierShape.Interface,    InterfaceShape   = new UmlInterface()   { Name = "Interface"   } } },
            new Node() { ID = "umlEnum",      Width = 150, Shape = new UmlClassifierShape() { Classifier = ClassifierShape.Enumeration,  EnumerationShape = new UmlEnumeration() { Name = "Enumeration" } } },
        };

        DiagramObjectCollection<NodeBase> relationShapes = new DiagramObjectCollection<NodeBase>();
        foreach ((string id, Relationship rel) in new (string, Relationship)[]
        {
            ("assoc", Relationship.Association), ("aggregation", Relationship.Aggregation),
            ("composition", Relationship.Composition), ("inheritance", Relationship.Inheritance),
            ("dependency", Relationship.Dependency), ("realization", Relationship.Realization),
        })
        {
            relationShapes.Add(new Connector()
            {
                ID = id,
                SourcePoint = new DiagramPoint() { X = 0, Y = 0 },
                TargetPoint = new DiagramPoint() { X = 100, Y = 0 },
                Shape = new RelationShip() { RelationshipShape = rel }
            });
        }

        palettes.Add(new Palette() { ID = "umlClassifiers", Title = "UML Classifiers", Symbols = umlShapes, IsExpanded = true });
        palettes.Add(new Palette() { ID = "umlRelationships", Title = "Relationships", Symbols = relationShapes, IsExpanded = true });
    }
    protected override async Task OnAfterRenderAsync(bool firstRender)
    {
        _symbolPalette.Targets = new DiagramObjectCollection<SfDiagramComponent>() { };
        _symbolPalette.Targets.Add(_diagram);
    }
}
```

> `SfSymbolPaletteComponent` is part of `Syncfusion.Blazor.Diagram` — no extra NuGet package needed.

### API Reference

| Member | Signature | Description |
|---|---|---|
| `GetObject` | `IDiagramObject GetObject(string id)` | Retrieve a node/connector by ID |
| `StartTextEdit` | `Task StartTextEdit(IDiagramObject obj)` | Begin editing first annotation |
| `StartTextEdit` | `Task StartTextEdit(IDiagramObject obj, string annotationId)` | Begin editing specific annotation |
| `Add` | `void Add(T item)` | Sync add; triggers collection events |
| `Remove` | `void Remove(T item)` | Remove instance; triggers events |
| `RemoveAt` | `void RemoveAt(int index)` | Remove by zero-based index |
