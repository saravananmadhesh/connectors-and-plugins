# Messages and Users Configuration

## Table of Contents
- [Message Model Properties](#message-model-properties)
- [User Model Properties](#user-model-properties)
- [Defining Current User](#defining-current-user)
- [Avatar Configuration](#avatar-configuration)
- [User Presence Status](#user-presence-status)
- [Message Features](#message-features)
- [Compact Mode](#compact-mode)
- [Markdown Support](#markdown-support)

## Message Model Properties

### Basic Message Configuration

Configure messages with the `<e-message>` element and these properties:

```typescript
import { ChatUIModule } from '@syncfusion/ej2-angular-interactive-chat';
import { UserModel } from '@syncfusion/ej2-interactive-chat';
import { Component } from '@angular/core';

@Component({
  imports: [ChatUIModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <div id="chatui" ejs-chatui [user]="currentUserModel" headerText="TeamSync">
      <e-messages>
        <e-message 
          messageId="msg1"
          text="How are you?" 
          [author]="currentUserModel"
          [timeStamp]="timestamp1">
        </e-message>
        <e-message 
          messageId="msg2"
          text="Good! How are you?" 
          [author]="michaleUserModel"
          [timeStamp]="timestamp2">
        </e-message>
      </e-messages>
    </div>
  `
})
export class AppComponent {
  public currentUserModel: UserModel = { user: 'Albert', id: 'user1' };
  public michaleUserModel: UserModel = { user: 'Michale Suyama', id: 'user2' };
  public timestamp1: Date = new Date('2024-01-02 10:00:00');
  public timestamp2: Date = new Date('2024-01-02 11:00:00');
}
```

**Key Properties:**
- `text` - Message content/body text
- `messageId` - Unique message identifier
- `author` - UserModel of message sender
- `timeStamp` - Date/time when message was sent
- `id` - Alternative to messageId

## User Model Properties

Define users with these properties:

```typescript
const user: UserModel = {
  id: 'unique-id',              // Required: unique identifier
  user: 'Display Name',         // Required: shown name
  avatarUrl: 'https://...',    // Optional: avatar image URL
  avatarBgColor: '#FF5733',    // Optional: avatar background color
  cssClass: 'custom-user',     // Optional: custom CSS class
  statusIconCss: 'e-user-online' // Optional: presence status
};
```

**Required Properties:**
- `id` - Unique identifier to distinguish users in chat
- `user` - Display name shown in messages

**Optional Properties:**
- `avatarUrl` - Image URL for user avatar
- `avatarBgColor` - Hex color for avatar background
- `cssClass` - Custom CSS class for styling
- `statusIconCss` - Icon class for presence status

## Defining Current User

The current user (logged-in user) is set with the `[user]` property on `<ejs-chatui>`:

```typescript
@Component({
  imports: [ChatUIModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <div id="chatui" ejs-chatui [user]="currentUserModel">
      <e-messages>
        <!-- Messages here -->
      </e-messages>
    </div>
  `
})
export class AppComponent {
  // This user's messages appear on the right side
  public currentUserModel: UserModel = {
    user: 'Albert',
    id: 'user1'
  };
}
```

**Important:** 
- Current user's messages display on the right side
- Other users' messages display on the left side
- The `id` property must be unique and match message `author.id`

## Avatar Configuration

### Avatar URLs

Set user avatars with image URLs:

```typescript
public currentUserModel: UserModel = {
  user: 'Albert',
  id: 'user1',
  avatarUrl: 'https://ej2.syncfusion.com/react/demos/src/chat/images/avatar-1.png'
};

public michaleUserModel: UserModel = {
  user: 'Michale Suyama',
  id: 'user2',
  avatarUrl: 'https://ej2.syncfusion.com/react/demos/src/chat/images/avatar-2.png'
};
```

### Avatar Fallback

If no URL provided, initials from the user name are displayed:

```typescript
// No avatarUrl specified
public userModel: UserModel = {
  user: 'Albert Smith',  // Shows "AS" as avatar
  id: 'user1'
};
```

### Avatar Background Color

Customize avatar background with hex colors:

```typescript
public users: UserModel[] = [
  {
    user: 'Albert',
    id: 'user1',
    avatarBgColor: '#d32f2f'  // Red
  },
  {
    user: 'Michale',
    id: 'user2',
    avatarBgColor: '#4caf50'  // Green
  },
  {
    user: 'Reena',
    id: 'user3',
    avatarBgColor: '#2196f3'  // Blue
  }
];
```

## User Presence Status

### Status Icon Classes

Indicate user presence with predefined status icon CSS classes:

```typescript
// Status icon class mapping
const statusIcons = {
  'e-user-online': 'Available/Online',
  'e-user-offline': 'Offline',
  'e-user-away': 'Away',
  'e-user-busy': 'Busy'
};
```

### Applying Status Icons

```typescript
template: `
  <div id="chatui" ejs-chatui [user]="currentUserModel" headerText="TeamSync">
    <e-messages>
      <e-message 
        text="How are you?" 
        [author]="currentUserModel" 
        statusIconCss="e-user-online">
      </e-message>
      <e-message 
        text="Good! How are you?" 
        [author]="michaleUserModel" 
        statusIconCss="e-user-offline">
      </e-message>
    </e-messages>
  </div>
`,
export class AppComponent {
  public currentUserModel: UserModel = { user: 'Albert', id: 'user1' };
  public michaleUserModel: UserModel = { user: 'Michale Suyama', id: 'user2' };
}
```

## Message Features

### Pinned Messages

Pin important messages for visibility:

```typescript
<e-message 
  text="This is important information!" 
  [author]="currentUserModel" 
  [isPinned]="true">
</e-message>
```

When pinned, users can access options to pin/unpin via the message menu.

### Message Replies (Threading)

Create message threads by replying to original messages using the `MessageReplyModel` interface:

```typescript
import { MessageReplyModel } from '@syncfusion/ej2-interactive-chat';

interface MessageReplyModel {
  messageID: string;        // ID of the message being replied to
  text: string;             // Original message text
  user?: UserModel;         // Author of original message (optional)
  timeStamp?: Date;         // Original message timestamp (optional)
  timeStampFormat?: string; // Format for reply timestamp (optional)
}
```

**Basic Reply Example:**

```typescript
@Component({
  imports: [ChatUIModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <div id="chatui" ejs-chatui [user]="currentUserModel">
      <e-messages>
        <e-message 
          text="How are you?" 
          messageId="msg1"
          [author]="currentUserModel">
        </e-message>
        <e-message 
          text="Good! How are you?" 
          messageId="msg2"
          [replyTo]="replyToMessage"
          [author]="michaleUserModel">
        </e-message>
      </e-messages>
    </div>
  `
})
export class AppComponent {
  public currentUserModel: UserModel = { user: 'Albert', id: 'user1' };
  public michaleUserModel: UserModel = { user: 'Michale Suyama', id: 'user2' };
  
  public replyToMessage: MessageReplyModel = {
    messageID: 'msg1',
    text: 'How are you?',
    user: this.currentUserModel
  };
}
```

**Reply with Timestamp:**

The `timeStamp` and `timeStampFormat` properties control how the original message's time is displayed in the reply context:

```typescript
public replyToMessage: MessageReplyModel = {
  messageID: 'msg1',
  text: 'How are you?',
  user: this.currentUserModel,
  timeStamp: new Date('2024-01-02T10:30:00'),
  timeStampFormat: 'HH:mm'  // Shows "10:30" in reply context
};
```

**Timestamp Format Examples:**

```typescript
// Time only (compact)
timeStamp: new Date('2024-01-02T10:30:00'),
timeStampFormat: 'HH:mm'           // → "10:30"

// 12-hour format
timeStampFormat: 'hh:mm a'          // → "10:30 AM"

// Date and time
timeStampFormat: 'MMM d, HH:mm'     // → "Jan 2, 10:30"

// Full date (for old messages)
timeStampFormat: 'dd/MM/yyyy'       // → "02/01/2024"

// Relative time (custom implementation needed)
timeStampFormat: 'MMM d'            // → "Jan 2"
```

**Dynamic Timestamp Formatting:**

```typescript
@Component({
  imports: [ChatUIModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <div id="chatui" ejs-chatui [user]="currentUserModel">
      <e-messages>
        <e-message 
          text="Original message from yesterday" 
          messageId="msg1"
          [author]="currentUserModel"
          [timeStamp]="yesterdayDate">
        </e-message>
        <e-message 
          text="Replying today" 
          messageId="msg2"
          [replyTo]="replyWithDynamicTimestamp"
          [author]="michaleUserModel">
        </e-message>
      </e-messages>
    </div>
  `
})
export class AppComponent {
  public currentUserModel: UserModel = { user: 'Albert', id: 'user1' };
  public michaleUserModel: UserModel = { user: 'Michale Suyama', id: 'user2' };
  public yesterdayDate = new Date(Date.now() - 24 * 60 * 60 * 1000);
  
  public replyWithDynamicTimestamp: MessageReplyModel = {
    messageID: 'msg1',
    text: 'Original message from yesterday',
    user: this.currentUserModel,
    timeStamp: this.yesterdayDate,
    timeStampFormat: this.getTimestampFormat(this.yesterdayDate)
  };
  
  // Smart timestamp formatting based on message age
  getTimestampFormat(messageDate: Date): string {
    const now = new Date();
    const diffHours = (now.getTime() - messageDate.getTime()) / (1000 * 60 * 60);
    
    if (diffHours < 24) {
      return 'HH:mm';           // Today: show time only
    } else if (diffHours < 168) {
      return 'EEE HH:mm';       // This week: show day + time
    } else {
      return 'MMM d, yyyy';     // Older: show full date
    }
  }
}
```

**Important Notes:**

- `timeStamp` is **optional** - if omitted, no timestamp shows in reply context
- `timeStampFormat` only affects reply display, not the original message
- The format follows Angular's DatePipe patterns
- Timestamp appears in the reply preview bubble above the reply message

**Reply with Attachments:**

```typescript
@Component({
  imports: [ChatUIModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <div id="chatui" ejs-chatui [user]="currentUserModel">
      <e-messages>
        <e-message 
          text="Check this document" 
          messageId="msg1"
          [author]="currentUserModel"
          [attachedFile]="originalAttachment">
        </e-message>
        <e-message 
          text="Thanks! I reviewed it." 
          messageId="msg2"
          [replyTo]="replyWithAttachment"
          [author]="michaleUserModel">
        </e-message>
      </e-messages>
    </div>
  `
})
export class AppComponent {
  public currentUserModel: UserModel = { user: 'Albert', id: 'user1' };
  public michaleUserModel: UserModel = { user: 'Michale Suyama', id: 'user2' };
  
  public originalAttachment: any = {
    name: 'project-proposal.pdf',
    size: '2.5 MB',
    type: 'pdf'
  };
  
  // Reply references original message with attachment
  public replyWithAttachment: MessageReplyModel = {
    messageID: 'msg1',
    text: 'Check this document',
    user: this.currentUserModel,
    timeStamp: new Date('2024-01-02T10:30:00')
  };
}
```

**Dynamic Reply Creation:**

```typescript
@Component({
  imports: [ChatUIModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <div id="chatui" ejs-chatui 
         [user]="currentUserModel"
         (messageSend)="onMessageSend($event)">
      <e-messages>
        <e-message *ngFor="let msg of messages" 
          [text]="msg.text"
          [messageId]="msg.messageId"
          [author]="msg.author"
          [replyTo]="msg.replyTo"
          [timeStamp]="msg.timeStamp">
        </e-message>
      </e-messages>
    </div>
  `
})
export class AppComponent {
  @ViewChild('chatui_instance', { static: false })
  public chatUIInstance!: ChatUIComponent;
  
  public currentUserModel: UserModel = { user: 'Albert', id: 'user1' };
  public michaleUserModel: UserModel = { user: 'Michale Suyama', id: 'user2' };
  public messages: MessageModel[] = [];
  public replyingTo: MessageModel | null = null;
  
  // User clicks "Reply" button in message toolbar
  onReplyClick(message: MessageModel) {
    this.replyingTo = message;
    // Show reply indicator in UI
    console.log(`Replying to: ${message.text}`);
  }
  
  onMessageSend(args: any) {
    const newMessage: MessageModel = {
      messageId: `msg_${Date.now()}`,
      text: args.text,
      author: this.currentUserModel,
      timeStamp: new Date()
    };
    
    // Attach reply context if replying
    if (this.replyingTo) {
      newMessage.replyTo = {
        messageID: this.replyingTo.messageId,
        text: this.replyingTo.text,
        user: this.replyingTo.author,
        timeStamp: this.replyingTo.timeStamp,
        timeStampFormat: 'HH:mm'
      };
      this.replyingTo = null;
    }
    
    this.messages.push(newMessage);
  }
}
```

**MessageReplyModel Best Practices:**

1. **Always include messageID**: Required to link reply to original message
2. **Include user for context**: Helps display "Replying to [User]" indicator
3. **Use timeStampFormat**: Format timestamps consistently in reply context
4. **Handle missing messages**: Original message might be deleted
5. **Support nested replies**: Allow replies to replies for deep conversations

### Message Forwarding

Mark messages as forwarded:

```typescript
<e-message 
  text="Check this out!" 
  [author]="michaleUserModel" 
  [isForwarded]="true">
</e-message>
```

The `isForwarded` indicator shows in the message UI.

### Message Status

Track delivery state with status property:

```typescript
template: `
  <e-message 
    text="Good! How are you?" 
    [author]="michaleUserModel" 
    [status]="messageStatus">
  </e-message>
`,
export class AppComponent {
  public messageStatus: any = {
    iconCss: 'e-icon-check',
    text: 'Delivered',
    tooltip: 'Delivered successfully'
  };
}
```

## Compact Mode

Enable compact mode to align all messages left for space-constrained layouts:

```typescript
@Component({
  imports: [ChatUIModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <div id="chatui" ejs-chatui 
         [user]="currentUserModel" 
         [enableCompactMode]="true" 
         headerText="TeamSync Professionals">
      <e-messages>
        <e-message text="How are you?" [author]="currentUserModel"></e-message>
        <e-message text="Good! How are you?" [author]="michaleUserModel"></e-message>
      </e-messages>
    </div>
  `
})
export class AppComponent {
  public currentUserModel: UserModel = { user: 'Albert', id: 'user1' };
  public michaleUserModel: UserModel = { user: 'Michale Suyama', id: 'user2' };
  public enableCompactMode: boolean = true;
}
```

**Default:** `false` (messages alternate left/right)
**When true:** All messages align to left side

## Markdown Support

### Enable Markdown

The Chat UI supports Markdown formatting for rich text:

```typescript
// Supported formats:
// **bold** or __bold__
// *italic* or _italic_
// [Link text](url)
// - List item or 1. Numbered item
// `inline code`
```

### Rendering Markdown

Use the `marked` library to parse Markdown before rendering:

```bash
npm install marked dompurify
```

```typescript
import { ChatUIModule } from '@syncfusion/ej2-angular-interactive-chat';
import { UserModel } from '@syncfusion/ej2-interactive-chat';
import { Component } from '@angular/core';

declare var marked: any;
declare var DOMPurify: any;

@Component({
  imports: [ChatUIModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <div id="chatui" ejs-chatui [user]="currentUserModel">
      <e-messages>
        <e-message [text]="markdownText1" [author]="currentUserModel"></e-message>
        <e-message text="Good! How are you?" [author]="michaleUserModel"></e-message>
      </e-messages>
    </div>
  `
})
export class AppComponent {
  public currentUserModel: UserModel = { user: 'Albert', id: 'user1' };
  public michaleUserModel: UserModel = { user: 'Michale Suyama', id: 'user2' };
  public markdownText1: string = '**How** are *you*?';

  constructor() {
    // Parse Markdown to HTML
    if (marked && DOMPurify) {
      this.markdownText1 = DOMPurify.sanitize(marked.parse(this.markdownText1));
    }
  }
}
```

### Security Note

Always use `DOMPurify` to sanitize Markdown output and prevent XSS attacks:

```typescript
const unsafeHTML = marked.parse(userInput);
const safeHTML = DOMPurify.sanitize(unsafeHTML);
```

## Best Practices

**1. User ID Uniqueness**
```typescript
// ✅ Good - unique IDs
{ user: 'Albert', id: 'albert-user-001' }
{ user: 'Michale', id: 'michale-user-002' }

// ❌ Bad - duplicate IDs break message routing
{ user: 'Albert', id: 'user1' }
{ user: 'Michale', id: 'user1' }  // Same ID causes issues
```

**2. Consistent Avatar Colors**
```typescript
// ✅ Good - consistent color scheme
avatarBgColor: '#FF6B6B'  // Coral
avatarBgColor: '#4ECDC4'  // Teal
avatarBgColor: '#FFE66D'  // Yellow

// ❌ Avoid - random/inconsistent colors
avatarBgColor: '#xyz'  // Invalid hex
```

**3. Message Timestamps**
```typescript
// ✅ Good - ISO format or Date objects
[timeStamp]="new Date('2024-01-02T10:00:00Z')"
[timeStamp]="new Date()"

// ❌ Bad - string timestamps
[timeStamp]="'2024-01-02 10:00'"  // Type error
```

---
