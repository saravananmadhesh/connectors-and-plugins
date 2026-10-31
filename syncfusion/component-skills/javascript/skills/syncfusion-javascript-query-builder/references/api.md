# QueryBuilder — API Reference

Comprehensive API reference for `QueryBuilder` from `@syncfusion/ej2-querybuilder`. Includes all public properties, methods, events, and key related model / event-arg interfaces. Source: https://ej2.syncfusion.com/documentation/api/query-builder/index-default

---

## Summary

- Component: `QueryBuilder`
- Package: `@syncfusion/ej2-querybuilder`

---

## Properties

- `addRuleToNewGroups: boolean` — Specifies whether a new rule is added automatically when a new group is added.
  - Default: `true`

- `allowDragAndDrop: boolean` — Enables or disables drag-and-drop support to move rules/groups.
  - Default: `false`

- `allowValidation: boolean` — Enables or disables validation on the rules.
  - Default: `false`

- `autoSelectField: boolean` — Specifies whether to auto-select the first field value when adding a rule.
  - Default: `false`

- `autoSelectOperator: boolean` — Specifies whether to auto-select the first operator value when adding a rule.
  - Default: `true`

- `columns: ColumnsModel[]` — Specifies the column definitions used to create filters.
  - Default: `{}`
  - See: https://ej2.syncfusion.com/documentation/api/query-builder/columnsmodel

- `cssClass: string` — One or more CSS classes (space-separated) to customize the QueryBuilder element appearance.
  - Default: `''`

- `dataSource: Object[] | Object | DataManager` — Binds the data source (local array, plain object, or DataManager) to populate column values.
  - Default: `[]`

- `displayMode: DisplayMode` — Specifies the layout mode of the QueryBuilder. Accepted values: `'Horizontal'` | `'Vertical'`.
  - Default: `'Horizontal'`
  - See: https://ej2.syncfusion.com/documentation/api/query-builder/displaymode

- `enableNotCondition: boolean` — Enables or disables the NOT condition toggle on groups.
  - Default: `false`

- `enablePersistence: boolean` — Enables or disables persisting the component state between page reloads.
  - Default: `false`

- `enableRtl: boolean` — Enables or disables rendering the component in right-to-left direction.
  - Default: `false`

- `enableSeparateConnector: boolean` — Specifies whether separate connectors are shown between individual rules/groups.
  - Default: `false`

- `fieldMode: FieldMode` — Specifies the field selection widget mode. Accepted values: `'Default'` (DropDownList) | `'DropDownTree'`.
  - Default: `'Default'`
  - See: https://ej2.syncfusion.com/documentation/api/query-builder/fieldmode

- `fieldModel: DropDownListModel | DropDownTreeModel` — Specifies model properties for the field DropDownList/DropDownTree widget.
  - Default: `null`

- `headerTemplate: string | Function` — Specifies a custom template for the QueryBuilder header area.
  - Default: `null`

- `height: string` — Specifies the height of the QueryBuilder.
  - Default: `'auto'`

- `immediateModeDelay: number` — If set, the `ruleChange` event is triggered after this delay (in milliseconds) following a rule change.
  - Default: `0`

- `locale: string` — Overrides the global culture/localization value for this component.
  - Default: `''`

- `matchCase: boolean` — If `true`, filters records with exact (case-sensitive) match; if `false`, filtering is case-insensitive.
  - Default: `false`

- `maxGroupCount: number` — Specifies the maximum number of nested groups allowed.
  - Default: `5`

- `operatorModel: DropDownListModel` — Specifies model properties for the operator DropDownList widget.
  - Default: `null`

- `readonly: boolean` — When `true`, all user interactions with the component are disabled.
  - Default: `false`

- `rule: RuleModel` — Defines the initial rule (JSON) loaded into the QueryBuilder on render.
  - Default: `{}`
  - See: https://ej2.syncfusion.com/documentation/api/query-builder/rulemodel

- `separator: string` — Specifies a separator string used between nested column field names.
  - Default: `''`

- `showButtons: ShowButtonsModel` — Configures the visibility of action buttons (ruleDelete, groupInsert, groupDelete, cloneRule, cloneGroup, lockRule, lockGroup).
  - Default: `{ ruleDelete: true, groupInsert: true, groupDelete: true }`
  - See: https://ej2.syncfusion.com/documentation/api/query-builder/showbuttonsmodel

- `sortDirection: SortDirection` — Specifies the sort direction of field names in the dropdown. Accepted values: `'Default'` | `'Ascending'` | `'Descending'`.
  - Default: `'Default'`
  - See: https://ej2.syncfusion.com/documentation/api/query-builder/sortdirection

- `summaryView: boolean` — Shows or hides the summary view of the current filter query.
  - Default: `false`

- `valueModel: ValueModel` — Specifies model properties for the value input widgets (TextBox, NumericTextBox, DatePicker, MultiSelect, RadioButton).
  - Default: `null`
  - See: https://ej2.syncfusion.com/documentation/api/query-builder/valuemodel

- `width: string` — Specifies the width of the QueryBuilder.
  - Default: `'auto'`

---

## Methods (Public API)

Each entry lists parameters and return type.

- `addEventListener(eventName: string, handler: Function): void` — Adds a handler to the given event listener.

- `addGroups(groups: RuleModel[], groupID: string): void` — Adds one or more groups (each containing a collection of rules) to the specified group.

- `addRules(rule: RuleModel[], groupID: string): void` — Adds one or more rules to the specified group.

- `appendTo(selector?: string | HTMLElement): void` — Appends the QueryBuilder control to the target element.

- `cloneGroup(groupID: string, parentGroupID: string, index: number): void` — Clones the specified group and inserts it into the parent group at the given index.

- `cloneRule(ruleID: string, groupID: string, index: number): void` — Clones the specified rule and inserts it into the given group at the given index.

- `dataBind(): void` — Applies all pending property changes immediately to the component.

- `deleteGroup(target: Element | string): void` — Deletes the group identified by the target element or group ID.

- `deleteGroups(groupIdColl: string[]): void` — Deletes one or more groups by their IDs.

- `deleteRules(ruleIdColl: string[]): void` — Deletes one or more rules by their IDs.

- `destroy(): void` — Removes the component from the DOM and detaches all related event handlers.

- `getDataManagerQuery(rule: RuleModel): Query` — Returns a Data Manager `Query` object built from the given rule.

- `getFilteredRecords(): Promise<object> | object` — Returns filtered records from the bound data source matching the current rules.

- `getGroup(target: Element | string): RuleModel` — Returns the `RuleModel` for the given group element or group ID.

- `getMongoQuery(rule?: RuleModel): string` — Returns a MongoDB query string built from the current (or supplied) rules.

- `getOperators(): { [key: string]: Object }[]` — Returns the operators bound to each column.

- `getParameterizedNamedSql(rule?: RuleModel): ParameterizedNamedSql` — Returns a named-parameter SQL object (`{ sql, params }`) from the current (or supplied) rules.
  - See: https://ej2.syncfusion.com/documentation/api/query-builder/parameterizedNamedSql

- `getParameterizedSql(rule?: RuleModel): ParameterizedSql` — Returns a positional-parameter SQL object (`{ sql, params }`) from the current (or supplied) rules.
  - See: https://ej2.syncfusion.com/documentation/api/query-builder/parameterizedsql

- `getPredicate(rule: RuleModel): Predicate` — Returns an EJ2 `Predicate` object built from the given rule collection.

- `getRootElement(): HTMLElement` — Returns the root DOM element of the component.

- `getRule(elem: string | HTMLElement): RuleModel` — Returns the `RuleModel` for the given rule element or rule ID.

- `getRules(): RuleModel` — Returns the complete current rule collection.

- `getRulesFromSql(sqlString: string, sqlLocale?: boolean): RuleModel` — Parses a SQL WHERE clause string and returns the equivalent `RuleModel`.

- `getSqlFromRules(rule?: RuleModel, allowEscape?: boolean, sqlLocale?: boolean): string` — Returns a SQL WHERE clause string built from the current (or supplied) rules.

- `getValidRules(currentRule?: RuleModel): RuleModel` — Returns only valid (complete) rules from the current or supplied rule collection.

- `getValues(field: string): object[]` — Returns the values bound to the specified column field.

- `lockGroup(groupID: string): void` — Locks the specified group to prevent modification.

- `lockRule(ruleID: string): void` — Locks the specified rule to prevent modification.

- `notifyChange(value: string | number | boolean | Date | string[] | number[] | Date[], element: Element, type?: string): void` — Notifies the QueryBuilder of a value change from a custom template widget, updating the rule accordingly.

- `refresh(): void` — Applies all pending property changes and re-renders the component.

- `removeEventListener(eventName: string, handler: Function): void` — Removes the handler from the specified event listener.

- `reset(): void` — Clears all rules, leaving only the root (empty) group.

- `setMongoQuery(mongoQuery: string, mongoLocale?: boolean): void` — Parses a MongoDB query string and loads the resulting rules into the component.

- `setParameterizedNamedSql(sqlQuery: ParameterizedNamedSql): void` — Parses a named-parameter SQL object and loads the resulting rules into the component.

- `setParameterizedSql(sqlQuery: ParameterizedSql): void` — Parses a positional-parameter SQL object and loads the resulting rules into the component.

- `setRules(rule: RuleModel): void` — Sets (replaces) the current rule collection with the given rule.

- `setRulesFromSql(sqlString: string, sqlLocale?: boolean): void` — Parses a SQL WHERE clause string and loads the resulting rules into the component.

- `validateFields(): boolean` — Validates all rule conditions and displays errors for any invalid fields. Returns `true` if all rules are valid.

- `Inject(moduleList: Function[]): void` — Dynamically injects required modules into the component.

---

## Events

- `actionBegin: EmitType<ActionEventArgs>` — Triggers when a field, operator, or value begins to change.
  - Args: `{ name: string }`
  - See: https://ej2.syncfusion.com/documentation/api/query-builder/actioneventargs

- `beforeChange: EmitType<ChangeEventArgs>` — Triggers **before** a condition (AND/OR), field, operator, or value is changed. Allows cancellation.
  - Args: `{ name: string }`
  - See: https://ej2.syncfusion.com/documentation/api/query-builder/changeeventargs

- `change: EmitType<ChangeEventArgs>` — Triggers **after** a condition (AND/OR), field, operator, or value has changed.
  - Args: `{ name: string }`
  - See: https://ej2.syncfusion.com/documentation/api/query-builder/changeeventargs

- `created: EmitType<Event>` — Triggers when the component is fully rendered and ready.

- `dataBound: EmitType<Object>` — Triggers when the data source is bound to the QueryBuilder.

- `destroyed: EmitType<Object>` — Triggers when the component is destroyed.

- `drag: EmitType<DragEventArgs>` — Triggers continuously while a rule or group is being dragged.
  - Args: `{ cancel: boolean, dragGroupID: string, dragRuleID: string }`
  - See: https://ej2.syncfusion.com/documentation/api/query-builder/drageventargs

- `dragStart: EmitType<DragEventArgs>` — Triggers when dragging of a rule or group starts.
  - Args: `{ cancel: boolean, dragGroupID: string, dragRuleID: string }`
  - See: https://ej2.syncfusion.com/documentation/api/query-builder/drageventargs

- `drop: EmitType<DropEventArgs>` — Triggers when a rule or group is dropped onto a target rule or group.
  - Args: `{ cancel: boolean, dropGroupID: string, dropRuleID: string }`
  - See: https://ej2.syncfusion.com/documentation/api/query-builder/dropeventargs

- `ruleChange: EmitType<RuleChangeEventArgs>` — Triggers when a condition (AND/OR), field, operator, or value is changed (respects `immediateModeDelay`).
  - Args: `{ name: string }`
  - See: https://ej2.syncfusion.com/documentation/api/query-builder/rulechangeeventargs

---

## Key Model & Event-Arg Interfaces

### `RuleModel`

Represents a single filter rule or a group of rules.

- `condition: string` — Logical connector for child rules (`'and'` | `'or'`).
- `field: string` — The column field name the rule applies to.
- `isLocked: boolean` — Indicates whether this rule is locked from editing.
- `label: string` — Display label for the rule field.
- `not: boolean` — Applies NOT logic to the group condition.
- `operator: string` — The comparison operator (e.g., `'equal'`, `'contains'`, `'between'`).
- `rules: RuleModel[]` — Nested child rules (used for groups).
- `type: string` — Data type of the field (`'string'` | `'number'` | `'date'` | `'boolean'`).
- `value: string[] | number[] | string | number | boolean` — The filter value(s).
- See: https://ej2.syncfusion.com/documentation/api/query-builder/rulemodel

---

### `ColumnsModel`

Defines a column (field) configuration for the QueryBuilder.

- `category: string` — Specifies a category group for the column in the field dropdown.
- `columns: ColumnsModel[]` — Specifies sub-fields (nested columns).
- `field: string` — The data field name to bind.
- `format: string | FormatObject` — Date/number format string for the column.
- `label: string` — Display label shown in the field dropdown.
- `operators: { [key: string]: Object }[]` — Custom operator list for this column.
- `ruleTemplate: string | Function` — Custom template for the entire rule row.
- `step: number` — Step increment for numeric TextBox inputs.
- `template: TemplateColumn | string | Function` — Custom template for the value input widget.
- `type: string` — Data type: `'string'` | `'number'` | `'date'` | `'boolean'`.
- `validation: Validation` — Validation settings (isRequired, min, max).
- `value: string[] | number[] | string | number | boolean | Date` — Default value for the column.
- `values: string[] | number[] | boolean[]` — Predefined selectable values (renders a DropDownList).
- See: https://ej2.syncfusion.com/documentation/api/query-builder/columnsmodel

---

### `ShowButtonsModel`

Controls visibility of action buttons in the QueryBuilder UI.

- `cloneGroup: boolean` — Show/hide the clone group button.
- `cloneRule: boolean` — Show/hide the clone rule button.
- `groupDelete: boolean` — Show/hide the delete group button.
- `groupInsert: boolean` — Show/hide the add group button.
- `lockGroup: boolean` — Show/hide the lock group button.
- `lockRule: boolean` — Show/hide the lock rule button.
- `ruleDelete: boolean` — Show/hide the delete rule button.
- See: https://ej2.syncfusion.com/documentation/api/query-builder/showbuttonsmodel

---

### `ValueModel`

Specifies model properties for the value input widgets.

- `datePickerModel: DatePickerModel` — Model for the DatePicker value widget.
- `multiSelectModel: MultiSelectModel` — Model for the MultiSelect value widget.
- `numericTextBoxModel: NumericTextBoxModel` — Model for the NumericTextBox value widget.
- `radioButtonModel: RadioButtonModel` — Model for the RadioButton value widget.
- `textBoxModel: TextBoxModel` — Model for the TextBox value widget.
- See: https://ej2.syncfusion.com/documentation/api/query-builder/valuemodel

---

### `TemplateColumn`

Defines a custom component for the value cell in a column.

- `create: Element | Function | string` — Creates the custom component element.
- `destroy: Function | string` — Destroys and cleans up the custom component.
- `write: void | Function | string` — Wires events and sets the initial value on the custom component.
- See: https://ej2.syncfusion.com/documentation/api/query-builder/templatecolumn

---

### `Validation`

Defines validation constraints for a column.

- `isRequired: boolean` — Specifies whether a value is required.
- `max: number` — Maximum allowed numeric value.
- `min: number` — Minimum allowed numeric value.
- See: https://ej2.syncfusion.com/documentation/api/query-builder/validation

---

### `DragEventArgs`

Event arguments for drag start/drag events.

- `cancel: boolean` — Set to `true` to cancel the dragging action.
- `dragGroupID: string` — ID of the group being dragged (if applicable).
- `dragRuleID: string` — ID of the rule being dragged (if applicable).
- See: https://ej2.syncfusion.com/documentation/api/query-builder/drageventargs

---

### `DropEventArgs`

Event arguments for the drop event.

- `cancel: boolean` — Set to `true` to cancel the drop action.
- `dropGroupID: string` — ID of the target group where the drop action is initiated.
- `dropRuleID: string` — ID of the target rule where the drop action is initiated.
- See: https://ej2.syncfusion.com/documentation/api/query-builder/dropeventargs

---

### `ActionEventArgs`

Event arguments for `actionBegin`.

- `name: string` — Name of the triggered event.
- See: https://ej2.syncfusion.com/documentation/api/query-builder/actioneventargs

---

### `ChangeEventArgs`

Event arguments for `beforeChange` and `change`.

- `name: string` — Name of the triggered event.
- See: https://ej2.syncfusion.com/documentation/api/query-builder/changeeventargs

---

### `RuleChangeEventArgs`

Event arguments for `ruleChange`.

- `name: string` — Name of the triggered event.
- See: https://ej2.syncfusion.com/documentation/api/query-builder/rulechangeeventargs

---

### `ParameterizedSql`

Represents a positional-parameter SQL query result.

- `sql: string` — SQL WHERE clause with `?` placeholders for each value.
- `params: object[]` — Parameter values in order of their `?` placeholders in `sql`.
- See: https://ej2.syncfusion.com/documentation/api/query-builder/parameterizedsql

---

### `ParameterizedNamedSql`

Represents a named-parameter SQL query result.

- `sql: string` — SQL WHERE clause with named bind variable placeholders.
- `params: Record<string, object>` — Map of bind variable names to their associated values.
- See: https://ej2.syncfusion.com/documentation/api/query-builder/parameterizedNamedSql

---

## Usage Notes & Examples

### Initialization

```typescript
import { QueryBuilder, ColumnsModel, RuleModel } from '@syncfusion/ej2-querybuilder';

const columns: ColumnsModel[] = [
  { field: 'EmployeeID', label: 'Employee ID', type: 'number' },
  { field: 'FirstName', label: 'First Name', type: 'string' },
  { field: 'HireDate', label: 'Hire Date', type: 'date', format: 'dd/MM/yyyy' },
  { field: 'Country', label: 'Country', type: 'string' }
];

const rule: RuleModel = {
  condition: 'and',
  rules: [
    { field: 'EmployeeID', type: 'number', operator: 'equal', value: 1 },
    { field: 'Country', type: 'string', operator: 'equal', value: 'USA' }
  ]
};

const qb = new QueryBuilder({
  width: '100%',
  dataSource: employeeData,
  columns: columns,
  rule: rule
});
qb.appendTo('#querybuilder');
```

### Get SQL from current rules

```typescript
const sql = qb.getSqlFromRules();
// e.g. "EmployeeID = 1 AND Country = 'USA'"
```

### Get parameterized SQL

```typescript
const paramSql = qb.getParameterizedSql();
// paramSql.sql => "EmployeeID = ? AND Country = ?"
// paramSql.params => [1, 'USA']
```

### Get named parameterized SQL

```typescript
const namedSql = qb.getParameterizedNamedSql();
// namedSql.sql => "EmployeeID = :EmployeeID_1 AND Country = :Country_1"
// namedSql.params => { EmployeeID_1: 1, Country_1: 'USA' }
```

### Set rules from SQL

```typescript
qb.setRulesFromSql("Country = 'USA' AND EmployeeID > 5");
```

### Programmatic rule management

```typescript
// Add a rule to root group (group0)
qb.addRules([{ field: 'FirstName', operator: 'startswith', value: 'A', type: 'string' }], 'group0');

// Delete rules by ID
qb.deleteRules(['rule0_1']);

// Add a nested group
qb.addGroups([{
  condition: 'or',
  rules: [
    { field: 'Country', operator: 'equal', value: 'UK' },
    { field: 'Country', operator: 'equal', value: 'USA' }
  ]
}], 'group0');
```

### Validate fields

```typescript
if (!qb.validateFields()) {
  console.log('Some rules are invalid.');
}
```

### Clone, lock, and drag-drop

The component generates IDs based on the element ID of the container.
For a QueryBuilder mounted on `#querybuilder`, the root group is `"querybuilder_group0"`,
nested groups are `"querybuilder_group1"`, `"querybuilder_group2"`, … and rules are
`"querybuilder_group0_rule0"`, `"querybuilder_group0_rule1"`, etc.

```typescript
// Clone a rule: cloneRule(ruleID, groupID, index)
qb.cloneRule('querybuilder_group0_rule0', 'querybuilder_group0', 1);

// Clone a group: cloneGroup(groupID, parentGroupID, index)
qb.cloneGroup('querybuilder_group0', 'querybuilder_group1', 1);

// Lock a rule: lockRule(ruleID)
qb.lockRule('querybuilder_group0_rule0');

// Lock a group: lockGroup(groupID)
qb.lockGroup('querybuilder_group0');
```

### React to rule changes

```typescript
const qb = new QueryBuilder({
  columns: columns,
  dataSource: data,
  change: (args) => {
    console.log('Rule changed:', qb.getRules());
  },
  ruleChange: (args) => {
    console.log('Debounced rule change:', qb.getSqlFromRules());
  }
});
qb.appendTo('#querybuilder');
```

---

## References

- Official API index: https://ej2.syncfusion.com/documentation/api/query-builder/index-default
- `RuleModel`: https://ej2.syncfusion.com/documentation/api/query-builder/rulemodel
- `ColumnsModel`: https://ej2.syncfusion.com/documentation/api/query-builder/columnsmodel
- `ShowButtonsModel`: https://ej2.syncfusion.com/documentation/api/query-builder/showbuttonsmodel
- `ValueModel`: https://ej2.syncfusion.com/documentation/api/query-builder/valuemodel
- `TemplateColumn`: https://ej2.syncfusion.com/documentation/api/query-builder/templatecolumn
- `Validation`: https://ej2.syncfusion.com/documentation/api/query-builder/validation
- `DragEventArgs`: https://ej2.syncfusion.com/documentation/api/query-builder/drageventargs
- `DropEventArgs`: https://ej2.syncfusion.com/documentation/api/query-builder/dropeventargs
- `ActionEventArgs`: https://ej2.syncfusion.com/documentation/api/query-builder/actioneventargs
- `ChangeEventArgs`: https://ej2.syncfusion.com/documentation/api/query-builder/changeeventargs
- `RuleChangeEventArgs`: https://ej2.syncfusion.com/documentation/api/query-builder/rulechangeeventargs
- `ParameterizedSql`: https://ej2.syncfusion.com/documentation/api/query-builder/parameterizedsql
- `ParameterizedNamedSql`: https://ej2.syncfusion.com/documentation/api/query-builder/parameterizedNamedSql

<!-- End of api.md -->
