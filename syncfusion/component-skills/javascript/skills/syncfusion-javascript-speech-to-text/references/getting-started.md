# Getting Started with SpeechToText

This guide walks you through setting up and creating your first SpeechToText component in a TypeScript application using Syncfusion Essential JS 2.

## Installation

Install the SpeechToText package from npm:

```bash
npm install @syncfusion/ej2-inputs --save
```

All dependencies are automatically installed when you install `@syncfusion/ej2-inputs`.

## Importing CSS Styles

To install the fluent2 theme package, use the following command:

```bash
npm install @syncfusion/ej2-fluent2-theme --save
```

Import the following styles in your `~/src/styles/styles.css` file:

```css
@import "../../node_modules/@syncfusion/ej2-fluent2-theme/styles/speech-to-text/index.css";
```

**Available themes:**
- `tailwind3.css` - Tailwind CSS v3 theme
- `material.css` - Material Design theme
- `bootstrap5.css` - Bootstrap 5 theme
- `fabric.css` - Fabric theme
- `fluent.css` - Fluent theme
- `bootstrap4.css` - Bootstrap 4 theme

Choose the theme that matches your application's design system.

## Adding SpeechToText to Your Application

### Step 1: Update HTML File

Add a button element with an ID attribute in your `index.html` file:

**File:** `[src/index.html]`

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <title>Essential JS 2 SpeechToText</title>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no" />
    <meta name="description" content="Essential JS 2 SpeechToText" />
    <meta name="author" content="Syncfusion" />
    <link rel="shortcut icon" href="resources/favicon.ico" />
    <link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" rel="stylesheet" />
</head>
<body>
    <div id="container">
        <button id="speechtotext_default"></button>
    </div>
</body>
</html>
```

The button element (`#speechtotext_default`) serves as the target for the SpeechToText component.

### Step 2: Initialize SpeechToText in TypeScript

Import and initialize the SpeechToText control in your `app.ts` file:

**File:** `[src/app/app.ts]`

```typescript
import { SpeechToText } from "@syncfusion/ej2-inputs";

// Initialize the SpeechToText control
const speechToText: SpeechToText = new SpeechToText({});

// Render the component
speechToText.appendTo('#speechtotext_default');
```

This creates a basic SpeechToText button with default settings.

## Running Your Application

Start the development server:

```bash
npm start
```

**What you'll see:**
- A microphone button that starts/stops speech recognition
- Click the button to begin recording
- The button icon changes to indicate listening state
- Click again to stop recording

## Complete Working Example

Here's a complete example with a textarea to display transcribed text:

**TypeScript:**

```typescript
import { SpeechToText, TextArea, TranscriptChangedEventArgs } from "@syncfusion/ej2-inputs";

// Initialize SpeechToText control
const speechToText: SpeechToText = new SpeechToText({
    transcriptChanged: (args: TranscriptChangedEventArgs) => {
        // Update textarea with transcribed text
        textareaObj.value = args.transcript;
    }
});

// Render initialized SpeechToText
speechToText.appendTo('#speechtotext_default');

// Create textarea to display transcription
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
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no" />
    <meta name="description" content="Essential JS 2" />
    <meta name="author" content="Syncfusion" />
    <link href="https://cdn.syncfusion.com/ej2/32.1.19/ej2-base/styles/fluent2.css" rel="stylesheet" />
    <link href="https://cdn.syncfusion.com/ej2/32.1.19/ej2-buttons/styles/fluent2.css" rel="stylesheet" />
    <link href="https://cdn.syncfusion.com/ej2/32.1.19/ej2-popups/styles/fluent2.css" rel="stylesheet" />
    <link href="https://cdn.syncfusion.com/ej2/32.1.19/ej2-inputs/styles/fluent2.css" rel="stylesheet" />
</head>
<body>
    <div id='loader'>LOADING....</div>
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

## Adding Button Content

Customize the button text for start and stop states using the `buttonSettings` property:

```typescript
import { SpeechToText, TextArea, TranscriptChangedEventArgs } from "@syncfusion/ej2-inputs";

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

const textareaObj: TextArea = new TextArea({
    rows: 5,
    cols: 50,
    value: '',
    resizeMode: 'None',
    placeholder: 'Transcribed text will be shown here...'
});
textareaObj.appendTo('#textareaInst');
```

**Result:** The button displays "Start Listening" when idle and "Stop Listening" when actively recording.

## Important Notes

### Internet Connection Required

The SpeechToText control requires an active internet connection to function because it relies on browser-based speech recognition services (typically provided by Google or Microsoft).

**What happens without internet:**
- Speech recognition will fail
- An error event will be triggered
- Users should see an appropriate error message

### Browser Support

The component uses the Web Speech API, which is not universally supported:

**Supported browsers:**
- Chrome 25+
- Edge 79+
- Safari 12+
- Opera 30+

**Not supported:**
- Firefox (no Web Speech API support)
- Internet Explorer

**Best practice:** Check for browser support before initializing the component:

```typescript
if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
    // Initialize SpeechToText
    const speechToText = new SpeechToText({});
    speechToText.appendTo('#speechtotext_default');
} else {
    // Show fallback message
    document.getElementById('speechtotext_default').innerHTML = 
        'Speech recognition is not supported in your browser.';
}
```

## Common Issues and Solutions

### Issue 1: Microphone Permission Denied

**Problem:** Browser blocks microphone access.

**Solution:** 
- Ensure the application is served over HTTPS (required in production)
- Request permissions explicitly and inform users why microphone access is needed
- Check browser settings to ensure microphone permissions are not blocked

### Issue 2: No Speech Detected

**Problem:** Component starts listening but doesn't capture audio.

**Solution:**
- Verify microphone is connected and working
- Check system audio settings
- Ensure microphone is not muted
- Try speaking louder or closer to the microphone

### Issue 3: Inaccurate Transcription

**Problem:** Transcribed text doesn't match spoken words.

**Solution:**
- Set the correct language using the `lang` property
- Speak clearly and at a moderate pace
- Reduce background noise
- Use a better quality microphone

### Issue 4: Component Not Rendering

**Problem:** Button doesn't appear on the page.

**Solution:**
- Verify CSS files are properly imported
- Check that the target element ID matches (`#speechtotext_default`)
- Ensure scripts are loaded after the DOM is ready
- Check browser console for errors

## Quick Reference

**Minimal setup:**
```typescript
import { SpeechToText } from "@syncfusion/ej2-inputs";
const speechToText = new SpeechToText({});
speechToText.appendTo('#element');
```

**With transcript handling:**
```typescript
const speechToText = new SpeechToText({
    transcriptChanged: (args) => {
        console.log(args.transcript);
    }
});
speechToText.appendTo('#element');
```

**With custom button text:**
```typescript
const speechToText = new SpeechToText({
    buttonSettings: {
        content: 'Start',
        stopContent: 'Stop'
    }
});
speechToText.appendTo('#element');
```
