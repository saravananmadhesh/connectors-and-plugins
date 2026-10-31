# Timestamps and Time Breaks

This guide covers timestamp display, formatting, and time-based grouping in the Vue Chat UI component.

## Timestamps

### Show/Hide Timestamps

Control timestamp visibility for all messages:

```vue
<template>
  <ejs-chatui 
    :showTimeStamp="true"
    :user="currentUser"
  >
    <e-messages>
      <e-message :author="currentUser" text="Hello"></e-message>
    </e-messages>
  </ejs-chatui>
</template>
```

**Default:** `true`

**When to Hide:**
- Minimalist interfaces
- Space-constrained layouts
- When timing is irrelevant
- Print/export views

### Timestamp Format

Customize how timestamps are displayed:

```vue
<template>
  <ejs-chatui 
    :user="currentUser"
    timeStampFormat="hh:mm a"
  >
    <e-messages>
      <e-message :author="currentUser" text="Message"></e-message>
    </e-messages>
  </ejs-chatui>
</template>
```

**Default Format:** `"dd/MM/yyyy hh:mm a"`

**Format Tokens:**
- `dd` - Day (01-31)
- `MM` - Month (01-12)
- `MMM` - Month short name (Jan, Feb)
- `MMMM` - Month full name (January, February)
- `yyyy` - Year (2026)
- `hh` - Hour (01-12)
- `HH` - Hour 24-format (00-23)
- `mm` - Minute (00-59)
- `ss` - Second (00-59)
- `a` - AM/PM

**Common Formats:**

| Format | Example Output |
|--------|----------------|
| `"hh:mm a"` | 03:45 PM |
| `"HH:mm"` | 15:45 |
| `"MMM dd, hh:mm a"` | Mar 27, 03:45 PM |
| `"dd/MM/yyyy hh:mm a"` | 27/03/2026 03:45 PM |
| `"MMMM dd, yyyy"` | March 27, 2026 |
| `"dd-MM-yyyy HH:mm:ss"` | 27-03-2026 15:45:30 |

### Per-Message Timestamp

Set individual timestamp for specific messages:

```vue
<template>
  <ejs-chatui :user="currentUser">
    <e-messages>
      <e-message 
        :author="currentUser" 
        text="Scheduled message"
        :timestamp="new Date('2026-03-27T10:00:00')"
      ></e-message>
      <e-message 
        :author="otherUser" 
        text="Reply"
        :timestamp="new Date('2026-03-27T10:05:00')"
      ></e-message>
    </e-messages>
  </ejs-chatui>
</template>

<script setup>
const currentUser = { id: "user1", user: "Albert" };
const otherUser = { id: "user2", user: "Michale" };
</script>
```

### Per-Message Timestamp Format

Override global format for specific messages:

```vue
<template>
  <ejs-chatui :user="currentUser" timeStampFormat="hh:mm a">
    <e-messages>
      <e-message 
        :author="currentUser" 
        text="Normal format"
      ></e-message>
      <e-message 
        :author="currentUser" 
        text="Custom format"
        timestampFormat="MMMM dd, hh:mm a"
      ></e-message>
    </e-messages>
  </ejs-chatui>
</template>
```

**Output:**
- First message: `03:45 PM`
- Second message: `March 27, 03:45 PM`

### Dynamic Timestamps

```vue
<script setup>
import { ref } from 'vue';

const messages = ref([
  {
    text: "Sent 5 minutes ago",
    author: { id: "user1", user: "Albert" },
    timestamp: new Date(Date.now() - 5 * 60 * 1000)
  },
  {
    text: "Sent 1 hour ago",
    author: { id: "user2", user: "Michale" },
    timestamp: new Date(Date.now() - 60 * 60 * 1000)
  },
  {
    text: "Sent just now",
    author: { id: "user1", user: "Albert" },
    timestamp: new Date()
  }
]);
</script>

<template>
  <ejs-chatui 
    :user="{ id: 'user1', user: 'Albert' }"
    :messages="messages"
    timeStampFormat="hh:mm a"
  ></ejs-chatui>
</template>
```

## Time Breaks

Group messages by date with visual separators:

### Enable Time Breaks

```vue
<template>
  <ejs-chatui 
    :showTimeBreak="true"
    :user="currentUser"
  >
    <e-messages>
      <e-message 
        :author="currentUser" 
        text="Message from yesterday"
        :timestamp="new Date('2026-03-26T15:00:00')"
      ></e-message>
      <e-message 
        :author="currentUser" 
        text="Message from today"
        :timestamp="new Date('2026-03-27T10:00:00')"
      ></e-message>
    </e-messages>
  </ejs-chatui>
</template>
```

**Default:** `false`

**Behavior:**
- Messages grouped by date
- Date separator appears between different days
- "Today", "Yesterday" labels for recent dates
- Full date for older messages

### Time Break Templates

Customize the appearance of date separators:

```vue
<script setup>
const timeBreakTemplate = (data) => {
  const date = new Date(data);
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  
  if (date.toDateString() === today.toDateString()) {
    return '<div class="time-break">Today</div>';
  } else if (date.toDateString() === yesterday.toDateString()) {
    return '<div class="time-break">Yesterday</div>';
  } else {
    const options = { month: 'short', day: 'numeric', year: 'numeric' };
    return `<div class="time-break">${date.toLocaleDateString('en-US', options)}</div>`;
  }
};
</script>

<template>
  <ejs-chatui 
    :showTimeBreak="true"
    :user="currentUser"
    :timeBreakTemplate="timeBreakTemplate"
  ></ejs-chatui>
</template>

<style>
.time-break {
  text-align: center;
  padding: 12px 0;
  font-size: 12px;
  color: #666;
  font-weight: 600;
  position: relative;
}

.time-break::before,
.time-break::after {
  content: '';
  position: absolute;
  top: 50%;
  width: 40%;
  height: 1px;
  background: #ddd;
}

.time-break::before {
  left: 0;
}

.time-break::after {
  right: 0;
}
</style>
```

### Custom Time Break Styles

```vue
<script setup>
const timeBreakTemplate = (data) => {
  const date = new Date(data);
  const weekday = date.toLocaleDateString('en-US', { weekday: 'long' });
  const monthDay = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  
  return `
    <div class="custom-time-break">
      <div class="weekday">${weekday}</div>
      <div class="date">${monthDay}</div>
    </div>
  `;
};
</script>

<style>
.custom-time-break {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px 0;
  gap: 4px;
}

.custom-time-break .weekday {
  font-size: 10px;
  text-transform: uppercase;
  color: #999;
  letter-spacing: 1px;
}

.custom-time-break .date {
  font-size: 14px;
  font-weight: 600;
  color: #333;
  background: #f0f0f0;
  padding: 4px 12px;
  border-radius: 12px;
}
</style>
```

### Relative Time Labels

Show relative time labels like "Just now", "5 minutes ago":

```vue
<script setup>
const getRelativeTime = (timestamp) => {
  const now = new Date();
  const diff = now - new Date(timestamp);
  const seconds = Math.floor(diff / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  
  if (seconds < 60) return 'Just now';
  if (minutes < 60) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
  if (hours < 24) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  if (days === 1) return 'Yesterday';
  if (days < 7) return `${days} days ago`;
  
  return new Date(timestamp).toLocaleDateString();
};

const timeBreakTemplate = (data) => {
  return `<div class="time-break">${getRelativeTime(data)}</div>`;
};
</script>
```

## Localization

### Culture-Specific Formatting

```vue
<script setup>
import { L10n, setCulture } from '@syncfusion/ej2-base';

// French localization
L10n.load({
  'fr-FR': {
    'chatui': {
      'today': "Aujourd'hui",
      'yesterday': 'Hier'
    }
  }
});

setCulture('fr-FR');
</script>

<template>
  <ejs-chatui 
    locale="fr-FR"
    :showTimeBreak="true"
    timeStampFormat="dd/MM/yyyy HH:mm"
    :user="currentUser"
  ></ejs-chatui>
</template>
```

### Multi-Language Support

```vue
<script setup>
import { ref } from 'vue';

const currentLocale = ref('en-US');

const locales = {
  'en-US': {
    format: 'MM/dd/yyyy hh:mm a',
    today: 'Today',
    yesterday: 'Yesterday'
  },
  'de-DE': {
    format: 'dd.MM.yyyy HH:mm',
    today: 'Heute',
    yesterday: 'Gestern'
  },
  'ja-JP': {
    format: 'yyyy/MM/dd HH:mm',
    today: '今日',
    yesterday: '昨日'
  }
};

const changeLocale = (locale) => {
  currentLocale.value = locale;
};
</script>

<template>
  <div>
    <button @click="changeLocale('en-US')">English</button>
    <button @click="changeLocale('de-DE')">Deutsch</button>
    <button @click="changeLocale('ja-JP')">日本語</button>
    
    <ejs-chatui 
      :locale="currentLocale"
      :timeStampFormat="locales[currentLocale].format"
      :showTimeBreak="true"
      :user="currentUser"
    ></ejs-chatui>
  </div>
</template>
```

## Complete Example

```vue
<template>
  <div class="chat-wrapper">
    <ejs-chatui 
      :user="currentUser"
      :showTimeStamp="true"
      :showTimeBreak="true"
      timeStampFormat="hh:mm a"
      :timeBreakTemplate="timeBreakTemplate"
      :messages="messages"
    ></ejs-chatui>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { ChatUIComponent as EjsChatui } from '@syncfusion/ej2-vue-interactive-chat';

const currentUser = { id: 'user1', user: 'Albert' };
const michaleUser = { id: 'user2', user: 'Michale' };

const messages = ref([
  {
    text: "Message from two days ago",
    author: currentUser,
    timestamp: new Date('2026-03-25T10:00:00')
  },
  {
    text: "Reply from two days ago",
    author: michaleUser,
    timestamp: new Date('2026-03-25T10:15:00')
  },
  {
    text: "Message from yesterday",
    author: currentUser,
    timestamp: new Date('2026-03-26T14:00:00')
  },
  {
    text: "Reply from yesterday",
    author: michaleUser,
    timestamp: new Date('2026-03-26T14:30:00')
  },
  {
    text: "Good morning!",
    author: currentUser,
    timestamp: new Date('2026-03-27T09:00:00')
  },
  {
    text: "Morning! How are you?",
    author: michaleUser,
    timestamp: new Date('2026-03-27T09:05:00')
  }
]);

const timeBreakTemplate = (data) => {
  const date = new Date(data);
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  
  if (date.toDateString() === today.toDateString()) {
    return '<div class="time-break">📅 Today</div>';
  } else if (date.toDateString() === yesterday.toDateString()) {
    return '<div class="time-break">📅 Yesterday</div>';
  } else {
    const options = { weekday: 'long', month: 'long', day: 'numeric' };
    return `<div class="time-break">📅 ${date.toLocaleDateString('en-US', options)}</div>`;
  }
};
</script>

<style>
.chat-wrapper {
  width: 500px;
  height: 600px;
  margin: 0 auto;
}

.time-break {
  text-align: center;
  padding: 16px 0;
  font-size: 13px;
  color: #666;
  font-weight: 600;
  background: #f9f9f9;
  margin: 8px 0;
  border-radius: 4px;
}
</style>
```

## Best Practices

### Timestamps
- Use consistent format across entire application
- Consider user's locale and timezone
- Show full date for messages older than 7 days
- Use relative time ("Just now", "5m ago") for recent messages
- Test timestamp display with various date ranges

### Time Breaks
- Enable for long conversations spanning multiple days
- Use clear, readable date labels
- Consider mobile screen space when styling
- Provide visual separation from messages
- Use relative labels (Today, Yesterday) for recent dates

### Performance
- Cache formatted timestamps to avoid repeated calculations
- Use efficient date formatting libraries
- Batch render time breaks with messages
- Consider virtualization for long message histories

### Accessibility
- Ensure timestamps are readable (sufficient contrast)
- Provide full date/time in ARIA labels
- Support screen reader announcements for time breaks
- Test with assistive technologies
