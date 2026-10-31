# Step Validation and Flow Control in Angular Stepper

## Table of Contents
- [Linear Step Flow](#linear-step-flow)
- [Step Validation](#step-validation)
- [Step Status](#step-status)
- [Conditional Progression](#conditional-progression)
- [Error Handling](#error-handling)

## Linear Step Flow

Linear step flow enforces sequential progression through steps. Users can only move forward one step at a time and cannot skip steps or jump to future steps.

### Enabling Linear Flow

Set the `linear` property to `true` on the `ejs-stepper` component:

```ts
import { Component } from "@angular/core";
import { StepperAllModule, StepperModule } from "@syncfusion/ej2-angular-navigations";

@Component({
  imports: [ StepperAllModule, StepperModule ],
  standalone: true,
  selector: 'app-root',
  template: `
    <div class="linear-stepper">
      <h2>Multi-Step Form (Linear Flow)</h2>
      <ejs-stepper [linear]="true">
        <e-steps>
          <e-step label="Step 1 - Personal Details"></e-step>
          <e-step label="Step 2 - Address"></e-step>
          <e-step label="Step 3 - Payment"></e-step>
          <e-step label="Step 4 - Confirmation"></e-step>
        </e-steps>
      </ejs-stepper>
      <div class="instruction">
        Complete each step in order to proceed
      </div>
    </div>
  `,
  styles: [`
    .linear-stepper {
      padding: 20px;
      max-width: 700px;
      margin: 0 auto;
    }
    .instruction {
      margin-top: 20px;
      padding: 10px;
      background-color: #fff3e0;
      border-left: 4px solid #ff9800;
      border-radius: 4px;
    }
  `]
})
export class AppComponent { }
```

### How Linear Flow Works

With `linear="true"`:
- Users must complete steps in sequence
- Cannot click to jump to future steps
- Can go back to previous steps
- Must fill data and pass validation to move forward
- Disabled steps are visually indicated

### Benefits of Linear Flow

- **Guided experience**: Users follow intended workflow
- **Data integrity**: Ensures all required data is collected
- **Prevents errors**: Reduces jump-around mistakes
- **User clarity**: Clear progression path
- **Validation enforcement**: All checks must pass

### When to Use Linear Flow

- **Wizards**: Multi-step setup wizards
- **Forms**: Complex forms requiring sequential input
- **Onboarding**: User onboarding flows
- **Checkout**: E-commerce checkout process
- **Processes**: Guided processes with dependencies

## Step Validation

Step validation ensures users complete each step properly before moving to the next. Use the `stepChanging` event to validate step data.

### Example: Form Validation

```ts
import { Component } from "@angular/core";
import { StepperAllModule, StepperModule } from "@syncfusion/ej2-angular-navigations";
import { StepperChangingEventArgs } from "@syncfusion/ej2-angular-navigations";

@Component({
  imports: [ StepperAllModule, StepperModule ],
  standalone: true,
  selector: 'app-root',
  template: `
    <form class="validation-form">
      <ejs-stepper (stepChanging)="validateStep($event)" [linear]="true">
        <e-steps>
          <e-step label="Personal Info">
            <div class="step-form">
              <input type="text" 
                     [(ngModel)]="formData.firstName" 
                     name="firstName"
                     placeholder="First Name" 
                     required>
              <input type="email" 
                     [(ngModel)]="formData.email" 
                     name="email"
                     placeholder="Email" 
                     required>
            </div>
          </e-step>

          <e-step label="Address">
            <div class="step-form">
              <input type="text" 
                     [(ngModel)]="formData.street" 
                     name="street"
                     placeholder="Street Address" 
                     required>
              <input type="text" 
                     [(ngModel)]="formData.city" 
                     name="city"
                     placeholder="City" 
                     required>
            </div>
          </e-step>

          <e-step label="Confirmation">
            <div class="summary">
              <h3>Please Review Your Information</h3>
              <p>Name: {{ formData.firstName }}</p>
              <p>Email: {{ formData.email }}</p>
              <p>City: {{ formData.city }}</p>
            </div>
          </e-step>
        </e-steps>
      </ejs-stepper>

      <div class="error-message" *ngIf="errorMessage">
        {{ errorMessage }}
      </div>

      <button (click)="submitForm()" class="submit-btn">
        Submit
      </button>
    </form>
  `,
  styles: [`
    .validation-form {
      padding: 20px;
      max-width: 600px;
      margin: 0 auto;
    }
    .step-form {
      padding: 20px;
      background-color: #fafafa;
      border-radius: 4px;
    }
    .step-form input {
      display: block;
      width: 100%;
      margin: 10px 0;
      padding: 8px;
      border: 1px solid #ccc;
      border-radius: 4px;
      font-size: 14px;
    }
    .summary {
      padding: 20px;
      background-color: #f5f5f5;
      border-radius: 4px;
    }
    .error-message {
      margin-top: 10px;
      padding: 10px;
      background-color: #ffebee;
      color: #c62828;
      border-radius: 4px;
    }
    .submit-btn {
      margin-top: 20px;
      padding: 10px 20px;
      background-color: #1976d2;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
    }
  `]
})
export class AppComponent {
  formData = {
    firstName: '',
    email: '',
    street: '',
    city: ''
  };
  errorMessage = '';

  validateStep(args: StepperChangingEventArgs): void {
    this.errorMessage = '';

    if (args.previousStep === 0) {
      // Validate personal info step
      if (!this.formData.firstName.trim()) {
        this.errorMessage = 'Please enter your first name';
        args.cancel = true;
        return;
      }
      if (!this.isValidEmail(this.formData.email)) {
        this.errorMessage = 'Please enter a valid email address';
        args.cancel = true;
        return;
      }
    }

    if (args.previousStep === 1) {
      // Validate address step
      if (!this.formData.street.trim()) {
        this.errorMessage = 'Please enter your street address';
        args.cancel = true;
        return;
      }
      if (!this.formData.city.trim()) {
        this.errorMessage = 'Please enter your city';
        args.cancel = true;
        return;
      }
    }
  }

  isValidEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }

  submitForm(): void {
    console.log('Form submitted:', this.formData);
    alert('Form submitted successfully!');
  }
}
```

### Validation Best Practices

1. **Clear error messages**: Tell users specifically what's wrong
2. **Prevent default**: Set `args.cancel = true` to block progression
3. **Field-level feedback**: Highlight invalid fields in UI
4. **Async validation**: Use async/await for server validation
5. **User-friendly**: Don't let users get stuck with confusing errors

## Step Status

Control the visual status of each step using the `status` property of the `StepModel`. Steps can have different states: `Completed`, `InProgress`, or `NotStarted`. By default, the value is `NotStarted`.

### Using Step Status

```ts
import { Component, ViewChild } from "@angular/core";
import { StepperComponent, StepperChangedEventArgs, StepperAllModule, StepperModule } from "@syncfusion/ej2-angular-navigations";

@Component({
  imports: [ StepperAllModule, StepperModule ],
  standalone: true,
  selector: 'app-root',
  template: `
    <div class="status-example">
      <ejs-stepper #ejStepper id="stepper" (stepChanged)="handleStepChanged($event)">
        <e-steps>
          <e-step iconCss="sf-icon-cart" label="Cart"></e-step>
          <e-step iconCss="sf-icon-payment" label="Payment"></e-step>
          <e-step iconCss="sf-icon-success" label="Confirmation"></e-step>
        </e-steps>
      </ejs-stepper>
    </div>
    <div id="paymentStatus">Your payment has not started yet</div>
  `,
  styles: [`
    .status-example {
      padding: 20px;
    }
  `]
})
export class AppComponent {
  @ViewChild('ejStepper') stepper: StepperComponent | any;

  handleStepChanged = (args: StepperChangedEventArgs) => {
    let status = this.stepper.steps[1].status
    this.updateStatus(status)
  }
  
  updateStatus = (stepStatus: string) => {
    let statusMap = {
      'NotStarted' : { text: 'Your payment has not started yet', color: '#e74d4d' },
      'InProgress' : { text: 'Processing your payment', color: 'orange' },
      'Completed' : { text: 'Payment successful', color: '#4CAF50' }
    }

    let currentStatus = document.getElementById("paymentStatus");
    if (currentStatus) {
      let {text, color } = (statusMap as any)[stepStatus];
      currentStatus.innerText = text;
      currentStatus.style.backgroundColor = color;
    }
  }
}
```

### Status Types

| Status | Visual Indicator | Meaning |
|--------|------------------|---------|
| `Completed` | Checkmark | Step finished successfully |
| `InProgress` | Active indicator | Currently processing |
| `NotStarted` | Neutral | Not yet reached |

## Conditional Progression

Allow or prevent step progression based on custom conditions.

### Example: Conditional Next Step

```ts
import { Component } from "@angular/core";
import { StepperAllModule, StepperModule } from "@syncfusion/ej2-angular-navigations";
import { StepperChangingEventArgs } from "@syncfusion/ej2-angular-navigations";

@Component({
  imports: [ StepperAllModule, StepperModule ],
  standalone: true,
  selector: 'app-root',
  template: `
    <div class="conditional-flow">
      <ejs-stepper (stepChanging)="onStepChanging($event)" [linear]="true">
        <e-steps>
          <e-step label="Customer Type">
            <div class="step-content">
              <label>
                <input type="radio" [(ngModel)]="customerType" value="individual" name="type">
                Individual
              </label>
              <label>
                <input type="radio" [(ngModel)]="customerType" value="business" name="type">
                Business
              </label>
            </div>
          </e-step>

          <e-step label="Personal Details">
            <div class="step-content">
              <input [(ngModel)]="personalInfo.name" placeholder="Full Name">
              <input [(ngModel)]="personalInfo.phone" placeholder="Phone">
            </div>
          </e-step>

          <e-step label="Business Details" *ngIf="customerType === 'business'">
            <div class="step-content">
              <input [(ngModel)]="businessInfo.name" placeholder="Company Name">
              <input [(ngModel)]="businessInfo.tax" placeholder="Tax ID">
            </div>
          </e-step>

          <e-step label="Payment">
            <div class="step-content">
              Payment details
            </div>
          </e-step>
        </e-steps>
      </ejs-stepper>
    </div>
  `,
  styles: [`
    .conditional-flow {
      padding: 20px;
      max-width: 600px;
      margin: 0 auto;
    }
    .step-content {
      padding: 20px;
      background-color: #fafafa;
      border-radius: 4px;
    }
  `]
})
export class AppComponent {
  customerType = 'individual';
  personalInfo = { name: '', phone: '' };
  businessInfo = { name: '', tax: '' };

  onStepChanging(args: StepperChangingEventArgs): void {
    // Validate based on customer type
    if (args.previousStep === 0) {
      if (!this.customerType) {
        args.cancel = true;
      }
    }
  }
}
```

## Error Handling

Manage errors gracefully with proper user feedback.

### Error Handling Pattern

```ts
async validateAndProceed(args: StepperChangingEventArgs) {
  try {
    const isValid = await this.asyncValidation();
    if (!isValid) {
      this.errorMessage = 'Validation failed. Please try again.';
      args.cancel = true;
    }
  } catch (error) {
    this.errorMessage = 'An error occurred. Please contact support.';
    args.cancel = true;
    console.error('Validation error:', error);
  }
}

async asyncValidation(): Promise<boolean> {
  // Call server API, validate data, etc.
  return true;
}
```

## Best Practices

1. **Linear by default**: Use linear flow for forms
2. **Clear validation**: Show specific error messages
3. **Prevent data loss**: Validate before allowing progression
4. **Progressive disclosure**: Show only relevant steps
5. **Status updates**: Keep users informed of progress
6. **Manual control**: Allow users to go back and edit

**See also:** [events-and-interactions.md](events-and-interactions.md) for event handling patterns.
