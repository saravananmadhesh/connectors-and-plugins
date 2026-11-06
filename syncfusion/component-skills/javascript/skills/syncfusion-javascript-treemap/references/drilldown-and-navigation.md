# TreeMap Drilldown and Navigation (TypeScript and JavaScript)

## Table of Contents

- [Overview](#overview)
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
  - [Navigate Using Breadcrumb](#navigate-using-breadcrumb)
- [Back Navigation](#back-navigation)
  - [Reset to Root](#reset-to-root)
  - [Root-Level Detection](#root-level-detection)
- [Drill Down Events](#drill-down-events)
  - [Listen to Drill Down Actions](#listen-to-drill-down-actions)
  - [Event Properties](#event-properties)
  - [Track Navigation History](#track-navigation-history)
- [Best Practices](#best-practices)
  - [Use Meaningful Header Formats](#use-meaningful-header-formats)
  - [Include Aggregated Totals](#include-aggregated-totals)
  - [Provide Visual Feedback](#provide-visual-feedback)
  - [Limit Hierarchy Depth](#limit-hierarchy-depth)
- [Troubleshooting](#troubleshooting)
- [See Also](#see-also)

## Overview

Drilldown in the Syncfusion TreeMap is a built-in navigation feature that lets users move from a higher grouping level to a lower grouping level by clicking items. This guide covers both TypeScript and JavaScript implementations of drilldown functionality with breadcrumb navigation and event handling.

## Enabling Drilldown

Drilldown is enabled by setting `enableDrillDown` to `true`. TreeMap then lets the user click a rendered group and move into the next hierarchy level.

### Basic Drilldown Setup

#### TypeScript Implementation

```typescript
import { TreeMap } from '@syncfusion/ej2-treemap';

const data = [
  { Region: 'North America', Country: 'United States', Value: 25460 },
  { Region: 'North America', Country: 'Canada', Value: 1841 },
  { Region: 'Europe', Country: 'Germany', Value: 3846 },
  { Region: 'Europe', Country: 'France', Value: 2781 },
  { Region: 'Asia', Country: 'China', Value: 17734 },
  { Region: 'Asia', Country: 'Japan', Value: 4909 }
];

const treeMap = new TreeMap({
  dataSource: data,
  weightValuePath: 'Value',
  enableDrillDown: true,
  levels: [
    { groupPath: 'Region', headerFormat: '${Region}' },
    { groupPath: 'Country', headerFormat: '${Country}' }
  ],
  leafItemSettings: {
    labelPath: 'Country',
    gap: 4,
    border: { color: '#ffffff', width: 1 }
  }
});

treeMap.appendTo('#treemap-container');
```

#### JavaScript Implementation

```javascript
var data = [
  { Region: 'North America', Country: 'United States', Value: 25460 },
  { Region: 'North America', Country: 'Canada', Value: 1841 },
  { Region: 'Europe', Country: 'Germany', Value: 3846 },
  { Region: 'Europe', Country: 'France', Value: 2781 },
  { Region: 'Asia', Country: 'China', Value: 17734 },
  { Region: 'Asia', Country: 'Japan', Value: 4909 }
];

var treeMap = new ej.treemap.TreeMap({
  dataSource: data,
  weightValuePath: 'Value',
  enableDrillDown: true,
  levels: [
    { groupPath: 'Region', headerFormat: '${Region}' },
    { groupPath: 'Country', headerFormat: '${Country}' }
  ],
  leafItemSettings: {
    labelPath: 'Country',
    gap: 4,
    border: { color: '#ffffff', width: 1 }
  }
});

treeMap.appendTo('#treemap-container');
```

#### HTML Container

```html
<div id="treemap-container" style="width: 100%; height: 520px;"></div>
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

#### TypeScript Implementation

```typescript
import { TreeMap } from '@syncfusion/ej2-treemap';

const data = [
  { Continent: 'North America', Region: 'Northeast', State: 'New York', Value: 500 },
  { Continent: 'North America', Region: 'Northeast', State: 'Boston', Value: 400 },
  { Continent: 'North America', Region: 'Southwest', State: 'Texas', Value: 600 },
  { Continent: 'Europe', Region: 'Western', State: 'France', Value: 550 }
];

const treeMap = new TreeMap({
  dataSource: data,
  weightValuePath: 'Value',
  enableDrillDown: true,
  levels: [
    { groupPath: 'Continent', headerFormat: '${Continent}' },
    { groupPath: 'Region', headerFormat: '${Region}' },
    { groupPath: 'State', headerFormat: '${State}' }
  ],
  leafItemSettings: {
    labelPath: 'State',
    gap: 4,
    border: { color: '#ffffff', width: 1 }
  }
});

treeMap.appendTo('#treemap-container');
```

#### JavaScript Implementation

```javascript
var data = [
  { Continent: 'North America', Region: 'Northeast', State: 'New York', Value: 500 },
  { Continent: 'North America', Region: 'Northeast', State: 'Boston', Value: 400 },
  { Continent: 'North America', Region: 'Southwest', State: 'Texas', Value: 600 },
  { Continent: 'Europe', Region: 'Western', State: 'France', Value: 550 }
];

var treeMap = new ej.treemap.TreeMap({
  dataSource: data,
  weightValuePath: 'Value',
  enableDrillDown: true,
  levels: [
    { groupPath: 'Continent', headerFormat: '${Continent}' },
    { groupPath: 'Region', headerFormat: '${Region}' },
    { groupPath: 'State', headerFormat: '${State}' }
  ],
  leafItemSettings: {
    labelPath: 'State',
    gap: 4,
    border: { color: '#ffffff', width: 1 }
  }
});

treeMap.appendTo('#treemap-container');
```

#### HTML Container

```html
<div id="treemap-container" style="width: 100%; height: 520px;"></div>
```

**Navigation Example:**

- Click `North America` to drill into `Northeast` and `Southwest`
- Click `Northeast` to drill into `New York` and `Boston`

### Header Customization at Each Level

You can customize the header text and style per level using `headerFormat` and `headerStyle`.

**Configuration:**

```typescript
const levels = [
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

#### TypeScript Implementation

```typescript
import { TreeMap } from '@syncfusion/ej2-treemap';

const data = [
  { Region: 'North America', Country: 'United States', Value: 25460 },
  { Region: 'North America', Country: 'Canada', Value: 1841 },
  { Region: 'Europe', Country: 'Germany', Value: 3846 },
  { Region: 'Europe', Country: 'France', Value: 2781 }
];

const treeMap = new TreeMap({
  dataSource: data,
  weightValuePath: 'Value',
  enableDrillDown: true,
  drillDownView: true,
  levels: [
    { groupPath: 'Region' },
    { groupPath: 'Country' }
  ],
  leafItemSettings: {
    labelPath: 'Country',
    gap: 4,
    border: { color: '#ffffff', width: 1 }
  }
});

treeMap.appendTo('#treemap-container');
```

#### JavaScript Implementation

```javascript
var data = [
  { Region: 'North America', Country: 'United States', Value: 25460 },
  { Region: 'North America', Country: 'Canada', Value: 1841 },
  { Region: 'Europe', Country: 'Germany', Value: 3846 },
  { Region: 'Europe', Country: 'France', Value: 2781 }
];

var treeMap = new ej.treemap.TreeMap({
  dataSource: data,
  weightValuePath: 'Value',
  enableDrillDown: true,
  drillDownView: true,
  levels: [
    { groupPath: 'Region' },
    { groupPath: 'Country' }
  ],
  leafItemSettings: {
    labelPath: 'Country',
    gap: 4,
    border: { color: '#ffffff', width: 1 }
  }
});

treeMap.appendTo('#treemap-container');
```

#### HTML Container

```html
<div id="treemap-container" style="width: 100%; height: 400px;"></div>
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

#### TypeScript Implementation

```typescript
import { TreeMap } from '@syncfusion/ej2-treemap';

const data = [
  { Region: 'North America', Country: 'United States', Value: 25460 },
  { Region: 'North America', Country: 'Canada', Value: 1841 },
  { Region: 'Europe', Country: 'Germany', Value: 3846 },
  { Region: 'Europe', Country: 'France', Value: 2781 }
];

const treeMap = new TreeMap({
  dataSource: data,
  weightValuePath: 'Value',
  enableDrillDown: true,
  enableBreadcrumb: true,
  breadcrumbConnector: ' -> ',
  levels: [
    { groupPath: 'Region' },
    { groupPath: 'Country' }
  ],
  leafItemSettings: {
    labelPath: 'Country',
    gap: 4,
    border: { color: '#ffffff', width: 1 }
  }
});

treeMap.appendTo('#treemap-container');
```

#### JavaScript Implementation

```javascript
var data = [
  { Region: 'North America', Country: 'United States', Value: 25460 },
  { Region: 'North America', Country: 'Canada', Value: 1841 },
  { Region: 'Europe', Country: 'Germany', Value: 3846 },
  { Region: 'Europe', Country: 'France', Value: 2781 }
];

var treeMap = new ej.treemap.TreeMap({
  dataSource: data,
  weightValuePath: 'Value',
  enableDrillDown: true,
  enableBreadcrumb: true,
  breadcrumbConnector: ' -> ',
  levels: [
    { groupPath: 'Region' },
    { groupPath: 'Country' }
  ],
  leafItemSettings: {
    labelPath: 'Country',
    gap: 4,
    border: { color: '#ffffff', width: 1 }
  }
});

treeMap.appendTo('#treemap-container');
```

#### HTML Container

```html
<div id="treemap-container" style="width: 100%; height: 400px;"></div>
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

Back navigation is handled through breadcrumb interaction and drill-level management.

### Reset to Root

To provide a dedicated **Reset to Root** button, you can reinitialize the TreeMap or update data binding. Here's a framework-neutral approach:

**TypeScript:**
```typescript
import { TreeMap } from '@syncfusion/ej2-treemap';

let treeMapInstance: TreeMap;

function initializeTreeMap(): void {
  const data = [
    { Continent: 'North America', Region: 'Northeast', State: 'New York', Value: 500 },
    { Continent: 'North America', Region: 'Northeast', State: 'Boston', Value: 400 },
    { Continent: 'North America', Region: 'Southwest', State: 'Texas', Value: 600 },
    { Continent: 'Europe', Region: 'Western', State: 'France', Value: 550 }
  ];

  treeMapInstance = new TreeMap({
    dataSource: data,
    weightValuePath: 'Value',
    enableDrillDown: true,
    enableBreadcrumb: true,
    breadcrumbConnector: ' -> ',
    levels: [
      { groupPath: 'Continent', headerFormat: '${Continent}' },
      { groupPath: 'Region', headerFormat: '${Region}' },
      { groupPath: 'State', headerFormat: '${State}', showHeader: false }
    ],
    leafItemSettings: {
      labelPath: 'State',
      gap: 4,
      border: { color: '#ffffff', width: 1 }
    }
  });

  treeMapInstance.appendTo('#treemap-container');
}

function resetToRoot(): void {
  if (treeMapInstance) {
    treeMapInstance.destroy();
  }
  initializeTreeMap();
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', initializeTreeMap);
```

**JavaScript:**
```javascript
var treeMapInstance;

function initializeTreeMap() {
  var data = [
    { Continent: 'North America', Region: 'Northeast', State: 'New York', Value: 500 },
    { Continent: 'North America', Region: 'Northeast', State: 'Boston', Value: 400 },
    { Continent: 'North America', Region: 'Southwest', State: 'Texas', Value: 600 },
    { Continent: 'Europe', Region: 'Western', State: 'France', Value: 550 }
  ];

  treeMapInstance = new ej.treemap.TreeMap({
    dataSource: data,
    weightValuePath: 'Value',
    enableDrillDown: true,
    enableBreadcrumb: true,
    breadcrumbConnector: ' -> ',
    levels: [
      { groupPath: 'Continent', headerFormat: '${Continent}' },
      { groupPath: 'Region', headerFormat: '${Region}' },
      { groupPath: 'State', headerFormat: '${State}', showHeader: false }
    ],
    leafItemSettings: {
      labelPath: 'State',
      gap: 4,
      border: { color: '#ffffff', width: 1 }
    }
  });

  treeMapInstance.appendTo('#treemap-container');
}

function resetToRoot() {
  if (treeMapInstance) {
    treeMapInstance.destroy();
  }
  initializeTreeMap();
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', initializeTreeMap);
```

**HTML:**
```html
<button type="button" onclick="resetToRoot()">Reset to Root</button>
<div id="treemap-container" style="width: 100%; height: 520px;"></div>
```

### Root-Level Detection

Instead of relying on an undocumented `currentLevel` instance property, keep root-level UI behavior under your own Angular state if you need custom buttons, analytics, or navigation indicators.

**Updated Guidance:** Built-in upward navigation should primarily rely on breadcrumb and drill interaction. For custom app-level controls, use Angular state to recreate or control the view.

## Drill Down Events

The event names in the original content needed correction.

### Listen to Drill Down Actions

Use documented drill events such as `drillStart` and `drillEnd`.

**TypeScript:**
```typescript
import { TreeMap } from '@syncfusion/ej2-treemap';
import { IDrillStartEventArgs, IDrillEndEventArgs } from '@syncfusion/ej2-treemap';

let navigationHistory: string[] = [];

const treeMapInstance = new TreeMap({
  dataSource: [
    { Region: 'North America', Country: 'United States', Value: 25460 },
    { Region: 'North America', Country: 'Canada', Value: 1841 },
    { Region: 'Europe', Country: 'Germany', Value: 3846 },
    { Region: 'Europe', Country: 'France', Value: 2781 }
  ],
  weightValuePath: 'Value',
  enableDrillDown: true,
  enableBreadcrumb: true,
  breadcrumbConnector: ' -> ',
  levels: [
    { groupPath: 'Region', headerFormat: '${Region}' }
  ],
  leafItemSettings: {
    labelPath: 'Country',
    gap: 4,
    border: { color: '#ffffff', width: 1 }
  },
  drillStart: (args: IDrillStartEventArgs) => {
    console.log('Drill Start:', args);
  },
  drillEnd: (args: IDrillEndEventArgs) => {
    const itemName = extractItemName(args);
    const levelName = extractLevelName(args);
    const timestamp = new Date().toLocaleString();
    navigationHistory.push(`Drill End | Item: ${itemName} | Level: ${levelName} | Time: ${timestamp}`);
    updateHistoryDisplay();
  }
});

treeMapInstance.appendTo('#treemap-container');

function extractItemName(args: any): string {
  return (
    args?.groupName ??
    args?.item?.groupName ??
    args?.item?.name ??
    args?.name ??
    args?.renderItems?.[0]?.groupName ??
    args?.renderItems?.[0]?.name ??
    'Unknown Item'
  );
}

function extractLevelName(args: any): string {
  const levelOrderName = args?.levelOrderName ?? args?.item?.levelOrderName ?? args?.renderItems?.[0]?.levelOrderName;
  if (typeof levelOrderName === 'string' && levelOrderName.trim()) {
    const parts = levelOrderName.split('#').map((p: string) => p.trim()).filter(Boolean);
    return parts.length ? parts[parts.length - 1] : levelOrderName;
  }
  if (typeof args?.groupIndex === 'number') return `Level ${args.groupIndex}`;
  if (typeof args?.currentLevel === 'number') return `Level ${args.currentLevel}`;
  return 'Unknown Level';
}

function updateHistoryDisplay(): void {
  const historyList = document.getElementById('history-list');
  if (historyList) {
    historyList.innerHTML = navigationHistory.map(entry => `<li>${entry}</li>`).join('');
  }
}
```

**JavaScript:**
```javascript
var navigationHistory = [];

var treeMapInstance = new ej.treemap.TreeMap({
  dataSource: [
    { Region: 'North America', Country: 'United States', Value: 25460 },
    { Region: 'North America', Country: 'Canada', Value: 1841 },
    { Region: 'Europe', Country: 'Germany', Value: 3846 },
    { Region: 'Europe', Country: 'France', Value: 2781 }
  ],
  weightValuePath: 'Value',
  enableDrillDown: true,
  enableBreadcrumb: true,
  breadcrumbConnector: ' -> ',
  levels: [
    { groupPath: 'Region', headerFormat: '${Region}' }
  ],
  leafItemSettings: {
    labelPath: 'Country',
    gap: 4,
    border: { color: '#ffffff', width: 1 }
  },
  drillStart: function(args) {
    console.log('Drill Start:', args);
  },
  drillEnd: function(args) {
    var itemName = extractItemName(args);
    var levelName = extractLevelName(args);
    var timestamp = new Date().toLocaleString();
    navigationHistory.push('Drill End | Item: ' + itemName + ' | Level: ' + levelName + ' | Time: ' + timestamp);
    updateHistoryDisplay();
  }
});

treeMapInstance.appendTo('#treemap-container');

function extractItemName(args) {
  return (
    args.groupName ||
    (args.item && args.item.groupName) ||
    (args.item && args.item.name) ||
    args.name ||
    (args.renderItems && args.renderItems[0] && args.renderItems[0].groupName) ||
    (args.renderItems && args.renderItems[0] && args.renderItems[0].name) ||
    'Unknown Item'
  );
}

function extractLevelName(args) {
  var levelOrderName = args.levelOrderName || (args.item && args.item.levelOrderName) || (args.renderItems && args.renderItems[0] && args.renderItems[0].levelOrderName);
  if (typeof levelOrderName === 'string' && levelOrderName.trim()) {
    var parts = levelOrderName.split('#').map(function(p) { return p.trim(); }).filter(Boolean);
    return parts.length ? parts[parts.length - 1] : levelOrderName;
  }
  if (typeof args.groupIndex === 'number') return 'Level ' + args.groupIndex;
  if (typeof args.currentLevel === 'number') return 'Level ' + args.currentLevel;
  return 'Unknown Level';
}

function updateHistoryDisplay() {
  var historyList = document.getElementById('history-list');
  if (historyList) {
    historyList.innerHTML = navigationHistory.map(function(entry) { return '<li>' + entry + '</li>'; }).join('');
  }
}
```

**HTML:**
```html
<div id="treemap-container" style="width: 100%; height: 520px;"></div>

<section class="event-panel">
  <h3>Navigation History</h3>
  <ul id="history-list" class="history-list"></ul>
</section>
```

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

If you need app-level drill history, store it from the drill events and update the DOM.

**TypeScript:**
```typescript
import { TreeMap } from '@syncfusion/ej2-treemap';
import { IDrillEndEventArgs } from '@syncfusion/ej2-treemap';

let navigationHistory: string[] = [];

const treeMapInstance = new TreeMap({
  dataSource: [
    { Region: 'North America', Country: 'United States', Value: 25460 },
    { Region: 'North America', Country: 'Canada', Value: 1841 },
    { Region: 'Europe', Country: 'Germany', Value: 3846 },
    { Region: 'Europe', Country: 'France', Value: 2781 }
  ],
  weightValuePath: 'Value',
  enableDrillDown: true,
  enableBreadcrumb: true,
  breadcrumbConnector: ' -> ',
  levels: [
    { groupPath: 'Region', headerFormat: '${Region}' }
  ],
  leafItemSettings: {
    labelPath: 'Country',
    gap: 4,
    border: { color: '#ffffff', width: 1 }
  },
  drillEnd: (args: IDrillEndEventArgs) => {
    const itemName = args?.item?.name ?? 'Unknown';
    const timestamp = new Date().toLocaleString();
    navigationHistory.push(`Drill completed | Item: ${itemName} | Time: ${timestamp}`);
    updateHistoryPanel();
  }
});

treeMapInstance.appendTo('#treemap-container');

function updateHistoryPanel(): void {
  const historyList = document.getElementById('history-list');
  if (historyList) {
    if (navigationHistory.length > 0) {
      historyList.innerHTML = navigationHistory.map(entry => `<li>${entry}</li>`).join('');
    } else {
      historyList.innerHTML = '<p class="empty-text">No drill actions yet.</p>';
    }
  }
}
```

**JavaScript:**
```javascript
var navigationHistory = [];

var treeMapInstance = new ej.treemap.TreeMap({
  dataSource: [
    { Region: 'North America', Country: 'United States', Value: 25460 },
    { Region: 'North America', Country: 'Canada', Value: 1841 },
    { Region: 'Europe', Country: 'Germany', Value: 3846 },
    { Region: 'Europe', Country: 'France', Value: 2781 }
  ],
  weightValuePath: 'Value',
  enableDrillDown: true,
  enableBreadcrumb: true,
  breadcrumbConnector: ' -> ',
  levels: [
    { groupPath: 'Region', headerFormat: '${Region}' }
  ],
  leafItemSettings: {
    labelPath: 'Country',
    gap: 4,
    border: { color: '#ffffff', width: 1 }
  },
  drillEnd: function(args) {
    var itemName = (args.item && args.item.name) || 'Unknown';
    var timestamp = new Date().toLocaleString();
    navigationHistory.push('Drill completed | Item: ' + itemName + ' | Time: ' + timestamp);
    updateHistoryPanel();
  }
});

treeMapInstance.appendTo('#treemap-container');

function updateHistoryPanel() {
  var historyList = document.getElementById('history-list');
  if (historyList) {
    if (navigationHistory.length > 0) {
      historyList.innerHTML = navigationHistory.map(function(entry) { return '<li>' + entry + '</li>'; }).join('');
    } else {
      historyList.innerHTML = '<p class="empty-text">No drill actions yet.</p>';
    }
  }
}
```

**HTML:**
```html
<div class="page">
  <div id="treemap-container" style="width: 100%; height: 520px;"></div>

  <div class="history-panel">
    <h3>Navigation History</h3>
    <ul id="history-list" class="history-list"></ul>
  </div>
</div>
```

**CSS:**
```css
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

### Use Meaningful Header Formats

Headers should clearly reflect the current hierarchy level and be mapped to actual data fields.

**Good Example:**
```typescript
const levels = [
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

**Avoid:**
```typescript
const levels = [
  {
    groupPath: 'Region',
    headerFormat: '${Data}'  // References unmapped field
  }
];
```

### Include Aggregated Totals

If your data includes aggregate values, surface them through the header format or tooltips.

```typescript
const data = [
  { Region: 'North America', Country: 'USA', Value: 25460, RegionTotal: 27301 },
  { Region: 'North America', Country: 'Canada', Value: 1841, RegionTotal: 27301 }
];

const levels = [
  {
    groupPath: 'Region',
    headerFormat: '${Region}'
  }
];
```

Ensure the field is available at the level where the header is rendered.

### Provide Visual Feedback

Use built-in breadcrumb support, meaningful headers, and event handlers to provide user feedback.

```typescript
const treeMapInstance = new TreeMap({
  enableDrillDown: true,
  enableBreadcrumb: true,
  drillStart: (args) => {
    console.log('Drill started');
  },
  drillEnd: (args) => {
    console.log('Drill completed');
  }
});
```

### Limit Hierarchy Depth

Keep drill hierarchies manageable for better navigation.

```typescript
const levels = [
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

