# Redaction in Angular Image Editor

Redaction protects sensitive information by obscuring areas using blur or pixelate effects.

## Redaction Types

- **Blur** - Gaussian blur effect (default)
- **Pixelate** - Pixel mosaic effect

## Draw Redaction

```typescript
import { ViewChild } from '@angular/core';
import { ImageEditorComponent } from '@syncfusion/ej2-angular-image-editor';

@Component({
  selector: 'app-redaction',
  template: `
    <ejs-imageeditor #imageEditor></ejs-imageeditor>
    <button (click)="addBlurRedact()">Blur Redact</button>
    <button (click)="addPixelateRedact()">Pixelate Redact</button>
  `
})
export class RedactionComponent {
  @ViewChild('imageEditor') imageEditor?: ImageEditorComponent;

  addBlurRedact() {
    this.imageEditor?.drawRedact(
      'Blur',   // type: 'Blur' or 'Pixelate'
      100,      // x-coordinate
      100,      // y-coordinate
      200,      // width
      100,      // height
      20        // blur value (default 20)
    );
  }

  addPixelateRedact() {
    this.imageEditor?.drawRedact(
      'Pixelate', // type
      300,        // x
      50,         // y
      150,        // width
      100,        // height
      10          // pixel size
    );
  }
}
```

## Redaction Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `type` | string | 'Blur' or 'Pixelate' |
| `x` | number | X-coordinate (top-left) |
| `y` | number | Y-coordinate (top-left) |
| `width` | number | Redaction width (default: 100) |
| `height` | number | Redaction height (default: 50) |
| `value` | number | Blur value (0-100) or pixel size |

## Get Redaction IDs

```typescript
getAllRedacts() {
  const redacts = this.imageEditor?.getRedacts();
  redacts?.forEach(redact => {
    console.log('ID:', redact.id);
    console.log('Type:', redact.type);
    console.log('Position:', { x: redact.x, y: redact.y });
  });
  return redacts;
}
```

## Select Redaction

```typescript
selectRedact(redactId: string) {
  this.imageEditor?.selectRedact(redactId);
}

selectFirstRedact() {
  const redacts = this.imageEditor?.getRedacts();
  if (redacts && redacts.length > 0) {
    this.imageEditor?.selectRedact(redacts[0].id);
  }
}
```

## Update Redaction

```typescript
updateRedact(redactId: string) {
  const newSettings = {
    id: redactId,
    type: 'Blur',
    x: 100,
    y: 100,
    width: 250,   // Updated width
    height: 150,  // Updated height
    value: 30     // Updated blur value
  };

  this.imageEditor?.updateRedact(newSettings, true); // true = show as selected
}
```

## Delete Redaction

```typescript
deleteRedact(redactId: string) {
  this.imageEditor?.deleteRedact(redactId);
}

deleteAllRedacts() {
  const redacts = this.imageEditor?.getRedacts();
  redacts?.forEach(redact => {
    this.imageEditor?.deleteRedact(redact.id);
  });
}
```

## Complete Redaction Example

```typescript
@Component({
  selector: 'app-redaction-manager',
  template: `
    <div style="padding: 20px;">
      <div style="margin-bottom: 10px;">
        <button (click)="addBlurRedact()">Add Blur</button>
        <button (click)="addPixelateRedact()">Add Pixelate</button>
        <button (click)="increaseBlur()">Increase Blur</button>
        <button (click)="deleteSelected()">Delete</button>
        <button (click)="removeAll()">Remove All</button>
      </div>
      <div>Redacts: {{ redactCount }}</div>
      <div style="width: 600px; height: 400px;">
        <ejs-imageeditor #imageEditor></ejs-imageeditor>
      </div>
    </div>
  `,
  imports: [ImageEditorModule, CommonModule],
  standalone: true
})
export class RedactionManagerComponent {
  @ViewChild('imageEditor') imageEditor?: ImageEditorComponent;
  redactCount = 0;
  selectedRedactId: string | null = null;

  addBlurRedact() {
    this.imageEditor?.drawRedact('Blur', 100, 100, 200, 100, 20);
    this.updateRedactCount();
  }

  addPixelateRedact() {
    this.imageEditor?.drawRedact('Pixelate', 300, 50, 150, 100, 10);
    this.updateRedactCount();
  }

  increaseBlur() {
    const redacts = this.imageEditor?.getRedacts();
    if (redacts && redacts[0]) {
      this.selectedRedactId = redacts[0].id;
      redacts[0].value = Math.min(100, (redacts[0].value || 0) + 10);
      this.imageEditor?.updateRedact(redacts[0]);
    }
  }

  deleteSelected() {
    if (this.selectedRedactId) {
      this.imageEditor?.deleteRedact(this.selectedRedactId);
      this.updateRedactCount();
    }
  }

  removeAll() {
    this.imageEditor?.getRedacts()?.forEach(redact => {
      this.imageEditor?.deleteRedact(redact.id);
    });
    this.updateRedactCount();
  }

  updateRedactCount() {
    this.redactCount = this.imageEditor?.getRedacts()?.length || 0;
  }
}
```

## Use Cases

1. **PII Protection** - Hide personal information (names, addresses, SSN)
2. **Confidential Documents** - Redact sensitive text/numbers
3. **Photo Privacy** - Hide faces or identifiable features
4. **Legal Documents** - Redact privileged information
5. **Medical Records** - Hide patient identification

## Best Practices

1. **Use blur for text** - More natural looking
2. **Use pixelate for faces** - Effective anonymization
3. **Verify coverage** - Ensure sensitive areas fully covered
4. **Save redacted image** - Export after redaction complete
5. **Test on different backgrounds** - Some redactions show through lighter

## Edge Cases & Troubleshooting

**Issue:** Redaction partially visible or transparent
- **Solution:** Increase blur value or ensure 100% pixel coverage

**Issue:** Cannot delete specific redaction
- **Solution:** Verify redact ID; use `getRedacts()` to retrieve correct ID

**Issue:** Pixelate shows original image through
- **Solution:** Increase pixel size or use blur instead
