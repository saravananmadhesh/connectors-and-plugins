# Script References for Syncfusion ASP.NET MVC EJ2

## Overview
This guide covers how to reference Syncfusion EJ2 scripts and stylesheets in ASP.NET MVC applications using different delivery methods: CDN, NPM with Gulp, and Custom Resource Generator (CRG).

---

## CDN Reference (Easiest - Recommended)

CDN provides pre-built, minified scripts and stylesheets hosted on Syncfusion's content delivery network. No build setup required.

### All Controls (Combined Bundle)
**Recommended for**: Small projects, getting started, minimal controls

Add to `<head>` in `~/Views/Shared/_Layout.cshtml`:

```html
<head>
    <!-- Syncfusion EJ2 All Controls - Single Bundle -->
    <link rel="stylesheet" href="https://cdn.syncfusion.com/ej2/33.1.44/material.css" />
    <script src="https://cdn.syncfusion.com/ej2/33.1.44/dist/ej2.min.js"></script>
</head>
```

**CDN URLs by Version:**
```
https://cdn.syncfusion.com/ej2/33.1.44/dist/ej2.min.js
https://cdn.syncfusion.com/ej2/33.1.44/{THEME-NAME}.css
```

⚠️ **Caution**: All controls bundle is large (~5-6MB). Performance impact on production. Use individual controls or CRG for production.

### Individual Control References
**Recommended for**: Production environments, performance-critical apps

Add individual dependencies respecting the dependency graph:

```html
<head>
    <!-- Base Package (Required) -->
    <link rel="stylesheet" href="https://cdn.syncfusion.com/ej2/33.1.44/ej2-base/styles/material.css" />
    
    <!-- Calendar Control (Example) - Requires buttons and calendars packages -->
    <link rel="stylesheet" href="https://cdn.syncfusion.com/ej2/33.1.44/ej2-buttons/styles/material.css" />
    <link rel="stylesheet" href="https://cdn.syncfusion.com/ej2/33.1.44/ej2-calendars/styles/material.css" />
    
    <!-- Scripts - Order matters! -->
    <script src="https://cdn.syncfusion.com/ej2/33.1.44/ej2-base/dist/global/ej2-base.min.js"></script>
    <script src="https://cdn.syncfusion.com/ej2/33.1.44/ej2-buttons/dist/global/ej2-buttons.min.js"></script>
    <script src="https://cdn.syncfusion.com/ej2/33.1.44/ej2-calendars/dist/global/ej2-calendars.min.js"></script>
</head>
```

**Dependency Graph (Common Controls):**
```
ej2-base (Required for all)
├── ej2-buttons
├── ej2-calendars (→ ej2-buttons)
├── ej2-dropdowns
├── ej2-inputs
├── ej2-grids (→ ej2-buttons, ej2-dropdowns, ej2-inputs)
└── ej2-popups
```

**URL Format:**
```
Styles:  https://cdn.syncfusion.com/ej2/{VERSION}/ej2-{PACKAGE}/styles/{THEME-NAME}.css
Scripts: https://cdn.syncfusion.com/ej2/{VERSION}/ej2-{PACKAGE}/dist/global/ej2-{PACKAGE}.min.js
```

### Theme CDN URLs

| Theme | Light CSS | Dark CSS |
|-------|-----------|----------|
| Material | `material.css` | `material-dark.css` |
| Bootstrap 5 | `bootstrap5.css` | `bootstrap5-dark.css` |
| Bootstrap 4 | `bootstrap4.css` | (none) |
| Tailwind | `tailwind.css` | `tailwind-dark.css` |
| Fluent | `fluent.css` | `fluent-dark.css` |
| Fabric | `fabric.css` | `fabric-dark.css` |
| High Contrast | `highcontrast.css` | (none) |

---

## NPM with Gulp (Advanced - Full Control)

NPM provides source scripts and SCSS files. Use with build tools like Gulp for customization.

### Prerequisites
- Node.js and npm installed
- Gulp installed: `npm install gulp --save`
- Glob installed: `npm install glob --save`
- Visual Studio 2015+ or VS Code

### Step 1: Install Syncfusion Packages via NPM

1. In Solution Explorer, right-click project → "Open Folder in File Explorer"
2. Open Command Prompt at project root
3. Create `package.json` if not exists
4. Install required Syncfusion packages:

```bash
npm install @syncfusion/ej2-base --save
npm install @syncfusion/ej2-buttons --save
npm install @syncfusion/ej2-calendars --save
# Install other packages as needed
```

### Step 2: Create gulpfile.js

Create `~/gulpfile.js` at project root:

```javascript
/// <binding BeforeBuild='copy-client-resource'/>
var gulp = require('gulp');
var glob = require('glob');

// Task to copy Syncfusion resources from node_modules to Content folder
gulp.task('copy-client-resource', function(done) {
    let packagePath = './node_modules/@syncfusion/';
    let destCommonPath = 'Content/syncfusion';
    
    let installedPackages = glob.sync(`${packagePath}*`);
    
    for (let insPackage of installedPackages) {
        let packagename = insPackage.replace(packagePath, '');
        
        // Copy distribution scripts
        gulp.src(`${insPackage}/dist/global/**/*`)
            .pipe(gulp.dest(`${destCommonPath}/${packagename}/`));
        
        // Copy stylesheets
        gulp.src(`${insPackage}/styles/**/*.css`)
            .pipe(gulp.dest(`${destCommonPath}/${packagename}/styles/`));
    }
    
    done();
});
```

### Step 3: Configure Visual Studio Build

1. Right-click project → Properties
2. Build Events tab
3. Pre-build event command: `gulp copy-client-resource`

Alternatively, in Package Manager Console:
```powershell
npm install
```

### Step 4: Reference Copied Scripts in _Layout.cshtml

```html
<head>
    <!-- Syncfusion resources copied from node_modules via Gulp -->
    @Styles.Render("~/Content/syncfusion/ej2-base/styles/material.css")
    @Styles.Render("~/Content/syncfusion/ej2-buttons/styles/button/material.css")
    @Styles.Render("~/Content/syncfusion/ej2-calendars/styles/calendar/material.css")
    
    @Scripts.Render("~/Content/syncfusion/ej2-base/ej2-base.min.js")
    @Scripts.Render("~/Content/syncfusion/ej2-buttons/ej2-buttons.min.js")
    @Scripts.Render("~/Content/syncfusion/ej2-calendars/ej2-calendars.min.js")
</head>
```

### Advantages
- Full source code access
- SCSS customization for theming
- Smaller bundle via tree-shaking
- Version control via package.json

### Disadvantages
- Requires build setup
- More complex configuration
- Additional dependencies

---

## Custom Resource Generator (CRG)

CRG generates optimized bundles containing ONLY the controls and features you use.

**Tool**: https://crg.syncfusion.com/

### How It Works

1. Go to https://crg.syncfusion.com/
2. Select your platform: **ASP.NET MVC**
3. Select your version: **33.1.44**
4. Select individual controls you need (e.g., Calendar, Grid, Button)
5. Choose theme (Material, Bootstrap 5, etc.)
6. Generate → Download custom bundle
7. Extract and reference in `_Layout.cshtml`

### Example Generated Reference

```html
<head>
    <!-- CRG-generated resources -->
    <link rel="stylesheet" href="~/Content/ej2-custom-resource.css" />
    <script src="~/Content/ej2-custom-resource.min.js"></script>
</head>
```

### Advantages
- Minimal bundle size (only what you need)
- Fastest load time
- Production-optimized
- No build setup required

### Disadvantages
- Regenerate bundle when adding/removing controls
- Limited customization options
- May not include experimental features

---

## Comparison Table

| Method | Bundle Size | Setup | Customization | Performance | Use Case |
|--------|-------------|-------|----------------|-------------|----------|
| **CDN All Controls** | 5-6MB | None | Low | Slower | Development, learning |
| **CDN Individual** | ~2-3MB | Manual dependency tracking | Low | Medium | Small production apps |
| **NPM + Gulp** | ~2-3MB (optimized) | Moderate (build config) | High (SCSS) | Good | Large apps, theming |
| **CRG** | ~500KB-1.5MB | Minimal (download) | Low | Fastest | Production-optimized |

**Recommendation**: Use **CDN** for development → **CRG** for production

---

## Version Management

Always ensure versions match across:
- NuGet package: `Syncfusion.EJ2.MVC5` version
- CDN URLs: `https://cdn.syncfusion.com/ej2/{VERSION}/...`
- NPM packages: `@syncfusion/*` version in package.json

Check current package version:

```csharp
// In controller or view
var assembly = typeof(Syncfusion.EJ2.Grids.Grid).Assembly;
var version = assembly.GetName().Version;
// Output: 33.1.44
```

---

## Troubleshooting

| Issue | Cause | Solution |
|-------|-------|----------|
| **404 on CSS/JS files** | Wrong CDN version | Update CDN URL to match NuGet version (33.1.44) |
| **Controls not rendering** | Missing base scripts | Ensure ej2-base.min.js loads first |
| **Styles not applied** | CSS order | Load styles BEFORE scripts |
| **Duplicate bundle** | Both CDN and NPM referenced | Use only one method, remove duplicate references |
| **CORS errors** | Browser security | Ensure CDN URLs are HTTPS, whitelisted in CSP |

---

## Best Practices

1. **Version Lock**: Keep NuGet, CDN, and npm versions synchronized
2. **Cache Busting**: Append version query for local files: `ej2.min.js?v=33.1.44`
3. **Performance**: Use CRG or individual CDN for production
4. **CSP Compliance**: Allowlist `https://cdn.syncfusion.com` and `https://fonts.googleapis.com`
5. **Monitoring**: Track bundle size in CI/CD pipeline
6. **Fallback**: Have local copies for air-gapped environments

---

## Official Resources

- [Syncfusion Script References](https://ej2.syncfusion.com/aspnetmvc/documentation/common/adding-script-references)
- [Custom Resource Generator](https://crg.syncfusion.com/)
- [NPM Packages](https://www.npmjs.com/search?q=%40syncfusion)
- [Theme CDN URLs](https://ej2.syncfusion.com/aspnetmvc/documentation/appearance/theme)