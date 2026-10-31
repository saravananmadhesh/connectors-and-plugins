# Syncfusion Control Migration Coverage Index

This index is self-contained and remains valid even if the original docs folder is removed.

Use this file to:
1. Find the control-wise migration reference that includes namespace/API/event/method mapping details.
2. Confirm whether a control is covered by this skill.
3. Track split-migration and replacement cases.

## Control-wise references

| Control | Reference File |
| --- | --- |
| Accordion | references/controls/Accordion.md |
| Autocomplete | references/controls/Autocomplete.md |
| Avatar-view | references/controls/Avatar-view.md |
| Backdrop | references/controls/Backdrop.md |
| Badge-View | references/controls/Badge-View.md |
| Barcode-Generator | references/controls/Barcode-Generator.md |
| Busy-Indicator | references/controls/Busy-Indicator.md |
| Button | references/controls/Button.md |
| Calendar | references/controls/Calendar.md |
| Cards | references/controls/Cards.md |
| Carousel-View | references/controls/Carousel-View.md |
| Cartesian-Charts | references/controls/Cartesian-Charts.md |
| Chat | references/controls/Chat.md |
| CheckBox | references/controls/CheckBox.md |
| Chips | references/controls/Chips.md |
| Circular-Charts | references/controls/Circular-Charts.md |
| CircularProgressBar | references/controls/CircularProgressBar.md |
| ComboBox | references/controls/ComboBox.md |
| Common | references/controls/Common.md |
| DataForm | references/controls/DataForm.md |
| DataGrid | references/controls/DataGrid.md |
| DatePicker | references/controls/DatePicker.md |
| DateTime-Range-Selector | references/controls/DateTime-Range-Selector.md |
| DigitalGauge | references/controls/DigitalGauge.md |
| Effects-View | references/controls/Effects-View.md |
| Expander | references/controls/Expander.md |
| Funnel-Charts | references/controls/Funnel-Charts.md |
| ImageEditor | references/controls/ImageEditor.md |
| Kanban-Board | references/controls/Kanban-Board.md |
| Linear-Gauge | references/controls/Linear-Gauge.md |
| LinearProgressBar | references/controls/LinearProgressBar.md |
| ListView | references/controls/ListView.md |
| Maps | references/controls/Maps.md |
| Masked-Entry | references/controls/Masked-Entry.md |
| NavigationDrawer | references/controls/NavigationDrawer.md |
| NumericEntry | references/controls/NumericEntry.md |
| Parallax-View | references/controls/Parallax-View.md |
| Picker | references/controls/Picker.md |
| Polar-Charts | references/controls/Polar-Charts.md |
| Popup | references/controls/Popup.md |
| Pull-to-Refresh | references/controls/Pull-to-Refresh.md |
| Pyramid-Charts | references/controls/Pyramid-Charts.md |
| Radial-Gauge | references/controls/Radial-Gauge.md |
| Radial-Menu | references/controls/Radial-Menu.md |
| Radio-Button | references/controls/Radio-Button.md |
| Range-Slider | references/controls/Range-Slider.md |
| Rating | references/controls/Rating.md |
| Rich-Text-Editor | references/controls/Rich-Text-Editor.md |
| Rotator | references/controls/Rotator.md |
| Scheduler | references/controls/Scheduler.md |
| Segmented-Control | references/controls/Segmented-Control.md |
| Shimmer | references/controls/Shimmer.md |
| SignaturePad | references/controls/SignaturePad.md |
| Slider | references/controls/Slider.md |
| StepProgressBar | references/controls/StepProgressBar.md |
| SunburstChart | references/controls/SunburstChart.md |
| Switch | references/controls/Switch.md |
| TabView | references/controls/TabView.md |
| TextInputLayout | references/controls/TextInputLayout.md |
| TimePicker | references/controls/TimePicker.md |
| TreeMap | references/controls/TreeMap.md |
| TreeView | references/controls/TreeView.md |

## Canonical mapping notes

- SfChart (Xamarin) is split into MAUI chart families: SfCartesianChart, SfCircularChart, SfFunnelChart, SfPyramidChart, SfPolarChart.
- SfDateTimeRangeNavigator maps to SfDateTimeRangeSelector.
- SfPopUpLayout maps to SfPopup.
- SfNumericTextBox maps to SfNumericEntry.
- SfBarcode maps to SfBarcodeGenerator.
- SfBorder (Xamarin) is obsolete in MAUI; use MAUI Border.
- SfGradientView (Xamarin) is obsolete in MAUI; use MAUI gradients.

## Operational rule

If a Syncfusion control is not listed here, treat it as unsupported-by-default and add it to the manual action backlog with package and API verification tasks.
