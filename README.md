# APEX LINE · Web Edition 2.1.2

A standalone, playable open-wheel racing foundation built from the supplied v2.1 device-experience brief. Dark paddock UI, acid-lime accents, original procedural 3D assets, and no runtime CDN requests.

**Scope:** This is a simplified arcade/simcade prototype, not a complete implementation of the 63-section brief or the unavailable v2.0 simulator. No existing game source was supplied. See RELEASE-NOTES.md for gaps and testing boundaries.

## Run

Use a static web server (ES modules cannot reliably run from `file://`):

```sh
python3 -m http.server 8080
```

Open http://localhost:8080. No production build or npm install is required. A WebGL-capable browser is required; hardware acceleration is recommended.

## Publish on GitHub Pages

1. Extract the release ZIP.
2. Create a GitHub repository, then commit **the contents of the apex-line folder** at its root. Include `.github/workflows/pages.yml` (hidden folders may be hidden by your file manager).
3. Push to the `main` branch.
4. Open repository **Settings → Pages → Source → GitHub Actions**.
5. Wait for **Actions → Deploy APEX LINE** to succeed.
6. Open `https://YOUR-USERNAME.github.io/YOUR-REPOSITORY/`.

Alternatively, use Pages → Deploy from a branch → main → /(root); the runtime is plain static files. Relative paths support project repositories. This delivery has not been pushed to or deployed on a GitHub account.

## Drive

- WASD / arrows: steer, accelerate, brake
- E: hold ERS boost
- Space: hold active aero above 126 km/h
- C: cycle chase / cockpit / high chase
- B: hold look back
- Shift / Ctrl: gears in manual transmission
- Escape: pause
- R: return to track (invalidates lap)
- P: instant simplified service when stopped within 120 m after start line; adds 12 seconds to current lap
- M / H: toggle map / reduced HUD

Keyboard actions are remappable, with multiple bindings and conflict confirmation. Keybindings are additive up to three keys; reset restores defaults.

Select keyboard, gamepad, touch, or tilt + touch in Settings. Keyboard remains available as fallback. Standard gamepad mapping is documented in the Gamepad settings tab. Web browsers may not expose a connected pad until a button is pressed.

Touch editor: Settings → Touch / Tilt → Edit layout. Drag a visible button, or select one in the dropdown, resize it and adjust opacity. Save commits the layout, cancel restores the edit-start snapshot. Portrait and landscape layouts save separately per profile. Essential controls cannot be hidden.

Tilt needs real sensor events; API existence alone is not treated as proof of support. Enable on a supported HTTPS device, hold centered, then calibrate. Missing/stale motion data falls back to touch steering. Mobile fullscreen / motion / orientation support varies by platform.

## Sessions and content

- Two fictional circuits: Solstice Park and Cinder Coast (click circuit card to switch)
- Grand Prix, sprint, free practice, time attack
- Five simple path-following rivals in races, with three pace levels
- One AL-01 chassis, four liveries, aero balance, automatic/manual gears
- Clear/wet grip, basic ERS, fuel, tyre wear, damage and service
- Local clean-lap personal records; off-track laps are invalid
- Generated engine audio, minimap, classification, telemetry HUD

## Tests

```sh
npm ci
npm test
npx playwright install --with-deps chromium
# Run the static server on port 8080 in another terminal
npm run test:browser
```

Browser test uses software WebGL and a low-resolution viewport. It checks session startup, throttle, pause/input clearing, binding conflict handling, touch resizing/saving, focus-loss pause, mobile menu overflow, and runtime errors. Node tests cover deterministic physics, braking, laps, damage and layout validation.

## Runtime architecture

- `physics.js`: normalized input contract → fixed 120 Hz simplified vehicle model
- `app.js`: device/key/touch/gamepad/tilt input → normalization → input smoothing in physics; viewport/fullscreen handling; local storage; scene and game states
- `style.css`: responsive menus, race HUD, safe areas, touch editor
- `vendor/three.module.js`: locally vendored Three.js 0.170.0, MIT license included

Settings and records stay in browser local storage. No accounts, analytics, backend, or network services. Browser storage restrictions degrade to session-only operation.

All car/circuit geometry and branding are fictional original procedural content. No licensed team marks, real circuit scans, or third-party image/audio assets are included. Three.js is used under its bundled license.
