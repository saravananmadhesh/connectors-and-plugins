---
name: xamarin-maui-renderer-handler-migration
description: Companion migration skill for converting Xamarin.Forms custom renderers and effects to .NET MAUI handlers.
metadata:
  author: "Syncfusion Inc"
  version: "1.0.0"
---

# Xamarin.Forms Renderer to .NET MAUI Handler Migration Skill

## Purpose

Use this companion skill to migrate Xamarin.Forms renderer-based UI customizations to .NET MAUI handler architecture with clear risk tracking and validation.

This skill focuses on:
1. Detecting custom renderers, effects, and platform-specific native view customizations.
2. Mapping renderer responsibilities to MAUI handler/property/command mappers.
3. Scaffolding handler classes and platform partial implementations.
4. Producing a manual action backlog for high-risk native mappings.

## Recommended skill sequence

Run skills in this order for best outcomes:
1. xamarin-maui-framework-migration
2. xamarin-maui-syncfusion-migration
3. xamarin-maui-platform-specific-migration
4. xamarin-maui-renderer-handler-migration (this skill)

Use this skill after baseline and platform migration so renderer conversions happen against stable project and platform wiring.

## When to use this skill

Use this skill when one or more of the following are present:
1. ExportRenderer attributes or renderer registrations.
2. Custom renderer classes extending ViewRenderer, PageRenderer, ShellRenderer, or similar.
3. Platform effect implementations for Android, iOS, or Windows/UWP.
4. Native control manipulations in OnElementChanged, OnElementPropertyChanged, or lifecycle callbacks.
5. Custom drawing, gesture, accessibility, or input handling in native renderer code.

Use this skill after baseline namespace/API migration.

## Do not use this skill for

1. Pure namespace replacement tasks.
2. Dependency-only migration with no custom UI layer.
3. Platform capability migration without renderer or effect logic.

## Inputs

Required input:
1. MAUI target project root.
2. Source renderer/effect files from Xamarin.Forms projects or copied modules.

Recommended inputs:
1. Control API surface and bindable property definitions.
2. Any existing MAUI custom control abstractions.
3. Platform-specific rendering behavior notes and screenshots.

Optional behavior flags:
1. Dry run (analysis and migration plan only).
2. Scaffold only (generate templates without wiring registration).
3. Strict mode (fail if any renderer has unresolved critical mapping items).

## Outputs

Primary outputs:
1. Renderer inventory and classification report.
2. Handler mapping plan by control/effect.
3. Generated handler scaffolds and platform partial templates.
4. Manual action backlog with severity and rationale.

Secondary outputs:
1. Suggested DI or registration updates.
2. Risk heatmap for renderer complexity and platform divergence.
3. Validation test matrix for visual and interaction parity.

## Execution workflow

1. Renderer and effect inventory
1. Detect renderer classes, effects, and registration attributes.
2. Extract touched native APIs, lifecycle hooks, and property handlers.
3. Classify migration complexity (low, medium, high, critical).

2. Mapping strategy
1. Map renderer responsibilities to handler property and command mappers.
2. Separate shared control logic from platform native logic.
3. Identify unsupported or risky native APIs requiring manual redesign.

3. Scaffold generation
1. Generate handler base class and platform partial classes.
2. Generate property mapper entries for bindable properties.
3. Generate command mapper entries where imperative actions are required.
4. Preserve comments indicating manual mapping points.

4. Registration and wiring
1. Propose handler registration in MauiProgram.
2. Ensure control type-to-handler type mappings are explicit.
3. Flag startup ordering concerns when handlers depend on native SDK initialization.

5. Validation and reporting
1. Validate build references and handler wiring completeness.
2. Validate that no renderer registrations remain active.
3. Produce migration report with unresolved manual mappings.
4. Produce test matrix for visual parity, input behavior, and accessibility.

## Rule examples

Detection rules:
1. ExportRenderer and ExportEffect attributes indicate legacy wiring.
2. Renderer lifecycle overrides indicate likely manual mapping points.

Mapping rules:
1. OnElementPropertyChanged logic maps to property mapper actions.
2. Imperative updates map to command mapper actions.
3. Native view creation logic maps to handler platform view creation paths.

Safety rules:
1. Do not remove renderer code until equivalent handler mapping exists.
2. Any unresolved native API call must be tracked as manual action.
3. Accessibility behavior parity must be explicitly validated.

## Safety and constraints

1. Default to additive migration (scaffold first, then replace wiring).
2. Any high-risk renderer must include explicit validation scenarios.
3. Effects with platform-specific side effects must be reviewed manually.
4. Migration is incomplete until renderer wiring is removed and parity checks pass.

## References

1. Handler mapping checklist: references/handler-mapping-checklist.md

Related skills:
1. ../xamarin-maui-framework-migration/SKILL.md
2. ../xamarin-maui-platform-specific-migration/SKILL.md
3. ../xamarin-maui-syncfusion-migration/SKILL.md

## Definition of done

Renderer migration is complete when:
1. All renderer and effect artifacts are inventoried and classified.
2. Handler mappings are implemented or tracked with explicit manual actions.
3. Legacy renderer registrations are removed or disabled.
4. Visual, interaction, and accessibility parity checks are documented and executed.
5. Final report includes unresolved risks, owners, and next actions.
