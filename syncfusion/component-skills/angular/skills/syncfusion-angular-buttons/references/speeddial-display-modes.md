# Speed Dial Display Modes

## Table of Contents
- [Overview](#overview)
- [Linear Mode](#linear-mode)
- [Radial Mode](#radial-mode)
- [Choosing a Mode](#choosing-a-mode)

---

## Overview

The `mode` property controls how action items are displayed when the Speed Dial is open:

| Mode | Description | Default |
|---|---|---|
| `Linear` | Items in a straight line (list-like) | ✅ Yes |
| `Radial` | Items in a circular/arc pattern | No |

---

## Linear Mode

In `Linear` mode, action items appear in a list-like format, either vertically or horizontally. This is the default.

### Direction

The `direction` property controls which side the items appear on relative to the Speed Dial button:

| Value | Behavior |
|---|---|
| `Up` | Items appear above the button |
| `Down` | Items appear below the button |
| `Left` | Items appear to the left |
| `Right` | Items appear to the right |
| `Auto` | Direction auto-calculated from `position` (default) |

When `Auto` is used with `position='BottomRight'`, items open upward — which is the expected behavior for a FAB.

### Example: Linear with explicit direction

```typescript
import { Component } from '@angular/core';
import { SpeedDialModule, SpeedDialItemModel } from '@syncfusion/ej2-angular-buttons';

@Component({
  imports: [SpeedDialModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <div id="targetElement" style="position:relative; min-height:350px; border:1px solid;"></div>
    <button ejs-speeddial
      id="speeddial"
      openIconCss="e-icons e-edit"
      closeIconCss="e-icons e-close"
      target="#targetElement"
      [items]="items"
      mode="Linear"
      direction="Left">
    </button>
  `
})
export class AppComponent {
  public items: SpeedDialItemModel[] = [
    { iconCss: 'e-icons e-cut' },
    { iconCss: 'e-icons e-copy' },
    { iconCss: 'e-icons e-paste' }
  ];
}
```

---

## Radial Mode

In `Radial` mode, action items are arranged in a circular arc around the Speed Dial button — similar to a radial/pie menu.

### radialSettings

Configure the radial layout using `radialSettings` (`RadialSettingsModel`):

| Field | Type | Default | Description |
|---|---|---|---|
| `direction` | `RadialDirection` | `'Auto'` | `'Clockwise'`, `'AntiClockwise'`, or `'Auto'` |
| `startAngle` | `number` | `null` | Starting angle in degrees |
| `endAngle` | `number` | `null` | Ending angle in degrees |
| `offset` | `string` | `''` | Distance between button and items (e.g. `'80px'`) |

When `startAngle` and `endAngle` are not set, the arc is auto-calculated from `position`.

### Example: Basic radial menu

```typescript
import { Component } from '@angular/core';
import { SpeedDialModule, SpeedDialItemModel } from '@syncfusion/ej2-angular-buttons';

@Component({
  imports: [SpeedDialModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <div id="targetElement" style="position:relative; min-height:350px; border:1px solid;"></div>
    <button ejs-speeddial
      id="speeddial"
      openIconCss="e-icons e-edit"
      closeIconCss="e-icons e-close"
      target="#targetElement"
      [items]="items"
      mode="Radial"
      position="MiddleCenter">
    </button>
  `
})
export class AppComponent {
  public items: SpeedDialItemModel[] = [
    { iconCss: 'e-icons e-cut' },
    { iconCss: 'e-icons e-copy' },
    { iconCss: 'e-icons e-paste' },
    { iconCss: 'e-icons e-edit' },
    { iconCss: 'e-icons e-save' }
  ];
}
```

### Example: Radial with custom direction and angles

```typescript
import { Component } from '@angular/core';
import { SpeedDialModule, SpeedDialItemModel, RadialSettingsModel } from '@syncfusion/ej2-angular-buttons';

@Component({
  imports: [SpeedDialModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <div id="targetElement" style="position:relative; min-height:350px; border:1px solid;"></div>
    <button ejs-speeddial
      id="speeddial"
      openIconCss="e-icons e-edit"
      closeIconCss="e-icons e-close"
      target="#targetElement"
      [items]="items"
      mode="Radial"
      position="MiddleRight"
      [radialSettings]="radialSettings">
    </button>
  `
})
export class AppComponent {
  public items: SpeedDialItemModel[] = [
    { iconCss: 'e-icons e-cut' },
    { iconCss: 'e-icons e-copy' },
    { iconCss: 'e-icons e-paste' },
    { iconCss: 'e-icons e-edit' },
    { iconCss: 'e-icons e-save' }
  ];

  public radialSettings: RadialSettingsModel = {
    direction: 'AntiClockwise',
    startAngle: 90,
    endAngle: 270,
    offset: '80px'
  };
}
```

### Example: Anticlockwise direction only

```typescript
public radialSettings: RadialSettingsModel = { direction: 'AntiClockwise' };
```

### Example: Custom start and end angle

```typescript
public radialSettings: RadialSettingsModel = {
  direction: 'AntiClockwise',
  startAngle: 180,
  endAngle: 360
};
```

---

## Choosing a Mode

| Use `Linear` when... | Use `Radial` when... |
|---|---|
| Items should be in a list/toolbar layout | Items should spread around a central button |
| Limited number of items (3–5) | 4–6 items in a radial/circular UI |
| Clear directional hierarchy is needed | Equal-weight, context-menu-like actions |
| Bottom-right FAB pattern | Center-positioned contextual menus |
