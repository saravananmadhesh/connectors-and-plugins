# Value Formatting for WinUI NumberBox

This reference covers custom number formatting using CustomFormat and NumberFormatter properties for currency, percentage, decimal, and culture-specific display.

## Table of Contents

- [CustomFormat Property](#customformat-property)
- [Currency Formatting](#currency-formatting)
- [Percentage Formatting](#percentage-formatting)
- [Decimal Formatting](#decimal-formatting)
- [Format Specifiers](#format-specifiers)
- [Integer and Fractional Digits](#integer-and-fractional-digits)
- [Culture-Specific Formatting](#culture-specific-formatting)
- [NumberFormatter Classes](#numberformatter-classes)

## CustomFormat Property

The `CustomFormat` property applies a format string to display numeric values. It uses standard .NET numeric format strings.

### Format String Syntax

```
[format-specifier][precision-digit]
```

**Examples:**
- `C2` - Currency with 2 decimal places
- `P2` - Percentage with 2 decimal places
- `N3` - Number with 3 decimal places
- `F4` - Fixed-point with 4 decimal places

### Precedence

When both `CustomFormat` and `NumberFormatter` are set:
- **CustomFormat takes precedence**
- NumberFormatter is ignored

## Currency Formatting

Format values as currency with appropriate symbols and decimal places.

### Basic Currency Format

**XAML:**
```xaml
<editors:SfNumberBox 
    Value="12.5"
    CustomFormat="C2" />
```

**Result:** $12.50 (based on system culture)

### Custom Currency Symbol

Use format with currency symbol:

```xaml
<editors:SfNumberBox 
    Value="12.5"
    CustomFormat="$0.00" />
```

**Result:** $12.50

### Currency with Thousands Separator

```xaml
<editors:SfNumberBox 
    Value="1234.5"
    CustomFormat="$#,##0.00" />
```

**Result:** $1,234.50

### Different Currency Codes

**Euros:**
```xaml
<editors:SfNumberBox 
    Value="12.5"
    CustomFormat="€0.00" />
```

**Result:** €12.50

**British Pounds:**
```xaml
<editors:SfNumberBox 
    Value="12.5"
    CustomFormat="£0.00" />
```

**Result:** £12.50

**Japanese Yen (no decimals):**
```xaml
<editors:SfNumberBox 
    Value="1234"
    CustomFormat="¥0" />
```

**Result:** ¥1234

## Percentage Formatting

Format values as percentages with decimal places.

### Standard Percentage Format

**XAML:**
```xaml
<editors:SfNumberBox 
    Value="0.25"
    CustomFormat="P2" />
```

**Result:** 25.00% (0.25 × 100)

### Percentage with No Decimals

```xaml
<editors:SfNumberBox 
    Value="0.85"
    CustomFormat="P0" />
```

**Result:** 85%

### Percentage with Different Decimal Places

```xaml
<!-- 1 decimal place -->
<editors:SfNumberBox 
    Value="0.333"
    CustomFormat="P1" />
<!-- Result: 33.3% -->

<!-- 3 decimal places -->
<editors:SfNumberBox 
    Value="0.333333"
    CustomFormat="P3" />
<!-- Result: 33.333% -->
```

### Custom Percentage Format

```xaml
<editors:SfNumberBox 
    Value="0.5"
    CustomFormat="0.00'%'" />
```

**Result:** 0.50%

**Note:** This shows the raw decimal value with % symbol, not multiplied by 100 like P format.

## Decimal Formatting

Format values with specific decimal places.

### Standard Decimal Format (N)

The N format specifier displays numbers with thousand separators and decimal places.

```xaml
<!-- 2 decimal places with separators -->
<editors:SfNumberBox 
    Value="1234.5"
    CustomFormat="N2" />
<!-- Result: 1,234.50 -->

<!-- 3 decimal places -->
<editors:SfNumberBox 
    Value="1234.567"
    CustomFormat="N3" />
<!-- Result: 1,234.567 -->
```

### Fixed-Point Format (F)

The F format displays fixed decimal places without thousand separators.

```xaml
<!-- 2 decimal places -->
<editors:SfNumberBox 
    Value="1234.5"
    CustomFormat="F2" />
<!-- Result: 1234.50 -->

<!-- 4 decimal places -->
<editors:SfNumberBox 
    Value="3.14159"
    CustomFormat="F4" />
<!-- Result: 3.1416 -->
```

## Format Specifiers

### Standard Format Specifiers

| Code | Name | Example | Result |
|------|------|---------|--------|
| C | Currency | C2 | $1,234.56 |
| D | Decimal | D6 | 001234 |
| E | Exponential | E2 | 1.23E+003 |
| F | Fixed-point | F2 | 1234.56 |
| G | General | G | 1234.56 |
| N | Number | N2 | 1,234.56 |
| P | Percent | P2 | 123,456.00% |
| X | Hexadecimal | X | 4D2 |

### Custom Format Specifiers

Use custom patterns with 0 and # symbols:

**0 (Zero Placeholder):**
- Replaces with digit if present
- Adds zero if no digit

**# (Digit Placeholder):**
- Replaces with digit if present
- Adds nothing if no digit

```xaml
<!-- Minimum 3 digits, pad with zeros -->
<editors:SfNumberBox 
    Value="5"
    CustomFormat="000" />
<!-- Result: 005 -->

<!-- No padding, show digits only -->
<editors:SfNumberBox 
    Value="5"
    CustomFormat="###" />
<!-- Result: 5 -->

<!-- Currency with specific format -->
<editors:SfNumberBox 
    Value="1234.5"
    CustomFormat="$#,##0.00" />
<!-- Result: $1,234.50 -->
```

## Integer and Fractional Digits

Control the number of digits before and after the decimal point.

### Using CustomFormat

**Minimum Integer Digits:**
```xaml
<!-- At least 3 integer digits -->
<editors:SfNumberBox 
    Value="12"
    CustomFormat="000.00" />
<!-- Result: 012.00 -->

<!-- At least 5 integer digits -->
<editors:SfNumberBox 
    Value="1234.5"
    CustomFormat="00000.00" />
<!-- Result: 01234.50 -->
```

**Minimum Fractional Digits:**
```xaml
<!-- Exactly 2 decimal places -->
<editors:SfNumberBox 
    Value="10"
    CustomFormat="0.00" />
<!-- Result: 10.00 -->

<!-- Exactly 3 decimal places -->
<editors:SfNumberBox 
    Value="3.1"
    CustomFormat="0.000" />
<!-- Result: 3.100 -->
```

**Maximum/Minimum Fractional Digits:**
```xaml
<!-- Maximum 4, minimum 2 -->
<editors:SfNumberBox 
    Value="3.14159"
    CustomFormat="#.00##" />
<!-- Result: 3.1416 -->
```

## Culture-Specific Formatting

Apply formatting based on language and region settings.

### Setting Culture

**XAML:**
```xaml
<editors:SfNumberBox 
    x:Name="numberBox"
    Value="1234.56" />
```

**C#:**
```csharp
using System.Globalization;

SfNumberBox numberBox = new SfNumberBox();
numberBox.Culture = new CultureInfo("en-US");
numberBox.Value = 1234.56;
numberBox.CustomFormat = "C2";
// Result: $1,234.56
```

### Culture Examples

**US English (en-US):**
```csharp
numberBox.Culture = new CultureInfo("en-US");
numberBox.CustomFormat = "C2";
// $1,234.56
```

**German (de-DE):**
```csharp
numberBox.Culture = new CultureInfo("de-DE");
numberBox.CustomFormat = "C2";
// 1.234,56 €
```

**French (fr-FR):**
```csharp
numberBox.Culture = new CultureInfo("fr-FR");
numberBox.CustomFormat = "C2";
// 1 234,56 €
```

**Japanese (ja-JP):**
```csharp
numberBox.Culture = new CultureInfo("ja-JP");
numberBox.CustomFormat = "C2";
// ￥1,234.56
```

### NumberFormatter Classes

WinUI provides formatter classes for advanced formatting. Import:

```csharp
using Windows.Globalization.NumberFormatting;
```

**Note:** When `CustomFormat` and `NumberFormatter` both set, CustomFormat takes precedence.

## Practical Examples

### Example 1: Price Input (US Currency)

```xaml
<editors:SfNumberBox 
    Header="Price"
    Value="99.99"
    CustomFormat="C2"
    Minimum="0"
    Maximum="9999.99"
    Width="250"
    Height="75" />
```

**Display:** $99.99

### Example 2: Discount Percentage

```xaml
<editors:SfNumberBox 
    Header="Discount"
    Value="0.15"
    CustomFormat="P1"
    Minimum="0"
    Maximum="1"
    SmallChange="0.05"
    Width="250"
    Height="75" />
```

**Display:** 15.0%

### Example 3: High-Precision Calculation

```xaml
<editors:SfNumberBox 
    Header="Result"
    Value="3.14159265"
    CustomFormat="0.0000000000"
    IsEditable="False"
    Width="250"
    Height="75" />
```

**Display:** 3.1415926500

### Example 4: Thousand Separator Number

```xaml
<editors:SfNumberBox 
    Header="Population"
    Value="7500000"
    CustomFormat="N0"
    Minimum="0"
    Maximum="10000000"
    Width="250"
    Height="75" />
```

**Display:** 7,500,000

### Example 5: Invoice Total with Currency

```csharp
CultureInfo ci = new CultureInfo("de-DE");

SfNumberBox totalBox = new SfNumberBox();
totalBox.Culture = ci;
totalBox.Value = 1234.56;
totalBox.CustomFormat = "C2";
totalBox.Header = "Total";
totalBox.IsEditable = false;
```

**Display:** 1.234,56 € (for German culture)

## Common Issues and Solutions

### Issue: Currency shows $ but you want €
**Solution:** Change `CustomFormat="C2"` to `CustomFormat="€0.00"` or set culture to Euro region.

### Issue: Percentage shows as decimal (e.g., 0.25 instead of 25%)
**Solution:** Use `CustomFormat="P2"` which multiplies by 100. Format "0.00%" shows raw value.

### Issue: Decimal places not showing
**Solution:** Use 0 instead of #. Format "0.00" always shows 2 decimals. Format "#.##" shows up to 2.

### Issue: Thousand separators not appearing
**Solution:** Use format with comma: "$#,##0.00" or use N format: "N2"

### Issue: Leading zeros missing
**Solution:** Use 0 placeholder for leading zeros. Format "00000" pads to 5 digits.

### Issue: Culture not applied
**Solution:** Set `Culture` property before setting value. Culture affects display format.
