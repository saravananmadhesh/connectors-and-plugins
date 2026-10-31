# Dark Mode Implementation

## Table of Contents
- [Overview](#overview)
- [Global Dark Mode](#global-dark-mode)
- [Per-Component Dark Mode](#per-component-dark-mode)
- [Runtime Theme Switching](#runtime-theme-switching)

## Overview

Syncfusion Angular themes support both light and dark variants. Dark mode is toggled by applying the `e-dark-mode` CSS class to the `<body>` element or specific component containers.

**Supported themes with dark variants:**
- Tailwind 3.4 → tailwind3.css (light), tailwind3-dark.css (dark)
- Bootstrap 5.3 → bootstrap5.3.css (light), bootstrap5.3-dark.css (dark)
- Fluent 2 → fluent2.css (light), fluent2-dark.css (dark)
- Material 3 → material3.css (light), material3-dark.css (dark)

**How it works:**
- Import ONE theme CSS file (e.g., `tailwind3.css`)
- Apply `e-dark-mode` class to switch to dark variant
- Remove `e-dark-mode` class to return to light variant
- No need to import separate dark CSS files

## Global Dark Mode

Apply dark mode to all Syncfusion components by adding `e-dark-mode` to the `<body>` element.

### Static Dark Mode

```html
<!-- index.html -->
<body class="e-dark-mode">
  <app-root></app-root>
</body>
```

### Dynamic Dark Mode with State

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <div>
      <ejs-checkbox 
        label="Enable Dark Mode" 
        [checked]="isDarkMode" 
        (change)="handleDarkModeToggle($event)">
      </ejs-checkbox>
      <ejs-button cssClass="e-primary">Sample Button</ejs-button>
    </div>
  `
})
export class AppComponent {
  isDarkMode = false;

  handleDarkModeToggle(event: any): void {
    this.isDarkMode = event.checked ?? false;
    
    if (this.isDarkMode) {
      document.body.classList.add('e-dark-mode');
    } else {
      document.body.classList.remove('e-dark-mode');
    }
  }
}
```

## Per-Component Dark Mode

Apply dark mode to specific components or sections by adding `e-dark-mode` to the component's container.

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <div>
      <h2>Light Mode Section</h2>
      <div>
        <ejs-button cssClass="e-primary">Light Button</ejs-button>
      </div>
      
      <h2>Dark Mode Section</h2>
      <div class="e-dark-mode">
        <ejs-button cssClass="e-primary">Dark Button</ejs-button>
      </div>
    </div>
  `
})
export class AppComponent { }
```

### Multiple Sections with Different Modes

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <div>
      <!-- Light mode navigation -->
      <div class="nav-section">
        <ejs-button>Home</ejs-button>
        <ejs-button>About</ejs-button>
      </div>
      
      <!-- Dark mode content area -->
      <div class="e-dark-mode content-section">
        <ejs-grid [dataSource]="data">
          <e-columns>
            <e-column field='OrderID' width='100'></e-column>
            <e-column field='CustomerID' width='100'></e-column>
            <e-column field='Freight' width='100' format='C2'></e-column>
          </e-columns>
        </ejs-grid>
      </div>
    </div>
  `
})
export class AppComponent {
  data = [
    { OrderID: 10248, CustomerID: 'VINET', Freight: 32.38 },
    { OrderID: 10249, CustomerID: 'TOMSP', Freight: 11.61 }
  ];
}
```

## Runtime Theme Switching

### With localStorage Persistence

```typescript
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <div>
      <ejs-button (click)="toggleDarkMode()">
        Toggle {{ isDarkMode ? 'Light' : 'Dark' }} Mode
      </ejs-button>
    </div>
  `
})
export class AppComponent implements OnInit {
  isDarkMode = false;

  ngOnInit(): void {
    // Initialize from localStorage
    const saved = localStorage.getItem('darkMode');
    this.isDarkMode = saved === 'true';
    this.applyDarkMode();
  }

  toggleDarkMode(): void {
    this.isDarkMode = !this.isDarkMode;
    this.applyDarkMode();
    
    // Save to localStorage
    localStorage.setItem('darkMode', this.isDarkMode.toString());
  }

  private applyDarkMode(): void {
    if (this.isDarkMode) {
      document.body.classList.add('e-dark-mode');
    } else {
      document.body.classList.remove('e-dark-mode');
    }
  }
}
```

### With System Preference Detection

```typescript
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <div>
      <p>Current mode: {{ isDarkMode ? 'Dark' : 'Light' }}</p>
      <ejs-button (click)="toggleDarkMode()">
        Override System Preference
      </ejs-button>
    </div>
  `
})
export class AppComponent implements OnInit, OnDestroy {
  isDarkMode = false;
  private mediaQuery!: MediaQueryList;
  private mediaQueryListener!: (e: MediaQueryListEvent) => void;

  ngOnInit(): void {
    // Check system preference
    this.mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    this.isDarkMode = this.mediaQuery.matches;
    
    // Listen for system preference changes
    this.mediaQueryListener = (e: MediaQueryListEvent) => {
      this.isDarkMode = e.matches;
      this.applyDarkMode();
    };
    
    this.mediaQuery.addEventListener('change', this.mediaQueryListener);
    this.applyDarkMode();
  }

  ngOnDestroy(): void {
    this.mediaQuery.removeEventListener('change', this.mediaQueryListener);
  }

  toggleDarkMode(): void {
    this.isDarkMode = !this.isDarkMode;
    this.applyDarkMode();
  }

  private applyDarkMode(): void {
    if (this.isDarkMode) {
      document.body.classList.add('e-dark-mode');
    } else {
      document.body.classList.remove('e-dark-mode');
    }
  }
}
```
