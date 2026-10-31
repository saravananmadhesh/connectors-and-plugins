# Popup Migration Mapping

## Control

- Xamarin: SfPopupLayout
- MAUI: SfPopup

## Namespaces Mapping

- Syncfusion.XForms.SfPopupLayout -> Syncfusion.Maui.Popup

## Initialize Control Mapping

- public partial class MainPage : ContentPage { public MainPage() { InitializeComponent(); } private void ClickToShowPopup_Clicked(object sender, EventArgs e) { popupLayout.Show(); } } -> public partial class MainPage : ContentPage { public MainPage() { InitializeComponent(); } private void ClickToShowPopup_Clicked(object sender, EventArgs e) { popup.Show(); } }

## Classes Mapping

- SfPopupLayout -> SfPopup
- PopupView -> Nil

## Properties Mapping

- SfPopupLayout.Content -> Nil
- SfPopupLayout.PopupView -> Nil
- PopupStyle.HeaderBackgroundColor -> PopupStyle.HeaderBackground
- PopupStyle.FooterBackgroundColor -> PopupStyle.FooterBackground
- PopupStyle.AcceptButtonBackgroundColor -> PopupStyle.AcceptButtonBackground
- PopupStyle.DeclineButtonBackgroundColor -> PopupStyle.DeclineButtonBackground
- PopupStyle.BorderColor -> PopupStyle.Stroke
- PopupStyle.BorderThickness -> PopupStyle.StrokeThickness
- PopupStyle.OverlayOpacity -> PopupStyle.OverlayColor
- SfPopuplayoutResources.Title -> SfPopupResource.Title
- SfPopuplayoutResources.Popup_message -> SfPopupResource.Message
- SfPopuplayoutResources.ACCEPT -> SfPopupResource.AcceptButtonText
- SfPopuplayoutResources.DECLINE -> SfPopupResource.DeclineButtonText

## Enums Mapping

- AutoSizeMode -> PopupAutoSizeMode
- AppearanceMode -> PopupButtonAppearanceMode
- BlurIntensity -> PopupBlurIntensity
- OverlayMode -> PopupOverlayMode
- RelativePosition -> PopupRelativePosition

## Notes

- Mappings are extracted from migration guide tables.
- If a required API/event/method is not listed, add it to manual action backlog for verification.
