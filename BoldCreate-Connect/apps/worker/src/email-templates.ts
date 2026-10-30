/**
 * The mails the worker sends. Each one is a short block of content that is drawn twice from the
 * same data: an HTML message in one shared layout (tables and inline styles, which mail programs
 * render alike) and a plain text one for programs that show no HTML.
 */

const PRODUCT_NAME = 'BoldConnect';
const BRAND = '#e03f00';
const PAGE_BACKGROUND = '#f7f9fc';
const INK = '#111827';
const MUTED = '#4b5563';
const FONT = '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';

export interface RenderedEmail {
  subject: string;
  text: string;
  html: string;
}

/** A paragraph: plain pieces, with `strong` ones shown bold in HTML. */
type Paragraph = (string | { strong: string })[];

interface Content {
  subject: string;
  /** The line a mail list shows after the subject; it is not visible in the message. */
  preheader: string;
  heading: string;
  paragraphs: Paragraph[];
  button?: { label: string; url: string };
  /** Small print under the button. */
  note?: string;
}

export function escapeHtml(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#39;');
}

const paragraphText = (paragraph: Paragraph): string =>
  paragraph.map((piece) => (typeof piece === 'string' ? piece : piece.strong)).join('');

const paragraphHtml = (paragraph: Paragraph): string =>
  paragraph
    .map((piece) =>
      typeof piece === 'string'
        ? escapeHtml(piece)
        : `<strong>${escapeHtml(piece.strong)}</strong>`,
    )
    .join('');

/** The button every client draws alike: an Outlook shape, and a styled link for the rest. */
function buttonHtml(label: string, url: string): string {
  const href = escapeHtml(url);
  const text = escapeHtml(label);
  return `<table role="presentation" cellspacing="0" cellpadding="0" border="0" align="center" style="margin:28px auto;">
<tr><td align="center" style="border-collapse:collapse;padding:0;">
<!--[if mso]>
<v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" href="${href}" style="height:44px;v-text-anchor:middle;width:240px;" arcsize="10%" stroke="f" fillcolor="${BRAND}">
<w:anchorlock/>
<center style="color:#ffffff;font-family:Arial,sans-serif;font-size:16px;font-weight:bold;">${text}</center>
</v:roundrect>
<![endif]-->
<!--[if !mso]><!-- -->
<a href="${href}" style="display:inline-block;padding:12px 28px;background-color:${BRAND};color:#ffffff;text-decoration:none;font-weight:600;font-size:16px;border-radius:6px;text-align:center;line-height:20px;">${text}</a>
<!--<![endif]-->
</td></tr>
</table>`;
}

function renderHtml(content: Content, logoUrl: string): string {
  const paragraphs = content.paragraphs
    .map(
      (paragraph) =>
        `<p style="margin:0 0 16px;font-size:16px;color:${INK};line-height:1.6;">${paragraphHtml(paragraph)}</p>`,
    )
    .join('\n');
  const button = content.button
    ? `${buttonHtml(content.button.label, content.button.url)}
<p style="margin:0 0 16px;font-size:13px;color:${MUTED};line-height:1.5;word-break:break-all;">If the button does not work, paste this link into your browser:<br/><a href="${escapeHtml(content.button.url)}" style="color:${MUTED};">${escapeHtml(content.button.url)}</a></p>`
    : '';
  const note = content.note
    ? `<p style="margin:0 0 16px;font-size:14px;color:${MUTED};line-height:1.6;">${escapeHtml(content.note)}</p>`
    : '';
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
<meta name="color-scheme" content="light"/>
<title>${escapeHtml(content.subject)}</title>
</head>
<body style="margin:0;padding:0;background-color:${PAGE_BACKGROUND};font-family:${FONT};">
<div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;">${escapeHtml(content.preheader)}</div>
<table width="100%" cellpadding="0" cellspacing="0" role="presentation" style="background-color:${PAGE_BACKGROUND};padding:40px 20px;">
<tr><td align="center">
<table role="presentation" cellpadding="0" cellspacing="0" style="margin:0 auto 24px;"><tr>
<td style="padding-right:10px;"><img src="${escapeHtml(logoUrl)}" alt="" width="36" height="36" style="display:block;width:36px;height:36px;border-radius:8px;"/></td>
<td style="font-size:20px;font-weight:700;color:${INK};font-family:${FONT};">${PRODUCT_NAME}</td>
</tr></table>
<table width="100%" role="presentation" style="max-width:480px;background-color:#ffffff;border-radius:12px;box-shadow:0 2px 6px rgba(0,0,0,0.08);overflow:hidden;" cellpadding="0" cellspacing="0">
<tr><td style="padding:28px 24px;">
<h1 style="margin:0 0 20px;font-size:20px;font-weight:600;color:${INK};line-height:1.4;">${escapeHtml(content.heading)}</h1>
${paragraphs}
${button}
${note}
<p style="margin:24px 0 0;font-size:16px;color:${INK};line-height:1.6;">Thank you,<br/><strong>The ${PRODUCT_NAME} team</strong></p>
</td></tr>
</table>
<p style="margin:24px 0 0;font-size:12px;color:${MUTED};line-height:1.5;">You received this message because of activity on ${PRODUCT_NAME}.</p>
</td></tr>
</table>
</body>
</html>`;
}

function renderText(content: Content): string {
  return [
    content.heading,
    '',
    ...content.paragraphs.flatMap((paragraph) => [paragraphText(paragraph), '']),
    ...(content.button ? [`${content.button.label}:`, content.button.url, ''] : []),
    ...(content.note ? [content.note, ''] : []),
    `Thank you,`,
    `The ${PRODUCT_NAME} team`,
  ].join('\n');
}

function render(content: Content, baseUrl: string): RenderedEmail {
  const logoUrl = new URL('/apple-touch-icon.png', baseUrl).toString();
  return {
    subject: content.subject,
    text: renderText(content),
    html: renderHtml(content, logoUrl),
  };
}

// ─── The mails ────────────────────────────────────────────────────────────────

export interface InviteMail {
  link: string;
  role: string;
  organizationName?: string | undefined;
  inviterName?: string | undefined;
  inviterEmail?: string | undefined;
}

export function inviteEmail(data: InviteMail, baseUrl: string): RenderedEmail {
  const org = data.organizationName;
  const who = data.inviterName
    ? data.inviterEmail
      ? `${data.inviterName} (${data.inviterEmail})`
      : data.inviterName
    : 'Someone';
  const place = org ? `the organization "${org}"` : 'an organization';
  return render(
    {
      subject: data.inviterName
        ? `${data.inviterName} has invited you to join ${org ?? 'an organization'} on ${PRODUCT_NAME}`
        : `You've been invited to join ${org ?? 'an organization'} on ${PRODUCT_NAME}`,
      preheader: `Accept the invitation to join ${org ?? 'the organization'} as ${data.role}.`,
      heading: org ? `You've been invited to join ${org}` : "You've been invited",
      paragraphs: [
        [
          `${who} has invited you to join ${place} on ${PRODUCT_NAME} as `,
          { strong: data.role },
          '.',
        ],
        ['Use the button below to accept. If you are new, you will choose a password first.'],
      ],
      button: { label: 'Accept invitation', url: data.link },
      note: "This invitation expires in 7 days. If you don't recognize it, you can safely ignore this message.",
    },
    baseUrl,
  );
}

export function verificationEmail(link: string, baseUrl: string): RenderedEmail {
  return render(
    {
      subject: 'Verify your email address',
      preheader: `Confirm your address to start using ${PRODUCT_NAME}.`,
      heading: 'Verify your email address',
      paragraphs: [[`Confirm this address to finish setting up your ${PRODUCT_NAME} profile.`]],
      button: { label: 'Verify email address', url: link },
      note: "This link expires in 24 hours. If you didn't sign up, you can safely ignore this message.",
    },
    baseUrl,
  );
}

export function passwordResetEmail(link: string, baseUrl: string): RenderedEmail {
  return render(
    {
      subject: 'Reset your password',
      preheader: 'Choose a new password for your profile.',
      heading: 'Reset your password',
      paragraphs: [['We received a request to reset the password for this address.']],
      button: { label: 'Choose a new password', url: link },
      note: "This link expires in 1 hour. If you didn't ask for it, ignore this message and your password stays the same.",
    },
    baseUrl,
  );
}

export function emailChangeEmail(link: string, baseUrl: string): RenderedEmail {
  return render(
    {
      subject: 'Confirm your new email address',
      preheader: 'Confirm the address you want to use from now on.',
      heading: 'Confirm your new email address',
      paragraphs: [
        [
          `Confirm this address to use it for ${PRODUCT_NAME}. You will be signed out everywhere and sign in again with it.`,
        ],
      ],
      button: { label: 'Confirm new address', url: link },
      note: "This link expires in 24 hours. If you didn't ask for this change, ignore this message.",
    },
    baseUrl,
  );
}

/**
 * The link an admin uses to choose a password. When another admin added the address it reads as
 * an invitation from them; otherwise it is the plain set-up message.
 */
export function adminSetupEmail(url: string, baseUrl: string, invitedBy?: string): RenderedEmail {
  const note =
    'This link expires in 30 minutes and works once. If you did not expect it, you can safely ignore this message.';
  if (!invitedBy) {
    return render(
      {
        subject: 'Set up your admin password',
        preheader: 'Choose the password for the admin app.',
        heading: 'Set up your admin password',
        paragraphs: [['Use the button below to choose your admin password.']],
        button: { label: 'Set up password', url },
        note,
      },
      baseUrl,
    );
  }
  return render(
    {
      subject: `${invitedBy} has invited you to be an admin of ${PRODUCT_NAME}`,
      preheader: 'Accept the invitation by choosing your admin password.',
      heading: `You've been invited to be an admin of ${PRODUCT_NAME}`,
      paragraphs: [
        [{ strong: invitedBy }, ` has invited you to manage ${PRODUCT_NAME} as an admin.`],
        ['Use the button below to accept. You will choose your admin password and go straight in.'],
      ],
      button: { label: 'Accept invitation', url },
      note,
    },
    baseUrl,
  );
}

export function deletionEmail(
  data: { displayName: string; resourceName: string; resourceSlug: string },
  baseUrl: string,
): RenderedEmail {
  return render(
    {
      subject: `Your organization "${data.resourceName}" has been deleted`,
      preheader: `${data.resourceName} and everything in it has been removed.`,
      heading: 'Your organization has been deleted',
      paragraphs: [
        [`Hi ${data.displayName},`],
        [
          'The organization ',
          { strong: `"${data.resourceName}"` },
          ` (${data.resourceSlug}) has been permanently deleted.`,
        ],
        ['All associated API keys, connections, and installations have been removed.'],
      ],
      note: 'If you did not expect this, contact your administrator.',
    },
    baseUrl,
  );
}

export interface ErrorAlertGroup {
  groupId: string;
  title: string;
  service: string;
  area: string | null;
  /** Times the failure happened in total. */
  count: number;
  reason: 'new' | 'spike';
}

const ALERT_REASON: Record<ErrorAlertGroup['reason'], string> = {
  new: 'First seen recently',
  spike: 'Happening much more often',
};

/**
 * The mail that tells operators a new or spiking error needs a look. Titles are text the services
 * produced, so they are only ever drawn as text. `adminUrl` is the admin app's address; without it
 * the mail names the errors but links nowhere.
 */
export function errorAlertEmail(
  groups: readonly ErrorAlertGroup[],
  baseUrl: string,
  adminUrl?: string,
): RenderedEmail {
  const link = (path: string): string | undefined =>
    adminUrl ? new URL(path, adminUrl).toString() : undefined;
  const services = [...new Set(groups.map((group) => group.service))];
  const subject =
    groups.length === 1
      ? `Error needs attention in ${services[0]}: ${groups[0]?.title ?? ''}`.slice(0, 120)
      : `${groups.length} errors need attention in ${services.join(', ')}`;
  const listLink = link('/observability');
  return render(
    {
      subject,
      preheader: `${ALERT_REASON[groups[0]?.reason ?? 'new']}. Open the admin app to see where it happens.`,
      heading:
        groups.length === 1 ? 'An error needs attention' : `${groups.length} errors need attention`,
      paragraphs: groups.map((group): Paragraph => {
        const where = group.area ? `${group.service} · ${group.area}` : group.service;
        const detail = link(`/observability/errors/${group.groupId}`);
        return [
          { strong: group.title },
          ` (${where}). ${ALERT_REASON[group.reason]}; ${group.count.toLocaleString('en')} in total.`,
          ...(detail ? [` ${detail}`] : []),
        ];
      }),
      ...(listLink ? { button: { label: 'Open errors', url: listLink } } : {}),
      note: 'You get one mail per error until it has been quiet for a while. Mark an error resolved or ignored in the admin app to stop it being reported again.',
    },
    baseUrl,
  );
}
