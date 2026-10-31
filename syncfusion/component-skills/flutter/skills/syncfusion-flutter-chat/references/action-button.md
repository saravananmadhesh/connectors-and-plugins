# Action Button

## Table of Contents
- [Overview](#overview)
- [Basic Usage](#basic-usage)
- [Child Widget](#child-widget)
- [onPressed Callback](#onpressed-callback)
- [Tooltip](#tooltip)
- [Colors](#colors)
- [Elevation](#elevation)
- [Mouse Cursor](#mouse-cursor)
- [Shape](#shape)
- [Margin](#margin)
- [Size](#size)

## Overview

The action button represents the send button in both **SfChat** (ChatActionButton) and **SfAIAssistView** (AssistActionButton). It is not included by default and must be explicitly added.

Both action button classes share the same properties and behavior, with the only difference being their class names.

## Basic Usage

### For Chat

```dart
SfChat(
  messages: _messages,
  outgoingUser: '123-001',
  composer: const ChatComposer(
    decoration: InputDecoration(hintText: 'Type a message'),
  ),
  actionButton: ChatActionButton(
    onPressed: (String newMessage) {
      setState(() {
        _messages.add(
          ChatMessage(
            text: newMessage,
            time: DateTime.now(),
            author: const ChatAuthor(id: '123-001', name: 'You'),
          ),
        );
      });
    },
  ),
)
```

### For AIAssistView

```dart
SfAIAssistView(
  messages: _messages,
  composer: const AssistComposer(
    decoration: InputDecoration(hintText: 'Ask here'),
  ),
  actionButton: AssistActionButton(
    onPressed: (String userRequest) {
      setState(() {
        _messages.add(
          AssistMessage.request(
            data: userRequest,
            time: DateTime.now(),
            author: const AssistMessageAuthor(id: 'user', name: 'You'),
          ),
        );
        _generateAIResponse(userRequest);
      });
    },
  ),
)
```

## Child Widget

The `child` property allows you to specify a custom widget as the content of the action button. This is useful for customizing the button appearance beyond the default send icon.

**Default:** Send icon

```dart
// Custom icon
ChatActionButton(
  child: Icon(Icons.chat, color: Colors.white, size: 24),
  onPressed: (String newMessage) {
    // Handle send
  },
)

// Custom widget
AssistActionButton(
  child: Container(
    padding: EdgeInsets.all(8),
    child: Row(
      mainAxisSize: MainAxisSize.min,
      children: [
        Icon(Icons.send, size: 20),
        SizedBox(width: 4),
        Text('Send'),
      ],
    ),
  ),
  onPressed: (String request) {
    // Handle send
  },
)
```

## onPressed Callback

The `onPressed` callback is invoked whenever the action button is pressed. It receives the composed text as a parameter (or an empty string if using a custom composer builder).

**Important:** The widget does not rebuild itself automatically. You must update the messages list using `setState` or your state management solution.

### Behavior

- **With default composer:** Receives the text from the composer
- **With custom composer builder:** Receives an empty string
- **When null:** The button is disabled

```dart
ChatActionButton(
  onPressed: (String newMessage) {
    if (newMessage.trim().isEmpty) {
      return; // Don't send empty messages
    }
    
    setState(() {
      _messages.add(
        ChatMessage(
          text: newMessage,
          time: DateTime.now(),
          author: ChatAuthor(
            id: _currentUserId,
            name: _currentUserName,
          ),
        ),
      );
    });
  },
)
```

### Disabling the Button

Set `onPressed` to `null` to disable the button:

```dart
ChatActionButton(
  onPressed: null, // Button is disabled
)
```

## Tooltip

The `tooltip` property displays a descriptive text when the user long-presses (touch) or hovers (mouse) over the button.

**Default:** `null`

```dart
// For Chat
ChatActionButton(
  tooltip: 'Send message',
  onPressed: (String message) {
    // Handle send
  },
)

// For AIAssistView
AssistActionButton(
  tooltip: 'Send request to AI',
  onPressed: (String request) {
    // Handle send
  },
)
```

## Colors

Customize the button's appearance with various color properties.

### Foreground Color

The color of the button's icon or text content.

**Default:** `colorScheme.onPrimary`

```dart
ChatActionButton(
  foregroundColor: Colors.white,
  onPressed: (String message) {
    // Handle send
  },
)
```

### Background Color

The color of the button's background.

**Default:** `colorScheme.primary`

```dart
ChatActionButton(
  backgroundColor: Colors.blue,
  onPressed: (String message) {
    // Handle send
  },
)
```

### Focus Color

The background color when the button is focused.

**Default:** `colorScheme.primary.withOpacity(0.86)`

```dart
ChatActionButton(
  focusColor: Colors.lightBlue,
  onPressed: (String message) {
    // Handle send
  },
)
```

### Hover Color

The background color when the mouse hovers over the button.

**Default:** `colorScheme.primary.withOpacity(0.91)`

```dart
ChatActionButton(
  hoverColor: Colors.blueAccent,
  onPressed: (String message) {
    // Handle send
  },
)
```

### Splash Color

The color of the ripple effect when the button is tapped.

**Default:** `colorScheme.primary.withOpacity(0.86)`

```dart
ChatActionButton(
  splashColor: Colors.white.withOpacity(0.3),
  onPressed: (String message) {
    // Handle send
  },
)
```

### Complete Color Example

```dart
ChatActionButton(
  foregroundColor: Colors.white,
  backgroundColor: Colors.blue[600],
  focusColor: Colors.blue[400],
  hoverColor: Colors.blue[700],
  splashColor: Colors.white.withOpacity(0.2),
  onPressed: (String message) {
    // Handle send
  },
)
```

## Elevation

Control the shadow depth of the button in different states.

### Elevation (Default State)

The size of the shadow below the button in its normal state.

**Default:** `0.0`

```dart
ChatActionButton(
  elevation: 2.0,
  onPressed: (String message) {
    // Handle send
  },
)
```

### Focus Elevation

The elevation when the button has focus.

**Default:** `0.0`

```dart
ChatActionButton(
  focusElevation: 4.0,
  onPressed: (String message) {
    // Handle send
  },
)
```

### Hover Elevation

The elevation when the button is hovered over.

**Default:** `0.0`

```dart
ChatActionButton(
  hoverElevation: 6.0,
  onPressed: (String message) {
    // Handle send
  },
)
```

### Highlight Elevation

The elevation when the button is pressed.

**Default:** `0.0`

```dart
ChatActionButton(
  highlightElevation: 8.0,
  onPressed: (String message) {
    // Handle send
  },
)
```

### Complete Elevation Example

```dart
AssistActionButton(
  elevation: 2.0,
  focusElevation: 4.0,
  hoverElevation: 6.0,
  highlightElevation: 8.0,
  backgroundColor: Colors.purple,
  onPressed: (String request) {
    // Handle send
  },
)
```

## Mouse Cursor

The `mouseCursor` property defines the cursor appearance when hovering over the button on desktop platforms.

**Default:** System default cursor

```dart
ChatActionButton(
  mouseCursor: SystemMouseCursors.click,
  onPressed: (String message) {
    // Handle send
  },
)

// Other options
AssistActionButton(
  mouseCursor: SystemMouseCursors.pointer,
  onPressed: (String request) {
    // Handle send
  },
)
```

## Shape

The `shape` property sets the border shape of the button.

**Default:** `RoundedRectangleBorder(borderRadius: BorderRadius.all(Radius.circular(20.0)))`

```dart
// Circular button
ChatActionButton(
  shape: CircleBorder(),
  onPressed: (String message) {
    // Handle send
  },
)

// Rounded rectangle
ChatActionButton(
  shape: RoundedRectangleBorder(
    borderRadius: BorderRadius.circular(12),
  ),
  onPressed: (String message) {
    // Handle send
  },
)

// Stadium shape
AssistActionButton(
  shape: StadiumBorder(),
  onPressed: (String request) {
    // Handle send
  },
)

// Custom shape
ChatActionButton(
  shape: ContinuousRectangleBorder(
    borderRadius: BorderRadius.only(
      topLeft: Radius.circular(30),
      topRight: Radius.circular(15),
      bottomRight: Radius.circular(30),
      bottomLeft: Radius.circular(15),
    ),
  ),
  onPressed: (String message) {
    // Handle send
  },
)
```

## Margin

The `margin` property defines the space around the button, separating it from the composer.

**Default:** `EdgeInsetsDirectional.only(start: 8.0)`

```dart
ChatActionButton(
  margin: EdgeInsets.only(left: 12),
  onPressed: (String message) {
    // Handle send
  },
)

AssistActionButton(
  margin: EdgeInsets.symmetric(horizontal: 8),
  onPressed: (String request) {
    // Handle send
  },
)
```

## Size

The `size` property specifies the width and height of the button.

**Default:** `Size.square(40.0)`

```dart
// Square button
ChatActionButton(
  size: Size.square(48),
  onPressed: (String message) {
    // Handle send
  },
)

// Rectangular button
AssistActionButton(
  size: Size(60, 40),
  child: Icon(Icons.send),
  onPressed: (String request) {
    // Handle send
  },
)
```

## Complete Custom Button Example

```dart
ChatActionButton(
  child: Icon(Icons.send_rounded, size: 22),
  tooltip: 'Send message',
  foregroundColor: Colors.white,
  backgroundColor: Colors.blue[600],
  focusColor: Colors.blue[400],
  hoverColor: Colors.blue[700],
  splashColor: Colors.white.withOpacity(0.3),
  elevation: 2.0,
  focusElevation: 4.0,
  hoverElevation: 6.0,
  highlightElevation: 8.0,
  mouseCursor: SystemMouseCursors.click,
  shape: RoundedRectangleBorder(
    borderRadius: BorderRadius.circular(12),
  ),
  margin: EdgeInsets.only(left: 10),
  size: Size.square(44),
  onPressed: (String newMessage) {
    if (newMessage.trim().isNotEmpty) {
      setState(() {
        _messages.add(
          ChatMessage(
            text: newMessage,
            time: DateTime.now(),
            author: ChatAuthor(
              id: _currentUserId,
              name: _currentUserName,
            ),
          ),
        );
      });
    }
  },
)
```

## Theming

Action button properties can also be customized globally using theme data:

```dart
// For Chat
SfChatTheme(
  data: SfChatThemeData(
    actionButtonForegroundColor: Colors.white,
    actionButtonBackgroundColor: Colors.blue,
    actionButtonFocusColor: Colors.lightBlue,
    actionButtonHoverColor: Colors.blueAccent,
    actionButtonSplashColor: Colors.white.withOpacity(0.3),
    actionButtonElevation: 2.0,
    actionButtonShape: CircleBorder(),
  ),
  child: SfChat(
    messages: _messages,
    outgoingUser: '123-001',
    actionButton: ChatActionButton(
      onPressed: (String message) {
        // Theme properties are automatically applied
      },
    ),
  ),
)

// For AIAssistView
SfAIAssistViewTheme(
  data: SfAIAssistViewThemeData(
    actionButtonForegroundColor: Colors.white,
    actionButtonBackgroundColor: Colors.purple,
    actionButtonShape: RoundedRectangleBorder(
      borderRadius: BorderRadius.circular(12),
    ),
  ),
  child: SfAIAssistView(
    messages: _messages,
    actionButton: AssistActionButton(
      onPressed: (String request) {
        // Theme properties are automatically applied
      },
    ),
  ),
)
```
