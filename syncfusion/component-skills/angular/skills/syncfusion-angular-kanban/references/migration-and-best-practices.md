# Migration and Best Practices for Angular Kanban

## Table of Contents
- [EJ1 to EJ2 Migration](#ej1-to-ej2-migration)
- [Performance Optimization](#performance-optimization)
- [Virtual Scrolling](#virtual-scrolling)
- [Common Patterns](#common-patterns)
- [Best Practices](#best-practices)
- [Troubleshooting](#troubleshooting)

## EJ1 to EJ2 Migration

### Breaking Changes

| EJ1 | EJ2 | Migration Path |
|-----|-----|-----------------|
| jQuery plugin | Angular component | Use `<ejs-kanban>` selector |
| `dataSource` | `[dataSource]` | Bind property with `[]` |
| `cardSettings` | `[cardSettings]` | Use cardSettings model |
| Events suffix: `Begin`, `End` | `actionBegin`, `actionComplete` | Rename events |
| Properties: camelCase | Property binding `[]` | Use Angular bindings |
| DOM methods | EJ2 methods | Use component ref methods |

### EJ1 Code

```typescript
// EJ1 - jQuery
$('#kanban').ejKanban({
  dataSource: kanbanData,
  keyField: 'Status',
  cardSettings: {
    headerField: 'Id',
    contentField: 'Summary'
  },
  cardRendered: function(args) {
    console.log('Card rendered');
  }
});
```

### EJ2 Code

```typescript
// EJ2 - Angular
import { Component, ViewChild } from '@angular/core';
import { KanbanComponent, KanbanModule, CardSettingsModel } from '@syncfusion/ej2-angular-kanban';

@Component({
  selector: 'app-kanban',
  standalone: true,
  imports: [KanbanModule],
  template: `
    <ejs-kanban
      #kanban
      keyField="Status"
      [dataSource]="kanbanData"
      [cardSettings]="cardSettings"
      (cardRendered)="onCardRendered($event)">
      <e-columns>
        <e-column headerText="To Do" keyField="Open"></e-column>
        <e-column headerText="Done" keyField="Close"></e-column>
      </e-columns>
    </ejs-kanban>
  `
})
export class KanbanComponent {
  @ViewChild('kanban') kanban: KanbanComponent;

  kanbanData = [];
  cardSettings: CardSettingsModel = {
    headerField: 'Id',
    contentField: 'Summary'
  };

  onCardRendered(args: any): void {
    console.log('Card rendered');
  }
}
```

### Migration Steps

1. **Remove jQuery dependency**
   ```bash
   npm uninstall jquery
   npm install @syncfusion/ej2-angular-kanban
   ```

2. **Update component import**
   ```typescript
   import { KanbanModule } from '@syncfusion/ej2-angular-kanban';
   ```

3. **Convert template to Angular syntax**
   - Replace jQuery selectors with component refs
   - Use property binding `[prop]="value"`
   - Use event binding `(event)="handler()"`

4. **Update API calls**
   ```typescript
   // EJ1
   $('#kanban').ejKanban('addCard', cardData);

   // EJ2
   this.kanban.addCard(cardData);
   ```

5. **Test thoroughly**
   - Verify all features work
   - Test drag-and-drop
   - Validate data binding
   - Check events

## Performance Optimization

### 1. Lazy Loading Data

```typescript
@Component({
  selector: 'app-kanban-lazy',
  standalone: true,
  imports: [KanbanModule],
  template: `
    <ejs-kanban
      #kanban
      keyField="Status"
      [dataSource]="data">
    </ejs-kanban>
  `
})
export class KanbanLazyComponent implements OnInit {
  @ViewChild('kanban') kanban: KanbanComponent;
  data: any[] = [];

  ngOnInit(): void {
    this.loadInitialData();
  }

  loadInitialData(): void {
    // Load first 100 cards
    this.api.getCards(0, 100).subscribe(cards => {
      this.data = cards;
    });
  }

  onScroll(event: any): void {
    // Load more when scrolling near bottom
    if (event.scrollTop > event.scrollHeight - 500) {
      this.loadMoreData();
    }
  }

  loadMoreData(): void {
    this.api.getCards(this.data.length, 100).subscribe(cards => {
      this.data = [...this.data, ...cards];
    });
  }
}
```

### 2. Optimize Change Detection

```typescript
import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-kanban-optimized',
  standalone: true,
  imports: [KanbanModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `<ejs-kanban [dataSource]="data"></ejs-kanban>`
})
export class KanbanOptimizedComponent {
  data = [];

  constructor(private cdr: ChangeDetectorRef) {}

  updateData(newData: any[]): void {
    this.data = newData;
    this.cdr.markForCheck();  // Manually trigger change detection
  }
}
```

### 3. Debounce Event Handlers

```typescript
import { Component } from '@angular/core';
import { debounceTime, Subject } from 'rxjs';

@Component({
  selector: 'app-kanban-debounce',
  standalone: true,
  template: `<ejs-kanban (dragStop)="onDragStop($event)"></ejs-kanban>`
})
export class KanbanDebounceComponent {
  private dragStopSubject = new Subject<any>();

  constructor() {
    this.dragStopSubject.pipe(debounceTime(500)).subscribe(args => {
      this.saveCardStatus(args);
    });
  }

  onDragStop(args: any): void {
    this.dragStopSubject.next(args);  // Debounced save
  }

  private saveCardStatus(args: any): void {
    console.log('Saving card after drag');
    // API call here
  }
}
```

## Virtual Scrolling

Enable virtual scrolling for large datasets (1000+ cards):

```typescript
import { Component } from '@angular/core';
import { KanbanModule } from '@syncfusion/ej2-angular-kanban';

@Component({
  selector: 'app-kanban-virtual',
  standalone: true,
  imports: [KanbanModule],
  template: `
    <ejs-kanban
      keyField="Status"
      [dataSource]="largeDataset"
      [allowVirtualization]="true"
      height="600px">
      <e-columns>
        <e-column headerText="To Do" keyField="Open"></e-column>
        <e-column headerText="In Progress" keyField="InProgress"></e-column>
      </e-columns>
    </ejs-kanban>
  `
})
export class KanbanVirtualComponent {
  largeDataset = this.generateLargeDataset();

  private generateLargeDataset(): any[] {
    const dataset = [];
    for (let i = 1; i <= 5000; i++) {
      dataset.push({
        Id: i,
        Status: ['Open', 'InProgress', 'Testing', 'Close'][i % 4],
        Summary: `Task ${i}`,
        Priority: ['High', 'Medium', 'Low'][i % 3]
      });
    }
    return dataset;
  }
}
```

## Common Patterns

### Pattern 1: Master-Detail View

```typescript
@Component({
  selector: 'app-kanban-master-detail',
  standalone: true,
  template: `
    <div style="display: flex;">
      <div style="flex: 1;">
        <ejs-kanban
          (cardClick)="selectCard($event)">
        </ejs-kanban>
      </div>
      <div style="flex: 1; padding: 20px; border-left: 1px solid #ddd;">
        <div *ngIf="selectedCard">
          <h3>{{ selectedCard.Id }}</h3>
          <p>{{ selectedCard.Summary }}</p>
          <p>Status: {{ selectedCard.Status }}</p>
          <p>Priority: {{ selectedCard.Priority }}</p>
        </div>
      </div>
    </div>
  `
})
export class KanbanMasterDetailComponent {
  selectedCard: any;

  selectCard(args: any): void {
    this.selectedCard = args.data;
  }
}
```

### Pattern 2: Real-time Collaboration

```typescript
@Component({
  selector: 'app-kanban-collab',
  standalone: true,
  template: `<ejs-kanban (dragStop)="onDragStop($event)"></ejs-kanban>`
})
export class KanbanCollabComponent {
  constructor(private websocket: WebSocketService) {
    // Listen for remote updates
    this.websocket.on('cardMoved', (data) => {
      this.updateCardRemotely(data);
    });
  }

  onDragStop(args: any): void {
    // Broadcast card movement to other users
    this.websocket.emit('cardMoved', {
      cardId: args.data.Id,
      newStatus: args.data.Status,
      user: this.currentUser
    });
  }

  updateCardRemotely(data: any): void {
    // Update UI when another user moves card
    console.log(`${data.user} moved card ${data.cardId}`);
  }
}
```

### Pattern 3: Undo/Redo

```typescript
class UndoRedoManager {
  private history: BoardState[] = [];
  private historyIndex = -1;

  recordState(state: BoardState): void {
    this.history.splice(this.historyIndex + 1);
    this.history.push(state);
    this.historyIndex++;
  }

  undo(): BoardState | null {
    if (this.historyIndex > 0) {
      return this.history[--this.historyIndex];
    }
    return null;
  }

  redo(): BoardState | null {
    if (this.historyIndex < this.history.length - 1) {
      return this.history[++this.historyIndex];
    }
    return null;
  }
}

interface BoardState {
  timestamp: Date;
  data: any[];
  action: string;
}
```

## Best Practices

### 1. **Use OnPush Change Detection**
```typescript
@Component({
  changeDetection: ChangeDetectionStrategy.OnPush
})
```

### 2. **Track Changes with TrackBy**
```typescript
trackByCardId(index: number, card: any): any {
  return card.Id;
}
```

### 3. **Unsubscribe in ngOnDestroy**
```typescript
ngOnDestroy(): void {
  this.subscription?.unsubscribe();
}
```

### 4. **Validate Data Before Updates**
```typescript
updateCard(card: any): void {
  if (this.isValidCard(card)) {
    this.kanban.updateCard(card);
  }
}
```

### 5. **Handle Errors Gracefully**
```typescript
addCard(card: any): void {
  this.api.addCard(card).subscribe(
    () => this.kanban.addCard(card),
    (error) => console.error('Failed to add card:', error)
  );
}
```

### 6. **Use Async Pipe**
```typescript
<ejs-kanban [dataSource]="data$ | async"></ejs-kanban>
```

## Troubleshooting

### Issue: Cards Not Displaying

**Cause:** Missing `keyField` property

**Solution:**
```typescript
<ejs-kanban keyField="Status"></ejs-kanban>  // Required!
```

### Issue: Drag-and-Drop Not Working

**Cause:** `allowDragAndDrop` disabled

**Solution:**
```typescript
<ejs-kanban [allowDragAndDrop]="true"></ejs-kanban>
```

### Issue: Styles Not Applied

**Cause:** Missing CSS imports

**Solution:**
```css
@import '../node_modules/@syncfusion/ej2-kanban/styles/material3.css';
```

### Issue: Memory Leak

**Cause:** Unmanaged subscriptions

**Solution:**
```typescript
ngOnDestroy(): void {
  this.cardClicked$.unsubscribe();
  this.kanban.destroy();
}
```

### Issue: Slow with Large Datasets

**Cause:** No virtual scrolling

**Solution:**
```typescript
<ejs-kanban
  [allowVirtualization]="true"
  height="600px">
</ejs-kanban>
```

### Issue: Column Not Showing Items

**Cause:** keyField mismatch

**Solution:**
```typescript
// Ensure data field value matches column keyField
{ Id: 1, Status: 'Open' }  // Status='Open'
<e-column keyField="Open"></e-column>  // keyField='Open' ✓
```

## Performance Metrics

| Scenario | Cards | Load Time |
|----------|-------|-----------|
| Without virtual scrolling | 100 | ~200ms |
| Without virtual scrolling | 1000 | ~2000ms ⚠️ |
| With virtual scrolling | 1000 | ~500ms ✓ |
| With virtual scrolling | 5000 | ~800ms ✓ |

## Testing Checklist

- [ ] Drag-and-drop works smoothly
- [ ] Column changes update correctly
- [ ] Data binding refreshes properly
- [ ] Keyboard navigation works
- [ ] Events fire correctly
- [ ] Performance acceptable (< 500ms)
- [ ] Mobile responsive
- [ ] Accessibility compliant
- [ ] No console errors
- [ ] No memory leaks
