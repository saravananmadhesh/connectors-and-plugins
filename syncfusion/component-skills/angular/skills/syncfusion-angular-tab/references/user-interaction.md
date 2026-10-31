# User Interaction & Reordering

## Table of Contents
- [Overview](#overview)
- [Drag & Drop Reordering](#drag--drop-reordering)
- [Event Detection](#event-detection)
- [Touch Interactions](#touch-interactions)
- [State Change Tracking](#state-change-tracking)

## Overview

The Tab component supports rich user interactions including:
- Drag-and-drop reordering
- Click detection on specific elements
- Touch and swipe gestures
- Double-click actions
- Hover effects
- State change tracking

## Drag & Drop Reordering

> **Note:** For comprehensive drag-and-drop documentation including `allowDragAndDrop` property, `dragArea` configuration, and drag event handling, see **[drag-and-drop-reordering.md](drag-and-drop-reordering.md)**.

### Quick Overview

Tabs can be reordered via drag-and-drop by enabling the `allowDragAndDrop` property:

```typescript
import { Component } from '@angular/core';
import { TabModule } from '@syncfusion/ej2-angular-navigations';

@Component({
  imports: [TabModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <div style="margin: 20px;">
      <p>Drag tabs to reorder them</p>
    </div>

    <ejs-tab 
      id="element"
      [allowDragAndDrop]="true"
      dragArea="#container">
      <e-tabitems>
        <e-tabitem [header]="{ text: 'Home' }" content="Home content"></e-tabitem>
        <e-tabitem [header]="{ text: 'Settings' }" content="Settings content"></e-tabitem>
        <e-tabitem [header]="{ text: 'Profile' }" content="Profile content"></e-tabitem>
        <e-tabitem [header]="{ text: 'About' }" content="About content"></e-tabitem>
      </e-tabitems>
    </ejs-tab>
  `
})
export class AppComponent { }
```

### Drag & Drop Key Properties

- **`allowDragAndDrop`** (boolean) - Enable/disable drag-drop functionality
- **`dragArea`** (string) - CSS selector defining the drag boundary
- **`onDragStart`** (event) - Fires before drag begins (cancellable)
- **`dragged`** (event) - Fires when drop is complete (cancellable)

### Double-Click Activation

Double-clicking activates a tab for editing or other actions:

```typescript
import { Component, ViewChild } from '@angular/core';
import { TabModule, TabComponent, SelectEventArgs } from '@syncfusion/ej2-angular-navigations';

@Component({
  imports: [TabModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <ejs-tab #tabObj (selected)="onTabSelected($event)">
      <e-tabitems>
        <e-tabitem [header]="{ text: 'Edit Me' }" content="Content 1"></e-tabitem>
        <e-tabitem [header]="{ text: 'Edit Me' }" content="Content 2"></e-tabitem>
        <e-tabitem [header]="{ text: 'Edit Me' }" content="Content 3"></e-tabitem>
      </e-tabitems>
    </ejs-tab>
  `
})
export class AppComponent {
  @ViewChild('tabObj') tabObj?: TabComponent;
  private lastClickTime = 0;
  private lastClickIndex = -1;

  onTabSelected(args: SelectEventArgs) {
    const currentTime = Date.now();
    const timeDiff = currentTime - this.lastClickTime;
    
    // Check if double-click (within 300ms and same tab)
    if (timeDiff < 300 && this.lastClickIndex === args.selectedIndex) {
      this.handleDoubleClick(args.selectedIndex!);
    }
    
    this.lastClickTime = currentTime;
    this.lastClickIndex = args.selectedIndex!;
  }

  private handleDoubleClick(tabIndex: number) {
    console.log('Double-clicked tab:', tabIndex);
    // Enter edit mode or perform custom action
  }
}
```

### Handling Reordered Tabs

When using `allowDragAndDrop`, listen to the `dragged` event to perform actions after reordering:

```typescript
import { Component, ViewChild } from '@angular/core';
import { TabModule, TabComponent, DragEventArgs } from '@syncfusion/ej2-angular-navigations';

@Component({
  imports: [TabModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <p>{{ reorderMessage }}</p>
    <ejs-tab 
      #tabObj
      [allowDragAndDrop]="true"
      (dragged)="onTabDragged($event)">
      <e-tabitems>
        <e-tabitem [header]="{ text: 'First' }" content="Content 1"></e-tabitem>
        <e-tabitem [header]="{ text: 'Second' }" content="Content 2"></e-tabitem>
        <e-tabitem [header]="{ text: 'Third' }" content="Content 3"></e-tabitem>
      </e-tabitems>
    </ejs-tab>
  `
})
export class AppComponent {
  @ViewChild('tabObj') tabObj?: TabComponent;
  public reorderMessage = 'Drag tabs to reorder them';

  onTabDragged(args: DragEventArgs): void {
    if (!args.cancel) {
      // Save new tab order to database
      const tabOrder = (this.tabObj as TabComponent).items!.map((item: any) => item.header?.text);
      this.reorderMessage = `Tabs reordered: ${tabOrder.join(', ')}`;
      console.log('New tab order:', tabOrder);
      
      // Optionally save to server
      // this.saveTabOrder(tabOrder);
    }
  }
}
```

## Event Detection

### Click on Specific Header Element

Detect clicks on close button or icon:

```typescript
import { Component, ViewChild } from '@angular/core';
import { TabModule, TabComponent } from '@syncfusion/ej2-angular-navigations';

@Component({
  imports: [TabModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <ejs-tab #tabObj>
      <e-tabitems>
        <e-tabitem [header]="headerWithClose[0]" content="Content 1"></e-tabitem>
        <e-tabitem [header]="headerWithClose[1]" content="Content 2"></e-tabitem>
        <e-tabitem [header]="headerWithClose[2]" content="Content 3"></e-tabitem>
      </e-tabitems>
    </ejs-tab>
  `
})
export class AppComponent {
  @ViewChild('tabObj') tabObj?: TabComponent;

  public headerWithClose: object[] = [
    { text: 'Tab 1', iconCss: 'e-close-icon' },
    { text: 'Tab 2', iconCss: 'e-close-icon' },
    { text: 'Tab 3', iconCss: 'e-close-icon' }
  ];

  ngAfterViewInit() {
    // Attach click handler to close buttons
    const headers = document.querySelectorAll('.e-tab-wrap');
    headers.forEach((header, index) => {
      const closeBtn = header.querySelector('.e-close-icon');
      if (closeBtn) {
        closeBtn.addEventListener('click', (e: Event) => {
          e.stopPropagation();  // Prevent tab selection
          this.closeTab(index);
        });
      }
    });
  }

  private closeTab(index: number) {
    console.log('Close tab:', index);
    (this.tabObj as TabComponent).removeTab(index);
  }
}
```

### Click on Header Text

```typescript
ngAfterViewInit() {
  const headers = document.querySelectorAll('.e-tab-wrap');
  headers.forEach((header, index) => {
    header.addEventListener('click', (e: Event) => {
      const target = e.target as HTMLElement;
      
      if (target.classList.contains('e-tab-text')) {
        console.log('Clicked text on tab', index);
      } else if (target.classList.contains('e-tab-icon')) {
        console.log('Clicked icon on tab', index);
        e.stopPropagation();
      }
    });
  });
}
```

### Mouse Events

```typescript
import { Component } from '@angular/core';
import { TabModule } from '@syncfusion/ej2-angular-navigations';

@Component({
  imports: [TabModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <ejs-tab (mouseenter)="onMouseEnter($event)" (mouseleave)="onMouseLeave($event)">
      <e-tabitems>
        <e-tabitem [header]="{ text: 'Hover Me' }" content="Content"></e-tabitem>
        <e-tabitem [header]="{ text: 'Tab 2' }" content="Content 2"></e-tabitem>
      </e-tabitems>
    </ejs-tab>
  `
})
export class AppComponent {
  onMouseEnter(event: MouseEvent) {
    const target = event.target as HTMLElement;
    console.log('Mouse entered:', target.textContent);
    target.style.backgroundColor = '#f0f0f0';
  }

  onMouseLeave(event: MouseEvent) {
    const target = event.target as HTMLElement;
    console.log('Mouse left:', target.textContent);
    target.style.backgroundColor = '';
  }
}
```

## Touch Interactions

### Prevent Touch Swipe

Disable swipe navigation on touch devices:

```typescript
import { Component } from '@angular/core';
import { TabModule } from '@syncfusion/ej2-angular-navigations';

@Component({
  imports: [TabModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <!-- Swipe disabled -->
    <ejs-tab [allowDragAndDrop]="false">
      <e-tabitems>
        <e-tabitem [header]="{ text: 'Tab 1' }" content="Content 1"></e-tabitem>
        <e-tabitem [header]="{ text: 'Tab 2' }" content="Content 2"></e-tabitem>
      </e-tabitems>
    </ejs-tab>
  `
})
export class AppComponent { }
```

### Custom Touch Handler

```typescript
import { Component, ViewChild, HostListener } from '@angular/core';
import { TabModule, TabComponent } from '@syncfusion/ej2-angular-navigations';

@Component({
  imports: [TabModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <ejs-tab #tabObj>
      <e-tabitems>
        <e-tabitem [header]="{ text: 'Tab 1' }" content="Content 1"></e-tabitem>
        <e-tabitem [header]="{ text: 'Tab 2' }" content="Content 2"></e-tabitem>
        <e-tabitem [header]="{ text: 'Tab 3' }" content="Content 3"></e-tabitem>
      </e-tabitems>
    </ejs-tab>
  `
})
export class AppComponent {
  @ViewChild('tabObj') tabObj?: TabComponent;
  private touchStartX = 0;

  @HostListener('touchstart', ['$event'])
  onTouchStart(event: TouchEvent) {
    this.touchStartX = event.touches[0].clientX;
  }

  @HostListener('touchend', ['$event'])
  onTouchEnd(event: TouchEvent) {
    const touchEndX = event.changedTouches[0].clientX;
    const diff = this.touchStartX - touchEndX;
    const threshold = 50;  // Minimum swipe distance

    const tab = this.tabObj as TabComponent;
    const currentIndex = tab.selectedIndex!;
    const totalTabs = tab.items!.length;

    if (Math.abs(diff) > threshold) {
      if (diff > 0) {
        // Swipe left - go to next tab
        const nextIndex = (currentIndex + 1) % totalTabs;
        tab.select(nextIndex);
      } else {
        // Swipe right - go to previous tab
        const prevIndex = currentIndex === 0 ? totalTabs - 1 : currentIndex - 1;
        tab.select(prevIndex);
      }
    }
  }
}
```

## State Change Tracking

### Track Tab Changes

```typescript
import { Component } from '@angular/core';
import { TabModule, SelectEventArgs } from '@syncfusion/ej2-angular-navigations';

@Component({
  imports: [TabModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <div style="margin: 20px;">
      <h3>Change History</h3>
      <div style="height: 300px; overflow-y: auto; border: 1px solid #ccc; padding: 10px;">
        <div *ngFor="let change of changeHistory">
          {{ change }}
        </div>
      </div>
    </div>

    <ejs-tab (selected)="onTabSelected($event)">
      <e-tabitems>
        <e-tabitem [header]="{ text: 'Tab 1' }" content="Content 1"></e-tabitem>
        <e-tabitem [header]="{ text: 'Tab 2' }" content="Content 2"></e-tabitem>
        <e-tabitem [header]="{ text: 'Tab 3' }" content="Content 3"></e-tabitem>
      </e-tabitems>
    </ejs-tab>
  `
})
export class AppComponent {
  public changeHistory: string[] = [];

  onTabSelected(args: SelectEventArgs) {
    const timestamp = new Date().toLocaleTimeString();
    const source = args.isInteracted ? 'User' : 'Program';
    const tabNames = ['Tab 1', 'Tab 2', 'Tab 3'];
    const fromTab = tabNames[args.previousIndex!] || 'None';
    const toTab = tabNames[args.selectedIndex!];

    const message = `[${timestamp}] ${source}: ${fromTab} → ${toTab}`;
    this.changeHistory.push(message);

    // Keep last 50 changes
    if (this.changeHistory.length > 50) {
      this.changeHistory.shift();
    }
  }
}
```

### Persist State Changes

```typescript
// Save tab changes to localStorage
export class AppComponent {
  public changeHistory: object[] = [];

  ngOnInit() {
    this.loadChangeHistory();
  }

  onTabSelected(args: SelectEventArgs) {
    const change = {
      timestamp: Date.now(),
      fromIndex: args.previousIndex,
      toIndex: args.selectedIndex,
      isUserAction: args.isInteracted
    };

    this.changeHistory.push(change);
    this.saveChangeHistory();
  }

  private saveChangeHistory() {
    localStorage.setItem(
      'tab-changes',
      JSON.stringify(this.changeHistory)
    );
  }

  private loadChangeHistory() {
    const saved = localStorage.getItem('tab-changes');
    this.changeHistory = saved ? JSON.parse(saved) : [];
  }
}
```

## Common Patterns

### Tab with Close Button

```typescript
import { Component, ViewChild } from '@angular/core';
import { TabModule, TabComponent } from '@syncfusion/ej2-angular-navigations';

@Component({
  imports: [TabModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <div style="margin: 20px;">
      <button (click)="addTab()">+ Add Tab</button>
    </div>

    <ejs-tab #tabObj>
      <e-tabitems>
        <e-tabitem [header]="headerWithIcon[0]" content="Content 1"></e-tabitem>
      </e-tabitems>
    </ejs-tab>
  `
})
export class AppComponent {
  @ViewChild('tabObj') tabObj?: TabComponent;
  private tabCounter = 1;

  public headerWithIcon: object[] = [
    { text: 'Tab 1' }
  ];

  addTab() {
    this.tabCounter++;
    const newTab = {
      header: { text: `Tab ${this.tabCounter}` },
      content: `Content for tab ${this.tabCounter}`
    };

    (this.tabObj as TabComponent).addTab([newTab]);

    // Attach close handler to new tab
    setTimeout(() => {
      this.attachCloseHandler((this.tabObj as TabComponent).items!.length - 1);
    }, 0);
  }

  private attachCloseHandler(index: number) {
    const headers = document.querySelectorAll('.e-tab-wrap');
    const header = headers[index];
    
    if (header) {
      header.addEventListener('dblclick', () => {
        (this.tabObj as TabComponent).removeTab(index);
      });
    }
  }
}
```

### Confirm Before Close

```typescript
onCloseTab(index: number) {
  if (confirm('Are you sure you want to close this tab?')) {
    (this.tabObj as TabComponent).removeTab(index);
  }
}
```

### Save State on Close

```typescript
onCloseTab(index: number) {
  // Save tab state before closing
  const tab = (this.tabObj as TabComponent);
  const tabData = tab.items![index];
  
  // Store in localStorage or database
  this.saveTabState(tabData);
  
  // Remove tab
  tab.removeTab(index);
}
```
