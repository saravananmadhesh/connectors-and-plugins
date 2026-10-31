# Entity Relationship Diagrams

## When to Use This Skill

Use this skill when you need to:
- **Design database schemas** and visualize entity structures
- **Manage relationships** between database entities/tables
- **Show cardinality** with Crow's Foot notation
- **Define constraints** (primary key, foreign key, Unique, NotNull)
- **Customize appearance** of ER diagrams with styling and colors
- **Modify fields** dynamically at runtime without recreating entities
- **Create visual documentation** for data models and database structures

**Common scenarios:**
- Building a schema visualization for an e-commerce app (Customer → Order → Payment)
- Documenting database design before development
- Training stakeholders on data relationships
- Modeling complex database structures with multiple entities

---

## Component Overview

Entity Relationship Diagrams (ER Diagrams) in Syncfusion Angular Diagram display database entities, their fields, constraints, and relationships visually.

**Key Components:**
- **ER Entity Nodes** (ErShapeModel): Represent database tables
- **ER Fields** (ErFieldModel): Represent columns with data types and constraints
- **ER Connectors** (ErConnectorShapeModel): Show relationships between entities
- **Multiplicity Symbols**: Crow's Foot notation for cardinality

**Why ER Diagrams:**
- Visual clarity for complex database designs
- Communication tool for non-technical stakeholders
- Documentation of database schema
- Planning database normalization

---

## Getting Started

### Installation and Setup

Import DiagramModule in your Angular component. ER diagrams require the ER module to be injected before usage.

```typescript
import { Component, ViewEncapsulation } from '@angular/core';
import { Diagram, DiagramModule, ErDiagrams, NodeModel } from '@syncfusion/ej2-angular-diagrams';
Diagram.Inject(ErDiagrams);
@Component({
  imports: [DiagramModule],

  providers: [],
  standalone: true,
  selector: 'app-container',
  template: `<ejs-diagram #diagram id="diagram" [height]="'400px'" ></ejs-diagram>`,
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent {}
```

### Basic ER Entity Node

Create an entity with fields:

```typescript
import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { Diagram, DiagramModule, ErDiagrams, NodeModel, DiagramComponent } from '@syncfusion/ej2-angular-diagrams';
Diagram.Inject(ErDiagrams);
@Component({
  imports: [DiagramModule],
  providers: [],
  standalone: true,
  selector: 'app-container',
  template: `<ejs-diagram #diagram id="diagram" [height]="'400px'" [nodes]="nodes"></ejs-diagram>`,
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent {
  @ViewChild('diagram') diagram!: DiagramComponent;
  nodes: NodeModel[] = [
    {
      id: 'Customer',
      offsetX: 300,
      offsetY: 200,
      shape: {
        type: 'Er',
        header: { annotation: { content: 'Customer' } },
        fields: [
          {
            id: 'cust_id',
            name: 'CustomerID',
            dataType: 'INT',
            isPrimaryKey: true,
            constraints: ['NotNull'],
          },
          {
            id: 'cust_firstname',
            name: 'FirstName',
            dataType: 'VARCHAR(50)',
            constraints: ['NotNull'],
          },
          {
            id: 'cust_email',
            name: 'Email',
            dataType: 'VARCHAR(100)',
            constraints: ['Unique'],
          }
        ]
      }
    }
  ];
}
```

---

## Key Concepts

### ER Entity Nodes (ErShapeModel)

Entities represent database tables. Configure with header, fields, and styling:

```typescript
{
  id: 'employee',
  offsetX: 250,
  offsetY: 200,
  shape: {
    type: 'Er',
    header: {
      annotation: {
        content: 'EMPLOYEE',
        style: { bold: true, color: 'white' }
      },
      height: 40,
      style: { fill: '#0066cc' }
    },
    fields: [
      { id: 'emp_id', name: 'EmployeeID', dataType: 'int', isPrimaryKey: true },
      { id: 'emp_fname', name: 'FirstName', dataType: 'varchar', constraints: ['NotNull'] },
      { id: 'emp_lname', name: 'LastName', dataType: 'varchar', constraints: ['NotNull'] }
    ],
    fieldDefaults: {
      alternateRowColors: ['#ffffff', '#f0f0f0']
    }
  } as ErShapeModel
}
```


### Entity Header Configuration

The entity header displays the name of the table or entity.

```ts
header: {
  annotation: {
    content: 'CUSTOMER TABLE',
    style: {
      color: 'white',
      fontSize: 13,
      bold: true,
      fontFamily: 'Arial'
    }
  },
  height: 35,
  style: {
    fill: '#2E75B6'
  }
}
```

### ER Fields (ErFieldModel)

Each field represents a column with properties:

```typescript
{
  id: 'emp_id',
  name: 'EmployeeID',
  dataType: 'INT',
  isPrimaryKey: true,
  constraints: ['NotNull']
}
```

**Properties:**
- `id`: Unique field identifier within the entity
- `name`: Column display name
- `dataType`: SQL type (INT, VARCHAR(50), DECIMAL(10,2), etc.)
- `isPrimaryKey`: Indicates whether the field is the primary key.
- `isForeignKey`: Indicates whether the field is the foreign key.
- `constraints`: Array of constraints (NotNull, Unique)

### Constraints

Database constraints ensure data integrity:

```typescript
fields: [
  { id: 'emp_id', name: 'EmployeeID', dataType: 'INT', isPrimaryKey: true, constraints: ['NotNull'] },
  { id: 'emp_email', name: 'Email', dataType: 'VARCHAR(100)', constraints: ['Unique', 'NotNull'] },
  { id: 'dept_id', name: 'DepartmentID', dataType: 'INT', isForeignKey: true }
]
```

### Runtime Field Management

#### Add a Field

The `addErField` method adds a field to an ER entity node.

```ts
  const entityNode = this.diagram.nodes[0];
  const newField = {
      id: 'customer_phone',
      name: 'Phone',
      dataType: 'VARCHAR(20)'
  }
  this.diagram.addErField(entityNode, newField)
```

##### Insert a Field at a Specific Position

To insert the field at a specific position, pass the index as the third argument:

```ts
this.diagram.addErField(entityNode, newField, 2);
```

---

#### Remove a Field
The `removeErField` method removes an existing field from an ER entity node.

```ts
  // Find the field that needs to be removed from the ER entity.
  const fieldToRemove = entityNode.shape.fields.find(
    (field) => field.id === 'emp_email'
  );

  if (fieldToRemove) {
    this.diagram.removeErField(entityNode, fieldToRemove);
  }
```
---

#### Tracking Entity Changes

Use the `erEntityChanged` event to monitor field modifications.

```ts
public erEntityChanged(args: IErEntityChangedEventArgs): void {
    // ER fields can be reordered using drag-and-drop within the entity.
    if (args.cause === 'FieldsReorder' && args.state === 'Completed') {
        console.log('ER fields reordered successfully.');
    }
    if (args.cause === 'FieldsAdd') {
        console.log('Field Added');
    }
    if (args.cause === 'FieldsRemove') {
        console.log('Field Removed');
    }
}
```
The event is triggered when ER entity fields are:

- Added
- Removed
- Reordered

---

### ER Connector Properties

| Property | Description |
|----------|-------------|
| type | Defines the connector shape as 'Er' |
| relationship | Identifying or non-identifying relationship |
| sourceMultiplicity | Crow's Foot notation at source end |
| targetMultiplicity | Crow's Foot notation at target end |

## ER Relationship Type

The relationship property defines whether a relationship is:

- Identifying
- Non-identifying

```ts
shape: {
  type: 'Er',
  relationship: 'Identifying'
}
```

#### ER Multiplicity
Connect entities with multiplicity (how many instances relate):

```typescript
connectors: ConnectorModel[] = [
  {
    id: 'customer-order',
    sourceID: 'employee',
    targetID: 'order',
    shape: {
      type: 'Er',
      sourceMultiplicity: { type: 'One' },
      targetMultiplicity: { type: 'OneOrMany' }  // One customer places many orders
    }
  }
]
```

**Six Multiplicity Types:**
1. **One**: Exactly one
2. **OneAndOnlyOne**: Strict one-to-one
3. **Many**: Zero, one, or many (crow's foot)
4. **ZeroOrOne**: Optional (zero or one)
5. **OneOrMany**: At least one or many
6. **ZeroOrMany**: Optional many

---

## Navigation Guide

### Getting Started
- Installation and module setup
- Basic entity creation
- CSS imports and theme configuration
- First diagram render

### Entity Configuration
- Creating ER entities with ErShapeModel
- Header properties (annotation, height, styling)
- Multiple entities in same diagram
- Entity node positioning and styling

### Field Management
- Field definition with properties (name, dataType)
- Primary key and foreign key configuration
- Constraints (Unique, NotNull)
- Alternate row colors for readability

### Runtime Operations
- Adding fields dynamically with `addErField()`
- Removing fields with `removeErField()`
- Modifying fields without recreating entity
- Field change tracking with events

### Relationships
- Creating ER connectors between entities
- Identifying vs non-identifying relationships
- Crow's Foot multiplicity symbols
- Real-world relationship examples

---

## Quick Start Example

```typescript
import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { Diagram, DiagramComponent, DiagramModule, ErDiagrams, NodeModel, ConnectorModel } from '@syncfusion/ej2-angular-diagrams';

Diagram.Inject(ErDiagrams);

@Component({
  selector: 'app-container',
  template: `
    <button (click)="addField()">Add Field</button>
    <ejs-diagram #diagram id="diagram" width="100%" height="800px" 
      [nodes]="nodes" [connectors]="connectors"></ejs-diagram>
  `,
  standalone: true,
  imports: [DiagramModule],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  @ViewChild('diagram') diagram!: DiagramComponent;

  nodes: NodeModel[] = [
    {
      id: 'customer',
      offsetX: 250,
      offsetY: 200,
      shape: {
        type: 'Er',
        header: {
          annotation: { content: 'CUSTOMER', style: { bold: true, color: 'white' } },
          style: { fill: '#0066cc' }
        },
        fields: [
          { id: 'cust_id', name: 'CustomerID', dataType: 'INT', isPrimaryKey: true },
          { id: 'cust_name', name: 'Name', dataType: 'VARCHAR(100)', constraints: ['NotNull'] },
          { id: 'cust_email', name: 'Email', dataType: 'VARCHAR(100)', constraints: ['Unique'] }
        ],
        fieldDefaults: { alternateRowColors: ['#ffffff', '#E7F0F7'] }
      }
    },
    {
      id: 'order',
      offsetX: 450,
      offsetY: 500,
      shape: {
        type: 'Er',
        header: {
          annotation: { content: 'ORDER', style: { bold: true, color: 'white' } },
          style: { fill: '#00aa00' }
        },
        fields: [
          { id: 'order_id', name: 'OrderID', dataType: 'INT', isPrimaryKey: true },
          { id: 'order_cust_id', name: 'CustomerID', dataType: 'INT', isForeignKey: true, constraints: ['NotNull'] },
          { id: 'order_date', name: 'OrderDate', dataType: 'DATETIME', constraints: ['NotNull'] }
        ],
        fieldDefaults: { alternateRowColors: ['#ffffff', '#F0F7F0'] }
      }
    }
  ];

  connectors: ConnectorModel[] = [
    {
      id: 'customer-order',
      sourceID: 'customer',
      targetID: 'order',
      shape: {
        type: 'Er',
        relationship: 'NonIdentifying',
        sourceMultiplicity: { type: 'One' },
        targetMultiplicity: { type: 'OneOrMany' }
      }
    }
  ];

  addField() {
    const customerNode = this.diagram.nodes[0];
    this.diagram.addErField(customerNode, { 
      id: 'cust_phone',
      name: 'Phone', 
      dataType: 'VARCHAR(20)' 
    });
  }
}
```

---

## Common Patterns

### Pattern 1: Master-Detail Relationship
One master entity has many detail records:

```typescript
// One Department has many Employees
sourceMultiplicity: { type: 'One' },
targetMultiplicity: { type: 'OneOrMany' }
```

### Pattern 2: Lookup Table Reference
Optional reference to lookup data:

```typescript
// One Order references zero or one Status
sourceMultiplicity: { type: 'One' },
targetMultiplicity: { type: 'ZeroOrOne' }
```

### Pattern 3: Identifying Relationship
Child entity depends on parent for identity:

```typescript
{
  id: 'customer-order',
  sourceID: 'customer',
  targetID: 'order',
  shape: {
    type: 'Er',
    relationship: 'Identifying',
    sourceMultiplicity: { type: 'One' },
    targetMultiplicity: { type: 'OneOrMany' }
  }
}
```

### Pattern 4: Styled Entity Grouping
Color-code entities by type (Master, Reference, Transactional):

```typescript
style: { 
  fill: '#e6ffe6',        // Green for master data
  strokeColor: '#00cc00'
}
```
---

## Key Takeaways

✅ **ER Entities**: Use ErShapeModel to represent database tables  
✅ **Fields & Constraints**: Define columns with PK, FK, Unique, NotNull 
✅ **Relationships**: Connect entities with multiplicity symbols  
✅ **Runtime Operations**: Add/remove fields dynamically  
✅ **Styling**: Customize colors, fonts, and row colors  
✅ **Events**: Track field and entity changes  

---

## Related Topics

- **Diagram Basics**: Nodes, connectors, and layout
- **Shapes and Styles**: Component styling and theming
- **UML Diagrams**: Sequence and class diagrams
- **Automatic Layout**: Hierarchical layout for ER diagrams
- **Serialization**: Save and export ER diagrams
