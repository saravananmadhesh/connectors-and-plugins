# Tooltip Configuration

## Table of Contents
- [TooltipSettingsModel Overview](#tooltipsettingsmodel-overview)
- [Start Content](#start-content)
- [Stop Content](#stop-content)
- [Tooltip Positioning](#tooltip-positioning)
- [Complete Example](#complete-example)

## TooltipSettingsModel Overview

The `TooltipSettingsModel` interface allows you to customize the tooltip that appears when hovering over the SpeechToText button. This helps users understand the button's purpose before interacting with it.

## Start Content

The `content` property defines the tooltip text displayed when the speech recognition is inactive:

```typescript
import { Component, ViewChild } from '@angular/core';
import { SpeechToTextModule, TextAreaComponent, TextAreaModule, TranscriptChangedEventArgs, TooltipSettingsModel } from '@syncfusion/ej2-angular-inputs';

@Component({
    imports: [SpeechToTextModule, TextAreaModule],
    standalone: true,
    selector: 'app-root',
    template: `
    <div class="speechText-container">
        <button ejs-speechtotext 
                (transcriptChanged)="onTranscriptChange($event)" 
                [tooltipSettings]="tooltipSettings">
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
    
    public tooltipSettings: TooltipSettingsModel = {
        content: 'Click the button to start speaking'  // Tooltip when ready
    };
    
    onTranscriptChange(args: TranscriptChangedEventArgs): void {
        this.outputTextarea.value = args.transcript;
    }
}
```

## Stop Content

The `stopContent` property defines the tooltip text displayed while speech recognition is actively listening:

```typescript
public tooltipSettings: TooltipSettingsModel = {
    content: 'Click the button to start speaking',
    stopContent: 'Click the button to stop listening'  // Tooltip while listening
};
```

This provides clear guidance to users about what happens when they interact with the button in different states.

## Tooltip Positioning

The `position` property controls where the tooltip appears relative to the button:

```typescript
public tooltipSettings: TooltipSettingsModel = {
    content: 'Start listening',
    position: 'TopCenter'  // Tooltip above the button, centered
};
```

**Available Positions:**
- `'TopCenter'` - Above the button, centered
- `'TopLeft'` - Above the button, left-aligned
- `'TopRight'` - Above the button, right-aligned
- `'BottomCenter'` - Below the button, centered
- `'BottomLeft'` - Below the button, left-aligned
- `'BottomRight'` - Below the button, right-aligned
- `'LeftCenter'` - Left of the button, centered
- `'RightCenter'` - Right of the button, centered

## Complete Example

Here's a comprehensive example with all tooltip customization options:

```typescript
import { Component, ViewChild } from '@angular/core';
import { SpeechToTextModule, TextAreaComponent, TextAreaModule, TranscriptChangedEventArgs, TooltipSettingsModel } from '@syncfusion/ej2-angular-inputs';

@Component({
    imports: [SpeechToTextModule, TextAreaModule],
    standalone: true,
    selector: 'app-root',
    template: `
    <div class="speechText-container">
        <h3>SpeechToText with Custom Tooltips</h3>
        
        <button ejs-speechtotext 
                (transcriptChanged)="onTranscriptChange($event)" 
                [tooltipSettings]="customTooltipSettings">
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
    
    public customTooltipSettings: TooltipSettingsModel = {
        position: 'BottomRight',
        content: 'Click to start speech recognition',
        stopContent: 'Click to stop recording and process the audio'
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
    gap: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    max-width: 600px;
    padding: 30px;
}

.speechText-container h3 {
    color: #333;
    margin-bottom: 30px;
    font-size: 24px;
}
```

## Tooltip with Button Customization

Combine tooltip and button settings for a fully customized experience:

```typescript
public buttonSettings: ButtonSettingsModel = {
    content: 'Listen',
    stopContent: 'Stop',
    iconCss: 'e-icons e-play',
    stopIconCss: 'e-icons e-pause',
    isPrimary: true
};

public tooltipSettings: TooltipSettingsModel = {
    position: 'TopCenter',
    content: 'Press to start listening',
    stopContent: 'Press to stop listening'
};
```

## Best Practices

1. **Keep Tooltips Concise**: Use short, actionable text (under 50 characters)
2. **Consistent Positioning**: Choose a position that doesn't obscure the UI
3. **Helpful Text**: Provide useful information about the button's action
4. **Different States**: Use different messages for start and stop states
5. **Accessibility**: Tooltips complement but don't replace ARIA labels
6. **Mobile Consideration**: Tooltips on hover may not work well on mobile devices

## Disabling Tooltips

If you want to hide tooltips completely, use the `showTooltip` property in the main component:

```typescript
<button ejs-speechtotext 
        [showTooltip]="false"
        (transcriptChanged)="onTranscriptChange($event)">
</button>
```

## Dynamic Tooltip Updates

Update tooltip content dynamically based on application state:

```typescript
updateTooltipContent(): void {
    this.customTooltipSettings.content = 'Updated: ' + new Date().toLocaleTimeString();
}
```

## Edge Cases

**No Tooltip Content Provided:**
If `content` is not specified, the default tooltip text will be shown.

**Same Tooltip for Both States:**
If both states need the same tooltip, provide only `content`:

```typescript
public tooltipSettings: TooltipSettingsModel = {
    position: 'BottomCenter',
    content: 'Use voice input to transcribe text'
};
```

**Position Out of Viewport:**
If the specified position would place the tooltip outside the visible area, the browser's tooltip API automatically adjusts it.
