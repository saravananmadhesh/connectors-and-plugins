# TextArea Form Support — ASP.NET Core

This reference covers HTML form integration, model binding, validation, and form submission patterns.

## Table of Contents
- [Overview](#overview)
- [HTML Form Integration](#html-form-integration)
- [Model Binding](#model-binding)
- [Form Validation](#form-validation)
- [Validation States](#validation-states)
- [Examples](#examples)

---

## Overview

The TextArea component seamlessly integrates with ASP.NET Core forms, supporting standard HTML form submission, model binding, and comprehensive validation.

---

## HTML Form Integration

### Basic Form with TextArea

Integrate TextArea directly in an HTML form with the `name` attribute for form submission:

**Razor View (CSHTML):**
```html
<form asp-action="SubmitFeedback" method="post">
    <div class="form-group mb-3">
        <label for="feedback" class="form-label">Your Feedback</label>
        <ejs-textarea id="feedback" 
                      name="feedback"
                      placeholder="Enter your feedback"
                      rows="5">
        </ejs-textarea>
    </div>

    <button type="submit" class="btn btn-primary">Submit</button>
</form>
```

**Controller (Controllers/FeedbackController.cs):**
```csharp
[HttpPost]
public IActionResult SubmitFeedback(string feedback)
{
    if (string.IsNullOrEmpty(feedback))
    {
        ModelState.AddModelError("feedback", "Feedback is required");
        return View();
    }

    // Process feedback
    _feedbackService.SaveFeedback(feedback);
    return RedirectToAction("ThankYou");
}
```

---

## Model Binding

Bind TextArea values directly to view model properties:

**ViewModel (Models/FeedbackViewModel.cs):**
```csharp
using System.ComponentModel.DataAnnotations;

namespace AspNetCoreApp.Models
{
    public class FeedbackViewModel
    {
        [Required(ErrorMessage = "Name is required")]
        public string Name { get; set; }

        [Required(ErrorMessage = "Email is required")]
        [EmailAddress]
        public string Email { get; set; }

        [Required(ErrorMessage = "Comments are required")]
        [StringLength(500, MinimumLength = 10, 
            ErrorMessage = "Comments must be between 10 and 500 characters")]
        public string Comments { get; set; }

        [StringLength(1000)]
        public string AdditionalNotes { get; set; }
    }
}
```

**Razor View (CSHTML):**
```html
@model FeedbackViewModel

<form asp-action="SubmitFeedback" method="post">
    <!-- Name Input -->
    <div class="form-group mb-3">
        <label asp-for="Name" class="form-label"></label>
        <input asp-for="Name" class="form-control" placeholder="Your name" />
        <span asp-validation-for="Name" class="text-danger"></span>
    </div>

    <!-- Email Input -->
    <div class="form-group mb-3">
        <label asp-for="Email" class="form-label"></label>
        <input asp-for="Email" type="email" class="form-control" placeholder="your@email.com" />
        <span asp-validation-for="Email" class="text-danger"></span>
    </div>

    <!-- Comments TextArea -->
    <div class="form-group mb-3">
        <label asp-for="Comments" class="form-label"></label>
        <ejs-textarea asp-for="Comments" 
                      placeholder="Enter your comments (10-500 characters)"
                      rows="5"
                      floatLabelType="Auto">
        </ejs-textarea>
        <span asp-validation-for="Comments" class="text-danger"></span>
    </div>

    <!-- Additional Notes -->
    <div class="form-group mb-3">
        <label asp-for="AdditionalNotes" class="form-label"></label>
        <ejs-textarea asp-for="AdditionalNotes" 
                      placeholder="Optional additional notes"
                      rows="3"
                      floatLabelType="Auto">
        </ejs-textarea>
    </div>

    <button type="submit" class="btn btn-primary">Submit Feedback</button>
</form>
```

**Controller (Controllers/FeedbackController.cs):**
```csharp
[HttpPost]
public async Task<IActionResult> SubmitFeedback(FeedbackViewModel model)
{
    if (!ModelState.IsValid)
    {
        return View(model);
    }

    // Save to database
    var feedback = new Feedback
    {
        Name = model.Name,
        Email = model.Email,
        Comments = model.Comments,
        AdditionalNotes = model.AdditionalNotes,
        SubmittedDate = DateTime.Now
    };

    await _context.Feedbacks.AddAsync(feedback);
    await _context.SaveChangesAsync();

    return RedirectToAction("ThankYou");
}
```

---

## Form Validation

### Data Annotations Validation

Use `[Required]`, `[StringLength]`, `[RegularExpression]` and other attributes:

**ViewModel:**
```csharp
public class ContactViewModel
{
    [Required]
    public string Name { get; set; }

    [Required]
    [EmailAddress]
    public string Email { get; set; }

    [Required(ErrorMessage = "Please enter a message")]
    [StringLength(1000, MinimumLength = 5, 
        ErrorMessage = "Message must be between 5 and 1000 characters")]
    public string Message { get; set; }

    [RegularExpression(@"^\d{10}$", 
        ErrorMessage = "Phone must be 10 digits")]
    public string PhoneNumber { get; set; }
}
```

**Razor View:**
```html
@model ContactViewModel

<form asp-action="SendMessage" method="post">
    <div asp-validation-summary="All" class="alert alert-danger"></div>

    <div class="form-group mb-3">
        <label asp-for="Message" class="form-label">Message</label>
        <ejs-textarea asp-for="Message" 
                      placeholder="Your message"
                      rows="5">
        </ejs-textarea>
        <span asp-validation-for="Message" class="text-danger"></span>
    </div>

    <button type="submit" class="btn btn-primary">Send</button>
</form>
```

### Client-Side Validation

Enable client-side validation with `asp-validation-*` tag helpers:

**Razor View:**
```html
<form asp-action="SubmitForm" method="post">
    <div asp-validation-summary="ModelOnly" class="alert alert-danger"></div>

    <div class="form-group mb-3">
        <label asp-for="Feedback" class="form-label">Feedback</label>
        <ejs-textarea asp-for="Feedback" 
                      placeholder="Enter feedback"
                      rows="5">
        </ejs-textarea>
        <span asp-validation-for="Feedback" class="invalid-feedback"></span>
    </div>

    <button type="submit" class="btn btn-primary">Submit</button>
</form>

@section Scripts {
    <partial name="_ValidationScriptsPartial" />
}
```

---

## Validation States

### Manual Validation State Management

**Razor View (CSHTML):**
```html
<div class="form-group">
    <label for="message">Message</label>
    <ejs-textarea id="message" 
                  placeholder="Your message"
                  rows="5"
                  valueChanged="onMessageChanged">
    </ejs-textarea>
    <div id="validation-message" role="alert" aria-live="polite"></div>
</div>

<script>
    const textarea = document.getElementById('message').ej2_instances[0];
    const validationMsg = document.getElementById('validation-message');

    function onMessageChanged(args) {
        const value = args.value || '';
        
        if (value.length === 0) {
            textarea.cssClass = 'e-error';
            validationMsg.textContent = '❌ Message is required';
            validationMsg.className = 'alert alert-danger mt-2';
        } else if (value.length < 10) {
            textarea.cssClass = 'e-warning';
            validationMsg.textContent = '⚠️ Message should be at least 10 characters';
            validationMsg.className = 'alert alert-warning mt-2';
        } else {
            textarea.cssClass = 'e-success';
            validationMsg.textContent = '✓ Message is valid';
            validationMsg.className = 'alert alert-success mt-2';
        }
    }
</script>
```

### Styling Validation States

**CSS:**
```css
/* Error state */
.e-error.e-textarea {
    border-color: #dc3545 !important;
}

.e-error.e-textarea:focus {
    box-shadow: 0 0 0 0.2rem rgba(220, 53, 69, .25);
}

/* Warning state */
.e-warning.e-textarea {
    border-color: #ffc107 !important;
}

.e-warning.e-textarea:focus {
    box-shadow: 0 0 0 0.2rem rgba(255, 193, 7, .25);
}

/* Success state */
.e-success.e-textarea {
    border-color: #28a745 !important;
}

.e-success.e-textarea:focus {
    box-shadow: 0 0 0 0.2rem rgba(40, 167, 69, .25);
}
```

---

## Examples

### Complete Contact Form

**ViewModel (Models/ContactFormViewModel.cs):**
```csharp
using System.ComponentModel.DataAnnotations;

public class ContactFormViewModel
{
    [Required(ErrorMessage = "Name is required")]
    [StringLength(100)]
    public string Name { get; set; }

    [Required(ErrorMessage = "Email is required")]
    [EmailAddress(ErrorMessage = "Invalid email address")]
    public string Email { get; set; }

    [Required(ErrorMessage = "Subject is required")]
    [StringLength(200)]
    public string Subject { get; set; }

    [Required(ErrorMessage = "Message is required")]
    [StringLength(2000, MinimumLength = 20, 
        ErrorMessage = "Message must be between 20 and 2000 characters")]
    public string Message { get; set; }

    public bool SubscribeToNewsletter { get; set; }
}
```

**Razor View (Views/Contact/Index.cshtml):**
```html
@model ContactFormViewModel

<div class="container mt-5">
    <div class="row justify-content-center">
        <div class="col-md-8">
            <div class="card">
                <div class="card-body">
                    <h3 class="card-title mb-4">Contact Us</h3>

                    <form asp-action="Submit" method="post">
                        <div asp-validation-summary="All" class="alert alert-danger"></div>

                        <!-- Name -->
                        <div class="form-group mb-3">
                            <label asp-for="Name" class="form-label"></label>
                            <input asp-for="Name" class="form-control" 
                                   placeholder="Your full name" />
                            <span asp-validation-for="Name" class="text-danger"></span>
                        </div>

                        <!-- Email -->
                        <div class="form-group mb-3">
                            <label asp-for="Email" class="form-label"></label>
                            <input asp-for="Email" type="email" class="form-control" 
                                   placeholder="your@email.com" />
                            <span asp-validation-for="Email" class="text-danger"></span>
                        </div>

                        <!-- Subject -->
                        <div class="form-group mb-3">
                            <label asp-for="Subject" class="form-label"></label>
                            <input asp-for="Subject" class="form-control" 
                                   placeholder="Message subject" />
                            <span asp-validation-for="Subject" class="text-danger"></span>
                        </div>

                        <!-- Message TextArea -->
                        <div class="form-group mb-3">
                            <label asp-for="Message" class="form-label"></label>
                            <ejs-textarea asp-for="Message" 
                                          placeholder="Please enter your message (minimum 20 characters)"
                                          rows="6"
                                          floatLabelType="Auto"
                                          input="onMessageInput">
                            </ejs-textarea>
                            <div class="mt-2">
                                <small class="form-text text-muted">
                                    <span id="char-count">0</span>/2000 characters
                                </small>
                            </div>
                            <span asp-validation-for="Message" class="text-danger d-block mt-2"></span>
                        </div>

                        <!-- Checkbox -->
                        <div class="form-check mb-3">
                            <input asp-for="SubscribeToNewsletter" type="checkbox" 
                                   class="form-check-input" />
                            <label asp-for="SubscribeToNewsletter" class="form-check-label">
                                Subscribe to our newsletter
                            </label>
                        </div>

                        <button type="submit" class="btn btn-primary btn-lg w-100">
                            Send Message
                        </button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>

<script>
    function onMessageInput(args) {
        const count = (args.value || '').length;
        document.getElementById('char-count').textContent = count;
    }
</script>

@section Scripts {
    <partial name="_ValidationScriptsPartial" />
}
```

**Controller (Controllers/ContactController.cs):**
```csharp
[HttpPost]
public async Task<IActionResult> Submit(ContactFormViewModel model)
{
    if (!ModelState.IsValid)
    {
        return View("Index", model);
    }

    // Send email or save to database
    await _emailService.SendContactFormAsync(model);

    TempData["Success"] = "Thank you for contacting us. We'll respond soon.";
    return RedirectToAction("Index");
}
```

---

## See Also

- `textarea-getting-started.md` — Quick start guide
- `textarea-api.md` — Complete API reference
- `textarea-validation-states.md` — Validation styling
- `textarea-events.md` — Event handling
