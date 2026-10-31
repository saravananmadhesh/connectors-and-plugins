# Filtering & Sorting TreeView

## Table of Contents
- [Overview](#overview)
- [Sorting Nodes](#sorting-nodes)
- [Filtering Nodes](#filtering-nodes)
- [Search Functionality](#search-functionality)
- [Dynamic Filtering](#dynamic-filtering)
- [Performance Tips](#performance-tips)

---

## Overview

TreeView provides built-in sorting and filtering capabilities to organize and search hierarchical data effectively.

## Sorting Nodes

### Sort Entire Tree

Use `sortOrder` property to sort all nodes:

```typescript
import { Component } from '@angular/core';
import { TreeViewModule } from '@syncfusion/ej2-angular-navigations';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-sorted-tree',
  standalone: true,
  imports: [FormsModule, TreeViewModule],
  template: `
    <ejs-treeview 
      [fields]="treeFields"
      [sortOrder]="'Ascending'">
    </ejs-treeview>
  `
})
export class SortedTreeComponent {
  treeFields = {
    dataSource: [
      { id: 1, name: 'Zebra', hasChild: true },
      { id: 2, name: 'Apple', hasChild: true },
      { id: 3, name: 'Mango' }
    ],
    id: 'id',
    text: 'name'
  };
}
```

### Sort Order Options

```typescript
sortOrder = 'None';        // No sorting (default)
sortOrder = 'Ascending';   // A-Z, 0-9
sortOrder = 'Descending';  // Z-A, 9-0
```

### Sort by Specific Property

```typescript
import { DataManager, Query, Predicate } from '@syncfusion/ej2-data';

export class SortByPropertyComponent {
  treeFields = {
    dataSource: new DataManager(this.treeData).executeLocal(
      new Query().sortBy('priority', false)
    ),
    id: 'id',
    text: 'name'
  };

  treeData = [
    { id: 1, name: 'High Priority', priority: 1 },
    { id: 2, name: 'Low Priority', priority: 3 },
    { id: 3, name: 'Medium Priority', priority: 2 }
  ];
}
```

### Level-Wise Sorting

Sort only specific tree levels:

```typescript
import { Component, ViewChild } from '@angular/core';
import { TreeViewComponent } from '@syncfusion/ej2-angular-navigations';
import { DataManager, Query } from '@syncfusion/ej2-data';

@Component({
  template: `
    <button (click)="sortFirstLevel()">Sort Parent Nodes</button>
    <ejs-treeview #treeview [fields]="treeFields" (nodeExpanding)="onNodeExpanding($event)">
    </ejs-treeview>
  `
})
export class LevelWiseSortComponent {
  @ViewChild('treeview') treeViewComponent?: TreeViewComponent;

  treeFields = {
    dataSource: [
      { id: 1, name: 'India', hasChild: true, expanded: true },
      { id: 2, name: 'Brazil', hasChild: true },
      { id: 3, name: 'Africa', hasChild: true }
    ],
    id: 'id',
    parentID: 'pid',
    text: 'name'
  };

  sortFirstLevel(): void {
    // Sort only root level
    const sortedData = new DataManager(this.treeFields.dataSource).executeLocal(
      new Query().sortBy('name')
    );
    this.treeFields.dataSource = sortedData;
  }

  onNodeExpanding(event: any): void {
    // Sort children on expansion
    const allData = this.treeViewComponent?.getTreeData() || [];
    const childData = allData.filter((item: any) => 
      item.parentID === event.nodeData.id
    );
    
    if (childData.length > 1) {
      const sortedChildren = new DataManager(childData).executeLocal(
        new Query().sortBy('name')
      );
      // Replace unsorted children with sorted
    }
  }
}
```

## Filtering Nodes

### Basic Filter

Filter nodes by text:

```typescript
import { Component, ViewChild } from '@angular/core';
import { TreeViewComponent, FieldsSettingsModel } from '@syncfusion/ej2-angular-navigations';
import { DataManager, Query, Predicate } from '@syncfusion/ej2-data';

@Component({
  selector: 'app-filter-tree',
  template: `
    <input 
      type="text" 
      placeholder="Search nodes..."
      (keyup)="onFilterChange($event.target.value)"
      class="filter-input">
    
    <ejs-treeview #treeview [fields]="filteredFields"></ejs-treeview>
  `,
  styles: [`
    .filter-input {
      width: 100%;
      padding: 10px;
      margin-bottom: 10px;
      border: 1px solid #ddd;
      border-radius: 4px;
    }
  `]
})
export class FilterTreeComponent {
  @ViewChild('treeview') treeViewComponent?: TreeViewComponent;

  originalData = [
    { id: 1, name: 'Australia', hasChild: true },
    { id: 2, pid: 1, name: 'New South Wales' },
    { id: 3, pid: 1, name: 'Victoria' },
    { id: 4, name: 'Brazil', hasChild: true },
    { id: 5, pid: 4, name: 'Paraná' }
  ];

  filteredFields: any = {
    dataSource: this.originalData,
    id: 'id',
    parentID: 'pid',
    text: 'name'
  };

  onFilterChange(filterText: string): void {
    if (!filterText) {
      this.filteredFields.dataSource = this.originalData;
      return;
    }

    // Filter nodes containing search text
    const filtered = new DataManager(this.originalData).executeLocal(
      new Query().where('name', 'contains', filterText, true)
    );

    // Include parent nodes of matching items
    const result = this.getNodeWithParents(filtered);
    this.filteredFields.dataSource = result;
  }

  getNodeWithParents(filteredNodes: any[]): any[] {
    const nodeIds = filteredNodes.map((n: any) => n.id);
    const withParents = [...filteredNodes];

    // Add parent nodes for context
    filteredNodes.forEach((node: any) => {
      this.getAncestors(node.parentID, withParents, nodeIds);
    });

    return withParents;
  }

  getAncestors(parentId: any, result: any[], nodeIds: any[]): void {
    if (!parentId) return;
    const parent = this.originalData.find((n: any) => n.id === parentId);
    if (parent && !nodeIds.includes(parent.id)) {
      result.push(parent);
      nodeIds.push(parent.id);
      this.getAncestors(parent.parentID, result, nodeIds);
    }
  }
}
```

### Case-Insensitive Filter

```typescript
onFilterChange(filterText: string): void {
  const filtered = new DataManager(this.originalData).executeLocal(
    new Query().where('name', 'contains', filterText.toLowerCase(), true)
  );
  
  this.filteredFields.dataSource = filtered;
}
```

### Filter by Multiple Criteria

```typescript
filterByMultipleCriteria(filterText: string, status: string): void {
  const predicate = new Predicate('name', 'contains', filterText)
    .and(new Predicate('status', '==', status));
  
  const filtered = new DataManager(this.originalData).executeLocal(
    new Query().where(predicate)
  );
  
  this.filteredFields.dataSource = filtered;
}
```

## Search Functionality

### Real-Time Search with Highlight

```typescript
@Component({
  template: `
    <input 
      type="text" 
      placeholder="Search..."
      (keyup)="onSearch($event.target.value)"
      class="search-input">
    
    <div class="result-count" *ngIf="searchResults.length > 0">
      Found: {{searchResults.length}} results
    </div>
    
    <ejs-treeview #treeview [fields]="treeFields"></ejs-treeview>
  `
})
export class SearchComponent {
  @ViewChild('treeview') treeViewComponent?: TreeViewComponent;

  originalData = [];
  searchResults: any[] = [];

  onSearch(query: string): void {
    if (query.length < 2) {
      // Reset to original data
      return;
    }

    this.searchResults = this.performSearch(query);
    this.highlightResults();
  }

  performSearch(query: string): any[] {
    const allNodes = this.treeViewComponent?.getTreeData() || [];
    return allNodes.filter((node: any) =>
      node.name.toLowerCase().includes(query.toLowerCase())
    );
  }

  highlightResults(): void {
    this.treeViewComponent?.element?.querySelectorAll('.e-list-text').forEach(element => {
      element.classList.remove('search-highlight');
    });

    this.searchResults.forEach(result => {
      const nodeElement = this.treeViewComponent?.element?.querySelector(
        `[data-uid="${result.id}"] .e-list-text`
      );
      if (nodeElement) {
        nodeElement.classList.add('search-highlight');
      }
    });
  }
}

/* CSS */
.search-highlight {
  background-color: yellow !important;
  font-weight: bold;
}

.result-count {
  padding: 8px;
  font-size: 12px;
  color: #666;
}
```

### Search with Suggestion

```typescript
@Component({
  template: `
    <div class="search-container">
      <input 
        type="text" 
        placeholder="Type to search..."
        (keyup)="onSearchInput($event)"
        class="search-input">
      
      <ul *ngIf="suggestions.length > 0" class="suggestions">
        <li *ngFor="let suggestion of suggestions" 
            (click)="selectSuggestion(suggestion)">
          {{suggestion.name}}
        </li>
      </ul>
    </div>
    
    <ejs-treeview #treeview [fields]="treeFields"></ejs-treeview>
  `
})
export class SearchSuggestionComponent {
  @ViewChild('treeview') treeViewComponent?: TreeViewComponent;

  suggestions: any[] = [];

  onSearchInput(event: any): void {
    const query = event.target.value;
    
    if (query.length < 1) {
      this.suggestions = [];
      return;
    }

    const allNodes = this.treeViewComponent?.getTreeData() || [];
    this.suggestions = allNodes
      .filter((n: any) => n.name.toLowerCase().includes(query.toLowerCase()))
      .slice(0, 10);  // Limit to 10 suggestions
  }

  selectSuggestion(suggestion: any): void {
    this.treeViewComponent?.ensureVisible(suggestion.id);
    this.treeViewComponent?.selectAll([suggestion.id]);
    this.suggestions = [];
  }
}
```

## Dynamic Filtering

### Filter on Property Change

```typescript
@Component({
  template: `
    <label>
      Show only active items:
      <input type="checkbox" (change)="toggleActiveOnly($event)">
    </label>
    
    <ejs-treeview [fields]="treeFields"></ejs-treeview>
  `
})
export class DynamicFilterComponent {
  @ViewChild('treeview') treeViewComponent?: TreeViewComponent;

  originalData = [
    { id: 1, name: 'Item 1', status: 'active' },
    { id: 2, name: 'Item 2', status: 'inactive' }
  ];

  treeFields: any = { /* ... */ };

  toggleActiveOnly(event: any): void {
    if (event.target.checked) {
      const filtered = this.originalData.filter((n: any) => n.status === 'active');
      this.treeFields.dataSource = filtered;
    } else {
      this.treeFields.dataSource = this.originalData;
    }
  }
}
```

## Performance Tips

### Debounce Filter Input

```typescript
import { Component } from '@angular/core';

@Component({
  template: `
    <input 
      type="text" 
      (keyup)="onFilterInput($event)"
      placeholder="Search (debounced)...">
  `
})
export class DebounceFilterComponent {
  private filterTimeout: any;

  onFilterInput(event: any): void {
    // Clear previous timeout
    if (this.filterTimeout) {
      clearTimeout(this.filterTimeout);
    }
    
    // Set new timeout for 300ms after user stops typing
    this.filterTimeout = setTimeout(() => {
      this.applyFilter(event.target.value);
    }, 300);
  }

  applyFilter(filterText: string): void {
    // Perform actual filtering after debounce
  }
}
```

**Alternative using RxJS:**

```typescript
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

export class RxJSDebounceComponent {
  private filterSubject = new Subject<string>();

  ngOnInit(): void {
    this.filterSubject
      .pipe(
        debounceTime(300),
        distinctUntilChanged()
      )
      .subscribe((filterText: string) => {
        this.applyFilter(filterText);
      });
  }

  onFilterInput(event: any): void {
    this.filterSubject.next(event.target.value);
  }

  applyFilter(filterText: string): void {
    // Perform filtering
  }
}
```

### Lazy Load Filtered Results

```typescript
loadMoreResults(): void {
  // Load next batch of filtered results
  const nextBatch = this.allFilteredResults.slice(
    this.loadedCount,
    this.loadedCount + 20
  );
  
  this.treeViewComponent?.addNodes(nextBatch);
  this.loadedCount += 20;
}
```

---

**Best Practices:**
- Debounce filter input for better performance
- Show parent nodes when filtering children for context
- Highlight matching results
- Limit suggestions/results display
- Use appropriate sort order for your use case
- Cache original data for fast resets
- Consider server-side filtering for very large datasets
