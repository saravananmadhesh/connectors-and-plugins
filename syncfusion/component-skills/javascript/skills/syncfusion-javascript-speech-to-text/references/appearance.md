# Appearance Customization

## Table of Contents
- [Customizing the Button](#customizing-the-button)
  - [Setting Start Content](#setting-start-content)
  - [Setting Stop Content](#setting-stop-content)
  - [Setting Icon CSS](#setting-icon-css)
  - [Setting Stop Icon CSS](#setting-stop-icon-css)
  - [Positioning the Button Icon](#positioning-the-button-icon)
  - [Configuring the Primary Button](#configuring-the-primary-button)
  - [Complete Button Configuration Example](#complete-button-configuration-example)
- [Customizing the Tooltip Display](#customizing-the-tooltip-display)
  - [Setting Tooltip Start Content](#setting-tooltip-start-content)
  - [Setting Tooltip Stop Content](#setting-tooltip-stop-content)
  - [Positioning the Tooltip](#positioning-the-tooltip)
  - [Complete Tooltip Configuration Example](#complete-tooltip-configuration-example)
- [Applying Custom Styles with cssClass](#applying-custom-styles-with-cssclass)
  - [Predefined CSS Classes](#predefined-css-classes)
  - [Custom CSS Class Example](#custom-css-class-example)

This guide covers all appearance customization options for the SpeechToText component, including button styling, icon configuration, tooltip customization, and CSS class applications.

## Customizing the Button

The `buttonSettings` property provides comprehensive control over the button's appearance for both start and stop states.

### Setting Start Content

The `content` property defines the text content displayed on the button when the speech recognition is inactive (ready to start).

```typescript
import { SpeechToText, TextArea, TranscriptChangedEventArgs } from "@syncfusion/ej2-inputs";

const speechToText: SpeechToText = new SpeechToText({
    buttonSettings: {
        content: 'Start Listening'
    },
    transcriptChanged: (args: TranscriptChangedEventArgs) => {
        textareaObj.value = args.transcript;
    }
});

speechToText.appendTo('#speechtotext_default');

const textareaObj: TextArea = new TextArea({
    rows: 5,
    cols: 50,
    value: '',
    resizeMode: 'None',
    placeholder: 'Transcribed text will be shown here...'
});
textareaObj.appendTo('#textareaInst');
```

**Best practices:**
- Use clear, action-oriented text ("Start Recording", "Begin Dictation")
- Keep text concise (1-3 words)
- Consider localization for international applications

### Setting Stop Content

The `stopContent` property defines the text content displayed when speech recognition is active (ready to stop).

```typescript
const speechToText: SpeechToText = new SpeechToText({
    buttonSettings: {
        content: 'Start Listening',
        stopContent: 'Stop Listening'
    },
    transcriptChanged: (args: TranscriptChangedEventArgs) => {
        textareaObj.value = args.transcript;
    }
});

speechToText.appendTo('#speechtotext_default');
```

**State behavior:**
- **Inactive state:** Displays `content` text
- **Listening state:** Displays `stopContent` text
- **Transition:** Text changes automatically when state changes

### Setting Icon CSS

The `iconCss` property applies CSS classes to customize the button icon for the start/inactive state. You can use built-in Syncfusion icons or custom icon fonts.

```typescript
const speechToText: SpeechToText = new SpeechToText({
    buttonSettings: {
        content: 'Start',
        iconCss: 'e-icons e-play' // Syncfusion play icon
    },
    transcriptChanged: (args: TranscriptChangedEventArgs) => {
        textareaObj.value = args.transcript;
    }
});

speechToText.appendTo('#speechtotext_default');
```

**Common Syncfusion icons:**
- `e-icons e-play` - Play icon
- `e-icons e-microphone` - Microphone icon
- `e-icons e-voice` - Voice icon
- `e-icons e-circle-record` - Record icon

**Using custom icon fonts (Font Awesome example):**
```typescript
buttonSettings: {
    content: 'Record',
    iconCss: 'fas fa-microphone' // Font Awesome icon
}
```

**Using custom SVG icons:**
```typescript
buttonSettings: {
    content: 'Start',
    iconCss: 'custom-mic-icon' // Your custom CSS class
}
```

```css
.custom-mic-icon::before {
    content: url('path/to/mic-icon.svg');
}
```

### Setting Stop Icon CSS

The `stopIconCss` property applies CSS classes to customize the button icon for the stop/listening state.

```typescript
const speechToText: SpeechToText = new SpeechToText({
    buttonSettings: {
        content: 'Start',
        stopContent: 'Stop',
        iconCss: 'e-icons e-play',
        stopIconCss: 'e-icons e-pause'
    },
    transcriptChanged: (args: TranscriptChangedEventArgs) => {
        textareaObj.value = args.transcript;
    }
});

speechToText.appendTo('#speechtotext_default');
```

**Visual feedback examples:**
- Start: `e-play` → Stop: `e-pause`
- Start: `e-microphone` → Stop: `e-stop`
- Start: `e-circle-record` → Stop: `e-stop-record`

### Positioning the Button Icon

The `iconPosition` property controls where the icon appears relative to the button text. Available positions: `Left`, `Right`, `Top`, `Bottom`.

```typescript
const speechToText: SpeechToText = new SpeechToText({
    buttonSettings: {
        content: 'Start',
        stopContent: 'Stop',
        iconCss: 'e-icons e-play',
        stopIconCss: 'e-icons e-pause',
        iconPosition: 'Right' // Icon on the right side of text
    },
    transcriptChanged: (args: TranscriptChangedEventArgs) => {
        textareaObj.value = args.transcript;
    }
});

speechToText.appendTo('#speechtotext_default');
```

**Position options:**

| Position | Description | Use Case |
|----------|-------------|----------|
| `Left` | Icon before text (default) | Standard button layout |
| `Right` | Icon after text | Emphasize text over icon |
| `Top` | Icon above text | Vertical button layouts |
| `Bottom` | Icon below text | Compact vertical designs |

### Configuring the Primary Button

The `isPrimary` property makes the button visually prominent by applying the primary style. This is equivalent to adding the `e-primary` CSS class.

```typescript
const speechToText: SpeechToText = new SpeechToText({
    buttonSettings: {
        content: 'Start',
        stopContent: 'Stop',
        iconCss: 'e-icons e-play',
        stopIconCss: 'e-icons e-pause',
        isPrimary: true // Apply primary button style
    },
    transcriptChanged: (args: TranscriptChangedEventArgs) => {
        textareaObj.value = args.transcript;
    }
});

speechToText.appendTo('#speechtotext_default');
```

**When to use:**
- Primary action in a form or workflow
- Most important button on the page
- Call-to-action scenarios
- Drawing user attention to the feature

### Complete Button Configuration Example

Here's a comprehensive example combining all button customization options:

```typescript
import { SpeechToText, TextArea, TranscriptChangedEventArgs } from "@syncfusion/ej2-inputs";

const speechToText: SpeechToText = new SpeechToText({
    buttonSettings: {
        content: 'Start',
        stopContent: 'Stop',
        iconCss: 'e-icons e-play',
        stopIconCss: 'e-icons e-pause',
        iconPosition: 'Right',
        isPrimary: true
    },
    transcriptChanged: (args: TranscriptChangedEventArgs) => {
        textareaObj.value = args.transcript;
    }
});

speechToText.appendTo('#speechtotext_default');

const textareaObj: TextArea = new TextArea({
    rows: 5,
    cols: 50,
    value: '',
    resizeMode: 'None',
    placeholder: 'Transcribed text will be shown here...'
});
textareaObj.appendTo('#textareaInst');
```

**HTML:**

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <title>Essential JS 2 - SpeechToText</title>
    <link href="https://cdn.syncfusion.com/ej2/32.1.19/ej2-base/styles/fluent2.css" rel="stylesheet" />
    <link href="https://cdn.syncfusion.com/ej2/32.1.19/ej2-buttons/styles/fluent2.css" rel="stylesheet" />
    <link href="https://cdn.syncfusion.com/ej2/32.1.19/ej2-popups/styles/fluent2.css" rel="stylesheet" />
    <link href="https://cdn.syncfusion.com/ej2/32.1.19/ej2-inputs/styles/fluent2.css" rel="stylesheet" />
</head>
<body>
    <div id="container">
        <button id="speechtotext_default"></button>
        <textarea id="textareaInst"></textarea>
    </div>
</body>
<style>
    #container {
        margin: 50px auto;
        gap: 20px;
        display: flex;
        flex-direction: column;
        align-items: center;
    }
</style>
</html>
```

## Customizing the Tooltip Display

The `tooltipSettings` property allows comprehensive customization of the tooltip content and positioning.

### Setting Tooltip Start Content

The `content` property customizes the tooltip text displayed when hovering over the button in the inactive/start state.

```typescript
import { SpeechToText, TextArea, TranscriptChangedEventArgs } from "@syncfusion/ej2-inputs";

const speechToText: SpeechToText = new SpeechToText({
    tooltipSettings: {
        content: 'Click to start voice recognition'
    },
    transcriptChanged: (args: TranscriptChangedEventArgs) => {
        textareaObj.value = args.transcript;
    }
});

speechToText.appendTo('#speechtotext_default');
```

**Best practices:**
- Provide helpful context about what will happen
- Keep text brief but informative
- Use consistent language with button content

### Setting Tooltip Stop Content

The `stopContent` property customizes the tooltip text displayed when hovering over the button in the listening/stop state.

```typescript
const speechToText: SpeechToText = new SpeechToText({
    tooltipSettings: {
        content: 'Click the button to start recognition',
        stopContent: 'Click the button to stop recognition'
    },
    transcriptChanged: (args: TranscriptChangedEventArgs) => {
        textareaObj.value = args.transcript;
    }
});

speechToText.appendTo('#speechtotext_default');
```

**Tooltip state behavior:**
- **Inactive state:** Shows `content` tooltip
- **Listening state:** Shows `stopContent` tooltip
- **Automatic switching:** Tooltip changes with button state

### Positioning the Tooltip

The `position` property determines where the tooltip appears relative to the button.

```typescript
const speechToText: SpeechToText = new SpeechToText({
    tooltipSettings: {
        position: 'BottomRight',
        content: 'Click the button to start recognition',
        stopContent: 'Click the button to stop recognition'
    },
    transcriptChanged: (args: TranscriptChangedEventArgs) => {
        textareaObj.value = args.transcript;
    }
});

speechToText.appendTo('#speechtotext_default');
```

**Available positions:**

| Position | Description | Use Case |
|----------|-------------|----------|
| `TopLeft` | Above and left-aligned | Upper-left placement |
| `TopCenter` | Directly above, centered | Standard top tooltip |
| `TopRight` | Above and right-aligned | Upper-right placement |
| `BottomLeft` | Below and left-aligned | Lower-left placement |
| `BottomCenter` | Directly below, centered | Standard bottom tooltip |
| `BottomRight` | Below and right-aligned | Lower-right placement |
| `LeftTop` | Left side, top-aligned | Left-side placement |
| `LeftCenter` | Left side, centered | Standard left tooltip |
| `LeftBottom` | Left side, bottom-aligned | Left-bottom placement |
| `RightTop` | Right side, top-aligned | Right-side placement |
| `RightCenter` | Right side, centered | Standard right tooltip |
| `RightBottom` | Right side, bottom-aligned | Right-bottom placement |

**Choosing position:**
- Consider available screen space
- Avoid covering important UI elements
- Test on different screen sizes
- Default positions work well for most cases

### Complete Tooltip Configuration Example

```typescript
import { SpeechToText, TextArea, TranscriptChangedEventArgs } from "@syncfusion/ej2-inputs";

const speechToText: SpeechToText = new SpeechToText({
    tooltipSettings: {
        position: 'BottomRight',
        content: 'Click to begin voice transcription',
        stopContent: 'Click to end voice transcription'
    },
    transcriptChanged: (args: TranscriptChangedEventArgs) => {
        textareaObj.value = args.transcript;
    }
});

speechToText.appendTo('#speechtotext_default');

const textareaObj: TextArea = new TextArea({
    rows: 5,
    cols: 50,
    value: '',
    resizeMode: 'None',
    placeholder: 'Transcribed text will be shown here...'
});
textareaObj.appendTo('#textareaInst');
```

**HTML:**

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <title>Essential JS 2 - SpeechToText</title>
    <link href="https://cdn.syncfusion.com/ej2/32.1.19/ej2-base/styles/fluent2.css" rel="stylesheet" />
    <link href="https://cdn.syncfusion.com/ej2/32.1.19/ej2-buttons/styles/fluent2.css" rel="stylesheet" />
    <link href="https://cdn.syncfusion.com/ej2/32.1.19/ej2-popups/styles/fluent2.css" rel="stylesheet" />
    <link href="https://cdn.syncfusion.com/ej2/32.1.19/ej2-inputs/styles/fluent2.css" rel="stylesheet" />
</head>
<body>
    <div id="container">
        <button id="speechtotext_default"></button>
        <textarea id="textareaInst"></textarea>
    </div>
</body>
<style>
    #container {
        margin: 50px auto;
        gap: 20px;
        display: flex;
        flex-direction: column;
        align-items: center;
    }
</style>
</html>
```

## Applying Custom Styles with cssClass

The `cssClass` property provides a powerful way to apply custom styling to the SpeechToText component. You can use predefined classes or create your own.

### Predefined CSS Classes

Syncfusion provides several predefined CSS classes for quick styling:

| CSS Class | Description | Visual Effect |
|-----------|-------------|---------------|
| `e-primary` | Primary action button | Blue/accent color background |
| `e-outline` | Outlined button | Border only, transparent background |
| `e-info` | Informative action | Blue/info color scheme |
| `e-success` | Positive action | Green color scheme |
| `e-warning` | Warning action | Orange/yellow color scheme |
| `e-danger` | Destructive action | Red color scheme |

**Using predefined classes:**

```typescript
// Primary button (blue accent)
const primarySpeech = new SpeechToText({
    cssClass: 'e-primary'
});
primarySpeech.appendTo('#speech1');

// Success button (green)
const successSpeech = new SpeechToText({
    cssClass: 'e-success'
});
successSpeech.appendTo('#speech2');

// Danger button (red)
const dangerSpeech = new SpeechToText({
    cssClass: 'e-danger'
});
dangerSpeech.appendTo('#speech3');

// Outline style
const outlineSpeech = new SpeechToText({
    cssClass: 'e-outline'
});
outlineSpeech.appendTo('#speech4');
```

### Custom CSS Class Example

Create your own custom styles by defining a CSS class and applying it via `cssClass`:

```typescript
import { SpeechToText, TextArea, TranscriptChangedEventArgs } from "@syncfusion/ej2-inputs";

const speechToText: SpeechToText = new SpeechToText({
    cssClass: 'customSpeechBtn',
    transcriptChanged: (args: TranscriptChangedEventArgs) => {
        textareaObj.value = args.transcript;
    }
});

speechToText.appendTo('#speechtotext_default');

const textareaObj: TextArea = new TextArea({
    rows: 5,
    cols: 50,
    value: '',
    resizeMode: 'None',
    placeholder: 'Transcribed text will be shown here...'
});
textareaObj.appendTo('#textareaInst');
```

**Custom CSS styling:**

```html
<style>
    /* Base custom button style */
    .e-speech-to-text.customSpeechBtn {
        background-color: #ff6347; /* Tomato red */
        color: #fff;
        border-radius: 5px;
        padding: 12px 24px;
        font-weight: bold;
    }

    /* Hover state */
    .e-speech-to-text.customSpeechBtn:hover,
    .e-speech-to-text.customSpeechBtn:focus {
        background-color: #ff4500; /* Orange red */
        box-shadow: 0 4px 8px rgba(255, 69, 0, 0.3);
    }

    /* Active/listening state */
    .e-speech-to-text.customSpeechBtn.e-active {
        background-color: #dc143c; /* Crimson */
        animation: pulse 1.5s infinite;
    }

    /* Pulse animation for listening state */
    @keyframes pulse {
        0% {
            box-shadow: 0 0 0 0 rgba(255, 99, 71, 0.7);
        }
        70% {
            box-shadow: 0 0 0 10px rgba(255, 99, 71, 0);
        }
        100% {
            box-shadow: 0 0 0 0 rgba(255, 99, 71, 0);
        }
    }

    /* Disabled state */
    .e-speech-to-text.customSpeechBtn:disabled {
        background-color: #cccccc;
        color: #666666;
        cursor: not-allowed;
    }
</style>
```

### Advanced Styling Examples

#### Example 1: Rounded Pill Button

```typescript
const speechToText = new SpeechToText({
    cssClass: 'pill-button',
    buttonSettings: {
        content: 'Speak',
        stopContent: 'Stop'
    }
});
speechToText.appendTo('#speechtotext');
```

```css
.e-speech-to-text.pill-button {
    border-radius: 50px;
    padding: 10px 30px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    border: none;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 1px;
}

.e-speech-to-text.pill-button:hover {
    transform: translateY(-2px);
    box-shadow: 0 10px 20px rgba(102, 126, 234, 0.4);
    transition: all 0.3s ease;
}
```

#### Example 2: Neon Glow Effect

```typescript
const speechToText = new SpeechToText({
    cssClass: 'neon-button'
});
speechToText.appendTo('#speechtotext');
```

```css
.e-speech-to-text.neon-button {
    background-color: #0f0f23;
    color: #00ffff;
    border: 2px solid #00ffff;
    border-radius: 8px;
    padding: 12px 24px;
    text-shadow: 0 0 10px #00ffff;
    box-shadow: 0 0 10px #00ffff, 0 0 20px #00ffff, inset 0 0 10px #00ffff;
}

.e-speech-to-text.neon-button:hover {
    background-color: #00ffff;
    color: #0f0f23;
    text-shadow: none;
    box-shadow: 0 0 20px #00ffff, 0 0 40px #00ffff, inset 0 0 20px #00ffff;
}
```

#### Example 3: Minimal Flat Design

```typescript
const speechToText = new SpeechToText({
    cssClass: 'flat-minimal'
});
speechToText.appendTo('#speechtotext');
```

```css
.e-speech-to-text.flat-minimal {
    background-color: transparent;
    color: #333;
    border: 2px solid #333;
    border-radius: 0;
    padding: 10px 20px;
    font-weight: 500;
    transition: all 0.2s ease;
}

.e-speech-to-text.flat-minimal:hover {
    background-color: #333;
    color: white;
}

.e-speech-to-text.flat-minimal.e-active {
    background-color: #333;
    color: white;
    border-color: #000;
}
```

#### Example 4: Glassmorphism Style

```typescript
const speechToText = new SpeechToText({
    cssClass: 'glass-button'
});
speechToText.appendTo('#speechtotext');
```

```css
.e-speech-to-text.glass-button {
    background: rgba(255, 255, 255, 0.1);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.2);
    border-radius: 15px;
    color: white;
    padding: 15px 30px;
    box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
}

.e-speech-to-text.glass-button:hover {
    background: rgba(255, 255, 255, 0.2);
    border: 1px solid rgba(255, 255, 255, 0.3);
}
```

### Combining Classes

You can combine multiple CSS classes for layered styling:

```typescript
const speechToText = new SpeechToText({
    cssClass: 'e-primary custom-padding rounded-corners'
});
speechToText.appendTo('#speechtotext');
```

```css
.e-speech-to-text.custom-padding {
    padding: 15px 40px;
}

.e-speech-to-text.rounded-corners {
    border-radius: 10px;
}
```

## Complete Appearance Example

Here's a comprehensive example combining button, tooltip, and custom styling:

```typescript
import { SpeechToText, TextArea, TranscriptChangedEventArgs } from "@syncfusion/ej2-inputs";

const speechToText: SpeechToText = new SpeechToText({
    // Button customization
    buttonSettings: {
        content: 'Start Recording',
        stopContent: 'Stop Recording',
        iconCss: 'e-icons e-microphone',
        stopIconCss: 'e-icons e-stop',
        iconPosition: 'Left',
        isPrimary: true
    },
    
    // Tooltip customization
    tooltipSettings: {
        position: 'BottomCenter',
        content: 'Click to start voice transcription',
        stopContent: 'Click to stop voice transcription'
    },
    
    // Custom CSS class
    cssClass: 'premium-speech-button',
    
    // Event handling
    transcriptChanged: (args: TranscriptChangedEventArgs) => {
        textareaObj.value = args.transcript;
    }
});

speechToText.appendTo('#speechtotext_default');

const textareaObj: TextArea = new TextArea({
    rows: 5,
    cols: 50,
    value: '',
    resizeMode: 'None',
    placeholder: 'Your voice will be transcribed here...'
});
textareaObj.appendTo('#textareaInst');
```

```css
.e-speech-to-text.premium-speech-button {
    font-size: 16px;
    font-weight: 600;
    padding: 14px 28px;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease;
}

.e-speech-to-text.premium-speech-button:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
}

.e-speech-to-text.premium-speech-button.e-active {
    animation: glow 1.5s infinite alternate;
}

@keyframes glow {
    from {
        box-shadow: 0 0 10px rgba(29, 78, 216, 0.5);
    }
    to {
        box-shadow: 0 0 20px rgba(29, 78, 216, 0.8);
    }
}
```
