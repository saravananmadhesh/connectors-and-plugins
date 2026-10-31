---
name: syncfusion-flutter-chat
description: Implements Syncfusion Flutter Chat (SfChat) and AI AssistView (SfAIAssistView) widgets for conversational interfaces in Flutter apps. Use when building chat UIs, AI chatbot interfaces, or messaging screens with support for message bubbles, composers, and action buttons. This skill covers conversation area customization, placeholder screens, theming, RTL support, and AI assistant integration.
metadata:
  author: "Syncfusion Inc"
  version: "34.1.29"
---

# Syncfusion Flutter Chat & AI AssistView

This skill covers two related Syncfusion Flutter components for conversational UI: **SfChat** (Chat widget) and **SfAIAssistView** (AI AssistView widget). While they share many visual and configuration features, they serve different primary purposes.

## When to Use This Skill

Use this skill when you need to:

- **Implement chat interfaces** with multi-user conversations and messaging
- **Add AI assistant functionality** with request-response patterns
- **Build messaging apps** with incoming/outgoing message support
- **Create AI chatbot interfaces** with AI service integration
- **Display conversation UI** with messages, avatars, and timestamps
- **Handle message composition** with text editors and action buttons
- **Customize message appearance** with builders, themes, and styling
- **Support placeholder screens** for empty conversation states
- **Enable suggestion chips** for quick responses or actions
- **Integrate toolbar actions** for response messages (like, copy, retry)
- **Show loading indicators** for AI response generation
- **Implement RTL support** for right-to-left languages

## Choosing the Right Component

### Use **SfChat** (Chat Widget) when:
- You need **multi-user conversation** interfaces
- Your app requires **incoming and outgoing messages** differentiation
- You need **traditional messaging app** functionality (WhatsApp, Telegram style)
- Building chat for: team collaboration, customer support, social messaging, group chats
- **Message suggestions** should appear on both incoming/outgoing messages
- You need to identify the **outgoing user** explicitly

### Use **SfAIAssistView** (AI AssistView Widget) when:
- You need **AI assistant** or **chatbot** functionality
- Your primary goal is **request-response patterns** with AI services
- You need **toolbar items** on response messages (like, dislike, copy, retry)
- You need **loading indicators** while AI generates responses
- Building UI for: AI assistants, chatbots, help bots, Q&A interfaces
- **Message suggestions** should only appear on AI response messages
- You need clear **request vs response** message distinction

### Key Differences Summary:

| Feature | SfChat | SfAIAssistView |
|---------|--------|----------------|
| **Primary Purpose** | Multi-user messaging | AI assistant interaction |
| **Message Types** | Incoming/Outgoing | Request/Response |
| **User Identification** | outgoingUser property | Author in each message |
| **Suggestions** | On any message | Only on response messages |
| **Toolbar Items** | ❌ Not supported | ✅ Response toolbar support |
| **Loading Indicator** | ❌ Not included | ✅ Response loading builder |
| **Use Case** | Chat apps, messaging | AI chatbots, assistants |
| **Message Classes** | ChatMessage | AssistMessage |
| **Composer Classes** | ChatComposer | AssistComposer |
| **Action Button Classes** | ChatActionButton | AssistActionButton |

## Documentation and Navigation Guide

### Getting Started

📄 **Read:** [references/getting-started.md](references/getting-started.md)
- Installation and package setup for both components
- Basic SfChat implementation
- Basic SfAIAssistView implementation
- Package dependencies and imports
- Quick comparison and first examples

### Component Overview

📄 **For Chat:** [references/chat-overview.md](references/chat-overview.md)
- SfChat widget overview and features
- When to use Chat vs AI AssistView
- Multi-user conversation capabilities
- Incoming/outgoing message patterns
- Chat-specific capabilities
- Basic chat configuration

📄 **For AI AssistView:** [references/aiassistview-overview.md](references/aiassistview-overview.md)
- SfAIAssistView widget overview and features
- When to use AI AssistView vs Chat
- Request/response patterns
- AI integration capabilities
- AIAssistView-specific capabilities
- Basic AIAssistView configuration

### Conversation Area and Messages

📄 **Read:** [references/conversation-area.md](references/conversation-area.md)
- Message structure and display
- Incoming/outgoing messages (Chat)
- Request/response messages (AIAssistView)
- Message settings and customization
- Headers and timestamps
- Footers and additional info
- Message avatars
- Content area styling
- Message suggestions (both components)
- Toolbar items (AIAssistView only)
- Loading indicators (AIAssistView only)

### Composer and Input

📄 **Read:** [references/composer.md](references/composer.md)
- Default composer configuration
- Text editor customization
- Minimum and maximum lines
- Decoration and styling
- Hint text and placeholders
- Borders and padding
- Prefix and suffix icons
- Text style customization
- Margin configuration
- Custom composer builder

### Action Button

📄 **Read:** [references/action-button.md](references/action-button.md)
- Action button overview
- Send button functionality
- Custom child widgets
- onPressed callback
- Tooltip text
- Colors (foreground, background, focus, hover, splash)
- Elevation settings
- Mouse cursor customization
- Shape and border radius
- Margin and size

### Placeholder

📄 **Read:** [references/placeholder.md](references/placeholder.md)
- Placeholder builder overview
- Custom placeholder widgets
- Empty conversation state design
- Welcome messages
- Getting started hints
- Examples for both components

### Theming and Customization

📄 **Read:** [references/theming.md](references/theming.md)
- Theme overview (Chat vs AIAssistView)
- SfChatTheme and SfAIAssistViewTheme
- Action button theming
- Avatar colors and styling
- Message background colors
- Content text styles
- Header text styles
- Suggestion styling
- Message shapes and borders
- Toolbar theming (AIAssistView only)

### Localization and Accessibility

📄 **Read:** [references/right-to-left.md](references/right-to-left.md)
- Right-to-left (RTL) support
- Directionality widget usage
- RTL rendering for all elements
- RTL for placeholder
- RTL for composer
- RTL for action button
- RTL for messages and content

### Common Patterns

📄 **Read:** [references/common-patterns.md](references/common-patterns.md)
- Message settings customization
- Custom composer with multiple actions
- Custom placeholder for empty state
- Loading indicator for AI responses
- Theming for consistent brand experience

## Quick Start Examples

### Basic Chat with Messages

```dart
import 'package:flutter/material.dart';
import 'package:syncfusion_flutter_chat/chat.dart';

class MyChat extends StatefulWidget {
  @override
  State<MyChat> createState() => _MyChatState();
}

class _MyChatState extends State<MyChat> {
  List<ChatMessage> _messages = <ChatMessage>[];

  @override
  void initState() {
    super.initState();
    _messages = <ChatMessage>[
      ChatMessage(
        text: 'Hi! How can I help you today?',
        time: DateTime.now(),
        author: const ChatAuthor(
          id: '123-001',
          name: 'John Doe',
        ),
      ),
      ChatMessage(
        text: 'I need help with my order.',
        time: DateTime.now(),
        author: const ChatAuthor(
          id: '123-002',
          name: 'Jane Smith',
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
        outgoingUser: '123-002',
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
                    id: '123-002',
                    name: 'Jane Smith',
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

### Basic AI AssistView with AI Integration

```dart
import 'package:flutter/material.dart';
import 'package:syncfusion_flutter_chat/assist_view.dart';

class MyAIAssistView extends StatefulWidget {
  @override
  State<MyAIAssistView> createState() => _MyAIAssistViewState();
}

class _MyAIAssistViewState extends State<MyAIAssistView> {
  List<AssistMessage> _messages = <AssistMessage>[];

  void _generateAIResponse(String userRequest) async {
    // Call your AI service here
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
            hintText: 'Ask me anything',
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
        placeholderBuilder: (BuildContext context) {
          return const Center(
            child: Text(
              'What can I help you with today?',
              style: TextStyle(fontSize: 16),
            ),
          );
        },
      ),
    );
  }
}
```

### Chat with Suggestions

```dart
SfChat(
  messages: <ChatMessage>[
    ChatMessage(
      text: 'Which programming language should I learn?',
      time: DateTime.now(),
      author: const ChatAuthor(id: '1', name: 'Alice'),
    ),
    ChatMessage(
      text: 'It depends on your goals. What interests you?',
      time: DateTime.now(),
      author: const ChatAuthor(id: '2', name: 'Bob'),
      suggestions: <ChatMessageSuggestion>[
        const ChatMessageSuggestion(data: 'Web Development'),
        const ChatMessageSuggestion(data: 'Mobile Apps'),
        const ChatMessageSuggestion(data: 'Data Science'),
        const ChatMessageSuggestion(data: 'Game Development'),
      ],
    ),
  ],
  outgoingUser: '1',
)
```

### AI AssistView with Toolbar Items

```dart
void _generateResponse(String request) async {
  final String response = await _getAIResponse(request);
  setState(() {
    _messages.add(
      AssistMessage.response(
        data: response,
        time: DateTime.now(),
        author: const AssistMessageAuthor(id: 'ai', name: 'AI'),
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
            tooltip: 'Regenerate',
          ),
        ],
      ),
    );
  });
}

SfAIAssistView(
  messages: _messages,
  onToolbarItemSelected: (bool selected, int messageIndex,
      AssistMessageToolbarItem item, int toolbarItemIndex) {
    // Handle toolbar action (like, dislike, copy, etc.)
    print('Toolbar item selected at index $toolbarItemIndex');
  },
)
```

## Key Properties

### SfChat Essential Properties

- `messages` - List of ChatMessage objects to display
- `outgoingUser` - ID of the user sending messages (distinguishes incoming/outgoing)
- `composer` - ChatComposer for text input
- `actionButton` - ChatActionButton for sending messages
- `placeholderBuilder` - Custom widget for empty state
- `incomingMessageSettings` - Settings for incoming messages
- `outgoingMessageSettings` - Settings for outgoing messages
- `messageHeaderBuilder` - Custom header for each message
- `messageFooterBuilder` - Custom footer for each message
- `messageContentBuilder` - Custom content for each message
- `messageAvatarBuilder` - Custom avatar for each message

### SfAIAssistView Essential Properties

- `messages` - List of AssistMessage objects (request/response)
- `composer` - AssistComposer for text input
- `actionButton` - AssistActionButton for sending requests
- `placeholderBuilder` - Custom widget for empty state
- `requestMessageSettings` - Settings for request messages
- `responseMessageSettings` - Settings for response messages
- `messageHeaderBuilder` - Custom header for each message
- `messageFooterBuilder` - Custom footer for each message
- `messageContentBuilder` - Custom content for each message
- `messageAvatarBuilder` - Custom avatar for each message
- `responseLoadingBuilder` - Custom loading indicator while AI responds
- `onToolbarItemSelected` - Callback when toolbar item is tapped
- `onSuggestionItemSelected` - Callback when suggestion chip is tapped

### ChatMessage / AssistMessage Properties

**ChatMessage:**
- `text` - Message content
- `time` - Timestamp of the message
- `author` - ChatAuthor with id, name, and avatar
- `suggestions` - List of ChatMessageSuggestion items

**AssistMessage:**
- `data` - Message content
- `time` - Timestamp of the message
- `author` - AssistMessageAuthor with id, name, and avatar
- `suggestions` - List of AssistMessageSuggestion items (response only)
- `toolbarItems` - List of AssistMessageToolbarItem (response only)

### Composer Properties (Both Components)

- `minLines` - Minimum lines in text editor (default: 1)
- `maxLines` - Maximum lines in text editor (default: 6)
- `decoration` - InputDecoration for styling
- `margin` - Space around the composer
- `textStyle` - Text style for input
- `builder` - Custom composer widget

### Action Button Properties (Both Components)

- `child` - Custom widget for button
- `onPressed` - Callback when button is pressed
- `tooltip` - Tooltip text
- `foregroundColor` - Icon/text color
- `backgroundColor` - Button background color
- `focusColor` - Color when focused
- `hoverColor` - Color when hovered
- `splashColor` - Ripple effect color
- `elevation` - Shadow elevation
- `focusElevation` - Elevation when focused
- `hoverElevation` - Elevation when hovered
- `highlightElevation` - Elevation when pressed
- `mouseCursor` - Cursor style on hover
- `shape` - Button shape and border
- `margin` - Space around button
- `size` - Button dimensions

### Message Settings Properties (Both Components)

- `showAuthorName` - Show/hide author name
- `showTimestamp` - Show/hide timestamp
- `showAuthorAvatar` - Show/hide avatar
- `timestampFormat` - DateFormat for timestamp
- `backgroundColor` - Message background color
- `textStyle` - Message text style
- `headerTextStyle` - Header text style
- `shape` - Message bubble shape
- `widthFactor` - Message width relative to screen (0-1)
- `avatarSize` - Avatar dimensions
- `margin` - Space around message
- `padding` - Padding inside message
- `avatarPadding` - Padding around avatar
- `headerPadding` - Padding around header
- `footerPadding` - Padding around footer

## Common Use Cases

**For SfChat:** Customer support chat, team messaging, social messaging, live chat support with multi-user conversations and incoming/outgoing message patterns.

**For SfAIAssistView:** AI chatbots, AI assistants, help bots, Q&A interfaces with request/response patterns, toolbar items, and loading indicators.
