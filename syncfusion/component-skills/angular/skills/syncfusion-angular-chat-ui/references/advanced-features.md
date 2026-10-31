# Advanced Features

## Table of Contents
- [State Persistence](#state-persistence)
- [Load on Demand](#load-on-demand)
- [Mention Integration](#mention-integration)
- [Message Status Tracking](#message-status-tracking)
- [Time Breaks](#time-breaks)

## State Persistence

### Preserve Chat State Across Sessions

Enable `enablePersistence` to automatically save and restore chat state (messages, typing indicators, scroll position) across browser sessions:

```typescript
import { ChatUIModule } from '@syncfusion/ej2-angular-interactive-chat';
import { UserModel } from '@syncfusion/ej2-interactive-chat';
import { Component } from '@angular/core';

@Component({
  imports: [ChatUIModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <div id="chatui" ejs-chatui 
         [user]="currentUserModel" 
         [enablePersistence]="true">
      <e-messages>
        <e-message text="How are you?" [author]="currentUserModel"></e-message>
      </e-messages>
    </div>
  `
})
export class AppComponent {
  public currentUserModel: UserModel = { user: 'Albert', id: 'user1' };
}
```

**What Gets Persisted:**
- Component state and configuration
- Scroll position
- User preferences

**Use Cases:**

1. **Single Page Applications (SPAs):**
```typescript
// Preserve state during route navigation
export class ChatPageComponent {
  public currentUserModel: UserModel = { user: 'Albert', id: 'user1' };
  public enablePersistence: boolean = true;  // Maintains state when navigating away
}
```

2. **Browser Refresh Protection:**
```typescript
// State survives page reload
@Component({
  template: `
    <div id="chatui" ejs-chatui 
         [user]="currentUserModel" 
         [enablePersistence]="true">
      <!-- Messages and scroll position restored after F5 refresh -->
    </div>
  `
})
```

3. **Multi-tab Support:**
```typescript
// Sync state across multiple browser tabs
export class AppComponent {
  public currentUserModel: UserModel = { user: 'Albert', id: 'user1' };
  public enablePersistence: boolean = true;  // Uses localStorage for cross-tab sync
}
```

**Storage Mechanism:**

The component uses browser `localStorage` with a unique key based on the component's ID:

```typescript
// Custom ID for isolated persistence
template: `
  <div id="support-chat" ejs-chatui 
       [user]="supportUser" 
       [enablePersistence]="true">
    <!-- Stored as 'support-chat' in localStorage -->
  </div>

  <div id="team-chat" ejs-chatui 
       [user]="teamUser" 
       [enablePersistence]="true">
    <!-- Stored as 'team-chat' in localStorage (separate) -->
  </div>
`
```

**Important Notes:**

- **Default:** `false` (persistence disabled)
- **Storage:** Uses browser `localStorage` (not suitable for sensitive data)
- **Capacity:** Limited by browser localStorage limits (~5-10MB)
- **Security:** Do not persist sensitive messages - use server-side storage instead
- **Clearing:** Users can clear localStorage to reset persisted state

**Selective Persistence (Custom Implementation):**

For more control, implement custom state management:

```typescript
import { Component, ViewChild, OnDestroy } from '@angular/core';
import { ChatUIComponent } from '@syncfusion/ej2-angular-interactive-chat';

@Component({
  imports: [ChatUIModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <div #chatui_instance id="chatui" ejs-chatui 
         [user]="currentUserModel" 
         [enablePersistence]="false"
         [messages]="messages">
    </div>
  `
})
export class AppComponent implements OnDestroy {
  @ViewChild('chatui_instance', { static: false })
  public chatUIInstance!: ChatUIComponent;
  
  public currentUserModel: UserModel = { user: 'Albert', id: 'user1' };
  public messages: MessageModel[] = [];
  
  // Custom persistence logic
  saveState() {
    const state = {
      messages: this.messages,
      timestamp: new Date().toISOString()
    };
    sessionStorage.setItem('chat-state', JSON.stringify(state));
  }
  
  loadState() {
    const saved = sessionStorage.getItem('chat-state');
    if (saved) {
      const state = JSON.parse(saved);
      this.messages = state.messages;
    }
  }
  
  ngOnDestroy() {
    this.saveState();  // Save before component unmounts
  }
}
```

**When NOT to Use enablePersistence:**

- ❌ Chat contains sensitive/private information
- ❌ Messages should be loaded fresh from server each time
- ❌ You need server-side message history synchronization
- ❌ Compliance requirements prohibit client-side storage

**Best Practice:** For production applications with message history, use server-side storage and load messages via API. Use `enablePersistence` only for non-sensitive UI state like scroll position and preferences.

## Load on Demand

### Improve Performance for Large Conversations

Use load-on-demand for chats with 1000+ messages to optimize performance:

```typescript
import { ChatUIModule } from '@syncfusion/ej2-angular-interactive-chat';
import { UserModel, MessageModel } from '@syncfusion/ej2-interactive-chat';
import { Component, OnInit } from '@angular/core';

@Component({
  imports: [ChatUIModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <div id="chatui" ejs-chatui 
         [user]="currentUserModel" 
         [loadOnDemand]="true" 
         [messages]="messages">
      <e-messages>
        <!-- Messages loaded on scroll -->
      </e-messages>
    </div>
  `
})
export class AppComponent implements OnInit {
  public currentUserModel: UserModel = { user: 'Albert', id: 'user1' };
  public michaleUserModel: UserModel = { user: 'Michale', id: 'user2' };
  public messages: MessageModel[] = [];
  
  public ngOnInit(): void {
    // Load initial batch of recent messages
    for (let i = 1; i <= 50; i++) {
      this.messages.push({
        text: `Message ${i}`,
        author: i % 2 === 0 ? this.michaleUserModel : this.currentUserModel
      });
    }
  }
  
  // Load more messages when user scrolls up
  public loadMoreMessages = () => {
    for (let i = this.messages.length + 1; i <= this.messages.length + 50; i++) {
      this.messages.unshift({
        text: `Message ${i}`,
        author: i % 2 === 0 ? this.michaleUserModel : this.currentUserModel
      });
    }
  };
}
```

**Behavior:**
- Only initial messages render in DOM
- When user scrolls to top, more messages load automatically
- Reduces memory usage and improves initial render time

## Mention Integration

### Configure Mention Users

Enable users to mention teammates with @mentions:

```typescript
import { ChatUIModule } from '@syncfusion/ej2-angular-interactive-chat';
import { UserModel } from '@syncfusion/ej2-interactive-chat';
import { Component } from '@angular/core';

@Component({
  imports: [ChatUIModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <div id="chatui" ejs-chatui 
         [user]="currentUserModel" 
         [mentionUsers]="mentionUsers">
      <e-messages>
        <e-message 
          text="Want to get coffee tomorrow?" 
          [author]="currentUserModel">
        </e-message>
        <e-message 
          text="Sure! What time?" 
          [author]="michaleUserModel">
        </e-message>
        <e-message 
          text="@Michale How about 10 AM?" 
          [author]="currentUserModel" 
          [mentionUsers]="[michaleUserModel]">
        </e-message>
      </e-messages>
    </div>
  `
})
export class AppComponent {
  public currentUserModel: UserModel = { user: 'Albert', id: 'user1' };
  public michaleUserModel: UserModel = { user: 'Michale Suyama', id: 'user2' };
  public reeναUserModel: UserModel = { user: 'Reena', id: 'user3' };
  
  public mentionUsers: UserModel[] = [
    this.michaleUserModel,
    this.reeναUserModel
  ];
}
```

### Customize Mention Trigger Character

Change the mention character from @ to something else:

```typescript
template: `
  <div id="chatui" ejs-chatui 
       [user]="currentUserModel" 
       [mentionUsers]="mentionUsers" 
       mentionTriggerChar="/">
    <!-- Use / instead of @ to mention -->
  </div>
`

// Example: "/Michale How about 10 AM?" instead of "@Michale"
```

### Predefine Mentions in Messages

Use placeholders to map mentions to users:

```typescript
@Component({
  imports: [ChatUIModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <div id="chatui" ejs-chatui 
         [user]="currentUserModel" 
         [mentionUsers]="mentionUsers">
      <e-messages>
        <!-- Placeholder {0} maps to first user in mentionUsers array -->
        <e-message 
          text="Hi {0}, are we on track for the deadline?" 
          [author]="currentUserModel"
          [mentionUsers]="[michaleUserModel]">
        </e-message>
        
        <!-- Placeholder {1} maps to second user -->
        <e-message 
          text="Yes {0}, the design phase is complete." 
          [author]="michaleUserModel"
          [mentionUsers]="[currentUserModel]">
        </e-message>
        
        <e-message 
          text="I'll review it and send feedback by today." 
          [author]="currentUserModel">
        </e-message>
      </e-messages>
    </div>
  `
})
export class AppComponent {
  public currentUserModel: UserModel = { user: 'Albert', id: 'user1' };
  public michaleUserModel: UserModel = { user: 'Michale Suyama', id: 'user2' };
  public mentionUsers: UserModel[] = [];
}
```

### Handle Mention Selection

Use `mentionSelect` event when user selects a mention:

```typescript
import { MentionSelectEventArgs } from '@syncfusion/ej2-angular-interactive-chat';

@Component({
  imports: [ChatUIModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <div id="chatui" ejs-chatui 
         [user]="currentUserModel"
         [mentionUsers]="mentionUsers"
         (mentionSelect)="onMentionSelect($event)">
      <e-messages>
        <!-- Messages -->
      </e-messages>
    </div>
  `
})
export class AppComponent {
  public currentUserModel: UserModel = { user: 'Albert', id: 'user1' };
  public michaleUserModel: UserModel = { user: 'Michale', id: 'user2' };
  public mentionUsers: UserModel[] = [this.michaleUserModel];
  
  public onMentionSelect = (args: MentionSelectEventArgs) => {
    console.log('User mentioned:', args.mentionUser);
    // Send notification to mentioned user
    this.notifyUser(args.mentionUser);
  };
  
  private notifyUser = (user: UserModel) => {
    console.log(`Notifying ${user.user} of mention`);
  };
}
```

## Message Status Tracking

### Delivery Status Indicators

Track message delivery states:

```typescript
interface MessageStatus {
  'sent';           // Message sent to server
  'delivered';      // Message received by recipient
  'read';          // Message read by recipient
  'failed';        // Message delivery failed
}
```

### Display Message Status

```typescript
@Component({
  imports: [ChatUIModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <div id="chatui" ejs-chatui [user]="currentUserModel">
      <e-messages>
        <e-message 
          text="Message 1: Sending..." 
          [author]="currentUserModel"
          [status]="{ iconCss: 'e-icon-clock', text: 'Sending' }">
        </e-message>
        
        <e-message 
          text="Message 2: Sent" 
          [author]="currentUserModel"
          [status]="{ iconCss: 'e-icon-check', text: 'Sent' }">
        </e-message>
        
        <e-message 
          text="Message 3: Delivered" 
          [author]="currentUserModel"
          [status]="{ iconCss: 'e-icon-check-double', text: 'Delivered' }">
        </e-message>
        
        <e-message 
          text="Message 4: Read" 
          [author]="currentUserModel"
          [status]="{ iconCss: 'e-icon-check-double', text: 'Read', tooltip: 'Read at 3:45 PM' }">
        </e-message>
        
        <e-message 
          text="Message 5: Failed" 
          [author]="currentUserModel"
          [status]="{ iconCss: 'e-icon-close', text: 'Failed' }">
        </e-message>
      </e-messages>
    </div>
  `
})
export class AppComponent {
  public currentUserModel: UserModel = { user: 'Albert', id: 'user1' };
}
```

### Update Status on Delivery

```typescript
public async sendMessage(text: string) {
  const messageId = this.generateId();
  
  // Add message with "sending" status
  const message: MessageModel = {
    messageId,
    text,
    author: this.currentUserModel,
    status: { iconCss: 'e-icon-clock', text: 'Sending' }
  };
  this.chatUIInstance.addMessage(message);
  
  try {
    // Send to server
    const response = await fetch('/api/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text })
    });
    
    if (response.ok) {
      // Update to "sent" status
      this.chatUIInstance.updateMessage(messageId, {
        status: { iconCss: 'e-icon-check', text: 'Sent' }
      });
      
      // Simulate delivery after 1 second
      setTimeout(() => {
        this.chatUIInstance.updateMessage(messageId, {
          status: { iconCss: 'e-icon-check-double', text: 'Delivered' }
        });
      }, 1000);
    }
  } catch (error) {
    // Update to "failed" status
    this.chatUIInstance.updateMessage(messageId, {
      status: { iconCss: 'e-icon-close', text: 'Failed' }
    });
  }
}

private generateId = (): string => {
  return 'msg_' + Date.now() + '_' + Math.random();
};
```

## Time Breaks

### Display Date Separators

Use time breaks to organize messages by date:

```typescript
@Component({
  imports: [ChatUIModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <div id="chatui" ejs-chatui 
         [user]="currentUserModel" 
         [showTimeBreak]="true"
         headerText="TeamSync Professionals">
      <e-messages>
        <!-- Messages from today -->
        <e-message 
          text="How are you?" 
          [author]="currentUserModel" 
          [timeStamp]="today">
        </e-message>
        <e-message 
          text="Good! How are you?" 
          [author]="michaleUserModel" 
          [timeStamp]="today">
        </e-message>
        
        <!-- Time break appears automatically for different date -->
        
        <!-- Messages from yesterday -->
        <e-message 
          text="Let's meet tomorrow" 
          [author]="currentUserModel" 
          [timeStamp]="yesterday">
        </e-message>
        <e-message 
          text="Sure! See you then." 
          [author]="michaleUserModel" 
          [timeStamp]="yesterday">
        </e-message>
      </e-messages>
    </div>
  `
})
export class AppComponent {
  public currentUserModel: UserModel = { user: 'Albert', id: 'user1' };
  public michaleUserModel: UserModel = { user: 'Michale Suyama', id: 'user2' };
  
  public today = new Date();
  public yesterday = new Date(new Date().setDate(new Date().getDate() - 1));
}
```

**Behavior:**
- Automatically inserts separator when message date changes
- Shows "Today", "Yesterday", or specific date
- Improves conversation readability

### Customize Time Break Template

Refer to [Templates and Content](./templates-and-content.md) for custom time break templates.

## Best Practices

### 1. Mention Performance
```typescript
// ✅ Good - limit mention suggestions
mentionUsers: UserModel[] = this.teamMembers.slice(0, 20);

// ❌ Bad - too many suggestions
mentionUsers: UserModel[] = allCompanyUsers;  // 10,000+ users
```

### 2. Load on Demand Strategy
```typescript
// ✅ Good - load older messages intelligently
loadMoreMessages = () => {
  // Fetch 50 messages before current first message
  // Prepend to array
  // Continue chat
};

// ❌ Bad - load all messages at once
ngOnInit = () => {
  this.loadAllMessages();  // Huge performance hit
};
```

### 3. Status Updates
```typescript
// ✅ Good - update status asynchronously
this.updateMessageStatus(messageId, 'sent');
setTimeout(() => {
  this.updateMessageStatus(messageId, 'delivered');
}, 2000);

// ❌ Bad - rapid synchronous updates
this.updateMessageStatus(messageId, 'sent');
this.updateMessageStatus(messageId, 'delivered');
this.updateMessageStatus(messageId, 'read');
```

---
