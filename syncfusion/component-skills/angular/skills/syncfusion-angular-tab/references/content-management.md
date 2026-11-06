# Content Management & Data Integration

## Table of Contents
- [Overview](#overview)
- [DataSource Binding](#datasource-binding)
- [Dynamic Tab Operations](#dynamic-tab-operations)
- [AJAX Content Loading](#ajax-content-loading)
- [Reactive Forms in Tabs](#reactive-forms-in-tabs)
- [Content Reuse with TemplateRef](#content-reuse-with-templateref)
- [Show/Hide Tabs](#showhide-tabs)

## Overview

The Tab component provides multiple ways to manage and load content dynamically:
- Bind from data sources
- Add/remove tabs at runtime
- Load content via AJAX/server
- Use reactive forms with tabs
- Reuse templates efficiently
- Show/hide tabs programmatically

## DataSource Binding

Bind tab items directly from an array of objects:

### Basic DataSource Example

```typescript
import { Component } from '@angular/core';
import { TabModule } from '@syncfusion/ej2-angular-navigations';

@Component({
  imports: [TabModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <ejs-tab [items]="tabItems"></ejs-tab>
  `
})
export class AppComponent {
  public tabItems: object[] = [
    {
      header: { text: 'Home' },
      content: 'Welcome to home tab'
    },
    {
      header: { text: 'Settings' },
      content: 'Application settings and preferences'
    },
    {
      header: { text: 'About' },
      content: 'Information about this application'
    }
  ];
}
```

### DataSource with Icons

```typescript
public tabItems: object[] = [
  {
    header: { text: 'Dashboard', iconCss: 'e-icons e-home' },
    content: 'Dashboard content here'
  },
  {
    header: { text: 'Products', iconCss: 'e-icons e-shopping-cart' },
    content: 'Products content here'
  },
  {
    header: { text: 'Orders', iconCss: 'e-icons e-receipt' },
    content: 'Orders content here'
  }
];
```

### Dynamic DataSource from API

```typescript
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  imports: [TabModule, HttpClientModule],
  standalone: true,
  template: `<ejs-tab [items]="tabItems"></ejs-tab>`
})
export class AppComponent implements OnInit {
  public tabItems: object[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit() {
    // Load tabs from API
    this.http.get<object[]>('/api/tabs').subscribe(data => {
      this.tabItems = data;
    });
  }
}
```

## Dynamic Tab Operations

### Add Tabs at Runtime

The `addTab()` method adds new tabs at specified index:

```typescript
import { Component, ViewChild } from '@angular/core';
import { TabModule, TabComponent } from '@syncfusion/ej2-angular-navigations';
import { FormsModule } from '@angular/forms';

@Component({
  imports: [TabModule, FormsModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <div style="margin: 20px;">
      <button (click)="addTab()">Add Tab</button>
      <button (click)="removeTab()">Remove Last Tab</button>
    </div>
    <ejs-tab #tabObj>
      <e-tabitems>
        <e-tabitem [header]="{ text: 'Tab 1' }" content="Content 1"></e-tabitem>
        <e-tabitem [header]="{ text: 'Tab 2' }" content="Content 2"></e-tabitem>
      </e-tabitems>
    </ejs-tab>
  `
})
export class AppComponent {
  @ViewChild('tabObj') tabObj?: TabComponent;
  private tabCount = 2;

  addTab() {
    this.tabCount++;
    const newTab = {
      header: { text: `Tab ${this.tabCount}` },
      content: `Content for tab ${this.tabCount}`
    };
    // Add at end (last index)
    const lastIndex = this.tabObj!.items!.length;
    this.tabObj!.addTab([newTab], lastIndex);
  }

  removeTab() {
    const lastIndex = this.tabObj!.items!.length - 1;
    if (lastIndex >= 0) {
      this.tabObj!.removeTab(lastIndex);
      this.tabCount--;
    }
  }
}
```

### Add with Position

```typescript
// Add at specific index
const newTab = {
  header: { text: 'New Tab' },
  content: 'New content'
};
const insertIndex = 1;  // Insert at position 1
this.tabObj.addTab([newTab], insertIndex);

// Add multiple tabs at once
const newTabs = [
  { header: { text: 'Tab A' }, content: 'Content A' },
  { header: { text: 'Tab B' }, content: 'Content B' }
];
this.tabObj.addTab(newTabs, 2);
```

### Remove Tabs

```typescript
// Remove specific tab by index
this.tabObj.removeTab(1);

// Remove multiple tabs
for (let i = 0; i < 3; i++) {
  this.tabObj.removeTab(0);  // Always remove first
}

// Remove all tabs except first
while (this.tabObj.items!.length > 1) {
  this.tabObj.removeTab(1);
}
```

## AJAX Content Loading

Load tab content dynamically from server:

### Basic AJAX Loading

```typescript
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { TabModule } from '@syncfusion/ej2-angular-navigations';

@Component({
  imports: [TabModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <ejs-tab id="element">
      <e-tabitems>
        <e-tabitem [header]="{ text: 'Home' }">
          <ng-template #content>{{ homeContent }}</ng-template>
        </e-tabitem>
        <e-tabitem [header]="{ text: 'About' }">
          <ng-template #content>{{ aboutContent }}</ng-template>
        </e-tabitem>
        <e-tabitem [header]="{ text: 'Contact' }">
          <ng-template #content>{{ contactContent }}</ng-template>
        </e-tabitem>
      </e-tabitems>
    </ejs-tab>
  `
})
export class AppComponent implements OnInit {
  public homeContent = '';
  public aboutContent = '';
  public contactContent = '';

  constructor(private http: HttpClient) { }

  ngOnInit() {
    // Load content from server
    this.http.get('/api/content/home', { responseType: 'text' })
      .subscribe(data => this.homeContent = data);
    
    this.http.get('/api/content/about', { responseType: 'text' })
      .subscribe(data => this.aboutContent = data);
    
    this.http.get('/api/content/contact', { responseType: 'text' })
      .subscribe(data => this.contactContent = data);
  }
}
```

### Load on Tab Selection

Load content only when tab is selected:

```typescript
import { Component, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TabModule, TabComponent, SelectEventArgs } from '@syncfusion/ej2-angular-navigations';

@Component({
  imports: [TabModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <ejs-tab #tabObj (selected)="onTabSelected($event)">
      <e-tabitems>
        <e-tabitem [header]="{ text: 'Products' }">
          <ng-template #content>
            {{ productContent || 'Loading...' }}
          </ng-template>
        </e-tabitem>
        <e-tabitem [header]="{ text: 'Orders' }">
          <ng-template #content>
            {{ orderContent || 'Loading...' }}
          </ng-template>
        </e-tabitem>
      </e-tabitems>
    </ejs-tab>
  `
})
export class AppComponent {
  @ViewChild('tabObj') tabObj?: TabComponent;
  public productContent = '';
  public orderContent = '';
  private loadedTabs = new Set<number>();

  constructor(private http: HttpClient) { }

  onTabSelected(args: SelectEventArgs) {
    const index = args.selectedIndex!;
    
    // Load only if not already loaded (lazy load)
    if (!this.loadedTabs.has(index)) {
      if (index === 0) {
        this.http.get('/api/products', { responseType: 'text' })
          .subscribe(data => {
            this.productContent = data;
            this.loadedTabs.add(0);
          });
      } else if (index === 1) {
        this.http.get('/api/orders', { responseType: 'text' })
          .subscribe(data => {
            this.orderContent = data;
            this.loadedTabs.add(1);
          });
      }
    }
  }
}
```

## Reactive Forms in Tabs

Integrate Angular Reactive Forms with tabs:

### Complete Form Example

```typescript
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { TabModule } from '@syncfusion/ej2-angular-navigations';
import { CommonModule } from '@angular/common';

@Component({
  imports: [TabModule, ReactiveFormsModule, CommonModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <ejs-tab>
      <e-tabitems>
        <e-tabitem [header]="{ text: 'Personal Info' }">
          <ng-template #content>
            <form [formGroup]="personalForm">
              <div>
                <label>First Name:</label>
                <input type="text" formControlName="firstName" />
              </div>
              <div>
                <label>Last Name:</label>
                <input type="text" formControlName="lastName" />
              </div>
              <div>
                <label>Email:</label>
                <input type="email" formControlName="email" />
              </div>
            </form>
          </ng-template>
        </e-tabitem>
        <e-tabitem [header]="{ text: 'Address' }">
          <ng-template #content>
            <form [formGroup]="addressForm">
              <div>
                <label>Street:</label>
                <input type="text" formControlName="street" />
              </div>
              <div>
                <label>City:</label>
                <input type="text" formControlName="city" />
              </div>
              <div>
                <label>Country:</label>
                <input type="text" formControlName="country" />
              </div>
            </form>
          </ng-template>
        </e-tabitem>
        <e-tabitem [header]="{ text: 'Review' }">
          <ng-template #content>
            <div>
              <h3>Review Your Information</h3>
              <p><strong>Name:</strong> {{ personalForm.get('firstName')?.value }} 
                 {{ personalForm.get('lastName')?.value }}</p>
              <p><strong>Email:</strong> {{ personalForm.get('email')?.value }}</p>
              <p><strong>Address:</strong> {{ addressForm.get('street')?.value }}, 
                 {{ addressForm.get('city')?.value }}, {{ addressForm.get('country')?.value }}</p>
              <button (click)="submitForm()">Submit</button>
            </div>
          </ng-template>
        </e-tabitem>
      </e-tabitems>
    </ejs-tab>
  `
})
export class AppComponent implements OnInit {
  public personalForm!: FormGroup;
  public addressForm!: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.personalForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });

    this.addressForm = this.fb.group({
      street: ['', Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required]
    });
  }

  submitForm() {
    if (this.personalForm.valid && this.addressForm.valid) {
      const formData = {
        personal: this.personalForm.value,
        address: this.addressForm.value
      };
      console.log('Submit:', formData);
      // Send to server
    }
  }
}
```

## Content Reuse with TemplateRef

Efficiently reuse content templates across multiple tabs:

```typescript
import { Component, TemplateRef, ViewChild } from '@angular/core';
import { TabModule, TabComponent } from '@syncfusion/ej2-angular-navigations';
import { CommonModule } from '@angular/common';

@Component({
  imports: [TabModule, CommonModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <!-- Reusable content templates -->
    <ng-template #gridContent let-data>
      <div>
        <p>Grid showing data type: {{ data.type }}</p>
        <!-- Actual grid component would go here -->
      </div>
    </ng-template>

    <div style="margin: 20px;">
      <button (click)="addGridTab()">Add Grid Tab</button>
      <button (click)="addChartTab()">Add Chart Tab</button>
    </div>

    <ejs-tab #tabObj></ejs-tab>
  `
})
export class AppComponent {
  @ViewChild('tabObj') tabObj?: TabComponent;
  @ViewChild('gridContent') gridTemplate?: TemplateRef<any>;
  private tabCount = 0;

  addGridTab() {
    this.tabCount++;
    const newTab = {
      header: { text: `Grid ${this.tabCount}` },
      content: this.gridTemplate  // Reuse template
    };
    this.tabObj!.addTab([newTab], this.tabObj!.items!.length);
  }

  addChartTab() {
    this.tabCount++;
    const newTab = {
      header: { text: `Chart ${this.tabCount}` },
      content: '<div>Chart content</div>'
    };
    this.tabObj!.addTab([newTab], this.tabObj!.items!.length);
  }
}
```

## Show/Hide Tabs

Dynamically show and hide tabs:

### Hide Tab Example

```typescript
import { Component, ViewChild } from '@angular/core';
import { TabModule, TabComponent } from '@syncfusion/ej2-angular-navigations';

@Component({
  imports: [TabModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <div style="margin: 20px;">
      <button (click)="toggleTabVisibility(0, true)">Hide Tab 1</button>
      <button (click)="toggleTabVisibility(1, true)">Hide Tab 2</button>
      <button (click)="toggleTabVisibility(0, false)">Show Tab 1</button>
      <button (click)="toggleTabVisibility(1, false)">Show Tab 2</button>
    </div>

    <ejs-tab #tabObj>
      <e-tabitems>
        <e-tabitem [header]="{ text: 'Admin' }" content="Admin content"></e-tabitem>
        <e-tabitem [header]="{ text: 'Settings' }" content="Settings content"></e-tabitem>
        <e-tabitem [header]="{ text: 'User Profile' }" content="Profile content"></e-tabitem>
      </e-tabitems>
    </ejs-tab>
  `
})
export class AppComponent {
  @ViewChild('tabObj') tabObj?: TabComponent;

  // hideTab(index, true) - Hide tab
  // hideTab(index, false) - Show tab
  toggleTabVisibility(index: number, hide: boolean) {
    (this.tabObj as TabComponent).hideTab(index, hide);
  }
}
```

### Conditional Tab Visibility

```typescript
// Show/hide based on user permissions
export class AppComponent {
  @ViewChild('tabObj') tabObj?: TabComponent;
  public isAdmin = false;

  ngOnInit() {
    this.loadUserRole().then(role => {
      this.isAdmin = role === 'admin';
      
      if (!this.isAdmin) {
        // Hide admin tabs for non-admin users
        // hideTab(index, true) hides the tab
        (this.tabObj as TabComponent).hideTab(0, true);   // Admin tab
        (this.tabObj as TabComponent).hideTab(4, true);   // Settings tab
      }
    });
  }

  private loadUserRole() {
    // Load from API or auth service
    return Promise.resolve('user');
  }
}
```

## Key Takeaways

- **DataSource Binding:** Simple array-based approach for static and API-driven tabs
- **Dynamic Operations:** Add/remove tabs efficiently at runtime
- **AJAX Loading:** Load content from server on demand for performance
- **Reactive Forms:** Build complex multi-step forms within tabs
- **TemplateRef:** Reuse templates to reduce code duplication
- **Show/Hide:** Control visibility based on user role or conditions
