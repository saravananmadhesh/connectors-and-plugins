# Composer

## Table of Contents
- [Overview](#overview)
- [Default Composer](#default-composer)
- [Minimum and Maximum Lines](#minimum-and-maximum-lines)
- [Decoration](#decoration)
- [Margin](#margin)
- [Text Style](#text-style)
- [Custom Composer Builder](#custom-composer-builder)

## Overview

The composer is a customizable text editor designed for typing new messages in both **SfChat** (ChatComposer) and **SfAIAssistView** (AssistComposer). Both composers share the same properties and customization options.

When the composer is `null`, no default text field is added to the widget.

## Default Composer

### For Chat

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

### For AIAssistView

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

## Minimum and Maximum Lines

Control the height of the text editor with minimum and maximum line constraints.

### minLines

Specifies the minimum number of lines in the text field. This affects the initial height of the text editor.

**Default:** `1`

### maxLines

Defines the maximum number of lines for the text. When the text wraps beyond this limit, the field becomes scrollable.

**Default:** `6`

### Example

```dart
// For Chat
ChatComposer(
  minLines: 2,
  maxLines: 4,
  decoration: InputDecoration(
    hintText: 'Type your message',
  ),
)

// For AIAssistView
AssistComposer(
  minLines: 1,
  maxLines: 8,
  decoration: InputDecoration(
    hintText: 'Ask anything',
  ),
)
```

## Decoration

The `decoration` property customizes the visual attributes of the message input field using `InputDecoration`. This provides extensive styling options for the composer.

### Enabled

Controls whether the composer is enabled or disabled.

**Default:** `true`

When set to `false`, both the composer and the action button are disabled.

```dart
ChatComposer(
  decoration: InputDecoration(
    enabled: false,
    hintText: 'Chat is disabled',
  ),
)
```

### Border

Defines the shape of the border around the text field.

**Default:** `OutlineInputBorder`

```dart
ChatComposer(
  decoration: InputDecoration(
    hintText: 'Type a message',
    border: OutlineInputBorder(
      borderRadius: BorderRadius.circular(25),
      borderSide: BorderSide(color: Colors.blue, width: 2),
    ),
    enabledBorder: OutlineInputBorder(
      borderRadius: BorderRadius.circular(25),
      borderSide: BorderSide(color: Colors.grey, width: 1),
    ),
    focusedBorder: OutlineInputBorder(
      borderRadius: BorderRadius.circular(25),
      borderSide: BorderSide(color: Colors.blue, width: 2),
    ),
  ),
)
```

### Content Padding

Defines the padding surrounding the text inside the text field.

**Default:** Horizontal: `16`, Vertical: `18`

```dart
ChatComposer(
  decoration: InputDecoration(
    hintText: 'Type a message',
    contentPadding: EdgeInsets.symmetric(
      horizontal: 20,
      vertical: 12,
    ),
  ),
)
```

### Hint Text

Sets the placeholder text displayed when the field is empty.

**Default:** `null`

```dart
// For Chat
ChatComposer(
  decoration: InputDecoration(
    hintText: 'Type your message here...',
  ),
)

// For AIAssistView
AssistComposer(
  decoration: InputDecoration(
    hintText: 'Ask me anything...',
  ),
)
```

### Hint Style

Customizes the text style of the hint text.

```dart
ChatComposer(
  decoration: InputDecoration(
    hintText: 'Type a message',
    hintStyle: TextStyle(
      color: Colors.grey[400],
      fontSize: 14,
      fontStyle: FontStyle.italic,
    ),
  ),
)
```

### Prefix Icon

Adds an icon at the beginning of the text field.

```dart
ChatComposer(
  decoration: InputDecoration(
    hintText: 'Type a message',
    prefixIcon: Icon(
      Icons.emoji_emotions_outlined,
      color: Colors.orange,
    ),
  ),
)
```

### Suffix Icon

Adds an icon at the end of the text field.

```dart
ChatComposer(
  decoration: InputDecoration(
    hintText: 'Type a message',
    suffixIcon: Icon(
      Icons.attach_file,
      color: Colors.blue,
    ),
  ),
)
```

### Complete Decoration Example

```dart
ChatComposer(
  minLines: 1,
  maxLines: 5,
  decoration: InputDecoration(
    hintText: 'Type your message',
    hintStyle: TextStyle(
      color: Colors.grey[400],
      fontSize: 14,
    ),
    prefixIcon: Icon(Icons.emoji_emotions_outlined),
    suffixIcon: Icon(Icons.camera_alt),
    contentPadding: EdgeInsets.symmetric(
      horizontal: 16,
      vertical: 12,
    ),
    border: OutlineInputBorder(
      borderRadius: BorderRadius.circular(24),
      borderSide: BorderSide.none,
    ),
    filled: true,
    fillColor: Colors.grey[100],
  ),
)
```

## Margin

The `margin` property defines the space around the text field, creating distance between the conversation area and the composer.

**Default:** Top: `16`, Others: `0`

```dart
// For Chat
ChatComposer(
  margin: EdgeInsets.fromLTRB(12, 16, 12, 12),
  decoration: InputDecoration(
    hintText: 'Type a message',
  ),
)

// For AIAssistView
AssistComposer(
  margin: EdgeInsets.all(16),
  decoration: InputDecoration(
    hintText: 'Ask here',
  ),
)
```

## Text Style

The `textStyle` property sets the style for text entered in the composer.

The specified text style will be merged with the `bodyMedium` text style from the theme and any `editorTextStyle` from the component theme.

```dart
// For Chat
ChatComposer(
  textStyle: TextStyle(
    fontSize: 16,
    color: Colors.black87,
    fontWeight: FontWeight.normal,
  ),
  decoration: InputDecoration(
    hintText: 'Type a message',
  ),
)

// For AIAssistView
AssistComposer(
  textStyle: TextStyle(
    fontSize: 15,
    color: Colors.black,
    letterSpacing: 0.5,
  ),
  decoration: InputDecoration(
    hintText: 'Ask anything',
  ),
)
```

## Custom Composer Builder

The builder constructors (`ChatComposer.builder` and `AssistComposer.builder`) enable you to specify any custom widget as the composer. This is useful for integrating additional options alongside the text field.

### Important Notes

- When using the builder, the action button is **always enabled**
- The `onPressed` callback of the action button receives an **empty string**
- You must manage the text controller and state yourself
- Useful for adding multiple input methods (text, voice, file attachments)

### Basic Custom Composer

```dart
class MyCustomChat extends StatefulWidget {
  @override
  State<MyCustomChat> createState() => _MyCustomChatState();
}

class _MyCustomChatState extends State<MyCustomChat> {
  final TextEditingController _controller = TextEditingController();
  List<ChatMessage> _messages = [];

  @override
  void dispose() {
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return SfChat(
      messages: _messages,
      outgoingUser: '123-001',
      composer: ChatComposer.builder(
        builder: (context) {
          return Container(
            padding: EdgeInsets.symmetric(horizontal: 8, vertical: 4),
            child: Row(
              children: [
                Expanded(
                  child: TextField(
                    controller: _controller,
                    decoration: InputDecoration(
                      hintText: 'Type a message',
                      border: OutlineInputBorder(
                        borderRadius: BorderRadius.circular(24),
                      ),
                    ),
                  ),
                ),
              ],
            ),
          );
        },
      ),
      actionButton: ChatActionButton(
        onPressed: (String text) {
          // text will be empty when using builder
          final messageText = _controller.text;
          if (messageText.isNotEmpty) {
            setState(() {
              _messages.add(
                ChatMessage(
                  text: messageText,
                  time: DateTime.now(),
                  author: const ChatAuthor(
                    id: '123-001',
                    name: 'You',
                  ),
                ),
              );
              _controller.clear();
            });
          }
        },
      ),
    );
  }
}
```

### Advanced Custom Composer with Multiple Options

```dart
ChatComposer.builder(
  builder: (context) {
    return Container(
      padding: EdgeInsets.symmetric(horizontal: 8, vertical: 8),
      decoration: BoxDecoration(
        color: Colors.grey[100],
        borderRadius: BorderRadius.vertical(top: Radius.circular(16)),
      ),
      child: Row(
        children: [
          // Attachment button
          IconButton(
            icon: Icon(Icons.attach_file),
            onPressed: () {
              // Handle file attachment
              _showAttachmentOptions(context);
            },
            tooltip: 'Attach file',
          ),
          
          // Emoji button
          IconButton(
            icon: Icon(Icons.emoji_emotions_outlined),
            onPressed: () {
              // Show emoji picker
              _showEmojiPicker(context);
            },
            tooltip: 'Add emoji',
          ),
          
          // Text field
          Expanded(
            child: Container(
              decoration: BoxDecoration(
                color: Colors.white,
                borderRadius: BorderRadius.circular(24),
                border: Border.all(color: Colors.grey[300]!),
              ),
              child: TextField(
                controller: _controller,
                minLines: 1,
                maxLines: 5,
                decoration: InputDecoration(
                  hintText: 'Message',
                  hintStyle: TextStyle(color: Colors.grey[500]),
                  border: InputBorder.none,
                  contentPadding: EdgeInsets.symmetric(
                    horizontal: 16,
                    vertical: 8,
                  ),
                ),
              ),
            ),
          ),
          
          // Voice button
          IconButton(
            icon: Icon(Icons.mic),
            onPressed: () {
              // Handle voice input
              _startVoiceRecording();
            },
            tooltip: 'Voice message',
          ),
        ],
      ),
    );
  },
)
```

### Custom Composer for AIAssistView

```dart
AssistComposer.builder(
  builder: (context) {
    return Container(
      margin: EdgeInsets.all(12),
      padding: EdgeInsets.symmetric(horizontal: 12, vertical: 8),
      decoration: BoxDecoration(
        color: Colors.purple[50],
        borderRadius: BorderRadius.circular(28),
        border: Border.all(color: Colors.purple[200]!),
      ),
      child: Row(
        children: [
          Icon(Icons.smart_toy, color: Colors.purple),
          SizedBox(width: 12),
          Expanded(
            child: TextField(
              controller: _controller,
              maxLines: 3,
              minLines: 1,
              style: TextStyle(fontSize: 15),
              decoration: InputDecoration(
                hintText: 'Ask AI anything...',
                hintStyle: TextStyle(
                  color: Colors.purple[300],
                  fontStyle: FontStyle.italic,
                ),
                border: InputBorder.none,
              ),
            ),
          ),
          SizedBox(width: 8),
          IconButton(
            icon: Icon(Icons.image, color: Colors.purple),
            onPressed: () {
              // Handle image upload for AI analysis
            },
            tooltip: 'Upload image',
          ),
        ],
      ),
    );
  },
)
```

### Managing Custom Composer State

When using a custom composer builder, remember to:

1. **Create a TextEditingController**
```dart
final TextEditingController _controller = TextEditingController();
```

2. **Dispose the controller**
```dart
@override
void dispose() {
  _controller.dispose();
  super.dispose();
}
```

3. **Clear the field after sending**
```dart
actionButton: ChatActionButton(
  onPressed: (String _) {
    final text = _controller.text;
    if (text.isNotEmpty) {
      _controller.clear();
      // Add message and update state
    }
  },
)
```

4. **Handle focus management if needed**
```dart
final FocusNode _focusNode = FocusNode();

TextField(
  controller: _controller,
  focusNode: _focusNode,
  // ...
)

// Request focus after sending
_controller.clear();
_focusNode.requestFocus();
```

The custom composer builder provides complete flexibility to create rich input experiences tailored to your app's specific needs.
