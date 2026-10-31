# Entity Relationship Diagrams (ERD)

Entity Relationship (ER) diagrams are visual representations of database structures showing entities (tables), their attributes (columns), and relationships between entities.

## Module Injection

**Required for all ER diagram operations:**
```ts
import { Diagram, ErDiagrams } from '@syncfusion/ej2-diagrams';
Diagram.Inject(ErDiagrams);
```

---

## Creating ER Entities

ER entity nodes represent database tables or objects. They appear as boxes displaying the entity name in the header and fields as rows.

### Basic ER Entity

```ts
import { Diagram, NodeModel, ErShapeModel, ErDiagrams } from '@syncfusion/ej2-diagrams';

Diagram.Inject(ErDiagrams);

const customer: NodeModel = {
  id: 'Customer',
  offsetX: 300,
  offsetY: 200,
  shape: {
    type: 'Er',
    header: {
      annotation: {
        content: 'Customer'
      }
    },
    fields: [
      {
        id: 'cust_id',
        name: 'CustomerID',
        dataType: 'INT',
        isPrimaryKey: true,
        constraints: ['NotNull']
      },
      {
        id: 'cust_firstname',
        name: 'FirstName',
        dataType: 'VARCHAR(50)',
        constraints: ['NotNull']
      },
      {
        id: 'cust_email',
        name: 'Email',
        dataType: 'VARCHAR(100)',
        constraints: ['Unique']
      }
    ]
  } as ErShapeModel
};

const diagram: Diagram = new Diagram({
  width: '100%',
  height: '400px',
  nodes: [customer]
});

diagram.appendTo('#element');
```

### Entity Header Properties

| Property | Description |
|---|---|
| `annotation.content` | Text content displayed in the header |
| `annotation.style` | Text styling (color, fontSize, bold, fontFamily) |
| `height` | Header height in pixels |
| `style` | Header appearance (fill, stroke, opacity) |

**Example with Custom Header:**
```ts
const entity: NodeModel = {
  id: 'Product',
  offsetX: 300,
  offsetY: 200,
  shape: {
    type: 'Er',
    header: {
      annotation: {
        content: 'PRODUCT TABLE',
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
    },
    fields: [...]
  } as ErShapeModel
}
```

---

## Entity Fields

Fields represent columns or attributes of an entity with data types and key constraints.

### Field Properties

| Property | Description |
|---|---|
| `id` | Unique identifier for the field within the entity |
| `name` | Display name of the field (e.g., "CustomerID") |
| `dataType` | Data type (INT, VARCHAR(50), DECIMAL(10,2), TEXT, BOOLEAN) |
| `isPrimaryKey` | Boolean - indicates if field is the primary key |
| `isForeignKey` | Boolean - indicates if field is a foreign key |
| `constraints` | Array of constraints: NotNull, Unique |
| `style` | Field row styling (fill, stroke, opacity) |
| `annotation.style` | Text styling for the field row |

### Complete Field Definition

```ts
const fields = [
  {
    id: 'prod_id',
    name: 'ProductID',
    dataType: 'INT',
    isPrimaryKey: true,
    constraints: ['NotNull']
  },
  {
    id: 'prod_code',
    name: 'ProductCode',
    dataType: 'VARCHAR(50)',
    constraints: ['NotNull', 'Unique']
  },
  {
    id: 'prod_name',
    name: 'ProductName',
    dataType: 'VARCHAR(150)',
    constraints: ['NotNull']
  },
  {
    id: 'prod_price',
    name: 'Price',
    dataType: 'DECIMAL(10,2)',
    constraints: ['NotNull']
  },
  {
    id: 'prod_desc',
    name: 'Description',
    dataType: 'TEXT'
  },
  {
    id: 'prod_catid',
    name: 'CategoryID',
    dataType: 'INT',
    isForeignKey: true
  }
]
```

## Add or Remove Fields at Runtime

### Add Fields to Entity

Use the `addErField()` method to add new fields to an ER entity at runtime:

```ts
const entityNode = diagram.nodes[0];
const newField = {
  id: 'customer_phone',
  name: 'Phone',
  dataType: 'VARCHAR(20)'
};

diagram.addErField(entityNode, newField);

// Insert at a specific index (e.g., position 2)
diagram.addErField(entityNode, newField, 2);
```

### Remove Fields from Entity

Use the `removeErField()` method to remove fields from an ER entity:

```ts
let fieldToRemove = (entityNode.shape as ErShapeModel).fields.find(
    field => field.id === 'customer_phone'
);

if (fieldToRemove) {
diagram.removeErField(entityNode, fieldToRemove);
}
```

### Handling ER Entity Changes

The `erEntityChanged` event is triggered when an ER entity or its fields are modified:

```ts
const diagram: Diagram = new Diagram({
  width: '100%',
  height: '600px',
  nodes: [customer, product],
  connectors: [relationship],
  erEntityChanged: (args: IErEntityChangedEventArgs) => {
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
});
```

---

## Configure Default Field Appearance

The `fieldDefaults` property sets the default visual appearance for all fields in an ER entity node. Individual field-level styles override these defaults.

| Property | Description |
|---|---|
| `alternateRowColors` | Array of exactly two colors cycled across rows. Row 0 → `[0]`, Row 1 → `[1]`, Row 2 → `[0]`, etc. |
| `height` | Default height of each field row in pixels. |

```ts
shape: {
  type: 'Er',
  header: { annotation: { content: 'Customer' } },
  fields: [ /* ... */ ],
  fieldDefaults: {
    alternateRowColors: ['#ffffff', '#369eee'],
    height: 30
  }
} as ErShapeModel
```

## Style ER Entities and Fields

- **Node-level style** (`node.style`) controls the overall entity border and background.
- **Field-level style** (`field.style`) overrides node-level and `fieldDefaults` styles for individual rows.
- **Header style** (`shape.header.style`) controls the header fill color separately.

```ts
const customer: NodeModel = {
  id: 'Customer',
  offsetX: 500,
  offsetY: 200,
  shape: {
    type: 'Er',
    header: {
      annotation: { content: 'CUSTOMER TABLE', style: { bold: true, color: 'white' } },
      height: 35,
      style: { fill: '#2E75B6' }
    },
    fields: [
      {
        id: 'cust_id',
        name: 'CustomerID',
        dataType: 'INT',
        isPrimaryKey: true
      },
      {
        id: 'cust_email',
        name: 'Email',
        dataType: 'VARCHAR(100)',
        style: { fill: '#FFE699' }   // field-level style override
      }
    ] as ErFieldModel[],
    fieldDefaults: {
      alternateRowColors: ['#d82929', '#1ecc52']
    }
  } as ErShapeModel,
  style: {
    fill: '#ffffff',
    strokeColor: '#2E75B6',
    strokeWidth: 1
  }
};
```

> Field-level styles override applicable node-level and field default styles.

---

## Relationships Between Entities

ER relationships are defined as connectors with multiplicity symbols (Crow's Foot notation).

| Property | Description |
|---|---|
| `type` | Set to `'Er'` to activate the ER connector shape. |
| `relationship` | Whether the relationship is identifying or non-identifying. |
| `sourceMultiplicity` | Crow's Foot symbol rendered at the source end. |
| `targetMultiplicity` | Crow's Foot symbol rendered at the target end. |

###  Relationship Multiplicity

Multiplicity is represented using Crow's Foot notation at each end of an ER connector.

| Multiplicity Type | Meaning | Example Use Case |
|---|---|---|
| `One` | Single participation marker | A customer has one primary account |
| `OneAndOnlyOne` | Exactly one mandatory instance | A user must have exactly one profile |
| `Many` | Multiple instances | A customer can have many orders |
| `ZeroOrOne` | Zero or one instance | An employee may have zero or one manager badge |
| `OneOrMany` | One or more instances | A department must have one or more employees |
| `ZeroOrMany` | Zero or more instances | A customer may have zero or more wish list items |

```ts
const relationship: ConnectorModel = {
  id: 'CustomerOrder',
  sourceID: 'Customer',
  targetID: 'Order',
  shape: {
    type: 'Er',
    sourceMultiplicity: { type: 'One' },
    targetMultiplicity: { type: 'OneOrMany' },
  } as ErConnectorShapeModel,
};
```

### Identifying vs Non-Identifying Relationships

```ts
// Identifying relationship (solid line)
const identifyingRelation: ConnectorModel = {
  id: 'OrderLine',
  sourceID: 'Order',
  targetID: 'OrderDetail',
  shape: {
    type: 'Er',
    relationship: 'Identifying',

  } as ErConnectorShapeModel,
  style: {
    strokeWidth: 2
  }
};

// Non-identifying relationship (dashed line)
const nonIdentifyingRelation: ConnectorModel = {
  id: 'OrderCustomer',
  sourceID: 'Customer',
  targetID: 'Order',
  shape: {
    type: 'Er',
    relationship: 'NonIdentifying',
  } as ErConnectorShapeModel,
  style: {
    strokeDashArray: '5,5'
  }
};
```

---

## Complete Example: Customer-Order ERD

```ts
import { Diagram, NodeModel, ConnectorModel, ErShapeModel, ErConnectorShapeModel, ErDiagrams, ErFieldModel } from '@syncfusion/ej2-diagrams';

Diagram.Inject(ErDiagrams);

const customer: NodeModel = {
  id: 'Customer',
  offsetX: 250,
  offsetY: 200,
  shape: {
    type: 'Er',
    header: {
      annotation: {
        content: 'Customer',
        style: { bold: true, color: 'white' },
      },
      height: 35,
      style: { fill: '#2E75B6' },
    },
    fields: [
      {
        id: 'cust_id',
        name: 'CustomerID',
        dataType: 'INT',
        isPrimaryKey: true,
        constraints: ['NotNull'],
      },
      {
        id: 'cust_name',
        name: 'FirstName',
        dataType: 'VARCHAR(50)',
        constraints: ['NotNull'],
      },
      {
        id: 'cust_email',
        name: 'Email',
        dataType: 'VARCHAR(100)',
        constraints: ['Unique'],
      },
    ] as ErFieldModel[],
    fieldDefaults: { alternateRowColors: ['#e23333', '#29e749'] },
  } as ErShapeModel,
  style: { fill: '#ffffff', strokeColor: '#2E75B6', strokeWidth: 1 },
};

const order: NodeModel = {
  id: 'Order',
  offsetX: 750,
  offsetY: 200,
  shape: {
    type: 'Er',
    header: {
      annotation: { content: 'Order', style: { bold: true, color: 'white' } },
      height: 35,
      style: { fill: '#7c3aed' },
    },
    fields: [
      {
        id: 'order_id',
        name: 'OrderID',
        dataType: 'INT',
        isPrimaryKey: true,
        constraints: ['NotNull'],
      },
      {
        id: 'order_cust_id',
        name: 'CustomerID',
        dataType: 'INT',
        isForeignKey: true,
      },
      {
        id: 'order_date',
        name: 'OrderDate',
        dataType: 'DATE',
        constraints: ['NotNull'],
      },
    ] as ErFieldModel[],
    fieldDefaults: { alternateRowColors: ['#baee59', '#6bc3e6'] },
  } as ErShapeModel,
  style: { fill: '#ffffff', strokeColor: '#7c3aed', strokeWidth: 1 },
};

const product: NodeModel = {
  id: 'Product',
  offsetX: 750,
  offsetY: 500,
  shape: {
    type: 'Er',
    header: {
      annotation: { content: 'Product', style: { bold: true, color: 'white' } },
      height: 35,
      style: { fill: '#70AD47' },
    },
    fields: [
      {
        id: 'prod_id',
        name: 'ProductID',
        dataType: 'INT',
        isPrimaryKey: true,
        constraints: ['NotNull'],
      },
      {
        id: 'prod_name',
        name: 'ProductName',
        dataType: 'VARCHAR(150)',
        constraints: ['NotNull'],
      },
      {
        id: 'prod_price',
        name: 'Price',
        dataType: 'DECIMAL(10,2)',
        constraints: ['NotNull'],
      },
    ] as ErFieldModel[],
    fieldDefaults: { alternateRowColors: ['#ee74bb', '#e2d957'] },
  } as ErShapeModel,
  style: { fill: '#ffffff', strokeColor: '#70AD47', strokeWidth: 1 },
};

const connectors: ConnectorModel[] = [
  {
    id: 'cust_order',
    sourceID: 'Customer',
    targetID: 'Order',
    shape: {
      type: 'Er',
      relationship: 'NonIdentifying',
      sourceMultiplicity: { type: 'One' },
      targetMultiplicity: { type: 'ZeroOrMany' },
    } as ErConnectorShapeModel,
    style: { strokeColor: '#7c3aed', strokeWidth: 1.5 },
  },
  {
    id: 'order_product',
    sourceID: 'Order',
    targetID: 'Product',
    shape: {
      type: 'Er',
      relationship: 'Identifying',
      sourceMultiplicity: { type: 'OneOrMany' },
      targetMultiplicity: { type: 'One' },
    } as ErConnectorShapeModel,
    style: { strokeColor: '#70AD47', strokeWidth: 1.5 },
  },
];
// Initialize Diagram
const diagram: Diagram = new Diagram({
  width: '100%',
  height: '600px',
  nodes: [customer, order, product],
  connectors: connectors,
});

diagram.appendTo('#element');
```

---

## Default Behavior

- If no header is specified, a default header is automatically added with default style and height
- If no fields are specified, a single default field is automatically added to the ER entity node
- Field-level style values override applicable values from field defaults
