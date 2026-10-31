# Getting Started with Vue Chat UI

This guide provides step-by-step instructions for setting up and implementing the Syncfusion Vue Chat UI component in your Vue 3 application using the Composition API.

## Prerequisites

**System Requirements:**
- Node.js 14.x or later
- Vue 3.x
- Modern browser with ES6 support

**Package:** `@syncfusion/ej2-vue-interactive-chat`

## Installation

### Step 1: Set up Vite Project

Create a new Vue 3 project using Vite:

```bash
npm create vite@latest my-chat-app
```

Select options:
- **Framework:** Vue
- **Variant:** JavaScript

Navigate to the project and install dependencies:

```bash
cd my-chat-app
npm install
```

### Step 2: Install Chat UI Package

Install the Syncfusion Vue Chat UI component:

```bash
npm install @syncfusion/ej2-vue-interactive-chat --save
```

**Dependencies Installed:**
- `@syncfusion/ej2-base` - Core utilities
- `@syncfusion/ej2-inputs` - Input components
- `@syncfusion/ej2-navigations` - Navigation components
- `@syncfusion/ej2-buttons` - Button components
- `@syncfusion/ej2-popups` - Popup components
- `@syncfusion/ej2-dropdowns` - Dropdown components
- `@syncfusion/ej2-splitbuttons` - Split button components
- `@syncfusion/ej2-interactive-chat` - Chat UI component

## CSS Theme Configuration

### Import Required Styles

To install the material3 theme package, use the following command:

```bash
npm install @syncfusion/ej2-material3-theme --save
```

Import the Material3 theme and dependency styles in your component's `<style>` section:

```vue
<style>
@import "../node_modules/@syncfusion/ej2-material3-theme/styles/chat-ui/index.css";
</style>
```

**⚠️ Important:** The order of CSS imports must follow the dependency graph. Always import `ej2-base` first, followed by dependencies, then `ej2-interactive-chat`.

**Available Themes:**
- `material3.css` - Material Design 3
- `material.css` - Material Design
- `bootstrap5.css` - Bootstrap 5
- `bootstrap4.css` - Bootstrap 4
- `fabric.css` - Microsoft Fabric
- `tailwind.css` - Tailwind CSS
- `fluent.css` - Microsoft Fluent

## Basic Implementation

### Minimal Chat UI

The simplest implementation requires importing the component and rendering it:

```vue
<template>
  <div class="chat-container">
    <ejs-chatui></ejs-chatui>
  </div>
</template>

<script setup>
import { ChatUIComponent as EjsChatui } from "@syncfusion/ej2-vue-interactive-chat";
</script>

<style>
@import "../node_modules/@syncfusion/ej2-material3-theme/styles/chat-ui/index.css";

.chat-container {
  height: 400px;
  width: 500px;
  margin: 0 auto;
}
</style>
```

This creates an empty chat UI with default header ("Chat") and an input textarea.

## Configuring Users

### Define Current User

The `user` property defines the current user interacting with the chat. This is essential for distinguishing messages sent by the current user from others.

```vue
<template>
  <div class="chat-container">
    <ejs-chatui :user="currentUser"></ejs-chatui>
  </div>
</template>

<script setup>
import { ChatUIComponent as EjsChatui } from "@syncfusion/ej2-vue-interactive-chat";

const currentUser = {
  id: "user1",
  user: "Albert"
};
</script>
```

**User Properties:**
- `id` - Unique identifier for the user (required)
- `user` - Display name (required)
- `avatarUrl` - URL to user's avatar image (optional)
- `avatarBgColor` - Background color for avatar (optional, e.g., "#FF5733")
- `statusIconCss` - CSS class for status icon (optional)
- `cssClass` - Additional CSS classes for styling (optional)

### User with Avatar

```vue
<script setup>
const currentUser = {
  id: "user1",
  user: "Albert",
  avatarUrl: "./assets/albert.png",
  avatarBgColor: "#4CAF50"
};
</script>
```

**Avatar Fallback:** If `avatarUrl` is not provided, the component displays the user's initials (first letter of first and last name) as the avatar.

## Adding Messages

### Using Message Directives

Add messages declaratively using `<e-messages>` and `<e-message>` directives:

```vue
<template>
  <div class="chat-container">
    <ejs-chatui :user="currentUser">
      <e-messages>
        <e-message 
          :author="currentUser" 
          text="Hi Michale, are we on track for the deadline?"
        ></e-message>
        <e-message 
          :author="michaleUser" 
          text="Yes, the design phase is complete."
        ></e-message>
        <e-message 
          :author="currentUser" 
          text="I'll review it and send feedback by today."
        ></e-message>
      </e-messages>
    </ejs-chatui>
  </div>
</template>

<script setup>
import { 
  ChatUIComponent as EjsChatui, 
  MessagesDirective as EMessages, 
  MessageDirective as EMessage 
} from "@syncfusion/ej2-vue-interactive-chat";

const currentUser = {
  id: "user1",
  user: "Albert"
};

const michaleUser = {
  id: "user2",
  user: "Michale Suyama"
};
</script>
```

**Required Message Properties:**
- `author` - UserModel object identifying who sent the message
- `text` - Message content

**Optional Message Properties:**
- `id` - Unique message identifier
- `timestamp` - When message was sent (Date object)
- `isPinned` - Whether message is pinned (boolean)
- `isForwarded` - Whether message was forwarded (boolean)
- `replyTo` - Reference to original message for replies

### Messages Display Behavior

- **Current user messages:** Displayed on the right side with primary color styling
- **Other user messages:** Displayed on the left side with default styling
- **Avatars:** Shown for each message based on the author's configuration

## Complete Working Example

```vue
<template>
  <div id="app">
    <div class="chat-container">
      <ejs-chatui 
        :user="currentUser"
        headerText="Team Chat"
      >
        <e-messages>
          <e-message 
            :author="currentUser" 
            text="Good morning team! Ready for the sprint planning?"
          ></e-message>
          <e-message 
            :author="teamMember1" 
            text="Good morning! Yes, I've prepared the backlog items."
          ></e-message>
          <e-message 
            :author="teamMember2" 
            text="Morning! I'll join in 5 minutes."
          ></e-message>
          <e-message 
            :author="currentUser" 
            text="Perfect! Let's start at 9:30 AM."
          ></e-message>
        </e-messages>
      </ejs-chatui>
    </div>
  </div>
</template>

<script setup>
import { 
  ChatUIComponent as EjsChatui, 
  MessagesDirective as EMessages, 
  MessageDirective as EMessage 
} from "@syncfusion/ej2-vue-interactive-chat";

const currentUser = {
  id: "user1",
  user: "Albert",
  avatarUrl: "./assets/albert.png"
};

const teamMember1 = {
  id: "user2",
  user: "Michale Suyama",
  avatarUrl: "./assets/michale.png"
};

const teamMember2 = {
  id: "user3",
  user: "Janet Leverling",
  avatarUrl: "./assets/janet.png"
};
</script>

<style>
@import "../node_modules/@syncfusion/ej2-material3-theme/styles/chat-ui/index.css";

#app {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f5f5f5;
}

.chat-container {
  height: 500px;
  width: 450px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  border-radius: 8px;
  overflow: hidden;
}
</style>
```

## Running the Application

Start the development server:

```bash
npm run dev
```

The application will run at `http://localhost:5173` (default Vite port).

## Component Registration Details

**Composition API Import Pattern:**

```javascript
import { ChatUIComponent as EjsChatui } from "@syncfusion/ej2-vue-interactive-chat";
```

**Using `as` Alias:** The `as EjsChatui` allows you to use `<ejs-chatui>` in the template. Vue automatically converts camelCase to kebab-case for component tags.

**Message Directives:** To use `<e-messages>` and `<e-message>`, you must import:

```javascript
import { 
  MessagesDirective as EMessages, 
  MessageDirective as EMessage 
} from "@syncfusion/ej2-vue-interactive-chat";
```
