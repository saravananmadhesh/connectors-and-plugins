# Getting Started with SpeechToText Component

## Table of Contents
- [Installation](#installation)
- [Project Setup](#project-setup)
- [CSS Theme Import](#css-theme-import)
- [Module Import](#module-import)
- [Basic Rendering](#basic-rendering)
- [Customizing Button Content](#customizing-button-content)
- [Complete Example](#complete-example)

## Installation

The Syncfusion Angular SpeechToText component is part of the `@syncfusion/ej2-angular-inputs` package. Install it using npm:

### Ivy Package (Angular 12+)

For modern Angular projects (version 12 and above), use the Ivy library distribution:

```bash
npm install @syncfusion/ej2-angular-inputs --save
```

This command installs the package with Ivy distribution format, which provides optimal tree-shaking and smaller bundle sizes.

## Project Setup

Ensure you have Angular CLI installed:

```bash
npm install -g @angular/cli
```

Create a new Angular application:

```bash
ng new my-app
cd my-app
```

## CSS Theme Import

To install the material3 theme package, use the following command:

```bash
npm install @syncfusion/ej2-material3-theme --save
```

Add CSS imports to `style.css` to apply the theme:

```css
@import "../node_modules/@syncfusion/ej2-material3-theme/styles/speech-to-text/index.css";
```

**Available Themes:**
- `material3.css` - Material Design 3 theme
- `tailwind3.css` - Tailwind CSS theme
- `bootstrap5.css` - Bootstrap 5 theme

Choose one theme based on your design requirements.

## Module Import

Import the `SpeechToTextModule` in your component:

```typescript
import { SpeechToTextModule } from '@syncfusion/ej2-angular-inputs';

@Component({
    imports: [SpeechToTextModule],
    standalone: true,
    selector: 'app-root',
    template: `<button ejs-speechtotext></button>`
})
export class AppComponent { }
```

## Basic Rendering

The simplest way to render a SpeechToText component is to add the `ejs-speechtotext` directive to a button element:

```typescript
import { Component } from '@angular/core';
import { SpeechToTextModule } from '@syncfusion/ej2-angular-inputs';

@Component({
    imports: [SpeechToTextModule],
    standalone: true,
    selector: 'app-root',
    template: `
    <div style="width: 40px; margin: 50px auto;">
        <button ejs-speechtotext></button>
    </div>`
})
export class AppComponent { }
```

## Customizing Button Content

The button content can be customized for both active and inactive states:

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
        content: 'Start Listening',
        stopContent: 'Stop Listening'
    };
    
    onTranscriptChange(args: TranscriptChangedEventArgs): void {
        this.outputTextarea.value = args.transcript;
    }
}
```

## Complete Example

Here's a complete working example with all necessary setup:

**app.component.ts:**

```typescript
import { Component, ViewChild } from '@angular/core';
import { SpeechToTextModule, TextAreaComponent, TextAreaModule, TranscriptChangedEventArgs } from '@syncfusion/ej2-angular-inputs';

@Component({
    imports: [SpeechToTextModule, TextAreaModule],
    standalone: true,
    selector: 'app-root',
    template: `
    <div class="speechText-container">
        <button ejs-speechtotext (transcriptChanged)="onTranscriptChange($event)"></button>
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

**style.css:**

```css
@import "../node_modules/@syncfusion/ej2-tailwind3-theme/styles/speech-to-text/index.css";

.speechText-container {
    margin: 50px auto;
    gap: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
}
```

**index.html:**

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <title>EJ2 Angular Speech To Text</title>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="Angular Speech To Text Component" />
    <meta name="author" content="Syncfusion" />
    <link href="index.css" rel="stylesheet" />
</head>
<body>
    <div id="wrapper">
        <app-root>
            <div id='loader'>LOADING....</div>
        </app-root>
    </div>
</body>
</html>
```

## Running the Application

Start the development server:

```bash
ng serve
```

Navigate to `http://localhost:4200/` in your browser. You should see the SpeechToText button component ready to capture speech input.

## Requirements

- **Browser Support**: Speech Recognition API is required (Chrome 25+, Edge 79+, Safari 12+, Opera 30+)
- **Active Internet Connection**: Required for speech processing
- **Microphone**: Connected and available on the system
- **User Permission**: Grant microphone access when prompted by the browser
