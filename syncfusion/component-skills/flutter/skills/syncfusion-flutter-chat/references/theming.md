# Theming

## Table of Contents

- [Overview](#overview)
- [Chat Theming (SfChatTheme)](#chat-theming-sfchattheme)
  - [Basic Theme Configuration](#basic-theme-configuration)
  - [Action Button Theme](#action-button-theme)
  - [Message Appearance](#message-appearance)
  - [Avatar Customization](#avatar-customization)
  - [Composer Styling](#composer-styling)
- [AIAssistView Theming (SfAIAssistViewTheme)](#aiassistview-theming-sfaiassistviewtheme)
  - [Basic Theme Configuration](#basic-theme-configuration-1)
  - [Request and Response Styling](#request-and-response-styling)
  - [Toolbar Theme](#toolbar-theme)
- [Complete Theme Examples](#complete-theme-examples)

## Overview

Both `SfChat` and `SfAIAssistView` can be extensively themed using dedicated theme data classes:

- **SfChatTheme** - Controls the appearance of the `SfChat` widget
- **SfAIAssistViewTheme** - Controls the appearance of the `SfAIAssistView` widget

These theme classes allow you to customize colors, text styles, shapes, spacing, and more to match your app's design system.

## Chat Theming (SfChatTheme)

### Basic Theme Configuration

Wrap your `SfChat` widget with `SfChatTheme` to apply custom styling:

```dart
SfChatTheme(
  data: SfChatThemeData(
    // Theme properties go here
  ),
  child: SfChat(
    messages: _messages,
    outgoingUser: '123-001',
  ),
)
```

### Action Button Theme

Customize the send button appearance:

```dart
SfChatTheme(
  data: SfChatThemeData(
    actionButtonForegroundColor: Colors.white,
    actionButtonBackgroundColor: Colors.blue,
    actionButtonFocusColor: Colors.blue[700],
    actionButtonHoverColor: Colors.blue[400],
    actionButtonSplashColor: Colors.blue[200],
    actionButtonDisabledForegroundColor: Colors.grey[400],
    actionButtonDisabledBackgroundColor: Colors.grey[200],
    actionButtonElevation: 4.0,
    actionButtonFocusElevation: 6.0,
    actionButtonHoverElevation: 6.0,
    actionButtonHighlightElevation: 8.0,
    actionButtonShape: RoundedRectangleBorder(
      borderRadius: BorderRadius.circular(28),
    ),
  ),
  child: SfChat(
    messages: _messages,
    outgoingUser: '123-001',
  ),
)
```

### Message Appearance

Customize incoming and outgoing message colors:

```dart
SfChatTheme(
  data: SfChatThemeData(
    // Incoming messages (messages from others)
    incomingMessageBackgroundColor: Colors.grey[200],
    
    // Outgoing messages (messages from current user)
    outgoingMessageBackgroundColor: Colors.blue,
    
    // Message content text style
    incomingContentTextStyle: TextStyle(
      color: Colors.black87,
      fontSize: 14,
    ),
    outgoingContentTextStyle: TextStyle(
      color: Colors.white,
      fontSize: 14,
    ),
    
    // Primary header text (username/sender name)
    incomingPrimaryHeaderTextStyle: TextStyle(
      color: Colors.black,
      fontSize: 12,
      fontWeight: FontWeight.bold,
    ),
    outgoingPrimaryHeaderTextStyle: TextStyle(
      color: Colors.white70,
      fontSize: 12,
      fontWeight: FontWeight.bold,
    ),
    
    // Secondary header text (timestamp)
    incomingSecondaryHeaderTextStyle: TextStyle(
      color: Colors.grey[600],
      fontSize: 10,
    ),
    outgoingSecondaryHeaderTextStyle: TextStyle(
      color: Colors.white60,
      fontSize: 10,
    ),
  ),
  child: SfChat(
    messages: _messages,
    outgoingUser: '123-001',
  ),
)
```

### Avatar Customization

Style the avatar background colors:

```dart
SfChatTheme(
  data: SfChatThemeData(
    incomingAvatarBackgroundColor: Colors.purple[100],
    outgoingAvatarBackgroundColor: Colors.blue[100],
  ),
  child: SfChat(
    messages: _messages,
    outgoingUser: '123-001',
  ),
)
```

### Composer Styling

Customize the text input area:

```dart
SfChatTheme(
  data: SfChatThemeData(
    // Text style for the composer
    editorTextStyle: TextStyle(
      color: Colors.black87,
      fontSize: 16,
    ),
  ),
  child: SfChat(
    messages: _messages,
    outgoingUser: '123-001',
    composer: ChatComposer(
      decoration: InputDecoration(
        hintText: 'Type a message',
      ),
    ),
  ),
)
```

### Message Shape

Customize the shape of message bubbles:

```dart
SfChatTheme(
  data: SfChatThemeData(
    incomingMessageShape: RoundedRectangleBorder(
      borderRadius: BorderRadius.only(
        topLeft: Radius.circular(16),
        topRight: Radius.circular(16),
        bottomRight: Radius.circular(16),
        bottomLeft: Radius.circular(4), // Pointed corner
      ),
    ),
    outgoingMessageShape: RoundedRectangleBorder(
      borderRadius: BorderRadius.only(
        topLeft: Radius.circular(16),
        topRight: Radius.circular(16),
        bottomLeft: Radius.circular(16),
        bottomRight: Radius.circular(4), // Pointed corner
      ),
    ),
  ),
  child: SfChat(
    messages: _messages,
    outgoingUser: '123-001',
  ),
)
```

## AIAssistView Theming (SfAIAssistViewTheme)

### Basic Theme Configuration

Wrap your `SfAIAssistView` widget with `SfAIAssistViewTheme`:

```dart
SfAIAssistViewTheme(
  data: SfAIAssistViewThemeData(
    // Theme properties go here
  ),
  child: SfAIAssistView(
    messages: _messages,
  ),
)
```

### Request and Response Styling

Customize the appearance of requests (user input) and responses (AI output):

```dart
SfAIAssistViewTheme(
  data: SfAIAssistViewThemeData(
    // Request bubble (user messages)
    requestMessageBackgroundColor: Colors.blue,
    requestContentTextStyle: TextStyle(
      color: Colors.white,
      fontSize: 14,
    ),
    requestPrimaryHeaderTextStyle: TextStyle(
      color: Colors.white70,
      fontSize: 12,
      fontWeight: FontWeight.w600,
    ),
    requestSecondaryHeaderTextStyle: TextStyle(
      color: Colors.white60,
      fontSize: 10,
    ),
    requestAvatarBackgroundColor: Colors.blue[100],
    
    // Response bubble (AI messages)
    responseMessageBackgroundColor: Colors.grey[200],
    responseContentTextStyle: TextStyle(
      color: Colors.black87,
      fontSize: 14,
    ),
    responsePrimaryHeaderTextStyle: TextStyle(
      color: Colors.black,
      fontSize: 12,
      fontWeight: FontWeight.w600,
    ),
    responseSecondaryHeaderTextStyle: TextStyle(
      color: Colors.grey[600],
      fontSize: 10,
    ),
    responseAvatarBackgroundColor: Colors.purple[100],
  ),
  child: SfAIAssistView(
    messages: _messages,
  ),
)
```

### Toolbar Theme

Customize the toolbar items that appear on response messages:

```dart
SfAIAssistViewTheme(
  data: SfAIAssistViewThemeData(
    // Toolbar item styling
    responseToolbarItemShape: WidgetStatePropertyAll(
      RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(8),
      ),
    ),
    responseToolbarItemBackgroundColor: WidgetStatePropertyAll(Colors.white),
  ),
  child: SfAIAssistView(
    messages: _messages,
  ),
)
```

### Action Button Theme

Similar to Chat, customize the send button:

```dart
SfAIAssistViewTheme(
  data: SfAIAssistViewThemeData(
    actionButtonForegroundColor: Colors.white,
    actionButtonBackgroundColor: Colors.purple,
    actionButtonFocusColor: Colors.purple[700],
    actionButtonHoverColor: Colors.purple[400],
    actionButtonSplashColor: Colors.purple[200],
    actionButtonDisabledForegroundColor: Colors.grey[400],
    actionButtonDisabledBackgroundColor: Colors.grey[200],
    actionButtonElevation: 2.0,
    actionButtonShape: CircleBorder(),
  ),
  child: SfAIAssistView(
    messages: _messages,
  ),
)
```

### Composer Styling

Customize the text input area for AI assistant:

```dart
SfAIAssistViewTheme(
  data: SfAIAssistViewThemeData(
    editorTextStyle: TextStyle(
      color: Colors.black87,
      fontSize: 16,
    ),
  ),
  child: SfAIAssistView(
    messages: _messages,
    composer: AssistComposer(
      decoration: InputDecoration(
        hintText: 'Ask me anything...',
      ),
    ),
  ),
)
```

### Message Shape

Customize response and request bubble shapes:

```dart
SfAIAssistViewTheme(
  data: SfAIAssistViewThemeData(
    requestMessageShape: RoundedRectangleBorder(
      borderRadius: BorderRadius.circular(20),
    ),
    responseMessageShape: RoundedRectangleBorder(
      borderRadius: BorderRadius.circular(12),
    ),
  ),
  child: SfAIAssistView(
    messages: _messages,
  ),
)
```

## Complete Theme Examples

### Chat - Dark Theme

```dart
SfChatTheme(
  data: SfChatThemeData(
    // Action button
    actionButtonBackgroundColor: Colors.teal,
    actionButtonForegroundColor: Colors.white,
    
    // Incoming messages
    incomingMessageBackgroundColor: Colors.grey[800],
    incomingContentTextStyle: TextStyle(
      color: Colors.white,
      fontSize: 15,
    ),
    incomingPrimaryHeaderTextStyle: TextStyle(
      color: Colors.white70,
      fontSize: 12,
      fontWeight: FontWeight.bold,
    ),
    incomingAvatarBackgroundColor: Colors.grey[700],
    
    // Outgoing messages
    outgoingMessageBackgroundColor: Colors.teal,
    outgoingContentTextStyle: TextStyle(
      color: Colors.white,
      fontSize: 15,
    ),
    outgoingPrimaryHeaderTextStyle: TextStyle(
      color: Colors.white70,
      fontSize: 12,
      fontWeight: FontWeight.bold,
    ),
    outgoingAvatarBackgroundColor: Colors.teal[700],
    
    // Composer
    editorTextStyle: TextStyle(
      color: Colors.white,
      fontSize: 16,
    ),
  ),
  child: Container(
    color: Colors.grey[900], // Dark background
    child: SfChat(
      messages: _messages,
      outgoingUser: '123-001',
      composer: ChatComposer(
        decoration: InputDecoration(
          hintText: 'Type a message',
          filled: true,
          fillColor: Colors.grey[800],
          border: OutlineInputBorder(
            borderRadius: BorderRadius.circular(24),
            borderSide: BorderSide.none,
          ),
        ),
      ),
    ),
  ),
)
```

### AIAssistView - Professional Theme

```dart
SfAIAssistViewTheme(
  data: SfAIAssistViewThemeData(
    // Action button
    actionButtonBackgroundColor: Color(0xFF6366F1), // Indigo
    actionButtonForegroundColor: Colors.white,
    actionButtonShape: RoundedRectangleBorder(
      borderRadius: BorderRadius.circular(12),
    ),
    
    // Request messages (user)
    requestMessageBackgroundColor: Color(0xFF6366F1),
    requestContentTextStyle: TextStyle(
      color: Colors.white,
      fontSize: 15,
      height: 1.4,
    ),
    requestPrimaryHeaderTextStyle: TextStyle(
      color: Colors.white,
      fontSize: 13,
      fontWeight: FontWeight.w600,
    ),
    requestSecondaryHeaderTextStyle: TextStyle(
      color: Colors.white70,
      fontSize: 11,
    ),
    requestAvatarBackgroundColor: Color(0xFF4F46E5),
    requestMessageShape: RoundedRectangleBorder(
      borderRadius: BorderRadius.circular(16),
    ),
    
    // Response messages (AI)
    responseMessageBackgroundColor: Colors.white,
    responseContentTextStyle: TextStyle(
      color: Color(0xFF1F2937),
      fontSize: 15,
      height: 1.5,
    ),
    responsePrimaryHeaderTextStyle: TextStyle(
      color: Color(0xFF6B7280),
      fontSize: 13,
      fontWeight: FontWeight.w600,
    ),
    responseSecondaryHeaderTextStyle: TextStyle(
      color: Color(0xFF9CA3AF),
      fontSize: 11,
    ),
    responseAvatarBackgroundColor: Color(0xFFEEF2FF),
    responseMessageShape: RoundedRectangleBorder(
      borderRadius: BorderRadius.circular(16),
      side: BorderSide(
        color: Color(0xFFE5E7EB),
        width: 1,
      ),
    ),
    
    // Toolbar
    responseToolbarItemBackgroundColor: WidgetStatePropertyAll(Color(0xFFF9FAFB)),
    responseToolbarItemShape: WidgetStatePropertyAll(
      RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(8),
      ),
    ),
    
    // Composer
    editorTextStyle: TextStyle(
      color: Color(0xFF1F2937),
      fontSize: 16,
    ),
  ),
  child: Container(
    color: Color(0xFFF9FAFB), // Light gray background
    child: SfAIAssistView(
      messages: _messages,
      composer: AssistComposer(
        decoration: InputDecoration(
          hintText: 'Ask me anything...',
          filled: true,
          fillColor: Colors.white,
          contentPadding: EdgeInsets.symmetric(
            horizontal: 20,
            vertical: 12,
          ),
          border: OutlineInputBorder(
            borderRadius: BorderRadius.circular(24),
            borderSide: BorderSide(
              color: Color(0xFFE5E7EB),
            ),
          ),
          focusedBorder: OutlineInputBorder(
            borderRadius: BorderRadius.circular(24),
            borderSide: BorderSide(
              color: Color(0xFF6366F1),
              width: 2,
            ),
          ),
        ),
      ),
    ),
  ),
)
```

### Chat - Colorful Theme

```dart
SfChatTheme(
  data: SfChatThemeData(
    actionButtonBackgroundColor: Colors.orange,
    actionButtonForegroundColor: Colors.white,
    
    incomingMessageBackgroundColor: Colors.pink[50],
    incomingContentTextStyle: TextStyle(
      color: Colors.pink[900],
      fontSize: 14,
    ),
    incomingAvatarBackgroundColor: Colors.pink[100],
    
    outgoingMessageBackgroundColor: Colors.orange,
    outgoingContentTextStyle: TextStyle(
      color: Colors.white,
      fontSize: 14,
    ),
    outgoingAvatarBackgroundColor: Colors.orange[700],
    
    incomingMessageShape: RoundedRectangleBorder(
      borderRadius: BorderRadius.circular(20),
    ),
    outgoingMessageShape: RoundedRectangleBorder(
      borderRadius: BorderRadius.circular(20),
    ),
  ),
  child: SfChat(
    messages: _messages,
    outgoingUser: '123-001',
  ),
)
```

## Theme Properties Reference

### Common Properties (Both Components)

| Property | Description |
|----------|-------------|
| `actionButtonBackgroundColor` | Background color of the action button |
| `actionButtonForegroundColor` | Icon/text color of the action button |
| `actionButtonShape` | Shape of the action button |
| `actionButtonElevation` | Shadow depth of the action button |
| `editorTextStyle` | Text style for the composer input |

### Chat-Specific Properties

| Property | Description |
|----------|-------------|
| `incomingMessageBackgroundColor` | Background color for incoming messages |
| `outgoingMessageBackgroundColor` | Background color for outgoing messages |
| `incomingContentTextStyle` | Text style for incoming message content |
| `outgoingContentTextStyle` | Text style for outgoing message content |
| `incomingAvatarBackgroundColor` | Avatar background for incoming messages |
| `outgoingAvatarBackgroundColor` | Avatar background for outgoing messages |

### AIAssistView-Specific Properties

| Property | Description |
|----------|-------------|
| `requestMessageBackgroundColor` | Background color for request messages |
| `responseMessageBackgroundColor` | Background color for response messages |
| `requestContentTextStyle` | Text style for request content |
| `responseContentTextStyle` | Text style for response content |
| `requestAvatarBackgroundColor` | Avatar background for requests |
| `responseAvatarBackgroundColor` | Avatar background for responses |
| `responseToolbarItemBackgroundColor` | Background color for toolbar items |
| `responseToolbarItemShape` | Shape of toolbar items |

## Best Practices

1. **Maintain Contrast**: Ensure text is readable against background colors
2. **Consistent Sizing**: Keep font sizes consistent with your app's typography
3. **Brand Colors**: Use colors that match your brand identity
4. **Accessibility**: Test themes with different accessibility settings
5. **Dark Mode Support**: Consider creating both light and dark theme variants
6. **Testing**: Test themes on different screen sizes and devices

By leveraging these theming capabilities, you can create chat and AI assistant interfaces that perfectly match your application's design language.
