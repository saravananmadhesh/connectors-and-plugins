# Customization – Syncfusion ASP.NET Core Mention

## Table of Contents
- [Show or Hide Mention Character](#show-or-hide-mention-character)
- [Custom Trigger Character](#custom-trigger-character)
- [Suffix Character After Selection](#suffix-character-after-selection)
- [Configure the Popup List Size](#configure-the-popup-list-size)
- [Require Leading Space](#require-leading-space)
- [CSS Class Customization](#css-class-customization)
- [Highlight Searched Characters](#highlight-searched-characters)

---

## Show or Hide Mention Character

Use `showMentionChar` to control whether the trigger character is prepended to the selected item's text in the editor.

- Default: `false` (selected value is inserted without the trigger character)

**Show mention char:**
```cshtml
<div id="mentionTarget" contenteditable="true"
     style="min-height: 100px; border: 1px solid #ccc; padding: 10px;">
</div>

<ejs-mention id="mentionElement" target="#mentionTarget"
    dataSource="@ViewBag.data"
    showMentionChar="true">
    <e-mention-fields text="Name" value="EmailId"></e-mention-fields>
</ejs-mention>
```

**Model:**
```csharp
public class EmailData
{
    public string Name { get; set; }
    public string EmailId { get; set; }
}
```

> With `showMentionChar="true"` and `mentionChar="@"`, selecting "Amy Fernandez" inserts `@Amy Fernandez` into the editor.

---

## Custom Trigger Character

Use `mentionChar` to change the character that triggers the suggestion popup. The default trigger character is `@`.

```cshtml
<ejs-mention id="mentionElement" target="#mentionTarget"
    dataSource="@ViewBag.data"
    mentionChar="#"
    showMentionChar="true">
    <e-mention-fields text="Name"></e-mention-fields>
</ejs-mention>
```

> Any single character can be used as the trigger. Common choices: `@` (people), `#` (tags/topics), `/` (commands).

---

## Suffix Character After Selection

Use `suffixText` to append text automatically after the selected item is inserted into the editor. This is useful for ensuring a space follows the mention, or for adding a newline.

```cshtml
<!-- Append a space after selection -->
<ejs-mention id="mentionElement" target="#mentionTarget"
    dataSource="@ViewBag.data"
    suffixText=" ">
    <e-mention-fields text="Name"></e-mention-fields>
</ejs-mention>
```

```cshtml
<!-- Append a newline after selection -->
<ejs-mention id="mentionElement" target="#mentionTarget"
    dataSource="@ViewBag.data"
    suffixText="&#xa;">
    <e-mention-fields text="Name"></e-mention-fields>
</ejs-mention>
```

**Model:**
```csharp
public class SportsData
{
    public string Game { get; set; }
    public int ID { get; set; }
}
```

> Default value of `suffixText` is `null` (empty string — nothing is appended).

---

## Configure the Popup List Size

Use `popupHeight` and `popupWidth` to control the suggestion list popup dimensions.

```cshtml
<ejs-mention id="mentionElement" target="#mentionTarget"
    dataSource="@ViewBag.data"
    popupHeight="200px"
    popupWidth="350px">
    <e-mention-fields text="CountryName" value="Code"></e-mention-fields>
</ejs-mention>
```

**Model:**
```csharp
public class CountryData
{
    public string CountryName { get; set; }
    public string Code { get; set; }
}
```

**Defaults:**
- `popupHeight`: `"300px"`
- `popupWidth`: `"auto"` (adjusts to suggestion list content width)

---

## Require Leading Space

The `requireLeadingSpace` property controls whether a space must precede the trigger character before the suggestion list activates.

- Default: `true` (a preceding space is required)
- When `false`: Mention can be triggered at the start of text or immediately after another character

```cshtml
<!-- Allow mention anywhere, no leading space required -->
<ejs-mention id="mentionElement" target="#mentionTarget"
    dataSource="@ViewBag.data"
    requireLeadingSpace="false">
    <e-mention-fields text="Name" value="EmailId"></e-mention-fields>
</ejs-mention>
```

> When `requireLeadingSpace="true"` (default), typing `hello@` will NOT trigger the popup — a space before `@` is required, e.g., `hello @`.
> When `requireLeadingSpace="false"`, typing `@` anywhere (even at word start or mid-word) triggers the popup.

---

## CSS Class Customization

Use `cssClass` to apply custom CSS classes to the Mention root element for styling overrides.

```cshtml
<ejs-mention id="mentionElement" target="#mentionTarget"
    dataSource="@ViewBag.data"
    cssClass="custom-mention-style">
    <e-mention-fields text="Name"></e-mention-fields>
</ejs-mention>

<style>
    .custom-mention-style .e-list-item {
        color: #0078d4;
        font-weight: 500;
    }
    .custom-mention-style .e-popup {
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    }
</style>
```

---

## Highlight Searched Characters

Use `highlight="true"` to visually highlight the matched characters within the suggestion list items.

```cshtml
<ejs-mention id="mentionElement" target="#mentionTarget"
    dataSource="@ViewBag.data"
    highlight="true">
    <e-mention-fields text="Name"></e-mention-fields>
</ejs-mention>
```

> When enabled, the typed characters are highlighted with a bold or colored style in matching list items, making it easier to see why each suggestion appeared.
