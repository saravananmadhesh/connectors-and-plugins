# Import & Export — Syncfusion Angular Query Builder

Import pre-built query conditions into the Query Builder, and export constructed rules to JSON, SQL, or MongoDB formats for use in APIs, databases, or saved search persistence.

---

## Table of Contents
- [Importing Rules](#importing-rules)
  - [From JSON (Initial Render)](#from-json-initial-render)
  - [From JSON (Runtime)](#from-json-runtime)
  - [From Inline SQL](#from-inline-sql)
  - [From Parameter SQL](#from-parameter-sql)
  - [From Named Parameter SQL](#from-named-parameter-sql)
  - [From MongoDB Query](#from-mongodb-query)
- [Exporting Rules](#exporting-rules)
  - [To JSON](#to-json)
  - [To Inline SQL](#to-inline-sql)
  - [To Parameter SQL](#to-parameter-sql)
  - [To Named Parameter SQL](#to-named-parameter-sql)
  - [To MongoDB Query](#to-mongodb-query)
- [Common Patterns](#common-patterns)

---

## Importing Rules

### From JSON (Initial Render)

Use the `[rule]` property binding to pre-populate the Query Builder when the component first renders:

```typescript
import { QueryBuilderModule } from '@syncfusion/ej2-angular-querybuilder';
import { Component } from '@angular/core';

@Component({
  imports: [QueryBuilderModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <ejs-querybuilder width="70%" [rule]="importRules">
      <e-columns>
        <e-column field="EmployeeID" label="Employee ID" type="number"></e-column>
        <e-column field="FirstName"  label="First Name"  type="string"></e-column>
        <e-column field="Title"      label="Title"       type="string"></e-column>
        <e-column field="Country"    label="Country"     type="string"></e-column>
      </e-columns>
    </ejs-querybuilder>
  `
})
export class App {
  public importRules = {
    condition: 'and',
    rules: [
      {
        label: 'Employee ID', field: 'EmployeeID',
        type: 'number', operator: 'equal', value: 1
      },
      {
        condition: 'or',
        rules: [
          { label: 'Country', field: 'Country', type: 'string', operator: 'equal', value: 'USA' },
          { label: 'Title',   field: 'Title',   type: 'string', operator: 'contains', value: 'Manager' }
        ]
      }
    ]
  };
}
```

**Rule model structure:**
```typescript
{
  condition: 'and' | 'or',    // group connector
  not?: boolean,              // negate the group
  rules: Array<
    // Individual condition:
    { field: string, label: string, type: string, operator: string, value: any }
    // OR nested group:
    | { condition: string, rules: [...] }
  >
}
```

---

### From JSON (Runtime)

Use `setRules()` to update the Query Builder after it has already rendered:

```typescript
import { QueryBuilderComponent } from '@syncfusion/ej2-angular-querybuilder';
import { ViewChild, Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <ejs-querybuilder #qb width="70%">
      <e-columns>
        <e-column field="EmployeeID" label="Employee ID" type="number"></e-column>
        <e-column field="Country"    label="Country"     type="string"></e-column>
      </e-columns>
    </ejs-querybuilder>
    <button (click)="loadSavedQuery()">Load Saved Query</button>
  `
})
export class App {
  @ViewChild('qb') qb!: QueryBuilderComponent;

  loadSavedQuery(): void {
    this.qb.setRules({
      condition: 'and',
      rules: [
        { field: 'Country', label: 'Country', type: 'string', operator: 'equal', value: 'UK' },
        { field: 'EmployeeID', label: 'Employee ID', type: 'number', operator: 'greaterthan', value: 5 }
      ]
    });
  }
}
```

---

### From Inline SQL

Convert an inline SQL WHERE clause string directly into Query Builder rules:

```typescript
loadFromSql(): void {
  // SQL format: field operator 'value'
  this.qb.setRulesFromSql("EmployeeID = 1 AND Country = 'USA'");
}
```

```typescript
// More complex SQL with nested conditions
const sql = "(EmployeeID > 5 AND Country = 'USA') OR Title LIKE '%Manager%'";
this.qb.setRulesFromSql(sql);
```

---

### From Parameter SQL

Import parameterized SQL (values as `?` placeholders) with an accompanying values array:

```typescript
loadFromParameterSql(): void {
  this.qb.setParameterizedSql({
    sql: "EmployeeID = ? AND Country = ?",
    values: [1, 'USA']
  });
}
```

---

### From Named Parameter SQL

Import named-parameter SQL (values as `:name` placeholders) with a named values object:

```typescript
loadFromNamedParameterSql(): void {
  this.qb.setParameterizedNamedSql({
    sql: "EmployeeID = :empId AND Country = :country",
    values: { empId: 1, country: 'USA' }
  });
}
```

---

### From MongoDB Query

Import a MongoDB query string into the Query Builder:

```typescript
loadFromMongo(): void {
  const mongoQuery = '{"$and":[{"EmployeeID":{"$eq":1}},{"Country":{"$eq":"USA"}}]}';
  this.qb.setMongoQuery(mongoQuery);
}
```

---

## Exporting Rules

### To JSON

Get the current rules as a structured JSON object. Use this for saving queries or passing to `DataManager.getPredicate()`:

```typescript
exportToJson(): void {
  const rules = this.qb.getRules();
  console.log(JSON.stringify(rules, null, 2));
  // Save to backend, localStorage, etc.
  localStorage.setItem('savedQuery', JSON.stringify(rules));
}
```

**Example output:**
```json
{
  "condition": "and",
  "rules": [
    { "field": "EmployeeID", "label": "Employee ID", "type": "number", "operator": "equal", "value": 1 },
    { "field": "Country",    "label": "Country",     "type": "string", "operator": "equal", "value": "USA" }
  ]
}
```

---

### To Inline SQL

Export the current rules as an inline SQL WHERE clause string:

```typescript
exportToSql(): void {
  const rules = this.qb.getRules();
  const sql = this.qb.getSqlFromRules(rules);
  console.log(sql);
  // Output: "EmployeeID = 1 AND Country = 'USA'"
}
```

---

### To Parameter SQL

Export as parameterized SQL with `?` placeholders and a separate values array:

```typescript
exportToParamSql(): void {
  const rules = this.qb.getRules();
  const result = this.qb.getParameterizedSql(rules);
  console.log(result.sql);    // "EmployeeID = ? AND Country = ?"
  console.log(result.values); // [1, 'USA']
}
```

Use the values array with prepared statements to prevent SQL injection.

---

### To Named Parameter SQL

Export as named-parameter SQL with `:name` placeholders and a named values map:

```typescript
exportToNamedParamSql(): void {
  const rules = this.qb.getRules();
  const result = this.qb.getParameterizedNamedSql(rules);
  console.log(result.sql);    // "EmployeeID = :EmployeeID AND Country = :Country"
  console.log(result.values); // { EmployeeID: 1, Country: 'USA' }
}
```

---

### To MongoDB Query

Export as a MongoDB query string for direct use with MongoDB drivers or APIs:

```typescript
exportToMongo(): void {
  const rules = this.qb.getRules();
  const mongoQuery = this.qb.getMongoQuery(rules);
  console.log(mongoQuery);
  // Output: '{"$and":[{"EmployeeID":{"$eq":1}},{"Country":{"$eq":"USA"}}]}'
}
```

---

## Common Patterns

### Save and Restore Query (localStorage)

```typescript
// Save current query
saveQuery(): void {
  const rules = this.qb.getRules();
  localStorage.setItem('myQuery', JSON.stringify(rules));
}

// Restore saved query
loadQuery(): void {
  const saved = localStorage.getItem('myQuery');
  if (saved) {
    this.qb.setRules(JSON.parse(saved));
  }
}
```

### Send SQL to Backend API

```typescript
import { HttpClient } from '@angular/common/http';

applyFilter(): void {
  const rules = this.qb.getRules();
  const { sql, values } = this.qb.getParameterizedSql(rules);
  this.http.post('/api/filter', { sql, values }).subscribe(data => {
    this.results = data;
  });
}
```

### Full Export Comparison

```typescript
showAllFormats(): void {
  const rules = this.qb.getRules();
  console.log('JSON:',        JSON.stringify(rules));
  console.log('Inline SQL:',  this.qb.getSqlFromRules(rules));
  console.log('Param SQL:',   this.qb.getParameterizedSql(rules));
  console.log('Named SQL:',   this.qb.getParameterizedNamedSql(rules));
  console.log('MongoDB:',     this.qb.getMongoQuery(rules));
}
```

---

## Troubleshooting

| Issue | Solution |
|---|---|
| `setRulesFromSql` not parsing correctly | Ensure SQL string uses standard operators and quoted string values |
| `getRules()` returns empty | Check that at least one complete condition (field + operator + value) exists |
| MongoDB export format unexpected | Verify field names in rules match actual dataSource field keys exactly |
| Parameter SQL values order wrong | Values correspond positionally to `?` in the SQL — matches rule order |
| Runtime `setRules` not updating UI | Call inside Angular change detection; use `NgZone.run()` if called outside Angular |
