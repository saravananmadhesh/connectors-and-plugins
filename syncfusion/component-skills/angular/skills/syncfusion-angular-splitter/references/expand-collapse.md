# Expand and Collapse Panes

Enable users to show/hide panes with expand/collapse icons or control pane visibility programmatically.

## Collapsible Panes

### Enable Collapse Icons

Set `[collapsible]='true'` on panes to display expand/collapse icons in the separator:

```typescript
import { Component } from '@angular/core';
import { SplitterModule } from '@syncfusion/ej2-angular-layouts';

@Component({
  selector: 'app-collapsible',
  standalone: true,
  imports: [SplitterModule],
  template: `
    <ejs-splitter height='250px' width='580px'>
      <e-panes>
        <e-pane size='200px' [collapsible]='true'>
          <ng-template #content>
            <div class='template'>
              <h3>PARIS</h3>
              <p>Paris, the city of lights and love...</p>
            </div>
          </ng-template>
        </e-pane>
        <e-pane size='200px' [collapsible]='true'>
          <ng-template #content>
            <div class='template'>
              <h3>CAMEMBERT</h3>
              <p>The village where the famous French cheese originated...</p>
            </div>
          </ng-template>
        </e-pane>
        <e-pane size='200px' [collapsible]='true'>
          <ng-template #content>
            <div class='template'>
              <h3>GRENOBLE</h3>
              <p>Capital city of the French Alps...</p>
            </div>
          </ng-template>
        </e-pane>
      </e-panes>
    </ejs-splitter>
  `,
  styles: [`
    .template {
      padding: 15px;
    }
  `]
})
export class CollapsiblePanesComponent {}
```

**User Interaction**: Click the expand/collapse icon next to the separator to toggle pane visibility.

### Collapse Icons Placement

- **Left/Top panes**: Icon appears on the right edge (collapses left/up)
- **Right/Bottom panes**: Icon appears on the left edge (collapses right/down)

### Multiple Collapsible Panes

All panes can be independently collapsible:

```typescript
<ejs-splitter height='300px' width='100%'>
  <e-panes>
    <e-pane size='200px' [collapsible]='true'>
      <ng-template #content>Left Panel (Collapsible)</ng-template>
    </e-pane>
    <e-pane [collapsible]='true'>
      <ng-template #content>Middle Panel (Collapsible)</ng-template>
    </e-pane>
    <e-pane size='200px' [collapsible]='true'>
      <ng-template #content>Right Panel (Collapsible)</ng-template>
    </e-pane>
  </e-panes>
</ejs-splitter>
```

### Partial Collapsible Setup

Only specific panes can be collapsible:

```typescript
<e-panes>
  <e-pane size='200px' [collapsible]='true'>
    <ng-template #content>Collapsible</ng-template>
  </e-pane>
  <e-pane size='200px' [collapsible]='false'>
    <ng-template #content>Fixed (Not Collapsible)</ng-template>
  </e-pane>
</e-panes>
```

---

## Collapsed State

### Start with Collapsed Pane

Set `collapsed` property to start with a hidden pane:

```typescript
import { Component } from '@angular/core';
import { SplitterModule } from '@syncfusion/ej2-angular-layouts';

@Component({
  selector: 'app-collapsed-state',
  standalone: true,
  imports: [SplitterModule],
  template: `
    <ejs-splitter height='250px' width='600px'>
      <e-panes>
        <e-pane size='200px' [collapsible]='true' [collapsed]='true'>
          <ng-template #content>
            <div>Hidden Panel (Start Collapsed)</div>
          </ng-template>
        </e-pane>
        <e-pane size='200px'>
          <ng-template #content>
            <div>Visible Panel</div>
          </ng-template>
        </e-pane>
        <e-pane size='200px'>
          <ng-template #content>
            <div>Visible Panel</div>
          </ng-template>
        </e-pane>
      </e-panes>
    </ejs-splitter>
  `
})
export class CollapsedStateComponent {}
```

**Result**: Splitter loads with the first pane hidden (taking no space). Click expand icon to reveal it.

---

## Programmatic Expand/Collapse

### Expand Pane

Use the `expand()` method to show a collapsed pane:

```typescript
import { Component, ViewChild } from '@angular/core';
import { SplitterModule, SplitterComponent } from '@syncfusion/ej2-angular-layouts';

@Component({
  selector: 'app-expand-control',
  standalone: true,
  imports: [SplitterModule],
  template: `
    <div>
      <button class='e-btn' (click)='expandPane()'>Expand Panel 1</button>
    </div>
    <ejs-splitter #splitter height='250px' width='600px'>
      <e-panes>
        <e-pane size='200px' [collapsible]='true' [collapsed]='true'>
          <ng-template #content>
            <div>Panel 1</div>
          </ng-template>
        </e-pane>
        <e-pane size='200px'>
          <ng-template #content>
            <div>Panel 2</div>
          </ng-template>
        </e-pane>
      </e-panes>
    </ejs-splitter>
  `
})
export class ExpandControlComponent {
  @ViewChild('splitter') splitterObj?: SplitterComponent;

  expandPane(): void {
    // Expand pane at index 0
    this.splitterObj!.expand(0);
  }
}
```

**Parameters:**
- `index`: Pane index to expand (0 = first pane, 1 = second pane, etc.)

### Collapse Pane

Use the `collapse()` method to hide a visible pane:

```typescript
import { Component, ViewChild } from '@angular/core';
import { SplitterModule, SplitterComponent } from '@syncfusion/ej2-angular-layouts';

@Component({
  selector: 'app-collapse-control',
  standalone: true,
  imports: [SplitterModule],
  template: `
    <div>
      <button class='e-btn' (click)='collapsePane()'>Collapse Panel 1</button>
    </div>
    <ejs-splitter #splitter height='250px' width='600px'>
      <e-panes>
        <e-pane size='200px' [collapsible]='true'>
          <ng-template #content>
            <div>Panel 1</div>
          </ng-template>
        </e-pane>
        <e-pane size='200px'>
          <ng-template #content>
            <div>Panel 2</div>
          </ng-template>
        </e-pane>
      </e-panes>
    </ejs-splitter>
  `
})
export class CollapseControlComponent {
  @ViewChild('splitter') splitterObj?: SplitterComponent;

  collapsePane(): void {
    // Collapse pane at index 0
    this.splitterObj!.collapse(0);
  }
}
```

### Expand Multiple Panes

```typescript
expandAllPanes(): void {
  this.splitterObj!.expand(0);
  this.splitterObj!.expand(1);
  this.splitterObj!.expand(2);
}
```

### Collapse Multiple Panes

```typescript
collapseAllPanes(): void {
  this.splitterObj!.collapse(0);
  this.splitterObj!.collapse(1);
}
```

---

## Real-World Examples

### Dashboard with Collapsible Filters

```typescript
import { Component, ViewChild } from '@angular/core';
import { SplitterModule, SplitterComponent } from '@syncfusion/ej2-angular-layouts';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [SplitterModule],
  template: `
    <div>
      <button class='e-btn' (click)='toggleFilters()'>Toggle Filters</button>
    </div>
    <ejs-splitter height='400px' width='100%'>
      <e-panes>
        <!-- Filters panel -->
        <e-pane size='250px' [collapsible]='true'>
          <ng-template #content>
            <div class='filters'>
              <h3>Filters</h3>
              <p>Filter controls here</p>
            </div>
          </ng-template>
        </e-pane>
        <!-- Main dashboard -->
        <e-pane>
          <ng-template #content>
            <div class='dashboard'>
              <h3>Dashboard</h3>
              <p>Charts and data here</p>
            </div>
          </ng-template>
        </e-pane>
        <!-- Details panel -->
        <e-pane size='300px' [collapsible]='true'>
          <ng-template #content>
            <div class='details'>
              <h3>Details</h3>
              <p>Selected item details</p>
            </div>
          </ng-template>
        </e-pane>
      </e-panes>
    </ejs-splitter>
  `,
  styles: [`
    .filters, .dashboard, .details {
      padding: 15px;
    }
  `]
})
export class DashboardComponent {
  @ViewChild('splitter') splitterObj?: SplitterComponent;
  private isFilterCollapsed = false;

  toggleFilters(): void {
    if (this.isFilterCollapsed) {
      this.splitterObj!.expand(0);
      this.isFilterCollapsed = false;
    } else {
      this.splitterObj!.collapse(0);
      this.isFilterCollapsed = true;
    }
  }
}
```

### Mobile-Responsive Navigation

```typescript
import { Component, ViewChild, OnInit } from '@angular/core';
import { SplitterModule, SplitterComponent } from '@syncfusion/ej2-angular-layouts';

@Component({
  selector: 'app-mobile-nav',
  standalone: true,
  imports: [SplitterModule],
  template: `
    <ejs-splitter #splitter height='100vh' width='100%'>
      <e-panes>
        <e-pane size='250px' [collapsible]='true' [collapsed]='isMobile'>
          <ng-template #content>
            <div>Navigation Menu</div>
          </ng-template>
        </e-pane>
        <e-pane>
          <ng-template #content>
            <div>Main Content</div>
          </ng-template>
        </e-pane>
      </e-panes>
    </ejs-splitter>
  `
})
export class MobileNavComponent implements OnInit {
  @ViewChild('splitter') splitterObj?: SplitterComponent;
  isMobile = false;

  ngOnInit(): void {
    this.isMobile = window.innerWidth < 768;
    window.addEventListener('resize', this.onResize.bind(this));
  }

  onResize(): void {
    this.isMobile = window.innerWidth < 768;
    if (this.isMobile) {
      this.splitterObj!.collapse(0);
    } else {
      this.splitterObj!.expand(0);
    }
  }
}
```

---

## Key Points

✓ Only `collapsible='true'` panes can be collapsed
✓ Collapsed panes take no space in the layout
✓ Icons indicate which direction pane will collapse
✓ Users can collapse/expand manually or via buttons
✓ Programmatic methods give you full control over pane visibility

