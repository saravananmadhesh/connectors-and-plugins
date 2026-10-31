# Import and Export in Vue Query Builder

## Table of Contents
- [Overview](#overview)
- [Importing Rules](#importing-rules)
- [Exporting Rules](#exporting-rules)
- [Converting to SQL](#converting-to-sql)
- [Using with DataManager](#using-with-datamanager)
- [Rule Format Reference](#rule-format-reference)
- [Examples](#examples)
- [Best Practices](#best-practices)

---

## Overview

Query Builder can import and export rules in multiple formats:

1. **JSON Rules** - Standard format (import/export)
2. **SQL Strings** - SQL WHERE clause format
3. **DataManager Predicates** - For filtering data

This enables:
- Saving and loading filter configurations
- Sharing filter definitions across applications
- Converting between formats
- Server-side data filtering

---

## Importing Rules

### Import JSON Rules

Load pre-defined filter rules:

```vue
<template>
  <div>
    <ejs-querybuilder ref="querybuilder" :rule="importedRules">
      <e-columns>
        <e-column field='FirstName' label='First Name' type='string' />
        <e-column field='Salary' label='Salary' type='number' />
      </e-columns>
    </ejs-querybuilder>
    <button @click="applyDifferentRules">Load Manager Filter</button>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      importedRules: {
        'condition': 'and',
        'rules': [{
          'label': 'FirstName',
          'field': 'FirstName',
          'type': 'string',
          'operator': 'startswith',
          'value': 'A'
        }]
      }
    };
  },
  methods: {
    applyDifferentRules: function() {
      const managerRules = {
        'condition': 'and',
        'rules': [{
          'label': 'Title',
          'field': 'Title',
          'type': 'string',
          'operator': 'equal',
          'value': 'Manager'
        },
        {
          'label': 'Salary',
          'field': 'Salary',
          'type': 'number',
          'operator': 'greaterthan',
          'value': 50000
        }]
      };
      
      this.$refs.querybuilder.setRules(managerRules);
    }
  }
}
</script>
```

### Import from SQL String

Convert SQL WHERE clauses to Query Builder rules:

```vue
<template>
  <div>
    <textarea v-model="sqlQuery"></textarea>
    <button @click="importFromSQL">Import SQL Rules</button>
    <ejs-querybuilder ref="querybuilder">
      <e-columns>
        <e-column field='FirstName' label='First Name' type='string' />
        <e-column field='Salary' label='Salary' type='number' />
      </e-columns>
    </ejs-querybuilder>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      sqlQuery: "FirstName LIKE ('%A%') AND Salary > 50000"
    };
  },
  methods: {
    importFromSQL: function() {
      this.$refs.querybuilder.setRulesFromSql(this.sqlQuery);
    }
  }
}
</script>
```

### SQL to Rules Mapping

| SQL | Query Builder |
|-----|---------------|
| `=` | `equal` |
| `!=` or `<>` | `notequal` |
| `>` | `greaterthan` |
| `<` | `lessthan` |
| `>=` | `greaterthanorequal` |
| `<=` | `lessthanorequal` |
| `LIKE '%text%'` | `contains` |
| `LIKE 'text%'` | `startswith` |
| `LIKE '%text'` | `endswith` |
| `IN (...)` | `in` |
| `NOT IN (...)` | `notin` |

---

## Exporting Rules

### Export to JSON

Get current rules as JSON:

```vue
<template>
  <div>
    <ejs-querybuilder ref="querybuilder">
      <!-- Query Builder -->
    </ejs-querybuilder>
    <button @click="exportToJSON">Export to JSON</button>
    <pre>{{ exportedJSON }}</pre>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      exportedJSON: ''
    };
  },
  methods: {
    exportToJSON: function() {
      const rules = this.$refs.querybuilder.getRules();
      this.exportedJSON = JSON.stringify(rules, null, 2);
      console.log('Exported rules:', rules);
    }
  }
}
</script>
```

### Export to JavaScript Object

```javascript
// Get current rules
const rules = querybuilder.getRules();

// Structure:
// {
//   'condition': 'and',
//   'rules': [
//     {
//       'label': 'FirstName',
//       'field': 'FirstName',
//       'type': 'string',
//       'operator': 'equal',
//       'value': 'Nancy'
//     }
//   ]
// }

// Use or save
console.log(JSON.stringify(rules));
localStorage.setItem('savedRules', JSON.stringify(rules));
```

### Save to Server

```javascript
async function saveRulesToServer() {
  const rules = querybuilder.getRules();
  
  const response = await fetch('/api/filters', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: 'My Filter',
      rules: rules
    })
  });
  
  const result = await response.json();
  console.log('Saved with ID:', result.id);
}
```

---

## Converting to SQL

### Export to SQL String

```vue
<template>
  <div>
    <ejs-querybuilder ref="querybuilder">
      <!-- Query Builder -->
    </ejs-querybuilder>
    <button @click="exportToSQL">Export to SQL</button>
    <textarea v-model="sqlOutput" readonly></textarea>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      sqlOutput: ''
    };
  },
  methods: {
    exportToSQL: function() {
      const sql = this.$refs.querybuilder.getSql();
      this.sqlOutput = sql;
      console.log('SQL Query:', sql);
    }
  }
}
</script>
```

### Example Output

Input rules:
```javascript
{
  'condition': 'and',
  'rules': [
    { 'field': 'FirstName', 'operator': 'startswith', 'value': 'A' },
    { 'field': 'Salary', 'operator': 'greaterthan', 'value': 50000 }
  ]
}
```

Output SQL:
```sql
FirstName LIKE ('A%') AND Salary > 50000
```

---

## Using with DataManager

### Filter Data with Predicates

Use Query Builder rules to filter data:

```vue
<template>
  <div>
    <ejs-querybuilder ref="querybuilder" :dataSource="employees">
      <e-columns>
        <e-column field='FirstName' label='First Name' type='string' />
        <e-column field='Salary' label='Salary' type='number' />
      </e-columns>
    </ejs-querybuilder>
    
    <button @click="applyFilter">Apply Filter</button>
    
    <div>
      <h3>Filtered Results ({{ filteredData.length }} records)</h3>
      <ul>
        <li v-for="emp in filteredData" :key="emp.id">
          {{ emp.FirstName }} - ${{ emp.Salary }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { QueryBuilderComponent } from "@syncfusion/ej2-vue-querybuilder";
import { DataManager, Query } from '@syncfusion/ej2-data';

export default {
  components: {
    'ejs-querybuilder': QueryBuilderComponent
  },
  data: function() {
    return {
      employees: [
        { 'id': 1, 'FirstName': 'Nancy', 'Salary': 30000 },
        { 'id': 2, 'FirstName': 'Andrew', 'Salary': 45000 },
        { 'id': 3, 'FirstName': 'Robert', 'Salary': 60000 },
        { 'id': 4, 'FirstName': 'Alan', 'Salary': 52000 }
      ],
      filteredData: []
    };
  },
  methods: {
    applyFilter: function() {
      // Get predicate from Query Builder rules
      const predicate = this.$refs.querybuilder.getPredicate();
      
      // Create query with predicate
      const query = new Query().where(predicate);
      
      // Execute on DataManager
      new DataManager(this.employees).executeQuery(query)
        .then((result) => {
          this.filteredData = result.result;
          console.log('Filtered:', result.result);
        });
    }
  }
}
</script>
```

### Complex Filtering Example

```javascript
// Query Builder rules
const rules = {
  'condition': 'and',
  'rules': [
    { 'field': 'Salary', 'operator': 'greaterthan', 'value': 40000 },
    {
      'condition': 'or',
      'rules': [
        { 'field': 'FirstName', 'operator': 'startswith', 'value': 'A' },
        { 'field': 'FirstName', 'operator': 'startswith', 'value': 'R' }
      ]
    }
  ]
};

// Set rules and get predicate
querybuilder.setRules(rules);
const predicate = querybuilder.getPredicate();

// Filter data
const result = new DataManager(employees)
  .executeQuery(new Query().where(predicate))
  .then((e) => {
    console.log('Matching employees:', e.result);
  });
```

---

## Rule Format Reference

### Complete Rule Structure

```javascript
{
  'condition': 'and',        // 'and' or 'or'
  'not': false,              // Optional: true for NOT condition
  'rules': [
    {
      'label': 'First Name',        // Display name
      'field': 'FirstName',         // Data field
      'type': 'string',             // 'string', 'number', 'boolean', 'date'
      'operator': 'equal',          // Comparison operator
      'value': 'Nancy',             // Filter value
      'ruleID': 'group0_rule0'      // Auto-generated ID
    }
  ]
}
```

### Nested Rules Example

```javascript
{
  'condition': 'and',
  'rules': [
    {
      'label': 'Salary',
      'field': 'Salary',
      'type': 'number',
      'operator': 'greaterthan',
      'value': 50000
    },
    {
      'condition': 'or',
      'rules': [
        {
          'label': 'Title',
          'field': 'Title',
          'type': 'string',
          'operator': 'equal',
          'value': 'Manager'
        },
        {
          'label': 'Title',
          'field': 'Title',
          'type': 'string',
          'operator': 'equal',
          'value': 'Director'
        }
      ]
    }
  ]
}
```

---

## Examples

### Example 1: Save and Load Filters

```vue
<template>
  <div>
    <div class="controls">
      <input v-model="filterName" placeholder="Filter name">
      <button @click="saveFilter">Save Filter</button>
      
      <select @change="loadFilter">
        <option value="">-- Select saved filter --</option>
        <option v-for="f in savedFilters" :key="f.id" :value="f.id">
          {{ f.name }}
        </option>
      </select>
    </div>
    
    <ejs-querybuilder ref="querybuilder">
      <!-- Query Builder -->
    </ejs-querybuilder>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      filterName: '',
      savedFilters: []
    };
  },
  mounted: function() {
    this.loadSavedFilters();
  },
  methods: {
    saveFilter: function() {
      if (!this.filterName) {
        alert('Enter filter name');
        return;
      }
      
      const rules = this.$refs.querybuilder.getRules();
      const filter = {
        id: Date.now(),
        name: this.filterName,
        rules: rules
      };
      
      this.savedFilters.push(filter);
      localStorage.setItem('queryBuilderFilters', JSON.stringify(this.savedFilters));
      this.filterName = '';
      alert('Filter saved!');
    },
    loadFilter: function(event) {
      const id = event.target.value;
      if (!id) return;
      
      const filter = this.savedFilters.find(f => f.id == id);
      if (filter) {
        this.$refs.querybuilder.setRules(filter.rules);
      }
    },
    loadSavedFilters: function() {
      const saved = localStorage.getItem('queryBuilderFilters');
      this.savedFilters = saved ? JSON.parse(saved) : [];
    }
  }
}
</script>
```

### Example 2: Export Multiple Formats

```vue
<template>
  <div>
    <ejs-querybuilder ref="querybuilder">
      <!-- Query Builder -->
    </ejs-querybuilder>
    
    <div class="export-buttons">
      <button @click="exportJSON">Export JSON</button>
      <button @click="exportSQL">Export SQL</button>
      <button @click="copyToClipboard">Copy SQL</button>
    </div>
    
    <div class="output">
      <h4>{{ exportFormat }}</h4>
      <pre>{{ exportedData }}</pre>
    </div>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      exportedData: '',
      exportFormat: ''
    };
  },
  methods: {
    exportJSON: function() {
      const rules = this.$refs.querybuilder.getRules();
      this.exportedData = JSON.stringify(rules, null, 2);
      this.exportFormat = 'JSON Format';
    },
    exportSQL: function() {
      const sql = this.$refs.querybuilder.getSql();
      this.exportedData = sql;
      this.exportFormat = 'SQL Query';
    },
    copyToClipboard: function() {
      navigator.clipboard.writeText(this.exportedData);
      alert('Copied to clipboard!');
    }
  }
}
</script>
```

---

## Best Practices

### 1. Validate Rules Before Import
```javascript
importRules: function(rules) {
  if (!rules || !rules.condition || !rules.rules) {
    console.error('Invalid rules format');
    return;
  }
  this.$refs.querybuilder.setRules(rules);
}
```

### 2. Handle SQL Injection
When using SQL exports on server:
```sql
-- Use parameterized queries
SELECT * FROM employees 
WHERE FirstName = ? AND Salary > ?
```

### 3. Version Your Rules
```javascript
const filter = {
  version: '1.0',
  name: 'High Earners',
  rules: { /* ... */ }
};
```

### 4. Provide Import/Export UI
```vue
<div class="import-export">
  <button @click="downloadRules">Download</button>
  <input type="file" @change="uploadRules" accept=".json">
</div>
```

### 5. Handle Large Rulesets
```javascript
// For complex nested rules, add pagination/hierarchy UI
// or provide visualization of the rule structure
```

---

## Next Steps

- See [rules-and-filtering.md](rules-and-filtering.md) for creating rules
- See [advanced-features.md](advanced-features.md) for complex data
- See [data-binding.md](data-binding.md) for data sources
