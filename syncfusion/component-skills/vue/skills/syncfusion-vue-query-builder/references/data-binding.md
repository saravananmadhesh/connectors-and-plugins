# Data Binding

Learn how to bind local data arrays, remote data with DataManager, and handle dynamic data updates in Vue 3.

## Table of Contents
- [Local Data Binding](#local-data-binding)
- [Remote Data with DataManager](#remote-data-with-datamanager)
- [ODataV4Adaptor Integration](#odatav4adaptor-integration)
- [Dynamic Data Updates](#dynamic-data-updates)
- [DataManager Query Integration](#datamanager-query-integration)
- [Handling Data Source Changes](#handling-data-source-changes)

## Local Data Binding

Bind local data arrays directly to the Query Builder using the `dataSource` property:

```vue
<template>
  <ejs-querybuilder width="100%" :dataSource="localData">
    <e-columns>
      <e-column field='EmployeeID' label='Employee ID' type='number' />
      <e-column field='FirstName' label='First Name' type='string' />
      <e-column field='Title' label='Title' type='string' />
      <e-column field='HireDate' label='Hire Date' type='date' format='dd/MM/yyyy' />
      <e-column field='Country' label='Country' type='string' />
    </e-columns>
  </ejs-querybuilder>
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
      localData: [
        {
          EmployeeID: 1001,
          FirstName: 'Nancy',
          Title: 'Sales Manager',
          HireDate: new Date(1992, 4, 15),
          Country: 'USA'
        },
        {
          EmployeeID: 1002,
          FirstName: 'Andrew',
          Title: 'Vice President',
          HireDate: new Date(1992, 6, 9),
          Country: 'USA'
        },
        {
          EmployeeID: 1003,
          FirstName: 'Janet',
          Title: 'Sales Representative',
          HireDate: new Date(1993, 3, 10),
          Country: 'USA'
        }
      ]
    }
  }
}
</script>
```

### Dynamic Local Data Loading

Load data dynamically from an API or database:

```vue
<template>
  <div>
    <button @click="loadData">Load Data</button>
    <ejs-querybuilder
      v-if="localData.length > 0"
      width="100%"
      :dataSource="localData"
    >
      <e-columns>
        <e-column field='EmployeeID' label='Employee ID' type='number' />
        <e-column field='FirstName' label='First Name' type='string' />
        <e-column field='Title' label='Title' type='string' />
      </e-columns>
    </ejs-querybuilder>
    <p v-else>No data loaded</p>
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
      localData: []
    }
  },
  mounted() {
    this.loadData()
  },
  methods: {
    async loadData() {
      try {
        const response = await fetch('/api/employees')
        this.localData = await response.json()
      } catch (error) {
        console.error('Failed to load data:', error)
      }
    }
  }
}
</script>
```

## Remote Data with DataManager

Use DataManager to bind remote data from a server:

```vue
<template>
  <ejs-querybuilder width="100%" :dataSource="dataManager">
    <e-columns>
      <e-column field='OrderID' label='Order ID' type='number' />
      <e-column field='CustomerName' label='Customer Name' type='string' />
      <e-column field='TotalAmount' label='Total Amount' type='number' format='C2' />
      <e-column field='OrderDate' label='Order Date' type='date' format='dd/MM/yyyy' />
      <e-column field='Status' label='Status' type='string' />
    </e-columns>
  </ejs-querybuilder>
</template>

<script>
import { QueryBuilderComponent, ColumnsDirective, ColumnDirective } from '@syncfusion/ej2-vue-querybuilder'
import { DataManager, UrlAdaptor } from '@syncfusion/ej2-data'

export default {
  name: "App",
  components: {
    "ejs-querybuilder": QueryBuilderComponent,
    "e-columns": ColumnsDirective,
    "e-column": ColumnDirective
  },
  data() {
    return {
      dataManager: new DataManager({
        url: 'https://services.syncfusion.com/vue/production/api/Orders',
        adaptor: new UrlAdaptor()
      })
    }
  }
}
</script>
```

### Error Handling with Remote Data

```vue
<template>
  <div>
    <p v-if="isLoading">Loading data...</p>
    <p v-if="error" class="error">{{ error }}</p>
    <ejs-querybuilder
      v-if="!isLoading && !error"
      width="100%"
      :dataSource="dataManager"
      @dataBound="onDataBound"
      @actionFailure="onActionFailure"
    >
      <e-columns>
        <e-column field='OrderID' label='Order ID' type='number' />
        <e-column field='CustomerName' label='Customer Name' type='string' />
      </e-columns>
    </ejs-querybuilder>
  </div>
</template>

<script>
import { QueryBuilderComponent, ColumnsDirective, ColumnDirective } from '@syncfusion/ej2-vue-querybuilder'
import { DataManager, UrlAdaptor } from '@syncfusion/ej2-data'

export default {
  name: "App",
  components: {
    "ejs-querybuilder": QueryBuilderComponent,
    "e-columns": ColumnsDirective,
    "e-column": ColumnDirective
  },
  data() {
    return {
      isLoading: true,
      error: '',
      dataManager: new DataManager({
        url: 'https://services.syncfusion.com/vue/production/api/Orders',
        adaptor: new UrlAdaptor()
      })
    }
  },
  methods: {
    onDataBound() {
      this.isLoading = false
      this.error = ''
    },
    onActionFailure(args) {
      this.isLoading = false
      this.error = args?.error?.message || 'Failed to load data'
    }
  }
}
</script>
```

## ODataV4Adaptor Integration

Use ODataV4Adaptor for OData service compatibility:

```vue
<template>
  <ejs-querybuilder width="100%" :dataSource="dataManager">
    <e-columns>
      <e-column field='OrderID' label='Order ID' type='number' />
      <e-column field='CustomerID' label='Customer ID' type='string' />
      <e-column field='Freight' label='Freight' type='number' format='C2' />
      <e-column field='OrderDate' label='Order Date' type='date' format='dd/MM/yyyy' />
    </e-columns>
  </ejs-querybuilder>
</template>

<script>
import { QueryBuilderComponent, ColumnsDirective, ColumnDirective } from '@syncfusion/ej2-vue-querybuilder'
import { DataManager, ODataV4Adaptor } from '@syncfusion/ej2-data'

export default {
  name: "App",
  components: {
    "ejs-querybuilder": QueryBuilderComponent,
    "e-columns": ColumnsDirective,
    "e-column": ColumnDirective
  },
  data() {
    return {
      dataManager: new DataManager({
        url: 'https://services.odata.org/V4/Northwind/Northwind.svc/Orders',
        adaptor: new ODataV4Adaptor()
      })
    }
  }
}
</script>
```

## Dynamic Data Updates

Use watchers to reactively update the Query Builder when data changes:

```vue
<template>
  <div>
    <div class="controls">
      <button @click="refreshData">Refresh Data</button>
      <select v-model="selectedCountry">
        <option value="">All Countries</option>
        <option value="USA">USA</option>
        <option value="UK">UK</option>
        <option value="Canada">Canada</option>
      </select>
    </div>
    <ejs-querybuilder width="100%" :dataSource="filteredData">
      <e-columns>
        <e-column field='EmployeeID' label='Employee ID' type='number' />
        <e-column field='FirstName' label='First Name' type='string' />
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
      allData: [],
      selectedCountry: ''
    }
  },
  computed: {
    filteredData() {
      if (!this.selectedCountry) {
        return this.allData
      }
      return this.allData.filter(emp => emp.Country === this.selectedCountry)
    }
  },
  mounted() {
    this.loadData()
  },
  methods: {
    async loadData() {
      try {
        const response = await fetch('/api/employees')
        this.allData = await response.json()
      } catch (error) {
        console.error('Failed to load data:', error)
      }
    },
    async refreshData() {
      await this.loadData()
      console.log('Data refreshed')
    }
  }
}
</script>

<style>
.controls {
  margin-bottom: 20px;
  display: flex;
  gap: 10px;
}

button, select {
  padding: 8px 16px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
}
</style>
```

## DataManager Query Integration

Use DataManager with Query to create advanced filtering:

```vue
<template>
  <div>
    <button @click="applyFilter">Apply Filter</button>
    <ejs-querybuilder
      ref="qbRef"
      width="100%"
      :dataSource="localData"
      @change="handleChange"
    >
      <e-columns>
        <e-column field='EmployeeID' label='Employee ID' type='number' />
        <e-column field='FirstName' label='First Name' type='string' />
        <e-column field='Title' label='Title' type='string' />
        <e-column field='Salary' label='Salary' type='number' format='C2' />
      </e-columns>
    </ejs-querybuilder>
    <div v-if="filteredResults.length > 0" class="results">
      <h3>Filtered Results ({{ filteredResults.length }} records)</h3>
      <ul>
        <li v-for="item in filteredResults" :key="item.EmployeeID">
          {{ item.FirstName }} - {{ item.Title }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { QueryBuilderComponent, ColumnsDirective, ColumnDirective } from '@syncfusion/ej2-vue-querybuilder'
import { DataManager, Query } from '@syncfusion/ej2-data'

export default {
  name: "App",
  components: {
    "ejs-querybuilder": QueryBuilderComponent,
    "e-columns": ColumnsDirective,
    "e-column": ColumnDirective
  },
  data() {
    return {
      filteredResults: [],
      localData: [
        { EmployeeID: 1001, FirstName: 'Nancy', Title: 'Sales Manager', Salary: 60000 },
        { EmployeeID: 1002, FirstName: 'Andrew', Title: 'Vice President', Salary: 95000 },
        { EmployeeID: 1003, FirstName: 'Janet', Title: 'Sales Rep', Salary: 45000 },
        { EmployeeID: 1004, FirstName: 'Margaret', Title: 'Sales Coordinator', Salary: 35000 }
      ]
    }
  },
  methods: {
    applyFilter() {
      if (this.$refs.qbRef) {
        const predicate = this.$refs.qbRef.getPredicate()
        if (predicate) {
          const dataManager = new DataManager(this.localData)
          const query = new Query().where(predicate)
          this.filteredResults = dataManager.executeLocal(query)
        } else {
          this.filteredResults = this.localData
        }
      }
    },
    handleChange() {
      console.log('Query changed')
      this.applyFilter()
    }
  }
}
</script>

<style>
.results {
  margin-top: 20px;
  padding: 15px;
  background-color: #f8f9fa;
  border: 1px solid #dee2e6;
  border-radius: 4px;
}

ul {
  list-style: none;
  padding: 0;
}

li {
  padding: 8px 0;
  border-bottom: 1px solid #dee2e6;
}
</style>
```

## Handling Data Source Changes

Update the Query Builder when data source changes:

```vue
<template>
  <div>
    <div class="controls">
      <label>
        Data Source:
        <select v-model="dataSourceType" @change="changeDataSource">
          <option value="local">Local Data</option>
          <option value="remote">Remote Data</option>
        </select>
      </label>
    </div>
    <ejs-querybuilder
      v-if="columns.length > 0"
      width="100%"
      :dataSource="currentDataSource"
    >
      <e-columns>
        <e-column 
          v-for="col in columns" 
          :key="col.field"
          :field="col.field"
          :label="col.label"
          :type="col.type"
        />
      </e-columns>
    </ejs-querybuilder>
  </div>
</template>

<script>
import { QueryBuilderComponent, ColumnsDirective, ColumnDirective } from '@syncfusion/ej2-vue-querybuilder'
import { DataManager, UrlAdaptor } from '@syncfusion/ej2-data'

export default {
  name: "App",
  components: {
    "ejs-querybuilder": QueryBuilderComponent,
    "e-columns": ColumnsDirective,
    "e-column": ColumnDirective
  },
  data() {
    return {
      dataSourceType: 'local',
      localDataSource: [
        { EmployeeID: 1001, FirstName: 'Nancy', Country: 'USA' },
        { EmployeeID: 1002, FirstName: 'Andrew', Country: 'USA' }
      ],
      remoteDataSource: new DataManager({
        url: 'https://services.syncfusion.com/vue/production/api/Orders',
        adaptor: new UrlAdaptor()
      }),
      localColumns: [
        { field: 'EmployeeID', label: 'Employee ID', type: 'number' },
        { field: 'FirstName', label: 'First Name', type: 'string' },
        { field: 'Country', label: 'Country', type: 'string' }
      ],
      remoteColumns: [
        { field: 'OrderID', label: 'Order ID', type: 'number' },
        { field: 'CustomerName', label: 'Customer Name', type: 'string' },
        { field: 'TotalAmount', label: 'Total Amount', type: 'number' }
      ]
    }
  },
  computed: {
    columns() {
      return this.dataSourceType === 'local' ? this.localColumns : this.remoteColumns
    },
    currentDataSource() {
      return this.dataSourceType === 'local' ? this.localDataSource : this.remoteDataSource
    }
  },
  methods: {
    changeDataSource() {
      console.log('Data source changed to:', this.dataSourceType)
    }
  }
}
</script>

<style>
.controls {
  margin-bottom: 20px;
}

label {
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 500;
}

select {
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
}
</style>
```

This section covers all data binding scenarios in Vue 3 with proper reactive patterns and error handling.
