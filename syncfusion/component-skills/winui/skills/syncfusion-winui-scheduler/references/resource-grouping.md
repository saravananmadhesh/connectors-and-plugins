# Resource Grouping

## Table of Contents
- [Overview](#overview)
- [Resource Collection](#resource-collection)
- [Resource Grouping Types](#resource-grouping-types)
- [Assigning Resources to Appointments](#assigning-resources-to-appointments)
- [Resource Appearance](#resource-appearance)
- [Resource Header](#resource-header)
- [Common Patterns](#common-patterns)
- [Troubleshooting](#troubleshooting)

## Overview

Resource grouping allows you to categorize scheduler appointments by resources such as meeting rooms, doctors, employees, equipment, or any other entity. Each resource gets its own row or column in the scheduler view.

**Benefits:**
- Compare multiple resources side-by-side
- Identify resource conflicts quickly
- See resource availability at a glance
- Schedule appointments for specific resources

## Resource Collection

### Creating Resources

Define resources using `SchedulerResource`:

```csharp
var resources = new ObservableCollection<SchedulerResource>
{
    new SchedulerResource 
    { 
        Name = "John Doe", 
        Id = "john",
        Background = new SolidColorBrush(Colors.LightBlue)
    },
    new SchedulerResource 
    { 
        Name = "Sarah Smith", 
        Id = "sarah",
        Background = new SolidColorBrush(Colors.LightGreen)
    },
    new SchedulerResource 
    { 
        Name = "Mike Wilson", 
        Id = "mike",
        Background = new SolidColorBrush(Colors.LightCoral)
    }
};

Schedule.ResourceCollection = resources;
```

### Resource Properties

```csharp
public class SchedulerResource
{
    public object Id { get; set; }           // Unique identifier
    public string Name { get; set; }         // Display name
    public Brush Background { get; set; }    // Background color
    public Brush Foreground { get; set; }    // Text color
    public object Data { get; set; }         // Custom data
}
```

**Property Details:**
- **Id**: Unique identifier used to assign appointments to resources
- **Name**: Displayed in resource header
- **Background**: Optional color for resource header and appointments
- **Foreground**: Optional text color for resource header
- **Data**: Store custom objects (e.g., employee details, room capacity)

### Enable Resource Grouping

```xml
<scheduler:SfScheduler x:Name="Schedule" 
                      ViewType="TimelineWeek"
                      ResourceGroupType="Resource" />
```

```csharp
Schedule.ResourceGroupType = ResourceGroupType.Resource;
```

**Resource Group Types:**
- `None` - No resource grouping (default)
- `Resource` - Group by resources (each resource gets own row/timeline)

## Resource Grouping Types

### None (No Grouping)

```csharp
Schedule.ResourceGroupType = ResourceGroupType.None;
```

**Behavior:**
- All appointments displayed together
- No resource separation
- Default state

### Resource Grouping

```csharp
Schedule.ResourceGroupType = ResourceGroupType.Resource;
```

**Behavior:**
- Each resource gets its own row/column
- Appointments filtered by resource
- Resource headers displayed

**View-Specific Layouts:**
- **Day/Week/WorkWeek Views**: Horizontal resource columns
- **Timeline Views**: Vertical resource rows (recommended)
- **Month View**: Not typically used with resources

## Assigning Resources to Appointments

### Single Resource Assignment

```csharp
var appointment = new ScheduleAppointment
{
    Subject = "Team Meeting",
    StartTime = new DateTime(2026, 6, 15, 10, 0, 0),
    EndTime = new DateTime(2026, 6, 15, 11, 0, 0),
    ResourceIds = new ObservableCollection<object> { "john" }
};

Schedule.ItemsSource.Add(appointment);
```

### Multiple Resource Assignment

```csharp
// Appointment appears in both John's and Sarah's rows
var appointment = new ScheduleAppointment
{
    Subject = "Project Review",
    StartTime = new DateTime(2026, 6, 15, 14, 0, 0),
    EndTime = new DateTime(2026, 6, 15, 15, 30, 0),
    ResourceIds = new ObservableCollection<object> { "john", "sarah" }
};

Schedule.ItemsSource.Add(appointment);
```

**Multiple Resources:**
- Appointment appears in all assigned resource rows
- Useful for meetings with multiple attendees
- Changes to appointment affect all resource views

### Custom Appointment with Resources

```csharp
public class Meeting
{
    public string Title { get; set; }
    public DateTime From { get; set; }
    public DateTime To { get; set; }
    public List<string> AttendeeIds { get; set; } // Resource IDs
    public Brush Color { get; set; }
}

// Create appointments
var meetings = new ObservableCollection<Meeting>
{
    new Meeting
    {
        Title = "Sprint Planning",
        From = new DateTime(2026, 6, 15, 9, 0, 0),
        To = new DateTime(2026, 6, 15, 10, 30, 0),
        AttendeeIds = new List<string> { "john", "sarah", "mike" }
    }
};

// Map to scheduler
Schedule.AppointmentMapping = new ScheduleAppointmentMapping
{
    Subject = "Title",
    StartTime = "From",
    EndTime = "To",
    ResourceIds = "AttendeeIds",
    Background = "Color"
};

Schedule.ItemsSource = meetings;
```

## Resource Appearance

### Resource Background Color

Set default colors for each resource:

```csharp
var resources = new ObservableCollection<SchedulerResource>
{
    new SchedulerResource 
    { 
        Name = "Conference Room A", 
        Id = "room-a",
        Background = new SolidColorBrush(Colors.SkyBlue)
    },
    new SchedulerResource 
    { 
        Name = "Conference Room B", 
        Id = "room-b",
        Background = new SolidColorBrush(Colors.LightGreen)
    }
};

Schedule.ResourceCollection = resources;
```

**Behavior:**
- Appointments for this resource use this background color (if not overridden)
- Resource header uses this color
- Helps distinguish resources visually

### Appointment Colors with Resources

```csharp
// Override resource color with appointment-specific color
var appointment = new ScheduleAppointment
{
    Subject = "Important Meeting",
    StartTime = new DateTime(2026, 6, 15, 10, 0, 0),
    EndTime = new DateTime(2026, 6, 15, 11, 0, 0),
    ResourceIds = new ObservableCollection<object> { "room-a" },
    Background = new SolidColorBrush(Colors.Red) // Overrides resource color
};
```

## Resource Header

### Resource Header Settings

Customize resource header appearance:

```xml
<scheduler:SfScheduler x:Name="Schedule" 
                      ViewType="TimelineWeek"
                      ResourceGroupType="Resource">
    <scheduler:SfScheduler.ResourceHeaderSettings>
        <scheduler:ResourceHeaderSettings Size="150" />
    </scheduler:SfScheduler.ResourceHeaderSettings>
</scheduler:SfScheduler>
```

```csharp
// Set resource header width (Timeline views) or height (Day/Week views)
Schedule.ResourceHeaderSettings.Size = 150; // Default is 50
```

**Size Impact:**
- **Timeline Views**: Width of resource header column (left side)
- **Day/Week Views**: Height of resource header row (top)
- Larger values = more space for resource names

### Resource Header Template

Customize how resources are displayed:

```xml
<scheduler:SfScheduler x:Name="Schedule" 
                      ViewType="TimelineWeek"
                      ResourceGroupType="Resource">
    <scheduler:SfScheduler.ResourceHeaderSettings>
        <scheduler:ResourceHeaderSettings>
            <scheduler:ResourceHeaderSettings.ResourceHeaderTemplate>
                <DataTemplate>
                    <Grid Background="{Binding Background}">
                        <StackPanel Orientation="Horizontal" Margin="10">
                            <Ellipse Width="30" Height="30" 
                                    Fill="{Binding Foreground}" />
                            <TextBlock Text="{Binding Name}" 
                                      Margin="10,0,0,0"
                                      VerticalAlignment="Center"
                                      FontWeight="Bold" />
                        </StackPanel>
                    </Grid>
                </DataTemplate>
            </scheduler:ResourceHeaderSettings.ResourceHeaderTemplate>
        </scheduler:ResourceHeaderSettings>
    </scheduler:SfScheduler.ResourceHeaderSettings>
</scheduler:SfScheduler>
```

## Common Patterns

### Pattern 1: Meeting Room Scheduler

```csharp
// Define meeting rooms
var rooms = new ObservableCollection<SchedulerResource>
{
    new SchedulerResource 
    { 
        Name = "Room 101 (Capacity: 10)", 
        Id = "room-101",
        Background = new SolidColorBrush(Colors.LightBlue),
        Data = new { Capacity = 10, HasProjector = true }
    },
    new SchedulerResource 
    { 
        Name = "Room 102 (Capacity: 20)", 
        Id = "room-102",
        Background = new SolidColorBrush(Colors.LightGreen),
        Data = new { Capacity = 20, HasProjector = true }
    },
    new SchedulerResource 
    { 
        Name = "Room 103 (Capacity: 6)", 
        Id = "room-103",
        Background = new SolidColorBrush(Colors.LightCoral),
        Data = new { Capacity = 6, HasProjector = false }
    }
};

Schedule.ResourceCollection = rooms;
Schedule.ResourceGroupType = ResourceGroupType.Resource;
Schedule.ViewType = SchedulerViewType.TimelineWeek;
Schedule.TimelineViewSettings.StartHour = 8;
Schedule.TimelineViewSettings.EndHour = 18;

// Book a room
var booking = new ScheduleAppointment
{
    Subject = "Team Standup",
    StartTime = new DateTime(2026, 6, 15, 9, 0, 0),
    EndTime = new DateTime(2026, 6, 15, 9, 15, 0),
    ResourceIds = new ObservableCollection<object> { "room-101" }
};

Schedule.ItemsSource.Add(booking);
```

### Pattern 2: Doctor Appointment System

```csharp
// Define doctors
var doctors = new ObservableCollection<SchedulerResource>
{
    new SchedulerResource 
    { 
        Name = "Dr. Smith (Cardiology)", 
        Id = "dr-smith",
        Background = new SolidColorBrush(Colors.MediumPurple),
        Data = new { Specialty = "Cardiology", Department = "Heart Center" }
    },
    new SchedulerResource 
    { 
        Name = "Dr. Johnson (Orthopedics)", 
        Id = "dr-johnson",
        Background = new SolidColorBrush(Colors.MediumSeaGreen),
        Data = new { Specialty = "Orthopedics", Department = "Surgery" }
    },
    new SchedulerResource 
    { 
        Name = "Dr. Williams (Pediatrics)", 
        Id = "dr-williams",
        Background = new SolidColorBrush(Colors.LightSalmon),
        Data = new { Specialty = "Pediatrics", Department = "Children's Wing" }
    }
};

Schedule.ResourceCollection = doctors;
Schedule.ResourceGroupType = ResourceGroupType.Resource;
Schedule.ViewType = SchedulerViewType.TimelineDay;
Schedule.TimelineViewSettings.TimeInterval = new TimeSpan(0, 15, 0); // 15-min slots
Schedule.TimelineViewSettings.StartHour = 8;
Schedule.TimelineViewSettings.EndHour = 17;

// Patient appointment
var patientAppointment = new ScheduleAppointment
{
    Subject = "Patient: John Doe - Checkup",
    StartTime = new DateTime(2026, 6, 15, 10, 0, 0),
    EndTime = new DateTime(2026, 6, 15, 10, 30, 0),
    ResourceIds = new ObservableCollection<object> { "dr-smith" }
};

Schedule.ItemsSource.Add(patientAppointment);
```

### Pattern 3: Employee Work Schedule

```csharp
// Define employees
var employees = new ObservableCollection<SchedulerResource>
{
    new SchedulerResource { Name = "John Doe", Id = "emp-001", Background = new SolidColorBrush(Colors.SteelBlue) },
    new SchedulerResource { Name = "Jane Smith", Id = "emp-002", Background = new SolidColorBrush(Colors.Teal) },
    new SchedulerResource { Name = "Bob Johnson", Id = "emp-003", Background = new SolidColorBrush(Colors.DarkOrange) },
    new SchedulerResource { Name = "Alice Brown", Id = "emp-004", Background = new SolidColorBrush(Colors.MediumVioletRed) }
};

Schedule.ResourceCollection = employees;
Schedule.ResourceGroupType = ResourceGroupType.Resource;
Schedule.ViewType = SchedulerViewType.TimelineWeek;

// Assign work shifts
var shifts = new ObservableCollection<ScheduleAppointment>
{
    new ScheduleAppointment
    {
        Subject = "Morning Shift",
        StartTime = new DateTime(2026, 6, 15, 6, 0, 0),
        EndTime = new DateTime(2026, 6, 15, 14, 0, 0),
        ResourceIds = new ObservableCollection<object> { "emp-001" }
    },
    new ScheduleAppointment
    {
        Subject = "Afternoon Shift",
        StartTime = new DateTime(2026, 6, 15, 14, 0, 0),
        EndTime = new DateTime(2026, 6, 15, 22, 0, 0),
        ResourceIds = new ObservableCollection<object> { "emp-002" }
    }
};

Schedule.ItemsSource = shifts;
```

### Pattern 4: Equipment Booking System

```csharp
// Define equipment
var equipment = new ObservableCollection<SchedulerResource>
{
    new SchedulerResource 
    { 
        Name = "Projector #1", 
        Id = "proj-1",
        Background = new SolidColorBrush(Colors.Gold),
        Data = new { Type = "4K Projector", Location = "Building A" }
    },
    new SchedulerResource 
    { 
        Name = "Laptop #5", 
        Id = "laptop-5",
        Background = new SolidColorBrush(Colors.Silver),
        Data = new { Type = "MacBook Pro", Location = "IT Department" }
    },
    new SchedulerResource 
    { 
        Name = "Camera Kit", 
        Id = "camera-1",
        Background = new SolidColorBrush(Colors.DarkSlateBlue),
        Data = new { Type = "DSLR Camera", Location = "Media Room" }
    }
};

Schedule.ResourceCollection = equipment;
Schedule.ResourceGroupType = ResourceGroupType.Resource;
Schedule.ViewType = SchedulerViewType.TimelineWeek;

// Book equipment
var booking = new ScheduleAppointment
{
    Subject = "Marketing Event - John Doe",
    StartTime = new DateTime(2026, 6, 15, 9, 0, 0),
    EndTime = new DateTime(2026, 6, 15, 17, 0, 0),
    ResourceIds = new ObservableCollection<object> { "proj-1", "camera-1" } // Multiple equipment
};

Schedule.ItemsSource.Add(booking);
```

### Pattern 5: Filter Appointments by Resource

```csharp
private ComboBox resourceFilter;

private void InitializeResourceFilter()
{
    resourceFilter.ItemsSource = Schedule.ResourceCollection;
    resourceFilter.SelectionChanged += ResourceFilter_SelectionChanged;
}

private void ResourceFilter_SelectionChanged(object sender, SelectionChangedEventArgs e)
{
    if (resourceFilter.SelectedItem is SchedulerResource selectedResource)
    {
        // Filter appointments for selected resource
        var allAppointments = _cachedAppointments; // Store original appointments
        
        var filtered = allAppointments.Where(apt =>
        {
            var resourceIds = apt.ResourceIds as ObservableCollection<object>;
            return resourceIds != null && resourceIds.Contains(selectedResource.Id);
        }).ToList();
        
        Schedule.ItemsSource = new ScheduleAppointmentCollection(filtered);
    }
    else
    {
        // Show all appointments
        Schedule.ItemsSource = _cachedAppointments;
    }
}
```

## Best View Types for Resources

### Timeline Views (Recommended)

```csharp
Schedule.ViewType = SchedulerViewType.TimelineWeek;
Schedule.ResourceGroupType = ResourceGroupType.Resource;
```

**Why Timeline is Best:**
- Each resource gets horizontal row
- Easy to compare multiple resources
- Time flows horizontally (intuitive)
- Better utilization of screen width

### Day/Week Views

```csharp
Schedule.ViewType = SchedulerViewType.Week;
Schedule.ResourceGroupType = ResourceGroupType.Resource;
```

**Resources as Columns:**
- Each resource gets vertical column
- Works for small number of resources (2-4)
- Can become crowded with many resources

### Month View

```csharp
// Not recommended with resources
Schedule.ViewType = SchedulerViewType.Month;
```

**Limitations:**
- No clear resource separation
- Appointments from all resources mixed together
- Better to use Timeline or Week view

## Best Practices

### Resource Count
- **Timeline**: Works well with 3-10 resources
- **Day/Week**: Best with 2-4 resources
- **Many Resources**: Consider pagination or filtering

### Resource Naming
- Use descriptive, concise names
- Include relevant context (capacity, specialty, etc.)
- Keep names short enough to fit in header

### Resource Colors
- Use distinct colors for each resource
- Ensure sufficient contrast for readability
- Consider colorblind-friendly palettes
- Use appointment colors to override resource colors when needed

### Resource Data
- Store additional resource properties in `Data` property
- Use for capacity, availability, attributes
- Access in event handlers for validation

## Troubleshooting

### Resources Not Showing

**Problem:** Resource grouping doesn't display.

**Solutions:**
- Set `ResourceGroupType = ResourceGroupType.Resource`
- Verify `ResourceCollection` is not null or empty
- Ensure resources have unique `Id` values
- Check that resources have `Name` property set

### Appointments Not Appearing in Resource Rows

**Problem:** Appointments don't show in resource rows.

**Solutions:**
- Verify `ResourceIds` property is set on appointments
- Check that resource IDs in `ResourceIds` match `Id` in `ResourceCollection`
- Ensure `ResourceIds` is `ObservableCollection<object>`, not `List<string>`
- Verify appointments are in `ItemsSource`

### Resource Header Cut Off

**Problem:** Resource names are truncated.

**Solutions:**
- Increase `ResourceHeaderSettings.Size`
- Shorten resource names
- Use custom `ResourceHeaderTemplate` with tooltip
- Consider abbreviations or icons

### Appointments Appear in Multiple Resource Rows

**Problem:** Appointment shows in wrong resources.

**Solutions:**
- Check `ResourceIds` contains correct IDs only
- Verify no duplicate resource IDs
- Ensure IDs are unique across resources
- Clear and repopulate `ResourceIds` if necessary

### Resource Colors Not Applied

**Problem:** Resource background colors don't appear.

**Solutions:**
- Set `Background` property on `SchedulerResource`
- Verify appointments don't override with their own `Background`
- Check theme doesn't override colors
- Ensure `ResourceGroupType` is set to `Resource`

### Performance Issues with Many Resources

**Problem:** Scheduler is slow with many resources.

**Solutions:**
- Limit visible resources (pagination)
- Use resource filtering
- Optimize appointment collection size
- Consider load-on-demand pattern
- Use Timeline views (better performance than Day/Week)
