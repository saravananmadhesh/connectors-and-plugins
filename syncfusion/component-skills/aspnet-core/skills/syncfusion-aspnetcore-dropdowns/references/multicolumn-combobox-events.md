# Events — MultiColumn ComboBox

## Select Event

Fires when an item is selected from the dropdown list.

```cshtml
<ejs-multicolumncombobox id="combo"
    dataSource="@ViewBag.employees"
    select="onSelect"
    popupHeight="300px">
    <e-multicolumncombobox-fields text="EmployeeName" value="EmployeeID"></e-multicolumncombobox-fields>
    <e-multicolumncombobox-columns>
        <e-multicolumncombobox-column field="EmployeeID" header="ID" width="60px"></e-multicolumncombobox-column>
        <e-multicolumncombobox-column field="EmployeeName" header="Name" width="150px"></e-multicolumncombobox-column>
        <e-multicolumncombobox-column field="Designation" header="Designation" width="120px"></e-multicolumncombobox-column>
    </e-multicolumncombobox-columns>
</ejs-multicolumncombobox>

<script>
function onSelect(args) {
    // args.itemData - Selected item data
    // args.value - Selected value
    // args.text - Selected text
    console.log('Selected:', args.itemData);
    console.log('Value:', args.value);
    console.log('Text:', args.text);
}
</script>
```

## Change Event

Fires when the value of the combo box changes.

```cshtml
<ejs-multicolumncombobox id="combo"
    dataSource="@ViewBag.employees"
    change="onChange"
    popupHeight="300px">
    <e-multicolumncombobox-fields text="EmployeeName" value="EmployeeID"></e-multicolumncombobox-fields>
    <e-multicolumncombobox-columns>
        <e-multicolumncombobox-column field="EmployeeID" header="ID" width="60px"></e-multicolumncombobox-column>
        <e-multicolumncombobox-column field="EmployeeName" header="Name" width="150px"></e-multicolumncombobox-column>
    </e-multicolumncombobox-columns>
</ejs-multicolumncombobox>

<script>
function onChange(args) {
    let oldValue = args.previousValue;
    let newValue = args.value;
    
    console.log(`Changed from ${oldValue} to ${newValue}`);
    
    // Perform action based on selection
    loadRelatedData(newValue);
}

function loadRelatedData(employeeId) {
    fetch(`/api/employees/${employeeId}/details`)
        .then(response => response.json())
        .then(data => {
            // Process related data
            console.log('Related data:', data);
        });
}
</script>
```

---

## Filtering Event

Fires during filtering of combo box list items.

```cshtml
<ejs-multicolumncombobox id="combo"
    dataSource="@ViewBag.employees"
    filtering="onFiltering"
    allowFiltering="true"
    popupHeight="300px">
    <e-multicolumncombobox-fields text="EmployeeName" value="EmployeeID"></e-multicolumncombobox-fields>
    <e-multicolumncombobox-columns>
        <e-multicolumncombobox-column field="EmployeeID" header="ID" width="60px"></e-multicolumncombobox-column>
        <e-multicolumncombobox-column field="EmployeeName" header="Name" width="150px"></e-multicolumncombobox-column>
    </e-multicolumncombobox-columns>
</ejs-multicolumncombobox>

<script>
function onFiltering(args) {
    let query = args.text;
    console.log('Filtering by:', query);
    
    // Server-side filtering
    if (query.length > 2) {
        fetch(`/api/employees/search?query=${query}`)
            .then(response => response.json())
            .then(data => {
                let combo = document.getElementById('combo').ej2_instances[0];
                combo.dataSource = data;
                combo.refresh();
            });
    }
}
</script>
```

---

## ActionBegin Event

Fires when grid action begins (like sorting, filtering, paging).

```cshtml
<ejs-multicolumncombobox id="combo"
    dataSource="@ViewBag.employees"
    actionBegin="onActionBegin"
    popupHeight="300px">
    <e-multicolumncombobox-fields text="EmployeeName" value="EmployeeID"></e-multicolumncombobox-fields>
    <e-multicolumncombobox-columns>
        <e-multicolumncombobox-column field="EmployeeID" header="ID" width="60px"></e-multicolumncombobox-column>
        <e-multicolumncombobox-column field="EmployeeName" header="Name" width="150px"></e-multicolumncombobox-column>
    </e-multicolumncombobox-columns>
</ejs-multicolumncombobox>

<script>
function onActionBegin(args) {
    if (args.requestType === 'filtering') {
        console.log('Filter request:', args.filterModel);
    }
    if (args.requestType === 'sorting') {
        console.log('Sort request:', args.sortModel);
    }
}
</script>
```

## ActionComplete Event

Fires when grid action completes.

```cshtml
<ejs-multicolumncombobox id="combo"
    dataSource="@ViewBag.employees"
    actionComplete="onActionComplete"
    popupHeight="300px">
    <e-multicolumncombobox-fields text="EmployeeName" value="EmployeeID"></e-multicolumncombobox-fields>
    <e-multicolumncombobox-columns>
        <e-multicolumncombobox-column field="EmployeeID" header="ID" width="60px"></e-multicolumncombobox-column>
        <e-multicolumncombobox-column field="EmployeeName" header="Name" width="150px"></e-multicolumncombobox-column>
    </e-multicolumncombobox-columns>
</ejs-multicolumncombobox>

<script>
function onActionComplete(args) {
    console.log('Action completed:', args.requestType);
    console.log('Result count:', args.result ? args.result.length : 0);
}
</script>
```

---

## Open Event

Fires when the dropdown popup opens.

```cshtml
<ejs-multicolumncombobox id="combo"
    dataSource="@ViewBag.employees"
    open="onOpen"
    popupHeight="300px">
    <e-multicolumncombobox-fields text="EmployeeName" value="EmployeeID"></e-multicolumncombobox-fields>
    <e-multicolumncombobox-columns>
        <e-multicolumncombobox-column field="EmployeeID" header="ID" width="60px"></e-multicolumncombobox-column>
        <e-multicolumncombobox-column field="EmployeeName" header="Name" width="150px"></e-multicolumncombobox-column>
    </e-multicolumncombobox-columns>
</ejs-multicolumncombobox>

<script>
function onOpen(args) {
    console.log('Dropdown opened');
    // Track analytics
    logUserInteraction('combo_opened');
}
</script>
```

## Close Event

Fires when the dropdown popup closes.

```cshtml
<ejs-multicolumncombobox id="combo"
    dataSource="@ViewBag.employees"
    close="onClose"
    popupHeight="300px">
    <e-multicolumncombobox-fields text="EmployeeName" value="EmployeeID"></e-multicolumncombobox-fields>
    <e-multicolumncombobox-columns>
        <e-multicolumncombobox-column field="EmployeeID" header="ID" width="60px"></e-multicolumncombobox-column>
        <e-multicolumncombobox-column field="EmployeeName" header="Name" width="150px"></e-multicolumncombobox-column>
    </e-multicolumncombobox-columns>
</ejs-multicolumncombobox>

<script>
function onClose(args) {
    console.log('Dropdown closed');
}
</script>
```

---
