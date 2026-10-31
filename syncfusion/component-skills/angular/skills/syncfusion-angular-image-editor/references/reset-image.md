# Resetting the Image to Original

Discard all edits and revert to the original unmodified image.

## Reset Image Method

```typescript
import { ViewChild } from '@angular/core';
import { ImageEditorComponent } from '@syncfusion/ej2-angular-image-editor';

@Component({
  selector: 'app-reset',
  template: `
    <ejs-imageeditor #imageEditor></ejs-imageeditor>
    <button (click)="resetToOriginal()">Reset to Original</button>
  `
})
export class ResetComponent {
  @ViewChild('imageEditor') imageEditor?: ImageEditorComponent;

  resetToOriginal() {
    this.imageEditor?.reset();
  }
}
```

## What Reset Does

The `reset()` method:
- Reverts all transformations (rotate, flip, straighten, zoom)
- Removes all annotations (text, drawings, shapes)
- Clears all filters and adjustments
- Removes redactions and frames
- Returns image to original state
- Preserves undo/redo history (doesn't clear it)

## Complete Reset Example

```typescript
@Component({
  selector: 'app-reset-demo',
  template: `
    <div style="padding: 20px;">
      <div style="margin-bottom: 10px; display: flex; gap: 5px;">
        <button (click)="applyFilters()">Add Filters</button>
        <button (click)="addAnnotations()">Add Annotations</button>
        <button (click)="resetImage()" style="background-color: #ff6b6b; color: white;">
          Reset to Original
        </button>
        <button (click)="undo()">Undo</button>
        <button (click)="redo()">Redo</button>
      </div>
      
      <div style="display: flex; gap: 10px;">
        <div>
          <p>Edits Status:</p>
          <ul>
            <li>Filters: {{ hasFilters }}</li>
            <li>Annotations: {{ hasAnnotations }}</li>
            <li>Transformations: {{ hasTransforms }}</li>
          </ul>
        </div>
        
        <ejs-imageeditor 
          #imageEditor
          [style.width]="'400px'"
          [style.height]="'300px'"
        ></ejs-imageeditor>
      </div>
    </div>
  `,
  imports: [ImageEditorModule, CommonModule],
  standalone: true
})
export class ResetDemoComponent {
  @ViewChild('imageEditor') imageEditor?: ImageEditorComponent;
  
  hasFilters = false;
  hasAnnotations = false;
  hasTransforms = false;

  applyFilters() {
    this.imageEditor?.applyImageFilter('warm');
    this.hasFilters = true;
  }

  addAnnotations() {
    // Add annotation to image
    this.hasAnnotations = true;
  }

  resetImage() {
    this.imageEditor?.reset();
    this.hasFilters = false;
    this.hasAnnotations = false;
    this.hasTransforms = false;
  }

  undo() {
    if (this.imageEditor?.canUndo()) {
      this.imageEditor?.undo();
    }
  }

  redo() {
    if (this.imageEditor?.canRedo()) {
      this.imageEditor?.redo();
    }
  }
}
```

## Reset with Confirmation

```typescript
@Component({
  template: `
    <button (click)="confirmReset()">Reset Image</button>
  `,
  standalone: true
})
export class ResetWithConfirmComponent {
  @ViewChild('imageEditor') imageEditor?: ImageEditorComponent;

  confirmReset() {
    if (confirm('Are you sure you want to discard all changes and reset to original image?')) {
      this.imageEditor?.reset();
    }
  }
}
```

## Reset vs Clear

| Operation | Clears | Keeps |
|-----------|--------|-------|
| `reset()` | Edits, filters, annotations, transforms | Original image |
| `clearImage()` | Image, all annotations, zoom | Nothing (empty canvas) |

**Use `reset()`** when: Discarding edits but keeping image in editor
**Use `clearImage()`** when: Completely emptying editor for new image

## Workflow Example

```typescript
@Component({
  selector: 'app-edit-workflow',
  template: `
    <div style="padding: 20px;">
      <h3>Image Editing Workflow</h3>
      
      <div style="margin-bottom: 20px;">
        <button (click)="editImage()">✏️ Edit</button>
        <button (click)="previewChanges()">👁️ Preview</button>
        <button (click)="saveChanges()">💾 Save</button>
        <button (click)="resetImage()">↺ Reset</button>
      </div>

      <div style="width: 600px; height: 400px; border: 1px solid #ccc;">
        <ejs-imageeditor #imageEditor></ejs-imageeditor>
      </div>

      <div style="margin-top: 20px; padding: 10px; background: #f5f5f5;">
        <p *ngIf="editState === 'original'">Original image loaded</p>
        <p *ngIf="editState === 'editing'">Making edits...</p>
        <p *ngIf="editState === 'saved'">Changes saved ✓</p>
        <p *ngIf="editState === 'reset'">Reset to original</p>
      </div>
    </div>
  `,
  imports: [ImageEditorModule, CommonModule],
  standalone: true
})
export class EditWorkflowComponent {
  @ViewChild('imageEditor') imageEditor?: ImageEditorComponent;
  editState = 'original';

  editImage() {
    this.editState = 'editing';
  }

  previewChanges() {
    console.log('Current edits preview');
  }

  saveChanges() {
    const imageData = this.imageEditor?.export();
    console.log('Saving:', imageData);
    this.editState = 'saved';
  }

  resetImage() {
    this.imageEditor?.reset();
    this.editState = 'reset';
    
    // Option: Reset state after delay
    setTimeout(() => {
      this.editState = 'original';
    }, 2000);
  }
}
```

## Smart Reset with History

```typescript
@Component({
  selector: 'app-smart-reset',
  template: `
    <div>
      <button (click)="applyEdit()">Apply Edit</button>
      <button (click)="resetLastEdit()">Undo Last</button>
      <button (click)="resetAllEdits()">Reset All</button>
      <button (click)="resetAndReload()">Reset and Reload</button>
      
      <div>Changes made: {{ editHistory.length }}</div>
      <ejs-imageeditor #imageEditor></ejs-imageeditor>
    </div>
  `,
  imports: [ImageEditorModule, CommonModule],
  standalone: true
})
export class SmartResetComponent {
  @ViewChild('imageEditor') imageEditor?: ImageEditorComponent;
  editHistory: string[] = [];

  applyEdit() {
    this.editHistory.push('filter_warm');
    this.imageEditor?.applyImageFilter('warm');
  }

  resetLastEdit() {
    if (this.editHistory.length > 0) {
      this.imageEditor?.undo();
      this.editHistory.pop();
    }
  }

  resetAllEdits() {
    this.editHistory = [];
    this.imageEditor?.reset();
  }

  resetAndReload() {
    this.imageEditor?.reset();
    // Reload original from server if needed
    this.editHistory = [];
  }
}
```

## Best Practices

1. **Confirm destructive action**: Always ask user before reset
2. **Undo alternative**: Consider undo first before full reset
3. **Save before reset**: Encourage save if changes made
4. **Provide feedback**: Show confirmation when reset completes
5. **Preserve history**: Use undo instead when possible

## Common Use Cases

**Discard button**: User wants to start over
**Navigation away**: Reset before loading different image
**Batch processing**: Reset between processing images
**Error recovery**: Reset to known good state after error
**Preview cancel**: User previewed but wants to keep original

## Performance Note

Reset operation is fast as it:
- Reverts canvas state to original
- Clears edit layer
- Restores original image data
- Maintains efficient memory usage
