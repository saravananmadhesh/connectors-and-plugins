# Syncfusion MAUI NuGet Package Map

Use this map to resolve MAUI package references while migrating Xamarin Syncfusion controls.

Important:
- Always include Syncfusion.Maui.Core.
- Package names can change across Syncfusion releases; verify against your target Syncfusion version.
- If a control is not listed here, infer from MAUI namespace and confirm in Syncfusion package feed.

## Required baseline package

- Syncfusion.Maui.Core

## Package mapping by control family

Charts and data visualization:
- SfCartesianChart, SfCircularChart, SfFunnelChart, SfPyramidChart, SfPolarChart, SfSunburstChart, SfTreeMap -> Syncfusion.Maui.Charts

Data controls:
- SfDataGrid, SfDataPager -> Syncfusion.Maui.DataGrid
- SfListView -> Syncfusion.Maui.ListView
- SfDataForm -> Syncfusion.Maui.DataForm
- SfKanban -> Syncfusion.Maui.Kanban

Scheduling and timeline:
- SfScheduler -> Syncfusion.Maui.Scheduler
- SfDateTimeRangeSelector -> Syncfusion.Maui.Sliders

Maps and geography:
- SfMaps -> Syncfusion.Maui.Maps

Navigation and layout:
- SfTabView -> Syncfusion.Maui.TabView
- SfNavigationDrawer -> Syncfusion.Maui.NavigationDrawer
- SfAccordion -> Verify package from control namespace and target Syncfusion version
- SfExpander -> Verify package from control namespace and target Syncfusion version
- SfBackdropPage -> Verify package from control namespace and target Syncfusion version

Inputs:
- SfAutocomplete, SfComboBox, SfMaskedEntry, SfNumericEntry, SfDatePicker, SfTimePicker, SfPicker, SfTextInputLayout -> Syncfusion.Maui.Inputs

Buttons and selection:
- SfButton, SfCheckBox, SfRadioButton, SfSwitch, SfChips, SfSegmentedControl -> Syncfusion.Maui.Buttons

Sliders and gauges:
- SfSlider, SfRangeSlider -> Syncfusion.Maui.Sliders
- SfRadialGauge, SfLinearGauge, SfDigitalGauge -> Syncfusion.Maui.Gauges

Indicators and status:
- SfLinearProgressBar, SfCircularProgressBar -> Syncfusion.Maui.ProgressBar
- SfBusyIndicator, SfShimmer, SfBadgeView -> Verify package from control namespace and target Syncfusion version
- SfStepProgressBar -> Verify package from control namespace and target Syncfusion version

Editors and dialogs:
- SfPopup -> Syncfusion.Maui.Popup
- SfRichTextEditor -> Syncfusion.Maui.RichTextEditor
- SfImageEditor -> Syncfusion.Maui.ImageEditor
- SfSignaturePad -> Syncfusion.Maui.SignaturePad

Media and utility:
- SfAvatarView -> Verify package from control namespace and target Syncfusion version
- SfBarcodeGenerator -> Syncfusion.Maui.Barcode
- SfEffectsView, SfParallaxView, SfCards, SfRotator, SfCarousel, SfChat -> Verify package from control namespace and target Syncfusion version

## Obsolete and replacement cases

- SfBorder (Xamarin) -> Use MAUI Border (no Syncfusion package required).
- SfGradientView (Xamarin) -> Use MAUI gradient brushes (no Syncfusion package required).

## Validation checklist

- Syncfusion.Maui.Core is installed.
- Each detected control has at least one mapped package reference.
- MauiProgram contains builder.ConfigureSyncfusionCore().
- Missing package mappings are reported as blockers.
