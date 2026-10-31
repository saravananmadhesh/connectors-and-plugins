# Load On Demand

This reference provides comprehensive guidance on implementing load-on-demand functionality in the WinUI Scheduler for efficient data loading and performance optimization.

## Overview

Load-on-demand enables loading appointments only when needed (when a date range becomes visible), rather than loading all appointments upfront. This improves performance and reduces memory usage, especially with large datasets.

**Benefits:**
- Faster initial load time
- Reduced memory footprint
- Better scalability with large datasets
- Efficient network usage (load from server as needed)

## QueryAppointments Event

The `QueryAppointments` event fires when the scheduler needs appointments for a specific date range.

### Basic Implementation

```csharp
Schedule.ViewChanged += Schedule_ViewChanged;

private async void Schedule_ViewChanged(object sender, ViewChangedEventArgs e)
{
    var startDate = e.NewVisibleDates.First();
    var endDate = e.NewVisibleDates.Last();
    
    // Load appointments for visible date range
    var appointments = await LoadAppointmentsAsync(startDate, endDate);
    
    // Set as ItemsSource
    Schedule.ItemsSource = new ScheduleAppointmentCollection(appointments);
}

private async Task<List<ScheduleAppointment>> LoadAppointmentsAsync(DateTime start, DateTime end)
{
    // Simulate loading from server
    await Task.Delay(500);
    
    // Fetch appointments from database/API
    var appointments = await _dataService.GetAppointmentsAsync(start, end);
    
    return appointments;
}
```

## Showing Loading Indicator

### Display Loading State

```xml
<Grid>
    <scheduler:SfScheduler x:Name="Schedule" ViewType="Week"/>
    
    <ProgressRing x:Name="LoadingIndicator" 
                 IsActive="False"
                 Width="50" Height="50"
                 HorizontalAlignment="Center"
                 VerticalAlignment="Center"/>
</Grid>
```

```csharp
private async void Schedule_ViewChanged(object sender, ViewChangedEventArgs e)
{
    LoadingIndicator.IsActive = true;
    
    try
    {
        var startDate = e.NewVisibleDates.First();
        var endDate = e.NewVisibleDates.Last();
        
        var appointments = await LoadAppointmentsAsync(startDate, endDate);
        Schedule.ItemsSource = new ScheduleAppointmentCollection(appointments);
    }
    finally
    {
        LoadingIndicator.IsActive = false;
    }
}
```

## Caching Strategy

### Cache Loaded Appointments

```csharp
private ScheduleAppointmentCollection _allAppointments = new();
private DateTime _loadedRangeStart = DateTime.MinValue;
private DateTime _loadedRangeEnd = DateTime.MinValue;

private async void Schedule_ViewChanged(object sender, ViewChangedEventArgs e)
{
    var newStart = e.NewVisibleDates.First();
    var newEnd = e.NewVisibleDates.Last();
    
    // Check if we need to load new data
    if (newStart < _loadedRangeStart || newEnd > _loadedRangeEnd)
    {
        LoadingIndicator.IsActive = true;
        
        // Expand range to reduce future loads
        var loadStart = newStart.AddDays(-30); // Load 30 days before
        var loadEnd = newEnd.AddDays(30);      // Load 30 days after
        
        var appointments = await LoadAppointmentsAsync(loadStart, loadEnd);
        
        // Merge with existing appointments
        foreach (var apt in appointments)
        {
            if (!_allAppointments.Any(a => a.Id == apt.Id))
            {
                _allAppointments.Add(apt);
            }
        }
        
        _loadedRangeStart = loadStart;
        _loadedRangeEnd = loadEnd;
        
        Schedule.ItemsSource = _allAppointments;
        LoadingIndicator.IsActive = false;
    }
}
```

## Incremental Loading

### Load in Chunks

```csharp
private const int CHUNK_SIZE = 100;
private int _currentChunk = 0;

private async Task<List<ScheduleAppointment>> LoadAppointmentsIncrementallyAsync(DateTime start, DateTime end)
{
    var allAppointments = new List<ScheduleAppointment>();
    var skip = _currentChunk * CHUNK_SIZE;
    
    while (true)
    {
        var chunk = await _dataService.GetAppointmentsAsync(start, end, skip, CHUNK_SIZE);
        
        if (chunk.Count == 0)
            break;
        
        allAppointments.AddRange(chunk);
        skip += CHUNK_SIZE;
        
        // Update UI incrementally
        _currentChunk++;
        
        if (chunk.Count < CHUNK_SIZE)
            break; // Last chunk
    }
    
    return allAppointments;
}
```

## Background Loading

### Pre-load Adjacent Ranges

```csharp
private async void Schedule_ViewChanged(object sender, ViewChangedEventArgs e)
{
    var currentStart = e.NewVisibleDates.First();
    var currentEnd = e.NewVisibleDates.Last();
    
    // Load current range immediately
    await LoadRangeAsync(currentStart, currentEnd);
    
    // Pre-load adjacent ranges in background
    _ = Task.Run(async () =>
    {
        // Previous range
        var prevStart = currentStart.AddDays(-30);
        var prevEnd = currentStart;
        await LoadRangeAsync(prevStart, prevEnd);
        
        // Next range
        var nextStart = currentEnd;
        var nextEnd = currentEnd.AddDays(30);
        await LoadRangeAsync(nextStart, nextEnd);
    });
}

private async Task LoadRangeAsync(DateTime start, DateTime end)
{
    if (IsRangeLoaded(start, end))
        return;
    
    var appointments = await LoadAppointmentsAsync(start, end);
    
    // Add to cache on UI thread
    await DispatcherQueue.TryEnqueue(() =>
    {
        foreach (var apt in appointments)
        {
            if (!_allAppointments.Any(a => a.Id == apt.Id))
            {
                _allAppointments.Add(apt);
            }
        }
    });
}
```

## Common Patterns

### Pattern 1: Load from REST API

```csharp
public class AppointmentService
{
    private readonly HttpClient _httpClient;
    
    public AppointmentService()
    {
        _httpClient = new HttpClient 
        { 
            BaseAddress = new Uri("https://api.example.com/") 
        };
    }
    
    public async Task<List<ScheduleAppointment>> GetAppointmentsAsync(DateTime start, DateTime end)
    {
        var url = $"appointments?start={start:yyyy-MM-dd}&end={end:yyyy-MM-dd}";
        
        var response = await _httpClient.GetAsync(url);
        response.EnsureSuccessStatusCode();
        
        var json = await response.Content.ReadAsStringAsync();
        var dtos = JsonSerializer.Deserialize<List<AppointmentDto>>(json);
        
        return dtos.Select(dto => new ScheduleAppointment
        {
            Subject = dto.Title,
            StartTime = dto.Start,
            EndTime = dto.End,
            Notes = dto.Description
        }).ToList();
    }
}

// Usage
private AppointmentService _service = new();

private async void Schedule_ViewChanged(object sender, ViewChangedEventArgs e)
{
    LoadingIndicator.IsActive = true;
    
    try
    {
        var appointments = await _service.GetAppointmentsAsync(
            e.NewVisibleDates.First(),
            e.NewVisibleDates.Last());
        
        Schedule.ItemsSource = new ScheduleAppointmentCollection(appointments);
    }
    catch (Exception ex)
    {
        ShowError($"Failed to load appointments: {ex.Message}");
    }
    finally
    {
        LoadingIndicator.IsActive = false;
    }
}
```

### Pattern 2: Load from Database

```csharp
public class AppointmentRepository
{
    private readonly string _connectionString;
    
    public async Task<List<ScheduleAppointment>> GetAppointmentsAsync(DateTime start, DateTime end)
    {
        var appointments = new List<ScheduleAppointment>();
        
        using var connection = new SqlConnection(_connectionString);
        await connection.OpenAsync();
        
        using var command = new SqlCommand(
            @"SELECT Id, Subject, StartTime, EndTime, Notes, Color 
              FROM Appointments 
              WHERE StartTime >= @Start AND EndTime <= @End
              ORDER BY StartTime", 
            connection);
        
        command.Parameters.AddWithValue("@Start", start);
        command.Parameters.AddWithValue("@End", end);
        
        using var reader = await command.ExecuteReaderAsync();
        
        while (await reader.ReadAsync())
        {
            appointments.Add(new ScheduleAppointment
            {
                Id = reader.GetInt32(0),
                Subject = reader.GetString(1),
                StartTime = reader.GetDateTime(2),
                EndTime = reader.GetDateTime(3),
                Notes = reader.IsDBNull(4) ? null : reader.GetString(4),
                Background = new SolidColorBrush(
                    Color.FromArgb(255, 
                        reader.GetByte(5), 
                        reader.GetByte(6), 
                        reader.GetByte(7)))
            });
        }
        
        return appointments;
    }
}
```

### Pattern 3: Smart Caching with Expiration

```csharp
public class AppointmentCache
{
    private readonly Dictionary<string, CacheEntry> _cache = new();
    private readonly TimeSpan _expirationTime = TimeSpan.FromMinutes(10);
    
    private class CacheEntry
    {
        public List<ScheduleAppointment> Appointments { get; set; }
        public DateTime LoadedAt { get; set; }
        public DateTime RangeStart { get; set; }
        public DateTime RangeEnd { get; set; }
    }
    
    public async Task<List<ScheduleAppointment>> GetAppointmentsAsync(
        DateTime start, DateTime end, Func<DateTime, DateTime, Task<List<ScheduleAppointment>>> loader)
    {
        var key = GetCacheKey(start, end);
        
        if (_cache.TryGetValue(key, out var entry))
        {
            // Check if expired
            if (DateTime.Now - entry.LoadedAt < _expirationTime)
            {
                Debug.WriteLine("Cache hit");
                return entry.Appointments;
            }
            
            // Expired, remove
            _cache.Remove(key);
        }
        
        Debug.WriteLine("Cache miss - loading data");
        var appointments = await loader(start, end);
        
        _cache[key] = new CacheEntry
        {
            Appointments = appointments,
            LoadedAt = DateTime.Now,
            RangeStart = start,
            RangeEnd = end
        };
        
        return appointments;
    }
    
    private string GetCacheKey(DateTime start, DateTime end)
    {
        return $"{start:yyyyMMdd}-{end:yyyyMMdd}";
    }
    
    public void Clear()
    {
        _cache.Clear();
    }
}

// Usage
private AppointmentCache _cache = new();
private AppointmentService _service = new();

private async void Schedule_ViewChanged(object sender, ViewChangedEventArgs e)
{
    LoadingIndicator.IsActive = true;
    
    var appointments = await _cache.GetAppointmentsAsync(
        e.NewVisibleDates.First(),
        e.NewVisibleDates.Last(),
        _service.GetAppointmentsAsync);
    
    Schedule.ItemsSource = new ScheduleAppointmentCollection(appointments);
    LoadingIndicator.IsActive = false;
}
```

### Pattern 4: Error Handling and Retry

```csharp
private async Task<List<ScheduleAppointment>> LoadWithRetryAsync(DateTime start, DateTime end, int maxRetries = 3)
{
    int attempt = 0;
    Exception lastException = null;
    
    while (attempt < maxRetries)
    {
        try
        {
            return await _service.GetAppointmentsAsync(start, end);
        }
        catch (HttpRequestException ex)
        {
            lastException = ex;
            attempt++;
            
            if (attempt < maxRetries)
            {
                // Exponential backoff
                await Task.Delay(TimeSpan.FromSeconds(Math.Pow(2, attempt)));
            }
        }
    }
    
    // All retries failed
    ShowError($"Failed to load appointments after {maxRetries} attempts: {lastException.Message}");
    return new List<ScheduleAppointment>();
}
```

### Pattern 5: Optimistic UI Updates

```csharp
// Add new appointment optimistically (before server confirms)
private async void CreateAppointmentOptimistic(ScheduleAppointment appointment)
{
    // Add to UI immediately
    Schedule.ItemsSource.Add(appointment);
    
    try
    {
        // Save to server
        var savedAppointment = await _service.CreateAppointmentAsync(appointment);
        
        // Update with server-assigned ID
        appointment.Id = savedAppointment.Id;
    }
    catch (Exception ex)
    {
        // Rollback on failure
        Schedule.ItemsSource.Remove(appointment);
        ShowError($"Failed to create appointment: {ex.Message}");
    }
}
```

## Performance Optimization

### Reduce Load Frequency

```csharp
private DateTime? _lastLoadedStart;
private DateTime? _lastLoadedEnd;
private readonly TimeSpan _loadThreshold = TimeSpan.FromDays(7);

private async void Schedule_ViewChanged(object sender, ViewChangedEventArgs e)
{
    var newStart = e.NewVisibleDates.First();
    var newEnd = e.NewVisibleDates.Last();
    
    // Only load if navigated significantly
    if (_lastLoadedStart.HasValue && _lastLoadedEnd.HasValue)
    {
        if (newStart >= _lastLoadedStart.Value && newEnd <= _lastLoadedEnd.Value)
        {
            // Still within loaded range, skip loading
            return;
        }
    }
    
    await LoadAppointmentsAsync(newStart, newEnd);
    
    _lastLoadedStart = newStart;
    _lastLoadedEnd = newEnd;
}
```

### Debounce Load Requests

```csharp
private CancellationTokenSource _loadCts;

private async void Schedule_ViewChanged(object sender, ViewChangedEventArgs e)
{
    // Cancel previous load request
    _loadCts?.Cancel();
    _loadCts = new CancellationTokenSource();
    
    try
    {
        // Wait briefly to see if user is still navigating
        await Task.Delay(300, _loadCts.Token);
        
        // Load appointments
        await LoadAppointmentsAsync(
            e.NewVisibleDates.First(), 
            e.NewVisibleDates.Last(),
            _loadCts.Token);
    }
    catch (OperationCanceledException)
    {
        // User navigated again, this load was canceled
    }
}
```

## Best Practices

### Loading Strategy
- Load visible range immediately
- Pre-load adjacent ranges in background
- Cache loaded appointments
- Expand load range to reduce future loads (load ±30 days)

### User Experience
- Show loading indicator for loads >300ms
- Support pull-to-refresh on touch devices
- Provide offline support with cached data
- Handle errors gracefully with retry

### Performance
- Debounce rapid navigation
- Use incremental loading for large datasets
- Implement virtual scrolling if possible
- Limit appointment count per load (e.g., 1000 max)

### Data Consistency
- Implement cache expiration
- Reload on focus/resume if data might be stale
- Use optimistic UI updates
- Handle concurrent modifications

## Troubleshooting

### Appointments Not Loading

**Problem:** ViewChanged event fires but appointments don't appear.

**Solutions:**
- Check if ItemsSource is being set correctly
- Verify appointments fall within visible date range
- Ensure async method is awaited
- Check for exceptions in load method

### Loading Indicator Stuck

**Problem:** Loading indicator stays visible.

**Solutions:**
- Wrap load in try-finally to ensure indicator hides
- Check if exception prevents finally block
- Verify IsActive is set to false on all code paths
- Use CancellationToken to handle timeouts

### Duplicate Appointments

**Problem:** Same appointments loaded multiple times.

**Solutions:**
- Check cache logic prevents duplicates
- Use unique ID to identify appointments
- Clear ItemsSource before adding new data
- Implement proper cache key generation

### Slow Loading

**Problem:** Loading takes too long.

**Solutions:**
- Optimize database queries (add indexes)
- Reduce date range loaded
- Implement pagination on server
- Use compression for network transfer
- Profile and optimize bottlenecks

### Memory Leaks

**Problem:** Memory usage grows over time.

**Solutions:**
- Implement cache size limits
- Remove old cache entries
- Cancel pending requests properly
- Dispose of resources (HttpClient, connections)
