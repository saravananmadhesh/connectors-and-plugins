# Skeleton Shapes

## Table of Contents
- [Overview](#overview)
- [Available Shapes](#available-shapes)
- [Dimension Rules by Shape](#dimension-rules-by-shape)
- [Shape Examples](#shape-examples)
- [Multi-Shape Card Layout](#multi-shape-card-layout)
- [Choosing the Right Shape](#choosing-the-right-shape)

---

## Overview

Use the `shape` attribute on `<ejs-skeleton>` to select the visual form of the loading placeholder. Each shape is designed to mirror a specific type of real content, helping users understand what is loading.

```cshtml
<ejs-skeleton id="sk_avatar" shape="Circle" width="60px"></ejs-skeleton>
```

Default shape is `"Text"` when `shape` is omitted.

---

## Available Shapes

### Text (default)
Horizontal line representing a text row or headline. Use for paragraphs, titles, labels.

```cshtml
<ejs-skeleton id="sk_text" height="15px" width="70%"></ejs-skeleton>
```

### Circle
Round placeholder for avatars, profile photos, or circular icons.

```cshtml
<ejs-skeleton id="sk_circle" shape="Circle" width="60px"></ejs-skeleton>
```

### Square
Equal-sided placeholder for compact icons, thumbnails, or grid tiles.

```cshtml
<ejs-skeleton id="sk_square" shape="Square" width="40px"></ejs-skeleton>
```

### Rectangle
Rectangular placeholder for images, cards, banners, or large content blocks.

```cshtml
<ejs-skeleton id="sk_rect" shape="Rectangle" width="100%" height="150px"></ejs-skeleton>
```

---

## Dimension Rules by Shape

| Shape | Width | Height | Notes |
|-------|-------|--------|-------|
| `Text` | Optional | **Required** | Height controls line thickness |
| `Rectangle` | **Required** | **Required** | Both dimensions define the block |
| `Circle` | **Required** | Not needed | `width` is used as diameter |
| `Square` | **Required** | Not needed | `width` is used as side length |

> Height is ignored for `Circle` and `Square`; `width` alone determines their size.

---

## Shape Examples

### Circle — Avatar
```cshtml
<ejs-skeleton id="sk_avatar" shape="Circle" width="60px"></ejs-skeleton>
```

### Square — Icon tile
```cshtml
<ejs-skeleton id="sk_icon" shape="Square" width="40px"></ejs-skeleton>
```

### Rectangle — Banner image
```cshtml
<ejs-skeleton id="sk_banner" shape="Rectangle" width="100%" height="200px"></ejs-skeleton>
```

### Text — Headline
```cshtml
<ejs-skeleton id="sk_head" height="20px" width="50%"></ejs-skeleton>
```

### Text — Body paragraph lines
```cshtml
<ejs-skeleton id="sk_p1" height="14px" width="100%"></ejs-skeleton>
<br />
<ejs-skeleton id="sk_p2" height="14px" width="95%"></ejs-skeleton>
<br />
<ejs-skeleton id="sk_p3" height="14px" width="80%"></ejs-skeleton>
```

---

## Multi-Shape Card Layout

Combine shapes to build a full card skeleton that mirrors real card content:

```cshtml
@* ~/Pages/Index.cshtml *@
<div style="padding: 16px; max-width: 320px;">
    @* Profile row *@
    <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 12px;">
        <ejs-skeleton id="sk_avatar_card" shape="Circle" width="60px"></ejs-skeleton>
        <div style="flex: 1;">
            <ejs-skeleton id="sk_name"   width="30%" height="15px"></ejs-skeleton>
            <br />
            <ejs-skeleton id="sk_sub"    width="15%" height="15px"></ejs-skeleton>
        </div>
    </div>

    @* Image placeholder *@
    <ejs-skeleton id="sk_card_image" shape="Rectangle" width="100%" height="150px"></ejs-skeleton>

    @* Action buttons row *@
    <div style="display: flex; gap: 8px; margin-top: 12px;">
        <ejs-skeleton id="sk_btn1" shape="Rectangle" width="20%" height="32px"></ejs-skeleton>
        <ejs-skeleton id="sk_btn2" shape="Rectangle" width="20%" height="32px"></ejs-skeleton>
    </div>
</div>
```

---

## Choosing the Right Shape

| Content type | Recommended shape |
|---|---|
| Avatar / profile photo | `Circle` |
| Icon / badge | `Square` |
| Image / banner / card | `Rectangle` |
| Text line / heading | `Text` (default) |
| Button | `Rectangle` with small height |
| Paragraph block | Multiple `Text` lines stacked |
