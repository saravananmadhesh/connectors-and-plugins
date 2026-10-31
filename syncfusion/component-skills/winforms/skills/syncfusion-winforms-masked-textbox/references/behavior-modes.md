# Behavior Modes

The MaskedEditBox control supports three distinct modes that control how the mask is interpreted and applied: **ClipMode**, **InputMode**, and **UsageMode**.

## Overview

Each mode serves a different purpose:
- **ClipMode** - Controls how output is formatted when the mask is removed
- **InputMode** - Controls how user input behaves during entry
- **UsageMode** - Determines the primary use case (visual/data/strict)

## ClipMode

ClipMode controls **what characters are included** when you retrieve the text or ClipText from the control.

### ClipModes Options

| Option | Behavior | Example |
|--------|----------|---------|
| `IncludeLiterals` | Includes mask literal characters in output | `"(123) 456-7890"` |
| `ExcludeLiterals` | Removes literal characters from output | `"1234567890"` |

### ClipMode Examples

**IncludeLiterals (Default):**
```csharp
maskedEditBox.Mask = "(###) ###-####";
maskedEditBox.ClipMode = ClipModes.IncludeLiterals;

// User enters: 1234567890
maskedEditBox.Text;       // Result: "(123) 456-7890"
maskedEditBox.ClipText;   // Result: "(123) 456-7890"
```

**ExcludeLiterals:**
```csharp
maskedEditBox.Mask = "(###) ###-####";
maskedEditBox.ClipMode = ClipModes.ExcludeLiterals;

// User enters: 1234567890
maskedEditBox.Text;       // Result: "1234567890"
maskedEditBox.ClipText;   // Result: "1234567890"
```

### When to Use Each

**Use IncludeLiterals when:**
- Displaying formatted data to users
- Storing formatted output for display purposes
- You want consistent visual formatting

**Use ExcludeLiterals when:**
- Storing data in a database (without formatting)
- Transferring data between systems
- You need only the actual data values
- Reducing data payload in APIs

## InputMode

`InputMode` specifies the text input mode for the mask. The property type is `MaskedInputMode`, which supports the values `Normal` and `OvertypeOnly`.

### MaskedInputMode Options

| Option | Behavior |
|--------|----------|
| `Normal` | Default mode; user input doesn't need to include literal separators because the control auto-handles them |
| `OvertypeOnly` | Strict overtype mode where every keystroke replaces the character at the caret position |

### InputMode Examples

**Normal (Recommended):**
```csharp
maskedEditBox.Mask = "(###) ###-####";
maskedEditBox.InputMode = MaskedInputMode.Normal;

// User types only digits: 1234567890
// Display automatically becomes: (123) 456-7890
```

**OvertypeOnly:**
```csharp
maskedEditBox.Mask = "(###) ###-####";
maskedEditBox.InputMode = MaskedInputMode.OvertypeOnly;

// User input overtypes the current position; separators are still driven by the mask
// This mode is best when an overtype interaction is required
```

### When to Use Each

**Use Normal when:**
- You want user experience to be simple (only type data)
- The control automatically handles formatting
- Most general-purpose scenarios (phone, SSN, credit card)

**Use OvertypeOnly when:**
- You need an explicit overtype (insert/replace) input behavior
- The mask should overwrite the character at the caret position on every keystroke
- Specialized data entry where overtype semantics are required

## UsageMode

UsageMode determines the **primary purpose** of the masked input. The property is `UsageMode` and its enum type is `MaskedUsageMode` in the Syncfusion API, which supports two values: `Normal` and `Numeric`.

### MaskedUsageMode Options

| Option | Purpose | Best For |
|--------|---------|----------|
| `Normal` | Standard usage; the mask is treated as visual formatting and partial input is accepted like displayed | Phone numbers, formatted IDs, general entry |
| `Numeric` | Restricts entry to numeric values only and treats the mask as a strict numeric template | Validation-critical numeric entry such as credit card or medical IDs |

### UsageMode Examples

**Normal Mode (Default):**
```csharp
maskedEditBox.Mask = "(###) ###-####";
maskedEditBox.UsageMode = MaskedUsageMode.Normal;

// Standard usage; allows partial input such as "(123)"
// Treats formatting as visual guidance
```

**Numeric Mode:**
```csharp
maskedEditBox.Mask = "###-##-####";  // SSN-style
maskedEditBox.UsageMode = MaskedUsageMode.Numeric;

// Restricts entry to numeric input
// Useful when strict numeric validation is required
```

### When to Use Each

**Use Normal when:**
- Format is mainly for UI consistency
- Partial entries are acceptable
- Examples: phone numbers, formatted IDs, postal codes

**Use Numeric when:**
- Complete numeric input is mandatory
- Partial input is invalid for the field
- Examples: credit card numbers, medical IDs, transaction codes

## Combining Modes

Modes work together to create the desired behavior:

### Example 1: User-Friendly Phone Input

```csharp
maskedEditBox.Mask = "(###) ###-####";
maskedEditBox.InputMode = MaskedInputMode.Normal;          // User types only digits; auto-fills separators
maskedEditBox.ClipMode = ClipModes.IncludeLiterals;        // Display with formatting
maskedEditBox.UsageMode = MaskedUsageMode.Normal;          // Allow partial input

// Result: User types "1234567890", sees "(123) 456-7890", retrieves formatted text
```

### Example 2: Database Storage

```csharp
maskedEditBox.Mask = "(###) ###-####";
maskedEditBox.InputMode = MaskedInputMode.Normal;          // Easy user input
maskedEditBox.ClipMode = ClipModes.ExcludeLiterals;        // Store only digits
maskedEditBox.UsageMode = MaskedUsageMode.Normal;          // Standard usage

// Result: User types "1234567890", database stores "1234567890" (no formatting)
```

### Example 3: Strict Credit Card Entry

```csharp
maskedEditBox.Mask = "####-####-####-####";
maskedEditBox.InputMode = MaskedInputMode.Normal;          // User types digits
maskedEditBox.ClipMode = ClipModes.ExcludeLiterals;        // Store digits only
maskedEditBox.UsageMode = MaskedUsageMode.Numeric;         // Restrict to numeric entry

// Result: User must enter the complete 16-digit number; non-digits rejected
```

## Mode Selection Guide

**Question 1: How should user input work?**
- Answer: Standard, auto-handled literals → `InputMode = MaskedInputMode.Normal`
- Answer: Overtype-only behavior → `InputMode = MaskedInputMode.OvertypeOnly`

**Question 2: What should be stored/returned?**
- Answer: With formatting → `ClipMode = IncludeLiterals`
- Answer: Digits/letters only → `ClipMode = ExcludeLiterals`

**Question 3: What is the primary purpose?**
- Answer: General display/entry → `UsageMode = MaskedUsageMode.Normal`
- Answer: Strict numeric validation → `UsageMode = MaskedUsageMode.Numeric`

## Default Behavior

If you don't explicitly set modes, MaskedEditBox uses:
```csharp
maskedEditBox.InputMode = MaskedInputMode.Normal;
maskedEditBox.ClipMode = ClipModes.IncludeLiterals;
maskedEditBox.UsageMode = MaskedUsageMode.Normal;
```

This provides a balance between user-friendliness and reasonable formatting.

## Performance Considerations

All three modes have minimal performance impact. Choose based on your functional requirements, not performance concerns.

Mode changes are allowed at runtime:
```csharp
void UpdateInputMode(string dataFormat)
{
    maskedEditBox.InputMode = dataFormat == "UserFriendly"
        ? MaskedInputMode.Normal
        : MaskedInputMode.OvertypeOnly;
}
```

However, it's best to set modes during initialization rather than changing them frequently.
