# Advanced Use Cases

## Table of Contents

- [Multi-Step Form Wizard](#multi-step-form-wizard)
- [Form Validation with Steps](#form-validation-with-steps)
- [Shopping Cart Checkout Flow](#shopping-cart-checkout-flow)
- [Step Navigation Patterns](#step-navigation-patterns)
- [Conditional Step Enabling](#conditional-step-enabling)
- [Progress Tracking](#progress-tracking)
- [Best Practices](#best-practices)

## Multi-Step Form Wizard

### Basic Multi-Step Wizard

```typescript
import { Accordion, ExpandEventArgs } from '@syncfusion/ej2-navigations';

const wizard = new Accordion({
    expandMode: 'Single',
    items: [
        { 
            header: '📋 Step 1: Personal Information', 
            content: `
                <div class="step-content">
                    <div class="form-group">
                        <label>Full Name</label>
                        <input type="text" id="fullName" placeholder="Enter your full name" />
                    </div>
                    <div class="form-group">
                        <label>Email</label>
                        <input type="email" id="email" placeholder="Enter your email" />
                    </div>
                    <div class="form-group">
                        <label>Phone</label>
                        <input type="tel" id="phone" placeholder="Enter your phone number" />
                    </div>
                    <button onclick="goNextStep(1)">Next →</button>
                </div>
            `,
            expanded: true
        },
        { 
            header: '🏠 Step 2: Address', 
            content: `
                <div class="step-content">
                    <div class="form-group">
                        <label>Street Address</label>
                        <input type="text" id="street" placeholder="Enter street address" />
                    </div>
                    <div class="form-group">
                        <label>City</label>
                        <input type="text" id="city" placeholder="Enter city" />
                    </div>
                    <div class="form-group">
                        <label>Zip Code</label>
                        <input type="text" id="zip" placeholder="Enter zip code" />
                    </div>
                    <div class="button-group">
                        <button onclick="goPreviousStep(2)">← Back</button>
                        <button onclick="goNextStep(2)">Next →</button>
                    </div>
                </div>
            `,
            disabled: true
        },
        { 
            header: '💳 Step 3: Payment', 
            content: `
                <div class="step-content">
                    <div class="form-group">
                        <label>Card Number</label>
                        <input type="text" id="cardNumber" placeholder="Enter card number" />
                    </div>
                    <div class="form-group">
                        <label>CVV</label>
                        <input type="text" id="cvv" placeholder="Enter CVV" />
                    </div>
                    <div class="form-group">
                        <label>Expiry Date</label>
                        <input type="text" id="expiry" placeholder="MM/YY" />
                    </div>
                    <div class="button-group">
                        <button onclick="goPreviousStep(3)">← Back</button>
                        <button onclick="submitWizard()">Complete ✓</button>
                    </div>
                </div>
            `,
            disabled: true
        },
        { 
            header: '✅ Step 4: Confirmation', 
            content: `
                <div class="step-content confirmation">
                    <div class="success-message">
                        <h2>✓ Order Confirmed!</h2>
                        <p>Your registration has been successfully completed.</p>
                        <p>Order ID: <strong>#ORD-2024-001</strong></p>
                        <button onclick="downloadReceipt()">Download Receipt</button>
                    </div>
                </div>
            `,
            disabled: true
        }
    ]
});

wizard.appendTo('#wizard-container');

// Navigation functions
function goNextStep(currentStep: number) {
    if (validateStep(currentStep)) {
        wizard.enableItem(currentStep, true);
        wizard.expandItem(currentStep);
    } else {
        alert('Please fill in all required fields');
    }
}

function goPreviousStep(currentStep: number) {
    wizard.expandItem(currentStep - 2);
}

function validateStep(step: number): boolean {
    // Add validation logic
    return true;
}

function submitWizard() {
    console.log('Form submitted');
    wizard.enableItem(3, true);
    wizard.expandItem(3);
}

function downloadReceipt() {
    console.log('Downloading receipt...');
}
```

## Form Validation with Steps

### Step-by-Step Validation

```typescript
import { Accordion, ExpandEventArgs } from '@syncfusion/ej2-navigations';

interface StepValidation {
    [key: number]: () => boolean;
}

class FormWizard {
    accordion: Accordion;
    stepValidations: StepValidation = {
        0: () => this.validatePersonalInfo(),
        1: () => this.validateAddress(),
        2: () => this.validatePayment()
    };
    
    constructor() {
        this.accordion = new Accordion({
            expandMode: 'Single',
            items: [
                { 
                    header: 'Personal Information', 
                    content: this.getPersonalInfoForm(),
                    expanded: true
                },
                { 
                    header: 'Address', 
                    content: this.getAddressForm(),
                    disabled: true
                },
                { 
                    header: 'Payment', 
                    content: this.getPaymentForm(),
                    disabled: true
                }
            ],
            expanding: (args: ExpandEventArgs) => {
                const fromIndex = this.accordion.items.findIndex(
                    item => item.expanded && item !== args.item
                );
                
                // Validate current step before moving to next
                if (fromIndex >= 0 && fromIndex < this.stepValidations[fromIndex]) {
                    if (!this.stepValidations[fromIndex]?.()) {
                        args.cancel = true;
                        this.showError('Please complete all required fields');
                    }
                }
            }
        });
        
        this.accordion.appendTo('#wizard');
    }
    
    validatePersonalInfo(): boolean {
        const fullName = (document.getElementById('fullName') as HTMLInputElement)?.value;
        const email = (document.getElementById('email') as HTMLInputElement)?.value;
        
        if (!fullName || !email) {
            this.showError('Full Name and Email are required');
            return false;
        }
        
        if (!this.isValidEmail(email)) {
            this.showError('Invalid email format');
            return false;
        }
        
        return true;
    }
    
    validateAddress(): boolean {
        const street = (document.getElementById('street') as HTMLInputElement)?.value;
        const city = (document.getElementById('city') as HTMLInputElement)?.value;
        const zip = (document.getElementById('zip') as HTMLInputElement)?.value;
        
        if (!street || !city || !zip) {
            this.showError('All address fields are required');
            return false;
        }
        
        return true;
    }
    
    validatePayment(): boolean {
        const cardNumber = (document.getElementById('cardNumber') as HTMLInputElement)?.value;
        const cvv = (document.getElementById('cvv') as HTMLInputElement)?.value;
        
        if (!cardNumber || !cvv) {
            this.showError('Payment information is required');
            return false;
        }
        
        if (cardNumber.length !== 16) {
            this.showError('Card number must be 16 digits');
            return false;
        }
        
        return true;
    }
    
    isValidEmail(email: string): boolean {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    }
    
    showError(message: string) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        document.body.appendChild(errorDiv);
        
        setTimeout(() => errorDiv.remove(), 3000);
    }
    
    getPersonalInfoForm(): string {
        return `
            <div class="form-step">
                <input type="text" id="fullName" placeholder="Full Name" />
                <input type="email" id="email" placeholder="Email" />
                <input type="tel" id="phone" placeholder="Phone" />
            </div>
        `;
    }
    
    getAddressForm(): string {
        return `
            <div class="form-step">
                <input type="text" id="street" placeholder="Street Address" />
                <input type="text" id="city" placeholder="City" />
                <input type="text" id="zip" placeholder="Zip Code" />
            </div>
        `;
    }
    
    getPaymentForm(): string {
        return `
            <div class="form-step">
                <input type="text" id="cardNumber" placeholder="Card Number" />
                <input type="text" id="cvv" placeholder="CVV" />
                <input type="text" id="expiry" placeholder="MM/YY" />
            </div>
        `;
    }
}

// Initialize
new FormWizard();
```

## Shopping Cart Checkout Flow

### E-Commerce Checkout Using Accordion

```typescript
import { Accordion, ExpandEventArgs } from '@syncfusion/ej2-navigations';

interface CartItem {
    id: number;
    name: string;
    price: number;
    quantity: number;
}

class CheckoutFlow {
    accordion: Accordion;
    cart: CartItem[] = [
        { id: 1, name: 'Product A', price: 29.99, quantity: 2 },
        { id: 2, name: 'Product B', price: 49.99, quantity: 1 }
    ];
    
    constructor() {
        this.accordion = new Accordion({
            expandMode: 'Single',
            items: [
                {
                    header: `🛒 Review Cart (${this.cart.length} items)`,
                    content: this.getCartReview(),
                    expanded: true
                },
                {
                    header: '📍 Shipping Address',
                    content: this.getShippingForm(),
                    disabled: true
                },
                {
                    header: '🚚 Shipping Method',
                    content: this.getShippingMethod(),
                    disabled: true
                },
                {
                    header: '💳 Payment',
                    content: this.getPaymentForm(),
                    disabled: true
                },
                {
                    header: '✅ Order Confirmation',
                    content: this.getConfirmation(),
                    disabled: true
                }
            ],
            expanding: (args: ExpandEventArgs) => {
                this.onStepExpand(args);
            }
        });
        
        this.accordion.appendTo('#checkout');
    }
    
    getCartReview(): string {
        const total = this.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        const itemsHtml = this.cart.map(item => `
            <tr>
                <td>${item.name}</td>
                <td>${item.quantity}</td>
                <td>$${item.price.toFixed(2)}</td>
                <td>$${(item.price * item.quantity).toFixed(2)}</td>
            </tr>
        `).join('');
        
        return `
            <div class="cart-review">
                <table>
                    <thead>
                        <tr><th>Product</th><th>Qty</th><th>Price</th><th>Total</th></tr>
                    </thead>
                    <tbody>${itemsHtml}</tbody>
                </table>
                <div class="cart-total">
                    <strong>Total: $${total.toFixed(2)}</strong>
                </div>
                <button onclick="checkoutFlow.proceedToShipping()">Proceed →</button>
            </div>
        `;
    }
    
    getShippingForm(): string {
        return `
            <form class="shipping-form">
                <input type="text" placeholder="Full Name" required />
                <input type="email" placeholder="Email" required />
                <input type="text" placeholder="Street Address" required />
                <input type="text" placeholder="City" required />
                <select required>
                    <option>Select State</option>
                    <option>California</option>
                    <option>New York</option>
                </select>
                <input type="text" placeholder="Zip Code" required />
                <button type="button" onclick="checkoutFlow.proceedToShippingMethod()">Continue →</button>
            </form>
        `;
    }
    
    getShippingMethod(): string {
        return `
            <div class="shipping-options">
                <label>
                    <input type="radio" name="shipping" value="standard" checked />
                    Standard Shipping (5-7 days) - FREE
                </label>
                <label>
                    <input type="radio" name="shipping" value="express" />
                    Express Shipping (2-3 days) - $9.99
                </label>
                <label>
                    <input type="radio" name="shipping" value="overnight" />
                    Overnight Shipping - $24.99
                </label>
                <button onclick="checkoutFlow.proceedToPayment()">Continue →</button>
            </div>
        `;
    }
    
    getPaymentForm(): string {
        return `
            <form class="payment-form">
                <input type="text" placeholder="Card Holder Name" required />
                <input type="text" placeholder="Card Number" required />
                <input type="text" placeholder="MM/YY" required />
                <input type="text" placeholder="CVV" required />
                <button type="button" onclick="checkoutFlow.completeOrder()">Place Order</button>
            </form>
        `;
    }
    
    getConfirmation(): string {
        return `
            <div class="order-confirmation">
                <h2>✓ Order Placed Successfully!</h2>
                <p>Order ID: <strong>#ORD-${Date.now()}</strong></p>
                <p>You will receive a confirmation email shortly.</p>
                <p>Estimated Delivery: <strong>3-5 business days</strong></p>
                <button onclick="location.href='/'">Continue Shopping</button>
            </div>
        `;
    }
    
    onStepExpand(args: ExpandEventArgs) {
        const stepIndex = this.accordion.items.indexOf(args.item);
        console.log(`Expanded step ${stepIndex}: ${args.item.header}`);
    }
    
    proceedToShipping() {
        this.accordion.enableItem(1, true);
        this.accordion.expandItem(1);
    }
    
    proceedToShippingMethod() {
        this.accordion.enableItem(2, true);
        this.accordion.expandItem(2);
    }
    
    proceedToPayment() {
        this.accordion.enableItem(3, true);
        this.accordion.expandItem(3);
    }
    
    completeOrder() {
        this.accordion.enableItem(4, true);
        this.accordion.expandItem(4);
    }
}

const checkoutFlow = new CheckoutFlow();
```

## Step Navigation Patterns

### Sequential Navigation

```typescript
class SequentialWizard {
    accordion: Accordion;
    currentStep = 0;
    
    constructor() {
        this.accordion = new Accordion({
            items: this.generateSteps(5),
            expandMode: 'Single'
        });
        
        this.accordion.appendTo('#wizard');
    }
    
    generateSteps(count: number) {
        return Array.from({length: count}, (_, i) => ({
            header: `Step ${i + 1}`,
            content: `Content for step ${i + 1}`,
            expanded: i === 0,
            disabled: i > 0
        }));
    }
    
    nextStep() {
        if (this.currentStep < this.accordion.items.length - 1) {
            this.currentStep++;
            this.accordion.enableItem(this.currentStep, true);
            this.accordion.expandItem(this.currentStep);
        }
    }
    
    previousStep() {
        if (this.currentStep > 0) {
            this.currentStep--;
            this.accordion.expandItem(this.currentStep);
        }
    }
    
    goToStep(stepIndex: number) {
        if (stepIndex >= 0 && stepIndex < this.accordion.items.length) {
            this.currentStep = stepIndex;
            this.accordion.expandItem(stepIndex);
        }
    }
    
    getProgress(): number {
        return ((this.currentStep + 1) / this.accordion.items.length) * 100;
    }
}
```

## Conditional Step Enabling

### Enable/Disable Based on Conditions

```typescript
import { Accordion } from '@syncfusion/ej2-navigations';

class ConditionalWizard {
    accordion: Accordion;
    
    constructor() {
        this.accordion = new Accordion({
            expandMode: 'Single',
            items: [
                {
                    header: 'User Type',
                    content: `
                        <label><input type="radio" name="userType" value="individual" /> Individual</label>
                        <label><input type="radio" name="userType" value="business" /> Business</label>
                        <button onclick="conditionalWizard.selectUserType()">Continue</button>
                    `,
                    expanded: true
                },
                {
                    header: 'Individual Details',
                    content: 'Individual form...',
                    disabled: true
                },
                {
                    header: 'Business Details',
                    content: 'Business form...',
                    disabled: true
                }
            ]
        });
        
        this.accordion.appendTo('#conditional-wizard');
    }
    
    selectUserType() {
        const userType = (document.querySelector('input[name="userType"]:checked') as HTMLInputElement)?.value;
        
        if (userType === 'individual') {
            this.accordion.enableItem(1, true);
            this.accordion.enableItem(2, false);
            this.accordion.expandItem(1);
        } else if (userType === 'business') {
            this.accordion.enableItem(1, false);
            this.accordion.enableItem(2, true);
            this.accordion.expandItem(2);
        }
    }
}

const conditionalWizard = new ConditionalWizard();
```

## Progress Tracking

### Display Progress Bar

```typescript
class ProgressWizard {
    accordion: Accordion;
    totalSteps = 5;
    
    constructor() {
        this.accordion = new Accordion({
            items: this.generateStepsWithProgress(),
            expandMode: 'Single'
        });
        
        this.accordion.appendTo('#progress-wizard');
    }
    
    generateStepsWithProgress() {
        return Array.from({length: this.totalSteps}, (_, i) => ({
            header: `Step ${i + 1} of ${this.totalSteps}`,
            content: `
                <div class="progress-container">
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: ${((i + 1) / this.totalSteps) * 100}%"></div>
                    </div>
                    <p>Progress: ${Math.round(((i + 1) / this.totalSteps) * 100)}% Complete</p>
                    <div class="step-content">
                        Step ${i + 1} content here
                    </div>
                </div>
            `,
            expanded: i === 0,
            disabled: i > 0
        }));
    }
    
    updateProgress(stepIndex: number) {
        const progress = ((stepIndex + 1) / this.totalSteps) * 100;
        const progressBar = document.querySelector('.progress-fill') as HTMLElement;
        if (progressBar) {
            progressBar.style.width = progress + '%';
        }
    }
}
```

## Best Practices

### 1. Save State Between Steps
```typescript
interface WizardState {
    step: number;
    formData: Record<string, any>;
}

const saveWizardState = (state: WizardState) => {
    localStorage.setItem('wizardState', JSON.stringify(state));
};

const loadWizardState = (): WizardState | null => {
    const saved = localStorage.getItem('wizardState');
    return saved ? JSON.parse(saved) : null;
};
```

### 2. Validate Before Moving Forward
```typescript
const canProceed = (currentStep: number): boolean => {
    const validators: Record<number, () => boolean> = {
        0: () => validatePersonalInfo(),
        1: () => validateAddress(),
        2: () => validatePayment()
    };
    
    return validators[currentStep]?.() ?? true;
};
```

### 3. Clear Sensitive Data
```typescript
const clearSensitiveData = () => {
    // Clear card information, OTP codes, etc.
    document.querySelectorAll('input[type="password"], input[data-sensitive]')
        .forEach(input => {
            (input as HTMLInputElement).value = '';
        });
};
```

### 4. Show Completion Summary
```typescript
const showSummary = (formData: Record<string, any>) => {
    const summary = document.createElement('div');
    summary.className = 'wizard-summary';
    summary.innerHTML = Object.entries(formData)
        .map(([key, value]) => `<p><strong>${key}:</strong> ${value}</p>`)
        .join('');
    
    document.body.appendChild(summary);
};
```

## Next Steps

- Explore event handling in **Advanced Features**
- Learn template patterns in **Templates**
- Customize styling in **Customization and Styling**
