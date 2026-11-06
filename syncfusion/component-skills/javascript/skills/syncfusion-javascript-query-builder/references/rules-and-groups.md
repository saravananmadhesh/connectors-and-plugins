# Rules and Groups Management

## Table of Contents
- [Understanding Rules](#understanding-rules)
- [Rule Model Structure](#rule-model-structure)
- [Creating Rules](#creating-rules)
- [Creating Groups](#creating-groups)
- [Managing Rules](#managing-rules)
- [Managing Groups](#managing-groups)
- [Rule Validation](#rule-validation)
- [Nested Hierarchies](#nested-hierarchies)

## Understanding Rules

A **rule** represents a single filter condition like "FirstName starts with 'A'" or "Salary > 50000".

A **group** is a container of rules combined with AND/OR logic.

### Rule Anatomy

```
Field [FirstName] | Operator [startswith] | Value [A]
```

### Group Anatomy

```
(FirstName = 'Nancy') AND (Title contains 'Sales') AND (City = 'Seattle')
```

## Rule Model Structure

### Complete Rule Properties

```typescript
interface RuleModel {
  // Field definition
  field?: string;                     // Column field name
  label?: string;                     // Display label
  type?: string;                      // Data type

  // Operator and value
  operator?: string;                  // Comparison operator (equal, contains, etc.)
  value?: string[] | number[] | string | number | boolean; // Filter value

  // Grouping
  condition?: string;                 // 'and' | 'or' — logical operator for the group
  rules?: RuleModel[];               // Nested child rules or groups

  // Optional flags
  isLocked?: boolean;                 // Whether the rule/group is locked
  not?: boolean;                      // Applies NOT to the group condition
}
```

## Creating Rules

### Single Rule

```typescript
const singleRule: RuleModel = {
  condition: 'and',
  rules: [
    {
      field: 'FirstName',
      label: 'First Name',
      type: 'string',
      operator: 'startswith',
      value: 'A'
    }
  ]
};
```

### Multiple Rules (AND)

```typescript
const andRules: RuleModel = {
  condition: 'and',  // ALL conditions must be true
  rules: [
    {
      field: 'FirstName',
      type: 'string',
      operator: 'startswith',
      value: 'A'
    },
    {
      field: 'City',
      type: 'string',
      operator: 'equal',
      value: 'Seattle'
    },
    {
      field: 'Salary',
      type: 'number',
      operator: 'greaterthan',
      value: 50000
    }
  ]
};

// Translates to: (FirstName starts with A) AND (City = Seattle) AND (Salary > 50000)
```

### Multiple Rules (OR)

```typescript
const orRules: RuleModel = {
  condition: 'or',  // ANY condition must be true
  rules: [
    {
      field: 'Title',
      type: 'string',
      operator: 'contains',
      value: 'Sales'
    },
    {
      field: 'Title',
      type: 'string',
      operator: 'contains',
      value: 'Manager'
    }
  ]
};

// Translates to: (Title contains Sales) OR (Title contains Manager)
```

### Programmatic Rule Creation

```typescript
const qb = new QueryBuilder({
  dataSource: employeeData,
  columns: columns
});

qb.appendTo('#querybuilder');

// Create new rules
const newRules = [
  {
    field: 'EmployeeID',
    type: 'number',
    operator: 'greaterthan',
    value: 5
  },
  {
    field: 'City',
    type: 'string',
    operator: 'equal',
    value: 'Seattle'
  }
];

// Add to root group (group0)
qb.addRules(newRules, 'group0');
```

## Creating Groups

### Basic Nested Group

```typescript
const groupedRule: RuleModel = {
  condition: 'and',
  rules: [
    // Simple rule
    {
      field: 'EmployeeID',
      type: 'number',
      operator: 'greaterthan',
      value: 1
    },
    // Nested group with OR
    {
      condition: 'or',  // This group uses OR
      rules: [
        {
          field: 'Title',
          type: 'string',
          operator: 'contains',
          value: 'Sales'
        },
        {
          field: 'Title',
          type: 'string',
          operator: 'contains',
          value: 'Manager'
        }
      ]
    }
  ]
};

// Translates to:
// (ID > 1) AND ((Title contains Sales) OR (Title contains Manager))
```

### Multi-Level Nesting

```typescript
const deeplyNestedRule: RuleModel = {
  condition: 'and',
  rules: [
    {
      field: 'Country',
      type: 'string',
      operator: 'equal',
      value: 'USA'
    },
    {
      condition: 'or',
      rules: [
        {
          field: 'City',
          type: 'string',
          operator: 'equal',
          value: 'Seattle'
        },
        {
          field: 'City',
          type: 'string',
          operator: 'equal',
          value: 'Tacoma'
        },
        {
          condition: 'and',
          rules: [
            {
              field: 'Salary',
              type: 'number',
              operator: 'greaterthan',
              value: 100000
            },
            {
              field: 'Title',
              type: 'string',
              operator: 'contains',
              value: 'Manager'
            }
          ]
        }
      ]
    }
  ]
};

// Complex logic:
// Country = USA AND (
//   City = Seattle OR
//   City = Tacoma OR
//   (Salary > 100000 AND Title contains Manager)
// )
```

### Programmatic Group Creation

```typescript
// Add a new group
const newGroup = [{
  condition: 'or',
  rules: [
    { field: 'Status', operator: 'equal', value: 'Active' },
    { field: 'Status', operator: 'equal', value: 'Pending' }
  ]
}];

qb.addGroups(newGroup, 'group0');
```

## Managing Rules

### Get Current Rules

```typescript
// Get all rules in current state
const currentRules: RuleModel = qb.getRules();
console.log(currentRules);

// Save to JSON
const savedQuery = JSON.stringify(currentRules);
localStorage.setItem('saved-query', savedQuery);
```

### Add Rules

```typescript
// Add single rule
qb.addRules([{
  field: 'City',
  type: 'string',
  operator: 'equal',
  value: 'Seattle'
}], 'group0');

// Add multiple rules
qb.addRules([
  { field: 'FirstName', operator: 'startswith', value: 'A' },
  { field: 'City', operator: 'equal', value: 'Seattle' }
], 'group0');
```

### Delete Rules

```typescript
// Delete by rule ID
qb.deleteRules(['rule0']);

// Delete multiple rules
qb.deleteRules(['rule0', 'rule1', 'rule2']);

// Clear all rules (reset to empty root group)
qb.reset();
```

### Update Rule

Rules don't have direct update methods. Instead:

```typescript
// 1. Delete the old rule
qb.deleteRules(['rule0']);

// 2. Add the updated rule
qb.addRules([{
  field: 'FirstName',
  type: 'string',
  operator: 'contains',  // Changed from 'startswith'
  value: 'John'          // Changed from 'A'
}], 'group0');
```

## Managing Groups

### Add Groups

```typescript
// Add a new group
qb.addGroups([{
  condition: 'and',
  rules: [{
    field: 'Status',
    operator: 'equal',
    value: 'Active'
  }]
}], 'group0');
```

### Delete Groups

```typescript
// Delete by group ID
qb.deleteGroups(['group1']);

// Delete multiple groups
qb.deleteGroups(['group1', 'group2']);
```

### Get Group By ID

```typescript
// QueryBuilder automatically assigns IDs
// group0 = root group
// group1, group2, ... = nested groups

// Rules: rule0, rule1, ...
// Groups: group0, group1, ...
```

## Rule Validation

### Built-in Validation

Use `validateFields()` to validate all rules in the QueryBuilder and display errors for any invalid fields:

```typescript
// Validate all current rules
const isValid = qb.validateFields();
if (isValid) {
  console.log('All rules are valid');
} else {
  console.log('Some rules have invalid or missing values');
}
```

### Get Valid Rules Only

Use `getValidRules()` to retrieve only the complete, valid rules:

```typescript
const allRules = qb.getRules();
const validRules = qb.getValidRules(allRules);
console.log('Valid rules:', validRules);
```

### Check if Rule is Valid (Custom)

```typescript
function isRuleValid(rule: RuleModel): boolean {
  return !!(rule.field && rule.operator && rule.value !== undefined);
}

// Validate all rules recursively
function validateAllRules(ruleModel: RuleModel): boolean {
  if (ruleModel.rules) {
    return ruleModel.rules.every(rule => {
      if (rule.rules) {
        return validateAllRules(rule);
      } else {
        return isRuleValid(rule);
      }
    });
  }
  return false;
}

const rules = qb.getRules();
if (validateAllRules(rules)) {
  console.log('All rules are valid');
}
```

### Prevent Invalid Operators

```typescript
// Define valid operators per type
const validOperators: Record<string, string[]> = {
  'string': ['startswith', 'endswith', 'contains', 'equal', 'notequal', 'in', 'notin'],
  'number': ['equal', 'notequal', 'greaterthan', 'lessthan', 'between'],
  'date': ['equal', 'notequal', 'greaterthan', 'lessthan', 'between'],
  'boolean': ['equal', 'notequal']
};

function isOperatorValid(fieldType: string, operator: string): boolean {
  return validOperators[fieldType]?.includes(operator) || false;
}
```

### Validate Before Adding

```typescript
function validateAndAddRule(rule: RuleModel, groupId: string): boolean {
  // Check required fields
  if (!rule.field || !rule.operator || rule.value === undefined) {
    console.error('Rule missing required fields');
    return false;
  }
  
  // Check operator validity
  if (rule.type && !isOperatorValid(rule.type, rule.operator)) {
    console.error('Invalid operator for type:', rule.type);
    return false;
  }
  
  // If valid, add rule
  qb.addRules([rule], groupId);
  return true;
}

// Usage
validateAndAddRule({
  field: 'City',
  type: 'string',
  operator: 'equal',
  value: 'Seattle'
}, 'group0');
```

## Nested Hierarchies

### Understanding Group/Rule IDs

QueryBuilder automatically assigns string IDs to rendered groups and rules in the DOM. The root group is always `'group0'`. Nested groups use IDs like `'group1'`, `'group2'`, and rules use `'rule0'`, `'rule1'`, etc. Use these IDs with `getGroup()`, `getRule()`, `deleteGroups()`, `deleteRules()`, `cloneGroup()`, `cloneRule()`, `lockGroup()`, and `lockRule()`.

```
// Example structure:
// group0 (root AND)
// ├── rule0 (City = Seattle)
// └── group1 (OR)
//     ├── rule1 (Status = Active)
//     └── rule2 (Status = Pending)
```

### Get a Group or Rule by ID

```typescript
// Use getGroup() to retrieve the RuleModel for a specific group
const group1: RuleModel = qb.getGroup('group1');
console.log('Group1 rules:', group1.rules);

// Use getRule() to retrieve the RuleModel for a specific rule
const rule0: RuleModel = qb.getRule('rule0');
console.log('Rule0:', rule0.field, rule0.operator, rule0.value);
```

### Flatten Nested Rules

```typescript
function flattenRules(rules: RuleModel): RuleModel[] {
  const flat: RuleModel[] = [];
  
  for (const item of (rules.rules || [])) {
    if (item.rules) {
      // It's a group, recurse
      flat.push(...flattenRules(item));
    } else {
      // It's a leaf rule, add to flat list
      flat.push(item);
    }
  }
  
  return flat;
}

const allLeafRules = flattenRules(qb.getRules());
console.log('All leaf rules:', allLeafRules);
```

### Tree Traversal

```typescript
function printRuleTree(rules: RuleModel, indent = 0) {
  const prefix = '  '.repeat(indent);
  
  for (const item of (rules.rules || [])) {
    if (item.rules) {
      // Group
      console.log(`${prefix}[GROUP] ${item.condition?.toUpperCase()}`);
      printRuleTree(item, indent + 1);
    } else {
      // Rule
      console.log(`${prefix}[RULE] ${item.field} ${item.operator} ${item.value}`);
    }
  }
}

// Print visual tree
printRuleTree(qb.getRules());

// Output:
// [GROUP] AND
//   [RULE] City equal Seattle
//   [GROUP] OR
//     [RULE] Status equal Active
//     [RULE] Status equal Pending
```

---

**Need help?** Check [references/filtering-search.md](filtering-search.md) for advanced filtering operations or [references/import-export.md](import-export.md) for saving/loading rules.
