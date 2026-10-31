# Configuration & How-To in QueryBuilder

Common configuration scenarios and how-to patterns for the Syncfusion QueryBuilder.

## Table of Contents
- [Drag and Drop](#drag-and-drop)
- [Restrict Groups (MaxGroupCount)](#restrict-groups-maxgroupcount)
- [Sort Column Fields](#sort-column-fields)
- [State Persistence](#state-persistence)
- [Right-to-Left (RTL)](#right-to-left-rtl)
- [Read-Only Mode](#read-only-mode)
- [Width and Height](#width-and-height)
- [CSS Class](#css-class)
- [AutoSelectField and AutoSelectOperator](#autoselectfield-and-autoselectoperator)
- [MatchCase](#matchcase)
- [ImmediateModeDelay](#immediatemodedelay)
- [AddRuleToNewGroups](#addruletonewgroups)
- [FieldMode (DropDownTree)](#fieldmode-dropdowntree)
- [Separator](#separator)

---

## Drag and Drop

Enable users to reorder rules and groups by dragging them to new positions.

```cshtml
<ejs-querybuilder id="querybuilder" allowDragAndDrop="true" width="70%">
    <e-querybuilder-columns>
        <e-querybuilder-column field="FirstName" label="First Name" type="string"></e-querybuilder-column>
        <e-querybuilder-column field="Country" label="Country" type="string"></e-querybuilder-column>
        <e-querybuilder-column field="Title" label="Title" type="string"></e-querybuilder-column>
    </e-querybuilder-columns>
</ejs-querybuilder>
```

**Drag and drop events:**

```cshtml
<ejs-querybuilder id="querybuilder" allowDragAndDrop="true"
    dragStart="onDragStart"
    drag="onDrag"
    drop="onDrop"
    width="70%">
    <e-querybuilder-columns>
        <e-querybuilder-column field="FirstName" label="First Name" type="string"></e-querybuilder-column>
        <e-querybuilder-column field="Country" label="Country" type="string"></e-querybuilder-column>
    </e-querybuilder-columns>
</ejs-querybuilder>

<script>
    function onDragStart(args) {
        console.log('Drag started:', args.droppedRecord);
    }
    function onDrag(args) {
        console.log('Dragging:', args.droppedRecord);
    }
    function onDrop(args) {
        console.log('Dropped:', args.droppedRecord, 'onto:', args.target);
    }
</script>
```

---

## Restrict Groups (MaxGroupCount)

Limit the maximum number of nested groups a user can create. Default is `5`.

```cshtml
@* Restrict to 2 groups — useful for mobile or simple use cases *@
<ejs-querybuilder id="querybuilder" maxGroupCount="2" width="70%">
    <e-querybuilder-columns>
        <e-querybuilder-column field="FirstName" label="First Name" type="string"></e-querybuilder-column>
        <e-querybuilder-column field="Country" label="Country" type="string"></e-querybuilder-column>
    </e-querybuilder-columns>
</ejs-querybuilder>
```

> Recommended for mobile layouts with `displayMode="Vertical"` to prevent deeply nested queries.

---

## Sort Column Fields

Sort the list of fields shown in the field dropdown. Use `sortDirection` to set ascending, descending, or default order.

```cshtml
@* Ascending sort *@
<ejs-querybuilder id="querybuilder" sortDirection="Ascending" width="70%">
    <e-querybuilder-columns>
        <e-querybuilder-column field="Title" label="Title" type="string"></e-querybuilder-column>
        <e-querybuilder-column field="Country" label="Country" type="string"></e-querybuilder-column>
        <e-querybuilder-column field="Age" label="Age" type="number"></e-querybuilder-column>
        <e-querybuilder-column field="FirstName" label="First Name" type="string"></e-querybuilder-column>
    </e-querybuilder-columns>
</ejs-querybuilder>
```

| Value | Description |
|-------|-------------|
| `Default` | No sorting — fields appear in declaration order |
| `Ascending` | Fields sorted A → Z |
| `Descending` | Fields sorted Z → A |

---

## State Persistence

Save the current rules to the browser's `localStorage` automatically. The rules are restored on page reload.

```cshtml
<ejs-querybuilder id="querybuilder" enablePersistence="true" width="70%">
    <e-querybuilder-columns>
        <e-querybuilder-column field="FirstName" label="First Name" type="string"></e-querybuilder-column>
        <e-querybuilder-column field="Country" label="Country" type="string"></e-querybuilder-column>
    </e-querybuilder-columns>
</ejs-querybuilder>
```

> State persistence stores the `Rule` object in localStorage keyed by the component's ID. Changing the component ID will start with a fresh state.

---

## Right-to-Left (RTL)

Enable RTL layout for right-to-left languages (Arabic, Farsi, Hebrew, Urdu, etc.):

```cshtml
<ejs-querybuilder id="querybuilder" enableRtl="true" width="70%">
    <e-querybuilder-columns>
        <e-querybuilder-column field="FirstName" label="الاسم الأول" type="string"></e-querybuilder-column>
        <e-querybuilder-column field="Country" label="البلد" type="string"></e-querybuilder-column>
    </e-querybuilder-columns>
</ejs-querybuilder>
```

Combine with the `locale` property for fully localized RTL experience:

```cshtml
<ejs-querybuilder id="querybuilder" enableRtl="true" locale="ar" width="70%">
    ...
</ejs-querybuilder>
```

See [Localization](localization.md) for locale translation keys.

---

## Read-Only Mode

Disable all user interactions while still displaying the current rules:

```cshtml
@using Syncfusion.EJ2.QueryBuilder
@{
    QueryBuilderRule rule = new QueryBuilderRule()
    {
        Condition = "and",
        Rules = new List<QueryBuilderRule>()
        {
            new QueryBuilderRule { Label = "Country", Field = "Country", Type = "string", Operator = "equal", Value = "USA" }
        }
    };
}
<ejs-querybuilder id="querybuilder" readonly="true" width="70%" rule="rule">
    <e-querybuilder-columns>
        <e-querybuilder-column field="FirstName" label="First Name" type="string"></e-querybuilder-column>
        <e-querybuilder-column field="Country" label="Country" type="string"></e-querybuilder-column>
    </e-querybuilder-columns>
</ejs-querybuilder>
```

Toggle read-only programmatically:

```javascript
var qb = ej.base.getInstance(document.getElementById("querybuilder"), ejs.querybuilder.QueryBuilder);
qb.readonly = true;   // disable interactions
qb.readonly = false;  // re-enable interactions
```

---

## Width and Height

Set the dimensions of the QueryBuilder component:

```cshtml
<ejs-querybuilder id="querybuilder" width="800px" height="400px">
    <e-querybuilder-columns>
        <e-querybuilder-column field="FirstName" label="First Name" type="string"></e-querybuilder-column>
    </e-querybuilder-columns>
</ejs-querybuilder>
```

Both properties accept CSS values (`px`, `%`, `auto`). Default is `"auto"` for both.

---

## CSS Class

Apply one or more custom CSS classes to the root QueryBuilder element:

```cshtml
<ejs-querybuilder id="querybuilder" cssClass="my-theme compact-qb" width="70%">
    <e-querybuilder-columns>
        <e-querybuilder-column field="FirstName" label="First Name" type="string"></e-querybuilder-column>
    </e-querybuilder-columns>
</ejs-querybuilder>
```

---

## AutoSelectField and AutoSelectOperator

Control whether the first field/operator is automatically selected when a new rule is added.

```cshtml
<ejs-querybuilder id="querybuilder"
    autoSelectField="true"
    autoSelectOperator="true"
    width="70%">
    <e-querybuilder-columns>
        <e-querybuilder-column field="FirstName" label="First Name" type="string"></e-querybuilder-column>
        <e-querybuilder-column field="Country" label="Country" type="string"></e-querybuilder-column>
    </e-querybuilder-columns>
</ejs-querybuilder>
```

| Property | Default | Behavior when `true` |
|----------|---------|----------------------|
| `autoSelectField` | `false` | First field pre-selected when rule is added |
| `autoSelectOperator` | `true` | First operator pre-selected when rule is added |

---

## MatchCase

When `matchCase` is true, string comparisons are case-sensitive. By default, filtering is case-insensitive.

```cshtml
<ejs-querybuilder id="querybuilder" matchCase="true" width="70%">
    <e-querybuilder-columns>
        <e-querybuilder-column field="FirstName" label="First Name" type="string"></e-querybuilder-column>
    </e-querybuilder-columns>
</ejs-querybuilder>
```

---

## ImmediateModeDelay

Debounce the `ruleChange` event by a specified millisecond delay. Useful when you want to avoid triggering expensive operations (such as server calls) on every keystroke.

```cshtml
<ejs-querybuilder id="querybuilder" immediateModeDelay="300" ruleChange="onRuleChange" width="70%">
    <e-querybuilder-columns>
        <e-querybuilder-column field="FirstName" label="First Name" type="string"></e-querybuilder-column>
    </e-querybuilder-columns>
</ejs-querybuilder>
```

> Set `immediateModeDelay` to `300`–`500` ms when integrating with remote APIs.

---

## AddRuleToNewGroups

Control whether a default empty rule is automatically added when a new group is created. Default is `true`.

```cshtml
@* Don't auto-add a rule when creating a new group *@
<ejs-querybuilder id="querybuilder" addRuleToNewGroups="false" width="70%">
    <e-querybuilder-columns>
        <e-querybuilder-column field="FirstName" label="First Name" type="string"></e-querybuilder-column>
    </e-querybuilder-columns>
</ejs-querybuilder>
```

---

## FieldMode (DropDownTree)

By default, the field selector uses a DropDownList. Switch to DropDownTree for hierarchical field structures:

```cshtml
<ejs-querybuilder id="querybuilder" fieldMode="DropDownTree" width="70%">
    <e-querybuilder-columns>
        <e-querybuilder-column field="Employee.FirstName" label="First Name" type="string"></e-querybuilder-column>
        <e-querybuilder-column field="Employee.Country" label="Country" type="string"></e-querybuilder-column>
    </e-querybuilder-columns>
</ejs-querybuilder>
```

Use `separator` to define the hierarchy delimiter (default `""`):

```cshtml
<ejs-querybuilder id="querybuilder" fieldMode="DropDownTree" separator="." width="70%">
    ...
</ejs-querybuilder>
```

## See Also

- [Templates & Appearance](querybuilder-templates-and-appearance.md) — Customize the UI
- [Localization](querybuilder-localization.md) — Translate labels
- [API Reference](querybuilder-api.md) — Full property reference
