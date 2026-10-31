---
name: syncfusion-javascript-query-builder
description: How to implement Syncfusion JavaScript QueryBuilder component with comprehensive guidance on columns, data binding, rules management, filtering, templates, drag-drop interactions, import/export, and accessibility. Use this skill when users need help with QueryBuilder setup, rule creation, complex query building, advanced customization, or dynamic filter UI requirements in TypeScript applications.
metadata:
  author: "Syncfusion Inc"
  version: "34.1.29"
  category: "Forms"
---

# Implementing QueryBuilder in TypeScript

The QueryBuilder is a powerful Syncfusion component for building dynamic, complex queries with a visual UI. This skill provides comprehensive guidance for implementing, configuring, and customizing the QueryBuilder in TypeScript applications.

## Control Overview

**QueryBuilder** is an advanced UI component that enables users to build complex filter conditions without writing code. It supports:

- Multiple data types (string, number, date, boolean)
- Various operators (equals, contains, between, etc.)
- Rule grouping with AND/OR conditions
- Nested group hierarchies
- Custom templates for UI customization
- Drag-drop interactions (rearrange, clone, lock rules)
- JSON import/export and SQL generation
- RTL support and full keyboard accessibility
- WCAG 2.1 AA compliance

## Documentation and Navigation Guide

### Getting Started
See also: [references/getting-started.md](references/getting-started.md)
- Installation and npm package setup
- Syncfusion dependencies configuration
- CSS imports and theme setup
- Basic QueryBuilder initialization
- Column definitions with types
- Running your first QueryBuilder application

### Columns and Schema Definition
See also: [references/columns-definition.md](references/columns-definition.md)
- Column definitions and schema structure
- Auto-generation of columns from data
- Field mapping and labels
- Supported data types (string, number, date, boolean)
- Operators for each data type
- Step and format properties for numbers/dates
- Custom column configuration patterns

### Data Binding
See also: [references/data-binding.md](references/data-binding.md)
- Local data binding with JavaScript arrays
- Remote data binding with DataManager
- DataSource assignment patterns
- RuleModel structure for predefined queries
- Binding with initial rules
- Dynamic data updates and refresh
- DataManager configuration

### Rules and Groups Management
See also: [references/rules-and-groups.md](references/rules-and-groups.md)
- Rule model structure (condition, rules, field, operator, value)
- Creating single filter rules
- Grouping rules with AND/OR logic
- Adding and deleting rules programmatically
- Adding and deleting groups
- Rule validation and constraints
- Nested group hierarchies

### Filtering and Search Operations
See also: [references/filtering-search.md](references/filtering-search.md)
- Filtering conditions creation and deletion
- Query execution methods
- Custom filter condition patterns
- Search functionality within conditions
- ShowButtons configuration (rule delete, group insert/delete)
- UI-based and programmatic filtering
- Event handling for filter changes

### Templates and Customization
See also: [references/templates-customization.md](references/templates-customization.md)
- Value template customization
- Operator template customization
- Field template customization
- Custom HTML template creation
- Template rendering and binding
- CSS class customization
- Dynamic template rendering patterns

### Drag-Drop and Rule Interaction
See also: [references/drag-drop-clone-lock.md](references/drag-drop-clone-lock.md)
- Drag and drop functionality for rules
- Cloning rules within groups
- Locking rules to prevent modification
- Separator and connector behavior
- Moving rules between groups
- Drag-drop event handling
- Visual feedback and styling

### Import/Export and Persistence
See also: [references/import-export.md](references/import-export.md)
- Exporting rules to JSON format
- Importing rules from JSON
- SQL query generation
- JSON serialization patterns
- Format conversions (rules to SQL/JSON)
- Data persistence strategies
- State management

### Accessibility and RTL
See also: [references/accessibility-rtl.md](references/accessibility-rtl.md)
- WCAG 2.1 AA compliance standards
- Keyboard navigation patterns
- ARIA attributes and labels
- Screen reader support
- RTL (Right-to-Left) language support
- Focus management and indicators
- Localization and internationalization

### Advanced Features and Troubleshooting
See also: [references/advanced-features.md](references/advanced-features.md)
- Global and local configuration options
- Model binding patterns
- Advanced validation strategies
- Performance optimization techniques
- Event handling and callbacks
- State persistence patterns
- Common issues and troubleshooting
- Best practices for complex scenarios

### API Reference
See also: [references/api.md](references/api.md)
- Complete properties reference with types and defaults
- All public methods with parameters and return types
- All events with event argument interfaces
- Key model interfaces (RuleModel, ColumnsModel, ShowButtonsModel, ValueModel, TemplateColumn, Validation)
- Event arg interfaces (ActionEventArgs, ChangeEventArgs, RuleChangeEventArgs, DragEventArgs, DropEventArgs)
- SQL/query output interfaces (ParameterizedSql, ParameterizedNamedSql)
- Usage examples for initialization, SQL export, rule management, clone/lock, and drag-drop

## Quick Start Example

Here's a minimal example to get started with QueryBuilder:

```typescript
import { QueryBuilder, ColumnsModel, RuleModel } from '@syncfusion/ej2-querybuilder';

// Define your data
const employeeData = [
  {
    EmployeeID: 1,
    FirstName: 'Nancy',
    Title: 'Sales Representative',
    HireDate: '22/07/2001',
    City: 'Seattle',
    Country: 'USA'
  },
  {
    EmployeeID: 2,
    FirstName: 'Andrew',
    Title: 'Vice President',
    HireDate: '21/04/2003',
    City: 'Tacoma',
    Country: 'USA'
  }
];

// Define columns matching your data
const columnData: ColumnsModel[] = [
  { field: 'EmployeeID', label: 'Employee ID', type: 'number' },
  { field: 'FirstName', label: 'First Name', type: 'string' },
  { field: 'Title', label: 'Title', type: 'string' },
  { field: 'HireDate', label: 'Hire Date', type: 'date', format: 'dd/MM/yyyy' },
  { field: 'City', label: 'City', type: 'string' },
  { field: 'Country', label: 'Country', type: 'string' }
];

// Optional: Define initial rules
const initialRules: RuleModel = {
  condition: 'and',
  rules: [
    {
      label: 'Employee ID',
      field: 'EmployeeID',
      type: 'number',
      operator: 'equal',
      value: 1
    },
    {
      label: 'Title',
      field: 'Title',
      type: 'string',
      operator: 'startswith',
      value: 'Sales'
    }
  ]
};

// Create QueryBuilder instance
const queryBuilder = new QueryBuilder({
  width: '100%',
  dataSource: employeeData,
  columns: columnData,
  rule: initialRules
});

// Render to DOM
queryBuilder.appendTo('#querybuilder');
```

## Common Patterns

### Pattern 1: Basic Filter with Single Rule
For simple filtering scenarios, use a single rule without groups:
```typescript
const rule: RuleModel = {
  condition: 'and',
  rules: [{
    field: 'FirstName',
    type: 'string',
    operator: 'startswith',
    value: 'A'
  }]
};
```

### Pattern 2: AND/OR Logic with Groups
For complex filters combining multiple conditions:
```typescript
const rule: RuleModel = {
  condition: 'and',
  rules: [
    { field: 'City', operator: 'equal', value: 'Seattle' },
    {
      condition: 'or',
      rules: [
        { field: 'Title', operator: 'contains', value: 'Sales' },
        { field: 'Title', operator: 'contains', value: 'Manager' }
      ]
    }
  ]
};
```

### Pattern 3: Dynamic Rule Addition
Add rules programmatically in response to user actions:
```typescript
const newRule = [{
  field: 'Country',
  operator: 'equal',
  value: 'USA'
}];
queryBuilder.addRules(newRule, 'group0');
```

### Pattern 4: Export to JSON for Storage
Save the current query state for persistence:
```typescript
const rules = queryBuilder.getRules();
const jsonQuery = JSON.stringify(rules);
// Store in database or local storage
```

## Key Concepts

- **RuleModel:** Represents a single filter condition with field, operator, and value
- **Condition:** Logical operator (AND/OR) for combining multiple rules
- **GroupModel:** Container for rules with AND/OR conditions
- **Operators:** Comparison methods (equal, contains, between, etc.)
- **Data Types:** Supported column types (string, number, date, boolean)
- **Templates:** Custom UI elements for fields, operators, and values
- **State:** Current configuration of rules and groups

## Common Use Cases

1. **Advanced Search Filter** - Let users build complex queries for data search
2. **Report Generation** - Create dynamic filters for report parameters
3. **Data Export** - Filter data before export with visual UI
4. **Log Analysis** - Build complex queries to analyze system logs
5. **Customer Segmentation** - Filter customers based on multiple criteria
6. **Permission Rules** - Define access rules with complex conditions
7. **Notification Rules** - Create dynamic alert conditions
8. **ETL Workflows** - Filter source data before transformation

---

**Need help with a specific feature?** Check the reference files above for detailed guidance on columns, data binding, templates, and more!
