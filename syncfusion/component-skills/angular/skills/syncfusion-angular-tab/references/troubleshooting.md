# Troubleshooting & Best Practices

## Table of Contents
- [Common Issues](#common-issues)
- [Performance Optimization](#performance-optimization)
- [Content Rendering Gotchas](#content-rendering-gotchas)
- [State Management Pitfalls](#state-management-pitfalls)
- [Accessibility Tips](#accessibility-tips)
- [Migration from EJ1 to EJ2](#migration-from-ej1-to-ej2)

## Common Issues

### Issue: Tabs Not Rendering

**Problem:** Tab component doesn't display on page

**Causes & Solutions:**

```typescript
// ❌ WRONG - Missing TabModule import
@Component({
  selector: 'app-root',
  template: `<ejs-tab></ejs-tab>`
})
export class AppComponent { }

// ✅ CORRECT - Import TabModule
import { TabModule } from '@syncfusion/ej2-angular-navigations';

@Component({
  imports: [TabModule],
  standalone: true,
  selector: 'app-root',
  template: `<ejs-tab></ejs-tab>`
})
export class AppComponent { }
```

**Check CSS imports:**

```css
/* src/styles.css - Ensure these exist */
@import '../node_modules/@syncfusion/ej2-base/styles/material3.css';
@import '../node_modules/@syncfusion/ej2-buttons/styles/material3.css';
@import '../node_modules/@syncfusion/ej2-popups/styles/material3.css';
@import '../node_modules/@syncfusion/ej2-navigations/styles/material3.css';
```

### Issue: Content Not Displaying

**Problem:** Tab headers appear but content is blank

**Solutions:**

```typescript
// ❌ WRONG - Missing content property
<e-tabitem [header]="{ text: 'Tab 1' }"></e-tabitem>

// ✅ CORRECT - Provide content
<e-tabitem [header]="{ text: 'Tab 1' }" content="Tab content"></e-tabitem>

// ✅ ALSO CORRECT - Using template
<e-tabitem [header]="{ text: 'Tab 1' }">
  <ng-template #content>Tab content</ng-template>
</e-tabitem>
```

### Issue: Events Not Firing

**Problem:** (selected) or (selecting) events don't trigger

**Solutions:**

```typescript
// ❌ WRONG - Typo in event name
<ejs-tab (onSelected)="handler($event)"></ejs-tab>

// ✅ CORRECT - Proper event binding
<ejs-tab (selected)="handler($event)"></ejs-tab>

// ✅ ALSO CHECK - Handler exists and has correct signature
onTabSelected(args: SelectEventArgs) {
  console.log('Tab selected:', args.selectedIndex);
}
```

### Issue: ViewChild Returns Undefined

**Problem:** `@ViewChild('tabObj')` is undefined

**Solutions:**

```typescript
// ❌ WRONG - Accessing before view initialization
ngOnInit() {
  this.tabObj.select(0);  // tabObj is undefined
}

// ✅ CORRECT - Wait for view to initialize
ngAfterViewInit() {
  this.tabObj.select(0);  // Now tabObj is available
}

// ✅ ALSO WORKS - Using optional chaining
constructor() {
  setTimeout(() => {
    this.tabObj?.select(0);
  }, 0);
}
```

## Performance Optimization

### Issue: Slow Initial Load

**Problem:** Tab component takes too long to render

**Solutions:**

```typescript
// ✅ Use On Demand or Dynamic rendering
<ejs-tab loadOn="Dynamic">
  <!-- Faster than Init mode -->
</ejs-tab>

// ✅ Load content on demand
<ejs-tab (selected)="loadTabContent($event)">
  <e-tabitems>
    <e-tabitem [header]="{ text: 'Heavy' }">
      <ng-template #content>
        {{ lazyLoadedContent }}
      </ng-template>
    </e-tabitem>
  </e-tabitems>
</ejs-tab>

// TypeScript
onTabSelected(args: SelectEventArgs) {
  if (!this.contentLoaded[args.selectedIndex!]) {
    this.loadTabContent(args.selectedIndex!);
  }
}
```

### Issue: Memory Leak with Many Tabs

**Problem:** Adding many tabs causes memory to grow unbounded

**Solutions:**

```typescript
// ❌ WRONG - Infinite tab creation
setInterval(() => {
  this.addTab();  // Unbounded growth
}, 100);

// ✅ CORRECT - Limit tab count
private MAX_TABS = 50;

addTab() {
  if ((this.tabObj?.items?.length || 0) < this.MAX_TABS) {
    this.tabObj?.addTab([{ header: { text: 'New' }, content: 'Content' }]);
  }
}

// ✅ ALSO - Clean up old tabs
removOldestTab() {
  if ((this.tabObj?.items?.length || 0) > this.MAX_TABS) {
    this.tabObj?.removeTab(0);
  }
}
```

### Issue: Lag When Switching Tabs

**Problem:** Noticeable delay between clicking tab and showing content

**Solutions:**

```typescript
// ✅ Use simpler rendering mode
<ejs-tab loadOn="Dynamic">
  <!-- Single content in DOM = faster switching -->
</ejs-tab>

// ✅ Disable animations for large tabs
<ejs-tab [animation]="{ previous: { effect: 'None' }, next: { effect: 'None' } }">
  <!-- No animation overhead -->
</ejs-tab>

// ✅ Pre-render important tabs only
<ejs-tab loadOn="Default">
  <!-- Only commonly used tabs stay in DOM -->
</ejs-tab>
```

## Content Rendering Gotchas

### Issue: Form Data Lost When Switching Tabs

**Problem:** Form values reset when returning to tab

**Cause:** Using Dynamic mode (content re-renders on each view)

**Solutions:**

```typescript
// ✅ Use On Demand or Init mode to preserve state
<ejs-tab loadOn="Default">  <!-- Or "Init" -->
  <!-- Form state preserved -->
</ejs-tab>

// ✅ Or manually save/restore state
onTabSelected(args: SelectEventArgs) {
  // Save current tab data
  this.saveTabState(args.previousIndex);
  // Restore new tab data
  this.restoreTabState(args.selectedIndex);
}
```

### Issue: Nested Tab Content Not Rendering

**Problem:** Nested tabs inside parent tab don't show

**Solutions:**

```typescript
// ✅ Initialize nested tabs in selected event
@ViewChild('parentTab') parentTab?: TabComponent;
@ViewChild('nestedTab') nestedTab?: TabComponent;

onParentTabSelected(args: SelectEventArgs) {
  if (args.selectedIndex === 1 && !this.nestedTabInitialized) {
    // Initialize nested tab
    setTimeout(() => {
      this.initializeNestedTab();
    }, 0);
    this.nestedTabInitialized = true;
  }
}

private initializeNestedTab() {
  if (this.nestedTab) {
    (this.nestedTab as TabComponent).items = [
      { header: { text: 'Sub 1' }, content: 'Content 1' },
      { header: { text: 'Sub 2' }, content: 'Content 2' }
    ];
  }
}
```

### Issue: Component Inside Tab Doesn't Initialize

**Problem:** Component in tab template doesn't run its ngOnInit

**Solutions:**

```typescript
// ✅ Use Input bindings to trigger detection
<ejs-tab (selected)="onTabSelected($event)">
  <e-tabitems>
    <e-tabitem>
      <ng-template #content>
        <!-- Pass key to force re-create -->
        <app-child-component [key]="refreshKey"></app-child-component>
      </ng-template>
    </e-tabitem>
  </e-tabitems>
</ejs-tab>

onTabSelected(args: SelectEventArgs) {
  this.refreshKey = Math.random();  // Force component reload
}
```

## State Management Pitfalls

### Issue: Lost Scroll Position in Tab

**Problem:** Scrolling to position in tab, switching tabs, returning - position is reset

**Solutions:**

```typescript
// ✅ Save scroll position per tab
private scrollPositions: Map<number, number> = new Map();

onTabSelected(args: SelectEventArgs) {
  // Save previous tab scroll
  if (args.previousIndex !== null) {
    const content = document.querySelector(`.e-content`);
    if (content) {
      this.scrollPositions.set(args.previousIndex, content.scrollTop);
    }
  }

  // Restore new tab scroll
  setTimeout(() => {
    const savedPosition = this.scrollPositions.get(args.selectedIndex!);
    if (savedPosition) {
      const content = document.querySelector(`.e-content`);
      if (content) {
        content.scrollTop = savedPosition;
      }
    }
  }, 0);
}
```

### Issue: Reactive Form Values Don't Update

**Problem:** FormGroup value changes don't reflect in tab

**Solutions:**

```typescript
// ✅ Use markForCheck() when using OnPush
import { ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-root',
  template: `<!-- -->`
})
export class AppComponent {
  constructor(private cdr: ChangeDetectorRef) { }

  onFormChange() {
    this.cdr.markForCheck();  // Update component view
  }
}

// ✅ Or manually trigger detection
onFormSubmit() {
  this.myForm.valueChanges.subscribe(value => {
    this.cdr.detectChanges();
  });
}
```

## Accessibility Tips

### Keyboard Navigation

**Best Practice:** Tab component has built-in keyboard support

```typescript
// Already works without code:
// - Tab key: Focus headers
// - Arrow keys: Navigate tabs
// - Enter/Space: Select tab
// - Home/End: First/last tab

// ✅ Test with keyboard only
// No mouse, only keyboard
```

### Screen Reader Support

**Best Practice:** Maintain semantic HTML

```typescript
// ✅ Use ng-template with proper labels
<ejs-tab>
  <e-tabitems>
    <e-tabitem [header]="{ text: 'Home' }">
      <ng-template #content>
        <h2>Home Content</h2>
        <!-- Screen readers announce heading -->
      </ng-template>
    </e-tabitem>
  </e-tabitems>
</ejs-tab>

// ✅ Provide aria-labels if needed
<ejs-tab role="tablist" aria-label="Main navigation">
  <!-- Content -->
</ejs-tab>
```

### Focus Management

```typescript
// ✅ Restore focus after tab operation
addNewTab() {
  this.tabObj?.addTab([newTab]);
  
  // Move focus to new tab
  setTimeout(() => {
    const headers = document.querySelectorAll('.e-tab-wrap');
    const lastHeader = headers[headers.length - 1] as HTMLElement;
    lastHeader?.focus();
  }, 0);
}
```

## Migration from EJ1 to EJ2

### Key Differences

| Aspect | EJ1 | EJ2 |
|--------|-----|-----|
| Selector | `#tabElement` | `<ejs-tab>` |
| Init | `$.fn.ejTab()` | Component import |
| Properties | `option()` method | Data binding |
| Events | `bind()` method | Event bindings |
| API | `setActiveTab()` | `.select()` |

### Migration Example

```typescript
// EJ1 - Old way
$('#tabElement').ejTab({
  selectedItemIndex: 1
});
$('#tabElement').ejTab('setActiveTab', 2);

// EJ2 - New way
import { TabModule } from '@syncfusion/ej2-angular-navigations';

@Component({
  imports: [TabModule],
  standalone: true,
  selector: 'app-root',
  template: `<ejs-tab [selectedIndex]="1"></ejs-tab>`
})
export class AppComponent {
  selectTab(index: number) {
    this.tabObj.select(index);
  }
}
```

### Common Migration Issues

```typescript
// ❌ EJ1 code won't work in EJ2
$('#tab').ejTab('option', 'height', '400px');

// ✅ Use property binding instead
<ejs-tab [height]="'400px'"></ejs-tab>

// ❌ Event syntax changed
$('#tab').bind('tabSelect', handler);

// ✅ Use Angular event binding
<ejs-tab (selected)="handler($event)"></ejs-tab>

// ❌ Old API methods gone
$('#tab').ejTab('selectTab', 1);

// ✅ Use new methods
this.tabObj.select(1);
```

## Quick Debugging Checklist

- [ ] TabModule imported in component
- [ ] CSS files included in styles.css
- [ ] Content provided (content property or template)
- [ ] Event handlers have correct signatures
- [ ] ViewChild/ViewChildren decorated correctly
- [ ] Accessing tabs after AfterViewInit
- [ ] No console errors
- [ ] Testing on actual device/browser (not just desktop)
- [ ] Performance profiled with DevTools
- [ ] Accessibility tested with keyboard and screen reader

## Additional Resources

- Official Docs: https://ej2.syncfusion.com/angular/documentation/tabs/
- Sample Code: Check StackBlitz examples in official docs
- API Reference: Full property/method documentation
- Support: Syncfusion support portal
