# Groups and Containers

## Overview

**Groups** and **Containers** organize multiple nodes together, allowing them to be moved and styled as a single unit.

### Group vs Container

| Feature | Group | Container |
|---------|-------|-----------|
| **Visual** | No visible border | Has visible border/padding |
| **Children** | Multiple nodes | Multiple nodes |
| **Layout** | Manual positioning | Can control child layout |
| **Nesting** | Yes | Yes |

---

## Creating Groups

### Grouping Nodes

```typescript
// Create group by setting parentId
nodes = [
  {
      id: 'rectangle1',
      offsetX: 100,
      offsetY: 100,
      width: 100,
      height: 100,
    },
    {
      id: 'rectangle2',
      offsetX: 200,
      offsetY: 200,
      width: 100,
      height: 100,
    },
    {
      id: 'group',
      children: ['rectangle1', 'rectangle2'],
    },
];
```

### Programmatic Grouping

```typescript
// Select all the elements
diagram.selectAll();

// Groups the selected nodes and connectors in the diagram.
diagram.group();
```

---

## Group Operations

### Add Children to Group

```typescript
// Add child to the group node
diagram.addChildToGroup(groupNode, childNode);
```

### Remove from Group

```typescript
// Remove child from the group node
diagram.removeChildFromGroup (groupNode, childNode);
```

### Get Group Children

```typescript
const group = diagram.nodes.find(n => n.id === 'group1');
const children = group.children;
```

---

## Container Nodes

### Create Container

```typescript
{
  id: 'container1',
  offsetX: 250,
  offsetY: 250,
  width: 400,
  height: 300,
  shape: {
    type: 'Container',
    children: [] // or actual children ids
  },
  style: {
    fill: '#F0F0F0',
    strokeColor: '#999999',
    strokeWidth: 2
  }
}
```

### Add Children to Container

```typescript
// 1) Define child nodes first
const nodes = [
  {
    id: 'node1',
    offsetX: 200, offsetY: 200, width: 100, height: 60
  },
  {
    id: 'node2',
    offsetX: 320, offsetY: 280, width: 100, height: 60
  },

  // 2) Define the container and list child IDs
  {
    id: 'container1',
    offsetX: 260,
    offsetY: 240,
    width: 300,
    height: 220,
    shape: {
      type: 'Container',
      children: ['node1', 'node2']
    },
    padding: { left: 10, top: 10, right: 10, bottom: 10 }
  }
];
```

## Styling Groups and Containers

### Group Border (Container)

```typescript
{
  id: 'group1',
  offsetX: 300,
  offsetY: 250,
  width: 420,
  height: 300,
  style: {
    fill: 'transparent',
    strokeColor: '#999999',
    strokeWidth: 2,
    dashArray: '5,5'  // Dashed border
  }
}
```

### Shadow and Effects

```typescript
{
  id: 'container1',
  style: {
    fill: '#F0F0F0',
    shadow: {
      angle: 45,
      blur: 10,
      color: 'rgba(0,0,0,0.2)',
      distance: 3
    }
  }
}
```

---

**→ Next: Create reusable symbols with [symbol palette](symbol-palette.md)**
