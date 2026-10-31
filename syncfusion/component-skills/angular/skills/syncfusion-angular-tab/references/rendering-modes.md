# Content Rendering Modes

## Table of Contents
- [Overview](#overview)
- [On Demand (Default)](#on-demand-default)
- [Dynamic Mode](#dynamic-mode)
- [Init Mode](#init-mode)
- [Comparison & Selection Guide](#comparison--selection-guide)
- [Performance Considerations](#performance-considerations)

## Overview

The Tab component supports three content rendering modes that balance performance, memory usage, and state preservation. Choosing the right mode depends on your application's needs:

- **Number of tabs** (few vs many)
- **Content complexity** (simple text vs components)
- **State persistence** (must preserve vs not needed)
- **Memory constraints** (mobile vs desktop)

## On Demand (Default)

### How It Works

Only the content of the currently selected tab is initially loaded in the DOM. When users switch tabs, content is rendered on demand. Once rendered, content stays in the DOM to preserve state.

### Configuration

```typescript
// Default behavior - no configuration needed
<ejs-tab id="element">
  <e-tabitems>
    <e-tabitem [header]="headerText[0]">
      <ng-template #content>
        <ejs-calendar></ejs-calendar>
      </ng-template>
    </e-tabitem>
    <e-tabitem [header]="headerText[1]">
      <ng-template #content>
        <ejs-schedule width="100%" height="650px">
          <e-views>
            <e-view option="Day"></e-view>
          </e-views>
        </ejs-schedule>
      </ng-template>
    </e-tabitem>
  </e-tabitems>
</ejs-tab>
```

### Behavior

1. Tab 1 (Calendar) renders on initial load
2. Tab 2 (Scheduler) is NOT in DOM initially
3. When user clicks Tab 2, Scheduler is rendered and added to DOM
4. Both components remain in DOM - clicking back shows Calendar immediately

### Advantages

- **Balanced performance:** Faster initial load than Init mode
- **State preservation:** Tab content maintains scroll position, form values, component state
- **Memory efficient:** Only active + accessed tabs in DOM
- **Smooth UX:** No re-rendering when switching to previously viewed tab

### Disadvantages

- **Initial rendering:** First tab access takes longer than already-rendered tabs
- **Memory growth:** DOM grows as users access more tabs
- **Component overhead:** Previously loaded components remain in memory

### Best For

- **Few to moderate tabs (3-15):** Good balance of performance and UX
- **Complex components:** Preserve state between tab switches
- **Business applications:** Users need to switch back and forth
- **Mobile apps:** Not too many tabs, good memory/performance balance

## Dynamic Mode

### How It Works

Only the currently active tab's content is in the DOM. When users switch tabs, the active content is replaced with the new tab's content. Previous tab content is removed from the DOM.

### Configuration

```typescript
<ejs-tab 
  id="element" 
  loadOn="Dynamic"
  heightAdjustMode="Auto">
  <e-tabitems>
    <e-tabitem [header]="headerText[0]">
      <ng-template #content>
        <app-login-form></app-login-form>
      </ng-template>
    </e-tabitem>
    <e-tabitem [header]="headerText[1]">
      <ng-template #content>
        <ejs-grid [dataSource]="gridData"></ejs-grid>
      </ng-template>
    </e-tabitem>
  </e-tabitems>
</ejs-tab>
```

### Behavior

1. Tab 1 (Login) renders on load
2. User clicks Tab 2 (Grid)
3. Tab 1 content removed from DOM
4. Tab 2 content added to DOM
5. User clicks Tab 1 again
6. Tab 2 content removed, Tab 1 re-rendered from scratch

### Advantages

- **Optimal memory usage:** Only one tab's content in DOM at any time
- **Fastest initial load:** Minimal initial DOM
- **Large tab sets:** Scale well with many tabs (20+)
- **Lightweight:** No accumulation of DOM nodes

### Disadvantages

- **No state preservation:** Tab re-renders on each visit (form loses input, scroll resets)
- **Slower switching:** Each tab switch triggers re-render
- **UX friction:** Stateful components reset every visit
- **Component re-initialization:** Event handlers, subscriptions re-bind

### Best For

- **Many tabs (15+):** Memory-constrained or performance-critical
- **Stateless content:** Tabs display reference data, not user edits
- **Mobile devices:** Limited memory, prioritize performance
- **Single-view workflows:** Users typically visit each tab once
- **Heavy components:** Each tab is computationally expensive

### Example: When Dynamic Works Well

```typescript
// Read-only data display - state doesn't matter
<ejs-tab loadOn="Dynamic">
  <e-tabitems>
    <e-tabitem [header]="{ text: 'Products' }">
      <ng-template #content>
        <ejs-grid [dataSource]="products"></ejs-grid>
      </ng-template>
    </e-tabitem>
    <e-tabitem [header]="{ text: 'Orders' }">
      <ng-template #content>
        <ejs-grid [dataSource]="orders"></ejs-grid>
      </ng-template>
    </e-tabitem>
    <e-tabitem [header]="{ text: 'Customers' }">
      <ng-template #content>
        <ejs-grid [dataSource]="customers"></ejs-grid>
      </ng-template>
    </e-tabitem>
  </e-tabitems>
</ejs-tab>
```

## Init Mode

### How It Works

All tab content is rendered on initial component load and stays in the DOM. No lazy loading or on-demand rendering occurs.

### Configuration

```typescript
<ejs-tab 
  id="element" 
  loadOn="Init"
  heightAdjustMode="Auto">
  <e-tabitems>
    <e-tabitem [header]="{ text: 'Dashboard' }">
      <ng-template #content>
        <app-dashboard></app-dashboard>
      </ng-template>
    </e-tabitem>
    <e-tabitem [header]="{ text: 'Analytics' }">
      <ng-template #content>
        <app-analytics></app-analytics>
      </ng-template>
    </e-tabitem>
    <e-tabitem [header]="{ text: 'Reports' }">
      <ng-template #content>
        <app-reports></app-reports>
      </ng-template>
    </e-tabitem>
  </e-tabitems>
</ejs-tab>
```

### Behavior

1. Component renders all 3 tabs (Dashboard, Analytics, Reports) immediately
2. All content in DOM before user interaction
3. User clicks between tabs instantly - no rendering
4. Switching is instant because content already exists
5. Can access component references from other tabs

### Advantages

- **Instant switching:** Fastest tab navigation (no re-render)
- **State preservation:** Full state across all tabs
- **Component references:** Access any tab's components programmatically
- **Predictable UX:** No lag when switching

### Disadvantages

- **Slow initial load:** All tabs rendered upfront, slower first paint
- **High memory usage:** All components in DOM simultaneously
- **Poor scaling:** Breaks with many tabs (10+)
- **Resource intensive:** Every tab's API calls, subscriptions load immediately

### Best For

- **Few tabs (3-7):** Small number manageable upfront
- **Simple content:** Light components, quick to render
- **Dashboard-like apps:** All panes typically visible eventually
- **Stateful workflows:** Need immediate state access
- **Desktop apps:** Memory not a constraint

## Comparison & Selection Guide

| Aspect | On Demand | Dynamic | Init |
|--------|-----------|---------|------|
| **Initial Load Speed** | Medium | Fast | Slow |
| **Tab Switching Speed** | Very Fast (cached) | Slow | Very Fast |
| **Memory Usage** | Medium | Minimal | High |
| **State Preservation** | Yes | No | Yes |
| **Ideal Tab Count** | 3-15 | 15+ | 3-7 |
| **Form Data Retention** | Yes | No | Yes |
| **Component Reuse** | Partial | Full | Full |

### Decision Tree

```
Question: How many tabs do you have?
├─ 3-7 tabs AND simple content
│  └─→ Use Init Mode (fast switching)
├─ 3-15 tabs AND need state preservation
│  └─→ Use On Demand (balanced)
└─ 15+ tabs OR memory constrained
   └─→ Use Dynamic (optimized)

Question: Do users need to preserve their edits between tab switches?
├─ Yes → Use On Demand or Init
└─ No → Use Dynamic

Question: Is initial page load speed critical?
├─ Yes → Use On Demand or Dynamic
└─ No → Use Init
```

## Performance Considerations

### Measuring Performance

```typescript
// Monitor tab rendering performance
export class AppComponent implements OnInit {
  @ViewChild('tabObj') tabObj?: TabComponent;

  ngOnInit() {
    // Measure time to first tab render
    console.time('tab-render');
    // ... tab initialization
    console.timeEnd('tab-render');
  }

  onTabSelected(args: SelectEventArgs) {
    // Measure tab switching time
    console.time('switch-' + args.selectedIndex);
    // ... tab switch complete
    console.timeEnd('switch-' + args.selectedIndex);
  }
}
```

### Memory Profiling

Use Chrome DevTools to profile memory usage:
1. Open DevTools → Memory tab
2. Take heap snapshot before and after tab operations
3. Compare memory growth across modes
4. Identify memory leaks in components

### Best Practices

- **On Demand:** Default choice for most applications
- **Dynamic:** Only if profiling shows memory issues
- **Init:** Only if performance profiling shows fast enough
- **Profile first:** Test with realistic content before choosing
- **Mobile focus:** Use Dynamic or On Demand on mobile
- **Desktop focus:** On Demand or Init acceptable
- **Monitor:** Track performance metrics in production

## Switching Between Modes

You can change rendering mode at runtime:

```typescript
export class AppComponent {
  @ViewChild('tabObj') tabObj?: TabComponent;

  switchMode(mode: 'Dynamic' | 'Init' | 'Default') {
    (this.tabObj as TabComponent).loadOn = mode;
    (this.tabObj as TabComponent).refresh();
  }
}
```

However, switching modes causes all content to be re-rendered, so do this sparingly.
