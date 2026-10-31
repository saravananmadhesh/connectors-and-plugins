# Palette Structure

> **Note:** Ensure the `Syncfusion.Editors.WinUI` NuGet package is installed and updated to the latest version in your project before using this feature.

## Understanding the Control Layout

The DropDown Color Palette displays multiple sections to organize colors by type and purpose. Understanding each section helps you work effectively with the control and customize it for your needs.

## Control Sections

### Selected Color Button

The top of the control displays the currently selected color as a button.

**Characteristics:**
- Shows a colored rectangle representing the selected color
- Default color: Black
- Clicking anywhere on this area opens the color palette dropdown
- Can be customized with a template (see `dropdown-customization.md`)

**Accessing in Code:**
```csharp
// Get the currently displayed color
var selectedBrush = sfDropDownColorPalette.SelectedBrush;

// Change the selected color (updates button display)
sfDropDownColorPalette.SelectedBrush = new SolidColorBrush(Colors.Red);
```

### Automatic Color

The Automatic Color is the first item in the dropdown, providing quick access to a predefined default color.

**Characteristics:**
- Usually displays "Automatic" or similar label
- Default value: Black
- Clicking resets selection to this color
- Users can quickly revert to default without manually searching

**Use Cases:**
- Provide a "reset to default" option
- Use your brand's primary color as the automatic choice
- Act as a neutral "no selection" indicator

**Example:**
```xaml
<!-- User clicks "Automatic" to revert -->
<editors:SfDropDownColorPalette x:Name="colorPalette" />
```

### ToolTip with Color Details

When users hover over a color in the palette, a tooltip appears showing the color name.

**Features:**
- Displays color name (e.g., "Red", "Green", "Blue")
- Appears automatically on mouse hover
- Built-in for all palette colors
- Custom tooltips supported for custom colors

**Example:**
```
Mouse hovers over red square in Standard Colors → Tooltip shows "Red"
```

### Standard Colors

A fixed set of 10 standard colors commonly used in UI design.

**Default Standard Colors:**
- Red
- Green
- Blue
- Yellow
- Orange
- Pink
- Violet
- Brown
- Gray
- Black

**Characteristics:**
- Always available (unless customized away)
- Quick access to common colors
- No shades/variants
- Users don't need to open More Colors dialog for these
- Can be customized to your brand colors (see `color-palette-customization.md`)

### Recently Used Colors

This section tracks and displays colors the user has selected from the More Colors dialog.

**Characteristics:**
- Only shows colors selected from the spectrum picker, not from Standard Colors or Theme Colors
- Lists up to 10 recently used colors (implementation-dependent)
- Provides quick access to custom colors previously selected
- Empty initially or when user hasn't used More Colors

**Behavior:**
```
1. User clicks "More Colors..."
2. Selects a custom color (e.g., #FF5500)
3. Color is added to Recently Used section
4. Next time palette opens, #FF5500 appears in Recent Colors
```

**Example Workflow:**
```csharp
// User selects orange (#FFA500) from More Colors dialog
// Result: Recently Used section now shows orange

// Later, user can quickly reselect that orange
sfDropDownColorPalette.SelectedBrush = recentlyUsedOrange;
```

### Theme Variant Colors

Colors organized by theme with automatic shade variants.

**Structure:**
- Base color + 5-10 shades/variants
- Typically includes: Primary, Secondary, Accent colors
- Each base color expands to show lighter and darker variants

**Characteristics:**
- Professional color schemes
- Automatic shade generation
- Organized hierarchically
- Can be customized (see `color-palette-customization.md`)

**Example:**
```
Blue Theme:
  - Blue (light 5)
  - Blue (light 4)
  - Blue (light 3)
  - Blue (base)
  - Blue (dark 3)
  - Blue (dark 4)
  - Blue (dark 5)
```

### More Colors Option

A button that opens an extended color picker dialog.

**Features:**
- Provides access to the full color spectrum
- Users can select any RGB color (16+ million possibilities)
- Selected colors are added to Recently Used section
- Dialog includes:
  - Color spectrum picker
  - RGB input fields
  - Hex color input
  - OK/Cancel buttons

**Launching:**
```
User clicks "More Colors..." button → Extended dialog opens
```

**Behavior:**
```csharp
// When user selects color from More Colors dialog:
// 1. Dialog closes
// 2. Selected color becomes SelectedBrush
// 3. Color is added to Recently Used section
// 4. SelectedBrushChanged event fires
```

## Complete Palette Layout

Typical order from top to bottom:

```
┌─────────────────────────────┐
│   Selected Color Button      │  (e.g., showing Red)
├─────────────────────────────┤
│   Automatic Color           │  (Quick reset)
├─────────────────────────────┤
│   Theme Colors with Shades  │  (Organized by color + variants)
├─────────────────────────────┤
│   Standard Colors           │  (10 common colors)
├─────────────────────────────┤
│   Recently Used Colors      │  (From More Colors dialog)
├─────────────────────────────┤
│   [ More Colors... ]        │  (Opens spectrum picker)
└─────────────────────────────┘
```

## Toggling Sections On/Off

You can customize which sections appear (see `color-palette-customization.md`):

```xaml
<!-- Hide More Colors button -->
<editors:SfColorPalette ShowMoreColorsButton="False" />

<!-- Show only specific color types -->
<editors:SfColorPalette ShowColors="True" ShowColorShades="False" />
```

## Color Information

### Color Properties

Each color in the palette has:

| Property | Example | Purpose |
|----------|---------|---------|
| **Color Value** | #FF0000 (Red) | Actual RGB color |
| **Name/Label** | "Red" | Display name |
| **Tooltip** | "Bright Red" | Hover information |
| **Category** | Standard/Theme | Color section type |

### Accessing Color Properties

```csharp
// Get selected color value
var selectedBrush = sfDropDownColorPalette.SelectedBrush as SolidColorBrush;
Color selectedColor = selectedBrush.Color;

// RGB components
byte r = selectedColor.R;  // 0-255
byte g = selectedColor.G;  // 0-255
byte b = selectedColor.B;  // 0-255
byte a = selectedColor.A;  // 0-255 (alpha/opacity)

// Convert to Hex
string hexColor = $"#{selectedColor.R:X2}{selectedColor.G:X2}{selectedColor.B:X2}";
// Result: #FF0000 for red
```

## Common Workflows

### Workflow 1: Quick Color Selection
```
User opens app
→ Sees palette with Standard Colors visible
→ Clicks on "Blue" from Standard Colors
→ Color is applied
```

### Workflow 2: Custom Color
```
User opens app
→ Doesn't see desired color in Standard/Theme
→ Clicks "More Colors..."
→ Picks custom color #FF5500 from spectrum
→ Color added to Recently Used
→ Later: Quick-access to #FF5500 from Recently Used
```

### Workflow 3: Theme Color Selection
```
User opens app
→ Sees Theme Colors with variants
→ Clicks darker shade of primary color
→ Color is applied with professional appearance
```

---

**Next:** Customize dropdown behavior in `dropdown-customization.md`, or customize color definitions in `color-palette-customization.md`.
