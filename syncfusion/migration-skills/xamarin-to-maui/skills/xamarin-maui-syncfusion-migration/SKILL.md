---
name: xamarin-maui-syncfusion-migration
description: Companion migration skill for converting Syncfusion Xamarin.Forms controls to .NET MAUI using control-specific mapping guidance.
metadata:
  author: "Syncfusion Inc"
  version: "1.0.1"
---

# Xamarin.Forms to .NET MAUI Syncfusion Migration Skill

## Purpose

Use this skill to migrate Syncfusion controls used in Xamarin.Forms apps to their .NET MAUI equivalents with control-level accuracy.

This skill is self-contained and relies on references bundled in this skill folder.

Control-wise API, event, and method migration mappings are captured in references/controls/*.md.

## Recommended skill sequence

Run skills in this order for best outcomes:
1. xamarin-maui-framework-migration
2. xamarin-maui-syncfusion-migration (this skill)
3. xamarin-maui-platform-specific-migration
4. xamarin-maui-renderer-handler-migration

Use this skill after baseline MAUI project migration so Syncfusion namespace, API, and control mappings are applied before platform and renderer hardening.

## When to use this skill

Use this skill when one or more of the following are present:
1. Xamarin Syncfusion namespaces such as Syncfusion.*.XForms in XAML or C#.
2. Syncfusion Xamarin controls in UI pages, templates, or custom controls.
3. API rename or enum rename issues after moving code to MAUI.
4. Split-control migrations (for example, Xamarin SfChart to MAUI chart families).

Use this skill for:
1. Control equivalence mapping from Xamarin to MAUI.
2. Namespace migration for Syncfusion assemblies.
3. API rename triage (properties, enums, events, classes).
4. Unsupported and obsolete control replacement guidance.
5. Syncfusion migration backlog generation with risk tags.
6. MAUI startup registration checks for Syncfusion core and control dependencies.

## Do not use this skill for

1. Non-Syncfusion migrations as a primary task.
2. Pure platform manifest/plist capability migration.
3. Custom renderer-to-handler rewrites unrelated to Syncfusion controls.

## Inputs

Required input:
1. MAUI target project root.
2. Source Xamarin.Forms code (solution or copied modules).
3. Syncfusion migration reference files in this skill folder.

Recommended inputs:
1. List of controls used by feature area or page.
2. Existing styling/theme resources affecting Syncfusion controls.
3. Screenshots for visual parity checks.

Optional behavior flags:
1. Dry run for analysis-only output.
2. Strict mode to fail when unresolved Syncfusion control mappings remain.
3. Control filter to scope migration to selected controls.

## Outputs

Primary outputs:
1. Syncfusion control inventory with Xamarin-to-MAUI mapping.
2. Namespace and API rename change list.
3. Manual action backlog for pending or unsupported features.
4. Migration readiness score for Syncfusion-dependent screens.
5. Startup registration checklist for MauiProgram and required Syncfusion packages.
6. Control-wise migration reference set for APIs, events, and methods.

Secondary outputs:
1. Suggested package and using updates.
2. Per-control risk heatmap (low, medium, high).
3. Visual parity checklist per migrated control.

## Execution workflow

1. Inventory and classification
1. Detect Syncfusion controls, namespaces, enums, and API usages in XAML and C#.
2. Group findings by control and feature area.
3. Classify controls as direct map, split map, renamed API map, or obsolete map.

2. Control mapping
1. Use references/common-migration-summary.md for canonical control equivalence.
2. Use references/control-doc-index.md and references/nuget-package-map.md for control coverage, API patterns, and package mapping.
3. Use the corresponding references/controls/<Control>.md file for detailed API/event/method mapping per control.
4. Flag controls with upcoming, missing, or behavior-changed features.

3. Namespace and API migration
1. Replace Xamarin Syncfusion namespaces with MAUI Syncfusion namespaces per control guide.
2. Update XAML namespace declarations for each control (e.g., `xmlns:sfPopup="clr-namespace:Syncfusion.Maui.Popup;assembly=Syncfusion.Maui.Popup"`).
3. Add C# using directives: `using Syncfusion.Maui.Core.Hosting;` (for ConfigureSyncfusionCore) and control-specific namespaces.
4. Apply API renames for properties, enums, events, and classes.
5. Preserve behavior with explicit notes where one-to-one mapping is not available.

4. Package and registration alignment
1. Verify required Syncfusion MAUI packages are referenced for detected controls.
2. Ensure MauiProgram includes Syncfusion core registration (builder.ConfigureSyncfusionCore()) and required using directives.
3. Flag missing registration or package gaps as blocking actions.

5. Obsolete and split-control handling
1. Apply split-control migration patterns (for example SfChart to SfCartesianChart, SfCircularChart, SfFunnelChart, SfPyramidChart, SfPolarChart).
2. Map obsolete controls to MAUI or built-in replacements when documented.
3. Record unsupported paths as manual actions with owners.

6. Validation and reporting
1. Validate no Xamarin Syncfusion namespaces remain in migrated files.
2. Validate each detected Xamarin control has a MAUI mapping decision.
3. Validate MauiProgram contains required Syncfusion registration and imports.
4. Produce report with changed APIs, manual actions, and residual risks.

## Namespace Migration Reference

### C# Using Directives (Required)
1. **Hosting namespace (required for registration):** `using Syncfusion.Maui.Core.Hosting;`
   - Provides the `ConfigureSyncfusionCore()` extension method
2. **Core namespace (for core types):** `using Syncfusion.Maui.Core;`
3. **Control-specific namespaces:** `using Syncfusion.Maui.Popup;`, `using Syncfusion.Maui.Charts;`, etc.

### XAML Namespace Declarations (Required)
Pattern: `xmlns:prefix="clr-namespace:Syncfusion.Maui.ControlNamespace;assembly=Syncfusion.Maui.ControlNamespace"`

Examples:
- **Popup:** `xmlns:sfPopup="clr-namespace:Syncfusion.Maui.Popup;assembly=Syncfusion.Maui.Popup"`
- **Charts:** `xmlns:sfChart="clr-namespace:Syncfusion.Maui.Charts;assembly=Syncfusion.Maui.Charts"`
- **DataGrid:** `xmlns:sfGrid="clr-namespace:Syncfusion.Maui.DataGrid;assembly=Syncfusion.Maui.DataGrid"`

## Rule examples

Namespace rules:
1. Syncfusion.*.XForms namespaces must migrate to Syncfusion.Maui.* namespaces per control guide.
2. Update XAML namespace declarations to match new Syncfusion.Maui.* control namespaces.
3. Add `using Syncfusion.Maui.Core.Hosting;` to MauiProgram.cs for ConfigureSyncfusionCore().
4. Remove stale Xamarin Syncfusion using directives after migration.

Registration rules:
1. MauiProgram must register Syncfusion core using `builder.ConfigureSyncfusionCore()`.
2. MauiProgram.cs must include `using Syncfusion.Maui.Core.Hosting;` to access ConfigureSyncfusionCore() extension method.
3. Syncfusion.Maui.Core package must be installed as a baseline dependency.
4. If an app uses only a subset of controls, registration is still required unless explicitly documented otherwise.

Control mapping rules:
1. Xamarin SfChart maps to MAUI chart family based on feature usage.
2. Xamarin SfRangeSlider may map to MAUI SfSlider or SfRangeSlider depending on behavior.
3. Xamarin controls marked obsolete in MAUI must map to documented alternatives.

API modernization rules:
1. Apply enum/property/class renames exactly as documented in each control migration guide.
2. For controls with pending features, retain workaround notes as explicit action items.

## Safety and constraints

1. Do not infer undocumented control mappings when docs provide explicit mappings.
2. Any unresolved control mapping must be reported as a blocker or high-risk item.
3. Behavioral parity checks are required for high-impact controls (charts, grid, scheduler, editors).
4. Migration is incomplete until all Syncfusion usages are mapped, replaced, or explicitly deferred.
5. Migration is incomplete until Syncfusion startup registration is validated in MauiProgram.

## References

1. Common migration summary: references/common-migration-summary.md
2. Control document index: references/control-doc-index.md
3. NuGet package map: references/nuget-package-map.md

Related skills:
1. ../xamarin-maui-framework-migration/SKILL.md
2. ../xamarin-maui-platform-specific-migration/SKILL.md
3. ../xamarin-maui-renderer-handler-migration/SKILL.md

## Definition of done

Syncfusion migration is complete when:
1. All detected Xamarin Syncfusion controls have mapping decisions.
2. Namespace and API rename changes are applied and validated.
3. All XAML namespace declarations are updated to Syncfusion.Maui.* patterns.
4. All C# using directives are updated, including `using Syncfusion.Maui.Core.Hosting;` in MauiProgram.cs.
5. Obsolete or unsupported controls have approved replacement plans.
6. Visual and functional checks are documented for critical screens.
7. MauiProgram registration includes `builder.ConfigureSyncfusionCore()` and required imports:
   - `using Syncfusion.Maui.Core.Hosting;` (for ConfigureSyncfusionCore extension)
   - `using Syncfusion.Maui.Core;` (for core types)
8. Syncfusion.Maui.Core and control-specific packages are installed.
9. No residual Xamarin Syncfusion namespaces remain in the migrated code.
10. Final report includes blockers, owners, and next actions.
