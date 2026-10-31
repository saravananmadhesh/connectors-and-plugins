# Methods and Programmatic Control

## Table of Contents
- [Add Message](#add-message)
- [Update Message](#update-message)
- [Scroll to Bottom](#scroll-to-bottom)
- [ViewChild Component Access](#viewchild-component-access)

## Add Message

### Add Message with String

Programmatically add messages to the chat:

```typescript
import { ChatUIModule } from '@syncfusion/ej2-angular-interactive-chat';
import { UserModel } from '@syncfusion/ej2-interactive-chat';
import { Component, ViewChild } from '@angular/core';
import { ChatUIComponent } from '@syncfusion/ej2-angular-interactive-chat';

@Component({
  imports: [ChatUIModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <div id="chatui" ejs-chatui #chatui_instance [user]="currentUserModel">
      <e-messages>
        <e-message text="How are you?" [author]="currentUserModel"></e-message>
      </e-messages>
    </div>
    <button (click)="addMessage()" style="padding: 10px 20px; margin-top: 10px;">
      Add Message
    </button>
  `
})
export class AppComponent {
  @ViewChild('chatui_instance', { static: false })
  public chatUIInstance!: ChatUIComponent;
  
  public currentUserModel: UserModel = { user: 'Albert', id: 'user1' };
  public michaleUserModel: UserModel = { user: 'Michale', id: 'user2' };
  
  public addMessage = () => {
    // Add simple string message
    this.chatUIInstance.addMessage('User message as string');
  };
}
```

### Add Message with MessageModel

Use MessageModel for rich message configuration:

```typescript
import { MessageModel } from '@syncfusion/ej2-interactive-chat';

public addMessage = () => {
  const message: MessageModel = {
    text: 'New message from bot',
    author: this.botUserModel,
    timeStamp: new Date()
  };
  
  this.chatUIInstance.addMessage(message);
};
```

### Add Multiple Messages

```typescript
public addMultipleMessages = () => {
  const messages: MessageModel[] = [
    {
      text: 'First message',
      author: this.currentUserModel
    },
    {
      text: 'Second message',
      author: this.michaleUserModel
    },
    {
      text: 'Third message',
      author: this.currentUserModel
    }
  ];
  
  messages.forEach(msg => {
    this.chatUIInstance.addMessage(msg);
  });
};
```

## Update Message

### Modify Existing Message

Update a message using its ID:

```typescript
@Component({
  imports: [ChatUIModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <div id="chatui" ejs-chatui #chatui_instance [user]="currentUserModel">
      <e-messages>
        <e-message 
          messageId="msg1"
          text="How are you?" 
          [author]="currentUserModel">
        </e-message>
        <e-message 
          messageId="msg2"
          text="Good! How are you?" 
          [author]="michaleUserModel">
        </e-message>
      </e-messages>
    </div>
    <button (click)="updateMessage()" style="padding: 10px 20px; margin-top: 10px;">
      Update Message
    </button>
  `
})
export class AppComponent {
  @ViewChild('chatui_instance', { static: false })
  public chatUIInstance!: ChatUIComponent;
  
  public currentUserModel: UserModel = { user: 'Albert', id: 'user1' };
  public michaleUserModel: UserModel = { user: 'Michale Suyama', id: 'user2' };
  
  public updateMessage = () => {
    // Update message with ID 'msg1'
    this.chatUIInstance.updateMessage('msg1', 'Updated message text');
  };
}
```

### Common Update Scenarios

```typescript
// Correct a typo
updateMessage('msg1', 'Corrected message text');

// Update with full MessageModel
updateMessage('msg1', {
  text: 'Updated text',
  isPinned: true
});

// Edit message after send
editMessage(messageId: string, newText: string) {
  this.chatUIInstance.updateMessage(messageId, {
    text: newText + ' (edited)',
    isEdited: true
  });
}
```

## Scroll to Bottom

### Auto-Scroll to Latest Messages

Scroll chat to the most recent message:

```typescript
@Component({
  imports: [ChatUIModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <div id="chatui" ejs-chatui #chatui_instance [user]="currentUserModel">
      <e-messages>
        <e-message text="How are you?" [author]="currentUserModel"></e-message>
      </e-messages>
    </div>
    <button (click)="scrollToBottom()" style="padding: 10px 20px; margin-top: 10px;">
      Scroll to Bottom
    </button>
  `
})
export class AppComponent {
  @ViewChild('chatui_instance', { static: false })
  public chatUIInstance!: ChatUIComponent;
  
  public currentUserModel: UserModel = { user: 'Albert', id: 'user1' };
  
  public scrollToBottom = () => {
    this.chatUIInstance.scrollToBottom();
  };
}
```

### Auto-Scroll After Adding Messages

```typescript
public addMessageAndScroll = async (messageText: string) => {
  // Add message
  this.chatUIInstance.addMessage(messageText);
  
  // Wait for DOM update
  await new Promise(resolve => setTimeout(resolve, 100));
  
  // Scroll to bottom
  this.chatUIInstance.scrollToBottom();
};
```

## Scroll to Message

### Navigate to Specific Message by ID

Use `scrollToMessage()` to scroll to a specific message in the conversation:

```typescript
import { Component, ViewChild } from '@angular/core';
import { ChatUIModule } from '@syncfusion/ej2-angular-interactive-chat';
import { ChatUIComponent } from '@syncfusion/ej2-angular-interactive-chat';
import { UserModel } from '@syncfusion/ej2-interactive-chat';

@Component({
  imports: [ChatUIModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <div id="chatui" ejs-chatui #chatui_instance [user]="currentUserModel">
      <e-messages>
        <e-message messageId="msg1" text="First message" [author]="currentUserModel"></e-message>
        <e-message messageId="msg2" text="Second message" [author]="michaleUserModel"></e-message>
        <e-message messageId="msg3" text="Important pinned message!" [author]="currentUserModel" [isPinned]="true"></e-message>
        <e-message messageId="msg4" text="Latest message" [author]="michaleUserModel"></e-message>
      </e-messages>
    </div>
    <div style="margin-top: 10px;">
      <button (click)="scrollToMessage('msg1')">Go to First</button>
      <button (click)="scrollToMessage('msg3')">Go to Pinned</button>
      <button (click)="scrollToMessage('msg4')">Go to Latest</button>
    </div>
  `
})
export class AppComponent {
  @ViewChild('chatui_instance', { static: false })
  public chatUIInstance!: ChatUIComponent;
  
  public currentUserModel: UserModel = { user: 'Albert', id: 'user1' };
  public michaleUserModel: UserModel = { user: 'Michale', id: 'user2' };
  
  public scrollToMessage = (messageId: string) => {
    this.chatUIInstance.scrollToMessage(messageId);
  };
}
```

### Use Cases for scrollToMessage

**1. Jump to Pinned Messages**

```typescript
public showPinnedMessages = () => {
  // Get all pinned messages
  const pinnedMessages = this.chatUIInstance.messages?.filter(m => m.isPinned);
  
  if (pinnedMessages && pinnedMessages.length > 0) {
    // Scroll to first pinned message
    this.chatUIInstance.scrollToMessage(pinnedMessages[0].messageId!);
  }
};
```

**2. Navigate Search Results**

```typescript
public searchResults: string[] = [];
public currentSearchIndex: number = 0;

public navigateSearchResults = (direction: 'next' | 'prev') => {
  if (this.searchResults.length === 0) return;
  
  if (direction === 'next') {
    this.currentSearchIndex = (this.currentSearchIndex + 1) % this.searchResults.length;
  } else {
    this.currentSearchIndex = this.currentSearchIndex === 0 
      ? this.searchResults.length - 1 
      : this.currentSearchIndex - 1;
  }
  
  // Scroll to search result
  this.chatUIInstance.scrollToMessage(this.searchResults[this.currentSearchIndex]);
};
```

**3. Deep Linking to Specific Message**

```typescript
import { ActivatedRoute } from '@angular/router';

export class AppComponent implements OnInit {
  constructor(private route: ActivatedRoute) {}
  
  ngOnInit() {
    // Get message ID from URL query parameter
    this.route.queryParams.subscribe(params => {
      const messageId = params['messageId'];
      if (messageId) {
        // Wait for component to initialize
        setTimeout(() => {
          this.scrollToMessageAndHighlight(messageId);
        }, 500);
      }
    });
  }
  
  private scrollToMessageAndHighlight = (messageId: string) => {
    this.chatUIInstance.scrollToMessage(messageId);
    // Add visual highlight
    this.highlightMessage(messageId);
  };
  
  private highlightMessage = (messageId: string) => {
    // Apply CSS class for temporary highlight
    const messageElement = document.querySelector(`[data-message-id="${messageId}"]`);
    if (messageElement) {
      messageElement.classList.add('highlight');
      setTimeout(() => {
        messageElement.classList.remove('highlight');
      }, 2000);
    }
  };
}
```

**4. Reply Thread Navigation**

```typescript
public navigateToReplyOrigin = (replyToMessageId: string) => {
  // Scroll to the original message being replied to
  this.chatUIInstance.scrollToMessage(replyToMessageId);
};
```

## Focus Method

### Set Focus to Chat Input

Use `focus()` to programmatically set focus to the message input field:

```typescript
import { Component, ViewChild } from '@angular/core';
import { ChatUIModule } from '@syncfusion/ej2-angular-interactive-chat';
import { ChatUIComponent } from '@syncfusion/ej2-angular-interactive-chat';
import { UserModel } from '@syncfusion/ej2-interactive-chat';

@Component({
  imports: [ChatUIModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <div id="chatui" ejs-chatui #chatui_instance [user]="currentUserModel">
      <e-messages>
        <e-message text="Welcome! Type your message below." [author]="botUserModel"></e-message>
      </e-messages>
    </div>
  `
})
export class AppComponent {
  @ViewChild('chatui_instance', { static: false })
  public chatUIInstance!: ChatUIComponent;
  
  public currentUserModel: UserModel = { user: 'Albert', id: 'user1' };
  public botUserModel: UserModel = { user: 'Bot', id: 'bot' };
  
  ngAfterViewInit() {
    // Auto-focus input on load
    setTimeout(() => {
      this.chatUIInstance.focus();
    }, 100);
  }
}
```

### Use Cases for focus()

**1. Auto-Focus on Page Load**

```typescript
ngAfterViewInit() {
  // Ensure chat input is focused when page loads
  this.chatUIInstance.focus();
}
```

**2. Focus After Modal Close**

```typescript
public closeAttachmentModal = () => {
  this.showAttachmentModal = false;
  
  // Return focus to chat input
  setTimeout(() => {
    this.chatUIInstance.focus();
  }, 100);
};
```

**3. Focus After Command Execution**

```typescript
public executeCommand = (command: string) => {
  // Execute slash command
  console.log('Executing command:', command);
  
  // Return focus to input
  this.chatUIInstance.focus();
};
```

**4. Focus After Error**

```typescript
public onMessageSendError = (error: any) => {
  console.error('Message send failed:', error);
  alert('Failed to send message. Please try again.');
  
  // Return focus for retry
  this.chatUIInstance.focus();
};
```

**5. Keyboard Shortcut Support**

```typescript
@HostListener('document:keydown', ['$event'])
handleKeyboardEvent(event: KeyboardEvent) {
  // Focus on Ctrl+K or Cmd+K
  if ((event.ctrlKey || event.metaKey) && event.key === 'k') {
    event.preventDefault();
    this.chatUIInstance.focus();
  }
}
```

## ViewChild Component Access

### Access Chat Instance

Use `@ViewChild` to access the ChatUIComponent for direct control:

```typescript
import { Component, ViewChild } from '@angular/core';
import { ChatUIComponent } from '@syncfusion/ej2-angular-interactive-chat';

@Component({
  imports: [ChatUIModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <div id="chatui" ejs-chatui #chatui_instance [user]="currentUserModel">
      <!-- Chat content -->
    </div>
  `
})
export class AppComponent {
  @ViewChild('chatui_instance', { static: false })
  public chatUIInstance!: ChatUIComponent;
  
  // Can now access component methods
  ngAfterViewInit() {
    // Component is ready
    console.log('Chat instance:', this.chatUIInstance);
  }
}
```

**Important:** Use `static: false` for initialization after view loads.

### Access Component Properties

```typescript
// Get current user
const currentUser = this.chatUIInstance.user;

// Get all messages
const allMessages = this.chatUIInstance.messages;

// Get component props
const width = this.chatUIInstance.width;
const height = this.chatUIInstance.height;
const placeholder = this.chatUIInstance.placeholder;
```

## Advanced Programmatic Examples

### Implement Chat Reply Feature

```typescript
public replyToMessage = async (originalMessage: MessageModel) => {
  // Add bot typing indicator
  this.typingUsers = [this.botUserModel];
  
  // Simulate processing
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // Remove typing indicator
  this.typingUsers = [];
  
  // Add reply message
  const replyMessage: MessageModel = {
    text: 'Thanks for your message!',
    author: this.botUserModel,
    replyTo: {
      messageID: originalMessage.messageId,
      text: originalMessage.text,
      user: originalMessage.author
    }
  };
  
  this.chatUIInstance.addMessage(replyMessage);
  this.chatUIInstance.scrollToBottom();
};
```

### Implement Message Reactions

```typescript
public addReactionToMessage = (messageId: string, emoji: string) => {
  const message = this.getMessageById(messageId);
  if (message) {
    message.reactions = message.reactions || [];
    message.reactions.push(emoji);
    this.chatUIInstance.updateMessage(messageId, message);
  }
};

private getMessageById = (id: string): MessageModel | undefined => {
  return this.chatUIInstance.messages?.find(m => m.messageId === id);
};
```

### Load Message History

```typescript
public async loadMessageHistory() {
  try {
    // Fetch messages from server
    const response = await fetch('/api/messages?limit=50');
    const messages: MessageModel[] = await response.json();
    
    // Add each message to chat
    messages.forEach(msg => {
      this.chatUIInstance.addMessage(msg);
    });
    
    // Scroll to bottom after loading
    this.chatUIInstance.scrollToBottom();
  } catch (error) {
    console.error('Failed to load history:', error);
  }
}
```

### Clear Chat History

```typescript
public clearChatHistory = () => {
  if (!this.chatUIInstance.messages) return;
  
  // Remove all messages
  this.chatUIInstance.messages.splice(0, this.chatUIInstance.messages.length);
  
  // Force refresh
  this.chatUIInstance.refresh();
};
```

### Search Messages

```typescript
public searchMessages = (query: string): MessageModel[] => {
  if (!this.chatUIInstance.messages) return [];
  
  return this.chatUIInstance.messages.filter(msg =>
    msg.text?.toLowerCase().includes(query.toLowerCase())
  );
};
```

### Export Chat

```typescript
public exportChatAsText = (): string => {
  if (!this.chatUIInstance.messages) return '';
  
  return this.chatUIInstance.messages
    .map(msg => `${msg.author.user}: ${msg.text}`)
    .join('\n');
};

public downloadChat = () => {
  const text = this.exportChatAsText();
  const element = document.createElement('a');
  element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
  element.setAttribute('download', 'chat-history.txt');
  element.style.display = 'none';
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
};
```

---
