# API Reference — Syncfusion ASP.NET Core Skeleton

> **Source:** [https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Notifications.Skeleton.html](https://help.syncfusion.com/cr/aspnetcore-js2/Syncfusion.EJ2.Notifications.Skeleton.html)  
> **Namespace:** `Syncfusion.EJ2.Notifications`  
> **Assembly:** `Syncfusion.EJ2.dll`

## Table of Contents
- [Class Skeleton — Properties](#class-skeleton--properties)
- [Tag Helper Syntax Reference](#tag-helper-syntax-reference)
- [Enums](#enums)
- [Usage Examples](#usage-examples)

---

## Class Skeleton — Properties

### CssClass
Defines single/multiple classes (separated by space) to be used for customization of Skeleton.

- **Type:** `string`
- **Default:** `""`
- **Tag attribute:** `cssClass`

### EnablePersistence
Enable or disable persisting component's state between page reloads.

- **Type:** `bool`
- **Default:** `false`
- **Tag attribute:** `enable-persistence`

### EnableRtl
Enable or disable rendering component in right to left direction.

- **Type:** `bool`
- **Default:** `false`
- **Tag attribute:** `enableRtl`

### Height
Defines the height of the Skeleton. Height is not required when shape is `"Circle"` and `"Square"`.

- **Type:** `string`
- **Default:** `""`
- **Tag attribute:** `height`

### HtmlAttributes
Allows additional HTML attributes such as title, name, etc., and accepts n number of attributes in a key-value pair format.

- **Type:** `object`
- **Tag attribute:** `html-attributes`

### Label
Defines the `aria-label` for Skeleton accessibility.

- **Type:** `string`
- **Default:** `"Loading..."`
- **Tag attribute:** `label`

### Locale
Overrides the global culture and localization value for this component. Default global culture is `'en-US'`.

- **Type:** `string`
- **Default:** `""`
- **Tag attribute:** `locale`

### Shape
Defines the shape of the Skeleton.

- **Type:** `SkeletonType` (enum)
- **Default:** `SkeletonType.Text`
- **Tag attribute:** `shape`
- **Values:** `"Text"` | `"Circle"` | `"Square"` | `"Rectangle"`

### ShimmerEffect
Defines the animation effect of the Skeleton.

- **Type:** `ShimmerEffect` (enum)
- **Default:** `ShimmerEffect.Wave`
- **Tag attribute:** `shimmerEffect`
- **Values:** `"Wave"` | `"Pulse"` | `"Fade"`

### Visible
Defines the visibility state of Skeleton.

- **Type:** `bool`
- **Default:** `true`
- **Tag attribute:** `visible`

### Width
Defines the width of the Skeleton. Width will be prioritized and used as dimension when shape is `"Circle"` and `"Square"`.

- **Type:** `string`
- **Default:** `""`
- **Tag attribute:** `width`

---

## Tag Helper Syntax Reference

| C# Property | Tag Helper Attribute | Element / Form |
|---|---|---|
| `Shape` | `shape` | `SkeletonType` enum |
| `Width` | `width` | `string` |
| `Height` | `height` | `string` |
| `ShimmerEffect` | `shimmerEffect` | `ShimmerEffect` enum |
| `CssClass` | `cssClass` | `string` |
| `Label` | `label` | `string` |
| `Visible` | `visible` | `bool` |
| `EnableRtl` | `enableRtl` | `bool` |
| `EnablePersistence` | `enable-persistence` | `bool` |
| `Locale` | `locale` | `string` |
| `HtmlAttributes` | `html-attributes` | `object` |

---

## Enums

### SkeletonType
Defines the `shape` attribute values:

| Value | Description |
|---|---|
| `Text` | Horizontal line (default) |
| `Circle` | Circle/round shape |
| `Square` | Equal-sided square |
| `Rectangle` | Rectangular block |

### ShimmerEffect
Defines the `shimmerEffect` attribute values:

| Value | Description |
|---|---|
| `Wave` | Left-to-right sweeping wave (default) |
| `Pulse` | Uniform fade in/out pulsing |
| `Fade` | Gradual fade animation |

---

## Usage Examples

### All properties combined
```cshtml
<ejs-skeleton id="sk_all"
               shape="Rectangle"
               width="100%"
               height="200px"
               shimmerEffect="Pulse"
               cssClass="my-card-skeleton"
               label="Loading featured image"
               visible="true"
               enableRtl="false"
               enable-persistence="false">
</ejs-skeleton>
```

### Minimal text skeleton
```cshtml
<ejs-skeleton id="sk_min" height="15px"></ejs-skeleton>
```

### Circle with custom label
```cshtml
<ejs-skeleton id="sk_avatar_lbl" shape="Circle" width="48px" label="Loading profile photo"></ejs-skeleton>
```

### Hidden skeleton (content loaded)
```cshtml
<ejs-skeleton id="sk_hidden" height="20px" width="50%" visible="false"></ejs-skeleton>
```
