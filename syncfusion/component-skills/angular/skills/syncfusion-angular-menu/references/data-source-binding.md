# Data Source Binding and Templates

## Table of Contents
- [Overview](#overview)
- [Hierarchical Data Binding](#hierarchical-data-binding)
- [Self-Referential Data](#self-referential-data)
- [Remote Data with DataManager](#remote-data-with-datamanager)
- [Custom Menu Templates](#custom-menu-templates)
- [Field Mapping](#field-mapping)

## Overview

The Menu component supports flexible data binding from multiple sources:
- Hierarchical arrays (nested data structures)
- Self-referential data (with parentId/itemId)
- Remote data (DataManager with ODataV4Adaptor)
- Custom templates (HTML template engine)

## Hierarchical Data Binding

### Basic Hierarchical Structure

Bind the Menu to a hierarchical data source by assigning it to the `items` property and mapping fields with the `fields` property:

```typescript
import { Component } from '@angular/core';
import { MenuModule } from '@syncfusion/ej2-angular-navigations';
import { FieldSettingsModel } from '@syncfusion/ej2-angular-navigations';
import { enableRipple } from '@syncfusion/ej2-base';

enableRipple(true);

@Component({
  imports: [MenuModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <div class="e-section-control">
      <ejs-menu [items]="data" [fields]="menuFields"></ejs-menu>
    </div>
  `
})
export class AppComponent {
  public data: { [key: string]: Object }[] = [
    {
      continent: 'Asia',
      countries: [
        { country: 'China' },
        { country: 'India' },
        { country: 'Japan' }
      ]
    },
    {
      continent: 'North America',
      countries: [
        { country: 'Canada' },
        { country: 'Mexico' },
        { country: 'USA' }
      ]
    },
    {
      continent: 'Europe',
      countries: [
        { country: 'France' },
        { country: 'Germany' },
        { country: 'UK' }
      ]
    },
    { continent: 'Africa' }
  ];

  public menuFields: FieldSettingsModel = {
    text: ['continent', 'country'],
    children: ['countries']
  };
}
```

### Field Mapping Options

The `FieldSettingsModel` supports:

| Property | Type | Description |
|----------|------|-------------|
| `text` | `string[]` | Array of field names to display as menu text |
| `children` | `string[]` | Array of field names containing nested items |
| `itemId` | `string` | Unique identifier for each item (optional) |
| `parentId` | `string` | Parent identifier for self-referential data (optional) |

## Self-Referential Data

Self-referential data uses `itemId` and `parentId` to establish hierarchical relationships. Items with null `parentId` are root-level items.

```typescript
import { Component } from '@angular/core';
import { MenuModule } from '@syncfusion/ej2-angular-navigations';
import { FieldSettingsModel } from '@syncfusion/ej2-angular-navigations';
import { enableRipple } from '@syncfusion/ej2-base';

enableRipple(true);

@Component({
  imports: [MenuModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <div class="e-section-control">
      <ejs-menu [items]="data" [fields]="menuFields"></ejs-menu>
    </div>
  `
})
export class AppComponent {
  public data: { [key: string]: Object }[] = [
    { id: 'parent1', text: 'Events' },
    { id: 'parent2', text: 'Movies' },
    { id: 'parent3', text: 'Directory' },
    { id: 'parent4', text: 'Queries', pId: null as any },
    { id: 'parent5', text: 'Services', pId: null as any },

    { id: 'parent6', text: 'Conferences', pId: 'parent1' },
    { id: 'parent7', text: 'Music', pId: 'parent1' },
    { id: 'parent8', text: 'Workshops', pId: 'parent1' },

    { id: 'parent9', text: 'Now Showing', pId: 'parent2' },
    { id: 'parent10', text: 'Coming Soon', pId: 'parent2' },

    { id: 'parent11', text: 'Media Gallery', pId: 'parent3' },
    { id: 'parent12', text: 'Newsletters', pId: 'parent3' },

    { id: 'parent13', text: 'Our Policy', pId: 'parent4' },
    { id: 'parent14', text: 'Site Map', pId: 'parent4' },
    { id: 'parent15', text: 'Pop', pId: 'parent7' },
    { id: 'parent16', text: 'Folk', pId: 'parent7' },
    { id: 'parent17', text: 'Classical', pId: 'parent7' }
  ];

  public menuFields: FieldSettingsModel = {
    itemId: 'id',
    text: 'text',
    parentId: 'pId'
  };
}
```

### Root-Level Items

Root-level items have no parent. Specify `parentId` as `null` or omit it entirely:

```typescript
// Both are valid root-level items:
{ id: 'item1', text: 'File', pId: null }
{ id: 'item2', text: 'Edit' }  // pId omitted
```

## Remote Data with DataManager

Use Syncfusion's DataManager to bind the Menu to remote data sources. This example uses the Northwind OData service:

```typescript
import { Component, OnInit } from '@angular/core';
import { MenuModule } from '@syncfusion/ej2-angular-navigations';
import { FieldSettingsModel } from '@syncfusion/ej2-angular-navigations';
import { DataManager, Query, ODataV4Adaptor, ReturnOption } from '@syncfusion/ej2-data';
import { enableRipple } from '@syncfusion/ej2-base';

enableRipple(true);

@Component({
  imports: [MenuModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <div class="e-section-control">
      <ejs-menu *ngIf="menuItems" [items]="menuItems" [fields]="menuFields"></ejs-menu>
    </div>
  `
})
export class AppComponent implements OnInit {
  private SERVICE_URI: string = 'https://services.odata.org/V4/Northwind/Northwind.svc/';

  public menuFields: FieldSettingsModel = {
    text: ['FirstName', 'ShipName'],
    children: ['Orders']
  };

  public menuItems?: { [key: string]: Object }[];

  public ngOnInit(): void {
    // Getting remote data using DataManager
    new DataManager({ 
      url: this.SERVICE_URI, 
      adaptor: new ODataV4Adaptor(), 
      crossDomain: true 
    })
      .executeQuery(
        new Query()
          .from('Employees')
          .take(5)
          .hierarchy(
            new Query()
              .foreignKey('EmployeeID')
              .from('Orders')
              .take(13),
            function () {
              return [1, 2, 3, 4, 5];
            }
          )
      )
      .then((e: ReturnOption) => {
        // Assign result data to menu items
        this.menuItems = e.result as { [key: string]: Object }[];
      });
  }
}
```

### DataManager Configuration

```typescript
new DataManager({
  url: 'https://your-api-endpoint.com/data',
  adaptor: new ODataV4Adaptor(),  // For OData v4 services
  crossDomain: true
})
```

Supported adaptors:
- `ODataV4Adaptor` - For OData v4 services
- `UrlAdaptor` - For custom REST APIs
- `JsonServerAdaptor` - For JSON Server
- `WebApiAdaptor` - For ASP.NET Web API

## Custom Menu Templates

Use Angular templates to customize menu item rendering. Templates allow displaying complex HTML structures beyond simple text:

```typescript
import { Component, Inject } from '@angular/core';
import { MenuModule } from '@syncfusion/ej2-angular-navigations';
import { FieldSettingsModel } from '@syncfusion/ej2-angular-navigations';
import { MenuAnimationSettingsModel } from '@syncfusion/ej2-angular-navigations';
import { enableRipple } from '@syncfusion/ej2-base';
import { ButtonModule } from '@syncfusion/ej2-angular-buttons';

enableRipple(false);

@Component({
  imports: [MenuModule, ButtonModule],
  standalone: true,
  selector: 'app-root',
  styleUrls: ['./template.css'],
  template: `
    <div class="e-section-control">
      <div id="menuTemplate" class="menu-section">
        <div class="menu-control">
          <ejs-menu 
            [items]="dataSource" 
            [fields]="menuFields" 
            [animationSettings]="animation" 
            cssClass="e-template-menu">
            <ng-template #template let-dataSource="">
              {{dataSource.category}}
              <div *ngIf="dataSource.value" style="width:100%;display:flex;justify-content:space-between;">
                <img *ngIf="dataSource.url" class="e-avatar e-avatar-small"
                  src="{{dataSource.url}}.png" />
                <span style="width:100%;">{{dataSource.value}}</span>
                <span *ngIf="dataSource.count" class="e-badge e-badge-success">
                  {{dataSource.count}}
                </span>
              </div>
            </ng-template>
          </ejs-menu>
        </div>
      </div>
    </div>
  `
})
export class AppComponent {
  public dataSource: { [key: string]: Object }[] = [
    {
      category: 'Products',
      options: [
        { value: 'JavaScript', url: 'javascript' },
        { value: 'Angular', url: 'angular' },
        { value: 'ASP.NET Core', url: 'core' },
        { value: 'ASP.NET MVC', url: 'mvc' }
      ]
    },
    {
      category: 'Services',
      options: [
        { value: 'Application Development', count: '1200+' },
        { value: 'Maintenance & Support', count: '3700+' },
        { value: 'Quality Assurance' },
        { value: 'Cloud Integration', count: '900+' }
      ]
    },
    { category: 'Careers' },
    { category: 'Sign In' }
  ];

  public menuFields: object = {
    text: ['category', 'value'],
    children: ['options']
  };

  public animation: any = { effect: 'FadeIn', duration: 400 };
}
```

### Template Features

- **Data Binding**: Use `{{property}}` to display data
- **Conditionals**: Use `*ngIf` for conditional rendering
- **Images**: Bind image URLs with `src` binding
- **Badges**: Display badges or counts
- **Icons**: Include Syncfusion icon classes
- **Interactive Elements**: Add buttons or links

### Preventing Submenu Closing

In templates, to prevent submenus from closing when interacting with custom content, set `args.cancel` to `true` in the `beforeClose` event:

```typescript
public beforeClose(args: BeforeOpenCloseMenuEventArgs): void {
  // Prevent closing when custom content is clicked
  args.cancel = true;
}
```

## Field Mapping

### Multiple Text Fields

Display multiple fields as the menu text at different levels:

```typescript
public menuFields: FieldSettingsModel = {
  text: ['continent', 'country', 'city'],
  children: ['countries', 'cities']
};
```

This creates a three-level hierarchy where:
- Level 1: `continent` field
- Level 2: `country` field
- Level 3: `city` field

### Dynamic Field Mapping

Adjust field mappings based on data structure complexity. For flat data with self-reference:

```typescript
public menuFields: FieldSettingsModel = {
  itemId: 'empID',
  text: 'empName',
  parentId: 'parentID'
};
```

---

**Next:** To customize individual menu items, styling, and interactions, see [references/menu-items.md](menu-items.md).
