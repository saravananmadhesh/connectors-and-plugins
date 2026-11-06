# Load on Demand

This guide covers how to implement lazy loading of messages for improved performance with large conversation histories.

## Overview

The load-on-demand feature enables lazy loading of messages as users scroll through the chat history. This improves performance and reduces initial load time, especially for conversations with hundreds or thousands of messages.

---

## Enable Load on Demand

Use the `loadOnDemand` property to enable lazy loading:

```typescript
import { ChatUI, UserModel } from '@syncfusion/ej2-interactive-chat';

let chatUI: ChatUI = new ChatUI({
    user: currentUser,
    loadOnDemand: true
});

chatUI.appendTo('#chatUI');
```

---

## How It Works

When `loadOnDemand` is enabled:

1. **Initial Load**: Only recent messages are loaded
2. **Scroll Detection**: As user scrolls up to view older messages
3. **Load Trigger**: More messages are loaded from the data source
4. **Incremental Load**: Messages are added to the conversation incrementally

---

## Basic Implementation

```typescript
let chatUI: ChatUI = new ChatUI({
    user: currentUser,
    loadOnDemand: true,
    messages: []  // Start with empty messages
});

// Simulate initial recent messages
let initialMessages = [
    { author: currentUser, text: "Latest message" },
    { author: participant, text: "Previous message" }
];

chatUI.messages = initialMessages;
chatUI.dataBind();
```

---

## Server-Side Message Loading

Fetch older messages from server as needed:

```typescript
let allMessages: MessageModel[] = [];
let pageSize = 20;
let currentPage = 0;

let chatUI: ChatUI = new ChatUI({
    user: currentUser,
    loadOnDemand: true,
    created: () => {
        // Load initial recent messages
        loadMoreMessages();
    }
});

async function loadMoreMessages() {
    try {
        const response = await fetch(`/api/messages?page=${currentPage}&limit=${pageSize}`);
        const newMessages = await response.json();
        
        if (newMessages.length > 0) {
            allMessages = [...newMessages, ...allMessages];
            chatUI.messages = allMessages;
            chatUI.dataBind();
            currentPage++;
        }
    } catch (error) {
        console.error('Failed to load messages:', error);
    }
}

// Load more when user scrolls to top
setInterval(() => {
    const messageArea = chatUI.getRootElement().querySelector('.e-message-wrapper');
    if (messageArea && messageArea.scrollTop === 0) {
        loadMoreMessages();
    }
}, 500);
```

---

## Pagination Pattern

Implement pagination for efficient data loading:

```typescript
interface MessagePage {
    messages: MessageModel[];
    hasMore: boolean;
    total: number;
}

let messageCache: Map<number, MessageModel[]> = new Map();
let currentPage = 0;
let hasMoreMessages = true;

async function fetchMessagesPage(pageNumber: number): Promise<MessagePage> {
    // Check cache first
    if (messageCache.has(pageNumber)) {
        return {
            messages: messageCache.get(pageNumber) || [],
            hasMore: true,
            total: 0
        };
    }
    
    const response = await fetch(`/api/chat/messages?page=${pageNumber}&pageSize=20`);
    const data = await response.json();
    
    // Cache the page
    messageCache.set(pageNumber, data.messages);
    
    return data;
}

let chatUI: ChatUI = new ChatUI({
    user: currentUser,
    loadOnDemand: true,
    created: async () => {
        // Load first page (most recent)
        const page = await fetchMessagesPage(0);
        chatUI.messages = page.messages;
        chatUI.dataBind();
    }
});

// Detect scroll to top and load older messages
function setupScrollListener() {
    const container = chatUI.getRootElement();
    let scrollCheckInterval: any;
    
    container.addEventListener('scroll', () => {
        clearTimeout(scrollCheckInterval);
        
        scrollCheckInterval = setTimeout(async () => {
            if (container.scrollTop === 0 && hasMoreMessages) {
                console.log('Loading page:', currentPage + 1);
                const nextPage = await fetchMessagesPage(currentPage + 1);
                
                if (nextPage.messages.length === 0) {
                    hasMoreMessages = false;
                    console.log('No more messages to load');
                } else {
                    // Prepend older messages
                    chatUI.messages = [...nextPage.messages, ...chatUI.messages];
                    chatUI.dataBind();
                    currentPage++;
                }
            }
        }, 300);
    });
}

chatUI.appendTo('#chatUI');
setupScrollListener();
```

---

## WebSocket Real-Time with Load on Demand

Combine load on demand with real-time message updates:

```typescript
let chatUI: ChatUI = new ChatUI({
    user: currentUser,
    loadOnDemand: true,
    autoScrollToBottom: true
});

// Connect to WebSocket
const ws = new WebSocket('wss://api.example.com/chat');

ws.onmessage = (event) => {
    const newMessage = JSON.parse(event.data);
    
    if (newMessage.type === 'message') {
        // Add new message to bottom
        chatUI.addMessage(newMessage.data);
        chatUI.scrollToBottom();
    } else if (newMessage.type === 'typing') {
        // Update typing indicator
        chatUI.typingUsers = [newMessage.user];
        chatUI.dataBind();
    }
};

ws.onerror = (error) => {
    console.error('WebSocket error:', error);
};
```

---

## Performance Optimization Tips

1. **Batch Requests**: Load multiple messages at once
2. **Cache Results**: Store loaded pages in memory
3. **Debounce Scroll**: Avoid excessive scroll event handling
4. **Limit History**: Don't load entire conversation history
5. **Virtual Scrolling**: Only render visible messages (for very large datasets)

```typescript
// Example: Debounced scroll detection
let scrollTimeout: any;
const SCROLL_DEBOUNCE = 500;

container.addEventListener('scroll', () => {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
        if (container.scrollTop === 0) {
            loadMoreMessages();
        }
    }, SCROLL_DEBOUNCE);
});
```

---

## Complete Example: Chat with History Pagination

```typescript
import { ChatUI, UserModel, MessageModel } from '@syncfusion/ej2-interactive-chat';

let currentUser: UserModel = { id: "user1", user: "Customer" };
let participant: UserModel = { id: "user2", user: "Agent" };

class ChatManager {
    private chatUI: ChatUI;
    private currentPage: number = 0;
    private pageSize: number = 20;
    private isLoading: boolean = false;
    private hasMore: boolean = true;
    
    constructor() {
        this.chatUI = new ChatUI({
            user: currentUser,
            loadOnDemand: true,
            autoScrollToBottom: true,
            created: () => {
                this.loadInitialMessages();
                this.setupScrollListener();
            }
        });
    }
    
    async loadInitialMessages() {
        const messages = await this.fetchMessages(0);
        this.chatUI.messages = messages;
        this.chatUI.dataBind();
    }
    
    async loadMoreMessages() {
        if (this.isLoading || !this.hasMore) return;
        
        this.isLoading = true;
        const newMessages = await this.fetchMessages(this.currentPage + 1);
        
        if (newMessages.length === 0) {
            this.hasMore = false;
        } else {
            this.chatUI.messages = [...newMessages, ...this.chatUI.messages];
            this.chatUI.dataBind();
            this.currentPage++;
        }
        
        this.isLoading = false;
    }
    
    private async fetchMessages(pageNumber: number): Promise<MessageModel[]> {
        try {
            const response = await fetch(`/api/messages?page=${pageNumber}&limit=${this.pageSize}`);
            return await response.json();
        } catch (error) {
            console.error('Failed to fetch messages:', error);
            return [];
        }
    }
    
    private setupScrollListener() {
        const container = this.chatUI.getRootElement();
        let debounceTimer: any;
        
        container.addEventListener('scroll', () => {
            clearTimeout(debounceTimer);
            debounceTimer = setTimeout(() => {
                if (container.scrollTop === 0) {
                    this.loadMoreMessages();
                }
            }, 300);
        });
    }
    
    render(selector: string) {
        this.chatUI.appendTo(selector);
    }
}

// Initialize
const chatManager = new ChatManager();
chatManager.render('#chatUI');
```

---

## Best Practices

1. **Show Loading Indicator**: Provide visual feedback when loading
2. **Error Handling**: Gracefully handle load failures
3. **Progressive Enhancement**: Ensure chat works with JavaScript disabled
4. **Accessibility**: Make scroll-to-load discoverable
5. **Connection State**: Show when offline/reconnecting
6. **Message Ordering**: Ensure correct chronological order
7. **Memory Management**: Periodically clean old cached messages in very long sessions
