# Symbol Palette

## Overview

**Symbol Palette** provides a draggable library of shapes that users can drag into the diagram.

---

## Symbol Palette Setup

### Component Template

```typescript
import { SymbolPaletteComponent } from '@syncfusion/ej2-angular-diagrams';

@Component({
  selector: 'app-palette',
  template: `
    <ejs-symbolpalette #symbolpalette
      [symbolWidth]="75"
      [symbolHeight]="75"
      [palettes]="palettes">
    </ejs-symbolpalette>
  `
})
export class PaletteComponent {
  palettes = [];
}
```

---

## Defining Palette Symbols

### Basic Symbol Definition

```typescript
palettes = [
  {
    id: 'flowchart',
    title: 'Flowchart',
    symbols: [
      {
        id: 'process',
        shape: { type: 'Flow', shape: 'Process' },
        width: 60,
        height: 60,
        annotations: [{ content: 'Process' }]
      },
      {
        id: 'decision',
        shape: { type: 'Flow', shape: 'Decision' },
        width: 60,
        height: 60,
        annotations: [{ content: 'Decision' }]
      }
    ]
  },
  {
    id: 'basic',
    title: 'Basic Shapes',
    symbols: [
      {
        id: 'rectangle',
        shape: { type: 'Basic', shape: 'Rectangle' },
        width: 60,
        height: 60
      },
      {
        id: 'circle',
        shape: { type: 'Basic', shape: 'Ellipse' },
        width: 60,
        height: 60
      }
    ]
  }
];
```

### Symbol Categories

```typescript
palettes = [
  {
    id: 'category1',
    title: 'Category 1',
    expanded: true,           // Initially expanded
    symbols: [...]
  },
  {
    id: 'category2',
    title: 'Category 2',
    expanded: false,          // Initially collapsed
    symbols: [...]
  }
];
```

---

## Drag and Drop

### Drag Symbols to Diagram

```html
<div style="display:flex">
  <!-- Palette on left -->
  <ejs-symbolpalette #palette 
    [palettes]="palettes">
  </ejs-symbolpalette>
  
  <!-- Diagram on right -->
  <ejs-diagram #diagram 
    [nodes]="nodes">
  </ejs-diagram>
</div>
```

### Drag Event Handling

```typescript
diagram.dragEnter((args) => {
  if (args.source instanceof SymbolPalette) {
    console.log('Symbol dragging into diagram:', args.element);
  }
});

diagram.drop((args) => {
  console.log('Dropped at:', args.position);
  console.log('Dropped symbol:', args.element);
});
```

---

## Palette Customization

### Symbol Appearance

```typescript
{
  id: 'process',
  shape: { type: 'Flow', shape: 'Process' },
  width: 80,
  height: 60,
  style: {
    fill: '#90EE90',
    strokeColor: '#228B22'
  },
  annotations: [
    {
      content: 'Process',
      style: { fontSize: 12 }
    }
  ]
}
```

### Icons and Images

```typescript
{
  id: 'icon',
  shape: {
    type: 'Image',
    source: 'assets/process-icon.png'
  },
  width: 60,
  height: 60
}
```

### Size Configuration

```typescript
<ejs-symbolpalette
  [symbolWidth]="100"
  [symbolHeight]="100"
  [symbolMargin]="{ left: 5, right: 5, top: 5, bottom: 5 }">
</ejs-symbolpalette>
```

---

## Search Functionality

### Enable Search

```typescript
<ejs-symbolpalette 
  [palettes]="palettes"
  [enableSearch]="true">
</ejs-symbolpalette>
```

### Search Filter

```typescript
// Filter symbols by name or content
const filterSymbols = (searchText: string) => {
  this.palettes.forEach(palette => {
    palette.symbols = palette.symbols.filter(s => 
      s.id.includes(searchText) || 
      s.annotations?.[0]?.content?.includes(searchText)
    );
  });
};
```

---

## Palette Events

### Selection Changed

```typescript
palette.selectionChange((args) => {
  console.log('Selected symbol:', args.selectedSymbol);
});
```

### Drag Started

```typescript
diagram.dragEnter((args) => {
  if (args.source instanceof Symbol) {
    console.log('Symbol drag started');
  }
});
```

---

## Creating Custom Symbol Libraries

### Dynamic Symbol Library

```typescript
const createCustomPalette = (customShapes: any[]) => {
  return {
    id: 'custom',
    title: 'Custom Symbols',
    symbols: customShapes.map((shape, index) => ({
      id: `custom_${index}`,
      shape: shape,
      width: 60,
      height: 60
    }))
  };
};

// Use it
this.palettes.push(createCustomPalette(myCustomShapes));
```

### Symbol from Data

```typescript
const dataSource = [
  { name: 'Shape1', type: 'Basic' },
  { name: 'Shape2', type: 'Flow' }
];

const symbols = dataSource.map(item => ({
  id: item.name,
  shape: { type: item.type, shape: 'Process' },
  annotations: [{ content: item.name }]
}));
```

---

**→ Next: Bind data to diagrams with [data binding](data-binding.md)**
