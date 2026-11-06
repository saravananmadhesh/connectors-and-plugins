# AvatarView Content Types

## Table of Contents
- [Overview](#overview)
- [Default Content Type](#default-content-type)
- [Initials Content Type](#initials-content-type)
- [CustomImage Content Type](#customimage-content-type)
- [AvatarCharacter Content Type](#avatarcharacter-content-type)
- [Group Content Type](#group-content-type)
- [Choosing the Right Content Type](#choosing-the-right-content-type)

## Overview

The `ContentType` property determines what the AvatarView displays. There are 5 content types:

| ContentType | What It Displays | When to Use |
|-------------|------------------|-------------|
| `Default` | Avatar1 character (pre-defined image) | No specific content, placeholder |
| `Initials` | User's initials from name | No profile picture available |
| `CustomImage` | User-provided image | Profile picture exists |
| `AvatarCharacter` | One of 25 pre-defined avatars | Diverse representation without custom images |
| `Group` | Multiple avatars (up to 3) | Group chats, teams, collaborators |

## Default Content Type

Shows the Avatar1 character (a pre-defined avatar image) when no other content is specified.

```xaml
<!-- Default - shows Avatar1 character -->
<syncfusion:SfAvatarView 
    ContentType="Default"
    AvatarSize="Medium"/>
```

```csharp
SfAvatarView avatarView = new SfAvatarView
{
    ContentType = AvatarContentType.Default,
    AvatarSize = AvatarSize.Medium
};
```

**When to use:**
- Placeholder when user data hasn't loaded yet
- Default fallback when no other content is available
- Testing and prototyping

**Note:** If you don't set `ContentType`, it defaults to `Default`.

## Initials Content Type

Displays user initials generated from the `AvatarName` property. The `InitialsType` property controls how initials are formatted.

### Single Character Initials

```xaml
<syncfusion:SfAvatarView 
    ContentType="Initials"
    AvatarName="Alex"
    InitialsType="SingleCharacter"
    AvatarSize="Large"
    Background="CornflowerBlue"
    Foreground="White"/>
```

**Result:** Displays "A"

```csharp
SfAvatarView avatarView = new SfAvatarView
{
    ContentType = AvatarContentType.Initials,
    AvatarName = "Alex",
    InitialsType = AvatarInitialsType.SingleCharacter,
    AvatarSize = AvatarSize.Large,
    Background = new SolidColorBrush(Colors.CornflowerBlue),
    Foreground = new SolidColorBrush(Colors.White)
};
```

### Double Character Initials

```xaml
<syncfusion:SfAvatarView 
    ContentType="Initials"
    AvatarName="John Doe"
    InitialsType="DoubleCharacter"
    AvatarSize="Large"
    Background="#FF6A5ACD"
    Foreground="White"/>
```

**Result:** Displays "JD"

**InitialsType Logic:**
- **SingleCharacter:** First letter of `AvatarName`
  - "Alex" → "A"
  - "John Doe" → "J"
- **DoubleCharacter with single word:** First and last letter
  - "Alex" → "AX"
- **DoubleCharacter with multiple words:** First letter of first two words
  - "John Doe" → "JD"
  - "Sarah Jane Smith" → "SJ"

### Initials with Custom Colors

```xaml
<StackPanel Orientation="Horizontal" Spacing="10">
    <syncfusion:SfAvatarView 
        ContentType="Initials"
        AvatarName="Emma Watson"
        InitialsType="DoubleCharacter"
        AvatarSize="Medium"
        Background="#FFE91E63"
        Foreground="White"/>
    
    <syncfusion:SfAvatarView 
        ContentType="Initials"
        AvatarName="Michael Brown"
        InitialsType="DoubleCharacter"
        AvatarSize="Medium"
        Background="#FF4CAF50"
        Foreground="White"/>
    
    <syncfusion:SfAvatarView 
        ContentType="Initials"
        AvatarName="Olivia Taylor"
        InitialsType="DoubleCharacter"
        AvatarSize="Medium"
        Background="#FF2196F3"
        Foreground="White"/>
</StackPanel>
```

**When to use Initials:**
- User doesn't have a profile picture
- Fast loading required (no image downloads)
- Contact lists with many users
- Generating consistent colors from names

### Generating Consistent Colors from Names

```csharp
private SolidColorBrush GetColorFromName(string name)
{
    // Generate consistent color from name hash
    int hash = name.GetHashCode();
    byte r = (byte)((hash & 0xFF0000) >> 16);
    byte g = (byte)((hash & 0x00FF00) >> 8);
    byte b = (byte)(hash & 0x0000FF);
    
    // Ensure colors are vibrant (adjust if too dark/light)
    r = (byte)(r > 128 ? r : r + 100);
    g = (byte)(g > 128 ? g : g + 100);
    b = (byte)(b > 128 ? b : b + 100);
    
    return new SolidColorBrush(Color.FromArgb(255, r, g, b));
}

// Usage
avatarView.Background = GetColorFromName("John Doe");
```

## CustomImage Content Type

Displays a custom image from the `ImageSource` property.

### Basic Custom Image

```xaml
<syncfusion:SfAvatarView 
    ContentType="CustomImage"
    ImageSource="ms-appx:///Assets/ProfilePictures/john.jpg"
    AvatarSize="Large"
    AvatarShape="Circle"/>
```

```csharp
SfAvatarView avatarView = new SfAvatarView
{
    ContentType = AvatarContentType.CustomImage,
    ImageSource = new BitmapImage(new Uri("ms-appx:///Assets/ProfilePictures/john.jpg")),
    AvatarSize = AvatarSize.Large,
    AvatarShape = AvatarShape.Circle
};
```

### Loading Image from URL

```csharp
private async Task LoadAvatarFromUrl(string imageUrl)
{
    try
    {
        avatarView.ContentType = AvatarContentType.CustomImage;
        avatarView.ImageSource = new BitmapImage(new Uri(imageUrl));
    }
    catch (Exception ex)
    {
        // Fallback to initials if image fails to load
        avatarView.ContentType = AvatarContentType.Initials;
        avatarView.AvatarName = "User";
        avatarView.InitialsType = AvatarInitialsType.SingleCharacter;
    }
}
```

### Dynamic Image with Fallback

```csharp
private void ConfigureAvatar(User user)
{
    if (!string.IsNullOrEmpty(user.ProfileImageUrl))
    {
        avatarView.ContentType = AvatarContentType.CustomImage;
        avatarView.ImageSource = new BitmapImage(new Uri(user.ProfileImageUrl));
    }
    else if (!string.IsNullOrEmpty(user.FullName))
    {
        avatarView.ContentType = AvatarContentType.Initials;
        avatarView.AvatarName = user.FullName;
        avatarView.InitialsType = AvatarInitialsType.DoubleCharacter;
        avatarView.Background = GetColorFromName(user.FullName);
    }
    else
    {
        avatarView.ContentType = AvatarContentType.Default;
    }
}
```

**Image Source Options:**
- **App assets:** `ms-appx:///Assets/image.png`
- **Web URLs:** `https://example.com/avatar.jpg`
- **Local file system:** `file:///C:/Users/.../image.png`
- **User's library:** Use file picker to let users select images

**When to use CustomImage:**
- User has uploaded a profile picture
- Displaying real user photos
- Showing company logos or team icons

## AvatarCharacter Content Type

Displays one of 25 pre-defined avatar characters. Use the `AvatarCharacter` property to select the character.

### Available Avatar Characters

```csharp
public enum AvatarCharacter
{
    Avatar1, Avatar2, Avatar3, Avatar4, Avatar5,
    Avatar6, Avatar7, Avatar8, Avatar9, Avatar10,
    Avatar11, Avatar12, Avatar13, Avatar14, Avatar15,
    Avatar16, Avatar17, Avatar18, Avatar19, Avatar20,
    Avatar21, Avatar22, Avatar23, Avatar24, Avatar25
}
```

### Single Avatar Character

```xaml
<syncfusion:SfAvatarView 
    ContentType="AvatarCharacter"
    AvatarCharacter="Avatar15"
    AvatarSize="Large"
    AvatarShape="Circle"/>
```

```csharp
SfAvatarView avatarView = new SfAvatarView
{
    ContentType = AvatarContentType.AvatarCharacter,
    AvatarCharacter = AvatarCharacter.Avatar15,
    AvatarSize = AvatarSize.Large,
    AvatarShape = AvatarShape.Circle
};
```

### Multiple Avatar Characters (Gallery)

```xaml
<ItemsControl ItemsSource="{x:Bind AvatarCharacters}">
    <ItemsControl.ItemsPanel>
        <ItemsPanelTemplate>
            <WrapGrid Orientation="Horizontal"/>
        </ItemsPanelTemplate>
    </ItemsControl.ItemsPanel>
    <ItemsControl.ItemTemplate>
        <DataTemplate x:DataType="syncfusion:AvatarCharacter">
            <syncfusion:SfAvatarView 
                ContentType="AvatarCharacter"
                AvatarCharacter="{x:Bind}"
                AvatarSize="Medium"
                Margin="5"/>
        </DataTemplate>
    </ItemsControl.ItemTemplate>
</ItemsControl>
```

```csharp
public List<AvatarCharacter> AvatarCharacters { get; set; } = new()
{
    AvatarCharacter.Avatar1,
    AvatarCharacter.Avatar2,
    AvatarCharacter.Avatar3,
    AvatarCharacter.Avatar4,
    AvatarCharacter.Avatar5,
    AvatarCharacter.Avatar6,
    AvatarCharacter.Avatar7,
    AvatarCharacter.Avatar8,
    // ... up to Avatar25
};
```

### Random Avatar Character

```csharp
private void AssignRandomAvatar()
{
    Random random = new Random();
    int avatarNumber = random.Next(1, 26); // 1-25
    avatarView.ContentType = AvatarContentType.AvatarCharacter;
    avatarView.AvatarCharacter = (AvatarCharacter)(avatarNumber - 1);
}
```

**When to use AvatarCharacter:**
- User hasn't uploaded a profile picture yet
- Want diverse avatar options without custom images
- Gaming or social apps with character selection
- Anonymous users who need visual representation
- Placeholder avatars with more personality than initials

## Group Content Type

Displays multiple avatars in a group view, supporting up to 3 users. Use the `GroupSource` property with a collection and member paths to configure.

### Group View with Images

```xaml
<syncfusion:SfAvatarView 
    ContentType="Group"
    GroupSource="{x:Bind TeamMembers}"
    ImageSourceMemberPath="ProfileImage"
    AvatarSize="Large"/>
```

```csharp
public class TeamMember
{
    public string ProfileImage { get; set; }
}

public ObservableCollection<TeamMember> TeamMembers { get; set; } = new()
{
    new TeamMember { ProfileImage = "ms-appx:///Assets/user1.png" },
    new TeamMember { ProfileImage = "ms-appx:///Assets/user2.png" },
    new TeamMember { ProfileImage = "ms-appx:///Assets/user3.png" }
};
```

### Group View with Initials

```xaml
<syncfusion:SfAvatarView 
    ContentType="Group"
    GroupSource="{x:Bind Collaborators}"
    InitialsMemberPath="Name"
    BackgroundColorMemberPath="BackgroundColor"
    InitialsColorMemberPath="InitialsColor"
    AvatarSize="Large"/>
```

```csharp
public class Collaborator
{
    public string Name { get; set; }
    public Color BackgroundColor { get; set; }
    public Color InitialsColor { get; set; }
}

public ObservableCollection<Collaborator> Collaborators { get; set; } = new()
{
    new Collaborator 
    { 
        Name = "Alex", 
        BackgroundColor = Colors.LightBlue, 
        InitialsColor = Colors.Navy 
    },
    new Collaborator 
    { 
        Name = "Maria", 
        BackgroundColor = Colors.LightPink, 
        InitialsColor = Colors.DarkRed 
    },
    new Collaborator 
    { 
        Name = "John", 
        BackgroundColor = Colors.LightGreen, 
        InitialsColor = Colors.DarkGreen 
    }
};
```

### Group View with Mixed Content

```csharp
public class GroupMember
{
    public string Name { get; set; }
    public string ProfileImage { get; set; }
    public Color BackgroundColor { get; set; }
    public Color InitialsColor { get; set; }
}

public ObservableCollection<GroupMember> GroupMembers { get; set; } = new()
{
    new GroupMember { ProfileImage = "ms-appx:///Assets/user1.png" },
    new GroupMember { Name = "Alex", BackgroundColor = Colors.CornflowerBlue, InitialsColor = Colors.White },
    new GroupMember { ProfileImage = "ms-appx:///Assets/user3.png" }
};
```

```xaml
<syncfusion:SfAvatarView 
    ContentType="Group"
    GroupSource="{x:Bind GroupMembers}"
    ImageSourceMemberPath="ProfileImage"
    InitialsMemberPath="Name"
    BackgroundColorMemberPath="BackgroundColor"
    InitialsColorMemberPath="InitialsColor"
    AvatarSize="Large"/>
```

### Group View Member Paths

| Property | Type | Description |
|----------|------|-------------|
| `GroupSource` | IEnumerable | Collection of group members (up to 3 displayed) |
| `ImageSourceMemberPath` | string | Property path for member's image |
| `InitialsMemberPath` | string | Property path for member's name (for initials) |
| `BackgroundColorMemberPath` | string | Property path for avatar background color |
| `InitialsColorMemberPath` | string | Property path for initials text color |

**Group Display Logic:**
- If member has `ImageSourceMemberPath` value → shows image
- Else if member has `InitialsMemberPath` value → shows initials
- Uses colors from `BackgroundColorMemberPath` and `InitialsColorMemberPath`
- **Maximum 3 items displayed.** If GroupSource has more, only first 3 are shown.

**When to use Group:**
- Team collaboration views
- Group chat participants
- Shared document contributors
- Project members display
- Multi-user assignments

## Choosing the Right Content Type

```
User has profile picture? ──Yes──> CustomImage
        │
        No
        │
User has name? ──Yes──> Initials (fast, consistent colors)
        │
        No
        │
Multiple users? ──Yes──> Group (up to 3)
        │
        No
        │
Want character diversity? ──Yes──> AvatarCharacter (25 options)
        │
        No
        │
Default (Avatar1)
```

### Comparison Table

| Scenario | Recommended Type | Reason |
|----------|------------------|--------|
| User uploaded photo | CustomImage | Shows real user |
| No photo, has name | Initials | Fast, no image needed |
| Anonymous user | AvatarCharacter | More personality than default |
| Team display | Group | Shows all members |
| Loading placeholder | Default | Simple fallback |
| Contact list (many users) | Initials | Lightweight, fast rendering |
| Profile page | CustomImage → Initials fallback | Best quality when available |
| Chat messages | Initials or AvatarCharacter | Fast, doesn't slow scrolling |

### Performance Considerations

**Fastest to Slowest:**
1. Default (static image)
2. AvatarCharacter (static image)
3. Initials (text rendering)
4. Group (multiple items)
5. CustomImage (image loading, especially from URLs)

**For long lists:** Use Initials or AvatarCharacter to avoid image loading delays.
