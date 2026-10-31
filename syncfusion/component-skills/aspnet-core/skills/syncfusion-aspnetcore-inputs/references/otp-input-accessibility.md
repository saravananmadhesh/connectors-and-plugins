# OTP Input Accessibility — ASP.NET Core

This reference covers accessibility standards, keyboard navigation, ARIA support, and RTL functionality for the OTP Input component in ASP.NET Core.

## Table of Contents
- [Accessibility Standards](#accessibility-standards)
- [WAI-ARIA Attributes](#wai-aria-attributes)
- [Keyboard Navigation](#keyboard-navigation)
- [ARIA Labels](#aria-labels)
- [HTML Attributes](#html-attributes)
- [RTL Support](#rtl-support)
- [Examples](#examples)

---

## Accessibility Standards

The Syncfusion ASP.NET Core OTP Input component meets the following accessibility standards out of the box:

| Standard | Support | Details |
|----------|---------|---------|
| **WCAG 2.2** | ✅ Supported | Web Content Accessibility Guidelines Level AA |
| **Section 508** | ✅ Supported | US Federal accessibility requirement |
| **Screen Reader** | ✅ Supported | Works with NVDA, JAWS, VoiceOver |
| **Keyboard Navigation** | ✅ Full support | All features accessible via keyboard |
| **Right-to-Left** | ✅ Supported | Arabic, Hebrew, Farsi etc. |
| **Color Contrast** | ✅ WCAG AA | Sufficient contrast ratios |
| **Mobile Device** | ✅ Supported | Touch-friendly on all devices |
| **Accessibility Checker** | ✅ Validated | Axe-core validated |

---

## WAI-ARIA Attributes

The OTP Input automatically renders with proper ARIA roles and attributes:

| Attribute | Purpose |
|-----------|---------|
| `role="group"` | Groups all input fields as a single logical widget |
| `aria-label` | Text label for each individual OTP input field |
| `aria-required` | Indicates if the field is required |
| `aria-invalid` | Indicates validation state |
| `aria-describedby` | Links to help/error text |

**Razor View (CSHTML):**
```html
<div class="form-group">
    <label for="otp-group">Two-Factor Authentication Code</label>
    
    <ejs-otpinput id="otp-group" 
                  length="6"
                  type="number"
                  htmlAttributes='new Dictionary<string, object> {
                      { "aria-label", "Enter 6-digit verification code" },
                      { "aria-required", "true" },
                      { "aria-describedby", "otp-help" }
                  }'>
    </ejs-otpinput>
    
    <small id="otp-help">
        A 6-digit code has been sent to your registered email address
    </small>
</div>
```

---

## Keyboard Navigation

Users can navigate and interact with the OTP input using keyboard only:

| Key | Action |
|-----|--------|
| **Left Arrow** | Moves focus to the previous input field |
| **Right Arrow** | Moves focus to the next input field |
| **Tab** | Shifts focus to next input field |
| **Shift + Tab** | Shifts focus to previous input field |
| **Backspace** | Deletes character and moves to previous field |
| **0-9** | Enters digit (for numeric OTP) |
| **A-Z** | Enters letter (for text OTP) |

**Razor View (CSHTML):**
```html
<h4>Keyboard-Accessible OTP Input</h4>
<p>Use Tab/Shift+Tab to navigate between fields, Backspace to delete</p>

<ejs-otpinput id="keyboard-otp" 
              length="4"
              type="number"
              autoFocus="true">
</ejs-otpinput>

<p id="keyboard-feedback" aria-live="polite"></p>
```

**JavaScript (wwwroot/js/otp.js):**
```javascript
const otpComponent = document.getElementById('keyboard-otp').ej2_instances[0];
const feedback = document.getElementById('keyboard-feedback');

otpComponent.input = (args) => {
  feedback.textContent = `Current value: ${args.value || 'empty'}`;
};
```

---

## ARIA Labels

Provide descriptive ARIA labels for each OTP field to assist screen reader users.

**Razor View (CSHTML):**
```html
<div class="form-group">
    <label for="otp-section">Verification Code</label>
    
    <ejs-otpinput id="otp-section" 
                  length="6"
                  type="number">
    </ejs-otpinput>
</div>
```

**For Descriptive Feedback:**

```html
<div class="form-group">
    <fieldset>
        <legend>Enter Verification Code</legend>
        
        <ejs-otpinput id="secure-otp" 
                      length="6"
                      type="number"
                      htmlAttributes='new Dictionary<string, object> {
                          { "aria-describedby", "otp-instructions" }
                      }'>
        </ejs-otpinput>
        
        <div id="otp-instructions" role="region" aria-live="polite">
            <p>A 6-digit code has been sent to +1 (***) ***-9876</p>
            <p>Enter each digit in sequence. Use arrow keys to navigate.</p>
        </div>
    </fieldset>
</div>
```

---

## HTML Attributes

Use `HtmlAttributes` dictionary to add custom attributes for accessibility and testing:

**Razor View (CSHTML):**
```html
<ejs-otpinput id="otp" 
              length="4"
              type="number"
              htmlAttributes='new Dictionary<string, object> {
                  { "title", "One-Time Password" },
                  { "data-testid", "otp-field" },
                  { "autocomplete", "one-time-code" }
              }'>
</ejs-otpinput>
```

**Useful HTML Attributes for Accessibility:**
- `title`: Tooltip text for the group
- `aria-describedby`: Links to instructions/help text
- `autocomplete`: Allows mobile/browser OTP autofill
- `data-*`: Test automation attributes

---

## RTL Support

Enable right-to-left rendering for RTL languages (Arabic, Hebrew, Farsi, etc.):

**Razor View (CSHTML):**
```html
<!-- Enable RTL for Arabic users -->
<ejs-otpinput id="rtl-otp-ar" 
              length="6"
              type="number"
              enableRtl="true"
              locale="ar-SA"
              htmlAttributes='new Dictionary<string, object> {
                  { "dir", "rtl" }
              }'>
</ejs-otpinput>

<!-- Hebrew RTL Example -->
<ejs-otpinput id="rtl-otp-he" 
              length="6"
              type="number"
              enableRtl="true"
              locale="he-IL">
</ejs-otpinput>
```

**Document-Level RTL:**

```html
<!DOCTYPE html>
<html dir="rtl" lang="ar">
<head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>تحقق من رمزك</title>
</head>
<body>
    <div class="container">
        <h2>تحقق من رمزك</h2>
        
        <ejs-otpinput id="ar-otp" 
                      length="6"
                      type="number"
                      locale="ar-SA">
        </ejs-otpinput>
    </div>
</body>
</html>
```

---

## Examples

### Complete Accessible OTP Form

**Razor View (Views/Auth/Verify.cshtml):**
```html
@{
    ViewBag.Title = "Verify Your Identity";
}

<div class="container mt-5">
    <div class="row justify-content-center">
        <div class="col-md-6">
            <div class="card">
                <div class="card-body">
                    <h2 class="card-title mb-4">Two-Factor Authentication</h2>

                    <form asp-action="VerifyOtp" method="post" role="form">
                        <div asp-validation-summary="All" class="alert alert-danger"></div>

                        <fieldset>
                            <legend class="visually-hidden">Enter verification code</legend>
                            
                            <div class="form-group mb-4">
                                <label for="otp-code" class="form-label">
                                    Verification Code
                                    <span aria-label="required">*</span>
                                </label>
                                
                                <p class="form-text mb-3">
                                    Enter the 6-digit code sent to your email address
                                </p>
                                
                                <ejs-otpinput id="otp-code"
                                              length="6"
                                              type="number"
                                              autoFocus="true"
                                              htmlAttributes='new Dictionary<string, object> {
                                                  { "aria-required", "true" },
                                                  { "aria-describedby", "otp-description" },
                                                  { "autocomplete", "one-time-code" }
                                              }'>
                                </ejs-otpinput>
                                
                                <small id="otp-description" class="form-text text-muted">
                                    Use arrow keys to navigate between fields
                                </small>
                            </div>

                            <button type="submit" class="btn btn-primary w-100" id="verify-btn">
                                Verify Code
                            </button>
                            
                            <button type="button" class="btn btn-link w-100 mt-2" id="resend-btn">
                                Didn't receive code? Resend
                            </button>
                        </fieldset>
                    </form>

                    <div role="status" aria-live="polite" class="mt-3" id="status-message"></div>
                </div>
            </div>
        </div>
    </div>
</div>

@section Scripts {
    <script>
        const otpComponent = document.getElementById('otp-code').ej2_instances[0];
        const statusMessage = document.getElementById('status-message');

        otpComponent.valueChanged = (args) => {
            if (args.value && args.value.length === 6) {
                statusMessage.textContent = 'Code received. Ready to verify.';
                statusMessage.className = 'alert alert-success mt-3';
            }
        };

        document.getElementById('resend-btn').addEventListener('click', () => {
            statusMessage.textContent = 'Sending code to your email...';
            statusMessage.className = 'alert alert-info mt-3';
        });
    </script>
}
```

**Controller (Controllers/AuthController.cs):**
```csharp
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace AspNetCoreApp.Controllers
{
    public class AuthController : Controller
    {
        [HttpGet]
        public IActionResult Verify()
        {
            return View();
        }

        [HttpPost]
        public async Task<IActionResult> VerifyOtp(string otpCode)
        {
            if (string.IsNullOrEmpty(otpCode) || otpCode.Length != 6)
            {
                ModelState.AddModelError("", "Please enter a valid 6-digit code");
                return View("Verify");
            }

            // Verify OTP with backend
            bool isValid = await VerifyOtpWithService(otpCode);

            if (isValid)
            {
                // Mark user as verified
                return RedirectToAction("Success");
            }

            ModelState.AddModelError("", "Invalid verification code. Please try again.");
            return View("Verify");
        }

        private async Task<bool> VerifyOtpWithService(string code)
        {
            // Call your OTP verification service
            await Task.Delay(100); // Simulate API call
            return true; // Replace with actual verification logic
        }

        public IActionResult Success()
        {
            return View();
        }
    }
}
```

---

## See Also

- `otp-input-getting-started.md` — Quick start guide
- `otp-input-configuration.md` — Configuration options
- `otp-input-api.md` — Complete API reference
- `otp-input-events.md` — Event handling
