# Calendar Migration Mapping

## Control

- Xamarin: SfCalendar
- MAUI: SfCalendar

## Namespaces Mapping

- Syncfusion.SfCalendar.XForms -> Syncfusion.Maui.Calendar

## Initialize control Mapping

- using Syncfusion.SfCalendar.XForms; ... SfCalendar calendar = new SfCalendar (); this.Content = calendar; -> using Syncfusion.Maui.Calendar; ... SfCalendar calendar = new SfCalendar(); this.Content = calendar;

## Classes Mapping

- SelectionRange -> CalendarDateRange
- MonthViewSettings -> CalendarMonthView
- YearViewSettings -> CalendarYearView
- CalendarTappedEventArgs -> CalendarTappedEventArgs
- DayCellHoldingEventArgs -> CalendarLongPressedEventArgs
- MonthChangedEventArgs -> CalendarViewChangedEventArgs
- SelectionChangedEventArgs -> CalendarSelectionChangedEventArgs
- ViewModeChangedEventArgs -> CalendarViewChangedEventArgs
- MonthLabelSettings -> Nil
- CalendarInlineEvent -> Nil
- MonthEventParameters -> Nil
- InlineEventArgs -> Nil
- InlineItemTappedEventArgs -> Nil
- InlineToggledEventArgs -> Nil
- MonthCell -> Nil
- MonthCellLoadedEventArgs -> Nil
- MonthChangingEventArgs -> Nil
- YearCell -> Nil
- YearCellLoadedEventArgs -> Nil

## Properties Mapping

- using Syncfusion.SfCalendar.XForms; ... SfCalendar calendar = new SfCalendar (); calendar.ViewMode = CalendarView.MonthView; this.Content = calendar; -> using Syncfusion.Maui.Calendar; ... SfCalendar calendar = new SfCalendar(); calendar.View = CalendarView.Month; this.Content = calendar;
- AgendaViewHeight -> Nil
- BlackoutDates -> SelectableDayPredicate
- BlackoutDatesViewMode -> Nil
- CustomDayLabels -> Nil
- DataSource -> Nil
- DisplayDate -> DisplayDate
- EnableDatesInPast -> EnablePastDates
- EnableSwiping -> EnableSwipeSelection
- FirstDayofWeek -> [FirstDayOfWeek(From MonthView)]
- HeaderHeight -> [Height(From HeaderView)]
- HeaderView -> CalendarHeaderView
- HoldCommand -> LongPressedCommand
- InlineViewMode -> Nil
- Locale -> Nil
- MaxDate -> MaximumDate
- MaximumEventIndicatorCount -> Nil
- MinDate -> MinimumDate
- MonthChangedCommand -> ViewChangedCommand
- MonthViewSettings -> MonthView
- MoveToDate -> DisplayDate
- NavigateToMonthOnInActiveDatesSelection -> Nil
- NavigationArrowThickness -> Nil
- NavigationButtonHeight -> Nil
- NavigationButtonWidth -> Nil
- NavigationDirection -> NavigationDirection
- NullableSelectedDate -> SelectedDate
- NumberOfWeeksInView -> [NumberOfVisibleWeeks(From MonthView)]
- SelectedDate -> SelectedDate
- SelectedDates -> SelectedDates
- SelectedRange -> SelectedDateRange
- SelectionChangedCommand -> SelectionChangedCommand
- SelectionMode -> SelectionMode
- ShowHeader -> Nil
- ShowInlineEvents -> Nil
- ShowLeadingAndTrailingDays -> ShowTrailingAndLeadingDates
- ShowNavigationButtons -> [ShowNavigationArrows(From HeaderView)]
- ShowYearView -> AllowViewNavigation
- TapCommand -> TappedCommand
- ToggleDaySelection -> CanToggleDaySelection
- TransitionMode -> Nil
- ViewMode -> View
- VisibleDates -> Nil
- YearViewMode -> Nil
- YearViewSettings -> YearView
- using Syncfusion.SfCalendar.XForms; ... SfCalendar calendar = new SfCalendar (); calendar.MonthViewSettings.SelectionShape = SelectionShape.Circle; this.Content = calendar; -> using Syncfusion.Maui.Calendar; ... SfCalendar calendar = new SfCalendar(); calendar.MonthView.NumberOfVisibleWeeks = 6; this.Content = calendar;
- AgendaSelectedDateColor -> Nil
- BlackoutColor -> DisabledDatesTextStyle
- BorderColor -> Nil
- CellGridOptions -> Nil
- CellTemplate -> CellTemplate
- CurrentMonthBackgroundColor -> Background
- CurrentMonthTextColor -> [TextColor(From TextStyle of MonthView)]
- DateSelectionColor -> SelectionBackground
- DateTextAlignment -> Nil
- DayCellFont -> Nil
- DayCellFontFamily -> [FontFamily(From TextStyle, TodayTextStyle, TrailingLeadingDatesTextStyle, DisabledDatesTextStyle, WeekendDatesTextStyle, SpecialDatesTextStyle of MonthView)]
- DayFontSize -> [FontSize(From TextStyle, TodayTextStyle, TrailingLeadingDatesTextStyle, DisabledDatesTextStyle, WeekendDatesTextStyle, SpecialDatesTextStyle of MonthView)]
- DayFontAttributes -> [FontAttributes(From TextStyle, TodayTextStyle, TrailingLeadingDatesTextStyle, DisabledDatesTextStyle, WeekendDatesTextStyle, SpecialDatesTextStyle of MonthView)]
- DayHeaderBackgroundColor -> [Background(From HeaderView of MonthView)]
- DayHeaderFont -> Nil
- DayHeaderFontAttributes -> [FontAttributes(From TextStyle of HeaderView in MonthView)]
- DayHeaderFontFamily -> FontFamily(From TextStyle of HeaderView in MonthView)
- DayHeaderFontSize -> [FontSize(From TextStyle of HeaderView in MonthView)]
- DayHeaderTextColor -> [TextColor(From TextStyle of HeaderView in MonthView)]
- DayHeaderFormat -> [TextFormat(From HeaderView of MonthView)]
- DayHeight -> [Height(From HeaderView of MonthView)]
- DayLabelTextAlignment -> Nil
- DisabledBackgroundColor -> DisabledDatesBackground
- DisabledTextColor -> [TextColor(From DisabledDatesTextStyle of MonthView)]
- HeaderBackgroundColor -> [Background(From HeaderView of SfCalendar)]
- HeaderFont -> Nil
- HeaderFontAttributes -> [FontAttributes(From TextStyle of HeaderView in SfCalendar)]
- HeaderFontFamily -> [FontFamily(From TextStyle of HeaderView in SfCalendar)]
- HeaderFontSize -> [FontSize(From TextStyle of HeaderView in SfCalendar)]
- HeaderTextColor -> [TextColor(From TextStyle of HeaderView in SfCalendar)]
- InlineBackgroundColor -> Nil
- InlineItemTemplate -> Nil
- InlineTextColor -> Nil
- MonthLabelSettings -> Nil
- PreviousMonthBackgroundColor -> YearTrailingLeadingDatesBackgroundView
- PreviousMonthTextColor -> TextColor(From TrailingLeadingDatesTextStyle)
- SelectedDayTextColor -> [TextColor(From SelectionTextStyle and RangeTextStyle)]
- SelectionRadius -> Nil
- SelectionShape -> [SelectionShape(From SfCalendar)]
- TodayBorderColor -> [TodayHighlightBrush(From SfCalendar)]
- TodaySelectionBackgroundColor -> [SelectionBackground(From SfCalendar)]
- TodaySelectionTextColor -> [TextColor(From SelectionTextStyle and RangeTextStyle)]
- TodayTextColor -> TextColor(From TodayTextStyle)]
- WeekDayBackgroundColor -> Background, TodayBackground, TrailingLeadingDatesBackground, DisabledDatesBackground, SpecialDatesBackground
- WeekDayTextColor -> [TextColor(From TextStyle, TodayTextStyle, TrailingLeadingDatesTextStyle, DisabledDatesTextStyle, SpecialDatesTextStyle)]
- WeekEndBackgroundColor -> WeekendDatesBackground
- WeekEndTextColor -> [TextColor(From WeekendDatesTextStyle)]
- using Syncfusion.SfCalendar.XForms; ... SfCalendar calendar = new SfCalendar (); calendar.YearViewSettings.HeaderBackground = Colors.Red; this.Content = calendar; -> using Syncfusion.Maui.Calendar; ... SfCalendar calendar = new SfCalendar(); calendar.YearView.Background = Colors.Red; this.Content = calendar;
- LayoutBackground -> Background
- LabelAlignment -> Nil
- MonthHeaderBackground -> Nil
- MonthHeaderTextColor -> Nil
- DateTextColor -> [TextColor(From TextStyle, TodayTextStyle, LeadingDatesTextStyle, DisabledDatesTextStyle)]
- HeaderBackground -> [Background(From HeaderView of SfCalendar)]
- MonthLayoutBackground -> Background
- YearHeaderTextColor -> [TextStyle(From HeaderView of SfCalendar)]

## Enums Mapping

- BlackoutDatesViewMode -> Nil
- CellGridOptions -> Nil
- DateTextAlignment -> Nil
- DayLabelTextAlignment -> Nil
- InlineViewMode -> Nil
- LabelAlignment -> Nil
- NavigationDirection -> CalendarNavigationDirection
- SelectionMode -> CalendarSelectionMode
- SelectionShape -> CalendarSelectionShape
- TransitionMode -> Nil
- ViewMode -> CalendarView
- YearViewMode -> Nil

## Events Mapping

- InlineItemTapped -> Nil
- InlineToggled -> Nil
- MonthChanged -> ViewChanged
- MonthChanging -> Nil
- OnCalendarTapped -> Tapped
- OnDateCellHolding -> LongPressed
- OnHeaderLoaded -> Nil
- OnInlineLoaded -> Nil
- OnMonthCellLoaded -> Nil
- OnViewModeChanged -> ViewChanged
- OnYearCellLoaded -> Nil
- SelectionChanged -> SelectionChanged

## Methods Mapping

- AddDatesInPast -> EnablePastDates
- Backward -> Backward
- ClearSelection -> Nil
- CollapseInlineView -> Nil
- ExpandInlineView -> Nil
- Forward -> Forward
- NavigateTo -> Nil
- Refresh -> Nil
- ResumeAppointmentUpdate -> Nil
- SuspendAppointmentUpdate -> Nil

## Notes

- Mappings are extracted from migration guide tables.
- If a required API/event/method is not listed, add it to manual action backlog for verification.
