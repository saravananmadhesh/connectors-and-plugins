# Bot Integrations

## Table of Contents
- [Security Requirements](#security-requirements)
- [Google Dialogflow Integration](#google-dialogflow-integration)
- [Microsoft Bot Framework Integration](#microsoft-bot-framework-integration)
- [Direct Line Configuration](#direct-line-configuration)
- [Backend Setup](#backend-setup)

## ⚠️ Security Requirements

### Before Production Deployment

**CRITICAL**: The code examples in this guide use `http://localhost:5000` for local development. For production environments, you MUST follow these security practices:

#### 1. **Use HTTPS in Production**
```javascript
// ❌ Development Only
const backendUrl = 'http://localhost:5000/api/message';

// ✅ Production - Always use HTTPS
const backendUrl = 'https://your-secure-domain.com/api/message';
```

#### 2. **Never Commit Secrets to Version Control**

Create `.gitignore` in your project root:
```
# Environment variables
.env
.env.local
.env.*.local

# Service account credentials
service-acct.json
credentials.json
*-key.json
token-server/.env

# Node modules
node_modules/
```

#### 3. **Environment Variables Setup**

**For Token Server (.env):**
```bash
# ❌ NEVER include quotes or actual secrets in .env
DIRECT_LINE_SECRET=your_actual_secret_from_azure

# ✅ Load from secure source (Azure Key Vault, AWS Secrets Manager, etc.)
DIALOGFLOW_PROJECT_ID=your_project_id
DIALOGFLOW_CREDENTIALS_PATH=/secure/path/to/service-acct.json
```

**Load credentials securely in Node.js:**
```javascript
// ✅ Secure approach
const serviceAccount = JSON.parse(
  fs.readFileSync(process.env.DIALOGFLOW_CREDENTIALS_PATH, 'utf8')
);

// ❌ Avoid this - hardcoding paths
const serviceAccount = require('./service-acct.json');
```

#### 4. **CORS Configuration for Production**
```javascript
// ❌ Development only
app.use(cors());

// ✅ Production - restrict origins
app.use(cors({
  origin: 'https://your-frontend-domain.com',
  credentials: true,
  optionsSuccessStatus: 200
}));
```

#### 5. **Store Credentials Securely**

| Environment | Solution |
|-------------|----------|
| **Azure** | Azure Key Vault |
| **AWS** | AWS Secrets Manager |
| **Google Cloud** | Google Cloud Secret Manager |
| **Local Development** | `.env` file (in `.gitignore`) |
| **Docker** | Docker Secrets or environment variables |

---

## Google Dialogflow Integration

### Prerequisites

Before integrating Dialogflow, ensure:

1. **Google Account** with access to Google Cloud Console
2. **Dialogflow Service Account** with JSON credentials
3. **Node.js Backend** for secure API communication
4. **Syncfusion Chat UI** properly installed

### Install Backend Dependencies

```bash
npm install express body-parser dialogflow cors
```

### Set Up Dialogflow Agent

1. Create a new agent in **Dialogflow Console**
2. Set agent name (e.g., "MyChatBot")
3. Add intents with training phrases and responses
4. Create service account in Google Cloud Console with "Dialogflow API Client" role
5. Download JSON key file

### Configure Node.js Backend

Create `backend/index.js`:

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

app.listen(5000, () => console.log('Backend running on http://localhost:5000'));
// ⚠️ For production, use HTTPS and configure environment variables
```

### Configure Chat UI Component

```typescript
import { Component } from '@angular/core';
import { ChatUIModule, MessageModel, UserModel } from '@syncfusion/ej2-angular-interactive-chat';

@Component({
  imports: [ChatUIModule],
  standalone: true,
  selector: 'app-root',
  template: `
    <div id="chat-container" ejs-chatui 
         id="chat" 
         [user]="currentUserModel" 
         [messages]="messages" 
         (messageSend)="messageSend($event)" 
         headerText="Dialogflow Bot" 
         headerIconCss="chat-bot">
    </div>
  `,
  styles: [`
    .chat-bot {
      background-image: url('//ej2.syncfusion.com/demos/src/chat-ui/images/bot.png');
      background-color: unset;
    }
  `]
})
export class AppComponent {
  public messages: MessageModel[] = [];
  public currentUserModel: UserModel = { id: 'user1', user: 'You' };
  public botUserModel: UserModel = { 
    id: 'bot', 
    user: 'Bot',
    avatarUrl: 'https://ej2.syncfusion.com/demos/src/chat-ui/images/bot.png'
  };

  public async messageSend(args: any): Promise<void> {
    args.cancel = true;  // Prevent default send
    
    // 1. Add user's message
    const userMessage: MessageModel = { 
      text: args.message.text, 
      author: this.currentUserModel 
    };
    this.messages = [...this.messages, userMessage];

    // 2. Call Dialogflow backend
    try {
      // ⚠️ Replace with environment variable in production
      const backendUrl = 'http://localhost:5000/api/message';
      const response = await fetch(backendUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          text: args.message.text, 
          sessionId: this.currentUserModel.id 
        })
      });
      const data = await response.json();
      
      // 3. Add bot response
      const botReply: MessageModel = { 
        text: data.reply, 
        author: this.botUserModel 
      };
      this.messages = [...this.messages, botReply];
    } catch {
      const errorMsg: MessageModel = { 
        text: "Sorry, I couldn't contact the server.", 
        author: this.botUserModel 
      };
      this.messages = [...this.messages, errorMsg];
    }
  }
}
```

## Microsoft Bot Framework Integration

### Prerequisites

1. **Microsoft Azure Account**
2. **Azure Bot Service** created and deployed
3. **Direct Line Channel** enabled
4. **Syncfusion Chat UI** installed

### Enable Direct Line Channel

1. Go to Azure Portal
2. Navigate to your bot resource
3. Click "Channels"
4. Enable "Direct Line"
5. Copy the secret key (store securely)

### Install Frontend Dependencies

```bash
npm install botframework-directlinejs axios
```

### Set Up Token Server

Create `token-server/.env`:
```
DIRECT_LINE_SECRET= "YOUR_SECRET_KEY_HERE"
```

Create `token-server/index.js`:
```javascript
require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());

const directLineSecret = process.env.DIRECT_LINE_SECRET;

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
    console.error('Error generating token:', err);
    res.status(500).json({ error: 'Failed to generate Direct Line token.' });
  }
});

app.listen(5000, () => console.log('Token server on http://localhost:5000'));
// ⚠️ For production, deploy with HTTPS and secure credential storage
```

## Direct Line Configuration

### Configure Chat UI Component

```typescript
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ChatUIModule, MessageModel, UserModel } from '@syncfusion/ej2-angular-interactive-chat';
import { DirectLine } from 'botframework-directlinejs';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [ChatUIModule, HttpClientModule],
  standalone: true,
  template: `
    <div id="chat-container" ejs-chatui 
         [user]="currentUserModel" 
         (messageSend)="messageSend($event)"
         headerText="Microsoft Bot">
      <e-messages>
        <e-message 
          *ngFor="let msg of messages" 
          [text]="msg.text" 
          [author]="msg.author">
        </e-message>
      </e-messages>
    </div>
  `
})
export class AppComponent implements OnInit, OnDestroy {
  public currentUserModel: UserModel = { id: 'user1', user: 'You' };
  public botUserModel: UserModel = { id: 'bot', user: 'Bot' };
  public messages: MessageModel[] = [];
  
  private directLine!: DirectLine;
  private activitySubscription!: Subscription;

  constructor(private http: HttpClient) {}

  async ngOnInit(): Promise<void> {
    try {
      // 1. Get Direct Line token from backend
      // ⚠️ Replace with environment variable in production
      const tokenServerUrl = 'http://localhost:5000/directline/token';
      const response = await firstValueFrom(
        this.http.post<{ token: string }>(tokenServerUrl, {})
      );
      const { token } = response!;

      // 2. Create Direct Line connection
      this.directLine = new DirectLine({ token });

      // 3. Subscribe to incoming messages
      this.activitySubscription = this.directLine.activity$
        .filter(activity => 
          activity.type === 'message' && 
          activity.from.id !== this.currentUserModel.id
        )
        .subscribe(message => {
          const botReply: MessageModel = { 
            text: message.text, 
            author: this.botUserModel 
          };
          this.messages = [...this.messages, botReply];
        });
    } catch (error) {
      console.error('Connection failed:', error);
    }
  }

  ngOnDestroy(): void {
    if (this.directLine) {
      this.directLine.end();
    }
    if (this.activitySubscription) {
      this.activitySubscription.unsubscribe();
    }
  }

  public messageSend(args: any): void {
    args.cancel = true;
    
    if (!this.directLine) {
      console.error('Direct Line not connected');
      return;
    }

    // Add user message to UI
    const userMessage: MessageModel = { 
      text: args.message.text, 
      author: this.currentUserModel 
    };
    this.messages = [...this.messages, userMessage];

    // Send to bot via Direct Line
    this.directLine.postActivity({
      from: { id: this.currentUserModel.id, name: this.currentUserModel.user },
      type: 'message',
      text: args.message.text
    }).subscribe(
      id => console.log('Message sent:', id),
      error => console.error('Send failed:', error)
    );
  }
}
```

## Backend Setup

### Security Best Practices

**❌ Never do this:**
```typescript
// DON'T expose secrets in frontend code
const secret = 'direct-line-secret-12345';
```

**✅ Use token server:**
```typescript
// Backend only - secure
const secret = process.env.DIRECT_LINE_SECRET;
```

### Session Management

```typescript
// Generate unique session ID per user
private generateSessionId = (): string => {
  return `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

// Store session for user
private sessionMap = new Map<string, string>();

public getOrCreateSession = (userId: string): string => {
  if (!this.sessionMap.has(userId)) {
    this.sessionMap.set(userId, this.generateSessionId());
  }
  return this.sessionMap.get(userId)!;
};
```

## Troubleshooting

### Dialogflow Issues

```
❌ "Permission Denied"
✅ Verify service account has "Dialogflow API Client" role

❌ "CORS Error"
✅ Check CORS configuration in backend/index.js

❌ "No Response"
✅ Test intent in Dialogflow Console simulator

❌ "Quota Exceeded"
✅ Check API quotas in Google Cloud Console
```

### Microsoft Bot Issues

```
❌ "Token Server Error (500)"
✅ Ensure DIRECT_LINE_SECRET is correct in .env

❌ "Bot is Not Responding"
✅ Test bot in Azure Portal's "Test in Web Chat"

❌ "Connection Fails"
✅ Verify token server is running
✅ Check frontend Host URL matches CORS config
```

## Complete Integration Example

```typescript
import { Component, OnInit } from '@angular/core';
import { ChatUIModule, MessageModel, UserModel } from '@syncfusion/ej2-angular-interactive-chat';

@Component({
  imports: [ChatUIModule],
  standalone: true,
  selector: 'app-bot-chat',
  template: `
    <div class="bot-container">
      <h2>Chat with Our Bot</h2>
      <div id="chat" ejs-chatui 
           [user]="currentUser"
           [messages]="chatMessages"
           (messageSend)="handleMessage($event)"
           headerText="Support Bot"
           [enableAttachments]="true"
           [attachmentSettings]="attachmentSettings">
      </div>
    </div>
  `,
  styles: [`
    .bot-container {
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
    }
  `]
})
export class BotChatComponent implements OnInit {
  public currentUser: UserModel = { id: 'user123', user: 'You' };
  public botUser: UserModel = { id: 'bot', user: 'Support Bot' };
  public chatMessages: MessageModel[] = [];
  
  public attachmentSettings: any = {
    saveUrl: 'https://your-backend.com/api/upload',
    removeUrl: 'https://your-backend.com/api/remove'
  };

  async ngOnInit() {
    // Initialize bot connection
    await this.initializeBot();
  }

  private async initializeBot(): Promise<void> {
    // Call backend to initialize bot session
    console.log('Bot initialized');
  }

  public async handleMessage(args: any): Promise<void> {
    args.cancel = true;
    
    // Add user message
    this.chatMessages.push({
      text: args.message.text,
      author: this.currentUser
    });

    // Get bot response
    const botResponse = await this.getBotResponse(args.message.text);
    this.chatMessages.push({
      text: botResponse,
      author: this.botUser
    });
  }

  private async getBotResponse(userMessage: string): Promise<string> {
    try {
      const response = await fetch('https://your-backend.com/api/bot/reply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMessage })
      });
      const data = await response.json();
      return data.reply;
    } catch (error) {
      return 'Sorry, I encountered an error.';
    }
  }
}
```

---
