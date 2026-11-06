# QueryBuilder API Reference

> **Official Documentation:** [Syncfusion Angular QueryBuilder API](https://ej2.syncfusion.com/angular/documentation/api/query-builder/index-default)

This document provides a comprehensive reference for the Syncfusion Angular QueryBuilder component API, including all properties, methods, and events.

## Table of Contents
- [Properties](#properties)
- [Methods](#methods)
- [Events](#events)
- [Interfaces & Types](#interfaces--types)

---

## Properties

### addRuleToNewGroups
**Type:** `boolean`  
**Default:** `true`

Specifies whether to enable/disable adding new rules when creating new groups.

```html
<ejs-querybuilder [addRuleToNewGroups]="false"></ejs-querybuilder>
```

---

### allowDragAndDrop
**Type:** `boolean`  
**Default:** `false`

Enables or disables drag-and-drop support for moving rules and groups.

```html
<ejs-querybuilder [allowDragAndDrop]="true"></ejs-querybuilder>
```

---

### allowValidation
**Type:** `boolean`  
**Default:** `false`

Enables or disables validation of field values and conditions.

```html
<ejs-querybuilder [allowValidation]="true"></ejs-querybuilder>
```

---

### autoSelectField
**Type:** `boolean`  
**Default:** `false`

Auto-selects the first available field value when adding new rules.

```html
<ejs-querybuilder [autoSelectField]="true"></ejs-querybuilder>
```

---

### autoSelectOperator
**Type:** `boolean`  
**Default:** `true`

Auto-selects the first available operator for the selected field.

```html
<ejs-querybuilder [autoSelectOperator]="false"></ejs-querybuilder>
```

---

### columns
**Type:** `ColumnsModel[]`  
**Default:** `{}`

Defines the columns/fields available in the Query Builder. Each column can specify field name, label, type, operators, and validation rules.

```typescript
@Component({
  template: `
    <ejs-querybuilder [columns]="columns"></ejs-querybuilder>
  `
})
export class App {
  columns: ColumnsModel[] = [
    { field: 'EmployeeID', label: 'Employee ID', type: 'number' },
    { field: 'FirstName', label: 'First Name', type: 'string' },
    { field: 'HireDate', label: 'Hire Date', type: 'date' },
    { field: 'Salary', label: 'Salary', type: 'number' }
  ];
}
```

See [columns.md](columns.md) for detailed configuration.

---

### cssClass
**Type:** `string`  
**Default:** `''`

Adds custom CSS classes to the Query Builder element.

```html
<ejs-querybuilder cssClass="custom-qb dark-theme"></ejs-querybuilder>
```

---

### dataSource
**Type:** `Object[] | Object | DataManager`  
**Default:** `[]`

Binds data source for auto-column generation or providing data context. Can be a JavaScript array, DataManager instance, or remote data source.

```typescript
// Local array
dataSource = [
  { id: 1, name: 'Alice', dept: 'Engineering' },
  { id: 2, name: 'Bob', dept: 'Sales' }
];

// Remote DataManager
dataSource = new DataManager({ 
  url: 'url', 
  adaptor: new ODataV4Adaptor() 
});
```

See [data-binding.md](data-binding.md) for detailed examples.

---

### displayMode
**Type:** `DisplayMode`  
**Default:** `'Horizontal'`

Specifies the layout mode: `'Horizontal'` or `'Vertical'`.

```html
<!-- Horizontal layout (default) -->
<ejs-querybuilder displayMode="Horizontal"></ejs-querybuilder>

<!-- Vertical layout -->
<ejs-querybuilder displayMode="Vertical"></ejs-querybuilder>
```

---

### enableNotCondition
**Type:** `boolean`  
**Default:** `false`

Enables or disables the NOT condition for groups.

```html
<ejs-querybuilder [enableNotCondition]="true"></ejs-querybuilder>
```

---

### enablePersistence
**Type:** `boolean`  
**Default:** `false`

Persists Query Builder state (rules) to browser localStorage across page reloads.

```html
<ejs-querybuilder [enablePersistence]="true"></ejs-querybuilder>
```

---

### enableRtl
**Type:** `boolean`  
**Default:** `false`

Renders the component in right-to-left direction for RTL languages.

```html
<ejs-querybuilder [enableRtl]="true"></ejs-querybuilder>
```

See [accessibility-and-localization.md](accessibility-and-localization.md) for RTL details.

---

### enableSeparateConnector
**Type:** `boolean`  
**Default:** `false`

Shows separate AND/OR connectors between individual rules instead of per-group.

```html
<ejs-querybuilder [enableSeparateConnector]="true"></ejs-querybuilder>
```

See [filtering-and-rules.md](filtering-and-rules.md) for examples.

---

### fieldMode
**Type:** `FieldMode`  
**Default:** `'Default'`

Specifies field dropdown mode: `'Default'` (DropDownList) or `'DropDownTree'` for hierarchical fields.

```html
<ejs-querybuilder fieldMode="DropDownTree"></ejs-querybuilder>
```

---

### fieldModel
**Type:** `DropDownListModel | DropDownTreeModel`  
**Default:** `null`

Configures field dropdown properties (placeholder, filtering, etc.).

```typescript
fieldModel = {
  placeholder: 'Select a field',
  allowFiltering: true,
  dataSource: []
};
```

---

### headerTemplate
**Type:** `any`  
**Default:** `null`

Custom template for the Query Builder header area.

```html
<ejs-querybuilder [headerTemplate]="headerTemplate"></ejs-querybuilder>
```

See [templates.md](templates.md) for template examples.

---

### height
**Type:** `string`  
**Default:** `'auto'`

Sets the height of the Query Builder container. Can be pixel values or percentages.

```html
<ejs-querybuilder height="500px"></ejs-querybuilder>
<ejs-querybuilder height="100%"></ejs-querybuilder>
```

---

### immediateModeDelay
**Type:** `number`  
**Default:** `0`

Delay (in milliseconds) before triggering the `ruleChange` event after modifications.

```html
<ejs-querybuilder [immediateModeDelay]="500"></ejs-querybuilder>
```

---

### locale
**Type:** `string`  
**Default:** `''`

Overrides the global locale for this component instance. Example values: `'en-US'`, `'de'`, `'fr'`, `'ar'`, etc.

```html
<ejs-querybuilder locale="de"></ejs-querybuilder>
```

See [accessibility-and-localization.md](accessibility-and-localization.md) for all supported locales.

---

### matchCase
**Type:** `boolean`  
**Default:** `false`

If `true`, string comparisons are case-sensitive. If `false`, comparisons are case-insensitive.

```html
<ejs-querybuilder [matchCase]="true"></ejs-querybuilder>
```

---

### maxGroupCount
**Type:** `number`  
**Default:** `5`

Limits the maximum nesting depth of groups. Prevents over-complex query hierarchies.

```html
<ejs-querybuilder [maxGroupCount]="3"></ejs-querybuilder>
```

---

### operatorModel
**Type:** `DropDownListModel`  
**Default:** `null`

Configures operator dropdown properties (placeholder, filtering, etc.).

```typescript
operatorModel = {
  placeholder: 'Select operator',
  allowFiltering: true
};
```

---

### readonly
**Type:** `boolean`  
**Default:** `false`

When `true`, disables all user interactions on the component (read-only mode).

```html
<ejs-querybuilder [readonly]="true"></ejs-querybuilder>
```

---

### rule
**Type:** `RuleModel`  
**Default:** `{}`

Defines the initial rules to be rendered in the Query Builder.

```typescript
rule = {
  condition: 'and',
  rules: [
    { field: 'EmployeeID', operator: 'equal', value: 1 },
    { field: 'FirstName', operator: 'contains', value: 'John' }
  ]
};
```

See [import-export.md](import-export.md) for RuleModel structure.

---

### separator
**Type:** `string`  
**Default:** `''`

Separator string for hierarchical column names.

```html
<ejs-querybuilder separator="_"></ejs-querybuilder>
```

---

### showButtons
**Type:** `ShowButtonsModel`  
**Default:** `{ ruleDelete: true, groupInsert: true, groupDelete: true }`

Controls visibility of action buttons in the Query Builder UI.

```typescript
showButtons = {
  ruleDelete: true,
  groupInsert: true,
  groupDelete: true,
  ruleInsert: true,
  cloneRule: true,
  cloneGroup: true,
  lockRule: true,
  lockGroup: true
};
```

---

### sortDirection
**Type:** `SortDirection`  
**Default:** `'Default'`

Specifies sorting order of field dropdown: `'Default'`, `'Ascending'`, or `'Descending'`.

```html
<ejs-querybuilder sortDirection="Ascending"></ejs-querybuilder>
```

See [accessibility-and-localization.md](accessibility-and-localization.md) for details.

---

### summaryView
**Type:** `boolean`  
**Default:** `false`

Displays a human-readable summary of the current query below the rules.

```html
<ejs-querybuilder [summaryView]="true"></ejs-querybuilder>
```

---

### valueModel
**Type:** `ValueModel`  
**Default:** `null`

Configures the value input properties based on field type.

```typescript
valueModel = {
  dataSource: [],
  allowFiltering: true,
  fields: { text: 'name', value: 'id' }
};
```

---

### width
**Type:** `string`  
**Default:** `'auto'`

Sets the width of the Query Builder container. Can be pixel values or percentages.

```html
<ejs-querybuilder width="800px"></ejs-querybuilder>
```

---

## Methods

### addGroups
Adds one or more groups with rules to the Query Builder.

**Signature:**
```typescript
addGroups(groups: RuleModel[], groupID?: string): void
```

**Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| `groups` | `RuleModel[]` | Array of group objects to add |
| `groupID` | `string` | (Optional) Parent group ID. If omitted, adds to root |

**Example:**
```typescript
const newGroups = [
  {
    condition: 'or',
    rules: [
      { field: 'City', operator: 'equal', value: 'London' }
    ]
  }
];
this.qb.addGroups(newGroups, 'querybuilder_group0');
```

---

### addRules
Adds one or more rules to the Query Builder.

**Signature:**
```typescript
addRules(rule: RuleModel[], groupID?: string): void
```

**Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| `rule` | `RuleModel[]` | Array of rule objects to add |
| `groupID` | `string` | (Optional) Group ID. If omitted, adds to root group |

**Example:**
```typescript
const newRules = [
  { field: 'Salary', operator: 'greaterThan', value: 50000 },
  { field: 'Title', operator: 'contains', value: 'Manager' }
];
this.qb.addRules(newRules, 'querybuilder_group0');
```

---

### cloneGroup
Clones an existing group to a specified parent group.

**Signature:**
```typescript
cloneGroup(groupID: string, parentGroupID?: string, index?: number): void
```

**Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| `groupID` | `string` | ID of the group to clone |
| `parentGroupID` | `string` | (Optional) Parent group ID for the clone |
| `index` | `number` | (Optional) Position index in parent |

**Example:**
```typescript
this.qb.cloneGroup('querybuilder_group1', 'querybuilder_group0', 0);
```

See [clone-group-rule.md](clone-group-rule.md) for detailed documentation.

---

### cloneRule
Clones an existing rule to a specified group.

**Signature:**
```typescript
cloneRule(ruleID: string, groupID?: string, index?: number): void
```

**Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| `ruleID` | `string` | ID of the rule to clone |
| `groupID` | `string` | (Optional) Target group ID |
| `index` | `number` | (Optional) Position index in group |

**Example:**
```typescript
this.qb.cloneRule('querybuilder_rule0', 'querybuilder_group0');
```

---

### deleteGroup
Deletes a group from the Query Builder.

**Signature:**
```typescript
deleteGroup(target: Element | string): void
```

**Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| `target` | `Element \| string` | Group element or group ID |

**Example:**
```typescript
this.qb.deleteGroup('querybuilder_group1');
```

---

### deleteGroups
Deletes multiple groups by their IDs.

**Signature:**
```typescript
deleteGroups(groupIdColl: string[]): void
```

**Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| `groupIdColl` | `string[]` | Array of group IDs to delete |

**Example:**
```typescript
this.qb.deleteGroups(['querybuilder_group1', 'querybuilder_group2']);
```

---

### deleteRules
Deletes multiple rules by their IDs.

**Signature:**
```typescript
deleteRules(ruleIdColl: string[]): void
```

**Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| `ruleIdColl` | `string[]` | Array of rule IDs to delete |

**Example:**
```typescript
this.qb.deleteRules(['querybuilder_rule0', 'querybuilder_rule1']);
```

---

### destroy
Removes the component from the DOM and detaches all event handlers.

**Signature:**
```typescript
destroy(): void
```

**Example:**
```typescript
ngOnDestroy() {
  this.qb.destroy();
}
```

---

### getDataManagerQuery
Generates a DataManager query from the current rules (used with `getPredicate`).

**Signature:**
```typescript
getDataManagerQuery(rule?: RuleModel): Query
```

**Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| `rule` | `RuleModel` | (Optional) Specific rule; uses current rules if omitted |

**Returns:** `Query` - DataManager Query object

**Example:**
```typescript
const query = this.qb.getDataManagerQuery();
const filteredData = this.dataManager.executeQuery(query).then(e => e.result);
```

---

### getFilteredRecords
Returns filtered records based on current rules applied to the dataSource.

**Signature:**
```typescript
getFilteredRecords(): Promise<object>
```

**Returns:** `Promise<object>` - Promise resolving to filtered records

**Example:**
```typescript
this.qb.getFilteredRecords().then(records => {
  console.log('Filtered records:', records);
});
```

---

### getGroup
Retrieves the group object for a specified element or ID.

**Signature:**
```typescript
getGroup(target: Element | string): RuleModel
```

**Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| `target` | `Element \| string` | Group element or group ID |

**Returns:** `RuleModel` - Group rule object

**Example:**
```typescript
const group = this.qb.getGroup('querybuilder_group0');
console.log(group.condition); // 'and' or 'or'
```

---

### getMongoQuery
Exports current rules as a MongoDB query string.

**Signature:**
```typescript
getMongoQuery(rule?: RuleModel): string
```

**Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| `rule` | `RuleModel` | (Optional) Specific rule; uses current rules if omitted |

**Returns:** `string` - MongoDB query string

**Example:**
```typescript
const mongoQuery = this.qb.getMongoQuery();
console.log(mongoQuery);
// Output: { "$and": [{ "EmployeeID": { "$eq": 1 } }, { "FirstName": { "$regex": "John" } }] }
```

See [import-export.md](import-export.md) for MongoDB export details.

---

### getOperators
Returns the list of operators available for a specific field or column.

**Signature:**
```typescript
getOperators(): { [key: string]: Object }[]
```

**Returns:** `{ [key: string]: Object }[]` - Array of operator objects

**Example:**
```typescript
const operators = this.qb.getOperators();
console.log(operators);
```

---

### getParameterizedNamedSql
Generates a parameterized named SQL query from current rules.

**Signature:**
```typescript
getParameterizedNamedSql(rule?: RuleModel): ParameterizedNamedSql
```

**Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| `rule` | `RuleModel` | (Optional) Specific rule; uses current rules if omitted |

**Returns:** `ParameterizedNamedSql` - Object with `sql` and `params` properties

**Example:**
```typescript
const paramQuery = this.qb.getParameterizedNamedSql();
// { sql: "SELECT * FROM Employees WHERE @EmployeeID = :EmployeeID", params: { EmployeeID: 1 } }
```

---

### getParameterizedSql
Generates a parameterized SQL query with ? placeholders.

**Signature:**
```typescript
getParameterizedSql(rule?: RuleModel): ParameterizedSql
```

**Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| `rule` | `RuleModel` | (Optional) Specific rule; uses current rules if omitted |

**Returns:** `ParameterizedSql` - Object with `sql` and `params` properties

**Example:**
```typescript
const paramQuery = this.qb.getParameterizedSql();
// { sql: "SELECT * FROM Employees WHERE EmployeeID = ? AND FirstName LIKE ?", params: [1, "John"] }
```

See [import-export.md](import-export.md) for parameterized SQL details.

---

### getPredicate
Generates a Syncfusion Predicate object for use with DataManager filtering.

**Signature:**
```typescript
getPredicate(rule: RuleModel): Predicate
```

**Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| `rule` | `RuleModel` | Rule to convert to predicate |

**Returns:** `Predicate` - Syncfusion Predicate object

**Example:**
```typescript
const predicate = this.qb.getPredicate(this.qb.getRules());
this.dataManager.executeQuery(new Query().where(predicate)).then(e => {
  console.log(e.result);
});
```

---

### getRule
Retrieves the rule object for a specified element or ID.

**Signature:**
```typescript
getRule(elem: string | HTMLElement): RuleModel
```

**Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| `elem` | `string \| HTMLElement` | Rule element or rule ID |

**Returns:** `RuleModel` - Rule object

**Example:**
```typescript
const rule = this.qb.getRule('querybuilder_rule0');
console.log(rule.field, rule.operator, rule.value);
```

---

### getRules
Returns the complete rules collection as a RuleModel object.

**Signature:**
```typescript
getRules(): RuleModel
```

**Returns:** `RuleModel` - Current rules in the Query Builder

**Example:**
```typescript
const rules = this.qb.getRules();
console.log(JSON.stringify(rules, null, 2));
```

---

### getRulesFromSql
Parses a SQL query string and converts it to Query Builder rules.

**Signature:**
```typescript
getRulesFromSql(sqlString: string, sqlLocale?: boolean): RuleModel
```

**Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| `sqlString` | `string` | SQL WHERE clause (e.g., "EmployeeID = 1 AND FirstName LIKE 'John'") |
| `sqlLocale` | `boolean` | (Optional) Apply localization to SQL parsing |

**Returns:** `RuleModel` - Parsed rules object

**Example:**
```typescript
const sql = "EmployeeID = 1 AND FirstName LIKE '%John%'";
const rules = this.qb.getRulesFromSql(sql);
```

See [import-export.md](import-export.md) for SQL import details.

---

### getSqlFromRules
Exports current rules as a SQL WHERE clause string.

**Signature:**
```typescript
getSqlFromRules(rule?: RuleModel, allowEscape?: boolean, sqlLocale?: boolean): string
```

**Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| `rule` | `RuleModel` | (Optional) Specific rule; uses current rules if omitted |
| `allowEscape` | `boolean` | (Optional) Exclude escape characters if `true` |
| `sqlLocale` | `boolean` | (Optional) Apply localization to SQL output |

**Returns:** `string` - SQL WHERE clause

**Example:**
```typescript
const sql = this.qb.getSqlFromRules();
console.log(sql);
// Output: "EmployeeID = 1 AND FirstName LIKE '%John%'"
```

---

### getValidRules
Returns only the valid rules from the collection (filters out invalid ones).

**Signature:**
```typescript
getValidRules(currentRule?: RuleModel): RuleModel
```

**Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| `currentRule` | `RuleModel` | (Optional) Specific rule to validate |

**Returns:** `RuleModel` - Valid rules only

**Example:**
```typescript
const validRules = this.qb.getValidRules();
```

---

### getValues
Retrieves distinct values available for a specific field (for dropdowns).

**Signature:**
```typescript
getValues(field: string): object[]
```

**Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| `field` | `string` | Field name to get values for |

**Returns:** `object[]` - Array of distinct values

**Example:**
```typescript
const countries = this.qb.getValues('Country');
console.log(countries); // ['USA', 'UK', 'Canada', ...]
```

---

### lockGroup
Makes a group and all its contained rules read-only.

**Signature:**
```typescript
lockGroup(groupID: string): void
```

**Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| `groupID` | `string` | ID of the group to lock |

**Example:**
```typescript
this.qb.lockGroup('querybuilder_group0');
```

See [lock-group-rule.md](lock-group-rule.md) for locking examples.

---

### lockRule
Makes a rule read-only (prevents editing).

**Signature:**
```typescript
lockRule(ruleID: string): void
```

**Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| `ruleID` | `string` | ID of the rule to lock |

**Example:**
```typescript
this.qb.lockRule('querybuilder_rule0');
```

---

### notifyChange
Notifies the component of external value changes to update the UI.

**Signature:**
```typescript
notifyChange(value: string | number | boolean | Date | string[] | number[] | Date[], element: Element, type?: string): void
```

**Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| `value` | Value types | New value to update |
| `element` | `Element` | DOM element to update |
| `type` | `string` | (Optional) Update type |

**Example:**
```typescript
this.qb.notifyChange('NewValue', element);
```

---

### reset
Clears all rules from the Query Builder (resets to empty state).

**Signature:**
```typescript
reset(): void
```

**Example:**
```typescript
this.qb.reset();
```

---

### setMongoQuery
Imports a MongoDB query string and populates the Query Builder.

**Signature:**
```typescript
setMongoQuery(mongoQuery: string, mongoLocale?: boolean): void
```

**Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| `mongoQuery` | `string` | MongoDB query string |
| `mongoLocale` | `boolean` | (Optional) Apply localization |

**Example:**
```typescript
const mongoQuery = '{ "$and": [{ "EmployeeID": { "$eq": 1 } }] }';
this.qb.setMongoQuery(mongoQuery);
```

See [import-export.md](import-export.md) for MongoDB import details.

---

### setParameterizedNamedSql
Imports a parameterized named SQL query into the Query Builder.

**Signature:**
```typescript
setParameterizedNamedSql(sqlQuery: ParameterizedNamedSql): void
```

**Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| `sqlQuery` | `ParameterizedNamedSql` | Object with `sql` and named parameters |

**Example:**
```typescript
const paramQuery = {
  sql: "SELECT * FROM Employees WHERE EmployeeID = @EmployeeID",
  params: { EmployeeID: 1 }
};
this.qb.setParameterizedNamedSql(paramQuery);
```

---

### setParameterizedSql
Imports a parameterized SQL query (with ? placeholders) into the Query Builder.

**Signature:**
```typescript
setParameterizedSql(sqlQuery: ParameterizedSql): void
```

**Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| `sqlQuery` | `ParameterizedSql` | Object with `sql` and `params` array |

**Example:**
```typescript
const paramQuery = {
  sql: "SELECT * FROM Employees WHERE EmployeeID = ? AND FirstName LIKE ?",
  params: [1, "John"]
};
this.qb.setParameterizedSql(paramQuery);
```

---

### setRules
Sets or replaces the complete rules in the Query Builder.

**Signature:**
```typescript
setRules(rule: RuleModel): void
```

**Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| `rule` | `RuleModel` | Rule object to set |

**Example:**
```typescript
const newRules = {
  condition: 'and',
  rules: [
    { field: 'EmployeeID', operator: 'equal', value: 1 },
    { field: 'Salary', operator: 'greaterThan', value: 50000 }
  ]
};
this.qb.setRules(newRules);
```

---

### setRulesFromSql
Imports inline SQL and converts it to Query Builder rules.

**Signature:**
```typescript
setRulesFromSql(sqlString: string, sqlLocale?: boolean): void
```

**Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| `sqlString` | `string` | SQL WHERE clause to import |
| `sqlLocale` | `boolean` | (Optional) Apply localization |

**Example:**
```typescript
const sql = "EmployeeID = 1 AND FirstName LIKE '%John%'";
this.qb.setRulesFromSql(sql);
```

---

### validateFields
Triggers validation on all fields and displays error messages for invalid entries.

**Signature:**
```typescript
validateFields(): boolean
```

**Returns:** `boolean` - `true` if all fields are valid, `false` otherwise

**Example:**
```typescript
if (this.qb.validateFields()) {
  console.log('All validations passed');
  const rules = this.qb.getRules();
  // Process valid rules
} else {
  console.log('Validation failed');
}
```

---

## Events

### actionBegin
Triggers when field, operator, or value selection changes.

**Type:** `EmitType<ActionEventArgs>`

**Example:**
```html
<ejs-querybuilder (actionBegin)="onActionBegin($event)"></ejs-querybuilder>
```

```typescript
onActionBegin(args: ActionEventArgs) {
  console.log('Action:', args.action);
  console.log('Current rules:', args.value);
}
```

---

### beforeChange
Triggers before any change to condition, field, operator, or value.

**Type:** `EmitType<ChangeEventArgs>`

**Example:**
```html
<ejs-querybuilder (beforeChange)="onBeforeChange($event)"></ejs-querybuilder>
```

```typescript
onBeforeChange(args: ChangeEventArgs) {
  console.log('Before change - field:', args.field);
  // Can prevent change by setting args.cancel = true
}
```

---

### change
Triggers after any change to condition, field, operator, or value.

**Type:** `EmitType<ChangeEventArgs>`

**Example:**
```html
<ejs-querybuilder (change)="onChange($event)"></ejs-querybuilder>
```

```typescript
onChange(args: ChangeEventArgs) {
  console.log('Changed - field:', args.field);
  console.log('New value:', args.value);
}
```

---

### created
Triggers after the Query Builder component is successfully created and rendered.

**Type:** `EmitType<Event>`

**Example:**
```html
<ejs-querybuilder (created)="onCreated($event)"></ejs-querybuilder>
```

```typescript
onCreated(args: Event) {
  console.log('Query Builder created');
  // Component ready for interaction
}
```

---

### dataBound
Triggers when data is bound to the Query Builder (from dataSource).

**Type:** `EmitType<Object>`

**Example:**
```html
<ejs-querybuilder (dataBound)="onDataBound($event)"></ejs-querybuilder>
```

```typescript
onDataBound(args: any) {
  console.log('Data bound to Query Builder');
}
```

---

### destroyed
Triggers when the Query Builder component is destroyed.

**Type:** `EmitType<Object>`

**Example:**
```html
<ejs-querybuilder (destroyed)="onDestroyed($event)"></ejs-querybuilder>
```

```typescript
onDestroyed(args: any) {
  console.log('Query Builder destroyed');
}
```

---

### ruleChange
Triggers when the rules collection changes (condition, field, operator, or value).

**Type:** `EmitType<RuleChangeEventArgs>`

**Example:**
```html
<ejs-querybuilder (ruleChange)="onRuleChange($event)"></ejs-querybuilder>
```

```typescript
onRuleChange(args: RuleChangeEventArgs) {
  console.log('Rules changed');
  console.log('Updated rules:', args.value);
  // Export to SQL/MongoDB if needed
  const sql = this.qb.getSqlFromRules();
  console.log('Generated SQL:', sql);
}
```

---

## Interfaces & Types

### RuleModel
Represents a rule or group of rules.

```typescript
interface RuleModel {
  condition?: string;        // 'and' | 'or'
  not?: boolean;            // Enable NOT condition (requires enableNotCondition)
  rules?: RuleModel[];      // Sub-rules for groups
  field?: string;           // Field name for individual rules
  type?: string;            // Field data type
  operator?: string;        // Comparison operator
  value?: any;              // Comparison value
  label?: string;           // Field display label
  level?: number;           // Nesting level
}
```

### ColumnsModel
Represents a column/field definition.

```typescript
interface ColumnsModel {
  field: string;                        // Unique field identifier
  label?: string;                       // Display label
  type?: string;                        // 'string' | 'number' | 'date' | 'boolean' | 'dropdown'
  dataSource?: any[];                   // Values for dropdown type
  operators?: OperatorModel[];          // Custom operators for this field
  values?: any[];                       // Predefined values
  template?: string;                    // Custom value template
  validationRules?: any;                // Validation configuration
  format?: string;                      // Format string (for date/number)
  step?: number;                        // Step value (for number type)
  min?: number | Date;                  // Minimum value
  max?: number | Date;                  // Maximum value
  value?: any;                          // Default value
  optionsText?: string;                 // Key for dropdown display text
  optionsValue?: string;                // Key for dropdown value
}
```

### ShowButtonsModel
Controls button visibility.

```typescript
interface ShowButtonsModel {
  ruleDelete?: boolean;      // Show delete rule button
  groupInsert?: boolean;     // Show add group button
  groupDelete?: boolean;     // Show delete group button
  ruleInsert?: boolean;      // Show add rule button
  cloneRule?: boolean;       // Show clone rule button
  cloneGroup?: boolean;      // Show clone group button
  lockRule?: boolean;        // Show lock rule button
  lockGroup?: boolean;       // Show lock group button
}
```

### ParameterizedSql
Represents parameterized SQL with ? placeholders.

```typescript
interface ParameterizedSql {
  sql: string;               // SQL query with ? placeholders
  params: any[];             // Parameter values array
}
```

### ParameterizedNamedSql
Represents parameterized SQL with named parameters.

```typescript
interface ParameterizedNamedSql {
  sql: string;               // SQL query with named parameters (@ParamName or :ParamName)
  params: { [key: string]: any };  // Named parameter values
}
```

### DisplayMode
Type for display layout mode.

```typescript
type DisplayMode = 'Horizontal' | 'Vertical';
```

### FieldMode
Type for field dropdown mode.

```typescript
type FieldMode = 'Default' | 'DropDownTree';
```

### SortDirection
Type for field sorting.

```typescript
type SortDirection = 'Default' | 'Ascending' | 'Descending';
```

---

## Related Documentation

- [Getting Started](getting-started.md) - Setup and basic usage
- [Columns Configuration](columns.md) - Field and operator setup
- [Data Binding](data-binding.md) - Local and remote data sources
- [Filtering & Rules](filtering-and-rules.md) - Rule management
- [Import/Export](import-export.md) - SQL, MongoDB, JSON export/import
- [Templates](templates.md) - Custom UI templates
- [Style & Appearance](style-and-appearance.md) - Theming and CSS
- [Accessibility & Localization](accessibility-and-localization.md) - i18n and WCAG

---

## Official References

- **Syncfusion Angular QueryBuilder API:** https://ej2.syncfusion.com/angular/documentation/api/query-builder/
- **GitHub Repository:** https://github.com/syncfusion/ej2-angular-ui-components
- **NpmJS Package:** https://www.npmjs.com/package/@syncfusion/ej2-angular-querybuilder
