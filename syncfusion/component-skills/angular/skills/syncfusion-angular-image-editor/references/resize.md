# Image Resizing in Angular Image Editor

Change image dimensions while maintaining or ignoring aspect ratio.

## Resize Image

```typescript
import { ViewChild } from '@angular/core';
import { ImageEditorComponent } from '@syncfusion/ej2-angular-image-editor';

@Component({
  selector: 'app-resize',
  template: `
    <ejs-imageeditor #imageEditor></ejs-imageeditor>
    <button (click)="resizeImage()">Resize to 800x600</button>
  `
})
export class ResizeComponent {
  @ViewChild('imageEditor') imageEditor?: ImageEditorComponent;

  resizeImage() {
    this.imageEditor?.resize(
      800,      // width
      600,      // height
      false     // maintain aspect ratio (false)
    );
  }
}
```

## Maintain Aspect Ratio

```typescript
resizeWithAspectRatio() {
  this.imageEditor?.resize(
    800,      // width
    600,      // height (auto-calculated)
    true      // maintain aspect ratio
  );
}
```

## Common Resize Operations

```typescript
// Scale down for web
resizeForWeb() {
  this.imageEditor?.resize(1024, 768, true);
}

// Mobile thumbnail
resizeThumbnail() {
  this.imageEditor?.resize(300, 300, true);
}

// Social media (Instagram square)
resizeInstagram() {
  this.imageEditor?.resize(1080, 1080, false);
}

// Twitter header
resizeTwitterHeader() {
  this.imageEditor?.resize(1500, 500, false);
}

// Email template
resizeEmail() {
  this.imageEditor?.resize(600, 400, true);
}
```

## Resize Event

```typescript
@Component({
  template: `
    <ejs-imageeditor 
      [resizing]="onResizing"
    ></ejs-imageeditor>
  `
})
export class ResizeEventComponent {
  onResizing(args: any) {
    console.log('Previous Width:', args.previousWidth);
    console.log('Previous Height:', args.previousHeight);
    console.log('New Width:', args.width);
    console.log('New Height:', args.height);
    console.log('Aspect Ratio:', args.isAspectRatio);
  }
}
```

## Complete Example

```typescript
@Component({
  selector: 'app-resize-manager',
  template: `
    <div style="padding: 20px;">
      <div style="margin-bottom: 10px;">
        <label>Width: <input type="number" [(ngModel)]="width"></label>
        <label>Height: <input type="number" [(ngModel)]="height"></label>
        <label>
          <input type="checkbox" [(ngModel)]="maintainAspect">
          Maintain Aspect Ratio
        </label>
        <button (click)="applyResize()">Apply Resize</button>
      </div>
      <div>Dimensions: {{ width }} x {{ height }}</div>
      <div style="width: 600px; height: 400px;">
        <ejs-imageeditor 
          #imageEditor
          [resizing]="onResizing"
        ></ejs-imageeditor>
      </div>
    </div>
  `,
  imports: [ImageEditorModule, CommonModule, FormsModule],
  standalone: true
})
export class ResizeManagerComponent {
  @ViewChild('imageEditor') imageEditor?: ImageEditorComponent;
  
  width = 800;
  height = 600;
  maintainAspect = true;

  applyResize() {
    this.imageEditor?.resize(this.width, this.height, this.maintainAspect);
  }

  onResizing(args: any) {
    console.log(`Resized to ${args.width}x${args.height}`);
  }
}
```

## Best Practices

1. **Preserve aspect ratio** for natural-looking results
2. **Respect minimum dimensions** for quality
3. **Test resized images** before saving
4. **Use standard ratios** for web (16:9, 4:3, 1:1)

## Edge Cases

**Issue:** Resize distorts image
- **Solution:** Enable aspect ratio maintenance

**Issue:** Resized dimensions not applied
- **Solution:** Verify canvas is large enough for new size
