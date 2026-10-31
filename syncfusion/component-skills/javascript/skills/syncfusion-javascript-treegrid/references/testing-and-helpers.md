# Testing & Test Helpers

## When to Use This Reference

**Read this file when you need to:**
- Write automated tests for TreeGrid using Cypress
- Access TreeGrid DOM elements programmatically in tests
- Set/get TreeGrid properties and methods from test code
- Initialize TreeGrid test helper for element interaction
- Verify TreeGrid behavior and data without manual testing
- Implement CI/CD pipeline automation for TreeGrid components
- Access pager, dialog, filter, header, and footer elements in tests

## Table of Contents
- [Overview](#overview)
- [Helper API Reference](#helper-api-reference)
- [Setting Up Cypress](#setting-up-cypress)
- [Writing Test Cases](#writing-test-cases)
- [Running Tests](#running-tests)
- [Best Practices](#best-practices)

## Overview

Essential JS 2 provides testing helper APIs for TreeGrid component enabling automated testing with Cypress. The `TreeGridHelper` class provides methods to interact with TreeGrid elements and properties programmatically.

```typescript
import { TreeGridHelper } from '@syncfusion/ej2-treegrid/helpers/e2e';

// Initialize helper
let curTreeGrid = new TreeGridHelper('TreeGrid', cy.get);
```

The helper eliminates need for complex CSS selectors and DOM queries, making tests more maintainable.

## Helper API Reference

| Method | Syntax | Purpose |
|--------|--------|---------|
| getTreeGridElement | `getTreeGridElement()` | Get root TreeGrid element |
| getHeaderElement | `getHeaderElement()` | Get header container element |
| getContentElement | `getContentElement()` | Get content/body container |
| getFooterElement | `getFooterElement()` | Get footer with aggregates |
| getPagerElement | `getPagerElement()` | Get pager container |
| getFilterPopUpElement | `getFilterPopUpElement()` | Get filter dialog |
| getDialogElement | `getDialogElement()` | Get edit dialog |
| getCurrentPagerElement | `getCurrentPagerElement()` | Get current page indicator |
| getPagerDropDownElement | `getPagerDropDownElement()` | Get page size dropdown |
| getExpandedElements | `getExpandedElements()` | Get all expanded row icons |
| getCollapsedElements | `getCollapsedElements()` | Get all collapsed row icons |
| setModel | `setModel(property, value)` | Set TreeGrid property |
| getModel | `getModel(property)` | Get TreeGrid property |
| invoke | `invoke(method, ...args)` | Call TreeGrid method |

## Setting Up Cypress

**Step 1: Create project directory**
```bash
mkdir cypress-test-project
cd cypress-test-project
npm init -y
```

**Step 2: Install dependencies**
```bash
npm install cypress @syncfusion/ej2-treegrid --save-dev
```

**Step 3: Initialize Cypress**
```bash
npx cypress open
```

This creates folder structure:
```
cypress/
├── support/
│   └── e2e.js
└── e2e/
    └── sample_spec.js
```

## Writing Test Cases

### Basic Setup

Create test file: `cypress/e2e/treegrid_spec.js`

```typescript
import { TreeGridHelper } from '@syncfusion/ej2-treegrid/helpers/e2e';

describe('TreeGrid Testing', () => {
    let curTreeGrid: any;

    beforeEach(() => {
        // Visit the application page
        cy.visit('ej2.syncfusion.com/demos/tree-grid/default-paging/index.html');
        
        // Initialize helper
        curTreeGrid = new TreeGridHelper('TreeGrid', cy.get);
    });

    it('should load treegrid', () => {
        curTreeGrid.getTreeGridElement().should('exist');
    });
});
```

### Using setModel & getModel

Set and retrieve TreeGrid properties:

```typescript
it('should toggle paging', () => {
    // Disable paging
    curTreeGrid.setModel('allowPaging', false);
    
    // Verify paging is disabled
    curTreeGrid.getModel('allowPaging').should('eq', false);
    
    // Enable paging
    curTreeGrid.setModel('allowPaging', true);
    curTreeGrid.getModel('allowPaging').should('eq', true);
});

it('should change page size', () => {
    curTreeGrid.setModel('pageSettings', { pageSize: 5 });
    curTreeGrid.getModel('pageSettings').then((settings: any) => {
        expect(settings.pageSize).to.equal(5);
    });
});

it('should enable multi-select', () => {
    curTreeGrid.setModel('selectionSettings', { type: 'Multiple' });
    curTreeGrid.getModel('selectionSettings').then((settings: any) => {
        expect(settings.type).to.equal('Multiple');
    });
});
```

### Using invoke Function

Call TreeGrid methods:

```typescript
it('should collapse all rows', () => {
    curTreeGrid.invoke('collapseAll');
    // Verify all collapse icons visible
    curTreeGrid.getCollapsedElements().then(($elements: any) => {
        expect($elements.length).to.be.greaterThan(0);
    });
});

it('should expand all rows', () => {
    curTreeGrid.invoke('expandAll');
    // Verify all expand icons visible
    curTreeGrid.getExpandedElements().then(($elements: any) => {
        expect($elements.length).to.be.greaterThan(0);
    });
});

it('should print treegrid', () => {
    curTreeGrid.invoke('print');
    // Verify print dialog appears (implementation specific)
});

it('should export to excel', () => {
    curTreeGrid.invoke('excelExport');
    // Verify download (requires file download handling in Cypress config)
});
```

### Testing Element Access

Get specific UI elements for interaction:

```typescript
it('should get header elements', () => {
    curTreeGrid.getHeaderElement().should('be.visible');
    curTreeGrid.getContentElement().should('exist');
    curTreeGrid.getPagerElement().should('exist');
});

it('should access filter dialog', () => {
    // Click filter button to open
    curTreeGrid.invoke('search', 'test');
    
    // Verify filter popup exists
    curTreeGrid.getFilterPopUpElement().should('exist');
});

it('should access edit dialog', () => {
    // Set dialog edit mode and trigger edit
    curTreeGrid.setModel('editSettings', { mode: 'Dialog' });
    curTreeGrid.invoke('startEdit');
    
    // Verify dialog element
    curTreeGrid.getDialogElement().should('be.visible');
});

it('should access pager controls', () => {
    curTreeGrid.getPagerElement().should('exist');
    curTreeGrid.getPagerDropDownElement().should('exist');
    curTreeGrid.getCurrentPagerElement().should('exist');
});
```

## Running Tests

**Option 1: Interactive mode**
```bash
npm run cypress:open
```
- Opens Cypress Test Runner UI
- Shows all test files
- Click test file to run and see results
- Watch changes live

**Option 2: Headless mode**
```bash
npm run cypress:run
```
- Runs all tests in background
- Generates report
- Suitable for CI/CD pipelines

**Option 3: Run specific test**
```bash
npx cypress run --spec "cypress/e2e/treegrid_spec.js"
```

**Browser options:**
```bash
npx cypress run --browser chrome
npx cypress run --browser firefox
npx cypress run --browser edge
```

## Best Practices

**1. Use Helpers Instead of Direct Selectors**
```typescript
// ✅ Good - uses helper
curTreeGrid.setModel('allowPaging', false);

// ❌ Avoid - brittle CSS selector
cy.get('[id="TreeGrid_pagerdiv"] .e-pagercontainer').click();
```

**2. Setup Data Before Each Test**
```typescript
beforeEach(() => {
    cy.visit('page');
    cy.fixture('sample-data').then(data => {
        curTreeGrid.setModel('dataSource', data);
    });
});
```

**3. Test Hierarchy Operations**
```typescript
it('should expand parent node', () => {
    // Find parent row with children
    curTreeGrid.invoke('expandRow', parentRowIndex);
    
    // Verify children visible
    curTreeGrid.getContentElement()
        .find('.e-treegrid .e-row')
        .should('have.length.greaterThan', 1);
});
```

**4. Cleanup After Tests**
```typescript
afterEach(() => {
    curTreeGrid.invoke('destroy');
});
```

**5. Add Meaningful Delays**
```typescript
it('should handle async operations', () => {
    curTreeGrid.invoke('someAsyncMethod');
    cy.wait(500); // Wait for operation
    curTreeGrid.getModel('someProperty').should('eq', expectedValue);
});
```
