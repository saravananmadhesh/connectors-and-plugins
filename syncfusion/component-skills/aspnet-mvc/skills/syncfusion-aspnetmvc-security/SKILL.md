---
name: syncfusion-aspnetmvc-security
description: "**CONTENT SECURITY POLICY (CSP) GUIDE** — Assist with configuring Syncfusion ASP.NET MVC EJ2 components to work with strict Content Security Policy (CSP) headers. Use when: implementing CSP headers, applying nonces to inline scripts/styles, configuring external font allowlists, or troubleshooting CSP violations and XSS protections."
metadata:
  author: "Syncfusion Inc"
  version: "34.1.29"
  platform: "ASP.NET MVC"
---

# Content Security Policy (CSP) — Syncfusion ASP.NET MVC (Security)

Use this skill for high-level, Syncfusion-specific CSP guidance and vulnerability-free configurations. Detailed implementation patterns and troubleshooting live in the concern's `references` files.

## When to Use
- Implementing CSP headers for Syncfusion EJ2 controls in ASP.NET MVC
- Running in strict CSP mode where inline scripts/styles are restricted
- Blocking XSS, data injection, and other browser-based attacks
- Allowlisting CDN resources, external fonts, and trusted origins
- Validating and testing CSP compliance in development and production
- Troubleshooting CSP violation errors in browser console

## ASP.NET MVC-Specific CSP Implementation
- **Location**: Meta tag in `~/Views/Shared/_Layout.cshtml` head, or HTTP headers via IIS/code
- **Scope**: Applied globally to all views; can be overridden per view if needed
- **Script Manager**: Syncfusion's ScriptManager may require `unsafe-inline` mitigation via nonces

## Key CSP Directives for Syncfusion

### Core Directives Required
```
default-src 'self'                          // Restrict all to same origin
script-src 'self' 'unsafe-inline' https://cdn.syncfusion.com  // Scripts (inline needed for init)
style-src 'self' 'unsafe-inline' https://fonts.googleapis.com // Styles (inline for themes)
font-src 'self' data: https://fonts.gstatic.com https://fonts.googleapis.com // Fonts
```

### Optional Directives
- `unsafe-eval` (in script-src): Required ONLY if controls use templates (Grid, Dialog, etc.)
- `img-src`: Add external CDN URLs if images hosted elsewhere
- `connect-src`: For AJAX/fetch requests to data endpoints

## Quick Checklist
✓ Add meta tag with strict CSP to _Layout.cshtml head  
✓ Allow `https://cdn.syncfusion.com` for Syncfusion scripts/styles  
✓ Allow `https://fonts.googleapis.com` and `https://fonts.gstatic.com` (Material/Tailwind themes)  
✓ Include `'unsafe-inline'` for style-src (Syncfusion uses inline styles for theming)  
✓ Include `'unsafe-eval'` in script-src ONLY if using template-based controls  
✓ Test in browser DevTools (F12) → Console for CSP violations  
✓ Monitor Content-Security-Policy-Report-Only for violation reports  
✓ Avoid `*` wildcards; use explicit origins and `'self'`  
✓ Document any relaxations and security implications  

## Security Best Practices
- **Nonce Strategy**: Generate unique nonce per request; apply to inline scripts/styles
- **Header vs Meta**: Prefer HTTP header over meta tag for true enforcement
- **Violation Reporting**: Use `report-uri` or `report-to` to monitor violations
- **Development vs Production**: Use `Content-Security-Policy-Report-Only` in staging; validate before enforcing
- **Third-party Scripts**: Audit Syncfusion CDN and trusted sources regularly
- **Minimize Inline Code**: Refactor to external scripts where possible to reduce `unsafe-inline` scope

## Common Violations & Fixes
| Violation | Root Cause | Fix |
|-----------|-----------|-----|
| Inline style blocked | Syncfusion theme styles | Add `'unsafe-inline'` to style-src |
| Font load failed | External font from googleapis | Add `https://fonts.googleapis.com` to font-src, style-src |
| Script init failed | ScriptManager inline setup | Add `'unsafe-inline'` to script-src or generate nonce |
| Template not rendering | Grid/Dialog template uses eval | Add `'unsafe-eval'` to script-src (with caution) |

## References
- CSP meta tag & HTTP header examples: [references/csp-guide.md](references/csp-guide.md)


