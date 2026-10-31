# Chip Customization

## Table of Contents
- [Predefined Styles](#predefined-styles)
- [Leading Icon](#leading-icon)
- [Leading Icon URL](#leading-icon-url)
- [Avatar Image](#avatar-image)
- [Avatar Text](#avatar-text)
- [Trailing Icon](#trailing-icon)
- [Trailing Icon URL](#trailing-icon-url)
- [Outline Chip](#outline-chip)
- [HTML Attributes](#html-attributes)
- [Disabled State](#disabled-state)
- [RTL Support](#rtl-support)

---

## Predefined Styles

Apply semantic color styles using the `CssClass` property on `ChipItem` or `ChipList`.

| Class | Meaning |
|-------|---------|
| `e-primary` | Primary action or important chip |
| `e-success` | Positive / success status |
| `e-info` | Informational / neutral content |
| `e-warning` | Caution or warning |
| `e-danger` | Error, negative, or destructive action |

```razor
<ejs-chiplist id="styled-chips">
    <e-chips>
        <e-chip text="Primary" cssClass="e-primary"></e-chip>
        <e-chip text="Success" cssClass="e-success"></e-chip>
        <e-chip text="Info" cssClass="e-info"></e-chip>
        <e-chip text="Warning" cssClass="e-warning"></e-chip>
        <e-chip text="Danger" cssClass="e-danger"></e-chip>
    </e-chips>
</ejs-chiplist>
```

C# Controller:
```csharp
public IActionResult StyledChips()
{
    return View();
}
```

- Apply `CssClass` on `ChipItem` for per-chip styling, or on `ChipList` to apply to all chips.

---

## Leading Icon

Place an icon to the left of the chip text using `LeadingIconCss`. Define the CSS class with a background image.

```razor
<ejs-chiplist id="leading-icon-chips">
    <e-chips>
        <e-chip text="Andrew" leadingIconCss="andrew"></e-chip>
        <e-chip text="Janet" leadingIconCss="janet"></e-chip>
        <e-chip text="Laura" leadingIconCss="laura"></e-chip>
        <e-chip text="Margaret" leadingIconCss="margaret"></e-chip>
    </e-chips>
</ejs-chiplist>
```

CSS to define each icon class:
```css
.e-chip .andrew {
    background-image: url('/images/andrew.png');
    background-size: 24px;
    background-repeat: no-repeat;
    background-position: center;
}

.e-chip .janet {
    background-image: url('/images/janet.png');
    background-size: 24px;
}

.e-chip .laura {
    background-image: url('/images/laura.png');
    background-size: 24px;
}

.e-chip .margaret {
    background-image: url('/images/margaret.png');
    background-size: 24px;
}
```

- `LeadingIconCss` — CSS class applied to the leading icon element.
- Useful for displaying user avatars or category icons before the chip text.

---

## Leading Icon URL

Provide a direct image URL for the leading icon using `LeadingIconUrl`:

```razor
<ejs-chiplist id="icon-url-chips">
    <e-chips>
        <e-chip text="Profile" leadingIconUrl="https://example.com/images/profile.png"></e-chip>
        <e-chip text="Settings" leadingIconUrl="https://example.com/images/settings.png"></e-chip>
    </e-chips>
</ejs-chiplist>
```

- `LeadingIconUrl` sets the `src` of an `<img>` element inside the chip.
- Useful when you don't want to define CSS background-image classes.
- Supports both absolute and relative URLs.

---

## Avatar Image

Display a circular avatar image using `AvatarIconCss`. The CSS class defines the avatar's background image.

```razor
<ejs-chiplist id="avatar-chips">
    <e-chips>
        <e-chip text="Andrew" avatarIconCss="andrew-avatar"></e-chip>
        <e-chip text="Janet" avatarIconCss="janet-avatar"></e-chip>
        <e-chip text="Laura" avatarIconCss="laura-avatar"></e-chip>
        <e-chip text="Margaret" avatarIconCss="margaret-avatar"></e-chip>
    </e-chips>
</ejs-chiplist>
```

CSS:
```css
.e-chip .andrew-avatar {
    background-image: url('/images/andrew.jpg');
    border-radius: 50%;
    background-size: cover;
}

.e-chip .janet-avatar {
    background-image: url('/images/janet.jpg');
    border-radius: 50%;
    background-size: cover;
}

.e-chip .laura-avatar {
    background-image: url('/images/laura.jpg');
    border-radius: 50%;
    background-size: cover;
}

.e-chip .margaret-avatar {
    background-image: url('/images/margaret.jpg');
    border-radius: 50%;
    background-size: cover;
}
```

C# to bind data:
```csharp
public IActionResult AvatarChips()
{
    var chips = new List<ChipModel>
    {
        new ChipModel { Text = "Andrew", AvatarIconCss = "andrew-avatar" },
        new ChipModel { Text = "Janet", AvatarIconCss = "janet-avatar" }
    };
    return View(chips);
}
```

---

## Avatar Text

Display text initials in a circular avatar using `AvatarText`:

```razor
<ejs-chiplist id="avatar-text-chips">
    <e-chips>
        <e-chip text="Andrew" avatarText="A"></e-chip>
        <e-chip text="Janet" avatarText="J"></e-chip>
        <e-chip text="Laura" avatarText="L"></e-chip>
        <e-chip text="Margaret" avatarText="M"></e-chip>
    </e-chips>
</ejs-chiplist>
```

CSS for avatar styling:
```css
.e-chip .e-chip-avatar {
    background-color: #007bff;
    color: #ffffff;
    font-weight: bold;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    width: 32px;
    height: 32px;
}
```

C# to generate initials:
```csharp
public class ChipHelper
{
    public static string GetInitials(string fullName)
    {
        var parts = fullName.Split(' ');
        return string.Concat(parts.Select(p => p.FirstOrDefault())).ToUpper();
    }
}

// Usage in view
<e-chip-item text="@person.Name" avatar-text="@ChipHelper.GetInitials(person.Name)"></e-chip-item>
```

---

## Trailing Icon

Place an icon to the right of the chip text using `TrailingIconCss`:

```razor
<ejs-chiplist id="trailing-icon-chips">
    <e-chips>
        <e-chip text="Edit" trailingIconCss="edit-icon"></e-chip>
        <e-chip text="Delete" trailingIconCss="delete-icon"></e-chip>
        <e-chip text="Share" trailingIconCss="share-icon"></e-chip>
    </e-chips>
</ejs-chiplist>
```

CSS:
```css
.e-chip .edit-icon {
    background-image: url('/images/edit.svg');
    background-size: 18px;
    background-repeat: no-repeat;
    background-position: center;
    width: 18px;
    height: 18px;
}

.e-chip .delete-icon {
    background-image: url('/images/delete.svg');
    background-size: 18px;
}

.e-chip .share-icon {
    background-image: url('/images/share.svg');
    background-size: 18px;
}
```

- Useful for action indicators or status icons after the main chip label.

---

## Trailing Icon URL

Provide a direct image URL for the trailing icon using `TrailingIconUrl`:

```razor
<ejs-chiplist id="trailing-url-chips">
    <e-chips>
        <e-chip text="Remove" trailingIconUrl="https://example.com/images/close.svg"></e-chip>
        <e-chip text="Save" trailingIconUrl="https://example.com/images/check.svg"></e-chip>
    </e-chips>
</ejs-chiplist>
```

- Similar to `LeadingIconUrl`, this sets the `src` of an `<img>` element.

---

## Outline Chip

Create outline-style chips (bordered, no fill) using the `e-outline` CSS class:

```razor
<ejs-chiplist id="outline-chips" cssClass="e-outline">
    <e-chips>
        <e-chip text="Outlined"></e-chip>
        <e-chip text="Style"></e-chip>
        <e-chip text="Chip"></e-chip>
    </e-chips>
</ejs-chiplist>
```

Custom outline styling:
```css
.e-chip-list .e-chip.e-outline {
    border: 2px solid #007bff;
    background-color: transparent;
    color: #007bff;
}

.e-chip-list .e-chip.e-outline:hover {
    background-color: rgba(0, 123, 255, 0.1);
}
```

---

## HTML Attributes

Pass custom HTML attributes to chips using `HtmlAttributes`:

```razor
@{
    var chipAttributes = new Dictionary<string, object>
    {
        { "data-id", "123" },
        { "data-category", "react" },
        { "title", "React Framework" }
    };
}

<ejs-chiplist id="custom-attrs-chips">
    <e-chips>
        <e-chip text="React" htmlAttributes="chipAttributes"></e-chip>
    </e-chips>
</ejs-chiplist>
```

C# Controller:
```csharp
public IActionResult ChipsWithAttrs()
{
    var chips = new List<ChipModel>
    {
        new ChipModel
        {
            Text = "React",
            HtmlAttributes = new Dictionary<string, object>
            {
                { "data-id", "1" },
                { "title", "React Framework" }
            }
        }
    };
    return View(chips);
}
```

---

## Disabled State

Disable individual chips or the entire chip list:

```razor
<!-- Disable entire chip list -->
<ejs-chiplist id="disabled-chips" enabled="false">
    <e-chips>
        <e-chip text="Disabled"></e-chip>
    </e-chips>
</ejs-chiplist>

<!-- Disable individual chips -->
<ejs-chiplist id="partial-disabled-chips">
    <e-chips>
        <e-chip text="Enabled" enabled="true"></e-chip>
        <e-chip text="Disabled" enabled="false"></e-chip>
    </e-chips>
</ejs-chiplist>
```

Disabled state styling:
```css
.e-chip-list .e-chip:disabled,
.e-chip-list .e-chip[aria-disabled="true"] {
    opacity: 0.5;
    cursor: not-allowed;
    pointer-events: none;
}
```

C# to programmatically disable:
```csharp
var disabledChips = new List<ChipModel>
{
    new ChipModel { Text = "Enabled", Enabled = true },
    new ChipModel { Text = "Disabled", Enabled = false }
};
```

---

## RTL Support

Enable right-to-left layout for Arabic, Hebrew, and other RTL languages:

```razor
<ejs-chiplist id="rtl-chips" enableRtl="true" selection="Multiple">
    <e-chips>
        <e-chip text="واجهة مستخدم"></e-chip>
        <e-chip text="تطبيق ويب"></e-chip>
        <e-chip text="قاعدة البيانات"></e-chip>
    </e-chips>
</ejs-chiplist>
```

In `_Layout.cshtml` for global RTL:
```razor
@{
    var enableRtl = CultureInfo.CurrentCulture.TextInfo.IsRightToLeft;
}

<html dir="@(enableRtl ? "rtl" : "ltr")">
<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width" />
    <title>@ViewBag.Title</title>
</head>
<body>
    @RenderBody()
</body>
</html>
```

---

## Summary

This guide covers all customization options for Syncfusion ASP.NET Core Chips. Combine multiple customization features to create unique, branded chip experiences that match your design requirements.
