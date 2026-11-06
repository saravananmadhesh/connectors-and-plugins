# Getting Started with Syncfusion Flutter Chat & AI AssistView

This guide explains how to add the Syncfusion Flutter Chat and AI AssistView widgets to your Flutter application and use their basic features.

## Installation

Both **SfChat** and **SfAIAssistView** widgets are part of the same package: `syncfusion_flutter_chat`.

### Add Dependency

Add the Syncfusion Flutter Chat dependency by running:

```bash
# Always installs the latest compatible version automatically
flutter pub add syncfusion_flutter_chat
```
> Always install the package via terminal — do **not** edit `pubspec.yaml` directly.
> Run this command from the Flutter project root and wait for it to complete successfully before proceeding.

## Imports

### For Chat Widget

Import the Chat library:

```dart
import 'package:syncfusion_flutter_chat/chat.dart';
```

### For AI AssistView Widget

Import the AI AssistView library:

```dart
import 'package:syncfusion_flutter_chat/assist_view.dart';
```

## Getting Started with Chat (SfChat)

The **SfChat** widget is designed for multi-user conversation interfaces where you need to distinguish between incoming and outgoing messages.

### Initialize Chat Widget

Create a basic chat widget with messages and an outgoing user identifier:

```dart
import 'package:flutter/material.dart';
import 'package:syncfusion_flutter_chat/chat.dart';

class MyChatApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('Chat')),
      body: SfChat(
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
      ),
    );
  }
}
```

**Key Points:**
- `messages`: List of `ChatMessage` objects to display
- `outgoingUser`: ID of the user sending messages (must match a message author's ID)
- Messages from the outgoing user appear on the right; others appear on the left

### Add Composer to Chat

Add a text editor for composing new messages:

```dart
SfChat(
  messages: <ChatMessage>[
    // ... messages
  ],
  outgoingUser: '123-001',
  composer: const ChatComposer(
    decoration: InputDecoration(
      hintText: 'Type a message',
    ),
  ),
)
```

### Add Action Button to Chat

Add a send button to submit messages:

```dart
class MyChatApp extends StatefulWidget {
  @override
  State<MyChatApp> createState() => _MyChatAppState();
}

class _MyChatAppState extends State<MyChatApp> {
  List<ChatMessage> _messages = <ChatMessage>[];

  @override
  void initState() {
    super.initState();
    _messages = <ChatMessage>[
      ChatMessage(
        text: 'Hi! How's your day?',
        time: DateTime.now(),
        author: const ChatAuthor(
          id: '123-001',
          name: 'John Doe',
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
        outgoingUser: '123-001',
        composer: const ChatComposer(
          decoration: InputDecoration(
            hintText: 'Type a message',
          ),
        ),
        actionButton: ChatActionButton(
          onPressed: (String newMessage) {
            setState(() {
              _messages.add(
                ChatMessage(
                  text: newMessage,
                  time: DateTime.now(),
                  author: const ChatAuthor(
                    id: '123-001',
                    name: 'John Doe',
                  ),
                ),
              );
            });
          },
        ),
      ),
    );
  }
}
```

**Important:** The `ChatActionButton.onPressed` callback provides the composed text. You must update the messages list and rebuild the widget using `setState`.

### Add Placeholder to Chat

Display a custom widget when there are no messages:

```dart
SfChat(
  messages: _messages, // Empty list initially
  outgoingUser: '123-001',
  placeholderBuilder: (BuildContext context) {
    return const Center(
      child: Text(
        'No messages yet!',
        style: TextStyle(
          fontSize: 18,
          color: Colors.black54,
          fontWeight: FontWeight.bold,
        ),
      ),
    );
  },
)
```

## Getting Started with AI AssistView (SfAIAssistView)

The **SfAIAssistView** widget is designed for AI assistant interfaces with request-response patterns.

### Initialize AI AssistView Widget

Create a basic AI AssistView widget:

```dart
import 'package:flutter/material.dart';
import 'package:syncfusion_flutter_chat/assist_view.dart';

class MyAIAssistApp extends StatelessWidget {
  final List<AssistMessage> _messages = <AssistMessage>[];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('AI Assistant')),
      body: SfAIAssistView(
        messages: _messages,
      ),
    );
  }
}
```

### Add Composer to AI AssistView

Add a text editor for composing requests:

```dart
SfAIAssistView(
  messages: _messages,
  composer: const AssistComposer(
    decoration: InputDecoration(
      hintText: 'Ask here',
    ),
  ),
)
```

### Add Action Button and AI Integration

Add a send button and connect to an AI service:

```dart
class MyAIAssistApp extends StatefulWidget {
  @override
  State<MyAIAssistApp> createState() => _MyAIAssistAppState();
}

class _MyAIAssistAppState extends State<MyAIAssistApp> {
  List<AssistMessage> _messages = <AssistMessage>[];

  void _generateAIResponse(String userRequest) async {
    final String aiResponse = await _getAIResponse(userRequest);
    setState(() {
      _messages.add(
        AssistMessage.response(
          data: aiResponse,
          time: DateTime.now(),
          author: const AssistMessageAuthor(
            id: 'ai-001',
            name: 'AI Assistant',
          ),
        ),
      );
    });
  }

  Future<String> _getAIResponse(String request) async {
    // Connect with your preferred AI service
    // Example: OpenAI, Google AI, Azure AI, etc.
    await Future.delayed(Duration(seconds: 2)); // Simulate API call
    return 'This is a response to: $request';
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('AI Assistant')),
      body: SfAIAssistView(
        messages: _messages,
        composer: const AssistComposer(
          decoration: InputDecoration(
            hintText: 'Ask here',
          ),
        ),
        actionButton: AssistActionButton(
          onPressed: (String userRequest) {
            setState(() {
              _messages.add(
                AssistMessage.request(
                  data: userRequest,
                  time: DateTime.now(),
                  author: const AssistMessageAuthor(
                    id: 'user-001',
                    name: 'User',
                  ),
                ),
              );
              _generateAIResponse(userRequest);
            });
          },
        ),
      ),
    );
  }
}
```

**Key Difference:** AI AssistView uses `AssistMessage.request()` for user messages and `AssistMessage.response()` for AI responses.

### Add Placeholder to AI AssistView

Display a welcome message when there are no conversations:

```dart
SfAIAssistView(
  messages: _messages,
  placeholderBuilder: (BuildContext context) {
    return const Center(
      child: Text(
        'What can I help you with today?',
        style: TextStyle(
          fontSize: 16,
          fontWeight: FontWeight.w600,
        ),
      ),
    );
  },
)
```

## Quick Comparison

| Feature | SfChat | SfAIAssistView |
|---------|--------|----------------|
| **Package Import** | `syncfusion_flutter_chat/chat.dart` | `syncfusion_flutter_chat/assist_view.dart` |
| **Message Class** | `ChatMessage` | `AssistMessage` |
| **Message Constructor** | `ChatMessage(...)` | `AssistMessage.request(...)` or `AssistMessage.response(...)` |
| **Composer Class** | `ChatComposer` | `AssistComposer` |
| **Action Button** | `ChatActionButton` | `AssistActionButton` |
| **User Identification** | `outgoingUser` property | Author in each message |
| **Message Direction** | Incoming/Outgoing | Request/Response |

## Next Steps

Now that you have the basic setup, explore these features:

- **Customize message appearance** with message settings
- **Add message suggestions** for quick replies
- **Customize the composer** with decorations and builders
- **Theme the widgets** with SfChatTheme and SfAIAssistViewTheme
- **Add toolbar items** (AIAssistView only) for actions like copy, retry
- **Customize loading indicators** (AIAssistView only) while AI responds
- **Implement RTL support** for right-to-left languages

Refer to the specific reference files for detailed documentation on each feature.
