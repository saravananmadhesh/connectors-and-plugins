# Barcode-Generator Migration Mapping

## Control

- Xamarin: SfBarcode
- MAUI: SfBarcodeGenerator

## Initialize control Mapping

- using Syncfusion.SfBarcode.XForms; ... SfBarcode barcode = new SfBarcode(); ... -> using Syncfusion.Maui.Barcode; ... SfBarcodeGenerator barcode = new SfBarcodeGenerator(); ...

## Initialize Symbology Mapping

- CodaBarSettings -> Codabar
- Code39Settings -> Code39
- Code39ExtendedSettings -> Code39Extended
- Code93Settings -> Code93
- Code128ASettings -> Code128A
- Code128BSettings -> Code128B
- Code128CSettings -> Code128C
- QRBarcodeSettings -> QRCode
- DataMatrixEncoding -> DataMatrix
- SfBarcode barcode = new SfBarcode(); barcode.BackgroundColor = Color.Gray; barcode.Text = " barcode.Symbology = BarcodeSymbolType.QRCode; QRBarcodeSettings settings = new QRBarcodeSettings(); settings.XDimension = 6; settings.ErrorCorrectionLevel = ErrorCorrectionLevel.High; settings.InputMode = InputMode.BinaryMode; settings.Version = QRVersion.VersionAuto; barcode.SymbologySettings = settings; this.Content = barcode; -> SfBarcodeGenerator barcode = new SfBarcodeGenerator(); barcode.Value = " barcode.BackgroundColor = Colors.Gray; barcode.ShowText = true; barcode.Symbology = new QRCode() { Module = 2, InputMode = QRInputMode.Binary, ErrorCorrectionLevel = ErrorCorrectionLevel.High, CodeVersion = QRCodeVersion.Auto, }; this.Content = barcode;

## Properties Mapping

- Text -> Value
- TextGapHeight -> TextSpacing
- DarkBarColor -> ForegroundColor
- LightBarColor -> BackgroundColor
- Version -> CodeVersion

## Barcode customization Mapping

- SfBarcode barcode = new SfBarcode(); barcode.Text = "123456789"; barcode.Symbology = BarcodeSymbolType.Code128A; barcode.TextColor = Color.Red; barcode.TextFont = Font.SystemFontOfSize(16); Typeface textStyle = Typeface.create("Times new roman",1); barcode.TextFont = textStyle**;** barcode.TextGapHeight = 25; barcode.TextLocation = BarcodeTextLocation.Bottom; barcode.TextAlignment = BarcodeTextAlignment.Center; this.Content = barcode; -> SfBarcodeGenerator barcode = new SfBarcodeGenerator(); barcode.Value = "123456789"; barcode.TextAlignment = TextAlignment.End; barcode.TextSpacing = 25; barcode.TextStyle = new BarcodeTextStyle() { FontSize = 16, TextColor = Colors.Red }; barcode.Symbology = new Code128A() { Module = 2 }; this.Content = barcode;

## Notes

- Mappings are extracted from migration guide tables.
- If a required API/event/method is not listed, add it to manual action backlog for verification.
