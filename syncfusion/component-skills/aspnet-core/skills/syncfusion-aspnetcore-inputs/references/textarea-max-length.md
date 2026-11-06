# TextArea Maximum Length — ASP.NET Core

This reference covers enforcing character limits and providing user feedback about character count.

## Table of Contents
- [Overview](#overview)
- [Setting Maximum Length](#setting-maximum-length)
- [Character Limit Enforcement](#character-limit-enforcement)
- [User Feedback](#user-feedback)
- [Examples](#examples)

---

## Overview

The `maxLength` property restricts the number of characters users can enter in a TextArea. This is useful for form fields with character limits like bios, tweet-like messages, or review summaries.

---

## Setting Maximum Length

### Basic Usage

Use the `maxLength` property to restrict character input:

**Razor View (CSHTML):**
```html
<ejs-textarea id="comments" 
              placeholder="Enter your comments"
              maxLength="500"
              rows="5">
</ejs-textarea>
```

Once users reach the character limit, the TextArea prevents further input.

### Common Limits

**For Different Use Cases:**
```html
<!-- Bio/About section -->
<ejs-textarea placeholder="Your bio" maxLength="160"></ejs-textarea>

<!-- Comment box -->
<ejs-textarea placeholder="Add a comment" maxLength="500"></ejs-textarea>

<!-- Review/feedback -->
<ejs-textarea placeholder="Share your feedback" maxLength="1000"></ejs-textarea>

<!-- Long-form content -->
<ejs-textarea placeholder="Write article" maxLength="5000"></ejs-textarea>
```

---

## Character Limit Enforcement

### Automatic Prevention

Once the character limit is reached, users cannot type additional characters:

**Razor View (CSHTML):**
```html
<ejs-textarea id="limited" 
              placeholder="Max 200 characters"
              maxLength="200"
              rows="4"
              floatLabelType="Auto">
</ejs-textarea>
```

**Behavior:**
- Characters can be entered up to the limit
- Input is rejected when limit is reached
- User can still delete or edit existing content
- Paste operations are truncated to fit the limit

---

## User Feedback

### Display Character Count

Show users how many characters they've entered and how many remain:

**Razor View (CSHTML):**
```html
<div class="form-group">
    <label for="message">Message</label>
    
    <ejs-textarea id="message" 
                  placeholder="Enter your message"
                  maxLength="500"
                  rows="5"
                  input="onMessageInput">
    </ejs-textarea>
    
    <small class="form-text text-muted mt-2">
        <span id="char-count">0</span> / 500 characters
    </small>
</div>

<script>
    function onMessageInput(args) {
        const count = (args.value || '').length;
        document.getElementById('char-count').textContent = count;
    }
</script>
```

### Character Count with Warning

Display warnings when approaching the limit:

**Razor View (CSHTML):**
```html
<div class="form-group">
    <label for="bio">Your Bio</label>
    
    <ejs-textarea id="bio" 
                  placeholder="Tell us about yourself"
                  maxLength="160"
                  rows="3"
                  input="onBioInput">
    </ejs-textarea>
    
    <div class="mt-2 d-flex justify-content-between align-items-center">
        <small class="form-text text-muted">
            <span id="bio-count">0</span>/160 characters
        </small>
        <small id="bio-warning" class="text-warning" style="display: none;">
            ⚠️ You're approaching the limit
        </small>
    </div>
</div>

<script>
    const MAX_LENGTH = 160;
    const WARNING_THRESHOLD = 20; // Show warning when 20 chars remain

    function onBioInput(args) {
        const count = (args.value || '').length;
        const remaining = MAX_LENGTH - count;
        
        document.getElementById('bio-count').textContent = count;
        
        const warning = document.getElementById('bio-warning');
        if (remaining <= WARNING_THRESHOLD && remaining > 0) {
            warning.style.display = 'inline';
        } else {
            warning.style.display = 'none';
        }
    }
</script>
```

### Progress Indicator

Show a visual progress bar:

**Razor View (CSHTML):**
```html
<div class="form-group">
    <label for="feedback">Feedback</label>
    
    <ejs-textarea id="feedback" 
                  placeholder="Share your feedback"
                  maxLength="500"
                  rows="5"
                  input="onFeedbackInput">
    </ejs-textarea>
    
    <div class="mt-2">
        <div class="progress" style="height: 5px;">
            <div id="feedback-progress" class="progress-bar" 
                 style="width: 0%; transition: width 0.3s ease;"></div>
        </div>
        <small class="form-text text-muted mt-1">
            <span id="feedback-count">0</span>/500 characters
        </small>
    </div>
</div>

<script>
    const MAX_LENGTH = 500;

    function onFeedbackInput(args) {
        const count = (args.value || '').length;
        const percentage = (count / MAX_LENGTH) * 100;
        
        document.getElementById('feedback-count').textContent = count;
        document.getElementById('feedback-progress').style.width = percentage + '%';
    }
</script>

<style>
    .progress {
        background-color: #e9ecef;
    }
    
    .progress-bar {
        background-color: #0d6efd;
    }
</style>
```

---

## Examples

### Complete Form with Multiple Character Limits

**Razor View (CSHTML):**
```html
@{
    ViewBag.Title = "Character Limit Examples";
}

<div class="container mt-5">
    <h2>TextArea Character Limit Examples</h2>

    <form asp-action="SubmitProfile" method="post" class="mt-4">
        <!-- Username (50 chars) -->
        <div class="form-group mb-4">
            <label for="username" class="form-label">Username</label>
            <ejs-textarea id="username" 
                          name="username"
                          placeholder="Choose your username"
                          maxLength="50"
                          rows="1"
                          input="updateCount"
                          floatLabelType="Auto">
            </ejs-textarea>
            <small class="form-text text-muted mt-2">
                <span id="username-count">0</span>/50 characters
            </small>
        </div>

        <!-- Bio (160 chars) -->
        <div class="form-group mb-4">
            <label for="bio" class="form-label">Bio / About</label>
            <ejs-textarea id="bio" 
                          name="bio"
                          placeholder="Tell us about yourself"
                          maxLength="160"
                          rows="2"
                          input="updateCount"
                          floatLabelType="Auto">
            </ejs-textarea>
            <div class="mt-2 d-flex justify-content-between">
                <small class="form-text text-muted">
                    <span id="bio-count">0</span>/160 characters
                </small>
                <small id="bio-warning" class="text-warning" style="display: none;">
                    Approaching limit ⚠️
                </small>
            </div>
        </div>

        <!-- Interests (500 chars) -->
        <div class="form-group mb-4">
            <label for="interests" class="form-label">Interests</label>
            <ejs-textarea id="interests" 
                          name="interests"
                          placeholder="What are you interested in?"
                          maxLength="500"
                          rows="4"
                          input="updateCount"
                          floatLabelType="Auto">
            </ejs-textarea>
            <div class="mt-2">
                <div class="progress" style="height: 6px;">
                    <div id="interests-progress" class="progress-bar" style="width: 0%;"></div>
                </div>
                <small class="form-text text-muted mt-2">
                    <span id="interests-count">0</span>/500 characters
                </small>
            </div>
        </div>

        <!-- Experience (1000 chars) -->
        <div class="form-group mb-4">
            <label for="experience" class="form-label">Professional Experience</label>
            <ejs-textarea id="experience" 
                          name="experience"
                          placeholder="Describe your experience"
                          maxLength="1000"
                          rows="5"
                          input="updateCount"
                          floatLabelType="Auto">
            </ejs-textarea>
            <div class="mt-2">
                <div class="progress" style="height: 6px;">
                    <div id="experience-progress" class="progress-bar" style="width: 0%;"></div>
                </div>
                <small class="form-text text-muted mt-2">
                    <span id="experience-count">0</span>/1000 characters
                </small>
            </div>
        </div>

        <button type="submit" class="btn btn-primary btn-lg w-100">Save Profile</button>
    </form>
</div>

<script>
    function updateCount(args, fieldName) {
        const field = args.target?.id || fieldName;
        const count = (args.value || '').length;
        
        if (field === 'username') {
            document.getElementById('username-count').textContent = count;
        } else if (field === 'bio') {
            document.getElementById('bio-count').textContent = count;
            const warning = document.getElementById('bio-warning');
            warning.style.display = count > 140 ? 'inline' : 'none';
        } else if (field === 'interests') {
            document.getElementById('interests-count').textContent = count;
            document.getElementById('interests-progress').style.width = ((count / 500) * 100) + '%';
        } else if (field === 'experience') {
            document.getElementById('experience-count').textContent = count;
            document.getElementById('experience-progress').style.width = ((count / 1000) * 100) + '%';
        }
    }
</script>

<style>
    .progress {
        background-color: #e9ecef;
    }
    
    .progress-bar {
        background-color: #0d6efd;
        transition: width 0.3s ease;
    }
    
    .form-label {
        font-weight: 600;
        margin-bottom: 0.5rem;
    }
</style>
```

### Dynamic Character Limit Based on Tier

**Razor View (CSHTML):**
```html
@{
    ViewModel.UserTier = "Premium"; // From ViewBag or Model
    var charLimit = ViewBag.UserTier == "Premium" ? 5000 : 1000;
}

<div class="form-group">
    <div class="d-flex justify-content-between align-items-center">
        <label for="content" class="form-label">Your Content</label>
        <span class="badge bg-info">@ViewBag.UserTier Account</span>
    </div>
    
    <ejs-textarea id="content" 
                  placeholder="Share your content"
                  maxLength="@charLimit"
                  rows="6"
                  input="onContentInput"
                  floatLabelType="Auto">
    </ejs-textarea>
    
    <div class="mt-2">
        <div class="progress" style="height: 5px;">
            <div id="content-progress" class="progress-bar" style="width: 0%;"></div>
        </div>
        <small class="form-text text-muted mt-2">
            <span id="content-count">0</span>/@charLimit characters
            <span class="text-muted ms-2">
                (@(charLimit) available for @ViewBag.UserTier members)
            </span>
        </small>
    </div>
</div>

<script>
    const maxLength = @charLimit;

    function onContentInput(args) {
        const count = (args.value || '').length;
        const percentage = (count / maxLength) * 100;
        
        document.getElementById('content-count').textContent = count;
        document.getElementById('content-progress').style.width = percentage + '%';
    }
</script>
```

---

## See Also

- `textarea-getting-started.md` — Quick start guide
- `textarea-api.md` — Complete API reference
- `textarea-form-support.md` — Form integration
- `textarea-events.md` — Event handling
