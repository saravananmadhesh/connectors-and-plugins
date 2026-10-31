# TextArea Methods — ASP.NET Core

This reference covers all methods available for programmatic interaction with the TextArea component.

## Table of Contents
- [FocusIn Method](#focusin-method)
- [FocusOut Method](#focusout-method)
- [GetPersistData Method](#getpersistdata-method)
- [Examples](#examples)

---

## FocusIn Method

Sets focus to the TextArea element, enabling keyboard interaction. Useful for directing user attention or automated workflows.

**Razor View (CSHTML):**
```html
<ejs-textarea id="textarea" placeholder="Click button to focus"></ejs-textarea>

<button type="button" class="btn btn-secondary" onclick="focusTextarea()">
    Focus TextArea
</button>

<script>
    function focusTextarea() {
        const textareaComponent = document.getElementById('textarea').ej2_instances[0];
        textareaComponent.focusIn();
    }
</script>
```

**Use Cases:**
- Direct user attention after form validation
- Programmatically set focus in wizard workflows
- Auto-focus on error states
- Move focus in multi-step forms

**Advanced Example:**
```html
<ejs-textarea id="feedback" placeholder="Your feedback"></ejs-textarea>

<script>
    const feedbackTextarea = document.getElementById('feedback').ej2_instances[0];

    // Focus after validation
    function validateAndFocus() {
        const previousField = document.getElementById('name').value;
        
        if (previousField === '') {
            alert('Please enter your name first');
            return;
        }
        
        // All fields valid, focus textarea
        feedbackTextarea.focusIn();
    }

    // Focus on error
    function handleValidationError(fieldName) {
        if (fieldName === 'feedback') {
            feedbackTextarea.focusIn();
        }
    }
</script>
```

---

## FocusOut Method

Removes focus from the TextArea element, ending keyboard interaction.

**Razor View (CSHTML):**
```html
<ejs-textarea id="textarea" placeholder="Click button to remove focus"></ejs-textarea>

<button type="button" class="btn btn-secondary" onclick="blurTextarea()">
    Blur TextArea
</button>

<script>
    function blurTextarea() {
        const textareaComponent = document.getElementById('textarea').ej2_instances[0];
        textareaComponent.focusOut();
    }
</script>
```

**Use Cases:**
- Move focus to the next field in a form
- Close modals or dialogs
- End editing mode
- Trigger validation on blur

**Advanced Example:**
```html
<ejs-textarea id="step1" placeholder="Step 1"></ejs-textarea>
<ejs-textarea id="step2" placeholder="Step 2"></ejs-textarea>

<script>
    const step1Textarea = document.getElementById('step1').ej2_instances[0];
    const step2Textarea = document.getElementById('step2').ej2_instances[0];

    // Move focus when step 1 is complete
    function moveToNextStep() {
        const value = step1Textarea.value;
        
        if (value && value.length > 10) {
            step1Textarea.focusOut();
            step2Textarea.focusIn();
        }
    }
</script>
```

---

## GetPersistData Method

Retrieves properties needed for persistence state. Returns an object containing configuration options and state information for maintaining data across sessions.

**Razor View (CSHTML):**
```html
<ejs-textarea id="textarea" 
              placeholder="Your content"
              enablePersistence="true">
</ejs-textarea>

<button type="button" class="btn btn-secondary" onclick="getPersistenceData()">
    Get Persistence Data
</button>

<script>
    function getPersistenceData() {
        const textareaComponent = document.getElementById('textarea').ej2_instances[0];
        const persistData = textareaComponent.getPersistData();
        console.log('Persistence Data:', persistData);
        // Output: { value: "user text", ... }
    }
</script>
```

**Use Cases:**
- Save component state to localStorage
- Restore component state on page reload
- Debug persistence issues
- Export configuration for backup

---

## Examples

### Multi-Step Form with Focus Navigation

**Razor View (CSHTML):**
```html
@{
    ViewBag.Title = "Multi-Step Form";
}

<div class="container mt-5">
    <div class="card">
        <div class="card-body">
            <h3 class="card-title">Tell Us Your Story (3 Steps)</h3>

            <form asp-action="SubmitStory" method="post">
                <!-- Step 1 -->
                <div class="form-step" id="step1-form">
                    <h5>Step 1: Brief Overview</h5>
                    <p class="text-muted">Describe your experience briefly</p>
                    
                    <ejs-textarea id="step1" 
                                  name="overview"
                                  placeholder="Keep it to 100 words..."
                                  maxLength="500"
                                  rows="3"
                                  input="updateCount"
                                  valueChanged="onStep1Complete">
                    </ejs-textarea>
                    
                    <small class="form-text text-muted mt-2">
                        <span id="step1-count">0</span>/500 characters
                    </small>
                    
                    <button type="button" class="btn btn-primary mt-3" onclick="goToStep2()">
                        Next →
                    </button>
                </div>

                <!-- Step 2 -->
                <div class="form-step" id="step2-form" style="display: none;">
                    <h5>Step 2: Detailed Story</h5>
                    <p class="text-muted">Tell us more about your experience</p>
                    
                    <ejs-textarea id="step2" 
                                  name="detailedStory"
                                  placeholder="Share the full story..."
                                  maxLength="2000"
                                  rows="6"
                                  input="updateCount"
                                  floatLabelType="Auto">
                    </ejs-textarea>
                    
                    <small class="form-text text-muted mt-2">
                        <span id="step2-count">0</span>/2000 characters
                    </small>
                    
                    <div class="mt-3">
                        <button type="button" class="btn btn-secondary" onclick="goToStep1()">
                            ← Back
                        </button>
                        <button type="button" class="btn btn-primary" onclick="goToStep3()">
                            Next →
                        </button>
                    </div>
                </div>

                <!-- Step 3 -->
                <div class="form-step" id="step3-form" style="display: none;">
                    <h5>Step 3: Review & Submit</h5>
                    <p class="text-muted">Add any final thoughts</p>
                    
                    <ejs-textarea id="step3" 
                                  name="finalThoughts"
                                  placeholder="Any final words?"
                                  maxLength="500"
                                  rows="3"
                                  input="updateCount"
                                  floatLabelType="Auto">
                    </ejs-textarea>
                    
                    <small class="form-text text-muted mt-2">
                        <span id="step3-count">0</span>/500 characters
                    </small>
                    
                    <div class="mt-3">
                        <button type="button" class="btn btn-secondary" onclick="goToStep2()">
                            ← Back
                        </button>
                        <button type="submit" class="btn btn-success">
                            Submit Story
                        </button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</div>

<script>
    const step1Textarea = document.getElementById('step1').ej2_instances[0];
    const step2Textarea = document.getElementById('step2').ej2_instances[0];
    const step3Textarea = document.getElementById('step3').ej2_instances[0];

    function goToStep(stepNum) {
        // Hide all steps
        document.querySelectorAll('.form-step').forEach(el => el.style.display = 'none');
        
        // Show selected step
        document.getElementById('step' + stepNum + '-form').style.display = 'block';
        
        // Focus on the textarea
        switch(stepNum) {
            case 1:
                step1Textarea.focusIn();
                break;
            case 2:
                step2Textarea.focusIn();
                break;
            case 3:
                step3Textarea.focusIn();
                break;
        }
    }

    function goToStep1() { goToStep(1); }
    function goToStep2() { goToStep(2); }
    function goToStep3() { goToStep(3); }

    function updateCount(args) {
        const id = args.target.id;
        const count = (args.value || '').length;
        document.getElementById(id + '-count').textContent = count;
    }

    function onStep1Complete(args) {
        const value = args.value || '';
        if (value.length < 20) {
            console.log('Step 1: Need at least 20 characters');
        }
    }
</script>

<style>
    .form-step {
        padding: 20px;
        border: 1px solid #ddd;
        border-radius: 5px;
        margin-bottom: 20px;
    }
    
    .form-step h5 {
        margin-bottom: 10px;
        color: #333;
    }
    
    .form-step .btn {
        margin-right: 10px;
    }
</style>
```

### Auto-Expanding TextArea with Focus Management

**Razor View (CSHTML):**
```html
<div class="container mt-5">
    <h4>Auto-Expanding Feedback Form</h4>

    <form>
        <div class="form-group">
            <label for="feedback">Your Feedback</label>
            
            <ejs-textarea id="feedback" 
                          placeholder="Click to start typing..."
                          resizeMode="Vertical"
                          rows="2"
                          input="autoExpand"
                          focus="onFocus"
                          blur="onBlur"
                          floatLabelType="Auto">
            </ejs-textarea>
            
            <div id="char-info" class="mt-2">
                <small class="form-text text-muted">
                    <span id="char-count">0</span> characters
                </small>
            </div>
        </div>

        <button type="submit" class="btn btn-primary" onclick="submitFeedback(event)">
            Send Feedback
        </button>
    </form>
</div>

<script>
    const feedbackTextarea = document.getElementById('feedback').ej2_instances[0];

    function autoExpand(args) {
        const count = (args.value || '').length;
        document.getElementById('char-count').textContent = count;
        
        // Auto-resize logic could go here
        if (count > 500) {
            feedbackTextarea.element.style.minHeight = '200px';
        }
    }

    function onFocus(args) {
        console.log('TextArea focused');
        // Could trigger other UI updates
    }

    function onBlur(args) {
        console.log('TextArea blurred');
        const value = feedbackTextarea.value;
        
        if (value && value.length > 0) {
            console.log('Feedback entered:', value.length, 'characters');
        }
    }

    function submitFeedback(e) {
        e.preventDefault();
        const value = feedbackTextarea.value;
        
        if (!value || value.length === 0) {
            feedbackTextarea.focusIn();
            alert('Please enter your feedback');
            return;
        }
        
        // Submit form
        console.log('Submitting:', value);
    }
</script>
```

---

## See Also

- `textarea-getting-started.md` — Quick start guide
- `textarea-api.md` — Complete API reference
- `textarea-events.md` — Event handling
- `textarea-form-support.md` — Form integration
