# Drilldown and Navigation in Angular TreeMap

## Table of Contents

- [Overview](#overview)
  - [What was corrected without removing built-in Syncfusion features](#what-was-corrected-without-removing-built-in-syncfusion-features)
- [Enabling Drilldown](#enabling-drilldown)
  - [Basic Drilldown Setup](#basic-drilldown-setup)
- [Parent-Child Navigation](#parent-child-navigation)
  - [Understanding Navigation Flow](#understanding-navigation-flow)
  - [Three-Level Hierarchy Example](#three-level-hierarchy-example)
  - [Header Customization at Each Level](#header-customization-at-each-level)
- [On-Demand Data Loading](#on-demand-data-loading)
  - [Enable DrillDownView](#enable-drilldownview)
  - [Data Structure with On-Demand](#data-structure-with-on-demand)
- [Breadcrumb Navigation](#breadcrumb-navigation)
  - [Enable Breadcrumb](#enable-breadcrumb)
  - [Breadcrumb Connector Options](#breadcrumb-connector-options)
  - [Click Breadcrumb to Navigate Up](#click-breadcrumb-to-navigate-up)
- [Back Navigation](#back-navigation)
  - [Programmatic Back Navigation](#programmatic-back-navigation)
  - [Reset to Root Using Angular State](#reset-to-root-using-angular-state)
  - [Root-Level Detection](#root-level-detection)
- [Drill Down Events](#drill-down-events)
  - [Listen to Drill Down Actions](#listen-to-drill-down-actions)
  - [Event Properties](#event-properties)
  - [Track Navigation History](#track-navigation-history)
- [Best Practices](#best-practices)
  - [DO: Use Meaningful Header Formats](#do-use-meaningful-header-formats)
  - [DON'T: Use Unclear Headers](#dont-use-unclear-headers)
  - [DO: Include Aggregated Totals](#do-include-aggregated-totals)
  - [DO: Provide Visual Feedback](#do-provide-visual-feedback)
  - [DO: Limit Hierarchy Depth](#do-limit-hierarchy-depth)
  - [Troubleshooting](#troubleshooting)

## Overview

Drilldown in the Syncfusion Angular TreeMap is a built-in navigation feature that lets users move from a higher grouping level to a lower grouping level by clicking items. The original content was mostly correct, but a few definitions and event names needed to be adjusted to better match the built-in Angular TreeMap API.

### What was corrected without removing built-in Syncfusion features

- `TreeMapAllModule` was not removed as a Syncfusion module, but the examples were updated to use `TreeMapModule` only for cleaner standalone Angular usage.
- The drilldown examples were updated to use normal Angular template markup instead of escaped HTML.
- The event names were corrected from `drillDown` and `drillUp` to the documented TreeMap drill events such as `drillStart` and `drillEnd`.
- The back-navigation section was redefined because a public Angular TreeMap `drillUp()` method is not part of the documented API pattern shown for the component. Built-in navigation is primarily handled by clicking the drilled node path and by using breadcrumb support.
- The examples were updated to use modern Angular patterns such as standalone components and Signals.

## Enabling Drilldown

Drilldown is enabled by setting `enableDrillDown` to `true`. TreeMap then lets the user click a rendered group and move into the next hierarchy level.

### Basic Drilldown Setup

```typescript
import { Component, signal } from '@angular/core';
import { TreeMapModule } from '@syncfusion/ej2-angular-treemap';

@Component({
  selector: 'app-treemap',
  standalone: true,
  imports: [TreeMapModule],
  template: `
    <ejs-treemap
      id="treemap-container"
      [dataSource]="data()"
      weightValuePath="Value"
      [enableDrillDown]="true"
      [levels]="levels"
      [leafItemSettings]="leafItemSettings">
    </ejs-treemap>
  `,
  styles: [`
    :host {
      display: block;
      padding: 12px;
      box-sizing: border-box;
    }

    #treemap-container {
      display: block;
      width: 100%;
      height: 520px;
    }
  `]
})
export class TreeMapComponent {
  public data = signal([
    { Region: 'North America', Country: 'United States', Value: 25460 },
    { Region: 'North America', Country: 'Canada', Value: 1841 },
    { Region: 'Europe', Country: 'Germany', Value: 3846 },
    { Region: 'Europe', Country: 'France', Value: 2781 },
    { Region: 'Asia', Country: 'China', Value: 17734 },
    { Region: 'Asia', Country: 'Japan', Value: 4909 }
  ]);

  public levels = [
    { groupPath: 'Region', headerFormat: '${Region}' },
    { groupPath: 'Country', headerFormat: '${Country}' }
  ];

  public leafItemSettings = {
    labelPath: 'Country',
    gap: 4,
    border: { color: '#ffffff', width: 1 }
  };
}
```

**Behavior:** Clicking a region drills into the countries grouped inside that region.

## Parent-Child Navigation

TreeMap drilldown is driven by grouped hierarchy fields configured through `levels`. Each click moves from one grouping layer to the next rendered grouping layer.

### Understanding Navigation Flow

When drilldown is enabled:

1. The initial view renders the current top grouping level.
2. Clicking a parent group drills into the next configured level.
3. The header updates to reflect the current context.
4. Users can move back through the built-in drill navigation path, especially when breadcrumb is enabled.

### Three-Level Hierarchy Example

```typescript
import { Component, signal } from '@angular/core';
import { TreeMapModule } from '@syncfusion/ej2-angular-treemap';

@Component({
  selector: 'app-treemap',
  standalone: true,
  imports: [TreeMapModule],
  template: `
    <ejs-treemap
      id="treemap-container"
      [dataSource]="data()"
      weightValuePath="Value"
      [enableDrillDown]="true"
      [levels]="levels"
      [leafItemSettings]="leafItemSettings">
    </ejs-treemap>
  `
})
export class TreeMapComponent {
  public data = signal([
    { Continent: 'North America', Region: 'Northeast', State: 'New York', Value: 500 },
    { Continent: 'North America', Region: 'Northeast', State: 'Boston', Value: 400 },
    { Continent: 'North America', Region: 'Southwest', State: 'Texas', Value: 600 },
    { Continent: 'Europe', Region: 'Western', State: 'France', Value: 550 }
  ]);

  public levels = [
    { groupPath: 'Continent', headerFormat: '${Continent}' },
    { groupPath: 'Region', headerFormat: '${Region}' },
    { groupPath: 'State', headerFormat: '${State}' }
  ];

  public leafItemSettings = {
    labelPath: 'State',
    gap: 4,
    border: { color: '#ffffff', width: 1 }
  };
}
```

**Navigation Example:**

- Click `North America` to drill into `Northeast` and `Southwest`
- Click `Northeast` to drill into `New York` and `Boston`

### Header Customization at Each Level

You can customize the header text and style per level using `headerFormat` and `headerStyle`.

```typescript
public levels = [
  {
    groupPath: 'Continent',
    headerFormat: 'Continent: ${Continent}',
    headerStyle: { size: '16px', fontWeight: '600' }
  },
  {
    groupPath: 'Region',
    headerFormat: 'Region: ${Region}',
    headerStyle: { size: '14px', fontWeight: '500' }
  },
  {
    groupPath: 'State',
    headerFormat: 'State: ${State}',
    headerStyle: { size: '12px' }
  }
];
```

## On-Demand Data Loading

`drillDownView` is a built-in TreeMap property that changes how child items are rendered during drilldown. Instead of rendering all child items immediately, child nodes are rendered during the drilldown process.

### Enable DrillDownView

```typescript
import { Component, signal } from '@angular/core';
import { TreeMapModule } from '@syncfusion/ej2-angular-treemap';

@Component({
  selector: 'app-treemap',
  standalone: true,
  imports: [TreeMapModule],
  template: `
    <ejs-treemap
      id="treemap-container"
      [dataSource]="data()"
      weightValuePath="Value"
      [enableDrillDown]="true"
      [drillDownView]="true"
      [levels]="levels"
      [leafItemSettings]="leafItemSettings">
    </ejs-treemap>
  `
})
export class TreeMapComponent {
  public data = signal([
    { Region: 'North America', Country: 'United States', Value: 25460 },
    { Region: 'North America', Country: 'Canada', Value: 1841 },
    { Region: 'Europe', Country: 'Germany', Value: 3846 },
    { Region: 'Europe', Country: 'France', Value: 2781 }
  ]);

  public levels = [
    { groupPath: 'Region' },
    { groupPath: 'Country' }
  ];

  public leafItemSettings = {
    labelPath: 'Country',
    gap: 4,
    border: { color: '#ffffff', width: 1 }
  };
}
```

**Use Case:** This is useful when you want the lower-level items to be rendered only as the user drills into the hierarchy.

### Data Structure with On-Demand

The data remains a grouped collection. What changes is how TreeMap renders the drill hierarchy.

```typescript
public data = signal([
  { Region: 'North America', Country: 'United States', Value: 25460 },
  { Region: 'North America', Country: 'Canada', Value: 1841 },
  { Region: 'Europe', Country: 'Germany', Value: 3846 },
  { Region: 'Europe', Country: 'France', Value: 2781 }
]);
```

**Updated Definition:** `drillDownView` does not require a special server-side lazy-loading contract by itself. It changes the initial rendering behavior so that child items are shown during drill interaction rather than all at once up front.

## Breadcrumb Navigation

Breadcrumb support is built in and can be enabled to show the path from the root level to the current drilled level.

### Enable Breadcrumb

```typescript
import { Component, signal } from '@angular/core';
import { TreeMapModule } from '@syncfusion/ej2-angular-treemap';

@Component({
  selector: 'app-treemap',
  standalone: true,
  imports: [TreeMapModule],
  template: `
    <ejs-treemap
      id="treemap-container"
      [dataSource]="data()"
      weightValuePath="Value"
      [enableDrillDown]="true"
      [enableBreadcrumb]="true"
      breadcrumbConnector=" -> "
      [levels]="levels"
      [leafItemSettings]="leafItemSettings">
    </ejs-treemap>
  `
})
export class TreeMapComponent {
  public data = signal([
    { Region: 'North America', Country: 'United States', Value: 25460 },
    { Region: 'North America', Country: 'Canada', Value: 1841 },
    { Region: 'Europe', Country: 'Germany', Value: 3846 },
    { Region: 'Europe', Country: 'France', Value: 2781 }
  ]);

  public levels = [
    { groupPath: 'Region' },
    { groupPath: 'Country' }
  ];

  public leafItemSettings = {
    labelPath: 'Country',
    gap: 4,
    border: { color: '#ffffff', width: 1 }
  };
}
```

### Breadcrumb Connector Options

You can customize the path separator using `breadcrumbConnector`.

```typescript
breadcrumbConnector=" / "
breadcrumbConnector=" -> "
breadcrumbConnector=" :: "
breadcrumbConnector=" | "
```

### Click Breadcrumb to Navigate Up

Built-in breadcrumb support shows the navigation path from the root parent to the current level. This is the recommended built-in way to let users move back to earlier levels without relying on undocumented instance methods.

## Back Navigation

This section needed the biggest correction.

### Programmatic Back Navigation

The earlier sample used a `drillUp()` instance method and a `currentLevel` check, but those are not part of the documented Angular TreeMap API pattern shown for the component examples and events. Because of that, the safer guidance is:

- use built-in breadcrumb navigation for moving upward
- use normal drill interaction to return to earlier levels
- if your application needs a dedicated **Reset to Root** button, recreate the TreeMap view state from Angular rather than calling an undocumented instance API

### Reset to Root Using Angular State

The following example adds a **Reset to Root** button by recreating the TreeMap component through Angular state. This is an application-level workaround, not a special Syncfusion drill-up API.

```typescript
import { ChangeDetectorRef, Component, inject, signal } from '@angular/core';
import { TreeMapModule } from '@syncfusion/ej2-angular-treemap';

@Component({
  selector: 'app-treemap',
  standalone: true,
  imports: [TreeMapModule],
  template: `
    <button type="button" (click)="resetToRoot()">Reset to Root</button>

    @if (showTreeMap()) {
      <ejs-treemap
        [id]="treeMapId()"
        [dataSource]="data()"
        weightValuePath="Value"
        [enableDrillDown]="true"
        [enableBreadcrumb]="true"
        breadcrumbConnector=" -> "
        [levels]="levels"
        [leafItemSettings]="leafItemSettings">
      </ejs-treemap>
    }
  `,
  styles: [`
    :host {
      display: block;
      padding: 12px;
      box-sizing: border-box;
    }

    button {
      margin-bottom: 12px;
      padding: 8px 12px;
      border: 1px solid #cbd5e1;
      background: #ffffff;
      border-radius: 8px;
      cursor: pointer;
    }

    ejs-treemap {
      display: block;
      width: 100%;
      height: 520px;
    }
  `]
})
export class TreeMapComponent {
  private cdr = inject(ChangeDetectorRef);

  public showTreeMap = signal(true);
  public treeMapId = signal('treemap-container-0');

  public data = signal([
    { Continent: 'North America', Region: 'Northeast', State: 'New York', Value: 500 },
    { Continent: 'North America', Region: 'Northeast', State: 'Boston', Value: 400 },
    { Continent: 'North America', Region: 'Southwest', State: 'Texas', Value: 600 },
    { Continent: 'Europe', Region: 'Western', State: 'France', Value: 550 }
  ]);

  public levels = [
    { groupPath: 'Continent', headerFormat: '${Continent}' },
    { groupPath: 'Region', headerFormat: '${Region}' },
    { groupPath: 'State', headerFormat: '${State}', showHeader: false }
  ];

  public leafItemSettings = {
    labelPath: 'State',
    gap: 4,
    border: { color: '#ffffff', width: 1 }
  };

  public resetToRoot(): void {
    this.showTreeMap.set(false);
    this.cdr.detectChanges();

    setTimeout(() => {
      this.treeMapId.set(`treemap-container-${Date.now()}`);
      this.showTreeMap.set(true);
    }, 0);
  }
}
```

### Root-Level Detection

Instead of relying on an undocumented `currentLevel` instance property, keep root-level UI behavior under your own Angular state if you need custom buttons, analytics, or navigation indicators.

**Updated Guidance:** Built-in upward navigation should primarily rely on breadcrumb and drill interaction. For custom app-level controls, use Angular state to recreate or control the view.

## Drill Down Events

The event names in the original content needed correction.

### Listen to Drill Down Actions

Use documented drill events such as `drillStart` and `drillEnd`.

```typescript
import { Component, signal } from '@angular/core';
import {
  TreeMapModule
} from '@syncfusion/ej2-angular-treemap';

@Component({
  selector: 'app-treemap',
  standalone: true,
  imports: [TreeMapModule],
  template: `
    <div class="page">
      <ejs-treemap
        id="treemap-container"
        [dataSource]="data()"
        weightValuePath="Value"
        [enableDrillDown]="true"
        [enableBreadcrumb]="true"
        breadcrumbConnector=" -> "
        [levels]="levels"
        [leafItemSettings]="leafItemSettings"
        (drillStart)="onDrillStart($event)"
        (drillEnd)="onDrillEnd($event)">
      </ejs-treemap>

      <section class="event-panel">
        <h3>Drill Information</h3>

        <div class="info-grid">
          <div class="info-card">
            <div class="label">Current Action</div>
            <div class="value">{{ currentAction() }}</div>
          </div>

          <div class="info-card">
            <div class="label">Current Item</div>
            <div class="value">{{ currentItem() }}</div>
          </div>

          <div class="info-card">
            <div class="label">Current Level</div>
            <div class="value">{{ currentLevel() }}</div>
          </div>

          <div class="info-card">
            <div class="label">Last Updated</div>
            <div class="value">{{ lastUpdated() }}</div>
          </div>
        </div>

        <div class="summary-box">
          <div class="label">Summary</div>
          <p>{{ currentSummary() }}</p>
        </div>

        <div class="history-box">
          <div class="label">Navigation History</div>

          @if (navigationHistory().length > 0) {
            <ul class="history-list">
              @for (entry of navigationHistory(); track $index) {
                <li>{{ entry }}</li>
              }
            </ul>
          } @else {
            <p class="empty-text">No drill actions yet.</p>
          }
        </div>
      </section>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      padding: 12px;
      box-sizing: border-box;
      font-family: Arial, Helvetica, sans-serif;
      color: #111827;
    }

    .page {
      display: grid;
      gap: 16px;
    }

    #treemap-container {
      display: block;
      width: 100%;
      height: 520px;
    }

    .event-panel {
      border: 1px solid #d1d5db;
      border-radius: 12px;
      padding: 16px;
      background: #f9fafb;
    }

    .event-panel h3 {
      margin: 0 0 12px;
      font-size: 18px;
      font-weight: 600;
    }

    .info-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
      gap: 12px;
      margin-bottom: 16px;
    }

    .info-card,
    .summary-box,
    .history-box {
      border: 1px solid #e5e7eb;
      border-radius: 10px;
      background: #ffffff;
      padding: 12px;
    }

    .label {
      font-size: 12px;
      font-weight: 600;
      color: #6b7280;
      text-transform: uppercase;
      letter-spacing: 0.04em;
      margin-bottom: 6px;
    }

    .value {
      font-size: 15px;
      font-weight: 500;
      color: #111827;
      word-break: break-word;
    }

    .summary-box p,
    .empty-text {
      margin: 0;
      color: #374151;
      line-height: 1.5;
    }

    .history-list {
      margin: 0;
      padding-left: 18px;
    }

    .history-list li {
      margin-bottom: 8px;
      color: #111827;
      line-height: 1.5;
    }
  `]
})
export class TreeMapComponent {
  public data = signal([
    { Region: 'North America', Country: 'United States', Value: 25460 },
    { Region: 'North America', Country: 'Canada', Value: 1841 },
    { Region: 'Europe', Country: 'Germany', Value: 3846 },
    { Region: 'Europe', Country: 'France', Value: 2781 }
  ]);

  public levels = [
    { groupPath: 'Region', headerFormat: '${Region}' }
  ];

  public leafItemSettings = {
    labelPath: 'Country',
    gap: 4,
    border: { color: '#ffffff', width: 1 }
  };

  public currentAction = signal('No action yet');
  public currentItem = signal('N/A');
  public currentLevel = signal('N/A');
  public lastUpdated = signal('N/A');
  public currentSummary = signal('Interact with the TreeMap to see drill details here.');
  public navigationHistory = signal<string[]>([]);

  public onDrillStart(args: any): void {
    this.updateDrillText('Drill Start', args);
  }

  public onDrillEnd(args: any): void {
    this.updateDrillText('Drill End', args);
  }

  private updateDrillText(
    action: string,
    args: any
  ): void {
    const details = this.extractDetails(args);
    const time = this.formatTime(new Date());

    this.currentAction.set(action);
    this.currentItem.set(details.item);
    this.currentLevel.set(details.level);
    this.lastUpdated.set(time);
    this.currentSummary.set(
      `${action} happened for "${details.item}" at level "${details.level}" on ${time}.`
    );

    this.navigationHistory.update((history) => [
      ...history,
      `${action} | Item: ${details.item} | Level: ${details.level} | Time: ${time}`
    ]);
  }

  private extractDetails(
    args: any
  ): { item: string; level: string } {
    const eventArgs = args as any;

    const item =
      eventArgs?.item?.groupName ??
      eventArgs?.item?.name ??
      eventArgs?.groupName ??
      eventArgs?.name ??
      eventArgs?.renderItems?.[0]?.groupName ??
      eventArgs?.renderItems?.[0]?.name ??
      'Unknown Item';

    const level =
      this.readLevelFromOrder(eventArgs?.levelOrderName) ??
      this.readLevelFromOrder(eventArgs?.item?.levelOrderName) ??
      this.readLevelFromOrder(eventArgs?.renderItems?.[0]?.levelOrderName) ??
      this.readNumericLevel(eventArgs?.groupIndex) ??
      this.readNumericLevel(eventArgs?.currentLevel) ??
      'Unknown Level';

    return {
      item: String(item),
      level: String(level)
    };
  }

  private readLevelFromOrder(value: unknown): string | null {
    if (typeof value !== 'string' || !value.trim()) {
      return null;
    }

    const parts = value
      .split('#')
      .map((part) => part.trim())
      .filter(Boolean);

    return parts.length ? parts[parts.length - 1] : value;
  }

  private readNumericLevel(value: unknown): string | null {
    if (typeof value === 'number') {
      return `Level ${value}`;
    }

    return null;
  }

  private formatTime(date: Date): string {
    return date.toLocaleString();
  }
}
```

### Event Properties

The safest guidance is to use the documented event types and inspect the event object in your handler. The exact event payload can vary depending on the drill action and version, so the best pattern is to strongly type the handler and log the incoming object during development.

```typescript
public onDrillStart(args: IDrillStartEventArgs): void {
  console.log(args);
}

public onDrillEnd(args: IDrillEndEventArgs): void {
  console.log(args);
}
```

### Track Navigation History

If you need app-level drill history, store it in Angular state from the drill events.

```typescript
import { Component, signal } from '@angular/core';
import {
  TreeMapModule,
  IDrillEndEventArgs
} from '@syncfusion/ej2-angular-treemap';

@Component({
  selector: 'app-treemap',
  standalone: true,
  imports: [TreeMapModule],
  template: `
    <div class="page">
      <ejs-treemap
        id="treemap-container"
        [dataSource]="data()"
        weightValuePath="Value"
        [enableDrillDown]="true"
        [enableBreadcrumb]="true"
        breadcrumbConnector=" -> "
        [levels]="levels"
        [leafItemSettings]="leafItemSettings"
        (drillEnd)="onDrillEnd($event)">
      </ejs-treemap>

      <div class="history-panel">
        <h3>Navigation History</h3>

        @if (navigationHistory().length > 0) {
          <ul class="history-list">
            @for (entry of navigationHistory(); track $index) {
              <li>{{ entry }}</li>
            }
          </ul>
        } @else {
          <p class="empty-text">No drill actions yet.</p>
        }
      </div>
    </div>
  `,
  styles: [`
    :host {
      display: block;
      padding: 12px;
      box-sizing: border-box;
      font-family: Arial, Helvetica, sans-serif;
    }

    .page {
      display: grid;
      gap: 16px;
    }

    #treemap-container {
      display: block;
      width: 100%;
      height: 520px;
    }

    .history-panel {
      border: 1px solid #d1d5db;
      border-radius: 10px;
      padding: 12px;
      background: #f9fafb;
    }

    .history-panel h3 {
      margin: 0 0 12px;
      font-size: 18px;
    }

    .history-list {
      margin: 0;
      padding-left: 18px;
    }

    .history-list li {
      margin-bottom: 8px;
      color: #111827;
      line-height: 1.5;
    }

    .empty-text {
      margin: 0;
      color: #6b7280;
    }
  `]
})
export class TreeMapComponent {
  public data = signal([
    { Region: 'North America', Country: 'United States', Value: 25460 },
    { Region: 'North America', Country: 'Canada', Value: 1841 },
    { Region: 'Europe', Country: 'Germany', Value: 3846 },
    { Region: 'Europe', Country: 'France', Value: 2781 }
  ]);

  public levels = [
    { groupPath: 'Region', headerFormat: '${Region}' }
  ];

  public leafItemSettings = {
    labelPath: 'Country',
    gap: 4,
    border: { color: '#ffffff', width: 1 }
  };

  public navigationHistory = signal<string[]>([]);

  public onDrillEnd(args: IDrillEndEventArgs): void {
    const itemName = this.getDrilledItemName(args);
    const levelName = this.getDrilledLevel(args);
    const timestamp = new Date().toLocaleString();

    this.navigationHistory.update((history) => [
      ...history,
      `Drill completed | Item: ${itemName} | Level: ${levelName} | Time: ${timestamp}`
    ]);
  }

  private getDrilledItemName(args: IDrillEndEventArgs): string {
    const eventArgs = args as any;

    return (
      eventArgs?.groupName ??
      eventArgs?.item?.groupName ??
      eventArgs?.item?.name ??
      eventArgs?.name ??
      eventArgs?.renderItems?.[0]?.groupName ??
      eventArgs?.renderItems?.[0]?.name ??
      'Unknown Item'
    );
  }

  private getDrilledLevel(args: IDrillEndEventArgs): string {
    const eventArgs = args as any;

    const levelOrderName =
      eventArgs?.levelOrderName ??
      eventArgs?.item?.levelOrderName ??
      eventArgs?.renderItems?.[0]?.levelOrderName;

    if (typeof levelOrderName === 'string' && levelOrderName.trim()) {
      const parts = levelOrderName
        .split('#')
        .map((part: string) => part.trim())
        .filter(Boolean);

      return parts.length ? parts[parts.length - 1] : levelOrderName;
    }

    if (typeof eventArgs?.groupIndex === 'number') {
      return `Level ${eventArgs.groupIndex}`;
    }

    if (typeof eventArgs?.currentLevel === 'number') {
      return `Level ${eventArgs.currentLevel}`;
    }

    return 'Unknown Level';
  }
}
```

## Best Practices

### DO: Use Meaningful Header Formats

```typescript
public levels = [
  {
    groupPath: 'Region',
    headerFormat: '${Region}'
  },
  {
    groupPath: 'Country',
    headerFormat: '${Country}'
  }
];
```

Use headers that clearly reflect the current hierarchy level.

### DON'T: Use Unclear Headers

```typescript
public levels = [
  {
    groupPath: 'Region',
    headerFormat: '${Data}'
  }
];
```

Avoid headers that reference unclear or unmapped fields.

### DO: Include Aggregated Totals

If your data already includes aggregate values, surface them through the header format or tooltips.

```typescript
public data = signal([
  { Region: 'North America', Country: 'USA', Value: 25460, RegionTotal: 27301 },
  { Region: 'North America', Country: 'Canada', Value: 1841, RegionTotal: 27301 }
]);

public levels = [
  {
    groupPath: 'Region',
    headerFormat: '${Region}'
  }
];
```

If you want totals visible in the header, make sure the field is available at the level where the header is rendered.

### DO: Provide Visual Feedback

Use built-in breadcrumb support, meaningful headers, and optionally event handlers to update surrounding Angular UI when drilling starts or ends.

```typescript
<ejs-treemap
  [enableDrillDown]="true"
  [enableBreadcrumb]="true"
  (drillStart)="onDrillStart($event)"
  (drillEnd)="onDrillEnd($event)">
</ejs-treemap>
```

### DO: Limit Hierarchy Depth

Keep drill hierarchies manageable.

```typescript
public levels = [
  { groupPath: 'Level1' },
  { groupPath: 'Level2' },
  { groupPath: 'Level3' }
];
```

Three or four levels are usually easier to navigate than very deep drill chains.

### Troubleshooting

**Issue:** Drilldown is not working

**Solution:** Make sure `enableDrillDown` is enabled and each configured `groupPath` exists in the data source.

```typescript
public levels = [
  { groupPath: 'Region' },
  { groupPath: 'Country' }
];
```

**Issue:** Breadcrumb is not showing

**Solution:** Enable both drilldown and breadcrumb.

```typescript
[enableDrillDown]="true"
[enableBreadcrumb]="true"
```

**Issue:** Drill events are not firing

**Solution:** Use the documented drill event names.

```typescript
(drillStart)="onDrillStart($event)"
(drillEnd)="onDrillEnd($event)"
```

**Issue:** Need a custom Back button

**Solution:** Prefer built-in breadcrumb for upward navigation. If you need an application button that returns to the root, recreate the TreeMap through Angular state rather than calling an undocumented instance method.

