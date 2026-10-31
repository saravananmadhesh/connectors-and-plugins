# Grouping and Filtering

## Table of Contents
- [Grouping by Field](#grouping-by-field)
- [Group Templates](#group-templates)
- [Item Count in Groups](#item-count-in-groups)
- [Search and Filter](#search-and-filter)
- [Dynamic Filtering](#dynamic-filtering)
- [Multi-Filter Patterns](#multi-filter-patterns)
- [Performance Optimization](#performance-optimization)

## Grouping by Field

### Basic Grouping

```typescript
import { ListView } from '@syncfusion/ej2-lists';

const employees = [
    { id: '1', text: 'John', department: 'Sales' },
    { id: '2', text: 'Sarah', department: 'IT' },
    { id: '3', text: 'Mike', department: 'Sales' },
    { id: '4', text: 'Emma', department: 'HR' },
    { id: '5', text: 'David', department: 'IT' }
];

const listView = new ListView({
    dataSource: employees,
    fields: {
        id: 'id',
        text: 'text',
        groupBy: 'department'
    }
});

listView.appendTo('#listview');
```

### Grouping Multiple Levels

```typescript
const data = [
    { 
        id: '1', 
        text: 'John', 
        department: 'Sales', 
        region: 'North' 
    },
    { 
        id: '2', 
        text: 'Sarah', 
        department: 'IT', 
        region: 'North' 
    },
    { 
        id: '3', 
        text: 'Mike', 
        department: 'Sales', 
        region: 'South' 
    }
];

// Note: Standard ListView groups by single field
// For multiple levels, use custom filtering or nested structures
const listView = new ListView({
    dataSource: data,
    fields: {
        id: 'id',
        text: 'text',
        groupBy: 'department'
    }
});

listView.appendTo('#listview');
```

### Sort Within Groups

```typescript
import { DataManager, Query } from '@syncfusion/ej2-data';

const listView = new ListView({
    dataSource: new DataManager(employees),
    query: new Query()
        .sortBy('department')
        .thenBy('text'),  // Sort by name within each department
    fields: {
        id: 'id',
        text: 'text',
        groupBy: 'department'
    }
});

listView.appendTo('#listview');
```

## Group Templates

### Custom Group Header

```typescript
const listView = new ListView({
    dataSource: employees,
    fields: {
        id: 'id',
        text: 'text',
        groupBy: 'department'
    },
    groupTemplate: '<div class="group-header"><strong>${department}</strong></div>'
});

listView.appendTo('#listview');
```

### Group Header with Styling

```typescript
const listView = new ListView({
    dataSource: employees,
    fields: {
        id: 'id',
        text: 'text',
        groupBy: 'department'
    },
    groupTemplate: `
        <div class="group-header" style="
            background-color: #f5f5f5;
            padding: 10px;
            font-weight: bold;
            border-bottom: 2px solid #ccc;
        ">
            ${department}
        </div>
    `
});

listView.appendTo('#listview');
```

### Group Header with Icons

```typescript
const getDepartmentIcon = (dept) => {
    const icons = {
        'Sales': 'e-icons e-shopping-cart',
        'IT': 'e-icons e-code',
        'HR': 'e-icons e-people'
    };
    return icons[dept] || 'e-icons e-folder';
};

const listView = new ListView({
    dataSource: employees,
    fields: {
        id: 'id',
        text: 'text',
        groupBy: 'department'
    },
    groupTemplate: `
        <div class="group-header">
            <span class="${getDepartmentIcon(department)}"></span>
            <strong>${department}</strong>
        </div>
    `
});

listView.appendTo('#listview');
```

### Collapsible Groups

```typescript
const listView = new ListView({
    dataSource: employees,
    fields: {
        id: 'id',
        text: 'text',
        groupBy: 'department'
    },
    groupTemplate: `
        <div class="group-header" onclick="toggleGroup(event)">
            <span class="toggle-icon">▼</span>
            <strong>${department}</strong>
        </div>
    `
});

listView.appendTo('#listview');

function toggleGroup(event) {
    const header = event.currentTarget;
    const group = header.closest('.e-list-group');
    group.classList.toggle('collapsed');
}
```

## Item Count in Groups

### Display Count in Header

```typescript
const listView = new ListView({
    dataSource: employees,
    fields: {
        id: 'id',
        text: 'text',
        groupBy: 'department'
    },
    groupTemplate: `
        <div class="group-header">
            <strong>${department}</strong>
            <span class="count">(${count} employees)</span>
        </div>
    `
});

listView.appendTo('#listview');
```

### Custom Count Display

```typescript
function getGroupCount(department) {
    return employees.filter(e => e.department === department).length;
}

const listView = new ListView({
    dataSource: employees,
    fields: {
        id: 'id',
        text: 'text',
        groupBy: 'department'
    },
    groupTemplate: `
        <div class="group-header">
            <strong>${department}</strong>
            <span class="badge">${count}</span>
        </div>
    `
});

listView.appendTo('#listview');

// CSS
const css = `
    .badge {
        background-color: #007bff;
        color: white;
        padding: 2px 6px;
        border-radius: 12px;
        font-size: 12px;
        margin-left: 10px;
    }
`;
```

### Progress by Group

```typescript
function calculateGroupProgress(department) {
    const deptEmployees = employees.filter(e => e.department === department);
    const completed = deptEmployees.filter(e => e.completed).length;
    return Math.round((completed / deptEmployees.length) * 100);
}

const listView = new ListView({
    dataSource: employees,
    fields: {
        id: 'id',
        text: 'text',
        groupBy: 'department'
    },
    groupTemplate: `
        <div class="group-header">
            <strong>${department}</strong>
            <div class="progress-bar" style="width: 50px; height: 20px; background: #eee; border-radius: 3px;">
                <div style="width: ${calculateGroupProgress(department)}%; height: 100%; background: #4CAF50; border-radius: 3px;"></div>
            </div>
        </div>
    `
});

listView.appendTo('#listview');
```

## Search and Filter

### Simple Search

```typescript
const listView = new ListView({
    dataSource: employees,
    fields: { id: 'id', text: 'text' }
});

listView.appendTo('#listview');

const searchInput = document.getElementById('search');
searchInput.addEventListener('input', (e) => {
    const searchText = e.target.value.toLowerCase();
    const filtered = employees.filter(item =>
        item.text.toLowerCase().includes(searchText)
    );
    
    listView.dataSource = filtered;
    listView.render();
});
```

### Search with Grouping

```typescript
const listView = new ListView({
    dataSource: employees,
    fields: {
        id: 'id',
        text: 'text',
        groupBy: 'department'
    }
});

listView.appendTo('#listview');

document.getElementById('search').addEventListener('input', (e) => {
    const searchText = e.target.value.toLowerCase();
    const filtered = employees.filter(item =>
        item.text.toLowerCase().includes(searchText)
    );
    
    // Maintain grouping after filter
    listView.dataSource = filtered;
    listView.render();
});
```

### Case-Insensitive Search

```typescript
function performSearch(searchTerm) {
    const term = searchTerm.toLowerCase().trim();
    
    if (!term) {
        listView.dataSource = employees;
    } else {
        const results = employees.filter(item =>
            item.text.toLowerCase().includes(term) ||
            item.department.toLowerCase().includes(term)
        );
        listView.dataSource = results;
    }
    
    listView.render();
}

document.getElementById('search').addEventListener('input', (e) => {
    performSearch(e.target.value);
});
```

## Dynamic Filtering

### Filter by Department

```typescript
function filterByDepartment(department) {
    const filtered = employees.filter(e => e.department === department);
    listView.dataSource = filtered;
    listView.render();
}

// Add filter buttons
['Sales', 'IT', 'HR'].forEach(dept => {
    const btn = document.createElement('button');
    btn.textContent = dept;
    btn.addEventListener('click', () => filterByDepartment(dept));
    document.getElementById('filter-buttons').appendChild(btn);
});
```

### Multiple Active Filters

```typescript
class FilterManager {
    private activeFilters = {};
    private data = employees;

    setFilter(filterName, value) {
        if (value) {
            this.activeFilters[filterName] = value;
        } else {
            delete this.activeFilters[filterName];
        }
        this.applyFilters();
    }

    clearFilters() {
        this.activeFilters = {};
        this.applyFilters();
    }

    private applyFilters() {
        let filtered = this.data;

        Object.entries(this.activeFilters).forEach(([key, value]) => {
            filtered = filtered.filter(item => item[key] === value);
        });

        listView.dataSource = filtered;
        listView.render();
    }
}

const filterMgr = new FilterManager();

// Usage
document.getElementById('filter-dept').addEventListener('change', (e) => {
    filterMgr.setFilter('department', e.target.value);
});
```

### Range Filtering

```typescript
function filterByRange(minSalary, maxSalary) {
    const filtered = employees.filter(e =>
        e.salary >= minSalary && e.salary <= maxSalary
    );
    
    listView.dataSource = filtered;
    listView.render();
}

const minInput = document.getElementById('min-salary');
const maxInput = document.getElementById('max-salary');

document.getElementById('apply-filter').addEventListener('click', () => {
    filterByRange(
        parseInt(minInput.value) || 0,
        parseInt(maxInput.value) || Infinity
    );
});
```

## Multi-Filter Patterns

### Combined Search and Filter

```typescript
class AdvancedFilter {
    private originalData = employees;
    private searchTerm = '';
    private filterCriteria = {};

    setSearch(term) {
        this.searchTerm = term.toLowerCase();
        this.apply();
    }

    setFilter(key, value) {
        if (value) {
            this.filterCriteria[key] = value;
        } else {
            delete this.filterCriteria[key];
        }
        this.apply();
    }

    private apply() {
        let filtered = this.originalData;

        // Apply search
        if (this.searchTerm) {
            filtered = filtered.filter(item =>
                item.text.toLowerCase().includes(this.searchTerm)
            );
        }

        // Apply filters
        Object.entries(this.filterCriteria).forEach(([key, value]) => {
            filtered = filtered.filter(item => item[key] === value);
        });

        listView.dataSource = filtered;
        listView.render();
    }

    clear() {
        this.searchTerm = '';
        this.filterCriteria = {};
        this.apply();
    }
}

const advFilter = new AdvancedFilter();

document.getElementById('search').addEventListener('input', (e) => {
    advFilter.setSearch(e.target.value);
});

document.getElementById('dept-filter').addEventListener('change', (e) => {
    advFilter.setFilter('department', e.target.value);
});
```

### Tag-Based Filtering

```typescript
const itemsWithTags = [
    { id: '1', text: 'Item 1', tags: ['urgent', 'important'] },
    { id: '2', text: 'Item 2', tags: ['important'] },
    { id: '3', text: 'Item 3', tags: ['urgent'] }
];

function filterByTags(selectedTags) {
    const filtered = itemsWithTags.filter(item =>
        selectedTags.every(tag => item.tags.includes(tag))
    );
    
    listView.dataSource = filtered;
    listView.render();
}

// UI for tag selection
const tags = ['urgent', 'important', 'low-priority'];
tags.forEach(tag => {
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.value = tag;
    checkbox.addEventListener('change', () => {
        const selected = Array.from(
            document.querySelectorAll('input[type="checkbox"]:checked')
        ).map(cb => cb.value);
        filterByTags(selected);
    });
    document.getElementById('tag-filters').appendChild(checkbox);
});
```

## Performance Optimization

### Lazy Filter for Large Datasets

```typescript
import { DataManager, Query } from '@syncfusion/ej2-data';

let filterTimeout;

document.getElementById('search').addEventListener('input', (e) => {
    clearTimeout(filterTimeout);
    
    filterTimeout = setTimeout(() => {
        const query = new Query().where('text', 'contains', e.target.value);
        listView.query = query;
        listView.refresh();
    }, 300); // Wait 300ms after user stops typing
});
```

### Debounced Group Update

```typescript
function debounce(func, delay) {
    let timeout;
    return function(...args) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func(...args), delay);
    };
}

const updateGroups = debounce((groupField) => {
    listView.fields.groupBy = groupField;
    listView.render();
}, 250);
```

### Virtualized Filtered Results

```typescript
const listView = new ListView({
    dataSource: employees,
    fields: { id: 'id', text: 'text', groupBy: 'department' },
    enableVirtualization: true,
    height: '500px'
});

listView.appendTo('#listview');
```

See data-binding.md for advanced query patterns and nested-lists-navigation.md for hierarchical filtering.
