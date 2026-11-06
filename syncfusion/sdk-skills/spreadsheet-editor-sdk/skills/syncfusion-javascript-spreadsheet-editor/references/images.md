# Images

Insert and remove images in the Spreadsheet Editor.

## Minimal Code

```typescript
import { Spreadsheet } from '@syncfusion/ej2-spreadsheet';

const spreadsheet: Spreadsheet = new Spreadsheet({
  allowImage: true,
  sheets: [{ name: 'Pictures' }]
});

spreadsheet.appendTo('#spreadsheet');

// === Insert Image ===
spreadsheet.insertImage([{
  src: 'url', // Replace with actual image url.
  id: 'img1',
  height: 100,
  width: 100,
  top: 10,
  left: 10
}], 'A1');

// === Remove Image ===
spreadsheet.deleteImage('img1');

// === Select Image ===
spreadsheet.selectImage('img1');

// === Deselect Image ===
spreadsheet.deselectImage();
```

## Placeholders

| Placeholder | Description | Example |
|---|---|---|
| `[IMAGE_PATH]` | URL or file path to image | `'https://example.com/logo.png'`, `'C:/images/chart.jpg'` |
| `[INSERT_RANGE]` | Cell where image anchors | `'A1'`, `'C5'` |
| `[IMAGE_WIDTH]` | Width in pixels (default: 400) | `200`, `400` |
| `[IMAGE_HEIGHT]` | Height in pixels (default: 300) | `150`, `300` |
| `[IMAGE_TOP]` | Top offset in pixels from anchor cell (default: 0) | `10`, `50` |
| `[IMAGE_LEFT]` | Left offset in pixels from anchor cell (default: 0) | `10`, `50` |
| `[IMAGE_ID]` | Unique identifier | `'image1'`, `'logoImg'` |

## Notes

- **Best Practice**: Use PNG or JPEG formats for best compatibility
- **Best Practice**: Compress images before inserting (large files slow spreadsheet)
- **URLs**: External URLs must be publicly accessible (no auth)
- **Size**: Pixels recommended (percentage can cause layout shifts)
- **Aspect Ratio**: Set either width or height; other auto-adjusts proportionally
- **Anchoring**: Image moves/resizes with cell by default
- **Transparency**: PNG transparency supported; JPEG not
- **Performance**: Many large images (10+) can slow rendering
- **Gotcha**: Relative file paths may not work; use absolute URLs or base64
- **Gotcha**: Images lost on Save As CSV (CSV doesn't support images)