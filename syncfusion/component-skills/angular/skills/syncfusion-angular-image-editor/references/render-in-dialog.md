# Image Editor in Dialog

Render the Image Editor component within a modal dialog for dedicated editing workflows.

## Basic Dialog Integration

```typescript
import { DialogModule, DialogRef } from '@syncfusion/ej2-angular-popups';
import { ImageEditorComponent, ImageEditorModule } from '@syncfusion/ej2-angular-image-editor';
import { CommonModule } from '@angular/common';
import { ViewChild } from '@angular/core';

@Component({
  selector: 'app-image-editor-dialog',
  template: `
    <button (click)="openDialog()">Edit Image</button>
    
    <ejs-dialog 
      #dialog
      [isModal]="true"
      [width]="'900px'"
      [height]="'700px'"
      [buttons]="buttons"
      (close)="onDialogClose()">
      
      <ejs-imageeditor 
        #imageEditor
        [style.width.%]="100"
        [style.height.%]="100"
      ></ejs-imageeditor>
      
    </ejs-dialog>
  `,
  imports: [DialogModule, ImageEditorModule, CommonModule],
  standalone: true
})
export class ImageEditorDialogComponent {
  @ViewChild('dialog') dialog?: any;
  @ViewChild('imageEditor') imageEditor?: ImageEditorComponent;

  buttons = [
    { buttonModel: { content: 'Save', isPrimary: true }, 
      click: () => this.saveImage() },
    { buttonModel: { content: 'Cancel' }, 
      click: () => this.closeDialog() }
  ];

  openDialog() {
    this.dialog?.show();
  }

  saveImage() {
    const imageData = this.imageEditor?.export();
    console.log('Image saved:', imageData);
    this.closeDialog();
  }

  closeDialog() {
    this.imageEditor?.clearImage();
    this.dialog?.hide();
  }

  onDialogClose() {
    // Cleanup when dialog closes
  }
}
```

## Complete Dialog Component

```typescript
@Component({
  selector: 'app-image-editor-modal',
  template: `
    <div style="padding: 20px;">
      <h3>Image Gallery</h3>
      <div style="display: flex; flex-wrap: wrap; gap: 10px; margin-bottom: 20px;">
        <img *ngFor="let img of thumbnails"
             [src]="img"
             style="width: 100px; height: 100px; cursor: pointer; border: 2px solid #ccc;"
             (click)="editImage(img)">
      </div>

      <ejs-dialog 
        #editDialog
        [header]="'Image Editor'"
        [isModal]="true"
        [width]="'900px'"
        [height]="'700px'"
        [animationSettings]="{ effect: 'Zoom' }"
        [buttons]="buttons">
        
        <ng-template #content>
          <div style="width: 100%; height: 100%; display: flex; flex-direction: column;">
            <div style="flex: 1; overflow: hidden;">
              <ejs-imageeditor 
                #imageEditor
                [style.width.%]="100"
                [style.height.%]="100"
              ></ejs-imageeditor>
            </div>
          </div>
        </ng-template>

      </ejs-dialog>
    </div>
  `,
  imports: [DialogModule, ImageEditorModule, CommonModule],
  standalone: true
})
export class ImageEditorModalComponent implements OnInit {
  @ViewChild('editDialog') editDialog?: any;
  @ViewChild('imageEditor') imageEditor?: ImageEditorComponent;

  thumbnails: string[] = [];
  currentImage?: string;

  buttons = [
    { 
      buttonModel: { content: 'Save Changes', isPrimary: true }, 
      click: () => this.handleSave() 
    },
    { 
      buttonModel: { content: 'Export As', cssClass: 'e-outline' },
      click: () => this.handleExportAs()
    },
    { 
      buttonModel: { content: 'Close' }, 
      click: () => this.handleClose() 
    }
  ];

  ngOnInit() {
    this.loadThumbnails();
  }

  loadThumbnails() {
    // Load image thumbnails
    this.thumbnails = [
      'assets/image1.jpg',
      'assets/image2.jpg',
      'assets/image3.jpg'
    ];
  }

  editImage(imageUrl: string) {
    this.currentImage = imageUrl;
    // Clear previous image
    this.imageEditor?.clearImage();
    // Load new image
    this.imageEditor?.open(imageUrl);
    // Show dialog
    this.editDialog?.show();
  }

  handleSave() {
    if (this.currentImage) {
      const editedImage = this.imageEditor?.export();
      console.log('Saving edited image:', editedImage);
      // Send to server or update
    }
    this.handleClose();
  }

  handleExportAs() {
    const format = prompt('Export as (jpeg/png/webp):', 'jpeg');
    if (format) {
      this.imageEditor?.export(format);
    }
  }

  handleClose() {
    this.imageEditor?.clearImage();
    this.editDialog?.hide();
  }
}
```

## Resizable Dialog

```typescript
@Component({
  selector: 'app-resizable-editor-dialog',
  template: `
    <ejs-dialog 
      #resizableDialog
      [isModal]="true"
      [width]="'80%'"
      [height]="'80%'"
      [enableResize]="true"
      [resizeHandles]="['NorthEast', 'SouthEast', 'SouthWest', 'NorthWest']"
      [animationSettings]="{ effect: 'Zoom' }">
      
      <ejs-imageeditor 
        #imageEditor
        [style.width.%]="100"
        [style.height.%]="100"
      ></ejs-imageeditor>
      
    </ejs-dialog>
  `,
  imports: [DialogModule, ImageEditorModule],
  standalone: true
})
export class ResizableEditorDialogComponent {
  @ViewChild('resizableDialog') dialog?: any;
  @ViewChild('imageEditor') imageEditor?: ImageEditorComponent;
}
```

## Toolbar Configuration for Dialog

```typescript
@Component({
  selector: 'app-dialog-with-toolbar',
  template: `
    <ejs-dialog 
      #toolbarDialog
      [isModal]="true"
      [width]="'900px'"
      [height]="'700px'">
      
      <div style="width: 100%; height: 100%; display: flex; flex-direction: column;">
        <!-- Dialog toolbar -->
        <div style="padding: 10px; border-bottom: 1px solid #ccc;">
          <button (click)="applyFilter('warm')">Warm</button>
          <button (click)="applyFilter('cold')">Cold</button>
          <button (click)="undo()">Undo</button>
          <button (click)="redo()">Redo</button>
        </div>
        
        <!-- Image Editor -->
        <div style="flex: 1; overflow: hidden;">
          <ejs-imageeditor 
            #imageEditor
            [style.width.%]="100"
            [style.height.%]="100"
          ></ejs-imageeditor>
        </div>
      </div>
      
    </ejs-dialog>
  `,
  imports: [DialogModule, ImageEditorModule, CommonModule],
  standalone: true
})
export class DialogWithToolbarComponent {
  @ViewChild('imageEditor') imageEditor?: ImageEditorComponent;

  applyFilter(filter: string) {
    this.imageEditor?.applyImageFilter(filter);
  }

  undo() {
    this.imageEditor?.undo();
  }

  redo() {
    this.imageEditor?.redo();
  }
}
```

## Event Handling

```typescript
@Component({
  template: `
    <ejs-dialog 
      (open)="onDialogOpen()"
      (close)="onDialogClose()">
      
      <ejs-imageeditor 
        #imageEditor
        (created)="onEditorCreated()"
        (destroyed)="onEditorDestroyed()"
        (beforeSave)="onImageSaving($event)">
      </ejs-imageeditor>
      
    </ejs-dialog>
  `,
  standalone: true
})
export class DialogEventHandlingComponent {
  @ViewChild('imageEditor') imageEditor?: ImageEditorComponent;

  onDialogOpen() {
    console.log('Dialog opened - focus on image editor');
  }

  onDialogClose() {
    console.log('Dialog closed - cleanup');
  }

  onEditorCreated() {
    console.log('Image editor initialized');
  }

  onEditorDestroyed() {
    console.log('Image editor destroyed');
  }

  onImageSaving(event: any) {
    console.log('Image saved event:', event);
  }
}
```

## Best Practices

1. **Clear on open**: Clear editor before showing dialog for fresh state
2. **Size appropriately**: Use sufficient dialog size (900×700 minimum)
3. **Modal mode**: Use `isModal: true` to prevent interaction with background
4. **Cleanup on close**: Clear resources when dialog closes
5. **Save first**: Save image before clearing on close
6. **Animation**: Use subtle animations (Zoom effect) for polish

## Common Patterns

**Image Gallery Editor**: Display thumbnails, click to edit in dialog
**Batch Processing**: Open multiple images in sequence through dialog
**Workflow Integration**: Edit step in larger workflow before proceeding
**Embedded Edit**: Limited space - use dialog for full editing interface

## Performance Tips

- Lazy load image editor component in dialog
- Destroy editor when dialog closes (clear resources)
- Use image compression for large files
- Limit maximum image dimensions
