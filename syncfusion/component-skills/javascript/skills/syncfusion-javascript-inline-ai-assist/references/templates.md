# Template Customization

The Inline AI Assist provides template options to customize the editor/prompt input area.

## Editor Template

Use the `editorTemplate` property to customize the default footer area and manage prompt request actions. This allows you to create unique prompt input interfaces that meet your specific needs.

### Basic Editor Template

```typescript
import { InlineAIAssist } from '@syncfusion/ej2-interactive-chat';

let inlineAssist = new InlineAIAssist({
    relateTo: '#summarizeBtn',
    editorTemplate: footerContent,
    promptRequest: () => {
        setTimeout(() => {
            inlineAssist.addResponse('AI-generated response...');
        }, 1000);
    },
    responseSettings: {
        itemSelect: (args) => {
            if (args.command.label === 'Accept') {
                const response = inlineAssist.prompts[inlineAssist.prompts.length - 1].response;
                document.getElementById('editableText').innerHTML = response;
                inlineAssist.hidePopup();
            } else if (args.command.label === 'Discard') {
                inlineAssist.hidePopup();
            }
        }
    }
});

inlineAssist.appendTo('#inlineAssist');

// Custom footer template function
function footerContent() {
    return `
        <div class="custom-footer">
            <textarea id="promptTextArea" class="e-input" rows="2" placeholder="Enter your prompt here"></textarea>
            <button id="sendPrompt" class="e-btn e-primary">Generate</button>
        </div>
    `;
}
```

### Template with Event Handling

```typescript
function footerContent() {
    return `
        <div class="custom-editor">
            <textarea id="customPrompt" class="e-input" placeholder="Type your request..."></textarea>
            <div class="button-group">
                <button id="clearBtn" class="e-btn">Clear</button>
                <button id="generateBtn" class="e-btn e-primary">Generate</button>
            </div>
        </div>
    `;
}

let inlineAssist = new InlineAIAssist({
    relateTo: '#aiBtn',
    editorTemplate: footerContent,
    created: () => {
        // Handle Generate button
        document.getElementById('generateBtn').addEventListener('click', () => {
            const promptInput = document.getElementById('customPrompt') as HTMLTextAreaElement;
            if (promptInput && promptInput.value.trim()) {
                inlineAssist.executePrompt(promptInput.value);
                promptInput.value = '';
            }
        });
        
        // Handle Clear button
        document.getElementById('clearBtn').addEventListener('click', () => {
            const promptInput = document.getElementById('customPrompt') as HTMLTextAreaElement;
            if (promptInput) {
                promptInput.value = '';
            }
        });
    }
});
```

### Template with Custom Styling

```typescript
function styledFooterContent() {
    return `
        <div class="styled-editor">
            <div class="prompt-container">
                <textarea id="styledPrompt" placeholder="Ask AI anything..."></textarea>
            </div>
            <div class="action-bar">
                <span class="char-count">0 / 500</span>
                <button id="sendBtn" class="send-button">
                    <i class="e-icons e-send"></i> Send
                </button>
            </div>
        </div>
    `;
}

let inlineAssist = new InlineAIAssist({
    relateTo: '#aiBtn',
    editorTemplate: styledFooterContent,
    created: () => {
        const textarea = document.getElementById('styledPrompt') as HTMLTextAreaElement;
        const charCount = document.querySelector('.char-count') as HTMLElement;
        const sendBtn = document.getElementById('sendBtn');
        
        // Character counter
        textarea.addEventListener('input', () => {
            const count = textarea.value.length;
            charCount.textContent = `${count} / 500`;
            
            if (count > 500) {
                charCount.style.color = 'red';
            } else {
                charCount.style.color = '';
            }
        });
        
        // Send button
        sendBtn.addEventListener('click', () => {
            if (textarea.value.trim()) {
                inlineAssist.executePrompt(textarea.value);
                textarea.value = '';
                charCount.textContent = '0 / 500';
            }
        });
    }
});
```

```css
.styled-editor {
    padding: 12px;
    background: #f9f9f9;
}

.prompt-container textarea {
    width: 100%;
    min-height: 80px;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    resize: vertical;
    font-size: 14px;
}

.action-bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 8px;
}

.char-count {
    font-size: 12px;
    color: #666;
}

.send-button {
    padding: 8px 16px;
    background: #0078d4;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 6px;
}

.send-button:hover {
    background: #005a9e;
}
```

---

## Response Template

Use the `responseTemplate` property to customize how AI-generated responses are rendered in the popup. This allows you to apply custom formatting, syntax highlighting, or special rendering logic to the response content.

### Basic Response Template

```typescript
import { InlineAIAssist } from '@syncfusion/ej2-interactive-chat';

function customResponseTemplate(data) {
    // data contains: { prompt, response, index }
    return `
        <div class="custom-response">
            <div class="response-header">
                <span class="ai-badge">AI Response</span>
                <span class="response-number">#${data.index + 1}</span>
            </div>
            <div class="response-content">
                ${data.response}
            </div>
            <div class="response-footer">
                <span class="prompt-label">Prompt: ${data.prompt}</span>
            </div>
        </div>
    `;
}

let inlineAssist = new InlineAIAssist({
    relateTo: '#aiBtn',
    responseTemplate: customResponseTemplate,
    promptRequest: async (args) => {
        const response = await getAIResponse(args.prompt);
        inlineAssist.addResponse(response);
    }
});

inlineAssist.appendTo('#inlineAssist');
```

### Response Template with Syntax Highlighting

```typescript
import marked from 'marked';
import hljs from 'highlight.js';

function syntaxHighlightedTemplate(data) {
    // Convert markdown to HTML
    const htmlContent = marked.parse(data.response);
    
    return `
        <div class="highlighted-response">
            <div class="code-toolbar">
                <button class="copy-code-btn" onclick="copyToClipboard()">
                    <i class="icon-copy"></i> Copy
                </button>
            </div>
            <div class="response-body">
                ${htmlContent}
            </div>
        </div>
    `;
}

let inlineAssist = new InlineAIAssist({
    relateTo: '#codeBtn',
    responseTemplate: syntaxHighlightedTemplate,
    promptRequest: async (args) => {
        const response = await getAICodeResponse(args.prompt);
        inlineAssist.addResponse(response);
    },
    created: () => {
        // Apply syntax highlighting after response is rendered
        document.querySelectorAll('pre code').forEach((block) => {
            hljs.highlightBlock(block);
        });
    }
});
```

### Response Template with Markdown Rendering

```typescript
import { marked } from 'marked';

function markdownResponseTemplate(data) {
    // Configure marked options
    marked.setOptions({
        breaks: true,
        gfm: true,
        highlight: (code, lang) => {
            if (lang && hljs.getLanguage(lang)) {
                return hljs.highlight(code, { language: lang }).value;
            }
            return code;
        }
    });
    
    const htmlResponse = marked.parse(data.response);
    
    return `
        <div class="markdown-response">
            <div class="response-meta">
                <span class="timestamp">${new Date().toLocaleTimeString()}</span>
                <span class="word-count">${data.response.split(' ').length} words</span>
            </div>
            <div class="markdown-content">
                ${htmlResponse}
            </div>
        </div>
    `;
}

let inlineAssist = new InlineAIAssist({
    relateTo: '#writeBtn',
    responseTemplate: markdownResponseTemplate,
    promptRequest: async (args) => {
        const response = await getAIResponse(args.prompt);
        inlineAssist.addResponse(response);
    }
});
```

### Response Template with Custom Formatting

```typescript
function formattedResponseTemplate(data) {
    // Format response with custom styling based on content type
    let formattedContent = data.response;
    
    // Detect and format code blocks
    formattedContent = formattedContent.replace(
        /```(\w+)?\n([\s\S]*?)```/g,
        (match, lang, code) => {
            return `<pre class="code-block" data-lang="${lang || 'text'}"><code>${escapeHtml(code)}</code></pre>`;
        }
    );
    
    // Format inline code
    formattedContent = formattedContent.replace(
        /`([^`]+)`/g,
        '<code class="inline-code">$1</code>'
    );
    
    // Format lists
    formattedContent = formattedContent.replace(
        /^\* (.+)$/gm,
        '<li class="list-item">$1</li>'
    );
    
    return `
        <div class="formatted-response">
            <div class="content-wrapper">
                ${formattedContent}
            </div>
            <div class="response-actions">
                <button class="action-btn" data-action="copy">Copy</button>
                <button class="action-btn" data-action="improve">Improve</button>
                <button class="action-btn" data-action="shorten">Shorten</button>
            </div>
        </div>
    `;
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

let inlineAssist = new InlineAIAssist({
    relateTo: '#formatBtn',
    responseTemplate: formattedResponseTemplate,
    promptRequest: handlePrompt
});
```

### Custom CSS for Response Templates

```css
/* Custom Response Styles */
.custom-response {
    padding: 16px;
    background: #fff;
    border-radius: 8px;
}

.response-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 12px;
    padding-bottom: 8px;
    border-bottom: 1px solid #e0e0e0;
}

.ai-badge {
    background: #0078d4;
    color: white;
    padding: 4px 12px;
    border-radius: 12px;
    font-size: 12px;
    font-weight: 600;
}

.response-number {
    color: #666;
    font-size: 12px;
}

.response-content {
    margin: 12px 0;
    line-height: 1.6;
    color: #333;
}

.response-footer {
    margin-top: 12px;
    padding-top: 8px;
    border-top: 1px solid #f0f0f0;
}

.prompt-label {
    font-size: 12px;
    color: #666;
    font-style: italic;
}

/* Syntax Highlighted Response */
.highlighted-response {
    background: #1e1e1e;
    border-radius: 8px;
    overflow: hidden;
}

.code-toolbar {
    background: #2d2d2d;
    padding: 8px 12px;
    display: flex;
    justify-content: flex-end;
}

.copy-code-btn {
    background: #0078d4;
    color: white;
    border: none;
    padding: 6px 12px;
    border-radius: 4px;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 6px;
}

.response-body {
    padding: 16px;
    color: #d4d4d4;
}

/* Markdown Response */
.markdown-response {
    padding: 16px;
}

.response-meta {
    display: flex;
    justify-content: space-between;
    margin-bottom: 12px;
    font-size: 12px;
    color: #999;
}

.markdown-content {
    line-height: 1.8;
}

.markdown-content h1, 
.markdown-content h2, 
.markdown-content h3 {
    margin-top: 16px;
    margin-bottom: 8px;
    color: #333;
}

.markdown-content code {
    background: #f5f5f5;
    padding: 2px 6px;
    border-radius: 3px;
    font-family: 'Consolas', 'Monaco', monospace;
}

.markdown-content pre {
    background: #1e1e1e;
    padding: 16px;
    border-radius: 6px;
    overflow-x: auto;
}

/* Formatted Response */
.formatted-response {
    padding: 16px;
}

.content-wrapper {
    margin-bottom: 16px;
}

.code-block {
    background: #2d2d2d;
    padding: 16px;
    border-radius: 6px;
    margin: 12px 0;
    overflow-x: auto;
}

.inline-code {
    background: #f5f5f5;
    padding: 2px 6px;
    border-radius: 3px;
    font-family: 'Courier New', monospace;
}

.list-item {
    margin-left: 20px;
    margin-bottom: 8px;
}

.response-actions {
    display: flex;
    gap: 8px;
    padding-top: 12px;
    border-top: 1px solid #e0e0e0;
}

.action-btn {
    padding: 6px 12px;
    background: #f5f5f5;
    border: 1px solid #ddd;
    border-radius: 4px;
    cursor: pointer;
    font-size: 13px;
}

.action-btn:hover {
    background: #e8e8e8;
}
```

---

## ExecutePrompt Method with Custom Templates

When using custom templates, use the `executePrompt()` method to trigger prompt requests.

### Basic ExecutePrompt Usage

```typescript
document.addEventListener('click', (event) => {
    if (event.target && (event.target as HTMLElement).id === 'sendPrompt') {
        const textArea = document.getElementById('promptTextArea') as HTMLTextAreaElement;
        if (textArea && textArea.value.trim()) {
            inlineAssist.executePrompt(textArea.value);
            textArea.value = '';
        }
    }
});
```

### ExecutePrompt with Validation

```typescript
document.getElementById('generateBtn').addEventListener('click', () => {
    const promptInput = document.getElementById('customPrompt') as HTMLTextAreaElement;
    const promptText = promptInput.value.trim();
    
    // Validate prompt
    if (!promptText) {
        alert('Please enter a prompt');
        return;
    }
    
    if (promptText.length > 500) {
        alert('Prompt is too long (max 500 characters)');
        return;
    }
    
    // Execute prompt
    inlineAssist.executePrompt(promptText);
    promptInput.value = '';
});
```

---

## Advanced Template Patterns

### Pattern 1: Multi-Button Template

```typescript
function multiButtonTemplate() {
    return `
        <div class="multi-action-editor">
            <textarea id="mainPrompt" placeholder="Enter your text..."></textarea>
            <div class="quick-actions">
                <button class="action-btn" data-action="summarize">Summarize</button>
                <button class="action-btn" data-action="translate">Translate</button>
                <button class="action-btn" data-action="improve">Improve</button>
                <button class="action-btn primary" data-action="custom">Custom</button>
            </div>
        </div>
    `;
}

let inlineAssist = new InlineAIAssist({
    relateTo: '#aiBtn',
    editorTemplate: multiButtonTemplate,
    created: () => {
        const textarea = document.getElementById('mainPrompt') as HTMLTextAreaElement;
        const buttons = document.querySelectorAll('.action-btn');
        
        buttons.forEach(btn => {
            btn.addEventListener('click', () => {
                const action = btn.getAttribute('data-action');
                const text = textarea.value.trim();
                
                let prompt = '';
                switch (action) {
                    case 'summarize':
                        prompt = `Summarize: ${text}`;
                        break;
                    case 'translate':
                        prompt = `Translate to Spanish: ${text}`;
                        break;
                    case 'improve':
                        prompt = `Improve writing: ${text}`;
                        break;
                    case 'custom':
                        prompt = text;
                        break;
                }
                
                if (prompt) {
                    inlineAssist.executePrompt(prompt);
                }
            });
        });
    }
});
```

### Pattern 2: Dropdown + Input Template

```typescript
function dropdownTemplate() {
    return `
        <div class="dropdown-editor">
            <select id="actionSelect" class="e-input">
                <option value="">Select action...</option>
                <option value="summarize">Summarize</option>
                <option value="translate">Translate</option>
                <option value="grammar">Fix Grammar</option>
                <option value="custom">Custom Prompt</option>
            </select>
            <textarea id="inputText" placeholder="Enter text here..."></textarea>
            <button id="executeBtn" class="e-btn e-primary">Execute</button>
        </div>
    `;
}

let inlineAssist = new InlineAIAssist({
    relateTo: '#aiBtn',
    editorTemplate: dropdownTemplate,
    created: () => {
        const select = document.getElementById('actionSelect') as HTMLSelectElement;
        const textarea = document.getElementById('inputText') as HTMLTextAreaElement;
        const executeBtn = document.getElementById('executeBtn');
        
        executeBtn.addEventListener('click', () => {
            const action = select.value;
            const text = textarea.value.trim();
            
            if (!action || !text) {
                alert('Please select an action and enter text');
                return;
            }
            
            let prompt = '';
            if (action === 'custom') {
                prompt = text;
            } else {
                prompt = `${action}: ${text}`;
            }
            
            inlineAssist.executePrompt(prompt);
        });
    }
});
```

### Pattern 3: Voice Input Template

```typescript
function voiceInputTemplate() {
    return `
        <div class="voice-editor">
            <textarea id="voicePrompt" placeholder="Type or speak your prompt..."></textarea>
            <div class="controls">
                <button id="voiceBtn" class="e-btn">
                    <i class="e-icons e-microphone"></i> Voice Input
                </button>
                <button id="submitBtn" class="e-btn e-primary">Submit</button>
            </div>
        </div>
    `;
}

let inlineAssist = new InlineAIAssist({
    relateTo: '#aiBtn',
    editorTemplate: voiceInputTemplate,
    created: () => {
        const textarea = document.getElementById('voicePrompt') as HTMLTextAreaElement;
        const voiceBtn = document.getElementById('voiceBtn');
        const submitBtn = document.getElementById('submitBtn');
        
        // Voice recognition
        voiceBtn.addEventListener('click', () => {
            if ('webkitSpeechRecognition' in window) {
                const recognition = new (window as any).webkitSpeechRecognition();
                recognition.lang = 'en-US';
                
                recognition.onresult = (event: any) => {
                    const transcript = event.results[0][0].transcript;
                    textarea.value = transcript;
                };
                
                recognition.start();
            } else {
                alert('Voice recognition not supported');
            }
        });
        
        // Submit
        submitBtn.addEventListener('click', () => {
            if (textarea.value.trim()) {
                inlineAssist.executePrompt(textarea.value);
                textarea.value = '';
            }
        });
    }
});
```

---

## Template Context and Data Binding

Templates have access to the component context through closures.

### Using Component State in Templates

```typescript
let characterLimit = 500;
let actionHistory = [];

function contextAwareTemplate() {
    return `
        <div class="context-editor">
            <textarea id="contextPrompt" placeholder="Enter prompt..."></textarea>
            <div class="info-bar">
                <span class="limit-info">Limit: ${characterLimit}</span>
                <span class="history-info">History: ${actionHistory.length}</span>
            </div>
            <button id="contextSubmit" class="e-btn e-primary">Submit</button>
        </div>
    `;
}

let inlineAssist = new InlineAIAssist({
    relateTo: '#aiBtn',
    editorTemplate: contextAwareTemplate,
    created: () => {
        document.getElementById('contextSubmit').addEventListener('click', () => {
            const textarea = document.getElementById('contextPrompt') as HTMLTextAreaElement;
            const prompt = textarea.value.trim();
            
            if (prompt && prompt.length <= characterLimit) {
                actionHistory.push(prompt);
                inlineAssist.executePrompt(prompt);
                textarea.value = '';
                
                // Update info
                document.querySelector('.history-info').textContent = `History: ${actionHistory.length}`;
            }
        });
    }
});
```

---

## Complete Custom Template Example

```typescript
import { InlineAIAssist } from '@syncfusion/ej2-interactive-chat';

function advancedEditorTemplate() {
    return `
        <div class="advanced-editor">
            <div class="editor-header">
                <span class="header-title">AI Assistant</span>
                <button id="helpBtn" class="icon-btn">
                    <i class="e-icons e-help"></i>
                </button>
            </div>
            <div class="editor-body">
                <textarea id="advancedPrompt" placeholder="Describe what you need..."></textarea>
                <div class="suggestions">
                    <button class="suggestion-chip" data-prompt="Summarize this content">Summarize</button>
                    <button class="suggestion-chip" data-prompt="Improve writing">Improve</button>
                    <button class="suggestion-chip" data-prompt="Fix grammar">Grammar</button>
                </div>
            </div>
            <div class="editor-footer">
                <span class="char-counter">0 / 500</span>
                <div class="action-buttons">
                    <button id="clearPrompt" class="e-btn">Clear</button>
                    <button id="sendPrompt" class="e-btn e-primary">
                        <i class="e-icons e-send"></i> Send
                    </button>
                </div>
            </div>
        </div>
    `;
}

let inlineAssist = new InlineAIAssist({
    relateTo: '#improveBtn',
    editorTemplate: advancedEditorTemplate,
    promptRequest: (args) => {
        callAIService(args.prompt).then(response => {
            inlineAssist.addResponse(response);
        });
    },
    created: () => {
        const textarea = document.getElementById('advancedPrompt') as HTMLTextAreaElement;
        const charCounter = document.querySelector('.char-counter') as HTMLElement;
        const sendBtn = document.getElementById('sendPrompt');
        const clearBtn = document.getElementById('clearPrompt');
        const helpBtn = document.getElementById('helpBtn');
        const suggestions = document.querySelectorAll('.suggestion-chip');
        
        // Character counter
        textarea.addEventListener('input', () => {
            const count = textarea.value.length;
            charCounter.textContent = `${count} / 500`;
        });
        
        // Send button
        sendBtn.addEventListener('click', () => {
            if (textarea.value.trim()) {
                inlineAssist.executePrompt(textarea.value);
                textarea.value = '';
                charCounter.textContent = '0 / 500';
            }
        });
        
        // Clear button
        clearBtn.addEventListener('click', () => {
            textarea.value = '';
            charCounter.textContent = '0 / 500';
        });
        
        // Help button
        helpBtn.addEventListener('click', () => {
            alert('Enter your prompt and click Send to get AI assistance.');
        });
        
        // Suggestion chips
        suggestions.forEach(chip => {
            chip.addEventListener('click', () => {
                const prompt = chip.getAttribute('data-prompt');
                textarea.value = prompt;
                charCounter.textContent = `${prompt.length} / 500`;
            });
        });
    }
});

inlineAssist.appendTo('#inlineAssist');
```
