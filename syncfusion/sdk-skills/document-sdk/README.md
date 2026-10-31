# Syncfusion Document SDK

Skills for creating, editing and converting PDF, Word, Excel and PowerPoint files with the Syncfusion Document SDK in .NET, JavaScript, Flutter and Java.

Each skill is a folder with a `SKILL.md` file and usually a `references/` folder. Your agent loads a skill when your request matches its description.

## Installation

- **BoldCreate Connect:** open **Marketplace**, find **Syncfusion Document SDK**, and click **Install**.
- **Cursor:** add this repository as a team marketplace, then install **Syncfusion Document SDK**.
- **Claude Code:** `/plugin marketplace add syncfusion/BoldCreate-Plugins`, then `/plugin install syncfusion-document-sdk@boldcreate-plugins`.

The skills need no license key to install. Building an app with Syncfusion packages still needs a Syncfusion license key ([free community license](https://www.syncfusion.com/products/communitylicense)).

## Skills (16)

| Skill |
|:------|
| `syncfusion-dotnet-calculate` |
| `syncfusion-dotnet-document-chunking` |
| `syncfusion-dotnet-excel` |
| `syncfusion-dotnet-markdown` |
| `syncfusion-dotnet-pdf` |
| `syncfusion-dotnet-pdf-to-image` |
| `syncfusion-dotnet-powerpoint` |
| `syncfusion-dotnet-smart-data-extraction` |
| `syncfusion-dotnet-word` |
| `syncfusion-flutter-excel` |
| `syncfusion-flutter-pdf` |
| `syncfusion-java-word` |
| `syncfusion-javascript-excel` |
| `syncfusion-javascript-pdf` |
| `syncfusion-javascript-powerpoint` |
| `syncfusion-javascript-word` |

## Source

From [syncfusion/document-sdk-skills](https://github.com/syncfusion/document-sdk-skills) at commit `c46c067`. Changes from the source: the `syncfusion-javascript-word` skill was named `syncfusion-javascript-docx`, which did not match its folder, so it now uses the folder name; `syncfusion-dotnet-document-chunking`: removed a byte-order mark before the frontmatter so the skill loads. Platform index: <https://ai.syncfusion.com/document-sdk/llms.txt>.

## License

MIT
