# Skeleton Styles and Visibility

## Table of Contents
- [Custom CSS with cssClass](#custom-css-with-cssClass)
- [Visibility Control](#visibility-control)
- [Loading to Content Transition](#loading-to-content-transition)
- [CSS Customization Examples](#css-customization-examples)

---

## Custom CSS with cssClass

Use the `cssClass` attribute to apply one or more CSS classes to an `<ejs-skeleton>`. This lets you override the default skeleton appearance — changing shimmer wave color, background color, dimensions, border radius, or animation speed.

```cshtml
<ejs-skeleton id="sk_custom" shape="Circle" width="60px" cssClass="e-customize"></ejs-skeleton>
```

Define the class in your CSS file:

```css
/* wwwroot/css/site.css — example: custom purple shimmer wave */
.e-customize.e-skeleton {
  background-color: #e8d5f5;
}

.e-customize.e-skeleton::after {
  background: linear-gradient(
    90deg,
    transparent,
    rgba(150, 80, 200, 0.4),
    transparent
  );
}
```

Multiple classes are supported (space-separated):

```cshtml
<ejs-skeleton id="sk_combo" height="15px" width="80%" cssClass="e-custom-bg e-custom-wave"></ejs-skeleton>
```

---

## Visibility Control

Use the `visible` attribute to show or hide the skeleton placeholder based on your application's loading state.

- `visible="true"` — Skeleton is displayed (default)
- `visible="false"` — Skeleton is hidden

```cshtml
<ejs-skeleton id="sk_visible" height="15px" width="60%" visible="true"></ejs-skeleton>
```

The `visible` attribute enables dynamic toggling without re-rendering the tag helper. Set it to `false` when content has finished loading, then render your actual content.

---

## Loading to Content Transition

A common pattern is to conditionally render either the skeleton or the real content based on loading state:

```cshtml
@* ~/Pages/Index.cshtml *@
@{
    var loading = true;
    var userName = "Jane Smith";
    var userRole = "Developer";
}
<div style="display: flex; align-items: center; gap: 12px; padding: 16px;">
    @if (loading)
    {
        <ejs-skeleton id="sk_user_av" shape="Circle" width="48px"></ejs-skeleton>
        <div>
            <ejs-skeleton id="sk_user_name" width="120px" height="15px"></ejs-skeleton>
            <br />
            <ejs-skeleton id="sk_user_role" width="80px" height="12px"></ejs-skeleton>
        </div>
    }
    else
    {
        <div style="width: 48px; height: 48px; border-radius: 50%; background: #6366f1;"></div>
        <div>
            <strong>@userName</strong>
            <p style="margin: 0; font-size: 12px;">@userRole</p>
        </div>
    }
</div>
```

Alternatively, use the `visible` attribute to hide the skeleton while keeping it in the DOM:

```cshtml
@* ~/Pages/Index.cshtml *@
@{
    var fadingLoading = true;
}
<div>
    <ejs-skeleton id="sk_fade" height="20px" width="200px" visible="@fadingLoading"></ejs-skeleton>
    @if (!fadingLoading)
    {
        <h2>Content Loaded!</h2>
    }
</div>
```

---

## CSS Customization Examples

### Change background color
```css
/* wwwroot/css/site.css */
.my-skeleton.e-skeleton {
  background-color: #dbeafe; /* light blue */
}
```

### Change wave/shimmer color
```css
.my-skeleton.e-skeleton::after {
  background: linear-gradient(
    90deg,
    transparent,
    rgba(59, 130, 246, 0.5),
    transparent
  );
}
```

### Slow down animation
```css
.my-skeleton.e-skeleton::after {
  animation-duration: 2.5s;
}
```

### Rounded rectangle
```css
.rounded-skeleton.e-skeleton {
  border-radius: 8px;
}
```

Apply the class:

```cshtml
<ejs-skeleton id="sk_rounded" shape="Rectangle" width="100%" height="120px" cssClass="rounded-skeleton"></ejs-skeleton>
```
