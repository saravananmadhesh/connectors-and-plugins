# Detecting commands

Find each command in a file the repository already has. A command the project defines for itself always wins over a tool default.

## Where to look, in order

1. **Task runner files.** A `Makefile`, `justfile`, `Taskfile`, or a scripts folder with clearly named entry points. Targets named `build`, `test`, `lint`, `check`, `typecheck` or `run` map directly.
2. **Project scripts in the build manifest.** Many manifests define named scripts, for example the `scripts` block in `package.json` or the tasks in a `pyproject.toml`. Use the name the project defines, run through the tool the lock file shows (see below).
3. **The build tool's standard commands.** When a manifest exists but defines no scripts, use the build tool's own verbs for that manifest:

   | Manifest | Build tool family |
   |---|---|
   | `package.json` | JavaScript package manager |
   | `*.csproj`, `*.sln`, `*.fsproj` | .NET CLI |
   | `pom.xml` | Maven |
   | `build.gradle`, `build.gradle.kts` | Gradle (prefer the wrapper script when present) |
   | `go.mod` | Go toolchain |
   | `Cargo.toml` | Cargo |
   | `pyproject.toml`, `setup.cfg`, `requirements*.txt` | Python tooling named in the file |
   | `Gemfile`, `composer.json`, `mix.exs`, `CMakeLists.txt` and similar | The tool that owns that file |

4. **CI workflow files.** The steps in the repository's CI configuration show the commands the team actually runs. Use them to confirm or fill gaps.
5. **The README or contributing guide.** Use commands written there when nothing above defines them.

## Choosing the tool

- Pick the package manager or wrapper from the lock file or wrapper script in the repository. Do not assume a default.
- When a repository has several projects, use the command at the root that covers all of them if one exists. Otherwise ask the user which project the kit should work on.

## Mapping to keys

| Key | What it must do |
|---|---|
| `build` | Compile or bundle the project. |
| `typecheck` | Check types without producing output. Leave out for languages where `build` already does this. |
| `lint` | Run the linter or static checks the project configures. |
| `test` | Run the automated test suite, non-interactive, exiting non-zero on failure. |
| `run` | Start the application locally. |

A command in watch mode or one that waits for input does not fit `build`, `lint` or `test`. Use the single-run form if the project defines one; otherwise mark the key not found.
