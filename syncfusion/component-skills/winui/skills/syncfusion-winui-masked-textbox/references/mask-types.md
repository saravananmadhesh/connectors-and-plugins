# Mask Types in WinUI Masked TextBox

## Table of Contents
- [Overview](#overview)
- [Simple Mask Type](#simple-mask-type)
- [Simple Mask Characters](#simple-mask-characters)
- [RegEx Mask Type](#regex-mask-type)
- [RegEx Pattern Elements](#regex-pattern-elements)
- [Common Patterns](#common-patterns)
- [Case Conversion](#case-conversion)

## Overview

The `MaskType` property determines how the `Mask` pattern is interpreted:

- **Simple:** Uses predefined mask characters (0, 9, #, L, ?, C, A)
- **RegEx:** Uses regular expression patterns for custom validation

```xaml
<syncfusion:SfMaskedTextBox MaskType="Simple" Mask="000-000-0000"/>
<syncfusion:SfMaskedTextBox MaskType="RegEx" Mask="\d{3}-\d{3}-\d{4}"/>
```

## Simple Mask Type

Simple masks use single-character tokens that define input constraints. Each character in the mask represents a specific input rule.

### When to Use Simple Masks

- Standard formats (phone, date, SSN, credit card)
- Fixed-length inputs with known patterns
- Inputs with literal separators (dashes, slashes, parentheses)
- When you need built-in validation without writing regex

## Simple Mask Characters

| Character | Description | Accepts | Example |
|-----------|-------------|---------|---------|
| `0` | Digit required | 0-9 | `00/00/0000` → 12/25/2023 |
| `9` | Digit or space (optional) | 0-9, space | `999-9999` → 123-4567 or 12-34 |
| `#` | Digit, space, or +/- sign | 0-9, space, +, - | `#00` → +12, -34, 56 |
| `L` | Letter required | A-Z, a-z | `LL-000` → AB-123 |
| `?` | Letter (optional) | A-Z, a-z, space | `???00` → ABC12 or AB12 |
| `C` | Character (optional) | Any character | `CCC-000` → A1!-234 |
| `A` | Alphanumeric required | A-Z, a-z, 0-9 | `AAA-000` → ABC-123 |
| `a` | Alphanumeric (optional) | A-Z, a-z, 0-9, space | `aaa-000` → AB-123 |
| `&` | Any printable character | Any non-whitespace | `&&&-000` → @#$-123 |
| `<` | Convert to lowercase | (modifier) | `<AAAA` → test (lowercase) |
| `>` | Convert to uppercase | (modifier) | `>aaaa` → TEST (uppercase) |
| `\\` | Escape next character | (literal) | `\\000` → 0123 (literal "0") |

**Literal characters:** Any character not in the above table is treated as a literal (e.g., `-`, `/`, `(`, `)`, ` `, `.`).

## Simple Mask Examples

### Date (MM/DD/YYYY)

```xaml
<syncfusion:SfMaskedTextBox Mask="00/00/0000"/>
```

- `00` = Month (01-12)
- `/` = Literal separator
- `00` = Day (01-31)
- `/` = Literal separator
- `0000` = Year (1900-2099)

### Social Security Number

```xaml
<syncfusion:SfMaskedTextBox Mask="000-00-0000"/>
```

**Input:** 123456789 → **Display:** 123-45-6789

### Credit Card

```xaml
<syncfusion:SfMaskedTextBox Mask="0000 0000 0000 0000"/>
```

**Input:** 1234567812345678 → **Display:** 1234 5678 1234 5678

### Product Key (with uppercase)

```xaml
<syncfusion:SfMaskedTextBox Mask=">AAAAA-AAAAA-AAAAA-AAAAA"/>
```

**Input:** abc12def34ghi56jkl78 → **Display:** ABC12-DEF34-GHI56-JKL78

The `>` modifier converts all letters to uppercase.

### Optional Phone Extension

```xaml
<syncfusion:SfMaskedTextBox Mask="(000) 000-0000 x9999"/>
```

- `(000) 000-0000` = Required phone number
- ` x` = Literal " x"
- `9999` = Optional extension (can be partially filled or empty)

**Valid inputs:** 
- (555) 123-4567
- (555) 123-4567 x1234

### IP Address

```xaml
<syncfusion:SfMaskedTextBox Mask="099.099.099.099"/>
```

- `099` = Up to 3 digits (0-999)
- `.` = Literal dot

**Input:** 192.168.1.1

## RegEx Mask Type

RegEx masks use standard regular expression syntax for advanced validation and custom patterns.

### When to Use RegEx Masks

- Complex validation rules (email, URL, custom formats)
- Variable-length inputs
- Multiple format options (international phone numbers)
- Character classes and quantifiers

## RegEx Pattern Elements

| Pattern | Description | Example |
|---------|-------------|---------|
| `[A-Z]` | Single uppercase letter | `[A-Z]{2}` → AB |
| `[a-z]` | Single lowercase letter | `[a-z]{3}` → abc |
| `[0-9]` | Single digit | `[0-9]{4}` → 1234 |
| `[A-Za-z]` | Any letter (case-insensitive) | `[A-Za-z]+` → Hello |
| `[A-Za-z0-9]` | Alphanumeric | `[A-Za-z0-9]+` → User123 |
| `\d` | Digit (shorthand for [0-9]) | `\d{3}` → 123 |
| `\w` | Word character (A-Z, a-z, 0-9, _) | `\w+` → User_1 |
| `\s` | Whitespace | `\w+\s\w+` → Hello World |
| `+` | One or more | `[A-Z]+` → ABC (1+ letters) |
| `*` | Zero or more | `[A-Z]*` → or ABC |
| `{n}` | Exactly n occurrences | `\d{4}` → 1234 |
| `{n,m}` | Between n and m occurrences | `\d{2,4}` → 12 to 1234 |
| `\.` | Literal dot (escaped) | `\d+\.\d+` → 123.456 |
| `\-` | Literal hyphen (escaped) | `\d+-\d+` → 123-456 |
| `^` | Start of string | `^[A-Z]` → Must start with letter |
| `$` | End of string | `[0-9]$` → Must end with digit |
| `\|` | OR operator | `(cat\|dog)` → cat or dog |

## Common RegEx Patterns

### Email Address

```xaml
<syncfusion:SfMaskedTextBox MaskType="RegEx"
                            Mask="[A-Za-z0-9._%-]+@[A-Za-z0-9]+\.[A-Za-z]{2,3}"/>
```

**Pattern breakdown:**
- `[A-Za-z0-9._%-]+` = Username (letters, digits, dots, underscores, percent, hyphen)
- `@` = Literal @ symbol
- `[A-Za-z0-9]+` = Domain name
- `\.` = Literal dot (escaped)
- `[A-Za-z]{2,3}` = Extension (2-3 letters)

**Valid:** user@example.com, john.doe@mail.org

### Phone Number (US Format)

```xaml
<syncfusion:SfMaskedTextBox MaskType="RegEx"
                            Mask="\(\d{3}\) \d{3}-\d{4}"/>
```

**Pattern breakdown:**
- `\(` = Literal opening parenthesis (escaped)
- `\d{3}` = 3 digits (area code)
- `\)` = Literal closing parenthesis (escaped)
- ` ` = Literal space
- `\d{3}` = 3 digits (prefix)
- `-` = Literal hyphen
- `\d{4}` = 4 digits (line number)

**Result:** (555) 123-4567

### International Phone (Variable Length)

```xaml
<syncfusion:SfMaskedTextBox MaskType="RegEx"
                            Mask="\+[0-9]{1,3} [0-9]{4,14}"/>
```

**Pattern breakdown:**
- `\+` = Literal + (country code indicator)
- `[0-9]{1,3}` = 1-3 digits (country code)
- ` ` = Literal space
- `[0-9]{4,14}` = 4-14 digits (phone number)

**Valid:** +1 5551234567, +44 7911123456, +91 9876543210

### URL

```xaml
<syncfusion:SfMaskedTextBox MaskType="RegEx"
                            Mask="https?://[A-Za-z0-9\-._]+\.[A-Za-z]{2,}"/>
```

**Pattern breakdown:**
- `https?` = "http" or "https" (? makes "s" optional)
- `://` = Literal "://"
- `[A-Za-z0-9\-._]+` = Domain name with allowed characters
- `\.` = Literal dot
- `[A-Za-z]{2,}` = Extension (2+ letters)

**Valid:** https://example.com, http://my-site.org

### Hexadecimal Color Code

```xaml
<syncfusion:SfMaskedTextBox MaskType="RegEx"
                            Mask="#[0-9A-Fa-f]{6}"/>
```

**Pattern breakdown:**
- `#` = Literal hash symbol
- `[0-9A-Fa-f]{6}` = Exactly 6 hex digits (0-9, A-F, case-insensitive)

**Valid:** #FF5733, #00AAFF

### Username (Alphanumeric + Underscore)

```xaml
<syncfusion:SfMaskedTextBox MaskType="RegEx"
                            Mask="[A-Za-z][A-Za-z0-9_]{3,15}"/>
```

**Pattern breakdown:**
- `[A-Za-z]` = Must start with a letter
- `[A-Za-z0-9_]{3,15}` = 3-15 additional characters (letters, digits, underscore)

**Valid:** User123, john_doe, Admin_User

**Invalid:** 123User (starts with digit), us (too short)

## Case Conversion

Use `<` and `>` modifiers in Simple masks to enforce case:

### Uppercase Conversion

```xaml
<syncfusion:SfMaskedTextBox Mask=">AAAAA-AAAAA"/>
```

**Input:** abc12-def34 → **Display:** ABC12-DEF34

### Lowercase Conversion

```xaml
<syncfusion:SfMaskedTextBox Mask="<AAAAA-AAAAA"/>
```

**Input:** ABC12-DEF34 → **Display:** abc12-def34

### Mixed Case

```xaml
<syncfusion:SfMaskedTextBox Mask=">LL<LL-0000"/>
```

**Input:** ABcd-1234 → **Display:** ABcd-1234 (first two uppercase, next two lowercase)

## Choosing Between Simple and RegEx

| Use Simple When... | Use RegEx When... |
|--------------------|-------------------|
| Fixed-length input | Variable-length input |
| Standard formats (phone, date, SSN) | Custom validation rules |
| Need literal separators | Need character classes |
| Built-in case conversion | Complex pattern matching |
| Easier to read and maintain | Maximum flexibility required |

## Key Takeaways

- **Simple masks:** Use predefined characters (`0`, `9`, `L`, `A`, etc.) for common formats
- **RegEx masks:** Use regex patterns for advanced validation and variable-length inputs
- **Literal characters:** Non-mask characters (e.g., `/`, `-`, `(`, `)`) appear automatically
- **Case conversion:** Use `<` (lowercase) and `>` (uppercase) in Simple masks
- **Optional inputs:** Use `9`, `?`, `C`, `a` for optional positions in Simple masks

## Next Steps

- **[Value Formatting](value-formatting.md)** - Control how values include prompts and literals
- **[Getting Started](getting-started.md)** - Installation and basic usage
