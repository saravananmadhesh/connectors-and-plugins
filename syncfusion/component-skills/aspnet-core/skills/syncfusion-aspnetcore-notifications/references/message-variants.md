# Message Display Variants

Variants define the visual presentation style of the Message component. Three predefined variants are available, each offering a different design aesthetic. Configure the variant using the `variant` attribute.

## Available Variants

| Variant | Value | Description |
|---------|-------|-------------|
| Text | `"Text"` (default) | Subtle styling — light background with colored text. Non-intrusive. |
| Outlined | `"Outlined"` | Colored border with matching text on a transparent background. Balanced emphasis. |
| Filled | `"Filled"` | Bold styling — dark background with contrasting text. High-priority or critical content. |

## Basic Usage

Set the `variant` attribute to control the visual style:

```cshtml
@* ~/Pages/Index.cshtml *@
@* Text (default) — subtle *@
<ejs-message id="msg_text" content="Editing is restricted"></ejs-message>

@* Outlined — clear without a filled background *@
<ejs-message id="msg_outlined" content="Editing is restricted" variant="Outlined"></ejs-message>

@* Filled — bold, commands attention *@
<ejs-message id="msg_filled" content="Editing is restricted" variant="Filled"></ejs-message>
```

## Combining Variant with Severity

Every variant works with every severity level. The severity drives the color palette; the variant drives the fill/border style:

```cshtml
@* ~/Pages/Index.cshtml *@
@* Filled variants *@
<ejs-message id="v1" content="Editing is restricted" variant="Filled"></ejs-message>
<ejs-message id="v2" content="Please read the comments carefully" severity="Info" variant="Filled"></ejs-message>
<ejs-message id="v3" content="Your message has been sent successfully" severity="Success" variant="Filled"></ejs-message>
<ejs-message id="v4" content="There was a problem with your network connection" severity="Warning" variant="Filled"></ejs-message>
<ejs-message id="v5" content="A problem occurred while submitting your data" severity="Error" variant="Filled"></ejs-message>

@* Outlined variants *@
<ejs-message id="o1" content="Editing is restricted" variant="Outlined"></ejs-message>
<ejs-message id="o2" content="Please read the comments carefully" severity="Info" variant="Outlined"></ejs-message>
<ejs-message id="o3" content="Your message has been sent successfully" severity="Success" variant="Outlined"></ejs-message>
<ejs-message id="o4" content="There was a problem with your network connection" severity="Warning" variant="Outlined"></ejs-message>
<ejs-message id="o5" content="A problem occurred while submitting your data" severity="Error" variant="Outlined"></ejs-message>
```

## When to Use Each Variant

- **Text** — Inline notices, help text, or contextual notes where you don't want the message to dominate the layout.
- **Outlined** — Form validation messages, status cards, or secondary alerts where you want clear visual separation without a heavy background.
- **Filled** — Critical system alerts, banners, or high-priority notifications where the message must stand out immediately.

## Gotcha

The `variant` attribute is independent of `severity`. Omitting `variant` defaults to `"Text"` regardless of severity, so a `severity="Error"` message will still use the subtle text style unless `variant="Filled"` is explicitly set.
