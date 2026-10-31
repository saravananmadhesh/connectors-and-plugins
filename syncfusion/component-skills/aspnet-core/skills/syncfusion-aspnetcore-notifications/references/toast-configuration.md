# Configuration & Options — Syncfusion ASP.NET Core Toast

## Table of Contents
- [Title and Content](#title-and-content)
- [Custom Target Container](#custom-target-container)
- [Close Button](#close-button)
- [Progress Bar](#progress-bar)
- [Progress Bar Direction](#progress-bar-direction)
- [Newest on Top](#newest-on-top)
- [Width and Height](#width-and-height)
- [HTML Sanitizer](#html-sanitizer)
- [Additional HTML Attributes](#additional-html-attributes)
- [RTL Support](#rtl-support)
- [Locale](#locale)
- [Combined Configuration Example](#combined-configuration-example)

---

## Title and Content

Use `title` and `content` properties to set the notification message. Both accept plain strings or HTML markup.

```cshtml
<ejs-toast id="element"
           title="Matt sent you a friend request"
           content="You have a new friend request yet to accept">
</ejs-toast>
```

> The `title` or `content` can also be given as an HTML element ID string (e.g., `content="#myDiv"`).

---

## Custom Target Container

By default, toasts render in `document.body`. Use the `target` property (or set it via JavaScript) to render inside a specific element.

```cshtml
<div id="toast_target" style="position:relative; height:300px;"></div>

<ejs-toast id="element"
           title="File Downloading"
           content="Download in progress...">
</ejs-toast>

<script>
    setTimeout(function () {
        var toast = document.getElementById('element').ej2_instances[0];
        toast.target = document.getElementById('toast_target');
        toast.show();
    }, 500);
</script>
```

> When `target` is a specific container, the `position` is calculated relative to that container.

---

## Close Button

Set `showCloseButton="true"` to display an X button that lets users manually dismiss the toast before it expires.

```cshtml
<ejs-toast id="element"
           title="File Downloading"
           content="Download in progress..."
           showCloseButton="true">
</ejs-toast>
```

Default value: `false`

---

## Progress Bar

Set `showProgressBar="true"` to visually indicate time remaining before the toast auto-dismisses. The bar fills/empties based on `timeOut`.

```cshtml
<ejs-toast id="element"
           title="Downloading"
           content="File download in progress..."
           showProgressBar="true"
           timeOut="5000">
</ejs-toast>
```

Default value: `false`

---

## Progress Bar Direction

By default, the progress bar runs **right to left** (`Rtl`). Set `progressDirection="Ltr"` to run **left to right**.

```cshtml
<ejs-toast id="element"
           title="File Downloading"
           showCloseButton="true"
           showProgressBar="true"
           progressDirection="Ltr">
    <e-toast-position X="Center"></e-toast-position>
    <e-content-template>
        <div class="progress"><span style="width: 80%"></span></div>
    </e-content-template>
</ejs-toast>
```

Allowed values: `"Rtl"` (default) | `"Ltr"`

---

## Newest on Top

By default, new toasts are appended **after** existing toasts. Set `newestOnTop="true"` to insert new toasts **before** existing ones (at the top of the stack).

```cshtml
<ejs-toast id="element"
           title="File Downloading"
           content="Your download is in progress."
           newestOnTop="true"
           showCloseButton="true"
           showProgressBar="true">
    <e-toast-position X="Center"></e-toast-position>
</ejs-toast>
```

Default value: `true`

---

## Width and Height

Use `width` and `height` to control toast dimensions. Accept pixels (number), string with `px`, or percentage.

```cshtml
<ejs-toast id="element"
           title="Alert"
           content="Custom sized notification."
           width="400"
           height="120">
</ejs-toast>
```

- Default `width`: `"300"` (300px). On mobile, default is `100%`.
- Default `height`: `"auto"`
- Setting `width="100%"` makes the toast span full width (X position has no effect in this mode).

---

## HTML Sanitizer

By default, `enableHtmlSanitizer` is `true`, which strips unsafe HTML from `title` and `content` to prevent XSS. Set to `false` only when content is trusted.

```cshtml
<ejs-toast id="element"
           title="<strong>Bold Title</strong>"
           content="<em>Italic content</em>"
           enableHtmlSanitizer="false">
</ejs-toast>
```

Default value: `true`

---

## Additional HTML Attributes

Use `htmlAttributes` to pass extra HTML attributes to the root toast container element.

```cshtml
<ejs-toast id="element"
           title="Alert"
           content="Something happened."
           htmlAttributes='new { data_testid = "my-toast" }'>
</ejs-toast>
```

---

## RTL Support

Enable right-to-left text direction with `enableRtl="true"`:

```cshtml
<ejs-toast id="element"
           title="تنبيه"
           content="لديك رسالة جديدة."
           enableRtl="true">
    <e-toast-position X="Left" Y="Top"></e-toast-position>
</ejs-toast>
```

Default value: `false`

---

## Locale

Override the component locale with `locale`. Default global locale is `"en-US"`.

```cshtml
<ejs-toast id="element"
           title="Info"
           content="This is a notification."
           locale="fr-FR">
</ejs-toast>
```

---

## Combined Configuration Example

```cshtml
<div id="toast_target" style="position:relative; min-height:100px;"></div>

<ejs-toast id="element"
           title="File Downloading"
           showCloseButton="true"
           showProgressBar="true"
           progressDirection="Ltr"
           newestOnTop="true"
           width="350"
           timeOut="6000">
    <e-toast-position X="Center"></e-toast-position>
    <e-content-template>
        <div class="progress"><span style="width: 80%"></span></div>
    </e-content-template>
</ejs-toast>

<ejs-button id="showBtn" content="Show Toast" cssClass="e-btn"></ejs-button>

<script>
    setTimeout(function () {
        var toast = document.getElementById('element').ej2_instances[0];
        toast.target = document.body;
        toast.show();
    }, 500);
    document.getElementById('showBtn').addEventListener('click', function () {
        document.getElementById('element').ej2_instances[0].show();
    });
</script>
```

---

## Property Quick Reference

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `title` | string | null | Toast heading text |
| `content` | string | null | Toast body text or HTML |
| `target` | string | — | CSS selector or DOM element for toast container |
| `showCloseButton` | bool | false | Display X close button |
| `showProgressBar` | bool | false | Show timeout progress bar |
| `progressDirection` | ProgressDirectionType | Rtl | Progress bar direction: `Ltr` or `Rtl` |
| `newestOnTop` | bool | true | Insert new toasts before existing ones |
| `width` | string | "300" | Toast width in px/% |
| `height` | string | "auto" | Toast height in px/% |
| `enableHtmlSanitizer` | bool | true | Strip unsafe HTML from content |
| `enableRtl` | bool | false | Right-to-left layout |
| `enablePersistence` | bool | false | Persist state across page reloads |
| `locale` | string | "" | Override component locale |
| `htmlAttributes` | object | — | Additional HTML attributes |
