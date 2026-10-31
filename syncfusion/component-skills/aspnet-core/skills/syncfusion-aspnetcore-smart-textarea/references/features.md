# Smart TextArea Features and Capabilities

## Overview

The Smart TextArea combines all standard TextArea features with AI-powered text completion. This document covers core capabilities, user role configuration, suggestion behavior, and event handling.

## Core Features

| Feature | Description | Use Case |
|---------|-------------|----------|
| **AI Text Completion** | Real-time intelligent sentence suggestions | Content authoring, document editing |
| **Multiple Suggestion Modes** | Inline or popup suggestion display | Different UX preferences |
| **User Role Configuration** | Role-specific suggestion context | Optimize for audience type |
| **Custom Phrases** | Predefined snippets and suggestions | Frequently used phrases |
| **Floating Labels** | Animated labels that float on focus | Modern form designs |
| **Validation** | Input validation with error messages | Form submission safety |
| **RTL Support** | Right-to-left text direction support | Arabic, Hebrew, Persian languages |
| **Accessibility** | WCAG compliance with keyboard navigation | Screen reader support |
| **Form Integration** | Seamless form submission | Standard form handling |
| **Event System** | Multiple events for suggestion and input | Application integration |

## User Roles

Smart TextArea supports role-based suggestion optimization:

### Student Role

```cshtml
<ejs-smarttextarea id="essayContent" 
                   placeholder="Write your essay..." 
                   user-role="Student"
                   rows="12">
</ejs-smarttextarea>
```

**Characteristics:**
- Educational vocabulary and phrasing
- Formal writing structure suggestions
- Academic writing patterns
- Cite sources and example formatting

### Writer Role

```cshtml
<ejs-smarttextarea id="novelContent" 
                   placeholder="Write your story..." 
                   user-role="Writer"
                   rows="15">
</ejs-smarttextarea>
```

**Characteristics:**
- Creative vocabulary suggestions
- Narrative flow patterns
- Character dialogue suggestions
- Descriptive language enhancement

### Developer Role

```cshtml
<ejs-smarttextarea id="techDocumentation" 
                   placeholder="Document your code..." 
                   user-role="Developer"
                   rows="10">
</ejs-smarttextarea>
```

**Characteristics:**
- Technical terminology
- Code documentation patterns
- API documentation suggestions
- Technical explanation structure

### Custom Role

```cshtml
<ejs-smarttextarea id="customContent" 
                   placeholder="Start typing..." 
                   user-role="Custom"
                   rows="8"
                   user-phrases="@ViewBag.CustomPhrases">
</ejs-smarttextarea>
```

**Characteristics:**
- Custom phrase suggestions
- Industry-specific vocabulary
- Domain-specific patterns
- Personalized suggestions

## Floating Labels

Animate labels that move up when textarea gets focus:

```cshtml
<div class="form-floating">
    <ejs-smarttextarea id="floatingTextarea" 
                       placeholder="Enter description...">
    </ejs-smarttextarea>
    <label for="floatingTextarea">Description</label>
</div>

<style>
    .form-floating > label {
        position: absolute;
        top: 0;
        left: 0;
        padding: 1rem 0.75rem;
        pointer-events: none;
        border: 1px solid transparent;
        transform-origin: 0 0;
        transition: opacity 0.1s ease-in-out, transform 0.1s ease-in-out;
    }

    .form-floating > .form-control:focus ~ label,
    .form-floating > .form-control:not(:placeholder-shown) ~ label {
        opacity: 0.65;
        transform: scale(0.85) translateY(-0.5rem) translateX(-0.15rem);
    }
</style>
```

## Validation Features

### Required Field Validation

```cshtml
<ejs-smarttextarea id="remarks" 
                   placeholder="Enter remarks..."
                   required="true">
</ejs-smarttextarea>
```

### Custom Validation Messages

```csharp
// In Page Model
public ActionResult OnPost(string remarks)
{
    if (string.IsNullOrEmpty(remarks))
    {
        ModelState.AddModelError(nameof(remarks), "Remarks field is required");
        return Page();
    }
    
    return RedirectToPage("Success");
}
```

### Client-Side Validation

```html
<form method="post" id="feedbackForm">
    <textarea id="feedback" name="feedback" required></textarea>
    <span class="error-message" id="feedbackError"></span>
    <button type="submit">Submit Feedback</button>
</form>

<script>
    document.getElementById('feedbackForm').addEventListener('submit', function(e) {
        const feedback = document.getElementById('feedback').value;
        if (!feedback.trim()) {
            e.preventDefault();
            document.getElementById('feedbackError').textContent = 'Feedback is required';
        }
    });
</script>
```

## Event Handling

### ActionComplete Event

Triggered when a suggestion is applied:

```cshtml
<ejs-smarttextarea id="smartTextarea"
                   action-complete="onActionComplete">
</ejs-smarttextarea>

<script>
    function onActionComplete(args) {
        console.log('Suggestion applied:', args.value);
        // Handle suggestion application
    }
</script>
```

### Change Event

Triggered when content changes:

```cshtml
<ejs-smarttextarea id="smartTextarea"
                   change="onChange">
</ejs-smarttextarea>

<script>
    function onChange(args) {
        console.log('Content changed:', args.value);
        // Update character count, validation, etc.
    }
</script>
```

### Focus and Blur Events

```cshtml
<ejs-smarttextarea id="smartTextarea"
                   focus="onFocus"
                   blur="onBlur">
</ejs-smarttextarea>

<script>
    function onFocus(args) {
        console.log('TextArea focused');
        // Show hints or help text
    }

    function onBlur(args) {
        console.log('TextArea blurred');
        // Save draft, validate, etc.
    }
</script>
```

## Sizing and Dimensions

### Default Size

```cshtml
<ejs-smarttextarea id="defaultTextarea" 
                   placeholder="Default size textarea">
</ejs-smarttextarea>
```

### Custom Rows and Columns

```cshtml
<!-- Large textarea -->
<ejs-smarttextarea id="largeTextarea" 
                   placeholder="Large text editor"
                   rows="15"
                   cols="80">
</ejs-smarttextarea>

<!-- Small textarea -->
<ejs-smarttextarea id="smallTextarea" 
                   placeholder="Small comment box"
                   rows="3"
                   cols="30">
</ejs-smarttextarea>
```

### Resizable Textarea

```cshtml
<ejs-smarttextarea id="resizableTextarea" 
                   style="resize: both; min-height: 200px;">
</ejs-smarttextarea>
```

## Multi-Language and Localization

### RTL Support

```cshtml
<!-- Arabic Text -->
<ejs-smarttextarea id="arabicTextarea" 
                   placeholder="ابدأ بالكتابة..."
                   enable-rtl="true"
                   user-role="Writer">
</ejs-smarttextarea>

<!-- Hebrew Text -->
<ejs-smarttextarea id="hebrewTextarea" 
                   placeholder="התחל להקליד..."
                   enable-rtl="true">
</ejs-smarttextarea>
```

## Read-Only State

```cshtml
<!-- Read-only textarea -->
<ejs-smarttextarea id="readOnlyTextarea" 
                   value="This content cannot be edited..."
                   read-only="true">
</ejs-smarttextarea>
```

## Disabled State

```cshtml
<!-- Disabled textarea -->
<ejs-smarttextarea id="disabledTextarea" 
                   placeholder="This field is disabled"
                   disabled="true">
</ejs-smarttextarea>
```

## HTML Attributes

```cshtml
<ejs-smarttextarea id="fullFeaturedTextarea"
                   name="content"
                   placeholder="Enter your content here..."
                   title="Text content with AI suggestions"
                   rows="10"
                   cols="60"
                   maxlength="5000"
                   autocomplete="off"
                   spellcheck="true"
                   user-role="Writer">
</ejs-smarttextarea>
```

## Form Integration

### Standard Form Submission

```cshtml
<form method="post">
    <div class="form-group">
        <label>Article Content</label>
        <ejs-smarttextarea id="articleContent" 
                           name="articleContent"
                           required="true">
        </ejs-smarttextarea>
    </div>
    
    <button type="submit" class="btn btn-primary">Submit Article</button>
</form>
```

### AJAX Form Submission

```csharp
<script>
document.getElementById('articleForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = new FormData(this);
    const content = formData.get('articleContent');
    
    fetch('/api/articles/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: content })
    })
    .then(r => r.json())
    .then(data => console.log('Saved:', data))
    .catch(err => console.error('Error:', err));
});
</script>
```

## Complete Form Example

```cshtml
@page
@model BlogEditorModel

<h1>Blog Post Editor</h1>

<form method="post">
    <div class="form-group">
        <label for="title">Blog Title</label>
        <input type="text" id="title" name="title" class="form-control" required />
    </div>

    <div class="form-group">
        <label for="content">Content</label>
        <ejs-smarttextarea id="content" 
                           name="content"
                           placeholder="Write your blog post... AI will suggest completions"
                           user-role="Writer"
                           rows="15"
                           rows="15"
                           change="onContentChange"
                           action-complete="onSuggestionApplied">
        </ejs-smarttextarea>
        <small>Characters: <span id="charCount">0</span> / 10,000</small>
    </div>

    <div class="form-group">
        <label for="summary">Summary</label>
        <ejs-smarttextarea id="summary" 
                           name="summary"
                           placeholder="Brief summary of your post..."
                           rows="5">
        </ejs-smarttextarea>
    </div>

    <button type="submit" class="btn btn-primary">Publish</button>
    <button type="reset" class="btn btn-secondary">Clear</button>
</form>

<script>
    function onContentChange(args) {
        const charCount = args.value.length;
        document.getElementById('charCount').textContent = charCount;
    }

    function onSuggestionApplied(args) {
        console.log('Suggestion applied:', args.value);
    }
</script>
```

## Accessibility Features

### Keyboard Navigation

- **Tab** - Move to next control
- **Shift+Tab** - Move to previous control
- **Tab** (in suggestions) - Accept suggestion
- **Escape** - Close suggestion popup
- **Arrow Keys** - Navigate between suggestions

### Screen Reader Support

```cshtml
<ejs-smarttextarea id="accessible" 
                   aria-label="Content editor with AI suggestions"
                   aria-describedby="helpText"
                   role="textbox">
</ejs-smarttextarea>
<p id="helpText">Start typing to receive AI-powered text suggestions</p>
```

## Performance Optimization

- Lazy-load suggestions for better performance
- Debounce input events to reduce API calls
- Cache suggestions for repeated patterns
- Implement suggestion rate limiting
- Use efficient rendering for large content

## Reference

https://ej2.syncfusion.com/aspnetcore/documentation/smart-textarea/features
