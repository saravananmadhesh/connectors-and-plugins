# Import & Export

Save, open, and print spreadsheets in different formats.

## Minimal Code

**Controller (`HomeController.cs`):**

```csharp
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using Syncfusion.EJ2.Spreadsheet;

namespace YourApp.Controllers
{
    public class HomeController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }

        public IActionResult Open(IFormCollection openRequest)
        {
            OpenRequest open = new OpenRequest();
            open.File = openRequest.Files[0];
            return Content(Workbook.Open(open));
        }
 
        public IActionResult Save(SaveSettings saveSettings)
        {
            if (saveSettings != null && saveSettings.JSONData != null)
            {
                return Workbook.Save(saveSettings);
            }
            return View();
        }
 
    }
}
```

**View (`Index.cshtml`):**
```cshtml
@using Syncfusion.EJ2.Spreadsheet

<div class="control-pane">
    <div class="control-section spreadsheet-control">
        @* Rule: Mandatory to add openUrl and saveUrl to perform open and save in Spreadsheet. *@
        <ejs-spreadsheet id="spreadsheet"
            openUrl="Open"
            saveUrl="Save"
            allowOpen="true"
            allowSave="true"
            created="onCreated"
            beforeSave="beforeSave"
            saveComplete="saveComplete">
            <e-spreadsheet-sheets>
                <e-spreadsheet-sheet name="Report">
                </e-spreadsheet-sheet>
            </e-spreadsheet-sheets>
        </ejs-spreadsheet>
    </div>
</div>

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

      // === To load an excel file from URL/ remote excel file into Spreadsheet.
      // SECURITY: Validate URL against allowlist of trusted domains before use
      var response = await fetch('URL'); // Replace your actual file path
      var fileBlob = await response.blob(); // convert the excel file to blob
      var file = new File([fileBlob], 'Sample.xlsx'); //convert the blob into file
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
</script>

```

## Placeholders

| Placeholder | Description | Example |
|---|---|---|
| `[EXPORT_TYPE]` | Export file format | `'xlsx'`, `'csv'`, `'pdf'` |
| `[FILE_NAME]` | Output file name (without extension) | `'Sales Report'`, `'Q4 Results'` |
| `[FILE_PATH]` | File path for open | `'C:/exports/report.xlsx'` |