# DataForm Migration Mapping

## Control

- Xamarin: SfDataForm
- MAUI: SfDataForm

## Namespaces Mapping

- Syncfusion.SfDataForm.XForms -> Syncfusion.Maui.DataForm

## Initialize control Mapping

- using Syncfusion.XForms.DataForm; ... SfDataForm dataForm = new SfDataForm(); this.Content = dataForm; -> using Syncfusion.Maui.DataForm; … SfDataForm dataForm = new SfDataForm(); this.Content = dataForm;

## Classes Mapping

- AutoCompleteMode -> DataFormTextSearchMode
- AutoGeneratingDataFormItemEventArgs -> GenerateDataFormItemEventArgs
- CommitMode -> DataFormCommitMode
- ConverterAttribute -> DataFormValueConverterAttribute
- DataFormAutoCompleteItem -> DataFormAutoCompleteItem
- DataFormCheckBoxItem -> DataFormCheckBoxItem
- DataFormDateItem -> DataFormDateItem
- DataFormDropDownItem -> DataFormComboBoxItem
- DataFormGroupItem -> DataFormGroupItem
- DataFormItem -> DataFormItem
- DataFormItemBase -> DataFormViewItem
- DataFormPickerItem -> DataFormPickerItem
- DataFormRadioGroupItem -> DataFormRadioGroupItem
- DataFormTextItem -> DataFormTextItem
- DataFormNumericItem -> DataFormNumericItem
- DataFormMaskedEditTextItem -> DataFormMaskedTextItem
- DataFormTimeItem -> DataFormTimeItem
- DateRangeAttribute -> DataFormDateRangeAttribute
- DisplayOptionsAttribute -> DataFormDisplayOptionsAttribute
- LabelPosition -> DataFormLabelPosition
- SfDataForm -> SfDataForm
- SourceProvider -> IDataFormSourceProvider
- LabelStyle -> DataFormTextStyle
- ValidatingEventArgs -> DataFormValidateFormEventArgs
- ValidationMode -> DataFormValidationMode
- TextInputLayoutSettings -> TextInputLayoutSettings

## Properties Mapping

- DataObject -> DataObject
- IsReadOnly -> IsReadOnly
- CommitMode -> CommitMode
- ValidationMode -> ValidationMode
- Items -> Items
- ColumnCount -> ColumnCount
- SourceProvider -> ItemsSourceProvider
- AutoGenerateItems -> AutoGenerateItems
- ItemManager -> ItemManager
- Nil -> EditorTextStyle
- Nil -> LabelTextStyle
- Nil -> ErrorLabelTextStyle
- Nil -> ValidMessageLabelTextStyle
- Nil -> DefaultLayoutSettings
- LayoutOptions -> LayoutType
- Nil -> TextInputLayoutSettings
- Nil -> TextColor
- FontSize -> FontSize
- FontFamily -> FontFamily
- FontAttributes -> FontAttributes
- RowSpan -> RowSpan
- ColumnSpan -> ColumnSpan
- IsVisible -> IsVisible
- Nil -> RowOrder
- Nil -> Padding
- GroupName -> GroupName
- Name -> FieldName
- LabelText -> LabelText
- PlaceHolderText -> PlaceholderText
- Nil -> PlaceholderColor
- ShowLabel -> ShowLabel
- EditorFontSize -> EditorTextStyle
- ErrorMessageColor -> ErrorLabelTextStyle
- ValidationLabelStyle -> ValidMessageLabelTextStyle
- Nil -> Background
- Nil -> ItemsOrderInRow
- ImageSource -> LeadingView
- IsValid -> IsValid
- PropertyInfo -> PropertyInfo
- TextInputLayoutSettings -> TextInputLayoutSettings
- Nil -> ShowLeadingView
- Nil -> LeadingViewPosition
- Nil -> TrailingView
- Nil -> TrailingViewPosition
- Nil -> ShowTrailingView
- Height -> EditorHeight
- LabelPosition -> LabelPosition
- LabelWidth -> LabelWidth
- EditorWidth -> EditorWidth
- ContainerType -> ContainerType
- OutlineCornerRadius -> OutlineCornerRadius
- Nil -> EnableFloating
- Nil -> IsHintAlwaysFloated
- Nil -> EnableHintAnimation
- Nil -> HelperTextStyle
- Nil -> Stroke
- Nil -> FocussedStrokeThickness
- Nil -> UnfocussedStrokeThickness
- ShowHelperText -> ShowHelperText
- Nil -> FocusedStroke
- DataFormItems -> Items
- IsExpanded -> IsExpanded
- AllowExpandCollapse -> AllowExpandCollapse
- Nil -> HeaderTextStyle
- Nil -> HeaderBackground
- Nil -> ItemsPadding
- GroupName -> Name
- EnablePasswordVisibilityToggle -> EnablePasswordVisibilityToggle
- CheckedColor -> Color
- Nil -> OnColor
- Nil -> ThumbColor
- KeyBoard -> Keyboard
- AllowNull -> AllowNull
- FormatString -> CustomFormat
- Maximum -> Maximum
- Minimum -> Minimum
- CultureInfo -> Culture
- Mask -> Mask
- MaskType -> MaskType
- PromptChar -> PromptChar
- ValueMaskFormat -> ValueMaskFormat
- Format -> Format
- MaximumDate -> MaximumDisplayDate
- MinimumDate -> MinimumDisplayDate
- ItemsSource -> ItemsSource
- DisplayMemberPath -> DisplayMemberPath
- ValueMemberPath -> SelectedValuePath
- Nil -> IsEditable
- Nil -> TextSearchMode
- AutoCompleteMode -> TextSearchMode
- ValidMessage -> ValidMessage
- MinDay -> MinimumDate
- MaxDay -> MaximumDate
- MinMonth -> Nil
- MaxMonth -> Nil
- MinYear -> Nil
- MaxYear -> Nil
- Nil -> DisplayFormat
- ConverterType -> ConverterType

## Enums Mapping

- CommitMode -> DataFormCommitMode
- LabelPosition -> DataFormLabelPosition
- SuggestionMode -> DataFormTextSearchMode
- ValidationMode -> DataFormValidationMode
- LayoutType -> DataFormLayoutType
- ContainerType -> TextInputLayoutContainerType
- ViewPosition -> TextInputLayoutViewPosition
- MaskType -> MaskedEditorMaskType
- MaskFormat -> MaskedEditorMaskFormat
- Nil -> MaskedEditorClearButtonVisibility
- SpinButtonAlignment -> NumericEditorUpDownPlacementMode

## Events Mapping

- AutoGeneratingDataFormItem -> GenerateDataFormItem
- Validating -> ValidateProperty
- ValidationCompleted -> ValidateForm

## Methods Mapping

- RegisterEditor -> RegisterEditor
- Validate.html) -> Validate
- Commit.html) -> Commit
- UpdateEditor -> UpdateEditor

## Notes

- Mappings are extracted from migration guide tables.
- If a required API/event/method is not listed, add it to manual action backlog for verification.
