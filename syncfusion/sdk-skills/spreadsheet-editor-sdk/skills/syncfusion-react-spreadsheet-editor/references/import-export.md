# Import & Export

Save and Open spreadsheets in different excel file formats.

## Minimal Code

```jsx
import * as React from 'react';
import { SheetsDirective, SheetDirective } from '@syncfusion/ej2-react-spreadsheet';
import { SpreadsheetComponent } from '@syncfusion/ej2-react-spreadsheet';

function Default() {
    const spreadsheetRef = React.useRef(null);
    let defaultData = [
      { Product: 'Laptop', Price: 1200, Quantity: 5, Total: '=B2*C2' },
      { Product: 'Mouse', Price: 25, Quantity: 20, Total: '=B3*C3' },
      { Product: 'Keyboard', Price: 80, Quantity: 10, Total: '=B4*C4' }
    ];
    //Bind created event to perform the action during initial load.
    const onCreated = () => {
      const spreadsheet = spreadsheetRef.current; 
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
    };
    //To save the Spreadsheet as blob data, configure the beforeSave and saveComplete event before saving/exporting the Spreadsheet.
    const beforeSave = (args) => {
      args.needBlobData = true; // To trigger the saveComplete event.
      args.isFullPost = false; // Get the spreadsheet data as blob data in the saveComplete event.
    };
    const saveComplete = (args) => {
      // To obtain the blob data.
      console.log("Spreadsheet BlobData :", args.blobData)
    };

  // Rule: Mandatory to add openUrl and saveUrl to perform open and save in Spreadsheet.
  // The openUrl and saveUrl shown below are for demonstration only. For development and production, replace them with your own server endpoints.
    return (<SpreadsheetComponent openUrl='https://document.syncfusion.com/web-services/spreadsheet-editor/api/spreadsheet/open' saveUrl='https://document.syncfusion.com/web-services/spreadsheet-editor/api/spreadsheet/save' ref={spreadsheetRef} allowOpen={true} allowSave={true} created={onCreated} beforeSave={beforeSave} saveComplete={saveComplete}>
                    <SheetsDirective>
                        <SheetDirective name="Report">
                        </SheetDirective>
                    </SheetsDirective>
                </SpreadsheetComponent>);
}
export default Default;
```

## Placeholders

| Placeholder | Description | Example |
|---|---|---|
| `[EXPORT_TYPE]` | Export file format | `'xlsx'`, `'csv'`, `'pdf'` |
| `[FILE_NAME]` | Output file name (without extension) | `'Sales Report'`, `'Q4 Results'` |
| `[FILE_PATH]` | File path for open | `'C:/exports/report.xlsx'` |

