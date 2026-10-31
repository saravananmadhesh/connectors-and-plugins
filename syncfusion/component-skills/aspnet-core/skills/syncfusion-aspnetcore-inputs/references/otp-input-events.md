# OTP Input Events — ASP.NET Core

This reference covers all events available in the OTP Input component and their usage patterns.

## Table of Contents
- [Overview](#overview)
- [Created Event](#created-event)
- [Focus/Blur Events](#focusblur-events)
- [Input Event](#input-event)
- [ValueChanged Event](#valuechanged-event)
- [Event Patterns](#event-patterns)
- [Examples](#examples)

---

## Overview

The OTP Input provides five events covering the full lifecycle of user interaction:

| Event | When it fires |
|-------|---------------|
| `Created` | Once, after the component finishes rendering |
| `Focus` | When OTP input group receives focus |
| `Blur` | When OTP input loses focus |
| `Input` | Each time the value of any individual field changes |
| `ValueChanged` | When all fields are filled and the input loses focus |

---

## Created Event

Fires once after the OTP Input finishes rendering. Use for post-render initialization (e.g., logging, analytics, additional DOM setup).

**Razor View (CSHTML):**
```html
<ejs-otpinput id="otpinput" 
              length="6"
              created="onOtpCreated">
</ejs-otpinput>

<script>
    function onOtpCreated(args) {
        console.log('OTP Input component is ready');
        // Perform initialization tasks
    }
</script>
```

**Use Cases:**
- Initialize third-party libraries
- Set up event listeners
- Load initial data
- Log analytics events

---

## Focus/Blur Events

### Focus Event

Fires when the OTP input group receives focus.

**Razor View (CSHTML):**
```html
<ejs-otpinput id="otpinput" 
              focus="onOtpFocus">
</ejs-otpinput>

<script>
    function onOtpFocus(args) {
        console.log('OTP Input focused');
        // Highlight helper text
        document.getElementById('otp-hint').style.color = 'blue';
    }
</script>
```

### Blur Event

Fires when the OTP input loses focus.

**Razor View (CSHTML):**
```html
<ejs-otpinput id="otpinput" 
              blur="onOtpBlur">
</ejs-otpinput>

<script>
    function onOtpBlur(args) {
        console.log('OTP Input blurred');
        // Validate or save state
    }
</script>
```

---

## Input Event

Fires each time the value of any individual OTP field changes. The event provides access to the current partial or complete value.

Use `Input` for real-time feedback as the user types (e.g., showing a progress indicator, disabling a submit button until all fields are filled).

**Razor View (CSHTML):**
```html
<ejs-otpinput id="otpinput" 
              length="6"
              input="onOtpInput">
</ejs-otpinput>

<p id="input-feedback"></p>

<script>
    function onOtpInput(args) {
        const currentValue = args.value || '';
        const feedback = document.getElementById('input-feedback');
        feedback.textContent = `${currentValue.length}/6 digits entered`;
    }
</script>
```

**Common Uses:**
- Display character count
- Show progress bar
- Enable/disable submit button based on completion
- Auto-format as user types

---

## ValueChanged Event

Fires when the OTP is complete (all fields filled) **and** the component loses focus or the value is programmatically changed. The `ValueChangedEventArgs` provides the final value.

This is the primary event to use for OTP verification/submission logic.

**Razor View (CSHTML):**
```html
<ejs-otpinput id="otpinput" 
              length="6"
              type="number"
              valueChanged="onOtpValueChanged">
</ejs-otpinput>

<script>
    function onOtpValueChanged(args) {
        console.log('Complete OTP value:', args.value);
        // Verify OTP with server
        verifyOtpWithServer(args.value);
    }
</script>
```

---

## Event Patterns

### Real-Time Progress Feedback

Display progress as user enters digits:

**Razor View (CSHTML):**
```html
<div class="form-group">
    <label>Verification Code</label>
    
    <ejs-otpinput id="progress-otp" 
                  length="6"
                  type="number"
                  input="onOtpProgress">
    </ejs-otpinput>
    
    <div class="progress mt-2" style="height: 5px;">
        <div id="progress-bar" class="progress-bar" style="width: 0%"></div>
    </div>
    
    <small id="progress-text" class="form-text text-muted">0/6 entered</small>
</div>

<script>
    function onOtpProgress(args) {
        const total = 6;
        const current = (args.value || '').length;
        const percentage = (current / total) * 100;
        
        document.getElementById('progress-bar').style.width = percentage + '%';
        document.getElementById('progress-text').textContent = `${current}/${total} entered`;
    }
</script>
```

### Auto-Submit on Completion

Automatically submit when OTP is complete:

**Razor View (CSHTML):**
```html
<form id="auto-submit-form">
    <ejs-otpinput id="auto-otp" 
                  length="6"
                  type="number"
                  valueChanged="onOtpComplete">
    </ejs-otpinput>
</form>

<script>
    function onOtpComplete(args) {
        if (args.value && args.value.length === 6) {
            console.log('OTP complete, submitting automatically...');
            // Auto-submit after brief delay
            setTimeout(() => {
                document.getElementById('auto-submit-form').submit();
            }, 300);
        }
    }
</script>
```

### Timeout Handling

Show timeout warning if OTP not completed within time limit:

**Razor View (CSHTML):**
```html
<div class="form-group">
    <ejs-otpinput id="timeout-otp" 
                  length="6"
                  created="startTimeout"
                  valueChanged="onOtpTimeout">
    </ejs-otpinput>
    
    <div id="timeout-warning" style="display: none;" class="alert alert-warning mt-2">
        Time is running out! <span id="timer"></span> seconds remaining
    </div>
</div>

<script>
    let timeoutTimer;
    const TIMEOUT_SECONDS = 300; // 5 minutes

    function startTimeout() {
        let secondsRemaining = TIMEOUT_SECONDS;
        
        timeoutTimer = setInterval(() => {
            secondsRemaining--;
            document.getElementById('timer').textContent = secondsRemaining;
            
            if (secondsRemaining <= 60) {
                document.getElementById('timeout-warning').style.display = 'block';
            }
            
            if (secondsRemaining <= 0) {
                clearInterval(timeoutTimer);
                onOtpExpired();
            }
        }, 1000);
    }

    function onOtpTimeout(args) {
        if (args.value && args.value.length === 6) {
            clearInterval(timeoutTimer);
            verifyOtp(args.value);
        }
    }

    function onOtpExpired() {
        alert('Verification code has expired. Please request a new one.');
        document.getElementById('timeout-otp').ej2_instances[0].clear();
    }
</script>
```

### Validation Feedback

Show real-time validation feedback:

**Razor View (CSHTML):**
```html
<div class="form-group">
    <ejs-otpinput id="validate-otp" 
                  length="6"
                  type="number"
                  valueChanged="onOtpValidate">
    </ejs-otpinput>
    
    <div id="validation-message" role="alert" aria-live="polite"></div>
</div>

<script>
    const otpComponent = document.getElementById('validate-otp').ej2_instances[0];
    const message = document.getElementById('validation-message');

    function onOtpValidate(args) {
        const otpValue = args.value;
        
        if (!otpValue || otpValue.length !== 6) {
            message.innerHTML = '❌ Please enter all 6 digits';
            message.className = 'alert alert-warning mt-2';
            otpComponent.cssClass = 'e-warning';
            return;
        }

        // Verify with server
        verifyWithServer(otpValue).then(result => {
            if (result.valid) {
                message.innerHTML = '✓ Verification successful!';
                message.className = 'alert alert-success mt-2';
                otpComponent.cssClass = 'e-success';
            } else {
                message.innerHTML = '❌ Invalid code. Please try again.';
                message.className = 'alert alert-danger mt-2';
                otpComponent.cssClass = 'e-error';
                otpComponent.clear();
            }
        });
    }

    async function verifyWithServer(otp) {
        const response = await fetch('/api/verify-otp', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ otp })
        });
        return await response.json();
    }
</script>
```

---

## Examples

### Complete Event Handling Example

**Razor View (CSHTML):**
```html
@{
    ViewBag.Title = "OTP Event Handling";
}

<div class="container mt-5">
    <div class="row justify-content-center">
        <div class="col-md-6">
            <div class="card">
                <div class="card-body">
                    <h3 class="card-title mb-4">Two-Factor Authentication</h3>

                    <form id="otp-form">
                        <div class="form-group mb-3">
                            <label for="otp-code" class="form-label">
                                Enter Verification Code
                            </label>
                            
                            <ejs-otpinput id="otp-code"
                                          length="6"
                                          type="number"
                                          placeholder="0"
                                          created="onOtpCreated"
                                          focus="onOtpFocus"
                                          blur="onOtpBlur"
                                          input="onOtpInput"
                                          valueChanged="onOtpValueChanged">
                            </ejs-otpinput>
                            
                            <small class="form-text text-muted">
                                Code sent to your email
                            </small>
                        </div>

                        <!-- Progress indicator -->
                        <div class="progress mb-3" style="height: 5px;">
                            <div id="otp-progress" class="progress-bar" style="width: 0%"></div>
                        </div>
                        <small id="otp-status" class="form-text text-muted">0/6 entered</small>

                        <button type="submit" class="btn btn-primary w-100" id="verify-btn" disabled>
                            Verify Code
                        </button>

                        <!-- Timeout warning -->
                        <div id="timeout-alert" style="display: none;" class="alert alert-warning mt-3">
                            ⏱️ <span id="timer">300</span> seconds remaining
                        </div>

                        <!-- Status message -->
                        <div id="status-message" role="alert" aria-live="polite"></div>
                    </form>

                    <button type="button" class="btn btn-link w-100 mt-3" onclick="resendCode()">
                        Didn't receive code? Resend
                    </button>
                </div>
            </div>
        </div>
    </div>
</div>

<script>
    const otpComponent = document.getElementById('otp-code').ej2_instances[0];
    const form = document.getElementById('otp-form');
    let timeoutTimer;

    function onOtpCreated() {
        console.log('OTP component initialized');
        startTimeout();
    }

    function onOtpFocus(args) {
        console.log('OTP focused');
        document.getElementById('otp-code').closest('.form-group').classList.add('focused');
    }

    function onOtpBlur(args) {
        console.log('OTP blurred');
        document.getElementById('otp-code').closest('.form-group').classList.remove('focused');
    }

    function onOtpInput(args) {
        const current = (args.value || '').length;
        const total = 6;
        const percentage = (current / total) * 100;
        
        document.getElementById('otp-progress').style.width = percentage + '%';
        document.getElementById('otp-status').textContent = `${current}/${total} entered`;
        document.getElementById('verify-btn').disabled = current < total;
    }

    function onOtpValueChanged(args) {
        clearInterval(timeoutTimer);
        console.log('OTP complete:', args.value);
        autoSubmit();
    }

    function autoSubmit() {
        const status = document.getElementById('status-message');
        status.innerHTML = '✓ Submitting verification...';
        status.className = 'alert alert-info mt-3';
        
        setTimeout(() => {
            form.submit();
        }, 500);
    }

    function startTimeout() {
        let secondsRemaining = 300;
        timeoutTimer = setInterval(() => {
            secondsRemaining--;
            document.getElementById('timer').textContent = secondsRemaining;
            
            if (secondsRemaining <= 60) {
                document.getElementById('timeout-alert').style.display = 'block';
            }
            
            if (secondsRemaining <= 0) {
                clearInterval(timeoutTimer);
                expireOtp();
            }
        }, 1000);
    }

    function expireOtp() {
        const status = document.getElementById('status-message');
        status.innerHTML = '❌ Verification code has expired. Please request a new one.';
        status.className = 'alert alert-danger mt-3';
        otpComponent.disabled = true;
    }

    function resendCode() {
        otpComponent.clear();
        otpComponent.disabled = false;
        otpComponent.focusIn();
        startTimeout();
        const status = document.getElementById('status-message');
        status.innerHTML = '✓ New code sent to your email';
        status.className = 'alert alert-success mt-3';
    }

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        console.log('Form submitted with OTP:', otpComponent.getValue());
    });
</script>
```

---

## See Also

- `otp-input-getting-started.md` — Quick start guide
- `otp-input-api.md` — Complete API reference
- `otp-input-configuration.md` — Configuration options
- `otp-input-accessibility.md` — Accessibility features
