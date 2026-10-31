# Split Panes - Layouts and Orientation

## Table of Contents
- [Horizontal Layout](#horizontal-layout)
- [Vertical Layout](#vertical-layout)
- [Multiple Panes](#multiple-panes)
- [Nested Splitters](#nested-splitters)

---

## Horizontal Layout

By default, Splitter renders in **horizontal orientation** with panes arranged side-by-side, separated by a vertical draggable bar.

### Basic Two-Pane Horizontal

```typescript
import { Component } from '@angular/core';
import { SplitterModule } from '@syncfusion/ej2-angular-layouts';

@Component({
  selector: 'app-horizontal',
  standalone: true,
  imports: [SplitterModule],
  template: `
    <ejs-splitter height='250px' width='600px'>
      <e-panes>
        <e-pane size='200px'>
          <ng-template #content>
            <div class='content'>
              <h3>Left Panel</h3>
              <p>Sidebar or navigation</p>
            </div>
          </ng-template>
        </e-pane>
        <e-pane size='200px'>
          <ng-template #content>
            <div class='content'>
              <h3>Right Panel</h3>
              <p>Main content area</p>
            </div>
          </ng-template>
        </e-pane>
      </e-panes>
    </ejs-splitter>
  `,
  styles: [`
    .content {
      padding: 15px;
      text-align: center;
    }
  `]
})
export class HorizontalSplitterComponent {}
```

**Result**: Two resizable columns side-by-side. Users can drag the separator to adjust widths.

---

## Vertical Layout

Use the `orientation='Vertical'` property to stack panes vertically with a horizontal separator bar.

### Basic Two-Pane Vertical

```typescript
import { Component } from '@angular/core';
import { SplitterModule } from '@syncfusion/ej2-angular-layouts';

@Component({
  selector: 'app-vertical',
  standalone: true,
  imports: [SplitterModule],
  template: `
    <ejs-splitter orientation='Vertical' height='305px' width='600px'>
      <e-panes>
        <e-pane size='100px'>
          <ng-template #content>
            <div class='content'>
              <h3>Top Panel</h3>
              <p>Header or toolbar area</p>
            </div>
          </ng-template>
        </e-pane>
        <e-pane size='100px'>
          <ng-template #content>
            <div class='content'>
              <h3>Bottom Panel</h3>
              <p>Content or status area</p>
            </div>
          </ng-template>
        </e-pane>
      </e-panes>
    </ejs-splitter>
  `,
  styles: [`
    .content {
      padding: 15px;
      text-align: center;
    }
  `]
})
export class VerticalSplitterComponent {}
```

**Result**: Two resizable rows stacked vertically. Users can drag the separator to adjust heights.

---

## Multiple Panes

Splitter supports any number of panes in both horizontal and vertical orientations.

### Three Panes - Horizontal

```typescript
import { Component } from '@angular/core';
import { SplitterModule } from '@syncfusion/ej2-angular-layouts';

@Component({
  selector: 'app-three-panes',
  standalone: true,
  imports: [SplitterModule],
  template: `
    <ejs-splitter height='250px' width='600px'>
      <e-panes>
        <e-pane size='200px'>
          <ng-template #content>
            <div class='content'>
              <h3>Left</h3>
              <p>Filters or Navigation</p>
            </div>
          </ng-template>
        </e-pane>
        <e-pane size='200px'>
          <ng-template #content>
            <div class='content'>
              <h3>Center</h3>
              <p>Main Content</p>
            </div>
          </ng-template>
        </e-pane>
        <e-pane size='200px'>
          <ng-template #content>
            <div class='content'>
              <h3>Right</h3>
              <p>Details or Inspector</p>
            </div>
          </ng-template>
        </e-pane>
      </e-panes>
    </ejs-splitter>
  `,
  styles: [`
    .content {
      padding: 15px;
      text-align: center;
    }
  `]
})
export class ThreePanesComponent {}
```

**Result**: Three equal-width columns. Users can resize between any pair of adjacent panes.

### Three Panes - Vertical

```typescript
<ejs-splitter orientation='Vertical' height='400px' width='600px'>
  <e-panes>
    <e-pane size='100px'>
      <ng-template #content>Top Panel</ng-template>
    </e-pane>
    <e-pane size='100px'>
      <ng-template #content>Middle Panel</ng-template>
    </e-pane>
    <e-pane size='100px'>
      <ng-template #content>Bottom Panel</ng-template>
    </e-pane>
  </e-panes>
</ejs-splitter>
```

---

## Nested Splitters

Create complex layouts by placing a splitter inside another splitter's pane content.

### Two-Level Nested Layout

Example: Horizontal splitter with left sidebar containing a vertical splitter

```typescript
import { Component } from '@angular/core';
import { SplitterModule } from '@syncfusion/ej2-angular-layouts';

@Component({
  selector: 'app-nested-splitter',
  standalone: true,
  imports: [SplitterModule],
  template: `
    <ejs-splitter height='400px' width='600px'>
      <e-panes>
        <!-- Left sidebar -->
        <e-pane size='150px'>
          <ng-template #content>
            <div class='panel'>
              <h3>Sidebar</h3>
              <p>Navigation items</p>
            </div>
          </ng-template>
        </e-pane>

        <!-- Right main area with vertical split -->
        <e-pane>
          <ng-template #content>
            <!-- Nested vertical splitter -->
            <ejs-splitter orientation='Vertical' height='100%'>
              <e-panes>
                <e-pane size='150px'>
                  <ng-template #content>
                    <div class='panel'>
                      <h3>Top (Main)</h3>
                      <p>Content area</p>
                    </div>
                  </ng-template>
                </e-pane>
                <e-pane>
                  <ng-template #content>
                    <div class='panel'>
                      <h3>Bottom (Details)</h3>
                      <p>Details or logs</p>
                    </div>
                  </ng-template>
                </e-pane>
              </e-panes>
            </ejs-splitter>
          </ng-template>
        </e-pane>
      </e-panes>
    </ejs-splitter>
  `,
  styles: [`
    .panel {
      padding: 15px;
      height: 100%;
      overflow: auto;
    }
  `]
})
export class NestedSplitterComponent {}
```

**Result**: A sidebar on the left, with the right area split vertically into top and bottom sections.

### Three-Way Complex Layout

```typescript
<ejs-splitter height='400px' width='800px'>
  <e-panes>
    <!-- Left sidebar (vertical split) -->
    <e-pane size='150px'>
      <ng-template #content>
        <ejs-splitter orientation='Vertical' height='100%'>
          <e-panes>
            <e-pane size='120px'>
              <ng-template #content>
                <div class='panel'>Navigation</div>
              </ng-template>
            </e-pane>
            <e-pane>
              <ng-template #content>
                <div class='panel'>Search/Filters</div>
              </ng-template>
            </e-pane>
          </e-panes>
        </ejs-splitter>
      </ng-template>
    </e-pane>

    <!-- Main center area -->
    <e-pane size='300px'>
      <ng-template #content>
        <div class='panel'>Main Content Grid/Table</div>
      </ng-template>
    </e-pane>

    <!-- Right panel (vertical split) -->
    <e-pane size='200px'>
      <ng-template #content>
        <ejs-splitter orientation='Vertical' height='100%'>
          <e-panes>
            <e-pane size='150px'>
              <ng-template #content>
                <div class='panel'>Properties</div>
              </ng-template>
            </e-pane>
            <e-pane>
              <ng-template #content>
                <div class='panel'>Preview</div>
              </ng-template>
            </e-pane>
          </e-panes>
        </ejs-splitter>
      </ng-template>
    </e-pane>
  </e-panes>
</ejs-splitter>
```

**Result**: A complex IDE-like layout with navigation, main content, and property panels.

### Best Practices for Nesting

- Keep nesting depth to 2-3 levels for performance
- Set explicit heights on nested splitters (e.g., `height='100%'`)
- Test on mobile devices for responsiveness
- Consider fixed vs. auto-sizing for predictable layouts
- Monitor memory usage with deeply nested splitters

---

## Choosing Your Layout

| Scenario | Layout Type | Recommendation |
|----------|------------|-----------------|
| Sidebar + Content | Horizontal | Simple, common pattern |
| Header + Content + Footer | Vertical | Stack top to bottom |
| Complex IDE/Dashboard | Nested | Combine horizontal and vertical |
| Mobile-First | Responsive | Use percentages and media queries |
| Three-Column | Horizontal Multiple | Editor pattern (left, center, right) |

## Common Pitfalls

❌ **Don't**: Forget to set size on at least one pane
✓ **Do**: Use a mix of fixed and auto-sizing panes

❌ **Don't**: Make nested splitters too deep (3+ levels)
✓ **Do**: Use 2 levels maximum for performance

❌ **Don't**: Use percentage sizes in nested splitters without parent size
✓ **Do**: Set explicit height on nested splitter containers

