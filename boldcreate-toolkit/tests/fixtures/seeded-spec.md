# Book holds

## Problem

Members of the Riverbend community library can borrow a book only when a copy is on the shelf. When every copy is out, members have to keep checking the catalogue and often miss the copy when it comes back. Members have asked for three things: to place a hold on a book that is out, to know when their copy is ready, and to cancel a hold they no longer need.

Desk staff also need to see which returned copies should be set aside for a hold instead of going back on the shelf.

## Solution

Members place a hold on any title that has no copy on the shelf. Holds for a title form a queue in the order they were placed. When a copy is returned, the system assigns it to the first hold in the queue and the copy waits at the desk for that member. A copy that is not collected in time goes to the next hold in the queue.

## User stories

### US-1: Place a hold

As a member, I want to place a hold on a title with no copy on the shelf, so that I get the next returned copy.

- The hold button appears only when no copy of the title is on the shelf.
- A new hold joins the end of the title's queue, and the member sees their position.
- A member can hold at most 5 titles at a time.
- Search for a title to hold should be fast.

### US-2: Collect a held copy

As a member, I want to know when my copy is ready, so that I can collect it before it goes to someone else.

- When a returned copy is assigned to a hold, the member gets an email with the title and the last day to collect.
- A held copy waits at the desk for 3 days.
- If the member does not collect it by then, the hold expires and the copy is assigned to the next hold.

### US-3: Desk list of copies to set aside

As desk staff, I want a list of returned copies that are assigned to holds, so that I can set them aside.

- The list shows the title, the copy barcode, and the member's full name and phone number.
- The list is available on the public catalogue page so staff can open it from any desk computer.
- A copy leaves the list once it is collected or its hold expires.

### US-4: Priority holds

As a member on the premium patron tier, I want my holds to move ahead in the queue.

- A hold placed by a premium patron joins the queue ahead of standard holds.

## Implementation decisions

- A new holds module owns the queue for each title. It exposes `placeHold`, `assignReturnedCopy` and `expireHolds`.
- The circulation module calls `assignReturnedCopy` when a copy is checked in.
- `expireHolds` runs once a day at midnight and expires every hold whose copy has waited longer than 5 days.
- Store the queue in a new table and add the queue logic to `src/holds/HoldQueueService.ts`.
- Emails are sent through the existing notification module.

## Testing decisions

- Seam: the holds module's public functions, called with an in-memory catalogue.
- Test queue order, assignment on return, and expiry.
- Check expiry by reading the `holds` table directly and asserting on the `status` column.

## Out of scope

- Email or text notifications to members.
- Holds on items that are not books, such as magazines and DVDs.
- Fees for uncollected holds.
