# Appearance and Layout Configuration

## Table of Contents
- [Placeholder Customization](#placeholder-customization)
- [Width and Height Properties](#width-and-height-properties)
- [CSS Class Customization](#css-class-customization)
- [Compact Mode](#compact-mode)
- [Auto-Scroll Configuration](#auto-scroll-configuration)
- [Suggestions Display](#suggestions-display)

## Placeholder Customization

### Default Placeholder

The input field shows a default placeholder `"Type your message…"`. Customize it with the `placeholder` property:

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
         [placeholder]="placeholder">
      <e-messages>
        <e-message text="Hi Michale, are we on track for the deadline?" [author]="currentUserModel"></e-message>
        <e-message text="Yes, the design phase is complete." [author]="michaleUserModel"></e-message>
      </e-messages>
    </div>
  `
})
export class AppComponent {
  public placeholder: string = 'Start typing...';
  public currentUserModel: UserModel = { user: 'Albert', id: 'user1' };
  public michaleUserModel: UserModel = { user: 'Michale Suyama', id: 'user2' };
}
```

### Common Placeholder Examples

```typescript
// Support chat
placeholder: 'Describe your issue...'

// Team messaging
placeholder: '@mention someone or type your message'

// AI assistant
placeholder: 'Ask me anything...'

// Customer service
placeholder: 'How can we help? Type your message here.'
```

## Width and Height Properties

### Setting Width

Control chat component width with the `width` property:

```typescript
template: `
  <div id="chatui" ejs-chatui 
       [user]="currentUserModel" 
       width="450px">
    <!-- Messages -->
  </div>
`

// Or as percentage
width="100%"
width="80%"
```

### Setting Height

Control chat component height with the `height` property:

```typescript
template: `
  <div id="chatui" ejs-chatui 
       [user]="currentUserModel" 
       height="380px">
    <!-- Messages -->
  </div>
`

// Or with viewport units
height="80vh"
height="100%"
```

### Responsive Layout

Combine width/height with CSS media queries:

```typescript
@Component({
  imports: [ChatUIModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <div id="chatui" ejs-chatui 
         [user]="currentUserModel" 
         width="100%"
         height="500px">
      <!-- Messages -->
    </div>
  `,
  styles: [`
    @media (max-width: 768px) {
      #chatui {
        height: 300px !important;
      }
    }
  `]
})
export class AppComponent { }
```

## CSS Class Customization

### Apply Custom CSS Class

Use the `cssClass` property to apply custom styling:

```typescript
template: `
  <div id="chatui" ejs-chatui 
       [user]="currentUserModel" 
       cssClass="custom-container">
    <!-- Messages -->
  </div>
`,
styles: [`
  .custom-container {
    border: 2px solid #007bff;
    border-radius: 8px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  }
  
  .custom-container .e-input-group {
    border-top: 1px solid rgba(255, 255, 255, 0.2);
  }
`]
```

### Multiple CSS Classes

Combine multiple classes with spaces:

```typescript
cssClass="custom-container dark-theme elevated"
```

### Predefined CSS Selectors

Style chat elements with Syncfusion classes:

```css
/* Message area */
.e-chat-messages { }

/* Message bubble */
.e-message { }

/* Current user message (right side) */
.e-message.e-message-right { }

/* Other user message (left side) */
.e-message.e-message-left { }

/* Input field */
.e-input-group { }

/* Send button */
.e-btn-primary { }

/* Avatar */
.e-avatar { }

/* Header */
.e-header { }

/* Footer */
.e-footer { }
```

### Custom Styling Example

```typescript
styles: [`
  /* Dark theme */
  .dark-theme {
    background: #1e1e1e;
    color: #fff;
  }
  
  .dark-theme .e-message {
    background: #333;
    color: #fff;
  }
  
  .dark-theme .e-input-group {
    background: #2d2d2d;
    border: 1px solid #444;
  }
  
  /* Elevated shadow effect */
  .elevated {
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.15);
  }
  
  /* Rounded corners */
  .elevated {
    border-radius: 12px;
    overflow: hidden;
  }
`]
```

## Compact Mode

### Enable Compact Mode

Use `enableCompactMode` to align all messages to the left:

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
        <e-message text="I'm doing well, Thanks for asking!" [author]="currentUserModel"></e-message>
      </e-messages>
    </div>
  `
})
export class AppComponent {
  public currentUserModel: UserModel = { user: 'Albert', id: 'user1' };
  public michaleUserModel: UserModel = { user: 'Michale Suyama', id: 'user2' };
}
```

**Default:** `false` - Messages alternate left/right based on sender
**When true:** All messages left-aligned (compact layout)

### Use Cases for Compact Mode

- **Group conversations** - Multiple speakers, left-aligned reads better
- **Mobile devices** - Space-constrained interfaces benefit from single-column layout
- **Documentation chats** - Uniform column width improves readability
- **Accessibility** - Simplified layout reduces cognitive load

## Auto-Scroll Configuration

### Enable Auto-Scroll

Use `autoScrollToBottom` to automatically scroll when new messages arrive:

```typescript
@Component({
  imports: [ChatUIModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <div id="chatui" ejs-chatui 
         [user]="currentUserModel" 
         [autoScrollToBottom]="true" 
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
}
```

**Behavior:**
- **Default (false)** - Manual scrolling required, FAB (Floating Action Button) appears
- **When true** - Auto-scrolls to bottom for sent messages and when scroll is at bottom

### Scrolling Behavior Explained

```
Auto-Scroll Active (true):
✓ User sends message → Auto-scrolls to bottom
✓ Other user sends message while scroll is at bottom → Auto-scrolls
✗ User scrolls up to view history → Stops auto-scrolling (manual control)
✓ User scrolls back to bottom → Resumes auto-scroll
```

## Suggestions Display

### Add Quick Reply Suggestions

Use the `suggestions` property to show quick-reply buttons:

```typescript
@Component({
  imports: [ChatUIModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <div id="chatui" ejs-chatui 
         [user]="currentUserModel" 
         [suggestions]="suggestions" 
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
  
  public suggestions: any[] = [
    { text: 'Thanks' },
    { text: 'Welcome' },
    { text: 'No problem' },
    { text: 'Perfect!' }
  ];
}
```

### Use Cases for Suggestions

```typescript
// Customer support
suggestions: [
  { text: 'Yes, that helped' },
  { text: 'No, still need help' },
  { text: 'Can I escalate?' }
]

// Feedback collection
suggestions: [
  { text: 'Very satisfied' },
  { text: 'Satisfied' },
  { text: 'Neutral' },
  { text: 'Unsatisfied' }
]

// Quick actions
suggestions: [
  { text: 'Show billing' },
  { text: 'Track order' },
  { text: 'Contact support' }
]
```

## Layout Combinations

### Example: Mobile-Optimized Chat

```typescript
@Component({
  imports: [ChatUIModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <div id="chatui" ejs-chatui 
         [user]="currentUserModel"
         width="100%"
         height="75vh"
         [enableCompactMode]="true"
         [autoScrollToBottom]="true"
         [placeholder]="'Type message...'"
         cssClass="mobile-chat">
      <e-messages>
        <!-- Messages -->
      </e-messages>
    </div>
  `,
  styles: [`
    .mobile-chat {
      max-width: 600px;
      margin: 0 auto;
      border-radius: 12px;
      overflow: hidden;
    }
  `]
})
export class AppComponent { }
```

### Example: Desktop Full-Width Chat

```typescript
@Component({
  imports: [ChatUIModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <div id="chatui" ejs-chatui 
         [user]="currentUserModel"
         width="100%"
         height="100vh"
         [enableCompactMode]="false"
         [autoScrollToBottom]="false"
         [suggestions]="suggestions"
         cssClass="desktop-chat">
      <e-messages>
        <!-- Messages -->
      </e-messages>
    </div>
  `,
  styles: [`
    .desktop-chat {
      height: calc(100vh - 60px);
    }
  `]
})
export class AppComponent { }
```

---
