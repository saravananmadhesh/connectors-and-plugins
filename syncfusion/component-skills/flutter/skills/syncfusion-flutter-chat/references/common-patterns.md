# Common Patterns

## Table of Contents

- [Pattern 1: Message Settings Customization](#pattern-1-message-settings-customization)
- [Pattern 2: Custom Composer with Multiple Actions](#pattern-2-custom-composer-with-multiple-actions)
- [Pattern 3: Custom Placeholder for Empty State](#pattern-3-custom-placeholder-for-empty-state)
- [Pattern 4: Loading Indicator for AI Responses](#pattern-4-loading-indicator-for-ai-responses)
- [Pattern 5: Theming for Consistent Brand Experience](#pattern-5-theming-for-consistent-brand-experience)

## Overview

This guide covers common implementation patterns for both `SfChat` and `SfAIAssistView` components. These patterns demonstrate best practices for customization, theming, and user experience enhancements.

## Pattern 1: Message Settings Customization

Customize the appearance and behavior of messages based on their type (incoming/outgoing for Chat, or request/response for AIAssistView).

### For Chat (SfChat)

```dart
SfChat(
  messages: _messages,
  outgoingUser: '123-001',
  incomingMessageSettings: const ChatMessageSettings(
    backgroundColor: Color(0xFFE3F2FD),
    showAuthorAvatar: true,
    showAuthorName: true,
    showTimestamp: true,
    textStyle: TextStyle(fontSize: 14),
    widthFactor: 0.8,
    avatarSize: Size(32, 32),
    margin: EdgeInsets.symmetric(vertical: 8, horizontal: 16),
  ),
  outgoingMessageSettings: const ChatMessageSettings(
    backgroundColor: Color(0xFFF1F8E9),
    showAuthorAvatar: false,
    showTimestamp: true,
    textStyle: TextStyle(fontSize: 14),
    widthFactor: 0.8,
    margin: EdgeInsets.symmetric(vertical: 8, horizontal: 16),
  ),
)
```

### For AIAssistView (SfAIAssistView)

```dart
SfAIAssistView(
  messages: _messages,
  requestMessageSettings: const AssistMessageSettings(
    backgroundColor: Color(0xFFF1F8E9),
    showAuthorName: false,
    showTimestamp: true,
    textStyle: TextStyle(fontSize: 14),
    widthFactor: 0.75,
    margin: EdgeInsets.symmetric(vertical: 8, horizontal: 16),
  ),
  responseMessageSettings: const AssistMessageSettings(
    backgroundColor: Color(0xFFE3F2FD),
    showAuthorName: true,
    showTimestamp: true,
    textStyle: TextStyle(fontSize: 14),
    widthFactor: 0.85,
    avatarSize: Size(36, 36),
    margin: EdgeInsets.symmetric(vertical: 8, horizontal: 16),
  ),
)
```

### When to Use

- **Different visual styles**: Differentiate message types with colors, sizes, or shapes
- **Asymmetric layouts**: Show avatars only for certain message types
- **Responsive design**: Adjust message width for different screen sizes
- **Brand consistency**: Match your app's design system

## Pattern 2: Custom Composer with Multiple Actions

Create a rich text input area with additional actions like file attachments, voice input, or emoji pickers.

### Custom Composer with Actions

```dart
class _ChatScreenState extends State<ChatScreen> {
  final TextEditingController _textController = TextEditingController();
  
  @override
  Widget build(BuildContext context) {
    return SfChat(
      messages: _messages,
      outgoingUser: '123-001',
      composer: ChatComposer.builder(
        builder: (context) {
          return Container(
            padding: EdgeInsets.symmetric(horizontal: 8, vertical: 4),
            decoration: BoxDecoration(
              color: Colors.white,
              border: Border(
                top: BorderSide(color: Colors.grey[300]!),
              ),
            ),
            child: Row(
              children: [
                // Attachment button
                IconButton(
                  icon: Icon(Icons.attach_file, color: Colors.grey[600]),
                  onPressed: () {
                    _handleAttachment();
                  },
                  tooltip: 'Attach file',
                ),
                // Text input
                Expanded(
                  child: TextField(
                    controller: _textController,
                    decoration: InputDecoration(
                      hintText: 'Type a message',
                      border: OutlineInputBorder(
                        borderRadius: BorderRadius.circular(25),
                        borderSide: BorderSide.none,
                      ),
                      filled: true,
                      fillColor: Colors.grey[100],
                      contentPadding: EdgeInsets.symmetric(
                        horizontal: 16,
                        vertical: 10,
                      ),
                    ),
                    maxLines: null,
                    textInputAction: TextInputAction.newline,
                  ),
                ),
                SizedBox(width: 8),
                // Voice input button
                IconButton(
                  icon: Icon(Icons.mic, color: Colors.blue),
                  onPressed: () {
                    _handleVoiceInput();
                  },
                  tooltip: 'Voice input',
                ),
                // Emoji picker button
                IconButton(
                  icon: Icon(Icons.emoji_emotions_outlined, color: Colors.grey[600]),
                  onPressed: () {
                    _showEmojiPicker();
                  },
                  tooltip: 'Add emoji',
                ),
              ],
            ),
          );
        },
      ),
      actionButton: ChatActionButton(
        onPressed: (String newMessage) {
          _sendMessage(newMessage);
          _textController.clear();
        },
      ),
    );
  }
  
  void _handleAttachment() {
    // Implement file picker
    print('Open file picker');
  }
  
  void _handleVoiceInput() {
    // Implement voice recording
    print('Start voice recording');
  }
  
  void _showEmojiPicker() {
    // Show emoji picker bottom sheet
    print('Show emoji picker');
  }
  
  void _sendMessage(String text) {
    setState(() {
      _messages.add(ChatMessage(
        text: text,
        time: DateTime.now(),
        author: ChatAuthor(
          id: '123-001',
          name: 'Me',
        ),
      ));
    });
  }
  
  @override
  void dispose() {
    _textController.dispose();
    super.dispose();
  }
}
```

### When to Use

- **Rich messaging**: Apps that support media, files, or voice messages
- **Enhanced UX**: Quick access to common actions
- **Mobile apps**: Touch-optimized input with multiple options
- **Feature-rich chat**: When standard text input isn't enough

## Pattern 3: Custom Placeholder for Empty State

Design an engaging placeholder that encourages users to start conversations.

### Engaging Welcome Placeholder

```dart
placeholderBuilder: (BuildContext context) {
  return Center(
    child: Padding(
      padding: EdgeInsets.all(32),
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          // Icon
          Icon(
            Icons.chat_bubble_outline,
            size: 80,
            color: Colors.blue[300],
          ),
          SizedBox(height: 24),
          // Title
          Text(
            'Start a conversation',
            style: TextStyle(
              fontSize: 24,
              fontWeight: FontWeight.bold,
              color: Colors.grey[800],
            ),
          ),
          SizedBox(height: 12),
          // Description
          Text(
            'Your messages will appear here.\nStart typing below to begin chatting.',
            textAlign: TextAlign.center,
            style: TextStyle(
              fontSize: 14,
              color: Colors.grey[600],
              height: 1.5,
            ),
          ),
          SizedBox(height: 32),
          // Quick actions (optional)
          Wrap(
            spacing: 12,
            alignment: WrapAlignment.center,
            children: [
              ActionChip(
                avatar: Icon(Icons.waving_hand, size: 18),
                label: Text('Say Hello'),
                onPressed: () {
                  // Pre-fill greeting
                },
              ),
              ActionChip(
                avatar: Icon(Icons.help_outline, size: 18),
                label: Text('Get Help'),
                onPressed: () {
                  // Pre-fill help request
                },
              ),
            ],
          ),
        ],
      ),
    ),
  );
}
```

### AI Assistant Placeholder with Examples

```dart
placeholderBuilder: (BuildContext context) {
  final examples = [
    {
      'icon': Icons.lightbulb_outline,
      'title': 'Creative Writing',
      'subtitle': 'Help me write a story',
    },
    {
      'icon': Icons.code,
      'title': 'Code Assistance',
      'subtitle': 'Explain this code snippet',
    },
    {
      'icon': Icons.school,
      'title': 'Learning',
      'subtitle': 'Teach me about quantum physics',
    },
    {
      'icon': Icons.chat,
      'title': 'General Chat',
      'subtitle': 'Let\'s have a conversation',
    },
  ];

  return SingleChildScrollView(
    padding: EdgeInsets.all(24),
    child: Column(
      crossAxisAlignment: CrossAxisAlignment.center,
      children: [
        SizedBox(height: 60),
        // AI Avatar
        CircleAvatar(
          radius: 50,
          backgroundColor: Colors.purple[50],
          child: Icon(
            Icons.smart_toy,
            size: 50,
            color: Colors.purple,
          ),
        ),
        SizedBox(height: 24),
        // Title
        Text(
          'AI Assistant',
          style: TextStyle(
            fontSize: 28,
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
        SizedBox(height: 40),
        // Example prompts
        Text(
          'Try asking about:',
          style: TextStyle(
            fontSize: 16,
            fontWeight: FontWeight.w600,
            color: Colors.grey[700],
          ),
        ),
        SizedBox(height: 16),
        ...examples.map((example) {
          return Padding(
            padding: EdgeInsets.only(bottom: 12),
            child: Card(
              child: ListTile(
                leading: Icon(
                  example['icon'] as IconData,
                  color: Colors.purple,
                ),
                title: Text(
                  example['title'] as String,
                  style: TextStyle(fontWeight: FontWeight.w500),
                ),
                subtitle: Text(example['subtitle'] as String),
                trailing: Icon(Icons.arrow_forward_ios, size: 16),
                onTap: () {
                  // Pre-fill this example
                },
              ),
            ),
          );
        }).toList(),
      ],
    ),
  );
}
```

### When to Use

- **First-time experience**: Guide new users on what to do
- **Feature discovery**: Show capabilities through examples
- **Engagement**: Encourage users to start interacting
- **Brand personality**: Reflect your app's tone and style

## Pattern 4: Loading Indicator for AI Responses

Show users that the AI is processing their request with custom loading animations.

### Custom Loading Animation

```dart
SfAIAssistView(
  messages: _messages,
  responseLoadingBuilder: (context, index, message) {
    return Container(
      padding: EdgeInsets.all(16),
      margin: EdgeInsets.symmetric(vertical: 8, horizontal: 16),
      decoration: BoxDecoration(
        color: Colors.grey[100],
        borderRadius: BorderRadius.circular(12),
      ),
      child: Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          SizedBox(
            width: 20,
            height: 20,
            child: CircularProgressIndicator(
              strokeWidth: 2,
              valueColor: AlwaysStoppedAnimation<Color>(Colors.purple),
            ),
          ),
          SizedBox(width: 12),
          Text(
            'AI is thinking...',
            style: TextStyle(
              fontStyle: FontStyle.italic,
              color: Colors.grey[700],
              fontSize: 14,
            ),
          ),
        ],
      ),
    );
  },
)
```

### Typing Indicator Style

```dart
responseLoadingBuilder: (context, index, message) {
  return Container(
    padding: EdgeInsets.symmetric(horizontal: 20, vertical: 12),
    margin: EdgeInsets.symmetric(vertical: 8, horizontal: 16),
    decoration: BoxDecoration(
      color: Colors.white,
      borderRadius: BorderRadius.circular(20),
      boxShadow: [
        BoxShadow(
          color: Colors.black.withOpacity(0.05),
          blurRadius: 5,
          offset: Offset(0, 2),
        ),
      ],
    ),
    child: Row(
      mainAxisSize: MainAxisSize.min,
      children: [
        _buildDot(delay: 0),
        SizedBox(width: 4),
        _buildDot(delay: 200),
        SizedBox(width: 4),
        _buildDot(delay: 400),
      ],
    ),
  );
}

Widget _buildDot({required int delay}) {
  return TweenAnimationBuilder(
    tween: Tween(begin: 0.0, end: 1.0),
    duration: Duration(milliseconds: 600),
    builder: (context, double value, child) {
      return Transform.translate(
        offset: Offset(0, -4 * math.sin(value * math.pi)),
        child: Container(
          width: 8,
          height: 8,
          decoration: BoxDecoration(
            color: Colors.grey[600],
            shape: BoxShape.circle,
          ),
        ),
      );
    },
  );
}
```

### When to Use

- **AI processing time**: When responses take >1 second
- **User feedback**: Show the system is working
- **Professional appearance**: Polished, production-ready UX
- **Anxiety reduction**: Reduce uncertainty during waits

## Pattern 5: Theming for Consistent Brand Experience

Apply consistent styling across all chat elements to match your brand identity.

### Chat Theme (SfChat)

```dart
SfChatTheme(
  data: SfChatThemeData(
    // Action button styling
    actionButtonBackgroundColor: Colors.blue,
    actionButtonForegroundColor: Colors.white,
    actionButtonShape: RoundedRectangleBorder(
      borderRadius: BorderRadius.circular(28),
    ),
    actionButtonElevation: 2.0,
    
    // Outgoing message styling
    outgoingMessageBackgroundColor: Colors.blue[100],
    outgoingContentTextStyle: TextStyle(
      color: Colors.black87,
      fontSize: 15,
    ),
    outgoingPrimaryHeaderTextStyle: TextStyle(
      color: Colors.black54,
      fontSize: 12,
      fontWeight: FontWeight.w600,
    ),
    outgoingAvatarBackgroundColor: Colors.blue[300],
    
    // Incoming message styling
    incomingMessageBackgroundColor: Colors.grey[200],
    incomingContentTextStyle: TextStyle(
      color: Colors.black87,
      fontSize: 15,
    ),
    incomingPrimaryHeaderTextStyle: TextStyle(
      color: Colors.black54,
      fontSize: 12,
      fontWeight: FontWeight.w600,
    ),
    incomingAvatarBackgroundColor: Colors.grey[400],
    
    // Composer styling
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
        filled: true,
        fillColor: Colors.grey[100],
        border: OutlineInputBorder(
          borderRadius: BorderRadius.circular(24),
          borderSide: BorderSide.none,
        ),
      ),
    ),
  ),
)
```

### AI AssistView Theme (SfAIAssistView)

```dart
SfAIAssistViewTheme(
  data: SfAIAssistViewThemeData(
    // Action button styling
    actionButtonBackgroundColor: Colors.purple,
    actionButtonForegroundColor: Colors.white,
    actionButtonShape: CircleBorder(),
    actionButtonElevation: 3.0,
    
    // Request message styling (user)
    requestMessageBackgroundColor: Colors.purple[100],
    requestContentTextStyle: TextStyle(
      color: Colors.black87,
      fontSize: 15,
      height: 1.4,
    ),
    requestPrimaryHeaderTextStyle: TextStyle(
      color: Colors.purple[700],
      fontSize: 12,
      fontWeight: FontWeight.w600,
    ),
    requestAvatarBackgroundColor: Colors.purple[300],
    requestMessageShape: RoundedRectangleBorder(
      borderRadius: BorderRadius.circular(18),
    ),
    
    // Response message styling (AI)
    responseMessageBackgroundColor: Colors.grey[100],
    responseContentTextStyle: TextStyle(
      color: Colors.black87,
      fontSize: 15,
      height: 1.5,
    ),
    responsePrimaryHeaderTextStyle: TextStyle(
      color: Colors.grey[700],
      fontSize: 12,
      fontWeight: FontWeight.w600,
    ),
    responseAvatarBackgroundColor: Colors.grey[300],
    responseMessageShape: RoundedRectangleBorder(
      borderRadius: BorderRadius.circular(18),
    ),
    
    // Toolbar styling
    responseToolbarItemBackgroundColor: WidgetStatePropertyAll(Colors.white),
    responseToolbarItemShape: WidgetStatePropertyAll(
      RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(8),
      ),
    ),
    
    // Composer styling
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
        filled: true,
        fillColor: Colors.white,
        border: OutlineInputBorder(
          borderRadius: BorderRadius.circular(24),
          borderSide: BorderSide(color: Colors.grey[300]!),
        ),
      ),
    ),
  ),
)
```

### Dark Theme Example

```dart
// Dark theme for chat
SfChatTheme(
  data: SfChatThemeData(
    actionButtonBackgroundColor: Colors.teal,
    actionButtonForegroundColor: Colors.white,
    
    outgoingMessageBackgroundColor: Colors.teal[700],
    outgoingContentTextStyle: TextStyle(color: Colors.white),
    
    incomingMessageBackgroundColor: Colors.grey[800],
    incomingContentTextStyle: TextStyle(color: Colors.white),
    
    editorTextStyle: TextStyle(color: Colors.white),
  ),
  child: Container(
    color: Colors.grey[900],
    child: SfChat(
      messages: _messages,
      outgoingUser: '123-001',
    ),
  ),
)
```

### When to Use

- **Brand consistency**: Match your company's design system
- **Accessibility**: Ensure proper contrast and readability
- **Dark mode**: Provide theme variants for user preferences
- **Professional appearance**: Polished, production-ready styling
- **User customization**: Allow users to personalize their experience

## Best Practices

1. **Consistency**: Use the same pattern throughout your app
2. **Accessibility**: Ensure themes meet WCAG contrast requirements
3. **Performance**: Avoid complex widgets in builders that render frequently
4. **Testing**: Test patterns on different screen sizes and orientations
5. **Documentation**: Document custom patterns for team members
6. **User feedback**: Gather feedback on loading indicators and placeholders
7. **Progressive enhancement**: Start simple, add complexity as needed

These patterns provide a solid foundation for building professional, user-friendly conversational interfaces with Syncfusion Flutter components.
