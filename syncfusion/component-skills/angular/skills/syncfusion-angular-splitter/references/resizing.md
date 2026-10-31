# Resizing and Interaction

## Table of Contents
- [Resize Behavior](#resize-behavior)
- [Fixed Panes](#fixed-panes)
- [Min/Max Constraints](#minmax-constraints)

---

## Resize Behavior

By default, all panes are resizable by dragging the separator bar.

### Basic Resizing

Users can drag separators to adjust pane sizes:

```typescript
import { Component } from '@angular/core';
import { SplitterModule } from '@syncfusion/ej2-angular-layouts';

@Component({
  selector: 'app-resizable',
  standalone: true,
  imports: [SplitterModule],
  template: `
    <div style='margin: 20px'>
      <p>Drag the separator bars to resize panes</p>
      <ejs-splitter height='300px' width='600px'>
        <e-panes>
          <e-pane size='200px'>
            <ng-template #content>
              <div class='content'>
                <h3>Left Pane</h3>
                <p>Drag to resize</p>
              </div>
            </ng-template>
          </e-pane>
          <e-pane size='200px'>
            <ng-template #content>
              <div class='content'>
                <h3>Right Pane</h3>
                <p>Drag to resize</p>
              </div>
            </ng-template>
          </e-pane>
        </e-panes>
      </ejs-splitter>
    </div>
  `,
  styles: [`
    .content {
      padding: 15px;
      text-align: center;
    }
  `]
})
export class ResizableComponent {}
```

**Result**: Users can drag the middle separator left/right to adjust pane widths.

### Resize Gestures

- **Mouse**: Click and drag separator
- **Touch**: Touch and drag on mobile/tablet
- **Keyboard**: Not directly supported (but can use programmatic methods)

---

## Fixed Panes

Make panes non-resizable by setting explicit sizes without flexible neighbors.

### Single Fixed Pane

```typescript
import { Component } from '@angular/core';
import { SplitterModule } from '@syncfusion/ej2-angular-layouts';

@Component({
  selector: 'app-fixed-pane',
  standalone: true,
  imports: [SplitterModule],
  template: `
    <ejs-splitter height='250px' width='600px'>
      <e-panes>
        <!-- Fixed sidebar: always 250px -->
        <e-pane size='250px'>
          <ng-template #content>
            <div class='sidebar'>
              <h3>Sidebar</h3>
              <p>Fixed Width (250px)</p>
            </div>
          </ng-template>
        </e-pane>
        <!-- Flexible content: grows/shrinks to fill space -->
        <e-pane>
          <ng-template #content>
            <div class='content'>
              <h3>Content</h3>
              <p>Flexible (Remaining Space)</p>
            </div>
          </ng-template>
        </e-pane>
      </e-panes>
    </ejs-splitter>
  `,
  styles: [`
    .sidebar, .content {
      padding: 15px;
    }
  `]
})
export class FixedPaneComponent {}
```

**Behavior:**
- Left pane: Always exactly 250px (fixed)
- Right pane: Takes remaining space (flexible)
- User can drag separator to adjust width

### Multiple Fixed Panes

```typescript
<ejs-splitter height='300px' width='100%'>
  <e-panes>
    <!-- Fixed left sidebar: 200px -->
    <e-pane size='200px'>
      <ng-template #content>Left (200px - Fixed)</ng-template>
    </e-pane>
    <!-- Flexible middle -->
    <e-pane>
      <ng-template #content>Middle (Flexible)</ng-template>
    </e-pane>
    <!-- Fixed right sidebar: 150px -->
    <e-pane size='150px'>
      <ng-template #content>Right (150px - Fixed)</ng-template>
    </e-pane>
  </e-panes>
</ejs-splitter>
```

**At 700px:**
- Left: 200px (fixed)
- Middle: 350px (auto)
- Right: 150px (fixed)

### All Fixed Panes

```typescript
<e-panes>
  <e-pane size='200px'> <ng-template #content>Pane 1</ng-template> </e-pane>
  <e-pane size='300px'> <ng-template #content>Pane 2</ng-template> </e-pane>
  <e-pane size='150px'> <ng-template #content>Pane 3</ng-template> </e-pane>
</e-panes>
```

Total fixed: 650px. If container is 600px, horizontal scroll appears.

---

## Min/Max Constraints

Enforce size limits to prevent panes from becoming too small or too large during resize.

### Min Size Constraint

Prevent panes from shrinking below a minimum:

```typescript
import { Component } from '@angular/core';
import { SplitterModule } from '@syncfusion/ej2-angular-layouts';

@Component({
  selector: 'app-min-size',
  standalone: true,
  imports: [SplitterModule],
  template: `
    <ejs-splitter height='250px' width='600px'>
      <e-panes>
        <e-pane size='200px' min='60px'>
          <ng-template #content>
            <div class='content'>
              <p>Min: 60px</p>
              <p>Current: ~200px</p>
            </div>
          </ng-template>
        </e-pane>
        <e-pane size='200px' min='60px'>
          <ng-template #content>
            <div class='content'>
              <p>Min: 60px</p>
              <p>Current: ~200px</p>
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
export class MinSizeComponent {}
```

**Behavior:** Users can drag but pane won't shrink below 60px.

### Max Size Constraint

Prevent panes from growing beyond a maximum:

```typescript
import { Component } from '@angular/core';
import { SplitterModule } from '@syncfusion/ej2-angular-layouts';

@Component({
  selector: 'app-max-size',
  standalone: true,
  imports: [SplitterModule],
  template: `
    <ejs-splitter height='250px' width='600px'>
      <e-panes>
        <e-pane size='200px' max='300px'>
          <ng-template #content>
            <div class='content'>
              <p>Max: 300px</p>
              <p>Current: ~200px</p>
            </div>
          </ng-template>
        </e-pane>
        <e-pane size='200px'>
          <ng-template #content>
            <div class='content'>
              <p>No Max</p>
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
export class MaxSizeComponent {}
```

**Behavior:** Users can drag but left pane won't expand beyond 300px.

### Combined Min & Max

```typescript
<e-pane size='200px' min='50px' max='350px'>
  <ng-template #content>
    <div>Between 50px and 350px</div>
  </ng-template>
</e-pane>
```

**Behavior:** Pane can resize but is constrained to the 50-350px range.

---

## Validation & Constraints

### Percentage-Based Constraints

```typescript
<ejs-splitter height='200px' width='600px'>
  <e-panes>
    <e-pane size='200px' min='20%' max='40%'>
      <ng-template #content>
        <div>Min: 20% (120px) | Max: 40% (240px)</div>
      </ng-template>
    </e-pane>
    <e-pane size='200px' min='30%' max='60%'>
      <ng-template #content>
        <div>Min: 30% (180px) | Max: 60% (360px)</div>
      </ng-template>
    </e-pane>
    <e-pane size='200px'>
      <ng-template #content>
        <div>No constraints</div>
      </ng-template>
    </e-pane>
  </e-panes>
</ejs-splitter>
```

### Real-World Example: Editor Layout

```typescript
import { Component } from '@angular/core';
import { SplitterModule } from '@syncfusion/ej2-angular-layouts';

@Component({
  selector: 'app-editor-layout',
  standalone: true,
  imports: [SplitterModule],
  template: `
    <ejs-splitter height='500px' width='100%'>
      <e-panes>
        <!-- Left sidebar: can't shrink below 150px, max 350px -->
        <e-pane size='200px' min='150px' max='350px'>
          <ng-template #content>
            <div class='sidebar'>
              <h3>Explorer</h3>
              <p>File browser (150-350px)</p>
            </div>
          </ng-template>
        </e-pane>

        <!-- Editor: flexible main area -->
        <e-pane>
          <ng-template #content>
            <div class='editor'>
              <h3>Code Editor</h3>
              <p>Main editing area (flexible)</p>
            </div>
          </ng-template>
        </e-pane>

        <!-- Right panel: can't shrink below 100px, max 300px -->
        <e-pane size='150px' min='100px' max='300px'>
          <ng-template #content>
            <div class='inspector'>
              <h3>Properties</h3>
              <p>Inspector panel (100-300px)</p>
            </div>
          </ng-template>
        </e-pane>
      </e-panes>
    </ejs-splitter>
  `,
  styles: [`
    .sidebar, .editor, .inspector {
      padding: 15px;
      overflow: auto;
    }
  `]
})
export class EditorLayoutComponent {}
```

**Layout Stability:**
- Sidebar constrained: Can't collapse to 0px, can't grow huge
- Editor: Always gets remaining space, adapts freely
- Inspector: Constrained to reasonable size

---

## Resize Prevention

### Completely Non-Resizable Splitter

If all panes have explicit sizes, no pane can be resized:

```typescript
<e-panes>
  <e-pane size='200px'> Pane 1 </e-pane>
  <e-pane size='200px'> Pane 2 </e-pane>
  <e-pane size='200px'> Pane 3 </e-pane>
</e-panes>
```

Total: 600px. In 600px container → separator can't drag (no flexible space).

### Allow Resize on One Side

```typescript
<e-panes>
  <e-pane size='200px'> Fixed </e-pane>
  <e-pane> Flexible </e-pane>
</e-panes>
```

Only one separator is draggable (between fixed and flexible).

---

## Best Practices

✓ Set sensible min sizes to prevent unusable panes (60px minimum recommended)
✓ Use max sizes to prevent UI from breaking (e.g., sidebar not wider than 400px)
✓ Always have at least one flexible pane to absorb size changes
✓ Test resize on mobile (smaller screens need different constraints)
✓ Consider percentage constraints for responsive designs

