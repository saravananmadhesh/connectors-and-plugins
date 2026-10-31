# Sidebar Interactions and Control Methods

## Table of Contents
- [Control Methods](#control-methods)
- [Show Method](#show-method)
- [Hide Method](#hide-method)
- [Toggle Method](#toggle-method)
- [Auto-Close with Media Queries](#auto-close-with-media-queries)
- [Close on Document Click](#close-on-document-click)
- [Backdrop Overlay](#backdrop-overlay)
- [Touch Gestures](#touch-gestures)
- [Events](#events)

## Control Methods

> ℹ️ **Targeting Mode:** The examples in this section use **implicit targeting** (sidebar automatically targets the next sibling div). This is the recommended approach for most use cases. No wrapper needed.

The Sidebar provides three main methods to control visibility. Access these methods via a `@ViewChild` reference to the Sidebar instance:

```typescript
@ViewChild('sidebar') sidebar?: SidebarComponent;
```

All control methods update the `isOpen` property internally.

## Show Method

Opens the sidebar and sets `isOpen` to `true`. Useful for displaying sidebar on user actions:

```typescript
import { SidebarModule } from '@syncfusion/ej2-angular-navigations';
import { Component, ViewChild } from '@angular/core';
import { SidebarComponent } from '@syncfusion/ej2-angular-navigations';

@Component({
  imports: [SidebarModule],
  standalone: true,
  selector: 'app-root',
  template: `<ejs-sidebar id="default-sidebar" #sidebar 
              (created)="onCreated($event)"
              style="visibility: hidden">
              <div class="title">Sidebar content</div>
              <button (click)="closeSidebar()">Close Sidebar</button>
            </ejs-sidebar>
            <div>
              <div class="title">Main content</div>
              <button (click)="openSidebar()">Open Sidebar</button>
            </div>`
})
export class ShowMethodComponent {
  @ViewChild('sidebar') sidebar?: SidebarComponent;

  onCreated(args: any) {
    (this.sidebar as SidebarComponent).element.style.visibility = '';
  }

  openSidebar() {
    this.sidebar?.show();
  }

  closeSidebar() {
    this.sidebar?.hide();
  }
}
```

## Hide Method

Closes the sidebar and sets `isOpen` to `false`. Ideal for hiding sidebar when navigating or completing actions:

```typescript
// Hide on back button click
goBack() {
  this.sidebar?.hide();
  this.router.navigate(['/previous-page']);
}

// Hide after navigation
navigateToPage(page: string) {
  this.sidebar?.hide(); // Close sidebar
  this.router.navigate([page]);
}

// Hide when selecting item
selectMenuItem(item: any) {
  this.sidebar?.hide(); // Auto-close after selection
  // Navigate based on item
}
```

## Toggle Method

Toggles sidebar between open and closed states. Perfect for toggle buttons:

```typescript
import { SidebarModule } from '@syncfusion/ej2-angular-navigations';
import { Component, ViewChild } from '@angular/core';
import { SidebarComponent } from '@syncfusion/ej2-angular-navigations';

@Component({
  imports: [SidebarModule],
  standalone: true,
  selector: 'app-root',
  template: `<ejs-sidebar id="default-sidebar" #sidebar 
              (created)="onCreated($event)"
              (open)="onOpen($event)"
              (close)="onClose($event)"
              style="visibility: hidden">
              <div class="title">Sidebar content</div>
              <div class="sub-title">Click the button to close the Sidebar.</div>
              <button (click)="closeSidebar()">Close Sidebar</button>
            </ejs-sidebar>
            <div>
              <div class="title">Main content</div>
              <div class="sub-title">
                Click the button to open/close the Sidebar.
              </div>
              <button (click)="toggleSidebar()">Toggle Sidebar</button>
            </div>`
})
export class ToggleMethodComponent {
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

  onOpen(args: any) {
    console.log('Sidebar opened');
  }

  onClose(args: any) {
    console.log('Sidebar closed');
  }
}
```

## Auto-Close with Media Queries

Automatically open or close sidebar based on screen resolution using the `mediaQuery` property. This accepts CSS media query strings or MediaQueryList objects:

### General Auto-Close Configuration

Keep sidebar open on screens wider than 600px, closed on smaller screens:

```typescript
@Component({
  imports: [SidebarModule],
  standalone: true,
  selector: 'app-root',
  template: `<ejs-sidebar id="default-sidebar" #sidebar 
              [width]="'280px'"
              [mediaQuery]="mediaQuery"
              [closeOnDocumentClick]="true">
              <div class="title">Sidebar content</div>
            </ejs-sidebar>
            <div>
              <div class="title">Main content</div>
              <p>Sidebar auto-opens on screens wider than 600px</p>
            </div>`
})
export class AutoCloseComponent {
  public mediaQuery: object = window.matchMedia('(min-width: 600px)');
}
```

### Sidebar Open Only on Small Screens

Keep sidebar expanded only below 400px (e.g., for very small devices):

```typescript
@Component({
  imports: [SidebarModule],
  standalone: true,
  selector: 'app-root',
  template: `<ejs-sidebar id="default-sidebar" #sidebar 
              [width]="'280px'"
              [mediaQuery]="mediaQuery"
              [isOpen]="true"
              [closeOnDocumentClick]="true">
              <div class="title">Sidebar content</div>
            </ejs-sidebar>
            <div>
              <div class="title">Main content</div>
              <p>Sidebar only expanded below 400px width</p>
            </div>`
})
export class SmallScreenComponent {
  public mediaQuery: object = window.matchMedia('(max-width: 400px)');
}
```

### Common Media Query Patterns

```typescript
// Desktop-only (expanded on large screens)
mediaQuery = window.matchMedia('(min-width: 1200px)');

// Tablet and above
mediaQuery = window.matchMedia('(min-width: 768px)');

// Mobile only
mediaQuery = window.matchMedia('(max-width: 767px)');

// Landscape only
mediaQuery = window.matchMedia('(orientation: landscape)');

// Landscape and tablet
mediaQuery = window.matchMedia('(min-width: 768px) and (orientation: landscape)');
```

## Close on Document Click

Close sidebar when clicking outside of it using `closeOnDocumentClick` property. Useful for dropdown-style sidebars:

```typescript
import { SidebarModule } from '@syncfusion/ej2-angular-navigations';
import { Component, ViewChild } from '@angular/core';
import { SidebarComponent } from '@syncfusion/ej2-angular-navigations';

@Component({
  imports: [SidebarModule],
  standalone: true,
  selector: 'app-root',
  template: `<ejs-sidebar id="default-sidebar" #sidebar 
              [isOpen]="true"
              [closeOnDocumentClick]="true"
              (created)="onCreated($event)"
              style="visibility: hidden">
              <div class="title">Sidebar content</div>
            </ejs-sidebar>
            <div>
              <div class="title">Main content</div>
              <p>Click outside the sidebar to close it</p>
              <button (click)="toggleSidebar()">Toggle</button>
            </div>`
})
export class CloseOnClickComponent {
  @ViewChild('sidebar') sidebar?: SidebarComponent;

  onCreated(args: any) {
    (this.sidebar as SidebarComponent).element.style.visibility = '';
  }

  toggleSidebar() {
    this.sidebar?.toggle();
  }
}
```

## Backdrop Overlay

Display a semi-transparent overlay on main content to focus on sidebar. Enabled with `showBackdrop` property:

```typescript
import { SidebarModule } from '@syncfusion/ej2-angular-navigations';
import { Component, ViewChild } from '@angular/core';
import { SidebarComponent } from '@syncfusion/ej2-angular-navigations';
import { ButtonModule } from '@syncfusion/ej2-angular-buttons';

@Component({
  imports: [SidebarModule, ButtonModule],
  standalone: true,
  selector: 'app-root',
  template: `<ejs-sidebar id="default-sidebar" #sidebar 
              [width]="'280px'"
              [showBackdrop]="true"
              [closeOnDocumentClick]="true"
              (created)="onCreated($event)"
              style="visibility: hidden">
              <div class="title">Sidebar content</div>
              <div class="sub-title">
                Click outside or on backdrop to close
              </div>
              <button ejs-button (click)="closeClick()">Close Sidebar</button>
            </ejs-sidebar>
            <div>
              <div class="title">Main content</div>
              <div class="sub-title">
                Click the button to open/close the Sidebar with backdrop.
              </div>
              <button ejs-button (click)="toggleClick()">Toggle Sidebar</button>
            </div>`
})
export class BackdropComponent {
  @ViewChild('sidebar') sidebar?: SidebarComponent;

  onCreated(args: any) {
    (this.sidebar as SidebarComponent).element.style.visibility = '';
  }

  toggleClick() {
    this.sidebar?.toggle();
  }

  closeClick() {
    this.sidebar?.hide();
  }
}
```

### Backdrop Best Practices

Use a wrapper container as the sidebar's target to achieve proper backdrop:

```typescript
template: `<ejs-sidebar id="sidebar" 
            [target]="'#wrapper'"
            [showBackdrop]="true">
          </ejs-sidebar>
          <div id="wrapper">
            <!-- Main content with backdrop overlay -->
          </div>`
```

## Touch Gestures

Enable swipe gestures to open/close sidebar on touch devices using `enableGestures` property (enabled by default):

```typescript
import { SidebarModule } from '@syncfusion/ej2-angular-navigations';
import { Component, ViewChild } from '@angular/core';
import { SidebarComponent } from '@syncfusion/ej2-angular-navigations';

@Component({
  imports: [SidebarModule],
  standalone: true,
  selector: 'app-root',
  template: `<ejs-sidebar id="default-sidebar" #sidebar 
              [enableGestures]="enableGestures"
              (created)="onCreated($event)"
              style="visibility: hidden">
              <div class="title">Sidebar content</div>
              <div class="sub-title">
                Swipe from left edge to open on touch devices
              </div>
              <button (click)="closeClick()">Close Sidebar</button>
            </ejs-sidebar>
            <div>
              <div class="title">Main content</div>
              <div class="sub-title">
                Swipe from left edge (or toggle button) to open Sidebar.
              </div>
              <button (click)="toggleClick()">Toggle Sidebar</button>
            </div>`
})
export class GesturesComponent {
  @ViewChild('sidebar') sidebar?: SidebarComponent;
  public enableGestures: boolean = false; // Disabled in example, enable to true for production

  onCreated(args: any) {
    (this.sidebar as SidebarComponent).element.style.visibility = '';
  }

  toggleClick() {
    this.sidebar?.toggle();
  }

  closeClick() {
    this.sidebar?.hide();
  }
}
```

**Note:** By default, `enableGestures` is `true`. Set to `false` to disable gesture support.

## Events

Handle sidebar state changes with `open` and `close` events:

```typescript
@Component({
  imports: [SidebarModule],
  standalone: true,
  template: `<ejs-sidebar id="sidebar" #sidebar 
              (open)="onOpen($event)"
              (close)="onClose($event)"
              (change)="onChange($event)">
            </ejs-sidebar>`
})
export class EventsComponent {
  @ViewChild('sidebar') sidebar?: SidebarComponent;

  onOpen(args: any) {
    console.log('Sidebar opened', args);
    // Perform actions on open
  }

  onClose(args: any) {
    console.log('Sidebar closed', args);
    // Perform cleanup on close
  }

  onChange(args: any) {
    console.log('Sidebar state changed');
    console.log('Event name:', args.name);
    console.log('Element:', args.element);
    // React to state changes
  }
}
```

## Complete Example: Navigation Drawer

Combine multiple interaction features:

```typescript
@Component({
  imports: [SidebarModule, ButtonModule],
  standalone: true,
  selector: 'app-navbar',
  template: `<ejs-sidebar #sidebar 
              type="Push"
              [showBackdrop]="true"
              [closeOnDocumentClick]="true"
              [enableGestures]="true"
              [mediaQuery]="mediaQuery"
              (created)="onCreated($event)"
              style="visibility: hidden">
              <ul class="nav-items">
                <li><a href="#">Home</a></li>
                <li><a href="#">About</a></li>
                <li><a href="#">Contact</a></li>
              </ul>
            </ejs-sidebar>
            <div class="navbar">
              <button (click)="toggleMenu()">Menu</button>
            </div>`
})
export class NavbarComponent {
  @ViewChild('sidebar') sidebar?: SidebarComponent;
  mediaQuery = window.matchMedia('(max-width: 768px)');

  onCreated(args: any) {
    (this.sidebar as SidebarComponent).element.style.visibility = '';
  }

  toggleMenu() {
    this.sidebar?.toggle();
  }
}
```
