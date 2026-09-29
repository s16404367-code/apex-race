# Update in your browser — no unzipping

This patch upgrades the delivered **APEX LINE 3.0.1** source to **3.0.2**. It is not for older releases or unrelated/customized files. Your repository must contain the game files at its root (index.html, app.js, physics.js, js/, etc.). No GitHub credentials should be shared with the assistant.

## One-time setup
1. Open your GitHub repository. Select **Code → Codespaces → Create codespace on main**. If your default branch has another name, use that branch and check your Pages workflow's branch setting.
2. Wait for the browser editor. Select **Terminal → New Terminal** if the terminal is not visible.
3. Codespaces has usage quotas and may require billing if your allowance is exhausted. Stop the Codespace when finished. This workflow does not require installing software on your computer.

## Apply this update
1. Download **APEX-LINE-3.0.1-to-3.0.2.patch** from the chat. Do not unzip it. Do not upload it to your public Pages site through GitHub's Add file button.
2. Drag the patch into the **Codespaces Explorer** (the left file list), at the repository root.
3. In its terminal, check your branch and existing work:

```sh
git status
```

Commit or otherwise preserve any existing edits first. The patch file itself may appear as untracked; that is expected.

4. Check the update **without changing anything**:

```sh
git apply --check APEX-LINE-3.0.1-to-3.0.2.patch
```

No output means the check passed. If an error appears, STOP and copy the error for help. Do not force it or use `--reject`: the old version, file layout or local modifications may differ.

5. Apply and inspect:

```sh
git apply APEX-LINE-3.0.1-to-3.0.2.patch
git diff --stat
```

6. Optional but recommended: run the dependency-free physics and lap checks:

```sh
npm test
```

7. Remove only the uploaded patch, then commit and publish:

```sh
rm APEX-LINE-3.0.1-to-3.0.2.patch
git add .
git commit -m "Upgrade APEX LINE to 3.0.2"
git push
```

You can instead use the Source Control panel to review, stage, commit and sync. Check that you are not including unrelated files.

8. Open your repository's **Actions** tab and wait for **Deploy APEX LINE** to finish. Pages must use GitHub Actions as configured, or an existing main/root branch deployment. Refresh the game and verify **WEB EDITION 3.0.2** in the menu; if needed use a hard refresh.

## If it does not work
- The `--check` step never changes game files. Send its full error rather than trying random commands.
- This exact patch was tested against the previously delivered 3.0.1. If your repository still runs 3.0.0 or contains custom changes, use the full ZIP fallback or request a patch for your actual version.
- Before committing, a successfully applied patch can be reversed with `git apply -R APEX-LINE-3.0.1-to-3.0.2.patch` while you still have that file and have made no later edits. Check first with `git apply -R --check ...`.
- After committing, revert the upgrade commit through Git rather than deleting your repository.
- If the game is in a subfolder, navigate to it and ask for tailored instructions; the supplied Pages workflow expects root files.

## Full ZIP fallback
Download **APEX-LINE-3.0.2-Race-Assist-Update.zip**. Extract it and replace your repository's game files with the contents of the `apex-line` folder, including `.github` and `.nojekyll`. Preserve any unrelated files. This is the same release as the patch.

The assistant has prepared and tested the update locally, not authenticated to or modified your GitHub account. Codespaces is browser-only, but a few terminal commands are still necessary; GitHub's ordinary file-upload page cannot apply a patch by itself.
