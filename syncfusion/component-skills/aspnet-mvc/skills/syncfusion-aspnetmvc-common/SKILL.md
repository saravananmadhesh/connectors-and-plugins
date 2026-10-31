---
name: syncfusion-aspnetmvc-common
description: "**CONFIGURATION GUIDE** — Assist with Syncfusion ASP.NET MVC EJ2 components setup using HTML Helpers, script references, localization, and globalization. Use when: installing Syncfusion.EJ2.MVC5, configuring HTML Helpers, adding script/style references, setting up culture-specific configurations."
metadata:
  author: "Syncfusion Inc"
  version: "34.1.29"
  platform: "ASP.NET MVC"
---

# Syncfusion ASP.NET MVC — Common Configuration

High-level, concern-specific guidelines for Syncfusion ASP.NET MVC EJ2 component setup and configuration. Implementation examples and code snippets live in the `references/` files for this concern.

## When to Use
- Starting or configuring a Syncfusion ASP.NET MVC (MVC5) project
- Setting up HTML Helpers with proper namespace configuration
- Verifying NuGet package dependencies and version compatibility
- Configuring script and stylesheet references (CDN, NPM, CRG, or local)
- Preparing localization, internationalization, and theming configurations
- Optimizing bundle size using Custom Resource Generator (CRG)

## Key Platform Differences (MVC vs Core)
- **Package**: `Syncfusion.EJ2.MVC5` (not AspNet.Core)
- **Pattern**: HTML Helpers via `@Html.EJS()` in .cshtml files
- **Namespace**: Added in `Web.config` under `Views` folder
- **Layout**: Script references in `~/Views/Shared/_Layout.cshtml`
- **Script Manager**: Register `@Html.EJS().ScriptManager()` at end of body

## Quick Checklist
✓ Install `Syncfusion.EJ2.MVC5` NuGet package (includes Newtonsoft.Json, Syncfusion.Licensing dependencies)  
✓ Add `Syncfusion.EJ2` namespace to Web.config under Views folder  
✓ Add theme CSS and EJ2 scripts to _Layout.cshtml head  
✓ Register ScriptManager at end of _Layout.cshtml body  
✓ Register license key early in Global.asax.cs Application_Start method  
✓ Choose script reference method: CDN, NPM with Gulp, or CRG  
✓ Configure localization files and culture settings if needed  
✓ Validate by rendering a simple control (e.g., Calendar)

## References
- Getting started & installation: [references/getting-started.md](references/getting-started.md)
- Script references & CDN: [references/script-references.md](references/script-references.md)
- Localization & globalization: [references/localization-globalization.md](references/localization-globalization.md)

