# Images

Insert and remove images in the Spreadsheet using `insertImage()` and `deleteImage()`.

## Minimal Angular Code

```typescript
import { Component, ViewChild } from '@angular/core';
import { SpreadsheetAllModule, SpreadsheetComponent } from '@syncfusion/ej2-angular-spreadsheet';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [SpreadsheetAllModule],
  template:
  `<ejs-spreadsheet #spreadsheet [allowImage]="true">
    <e-sheets>
      <e-sheet name="Pictures"></e-sheet>
    </e-sheets>
  </ejs-spreadsheet>`
})
export class AppComponent {
  @ViewChild('spreadsheet') spreadsheet!: SpreadsheetComponent;

  // Insert image
  insert(): void {
    this.spreadsheet.insertImage([{
      src: 'url', // Replace with actual image url.
      id: 'img1',
      height: 100,
      width: 100,
      top: 10,
      left: 10
    }], 'A1');
  }

  // Remove image
  remove(): void {
    this.spreadsheet.deleteImage('img1');
  }

  // Select image
  select(): void {
    this.spreadsheet.selectImage('img1');
  }

  // Deselect image
  deselect(): void {
    this.spreadsheet.deselectImage();
  }
}
```

## API Reference

### insertImage(images, range)

| Parameter | Type | Description | Example |
|---|---|---|---|
| `src` | `string` | URL or base64 of the image | `'https://example.com/logo.png'` |
| `id` | `string` | Unique identifier for the image | `'img1'` |
| `height` | `number` | Height in pixels (default: 300) | `100`, `300` |
| `width` | `number` | Width in pixels (default: 400) | `100`, `400` |
| `top` | `number` | Top offset in pixels from anchor cell (default: 0) | `10`, `50` |
| `left` | `number` | Left offset in pixels from anchor cell (default: 0) | `10`, `50` |
| `range` | `string` | Cell where image anchors | `'A1'`, `'C5'` |

### Other Methods

| Method | Description | Example |
|---|---|---|
| `deleteImage(id)` | Remove image by id | `deleteImage('img1')` |
| `selectImage(id)` | Select image by id | `selectImage('img1')` |
| `deselectImage()` | Deselect current image | `deselectImage()` |

## Notes

- `[allowImage]="true"` must be set at initialization
- External URLs must be publicly accessible (no auth)
- Use PNG or JPEG for best compatibility
- PNG transparency is supported; JPEG is not
- Images are lost when saving as CSV