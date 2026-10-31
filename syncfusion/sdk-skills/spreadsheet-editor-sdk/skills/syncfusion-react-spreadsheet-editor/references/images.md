# Images

Insert and remove images in the Spreadsheet Editor.

## Minimal Code

```jsx
import * as React from 'react';
import { SheetsDirective, SheetDirective } from '@syncfusion/ej2-react-spreadsheet';
import { SpreadsheetComponent } from '@syncfusion/ej2-react-spreadsheet';

function Default() {
    const spreadsheetRef = React.useRef(null);

    //Bind created event to perform the action during initial load.
    const onCreated = () => {
      const spreadsheet = spreadsheetRef.current; 
      // === Insert Image ===
      // Insert an image from a URL
      spreadsheet.insertImage([{
        src: 'url', // Replace with actual image url.
        id: 'img1',
        height: 100,
        width: 100,
        top: 10,
        left: 10
      }], 'A1');

      // === Remove Image ===
      // Remove an image by ID
      spreadsheet.deleteImage('img1');

      // === Select Image ===
      // Select an image by ID
      spreadsheet.selectImage('img1');

      // === Deselect Image ===
      // Remove selection from the active image
      spreadsheet.deselectImage();
    };
    return (<SpreadsheetComponent ref={spreadsheetRef} allowImage={true} created={onCreated}>
                    <SheetsDirective>
                        <SheetDirective name="Links">
                        </SheetDirective>
                    </SheetsDirective>
                </SpreadsheetComponent>);
}
export default Default;

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
- **Gotcha**: Relative file paths may not work; use absolute URLs or base64
- **Gotcha**: Images lost on Save As CSV (CSV doesn't support images)

## Placeholders
| Placeholder | Description | Example |
|---|---|---|
| [IMAGE_PATH] | URL or file path | 'https://example.com/logo.png' |
| [INSERT_RANGE] | Cell anchor | 'A1' |
| [IMAGE_WIDTH] | Width in pixels | 200 |
| [IMAGE_HEIGHT] | Height in pixels | 150 |
| [IMAGE_ID] | Unique identifier | 'image1' |

## Notes
- Use PNG or JPEG formats
- URLs: Must be publicly accessible
