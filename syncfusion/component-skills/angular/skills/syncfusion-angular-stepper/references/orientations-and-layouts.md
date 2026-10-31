# Setting Orientations and Layouts in Angular Stepper

## Table of Contents
- [Horizontal Orientation](#horizontal-orientation)
- [Vertical Orientation](#vertical-orientation)
- [Choosing Orientation](#choosing-orientation)
- [Responsive Design](#responsive-design)

## Horizontal Orientation

The Horizontal orientation is the default display style, where steps are arranged left-to-right in a row. This orientation is ideal for workflows displayed above content or in the main content area.

### Default Horizontal Layout

```ts
import { Component } from "@angular/core";
import { StepperAllModule, StepperModule } from "@syncfusion/ej2-angular-navigations";

@Component({
  imports: [ StepperAllModule, StepperModule ],
  standalone: true,
  selector: 'app-root',
  template: `
    <div class="horizontal-layout">
      <h2>Horizontal Stepper (Default)</h2>
      <ejs-stepper orientation="Horizontal">
        <e-steps>
          <e-step label="Step 1" iconCss="sf-icon-home"></e-step>
          <e-step label="Step 2" iconCss="sf-icon-settings"></e-step>
          <e-step label="Step 3" iconCss="sf-icon-database"></e-step>
          <e-step label="Step 4" iconCss="sf-icon-check"></e-step>
        </e-steps>
      </ejs-stepper>
      <div class="content">
        <!-- Step content here -->
      </div>
    </div>
  `,
  styles: [`
    .horizontal-layout {
      padding: 20px;
      max-width: 900px;
      margin: 0 auto;
    }
    .content {
      padding: 20px 0;
      border: 1px solid #ddd;
      border-top: none;
    }
  `]
})
export class AppComponent { }
```

### Implicit Horizontal (Omitting Orientation)

The stepper defaults to horizontal orientation if not specified:

```html
<ejs-stepper>
  <e-steps>
    <e-step label="Step 1"></e-step>
    <e-step label="Step 2"></e-step>
    <e-step label="Step 3"></e-step>
  </e-steps>
</ejs-stepper>
```

### When to Use Horizontal

- **Standard workflows**: Multi-step forms, checkout processes
- **Wide layouts**: Desktop applications with ample width
- **Content below**: When step details appear below the stepper
- **Tab-like navigation**: Multi-page forms within a single view
- **User expectations**: Horizontal is the standard expectation for steppers

### Features of Horizontal Orientation

- **Default behavior**: No configuration needed
- **Space efficient**: Uses width effectively
- **Visual flow**: Clear left-to-right progression
- **Content friendly**: Leaves vertical space for step content
- **Responsive**: Adapts to available width

## Vertical Orientation

The Vertical orientation displays steps in a column, where steps are arranged top-to-bottom. This is useful for tall layouts, sidebars, or when horizontal space is limited.

### Vertical Layout Example

```ts
import { Component } from "@angular/core";
import { StepperAllModule, StepperModule } from "@syncfusion/ej2-angular-navigations";

@Component({
  imports: [ StepperAllModule, StepperModule ],
  standalone: true,
  selector: 'app-root',
  template: `
    <div class="vertical-layout">
      <div class="container">
        <div class="sidebar">
          <h3>Setup Guide</h3>
          <ejs-stepper orientation="Vertical">
            <e-steps>
              <e-step label="Install" iconCss="sf-icon-download"></e-step>
              <e-step label="Configure" iconCss="sf-icon-settings"></e-step>
              <e-step label="Deploy" iconCss="sf-icon-upload"></e-step>
              <e-step label="Monitor" iconCss="sf-icon-chart"></e-step>
            </e-steps>
          </ejs-stepper>
        </div>
        <div class="main-content">
          <!-- Main content area -->
        </div>
      </div>
    </div>
  `,
  styles: [`
    .vertical-layout {
      padding: 20px;
    }
    .container {
      display: flex;
      gap: 20px;
      max-width: 1200px;
      margin: 0 auto;
    }
    .sidebar {
      flex: 0 0 300px;
      border-right: 1px solid #ddd;
      padding-right: 20px;
    }
    .main-content {
      flex: 1;
      padding: 20px;
    }
    h3 {
      margin-top: 0;
    }
  `]
})
export class AppComponent { }
```

### Vertical in Drawer/Modal

Use vertical orientation in sidebars, drawers, or modals:

```html
<div class="drawer">
  <div class="drawer-header">
    <h3>Wizard Steps</h3>
  </div>
  <ejs-stepper orientation="Vertical">
    <e-steps>
      <e-step label="Personal Details"></e-step>
      <e-step label="Address"></e-step>
      <e-step label="Verification"></e-step>
      <e-step label="Confirmation"></e-step>
    </e-steps>
  </ejs-stepper>
</div>
```

### When to Use Vertical

- **Sidebar navigation**: Multi-step processes in sidebars
- **Narrow layouts**: Mobile devices or responsive designs
- **Drawer/modal**: Wizards in modals or drawer components
- **Vertical space available**: When you have tall viewing areas
- **Multi-section workflows**: Complex processes with many steps

### Features of Vertical Orientation

- **Space vertical**: Uses height instead of width
- **Sidebar friendly**: Works well in sidebars
- **Mobile responsive**: Adapts to narrow screens
- **Scrollable**: Can scroll vertically if many steps
- **Proximity**: Step details can be beside steps

## Choosing Orientation

### Decision Matrix

| Scenario | Horizontal | Vertical |
|----------|-----------|----------|
| **Wide desktop layout** | ✅ | ⚠️ |
| **Mobile/narrow screen** | ⚠️ | ✅ |
| **Sidebar navigation** | ✗ | ✅ |
| **Horizontal space abundant** | ✅ | ⚠️ |
| **Vertical space abundant** | ⚠️ | ✅ |
| **Many steps (5+)** | ⚠️ | ✅ |
| **Few steps (1-3)** | ✅ | ✓ |

### Recommendation by Layout

**Use Horizontal:**
- Standard full-width layouts
- E-commerce checkout
- Multi-step forms in modals
- Documentation workflows
- Sufficient width available

**Use Vertical:**
- Sidebar-based UI
- Mobile/responsive layouts
- Drawer/modal wizards
- Multi-section forms
- Space-constrained width

## Responsive Design

Implement responsive orientation switching for different screen sizes:

```ts
import { Component, ViewChild } from "@angular/core";
import { StepperAllModule, StepperModule } from "@syncfusion/ej2-angular-navigations";
import { ChangeDetectorRef } from "@angular/core";

@Component({
  imports: [ StepperAllModule, StepperModule ],
  standalone: true,
  selector: 'app-root',
  template: `
    <ejs-stepper [orientation]="screenOrientation">
      <e-steps>
        <e-step label="Step 1" iconCss="sf-icon-cart"></e-step>
        <e-step label="Step 2" iconCss="sf-icon-transport"></e-step>
        <e-step label="Step 3" iconCss="sf-icon-payment"></e-step>
        <e-step label="Step 4" iconCss="sf-icon-success"></e-step>
      </e-steps>
    </ejs-stepper>
  `
})
export class AppComponent {
  screenOrientation = this.getOrientation();

  constructor(private cdr: ChangeDetectorRef) {
    window.addEventListener('resize', () => {
      this.screenOrientation = this.getOrientation();
      this.cdr.detectChanges();
    });
  }

  getOrientation(): 'Horizontal' | 'Vertical' {
    return window.innerWidth < 768 ? 'Vertical' : 'Horizontal';
  }
}
```

### Breakpoint Guidelines

```css
/* Extra small devices (phones) */
@media (max-width: 576px) {
  /* Use Vertical orientation */
}

/* Small devices (tablets) */
@media (max-width: 768px) {
  /* Use Vertical orientation */
}

/* Medium devices and larger */
@media (min-width: 769px) {
  /* Use Horizontal orientation */
}
```

## Combining with Step Types

Orientations work with all step types:

```html
<!-- Horizontal + Indicator Only (compact desktop) -->
<ejs-stepper orientation="Horizontal" stepType="Indicator">
  <e-steps>
    <e-step iconCss="sf-icon-1"></e-step>
    <e-step iconCss="sf-icon-2"></e-step>
    <e-step iconCss="sf-icon-3"></e-step>
  </e-steps>
</ejs-stepper>

<!-- Vertical + Default (sidebar with labels) -->
<ejs-stepper orientation="Vertical" stepType="Default">
  <e-steps>
    <e-step label="Step 1" iconCss="sf-icon-1"></e-step>
    <e-step label="Step 2" iconCss="sf-icon-2"></e-step>
    <e-step label="Step 3" iconCss="sf-icon-3"></e-step>
  </e-steps>
</ejs-stepper>
```

## Best Practices

1. **Default is horizontal**: Most users expect horizontal steppers
2. **Mobile-first**: Plan vertical layout early for responsive designs
3. **Test both**: Verify usability in both orientations
4. **Clear connections**: Use visual lines to connect steps
5. **Responsive switching**: Automatically adjust orientation on resize
6. **Content placement**: Position step content appropriately for orientation

**See also:** [step-types.md](step-types.md) for display style options, [getting-started.md](getting-started.md) for basic setup.
