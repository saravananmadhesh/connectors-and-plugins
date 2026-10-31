
# Import & Export

Save and Open spreadsheets in different excel file formats.

## Minimal Vue Code

```vue
<template>
// Rule: Mandatory to add openUrl and saveUrl to perform open and save in Spreadsheet.
// The openUrl and saveUrl shown below are for demonstration only. For development and production, replace them with your own server endpoints.
<ejs-spreadsheet
  ref="spreadsheet"
  openUrl="https://document.syncfusion.com/web-services/spreadsheet-editor/api/spreadsheet/open"
  saveUrl="https://document.syncfusion.com/web-services/spreadsheet-editor/api/spreadsheet/save"
  :allowOpen="true"
  :allowSave="true"
  :created="onCreated"
  :beforeSave="beforeSave"
  :saveComplete="saveComplete"
>
  <e-sheets>
    <e-sheet name="Report">
      <e-ranges>
        <e-range :dataSource="defaultData"></e-range>
      </e-ranges>
    </e-sheet>
  </e-sheets>
</ejs-spreadsheet>
</template>

<script>
import {
SpreadsheetComponent,
SheetsDirective,
SheetDirective,
RangesDirective,
RangeDirective
} from "@syncfusion/ej2-vue-spreadsheet";

export default {
components: {
  "ejs-spreadsheet": SpreadsheetComponent,
  "e-sheets": SheetsDirective,
  "e-sheet": SheetDirective,
  "e-ranges": RangesDirective,
  "e-range": RangeDirective
},
data() {
  return {
    defaultData: [
      { Product: 'Laptop', Price: 1200, Quantity: 5, Total: '=B2*C2' },
      { Product: 'Mouse', Price: 25, Quantity: 20, Total: '=B3*C3' },
      { Product: 'Keyboard', Price: 80, Quantity: 10, Total: '=B4*C4' }
    ],
    response: null
  };
},
methods: {
  async onCreated() {
    const spreadsheet = this.$refs.spreadsheet;
    // === Save (saveUrl must be set to send request to server) ===
    // saveType values: 'Xlsx' | 'Xls' | 'Csv' | 'Pdf'
    spreadsheet.save({ saveType: 'xlsx', fileName: 'SalesReport' });
    spreadsheet.save({ saveType: 'csv', fileName: 'SalesReport' });
    spreadsheet.save({ saveType: 'pdf', fileName: 'SalesReport' });
    // === Save with explicit server URL (overrides saveUrl property) ===
    // NOTE: Replace the URL with a valid endpoint in your own backend.
    spreadsheet.save({
      // SECURITY: Validate URL against allowlist of trusted domains before use
      url: 'URL',
      fileName: 'Sample',
      saveType: 'xlsx'
    });

    // === To load an excel file from URL/ remote excel file into Spreadsheet.
    // SECURITY: Validate URL against allowlist of trusted domains before use
    const response = await fetch('url'); // Replace your actual file path
    const fileBlob = await response.blob(); // convert the excel file to blob
    const file = new File([fileBlob], 'Sample.xlsx'); //convert the blob into file
    if (spreadsheet) {
      //Make sure that the openUrl is defined while perform import operation (open file into Spreadsheet)
      spreadsheet.open({ file }); // open the file into Spreadsheet
    }

    // === To load an excel file into the Spreadsheet.
    //If there is an existing file object, we can pass the file directly to the open method.
    //RULE: The openUrl and saveUrl must be defined for performing file open and save operations.
    spreadsheet.open({ file: file });
    // === Open (file input) ===
    // spreadsheet.open({ file: fileInput.files[0] });

    // === Save as JSON ===
    // Persist workbook state as JSON (for DB/API/localStorage)
    spreadsheet.saveAsJson().then(json => {
      console.log(json);
      this.response = json;
    });

    // === Open from JSON ===
    // Restore workbook state from JSON object returned from saveAsJson
    spreadsheet.openFromJson({ file: this.response?.jsonObject });
    // Open the workbook
    // spreadsheet.openFromJson({ file: workbook_Json })
  },
  beforeSave(args) {
    args.needBlobData = true; // To trigger the saveComplete event.
    args.isFullPost = false; // Get the spreadsheet data as blob data in the saveComplete event.
  },
  saveComplete(args) {
    // To obtain the blob data.
    console.log("Spreadsheet BlobData :", args.blobData);
  }
}
};
</script>
```

## Placeholders

| Placeholder | Description | Example |
|---|---|---|
| `[EXPORT_TYPE]` | Export file format | `'xlsx'`, `'csv'`, `'pdf'` |
| `[FILE_NAME]` | Output file name (without extension) | `'Sales Report'`, `'Q4 Results'` |
| `[FILE_PATH]` | File path for open | `'C:/exports/report.xlsx'` |

