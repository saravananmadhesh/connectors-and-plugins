# Tab Selection & Navigation

## Table of Contents
- [Selection Events](#selection-events)
- [Programmatic Selection](#programmatic-selection)
- [Detecting User vs Programmatic Selection](#detecting-user-vs-programmatic-selection)
- [Keyboard Navigation](#keyboard-navigation)
- [Click Handlers](#click-handlers)

## Selection Events

### Selecting Event (Before Selection)

The `selecting` event fires before a tab is selected, allowing you to validate or prevent selection:

```typescript
import { Component, ViewChild } from '@angular/core';
import { TabModule, TabComponent, SelectingEventArgs } from '@syncfusion/ej2-angular-navigations';

@Component({
  imports: [TabModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <ejs-tab #tabObj (selecting)="onTabSelecting($event)">
      <e-tabitems>
        <e-tabitem [header]="{ text: 'Home' }" content="Home content"></e-tabitem>
        <e-tabitem [header]="{ text: 'About' }" content="About content"></e-tabitem>
        <e-tabitem [header]="{ text: 'Contact' }" content="Contact content"></e-tabitem>
      </e-tabitems>
    </ejs-tab>
  `
})
export class AppComponent {
  @ViewChild('tabObj') tabObj?: TabComponent;

  onTabSelecting(args: SelectingEventArgs) {
    console.log('Selecting tab:', args.selectedIndex);
    
    // Validate before selection
    if (args.selectedIndex === 2) {
      // Prevent selection if condition not met
      if (!this.userCanAccessContact()) {
        args.cancel = true;
        console.log('Contact tab access denied');
      }
    }
  }

  private userCanAccessContact(): boolean {
    return true;  // Replace with actual permission check
  }
}
```

### Selected Event (After Selection)

The `selected` event fires after a tab is selected, useful for data loading or logging:

```typescript
import { Component } from '@angular/core';
import { TabModule, SelectEventArgs } from '@syncfusion/ej2-angular-navigations';

@Component({
  imports: [TabModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <div>
      <p>Selected: {{ selectedTabName }}</p>
      <ejs-tab (selected)="onTabSelected($event)">
        <e-tabitems>
          <e-tabitem [header]="{ text: 'Dashboard' }" content="Dashboard"></e-tabitem>
          <e-tabitem [header]="{ text: 'Analytics' }" content="Analytics"></e-tabitem>
          <e-tabitem [header]="{ text: 'Reports' }" content="Reports"></e-tabitem>
        </e-tabitems>
      </ejs-tab>
    </div>
  `
})
export class AppComponent {
  public selectedTabName = 'Dashboard';

  onTabSelected(args: SelectEventArgs) {
    // Update UI based on selection
    this.selectedTabName = this.getTabName(args.selectedIndex!);
    
    // Load data for selected tab
    this.loadDataForTab(args.selectedIndex!);
    
    // Log analytics
    console.log('Tab switched to:', this.selectedTabName);
  }

  private getTabName(index: number): string {
    const names = ['Dashboard', 'Analytics', 'Reports'];
    return names[index];
  }

  private loadDataForTab(index: number) {
    // Fetch data based on tab index
    console.log(`Loading data for tab ${index}`);
  }
}
```

### Event Properties

```typescript
// SelectingEventArgs
{
  cancel: boolean;              // Set true to prevent selection
  previousIndex: number;        // Previously selected tab
  selectedIndex: number;        // Tab to be selected
  isInteracted: boolean;        // true if user clicked, false if programmatic
  selectingElement: HTMLElement; // The tab header element
}

// SelectEventArgs
{
  previousIndex: number;        // Previously selected tab
  selectedIndex: number;        // Currently selected tab
  isInteracted: boolean;        // true if user clicked
  selectedElement: HTMLElement;  // The selected tab header
  contentElement: HTMLElement;   // The content area element
}
```

## Programmatic Selection

### Select Method

Programmatically select tabs using the `.select()` method:

```typescript
import { Component, ViewChild } from '@angular/core';
import { TabModule, TabComponent } from '@syncfusion/ej2-angular-navigations';

@Component({
  imports: [TabModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <div style="margin: 20px;">
      <button (click)="selectTab(0)">Go to Tab 1</button>
      <button (click)="selectTab(1)">Go to Tab 2</button>
      <button (click)="selectTab(2)">Go to Tab 3</button>
      <button (click)="selectFirstTab()">Reset to First</button>
      <button (click)="selectNextTab()">Next Tab</button>
    </div>

    <ejs-tab #tabObj [selectedIndex]="initialTab">
      <e-tabitems>
        <e-tabitem [header]="{ text: 'Step 1' }" content="Complete step 1"></e-tabitem>
        <e-tabitem [header]="{ text: 'Step 2' }" content="Complete step 2"></e-tabitem>
        <e-tabitem [header]="{ text: 'Step 3' }" content="Complete step 3"></e-tabitem>
      </e-tabitems>
    </ejs-tab>
  `
})
export class AppComponent {
  @ViewChild('tabObj') tabObj?: TabComponent;
  public initialTab = 0;

  selectTab(index: number) {
    // Select tab at index
    (this.tabObj as TabComponent).select(index);
  }

  selectFirstTab() {
    // Select first tab
    (this.tabObj as TabComponent).select(0);
  }

  selectNextTab() {
    const currentIndex = (this.tabObj as TabComponent).selectedIndex;
    const totalTabs = (this.tabObj as TabComponent).items!.length;
    const nextIndex = (currentIndex! + 1) % totalTabs;
    (this.tabObj as TabComponent).select(nextIndex);
  }
}
```

### Select with DropDown

```typescript
import { Component, ViewChild } from '@angular/core';
import { TabModule, TabComponent } from '@syncfusion/ej2-angular-navigations';
import { DropDownListModule, DropDownListComponent, ChangeEventArgs } from '@syncfusion/ej2-angular-dropdowns';

@Component({
  imports: [TabModule, DropDownListModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <div style="margin: 20px;">
      <label>Select Tab:</label>
      <ejs-dropdownlist 
        #dropdown
        [dataSource]="dropdownData"
        [fields]="fields"
        [value]="0"
        (change)="onDropDownChange($event)">
      </ejs-dropdownlist>
    </div>

    <ejs-tab #tabObj [selectedIndex]="0">
      <e-tabitems>
        <e-tabitem [header]="{ text: 'India' }" content="India content"></e-tabitem>
        <e-tabitem [header]="{ text: 'Canada' }" content="Canada content"></e-tabitem>
        <e-tabitem [header]="{ text: 'Australia' }" content="Australia content"></e-tabitem>
      </e-tabitems>
    </ejs-tab>
  `
})
export class AppComponent {
  @ViewChild('tabObj') tabObj?: TabComponent;
  @ViewChild('dropdown') dropdown?: DropDownListComponent;

  public dropdownData: object[] = [
    { Id: 0, text: 'India' },
    { Id: 1, text: 'Canada' },
    { Id: 2, text: 'Australia' }
  ];

  public fields = { text: 'text', value: 'Id' };

  onDropDownChange(args: ChangeEventArgs) {
    // Select tab based on dropdown selection
    (this.tabObj as TabComponent).select(args.value as number);
  }
}
```

## Detecting User vs Programmatic Selection

The `isInteracted` property tells you if selection was user-initiated:

```typescript
import { Component } from '@angular/core';
import { TabModule, SelectingEventArgs, SelectEventArgs } from '@syncfusion/ej2-angular-navigations';

@Component({
  imports: [TabModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <div style="margin: 20px;">
      <p>{{ selectionLog }}</p>
      <button (click)="selectTab()">Programmatically Select Tab 2</button>
      <ejs-tab (selecting)="onSelecting($event)" (selected)="onSelected($event)">
        <e-tabitems>
          <e-tabitem [header]="{ text: 'Tab 1' }" content="Content 1"></e-tabitem>
          <e-tabitem [header]="{ text: 'Tab 2' }" content="Content 2"></e-tabitem>
          <e-tabitem [header]="{ text: 'Tab 3' }" content="Content 3"></e-tabitem>
        </e-tabitems>
      </ejs-tab>
    </div>
  `
})
export class AppComponent {
  public selectionLog = 'Selection log will appear here';

  onSelecting(args: SelectingEventArgs) {
    const source = args.isInteracted ? 'User Click' : 'Programmatic Call';
    this.selectionLog = `Selecting Tab ${args.selectedIndex} (${source})`;
  }

  onSelected(args: SelectEventArgs) {
    const source = args.isInteracted ? 'User Click' : 'Programmatic Call';
    this.selectionLog = `Selected Tab ${args.selectedIndex} (${source})`;
    
    // Perform different actions based on source
    if (args.isInteracted) {
      console.log('User manually selected tab');
    } else {
      console.log('Tab selected programmatically');
    }
  }

  selectTab() {
    // This will trigger selected event with isInteracted = false
    const tabElement = document.querySelector('ejs-tab') as any;
    tabElement.ej2_instances[0].select(1);
  }
}
```

## Keyboard Navigation

Tab component has built-in keyboard support:

### Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `Tab` | Focus next header |
| `Shift + Tab` | Focus previous header |
| `ArrowRight` / `ArrowDown` | Select next tab |
| `ArrowLeft` / `ArrowUp` | Select previous tab |
| `Home` | Select first tab |
| `End` | Select last tab |
| `Enter` / `Space` | Activate focused tab |

### Keyboard Example

```typescript
import { Component } from '@angular/core';
import { TabModule } from '@syncfusion/ej2-angular-navigations';

@Component({
  imports: [TabModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <div>
      <p>Keyboard Navigation Enabled (Built-in)</p>
      <p>Try:</p>
      <ul>
        <li>Tab/Shift+Tab to focus headers</li>
        <li>Arrow keys to navigate</li>
        <li>Enter/Space to select</li>
        <li>Home/End to go to first/last</li>
      </ul>

      <ejs-tab>
        <e-tabitems>
          <e-tabitem [header]="{ text: 'Home' }" content="Home content"></e-tabitem>
          <e-tabitem [header]="{ text: 'Settings' }" content="Settings content"></e-tabitem>
          <e-tabitem [header]="{ text: 'About' }" content="About content"></e-tabitem>
        </e-tabitems>
      </ejs-tab>
    </div>
  `
})
export class AppComponent { }
```

### Custom Keyboard Handler

Handle additional keyboard events:

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

  @HostListener('window:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    // Ctrl+1, Ctrl+2, Ctrl+3 to select tabs
    if (event.ctrlKey) {
      if (event.key === '1') {
        (this.tabObj as TabComponent).select(0);
        event.preventDefault();
      } else if (event.key === '2') {
        (this.tabObj as TabComponent).select(1);
        event.preventDefault();
      } else if (event.key === '3') {
        (this.tabObj as TabComponent).select(2);
        event.preventDefault();
      }
    }
  }
}
```

## Click Handlers

Detect clicks on specific header elements:

### Header Click Handler

```typescript
import { Component, ViewChild } from '@angular/core';
import { TabModule, TabComponent } from '@syncfusion/ej2-angular-navigations';

@Component({
  imports: [TabModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <div style="margin: 20px;">
      <p>Click Log: {{ clickLog }}</p>
    </div>

    <ejs-tab #tabObj>
      <e-tabitems>
        <e-tabitem [header]="{ text: 'Dashboard' }" (click)="onHeaderClick(0)">
          <ng-template #content>Dashboard content</ng-template>
        </e-tabitem>
        <e-tabitem [header]="{ text: 'Settings' }" (click)="onHeaderClick(1)">
          <ng-template #content>Settings content</ng-template>
        </e-tabitem>
        <e-tabitem [header]="{ text: 'Profile' }" (click)="onHeaderClick(2)">
          <ng-template #content>Profile content</ng-template>
        </e-tabitem>
      </e-tabitems>
    </ejs-tab>
  `
})
export class AppComponent {
  @ViewChild('tabObj') tabObj?: TabComponent;
  public clickLog = '';

  onHeaderClick(index: number) {
    const headers = ['Dashboard', 'Settings', 'Profile'];
    this.clickLog = `Clicked: ${headers[index]} at ${new Date().toLocaleTimeString()}`;
  }
}
```

### Icon Click Handler

```typescript
// Handle click on header icon specifically
onHeaderIconClick(event: MouseEvent, tabIndex: number) {
  // Check if click target is icon
  const target = event.target as HTMLElement;
  if (target.classList.contains('e-tab-icon')) {
    console.log('Icon clicked on tab', tabIndex);
    event.stopPropagation();  // Prevent tab selection
    // Custom icon action
  }
}
```

### Double-Click Detection

```typescript
import { Component } from '@angular/core';
import { TabModule, SelectEventArgs } from '@syncfusion/ej2-angular-navigations';

@Component({
  imports: [TabModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <ejs-tab (selected)="onTabSelected($event)">
      <e-tabitems>
        <e-tabitem [header]="{ text: 'Tab 1' }" content="Content 1"></e-tabitem>
        <e-tabitem [header]="{ text: 'Tab 2' }" content="Content 2"></e-tabitem>
      </e-tabitems>
    </ejs-tab>
  `
})
export class AppComponent {
  private lastClickTime = 0;
  private lastClickIndex = -1;

  onTabSelected(args: SelectEventArgs) {
    const now = Date.now();
    const isDoubleClick = 
      (now - this.lastClickTime < 300) && 
      (this.lastClickIndex === args.selectedIndex);
    
    this.lastClickTime = now;
    this.lastClickIndex = args.selectedIndex!;

    if (isDoubleClick) {
      console.log('Double-clicked on tab', args.selectedIndex);
      // Perform double-click action
    }
  }
}
```

## Accessibility

Tab navigation supports WCAG standards:
- Full keyboard accessibility
- Arrow key navigation
- Home/End key support
- ARIA attributes for screen readers
- Focus indicators visible on headers
- Tab order follows DOM order

All keyboard navigation works automatically without additional configuration.
