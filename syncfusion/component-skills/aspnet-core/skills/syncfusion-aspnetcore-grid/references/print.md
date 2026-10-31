# Print — Syncfusion ASP.NET Core Grid

## Table of Contents
- [Print via Toolbar](#print-via-toolbar)
- [Programmatic Print](#programmatic-print)
- [Print Hidden Columns](#print-hidden-columns)
- [Print All Pages vs Current Page](#print-all-pages-vs-current-page)
- [Page Setup](#page-setup)
- [Print Events](#print-events)

## When to Use This

- Enable grid printing functionality
- Customize page layout and setup
- Control which columns and pages to print
- Add print events and custom behaviors
- Handle hidden columns in print output

---

## Print via Toolbar

Add `Print` to the toolbar to show a Print button:

```cshtml
<ejs-grid id="Grid" dataSource="@ViewBag.DataSource" toolbar="@(new List<string>() { "Print" })">
    <e-grid-columns>
        <e-grid-column field="OrderID" headerText="Order ID" width="120"></e-grid-column>
        <e-grid-column field="CustomerID" headerText="Customer ID" width="150"></e-grid-column>
    </e-grid-columns>
</ejs-grid>
```

---

## Programmatic Print

Trigger print from a button click using the `print()` method:

```javascript
document.getElementById('printBtn').onclick = function() {
    document.getElementById('Grid').ej2_instances[0].print();
};
```

---

## Print Hidden Columns

By default, hidden columns are not included in the print output.

```cshtml
<ejs-grid id="Grid" dataSource="@ViewBag.DataSource" toolbar="@(new List<string>() { "Print" })" toolbarClick='toolbarClick' printComplete='printComplete'>
    <e-grid-columns>
    /* ... */
    </e-grid-columns>
</ejs-grid>
```

To include hidden columns in print, use `toolbarClick` event to make them visible temporarily:

```javascript
function toolbarClick(args) {
    // Show hidden columns before printing
    var grid = document.getElementById('Grid').ej2_instances[0];
    grid.columns.forEach(function(col) {
        col.visible = true;
    });
}

function printComplete(args) {
    // Restore visibility after printing
    var grid = document.getElementById('Grid').ej2_instances[0];
    grid.columns[2].visible = false; // hide again
}
```

---

## Print All Pages vs Current Page

Control which pages are printed using the `printMode` property:

```cshtml
<ejs-grid id="Grid" dataSource="@ViewBag.DataSource" allowPaging="true"
          printMode="AllPages">
    <e-grid-pagesettings pageSize="10"></e-grid-pagesettings>
</ejs-grid>
```

| `printMode` | Behavior |
|---|---|
| `AllPages` | Prints all data pages |
| `CurrentPage` (default) | Prints only the current visible page |

---

## Page Setup

Browser print options (paper size, orientation, margins) must be configured in the browser's **Page Setup** dialog — they cannot be set via JavaScript:

- **Chrome:** Menu → Print → More settings
- **Firefox:** File → Page Setup
- **Edge:** Menu → Print → More settings

---

## Print Events

Use `beforePrint` and `printComplete` events for custom logic:

```cshtml
<ejs-grid id="Grid" beforePrint="beforePrintFn" printComplete="printCompleteFn">
```

```javascript
function beforePrintFn(args) {
    console.log('About to print...');
    // Modify grid before printing
}

function printCompleteFn(args) {
    console.log('Print done.');
    // Restore any changes made in beforePrint
}
```
