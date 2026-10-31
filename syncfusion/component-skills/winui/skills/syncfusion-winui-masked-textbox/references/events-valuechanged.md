# Events — ValueChanged in WinUI Masked TextBox

This file continues [events.md](events.md) with the `ValueChanged` event, combining both events, validation scenarios, and a complete contact form example.

## ValueChanged Event

The `ValueChanged` event fires **after** the `Value` property changes. Use this for updating UI, saving data, or validating completed input.

### Event Arguments

**MaskedTextBoxValueChangedEventArgs** provides:

| Property | Type | Description |
|----------|------|-------------|
| `NewValue` | string | The new value after change |
| `OldValue` | string | The previous value |
| `IsMaskCompleted` | bool | Whether all required mask positions are filled |

### Basic Usage

```xaml
<syncfusion:SfMaskedTextBox x:Name="phoneInput"
                            Mask="(000) 000-0000"
                            ValueChanged="PhoneInput_ValueChanged"/>
```

**Code-behind:**

```csharp
private void PhoneInput_ValueChanged(object sender, MaskedTextBoxValueChangedEventArgs e)
{
    // Access values
    string newValue = e.NewValue;
    string oldValue = e.OldValue;
    
    // Check if mask is fully completed
    bool isComplete = e.IsMaskCompleted;
    
    // Update UI or perform actions
    if (isComplete)
    {
        statusText.Text = $"Phone number: {newValue}";
    }
}
```

### Example 1: Check Mask Completion

Show a success message when input is complete:

```csharp
private void SsnInput_ValueChanged(object sender, MaskedTextBoxValueChangedEventArgs e)
{
    if (e.IsMaskCompleted)
    {
        statusIcon.Glyph = "\uE73E"; // Checkmark
        statusIcon.Foreground = new SolidColorBrush(Colors.Green);
        statusText.Text = "SSN entered successfully";
    }
    else
    {
        statusIcon.Glyph = "\uE7BA"; // Error
        statusIcon.Foreground = new SolidColorBrush(Colors.Red);
        statusText.Text = "Please complete all 9 digits";
    }
}
```

### Example 2: Real-Time Validation

Validate input as the user types:

```csharp
private void EmailInput_ValueChanged(object sender, MaskedTextBoxValueChangedEventArgs e)
{
    if (string.IsNullOrWhiteSpace(e.NewValue))
    {
        emailError.Text = "";
        return;
    }
    
    // Check for valid email patterns
    if (e.NewValue.Contains("@") && e.NewValue.Contains("."))
    {
        emailError.Text = "";
        emailIcon.Glyph = "\uE73E"; // Checkmark
        emailIcon.Foreground = new SolidColorBrush(Colors.Green);
    }
    else
    {
        emailError.Text = "Invalid email format";
        emailIcon.Glyph = "\uE7BA"; // Error
        emailIcon.Foreground = new SolidColorBrush(Colors.Red);
    }
}
```

### Example 3: Update Related Fields

Update other fields based on masked input:

```csharp
private void PhoneInput_ValueChanged(object sender, MaskedTextBoxValueChangedEventArgs e)
{
    if (e.IsMaskCompleted)
    {
        // Extract area code
        string areaCode = e.NewValue.Substring(0, 3);
        
        // Update region label based on area code
        if (areaCode == "212" || areaCode == "718")
        {
            regionLabel.Text = "Region: New York";
        }
        else if (areaCode == "415" || areaCode == "510")
        {
            regionLabel.Text = "Region: San Francisco Bay Area";
        }
        else
        {
            regionLabel.Text = "Region: Unknown";
        }
    }
}
```

### Example 4: Enable/Disable Controls

Enable a submit button only when input is complete:

```csharp
private void FormField_ValueChanged(object sender, MaskedTextBoxValueChangedEventArgs e)
{
    // Enable submit button only if all fields are complete
    submitButton.IsEnabled = CheckAllFieldsComplete();
}

private bool CheckAllFieldsComplete()
{
    return !string.IsNullOrWhiteSpace(nameInput.Text) &&
           phoneInput.Value?.Length == 10 &&
           ssnInput.Value?.Length == 9 &&
           emailInput.Value?.Contains("@") == true;
}
```

### Example 5: Auto-Format Display

Update a preview label with formatted text:

```csharp
private void CreditCardInput_ValueChanged(object sender, MaskedTextBoxValueChangedEventArgs e)
{
    if (e.IsMaskCompleted)
    {
        // Display masked version (last 4 digits only)
        string lastFour = e.NewValue.Substring(e.NewValue.Length - 4);
        previewLabel.Text = $"Card ending in {lastFour}";
    }
    else
    {
        previewLabel.Text = "Enter card number";
    }
}
```

## Combining Both Events

Use `ValueChanging` for prevention and `ValueChanged` for updates:

### Example: Phone Number Validation

```xaml
<StackPanel Padding="20">
    <TextBlock Text="Phone Number" FontWeight="SemiBold" Margin="0,0,0,4"/>
    
    <syncfusion:SfMaskedTextBox x:Name="phoneInput"
                                Width="200"
                                HorizontalAlignment="Left"
                                Mask="(000) 000-0000"
                                ValueChanging="PhoneInput_ValueChanging"
                                ValueChanged="PhoneInput_ValueChanged"/>
    
    <TextBlock x:Name="phoneError" 
               Foreground="Red" 
               Visibility="Collapsed" 
               Margin="0,4,0,0"/>
    
    <TextBlock x:Name="phoneStatus" 
               Foreground="Green" 
               Margin="0,4,0,0"/>
</StackPanel>
```

**Code-behind:**

```csharp
// Prevent blacklisted numbers
private void PhoneInput_ValueChanging(object sender, MaskedTextBoxValueChangingEventArgs e)
{
    // Block 555 area codes
    if (e.NewValue.StartsWith("555"))
    {
        e.Cancel = true;
        phoneError.Text = "555 area code is not allowed";
        phoneError.Visibility = Visibility.Visible;
    }
    else
    {
        phoneError.Visibility = Visibility.Collapsed;
    }
}

// Validate complete input
private void PhoneInput_ValueChanged(object sender, MaskedTextBoxValueChangedEventArgs e)
{
    if (e.IsMaskCompleted)
    {
        phoneStatus.Text = $"✓ Valid phone number: {e.NewValue}";
        phoneStatus.Foreground = new SolidColorBrush(Colors.Green);
    }
    else
    {
        phoneStatus.Text = "Please complete all 10 digits";
        phoneStatus.Foreground = new SolidColorBrush(Colors.Gray);
    }
}
```

## Validation Scenarios

### Scenario 1: Required Field Check

Ensure field is not empty on submit:

```csharp
private async void SubmitButton_Click(object sender, RoutedEventArgs e)
{
    if (string.IsNullOrWhiteSpace(ssnInput.Value))
    {
        await ShowErrorDialog("SSN is required");
        return;
    }
    
    if (ssnInput.Value.Length < 9)
    {
        await ShowErrorDialog("SSN must be 9 digits");
        return;
    }
    
    // Submit form
    await SubmitFormAsync();
}
```

### Scenario 2: Cross-Field Validation

Validate that two fields match:

```csharp
private void ConfirmPhoneInput_ValueChanged(object sender, MaskedTextBoxValueChangedEventArgs e)
{
    if (e.IsMaskCompleted)
    {
        if (phoneInput.Value == confirmPhoneInput.Value)
        {
            matchStatus.Text = "✓ Phone numbers match";
            matchStatus.Foreground = new SolidColorBrush(Colors.Green);
        }
        else
        {
            matchStatus.Text = "✗ Phone numbers do not match";
            matchStatus.Foreground = new SolidColorBrush(Colors.Red);
        }
    }
}
```

### Scenario 3: Async Validation

Validate against an API (e.g., check if phone number exists):

```csharp
private async void PhoneInput_ValueChanged(object sender, MaskedTextBoxValueChangedEventArgs e)
{
    if (e.IsMaskCompleted)
    {
        // Show loading indicator
        loadingRing.IsActive = true;
        statusText.Text = "Validating phone number...";
        
        // Call API to verify
        bool isValid = await VerifyPhoneNumberAsync(e.NewValue);
        
        loadingRing.IsActive = false;
        
        if (isValid)
        {
            statusText.Text = "✓ Phone number verified";
            statusText.Foreground = new SolidColorBrush(Colors.Green);
        }
        else
        {
            statusText.Text = "✗ Phone number could not be verified";
            statusText.Foreground = new SolidColorBrush(Colors.Orange);
        }
    }
}

private async Task<bool> VerifyPhoneNumberAsync(string phoneNumber)
{
    // Simulate API call
    await Task.Delay(1000);
    
    // Return true if valid, false otherwise
    return phoneNumber != "(555) 123-4567"; // Example blacklist
}
```

### Scenario 4: Date Range Validation

Validate that a date is within an acceptable range:

```csharp
private void DateInput_ValueChanged(object sender, MaskedTextBoxValueChangedEventArgs e)
{
    if (e.IsMaskCompleted)
    {
        if (DateTime.TryParseExact(e.NewValue, "MM/dd/yyyy", 
            CultureInfo.InvariantCulture, DateTimeStyles.None, out DateTime enteredDate))
        {
            DateTime minDate = DateTime.Now.AddYears(-100);
            DateTime maxDate = DateTime.Now;
            
            if (enteredDate < minDate)
            {
                dateError.Text = "Date cannot be more than 100 years ago";
                dateError.Visibility = Visibility.Visible;
            }
            else if (enteredDate > maxDate)
            {
                dateError.Text = "Future dates are not allowed";
                dateError.Visibility = Visibility.Visible;
            }
            else
            {
                dateError.Visibility = Visibility.Collapsed;
                dateSuccess.Text = $"✓ Valid date: {enteredDate:MMMM dd, yyyy}";
                dateSuccess.Visibility = Visibility.Visible;
            }
        }
        else
        {
            dateError.Text = "Invalid date format";
            dateError.Visibility = Visibility.Visible;
        }
    }
}
```

## Complete Example: Contact Form

```xaml
<StackPanel Padding="20" Spacing="16">
    <TextBlock Text="Contact Information" 
               FontSize="24" 
               FontWeight="Bold"/>
    
    <!-- Phone Number -->
    <StackPanel>
        <TextBlock Text="Phone Number*" FontWeight="SemiBold" Margin="0,0,0,4"/>
        <syncfusion:SfMaskedTextBox x:Name="phoneInput"
                                    Width="250"
                                    HorizontalAlignment="Left"
                                    Mask="(000) 000-0000"
                                    ValueChanging="PhoneInput_ValueChanging"
                                    ValueChanged="PhoneInput_ValueChanged"/>
        <TextBlock x:Name="phoneError" 
                   Foreground="Red" 
                   FontSize="12" 
                   Visibility="Collapsed" 
                   Margin="0,4,0,0"/>
        <TextBlock x:Name="phoneStatus" 
                   Foreground="Gray" 
                   FontSize="12" 
                   Margin="0,4,0,0"/>
    </StackPanel>
    
    <!-- Email -->
    <StackPanel>
        <TextBlock Text="Email*" FontWeight="SemiBold" Margin="0,0,0,4"/>
        <syncfusion:SfMaskedTextBox x:Name="emailInput"
                                    Width="350"
                                    HorizontalAlignment="Left"
                                    MaskType="RegEx"
                                    Mask="[A-Za-z0-9._%-]+@[A-Za-z0-9]+\.[A-Za-z]{2,3}"
                                    ValueChanged="EmailInput_ValueChanged"/>
        <TextBlock x:Name="emailStatus" 
                   Foreground="Gray" 
                   FontSize="12" 
                   Margin="0,4,0,0"/>
    </StackPanel>
    
    <!-- Submit Button -->
    <Button x:Name="submitButton" 
            Content="Submit" 
            Click="SubmitButton_Click"
            IsEnabled="False"
            Width="120"
            HorizontalAlignment="Left"
            Margin="0,16,0,0"/>
</StackPanel>
```

**Code-behind:**

```csharp
private void PhoneInput_ValueChanging(object sender, MaskedTextBoxValueChangingEventArgs e)
{
    // Prevent test numbers
    if (e.NewValue.StartsWith("555"))
    {
        e.Cancel = true;
        phoneError.Text = "Test phone numbers (555) are not allowed";
        phoneError.Visibility = Visibility.Visible;
    }
    else
    {
        phoneError.Visibility = Visibility.Collapsed;
    }
}

private void PhoneInput_ValueChanged(object sender, MaskedTextBoxValueChangedEventArgs e)
{
    if (e.IsMaskCompleted)
    {
        phoneStatus.Text = "✓ Phone number complete";
        phoneStatus.Foreground = new SolidColorBrush(Colors.Green);
    }
    else
    {
        phoneStatus.Text = "Complete all 10 digits";
        phoneStatus.Foreground = new SolidColorBrush(Colors.Gray);
    }
    
    UpdateSubmitButtonState();
}

private void EmailInput_ValueChanged(object sender, MaskedTextBoxValueChangedEventArgs e)
{
    if (!string.IsNullOrWhiteSpace(e.NewValue))
    {
        emailStatus.Text = "✓ Email format valid";
        emailStatus.Foreground = new SolidColorBrush(Colors.Green);
    }
    else
    {
        emailStatus.Text = "";
    }
    
    UpdateSubmitButtonState();
}

private void UpdateSubmitButtonState()
{
    submitButton.IsEnabled = 
        phoneInput.Value?.Length == 10 &&
        !string.IsNullOrWhiteSpace(emailInput.Value);
}

private async void SubmitButton_Click(object sender, RoutedEventArgs e)
{
    var contact = new Contact
    {
        Phone = phoneInput.Value,
        Email = emailInput.Value
    };
    
    await SaveContactAsync(contact);
}
```

## Key Takeaways

- **ValueChanging:** Fires before change, cancelable, use for prevention and real-time validation
- **ValueChanged:** Fires after change, not cancelable, use for UI updates and validation
- **IsMaskCompleted:** Check if all required positions are filled
- **Cancel property:** Set `e.Cancel = true` in ValueChanging to prevent input
- **IsValid property:** Override to disable default mask validation
- **Combine both events:** Use ValueChanging for prevention, ValueChanged for updates
- **Async validation:** Use ValueChanged with async/await for API calls

## Next Steps

- **[Error Indication](error-indication.md)** - Display validation errors with visual feedback
- **[Value Formatting](value-formatting.md)** - Control how values include prompts and literals
- **[Getting Started](getting-started.md)** - Installation and basic usage
