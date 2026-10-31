# Filtering & Rules Management — Syncfusion Angular Query Builder

Manage query conditions and groups programmatically or through UI interactions. Control which action buttons are visible and enable advanced features like drag-and-drop, cloning, locking, and separate connectors.

---

## Table of Contents
- [Creating and Deleting Rules Programmatically](#creating-and-deleting-rules-programmatically)
- [Creating and Deleting Groups Programmatically](#creating-and-deleting-groups-programmatically)
- [Controlling Button Visibility](#controlling-button-visibility)
- [Clone Rule and Group](#clone-rule-and-group)
- [Lock Rule and Group](#lock-rule-and-group)
- [Separate Connector](#separate-connector)
- [Restrict Group Nesting Depth](#restrict-group-nesting-depth)
- [Drag and Drop Reordering](#drag-and-drop-reordering)

---

## Creating and Deleting Rules Programmatically

Use `addRules()` and `deleteRules()` to manage individual conditions at runtime.

```typescript
import { QueryBuilderComponent } from '@syncfusion/ej2-angular-querybuilder';
import { ViewChild, Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <ejs-querybuilder #qb width="70%" [rule]="importRules">
      <e-columns>
        <e-column field="EmployeeID" label="Employee ID" type="number"></e-column>
        <e-column field="FirstName"  label="First Name"  type="string"></e-column>
        <e-column field="Country"    label="Country"     type="string"></e-column>
      </e-columns>
    </ejs-querybuilder>
    <button (click)="addRule()">Add Rule</button>
    <button (click)="deleteRule()">Delete Rule</button>
  `
})
export class App {
  @ViewChild('qb') qb!: QueryBuilderComponent;

  public importRules = {
    condition: 'and',
    rules: [
      { field: 'EmployeeID', label: 'Employee ID', type: 'number', operator: 'equal', value: 1 }
    ]
  };

  addRule(): void {
    // Add a rule to root group (always 'querybuilder_group0')
    this.qb.addRules(
      [{ field: 'Country', label: 'Country', type: 'string', operator: 'equal', value: 'USA' }],
      'querybuilder_group0'
    );
  }

  deleteRule(): void {
    // Get rule IDs from current rules and delete the second one
    const rules = this.qb.getRules();
    if (rules.rules && rules.rules.length > 1) {
      // Rule IDs follow pattern: querybuilder_group0_rule0, querybuilder_group0_rule1, etc.
      this.qb.deleteRules(['querybuilder_group0_rule1']);
    }
  }
}
```

> The root group ID is always `'querybuilder_group0'`. Sub-groups increment numerically.

---

## Creating and Deleting Groups Programmatically

Use `addGroups()` and `deleteGroups()` to manage nested groups.

```typescript
addGroup(): void {
  this.qb.addGroups(
    [{
      condition: 'or',
      rules: [
        { field: 'FirstName', label: 'First Name', type: 'string', operator: 'startswith', value: 'J' }
      ]
    }],
    'querybuilder_group0'   // parent group ID
  );
}

deleteGroup(): void {
  this.qb.deleteGroups(['querybuilder_group1']);
}
```

---

## Controlling Button Visibility

Use `showButtons` to control which action buttons appear in the Query Builder UI:

```typescript
public showButtons = {
  ruleDelete:  true,   // Delete condition button
  groupInsert: true,   // Add Group/Condition button
  groupDelete: true,   // Delete Group button
  ruleInsert:  true,   // Add Condition button (within group)
  cloneRule:   true,   // Clone individual rule
  cloneGroup:  true,   // Clone entire group
  lockRule:    true,   // Lock individual rule
  lockGroup:   true    // Lock entire group
};
```

```html
<ejs-querybuilder [showButtons]="showButtons">
</ejs-querybuilder>
```

Hide all buttons except delete (read-only display):
```typescript
public showButtons = {
  ruleDelete: false, groupInsert: false, groupDelete: false,
  ruleInsert: false, cloneRule: false, cloneGroup: false,
  lockRule: false, lockGroup: false
};
```

---

## Clone Rule and Group

Cloning creates an exact duplicate adjacent to the original — useful for building similar conditions quickly. Enable clone buttons via `showButtons`, or trigger cloning programmatically.

```html
<ejs-querybuilder [showButtons]="showButtons" [rule]="importRules">
  <e-columns>
    <e-column field="EmployeeID" label="Employee ID" type="number"></e-column>
    <e-column field="Country"    label="Country"     type="string"></e-column>
  </e-columns>
</ejs-querybuilder>
```

```typescript
public showButtons = { cloneRule: true, cloneGroup: true, ruleDelete: true, groupDelete: true, groupInsert: true };

// Programmatic cloning
cloneFirstRule(): void {
  this.qb.cloneRule('querybuilder_group0_rule0');
}

cloneRootGroup(): void {
  // Clone a sub-group (cannot clone the root group)
  this.qb.cloneGroup('querybuilder_group1');
}
```

> Cloning the root group (`querybuilder_group0`) is not supported. Only sub-groups can be cloned.

---

## Lock Rule and Group

Locking makes a rule or group read-only — the user cannot modify fields, operators, or values. Useful for enforcing mandatory query conditions.

```typescript
public showButtons = { lockRule: true, lockGroup: true, ruleDelete: true, groupInsert: true, groupDelete: true };

// Lock a specific rule programmatically
lockRule(): void {
  this.qb.lockRule('querybuilder_group0_rule0');
}

// Lock an entire group (all nested rules become read-only)
lockGroup(): void {
  this.qb.lockGroup('querybuilder_group1');
}
```

> When a group is locked, all rules and nested groups within it become read-only simultaneously.

---

## Separate Connector

By default, all rules in a group share the same AND/OR connector (set at group level). Enabling **separate connectors** allows each rule to have its own AND/OR choice, enabling mixed logic like:

`(A AND B) OR C AND (D OR E)`

```html
<ejs-querybuilder [enableSeparateConnector]="true" [rule]="importRules">
  <e-columns>
    <e-column field="EmployeeID" label="Employee ID" type="number"></e-column>
    <e-column field="FirstName"  label="First Name"  type="string"></e-column>
    <e-column field="Country"    label="Country"     type="string"></e-column>
  </e-columns>
</ejs-querybuilder>
```

> When enabled, the group-level AND/OR selector is removed and each rule gets its own connector dropdown.

---

## Restrict Group Nesting Depth

Use `maxGroupCount` to limit how many nested groups users can create. Default is `5`.

```html
<ejs-querybuilder [maxGroupCount]="2">
  <e-columns>
    <e-column field="EmployeeID" label="Employee ID" type="number"></e-column>
    <e-column field="Country"    label="Country"     type="string"></e-column>
  </e-columns>
</ejs-querybuilder>
```

> Particularly useful for mobile interfaces or when backend query parsers have nesting limits.

---

## Drag and Drop Reordering

Enable drag-and-drop to let users reorder rules and groups within the Query Builder by dragging them to new positions.

```html
<ejs-querybuilder [allowDragAndDrop]="true" [rule]="importRules" (dragStart)="onDragStart($event)" (drop)="onDrop($event)">
  <e-columns>
    <e-column field="EmployeeID" label="Employee ID" type="number"></e-column>
    <e-column field="FirstName"  label="First Name"  type="string"></e-column>
    <e-column field="Country"    label="Country"     type="string"></e-column>
  </e-columns>
</ejs-querybuilder>
```

```typescript
onDragStart(args: any): void {
  console.log('Drag started:', args.draggedNodeData);
}

onDrop(args: any): void {
  console.log('Dropped at:', args.droppedNodeData);
}
```

**Drag and drop events:**

| Event | When it fires |
|---|---|
| `(dragStart)` | When dragging begins on a rule or group |
| `(drag)` | Continuously while dragging |
| `(drop)` | When the dragged item is released at a new position |

---

## NOT Condition on Groups

Enable a NOT toggle on each group header to negate the entire group's condition:

```html
<ejs-querybuilder [enableNotCondition]="true" [rule]="importRules">
</ejs-querybuilder>
```

In the rule model, the NOT state is stored as `not: true` on the group:

```typescript
public importRules = {
  condition: 'and',
  not: true,   // entire group is negated
  rules: [
    { field: 'Country', operator: 'equal', value: 'USA' }
  ]
};
```

---

## Common Combinations

### Feature-rich Query Builder
```html
<ejs-querybuilder
  [allowDragAndDrop]="true"
  [enableNotCondition]="true"
  [enableSeparateConnector]="false"
  [maxGroupCount]="3"
  [showButtons]="showButtons"
  [rule]="importRules">
  <e-columns>
    <!-- columns -->
  </e-columns>
</ejs-querybuilder>
```

```typescript
public showButtons = {
  ruleDelete: true, groupInsert: true, groupDelete: true,
  cloneRule: true, cloneGroup: true, lockRule: true, lockGroup: true
};
```

---

## Troubleshooting

| Issue | Solution |
|---|---|
| Clone/lock buttons not visible | Set `cloneRule: true` / `lockRule: true` in `showButtons` |
| `addRules` not working | Verify target group ID exists; root is always `'querybuilder_group0'` |
| Drag-and-drop not enabling | Confirm `[allowDragAndDrop]="true"` on the `<ejs-querybuilder>` element |
| `maxGroupCount` not preventing groups | Ensure value is set before initial render |
| Separate connector AND/OR missing | When `enableSeparateConnector` is true, group-level connector is hidden by design |
