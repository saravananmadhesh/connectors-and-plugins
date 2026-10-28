export interface EmailMessage {
  to: string;
  subject: string;
  /** Plain-text fallback */
  text: string;
  /** Optional HTML body */
  html?: string;
}

export interface EmailPort {
  send(message: EmailMessage): Promise<void>;
}
