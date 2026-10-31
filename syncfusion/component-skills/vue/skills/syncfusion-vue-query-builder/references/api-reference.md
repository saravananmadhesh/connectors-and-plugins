# API Reference

Complete API reference for Syncfusion Vue Query Builder component, including properties, methods, events, and interfaces.

## Table of Contents
- [Properties](#properties)
- [Methods](#methods)
- [Events](#events)
- [Interfaces](#interfaces)
- [Complete Example](#complete-example)

## Properties

### Component Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `columns` | `ColumnsModel[]` | `[]` | Defines the columns for the query builder |
| `dataSource` | `DataManager \| object[]` | `[]` | Data source for the query builder |
| `displayMode` | `'Horizontal' \| 'Vertical'` | `'Horizontal'` | Display mode for rules |
| `rule` | `RuleModel` | `{ condition: 'and', rules: [] }` | Initial rules configuration |
| `cssClass` | `string` | `''` | CSS class to customize styling |
| `headerTemplate` | `string \| Function` | `null` | Template for custom header |
| `separator` | `string` | `''` | Separator between rules |
| `separateConnector` | `boolean` | `false` | Show separate connector UI |
| `sortDirection` | `'Ascending' \| 'Descending'` | `'Ascending'` | Sort direction for data |
| `allowDragAndDrop` | `boolean` | `true` | Enable drag and drop functionality |
| `allowValidation` | `boolean` | `false` | Enable validation for rule values |
| `allowParsing` | `boolean` | `true` | Allow parsing SQL to rules |
| `maxGroupCount` | `number` | `5` | Maximum number of groups |
| `enablePersistence` | `boolean` | `false` | Enable state persistence |
| `persistId` | `string` | `''` | localStorage key for persistence |
| `enableRtl` | `boolean` | `false` | Enable right-to-left layout |
| `locale` | `string` | `'en'` | Locale for date and number formatting |
| `width` | `string \| number` | `'100%'` | Width of the component |
| `height` | `string \| number` | `'auto'` | Height of the component |

### ShowButtonsModel Properties

Controls which action buttons are visible.

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `ruleDelete` | `boolean` | `true` | Show delete button for rules |
| `groupInsert` | `boolean` | `true` | Show add group button |
| `groupDelete` | `boolean` | `true` | Show delete button for groups |
| `cloneRule` | `boolean` | `false` | Show clone button for rules |
| `cloneGroup` | `boolean` | `false` | Show clone button for groups |

## Methods

### getRules()

Get the current rules from the Query Builder.

```typescript
const rules = qbRef.value?.getRules(): RuleModel
```

**Returns:** `RuleModel` - Object containing condition and rules array

**Example:**
```typescript
const currentRules = qbRef.value?.getRules()
console.log(currentRules?.rules.length)
```

### setRules(rules: RuleModel)

Set rules programmatically.

```typescript
qbRef.value?.setRules(rules)
```

**Parameters:**
- `rules` (RuleModel): Rule configuration object

**Example:**
```typescript
const newRules = {
  condition: 'and',
  rules: [
    { field: 'EmployeeID', operator: 'equal', value: 1001 }
  ]
}
qbRef.value?.setRules(newRules)
```

### addRules(rules: RuleModel[], parentId: string)

Add rules to an existing group.

```typescript
qbRef.value?.addRules(rules, parentId)
```

**Parameters:**
- `rules` (RuleModel[]): Array of rules to add
- `parentId` (string): Parent group ID

**Example:**
```typescript
qbRef.value?.addRules([
  { field: 'FirstName', operator: 'startswith', value: 'John' }
], 'group0')
```

### deleteRules(ids: string[])

Delete rules by their IDs.

```typescript
qbRef.value?.deleteRules(ids)
```

**Parameters:**
- `ids` (string[]): Array of rule IDs to delete

**Example:**
```typescript
qbRef.value?.deleteRules(['rule1', 'rule2'])
```

### addGroups(groups: RuleModel[], parentId: string)

Add new groups to the query builder.

```typescript
qbRef.value?.addGroups(groups, parentId)
```

**Parameters:**
- `groups` (RuleModel[]): Array of group configurations
- `parentId` (string): Parent group ID

**Example:**
```typescript
qbRef.value?.addGroups([
  {
    condition: 'or',
    rules: [
      { field: 'Status', operator: 'equal', value: 'Active' }
    ]
  }
], 'group0')
```

### getSqlFromRules()

Convert rules to SQL WHERE clause.

```typescript
const sql = qbRef.value?.getSqlFromRules(): string
```

**Returns:** `string` - SQL WHERE clause

**Example:**
```typescript
const whereClause = qbRef.value?.getSqlFromRules()
console.log(whereClause)
// Output: "(EmployeeID = 1001) AND (FirstName LIKE 'John%')"
```

### getMongoQuery()

Convert rules to MongoDB query format.

```typescript
const mongoQuery = qbRef.value?.getMongoQuery(): object
```

**Returns:** `object` - MongoDB query object

**Example:**
```typescript
const query = qbRef.value?.getMongoQuery()
console.log(JSON.stringify(query))
```

### getPredicate()

Get Syncfusion Predicate for DataManager filtering.

```typescript
const predicate = qbRef.value?.getPredicate(): Predicate
```

**Returns:** `Predicate` - Predicate for DataManager integration

**Example:**
```typescript
const predicate = qbRef.value?.getPredicate()
const query = new Query().where(predicate)
const dataManager = new DataManager(data)
const result = dataManager.executeLocal(query)
```

### getParameterizedSql()

Get parameterized SQL with injection protection.

```typescript
const paramSql = qbRef.value?.getParameterizedSql(): { sql: string; params: object }
```

**Returns:** `object` - Object with `sql` and `params` properties

**Example:**
```typescript
const { sql, params } = qbRef.value?.getParameterizedSql() || {}
console.log(sql)      // "SELECT * WHERE EmployeeID = @param0"
console.log(params)   // { param0: 1001 }
```

### getParameterizedNamedSql()

Get SQL with named parameters.

```typescript
const namedSql = qbRef.value?.getParameterizedNamedSql(): { sql: string; params: object }
```

**Returns:** `object` - Object with `sql` and named `params`

**Example:**
```typescript
const { sql, params } = qbRef.value?.getParameterizedNamedSql() || {}
console.log(sql)      // "SELECT * WHERE EmployeeID = :employeeId"
console.log(params)   // { employeeId: 1001 }
```

### setRulesFromSql(sql: string)

Parse SQL and set rules from the WHERE clause.

```typescript
qbRef.value?.setRulesFromSql(sql)
```

**Parameters:**
- `sql` (string): SQL WHERE clause to parse

**Example:**
```typescript
qbRef.value?.setRulesFromSql("EmployeeID = 1001 AND FirstName LIKE 'John%'")
```

### cloneRule(rule: RuleModel)

Create a deep copy of a rule.

```typescript
const clonedRule = qbRef.value?.cloneRule(rule): RuleModel
```

**Parameters:**
- `rule` (RuleModel): Rule to clone

**Returns:** `RuleModel` - Cloned rule object

**Example:**
```typescript
const rules = qbRef.value?.getRules()?.rules || []
const cloned = qbRef.value?.cloneRule(rules[0])
qbRef.value?.addRules([cloned], 'group0')
```

### cloneGroup(group: RuleModel)

Create a deep copy of a group.

```typescript
const clonedGroup = qbRef.value?.cloneGroup(group): RuleModel
```

**Parameters:**
- `group` (RuleModel): Group to clone

**Returns:** `RuleModel` - Cloned group object

### lockRule(rule: RuleModel)

Prevent a rule from being modified or deleted.

```typescript
qbRef.value?.lockRule(rule)
```

**Parameters:**
- `rule` (RuleModel): Rule to lock

### lockGroup(group: RuleModel)

Prevent a group from being modified or deleted.

```typescript
qbRef.value?.lockGroup(group)
```

**Parameters:**
- `group` (RuleModel): Group to lock

### notifyChange()

Trigger change notifications after manual rule updates.

```typescript
qbRef.value?.notifyChange()
```

**Example:**
```typescript
const rules = qbRef.value?.getRules()
if (rules?.rules[0]) {
  rules.rules[0].value = 'Updated Value'
}
qbRef.value?.notifyChange()
```

## Events

### change

Triggered when rules are modified.

```vue
@change="handleChange"
```

**Example:**
```typescript
const handleChange = () => {
  const rules = qbRef.value?.getRules()
  console.log('Rules changed:', rules)
}
```

### actionBegin

Triggered before an action is executed.

```vue
@actionBegin="handleActionBegin"
```

**Parameters:** `ActionEventArgs`
- `requestType`: Type of action ('rule-add', 'rule-delete', 'group-add', etc.)
- `rule`: The rule being operated on
- `group`: The group being operated on
- `cancel`: Set to true to cancel the action

**Example:**
```typescript
const handleActionBegin = (args: ActionEventArgs) => {
  if (args.requestType === 'rule-delete') {
    console.log('Deleting rule:', args.rule)
    // args.cancel = true  // Uncomment to cancel deletion
  }
}
```

### actionComplete

Triggered after an action is completed.

```vue
@actionComplete="handleActionComplete"
```

**Example:**
```typescript
const handleActionComplete = (args: ActionEventArgs) => {
  console.log('Action completed:', args.requestType)
}
```

### actionFailure

Triggered when an action fails.

```vue
@actionFailure="handleActionFailure"
```

**Example:**
```typescript
const handleActionFailure = (args: ActionEventArgs) => {
  console.error('Action failed:', args.error)
}
```

### dataBound

Triggered when data is bound to the component.

```vue
@dataBound="handleDataBound"
```

**Example:**
```typescript
const handleDataBound = () => {
  console.log('Data bound')
}
```

## Interfaces

### RuleModel

Represents a single rule or group of rules.

```typescript
interface RuleModel {
  id?: string
  field?: string
  label?: string
  operator?: string
  value?: any
  type?: string
  condition?: 'and' | 'or'
  rules?: RuleModel[]
  isLocked?: boolean
}
```

### ColumnsModel

Defines column configuration.

```typescript
interface ColumnsModel {
  field: string
  label?: string
  type?: 'string' | 'number' | 'date' | 'boolean'
  dataType?: string
  format?: string
  operators?: OperatorModel[]
  defaultOperator?: string
  defaultValue?: any
  values?: any[]
  template?: string | Function
  validation?: ValidationModel
  dataSource?: DataManager | object[]
  allowNull?: boolean
  step?: number
}

interface OperatorModel {
  key: string
  value: string
}

interface ValidationModel {
  isRequired?: boolean
  min?: number
  max?: number
  pattern?: RegExp
  message?: string
}
```

### ShowButtonsModel

Controls visibility of action buttons.

```typescript
interface ShowButtonsModel {
  ruleDelete?: boolean
  groupInsert?: boolean
  groupDelete?: boolean
  cloneRule?: boolean
  cloneGroup?: boolean
}
```

### ActionEventArgs

Arguments passed to action events.

```typescript
interface ActionEventArgs {
  requestType?: string
  rule?: RuleModel
  group?: RuleModel
  error?: Error
  cancel?: boolean
}
```

## Complete Example

Here's a complete working example using all major API features:

```vue
<template>
  <div class="api-reference-example">
    <div class="controls">
      <h2>Query Builder API Reference Demo</h2>
      <div class="button-group">
        <button @click="addNewRule">Add Rule</button>
        <button @click="addNewGroup">Add Group</button>
        <button @click="generateSQL">Generate SQL</button>
        <button @click="importSQL">Import from SQL</button>
        <button @click="cloneActiveRule">Clone Rule</button>
        <button @click="resetRules">Reset</button>
      </div>
    </div>

    <ejs-querybuilder
      ref="qbRef"
      width="100%"
      :rule="initialRule"
      :allowDragAndDrop="true"
      :allowValidation="true"
      @change="onChange"
      @actionBegin="onActionBegin"
      @actionComplete="onActionComplete"
      @actionFailure="onActionFailure"
    >
      <e-columns>
        <e-column field='EmployeeID' label='Employee ID' type='number' />
        <e-column field='FirstName' label='First Name' type='string' />
        <e-column field='Salary' label='Salary' type='number' />
        <e-column field='JoinDate' label='Join Date' type='date' />
        <e-column field='Status' label='Status' type='string' />
      </e-columns>
    </ejs-querybuilder>

    <div class="output-panels">
      <div class="output-panel" v-if="sqlOutput">
        <h3>SQL Output</h3>
        <code>{{ sqlOutput }}</code>
      </div>
      <div class="output-panel" v-if="mongoOutput">
        <h3>MongoDB Output</h3>
        <code>{{ mongoOutput }}</code>
      </div>
      <div class="output-panel" v-if="paramOutput">
        <h3>Parameterized SQL</h3>
        <code>{{ paramOutput }}</code>
      </div>
    </div>

    <div class="log-panel">
      <h3>Action Log</h3>
      <div class="log-content">
        <div v-for="(log, index) in actionLog" :key="index" class="log-entry">
          {{ log }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { QueryBuilderComponent, ColumnsDirective, ColumnDirective } from '@syncfusion/ej2-vue-querybuilder'

export default {
  name: "App",
  components: {
    "ejs-querybuilder": QueryBuilderComponent,
    "e-columns": ColumnsDirective,
    "e-column": ColumnDirective
  },
  data() {
    return {
      actionLog: [],
      sqlOutput: '',
      mongoOutput: '',
      paramOutput: '',
      initialRule: {
        condition: 'and',
        rules: [
          {
            field: 'Status',
            label: 'Status',
            operator: 'equal',
            value: 'Active'
          }
        ]
      }
    }
  },
  methods: {
    addNewRule() {
      const newRule = {
        field: 'EmployeeID',
        operator: 'greaterthan',
        value: 1000
      }
      this.$refs.qbRef.addRules([newRule], 'group0')
    },
    addNewGroup() {
      const newGroup = {
        condition: 'or',
        rules: [
          { field: 'FirstName', operator: 'startswith', value: 'A' },
          { field: 'FirstName', operator: 'startswith', value: 'B' }
        ]
      }
      this.$refs.qbRef.addGroups([newGroup], 'group0')
    },
    generateSQL() {
      this.sqlOutput = this.$refs.qbRef.getSqlFromRules() || ''
      this.mongoOutput = JSON.stringify(this.$refs.qbRef.getMongoQuery(), null, 2) || ''
      const { sql, params } = this.$refs.qbRef.getParameterizedSql() || { sql: '', params: {} }
      this.paramOutput = `SQL: ${sql}\nParams: ${JSON.stringify(params)}`
    },
    importSQL() {
      const sqlInput = "(EmployeeID > 1000) AND (Status = 'Active')"
      try {
        this.$refs.qbRef.setRulesFromSql(sqlInput)
        this.addLog('SQL imported successfully')
      } catch (error) {
        this.addLog('Failed to import SQL: ' + error)
      }
    },
    cloneActiveRule() {
      const rules = this.$refs.qbRef.getRules()?.rules || []
      if (rules.length > 0) {
        const cloned = this.$refs.qbRef.cloneRule(rules[0])
        if (cloned) {
          this.$refs.qbRef.addRules([cloned], 'group0')
        }
      }
    },
    resetRules() {
      this.$refs.qbRef.setRules({ condition: 'and', rules: [] })
      this.sqlOutput = ''
      this.mongoOutput = ''
      this.paramOutput = ''
    },
    onChange() {
      this.addLog('Change event triggered')
    },
    onActionBegin(args) {
      this.addLog(`Action begin: ${args.requestType}`)
    },
    onActionComplete(args) {
      this.addLog(`Action complete: ${args.requestType}`)
    },
    onActionFailure(args) {
      this.addLog(`Action failed: ${args.error?.message}`)
    },
    addLog(message) {
      const timestamp = new Date().toLocaleTimeString()
      this.actionLog.unshift(`[${timestamp}] ${message}`)
      if (this.actionLog.length > 10) {
        this.actionLog.pop()
      }
    }
  }
}
</script>

<style scoped>
.api-reference-example {
  padding: 20px;
}

.controls {
  margin-bottom: 20px;
}

.button-group {
  display: flex;
  gap: 10px;
  margin-top: 10px;
  flex-wrap: wrap;
}

.button-group button {
  padding: 8px 16px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
}

.button-group button:hover {
  background-color: #0056b3;
}

.output-panels {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  margin-top: 30px;
}

.output-panel {
  padding: 15px;
  background-color: #f8f9fa;
  border: 1px solid #dee2e6;
  border-radius: 4px;
  max-height: 300px;
  overflow-y: auto;
}

.output-panel h3 {
  margin-top: 0;
  color: #333;
}

.output-panel code {
  display: block;
  padding: 10px;
  background-color: white;
  border: 1px solid #dee2e6;
  border-radius: 4px;
  font-family: 'Courier New', monospace;
  font-size: 12px;
  overflow-x: auto;
  word-break: break-word;
}

.log-panel {
  margin-top: 30px;
  padding: 15px;
  background-color: #f8f9fa;
  border: 1px solid #dee2e6;
  border-radius: 4px;
}

.log-panel h3 {
  margin-top: 0;
}

.log-content {
  max-height: 200px;
  overflow-y: auto;
  background-color: white;
  padding: 10px;
  border-radius: 4px;
  font-family: 'Courier New', monospace;
  font-size: 12px;
}

.log-entry {
  padding: 4px;
  border-bottom: 1px solid #eee;
  color: #666;
}

.log-entry:last-child {
  border-bottom: none;
}
</style>
```

This comprehensive API reference covers all major properties, methods, events, and interfaces for the Syncfusion Vue Query Builder component.
