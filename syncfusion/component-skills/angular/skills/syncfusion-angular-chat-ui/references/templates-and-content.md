# Templates and Content Customization

## Table of Contents
- [Message Templates](#message-templates)
- [Empty Chat Template](#empty-chat-template)
- [Time Break Template](#time-break-template)
- [Message Status](#message-status)
- [Timestamp Configuration](#timestamp-configuration)
- [Typing Indicator Template](#typing-indicator-template)

## Message Templates

### Custom Message Rendering

Use `messageTemplate` to customize how individual messages are displayed:

```typescript
import { ChatUIModule } from '@syncfusion/ej2-angular-interactive-chat';
import { UserModel } from '@syncfusion/ej2-interactive-chat';
import { Component } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';

@Component({
  imports: [ChatUIModule, NgTemplateOutlet],
  standalone: true,
  selector: 'app-root',
  template: `
    <div id="chatui" ejs-chatui 
         [user]="currentUserModel" 
         [messageTemplate]="customMessage">
      <ng-template #customMessage let-message="message">
        <div class="custom-message">
          <strong>{{message.author.user}}:</strong>
          <span>{{message.text}}</span>
        </div>
      </ng-template>
      <e-messages>
        <e-message text="How are you?" [author]="currentUserModel"></e-message>
        <e-message text="Good! How are you?" [author]="michaleUserModel"></e-message>
      </e-messages>
    </div>
  `,
  styles: [`
    .custom-message {
      padding: 8px;
      border-radius: 4px;
      background: #f5f5f5;
    }
  `]
})
export class AppComponent {
  public currentUserModel: UserModel = { user: 'Albert', id: 'user1' };
  public michaleUserModel: UserModel = { user: 'Michale Suyama', id: 'user2' };
}
```

### Message Template Context

The template has access to `message` object:

```typescript
ng-template #messageTemplate let-message="message">
  <!-- Available properties -->
  {{message.text}}           <!-- Message content -->
  {{message.author.user}}    <!-- Sender name -->
  {{message.timeStamp}}      <!-- Message time -->
  {{message.isPinned}}       <!-- If pinned -->
  {{message.isForwarded}}    <!-- If forwarded -->
</ng-template>
```

### Advanced Message Template

```typescript
template: `
  <ng-template #messageTemplate let-message="message" let-i="index">
    <div [ngClass]="{'message-system': message.systemMessage}">
      <div class="message-header">
        <span class="message-author">{{message.author.user}}</span>
        <span class="message-time">{{message.timeStamp | date:'HH:mm'}}</span>
      </div>
      <div class="message-content">
        {{message.text}}
      </div>
      <div *ngIf="message.isPinned" class="message-pinned">
        📌 Pinned
      </div>
    </div>
  </ng-template>
`
```

## Empty Chat Template

### Customize Empty State

Use `emptyChatTemplate` to display content when no messages exist:

```typescript
@Component({
  imports: [ChatUIModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <div id="chatui" ejs-chatui 
         [user]="currentUserModel" 
         [emptyChatTemplate]="emptyChat">
      <ng-template #emptyChat>
        <div class="empty-chat-container">
          <div class="empty-chat-icon">💬</div>
          <h2>Welcome to Chat!</h2>
          <p>Start a conversation by typing a message below.</p>
        </div>
      </ng-template>
      <e-messages>
      </e-messages>
    </div>
  `,
  styles: [`
    .empty-chat-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 100%;
      text-align: center;
      color: #999;
    }
    
    .empty-chat-icon {
      font-size: 64px;
      margin-bottom: 16px;
    }
  `]
})
export class AppComponent {
  public currentUserModel: UserModel = { user: 'Albert', id: 'user1' };
}
```

### Empty State Examples

```typescript
// Help text
<ng-template #emptyChat>
  <div class="help-text">
    <h3>How to get started</h3>
    <ul>
      <li>Type your message in the input field</li>
      <li>Press Enter to send</li>
      <li>Use @ to mention team members</li>
    </ul>
  </div>
</ng-template>

// Brand/onboarding
<ng-template #emptyChat>
  <div class="onboarding">
    <img src="logo.png" alt="Brand">
    <p>Welcome! How can we help?</p>
  </div>
</ng-template>

// Loading state
<ng-template #emptyChat>
  <div class="loading">
    <div class="spinner"></div>
    <p>Loading messages...</p>
  </div>
</ng-template>
```

## Time Break Template

### Customize Time Separators

Use `timeBreakTemplate` to customize date/time separators between messages:

```typescript
@Component({
  imports: [ChatUIModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <div id="chatui" ejs-chatui 
         [user]="currentUserModel" 
         [showTimeBreak]="true"
         [timeBreakTemplate]="timeBreak">
      <ng-template #timeBreak let-messageDate="messageDate">
        <div class="time-break">
          📅 {{messageDate | date:'MMM d, yyyy'}}
        </div>
      </ng-template>
      <e-messages>
        <e-message text="Message from today" [author]="currentUserModel" [timeStamp]="today"></e-message>
        <e-message text="Message from yesterday" [author]="michaleUserModel" [timeStamp]="yesterday"></e-message>
      </e-messages>
    </div>
  `,
  styles: [`
    .time-break {
      text-align: center;
      color: #999;
      margin: 12px 0;
      font-size: 12px;
    }
  `]
})
export class AppComponent {
  public currentUserModel: UserModel = { user: 'Albert', id: 'user1' };
  public michaleUserModel: UserModel = { user: 'Michale', id: 'user2' };
  public today = new Date();
  public yesterday = new Date(new Date().setDate(new Date().getDate() - 1));
}
```

## Message Status

### Status Properties

Configure message delivery status:

```typescript
interface MessageStatus {
  iconCss?: string;   // Icon class (e.g., 'e-icon-check')
  text?: string;      // Status text (e.g., 'Delivered')
  tooltip?: string;   // Hover tooltip
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
          text="How are you?" 
          [author]="currentUserModel"
          [status]="sentStatus">
        </e-message>
        <e-message 
          text="Good! How are you?" 
          [author]="michaleUserModel"
          [status]="deliveredStatus">
        </e-message>
        <e-message 
          text="I'm doing great!" 
          [author]="currentUserModel"
          [status]="readStatus">
        </e-message>
      </e-messages>
    </div>
  `
})
export class AppComponent {
  public currentUserModel: UserModel = { user: 'Albert', id: 'user1' };
  public michaleUserModel: UserModel = { user: 'Michale', id: 'user2' };
  
  public sentStatus: any = {
    iconCss: 'e-icon-send',
    text: 'Sent',
    tooltip: 'Message sent'
  };
  
  public deliveredStatus: any = {
    iconCss: 'e-icon-check',
    text: 'Delivered',
    tooltip: 'Message delivered'
  };
  
  public readStatus: any = {
    iconCss: 'e-icon-check-double',
    text: 'Read',
    tooltip: 'Message read at 11:30 AM'
  };
}
```

## Timestamp Configuration

### Show or Hide Timestamps

Control timestamp visibility:

```typescript
// Hide timestamps (read-only view)
template: `
  <div id="chatui" ejs-chatui 
       [user]="currentUserModel" 
       [showTimeStamp]="false">
    <!-- Messages without timestamps -->
  </div>
`

// Show timestamps (default)
template: `
  <div id="chatui" ejs-chatui 
       [user]="currentUserModel" 
       [showTimeStamp]="true">
    <!-- Messages with timestamps -->
  </div>
`
```

### Timestamp Format

Control timestamp display format:

```typescript
@Component({
  imports: [ChatUIModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <div id="chatui" ejs-chatui 
         [user]="currentUserModel" 
         [timeStampFormat]="'dd/MM/yyyy HH:mm'">
      <e-messages>
        <e-message text="How are you?" [author]="currentUserModel" [timeStamp]="timestamp"></e-message>
      </e-messages>
    </div>
  `
})
export class AppComponent {
  public currentUserModel: UserModel = { user: 'Albert', id: 'user1' };
  public timestamp: Date = new Date('2024-01-02T10:30:00');
}
```

### Timestamp Format Examples

```typescript
// Default format
timeStampFormat: 'dd/MM/yyyy hh:mm a'        // 02/01/2024 10:30 AM

// 24-hour time
timeStampFormat: 'dd/MM/yyyy HH:mm'          // 02/01/2024 10:30

// Short date
timeStampFormat: 'MMM d'                     // Jan 2

// Time only
timeStampFormat: 'hh:mm a'                   // 10:30 AM

// Full date
timeStampFormat: 'EEEE, MMMM d, yyyy'       // Tuesday, January 2, 2024

// ISO format
timeStampFormat: 'yyyy-MM-dd HH:mm:ss'      // 2024-01-02 10:30:00
```

### Message-Specific Timestamps

```typescript
template: `
  <e-messages>
    <e-message 
      text="Message with custom timestamp" 
      [author]="currentUserModel"
      [timeStamp]="customDate"
      [timeStampFormat]="'HH:mm'">
    </e-message>
  </e-messages>
`
```

## Suggestion Template

### Customize Suggestion Rendering

Use `suggestionTemplate` to customize how suggestion items are displayed in the suggestions list:

```typescript
@Component({
  imports: [ChatUIModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <div id="chatui" ejs-chatui 
         [user]="currentUserModel"
         [suggestions]="suggestions"
         [suggestionTemplate]="suggestionItem">
      <ng-template #suggestionItem let-index="index" let-suggestion="suggestion">
        <div class="custom-suggestion">
          <span class="suggestion-icon">💡</span>
          <span class="suggestion-text">{{suggestion}}</span>
          <span class="suggestion-badge">#{{index + 1}}</span>
        </div>
      </ng-template>
      <e-messages>
        <!-- Messages -->
      </e-messages>
    </div>
  `,
  styles: [`
    .custom-suggestion {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 8px 12px;
      cursor: pointer;
    }
    
    .custom-suggestion:hover {
      background: #f0f0f0;
    }
    
    .suggestion-icon {
      font-size: 16px;
    }
    
    .suggestion-text {
      flex: 1;
      color: #333;
    }
    
    .suggestion-badge {
      background: #007bff;
      color: white;
      padding: 2px 6px;
      border-radius: 12px;
      font-size: 10px;
      font-weight: bold;
    }
  `]
})
export class AppComponent {
  public currentUserModel: UserModel = { user: 'Albert', id: 'user1' };
  public suggestions: string[] = [
    'How can I track my order?',
    'What are your business hours?',
    'Do you offer international shipping?'
  ];
}
```

### Suggestion Template Context

The template has access to two context variables:

```typescript
ng-template #suggestionItem let-index="index" let-suggestion="suggestion">
  {{index}}       <!-- 0-based index of the suggestion -->
  {{suggestion}}  <!-- The suggestion text string -->
</ng-template>
```

### Advanced Suggestion Templates

**Category-based suggestions:**

```typescript
@Component({
  imports: [ChatUIModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <div id="chatui" ejs-chatui 
         [user]="currentUserModel"
         [suggestions]="suggestions"
         [suggestionTemplate]="categorySuggestion">
      <ng-template #categorySuggestion let-index="index" let-suggestion="suggestion">
        <div class="category-suggestion">
          <span [class]="getCategoryIcon(suggestion)"></span>
          <div class="suggestion-content">
            <strong>{{getCategoryName(suggestion)}}</strong>
            <p>{{suggestion}}</p>
          </div>
        </div>
      </ng-template>
    </div>
  `,
  styles: [`
    .category-suggestion {
      display: flex;
      gap: 12px;
      padding: 12px;
      border-left: 3px solid transparent;
    }
    
    .category-suggestion:hover {
      background: #f8f9fa;
      border-left-color: #007bff;
    }
    
    .suggestion-content strong {
      display: block;
      font-size: 12px;
      color: #666;
      text-transform: uppercase;
    }
    
    .suggestion-content p {
      margin: 4px 0 0;
      color: #333;
    }
  `]
})
export class AppComponent {
  public currentUserModel: UserModel = { user: 'Albert', id: 'user1' };
  public suggestions: string[] = [
    'How can I track my order?',
    'What are your business hours?',
    'I need technical support'
  ];
  
  getCategoryName(suggestion: string): string {
    if (suggestion.includes('order')) return 'Orders';
    if (suggestion.includes('hours')) return 'General';
    if (suggestion.includes('support')) return 'Support';
    return 'Other';
  }
  
  getCategoryIcon(suggestion: string): string {
    if (suggestion.includes('order')) return '📦';
    if (suggestion.includes('hours')) return '🕐';
    if (suggestion.includes('support')) return '🛠️';
    return '💬';
  }
}
```

**Search-highlighted suggestions:**

```typescript
@Component({
  imports: [ChatUIModule, CommonModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <div id="chatui" ejs-chatui 
         [user]="currentUserModel"
         [suggestions]="filteredSuggestions"
         [suggestionTemplate]="highlightSuggestion">
      <ng-template #highlightSuggestion let-suggestion="suggestion">
        <div class="highlight-suggestion" [innerHTML]="highlightText(suggestion)"></div>
      </ng-template>
    </div>
  `,
  styles: [`
    .highlight-suggestion {
      padding: 8px 12px;
    }
    
    .highlight-suggestion:hover {
      background: #e8f4fd;
    }
    
    .highlight-suggestion mark {
      background: #ffeb3b;
      font-weight: bold;
      padding: 0;
    }
  `]
})
export class AppComponent {
  public currentUserModel: UserModel = { user: 'Albert', id: 'user1' };
  public searchQuery: string = 'order';
  public allSuggestions: string[] = [
    'How can I track my order?',
    'How do I cancel my order?',
    'What are your business hours?'
  ];
  
  get filteredSuggestions(): string[] {
    return this.allSuggestions.filter(s => 
      s.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }
  
  highlightText(text: string): string {
    if (!this.searchQuery) return text;
    const regex = new RegExp(`(${this.searchQuery})`, 'gi');
    return text.replace(regex, '<mark>$1</mark>');
  }
}
```

**Icon-based suggestions:**

```typescript
interface SuggestionItem {
  text: string;
  icon: string;
  color: string;
}

@Component({
  imports: [ChatUIModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <div id="chatui" ejs-chatui 
         [user]="currentUserModel"
         [suggestions]="getSuggestionTexts()"
         [suggestionTemplate]="iconSuggestion">
      <ng-template #iconSuggestion let-index="index">
        <div class="icon-suggestion" 
             [style.border-left-color]="suggestionItems[index].color">
          <span class="suggestion-icon">{{suggestionItems[index].icon}}</span>
          <span>{{suggestionItems[index].text}}</span>
        </div>
      </ng-template>
    </div>
  `,
  styles: [`
    .icon-suggestion {
      display: flex;
      align-items: center;
      gap: 10px;
      padding: 10px 12px;
      border-left: 3px solid;
    }
    
    .icon-suggestion:hover {
      background: #f5f5f5;
    }
    
    .suggestion-icon {
      font-size: 20px;
    }
  `]
})
export class AppComponent {
  public currentUserModel: UserModel = { user: 'Albert', id: 'user1' };
  public suggestionItems: SuggestionItem[] = [
    { text: 'Track my order', icon: '📦', color: '#4caf50' },
    { text: 'Contact support', icon: '💬', color: '#2196f3' },
    { text: 'Return an item', icon: '↩️', color: '#ff9800' }
  ];
  
  getSuggestionTexts(): string[] {
    return this.suggestionItems.map(item => item.text);
  }
}
```

### Use Cases for suggestionTemplate

1. **Customer Support**: Category icons and priority badges
2. **E-commerce**: Product-related suggestions with images
3. **Search**: Highlight matching terms in suggestions
4. **Chatbots**: Action buttons or quick replies with icons
5. **Multi-language**: Display suggestions in multiple languages side-by-side

## Typing Indicator Template

### Customize Typing Indicator

Use `typingUsersTemplate` to customize how typing indicators appear:

```typescript
@Component({
  imports: [ChatUIModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <div id="chatui" ejs-chatui 
         [user]="currentUserModel"
         [typingUsers]="typingUsers"
         [typingUsersTemplate]="typingIndicator">
      <ng-template #typingIndicator let-typingUsers="typingUsers">
        <div class="typing-indicator">
          <span *ngFor="let user of typingUsers" class="typing-user">
            {{user.user}} is typing...
          </span>
          <div class="typing-dots">
            <span></span><span></span><span></span>
          </div>
        </div>
      </ng-template>
      <e-messages>
        <!-- Messages -->
      </e-messages>
    </div>
  `,
  styles: [`
    .typing-indicator {
      display: flex;
      align-items: center;
      gap: 8px;
      padding: 8px;
      font-style: italic;
      color: #999;
    }
    
    .typing-user {
      font-weight: 500;
    }
    
    .typing-dots {
      display: flex;
      gap: 4px;
    }
    
    .typing-dots span {
      width: 6px;
      height: 6px;
      background: #999;
      border-radius: 50%;
      animation: typing 1.4s infinite;
    }
    
    .typing-dots span:nth-child(2) {
      animation-delay: 0.2s;
    }
    
    .typing-dots span:nth-child(3) {
      animation-delay: 0.4s;
    }
    
    @keyframes typing {
      0%, 60%, 100% { opacity: 0.5; }
      30% { opacity: 1; }
    }
  `]
})
export class AppComponent {
  public currentUserModel: UserModel = { user: 'Albert', id: 'user1' };
  public michaleUserModel: UserModel = { user: 'Michale', id: 'user2' };
  public typingUsers: UserModel[] = [];
  
  simulateTyping() {
    this.typingUsers = [this.michaleUserModel];
    setTimeout(() => {
      this.typingUsers = [];
    }, 3000);
  }
}
```

---
