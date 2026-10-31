# Smart TextArea Customization

## Overview

Smart TextArea provides extensive customization options for suggestion display, user roles, custom phrases, appearance, and styling. This guide covers all customization capabilities with practical examples.

## Suggestion Display Modes

### Inline Suggestion Mode (Default)

Suggestions appear inline as the user types:

```cshtml
<ejs-smarttextarea id="inlineTextarea" 
                   placeholder="AI suggestions appear as you type..."
                   suggestion-mode="Inline"
                   rows="10">
</ejs-smarttextarea>
```

**Characteristics:**
- Suggestions appear directly in the textarea
- Non-intrusive and natural
- Smoother typing experience
- Press Tab to accept suggestion

### Popup Suggestion Mode

Suggestions appear in a separate popup box:

```cshtml
<ejs-smarttextarea id="popupTextarea" 
                   placeholder="AI suggestions appear in popup..."
                   suggestion-mode="Popup"
                   rows="10">
</ejs-smarttextarea>
```

**Characteristics:**
- Separate suggestion display window
- Clearer distinction between suggestion and input
- Better for longer suggestions
- Click or Tab to accept
- Close with Escape key

## User Roles and Context

### Student Role with Custom Setup

```cshtml
<div class="form-group">
    <label for="studentEssay">Essay Writing (Student Mode)</label>
    <ejs-smarttextarea id="studentEssay"
                       placeholder="Write your essay with AI guidance..."
                       user-role="Student"
                       suggestion-mode="Popup"
                       rows="12">
    </ejs-smarttextarea>
</div>
```

### Writer Role for Creative Content

```cshtml
<div class="form-group">
    <label for="storyWriter">Story Writing (Writer Mode)</label>
    <ejs-smarttextarea id="storyWriter"
                       placeholder="Tell your story with AI inspiration..."
                       user-role="Writer"
                       suggestion-mode="Inline"
                       rows="15">
    </ejs-smarttextarea>
</div>
```

### Developer Role for Documentation

```cshtml
<div class="form-group">
    <label for="devDocs">Technical Documentation (Developer Mode)</label>
    <ejs-smarttextarea id="devDocs"
                       placeholder="Document your code with AI assistance..."
                       user-role="Developer"
                       rows="10">
    </ejs-smarttextarea>
</div>
```

### Custom Role with Custom Phrases

```cshtml
<div class="form-group">
    <label for="customContent">Custom Domain Content</label>
    <ejs-smarttextarea id="customContent"
                       placeholder="Industry-specific suggestions..."
                       user-role="Custom"
                       user-phrases="@(new string[] { "regulation", "compliance", "audit trail", "policy document" })"
                       rows="10">
    </ejs-smarttextarea>
</div>
```

## Custom Phrases Configuration

### Array of Predefined Phrases

```cshtml
<ejs-smarttextarea id="phraseTextarea"
                   placeholder="Type and see custom suggestions..."
                   user-role="Custom"
                   user-phrases="@(new string[] { 
                       "Best regards",
                       "Thank you for your feedback",
                       "Please let us know",
                       "We appreciate your business",
                       "Looking forward to hearing from you"
                   })"
                   rows="8">
</ejs-smarttextarea>
```

### Dynamic Phrases from Backend

**Page Model:**
```csharp
public class EmailTemplateModel : PageModel
{
    public string[] EmailSignoffs { get; set; }

    public void OnGet()
    {
        EmailSignoffs = new string[]
        {
            "Sincerely",
            "Best regards",
            "Warm regards",
            "Thank you",
            "Thanks for your time"
        };
    }
}
```

**Razor Page:**
```cshtml
<ejs-smarttextarea id="emailBody"
                   placeholder="Compose email with template phrases..."
                   user-role="Custom"
                   user-phrases="@Model.EmailSignoffs"
                   rows="10">
</ejs-smarttextarea>
```

## Placeholder Customization

```cshtml
<!-- Custom Placeholder for Different Contexts -->

<!-- For Blog Posts -->
<ejs-smarttextarea id="blogContent"
                   placeholder="Start your blog post... What's on your mind?"
                   rows="15">
</ejs-smarttextarea>

<!-- For Customer Reviews -->
<ejs-smarttextarea id="reviewContent"
                   placeholder="Share your experience... Help other customers"
                   rows="8">
</ejs-smarttextarea>

<!-- For Technical Notes -->
<ejs-smarttextarea id="technicalNotes"
                   placeholder="Document your findings... AI suggests technical phrases"
                   rows="10">
</ejs-smarttextarea>

<!-- For Customer Support -->
<ejs-smarttextarea id="supportResponse"
                   placeholder="Type your response... AI suggests helpful phrases"
                   rows="6">
</ejs-smarttextarea>
```

## Appearance and Sizing

### Small Comment Box

```cshtml
<ejs-smarttextarea id="commentBox"
                   placeholder="Add a comment..."
                   rows="3"
                   cols="40"
                   css-class="small-textarea">
</ejs-smarttextarea>

<style>
    .small-textarea {
        padding: 8px;
        font-size: 12px;
    }
</style>
```

### Large Content Editor

```cshtml
<ejs-smarttextarea id="contentEditor"
                   placeholder="Write your full content here..."
                   rows="20"
                   cols="80"
                   css-class="large-editor"
                   style="width: 100%; max-width: 1200px;">
</ejs-smarttextarea>

<style>
    .large-editor {
        padding: 16px;
        font-size: 16px;
        line-height: 1.6;
    }
</style>
```

### Full-Width Responsive

```cshtml
<ejs-smarttextarea id="responsiveTextarea"
                   placeholder="Full-width responsive textarea..."
                   rows="10"
                   css-class="responsive-textarea"
                   style="width: 100%;">
</ejs-smarttextarea>

<style>
    .responsive-textarea {
        width: 100%;
        max-width: none;
        padding: 12px;
    }

    @media (max-width: 768px) {
        .responsive-textarea {
            font-size: 14px;
            padding: 10px;
        }
    }
</style>
```

## Custom Styling

### Custom CSS Classes

```cshtml
<ejs-smarttextarea id="styledTextarea"
                   placeholder="Custom styled textarea..."
                   css-class="modern-editor"
                   rows="10">
</ejs-smarttextarea>

<style>
    .modern-editor {
        border: 2px solid #667eea;
        border-radius: 8px;
        padding: 12px;
        font-family: 'Fira Code', monospace;
        font-size: 14px;
        line-height: 1.5;
        background-color: #f9fafb;
        color: #1a202c;
    }

    .modern-editor:focus {
        outline: none;
        border-color: #764ba2;
        box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
    }

    .modern-editor::placeholder {
        color: #a0aec0;
        font-style: italic;
    }
</style>
```

### Theme-Aware Styling

```cshtml
<ejs-smarttextarea id="themedTextarea"
                   placeholder="Theme-aware styling..."
                   css-class="theme-aware"
                   rows="10">
</ejs-smarttextarea>

<style>
    /* Light Theme (Default) */
    :root {
        --textarea-bg: white;
        --textarea-border: #e2e8f0;
        --textarea-text: #1a202c;
        --textarea-focus-border: #667eea;
    }

    /* Dark Theme */
    [data-theme='dark'] {
        --textarea-bg: #1a202c;
        --textarea-border: #4a5568;
        --textarea-text: #edf2f7;
        --textarea-focus-border: #9f7aea;
    }

    .theme-aware {
        background-color: var(--textarea-bg);
        border: 1px solid var(--textarea-border);
        color: var(--textarea-text);
        border-radius: 4px;
        padding: 10px;
    }

    .theme-aware:focus {
        border-color: var(--textarea-focus-border);
    }
</style>
```

### Modern Dark Mode

```cshtml
<ejs-smarttextarea id="darkModeTextarea"
                   placeholder="Professional dark mode editor..."
                   css-class="dark-editor"
                   rows="12">
</ejs-smarttextarea>

<style>
    .dark-editor {
        background-color: #0d1117;
        border: 1px solid #30363d;
        color: #c9d1d9;
        border-radius: 6px;
        padding: 12px;
        font-family: 'Monaco', 'Menlo', 'Ubuntu Mono', monospace;
        font-size: 13px;
        line-height: 1.45;
    }

    .dark-editor:focus {
        outline: none;
        border-color: #58a6ff;
        box-shadow: 0 0 0 3px rgba(88, 166, 255, 0.1);
    }

    .dark-editor::placeholder {
        color: #6e7681;
    }
</style>
```

## Event-Driven Customization

### Dynamic Suggestion Mode Toggle

```cshtml
<div class="form-group">
    <label>
        <input type="checkbox" id="toggleSuggestionMode" />
        Use Popup Mode
    </label>
</div>

<ejs-smarttextarea id="customizeableTextarea"
                   placeholder="Toggle between inline and popup..."
                   suggestion-mode="Inline"
                   rows="10">
</ejs-smarttextarea>

<script>
    document.getElementById('toggleSuggestionMode').addEventListener('change', function(e) {
        const mode = e.target.checked ? 'Popup' : 'Inline';
        // Update suggestion mode dynamically
        // This would require accessing the component instance
    });
</script>
```

### Dynamic Phrase Updates

```cshtml
<ejs-smarttextarea id="dynamicPhrasesTextarea"
                   placeholder="Phrases update based on context..."
                   user-role="Custom"
                   user-phrases="@(new string[] { })"
                   rows="10">
</ejs-smarttextarea>

<script>
    // Update phrases based on context selection
    document.getElementById('contextSelect').addEventListener('change', function(e) {
        const context = e.target.value;
        fetch(`/api/phrases/${context}`)
            .then(r => r.json())
            .then(phrases => {
                // Update component phrases
                console.log('Updated phrases:', phrases);
            });
    });
</script>
```

## Complete Customization Example

```cshtml
@page
@model ContentEditorModel

<div class="editor-container">
    <h1>AI-Powered Content Editor</h1>

    <!-- Configuration Panel -->
    <div class="config-panel">
        <div class="config-group">
            <label for="modeSelect">Suggestion Mode:</label>
            <select id="modeSelect" class="form-control">
                <option value="Inline">Inline</option>
                <option value="Popup">Popup</option>
            </select>
        </div>

        <div class="config-group">
            <label for="roleSelect">User Role:</label>
            <select id="roleSelect" class="form-control">
                <option value="Writer">Writer</option>
                <option value="Student">Student</option>
                <option value="Developer">Developer</option>
            </select>
        </div>
    </div>

    <!-- Editor Form -->
    <form method="post">
        <div class="form-group">
            <label for="title">Title</label>
            <input type="text" id="title" name="title" class="form-control" required />
        </div>

        <div class="form-group">
            <label for="content">Content</label>
            <ejs-smarttextarea id="content"
                               name="content"
                               placeholder="Start typing... AI will provide suggestions"
                               user-role="Writer"
                               suggestion-mode="Inline"
                               css-class="content-editor"
                               rows="15"
                               change="onContentChange">
            </ejs-smarttextarea>
            <div class="editor-stats">
                <span id="charCount">0</span> characters | 
                <span id="wordCount">0</span> words
            </div>
        </div>

        <div class="form-actions">
            <button type="submit" class="btn btn-primary">Save</button>
            <button type="reset" class="btn btn-secondary">Clear</button>
        </div>
    </form>
</div>

<style>
    .editor-container {
        max-width: 900px;
        margin: 20px auto;
        padding: 20px;
        background: white;
        border-radius: 8px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }

    .config-panel {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 15px;
        margin-bottom: 30px;
        padding: 15px;
        background-color: #f7fafc;
        border-radius: 6px;
    }

    .config-group {
        display: flex;
        flex-direction: column;
    }

    .config-group label {
        font-weight: 600;
        margin-bottom: 5px;
        color: #2d3748;
    }

    .form-group {
        margin-bottom: 20px;
    }

    .form-group label {
        display: block;
        font-weight: 600;
        margin-bottom: 8px;
        color: #2d3748;
    }

    .content-editor {
        border: 2px solid #e2e8f0;
        border-radius: 6px;
        padding: 12px;
        font-size: 15px;
        line-height: 1.6;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto;
    }

    .content-editor:focus {
        outline: none;
        border-color: #667eea;
        box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
    }

    .editor-stats {
        margin-top: 8px;
        font-size: 12px;
        color: #718096;
    }

    .form-actions {
        display: flex;
        gap: 10px;
        margin-top: 20px;
    }

    .btn {
        padding: 10px 20px;
        border: none;
        border-radius: 4px;
        font-weight: 600;
        cursor: pointer;
    }

    .btn-primary {
        background-color: #667eea;
        color: white;
    }

    .btn-primary:hover {
        background-color: #5568d3;
    }

    .btn-secondary {
        background-color: #e2e8f0;
        color: #2d3748;
    }

    .btn-secondary:hover {
        background-color: #cbd5e0;
    }
</style>

<script>
    function onContentChange(args) {
        const content = args.value;
        document.getElementById('charCount').textContent = content.length;
        
        const words = content.trim().split(/\s+/).filter(w => w.length > 0).length;
        document.getElementById('wordCount').textContent = words;
    }
</script>
```

## Theme Integration

Smart TextArea respects Syncfusion global themes:

- **Fluent2** - Modern Microsoft design
- **Bootstrap4** - Bootstrap 4 compatibility
- **Bootstrap5** - Bootstrap 5 compatibility
- **Tailwind** - Tailwind CSS design
- **Material** - Google Material Design

## Accessibility Customization

```cshtml
<ejs-smarttextarea id="accessibleTextarea"
                   aria-label="Content editor with AI suggestions"
                   aria-describedby="editorHelp"
                   placeholder="Accessible textarea"
                   rows="10">
</ejs-smarttextarea>

<p id="editorHelp" class="sr-only">
    Start typing to receive AI-powered text suggestions. 
    Press Tab to accept a suggestion, or Escape to dismiss it.
</p>
```

## Reference

https://ej2.syncfusion.com/aspnetcore/documentation/smart-textarea/customization
