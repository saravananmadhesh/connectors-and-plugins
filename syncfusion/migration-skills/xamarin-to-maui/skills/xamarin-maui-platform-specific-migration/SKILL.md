---
name: xamarin-maui-platform-specific-migration
description: Companion migration skill for Android, iOS, and Windows platform-specific tasks when moving Xamarin.Forms code to .NET MAUI.
metadata:
  author: "Syncfusion Inc"
  version: "1.0.0"
---

# Xamarin.Forms to .NET MAUI Platform-Specific Migration Skill

## Purpose

Use this companion skill to migrate platform-specific code safely when Xamarin.Forms code is moved to a .NET MAUI app.

This skill focuses only on platform concerns:
1. Android manifest, components, and runtime permissions.
2. iOS Info.plist keys, entitlements, URL schemes, and lifecycle integrations.
3. Windows target behavior and UWP-to-Windows mapping.
4. Native SDK startup and lifecycle parity.

## Recommended skill sequence

Run skills in this order for best outcomes:
1. xamarin-maui-framework-migration
2. xamarin-maui-syncfusion-migration
3. xamarin-maui-platform-specific-migration (this skill)
4. xamarin-maui-renderer-handler-migration

Use this skill after baseline migration to close platform parity gaps before final renderer-handler cleanup.

## When to use this skill

Use this skill when one or more of the following are present:
1. Custom AndroidManifest entries, intent filters, or exported activities/services/receivers.
2. iOS App Transport Security exceptions, associated domains, push notifications, or URL schemes.
3. UWP-specific APIs or Windows declarations that require MAUI Windows mapping.
4. Native SDK initialization in AppDelegate, MainActivity, or custom startup classes.
5. Deep links, notifications, foreground services, background tasks, or lifecycle-dependent features.

Use this skill after or alongside the general migration skill.

## Do not use this skill for

1. Shared business logic only migrations with no platform code.
2. Pure XAML namespace replacement tasks.
3. Renderer-to-handler rewriting as a primary task (run specialized renderer migration separately).

## Inputs

Required input:
1. MAUI target project root.
2. Source platform files from Xamarin projects or copied snippets.

Recommended inputs:
1. AndroidManifest.xml and related Android startup classes.
2. Info.plist and entitlements files.
3. UWP project declarations and capability entries.
4. Any platform SDK initialization snippets.

Optional behavior flags:
1. Dry run (analysis and checklist only).
2. Strict parity mode (fail if any platform capability is missing).

## Outputs

Primary outputs:
1. Platform migration checklist by target platform.
2. Capability parity report (preserved, replaced, missing, unsupported).
3. Manual action backlog with severity and rationale.

Secondary outputs:
1. Suggested MAUI startup/lifecycle mapping notes.
2. Risk heatmap for platform-specific changes.
3. Validation plan for smoke test execution.

## Execution workflow

1. Platform inventory and baseline
1. Detect Android, iOS, and Windows source artifacts.
2. Extract capabilities, lifecycle hooks, URL schemes, permissions, and SDK startup points.
3. Build source-to-target capability map.

2. Android migration mapping
1. Map manifest entries to MAUI platform structure.
2. Validate runtime permission model and request flows.
3. Validate intent filters, exported settings, and package visibility declarations.

3. iOS migration mapping
1. Map Info.plist keys and ATS exceptions.
2. Map entitlements and associated domains.
3. Map lifecycle hooks and push/deep-link entry points.

4. Windows/UWP mapping
1. Identify UWP-specific APIs and declarations.
2. Map to MAUI Windows equivalents where available.
3. Mark unsupported items with replacement guidance.

5. Native SDK and lifecycle alignment
1. Relocate SDK initialization to MAUI lifecycle points.
2. Verify initialization order dependencies.
3. Flag thread/lifecycle-sensitive integrations for manual validation.

6. Validation and reporting
1. Produce platform checklist and unresolved items.
2. Validate startup, permissions, deep links, and notification entry points.
3. Emit pass/fail readiness with explicit waivers where accepted.

## Rule examples

Android rules:
1. Preserve required permissions and intent filters.
2. Validate exported component requirements.
3. Preserve package visibility queries where needed.

iOS rules:
1. Preserve required Info.plist keys and URL schemes.
2. Preserve entitlements and associated domains where feature dependent.
3. Preserve required background modes and notification capabilities.

Windows rules:
1. Map UWP declarations to MAUI Windows settings where supported.
2. Emit unsupported UWP features as manual action items.

Lifecycle rules:
1. Move native SDK startup to MAUI lifecycle hooks.
2. Maintain startup ordering for SDKs with dependency constraints.

## Safety and constraints

1. Never silently drop platform capabilities.
2. Any missing capability must be reported as a blocking or high-risk item.
3. Any unsupported platform feature must include a replacement path or waiver requirement.
4. Validation evidence is required before platform migration is considered complete.

## References

1. Platform checklist reference: references/platform-checklist.md

Related skills:
1. ../xamarin-maui-framework-migration/SKILL.md
2. ../xamarin-maui-renderer-handler-migration/SKILL.md
3. ../xamarin-maui-syncfusion-migration/SKILL.md

## Definition of done

Platform migration is complete when:
1. Platform checklist is generated for Android, iOS, and Windows scope in project.
2. Capability parity report is generated with no unresolved blockers.
3. Missing or unsupported capabilities are either fixed or explicitly waived.
4. Startup and lifecycle mapping has been validated.
5. Smoke test plan exists for all migrated platform entry points.
