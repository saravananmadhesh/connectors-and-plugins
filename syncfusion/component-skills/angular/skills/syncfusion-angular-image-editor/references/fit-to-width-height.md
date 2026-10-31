# Fit to Width and Height

Automatically zoom and position images to fit within canvas boundaries.

## Fit to Width

Scale image to match canvas width while maintaining aspect ratio:

```typescript
import { ViewChild } from '@angular/core';
import { ImageEditorComponent } from '@syncfusion/ej2-angular-image-editor';

@Component({
  selector: 'app-fit-width',
  template: `
    <ejs-imageeditor #imageEditor></ejs-imageeditor>
    <button (click)="fitToWidth()">Fit to Width</button>
  `
})
export class FitWidthComponent {
  @ViewChild('imageEditor') imageEditor?: ImageEditorComponent;

  fitToWidth() {
    const zoomPercent = this.calculateWidthFitPercent();
    this.imageEditor?.zoom(zoomPercent);
  }

  calculateWidthFitPercent() {
    // Calculate zoom percentage for width fit
    // Returns appropriate zoom level as percentage (e.g., 50 for 50%)
    return 100; // Simplified example
  }
}
```

## Fit to Height

Scale image to match canvas height while maintaining aspect ratio:

```typescript
fitToHeight() {
  const zoomPercent = this.calculateHeightFitPercent();
  this.imageEditor?.zoom(zoomPercent);
}

calculateHeightFitPercent() {
  // Calculate zoom percentage for height fit
  // Returns appropriate zoom level as percentage
  return 100;
}
```

## Fit to Canvas (Both Width and Height)

Scale image to fit entire canvas:

```typescript
fitToCanvas() {
  const zoomPercent = this.calculateCanvasFitPercent();
  this.imageEditor?.zoom(zoomPercent);
}

calculateCanvasFitPercent() {
  // Calculate zoom percentage to fit entire canvas
  // Usually the smaller of width/height fit percentages
  return 100;
}
```

## Practical Example

```typescript
@Component({
  selector: 'app-fit-to-view',
  template: `
    <div style="padding: 20px;">
      <div style="margin-bottom: 10px; gap: 5px; display: flex;">
        <button (click)="fitToWidth()">Fit Width</button>
        <button (click)="fitToHeight()">Fit Height</button>
        <button (click)="fitToCanvas()">Fit All</button>
        <button (click)="zoom100()">100%</button>
      </div>
      <div>Current Zoom: {{ currentZoom }}%</div>
      <div style="width: 600px; height: 400px; border: 1px solid #ccc;">
        <ejs-imageeditor 
          #imageEditor
        ></ejs-imageeditor>
      </div>
    </div>
  `,
  imports: [ImageEditorModule, CommonModule],
  standalone: true
})
export class FitToViewComponent {
  @ViewChild('imageEditor') imageEditor?: ImageEditorComponent;
  currentZoom = 100;

  fitToWidth() {
    // Fit image to canvas width
    const zoomPercent = 75; // Adjust based on your needs
    this.imageEditor?.zoom(zoomPercent);
    this.currentZoom = zoomPercent;
  }

  fitToHeight() {
    // Fit image to canvas height
    const zoomPercent = 75;
    this.imageEditor?.zoom(zoomPercent);
    this.currentZoom = zoomPercent;
  }

  fitToCanvas() {
    // Fit entire image to canvas
    const zoomPercent = 60;
    this.imageEditor?.zoom(zoomPercent);
    this.currentZoom = zoomPercent;
  }

  zoom100() {
    this.imageEditor?.zoom(100);
    this.currentZoom = 100;
  }
}
```

## Responsive Layout

```typescript
@Component({
  selector: 'app-responsive-editor',
  template: `
    <div [style.width.%]="100"
         [style.height.%]="100"
         #container>
      <ejs-imageeditor 
        #imageEditor
        [style.width.%]="100"
        [style.height.%]="100"
      ></ejs-imageeditor>
    </div>
  `,
  imports: [ImageEditorModule],
  standalone: true
})
export class ResponsiveEditorComponent implements OnInit {
  @ViewChild('imageEditor') imageEditor?: ImageEditorComponent;
  @ViewChild('container') container?: ElementRef;

  ngOnInit() {
    // Auto-fit when container resizes
    window.addEventListener('resize', () => {
      this.fitToCanvas();
    });
  }

  fitToCanvas() {
    // Adjust zoom to fit canvas on resize
    const zoomPercent = 80; // Default zoom percentage
    this.imageEditor?.zoom(zoomPercent);
  }
}
```

## Common Zoom Levels

```typescript
// Apply common zoom percentages
zoom25() {
  this.imageEditor?.zoom(25);
}

zoom50() {
  this.imageEditor?.zoom(50);
}

zoom75() {
  this.imageEditor?.zoom(75);
}

zoom100() {
  this.imageEditor?.zoom(100);
}

zoom150() {
  this.imageEditor?.zoom(150);
}

zoom200() {
  this.imageEditor?.zoom(200);
}
```

## Best Practices

1. **Fit on load**: Auto-fit image when first opened
2. **Preserve aspect ratio**: Always maintain aspect ratio when fitting
3. **Responsive**: Refit when window resizes
4. **User control**: Provide both auto-fit and manual zoom options
5. **Bounds**: Don't exceed 100% unless zooming for detail
