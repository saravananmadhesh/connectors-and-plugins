# Data Binding

Bind local or remote data to the Spreadsheet Editor — load data into sheets/ranges after initialization.

## Minimal Code

```cshtml
@using Syncfusion.EJ2.Spreadsheet
@using Syncfusion.EJ2.Data

@{
    // Data source
    var salesData = new List<object>()
    {
        new { Month = "Jan", Sales = 35 },
        new { Month = "Feb", Sales = 40 },
        new { Month = "Mar", Sales = 50 }
    };
}

@Html.EJS().Spreadsheet("spreadsheet").Created("onCreated").Sheets(sheet =>
    {
        sheet.Name("Sales").Ranges(ranges =>
            {
                ranges.DataSource(salesData).StartCell("A1").Add();
            }).Add();
    }).Render()

<script>
    function onCreated() {
        var spreadsheet = document.getElementById("spreadsheet").ej2_instances[0];

        // === Option 1: Local data (array of objects — most common) ===
        var localData = [
            { Product: 'Laptop', Category: 'Electronics', Price: 1200, Quantity: 5, Total: '=C2*D2' },
            { Product: 'Mouse', Category: 'Accessories', Price: 25, Quantity: 20, Total: '=C3*D3' },
            { Product: 'Keyboard', Category: 'Accessories', Price: 80, Quantity: 10, Total: '=C4*D4' },
            { Product: 'Monitor', Category: 'Electronics', Price: 350, Quantity: 3, Total: '=C5*D5' }
        ];

        spreadsheet.sheets[0].ranges = [{
            dataSource: localData,
            startCell: 'A1',
            showFieldAsHeader: true
        }];

        // === Option 2: Remote data via DataManager (REST/OData/JSON) ===
        var dataManager = new ej.data.DataManager({
            // SECURITY: Validate URL against allowlist of trusted domains before use
            url: 'url', // You can utilize your own API endpoint.
            adaptor: new ej.data.WebApiAdaptor()
        });

        var query = new ej.data.Query()
            .take(50)
            .select(['Product', 'Category', 'Price', 'Quantity']);

        spreadsheet.sheets[0].ranges = [{
            dataSource: dataManager,
            query: query,
            startCell: 'A1',
            showFieldAsHeader: true
        }];

        // === Option 3: 2D array (raw grid style, no headers) ===
        var gridData = [
            ['Product', 'Price', 'Quantity', 'Total'],
            ['Laptop', 1200, 5, '=B2*C2'],
            ['Mouse', 25, 20, '=B3*C3']
        ];

        spreadsheet.sheets[0].ranges = [{
            dataSource: gridData,
            startCell: 'A1',
            showFieldAsHeader: false
        }];
    }
</script>
```
## Placeholders

| Placeholder | Description | Example |
|---|---|---|
| `[DATA_SOURCE]` | Array of objects or DataManager instance | `[{Name: 'John', Age: 30}]` |
| `[RANGE]` | Cell range where data binds | `'A1:D100'` |
| `[KEY_FIELD]` | Primary key field name | `'id'`, `'productId'` |
| `[FIELDS]` | Column mappings | `{name: 'A', age: 'B', salary: 'C'}` |
| `[START_CELL]` | Starting cell for data | `'A1'`, `'A2'` |

## Notes

- **Best Practice**: Include headers in first row before binding data
- **Best Practice**: Use key field to track records for updates
- **Data Format**: Arrays of objects preferred (column names from object keys)
- **Performance**: Large datasets (100k+ rows) should use virtual scrolling
- **Updates**: Changes in bound data auto-sync to spreadsheet UI

## Placeholders
| Placeholder | Description | Example |
|---|---|---|
| [DATA_SOURCE] | Array of objects | [{ Name: 'John'}] |
| [RANGE] | Cell range | 'A1:D100' |
| [KEY_FIELD] | Primary key | 'id' |

## Notes
- Best Practice: Include headers
- Data Format: Arrays of objects
