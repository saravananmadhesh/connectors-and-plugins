# Scheduler Migration Mapping

## Control

- Xamarin: SfSchedule
- MAUI: SfScheduler

## Namespaces Mapping

- Syncfusion.SfSchedule.XForms -> Syncfusion.Maui.Scheduler

## Initialize control Mapping

- using Syncfusion.SfSchedule.XForms; ... SfSchedule schedule = new SfSchedule (); this.Content = schedule; -> using Syncfusion.Maui.Scheduler; … SfScheduler scheduler = new SfScheduler(); this.Content = scheduler;

## Classes Mapping

- AppointmentStyle -> SchedulerTextStyle
- CellStyle -> SchedulerMonthCellStyle
- CellTappedEventArgs -> SchedulerTappedEventArgs
- DaysViewSettings -> SchedulerDaysView
- HeaderStyle -> SchedulerHeaderView
- MonthViewCellStyle -> SchedulerMonthCellStyle
- MonthViewSettings -> SchedulerMonthView
- NonAccessibleBlock -> SchedulerTimeRegion
- RecurrenceProperties -> SchedulerRecurrenceInfo
- ScheduleAppointment -> SchedulerAppointment
- ScheduleAppointmentMapping -> SchedulerAppointmentMapping
- ScheduleHelper -> SchedulerRecurrenceManager
- TimelineViewSettings -> SchedulerTimelineView
- TimeRegionSettings -> SchedulerTimeRegion
- ViewHeaderStyle -> ViewHeaderSettings
- ViewHeaderTappedEventArgs -> SchedulerTappedEventArgs
- VisibleDatesChangedEventArgs -> SchedulerViewChangedEventArgs
- WeekLabelSettings -> SchedulerDaysView
- WeekNumberStyle -> SchedulerWeekNumberStyle
- WeekViewSettings -> SchedulerDaysView
- WorkWeekLabelSettings -> SchedulerDaysView
- WorkWeekViewSettings -> SchedulerDaysView
- DayLabelSettings -> SchedulerDaysView
- MonthLabelSettings -> SchedulerMonthView
- TimelineLabelSettings -> SchedulerTimelineView
- AppointmentLoadedEventArgs -> AppointmentTemplate' (From DaysView, TimelineView, and MonthView)
- MonthInlineAppointmentLoadedEventArgs -> AppointmentTemplate' (From MonthView)
- MonthInlineAppointmentTappedEventArgs -> SchedulerTappedEventArgs
- MonthInlineLoadedEventArgs -> AppointmentTemplate' (From MonthView)
- MonthCellLoadedEventArgs -> CellTemplate
- MonthInlineViewStyle -> SchedulerAgendaView
- AgendaViewStyle -> SchedulerAgendaView
- SelectionStyle -> Nil
- DragDropSettings -> DragDropSettings

## Properties Mapping

- SfSchedule schedule = new SfSchedule(); schedule.ScheduleView = ScheduleView.DayView; schedule.FirstDayOfWeek = 3; this.Content = schedule; -> SfScheduler scheduler = new SfScheduler(); scheduler.View = ScheduleView.Week; scheduler.FirstDayOfWeek = DayOfWeek.Tuesday; this.Content = scheduler;
- AppointmentMapping -> AppointmentMapping
- AppointmentStyle -> AppointmentTextStyle
- AppointmentTemplate -> AppointmentTemplate' (From DaysView, TimelineView, and MonthView)
- DataSource -> AppointmentsSource
- DayViewSettings' , 'WeekViewSettings' , 'WorkWeekViewSettings -> DaysView
- MonthViewSettings -> MonthView
- TimelineViewSettings -> TimelineView
- FirstDayOfWeek -> FirstDayOfWeek
- HeaderStyle -> HeaderVIew
- HeaderHeight -> Height' (From HeaderView)
- Locale -> Application culture can be changed by setting CurrentUICulture. in App.xaml.cs file.
- MaxDisplayDate -> MaximumDateTime
- MinDisplayDate -> MinimumDateTime
- MonthCellStyle -> CellStyle' (From MonthView)
- MoveToDate -> DisplayDate
- ScheduleHeaderDateFormat -> TextFormat' (From HeaderView)
- ScheduleView -> View
- SelectedDate -> SelectedDate
- ShowCurrentTimeIndicator -> ShowCurrentTimeIndicator' (From DaysView ,TimelineView)
- SpecialTimeRegions -> TimeRegions' (From DaysView ,TimelineView)
- TimeInterval -> TimeInterval' (From DaysView ,TimelineView)
- TimeIntervalHeight -> TimeIntervalHeight' (From DaysView), 'TimeIntervalWidth' (From TimelineView)
- TimeZone -> TimeZone
- ViewHeaderHeight -> Height' (ViewHeaderSettings from DaysView, MonthView, TimelineView)
- ViewHeaderStyle -> DateTextStyle' , 'DayTextStyle' (From ViewHeaderSettings of DaysView, MonthView, TimelineView)
- AppointmentViewLayout -> AppointmentTemplate' (From DaysView, TimelineView, and MonthView)
- VerticalLineColor -> CellBorderBrush
- SelectionView -> CellBorderBrush
- SelectionStyle -> CellBorderBrush
- ShowAppointmentsInline -> You can use 'AgendaView' instead of InlineView in the scheduler.
- MonthCellViewLayout -> CellTemplate
- InlineView -> AgendaView
- EnableNavigation -> Nil
- TimeSlotBorderStrokeWidth -> Nil
- VerticalLineStrokeWidth -> Nil
- Nil -> CalendarType
- AllowAppointmentDrag -> AllowAppointmentDrag
- DragDropSettings -> DragDropSettings
- // Creating an instance for the schedule resource collection. ObservableCollection resources = new ObservableCollection(); // Adding the schedule resource in the schedule resource collection. resources.Add(new ScheduleResource() { Name = "Brooklyn", Id = 5601, Color = Color.FromHex("#FF3399") }); // Adding the schedule resource collection to the schedule resources of the SfSchedule. schedule.ScheduleResources = resources; //Creating an instance for the schedule appointment collection. ScheduleAppointmentCollection scheduleAppointmentCollection = new ScheduleAppointmentCollection(); //Adding schedule appointment in the schedule appointment collection. scheduleAppointmentCollection.Add(new ScheduleAppointment() { StartTime = new DateTime(2019, 05, 08, 10, 0, 0), EndTime = new DateTime(2019, 05, 08, 12, 0, 0), Subject = "Meeting", Location = "Hutchison road", ResourceIds = new ObservableCollection { 5601} }); //Adding the schedule appointment collection to the DataSource of the SfSchedule. schedule.DataSource = scheduleAppointmentCollection; -> public ObservableCollection Appointments { get; set; } SfScheduler scheduler = new SfScheduler(); //Creating an instance for the scheduler appointment collection. this.Appointments = new ObservableCollection(); //Adding scheduler appointment in the schedule appointment collection. Appointments.Add(new SchedulerAppointment() { StartTime = DateTime.Today.AddHours(9), EndTime = DateTime.Today.AddHours(11), Subject = "Client Meeting", Background = Brush.LightSkyBlue, }); //Adding the scheduler appointment collection to the AppointmentsSource of the .NET MAUI Scheduler. scheduler.AppointmentsSource = Appointments; this.Content = scheduler; //Adding schedule resource in the scheduler resource collection. var Resources = new ObservableCollection() { new SchedulerResource() { Name = "Sophia", Foreground = Colors.Blue, Background = Colors.Green, Id = "1000" }, new SchedulerResource() { Name = "Zoey Addison", Foreground = Colors.Blue, Background = Colors.Green, Id = "1001" }, new SchedulerResource() { Name = "James William", Foreground = Colors.Blue, Background = Colors.Green, Id = "1002" }, }; //Adding the scheduler resource collection to the schedule resources of the SfSchedule. this.Scheduler.ResourceView.Resources = Resources;
- /// /// Represents custom data properties. /// public class Event { public string EventName { get; set; } public DateTime From { get; set; } public DateTime To { get; set; } public Color Color { get; set; } public ObservableCollection Resources { get; set; } } //Creating an instance for a custom appointment class. Meeting meeting = new Meeting(); meeting.From = new DateTime(2017, 06, 11, 10, 0, 0); meeting.To = meeting.From.AddHours(2); meeting.EventName = "Client Meeting"; meeting.Color = Color.Green; //Setting resources for an event. meeting.Resources = new ObservableCollection () {5601, 5604}; /// /// Represents custom data properties. /// public class Employee { public string Name { get; set; } public object Id { get; set; } public Color Color { get; set; } public string DisplayPicture { get; set; } } //Creating an instance for the resource mapping. ResourceMapping resourceMapping = new ResourceMapping(); //Mapping the custom data fields. resourceMapping.Name = "Name"; resourceMapping.Id = "Id"; resourceMapping.Color = "Color"; resourceMapping.Image = "DisplayPicture"; schedule.ResourceMapping = resourceMapping; public ObservableCollection Employees { get; set; } //Creating an instance for the collection of custom resources. Employees = new ObservableCollection(); //Creating an instance for a custom appointment class. Employee employee = new Employee(); employee.Name = "Kinsley Elena"; employee.Id = 5601; employee.Color = Color.FromHex("#FFE671B8"); employee.DisplayPicture = "KinsleyElena.png"; //Adding a custom resource in the custom resource collection. Employees.Add(employee); //Adding a custom resource collection to the schedule resources. schedule.ScheduleResources = Employees; -> /// /// Represents custom data properties. /// public class Event { public string EventName { get; set; } public DateTime From { get; set; } public DateTime To { get; set; } public Color Color { get; set; } public ObservableCollection Resources { get; set; } } Meeting meeting = new Meeting(); meeting.From = new DateTime(2020, 07, 01, 10, 0, 0); meeting.To = meeting.From.AddHours(1); meeting.EventName = "Meeting"; meeting.Resources = new ObservableCollection { "1000" }; var Meetings = new ObservableCollection(); Meetings.Add(meeting); this.Scheduler.AppointmentsSource = Meetings; /// /// Represents custom data properties. /// public class Employee { public string Name { get; set; } public object Id { get; set; } public Brush Background { get; set; } public Brush Foreground { get; set; } } SchedulerResourceMapping resourceMapping = new SchedulerResourceMapping(); resourceMapping.Name = "Name"; resourceMapping.Id = "Id"; resourceMapping.Background = "BackgroundColor"; resourceMapping.Foreground = "ForegroundColor"; this.Scheduler.ResourceView.Mapping = resourceMapping; var Resources = new ObservableCollection() { new Employee () {Name = "Sophia", Background=Colors.Blue, Id = "1000", Foreground = Colors.Green}, }; //Adding the scheduler resource collection to the schedule resources of the SfSchedule. this.Scheduler.ResourceView.Resources = Resources;
- StartTime -> StartTime
- EndTime -> EndTime
- ActualStartTime -> ActualStartTime
- ActualEndTime -> ActualEndTime
- Subject -> Subject
- StartTimeZone -> StartTimeZone
- EndTimeZone -> EndTimeZone
- TextColor -> TextColor
- Color -> Background
- IsAllDay -> IsAllDay
- RecurrenceExceptionDates -> RecurrenceExceptionDates
- RecurrenceId -> RecurrenceId
- RecurrenceRule -> RecurrenceRule
- Id -> Id
- Notes -> Notes
- Location -> Location
- MinHeight -> MinimumAppointmentDuration' (From DaysView, TimelineView)
- ExceptionOccurrenceActualDate -> RecurrenceId
- ResourceIds -> ResourceIds
- StartTimeMapping -> StartTime
- EndTimeMapping -> EndTime
- SubjectMapping -> Subject
- StartTimeZoneMapping -> StartTimeZone
- EndTimeZoneMapping -> EndTimeZone
- ColorMapping -> Background
- IsAllDayMapping -> IsAllDay
- RecurrenceRuleMapping -> RecurrenceRule
- RecurrenceExceptionDatesMapping -> RecurrenceExceptionDates
- RecurrenceIdMapping -> RecurrenceId
- IdMapping -> Id
- NotesMapping -> Notes
- LocationMapping -> Location
- MinHeightMapping -> MinimumAppointmentDuration' (From DaysView, TimelineView)
- ExceptionOccurrenceActualDateMapping -> RecurrenceId
- ResourceIdsMapping -> ResourceIdsMapping' (From DaysView, TimelineView)
- TextColorMapping -> TextColorMapping
- SfSchedule schedule = new SfSchedule(); schedule.ScheduleView = ScheduleView.MonthView; schedule.MonthViewSettings.ShowWeekNumber = false; schedule.MonthViewSettings.AppointmentDisplayMode = AppointmentDisplayMode.Appointment; this.Content = schedule; -> SfScheduler scheduler = new SfScheduler(); scheduler.View = SchedulerView.Month: scheduler.ShowWeekNumber = true; scheduler.MonthView.AppointmentDisplayMode = SchedulerMonthAppointmentDisplayMode.Indicator; this.Content = scheduler;
- AppointmentDisplayMode -> AppointmentDisplayMode
- BlackoutDates -> SelectableDayPredicate' (From Scheduler)
- ShowWeekNumber -> ShowWeekNumber' (From Scheduler)
- WeekNumberStyle -> WeekNumberStyle' (From Scheduler)
- TodayBackground -> TodayHighlightBrush' (From Scheduler)
- MonthCellTemplate -> CellTemplate
- AgendaViewStyle -> AgendaView
- AgendaItemTemplate -> AgendaView
- ShowAgendaView -> You can use 'AgendaView' instead of agenda view in the month view of the scheduler.
- SelectionTextColor -> AppointmentTextStyle
- AppointmentIndicatorCount -> Nil
- AgendaViewHeight -> AgendaView
- AppointmentDisplayCount -> Nil
- DateFormat -> DateFormat' (From ViewHeaderSettings of MonthView class)
- DayFormat -> DayFormat' (From ViewHeaderSettings of MonthView class)
- SfSchedule schedule = new SfSchedule(); schedule.Scheduleview = ScheduleView.DayView; schedule.ShowCurrentTimeIndicator = false; schedule.DayViewSettings.StartHour = 9; schedule.DayViewSettings.EndHour = 16; this.Content = schedule; -> SfScheduler scheduler = new SfScheduler(); scheduler.View = SchedulerView.Day; scheduler.DaysView.StartHour = 9; scheduler.DaysView.EndHour = 16; scheduler.DaysView.ShowCurrentTimeIndicator = false; this.Content = scheduler;
- TimeRulerSize -> TimeRulerWidth
- NonAccessibleBlocks -> TimeRegions
- StartHour -> StartHour
- EndHour -> EndHour
- WorkStartHour -> TimeRegions' (From DaysView ,TimelineView)
- WorkEndHour -> TimeRegions' (From DaysView ,TimelineView)
- TimeSlotBorderColor -> CellBorderBrush
- TimeSlotColor -> TimeRegions
- NonWorkingHoursTimeSlotBorderColor -> TimeRegions
- NonWorkingHoursTimeSlotColor -> TimeRegions
- ShowAllDay -> Nil
- Nil -> NumberOfVisibleDays
- TimeLabelSize -> TimeRulerWidth' (From TimeRulerTextStyle of DayView class)
- TimeLabelColor -> TextColor' (From TimeRulerTextStyle of DayView class)
- TimeFormat -> TimeFormat
- DateFormat -> DateFormat' (From ViewHeaderSettings of DayView class)
- DayFormat -> DayFormat' (From ViewHeaderSettings of DayView class)
- SfSchedule schedule = new SfSchedule(); schedule.SchedulerView = SchedulerView.TimelineView; schedule.ShowCurrentTimeIndicator = false; schedule.TimelineViewSettings.StartHour = 09; schedule.TimelineViewSettings.EndHour = 13; this.Content = schedule; -> SfScheduler scheduler = new SfScheduler(); scheduler.View = SchedulerView.TimelineWeek; scheduler.TimelineView.StartHour = 9; scheduler.TimelineView.EndHour = 16; scheduler.TimelineView.ShowCurrentTimeIndicator = false; this.Content = scheduler;
- LabelSettings -> TimeRulerTextStyle
- NonWorkingsDays -> NonWorkingDays
- TimeRulerSize -> TimeRulerHeight
- BorderColor -> CellBorderBrush' (From Scheduler)
- Color -> TimeRegions' (From DaysView ,TimelineView)
- AppointmentHeight -> MinimumAppointmentDuration
- BorderWidth -> Nil
- DaysCount -> NumberOfVisibleDays
- TimeLabelSize -> FontSize' (From TimeRulerTextStyle of TimelineView class)
- TimeLabelColor -> TextColor' (From TimeRulerTextStyle of TimelineView class)
- DateFormat -> DateFormat' (From ViewHeaderSettings of TimelineView class)
- SfSchedule schedule = new SfSchedule(); ObservableCollection specialTimeRegions = new ObservableCollection(); TimeRegionSettings timeRegionSettings = new TimeRegionSettings(); timeRegionSettings.StartHour = 12; timeRegionSettings.EndHour = 13; timeRegionSettings.Text = "Lunch"; timeRegionSettings.Color = Color.FromHex("#EAEAEA"); timeRegionSettings.TextColor = Color.Black; timeRegionSettings.CanEdit = false; specialTimeRegions.Add(timeRegionSettings); schedule.SpecialTimeRegions = specialTimeRegions; this.Content = schedule; -> public DateTime StartTime { get; set; } = DateTime.Now.Date.AddHours(13); public DateTime EndTime { get; set; } = DateTime.Now.Date.AddHours(14); SfScheduler scheduler = new SfScheduler(); scheduler.View = SchedulerView.Week; scheduler.DaysView.TimeRegions = this.GetTimeRegion(); private ObservableCollection GetTimeRegion() { var timeRegions = new ObservableCollection(); var timeRegion = new SchedulerTimeRegion() { StartTime = DateTime.Today.Date.AddHours(13), EndTime = DateTime.Today.Date.AddHours(14), Text = "Lunch", EnablePointerInteraction = false, }; timeRegions.Add(timeRegion); return timeRegions; } this.Content = scheduler;
- StartHour -> StartTime
- EndHour -> EndTime
- TextColor -> TextColor' (From TextStyle)
- Text -> Text
- CanEdit -> EnablePointerInteraction
- SfSchedule schedule = new SfSchedule(); HeaderStyle headerStyle = new HeaderStyle(); headerStyle.BackgroundColor = Color.FromRgb(250, 219, 216); headerStyle.FontSize = "20"; headerStyle.TextColor=Color.Blue; schedule.HeaderStyle = headerStyle; this.Content = schedule; -> SfScheduler scheduler = new SfScheduler(); var textStyle = new SchedulerTextStyle() { TextColor = Colors.DarkBlue, FontSize = 14, }; scheduler.HeaderView.TextStyle = textStyle; scheduler.HeaderView.Background = Brush.LightGreen; this.Content = scheduler;
- BackgroundColor -> Background
- FontFamily -> FontFamily
- FontSize -> FontSize
- FontAttributes -> FontAttributes
- SfSchedule schedule = new SfSchedule(); // Customize the schedule view header ViewHeaderStyle viewHeaderStyle = new ViewHeaderStyle(); viewHeaderStyle.BackgroundColor = Color.FromHex("#009688"); viewHeaderStyle.DayTextColor = Color.FromHex("#FFFFFF"); viewHeaderStyle.DateTextColor = Color.FromHex("#FFFFFF"); viewHeaderStyle.DayFontFamily = "Arial"; viewHeaderStyle.DateFontFamily = "Arial"; schedule.ViewHeaderStyle = viewHeaderStyle; this.Content = schedule; -> SfScheduler scheduler = new SfScheduler(); var dateTextStyle = new SchedulerTextStyle() { TextColor = Colors.Red, FontFamily = "Arial", }; scheduler.DaysView.ViewHeaderSettings.DateTextStyle = dateTextStyle; var dayTextStyle = new SchedulerTextStyle() { TextColor = Colors.Red, FontFamily = "Arial", }; scheduler.DaysView.ViewHeaderSettings.DayTextStyle = dayTextStyle; scheduler.DaysView.ViewHeaderSettings.Background = Brush.LightGreen; this.Content = scheduler;
- CurrentDayTextColor' , 'CurrentDateTextColor -> TextColor' (From TodayTextStyle of Scheduler)
- DayTextColor -> TextColor' (From DayTextStyle)
- DateTextColor -> TextColor' (From DateTextStyle)
- DayFontFamily -> FontFamily' (From DayTextStyle)
- DateFontFamily -> FontFamily' (From DateTextStyle)
- DayFontSize -> FontSize' (From DayTextStyle)
- DateFontSize -> FontSize' (From DateTextStyle)
- DayFontAttributes -> FontAttributes' (From DayTextStyle)
- DateFontAttributes -> FontAttributes' (From DateTextStyle)
- public ScheduleAppointmentCollection Appointments { get; set; } SfSchedule schedule = new SfSchedule(); this.Appointments = new ScheduleAppointmentCollection(); this.Appointments.Add(new ScheduleAppointment() { Subject = "Planning", StartTime = DateTime.Now.AddHours(1), EndTime = DateTime.Now.AddHours(2), }); schedule.DataSource = this.Appointments; // Creating Appointment style AppointmentStyle appointmentStyle = new AppointmentStyle(); appointmentStyle.TextColor = Color.Red; appointmentStyle.FontSize = 25; appointmentStyle.FontAttributes = FontAttributes.Bold; appointmentStyle.FontFamily = "Arial"; // Setting Appointment Style schedule.AppointmentStyle = appointmentStyle; this.Content = schedule; -> public ObservableCollection Appointments { get; set; } SfScheduler scheduler = new SfScheduler(); this.Appointments = new ObservableCollection(); this.Appointments.Add(new SchedulerAppointment() { Subject = "meeting", StartTime = DateTime.Now, EndTime = DateTime.Now.AddHours(1), }); scheduler.AppointmentsSource = this.Appointments; var appointmentTextStyle = new SchedulerTextStyle() { TextColor = Colors.Red, FontFamily ="Arial", FontSize = 12, FontAttributes = FontAttributes.Bold }; scheduler.AppointmentTextStyle = appointmentTextStyle; this.Content = scheduler;
- BorderWidth -> AppointmentTemplate' (From DaysView, TimelineView, and MonthView)
- BorderCornerRadius -> AppointmentTemplate' (From DaysView, TimelineView, and MonthView)
- BorderColor -> AppointmentTemplate' (From DaysView, TimelineView, and MonthView)
- SelectionBorderColor -> SelectedAppointmentBackground
- SelectionTextColor -> AppointmentTemplate' (From DaysView, TimelineView, and MonthView)
- SfSchedule schedule = new SfSchedule(); // MonthCell Appearance MonthViewCellStyle monthCellStyle = new MonthViewCellStyle(); monthCellStyle.BackgroundColor = Color.FromHex("#8282ff"); monthCellStyle.NextMonthBackgroundColor = Color.White; monthCellStyle.PreviousMonthBackgroundColor = Color.White; monthCellStyle.TodayBackgroundColor = Color.FromHex("#f97272"); schedule.MonthCellStyle = monthCellStyle; this.Content = schedule; -> SfScheduler scheduler = new SfScheduler(); var monthCellStyle = new SchedulerMonthCellStyle() { Background = Brush.LightSkyBlue, TodayBackground = Brush.LightBlue, LeadingMonthBackground = Brush.LightGreen, TrailingMonthBackground = Brush.LightYellow, }; scheduler.MonthView.CellStyle = monthCellStyle; this.Content = scheduler;
- TodayBackgroundColor -> TodayBackground
- TodayTextColor -> TextColor' (From TodayTextStyle of Scheduler)
- PreviousMonthTextColor -> TextColor' (From LeadingMonthTextStyle)
- PreviousMonthBackgroundColor -> LeadingMonthBackground
- NextMonthBackgroundColor -> TrailingMonthBackground
- NextMonthTextColor -> TextColor' (From TrailingMonthTextStyle)
- SfSchedule schedule = new SfSchedule(); // creating new instance for WeekNumberStyle WeekNumberStyle weekNumberStyle = new WeekNumberStyle(); weekNumberStyle.FontFamily = "Arial"; weekNumberStyle.FontSize = 15; weekNumberStyle.FontAttributes = FontAttributes.None; weekNumberStyle.BackgroundColor = Color.Blue; weekNumberStyle.TextColor = Color.White; monthViewSettings.WeekNumberStyle = weekNumberStyle; this.Content = schedule; -> SfScheduler scheduler = new SfScheduler(); scheduler.ShowWeekNumber = true; var schedulerWeekNumberStyle = new SchedulerWeekNumberStyle() { Background = Brush.LightGreen, TextStyle = schedulerTextStyle }; scheduler.WeekNumberStyle = schedulerWeekNumberStyle; this.Content = scheduler;
- SfSchedule schedule = new SfSchedule(); schedule.DragDropSettings.AllowNavigation = false; schedule.DragDropSettings.AllowScroll = false; this.Content = schedule; -> SfScheduler scheduler = new SfScheduler(); scheduler.DragDropSettings.AllowNavigation = false; scheduler.DragDropSettings.AllowScroll = false; this.Content = scheduler;
- AllowNavigate -> AllowNavigation
- AllowScroll -> AllowScroll
- AutoNavigationDelay -> AutoNavigationDelay
- ShowTimeIndicator -> ShowTimeIndicator
- TimeIndicatorStyle -> TimeIndicatorStyle
- Nil -> TimeIndicatorTextFormat

## Enums Mapping

- AppointmentDisplayMode -> SchedulerMonthAppointmentDisplayMode
- RecurrenceRange -> SchedulerRecurrenceRange
- RecurrenceType -> SchedulerRecurrenceType
- ScheduleView -> SchedulerView
- ViewLayoutOptions -> AppointmentTemplate' (From DaysView, TimelineView, and MonthView)
- SelectionMode -> Nil.

## Events Mapping

- CellDoubleTapped -> DoubleTapped
- CellTapped -> Tapped
- CellLongPressed -> LongPressed
- HeaderTapped -> Tapped
- ViewHeaderTapped -> Tapped
- VisibleDatesChangedEvent -> ViewChanged
- MonthInlineAppointmentTapped -> Tapped
- OnAppointmentLoadedEvent -> AppointmentTemplate' (From DaysView, TimelineView, and MonthView)
- OnMonthInlineAppointmentLoadedEvent -> AppointmentTemplate' (From MonthView)
- OnMonthInlineLoadedEvent -> AppointmentTemplate' (From MonthView)
- OnMonthCellLoadedEvent -> CellTemplate
- AppointmentDragStarting -> AppointmentDragStarting
- AppointmentDragOver -> AppointmentDragOver
- AppointmentDrop -> AppointmentDrop

## Methods Mapping

- Backward -> Backward
- Forward -> Forward
- NavigateTo -> DisplayDate
- GetVisibleAppointments -> GetOccurrenceAppointment
- GetRecurrenceDateTimeCollection -> GetDateTimeOccurrences
- RRuleGenerator -> GenerateRRule
- RRuleParser -> ParseRRule

## Notes

- Mappings are extracted from migration guide tables.
- If a required API/event/method is not listed, add it to manual action backlog for verification.
