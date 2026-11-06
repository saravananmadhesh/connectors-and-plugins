# CI for a new project

CI runs the same commands as the `verify` skill, so a green local run and a green CI run mean the same thing.

## Where the file goes

| Git host | File |
|---|---|
| github | `.github/workflows/ci.yml` |
| gitlab | `.gitlab-ci.yml` |
| other | Ask the user for the CI system and file path; skip CI if they have none, and say so in the scaffold report. |

## What the pipeline must do

Run on every push to the default branch and on every pull or merge request.

| Job | What it runs |
|---|---|
| build | `commands.build` from `.boldcreate/project.yml` |
| test | `commands.test` |
| lint | `commands.lint` and `commands.typecheck`, each when present |
| dependency scan | The stack's own audit command for known vulnerable dependencies, when the package manager has one. On GitLab, the `Jobs/Dependency-Scanning.gitlab-ci.yml` template can replace it where the plan includes it. |
| secret scan | A maintained open-source secret scanner over the full history on the default branch and over the changed commits on requests. On GitLab, include the `Jobs/Secret-Detection.gitlab-ci.yml` template. |

Leave out a job whose command is missing from `project.yml` and tell the user which one.

## How to write it

- Install the toolchain with the official setup step for the stack, pinned to the version in the decision records. Turn on its dependency cache.
- Copy commands from `project.yml` exactly. Do not add flags that the local run does not use.
- Pin every third-party action or image to a released version.
- On GitHub, give the workflow read-only access: `permissions: contents: read`.
- Reference secrets only through the host's secret store. The file holds no credentials, tokens or internal hostnames.
- Keep one job per row above, so a failure names its cause.

On GitHub, also tell the user that secret scanning and push protection are repository settings they can turn on; a file cannot enable them.

## Check

Done when:

- the file parses as YAML, using the host's linter where one is installed (`glab ci lint` on GitLab)
- every command in the file appears in `project.yml`
- the file contains no secret values
