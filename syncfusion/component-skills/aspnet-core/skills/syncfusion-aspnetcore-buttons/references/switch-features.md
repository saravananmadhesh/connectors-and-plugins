# Switch Features & Configuration

## Table of Contents
- [Disabled State](#disabled-state)
- [Small Size Switch](#small-size-switch)
- [Enable RTL](#enable-rtl)
- [Form Integration](#form-integration)
- [Enable Persistence](#enable-persistence)
- [Locale Override](#locale-override)

---

## Disabled State

Use the `disabled` property to render the Switch in a non-interactive, disabled state. Disabled switches cannot be toggled by the user and their values are **not submitted** in a form.

**Tag Helper:**
```cshtml
<ejs-switch id="switch1" disabled="true"></ejs-switch>
```

> When a switch is disabled, it is grayed out and unresponsive to user interaction.

---

## Small Size Switch

The Switch supports two sizes: **default** and **small**. To render a smaller switch, set `cssClass` to `e-small`.

**Tag Helper:**
```cshtml
<div id='container'>
    <table class='size'>
        <tr>
            <td class='lSize'>Small</td>
            <td>
                <ejs-switch id="switch1" cssClass="e-small"></ejs-switch>
            </td>
        </tr>
        <tr>
            <td class='lSize'>Default</td>
            <td>
                <ejs-switch id="switch2"></ejs-switch>
            </td>
        </tr>
    </table>
</div>

<style>
.size tr td { padding: 10px; }
.size .lSize {
    font-family: "Roboto", "Segoe UI", sans-serif;
    font-size: 13px;
    cursor: pointer;
    user-select: none;
}
</style>
```

> `e-small` reduces the switch dimensions. No other size values are documented.

---

## Enable RTL

Enable right-to-left (RTL) rendering for locales that read right-to-left (e.g., Arabic, Hebrew) by setting `enableRtl` to `true`.

**Tag Helper:**
```cshtml
<ejs-switch id="switch1" enableRtl="true"></ejs-switch>
```

> RTL support flips the layout direction so the handle moves from right-to-left when toggled.

---

## Form Integration

The Switch supports HTML form submission via the `name` and `value` properties. Only **checked** and **non-disabled** switches submit their value to the server on form submit.

**Tag Helper:**
```cshtml
<div id='container'>
    <form>
        <table class='size'>
            <tr>
                <td class='lSize'>USB</td>
                <td>
                    <ejs-switch id="switch1" name="usb" value="on" checked="true"></ejs-switch>
                </td>
            </tr>
            <tr>
                <td class='lSize'>Wi-Fi</td>
                <td>
                    <ejs-switch id="switch2" name="wifi" value="on" checked="true"></ejs-switch>
                </td>
            </tr>
            <tr>
                <td class='lSize'>Bluetooth</td>
                <td>
                    <ejs-switch id="switch3" name="bluetooth" value="on" disabled="true"></ejs-switch>
                </td>
            </tr>
            <tr>
                <td>
                    <ejs-button id="btnElement"></ejs-button>
                </td>
            </tr>
        </table>
    </form>
</div>
```

**Key Rules:**
- `name` attribute groups switches in a form.
- `value` is the data posted to the server for checked switches.
- Disabled or unchecked switches do NOT post values.

---

## Enable Persistence

To persist the Switch state (checked/unchecked) across page reloads (using browser localStorage), set `enablePersistence` to `true`.

**Tag Helper:**
```cshtml
<ejs-switch id="switch1" enablePersistence="true"></ejs-switch>
```

> Default value is `false`. When enabled, the switch remembers its last state after a browser refresh.

---

## Locale Override

Override the global culture and localization value for an individual Switch component using the `locale` property.

**Tag Helper:**
```cshtml
<ejs-switch id="switch1" locale="ar"></ejs-switch>
```

> Default global culture is `en-US`. This property is useful for multi-language applications.
