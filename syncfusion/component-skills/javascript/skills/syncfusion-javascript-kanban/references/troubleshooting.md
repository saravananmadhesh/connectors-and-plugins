# Kanban Troubleshooting Reference

This reference provides comprehensive solutions for common issues and implementation patterns for the Syncfusion TypeScript Kanban component based on how-to documentation.

## Table of Contents

- [Dynamically Changing Columns](#dynamically-changing-columns)
- [Filtering Cards](#filtering-cards)
- [Searching Cards](#searching-cards)
- [Header Double-Click Events](#header-double-click-events)
- [Common Issues and Solutions](#common-issues-and-solutions)
- [Best Practices](#best-practices)

## Dynamically Changing Columns

You can dynamically modify Kanban columns at runtime using the `columns` property.

### Modifying Column Properties

Change specific column properties like `allowToggle` dynamically:

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

// Button to modify specific column
let particularColumn: HTMLElement = document.getElementById('particularColumn');
particularColumn.onclick = () => {
    // Enable toggle for the second column (In Progress)
    kanbanObj.columns[1].allowToggle = true;
};
```

### Replacing All Columns

Replace the entire column configuration dynamically:

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

// Button to replace all columns
let columnButton: HTMLElement = document.getElementById('column');
columnButton.onclick = () => {
    // Replace with simplified column structure
    kanbanObj.columns = [
        { headerText: 'To Do', keyField: 'Open' },
        { headerText: 'Done', keyField: 'Close' }
    ];
};
```

### Complete HTML Implementation

```html
<!DOCTYPE html>
<html>
<head>
    <title>Dynamic Columns</title>
    <link href="https://cdn.syncfusion.com/ej2/material.css" rel="stylesheet" />
</head>
<body>
    <button id="particularColumn">Enable Toggle on In Progress</button>
    <button id="column">Simplify Columns</button>
    <div id="Kanban"></div>

    <script src="kanban-dynamic-columns.js"></script>
</body>
</html>
```

### Advanced Column Manipulation

#### Adding Columns Dynamically

```typescript
// Add a new column at runtime
let addColumnButton: HTMLElement = document.getElementById('addColumn');
addColumnButton.onclick = () => {
    const newColumns = [...kanbanObj.columns];
    newColumns.splice(2, 0, {
        headerText: 'Code Review',
        keyField: 'Review'
    });
    kanbanObj.columns = newColumns;
};
```

#### Removing Columns

```typescript
// Remove a specific column
let removeColumnButton: HTMLElement = document.getElementById('removeColumn');
removeColumnButton.onclick = () => {
    const filteredColumns = kanbanObj.columns.filter(
        col => col.keyField !== 'Testing'
    );
    kanbanObj.columns = filteredColumns;
};
```

#### Reordering Columns

```typescript
// Reorder columns
let reorderButton: HTMLElement = document.getElementById('reorder');
reorderButton.onclick = () => {
    const columns = kanbanObj.columns;
    // Swap first and last columns
    [columns[0], columns[columns.length - 1]] = 
    [columns[columns.length - 1], columns[0]];
    kanbanObj.columns = [...columns];
};
```

## Filtering Cards

Filter cards from the data source using the `query` property with Query objects.

### Basic Filtering

```typescript
import { Kanban } from '@syncfusion/ej2-kanban';
import { DropDownList, ChangeEventArgs } from '@syncfusion/ej2-dropdowns';
import { Query } from '@syncfusion/ej2-data';
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

// Dropdown for filtering
let priorityObj: DropDownList = new DropDownList({
    dataSource: ['None', 'High', 'Normal', 'Low'],
    index: 0,
    placeholder: 'Select a priority',
    width: 100,
    change: change
});
priorityObj.appendTo('#filter');

function change(args: ChangeEventArgs): void {
    let filterQuery: Query = new Query();
    if (args.value !== 'None') {
        filterQuery = new Query().where('Priority', 'equal', args.value);
    }
    kanbanObj.query = filterQuery;
}
```

### HTML Structure for Filtering

```html
<!DOCTYPE html>
<html>
<head>
    <title>Filter Cards</title>
    <link href="https://cdn.syncfusion.com/ej2/material.css" rel="stylesheet" />
</head>
<body>
    <div style="padding: 10px 0;">
        <label>Filter by Priority: </label>
        <input type="text" id="filter" />
    </div>
    <div id="Kanban"></div>

    <script src="kanban-filter.js"></script>
</body>
</html>
```

### Advanced Filtering

#### Multiple Criteria Filtering

```typescript
import { Query, Predicate } from '@syncfusion/ej2-data';

// Filter by multiple conditions
function applyMultipleFilters(): void {
    let query: Query = new Query()
        .where('Priority', 'equal', 'High')
        .where('Status', 'equal', 'InProgress');
    
    kanbanObj.query = query;
}

// Filter with OR conditions
function applyOrFilter(): void {
    let predicate: Predicate = new Predicate('Priority', 'equal', 'High')
        .or('Priority', 'equal', 'Critical');
    
    let query: Query = new Query().where(predicate);
    kanbanObj.query = query;
}
```

#### Date Range Filtering

```typescript
import { Query } from '@syncfusion/ej2-data';

function filterByDateRange(startDate: Date, endDate: Date): void {
    let query: Query = new Query()
        .where('DueDate', 'greaterthanorequal', startDate)
        .where('DueDate', 'lessthanorequal', endDate);
    
    kanbanObj.query = query;
}
```

#### Assignee Filtering

```typescript
import { MultiSelect } from '@syncfusion/ej2-dropdowns';
import { Query } from '@syncfusion/ej2-data';

let assigneeFilter: MultiSelect = new MultiSelect({
    dataSource: ['Nancy Davloio', 'Andrew Fuller', 'Janet Leverling'],
    placeholder: 'Select assignees',
    mode: 'CheckBox',
    change: (args) => {
        if (args.value && args.value.length > 0) {
            let query: Query = new Query()
                .where('Assignee', 'in', args.value);
            kanbanObj.query = query;
        } else {
            kanbanObj.query = new Query();
        }
    }
});
assigneeFilter.appendTo('#assigneeFilter');
```

#### Clear Filters

```typescript
function clearFilters(): void {
    kanbanObj.query = new Query();
    // Also reset filter UI controls
    priorityObj.value = 'None';
}
```

## Searching Cards

Implement search functionality using the `query` property with the `search` method.

### Basic Search Implementation

```typescript
import { Kanban } from '@syncfusion/ej2-kanban';
import { TextBox } from '@syncfusion/ej2-inputs';
import { Query } from '@syncfusion/ej2-data';
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

// Search textbox
let textObj: TextBox = new TextBox({
    placeholder: 'Enter search text',
    showClearButton: true,
    width: 180
});
textObj.appendTo('#search');

// Reset button
document.getElementById('reset').onclick = () => {
    textObj.value = '';
    kanbanObj.query = new Query();
};

// Search on keyup
document.getElementById('search').onkeyup = (e: KeyboardEvent) => {
    let searchValue: string = (<HTMLInputElement>e.target).value;
    let searchQuery: Query = new Query();
    
    if (searchValue !== '') {
        // Search in Id and Summary fields
        searchQuery = new Query().search(
            searchValue, 
            ['Id', 'Summary'], 
            'contains', 
            true  // ignoreCase
        );
    }
    kanbanObj.query = searchQuery;
};
```

### HTML Structure for Search

```html
<!DOCTYPE html>
<html>
<head>
    <title>Search Cards</title>
    <link href="https://cdn.syncfusion.com/ej2/material.css" rel="stylesheet" />
</head>
<body>
    <div style="padding: 10px 0;">
        <input type="text" id="search" />
        <button id="reset">Reset</button>
    </div>
    <div id="Kanban"></div>

    <script src="kanban-search.js"></script>
</body>
</html>
```

### Advanced Search Features

#### Multi-Field Search

```typescript
// Search across multiple fields
function searchMultipleFields(searchValue: string): void {
    if (searchValue !== '') {
        let searchQuery: Query = new Query().search(
            searchValue,
            ['Id', 'Summary', 'Assignee', 'Priority'],
            'contains',
            true
        );
        kanbanObj.query = searchQuery;
    } else {
        kanbanObj.query = new Query();
    }
}
```

#### Search with Debouncing

```typescript
let searchTimeout: number;

document.getElementById('search').oninput = (e: Event) => {
    clearTimeout(searchTimeout);
    
    searchTimeout = setTimeout(() => {
        let searchValue: string = (<HTMLInputElement>e.target).value;
        let searchQuery: Query = new Query();
        
        if (searchValue !== '') {
            searchQuery = new Query().search(
                searchValue,
                ['Id', 'Summary'],
                'contains',
                true
            );
        }
        kanbanObj.query = searchQuery;
    }, 300);  // Debounce delay
};
```

#### Search with Highlighting

```typescript
// Highlight search results
function highlightSearchResults(searchText: string): void {
    kanbanObj.cardRendered = (args) => {
        if (searchText) {
            const cardElement = args.element;
            const content = cardElement.textContent || '';
            
            if (content.toLowerCase().includes(searchText.toLowerCase())) {
                cardElement.style.border = '2px solid #ffeb3b';
                cardElement.style.backgroundColor = '#fffde7';
            }
        }
    };
    kanbanObj.refresh();
}
```

#### Search with Result Count

```typescript
function searchWithCount(searchValue: string): void {
    let searchQuery: Query = new Query();
    
    if (searchValue !== '') {
        searchQuery = new Query().search(
            searchValue,
            ['Id', 'Summary'],
            'contains',
            true
        );
    }
    
    kanbanObj.query = searchQuery;
    
    // Display result count after data is bound
    kanbanObj.dataBound = () => {
        const resultCount = kanbanObj.kanbanData.length;
        document.getElementById('resultCount').textContent = 
            `Found ${resultCount} card(s)`;
    };
}
```

## Header Double-Click Events

Bind custom actions to column header double-click events.

### Basic Implementation

```typescript
import { Kanban } from '@syncfusion/ej2-kanban';
import { DialogUtility } from '@syncfusion/ej2-popups';
import { closest } from '@syncfusion/ej2-base';
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
    dataBound: function () {
        // Bind double-click event after Kanban is rendered
        let headerEle: HTMLElement = document.querySelector('.e-header-row');
        headerEle.addEventListener("dblclick", function (e: Event) {
            let target = closest((<HTMLElement>e.target), '.e-header-cells');
            
            if (target) {
                let headerText = (<HTMLElement>target.querySelector('.e-header-text')).innerText;
                
                DialogUtility.alert({
                    title: 'Header',
                    content: `Double clicked on ${headerText} header`,
                    showCloseIcon: true,
                    closeOnEscape: true,
                    animationSettings: { effect: 'Zoom' }
                });
            }
        });
    }
});
kanbanObj.appendTo('#Kanban');
```

### Advanced Header Interactions

#### Edit Column Settings on Double-Click

```typescript
import { Dialog } from '@syncfusion/ej2-popups';
import { TextBox, NumericTextBox } from '@syncfusion/ej2-inputs';

let columnSettingsDialog: Dialog;

kanbanObj.dataBound = function () {
    let headerEle: HTMLElement = document.querySelector('.e-header-row');
    
    headerEle.addEventListener("dblclick", function (e: Event) {
        let target = closest((<HTMLElement>e.target), '.e-header-cells');
        
        if (target) {
            const columnIndex = Array.from(target.parentElement.children)
                .indexOf(target);
            const column = kanbanObj.columns[columnIndex];
            
            // Open dialog to edit column settings
            openColumnSettingsDialog(column, columnIndex);
        }
    });
};

function openColumnSettingsDialog(column: any, columnIndex: number): void {
    // Create dialog with column settings
    columnSettingsDialog = new Dialog({
        header: 'Edit Column Settings',
        content: `
            <div>
                <label>Header Text:</label>
                <input id="headerText" value="${column.headerText}" />
            </div>
            <div>
                <label>Min Count:</label>
                <input id="minCount" value="${column.minCount || 0}" />
            </div>
            <div>
                <label>Max Count:</label>
                <input id="maxCount" value="${column.maxCount || 0}" />
            </div>
        `,
        buttons: [{
            click: () => {
                // Update column settings
                const headerText = (<HTMLInputElement>document.getElementById('headerText')).value;
                const minCount = parseInt((<HTMLInputElement>document.getElementById('minCount')).value);
                const maxCount = parseInt((<HTMLInputElement>document.getElementById('maxCount')).value);
                
                kanbanObj.columns[columnIndex].headerText = headerText;
                kanbanObj.columns[columnIndex].minCount = minCount;
                kanbanObj.columns[columnIndex].maxCount = maxCount;
                
                columnSettingsDialog.hide();
            },
            buttonModel: { content: 'Save', isPrimary: true }
        }],
        width: '400px',
        showCloseIcon: true,
        target: document.body
    });
    
    columnSettingsDialog.appendTo('#columnSettingsDialog');
    columnSettingsDialog.show();
}
```

#### Add New Card on Header Double-Click

```typescript
kanbanObj.dataBound = function () {
    let headerEle: HTMLElement = document.querySelector('.e-header-row');
    
    headerEle.addEventListener("dblclick", function (e: Event) {
        let target = closest((<HTMLElement>e.target), '.e-header-cells');
        
        if (target) {
            const columnIndex = Array.from(target.parentElement.children)
                .indexOf(target);
            const column = kanbanObj.columns[columnIndex];
            
            // Open add dialog with pre-selected status
            kanbanObj.openDialog('Add', {
                Status: column.keyField,
                Priority: 'Normal'
            });
        }
    });
};
```

#### Show Column Statistics

```typescript
import { DialogUtility } from '@syncfusion/ej2-popups';

kanbanObj.dataBound = function () {
    let headerEle: HTMLElement = document.querySelector('.e-header-row');
    
    headerEle.addEventListener("dblclick", function (e: Event) {
        let target = closest((<HTMLElement>e.target), '.e-header-cells');
        
        if (target) {
            const columnIndex = Array.from(target.parentElement.children)
                .indexOf(target);
            const column = kanbanObj.columns[columnIndex];
            
            // Calculate statistics
            const cards = kanbanObj.kanbanData.filter(
                (card: any) => card[kanbanObj.keyField] === column.keyField
            );
            
            const highPriority = cards.filter(
                (card: any) => card.Priority === 'High'
            ).length;
            
            const content = `
                <div>
                    <p><strong>Total Cards:</strong> ${cards.length}</p>
                    <p><strong>High Priority:</strong> ${highPriority}</p>
                    <p><strong>Min Count:</strong> ${column.minCount || 'Not set'}</p>
                    <p><strong>Max Count:</strong> ${column.maxCount || 'Not set'}</p>
                </div>
            `;
            
            DialogUtility.alert({
                title: `${column.headerText} Statistics`,
                content: content,
                showCloseIcon: true,
                closeOnEscape: true,
                animationSettings: { effect: 'Zoom' }
            });
        }
    });
};
```

## Common Issues and Solutions

### Data Binding Issues

**Issue**: Cards not displaying
- **Solution**: Verify `keyField` matches data source field
- **Solution**: Check `cardSettings.headerField` and `contentField` mappings
- **Solution**: Ensure data source is not empty
- **Solution**: Check browser console for errors

**Issue**: Cards appearing in wrong columns
- **Solution**: Verify column `keyField` values match data source values exactly
- **Solution**: Check for case sensitivity in field values
- **Solution**: Ensure data source doesn't have null/undefined status values

### Performance Issues

**Issue**: Slow rendering with large datasets
- **Solution**: Enable virtual scrolling with `enableVirtualization: true`
- **Solution**: Set explicit `cardHeight` property
- **Solution**: Implement server-side paging
- **Solution**: Reduce card template complexity

**Issue**: Sluggish drag and drop
- **Solution**: Minimize DOM operations in event handlers
- **Solution**: Use CSS transforms instead of position changes
- **Solution**: Disable animations during drag
- **Solution**: Optimize card templates

### Query and Filter Issues

**Issue**: Filter not working
- **Solution**: Verify field names are correct and match data source
- **Solution**: Check data types (e.g., string vs number)
- **Solution**: Ensure `Query` object is properly constructed
- **Solution**: Clear previous queries before applying new ones

**Issue**: Search returning no results
- **Solution**: Verify field names in search array
- **Solution**: Check `ignoreCase` parameter
- **Solution**: Ensure search value is not empty
- **Solution**: Test with `console.log` to debug query

### Event Handler Issues

**Issue**: Events not firing
- **Solution**: Verify event handler names are correct
- **Solution**: Check if event is attached after component initialization
- **Solution**: Ensure no errors in event handler code
- **Solution**: Use `dataBound` event for DOM manipulation

**Issue**: Double-click not working
- **Solution**: Ensure `dataBound` event is used for binding
- **Solution**: Check for event bubbling issues
- **Solution**: Verify element selectors are correct
- **Solution**: Test with simple `console.log` first

## Best Practices

### 1. Always Validate Data

```typescript
// Validate data before operations
function validateCardData(data: any): boolean {
    return data &&
           data.hasOwnProperty('Id') &&
           data.hasOwnProperty('Status') &&
           data.hasOwnProperty('Summary');
}
```

### 2. Use Type Safety

```typescript
interface KanbanCard {
    Id: string;
    Status: string;
    Summary: string;
    Priority?: string;
    Assignee?: string;
}

let kanbanData: KanbanCard[] = [
    { Id: '1', Status: 'Open', Summary: 'Task 1', Priority: 'High' }
];
```

### 3. Handle Edge Cases

```typescript
// Handle empty search
if (!searchValue || searchValue.trim() === '') {
    kanbanObj.query = new Query();
    return;
}

// Handle null values in data
kanbanObj.cardRendered = (args) => {
    const data = args.data;
    if (!data.Assignee) {
        data.Assignee = 'Unassigned';
    }
};
```

### 4. Provide User Feedback

```typescript
// Show loading indicator
function applyFilter(filterValue: string): void {
    showLoading();
    
    setTimeout(() => {
        let query = new Query().where('Priority', 'equal', filterValue);
        kanbanObj.query = query;
        hideLoading();
        
        showToast(`Filter applied: ${filterValue}`);
    }, 100);
}
```

### 5. Clean Up Event Listeners

```typescript
let headerElement: HTMLElement;

kanbanObj.dataBound = function () {
    // Remove old listener if exists
    if (headerElement) {
        headerElement.removeEventListener("dblclick", handleDoubleClick);
    }
    
    headerElement = document.querySelector('.e-header-row');
    headerElement.addEventListener("dblclick", handleDoubleClick);
};

function handleDoubleClick(e: Event): void {
    // Handle double-click
}
```

### 6. Implement Error Handling

```typescript
try {
    let query = new Query().where('Priority', 'equal', filterValue);
    kanbanObj.query = query;
} catch (error) {
    console.error('Error applying filter:', error);
    showErrorMessage('Failed to apply filter. Please try again.');
}
```

### 7. Document Custom Implementations

```typescript
/**
 * Dynamically changes the Kanban columns configuration
 * @param {Array} newColumns - Array of column objects
 * @returns {void}
 */
function updateColumns(newColumns: any[]): void {
    if (!newColumns || newColumns.length === 0) {
        console.warn('No columns provided');
        return;
    }
    kanbanObj.columns = newColumns;
}
```

### 8. Test Thoroughly

- Test with empty data
- Test with large datasets
- Test all filter combinations
- Test search with special characters
- Test dynamic column changes with existing cards
- Test event handlers on different browsers
- Test mobile responsiveness

### 9. Optimize Query Performance

```typescript
// Cache frequently used queries
const priorityQueries = {
    'High': new Query().where('Priority', 'equal', 'High'),
    'Normal': new Query().where('Priority', 'equal', 'Normal'),
    'Low': new Query().where('Priority', 'equal', 'Low')
};

function applyPriorityFilter(priority: string): void {
    kanbanObj.query = priorityQueries[priority] || new Query();
}
```

### 10. Use Consistent Naming

```typescript
// Good naming convention
let kanbanObj: Kanban;
let searchTextBox: TextBox;
let priorityDropDown: DropDownList;

function handleSearchInput(e: Event): void { }
function applyPriorityFilter(value: string): void { }
function updateColumnConfiguration(columns: any[]): void { }
```
