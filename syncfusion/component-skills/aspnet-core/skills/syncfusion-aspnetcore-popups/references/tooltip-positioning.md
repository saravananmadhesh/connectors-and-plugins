# Positioning — Syncfusion ASP.NET Core Tooltip

## Table of Contents
- [12 Static Positions](#12-static-positions)
- [Tip Pointer Positioning](#tip-pointer-positioning)
- [Dynamic Positioning](#dynamic-positioning)
- [Offset Values](#offset-values)
- [Collision Handling](#collision-handling)

---

## 12 Static Positions

The `position` attribute specifies where the tooltip appears relative to the target element. There are 12 preset position values:

```csharp
@* Top Row *@
<ejs-tooltip id="tooltip" target="#target" content="Top Left" position="TopLeft">
    <e-content-template>
        <button id="target" class="e-btn">Top Left</button>
    </e-content-template>
</ejs-tooltip>

<ejs-tooltip id="tooltip" target="#target" content="Top Center" position="TopCenter">
    <e-content-template>
        <button id="target" class="e-btn">Top Center</button>
    </e-content-template>
</ejs-tooltip>

<ejs-tooltip id="tooltip" target="#target" content="Top Right" position="TopRight">
    <e-content-template>
        <button id="target" class="e-btn">Top Right</button>
    </e-content-template>
</ejs-tooltip>

@* Bottom Row *@
<ejs-tooltip id="tooltip" target="#target" content="Bottom Left" position="BottomLeft">
    <e-content-template>
        <button id="target" class="e-btn">Bottom Left</button>
    </e-content-template>
</ejs-tooltip>

<ejs-tooltip id="tooltip" target="#target" content="Bottom Center" position="BottomCenter">
    <e-content-template>
        <button id="target" class="e-btn">Bottom Center</button>
    </e-content-template>
</ejs-tooltip>

<ejs-tooltip id="tooltip" target="#target" content="Bottom Right" position="BottomRight">
    <e-content-template>
        <button id="target" class="e-btn">Bottom Right</button>
    </e-content-template>
</ejs-tooltip>

@* Left Column *@
<ejs-tooltip id="tooltip" target="#target" content="Left Top" position="LeftTop">
    <e-content-template>
        <button id="target" class="e-btn">Left Top</button>
    </e-content-template>
</ejs-tooltip>

<ejs-tooltip id="tooltip" target="#target" content="Left Center" position="LeftCenter">
    <e-content-template>
        <button id="target" class="e-btn">Left Center</button>
    </e-content-template>
</ejs-tooltip>

<ejs-tooltip id="tooltip" target="#target" content="Left Bottom" position="LeftBottom">
    <e-content-template>
        <button id="target" class="e-btn">Left Bottom</button>
    </e-content-template>
</ejs-tooltip>

@* Right Column *@
<ejs-tooltip id="tooltip" target="#target" content="Right Top" position="RightTop">
    <e-content-template>
        <button id="target" class="e-btn">Right Top</button>
    </e-content-template>
</ejs-tooltip>

<ejs-tooltip id="tooltip" target="#target" content="Right Center" position="RightCenter">
    <e-content-template>
        <button id="target" class="e-btn">Right Center</button>
    </e-content-template>
</ejs-tooltip>

<ejs-tooltip id="tooltip" target="#target" content="Right Bottom" position="RightBottom">
    <e-content-template>
        <button id="target" class="e-btn">Right Bottom</button>
    </e-content-template>
</ejs-tooltip>
```

---

## Tip Pointer Positioning

The `tipPointerPosition` attribute controls where the arrow tip points on the tooltip edge:

| Value | Description |
|-------|-------------|
| `Auto` | Automatically positions the tip pointer based on tooltip placement (default) |
| `Start` | Positions the tip pointer at the start edge |
| `Middle` | Positions the tip pointer at the middle |
| `End` | Positions the tip pointer at the end edge |

```csharp
<ejs-tooltip id="tooltip" target="#target" content="Tip at Start" 
    position="RightCenter" 
    tipPointerPosition="Start">
    <e-content-template>
        <button id="target" class="e-btn">Start Tip</button>
    </e-content-template>
</ejs-tooltip>

<ejs-tooltip id="tooltip" target="#target" content="Tip at Middle" 
    position="RightCenter" 
    tipPointerPosition="Middle">
    <e-content-template>
        <button id="target" class="e-btn">Middle Tip</button>
    </e-content-template>
</ejs-tooltip>

<ejs-tooltip id="tooltip" target="#target" content="Tip at End" 
    position="RightCenter" 
    tipPointerPosition="End">
    <e-content-template>
        <button id="target" class="e-btn">End Tip</button>
    </e-content-template>
</ejs-tooltip>
```

---

## Dynamic Positioning

Use the `refresh()` method to recalculate tooltip position after the target element moves or the viewport changes:

```csharp
<ejs-tooltip id="tooltip" target="#target" content="Dynamic Tooltip">
    <e-content-template>
        <button id="target" class="e-btn" onclick="moveButton()">Move Me</button>
    </e-content-template>
</ejs-tooltip>

<script>
    function moveButton() {
        var btn = document.getElementById('target');
        btn.style.marginLeft = '200px';
        
        // Refresh tooltip position after target moves
        var tooltipObj = document.getElementById('tooltip').ej2_instances[0];
        tooltipObj.refresh(btn);
    }
</script>
```

---

## Offset Values

Use `offsetX` and `offsetY` to adjust the distance between the target and the tooltip:

```csharp
@* No offset (default) *@
<ejs-tooltip id="tooltip" target="#target" content="No Offset" position="TopCenter">
    <e-content-template>
        <button id="target" class="e-btn">Default</button>
    </e-content-template>
</ejs-tooltip>

@* 10px horizontal offset *@
<ejs-tooltip id="tooltip" target="#target" content="10px Right Offset" 
    position="RightCenter" 
    offsetX="10">
    <e-content-template>
        <button id="target" class="e-btn">Offset X</button>
    </e-content-template>
</ejs-tooltip>

@* 20px vertical offset *@
<ejs-tooltip id="tooltip" target="#target" content="20px Down Offset" 
    position="TopCenter" 
    offsetY="20">
    <e-content-template>
        <button id="target" class="e-btn">Offset Y</button>
    </e-content-template>
</ejs-tooltip>

@* Both offsets *@
<ejs-tooltip id="tooltip" target="#target" content="Combined Offset" 
    position="RightCenter" 
    offsetX="10" 
    offsetY="10">
    <e-content-template>
        <button id="target" class="e-btn">Both Offsets</button>
    </e-content-template>
</ejs-tooltip>
```

---

## Collision Handling

The `windowCollision` attribute controls whether the tooltip adjusts position to stay within the viewport when it would otherwise extend beyond the window edges:

```csharp
@* Auto-flip behavior enabled *@
<ejs-tooltip id="tooltip" target="#target" content="Stays in viewport" 
    position="TopCenter" 
    windowCollision="true">
    <e-content-template>
        <button id="target" class="e-btn">Near Edge</button>
    </e-content-template>
</ejs-tooltip>

@* Allow tooltip to extend beyond viewport *@
<ejs-tooltip id="tooltip" target="#target" content="May go off-screen" 
    position="TopCenter" 
    windowCollision="false">
    <e-content-template>
        <button id="target" class="e-btn">Allow Overflow</button>
    </e-content-template>
</ejs-tooltip>
```
