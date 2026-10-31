# Chips - Drag and Drop (TypeScript)

## Enable Drag and Drop

### Basic Drag and Drop
```typescript
import { ChipList } from '@syncfusion/ej2-buttons';

const draggableChips: ChipList = new ChipList({
  chips: [
    { text: 'Chip 1', leadingIconCss: 'e-icons e-drag' },
    { text: 'Chip 2', leadingIconCss: 'e-icons e-drag' },
    { text: 'Chip 3', leadingIconCss: 'e-icons e-drag' }
  ],
  enableDelete: true
});
draggableChips.appendTo('#chips');

// Enable drag and drop via CSS
const style = document.createElement('style');
style.textContent = `
  .e-chip {
    cursor: grab;
  }
  .e-chip.e-dragging {
    opacity: 0.6;
  }
`;
document.head.appendChild(style);
```

## Drag and Drop Events

### Drag Event Handling
```typescript
import { ChipList } from '@syncfusion/ej2-buttons';

const chipList: ChipList = new ChipList({
  chips: [
    { text: 'Item 1' },
    { text: 'Item 2' },
    { text: 'Item 3' },
    { text: 'Item 4' }
  ]
});
chipList.appendTo('#chips');

const chipElements = chipList.element.querySelectorAll('.e-chip');

chipElements.forEach((chip: Element): void => {
  (chip as HTMLElement).draggable = true;
  
  (chip as HTMLElement).addEventListener('dragstart', (e: DragEvent): void => {
    (e.dataTransfer as DataTransfer).effectAllowed = 'move';
    console.log('Drag started:', chip.textContent);
  });
  
  (chip as HTMLElement).addEventListener('dragend', (e: DragEvent): void => {
    console.log('Drag ended:', chip.textContent);
  });
});
```

## Drag Between Containers

### Multiple Sortable Lists
```typescript
import { ChipList } from '@syncfusion/ej2-buttons';

// Source chips
const sourceChips: ChipList = new ChipList({
  chips: [
    { text: 'Available 1' },
    { text: 'Available 2' },
    { text: 'Available 3' }
  ]
});
sourceChips.appendTo('#source');

// Target chips (initially empty)
const targetChips: ChipList = new ChipList({
  chips: []
});
targetChips.appendTo('#target');

// Setup drag and drop between containers
setupDragDrop(sourceChips, targetChips);

function setupDragDrop(source: ChipList, target: ChipList): void {
  const sourceElements = source.element.querySelectorAll('.e-chip');
  const targetContainer = target.element;
  
  sourceElements.forEach((chip: Element): void => {
    (chip as HTMLElement).draggable = true;
    
    (chip as HTMLElement).addEventListener('dragstart', (e: DragEvent): void => {
      (e.dataTransfer as DataTransfer).setData('text/html', (e.target as HTMLElement).innerHTML);
      (e.target as HTMLElement).style.opacity = '0.5';
    });
    
    (chip as HTMLElement).addEventListener('dragend', (e: DragEvent): void => {
      (e.target as HTMLElement).style.opacity = '1';
    });
  });
  
  (targetContainer as HTMLElement).addEventListener('dragover', (e: DragEvent): void => {
    e.preventDefault();
    (targetContainer as HTMLElement).style.background = '#f0f0f0';
  });
  
  (targetContainer as HTMLElement).addEventListener('dragleave', (): void => {
    (targetContainer as HTMLElement).style.background = '';
  });
  
  (targetContainer as HTMLElement).addEventListener('drop', (e: DragEvent): void => {
    e.preventDefault();
    const html = (e.dataTransfer as DataTransfer).getData('text/html');
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = html;
    const text = tempDiv.textContent || '';
    
    // Remove from source and add to target
    const chipIndex = source.chips.findIndex(c => c.text === text);
    if (chipIndex > -1) {
      const [removed] = source.chips.splice(chipIndex, 1);
      target.chips.push(removed);
      source.refresh();
      target.refresh();
    }
    
    (targetContainer as HTMLElement).style.background = '';
  });
}
```

## Reorder Chips

### Sortable Chips
```typescript
import { ChipList } from '@syncfusion/ej2-buttons';

const sortableChips: ChipList = new ChipList({
  chips: [
    { text: 'First' },
    { text: 'Second' },
    { text: 'Third' },
    { text: 'Fourth' }
  ]
});
sortableChips.appendTo('#chips');

let draggedElement: Element | null = null;

const chips = sortableChips.element.querySelectorAll('.e-chip');
chips.forEach((chip: Element, index: number): void => {
  (chip as HTMLElement).draggable = true;
  (chip as HTMLElement).setAttribute('data-index', index.toString());
  
  (chip as HTMLElement).addEventListener('dragstart', (e: DragEvent): void => {
    draggedElement = chip;
    (chip as HTMLElement).style.opacity = '0.5';
  });
  
  (chip as HTMLElement).addEventListener('dragend', (): void => {
    if (draggedElement) {
      (draggedElement as HTMLElement).style.opacity = '1';
    }
  });
  
  (chip as HTMLElement).addEventListener('dragover', (e: DragEvent): void => {
    e.preventDefault();
    if (draggedElement && draggedElement !== chip) {
      const draggedIndex = parseInt((draggedElement as HTMLElement).getAttribute('data-index') || '0');
      const targetIndex = parseInt((chip as HTMLElement).getAttribute('data-index') || '0');
      
      if (draggedIndex !== -1 && targetIndex !== -1) {
        const temp = sortableChips.chips[draggedIndex];
        sortableChips.chips[draggedIndex] = sortableChips.chips[targetIndex];
        sortableChips.chips[targetIndex] = temp;
        sortableChips.refresh();
      }
    }
  });
});
```

## Complete Drag Example

```typescript
import { ChipList } from '@syncfusion/ej2-buttons';

class DragDropChipManager {
  sourceChips: ChipList;
  targetChips: ChipList;
  
  constructor(sourceId: string, targetId: string) {
    this.sourceChips = new ChipList({
      chips: [
        { text: 'React' },
        { text: 'Angular' },
        { text: 'Vue' }
      ]
    });
    this.sourceChips.appendTo(`#${sourceId}`);
    
    this.targetChips = new ChipList({
      chips: []
    });
    this.targetChips.appendTo(`#${targetId}`);
    
    this.initDragDrop();
  }
  
  private initDragDrop(): void {
    // Implementation for drag-drop setup
    console.log('Drag and drop initialized');
  }
}

// Usage
new DragDropChipManager('source', 'target');
```
