# Bot Integrations — Syncfusion ASP.NET MVC Chat UI

## Table of Contents
1. [Microsoft Bot Framework (Direct Line)](#microsoft-bot-framework-direct-line)
2. [Google Dialogflow](#google-dialogflow)
3. [Speech-to-Text](#speech-to-text)
4. [Integration Troubleshooting](#integration-troubleshooting)

---

## Microsoft Bot Framework (Direct Line)

Connect the Chat UI to a Microsoft Bot Framework bot via the Direct Line channel.

### 1. Install the NuGet Package

```
Install-Package Microsoft.Bot.Connector.DirectLine
```

### 2. Secure Your Direct Line Secret

Store the secret in `Web.config` and never expose it to the client:

```xml
<!-- Web.config -->
<appSettings>
    <add key="DirectLineSecret" value="YOUR_DIRECT_LINE_SECRET_HERE" />
</appSettings>
```

### 3. Create the Token Controller

```csharp
using System.Configuration;
using System.Net.Http;
using System.Web.Mvc;
using Newtonsoft.Json;

public class TokenController : Controller
{
    private static readonly HttpClient _http = new HttpClient();

    [HttpGet]
    public async System.Threading.Tasks.Task<ActionResult> DirectLineToken()
    {
        string secret = ConfigurationManager.AppSettings["DirectLineSecret"];
        _http.DefaultRequestHeaders.Authorization =
            new System.Net.Http.Headers.AuthenticationHeaderValue("Bearer", secret);

        var response = await _http.PostAsync(
            "https://directline.botframework.com/v3/directline/tokens/generate",
            null);
        var json    = await response.Content.ReadAsStringAsync();
        var result  = JsonConvert.DeserializeAnonymousType(json, new { token = "" });

        return Json(new { token = result.token }, JsonRequestBehavior.AllowGet);
    }
}
```

### 4. Connect Client-Side in the MessageSend Event

Include `botframework-directlinejs` from CDN:

```html
<script src="https://unpkg.com/botframework-directlinejs/dist/botframework-directline.js"></script>
```

```razor
@Html.EJS().ChatUI("chatUI")
    .Created("onCreated")
    .MessageSend("onMessageSend")
    .User(ViewBag.CurrentUser)
    .Render()

<script>
    var chatInstance;
    var directLine;

    function onCreated() {
        chatInstance = ej.base.getInstance(
            document.getElementById('chatUI'),
            ejs.interactivechat.ChatUI
        );

        // Fetch a short-lived token (never use secret on client)
        fetch('/Token/DirectLineToken')
            .then(function (res) { return res.json(); })
            .then(function (data) {
                directLine = new BotFramework.DirectLine({ token: data.token });

                // Subscribe to bot activities
                directLine.activity$
                    .filter(function (activity) {
                        return activity.type === 'message' &&
                               activity.from.id !== 'user1'; // exclude echoed user messages
                    })
                    .subscribe(function (activity) {
                        chatInstance.addMessage({
                            text:   activity.text,
                            author: { id: 'bot', user: 'Bot Assistant' }
                        });
                    });
            });
    }

    function onMessageSend(args) {
        if (!directLine) return;
        directLine.postActivity({
            type: 'message',
            from: { id: 'user1', name: 'User' },
            text: args.message.text
        }).subscribe(function () {}, function (err) {
            console.error('Failed to send to bot:', err);
        });
    }
</script>
```

### Direct Line Integration Checklist

| Step | Verify |
|------|--------|
| Token endpoint is server-side only | ✅ Never put `DirectLineSecret` in JavaScript |
| CORS on token controller | ✅ Restrict origins if needed via `[AllowCrossSiteJson]` |
| Bot activity filter | ✅ Filter by `from.id` to avoid echoing user's own messages |
| Token refresh | ⚠️ Direct Line tokens expire; implement refresh via `renewToken` for long sessions |

---

## Google Dialogflow

Use the Dialogflow V2 API to route messages to a Dialogflow agent and display intents as bot replies.

### 1. Install the NuGet Package

```
Install-Package Google.Cloud.Dialogflow.V2
```

### 2. Store Credentials

Place your Google service account JSON key at a secure path and reference it in `Web.config`:

```xml
<appSettings>
    <add key="GoogleApplicationCredentials" value="C:\secrets\dialogflow-key.json" />
    <add key="DialogflowProjectId" value="your-project-id" />
</appSettings>
```

### 3. Create the Chat Controller Endpoint

```csharp
using System.Configuration;
using System.Web.Mvc;
using Google.Cloud.Dialogflow.V2;

public class ChatController : Controller
{
    [HttpPost]
    public async System.Threading.Tasks.Task<ActionResult> Message(string userMessage, string sessionId)
    {
        // Set credentials via environment variable or explicit path
        System.Environment.SetEnvironmentVariable(
            "GOOGLE_APPLICATION_CREDENTIALS",
            ConfigurationManager.AppSettings["GoogleApplicationCredentials"]
        );

        var projectId = ConfigurationManager.AppSettings["DialogflowProjectId"];
        var client    = await SessionsClient.CreateAsync();
        var session   = SessionName.FromProjectSession(projectId, sessionId);

        var request = new DetectIntentRequest
        {
            Session = session.ToString(),
            QueryInput = new QueryInput
            {
                Text = new TextInput { Text = userMessage, LanguageCode = "en" }
            }
        };

        var response     = await client.DetectIntentAsync(request);
        var replyText    = response.QueryResult.FulfillmentText;

        return Json(new { reply = replyText });
    }
}
```

### 4. Wire Up the MessageSend Event

```razor
@Html.EJS().ChatUI("chatUI")
    .Created("onCreated")
    .MessageSend("onMessageSend")
    .User(ViewBag.CurrentUser)
    .Render()

<script>
    var chatInstance;
    var sessionId = 'session-' + Math.random().toString(36).substr(2, 9);

    function onCreated() {
        chatInstance = ej.base.getInstance(
            document.getElementById('chatUI'),
            ejs.interactivechat.ChatUI
        );
    }

    function onMessageSend(args) {
        var userText = args.message.text;

        fetch('/Chat/Message', {
            method:  'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body:    'userMessage=' + encodeURIComponent(userText) +
                     '&sessionId=' + encodeURIComponent(sessionId)
        })
        .then(function (res) { return res.json(); })
        .then(function (data) {
            chatInstance.addMessage({
                text:   data.reply,
                author: { id: 'bot', user: 'Dialogflow Bot' }
            });
        })
        .catch(function (err) {
            console.error('Dialogflow error:', err);
        });
    }
</script>
```

### Dialogflow Integration Checklist

| Step | Verify |
|------|--------|
| Credentials file path is absolute and accessible | ✅ Use `Server.MapPath` if relative |
| Project ID matches Dialogflow console | ✅ Check at console.dialogflow.com |
| Session ID uniqueness | ✅ Per-user or per-conversation session ID |
| Rate limiting / quota | ⚠️ Dialogflow free tier: 180 requests/minute |

---

## Speech-to-Text

Integrate the Syncfusion `SpeechToText` component in the Chat UI footer to allow voice input.

### 1. Add the SpeechToText Component to the Footer Template

```razor
@Html.EJS().ChatUI("chatUI")
    .Messages(ViewBag.Messages)
    .User(ViewBag.CurrentUser)
    .FooterTemplate("#footerTemplate")
    .Render()

<script id="footerTemplate" type="text/x-template">
    <div class="chat-footer-template">
        <div id="msgInput"
             contenteditable="true"
             class="e-input"
             style="flex:1; min-height:36px; padding:6px 10px; border:1px solid #ccc; border-radius:4px; outline:none;"
             placeholder="Type or speak a message…"></div>
        <button id="sttBtn" class="e-btn e-outline" onclick="toggleSTT()" title="Voice input">
            <span class="e-icons e-speech"></span>
        </button>
        <button class="e-btn e-primary" onclick="sendMessage()" title="Send">
            <span class="e-icons e-send"></span>
        </button>
    </div>
</script>

@Html.EJS().SpeechToText("speechToText")
    .TranscriptChanged("onTranscriptChanged")
    .Render()
```

### 2. Wire the Transcript to the Input

```javascript
var chatInstance;

document.addEventListener('DOMContentLoaded', function () {
    chatInstance = ej.base.getInstance(
        document.getElementById('chatUI'),
        ejs.interactivechat.ChatUI
    );
});

function toggleSTT() {
    var stt = ej.base.getInstance(
        document.getElementById('speechToText'),
        ejs.inputs.SpeechToText
    );
    if (stt.isListening) {
        stt.stop();
    } else {
        stt.start();
    }
}

function onTranscriptChanged(args) {
    // args.transcript — the latest recognised text
    var input = document.getElementById('msgInput');
    if (input) input.innerText = args.transcript;
}

function sendMessage() {
    var input = document.getElementById('msgInput');
    var text  = input ? input.innerText.trim() : '';
    if (!text || !chatInstance) return;

    chatInstance.addMessage({ text: text, author: chatInstance.user });
    input.innerText = '';
}
```

### 3. NuGet for SpeechToText

The `SpeechToText` component is included in `Syncfusion.EJ2.MVC5` — no separate package needed. Register it via:

```razor
@Html.EJS().SpeechToText("speechToText")
    .TranscriptChanged("onTranscriptChanged")
    .Render()
```

> **Browser support:** The Web Speech API is supported in Chrome, Edge, and Safari (macOS/iOS). Firefox does not support it natively.

### Speech-to-Text Checklist

| Step | Verify |
|------|--------|
| HTTPS required | ✅ `getUserMedia` / Web Speech API requires a secure context |
| Microphone permission | ✅ Browser will prompt; handle denial gracefully |
| `SpeechToText` component script | ✅ Included in `ej2.min.js` — no extra CDN needed |
| Fallback for unsupported browsers | ✅ Show text input only when `!window.SpeechRecognition && !window.webkitSpeechRecognition` |

---

## Integration Troubleshooting

| Issue | Likely Cause | Fix |
|-------|--------------|-----|
| Direct Line token returns 401 | Incorrect or expired secret | Regenerate the Direct Line channel secret in Azure Bot Service |
| Bot messages not appearing | Activity subscription not set up in `Created` | Ensure `directLine.activity$.subscribe(...)` runs in `onCreated` after token fetch |
| Dialogflow returns empty `fulfillmentText` | No default text response in intent | Add a "Text response" to the Dialogflow intent |
| Dialogflow 403 error | Wrong `GOOGLE_APPLICATION_CREDENTIALS` path | Verify the JSON key file exists and the path is correct |
| STT transcript is empty | Recognition ended before result | Use `interimResults: true` or wait for `onend` event |
| STT `NotAllowedError` | Microphone denied or non-HTTPS | Run under HTTPS; prompt user to allow microphone |
| Chat UI footer template not rendering | Missing `#footerTemplate` element | Ensure the `<script id="footerTemplate">` is in the DOM before the component renders |
