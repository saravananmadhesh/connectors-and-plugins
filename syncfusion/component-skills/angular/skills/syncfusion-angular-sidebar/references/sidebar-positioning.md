# Sidebar Positioning and Behavior Types

## Table of Contents
- [Sidebar Expand Types](#sidebar-expand-types)
- [Push Type](#push-type)
- [Slide Type](#slide-type)
- [Over Type](#over-type)
- [Auto Type](#auto-type)
- [Sidebar Positioning](#sidebar-positioning)
- [Fixed Positioning](#fixed-positioning)
- [Docking](#docking)
- [Multiple Sidebars](#multiple-sidebars)

## Understanding Target Behavior

### Implicit vs Explicit Targeting

**Implicit (Default - No target property):**
- Sidebar automatically targets the **next sibling `<div>` element** immediately after it
- Simpler structure, no wrapper needed
- Perfect for straightforward layouts

**Explicit (With target property):**
- Sidebar targets a **specific element by ID or class** (e.g., `[target]="'#wrapper'"`)
- **Requires inner wrapper `<div>`** inside target for CSS transforms to work properly
- Provides precise control over which elements are affected

---

## Sidebar Expand Types

The `type` property controls how the sidebar interacts with main content when expanding or collapsing. Choose based on your layout requirements.

| Type | Description | Use Case |
|------|-------------|----------|
| **Push** | Sidebar pushes main content aside, shrinking it within screen width | Traditional navigation menus |
| **Slide** | Sidebar shifts main content position without resizing | Overlay-like behavior with shift |
| **Over** | Sidebar floats over main content without affecting layout | Floating panel, modal-like navigation |
| **Auto** | Over on mobile (≤600px), Push on desktop | Responsive default behavior |

### Push Type - Implicit Targeting (Recommended)

Sidebar pushes main content to the side and shrinks it to fit the screen. **No target property needed** - sidebar automatically targets the next sibling `<div>`:

```typescript
import { SidebarModule } from '@syncfusion/ej2-angular-navigations';
import { Component, ViewChild } from '@angular/core';
import { SidebarComponent } from '@syncfusion/ej2-angular-navigations';

@Component({
  imports: [SidebarModule],
  standalone: true,
  selector: 'app-root',
  template: `<ejs-sidebar id="sidebar" #sidebar 
              type="Push"
              (created)="onCreated($event)"
              style="visibility: hidden">
              <div class="title">Sidebar</div>
              <button (click)="closeSidebar()">Close</button>
            </ejs-sidebar>
            <!-- This div automatically becomes the target -->
            <div>
              <button (click)="toggleSidebar()">Toggle</button>
              <div class="main-content">Main content resizes with sidebar</div>
            </div>`
})
export class AppComponent {
  @ViewChild('sidebar') sidebar?: SidebarComponent;

  onCreated(args: any) {
    (this.sidebar as SidebarComponent).element.style.visibility = '';
  }

  toggleSidebar() {
    this.sidebar?.toggle();
  }

  closeSidebar() {
    this.sidebar?.hide();
  }
}
```

### Push Type - Explicit Targeting (Advanced)

When you need precise control over which element the sidebar affects, use explicit `target` property with a wrapper:

```typescript
@Component({
  template: `<ejs-sidebar id="sidebar" #sidebar 
              type="Push"
              [target]="'#content-wrapper'"
              (created)="onCreated($event)"
              style="visibility: hidden">
              <div class="title">Sidebar</div>
            </ejs-sidebar>
            <!-- Explicit target container -->
            <div id="content-wrapper">
              <!-- REQUIRED: Inner wrapper for transforms -->
              <div>
                <button (click)="toggleSidebar()">Toggle</button>
                <div class="main-content">Resizes with sidebar</div>
              </div>
            </div>`
})
export class ExplicitTargetComponent {
  @ViewChild('sidebar') sidebar?: SidebarComponent;

  onCreated(args: any) {
    (this.sidebar as SidebarComponent).element.style.visibility = '';
  }

  toggleSidebar() {
    this.sidebar?.toggle();
  }
}
```

### Slide Type - Implicit Targeting

Sidebar shifts content without resizing. Content moves with sidebar but maintains full width. **Sidebar automatically targets the next sibling `<div>`:**

```typescript
@Component({
  template: `<ejs-sidebar id="sidebar" #sidebar 
              type="Slide"
              (created)="onCreated($event)"
              style="visibility: hidden">
              <div class="title">Sidebar (Slide Type)</div>
            </ejs-sidebar>
            <!-- Automatically becomes the target -->
            <div>
              <button (click)="toggleSidebar()">Toggle</button>
              <div>Content shifts position without resizing</div>
            </div>`
})
export class SlideTypeComponent {
  @ViewChild('sidebar') sidebar?: SidebarComponent;

  onCreated(args: any) {
    (this.sidebar as SidebarComponent).element.style.visibility = '';
  }

  toggleSidebar() {
    this.sidebar?.toggle();
  }
}
```

### Over Type - No Layout Changes

Sidebar floats over main content with no layout changes. **No target property needed** - sidebar appears on top without affecting layout:

```typescript
@Component({
  template: `<ejs-sidebar id="sidebar" #sidebar 
              type="Over"
              [showBackdrop]="true"
              (created)="onCreated($event)"
              style="visibility: hidden">
              <div class="title">Sidebar (Over Type)</div>
            </ejs-sidebar>
            <div>
              <button (click)="toggleSidebar()">Toggle</button>
              Content remains unchanged when sidebar opens
            </div>`
})
export class OverTypeComponent {
  @ViewChild('sidebar') sidebar?: SidebarComponent;

  onCreated(args: any) {
    (this.sidebar as SidebarComponent).element.style.visibility = '';
  }

  toggleSidebar() {
    this.sidebar?.toggle();
  }
}
```

**Note:** Over type doesn't need explicit `target` because it doesn't affect content layout. The `showBackdrop` adds overlay to the automatically targeted sibling element.

### Auto Type (Default)

Automatically uses Over type on mobile (≤600px) and Push on larger screens. **This is the default and recommended for responsive apps:**

```typescript
@Component({
  template: `<ejs-sidebar id="sidebar" #sidebar 
              type="Auto"
              (created)="onCreated($event)"
              style="visibility: hidden">
              <div class="title">Sidebar (Auto Type)</div>
            </ejs-sidebar>
            <div>
              <button (click)="toggleSidebar()">Toggle</button>
              Responsive: Over on mobile, Push on desktop
            </div>`
})
export class AutoTypeComponent {
  @ViewChild('sidebar') sidebar?: SidebarComponent;

  onCreated(args: any) {
    (this.sidebar as SidebarComponent).element.style.visibility = '';
  }

  toggleSidebar() {
    this.sidebar?.toggle();
  }
}
```

## Sidebar Positioning

### Position Left (Default)

Sidebar expands from the left side:

```typescript
@Component({
  template: `<ejs-sidebar #sidebar 
              position="Left"
              type="Push">
            </ejs-sidebar>`
})
export class LeftPositionComponent { }
```

### Position Right

Sidebar expands from the right side, ideal for RTL applications:

```typescript
@Component({
  template: `<ejs-sidebar #sidebar 
              position="Right"
              type="Push"
              (created)="onCreated($event)"
              style="visibility: hidden">
              <div class="title">Right Sidebar</div>
            </ejs-sidebar>
            <div>
              <button (click)="toggleSidebar()">Toggle</button>
            </div>`
})
export class RightPositionComponent {
  @ViewChild('sidebar') sidebar?: SidebarComponent;

  onCreated(args: any) {
    (this.sidebar as SidebarComponent).element.style.visibility = '';
  }

  toggleSidebar() {
    this.sidebar?.toggle();
  }
}
```

### Top/Bottom Positioning

Position sidebar at top or bottom (less common but supported):

```typescript
// Top sidebar (e.g., horizontal navigation)
<ejs-sidebar position="Top" type="Push" [width]="'100%'" [height]="'60px'">
</ejs-sidebar>

// Bottom sidebar (e.g., bottom navigation)
<ejs-sidebar position="Bottom" type="Push" [width]="'100%'" [height]="'60px'">
</ejs-sidebar>
```

## Fixed Positioning

By default, sidebars use fixed positioning and don't move when main content scrolls. This is ideal for persistent navigation:

```typescript
@Component({
  selector: 'app-root',
  template: `<ejs-sidebar id="sidebar" #sidebar 
              type="Push"
              [width]="'290px'"
              (created)="onCreated($event)"
              style="visibility: hidden">
              <div class="sidebar-header">Header</div>
              <ul class="nav">
                <li><a href="#">Item 1</a></li>
                <li><a href="#">Item 2</a></li>
              </ul>
            </ejs-sidebar>
            <div id="wrapper">
              <div class="toolbar">
                <span (click)="toggleSidebar()" class="menu-icon">☰</span>
              </div>
              <div class="content">
                <!-- Scrollable content -->
                <div style="height: 2000px">Long content area...</div>
              </div>
            </div>`,
  styles: [`
    :host ::ng-deep {
      #sidebar { position: fixed; }
      .content { overflow-y: auto; }
    }
  `]
})
export class FixedSidebarComponent {
  @ViewChild('sidebar') sidebar?: SidebarComponent;

  onCreated(args: any) {
    (this.sidebar as SidebarComponent).element.style.visibility = '';
  }

  toggleSidebar() {
    this.sidebar?.toggle();
  }
}
```

## Docking

Docking creates a compact, always-visible portion of the sidebar (usually showing icons) that expands on interaction. Enabled with `enableDock` and `dockSize` properties:

```typescript
@Component({
  imports: [SidebarModule],
  standalone: true,
  template: `<ejs-sidebar #dockBar 
              id="dockSidebar"
              [enableDock]="true"
              [width]="'220px'"
              [dockSize]="'72px'"
              (created)="onCreated($event)">
              <div class="dock">
                <ul>
                  <li (click)="toggleClick()" title="Menu">
                    <span class="e-icons expand"></span>
                    <span class="e-text">Menu</span>
                  </li>
                  <li title="Home">
                    <span class="e-icons home"></span>
                    <span class="e-text">Home</span>
                  </li>
                  <li title="Profile">
                    <span class="e-icons profile"></span>
                    <span class="e-text">Profile</span>
                  </li>
                  <li title="Settings">
                    <span class="e-icons settings"></span>
                    <span class="e-text">Settings</span>
                  </li>
                </ul>
              </div>
            </ejs-sidebar>
            <div class="main-content">
              <div class="title">Main content</div>
              Click the expand icon to open/close the Sidebar
            </div>`
})
export class DockingComponent {
  @ViewChild('dockBar') dockBar?: SidebarComponent;

  onCreated(args: any) {
    (this.dockBar as SidebarComponent).element.style.visibility = '';
  }

  toggleClick() {
    this.dockBar?.toggle();
  }
}
```

### CSS for Docking

Hide text when docked (closed):

```css
.e-dock.e-close span.e-text {
  display: none;
}

.e-dock.e-open span.e-text {
  display: inline-block;
}
```

## Multiple Sidebars

Create multiple sidebars (left and right) on the same page:

```typescript
@Component({
  imports: [SidebarModule],
  standalone: true,
  template: `<!-- Left Sidebar -->
            <ejs-sidebar #leftSidebar 
              id="left-sidebar"
              position="Left"
              type="Push"
              (created)="onCreated($event)"
              style="visibility: hidden">
              <div class="title">Left Sidebar</div>
            </ejs-sidebar>

            <!-- Right Sidebar -->
            <ejs-sidebar #rightSidebar 
              id="right-sidebar"
              position="Right"
              type="Push"
              (created)="onCreated($event)"
              style="visibility: hidden">
              <div class="title">Right Sidebar</div>
            </ejs-sidebar>

            <!-- Main Content -->
            <div class="main-content">
              <button (click)="toggleLeft()">Toggle Left</button>
              <button (click)="toggleRight()">Toggle Right</button>
              <div class="content">Main Content Area</div>
            </div>`
})
export class MultipleSidebarsComponent {
  @ViewChild('leftSidebar') leftSidebar?: SidebarComponent;
  @ViewChild('rightSidebar') rightSidebar?: SidebarComponent;

  onCreated(args: any) {
    if (args.target?.id === 'left-sidebar') {
      (this.leftSidebar as SidebarComponent).element.style.visibility = '';
    }
    if (args.target?.id === 'right-sidebar') {
      (this.rightSidebar as SidebarComponent).element.style.visibility = '';
    }
  }

  toggleLeft() {
    this.leftSidebar?.toggle();
  }

  toggleRight() {
    this.rightSidebar?.toggle();
  }
}
```

## DataBind Method

Apply pending property changes immediately using `dataBind()`:

```typescript
// Change type dynamically
changeType(newType: string) {
  if (this.sidebar) {
    (this.sidebar as SidebarComponent).type = newType;
    (this.sidebar as SidebarComponent).dataBind(); // Apply changes
  }
}
```

## Target Property - When and How to Use

### Default Behavior (No target property)

When you DON'T specify a `target` property, the sidebar **automatically targets the next sibling `<div>`** element:

```typescript
// Implicit targeting - Simple and recommended
<ejs-sidebar id="sidebar" type="Push"></ejs-sidebar>
<div>                              <!-- Automatically becomes target -->
  <div class="title">Main content</div>
  <div class="sub-title">
    Click the button to close the Sidebar.
  </div>
</div>
```

✅ **Advantages:**
- Simple structure, no wrapper needed
- Sidebar automatically targets next sibling
- Perfect for straightforward layouts
- **Recommended for most use cases**

---

### Explicit Targeting (With target property)

When you need precise control over which element is affected, use the `target` property:

```typescript
// Explicit targeting - Precise control
<ejs-sidebar [target]="'#content-area'" type="Push"></ejs-sidebar>
<div id="content-area">                    <!-- Explicit target container -->
  <div>                                    <!-- REQUIRED: Inner wrapper -->
    <div class="title">Main content</div>
    <div class="sub-title">
      Click the button to close the Sidebar.
    </div>
  </div>
</div>
```

**IMPORTANT:** When using explicit `target`, you MUST include an inner wrapper `<div>` inside the target container:

```typescript
// ❌ INCORRECT - No wrapper inside target
<ejs-sidebar [target]="'#wrapper'"></ejs-sidebar>
<div id="wrapper">
  <div class="content">Content won't transform properly</div>
</div>

// ✅ CORRECT - Wrapper div inside target container
<ejs-sidebar [target]="'#wrapper'"></ejs-sidebar>
<div id="wrapper">
  <div>  <!-- Required inner wrapper -->
    <div class="content">Content transforms correctly</div>
  </div>
</div>
```

---

### Why Wrapper Needed with Explicit target

When you explicitly set a `target`, the sidebar applies CSS transforms to the **direct child** of the target container. The wrapper div is what actually moves/resizes.

**Use explicit targeting when:**
- You want to exclude certain elements (header, footer) from the sidebar effect
- You have complex layouts with multiple sections
- You need fine-grained control over which content responds to sidebar state
- You want different sidebars affecting different sections

**Use implicit targeting (no target) when:**
- Simple layout with one main content area
- You want sidebar to affect all content after it
- You prefer simpler, cleaner code

## Edge Cases

**Responsive Behavior**: Use Auto type or mediaQuery to handle different screen sizes automatically.

**Content Wrapping**: Always wrap content in target with an inner div for proper push/slide behavior.

**Overflow Management**: For tall sidebars, add overflow-y: auto to CSS for scrollable content.

**Multiple Targets**: Use different target selectors for different sidebars if needed.
