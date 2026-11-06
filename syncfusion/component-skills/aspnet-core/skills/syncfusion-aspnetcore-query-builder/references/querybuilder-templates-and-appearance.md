# Templates & Appearance in QueryBuilder

## Table of Contents
- [Header Template](#header-template)
- [Display Mode](#display-mode)
- [Summary View](#summary-view)
- [Model Binding](#model-binding)
- [Style and Appearance](#style-and-appearance)

---

## Header Template

The header template replaces the default group header (AND/OR toggle + Add Condition/Group buttons) with a fully custom UI. Use an `x-template` script block and wire it up in the `actionBegin` event.

```cshtml
<script id="headerTemplate" type="text/x-template">
    <div class="e-groupheader">
        <button class="e-btn e-small" id="${ruleID}_addButton">+ Add Rule</button>
        <select id="${ruleID}_condition">
            <option value="and">AND</option>
            <option value="or">OR</option>
        </select>
        <button class="e-btn e-small e-danger" id="${ruleID}_deleteButton">Delete Group</button>
    </div>
</script>

<ejs-querybuilder id="querybuilder" headerTemplate="#headerTemplate"
    actionBegin="onActionBegin" width="70%">
    <e-querybuilder-columns>
        <e-querybuilder-column field="FirstName" label="First Name" type="string"></e-querybuilder-column>
        <e-querybuilder-column field="Country" label="Country" type="string"></e-querybuilder-column>
    </e-querybuilder-columns>
</ejs-querybuilder>

<script>
    function onActionBegin(args) {
        // requestType is 'header-template-create' when the header template is initialized
        if (args.requestType === 'header-template-create') {
            var ruleID = args.ruleID;

            // Wire condition change
            var condSelect = document.getElementById(ruleID + '_condition');
            if (condSelect) {
                condSelect.value = args.rule.condition || 'and';
                condSelect.addEventListener('change', function() {
                    args.rule.condition = condSelect.value;
                });
            }

            // Wire add rule button
            var addBtn = document.getElementById(ruleID + '_addButton');
            if (addBtn) {
                addBtn.addEventListener('click', function() {
                    var qb = ej.base.getInstance(document.getElementById("querybuilder"), ejs.querybuilder.QueryBuilder);
                    qb.addRules([{ field: '', operator: '', value: '' }], ruleID);
                });
            }

            // Wire delete group button
            var delBtn = document.getElementById(ruleID + '_deleteButton');
            if (delBtn) {
                delBtn.addEventListener('click', function() {
                    var qb = ej.base.getInstance(document.getElementById("querybuilder"), ejs.querybuilder.QueryBuilder);
                    qb.deleteGroups([ruleID]);
                });
            }
        }
    }
</script>
```

> **Note:** The `actionBegin` event fires with `requestType === 'header-template-create'` for each group header. Use `args.ruleID` to target the specific group.

---

## Display Mode

Control whether the QueryBuilder renders horizontally (default) or vertically using the `displayMode` property.

```cshtml
@* Horizontal layout (default) *@
<ejs-querybuilder id="querybuilder" displayMode="Horizontal" width="70%">
    <e-querybuilder-columns>
        <e-querybuilder-column field="FirstName" label="First Name" type="string"></e-querybuilder-column>
        <e-querybuilder-column field="Country" label="Country" type="string"></e-querybuilder-column>
    </e-querybuilder-columns>
</ejs-querybuilder>

@* Vertical layout — suitable for mobile *@
<ejs-querybuilder id="querybuilderMobile" displayMode="Vertical" width="100%">
    <e-querybuilder-columns>
        <e-querybuilder-column field="FirstName" label="First Name" type="string"></e-querybuilder-column>
        <e-querybuilder-column field="Country" label="Country" type="string"></e-querybuilder-column>
    </e-querybuilder-columns>
</ejs-querybuilder>
```

| Value | Description | Default |
|-------|-------------|---------|
| `Horizontal` | Field, Operator, Value on one row | Desktop default |
| `Vertical` | Field, Operator, Value stacked | Mobile default |

> The default view in desktop mode is **Horizontal**. The default view in mobile mode is **Vertical**.

---

## Summary View

Summary View collapses the full rule editor into a compact, read-only text summary of the current conditions. Toggle it with `summaryView`.

```cshtml
@using Syncfusion.EJ2.QueryBuilder
@{
    QueryBuilderRule rule = new QueryBuilderRule()
    {
        Condition = "and",
        Rules = new List<QueryBuilderRule>()
        {
            new QueryBuilderRule { Label = "First Name", Field = "FirstName", Type = "string", Operator = "startswith", Value = "Nancy" }
        }
    };
    var dataSource = EmployeeView.GetAllRecords();
}
<ejs-querybuilder id="querybuilder" summaryView="true" width="70%" rule="rule" dataSource="dataSource">
    <e-querybuilder-columns>
        <e-querybuilder-column field="FirstName" label="First Name" type="string"></e-querybuilder-column>
        <e-querybuilder-column field="Country" label="Country" type="string"></e-querybuilder-column>
    </e-querybuilder-columns>
</ejs-querybuilder>
```

Toggle Summary View programmatically:

```javascript
var qb = ej.base.getInstance(document.getElementById("querybuilder"), ejs.querybuilder.QueryBuilder);
qb.summaryView = true;  // collapse to summary
qb.summaryView = false; // restore full editor
```

> **Use case:** Show a compact "active filters" display while the full editor is hidden in a modal or panel.

---

## Model Binding

Model binding lets you configure the underlying dropdown components (field, operator, value) used inside QueryBuilder. Use `fieldModel`, `operatorModel`, and `valueModel` to pass configuration objects.

```cshtml
@{
    var fieldSettings = new {
        allowFiltering = true,
        filterType = "StartsWith"
    };
    var operatorSettings = new {
        allowFiltering = false
    };
    var valueSettings = new {
        showClearButton = true
    };
}

<ejs-querybuilder id="querybuilder" width="70%"
    fieldModel="@fieldSettings"
    operatorModel="@operatorSettings"
    valueModel="@valueSettings">
    <e-querybuilder-columns>
        <e-querybuilder-column field="FirstName" label="First Name" type="string"></e-querybuilder-column>
        <e-querybuilder-column field="Country" label="Country" type="string"></e-querybuilder-column>
        <e-querybuilder-column field="EmployeeID" label="Employee ID" type="number"></e-querybuilder-column>
    </e-querybuilder-columns>
</ejs-querybuilder>
```

> `fieldModel` / `operatorModel` apply to the DropDownList components for field and operator selection. `valueModel` applies to the input component for value entry.

---

## Style and Appearance

Customize the QueryBuilder's visual appearance by overriding these CSS classes:

| CSS Class | Customization Target |
|-----------|---------------------|
| `.e-group-header .e-btn` | AND/OR condition toggle button |
| `.e-group-body .e-rule-container` | Rule row container |
| `.e-group-container .e-group-header .e-dropdown-btn` | Add Group/Condition dropdown button |
| `.e-query-builder .e-group-header .e-deletegroup` | Delete Group button |
| `.e-query-builder .e-rule-field .e-rule-value-delete .e-rule-delete` | Delete Condition button |
| `.e-query-builder .e-rule-list > ::after, .e-query-builder .e-rule-list > ::before` | Group connector lines |
| `.e-query-builder .e-rule-container.e-joined-rule` | Condition joining line |

**Example — Change button colors:**

```css
/* Change condition button background */
.e-group-header .e-btn {
    background-color: #1976d2;
    color: white;
}

/* Style the rule container */
.e-group-body .e-rule-container {
    border: 1px solid #e0e0e0;
    border-radius: 4px;
    margin-bottom: 8px;
}
```

**Add a custom CSS class:**

```cshtml
<ejs-querybuilder id="querybuilder" cssClass="my-query-builder" width="70%">
    <e-querybuilder-columns>
        <e-querybuilder-column field="FirstName" label="First Name" type="string"></e-querybuilder-column>
    </e-querybuilder-columns>
</ejs-querybuilder>
```

```css
.my-query-builder .e-group-header {
    background: #f5f5f5;
    padding: 8px 12px;
    border-radius: 4px;
}
```

> Use [Theme Studio](https://ej2.syncfusion.com/themestudio/) to create fully customized Syncfusion themes with your brand colors.

## See Also

- [Configuration & How-To](querybuilder-configuration-and-how-to.md) — Width, height, RTL, ReadOnly
- [Localization](querybuilder-localization.md) — Translate button and label text
- [API Reference](querybuilder-api.md) — Full property list
