# Common Syncfusion Migration Summary

Source: docs/Common/migration.md

This summary captures high-value migration rules shared across Syncfusion controls.

## Core approach

- Prefer direct Xamarin-to-MAUI control mapping from the common matrix first.
- Then apply per-control migration docs for namespace, API, and behavior-level updates.
- Treat missing, upcoming, or limited features as explicit manual actions.

## Key equivalence patterns

- SfChart (Xamarin) is split in MAUI into:
  - SfCartesianChart
  - SfCircularChart
  - SfFunnelChart
  - SfPyramidChart
  - SfPolarChart
- SfDateTimeRangeNavigator maps to SfDateTimeRangeSelector.
- SfBarcode maps to SfBarcodeGenerator.
- SfNumericTextBox maps to SfNumericEntry.
- SfPopUpLayout maps to SfPopup.

## Notable replacement cases

- SfBorder is obsolete in MAUI; use MAUI Border.
- SfGradientView is obsolete in MAUI; use MAUI gradient brushes.

## Practical migration tips

- Start by inventorying all Syncfusion controls used per page/feature.
- Apply namespace migration before API rename migration.
- Validate behavior parity for chart, grid, scheduler, and editor screens first.
- Keep a backlog for each control with pending or unsupported features.
