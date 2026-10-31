# Button and Tooltip Customization

## Table of Contents
- [Button Settings via Tag Helper](#button-settings-via-tag-helper)
- [Customizing Button Content](#customizing-button-content)
- [Icon Customization](#icon-customization)
- [Icon Positioning](#icon-positioning)
- [Primary Button Styling](#primary-button-styling)
- [Show or Hide Tooltip](#show-or-hide-tooltip)
- [Tooltip Configuration](#tooltip-configuration)
- [CSS Class Styling](#css-class-styling)
- [Complete Customization Examples](#complete-customization-examples)

## Button Settings via Tag Helper

The `<e-speechtotext-buttonSettings>` tag helper allows comprehensive button customization:

```razor
@using Syncfusion.EJ2.Inputs

<ejs-speechtotext id="speech-custom">
    <e-speechtotext-buttonSettings 
        content="Start" 
        stopContent="Stop"
        iconCss="e-icons e-play"
        stopIconCss="e-icons e-pause"
        iconPosition="Right"
        isPrimary="true">
    </e-speechtotext-buttonSettings>
</ejs-speechtotext>
```

## Customizing Button Content

### Setting Button Text

```razor
@using Syncfusion.EJ2.Inputs

<ejs-speechtotext id="speech-text">
    <e-speechtotext-buttonSettings 
        content="Start Listening"
        stopContent="Stop Listening">
    </e-speechtotext-buttonSettings>
</ejs-speechtotext>
```

### Minimal Button Text

```razor
@using Syncfusion.EJ2.Inputs

<ejs-speechtotext id="speech-minimal">
    <e-speechtotext-buttonSettings 
        content="Start"
        stopContent="Stop">
    </e-speechtotext-buttonSettings>
</ejs-speechtotext>
```

### Icon-Only Button

```razor
@using Syncfusion.EJ2.Inputs

<ejs-speechtotext id="speech-icon">
    <e-speechtotext-buttonSettings 
        content=""
        stopContent=""
        iconCss="e-icons e-mic"
        stopIconCss="e-icons e-close">
    </e-speechtotext-buttonSettings>
</ejs-speechtotext>
```

## Icon Customization

### Available Icon Classes

Syncfusion provides predefined icons:
- `e-icons e-play` - Play icon
- `e-icons e-pause` - Pause icon
- `e-icons e-stop` - Stop icon
- `e-icons e-mic` - Microphone icon
- `e-icons e-speaker` - Speaker icon
- `e-icons e-close` - Close icon

### Setting Icons

```razor
@using Syncfusion.EJ2.Inputs

<ejs-speechtotext id="speech-icons">
    <e-speechtotext-buttonSettings 
        content="Record"
        stopContent="Stop"
        iconCss="e-icons e-play"
        stopIconCss="e-icons e-pause">
    </e-speechtotext-buttonSettings>
</ejs-speechtotext>
```

### Microphone and Stop Icons

```razor
@using Syncfusion.EJ2.Inputs

<ejs-speechtotext id="speech-mic">
    <e-speechtotext-buttonSettings 
        iconCss="e-icons e-mic"
        stopIconCss="e-icons e-stop"
        content="Listen"
        stopContent="Stop">
    </e-speechtotext-buttonSettings>
</ejs-speechtotext>
```

## Icon Positioning

Control icon placement relative to text:

### Available Positions
- `Left` - Icon on left (default)
- `Right` - Icon on right
- `Top` - Icon above
- `Bottom` - Icon below

### Examples

```razor
@using Syncfusion.EJ2.Inputs

<!-- Icon on right -->
<ejs-speechtotext id="speech-right">
    <e-speechtotext-buttonSettings 
        content="Start"
        iconPosition="Right"
        iconCss="e-icons e-play">
    </e-speechtotext-buttonSettings>
</ejs-speechtotext>

<!-- Icon on top -->
<ejs-speechtotext id="speech-top">
    <e-speechtotext-buttonSettings 
        content="Record"
        iconPosition="Top"
        iconCss="e-icons e-mic">
    </e-speechtotext-buttonSettings>
</ejs-speechtotext>

<!-- Icon on bottom -->
<ejs-speechtotext id="speech-bottom">
    <e-speechtotext-buttonSettings 
        content="Listen"
        iconPosition="Bottom"
        iconCss="e-icons e-speaker">
    </e-speechtotext-buttonSettings>
</ejs-speechtotext>
```

## Primary Button Styling

The `isPrimary` attribute makes the button visually prominent:

```razor
@using Syncfusion.EJ2.Inputs

<ejs-speechtotext id="speech-primary">
    <e-speechtotext-buttonSettings 
        content="Start Recording"
        stopContent="Stop Recording"
        isPrimary="true">
    </e-speechtotext-buttonSettings>
</ejs-speechtotext>
```

### Combined with Other Settings

```razor
@using Syncfusion.EJ2.Inputs

<ejs-speechtotext id="speech-advanced">
    <e-speechtotext-buttonSettings 
        content="Start"
        stopContent="Stop"
        iconCss="e-icons e-play"
        stopIconCss="e-icons e-stop"
        iconPosition="Right"
        isPrimary="true">
    </e-speechtotext-buttonSettings>
</ejs-speechtotext>
```

## Show or Hide Tooltip

The `showTooltip` attribute controls whether the tooltip is displayed when hovering over the button. It is `true` by default. Set it to `false` to disable the tooltip entirely, regardless of any `tooltipSettings` configuration.

### Disabling the Tooltip

```razor
@using Syncfusion.EJ2.Inputs

<ejs-speechtotext id="speech-no-tooltip" showTooltip="false"></ejs-speechtotext>
```

### Enabling the Tooltip (Default)

```razor
@using Syncfusion.EJ2.Inputs

<ejs-speechtotext id="speech-with-tooltip" showTooltip="true"></ejs-speechtotext>
```

### Toggling Tooltip Programmatically

```razor
@using Syncfusion.EJ2.Inputs

<ejs-speechtotext id="speech-toggle-tooltip"></ejs-speechtotext>

<div style="margin-top: 10px;">
    <button onclick="toggleTooltip(true)">Show Tooltip</button>
    <button onclick="toggleTooltip(false)">Hide Tooltip</button>
</div>

<script>
    function toggleTooltip(show) {
        var speechComponent = ej.base.getComponent(
            document.getElementById("speech-toggle-tooltip"),
            "speechtotext"
        );
        speechComponent.showTooltip = show;
    }
</script>
```

## Tooltip Configuration

The `<e-speechtotext-tooltipSettings>` tag helper customizes tooltip display:

```razor
@using Syncfusion.EJ2.Inputs

<ejs-speechtotext id="speech-tooltip">
    <e-speechtotext-tooltipSettings 
        content="Click to start speech recognition"
        stopContent="Click to stop recording"
        position="TopCenter">
    </e-speechtotext-tooltipSettings>
</ejs-speechtotext>
```

### Tooltip Positions

- `TopCenter` - Above, centered
- `TopLeft` - Above, left
- `TopRight` - Above, right
- `BottomCenter` - Below, centered
- `BottomLeft` - Below, left
- `BottomRight` - Below, right
- `LeftCenter` - Left side
- `RightCenter` - Right side

### Tooltip Examples

```razor
@using Syncfusion.EJ2.Inputs

<!-- Top Center -->
<ejs-speechtotext id="speech-top-center">
    <e-speechtotext-tooltipSettings 
        position="TopCenter"
        content="Start speaking">
    </e-speechtotext-tooltipSettings>
</ejs-speechtotext>

<!-- Bottom Right -->
<ejs-speechtotext id="speech-bottom-right">
    <e-speechtotext-tooltipSettings 
        position="BottomRight"
        content="Press to record"
        stopContent="Press to stop">
    </e-speechtotext-tooltipSettings>
</ejs-speechtotext>
```

## CSS Class Styling

Apply predefined or custom CSS classes:

### Predefined Classes

```razor
@using Syncfusion.EJ2.Inputs

<!-- Primary style -->
<ejs-speechtotext id="speech-primary" cssClass="e-primary"></ejs-speechtotext>

<!-- Success style -->
<ejs-speechtotext id="speech-success" cssClass="e-success"></ejs-speechtotext>

<!-- Info style -->
<ejs-speechtotext id="speech-info" cssClass="e-info"></ejs-speechtotext>

<!-- Warning style -->
<ejs-speechtotext id="speech-warning" cssClass="e-warning"></ejs-speechtotext>

<!-- Danger style -->
<ejs-speechtotext id="speech-danger" cssClass="e-danger"></ejs-speechtotext>

<!-- Outline style -->
<ejs-speechtotext id="speech-outline" cssClass="e-outline"></ejs-speechtotext>
```

### Custom CSS Classes

```razor
@using Syncfusion.EJ2.Inputs

<style>
    .custom-voice-btn.e-btn {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        border: none;
        border-radius: 25px;
        padding: 12px 30px;
        font-weight: bold;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
        transition: all 0.3s ease;
    }
    
    .custom-voice-btn.e-btn:hover {
        box-shadow: 0 6px 20px rgba(0, 0, 0, 0.3);
        transform: translateY(-2px);
    }
    
    .custom-voice-btn.e-btn:active {
        transform: translateY(0);
    }
</style>

<ejs-speechtotext id="speech-custom" cssClass="custom-voice-btn"></ejs-speechtotext>
```

## Complete Customization Examples

### Example 1: Modern Voice Button

```razor
@using Syncfusion.EJ2.Inputs

<div style="padding: 20px;">
    <h3>Modern Voice Input</h3>
    
    <ejs-speechtotext id="speech-modern"
        onStart="onStart"
        onStop="onStop"
        transcriptChanged="onTranscript">
        <e-speechtotext-buttonSettings 
            content="Start"
            stopContent="Stop"
            iconCss="e-icons e-play"
            stopIconCss="e-icons e-stop"
            iconPosition="Right"
            isPrimary="true">
        </e-speechtotext-buttonSettings>
        <e-speechtotext-tooltipSettings 
            position="TopCenter"
            content="Click to start recording"
            stopContent="Click to stop recording">
        </e-speechtotext-tooltipSettings>
    </ejs-speechtotext>
    
    <div id="status" style="marginTop: 10px; color: #666;"></div>
</div>

<script>
    function onStart() {
        document.getElementById("status").textContent = "🎤 Recording...";
        document.getElementById("status").style.color = "#ff6b6b";
    }
    
    function onStop() {
        document.getElementById("status").textContent = "✓ Stopped";
        document.getElementById("status").style.color = "#51cf66";
    }
    
    function onTranscript(args) {
        console.log("Transcript:", args.transcript);
    }
</script>
```

### Example 2: Minimalist Design

```razor
@using Syncfusion.EJ2.Inputs

<style>
    .minimalist-btn.e-btn {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        padding: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: #f0f0f0;
        border: 2px solid #ddd;
        font-size: 20px;
    }
    
    .minimalist-btn.e-btn:hover {
        background-color: #e0e0e0;
    }
</style>

<ejs-speechtotext id="speech-minimal" cssClass="minimalist-btn">
    <e-speechtotext-buttonSettings 
        content=""
        stopContent=""
        iconCss="e-icons e-mic"
        stopIconCss="e-icons e-close">
    </e-speechtotext-buttonSettings>
</ejs-speechtotext>
```

### Example 3: Accessible Voice Input

```razor
@using Syncfusion.EJ2.Inputs

<div style="padding: 20px; maxWidth: 400px;">
    <label for="voice-input" style="display: block; marginBottom: 10px; fontWeight: bold;">
        Voice Input Control
    </label>
    
    <ejs-speechtotext id="voice-input">
        <e-speechtotext-buttonSettings 
            content="Start Voice Input"
            stopContent="Stop Voice Input"
            iconCss="e-icons e-play"
            stopIconCss="e-icons e-pause"
            iconPosition="Left"
            isPrimary="true">
        </e-speechtotext-buttonSettings>
        <e-speechtotext-tooltipSettings 
            position="TopCenter"
            content="Press enter or click to activate voice input. Speak clearly into your microphone.">
        </e-speechtotext-tooltipSettings>
    </ejs-speechtotext>
    
    <p style="fontSize: 14px; color: #666; marginTop: 10px;">
        Use this button to provide voice input. Speak naturally and pause between sentences.
    </p>
</div>
```

## Troubleshooting

### Icons not showing
- Ensure CSS is imported for icon font
- Verify icon class names are correct
- Check browser console for 404 errors

### Tooltip not appearing
- Verify position property matches enum values
- Check that stopContent is set for both states
- Ensure tooltip container has sufficient space

### Custom CSS not applying
- Check CSS specificity - may need higher specificity
- Use browser DevTools to inspect applied styles
- Verify class name matches exactly

