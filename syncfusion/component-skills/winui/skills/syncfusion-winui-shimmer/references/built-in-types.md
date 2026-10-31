# Built-in Types in WinUI Shimmer

## Table of Contents
- [Overview](#overview)
- [Type Property](#type-property)
- [Available Shimmer Types](#available-shimmer-types)
- [CirclePersona (Default)](#circlepersona-default)
- [SquarePersona](#squarepersona)
- [Profile](#profile)
- [Article](#article)
- [Video](#video)
- [Feed](#feed)
- [Shopping](#shopping)
- [Comparison and Selection Guide](#comparison-and-selection-guide)

## Overview

The Shimmer control provides **7 built-in shimmer types**, each designed for specific content structures. These pre-designed layouts eliminate the need to create custom shimmer designs for common UI patterns.

**Key Benefits:**
- Ready-to-use skeleton screens for common layouts
- No custom design required
- Consistent shimmer patterns
- Optimized for typical content structures

## Type Property

Use the `Type` property to select a built-in shimmer layout:

**XAML:**
```xaml
<syncfusion:SfShimmer Type="Article"/>
```

**C#:**
```csharp
shimmer.Type = ShimmerType.Article;
```

**Property Details:**
- **Type:** `ShimmerType` (enum)
- **Default:** `CirclePersona`
- **Options:** 7 shimmer types (see below)

## Available Shimmer Types

The `ShimmerType` enum provides these options:

1. **CirclePersona** - Circular avatar with text lines (default)
2. **SquarePersona** - Square avatar with text lines
3. **Profile** - Detailed profile layout with large avatar
4. **Article** - Blog/article layout with title and content
5. **Video** - Video thumbnail with title and description
6. **Feed** - Social media feed item layout
7. **Shopping** - Product card layout with image and details

## CirclePersona (Default)

Simple layout with circular avatar and text placeholders.

**Visual Structure:**
- Circular avatar (left)
- 2-3 horizontal text lines (right)

**XAML:**
```xaml
<syncfusion:SfShimmer Type="CirclePersona"/>
```

**C#:**
```csharp
SfShimmer shimmer = new SfShimmer
{
    Type = ShimmerType.CirclePersona
};
```

**Best For:**
- User lists (contacts, members)
- Chat conversations
- Comment sections
- Notification lists
- Simple profile cards

**Characteristics:**
- Minimal, compact design
- Works in narrow layouts
- Typical height: ~60-80px per item

**Example with Repeat:**
```xaml
<syncfusion:SfShimmer 
    Type="CirclePersona"
    RepeatCount="10"/>
```

## SquarePersona

Similar to CirclePersona but with square avatar.

**Visual Structure:**
- Square/rounded square avatar (left)
- 2-3 horizontal text lines (right)

**XAML:**
```xaml
<syncfusion:SfShimmer Type="SquarePersona"/>
```

**C#:**
```csharp
shimmer.Type = ShimmerType.SquarePersona;
```

**Best For:**
- App lists
- File lists with icons
- Team members with company logos
- Organizations/groups
- Service cards

**Characteristics:**
- Professional appearance
- Good for brand/logo placeholders
- Similar size to CirclePersona

**When to Choose:**
- Square avatars: SquarePersona
- Circular avatars: CirclePersona
- Mixed: Use custom layout or default to CirclePersona

## Profile

Comprehensive profile layout with large avatar and multiple text sections.

**Visual Structure:**
- Large circular avatar (top or left)
- Title/name placeholder
- Subtitle/role placeholder
- Multiple content lines
- Button/action placeholders

**XAML:**
```xaml
<syncfusion:SfShimmer Type="Profile"/>
```

**C#:**
```csharp
shimmer.Type = ShimmerType.Profile;
```

**Best For:**
- User profile pages
- Account details screens
- Contact information pages
- About sections
- Team member detail pages

**Characteristics:**
- Largest built-in type
- Rich detail structure
- Typically occupies full screen width

**Example:**
```xaml
<Grid>
    <syncfusion:SfShimmer 
        Type="Profile"
        Fill="#F8F8F8"
        WaveColor="#FFFFFF"/>
</Grid>
```

## Article

Blog/article layout optimized for text-heavy content.

**Visual Structure:**
- Title placeholder (wide)
- Subtitle/metadata line
- Multiple paragraph lines
- Optional image placeholder

**XAML:**
```xaml
<syncfusion:SfShimmer Type="Article"/>
```

**C#:**
```csharp
shimmer.Type = ShimmerType.Article;
```

**Best For:**
- Blog posts
- News articles
- Documentation pages
- Long-form content
- Reading lists

**Characteristics:**
- Text-focused layout
- Variable line lengths (natural reading pattern)
- Good for content-heavy pages

**Example with Multiple Articles:**
```xaml
<syncfusion:SfShimmer 
    Type="Article"
    RepeatCount="5"
    Fill="#FAFAFA"
    WaveColor="#E8E8E8"/>
```

**Typical Use Case:**
```csharp
// Show article shimmer while loading blog feed
private async void LoadBlogFeedAsync()
{
    shimmer.Visibility = Visibility.Visible;
    blogListView.Visibility = Visibility.Collapsed;
    
    var articles = await FetchArticlesAsync();
    
    blogListView.ItemsSource = articles;
    shimmer.Visibility = Visibility.Collapsed;
    blogListView.Visibility = Visibility.Visible;
}
```

## Video

Video content layout with thumbnail and metadata.

**Visual Structure:**
- Large rectangular thumbnail placeholder (16:9 ratio)
- Title line
- Channel/author line
- View count/metadata line

**XAML:**
```xaml
<syncfusion:SfShimmer Type="Video"/>
```

**C#:**
```csharp
shimmer.Type = ShimmerType.Video;
```

**Best For:**
- Video streaming apps
- Media galleries
- Tutorial lists
- YouTube-like feeds
- Playlist screens

**Characteristics:**
- Prominent thumbnail area
- Optimized for 16:9 video ratio
- Includes metadata placeholders

**Example for Video Grid:**
```xaml
<GridView>
    <GridView.ItemTemplate>
        <DataTemplate>
            <syncfusion:SfShimmer 
                Type="Video"
                Width="320"
                Height="240"/>
        </DataTemplate>
    </GridView.ItemTemplate>
</GridView>
```

**With Repeat:**
```xaml
<syncfusion:SfShimmer 
    Type="Video"
    RepeatCount="6"
    WaveDuration="1200"/>
```

## Feed

Social media feed item layout.

**Visual Structure:**
- Small avatar (top-left)
- Name/username line
- Timestamp/metadata line
- Content text area
- Optional image/media area
- Action buttons placeholder (like, comment, share)

**XAML:**
```xaml
<syncfusion:SfShimmer Type="Feed"/>
```

**C#:**
```csharp
shimmer.Type = ShimmerType.Feed;
```

**Best For:**
- Social media feeds
- Activity streams
- Timeline views
- News feeds
- Community posts

**Characteristics:**
- Complex multi-section layout
- Includes social interaction placeholders
- Balanced avatar and content layout

**Example:**
```xaml
<ScrollViewer>
    <syncfusion:SfShimmer 
        Type="Feed"
        RepeatCount="8"
        Fill="#F0F2F5"
        WaveColor="#E4E6EB"/>
</ScrollViewer>
```

## Shopping

E-commerce product card layout.

**Visual Structure:**
- Product image placeholder (square or portrait)
- Product name line
- Price placeholder
- Rating/review placeholder
- Additional details lines

**XAML:**
```xaml
<syncfusion:SfShimmer Type="Shopping"/>
```

**C#:**
```csharp
shimmer.Type = ShimmerType.Shopping;
```

**Best For:**
- Product catalogs
- Shopping apps
- E-commerce grids
- Marketplace apps
- Product search results

**Characteristics:**
- Product-focused layout
- Image-prominent design
- Includes price/rating areas

**Example in Grid:**
```xaml
<GridView>
    <GridView.Items>
        <syncfusion:SfShimmer Type="Shopping" Width="200" Height="300"/>
        <syncfusion:SfShimmer Type="Shopping" Width="200" Height="300"/>
        <syncfusion:SfShimmer Type="Shopping" Width="200" Height="300"/>
        <syncfusion:SfShimmer Type="Shopping" Width="200" Height="300"/>
    </GridView.Items>
</GridView>
```

**With Repeat for List View:**
```xaml
<syncfusion:SfShimmer 
    Type="Shopping"
    RepeatCount="10"
    WaveColor="#EEEEEE"/>
```

## Comparison and Selection Guide

### Shimmer Type Comparison Table

| Type | Avatar | Text Lines | Image Area | Best Use Case | Size |
|------|--------|------------|------------|---------------|------|
| **CirclePersona** | Circle | 2-3 | No | User lists, contacts | Small |
| **SquarePersona** | Square | 2-3 | No | App lists, files | Small |
| **Profile** | Large Circle | 5+ | Yes | Profile pages | Large |
| **Article** | No | Many | Optional | Blog posts, articles | Medium-Large |
| **Video** | Small Circle | 3-4 | Large (16:9) | Videos, media | Medium |
| **Feed** | Circle | 3-4 | Medium | Social feeds | Medium |
| **Shopping** | No | 3-4 | Large (portrait) | Products, catalogs | Medium |

### Selection Flow Chart

**Question 1: Is it a user/profile?**
- Small card → CirclePersona or SquarePersona
- Full profile page → Profile

**Question 2: Is it media content?**
- Videos → Video
- Products → Shopping

**Question 3: Is it text content?**
- Long articles → Article
- Social posts → Feed

**Question 4: None of the above?**
- Use custom layout (see custom-layouts.md)

### Usage Examples by Scenario

**Contact/User List:**
```xaml
<syncfusion:SfShimmer Type="CirclePersona" RepeatCount="15"/>
```

**Blog Homepage:**
```xaml
<syncfusion:SfShimmer Type="Article" RepeatCount="5"/>
```

**Video Streaming App:**
```xaml
<syncfusion:SfShimmer Type="Video" RepeatCount="8"/>
```

**E-commerce Homepage:**
```xaml
<syncfusion:SfShimmer Type="Shopping" RepeatCount="12"/>
```

**Social Media Feed:**
```xaml
<syncfusion:SfShimmer Type="Feed" RepeatCount="10"/>
```

**Profile Page:**
```xaml
<syncfusion:SfShimmer Type="Profile"/>
```

### Switching Types Dynamically

Change shimmer type based on content:

```csharp
private void SetShimmerType(ContentType contentType)
{
    shimmer.Type = contentType switch
    {
        ContentType.Users => ShimmerType.CirclePersona,
        ContentType.Articles => ShimmerType.Article,
        ContentType.Videos => ShimmerType.Video,
        ContentType.Products => ShimmerType.Shopping,
        ContentType.SocialPosts => ShimmerType.Feed,
        ContentType.Profile => ShimmerType.Profile,
        _ => ShimmerType.CirclePersona
    };
}
```

## Combining with Customization

Enhance built-in types with customization:

```xaml
<!-- Dark theme article shimmer -->
<syncfusion:SfShimmer 
    Type="Article"
    Fill="#1E1E1E"
    WaveColor="#2C2C2C"
    RepeatCount="5"/>

<!-- Branded shopping shimmer -->
<syncfusion:SfShimmer 
    Type="Shopping"
    Fill="#F5F5F5"
    WaveColor="#E0E0E0"
    WaveDuration="1500"
    RepeatCount="6"/>
```

## Performance Considerations

- All shimmer types are GPU-accelerated
- No performance difference between types
- Safe to use multiple shimmer controls simultaneously
- RepeatCount affects memory (avoid extremely high values)

## Next Steps

- **Custom Layouts:** See [custom-layouts.md](custom-layouts.md) to create custom shimmer designs for unique layouts
- **Customization:** See [customization.md](customization.md) to adjust colors, wave animation, and timing
