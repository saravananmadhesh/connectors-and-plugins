# Filtering & Rule Management in QueryBuilder

## Table of Contents
- [ShowButtons Configuration](#showbuttons-configuration)
- [Add and Delete Rules Programmatically](#add-and-delete-rules-programmatically)
- [Add and Delete Groups Programmatically](#add-and-delete-groups-programmatically)
- [Clone Rules and Groups](#clone-rules-and-groups)
- [Lock Rules and Groups](#lock-rules-and-groups)
- [Separate Connectors](#separate-connectors)
- [NOT Condition](#not-condition)

---

## ShowButtons Configuration

Control the visibility of action buttons in the QueryBuilder UI using the `showButtons` property on the root TagHelper. You can toggle `ruleDelete`, `groupInsert`, `groupDelete`, `cloneRule`, `cloneGroup`, `lockRule`, and `lockGroup`.

```cshtml
<ejs-querybuilder id="querybuilder" width="70%" showButtons="new Syncfusion.EJ2.QueryBuilder.QueryBuilderShowButtons {GroupDelete=true, GroupInsert=true, RuleDelete=true, CloneRule=true, CloneGroup=true, LockRule=true, LockGroup=true}">
    <e-querybuilder-columns>
        <e-querybuilder-column field="FirstName" label="First Name" type="string"></e-querybuilder-column>
        <e-querybuilder-column field="Country" label="Country" type="string"></e-querybuilder-column>
    </e-querybuilder-columns>
</ejs-querybuilder>
```

**ShowButtons properties:**

| Property | Default | Description |
|----------|---------|-------------|
| `ruleDelete` | `true` | Show the delete button on each rule |
| `groupInsert` | `true` | Show the Add Group/Condition button |
| `groupDelete` | `true` | Show the Delete Group button |
| `cloneRule` | `false` | Show the Clone Rule button |
| `cloneGroup` | `false` | Show the Clone Group button |
| `lockRule` | `false` | Show the Lock Rule button |
| `lockGroup` | `false` | Show the Lock Group button |

---

## Add and Delete Rules Programmatically

Use `addRules()` and `deleteRules()` to manipulate conditions without user interaction.

```javascript
var qb = ej.base.getInstance(document.getElementById("querybuilder"), ejs.querybuilder.QueryBuilder);

// Add a new rule to the root group (ID: 'querybuilder_group0')
qb.addRules([
    { label: 'Country', field: 'Country', type: 'string', operator: 'equal', value: 'USA' }
], 'querybuilder_group0');

// Delete a specific rule by its rule element ID
qb.deleteRules(['querybuilder_group0_rule0']);
```

> **Tip:** Inspect the DOM to find rule/group element IDs, or use the `ruleChange` event's `args.ruleID` for the current rule's ID.

---

## Add and Delete Groups Programmatically

Use `addGroups()` and `deleteGroups()` to create or remove nested groups.

```javascript
var qb = ej.base.getInstance(document.getElementById("querybuilder"), ejs.querybuilder.QueryBuilder);

// Add a new group inside the root group
qb.addGroups([
    {
        condition: 'or',
        rules: [
            { label: 'City', field: 'City', type: 'string', operator: 'equal', value: 'Seattle' }
        ]
    }
], 'querybuilder_group0');

// Delete a group by its element ID
qb.deleteGroups(['querybuilder_group1']);
```

---

## Clone Rules and Groups

Clone an existing rule or group to duplicate its conditions:

```cshtml
<ejs-querybuilder id="querybuilder" width="70%" showButtons="new Syncfusion.EJ2.QueryBuilder.QueryBuilderShowButtons { CloneRule=true, CloneGroup=true }">
    <e-querybuilder-columns>
        <e-querybuilder-column field="FirstName" label="First Name" type="string"></e-querybuilder-column>
        <e-querybuilder-column field="Country" label="Country" type="string"></e-querybuilder-column>
    </e-querybuilder-columns>
</ejs-querybuilder>
```

Programmatically clone via methods:

```javascript
var qb = ej.base.getInstance(document.getElementById("querybuilder"), ejs.querybuilder.QueryBuilder);

// Clone a specific rule — creates a duplicate adjacent to the original
qb.cloneRule("querybuilder_group0_rule0", "querybuilder_group0", 1);

// Clone an entire group — clone source into target at the given index
qb.cloneGroup("querybuilder_group0", "querybuilder_group1", 1);
```

---

## Lock Rules and Groups

Locking prevents users from modifying field, operator, and value inputs for a rule or group. The locked rule/group is disabled visually.

```cshtml
<ejs-querybuilder id="querybuilder" width="70%" showButtons="new Syncfusion.EJ2.QueryBuilder.QueryBuilderShowButtons { LockRule=true, LockGroup=true }">
    <e-querybuilder-columns>
        <e-querybuilder-column field="FirstName" label="First Name" type="string"></e-querybuilder-column>
        <e-querybuilder-column field="Country" label="Country" type="string"></e-querybuilder-column>
    </e-querybuilder-columns>
</ejs-querybuilder>
```

Programmatically lock/unlock:

```javascript
var qb = ej.base.getInstance(document.getElementById("querybuilder"), ejs.querybuilder.QueryBuilder);

// Lock a specific rule — disables field, operator, and value editing
qb.lockRule("querybuilder_group0_rule0");

// Lock an entire group — disables all elements within
qb.lockGroup("querybuilder_group1");
```

> **Use case:** Lock baseline/default conditions that must always apply, while allowing users to add more rules on top.

---

## Separate Connectors

By default, all rules and groups within a group share one AND/OR connector at the group level. `enableSeparateConnector` lets each rule or group have its own connector, enabling mixed AND/OR logic within the same group.

```cshtml
<ejs-querybuilder id="querybuilder" enableSeparateConnector="true" width="70%">
    <e-querybuilder-columns>
        <e-querybuilder-column field="FirstName" label="First Name" type="string"></e-querybuilder-column>
        <e-querybuilder-column field="Country" label="Country" type="string"></e-querybuilder-column>
        <e-querybuilder-column field="Title" label="Title" type="string"></e-querybuilder-column>
    </e-querybuilder-columns>
</ejs-querybuilder>
```

With separate connectors, users can create queries like:
- `FirstName = 'Nancy'` **AND** `Country = 'USA'` **OR** `Title = 'Manager'`

---

## NOT Condition

Enable a NOT option for groups, allowing users to negate entire groups of conditions:

```cshtml
<ejs-querybuilder id="querybuilder" enableNotCondition="true" width="70%">
    <e-querybuilder-columns>
        <e-querybuilder-column field="FirstName" label="First Name" type="string"></e-querybuilder-column>
        <e-querybuilder-column field="Country" label="Country" type="string"></e-querybuilder-column>
    </e-querybuilder-columns>
</ejs-querybuilder>
```

When `enableNotCondition` is true, a NOT toggle appears next to the AND/OR selector. This generates queries like:
- `NOT (FirstName = 'Nancy' AND Country = 'USA')`

---

## Complete Example: Rule Management UI

```cshtml
<ejs-querybuilder id="querybuilder" width="70%" showButtons="new Syncfusion.EJ2.QueryBuilder.QueryBuilderShowButtons {RuleDelete=true, GroupInsert=true, GroupDelete=true, CloneRule=true, CloneGroup=true, LockRule=true, LockGroup=true}">
    <e-querybuilder-columns>
        <e-querybuilder-column field="EmployeeID" label="Employee ID" type="number"></e-querybuilder-column>
        <e-querybuilder-column field="FirstName" label="First Name" type="string"></e-querybuilder-column>
        <e-querybuilder-column field="Country" label="Country" type="string"></e-querybuilder-column>
    </e-querybuilder-columns>
</ejs-querybuilder>

<button onclick="addRule()">Add Rule</button>
<button onclick="addGroup()">Add Group</button>

<script>
    function addRule() {
        var qb = ej.base.getInstance(document.getElementById("querybuilder"), ejs.querybuilder.QueryBuilder);
        qb.addRules([
            { label: 'Country', field: 'Country', type: 'string', operator: 'equal', value: 'UK' }
        ], 'querybuilder_group0');
    }

    function addGroup() {
        var qb = ej.base.getInstance(document.getElementById("querybuilder"), ejs.querybuilder.QueryBuilder);
        qb.addGroups([{
            condition: 'or',
            rules: [
                { label: 'Country', field: 'Country', type: 'string', operator: 'equal', value: 'UK' }
            ]
        }], 'querybuilder_group0');
    }
</script>
```

## See Also

- [Import & Export](querybuilder-import-export.md) — Load/save rules as JSON, SQL, MongoDB
- [Templates & Appearance](querybuilder-templates-and-appearance.md) — Customize the header and UI
- [API Reference](querybuilder-api.md) — Full method and event signatures
