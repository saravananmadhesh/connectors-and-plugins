# Undo and Redo in Angular Image Editor

The Image Editor maintains a history of up to 16 actions, allowing users to undo and redo their edits.

## Undo Operation

Revert the most recent action:

```typescript
import { ViewChild } from '@angular/core';
import { ImageEditorComponent } from '@syncfusion/ej2-angular-image-editor';

@Component({
  selector: 'app-undo-redo',
  template: `
    <ejs-imageeditor #imageEditor></ejs-imageeditor>
    <button (click)="undoAction()">Undo (Ctrl+Z)</button>
    <button (click)="redoAction()">Redo (Ctrl+Y)</button>
  `
})
export class UndoRedoComponent {
  @ViewChild('imageEditor') imageEditor?: ImageEditorComponent;

  undoAction() {
    this.imageEditor?.undo();
  }

  redoAction() {
    this.imageEditor?.redo();
  }
}
```

## Redo Operation

Reapply an action that was undone:

```typescript
redoLastAction() {
  this.imageEditor?.redo();
}
```

## Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Ctrl + Z` | Undo |
| `Ctrl + Y` | Redo |

## History Limitations

- **Maximum history depth**: 16 actions
- **When limit reached**: Oldest action is removed as new actions are added
- **Example**: After 16 edits, performing another action removes the 1st action

## Complete Example

```typescript
@Component({
  selector: 'app-undo-redo-manager',
  template: `
    <div style="padding: 20px;">
      <button (click)="undo()" [disabled]="!canUndo">↶ Undo</button>
      <button (click)="redo()" [disabled]="!canRedo">↷ Redo</button>
      <span>{{ actionCount }}/16 actions</span>
      <div style="width: 600px; height: 400px;">
        <ejs-imageeditor #imageEditor></ejs-imageeditor>
      </div>
    </div>
  `,
  imports: [ImageEditorModule, CommonModule],
  standalone: true
})
export class UndoRedoManagerComponent {
  @ViewChild('imageEditor') imageEditor?: ImageEditorComponent;
  
  canUndo = false;
  canRedo = false;
  actionCount = 0;

  undo() {
    this.imageEditor?.undo();
    this.updateState();
  }

  redo() {
    this.imageEditor?.redo();
    this.updateState();
  }

  updateState() {
    // Update button states based on history
    this.actionCount = Math.min(this.actionCount + 1, 16);
  }
}
```

## Edge Cases

**Issue:** Undo not working after save
- **Solution:** Undo/redo history is preserved after save; continue editing to undo

**Issue:** Cannot undo past 16 actions
- **Solution:** This is by design; oldest actions are automatically removed

**Issue:** Redo becomes unavailable
- **Solution:** After performing new action following undo, redo history is cleared
