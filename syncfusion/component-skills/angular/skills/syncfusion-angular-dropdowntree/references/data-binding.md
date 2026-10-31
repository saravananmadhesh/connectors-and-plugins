# Data Binding in Angular Dropdown Tree

## Table of Contents
- [Overview](#overview)
- [Local Data Binding](#local-data-binding)
  - [Hierarchical Data Structure](#hierarchical-data-structure)
  - [Self-Referential Data Structure](#self-referential-data-structure)
- [Remote Data Binding](#remote-data-binding)
  - [DataManager Setup](#datamanager-setup)
  - [OData and ODataV4 Adaptors](#odata-and-odatav4-adaptors)
  - [WebAPI Adaptor](#webapi-adaptor)
- [Field Mapping](#field-mapping)
- [Code Examples](#code-examples)

## Overview

The Dropdown Tree supports flexible data binding from multiple sources: local arrays, hierarchical structures, self-referential data, and remote services. Data binding is configured through the `fields` property and the `dataSource` property, which determines the data source type and field mappings.

The component automatically handles hierarchical relationships and can optimize performance through lazy loading with `loadOnDemand` for remote data.

## Local Data Binding

### Hierarchical Data Structure

Hierarchical data contains nested arrays of JSON objects representing parent-child relationships through nesting. The actual field names vary (e.g., `nodeChild`, `countries`, `children`) depending on your data structure:

```typescript
import { Component } from '@angular/core';
import { DropDownTreeModule } from '@syncfusion/ej2-angular-dropdowns';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-hierarchical-data',
  template: `<ejs-dropdowntree id='dropdownTree' 
                [fields]='fields'
                placeholder='Select continent and country'></ejs-dropdowntree>`,
  standalone: true,
  imports: [DropDownTreeModule, FormsModule, ReactiveFormsModule]
})
export class HierarchicalDataComponent {
  public data = [
    {
      code: 'AF', name: 'Africa', countries: [
        { code: 'NGA', name: 'Nigeria' },
        { code: 'EGY', name: 'Egypt' },
        { code: 'ZAF', name: 'South Africa' }
      ]
    },
    {
      code: 'AS', name: 'Asia', expanded: true, countries: [
        { code: 'CHN', name: 'China' },
        { code: 'IND', name: 'India', selected: true },
        { code: 'JPN', name: 'Japan' }
      ]
    },
    {
      code: 'EU', name: 'Europe', countries: [
        { code: 'DNK', name: 'Denmark' },
        { code: 'FIN', name: 'Finland' },
        { code: 'AUT', name: 'Austria' }
      ]
    },
    {
      code: 'NA', name: 'North America', countries: [
        { code: 'USA', name: 'United States of America' },
        { code: 'CUB', name: 'Cuba' },
        { code: 'MEX', name: 'Mexico' }
      ]
    },
    {
      code: 'SA', name: 'South America', countries: [
        { code: 'BRA', name: 'Brazil' },
        { code: 'COL', name: 'Colombia' },
        { code: 'ARG', name: 'Argentina' }
      ]
    }
  ];

  // Map: value → code, text → name, child → countries
  public fields = {
    dataSource: this.data,
    value: 'code',
    text: 'name',
    child: 'countries'
  };
}
```

**When to use:** Use hierarchical data when you have naturally nested structures like:
- Categories with subcategories
- Departments with subdivisions
- Continents with countries (as shown above)
- Parent folders with subfolders

**Key properties:**
- `value`: Unique identifier for each node
- `text`: Display name for each node
- `child`: Array property containing child items
- `expanded`: Optional—set to true to expand by default
- `selected`: Optional—set to true to pre-select item

### Self-Referential Data Structure

Self-referential data contains a flat array where parent-child relationships are defined through reference fields:

```typescript
import { Component } from '@angular/core';
import { DropDownTreeModule } from '@syncfusion/ej2-angular-dropdowns';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-self-referential',
  template: `<ejs-dropdowntree id='dropdownTree' 
                [fields]='fields'
                placeholder='Select a category'></ejs-dropdowntree>`,
  standalone: true,
  imports: [DropDownTreeModule, FormsModule, ReactiveFormsModule]
})
export class SelfReferentialComponent {
  public data = [
    { id: 1, name: 'Discover Music', hasChild: true, expanded: true },
    { id: 2, pid: 1, name: 'Hot Singles' },
    { id: 3, pid: 1, name: 'Rising Artists' },
    { id: 4, pid: 1, name: 'Live Music' },
    { id: 6, pid: 1, name: 'Best of 2017 So Far' },
    { id: 7, name: 'Sales and Events', hasChild: true },
    { id: 8, pid: 7, name: '100 Albums - $5 Each' },
    { id: 9, pid: 7, name: 'Hip-Hop and R&B Sale' },
    { id: 10, pid: 7, name: 'CD Deals' },
    { id: 11, name: 'Categories', hasChild: true },
    { id: 12, pid: 11, name: 'Songs' },
    { id: 13, pid: 11, name: 'Bestselling Albums' },
    { id: 14, pid: 11, name: 'New Releases' },
    { id: 15, pid: 11, name: 'Bestselling Songs' }
  ];

  // Map: value → id, parentValue → pid (flat structure)
  // Root items have pid undefined (not assigned) or handled by component
  public fields = {
    dataSource: this.data,
    value: 'id',
    text: 'name',
    parentValue: 'pid',
    hasChildren: 'hasChild'
  };
}
```

**When to use:** Self-referential data is better for:
- Database-sourced hierarchies (easier to flatten from queries)
- Dynamic tree structures (easier to manipulate flat arrays)
- Complex hierarchies (avoids deeply nested objects)
- API responses that return flat arrays

**Key properties:**
- `value`: Unique identifier for each node
- `text`: Display name for each node
- `parentValue`: Parent node's ID (null for root items)
- `hasChildren`: Boolean indicating if node has children (for UI optimization)

**Root level items:** Set `parentValue` to null or omit the field entirely for items without parents.

## Remote Data Binding

### DataManager Setup

Remote data binding fetches hierarchical data from web services using `DataManager`. This is essential for large datasets, reducing initial load and bandwidth consumption:

```typescript
import { Component } from '@angular/core';
import { DropDownTreeModule } from '@syncfusion/ej2-angular-dropdowns';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataManager, ODataV4Adaptor, Query } from '@syncfusion/ej2-data';

@Component({
  selector: 'app-remote-data',
  template: `<ejs-dropdowntree id='dropdownTree' [fields]='fields'></ejs-dropdowntree>`,
  standalone: true,
  imports: [DropDownTreeModule, FormsModule, ReactiveFormsModule]
})
export class RemoteDataComponent {
  // DataManager with remote service endpoint
  public data = new DataManager({
    url: 'url',
    adaptor: new ODataV4Adaptor,
    crossDomain: true
  });

  // First level: Employees
  public query = new Query()
    .from('Employees')
    .select('EmployeeID,FirstName,Title')
    .take(5);

  // Second level: Orders related to each employee
  public query1 = new Query()
    .from('Orders')
    .select('OrderID,EmployeeID,ShipName')
    .take(5);

  // Field mapping with nested queries
  public fields = {
    dataSource: this.data,
    query: this.query,
    value: 'EmployeeID',
    text: 'FirstName',
    hasChildren: 'EmployeeID',
    child: {
      dataSource: this.data,
      query: this.query1,
      value: 'OrderID',
      parentValue: 'EmployeeID',
      text: 'ShipName'
    }
  };
}
```

**When to use:** Remote binding is appropriate for:
- Large hierarchical datasets (100+ items)
- Data requiring authentication
- Real-time data updates
- Server-side filtering and searching

### OData and ODataV4 Adaptors

**ODataAdaptor** (default for DataManager):
```typescript
const data = new DataManager({
  url: 'url',
  adaptor: new ODataAdaptor,
  crossDomain: true
});
```

**ODataV4Adaptor** (modern OData standard):
```typescript
const data = new DataManager({
  url: 'url',
  adaptor: new ODataV4Adaptor,
  crossDomain: true
});
```

Use ODataV4 for new projects; it's the current standard with better filtering and query support.

### WebAPI Adaptor

For RESTful Web APIs following OData conventions:

```typescript
import { DataManager, WebApiAdaptor } from '@syncfusion/ej2-data';

const data = new DataManager({
  url: 'url',
  adaptor: new WebApiAdaptor,
  crossDomain: true
});
```

## Field Mapping

Field mapping defines how component properties bind to data properties. Required fields depend on data type:

### Local Hierarchical Data
```typescript
fields: {
  dataSource: localArray,
  value: 'id',           // Unique identifier
  text: 'name',          // Display text
  child: 'children'      // Array of child items
}
```

### Local Self-Referential Data
```typescript
fields: {
  dataSource: flatArray,
  value: 'id',           // Unique identifier
  text: 'name',          // Display text
  parentValue: 'pid',    // Parent ID reference
  hasChildren: 'hasChild' // Boolean or count
}
```

### Remote Data with Query
```typescript
fields: {
  dataSource: new DataManager({ url: '...' }),
  query: new Query().from('Table').select('...'),
  value: 'id',
  text: 'name',
  hasChildren: 'id', // or boolean field name
  child: {
    dataSource: new DataManager({ url: '...' }),
    query: new Query().from('ChildTable'),
    value: 'childId',
    parentValue: 'parentId',
    text: 'childName'
  }
}
```

**Optional fields:**
- `expanded`: Pre-expand nodes
- `selected`: Pre-select items
- `imageUrl`: Icon/avatar for items
- `tooltip`: Hover text for items

Choose the data binding approach based on data source (local vs. remote), structure (hierarchical vs. flat), and dataset size.
