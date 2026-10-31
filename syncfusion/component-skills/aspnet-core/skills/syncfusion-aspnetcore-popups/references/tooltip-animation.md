# Animation — Syncfusion ASP.NET Core Tooltip

## Table of Contents
- [Overview](#overview)
- [Basic Animation](#basic-animation)
- [Animation Effects](#animation-effects)
- [Animating via Open/Close Methods](#animating-via-openclose-methods)
- [Apply Transition](#apply-transition)

---

## Overview

The `animation` property configures open and close animations for the tooltip. It accepts an `AnimationModel` derived from the base to apply the chosen animation effect, duration, delay, and other settings on the tooltip.

By default, the tooltip entrance occurs over **150 ms** using the `ease-out` timing function, and exit also at **150 ms** using the `ease-in` timing function.

The default animation effect is `FadeIn` for the open action and `FadeOut` for the close action. The default `duration` is **150 ms** and `delay` is **0**.

---

## Basic Animation

Configure the `animation` property using `ViewBag` in the controller:

````csharp
public class TooltipController : Controller
{
    public IActionResult Animation()
    {
        ViewBag.animation = new
        {
            open = new { effect = "FadeIn", duration = 150, delay = 0 },
            close = new { effect = "FadeOut", duration = 150, delay = 0 }
        };
        return View();
    }
}
````

Use the `animation` property in the tag helper:

````csharp
<ejs-tooltip id="tooltip" content="Tooltip content" animation="ViewBag.animation" position="TopCenter">
    <e-content-template>
        <ejs-button id="target" content="Show tooltip">
        </ejs-button>
    </e-content-template>
</ejs-tooltip>

<style>
    #tooltip {
        position: absolute;
        left: calc(50% - 60px);
        top: 38%;
    }
</style>
````

---

## Animation Effects

The animation effects that are applicable to Tooltips are:

| Effect | Description |
|--------|-------------|
| `FadeIn` / `FadeOut` | Fade in/out smoothly |
| `FadeZoomIn` / `FadeZoomOut` | Fade and zoom in/out from center |
| `FlipXDownIn` / `FlipXDownOut` | Flip horizontally with downward motion |
| `FlipXUpIn` / `FlipXUpOut` | Flip horizontally with upward motion |
| `FlipYLeftIn` / `FlipYLeftOut` | Flip vertically with leftward motion |
| `FlipYRightIn` / `FlipYRightOut` | Flip vertically with rightward motion |
| `ZoomIn` / `ZoomOut` | Zoom in/out from center |
| `None` | No animation effect is applied |

> Some of the above animation effects suit the Tooltip better when its tip pointer is hidden. This can be achieved by setting the `showTipPointer` to `false`.

When the `effect` is specified as `None`, no effect will be applied to the Tooltip, and animation is considered to be set to `off`.

---

## Animating via Open/Close Methods

Animations can be applied on tooltips dynamically through the `open` and `close` methods. These methods accept the animation model as an optional parameter. If you pass `TooltipAnimationSettings`, animation takes this model; otherwise, it takes the values from the `animation` property. It is also possible to pass different animations for tooltips on each target.

````csharp
<ejs-tooltip id="tooltip" content="Tooltip content" opensOn="Custom" created="created" position="TopCenter">
    <e-content-template>
        <ejs-button id="target" content="Show tooltip">
        </ejs-button>
    </e-content-template>
</ejs-tooltip>

<style>
    #tooltip {
        position: absolute;
        left: calc(50% - 60px);
        top: 38%;
    }
</style>

<script>
    function created() {
        document.getElementById('target').addEventListener("click", function () {
            var tooltip = document.getElementById('tooltip').ej2_instances[0];
            if (this.getAttribute("data-tooltip-id")) {
                var closeAnimation = { effect: 'FadeOut', duration: 1000 };
                tooltip.close(closeAnimation);
            } else {
                var openAnimation = { effect: 'FadeIn', duration: 1000 };
                tooltip.open(this, openAnimation);
            }
        });
    }
</script>
````

---

## Apply Transition

The transition effect can be applied on tooltips by using the `beforeRender` event as shown in the following example:

````csharp
<ejs-tooltip id="tooltip" target=".circletool" beforeRender="onBeforeRender" afterClose="onAfterClose"
             closeDelay="1000" animation="ViewBag.animation" position="TopCenter">
    <e-content-template>
        <div>
            <h3> Transition effect </h3>
            <div id="box" class="e-prevent-select">
                <div class="circletool" style="top:18%;left:5%" title="This is Turtle !!!"></div>
                <div class="circletool" style="top:30%;left:30%" title="This is Snake !!!"></div>
                <div class="circletool" style="top:80%;left:80%" title="This is Croc !!!"></div>
                <div class="circletool" style="top:65%;left:50%" title="This is String Ray !!!"></div>
                <div class="circletool" style="top:75%;left:15%" title="This is Blob Fish !!!"></div>
                <div class="circletool" style="top:30%;left:70%" title="This is Mammoth !!!"></div>
            </div>
        </div>
    </e-content-template>
</ejs-tooltip>

<style>
    #box {
        border: 1px solid #c8c8c8;
        box-sizing: border-box;
        height: 200px;
        margin-left: 10px;
        margin-right: 10px;
        position: relative;
    }

    .circletool {
        background: yellowgreen;
        border-radius: 50px;
        height: 20px;
        position: absolute;
        width: 20px;
    }
</style>

<script>
    function onBeforeRender(args) {
        if (args.element) {
            // Prevent animation while applying transition
            this.animation = { open: { effect: 'None' } };
            args.element.style.display = 'block';
            args.element.style.transitionProperty = 'left,top';
            args.element.style.transitionDuration = '1000ms';
        }
    }
    function onAfterClose(args) {
        // Restore the animation effects
        this.animation = { open: { effect: 'ZoomIn', duration: 500 }, close: { effect: 'ZoomOut', duration: 500 } };
    }
</script>
````
