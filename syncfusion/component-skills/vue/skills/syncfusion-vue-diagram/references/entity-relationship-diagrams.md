---
name: implementing-entity-relationship-diagrams
description: Create and manage Entity Relationship (ER) diagrams in Syncfusion Vue Diagram control. Configure ER entities with fields, define relationships with multiplicity, style entity headers and fields, handle runtime field modifications, and implement database schema visualizations immediately.
metadata:
  author: "Syncfusion Inc"
  version: "1.0.0"
  category: "Diagrams"
---

# Implementing Entity Relationship Diagrams

## Table of Contents
- [Overview](#overview)
- [ER Diagram Elements](#er-diagram-elements)
- [Creating ER Entity Nodes](#creating-er-entity-nodes)
- [Configuring Entity Headers](#configuring-entity-headers)
- [Defining Entity Fields](#defining-entity-fields)
- [Managing Fields at Runtime](#managing-fields-at-runtime)
- [Styling ER Entities](#styling-er-entities)
- [Creating ER Relationships](#creating-er-relationships)
- [Understanding Multiplicity](#understanding-multiplicity)
- [Common Use Cases](#common-use-cases)
- [Troubleshooting](#troubleshooting)

## Overview

Entity Relationship (ER) diagrams are visual representations of database structures. They display entities (tables), their attributes (columns), and relationships between entities. In the Syncfusion Vue Diagram control, ER diagrams are created by configuring nodes with **ErShapeModel** and connectors with **ErConnectorShapeModel**.

**When to use ER diagrams:**
- Design and document database schemas
- Visualize entity relationships and dependencies
- Plan database structures before implementation
- Communicate data models to stakeholders
- Generate schema documentation

## ER Diagram Elements

An ER diagram is built using three main elements:

1. **Entities** - Represent database tables or objects (e.g., Customer, Order, Product)
2. **Fields** - Represent columns or attributes inside an entity (e.g., CustomerID, Name, Email)
3. **Relationships** - Represent associations between entities using connectors with multiplicity symbols

## Creating ER Entity Nodes

An ER entity node represents a database entity such as a table. It appears as a box displaying the entity name in the header and its fields as rows.

To create an ER entity node, set the shape `type` property to `'Er'`:

```vue
<template>
    <div id="app">
        <ejs-diagram id="diagram" ref="diagramObj" :width='width' :height='height' :nodes='nodes'></ejs-diagram>
    </div>
</template>

<script>
import { provide, ref } from 'vue';
import { DiagramComponent, ErDiagrams } from '@syncfusion/ej2-vue-diagrams';

let diagramInstance;

// Define a basic ER entity (Customer table)
const customer = {
  id: 'Customer',
  offsetX: 300,
  offsetY: 200,
  shape: {
    type: 'Er',
    header: {
      annotation: {
        content: 'Customer',
      },
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
      },
    ],
  },
};

export default {
  name: 'App',
  components: {
    'ejs-diagram': DiagramComponent,
  },
  data() {
    return {
      width: '100%',
      height: '600px',
      nodes: [customer],
    };
  },
  mounted: function () {
    diagramInstance = this.$refs.diagramObj.ej2Instances;
  },
  provide: {
    diagram: [ErDiagrams]
  }
};
</script>
<style>
  @import "../node_modules/@syncfusion/ej2-tailwind3-theme/styles/diagram/index.css";
</style>
```

**Key points:**
- Set `shape.type` to `'Er'` to create an ER entity
- Define entity header with `header.annotation.content` for the entity name
- Add entity fields using the `fields` array
- Each field requires `id`, `name`, and `dataType`

## Configuring Entity Headers

The header is the top section of an ER entity node that displays the entity name. Customize the header appearance using these properties:

| Header Property | Description |
|---|---|
| `annotation.content` | Text content displayed in the header |
| `annotation.style` | Text styling (color, fontSize, bold, fontFamily) |
| `height` | Height of the header area in pixels (default: auto) |
| `style` | Fill color, text color, font settings, and other style properties |

**Example - Customized header:**

```javascript
const customer = {
  id: 'Customer',
  offsetX: 300,
  offsetY: 200,
  shape: {
    type: 'Er',
    header: {
      annotation: {
        content: 'CUSTOMER TABLE',
        style: {
          color: 'white',
          fontSize: 13,
          bold: true,
          fontFamily: 'Arial',
        },
      },
      height: 35,
      style: {
        fill: '#2E75B6',
      },
    },
    fields: [
      {
        id: 'cust_id',
        name: 'CustomerID',
        dataType: 'INT',
        isPrimaryKey: true,
      },
      {
        id: 'cust_name',
        name: 'FirstName',
        dataType: 'VARCHAR(50)',
      },
      {
        id: 'cust_email',
        name: 'Email',
        dataType: 'VARCHAR(100)',
      },
    ],
  },
};
```

**Customization tips:**
- Use contrasting colors between header and fields for visual clarity
- Set header height to accommodate larger font sizes
- Apply bold text to headers for emphasis
- Use consistent header styling across related entities

## Defining Entity Fields

Fields represent columns or attributes of an entity. Define fields using the `fields` array property. Each field can display information such as field name, data type, and key constraints.

| Field Property | Description |
|---|---|
| `id` | Unique identifier for the field within the entity |
| `name` | Display name of the field |
| `dataType` | Data type (e.g., INT, VARCHAR(255), BOOLEAN, DECIMAL(10,2)) |
| `isPrimaryKey` | Boolean indicating if field is the primary key |
| `isForeignKey` | Boolean indicating if field references another entity |
| `constraints` | Array of constraints: `['NotNull', 'Unique']` |
| `style` | Visual styling for the field row |
| `annotation.style` | Text styling for the field row |

**Example - Multiple field types:**

```javascript
const product = {
  id: 'Product',
  offsetX: 300,
  offsetY: 200,
  shape: {
    type: 'Er',
    header: {
      annotation: { content: 'Product' }
    },
    fields: [
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
  }
};
```

**Default field behavior:**
- If no fields are specified, a default single field is automatically added
- Primary keys are typically marked with special visual indicators
- Foreign keys identify relationships between entities

## Managing Fields at Runtime

Add or remove ER fields after the diagram is rendered using the `addErField` and `removeErField` methods.

**Adding a field:**

Use the `addErField()` method to add new fields to an ER entity at runtime:

```javascript
let entityNode = diagramInstance.nodes[0];
let newField = {
    id: 'customer_phone',
    name: 'Phone',
    dataType: 'VARCHAR(20)'
};

// Add field at the end
diagramInstance.addErField(entityNode, newField);

// Add field at a specific position (index 2)
diagramInstance.addErField(entityNode, newField, 2);
```

**Removing a field:**

Use the `removeErField()` method to remove fields from an ER entity:

```javascript
let fieldToRemove = entityNode.shape.fields.find(
    field => field.id === 'customer_phone'
);

if (fieldToRemove) {
    diagramInstance.removeErField(entityNode, fieldToRemove);
}
```

**Track entity field changes:**

The `erEntityChanged` event is triggered when an ER entity or its fields are modified:

```javascript
erEntityChanged: (args) => {
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

## Styling ER Entities

Customize the appearance of ER entities using style properties. The node-level `style` property controls overall entity appearance, while individual field `style` values override applicable styles for specific field rows.

### Define Field Defaults

Use the `fieldDefaults` property to set default appearance for all fields:

| Property | Description |
|---|---|
| `alternateRowColors` | Array of 2 colors cycled across field rows (e.g., `['#ffffff', '#E7F0F7']`) |
| `height` | Default height of each field row in pixels |

**Example - Multi-entity styling with alternating colors:**

```javascript
shape: {
  type: 'Er',
  header: { annotation: { content: 'Customer' } },
  fields: [ /* ... */ ],
  fieldDefaults: {
    alternateRowColors: ['#ffffff', '#369eee'],
    height: 30
  }
}
```

**Styling priority:**
- Field-level styles override node-level and field default styles
- Use alternating row colors to improve readability
- Highlight primary keys with distinct colors
- Use consistent color schemes for related entities

## Creating ER Relationships

Relationships define how one ER entity is connected to another. Create relationships using ER connectors by setting the connector's shape `type` to `'Er'`.

| Property | Description |
|---|---|
| `type` | Set to `'Er'` to activate the ER connector shape. |
| `relationship` | Whether the relationship is identifying or non-identifying. |
| `sourceMultiplicity` | Crow's Foot symbol rendered at the source end. |
| `targetMultiplicity` | Crow's Foot symbol rendered at the target end. |

**Basic relationship example:**

```javascript
const customer = {
  id: 'Customer',
  offsetX: 250,
  offsetY: 100,
  shape: {
    type: 'Er',
    header: { annotation: { content: 'Customer' } },
    fields: [
      {
        id: 'customer_id',
        name: 'CustomerID',
        dataType: 'INT',
        isPrimaryKey: true
      }
    ]
  }
};

const order = {
  id: 'Order',
  offsetX: 400,
  offsetY: 250,
  shape: {
    type: 'Er',
    header: { annotation: { content: 'Order' } },
    fields: [
      {
        id: 'order_id',
        name: 'OrderID',
        dataType: 'INT',
        isPrimaryKey: true
      },
      {
        id: 'customer_id_fk',
        name: 'CustomerID',
        dataType: 'INT',
        isForeignKey: true
      }
    ]
  }
};

const relationship = {
  id: 'customer_order',
  sourceID: 'Customer',
  targetID: 'Order',
  shape: {
    type: 'Er',
    sourceMultiplicity: {
      type: 'One'
    },
    targetMultiplicity: {
      type: 'OneOrMany'
    }
  }
};
```

## Understanding Multiplicity

Multiplicity defines how many instances of one entity can be associated with instances of another entity. In ER diagrams, multiplicity is represented using Crow's Foot symbols at the source and target ends of a connector.

| Multiplicity Type | Meaning | Usage |
|---|---|---|
| **One** | Single participation marker | A customer has one primary account |
| **OneAndOnlyOne** | Mandatory exactly one | A user must have exactly one profile |
| **Many** | Multiple instances | A customer can have many orders |
| **ZeroOrOne** | Optional single instance | An employee may have zero or one manager badge |
| **OneOrMany** | At least one instance | A department must have one or more employees |
| **ZeroOrMany** | Optional multiple instances | A customer may have zero or more wish list items |

**Setting multiplicity:**

```javascript
const relationship = {
  id: 'customer_order',
  sourceID: 'Customer',
  targetID: 'Order',
  shape: {
    type: 'Er',
    sourceMultiplicity: {
      type: 'One'              // One customer
    },
    targetMultiplicity: {
      type: 'OneOrMany'        // Can have one or more orders
    }
  }
};
```

### Identifying vs Non-Identifying Relationships

```javascript
// Identifying relationship (solid line)
const identifyingRelation = {
  id: 'OrderLine',
  sourceID: 'Order',
  targetID: 'OrderDetail',
  shape: {
    type: 'Er',
    relationship: 'Identifying',

  },
  style: {
    strokeWidth: 2
  }
};

// Non-identifying relationship (dashed line)
const nonIdentifyingRelation = {
  id: 'OrderCustomer',
  sourceID: 'Customer',
  targetID: 'Order',
  shape: {
    type: 'Er',
    relationship: 'NonIdentifying',
  },
  style: {
    strokeDashArray: '5,5'
  }
};
```

---

## Complete Example: Customer-Order ERD

```vue
<template>
  <div id="app">
    <button v-on:click="enitityUpdate">Update Entity</button>
    <ejs-diagram id="diagram" ref="diagramObj" :width="width" :height="height" :nodes="nodes"
      :connectors="connectors" :erEntityChanged="erEntityChanged" ></ejs-diagram>
  </div>
</template>

<script>
import { provide, ref } from 'vue';
import { DiagramComponent, ErDiagrams } from '@syncfusion/ej2-vue-diagrams';

let diagramInstance;

const customer = {
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
      ],
      fieldDefaults: { alternateRowColors: ['#e23333', '#29e749'] },
    },
    style: { fill: '#ffffff', strokeColor: '#2E75B6', strokeWidth: 1 },
  };
  
  const order = {
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
      ],
      fieldDefaults: { alternateRowColors: ['#baee59', '#6bc3e6'] },
    },
    style: { fill: '#ffffff', strokeColor: '#7c3aed', strokeWidth: 1 },
  };
  
  const product = {
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
      ],
      fieldDefaults: { alternateRowColors: ['#ee74bb', '#e2d957'] },
    },
    style: { fill: '#ffffff', strokeColor: '#70AD47', strokeWidth: 1 },
  };
  
  const connectors = [
    {
      id: 'cust_order',
      sourceID: 'Customer',
      targetID: 'Order',
      shape: {
        type: 'Er',
        relationship: 'NonIdentifying',
        sourceMultiplicity: { type: 'One' },
        targetMultiplicity: { type: 'ZeroOrMany' },
      },
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
      },
      style: { strokeColor: '#70AD47', strokeWidth: 1.5 },
    },
  ];

export default {
  name: 'App',
  components: {
    'ejs-diagram': DiagramComponent,
  },
  data() {
    return {
      width: '100%',
      height: '600px',
      nodes: [customer, order, product],
      connectors: connectors,

      erEntityChanged: (args) => {
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
      },
    };
  },
  methods: {
    // Function to handle the print button click
    enitityUpdate() {
      let entityNode = diagramInstance.nodes[0];
      let newField = {
        id: 'customer_phone',
        name: 'Phone',
        dataType: 'VARCHAR(20)',
      };

      // Add field at the end
      diagramInstance.addErField(entityNode, newField);

      // Add field at a specific position (index 2)
      diagramInstance.addErField(entityNode, newField, 2);

      let fieldToRemove = entityNode.shape.fields.find(
        (field) => field.id === 'cust_email'
      );

      if (fieldToRemove) {
        diagramInstance.removeErField(entityNode, fieldToRemove);
      }
    },
  },
  mounted: function () {
    diagramInstance = this.$refs.diagramObj.ej2Instances;
  },
  provide: {
    diagram: [ErDiagrams],
  },
};
</script>
<style>
  @import "../node_modules/@syncfusion/ej2-tailwind3-theme/styles/diagram/index.css";
</style>
```
