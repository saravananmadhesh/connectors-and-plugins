# Rich-Text-Editor Migration Mapping

## Control

- Xamarin: RichTextEditor
- MAUI: RichTextEditor

## Namespaces Mapping

- Syncfusion.RichTextEditor.XForms -> Syncfusion.Maui.RichTextEditor

## Properties Mapping

- AutoSize -> EnableAutoSize
- BackgroundColor -> EditorBackgroundColor
- DefaultFont -> DefaultFontFamily
- DefaultFontColor -> DefaultTextColor
- PlaceHolder -> Placeholder
- PlaceHolderFontColor -> PlaceholderColor
- PlaceHolderFontFamily -> PlaceholderFontFamily
- PlaceHolderFontSize -> PlaceholderFontSize
- WordWrap -> EnableWordWrap

## Events Mapping

- ImageInserted -> ImageRequested
- HyperlinkSelected -> HyperlinkClicked

## Methods Mapping

- AlignFull() -> AlignJustify()
- ApplyFont(string fontName) -> ApplyFontFamily(string fontName)
- EditHyperlink(string url, string text) -> EditHyperlink(string text, string oldUrl, string newUrl)
- InsertHyperlink(string url, string displayText) -> InsertHyperlink(string displayText, string Url)
- RemoveHyperlink() -> RemoveHyperlink(string text, string Url)
- InsertImage(ImageSource imageSource) -> InsertImage(SfRichTextEditorImageSource imageSource)
- SetFontColor(string fontColor) -> ApplyTextColor(Color textColor)
- SetFontSize(string fontSize) -> ApplyFontSize(double fontSize)
- SetHighlightColor(string color) -> ApplyHighlightColor(Color highlightColor)
- SetParagraphFormat(string heading) -> ApplyParagraphFormat(RichTextEditorParagraphFormat format)
- ToggleSubScript() -> ToggleSubscript()
- ToggleSuperScript() -> ToggleSuperscript()

## Notes

- Mappings are extracted from migration guide tables.
- If a required API/event/method is not listed, add it to manual action backlog for verification.
