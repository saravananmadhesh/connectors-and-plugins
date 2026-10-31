# Data Binding in Syncfusion Angular ListView

## Table of Contents
- [Field Configuration](#field-configuration)
- [Local Data Binding](#local-data-binding)
- [Remote Data Binding](#remote-data-binding)
- [Dynamic Data Updates](#dynamic-data-updates)

---

## Field Configuration

The `fields` property maps your data object properties to ListView features. Below are all available field mappings:

| Field | Type | Description |
|-------|------|-------------|
| `text` | string | Primary display text (required) |
| `id` | string | Unique identifier for list items |
| `isChecked` | string | Boolean field for checkbox state |
| `isVisible` | string | Boolean field for visibility (hidden items still in DOM) |
| `enabled` | string | Boolean field for item enabled/disabled state |
| `iconCss` | string | CSS class for icons before item text |
| `child` | string | Field containing child data for nested lists |
| `tooltip` | string | Text displayed on item hover |
| `groupBy` | string | Field used for grouping items by category |
| `sortBy` | string | Field used for sorting |
| `htmlAttributes` | string | HTML attributes as key-value pairs |

**Example field configuration:**
```typescript
public fields: Object = {
  text: 'productName',
  id: 'productId',
  iconCss: 'icon',
  groupBy: 'category',
  isChecked: 'selected',
  tooltip: 'description'
};
```

---

## Local Data Binding

### Simple Array of Strings

**Use when displaying simple text items (tags, categories, menus):**

```typescript
import { ListViewModule } from '@syncfusion/ej2-angular-lists';
import { Component } from '@angular/core';

@Component({
  imports: [ListViewModule],
  standalone: true,
  selector: 'app-root',
  template: `<ejs-listview [dataSource]='data'></ejs-listview>`
})
export class AppComponent {
  public data: string[] = [
    'Artwork',
    'Abstract',
    'Modern Painting',
    'Ceramics',
    'Animation Art',
    'Oil Painting'
  ];
}
```

**Use when:**
- Creating simple lists (tags, labels, categories)
- No additional properties needed per item
- Display value equals data value

---

### Array of JSON Objects

**Use when displaying complex data with multiple properties:**

```typescript
import { ListViewModule } from '@syncfusion/ej2-angular-lists';
import { Component } from '@angular/core';

@Component({
  imports: [ListViewModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <ejs-listview 
      [dataSource]='data' 
      [fields]='fields'
      [showHeader]='true'
      [headerTitle]='headerTitle'>
    </ejs-listview>
  `
})
export class AppComponent {
  public data: Object[] = [
    { 'Name': 'Display', 'id': 'list-01' },
    { 'Name': 'Notification', 'id': 'list-02' },
    { 'Name': 'Sound', 'id': 'list-03' },
    { 'Name': 'Apps', 'id': 'list-04' },
    { 'Name': 'Storage', 'id': 'list-05' },
    { 'Name': 'Battery', 'id': 'list-06' }
  ];

  public fields: Object = { 
    text: 'Name',      // Display the 'Name' property
    id: 'id',          // Use 'id' as unique identifier
    tooltip: 'Name'    // Show 'Name' on hover
  };

  public headerTitle: string = 'Device Settings';
}
```

**Use when:**
- Each item has multiple properties
- Need unique IDs for selection/events
- Want to display select properties in template

---

### JSON with Nested Properties and Multiple Fields

**Use for complex data structures with grouping and icons:**

```typescript
import { ListViewModule } from '@syncfusion/ej2-angular-lists';
import { Component } from '@angular/core';

@Component({
  imports: [ListViewModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <ejs-listview 
      [dataSource]='employeeData' 
      [fields]='fields'
      [showHeader]='true'
      [headerTitle]='headerTitle'>
    </ejs-listview>
  `
})
export class AppComponent {
  public employeeData: Object[] = [
    {
      'EmployeeID': 1,
      'FirstName': 'Nancy',
      'LastName': 'Davolio',
      'Department': 'Sales',
      'icon': 'e-icons e-people'
    },
    {
      'EmployeeID': 2,
      'FirstName': 'Andrew',
      'LastName': 'Fuller',
      'Department': 'Sales',
      'icon': 'e-icons e-people'
    },
    {
      'EmployeeID': 3,
      'FirstName': 'Janet',
      'LastName': 'Leverling',
      'Department': 'IT',
      'icon': 'e-icons e-people'
    }
  ];

  // Map multiple properties for display and interaction
  public fields: Object = {
    text: 'FirstName',           // Display first name
    id: 'EmployeeID',            // Use employee ID
    iconCss: 'icon',             // Add icon
    groupBy: 'Department',       // Group by department
    tooltip: 'FirstName'         // Show tooltip on hover
  };

  public headerTitle: string = 'Employees';
}
```

**Key mapping tips:**
- Use consistent property names across data items
- Always map `id` field for proper identification
- Map `iconCss` to display related icons
- Use `groupBy` to organize items by category

---

## Remote Data Binding

### Using DataManager with OData v4 API

**Use when fetching data from a remote server:**

```typescript
import { ListViewModule } from '@syncfusion/ej2-angular-lists';
import { Component } from '@angular/core';
import { DataManager, Query, ODataV4Adaptor } from '@syncfusion/ej2-data';

@Component({
  imports: [ListViewModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <ejs-listview 
      [dataSource]='remoteData' 
      [query]='query'
      [fields]='fields'
      [showHeader]='true'
      [headerTitle]='headerTitle'>
    </ejs-listview>
  `
})
export class AppComponent {
  // DataManager configured for OData v4 service
  public remoteData: Object = new DataManager({
    url: 'https://services.syncfusion.com/angular/production/api/',
    crossDomain: true,
    adaptor: new ODataV4Adaptor()
  });

  // Query to fetch specific columns and limit results
  public query: Query = new Query()
    .from('ListView')
    .select('EmployeeID,FirstName')
    .take(10);

  public fields: Object = { 
    id: 'EmployeeID',
    text: 'FirstName'
  };

  public headerTitle: string = 'Remote Employees';
}
```

**When to use:**
- Data is too large to load locally
- Data changes frequently on server
- Need to paginate or filter large datasets
- Building enterprise applications

**DataManager Adaptors:**
- `ODataV4Adaptor` - OData v4 services
- `ODataAdaptor` - OData v2 services
- `WebApiAdaptor` - ASP.NET Web API
- `UrlAdaptor` - Generic HTTP endpoints

---

### Fetching from REST API

**Simple REST API integration:**

```typescript
import { ListViewModule } from '@syncfusion/ej2-angular-lists';
import { Component } from '@angular/core';
import { DataManager, UrlAdaptor, Query } from '@syncfusion/ej2-data';

@Component({
  imports: [ListViewModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <ejs-listview 
      [dataSource]='restApiData' 
      [fields]='fields'>
    </ejs-listview>
  `
})
export class AppComponent {
  // DataManager for REST API endpoint
  public restApiData: DataManager = new DataManager({
    url: 'https://api.example.com/products',
    adaptor: new UrlAdaptor(),
    crossDomain: true
  });

  public fields: Object = {
    id: 'product_id',
    text: 'product_name'
  };
}
```

---

## Dynamic Data Updates

### Adding Items Dynamically

```typescript
import { ListViewModule } from '@syncfusion/ej2-angular-lists';
import { Component, ViewChild } from '@angular/core';
import { ListViewComponent } from '@syncfusion/ej2-angular-lists';

@Component({
  imports: [ListViewModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <button (click)="addNewItem()">Add Item</button>
    <ejs-listview 
      #listview
      [dataSource]='data'>
    </ejs-listview>
  `
})
export class AppComponent {
  @ViewChild('listview') 
  listViewInstance!: ListViewComponent;

  public data: Object[] = [
    { text: 'Item 1', id: '1' },
    { text: 'Item 2', id: '2' }
  ];

  addNewItem() {
    const newItem = {
      text: 'New Item - ' + Date.now(),
      id: Date.now().toString()
    };
    this.listViewInstance.addItem([newItem]);
  }
}
```

---

### Removing Items Dynamically

```typescript
removeItem(element: HTMLElement) {
  this.listViewInstance.removeItem(element);
}
```

---

### Updating Entire Data Source

```typescript
updateDataSource() {
  this.data = [
    { text: 'Updated Item 1', id: '1' },
    { text: 'Updated Item 2', id: '2' },
    { text: 'Updated Item 3', id: '3' }
  ];
  
  // Refresh ListView to reflect changes
  this.listViewInstance.refresh();
}
```

---

## Field Mapping Best Practices

✅ **Always map the `id` field** for proper item identification  
✅ **Keep property names consistent** across all data items  
✅ **Use meaningful field names** (not 'a', 'b', 'c')  
✅ **Map `tooltip` field** for better UX  
✅ **Use `groupBy`** for organized data presentation  
✅ **Test with empty data** to verify default behavior  
✅ **Validate remote data** before binding  
✅ **Use `Query`** to optimize remote data fetching  

---

## Common Patterns

**Pattern 1: Local + Remote Toggle**
```typescript
useRemote: boolean = false;

get dataSource() {
  return this.useRemote ? this.remoteData : this.localData;
}

toggleDataSource() {
  this.useRemote = !this.useRemote;
}
```

**Pattern 2: Data Refresh on Interval**
```typescript
constructor() {
  setInterval(() => this.refreshData(), 30000);
}

refreshData() {
  this.listViewInstance.refresh();
}
```

**Pattern 3: Filter and Display**
```typescript
filterByCategory(category: string) {
  this.data = this.allData.filter(
    item => item.category === category
  );
}
```

