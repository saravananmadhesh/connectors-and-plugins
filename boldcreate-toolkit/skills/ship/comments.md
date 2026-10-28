# Review comments

Every review comment ends with either a commit that addresses it or a reply that explains why not.

## Fetch

- Conversation and review summaries: `gh pr view <number> --comments`
- Inline comments with their IDs and file positions: `gh api repos/{owner}/{repo}/pulls/<number>/comments`

Skip comments you already replied to and threads already marked resolved.

## Decide each comment

| The comment | Action |
|---|---|
| Points to a defect or a clear improvement inside the PR's scope | Fix it. |
| Asks a question the code or spec answers | Reply with the answer and the file or spec line. |
| Asks for work outside the spec or slice | Reply that it is out of scope and suggest a follow-up. Ask the user first if the reviewer seems to expect it now. |
| Changes a decision in the spec, an ADR or the principles | Ask the user. Do not decide it alone. |
| You disagree with it | Reply with the reason and the evidence. Do not change code you believe is right without the user's say. |

## Fix

1. Group fixes that touch the same area into one commit with the subject `Address review: <short summary>`.
2. Run the `verify` skill. Done when `VERIFIED`.
3. Push with a normal `git push`.

## Reply

Reply on the inline thread: `gh api repos/{owner}/{repo}/pulls/<number>/comments/<comment-id>/replies -f body="<reply>"`. For a general comment, use `gh pr comment <number> --body "<reply>"`.

A reply names the commit that fixed it, or gives the reason in one or two sentences. Leave marking a thread as resolved to the reviewer.

Done when every comment from the fetch has a fix commit or a reply.
