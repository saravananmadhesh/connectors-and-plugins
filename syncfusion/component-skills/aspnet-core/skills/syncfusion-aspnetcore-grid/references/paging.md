# Paging — Syncfusion ASP.NET Core Grid

## Table of Contents
- [Enable Paging](#enable-paging)
- [Change Page Size](#change-page-size)
- [Page Count](#page-count)
- [Page Size Dropdown](#page-size-dropdown)
- [Current Page](#current-page)
- [Pager Template](#pager-template)
- [External Paging / Navigate to Page](#external-paging--navigate-to-page)

## When to Use This

- Paginate large datasets
- Improve performance with chunked data loading
- Customize page size and navigation
- Display pager templates
- Navigate between pages programmatically
- [Paging Events](#paging-events)

---

## Enable Paging

Set `allowPaging="true"`. Configure with `<e-grid-pagesettings>`:

```cshtml
<ejs-grid id="Grid" dataSource="@ViewBag.DataSource" allowPaging="true">
    <e-grid-pagesettings pageSize="10"></e-grid-pagesettings>
</ejs-grid>
```

The default `pageSize` is **12**. The pager renders at the bottom of the grid.

---

## Change Page Size

Use `pageSize` inside `<e-grid-pagesettings>` to control records per page:

```cshtml
<ejs-grid id="Grid" dataSource="@ViewBag.DataSource" allowPaging="true">
    <e-grid-pagesettings pageSize="10"></e-grid-pagesettings>
</ejs-grid>
```

Change page size at runtime via JavaScript:

```javascript
var grid = document.getElementById('Grid').ej2_instances[0];
grid.pageSettings.pageSize = 20;
```

---

## Page Count

Control how many page numbers appear in the pager using `pageCount`:

```cshtml
<ejs-grid id="Grid" dataSource="@ViewBag.DataSource" allowPaging="true">
    <e-grid-pagesettings pageSize="10" pageCount="5"></e-grid-pagesettings>
</ejs-grid>
```

---

## Page Size Dropdown

Let users pick page size from a dropdown using `pageSizes`:

```cshtml
<ejs-grid id="Grid" dataSource="@ViewBag.DataSource" allowPaging="true">
    <e-grid-pagesettings pageSize="10" pageSizes="true"></e-grid-pagesettings>
</ejs-grid>
```

Or specify custom size values:

```cshtml
<e-grid-pagesettings pageSizes="@(new int[]{5,10,20,50})"></e-grid-pagesettings>
```

---

## Current Page

Navigate to a specific page on load using `currentPage`:

```cshtml
<e-grid-pagesettings pageSize="10" currentPage="3"></e-grid-pagesettings>
```

---

## Pager Template

Customize the pager UI using the `template` property:

```cshtml
<ejs-grid id="Grid" dataSource="@ViewBag.dataSource" dataBound="dataBound" pagerTemplate="#pagerTemplate" actionComplete="actionComplete" allowPaging="true">
    <e-grid-pagesettings pageSize=10>
    </e-grid-pagesettings>
    <e-grid-columns>
    /* ... */
    </e-grid-columns>
</ejs-grid>

<script id="pagerTemplate" type="text/x-template">
    <div class="e-pagertemplate">
        <div>
            <div class="content-wrapper">
                <input id="currentPage" type="text" value=${currentPage}>
            </div>
        </div>
        <div id="totalPages" class="e-pagertemplatemessage" style="margin-top:5px;margin-left:30px;border: none; display: inline-block ">
            <span class="e-pagenomsg">${currentPage} of ${totalPages} pages (${totalRecordsCount} items)</span>
        </div>
    </div>
</script>
```

```javascript
    function updateTemplate() {
        var numeric;
        var grid = document.getElementById("Grid").ej2_instances[0];
        numeric = new ej.inputs.NumericTextBox({
            min: 1,
            max: 3,
            step: 1,
            width: 100,
            format: '###.##',
            change: function (args) {
                grid.pageSettings = { currentPage: args.value };
            }
        });
        numeric.appendTo('#currentPage');
    };
    var flag = true;
    function dataBound() {
        if (flag) {
            flag = false;
            updateTemplate();
        }
    }
    function actionComplete(args) {
        if (args.requestType === 'paging') {
            updateTemplate();
        }
    }
```

---

## External Paging / Navigate to Page

Navigate to a page programmatically using `goToPage()`:

```javascript
var grid = document.getElementById('Grid').ej2_instances[0];
grid.goToPage(3);
```

---

## Paging Events

`actionBegin` and `actionComplete` fire for paging. Detect with `args.requestType === 'paging'`:

```javascript
function actionBegin(args) {
    if (args.requestType === 'paging') {
        console.log('Going to page:', args.currentPage);
    }
}
```
