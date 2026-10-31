# Open Modes — Syncfusion ASP.NET Core Tooltip

## Table of Contents
- [Overview](#overview)
- [Auto Mode](#auto-mode)
- [Hover Mode](#hover-mode)
- [Click Mode](#click-mode)
- [Focus Mode](#focus-mode)
- [Custom Mode](#custom-mode)
- [Combining Open Modes](#combining-open-modes)
- [Sticky Mode](#sticky-mode)
- [Open and Close Delays](#open-and-close-delays)

---

## Overview

The `opensOn` attribute controls how the tooltip triggers. Possible values:
- `Auto` — Hover on desktop, tap on mobile (default)
- `Hover` — Mouse hover only
- `Click` — Click to open, click to close
- `Focus` — Focus on input/button elements
- `Custom` — Programmatically control with `.open()` and `.close()` methods

Multiple modes can be combined with spaces: `opensOn="Hover Click"`.

---

## Auto Mode

The default mode — hover on desktop, tap-and-hold on mobile:

```csharp
<ejs-tooltip id="tooltip" target="#target" content="Auto mode tooltip" opensOn="Auto">
    <e-content-template>
        <button id="target" class="e-btn">Hover or Tap</button>
    </e-content-template>
</ejs-tooltip>
```

---

## Hover Mode

Tooltip appears on mouse hover and disappears when mouse leaves:

```csharp
<ejs-tooltip id="tooltip" target="#target" content="Hover over this button" opensOn="Hover">
    <e-content-template>
        <button id="target" class="e-btn">Hover Me</button>
    </e-content-template>
</ejs-tooltip>
```

---

## Click Mode

Tooltip opens on click and closes on another click:

```csharp
<ejs-tooltip id="tooltip" target="#target" content="Click to open, click to close" opensOn="Click">
    <e-content-template>
        <button id="target" class="e-btn">Click Me</button>
    </e-content-template>
</ejs-tooltip>
```

---

## Focus Mode

Tooltip appears when an input or focusable element receives focus:

```csharp
<ejs-tooltip id="tooltip" target="#target" content="Focus this input" opensOn="Focus">
    <e-content-template>
        <input id="target" type="text" class="e-input" placeholder="Click to focus" />
    </e-content-template>
</ejs-tooltip>
```

---

## Custom Mode

Programmatically control tooltip opening/closing with `.open()` and `.close()` methods:

```csharp
<ejs-tooltip id="tooltip" target="#target" id="tooltip" content="Tooltip opened programmatically" opensOn="Custom">
    <e-content-template>
        <button id="target" class="e-btn" onclick="toggleTooltip()">Toggle Tooltip</button>
    </e-content-template>
</ejs-tooltip>

<script>
    function toggleTooltip() {
        var tooltipObj = document.getElementById('tooltip').ej2_instances[0];
        var btn = document.querySelector('.e-btn');
        
        if (btn.getAttribute('data-tooltip-open') === 'true') {
            tooltipObj.close();
            btn.setAttribute('data-tooltip-open', 'false');
        } else {
            tooltipObj.open(btn);
            btn.setAttribute('data-tooltip-open', 'true');
        }
    }
</script>
```

---

## Combining Open Modes

Combine multiple trigger modes using spaces:

```csharp
@* Opens on both hover AND click *@
<ejs-tooltip id="tooltip" target="#target" content="Hover or click to show" opensOn="Hover Click">
    <e-content-template>
        <button id="target" class="e-btn">Hover or Click</button>
    </e-content-template>
</ejs-tooltip>

```

---

## Sticky Mode

Use `isSticky="true"` to keep the tooltip visible with a close (×) button until the user clicks it:

```csharp
<ejs-tooltip id="tooltip" target="#target" content="This tooltip stays open until you close it" 
    opensOn="Click" 
    isSticky="true">
    <e-content-template>
        <button id="target" class="e-btn">Click for Sticky Tooltip</button>
    </e-content-template>
</ejs-tooltip>
```

> Sticky mode is useful for important notifications or when you want users to explicitly dismiss content.

---

## Open and Close Delays

Control the delay before the tooltip appears or disappears using `openDelay` and `closeDelay` (in milliseconds):

```csharp
@* Slow to open (500ms), quick to close *@
<ejs-tooltip id="tooltip" target="#target" content="Delayed open" 
    opensOn="Hover" 
    openDelay="500" 
    closeDelay="100">
    <e-content-template>
        <button id="target" class="e-btn">Hover (slow open)</button>
    </e-content-template>
</ejs-tooltip>

@* Fast to open, slow to close (useful for accidental mouse-out) *@
<ejs-tooltip id="tooltip" target="#target" content="Sticky on hover" 
    opensOn="Hover" 
    openDelay="0" 
    closeDelay="1000">
    <e-content-template>
        <button id="target" class="e-btn">Hover (slow close)</button>
    </e-content-template>
</ejs-tooltip>
```
