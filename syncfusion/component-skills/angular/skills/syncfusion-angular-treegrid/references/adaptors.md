# Data Adaptors in Angular TreeGrid

## Table of Contents
- [When to Use This Skill](#when-to-use-this-skill)
- [Critical: childMapping Property](#critical-childmapping-property)
- [URL Adaptor](#url-adaptor)
- [ODataV4 Adaptor](#odatav4-adaptor)
- [WebAPI Adaptor](#webapi-adaptor)
- [Custom Adaptor](#custom-adaptor)
- [RemoteSave Adaptor](#remotesave-adaptor)
- [Error Handling](#error-handling)

## When to Use This Skill

Use this skill when you need to:
- **Connect to REST APIs with hierarchical data** — Configure TreeGrid to fetch parent-child relationships from REST APIs
- **Integrate with OData services** — Use ODataV4 adaptor for OData-compliant APIs returning tree-structured data
- **WebAPI integration** — Connect to .NET WebAPI endpoints with hierarchical data support
- **Custom backend protocols** — Build custom adaptors for proprietary hierarchical data systems
- **Server-side operations** — Offload filtering, sorting, paging, and expansion to the server
- **Error handling** — Implement robust error handling for TreeGrid data operations
- **Cross-domain requests** — Configure CORS and cross-domain data fetching with hierarchical data

## Critical: childMapping Property

⚠️ **MANDATORY FOR TREEGRID**: TreeGrid requires the `childMapping` property to establish parent-child relationships.

```typescript
<ejs-treegrid [dataSource]="dataManager" 
              childMapping="subtasks">
  <e-columns>
    <!-- columns -->
  </e-columns>
</ejs-treegrid>
```

The `childMapping` property specifies which field in your data contains the child items array:

```typescript
// Data structure
{
  taskID: 1,
  taskName: 'Project Planning',
  subtasks: [           // <-- This field is specified in childMapping
    {
      taskID: 2,
      taskName: 'Define requirements',
      subtasks: []
    }
  ]
}
```

**Key Points:**
- `childMapping` must match the property name in your data exactly (case-sensitive)
- If omitted, TreeGrid will treat data as flat (no hierarchy)
- The property can be renamed: `childMapping="children"`, `childMapping="sub"`, etc.
- All level objects must have the same childMapping property name

## URL Adaptor

Simplest adaptor for REST APIs with standard HTTP GET/POST requests returning hierarchical data.

### Setup

```typescript
import { Component } from '@angular/core';
import { DataManager, UrlAdaptor } from '@syncfusion/ej2-data';

@Component({
  selector: 'app-url-adaptor-treegrid',
  template: `<ejs-treegrid [dataSource]="dataManager" 
                          childMapping="subtasks">
    <e-columns>
      <!-- columns -->
    </e-columns>
  </ejs-treegrid>`
})
export class UrlAdaptorTreeGridComponent {
  public dataManager = new DataManager({
    url: 'url',
    adaptor: new UrlAdaptor(),
    crossDomain: true
  });
}
```

### Server Expectations

The server expects:
- GET request for reading data
- Query parameters: `$skip`, `$top`, `$orderby`, `$filter`

Example URL:
```
GET url?$skip=0&$top=12&$orderby=taskID%20desc&$filter=priority%20gt%202
```

### Server Response Format (Hierarchical)

```json
{
  "d": [
    {
      "taskID": 1,
      "taskName": "Project Planning",
      "duration": 5,
      "progress": 85,
      "subtasks": [
        {
          "taskID": 2,
          "taskName": "Define requirements",
          "duration": 2,
          "progress": 90,
          "subtasks": []
        }
      ]
    }
  ],
  "__count": 5
}
```

Or with array response:
```json
[
  {
    "taskID": 1,
    "taskName": "Project Planning",
    "duration": 5,
    "subtasks": [
      {
        "taskID": 2,
        "taskName": "Gather requirements",
        "duration": 2,
        "subtasks": []
      }
    ]
  }
]
```

### Example Implementation

```typescript
import { Component } from '@angular/core';
import { DataManager, UrlAdaptor } from '@syncfusion/ej2-data';

@Component({
  selector: 'app-treegrid',
  template: `
    <ejs-treegrid [dataSource]="dataManager"
                  childMapping="subtasks"
                  [allowPaging]="true" 
                  [allowSorting]="true" 
                  [allowFiltering]="true">
      <e-inject [services]="[Page, Sort, Filter, Edit]"></e-inject>
    </ejs-treegrid>
  `
})
export class UrlAdaptorTreeGridComponent {
  public dataManager = new DataManager({
    url: 'url',
    adaptor: new UrlAdaptor(),
    crossDomain: true
  });
}
```

**Important Note:** Ensure your backend API returns data with the exact `subtasks` property name (or whatever you specify in `childMapping`).

---

## ODataV4 Adaptor

Specialized for OData v4 protocol. Provides advanced filtering, sorting, and server-side operations with hierarchical data support.

### Setup

```typescript
import { Component } from '@angular/core';
import { DataManager, ODataV4Adaptor } from '@syncfusion/ej2-data';

@Component({
  selector: 'app-treegrid',
  template: `<ejs-treegrid [dataSource]="dataManager"
                          childMapping="subtasks">
    <e-columns>
      <!-- columns -->
    </e-columns>
  </ejs-treegrid>`
})
export class ODataV4TreeGridComponent {
  public dataManager = new DataManager({
    url: 'url',
    adaptor: new ODataV4Adaptor(),
    pageSize: 12
  });
}
```

### Benefits

- **Advanced Filtering**: Complex filter expressions across hierarchy
- **Selective Loading**: Only required columns via $select
- **Server-Side Aggregates**: Count, sum, average on server
- **Relationship Navigation**: Access related entities via $expand

### Query Parameters

```
$select     - Select specific columns
$filter     - Complex filter expressions  
$orderby    - Sort by one or more fields
$skip       - Skip N records (pagination)
$top        - Return N records
$count      - Include total count
$expand     - Include related data (child records)
```

## WebAPI Adaptor

For ASP.NET Web API services using RESTful conventions with hierarchical data.

### Setup

```typescript
import { Component } from '@angular/core';
import { DataManager, WebApiAdaptor } from '@syncfusion/ej2-data';
import { TreeGridComponent, Inject, Edit, Toolbar, Page, EditSettingsModel, ToolbarItems } from '@syncfusion/ej2-angular-treegrid';

@Component({
  selector: 'app-treegrid-crud',
  template: `
    <ejs-treegrid #treegrid
                  [dataSource]="dataManager"
                  childMapping="subtasks"
                  [editSettings]="editSettings"
                  [toolbar]="toolbar"
                  (actionFailure)="onActionFailure($event)">
      <e-columns>
        <e-column field="taskID" headerText="Task ID" width="90" [isPrimaryKey]="true"></e-column>
        <e-column field="taskName" headerText="Task Name" width="180"></e-column>
        <e-column field="duration" headerText="Duration" width="100"></e-column>
        <e-column field="progress" headerText="Progress" width="100"></e-column>
      </e-columns>
      <e-inject [services]="[Edit, Toolbar, Page]"></e-inject>
    </ejs-treegrid>
  `
})
export class WebApiCrudTreeGridComponent {
  @ViewChild('treegrid') treeGridInstance: TreeGridComponent;
  
  public dataManager = new DataManager({
    url: 'url',
    adaptor: new WebApiAdaptor(),
    insertUrl: 'url/insert',
    updateUrl: 'url/update',
    removeUrl: 'url/remove'
  });

  public editSettings: EditSettingsModel = {
    allowEditing: true,
    allowAdding: true,
    allowDeleting: true,
    mode: 'Dialog'
  };

  public toolbar: ToolbarItems[] = ['Add', 'Edit', 'Delete', 'Update', 'Cancel'];

  onActionFailure(args: any) {
    console.error('TreeGrid Error:', args);
  }
}
```

**Important Notes:**
- Ensure the `Subtasks` property in your C# Task class matches the `childMapping` value ("subtasks")
- Include [isPrimaryKey] on the ID column for proper CRUD operations
- Handle cascade delete if child records should be removed with parent

---

## Custom Adaptor

For non-standard backend implementations or specialized hierarchical data processing.

### Creating a Custom Adaptor for Hierarchical Data

```typescript
import { DataManager, Adaptor, Query } from '@syncfusion/ej2-data';

class CustomTreeAdaptor extends Adaptor {
  processQuery(dm, query, hierarchyIndex) {
    // Custom query processing for tree data
    const req = this.baseUrl;
    const filter = query.params.filter || '';
    const sort = query.params.sort || '';
    const page = query.params.pageIndex || 1;
    const pageSize = query.params.pageSize || 12;
    const expandIds = query.params.expandIds || []; // For lazy loading children

    return {
      type: 'GET',
      url: `${req}?filter=${filter}&sort=${sort}&page=${page}&pageSize=${pageSize}&expandIds=${expandIds.join(',')}`
    };
  }

  processResponse(data, dm, query, xhr, request, key) {
    // Process response to hierarchical format
    if (data.result) {
      return { 
        result: this.buildHierarchy(data.result), 
        count: data.totalCount 
      };
    }
    return data;
  }

  buildHierarchy(flatData) {
    // Convert flat data to hierarchical using parent-child IDs
    const map = new Map();
    const roots = [];

    // First pass: create map of all items
    flatData.forEach(item => {
      map.set(item.id, { ...item, subtasks: [] });
    });

    // Second pass: build hierarchy
    flatData.forEach(item => {
      if (item.parentId) {
        const parent = map.get(item.parentId);
        if (parent) {
          parent.subtasks.push(map.get(item.id));
        }
      } else {
        roots.push(map.get(item.id));
      }
    });

    return roots;
  }

  insert(dm, value, tableName, key) {
    return {
      type: 'POST',
      url: dm.insertUrl || dm.baseUrl,
      data: JSON.stringify(value),
      contentType: 'application/json'
    };
  }

  update(dm, keyField, value, tableName, key) {
    return {
      type: 'PUT',
      url: `${dm.updateUrl || dm.baseUrl}/${value[keyField]}`,
      data: JSON.stringify(value),
      contentType: 'application/json'
    };
  }

  remove(dm, keyField, value, tableName, key) {
    return {
      type: 'DELETE',
      url: `${dm.removeUrl || dm.baseUrl}/${value[keyField]}`
    };
  }
}

const data = new DataManager({
  url: 'url',
  adaptor: new CustomTreeAdaptor()
});
```

## RemoteSave Adaptor

Specialized for batch CRUD operations (multiple insert/update/delete in single request) with hierarchical data.

### Setup

```typescript
import { DataManager, RemoteSaveAdaptor } from '@syncfusion/ej2-data';
import { TreeGridComponent, Inject, Edit, Toolbar } from '@syncfusion/ej2-angular-treegrid';

const data = new DataManager({
  url: 'url',
  adaptor: new RemoteSaveAdaptor(),
  batchUrl: 'url/batch'
});

export class BatchTreeGridComponent implements OnInit {
  @ViewChild('treegrid') treeGridInstance: TreeGridComponent;
  data = dataManager;
  editSettings: any = { 
    allowEditing: true, 
    allowAdding: true, 
    allowDeleting: true, 
    mode: 'Batch' 
  };
  toolbar: string[] = ['Add', 'Edit', 'Delete', 'Update', 'Cancel'];
}

<ejs-treegrid [dataSource]="data"
              childMapping="subtasks"
              [editSettings]="editSettings" 
              [toolbar]="toolbar">
  <e-columns>
    <!-- columns -->
  </e-columns>
  <e-inject [services]="[Edit, Toolbar]"></e-inject>
</ejs-treegrid>
```

## Error Handling

### Global Error Handler for TreeGrid

```typescript
import { Component, ViewChild } from '@angular/core';
import { DataManager, UrlAdaptor } from '@syncfusion/ej2-data';
import { TreeGridComponent } from '@syncfusion/ej2-angular-treegrid';

const data = new DataManager({
  url: 'url',
  adaptor: new UrlAdaptor()
});

@Component({
  selector: 'app-treegrid-error',
  template: `
    <ejs-treegrid #treegrid
                  [dataSource]="data"
                  childMapping="subtasks"
                  (actionFailure)="onActionFailure($event)">
      <e-columns>
        <!-- columns -->
      </e-columns>
    </ejs-treegrid>
  `
})
export class ErrorHandlingTreeGridComponent {
  @ViewChild('treegrid') treeGridInstance: TreeGridComponent;
  data = data;

  onActionFailure(args: any) {
    console.error('TreeGrid Error:', args);
  }
}
```
