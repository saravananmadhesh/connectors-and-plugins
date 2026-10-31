# Data Persistence in Angular Kanban

## Table of Contents
- [Local Storage Persistence](#local-storage-persistence)
- [State Save and Restore](#state-save-and-restore)
- [DataManager Persistence](#datamanager-persistence)
- [Custom Persistence](#custom-persistence)
- [Backend Sync](#backend-sync)

## Local Storage Persistence

### Save Board State to Browser Storage

```typescript
import { Component, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { KanbanComponent, KanbanModule } from '@syncfusion/ej2-angular-kanban';
import { ActionEventArgs } from '@syncfusion/ej2-kanban';

@Component({
  selector: 'app-kanban-persistent',
  standalone: true,
  imports: [KanbanModule],
  template: `
    <button (click)="clearSavedState()">Clear Saved State</button>
    <ejs-kanban
      #kanban
      keyField="Status"
      [dataSource]="data"
      (actionComplete)="onActionComplete($event)">
      <e-columns>
        <e-column headerText="To Do" keyField="Open"></e-column>
        <e-column headerText="In Progress" keyField="InProgress"></e-column>
        <e-column headerText="Done" keyField="Close"></e-column>
      </e-columns>
    </ejs-kanban>
  `
})
export class KanbanPersistentComponent implements OnInit, OnDestroy {
  @ViewChild('kanban') kanban: KanbanComponent;

  data = [
    { Id: 1, Status: 'Open', Summary: 'Task 1' },
    { Id: 2, Status: 'InProgress', Summary: 'Task 2' }
  ];

  ngOnInit(): void {
    // Restore board state from storage
    this.restoreState();
  }

  onActionComplete(args: ActionEventArgs): void {
    // Save state after any action
    if (['Drag', 'Save', 'Delete', 'Add'].includes(args.requestType)) {
      this.saveState();
    }
  }

  saveState(): void {
    const boardState = {
      timestamp: new Date().getTime(),
      data: this.data,
      cardPositions: this.getCardPositions()
    };
    localStorage.setItem('kanban-state', JSON.stringify(boardState));
    console.log('State saved to localStorage');
  }

  restoreState(): void {
    const savedState = localStorage.getItem('kanban-state');
    if (savedState) {
      try {
        const state = JSON.parse(savedState);
        this.data = state.data;
        console.log('State restored from localStorage');
      } catch (error) {
        console.error('Error restoring state:', error);
      }
    }
  }

  clearSavedState(): void {
    localStorage.removeItem('kanban-state');
    console.log('Saved state cleared');
  }

  private getCardPositions(): any {
    // Get current card positions in columns
    return this.data.reduce((positions, card) => {
      if (!positions[card.Status]) {
        positions[card.Status] = [];
      }
      positions[card.Status].push(card.Id);
      return positions;
    }, {});
  }

  ngOnDestroy(): void {
    // Auto-save on component destroy
    this.saveState();
  }
}
```

### Session vs Local Storage

```typescript
// Local Storage - Persists across browser sessions
localStorage.setItem('kanban-data', JSON.stringify(data));

// Session Storage - Cleared when tab closes
sessionStorage.setItem('kanban-data', JSON.stringify(data));

// Choose based on use case:
// - Local: Project management (permanent saves)
// - Session: Temporary workflow (single session work)
```

## State Save and Restore

### Save Card Order and Positions

```typescript
export interface KanbanState {
  version: string;
  savedAt: Date;
  cards: CardState[];
  columnStates: ColumnState[];
}

export interface CardState {
  id: string | number;
  status: string;
  order: number;
}

export interface ColumnState {
  key: string;
  isExpanded: boolean;
  isVisible: boolean;
}

saveBoardConfiguration(): void {
  const state: KanbanState = {
    version: '1.0.0',
    savedAt: new Date(),
    cards: this.data.map((card, index) => ({
      id: card.Id,
      status: card.Status,
      order: index
    })),
    columnStates: this.kanban.getColumnStates?.() || []
  };

  localStorage.setItem('kanban-config', JSON.stringify(state));
}

restoreBoardConfiguration(): void {
  const saved = localStorage.getItem('kanban-config');
  if (saved) {
    const state: KanbanState = JSON.parse(saved);
    
    // Restore card order
    this.data = this.data.sort((a, b) => {
      const aCard = state.cards.find(c => c.id === a.Id);
      const bCard = state.cards.find(c => c.id === b.Id);
      return (aCard?.order || 0) - (bCard?.order || 0);
    });
  }
}
```

### Card Movement History

```typescript
class KanbanHistoryManager {
  private history: CardMovement[] = [];
  private historyIndex = -1;

  recordMovement(card: any, oldStatus: string, newStatus: string): void {
    // Remove redo history when new move is made
    this.history.splice(this.historyIndex + 1);
    
    this.history.push({
      cardId: card.Id,
      oldStatus,
      newStatus,
      timestamp: new Date()
    });
    this.historyIndex++;
  }

  undo(): CardMovement | null {
    if (this.historyIndex > 0) {
      this.historyIndex--;
      return this.history[this.historyIndex + 1];
    }
    return null;
  }

  redo(): CardMovement | null {
    if (this.historyIndex < this.history.length - 1) {
      this.historyIndex++;
      return this.history[this.historyIndex];
    }
    return null;
  }

  canUndo(): boolean {
    return this.historyIndex >= 0;
  }

  canRedo(): boolean {
    return this.historyIndex < this.history.length - 1;
  }
}

interface CardMovement {
  cardId: string | number;
  oldStatus: string;
  newStatus: string;
  timestamp: Date;
}
```

## DataManager Persistence

### Auto-Save with DataManager

```typescript
import { Component } from '@angular/core';
import { DataManager, UrlAdaptor } from '@syncfusion/ej2-data';
import { ActionEventArgs } from '@syncfusion/ej2-kanban';

@Component({
  selector: 'app-kanban',
  standalone: true,
  template: `
    <ejs-kanban
      keyField="Status"
      [dataSource]="dataManager"
      (actionComplete)="onActionComplete($event)">
    </ejs-kanban>
  `
})
export class KanbanComponent {
  dataManager: DataManager = new DataManager({
    url: '/api/tasks',
    adaptor: new UrlAdaptor(),
    actionFailure: () => {
      console.error('API error - data not saved');
    }
  });

  onActionComplete(args: ActionEventArgs): void {
    if (args.requestType === 'Save') {
      console.log('Card saved to backend:', args.data);
    }
  }
}
```

### Batch Updates

```typescript
saveBatchChanges(): void {
  const dataManager = this.kanban.getDataManager();
  
  // Make changes
  dataManager.insert(newCard);
  dataManager.update('Id', updatedCard);
  dataManager.remove('Id', deletedCard);
  
  // Save all at once
  dataManager.saveChanges().then(() => {
    console.log('Batch changes saved');
  }).catch((error) => {
    console.error('Batch save failed:', error);
  });
}
```

## Custom Persistence

### IndexedDB for Large Datasets

```typescript
class KanbanIndexedDBStorage {
  private dbName = 'kanban-db';
  private storeName = 'cards';
  private db: IDBDatabase;

  async init(): Promise<void> {
    return new Promise((resolve, reject) => {
      const request = indexedDB.open(this.dbName, 1);
      
      request.onerror = () => reject(request.error);
      request.onsuccess = () => {
        this.db = request.result;
        resolve();
      };
      
      request.onupgradeneeded = (event: any) => {
        const db = event.target.result;
        db.createObjectStore(this.storeName, { keyPath: 'Id' });
      };
    });
  }

  async saveCards(cards: any[]): Promise<void> {
    const transaction = this.db.transaction([this.storeName], 'readwrite');
    const store = transaction.objectStore(this.storeName);
    
    for (const card of cards) {
      store.put(card);
    }

    return new Promise((resolve, reject) => {
      transaction.oncomplete = () => resolve();
      transaction.onerror = () => reject(transaction.error);
    });
  }

  async loadCards(): Promise<any[]> {
    return new Promise((resolve, reject) => {
      const transaction = this.db.transaction([this.storeName], 'readonly');
      const store = transaction.objectStore(this.storeName);
      const request = store.getAll();

      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }
}

// Usage
const storage = new KanbanIndexedDBStorage();
await storage.init();
await storage.saveCards(kanbanData);
const loadedCards = await storage.loadCards();
```

## Backend Sync

### Sync Local Changes to Server

```typescript
class KanbanSyncManager {
  private syncQueue: SyncOperation[] = [];
  private isSyncing = false;

  async addOperation(operation: SyncOperation): Promise<void> {
    this.syncQueue.push(operation);
    await this.sync();
  }

  async sync(): Promise<void> {
    if (this.isSyncing || this.syncQueue.length === 0) {
      return;
    }

    this.isSyncing = true;
    const operations = [...this.syncQueue];
    this.syncQueue = [];

    try {
      for (const op of operations) {
        switch (op.type) {
          case 'ADD':
            await this.apiAddCard(op.data);
            break;
          case 'UPDATE':
            await this.apiUpdateCard(op.data);
            break;
          case 'DELETE':
            await this.apiDeleteCard(op.data.Id);
            break;
        }
      }
      console.log('Sync completed');
    } catch (error) {
      console.error('Sync failed:', error);
      // Re-add failed operations to queue
      this.syncQueue.push(...operations);
    } finally {
      this.isSyncing = false;
    }
  }

  private apiAddCard(card: any): Promise<any> {
    return fetch('/api/tasks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(card)
    }).then(r => r.json());
  }

  private apiUpdateCard(card: any): Promise<any> {
    return fetch(`/api/tasks/${card.Id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(card)
    }).then(r => r.json());
  }

  private apiDeleteCard(id: string | number): Promise<any> {
    return fetch(`/api/tasks/${id}`, { method: 'DELETE' })
      .then(r => r.json());
  }
}

interface SyncOperation {
  type: 'ADD' | 'UPDATE' | 'DELETE';
  data: any;
  timestamp: Date;
}
```

### Offline-First Pattern

```typescript
@Component({
  selector: 'app-kanban',
  standalone: true,
  template: `
    <div *ngIf="!isOnline" style="background: #fff3cd; padding: 10px; color: #856404;">
      ⚠️ Offline Mode - Changes will sync when connected
    </div>
    <ejs-kanban
      (actionComplete)="onActionComplete($event)">
    </ejs-kanban>
  `
})
export class KanbanOfflineComponent {
  isOnline = navigator.onLine;
  private syncManager = new KanbanSyncManager();

  constructor() {
    window.addEventListener('online', () => this.onOnline());
    window.addEventListener('offline', () => this.onOffline());
  }

  onActionComplete(args: ActionEventArgs): void {
    // Queue operation for sync
    this.syncManager.addOperation({
      type: args.requestType as 'ADD' | 'UPDATE' | 'DELETE',
      data: args.data,
      timestamp: new Date()
    });
  }

  private onOnline(): void {
    this.isOnline = true;
    console.log('Back online - syncing...');
    this.syncManager.sync();
  }

  private onOffline(): void {
    this.isOnline = false;
    console.log('Offline - changes will be saved locally');
  }
}
```

## Best Practices

1. **Auto-save after drag** - Save immediately after card moves
2. **Debounce saves** - Wait 500ms before saving to avoid rapid requests
3. **Conflict resolution** - Handle cases where server data differs from local
4. **Version control** - Track state versions for migration
5. **Error handling** - Gracefully handle sync failures
6. **User notification** - Show save status to users
