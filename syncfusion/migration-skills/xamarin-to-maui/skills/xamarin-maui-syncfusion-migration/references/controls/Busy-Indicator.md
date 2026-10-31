# Busy-Indicator Migration Mapping

## Control

- Xamarin: SfBusyIndicator
- MAUI: SfBusyIndicator

## Namespaces Mapping

- Syncfusion.SfBusyIndicator.XForms -> Syncfusion.Maui.Core

## Properties Mapping

- IsBusy -> IsRunning
- Duration -> DurationFactor
- ViewBoxWidth ViewBoxHeight -> SizeFactor
- TextSize -> FontSize

## Notes

- Mappings are extracted from migration guide tables.
- If a required API/event/method is not listed, add it to manual action backlog for verification.
