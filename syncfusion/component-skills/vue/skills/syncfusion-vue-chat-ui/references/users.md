# Users and Avatars

This guide covers user configuration, avatar display, and user-related customization in the Vue Chat UI component.

## Overview

The User Model defines participants in the chat. Each user has unique identification, display properties, and visual customization options. The `user` property on the Chat UI component identifies the current user, while message `author` properties identify message senders.

## User Model Structure

### Required Properties

**`id`** - Unique identifier for the user (string, required)
**`user`** - Display name (string, required)

### Optional Properties

**`avatarUrl`** - URL to user's avatar image (string)
**`avatarBgColor`** - Background color for avatar (string, hex format)
**`statusIconCss`** - CSS class for status icon (string)
**`cssClass`** - Additional CSS classes for styling (string)

## Basic User Configuration

### Minimal User Setup

```vue
<script setup>
import { ChatUIComponent as EjsChatui } from "@syncfusion/ej2-vue-interactive-chat";

const currentUser = {
  id: "user1",
  user: "Albert"
};
</script>

<template>
  <ejs-chatui :user="currentUser"></ejs-chatui>
</template>
```

**Behavior:**
- User name "Albert" displays in messages
- Initials "A" appear as avatar (no avatarUrl provided)
- Messages from this user appear on the right side
- Default avatar background color from theme

### Multiple Users

```vue
<script setup>
const currentUser = {
  id: "user1",
  user: "Albert Johnson"
};

const teamMember1 = {
  id: "user2",
  user: "Michale Suyama"
};

const teamMember2 = {
  id: "user3",
  user: "Janet Leverling"
};
</script>

<template>
  <ejs-chatui :user="currentUser">
    <e-messages>
      <e-message :author="currentUser" text="Hello team!"></e-message>
      <e-message :author="teamMember1" text="Hi Albert!"></e-message>
      <e-message :author="teamMember2" text="Good morning!"></e-message>
    </e-messages>
  </ejs-chatui>
</template>
```

**Identification:**
- `id` property distinguishes users (required for tracking)
- `user` property displays in UI (required for visibility)

## Avatar Configuration

### Avatar URL

Provide an image URL for the user's avatar:

```vue
<script setup>
const currentUser = {
  id: "user1",
  user: "Albert Johnson",
  avatarUrl: "https://example.com/avatars/albert.png"
};
</script>
```

**Supported Image Formats:**
- PNG, JPG, JPEG, GIF, SVG
- Base64 encoded images
- Relative paths: `"./assets/avatar.png"`
- Absolute URLs: `"https://cdn.example.com/avatar.png"`

**Image Recommendations:**
- Square aspect ratio (e.g., 128x128, 256x256)
- File size < 100KB for performance
- Accessible via HTTPS
- Consider CDN for production

### Avatar Fallback (Initials)

When `avatarUrl` is not provided or fails to load, initials are displayed:

```vue
<script setup>
const user1 = {
  id: "user1",
  user: "Albert Johnson"  // Displays "AJ"
};

const user2 = {
  id: "user2",
  user: "Michale"  // Displays "M"
};

const user3 = {
  id: "user3",
  user: "O"  // Displays "O"
};
</script>
```

**Initial Extraction Rules:**
- First letter of first name + first letter of last name
- If only one name: first letter only
- Uppercase transformation applied automatically

### Avatar Background Color

Customize avatar background color with hexadecimal values:

```vue
<script setup>
const currentUser = {
  id: "user1",
  user: "Albert",
  avatarBgColor: "#4CAF50"  // Green
};

const michaleUser = {
  id: "user2",
  user: "Michale",
  avatarBgColor: "#2196F3"  // Blue
};

const janetUser = {
  id: "user3",
  user: "Janet",
  avatarBgColor: "#FF5722"  // Deep Orange
};
</script>
```

**Color Format:**
- Hexadecimal: `"#4CAF50"`, `"#F44336"`
- 3-digit hex: `"#4CF"`, `"#F43"`
- 6-digit hex preferred for consistency

**Theme Default:** If not specified, color is derived from current theme.

### Complete Avatar Configuration

```vue
<script setup>
const currentUser = {
  id: "user1",
  user: "Albert Johnson",
  avatarUrl: "./assets/albert.png",
  avatarBgColor: "#2196F3"
};
</script>

<template>
  <ejs-chatui :user="currentUser">
    <e-messages>
      <e-message :author="currentUser" text="Hello!"></e-message>
    </e-messages>
  </ejs-chatui>
</template>
```

**Priority:** If `avatarUrl` is valid, `avatarBgColor` is ignored. If image fails, initials with background color are shown.

## Status Icons

Indicate user presence status (online, away, busy, offline):

### Predefined Status Classes

```vue
<script setup>
const onlineUser = {
  id: "user1",
  user: "Albert",
  statusIconCss: "e-icons e-user-online"
};

const awayUser = {
  id: "user2",
  user: "Michale",
  statusIconCss: "e-icons e-user-away"
};

const busyUser = {
  id: "user3",
  user: "Janet",
  statusIconCss: "e-icons e-user-busy"
};

const offlineUser = {
  id: "user4",
  user: "Andrew",
  statusIconCss: "e-icons e-user-offline"
};
</script>
```

**Status Icons Table:**

| Status | Icon Class | Visual Indicator |
|--------|------------|------------------|
| Available/Online | `e-icons e-user-online` | Green dot |
| Away | `e-icons e-user-away` | Yellow dot |
| Busy/DND | `e-icons e-user-busy` | Red dot |
| Offline | `e-icons e-user-offline` | Gray dot |

### Custom Status Icons

Use custom CSS classes for unique status indicators:

```vue
<script setup>
const currentUser = {
  id: "user1",
  user: "Albert",
  statusIconCss: "custom-status-streaming"
};
</script>

<style>
.custom-status-streaming::before {
  content: "🔴";
  font-size: 12px;
}
</style>
```

## CSS Class Customization

Apply custom styles to user messages and avatars:

### Basic CSS Class

```vue
<script setup>
const premiumUser = {
  id: "user1",
  user: "Albert",
  cssClass: "premium-user"
};
</script>

<style>
.premium-user .e-chat-message {
  background-color: #FFF9C4;
  border-left: 3px solid #FFD700;
}

.premium-user .e-avatar {
  border: 2px solid #FFD700;
}
</style>
```

### Multiple CSS Classes

```vue
<script setup>
const adminUser = {
  id: "user1",
  user: "Admin",
  cssClass: "admin-user priority-high"
};
</script>

<style>
.admin-user .e-chat-message {
  background: linear-gradient(to right, #667eea 0%, #764ba2 100%);
  color: white;
}

.priority-high {
  font-weight: 600;
}
</style>
```

### User Role-Based Styling

```vue
<script setup>
const users = {
  admin: {
    id: "admin1",
    user: "System Admin",
    cssClass: "user-role-admin",
    avatarBgColor: "#D32F2F"
  },
  moderator: {
    id: "mod1",
    user: "Moderator",
    cssClass: "user-role-moderator",
    avatarBgColor: "#1976D2"
  },
  member: {
    id: "member1",
    user: "Member",
    cssClass: "user-role-member",
    avatarBgColor: "#388E3C"
  }
};
</script>

<style>
.user-role-admin .e-avatar {
  box-shadow: 0 0 10px rgba(211, 47, 47, 0.5);
}

.user-role-moderator .e-chat-message {
  border-left: 3px solid #1976D2;
}

.user-role-member .e-chat-message {
  opacity: 0.95;
}
</style>
```

## Typing Users

Display typing indicators for users currently composing messages:

### Single Typing User

```vue
<script setup>
import { ref } from 'vue';

const currentUser = { id: "user1", user: "Albert" };
const michaleUser = { id: "user2", user: "Michale" };

const typingUsers = ref([michaleUser]);
</script>

<template>
  <ejs-chatui 
    :user="currentUser"
    :typingUsers="typingUsers"
  >
    <e-messages>
      <e-message :author="currentUser" text="Are you there?"></e-message>
    </e-messages>
  </ejs-chatui>
</template>
```

**Behavior:**
- Shows "Michale is typing..." indicator
- Appears below messages, above input field

### Multiple Typing Users

```vue
<script setup>
import { ref } from 'vue';

const typingUsers = ref([
  { id: "user2", user: "Michale" },
  { id: "user3", user: "Janet" }
]);
</script>

<template>
  <ejs-chatui 
    :user="currentUser"
    :typingUsers="typingUsers"
  ></ejs-chatui>
</template>
```

**Behavior:**
- Shows "Michale and Janet are typing..."
- Automatically formats for multiple users

### Dynamic Typing Indicator

```vue
<script setup>
import { ref } from 'vue';
import { ChatUIComponent as EjsChatui } from "@syncfusion/ej2-vue-interactive-chat";

const currentUser = { id: "user1", user: "Albert" };
const michaleUser = { id: "user2", user: "Michale" };

const typingUsers = ref([]);

// Simulate user starting to type
const startTyping = () => {
  typingUsers.value = [michaleUser];
};

// Simulate user stopping typing
const stopTyping = () => {
  typingUsers.value = [];
};

// Auto-remove typing indicator after 3 seconds
const handleTyping = () => {
  startTyping();
  setTimeout(stopTyping, 3000);
};
</script>

<template>
  <div>
    <button @click="handleTyping">Simulate Typing</button>
    <ejs-chatui 
      :user="currentUser"
      :typingUsers="typingUsers"
    ></ejs-chatui>
  </div>
</template>
```

## Mention Users

Define users available for @mention functionality:

### Basic Mention Configuration

```vue
<script setup>
const currentUser = { id: "user1", user: "Albert" };

const mentionUsers = [
  { id: "user2", user: "Alice" },
  { id: "user3", user: "Bob" },
  { id: "user4", user: "Charlie" },
  { id: "user5", user: "Diana" }
];
</script>

<template>
  <ejs-chatui 
    :user="currentUser"
    mentionTriggerChar="@"
    :mentionUsers="mentionUsers"
  ></ejs-chatui>
</template>
```

**Behavior:**
- Typing "@" shows mention suggestions
- Filtering by typed characters
- Select user to insert mention

### Mentions with Avatars

```vue
<script setup>
const mentionUsers = [
  { 
    id: "user2", 
    user: "Alice", 
    avatarUrl: "./assets/alice.png"
  },
  { 
    id: "user3", 
    user: "Bob", 
    avatarBgColor: "#4CAF50"
  }
];
</script>
```

**Behavior:**
- Mention popup shows user avatars
- Improves user recognition
- Consistent with message avatars

## Complete User Configuration Example

```vue
<template>
  <div class="chat-container" style="height: 500px; width: 600px;">
    <ejs-chatui 
      :user="currentUser"
      :typingUsers="typingUsers"
      mentionTriggerChar="@"
      :mentionUsers="mentionUsers"
    >
      <e-messages>
        <e-message 
          :author="currentUser" 
          text="Hi team! @Alice can you review the doc?"
        ></e-message>
        <e-message 
          :author="alice" 
          text="Sure! I'll check it today."
        ></e-message>
      </e-messages>
    </ejs-chatui>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { 
  ChatUIComponent as EjsChatui,
  MessagesDirective as EMessages,
  MessageDirective as EMessage
} from "@syncfusion/ej2-vue-interactive-chat";

const currentUser = {
  id: "user1",
  user: "Albert Johnson",
  avatarUrl: "./assets/albert.png",
  avatarBgColor: "#2196F3",
  statusIconCss: "e-icons e-user-online",
  cssClass: "admin-user"
};

const alice = {
  id: "user2",
  user: "Alice Smith",
  avatarUrl: "./assets/alice.png",
  avatarBgColor: "#4CAF50",
  statusIconCss: "e-icons e-user-online"
};

const bob = {
  id: "user3",
  user: "Bob Wilson",
  avatarBgColor: "#FF9800",
  statusIconCss: "e-icons e-user-away"
};

const mentionUsers = [alice, bob];
const typingUsers = ref([]);
</script>

<style>
.admin-user .e-avatar {
  border: 2px solid #FFD700;
  box-shadow: 0 0 5px rgba(255, 215, 0, 0.5);
}

.admin-user .e-chat-message {
  font-weight: 500;
}
</style>
```

## Best Practices

### User IDs

- **Always unique:** Use database IDs or UUIDs
- **Consistent format:** Maintain same ID structure
- **Immutable:** Don't change user IDs during session

### Avatar URLs

- **CDN hosting:** Use CDN for better performance
- **Fallback handling:** Always provide `avatarBgColor`
- **Responsive images:** Use appropriate sizes
- **Error handling:** Test broken image scenarios

### Status Updates

- **Real-time sync:** Update status from backend
- **Heartbeat mechanism:** Regular status checks
- **Offline detection:** Handle disconnections

### Performance

- **Lazy load avatars:** Load images as needed
- **Cache avatars:** Prevent repeated downloads
- **Optimize images:** Compress avatar files
- **Limit typing users:** Show max 3-5 users typing
