# Placeholder

## Overview

The `placeholderBuilder` property allows you to specify a custom widget that displays in the conversation area when there are no messages. This is particularly useful for:

- Welcoming new users
- Providing instructions on how to start
- Displaying branding or marketing content
- Showing suggested actions or topics
- Creating an engaging empty state

The placeholder is automatically hidden once messages start appearing in the conversation.

## For Chat (SfChat)

Use placeholders in chat interfaces to encourage users to start conversations.

### Basic Placeholder

```dart
SfChat(
  messages: _messages, // Empty initially
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

### Welcome Message Placeholder

```dart
placeholderBuilder: (BuildContext context) {
  return Center(
    child: Column(
      mainAxisAlignment: MainAxisAlignment.center,
      children: [
        Icon(
          Icons.chat_bubble_outline,
          size: 64,
          color: Colors.blue[300],
        ),
        SizedBox(height: 24),
        Text(
          'Start a conversation!',
          style: TextStyle(
            fontSize: 24,
            fontWeight: FontWeight.bold,
            color: Colors.blue[700],
          ),
        ),
        SizedBox(height: 8),
        Text(
          'Send a message to begin chatting',
          style: TextStyle(
            fontSize: 14,
            color: Colors.grey[600],
          ),
        ),
      ],
    ),
  );
}
```

### Placeholder with Instructions

```dart
placeholderBuilder: (BuildContext context) {
  return Padding(
    padding: EdgeInsets.all(24),
    child: Column(
      mainAxisAlignment: MainAxisAlignment.center,
      children: [
        Icon(
          Icons.message_outlined,
          size: 72,
          color: Colors.grey[400],
        ),
        SizedBox(height: 24),
        Text(
          'Welcome to Chat Support',
          style: TextStyle(
            fontSize: 22,
            fontWeight: FontWeight.bold,
          ),
        ),
        SizedBox(height: 16),
        Text(
          'Our team is here to help you 24/7.\nStart typing to begin your conversation.',
          textAlign: TextAlign.center,
          style: TextStyle(
            fontSize: 14,
            color: Colors.grey[600],
            height: 1.5,
          ),
        ),
        SizedBox(height: 24),
        ElevatedButton.icon(
          onPressed: () {
            // Pre-fill a message or show quick actions
          },
          icon: Icon(Icons.help_outline),
          label: Text('Get Help'),
        ),
      ],
    ),
  );
}
```

## For AIAssistView (SfAIAssistView)

Use placeholders in AI assistant interfaces to guide users on what they can ask.

### Basic AI Placeholder

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

### AI Assistant Welcome

```dart
placeholderBuilder: (BuildContext context) {
  return Center(
    child: Column(
      mainAxisAlignment: MainAxisAlignment.center,
      children: [
        Icon(
          Icons.smart_toy_outlined,
          size: 80,
          color: Colors.purple[300],
        ),
        SizedBox(height: 24),
        Text(
          'AI Assistant',
          style: TextStyle(
            fontSize: 28,
            fontWeight: FontWeight.bold,
            color: Colors.purple[700],
          ),
        ),
        SizedBox(height: 12),
        Text(
          'Ask me anything!',
          style: TextStyle(
            fontSize: 18,
            color: Colors.grey[600],
          ),
        ),
        SizedBox(height: 8),
        Text(
          'I can help with questions, recommendations,\nand more.',
          textAlign: TextAlign.center,
          style: TextStyle(
            fontSize: 14,
            color: Colors.grey[500],
          ),
        ),
      ],
    ),
  );
}
```

### Placeholder with Suggested Topics

```dart
placeholderBuilder: (BuildContext context) {
  return Padding(
    padding: EdgeInsets.all(32),
    child: Column(
      mainAxisAlignment: MainAxisAlignment.center,
      crossAxisAlignment: CrossAxisAlignment.stretch,
      children: [
        Icon(
          Icons.psychology_outlined,
          size: 64,
          color: Colors.purple,
        ),
        SizedBox(height: 24),
        Text(
          'What can I help you with today?',
          textAlign: TextAlign.center,
          style: TextStyle(
            fontSize: 20,
            fontWeight: FontWeight.bold,
          ),
        ),
        SizedBox(height: 32),
        Text(
          'Try asking about:',
          style: TextStyle(
            fontSize: 14,
            color: Colors.grey[700],
            fontWeight: FontWeight.w500,
          ),
        ),
        SizedBox(height: 12),
        Wrap(
          spacing: 8,
          runSpacing: 8,
          alignment: WrapAlignment.center,
          children: [
            _buildTopicChip(context, 'Travel Tips', Icons.flight),
            _buildTopicChip(context, 'Recipe Ideas', Icons.restaurant),
            _buildTopicChip(context, 'Fun Facts', Icons.lightbulb),
            _buildTopicChip(context, 'Life Hacks', Icons.tips_and_updates),
          ],
        ),
      ],
    ),
  );
}

Widget _buildTopicChip(BuildContext context, String label, IconData icon) {
  return ActionChip(
    avatar: Icon(icon, size: 18),
    label: Text(label),
    onPressed: () {
      // Pre-fill or send a message about this topic
    },
  );
}
```

### Interactive Placeholder with Examples

```dart
placeholderBuilder: (BuildContext context) {
  final examples = [
    {'icon': Icons.code, 'text': 'Explain Flutter widgets'},
    {'icon': Icons.calculate, 'text': 'Math homework help'},
    {'icon': Icons.translate, 'text': 'Translate a phrase'},
    {'icon': Icons.create, 'text': 'Write a poem'},
  ];

  return SingleChildScrollView(
    padding: EdgeInsets.all(24),
    child: Column(
      crossAxisAlignment: CrossAxisAlignment.center,
      children: [
        SizedBox(height: 40),
        CircleAvatar(
          radius: 50,
          backgroundColor: Colors.blue[50],
          child: Icon(
            Icons.smart_toy,
            size: 50,
            color: Colors.blue,
          ),
        ),
        SizedBox(height: 24),
        Text(
          'AI Assistant',
          style: TextStyle(
            fontSize: 24,
            fontWeight: FontWeight.bold,
          ),
        ),
        SizedBox(height: 8),
        Text(
          'Powered by Advanced AI',
          style: TextStyle(
            fontSize: 14,
            color: Colors.grey[600],
          ),
        ),
        SizedBox(height: 32),
        Text(
          'Example questions:',
          style: TextStyle(
            fontSize: 16,
            fontWeight: FontWeight.w600,
          ),
        ),
        SizedBox(height: 16),
        ...examples.map((example) {
          return Padding(
            padding: EdgeInsets.only(bottom: 12),
            child: InkWell(
              onTap: () {
                // Send this as a request
                _sendExampleRequest(example['text'] as String);
              },
              borderRadius: BorderRadius.circular(12),
              child: Container(
                padding: EdgeInsets.all(16),
                decoration: BoxDecoration(
                  border: Border.all(color: Colors.grey[300]!),
                  borderRadius: BorderRadius.circular(12),
                ),
                child: Row(
                  children: [
                    Icon(
                      example['icon'] as IconData,
                      color: Colors.blue,
                    ),
                    SizedBox(width: 16),
                    Expanded(
                      child: Text(
                        example['text'] as String,
                        style: TextStyle(fontSize: 14),
                      ),
                    ),
                    Icon(
                      Icons.arrow_forward_ios,
                      size: 16,
                      color: Colors.grey[400],
                    ),
                  ],
                ),
              ),
            ),
          );
        }).toList(),
      ],
    ),
  );
}
```

## Best Practices

### 1. Keep It Simple

Don't overwhelm users with too much information. A simple, clear message often works best.

```dart
placeholderBuilder: (context) {
  return Center(
    child: Text(
      'Start chatting',
      style: TextStyle(fontSize: 18, color: Colors.grey),
    ),
  );
}
```

### 2. Provide Context

Let users know what they can do:

```dart
placeholderBuilder: (context) {
  return Center(
    child: Text(
      'Send a message to start the conversation',
      textAlign: TextAlign.center,
      style: TextStyle(color: Colors.grey[600]),
    ),
  );
}
```

### 3. Match Your Brand

Use colors, icons, and messaging that match your app's brand identity.

### 4. Consider Localization

Make sure placeholder text is localized for international users.

### 5. Test on Different Screen Sizes

Ensure your placeholder looks good on both small phones and large tablets.

## Common Patterns

### Loading State Placeholder

If you're fetching initial messages:

```dart
placeholderBuilder: (context) {
  return Center(
    child: Column(
      mainAxisAlignment: MainAxisAlignment.center,
      children: [
        CircularProgressIndicator(),
        SizedBox(height: 16),
        Text('Loading messages...'),
      ],
    ),
  );
}
```

### Error State

If there's an error loading messages:

```dart
placeholderBuilder: (context) {
  return Center(
    child: Column(
      mainAxisAlignment: MainAxisAlignment.center,
      children: [
        Icon(Icons.error_outline, size: 64, color: Colors.red),
        SizedBox(height: 16),
        Text('Failed to load messages'),
        SizedBox(height: 8),
        ElevatedButton(
          onPressed: _retryLoadingMessages,
          child: Text('Retry'),
        ),
      ],
    ),
  );
}
```

The placeholder is a powerful tool for creating engaging and informative empty states in your conversational interfaces.
