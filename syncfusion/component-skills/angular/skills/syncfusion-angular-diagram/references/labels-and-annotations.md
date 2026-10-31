# Labels and Annotations

## Table of Contents
- [Overview](#overview)
- [Adding Annotations](#adding-annotations)
- [Label Appearance](#label-appearance)
- [Node vs Connector Labels](#node-vs-connector-labels)
- [Label Positioning](#label-positioning)
- [Label Interaction](#label-interaction)
- [Label Events](#label-events)
- [Formatting Labels](#formatting-labels)

## Overview

**Annotations** (labels) are text elements added to nodes and connectors to provide context and information.

### Key Properties

```typescript
interface Annotation {
  content: string;                // Text content
  offset?: number;               // Position (0-1 on connector, or point)
  horizontalAlignment?: 'Left' | 'Center' | 'Right';
  verticalAlignment?: 'Top' | 'Center' | 'Bottom';
  style?: AnnotationStyle;       // Font, color, size
  margin?: Margin;               // Spacing
  rotateAngle?: number;          // Rotation in degrees
  width?: number;                // Width in pixels
  height?: number;               // Height in pixels
}
```

## Adding Annotations

### Node Annotations

```typescript
{
  id: 'node1',
  offsetX: 150,
  offsetY: 150,
  width: 100,
  height: 100,
  annotations: [
    {
      content: 'Process',
      style: { fontSize: 14, color: 'black', bold: true }
    }
  ]
}
```

### Connector Annotations

```typescript
{
  id: 'connector1',
  sourceID: 'node1',
  targetID: 'node2',
  annotations: [
    {
      content: 'Approves',
      offset: 0.5  // Middle of connector
    }
  ]
}
```

### Multiple Annotations

```typescript
{
  id: 'node1',
  annotations: [
    {
      content: 'Primary Label',
      offset: { x: 0.5, y: 0.3 }
    },
    {
      content: 'Secondary Label',
      offset: { x: 0.5, y: 0.7 },
      style: { fontSize: 10, fill: '#999999' }
    }
  ]
}
```

---

## Label Appearance

### Font Styling

```typescript
annotations: [
  {
    content: 'Styled Text',
    style: {
      fontSize: 14,           // Points
      fontFamily: 'Arial',    // Font name
      bold: true,
      italic: false,
      fill: '#000000',        // Text color
      textDecoration: 'Underline',  // None, Underline, Overline, LineThrough
      textWrapping: 'Wrap'    // Wrap, WrapWithOverflow, NoWrap
    }
  }
]
```

### Alignment

```typescript
annotations: [
  {
    content: 'Left Aligned',
    horizontalAlignment: 'Left',
    verticalAlignment: 'Top'
  },
  {
    content: 'Center Aligned',
    horizontalAlignment: 'Center',
    verticalAlignment: 'Center'
  }
]
```

### Background and Border

```typescript
annotations: [
  {
    content: 'Boxed Label',
    style: {
      fill: '#FFFF00',        // Background color
      color: '#000000'
    },
    margin: {
      top: 10,
      bottom: 10,
      left: 10,
      right: 10
    }
  }
]
```

### Rotation

```typescript
annotations: [
  {
    content: 'Rotated 45°',
    rotateAngle: 45
  }
]
```

---

## Node vs Connector Labels

### Node Labels

Labels on **nodes** are centered within the node shape:

```typescript
{
  id: 'node1',
  offsetX: 150,
  offsetY: 150,
  width: 100,
  height: 100,
  annotations: [
    {
      content: 'Process',
      offset: { x: 0.5, y: 0.5 }  // Center of node
    }
  ]
}
```

### Connector Labels

Labels on **connectors** use `offset` (0-1 position along connector):

```typescript
{
  id: 'connector1',
  sourceID: 'node1',
  targetID: 'node2',
  annotations: [
    {
      content: 'Approves',
      offset: 0.5    // Middle (0.5 = center, 0 = source, 1 = target)
    }
  ]
}
```

### Label Offset Values

```typescript
offset: 0.0   // At connector start (source)
offset: 0.25  // 1/4 way along
offset: 0.5   // Middle (center)
offset: 0.75  // 3/4 way along
offset: 1.0   // At connector end (target)
```

---

## Label Positioning

### Relative to Node

```typescript
{
  id: 'node1',
  annotations: [
    {
      content: 'Top',
      offset: { x: 0.5, y: 0 }      // Top of node
    },
    {
      content: 'Bottom',
      offset: { x: 0.5, y: 1 }      // Bottom of node
    },
    {
      content: 'Left',
      offset: { x: 0, y: 0.5 }      // Left side
    }
  ]
}
```

### Margin from Node

```typescript
annotations: [
  {
    content: 'Outward',
    margin: {
      top: 20,
      right: 20,
      bottom: 20,
      left: 20
    }
  }
]
```

---

## Label Interaction

### Editable Labels

```typescript
// Enable editing on specific annotations
annotations: [
  {
    content: 'Editable',
    constraints: AnnotationConstraints.Interaction
  }
]
```
### Prevent Editing

```typescript
annotations: [
  {
    content: 'Read-only',
    constraints: AnnotationConstraints.ReadOnly  // Disable editing
  }
]
```

### Draggable Labels

```typescript
annotations: [
  {
    content: 'Draggable',
    constraints: AnnotationConstraints.Draggable | AnnotationConstraints.Editable
  }
]
```

---

## Label Events

### Label Edit Completed

```typescript
template: `<ejs-diagram #diagram id="diagram" width="100%" height="580px" (textEdit)="textEdit($event)">
        <e-nodes>
            <e-node id='node1' [offsetX]=150 [offsetY]=150 [width]=100 [height]=100>
                <e-node-annotations>
                    <e-node-annotation id="label1" content="Annotation">
                    </e-node-annotation>
                </e-node-annotations>
            </e-node>
        </e-nodes>
    </ejs-diagram>`
public onTextEdit(args: ITextEditEventArgs): void {
  // Fires after editing is committed
  // args.oldValue / args.newValue contain the label text before/after edit.
  // Example:
  // console.log('Old:', args.oldValue, 'New:', args.newValue);
}
```

### Label Double Click

```typescript
template: `<ejs-diagram #diagram id="diagram" width="100%" height="580px" (doubleClick)="doubleClick($event)">
        <e-nodes>
            <e-node id='node1' [offsetX]=150 [offsetY]=150 [width]=100 [height]=100>
                <e-node-annotations>
                    <e-node-annotation id="label1" content="Annotation">
                    </e-node-annotation>
                </e-node-annotations>
            </e-node>
        </e-nodes>
    </ejs-diagram>`

public doubleClick(args: IDoubleClickEventArgs): void {
    // Handle double-click event for custom logic
}
```

---

## Formatting Labels

### HTML Content

```typescript
const nodes: NodeModel[] = [
  {
      id: 'node1', offsetX: 150, offsetY: 150, width:100, height:100,
      annotations: [{ id:"label1", template:'<div><input type="button" value="Submit"></div>' }],
  }
]
```

### Multi-line Text

```typescript
annotations: [
  {
    content: 'Line 1\nLine 2\nLine 3',
    style: { textWrapping: 'Wrap' },
    width: 100,
    height: 60
  }
]
```

### Dynamic Content

```typescript
// Update label at runtime
diagram.connectors[0].annotations[0].content = 'New Label';
diagram.dataBind();
```

### Conditional Labels

```typescript
getConnectorDefaults = (connector: ConnectorModel): ConnectorModel => {
  const isDecision = connector.targetID.includes('decision');

  return {
    ...connector,
    annotations: [
      {
        content: isDecision ? 'Yes / No' : 'Next',
        offset: 0.5,
        style: {
          fontSize: isDecision ? 12 : 10
        }
      }
    ]
  };
};
```

---

**→ Next: Configure [ports](ports.md) for connection points on nodes**
