# Clearing the Image Editor

Reset editor state for reusing the component in dialogs or multi-image workflows.

## Clear Image Method

```typescript
import { ViewChild } from '@angular/core';
import { ImageEditorComponent } from '@syncfusion/ej2-angular-image-editor';

@Component({
  selector: 'app-clear',
  template: `
    <ejs-imageeditor #imageEditor></ejs-imageeditor>
    <button (click)="clearEditor()">Clear Editor</button>
  `
})
export class ClearComponent {
  @ViewChild('imageEditor') imageEditor?: ImageEditorComponent;

  clearEditor() {
    this.imageEditor?.clearImage();
  }
}
```

## What Clear Image Does

The `clearImage()` method:
- Removes current image from canvas
- Clears all annotations
- Resets zoom to 100%
- Clears undo/redo history
- Returns canvas to empty state

## Dialog Integration Pattern

```typescript
@Component({
  selector: 'app-image-editor-dialog',
  template: `
    <button (click)="openDialog()">Edit Image</button>
    
    <ng-template #dialogContent>
      <ejs-imageeditor 
        #imageEditor
        style="height: 500px;"
      ></ejs-imageeditor>
      <div style="margin-top: 10px; text-align: right;">
        <button (click)="saveImage()">Save</button>
        <button (click)="closeDialog()">Cancel</button>
      </div>
    </ng-template>
  `,
  imports: [ImageEditorModule, CommonModule],
  standalone: true
})
export class ImageEditorDialogComponent {
  @ViewChild('imageEditor') imageEditor?: ImageEditorComponent;
  
  dialogRef?: DialogRef;

  openDialog() {
    // Clear editor before opening dialog
    this.imageEditor?.clearImage();
    // Open dialog
    this.dialogRef = this.dialog.open(this.dialogContent, {
      width: '800px',
      height: '600px'
    });
  }

  closeDialog() {
    // Clear when closing to free resources
    this.imageEditor?.clearImage();
    this.dialogRef?.close();
  }

  saveImage() {
    // Save image before clearing
    const imageData = this.imageEditor?.export();
    // Handle save...
    this.closeDialog();
  }
}
```

## Multi-Image Editor

```typescript
@Component({
  selector: 'app-multi-image-editor',
  template: `
    <div style="display: flex; gap: 20px;">
      <div>
        <h3>Image List</h3>
        <ul>
          <li *ngFor="let image of images; let i = index"
              (click)="editImage(i)"
              [style.fontWeight]="currentIndex === i ? 'bold' : 'normal'">
            {{ image.name }}
          </li>
        </ul>
      </div>
      <div>
        <h3>Editor</h3>
        <ejs-imageeditor 
          #imageEditor
          style="width: 500px; height: 400px;"
        ></ejs-imageeditor>
        <div style="margin-top: 10px;">
          <button (click)="saveCurrentImage()">Save</button>
          <button (click)="nextImage()">Next</button>
          <button (click)="previousImage()">Previous</button>
        </div>
      </div>
    </div>
  `,
  imports: [ImageEditorModule, CommonModule],
  standalone: true
})
export class MultiImageEditorComponent {
  @ViewChild('imageEditor') imageEditor?: ImageEditorComponent;
  
  images: Array<{name: string, data: string}> = [];
  currentIndex = 0;

  editImage(index: number) {
    // Clear previous image
    this.imageEditor?.clearImage();
    
    // Load new image
    this.currentIndex = index;
    const image = this.images[index];
    this.imageEditor?.open(image.data);
  }

  saveCurrentImage() {
    const image = this.images[this.currentIndex];
    image.data = this.imageEditor?.export() || image.data;
  }

  nextImage() {
    this.saveCurrentImage();
    if (this.currentIndex < this.images.length - 1) {
      this.editImage(this.currentIndex + 1);
    }
  }

  previousImage() {
    this.saveCurrentImage();
    if (this.currentIndex > 0) {
      this.editImage(this.currentIndex - 1);
    }
  }
}
```

## Best Practices

1. **Clear before dialog**: Reset editor state before opening dialog
2. **Clear after close**: Free resources when closing dialog
3. **Save before clear**: Always save image data before clearing
4. **Batch operations**: Use clearImage() between processing multiple images

## Use Cases

**Dialog-based editor**: Clear when opening/closing dialog
**Batch processing**: Clear between images in image processing workflow
**Resource cleanup**: Clear when component is destroyed
**Fresh start**: Allow users to start over without reloading component

## Performance Note

Clearing the editor immediately:
- Frees canvas resources
- Clears undo/redo history
- Resets internal state
- Prepares for next image
