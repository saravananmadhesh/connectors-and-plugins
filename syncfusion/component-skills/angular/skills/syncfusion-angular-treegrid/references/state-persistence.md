---
name: State-persistence
description: 'State persistence in Syncfusion Angular TreeGrid - auto save and restore state, localStorage integration, custom state management, and state events.'
---

# State Persistence

State persistence saves and restores TreeGrid settings like sorting, filtering, and expansion state.

## When to Use

Use state persistence when you need to:
- **Save user preferences** — Remember column order, width, visibility
- **Preserve filters** — Restore applied filters on page reload
- **Maintain sort order** — Keep sorting preferences
- **Save expansion state** — Remember which rows were expanded
- **Restore position** — Return to same scroll position
- **Session continuity** — Provide seamless user experience across sessions
- **localStorage/sessionStorage** — Store state locally for quick access

## Table of Contents
- [Enable State Persistence](#enable-state-persistence)
- [Storage Methods](#storage-methods)
- [Custom State Management](#custom-state-management)

## Enable State Persistence

### Basic Persistence

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-treegrid',
  template: `
    <ejs-treegrid 
      id='TreeGrid'
      [dataSource]='data'
      [childMapping]='childMapping'
      [enablePersistence]='true'>
      <e-columns>
        <e-column field='TaskID' headerText='Task ID' width='90'></e-column>
        <e-column field='TaskName' headerText='Task Name' width='200'></e-column>
      </e-columns>
    </ejs-treegrid>
  `
})
export class AppComponent {
  public data: Object[] = [];
  public childMapping: string = 'subtasks';
}
```

## Storage Methods

### LocalStorage

```typescript
<ejs-treegrid 
  [enablePersistence]='true'>
  <!-- columns -->
</ejs-treegrid>
```

### SessionStorage

> 🔒 **Security Warning:** `localStorage` and `sessionStorage` store data **unencrypted** in the browser. **Never store sensitive data** (passwords, tokens, PII, payment info, user secrets, authentication credentials) in persisted TreeGrid state. State persistence is safe for **UI state only** (expand/collapse state, page number, sort order, column visibility, filter selections). For sensitive configuration or user data, use secure server-side session storage instead.

// Get in component
```typescript
let value: string = window.localStorage.getItem('treegridTreeGrid'); // treegrid - component name, TreeGrid - component id
let model: Object = JSON.parse(value);
```

// Set in component
```typescript
window.localStorage.setItem('treegridTreeGrid', JSON.stringify(this.getState())); // treegrid - component name, TreeGrid - component id
```

## Custom State Management

### Save State Manually

> 🔒 **Security Warning:** `localStorage` and `sessionStorage` store data **unencrypted** in the browser. **Never store sensitive data** (passwords, tokens, PII, payment info, user secrets, authentication credentials) in persisted TreeGrid state. State persistence is safe for **UI state only** (expand/collapse state, page number, sort order, column visibility, filter selections). For sensitive configuration or user data, use secure server-side session storage instead.

```typescript
getSavedState() {
  const state: any = {};
  // Save sort settings
  state.sortSettings = this.treegrid.sortSettings;
  // Save filter settings
  state.filterSettings = this.treegrid.filterSettings;
  
  localStorage.setItem('treegridTreeGrid', JSON.stringify(state));
}
```

### Restore State Manually

> 🔒 **Security Warning:** `localStorage` and `sessionStorage` store data **unencrypted** in the browser. **Never store sensitive data** (passwords, tokens, PII, payment info, user secrets, authentication credentials) in persisted TreeGrid state. State persistence is safe for **UI state only** (expand/collapse state, page number, sort order, column visibility, filter selections). For sensitive configuration or user data, use secure server-side session storage instead.

```typescript
restoreSavedState() {
  const savedState = localStorage.getItem('treegridTreeGrid');
  if (savedState) {
    const state = JSON.parse(savedState);
    this.treegrid.sortSettings = state.sortSettings;
    this.treegrid.filterSettings = state.filterSettings;
  }
}
```
