---
name: xamarin-maui-framework-migration
description: Baseline migration skill for moving Xamarin.Forms solutions or copied modules to .NET MAUI using a create-new-project workflow.
metadata:
  author: "Syncfusion Inc"
  version: "1.0.0"
---

# Xamarin.Forms to .NET MAUI Migration Skill

## Purpose

Use this skill to migrate Xamarin.Forms code into .NET MAUI projects with a repeatable, auditable workflow.

This skill is reusable across repositories and teams. It supports full-solution migration and incremental copy-paste migration where code is moved module-by-module into an existing or new MAUI app.

This skill is designed around Microsoft guidance:
1. Upgrade Xamarin.Forms app to latest 5.x baseline.
2. Create a new .NET MAUI project.
3. Copy and transform code, resources, dependencies, and platform assets.
4. Replace incompatible APIs and modernize architecture.
5. Validate and report migration readiness and remaining manual work.

## Recommended skill sequence

Run skills in this order for best outcomes:
1. xamarin-maui-framework-migration (this skill)
2. xamarin-maui-syncfusion-migration
3. xamarin-maui-platform-specific-migration
4. xamarin-maui-renderer-handler-migration

Use this skill as the baseline migration pass, then run platform and renderer-focused companion skills for deep parity validation.

## When to use this skill

Use this skill when the input contains one of the following:
1. Shared project or .NET Standard shared library.
2. Android head project.
3. iOS head project.
4. Optional UWP project.
5. Copied Xamarin.Forms code files, XAML files, services, or platform snippets being moved into MAUI.

Use this skill for:
1. Multi-project to single-project conversion.
2. Namespace and API modernization.
3. Dependency compatibility triage.
4. Renderer to handler migration planning.
5. Migration readiness reporting and risk analysis.
6. Incremental copy-paste migration into an existing MAUI app.

Do not use this skill for:
1. In-place upgrade as the default strategy.
2. Non-Xamarin mobile stacks.
3. Full automatic conversion of advanced custom renderers without manual validation.

## Inputs

Required input:
1. Xamarin.Forms solution root folder.
2. Folder containing copied Xamarin.Forms source files.
3. Specific source file list for targeted migration.

Expected projects for full-solution migration:
1. Shared or .NET Standard project.
2. Android project.
3. iOS project.

Optional project:
1. UWP project.

Optional behavior flags:
1. Dry run for analysis-only mode.
2. Shell migration recommendations.
3. Incremental mode for copy-paste migration.

## Outputs

Primary outputs:
1. Converted .NET MAUI single-project structure.
2. Migration report JSON.
3. Manual fixes backlog.
4. Risk heatmap by module.
5. Platform migration checklist with unresolved items.

Secondary outputs:
1. Handler template stubs for renderer migration.
2. Dependency replacement suggestions.
3. Architecture modernization recommendations.

## Execution workflow

1. Preflight analysis
1. Detect projects, source files, XAML, resources, and packages.
2. Identify deprecated APIs, DependencyService usage, MessagingCenter usage, and custom renderers.
3. Identify platform-specific files and settings (Android manifest and permissions, iOS plist and entitlements, Windows/UWP declarations).
4. Compute migration readiness and complexity indicators.

2. Generate MAUI target skeleton
1. Create new MAUI single-project structure.
2. Create Platforms folders for Android, iOS, and Windows.
3. Create Resources folders for Images, Fonts, Styles, and Raw.
4. Generate SDK-style project file with UseMaui enabled.

3. Code and XAML transformation
1. Replace namespaces from Xamarin.Forms to Microsoft.Maui.Controls.
2. Replace Xamarin.Essentials usage with Microsoft.Maui APIs.
3. Replace Xamarin XAML schema with MAUI XAML schema.
4. Preserve business logic, view models, and services.
5. Apply safe copy-paste transforms for partial migrations without changing unaffected MAUI modules.

4. Resource and platform migration
1. Move images, fonts, and raw assets into MAUI Resources folders.
2. Move platform-specific startup and integration code into Platforms folders.
3. Preserve platform overrides and conditional behavior.
4. Re-map platform metadata and capabilities (manifest entries, plist keys, entitlements, URL schemes, background modes).

5. Dependency and API modernization
1. Classify dependencies as compatible, needs upgrade, or unsupported.
2. Provide replacement suggestions for unsupported packages.
3. Convert DependencyService patterns to DI registration in MauiProgram.
4. Flag MessagingCenter modernization paths.
5. Flag APIs requiring permission-flow or lifecycle updates on Android and iOS.

6. Renderer to handler transition
1. Detect renderer implementations.
2. Generate handler templates.
3. Mark manual native mapping steps as required follow-up tasks.

7. Validation and reporting
1. Validate generated project structure.
2. Detect residual Xamarin namespaces in transformed files.
3. Validate platform startup and configuration parity for Android, iOS, and Windows targets.
4. Produce migration report with readiness score, complexity score, estimated effort, breaking changes, and manual fixes.

## Rule examples

Namespace rules:
1. Xamarin.Forms to Microsoft.Maui.Controls.
2. Xamarin.Essentials to Microsoft.Maui.
3. Xamarin.Forms.Maps to Microsoft.Maui.Controls.Maps.

Architecture rules:
1. DependencyService to MAUI DI.
2. MessagingCenter to modern messaging patterns.
3. Renderers to handlers with manual review.

Resource rules:
1. Images to Resources/Images.
2. Fonts to Resources/Fonts.
3. Raw assets to Resources/Raw.

Platform rules:
1. Android manifest capabilities and permissions must be re-mapped to MAUI platform configuration.
2. iOS Info.plist keys, entitlements, and URL schemes must be preserved or intentionally replaced.
3. UWP-specific features must be mapped to MAUI Windows equivalents or explicitly marked unsupported.
4. Native SDK initialization hooks must be moved to MAUI lifecycle and startup points.

## Safety and constraints

1. Default strategy is always new-project migration, not in-place upgrade.
2. All renderer migrations are treated as manual-review risk areas.
3. Unsupported dependency findings are always emitted as action items.
4. Validation results must be included before migration is considered complete.
5. Platform permission and startup parity checks are mandatory in final reporting.

## Repository notes

This repository currently provides the skill definition and reference guidance. If automation scripts are added later, keep this section updated with the real file paths.

References:
1. Official guidance reference: references/official-guidance.md
2. Rule catalog: references/rule-catalog.md

Related skills:
1. ../xamarin-maui-platform-specific-migration/SKILL.md
2. ../xamarin-maui-renderer-handler-migration/SKILL.md
3. ../xamarin-maui-syncfusion-migration/SKILL.md

## Definition of done

Migration run is complete when:
1. MAUI single-project output is generated.
2. Report JSON and manual fix backlog are produced.
3. Readiness and complexity scores are calculated.
4. High-risk manual items are explicitly listed.
5. Validation checks are present for project structure and namespace residue.
6. Android, iOS, and Windows platform checks are executed or explicitly waived with rationale.
7. Permission and capability parity is verified against the original Xamarin implementation.
