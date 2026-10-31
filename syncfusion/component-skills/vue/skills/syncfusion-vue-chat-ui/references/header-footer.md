# Header and Footer Configuration

## Table of Contents
- [Header Configuration](#header-configuration)
- [Header Toolbar](#header-toolbar)
- [Footer Configuration](#footer-configuration)
- [Visibility Control](#visibility-control)

## Header Configuration

### Show/Hide Header

Control header visibility with the `showHeader` property:

```vue
<template>
  <ejs-chatui 
    :showHeader="false"
    :user="currentUser"
  ></ejs-chatui>
</template>
```

**Default:** `true`

**Use Cases:**
- Embedded chat widgets (header in parent component)
- Minimalist interfaces
- Custom header implementations
- Mobile optimized layouts

### Header Text

Set the title displayed in the header:

```vue
<template>
  <ejs-chatui 
    headerText="Customer Support"
    :user="currentUser"
  ></ejs-chatui>
</template>
```

**Default:** `"Chat"`

**Common Examples:**
- User names: `"Michale Suyama"`
- Group names: `"Project Team"`
- Department: `"Technical Support"`
- Context: `"Order #12345 Discussion"`

### Header Icon

Customize the header icon with CSS classes:

```vue
<template>
  <ejs-chatui 
    headerText="Team Chat"
    headerIconCss="e-icons e-people"
    :user="currentUser"
  ></ejs-chatui>
</template>
```

**Common Icon Classes:**
- `"e-icons e-people"` - Group chat
- `"e-icons e-comment"` - Message icon
- `"e-icons e-user"` - Single user
- `"e-icons e-support"` - Support chat
- Custom icons: `"custom-icon-class"`

### Complete Header Configuration

```vue
<template>
  <ejs-chatui 
    :showHeader="true"
    headerText="Sales Department"
    headerIconCss="e-icons e-briefcase"
    :user="currentUser"
  ></ejs-chatui>
</template>
```

## Header Toolbar

Configure toolbar items in the header for actions like call, video, settings:

### Basic Toolbar Configuration

```vue
<script setup>
const headerToolbar = {
  items: [
    { 
      type: 'Button', 
      iconCss: 'e-icons e-phone', 
      tooltip: 'Voice Call' 
    },
    { 
      type: 'Button', 
      iconCss: 'e-icons e-video', 
      tooltip: 'Video Call' 
    },
    { 
      type: 'Button', 
      iconCss: 'e-icons e-settings', 
      tooltip: 'Settings' 
    }
  ]
};
</script>

<template>
  <ejs-chatui 
    :user="currentUser"
    :headerToolbar="headerToolbar"
  ></ejs-chatui>
</template>
```

### Toolbar Item Properties

**type** - Item type (usually `"Button"`)
**iconCss** - CSS class for icon
**tooltip** - Hover tooltip text
**text** - Display text (optional)
**align** - Alignment: `"Left"`, `"Right"`, `"Center"`
**cssClass** - Custom CSS class
**disabled** - Disable state (boolean)
**visible** - Visibility (boolean)
**tabIndex** - Tab order
**template** - Custom HTML template

### Toolbar with Text and Icons

```vue
<script setup>
const headerToolbar = {
  items: [
    { 
      type: 'Button', 
      iconCss: 'e-icons e-search', 
      text: 'Search',
      tooltip: 'Search messages' 
    },
    { 
      type: 'Button', 
      iconCss: 'e-icons e-more-vertical', 
      tooltip: 'More options' 
    }
  ]
};
</script>
```

### Toolbar Item Alignment

```vue
<script setup>
const headerToolbar = {
  items: [
    { 
      type: 'Button', 
      iconCss: 'e-icons e-back', 
      align: 'Left',
      tooltip: 'Back'
    },
    { 
      type: 'Button', 
      iconCss: 'e-icons e-phone', 
      align: 'Right',
      tooltip: 'Call'
    },
    { 
      type: 'Button', 
      iconCss: 'e-icons e-video', 
      align: 'Right',
      tooltip: 'Video'
    }
  ]
};
</script>
```

### Toolbar Item Click Event

Handle clicks on toolbar items:

```vue
<script setup>
import { ref } from 'vue';

const chatRef = ref(null);

const headerToolbar = {
  items: [
    { 
      type: 'Button', 
      iconCss: 'e-icons e-phone', 
      tooltip: 'Voice Call',
      id: 'voiceCall'
    },
    { 
      type: 'Button', 
      iconCss: 'e-icons e-video', 
      tooltip: 'Video Call',
      id: 'videoCall'
    },
    { 
      type: 'Button', 
      iconCss: 'e-icons e-settings', 
      tooltip: 'Settings',
      id: 'settings'
    }
  ],
  itemClicked: (args) => {
    console.log('Toolbar item clicked:', args.item);
    
    switch(args.item.id) {
      case 'voiceCall':
        initiateVoiceCall();
        break;
      case 'videoCall':
        initiateVideoCall();
        break;
      case 'settings':
        openSettings();
        break;
    }
    
    // Cancel default action if needed
    // args.cancel = true;
  }
};

const initiateVoiceCall = () => {
  console.log('Starting voice call...');
};

const initiateVideoCall = () => {
  console.log('Starting video call...');
};

const openSettings = () => {
  console.log('Opening settings...');
};
</script>

<template>
  <ejs-chatui 
    ref="chatRef"
    :user="currentUser"
    :headerToolbar="headerToolbar"
  ></ejs-chatui>
</template>
```

### Toolbar with Custom Template

```vue
<script setup>
const headerToolbar = {
  items: [
    {
      type: 'Button',
      template: '<button class="custom-btn">Custom Action</button>'
    }
  ]
};
</script>

<style>
.custom-btn {
  background: #4CAF50;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
}
</style>
```

### Dynamic Toolbar Items

```vue
<script setup>
import { ref, computed } from 'vue';

const isVideoEnabled = ref(true);

const headerToolbar = computed(() => ({
  items: [
    { 
      type: 'Button', 
      iconCss: 'e-icons e-phone', 
      tooltip: 'Call' 
    },
    ...(isVideoEnabled.value ? [{
      type: 'Button', 
      iconCss: 'e-icons e-video', 
      tooltip: 'Video Call' 
    }] : []),
    { 
      type: 'Button', 
      iconCss: 'e-icons e-settings', 
      tooltip: 'Settings' 
    }
  ]
}));

const toggleVideo = () => {
  isVideoEnabled.value = !isVideoEnabled.value;
};
</script>
```

### Toolbar with Disabled Items

```vue
<script setup>
import { ref } from 'vue';

const isCallActive = ref(false);

const headerToolbar = {
  items: [
    { 
      type: 'Button', 
      iconCss: 'e-icons e-phone', 
      tooltip: 'Call',
      disabled: isCallActive.value
    },
    { 
      type: 'Button', 
      iconCss: 'e-icons e-end-call', 
      tooltip: 'End Call',
      disabled: !isCallActive.value
    }
  ]
};
</script>
```

## Footer Configuration

### Show/Hide Footer

Control footer visibility:

```vue
<template>
  <ejs-chatui 
    :showFooter="false"
    :user="currentUser"
  ></ejs-chatui>
</template>
```

**Default:** `true`

**Use Cases:**
- View-only mode (no message input)
- Archived conversations
- Display-only chat history
- Custom footer implementations

### Footer Template

Customize the entire footer section:

```vue
<script setup>
import { ref } from 'vue';

const footerTemplate = () => {
  return `
    <div class="custom-footer">
      <input type="text" placeholder="Type here..." class="custom-input" />
      <button class="custom-send-btn">Send</button>
    </div>
  `;
};
</script>

<template>
  <ejs-chatui 
    :user="currentUser"
    :footerTemplate="footerTemplate"
  ></ejs-chatui>
</template>

<style>
.custom-footer {
  display: flex;
  padding: 12px;
  gap: 8px;
  background: #f5f5f5;
}

.custom-input {
  flex: 1;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 20px;
  outline: none;
}

.custom-send-btn {
  padding: 10px 20px;
  background: #4CAF50;
  color: white;
  border: none;
  border-radius: 20px;
  cursor: pointer;
}
</style>
```

### Footer with Action Buttons

```vue
<script setup>
const footerTemplate = `
  <div style="display: flex; align-items: center; padding: 12px; gap: 8px;">
    <button class="action-btn" onclick="addEmoji()">😊</button>
    <button class="action-btn" onclick="attachFile()">📎</button>
    <input type="text" placeholder="Type message..." style="flex: 1; padding: 8px; border-radius: 16px; border: 1px solid #ddd;" />
    <button class="action-btn send" onclick="sendMessage()">➤</button>
  </div>
`;
</script>

<style>
.action-btn {
  width: 36px;
  height: 36px;
  border: none;
  background: transparent;
  font-size: 18px;
  cursor: pointer;
  border-radius: 50%;
  transition: background 0.2s;
}

.action-btn:hover {
  background: rgba(0,0,0,0.05);
}

.action-btn.send {
  background: #2196F3;
  color: white;
}
</style>
```

## Visibility Control

### Hide Both Header and Footer

```vue
<template>
  <ejs-chatui 
    :showHeader="false"
    :showFooter="false"
    :user="currentUser"
  >
    <e-messages>
      <e-message :author="currentUser" text="View-only mode"></e-message>
    </e-messages>
  </ejs-chatui>
</template>
```

**Use Cases:**
- Embedded message display
- Chat history viewer
- Screenshot/export mode
- Read-only conversations

### Conditional Visibility

```vue
<script setup>
import { ref } from 'vue';

const isEditable = ref(true);
const showHeader = ref(true);

const toggleEditMode = () => {
  isEditable.value = !isEditable.value;
};
</script>

<template>
  <div>
    <button @click="toggleEditMode">
      {{ isEditable ? 'View Only' : 'Enable Editing' }}
    </button>
    
    <ejs-chatui 
      :showHeader="showHeader"
      :showFooter="isEditable"
      :user="currentUser"
    ></ejs-chatui>
  </div>
</template>
```

## Complete Header and Footer Example

```vue
<template>
  <div class="chat-container">
    <ejs-chatui 
      ref="chatRef"
      :user="currentUser"
      :showHeader="true"
      :showFooter="true"
      headerText="Customer Support"
      headerIconCss="e-icons e-support"
      placeholder="How can we help you?"
      :headerToolbar="headerToolbar"
    >
      <e-messages>
        <e-message 
          :author="currentUser" 
          text="I need help with my order"
        ></e-message>
        <e-message 
          :author="supportAgent" 
          text="I'd be happy to assist you!"
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
} from '@syncfusion/ej2-vue-interactive-chat';

const chatRef = ref(null);

const currentUser = {
  id: 'customer1',
  user: 'John Doe'
};

const supportAgent = {
  id: 'agent1',
  user: 'Support Agent',
  avatarBgColor: '#4CAF50'
};

const headerToolbar = {
  items: [
    { 
      type: 'Button', 
      iconCss: 'e-icons e-search', 
      tooltip: 'Search Messages',
      align: 'Right'
    },
    { 
      type: 'Button', 
      iconCss: 'e-icons e-phone', 
      tooltip: 'Call Agent',
      align: 'Right'
    },
    { 
      type: 'Button', 
      iconCss: 'e-icons e-more-vertical', 
      tooltip: 'More Options',
      align: 'Right'
    }
  ],
  itemClicked: (args) => {
    const action = args.item.tooltip;
    console.log(`Action: ${action}`);
    
    if (action === 'Call Agent') {
      alert('Initiating call to support agent...');
    } else if (action === 'Search Messages') {
      alert('Opening search...');
    }
  }
};
</script>

<style>
.chat-container {
  width: 500px;
  height: 600px;
  margin: 0 auto;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  border-radius: 8px;
  overflow: hidden;
}
</style>
```

## Best Practices

### Header
- Keep header text concise (max 30 characters)
- Use meaningful icons that match context
- Limit toolbar items to 3-5 for clarity
- Provide clear tooltips for all toolbar items
- Handle toolbar events gracefully

### Footer
- Maintain consistent padding and spacing
- Ensure input field is easily accessible
- Provide visual feedback on actions
- Handle edge cases (empty messages, failures)
- Test custom footers across devices

### Visibility
- Document when/why header or footer is hidden
- Provide alternative navigation if header is hidden
- Consider accessibility when hiding elements
- Test user experience without header/footer
