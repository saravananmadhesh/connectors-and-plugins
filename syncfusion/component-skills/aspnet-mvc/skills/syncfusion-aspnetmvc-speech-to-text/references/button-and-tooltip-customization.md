# Button and Tooltip Customization

## Table of Contents
- [Button Settings Basics](#button-settings-basics)
- [Custom Button Content](#custom-button-content)
- [Button Icons](#button-icons)
- [Tooltip Settings](#tooltip-settings)
- [Advanced Customization](#advanced-customization)
- [Responsive Design](#responsive-design)
- [Practical Examples](#practical-examples)

## Button Settings Basics

### Default Button

The basic Speech To Text component includes a default button:

```razor
@using Syncfusion.EJ2

@Html.EJS().SpeechToText("voice")
    .Render()
```

### Basic Button Customization

Customize button text and appearance:

```razor
@using Syncfusion.EJ2

@Html.EJS().SpeechToText("voice")
    .ButtonSettings(bs => bs
        .Content("🎤 Start Recording")
    )
    .Render()
```

### ButtonSettings Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `Content` | string | `""` | Button label shown in the **start** (idle) state |
| `StopContent` | string | `""` | Button label shown in the **stop** (active recording) state |
| `IconCss` | string | `"e-icons e-microphone"` | Icon CSS class for the **start** state |
| `StopIconCss` | string | `""` | Icon CSS class for the **stop** state |
| `IconPosition` | `IconPosition` enum | `IconPosition.Left` | Position of the icon relative to the button text (`Left` or `Right`) |
| `IsPrimary` | bool | `false` | Renders the button with primary styling when `true` |
| `CssClass` | string | `""` | Additional CSS class applied to the button element |

## Custom Button Content

### Text-Only Button

```razor
@using Syncfusion.EJ2

@Html.EJS().SpeechToText("voice")
    .ButtonSettings(bs => bs
        .Content("Activate Voice Input")
    )
    .Render()
```

### Icon-Only Button

```razor
@using Syncfusion.EJ2

@Html.EJS().SpeechToText("voice")
    .ButtonSettings(bs => bs
        .Content("")
        .IconCss("e-icons e-microphone")
    )
    .Render()
```

### Icon and Text

```razor
@using Syncfusion.EJ2

@Html.EJS().SpeechToText("voice")
    .ButtonSettings(bs => bs
        .Content("Click to speak")
        .IconCss("e-icons e-microphone")
    )
    .Render()
```

### Using Emoji

```razor
@using Syncfusion.EJ2

@Html.EJS().SpeechToText("voice1")
    .ButtonSettings(bs => bs
        .Content("🎤 Speak Now")
    )
    .Render()

@Html.EJS().SpeechToText("voice2")
    .ButtonSettings(bs => bs
        .Content("🔴 Recording...")
    )
    .Render()

@Html.EJS().SpeechToText("voice3")
    .ButtonSettings(bs => bs
        .Content("✅ Done")
    )
    .Render()
```

### Start and Stop Content

Use `StopContent` and `StopIconCss` to declaratively set separate button labels and icons for the active recording state. This is the correct approach — no DOM manipulation required.

```razor
@using Syncfusion.EJ2

@Html.EJS().SpeechToText("voice")
    .ButtonSettings(bs => bs
        .Content("Start Recording")
        .StopContent("Stop Recording")
        .IconCss("e-icons e-microphone")
        .StopIconCss("e-icons e-stop")
    )
    .Render()
```

When the user clicks the button to begin recognition, the component automatically switches to `StopContent` / `StopIconCss`. Clicking again returns to `Content` / `IconCss`. No JavaScript event handlers are needed for this behaviour.

## Button Icons

### Built-in Icons

Syncfusion includes Material Design icons:

```razor
@using Syncfusion.EJ2

<!-- Microphone icon -->
@Html.EJS().SpeechToText("voice1")
    .ButtonSettings(bs => bs
        .IconCss("e-icons e-microphone")
    )
    .Render()

<!-- Record icon -->
@Html.EJS().SpeechToText("voice2")
    .ButtonSettings(bs => bs
        .IconCss("e-icons e-record")
    )
    .Render()

<!-- Speaker icon -->
@Html.EJS().SpeechToText("voice3")
    .ButtonSettings(bs => bs
        .IconCss("e-icons e-speaker")
    )
    .Render()

<!-- Refresh icon -->
@Html.EJS().SpeechToText("voice4")
    .ButtonSettings(bs => bs
        .IconCss("e-icons e-refresh")
    )
    .Render()
```

### Custom Font Icon Classes

Use Font Awesome or other icon libraries:

```razor
@using Syncfusion.EJ2

<!-- Font Awesome icons -->
@Html.EJS().SpeechToText("voice1")
    .ButtonSettings(bs => bs
        .Content("Record")
        .IconCss("fas fa-microphone")
    )
    .Render()

@Html.EJS().SpeechToText("voice2")
    .ButtonSettings(bs => bs
        .Content("Stop")
        .IconCss("fas fa-stop-circle")
    )
    .Render()
```

### Animated Icons

```html
<style>
    .rotating-icon::before {
        animation: spin 1s linear infinite;
    }
    
    @@keyframes spin {
        from { transform: rotate(0deg); }
        to { transform: rotate(360deg); }
    }
</style>
```

```razor
@using Syncfusion.EJ2

@Html.EJS().SpeechToText("voice")
    .ButtonSettings(bs => bs
        .Content("Processing...")
        .IconCss("e-icons e-refresh rotating-icon")
    )
    .Render()
```

### Icon Position

Use the `IconPosition` property with the `IconPosition` enum to control whether the icon appears before (left of) or after (right of) the button label:

```razor
@using Syncfusion.EJ2
@using Syncfusion.EJ2.Buttons

<!-- Icon to the left of the label (default) -->
@Html.EJS().SpeechToText("voice1")
    .ButtonSettings(bs => bs
        .Content("Start Recording")
        .IconCss("e-icons e-microphone")
        .IconPosition(IconPosition.Left)
    )
    .Render()

<!-- Icon to the right of the label -->
@Html.EJS().SpeechToText("voice2")
    .ButtonSettings(bs => bs
        .Content("Start Recording")
        .IconCss("e-icons e-microphone")
        .IconPosition(IconPosition.Right)
    )
    .Render()
```

## Tooltip Settings

### Basic Tooltip

```razor
@using Syncfusion.EJ2

@Html.EJS().SpeechToText("voice")
    .TooltipSettings(ts => ts
        .Content("Click to start voice input")
    )
    .Render()
```

### Start and Stop Tooltip Content

Use `StopContent` inside `TooltipSettings` to display a different tooltip message while recording is active:

```razor
@using Syncfusion.EJ2

@Html.EJS().SpeechToText("voice")
    .TooltipSettings(ts => ts
        .Content("Click to start recording")
        .StopContent("Click to stop recording")
    )
    .Render()
```

When the component enters the listening state the tooltip automatically switches to `StopContent`. When recognition stops it reverts to `Content`.

### Tooltip Position

The `TooltipPosition` enum exposes twelve placement options:

| Value | Description |
|---|---|
| `TopLeft` | Above the button, aligned to its left edge |
| `TopCenter` | Above the button, horizontally centred (default) |
| `TopRight` | Above the button, aligned to its right edge |
| `BottomLeft` | Below the button, aligned to its left edge |
| `BottomCenter` | Below the button, horizontally centred |
| `BottomRight` | Below the button, aligned to its right edge |
| `LeftTop` | Left of the button, aligned to its top edge |
| `LeftCenter` | Left of the button, vertically centred |
| `LeftBottom` | Left of the button, aligned to its bottom edge |
| `RightTop` | Right of the button, aligned to its top edge |
| `RightCenter` | Right of the button, vertically centred |
| `RightBottom` | Right of the button, aligned to its bottom edge |

```razor
@using Syncfusion.EJ2
@using Syncfusion.EJ2.Popups

<!-- Top Center (default) -->
@Html.EJS().SpeechToText("voice1")
    .TooltipSettings(ts => ts
        .Position(TooltipPosition.TopCenter)
        .Content("Tooltip at top")
    )
    .Render()

<!-- Bottom Center -->
@Html.EJS().SpeechToText("voice2")
    .TooltipSettings(ts => ts
        .Position(TooltipPosition.BottomCenter)
        .Content("Tooltip at bottom")
    )
    .Render()

<!-- Left Center -->
@Html.EJS().SpeechToText("voice3")
    .TooltipSettings(ts => ts
        .Position(TooltipPosition.LeftCenter)
        .Content("Tooltip on left")
    )
    .Render()

<!-- Right Center -->
@Html.EJS().SpeechToText("voice4")
    .TooltipSettings(ts => ts
        .Position(TooltipPosition.RightCenter)
        .Content("Tooltip on right")
    )
    .Render()

<!-- Corner positions -->
@Html.EJS().SpeechToText("voice5")
    .TooltipSettings(ts => ts
        .Position(TooltipPosition.TopLeft)
        .Content("Top-left tooltip")
    )
    .Render()

@Html.EJS().SpeechToText("voice6")
    .TooltipSettings(ts => ts
        .Position(TooltipPosition.BottomRight)
        .Content("Bottom-right tooltip")
    )
    .Render()
```

### Hiding the Tooltip

Set `ShowTooltip(false)` on the root component to suppress the tooltip entirely, for example when the button label is already self-explanatory:

```razor
@using Syncfusion.EJ2

@Html.EJS().SpeechToText("voice")
    .ShowTooltip(false)
    .ButtonSettings(bs => bs
        .Content("Start Recording")
        .StopContent("Stop Recording")
    )
    .Render()
```

### Tooltip Styling

```razor
@using Syncfusion.EJ2
@using Syncfusion.EJ2.Popups

<style>
    .custom-tooltip {
        background-color: #333;
        color: #fff;
        padding: 10px;
        borderRadius: 4px;
    }
</style>

@Html.EJS().SpeechToText("voice")
    .TooltipSettings(ts => ts
        .Content("Click to activate voice input")
        .Position(TooltipPosition.TopCenter)
        .CssClass("custom-tooltip")
    )
    .Render()
```

### Multi-line Tooltip

```razor
@using Syncfusion.EJ2
@using Syncfusion.EJ2.Popups

@Html.EJS().SpeechToText("voice")
    .TooltipSettings(ts => ts
        .Content("Click to start voice input.<br/>Speak clearly into the microphone.<br/>Click again to stop.")
        .Position(TooltipPosition.TopCenter)
    )
    .Render()
```

## Advanced Customization

### Root CssClass

The root `CssClass` property applies an extra CSS class to the **outermost wrapper element** of the SpeechToText component. This is distinct from `ButtonSettings.CssClass`, which targets only the inner button element. Use the root property when you need to style the surrounding container, control layout spacing, or override component-level variables:

```razor
@using Syncfusion.EJ2

<style>
    .voice-compact {
        display: inline-flex;
        margin: 0 8px;
    }
</style>

@Html.EJS().SpeechToText("voice")
    .CssClass("voice-compact")
    .ButtonSettings(bs => bs
        .Content("Speak")
    )
    .Render()
```

### Disabled State

Use the `Disabled` root property to prevent all interaction with the component. This is the correct approach — do not manipulate the underlying DOM button directly:

```razor
@using Syncfusion.EJ2

<!-- Render the component in a disabled state from the server -->
@Html.EJS().SpeechToText("voice")
    .Disabled(true)
    .ButtonSettings(bs => bs
        .Content("Voice Unavailable")
    )
    .Render()
```

To enable or disable the component dynamically from JavaScript, set the property on the component instance:

```razor
@using Syncfusion.EJ2

@Html.EJS().SpeechToText("voice")
    .Created("setupComponent")
    .Render()

@Html.EJS().Button("toggle-btn")
    .Content("Toggle Voice Input")
    .Click("toggleDisabled")
    .Render()

<script>
    var voiceComponent;

    function setupComponent() {
        voiceComponent = ej.base.getComponent(
            document.getElementById("voice"),
            "speechtotext"
        );
    }

    function toggleDisabled() {
        voiceComponent.disabled = !voiceComponent.disabled;
    }
</script>
```

### Primary Button Styling

Set `IsPrimary(true)` inside `ButtonSettings` to apply the Syncfusion primary button theme (typically a filled, high-contrast style that draws attention):

```razor
@using Syncfusion.EJ2

@Html.EJS().SpeechToText("voice")
    .ButtonSettings(bs => bs
        .Content("Start Recording")
        .StopContent("Stop Recording")
        .IconCss("e-icons e-microphone")
        .IsPrimary(true)
    )
    .Render()
```

### Custom CSS Class for Button

```razor
@using Syncfusion.EJ2

<style>
    .voice-button-custom {
        backgroundColor: #4CAF50 !important;
        color: white !important;
        padding: 10px 20px !important;
        borderRadius: 5px !important;
        fontSize: 14px !important;
        fontWeight: bold !important;
        cursor: pointer !important;
    }
</style>

@Html.EJS().SpeechToText("voice")
    .ButtonSettings(bs => bs
        .Content("🎙️ Speak")
        .CssClass("voice-button-custom")
    )
    .Render()
```

### Button with Badge

```html
<style>
    .button-badge {
        position: relative;
    }
    
    .button-badge::after {
        content: '3';
        position: absolute;
        topRight: -8px;
        right: -8px;
        backgroundColor: red;
        color: white;
        borderRadius: 50%;
        width: 20px;
        height: 20px;
        textAlign: center;
        lineHeight: 20px;
        fontSize: 12px;
    }
</style>

@Html.EJS().SpeechToText("voice")
    .ButtonSettings(bs => bs
        .Content("Records")
        .CssClass("button-badge")
    )
    .Render()
```

## Responsive Design

### Mobile-Friendly Button

```razor
@using Syncfusion.EJ2

<style>
    @@media (max-width: 480px) {
        .mobile-voice-button {
            width: 100% !important;
            padding: 15px !important;
            fontSize: 16px !important;
        }
    }
    
    @@media (min-width: 481px) and (max-width: 768px) {
        .tablet-voice-button {
            width: 80% !important;
            padding: 12px !important;
        }
    }
</style>

@Html.EJS().SpeechToText("voice")
    .ButtonSettings(bs => bs
        .Content("🎤 Start Recording")
        .CssClass("mobile-voice-button")
    )
    .Render()
```

### Responsive Tooltip

```razor
@using Syncfusion.EJ2
@using Syncfusion.EJ2.Popups

<style>
    @@media (max-width: 480px) {
        .e-tooltip {
            fontSize: 12px !important;
            padding: 5px !important;
        }
    }
    
    @@media (min-width: 481px) {
        .e-tooltip {
            fontSize: 14px !important;
            padding: 8px !important;
        }
    }
</style>

@Html.EJS().SpeechToText("voice")
    .TooltipSettings(ts => ts
        .Content("Click to start voice input")
        .Position(TooltipPosition.TopCenter)
    )
    .Render()
```

### Conditional Customization Based on Screen Size

```razor
@using Syncfusion.EJ2
@using Syncfusion.EJ2.Popups

@{
    bool isMobile = Context.Request.UserAgent.Contains("Mobile") || 
                   Context.Request.UserAgent.Contains("Android");
}

@Html.EJS().SpeechToText("voice")
    .ButtonSettings(bs => bs
        .Content(isMobile ? "🎤" : "🎤 Start Recording")
        .IconCss("e-icons e-microphone")
    )
    .TooltipSettings(ts => ts
        .Content(isMobile ? "Start" : "Click to start voice input")
        .Position(isMobile ? TooltipPosition.BottomCenter : TooltipPosition.TopCenter)
    )
    .Render()
```

## Practical Examples

### Professional Recording Button

```razor
@using Syncfusion.EJ2
@using Syncfusion.EJ2.Popups

<style>
    .professional-voice-button {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        padding: 12px 24px;
        font-size: 16px;
        font-weight: 600;
        border-radius: 8px;
        border: none;
        cursor: pointer;
        box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);
        transition: all 0.3s ease;
    }

    .professional-voice-button:hover {
        transform: translateY(-2px);
        box-shadow: 0 6px 20px rgba(102, 126, 234, 0.6);
    }
</style>

@Html.EJS().SpeechToText("voice")
    .ButtonSettings(bs => bs
        .Content("Start Recording")
        .StopContent("Stop Recording")
        .IconCss("e-icons e-microphone")
        .StopIconCss("e-icons e-stop")
        .CssClass("professional-voice-button")
    )
    .TooltipSettings(ts => ts
        .Content("Click to start recording your message")
        .StopContent("Click to stop recording")
        .Position(TooltipPosition.TopCenter)
    )
    .Render()
```

### Minimal Dark Mode Button

```razor
@using Syncfusion.EJ2

<style>
    .dark-voice-button {
        backgroundColor: #1a1a1a;
        color: #ffffff;
        border: 1px solid #333;
        padding: 8px 16px;
        borderRadius: 4px;
    }
    
    .dark-voice-button:hover {
        backgroundColor: #2d2d2d;
    }
</style>

@Html.EJS().SpeechToText("voice")
    .ButtonSettings(bs => bs
        .Content("🎤")
        .CssClass("dark-voice-button")
    )
    .Render()
```

### Large Accessible Button

```razor
@using Syncfusion.EJ2

<style>
    .accessible-voice-button {
        padding: 20px 40px;
        fontSize: 18px;
        fontWeight: bold;
        backgroundColor: #0066cc;
        color: white;
        borderRadius: 8px;
        border: 3px solid #004499;
    }
</style>

@Html.EJS().SpeechToText("voice")
    .ButtonSettings(bs => bs
        .Content("🎤 CLICK TO SPEAK")
        .CssClass("accessible-voice-button")
    )
    .TooltipSettings(ts => ts
        .Content("Large button for accessibility. Press to start voice recording.")
    )
    .Render()
```

