# Button Customization

## Table of Contents
- [ButtonSettingsModel Overview](#buttonsettingsmodel-overview)
- [Start Content](#start-content)
- [Stop Content](#stop-content)
- [Icon Customization](#icon-customization)
- [Icon Positioning](#icon-positioning)
- [Primary Button Styling](#primary-button-styling)
- [Complete Customization Example](#complete-customization-example)

## ButtonSettingsModel Overview

The `ButtonSettingsModel` interface provides comprehensive control over the appearance and behavior of the SpeechToText button. It allows you to customize labels, icons, positioning, and styling.

## Start Content

The `content` property defines the text displayed on the button when speech recognition is inactive (ready to listen):

```typescript
import { Component, ViewChild } from '@angular/core';
import { SpeechToTextModule, TextAreaComponent, TextAreaModule, TranscriptChangedEventArgs, ButtonSettingsModel } from '@syncfusion/ej2-angular-inputs';

@Component({
    imports: [SpeechToTextModule, TextAreaModule],
    standalone: true,
    selector: 'app-root',
    template: `
    <div class="speechText-container">
        <button ejs-speechtotext 
                (transcriptChanged)="onTranscriptChange($event)" 
                [buttonSettings]="buttonSettings">
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
    
    public buttonSettings: ButtonSettingsModel = {
        content: 'Speak Now'  // Text displayed when ready to listen
    };
    
    onTranscriptChange(args: TranscriptChangedEventArgs): void {
        this.outputTextarea.value = args.transcript;
    }
}
```

## Stop Content

The `stopContent` property defines the text displayed while speech recognition is actively listening:

```typescript
public buttonSettings: ButtonSettingsModel = {
    content: 'Start Listening',
    stopContent: 'Stop Listening'  // Text displayed while listening
};
```

This gives users clear visual feedback about what state the component is in.

## Icon Customization

### Start Icon (iconCss)

Apply a CSS class to the icon shown during inactive state:

```typescript
public buttonSettings: ButtonSettingsModel = {
    content: 'Start',
    iconCss: 'e-icons e-play'  // Play icon for start state
};
```

### Stop Icon (stopIconCss)

Apply a CSS class to the icon shown during active listening:

```typescript
public buttonSettings: ButtonSettingsModel = {
    content: 'Start',
    stopContent: 'Stop',
    iconCss: 'e-icons e-play',
    stopIconCss: 'e-icons e-pause'  // Pause icon for stop state
};
```

**Common Icon Classes:**
- `e-play` - Play icon
- `e-pause` - Pause icon
- `e-mic` - Microphone icon
- `e-search` - Search icon
- `e-close` - Close/X icon

## Icon Positioning

The `iconPosition` property controls where the icon appears relative to the text:

```typescript
public buttonSettings: ButtonSettingsModel = {
    content: 'Listen',
    iconCss: 'e-icons e-play',
    iconPosition: 'Right'  // Icon on the right side of text
};
```

**Available Positions:**
- `'Left'` - Icon appears left of the text
- `'Right'` - Icon appears right of the text
- `'Top'` - Icon appears above the text
- `'Bottom'` - Icon appears below the text

**Example with Different Positions:**

```typescript
// Icon on the left
public leftIconSettings: ButtonSettingsModel = {
    content: 'Listen',
    iconCss: 'e-icons e-play',
    iconPosition: 'Left'
};

// Icon on top
public topIconSettings: ButtonSettingsModel = {
    content: 'Speak',
    iconCss: 'e-icons e-play',
    iconPosition: 'Top'
};
```

## Primary Button Styling

The `isPrimary` property applies primary styling to the button, making it more prominent:

```typescript
public buttonSettings: ButtonSettingsModel = {
    content: 'Start Listening',
    stopContent: 'Stop Listening',
    isPrimary: true  // Apply primary styling
};
```

**What isPrimary Does:**
- Applies the primary color from the theme
- Increases visual prominence
- Alternative to manually adding `e-primary` CSS class
- Provides consistent theming

## Complete Customization Example

Here's a comprehensive example combining all button customization options:

```typescript
import { Component, ViewChild } from '@angular/core';
import { SpeechToTextModule, TextAreaComponent, TextAreaModule, TranscriptChangedEventArgs, ButtonSettingsModel } from '@syncfusion/ej2-angular-inputs';

@Component({
    imports: [SpeechToTextModule, TextAreaModule],
    standalone: true,
    selector: 'app-root',
    template: `
    <div class="speechText-container">
        <h3>Customized SpeechToText Button</h3>
        
        <button ejs-speechtotext 
                (transcriptChanged)="onTranscriptChange($event)" 
                [buttonSettings]="customButtonSettings">
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
    
    public customButtonSettings: ButtonSettingsModel = {
        content: 'Click to Speak',          // Text when ready
        stopContent: 'Stop Recording',      // Text while listening
        iconCss: 'e-icons e-play',          // Start icon
        stopIconCss: 'e-icons e-pause',     // Stop icon
        iconPosition: 'Left',               // Icon on left side
        isPrimary: true                     // Apply primary styling
    };
    
    onTranscriptChange(args: TranscriptChangedEventArgs): void {
        this.outputTextarea.value = args.transcript;
    }
}
```

**CSS for Styling:**

```css
.speechText-container {
    margin: 50px auto;
    gap: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 600px;
}

.speechText-container h3 {
    color: #333;
    margin-bottom: 20px;
}

/* Custom button styling if needed */
.speechText-container .e-speech-to-text {
    padding: 10px 20px;
    border-radius: 4px;
}
```

## Best Practices

1. **Keep Labels Short**: Use concise text like "Listen" or "Speak" for better UX
2. **Use Contrasting Icons**: Choose icons that clearly indicate the action
3. **Primary Styling**: Use `isPrimary: true` for call-to-action buttons
4. **Consistent Positioning**: Keep icon positions consistent across your application
5. **Test Accessibility**: Ensure labels are clear for screen readers
6. **Consider RTL**: If supporting RTL languages, test icon positioning

## Edge Cases

**Empty Content:**
If you don't specify `content`, the button will show a default microphone icon.

**Same Icon for Both States:**
If both states need the same icon, provide only `iconCss`:

```typescript
public buttonSettings: ButtonSettingsModel = {
    content: 'Listen',
    stopContent: 'Listening...',
    iconCss: 'e-icons e-mic'  // Same icon for both states
};
```

**Dynamic Content Change:**
You can update button settings after initialization:

```typescript
updateButtonSettings(): void {
    this.customButtonSettings.content = 'New Label';
}
```
