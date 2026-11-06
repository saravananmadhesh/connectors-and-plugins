# Security and Paste Handling

## Table of Contents
- [HTML Sanitization](#html-sanitization)
- [XSS Prevention](#xss-prevention)
- [Paste Cleanup Settings](#paste-cleanup-settings)
- [Read-Only Mode](#read-only-mode)
- [Security Best Practices](#security-best-practices)
- [Implementation Examples](#implementation-examples)

## HTML Sanitization

### Enable HTML Sanitizer

Prevent XSS attacks by enabling HTML sanitization:

```typescript
@Component({
  selector: 'app-root',
  template: `<ejs-blockeditor [enableHtmlSanitizer]="true" />`,
  standalone: true,
  imports: [BlockEditorModule]
})
export class AppComponent {
  public enableHtmlSanitizer = true;
}
```

### Sanitizer Configuration

Configure what content is allowed/denied:

```typescript
public sanitizerSettings = {
  // Enable sanitization
  enableHtmlSanitizer: true,
  
  // Allowed tags
  allowedTags: [
    'p', 'br', 'strong', 'em', 'u', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
    'blockquote', 'ul', 'ol', 'li', 'a', 'img', 'code', 'pre', 'table',
    'thead', 'tbody', 'tr', 'td', 'th'
  ],
  
  // Allowed attributes
  allowedAttributes: {
    'a': ['href', 'title', 'target'],
    'img': ['src', 'alt', 'width', 'height'],
    'table': ['border', 'cellpadding', 'cellspacing'],
    '*': ['class', 'id']
  },
  
  // Denied attributes
  deniedAttributes: [
    'onclick', 'onerror', 'onload', 'onchange',
    'onmouseover', 'onmouseout', 'onkeydown', 'onkeyup'
  ]
};

@Component({
  selector: 'app-root',
  template: `<ejs-blockeditor [sanitizerSettings]="sanitizerSettings" />`,
  standalone: true,
  imports: [BlockEditorModule]
})
export class AppComponent {
  public sanitizerSettings = this.sanitizerSettings;
}
```

## XSS Prevention

### Dangerous Content Detection

```typescript
public isDangerousContent(content: string): boolean {
  const dangerousPatterns = [
    /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi,
    /javascript:/gi,
    /on\w+\s*=/gi,  // Event handlers
    /<iframe\b/gi,
    /<object\b/gi,
    /<embed\b/gi
  ];
  
  return dangerousPatterns.some(pattern => pattern.test(content));
}

public sanitizeContent(content: string): string {
  if (this.isDangerousContent(content)) {
    console.warn('Dangerous content detected and removed');
    return this.removeDangerousPatterns(content);
  }
  return content;
}

private removeDangerousPatterns(content: string): string {
  return content
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/javascript:/gi, '')
    .replace(/on\w+\s*=/gi, '')
    .replace(/<iframe\b[^>]*>/gi, '')
    .replace(/<object\b[^>]*>/gi, '')
    .replace(/<embed\b[^>]*>/gi, '');
}
```

### URL Validation

```typescript
public isValidUrl(url: string): boolean {
  try {
    const urlObj = new URL(url);
    
    // Allow only http/https protocols
    if (!['http:', 'https:'].includes(urlObj.protocol)) {
      return false;
    }
    
    // Deny certain domains if needed
    const deniedDomains = ['malicious-domain.com', 'spam-site.com'];
    if (deniedDomains.includes(urlObj.hostname)) {
      return false;
    }
    
    return true;
  } catch {
    return false;
  }
}

public sanitizeUrl(url: string): string {
  if (!this.isValidUrl(url)) {
    console.warn('Invalid URL sanitized:', url);
    return 'javascript:void(0)';
  }
  return url;
}
```

## Paste Cleanup Settings

### Overview

The `pasteCleanupSettings` property configures how content is handled when pasted into the editor. It uses the `PasteCleanupSettingsModel` interface with four properties defined in the API.

**API Type:** `PasteCleanupSettingsModel`

**Properties:**
- `deniedTags: string[]` - HTML tags to remove from pasted content
- `keepFormat: boolean` - Whether to preserve formatting (bold, italic, etc.)
- `plainText: boolean` - Whether to paste as plain text (removes all formatting)

### Basic Configuration

```typescript
import { Component } from '@angular/core';
import { BlockEditorModule, PasteCleanupSettingsModel } from '@syncfusion/ej2-angular-blockeditor';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [BlockEditorModule],
  template: `
    <ejs-blockeditor 
      [pasteCleanupSettings]="pasteCleanupSettings">
    </ejs-blockeditor>
  `
})
export class AppComponent {
  public pasteCleanupSettings: PasteCleanupSettingsModel = {
    deniedTags: ['script', 'iframe', 'object'],
    keepFormat: true,
    plainText: false
  };
}
```

### Allowed Styles Configuration

Define which CSS properties can be preserved when pasting:

```typescript
public pasteCleanupSettings: PasteCleanupSettingsModel = {
  // Allowed CSS style properties
  deniedTags: [],
  keepFormat: true,
  plainText: false
};
```

### Denied Tags Configuration

Specify HTML tags that should be removed during paste:

```typescript
public pasteCleanupSettings: PasteCleanupSettingsModel = {
  
  // Tags to remove from pasted content
  deniedTags: [
    'script',      // Prevents script execution
    'iframe',      // Prevents embedding external content
    'object',      // Prevents plugin content
    'embed',       // Prevents embedded content
    'applet',      // Prevents Java applets
    'meta',        // Removes metadata
    'link',        // Removes stylesheet links
    'style',       // Removes inline styles
    'form',        // Removes form elements
    'input',       // Removes input fields
    'button',      // Removes buttons
    'select',      // Removes dropdowns
    'textarea',    // Removes text areas
    'svg',         // Removes SVG graphics
    'canvas'       // Removes canvas elements
  ],
  keepFormat: true,
  plainText: false
};
```

### Keep Format Option

Control whether formatting is preserved:

```typescript
// Preserve formatting (bold, italic, etc.)
public withFormatting: PasteCleanupSettingsModel = {
  deniedTags: ['script', 'iframe'],
  keepFormat: true,    // Keep bold, italic, etc.
  plainText: false
};

// Remove all formatting
public withoutFormatting: PasteCleanupSettingsModel = {
  deniedTags: ['script', 'iframe'],
  keepFormat: false,   // Strip formatting
  plainText: false
};
```

### Plain Text Mode

Paste content as plain text, removing all HTML and formatting:

```typescript
public plainTextOnly: PasteCleanupSettingsModel = {
  deniedTags: [],
  keepFormat: false,
  plainText: true     // Paste as plain text only
};

@Component({
  selector: 'app-root',
  template: `
    <ejs-blockeditor 
      [pasteCleanupSettings]="plainTextOnly">
    </ejs-blockeditor>
  `
})
export class PlainTextEditorComponent {
  public plainTextOnly = this.plainTextOnly;
}
```

## Read-Only Mode

### Enable Read-Only Mode

```typescript
@Component({
  selector: 'app-root',
  template: `
    <button (click)="toggleReadOnly()">Toggle Read-Only</button>
    <ejs-blockeditor [readOnly]="isReadOnly" />
  `,
  standalone: true,
  imports: [BlockEditorModule]
})
export class AppComponent {
  public isReadOnly = false;

  public toggleReadOnly(): void {
    this.isReadOnly = !this.isReadOnly;
  }
}
```

### Read-Only Styling

Style the editor in read-only mode:

```css
/* Read-only styles */
.ej-blockeditor.readonly {
  background-color: #f5f5f5;
  border-color: #ddd;
  opacity: 0.9;
}

.ej-blockeditor.readonly .toolbar {
  display: none;
}

.ej-blockeditor.readonly .content {
  cursor: default;
  user-select: text;
}

.ej-blockeditor.readonly .content-block {
  min-height: auto;
  padding: 8px;
}
```

### Conditional Read-Only by Role

```typescript
@Injectable({ providedIn: 'root' })
export class PermissionService {
  constructor(private authService: AuthService) {}

  public canEdit(): boolean {
    const user = this.authService.getCurrentUser();
    return user.role === 'editor' || user.role === 'admin';
  }

  public canDelete(): boolean {
    const user = this.authService.getCurrentUser();
    return user.role === 'admin';
  }
}

@Component({
  selector: 'app-secured-editor',
  template: `
    <ejs-blockeditor 
      [readOnly]="!canEdit"
      (blockChanged)="onBlockChanged($event)"
    />
  `,
  standalone: true,
  imports: [BlockEditorModule]
})
export class SecuredEditorComponent {
  public canEdit = false;

  constructor(private permissionService: PermissionService) {
    this.canEdit = this.permissionService.canEdit();
  }

  public onBlockChanged(args: BlockChangedEventArgs): void {
    if (!this.canEdit) {
      // Prevent any changes in read-only mode
      args.cancel = true;
    }
  }
}
```

## Security Best Practices

### 1. Always Sanitize User Input

```typescript
@Injectable()
export class ContentSecurityService {
  constructor(private sanitizer: DomSanitizer) {}

  public sanitizeHtml(html: string): SafeHtml {
    return this.sanitizer.sanitize(SecurityContext.HTML, html) || '';
  }

  public validateAndSanitize(content: BlockModel[]): BlockModel[] {
    return content.map(block => ({
      ...block,
      content: block.content?.map(c => ({
        ...c,
        content: this.sanitizeText(c.content || '')
      }))
    }));
  }

  private sanitizeText(text: string): string {
    // Remove script tags and event handlers
    return text
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
      .replace(/on\w+\s*=/gi, '');
  }
}
```

### 2. Content Security Policy (CSP)

Set HTTP headers:

```typescript
// security.interceptor.ts
@Injectable()
export class SecurityInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const csrfToken = this.getCSRFToken();
    
    const secureReq = req.clone({
      setHeaders: {
        'X-CSRF-Token': csrfToken,
        'Content-Security-Policy': "default-src 'self'; script-src 'self'; style-src 'self' 'unsafe-inline'"
      }
    });
    
    return next.handle(secureReq);
  }

  private getCSRFToken(): string {
    return document.querySelector('meta[name="csrf-token"]')?.getAttribute('content') || '';
  }
}
```

### 3. Rate Limiting for Paste

```typescript
@Component({
  selector: 'app-limited-paste',
  template: `<ejs-blockeditor (beforePasteCleanup)="onBeforePaste($event)" />`,
  standalone: true,
  imports: [BlockEditorModule]
})
export class LimitedPasteComponent {
  private lastPasteTime = 0;
  private pasteCooldown = 1000; // 1 second minimum between pastes

  public onBeforePaste(args: BeforePasteCleanupEventArgs): void {
    const now = Date.now();
    
    if (now - this.lastPasteTime < this.pasteCooldown) {
      console.warn('Paste too frequent. Rate limited.');
      args.cancel = true;
      return;
    }
    
    this.lastPasteTime = now;
    
    // Additional validation
    if (args.pastedContent.length > 100000) {
      console.warn('Content too large');
      args.cancel = true;
    }
  }
}
```

## Implementation Examples

### Example 1: Secure Editor with Paste Cleanup

```typescript
import { Component, ViewChild } from '@angular/core';
import { BlockEditorModule, BlockEditorComponent, PasteCleanupSettingsModel } from '@syncfusion/ej2-angular-blockeditor';

@Component({
  selector: 'app-secure-editor',
  template: `
    <ejs-blockeditor 
      #blockEditor
      [enableHtmlEncode]="true"
      [pasteCleanupSettings]="pasteCleanupSettings"
      [readOnly]="isReadOnly"
    />
  `,
  standalone: true,
  imports: [BlockEditorModule]
})
export class SecureEditorComponent {
  @ViewChild('blockEditor') blockEditor!: BlockEditorComponent;
  
  public isReadOnly = false;
  
  public pasteCleanupSettings: PasteCleanupSettingsModel = {
    deniedTags: ['script', 'iframe', 'object', 'embed'],
    keepFormat: true,
    plainText: false
  };
}
```

### Example 2: Role-Based Security

```typescript
import { Component } from '@angular/core';
import { BlockEditorModule, PasteCleanupSettingsModel } from '@syncfusion/ej2-angular-blockeditor';

interface RBACService {
  hasPermission(permission: string): boolean;
}

@Component({
  selector: 'app-rbac-editor',
  template: `
    <ejs-blockeditor 
      [readOnly]="!hasEditPermission"
      [enableHtmlEncode]="true"
      [pasteCleanupSettings]="pasteCleanupSettings"
    />
  `,
  standalone: true,
  imports: [BlockEditorModule]
})
export class RBACEditorComponent {
  public hasEditPermission = false;
  
  public pasteCleanupSettings: PasteCleanupSettingsModel = {
    deniedTags: ['script', 'iframe', 'object'],
    keepFormat: true,
    plainText: false
  };

  constructor(private rbacService: RBACService) {
    this.hasEditPermission = this.rbacService.hasPermission('EDIT_CONTENT');
  }
}
```

### Example 3: Content Audit Logging

```typescript
@Component({
  selector: 'app-audited-editor',
  template: `<ejs-blockeditor (blockChanged)="onBlockChanged($event)" />`,
  standalone: true,
  imports: [BlockEditorModule]
})
export class AuditedEditorComponent {
  @ViewChild('blockEditor') blockEditor!: BlockEditorComponent;

  constructor(private auditService: AuditService) {}

  public onBlockChanged(args: BlockChangedEventArgs): void {
    this.auditService.logAction({
      action: args.action,
      timestamp: new Date(),
      userId: this.getCurrentUserId(),
      blockType: args.blockType,
      content: this.blockEditor.getDataAsJson()
    });
  }

  private getCurrentUserId(): string {
    // Get current user ID from auth service
    return 'user-123';
  }
}
```

