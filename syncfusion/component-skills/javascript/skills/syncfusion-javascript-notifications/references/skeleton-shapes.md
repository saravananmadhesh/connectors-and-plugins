# Skeleton Shapes

The Syncfusion EJ2 JavaScript Skeleton component supports four shape types that mimic different content placeholders.

## Table of Contents
- [Shape Values](#shape-values)
- [Text Shape (Default)](#text-shape-default)
- [Circle Shape](#circle-shape)
- [Square Shape](#square-shape)
- [Rectangle Shape](#rectangle-shape)
- [Building Multi-Shape Layouts](#building-multi-shape-layouts)
- [Choosing the Right Shape](#choosing-the-right-shape)

---

## Shape Values

The `shape` property accepts the following values:

| Shape | Value | Use Case | Dimensions |
|-------|-------|----------|------------|
| Text | `'Text'` | Text lines, paragraphs (default) | Width optional, Height required |
| Circle | `'Circle'` | Avatars, profile pictures, icons | Width required (diameter) |
| Square | `'Square'` | Icons, thumbnails, buttons | Width required (side length) |
| Rectangle | `'Rectangle'` | Images, cards, media content | Width and Height required |

---

## Text Shape (Default)

The default shape used for text line placeholders. Mimics lines of text with proper height.

```typescript
import { Skeleton } from '@syncfusion/ej2-notifications';

// Single text line
let textLine: Skeleton = new Skeleton({
  shape: 'Text',
  height: '15px',
  width: '80%'
});
textLine.appendTo('#text-line');
```

**Visual:** Appears as a horizontal bar with text-like proportions.

---

## Circle Shape

Used for circular placeholders like avatars and profile pictures. The `width` property defines the diameter.

```typescript
import { Skeleton } from '@syncfusion/ej2-notifications';

// Small avatar
let smallAvatar: Skeleton = new Skeleton({
  shape: 'Circle',
  width: '32px'
});
smallAvatar.appendTo('#small-avatar');

// Medium avatar
let mediumAvatar: Skeleton = new Skeleton({
  shape: 'Circle',
  width: '48px'
});
mediumAvatar.appendTo('#medium-avatar');

// Large avatar
let largeAvatar: Skeleton = new Skeleton({
  shape: 'Circle',
  width: '96px'
});
largeAvatar.appendTo('#large-avatar');
```

**Visual:** Perfect circle, width used as diameter.

---

## Square Shape

Used for square placeholders like icons, thumbnails, and small UI elements. The `width` property defines the side length.

```typescript
import { Skeleton } from '@syncfusion/ej2-notifications';

// Small icon
let icon: Skeleton = new Skeleton({
  shape: 'Square',
  width: '24px'
});
icon.appendTo('#icon');

// Thumbnail
let thumbnail: Skeleton = new Skeleton({
  shape: 'Square',
  width: '64px'
});
thumbnail.appendTo('#thumbnail');
```

**Visual:** Perfect square, width used for both dimensions.

---

## Rectangle Shape

Used for rectangular placeholders like images, cards, and media content. Both `width` and `height` are required.

```typescript
import { Skeleton } from '@syncfusion/ej2-notifications';

// Image placeholder
let image: Skeleton = new Skeleton({
  shape: 'Rectangle',
  width: '100%',
  height: '200px'
});
image.appendTo('#image');

// Card placeholder
let card: Skeleton = new Skeleton({
  shape: 'Rectangle',
  width: '300px',
  height: '180px'
});
card.appendTo('#card');

// Banner placeholder
let banner: Skeleton = new Skeleton({
  shape: 'Rectangle',
  width: '100%',
  height: '120px'
});
banner.appendTo('#banner');
```

**Visual:** Custom rectangle with specified dimensions.

---

## Building Multi-Shape Layouts

Combine multiple skeleton shapes to create realistic content placeholders.

### Profile Card Skeleton

```typescript
import { Skeleton } from '@syncfusion/ej2-notifications';

// Create a profile card skeleton layout
const profileCard: HTMLElement = document.getElementById('profile-card')!;
profileCard.style.display = 'flex';
profileCard.style.alignItems = 'center';
profileCard.style.gap = '12px';
profileCard.style.padding = '16px';

// Avatar placeholder
let avatar: Skeleton = new Skeleton({
  shape: 'Circle',
  width: '48px'
});
avatar.appendTo(document.createElement('div'));

// Text content container
const textContainer: HTMLElement = document.createElement('div');
textContainer.style.flex = '1';

// Name placeholder
let name: Skeleton = new Skeleton({
  shape: 'Text',
  height: '16px',
  width: '60%'
});
name.appendTo(textContainer);

// Subtitle placeholder
let subtitle: Skeleton = new Skeleton({
  shape: 'Text',
  height: '12px',
  width: '40%'
});
subtitle.appendTo(textContainer);
```

### Article Card Skeleton

```typescript
import { Skeleton } from '@syncfusion/ej2-notifications';

// Image at top
let articleImage: Skeleton = new Skeleton({
  shape: 'Rectangle',
  width: '100%',
  height: '180px'
});
articleImage.appendTo('#article-image');

// Title
let articleTitle: Skeleton = new Skeleton({
  shape: 'Text',
  height: '20px',
  width: '90%'
});
articleTitle.appendTo('#article-title');

// Description line 1
let desc1: Skeleton = new Skeleton({
  shape: 'Text',
  height: '14px',
  width: '100%'
});
desc1.appendTo('#article-desc-1');

// Description line 2
let desc2: Skeleton = new Skeleton({
  shape: 'Text',
  height: '14px',
  width: '75%'
});
desc2.appendTo('#article-desc-2');
```

### List Item Skeleton

```typescript
import { Skeleton } from '@syncfusion/ej2-notifications';

// List item with icon and text
let listIcon: Skeleton = new Skeleton({
  shape: 'Square',
  width: '40px'
});
listIcon.appendTo('#list-icon');

let listTitle: Skeleton = new Skeleton({
  shape: 'Text',
  height: '16px',
  width: '70%'
});
listTitle.appendTo('#list-title');

let listSubtitle: Skeleton = new Skeleton({
  shape: 'Text',
  height: '12px',
  width: '50%'
});
listSubtitle.appendTo('#list-subtitle');
```

---

## Choosing the Right Shape

| Content Type | Recommended Shape | Example |
|--------------|-------------------|---------|
| Paragraph text | `Text` | Article content, descriptions |
| Heading | `Text` (larger height) | Page titles, section headers |
| User avatar | `Circle` | Profile pictures, user icons |
| Company logo | `Square` or `Circle` | Brand logos |
| Product image | `Rectangle` | E-commerce items |
| Card thumbnail | `Rectangle` | Blog cards, video previews |
| UI icon | `Square` | Buttons, menu items |
| Banner image | `Rectangle` | Hero sections, headers |
| Button | `Square` | Loading button states |

---

## Dimension Reference

| Shape | Width | Height | Example |
|-------|-------|--------|---------|
| `Text` | Optional | Required | `width: '80%', height: '15px'` |
| `Circle` | Required | Ignored | `width: '48px'` |
| `Square` | Required | Ignored | `width: '32px'` |
| `Rectangle` | Required | Required | `width: '100%', height: '200px'` |

---

## API Reference

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `shape` | `string` | `'Text'` | Shape type: `Text`, `Circle`, `Square`, `Rectangle` |
| `width` | `string` | `''` | Width (e.g., `'100%'`, `'200px'`) |
| `height` | `string` | `''` | Height (e.g., `'15px'`, `'200px'`) |

For complete API details, see [skeleton-api.md](./skeleton-api.md).
