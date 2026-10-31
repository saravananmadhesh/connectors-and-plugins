# Security Best Practices - Splitter Component

Comprehensive security guidelines for safe content handling and XSS prevention in Syncfusion Angular Splitter.

## Table of Contents

- [Overview](#overview)
- [HTML Sanitization](#html-sanitization)
- [Content Security Policy](#content-security-policy)
- [Best Practices](#best-practices)
- [Common Vulnerabilities](#common-vulnerabilities)
- [Code Examples](#code-examples)

---

## Overview

The Splitter component can load HTML content into panes from various sources (strings, templates, external HTML). Like any web component that accepts HTML content, it requires careful handling to prevent Cross-Site Scripting (XSS) attacks.

**Key Security Concerns:**
- Untrusted user input rendered as HTML
- Dynamic content from external APIs
- Malicious scripts injected via user-supplied data
- DOM-based vulnerabilities in pane content

---

## HTML Sanitization

### `enableHtmlSanitizer` Property

Controls automatic HTML sanitization to block potentially dangerous content.

```typescript
// RECOMMENDED: Enable sanitization (default = true)
<ejs-splitter [enableHtmlSanitizer]="true" height="400px" width="100%">
  <e-panes>
    <e-pane [content]="userSuppliedContent"></e-pane>
  </e-panes>
</ejs-splitter>

// NOT RECOMMENDED: Disable sanitization (only for trusted content)
<ejs-splitter [enableHtmlSanitizer]="false" height="400px" width="100%">
  <e-panes>
    <e-pane [content]="fullyTrustedContent"></e-pane>
  </e-panes>
</ejs-splitter>
```

### Sanitization Behavior

When `enableHtmlSanitizer="true"`, the component blocks:

**Dangerous Tags:**
- `<script>`, `<iframe>`, `<object>`, `<embed>`
- Event handler tags and form-related elements

**Dangerous Attributes:**
- Event handlers: `onclick`, `onload`, `onerror`, `onmouseover`
- JavaScript protocols: `javascript:`
- Data URIs in sensitive contexts

**Example - Blocked Content:**

```html
<!-- BLOCKED: Script injection -->
<div onclick="alert('XSS')">Click Me</div>

<!-- BLOCKED: Inline script -->
<script>
  alert('XSS Attack');
</script>

<!-- BLOCKED: Event handler with javascript protocol -->
<img src="x" onerror="maliciousCode()">

<!-- BLOCKED: iFrame injection -->
<iframe src="url"></iframe>
```

### `beforeSanitizeHtml` Event

Fired before sanitization occurs, allowing custom sanitization logic.

```typescript
import { Component } from '@angular/core';
import { BeforeSanitizeHtmlArgs } from '@syncfusion/ej2-angular-layouts';

@Component({
  selector: 'app-custom-sanitize',
  template: `
    <ejs-splitter
      (beforeSanitizeHtml)="onBeforeSanitizeHtml($event)"
      height="400px"
      width="100%"
    >
      <e-panes>
        <e-pane [content]="userContent"></e-pane>
      </e-panes>
    </ejs-splitter>
  `
})
export class CustomSanitizeComponent {
  userContent = '<div onclick="alert(\'xss\')">Content</div>';

  onBeforeSanitizeHtml(args: BeforeSanitizeHtmlArgs) {
    console.log('Sanitization about to occur');
    console.log('Selectors being blocked:', args.selectors);

    // Monitor which selectors are blocked
    if (args.selectors) {
      console.log('Tags being removed:', args.selectors.tags);
      console.log('Attributes being removed:', args.selectors.attributes);
    }

    // Custom helper function for additional sanitization
    if (args.helper) {
      const sanitized = args.helper();
      console.log('Sanitized output:', sanitized);
    }
  }
}
```

---

## Content Security Policy

### Angular's DomSanitizer Integration

Angular's built-in `DomSanitizer` provides additional protection.

```typescript
import { Component } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-safe-content',
  template: `
    <ejs-splitter height="400px" width="100%">
      <e-panes>
        <!-- Safe content binding -->
        <e-pane [content]="sanitizedContent"></e-pane>
      </e-panes>
    </ejs-splitter>
  `
})
export class SafeContentComponent {
  sanitizedContent: SafeHtml;

  constructor(private sanitizer: DomSanitizer) {
    // For user-supplied HTML, bypass sanitizer ONLY if you've validated it
    const userHTML = '<div><strong>User Content</strong></div>';
    
    // This ensures Angular's sanitizer processes it
    this.sanitizedContent = this.sanitizer.sanitize(1, userHTML) || userHTML;
  }
}
```

### Recommended Content Sources (Security Ranking)

| Rank | Source | Risk | Recommendation |
|------|--------|------|-----------------|
| 🟢 Safe | Static strings in code | Low | Use directly |
| 🟢 Safe | ng-template with bindings | Low | Recommended approach |
| 🟡 Medium | Trusted API responses | Medium | Validate & sanitize |
| 🟡 Medium | Database content (internal) | Medium | Sanitize with enableHtmlSanitizer |
| 🔴 High | User input (forms, URLs) | High | Always sanitize, never trust |
| 🔴 High | External API (untrusted) | High | Whitelist & validate |

---

## Best Practices

### ✓ DO: Use ng-template for Safe Content

```typescript
import { Component } from '@angular/core';
import { SplitterModule } from '@syncfusion/ej2-angular-layouts';

@Component({
  selector: 'app-safe-template',
  standalone: true,
  imports: [SplitterModule],
  template: `
    <ejs-splitter height="400px" width="100%">
      <e-panes>
        <e-pane>
          <ng-template #content>
            <div class="pane-header">
              <h3>{{ title }}</h3>
              <p>{{ description }}</p>
            </div>
          </ng-template>
        </e-pane>
      </e-panes>
    </ejs-splitter>
  `
})
export class SafeTemplateComponent {
  title = 'Safe Content';
  description = 'This content is bound through Angular templates';
}
```

**Why:** Angular's template system automatically escapes interpolations `{{ }}`, preventing XSS in most cases.

### ✓ DO: Enable HTML Sanitizer

```typescript
// ALWAYS enable by default
<ejs-splitter [enableHtmlSanitizer]="true" height="400px" width="100%">
  <e-panes>
    <e-pane [content]="anyContent"></e-pane>
  </e-panes>
</ejs-splitter>
```

### ✓ DO: Validate External Content

```typescript
import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-validated-content',
  template: `
    <ejs-splitter height="400px" width="100%">
      <e-panes>
        <e-pane [content]="validatedContent"></e-pane>
      </e-panes>
    </ejs-splitter>
  `
})
export class ValidatedContentComponent {
  validatedContent = '';

  constructor(private sanitizer: DomSanitizer) {
    this.loadExternalContent();
  }

  async loadExternalContent() {
    try {
      const response = await fetch('/api/content');
      const data = await response.json();

      // Validate structure and content
      if (this.isValidContent(data)) {
        // Sanitizer will clean it further
        this.validatedContent = data.html;
      }
    } catch (error) {
      console.error('Failed to load content:', error);
      this.validatedContent = '<p>Error loading content</p>';
    }
  }

  private isValidContent(data: any): boolean {
    // Basic validation
    return data &&
      typeof data.html === 'string' &&
      data.html.length < 50000 &&  // Size limit
      !data.html.includes('<script') &&  // Basic check
      !data.html.includes('javascript:');
  }
}
```

### ✓ DO: Use Content Security Policy Headers

Configure CSP headers on your server:

```
Content-Security-Policy: default-src 'self'; 
                         script-src 'self' 'unsafe-inline'; 
                         style-src 'self' 'unsafe-inline'; 
                         img-src 'self' data:; 
                         object-src 'none'; 
                         frame-ancestors 'none'
```

### ✓ DO: Escape User Input

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-escape-input',
  template: `
    <input [(ngModel)]="userInput" placeholder="Enter text" />
    
    <ejs-splitter height="400px" width="100%">
      <e-panes>
        <e-pane [content]="escapeHtml(userInput)"></e-pane>
      </e-panes>
    </ejs-splitter>
  `
})
export class EscapeInputComponent {
  userInput = '';

  escapeHtml(text: string): string {
    const map: { [key: string]: string } = {
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#039;'
    };
    return text.replace(/[&<>"']/g, (char) => map[char]);
  }
}
```

### ✓ DO: Implement Content Whitelist

```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-whitelist-content',
  template: `
    <ejs-splitter height="400px" width="100%">
      <e-panes>
        <e-pane [content]="getWhitelistedContent()"></e-pane>
      </e-panes>
    </ejs-splitter>
  `
})
export class WhitelistContentComponent {
  private allowedTags = ['p', 'div', 'span', 'h1', 'h2', 'h3', 'strong', 'em', 'ul', 'li'];
  private allowedAttributes = ['class', 'id'];

  getWhitelistedContent(): string {
    const rawContent = '<div class="content"><p>Safe</p><script>alert("XSS")</script></div>';
    return this.sanitizeToWhitelist(rawContent);
  }

  private sanitizeToWhitelist(html: string): string {
    const parser = new DOMParser();
    const doc = parser.parseFromString(html, 'text/html');
    return this.walkAndClean(doc.body).innerHTML;
  }

  private walkAndClean(node: Node): Node {
    const nodesToRemove: Node[] = [];

    for (let i = 0; i < node.childNodes.length; i++) {
      const child = node.childNodes[i];

      if (child.nodeType === Node.ELEMENT_NODE) {
        const element = child as Element;
        const tagName = element.tagName.toLowerCase();

        // Remove disallowed tags
        if (!this.allowedTags.includes(tagName)) {
          nodesToRemove.push(child);
          continue;
        }

        // Remove disallowed attributes
        const attrs = element.attributes;
        for (let j = attrs.length - 1; j >= 0; j--) {
          if (!this.allowedAttributes.includes(attrs[j].name)) {
            element.removeAttribute(attrs[j].name);
          }
        }

        // Recursively clean children
        this.walkAndClean(child);
      }
    }

    nodesToRemove.forEach(n => n.remove());
    return node;
  }
}
```

---

## Common Vulnerabilities

### ❌ DON'T: Directly Bind User Input

```typescript
// VULNERABLE: Direct XSS vector
userInput = '<img src=x onerror="alert(\'XSS\')">';

<ejs-splitter [enableHtmlSanitizer]="false">
  <e-pane [content]="userInput"></e-pane>
</ejs-splitter>
```

**Fix:** Always sanitize user input or use ng-template.

### ❌ DON'T: Disable Sanitizer Without Validation

```typescript
// DANGEROUS: Disabled sanitizer without validation
<ejs-splitter [enableHtmlSanitizer]="false">
  <e-pane [content]="unvalidatedContent"></e-pane>
</ejs-splitter>
```

**Fix:** Enable sanitizer by default and validate any disabled cases.

### ❌ DON'T: Use Dynamic JavaScript Execution

```typescript
// VULNERABLE: Dynamic eval of user content
const userCode = componentData.code;
eval(userCode);  // NEVER DO THIS
```

**Fix:** Never execute user-supplied code. Use safe data binding instead.

### ❌ DON'T: Trust External APIs Without Validation

```typescript
// RISKY: Directly loading from untrusted API
async loadContent() {
  const response = await fetch('url');
  const data = await response.json();
  this.content = data.html;  // Could contain malicious code
}
```

**Fix:** Validate and sanitize all external content.

### ❌ DON'T: Allow Inline Scripts in Content Policy

```typescript
// NOT RECOMMENDED in production
Content-Security-Policy: script-src 'unsafe-inline'
```

**Fix:** Use proper CSP with nonces or strict script-src.

---

## Code Examples

### Example 1: User Comment Display (Safe Pattern)

```typescript
import { Component } from '@angular/core';
import { SplitterModule } from '@syncfusion/ej2-angular-layouts';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-safe-comments',
  standalone: true,
  imports: [SplitterModule, CommonModule, FormsModule],
  template: `
    <div class="form-section">
      <textarea [(ngModel)]="newComment" placeholder="Enter comment"></textarea>
      <button (click)="addComment()">Post Comment</button>
    </div>

    <ejs-splitter 
      [enableHtmlSanitizer]="true" 
      height="400px" 
      width="100%"
    >
      <e-panes>
        <e-pane>
          <ng-template #content>
            <div class="comments-list">
              <div *ngFor="let comment of comments" class="comment-item">
                <strong>{{ comment.author }}</strong>
                <p>{{ comment.text }}</p>
                <small>{{ comment.date }}</small>
              </div>
            </div>
          </ng-template>
        </e-pane>
      </e-panes>
    </ejs-splitter>
  `,
  styles: [`
    .form-section { padding: 15px; background: #f5f5f5; }
    textarea { width: 100%; padding: 10px; }
    .comments-list { padding: 15px; }
    .comment-item { padding: 10px; border-bottom: 1px solid #eee; }
    button { padding: 8px 15px; background: #007bff; color: white; border: none; }
  `]
})
export class SafeCommentsComponent {
  newComment = '';
  comments: any[] = [
    { author: 'User1', text: 'Great component!', date: '2024-03-27' },
    { author: 'User2', text: 'Very helpful.', date: '2024-03-27' }
  ];

  addComment() {
    if (this.newComment.trim()) {
      this.comments.push({
        author: 'You',
        text: this.newComment,  // Displayed via {{ }} - auto-escaped
        date: new Date().toLocaleDateString()
      });
      this.newComment = '';
    }
  }
}
```

### Example 2: API-Sourced Content (With Validation)

```typescript
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SplitterModule } from '@syncfusion/ej2-angular-layouts';

@Component({
  selector: 'app-api-content',
  standalone: true,
  imports: [SplitterModule],
  template: `
    <ejs-splitter 
      [enableHtmlSanitizer]="true"
      [content]="apiContent"
      height="400px"
      width="100%"
    >
      <e-panes>
        <e-pane [content]="apiContent"></e-pane>
      </e-panes>
    </ejs-splitter>
  `
})
export class ApiContentComponent implements OnInit {
  apiContent = '<p>Loading...</p>';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.loadContent();
  }

  async loadContent() {
    try {
      const response: any = await this.http
        .get('/api/article/123')
        .toPromise();

      // Validate response structure
      if (response?.content && typeof response.content === 'string') {
        // Length check to prevent DoS
        if (response.content.length < 100000) {
          this.apiContent = response.content;
          // Splitter sanitizer will handle any dangerous content
        }
      }
    } catch (error) {
      this.apiContent = '<p style="color: red;">Error loading content</p>';
    }
  }
}
```

### Example 3: Complete Validation & Sanitization

```typescript
import { Component } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { SplitterModule } from '@syncfusion/ej2-angular-layouts';

interface ContentSource {
  source: string;
  content: string;
  trusted: boolean;
}

@Component({
  selector: 'app-complete-security',
  standalone: true,
  imports: [SplitterModule],
  template: `
    <ejs-splitter height="400px" width="100%">
      <e-panes>
        <e-pane [content]="processedContent"></e-pane>
      </e-panes>
    </ejs-splitter>
  `
})
export class CompleteSecurityComponent {
  processedContent = '';

  constructor(private sanitizer: DomSanitizer) {
    this.handleContent({
      source: 'api',
      content: '<div onclick="alert(\'XSS\')">Click me</div>',
      trusted: false
    });
  }

  private handleContent(source: ContentSource) {
    // Step 1: Validate source
    if (!source.content || typeof source.content !== 'string') {
      this.processedContent = '<p>Invalid content</p>';
      return;
    }

    // Step 2: Size validation (prevent DoS)
    const MAX_SIZE = 500000;
    if (source.content.length > MAX_SIZE) {
      console.warn('Content exceeds size limit');
      this.processedContent = '<p>Content too large</p>';
      return;
    }

    // Step 3: Check trust level
    if (!source.trusted) {
      // Untrusted content: use sanitizer
      this.processedContent = this.sanitizer.sanitize(1, source.content) || '';
    } else {
      // Trusted content: bypass sanitizer (use with caution)
      this.processedContent = this.sanitizer.bypassSecurityTrustHtml(source.content) as any;
    }

    // Step 4: Verify result
    console.log('Content processed safely');
  }
}
```

---

## Summary

| Action | Security Impact | Use When |
|--------|-----------------|----------|
| Use ng-template | 🟢 Highest | Static or controlled content |
| Enable sanitizer | 🟢 High | Any HTML content binding |
| Validate input | 🟡 Medium | External API or user input |
| Escape HTML | 🟡 Medium | Plain text display |
| Disable sanitizer | 🔴 Low | Only fully trusted content |
| Use eval() | 🔴 Critical | NEVER |

**Remember:** Security is layered. Use multiple approaches together for maximum protection.

For more information on event handling in the Splitter, see [Dynamic Manipulation - beforeSanitizeHtml Event](dynamic-manipulation.md#beforesanitizehtml).
