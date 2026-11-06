# SfChat Overview

The **Syncfusion Flutter Chat (SfChat)** widget displays conversations between two or more users and offers a wide range of customization options, including the composer, action button, and message content (header, footer, content, and avatar).

## What is SfChat?

SfChat is a conversational UI component designed for **multi-user messaging applications** where you need to distinguish between messages from different users. It's perfect for building chat interfaces similar to WhatsApp, Telegram, or Slack.

## When to Use SfChat

Use SfChat when you need:

- **Multi-user conversations** with clear sender identification
- **Incoming and outgoing message** differentiation
- **Traditional messaging app** interfaces
- **Team collaboration** chat features
- **Customer support** chat systems
- **Social messaging** applications
- **Group chat** functionality

## Key Features

### 1. Placeholder

The `placeholderBuilder` creates a custom widget that appears when conversations are empty. This is especially useful for displaying a welcome message or instructions when the conversation has no messages yet.

```dart
SfChat(
  messages: _messages,
  outgoingUser: '123-001',
  placeholderBuilder: (BuildContext context) {
    return const Center(
      child: Text('Start a conversation!'),
    );
  },
)
```

### 2. Composer

The primary text editor where new chat messages can be composed. You can integrate custom composer widgets with multiple input options.

```dart
SfChat(
  messages: _messages,
  outgoingUser: '123-001',
  composer: const ChatComposer(
    decoration: InputDecoration(
      hintText: 'Type a message',
    ),
  ),
)
```

### 3. Action Button

Represents the send button. Pressing this action button invokes the `onPressed` callback with the text entered in the default composer.

```dart
SfChat(
  messages: _messages,
  outgoingUser: '123-001',
  actionButton: ChatActionButton(
    onPressed: (String newMessage) {
      // Add message to list and rebuild
    },
  ),
)
```

### 4. Message Content

A list of `ChatMessage` objects displayed in the chat interface as either incoming or outgoing messages based on the `outgoingUser` property. Each message includes:

- **text**: The message content
- **time**: Timestamp of when the message was sent
- **author**: ChatAuthor with id, name, and optional avatar

```dart
ChatMessage(
  text: 'Hello, how are you?',
  time: DateTime.now(),
  author: const ChatAuthor(
    id: '123-001',
    name: 'John Doe',
    avatar: NetworkImage('https://example.com/avatar.jpg'),
  ),
)
```

### 5. Suggestions

A list of suggestion chips can be added to any message. When selected, the suggestion appears as a new message from the user who selected it.

```dart
ChatMessage(
  text: 'Which do you prefer?',
  time: DateTime.now(),
  author: const ChatAuthor(id: '123-002', name: 'Jane'),
  suggestions: <ChatMessageSuggestion>[
    const ChatMessageSuggestion(data: 'Option A'),
    const ChatMessageSuggestion(data: 'Option B'),
    const ChatMessageSuggestion(data: 'Option C'),
  ],
)
```

### 6. Message Customization

Customize each part of the message display:

- **Message Header**: Display sender name and timestamp
- **Message Footer**: Add custom information below the message
- **Message Content**: Customize the message bubble appearance
- **Message Avatar**: Display user profile pictures

```dart
SfChat(
  messages: _messages,
  outgoingUser: '123-001',
  messageHeaderBuilder: (context, index, message) {
    return Text('${message.author.name} • ${_formatTime(message.time)}');
  },
  messageAvatarBuilder: (context, index, message) {
    return CircleAvatar(
      child: Text(message.author.name[0]),
    );
  },
)
```

## Incoming vs Outgoing Messages

The `outgoingUser` property is crucial for distinguishing message direction:

- **Outgoing Messages**: Messages where `author.id` matches `outgoingUser`
  - Displayed on the right side (in LTR layouts)
  - Typically styled differently (different color, alignment)
  
- **Incoming Messages**: Messages where `author.id` doesn't match `outgoingUser`
  - Displayed on the left side (in LTR layouts)
  - Shows sender information more prominently

```dart
SfChat(
  messages: <ChatMessage>[
    ChatMessage(
      text: 'Hi there!',
      time: DateTime.now(),
      author: const ChatAuthor(id: '123-001', name: 'Alice'),
    ),
    ChatMessage(
      text: 'Hello!',
      time: DateTime.now(),
      author: const ChatAuthor(id: '123-002', name: 'Bob'),
    ),
  ],
  outgoingUser: '123-001', // Alice's messages will be outgoing
)
```

## Message Settings

Customize the appearance of incoming and outgoing messages separately:

```dart
SfChat(
  messages: _messages,
  outgoingUser: '123-001',
  incomingMessageSettings: const ChatMessageSettings(
    backgroundColor: Color(0xFFE3F2FD),
    showAuthorName: true,
    showAuthorAvatar: true,
    showTimestamp: true,
  ),
  outgoingMessageSettings: const ChatMessageSettings(
    backgroundColor: Color(0xFFF1F8E9),
    showAuthorName: false,
    showAuthorAvatar: false,
    showTimestamp: true,
  ),
)
```

## Basic Example

Complete example with all core features:

```dart
class ChatExample extends StatefulWidget {
  @override
  State<ChatExample> createState() => _ChatExampleState();
}

class _ChatExampleState extends State<ChatExample> {
  List<ChatMessage> _messages = <ChatMessage>[];
  final String _currentUserId = '123-001';

  @override
  void initState() {
    super.initState();
    _messages = <ChatMessage>[
      ChatMessage(
        text: 'Welcome to the chat!',
        time: DateTime.now(),
        author: const ChatAuthor(
          id: '123-002',
          name: 'Support Team',
        ),
      ),
    ];
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('Chat')),
      body: SfChat(
        messages: _messages,
        outgoingUser: _currentUserId,
        composer: const ChatComposer(
          decoration: InputDecoration(
            hintText: 'Type your message',
          ),
        ),
        actionButton: ChatActionButton(
          onPressed: (String newMessage) {
            setState(() {
              _messages.add(
                ChatMessage(
                  text: newMessage,
                  time: DateTime.now(),
                  author: ChatAuthor(
                    id: _currentUserId,
                    name: 'You',
                  ),
                ),
              );
            });
          },
        ),
        placeholderBuilder: (context) {
          return const Center(
            child: Text('No messages yet. Start chatting!'),
          );
        },
      ),
    );
  }
}
```

## Comparison with SfAIAssistView

| Feature | SfChat | When to Use |
|---------|--------|-------------|
| **Purpose** | Multi-user messaging | Team chat, customer support, social messaging |
| **Message Types** | Incoming/Outgoing | When you need to show who sent what |
| **User ID** | outgoingUser property | When you have a current user concept |
| **Suggestions** | On any message | For quick replies from any user |
| **Toolbar** | Not available | Use action button or custom UI |
| **Loading** | Manual implementation | You control all states |

Choose **SfChat** when building traditional chat or messaging applications where multiple users exchange messages and you need to clearly distinguish between the current user's messages and others' messages.
