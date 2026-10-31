# Button - API Reference (TypeScript)

## Table of Contents
- [Properties](#properties)
- [Methods](#methods)
- [Events](#events)

## Properties

The Button component supports the following properties:

```typescript
interface ButtonModel {
  // Content and appearance
  content?: string;                    // Button text content
  cssClass?: string;                   // CSS classes to apply
  iconCss?: string;                    // Icon CSS class
  iconPosition?: 'Left' | 'Right';     // Icon position (default: 'Left')
  
  // State
  disabled?: boolean;                  // Disable button (default: false)
  isToggle?: boolean;                  // Toggle on/off state (default: false)
  
  // Internationalization
  enableRtl?: boolean;                 // RTL support (default: false)
  locale?: string;                     // Locale for text direction
  
  // Persistence
  enablePersistence?: boolean;         // Persist component state
  
  // HTML
  enableHtmlSanitizer?: boolean;       // Sanitize HTML content (default: true)
  htmlAttributes?: any;                // HTML attributes
  
  // Events
  click?: (args?: any) => void;       // Click event
  created?: () => void;                // Component created event
}
```

### Property Details

#### content
```typescript
const button: Button = new Button({
  content: 'Click Me'
});
button.appendTo('#button');
```

#### cssClass
```typescript
const button: Button = new Button({
  cssClass: 'e-primary e-large'
});
button.appendTo('#button');
```

#### iconCss
```typescript
const button: Button = new Button({
  content: 'Save',
  iconCss: 'e-icons e-save',
  iconPosition: 'Left'
});
button.appendTo('#button');
```

#### disabled
```typescript
const button: Button = new Button({
  content: 'Disabled',
  disabled: true
});
button.appendTo('#button');

// Programmatically disable/enable
button.disabled = false;
button.dataBind();
```

#### isToggle
```typescript
const button: Button = new Button({
  content: 'Toggle',
  isToggle: true
});
button.appendTo('#button');

// Check toggle state
const isActive = button.element.classList.contains('e-active');
```

## Methods

The Button component supports the following methods:

### appendTo(selector)
Render button to a target element:

```typescript
const button: Button = new Button({ content: 'Save' });
button.appendTo('#myButton');
```

### click()
Trigger button click:

```typescript
const button: Button = new Button({ content: 'Click' });
button.appendTo('#button');

// Simulate click
button.click();
```

### dataBind()
Update button after property changes:

```typescript
const button: Button = new Button({
  content: 'Save',
  cssClass: 'e-primary'
});
button.appendTo('#button');

// Change content
button.content = 'Saving...';
button.dataBind();
```

### destroy()
Destroy button and remove DOM:

```typescript
const button: Button = new Button({ content: 'Button' });
button.appendTo('#button');

// Clean up
button.destroy();
```

### focusIn()
Set focus to button:

```typescript
const button: Button = new Button({ content: 'Button' });
button.appendTo('#button');

button.focusIn();
```

### refresh()
Refresh button UI:

```typescript
const button: Button = new Button({
  content: 'Refresh',
  cssClass: 'e-primary'
});
button.appendTo('#button');

button.refresh();
```

### getRootElement()
Get button root element:

```typescript
const button: Button = new Button({ content: 'Button' });
button.appendTo('#button');

const rootElement: HTMLElement = button.getRootElement();
```

## Events

The Button component supports the following events:

### click
Fires when button is clicked:

```typescript
const button: Button = new Button({
  content: 'Save',
  click: (args?: any): void => {
    console.log('Button clicked', args);
  }
});
button.appendTo('#button');
```

### created
Fires after button is created and rendered:

```typescript
const button: Button = new Button({
  content: 'Button',
  created: (): void => {
    console.log('Button created');
  }
});
button.appendTo('#button');
```

## Usage Examples

### Basic Button
```typescript
import { Button } from '@syncfusion/ej2-buttons';
import { enableRipple } from '@syncfusion/ej2-base';

enableRipple(true);

const button: Button = new Button({
  content: 'Click Me',
  cssClass: 'e-primary'
});
button.appendTo('#button');
```

### Button with Icon
```typescript
const button: Button = new Button({
  content: 'Save',
  iconCss: 'e-icons e-save',
  iconPosition: 'Left',
  cssClass: 'e-primary',
  click: (): void => {
    console.log('Save clicked');
  }
});
button.appendTo('#button');
```

### Toggle Button
```typescript
const button: Button = new Button({
  content: 'Active',
  isToggle: true,
  cssClass: 'e-primary'
});
button.appendTo('#button');

button.element.addEventListener('click', (): void => {
  const isActive = button.element.classList.contains('e-active');
  console.log('Toggle state:', isActive);
});
```

### Dynamic Button
```typescript
class DynamicButton {
  private button: Button;
  private count: number = 0;

  constructor(selector: string) {
    this.button = new Button({
      content: `Clicks: ${this.count}`,
      cssClass: 'e-primary',
      click: (): void => this.increment()
    });
    this.button.appendTo(selector);
  }

  private increment(): void {
    this.count++;
    this.button.content = `Clicks: ${this.count}`;
    this.button.dataBind();
  }
}

const counter = new DynamicButton('#button');
```

## Type Definitions

```typescript
// Button initialization options
interface ButtonModel {
  content?: string;
  cssClass?: string;
  iconCss?: string;
  iconPosition?: 'Left' | 'Right';
  disabled?: boolean;
  isToggle?: boolean;
  enableRtl?: boolean;
  locale?: string;
  enablePersistence?: boolean;
  enableHtmlSanitizer?: boolean;
  htmlAttributes?: any;
  click?: (args?: any) => void;
  created?: () => void;
}

// Button event arguments
interface ButtonClickEventArgs {
  type: string;
  originalEvent: Event;
  target: HTMLElement;
}
```
