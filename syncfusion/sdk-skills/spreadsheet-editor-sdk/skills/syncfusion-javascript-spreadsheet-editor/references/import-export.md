# Import & Export

Save and Open spreadsheets in different excel file formats.

## Minimal Code

```typescript
import { Spreadsheet, BeforeSaveEventArgs, SaveCompleteEventArgs } from '@syncfusion/ej2-spreadsheet';

const spreadsheet: Spreadsheet = new Spreadsheet({
  // Rule: Mandatory to add openUrl and saveUrl to perform open and save in Spreadsheet.
  // The openUrl and saveUrl shown below are for demonstration only. For development and production, replace them with your own server endpoints.
  openUrl: 'https://document.syncfusion.com/web-services/spreadsheet-editor/api/spreadsheet/open',
  saveUrl: 'https://document.syncfusion.com/web-services/spreadsheet-editor/api/spreadsheet/save',

  sheets: [{ name: 'Report' }],

  //To save the Spreadsheet as blob data, configure the beforeSave and saveComplete event before saving/exporting the Spreadsheet.
  beforeSave: (args: BeforeSaveEventArgs): void => {
    args.needBlobData = true; // To trigger the saveComplete event.
    args.isFullPost = false; // Get the spreadsheet data as blob data in the saveComplete event.
  },
  saveComplete: (args: SaveCompleteEventArgs): void => {
    // To obtain the blob data.
    console.log("Spreadsheet BlobData :", args.blobData)
  },
  //Bind created event to perform the action during initial load.
  created: (): void => {
    // === Save (saveUrl must be set to send request to server) ===
    // saveType values: 'Xlsx' | 'Xls' | 'Csv' | 'Pdf'
    spreadsheet.save({ saveType: 'Xlsx', fileName: 'SalesReport' });
    spreadsheet.save({ saveType: 'Csv', fileName: 'SalesReport' });
    spreadsheet.save({ saveType: 'Pdf', fileName: 'SalesReport' });
    
    // === Save with explicit server URL (overrides saveUrl property) ===
    // NOTE: Replace the URL with a valid endpoint in your own backend.
    spreadsheet.save({
      // SECURITY: Validate URL against allowlist of trusted domains before use
      url: 'URL',
      fileName: '[FILE_NAME]',
      saveType: '[EXPORT_TYPE]'
    });

    // === To load an excel file from URL/ remote excel file into Spreadsheet.
    // SECURITY: Validate URL against allowlist of trusted domains before use
    const response = await fetch('url'); // Replace your actual file path
    const fileBlob = await response.blob(); // convert the excel file to blob
    const file = new File([fileBlob], 'Sample.xlsx'); //convert the blob into file
    if (spreadsheet) {
      //Make sure that the openUrl is defined while perform import operation (open file into Spreadsheet)
        spreadsheet.open({ file }); // open the file into Spreadsheet
    };

    // === To load an excel file into the Spreadsheet.
    //If there is an exisiting file object, we can pass the file directly to the open method.
    //RULE: The openUrl and saveUrl must be defined for performing file open and save operations.
    spreadsheet.open({ file: file })
    // === Open (file input) ===
    spreadsheet.open({ file: fileInput.files[0] });

    // === Save as JSON ===
    // Persist workbook state as JSON (for DB/API/localStorage)
    spreadsheet.saveAsJson().then(json => {
      console.log(json);
      response = json;
    });

    // === Open from JSON ===
    // Restore workbook state from JSON object returned from saveAsJson
    spreadsheet.openFromJson({ file: response.jsonObject });
    // Open the workbook
    //spreadsheet.openFromJson({ file: workbook_Json})
  }
});

spreadsheet.appendTo('#spreadsheet');
```

## Placeholders

| Placeholder | Description | Example |
|---|---|---|
| `[EXPORT_TYPE]` | Export file format | `'xlsx'`, `'csv'`, `'pdf'` |
| `[FILE_NAME]` | Output file name (without extension) | `'Sales Report'`, `'Q4 Results'` |
| `[FILE_PATH]` | File path for open | `'C:/exports/report.xlsx'` |
