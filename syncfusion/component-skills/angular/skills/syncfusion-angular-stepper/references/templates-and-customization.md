# Templates and Customization in Angular Stepper

## Table of Contents
- [Custom Step Templates](#custom-step-templates)
- [Template Binding](#template-binding)
- [CSS Class Customization](#css-class-customization)
- [Layout Customization](#layout-customization)
- [Styling Patterns](#styling-patterns)

## Custom Step Templates

Use Angular's `<ng-template>` feature to create custom templates for steps. This allows flexible step content with components, forms, or any Angular elements.

### Basic Custom Template

```ts
import { Component } from "@angular/core";
import { StepperAllModule, StepperModule } from "@syncfusion/ej2-angular-navigations";
import { CommonModule } from "@angular/common";

@Component({
  imports: [ StepperAllModule, StepperModule, CommonModule ],
  standalone: true,
  selector: 'app-root',
  template: `
    <div class="template-example">
      <ejs-stepper>
        <e-steps>
          <e-step label="Step 1">
            <ng-template #template1>
              <div class="custom-content">
                <h3>Personal Information</h3>
                <form>
                  <input type="text" placeholder="Full Name">
                  <input type="email" placeholder="Email">
                </form>
              </div>
            </ng-template>
          </e-step>

          <e-step label="Step 2">
            <ng-template #template2>
              <div class="custom-content">
                <h3>Address Details</h3>
                <form>
                  <input type="text" placeholder="Street Address">
                  <input type="text" placeholder="City">
                  <input type="text" placeholder="Postal Code">
                </form>
              </div>
            </ng-template>
          </e-step>

          <e-step label="Step 3">
            <ng-template #template3>
              <div class="custom-content">
                <h3>Confirmation</h3>
                <p>Review your information above</p>
                <button class="confirm-btn">Confirm</button>
              </div>
            </ng-template>
          </e-step>
        </e-steps>
      </ejs-stepper>
    </div>
  `,
  styles: [`
    .template-example {
      padding: 20px;
      max-width: 700px;
      margin: 0 auto;
    }
    .custom-content {
      padding: 20px;
      background-color: #fafafa;
      border-radius: 4px;
      border: 1px solid #ddd;
    }
    .custom-content h3 {
      margin-top: 0;
      color: #333;
    }
    form {
      display: flex;
      flex-direction: column;
    }
    input {
      margin: 8px 0;
      padding: 8px;
      border: 1px solid #ccc;
      border-radius: 4px;
    }
    .confirm-btn {
      padding: 10px 20px;
      background-color: #4caf50;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      margin-top: 10px;
    }
  `]
})
export class AppComponent { }
```

### Template with Components

Embed Angular components within step templates:

```html
<ejs-stepper>
  <e-steps>
    <e-step label="Payment">
      <ng-template #payment>
        <app-payment-form (onSubmit)="handlePayment($event)">
        </app-payment-form>
      </ng-template>
    </e-step>
  </e-steps>
</ejs-stepper>
```

## Template Binding

Bind data to templates using Angular's data binding syntax.

### Dynamic Template Content

```ts
import { Component } from "@angular/core";
import { StepperAllModule, StepperModule } from "@syncfusion/ej2-angular-navigations";
import { CommonModule } from "@angular/common";

@Component({
  imports: [ StepperAllModule, StepperModule, CommonModule ],
  standalone: true,
  selector: 'app-root',
  template: `
    <div class="binding-example">
      <ejs-stepper>
        <e-steps>
          <e-step [label]="'Step ' + (step + 1)" 
                   *ngFor="let step of steps; let i = index">
            <ng-template>
              <div class="step-item">
                <h3>{{ steps[i].title }}</h3>
                <p>{{ steps[i].description }}</p>
                <div *ngIf="steps[i].items">
                  <ul>
                    <li *ngFor="let item of steps[i].items">{{ item }}</li>
                  </ul>
                </div>
              </div>
            </ng-template>
          </e-step>
        </e-steps>
      </ejs-stepper>
    </div>
  `,
  styles: [`
    .binding-example {
      padding: 20px;
    }
    .step-item {
      padding: 20px;
      background-color: #f5f5f5;
      border-radius: 4px;
    }
  `]
})
export class AppComponent {
  steps = [
    {
      title: 'Setup',
      description: 'Configure your application',
      items: ['Install dependencies', 'Configure database', 'Set environment']
    },
    {
      title: 'Development',
      description: 'Implement features',
      items: ['Create components', 'Add business logic', 'Write tests']
    },
    {
      title: 'Deployment',
      description: 'Release to production',
      items: ['Build application', 'Deploy to server', 'Monitor logs']
    }
  ];
}
```

### Two-Way Binding

Use `[(ngModel)]` for two-way data binding in templates:

```html
<ejs-stepper>
  <e-steps>
    <e-step label="Personal Info">
      <ng-template>
        <div class="form-group">
          <input type="text" 
                 [(ngModel)]="userData.name" 
                 placeholder="Name">
          <input type="email" 
                 [(ngModel)]="userData.email" 
                 placeholder="Email">
          <p>Current Name: {{ userData.name }}</p>
        </div>
      </ng-template>
    </e-step>
  </e-steps>
</ejs-stepper>
```

## Tooltip Templates

Create custom tooltips for steps using templates.

### Tooltip Template Example

```ts
import { Component } from "@angular/core";
import { StepperAllModule, StepperModule } from "@syncfusion/ej2-angular-navigations";
import { CommonModule } from "@angular/common";

@Component({
  imports: [ StepperAllModule, StepperModule, CommonModule ],
  standalone: true,
  selector: 'app-root',
  template: `
    <div class="tooltip-example">
      <ejs-stepper [showTooltip]="true">
        <e-steps>
          <e-step label="Cart" iconCss="sf-icon-cart">
            <ng-template #tooltipTemplate>
              <div class="tooltip-content">
                <strong>Review Items</strong>
                <p>Check and modify your selected items</p>
              </div>
            </ng-template>
          </e-step>

          <e-step label="Delivery" iconCss="sf-icon-transport">
            <ng-template #tooltipTemplate>
              <div class="tooltip-content">
                <strong>Shipping Details</strong>
                <p>Enter your delivery address</p>
              </div>
            </ng-template>
          </e-step>

          <e-step label="Payment" iconCss="sf-icon-payment">
            <ng-template #tooltipTemplate>
              <div class="tooltip-content">
                <strong>Payment Information</strong>
                <p>Provide payment method details</p>
              </div>
            </ng-template>
          </e-step>
        </e-steps>
      </ejs-stepper>
    </div>
  `,
  styles: [`
    .tooltip-example {
      padding: 20px;
    }
    .tooltip-content {
      padding: 10px;
    }
    .tooltip-content strong {
      display: block;
      margin-bottom: 5px;
    }
    .tooltip-content p {
      margin: 0;
      font-size: 12px;
    }
  `]
})
export class AppComponent { }
```

## CSS Class Customization

Apply custom CSS classes to steps for styling and layout control.

### Using CSS Classes

```ts
import { Component } from "@angular/core";
import { StepperAllModule, StepperModule } from "@syncfusion/ej2-angular-navigations";

@Component({
  imports: [ StepperAllModule, StepperModule ],
  standalone: true,
  selector: 'app-root',
  template: `
    <div class="css-class-example">
      <ejs-stepper>
        <e-steps>
          <e-step label="Step 1" 
                   iconCss="sf-icon-cart"
                   cssClass="primary-step"></e-step>
          <e-step label="Step 2" 
                   iconCss="sf-icon-transport"
                   cssClass="secondary-step"></e-step>
          <e-step label="Step 3" 
                   iconCss="sf-icon-payment"
                   cssClass="attention-step"></e-step>
        </e-steps>
      </ejs-stepper>
    </div>
  `,
  styles: [`
    .css-class-example {
      padding: 20px;
    }
    /* Primary step styling */
    :deep(.primary-step) {
      color: #1976d2;
    }
    /* Secondary step styling */
    :deep(.secondary-step) {
      color: #757575;
    }
    /* Attention step with special styling */
    :deep(.attention-step) {
      color: #f57c00;
      font-weight: bold;
    }
  `]
})
export class AppComponent { }
```

## Layout Customization

Customize the stepper layout to fit different UI patterns.

### Full-Width Stepper

```html
<div class="full-width-stepper">
  <ejs-stepper [orientation]="'Horizontal'">
    <e-steps>
      <e-step label="Step 1"></e-step>
      <e-step label="Step 2"></e-step>
      <e-step label="Step 3"></e-step>
      <e-step label="Step 4"></e-step>
    </e-steps>
  </ejs-stepper>
</div>

<style>
  .full-width-stepper {
    width: 100%;
  }
</style>
```

### Card-Based Layout

```ts
@Component({
  template: `
    <div class="card-layout">
      <div class="card">
        <ejs-stepper>
          <e-steps>
            <e-step label="Card Step 1"></e-step>
            <e-step label="Card Step 2"></e-step>
            <e-step label="Card Step 3"></e-step>
          </e-steps>
        </ejs-stepper>
      </div>
    </div>
  `,
  styles: [`
    .card-layout {
      padding: 20px;
    }
    .card {
      background: white;
      border-radius: 8px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
      padding: 20px;
    }
  `]
})
export class AppComponent { }
```

### Flexible Sidebar Layout

```ts
@Component({
  template: `
    <div class="flex-layout">
      <aside class="sidebar">
        <ejs-stepper orientation="Vertical">
          <e-steps>
            <e-step label="Section 1"></e-step>
            <e-step label="Section 2"></e-step>
            <e-step label="Section 3"></e-step>
          </e-steps>
        </ejs-stepper>
      </aside>
      <main class="content">
        <!-- Main content here -->
      </main>
    </div>
  `,
  styles: [`
    .flex-layout {
      display: flex;
      gap: 20px;
    }
    .sidebar {
      flex: 0 0 250px;
      padding: 20px;
      background-color: #f5f5f5;
      border-radius: 4px;
    }
    .content {
      flex: 1;
      padding: 20px;
    }
  `]
})
export class AppComponent { }
```

## Styling Patterns

### Theme Customization

```css
/* Override Syncfusion theme colors */
:deep(.e-stepper) {
  --primary-color: #1976d2;
  --secondary-color: #f57c00;
  --success-color: #4caf50;
  --error-color: #f44336;
}

/* Custom step indicator styling */
:deep(.e-step-indicator) {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}

/* Custom label styling */
:deep(.e-step-label-container) {
  font-weight: 500;
  font-size: 14px;
}
```

### Responsive Styling

```css
/* Desktop - Horizontal layout */
@media (min-width: 1024px) {
  :deep(.e-stepper) {
    flex-direction: row;
  }
}

/* Tablet - Transitional layout */
@media (max-width: 768px) {
  :deep(.e-stepper) {
    flex-direction: column;
  }
}

/* Mobile - Vertical compact layout */
@media (max-width: 480px) {
  :deep(.e-step-label-container) {
    display: none;
  }
  :deep(.e-stepper) {
    gap: 8px;
  }
}
```

## Best Practices

1. **Templates for complexity**: Use templates for rich content beyond simple labels
2. **Reusable components**: Create step content as separate components
3. **Clear CSS naming**: Use descriptive class names
4. **Responsive design**: Test on multiple screen sizes
5. **Performance**: Avoid heavy operations in templates
6. **Accessibility**: Ensure templates include proper ARIA labels

**See also:** [getting-started.md](getting-started.md) for basic setup, [step-types.md](step-types.md) for display options.
