---
name: syncfusion-javascript-listview
description: Build responsive ListView components with Syncfusion TypeScript. Implement this skill when working with list-based interfaces, data binding, templates, selection handling, nested lists, grouping, filtering, virtualization, and advanced features like drag-drop and paging. Covers single/multi-select, checkboxes, animations, remote data binding, custom templates, and use cases such as chat windows, contact lists, and data tables.
metadata:
  author: "Syncfusion Inc"
  version: "34.1.29"
  category: "layout"
---

# Implementing Syncfusion TypeScript ListView

## When to Use This Skill

Use this skill when you need to:
- Create lists with dynamic data (local, remote, or API-based)
- Display hierarchical/nested list structures
- Implement multi-select or checkbox-based selection
- Add grouping, filtering, or search functionality
- Build interactive UI components (chat windows, contact lists, data tables)
- Apply custom templates and styling to list items
- Enable advanced features like virtualization, drag-drop, animations, or paging
- Handle list events (selection, scrolling, manipulation)

## Component Overview

The **Syncfusion ListView** component is a feature-rich, high-performance list component for displaying data with support for:
- **Data Binding**: Local arrays, remote APIs, dynamic data
- **Selection**: Single, multiple, or checkbox-based selection
- **Templating**: Custom item, header, and group templates
- **Nesting**: Hierarchical structures with drill-down navigation
- **Organization**: Grouping and filtering with searchable datasets
- **Performance**: Virtual scrolling, efficient rendering for large datasets
- **Interactivity**: Drag-drop, animations, events, custom styling
- **Accessibility**: WCAG compliance, keyboard navigation, ARIA support

## Documentation and Navigation Guide

### Getting Started
📄 **Read:** [references/getting-started.md](references/getting-started.md)
- Installation and package setup
- Basic ListView implementation
- CSS imports and theme configuration
- First render and minimal working example
- TypeScript project setup

### Data Binding & Sources
📄 **Read:** [references/data-binding.md](references/data-binding.md)
- Local array data sources
- Remote API data binding with DataManager
- Dynamic data loading and refresh
- Query builders and OData support
- Real-world data binding patterns

### Templates & Rendering
📄 **Read:** [references/templates-rendering.md](references/templates-rendering.md)
- Item templates (single-line, multi-line, custom HTML)
- Header templates for custom headers
- Group templates with styling
- Dynamic template switching
- Template best practices and patterns

### Selection & Interactions
📄 **Read:** [references/selection-interactions.md](references/selection-interactions.md)
- Single-item selection
- Multi-select with checkbox or Ctrl+click
- Checkbox configuration and positioning
- Enabling/disabling items
- Item visibility toggling
- Selection events and callbacks

### Nested Lists & Navigation
📄 **Read:** [references/nested-lists-navigation.md](references/nested-lists-navigation.md)
- Hierarchical data structures
- Nested list navigation and drill-down
- Back navigation between levels
- Breadcrumb patterns
- Dynamic hierarchies

### Grouping & Filtering
📄 **Read:** [references/grouping-filtering.md](references/grouping-filtering.md)
- Grouping items by category or field
- Custom group header templates
- Item count display in group headers
- Search and filter implementation
- Real-time filtering patterns

### Styling & Customization
📄 **Read:** [references/styling-customization.md](references/styling-customization.md)
- CSS class customization
- Theme application (Material, Fabric, Bootstrap)
- Right-to-left (RTL) language support
- Custom styling and CSS variables
- Responsive design patterns

### Events & State Management
📄 **Read:** [references/events-state-management.md](references/events-state-management.md)
- Available events (select, scroll, action begin/complete)
- Event handling and callbacks
- Event arguments and data
- State tracking and management
- Common event patterns

### Advanced Features
📄 **Read:** [references/advanced-features.md](references/advanced-features.md)
- Virtual scrolling for large datasets
- Paging and pagination integration
- Drag-and-drop functionality
- Animation effects and transitions
- Persistence and state restoration
- Performance optimization tips

### Real-World Examples & Use Cases
📄 **Read:** [references/use-case-examples.md](references/use-case-examples.md)
- Chat window UI implementation
- Contact list layout
- Todo/task list application
- Dual-list manager
- Mobile contact layout
- Grid-like layouts with ListView

### Complete API Reference
📄 **Read:** [references/api-reference.md](references/api-reference.md)
- All ListView properties with types and defaults
- Complete method documentation with parameters
- Event definitions with argument structures
- Type definitions and enums
- Configuration interfaces
- Usage examples for each major API item

## Quick Start Example

```typescript
import { ListView, ListViewComponent } from '@syncfusion/ej2-lists';
import { DataBind } from '@syncfusion/ej2-base';

// Basic ListView with local data
const listViewInstance = new ListView({
    dataSource: [
        { id: '1', text: 'Item 1' },
        { id: '2', text: 'Item 2' },
        { id: '3', text: 'Item 3' }
    ],
    fields: { id: 'id', text: 'text' }
});

listViewInstance.appendTo('#element');
```

## Common Patterns

### Pattern 1: Basic List with Selection
```typescript
const listView = new ListView({
    dataSource: ['Apple', 'Banana', 'Cherry'],
    select: (args) => {
        console.log('Selected:', args.data);
    }
});
listView.appendTo('#list');
```

### Pattern 2: Multi-Select with Checkboxes
```typescript
const listView = new ListView({
    dataSource: data,
    showCheckBox: true,
    fields: { text: 'Name', id: 'Id', isChecked: 'Checked' }
});
listView.appendTo('#list');
```

### Pattern 3: Nested List Navigation
```typescript
const listView = new ListView({
    dataSource: hierarchicalData,
    fields: { text: 'text', id: 'id', child: 'child' },
    select: (args) => {
        if (args.data.child) {
            // Navigate to child list
        }
    }
});
listView.appendTo('#list');
```

### Pattern 4: Grouped List
```typescript
const listView = new ListView({
    dataSource: data,
    fields: { text: 'Name', groupBy: 'Category', id: 'Id' }
});
listView.appendTo('#list');
```

## Key Features at a Glance

| Feature | Description | Reference |
|---------|-------------|-----------|
| **Data Binding** | Connect to local/remote data sources | data-binding.md |
| **Templates** | Customize item, header, and group appearance | templates-rendering.md |
| **Selection** | Single, multi-select, or checkbox modes | selection-interactions.md |
| **Nesting** | Hierarchical drill-down navigation | nested-lists-navigation.md |
| **Grouping** | Organize items by categories | grouping-filtering.md |
| **Filtering** | Search and filter items dynamically | grouping-filtering.md |
| **Styling** | Theme and customization options | styling-customization.md |
| **Events** | Handle user interactions | events-state-management.md |
| **Virtualization** | Efficiently render large datasets | advanced-features.md |
| **Drag-Drop** | Reorder items with mouse | advanced-features.md |

## Performance Tips

- **Enable Virtualization** for lists with 1000+ items
- **Use Remote Data** with lazy loading for large datasets
- **Debounce Filters** to avoid excessive re-renders
- **Optimize Templates** with minimal DOM complexity
- **Cache Group Headers** for static grouping

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- IE 11+

## Dependencies

```
@syncfusion/ej2-lists
@syncfusion/ej2-base
@syncfusion/ej2-data
```

## Next Steps

1. **Start with Getting Started** - Set up your first ListView
2. **Choose Your Data Source** - Use data-binding.md for your use case
3. **Customize Appearance** - Apply templates from templates-rendering.md
4. **Add Interactivity** - Implement selection and events
5. **Explore Advanced Features** - Virtualization, drag-drop, animations
6. **Reference API** - Check api-reference.md for complete documentation

---

For detailed implementation guidance, refer to the reference files above. Each file focuses on a specific aspect with complete code examples from the utils/code-snippet/listview folder.
