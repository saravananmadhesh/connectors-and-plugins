# Chip Style Customization

## Table of Contents
- [Overview](#overview)
- [Chip Text Styling](#chip-text-styling)
- [Chip Icon Styling](#chip-icon-styling)
- [Chip Delete Button Styling](#chip-delete-button-styling)
- [Outline Chip Border Styling](#outline-chip-border-styling)
- [Chip Selection Styling](#chip-selection-styling)
- [Avatar Text Styling](#avatar-text-styling)
- [Chip Height / Size Customization](#chip-height--size-customization)
- [CSS Class Hierarchy](#css-class-hierarchy)

---

## Overview

Syncfusion Chips expose a set of CSS classes that you can override to customize appearance without modifying component internals. All customizations follow the pattern:

1. Define your CSS rule targeting the chip's specific CSS class.
2. Place overrides in your component's CSS file (e.g., `wwwroot/css/site.css`) or a global stylesheet.
3. Avoid using `!important` unless overriding vendor specificity.

---

## Chip Text Styling

Customize the chip label's font size, color, and weight:

```css
.e-chip .e-chip-text {
    font-size: 14px;
    color: #333333;
    font-weight: 600;
}
```

- `.e-chip-text` — targets the text label inside every chip.

**Example: Larger, bold chip labels**
```css
.e-chip .e-chip-text {
    font-size: 16px;
    color: #1a1a2e;
    font-weight: bold;
}
```

---

## Chip Icon Styling

Customize the icon inside a chip (used with `leadingIconCss` or `avatarIconCss`):

```css
.e-chip .e-icon {
    background-image: url('https://example.com/images/avatar.png');
    opacity: 0.8;
}
```

- `.e-icon` — targets the icon element inside the chip.
- Set `background-image` for image-based icons.
- Adjust `opacity`, `width`, `height` as needed.

**Per-chip icon styling:**
```css
.e-chip .andrew {
    background-image: url('/images/andrew.png');
    background-size: cover;
    border-radius: 50%;
}

.e-chip .janet {
    background-image: url('/images/janet.png');
    background-size: cover;
    border-radius: 50%;
}
```

**Razor usage:**
```razor
<ejs-chiplist id="user-chips">
    <e-chips>
        <e-chip text="Andrew" leadingIconCss="andrew"></e-chip>
        <e-chip text="Janet" leadingIconCss="janet"></e-chip>
    </e-chips>
</ejs-chiplist>
```

---

## Chip Delete Button Styling

Customize the appearance of the delete (×) button shown when `enableDelete="true"`:

```css
.e-chip-list .e-chip .e-chip-delete.e-dlt-btn {
    color: #e3165b;
    font-size: 12px;
}
```

- `.e-chip-delete.e-dlt-btn` — targets the delete button element.
- Adjust `color` and `font-size` to match your design.

**Hover state for delete button:**
```css
.e-chip-list .e-chip .e-chip-delete.e-dlt-btn:hover {
    color: #b0003a;
    cursor: pointer;
}
```

**Razor usage:**
```razor
<ejs-chiplist id="deletable-chips" enableDelete="true">
    <e-chips>
        <e-chip text="Item 1"></e-chip>
        <e-chip text="Item 2"></e-chip>
    </e-chips>
</ejs-chiplist>
```

---

## Outline Chip Border Styling

Customize the border of outline chips (chips with `cssClass="e-outline"`):

```css
.e-chip-list .e-chip.e-outline {
    border-color: #e3165b;
    border-width: 2px;
    border-style: solid;
}
```

- `.e-chip.e-outline` — targets chips that use the outline variant.
- Modify `border-color`, `border-width`, and `border-style` freely.

**Razor usage:**
```razor
<ejs-chiplist id="outline-chips" cssClass="e-outline">
    <e-chips>
        <e-chip text="Outline 1"></e-chip>
        <e-chip text="Outline 2"></e-chip>
    </e-chips>
</ejs-chiplist>
```

---

## Chip Selection Styling

Customize the appearance of chips when they are selected (active state):

```css
/* Single selection — active chip */
.e-chip-list.e-selection .e-chip.e-active {
    background-color: #ffca1c;
    color: #e3165b;
}

/* Multiple selection — active chips */
.e-chip-list .e-chip.e-active {
    background-color: #e3165b;
    color: #ffffff;
}
```

- `.e-chip.e-active` — applied to chips in the selected state.
- `.e-chip-list.e-selection` — scopes rules to chip lists with `selection="Single"`.
- Use high-contrast colors to ensure WCAG compliance.

**Example: Custom teal selection**
```css
.e-chip-list .e-chip.e-active {
    background-color: #00796b;
    color: #ffffff;
}
```

**Razor usage:**
```razor
<ejs-chiplist id="selectable-chips" selection="Multiple">
    <e-chips>
        <e-chip text="Option 1"></e-chip>
        <e-chip text="Option 2"></e-chip>
        <e-chip text="Option 3"></e-chip>
    </e-chips>
</ejs-chiplist>
```

---

## Avatar Text Styling

Customize the circular avatar area that shows text (used with `avatarText`):

```css
.e-chip-list .e-chip .e-chip-avatar {
    background-color: #d51a1a;
    color: #fafafa;
}
```

- `.e-chip-avatar` — targets the avatar container element.
- Set `background-color` for the avatar circle color and `color` for the text inside it.

**Example: Blue avatar for initials**
```css
.e-chip-list .e-chip .e-chip-avatar {
    background-color: #1565c0;
    color: #ffffff;
    font-weight: bold;
}
```

**Razor usage:**
```razor
<ejs-chiplist id="avatar-chips">
    <e-chips>
        <e-chip text="Andrew" avatarText="A"></e-chip>
        <e-chip text="Janet" avatarText="J"></e-chip>
    </e-chips>
</ejs-chiplist>
```

---

## Chip Height / Size Customization

Override the chip height to match your design system's scale:

```css
/* Larger chips */
.e-chip-list.e-chip {
    height: 40px;
}

/* Smaller chips */
.e-chip-list .e-chip {
    height: 24px;
    font-size: 11px;
    padding: 0 8px;
}
```

- Adjust `height`, `padding`, and `font-size` together for consistent scaling.
- Ensure the avatar/icon sizes also scale proportionally.

**Full scaling example:**
```css
.e-chip-list .e-chip {
    height: 36px;
    font-size: 13px;
    padding: 0 12px;
    border-radius: 18px;
}

.e-chip-list .e-chip .e-chip-avatar {
    width: 28px;
    height: 28px;
    line-height: 28px;
    font-size: 12px;
}
```

---

## CSS Class Hierarchy

The chip component uses a hierarchical class structure:

```
.e-chip-list           (wrapper)
  └── .e-chip          (individual chip)
      ├── .e-chip-text           (chip label)
      ├── .e-chip-avatar         (circular avatar)
      ├── .e-icon                (icon element)
      ├── .e-chip-delete         (delete button)
      │   └── .e-dlt-btn         (delete button icon)
      ├── .e-active              (selected state)
      ├── .e-outline             (outline variant)
      ├── .e-primary             (primary color)
      ├── .e-success             (success color)
      ├── .e-info                (info color)
      ├── .e-warning             (warning color)
      └── .e-danger              (danger color)
```

**C# Model binding for dynamic styles:**
```csharp
public class ChipStyleModel
{
    public string Text { get; set; }
    public string CssClass { get; set; }
    public string CustomColor { get; set; }
}
```

```razor
@model List<ChipStyleModel>

<ejs-chiplist id="dynamic-style-chips">
    <e-chips>
        @foreach (var chip in Model)
        {
            <e-chip text="@chip.Text" cssClass="@chip.CssClass"></e-chip>
        }
    </e-chips>
</ejs-chiplist>

<style>
    @foreach (var chip in Model.Where(c => !string.IsNullOrEmpty(c.CustomColor)))
    {
        <text>
        .e-chip-list .e-chip.custom-@chip.Text.Replace(" ", "-") {
            background-color: @chip.CustomColor;
            color: white;
        }
        </text>
    }
</style>
```

---

## Complete Styling Example

Here's a complete example combining multiple customizations:

**Razor View (`StyledChips.cshtml`):**
```razor
@{
    ViewData["Title"] = "Custom Styled Chips";
}

<ejs-chiplist id="branded-chips" cssClass="e-outline brand-chips">
    <e-chips>
        <e-chip text="Premium" cssClass="e-primary" avatarText="P"></e-chip>
        <e-chip text="Standard" cssClass="e-success" avatarText="S"></e-chip>
        <e-chip text="Trial" cssClass="e-warning" avatarText="T"></e-chip>
    </e-chips>
</ejs-chiplist>
```

**CSS (`wwwroot/css/site.css`):**
```css
/* Brand-specific chip styles */
.e-chip-list.brand-chips .e-chip {
    border-radius: 20px;
    font-weight: 600;
    letter-spacing: 0.5px;
    transition: all 0.3s ease;
}

.e-chip-list.brand-chips .e-chip:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.e-chip-list.brand-chips .e-chip-avatar {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    font-weight: bold;
}

/* Primary chip customization */
.e-chip-list.brand-chips .e-chip.e-primary {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    border: none;
}

/* Success chip customization */
.e-chip-list.brand-chips .e-chip.e-success {
    background: linear-gradient(135deg, #11998e 0%, #38ef7d 100%);
    color: white;
    border: none;
}

/* Warning chip customization */
.e-chip-list.brand-chips .e-chip.e-warning {
    background: linear-gradient(135deg, #f7971e 0%, #ffd200 100%);
    color: #333;
    border: none;
}
```

**C# Controller:**
```csharp
public IActionResult StyledChips()
{
    return View();
}
```

---

## Summary

CSS customization provides unlimited flexibility to match your design system. Use the provided class names as hooks to style chips, and combine multiple CSS properties to create unique, branded chip experiences.
