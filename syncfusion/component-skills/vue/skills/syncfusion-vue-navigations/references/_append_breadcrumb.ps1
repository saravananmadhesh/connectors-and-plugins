$files = @(
    "d:\EJ2\July\20\vue-ui-components-skills\skills\syncfusion-vue-navigations\references\breadcrumb-accessibility.md",
    "d:\EJ2\July\20\vue-ui-components-skills\skills\syncfusion-vue-navigations\references\breadcrumb-navigation-and-routing.md",
    "d:\EJ2\July\20\vue-ui-components-skills\skills\syncfusion-vue-navigations\references\breadcrumb-icon-integration-data-binding.md",
    "d:\EJ2\July\20\vue-ui-components-skills\skills\syncfusion-vue-navigations\references\breadcrumb-getting-started.md"
)

$section = @"

## Component Registration

For the official Syncfusion Vue UG registration pattern, use Options API with `` `export default` ``:

**Local Import:**
````typescript
import { BreadcrumbComponent } from "@syncfusion/ej2-vue-navigations";

export default {
  name: "App",
  components: {
    'ejs-breadcrumb': BreadcrumbComponent
  }
}
````

**Global Registration (main.ts):**
````typescript
import { createApp } from 'vue'
import { BreadcrumbComponent } from '@syncfusion/ej2-vue-navigations'

const app = createApp(App)
app.component('ejs-breadcrumb', BreadcrumbComponent)
app.mount('#app')
````
"@

foreach ($file in $files) {
    $content = Get-Content $file -Raw -Encoding UTF8
    if ($content -notmatch '## Component Registration') {
        # Find the closing ```` and insert before it
        $lastBackticks = $content.LastIndexOf("````")
        if ($lastBackticks -gt 0) {
            $before = $content.Substring(0, $lastBackticks)
            $after = $content.Substring($lastBackticks)
            $newContent = $before + $section + "`n" + $after
            Set-Content -Path $file -Value $newContent -Encoding UTF8 -NoNewline
            Write-Host "Updated: $file"
        } else {
            Write-Host "No closing backticks found: $file"
        }
    } else {
        Write-Host "Already has section: $file"
    }
}
Write-Host "Done."
