# Import & Export

Save, open, and print spreadsheets in different formats.

## Minimal Code

**Controller (`HomeController.cs`):**

```csharp
using System;
using System.Collections.Generic;
using System.Web;
using System.Web.Mvc;
using Syncfusion.EJ2.Spreadsheet;

namespace YourApp.Controllers
{
    public class SpreadsheetController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult Open(OpenRequest openRequest)
        {
            return Content(Workbook.Open(openRequest));
        }
 
        public void Save(SaveSettings saveSettings)
        {
            if (saveSettings != null && saveSettings.JSONData != null)
            {
                Workbook.Save(saveSettings);
            }
        }
 
    }
}
```

**View (`Index.cshtml`):**

```cshtml
@using Syncfusion.EJ2
@using Syncfusion.EJ2.Spreadsheet

@*Rule: Mandatory to add openUrl and saveUrl to perform open and save in Spreadsheet.*@
@Html.EJS().Spreadsheet("spreadsheet").OpenUrl("Open").SaveUrl("Save").AllowOpen(true).AllowSave(true).Created("onCreated").BeforeSave("beforeSave").SaveComplete("saveComplete").Sheets(sheet =>
    {
        sheet.Name("Report").Add();
    }).Render()

<script>
    var defaultData = [
        { Product: 'Laptop', Price: 1200, Quantity: 5, Total: '=B2*C2' },
        { Product: 'Mouse', Price: 25, Quantity: 20, Total: '=B3*C3' },
        { Product: 'Keyboard', Price: 80, Quantity: 10, Total: '=B4*C4' }
    ];
    
    //To save the Spreadsheet as blob data, configure the beforeSave and saveComplete event before saving/exporting the Spreadsheet.
    function beforeSave(args) {
      args.needBlobData = true; // To trigger the saveComplete event.
      args.isFullPost = false; // Get the spreadsheet data as blob data in the saveComplete event.
    }
    
    function saveComplete(args) {
      // To obtain the blob data.
      console.log("Spreadsheet BlobData :", args.blobData)
    }

    //Bind created event to perform the action during initial load.
    function onCreated() {
        var spreadsheet = document.getElementById("spreadsheet").ej2_instances[0]; 

        // === Save (to server — saveUrl must be set) ===
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

        // === To load an excel file from URL/ remote excel file into Spreadsheet ===
        // SECURITY: Validate URL against allowlist of trusted domains before use
        var response = fetch('URL'); // Replace your actual file path
        response.then(res => res.blob()).then(fileBlob => {
            var file = new File([fileBlob], 'Sample.xlsx'); //convert the blob into file
            if (spreadsheet) {
                //Make sure that the openUrl is defined while perform import operation (open file into Spreadsheet)
                spreadsheet.open({ file }); // open the file into Spreadsheet
            }
        });

        // === To load an excel file into the Spreadsheet ===
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
</script>

```

## Placeholders

| Placeholder | Description | Example |
|---|---|---|
| `[EXPORT_TYPE]` | Export file format | `'xlsx'`, `'csv'`, `'pdf'` |
| `[FILE_NAME]` | Output file name (without extension) | `'Sales Report'`, `'Q4 Results'` |
| `[FILE_PATH]` | File path for open | `'C:/exports/report.xlsx'` |