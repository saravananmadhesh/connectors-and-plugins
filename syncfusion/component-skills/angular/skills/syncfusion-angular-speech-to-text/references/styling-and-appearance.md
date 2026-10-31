# Styling and Appearance

## Table of Contents
- [CSS Class System](#css-class-system)
- [CSS Classes Overview](#css-classes-overview)
- [Custom Styling with cssClass](#custom-styling-with-cssclass)
- [Theme Configuration](#theme-configuration)
- [HTML Attributes](#html-attributes)
- [Complete Styling Example](#complete-styling-example)

## CSS Class System

The SpeechToText component uses Syncfusion's CSS class system to provide consistent, theme-aware styling. These predefined classes control the button's appearance and state.

## CSS Classes Overview

| cssClass | Description | Use Case |
|----------|-------------|----------|
| `e-primary` | Represents a primary action | Call-to-action buttons |
| `e-outline` | Renders with outline/border style | Secondary actions |
| `e-info` | Informative action styling | Help or information buttons |
| `e-success` | Positive action styling | Confirmation or success actions |
| `e-warning` | Warning state styling | Cautionary actions |
| `e-danger` | Destructive/negative action | Dangerous or irreversible actions |

## Custom Styling with cssClass

Apply predefined CSS classes using the `cssClass` property:

```typescript
import { Component, ViewChild } from '@angular/core';
import { SpeechToTextModule, TextAreaComponent, TextAreaModule, TranscriptChangedEventArgs } from '@syncfusion/ej2-angular-inputs';

@Component({
    imports: [SpeechToTextModule, TextAreaModule],
    standalone: true,
    selector: 'app-root',
    template: `
    <div class="speechText-container">
        <h3>Styled SpeechToText Components</h3>
        
        <!-- Primary button -->
        <button ejs-speechtotext 
                (transcriptChanged)="onTranscriptChange($event)" 
                cssClass="e-primary">
        </button>
        
        <ejs-textarea #outputTextarea 
                      id="textareaInst" 
                      value="" 
                      rows="5" 
                      cols="50" 
                      resizeMode="None" 
                      placeholder="Transcribed text will be shown here...">
        </ejs-textarea>
    </div>`
})
export class AppComponent {
    @ViewChild('outputTextarea') outputTextarea!: TextAreaComponent;
    
    onTranscriptChange(args: TranscriptChangedEventArgs): void {
        this.outputTextarea.value = args.transcript;
    }
}
```

## Theme Configuration

Import the appropriate theme CSS file in your `style.css`:

### Material Design 3 Theme

```css
@import "../node_modules/@syncfusion/ej2-material3-theme/styles/speech-to-text/index.css";
```

### Tailwind 3 CSS Theme

```css
@import "../node_modules/@syncfusion/ej2-tailwind3-theme/styles/speech-to-text/index.css";
```

### Bootstrap 5 Theme

```css
@import "../node_modules/@syncfusion/ej2-bootstrap5-theme/styles/speech-to-text/index.css";
```

## HTML Attributes

Use the `htmlAttributes` property to set custom HTML attributes on the button element:

```typescript
import { Component, ViewChild } from '@angular/core';
import { SpeechToTextModule, TextAreaComponent, TextAreaModule, TranscriptChangedEventArgs } from '@syncfusion/ej2-angular-inputs';

@Component({
    imports: [SpeechToTextModule, TextAreaModule],
    standalone: true,
    selector: 'app-root',
    template: `
    <div class="speechText-container">
        <button ejs-speechtotext 
                (transcriptChanged)="onTranscriptChange($event)" 
                [htmlAttributes]="customAttributes">
        </button>
        <ejs-textarea #outputTextarea 
                      id="textareaInst" 
                      value="" 
                      rows="5" 
                      cols="50" 
                      resizeMode="None" 
                      placeholder="Transcribed text will be shown here...">
        </ejs-textarea>
    </div>`
})
export class AppComponent {
    @ViewChild('outputTextarea') outputTextarea!: TextAreaComponent;
    
    public customAttributes = {
        'data-testid': 'speech-button',
        'aria-label': 'Start speech recognition',
        'title': 'Click to begin voice input'
    };
    
    onTranscriptChange(args: TranscriptChangedEventArgs): void {
        this.outputTextarea.value = args.transcript;
    }
}
```

## Complete Styling Example

Here's a comprehensive example combining themes, CSS classes, and custom styling:

```typescript
import { Component, ViewChild } from '@angular/core';
import { SpeechToTextModule, TextAreaComponent, TextAreaModule, TranscriptChangedEventArgs, ButtonSettingsModel } from '@syncfusion/ej2-angular-inputs';

@Component({
    imports: [SpeechToTextModule, TextAreaModule],
    standalone: true,
    selector: 'app-root',
    template: `
    <div class="speechText-container">
        <h3>Fully Styled SpeechToText Components</h3>
        
        <!-- Primary button -->
        <div class="button-group">
            <h4>Primary Button</h4>
            <button ejs-speechtotext 
                    cssClass="e-primary"
                    (transcriptChanged)="onTranscriptChange($event)"
                    [buttonSettings]="primaryButton">
            </button>
        </div>
        
        <!-- Outline button -->
        <div class="button-group">
            <h4>Outline Button</h4>
            <button ejs-speechtotext 
                    cssClass="e-outline"
                    (transcriptChanged)="onTranscriptChange($event)"
                    [buttonSettings]="outlineButton">
            </button>
        </div>
        
        <!-- Success button -->
        <div class="button-group">
            <h4>Success Button</h4>
            <button ejs-speechtotext 
                    cssClass="e-success"
                    (transcriptChanged)="onTranscriptChange($event)"
                    [buttonSettings]="successButton">
            </button>
        </div>
        
        <!-- Warning button -->
        <div class="button-group">
            <h4>Warning Button</h4>
            <button ejs-speechtotext 
                    cssClass="e-warning"
                    (transcriptChanged)="onTranscriptChange($event)">
            </button>
        </div>
        
        <ejs-textarea #outputTextarea 
                      id="textareaInst" 
                      value="" 
                      rows="5" 
                      cols="50" 
                      resizeMode="None" 
                      placeholder="Transcribed text will be shown here...">
        </ejs-textarea>
    </div>`
})
export class AppComponent {
    @ViewChild('outputTextarea') outputTextarea!: TextAreaComponent;
    
    public primaryButton: ButtonSettingsModel = {
        content: 'Listen',
        stopContent: 'Stop',
        isPrimary: true
    };
    
    public outlineButton: ButtonSettingsModel = {
        content: 'Speak',
        stopContent: 'Recording...'
    };
    
    public successButton: ButtonSettingsModel = {
        content: 'Start',
        stopContent: 'Listening...'
    };
    
    onTranscriptChange(args: TranscriptChangedEventArgs): void {
        this.outputTextarea.value = args.transcript;
    }
}
```

**CSS Styling:**

```css
.speechText-container {
    margin: 50px auto;
    gap: 30px;
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 700px;
    padding: 30px;
    background-color: #f5f5f5;
    border-radius: 8px;
}

.speechText-container h3 {
    color: #333;
    font-size: 28px;
    margin-bottom: 20px;
}

.button-group {
    text-align: center;
    padding: 20px;
    background-color: white;
    border-radius: 6px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    width: 100%;
}

.button-group h4 {
    color: #666;
    margin-bottom: 15px;
    font-size: 14px;
}

/* Custom button styling */
.speechText-container .e-speech-to-text {
    margin: 10px 0;
    padding: 12px 24px;
    border-radius: 4px;
    font-size: 16px;
    font-weight: 500;
}

/* Responsive design */
@media (max-width: 600px) {
    .speechText-container {
        margin: 20px auto;
        padding: 15px;
    }
    
    .speechText-container h3 {
        font-size: 20px;
    }
    
    .button-group {
        padding: 15px;
    }
}
```

## Best Practices

1. **Choose Appropriate Classes**: Use `e-primary` for main actions, `e-outline` for secondary
2. **Consistent Theming**: Select one theme and stick with it across the application
3. **Accessibility**: Use sufficient color contrast; don't rely only on color
4. **Mobile Responsive**: Test styling on different screen sizes
5. **Performance**: Minimize custom CSS overrides
6. **Semantic HTML Attributes**: Use meaningful data attributes for testing and accessibility

## Edge Cases

**Multiple CSS Classes:**
You can apply multiple classes by separating them with spaces:

```typescript
cssClass="e-primary customClass"
```

**Dynamic Class Changes:**
Change CSS classes dynamically based on state:

```typescript
toggleClass(): void {
    if (this.isPrimary) {
        this.buttonClass = 'e-outline';
        this.isPrimary = false;
    } else {
        this.buttonClass = 'e-primary';
        this.isPrimary = true;
    }
}
```

**Override Theme Colors:**
Create custom CSS to override theme defaults:

```css
.speechText-container .e-speech-to-text.e-primary {
    background-color: #custom-color;
    border-color: #custom-border-color;
}
```
