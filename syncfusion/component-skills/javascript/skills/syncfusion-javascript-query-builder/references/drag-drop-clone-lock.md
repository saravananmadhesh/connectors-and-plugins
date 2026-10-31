# Drag-Drop, Clone, and Lock Features

## Table of Contents
- [Overview](#overview)
- [Drag and Drop](#drag-and-drop)
- [Clone Rules](#clone-rules)
- [Lock Rules](#lock-rules)
- [Separator Configuration](#separator-configuration)
- [Events and Handling](#events-and-handling)
- [Advanced Interactions](#advanced-interactions)

## Overview

QueryBuilder provides rich interaction features:
- **Drag-Drop** - Reorder rules within groups or between groups
- **Clone** - Duplicate rules to create similar conditions
- **Lock** - Prevent modification of critical rules
- **Separators** - Visual connectors between conditions

## Drag and Drop

### Enable Drag-Drop

```typescript
import { QueryBuilder } from '@syncfusion/ej2-querybuilder';

const qb = new QueryBuilder({
  width: '100%',
  dataSource: employeeData,
  columns: columns,
  allowDragAndDrop: true  // Enable drag-drop
});

qb.appendTo('#querybuilder');
```

### Drag-Drop Use Cases

**Within a Group:**
```typescript
// User can reorder rules:
// Original: (City = Seattle) AND (Title = Sales) AND (Salary > 50000)
// After drag: (Salary > 50000) AND (City = Seattle) AND (Title = Sales)
```

**Between Groups:**
```typescript
// Move rule from one group to another
// Original:
// AND
//  ├── City = Seattle
//  └── OR
//      ├── Title = Sales
//      └── Title = Manager

// After drag (Title = Manager moved to root AND):
// AND
//  ├── City = Seattle
//  ├── Title = Manager
//  └── OR
//      └── Title = Sales
```

### Drag-Drop Configuration

```typescript
const qb = new QueryBuilder({
  allowDragAndDrop: true,
  displayMode: 'Horizontal',  // 'Horizontal' (default) or 'Vertical'
  dataSource: employeeData,
  columns: columns
});

qb.appendTo('#querybuilder');
```

## Clone Rules

### Clone a Rule

Use the built-in `cloneRule(ruleID, groupID, index)` method to duplicate a rule:

```typescript
import { QueryBuilder } from '@syncfusion/ej2-querybuilder';

const qb = new QueryBuilder({
  width: '100%',
  dataSource: employeeData,
  columns: columns,
  showButtons: {
    ruleDelete: true,
    groupDelete: true,
    groupInsert: true,
    cloneRule: true,
    cloneGroup: true
  }
});

qb.appendTo('#querybuilder');

// Clone a rule programmatically: cloneRule(ruleID, groupID, index)
// ruleID  — the component-generated ID of the rule to clone  (e.g. "querybuilder_group0_rule0")
// groupID — the ID of the group to insert the clone into     (e.g. "querybuilder_group0")
// index   — position inside that group where the clone is inserted
qb.cloneRule('querybuilder_group0_rule0', 'querybuilder_group0', 1);
```

### Clone Group

Use the built-in `cloneGroup(groupID, parentGroupID, index)` method:

```typescript
// Clone an entire group (all nested rules) programmatically
// groupID       — ID of the group to clone          (e.g. "querybuilder_group0")
// parentGroupID — ID of the group to insert into    (e.g. "querybuilder_group1")
// index         — position inside the parent group
qb.cloneGroup('querybuilder_group0', 'querybuilder_group1', 1);
```

### Use Cases for Clone

**Scenario 1: Similar Filters**
```typescript
// User creates filter for Seattle (City = Seattle AND Salary > 50000)
// Then clones and changes to: City = Tacoma AND Salary > 50000
// Without clone, would need to recreate all conditions
```

**Scenario 2: Template Generation**
```typescript
// Admin creates saved filter template
// Users clone template and customize for their needs
```

**Scenario 3: A/B Testing**
```typescript
// Create filter condition A (clone of baseline)
// Create filter condition B (different variation)
// Compare results
```

## Lock Rules

### Lock a Rule or Group Programmatically

Use the built-in `lockRule(ruleID)` and `lockGroup(groupID)` methods to prevent editing:

```typescript
import { QueryBuilder } from '@syncfusion/ej2-querybuilder';

const qb = new QueryBuilder({
  rule: {
    condition: 'and',
    rules: [
      { field: 'Status', type: 'string', operator: 'equal', value: 'Active' }
    ]
  },
  dataSource: employeeData,
  columns: columns,
  showButtons: {
    lockRule: true,
    lockGroup: true
  }
});

qb.appendTo('#querybuilder');

// Lock a specific rule: lockRule(ruleID)
// ruleID  — the component-generated ID of the rule  (e.g. "querybuilder_group0_rule0")
qb.lockRule('querybuilder_group0_rule0');

// Lock an entire group: lockGroup(groupID)
// groupID — the component-generated ID of the group (e.g. "querybuilder_group0")
qb.lockGroup('querybuilder_group0');
```

### Lock with Visual Indicator

```typescript
// Apply custom lock styling after rendering
qb.created = () => {
  const lockedElements = document.querySelectorAll('.e-rule-locked');
  lockedElements.forEach(rule => {
    (rule as HTMLElement).style.opacity = '0.6';
  });
};

// CSS for locked rules
const lockStyle = `
.e-querybuilder .e-rule-locked {
  opacity: 0.6;
  background-color: #f5f5f5;
  border-left: 4px solid #ff9800;
  padding-left: 10px;
}

.e-querybuilder .e-rule-locked input,
.e-querybuilder .e-rule-locked select {
  cursor: not-allowed;
  background-color: #efefef;
}
`;
```

### Use Cases for Locking

**Scenario 1: Mandatory Filters**
```typescript
// System admin locks Status = Active
// Users cannot delete or modify this filter
// Ensures data compliance
```

**Scenario 2: Template Protection**
```typescript
// Template includes locked base filters
// Users add additional custom filters on top
// Prevents accidental removal of template
```

**Scenario 3: Audit Requirements**
```typescript
// Compliance rule locked: Department = Sales
// Users filter within Sales department only
// Cannot view other departments' data
```

## Separator Configuration

### Separate Connector Property

```typescript
// Show AND/OR connectors between rules
const qb = new QueryBuilder({
  enableSeparateConnector: true,  // Show individual connectors per rule
  dataSource: employeeData,
  columns: columns
});

qb.appendTo('#querybuilder');
```

### Display Modes

```typescript
// Horizontal mode (default) — rules laid out horizontally
const qbHorizontal = new QueryBuilder({
  displayMode: 'Horizontal',
  dataSource: employeeData,
  columns: columns
});

// Vertical mode — rules stacked vertically, shows hierarchy clearly
const qbVertical = new QueryBuilder({
  displayMode: 'Vertical',
  dataSource: employeeData,
  columns: columns
});
```

**Horizontal Mode (Default):**
```
(City = Seattle) AND (Salary > 50000) AND (Title = Sales Rep)
```
- All rules in one horizontal line
- Compact layout
- Good for simple queries

**Vertical Mode:**
```
AND
├── City = Seattle
├── Salary > 50000
└── Title = Sales Rep
```
- Rules stacked vertically
- Shows hierarchy clearly
- Better for complex nested conditions

### Separator Styling

```typescript
// Custom separator CSS
const separatorStyle = `
.e-querybuilder .e-group-separator {
  background-color: #2196F3;
  padding: 0 10px;
  border-radius: 3px;
  color: white;
  font-weight: bold;
  margin: 0 5px;
}

.e-querybuilder .e-group-separator:hover {
  background-color: #1976D2;
  cursor: pointer;
}

/* Toggle separator style */
.e-querybuilder .e-group-separator.or {
  background-color: #f44336;
}

.e-querybuilder .e-group-separator.or:hover {
  background-color: #d32f2f;
}
`;
```

## Events and Handling

### Drag-Drop Events

```typescript
import { DragEventArgs, DropEventArgs, ChangeEventArgs } from '@syncfusion/ej2-querybuilder';

// Before rule is dragged
qb.addEventListener('dragStart', (args: DragEventArgs) => {
  console.log('Drag started:', args);
  // Can prevent drag if needed
  // args.cancel = true;
});

// While dragging
qb.addEventListener('drag', (args: DragEventArgs) => {
  console.log('Dragging:', args);
});

// After rule is dropped
qb.addEventListener('drop', (args: DropEventArgs) => {
  console.log('Dropped:', args);
  console.log('New rule order:', qb.getRules());
});
```

### Change Event

```typescript
// Detect any rule change (add, remove, update, clone, lock)
qb.addEventListener('change', (args: ChangeEventArgs) => {
  console.log('QueryBuilder changed:', args.name);
  console.log('Current rules:', qb.getRules());
});
```

## Advanced Interactions

### Drag-Drop with Validation

```typescript
// Prevent dragging by cancelling dragStart when needed
qb.addEventListener('dragStart', (args: DragEventArgs) => {
  // Cancel drag for a specific rule by its component-generated ID
  if (args.dragRuleID === 'querybuilder_group0_rule0') {
    args.cancel = true;
  }
});
```

### Clone with Modifications

```typescript
// Clone a rule and then update its value
qb.cloneRule('querybuilder_group0_rule0', 'querybuilder_group0', 1);

// After cloning, retrieve the current rules and update the new rule's value
const rules = qb.getRules();
const lastRule = rules.rules[rules.rules.length - 1];
if (lastRule && !(lastRule as any).rules) {
  (lastRule as any).value = 'Tacoma';
  qb.setRules(rules);
}
```

### Protected Rules with Warnings

```typescript
// Warn before significant changes using the beforeChange event
qb.addEventListener('beforeChange', (args: ChangeEventArgs) => {
  console.log('Before change:', args.name);
  // Use the beforeChange event to perform pre-change checks or logging.
  // Note: ChangeEventArgs exposes only the `name` property.
});
```

### Auto-Sort Rules After Drop

```typescript
// Automatically sort rules alphabetically by field after drag
qb.addEventListener('drop', (args: DropEventArgs) => {
  const rules = qb.getRules();
  rules.rules.sort((a, b) => {
    if ((a as any).rules || (b as any).rules) return 0; // Don't sort groups
    return ((a as any).field || '').localeCompare((b as any).field || '');
  });
  qb.setRules(rules);
});
```

### Visual Feedback for Dragging

```typescript
// Add visual effects during drag
const style = document.createElement('style');
style.innerHTML = `
.e-querybuilder .e-drag-handler:hover {
  cursor: grab;
}

.e-querybuilder .e-rule.drag-over {
  background-color: #e3f2fd;
  border: 2px dashed #2196F3;
}

.e-querybuilder .e-group.drag-over {
  border: 2px dashed #ff9800;
}
`;
document.head.appendChild(style);

// Remove drag-over class after drop
qb.addEventListener('drop', (args: DropEventArgs) => {
  console.log('Dropped on group:', args.dropGroupID, 'rule:', args.dropRuleID);
  document.querySelectorAll('.drag-over').forEach(el => {
    el.classList.remove('drag-over');
  });
});
```

---

**Need help?** Check [references/rules-and-groups.md](rules-and-groups.md) for managing rule structures or [references/templates-customization.md](templates-customization.md) for UI customization.
