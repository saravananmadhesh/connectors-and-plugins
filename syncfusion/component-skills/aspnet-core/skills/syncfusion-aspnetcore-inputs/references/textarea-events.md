# TextArea Events — ASP.NET Core

This reference covers all TextArea events including user interactions, focus changes, and validation.

## Table of Contents
- [Overview](#overview)
- [Created Event](#created-event)
- [Input Event](#input-event)
- [Change Event](#change-event)
- [Focus Event](#focus-event)
- [Blur Event](#blur-event)
- [Destroyed Event](#destroyed-event)
- [Examples](#examples)

---

## Overview

TextArea events fire in response to user interactions and component state changes. Use these to implement custom behavior and validations.

---

## Created Event

Fires when the TextArea control is created and initialized:

```html
@using Syncfusion.EJ2.Inputs

<ejs-textarea id="default" created="created"></ejs-textarea>

<script>
    function created() {
        // Component is ready
        console.log('TextArea created');
    }
</script>
```

---

## Input Event

Fires each time when the value of TextArea changes. Provides real-time feedback as user types:

```html
@using Syncfusion.EJ2.Inputs

<ejs-textarea id="default" input="inputHandler"></ejs-textarea>

<script>
    function inputHandler(args) {
        console.log('Current value:', args.value);
    }
</script>
```

---

## Change Event

Fires when the content changes and the TextArea loses focus:

```html
@using Syncfusion.EJ2.Inputs

<ejs-textarea id="default" change="changeHandler"></ejs-textarea>

<script>
    function changeHandler(args) {
        console.log('Value changed to:', args.value);
        console.log('Previous value:', args.previousValue);
    }
</script>
```

---

## Focus Event

Fires when the TextArea gains focus:

```html
@using Syncfusion.EJ2.Inputs

<ejs-textarea id="default" focus="focusHandler"></ejs-textarea>

<script>
    function focusHandler(args) {
        console.log('TextArea focused');
    }
</script>
```

---

## Blur Event

Fires when the TextArea loses focus:

```html
@using Syncfusion.EJ2.Inputs

<ejs-textarea id="default" blur="blurHandler"></ejs-textarea>

<script>
    function blurHandler(args) {
        console.log('TextArea blurred');
        console.log('Final value:', args.value);
    }
</script>
```

---

## Destroyed Event

Fires when the TextArea control is destroyed:

```html
@using Syncfusion.EJ2.Inputs

<ejs-textarea id="default" destroyed="destroyed"></ejs-textarea>

<script>
    function destroyed() {
        console.log('TextArea destroyed');
    }
</script>
```

---

## Event Arguments

### EventArgs Object

All TextArea events provide an `args` object with the following properties:

- **value** - Current text content of the TextArea
- **event** - The original DOM event object
- **previousValue** - Previous text value (for change event)

```html
<ejs-textarea id="textarea" change="handleChange">
</ejs-textarea>

<script>
function handleChange(args) {
    console.log('Current value:', args.value);
    console.log('Previous value:', args.previousValue);
    console.log('Event object:', args.event);
}
</script>
```

---

## Event Examples

### Change Event

Fires when the value changes:

```html
<ejs-textarea id="textarea" change="onValueChange">
</ejs-textarea>

<script>
function onValueChange(args) {
    console.log('Value changed to:', args.value);
}
</script>
```

### Focus Event

Fires when the TextArea receives focus:

```html
<ejs-textarea id="textarea" placeholder="Click to focus" focus="onFocus">
</ejs-textarea>

<script>
function onFocus(args) {
    console.log('TextArea focused');
    document.getElementById('status').textContent = 'Active (focused)';
}
</script>
```

### Blur Event

Fires when the TextArea loses focus:

```html
<ejs-textarea id="textarea" blur="onBlur">
</ejs-textarea>

<script>
function onBlur(args) {
    console.log('TextArea blurred');
    console.log('Final value:', args.value);
}
</script>
```

### Input Event

Fires as the user types or pastes content:

```html
<ejs-textarea id="textarea" maxLength="500" input="onInput">
</ejs-textarea>

<script>
function onInput(args) {
    const currentLength = (args.value || '').length;
    const remaining = 500 - currentLength;
    
    document.getElementById('charCount').textContent = 
        currentLength + ' / 500 (' + remaining + ' remaining)';
}
</script>
```

---

## Real-World Scenarios

### Scenario 1: Character Counter with Max Length

```html
<div style="max-width: 600px;">
    <label for="comment">Comment (max 280 characters):</label>
    <ejs-textarea id="comment" 
        maxLength="280"
        placeholder="Share your thoughts..."
        rows="4"
        input="updateCharCount">
    </ejs-textarea>
    
    <div style="margin-top: 10px; display: flex; justify-content: space-between;">
        <span id="charDisplay">0 / 280</span>
        <button onclick="submitComment()" id="submitBtn" disabled>Submit</button>
    </div>
</div>

<script>
function updateCharCount(args) {
    const length = (args.value || '').length;
    const remaining = 280 - length;
    
    document.getElementById('charDisplay').textContent = length + ' / 280';
    
    // Enable submit button only if content exists
    document.getElementById('submitBtn').disabled = length === 0;
    
    // Change color as user approaches limit
    if (remaining < 50) {
        document.getElementById('charDisplay').style.color = 'orange';
    } else if (remaining < 10) {
        document.getElementById('charDisplay').style.color = 'red';
    } else {
        document.getElementById('charDisplay').style.color = 'inherit';
    }
}

function submitComment() {
    const comment = document.getElementById('comment').ej2_instances[0].value;
    console.log('Submitting comment:', comment);
}
</script>
```

### Scenario 2: Auto-Save Draft on Blur

```html
<div style="max-width: 600px;">
    <label for="draft">Your Article Draft:</label>
    <ejs-textarea id="draft"
        placeholder="Write your article..."
        rows="8"
        blur="saveDraft">
    </ejs-textarea>
    
    <div id="saveStatus" style="margin-top: 10px; color: #666; font-size: 0.875rem;">
        <!-- Save status will appear here -->
    </div>
</div>

<script>
function saveDraft(args) {
    const content = args.value;
    const timestamp = new Date().toLocaleTimeString();
    
    // Save to localStorage for demo
    localStorage.setItem('article-draft', content);
    localStorage.setItem('draft-saved-at', timestamp);
    
    // Show save confirmation
    const statusDiv = document.getElementById('saveStatus');
    statusDiv.textContent = '✓ Draft saved at ' + timestamp;
    statusDiv.style.color = '#28a745';
    
    // Hide message after 3 seconds
    setTimeout(function() {
        statusDiv.textContent = '';
    }, 3000);
}

// Restore draft on page load
document.addEventListener('DOMContentLoaded', function() {
    const savedDraft = localStorage.getItem('article-draft');
    if (savedDraft) {
        document.getElementById('draft').ej2_instances[0].value = savedDraft;
        document.getElementById('saveStatus').textContent = 
            'Draft restored from ' + localStorage.getItem('draft-saved-at');
    }
});
</script>
```

### Scenario 3: Form Validation with Error Display

```html
<div style="max-width: 600px;">
    <form id="feedbackForm" onsubmit="validateForm(event)">
        <div style="margin-bottom: 20px;">
            <label for="feedback">Feedback <span style="color: red;">*</span>:</label>
            <ejs-textarea id="feedback"
                placeholder="Please provide detailed feedback..."
                rows="5"
                minlength="10"
                maxLength="500"
                change="validateFeedback" 
                blur="validateFeedback">
            </ejs-textarea>
            <div id="feedbackError" style="color: red; margin-top: 5px; font-size: 0.875rem;">
                <!-- Error message appears here -->
            </div>
        </div>

        <button type="submit">Submit Feedback</button>
    </form>
</div>

<script>
function validateFeedback(args) {
    const value = (args.value || '').trim();
    const errorDiv = document.getElementById('feedbackError');
    
    if (value.length === 0) {
        errorDiv.textContent = 'Feedback is required';
        return false;
    } else if (value.length < 10) {
        errorDiv.textContent = 'Feedback must be at least 10 characters';
        return false;
    } else if (value.length > 500) {
        errorDiv.textContent = 'Feedback cannot exceed 500 characters';
        return false;
    } else {
        errorDiv.textContent = '✓ Feedback looks good';
        errorDiv.style.color = '#28a745';
        return true;
    }
}

function validateForm(event) {
    event.preventDefault();
    
    if (validateFeedback({value: document.getElementById('feedback').ej2_instances[0].value})) {
        console.log('Form is valid, submitting...');
        // Submit form
    } else {
        console.log('Form validation failed');
    }
}
</script>
```

### Scenario 4: Real-Time Markdown Preview

```html
<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px;">
    <!-- Editor -->
    <div>
        <h3>Markdown Editor</h3>
        <ejs-textarea id="markdownEditor"
            placeholder="Enter markdown..."
            rows="10"
            input="updatePreview">
        </ejs-textarea>
    </div>

    <!-- Preview -->
    <div>
        <h3>Preview</h3>
        <div id="preview" style="border: 1px solid #ddd; padding: 15px; border-radius: 4px; min-height: 300px; background-color: #f9f9f9;">
            <p style="color: #999;">Preview appears here...</p>
        </div>
    </div>
</div>

<script src="https://cdn.jsdelivr.net/npm/marked/marked.min.js"></script>
<script>
function updatePreview(args) {
    const markdown = args.value || '';
    const html = marked.parse(markdown);
    document.getElementById('preview').innerHTML = html;
}
</script>
```

### Scenario 5: Multi-Step Form with TextArea

```html
<div style="max-width: 600px;">
    <form id="applicationForm">
        <div style="margin-bottom: 30px;">
            <h3>Step 2: Application Details</h3>

            <div style="margin-bottom: 20px;">
                <label for="qualifications">Why are you a good fit? <span style="color: red;">*</span></label>
                <ejs-textarea id="qualifications"
                    placeholder="Tell us about your qualifications..."
                    rows="5"
                    maxLength="500"
                    blur="saveStep2">
                </ejs-textarea>
                <small style="color: #666;">
                    <span id="qualLength">0</span> / 500 characters
                </small>
            </div>

            <div style="margin-bottom: 20px;">
                <label for="experience">Relevant Experience <span style="color: red;">*</span></label>
                <ejs-textarea id="experience"
                    placeholder="Describe your relevant experience..."
                    rows="5"
                    maxLength="500"
                    blur="saveStep2">
                </ejs-textarea>
                <small style="color: #666;">
                    <span id="expLength">0</span> / 500 characters
                </small>
            </div>

            <div style="display: flex; gap: 10px;">
                <button type="button" onclick="previousStep()">← Back</button>
                <button type="button" onclick="nextStep()">Next →</button>
            </div>
        </div>
    </form>
</div>

<script>
function updateCharCounts(args) {
    document.getElementById('qualLength').textContent = 
        (document.getElementById('qualifications').ej2_instances[0].value || '').length;
    document.getElementById('expLength').textContent = 
        (document.getElementById('experience').ej2_instances[0].value || '').length;
}

function saveStep2(args) {
    updateCharCounts(args);
    // Save to sessionStorage
    sessionStorage.setItem('step2Data', JSON.stringify({
        qualifications: document.getElementById('qualifications').ej2_instances[0].value,
        experience: document.getElementById('experience').ej2_instances[0].value
    }));
}

function previousStep() {
    console.log('Going to previous step');
}

function nextStep() {
    const qualifications = document.getElementById('qualifications').ej2_instances[0].value;
    const experience = document.getElementById('experience').ej2_instances[0].value;
    
    if (qualifications.trim().length === 0 || experience.trim().length === 0) {
        alert('Please fill in all fields');
        return;
    }
    
    console.log('Going to next step');
}
</script>
```

---

## Related Topics
- [Getting Started](textarea-getting-started.md)
- [API Reference](textarea-api.md)
- [Max Length](textarea-max-length.md)
- [Form Support](textarea-form-support.md)
