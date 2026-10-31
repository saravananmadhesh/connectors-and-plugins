# Pane Sizing and Configuration

## Table of Contents
- [Fixed Pixel Sizing](#fixed-pixel-sizing)
- [Responsive Percentage Sizing](#responsive-percentage-sizing)
- [Auto-Size Panes](#auto-size-panes)
- [Mixed Sizing Strategies](#mixed-sizing-strategies)

---

## Fixed Pixel Sizing

Use pixel values (`size='200px'`) for precise, unchanging pane dimensions.

### Basic Pixel Sizing

```typescript
import { Component } from '@angular/core';
import { SplitterModule } from '@syncfusion/ej2-angular-layouts';

@Component({
  selector: 'app-pixel-sizing',
  standalone: true,
  imports: [SplitterModule],
  template: `
    <ejs-splitter height='200px' width='600px'>
      <e-panes>
        <e-pane size='200px' content='<div class="content">Left pane (200px)</div>'>
        </e-pane>
        <e-pane size='200px' content='<div class="content">Middle pane (200px)</div>'>
        </e-pane>
        <e-pane size='200px' content='<div class="content">Right pane (200px)</div>'>
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
export class PixelSizingComponent {}
```

**Behavior**: 
- Left pane: exactly 200px
- Middle pane: exactly 200px
- Right pane: remaining space (600px - 200px - 200px = 200px)

### Advantages

✓ **Predictable sizes**: Always the specified width/height
✓ **Fixed sidebars**: Perfect for navigation or toolbars
✓ **Component consistency**: Same size across all screen sizes
✓ **Simple to understand**: No calculations needed

### Disadvantages

✗ **Not responsive**: Doesn't adapt to container size
✗ **Overflow issues**: May cause horizontal scrolling on small screens
✗ **Limited flexibility**: Can't fill available space dynamically

### When to Use

- Fixed sidebars (always 250px)
- Toolbars with consistent width
- When exact dimensions are critical

---

## Responsive Percentage Sizing

Use percentage values (`size='30%'`) for layouts that scale with container size.

### Basic Percentage Sizing

```typescript
import { Component } from '@angular/core';
import { SplitterModule } from '@syncfusion/ej2-angular-layouts';

@Component({
  selector: 'app-percentage-sizing',
  standalone: true,
  imports: [SplitterModule],
  template: `
    <ejs-splitter height='200px' width='600px'>
      <e-panes>
        <e-pane size='30%' content='<div class="content">30% Panel</div>'>
        </e-pane>
        <e-pane size='40%' content='<div class="content">40% Panel</div>'>
        </e-pane>
        <e-pane size='30%' content='<div class="content">30% Panel</div>'>
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
export class PercentageSizingComponent {}
```

**At 600px width:**
- Left: 30% = 180px
- Middle: 40% = 240px
- Right: 30% = 180px

**At 800px width:**
- Left: 30% = 240px
- Middle: 40% = 320px
- Right: 30% = 240px

### Two-Pane Responsive Layout

```typescript
<ejs-splitter height='300px' width='100%'>
  <e-panes>
    <e-pane size='25%'>
      <ng-template #content>
        <div class='sidebar'>Sidebar (25%)</div>
      </ng-template>
    </e-pane>
    <e-pane size='75%'>
      <ng-template #content>
        <div class='content'>Main (75%)</div>
      </ng-template>
    </e-pane>
  </e-panes>
</ejs-splitter>
```

**Result**: Sidebar always 1/4 width, content always 3/4 width, regardless of screen size.

### Advantages

✓ **Responsive**: Scales with container width/height
✓ **Mobile-friendly**: Adapts to different screen sizes
✓ **Proportional**: Maintains visual balance
✓ **No scrolling**: Fits available space

### Disadvantages

✗ **Less predictable**: Actual size depends on container
✗ **Small screens**: May become too narrow
✗ **Min-width issues**: Can become unusable on mobile

### When to Use

- Responsive dashboards
- Mobile-friendly layouts
- Designs that must adapt to viewport
- Grid-like multi-column layouts

---

## Auto-Size Panes

Omit the `size` property to let panes automatically distribute available space using flexbox.

### Basic Auto-Sizing

```typescript
import { Component } from '@angular/core';
import { SplitterModule } from '@syncfusion/ej2-angular-layouts';

@Component({
  selector: 'app-auto-sizing',
  standalone: true,
  imports: [SplitterModule],
  template: `
    <ejs-splitter height='200px' width='600px'>
      <e-panes>
        <e-pane>
          <ng-template #content>
            <div class='content'>Auto-sized Pane 1</div>
          </ng-template>
        </e-pane>
        <e-pane>
          <ng-template #content>
            <div class='content'>Auto-sized Pane 2</div>
          </ng-template>
        </e-pane>
        <e-pane>
          <ng-template #content>
            <div class='content'>Auto-sized Pane 3</div>
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
export class AutoSizingComponent {}
```

**Result**: Three equal panes (200px each in 600px container). Space distributes equally.

### Auto-Size with Dynamic Panes

When panes are added or removed, auto-sized panes readjust automatically:

```typescript
// Initial: 3 panes
// Display: 200px | 200px | 200px

// After adding 4th pane (size='150px')
// Display: 150px | 150px | 150px | 150px

// After removing 1 pane
// Display: 200px | 200px | 200px (redistributes)
```

### Advantages

✓ **Equal distribution**: Panes share space evenly
✓ **Dynamic flexibility**: Adapts when panes added/removed
✓ **Simplest code**: No size calculations needed
✓ **Balanced look**: Professional appearance

### Disadvantages

✗ **No control**: Can't specify proportions
✗ **May be too small**: With many panes, each becomes narrow
✗ **Not suitable for fixed areas**: Like toolbars or sidebars

### When to Use

- Equal multi-pane layouts
- Unknown number of panes
- When content dictates size
- Gallery/grid-like layouts

---

## Mixed Sizing Strategies

Combine different sizing methods in one splitter for flexibility.

### Fixed Sidebar + Flexible Content

```typescript
<ejs-splitter height='300px' width='100%'>
  <e-panes>
    <!-- Fixed sidebar -->
    <e-pane size='250px'>
      <ng-template #content>
        <div>Fixed Sidebar (250px)</div>
      </ng-template>
    </e-pane>
    <!-- Flexible content -->
    <e-pane>
      <ng-template #content>
        <div>Flexible Content (remaining space)</div>
      </ng-template>
    </e-pane>
  </e-panes>
</ejs-splitter>
```

**At 600px:**
- Sidebar: 250px (fixed)
- Content: 350px (auto)

**At 900px:**
- Sidebar: 250px (fixed)
- Content: 650px (auto)

### Percentage + Percentage + Auto

```typescript
<ejs-splitter height='300px' width='600px'>
  <e-panes>
    <e-pane size='30%'>
      <ng-template #content>Left (30%)</ng-template>
    </e-pane>
    <e-pane size='30%'>
      <ng-template #content>Middle (30%)</ng-template>
    </e-pane>
    <e-pane>
      <ng-template #content>Right (auto - 40%)</ng-template>
    </e-pane>
  </e-panes>
</ejs-splitter>
```

### Editor Layout: Fixed + Variable + Fixed

```typescript
<ejs-splitter height='400px' width='100%'>
  <e-panes>
    <!-- Fixed toolbar -->
    <e-pane size='60px'>
      <ng-template #content>Toolbar</ng-template>
    </e-pane>
    <!-- Flexible editor -->
    <e-pane>
      <ng-template #content>Editor Content</ng-template>
    </e-pane>
    <!-- Fixed status bar -->
    <e-pane size='30px'>
      <ng-template #content>Status Bar</ng-template>
    </e-pane>
  </e-panes>
</ejs-splitter>
```

### Responsive Design Pattern

```typescript
// Desktop: 250px sidebar + flexible content
<e-pane size='250px'> Sidebar </e-pane>
<e-pane> Content </e-pane>

// Tablet (media query): 20% + 80%
<e-pane size='20%'> Sidebar </e-pane>
<e-pane size='80%'> Content </e-pane>

// Mobile (media query): collapsible + full
<e-pane [collapsible]='true'> Sidebar </e-pane>
<e-pane [collapsible]='true'> Content </e-pane>
```

---

## Dynamic Size Changes

### Programmatically Change Pane Size

```typescript
import { Component, ViewChild } from '@angular/core';
import { SplitterComponent } from '@syncfusion/ej2-angular-layouts';

@Component({
  selector: 'app-dynamic-sizing',
  template: `
    <button (click)='changeSizes()'>Change Sizes</button>
    <ejs-splitter #splitter height='300px' width='600px'>
      <e-panes>
        <e-pane size='200px'></e-pane>
        <e-pane size='200px'></e-pane>
      </e-panes>
    </ejs-splitter>
  `
})
export class DynamicSizingComponent {
  @ViewChild('splitter') splitterObj?: SplitterComponent;

  changeSizes(): void {
    // Access splitter's internal pane configurations
    this.splitterObj!.paneSettings = [
      { size: '100px' },
      { size: '300px' }
    ];
  }
}
```

---

## Sizing Comparison Table

| Method | Use Case | Responsive | Flexibility |
|--------|----------|-----------|-------------|
| **Fixed Pixels** | Sidebars, toolbars | ✗ | Low |
| **Percentages** | Dashboards, grids | ✓ | Medium |
| **Auto-Size** | Equal layouts | ✓ | Low |
| **Mixed** | Complex layouts | ✓ | High |

Choose based on your layout requirements and responsiveness needs.

