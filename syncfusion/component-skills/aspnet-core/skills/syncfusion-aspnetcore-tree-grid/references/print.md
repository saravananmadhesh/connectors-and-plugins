# Print — Syncfusion ASP.NET Core TreeGrid

## Table of Contents

- [Enabling Print](#enabling-print)
- [Print via Toolbar](#print-via-toolbar)
- [External Print Button](#external-print-button)
- [Print Current Page](#print-current-page)
- [Show/Hide Columns During Print](#showhide-columns-during-print)
- [Handling Large Datasets](#handling-large-datasets)
- [Page Setup Configuration](#page-setup-configuration)
- [Limitations](#limitations)

---

## When to Use This Skill

Use this reference when you need to:
- Users need to print hierarchical data reports
- Export tabular data to hardcopy
- Create printable TreeGrid snapshots
- Enable print-on-demand functionality
- Configure printing for specific pages only
- Dynamically show/hide columns during print
- Handle large dataset printing efficiently

---

## Overview

Print functionality allows users to print TreeGrid data directly from the browser. Use the **print** method to trigger printing with customizable options.

---

## Enabling Print

### Step 1: Enable `allowPrinting` on TreeGrid
```cshtml
<ejs-treegrid id="TreeGrid" 
              dataSource="@ViewBag.datasource" 
              childMapping="Children"
              allowPrinting="true">
    <e-treegrid-columns>
        <e-treegrid-column field="TaskId" headerText="Task ID" width="90"></e-treegrid-column>
        <e-treegrid-column field="TaskName" headerText="Task Name" width="200"></e-treegrid-column>
        <e-treegrid-column field="Duration" headerText="Duration" width="100"></e-treegrid-column>
    </e-treegrid-columns>
</ejs-treegrid>
```

### Step 2: Call `print()` Method
```javascript
const treeGridInstance = document.getElementById('TreeGrid').ej2_instances[0];
treeGridInstance.print();
```

---

## Print via Toolbar

Add Print button to TreeGrid toolbar for one-click printing:

```cshtml
<ejs-treegrid id="TreeGrid" 
              dataSource="@ViewBag.datasource" 
              allowPrinting="true"
              toolbar="@(new List<string>() {"Print"})">
    <e-treegrid-columns>
        <e-treegrid-column field="TaskId" headerText="Task ID" width="90"></e-treegrid-column>
        <e-treegrid-column field="TaskName" headerText="Task Name" width="200"></e-treegrid-column>
        <e-treegrid-column field="Duration" headerText="Duration" width="100"></e-treegrid-column>
    </e-treegrid-columns>
</ejs-treegrid>
```

The toolbar automatically triggers printing when the **Print** button is clicked.

---

## External Print Button

Trigger print from an external button using the `print()` method:

```cshtml
<!-- External Button -->
<button onclick="printTreeGrid()">Print TreeGrid</button>

<!-- TreeGrid Definition -->
<ejs-treegrid id="TreeGrid" 
              dataSource="@ViewBag.datasource" 
              allowPrinting="true">
    <e-treegrid-columns>
        <e-treegrid-column field="TaskId" headerText="Task ID" width="90"></e-treegrid-column>
        <e-treegrid-column field="TaskName" headerText="Task Name" width="200"></e-treegrid-column>
    </e-treegrid-columns>
</ejs-treegrid>

<script>
    function printTreeGrid() {
        const treeGridInstance = document.getElementById('TreeGrid').ej2_instances[0];
        treeGridInstance.print();
    }
</script>
```

---

## Print Current Page

By default, print outputs **all pages**. To print only the current page, set `printMode` to **CurrentPage**:

```cshtml
<ejs-treegrid id="TreeGrid" 
              dataSource="@ViewBag.datasource" 
              allowPaging="true"
              allowPrinting="true"
              printMode="CurrentPage">
    <e-treegrid-pagesettings pageSize="10"></e-treegrid-pagesettings>
    <e-treegrid-columns>
        <e-treegrid-column field="TaskId" headerText="Task ID" width="90"></e-treegrid-column>
        <e-treegrid-column field="TaskName" headerText="Task Name" width="200"></e-treegrid-column>
    </e-treegrid-columns>
</ejs-treegrid>
```

**Print modes:**
- **AllPages** (default) — Print entire dataset
- **CurrentPage** — Print only current page

---

## Show/Hide Columns During Print

Dynamically show/hide columns during printing using toolbar and print events:

```cshtml
<ejs-treegrid id="TreeGrid" 
              dataSource="@ViewBag.datasource" 
              allowPrinting="true"
              toolbar="@(new List<string>() {"Print"})"
              toolbarClick="toolbarClickHandler"
              printComplete="printCompleteHandler">
    <e-treegrid-columns>
        <e-treegrid-column field="TaskId" headerText="Task ID" width="90"></e-treegrid-column>
        <e-treegrid-column field="TaskName" headerText="Task Name" width="200"></e-treegrid-column>
        <e-treegrid-column field="Duration" headerText="Duration" width="100" visible="false"></e-treegrid-column>
        <e-treegrid-column field="StartDate" headerText="Start Date" width="120"></e-treegrid-column>
    </e-treegrid-columns>
</ejs-treegrid>

<script>
    function toolbarClickHandler(args) {
        const treeGridInstance = document.getElementById('TreeGrid').ej2_instances[0];
        
        // Show or hide columns based on print action
        if (args.item.text === 'Print') {
            // Show Duration column for printing
            treeGridInstance.columns[2].visible = true;
            // Hide StartDate column for printing
            treeGridInstance.columns[3].visible = false;
        }
    }

    function printCompleteHandler(args) {
        const treeGridInstance = document.getElementById('TreeGrid').ej2_instances[0];
        
        // Restore original column visibility after printing
        treeGridInstance.columns[2].visible = false;  // Duration
        treeGridInstance.columns[3].visible = true;   // StartDate
    }
</script>
```

---

## Handling Large Datasets

**⚠️ Performance Warning:** Printing very large datasets (1000+ rows) can cause browser slowdown or hang.

**Solutions:**

### Option 1: Print Current Page Only
```cshtml
<!-- Print only limited rows per page -->
<ejs-treegrid allowPaging="true" 
              allowPrinting="true"
              printMode="CurrentPage">
    <e-treegrid-pagesettings pageSize="20"></e-treegrid-pagesettings>
</ejs-treegrid>
```

### Option 2: Export Instead of Print
For large datasets, export to Excel/PDF and print from external application:
```javascript
// Export to Excel instead of printing
const treeGridInstance = document.getElementById('TreeGrid').ej2_instances[0];
treeGridInstance.excelExport();
```

### Option 3: Implement Server-Side Print
Render a simplified print view server-side with limited data.

---

## Page Setup Configuration

Print layout, paper size, and margins **cannot** be configured via JavaScript. Customize using browser print dialog:

**Browser-Specific Instructions:**

| Browser | Steps |
|---------|-------|
| **Chrome** | File → Print → More Settings → Paper Size, Margins, Scale |
| **Firefox** | File → Print → Margins & Header/Footer section |
| **Safari** | File → Print → Paper Size, Orientation, Margins |
| **Edge** | File → Print → More Settings → Paper Size, Margins |

---

## Print with Large Columns

When TreeGrid has many columns, adjust the **Scale** option in print preview to fit content:

1. Open print preview (Ctrl + P)
2. Locate **Scale** option
3. Reduce to 75% or 50% to fit all columns
4. Click Print

---

## Limitations

- ❌ Cannot customize layout/margins via JavaScript
- ❌ Large datasets (1000+ rows) may degrade performance
- ❌ Row templates may not print correctly
- ❌ Print dialog behavior varies by browser
- ❌ CSS media queries must be properly defined

---

## Best Practices

1. **Test print output** — Always preview before deploying
2. **Use CurrentPage for paginated data** — Improves performance
3. **Export for large datasets** — Use Excel/PDF export instead of print
4. **Define CSS media queries** — Customize print styles for better output
5. **Adjust scale in print dialog** — Handle multi-column layouts

---

## Related Topics

- **Export** — Excel and PDF export for large dataset handling
- **Toolbar** — Add Print button to toolbar for user accessibility
- **Selection** — Print selected rows only
