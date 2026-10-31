# Query Conversion

Learn how to convert Query Builder rules to SQL, MongoDB queries, parameterized queries, and import queries from SQL strings.

## Table of Contents
- [Converting Rules to SQL](#converting-rules-to-sql)
- [Generating Mongo Queries](#generating-mongo-queries)
- [Parameterized SQL Queries](#parameterized-sql-queries)
- [Named Parameter SQL](#named-parameter-sql)
- [DataManager Predicates](#datamanager-predicates)
- [Importing Rules from SQL](#importing-rules-from-sql)
- [Localization in Query Conversion](#localization-in-query-conversion)

## Converting Rules to SQL

Convert Query Builder rules to SQL WHERE clauses using `getSqlFromRules()`:

```vue
<template>
  <div class="query-converter">
    <ejs-querybuilder ref="qbRef" width="100%" :rule="initialRule">
      <e-columns>
        <e-column field='EmployeeID' label='Employee ID' type='number' />
        <e-column field='FirstName' label='First Name' type='string' />
        <e-column field='Salary' label='Salary' type='number' format='C2' />
        <e-column field='HireDate' label='Hire Date' type='date' format='dd/MM/yyyy' />
      </e-columns>
    </ejs-querybuilder>
    <div class="actions">
      <button @click="generateSQL">Generate SQL</button>
      <button @click="copySQLToClipboard">Copy SQL</button>
    </div>
    <div v-if="sqlQuery" class="output">
      <h4>Generated SQL Query:</h4>
      <pre>{{ sqlQuery }}</pre>
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
      sqlQuery: '',
      initialRule: {
        condition: 'and',
        rules: [
          {
            field: 'Salary',
            label: 'Salary',
            operator: 'greaterthan',
            type: 'number',
            value: 50000
          },
          {
            field: 'HireDate',
            label: 'Hire Date',
            operator: 'greaterthan',
            type: 'date',
            value: new Date(2020, 0, 1)
          }
        ]
      }
    }
  },
  methods: {
    generateSQL() {
      this.sqlQuery = this.$refs.qbRef.getSqlFromRules() || ''
      console.log('Generated SQL:', this.sqlQuery)
    },
    copySQLToClipboard() {
      navigator.clipboard.writeText(this.sqlQuery)
      alert('SQL copied to clipboard!')
    }
  }
}
</script>

<style>
.query-converter {
  padding: 20px;
}

.actions {
  margin: 20px 0;
  display: flex;
  gap: 10px;
}

button {
  padding: 8px 16px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.output {
  margin-top: 20px;
  padding: 15px;
  background-color: #f8f9fa;
  border: 1px solid #dee2e6;
  border-radius: 4px;
}

pre {
  background-color: #f3f4f6;
  padding: 10px;
  border-radius: 4px;
  overflow-x: auto;
  font-size: 12px;
}
</style>
```

### SQL Query Output Example

```sql
-- Sample output from Query Builder
WHERE (Salary > 50000) AND (HireDate > '2020-01-01')
```

## Generating Mongo Queries

Convert Query Builder rules to MongoDB query syntax using `getMongoQuery()`:

```vue
<template>
  <div>
    <ejs-querybuilder
      ref="qbRef"
      width="100%"
      :columns="columns"
    />
    <button @click="generateMongo">Generate Mongo Query</button>
    <pre v-if="mongoQuery">{{ mongoQuery }}</pre>
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
      columns: [
        { field: 'EmployeeID', label: 'Employee ID', type: 'number' },
        { field: 'FirstName', label: 'First Name', type: 'string' },
        { field: 'Salary', label: 'Salary', type: 'number' }
      ],
      mongoQuery: ''
    }
  },
  methods: {
    generateMongo() {
      this.mongoQuery = this.$refs.qbRef.getMongoQuery() || ''
      console.log('MongoDB Query:', this.mongoQuery)
    }
  }
}
</script>
```

### MongoDB Output Example

```json
{
  "$and": [
    { "Salary": { "$gt": 50000 } },
    { "HireDate": { "$gt": ISODate("2020-01-01") } }
  ]
}
```

## Parameterized SQL Queries

Create parameterized SQL to prevent SQL injection:

```vue
<template>
  <div class="parameterized-section">
    <ejs-querybuilder
      ref="qbRef"
      width="100%"
      :columns="columns"
    />
    <button @click="generateParameterizedSQL">Generate Parameterized SQL</button>
    <div v-if="paramQuery" class="result">
      <h4>SQL Query:</h4>
      <pre>{{ paramQuery.sqlQuery }}</pre>
      <h4>Parameters:</h4>
      <pre>{{ JSON.stringify(paramQuery.params, null, 2) }}</pre>
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
      columns: [
        { field: 'EmployeeID', label: 'Employee ID', type: 'number' },
        { field: 'FirstName', label: 'First Name', type: 'string' },
        { field: 'Salary', label: 'Salary', type: 'number' }
      ],
      paramQuery: null
    }
  },
  methods: {
    generateParameterizedSQL() {
      const result = this.$refs.qbRef.getParameterizedSql()
      this.paramQuery = {
        sqlQuery: result,
        params: this.extractParameters(result)
      }
    },
    extractParameters(sql) {
      const params = {}
      const regex = /@(\w+)/g
      let match
      while ((match = regex.exec(sql)) !== null) {
        params[match[1]] = null
      }
      return params
    }
  }
}

// Helper function to extract parameters
const extractParameters = (query: string) => {
  const params: any = {}
  const regex = /@\w+/g
  let match
  let paramIndex = 1
  
  while ((match = regex.exec(query)) !== null) {
    const paramName = match[0]
    if (!params[paramName]) {
      params[paramName] = `value_${paramIndex++}`
    }
  }
  
  return params
}
</script>
```

### Parameterized Output Example

```
SQL Query: WHERE (Salary > @Salary) AND (FirstName LIKE @FirstName)
Parameters: {
  "@Salary": 50000,
  "@FirstName": "%John%"
}
```

## Named Parameter SQL

Generate SQL with named parameters:

```vue
<template>
  <div>
    <ejs-querybuilder ref="qbRef" width="100%">
      <e-columns>
        <e-column field='Salary' label='Salary' type='number' />
        <e-column field='Country' label='Country' type='string' />
      </e-columns>
    </ejs-querybuilder>
    <button @click="generateNamedSQL">Generate Named Parameter SQL</button>
    <div v-if="namedSQL" class="output">
      <h4>Named SQL Query:</h4>
      <pre>{{ namedSQL.sqlQuery }}</pre>
      <h4>Parameter List:</h4>
      <pre>{{ JSON.stringify(namedSQL.paramList, null, 2) }}</pre>
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
      namedSQL: null
    }
  },
  methods: {
    generateNamedSQL() {
      const result = this.$refs.qbRef.getParameterizedNamedSql()
      
      this.namedSQL = {
        sqlQuery: result?.sql || '',
        paramList: result?.params || []
      }
    }
  }
}
</script>
```

## DataManager Predicates

Convert rules to DataManager predicates for client-side filtering:

```vue
<template>
  <div class="predicate-demo">
    <ejs-querybuilder ref="qbRef" width="100%" @change="handleChange">
      <e-columns>
        <e-column field='EmployeeID' label='Employee ID' type='number' />
        <e-column field='FirstName' label='First Name' type='string' />
        <e-column field='Salary' label='Salary' type='number' format='C2' />
      </e-columns>
    </ejs-querybuilder>
    <div v-if="filteredData.length > 0" class="results">
      <h4>Filtered Results ({{ filteredData.length }} records):</h4>
      <table>
        <thead>
          <tr>
            <th>Employee ID</th>
            <th>Name</th>
            <th>Salary</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in filteredData" :key="item.EmployeeID">
            <td>{{ item.EmployeeID }}</td>
            <td>{{ item.FirstName }}</td>
            <td>{{ item.Salary }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { DataManager, Query } from '@syncfusion/ej2-data'
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
      filteredData: [],
      allData: [
        { EmployeeID: 1001, FirstName: 'Nancy', Salary: 60000 },
        { EmployeeID: 1002, FirstName: 'Andrew', Salary: 95000 },
        { EmployeeID: 1003, FirstName: 'Janet', Salary: 45000 },
        { EmployeeID: 1004, FirstName: 'Margaret', Salary: 35000 },
        { EmployeeID: 1005, FirstName: 'Steven', Salary: 85000 }
      ]
    }
  },
  methods: {
    handleChange() {
      const predicate = this.$refs.qbRef.getPredicate()
      
      if (predicate) {
        const dataManager = new DataManager(this.allData)
        const query = new Query().where(predicate)
        this.filteredData = dataManager.executeLocal(query)
      } else {
        this.filteredData = this.allData
      }
    }
  }
}
</script>

<style>
table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 10px;
}

th, td {
  border: 1px solid #ddd;
  padding: 10px;
  text-align: left;
}

th {
  background-color: #f8f9fa;
  font-weight: bold;
}
</style>
```

## Importing Rules from SQL

Convert SQL queries back to Query Builder rules:

```vue
<template>
  <div class="sql-import">
    <div class="import-section">
      <label>Enter SQL WHERE Clause:</label>
      <textarea v-model="sqlInput" rows="4" placeholder="e.g., WHERE Salary > 50000 AND Country = 'USA'"></textarea>
      <button @click="importSQL">Import SQL</button>
    </div>
    <ejs-querybuilder ref="qbRef" width="100%" :rule="queryRule">
      <e-columns>
        <e-column field='Salary' label='Salary' type='number' />
        <e-column field='Country' label='Country' type='string' />
      </e-columns>
    </ejs-querybuilder>
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
      sqlInput: '',
      queryRule: {
        condition: 'and',
        rules: []
      }
    }
  },
  methods: {
    importSQL() {
      try {
        // Note: This requires the SQL format to match Syncfusion's expected format
        this.$refs.qbRef.setRulesFromSql(this.sqlInput)
        console.log('SQL imported successfully')
      } catch (error) {
        console.error('Failed to import SQL:', error)
        alert('Failed to import SQL. Please check the format.')
      }
    }
  }
}
</script>

<style>
.sql-import {
  padding: 20px;
}

.import-section {
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

label {
  font-weight: 500;
}

textarea {
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-family: 'Courier New', monospace;
  font-size: 12px;
}

button {
  padding: 8px 16px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  align-self: flex-start;
}
</style>
```

## Localization in Query Conversion

Handle localized SQL conversion:

```vue
<template>
  <div>
    <label>Select Locale:</label>
    <select v-model="selectedLocale" @change="generateLocalizedSQL">
      <option value="en-US">English (US)</option>
      <option value="de-DE">Deutsch</option>
      <option value="fr-FR">Français</option>
      <option value="ja-JP">日本語</option>
    </select>
    <ejs-querybuilder ref="qbRef" width="100%" :locale="selectedLocale">
      <e-columns>
        <e-column field='EmployeeID' label='Employee ID' type='number' />
        <e-column field='FirstName' label='First Name' type='string' />
      </e-columns>
    </ejs-querybuilder>
    <button @click="generateLocalizedSQL">Generate Localized SQL</button>
    <pre v-if="localizedSQL">{{ localizedSQL }}</pre>
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
      selectedLocale: 'en-US',
      localizedSQL: ''
    }
  },
  methods: {
    generateLocalizedSQL() {
      // SQL output will respect the current locale setting
      this.localizedSQL = this.$refs.qbRef.getSqlFromRules() || ''
    }
  }
}
</script>
```

## Complete Example: Query Conversion Dashboard

```vue
<template>
  <div class="conversion-dashboard">
    <h2>Query Conversion Toolkit</h2>
    <ejs-querybuilder ref="qbRef" width="100%" @change="generateConversions">
      <e-columns>
        <e-column field='EmployeeID' label='Employee ID' type='number' />
        <e-column field='FirstName' label='First Name' type='string' />
        <e-column field='Salary' label='Salary' type='number' />
      </e-columns>
    </ejs-querybuilder>
    <div class="conversion-output">
      <div class="output-panel">
        <h4>SQL Query</h4>
        <pre>{{ sqlOutput }}</pre>
        <button @click="copySQLToClipboard">Copy SQL</button>
      </div>
      <div class="output-panel">
        <h4>MongoDB Query</h4>
        <pre>{{ mongoOutput }}</pre>
        <button @click="copyMongoToClipboard">Copy Mongo</button>
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
      sqlOutput: '',
      mongoOutput: ''
    }
  },
  methods: {
    generateConversions() {
      this.sqlOutput = this.$refs.qbRef.getSqlFromRules() || ''
      this.mongoOutput = this.$refs.qbRef.getMongoQuery() || ''
    },
    copySQLToClipboard() {
      navigator.clipboard.writeText(this.sqlOutput)
      alert('SQL copied!')
    },
    copyMongoToClipboard() {
      navigator.clipboard.writeText(this.mongoOutput)
      alert('MongoDB query copied!')
    }
  }
}
</script>

<style>
.conversion-dashboard {
  padding: 20px;
}

.conversion-output {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-top: 20px;
}

.output-panel {
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 15px;
}

.output-panel h4 {
  margin-top: 0;
}

pre {
  background-color: #f3f4f6;
  padding: 10px;
  border-radius: 4px;
  overflow-x: auto;
  font-size: 12px;
}

button {
  padding: 8px 16px;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 12px;
}
</style>
```

This section provides comprehensive query conversion examples for all output formats supported by the Query Builder.
