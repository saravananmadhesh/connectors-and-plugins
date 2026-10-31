# Command Column Editing

## Table of Contents
- [When to Use](#when-to-use)
- [Basic Command Column](#basic-command-column)
- [Custom Command Column](#custom-command-column)

## When to Use

Use this reference when you need to:
- Add CRUD action buttons (Edit, Delete, Save, Cancel) in a dedicated column
- Implement custom command handlers for row actions
- Customize command button appearance and icons
- Handle command clicks with custom logic
- Create inline action buttons for each row

Add CRUD action buttons in a column using the `commands` property:

## Basic Command Column

```vue
<e-column 
  headerText='Commands' 
  width=120 
  :commands='[
    { type: "Edit", buttonOption: { cssClass: "e-flat", iconCss: "e-edit e-icons" } },
    { type: "Delete", buttonOption: { cssClass: "e-flat", iconCss: "e-delete e-icons" } },
    { type: "Save", buttonOption: { cssClass: "e-flat", iconCss: "e-update e-icons" } },
    { type: "Cancel", buttonOption: { cssClass: "e-flat", iconCss: "e-cancel-icon e-icons" } }
  ]'
/>
```

## Custom Command Column

```vue
const commands = [{ buttonOption: { content: "Details", cssClass: "e-flat" } }];

const commandClick = (args) => {
  // Handle custom command click
  console.log('Custom command clicked on row: ', args.rowData);
};
```
