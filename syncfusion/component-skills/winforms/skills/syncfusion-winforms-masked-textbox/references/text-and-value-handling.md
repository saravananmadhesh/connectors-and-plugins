# Text and Value Handling

## Table of Contents
- [Overview](#overview)
- [Text Property](#text-property)
- [ClipText Property](#cliptext-property)
- [Comparing Text vs ClipText](#comparing-text-vs-cliptext)
- [Setting Input Data](#setting-input-data)
- [DataGroups Configuration](#datagroups-configuration)
- [Separator Settings](#separator-settings)
- [Input Validation](#input-validation)

## Overview

The MaskedEditBox provides two primary properties for accessing input data:
- **Text** - Includes mask literal characters (formatted output)
- **ClipText** - Contains only mask characters, excluding literals (raw data, respects `ClipMode`)

Understanding the difference is crucial for proper data handling in your application.

## Text Property

The **Text** property returns the complete input **including literal characters** defined in the mask.

### Behavior

When mask is `(###) ###-####` and user enters `1234567890`:
```csharp
maskedEditBox.Text;  // Result: "(123) 456-7890"
```

### Use Cases

**Use Text when:**
- Displaying formatted output to users
- Showing confirmation dialogs with formatted data
- Storing display-formatted data
- Printing or exporting user-visible formats

### Examples

```csharp
// Phone number display
maskedEditBox.Mask = "(###) ###-####";
string displayPhone = maskedEditBox.Text;  // "(123) 456-7890"

// Social Security display
maskedEditBox.Mask = "###-##-####";
string displaySSN = maskedEditBox.Text;    // "123-45-6789"

// Credit card display
maskedEditBox.Mask = "####-####-####-####";
string displayCC = maskedEditBox.Text;     // "1234-5678-9012-3456"
```

### Setting Text Programmatically

```csharp
// Set with formatting (control parses it)
maskedEditBox.Text = "(123) 456-7890";
// Control extracts digits and reformats: "(123) 456-7890"

// Set with digits only (control applies mask)
maskedEditBox.Text = "1234567890";
// Control formats: "(123) 456-7890"

// Clear input
maskedEditBox.Text = "";
```

## ClipText Property

The **ClipText** property returns **only the mask characters**, excluding literal characters defined in the mask. Its output is governed by the `ClipMode` setting.

### Behavior

When mask is `(###) ###-####`, `ClipMode = ExcludeLiterals`, and user enters `1234567890`:
```csharp
maskedEditBox.ClipText;  // Result: "1234567890"
```

### Use Cases

**Use ClipText when:**
- Saving to database (store only data)
- Transferring data via APIs
- Comparing or validating actual data
- Avoiding storage of formatting characters

### Examples

```csharp
// Store phone in database
maskedEditBox.ClipMode = ClipModes.ExcludeLiterals;
maskedEditBox.Mask = "(###) ###-####";
string phoneForDB = maskedEditBox.ClipText;  // "1234567890" (no formatting)
database.SavePhone(phoneForDB);

// API transmission
string dataToSend = maskedEditBox.ClipText;  // Clean data
apiClient.SendData(dataToSend);

// Validation
if (maskedEditBox.ClipText.Length == 10)
{
    // Valid 10-digit phone number
}
```

### Clearing Input

```csharp
maskedEditBox.Text = "";  // Use Text to clear the input
```

## Comparing Text vs ClipText

### Side-by-Side Comparison

```csharp
maskedEditBox.Mask = "(###) ###-####";
maskedEditBox.ClipMode = ClipModes.ExcludeLiterals;

// User enters: 5551234567

maskedEditBox.Text;        // "(555) 123-4567" (with mask literals)
maskedEditBox.ClipText;    // "5551234567"     (digits only)

// Length differences
maskedEditBox.Text.Length;     // 14 characters
maskedEditBox.ClipText.Length; // 10 characters
```

### Decision Matrix

| Scenario | Use Text | Use ClipText |
|----------|----------|--------------|
| Display to user | ✓ | ✗ |
| Store in database | ✗ | ✓ |
| Send to API | ✗ | ✓ |
| Validate length | ✗ | ✓ |
| Validate format | ✓ | ✗ |
| Print/Export | ✓ | ✗ |
| Compare values | ✗ | ✓ |

### Practical Example

```csharp
private void SavePhoneNumber()
{
    // Display with formatting
    MessageBox.Show("Phone entered: " + maskedEditBox.Text);  // "(555) 123-4567"

    // Store without formatting
    string phoneData = maskedEditBox.ClipText;  // "5551234567"

    // Validate
    if (phoneData.Length != 10)
    {
        MessageBox.Show("Invalid phone number");
        return;
    }

    // Save to database
    database.SavePhone(phoneData);
}
```

## Setting Input Data

### Programmatically Setting Values

**Option 1: Set with formatted text (control parses)**

```csharp
maskedEditBox.Mask = "(###) ###-####";
maskedEditBox.Text = "(555) 123-4567";
// Result: Text="(555) 123-4567", ClipText="5551234567"
```

**Option 2: Set with digits only (control formats)**

```csharp
maskedEditBox.Mask = "(###) ###-####";
maskedEditBox.Text = "5551234567";
// Result: Text="(555) 123-4567", ClipText="5551234567"
```

**Option 3: Use assignment directly**

```csharp
maskedEditBox.Mask = "(###) ###-####";
maskedEditBox.Text = "5551234567";
// Control auto-applies mask: Text="(555) 123-4567"
```

### Loading Data from Database

```csharp
// Retrieve phone from database (stored without formatting)
string phoneFromDB = database.GetPhone(customerId);  // "5551234567"

// Apply mask for display
maskedEditBox.Mask = "(###) ###-####";
maskedEditBox.Text = phoneFromDB;
// User sees: "(555) 123-4567"
```

## DataGroups Configuration

The `DataGroups` property of a `MaskedEditBox` defines a virtual grouping of the mask value. Each group is an `MaskedEditDataGroupInfo` object added to the `DataGroups` collection (`MaskedEditDataGroupInfoCollection`).

A group is defined by:
- `DataGroupName` – A string identifier (e.g., `"One"`, `"Two"`).
- `DataGroupSize` – The number of mask positions the group covers.
- `DataGroupAlignment` – Alignment of the filled-in mask fields within the group, using the `MaskGroupAlignment` enum (`Left`, `Right`, `Center`, and `None` to disable alignment).
- `Value` – Returns the value of the group without parsing.

Group alignments are only enforced after the control has lost focus.

### Common Use Cases

**Example: Group a phone mask `(###) - ### #### Extent ####` into 3 groups**

```csharp
maskedEditBox.Mask = "(###) - ### #### Extent ####";

// Group 1 -> area code (###)
// Group 2 -> phone number ### ####
// Group 3 -> extension Extent ####
```

### Adding DataGroups in Code

```csharp
// Create the two MaskedEditDataGroupInfo objects
MaskedEditDataGroupInfo maskedEditDataGroupInfo1 = new MaskedEditDataGroupInfo();
MaskedEditDataGroupInfo maskedEditDataGroupInfo2 = new MaskedEditDataGroupInfo();

// Add groups to the DataGroups collection
maskedEditBox.DataGroups.Add(maskedEditDataGroupInfo1);
maskedEditBox.DataGroups.Add(maskedEditDataGroupInfo2);

// Configure the first group
maskedEditDataGroupInfo1.DataGroupAlignment = MaskGroupAlignment.Left;
maskedEditDataGroupInfo1.DataGroupName = "One";
maskedEditDataGroupInfo1.DataGroupSize = 3;

// Configure the second group
maskedEditDataGroupInfo2.DataGroupAlignment = MaskGroupAlignment.None;
maskedEditDataGroupInfo2.DataGroupName = "Two";
maskedEditDataGroupInfo2.DataGroupSize = 4;
```

### Setting DataGroups Visually (Designer)

DataGroups are most often configured via the designer:
1. Right-click the `MaskedEditBox` control → **Properties**.
2. Locate the **DataGroups** property → click the `...` button to open the collection editor.
3. Add `MaskedEditDataGroupInfo` entries with the desired `DataGroupName`, `DataGroupSize`, and `DataGroupAlignment`.
4. For most scenarios, the default grouping (based on the mask) is sufficient.

### Reading a Group's Value

Use the `Value` property on a `MaskedEditDataGroupInfo` to retrieve the group's portion of the input:

```csharp
string areaCode    = maskedEditDataGroupInfo1.Value;  // "123"
string phoneNumber = maskedEditDataGroupInfo2.Value;  // "4567890"
```

## Separator Settings

Separators control how different data types are interpreted and formatted. These are regional/contextual separators, not mask literals.

### Supported Separators

| Separator | Property | Default | Purpose |
|-----------|----------|---------|---------|
| Date | `DateSeparator` | `/` | Date component separator |
| Decimal | `DecimalSeparator` | `.` | Decimal point in numbers |
| Thousand | `ThousandSeparator` | `,` | Thousands grouping |
| Time | `TimeSeparator` | `:` | Time component separator |

### Setting Separators

```csharp
// Change decimal separator for European format
maskedEditBox.DecimalSeparator = ',';   // Use comma instead of period

// Change date separator
maskedEditBox.DateSeparator = '-';      // Use dash in dates

// Change thousand separator
maskedEditBox.ThousandSeparator = '.';  // European format
```

### Example: Regional Format Support

```csharp
// US Format
maskedEditBox.DecimalSeparator = '.';
maskedEditBox.ThousandSeparator = ',';

// European Format
maskedEditBox.DecimalSeparator = ',';
maskedEditBox.ThousandSeparator = '.';

// Currency mask
maskedEditBox.Mask = "$###,##0.00";
// US: $1,234.56
// EU: $1.234,56 (with changed separators)
```

## Input Validation

### Detecting Complete Input

```csharp
private bool IsInputComplete()
{
    // Check if all mask positions are filled
    return maskedEditBox.ClipText.Length == maskedEditBox.Mask.Count(c => c == '#');
}

// Usage
if (IsInputComplete())
{
    // Process complete phone number
    ProcessPhoneNumber(maskedEditBox.ClipText);
}
```

### Validating Data Range

```csharp
private void ValidatePhoneArea()
{
    if (maskedEditBox.ClipText.Length >= 3)
    {
        int areaCode = int.Parse(maskedEditBox.ClipText.Substring(0, 3));
        if (areaCode < 200)
        {
            MessageBox.Show("Area code must be >= 200");
            maskedEditBox.Text = "";
        }
    }
}
```

### Handling Partial Input

```csharp
private void OnTextChanged(object sender, EventArgs e)
{
    // Allow partial input, show validation state
    if (maskedEditBox.ClipText.Length == 0)
    {
        statusLabel.Text = "Empty";
    }
    else if (maskedEditBox.ClipText.Length < 10)
    {
        statusLabel.Text = "Incomplete";
    }
    else if (maskedEditBox.ClipText.Length == 10)
    {
        statusLabel.Text = "Valid";
    }
}
```

### Pre-validation Before Save

```csharp
private bool ValidateAndSave()
{
    // Check for empty input
    if (string.IsNullOrEmpty(maskedEditBox.ClipText))
    {
        MessageBox.Show("Phone number required");
        return false;
    }

    // Check for complete input
    if (maskedEditBox.ClipText.Length != 10)
    {
        MessageBox.Show("Phone number must be 10 digits");
        return false;
    }

    // Additional business logic
    if (!IsValidPhoneNumber(maskedEditBox.ClipText))
    {
        MessageBox.Show("Invalid phone number");
        return false;
    }

    // Save
    database.SavePhone(maskedEditBox.ClipText);
    return true;
}
```

## Best Practices

1. **Use ClipText for storage** - Always save `ClipText`, not `Text` to database
2. **Use Text for display** - Show `Text` to users in UI
3. **Validate ClipText** - Validate using `ClipText` for data-only checks
4. **Check Length of ClipText** - Use `ClipText.Length` to verify complete input
5. **Set via Text** - When loading from database, assign to `Text` so the mask formats the display
6. **Clear with empty string** - Use `maskedEditBox.Text = ""` to clear
