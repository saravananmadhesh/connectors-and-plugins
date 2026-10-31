# Events and Interactivity

## Table of Contents
- [Tab Selection Events](#tab-selection-events)
- [Ribbon Expand/Collapse Events](#ribbon-expandcollapse-events)
- [Backstage Events](#backstage-events)
- [Event Arguments](#event-arguments)
- [Event Handling Patterns](#event-handling-patterns)
- [Complete Event Example](#complete-event-example)

## Tab Selection Events

### tabSelected Event

Triggered **after** a tab is successfully selected.

```typescript
import { Component } from "@angular/core";
import { RibbonModule } from '@syncfusion/ej2-angular-ribbon';
import { TabSelectedEventArgs } from '@syncfusion/ej2-angular-ribbon';

@Component({
  imports: [ RibbonModule ],
  standalone: true,
  selector: "app-root",
  template: `
    <ejs-ribbon id="ribbon" (tabSelected)="onTabSelected($event)">
      <e-ribbon-tabs>
        <e-ribbon-tab header="Home">
          <e-ribbon-groups>
            <e-ribbon-group header="Clipboard">
              <e-ribbon-collections>
                <e-ribbon-collection>
                  <e-ribbon-items>
                    <e-ribbon-item type="Button" [buttonSettings]="pasteButton"></e-ribbon-item>
                  </e-ribbon-items>
                </e-ribbon-collection>
              </e-ribbon-collections>
            </e-ribbon-group>
          </e-ribbon-groups>
        </e-ribbon-tab>
        <e-ribbon-tab header="Insert">
          <e-ribbon-groups>
            <e-ribbon-group header="Tables">
              <e-ribbon-collections>
                <e-ribbon-collection>
                  <e-ribbon-items>
                    <e-ribbon-item type="DropDown" [dropDownSettings]="tableSettings"></e-ribbon-item>
                  </e-ribbon-items>
                </e-ribbon-collection>
              </e-ribbon-collections>
            </e-ribbon-group>
          </e-ribbon-groups>
        </e-ribbon-tab>
      </e-ribbon-tabs>
    </ejs-ribbon>
  `
})
export class AppComponent {
  public pasteButton = { iconCss: "e-icons e-paste", content: "Paste" };
  public tableSettings = { iconCss: "e-icons e-table", content: "Table", items: [] };
  
  public onTabSelected(args: TabSelectedEventArgs) {
    console.log("Tab selected:", args.element?.innerText);
    // Perform actions based on selected tab
    if (args.element?.innerText?.includes("Insert")) {
      console.log("Insert tab activated - load insert options");
    }
  }
}
```

### tabSelecting Event

Triggered **before** a tab is selected. Can be canceled to prevent selection.

```typescript
import { Component } from "@angular/core";
import { RibbonModule } from '@syncfusion/ej2-angular-ribbon';
import { TabSelectingEventArgs } from '@syncfusion/ej2-angular-ribbon';

@Component({
  imports: [ RibbonModule ],
  standalone: true,
  selector: "app-root",
  template: `
    <ejs-ribbon id="ribbon" (tabSelecting)="onTabSelecting($event)">
      <e-ribbon-tabs>
        <e-ribbon-tab header="Home"></e-ribbon-tab>
        <e-ribbon-tab header="Insert"></e-ribbon-tab>
      </e-ribbon-tabs>
    </ejs-ribbon>
  `
})
export class AppComponent {
  public onTabSelecting(args: TabSelectingEventArgs) {
    console.log("About to select tab:", args.element?.innerText);
    
    // Example: Prevent selection of certain tabs
    if (args.element?.innerText?.includes("Insert")) {
      args.cancel = true;  // Cancel tab selection
      console.log("Insert tab selection blocked");
    }
  }
}
```

## Ribbon Expand/Collapse Events

### ribbonCollapsing Event

Triggered **before** the ribbon is collapsed. Can be canceled.

```typescript
import { Component } from "@angular/core";
import { RibbonModule } from '@syncfusion/ej2-angular-ribbon';
import { ExpandCollapseEventArgs } from '@syncfusion/ej2-angular-ribbon';

@Component({
  imports: [ RibbonModule ],
  standalone: true,
  selector: "app-root",
  template: `
    <ejs-ribbon id="ribbon" (ribbonCollapsing)="onRibbonCollapsing($event)">
      <e-ribbon-tabs>
        <e-ribbon-tab header="Home">
          <e-ribbon-groups>
            <e-ribbon-group header="Clipboard">
              <e-ribbon-collections>
                <e-ribbon-collection>
                  <e-ribbon-items>
                    <e-ribbon-item type="Button" [buttonSettings]="pasteButton"></e-ribbon-item>
                  </e-ribbon-items>
                </e-ribbon-collection>
              </e-ribbon-collections>
            </e-ribbon-group>
          </e-ribbon-groups>
        </e-ribbon-tab>
      </e-ribbon-tabs>
    </ejs-ribbon>
  `
})
export class AppComponent {
  public pasteButton = { iconCss: "e-icons e-paste", content: "Paste" };
  
  public onRibbonCollapsing(args: ExpandCollapseEventArgs) {
    console.log("Ribbon collapsing...");
    
    // Perform cleanup or save state before collapse
    // args.cancel = true;  // Prevent collapse if needed
  }
}
```

### ribbonExpanded Event

Triggered **after** the ribbon is expanded.

```typescript
import { Component } from "@angular/core";
import { RibbonModule } from '@syncfusion/ej2-angular-ribbon';
import { ExpandCollapseEventArgs } from '@syncfusion/ej2-angular-ribbon';

@Component({
  imports: [ RibbonModule ],
  standalone: true,
  selector: "app-root",
  template: `
    <ejs-ribbon id="ribbon" (ribbonExpanded)="onRibbonExpanded($event)">
      <e-ribbon-tabs>
        <e-ribbon-tab header="Home">
          <e-ribbon-groups>
            <e-ribbon-group header="Clipboard">
              <e-ribbon-collections>
                <e-ribbon-collection>
                  <e-ribbon-items>
                    <e-ribbon-item type="Button" [buttonSettings]="pasteButton"></e-ribbon-item>
                  </e-ribbon-items>
                </e-ribbon-collection>
              </e-ribbon-collections>
            </e-ribbon-group>
          </e-ribbon-groups>
        </e-ribbon-tab>
      </e-ribbon-tabs>
    </ejs-ribbon>
  `
})
export class AppComponent {
  public pasteButton = { iconCss: "e-icons e-paste", content: "Paste" };
  
  public onRibbonExpanded(args: ExpandCollapseEventArgs) {
    console.log("Ribbon expanded");
    // Load additional resources or update UI
  }
}
```

## Launcher Icon Events

### launcherClick Event

Triggered when the launcher icon in a group is clicked.

```typescript
import { Component } from "@angular/core";
import { RibbonModule } from '@syncfusion/ej2-angular-ribbon';
import { LauncherClickEventArgs } from '@syncfusion/ej2-angular-ribbon';

@Component({
  imports: [ RibbonModule ],
  standalone: true,
  selector: "app-root",
  template: `
    <ejs-ribbon id="ribbon" (launcherClick)="onLauncherClick($event)">
      <e-ribbon-tabs>
        <e-ribbon-tab header="Home">
          <e-ribbon-groups>
            <e-ribbon-group header="Font" 
              id="font-group"
              [showLauncherIcon]="true" 
              groupIconCss="e-icons e-bold">
              <e-ribbon-collections>
                <e-ribbon-collection>
                  <e-ribbon-items>
                    <e-ribbon-item type="Button" [buttonSettings]="boldButton"></e-ribbon-item>
                  </e-ribbon-items>
                </e-ribbon-collection>
              </e-ribbon-collections>
            </e-ribbon-group>
          </e-ribbon-groups>
        </e-ribbon-tab>
      </e-ribbon-tabs>
    </ejs-ribbon>
  `
})
export class AppComponent {
  public boldButton = { iconCss: "e-icons e-bold", content: "Bold" };
  
  public onLauncherClick(args: LauncherClickEventArgs) {
    console.log("Launcher clicked for group:", args.groupId);
    // Open advanced font settings dialog
    if (args.groupId === "font-group") {
      console.log("Opening Font settings dialog...");
    }
  }
}
```

## Overflow Popup Events

### overflowPopupOpen Event

Triggered before the overflow popup menu opens.

```typescript
import { Component } from "@angular/core";
import { RibbonModule } from '@syncfusion/ej2-angular-ribbon';
import { OverflowPopupEventArgs } from '@syncfusion/ej2-angular-ribbon';

@Component({
  imports: [ RibbonModule ],
  standalone: true,
  selector: "app-root",
  template: `
    <ejs-ribbon id="ribbon" (overflowPopupOpen)="onOverflowOpen($event)">
      <e-ribbon-tabs>
        <e-ribbon-tab header="Home">
          <e-ribbon-groups>
            <e-ribbon-group header="Clipboard" [enableGroupOverflow]="true">
              <e-ribbon-collections>
                <e-ribbon-collection>
                  <e-ribbon-items>
                    <e-ribbon-item type="Button" [buttonSettings]="pasteButton"></e-ribbon-item>
                  </e-ribbon-items>
                </e-ribbon-collection>
              </e-ribbon-collections>
            </e-ribbon-group>
          </e-ribbon-groups>
        </e-ribbon-tab>
      </e-ribbon-tabs>
    </ejs-ribbon>
  `
})
export class AppComponent {
  public pasteButton = { iconCss: "e-icons e-paste", content: "Paste" };
  
  public onOverflowOpen(args: OverflowPopupEventArgs) {
    console.log("Overflow popup opening", args);
    // args.cancel = true;  // Cancel popup opening if needed
  }
}
```

### overflowPopupClose Event

Triggered before the overflow popup menu closes.

```typescript
public onOverflowClose(args: OverflowPopupEventArgs) {
  console.log("Overflow popup closing", args);
  // args.cancel = true;  // Prevent popup from closing
}
```

## Layout Switch Events

### layoutSwitched Event

Triggered when the ribbon layout is switched between Classic and Simplified.

```typescript
import { Component } from "@angular/core";
import { RibbonModule } from '@syncfusion/ej2-angular-ribbon';
import { LayoutSwitchedEventArgs, RibbonLayout } from '@syncfusion/ej2-angular-ribbon';

@Component({
  imports: [ RibbonModule ],
  standalone: true,
  selector: "app-root",
  template: `
    <ejs-ribbon id="ribbon" 
      [activeLayout]="activeLayout"
      (layoutSwitched)="onLayoutSwitched($event)">
      <e-ribbon-tabs>
        <e-ribbon-tab header="Home">
          <e-ribbon-groups>
            <e-ribbon-group header="Clipboard">
              <e-ribbon-collections>
                <e-ribbon-collection>
                  <e-ribbon-items>
                    <e-ribbon-item type="Button" [buttonSettings]="pasteButton"></e-ribbon-item>
                  </e-ribbon-items>
                </e-ribbon-collection>
              </e-ribbon-collections>
            </e-ribbon-group>
          </e-ribbon-groups>
        </e-ribbon-tab>
      </e-ribbon-tabs>
    </ejs-ribbon>
  `
})
export class AppComponent {
  public activeLayout = RibbonLayout.Classic;
  public pasteButton = { iconCss: "e-icons e-paste", content: "Paste" };
  
  public onLayoutSwitched(args: LayoutSwitchedEventArgs) {
    console.log("Layout switched to:", args.activeLayout);
    console.log("Event:", args.event);
    
    // Save user preference
    if (args.activeLayout === "Classic") {
      localStorage.setItem("ribbonLayout", "classic");
    } else if (args.activeLayout === "Simplified") {
      localStorage.setItem("ribbonLayout", "simplified");
    }
  }
}
```

## Backstage Events

### backstageItemClick Event

Triggered when a backstage item is clicked.

```typescript
import { Component } from "@angular/core";
import { RibbonModule, RibbonBackstageService } from '@syncfusion/ej2-angular-ribbon';
import { BackStageMenuModel, BackstageItemModel } from '@syncfusion/ej2-angular-ribbon';
import { BackstageItemClickEventArgs } from '@syncfusion/ej2-ribbon';

@Component({
  imports: [ RibbonModule ],
  providers: [ RibbonBackstageService ],
  standalone: true,
  selector: "app-root",
  template: `
    <ejs-ribbon id="ribbon" [backStageMenu]="backstageSettings" (backStageItemClick)="onBackstageItemClick($event)">
      <e-ribbon-tabs>
        <e-ribbon-tab header="Home">
          <e-ribbon-groups>
            <e-ribbon-group header="Clipboard">
              <e-ribbon-collections>
                <e-ribbon-collection>
                  <e-ribbon-items>
                    <e-ribbon-item type="Button" [buttonSettings]="pasteButton"></e-ribbon-item>
                  </e-ribbon-items>
                </e-ribbon-collection>
              </e-ribbon-collections>
            </e-ribbon-group>
          </e-ribbon-groups>
        </e-ribbon-tab>
      </e-ribbon-tabs>
    </ejs-ribbon>
  `
})
export class AppComponent {
  public pasteButton = { iconCss: "e-icons e-paste", content: "Paste" };
  
  public menuItems: BackstageItemModel[] = [
    { id: "new", text: "New", iconCss: "e-icons e-file-new", content: "<div style='padding: 20px;'>New Document</div>" },
    { id: "open", text: "Open", iconCss: "e-icons e-folder-open", content: "<div style='padding: 20px;'>Open Document</div>" },
    { id: "save", text: "Save", iconCss: "e-icons e-save", content: "<div style='padding: 20px;'>Save Document</div>" }
  ];
  
  public backstageSettings: BackStageMenuModel = {
    text: "File",
    visible: true,
    items: this.menuItems,
    backButton: { text: "Close" }
  };
  
  public onBackstageItemClick(args: BackstageItemClickEventArgs) {
    console.log("Backstage item clicked:", args.item?.id);
    
    switch (args.item?.id) {
      case "new":
        console.log("Creating new document...");
        break;
      case "open":
        console.log("Opening document...");
        break;
      case "save":
        console.log("Saving document...");
        break;
    }
  }
}
```

## Event Arguments

### Common Event Properties

| Property | Type | Description |
|----------|------|-------------|
| `element` | HTMLElement | The DOM element that triggered the event |
| `preventDefault()` | Function | Cancel the event action |
| `cancel` | boolean | Set to true to cancel the event |

### Tab Event Arguments (TabSelectedEventArgs, TabSelectingEventArgs)

```typescript
public onTabSelected(args: TabSelectedEventArgs) {
  console.log("Selected element:", args.element);
  console.log("Event type:", args.type);
  console.log("Name:", args.name);
}
```

### Expand/Collapse Event Arguments (ExpandCollapseEventArgs)

```typescript
public onRibbonCollapsing(args: ExpandCollapseEventArgs) {
  console.log("Collapsing state:", args.isExpanded);
  if (args.cancel) {
    console.log("Event was canceled");
  }
}
```

## Event Handling Patterns

### Pattern 1: Tab-Based Command Loading

Load different commands based on active tab:

```typescript
public onTabSelected(args: TabSelectedEventArgs) {
  const tabText = args.element?.innerText;
  
  if (tabText?.includes("Insert")) {
    this.loadInsertCommands();
  } else if (tabText?.includes("Format")) {
    this.loadFormatCommands();
  }
}

public loadInsertCommands() {
  console.log("Loading insert commands...");
  // Fetch and populate insert options
}

public loadFormatCommands() {
  console.log("Loading format commands...");
  // Fetch and populate format options
}
```

### Pattern 2: State Persistence

Save ribbon state for user preferences:

```typescript
public onTabSelected(args: TabSelectedEventArgs) {
  const activeTab = args.element?.getAttribute('data-tab-id');
  localStorage.setItem('lastActiveTab', activeTab || '');
}

public onRibbonCollapsing(args: ExpandCollapseEventArgs) {
  localStorage.setItem('ribbonCollapsed', 'true');
}
```

Restore on component initialization:

```typescript
public ngOnInit() {
  const lastTab = localStorage.getItem('lastActiveTab');
  const wasCollapsed = localStorage.getItem('ribbonCollapsed') === 'true';
  
  if (wasCollapsed) {
    // Collapse ribbon on load
  }
}
```

### Pattern 3: Validation Before Tab Switch

Prevent unsaved data loss:

```typescript
public onTabSelecting(args: TabSelectingEventArgs) {
  if (this.hasUnsavedChanges) {
    args.cancel = true;
    
    this.showConfirmDialog().then(confirmed => {
      if (confirmed) {
        this.saveChanges().then(() => {
          // Allow tab switch
          args.cancel = false;
        });
      }
    });
  }
}

private hasUnsavedChanges = false;
```

## Complete Event Example

```typescript
import { Component } from "@angular/core";
import { RibbonModule, RibbonBackstageService } from '@syncfusion/ej2-angular-ribbon';
import { BackStageMenuModel, BackstageItemModel } from '@syncfusion/ej2-angular-ribbon';
import { TabSelectedEventArgs, TabSelectingEventArgs, ExpandCollapseEventArgs, LauncherClickEventArgs, OverflowPopupEventArgs, LayoutSwitchedEventArgs } from '@syncfusion/ej2-angular-ribbon';

@Component({
  imports: [ RibbonModule ],
  providers: [ RibbonBackstageService ],
  standalone: true,
  selector: "app-root",
  template: `
    <div>
      <div style="margin: 10px;">
        <strong>Last Action:</strong> {{ lastAction }}
      </div>
      
      <ejs-ribbon id="ribbon" 
        [backStageMenu]="backstageSettings"
        (tabSelected)="onTabSelected($event)"
        (tabSelecting)="onTabSelecting($event)"
        (ribbonCollapsing)="onRibbonCollapsing($event)"
        (ribbonExpanded)="onRibbonExpanded($event)"
        (launcherClick)="onLauncherClick($event)"
        (overflowPopupOpen)="onOverflowOpen($event)"
        (overflowPopupClose)="onOverflowClose($event)"
        (layoutSwitched)="onLayoutSwitched($event)"
        (backStageItemClick)="onBackstageItemClick($event)">
        
        <e-ribbon-tabs>
          <e-ribbon-tab header="Home">
            <e-ribbon-groups>
              <e-ribbon-group header="Clipboard">
                <e-ribbon-collections>
                  <e-ribbon-collection>
                    <e-ribbon-items>
                      <e-ribbon-item type="Button" [buttonSettings]="pasteButton"></e-ribbon-item>
                    </e-ribbon-items>
                  </e-ribbon-collection>
                </e-ribbon-collections>
              </e-ribbon-group>
            </e-ribbon-groups>
          </e-ribbon-tab>
          
          <e-ribbon-tab header="Insert">
            <e-ribbon-groups>
              <e-ribbon-group header="Tables">
                <e-ribbon-collections>
                  <e-ribbon-collection>
                    <e-ribbon-items>
                      <e-ribbon-item type="Button" [buttonSettings]="tableButton"></e-ribbon-item>
                    </e-ribbon-items>
                  </e-ribbon-collection>
                </e-ribbon-collections>
              </e-ribbon-group>
            </e-ribbon-groups>
          </e-ribbon-tab>
        </e-ribbon-tabs>
      </ejs-ribbon>
    </div>
  `,
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public lastAction = "None";
  
  public pasteButton = { iconCss: "e-icons e-paste", content: "Paste" };
  public tableButton = { iconCss: "e-icons e-table", content: "Table" };
  
  public menuItems: BackstageItemModel[] = [
    { id: "new", text: "New", iconCss: "e-icons e-file-new", content: "<div style='padding: 20px;'>New Document</div>" },
    { id: "open", text: "Open", iconCss: "e-icons e-folder-open", content: "<div style='padding: 20px;'>Open Document</div>" }
  ];
  
  public backstageSettings: BackStageMenuModel = {
    text: "File",
    visible: true,
    items: this.menuItems,
    backButton: { text: "Close" }
  };
  
  public onTabSelected(args: TabSelectedEventArgs) {
    this.lastAction = `Tab selected: ${args.element?.innerText}`;
    console.log("Tab selected event fired", args);
  }
  
  public onTabSelecting(args: TabSelectingEventArgs) {
    this.lastAction = `Tab selecting: ${args.element?.innerText}`;
    console.log("Tab selecting event fired", args);
  }
  
  public onRibbonCollapsing(args: ExpandCollapseEventArgs) {
    this.lastAction = "Ribbon collapsing";
    console.log("Ribbon collapsing event fired", args);
  }
  
  public onRibbonExpanded(args: ExpandCollapseEventArgs) {
    this.lastAction = "Ribbon expanded";
    console.log("Ribbon expanded event fired", args);
  }
  
  public onLauncherClick(args: LauncherClickEventArgs) {
    this.lastAction = `Launcher clicked: ${args.groupId}`;
    console.log("Launcher click event fired", args);
  }
  
  public onOverflowOpen(args: OverflowPopupEventArgs) {
    this.lastAction = "Overflow popup opening";
    console.log("Overflow popup open event fired", args);
  }
  
  public onOverflowClose(args: OverflowPopupEventArgs) {
    this.lastAction = "Overflow popup closing";
    console.log("Overflow popup close event fired", args);
  }
  
  public onLayoutSwitched(args: LayoutSwitchedEventArgs) {
    this.lastAction = `Layout switched to: ${args.activeLayout}`;
    console.log("Layout switched event fired", args);
  }
  
  public onBackstageItemClick(args: any) {
    this.lastAction = `Backstage item clicked: ${args.item?.id}`;
    console.log("Backstage item click event fired", args);
  }
}
```

---
