# Images

Insert and remove images in the Spreadsheet Editor.

## Minimal Code

```vue
<template>
  <div class="control-section">
    <ejs-spreadsheet ref="spreadsheet" :allowImage="true" :created="onCreated">
      <e-sheets>
        <e-sheet name="Images"></e-sheet>
      </e-sheets>
    </ejs-spreadsheet>
  </div>
</template>

<script>
import {
  SpreadsheetComponent,
  SheetsDirective,
  SheetDirective,
} from '@syncfusion/ej2-vue-spreadsheet';

export default {
  components: {
    'ejs-spreadsheet': SpreadsheetComponent,
    'e-sheets': SheetsDirective,
    'e-sheet': SheetDirective,
  },

  methods: {
    onCreated() {
      const spreadsheet = this.$refs.spreadsheet;

      // === Insert Image ===
      spreadsheet.insertImage(
        [
          {
            src: 'url', // Replace with actual image url.
            height: 100,
            width: 100,
            id: 'img1',
          },
        ],
        'A1'
      );

      // === Remove Image ===
      //s.deleteImage("img1");
      // === Select Image ===
      spreadsheet.selectImage('img1');
      // === Deselect Image ===
      spreadsheet.deselectImage();
    },
  },
};
</script>

```

## Placeholders

| Placeholder | Description | Example |
|---|---|---|
| `[IMAGE_PATH]` | URL or file path to image | `'https://example.com/logo.png'`, `'C:/images/chart.jpg'` |
| `[INSERT_RANGE]` | Cell where image anchors | `'A1'`, `'C5'` |
| `[IMAGE_WIDTH]` | Width in pixels or percentage | `200`, `'50%'` |
| `[IMAGE_HEIGHT]` | Height in pixels or percentage | `150`, `'50%'` |
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

## Placeholders
| Placeholder | Description | Example |
|---|---|---|
| [IMAGE_PATH] | URL or file path | 'https://example.com/logo.png' |
| [INSERT_RANGE] | Cell anchor | 'A1' |
| [IMAGE_WIDTH] | Width in pixels | 200 |
| [IMAGE_HEIGHT] | Height in pixels | 150 |
| [IMAGE_ID] | Unique identifier | 'image1' |

## Notes
- Best Practice: Use PNG or JPEG formats
- Best Practice: Compress images before inserting
- URLs: Must be publicly accessible
- Anchoring: Image moves/resizes with cell
- Performance: Many large images can slow rendering
