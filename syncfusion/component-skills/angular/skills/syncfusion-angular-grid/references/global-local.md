# Global and Local Settings

## Table of Contents
- [When to Use This Skill](#when-to-use-this-skill)
- [Overview](#overview)
- [Keyboard Navigation](#keyboard-navigation)
- [Global Configuration](#global-configuration)
- [Locale Settings](#locale-settings)

## When to Use This Skill

Use this skill when you need to:
- **Keyboard shortcuts** — Enable grid navigation and operations via keyboard
- **Global settings** — Configure default behavior across all grid instances
- **Internationalization** — Support multiple languages and locales
- **Locale-specific formatting** — Format dates, numbers based on language
- **Accessibility** — Ensure keyboard navigation for screen readers
- **Regional settings** — Apply region-specific date/currency formats
- **Multi-language support** — Translate grid UI strings and messages

## Overview

Configure global and local grid settings for keyboard support, internationalization, and accessibility.

## Keyboard Navigation

Enable keyboard shortcuts for grid operations:

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-keyboard-grid',
  template: `
    <div style="padding: 10px; background-color: #f9f9f9;">
      <h4>Keyboard Shortcuts:</h4>
      <ul>
        <li>Tab - Navigate between cells</li>
        <li>Enter - Edit/Save cell</li>
        <li>Escape - Cancel edit</li>
        <li>Arrow Keys - Navigate</li>
        <li>Ctrl+C - Copy</li>
        <li>Ctrl+V - Paste</li>
      </ul>
    </div>
    
    <ejs-grid [dataSource]="data" 
              [allowSelection]="true"
              [selectionSettings]="{ mode: 'Cell', type: 'Multiple' }"
              [editSettings]="editSettings">
      <e-columns>
        <e-column field="OrderID" headerText="Order ID" width="100"></e-column>
        <e-column field="CustomerName" headerText="Customer Name" width="150"></e-column>
        <e-column field="Freight" headerText="Freight" type="number" format="C2" width="120"></e-column>
      </e-columns>
    </ejs-grid>
  `
})
export class KeyboardGridComponent {
  editSettings = {
    allowEditing: true,
    mode: 'Batch'
  };

  data = [
    { OrderID: 10248, CustomerName: 'VINET', Freight: 32.38 },
    { OrderID: 10249, CustomerName: 'TOMSP', Freight: 11.61 },
    { OrderID: 10250, CustomerName: 'HANAR', Freight: 65.83 }
  ];
}
```

## Global Configuration

Set global grid defaults:

```typescript
import { Component } from '@angular/core';
import { GridComponent } from '@syncfusion/ej2-angular-grids';

@Component({
  selector: 'app-global-config-grid',
  template: `
    <ejs-grid [dataSource]="data" 
              (created)="onGridCreated()">
      <e-columns>
        <e-column field="OrderID" headerText="Order ID" width="100"></e-column>
        <e-column field="CustomerName" headerText="Customer Name" width="150"></e-column>
        <e-column field="Freight" headerText="Freight" type="number" format="C2" width="120"></e-column>
      </e-columns>
    </ejs-grid>
  `
})
export class GlobalConfigGridComponent {
  data = [
    { OrderID: 10248, CustomerName: 'VINET', Freight: 32.38 },
    { OrderID: 10249, CustomerName: 'TOMSP', Freight: 11.61 }
  ];

  onGridCreated() {
    // Set global defaults for grid behavior
    GridComponent.Inject([
      // Features can be injected globally
    ]);
  }
}
```

## Locale Settings

Configure grid for different locales and languages:

```typescript
import { Component } from '@angular/core';
import { L10n } from '@syncfusion/ej2-base';

// Register localization strings
L10n.load({
  'de': {
    'grid': {
      'EmptyCaptionGroup': 'Keine Einträge zum Gruppieren',
      'EmptyTrackHeight': 'Höhe kann nicht null sein, wenn die Anzahl der verfolgten Elemente größer als 0 ist',
      'Columns': 'Spalten'
    }
  }
});

@Component({
  selector: 'app-locale-grid',
  template: `
    <select (change)="changeLocale($event)">
      <option value="en">English</option>
      <option value="de">Deutsch</option>
      <option value="fr">Français</option>
    </select>
    
    <ejs-grid [dataSource]="data" 
              [locale]="currentLocale"
              [allowPaging]="true"
              [toolbar]="['Add', 'Edit', 'Delete']">
      <e-columns>
        <e-column field="OrderID" headerText="Order ID" width="100"></e-column>
        <e-column field="CustomerName" headerText="Customer Name" width="150"></e-column>
      </e-columns>
    </ejs-grid>
  `
})
export class LocaleGridComponent {
  currentLocale = 'en';

  data = [
    { OrderID: 10248, CustomerName: 'VINET' },
    { OrderID: 10249, CustomerName: 'TOMSP' }
  ];

  changeLocale(event: any) {
    this.currentLocale = event.target.value;
    location.reload(); // Reload to apply locale
  }
}
```
