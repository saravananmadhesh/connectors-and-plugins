# Mentions and Globalization — Syncfusion ASP.NET MVC Chat UI

## Table of Contents
1. [Mention Users](#mention-users)
2. [Mention Trigger Character](#mention-trigger-character)
3. [Predefined Mentions](#predefined-mentions)
4. [MentionSelect Event](#mentionselect-event)
5. [Localization](#localization)
6. [RTL Support](#rtl-support)

---

## Mention Users

`MentionUsers` defines the list of users that appear in the `@`-mention autocomplete popup when a user types the trigger character in the message input. Each entry is a `ChatUIUser`.

```csharp
// Controller
ViewBag.MentionUsers = new List<ChatUIUser>
{
    new ChatUIUser { Id = "user1", User = "Albert",  AvatarUrl  = "/images/albert.png" },
    new ChatUIUser { Id = "user2", User = "Michale", AvatarUrl  = "/images/michale.png" },
    new ChatUIUser { Id = "user3", User = "Charlie", AvatarBgColor = "#9b59b6" }
};
```

```razor
@Html.EJS().ChatUI("chatUI")
    .MentionUsers(ViewBag.MentionUsers as List<Syncfusion.EJ2.InteractiveChat.ChatUIUser>)
    .Messages(ViewBag.Messages)
    .User(ViewBag.CurrentUser)
    .Render()
```

When the user types `@` in the input, an autocomplete popup opens. Selecting a user inserts their name as a styled mention chip in the message.

---

## Mention Trigger Character

Use `MentionTriggerChar` to change the character that opens the mention popup. Default: `"@"`.

```razor
<!-- Trigger with "/" for command-style mentions -->
@Html.EJS().ChatUI("chatUI")
    .MentionUsers(ViewBag.MentionUsers as List<Syncfusion.EJ2.InteractiveChat.ChatUIUser>)
    .MentionTriggerChar("/")
    .Messages(ViewBag.Messages)
    .User(ViewBag.CurrentUser)
    .Render()
```

---

## Predefined Mentions

Use `MentionUsers` in combination with `Text` to pre-populate a message with specific users already mentioned. Use `{0}`, `{1}`, `{2}`, … as positional placeholders that correspond to the zero-based index of users in `MentionUsers`.

```csharp
// Controller — pre-fill a message mentioning Michale and Charlie
var targetUsers = new List<ChatUIUser>
{
    new ChatUIUser { Id = "user2", User = "Michale" },
    new ChatUIUser { Id = "user3", User = "Charlie" }
};
ViewBag.MentionUsers  = targetUsers;
ViewBag.PredefinedText = "Hi {0} and {1}, the meeting has been rescheduled.";
```

```razor
@Html.EJS().ChatUI("chatUI")
    .MentionUsers(ViewBag.MentionUsers as List<Syncfusion.EJ2.InteractiveChat.ChatUIUser>)
    .Placeholder(ViewBag.PredefinedText as string)
    .Messages(ViewBag.Messages)
    .User(ViewBag.CurrentUser)
    .Render()
```

> **Placeholder resolution:** `{0}` is replaced with the first user in `MentionUsers`, `{1}` with the second, and so on. If an index exceeds the list length (e.g., `{5}` when only 2 users are set), it renders as the literal string `{5}`.

**Sending a message with pre-filled mentions:**

```javascript
function onCreated() {
    var chatUI = ej.base.getInstance(
        document.getElementById('chatUI'),
        ejs.interactivechat.ChatUI
    );
    chatUI.addMessage({
        text:   "Hi @Michale and @Charlie, the meeting has been rescheduled.",
        author: currentUser
    });
}
```

---

## MentionSelect Event

`MentionSelect` fires when the user picks a mention from the autocomplete popup. Use it to record, validate, or cancel the mention insertion.

**`MentionSelectEventArgs` properties:**

| Property | Type | Description |
|----------|------|-------------|
| `itemData` | `object` | The full data object of the selected user from the `MentionUsers` list. Access user fields via `args.itemData.id`, `args.itemData.user`, etc. |
| `cancel` | `bool` | Set to `true` to prevent the selected mention from being inserted into the chat input field, allowing custom handling. |
| `isInteracted` | `bool` | `true` when the selection was triggered by user action (click, Enter, tap); `false` if triggered programmatically. |
| `event` | `MouseEvent\|KeyboardEvent\|TouchEvent` | The native browser event that triggered the selection. |
| `name` | `string` | Name of the event (`"mentionSelect"`). |

```razor
@Html.EJS().ChatUI("chatUI")
    .MentionUsers(ViewBag.MentionUsers as List<Syncfusion.EJ2.InteractiveChat.ChatUIUser>)
    .MentionSelect("onMentionSelect")
    .Messages(ViewBag.Messages)
    .User(ViewBag.CurrentUser)
    .Render()

<script>
    function onMentionSelect(args) {
        // args.itemData — the selected user's data object from MentionUsers
        console.log("User mentioned:", args.itemData.user, "(id:", args.itemData.id, ")");
    }
</script>
```

**Cancelling the default mention insertion:**

```javascript
function onMentionSelect(args) {
    // Prevent the mention chip from being inserted into the input
    args.cancel = true;
    // Apply custom logic instead, e.g. notify a server
    console.log("Mention selected by interaction:", args.isInteracted, "User:", args.itemData.user);
}
```

---

## Localization

### Setting the Locale

Use `.Locale("de")` (or any IETF language tag) to switch the Chat UI locale. This affects the typing indicator text and any other built-in strings.

```razor
@Html.EJS().ChatUI("chatUI")
    .Locale("de")
    .Messages(ViewBag.Messages)
    .User(ViewBag.CurrentUser)
    .Render()
```

### Providing Translation Strings

Load custom locale strings using `ej.base.L10n.load()` **before** the component renders:

```html
<script>
    ej.base.L10n.load({
        'de': {
            'chat-ui': {
                'oneUserTyping':      '{0} tippt gerade',
                'twoUserTyping':      '{0} und {1} tippen gerade',
                'threeUserTyping':    '{0}, {1} und {2} weitere tippen gerade',
                'multipleUsersTyping':'{0}, {1} und {2} weitere tippen gerade'
            }
        }
    });
</script>

@Html.EJS().ChatUI("chatUI")
    .Locale("de")
    .Messages(ViewBag.Messages)
    .User(ViewBag.CurrentUser)
    .Render()
```

### Localizable String Keys

| Key | Default (English) | Tokens |
|-----|-------------------|--------|
| `oneUserTyping` | `"{0} is typing"` | `{0}` = user name |
| `twoUserTyping` | `"{0} and {1} are typing"` | `{0}`, `{1}` = user names |
| `threeUserTyping` | `"{0}, {1}, and {2} other are typing"` | `{0}`, `{1}` = users; `{2}` = count |
| `multipleUsersTyping` | `"{0}, {1}, and {2} others are typing"` | `{0}`, `{1}` = users; `{2}` = count |

### Using a Resource File for Locale Strings

For ASP.NET MVC applications, pass locale strings from a `.resx` file via `ViewBag`:

```csharp
// Controller
ViewBag.LocaleStrings = new
{
    oneUserTyping       = Resources.Chat.OneUserTyping,
    twoUserTyping       = Resources.Chat.TwoUserTyping,
    threeUserTyping     = Resources.Chat.ThreeUserTyping,
    multipleUsersTyping = Resources.Chat.MultipleUsersTyping
};
```

```html
<script>
    var locale = '@ViewBag.CultureCode';
    var strings = @Html.Raw(Newtonsoft.Json.JsonConvert.SerializeObject(ViewBag.LocaleStrings));

    ej.base.L10n.load({
        [locale]: { 'chat-ui': strings }
    });
</script>
```

---

## RTL Support

Use `EnableRtl(true)` to switch the Chat UI layout to right-to-left mode for Arabic, Hebrew, Persian, and other RTL languages. Default: `false`.

```razor
@Html.EJS().ChatUI("chatUI")
    .EnableRtl(true)
    .Locale("ar")
    .Messages(ViewBag.Messages)
    .User(ViewBag.CurrentUser)
    .Render()
```

RTL mode mirrors:
- Message bubble alignment (sent messages appear on the left, received on the right)
- Header toolbar item order
- Footer input direction
- Suggestion chip row direction

### Loading an RTL-aware Locale

```html
<script>
    ej.base.L10n.load({
        'ar': {
            'chat-ui': {
                'oneUserTyping':      '{0} يكتب',
                'twoUserTyping':      '{0} و {1} يكتبان',
                'threeUserTyping':    '{0} و {1} و {2} آخرون يكتبون',
                'multipleUsersTyping':'{0} و {1} و {2} آخرون يكتبون'
            }
        }
    });
</script>

@Html.EJS().ChatUI("chatUI")
    .EnableRtl(true)
    .Locale("ar")
    .Messages(ViewBag.Messages)
    .User(ViewBag.CurrentUser)
    .Render()
```

> **Tip:** When using a Syncfusion RTL-aware theme (e.g., `fluent-rtl.css`), replace the theme CSS reference accordingly. The Chat UI automatically picks up base RTL styles when `EnableRtl` is `true`.
