# API Reference — Syncfusion ASP.NET Core Tooltip

**Source:** [Syncfusion.EJ2.Popups.Tooltip — Official API Docs](https://help.syncfusion.com/cr/aspnetcore-js2/syncfusion.ej2.popups.tooltip.html#properties)  
**Namespace:** `Syncfusion.EJ2.Popups`  
**Assembly:** `Syncfusion.AspNetCore.Popups.dll`  
**Tag Helper:** `<ejs-tooltip>`

> ⚠️ Only use APIs listed in this file. Do not reference undocumented or non-existent properties, methods, or events.

## Table of Contents
- [Properties](#properties)
- [Methods](#methods)
- [Events](#events)
- [Position Values](#position-values)
- [TipPointerPosition Values](#tippointerposition-values)

---

## Properties

| Property | Tag Helper Attr | Type | Default | Description |
|----------|-----------------|------|---------|-------------|
| `AfterClose` | `afterClose` | `string` (JS function) | `null` | Triggers `afterClose` event when the Tooltip Component gets closed |
| `AfterOpen` | `afterOpen` | `string` (JS function) | `null` | Triggers `afterOpen` event after the Tooltip Component gets opened |
| `Animation` | `animation` | `object` | `null` | Sets animation options for Tooltip open/close states |
| `BeforeClose` | `beforeClose` | `string` (JS function) | `null` | Triggers `beforeClose` event before the Tooltip hides from the screen |
| `BeforeCollision` | `beforeCollision` | `string` (JS function) | `null` | Triggers `beforeCollision` event for every collision fit calculation |
| `BeforeOpen` | `beforeOpen` | `string` (JS function) | `null` | Triggers `beforeOpen` event before the Tooltip is displayed over the target element |
| `BeforeRender` | `beforeRender` | `string` (JS function) | `null` | Triggers `beforeRender` event before the Tooltip and its contents are added to the DOM |
| `CloseDelay` | `closeDelay` | `double` | `0` | Delay (ms) before closing the tooltip |
| `Container` | `container` | `string` | `null` | Sets the container element in which the Tooltip's pop-up will be appended. Default is `body` |
| `Content` | `content` | `string` | `null` | Tooltip display content (string or HTML) |
| `ContentTemplate` | `contentTemplate` | `MvcTemplate<object>` | — | Tag template for content |
| `Created` | `created` | `string` (JS function) | `null` | Triggers `created` event after the Tooltip component is created |
| `CssClass` | `cssClass` | `string` | `null` | Custom CSS class(es) applied to the tooltip element |
| `Destroyed` | `destroyed` | `string` (JS function) | `null` | Triggers `destroyed` event when the Tooltip component is destroyed |
| `EnableHtmlParse` | `enableHtmlParse` | `bool` | `true` | Enables or disables parsing of HTML string content into HTML DOM elements |
| `EnableHtmlSanitizer` | `enableHtmlSanitizer` | `bool` | `true` | Sanitize untrusted HTML/scripts before rendering |
| `EnablePersistence` | `enablePersistence` | `bool` | `false` | Persist component's state between page reloads |
| `EnableRtl` | `enableRtl` | `bool` | `false` | Render component in right-to-left direction |
| `Height` | `height` | `string` | `"auto"` | Tooltip height; overflow enables scroll mode |
| `HtmlAttributes` | `htmlAttributes` | `object` | `null` | Additional HTML attributes (tabindex, title, name, etc.) on the Tooltip popup root element |
| `IsSticky` | `isSticky` | `bool` | `false` | Keep tooltip visible until closed by manually |
| `Locale` | `locale` | `string` | `""` | Overrides the global culture and localization value |
| `MouseTrail` | `mouseTrail` | `bool` | `false` | Tooltip follows mouse pointer movement |
| `OffsetX` | `offsetX` | `double` | `0` | Horizontal distance (px) between target and tooltip |
| `OffsetY` | `offsetY` | `double` | `0` | Vertical distance (px) between target and tooltip |
| `OpenDelay` | `openDelay` | `double` | `0` | Delay (ms) before opening the tooltip |
| `OpensOn` | `opensOn` | `string` | `"Auto"` | Trigger mode: `Auto` \| `Hover` \| `Click` \| `Focus` \| `Custom` (combinable with space) |
| `Position` | `position` | `Position` | `null` | Placement relative to target element (12 values) |
| `ShowTipPointer` | `showTipPointer` | `bool` | `true` | Show or hide the tip arrow pointer |
| `Target` | `target` | `string` | `null` | CSS selector for multi-target tooltips within the container |
| `TipPointerPosition` | `tipPointerPosition` | `TipPointerPosition` | `TipPointerPosition.Auto` | Tip arrow position: `Auto` \| `Start` \| `Middle` \| `End` |
| `Width` | `width` | `string` | `"auto"` | Tooltip width; `'auto'` fits content within viewport |
| `WindowCollision` | `windowCollision` | `bool` | `false` | Use viewport (window) as collision boundary when `target` is set |

---

## Methods (JavaScript)

After initializing the tooltip, access via JavaScript instance:

```javascript
var tooltipObj = document.getElementById('tooltip').ej2_instances[0];
```

### `open(element?, animation?)`

Shows the tooltip on a specified target element with optional animation settings.

```javascript
tooltipObj.open(targetElement);
```

---

### `close(animation?)`

Hides the tooltip with optional animation settings.

```javascript
tooltipObj.close();
```

---

### `refresh(target?)`

Recalculates and updates the tooltip's content and/or position.

```javascript
tooltipObj.refresh();
```

> Use after programmatically changing `position` or when the target element moves.

---

### `destroy()`

Destroys the tooltip component instance and cleans up event listeners.

```javascript
tooltipObj.destroy();
```

---

### `dataBind()`

Applies all pending property changes to the component immediately.

```javascript
tooltipObj.content = 'New content';
tooltipObj.dataBind();
```

---

## Events

| Event | Type | Description |
|-------|------|-------------|
| `AfterClose` | `TooltipEventArgs` | Triggered after the Tooltip Component gets closed |
| `AfterOpen` | `TooltipEventArgs` | Triggered after the Tooltip Component gets opened |
| `BeforeClose` | `TooltipEventArgs` | Triggered before the Tooltip hides from the screen. If returned false, the Tooltip is no more hidden |
| `BeforeCollision` | `TooltipEventArgs` | Triggered for every collision fit calculation |
| `BeforeOpen` | `TooltipEventArgs` | Triggered before the Tooltip is displayed over the target element. Setting `cancel` to true prevents display |
| `BeforeRender` | `TooltipEventArgs` | Triggered before the Tooltip and its contents are added to the DOM. Setting `cancel` to true prevents rendering |
| `Created` | `object` | Triggered after the Tooltip component is created |
| `Destroyed` | `object` | Triggered when the Tooltip component is destroyed |

---

## Position Values (Position Enum)

| Position | Description |
|----------|-------------|
| `TopLeft` | Tooltip appears top-left of the target |
| `TopCenter` | Tooltip appears top-center of the target (default) |
| `TopRight` | Tooltip appears top-right of the target |
| `BottomLeft` | Tooltip appears bottom-left of the target |
| `BottomCenter` | Tooltip appears bottom-center of the target |
| `BottomRight` | Tooltip appears bottom-right of the target |
| `LeftTop` | Tooltip appears left-top of the target |
| `LeftCenter` | Tooltip appears left-center of the target |
| `LeftBottom` | Tooltip appears left-bottom of the target |
| `RightTop` | Tooltip appears right-top of the target |
| `RightCenter` | Tooltip appears right-center of the target |
| `RightBottom` | Tooltip appears right-bottom of the target |

---

## TipPointerPosition Values

| Value | Description |
|-------|-------------|
| `Auto` | Automatically positions the tip pointer based on tooltip placement (default) |
| `Start` | Positions the tip pointer at the start edge |
| `Middle` | Positions the tip pointer at the middle |
| `End` | Positions the tip pointer at the end edge |
