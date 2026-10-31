# Mention Integration

## Table of Contents
- [Overview](#overview)
- [Configure Mention Users](#configure-mention-users)
- [Mention Trigger Character](#mention-trigger-character)
- [UserModel Configuration](#usermodel-configuration)
- [Predefined Mentions in Messages](#predefined-mentions-in-messages)
- [Mention Popup and Filtering](#mention-popup-and-filtering)
- [MentionSelect Event](#mentionselect-event)
- [Complete Examples](#complete-examples)
- [Best Practices](#best-practices)

---

## Overview

The Syncfusion Chat UI allows users to mention others in messages using a trigger character (default: `@`). When users type the trigger character, a dropdown appears showing available users to mention. This feature enables targeted communication and notifications within chat conversations.

**Key Features**:
- Configurable trigger character
- User list for mentions
- Autocomplete dropdown
- Predefined mentions in messages
- Mention select event handling
- Placeholder-based mention rendering

---

## Configure Mention Users

### mentionUsers Property

Define an array of users available for mentioning using the `mentionUsers` property.

**Property**: `mentionUsers: UserModel[]`

### Basic Example

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

let customUserModel: UserModel = {
    id: "custom-user",
    user: "Reena"
};

let chatMessages: MessageModel[] = [
    {
        author: currentUserModel,
        text: "Want to get coffee tomorrow?"
    },
    {
        author: michaleUserModel,
        text: "Sure! What time?"
    },
    {
        author: currentUserModel,
        text: "{0} How about 10 AM?",
        mentionUsers: [michaleUserModel]
    }
];

// Initializes the Chat UI control
let chatUI: ChatUI = new ChatUI({
    headerText: "TeamSync Professionals",
    messages: chatMessages,
    mentionUsers: [currentUserModel, customUserModel],
    user: currentUserModel
});

// Render initialized Chat UI.
chatUI.appendTo('#mention-user');
```

### How It Works

1. User types the trigger character (`@` by default)
2. Mention dropdown appears showing users from `mentionUsers` array
3. User selects from the list or continues typing to filter
4. Selected user is inserted into the message
5. Message is sent with `mentionUsers` array populated

---

## Mention Trigger Character

### mentionTriggerChar Property

Customize the character that triggers the mention popup.

**Property**: `mentionTriggerChar: string`  
**Default**: `"@"`

### Custom Trigger Example

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
        text: "Want to get coffee tomorrow?"
    },
    {
        author: michaleUserModel,
        text: "Sure! What time?"
    },
    {
        author: currentUserModel,
        text: "{0} How about 10 AM?",
        mentionUsers: [michaleUserModel]
    }
];

// Initializes the Chat UI control
let chatUI: ChatUI = new ChatUI({
    headerText: "TeamSync Professionals",
    messages: chatMessages,
    mentionTriggerChar: '/',  // Use '/' instead of '@'
    mentionUsers: [currentUserModel, michaleUserModel],
    user: currentUserModel
});

// Render initialized Chat UI.
chatUI.appendTo('#mention-trigger');
```

### Common Trigger Characters

| Character | Use Case |
|-----------|----------|
| `@` | Default, most common (email-style) |
| `/` | Slack-style commands |
| `#` | Hashtag-style mentions |
| `~` | Alternative mention character |

### Trigger Character Behavior

- Must be a single character
- Triggers popup when typed in message input
- Can be any valid string character
- Should not conflict with common punctuation in messages

---

## UserModel Configuration

### UserModel Interface

Complete interface definition for users:

```typescript
interface UserModel {
    id: string;              // Unique identifier (required)
    user: string;            // Display name (required)
    avatarUrl?: string;      // Avatar image URL
    avatarBgColor?: string;  // Background color for avatar initials
    cssClass?: string;       // Custom CSS class
}
```

### Creating User Models

**Basic User**:
```typescript
let user: UserModel = {
    id: "user1",
    user: "Albert"
};
```

**User with Avatar**:
```typescript
let userWithAvatar: UserModel = {
    id: "user2",
    user: "Michale Suyama",
    avatarUrl: "https://example.com/avatars/michale.png"
};
```

**User with Avatar Background**:
```typescript
let userWithColor: UserModel = {
    id: "user3",
    user: "Janet Leverling",
    avatarBgColor: "#f44336"
};
```

**User with Custom Styling**:
```typescript
let userWithStyle: UserModel = {
    id: "user4",
    user: "Andrew Fuller",
    avatarBgColor: "#4CAF50",
    cssClass: "vip-user"
};
```

### Building Mention User List

```typescript
// Array of users available for mentions
let mentionUsers: UserModel[] = [
    {
        id: "user1",
        user: "Albert",
        avatarBgColor: "#3f51b5"
    },
    {
        id: "user2",
        user: "Michale Suyama",
        avatarUrl: "https://example.com/avatars/michale.png"
    },
    {
        id: "user3",
        user: "Janet Leverling",
        avatarBgColor: "#e91e63"
    },
    {
        id: "user4",
        user: "Andrew Fuller",
        avatarBgColor: "#4CAF50"
    },
    {
        id: "user5",
        user: "Nancy Davolio",
        avatarBgColor: "#FF9800"
    }
];

let chatUI: ChatUI = new ChatUI({
    user: mentionUsers[0],
    mentionUsers: mentionUsers,
    headerText: "Team Chat"
});
```

---

## Predefined Mentions in Messages

### mentionUsers in MessageModel

Include predefined mentions in messages using the `mentionUsers` property of `MessageModel`.

**Property**: `MessageModel.mentionUsers: UserModel[]`

### Placeholder System

Use placeholders in the message text to reference mentioned users:
- `{0}` - First user in mentionUsers array
- `{1}` - Second user in mentionUsers array
- `{2}` - Third user in mentionUsers array
- And so on...

### Basic Example

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
        text: "Hi {0}, are we on track for the deadline?",
        mentionUsers: [michaleUserModel]
    },
    {
        author: michaleUserModel,
        text: "Yes {0}, the design phase is complete.",
        mentionUsers: [currentUserModel]
    },
    {
        author: currentUserModel,
        text: "I'll review it and send feedback by today."
    }
];

// Initializes the Chat UI control
let chatUI: ChatUI = new ChatUI({
    headerText: "TeamSync Professionals",
    messages: chatMessages,
    user: currentUserModel
});

// Render initialized Chat UI.
chatUI.appendTo('#mention-chat');
```

### Multiple Mentions

```typescript
let janetUserModel: UserModel = {
    id: "user3",
    user: "Janet Leverling"
};

let messageWithMultipleMentions: MessageModel = {
    author: currentUserModel,
    text: "Hey {0} and {1}, can you both review this document?",
    mentionUsers: [michaleUserModel, janetUserModel]
};
```

This displays as: "Hey @Michale Suyama and @Janet Leverling, can you both review this document?"

### Placeholder Index Rules

**Valid Placeholders**:
```typescript
text: "{0} and {1} need to see this",
mentionUsers: [user1, user2]
// ✓ Both {0} and {1} map correctly
```

**Invalid/Missing Placeholders**:
```typescript
// Missing index - shows literal text
text: "{5} please review",
mentionUsers: [user1, user2]
// ✗ {5} has no mapping, displays as "{5}"

// Negative index - shows literal text
text: "{-1} please review",
mentionUsers: [user1]
// ✗ Negative index, displays as "{-1}"
```

### Complex Example

```typescript
let chatMessages: MessageModel[] = [
    {
        author: currentUserModel,
        text: "Team meeting today at 2 PM"
    },
    {
        author: michaleUserModel,
        text: "{0}, should {1} and {2} join as well?",
        mentionUsers: [currentUserModel, janetUserModel, andrewUserModel]
    },
    {
        author: currentUserModel,
        text: "Yes {0}, please invite {1} and {2}",
        mentionUsers: [michaleUserModel, janetUserModel, andrewUserModel]
    }
];
```

---

## Mention Popup and Filtering

### Popup Behavior

When the trigger character is typed:

1. **Popup Appears**: Dropdown shows all users from `mentionUsers` array
2. **Filter as You Type**: Continue typing to filter the list
3. **Keyboard Navigation**: Use arrow keys to navigate, Enter to select
4. **Mouse Selection**: Click on a user to select
5. **Auto-close**: Popup closes on selection or Escape key

### Filtering Logic

The mention popup filters users based on:
- User display name (`user` property)
- Case-insensitive matching
- Substring matching anywhere in the name

**Example**:
- Type `@mich` → Shows "Michale Suyama"
- Type `@al` → Shows "Albert"
- Type `@an` → Shows "Janet Leverling", "Andrew Fuller"

### Keyboard Shortcuts

| Key | Action |
|-----|--------|
| `@` (or trigger char) | Open mention popup |
| `↑` `↓` | Navigate through user list |
| `Enter` | Select highlighted user |
| `Esc` | Close popup without selecting |
| `Backspace` | Remove trigger char, close popup |

---

## MentionSelect Event

### mentionSelect Event

Triggered when a user selects an item from the mention dropdown.

**Event**: `mentionSelect: (args: MentionSelectEventArgs) => void`

### MentionSelectEventArgs Interface

```typescript
interface MentionSelectEventArgs {
    cancel: boolean;          // Set to true to cancel selection
    event: MouseEvent | KeyboardEvent | TouchEvent;  // Native event (mouse, keyboard, or touch)
    isInteracted: boolean;    // True if user interaction triggered selection
    itemData: FieldSettingsModel;  // Selected item data from datasource
    name: string;             // Event name
}
```

### Basic Example

```typescript
import { ChatUI, MentionSelectEventArgs, UserModel } from '@syncfusion/ej2-interactive-chat';

let currentUserModel: UserModel = {
    id: "user1",
    user: "Albert"
};

let michaleUserModel: UserModel = {
    id: "user2",
    user: "Michale Suyama"
};

// Initializes the Chat UI control
let chatUI: ChatUI = new ChatUI({
    user: currentUserModel,
    mentionUsers: [currentUserModel, michaleUserModel],
    mentionSelect: (args: MentionSelectEventArgs) => {
        console.log('User mentioned:', args.itemData);
        console.log('Event type:', args.event.type);
        console.log('User interaction:', args.isInteracted);
        
        // Access selected item data
        const selectedData = args.itemData;
        
        // Your custom logic here
        // - Send notification
        // - Log mention
        // - Update UI
    }
});

chatUI.appendTo('#mentionSelect');
```

### Cancel Mention Selection

Prevent certain users from being mentioned:

```typescript
mentionSelect: (args: MentionSelectEventArgs) => {
    // Prevent mentioning specific user
    if (args.itemData.id === "restricted-user") {
        args.cancel = true;
        alert("This user cannot be mentioned");
    }
}
```

### Track Mentions

```typescript
let mentionCount = 0;

mentionSelect: (args: MentionSelectEventArgs) => {
    mentionCount++;
    console.log(`Total mentions: ${mentionCount}`);
    console.log(`Mentioned:`, args.itemData);
    
    // Send analytics
    // Track user engagement
    // Update mention statistics
}
```

### Conditional Logic

```typescript
mentionSelect: (args: MentionSelectEventArgs) => {
    const selectedData = args.itemData;
    
    // Check if user is online
    if (selectedData.status === 'offline') {
        const proceed = confirm(`${selectedData.user} is offline. Mention anyway?`);
        if (!proceed) {
            args.cancel = true;
        }
    }
    
    // VIP user notification
    if (selectedData.cssClass === 'vip-user') {
        console.log(`VIP user ${selectedData.user} was mentioned`);
        // Send priority notification
    }
}
```

---

## Complete Examples

### Example 1: Basic Mention Setup

```typescript
import { ChatUI, UserModel, MessageModel } from '@syncfusion/ej2-interactive-chat';

let currentUser: UserModel = {
    id: "user1",
    user: "Albert",
    avatarBgColor: "#3f51b5"
};

let teamMembers: UserModel[] = [
    currentUser,
    { id: "user2", user: "Michale Suyama", avatarBgColor: "#e91e63" },
    { id: "user3", user: "Janet Leverling", avatarBgColor: "#4CAF50" },
    { id: "user4", user: "Andrew Fuller", avatarBgColor: "#FF9800" }
];

let chatMessages: MessageModel[] = [
    {
        author: currentUser,
        text: "Hey team, we have a new project starting"
    },
    {
        author: teamMembers[1],
        text: "{0}, what's the timeline?",
        mentionUsers: [currentUser]
    },
    {
        author: currentUser,
        text: "We need to finish by Friday. {0} and {1}, can you help?",
        mentionUsers: [teamMembers[2], teamMembers[3]]
    }
];

let chatUI: ChatUI = new ChatUI({
    user: currentUser,
    mentionUsers: teamMembers,
    messages: chatMessages,
    headerText: "Team Chat"
});

chatUI.appendTo('#teamChat');
```

### Example 2: Custom Trigger with Event Handling

```typescript
import { ChatUI, UserModel, MentionSelectEventArgs } from '@syncfusion/ej2-interactive-chat';

let currentUser: UserModel = {
    id: "user1",
    user: "Albert"
};

let users: UserModel[] = [
    currentUser,
    { id: "user2", user: "Michale Suyama" },
    { id: "user3", user: "Janet Leverling" }
];

let mentionLog: { user: string, timestamp: Date }[] = [];

let chatUI: ChatUI = new ChatUI({
    user: currentUser,
    mentionUsers: users,
    mentionTriggerChar: '/',
    headerText: "Developer Chat",
    
    mentionSelect: (args: MentionSelectEventArgs) => {
        // Log the mention
        mentionLog.push({
            user: args.item.user,
            timestamp: new Date()
        });
        
        console.log(`Mention log:`, mentionLog);
        
        // Send notification to mentioned user
        console.log(`Notification sent to ${args.item.user}`);
    }
});

chatUI.appendTo('#devChat');
```

### Example 3: Advanced Mention Configuration

```typescript
import { ChatUI, UserModel, MessageModel, MentionSelectEventArgs } from '@syncfusion/ej2-interactive-chat';

// Define user roles
interface ExtendedUserModel extends UserModel {
    role?: string;
    status?: 'online' | 'offline' | 'busy';
}

let currentUser: ExtendedUserModel = {
    id: "user1",
    user: "Albert",
    role: "developer",
    status: "online",
    avatarBgColor: "#3f51b5"
};

let teamMembers: ExtendedUserModel[] = [
    currentUser,
    {
        id: "user2",
        user: "Michale Suyama",
        role: "manager",
        status: "online",
        avatarBgColor: "#e91e63"
    },
    {
        id: "user3",
        user: "Janet Leverling",
        role: "designer",
        status: "busy",
        avatarBgColor: "#4CAF50"
    },
    {
        id: "user4",
        user: "Andrew Fuller",
        role: "developer",
        status: "offline",
        avatarBgColor: "#FF9800"
    }
];

let chatMessages: MessageModel[] = [
    {
        author: currentUser,
        text: "Starting the code review"
    },
    {
        author: teamMembers[1],
        text: "{0}, please review the pull request",
        mentionUsers: [currentUser]
    }
];

let chatUI: ChatUI = new ChatUI({
    user: currentUser,
    mentionUsers: teamMembers,
    messages: chatMessages,
    headerText: "Code Review Chat",
    
    mentionSelect: (args: MentionSelectEventArgs) => {
        const mentionedUser = args.item as ExtendedUserModel;
        
        // Check user status
        if (mentionedUser.status === 'offline') {
            console.warn(`${mentionedUser.user} is offline`);
            // Could send email instead
        }
        
        // Role-based logic
        if (mentionedUser.role === 'manager') {
            console.log('Manager mentioned - flagging for priority');
        }
        
        // Log mention with context
        console.log(`User: ${mentionedUser.user}`);
        console.log(`Role: ${mentionedUser.role}`);
        console.log(`Status: ${mentionedUser.status}`);
    }
});

chatUI.appendTo('#codeReviewChat');
```

### Example 4: Dynamic Mention Users

```typescript
import { ChatUI, UserModel } from '@syncfusion/ej2-interactive-chat';

let currentUser: UserModel = {
    id: "user1",
    user: "Albert"
};

let allUsers: UserModel[] = [
    currentUser,
    { id: "user2", user: "Michale Suyama" },
    { id: "user3", user: "Janet Leverling" },
    { id: "user4", user: "Andrew Fuller" },
    { id: "user5", user: "Nancy Davolio" }
];

let chatUI: ChatUI = new ChatUI({
    user: currentUser,
    mentionUsers: allUsers,
    headerText: "Dynamic Chat"
});

chatUI.appendTo('#dynamicChat');

// Update mention users dynamically
function addUserToMentionList(newUser: UserModel) {
    const currentMentions = chatUI.mentionUsers || [];
    chatUI.mentionUsers = [...currentMentions, newUser];
}

function removeUserFromMentionList(userId: string) {
    const currentMentions = chatUI.mentionUsers || [];
    chatUI.mentionUsers = currentMentions.filter(user => user.id !== userId);
}

// Example usage
setTimeout(() => {
    // Add new user after 5 seconds
    addUserToMentionList({
        id: "user6",
        user: "Steven Buchanan"
    });
}, 5000);
```

---

## Best Practices

### User Management

1. **Keep mention list current**: Only include active users
   ```typescript
   mentionUsers: activeUsers.filter(user => user.status === 'active')
   ```

2. **Sort alphabetically**: Make users easy to find
   ```typescript
   mentionUsers: users.sort((a, b) => a.user.localeCompare(b.user))
   ```

3. **Exclude current user**: Often not needed in list
   ```typescript
   mentionUsers: allUsers.filter(user => user.id !== currentUser.id)
   ```

4. **Limit list size**: Large lists can be overwhelming
   ```typescript
   // Show only relevant users (e.g., in same channel/room)
   mentionUsers: channelMembers
   ```

### Trigger Character Selection

1. **Use standard characters**: `@` is most familiar to users
2. **Avoid conflicts**: Don't use characters commonly in messages
3. **Consider context**: Slack uses `/` for commands, Discord uses `@` for mentions
4. **Document clearly**: If using non-standard character, inform users

### Message Formatting

1. **Use placeholders consistently**: Always use `{0}`, `{1}`, etc.
2. **Validate indices**: Ensure placeholder indices match array length
   ```typescript
   function validateMentions(text: string, mentions: UserModel[]): boolean {
       const placeholders = text.match(/{(\d+)}/g) || [];
       return placeholders.every(ph => {
           const index = parseInt(ph.replace(/[{}]/g, ''));
           return index >= 0 && index < mentions.length;
       });
   }
   ```

3. **Handle missing mentions**: Gracefully handle invalid placeholders

### Event Handling

1. **Use mentionSelect for side effects**: Notifications, logging, analytics
2. **Don't block UI**: Keep event handlers fast
3. **Validate before canceling**: Only cancel with good reason
4. **Provide feedback**: Inform users why mention was canceled

### Performance

1. **Lazy load users**: For large teams, load mention list on demand
2. **Debounce filtering**: Reduce filtering operations during typing
3. **Cache user data**: Avoid repeated lookups
4. **Limit list size**: Show most relevant users first

### Accessibility

1. **Keyboard navigation**: Ensure mention popup is fully keyboard-accessible
2. **Screen reader support**: Announce when popup opens and selected user
3. **Clear visual indicators**: Show selected user clearly
4. **ARIA labels**: Add appropriate labels to mention elements

### User Experience

1. **Show avatars**: Visual distinction helps users find people quickly
2. **Include status**: Show if user is online/offline
3. **Add roles**: Display user roles for context
4. **Smart filtering**: Match on nickname, email, etc.

### Example: Complete Best Practice Implementation

```typescript
import { ChatUI, UserModel, MentionSelectEventArgs } from '@syncfusion/ej2-interactive-chat';

// Extended user model with additional properties
interface TeamMember extends UserModel {
    email: string;
    role: string;
    status: 'online' | 'offline' | 'busy';
}

let currentUser: TeamMember = {
    id: "user1",
    user: "Albert",
    email: "albert@company.com",
    role: "Developer",
    status: "online",
    avatarBgColor: "#3f51b5"
};

let teamMembers: TeamMember[] = [
    {
        id: "user2",
        user: "Michale Suyama",
        email: "michale@company.com",
        role: "Manager",
        status: "online",
        avatarBgColor: "#e91e63"
    },
    {
        id: "user3",
        user: "Janet Leverling",
        email: "janet@company.com",
        role: "Designer",
        status: "busy",
        avatarBgColor: "#4CAF50"
    }
];

// Filter: Only active users, sorted alphabetically, exclude self
let mentionableUsers = teamMembers
    .filter(user => user.status !== 'offline' && user.id !== currentUser.id)
    .sort((a, b) => a.user.localeCompare(b.user));

let chatUI: ChatUI = new ChatUI({
    user: currentUser,
    mentionUsers: mentionableUsers,
    mentionTriggerChar: '@',
    headerText: "Team Collaboration",
    
    mentionSelect: (args: MentionSelectEventArgs) => {
        const mentionedUser = args.item as TeamMember;
        
        // Validate mention
        if (mentionedUser.status === 'busy') {
            console.log(`${mentionedUser.user} is busy, but mention allowed`);
        }
        
        // Send notification (async, don't block)
        sendMentionNotification(mentionedUser).catch(err => {
            console.error('Failed to send notification:', err);
        });
        
        // Analytics tracking
        trackMention({
            from: currentUser.id,
            to: mentionedUser.id,
            timestamp: new Date()
        });
        
        console.log(`Mentioned: ${mentionedUser.user} (${mentionedUser.role})`);
    }
});

chatUI.appendTo('#bestPracticeChat');

// Helper functions
async function sendMentionNotification(user: TeamMember): Promise<void> {
    // Send notification via API
    await fetch('/api/notifications', {
        method: 'POST',
        body: JSON.stringify({
            userId: user.id,
            type: 'mention',
            timestamp: new Date()
        })
    });
}

function trackMention(data: any): void {
    // Analytics tracking
    console.log('Tracking mention:', data);
}
```
