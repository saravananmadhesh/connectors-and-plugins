# Time Breaks and Timestamps Configuration

## Table of Contents
- [Overview](#overview)
- [Time Breaks](#time-breaks)
- [Timestamps](#timestamps)
- [Date and Time Formatting](#date-and-time-formatting)
- [Combined Usage](#combined-usage)
- [Best Practices](#best-practices)

---

## Overview

The Chat UI control provides two complementary features for displaying time-related information:
- **Time Breaks**: Date-based separators between message groups
- **Timestamps**: Individual message send times

These features help users track conversation chronology and improve message organization.

---

## Time Breaks

### showTimeBreak Property

Use the `showTimeBreak` property to display date-wise separations between messages. This groups messages by day and improves readability.

**Property**: `showTimeBreak: boolean`  
**Default**: `false`

### Enable Time Breaks

```typescript
import { ChatUI, UserModel, MessageModel } from '@syncfusion/ej2-interactive-chat';
import { enableRipple } from '@syncfusion/ej2-base';

enableRipple(true);

let currentUserModel: UserModel = {
    id: "user1",
    user: "Albert"
};

let michaleUserModel: UserModel = {
    id: "user2",
    user: "Michale Suyama"
};

let chatMessages: MessageModel[] = [
    {
        author: currentUserModel,
        text: "Hi Michale, are we on track for the deadline?",
        timestamp: new Date("December 25, 2024 7:30")
    },
    {
        author: michaleUserModel,
        text: "Yes, the design phase is complete.",
        timestamp: new Date("December 25, 2024 8:00")
    },
    {
        author: currentUserModel,
        text: "I'll review it and send feedback by today.",
        timestamp: new Date("December 25, 2024 11:00")
    }
];

// Initializes the Chat UI control
let chatUI: ChatUI = new ChatUI({
    messages: chatMessages,
    user: currentUserModel,
    showTimeBreak: true
});

// Render initialized Chat UI.
chatUI.appendTo('#showTimeBreak');
```

### How Time Breaks Work

Time breaks automatically:
1. Group messages by date
2. Insert separators when the date changes
3. Display formatted date labels between groups

Example conversation flow:
```
─── December 25, 2024 ───
Message at 7:30 AM
Message at 8:00 AM
Message at 11:00 AM

─── December 26, 2024 ───
Message at 9:00 AM
Message at 10:30 AM
```

### Time Break with Multiple Days

```typescript
let chatMessages: MessageModel[] = [
    {
        author: currentUserModel,
        text: "Good morning!",
        timestamp: new Date("December 24, 2024 9:00")
    },
    {
        author: michaleUserModel,
        text: "Morning! Ready for the meeting?",
        timestamp: new Date("December 24, 2024 9:15")
    },
    {
        author: currentUserModel,
        text: "Starting the presentation now.",
        timestamp: new Date("December 25, 2024 14:00")
    },
    {
        author: michaleUserModel,
        text: "Great session yesterday!",
        timestamp: new Date("December 26, 2024 10:00")
    }
];

let chatUI: ChatUI = new ChatUI({
    messages: chatMessages,
    user: currentUserModel,
    showTimeBreak: true  // Will show 3 date separators
});
```

---

## Timestamps

### showTimeStamp Property

Use the `showTimeStamp` property to display individual message send times. Each message shows when it was sent.

**Property**: `showTimeStamp: boolean`  
**Default**: `true`

### Enable/Disable Timestamps

```typescript
import { ChatUI, UserModel, MessageModel } from '@syncfusion/ej2-interactive-chat';

let currentUserModel: UserModel = {
    id: "user1",
    user: "Albert"
};

let michaleUserModel: UserModel = {
    id: "user2",
    user: "Michale Suyama"
};

let chatMessages: MessageModel[] = [
    {
        author: currentUserModel,
        text: "Hi Michale, are we on track for the deadline?",
        timestamp: new Date("December 25, 2024 7:30")
    },
    {
        author: michaleUserModel,
        text: "Yes, the design phase is complete.",
        timestamp: new Date("December 25, 2024 8:00")
    },
    {
        author: currentUserModel,
        text: "I'll review it and send feedback by today.",
        timestamp: new Date("December 25, 2024 11:00")
    }
];

// Disable timestamps
let chatUI: ChatUI = new ChatUI({
    messages: chatMessages,
    user: currentUserModel,
    showTimeStamp: false  // Hides all timestamps
});

chatUI.appendTo('#showTimeStamp');
```

### Timestamp Display

When enabled, timestamps appear:
- Below or beside each message bubble
- In the format specified by `timeStampFormat`
- Automatically formatted based on locale

---

## Date and Time Formatting

### timeStampFormat Property

Use the `timeStampFormat` property to control how timestamps are displayed globally across all messages.

**Property**: `timeStampFormat: string`  
**Default**: `"dd/MM/yyyy hh:mm a"`

### Common Format Patterns

| Pattern | Description | Example Output |
|---------|-------------|----------------|
| `dd/MM/yyyy hh:mm a` | Day/Month/Year with 12-hour time | `25/12/2024 07:30 AM` |
| `MM/dd/yyyy hh:mm a` | Month/Day/Year with 12-hour time | `12/25/2024 07:30 AM` |
| `yyyy-MM-dd HH:mm` | ISO format with 24-hour time | `2024-12-25 07:30` |
| `MMMM dd, yyyy hh:mm a` | Full month name | `December 25, 2024 07:30 AM` |
| `MMM dd hh:mm a` | Short month name | `Dec 25 07:30 AM` |
| `hh:mm a` | Time only | `07:30 AM` |
| `HH:mm` | 24-hour time only | `07:30` |

### Format Pattern Reference

| Symbol | Description | Example |
|--------|-------------|---------|
| `d` | Day (1-31) | `5` |
| `dd` | Day with leading zero (01-31) | `05` |
| `M` | Month (1-12) | `3` |
| `MM` | Month with leading zero (01-12) | `03` |
| `MMM` | Short month name | `Mar` |
| `MMMM` | Full month name | `March` |
| `yy` | Two-digit year | `24` |
| `yyyy` | Four-digit year | `2024` |
| `h` | Hour 12-hour format (1-12) | `7` |
| `hh` | Hour 12-hour with leading zero | `07` |
| `H` | Hour 24-hour format (0-23) | `19` |
| `HH` | Hour 24-hour with leading zero | `19` |
| `m` | Minute (0-59) | `5` |
| `mm` | Minute with leading zero | `05` |
| `s` | Second (0-59) | `8` |
| `ss` | Second with leading zero | `08` |
| `a` | AM/PM marker | `AM` |

### Set Global Timestamp Format

```typescript
import { ChatUI, UserModel, MessageModel } from '@syncfusion/ej2-interactive-chat';

let currentUserModel: UserModel = {
    id: "user1",
    user: "Albert"
};

let michaleUserModel: UserModel = {
    id: "user2",
    user: "Michale Suyama"
};

let chatMessages: MessageModel[] = [
    {
        author: currentUserModel,
        text: "Hi Michale, are we on track for the deadline?"
    },
    {
        author: michaleUserModel,
        text: "Yes, the design phase is complete."
    },
    {
        author: currentUserModel,
        text: "I'll review it and send feedback by today."
    }
];

// Use custom format for all messages
let chatUI: ChatUI = new ChatUI({
    messages: chatMessages,
    user: currentUserModel,
    timeStampFormat: 'MMMM hh:mm a'  // "December 07:30 AM"
});

chatUI.appendTo('#timeStampFormat');
```

### Regional Formats

US Format:
```typescript
timeStampFormat: 'MM/dd/yyyy hh:mm a'  // 12/25/2024 07:30 AM
```

European Format:
```typescript
timeStampFormat: 'dd/MM/yyyy HH:mm'  // 25/12/2024 07:30
```

ISO 8601 Format:
```typescript
timeStampFormat: 'yyyy-MM-dd HH:mm:ss'  // 2024-12-25 07:30:00
```

Conversational Format:
```typescript
timeStampFormat: 'MMM dd, hh:mm a'  // Dec 25, 07:30 AM
```

### Per-Message Timestamp Format

Override the global format for specific messages using `timeStampFormat` in MessageModel:

```typescript
let chatMessages: MessageModel[] = [
    {
        author: currentUserModel,
        text: "Regular message",
        timestamp: new Date("December 25, 2024 7:30")
        // Uses global timeStampFormat
    },
    {
        author: michaleUserModel,
        text: "Message with custom format",
        timestamp: new Date("December 25, 2024 8:00"),
        timeStampFormat: 'hh:mm a'  // Only shows time: "08:00 AM"
    }
];

let chatUI: ChatUI = new ChatUI({
    messages: chatMessages,
    user: currentUserModel,
    timeStampFormat: 'dd/MM/yyyy hh:mm a'  // Global format
});
```

---

## Combined Usage

### Time Breaks + Timestamps

Use both features together for comprehensive time information:

```typescript
import { ChatUI, UserModel, MessageModel } from '@syncfusion/ej2-interactive-chat';

let currentUserModel: UserModel = {
    id: "user1",
    user: "Albert"
};

let michaleUserModel: UserModel = {
    id: "user2",
    user: "Michale Suyama"
};

let chatMessages: MessageModel[] = [
    {
        author: currentUserModel,
        text: "Good morning!",
        timestamp: new Date("December 24, 2024 9:00")
    },
    {
        author: michaleUserModel,
        text: "Morning! Ready for the meeting?",
        timestamp: new Date("December 24, 2024 9:15")
    },
    {
        author: currentUserModel,
        text: "Yes, starting now.",
        timestamp: new Date("December 24, 2024 9:20")
    },
    {
        author: michaleUserModel,
        text: "How did the presentation go?",
        timestamp: new Date("December 25, 2024 14:00")
    },
    {
        author: currentUserModel,
        text: "It went great! Thanks for asking.",
        timestamp: new Date("December 25, 2024 14:30")
    }
];

let chatUI: ChatUI = new ChatUI({
    messages: chatMessages,
    user: currentUserModel,
    showTimeBreak: true,        // Shows date separators
    showTimeStamp: true,         // Shows individual message times
    timeStampFormat: 'hh:mm a'  // Shows only time (date in break)
});

chatUI.appendTo('#combined');
```

Output structure:
```
─── December 24, 2024 ───
Good morning!
  09:00 AM

Morning! Ready for the meeting?
  09:15 AM

Yes, starting now.
  09:20 AM

─── December 25, 2024 ───
How did the presentation go?
  02:00 PM

It went great! Thanks for asking.
  02:30 PM
```

### Custom Time Break Template

Combine `showTimeBreak` with `timeBreakTemplate` for custom separators:

```typescript
let chatUI: ChatUI = new ChatUI({
    messages: chatMessages,
    user: currentUserModel,
    showTimeBreak: true,
    showTimeStamp: true,
    timeStampFormat: 'hh:mm a',
    timeBreakTemplate: (context: any) => {
        const date = new Date(context.messageDate);
        const today = new Date();
        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);
        
        let displayText: string;
        
        if (date.toDateString() === today.toDateString()) {
            displayText = "Today";
        } else if (date.toDateString() === yesterday.toDateString()) {
            displayText = "Yesterday";
        } else {
            displayText = date.toLocaleDateString('en-US', {
                weekday: 'long',
                month: 'long',
                day: 'numeric',
                year: 'numeric'
            });
        }
        
        return `<div class="custom-timebreak">${displayText}</div>`;
    }
});
```

---

## Best Practices

### When to Use Time Breaks

✅ **Use Time Breaks When**:
- Conversations span multiple days
- Long message histories need organization
- Users need to find messages by date
- Improving readability is a priority

❌ **Avoid Time Breaks When**:
- All messages are from the same day
- Short, real-time conversations
- Space is limited (mobile views)
- Minimalist UI is desired

### When to Show Timestamps

✅ **Show Timestamps When**:
- Exact timing is important
- Message order matters
- Professional or business context
- Debugging or audit trails needed

❌ **Hide Timestamps When**:
- Casual, informal chats
- Clean, minimal UI is preferred
- Screen space is limited
- Time is less relevant than content

### Format Selection Guidelines

1. **Match your audience**:
   - US users: `MM/dd/yyyy`
   - European users: `dd/MM/yyyy`
   - International: `yyyy-MM-dd`

2. **Consider context**:
   - Same-day chats: `hh:mm a` (time only)
   - Multi-day: `MMM dd, hh:mm a`
   - Historical: `dd/MM/yyyy hh:mm a`

3. **Be consistent**:
   - Use same format throughout app
   - Match system/browser locale
   - Follow platform conventions

### Performance Tips

1. **Include timestamps in MessageModel**: Always set `timestamp` property for accurate sorting and display

2. **Use ISO dates**: Store dates in ISO 8601 format for consistency
   ```typescript
   timestamp: new Date("2024-12-25T07:30:00Z")
   ```

3. **Cache date calculations**: For custom templates, calculate once and reuse

4. **Test across timezones**: Ensure proper display for users in different zones

### Accessibility

1. **Semantic markup**: Use appropriate HTML elements in templates
   ```typescript
   return `<time datetime="${date.toISOString()}">${formatted}</time>`;
   ```

2. **Screen reader support**: Include descriptive text
   ```typescript
   return `<div role="separator" aria-label="Messages from ${formattedDate}">
       ${formattedDate}
   </div>`;
   ```

3. **Visible focus**: Ensure time break separators don't interfere with navigation

### Example: Complete Configuration

```typescript
import { ChatUI, UserModel, MessageModel } from '@syncfusion/ej2-interactive-chat';

let currentUserModel: UserModel = {
    id: "user1",
    user: "Albert"
};

let michaleUserModel: UserModel = {
    id: "user2",
    user: "Michale Suyama"
};

// Helper function for relative time display
function getRelativeTimeBreak(date: Date): string {
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    
    if (date.toDateString() === today.toDateString()) {
        return "Today";
    } else if (date.toDateString() === yesterday.toDateString()) {
        return "Yesterday";
    } else {
        return date.toLocaleDateString('en-US', {
            weekday: 'short',
            month: 'short',
            day: 'numeric'
        });
    }
}

let chatMessages: MessageModel[] = [
    {
        author: currentUserModel,
        text: "Project kickoff meeting",
        timestamp: new Date("December 23, 2024 10:00")
    },
    {
        author: michaleUserModel,
        text: "Completed initial design",
        timestamp: new Date("December 24, 2024 15:30")
    },
    {
        author: currentUserModel,
        text: "Review looks good!",
        timestamp: new Date("December 25, 2024 9:00")
    }
];

let chatUI: ChatUI = new ChatUI({
    user: currentUserModel,
    messages: chatMessages,
    
    // Enable both features
    showTimeBreak: true,
    showTimeStamp: true,
    
    // Simple time format (date shown in break)
    timeStampFormat: 'hh:mm a',
    
    // Custom time break template
    timeBreakTemplate: (context: any) => {
        const date = new Date(context.messageDate);
        const display = getRelativeTimeBreak(date);
        
        return `
            <div class="time-separator">
                <span class="time-separator-line"></span>
                <span class="time-separator-text">${display}</span>
                <span class="time-separator-line"></span>
            </div>
        `;
    }
});

chatUI.appendTo('#chat');
```

CSS for custom time break:
```css
.time-separator {
    display: flex;
    align-items: center;
    margin: 16px 0;
    gap: 12px;
}

.time-separator-line {
    flex: 1;
    height: 1px;
    background-color: #e0e0e0;
}

.time-separator-text {
    font-size: 12px;
    font-weight: 600;
    color: #666;
    padding: 4px 12px;
    background-color: #f5f5f5;
    border-radius: 12px;
}
```
