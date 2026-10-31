# QueryBuilder API Reference (ASP.NET Core)

This reference is based on the official Syncfusion ASP.NET Core QueryBuilder API:
https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.QueryBuilder.QueryBuilder.html

## Table of Contents
- [Properties](#properties)
- [Events](#events)
- [QueryBuilderColumn Sub-Properties](#querybuildcolumn-sub-properties)
- [QueryBuilderShowButtons Sub-Properties](#querybuildershow-buttons-sub-properties)
- [TagHelper Naming Convention](#taghelper-naming-convention)

---

## Properties

All properties are set as attributes on `<ejs-querybuilder>`.

| Property | TagHelper Attribute | Type | Default | Description |
|----------|-------------------|------|---------|-------------|
| `AddRuleToNewGroups` | `addRuleToNewGroups` | bool | `true` | Automatically adds an empty rule when a new group is created |
| `AllowDragAndDrop` | `allowDragAndDrop` | bool | `false` | Enables drag-and-drop to reorder rules and groups |
| `AllowValidation` | `allowValidation` | bool | `false` | Enables validation of rule fields and values |
| `AutoSelectField` | `autoSelectField` | bool | `false` | Auto-selects the first field when a new rule is added |
| `AutoSelectOperator` | `autoSelectOperator` | bool | `true` | Auto-selects the first operator when a new rule is added |
| `Columns` | `e-querybuilder-columns` | List\<QueryBuilderColumn\> | null | Defines the filterable column fields |
| `CssClass` | `cssClass` | string | `""` | Additional CSS class(es) for the root element |
| `DataSource` | `dataSource` | object | null | Local data array or DataManager for column binding |
| `DisplayMode` | `displayMode` | DisplayMode | `Horizontal` | Layout mode: `Horizontal` or `Vertical` |
| `EnableNotCondition` | `enableNotCondition` | bool | `false` | Shows NOT toggle for group conditions |
| `EnablePersistence` | `enablePersistence` | bool | `false` | Persists component state in browser localStorage |
| `EnableRtl` | `enableRtl` | bool | `false` | Renders component in right-to-left direction |
| `EnableSeparateConnector` | `enableSeparateConnector` | bool | `false` | Allows individual AND/OR connectors between rules |
| `FieldModel` | `fieldModel` | object | null | Configuration object passed to the field DropDownList |
| `FieldMode` | `fieldMode` | FieldMode | `Default` | Field selector mode: `Default` (DropDownList) or `DropDownTree` |
| `HeaderTemplate` | `headerTemplate` | string | null | Selector or template string for custom group header |
| `Height` | `height` | string | `"auto"` | Height of the QueryBuilder component |
| `HtmlAttributes` | `htmlAttributes` | object | — | Additional HTML attributes (title, name, etc.) |
| `ImmediateModeDelay` | `immediateModeDelay` | double | `0` | Debounce delay (ms) for ruleChange event |
| `Locale` | `locale` | string | `""` | Culture code for localization (e.g., `"ar"`, `"de"`, `"fr"`) |
| `MatchCase` | `matchCase` | bool | `false` | Enables case-sensitive string comparisons |
| `MaxGroupCount` | `maxGroupCount` | double | `5` | Maximum number of nested groups allowed |
| `OperatorModel` | `operatorModel` | object | null | Configuration object passed to the operator DropDownList |
| `Readonly` | `readonly` | bool | `false` | Disables all user interactions when true |
| `Rule` | `e-querybuilder-rule` | QueryBuilderRule | null | Initial rule/condition set to pre-populate |
| `Separator` | `separator` | string | `""` | Separator for hierarchical field names (used with FieldMode=DropDownTree) |
| `ShowButtons` | `e-querybuilder-showbuttons` | QueryBuilderShowButtons | null | Controls visibility of action buttons |
| `SortDirection` | `sortDirection` | SortDirection | `Default` | Sort order of column fields: `Default`, `Ascending`, `Descending` |
| `SummaryView` | `summaryView` | bool | `false` | Shows a collapsed read-only summary of the current rules |
| `ValueModel` | `valueModel` | object | null | Configuration object passed to the value input component |
| `Width` | `width` | string | `"auto"` | Width of the QueryBuilder component |

---

## Events

All events are set as attributes on `<ejs-querybuilder>` with JavaScript function names.

| Event | TagHelper Attribute | Description |
|-------|-------------------|-------------|
| `ActionBegin` | `actionBegin` | Fires when field, operator, or value changes; also fires for header template creation (`requestType: 'header-template-create'`) |
| `BeforeChange` | `beforeChange` | Fires before condition (AND/OR), field, operator, or value changes |
| `Change` | `change` | Fires when condition, field, value, or operator changes |
| `Created` | `created` | Fires when the component is fully created and rendered |
| `DataBound` | `dataBound` | Fires when data is bound to the QueryBuilder |
| `Destroyed` | `destroyed` | Fires when the component is destroyed |
| `Drag` | `drag` | Fires continuously while a rule/group is being dragged |
| `DragStart` | `dragStart` | Fires when a drag operation begins on a rule or group |
| `Drop` | `drop` | Fires when a rule/group is dropped onto a target |
| `RuleChange` | `ruleChange` | Fires when conditions (AND/OR), field, value, or operator change |

### Event Args — ActionBegin

```javascript
function onActionBegin(args) {
    // args.requestType — type of action (e.g., 'header-template-create', 'field', 'operator', 'value')
    // args.ruleID      — ID of the rule/group element affected
    // args.rule        — the current rule object
    // args.value       — the new value (for field/operator/value changes)
}
```

### Event Args — RuleChange

```javascript
function onRuleChange(args) {
    // args.previousRule — the previous rule state
    // args.rule         — the updated rule state (full RuleModel object)
    // args.type         — change type: 'field', 'operator', 'value', 'condition'
}
```

### Event Args — DragStart / Drag / Drop

```javascript
function onDrop(args) {
    // args.droppedRecord — the rule/group being dropped
    // args.target        — the target rule/group element
    // args.cancel        — set to true to cancel the drop
}
```

---

## QueryBuilderColumn Sub-Properties

Defined via `<e-querybuilder-column>` tags inside `<e-querybuilder-columns>`.

| Property | TagHelper Attribute | Type | Description |
|----------|-------------------|------|-------------|
| `Field` | `field` | string | Data source field name to bind (required) |
| `Label` | `label` | string | Display label in the field dropdown |
| `Type` | `type` | string | Data type: `"String"`, `"Number"`, `"Date"`, `"Boolean"` |
| `Format` | `format` | string | Format string for Date and Number types |
| `Step` | `step` | double | Increment step for numeric input |
| `Operators` | `operators` | object[] | Array of `{ key, value }` objects to restrict operators |
| `Validation` | `e-querybuilder-validation` | object | Validation rules for this column |
| `Template` | `e-querybuilder-template` | object | Custom input template (create/write/destroy functions) |
| `Values` | `values` | object[] | Predefined dropdown values for this column |

### QueryBuilderColumn.Validation Sub-Properties

Defined via `<e-querybuilder-validation>` inside `<e-querybuilder-column>`.

| Property | TagHelper Attribute | Type | Description |
|----------|-------------------|------|-------------|
| `IsRequired` | `isRequired` | bool | Field value must be provided |
| `Min` | `min` | double | Minimum allowed value (numbers) |
| `Max` | `max` | double | Maximum allowed value (numbers) |

### QueryBuilderColumn.Template Sub-Properties

Defined via `<e-querybuilder-template>` inside `<e-querybuilder-column>`.

| Property | TagHelper Attribute | Type | Description |
|----------|-------------------|------|-------------|
| `Create` | `create` | string | JS function name: creates the widget DOM element |
| `Write` | `write` | string | JS function name: wires events and sets initial value |
| `Destroy` | `destroy` | string | JS function name: cleans up the widget |

---

## QueryBuilderShowButtons Sub-Properties

Defined via `<e-querybuilder-showbuttons>` inside `<ejs-querybuilder>`.

| Property | TagHelper Attribute | Type | Default | Description |
|----------|-------------------|------|---------|-------------|
| `RuleDelete` | `ruleDelete` | bool | `true` | Show the delete button on individual rules |
| `GroupInsert` | `groupInsert` | bool | `true` | Show the Add Group/Condition button |
| `GroupDelete` | `groupDelete` | bool | `true` | Show the Delete Group button |
| `CloneRule` | `cloneRule` | bool | `false` | Show the Clone Rule button |
| `CloneGroup` | `cloneGroup` | bool | `false` | Show the Clone Group button |
| `LockRule` | `lockRule` | bool | `false` | Show the Lock Rule toggle button |
| `LockGroup` | `lockGroup` | bool | `false` | Show the Lock Group toggle button |

---

## TagHelper Naming Convention

Syncfusion ASP.NET Core TagHelpers follow PascalCase → camelCase/kebab-case conventions:

| C# Property | TagHelper Attribute |
|-------------|-------------------|
| `AllowDragAndDrop` | `allowDragAndDrop` |
| `EnableRtl` | `enableRtl` |
| `MaxGroupCount` | `maxGroupCount` |
| `SummaryView` | `summaryView` |
| `EnablePersistence` | `enablePersistence` |
| `DisplayMode` | `displayMode` |
| `SortDirection` | `sortDirection` |
| `Columns` (nested) | `<e-querybuilder-columns>` |
| `Rule` (nested) | `<e-querybuilder-rule>` |
| `ShowButtons` (nested) | `<e-querybuilder-showbuttons>` |

**Child tag naming pattern:** Nested complex objects use `<e-{component}-{property}>` syntax:
- `<e-querybuilder-columns>` → collection wrapper
- `<e-querybuilder-column>` → individual column item
- `<e-querybuilder-rule>` → rule root object
- `<e-querybuilder-rules>` → nested rules collection
- `<e-querybuilder-showbuttons>` → ShowButtons configuration
- `<e-querybuilder-validation>` → column validation rules
- `<e-querybuilder-template>` → column template functions

---

## JavaScript Methods Reference

These methods are called on the QueryBuilder JavaScript instance (`document.getElementById('id').ej2_instances[0]`):

| Method | Parameters | Returns | Description |
|--------|------------|---------|-------------|
| `getRules()` | — | RuleModel | Get current rules as JSON object |
| `setRules(rules)` | RuleModel | void | Set rules from JSON object |
| `getSqlFromRules(rules?)` | RuleModel? | string | Export rules to inline SQL string |
| `setRulesFromSql(sql)` | string | void | Import rules from inline SQL string |
| `getParameterizedSql(rules?)` | RuleModel? | object | Export to parameterized SQL (`{ sql, params }`) |
| `setParameterizedSql(paramSql)` | object | void | Import parameterized SQL (`{ sql, params }`) |
| `getParameterizedNamedSql(rules?)` | RuleModel? | object | Export to named parameter SQL |
| `setParameterizedNamedSql(namedSql)` | object | void | Import named parameter SQL |
| `getMongoQuery(rules?)` | RuleModel? | string | Export rules to MongoDB query string |
| `setMongoQuery(query)` | string | void | Import rules from MongoDB query string |
| `getPredicate(rules)` | RuleModel | Predicate | Get DataManager Predicate for filtering |
| `getDataManagerQuery(rules)` | RuleModel | Query | Get DataManager Query object |
| `addRules(rules, groupID)` | object[], string | void | Add rules to a specific group |
| `deleteRules(ruleIDs)` | string[] | void | Delete rules by element IDs |
| `addGroups(groups, groupID)` | object[], string | void | Add groups to a parent group |
| `deleteGroups(groupIDs)` | string[] | void | Delete groups by element IDs |
| `cloneRule(ruleID)` | string | void | Clone a rule by element ID |
| `cloneGroup(groupID)` | string | void | Clone a group by element ID |
| `lockRule(ruleID)` | string | void | Lock/unlock a rule by element ID |
| `lockGroup(groupID)` | string | void | Lock/unlock a group by element ID |
| `validateFields()` | — | boolean | Validates all rule fields; returns true if valid |
| `reset()` | — | void | Reset the QueryBuilder to its initial state |
| `destroy()` | — | void | Destroy the QueryBuilder component instance |
