# Install 3.0.3 using the complete ZIP

1. Download APEX-LINE-3.0.3-Racecraft-Rain-Update.zip and extract it.
2. Upload the **contents inside apex-line**, not the outer folder, to the game repository root. Replace the previous game files and include .github and .nojekyll.
3. Include the new **js/traffic.js** and **js/weather.js** modules. Upload the full js folder, not only app.js.
4. Commit the changes. If using the included workflow, keep GitHub Pages source set to GitHub Actions and wait for Deploy APEX LINE to complete. Branch-based main/root Pages also works.
5. Refresh your game (hard refresh if necessary) and check **WEB EDITION 3.0.3** in the menu.

No npm build is necessary for deployment. Do not upload node_modules, test outputs or unrelated files. The previous 3.0.1-to-3.0.2 patch does NOT install this version; use this ZIP.

Existing local colour, control and setup saves are retained. V controls your brake assist and G switches transmission. Wet visual effects appear when the session weather is Wet. AI uses the current session setup/tyre compound; select suitable tyres before starting.

The assistant tested the package and local project-subpath hosting, but has not logged into or deployed to your GitHub account.
