# Templates & Animation — Syncfusion ASP.NET Core Toast

## Table of Contents
- [Template Property](#template-property)
- [Content Template Tag](#content-template-tag)
- [Dynamic Templates](#dynamic-templates)
- [Animation Settings](#animation-settings)
- [Play Audio Before Toast Opens](#play-audio-before-toast-opens)

---

## Template Property

Use the `template` property to render a fully custom HTML layout for the toast, replacing the default title/content structure. The `template` property takes priority over `title` and `content` when both are set.

**Inline string template:**

```cshtml
<ejs-toast id="element" template="<div>Custom Toast Content</div>">
    <e-toast-position X="Right" Y="Bottom"></e-toast-position>
</ejs-toast>
```

**Template by element ID (query selector):**

Define the template markup in a `<script type="text/x-template">` block and reference it by ID:

```cshtml
<ejs-toast id="element" extendedTimeout="0" timeOut="120000">
    <e-toast-position X="Right" Y="Bottom"></e-toast-position>
</ejs-toast>

<script id="toast_template" type="text/x-template">
    <div class="toast-custom">
        <div class="toast-title">Weekend Alarm</div>
        <div class="toast-message">
            With traffic, it's likely to take 45 minutes to get to Jenny's Birthday Bash.
        </div>
        <img src="https://ej2.syncfusion.com/demos/src/toast/resource/map.jpg"
             width="100%" height="70%" alt="Map">
    </div>
</script>

<ejs-button id="showBtn" content="Show Toast" cssClass="e-btn"></ejs-button>

<script>
    setTimeout(function () {
        var toast = document.getElementById('element').ej2_instances[0];
        toast.target = document.body;
        toast.show({ template: document.getElementById('toast_template').innerHTML });
    }, 1000);

    document.getElementById('showBtn').addEventListener('click', function () {
        document.getElementById('element').ej2_instances[0].show();
    });
</script>
```

---

## Content Template Tag

Use `<e-content-template>` as a child of `<ejs-toast>` to define rich HTML content inline in the Razor view. This is the recommended approach for server-side Razor layouts:

```cshtml
<ejs-toast id="element"
           showCloseButton="true"
           showProgressBar="true"
           progressDirection="Ltr">
    <e-toast-position X="Center" Y="Top"></e-toast-position>
    <e-content-template>
        <div class="progress-bar-wrapper">
            <div class="progress"><span style="width: 80%"></span></div>
            <p>File downloading: <strong>report.pdf</strong></p>
        </div>
    </e-content-template>
</ejs-toast>

<script>
    setTimeout(function () {
        var toast = document.getElementById('element').ej2_instances[0];
        toast.target = document.body;
        toast.show();
    }, 500);
</script>
```

---

## Dynamic Templates

The `show()` method accepts a model object that can override `template`, `title`, `content`, and other properties per-call. This allows showing different content each time the toast is triggered.

```cshtml
<ejs-toast id="element" extendedTimeout="0" timeOut="120000">
    <e-toast-position X="Right" Y="Bottom"></e-toast-position>
</ejs-toast>

<ejs-button id="showBtn" content="Show Toast" cssClass="e-btn"></ejs-button>

<script>
    var templates = [
        '<div class="custom-toast"><strong>New Message</strong><p>You have a new message from Alice.</p></div>',
        '<div class="custom-toast"><strong>Download Complete</strong><p>Your file is ready.</p></div>',
        '<div class="custom-toast"><strong>Upload Failed</strong><p>Please retry the upload.</p></div>'
    ];
    var flag = 0;

    setTimeout(function () {
        var toast = document.getElementById('element').ej2_instances[0];
        toast.target = document.body;
        toast.show({ template: templates[flag] });
        flag = (flag + 1) % templates.length;
    }, 1000);

    document.getElementById('showBtn').addEventListener('click', function () {
        var toast = document.getElementById('element').ej2_instances[0];
        toast.show({ template: templates[flag] });
        flag = (flag + 1) % templates.length;
    });
</script>
```

---

## Animation Settings

Use `<e-toast-animationsettings>` to customize the show and hide animations. The animation accepts `effect` (animation name) and `duration` (milliseconds).

```cshtml
<ejs-toast id="element"
           title="Animated Toast"
           content="Custom slide-in animation.">
    <e-toast-position X="Right" Y="Bottom"></e-toast-position>
    <e-toast-animationsettings>
        <e-toast-animationsettingsshow effect="SlideRightIn"  duration="400"></e-toast-animationsettingsshow>
        <e-toast-animationsettingshide effect="SlideRightOut" duration="400"></e-toast-animationsettingshide>
    </e-toast-animationsettings>
</ejs-toast>

<ejs-button id="showBtn" content="Show Toast" cssClass="e-btn"></ejs-button>

<script>
    setTimeout(function () {
        var toast = document.getElementById('element').ej2_instances[0];
        toast.target = document.body;
        toast.show();
    }, 1000);

    document.getElementById('showBtn').addEventListener('click', function () {
        document.getElementById('element').ej2_instances[0].show();
    });
</script>
```

### Changing Animation Dynamically

```javascript
function changeShowAnimation(effectName) {
    document.getElementById('element').ej2_instances[0].animation.show.effect = effectName;
}
function changeHideAnimation(effectName) {
    document.getElementById('element').ej2_instances[0].animation.hide.effect = effectName;
}
```

### Common Animation Effects

| Show Effects | Hide Effects |
|---|---|
| `FadeIn` (default) | `FadeOut` (default) |
| `SlideRightIn` | `SlideRightOut` |
| `SlideLeftIn` | `SlideLeftOut` |
| `SlideTopIn` | `SlideTopOut` |
| `SlideBottomIn` | `SlideBottomOut` |
| `ZoomIn` | `ZoomOut` |
| `FlipLeftDownIn` | `FlipLeftDownOut` |
| `FlipRightDownIn` | `FlipRightDownOut` |
| `FlipLeftUpIn` | `FlipLeftUpOut` |
| `FlipRightUpIn` | `FlipRightUpOut` |

---

## Play Audio Before Toast Opens

Use the `beforeOpen` event to play an audio notification before the toast appears. To stop the audio once the toast is visible, use the `open` event.

```cshtml
<ejs-toast id="element"
           title="New Alert"
           content="You have a new friend request."
           beforeOpen="onBeforeOpen">
    <e-toast-position X="Right" Y="Bottom"></e-toast-position>
</ejs-toast>

<ejs-button id="showBtn" content="Show Toast" cssClass="e-btn"></ejs-button>

<script>
    setTimeout(function () {
        var toast = document.getElementById('element').ej2_instances[0];
        toast.target = document.body;
        toast.show();
    }, 1000);

    function onBeforeOpen(e) {
        var audio = new Audio('https://example.com/notification.mp3');
        audio.play();
    }

    document.getElementById('showBtn').addEventListener('click', function () {
        document.getElementById('element').ej2_instances[0].show();
    });
</script>
```

> Replace the audio URL with your actual notification sound file path.

---

## Key Notes

- `template` takes **precedence** over `title` and `content` when set.
- `<e-content-template>` is the Razor-idiomatic way to embed rich HTML; use it for server-rendered content.
- The `show()` method model argument overrides the component's default properties for that specific toast instance only.
- Animation effects are case-sensitive string names from the EJ2 Animation library.
