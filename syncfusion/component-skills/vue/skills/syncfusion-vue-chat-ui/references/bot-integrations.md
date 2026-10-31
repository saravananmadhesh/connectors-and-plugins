# Bot Integrations

**Context**: When you need to connect the Chat UI component to intelligent bot services like Microsoft Bot Framework or Google Dialogflow for conversational AI capabilities.

**Navigation**: This reference provides integration patterns for connecting Chat UI with popular bot platforms.

## Table of Contents

- [Overview](#overview)
- [Microsoft Bot Framework Integration](#microsoft-bot-framework-integration)
  - [Prerequisites](#microsoft-prerequisites)
  - [Setup Token Server](#setup-token-server)
  - [Configure Chat UI](#configure-chat-ui-microsoft)
  - [Testing](#testing-microsoft)
- [Google Dialogflow Integration](#google-dialogflow-integration)
  - [Prerequisites](#dialogflow-prerequisites)
  - [Setup Backend](#setup-backend-dialogflow)
  - [Configure Chat UI](#configure-chat-ui-dialogflow)
  - [Testing](#testing-dialogflow)
- [Troubleshooting](#troubleshooting)

## Overview

The Chat UI component can integrate with bot services to provide:

- **Natural Language Understanding**: Process user intents
- **Context-Aware Responses**: Maintain conversation context
- **Automated Support**: Handle common queries
- **Smart Suggestions**: Provide contextual recommendations

**Common patterns**:
- Microsoft Bot Framework via Direct Line API
- Google Dialogflow via REST API
- Custom bot backends via WebSocket or HTTP

## Microsoft Bot Framework Integration

Integrate with Azure Bot Service using the Direct Line channel for secure, real-time communication.

### Microsoft Prerequisites

**Required**:
- Microsoft Azure account
- Deployed Azure Bot (using Bot Framework)
- Node.js 16+ with npm
- Direct Line secret key from Azure Portal

**Install dependencies**:

```bash
# Frontend dependencies
npm install directline-js axios

# Backend dependencies (for token server)
npm install express axios cors dotenv
```

### Setup Token Server

**Why**: Never expose Direct Line secret keys in frontend code. Use a secure backend token server.

**Create token server**:

1. Create `token-server` folder with `index.js` and `.env` files

2. Configure `.env`:

```env
DIRECT_LINE_SECRET=YOUR_DIRECT_LINE_SECRET_HERE
```

3. Implement `index.js`:

```javascript
require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors()); // Enable CORS for your frontend

const directLineSecret = process.env.DIRECT_LINE_SECRET;
if (!directLineSecret) {
    throw new Error('Direct Line secret is not set in the .env file.');
}

app.post('/directline/token', async (req, res) => {
    try {
        const response = await axios.post(
            'https://directline.botframework.com/v3/directline/tokens/generate',
            {},
            {
                headers: {
                    'Authorization': `Bearer ${directLineSecret}`
                }
            }
        );
        res.json({ token: response.data.token });
    } catch (err) {
        console.error('Error generating Direct Line token:', err.response ? err.response.data : err.message);
        res.status(500).json({ error: 'Failed to generate Direct Line token.' });
    }
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Token server running on http://localhost:${port}`));
```

### Configure Chat UI Microsoft

**Complete integration with Direct Line**:

```vue
<template>
  <div class="chat-container">
    <ejs-chatui 
      :user="currentUser"
      :messageSend="onMessageSend"
    >
      <e-messages>
        <e-message 
          v-for="(msg, idx) in messages" 
          :key="idx"
          :text="msg.text" 
          :author="msg.author"
        />
      </e-messages>
    </ejs-chatui>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { 
  ChatUIComponent as EjsChatui,
  MessagesDirective as EMessages,
  MessageDirective as EMessage 
} from '@syncfusion/ej2-vue-interactive-chat';
import { DirectLine } from 'directline-js';
import axios from 'axios';

const currentUser = ref({
  id: "user1",
  user: "You"
});

const botUser = ref({
  id: "bot",
  user: "Bot"
});

const messages = ref([]);
const directLineRef = ref(null);

// Initialize Direct Line connection
onMounted(async () => {
  try {
    // 1. Fetch token from backend server
    const response = await axios.post('http://localhost:5000/directline/token');
    const { token } = response.data;

    // 2. Create Direct Line instance
    const directLine = new DirectLine({ token });
    directLineRef.value = directLine;

    // 3. Subscribe to bot messages
    directLine.activity$
      .filter(activity => 
        activity.type === 'message' && 
        activity.from.id !== currentUser.value.id
      )
      .subscribe(activity => {
        const botReply = { 
          text: activity.text, 
          author: botUser.value 
        };
        messages.value.push(botReply);
      });

  } catch (error) {
    console.error("Failed to connect to bot service:", error);
    const errorMsg = { 
      text: "Sorry, I couldn't connect to the bot.", 
      author: botUser.value 
    };
    messages.value.push(errorMsg);
  }
});

// Cleanup on unmount
onUnmounted(() => {
  if (directLineRef.value) {
    directLineRef.value.end();
  }
});

// Handle message send
const onMessageSend = (args) => {
  if (!directLineRef.value) {
    console.error("Direct Line connection not established.");
    return;
  }

  // Add user message to UI
  const userMessage = { 
    text: args.message.text, 
    author: currentUser.value 
  };
  messages.value.push(userMessage);

  // Send to bot via Direct Line
  directLineRef.value.postActivity({
    from: { 
      id: currentUser.value.id, 
      name: currentUser.value.user 
    },
    type: 'message',
    text: args.message.text
  }).subscribe(
    id => console.log("Sent message with ID:", id),
    error => console.error("Error sending message:", error)
  );
};
</script>
```

### Advanced Bot Framework Integration

**Handle rich responses (cards, buttons)**:

```vue
<script setup>
import { ref, onMounted } from 'vue';
import { ChatUIComponent as EjsChatui } from '@syncfusion/ej2-vue-interactive-chat';
import { DirectLine } from 'directline-js';
import axios from 'axios';

const currentUser = ref({
  id: "user1",
  user: "You"
});

const botUser = ref({
  id: "bot",
  user: "Support Bot",
  avatarUrl: "/bot-avatar.png"
});

const messages = ref([]);
const directLineRef = ref(null);

onMounted(async () => {
  try {
    const response = await axios.post('http://localhost:5000/directline/token');
    const { token } = response.data;

    const directLine = new DirectLine({ token });
    directLineRef.value = directLine;

    // Subscribe to all activity types
    directLine.activity$.subscribe(activity => {
      if (activity.from.id === currentUser.value.id) return;

      // Handle different activity types
      switch (activity.type) {
        case 'message':
          handleMessageActivity(activity);
          break;
        case 'typing':
          showTypingIndicator();
          break;
        case 'event':
          handleEventActivity(activity);
          break;
      }
    });

  } catch (error) {
    console.error("Bot connection failed:", error);
  }
});

const handleMessageActivity = (activity) => {
  // Handle text messages
  if (activity.text) {
    messages.value.push({
      text: activity.text,
      author: botUser.value
    });
  }

  // Handle attachments (cards, images, etc.)
  if (activity.attachments && activity.attachments.length > 0) {
    activity.attachments.forEach(attachment => {
      if (attachment.contentType === 'application/vnd.microsoft.card.hero') {
        handleHeroCard(attachment.content);
      } else if (attachment.contentType === 'image/png' || attachment.contentType === 'image/jpeg') {
        messages.value.push({
          text: `📎 Image: ${attachment.contentUrl}`,
          author: botUser.value
        });
      }
    });
  }
};

const handleHeroCard = (card) => {
  let cardText = card.title || '';
  if (card.subtitle) cardText += `\n${card.subtitle}`;
  if (card.text) cardText += `\n${card.text}`;
  
  messages.value.push({
    text: cardText,
    author: botUser.value
  });

  // Handle card buttons as suggestions
  if (card.buttons) {
    const suggestions = card.buttons.map(btn => btn.title);
    // You can add these as suggestions to the Chat UI
  }
};

const handleEventActivity = (activity) => {
  console.log('Bot event:', activity.name, activity.value);
};

const showTypingIndicator = () => {
  // Show typing indicator in UI
  console.log('Bot is typing...');
};

const onMessageSend = (args) => {
  if (!directLineRef.value) return;

  messages.value.push({
    text: args.message.text,
    author: currentUser.value
  });

  directLineRef.value.postActivity({
    from: { 
      id: currentUser.value.id, 
      name: currentUser.value.user 
    },
    type: 'message',
    text: args.message.text
  }).subscribe(
    id => console.log("Message sent:", id),
    error => console.error("Send error:", error)
  );
};
</script>
```

### Testing Microsoft

**Start token server**:

```bash
cd token-server
node index.js
# Token server running on http://localhost:5000
```

**Start Vue app**:

```bash
npm run dev
```

**Test in Azure Portal**:
1. Go to Azure Portal > Your Bot Resource
2. Test using "Test in Web Chat"
3. Verify messaging endpoint is accessible
4. Check Direct Line channel is enabled

## Google Dialogflow Integration

Integrate with Google Dialogflow for natural language processing and intent recognition.

### Dialogflow Prerequisites

**Required**:
- Google Cloud account
- Dialogflow agent created and configured
- Service account with "Dialogflow API Client" role
- Service account JSON key file

**Install dependencies**:

```bash
npm install express body-parser dialogflow cors
```

### Setup Backend Dialogflow

**Configure service account**:

1. Create `backend/service-acct.json` with your Dialogflow credentials:

```json
{
  "type": "service_account",
  "project_id": "your-dialogflow-project-id",
  "private_key_id": "abc123xyz...",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEv...",
  "client_email": "dialogflow-agent@your-project.iam.gserviceaccount.com"
}
```

> **Security**: Never commit this file to version control. Use environment variables in production.

2. Create `backend/index.js`:

```javascript
const express = require('express');
const { SessionsClient } = require('dialogflow');
const bodyParser = require('body-parser');
const cors = require('cors');
const serviceAccount = require('./service-acct.json');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const projectId = serviceAccount.project_id;
const sessionClient = new SessionsClient({ credentials: serviceAccount });

app.post('/api/message', async (req, res) => {
  const message = req.body.text;
  const sessionId = req.body.sessionId || 'default-session';

  const sessionPath = `projects/${projectId}/agent/sessions/${sessionId}`;

  const request = {
    session: sessionPath,
    queryInput: {
      text: {
        text: message,
        languageCode: 'en-US',
      },
    },
  };

  try {
    const responses = await sessionClient.detectIntent(request);
    const result = responses[0].queryResult;
    res.json({ reply: result.fulfillmentText });
  } catch (err) {
    console.error('Dialogflow error:', err);
    res.status(500).json({ reply: "Error connecting to Dialogflow." });
  }
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Backend running on http://localhost:${port}`));
```

### Configure Chat UI Dialogflow

**Basic integration**:

```vue
<template>
  <div class="chat-container">
    <ejs-chatui 
      :user="currentUser"
      :headerText="headerText"
      :headerIconCss="headerIconCss"
      :messageSend="onMessageSend"
    >
      <e-messages>
        <e-message 
          v-for="(msg, idx) in messages" 
          :key="idx"
          :text="msg.text" 
          :author="msg.author"
          :avatarUrl="msg.avatarUrl"
        />
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

const currentUser = ref({
  id: "user1",
  user: "Albert"
});

const botUser = ref({
  id: "bot",
  user: "Bot",
  avatarUrl: "https://ej2.syncfusion.com/demos/src/chat-ui/images/bot.png"
});

const messages = ref([]);
const headerText = ref("Chatbot");
const headerIconCss = ref("e-header-icon");

const onMessageSend = async (args) => {
  // 1. Add user's message to UI
  const userMessage = { 
    text: args.message.text, 
    author: currentUser.value 
  };
  messages.value.push(userMessage);

  // 2. Call backend API to get Dialogflow response
  try {
    const response = await fetch('http://localhost:5000/api/message', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        text: args.message.text, 
        sessionId: currentUser.value.id 
      })
    });
    
    const data = await response.json();
    
    // 3. Add bot's reply to UI
    const botReply = { 
      text: data.reply, 
      author: botUser.value,
      avatarUrl: botUser.value.avatarUrl
    };
    messages.value.push(botReply);
    
  } catch (error) {
    console.error('Dialogflow error:', error);
    const errorMsg = { 
      text: "Sorry, I couldn't contact the server.", 
      author: botUser.value 
    };
    messages.value.push(errorMsg);
  }
};
</script>
```

### Advanced Dialogflow Integration

**Handle contexts and follow-up intents**:

```vue
<script setup>
import { ref } from 'vue';
import { ChatUIComponent as EjsChatui } from '@syncfusion/ej2-vue-interactive-chat';

const currentUser = ref({
  id: "user1",
  user: "Customer"
});

const botUser = ref({
  id: "bot",
  user: "Support Agent"
});

const messages = ref([]);
const conversationContext = ref(null);

const onMessageSend = async (args) => {
  const userMessage = { 
    text: args.message.text, 
    author: currentUser.value 
  };
  messages.value.push(userMessage);

  try {
    // Include context in request
    const payload = {
      text: args.message.text,
      sessionId: currentUser.value.id,
      context: conversationContext.value
    };

    const response = await fetch('http://localhost:5000/api/message', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    
    const data = await response.json();
    
    // Update context for follow-up
    conversationContext.value = data.context;
    
    // Handle multiple response types
    if (data.reply) {
      messages.value.push({
        text: data.reply,
        author: botUser.value
      });
    }
    
    // Handle suggestions from Dialogflow
    if (data.suggestions && data.suggestions.length > 0) {
      // You can display these as Chat UI suggestions
      console.log('Suggestions:', data.suggestions);
    }
    
    // Handle custom payloads
    if (data.payload) {
      handleCustomPayload(data.payload);
    }
    
  } catch (error) {
    console.error('Dialogflow error:', error);
    messages.value.push({
      text: "I'm having trouble connecting. Please try again.",
      author: botUser.value
    });
  }
};

const handleCustomPayload = (payload) => {
  // Handle custom responses from Dialogflow
  if (payload.quickReplies) {
    // Display as suggestions
  }
  if (payload.card) {
    // Display as formatted message
  }
};
</script>
```

**Enhanced backend with context support**:

```javascript
app.post('/api/message', async (req, res) => {
  const message = req.body.text;
  const sessionId = req.body.sessionId || 'default-session';
  const context = req.body.context || [];

  const sessionPath = `projects/${projectId}/agent/sessions/${sessionId}`;

  const request = {
    session: sessionPath,
    queryInput: {
      text: {
        text: message,
        languageCode: 'en-US',
      },
    },
  };

  // Add existing contexts if provided
  if (context.length > 0) {
    request.queryParams = {
      contexts: context
    };
  }

  try {
    const responses = await sessionClient.detectIntent(request);
    const result = responses[0].queryResult;
    
    res.json({ 
      reply: result.fulfillmentText,
      intent: result.intent.displayName,
      confidence: result.intentDetectionConfidence,
      context: result.outputContexts,
      suggestions: result.fulfillmentMessages
        .filter(msg => msg.quickReplies)
        .flatMap(msg => msg.quickReplies.quickReplies)
    });
  } catch (err) {
    console.error('Dialogflow error:', err);
    res.status(500).json({ reply: "Error connecting to Dialogflow." });
  }
});
```

### Testing Dialogflow

**Start backend server**:

```bash
cd backend
node index.js
# Backend running on http://localhost:5000
```

**Start Vue app**:

```bash
npm run dev
```

**Test in Dialogflow Console**:
1. Go to Dialogflow Console
2. Use "Try it now" to test intents
3. Verify training phrases and responses
4. Check fulfillment settings

## Troubleshooting

### Microsoft Bot Framework Issues

**Token Server Error (500)**:
- Verify `DIRECT_LINE_SECRET` in `.env` file
- Restart token server after changes
- Check Azure Portal for correct secret key

**CORS Error**:
- Ensure CORS configuration allows your frontend origin
- Add specific origins instead of wildcard in production

**Bot Not Responding**:
- Test bot in Azure Portal "Test in Web Chat"
- Verify messaging endpoint in Configuration
- Check bot service logs in Azure

**Connection Fails**:
- Confirm token server is running and accessible
- Check browser console for network errors
- Verify Direct Line channel is enabled

### Dialogflow Issues

**Permission Denied**:
- Ensure service account has "Dialogflow API Client" role
- Verify JSON key file is valid and not expired
- Check API is enabled in Google Cloud Console

**CORS Error**:
- Match CORS origin in backend with frontend URL
- Add credentials: true if using authentication

**No Response**:
- Test intents in Dialogflow Console simulator
- Verify training phrases are configured
- Check fulfillment is set up correctly

**Quota Exceeded**:
- Check Dialogflow API quotas in Google Cloud Console
- Monitor usage and increase limits if needed

**Invalid Credentials**:
- Verify service account JSON path is correct
- Check environment variables are loaded
- Ensure no extra whitespace in credentials

### General Issues

**Network Timeouts**:
- Increase timeout settings in axios/fetch
- Check backend server is responding
- Verify firewall settings

**Message Delay**:
- Optimize backend processing
- Consider adding typing indicators
- Implement message queuing for high volume

**Context Lost**:
- Use unique session IDs for each user
- Implement session persistence
- Check context expiration settings

## Related Topics

- [Getting Started](./getting-started.md) - Initial setup and configuration
- [Messages](./messages.md) - Message configuration and display
- [Events and Methods](./events-methods.md) - Handle events and control Chat UI
- [Advanced Features](./advanced-features.md) - Mentions, attachments, and more
