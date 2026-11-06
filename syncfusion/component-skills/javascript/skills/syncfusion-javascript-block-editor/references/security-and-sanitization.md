# Security and Sanitization Reference

Complete reference for security features, HTML sanitization, and read-only mode in the Syncfusion JavaScript BlockEditor.

## Table of Contents

- [Overview](#overview)
- [HTML Sanitization](#html-sanitization)
- [HTML Encoding](#html-encoding)
  - [enableHtmlEncode](#enablehtmlencode)
  - [When to Use HTML Encoding](#when-to-use-html-encoding)
  - [Configuration Examples](#encoding-configuration-examples)
- [Read-Only Mode](#read-only-mode)
  - [Configuration](#read-only-configuration)
  - [Use Cases](#read-only-use-cases)
  - [Dynamic Toggle](#dynamic-read-only-toggle)
- [Security Best Practices](#security-best-practices)
  - [Input Validation](#input-validation)
  - [Content Security Policy](#content-security-policy)
  - [Safe Content Handling](#safe-content-handling)
- [Complete API Reference](#complete-api-reference)
- [Code Examples](#code-examples)

## Overview

The Block Editor provides robust security features to protect against Cross-Site Scripting (XSS) attacks and unauthorized content manipulation. The primary security mechanisms include HTML sanitization, HTML encoding, and read-only mode.

## HTML Sanitization

HTML sanitization is a critical security feature that removes potentially malicious scripts, event handlers, and unsafe HTML tags from user-generated content. It is handled by default in the block editor.

## HTML Encoding

HTML encoding converts special HTML characters to their entity equivalents, providing an additional layer of security.

### enableHtmlEncode

The `enableHtmlEncode` property enables automatic encoding of HTML special characters.

**Property:** `enableHtmlEncode`

**Type:** `boolean`

**Default:** `false`

**Configuration:**
```typescript
const editor = new BlockEditor({
    enableHtmlEncode: true
});
```

When enabled, the encoder converts:
- `<` to `&lt;`
- `>` to `&gt;`
- `&` to `&amp;`
- `"` to `&quot;`
- `'` to `&#39;`

### When to Use HTML Encoding

**Use HTML Encoding When:**
1. Displaying user-generated content that should be shown as plain text
2. Showing code snippets or HTML examples
3. Preventing any HTML interpretation
4. Maximum security is required for untrusted content

**Example:**
```typescript
const blockEditor = new BlockEditor({
    enableHtmlEncode: true
});

```

### Encoding Configuration Examples

**Example 1: Display HTML Code**
```typescript
import { BlockEditor } from '@syncfusion/ej2-blockeditor';

const blockEditor: BlockEditor = new BlockEditor({
    enableHtmlEncode: true,
    blocks: [
        {
            blockType: 'CodeBlock',
            properties: { language: 'html' },
            content: [
                {
                    contentType: ContentType.Text,
                    content: '<div class="example">\n  <h1>Hello World</h1>\n</div>'
                }
            ]
        }
    ]
});

blockEditor.appendTo('#blockeditor');
```

**Example 2: Sanitization vs. Encoding**
```typescript
// Scenario 1: HTML Sanitization (default)
const editor1 = new BlockEditor({
    enableHtmlSanitizer: true,
    enableHtmlEncode: false
});
// Result: Safe HTML is rendered, unsafe HTML is removed

// Scenario 2: HTML Encoding
const editor2 = new BlockEditor({
    enableHtmlSanitizer: false,
    enableHtmlEncode: true
});
// Result: All HTML is displayed as text (not rendered)

// Scenario 3: Both Enabled
const editor3 = new BlockEditor({
    enableHtmlSanitizer: true,
    enableHtmlEncode: true
});
// Result: Content is sanitized first, then encoded
```

## Read-Only Mode

Read-only mode prevents content editing while allowing users to view and interact with non-editable elements like links.

### Read-Only Configuration

**Property:** `readOnly`

**Type:** `boolean`

**Default:** `false`

**Configuration:**
```typescript
const editor = new BlockEditor({
    readOnly: true
});
```

**Behavior:**
- Content cannot be edited or deleted
- Text selection is still possible
- Links remain clickable
- Copy operations are allowed
- No toolbar or menu interactions
- Keyboard shortcuts for editing are disabled

### Read-Only Use Cases

**Common Use Cases:**
1. **Document Viewer:** Display documents that shouldn't be modified
2. **Preview Mode:** Show content preview before publishing
3. **Archive Display:** Present historical or archived content
4. **Permission-Based Editing:** Restrict editing based on user roles
5. **Review Mode:** Allow reading and commenting without editing

**Example:**
```typescript
import { BlockEditor, BlockModel, ContentType } from '@syncfusion/ej2-blockeditor';

const documentBlocks: BlockModel[] = [
    {
        blockType: 'Heading',
        properties: { level: 1 },
        content: [
            {
                contentType: ContentType.Text,
                content: 'Published Document'
            }
        ]
    },
    {
        blockType: 'Paragraph',
        content: [
            {
                contentType: ContentType.Text,
                content: 'This is a published document that cannot be edited. Visit '
            },
            {
                contentType: ContentType.Link,
                content: 'our website',
                properties: { href: 'www.syncfusion.com' }
            },
            {
                contentType: ContentType.Text,
                content: ' for more information.'
            }
        ]
    }
];

const blockEditor: BlockEditor = new BlockEditor({
    blocks: documentBlocks,
    readOnly: true,
    width: '100%',
    height: '500px'
});

blockEditor.appendTo('#blockeditor');
```

### Dynamic Read-Only Toggle

**Example:**
```typescript
const blockEditor = new BlockEditor({
    blocks: blocksData,
    readOnly: false
});

blockEditor.appendTo('#blockeditor');

// Function to check user permissions
function checkEditPermission(): boolean {
    // Implement your permission logic
    return userHasEditPermission;
}

// Toggle read-only based on permissions
document.getElementById('editBtn')?.addEventListener('click', () => {
    if (checkEditPermission()) {
        blockEditor.readOnly = false;
        console.log('Editing enabled');
    } else {
        alert('You do not have permission to edit this document');
    }
});

document.getElementById('lockBtn')?.addEventListener('click', () => {
    blockEditor.readOnly = true;
    console.log('Document locked');
});
```

## Security Best Practices

### Input Validation

Always validate user input before processing:

```typescript
import { BlockEditor, BeforePasteCleanupEventArgs } from '@syncfusion/ej2-blockeditor';

const blockEditor: BlockEditor = new BlockEditor({
    enableHtmlSanitizer: true,
    
    beforePasteCleanup: (args: BeforePasteCleanupEventArgs) => {
        // Check for suspicious patterns
        const suspiciousPatterns = [
            /<script[^>]*>[\s\S]*?<\/script>/gi,
            /javascript:/gi,
            /on\w+\s*=/gi,
            /<iframe[^>]*>/gi,
            /data:text\/html/gi
        ];
        
        for (const pattern of suspiciousPatterns) {
            if (pattern.test(args.content)) {
                console.warn('Suspicious content detected:', pattern);
                // Content will be sanitized automatically
            }
        }
    }
});

blockEditor.appendTo('#blockeditor');
```

### Content Security Policy

Implement Content Security Policy (CSP) headers:

```html
<meta http-equiv="Content-Security-Policy" content="
    default-src 'self';
    script-src 'self' 'unsafe-inline' 'unsafe-eval';
    style-src 'self' 'unsafe-inline';
    img-src 'self' data: https:;
    font-src 'self' data:;
    connect-src 'self';
">
```

### Safe Content Handling

**Best Practices:**

1. **Always Enable Sanitization:**
```typescript
const editor = new BlockEditor({
    enableHtmlSanitizer: true  // Always keep this enabled
});
```

2. **Validate External Content:**
```typescript
async function loadExternalContent(url: string): Promise<void> {
    try {
        const response = await fetch(url);
        const html = await response.text();
        
        // Additional validation
        if (isContentSafe(html)) {
            blockEditor.loadHtml(html);
        } else {
            console.error('Content failed safety check');
        }
    } catch (error) {
        console.error('Failed to load content:', error);
    }
}

function isContentSafe(content: string): boolean {
    // Implement your validation logic
    const dangerousPatterns = [/<script/i, /javascript:/i, /on\w+=/i];
    return !dangerousPatterns.some(pattern => pattern.test(content));
}
```

3. **Use Read-Only for Untrusted Content:**
```typescript
const editor = new BlockEditor({
    enableHtmlSanitizer: true,
    readOnly: true  // For displaying user-generated content
});
```

4. **Sanitize on Server Side:**
```typescript
// Client-side
async function saveContent(): Promise<void> {
    const html = blockEditor.getDataAsHtml();
    
    await fetch('/api/save-content', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: html })
    });
}

// Server-side (Node.js example)
const sanitizeHtml = require('sanitize-html');

app.post('/api/save-content', (req, res) => {
    const cleanContent = sanitizeHtml(req.body.content, {
        allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img']),
        allowedAttributes: {
            'a': ['href', 'title', 'target'],
            'img': ['src', 'alt', 'width', 'height']
        }
    });
    
    // Save cleanContent to database
    res.json({ success: true });
});
```

## Complete API Reference

### Security Properties

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `enableHtmlSanitizer` | `boolean` | `true` | Enable HTML sanitization to prevent XSS attacks |
| `enableHtmlEncode` | `boolean` | `false` | Enable HTML encoding of special characters |
| `readOnly` | `boolean` | `false` | Enable read-only mode |

### Paste Cleanup Settings (Security Related)

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `deniedTags` | `string[]` | `[]` | HTML tags to remove from pasted content |
| `plainText` | `boolean` | `false` | Paste content as plain text |

## Code Examples

### Complete Security Configuration

```typescript
import { BlockEditor, BlockModel, ContentType, BeforePasteCleanupEventArgs, AfterPasteCleanupEventArgs } from '@syncfusion/ej2-blockeditor';

const secureBlocks: BlockModel[] = [
    {
        blockType: 'Heading',
        properties: { level: 1 },
        content: [
            {
                contentType: ContentType.Text,
                content: 'Secure Block Editor'
            }
        ]
    },
    {
        blockType: 'Paragraph',
        content: [
            {
                contentType: ContentType.Text,
                content: 'This editor is configured with maximum security settings.'
            }
        ]
    }
];

const blockEditor: BlockEditor = new BlockEditor({
    blocks: secureBlocks,
    
    // Security settings
    enableHtmlSanitizer: true,
    enableHtmlEncode: false,
    
    // Paste cleanup
    pasteCleanupSettings: {
        deniedTags: ['script', 'iframe', 'embed', 'object', 'applet', 'link', 'meta', 'style'],
        keepFormat: true,
        plainText: false
    },
    
    // Event handlers
    beforePasteCleanup: (args: BeforePasteCleanupEventArgs) => {
        console.log('Validating pasted content...');
        
        // Log suspicious content
        const suspiciousPatterns = [
            { pattern: /<script[^>]*>/gi, name: 'Script tags' },
            { pattern: /javascript:/gi, name: 'JavaScript protocol' },
            { pattern: /on\w+\s*=/gi, name: 'Event handlers' },
            { pattern: /<iframe[^>]*>/gi, name: 'iframes' }
        ];
        
        suspiciousPatterns.forEach(({ pattern, name }) => {
            if (pattern.test(args.content)) {
                console.warn(`Detected ${name} - will be sanitized`);
            }
        });
    },
    
    afterPasteCleanup: (args: AfterPasteCleanupEventArgs) => {
        console.log('Content sanitized successfully');
        displayMessage('Content pasted securely');
    },
    
    created: () => {
        console.log('Secure editor initialized');
        displaySecurityStatus();
    }
});

blockEditor.appendTo('#blockeditor');

function displayMessage(message: string): void {
    const statusDiv = document.getElementById('status');
    if (statusDiv) {
        statusDiv.textContent = message;
        statusDiv.style.color = '#00AA00';
    }
}

function displaySecurityStatus(): void {
    const status = {
        'HTML Sanitizer': blockEditor.enableHtmlSanitizer ? 'Enabled' : 'Disabled',
        'HTML Encoding': blockEditor.enableHtmlEncode ? 'Enabled' : 'Disabled',
        'Read-Only Mode': blockEditor.readOnly ? 'Enabled' : 'Disabled'
    };
    
    console.log('Security Status:', status);
}
```

### Role-Based Read-Only Mode

```typescript
import { BlockEditor, BlockModel, ContentType } from '@syncfusion/ej2-blockeditor';

// Simulated user roles
enum UserRole {
    Admin = 'admin',
    Editor = 'editor',
    Viewer = 'viewer'
}

// Current user role (would come from authentication)
let currentUserRole: UserRole = UserRole.Viewer;

const documentBlocks: BlockModel[] = [
    {
        blockType: 'Heading',
        properties: { level: 1 },
        content: [
            {
                contentType: ContentType.Text,
                content: 'Role-Based Document Access'
            }
        ]
    },
    {
        blockType: 'Paragraph',
        content: [
            {
                contentType: ContentType.Text,
                content: 'Your editing capabilities are determined by your user role.'
            }
        ]
    }
];

// Determine read-only based on user role
function isReadOnly(role: UserRole): boolean {
    return role === UserRole.Viewer;
}

const blockEditor: BlockEditor = new BlockEditor({
    blocks: documentBlocks,
    readOnly: isReadOnly(currentUserRole),
    enableHtmlSanitizer: true,
    width: '100%',
    height: '500px'
});

blockEditor.appendTo('#blockeditor');

// Update editor when role changes
function updateUserRole(newRole: UserRole): void {
    currentUserRole = newRole;
    blockEditor.readOnly = isReadOnly(newRole);
    
    updateRoleDisplay();
}

function updateRoleDisplay(): void {
    const roleDisplay = document.getElementById('roleDisplay');
    const editStatus = document.getElementById('editStatus');
    
    if (roleDisplay && editStatus) {
        roleDisplay.textContent = `Current Role: ${currentUserRole}`;
        editStatus.textContent = blockEditor.readOnly ? 'Read-Only' : 'Editable';
        editStatus.style.color = blockEditor.readOnly ? '#FF0000' : '#00AA00';
    }
}

// Role switcher buttons
document.getElementById('setAdmin')?.addEventListener('click', () => {
    updateUserRole(UserRole.Admin);
});

document.getElementById('setEditor')?.addEventListener('click', () => {
    updateUserRole(UserRole.Editor);
});

document.getElementById('setViewer')?.addEventListener('click', () => {
    updateUserRole(UserRole.Viewer);
});

updateRoleDisplay();
```
---
