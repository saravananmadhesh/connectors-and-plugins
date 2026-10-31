# Data Binding in Dropdown Tree

## Table of Contents
- [Overview](#overview)
- [Local Data Binding](#local-data-binding)
- [Remote Data Binding](#remote-data-binding)
- [Load on Demand (Lazy Loading)](#load-on-demand-lazy-loading)
- [Field Mapping](#field-mapping)
- [Data Structure Patterns](#data-structure-patterns)
- [Prevent Node Selection](#prevent-node-selection)

---

## Overview

The Dropdown Tree control displays data from various sources through the `dataSource` property, which is part of the `fields` configuration. The control supports:

- **Local data**: JavaScript arrays of objects
- **Remote data**: OData, OData V4, Web API, URL endpoints, JSON
- **Lazy loading**: Dynamic loading of child items on-demand

The `dataSource` property accepts either a plain JavaScript array or a `DataManager` instance for remote data operations.

---

## Local Data Binding

### Hierarchical Data Structure

For hierarchical data with nested children, define a field that contains the child collection:

```typescript
import { DropDownTree } from '@syncfusion/ej2-dropdowns';

// Hierarchical data with nested arrays
let continents: { [key: string]: Object }[] = [
    {
        code: 'AF',
        name: 'Africa',
        countries: [
            { code: 'NGA', name: 'Nigeria' },
            { code: 'EGY', name: 'Egypt' },
            { code: 'ZAF', name: 'South Africa' }
        ]
    },
    {
        code: 'AS',
        name: 'Asia',
        expanded: true,  // Start expanded
        countries: [
            { code: 'CHN', name: 'China' },
            { code: 'IND', name: 'India', selected: true },
            { code: 'JPN', name: 'Japan' }
        ]
    },
    {
        code: 'EU',
        name: 'Europe',
        countries: [
            { code: 'DNK', name: 'Denmark' },
            { code: 'FIN', name: 'Finland' },
            { code: 'AUT', name: 'Austria' }
        ]
    }
];

let dropDownTree = new DropDownTree({
    fields: {
        dataSource: continents,
        value: 'code',
        text: 'name',
        child: 'countries'  // Field containing child items
    }
});

dropDownTree.appendTo('#ddtElement');
```

**Key Points:**
- Use `child` field to map nested arrays in your data
- Parent items automatically become expandable when they have children
- Set `expanded: true` on parent objects to display them expanded initially
- Set `selected: true` on items to pre-select them

### Self-Referential Data Structure

For self-referential data where children are identified by parent ID reference:

```typescript
import { DropDownTree } from '@syncfusion/ej2-dropdowns';

// Self-referential data - children reference parent by ID
let categories: { [key: string]: Object }[] = [
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

let dropDownTree = new DropDownTree({
    fields: {
        dataSource: categories,
        id: 'id',
        text: 'name',
        value: 'id',
        parentValue: 'pid',      // Field referencing parent ID
        hasChildren: 'hasChild'  // Boolean indicating expandable items
    }
});

dropDownTree.appendTo('#ddtElement');
```

**Key Points:**
- Use `parentValue` to map the parent reference field
- Use `id` to uniquely identify each item
- `hasChildren: true` indicates items have child items
- The control automatically builds the hierarchy from the flat list

---

## Remote Data Binding

### OData Service

Bind data from an OData service endpoint:

```typescript
import { DropDownTree } from '@syncfusion/ej2-dropdowns';
//import data manager related classes
import { Query, DataManager, ODataV4Adaptor } from '@syncfusion/ej2-data';

let data: DataManager = new DataManager({
    url: 'https://services.odata.org/V4/Northwind/Northwind.svc',
    adaptor: new ODataV4Adaptor,
    crossDomain: true,
});
let query: Query = new Query().from('Employees').select('EmployeeID,FirstName,Title').take(5);
let query1: Query = new Query().from('Orders').select('OrderID,EmployeeID,ShipName').take(5);

let DropDownTreeObj: DropDownTree = new DropDownTree({
    fields: {
        dataSource: data, query: query, value: 'EmployeeID', text: 'FirstName', hasChildren: 'EmployeeID', tooltip: 'Title',
        child: { dataSource: data, query: query1, value: 'OrderID', parentValue: 'EmployeeID', text: 'ShipName' }
    }
});
DropDownTreeObj.appendTo('#ddltreeelement');
```

### Web API Service

Connect to a custom Web API endpoint:

```typescript
import { DropDownTree } from '@syncfusion/ej2-dropdowns';
import { DataManager, UrlAdaptor } from '@syncfusion/ej2-data';

let dataManager = new DataManager({
    url: 'https://api.example.com/categories',
    adaptor: new UrlAdaptor()
});

let dropDownTree = new DropDownTree({
    fields: {
        dataSource: dataManager,
        id: 'id',
        text: 'name',
        value: 'id',
        parentValue: 'parentId',
        child: 'children'
    }
});

dropDownTree.appendTo('#ddtElement');
```

### DataManager with Custom Adaptor

For more control over data requests and responses:

```typescript
import { DropDownTree } from '@syncfusion/ej2-dropdowns';
import { DataManager } from '@syncfusion/ej2-data';

let dataManager = new DataManager({
    url: 'https://api.example.com/tree-data',
    crossDomain: true,
    adaptor: new CustomAdaptor()
});

let dropDownTree = new DropDownTree({
    fields: {
        dataSource: dataManager,
        id: 'id',
        text: 'name',
        value: 'id',
        parentValue: 'parentId'
    }
});

dropDownTree.appendTo('#ddtElement');
```

---

## Load on Demand (Lazy Loading)

### Configuration

For large datasets, enable lazy loading to load child items only when parent is expanded:

```typescript
import { DropDownTree } from '@syncfusion/ej2-dropdowns';
import { DataManager } from '@syncfusion/ej2-data';

let dataManager = new DataManager({
    url: 'https://api.example.com/categories',
    adaptor: new UrlAdaptor()
});

let dropDownTree = new DropDownTree({
    fields: {
        dataSource: dataManager,
        id: 'id',
        text: 'name',
        value: 'id',
        parentValue: 'parentId'
    },
    treeSettings: {
        loadOnDemand: true  // Enable lazy loading
    }
});

dropDownTree.appendTo('#ddtElement');
```

### How Lazy Loading Works

1. **Initial Load**: Only first-level items are loaded from the server
2. **On Expand**: When user expands a parent node, a request is sent to fetch children
3. **Request Format**: The server receives the parent ID and should return matching child items
4. **Bandwidth Optimization**: Reduces initial payload for large hierarchies

### Server-Side Implementation

Your API endpoint should accept the parent ID and return corresponding children:

```
GET https://api.example.com/categories?parentId=1
```

Response:
```json
[
    { "id": 2, "parentId": 1, "name": "Category 2", "hasChild": true },
    { "id": 3, "parentId": 1, "name": "Category 3", "hasChild": false }
]
```

### Lazy Loading with Local Data

Local data can also use lazy loading by providing an initial dataset and then expanding dynamically:

```typescript
let initialData = [
    { id: 1, name: 'Category 1', hasChild: true },
    { id: 4, name: 'Category 4', hasChild: true }
];

let dropDownTree = new DropDownTree({
    fields: {
        dataSource: initialData,
        id: 'id',
        text: 'name',
        value: 'id'
    },
    treeSettings: {
        loadOnDemand: true
    }
});

// Handle node expansion and add children dynamically
dropDownTree.nodeExpanding = function(args) {
    if (args.node.hasChild && !args.node.children.length) {
        // Fetch and add children when node expands
    }
};
```

---

## Field Mapping

### Required Fields

At minimum, you must map these fields:

```typescript
fields: {
    dataSource: data,
    value: 'id',        // Item value when selected
    text: 'name'        // Display text in tree
}
```

### Complete Field Mapping

For full control, define all available mappings:

```typescript
fields: {
    dataSource: data,
    id: 'id',                          // Unique identifier
    value: 'itemValue',               // Selection value (if different from id)
    text: 'displayName',              // Display text in tree
    parentValue: 'parentId',          // Parent reference (self-referential)
    child: 'subItems',                // Child collection (hierarchical)
    hasChildren: 'expandable',        // Boolean for expandability
    expanded: 'isExpanded',           // Pre-expanded state
    selected: 'isSelected',           // Pre-selected state
    iconCss: 'icon',                  // CSS class for node icon
    imageUrl: 'imageUrl',             // Image URL for node
    tooltip: 'title',                 // Tooltip text
    htmlAttributes: 'attributes'      // HTML attributes object
}
```

### Field Mapping Examples

**Example 1: Simple mapping (id and name)**
```typescript
fields: {
    dataSource: data,
    value: 'id',
    text: 'name'
}
// Data: { id: 1, name: 'Item 1' }
```

**Example 2: Hierarchical with nested data**
```typescript
fields: {
    dataSource: data,
    value: 'code',
    text: 'name',
    child: 'countries'
}
// Data: { code: 'US', name: 'United States', countries: [...] }
```

**Example 3: Self-referential with complex fields**
```typescript
fields: {
    dataSource: data,
    id: 'empId',
    text: 'empName',
    value: 'empId',
    parentValue: 'reportTo',
    hasChildren: 'isManager',
    iconCss: 'empIcon'
}
// Data: { empId: 1, empName: 'John', reportTo: 0, isManager: true, empIcon: 'manager-icon' }
```

---

## Data Structure Patterns

### Pattern 1: Company Organization Chart

Self-referential structure for employee hierarchies:

```typescript
let employees = [
    { id: 1, name: 'CEO', department: 'Executive', pid: null, hasChild: true },
    { id: 2, name: 'VP Engineering', department: 'Engineering', pid: 1, hasChild: true },
    { id: 3, name: 'VP Sales', department: 'Sales', pid: 1, hasChild: true },
    { id: 4, name: 'Tech Lead', department: 'Engineering', pid: 2, hasChild: true },
    { id: 5, name: 'Senior Dev', department: 'Engineering', pid: 4, hasChild: false },
    { id: 6, name: 'Junior Dev', department: 'Engineering', pid: 4, hasChild: false }
];

let dropDownTree = new DropDownTree({
    fields: {
        dataSource: employees,
        id: 'id',
        text: 'name',
        value: 'id',
        parentValue: 'pid',
        hasChildren: 'hasChild'
    }
});
```

### Pattern 2: Product Categories

Hierarchical structure for e-commerce:

```typescript
let categories = [
    {
        id: 1,
        name: 'Electronics',
        icon: 'icon-electronics',
        subcategories: [
            {
                id: 11,
                name: 'Phones',
                icon: 'icon-phone',
                subcategories: [
                    { id: 111, name: 'Smartphones', icon: 'icon-smartphone' },
                    { id: 112, name: 'Feature Phones', icon: 'icon-featurephone' }
                ]
            },
            {
                id: 12,
                name: 'Laptops',
                icon: 'icon-laptop',
                subcategories: [
                    { id: 121, name: 'Gaming', icon: 'icon-gaming' },
                    { id: 122, name: 'Business', icon: 'icon-business' }
                ]
            }
        ]
    }
];

let dropDownTree = new DropDownTree({
    fields: {
        dataSource: categories,
        id: 'id',
        text: 'name',
        value: 'id',
        child: 'subcategories',
        iconCss: 'icon'
    }
});
```

### Pattern 3: File System Structure

Self-referential pattern for folder/file hierarchies:

```typescript
let fileSystem = [
    { id: '/', name: 'Root', type: 'folder', parent: null, hasChild: true },
    { id: '/documents', name: 'Documents', type: 'folder', parent: '/', hasChild: true },
    { id: '/documents/report.pdf', name: 'report.pdf', type: 'file', parent: '/documents', hasChild: false },
    { id: '/documents/resume.docx', name: 'resume.docx', type: 'file', parent: '/documents', hasChild: false },
    { id: '/downloads', name: 'Downloads', type: 'folder', parent: '/', hasChild: false }
];

let dropDownTree = new DropDownTree({
    fields: {
        dataSource: fileSystem,
        id: 'id',
        text: 'name',
        value: 'id',
        parentValue: 'parent',
        hasChildren: 'hasChild'
    }
});
```

---

## Performance Considerations

### For Large Datasets (1000+ items)

1. **Use Lazy Loading**: Enable `loadOnDemand: true` to reduce initial payload
2. **Remote Data**: Keep data on server and fetch as needed
3. **Pagination**: Implement server-side pagination for first-level items
4. **Indexing**: Ensure parent ID fields are indexed on server for fast lookups

### For Regular Datasets (100-500 items)

1. **Local Data**: Can load all data at once
2. **Self-Referential**: Efficient for flat structure with parent references
3. **Optional Lazy Loading**: Not necessary but can improve perceived performance

### Best Practices

- Flatten deeply nested structures (5+ levels) to self-referential pattern
- Limit initial tree depth to 2-3 levels for local data
- Use `loadOnDemand` for org charts and file systems
- Implement caching on client when data is static
- For remote data, use CDN or edge-cached endpoints

---

## Prevent Node Selection

### Overview

You can prevent the selection of individual tree nodes by using the `selectable` property in your field mapping. When this property is set to `false` on an item, that item cannot be selected, but users can still expand it and interact with its children.

**Use Cases:**
- Disable selection on parent/category nodes to force selection of leaf items only
- Prevent selection of read-only or view-only items
- Create hierarchical structures where only certain levels are selectable

### Implementation

Add the `selectable` property to your data and map it in fields configuration:

```typescript
import { DropDownTree } from '@syncfusion/ej2-dropdowns';

let localData: { [key: string]: Object }[] = [
    { id: 1, name: 'Discover Music', hasChild: true, expanded: true, selectable: false },
    { id: 2, pid: 1, name: 'Hot Singles' },
    { id: 3, pid: 1, name: 'Rising Artists' },
    { id: 4, pid: 1, name: 'Live Music' },
    { id: 6, pid: 1, name: 'Best of 2017 So Far' },
    
    { id: 7, name: 'Sales and Events', hasChild: true, selectable: false },
    { id: 8, pid: 7, name: '100 Albums' },
    { id: 9, pid: 7, name: 'Hip-Hop and R&B Sale' },
    { id: 10, pid: 7, name: 'CD Deals' },
    
    { id: 11, name: 'Categories', hasChild: true, selectable: false },
    { id: 12, pid: 11, name: 'Songs' },
    { id: 13, pid: 11, name: 'Bestselling Albums' },
    { id: 14, pid: 11, name: 'New Releases' },
    { id: 15, pid: 11, name: 'Bestselling Songs' },
    
    { id: 16, name: 'MP3 Albums', hasChild: true, selectable: false },
    { id: 17, pid: 16, name: 'Rock' },
    { id: 18, pid: 16, name: 'Gospel' },
    { id: 19, pid: 16, name: 'Latin Music' },
    { id: 20, pid: 16, name: 'Jazz' },
    
    { id: 21, name: 'More in Music', hasChild: true, selectable: false },
    { id: 22, pid: 21, name: 'Music Trade-In' },
    { id: 23, pid: 21, name: 'Redeem a Gift Card' },
    { id: 24, pid: 21, name: 'Band T-Shirts' }
];

let dropDownTree = new DropDownTree({
    fields: {
        dataSource: localData,
        value: 'id',
        parentValue: 'pid',
        text: 'name',
        hasChildren: 'hasChild',
        selectable: 'selectable'  // Map the selectable property
    }
});

dropDownTree.appendTo('#ddtElement');
```

### Behavior

- **Selectable: true** - Item can be clicked and selected
- **Selectable: false** - Item shows visual disabled state, cannot be selected, but can be expanded
- **Expandable: true** - Item displays expand/collapse icon regardless of selectable value
- **Children accessible** - Disabled parent nodes don't prevent selection of child items

### Dynamic Selectability

Control selectability based on conditions:

```typescript
let data = [
    { id: 1, name: 'Category A', hasChild: true, selectable: true },
    { id: 2, pid: 1, name: 'Item A1', isActive: true, selectable: true },
    { id: 3, pid: 1, name: 'Item A2 (Inactive)', isActive: false, selectable: false },
    { id: 4, name: 'Category B', hasChild: true, selectable: true },
    { id: 5, pid: 4, name: 'Item B1', isActive: true, selectable: true }
];

let dropDownTree = new DropDownTree({
    fields: {
        dataSource: data,
        id: 'id',
        text: 'name',
        value: 'id',
        parentValue: 'pid',
        hasChildren: 'hasChild',
        selectable: 'selectable'
    },
    // Optionally add disabled styling based on isActive
    cssClass: 'custom-selectable'
});

dropDownTree.appendTo('#ddtElement');
```

### Styling Disabled Items

Apply CSS to visually distinguish non-selectable items:

```css
.custom-selectable .e-list-item.e-disable {
    opacity: 0.6;
    pointer-events: none;
    background-color: #f5f5f5;
}

.custom-selectable .e-list-item.e-disable:hover {
    background-color: #f5f5f5;  /* No hover effect for disabled */
}

.custom-selectable .e-list-item.e-disable span {
    color: #999;
}
```

### Common Use Cases

**Use Case 1: Select Only Categories**
```typescript
let categories = [
    { id: 1, name: 'Electronics', selectable: false, hasChild: true },
    { id: 2, pid: 1, name: 'Phones', selectable: true },
    { id: 3, pid: 1, name: 'Laptops', selectable: true }
];
// Force users to select products, not category groups
```

**Use Case 2: Read-Only View Items**
```typescript
let items = [
    { id: 1, name: 'Public Items', selectable: true, hasChild: true },
    { id: 2, pid: 1, name: 'Item 1 (Read-Only)', readOnly: true, selectable: false },
    { id: 3, pid: 1, name: 'Item 2 (Editable)', readOnly: false, selectable: true }
];
// Allow selection only of editable items
```

**Use Case 3: Organizational Hierarchy**
```typescript
let organization = [
    { id: 1, name: 'Engineering Dept', selectable: false, hasChild: true },
    { id: 2, pid: 1, name: 'John Smith', role: 'Lead', selectable: true },
    { id: 3, pid: 1, name: 'Jane Doe', role: 'Developer', selectable: true }
];
// Users select employees, not departments
```
