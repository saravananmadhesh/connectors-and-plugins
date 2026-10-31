# Customization — Syncfusion ASP.NET Core Tooltip

## Table of Contents
- [Overview](#overview)
- [Custom CSS Classes](#custom-css-classes)
- [Tip Pointer Customization](#tip-pointer-customization)
- [Dimensions](#dimensions)
- [RTL Support](#rtl-support)
- [Mouse Trailing](#mouse-trailing)

---

## Overview

Customize tooltip appearance using:
- `cssClass` — apply custom CSS styles
- `showTipPointer` / `tipPointerPosition` — control the arrow tip
- `width` / `height` — set explicit dimensions
- `enableRtl` — right-to-left rendering
- `mouseTrail` — follow cursor movement

---

## Custom CSS Classes

Apply custom CSS classes to style the tooltip:

```csharp
<style>
    .custom-tooltip {
        background-color: #ff6b6b !important;
        color: white !important;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
    }
    
    .custom-tooltip .e-tooltip-text {
        font-size: 16px;
        font-weight: 500;
    }
</style>

<ejs-tooltip id="tooltip" target="#target" content="Custom Styled Tooltip" 
    position="TopCenter" 
    cssClass="custom-tooltip">
    <e-content-template>
        <button id="target" class="e-btn">Styled Tooltip</button>
    </e-content-template>
</ejs-tooltip>
```

---

## Tip Pointer Customization

Control visibility and position of the arrow tip:

```csharp
@* Hide tip pointer *@
<ejs-tooltip id="tooltip" target="#target" content="No tip pointer" 
    position="TopCenter" 
    showTipPointer="false">
    <e-content-template>
        <button id="target" class="e-btn">No Tip</button>
    </e-content-template>
</ejs-tooltip>

@* Show tip pointer at start edge *@
<ejs-tooltip id="tooltip" target="#target" content="Tip at start" 
    position="RightCenter" 
    showTipPointer="true" 
    tipPointerPosition="Start">
    <e-content-template>
        <button id="target" class="e-btn">Tip Start</button>
    </e-content-template>
</ejs-tooltip>

@* Show tip pointer at middle (default) *@
<ejs-tooltip id="tooltip" target="#target" content="Tip at middle" 
    position="RightCenter" 
    showTipPointer="true" 
    tipPointerPosition="Middle">
    <e-content-template>
        <button id="target" class="e-btn">Tip Middle</button>
    </e-content-template>
</ejs-tooltip>

@* Show tip pointer at end edge *@
<ejs-tooltip id="tooltip" target="#target" content="Tip at end" 
    position="RightCenter" 
    showTipPointer="true" 
    tipPointerPosition="End">
    <e-content-template>
        <button id="target" class="e-btn">Tip End</button>
    </e-content-template>
</ejs-tooltip>
```

---

## Dimensions

Set explicit width and height for tooltips:

```csharp
@* Fixed width with auto height *@
<ejs-tooltip id="tooltip" target="#target" content="This is a tooltip with a fixed width of 200px. The height automatically adjusts based on content." 
    position="TopCenter" 
    width="200px">
    <e-content-template>
        <button id="target" class="e-btn">Fixed Width</button>
    </e-content-template>
</ejs-tooltip>

@* Fixed height with scroll on overflow *@
<ejs-tooltip id="tooltip" target="#target" content="Line 1<br/>Line 2<br/>Line 3<br/>Line 4<br/>Line 5<br/>Line 6<br/>Line 7<br/>Line 8" 
    position="TopCenter" 
    width="300px" 
    height="150px">
    <e-content-template>
        <button id="target" class="e-btn">Scrollable</button>
    </e-content-template>
</ejs-tooltip>

@* Auto dimensions (fits content) *@
<ejs-tooltip id="tooltip" target="#target" content="Auto sized tooltip" 
    position="TopCenter" 
    width="auto" 
    height="auto">
    <e-content-template>
        <button id="target" class="e-btn">Auto Size</button>
    </e-content-template>
</ejs-tooltip>
```

---

## RTL Support

Enable right-to-left rendering for languages like Arabic, Hebrew, etc.:

```csharp
@* RTL mode enabled *@
<ejs-tooltip id="tooltip" target="#target" content="مرحبا - Tooltip in RTL" 
    position="TopCenter" 
    enableRtl="true">
    <e-content-template>
        <button id="target" class="e-btn" dir="rtl">RTL Tooltip</button>
    </e-content-template>
</ejs-tooltip>
```

---

## Mouse Trailing

Enable the tooltip to follow the mouse cursor:

```csharp
<ejs-tooltip id="tooltip" target="#target" content="I follow your mouse!" 
    position="TopCenter" 
    mouseTrail="true" 
    showTipPointer="false">
    <e-content-template>
        <div id="target" style="width: 300px; height: 200px; background: #f0f0f0; padding: 20px;">
            Move your mouse over this area
        </div>
    </e-content-template>
</ejs-tooltip>
```

---

## Combined Customization Example

```csharp
<style>
    .info-tooltip {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        border-radius: 6px;
        padding: 12px 16px;
        font-size: 14px;
    }
</style>

<ejs-tooltip id="tooltip" target="#target" 
    content="<strong>Info:</strong> This is a fully customized tooltip"
    position="RightCenter"
    cssClass="info-tooltip"
    width="250px"
    tipPointerPosition="Middle"
    offsetX="10"
    offsetY="5">
    <e-content-template>
        <button id="target" class="e-btn e-info">Customized</button>
    </e-content-template>
</ejs-tooltip>
```
