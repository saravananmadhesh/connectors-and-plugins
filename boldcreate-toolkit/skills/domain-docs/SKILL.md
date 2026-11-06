---
name: domain-docs
description: Keep the project glossary and decision records short and current. Use when a new domain term appears, a term changes meaning, or a hard-to-reverse choice is made that needs a decision record.
license: MIT
---

# Domain docs

Give the project one shared vocabulary and a record of the choices that are expensive to undo.

## Locations

Read `docs.glossary` and `docs.adr` from `.boldcreate/project.yml`. If the file or the keys are missing, use `GLOSSARY.md` and `docs/adr/` at the repository root.

## Set up

Run this part when either location does not exist yet.

1. Create the glossary file if absent:

   ```markdown
   # Glossary

   Terms used in this project, one line each. Code, specs and reviews use these words.

   | Term | Meaning |
   |---|---|
   ```

2. Create the decision record folder if absent, with no files in it other than records.

3. If `.boldcreate/project.yml` exists and lacks `docs.glossary` or `docs.adr`, add the missing keys with the paths you used.

Done when both locations exist and, where `project.yml` exists, it names them.

## Glossary

Update the glossary in the same session a term appears or changes.

1. **Add.** A term earns an entry when it names a domain concept that code, specs or conversation use, and its meaning is not obvious to a new team member. Write one line: the term, then what it is in plain words. Keep rows sorted alphabetically. Done when the row is added.
2. **Change.** When a meaning shifts, edit the existing row. Do not keep the old meaning. Done when the row matches current use.
3. **Merge.** When two words name one concept, keep one, delete the other row, and tell the user which word to use from now on. Done when only one row remains for the concept.
4. **Remove.** Delete a term that nothing uses any more. Done when the row is gone.

Each meaning stays under 25 words. Link to a decision record by ID when the term exists because of one.

## Decision records

A choice gets a record only when both hold:

- reversing it later would be costly;
- it affects more than one module or the public interface.

The stack and the data format or store always qualify. Others that usually do: framework, hosting, security model, a dependency other code builds on, or a deliberate trade-off against a stated requirement. A choice inside one module, or a choice not to do something yet (such as no CI for now), gets a line in the overview or spec instead.

1. **Number.** Find the highest number in the record folder and add one. The first record is `0001`. Done when the number is chosen.
2. **Write.** Create `<adr folder>/NNNN-<kebab-title>.md` using [adr-format.md](adr-format.md). Its ID is `ADR-NNNN`. Done when every section in the format is filled.
3. **Supersede.** When a new record replaces an old one, set the old record's status to `Superseded by ADR-NNNN` and the new record's context to name the old ID. Never delete or rewrite an accepted record's decision. Done when both records point at each other.
4. **Confirm.** Show the user the record's title and decision in two lines and ask them to accept it. Set the status to `Accepted` on confirmation, or `Proposed` if they want to decide later. Done when the status is set.

Write the record in the same session the choice is made.

## Rules

- Use glossary terms in every file you write, and correct drift you notice in files you touch.
- Keep both files plain and short. They are read by people and by agents on every task.
