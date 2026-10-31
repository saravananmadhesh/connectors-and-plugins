# Tooltip Content

## Table of Contents
- [Overview](#overview)
- [Static Text Content](#static-text-content)
- [HTML String Content](#html-string-content)
- [Template Content (ng-template)](#template-content-ng-template)
- [Dynamic Content via AJAX / Fetch](#dynamic-content-via-ajax--fetch)
- [Loading iframes and Media](#loading-iframes-and-media)
- [HTML Sanitization](#html-sanitization)

---

## Overview

The `content` property of `ejs-tooltip` accepts a string or HTML element. If omitted, the tooltip falls back to the target element's `title` attribute. Content can be static, rich HTML, Angular template references, or fetched asynchronously.

---

## Static Text Content

The simplest form — plain text string:

```html
<ejs-tooltip content="This is a simple tooltip text.">
  <button>Hover me</button>
</ejs-tooltip>
```

Using a component property:

```typescript
public tipContent: string = 'Maximum file size: 5 MB';
```
```html
<ejs-tooltip [content]="tipContent">
  <span class="info-icon">ℹ</span>
</ejs-tooltip>
```

---

## HTML String Content

The `content` property can contain HTML markup. By default `enableHtmlParse` is `true`, so HTML strings are parsed and rendered as DOM elements:

```typescript
public richContent: string = `
  <b>Important:</b> This action <u>cannot be undone</u>.<br/>
  Visit <a href="https://example.com">example.com</a> for help.
`;
```
```html
<ejs-tooltip [content]="richContent">
  <button>Delete</button>
</ejs-tooltip>
```

**Supported HTML tags:** `<div>`, `<span>`, `<b>`, `<i>`, `<u>`, `<a>`, `<img>`, `<br>`, and most standard HTML elements with inline `style` attributes.

### Rendering as raw HTML string (no parsing)

Set `enableHtmlParse` to `false` to display the HTML as escaped text instead of rendered DOM:

```html
<ejs-tooltip content="<b>Bold</b>" [enableHtmlParse]="false">
  <button>Show raw string</button>
</ejs-tooltip>
<!-- Displays literally: <b>Bold</b> -->
```

---

## Template Content (ng-template)

Use Angular's `ng-template` for rich, component-driven tooltip layouts. Reference the template using `#template` and pass it to `content`:

```typescript
import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { TooltipModule } from '@syncfusion/ej2-angular-popups';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  imports: [TooltipModule, CommonModule],
  selector: 'app-root',
  encapsulation: ViewEncapsulation.None,
  template: `
    <ng-template #tipTemplate>
      <div class="tip-header">
        <img src="avatar.png" alt="user" width="40"/>
        <strong>Jane Doe</strong>
      </div>
      <p>Software Engineer · 5 years</p>
    </ng-template>

    <ejs-tooltip [content]="tipTemplate" position="BottomCenter">
      <span>Jane Doe</span>
    </ejs-tooltip>
  `
})
export class App {}
```

> When using a template, pass the `TemplateRef` directly to `[content]`. Do not stringify it.

---

## Dynamic Content via AJAX / Fetch

Load content asynchronously inside the `beforeRender` event, then call `refresh()` to update:

> **Security — same-origin requests only.** Always fetch from your own application's API endpoints (relative URLs such as `/api/…`). Never pass an arbitrary or user-supplied URL to `fetch()`. Always escape or sanitize every field taken from the server response before inserting it into an HTML string to prevent XSS. The tooltip's built-in `enableHtmlSanitizer` (default `true`) provides a second line of defence but is **not** a substitute for sanitizing input before assignment.

```typescript
import { Component, ViewChild, ViewEncapsulation } from '@angular/core';
import { TooltipModule, TooltipComponent } from '@syncfusion/ej2-angular-popups';

@Component({
  standalone: true,
  imports: [TooltipModule],
  selector: 'app-root',
  encapsulation: ViewEncapsulation.None,
  template: `
    <ejs-tooltip #tooltip target=".item" (beforeRender)="onBeforeRender($event)">
      <ul>
        <li class="item" data-id="1">Product A</li>
        <li class="item" data-id="2">Product B</li>
      </ul>
    </ejs-tooltip>
  `
})
export class App {
  @ViewChild('tooltip') tooltip!: TooltipComponent;

  /** Escape a string so it is safe to embed inside an HTML attribute or text node. */
  private escapeHtml(value: string): string {
    return value
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
  }

  onBeforeRender(args: any): void {
    const id = (args.target as HTMLElement).getAttribute('data-id');
    // Cancel render until async data is ready
    args.cancel = true;
    // ✅ Same-origin relative URL — never use an external or user-supplied URL
    fetch(`/api/products/${id}`)
      .then(res => res.json())
      .then(data => {
        // ✅ Escape all server-supplied fields before embedding in HTML
        const safeName  = this.escapeHtml(String(data.name));
        const safePrice = this.escapeHtml(String(data.price));
        this.tooltip.content = `<b>${safeName}</b><br/>Price: $${safePrice}`;
        args.cancel = false;
        this.tooltip.refresh(args.target);
      });
  }
}
```

> **GUID target note:** When using a GUID as a target value, the GUID must start with a **letter** before the numeric portion. Example: `target="#tooltip96ad88bd-294c-47c3-999b-a9daa3285a05"`.

---

## Loading iframes and Media

The `content` property supports inline HTML including `<iframe>`, `<video>`, and `<map>` tags:

> **Security — same-origin sources only.** The `src` of any embedded `<iframe>` or `<video>` **must** point to a same-origin URL (a relative path or an absolute URL on your own domain). Never embed content from an external or user-supplied URL; doing so exposes your users to third-party scripts and clickjacking vectors. Always set `sandbox` on iframes to apply least-privilege restrictions.

```typescript
// ✅ Use a same-origin relative URL — never an external third-party URL
public iframeContent: string =
  '<iframe src="/help/preview" sandbox="allow-scripts allow-same-origin" width="300" height="200"></iframe>';
```
```html
<ejs-tooltip [content]="iframeContent" [width]="350" [height]="250">
  <button>Show embedded page</button>
</ejs-tooltip>
```

> Set explicit `width` and `height` on the tooltip when embedding media so the content doesn't overflow.

---

## HTML Sanitization

| Property | Type | Default | Purpose |
|---|---|---|---|
| `enableHtmlParse` | `boolean` | `true` | Parse HTML string content into DOM elements |
| `enableHtmlSanitizer` | `boolean` | `true` | Strip untrusted scripts/strings before rendering |

By default the tooltip sanitizes content to prevent XSS.

> ⚠️ **Security warning — never disable the sanitizer for external or user-supplied content.**  
> Setting `enableHtmlSanitizer` to `false` removes the built-in XSS protection. This is only acceptable when **all** of the following conditions are true:  
> - The HTML string is **authored entirely by your own team** (hard-coded or generated server-side by trusted code).  
> - The content **never** originates from user input, URL parameters, API responses from third-party services, or any other untrusted source.  
> - Your organisation's security review has explicitly approved the usage.  
>
> If there is any doubt, keep `enableHtmlSanitizer` at its default value of `true` and sanitize the string with a vetted library (e.g., DOMPurify) before assigning it to `content`.

```html
<!-- ✅ Only acceptable when trustedHtml is 100% internally controlled -->
<ejs-tooltip [content]="trustedHtml" [enableHtmlSanitizer]="false">
  <button>Show trusted content</button>
</ejs-tooltip>
```

---

## See Also

- [Position & Dimensions](./position-and-dimension.md)
- [Customization & Style](./customization-and-style.md)
- [API Reference](./api.md) — `content`, `enableHtmlParse`, `enableHtmlSanitizer`, `beforeRender`
