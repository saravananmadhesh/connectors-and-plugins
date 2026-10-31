# Content — Syncfusion ASP.NET Core Tooltip

## Table of Contents
- [String Content](#string-content)
- [HTML Content](#html-content)
- [Updating Content Programmatically](#updating-content-programmatically)
- [HTML Sanitizer](#html-sanitizer)

---

## String Content

The simplest form — pass any string (including basic HTML tags) to `content`:

```csharp
<ejs-tooltip id="tooltip" target="#target" content="Simple tooltip text">
    <e-content-template>
        <button id="target" class="e-btn">Hover Me</button>
    </e-content-template>
</ejs-tooltip>
```

To include HTML markup (bold, italic, etc.):

```csharp
<ejs-tooltip id="tooltip" target="#target" content="<b>Bold</b> and <i>italic</i> text">
    <e-content-template>
        <button id="target" class="e-btn">Hover Me</button>
    </e-content-template>
</ejs-tooltip>
```

---

## HTML Content

Pass HTML strings directly to `content` to render embedded content:

```csharp
<ejs-tooltip id="tooltip" target="#target" content="<h4>Help</h4><p>This is a tooltip with HTML content.</p>">
    <e-content-template>
        <button id="target" class="e-btn">Help</button>
    </e-content-template>
</ejs-tooltip>
```

> HTML content is sanitized by default (`enableHtmlSanitizer="true"`) to prevent XSS attacks.

---

## Updating Content Programmatically

Change tooltip content after initialization using JavaScript:

```csharp
<ejs-tooltip id="tooltip" target="#target" id="tooltip" content="Initial Content">
    <e-content-template>
        <button id="target" class="e-btn" onclick="updateContent()">Update Tooltip</button>
    </e-content-template>
</ejs-tooltip>

<script>
    function updateContent() {
        var tooltipObj = document.getElementById('tooltip').ej2_instances[0];
        tooltipObj.content = 'Updated Content';
        tooltipObj.dataBind(); // Apply changes immediately
    }
</script>
```

---

## HTML Sanitizer

By default, `enableHtmlSanitizer="true"` sanitizes untrusted HTML and scripts before rendering. To allow raw HTML rendering (only from trusted sources):

```csharp
<ejs-tooltip id="tooltip" target="#target" content="<b>Bold</b> and <i>italic</i>" enableHtmlSanitizer="false">
    <e-content-template>
        <button id="target" class="e-btn">Show Tooltip</button>
    </e-content-template>
</ejs-tooltip>
```

> **⚠️ Security Warning:** Only set `enableHtmlSanitizer="false"` for content you fully control and trust. Never set this for user-supplied or third-party content, as it exposes your application to XSS attacks.
