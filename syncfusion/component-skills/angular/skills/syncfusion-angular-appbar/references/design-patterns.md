# Design Patterns in Angular AppBar

## Table of Contents
- [Overview](#overview)
- [Spacer Pattern](#spacer-pattern)
- [Separator Pattern](#separator-pattern)
- [AppBar with Menu](#appbar-with-menu)
- [AppBar with Buttons](#appbar-with-buttons)
- [AppBar with Sidebar](#appbar-with-sidebar)
- [Responsive AppBar](#responsive-appbar)

## Overview

The AppBar component can be combined with other Syncfusion components and CSS elements to create flexible navigation layouts. This section covers common design patterns and integration techniques.

## Spacer Pattern

The `.e-appbar-spacer` element creates flexible spacing within the AppBar. It automatically distributes available space, allowing you to push content to the ends or create balanced layouts.

### Basic Spacer Usage

```typescript
import { AppBarModule } from '@syncfusion/ej2-angular-navigations'
import { ButtonModule } from '@syncfusion/ej2-angular-buttons'
import { Component } from "@angular/core";

@Component({
  imports: [AppBarModule, ButtonModule],
  standalone: true,
  selector: "app-root",
  template: `
    <div class="control-container">
      <ejs-appbar colorMode="Primary">
        <button #defaultButtonHome ejs-button cssClass="e-inherit" iconCss="e-icons e-home"></button>
        <div class="e-appbar-spacer"></div>
        <button #defaultButtonCut ejs-button cssClass="e-inherit" iconCss="e-icons e-cut"></button>
        <div class="e-appbar-spacer"></div>
        <button #defaultButtonPan ejs-button cssClass="e-inherit" iconCss="e-icons e-pan"></button>
      </ejs-appbar>
    </div>
  `,
})
export class AppComponent { }
```

### How Spacer Works

The spacer uses flexbox to distribute space:
- `flex: 1` - Takes up available space
- Multiple spacers divide space equally
- Creates responsive layouts automatically

### Spacer Patterns

**Pattern 1: Two-End Layout (Navigation | Actions)**
```typescript
<ejs-appbar colorMode="Primary">
  <button ejs-button cssClass="e-inherit" iconCss="e-icons e-menu"></button>
  <span>MyApp</span>
  <div class="e-appbar-spacer"></div>
  <button ejs-button cssClass="e-inherit" iconCss="e-icons e-user"></button>
</ejs-appbar>
```

**Pattern 2: Centered Content**
```typescript
<ejs-appbar colorMode="Primary">
  <div class="e-appbar-spacer"></div>
  <span style="text-align: center">Centered Title</span>
  <div class="e-appbar-spacer"></div>
</ejs-appbar>
```

**Pattern 3: Three-Section Layout**
```typescript
<ejs-appbar colorMode="Primary">
  <button ejs-button cssClass="e-inherit" iconCss="e-icons e-menu"></button>
  <div class="e-appbar-spacer"></div>
  <span>Brand Logo</span>
  <div class="e-appbar-spacer"></div>
  <button ejs-button cssClass="e-inherit" iconCss="e-icons e-user"></button>
</ejs-appbar>
```

## Separator Pattern

The `.e-appbar-separator` element displays a vertical line that visually groups or separates AppBar content elements.

### Basic Separator Usage

```typescript
import { AppBarModule } from '@syncfusion/ej2-angular-navigations'
import { ButtonModule } from '@syncfusion/ej2-angular-buttons'
import { Component } from "@angular/core";

@Component({
  imports: [AppBarModule, ButtonModule],
  standalone: true,
  selector: "app-root",
  template: `
    <div class="control-container">
      <ejs-appbar colorMode="Primary">
        <button #defaultButtonCut ejs-button cssClass="e-inherit" iconCss="e-icons e-cut"></button>
        <button #defaultButtonCopy ejs-button cssClass="e-inherit" iconCss="e-icons e-copy"></button>
        <button #defaultButtonPaste ejs-button cssClass="e-inherit" iconCss="e-icons e-paste"></button>
        <div class="e-appbar-separator"></div>
        <button #defaultButtonBold ejs-button cssClass="e-inherit" iconCss="e-icons e-bold"></button>
        <button #defaultButtonUnderline ejs-button cssClass="e-inherit" iconCss="e-icons e-underline"></button>
        <button #defaultButtonItalic ejs-button cssClass="e-inherit" iconCss="e-icons e-italic"></button>
        <div class="e-appbar-separator"></div>
        <button #defaultButtonAlignLeft ejs-button cssClass="e-inherit" iconCss="e-icons e-align-left"></button>
        <button #defaultButtonAlignRight ejs-button cssClass="e-inherit" iconCss="e-icons e-align-right"></button>
        <button #defaultButtonAlignCenter ejs-button cssClass="e-inherit" iconCss="e-icons e-align-center"></button>
        <button #defaultButtonJustify ejs-button cssClass="e-inherit" iconCss="e-icons e-justify"></button>
      </ejs-appbar>
    </div>
  `,
})
export class AppComponent { }
```

### Separator Styling

```css
/* Separator is a simple div with vertical line styling */
.e-appbar-separator {
  width: 1px;
  height: 24px;
  background-color: rgba(255, 255, 255, 0.3); /* Transparent white for dark backgrounds */
}
```

### When to Use Separators

- Group related buttons functionally
- Create visual sections in toolbar-like AppBars
- Separate navigation from actions
- Enhance readability in dense layouts

## AppBar with Menu

The AppBar integrates seamlessly with the Menu component. The Menu inherits the AppBar's styling using the `cssClass="e-inherit"` attribute.

### AppBar with Menu Example

```typescript
import { AppBarModule, MenuModule } from '@syncfusion/ej2-angular-navigations'
import { ButtonModule } from '@syncfusion/ej2-angular-buttons'
import { Component } from "@angular/core";
import { MenuItemModel } from '@syncfusion/ej2-angular-navigations';

@Component({
  imports: [AppBarModule, ButtonModule, MenuModule],
  standalone: true,
  selector: "app-root",
  template: `
    <div class="control-container">
      <ejs-appbar colorMode="Primary">
        <button #defaultButtonMenu ejs-button cssClass="e-inherit" iconCss="e-icons e-menu"></button>
        <ejs-menu #defaultMenuCompany cssClass="e-inherit" [items]='companyMenuItems'></ejs-menu>
        <ejs-menu #defaultMenuProducts cssClass="e-inherit" [items]='productMenuItems'></ejs-menu>
        <ejs-menu #defaultMenuAbout cssClass="e-inherit" [items]='aboutMenuItems'></ejs-menu>
        <ejs-menu #defaultMenuCareers cssClass="e-inherit" [items]='careerMenuItems'></ejs-menu>
        <div class="e-appbar-spacer"></div>
        <button #defaultButtonLogin ejs-button cssClass="e-inherit">Login</button>
      </ejs-appbar>
    </div>
  `,
})
export class AppComponent {
  public companyMenuItems: MenuItemModel[] = [
    {
      text: 'Company',
      items: [
        { text: 'About Us' },
        { text: 'Customers' },
        { text: 'Blog' },
        { text: 'Careers' }
      ]
    }
  ];

  public productMenuItems: MenuItemModel[] = [
    {
      text: 'Products',
      items: [
        { text: 'Developer' },
        { text: 'Analytics' },
        { text: 'Reporting' },
        { text: 'Help Desk' }
      ]
    }
  ];

  public aboutMenuItems: MenuItemModel[] = [
    { text: 'About Us' }
  ];

  public careerMenuItems: MenuItemModel[] = [
    { text: 'Careers' }
  ];
}
```

### Key Implementation Points

- **e-inherit class**: Critical for menus to inherit AppBar styling
- **Multiple menus**: Can add multiple menu components horizontally
- **Submenu support**: Menu items can have child items for nested navigation
- **Responsive**: Menus adapt to mobile layouts

## AppBar with Buttons

The AppBar can contain Button and DropDownButton components that inherit AppBar styling for visual consistency.

### AppBar with Buttons and DropDownButtons Example

```typescript
import { AppBarModule } from '@syncfusion/ej2-angular-navigations'
import { ButtonModule } from '@syncfusion/ej2-angular-buttons'
import { DropDownButtonModule } from '@syncfusion/ej2-angular-splitbuttons'
import { Component } from "@angular/core";
import { ItemModel } from '@syncfusion/ej2-angular-splitbuttons';

@Component({
  imports: [AppBarModule, ButtonModule, DropDownButtonModule],
  standalone: true,
  selector: "app-root",
  template: `
    <div class="control-container">
      <ejs-appbar colorMode="Primary">
        <button #defaultButtonMenu ejs-button cssClass="e-inherit" iconCss="e-icons e-menu"></button>
        <button #defaultDropDownButtonProduct ejs-dropdownbutton 
          cssClass="e-inherit" 
          [items]='productDropDownButtonItems' 
          content="Products">
        </button>
        <div class="e-appbar-spacer"></div>
        <button #defaultButtonLogin ejs-button cssClass="e-inherit">Login</button>
      </ejs-appbar>
    </div>
  `,
})
export class AppComponent {
  public productDropDownButtonItems: ItemModel[] = [
    { text: 'Developer' },
    { text: 'Analytics' },
    { text: 'Reporting' },
    { text: 'E-Signature' },
    { text: 'Help Desk' }
  ];
}
```

### Button Integration Pattern

```typescript
<ejs-appbar colorMode="Primary">
  <!-- Icon buttons -->
  <button ejs-button cssClass="e-inherit" iconCss="e-icons e-menu"></button>
  
  <!-- Dropdown button -->
  <button ejs-dropdownbutton cssClass="e-inherit" [items]='items'>
    Menu
  </button>
  
  <!-- Spacer to separate groups -->
  <div class="e-appbar-spacer"></div>
  
  <!-- Text button -->
  <button ejs-button cssClass="e-inherit">Action</button>
</ejs-appbar>
```

## AppBar with Sidebar

The AppBar integrates with the Sidebar component for navigation pane patterns. Clicking a menu button toggles the sidebar visibility.

### AppBar with Sidebar Example

```typescript
import { AppBarModule, SidebarModule, TreeViewModule } from '@syncfusion/ej2-angular-navigations'
import { ButtonModule } from '@syncfusion/ej2-angular-buttons'
import { TextBoxModule } from '@syncfusion/ej2-angular-inputs'
import { Component, ViewChild } from "@angular/core";
import { SidebarComponent } from '@syncfusion/ej2-angular-navigations';

@Component({
  imports: [AppBarModule, ButtonModule, SidebarModule, TreeViewModule, TextBoxModule],
  standalone: true,
  selector: "app-root",
  template: `
    <div class="control-section" id="reswrapper">
      <div>
        <ejs-appbar>
          <button #defaultButtonMenu ejs-button cssClass="e-inherit" 
            iconCss="e-icons e-menu" 
            (click)="toggle()">
          </button>
          <div class="e-folder">
            <div class="e-folder-name">Navigation Pane</div>
          </div>
        </ejs-appbar>
      </div>
      <ejs-sidebar id="sideTree" class="sidebar-treeview" 
        #sidebarTreeviewInstance 
        [width]="width" 
        [target]="target" 
        [mediaQuery]="mediaQuery" 
        [isOpen]="true">
        <div class='main-menu'>
          <div class="table-content">
            <ejs-textbox id="resSearch" placeholder="Search..."></ejs-textbox>
            <p class="main-menu-header">TABLE OF CONTENTS</p>
          </div>
          <div>
            <ejs-treeview id='mainTree' cssClass="main-treeview" 
              [fields]="fields" 
              expandOn='Click'>
            </ejs-treeview>
          </div>
        </div>
      </ejs-sidebar>
      <div class="main-sidebar-content" id="main-text">
        <div class="sidebar-content">
          <div class="sidebar-heading">Responsive Sidebar with Treeview</div>
          <p class="paragraph-content">
            This is a responsive navigation pattern combining AppBar and Sidebar.
          </p>
        </div>
      </div>
    </div>
  `,
})
export class AppComponent {
  @ViewChild('sidebarTreeviewInstance')
  public sidebarTreeviewInstance?: SidebarComponent;

  public data: { [key: string]: Object }[] = [
    {
      nodeId: '01', nodeText: 'Installation',
    },
    {
      nodeId: '02', nodeText: 'Deployment',
    },
    {
      nodeId: '03', nodeText: 'Quick Start',
    },
    {
      nodeId: '04', nodeText: 'Components',
      nodeChild: [
        { nodeId: '04-01', nodeText: 'Calendar' },
        { nodeId: '04-02', nodeText: 'DatePicker' },
        { nodeId: '04-03', nodeText: 'DateTimePicker' },
        { nodeId: '04-04', nodeText: 'DateRangePicker' },
        { nodeId: '04-05', nodeText: 'TimePicker' },
        { nodeId: '04-06', nodeText: 'SideBar' }
      ]
    }
  ];

  public width: string = '220px';
  public target: string = '.main-sidebar-content';
  public mediaQuery: string = '(min-width: 600px)';
  public fields: object = { 
    dataSource: this.data, 
    id: 'nodeId', 
    text: 'nodeText', 
    child: 'nodeChild' 
  };

  toggle() {
    (this.sidebarTreeviewInstance as SidebarComponent).toggle();
  }
}
```

### AppBar + Sidebar Pattern Details

- **Click handler**: Toggle button calls sidebar's `toggle()` method
- **Target property**: Sidebar targets `.main-sidebar-content` for responsive behavior
- **TreeView integration**: Sidebar contains searchable navigation tree
- **Responsive**: MediaQuery shows/hides sidebar on mobile/desktop

## Responsive AppBar

Create responsive AppBars that adapt to different screen sizes using CSS media queries.

### Responsive AppBar Example

```typescript
import { AppBarModule } from '@syncfusion/ej2-angular-navigations'
import { ButtonModule } from '@syncfusion/ej2-angular-buttons'
import { Component } from "@angular/core";

@Component({
  imports: [AppBarModule, ButtonModule],
  standalone: true,
  selector: "app-root",
  template: `
    <div class="control-container">
      <ejs-appbar colorMode="Primary">
        <button #defaultButtonMenu ejs-button cssClass="e-inherit" iconCss="e-icons e-menu"></button>
        <button #defaultButtonHome ejs-button cssClass="e-inherit mobile-hidden">Home</button>
        <button #defaultButtonAbout ejs-button cssClass="e-inherit mobile-hidden">About</button>
        <button #defaultButtonProducts ejs-button cssClass="e-inherit mobile-hidden">Products</button>
        <button #defaultButtonContacts ejs-button cssClass="e-inherit mobile-hidden">Contacts</button>
        <div class="e-appbar-spacer"></div>
        <div class="e-appbar-separator"></div>
        <button #defaultButtonLogin ejs-button cssClass="e-inherit">Login</button>
      </ejs-appbar>
    </div>
  `,
})
export class AppComponent { }
```

### Responsive CSS

```css
/* Desktop: Show all buttons */
.mobile-hidden {
  display: inline-flex;
}

/* Mobile: Hide non-critical buttons */
@media (max-width: 768px) {
  .mobile-hidden {
    display: none;
  }
}

/* Tablet: Show some buttons */
@media (min-width: 769px) and (max-width: 1024px) {
  .mobile-hidden:nth-child(3),
  .mobile-hidden:nth-child(4) {
    display: none;
  }
}
```

### Media Query Pattern Details

- **Desktop (>1024px)**: Show all navigation items
- **Tablet (769-1024px)**: Show reduced navigation
- **Mobile (<768px)**: Show only essential items (hamburger menu)

## Best Practices

1. **Use e-inherit class**: Ensures components inherit AppBar styling
2. **Apply spacers strategically**: Use for layout distribution, not random spacing
3. **Group with separators**: Visually organize related buttons/menus
4. **Keep mobile-first**: Design responsive AppBars for mobile screens first
5. **Limit content**: Avoid overcrowding AppBar with too many items
6. **Consistent theming**: Use same colorMode and mode throughout app
7. **Accessibility**: Use icon buttons with text labels or aria-labels
8. **Test responsiveness**: Verify AppBar works on all screen sizes
