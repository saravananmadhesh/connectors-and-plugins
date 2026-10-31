# TextArea Value and Content Management — ASP.NET Core

This reference covers getting and setting TextArea values, clearing content, and managing dynamic data.

## Table of Contents
- [Overview](#overview)
- [Setting Values](#setting-values)
- [Getting Values](#getting-values)
- [Clearing Content](#clearing-content)
- [Dynamic Content Loading](#dynamic-content-loading)
- [Form Submission](#form-submission)
- [Examples](#examples)

---

## Overview

The TextArea component provides multiple ways to manage its content programmatically and through user interaction.

---

## Setting Values

### Initial Value

Set an initial value using the `value` property:

**Razor View (CSHTML):**
```html
<ejs-textarea id="textarea" 
              value="This is the initial content"
              placeholder="Content appears here"
              rows="4">
</ejs-textarea>
```

### Programmatic Value Setting

Set or update the value using JavaScript:

**Razor View (CSHTML):**
```html
<ejs-textarea id="textarea" placeholder="Enter text"></ejs-textarea>

<button onclick="setContent()">Set Content</button>

<script>
    function setContent() {
        const textarea = document.getElementById('textarea').ej2_instances[0];
        textarea.value = "New content set programmatically";
    }
</script>
```

### Binding to Model Property

Use `asp-for` to bind to a C# property:

**Razor View (CSHTML):**
```html
<ejs-textarea asp-for="Model.Comments" 
              placeholder="Enter your comments"
              rows="5">
</ejs-textarea>
```

**C# Model:**
```csharp
public class FeedbackForm
{
    [StringLength(500)]
    public string Comments { get; set; }
}
```

**C# Controller:**
```csharp
[HttpGet]
public IActionResult Edit(int id)
{
    var feedback = _repository.GetFeedback(id);
    return View(feedback);
}

[HttpPost]
public IActionResult Edit(FeedbackForm model)
{
    _repository.Update(model);
    return RedirectToAction("Index");
}
```

---

## Getting Values

### Get Current Value

Retrieve the current TextArea content:

**Razor View (CSHTML):**
```html
<ejs-textarea id="textarea" placeholder="Enter text"></ejs-textarea>

<button onclick="getValue()">Get Value</button>

<script>
    function getValue() {
        const textarea = document.getElementById('textarea').ej2_instances[0];
        const value = textarea.value;
        console.log('Current value:', value);
        alert('Content: ' + value);
    }
</script>
```

### Get via HTML Element

Access value through the DOM element:

**Razor View (CSHTML):**
```html
<ejs-textarea id="textarea"></ejs-textarea>

<script>
    // Direct DOM access
    const domValue = document.getElementById('textarea').value;
    
    // Syncfusion component access
    const component = document.getElementById('textarea').ej2_instances[0];
    const componentValue = component.value;
</script>
```

### Get Value on Form Submit

**Razor View (CSHTML):**
```html
<form id="myForm">
    <ejs-textarea id="content" name="content" placeholder="Your content"></ejs-textarea>
    <button type="submit">Submit</button>
</form>

<script>
    document.getElementById('myForm').addEventListener('submit', function(e) {
        const textarea = document.getElementById('content').ej2_instances[0];
        const value = textarea.value;
        console.log('Submitting:', value);
        // Value will be posted as form data
    });
</script>
```

---

## Clearing Content

### Clear Using Method

**Razor View (CSHTML):**
```html
<ejs-textarea id="textarea" value="Some content"></ejs-textarea>

<button onclick="clearContent()">Clear</button>

<script>
    function clearContent() {
        const textarea = document.getElementById('textarea').ej2_instances[0];
        textarea.value = "";  // Clear by setting empty string
    }
</script>
```

### Clear Button in Form

**Razor View (CSHTML):**
```html
<form id="form">
    <ejs-textarea id="textarea" name="content" placeholder="Enter text"></ejs-textarea>
    
    <button type="button" onclick="clearForm()" class="btn btn-secondary">
        Clear
    </button>
    <button type="submit" class="btn btn-primary">Submit</button>
</form>

<script>
    function clearForm() {
        const textarea = document.getElementById('textarea').ej2_instances[0];
        textarea.value = "";
        textarea.focusIn();  // Optional: focus after clearing
    }
</script>
```

### Reset Form

**Razor View (CSHTML):**
```html
<form id="feedbackForm">
    <ejs-textarea id="feedback" placeholder="Your feedback"></ejs-textarea>
    
    <button type="reset" class="btn btn-secondary">Reset Form</button>
    <button type="submit" class="btn btn-primary">Submit</button>
</form>
```

---

## Dynamic Content Loading

### Load from Server

**Razor View (CSHTML):**
```html
<ejs-textarea id="textarea" placeholder="Loading..."></ejs-textarea>

<button onclick="loadContent()">Load Content</button>

<script>
    async function loadContent() {
        try {
            const response = await fetch('/api/content/load');
            const data = await response.json();
            
            const textarea = document.getElementById('textarea').ej2_instances[0];
            textarea.value = data.content;
        } catch (error) {
            console.error('Error loading content:', error);
        }
    }
</script>
```

**C# Controller:**
```csharp
[HttpGet("/api/content/load")]
public IActionResult GetContent()
{
    var content = _repository.GetContent();
    return Json(new { content = content });
}
```

### Load Template

**Razor View (CSHTML):**
```html
<ejs-textarea id="textarea" placeholder="Template will load"></ejs-textarea>

<button onclick="loadTemplate()" class="btn btn-primary">
    Load Template
</button>

<script>
    function loadTemplate() {
        const template = `Dear Customer,

Thank you for choosing our service.

Best regards,
Customer Support Team`;

        const textarea = document.getElementById('textarea').ej2_instances[0];
        textarea.value = template;
        textarea.focusIn();
    }
</script>
```

### Append Content

**Razor View (CSHTML):**
```html
<ejs-textarea id="textarea" value="Initial content"></ejs-textarea>

<button onclick="appendContent()">Add More</button>

<script>
    function appendContent() {
        const textarea = document.getElementById('textarea').ej2_instances[0];
        const newText = "\n\nAppended content: " + new Date().toLocaleString();
        textarea.value = textarea.value + newText;
    }
</script>
```

---

## Form Submission

### Model Binding

**Razor View (CSHTML):**
```html
<form asp-action="Submit" method="post">
    <div class="form-group">
        <label asp-for="Title"></label>
        <ejs-textarea asp-for="Title" 
                      placeholder="Enter title"
                      rows="2">
        </ejs-textarea>
        <span asp-validation-for="Title" class="text-danger"></span>
    </div>

    <div class="form-group">
        <label asp-for="Description"></label>
        <ejs-textarea asp-for="Description" 
                      placeholder="Enter description"
                      rows="5">
        </ejs-textarea>
        <span asp-validation-for="Description" class="text-danger"></span>
    </div>

    <button type="submit" class="btn btn-primary">Submit</button>
</form>
```

**C# Model:**
```csharp
public class ContentModel
{
    [Required(ErrorMessage = "Title is required")]
    [StringLength(100)]
    public string Title { get; set; }

    [Required(ErrorMessage = "Description is required")]
    [StringLength(1000)]
    public string Description { get; set; }
}
```

**C# Controller:**
```csharp
[HttpPost]
public IActionResult Submit(ContentModel model)
{
    if (!ModelState.IsValid)
        return View(model);

    _repository.Save(model);
    return RedirectToAction("Success");
}
```

### JavaScript Form Handling

**Razor View (CSHTML):**
```html
<form id="contentForm">
    <ejs-textarea id="content" name="content" required></ejs-textarea>
    <button type="submit" class="btn btn-primary">Submit</button>
</form>

<script>
    document.getElementById('contentForm').addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const textarea = document.getElementById('content').ej2_instances[0];
        const content = textarea.value;
        
        if (!content || content.trim() === '') {
            alert('Content is required');
            textarea.focusIn();
            return;
        }
        
        try {
            const response = await fetch('/api/content/save', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ content: content })
            });
            
            if (response.ok) {
                alert('Content saved successfully');
            }
        } catch (error) {
            console.error('Error saving content:', error);
        }
    });
</script>
```

---

## Examples

### Content Editor

**Razor View (CSHTML):**
```html
@{
    ViewBag.Title = "Content Editor";
}

<div class="container mt-5">
    <div class="row">
        <div class="col-md-8">
            <div class="card">
                <div class="card-body">
                    <h3 class="card-title">Document Editor</h3>

                    <form asp-action="SaveDocument" method="post">
                        <div class="form-group mb-3">
                            <label for="title" class="form-label">Document Title</label>
                            <input type="text" id="title" name="title" 
                                   class="form-control" placeholder="Untitled" />
                        </div>

                        <div class="form-group mb-3">
                            <label for="content" class="form-label">Content</label>
                            <ejs-textarea id="content" 
                                          name="content"
                                          placeholder="Start typing..."
                                          rows="10"
                                          cols="80"
                                          resizeMode="Both"
                                          input="updateCharCount">
                            </ejs-textarea>
                            
                            <small class="form-text text-muted mt-2">
                                <span id="charCount">0</span> characters
                            </small>
                        </div>

                        <div class="btn-group" role="group">
                            <button type="button" class="btn btn-outline-secondary" 
                                    onclick="loadTemplate()">
                                Load Template
                            </button>
                            <button type="button" class="btn btn-outline-secondary" 
                                    onclick="clearContent()">
                                Clear All
                            </button>
                            <button type="submit" class="btn btn-primary">
                                Save Document
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>

        <div class="col-md-4">
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">Actions</h5>
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">
                            <button class="btn btn-sm btn-link" onclick="insertDate()">
                                Insert Date
                            </button>
                        </li>
                        <li class="list-group-item">
                            <button class="btn btn-sm btn-link" onclick="insertSignature()">
                                Insert Signature
                            </button>
                        </li>
                        <li class="list-group-item">
                            <button class="btn btn-sm btn-link" onclick="selectAll()">
                                Select All
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</div>

<script>
    const textarea = document.getElementById('content').ej2_instances[0];

    function updateCharCount(args) {
        document.getElementById('charCount').textContent = (args.value || '').length;
    }

    function loadTemplate() {
        const template = `Subject: [Your Subject]

Dear [Recipient],

[Opening statement]

[Main body]

Best regards,
[Your Name]`;
        
        textarea.value = template;
    }

    function clearContent() {
        if (confirm('Clear all content?')) {
            textarea.value = '';
            textarea.focusIn();
        }
    }

    function insertDate() {
        const date = new Date().toLocaleDateString();
        textarea.value += '\n[' + date + ']';
    }

    function insertSignature() {
        textarea.value += '\n\n---\nBest regards';
    }

    function selectAll() {
        textarea.focusIn();
    }
</script>
```

### Survey Form with Value Management

**Razor View (CSHTML):**
```html
@model SurveyViewModel

<div class="container mt-5">
    <h3>Customer Satisfaction Survey</h3>

    <form asp-action="SubmitSurvey" method="post">
        <!-- Question 1 -->
        <div class="form-group mb-3">
            <label asp-for="Question1">How satisfied are you with our service?</label>
            <ejs-textarea asp-for="Question1" 
                          placeholder="Your answer..."
                          rows="3"
                          maxLength="300">
            </ejs-textarea>
        </div>

        <!-- Question 2 -->
        <div class="form-group mb-3">
            <label asp-for="Question2">What can we improve?</label>
            <ejs-textarea asp-for="Question2" 
                          placeholder="Your suggestions..."
                          rows="3"
                          maxLength="300">
            </ejs-textarea>
        </div>

        <!-- Question 3 -->
        <div class="form-group mb-4">
            <label asp-for="Question3">Additional comments</label>
            <ejs-textarea asp-for="Question3" 
                          placeholder="Anything else?"
                          rows="4"
                          maxLength="500">
            </ejs-textarea>
        </div>

        <div>
            <button type="submit" class="btn btn-primary">Submit Survey</button>
            <button type="button" class="btn btn-outline-secondary" 
                    onclick="resetForm()">
                Clear Responses
            </button>
        </div>
    </form>
</div>

<script>
    function resetForm() {
        if (confirm('Clear all responses?')) {
            document.querySelectorAll('ej2-textarea').forEach(el => {
                el.ej2_instances[0].value = '';
            });
        }
    }
</script>
```

---

## See Also

- `textarea-getting-started.md` — Quick start guide
- `textarea-form-support.md` — Form integration
- `textarea-events.md` — Event handling
- `textarea-methods.md` — Available methods
