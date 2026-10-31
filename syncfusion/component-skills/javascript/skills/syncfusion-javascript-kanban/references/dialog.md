# Kanban Dialog Reference

This reference provides comprehensive information about implementing dialogs in the Syncfusion TypeScript Kanban component for adding, editing, and deleting cards.

## Table of Contents

- [Overview](#overview)
- [Default Dialog](#default-dialog)
- [Custom Fields](#custom-fields)
- [Dialog Template](#dialog-template)
- [Prevent Dialog](#prevent-dialog)
- [Server-Side Persistence](#server-side-persistence)
- [Validation](#validation)
- [Edge Cases and Troubleshooting](#edge-cases-and-troubleshooting)

## Overview

The Kanban component provides built-in dialog support for card management operations. Users can add, edit, and delete cards through:
- Built-in dialog module with default fields
- Custom fields configuration
- Custom dialog templates

## Default Dialog

The default dialog opens when users double-click on cards. It contains three buttons: `Delete`, `Save`, and `Cancel`.

### Default Fields Mapping

The dialog displays the following fields by default:

| Key | Type | Purpose |
|-----|------|---------|
| cardSettings.headerField | Input | Card ID/Header |
| keyField | DropDown | Column status |
| cardSettings.contentField | TextArea | Card content |
| cardSettings.priority | Numeric | Priority (if applicable) |
| swimlaneSettings.keyField | DropDown | Swimlane (if applicable) |

### Basic Implementation

```typescript
import { Kanban } from '@syncfusion/ej2-kanban';
import { kanbanData } from './datasource';

let kanbanObj: Kanban = new Kanban({
    dataSource: kanbanData,
    keyField: 'Status',
    columns: [
        { headerText: 'Backlog', keyField: 'Open' },
        { headerText: 'In Progress', keyField: 'InProgress' },
        { headerText: 'Testing', keyField: 'Testing' },
        { headerText: 'Done', keyField: 'Close' }
    ],
    cardSettings: {
        contentField: 'Summary',
        headerField: 'Id'
    }
});
kanbanObj.appendTo('#Kanban');
```

## Custom Fields

You can customize dialog fields using the `dialogSettings.fields` property. Each field must have a `key` and `type`.

### Available Field Types

- **String**: Text input field
- **Numeric**: Numeric input field
- **TextArea**: Multi-line text area
- **DropDown**: Dropdown selection
- **TextBox**: Single-line text box
- **Input**: HTML input element (default if type is not specified)

### Custom Fields Example

```typescript
import { Kanban } from '@syncfusion/ej2-kanban';
import { kanbanData } from './datasource';

let kanbanObj: Kanban = new Kanban({
    dataSource: kanbanData,
    keyField: 'Status',
    columns: [
        { headerText: 'Backlog', keyField: 'Open' },
        { headerText: 'In Progress', keyField: 'InProgress' },
        { headerText: 'Testing', keyField: 'Testing' },
        { headerText: 'Done', keyField: 'Close' }
    ],
    cardSettings: {
        contentField: 'Summary',
        headerField: 'Id'
    },
    dialogSettings: {
        fields: [
            { key: 'Id', type: 'Input' },
            { key: 'Status', type: 'DropDown' },
            { key: 'Estimate', type: 'Numeric' },
            { key: 'Summary', type: 'TextArea' }
        ]
    }
});
kanbanObj.appendTo('#Kanban');
```

### Custom Field Labels

By default, the field `key` is used as the label. You can customize this using the `text` property:

```typescript
dialogSettings: {
    fields: [
        { text: 'ID', key: 'Id', type: 'Input' },
        { text: 'Column Status', key: 'Status', type: 'DropDown' },
        { text: 'Story Points', key: 'Estimate', type: 'Numeric' },
        { text: 'Description', key: 'Summary', type: 'TextArea' }
    ]
}
```

## Validation

### Field Validation Rules

You can validate dialog fields using the `validationRules` property. Validation occurs when the `Save` button is clicked.

```typescript
import { Kanban } from '@syncfusion/ej2-kanban';
import { kanbanData } from './datasource';

let kanbanObj: Kanban = new Kanban({
    dataSource: kanbanData,
    keyField: 'Status',
    columns: [
        { headerText: 'Backlog', keyField: 'Open' },
        { headerText: 'In Progress', keyField: 'InProgress' },
        { headerText: 'Testing', keyField: 'Testing' },
        { headerText: 'Done', keyField: 'Close' }
    ],
    cardSettings: {
        contentField: 'Summary',
        headerField: 'Id'
    },
    dialogSettings: {
        fields: [
            { text: 'ID', key: 'Id', type: 'Input' },
            { key: 'Status', type: 'DropDown' },
            { key: 'Estimate', type: 'Numeric', validationRules: { range: [0, 1000] } },
            { key: 'Summary', type: 'TextArea', validationRules: { required: true } }
        ]
    }
});
kanbanObj.appendTo('#Kanban');
```

### Common Validation Rules

- **required**: Field must have a value
- **range**: Numeric value must be within [min, max]
- **minLength**: String must have minimum length
- **maxLength**: String must have maximum length
- **email**: Must be valid email format
- **pattern**: Must match regex pattern

## Dialog Template

Use custom templates for complete control over the dialog appearance and behavior.

### Template Implementation

```typescript
import { DropDownList } from '@syncfusion/ej2-dropdowns';
import { NumericTextBox, TextBox } from '@syncfusion/ej2-inputs';
import { Kanban, DialogEventArgs } from '@syncfusion/ej2-kanban';
import { kanbanData } from './datasource';

let kanbanObj: Kanban = new Kanban({
    dataSource: kanbanData,
    keyField: 'Status',
    columns: [
        { headerText: 'Backlog', keyField: 'Open' },
        { headerText: 'In Progress', keyField: 'InProgress' },
        { headerText: 'Done', keyField: 'Close' }
    ],
    cardSettings: {
        contentField: 'Summary',
        headerField: 'Id'
    },
    dialogSettings: {
        template: '#dialogTemplate'
    },
    dialogOpen: onDialogOpen
});
kanbanObj.appendTo('#Kanban');

let statusData: string[] = ['Open', 'InProgress', 'Close'];
let assigneeData: string[] = ['Nancy Davloio', 'Andrew Fuller', 'Janet Leverling',
    'Steven walker', 'Robert King', 'Margaret hamilt', 'Michael Suyama'];
let priorityData: string[] = ['Low', 'Normal', 'Critical', 'Release Breaker', 'High'];

function onDialogOpen(args: DialogEventArgs): void {
    if (args.requestType !== 'Delete') {
        let curData: { [key: string]: Object } = args.data;
        
        let filledTextBox: TextBox = new TextBox({});
        filledTextBox.appendTo(args.element.querySelector('#Id') as HTMLInputElement);
        
        let numericObj: NumericTextBox = new NumericTextBox({
            value: curData.Estimate as number, 
            placeholder: 'Estimate'
        });
        numericObj.appendTo(args.element.querySelector('#Estimate') as HTMLInputElement);
        
        let statusDropObj: DropDownList = new DropDownList({
            value: curData.Status as string, 
            popupHeight: '300px',
            dataSource: statusData, 
            fields: { text: 'Status', value: 'Status' }, 
            placeholder: 'Status'
        });
        statusDropObj.appendTo(args.element.querySelector('#Status') as HTMLInputElement);
        
        let assigneeDropObj: DropDownList = new DropDownList({
            value: curData.Assignee as string, 
            popupHeight: '300px',
            dataSource: assigneeData, 
            fields: { text: 'Assignee', value: 'Assignee' }, 
            placeholder: 'Assignee'
        });
        assigneeDropObj.appendTo(args.element.querySelector('#Assignee') as HTMLInputElement);
        
        let priorityObj: DropDownList = new DropDownList({
            value: curData.Priority as string, 
            popupHeight: '300px',
            dataSource: priorityData, 
            fields: { text: 'Priority', value: 'Priority' }, 
            placeholder: 'Priority'
        });
        priorityObj.appendTo(args.element.querySelector('#Priority') as HTMLInputElement);
        
        let textareaObj: TextBox = new TextBox({
            placeholder: 'Summary',
            multiline: true
        });
        textareaObj.appendTo(args.element.querySelector('#Summary') as HTMLInputElement);
    }
}
```

## Prevent Dialog

You can prevent the dialog from opening on card double-click by setting `args.cancel` to `true` in the `dialogOpen` event.

```typescript
import { Kanban, DialogEventArgs } from '@syncfusion/ej2-kanban';
import { kanbanData } from './datasource';

let kanbanObj: Kanban = new Kanban({
    dataSource: kanbanData,
    keyField: 'Status',
    columns: [
        { headerText: 'Backlog', keyField: 'Open' },
        { headerText: 'In Progress', keyField: 'InProgress' },
        { headerText: 'Testing', keyField: 'Testing' },
        { headerText: 'Done', keyField: 'Close' }
    ],
    cardSettings: {
        contentField: 'Summary',
        headerField: 'Id'
    },
    dialogOpen: dialogOpen
});
kanbanObj.appendTo('#Kanban');

function dialogOpen(args: DialogEventArgs): void {
    args.cancel = true;
}
```

## Server-Side Persistence

### URL Adaptor

Use the `UrlAdaptor` with `DataManager` to persist card data to a server.

```typescript
import { Kanban } from '@syncfusion/ej2-kanban';
import { DataManager, UrlAdaptor } from '@syncfusion/ej2-data';

let data: DataManager = new DataManager({
    url: 'Home/DataSource',
    updateUrl: 'Home/Update',
    insertUrl: 'Home/Insert',
    removeUrl: 'Home/Delete',
    adaptor: new UrlAdaptor(),
    crossDomain: true
});

let kanbanObj: Kanban = new Kanban({
    dataSource: data,
    keyField: 'Status',
    columns: [
        { headerText: 'Backlog', keyField: 'Open' },
        { headerText: 'In Progress', keyField: 'InProgress' },
        { headerText: 'Testing', keyField: 'Testing' },
        { headerText: 'Done', keyField: 'Close' }
    ],
    cardSettings: {
        contentField: 'Summary',
        headerField: 'Id'
    }
});
kanbanObj.appendTo('#Kanban');
```

### Server-Side Controllers

#### Insert Action

```typescript
public ActionResult Insert(Params value) {
    // Insert card data into the database
    db.Tasks.Add(value);
    db.SaveChanges();
    return Json(value, JsonRequestBehavior.AllowGet);
}
```

#### Update Action

```typescript
public ActionResult Update(Params value) {
    // Update card data in the database
    Task old = db.Tasks.Where(o => o.Id == value.Id).SingleOrDefault();
    if (old != null) {
        db.Entry(old).CurrentValues.SetValues(value);
        db.SaveChanges();
    }
    return Json(value, JsonRequestBehavior.AllowGet);
}
```

#### Delete Action

```typescript
public void Delete(int key) {
    // Delete card from the database
    db.Tasks.Remove(db.Tasks.Where(o => o.Id == key).SingleOrDefault());
    db.SaveChanges();
}
```

### CRUD URL

Use a single controller action for all CRUD operations:

```typescript
import { Kanban } from '@syncfusion/ej2-kanban';
import { DataManager, UrlAdaptor } from '@syncfusion/ej2-data';

let data: DataManager = new DataManager({
    url: 'Home/DataSource',
    crudUrl: 'Home/UpdateData',
    adaptor: new UrlAdaptor(),
    crossDomain: true
});

let kanbanObj: Kanban = new Kanban({
    dataSource: data,
    keyField: 'Status',
    columns: [
        { headerText: 'Backlog', keyField: 'Open' },
        { headerText: 'In Progress', keyField: 'InProgress' },
        { headerText: 'Testing', keyField: 'Testing' },
        { headerText: 'Done', keyField: 'Close' }
    ],
    cardSettings: {
        contentField: 'Summary',
        headerField: 'Id'
    }
});
kanbanObj.appendTo('#Kanban');
```

#### Server-Side CRUD Handler

```typescript
public ActionResult UpdateData(EditParams param) {
    if (param.action == "insert" || (param.action == "batch" && param.added != null)) {
        if (param.action == "insert") {
            db.Tasks.Add(param.value);
        } else {
            foreach (var temp in param.added) {
                db.Tasks.Add(temp);
            }
        }
    }
    
    if (param.action == "update" || (param.action == "batch" && param.changed != null)) {
        if (param.action == "update") {
            Task old = db.Tasks.Where(o => o.Id == param.value.Id).SingleOrDefault();
            if (old != null) {
                db.Entry(old).CurrentValues.SetValues(param.value);
            }
        } else {
            foreach (var temp in param.changed) {
                Task old = db.Tasks.Where(o => o.Id == temp.Id).SingleOrDefault();
                if (old != null) {
                    db.Entry(old).CurrentValues.SetValues(temp);
                }
            }
        }
    }
    
    if (param.action == "remove" || (param.action == "batch" && param.deleted != null)) {
        if (param.action == "remove") {
            int key = Convert.ToInt32(param.key);
            db.Tasks.Remove(db.Tasks.Where(o => o.Id == key).SingleOrDefault());
        } else {
            foreach (var temp in param.deleted) {
                db.Tasks.Remove(db.Tasks.Where(o => o.Id == temp.Id).SingleOrDefault());
            }
        }
    }
    
    db.SaveChanges();
    return Json(param, JsonRequestBehavior.AllowGet);
}

public class EditParams {
    public string key { get; set; }
    public string action { get; set; }
    public List<Tasks> added { get; set; }
    public List<Tasks> changed { get; set; }
    public List<Tasks> deleted { get; set; }
    public Tasks value { get; set; }
}
```

## Edge Cases and Troubleshooting

### Common Issues

**Issue**: Dialog doesn't open on double-click
- **Solution**: Ensure the dialog module is not disabled and `dialogOpen` event is not cancelling the dialog

**Issue**: Custom fields not displaying
- **Solution**: Verify that the `key` property matches the data source field names exactly

**Issue**: Validation not working
- **Solution**: Check that `validationRules` are properly formatted and applied to the correct fields

**Issue**: Server data not updating
- **Solution**: Verify the URL endpoints are correct and the server is returning proper JSON responses

### Best Practices

1. **Always validate field types**: Ensure the field type matches the data type in your data source
2. **Use proper validation rules**: Apply appropriate validation rules to prevent invalid data
3. **Handle dialog events**: Use `dialogOpen` and `dialogClose` events for custom logic
4. **Test server endpoints**: Verify all CRUD endpoints are working before integrating
5. **Use templates for complex scenarios**: When the default dialog doesn't meet requirements, use custom templates

### Performance Considerations

- Minimize the number of fields in the dialog for better performance
- Use lazy loading for dropdown data sources with many items
- Avoid heavy computations in `dialogOpen` event handlers
- Consider using `crudUrl` for batch operations to reduce server calls

### Accessibility

- Ensure custom templates maintain keyboard navigation
- Provide proper labels for all form fields
- Use ARIA attributes for custom controls
- Test dialog with screen readers
