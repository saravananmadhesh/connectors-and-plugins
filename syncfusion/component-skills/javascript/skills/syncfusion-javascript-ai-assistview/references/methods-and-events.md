# Methods and Events

## Table of Contents
- [Methods](#methods)
  - [addPromptResponse](#addpromptresponse)
  - [executePrompt](#executeprompt)
  - [scrollToBottom](#scrolltobottom)
  - [refresh](#refresh)
- [Events](#events)
  - [created](#created)
  - [promptRequest](#promptrequest)
  - [promptChanged](#promptchanged)
  - [stopRespondingClick](#stoprespondingclick)
  - [Attachment Events](#attachment-events)
    - [beforeAttachmentUpload](#beforeattachmentupload)
    - [attachmentUploadSuccess](#attachmentuploadsuccess)
    - [attachmentUploadFailure](#attachmentuploadfailure)
    - [attachmentRemoving](#attachmentremoving)
    - [attachmentRemoved](#attachmentremoved)
    - [attachmentClick](#attachmentclick)
This guide covers all public methods and events available in the AI AssistView component.

---

## Methods

### addPromptResponse

Add prompts and responses to the AI AssistView programmatically. Supports an optional `isFinalUpdate` flag for streaming responses and an optional `TelemetryData` argument for telemetry reporting.

#### Signature

```typescript
addPromptResponse(promptResponse: string | PromptModel): void;
addPromptResponse(promptResponse: string | PromptModel, isFinalUpdate?: boolean): void;
addPromptResponse(promptResponse: string | PromptModel, isFinalUpdate?: boolean, telemetryData?: TelemetryData): void;
```

#### Add Response as String

Add a string response to the last prompt.

```typescript
import { AIAssistView } from '@syncfusion/ej2-interactive-chat';

const aiAssistView: AIAssistView = new AIAssistView({
    promptRequest: (args) => {
        setTimeout(() => {
            const response = 'For real-time prompt processing, connect to your AI service.';
            aiAssistView.addPromptResponse(response);
        }, 1000);
    }
});

aiAssistView.appendTo('#aiAssistView');

// Add dynamic response
document.getElementById('addResponse').addEventListener('click', () => {
    aiAssistView.addPromptResponse('This is a dynamic response.');
});
```

#### Add Prompt and Response as Object

Add a complete prompt-response pair as an object.

```typescript
const aiAssistView: AIAssistView = new AIAssistView({
    promptRequest: (args) => {
        setTimeout(() => {
            aiAssistView.addPromptResponse('Response...');
        }, 1000);
    }
});

aiAssistView.appendTo('#aiAssistView');

// Add prompt-response pair
document.getElementById('addPair').addEventListener('click', () => {
    aiAssistView.addPromptResponse({
        prompt: 'What is AI?',
        response: 'AI stands for Artificial Intelligence, enabling machines to mimic human intelligence.'
    });
});
```

#### PromptModel Interface

```typescript
interface PromptModel {
    prompt?: string;
    response?: string;
    promptIconCss?: string;
    responseIconCss?: string;
    toolbarItems?: ToolbarItemModel[];
}
```

#### Advanced Example

```typescript
aiAssistView.addPromptResponse({
    prompt: 'Explain machine learning',
    response: '<p><strong>Machine Learning</strong> is a subset of AI...</p>',
    promptIconCss: 'e-icons e-user',
    responseIconCss: 'e-icons e-assistview-icon',
    toolbarItems: [
        { iconCss: 'e-icons e-copy', tooltip: 'Copy' },
        { iconCss: 'e-icons e-edit', tooltip: 'Edit' }
    ]
});
```

#### With Streaming and Telemetry Data

When telemetry is enabled via `telemetrySettings.enable`, pass a `TelemetryData` argument to attach AI usage details (model, token counts, custom attributes) to the generated telemetry report. See [telemetry.md](./telemetry.md) for the full feature guide.

```typescript
import { AIAssistView, TelemetryData } from '@syncfusion/ej2-interactive-chat';

const aiAssistView: AIAssistView = new AIAssistView({
    telemetrySettings: { enable: true },
    promptRequest: (args) => {
        // Stream a response in chunks; isFinalUpdate: true marks the final chunk
        aiAssistView.addPromptResponse('Streaming response chunk...', false);

        // Finalize the response and attach telemetry data
        const telemetryData: TelemetryData = {
            model: 'gpt-4o',
            inputTokens: 128,
            outputTokens: 512,
            customAttributes: { region: 'us-east-1', tenant: 'acme' }
        };
        aiAssistView.addPromptResponse('Final streamed response.', true, telemetryData);
    }
});
```

#### TelemetryData Interface

```typescript
interface TelemetryData {
    model?: string;
    inputTokens?: number;
    outputTokens?: number;
    reasoningTokens?: number;
    cachedInputTokens?: number;
    customAttributes?: { [key: string]: any };
}
```

---

### executePrompt

Execute a prompt programmatically, triggering the `promptRequest` event.

#### Signature

```typescript
executePrompt(prompt: string): void
```

#### Example

```typescript
import { AIAssistView } from '@syncfusion/ej2-interactive-chat';

const aiAssistView: AIAssistView = new AIAssistView({
    promptRequest: (args) => {
        console.log('Prompt:', args.prompt);
        setTimeout(() => {
            aiAssistView.addPromptResponse(`Processing: ${args.prompt}`);
        }, 1000);
    }
});

aiAssistView.appendTo('#aiAssistView');

// Execute prompt dynamically
document.getElementById('executeBtn').addEventListener('click', () => {
    aiAssistView.executePrompt('What is the current temperature?');
});
```

#### Use Cases

- Programmatic prompt execution
- Voice command integration
- Automated testing
- Custom input controls with footerTemplate

---

### scrollToBottom

Scroll the conversation view to the bottom, showing the latest messages.

#### Signature

```typescript
scrollToBottom(): void
```

#### Example

```typescript
const aiAssistView: AIAssistView = new AIAssistView({
    promptRequest: (args) => {
        setTimeout(() => {
            aiAssistView.addPromptResponse('Response...');
            // Auto-scroll to bottom after adding response
            aiAssistView.scrollToBottom();
        }, 1000);
    }
});

aiAssistView.appendTo('#aiAssistView');

// Manual scroll to bottom
document.getElementById('scrollBtn').addEventListener('click', () => {
    aiAssistView.scrollToBottom();
});
```

---

### refresh

Refresh the AI AssistView component, re-rendering the UI.

#### Signature

```typescript
refresh(): void
```

#### Example

```typescript
const aiAssistView: AIAssistView = new AIAssistView({
    promptRequest: (args) => {
        setTimeout(() => {
            aiAssistView.addPromptResponse('Response...');
        }, 1000);
    }
});

aiAssistView.appendTo('#aiAssistView');

// Refresh component
document.getElementById('refreshBtn').addEventListener('click', () => {
    aiAssistView.refresh();
});
```

#### Use Cases

- Update after property changes
- Recover from rendering issues
- Dynamic theme switching

---

## Events

### created

Triggered when the AI AssistView component rendering is completed.

#### Signature

```typescript
created: () => void
```

#### Example

```typescript
import { AIAssistView } from '@syncfusion/ej2-interactive-chat';

const aiAssistView: AIAssistView = new AIAssistView({
    created: () => {
        console.log('AI AssistView created successfully');
        // Initialize integrations, load history, etc.
    },
    promptRequest: (args) => {
        setTimeout(() => {
            aiAssistView.addPromptResponse('Response...');
        }, 1000);
    }
});

aiAssistView.appendTo('#aiAssistView');
```

#### Use Cases

- Initialize AI service connections
- Load conversation history
- Set up event listeners
- Display welcome messages

---

### promptRequest

Triggered when a user submits a prompt.

#### Signature

```typescript
promptRequest: (args: PromptRequestEventArgs) => void
```

#### PromptRequestEventArgs

```typescript
interface PromptRequestEventArgs {
    prompt: string;          // User prompt text
    fileData?: FileInfo[];   // Attached files (if enabled)
    output?: any;           // Custom output data
}
```

#### Basic Example

```typescript
const aiAssistView: AIAssistView = new AIAssistView({
    promptRequest: (args) => {
        console.log('User prompt:', args.prompt);
        
        // Process prompt and respond
        setTimeout(() => {
            aiAssistView.addPromptResponse('This is the AI response.');
        }, 1000);
    }
});

aiAssistView.appendTo('#aiAssistView');
```

#### With File Attachments

```typescript
const aiAssistView: AIAssistView = new AIAssistView({
    enableAttachments: true,
    attachmentSettings: {
        saveUrl: 'https://services.syncfusion.com/js/production/api/FileUploader/Save',
        removeUrl: 'https://services.syncfusion.com/js/production/api/FileUploader/Remove'
    },
    promptRequest: (args) => {
        const files = args.fileData || [];
        console.log(`Prompt: ${args.prompt}`);
        console.log(`Files: ${files.length}`);
        
        if (files.length > 0) {
            files.forEach(file => {
                console.log(`File: ${file.name}, Size: ${file.size} bytes`);
            });
        }
        
        setTimeout(() => {
            let response = `Processing your request`;
            if (files.length > 0) {
                response += ` with ${files.length} attachment(s)`;
            }
            aiAssistView.addPromptResponse(response);
        }, 1000);
    }
});

aiAssistView.appendTo('#aiAssistView');
```

#### AI Integration Example

```typescript
const aiAssistView: AIAssistView = new AIAssistView({
    promptRequest: async (args) => {
        try {
            // Call OpenAI API
            const response = await fetch('https://api.openai.com/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${OPENAI_API_KEY}`
                },
                body: JSON.stringify({
                    model: 'gpt-4',
                    messages: [{ role: 'user', content: args.prompt }]
                })
            });
            
            const data = await response.json();
            const aiResponse = data.choices[0].message.content;
            
            aiAssistView.addPromptResponse(aiResponse);
        } catch (error) {
            aiAssistView.addPromptResponse('Error processing request.');
        }
    }
});

aiAssistView.appendTo('#aiAssistView');
```

---

### promptChanged

Triggered when the prompt text in the input field changes.

#### Signature

```typescript
promptChanged: (args: PromptChangedEventArgs) => void
```

#### PromptChangedEventArgs

```typescript
interface PromptChangedEventArgs {
    value: string;  // Current prompt text
}
```

#### Example

```typescript
const aiAssistView: AIAssistView = new AIAssistView({
    promptChanged: (args) => {
        console.log('Current prompt:', args.value);
        
        // Show character count
        const charCount = document.getElementById('charCount');
        if (charCount) {
            charCount.textContent = `${args.value.length} characters`;
        }
        
        // Enable/disable send button based on content
        const sendBtn = document.querySelector('.e-send-btn');
        if (sendBtn) {
            sendBtn.disabled = args.value.trim().length === 0;
        }
    },
    promptRequest: (args) => {
        setTimeout(() => {
            aiAssistView.addPromptResponse('Response...');
        }, 1000);
    }
});

aiAssistView.appendTo('#aiAssistView');
```

#### Use Cases

- Character count display
- Input validation
- Auto-save drafts
- Dynamic button states

---

### stopRespondingClick

Triggered when the user clicks the stop responding button during streaming responses.

#### Signature

```typescript
stopRespondingClick: (args: StopRespondingEventArgs) => void
```

#### Example

```typescript
let streamingController: AbortController | null = null;

const aiAssistView: AIAssistView = new AIAssistView({
    enableStreaming: true,
    promptRequest: async (args) => {
        streamingController = new AbortController();
        
        try {
            const response = await fetch('https://api.openai.com/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${OPENAI_API_KEY}`
                },
                body: JSON.stringify({
                    model: 'gpt-4',
                    messages: [{ role: 'user', content: args.prompt }],
                    stream: true
                }),
                signal: streamingController.signal
            });
            
            // Process streaming response...
        } catch (error) {
            if (error.name === 'AbortError') {
                console.log('Streaming stopped by user');
            }
        }
    },
    stopRespondingClick: (args) => {
        console.log('User stopped the response');
        
        // Abort the fetch request
        if (streamingController) {
            streamingController.abort();
            streamingController = null;
        }
    }
});

aiAssistView.appendTo('#aiAssistView');
```

---

### Attachment Events

Six events handle file attachment operations.

#### beforeAttachmentUpload

Triggered before files are uploaded.

```typescript
import { AIAssistView } from '@syncfusion/ej2-interactive-chat';
import { BeforeUploadEventArgs } from "@syncfusion/ej2-inputs";

const aiAssistView: AIAssistView = new AIAssistView({
    enableAttachments: true,
    attachmentSettings: {
        saveUrl: 'https://services.syncfusion.com/js/production/api/FileUploader/Save',
        removeUrl: 'https://services.syncfusion.com/js/production/api/FileUploader/Remove'
    },
    beforeAttachmentUpload: (args: BeforeUploadEventArgs) => {
        console.log('Uploading:', args.fileData.name);
        
        // Add custom headers
        args.customFormData = [
            { 'userId': '12345' },
            { 'sessionId': 'abc-def' }
        ];
    },
    promptRequest: (args) => {
        setTimeout(() => {
            aiAssistView.addPromptResponse('Response...');
        }, 1000);
    }
});
```

#### attachmentUploadSuccess

Triggered when file upload succeeds.

```typescript
import { AIAssistView } from '@syncfusion/ej2-interactive-chat';
import { SuccessEventArgs } from "@syncfusion/ej2-inputs";

const aiAssistView: AIAssistView = new AIAssistView({
    enableAttachments: true,
    attachmentSettings: {
        saveUrl: 'https://services.syncfusion.com/js/production/api/FileUploader/Save',
        removeUrl: 'https://services.syncfusion.com/js/production/api/FileUploader/Remove'
    },
    attachmentUploadSuccess: (args: SuccessEventArgs) => {
        console.log('Upload successful:', args.file.name);
        // Show success notification
    },
    promptRequest: (args) => {
        setTimeout(() => {
            aiAssistView.addPromptResponse('Response...');
        }, 1000);
    }
});
```

#### attachmentUploadFailure

Triggered when file upload fails.

```typescript
import { AIAssistView } from '@syncfusion/ej2-interactive-chat';
import { FailureEventArgs } from "@syncfusion/ej2-inputs";

const aiAssistView: AIAssistView = new AIAssistView({
    enableAttachments: true,
    attachmentSettings: {
        saveUrl: 'https://services.syncfusion.com/js/production/api/FileUploader/Save',
        removeUrl: 'https://services.syncfusion.com/js/production/api/FileUploader/Remove'
    },
    attachmentUploadFailure: (args: FailureEventArgs) => {
        console.error('Upload failed:', args.file.name);
        // Show error notification
    },
    promptRequest: (args) => {
        setTimeout(() => {
            aiAssistView.addPromptResponse('Response...');
        }, 1000);
    }
});
```

#### attachmentRemoving

Triggered while an attached file is being removed. Use this event to perform custom actions (for example, prompting the user, validating removal, or updating state) before the file is detached from the prompt.

The following table lists the arguments available in the `attachmentRemoving` event.

| Argument | Type | Description |
|---|---|---|
| `cancel` | `boolean` | Defines whether the current action can be prevented. |
| `currentRequest` | `XMLHttpRequest` | Returns the `XMLHttpRequest` instance that is associated with the remove action. |
| `customFormData` | `{ [key: string]: Object }[]` | Defines the additional data with key and value pair format that will be submitted to the remove action. |
| `event` | `MouseEvent \| TouchEvent \| KeyboardEventArgs` | Returns the original event arguments. |
| `filesData` | `FileInfo[]` | Returns the list of files' details that will be removed. |
| `postRawFile` | `boolean` | Defines whether the selected raw file is sent to the server's remove action. Set to `true` to send the raw file, or `false` to send only the file name. |

```typescript
import { AIAssistView } from '@syncfusion/ej2-interactive-chat';
import { enableRipple } from '@syncfusion/ej2-base';
import { RemovingEventArgs } from '@syncfusion/ej2-inputs';

enableRipple(true);

const aiAssistView: AIAssistView = new AIAssistView({
    enableAttachments: true,
    attachmentSettings: {
        saveUrl: 'https://services.syncfusion.com/js/production/api/FileUploader/Save',
        removeUrl: 'https://services.syncfusion.com/js/production/api/FileUploader/Remove'
    },
    attachmentRemoving: (args: RemovingEventArgs) => {
        // Your required action here
        console.log('Removing file:', args.fileData.name);
    },
    promptRequest: (args) => {
        setTimeout(() => {
            aiAssistView.addPromptResponse('Response...');
        }, 1000);
    }
});
```

#### attachmentRemoved

Triggered when an attached file is removed.

```typescript
import { AIAssistView } from '@syncfusion/ej2-interactive-chat';
import { RemovingEventArgs } from "@syncfusion/ej2-inputs";

const aiAssistView: AIAssistView = new AIAssistView({
    enableAttachments: true,
    attachmentSettings: {
        saveUrl: 'https://services.syncfusion.com/js/production/api/FileUploader/Save',
        removeUrl: 'https://services.syncfusion.com/js/production/api/FileUploader/Remove'
    },
    attachmentRemoved: (args: RemovingEventArgs) => {
        console.log('File removed:', args.file.name);
    },
    promptRequest: (args) => {
        setTimeout(() => {
            aiAssistView.addPromptResponse('Response...');
        }, 1000);
    }
});
```

#### attachmentClick

Triggered when an attached file is clicked.

```typescript
const aiAssistView: AIAssistView = new AIAssistView({
    enableAttachments: true,
    attachmentSettings: {
        saveUrl: 'https://services.syncfusion.com/js/production/api/FileUploader/Save',
        removeUrl: 'https://services.syncfusion.com/js/production/api/FileUploader/Remove',
        attachmentClick: (args: AttachmentClickEventArgs) => {
            console.log('File clicked:', args.file.name);
            // Open file preview, download, etc.
        }
    },
    promptRequest: (args) => {
        setTimeout(() => {
            aiAssistView.addPromptResponse('Response...');
        }, 1000);
    }
});
```

---

## Summary

**Methods:**
- `addPromptResponse(string | object)`: Add responses or prompt-response pairs
- `executePrompt(string)`: Execute prompts programmatically
- `scrollToBottom()`: Scroll to latest message
- `refresh()`: Re-render component

**Core Events:**
- `created`: Component initialized
- `promptRequest`: User submitted prompt (most important)
- `promptChanged`: Input text changed
- `stopRespondingClick`: Stop streaming clicked

**Attachment Events:**
- `beforeAttachmentUpload`: Before upload starts
- `attachmentUploadSuccess`: Upload succeeded
- `attachmentUploadFailure`: Upload failed
- `attachmentRemoving`: File is being removed (pre-removal hook)
- `attachmentRemoved`: File removed
- `attachmentClick`: File clicked
