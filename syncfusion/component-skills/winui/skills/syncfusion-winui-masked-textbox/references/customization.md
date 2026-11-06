# Customization in WinUI Masked TextBox

The Masked TextBox provides properties to customize its appearance with headers, descriptions, and templates for enhanced user experience.

## Overview

Customization features include:
- **Header:** Display a label above the control
- **HeaderTemplate:** Custom DataTemplate for header styling
- **Description:** Help text below the control

## Header Property

The `Header` property displays a label above the Masked TextBox, providing context for the input field.

**Basic header:**

```xaml
<syncfusion:SfMaskedTextBox Width="200"
                            Header="Phone Number"
                            Mask="(000) 000-0000"/>
```

**Result:**
```
Phone Number
[___) ___-____]
```

### Header with Multiple Controls

```xaml
<StackPanel Padding="20">
    <syncfusion:SfMaskedTextBox Width="250"
                                Header="Social Security Number"
                                Mask="000-00-0000"
                                Margin="0,0,0,16"/>
    
    <syncfusion:SfMaskedTextBox Width="250"
                                Header="Phone Number"
                                Mask="(000) 000-0000"
                                Margin="0,0,0,16"/>
    
    <syncfusion:SfMaskedTextBox Width="250"
                                Header="Date of Birth"
                                Mask="00/00/0000"/>
</StackPanel>
```

**Use case:** Form layouts where each field needs a label.

## HeaderTemplate Property

The `HeaderTemplate` property allows custom styling and layout for the header using a `DataTemplate`.

### Custom Header with Icon

```xaml
<syncfusion:SfMaskedTextBox Width="250"
                            Mask="(000) 000-0000">
    <syncfusion:SfMaskedTextBox.HeaderTemplate>
        <DataTemplate>
            <StackPanel Orientation="Horizontal" Spacing="8">
                <FontIcon Glyph="&#xE717;" 
                          FontSize="16" 
                          Foreground="#0078D4"/>
                <TextBlock Text="Phone Number" 
                           FontWeight="SemiBold"/>
            </StackPanel>
        </DataTemplate>
    </syncfusion:SfMaskedTextBox.HeaderTemplate>
</syncfusion:SfMaskedTextBox>
```

**Result:**
```
📞 Phone Number (bold, with phone icon)
[___) ___-____]
```

### Required Field Indicator

```xaml
<syncfusion:SfMaskedTextBox Width="250"
                            Mask="000-00-0000">
    <syncfusion:SfMaskedTextBox.HeaderTemplate>
        <DataTemplate>
            <StackPanel Orientation="Horizontal" Spacing="4">
                <TextBlock Text="SSN" FontWeight="SemiBold"/>
                <TextBlock Text="*" 
                           Foreground="Red" 
                           FontSize="16"/>
            </StackPanel>
        </DataTemplate>
    </syncfusion:SfMaskedTextBox.HeaderTemplate>
</syncfusion:SfMaskedTextBox>
```

**Result:**
```
SSN *
[___-__-____]
```

### Styled Header with Background

```xaml
<syncfusion:SfMaskedTextBox Width="300"
                            Mask="[A-Za-z0-9._%-]+@[A-Za-z0-9]+\.[A-Za-z]{2,3}"
                            MaskType="RegEx">
    <syncfusion:SfMaskedTextBox.HeaderTemplate>
        <DataTemplate>
            <Grid Background="#E8F4FD" 
                  Padding="8,4" 
                  CornerRadius="4">
                <StackPanel Orientation="Horizontal" Spacing="8">
                    <FontIcon Glyph="&#xE715;" 
                              FontSize="14" 
                              Foreground="#0078D4"/>
                    <TextBlock Text="Email Address" 
                               FontWeight="SemiBold" 
                               Foreground="#0078D4"/>
                </StackPanel>
            </Grid>
        </DataTemplate>
    </syncfusion:SfMaskedTextBox.HeaderTemplate>
</syncfusion:SfMaskedTextBox>
```

**Result:** Header with light blue background, icon, and styled text.

### Header with Tooltip

```xaml
<syncfusion:SfMaskedTextBox Width="250"
                            Mask=">AAAAA-AAAAA-AAAAA-AAAAA">
    <syncfusion:SfMaskedTextBox.HeaderTemplate>
        <DataTemplate>
            <StackPanel Orientation="Horizontal" Spacing="4">
                <TextBlock Text="Product Key" FontWeight="SemiBold"/>
                <FontIcon Glyph="&#xE946;" 
                          FontSize="14" 
                          Foreground="Gray">
                    <ToolTipService.ToolTip>
                        <ToolTip Content="Enter 20-character product key"/>
                    </ToolTipService.ToolTip>
                </FontIcon>
            </StackPanel>
        </DataTemplate>
    </syncfusion:SfMaskedTextBox.HeaderTemplate>
</syncfusion:SfMaskedTextBox>
```

**Result:** Header with info icon that shows tooltip on hover.

## Description Property

The `Description` property displays help text below the Masked TextBox, providing additional context or instructions.

**Basic description:**

```xaml
<syncfusion:SfMaskedTextBox Width="250"
                            Header="Phone Number"
                            Mask="(000) 000-0000"
                            Description="Enter your 10-digit phone number"/>
```

**Result:**
```
Phone Number
[___) ___-____]
Enter your 10-digit phone number
```

### Description with Multiple Lines

```xaml
<syncfusion:SfMaskedTextBox Width="300"
                            Header="Credit Card"
                            Mask="0000 0000 0000 0000"
                            Description="Enter your 16-digit card number.&#x0a;No spaces or dashes required."/>
```

**Result:**
```
Credit Card
[____ ____ ____ ____]
Enter your 16-digit card number.
No spaces or dashes required.
```

### Example Usage Hint

```xaml
<syncfusion:SfMaskedTextBox Width="250"
                            Header="Date of Birth"
                            Mask="00/00/0000"
                            Description="Format: MM/DD/YYYY (e.g., 12/25/1990)"/>
```

### Format Instructions

```xaml
<syncfusion:SfMaskedTextBox Width="300"
                            Header="Email"
                            MaskType="RegEx"
                            Mask="[A-Za-z0-9._%-]+@[A-Za-z0-9]+\.[A-Za-z]{2,3}"
                            Description="Enter a valid email address (e.g., user@example.com)"/>
```

## Combined Header and Description

Use both properties together for complete labeling and guidance:

```xaml
<syncfusion:SfMaskedTextBox Width="300"
                            Header="Social Security Number"
                            Mask="000-00-0000"
                            Description="Required for tax purposes. Your SSN is kept confidential."/>
```

**Result:**
```
Social Security Number
[___-__-____]
Required for tax purposes. Your SSN is kept confidential.
```

## Styling and Appearance

### Custom Header Font

```xaml
<syncfusion:SfMaskedTextBox Width="250"
                            Mask="(000) 000-0000">
    <syncfusion:SfMaskedTextBox.HeaderTemplate>
        <DataTemplate>
            <TextBlock Text="Contact Number" 
                       FontSize="18" 
                       FontWeight="Bold" 
                       Foreground="#0078D4"/>
        </DataTemplate>
    </syncfusion:SfMaskedTextBox.HeaderTemplate>
</syncfusion:SfMaskedTextBox>
```

### Description with Styled Text

Since `Description` is a string property, use `\n` for line breaks or apply styling via resources:

```xaml
<syncfusion:SfMaskedTextBox Width="300"
                            Header="Password"
                            Mask="CCCCCCCCCCCC"
                            Description="Must be at least 8 characters"/>
```

For advanced description styling, consider using a `TextBlock` below the control:

```xaml
<StackPanel>
    <syncfusion:SfMaskedTextBox x:Name="passwordInput"
                                Width="300"
                                Header="Password"
                                Mask="CCCCCCCCCCCC"/>
    
    <TextBlock Margin="0,4,0,0" 
               Foreground="Gray" 
               FontSize="12">
        <Run Text="Must contain:"/>
        <LineBreak/>
        <Run Text="• At least 8 characters"/>
        <LineBreak/>
        <Run Text="• One uppercase letter"/>
        <LineBreak/>
        <Run Text="• One number"/>
    </TextBlock>
</StackPanel>
```

## Complete Form Example

```xaml
<StackPanel Padding="20" Spacing="20">
    <TextBlock Text="Personal Information" 
               FontSize="24" 
               FontWeight="Bold"/>
    
    <syncfusion:SfMaskedTextBox Width="300"
                                HorizontalAlignment="Left">
        <syncfusion:SfMaskedTextBox.HeaderTemplate>
            <DataTemplate>
                <StackPanel Orientation="Horizontal" Spacing="4">
                    <TextBlock Text="Full Name" FontWeight="SemiBold"/>
                    <TextBlock Text="*" Foreground="Red" FontSize="16"/>
                </StackPanel>
            </DataTemplate>
        </syncfusion:SfMaskedTextBox.HeaderTemplate>
        <syncfusion:SfMaskedTextBox.Mask>LLLLLLLLLLLLLLLLLLLL</syncfusion:SfMaskedTextBox.Mask>
        <syncfusion:SfMaskedTextBox.Description>Enter your legal first and last name</syncfusion:SfMaskedTextBox.Description>
    </syncfusion:SfMaskedTextBox>
    
    <syncfusion:SfMaskedTextBox Width="300"
                                HorizontalAlignment="Left">
        <syncfusion:SfMaskedTextBox.HeaderTemplate>
            <DataTemplate>
                <StackPanel Orientation="Horizontal" Spacing="8">
                    <FontIcon Glyph="&#xE8BF;" FontSize="16" Foreground="#0078D4"/>
                    <TextBlock Text="Date of Birth" FontWeight="SemiBold"/>
                    <TextBlock Text="*" Foreground="Red" FontSize="16"/>
                </StackPanel>
            </DataTemplate>
        </syncfusion:SfMaskedTextBox.HeaderTemplate>
        <syncfusion:SfMaskedTextBox.Mask>00/00/0000</syncfusion:SfMaskedTextBox.Mask>
        <syncfusion:SfMaskedTextBox.Description>Format: MM/DD/YYYY (e.g., 12/25/1990)</syncfusion:SfMaskedTextBox.Description>
    </syncfusion:SfMaskedTextBox>
    
    <syncfusion:SfMaskedTextBox Width="300"
                                HorizontalAlignment="Left">
        <syncfusion:SfMaskedTextBox.HeaderTemplate>
            <DataTemplate>
                <StackPanel Orientation="Horizontal" Spacing="8">
                    <FontIcon Glyph="&#xE717;" FontSize="16" Foreground="#0078D4"/>
                    <TextBlock Text="Phone Number" FontWeight="SemiBold"/>
                    <TextBlock Text="*" Foreground="Red" FontSize="16"/>
                </StackPanel>
            </DataTemplate>
        </syncfusion:SfMaskedTextBox.HeaderTemplate>
        <syncfusion:SfMaskedTextBox.Mask>(000) 000-0000</syncfusion:SfMaskedTextBox.Mask>
        <syncfusion:SfMaskedTextBox.Description>Primary contact number</syncfusion:SfMaskedTextBox.Description>
    </syncfusion:SfMaskedTextBox>
    
    <syncfusion:SfMaskedTextBox Width="300"
                                HorizontalAlignment="Left"
                                MaskType="RegEx">
        <syncfusion:SfMaskedTextBox.HeaderTemplate>
            <DataTemplate>
                <StackPanel Orientation="Horizontal" Spacing="8">
                    <FontIcon Glyph="&#xE715;" FontSize="16" Foreground="#0078D4"/>
                    <TextBlock Text="Email" FontWeight="SemiBold"/>
                </StackPanel>
            </DataTemplate>
        </syncfusion:SfMaskedTextBox.HeaderTemplate>
        <syncfusion:SfMaskedTextBox.Mask>[A-Za-z0-9._%-]+@[A-Za-z0-9]+\.[A-Za-z]{2,3}</syncfusion:SfMaskedTextBox.Mask>
        <syncfusion:SfMaskedTextBox.Description>Optional - for account notifications</syncfusion:SfMaskedTextBox.Description>
    </syncfusion:SfMaskedTextBox>
</StackPanel>
```

**Result:** Professional form layout with icons, required field indicators, and helpful descriptions.

## Localization Support

Headers and descriptions support localization via resource strings:

**App resources (Strings/en-US/Resources.resw):**
```xml
<data name="PhoneNumberHeader">
  <value>Phone Number</value>
</data>
<data name="PhoneNumberDescription">
  <value>Enter your 10-digit phone number</value>
</data>
```

**XAML with resource binding:**
```xaml
<syncfusion:SfMaskedTextBox Width="250"
                            Header="{x:Bind strings:Resources.PhoneNumberHeader}"
                            Mask="(000) 000-0000"
                            Description="{x:Bind strings:Resources.PhoneNumberDescription}"/>
```

## Dynamic Header and Description

Change header and description at runtime based on context:

```csharp
private void SetPhoneNumberContext(bool isMobile)
{
    if (isMobile)
    {
        phoneInput.Header = "Mobile Number";
        phoneInput.Description = "Enter your mobile phone number for SMS verification";
    }
    else
    {
        phoneInput.Header = "Landline Number";
        phoneInput.Description = "Enter your home or office phone number";
    }
}
```

## Accessibility Considerations

- **Header:** Provides accessible label for screen readers
- **Description:** Adds additional context announced by screen readers
- **HeaderTemplate:** Ensure text elements have proper accessibility properties

**Example with accessibility:**

```xaml
<syncfusion:SfMaskedTextBox Width="300"
                            Mask="000-00-0000"
                            AutomationProperties.Name="Social Security Number"
                            AutomationProperties.HelpText="Enter your 9-digit SSN">
    <syncfusion:SfMaskedTextBox.HeaderTemplate>
        <DataTemplate>
            <TextBlock Text="SSN" 
                       FontWeight="SemiBold"
                       AutomationProperties.AccessibilityView="Raw"/>
        </DataTemplate>
    </syncfusion:SfMaskedTextBox.HeaderTemplate>
    <syncfusion:SfMaskedTextBox.Description>Format: 000-00-0000</syncfusion:SfMaskedTextBox.Description>
</syncfusion:SfMaskedTextBox>
```

## Key Takeaways

- **Header:** Simple string label above the control
- **HeaderTemplate:** Custom DataTemplate for styled headers with icons, colors, and layout
- **Description:** Help text below the control for instructions or examples
- **Use both:** Combine Header and Description for complete field guidance
- **Accessibility:** Headers and descriptions support screen readers
- **Localization:** Use resource strings for multilingual support
- **Dynamic content:** Change header/description at runtime based on context

## Next Steps

- **[Error Indication](error-indication.md)** - Display validation errors with visual feedback
- **[Getting Started](getting-started.md)** - Basic setup and usage
- **[Mask Types](mask-types.md)** - Simple and RegEx mask patterns
