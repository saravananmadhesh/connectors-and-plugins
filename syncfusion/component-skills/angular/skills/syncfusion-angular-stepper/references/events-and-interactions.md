# Handling Events and Interactions in Angular Stepper

## Table of Contents
- [Event Overview](#event-overview)
- [Created Event](#created-event)
- [StepChanged Event](#stepchanged-event)
- [StepChanging Event](#stepchanging-event)
- [BeforeStepRender Event](#beforesteprender-event)
- [StepClick Event](#stepclick-event)
- [Event Arguments Reference](#event-arguments-reference)
- [Event Patterns](#event-patterns)

## Event Overview

The Stepper component fires events at key moments during user interaction and component lifecycle. These events allow you to respond to user actions, validate data, and customize behavior.

### Available Events

| Event | Trigger | Use Case |
|-------|---------|----------|
| `created` | Component rendering complete | Initialize dependent components |
| `stepChanged` | After step changes | Track navigation history |
| `stepChanging` | Before step changes | Validate data, prevent navigation |
| `beforeStepRender` | Before step renders | Customize step content |
| `stepClick` | User clicks step indicator | Handle direct step access |

## Created Event

The `created` event fires when the Stepper component finishes rendering. Use this event to initialize dependent components or perform setup tasks.

### Created Event Example

```ts
import { Component } from "@angular/core";
import { StepperAllModule, StepperModule } from "@syncfusion/ej2-angular-navigations";

@Component({
  imports: [ StepperAllModule, StepperModule ],
  standalone: true,
  selector: 'app-root',
  template: `
    <div class="stepper-container">
      <h2>Welcome to Setup Wizard</h2>
      <ejs-stepper (created)="onCreated()">
        <e-steps>
          <e-step label="Step 1"></e-step>
          <e-step label="Step 2"></e-step>
          <e-step label="Step 3"></e-step>
        </e-steps>
      </ejs-stepper>
      <div class="message" *ngIf="message">{{ message }}</div>
    </div>
  `,
  styles: [`
    .stepper-container {
      padding: 20px;
      max-width: 600px;
      margin: 0 auto;
    }
    .message {
      margin-top: 20px;
      padding: 10px;
      background-color: #e0f2f1;
      border-left: 4px solid #00897b;
    }
  `]
})
export class AppComponent {
  message = '';

  onCreated(): void {
    console.log('Stepper component created');
    this.message = 'Stepper initialized successfully';
    // Initialize dependent components
    this.initializeDependencies();
  }

  initializeDependencies(): void {
    // Load data, initialize services, etc.
  }
}
```

### When to Use Created

- Initialize related components
- Load initial data or configuration
- Set up event listeners
- Start timers or processes
- Perform one-time setup tasks

## StepChanged Event

The `stepChanged` event fires **after** the active step has changed. Use this event to respond to step changes, track user flow, or perform actions on the new step.

### StepChanged Event Example

```ts
import { Component } from "@angular/core";
import { StepperAllModule, StepperModule } from "@syncfusion/ej2-angular-navigations";
import { StepperChangedEventArgs } from "@syncfusion/ej2-angular-navigations";

@Component({
  imports: [ StepperAllModule, StepperModule ],
  standalone: true,
  selector: 'app-root',
  template: `
    <div class="stepper-container">
      <ejs-stepper (stepChanged)="onStepChanged($event)">
        <e-steps>
          <e-step label="Personal Info"></e-step>
          <e-step label="Address"></e-step>
          <e-step label="Payment"></e-step>
          <e-step label="Confirmation"></e-step>
        </e-steps>
      </ejs-stepper>
      <div class="history">
        <h3>Navigation History</h3>
        <ul>
          <li *ngFor="let entry of history">{{ entry }}</li>
        </ul>
      </div>
    </div>
  `,
  styles: [`
    .stepper-container {
      padding: 20px;
      max-width: 600px;
      margin: 0 auto;
    }
    .history {
      margin-top: 20px;
      padding: 10px;
      background-color: #f5f5f5;
      border: 1px solid #ddd;
      border-radius: 4px;
    }
  `]
})
export class AppComponent {
  history: string[] = [];

  onStepChanged(args: StepperChangedEventArgs): void {
    const timestamp = new Date().toLocaleTimeString();
    const message = `Moved to Step ${args.activeStep + 1} at ${timestamp}`;
    this.history.push(message);
    console.log(message);
    
    // Update page title or breadcrumb
    this.updatePageState(args.activeStep);
  }

  updatePageState(stepIndex: number): void {
    const stepNames = ['Personal Info', 'Address', 'Payment', 'Confirmation'];
    console.log(`Current Step: ${stepNames[stepIndex]}`);
  }
}
```

### StepChanged Event Args

- `activeStep` (number): Index of the currently active step (0-indexed)
- `previousStep` (number): Index of the previously active step (0-indexed)
- `isInteracted` (boolean): Whether the change was triggered by user interaction
- `event` (Event): The original browser event
- `element` (HTMLElement): The Stepper DOM element
- `name` (string): Event name

### When to Use StepChanged

- Track user navigation flow
- Update related UI elements
- Load step-specific content
- Record analytics/user behavior
- Update breadcrumbs or page titles

## StepChanging Event

The `stepChanging` event fires **before** the step changes. Use this event to validate data, prevent invalid navigation, and ask for confirmation.

### StepChanging Event Example - Form Validation

```ts
import { Component } from "@angular/core";
import { StepperAllModule, StepperModule } from "@syncfusion/ej2-angular-navigations";
import { StepperChangingEventArgs } from "@syncfusion/ej2-angular-navigations";

@Component({
  imports: [ StepperAllModule, StepperModule ],
  standalone: true,
  selector: 'app-root',
  template: `
    <div class="form-stepper">
      <ejs-stepper (stepChanging)="onStepChanging($event)">
        <e-steps>
          <e-step label="Personal Details">
            <div class="step-content">
              <input [(ngModel)]="personalInfo.name" placeholder="Full Name">
              <input [(ngModel)]="personalInfo.email" placeholder="Email">
            </div>
          </e-step>
          <e-step label="Address">
            <div class="step-content">
              <input [(ngModel)]="address.street" placeholder="Street">
              <input [(ngModel)]="address.city" placeholder="City">
            </div>
          </e-step>
          <e-step label="Confirmation">
            <div class="step-content">Review and confirm</div>
          </e-step>
        </e-steps>
      </ejs-stepper>
      <div class="error" *ngIf="errorMessage">{{ errorMessage }}</div>
    </div>
  `,
  styles: [`
    .form-stepper {
      padding: 20px;
      max-width: 600px;
      margin: 0 auto;
    }
    .step-content {
      padding: 20px;
      border: 1px solid #ddd;
      border-radius: 4px;
    }
    input {
      display: block;
      width: 100%;
      margin: 10px 0;
      padding: 8px;
      border: 1px solid #ccc;
      border-radius: 4px;
    }
    .error {
      margin-top: 10px;
      padding: 10px;
      background-color: #ffebee;
      color: #c62828;
      border-radius: 4px;
    }
  `]
})
export class AppComponent {
  personalInfo = { name: '', email: '' };
  address = { street: '', city: '' };
  errorMessage = '';

  onStepChanging(args: StepperChangingEventArgs): void {
    this.errorMessage = '';

    // Validate current step before allowing change
    if (args.activeStep === 0 && args.previousStep === 1) {
      // Returning to first step, validation passes
      return;
    }

    if (args.previousStep === 0) {
      if (!this.validatePersonalInfo()) {
        this.errorMessage = 'Please fill in all personal information fields';
        args.cancel = true; // Prevent step change
        return;
      }
    }

    if (args.previousStep === 1) {
      if (!this.validateAddress()) {
        this.errorMessage = 'Please fill in all address fields';
        args.cancel = true; // Prevent step change
        return;
      }
    }
  }

  validatePersonalInfo(): boolean {
    return this.personalInfo.name.trim() !== '' && 
           this.personalInfo.email.trim() !== '';
  }

  validateAddress(): boolean {
    return this.address.street.trim() !== '' && 
           this.address.city.trim() !== '';
  }
}
```

### StepChanging Event Args

- `activeStep`: Target step index
- `previousStep`: Current step index
- `cancel`: Set to `true` to prevent step change

### When to Use StepChanging

- Validate form data before moving forward
- Ask for confirmation before leaving a step
- Save data to server before progression
- Prevent navigation to invalid states
- Perform async validation

## BeforeStepRender Event

The `beforeStepRender` event fires before a step renders. Use this to customize step appearance, content, or add dynamic elements.

### BeforeStepRender Event Example

```ts
import { Component } from "@angular/core";
import { StepperAllModule, StepperModule } from "@syncfusion/ej2-angular-navigations";
import { StepperRenderingEventArgs } from "@syncfusion/ej2-angular-navigations";

@Component({
  imports: [ StepperAllModule, StepperModule ],
  standalone: true,
  selector: 'app-root',
  template: `
    <ejs-stepper (beforeStepRender)="onBeforeStepRender($event)">
      <e-steps>
        <e-step label="Step 1"></e-step>
        <e-step label="Step 2"></e-step>
        <e-step label="Step 3"></e-step>
        <e-step label="Step 4"></e-step>
      </e-steps>
    </ejs-stepper>
  `
})
export class AppComponent {
  onBeforeStepRender(args: StepperRenderingEventArgs): void {
    // Customize step based on conditions
    if (args.step.index === 2) {
      // Add special styling or marking to step 3
      args.step.cssClass = 'important-step';
    }
  }
}
```

### StepperRenderingEventArgs

- `index`: Index of the step being rendered (0-indexed)
- `element`: The Stepper DOM element
- `name`: Event name string

### When to Use BeforeStepRender

- Add dynamic CSS classes
- Conditionally disable/enable steps
- Customize step appearance
- Add loading indicators
- Dynamically determine step availability

## StepClick Event

The `stepClick` event fires when the user clicks on a step indicator or label. Use this to handle direct step navigation or custom click behavior.

### StepClick Event Example

```ts
import { Component } from "@angular/core";
import { StepperAllModule, StepperModule } from "@syncfusion/ej2-angular-navigations";
import { StepperClickEventArgs } from "@syncfusion/ej2-angular-navigations";

@Component({
  imports: [ StepperAllModule, StepperModule ],
  standalone: true,
  selector: 'app-root',
  template: `
    <div class="click-example">
      <ejs-stepper (stepClick)="onStepClick($event)">
        <e-steps>
          <e-step label="Cart"></e-step>
          <e-step label="Delivery"></e-step>
          <e-step label="Payment"></e-step>
          <e-step label="Complete"></e-step>
        </e-steps>
      </ejs-stepper>
      <div class="feedback" *ngIf="feedback">{{ feedback }}</div>
    </div>
  `,
  styles: [`
    .click-example {
      padding: 20px;
    }
    .feedback {
      margin-top: 20px;
      padding: 10px;
      background-color: #e3f2fd;
      border-left: 4px solid #1976d2;
    }
  `]
})
export class AppComponent {
  feedback = '';

  onStepClick(args: StepperClickEventArgs): void {
    this.feedback = `You clicked on Step ${args.activeStep + 1}`;
    console.log(`Step ${args.activeStep} clicked`, args);
  }
}
```

### StepClickEventArgs

- `activeStep`: Index of the clicked step (0-indexed)
- `previousStep`: Index of the previously active step (0-indexed)
- `event`: The original browser event
- `element`: The Stepper DOM element
- `name`: Event name string

### When to Use StepClick

- Track which steps users click on
- Provide feedback on step clicks
- Allow direct navigation (if not linear)
- Prevent click on future steps
- Analytics tracking

## Event Arguments Reference

### Common Event Arguments

All event arguments extend the base event object with the following common properties:

| Property | Type | Description |
|----------|------|-------------|
| `event` | Event | The original browser DOM event |
| `element` | HTMLElement | The Stepper component's root DOM element |
| `name` | string | Name of the event being fired |

### StepperChangedEventArgs

Fired after step change is complete.

| Property | Type | Description |
|----------|------|-------------|
| `activeStep` | number | Index of the currently active step (0-indexed) |
| `previousStep` | number | Index of the previously active step (0-indexed) |
| `isInteracted` | boolean | `true` if triggered by user interaction, `false` if programmatic |
| `event` | Event | The original browser event |
| `element` | HTMLElement | The Stepper DOM element |
| `name` | string | Event name ('stepChanged') |

### StepperChangingEventArgs

Fired before step change, can be prevented.

| Property | Type | Description |
|----------|------|-------------|
| `activeStep` | number | Index of the target step (0-indexed) |
| `previousStep` | number | Index of the current step (0-indexed) |
| `cancel` | boolean | Set to `true` to prevent the step change. Default: `false` |
| `isInteracted` | boolean | `true` if triggered by user interaction, `false` if programmatic |
| `event` | Event | The original browser event |
| `element` | HTMLElement | The Stepper DOM element |
| `name` | string | Event name ('stepChanging') |

### StepperClickEventArgs

Fired when user clicks on a step.

| Property | Type | Description |
|----------|------|-------------|
| `activeStep` | number | Index of the clicked step (0-indexed) |
| `previousStep` | number | Index of the previously active step (0-indexed) |
| `event` | Event | The original browser event |
| `element` | HTMLElement | The Stepper DOM element |
| `name` | string | Event name ('stepClick') |

### StepperRenderingEventArgs

Fired before a step renders.

| Property | Type | Description |
|----------|------|-------------|
| `index` | number | Index of the step about to render (0-indexed) |
| `element` | HTMLElement | The Stepper DOM element |
| `name` | string | Event name ('beforeStepRender') |

## Event Patterns

### Pattern 1: Complete Form Workflow

```ts
onCreated(): void {
  // Load form data
}

onStepChanging(args: StepperChangingEventArgs): void {
  // Validate current step data
  if (!isValid()) {
    args.cancel = true;
  }
}

onStepChanged(args: StepperChangedEventArgs): void {
  // Save previous step data
  // Load new step data
}
```

### Pattern 2: Linear Workflow

```ts
onStepClick(args: StepperClickEventArgs): void {
  // Allow only moving forward
  if (args.activeStep <= this.currentStep) {
    // Allowed
  } else {
    args.cancel = true; // Prevent moving to future step
  }
}
```

### Pattern 3: Async Validation

```ts
async onStepChanging(args: StepperChangingEventArgs) {
  const isValid = await this.validateWithServer();
  if (!isValid) {
    args.cancel = true;
  }
}
```

## Best Practices

1. **Prevent data loss**: Use `stepChanging` to validate before leaving
2. **Provide feedback**: Use `stepChanged` to update UI
3. **Initialize once**: Use `created` for one-time setup
4. **Track user journey**: Log navigation in `stepChanged`
5. **Clear error messages**: Reset errors when user takes action

**See also:** [validation-and-flow.md](validation-and-flow.md) for form validation patterns.
