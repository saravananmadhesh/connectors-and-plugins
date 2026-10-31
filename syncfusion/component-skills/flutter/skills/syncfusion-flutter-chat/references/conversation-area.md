# Conversation Area and Messages

## Table of Contents
- [Overview](#overview)
- [Chat Messages (SfChat)](#chat-messages-sfchat)
- [AIAssistView Messages (SfAIAssistView)](#aiassistview-messages-sfaiassistview)
- [Message Settings](#message-settings)
- [Message Headers](#message-headers)
- [Message Footers](#message-footers)
- [Message Avatars](#message-avatars)
- [Message Content Customization](#message-content-customization)
- [Suggestions](#suggestions)
- [Toolbar Items (AIAssistView Only)](#toolbar-items-aiassistview-only)
- [Loading Indicators (AIAssistView Only)](#loading-indicators-aiassistview-only)

## Overview

The conversation area displays messages exchanged between users (for Chat) or between a user and AI (for AIAssistView). Both components share similar customization options but differ in their message structure and special features.

## Chat Messages (SfChat)

### Messages Property

The `messages` property is the data source for the Chat widget, accepting a list of `ChatMessage` objects. Messages are displayed as incoming or outgoing based on the `outgoingUser` property.

Each `ChatMessage` contains:
- `text`: The actual content of the message
- `time`: Timestamp when the message was sent
- `author`: ChatAuthor with id, name, and optional avatar

```dart
SfChat(
  messages: <ChatMessage>[
    ChatMessage(
      text: 'Hi! How's your day?',
      time: DateTime(2024, 08, 07, 9, 0),
      author: const ChatAuthor(
        id: '123-001',
        name: 'John Doe',
      ),
    ),
    ChatMessage(
      text: 'Good! Just relaxing.',
      time: DateTime(2024, 08, 07, 9, 5),
      author: const ChatAuthor(
        id: '123-002',
        name: 'Jane Smith',
      ),
    ),
  ],
  outgoingUser: '123-001',
)
```

### Outgoing User

The `outgoingUser` property represents the user who is sending messages. It should be set to the unique ID of the user, corresponding to the `id` property of the `ChatAuthor`. This distinguishes outgoing messages (sent by the current user) from incoming messages (received from others).

```dart
SfChat(
  messages: _messages,
  outgoingUser: '123-001', // Messages from this ID appear as outgoing
)
```

### Extending Chat Messages

Messages can be extended to include additional information:

```dart
class ChatMessageExt extends ChatMessage {
  const ChatMessageExt({
    required super.text,
    required super.time,
    required super.author,
    required this.status,
    required this.replyTo,
  });
  
  final String status; // 'sent', 'delivered', 'read'
  final String? replyTo; // ID of message being replied to
}
```

## AIAssistView Messages (SfAIAssistView)

### Messages Property

The `messages` property for AIAssistView accepts a list of `AssistMessage` objects displayed as either request messages (from user) or response messages (from AI).

Each `AssistMessage` contains:
- `data`: The message content
- `time`: Timestamp of the message
- `author`: AssistMessageAuthor with id, name, and optional avatar

### Request Messages

Created when the user sends a query to the AI:

```dart
AssistMessage.request(
  data: 'What is Flutter?',
  time: DateTime.now(),
  author: const AssistMessageAuthor(
    id: 'user-001',
    name: 'User',
  ),
)
```

### Response Messages

Created when the AI service returns a response:

```dart
AssistMessage.response(
  data: 'Flutter is a UI toolkit by Google...',
  time: DateTime.now(),
  author: const AssistMessageAuthor(
    id: 'ai-001',
    name: 'AI Assistant',
    avatar: AssetImage('assets/ai_avatar.png'),
  ),
)
```

## Message Settings

Both components allow separate customization for different message types using message settings.

### For Chat (Incoming/Outgoing)

```dart
SfChat(
  messages: _messages,
  outgoingUser: '123-001',
  incomingMessageSettings: const ChatMessageSettings(
    backgroundColor: Color(0xFFE3F2FD),
    showAuthorName: true,
    showAuthorAvatar: true,
    showTimestamp: true,
    timestampFormat: DateFormat('h:mm a'),
    textStyle: TextStyle(fontSize: 14, color: Colors.black87),
    shape: RoundedRectangleBorder(
      borderRadius: BorderRadius.all(Radius.circular(12)),
    ),
    widthFactor: 0.75,
  ),
  outgoingMessageSettings: const ChatMessageSettings(
    backgroundColor: Color(0xFFF1F8E9),
    showAuthorName: false,
    showAuthorAvatar: false,
    showTimestamp: true,
    timestampFormat: DateFormat('h:mm a'),
    textStyle: TextStyle(fontSize: 14, color: Colors.black87),
    shape: RoundedRectangleBorder(
      borderRadius: BorderRadius.all(Radius.circular(12)),
    ),
    widthFactor: 0.75,
  ),
)
```

### For AIAssistView (Request/Response)

```dart
SfAIAssistView(
  messages: _messages,
  requestMessageSettings: const AssistMessageSettings(
    backgroundColor: Color(0xFFF1F8E9),
    showAuthorName: false,
    showTimestamp: true,
    textStyle: TextStyle(fontSize: 14),
    shape: RoundedRectangleBorder(
      borderRadius: BorderRadius.all(Radius.circular(10)),
    ),
    margin: EdgeInsets.all(8.0),
  ),
  responseMessageSettings: const AssistMessageSettings(
    backgroundColor: Color(0xFFE3F2FD),
    showAuthorName: true,
    showTimestamp: true,
    textStyle: TextStyle(fontSize: 14),
    shape: RoundedRectangleBorder(
      borderRadius: BorderRadius.all(Radius.circular(10)),
    ),
    margin: EdgeInsets.all(8.0),
  ),
)
```

### Common Settings Properties

Both `ChatMessageSettings` and `AssistMessageSettings` support:

- `showAuthorName`: Show/hide the sender's name
- `showTimestamp`: Show/hide the time the message was sent
- `showAuthorAvatar`: Show/hide the author's avatar
- `timestampFormat`: DateFormat for the timestamp display
- `backgroundColor`: Background color of the message bubble
- `textStyle`: Text style for the message content
- `headerTextStyle`: Text style for the header (name and timestamp)
- `shape`: Shape of the message bubble
- `widthFactor`: Width of message relative to screen (0-1)
- `avatarSize`: Size of the avatar
- `margin`: Space around the message
- `padding`: Padding inside the message bubble
- `avatarPadding`: Padding around the avatar
- `headerPadding`: Padding around the header
- `footerPadding`: Padding around the footer

## Message Headers

Display custom headers for messages showing sender information and timestamps.

### For Chat

```dart
SfChat(
  messages: _messages,
  outgoingUser: '123-001',
  messageHeaderBuilder: (context, index, message) {
    return Padding(
      padding: EdgeInsets.only(bottom: 4),
      child: Text(
        '${message.author.name} • ${DateFormat('h:mm a').format(message.time)}',
        style: TextStyle(
          fontSize: 12,
          color: Colors.grey[600],
        ),
      ),
    );
  },
)
```

### For AIAssistView

```dart
SfAIAssistView(
  messages: _messages,
  messageHeaderBuilder: (context, index, message) {
    return Padding(
      padding: EdgeInsets.only(bottom: 4),
      child: Row(
        children: [
          Text(
            message.author?.name ?? 'Unknown',
            style: TextStyle(
              fontSize: 12,
              fontWeight: FontWeight.bold,
            ),
          ),
          SizedBox(width: 8),
          Text(
            DateFormat('MMM d, h:mm a').format(message.time ?? DateTime.now()),
            style: TextStyle(
              fontSize: 12,
              color: Colors.grey[600],
            ),
          ),
        ],
      ),
    );
  },
)
```

## Message Footers

Add custom information below messages, such as message status or AI model information.

### For Chat

```dart
SfChat(
  messages: _messages,
  outgoingUser: '123-001',
  messageFooterBuilder: (context, index, message) {
    // Show delivery status for outgoing messages
    if (message.author.id == '123-001') {
      return Padding(
        padding: EdgeInsets.only(top: 4),
        child: Row(
          mainAxisSize: MainAxisSize.min,
          children: [
            Icon(Icons.done_all, size: 12, color: Colors.blue),
            SizedBox(width: 4),
            Text(
              'Read',
              style: TextStyle(fontSize: 10, color: Colors.blue),
            ),
          ],
        ),
      );
    }
    return SizedBox.shrink();
  },
)
```

### For AIAssistView

```dart
SfAIAssistView(
  messages: _messages,
  messageFooterBuilder: (context, index, message) {
    // Show AI model info for responses
    if (message is AssistMessage && message.data != null) {
      return Padding(
        padding: EdgeInsets.only(top: 4),
        child: Text(
          'GPT-4 • Powered by OpenAI',
          style: TextStyle(
            fontSize: 10,
            color: Colors.grey[500],
            fontStyle: FontStyle.italic,
          ),
        ),
      );
    }
    return SizedBox.shrink();
  },
)
```

## Message Avatars

Display user profile pictures or initials for message authors.

### For Chat

```dart
SfChat(
  messages: _messages,
  outgoingUser: '123-001',
  messageAvatarBuilder: (context, index, message) {
    return CircleAvatar(
      radius: 16,
      backgroundImage: message.author.avatar,
      child: message.author.avatar == null
          ? Text(
              message.author.name.isNotEmpty
                  ? message.author.name[0].toUpperCase()
                  : '?',
              style: TextStyle(fontSize: 14, fontWeight: FontWeight.bold),
            )
          : null,
    );
  },
)
```

### For AIAssistView

```dart
SfAIAssistView(
  messages: _messages,
  messageAvatarBuilder: (context, index, message) {
    final bool isAI = message.author?.id == 'ai-001';
    return CircleAvatar(
      radius: 18,
      backgroundColor: isAI ? Colors.purple[100] : Colors.blue[100],
      child: Icon(
        isAI ? Icons.smart_toy : Icons.person,
        size: 20,
        color: isAI ? Colors.purple : Colors.blue,
      ),
    );
  },
)
```

## Message Content Customization

Customize the entire message content area with custom widgets.

```dart
// For Chat
SfChat(
  messages: _messages,
  outgoingUser: '123-001',
  messageContentBuilder: (context, index, message) {
    return Container(
      padding: EdgeInsets.all(12),
      decoration: BoxDecoration(
        color: message.author.id == '123-001'
            ? Colors.blue[100]
            : Colors.grey[200],
        borderRadius: BorderRadius.circular(16),
        boxShadow: [
          BoxShadow(
            color: Colors.black.withOpacity(0.1),
            blurRadius: 4,
            offset: Offset(0, 2),
          ),
        ],
      ),
      child: Text(
        message.text,
        style: TextStyle(fontSize: 14),
      ),
    );
  },
)
```

## Suggestions

Add suggestion chips for quick replies. Available on both components but with different behaviors.

### For Chat (Any Message)

```dart
ChatMessage(
  text: 'How would you like to proceed?',
  time: DateTime.now(),
  author: const ChatAuthor(id: '123-002', name: 'Support'),
  suggestions: <ChatMessageSuggestion>[
    const ChatMessageSuggestion(data: 'Continue'),
    const ChatMessageSuggestion(data: 'Cancel'),
    const ChatMessageSuggestion(data: 'Learn More'),
  ],
)
```

### For AIAssistView (Response Only)

```dart
AssistMessage.response(
  data: 'I can help you with:',
  time: DateTime.now(),
  author: const AssistMessageAuthor(id: 'ai', name: 'AI'),
  suggestions: <AssistMessageSuggestion>[
    const AssistMessageSuggestion(data: 'Flutter basics'),
    const AssistMessageSuggestion(data: 'Widget examples'),
    const AssistMessageSuggestion(data: 'State management'),
  ],
)

// Handle suggestion selection
SfAIAssistView(
  messages: _messages,
  onSuggestionItemSelected: (selected, messageIndex, suggestion, suggestionIndex) {
    setState(() {
      _messages.add(
        AssistMessage.request(
          data: suggestion.data!,
          time: DateTime.now(),
          author: const AssistMessageAuthor(id: 'user', name: 'You'),
        ),
      );
      _generateAIResponse(suggestion.data!);
    });
  },
)
```

## Toolbar Items (AIAssistView Only)

Add action buttons to response messages for operations like like, dislike, copy, retry, etc.

```dart
AssistMessage.response(
  data: 'Here is the information you requested...',
  time: DateTime.now(),
  author: const AssistMessageAuthor(id: 'ai', name: 'AI'),
  toolbarItems: <AssistMessageToolbarItem>[
    const AssistMessageToolbarItem(
      content: Icon(Icons.thumb_up_outlined),
      tooltip: 'Like this response',
    ),
    const AssistMessageToolbarItem(
      content: Icon(Icons.thumb_down_outlined),
      tooltip: 'Dislike this response',
    ),
    const AssistMessageToolbarItem(
      content: Icon(Icons.copy),
      tooltip: 'Copy to clipboard',
    ),
    const AssistMessageToolbarItem(
      content: Icon(Icons.restart_alt),
      tooltip: 'Regenerate response',
    ),
  ],
)

// Handle toolbar item selection
SfAIAssistView(
  messages: _messages,
  onToolbarItemSelected: (selected, messageIndex, item, itemIndex) {
    switch (itemIndex) {
      case 0: // Like
        print('User liked message $messageIndex');
        break;
      case 1: // Dislike
        print('User disliked message $messageIndex');
        break;
      case 2: // Copy
        Clipboard.setData(ClipboardData(text: _messages[messageIndex].data ?? ''));
        break;
      case 3: // Retry
        _regenerateResponse(messageIndex);
        break;
    }
  },
)
```

## Loading Indicators (AIAssistView Only)

Show a custom loading indicator while the AI generates a response.

```dart
SfAIAssistView(
  messages: _messages,
  responseLoadingBuilder: (context, index, message) {
    return Container(
      padding: EdgeInsets.all(16),
      child: Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          SizedBox(
            width: 20,
            height: 20,
            child: CircularProgressIndicator(strokeWidth: 2),
          ),
          SizedBox(width: 12),
          Text(
            'AI is thinking...',
            style: TextStyle(
              fontStyle: FontStyle.italic,
              color: Colors.grey[600],
            ),
          ),
        ],
      ),
    );
  },
)
```

The loading indicator appears automatically while waiting for a response to be added to the messages list.
