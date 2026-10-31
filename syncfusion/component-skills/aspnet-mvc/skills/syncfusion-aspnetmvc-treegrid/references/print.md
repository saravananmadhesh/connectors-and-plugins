# Print in Tree Grid

## Table of Contents
- [When to Use This](#when-to-use-this)
- [Print Method](#print-method)
- [Page Setup & Scale](#page-setup--scale)
- [Print Using External Button](#print-using-external-button)
- [Print Modes & Show/Hide Columns](#print-modes--showhide-columns)
- [Limitations](#limitations)
- [Notes & References](#notes--references)

## When to Use This

Use the print feature when you need to:
- Provide a quick printable view of grid data for users
- Print the current page or the entire dataset from the browser
- Temporarily alter visible columns for print output

## Print Method

Invoke the `print()` method on the Tree Grid instance. Add the built-in `Print` toolbar item to show a print button.

```cshtml
@(Html.EJS().TreeGrid("TreeGrid")
  .DataSource((IEnumerable<object>)ViewBag.datasource)
  .Columns(col => { /* columns */ })
  .Height(265)
  .ChildMapping("Children")
  .TreeColumnIndex(1)
  .Toolbar(new List<string>() { "Print" })
  .Render())
```

Or call from an external button:

```html
@Html.EJS().Button("print").Content("Print").Render()

<script>
  document.getElementById('print').onclick = function () {
    var treegrid = document.getElementById("TreeGrid").ej2_instances[0];
    treegrid.print();
  }
</script>
```

## Page Setup & Scale

Some print options (paper size, margins) must be configured via the browser's print dialog. For large numbers of columns, adjust the print scale in the browser print preview to avoid clipped columns.

## Print Modes & Show/Hide Columns

- `PrintMode.CurrentPage` prints only the current page; default prints all pages.
- Use `ToolbarClick` and `PrintComplete` events to show/hide columns before printing and restore state after print.

```js
// Pseudocode
if (args.item.text === 'Print') {
  // toggle visibility for columns
}
function printComplete() {
  // restore visibility
}
```

## Limitations

- Printing very large datasets may cause browser slowdowns or hangs because rendering all DOM elements is expensive.
- For very large exports consider exporting to Excel/CSV/PDF and printing from a different application.

## Notes & References
- Use `PrintMode` to control whether to print the current page or all pages.
- Adjust browser print options for best results.