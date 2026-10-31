# Expand Modes in Angular Accordion

## Table of Contents
- [Overview](#overview)
- [Single Expand Mode](#single-expand-mode)
- [Multiple Expand Mode](#multiple-expand-mode)
- [Use Cases](#use-cases)
- [Performance Considerations](#performance-considerations)
- [Switching Modes](#switching-modes)
- [ExpandMode Enum API](#expandmode-enum-api)
- [Programmatic Expand/Collapse](#programmatic-expandcollapse)

## Overview

The Accordion component supports two expand modes that control how many items can be open simultaneously:

1. **Single Mode** - Only one item can be expanded at a time. Opening a new item collapses the previously open item.
2. **Multiple Mode** - Default behavior. Multiple items can be expanded simultaneously. Clicking an item toggles its state independently.

Set the mode using the `expandMode` property on the `<ejs-accordion>` component.

## Single Expand Mode

### Configuration

Single expand mode allows only one accordion item to be open at a time. When you expand a new item, the currently open item automatically collapses.

```typescript
import { Component } from '@angular/core';
import { AccordionModule } from '@syncfusion/ej2-angular-navigations';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [AccordionModule],
  template: `
    <ejs-accordion expandMode="Single">
      <e-accordionitems>
        <e-accordionitem expanded="true">
          <ng-template #header>
            <div>ASP.NET</div>
          </ng-template>
          <ng-template #content>
            <div>Microsoft ASP.NET is a set of technologies in the Microsoft .NET Framework.</div>
          </ng-template>
        </e-accordionitem>

        <e-accordionitem>
          <ng-template #header>
            <div>ASP.NET MVC</div>
          </ng-template>
          <ng-template #content>
            <div>The Model-View-Controller (MVC) architectural pattern separates an application into three main components.</div>
          </ng-template>
        </e-accordionitem>

        <e-accordionitem>
          <ng-template #header>
            <div>JavaScript</div>
          </ng-template>
          <ng-template #content>
            <div>JavaScript is an interpreted computer programming language.</div>
          </ng-template>
        </e-accordionitem>
      </e-accordionitems>
    </ejs-accordion>
  `
})
export class AppComponent {}
```

### Initial Expanded Item

Use the `expanded` property to set which item is initially open:

```typescript
<ejs-accordion expandMode="Single">
  <e-accordionitems>
    <e-accordionitem expanded="false">
      <ng-template #header>Item 1</ng-template>
      <ng-template #content>Content 1</ng-template>
    </e-accordionitem>
    
    <e-accordionitem expanded="true">  <!-- This item opens initially -->
      <ng-template #header>Item 2</ng-template>
      <ng-template #content>Content 2</ng-template>
    </e-accordionitem>
  </e-accordionitems>
</ejs-accordion>
```

### Behavior

- **No item initially open:** All items start collapsed; user must click to expand
- **One item initially open:** That item displays expanded; clicking another collapses it
- **User interaction:** Clicking a header expands it and collapses the previously open item
- **Smooth transition:** Animation makes the collapse/expand feel natural

### Example with Dynamic Items Array

```typescript
import { Component } from '@angular/core';
import { AccordionModule } from '@syncfusion/ej2-angular-navigations';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [AccordionModule],
  template: `<ejs-accordion expandMode="Single" [items]="items"></ejs-accordion>`
})
export class AppComponent {
  public items = [
    { header: 'Technologies', content: 'Web technologies overview', expanded: true },
    { header: 'Languages', content: 'Programming languages guide' },
    { header: 'Frameworks', content: 'Popular frameworks comparison' }
  ];
}
```

## Multiple Expand Mode

### Configuration

Multiple expand mode is the default. Any number of accordion items can be open simultaneously. Clicking an item toggles only that item's state without affecting others.

```typescript
import { Component } from '@angular/core';
import { AccordionModule } from '@syncfusion/ej2-angular-navigations';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [AccordionModule],
  template: `
    <ejs-accordion expandMode="Multiple">
      <e-accordionitems>
        <e-accordionitem expanded="true">
          <ng-template #header>
            <div>Item 1</div>
          </ng-template>
          <ng-template #content>
            <div>Content 1 - This item is initially open</div>
          </ng-template>
        </e-accordionitem>

        <e-accordionitem>
          <ng-template #header>
            <div>Item 2</div>
          </ng-template>
          <ng-template #content>
            <div>Content 2 - Click to expand without collapsing Item 1</div>
          </ng-template>
        </e-accordionitem>

        <e-accordionitem>
          <ng-template #header>
            <div>Item 3</div>
          </ng-template>
          <ng-template #content>
            <div>Content 3 - Can be open alongside Item 1 and Item 2</div>
          </ng-template>
        </e-accordionitem>
      </e-accordionitems>
    </ejs-accordion>
  `
})
export class AppComponent {}
```

**Note:** If you omit `expandMode`, it defaults to Multiple mode.

```typescript
<!-- These are equivalent: -->
<ejs-accordion expandMode="Multiple"><!-- ... --></ejs-accordion>
<ejs-accordion><!-- ... --></ejs-accordion>
```

### Behavior

- **Multiple items open:** Clicking one doesn't close others
- **Toggle behavior:** Clicking an open item's header closes it
- **Independent state:** Each item's open/close state is independent
- **All collapsed allowed:** All items can be collapsed simultaneously

### Example with All Items Initially Expanded

```typescript
import { Component } from '@angular/core';
import { AccordionModule } from '@syncfusion/ej2-angular-navigations';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [AccordionModule],
  template: `<ejs-accordion expandMode="Multiple" [items]="items"></ejs-accordion>`
})
export class AppComponent {
  public items = [
    { header: 'Feature 1', content: 'Description of feature 1', expanded: true },
    { header: 'Feature 2', content: 'Description of feature 2', expanded: true },
    { header: 'Feature 3', content: 'Description of feature 3', expanded: true }
  ];
}
```

## Use Cases

### Single Expand Mode Best For:

1. **Navigation Menus**
   - Only one category visible at a time
   - Clear navigation flow
   - Prevents information overload

   ```typescript
   expandMode="Single"  <!-- User navigates one section at a time -->
   ```

2. **Settings Panels**
   - Focus user attention on one setting category
   - Reduces cognitive load
   - Common in mobile interfaces

3. **Step-by-Step Wizards**
   - One step active at a time
   - Clear progression through workflow
   - Users see one task at a time

4. **Content Organization**
   - When content is mutually exclusive
   - Users focus on one topic
   - Prevents overwhelming display

### Multiple Expand Mode Best For:

1. **Comparison Scenarios**
   - Keep multiple items open to compare
   - Users switch between open sections
   - Flexible information access

2. **FAQ Sections**
   - Users browse multiple questions simultaneously
   - No forced navigation flow
   - Natural question-browsing experience

3. **Data Exploration**
   - Multiple data categories visible
   - Users explore different aspects
   - Comprehensive overview without collapsing

4. **Settings with Dependencies**
   - Multiple related settings visible
   - User sees all relevant options
   - Helps understand relationships

## Performance Considerations

### Multiple Mode with Large Datasets

When using **Multiple** expand mode with many items (50+), consider:

1. **Large Content Blocks**
   - Each open item renders full content
   - Multiple expanded items = significant DOM
   - Can slow down rendering

2. **Performance Optimization Strategies**

   **Option 1: Use Single Mode**
   ```typescript
   expandMode="Single"  <!-- Only one item rendered in DOM -->
   ```

   **Option 2: Lazy Content Loading**
   ```typescript
   <e-accordionitem>
     <ng-template #content>
       <!-- Load content on expand event, not upfront -->
     </ng-template>
   </e-accordionitem>
   ```

   **Option 3: Virtualization**
   - For scrollable accordions with many items
   - Render only visible items
   - Reduces DOM size

### Memory Considerations

- **Multiple mode:** All open item content in memory
- **Single mode:** Only one item content in memory
- **Dynamic loading:** Load content only when needed

### Recommendation

For 50+ items, use **Single mode** or implement lazy loading to ensure smooth performance.

## Switching Modes

### Change Expand Mode Dynamically

```typescript
import { Component, ViewChild } from '@angular/core';
import { AccordionModule, AccordionComponent } from '@syncfusion/ej2-angular-navigations';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [AccordionModule],
  template: `
    <button (click)="toggleMode()">Switch to {{ currentMode === 'Single' ? 'Multiple' : 'Single' }} Mode</button>
    
    <ejs-accordion #accordion [expandMode]="currentMode">
      <e-accordionitems>
        <e-accordionitem expanded="true">
          <ng-template #header>Item 1</ng-template>
          <ng-template #content>Content 1</ng-template>
        </e-accordionitem>
        <e-accordionitem>
          <ng-template #header>Item 2</ng-template>
          <ng-template #content>Content 2</ng-template>
        </e-accordionitem>
      </e-accordionitems>
    </ejs-accordion>
  `
})
export class AppComponent {
  @ViewChild('accordion') accordion?: AccordionComponent;
  
  public currentMode: 'Single' | 'Multiple' = 'Single';

  toggleMode() {
    this.currentMode = this.currentMode === 'Single' ? 'Multiple' : 'Single';
  }
}
```

When you change `expandMode`, the accordion updates immediately. The current expanded items remain open until the user interacts with them.

## ExpandMode Enum API

The `expandMode` property accepts one of two string values from the `ExpandMode` enum:

### `'Single'` Mode
**Value:** `'Single'`  
**Behavior:** Only one accordion item can be expanded at a time.  
**Default expanded items:** Specify via `expanded: true` on item  
**User action:** Expanding one item automatically collapses others

**Example:**
```typescript
<ejs-accordion expandMode="Single" [items]="items"></ejs-accordion>
```

### `'Multiple'` Mode
**Value:** `'Multiple'` (Default)  
**Behavior:** Multiple accordion items can be expanded simultaneously.  
**Default expanded items:** All items with `expanded: true` open  
**User action:** Each item toggles independently

**Example:**
```typescript
<ejs-accordion expandMode="Multiple" [items]="items"></ejs-accordion>
```

Or without specifying (uses default):
```typescript
<ejs-accordion [items]="items"></ejs-accordion>
```

### Property Behavior Comparison

| Scenario | Single Mode | Multiple Mode |
|----------|-------------|---------------|
| Click item 1 | Item 1 expands | Item 1 expands |
| Click item 2 | Item 1 collapses, Item 2 expands | Item 1 stays open, Item 2 expands |
| Multiple `expanded: true` | Only first one opens | All open |
| No initial expanded items | All stay closed | All stay closed |
| Performance with 100+ items | Better (one item open) | May slow down |

## Programmatic Expand/Collapse

Use the `expandItem()` method to control expand mode behavior programmatically:

### Expand Specific Item

```typescript
import { Component, ViewChild } from '@angular/core';
import { AccordionModule, AccordionComponent } from '@syncfusion/ej2-angular-navigations';

@Component({
  selector: 'app-expand-item',
  standalone: true,
  imports: [AccordionModule],
  template: `
    <button (click)="expandByIndex(1)">Expand Item at Index 1</button>
    <button (click)="expandByIndex(2)">Expand Item at Index 2</button>
    
    <ejs-accordion #accordion expandMode="Single" [items]="items"></ejs-accordion>
  `
})
export class AppComponent {
  @ViewChild('accordion') accordionObj?: AccordionComponent;

  public items = [
    { header: 'Item 1', content: 'Content 1' },
    { header: 'Item 2', content: 'Content 2' },
    { header: 'Item 3', content: 'Content 3' }
  ];

  expandByIndex(index: number) {
    if (this.accordionObj) {
      // In single mode, expanding one item collapses others
      this.accordionObj.expandItem(true, index);
    }
  }
}
```

### Expand All Items in Multiple Mode

```typescript
expandAllItems() {
  if (this.accordionObj) {
    // Without index parameter, expands all items (Multiple mode only)
    this.accordionObj.expandItem(true);
  }
}
```

### Collapse All Items

```typescript
collapseAllItems() {
  if (this.accordionObj) {
    // Collapses all items regardless of mode
    this.accordionObj.expandItem(false);
  }
}
```

### Collapse Specific Item (Multiple Mode Only)

```typescript
collapseByIndex(index: number) {
  if (this.accordionObj) {
    // In Multiple mode, can collapse specific item
    this.accordionObj.expandItem(false, index);
  }
}
```

### Example: Mode-Aware Expand Logic

```typescript
import { Component, ViewChild } from '@angular/core';
import { AccordionModule, AccordionComponent } from '@syncfusion/ej2-angular-navigations';

@Component({
  selector: 'app-mode-aware',
  standalone: true,
  imports: [AccordionModule],
  template: `
    <ejs-accordion 
      #accordion 
      [expandMode]="mode" 
      [items]="items"
      (expanding)="onExpanding($event)">
    </ejs-accordion>
  `
})
export class AppComponent {
  @ViewChild('accordion') accordionObj?: AccordionComponent;
  
  public mode: 'Single' | 'Multiple' = 'Single';
  public items = [
    { header: 'Config', content: 'Configuration settings' },
    { header: 'Status', content: 'Current status' },
    { header: 'Logs', content: 'Activity logs' }
  ];

  onExpanding(event: any) {
    console.log(`Item ${event.index} expanding in ${this.mode} mode`);
    if (this.mode === 'Single') {
      console.log('Other items will automatically collapse');
    }
  }
}
```

## Edge Cases and Behavior

### Empty Accordion

```typescript
// No items
const items = [];
<ejs-accordion expandMode="Single" [items]="items"></ejs-accordion>
```
Result: Empty accordion displays, no expand/collapse possible.

### All Items Disabled

```typescript
public items = [
  { header: 'Item 1', content: 'Content', disabled: true },
  { header: 'Item 2', content: 'Content', disabled: true }
];
```
Result: Headers visible but not clickable; expand mode doesn't matter.

### Expand Invalid Index

```typescript
// If items array has 3 items (indices 0-2)
this.accordionObj?.expandItem(true, 5); // Index out of range
```
Result: No effect; invalid indices are silently ignored.

