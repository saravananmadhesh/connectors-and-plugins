---
name: syncfusion-aspnetcore-popups
description: Comprehensive guide for implementing Syncfusion ASP.NET Core Popup components including Dialog, Predefined Dialog, and Tooltip. Covers modal dialogs, positioning, animations, templates, accessibility, event handling, and various dialog and tooltip interaction patterns.
metadata:
  author: "Syncfusion Inc"
  category: "Popups"
  version: "34.1.29"
---

# Syncfusion ASP.NET Core Popups

## Dialog

This skill documents how to implement, configure, and customize the Syncfusion Dialog in ASP.NET Core applications using the `<ejs-dialog>` Tag Helper API. It covers setup, modality, positioning, animations, templates, events, accessibility, and styling.

### Quick Links
- [API Reference](references/dialog-api.md)
- [Getting Started](references/dialog-getting-started.md)
- [Basic Features](references/dialog-basic-features.md)
- [Positioning & Sizing](references/dialog-positioning-and-sizing.md)
- [Animations & Transitions](references/dialog-animations-and-transitions.md)
- [Templates](references/dialog-templates.md)
- [Accessibility & Localization](references/dialog-accessibility-and-localization.md)
- [Events & Interactions](references/dialog-events-and-interactions.md)
- [Styling & Themes](references/dialog-styling-and-themes.md)

### Quick Start (Tag Helper)

In your Razor view:

```csharp
@using Syncfusion.EJ2

<ejs-dialog id="dialog" header="Welcome" isModal="true" width="500px">
    <e-content-template>
        <p>This is a basic dialog with default settings.</p>
    </e-content-template>
</ejs-dialog>

<script>
    window.onload = function () {
        document.getElementById('openBtn').onclick = function () {
            document.getElementById('dialog').ej2_instances[0].show();
        };
    };
</script>
```

Ensure you include the script manager and styles in your layout (`_Layout.cshtml`):

```csharp
<!-- In <head> -->
<link rel="stylesheet" href="https://cdn.syncfusion.com/ej2/{{ site.ej2version }}/fluent.css" />

<!-- At end of <body> -->
<script src="https://cdn.syncfusion.com/ej2/{{ site.ej2version }}/dist/ej2.min.js"></script>
<ejs-scripts></ejs-scripts>
```

### Common Patterns

#### Modal Confirmation Dialog
```csharp
<ejs-dialog id="confirmDialog" header="Confirm Action" isModal="true" width="400px">
    <e-dialog-buttons>
        <e-dialog-dialogbutton content="Yes" isPrimary="true" click="confirmAction"></e-dialog-dialogbutton>
        <e-dialog-dialogbutton content="No" click="closeDialog"></e-dialog-dialogbutton>
    </e-dialog-buttons>
    <e-content-template>
        <p>Are you sure you want to proceed?</p>
    </e-content-template>
</ejs-dialog>
```

#### Draggable Dialog with Header
```csharp
<ejs-dialog id="draggableDialog" 
    header="Drag Me" 
    allowDragging="true" 
    width="500px" 
    showCloseIcon="true">
    <e-content-template>
        <p>Grab the header to drag this dialog.</p>
    </e-content-template>
</ejs-dialog>
```

#### Centered Dialog
```csharp
<ejs-dialog id="centeredDialog" 
    header="Centered Position" 
    width="500px">
    <e-dialog-position x="center" y="center"></e-dialog-position>
    <e-content-template>
        <p>This dialog is centered on the page.</p>
    </e-content-template>
</ejs-dialog>
```

### Key Properties

| Tag Helper Attribute | Type | Purpose | Example |
|----------------------|------|---------|---------|
| `header` | string | Dialog title bar text | `header="Confirm Delete"` |
| `isModal` | bool | Shows overlay behind dialog | `isModal="true"` |
| `width` | string | Dialog width (px, %) | `width="500px"` |
| `height` | string | Dialog height (px, %) | `height="300px"` |
| `minHeight` | string | Minimum dialog height | `minHeight="150px"` |
| `allowDragging` | bool | Enable drag to reposition | `allowDragging="true"` |
| `enableResize` | bool | Enable end-user resizing | `enableResize="true"` |
| `showCloseIcon` | bool | Display close (X) button | `showCloseIcon="true"` |
| `closeOnEscape` | bool | Close on Escape key | `closeOnEscape="true"` |
| `visible` | bool | Initial visibility | `visible="false"` |
| `target` | string | Target container selector | `target="#container"` |
| `cssClass` | string | Custom CSS class(es) | `cssClass="my-dialog"` |
| `enableRtl` | bool | Right-to-left rendering | `enableRtl="true"` |
| `enablePersistence` | bool | Persist state on reload | `enablePersistence="true"` |
| `zIndex` | double | Z-order stacking level | `zIndex="2000"` |
| `<e-dialog-position>` | DialogPositionData | X/Y positioning | `x="center" y="center"` |
| `<e-dialog-animationsettings>` | DialogAnimationSettings | Open/close animation | `effect="Zoom" duration="400"` |
| `footerTemplate` | string | Custom footer HTML string | `footerTemplate="<span>...</span>"` |

> **Removed invalid APIs:** `is-hidden` (use `visible="false"`), `position-x`/`position-y` flat attributes (use `<e-dialog-position>`), `allow-resizing` (use `enable-resize`), `max-height`, `max-width`, `min-width` (not supported).

### Next Steps
Read `getting-started.md` for full installation steps, NuGet package setup, and configuration details.

## Predefined Dialog

Predefined dialogs are opened imperatively using the **`DialogUtility`** JavaScript utility class. They provide ready-to-use alert, confirm, and prompt dialogs without component setup. Use predefined dialogs for quick notifications and user confirmations.

### Key Concept

Predefined dialogs are **not** Tag Helper components. They are invoked via JavaScript:

```javascript
ej.popups.DialogUtility.alert({ ... });
ej.popups.DialogUtility.confirm({ ... });
```

---

### Quick Start

```csharp
<button class="e-btn e-danger" onclick="showAlert()">Alert</button>

<script>
    function showAlert() {
        ej.popups.DialogUtility.alert({
            title: 'Low Battery',
            width: '250px',
            content: '10% of battery remaining'
        });
    }
</script>
```

---

### Documentation Guide

#### Getting Started
📄 **Read:** [references/predefineddialog-getting-started.md](references/predefineddialog-getting-started.md)
- Installation and setup
- Alert, Confirm, and Prompt basic examples
- JavaScript invocation patterns

#### Position
📄 **Read:** [references/predefineddialog-position.md](references/predefineddialog-position.md)
- `position` property with X/Y values
- Center, top, bottom, left, right positioning
- Custom pixel offsets

#### Animation
📄 **Read:** [references/predefineddialog-animation.md](references/predefineddialog-animation.md)
- `animationSettings` with effect, duration, delay
- Alert, Confirm, Prompt animation examples

#### Draggable
📄 **Read:** [references/predefineddialog-draggable.md](references/predefineddialog-draggable.md)
- `isDraggable` boolean property
- Dialog drag-to-reposition examples

#### Dimension
📄 **Read:** [references/predefineddialog-dimension.md](references/predefineddialog-dimension.md)
- `width` and `height` properties
- `cssClass` for size constraints (min-width, max-width)

#### Customization
📄 **Read:** [references/predefineddialog-customization.md](references/predefineddialog-customization.md)
- `okButton` / `cancelButton` customization
- `showCloseIcon` and `closeOnEscape`
- Custom content with HTML strings

#### API Reference
📄 **Read:** [references/predefineddialog-api.md](references/predefineddialog-api.md)
- Full `DialogUtility.alert()` / `confirm()` option properties
- All supported fields and types

---

### Common Patterns

**Alert Dialog:**
```javascript
ej.popups.DialogUtility.alert({
    title: 'Info',
    content: 'Operation complete.',
    width: '250px'
});
```

**Confirm Dialog:**
```javascript
var dialogObj = ej.popups.DialogUtility.confirm({
    title: 'Delete?',
    content: 'Are you sure?',
    width: '300px',
    okButton: { text: 'Yes', click: function() { /* delete */ dialogObj.hide(); } },
    cancelButton: { text: 'No', click: function() { dialogObj.hide(); } }
});
```

**Prompt Dialog:**
```javascript
var dialogObj = ej.popups.DialogUtility.confirm({
    title: 'Enter Name',
    content: '<p>Your name:</p><input id="nameInput" class="e-input" placeholder="Type here..." />',
    width: '300px',
    okButton: { text: 'Submit', click: function() { var val = document.getElementById('nameInput').value; dialogObj.hide(); } },
    cancelButton: { click: function() { dialogObj.hide(); } }
});
```

---

## Tooltip

A tooltip component that displays helpful information or hints when users hover over, click, or focus on an element. The `<ejs-tooltip>` Tag Helper provides flexible positioning, animations, multiple trigger modes, and accessibility features.

**Package:** `Syncfusion.EJ2.AspNet.Core`  
**Tag Helper:** `<ejs-tooltip>`

### Quick Start

```csharp
<ejs-tooltip id="tooltip" target="#target" position="TopCenter" content="Tooltip Content">
    <e-content-template>
        <button class="e-btn" id="target">Show Tooltip</button>
    </e-content-template>
</ejs-tooltip>
```

---

### Documentation Guide

#### Getting Started & Setup
📄 **Read:** [references/tooltip-getting-started.md](references/tooltip-getting-started.md)
- Installation and CSS imports
- Basic tooltip on a single element
- Multi-target tooltips with title attributes
- Running the application

#### Content
📄 **Read:** [references/tooltip-content.md](references/tooltip-content.md)
- String content and HTML markup
- Template content via `<e-content-template>`
- Dynamic content via `beforeRender` event
- HTML sanitization for security

#### Positioning
📄 **Read:** [references/tooltip-positioning.md](references/tooltip-positioning.md)
- 12 static positions (TopLeft, TopCenter, TopRight, BottomLeft, etc.)
- Tip pointer positioning (Start, Middle, End)
- Dynamic positioning with `refresh()` method
- Offset values (`offsetX`, `offsetY`)
- Collision handling (`windowCollision`)

#### Open Modes
📄 **Read:** [references/tooltip-open-mode.md](references/tooltip-open-mode.md)
- `Auto`, `Hover`, `Click`, `Focus`, `Custom` modes via `opensOn`
- Combining multiple modes (e.g., `opensOn="Hover Click"`)
- Sticky mode (`isSticky`) with close button
- Open/close delays (`openDelay`, `closeDelay`)

#### Animation
📄 **Read:** [references/tooltip-animation.md](references/tooltip-animation.md)
- `<e-tooltip-animationsettings>` with open/close effects
- 7+ animation effects (FadeIn, ZoomIn, SlideUp, etc.)
- Duration and delay configuration
- Disable animations with effect: 'None'

#### Customization
📄 **Read:** [references/tooltip-customization.md](references/tooltip-customization.md)
- `cssClass` for custom styling
- Tip pointer visibility and customization
- Dimensions (`width`, `height`)
- RTL support (`enableRtl`)
- Mouse trailing (`mouseTrail`)

#### Accessibility
📄 **Read:** [references/tooltip-accessibility.md](references/tooltip-accessibility.md)
- WCAG 2.2 and Section 508 compliance
- ARIA attributes (role, aria-describedby, aria-hidden)
- Keyboard navigation (Tab, Escape)
- Screen reader support and focus management
- Best practices for accessible tooltips

#### API Reference
📄 **Read:** [references/tooltip-api.md](references/tooltip-api.md)
- All properties with types and defaults
- Methods: `open()`, `close()`, `refresh()`, `destroy()`, `dataBind()`
- Events: `BeforeRender`, `AfterOpen`, `AfterClose`, `Created`, `Destroyed`
- Position and TipPointerPosition enum values

---

### Common Patterns

**Basic Tooltip on Button:**
```csharp
<ejs-tooltip id="tooltip" target="#target" position="TopCenter" content="Submit the form">
    <e-content-template>
        <button class="e-btn" id="target">Submit</button>
    </e-content-template>
</ejs-tooltip>
```

**Multi-Target Tooltip:**
```csharp
<ejs-tooltip id="tooltip" target=".info-icon" position="TopCenter">
    <e-content-template>
        <button class="e-btn info-icon" title="Information">Info 1</button>
        <button class="e-btn info-icon" title="Details">Info 2</button>
        <button class="e-btn info-icon" title="Help">Info 3</button>
    </e-content-template>
</ejs-tooltip>
```

**Click-Triggered Sticky Tooltip:**
```csharp
<ejs-tooltip target="#target" content="Click the × to close me" 
    opensOn="Click" 
    isSticky="true" 
    position="BottomCenter">
    <e-content-template>
        <button id="target" class="e-btn">Click Me</button>
    </e-content-template>
</ejs-tooltip>
```

**Programmatic Open/Close:**
```csharp
<ejs-tooltip id="tooltip" target="#target" content="Tooltip opened programmatically" opensOn="Custom">
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

### Key Properties at a Glance

| Tag Helper Attr | Type | Default | Purpose |
|-----------------|------|---------|---------|
| `content` | `string` | — | Tooltip text or HTML |
| `target` | `string` | — | CSS selector for multi-target mode |
| `position` | `Position` | `'TopCenter'` | 12 placement values |
| `opensOn` | `string` | `'Auto'` | Hover / Click / Focus / Custom |
| `isSticky` | `bool` | `false` | Keep visible until user closes |
| `mouseTrail` | `bool` | `false` | Follow mouse cursor |
| `showTipPointer` | `bool` | `true` | Show/hide arrow tip |
| `tipPointerPosition` | `TipPointerPosition` | `'Auto'` | Auto / Start / Middle / End |
| `openDelay` | `number` | `0` | ms delay before opening |
| `closeDelay` | `number` | `0` | ms delay before closing |
| `offsetX` / `offsetY` | `number` | `0` | Distance from target (px) |
| `width` / `height` | `string \| number` | `'auto'` | Tooltip dimensions |
| `cssClass` | `string` | `null` | Custom CSS class |
| `enableRtl` | `bool` | `false` | Right-to-left rendering |
| `enableHtmlSanitizer` | `bool` | `true` | Sanitize HTML content |
| `windowCollision` | `bool` | `false` | Collision vs viewport |
