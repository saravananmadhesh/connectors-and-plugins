# Chips - API (TypeScript)

## Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `chips` | `ChipItemModel[]` | `[]` | Collection of chips to display |
| `selectionMode` | `ChipsSelectionMode` | `'Single'` | Selection mode: None, Single, Multiple |
| `enableDelete` | `boolean` | `true` | Enable chip deletion |
| `cssClass` | `string` | `''` | CSS class for customization |
| `visible` | `boolean` | `true` | Show/hide chip |
| `enabled` | `boolean` | `true` | Enable/disable chip |

## ChipItemModel Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `text` | `string` | - | Display text for chip |
| `selected` | `boolean` | `false` | Pre-selected state |
| `leadingIconCss` | `string` | `''` | CSS class for leading icon |
| `trailingIconCss` | `string` | `''` | CSS class for trailing icon |
| `avatarText` | `string` | `''` | Avatar text initials |
| `avatarUrl` | `string` | `''` | Avatar image URL |
| `cssClass` | `string` | `''` | Custom CSS class |

## Methods

### Create ChipList
```typescript
import { ChipList } from '@syncfusion/ej2-buttons';

const chipList: ChipList = new ChipList({
  chips: [
    { text: 'Angular' },
    { text: 'React' }
  ]
});
chipList.appendTo('#chips');
```

### Add Chip
```typescript
// Add single chip
chipList.chips.push({ text: 'Vue' });
chipList.refresh();

// Add multiple chips
chipList.chips.push(
  { text: 'Svelte' },
  { text: 'Ember' }
);
chipList.refresh();
```

### Remove Chip
```typescript
// Remove by index
chipList.chips.splice(0, 1);
chipList.refresh();

// Remove by text
const index = chipList.chips.findIndex(c => c.text === 'React');
if (index > -1) {
  chipList.chips.splice(index, 1);
  chipList.refresh();
}
```

### Update Chip
```typescript
// Update chip text
chipList.chips[0].text = 'Updated Text';
chipList.refresh();

// Update chip properties
chipList.chips[0].selected = true;
chipList.chips[0].cssClass = 'e-primary';
chipList.refresh();
```

### Get Selected Chips
```typescript
function getSelectedChips(): ChipItemModel[] {
  return chipList.chips.filter(chip => chip.selected);
}

const selected = getSelectedChips();
console.log('Selected chips:', selected.map(c => c.text));
```

### Clear All Chips
```typescript
chipList.chips = [];
chipList.refresh();
```

### Refresh
```typescript
// Refresh to apply changes
chipList.refresh();
```

## Events

### Selection Changed
```typescript
import { ChipList, ChipSelectEventArgs } from '@syncfusion/ej2-buttons';

const chipList: ChipList = new ChipList({
  chips: [
    { text: 'Option 1' },
    { text: 'Option 2' }
  ],
  select: (args: ChipSelectEventArgs): void => {
    console.log('Selected:', args.data.text);
  }
});
chipList.appendTo('#chips');
```

### Delete Event
```typescript
import { ChipList, ChipDeleteEventArgs } from '@syncfusion/ej2-buttons';

const chipList: ChipList = new ChipList({
  chips: [
    { text: 'Delete me' }
  ],
  delete: (args: ChipDeleteEventArgs): void => {
    console.log('Deleted:', args.data.text);
    args.cancel = false; // Allow deletion
  }
});
chipList.appendTo('#chips');
```

### Before Delete
```typescript
import { ChipList } from '@syncfusion/ej2-buttons';

const chipList: ChipList = new ChipList({
  chips: [
    { text: 'Important Chip' }
  ]
});
chipList.appendTo('#chips');

// Listen to before delete
chipList.element.addEventListener('delete', (event: any): void => {
  if (confirm('Are you sure?')) {
    // Allow deletion
  } else {
    event.preventDefault();
  }
});
```

## Event Arguments

### ChipSelectEventArgs
```typescript
interface ChipSelectEventArgs {
  data: ChipItemModel;
  index: number;
  cancel: boolean;
}
```

### ChipDeleteEventArgs
```typescript
interface ChipDeleteEventArgs {
  data: ChipItemModel;
  index: number;
  cancel: boolean;
}
```

## Complete API Example

```typescript
import { ChipList, ChipSelectEventArgs, ChipDeleteEventArgs } from '@syncfusion/ej2-buttons';

class ChipManager {
  private chipList: ChipList;
  
  constructor() {
    this.chipList = new ChipList({
      chips: [
        { text: 'Angular', selected: true },
        { text: 'React' },
        { text: 'Vue' }
      ],
      selectionMode: 'Multiple',
      enableDelete: true,
      select: (args: ChipSelectEventArgs): void => {
        this.onSelect(args);
      },
      delete: (args: ChipDeleteEventArgs): void => {
        this.onDelete(args);
      }
    });
    this.chipList.appendTo('#chips');
  }
  
  private onSelect(args: ChipSelectEventArgs): void {
    console.log('Selected:', args.data.text);
  }
  
  private onDelete(args: ChipDeleteEventArgs): void {
    console.log('Deleted:', args.data.text);
  }
  
  getSelected(): string[] {
    return this.chipList.chips
      .filter(c => c.selected)
      .map(c => c.text);
  }
  
  addChip(text: string): void {
    this.chipList.chips.push({ text });
    this.chipList.refresh();
  }
  
  removeChip(text: string): void {
    const index = this.chipList.chips.findIndex(c => c.text === text);
    if (index > -1) {
      this.chipList.chips.splice(index, 1);
      this.chipList.refresh();
    }
  }
  
  clear(): void {
    this.chipList.chips = [];
    this.chipList.refresh();
  }
}

// Usage
const manager = new ChipManager();
manager.addChip('Ember');
console.log('Selected:', manager.getSelected());
```
