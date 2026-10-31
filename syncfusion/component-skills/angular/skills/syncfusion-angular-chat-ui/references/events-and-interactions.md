# Events and Interactions

## Table of Contents
- [Component Lifecycle Events](#component-lifecycle-events)
- [Message Send Event](#message-send-event)
- [User Typing Event](#user-typing-event)
- [Message Toolbar Configuration](#message-toolbar-configuration)
- [Toolbar Item Click Events](#toolbar-item-click-events)

## Component Lifecycle Events

### Created Event

The `created` event fires when the Chat UI component is fully rendered and ready for interaction:

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
         (created)="onCreated()">
      <e-messages>
        <e-message text="Welcome to Chat!" [author]="botUserModel"></e-message>
      </e-messages>
    </div>
  `
})
export class AppComponent {
  public currentUserModel: UserModel = { user: 'Albert', id: 'user1' };
  public botUserModel: UserModel = { user: 'Bot', id: 'bot' };
  
  public onCreated = () => {
    console.log('Chat UI component initialized');
    // Load initial data, set up subscriptions, etc.
  };
}
```

### Use Cases for Created Event

```typescript
public onCreated = () => {
  // Fetch message history from server
  this.loadMessageHistory();
  
  // Initialize WebSocket connection
  this.connectWebSocket();
  
  // Set up typing indicator subscription
  this.subscribeToTypingIndicators();
  
  // Restore conversation state
  this.restorePreviousChat();
};
```

## Message Send Event

### Handle Message Submission

The `messageSend` event fires before a message is sent:

```typescript
import { ChatUIModule, MessageSendEventArgs } from '@syncfusion/ej2-angular-interactive-chat';
import { UserModel, MessageModel } from '@syncfusion/ej2-interactive-chat';
import { Component } from '@angular/core';

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
                   [author]="msg.author"></e-message>
      </e-messages>
    </div>
  `
})
export class AppComponent {
  public currentUserModel: UserModel = { user: 'Albert', id: 'user1' };
  public botUserModel: UserModel = { user: 'Bot', id: 'bot' };
  public messages: MessageModel[] = [];
  
  public onMessageSend = async (args: MessageSendEventArgs) => {
    const messageText = args.message.text;
    
    // Add user's message immediately
    this.messages.push({
      text: messageText,
      author: this.currentUserModel
    });
    
    // Send to backend
    try {
      const response = await fetch('/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: messageText })
      });
      const data = await response.json();
      
      // Add bot response
      this.messages.push({
        text: data.reply,
        author: this.botUserModel
      });
    } catch (error) {
      console.error('Message send failed:', error);
    }
  };
}
```

### Message Send Event Args

```typescript
interface MessageSendEventArgs {
  message: MessageModel;  // The message being sent
  cancel: boolean;        // Set to true to prevent sending
}
```

### Prevent Default Send

Use `args.cancel = true` to override default behavior:

```typescript
public onMessageSend = (args: MessageSendEventArgs) => {
  // Prevent default send, handle manually
  args.cancel = true;
  
  // Validate message content
  if (args.message.text.trim() === '') {
    console.warn('Cannot send empty message');
    return;
  }
  
  // Custom validation
  if (args.message.text.length > 500) {
    console.warn('Message exceeds 500 characters');
    return;
  }
  
  // Custom send logic
  console.log('Sending custom message:', args.message);
};
```

## User Typing Event

### Handle Typing Indicator

The `userTyping` event fires as the user types in the message input:

```typescript
import { ChatUIModule, TypingEventArgs } from '@syncfusion/ej2-angular-interactive-chat';
import { UserModel } from '@syncfusion/ej2-interactive-chat';
import { Component } from '@angular/core';

@Component({
  imports: [ChatUIModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <div id="chatui" ejs-chatui 
         [user]="currentUserModel" 
         (userTyping)="onTyping($event)">
      <e-messages>
        <!-- Messages -->
      </e-messages>
    </div>
  `
})
export class AppComponent {
  public currentUserModel: UserModel = { user: 'Albert', id: 'user1' };
  private typingTimeout: any;
  
  public onTyping = (args: TypingEventArgs) => {
    // Clear previous timeout
    clearTimeout(this.typingTimeout);
    
    // Broadcast typing status to other users
    this.broadcastTypingStatus(true);
    
    // Stop broadcasting after 2 seconds of inactivity
    this.typingTimeout = setTimeout(() => {
      this.broadcastTypingStatus(false);
    }, 2000);
  };
  
  private broadcastTypingStatus = (isTyping: boolean) => {
    // Send to server/WebSocket
    console.log('User is typing:', isTyping);
  };
}
```

### Display Typing Indicators

Use the `typingUsers` property to show who's typing:

```typescript
@Component({
  imports: [ChatUIModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <div id="chatui" ejs-chatui 
         [user]="currentUserModel" 
         [typingUsers]="typingUsers">
      <e-messages>
        <!-- Messages -->
      </e-messages>
    </div>
  `
})
export class AppComponent {
  public currentUserModel: UserModel = { user: 'Albert', id: 'user1' };
  public michaleUserModel: UserModel = { user: 'Michale', id: 'user2' };
  public typingUsers: UserModel[] = [];
  
  // Simulate receiving typing notification
  simulateUserTyping() {
    this.typingUsers = [this.michaleUserModel];
    
    // Clear after 3 seconds
    setTimeout(() => {
      this.typingUsers = [];
    }, 3000);
  }
}
```

## Message Toolbar Configuration

### Default Toolbar Items

By default, the message toolbar includes:
- Copy
- Reply
- Pin
- Delete

### Customize Toolbar

Configure toolbar with `messageToolbarSettings`:

```typescript
@Component({
  imports: [ChatUIModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <div id="chatui" ejs-chatui 
         [user]="currentUserModel" 
         [messageToolbarSettings]="messageToolbarSettings">
      <e-messages>
        <e-message messageId="1" text="How are you?" [author]="currentUserModel"></e-message>
        <e-message messageId="2" text="Good! How are you?" [author]="michaleUserModel"></e-message>
      </e-messages>
    </div>
  `
})
export class AppComponent {
  public currentUserModel: UserModel = { user: 'Albert', id: 'user1' };
  public michaleUserModel: UserModel = { user: 'Michale Suyama', id: 'user2' };
  
  public messageToolbarSettings: any = {
    width: '100%',
    items: [
      { icon: 'e-icon-forward', tooltip: 'Forward' },
      { icon: 'e-icon-reply', tooltip: 'Reply' },
      { icon: 'e-icon-copy', tooltip: 'Copy' },
      { icon: 'e-icon-trash', tooltip: 'Delete' },
      { icon: 'e-icon-pin', tooltip: 'Pin' }
    ]
  };
}
```

### Toolbar Item Widths

Control toolbar width with the `width` property:

```typescript
messageToolbarSettings: any = {
  width: '50%',     // 50% of message width
  width: '200px',   // Fixed pixel width
  width: '100%'     // Full width (default)
};
```

## ToolbarItemModel Properties

### Complete Toolbar Item Configuration

The `ToolbarItemModel` interface provides 10 properties for comprehensive toolbar customization. This applies to both `messageToolbarSettings` and `headerToolbar`:

```typescript
interface ToolbarItemModel {
  align?: ItemAlign;           // Toolbar item alignment
  cssClass?: string;           // Custom CSS class
  disabled?: boolean;          // Disable interaction
  iconCss?: string;            // Icon class
  tabIndex?: number;           // Tab order
  template?: string | object;  // Custom template
  text?: string;               // Display text
  tooltip?: string;            // Hover tooltip
  type?: ItemType;             // Item type
  visible?: boolean;           // Visibility control
}
```

### Align Property

Control toolbar item positioning with the `align` property:

```typescript
import { ItemAlign } from '@syncfusion/ej2-navigations';

public messageToolbarSettings: any = {
  items: [
    { iconCss: 'e-icon-copy', tooltip: 'Copy', align: 'Left' },
    { iconCss: 'e-icon-reply', tooltip: 'Reply', align: 'Left' },
    { iconCss: 'e-icon-delete', tooltip: 'Delete', align: 'Right' },
    { iconCss: 'e-icon-more', tooltip: 'More', align: 'Right' }
  ]
};
```

**ItemAlign Values:**
- `'Left'` - Align to left side
- `'Right'` - Align to right side
- `'Center'` - Align to center

### Disabled Property

Conditionally disable toolbar items:

```typescript
@Component({
  imports: [ChatUIModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <div id="chatui" ejs-chatui 
         [user]="currentUserModel" 
         [messageToolbarSettings]="messageToolbarSettings">
      <e-messages>
        <e-message messageId="1" text="How are you?" [author]="currentUserModel"></e-message>
      </e-messages>
    </div>
  `
})
export class AppComponent {
  public currentUserModel: UserModel = { user: 'Albert', id: 'user1' };
  public canDelete: boolean = false;
  
  public messageToolbarSettings: any = {
    items: [
      { iconCss: 'e-icon-copy', tooltip: 'Copy', disabled: false },
      { iconCss: 'e-icon-reply', tooltip: 'Reply', disabled: false },
      { 
        iconCss: 'e-icon-delete', 
        tooltip: 'Delete', 
        disabled: !this.canDelete  // Disabled based on permissions
      }
    ]
  };
  
  // Enable delete after authentication
  enableDelete() {
    this.canDelete = true;
    this.messageToolbarSettings.items[2].disabled = false;
  }
}
```

### TabIndex Property

Control keyboard navigation order:

```typescript
public headerToolbar: any = {
  items: [
    { iconCss: 'e-icons e-video', tooltip: 'Video Call', tabIndex: 1 },
    { iconCss: 'e-icons e-phone', tooltip: 'Voice Call', tabIndex: 2 },
    { iconCss: 'e-icons e-settings', tooltip: 'Settings', tabIndex: 3 }
  ]
};
```

**Tab Navigation:**
- Positive values (1, 2, 3...) define custom tab order
- `0` follows DOM order
- Negative values remove from tab navigation

### Template Property

Use custom templates for toolbar items:

```typescript
import { NgTemplateOutlet } from '@angular/common';

@Component({
  imports: [ChatUIModule, NgTemplateOutlet],
  standalone: true,
  selector: 'app-root',
  template: `
    <div id="chatui" ejs-chatui 
         [user]="currentUserModel" 
         [messageToolbarSettings]="messageToolbarSettings">
      
      <ng-template #customToolbarItem>
        <div class="custom-toolbar-btn">
          <span class="icon">⭐</span>
          <span class="label">Star</span>
        </div>
      </ng-template>
      
      <e-messages>
        <e-message messageId="1" text="How are you?" [author]="currentUserModel"></e-message>
      </e-messages>
    </div>
  `,
  styles: [`
    .custom-toolbar-btn {
      display: flex;
      align-items: center;
      gap: 4px;
      padding: 4px 8px;
      border-radius: 4px;
      cursor: pointer;
    }
    .custom-toolbar-btn:hover {
      background: #f0f0f0;
    }
  `]
})
export class AppComponent {
  @ViewChild('customToolbarItem', { static: true })
  public customToolbarItem: any;
  
  public currentUserModel: UserModel = { user: 'Albert', id: 'user1' };
  
  public messageToolbarSettings: any = {
    items: [
      { iconCss: 'e-icon-copy', tooltip: 'Copy' },
      { template: this.customToolbarItem, tooltip: 'Add to Favorites' },
      { iconCss: 'e-icon-delete', tooltip: 'Delete' }
    ]
  };
}
```

### Type Property

Specify toolbar item types:

```typescript
import { ItemType } from '@syncfusion/ej2-navigations';

public messageToolbarSettings: any = {
  items: [
    { iconCss: 'e-icon-copy', tooltip: 'Copy', type: 'Button' },
    { type: 'Separator' },  // Visual divider
    { iconCss: 'e-icon-reply', tooltip: 'Reply', type: 'Button' },
    { type: 'Separator' },
    { iconCss: 'e-icon-delete', tooltip: 'Delete', type: 'Button' }
  ]
};
```

**ItemType Values:**
- `'Button'` - Interactive button (default)
- `'Separator'` - Visual divider line

### Visible Property

Conditionally show/hide toolbar items:

```typescript
@Component({
  imports: [ChatUIModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <div id="chatui" ejs-chatui 
         [user]="currentUserModel" 
         [messageToolbarSettings]="messageToolbarSettings">
      <e-messages>
        <e-message messageId="1" text="How are you?" [author]="currentUserModel"></e-message>
      </e-messages>
    </div>
  `
})
export class AppComponent {
  public currentUserModel: UserModel = { user: 'Albert', id: 'user1' };
  public isAdmin: boolean = false;
  
  public messageToolbarSettings: any = {
    items: [
      { iconCss: 'e-icon-copy', tooltip: 'Copy', visible: true },
      { iconCss: 'e-icon-reply', tooltip: 'Reply', visible: true },
      { iconCss: 'e-icon-pin', tooltip: 'Pin', visible: true },
      { 
        iconCss: 'e-icon-delete', 
        tooltip: 'Delete', 
        visible: this.isAdmin  // Only admins can delete
      }
    ]
  };
  
  // Update visibility dynamically
  updateToolbarVisibility(role: string) {
    this.isAdmin = role === 'admin';
    this.messageToolbarSettings.items[3].visible = this.isAdmin;
  }
}
```

### CssClass Property

Apply custom styling to toolbar items:

```typescript
@Component({
  imports: [ChatUIModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <div id="chatui" ejs-chatui 
         [user]="currentUserModel" 
         [messageToolbarSettings]="messageToolbarSettings">
      <e-messages>
        <e-message messageId="1" text="How are you?" [author]="currentUserModel"></e-message>
      </e-messages>
    </div>
  `,
  styles: [`
    .copy-btn {
      color: #007bff;
    }
    .copy-btn:hover {
      background: #e7f3ff;
    }
    .delete-btn {
      color: #dc3545;
    }
    .delete-btn:hover {
      background: #ffe0e0;
    }
    .star-btn {
      color: #ffc107;
    }
  `]
})
export class AppComponent {
  public currentUserModel: UserModel = { user: 'Albert', id: 'user1' };
  
  public messageToolbarSettings: any = {
    items: [
      { iconCss: 'e-icon-copy', tooltip: 'Copy', cssClass: 'copy-btn' },
      { iconCss: 'e-icon-star', tooltip: 'Star', cssClass: 'star-btn' },
      { iconCss: 'e-icon-delete', tooltip: 'Delete', cssClass: 'delete-btn' }
    ]
  };
}
```

### Complete ToolbarItemModel Example

Example using all properties together:

```typescript
public messageToolbarSettings: any = {
  items: [
    {
      iconCss: 'e-icon-copy',
      text: 'Copy',
      tooltip: 'Copy message to clipboard',
      cssClass: 'copy-toolbar-btn',
      disabled: false,
      visible: true,
      align: 'Left',
      tabIndex: 1,
      type: 'Button'
    },
    {
      type: 'Separator',
      visible: true
    },
    {
      iconCss: 'e-icon-reply',
      text: 'Reply',
      tooltip: 'Reply to this message',
      cssClass: 'reply-toolbar-btn',
      disabled: false,
      visible: true,
      align: 'Left',
      tabIndex: 2,
      type: 'Button'
    },
    {
      iconCss: 'e-icon-delete',
      text: 'Delete',
      tooltip: 'Delete this message',
      cssClass: 'delete-toolbar-btn',
      disabled: this.cannotDelete,
      visible: this.isAuthorized,
      align: 'Right',
      tabIndex: 3,
      type: 'Button'
    }
  ]
};
```

### Differences: headerToolbar vs messageToolbarSettings

Both use `ToolbarItemModel`, but differ in context:

| Property | headerToolbar | messageToolbarSettings |
|----------|---------------|------------------------|
| **Location** | Chat header (top) | Per message (on hover) |
| **Scope** | Global chat actions | Message-specific actions |
| **Common Actions** | Video call, settings, profile | Copy, reply, pin, delete |
| **Width Property** | Not applicable | Configurable (50%, 100%, 200px) |
| **Event** | itemClicked | itemClicked (same handler pattern) |

**Example: Both toolbars in one component**

```typescript
public headerToolbar: ToolbarSettingsModel = {
  items: [
    { iconCss: 'e-icons e-video', tooltip: 'Video Call', align: 'Right' },
    { iconCss: 'e-icons e-settings', tooltip: 'Settings', align: 'Right' }
  ]
};

public messageToolbarSettings: any = {
  width: '100%',
  items: [
    { iconCss: 'e-icon-copy', tooltip: 'Copy', align: 'Left' },
    { iconCss: 'e-icon-reply', tooltip: 'Reply', align: 'Left' },
    { iconCss: 'e-icon-delete', tooltip: 'Delete', align: 'Right' }
  ]
};
```

## Toolbar Item Click Events

### Handle Toolbar Actions

Use `itemClicked` event to handle toolbar item clicks:

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
    <div id="chatui" ejs-chatui 
         #chatui_instance
         [user]="currentUserModel" 
         [messageToolbarSettings]="messageToolbarSettings" 
         (itemClicked)="itemClicked($event)">
      <e-messages>
        <e-message messageId="1" text="How are you?" [author]="currentUserModel"></e-message>
        <e-message messageId="2" text="Good! How are you?" [author]="michaleUserModel"></e-message>
      </e-messages>
    </div>
  `
})
export class AppComponent {
  @ViewChild('chatui_instance', { static: false })
  public chatUIInstance!: ChatUIComponent;
  
  public currentUserModel: UserModel = { user: 'Albert', id: 'user1' };
  public michaleUserModel: UserModel = { user: 'Michale Suyama', id: 'user2' };
  
  public messageToolbarSettings: any = {
    items: [
      { icon: 'e-icon-forward', tooltip: 'Forward' },
      { icon: 'e-icon-reply', tooltip: 'Reply' },
      { icon: 'e-icon-copy', tooltip: 'Copy' },
      { icon: 'e-icon-trash', tooltip: 'Delete' },
      { icon: 'e-icon-pin', tooltip: 'Pin' }
    ]
  };
  
  public itemClicked = (args: any) => {
    const { item, message } = args;
    
    switch (item.icon) {
      case 'e-icon-forward':
        console.log('Forward message:', message);
        break;
        
      case 'e-icon-reply':
        console.log('Reply to message:', message);
        break;
        
      case 'e-icon-copy':
        this.copyToClipboard(message.text);
        break;
        
      case 'e-icon-trash':
        console.log('Delete message:', message);
        break;
        
      case 'e-icon-pin':
        this.togglePin(message);
        break;
    }
  };
  
  private copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    console.log('Copied to clipboard:', text);
  };
  
  private togglePin = (message: any) => {
    message.isPinned = !message.isPinned;
    console.log('Message pinned:', message.isPinned);
  };
}
```

### Common Toolbar Actions

```typescript
// Forward to another user/chat
case 'e-icon-forward':
  this.forwardMessage(message);
  break;

// Reply with threading
case 'e-icon-reply':
  this.replyToMessage(message);
  break;

// Copy message text
case 'e-icon-copy':
  navigator.clipboard.writeText(message.text);
  break;

// Delete/remove message
case 'e-icon-trash':
  this.deleteMessage(message);
  break;

// Pin important message
case 'e-icon-pin':
  this.pinMessage(message);
  break;

// Edit message
case 'e-icon-edit':
  this.editMessage(message);
  break;
```

## Attachment Events

### Before Upload Event

The `beforeAttachmentUpload` event fires before file upload begins:

```typescript
public onBeforeAttachmentUpload = (args: UploadingEventArgs) => {
  // Validate file size
  if (args.filesData[0].size > 5 * 1024 * 1024) {
    args.cancel = true;
    console.error('File too large (max 5MB)');
  }
};
```

### Upload Success Event

```typescript
public onAttachmentUploadSuccess = (args: SuccessEventArgs) => {
  console.log('File uploaded successfully:', args);
};
```

### Upload Failure Event

```typescript
public onAttachmentUploadFailure = (args: FailureEventArgs) => {
  console.error('Upload failed:', args.error);
};
```

---
