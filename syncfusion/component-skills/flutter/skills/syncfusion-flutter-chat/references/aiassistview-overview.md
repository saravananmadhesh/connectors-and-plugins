# SfAIAssistView Overview

The **Syncfusion Flutter AI AssistView (SfAIAssistView)** widget is a powerful and customizable tool designed to simplify the integration of AI assistant functionality. It allows users to customize message content, headers, footers, avatars, response toolbars, loading indicators, suggestion items, text editors, and action buttons.

## What is SfAIAssistView?

SfAIAssistView is a conversational UI component designed specifically for **AI assistant interfaces** with a clear request-response pattern. It's perfect for building chatbot interfaces, AI assistants, and help bots where users interact with an AI service.

## When to Use SfAIAssistView

Use SfAIAssistView when you need:

- **AI chatbot** interfaces
- **AI assistant** functionality
- **Request-response** conversation patterns
- **Help bot** or Q&A interfaces
- **Customer service bots**
- **Virtual assistant** applications
- **AI-powered support** systems

## Key Features

### 1. Placeholder Builder

The `placeholderBuilder` allows you to specify a custom widget to display when there are no messages. This is particularly useful for presenting users with a welcome message or initial prompts.

```dart
SfAIAssistView(
  messages: _messages,
  placeholderBuilder: (BuildContext context) {
    return const Center(
      child: Text('What can I help you with today?'),
    );
  },
)
```

### 2. Composer

The primary text editor where users can compose new request messages to send to the AI service.

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

### 3. Action Button

Represents the send button. Pressing this button invokes the `AssistActionButton.onPressed` callback with the composed text, allowing you to send the request to your AI service.

```dart
SfAIAssistView(
  messages: _messages,
  actionButton: AssistActionButton(
    onPressed: (String request) {
      // Send request to AI and add response
    },
  ),
)
```

### 4. Message Content

A list of `AssistMessage` objects displayed as either request messages from the user or response messages from AI. Each message includes:

- **data**: The message content
- **time**: Timestamp of the message
- **author**: AssistMessageAuthor with id, name, and optional avatar

```dart
// User request
AssistMessage.request(
  data: 'What is Flutter?',
  time: DateTime.now(),
  author: const AssistMessageAuthor(
    id: 'user-001',
    name: 'User',
  ),
)

// AI response
AssistMessage.response(
  data: 'Flutter is a UI toolkit by Google...',
  time: DateTime.now(),
  author: const AssistMessageAuthor(
    id: 'ai-001',
    name: 'AI Assistant',
  ),
)
```

### 5. Suggestions

Response messages can include suggestion chips. When selected, suggestions are treated as new request messages from the user.

```dart
AssistMessage.response(
  data: 'I can help with several topics.',
  suggestions: <AssistMessageSuggestion>[
    const AssistMessageSuggestion(data: 'Tell me about Flutter'),
    const AssistMessageSuggestion(data: 'Show me examples'),
    const AssistMessageSuggestion(data: 'Explain widgets'),
  ],
)
```

### 6. Toolbar Items (Response Only)

A collection of action items for response messages. Particularly useful for adding actions like like, dislike, copy, retry, etc.

```dart
AssistMessage.response(
  data: 'Here is the information you requested...',
  toolbarItems: <AssistMessageToolbarItem>[
    const AssistMessageToolbarItem(
      content: Icon(Icons.thumb_up_outlined),
      tooltip: 'Like',
    ),
    const AssistMessageToolbarItem(
      content: Icon(Icons.thumb_down_outlined),
      tooltip: 'Dislike',
    ),
    const AssistMessageToolbarItem(
      content: Icon(Icons.copy),
      tooltip: 'Copy',
    ),
    const AssistMessageToolbarItem(
      content: Icon(Icons.restart_alt),
      tooltip: 'Retry',
    ),
  ],
)
```

### 7. Loading Indicator

Indicates that the AI service's response is in progress. By default, a shimmer effect is displayed until the response is received.

```dart
SfAIAssistView(
  messages: _messages,
  responseLoadingBuilder: (context, index, message) {
    return const Row(
      children: [
        SizedBox(
          width: 20,
          height: 20,
          child: CircularProgressIndicator(strokeWidth: 2),
        ),
        SizedBox(width: 12),
        Text('AI is thinking...'),
      ],
    );
  },
)
```

### 8. Message Customization

Customize each part of the message display:

- **Message Header Builder**: Display author name and timestamp
- **Message Footer Builder**: Add custom information below messages
- **Message Content Builder**: Customize message bubble appearance
- **Message Avatar Builder**: Display user or AI avatars

```dart
SfAIAssistView(
  messages: _messages,
  messageHeaderBuilder: (context, index, message) {
    return Text('${message.author?.name} • ${_formatTime(message.time)}');
  },
  messageAvatarBuilder: (context, index, message) {
    return CircleAvatar(
      backgroundImage: message.author?.avatar,
    );
  },
)
```

## Request vs Response Messages

AIAssistView uses two distinct message types:

- **Request Messages**: Created with `AssistMessage.request(...)`
  - Represents user queries or inputs
  - Displayed on one side (typically right in LTR)
  - Cannot have toolbar items
  
- **Response Messages**: Created with `AssistMessage.response(...)`
  - Represents AI-generated responses
  - Displayed on the opposite side
  - Can include suggestions and toolbar items
  - Can show loading state while generating

```dart
// Add request message when user sends
_messages.add(
  AssistMessage.request(
    data: userInput,
    time: DateTime.now(),
    author: const AssistMessageAuthor(id: 'user', name: 'You'),
  ),
);

// Add response message after AI generates
_messages.add(
  AssistMessage.response(
    data: aiResponse,
    time: DateTime.now(),
    author: const AssistMessageAuthor(id: 'ai', name: 'AI'),
    toolbarItems: [...], // Optional
    suggestions: [...],   // Optional
  ),
);
```

## Message Settings

Customize the appearance of request and response messages separately:

```dart
SfAIAssistView(
  messages: _messages,
  requestMessageSettings: const AssistMessageSettings(
    backgroundColor: Color(0xFFF1F8E9),
    showAuthorName: false,
    showTimestamp: true,
  ),
  responseMessageSettings: const AssistMessageSettings(
    backgroundColor: Color(0xFFE3F2FD),
    showAuthorName: true,
    showTimestamp: true,
  ),
)
```

## Basic Example with AI Integration

Complete example connecting to an AI service:

```dart
class AIAssistExample extends StatefulWidget {
  @override
  State<AIAssistExample> createState() => _AIAssistExampleState();
}

class _AIAssistExampleState extends State<AIAssistExample> {
  List<AssistMessage> _messages = <AssistMessage>[];

  void _generateAIResponse(String userRequest) async {
    // Show loading by adding a temporary message or using responseLoadingBuilder
    final String aiResponse = await _callAIService(userRequest);
    
    setState(() {
      _messages.add(
        AssistMessage.response(
          data: aiResponse,
          time: DateTime.now(),
          author: const AssistMessageAuthor(
            id: 'ai-001',
            name: 'AI Assistant',
          ),
          toolbarItems: <AssistMessageToolbarItem>[
            const AssistMessageToolbarItem(
              content: Icon(Icons.thumb_up_outlined),
              tooltip: 'Like',
            ),
            const AssistMessageToolbarItem(
              content: Icon(Icons.copy),
              tooltip: 'Copy',
            ),
          ],
        ),
      );
    });
  }

  Future<String> _callAIService(String request) async {
    // Connect with your preferred AI service
    // Examples: OpenAI, Google AI, Azure AI, Anthropic, etc.
    await Future.delayed(Duration(seconds: 2)); // Simulate API call
    return 'AI response to: $request';
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text('AI Assistant')),
      body: SfAIAssistView(
        messages: _messages,
        composer: const AssistComposer(
          decoration: InputDecoration(
            hintText: 'Ask anything',
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
                    name: 'You',
                  ),
                ),
              );
              _generateAIResponse(userRequest);
            });
          },
        ),
        onToolbarItemSelected: (selected, messageIndex, item, itemIndex) {
          // Handle toolbar actions (like, copy, retry, etc.)
          print('Toolbar item $itemIndex selected on message $messageIndex');
        },
        placeholderBuilder: (context) {
          return const Center(
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                Icon(Icons.smart_toy_outlined, size: 64),
                SizedBox(height: 16),
                Text('What can I help you with today?'),
              ],
            ),
          );
        },
      ),
    );
  }
}
```

## Comparison with SfChat

| Feature | SfAIAssistView | When to Use |
|---------|----------------|-------------|
| **Purpose** | AI assistant interaction | Chatbots, AI helpers, Q&A systems |
| **Message Types** | Request/Response | Clear AI interaction pattern |
| **Toolbar** | Response toolbar available | For actions like like, copy, retry |
| **Loading** | Built-in loading builder | Show AI is processing |
| **Suggestions** | Response messages only | AI suggests next actions |
| **User ID** | Per-message author | Flexible author identification |

Choose **SfAIAssistView** when building AI-powered assistant interfaces where users submit requests and receive AI-generated responses, with the need for response-specific actions like copying, rating, or regenerating responses.
