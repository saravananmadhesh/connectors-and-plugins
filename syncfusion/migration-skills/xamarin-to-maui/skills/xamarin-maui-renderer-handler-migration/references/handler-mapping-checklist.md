# Renderer to Handler Mapping Checklist

Use this checklist to migrate Xamarin.Forms renderers and effects to .NET MAUI handlers.

## Inventory and triage

- All renderer classes are discovered and cataloged.
- All ExportRenderer and ExportEffect usages are identified.
- Renderer complexity is rated (low, medium, high, critical).
- Native APIs and lifecycle dependencies are listed per renderer.

## Mapping plan

- Each renderer has a target handler type defined.
- Each bindable property customization maps to a property mapper action.
- Each imperative action maps to a command mapper action where appropriate.
- Native view creation logic has a MAUI handler equivalent path.
- Unsupported APIs or behavior gaps are recorded as manual actions.

## Scaffold and wiring

- Handler base class scaffold exists for each migrated control.
- Platform partial implementation exists for each required platform.
- MauiProgram registration includes control to handler mapping.
- Legacy renderer registrations are disabled once handler path is ready.

## Parity validation

Visual parity:
- Layout, sizing, colors, and typography match expected behavior.
- State transitions (enabled, disabled, focused, selected) match expected behavior.

Interaction parity:
- Gestures, touch behavior, keyboard input, and commands behave correctly.
- Event propagation and callback timing are validated.

Accessibility parity:
- Semantic properties, labels, hints, and traits are preserved.
- Screen reader focus order and announcements are validated.

Performance and stability:
- No regressions in startup time or screen rendering responsiveness.
- No new crashes in control lifecycle paths.

## Finalization

- Renderer and effect leftovers are removed or explicitly deferred.
- Manual action backlog includes owner, severity, and due date.
- Final migration report includes evidence of parity checks.
