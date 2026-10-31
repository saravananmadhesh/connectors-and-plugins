# Import & Export in QueryBuilder

The QueryBuilder supports importing predefined conditions from JSON, SQL, and MongoDB formats, and exporting the current rules back to those same formats.

## Table of Contents
- [Importing](#importing)
  - [From JSON (Initial Render)](#from-json-initial-render)
  - [From JSON (Post Render)](#from-json-post-render-setrules)
  - [From Inline SQL](#from-inline-sql-setrulesfromsql)
  - [From Parameter SQL](#from-parameter-sql-setparameterizedsql)
  - [From Named Parameter SQL](#from-named-parameter-sql-setparameterizednamedsql)
  - [From MongoDB Query](#from-mongodb-query-setmongoquery)
- [Exporting](#exporting)
  - [To JSON](#to-json-getrules)
  - [To Inline SQL](#to-inline-sql-getsqlfromrules)
  - [To Parameter SQL](#to-parameter-sql-getparameterizedsql)
  - [To Named Parameter SQL](#to-named-parameter-sql-getparameterizednamedsql)
  - [To MongoDB Query](#to-mongodb-query-getmongoquery)

---

## Importing

### From JSON (Initial Render)

Set initial rules by creating a `QueryBuilderRule` C# object and passing it via the `rule` attribute. This is the standard way to pre-populate rules at page load.

```cshtml
@using Syncfusion.EJ2.QueryBuilder
@{
    QueryBuilderRule rule = new QueryBuilderRule()
    {
        Condition = "and",
        Rules = new List<QueryBuilderRule>()
        {
            new QueryBuilderRule { Label = "First Name", Field = "FirstName", Type = "string", Operator = "startswith", Value = "Nancy" },
            new QueryBuilderRule { Label = "Country", Field = "Country", Type = "string", Operator = "equal", Value = "USA" }
        }
    };
    var dataSource = EmployeeView.GetAllRecords();
}
<ejs-querybuilder id="querybuilder" width="70%" rule="rule" dataSource="dataSource">
    <e-querybuilder-columns>
        <e-querybuilder-column field="EmployeeID" label="Employee ID" type="number"></e-querybuilder-column>
        <e-querybuilder-column field="FirstName" label="First Name" type="string"></e-querybuilder-column>
        <e-querybuilder-column field="Country" label="Country" type="string"></e-querybuilder-column>
    </e-querybuilder-columns>
</ejs-querybuilder>
```

### From JSON (Post Render) — `setRules`

Load rules dynamically after the component renders using `setRules()`:

```javascript
var qb = ej.base.getInstance(document.getElementById("querybuilder"), ejs.querybuilder.QueryBuilder);

var importRules = {
    condition: 'and',
    rules: [
        { label: 'First Name', field: 'FirstName', type: 'string', operator: 'startswith', value: 'Nancy' },
        { label: 'Country', field: 'Country', type: 'string', operator: 'equal', value: 'USA' }
    ]
};

qb.setRules(importRules);
```

### From Inline SQL — `setRulesFromSql`

Parse an inline SQL WHERE clause and load it as rules:

```javascript
var qb = ej.base.getInstance(document.getElementById("querybuilder"), ejs.querybuilder.QueryBuilder);

var sqlQuery = "FirstName LIKE 'Nancy%' AND Country = 'USA'";
qb.setRulesFromSql(sqlQuery);
```

### From Parameter SQL — `setParameterizedSql`

Import a parameterized SQL query (uses `?` as placeholders):

```javascript
var qb = ej.base.getInstance(document.getElementById("querybuilder"), ejs.querybuilder.QueryBuilder);

var paramSql = {
    sql: "FirstName LIKE ? AND Country = ?",
    params: ['Nancy%', 'USA']
};
qb.setParameterizedSql(paramSql);
```

### From Named Parameter SQL — `setParameterizedNamedSql`

Import SQL using named parameter placeholders (`:param_name`):

```javascript
var qb = ej.base.getInstance(document.getElementById("querybuilder"), ejs.querybuilder.QueryBuilder);

var namedParamSql = {
    sql: "FirstName LIKE :firstName AND Country = :country",
    params: { firstName: 'Nancy%', country: 'USA' }
};
qb.setParameterizedNamedSql(namedParamSql);
```

### From MongoDB Query — `setMongoQuery`

Import a MongoDB-style query object:

```javascript
var qb = ej.base.getInstance(document.getElementById("querybuilder"), ejs.querybuilder.QueryBuilder);

var mongoQuery = '{ "$and": [{ "FirstName": { "$regex": "^Nancy" } }, { "Country": "USA" }] }';
qb.setMongoQuery(mongoQuery);
```

---

## Exporting

### To JSON — `getRules`

Get the current rules as a structured JSON object:

```javascript
var qb = ej.base.getInstance(document.getElementById("querybuilder"), ejs.querybuilder.QueryBuilder);
var rules = qb.getRules();
console.log(JSON.stringify(rules));
// Output: { "condition": "and", "rules": [...] }
```

Use `getRules()` to persist the query to a database or localStorage:

```javascript
localStorage.setItem('savedQuery', JSON.stringify(qb.getRules()));
```

### To Inline SQL — `getSqlFromRules`

Convert the current rules into an inline SQL WHERE clause:

```javascript
var qb = ej.base.getInstance(document.getElementById("querybuilder"), ejs.querybuilder.QueryBuilder);
var rules = qb.getRules();
var sql = qb.getSqlFromRules(rules);
console.log(sql);
// Output: "FirstName LIKE 'Nancy%' AND Country = 'USA'"
```

### To Parameter SQL — `getParameterizedSql`

Export rules as parameterized SQL (safe against SQL injection):

```javascript
var qb = ej.base.getInstance(document.getElementById("querybuilder"), ejs.querybuilder.QueryBuilder);
var rules = qb.getRules();
var paramSql = qb.getParameterizedSql(rules);
console.log(paramSql.sql);    // "FirstName LIKE ? AND Country = ?"
console.log(paramSql.params); // ['Nancy%', 'USA']
```

### To Named Parameter SQL — `getParameterizedNamedSql`

Export rules as named parameter SQL (more readable, less ambiguous):

```javascript
var qb = ej.base.getInstance(document.getElementById("querybuilder"), ejs.querybuilder.QueryBuilder);
var rules = qb.getRules();
var namedSql = qb.getParameterizedNamedSql(rules);
console.log(namedSql.sql);    // "FirstName LIKE :firstName AND Country = :country"
console.log(namedSql.params); // { firstName: 'Nancy%', country: 'USA' }
```

### To MongoDB Query — `getMongoQuery`

Convert the current rules to a MongoDB query string:

```javascript
var qb = ej.base.getInstance(document.getElementById("querybuilder"), ejs.querybuilder.QueryBuilder);
var rules = qb.getRules();
var mongoQuery = qb.getMongoQuery(rules);
console.log(mongoQuery);
// Output: '{ "$and": [{ "FirstName": /^Nancy/i }, { "Country": "USA" }] }'
```

---

## Full Import / Export UI Example

```cshtml
<ejs-querybuilder id="querybuilder" width="70%">
    <e-querybuilder-columns>
        <e-querybuilder-column field="FirstName" label="First Name" type="string"></e-querybuilder-column>
        <e-querybuilder-column field="Country" label="Country" type="string"></e-querybuilder-column>
        <e-querybuilder-column field="EmployeeID" label="Employee ID" type="number"></e-querybuilder-column>
    </e-querybuilder-columns>
</ejs-querybuilder>

<div style="margin-top:16px">
    <button onclick="exportJson()">Export JSON</button>
    <button onclick="exportSql()">Export SQL</button>
    <button onclick="importSql()">Import SQL</button>
</div>

<pre id="output"></pre>

<script>
    function exportJson() {
        var qb = ej.base.getInstance(document.getElementById("querybuilder"), ejs.querybuilder.QueryBuilder);
        document.getElementById('output').textContent =
            JSON.stringify(qb.getRules(), null, 2);
    }

    function exportSql() {
        var qb = ej.base.getInstance(document.getElementById("querybuilder"), ejs.querybuilder.QueryBuilder);
        document.getElementById('output').textContent =
            qb.getSqlFromRules(qb.getRules());
    }

    function importSql() {
        var qb = ej.base.getInstance(document.getElementById("querybuilder"), ejs.querybuilder.QueryBuilder);
        qb.setRulesFromSql("FirstName LIKE 'Nancy%' AND Country = 'USA'");
    }
</script>
```

## See Also

- [Data Binding](querybuilder-data-binding.md) — Bind data sources to QueryBuilder
- [Filtering & Rule Management](querybuilder-filtering-and-rules.md) — Programmatically manage rules
- [API Reference](querybuilder-api.md) — Full method signatures
