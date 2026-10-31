# Advanced Scenarios

## Table of Contents
- [Nested Tabs](#nested-tabs)
- [Collapsible Tabs](#collapsible-tabs)
- [Wizard Pattern](#wizard-pattern)
- [State Persistence](#state-persistence)
- [Component Integration](#component-integration)

## Nested Tabs

Create multiple levels of tabbed content:

### Basic Nested Tabs

```typescript
import { Component } from '@angular/core';
import { TabModule } from '@syncfusion/ej2-angular-navigations';

@Component({
  imports: [TabModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <ejs-tab id="parent-tab">
      <e-tabitems>
        <!-- Parent Tab 1 with nested tabs -->
        <e-tabitem [header]="{ text: 'Home' }">
          <ng-template #content>
            <ejs-tab id="nested-tab-1">
              <e-tabitems>
                <e-tabitem [header]="{ text: 'Overview' }" 
                           content="Home overview content"></e-tabitem>
                <e-tabitem [header]="{ text: 'Details' }" 
                           content="Home details content"></e-tabitem>
              </e-tabitems>
            </ejs-tab>
          </ng-template>
        </e-tabitem>

        <!-- Parent Tab 2 with nested tabs -->
        <e-tabitem [header]="{ text: 'Settings' }">
          <ng-template #content>
            <ejs-tab id="nested-tab-2">
              <e-tabitems>
                <e-tabitem [header]="{ text: 'General' }" 
                           content="General settings"></e-tabitem>
                <e-tabitem [header]="{ text: 'Advanced' }" 
                           content="Advanced settings"></e-tabitem>
                <e-tabitem [header]="{ text: 'Security' }" 
                           content="Security settings"></e-tabitem>
              </e-tabitems>
            </ejs-tab>
          </ng-template>
        </e-tabitem>

        <!-- Parent Tab 3 -->
        <e-tabitem [header]="{ text: 'About' }" content="About content"></e-tabitem>
      </e-tabitems>
    </ejs-tab>
  `
})
export class AppComponent { }
```

### Three-Level Nesting

```typescript
<ejs-tab id="level-1">
  <e-tabitems>
    <e-tabitem [header]="{ text: 'Products' }">
      <ng-template #content>
        <!-- Level 2 -->
        <ejs-tab id="level-2">
          <e-tabitems>
            <e-tabitem [header]="{ text: 'Electronics' }">
              <ng-template #content>
                <!-- Level 3 -->
                <ejs-tab id="level-3">
                  <e-tabitems>
                    <e-tabitem [header]="{ text: 'Phones' }" 
                               content="Phones content"></e-tabitem>
                    <e-tabitem [header]="{ text: 'Tablets' }" 
                               content="Tablets content"></e-tabitem>
                  </e-tabitems>
                </ejs-tab>
              </ng-template>
            </e-tabitem>
            <e-tabitem [header]="{ text: 'Clothing' }" 
                       content="Clothing content"></e-tabitem>
          </e-tabitems>
        </ejs-tab>
      </ng-template>
    </e-tabitem>
  </e-tabitems>
</ejs-tab>
```

### Dynamic Nested Tab Initialization

```typescript
import { Component, ViewChild } from '@angular/core';
import { TabModule, TabComponent, SelectEventArgs } from '@syncfusion/ej2-angular-navigations';

@Component({
  imports: [TabModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <ejs-tab #parentTab (selected)="onParentTabSelected($event)">
      <e-tabitems>
        <e-tabitem [header]="{ text: 'Documents' }">
          <ng-template #content>
            <ejs-tab #nestedTab1 id="nested-1"></ejs-tab>
          </ng-template>
        </e-tabitem>
        <e-tabitem [header]="{ text: 'Images' }">
          <ng-template #content>
            <ejs-tab #nestedTab2 id="nested-2"></ejs-tab>
          </ng-template>
        </e-tabitem>
      </e-tabitems>
    </ejs-tab>
  `
})
export class AppComponent {
  @ViewChild('parentTab') parentTab?: TabComponent;
  @ViewChild('nestedTab1') nestedTab1?: TabComponent;
  @ViewChild('nestedTab2') nestedTab2?: TabComponent;

  onParentTabSelected(args: SelectEventArgs) {
    // Initialize nested tabs on demand
    if (args.selectedIndex === 0) {
      this.initializeDocumentTabs();
    } else if (args.selectedIndex === 1) {
      this.initializeImageTabs();
    }
  }

  private initializeDocumentTabs() {
    if (this.nestedTab1) {
      (this.nestedTab1 as TabComponent).items = [
        { header: { text: 'Word' }, content: 'Word documents' },
        { header: { text: 'PDF' }, content: 'PDF documents' },
        { header: { text: 'Excel' }, content: 'Excel files' }
      ];
    }
  }

  private initializeImageTabs() {
    if (this.nestedTab2) {
      (this.nestedTab2 as TabComponent).items = [
        { header: { text: 'JPG' }, content: 'JPG images' },
        { header: { text: 'PNG' }, content: 'PNG images' },
        { header: { text: 'GIF' }, content: 'GIF images' }
      ];
    }
  }
}
```

## Collapsible Tabs

Create accordion-like collapse/expand functionality:

### Collapsible Tab Implementation

```typescript
import { Component, ViewChild } from '@angular/core';
import { TabModule, TabComponent, SelectEventArgs } from '@syncfusion/ej2-angular-navigations';
import { CommonModule } from '@angular/common';

@Component({
  imports: [TabModule, CommonModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <style>
      .collapsed { display: none; }
    </style>

    <ejs-tab #tabObj (created)="onTabCreated()" (selected)="onTabSelected($event)">
      <e-tabitems>
        <e-tabitem [header]="{ text: 'Section 1' }">
          <ng-template #content>
            <div class="content">Content for section 1</div>
          </ng-template>
        </e-tabitem>
        <e-tabitem [header]="{ text: 'Section 2' }">
          <ng-template #content>
            <div class="content">Content for section 2</div>
          </ng-template>
        </e-tabitem>
        <e-tabitem [header]="{ text: 'Section 3' }">
          <ng-template #content>
            <div class="content">Content for section 3</div>
          </ng-template>
        </e-tabitem>
      </e-tabitems>
    </ejs-tab>
  `
})
export class AppComponent {
  @ViewChild('tabObj') tabObj?: TabComponent;
  private expandedIndex = 0;

  onTabCreated() {
    // Initially collapse all except first
    const contentElements = document.querySelectorAll('.e-content .e-item');
    contentElements.forEach((elem, index) => {
      if (index !== this.expandedIndex) {
        elem.classList.add('collapsed');
      }
    });
  }

  onTabSelected(args: SelectEventArgs) {
    const contentElements = document.querySelectorAll('.e-content .e-item');
    
    // Collapse previously expanded
    if (this.expandedIndex < contentElements.length) {
      contentElements[this.expandedIndex].classList.add('collapsed');
    }

    // Expand selected
    contentElements[args.selectedIndex!].classList.remove('collapsed');
    this.expandedIndex = args.selectedIndex!;
  }
}
```

### Smooth Collapse/Expand with Animation

```css
.e-content .e-item {
  max-height: 500px;
  overflow: hidden;
  transition: max-height 0.3s ease-out;
}

.e-content .e-item.collapsed {
  max-height: 0;
  overflow: hidden;
}
```

## Wizard Pattern

Create multi-step wizard using tabs:

### Basic Wizard

```typescript
import { Component, ViewChild } from '@angular/core';
import { TabModule, TabComponent, SelectingEventArgs } from '@syncfusion/ej2-angular-navigations';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  imports: [TabModule, ReactiveFormsModule, CommonModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <div style="margin: 20px;">
      <ejs-tab #wizardTab (selecting)="onTabSelecting($event)">
        <e-tabitems>
          <!-- Step 1: Personal Information -->
          <e-tabitem [header]="{ text: 'Step 1: Personal' }">
            <ng-template #content>
              <form [formGroup]="step1Form" style="padding: 20px;">
                <div style="margin: 10px 0;">
                  <label>Name:</label>
                  <input type="text" formControlName="name" />
                  <span *ngIf="step1Form.get('name')?.hasError('required')" 
                        style="color: red;">Name required</span>
                </div>
                <div style="margin: 10px 0;">
                  <label>Email:</label>
                  <input type="email" formControlName="email" />
                  <span *ngIf="step1Form.get('email')?.hasError('email')" 
                        style="color: red;">Valid email required</span>
                </div>
              </form>
            </ng-template>
          </e-tabitem>

          <!-- Step 2: Address -->
          <e-tabitem [header]="{ text: 'Step 2: Address' }">
            <ng-template #content>
              <form [formGroup]="step2Form" style="padding: 20px;">
                <div style="margin: 10px 0;">
                  <label>Street:</label>
                  <input type="text" formControlName="street" />
                </div>
                <div style="margin: 10px 0;">
                  <label>City:</label>
                  <input type="text" formControlName="city" />
                </div>
              </form>
            </ng-template>
          </e-tabitem>

          <!-- Step 3: Confirmation -->
          <e-tabitem [header]="{ text: 'Step 3: Confirm' }">
            <ng-template #content>
              <div style="padding: 20px;">
                <h3>Confirm Your Information</h3>
                <p><strong>Name:</strong> {{ step1Form.get('name')?.value }}</p>
                <p><strong>Email:</strong> {{ step1Form.get('email')?.value }}</p>
                <p><strong>Address:</strong> {{ step2Form.get('street')?.value }}, 
                   {{ step2Form.get('city')?.value }}</p>
                <button (click)="submitWizard()">Submit</button>
              </div>
            </ng-template>
          </e-tabitem>
        </e-tabitems>
      </ejs-tab>

      <div style="margin: 20px;">
        <button (click)="previousStep()" [disabled]="currentStep === 0">Previous</button>
        <button (click)="nextStep()" [disabled]="currentStep === 2">Next</button>
      </div>
    </div>
  `
})
export class AppComponent {
  @ViewChild('wizardTab') wizardTab?: TabComponent;
  
  public currentStep = 0;
  public step1Form!: FormGroup;
  public step2Form!: FormGroup;

  constructor(private fb: FormBuilder) {
    this.step1Form = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });

    this.step2Form = this.fb.group({
      street: ['', Validators.required],
      city: ['', Validators.required]
    });
  }

  onTabSelecting(args: SelectingEventArgs) {
    // Validate current step before allowing navigation
    if (args.selectedIndex! > this.currentStep) {
      if (!this.validateCurrentStep()) {
        args.cancel = true;
      }
    }
    this.currentStep = args.selectedIndex!;
  }

  private validateCurrentStep(): boolean {
    if (this.currentStep === 0) {
      return this.step1Form.valid;
    } else if (this.currentStep === 1) {
      return this.step2Form.valid;
    }
    return true;
  }

  previousStep() {
    if (this.currentStep > 0) {
      (this.wizardTab as TabComponent).select(this.currentStep - 1);
    }
  }

  nextStep() {
    if (this.validateCurrentStep() && this.currentStep < 2) {
      (this.wizardTab as TabComponent).select(this.currentStep + 1);
    }
  }

  submitWizard() {
    if (this.step1Form.valid && this.step2Form.valid) {
      const data = {
        personal: this.step1Form.value,
        address: this.step2Form.value
      };
      console.log('Wizard submission:', data);
      // Send to server
    }
  }
}
```

## State Persistence

Save and restore tab state across sessions:

### LocalStorage Persistence

```typescript
import { Component, ViewChild, OnInit } from '@angular/core';
import { TabModule, TabComponent, SelectEventArgs } from '@syncfusion/ej2-angular-navigations';

@Component({
  imports: [TabModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <ejs-tab #tabObj (selected)="onTabSelected($event)">
      <e-tabitems>
        <e-tabitem [header]="{ text: 'Tab 1' }" content="Content 1"></e-tabitem>
        <e-tabitem [header]="{ text: 'Tab 2' }" content="Content 2"></e-tabitem>
        <e-tabitem [header]="{ text: 'Tab 3' }" content="Content 3"></e-tabitem>
      </e-tabitems>
    </ejs-tab>
  `
})
export class AppComponent implements OnInit {
  @ViewChild('tabObj') tabObj?: TabComponent;

  ngOnInit() {
    this.restoreTabState();
  }

  onTabSelected(args: SelectEventArgs) {
    // Save selected index
    localStorage.setItem('selectedTabIndex', args.selectedIndex!.toString());
  }

  private restoreTabState() {
    const savedIndex = localStorage.getItem('selectedTabIndex');
    if (savedIndex) {
      setTimeout(() => {
        (this.tabObj as TabComponent).select(parseInt(savedIndex, 10));
      }, 0);
    }
  }
}
```

### SessionStorage with Full State

```typescript
import { Component, OnInit, ViewChild } from '@angular/core';
import { TabModule, TabComponent, SelectEventArgs } from '@syncfusion/ej2-angular-navigations';

interface TabState {
  selectedIndex: number;
  tabs: object[];
  timestamp: number;
}

@Component({
  imports: [TabModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <ejs-tab #tabObj (selected)="onTabSelected($event)">
      <e-tabitems>
        <e-tabitem [header]="{ text: 'Favorites' }"></e-tabitem>
        <e-tabitem [header]="{ text: 'Recent' }"></e-tabitem>
        <e-tabitem [header]="{ text: 'Archived' }"></e-tabitem>
      </e-tabitems>
    </ejs-tab>
  `
})
export class AppComponent implements OnInit {
  @ViewChild('tabObj') tabObj?: TabComponent;

  ngOnInit() {
    this.restoreState();
  }

  onTabSelected(args: SelectEventArgs) {
    this.saveState();
  }

  private saveState() {
    const tab = this.tabObj as TabComponent;
    const state: TabState = {
      selectedIndex: tab.selectedIndex!,
      tabs: tab.items || [],
      timestamp: Date.now()
    };

    sessionStorage.setItem('tabState', JSON.stringify(state));
  }

  private restoreState() {
    const saved = sessionStorage.getItem('tabState');
    if (saved) {
      const state: TabState = JSON.parse(saved);
      
      // Check if state is not too old (1 hour)
      if (Date.now() - state.timestamp < 3600000) {
        setTimeout(() => {
          const tab = this.tabObj as TabComponent;
          if (state.tabs.length > 0) {
            tab.items = state.tabs;
          }
          tab.select(state.selectedIndex);
        }, 0);
      }
    }
  }
}
```

## Component Integration

Integrate complex Angular components inside tabs:

### Grid Inside Tab

```typescript
import { Component } from '@angular/core';
import { TabModule } from '@syncfusion/ej2-angular-navigations';
import { GridAllModule } from '@syncfusion/ej2-angular-grids';

@Component({
  imports: [TabModule, GridAllModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <ejs-tab>
      <e-tabitems>
        <e-tabitem [header]="{ text: 'Orders' }">
          <ng-template #content>
            <ejs-grid id="grid" [dataSource]="orderData">
              <e-columns>
                <e-column field="OrderID" headerText="Order ID" width="150"></e-column>
                <e-column field="CustomerName" headerText="Customer Name" width="150"></e-column>
                <e-column field="TotalAmount" headerText="Total" width="120"></e-column>
              </e-columns>
            </ejs-grid>
          </ng-template>
        </e-tabitem>
      </e-tabitems>
    </ejs-tab>
  `
})
export class AppComponent {
  public orderData: object[] = [
    { OrderID: 10248, CustomerName: 'John', TotalAmount: 500 },
    { OrderID: 10249, CustomerName: 'Jane', TotalAmount: 750 },
    { OrderID: 10250, CustomerName: 'Bob', TotalAmount: 600 }
  ];
}
```

### Form and Calendar Integration

```typescript
import { Component } from '@angular/core';
import { TabModule } from '@syncfusion/ej2-angular-navigations';
import { CalendarAllModule } from '@syncfusion/ej2-angular-calendars';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  imports: [TabModule, CalendarAllModule, FormsModule, ReactiveFormsModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <ejs-tab>
      <e-tabitems>
        <e-tabitem [header]="{ text: 'Event Registration' }">
          <ng-template #content>
            <form style="padding: 20px;">
              <div>
                <label>Name:</label>
                <input type="text" />
              </div>
              <div>
                <label>Event Date:</label>
                <ejs-calendar [(value)]="selectedDate"></ejs-calendar>
              </div>
            </form>
          </ng-template>
        </e-tabitem>
      </e-tabitems>
    </ejs-tab>
  `
})
export class AppComponent {
  public selectedDate: Date = new Date();
}
```

## Best Practices for Advanced Scenarios

1. **Nested Tabs:** Limit nesting to 2-3 levels for usability
2. **Wizard:** Validate each step before proceeding
3. **State Persistence:** Use appropriate storage (localStorage vs sessionStorage)
4. **Complex Components:** Load on demand (Dynamic mode) to improve performance
5. **Memory Management:** Unsubscribe from observables in ngOnDestroy
6. **Accessibility:** Maintain proper focus management in nested structures
