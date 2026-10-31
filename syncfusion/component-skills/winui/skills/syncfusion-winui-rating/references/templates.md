# Templates and Custom Visuals in WinUI Rating

The Rating control supports custom visual representations using the `ItemTemplateSelector` property. Replace default stars with hearts, emojis, images, or any custom shape.

## Table of Contents
- [Overview](#overview)
- [Path-Based Templates](#path-based-templates)
- [Image-Based Templates](#image-based-templates)
- [Custom DataTemplateSelector](#custom-datatemplateSelector)
- [Best Practices](#best-practices)

## Overview

**Property:** `ItemTemplateSelector`  
**Type:** `DataTemplateSelector`  
**Default:** `null` (uses default star template)

### What is ItemTemplateSelector?

`ItemTemplateSelector` allows you to define custom visual representations for rating items. You can:
- Use different shapes (hearts, thumbs, custom paths)
- Display images or emojis
- Show different visuals based on item state (selected/unselected)
- Create unique rating experiences

### Basic Concept

1. **Create DataTemplates** - Define selected and unselected visuals
2. **Implement DataTemplateSelector** - Logic to choose appropriate template
3. **Apply to Rating** - Set ItemTemplateSelector property

## Path-Based Templates

Use vector paths to create custom shapes like hearts, thumbs, or any SVG-based design.

### Heart Rating Example

**Step 1: Define DataTemplates**

```xml
<Page.Resources>
    <!-- Selected heart (filled) -->
    <DataTemplate x:Key="selectedHeartTemplate">
        <Viewbox>
            <Path 
                Margin="4" 
                Fill="#F44D57" 
                Data="M16.2551 1.76462L16.2552 1.76479C16.6493 2.16617 16.9623 2.64325 17.1761 3.16901C17.3899 3.69479 17.5 4.25866 17.5 4.82833C17.5 5.39799 17.3899 5.96186 17.1761 6.48764C16.9623 7.0134 16.6493 7.49048 16.2552 7.89187L16.2551 7.89195L15.3424 8.82219L8.99977 15.2861L2.65718 8.82219L1.74439 7.89195C0.94868 7.08101 0.5 5.97917 0.5 4.82833C0.5 3.67748 0.94868 2.57564 1.74439 1.7647C2.53979 0.954092 3.61655 0.500469 4.73725 0.500469C5.85795 0.500469 6.9347 0.954092 7.7301 1.7647L8.64288 2.69495C8.73691 2.79077 8.86552 2.84476 8.99977 2.84476C9.13402 2.84476 9.26263 2.79077 9.35666 2.69495L10.2694 1.7647L10.2695 1.76462C10.6634 1.36307 11.1304 1.04504 11.6438 0.828245C12.1572 0.611455 12.7072 0.5 13.2623 0.5C13.8174 0.5 13.8674 0.611454 14.8807 0.828245C15.3941 1.04504 15.8612 1.36307 16.2551 1.76462Z"/>
        </Viewbox>
    </DataTemplate>
    
    <!-- Unselected heart (outline) -->
    <DataTemplate x:Key="unselectedHeartTemplate">
        <Viewbox>
            <Path 
                Margin="4" 
                Fill="{ThemeResource SystemChromeGrayColor}" 
                Data="M16.612 1.41452C16.1722 0.966073 15.65 0.610337 15.0752 0.367629C14.5005 0.124922 13.8844 0 13.2623 0C12.6401 0 12.0241 0.124922 11.4493 0.367629C10.8746 0.610337 10.3524 0.966073 9.91255 1.41452L8.99977 2.34476L8.08699 1.41452C7.19858 0.509117 5.99364 0.0004693 4.73725 0.000469309C3.48085 0.000469319 2.27591 0.509117 1.38751 1.41452C0.499101 2.31992 9.36088e-09 3.5479 0 4.82833C-9.36088e-09 6.10875 0.499101 7.33674 1.38751 8.24214L2.30029 9.17238L8.99977 16L15.6992 9.17238L16.612 8.24214C17.0521 7.79391 17.4011 7.26171 17.6393 6.67596C17.8774 6.0902 18 5.46237 18 4.82833C18 4.19428 17.8774 3.56645 17.6393 2.9807C17.4011 2.39494 17.0521 1.86275 16.612 1.41452Z"/>
        </Viewbox>
    </DataTemplate>
</Page.Resources>
```

**Step 2: Implement DataTemplateSelector**

```csharp
using Microsoft.UI.Xaml;
using Microsoft.UI.Xaml.Controls;
using Syncfusion.UI.Xaml.Editors;

public class HeartTemplateSelector : DataTemplateSelector
{
    public DataTemplate SelectedTemplate { get; set; }
    public DataTemplate UnselectedTemplate { get; set; }

    protected override DataTemplate SelectTemplateCore(object item, DependencyObject container)
    {
        SfRatingItem ratingItem = item as SfRatingItem;
        if (ratingItem == null)
            return null;

        if (ratingItem.IsSelected)
            return SelectedTemplate;
        
        return UnselectedTemplate;
    }
}
```

**Step 3: Create Selector in XAML**

```xml
<Page.Resources>
    <!-- DataTemplates defined above -->
    
    <local:HeartTemplateSelector 
        x:Key="heartTemplate"
        SelectedTemplate="{StaticResource selectedHeartTemplate}"
        UnselectedTemplate="{StaticResource unselectedHeartTemplate}"/>
</Page.Resources>
```

**Step 4: Apply to Rating**

```xml
<syncfusion:SfRating 
    Value="3" 
    ItemsCount="5"
    ItemTemplateSelector="{StaticResource heartTemplate}"/>
```

### Complete Heart Rating Example

```xml
<Page
    x:Class="RatingDemo.HeartRatingPage"
    xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"
    xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
    xmlns:local="using:RatingDemo"
    xmlns:syncfusion="using:Syncfusion.UI.Xaml.Editors">
    
    <Page.Resources>
        <ResourceDictionary>
            <ResourceDictionary.ThemeDictionaries>
                <ResourceDictionary x:Key="Light">
                    <SolidColorBrush x:Key="FillColor" Color="#DCDCDC"/>
                </ResourceDictionary>
                <ResourceDictionary x:Key="Dark">
                    <SolidColorBrush x:Key="FillColor" Color="#474747"/>
                </ResourceDictionary>
            </ResourceDictionary.ThemeDictionaries>
            
            <DataTemplate x:Key="selectedHeartTemplate">
                <Viewbox>
                    <Path Margin="4" Fill="#F44D57" 
                          Data="M16.2551 1.76462L16.2552 1.76479C16.6493 2.16617 16.9623 2.64325 17.1761 3.16901C17.3899 3.69479 17.5 4.25866 17.5 4.82833C17.5 5.39799 17.3899 5.96186 17.1761 6.48764C16.9623 7.0134 16.6493 7.49048 16.2552 7.89187L16.2551 7.89195L15.3424 8.82219L8.99977 15.2861L2.65718 8.82219L1.74439 7.89195C0.94868 7.08101 0.5 5.97917 0.5 4.82833C0.5 3.67748 0.94868 2.57564 1.74439 1.7647C2.53979 0.954092 3.61655 0.500469 4.73725 0.500469C5.85795 0.500469 6.9347 0.954092 7.7301 1.7647L8.64288 2.69495C8.73691 2.79077 8.86552 2.84476 8.99977 2.84476C9.13402 2.84476 9.26263 2.79077 9.35666 2.69495L10.2694 1.7647L10.2695 1.76462C10.6634 1.36307 11.1304 1.04504 11.6438 0.828245C12.1572 0.611455 12.7072 0.5 13.2623 0.5C13.8174 0.5 13.3674 0.611454 14.8807 0.828245C15.3941 1.04504 15.8612 1.36307 16.2551 1.76462Z"/>
                </Viewbox>
            </DataTemplate>
            
            <DataTemplate x:Key="unselectedHeartTemplate">
                <Viewbox>
                    <Path Margin="4" Fill="{ThemeResource FillColor}"
                          Data="M16.612 1.41452C16.1722 0.966073 15.65 0.610337 15.0752 0.367629C14.5005 0.124922 13.8844 0 13.2623 0C12.6401 0 12.0241 0.124922 11.4493 0.367629C10.8746 0.610337 10.3524 0.966073 9.91255 1.41452L8.99977 2.34476L8.08699 1.41452C7.19858 0.509117 5.99364 0.0004693 4.73725 0.000469309C3.48085 0.000469319 2.27591 0.509117 1.38751 1.41452C0.499101 2.31992 9.36088e-09 3.5479 0 4.82833C-9.36088e-09 6.10875 0.499101 7.33674 1.38751 8.24214L2.30029 9.17238L8.99977 16L15.6992 9.17238L16.612 8.24214C17.0521 7.79391 17.4011 7.26171 17.6393 6.67596C17.8774 6.0902 18 5.46237 18 4.82833C18 4.19428 17.8774 3.56645 17.6393 2.9807C17.4011 2.39494 17.0521 1.86275 16.612 1.41452Z"/>
                </Viewbox>
            </DataTemplate>
            
            <local:HeartTemplateSelector 
                x:Key="heartTemplate"
                SelectedTemplate="{StaticResource selectedHeartTemplate}"
                UnselectedTemplate="{StaticResource unselectedHeartTemplate}"/>
        </ResourceDictionary>
    </Page.Resources>
    
    <StackPanel HorizontalAlignment="Center" VerticalAlignment="Center" Spacing="20">
        <TextBlock Text="How much do you love this?" FontSize="20" FontWeight="Bold"/>
        <syncfusion:SfRating 
            Value="4" 
            ItemsCount="5"
            ItemSize="50"
            ItemTemplateSelector="{StaticResource heartTemplate}"/>
    </StackPanel>
</Page>
```

## Image-Based Templates

Use images or emojis to create expressive rating systems.

### Emoji Rating Example

Perfect for satisfaction surveys or user experience feedback.

**Step 1: Define Image Templates**

```xml
<Page.Resources>
    <!-- Sad face (1 star) -->
    <DataTemplate x:Key="sadSelectedTemplate">
        <Grid Margin="3">
            <Image Source="/Assets/Rating/SadSelected.png"/>
        </Grid>
    </DataTemplate>
    <DataTemplate x:Key="sadUnselectedTemplate">
        <Grid Margin="3">
            <Image Source="/Assets/Rating/SadUnselected.png"/>
        </Grid>
    </DataTemplate>
    
    <!-- Unhappy face (2 stars) -->
    <DataTemplate x:Key="unhappySelectedTemplate">
        <Grid Margin="3">
            <Image Source="/Assets/Rating/UnhappySelected.png"/>
        </Grid>
    </DataTemplate>
    <DataTemplate x:Key="unhappyUnselectedTemplate">
        <Grid Margin="3">
            <Image Source="/Assets/Rating/UnhappyUnselected.png"/>
        </Grid>
    </DataTemplate>
    
    <!-- Neutral face (3 stars) -->
    <DataTemplate x:Key="neutralSelectedTemplate">
        <Grid Margin="3">
            <Image Source="/Assets/Rating/NeutralSelected.png"/>
        </Grid>
    </DataTemplate>
    <DataTemplate x:Key="neutralUnselectedTemplate">
        <Grid Margin="3">
            <Image Source="/Assets/Rating/NeutralUnselected.png"/>
        </Grid>
    </DataTemplate>
    
    <!-- Happy face (4 stars) -->
    <DataTemplate x:Key="happySelectedTemplate">
        <Grid Margin="3">
            <Image Source="/Assets/Rating/HappySelected.png"/>
        </Grid>
    </DataTemplate>
    <DataTemplate x:Key="happyUnselectedTemplate">
        <Grid Margin="3">
            <Image Source="/Assets/Rating/HappyUnselected.png"/>
        </Grid>
    </DataTemplate>
    
    <!-- Excited face (5 stars) -->
    <DataTemplate x:Key="excitedSelectedTemplate">
        <Grid Margin="3">
            <Image Source="/Assets/Rating/ExcitedSelected.png"/>
        </Grid>
    </DataTemplate>
    <DataTemplate x:Key="excitedUnselectedTemplate">
        <Grid Margin="3">
            <Image Source="/Assets/Rating/ExcitedUnselected.png"/>
        </Grid>
    </DataTemplate>
</Page.Resources>
```

**Step 2: Implement Emoji DataTemplateSelector**

```csharp
public class EmojiTemplateSelector : DataTemplateSelector
{
    public DataTemplate SadTemplate { get; set; }
    public DataTemplate SadUnselectedTemplate { get; set; }
    public DataTemplate UnhappyTemplate { get; set; }
    public DataTemplate UnhappyUnselectedTemplate { get; set; }
    public DataTemplate NeutralTemplate { get; set; }
    public DataTemplate NeutralUnselectedTemplate { get; set; }
    public DataTemplate HappyTemplate { get; set; }
    public DataTemplate HappyUnselectedTemplate { get; set; }
    public DataTemplate ExcitedTemplate { get; set; }
    public DataTemplate ExcitedUnselectedTemplate { get; set; }

    protected override DataTemplate SelectTemplateCore(object item, DependencyObject container)
    {
        SfRating rating = container as SfRating;
        SfRatingItem ratingItem = item as SfRatingItem;
        
        if (ratingItem == null || rating == null)
            return null;

        int itemIndex = rating.Items.IndexOf(ratingItem);
        bool isSelected = (itemIndex + 1 <= rating.Value);

        switch (itemIndex)
        {
            case 0: // Sad
                return isSelected ? SadTemplate : SadUnselectedTemplate;
            case 1: // Unhappy
                return isSelected ? UnhappyTemplate : UnhappyUnselectedTemplate;
            case 2: // Neutral
                return isSelected ? NeutralTemplate : NeutralUnselectedTemplate;
            case 3: // Happy
                return isSelected ? HappyTemplate : HappyUnselectedTemplate;
            case 4: // Excited
                return isSelected ? ExcitedTemplate : ExcitedUnselectedTemplate;
            default:
                return null;
        }
    }
}
```

**Step 3: Apply Emoji Template**

```xml
<Page.Resources>
    <!-- All DataTemplates defined above -->
    
    <local:EmojiTemplateSelector 
        x:Key="emojiTemplate"
        SadTemplate="{StaticResource sadSelectedTemplate}"
        SadUnselectedTemplate="{StaticResource sadUnselectedTemplate}"
        UnhappyTemplate="{StaticResource unhappySelectedTemplate}"
        UnhappyUnselectedTemplate="{StaticResource unhappyUnselectedTemplate}"
        NeutralTemplate="{StaticResource neutralSelectedTemplate}"
        NeutralUnselectedTemplate="{StaticResource neutralUnselectedTemplate}"
        HappyTemplate="{StaticResource happySelectedTemplate}"
        HappyUnselectedTemplate="{StaticResource happyUnselectedTemplate}"
        ExcitedTemplate="{StaticResource excitedSelectedTemplate}"
        ExcitedUnselectedTemplate="{StaticResource excitedUnselectedTemplate}"/>
</Page.Resources>

<StackPanel>
    <TextBlock Text="How was your experience?" FontSize="18" Margin="0,0,0,15"/>
    <syncfusion:SfRating 
        Value="4" 
        ItemsCount="5"
        ItemSize="60"
        ItemTemplateSelector="{StaticResource emojiTemplate}"/>
</StackPanel>
```

### Using Font Icons (Segoe MDL2 Assets)

```xml
<Page.Resources>
    <DataTemplate x:Key="thumbsUpSelected">
        <Viewbox>
            <FontIcon 
                Glyph="&#xE8E1;" 
                FontFamily="Segoe MDL2 Assets" 
                Foreground="#4CAF50"/>
        </Viewbox>
    </DataTemplate>
    
    <DataTemplate x:Key="thumbsUpUnselected">
        <Viewbox>
            <FontIcon 
                Glyph="&#xE8E1;" 
                FontFamily="Segoe MDL2 Assets" 
                Foreground="Gray"/>
        </Viewbox>
    </DataTemplate>
    
    <local:SimpleTemplateSelector 
        x:Key="thumbsTemplate"
        SelectedTemplate="{StaticResource thumbsUpSelected}"
        UnselectedTemplate="{StaticResource thumbsUpUnselected}"/>
</Page.Resources>

<syncfusion:SfRating 
    Value="3" 
    ItemsCount="5"
    ItemSize="40"
    ItemTemplateSelector="{StaticResource thumbsTemplate}"/>
```

## Custom DataTemplateSelector

### Simple Template Selector (Reusable)

```csharp
public class SimpleTemplateSelector : DataTemplateSelector
{
    public DataTemplate SelectedTemplate { get; set; }
    public DataTemplate UnselectedTemplate { get; set; }

    protected override DataTemplate SelectTemplateCore(object item, DependencyObject container)
    {
        SfRatingItem ratingItem = item as SfRatingItem;
        
        if (ratingItem == null)
            return null;

        return ratingItem.IsSelected ? SelectedTemplate : UnselectedTemplate;
    }
}
```

### Advanced: Progressive Color Template Selector

Change color based on rating level:

```csharp
public class ProgressiveColorTemplateSelector : DataTemplateSelector
{
    public DataTemplate Level1Template { get; set; } // Red (1 star)
    public DataTemplate Level2Template { get; set; } // Orange (2 stars)
    public DataTemplate Level3Template { get; set; } // Yellow (3 stars)
    public DataTemplate Level4Template { get; set; } // Light Green (4 stars)
    public DataTemplate Level5Template { get; set; } // Green (5 stars)
    public DataTemplate UnselectedTemplate { get; set; }

    protected override DataTemplate SelectTemplateCore(object item, DependencyObject container)
    {
        SfRating rating = container as SfRating;
        SfRatingItem ratingItem = item as SfRatingItem;
        
        if (ratingItem == null || rating == null)
            return null;

        if (!ratingItem.IsSelected)
            return UnselectedTemplate;

        int itemIndex = rating.Items.IndexOf(ratingItem);
        
        switch (itemIndex)
        {
            case 0: return Level1Template;
            case 1: return Level2Template;
            case 2: return Level3Template;
            case 3: return Level4Template;
            case 4: return Level5Template;
            default: return UnselectedTemplate;
        }
    }
}
```

## Best Practices

### Design Guidelines

**Recognizable Icons:**
- Use universally understood symbols (stars, hearts, thumbs)
- Ensure icons are clear at different sizes
- Test readability across themes

**Visual Consistency:**
- Maintain consistent visual weight across all items
- Use similar sizes and spacing
- Keep selected/unselected states clearly distinguishable

**Color Choices:**
- Use colors that convey appropriate emotion
- Ensure adequate contrast with backgrounds
- Test in light and dark themes

### Performance

**Image Optimization:**
- Use vector graphics (Path) when possible for scalability
- Optimize image sizes if using bitmaps
- Consider using cached images for better performance

**Template Complexity:**
- Keep templates simple for better rendering performance
- Avoid heavy animations in templates
- Minimize nested elements

### Accessibility

**Alternative Text:**
- Provide descriptive tooltips
- Ensure screen readers can interpret rating values
- Don't rely solely on color to convey meaning

**Keyboard Navigation:**
- Template changes don't affect keyboard support
- Test arrow key navigation
- Ensure focus states are visible

### Common Mistakes to Avoid

❌ **Don't:**
- Use templates that are too detailed/complex
- Forget to define both selected and unselected states
- Use images without proper aspect ratios
- Make templates too small to see details

✅ **Do:**
- Test templates at multiple sizes
- Provide clear visual distinction between states
- Use Viewbox for scalable templates
- Keep templates simple and recognizable

## Troubleshooting

**Template not appearing:**
- Verify DataTemplateSelector is properly referenced
- Check if templates are defined in Resources
- Ensure SelectTemplateCore returns valid DataTemplate
- Verify item parameter is SfRatingItem

**Wrong template showing:**
- Debug SelectTemplateCore logic
- Check IsSelected property of SfRatingItem
- Verify template selector logic matches expected behavior

**Images not loading:**
- Verify image paths are correct (use relative paths)
- Ensure images are added to project with Build Action: Content
- Check image file names match exactly (case-sensitive)

**Poor visual quality:**
- Use vector paths instead of raster images when possible
- Wrap content in Viewbox for proper scaling
- Increase ItemSize if templates appear blurry

## Summary

Templates allow unlimited customization:
- **Path-based:** Vector shapes (hearts, custom SVG)
- **Image-based:** Emojis, icons, photographs
- **Font-based:** Segoe MDL2 Assets, custom fonts
- **Custom logic:** DataTemplateSelector for complex scenarios

Use templates to create unique, expressive rating experiences that match your application's personality and user expectations.