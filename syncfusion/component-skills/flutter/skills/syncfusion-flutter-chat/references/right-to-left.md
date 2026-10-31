# Right-to-Left (RTL) Support

## Overview

Both `SfChat` and `SfAIAssistView` fully support right-to-left (RTL) languages such as Arabic, Hebrew, Persian, and Urdu. When RTL mode is enabled, the entire layout automatically mirrors to provide a natural reading and interaction experience for RTL language users.

RTL support is implemented using Flutter's `Directionality` widget or by setting the app-level locale.

## Enabling RTL

### Using Directionality Widget

Wrap your chat widget with the `Directionality` widget and set `textDirection` to `TextDirection.rtl`:

```dart
Directionality(
  textDirection: TextDirection.rtl,
  child: SfChat(
    messages: _messages,
    outgoingUser: '123-001',
  ),
)
```

For AIAssistView:

```dart
Directionality(
  textDirection: TextDirection.rtl,
  child: SfAIAssistView(
    messages: _messages,
  ),
)
```

### Using MaterialApp Locale

Set the app-level locale to automatically enable RTL for supported languages:

```dart
MaterialApp(
  locale: Locale('ar'), // Arabic
  localizationsDelegates: [
    GlobalMaterialLocalizations.delegate,
    GlobalWidgetsLocalizations.delegate,
    GlobalCupertinoLocalizations.delegate,
  ],
  supportedLocales: [
    Locale('en', 'US'),
    Locale('ar'), // Arabic
    Locale('he'), // Hebrew
    Locale('fa'), // Persian
    Locale('ur'), // Urdu
  ],
  home: ChatScreen(),
)
```

### Conditional RTL Based on Language

Dynamically switch between LTR and RTL based on the selected language:

```dart
class ChatScreen extends StatefulWidget {
  @override
  _ChatScreenState createState() => _ChatScreenState();
}

class _ChatScreenState extends State<ChatScreen> {
  Locale _currentLocale = Locale('en');
  
  bool get isRTL {
    return ['ar', 'he', 'fa', 'ur'].contains(_currentLocale.languageCode);
  }
  
  @override
  Widget build(BuildContext context) {
    return Directionality(
      textDirection: isRTL ? TextDirection.rtl : TextDirection.ltr,
      child: Scaffold(
        appBar: AppBar(
          title: Text('Chat'),
          actions: [
            PopupMenuButton<String>(
              onSelected: (languageCode) {
                setState(() {
                  _currentLocale = Locale(languageCode);
                });
              },
              itemBuilder: (context) => [
                PopupMenuItem(value: 'en', child: Text('English')),
                PopupMenuItem(value: 'ar', child: Text('العربية')),
                PopupMenuItem(value: 'he', child: Text('עברית')),
              ],
            ),
          ],
        ),
        body: SfChat(
          messages: _messages,
          outgoingUser: '123-001',
        ),
      ),
    );
  }
}
```

## RTL Layout Behavior

### For Chat (SfChat)

When RTL is enabled in `SfChat`:

1. **Message Alignment**
   - Outgoing messages align to the left (instead of right in LTR)
   - Incoming messages align to the right (instead of left in LTR)

2. **Avatars**
   - Incoming message avatars appear on the left side
   - Outgoing message avatars appear on the right side

3. **Composer**
   - Text input direction changes to RTL
   - Action button appears on the left side (instead of right in LTR)
   - Prefix/suffix icons swap positions

4. **Message Bubbles**
   - Message bubble tails point in the opposite direction
   - Padding and margins mirror appropriately

### For AIAssistView (SfAIAssistView)

When RTL is enabled in `SfAIAssistView`:

1. **Message Alignment**
   - Request messages (user) align to the left
   - Response messages (AI) align to the right

2. **Avatars**
   - Response avatars appear on the left side
   - Request avatars appear on the right side

3. **Toolbar Items**
   - Toolbar buttons on responses align from left to right
   - Icon positions mirror appropriately

4. **Composer**
   - Text input direction changes to RTL
   - Action button appears on the left side
   - All input decorations mirror

## Complete RTL Examples

### Chat - Arabic Support

```dart
import 'package:flutter/material.dart';
import 'package:syncfusion_flutter_chat/chat.dart';
import 'package:flutter_localizations/flutter_localizations.dart';

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      locale: Locale('ar'),
      localizationsDelegates: [
        GlobalMaterialLocalizations.delegate,
        GlobalWidgetsLocalizations.delegate,
        GlobalCupertinoLocalizations.delegate,
      ],
      supportedLocales: [
        Locale('en', 'US'),
        Locale('ar'),
      ],
      home: ArabicChatScreen(),
    );
  }
}

class ArabicChatScreen extends StatefulWidget {
  @override
  _ArabicChatScreenState createState() => _ArabicChatScreenState();
}

class _ArabicChatScreenState extends State<ArabicChatScreen> {
  List<ChatMessage> _messages = <ChatMessage>[
    ChatMessage(
      text: 'مرحبا! كيف يمكنني مساعدتك اليوم؟',
      time: DateTime.now(),
      author: ChatAuthor(
        id: 'support-001',
        name: 'الدعم',
      ),
    ),
  ];

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('محادثة'),
      ),
      body: Directionality(
        textDirection: TextDirection.rtl,
        child: SfChat(
          messages: _messages,
          outgoingUser: '123-001',
          composer: ChatComposer(
            decoration: InputDecoration(
              hintText: 'اكتب رسالة...',
            ),
          ),
          actionButton: ChatActionButton(
            onPressed: (String newMessage) {
              setState(() {
                _messages.add(ChatMessage(
                  text: newMessage,
                  time: DateTime.now(),
                  author: ChatAuthor(
                    id: '123-001',
                    name: 'أنت',
                  ),
                ));
              });
            },
          ),
        ),
      ),
    );
  }
}
```

### AIAssistView - Hebrew Support

```dart
import 'package:flutter/material.dart';
import 'package:syncfusion_flutter_chat/assist_view.dart';

class HebrewAIAssistScreen extends StatefulWidget {
  @override
  _HebrewAIAssistScreenState createState() => _HebrewAIAssistScreenState();
}

class _HebrewAIAssistScreenState extends State<HebrewAIAssistScreen> {
  List<AssistMessage> _messages = <AssistMessage>[
    AssistMessage.response(
      data: 'שלום! איך אני יכול לעזור לך היום?',
      time: DateTime.now(),
      author: AssistMessageAuthor(
        id: 'ai-001',
        name: 'עוזר AI',
      ),
    ),
  ];

  @override
  Widget build(BuildContext context) {
    return Directionality(
      textDirection: TextDirection.rtl,
      child: Scaffold(
        appBar: AppBar(
          title: Text('עוזר AI'),
        ),
        body: SfAIAssistView(
          messages: _messages,
          composer: AssistComposer(
            decoration: InputDecoration(
              hintText: 'שאל משהו...',
            ),
          ),
          actionButton: AssistActionButton(
            onPressed: (String newMessage) {
              setState(() {
                _messages.add(AssistMessage.request(
                  data: newMessage,
                  time: DateTime.now(),
                ));
                
                // Simulate AI response
                Future.delayed(Duration(seconds: 1), () {
                  setState(() {
                    _messages.add(AssistMessage.response(
                      data: 'תשובה לשאלה: $newMessage',
                      time: DateTime.now(),
                      author: AssistMessageAuthor(
                        id: 'ai-001',
                        name: 'עוזר AI',
                      ),
                    ));
                  });
                });
              });
            },
          ),
        ),
      ),
    );
  }
}
```

## RTL with Custom Placeholders

Placeholders also respect RTL layout:

```dart
Directionality(
  textDirection: TextDirection.rtl,
  child: SfChat(
    messages: _messages,
    outgoingUser: '123-001',
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
            SizedBox(height: 16),
            Text(
              'ابدأ محادثة!',
              style: TextStyle(
                fontSize: 20,
                fontWeight: FontWeight.bold,
              ),
            ),
            SizedBox(height: 8),
            Text(
              'أرسل رسالة للبدء',
              style: TextStyle(
                fontSize: 14,
                color: Colors.grey[600],
              ),
            ),
          ],
        ),
      );
    },
  ),
)
```

## RTL with Custom Composers

Custom composer decorations adapt to RTL:

```dart
Directionality(
  textDirection: TextDirection.rtl,
  child: SfChat(
    messages: _messages,
    outgoingUser: '123-001',
    composer: ChatComposer(
      decoration: InputDecoration(
        hintText: 'اكتب رسالة...',
        filled: true,
        fillColor: Colors.grey[100],
        border: OutlineInputBorder(
          borderRadius: BorderRadius.circular(24),
          borderSide: BorderSide.none,
        ),
        prefixIcon: Icon(Icons.emoji_emotions_outlined), // Will appear on right
        suffixIcon: Icon(Icons.attach_file), // Will appear on left
      ),
    ),
  ),
)
```

## Testing RTL

### Quick Test Toggle

Create a toggle to easily test RTL vs LTR during development:

```dart
class _ChatScreenState extends State<ChatScreen> {
  bool _isRTL = false;

  @override
  Widget build(BuildContext context) {
    return Directionality(
      textDirection: _isRTL ? TextDirection.rtl : TextDirection.ltr,
      child: Scaffold(
        appBar: AppBar(
          title: Text('Chat'),
          actions: [
            IconButton(
              icon: Icon(Icons.format_textdirection_r_to_l),
              onPressed: () {
                setState(() {
                  _isRTL = !_isRTL;
                });
              },
              tooltip: 'Toggle RTL',
            ),
          ],
        ),
        body: SfChat(
          messages: _messages,
          outgoingUser: '123-001',
        ),
      ),
    );
  }
}
```

## Common RTL Languages

| Language | Locale Code | Name in Native Script |
|----------|-------------|----------------------|
| Arabic | `ar` | العربية |
| Hebrew | `he` | עברית |
| Persian (Farsi) | `fa` | فارسی |
| Urdu | `ur` | اردو |
| Pashto | `ps` | پښتو |
| Kurdish | `ku` | کوردی |
| Sindhi | `sd` | سنڌي |

## Best Practices

1. **Test Thoroughly**: Always test with actual RTL text, not just by enabling RTL mode with English text.

2. **Use Native Speakers**: Have native RTL language speakers review the UI for natural flow.

3. **Avoid Hardcoded Directions**: Don't use specific alignment like `Alignment.left` or `Alignment.right`. Use `AlignmentDirectional.start` and `AlignmentDirectional.end` instead.

4. **Handle Mixed Content**: When mixing RTL and LTR text (e.g., URLs, numbers), ensure proper directionality markers are used.

5. **Icon Direction**: Some icons may need to be flipped for RTL (e.g., arrows), but others should remain the same (e.g., play buttons).

6. **Test Edge Cases**: Test with long messages, multiple avatars, and various message types.

## Troubleshooting

### Issue: Text Appears Correctly but Layout is Wrong

Make sure the `Directionality` widget wraps the entire chat widget, not just part of it:

```dart
// ✅ Correct
Directionality(
  textDirection: TextDirection.rtl,
  child: SfChat(...),
)

// ❌ Incorrect
SfChat(
  composer: Directionality(
    textDirection: TextDirection.rtl,
    child: ChatComposer(...),
  ),
)
```

### Issue: Some Elements Don't Mirror

Ensure you're using the latest version of the `syncfusion_flutter_chat` package, as RTL support may have been improved in recent versions.

### Issue: Mixed LTR/RTL Text

For messages containing both LTR and RTL text, Flutter's text rendering handles this automatically, but you can use Unicode bidirectional formatting characters if needed.

By properly implementing RTL support, you can create inclusive chat and AI assistant experiences for users worldwide.
