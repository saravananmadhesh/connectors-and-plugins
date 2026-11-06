# Error Indication — Dynamic Validation in WinUI Masked TextBox

This file continues [error-indication.md](error-indication.md) with dynamic validation using events, common validation scenarios, and a complete form example.

## Dynamic Error Indication with Events

Use the `ValueChanged` event to validate input and set error state dynamically.

### Example 1: SSN Validation

```xaml
<syncfusion:SfMaskedTextBox x:Name="ssnInput"
                            Mask="000-00-0000"
                            ValueChanged="SsnInput_ValueChanged"/>
```

**Code-behind:**

```csharp
private void SsnInput_ValueChanged(object sender, MaskedTextBoxValueChangedEventArgs e)
{
    if (e.IsMaskCompleted)
    {
        // Validate SSN format (e.g., check if it's all zeros or invalid pattern)
        if (e.NewValue == "000-00-0000" || e.NewValue == "123-45-6789")
        {
            ssnInput.ErrorType = ErrorType.Critical;
            ssnInput.ErrorContent = "Invalid SSN number";
        }
        else
        {
            ssnInput.ErrorType = ErrorType.Success;
            ssnInput.ErrorContent = "SSN validated";
        }
    }
    else
    {
        ssnInput.ErrorType = ErrorType.Default;
        ssnInput.ErrorContent = "Please complete all 9 digits";
    }
}
```

### Example 2: Phone Number Verification

```xaml
<syncfusion:SfMaskedTextBox x:Name="phoneInput"
                            Mask="(000) 000-0000"
                            ValueChanged="PhoneInput_ValueChanged"/>
```

**Code-behind:**

```csharp
private async void PhoneInput_ValueChanged(object sender, MaskedTextBoxValueChangedEventArgs e)
{
    if (e.IsMaskCompleted)
    {
        phoneInput.ErrorType = ErrorType.Information;
        phoneInput.ErrorContent = "Verifying phone number...";
        
        // Simulate API call to verify phone number
        bool isValid = await VerifyPhoneNumberAsync(e.NewValue);
        
        if (isValid)
        {
            phoneInput.ErrorType = ErrorType.Success;
            phoneInput.ErrorContent = "Phone number verified";
        }
        else
        {
            phoneInput.ErrorType = ErrorType.Warning;
            phoneInput.ErrorContent = "Unable to verify phone number";
        }
    }
    else
    {
        phoneInput.ErrorType = ErrorType.None;
        phoneInput.ErrorContent = string.Empty;
    }
}

private async Task<bool> VerifyPhoneNumberAsync(string phoneNumber)
{
    // Simulate API call
    await Task.Delay(500);
    
    // Example: Check if area code is valid
    string areaCode = phoneNumber.Substring(0, 3);
    return areaCode != "555"; // Reject 555 area codes
}
```

### Example 3: Email Validation with RegEx

```xaml
<syncfusion:SfMaskedTextBox x:Name="emailInput"
                            MaskType="RegEx"
                            Mask="[A-Za-z0-9._%-]+@[A-Za-z0-9]+\.[A-Za-z]{2,3}"
                            ValueChanged="EmailInput_ValueChanged"/>
```

**Code-behind:**

```csharp
private void EmailInput_ValueChanged(object sender, MaskedTextBoxValueChangedEventArgs e)
{
    if (string.IsNullOrWhiteSpace(e.NewValue))
    {
        emailInput.ErrorType = ErrorType.None;
        emailInput.ErrorContent = string.Empty;
        return;
    }
    
    // Check for common email mistakes
    if (e.NewValue.Contains("@gmail.com") || 
        e.NewValue.Contains("@yahoo.com") || 
        e.NewValue.Contains("@outlook.com"))
    {
        emailInput.ErrorType = ErrorType.Success;
        emailInput.ErrorContent = "Valid email address";
    }
    else
    {
        emailInput.ErrorType = ErrorType.Warning;
        emailInput.ErrorContent = "Uncommon email domain";
    }
}
```

## Validation Scenarios

### Scenario 1: Required Field Validation

Show error if field is empty on form submission.

```csharp
private bool ValidateForm()
{
    bool isValid = true;
    
    if (string.IsNullOrWhiteSpace(ssnInput.Value))
    {
        ssnInput.ErrorType = ErrorType.Critical;
        ssnInput.ErrorContent = "SSN is required";
        isValid = false;
    }
    
    if (string.IsNullOrWhiteSpace(phoneInput.Value))
    {
        phoneInput.ErrorType = ErrorType.Critical;
        phoneInput.ErrorContent = "Phone number is required";
        isValid = false;
    }
    
    return isValid;
}
```

### Scenario 2: Real-Time Validation

Validate as the user types.

```csharp
private void ProductKeyInput_ValueChanging(object sender, MaskedTextBoxValueChangingEventArgs e)
{
    // Check if current input matches expected pattern
    if (e.NewValue.StartsWith("INV"))
    {
        productKeyInput.ErrorType = ErrorType.Critical;
        productKeyInput.ErrorContent = "Product key cannot start with 'INV'";
        e.Cancel = true; // Prevent invalid input
    }
    else
    {
        productKeyInput.ErrorType = ErrorType.None;
        productKeyInput.ErrorContent = string.Empty;
    }
}
```

### Scenario 3: Multi-Field Validation

Validate related fields together.

```csharp
private void ValidatePasswordFields()
{
    if (passwordInput.Value != confirmPasswordInput.Value)
    {
        confirmPasswordInput.ErrorType = ErrorType.Critical;
        confirmPasswordInput.ErrorContent = "Passwords do not match";
    }
    else if (!string.IsNullOrEmpty(passwordInput.Value))
    {
        confirmPasswordInput.ErrorType = ErrorType.Success;
        confirmPasswordInput.ErrorContent = "Passwords match";
    }
}
```

### Scenario 4: Date Range Validation

Validate date is within acceptable range.

```csharp
private void DateInput_ValueChanged(object sender, MaskedTextBoxValueChangedEventArgs e)
{
    if (e.IsMaskCompleted)
    {
        if (DateTime.TryParse(e.NewValue, out DateTime enteredDate))
        {
            if (enteredDate < DateTime.Now.AddYears(-100))
            {
                dateInput.ErrorType = ErrorType.Warning;
                dateInput.ErrorContent = "Date is more than 100 years ago";
            }
            else if (enteredDate > DateTime.Now)
            {
                dateInput.ErrorType = ErrorType.Critical;
                dateInput.ErrorContent = "Future dates are not allowed";
            }
            else
            {
                dateInput.ErrorType = ErrorType.Success;
                dateInput.ErrorContent = "Valid date";
            }
        }
        else
        {
            dateInput.ErrorType = ErrorType.Default;
            dateInput.ErrorContent = "Invalid date format";
        }
    }
}
```

## Clearing Error State

Reset error state when user corrects input:

```csharp
private void ResetErrorState()
{
    maskedTextBox.ErrorType = ErrorType.None;
    maskedTextBox.ErrorContent = string.Empty;
}
```

Or on focus:

```csharp
private void MaskedTextBox_GotFocus(object sender, RoutedEventArgs e)
{
    // Clear error when user starts editing
    if (maskedTextBox.ErrorType != ErrorType.Success)
    {
        maskedTextBox.ErrorType = ErrorType.None;
        maskedTextBox.ErrorContent = string.Empty;
    }
}
```

## Complete Example: Form Validation

```xaml
<StackPanel Padding="20">
    <TextBlock Text="Contact Information" 
               FontSize="20" 
               FontWeight="Bold" 
               Margin="0,0,0,20"/>
    
    <TextBlock Text="SSN:*" Margin="0,0,0,4"/>
    <syncfusion:SfMaskedTextBox x:Name="ssnInput"
                                Width="200"
                                HorizontalAlignment="Left"
                                Mask="000-00-0000"
                                ValueChanged="SsnInput_ValueChanged"
                                Margin="0,0,0,16"/>
    
    <TextBlock Text="Phone:*" Margin="0,0,0,4"/>
    <syncfusion:SfMaskedTextBox x:Name="phoneInput"
                                Width="200"
                                HorizontalAlignment="Left"
                                Mask="(000) 000-0000"
                                ValueChanged="PhoneInput_ValueChanged"
                                Margin="0,0,0,16"/>
    
    <TextBlock Text="Email:*" Margin="0,0,0,4"/>
    <syncfusion:SfMaskedTextBox x:Name="emailInput"
                                Width="300"
                                HorizontalAlignment="Left"
                                MaskType="RegEx"
                                Mask="[A-Za-z0-9._%-]+@[A-Za-z0-9]+\.[A-Za-z]{2,3}"
                                ValueChanged="EmailInput_ValueChanged"
                                Margin="0,0,0,16"/>
    
    <Button Content="Submit" 
            Click="SubmitButton_Click"
            Width="100"
            HorizontalAlignment="Left"/>
</StackPanel>
```

**Code-behind:**

```csharp
private void SsnInput_ValueChanged(object sender, MaskedTextBoxValueChangedEventArgs e)
{
    if (e.IsMaskCompleted)
    {
        ssnInput.ErrorType = ErrorType.Success;
        ssnInput.ErrorContent = "Valid SSN";
    }
    else if (!string.IsNullOrWhiteSpace(e.NewValue))
    {
        ssnInput.ErrorType = ErrorType.Default;
        ssnInput.ErrorContent = "Complete all 9 digits";
    }
}

private void PhoneInput_ValueChanged(object sender, MaskedTextBoxValueChangedEventArgs e)
{
    if (e.IsMaskCompleted)
    {
        phoneInput.ErrorType = ErrorType.Success;
        phoneInput.ErrorContent = "Valid phone number";
    }
    else if (!string.IsNullOrWhiteSpace(e.NewValue))
    {
        phoneInput.ErrorType = ErrorType.Default;
        phoneInput.ErrorContent = "Complete all 10 digits";
    }
}

private void EmailInput_ValueChanged(object sender, MaskedTextBoxValueChangedEventArgs e)
{
    if (!string.IsNullOrWhiteSpace(e.NewValue))
    {
        emailInput.ErrorType = ErrorType.Success;
        emailInput.ErrorContent = "Valid email format";
    }
}

private async void SubmitButton_Click(object sender, RoutedEventArgs e)
{
    bool isValid = ValidateAllFields();
    
    if (isValid)
    {
        // Submit form
        await SubmitFormAsync();
    }
}

private bool ValidateAllFields()
{
    bool isValid = true;
    
    if (string.IsNullOrWhiteSpace(ssnInput.Value) || 
        ssnInput.Value.Length < 9)
    {
        ssnInput.ErrorType = ErrorType.Critical;
        ssnInput.ErrorContent = "SSN is required";
        isValid = false;
    }
    
    if (string.IsNullOrWhiteSpace(phoneInput.Value) || 
        phoneInput.Value.Length < 10)
    {
        phoneInput.ErrorType = ErrorType.Critical;
        phoneInput.ErrorContent = "Phone number is required";
        isValid = false;
    }
    
    if (string.IsNullOrWhiteSpace(emailInput.Value))
    {
        emailInput.ErrorType = ErrorType.Critical;
        emailInput.ErrorContent = "Email is required";
        isValid = false;
    }
    
    return isValid;
}
```

## Key Takeaways

- **ErrorType:** Sets validation state (None, Default, Warning, Information, Critical, Success)
- **ErrorContent:** Provides tooltip message explaining the error
- **CustomErrorIcon & CustomErrorBorderBrush:** Customize error appearance
- **Dynamic validation:** Use `ValueChanged` event to validate input and set error state
- **IsMaskCompleted:** Check if all required positions are filled
- **Clear error state** when user corrects input or on focus

## Next Steps

- **[Events](events.md)** - Handle ValueChanging and ValueChanged for validation
- **[Value Formatting](value-formatting.md)** - Control output format
- **[Customization](customization.md)** - Style the control with headers and descriptions
