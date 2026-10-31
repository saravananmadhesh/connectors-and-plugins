# Import & Export

Open(Import) and Save(Export) spreadsheets in different excel file formats.

## Minimal Angular Code

```typescript
import { Component, ViewChild, ElementRef } from '@angular/core';
import { SpreadsheetAllModule, SpreadsheetComponent } from '@syncfusion/ej2-angular-spreadsheet';
import { BeforeSaveEventArgs, SaveCompleteEventArgs } from '@syncfusion/ej2-spreadsheet';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [SpreadsheetAllModule],
  // Rule: Mandatory to add openUrl and saveUrl to perform open and save in Spreadsheet.
  // The openUrl and saveUrl shown below are for demonstration only. For development and production, replace them with your own server endpoints.
  template:
  `<ejs-spreadsheet #spreadsheet
    openUrl="https://document.syncfusion.com/web-services/spreadsheet-editor/api/spreadsheet/open"
    saveUrl="https://document.syncfusion.com/web-services/spreadsheet-editor/api/spreadsheet/save"
    [allowOpen]="true"
    [allowSave]="true"
    (created)="onCreated()"
    (beforeSave)="onBeforeSave($event)"
    (saveComplete)="onSaveComplete($event)">
    <e-sheets>
      <e-sheet name="Report"></e-sheet>
    </e-sheets>
  </ejs-spreadsheet>`
})
export class AppComponent {
  @ViewChild('spreadsheet') spreadsheet!: SpreadsheetComponent;
  @ViewChild('fileInput') fileInput!: ElementRef;

  private jsonResponse: any;

  onCreated(): void { }

  // === Save ===

  // Save as XLSX
  saveXlsx(): void {
    this.spreadsheet.save({ saveType: 'Xlsx', fileName: 'SalesReport' });
  }

  // Save as CSV
  saveCsv(): void {
    this.spreadsheet.save({ saveType: 'Csv', fileName: 'SalesReport' });
  }

  // Save as PDF
  savePdf(): void {
    this.spreadsheet.save({ saveType: 'Pdf', fileName: 'SalesReport' });
  }

  // Save with explicit server URL (overrides saveUrl property)
  saveWithUrl(): void {
    // NOTE: Replace the URL with a valid endpoint in your own backend.
    this.spreadsheet.save({
      // SECURITY: Validate URL against allowlist of trusted domains before use
      url: 'url',
      fileName: 'SalesReport',
      saveType: 'Xlsx'
    });
  }

  // === Open ===

  // Open from local file input
  onFileChange(args: Event): void {
    const input = args.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.spreadsheet.open({ file: input.files[0] });
    }
  }

  // Open from remote URL
  async openFromUrl(): Promise<void> {
    // SECURITY: Validate URL against allowlist of trusted domains before use
    const response = await fetch('url'); // Replace your actual file path
    const fileBlob = await response.blob();
    const file     = new File([fileBlob], 'Sample.xlsx');
    this.spreadsheet.open({ file });
  }

  // === JSON ===

  // Save workbook state as JSON (for DB / API / localStorage)
  saveJson(): void {
    this.spreadsheet.saveAsJson().then((json: any) => {
      this.jsonResponse = json;
      console.log('Workbook JSON:', json);
    });
  }

  // Restore workbook from JSON
  openJson(): void {
    this.spreadsheet.openFromJson({ file: this.jsonResponse.jsonObject });
  }

  // === Blob Data ===

  // beforeSave — request blob output instead of posting to server
  onBeforeSave(args: BeforeSaveEventArgs): void {
    args.needBlobData = true;  // trigger saveComplete with blob
    args.isFullPost   = false; // return blob data instead of full POST
  }

  // saveComplete — access blob data
  onSaveComplete(args: SaveCompleteEventArgs): void {
    console.log('Blob Data:', args.blobData);
  }
}
```

## API Reference

### save(saveOptions)

| Property | Type | Description | Example |
|---|---|---|---|
| `saveType` | `string` | Export format | `'Xlsx'`, `'Xls'`, `'Csv'`, `'Pdf'` |
| `fileName` | `string` | Output file name without extension | `'SalesReport'` |
| `url` | `string` | Override server endpoint for this save only | `'https://document.syncfusion.com/web-services/spreadsheet-editor/api/spreadsheet/save'` |

### open(openOptions)

| Property | Type | Description | Example |
|---|---|---|---|
| `file` | `File` | File object from input or fetch | `input.files[0]`, `new File([blob], 'file.xlsx')` |

### saveAsJson()

Returns a `Promise` resolving to `{ jsonObject: {...} }` — the full workbook state as JSON.

### openFromJson(jsonOptions)

| Property | Type | Description |
|---|---|---|
| `file` | `object` | JSON object returned from `saveAsJson()` — use `response.jsonObject` |

### Spreadsheet Properties

| Property | Type | Description | Example |
|---|---|---|---|
| `openUrl` | `string` | Server endpoint for open operations | `'https://document.syncfusion.com/web-services/spreadsheet-editor/api/spreadsheet/open'` |
| `saveUrl` | `string` | Server endpoint for save operations | `'https://document.syncfusion.com/web-services/spreadsheet-editor/api/spreadsheet/save'` |
| `[allowOpen]` | `boolean` | Enable file open | `true` |
| `[allowSave]` | `boolean` | Enable file save | `true` |

### beforeSave Event (BeforeSaveEventArgs)

| Property | Type | Description |
|---|---|---|
| `args.needBlobData` | `boolean` | Set `true` to receive blob in `saveComplete` instead of posting to server |
| `args.isFullPost` | `boolean` | Set `false` to return blob; `true` posts full form to server |
| `args.cancel` | `boolean` | Set `true` to cancel save |

### saveComplete Event (SaveCompleteEventArgs)

| Property | Type | Description |
|---|---|---|
| `args.blobData` | `Blob` | Blob data — only available when `needBlobData: true` and `isFullPost: false` |
| `args.status` | `string` | Save status — `'Success'` or `'Failure'` |

## Notes

- `openUrl` and `saveUrl` are **mandatory** for file open and save operations
- `[allowOpen]="true"` and `[allowSave]="true"` must be set at initialization
- `saveAsJson()` / `openFromJson()` do **not** require `openUrl` / `saveUrl` — purely client-side
- To open a remote file: `fetch` → `blob()` → `new File([blob], 'name.xlsx')` → `open({ file })`
- `beforeSave` + `saveComplete` with `needBlobData: true` and `isFullPost: false` returns blob — useful for custom upload logic
- CSV export loses formatting, formulas, and multi-sheet data — plain values only