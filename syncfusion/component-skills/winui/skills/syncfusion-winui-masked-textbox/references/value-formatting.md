# Value Formatting in WinUI Masked TextBox

The `Value` property returns the masked text with or without prompt and literal characters, controlled by the `ValueMaskFormat` property.

## Overview

When retrieving the value from a Masked TextBox, you can control which characters are included:

- **User-typed characters:** Always included
- **Prompt characters:** Placeholders for empty positions (e.g., `_`)
- **Literal characters:** Mask separators (e.g., `-`, `/`, `(`, `)`)

The `ValueMaskFormat` property has four options:

1. **ExcludePromptAndLiterals** (Default) - Only user-typed characters
2. **IncludePrompt** - User-typed + prompt characters
3. **IncludeLiterals** - User-typed + literal characters
4. **IncludePromptAndLiterals** - User-typed + prompts + literals

## ExcludePromptAndLiterals

Returns only the characters typed by the user, excluding prompts and literals.

**Use case:** When you need the raw data without formatting (e.g., saving to database).

```xaml
<syncfusion:SfMaskedTextBox Width="200"
                            MaskType="Simple"
                            Mask=">AAAAA-AAAAA-AAAAA-AAAAA"
                            PromptChar="_"
                            Value="DF321SD1A"
                            ValueMaskFormat="ExcludePromptAndLiterals"/>
```

**Display in control:** `DF321-SD1A_-_____-_____`

**Value property returns:** `DF321SD1A`

- No hyphens (literals excluded)
- No underscores (prompts excluded)

### Example: Saving Phone Number to Database

```xaml
<syncfusion:SfMaskedTextBox x:Name="phoneInput"
                            Mask="(000) 000-0000"
                            ValueMaskFormat="ExcludePromptAndLiterals"/>
```

**Code-behind:**

```csharp
private void SavePhoneNumber()
{
    string rawPhone = phoneInput.Value;
    // rawPhone = "5551234567" (no formatting)
    // Save to database without parentheses, spaces, or hyphens
    database.SavePhone(rawPhone);
}
```

## IncludePrompt

Returns user-typed characters and prompts, but excludes literals.

**Use case:** When you want to know which positions are unfilled.

```xaml
<syncfusion:SfMaskedTextBox Width="200"
                            MaskType="Simple"
                            Mask=">AAAAA-AAAAA-AAAAA-AAAAA"
                            PromptChar="_"
                            Value="DF321SD1A"
                            ValueMaskFormat="IncludePrompt"/>
```

**Display in control:** `DF321-SD1A_-_____-_____`

**Value property returns:** `DF321SD1A_______________`

- Hyphens removed (literals excluded)
- Underscores kept (prompts included)
- Total length matches mask positions (20 characters)

### Example: Checking Completion

```csharp
private bool IsProductKeyComplete()
{
    string valueWithPrompts = productKeyInput.Value;
    
    // If value contains prompt char, input is incomplete
    return !valueWithPrompts.Contains(productKeyInput.PromptChar);
}
```

## IncludeLiterals

Returns user-typed characters and literals, but excludes prompts.

**Use case:** When you want formatted output without showing empty positions.

```xaml
<syncfusion:SfMaskedTextBox Width="200"
                            MaskType="Simple"
                            Mask=">AAAAA-AAAAA-AAAAA-AAAAA"
                            PromptChar="_"
                            Value="DF321SD1A"
                            ValueMaskFormat="IncludeLiterals"/>
```

**Display in control:** `DF321-SD1A_-_____-_____`

**Value property returns:** `DF321-SD1A`

- Hyphens kept (literals included)
- Underscores removed (prompts excluded)
- Formatted but only includes filled positions

### Example: Display-Ready Phone Number

```xaml
<syncfusion:SfMaskedTextBox x:Name="phoneDisplay"
                            Mask="(000) 000-0000"
                            Value="5551234567"
                            ValueMaskFormat="IncludeLiterals"/>
```

**Code-behind:**

```csharp
private void DisplayPhoneNumber()
{
    string formattedPhone = phoneDisplay.Value;
    // formattedPhone = "(555) 123-4567"
    
    // Ready for display without prompts
    displayLabel.Text = formattedPhone;
}
```

## IncludePromptAndLiterals

Returns user-typed characters, prompts, and literals - the complete masked representation.

**Use case:** When you need the exact mask representation with all formatting.

```xaml
<syncfusion:SfMaskedTextBox Width="200"
                            MaskType="Simple"
                            Mask=">AAAAA-AAAAA-AAAAA-AAAAA"
                            PromptChar="_"
                            Value="DF321SD1A"
                            ValueMaskFormat="IncludePromptAndLiterals"/>
```

**Display in control:** `DF321-SD1A_-_____-_____`

**Value property returns:** `DF321-SD1A_-_____-_____`

- Hyphens kept (literals included)
- Underscores kept (prompts included)
- Exact match to displayed text

### Example: Copying Formatted Text

```csharp
private void CopyFormattedValue()
{
    string fullMaskedValue = maskedTextBox.Value;
    // fullMaskedValue = "(555) 123-____"
    
    // Copy to clipboard with visual formatting
    Clipboard.SetText(fullMaskedValue);
}
```

## Comparison Table

| ValueMaskFormat | User Input | Prompts | Literals | Use Case |
|-----------------|------------|---------|----------|----------|
| **ExcludePromptAndLiterals** | ✓ | ✗ | ✗ | Raw data (database) |
| **IncludePrompt** | ✓ | ✓ | ✗ | Check completion |
| **IncludeLiterals** | ✓ | ✗ | ✓ | Formatted display |
| **IncludePromptAndLiterals** | ✓ | ✓ | ✓ | Exact mask text |

### Example with All Formats

```xaml
<syncfusion:SfMaskedTextBox x:Name="ssnInput"
                            Mask="000-00-0000"
                            Value="123456789"
                            PromptChar="_"/>
```

**Display:** `123-45-6789`

**Code-behind:**

```csharp
// ExcludePromptAndLiterals (default)
ssnInput.ValueMaskFormat = MaskedTextBoxMaskFormat.ExcludePromptAndLiterals;
string raw = ssnInput.Value; // "123456789"

// IncludePrompt
ssnInput.ValueMaskFormat = MaskedTextBoxMaskFormat.IncludePrompt;
string withPrompts = ssnInput.Value; // "123456789" (no prompts if complete)

// IncludeLiterals
ssnInput.ValueMaskFormat = MaskedTextBoxMaskFormat.IncludeLiterals;
string formatted = ssnInput.Value; // "123-45-6789"

// IncludePromptAndLiterals
ssnInput.ValueMaskFormat = MaskedTextBoxMaskFormat.IncludePromptAndLiterals;
string full = ssnInput.Value; // "123-45-6789"
```

**When input is incomplete:**

```csharp
ssnInput.Value = "12345"; // User typed only 5 digits
```

**Display:** `123-45-____`

```csharp
// ExcludePromptAndLiterals
string raw = ssnInput.Value; // "12345"

// IncludePrompt
string withPrompts = ssnInput.Value; // "12345____"

// IncludeLiterals
string formatted = ssnInput.Value; // "123-45"

// IncludePromptAndLiterals
string full = ssnInput.Value; // "123-45-____"
```

## Clipboard Behavior

The `ValueMaskFormat` also affects clipboard operations (copy/paste).

### Copy Behavior

When the user copies text from the Masked TextBox:

```csharp
// User selects all text and presses Ctrl+C
// Copied text respects ValueMaskFormat setting
```

**Example:**

```xaml
<syncfusion:SfMaskedTextBox Mask="(000) 000-0000"
                            Value="5551234567"
                            ValueMaskFormat="IncludeLiterals"/>
```

**Copied text:** `(555) 123-4567` (includes parentheses, space, hyphen)

**With `ExcludePromptAndLiterals`:**

```xaml
<syncfusion:SfMaskedTextBox ValueMaskFormat="ExcludePromptAndLiterals"/>
```

**Copied text:** `5551234567` (raw digits only)

### Paste Behavior

When pasting text into the Masked TextBox, the control strips non-mask characters automatically:

```csharp
// User pastes "(555) 123-4567"
// Control extracts "5551234567" and applies mask
// Display: (555) 123-4567
```

The mask format doesn't affect paste - only valid characters are inserted.

## Practical Scenarios

### Scenario 1: Database Storage

**Goal:** Store raw phone number without formatting.

```xaml
<syncfusion:SfMaskedTextBox x:Name="phoneInput"
                            Mask="(000) 000-0000"
                            ValueMaskFormat="ExcludePromptAndLiterals"/>
```

```csharp
private async Task SaveContactAsync()
{
    var contact = new Contact
    {
        Name = nameInput.Text,
        Phone = phoneInput.Value // "5551234567"
    };
    
    await database.SaveAsync(contact);
}
```

### Scenario 2: Display Formatted Output

**Goal:** Show formatted value to user (e.g., in a confirmation dialog).

```xaml
<syncfusion:SfMaskedTextBox x:Name="ssnInput"
                            Mask="000-00-0000"
                            ValueMaskFormat="IncludeLiterals"/>
```

```csharp
private void ShowConfirmation()
{
    string formattedSSN = ssnInput.Value; // "123-45-6789"
    
    var dialog = new ContentDialog
    {
        Title = "Confirm SSN",
        Content = $"Your SSN: {formattedSSN}",
        PrimaryButtonText = "Confirm"
    };
    
    await dialog.ShowAsync();
}
```

### Scenario 3: Validation with Prompts

**Goal:** Validate that all positions are filled.

```xaml
<syncfusion:SfMaskedTextBox x:Name="productKeyInput"
                            Mask=">AAAAA-AAAAA-AAAAA-AAAAA"
                            PromptChar="_"
                            ValueMaskFormat="IncludePrompt"/>
```

```csharp
private bool ValidateProductKey()
{
    string valueWithPrompts = productKeyInput.Value;
    
    if (valueWithPrompts.Contains('_'))
    {
        errorText.Text = "Product key is incomplete";
        return false;
    }
    
    return true;
}
```

### Scenario 4: Export with Formatting

**Goal:** Export data to CSV with formatted values.

```xaml
<syncfusion:SfMaskedTextBox x:Name="phoneExport"
                            Mask="(000) 000-0000"
                            ValueMaskFormat="IncludeLiterals"/>
```

```csharp
private async Task ExportToCsvAsync()
{
    var csv = new StringBuilder();
    csv.AppendLine("Name,Phone");
    
    foreach (var contact in contacts)
    {
        phoneExport.Value = contact.Phone;
        string formattedPhone = phoneExport.Value; // "(555) 123-4567"
        
        csv.AppendLine($"{contact.Name},{formattedPhone}");
    }
    
    await File.WriteAllTextAsync("contacts.csv", csv.ToString());
}
```

## Dynamic Format Switching

You can change the format at runtime based on context:

```csharp
private void OnSaveButtonClick(object sender, RoutedEventArgs e)
{
    // Switch to raw format for saving
    phoneInput.ValueMaskFormat = MaskedTextBoxMaskFormat.ExcludePromptAndLiterals;
    string rawValue = phoneInput.Value;
    
    SaveToDatabase(rawValue);
}

private void OnDisplayButtonClick(object sender, RoutedEventArgs e)
{
    // Switch to formatted for display
    phoneInput.ValueMaskFormat = MaskedTextBoxMaskFormat.IncludeLiterals;
    string formattedValue = phoneInput.Value;
    
    ShowInDialog(formattedValue);
}
```

## Key Takeaways

- **ExcludePromptAndLiterals:** Best for database storage (raw data)
- **IncludePrompt:** Best for completion checking (detects unfilled positions)
- **IncludeLiterals:** Best for user display (formatted without prompts)
- **IncludePromptAndLiterals:** Best for exact mask representation
- **Clipboard operations** respect the `ValueMaskFormat` setting
- **Format can be changed dynamically** based on save/display context

## Next Steps

- **[Mask Types](mask-types.md)** - Learn about Simple and RegEx mask patterns
- **[Events](events.md)** - Handle value changes and validation
- **[Error Indication](error-indication.md)** - Display validation errors
