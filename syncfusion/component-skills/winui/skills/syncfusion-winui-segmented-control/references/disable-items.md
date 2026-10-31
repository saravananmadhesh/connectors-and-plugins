# Disabling Items in WinUI Segmented Control

This guide covers how to disable specific segment items to prevent user interaction based on application state, permissions, or business logic.

## Overview

The Segmented Control allows you to disable individual segments using the `SetItemEnabled` method. Disabled segments are visually dimmed and cannot be selected or interacted with.

## SetItemEnabled Method

The `SetItemEnabled` method enables or disables a segment item at a specific index.

### Method Signature

```csharp
public void SetItemEnabled(int index, bool isEnabled)
```

**Parameters:**
- `index` (int): Zero-based index of the segment item to enable/disable
- `isEnabled` (bool): `true` to enable, `false` to disable

## Basic Usage

### Disabling Single Item

```xaml
<syncfusion:SfSegmentedControl 
    x:Name="planSelector"
    Loaded="PlanSelector_Loaded">
    <x:String>Free</x:String>
    <x:String>Basic</x:String>
    <x:String>Premium</x:String>
    <x:String>Enterprise</x:String>
</syncfusion:SfSegmentedControl>
```

```csharp
private void PlanSelector_Loaded(object sender, RoutedEventArgs e)
{
    // Disable "Premium" (index 2) and "Enterprise" (index 3)
    planSelector.SetItemEnabled(2, false);
    planSelector.SetItemEnabled(3, false);
}
```

**Result:** Users can only select "Free" or "Basic" plans. "Premium" and "Enterprise" appear dimmed and are unclickable.

### Disabling Multiple Items

```csharp
private void DisableItems(params int[] indices)
{
    foreach (int index in indices)
    {
        if (index >= 0 && index < segmentedControl.Items.Count)
        {
            segmentedControl.SetItemEnabled(index, false);
        }
    }
}

// Usage
DisableItems(2, 3, 4); // Disable indices 2, 3, and 4
```

## Conditional Disabling

### Based on User Permissions

```csharp
public class PermissionManager
{
    public bool HasPremiumAccess { get; set; }
    public bool HasEnterpriseAccess { get; set; }
}

private void ConfigureSegmentAvailability(PermissionManager permissions)
{
    // Enable all first
    for (int i = 0; i < planSelector.Items.Count; i++)
    {
        planSelector.SetItemEnabled(i, true);
    }
    
    // Disable based on permissions
    if (!permissions.HasPremiumAccess)
    {
        planSelector.SetItemEnabled(2, false); // Premium
    }
    
    if (!permissions.HasEnterpriseAccess)
    {
        planSelector.SetItemEnabled(3, false); // Enterprise
    }
}
```

### Based on Data Availability

```csharp
private void UpdateSegmentAvailability(DataAvailability availability)
{
    // Day view (index 0) always available
    segmentedControl.SetItemEnabled(0, true);
    
    // Week view (index 1) available if we have weekly data
    segmentedControl.SetItemEnabled(1, availability.HasWeeklyData);
    
    // Month view (index 2) available if we have monthly data
    segmentedControl.SetItemEnabled(2, availability.HasMonthlyData);
    
    // Year view (index 3) available if we have yearly data
    segmentedControl.SetItemEnabled(3, availability.HasYearlyData);
}
```

### Based on Form Validation

```csharp
private void ValidateAndUpdateSegments()
{
    bool hasRequiredData = !string.IsNullOrEmpty(nameTextBox.Text) 
                        && datePicke

r.SelectedDate != null;
    
    // Enable export options only when data is valid
    exportFormatSelector.SetItemEnabled(0, hasRequiredData); // PDF
    exportFormatSelector.SetItemEnabled(1, hasRequiredData); // Excel
    exportFormatSelector.SetItemEnabled(2, hasRequiredData); // Word
}

private void NameTextBox_TextChanged(object sender, TextChangedEventArgs e)
{
    ValidateAndUpdateSegments();
}
```

## Enabling Items

Re-enable previously disabled items by calling `SetItemEnabled` with `true`.

### Re-enabling Single Item

```csharp
private void UnlockPremiumFeatures()
{
    // Enable Premium option
    planSelector.SetItemEnabled(2, true);
    
    // Show notification
    ShowNotification("Premium features unlocked!");
}
```

### Re-enabling All Items

```csharp
private void EnableAllSegments()
{
    for (int i = 0; i < segmentedControl.Items.Count; i++)
    {
        segmentedControl.SetItemEnabled(i, true);
    }
}
```

### Toggle Item State

```csharp
private void ToggleItemEnabled(int index)
{
    // Note: There's no GetItemEnabled method, so track state separately
    bool currentState = itemEnabledStates[index];
    bool newState = !currentState;
    
    segmentedControl.SetItemEnabled(index, newState);
    itemEnabledStates[index] = newState;
}

// Maintain state dictionary
private Dictionary<int, bool> itemEnabledStates = new Dictionary<int, bool>();
```

## Common Patterns

### Pattern 1: License-Based Features

```csharp
public enum LicenseType
{
    Free,
    Basic,
    Premium,
    Enterprise
}

private void ConfigureFeatureAccess(LicenseType userLicense)
{
    // Feature selector: Basic Features, Advanced Features, Premium Features, Enterprise Features
    
    switch (userLicense)
    {
        case LicenseType.Free:
            // Only basic features available
            featureSelector.SetItemEnabled(0, true);  // Basic
            featureSelector.SetItemEnabled(1, false); // Advanced
            featureSelector.SetItemEnabled(2, false); // Premium
            featureSelector.SetItemEnabled(3, false); // Enterprise
            featureSelector.SelectedIndex = 0;
            break;
            
        case LicenseType.Basic:
            // Basic and Advanced available
            featureSelector.SetItemEnabled(0, true);  // Basic
            featureSelector.SetItemEnabled(1, true);  // Advanced
            featureSelector.SetItemEnabled(2, false); // Premium
            featureSelector.SetItemEnabled(3, false); // Enterprise
            break;
            
        case LicenseType.Premium:
            // All except Enterprise
            featureSelector.SetItemEnabled(0, true);  // Basic
            featureSelector.SetItemEnabled(1, true);  // Advanced
            featureSelector.SetItemEnabled(2, true);  // Premium
            featureSelector.SetItemEnabled(3, false); // Enterprise
            break;
            
        case LicenseType.Enterprise:
            // All features available
            EnableAllSegments();
            break;
    }
}
```

### Pattern 2: Progressive Disclosure

```csharp
private int currentStep = 0;

private void UpdateAvailableSteps()
{
    // Steps: Personal Info (0), Address (1), Payment (2), Review (3)
    
    for (int i = 0; i <= currentStep; i++)
    {
        stepSelector.SetItemEnabled(i, true); // Enable completed steps
    }
    
    for (int i = currentStep + 1; i < stepSelector.Items.Count; i++)
    {
        stepSelector.SetItemEnabled(i, false); // Disable future steps
    }
}

private void NextStep()
{
    if (ValidateCurrentStep())
    {
        currentStep++;
        UpdateAvailableSteps();
        stepSelector.SelectedIndex = currentStep;
    }
}
```

### Pattern 3: Feature Trial

```csharp
private void ConfigureTrialAccess(DateTime trialExpiration)
{
    bool isTrialActive = DateTime.Now < trialExpiration;
    
    // Premium features (indices 2, 3) available during trial
    premiumSelector.SetItemEnabled(2, isTrialActive);
    premiumSelector.SetItemEnabled(3, isTrialActive);
    
    if (!isTrialActive && (premiumSelector.SelectedIndex == 2 || premiumSelector.SelectedIndex == 3))
    {
        // Revert to basic option
        premiumSelector.SelectedIndex = 0;
        ShowTrialExpiredMessage();
    }
}
```

### Pattern 4: Data-Driven Availability

```csharp
private void UpdateExportOptions(List<ExportFormat> availableFormats)
{
    // Export formats: PDF (0), Excel (1), Word (2), PowerPoint (3)
    
    var formatMap = new Dictionary<ExportFormat, int>
    {
        { ExportFormat.PDF, 0 },
        { ExportFormat.Excel, 1 },
        { ExportFormat.Word, 2 },
        { ExportFormat.PowerPoint, 3 }
    };
    
    // Disable all first
    for (int i = 0; i < 4; i++)
    {
        exportSelector.SetItemEnabled(i, false);
    }
    
    // Enable available formats
    foreach (var format in availableFormats)
    {
        if (formatMap.ContainsKey(format))
        {
            exportSelector.SetItemEnabled(formatMap[format], true);
        }
    }
    
    // Auto-select first available
    var firstAvailable = availableFormats.FirstOrDefault();
    if (firstAvailable != default(ExportFormat) && formatMap.ContainsKey(firstAvailable))
    {
        exportSelector.SelectedIndex = formatMap[firstAvailable];
    }
}
```

## Visual Appearance

Disabled items have distinct visual styling to indicate they're not available.

### Default Disabled Appearance

- **Background:** Lighter/dimmed background color
- **Foreground:** Gray text color
- **Cursor:** Default cursor (not pointer)
- **Interaction:** No hover effect, not clickable

### Custom Disabled Styling

```xaml
<syncfusion:SfSegmentedControl x:Name="segmentedControl">
    <syncfusion:SfSegmentedControl.Resources>
        <ResourceDictionary>
            <ResourceDictionary.ThemeDictionaries>
                <ResourceDictionary x:Key="Light">
                    <SolidColorBrush x:Key="SyncfusionSegmentedItemDisabledBackground" Color="#E0E0E0"/>
                    <SolidColorBrush x:Key="SyncfusionSegmentedItemDisabledForeground" Color="#9E9E9E"/>
                </ResourceDictionary>
                <ResourceDictionary x:Key="Dark">
                    <SolidColorBrush x:Key="SyncfusionSegmentedItemDisabledBackground" Color="#424242"/>
                    <SolidColorBrush x:Key="SyncfusionSegmentedItemDisabledForeground" Color="#757575"/>
                </ResourceDictionary>
            </ResourceDictionary.ThemeDictionaries>
        </ResourceDictionary>
    </syncfusion:SfSegmentedControl.Resources>
</syncfusion:SfSegmentedControl>
```

## Best Practices

### 1. Call After ItemsSource is Set

```csharp
private void InitializeSegments()
{
    // Set items first
    segmentedControl.ItemsSource = GetItems();
    
    // Then configure disabled state
    segmentedControl.Loaded += (s, e) =>
    {
        segmentedControl.SetItemEnabled(2, false);
    };
}
```

**Why:** Ensures items exist before trying to disable them.

### 2. Handle Selection When Disabling

```csharp
private void DisableItemSafely(int index)
{
    // If currently selected item is being disabled, change selection
    if (segmentedControl.SelectedIndex == index)
    {
        // Find first enabled item
        for (int i = 0; i < segmentedControl.Items.Count; i++)
        {
            if (i != index) // Skip the item being disabled
            {
                segmentedControl.SelectedIndex = i;
                break;
            }
        }
    }
    
    segmentedControl.SetItemEnabled(index, false);
}
```

**Why:** Prevents having a disabled item selected.

### 3. Provide User Feedback

```csharp
private void ShowUpgradePrompt(int disabledFeatureIndex)
{
    string featureName = GetFeatureName(disabledFeatureIndex);
    
    var dialog = new ContentDialog
    {
        Title = "Premium Feature",
        Content = $"{featureName} is only available in the Premium plan.\n\nWould you like to upgrade?",
        PrimaryButtonText = "Upgrade",
        CloseButtonText = "Cancel",
        XamlRoot = this.XamlRoot
    };
    
    var result = await dialog.ShowAsync();
    if (result == ContentDialogResult.Primary)
    {
        NavigateToUpgradePage();
    }
}
```

**Why:** Explains why options are unavailable and provides upgrade path.

### 4. Track Disabled State

```csharp
private class SegmentState
{
    public Dictionary<int, bool> EnabledStates { get; } = new Dictionary<int, bool>();
    
    public void SetItemEnabled(SfSegmentedControl control, int index, bool isEnabled)
    {
        control.SetItemEnabled(index, isEnabled);
        EnabledStates[index] = isEnabled;
    }
    
    public bool IsItemEnabled(int index)
    {
        return EnabledStates.TryGetValue(index, out bool enabled) ? enabled : true;
    }
}
```

**Why:** There's no built-in method to query enabled state.

## Troubleshooting

### Items Not Disabling

**Problem:** SetItemEnabled has no visual effect.

**Solutions:**
1. Call after ItemsSource is populated
2. Use Loaded event to ensure control is fully initialized
3. Verify index is within valid range (0 to Items.Count - 1)
4. Check if custom styles are overriding disabled appearance

### Selected Item Still Disabled

**Problem:** Currently selected item becomes disabled but remains selected.

**Solution:** Change selection before disabling:

```csharp
if (segmentedControl.SelectedIndex == indexToDisable)
{
    segmentedControl.SelectedIndex = 0; // Or another valid index
}
segmentedControl.SetItemEnabled(indexToDisable, false);
```

### Disabled Appearance Not Visible

**Problem:** Disabled items look the same as enabled items.

**Solution:** Ensure theme keys are not overridden. Check custom styles don't set disabled colors to match enabled colors.
