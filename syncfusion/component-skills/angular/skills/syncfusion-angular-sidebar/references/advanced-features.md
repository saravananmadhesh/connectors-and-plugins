# Advanced Sidebar Features and Patterns

## Table of Contents
- [State Persistence](#state-persistence)
- [Hiding Sidebars with Routing](#hiding-sidebars-with-routing)
- [Accessibility Features](#accessibility-features)
- [Performance Optimization](#performance-optimization)
- [Advanced Event Handling](#advanced-event-handling)
- [Troubleshooting](#troubleshooting)

## State Persistence

Persist sidebar open/closed state between page reloads using `enablePersistence` property:

```typescript
import { SidebarModule } from '@syncfusion/ej2-angular-navigations';
import { Component, ViewChild } from '@angular/core';
import { SidebarComponent } from '@syncfusion/ej2-angular-navigations';

@Component({
  imports: [SidebarModule],
  standalone: true,
  selector: 'app-root',
  template: `<ejs-sidebar id="default-sidebar" #sidebar 
              type="Push"
              [enablePersistence]="true"
              (created)="onCreated($event)"
              style="visibility: hidden">
              <div class="title">Sidebar content</div>
              <button (click)="closeSidebar()">Close</button>
            </ejs-sidebar>
            <div>
              <div class="title">Main content</div>
              <p>Sidebar state persists across page reloads</p>
              <button (click)="toggleSidebar()">Toggle</button>
            </div>`
})
export class PersistenceComponent {
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

### How It Works

- `enablePersistence` saves the sidebar state to browser's localStorage
- State is automatically restored when page reloads
- Storage key: `ej2_sidebar_id_default-sidebar` (based on element ID)
- Works with all properties: type, position, isOpen, etc.

### Manual State Management

For custom storage (e.g., server-side persistence):

```typescript
@Component({
  selector: 'app-custom-persistence',
  template: `<ejs-sidebar #sidebar 
              [isOpen]="sidebarOpen"
              (change)="onStateChange($event)">
            </ejs-sidebar>`
})
export class CustomPersistenceComponent {
  @ViewChild('sidebar') sidebar?: SidebarComponent;
  sidebarOpen = false;

  ngOnInit() {
    // Load state from server
    this.loadSidebarState();
  }

  onStateChange(args: any) {
    // State changed - get current open state from sidebar
    const currentState = this.sidebar?.isOpen;
    this.saveSidebarState(currentState);
  }

  loadSidebarState() {
    // Fetch from API
    // this.sidebarOpen = response.isOpen;
  }

  saveSidebarState(isOpen: boolean | undefined) {
    // Save to API
    // this.userService.updateSidebarState(isOpen);
  }
}
```

## Hiding Sidebars with Routing

Hide sidebar conditionally based on current route using Angular Router:

```typescript
import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { SidebarComponent } from '@syncfusion/ej2-angular-navigations';

@Component({
  selector: 'app-root',
  template: `<ejs-sidebar id="sidebar" #sidebar 
              (created)="onCreated()">
              <nav-menu (itemSelected)="onMenuItemSelect()"></nav-menu>
            </ejs-sidebar>
            <div class="main-content">
              <router-outlet></router-outlet>
            </div>`
})
export class AppComponent implements AfterViewInit {
  @ViewChild('sidebar') sidebar?: SidebarComponent;

  constructor(private router: Router) {
    // Listen to route changes
    this.router.events.forEach((event) => {
      if (event instanceof NavigationEnd) {
        this.handleRouteChange(event.url);
      }
    });
  }

  onCreated() {
    if (this.sidebar) {
      (this.sidebar as SidebarComponent).element.style.visibility = '';
    }
  }

  handleRouteChange(url: string) {
    // Hide sidebar on specific routes (e.g., login, checkout)
    const hideSidebarRoutes = ['/login', '/register', '/checkout'];
    const shouldHide = hideSidebarRoutes.some(route => url.includes(route));

    if (shouldHide) {
      this.sidebar?.hide();
      // Optionally disable toggle button
    } else {
      // Show sidebar (but don't force open)
    }
  }

  onMenuItemSelect() {
    // Auto-close sidebar on mobile after selection
    if (window.innerWidth < 768) {
      this.sidebar?.hide();
    }
  }

  ngAfterViewInit() {
    // Initial check on page load
    const url = this.router.routerState.root.component.toString();
    this.handleRouteChange(url);
  }
}
```

### Route-Specific Sidebar Configuration

```typescript
// Different sidebar configs per route
const routeSidebarConfig = {
  '/dashboard': { type: 'Push', position: 'Left', isOpen: true },
  '/profile': { type: 'Over', position: 'Right', isOpen: false },
  '/settings': { type: 'Push', position: 'Left', isOpen: false }
};

onRouteChange(route: string) {
  const config = routeSidebarConfig[route];
  if (config && this.sidebar) {
    (this.sidebar as SidebarComponent).type = config.type;
    (this.sidebar as SidebarComponent).position = config.position;
    (this.sidebar as SidebarComponent).isOpen = config.isOpen;
    (this.sidebar as SidebarComponent).dataBind();
  }
}
```

## Accessibility Features

### ARIA Attributes

The Sidebar automatically includes ARIA attributes for screen reader support:

```typescript
@Component({
  selector: 'app-accessible-sidebar',
  template: `<ejs-sidebar #sidebar 
              role="navigation"
              aria-label="Main navigation"
              [attr.aria-expanded]="sidebarOpen">
              <nav>
                <ul role="menubar">
                  <li role="presentation">
                    <a href="#" role="menuitem">Home</a>
                  </li>
                  <li role="presentation">
                    <a href="#" role="menuitem">About</a>
                  </li>
                </ul>
              </nav>
            </ejs-sidebar>
            <main role="main">Content</main>`
})
export class AccessibleSidebarComponent {
  @ViewChild('sidebar') sidebar?: SidebarComponent;
  
  get sidebarOpen(): boolean {
    return this.sidebar?.isOpen ?? false;
  }
}
```

### Keyboard Navigation

Enable keyboard support for sidebar toggle:

```typescript
@Component({
  template: `<ejs-sidebar #sidebar>
            </ejs-sidebar>
            <div (keydown)="handleKeydown($event)">
              Content area
            </div>`
})
export class KeyboardNavComponent {
  @ViewChild('sidebar') sidebar?: SidebarComponent;

  handleKeydown(event: KeyboardEvent) {
    // Alt + M to toggle sidebar (common shortcut)
    if (event.altKey && event.code === 'KeyM') {
      event.preventDefault();
      this.sidebar?.toggle();
    }

    // Escape to close sidebar
    if (event.code === 'Escape') {
      this.sidebar?.hide();
    }
  }
}
```

### Focus Management

```typescript
@Component({
  template: `<ejs-sidebar #sidebar 
              (open)="onOpen()">
              <div #firstFocusable tabindex="0">First item</div>
            </ejs-sidebar>`
})
export class FocusManagementComponent {
  @ViewChild('sidebar') sidebar?: SidebarComponent;
  @ViewChild('firstFocusable') firstFocusable?: any;

  onOpen() {
    // Move focus to sidebar when opened
    setTimeout(() => {
      this.firstFocusable?.nativeElement?.focus();
    });
  }
}
```

## Performance Optimization

### Lazy Load Sidebar Content

Load sidebar content only when sidebar opens to improve initial page load:

```typescript
@Component({
  selector: 'app-lazy-sidebar',
  template: `<ejs-sidebar #sidebar 
              (open)="onSidebarOpen()">
              <div *ngIf="contentLoaded">
                <lazy-nav-menu></lazy-nav-menu>
              </div>
            </ejs-sidebar>`
})
export class LazySidebarComponent {
  @ViewChild('sidebar') sidebar?: SidebarComponent;
  contentLoaded = false;

  onSidebarOpen() {
    if (!this.contentLoaded) {
      // Load sidebar content only on first open
      this.contentLoaded = true;
      // Or load from service: this.loadContent();
    }
  }
}
```

### OnPush Change Detection

Optimize performance with OnPush change detection:

```typescript
@Component({
  selector: 'app-optimized-sidebar',
  template: `<ejs-sidebar #sidebar>...</ejs-sidebar>`,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OptimizedSidebarComponent {
  constructor(private cdr: ChangeDetectorRef) {}

  updateSidebar() {
    // Manual change detection
    this.cdr.detectChanges();
  }
}
```

### Virtual Scrolling for Large Lists

For sidebars with many items, use virtual scrolling:

```typescript
@Component({
  imports: [SidebarModule, ScrollingModule],
  template: `<ejs-sidebar #sidebar>
              <cdk-virtual-scroll-viewport [itemSize]="50" class="nav-list">
                <div *cdkVirtualFor="let item of navItems" class="nav-item">
                  {{ item.text }}
                </div>
              </cdk-virtual-scroll-viewport>
            </ejs-sidebar>`
})
export class VirtualScrollComponent {
  navItems = Array.from({ length: 1000 }, (_, i) => ({
    id: i,
    text: `Item ${i}`
  }));
}
```

## Advanced Event Handling

### State Change Events

```typescript
@Component({
  selector: 'app-events',
  template: `<ejs-sidebar #sidebar 
              (open)="onOpen($event)"
              (close)="onClose($event)"
              (change)="onChange($event)"
              (created)="onCreated($event)">
            </ejs-sidebar>`
})
export class EventsComponent {
  @ViewChild('sidebar') sidebar?: SidebarComponent;

  onOpen(args: any) {
    console.log('Sidebar opened', args);
    // Emit analytics event
    this.trackEvent('sidebar_opened');
  }

  onClose(args: any) {
    console.log('Sidebar closed', args);
    this.trackEvent('sidebar_closed');
  }

  onChange(args: any) {
    console.log('State changed');
    console.log('Event name:', args.name);
    console.log('Element:', args.element);
    // Get current state from sidebar component
    const isOpen = this.sidebar?.isOpen;
    this.trackEvent(isOpen ? 'sidebar_opened' : 'sidebar_closed');
  }

  onCreated(args: any) {
    console.log('Sidebar initialized');
  }

  private trackEvent(eventName: string) {
    // Send to analytics service
  }
}
```

### Custom Event Emitters

```typescript
@Component({
  selector: 'app-sidebar-container',
  template: `<app-sidebar (stateChange)="onStateChange($event)"></app-sidebar>`
})
export class SidebarContainerComponent {
  onStateChange(isOpen: boolean) {
    console.log('Sidebar state:', isOpen);
  }
}

@Component({
  selector: 'app-sidebar',
  template: `<ejs-sidebar #sidebar 
              (change)="emitStateChange($event)">
            </ejs-sidebar>`
})
export class SidebarComponent {
  @ViewChild('sidebar') sidebar?: SidebarComponent;
  @Output() stateChange = new EventEmitter<boolean>();

  emitStateChange(args: any) {
    // Get current state from sidebar component
    const isOpen = this.sidebar?.isOpen ?? false;
    this.stateChange.emit(isOpen);
  }
}
```

## Troubleshooting

### Sidebar Not Showing

**Problem:** Sidebar element is invisible or hidden initially.

**Solution:** Set `style="visibility: hidden"` and show in `(created)` event:

```typescript
template: `<ejs-sidebar style="visibility: hidden" 
            (created)="onCreated($event)">
          </ejs-sidebar>`

onCreated(args: any) {
  (this.sidebar as SidebarComponent).element.style.visibility = '';
}
```

### Content Not Scrolling

**Problem:** Sidebar content is cut off and cannot scroll.

**Solution:** Add CSS for scrollable content:

```css
:host ::ng-deep .e-sidebar {
  overflow-y: auto;
  max-height: 100vh;
}
```

### Backdrop Not Working

**Problem:** Backdrop overlay not appearing with `showBackdrop`.

**Solution:** Ensure target wrapper is set correctly with inner wrapper div:

```typescript
template: `<ejs-sidebar [target]="'#wrapper'" [showBackdrop]="true">
          </ejs-sidebar>
          <div id="wrapper">
            <div>
              <!-- Only this element gets backdrop overlay -->
            </div>
          </div>`
```

### Animation Lag

**Problem:** Sidebar animation is slow or janky.

**Solution:** Use GPU acceleration with CSS:

```css
:host ::ng-deep .e-sidebar {
  will-change: transform;
  transform: translateZ(0);
  backface-visibility: hidden;
}
```

### Media Query Not Responsive

**Problem:** Sidebar doesn't auto-close on screen resize.

**Solution:** Use debounced resize handler:

```typescript
private resizeSubject = new Subject<Event>();

ngOnInit() {
  this.resizeSubject.pipe(
    debounceTime(300),
    takeUntil(this.destroy$)
  ).subscribe(() => {
    this.handleResize();
  });

  window.addEventListener('resize', (e) => {
    this.resizeSubject.next(e);
  });
}

handleResize() {
  const isMobile = window.innerWidth < 768;
  if (isMobile && this.sidebar?.isOpen) {
    this.sidebar?.hide();
  }
}
```

### Route Change Sidebar Not Hiding

**Problem:** Sidebar stays open when navigating routes.

**Solution:** Subscribe to router events properly:

```typescript
constructor(private router: Router) {
  this.router.events.pipe(
    filter(event => event instanceof NavigationEnd),
    takeUntil(this.destroy$)
  ).subscribe((event: NavigationEnd) => {
    this.sidebar?.hide();
  });
}
```

### Memory Leaks

**Problem:** Event listeners not cleaned up.

**Solution:** Unsubscribe and destroy subscriptions:

```typescript
private destroy$ = new Subject<void>();

ngOnDestroy() {
  this.destroy$.next();
  this.destroy$.complete();
}

// In subscriptions:
.pipe(takeUntil(this.destroy$))
.subscribe(...);
```

## Best Practices Checklist

- ✅ Always set initial `style="visibility: hidden"` and show in `created` event
- ✅ Use `@ViewChild` to access sidebar methods (show, hide, toggle)
- ✅ Set `[target]` property for proper content pushing/shifting
- ✅ Use `type="Auto"` for responsive behavior by default
- ✅ Enable `enableGestures` for mobile touch support
- ✅ Use `closeOnDocumentClick` for dropdown-style sidebars
- ✅ Add media queries for responsive design changes
- ✅ Unsubscribe from observables in ngOnDestroy
- ✅ Use proper ARIA attributes for accessibility
- ✅ Test on various devices and screen sizes
