# APEX LINE — Racecraft & Rain Update 3.0.3

A static browser open-wheel racer, upgraded from the initial 2.1.2 foundation using the supplied v2.0 and v2.1 specifications. This is a substantial **development release**, not a claim that every requested version/milestone is complete.

## 3.0.3 racecraft and rain
- AI now uses the same stepCar four-wheel physics, braking envelope, weather/condition factors, setup and assist setting as the player. Difficulty changes throttle aggression only, not corner grip limits. AI drives automatic forward gears and does not deploy ERS/active aero; it no longer has a separate spline-speed controller.
- With V brake assist ON, player and AI both receive corner and traffic braking. Turning it OFF disables player assistance; AI still needs its driving controller. Drivers still control their own steering.
- Corner-entry priority uses the foremost front-wing tip projected along the local track direction, with a 0.25 m tie tolerance. Pairwise decisions freeze through the corner. Existing side-by-side overlap reserves lanes; leading cars otherwise aim at the centreline and followers yield.
- Following target: roughly 5.2 m clear space (one car length), with added wet safety distance. Alongside cars use a slower shared envelope and separate lane targets. This is a basic racecraft planner, not collision-proof AI or a fastest racing-line solver.
- Contacts apply equal-and-opposite directional impulses to BOTH cars instead of overwriting the player's speed. Rear hits can push the front car forward; side impacts can push sideways. No automatic race penalty for the leader when a follower yields; physical damage and normal player off-track lap invalidation remain.
- Wet mode adds subtle screen droplets, a darker low-roughness road and soft tyre-spray particles. Low uses 20 droplets/24 particles per car; other presets use 48/60. No dynamic puddles, drying line or true reflections.
- Full ZIP delivery: extract and upload the contents of apex-line as usual. See docs/UPDATE-INSTRUCTIONS.md.

## Previous 3.0.2 race systems
- Toggle active aero with Space / touch / gamepad, with automatic zone/brake gating; pause/reset clears both aero and ERS toggles.
- Icon-only pause button (accessible name and tooltip retained).
- Optional corner braking, ON by default. V toggles it; G switches Auto/Manual transmission during a race. Both keys are remappable. New optional touch buttons are available in the layout editor.
- Full-circuit curvature/braking envelopes; slower targets in wet conditions and with wear/damage. The assistant brakes even against held throttle. You still steer. It is NOT an optimal racing-line solver or a guarantee against crashes.
- Timing tower alternates leader/preceding-car gaps every three simulation seconds, using interpolated 25 m timing gates. No shared timing yet displays —; lapped competitors show +N LAP.
- Up to 110 kW braking recovery, modest 12–30 kW coasting recovery, adjustable engine braking, visible regeneration rate. No free charging under power or while stopped.
- Five full-circuit CSV target tables in docs/speed-profiles; regenerate with npm run export:profiles.
- The former patch workflow is superseded by full ZIP delivery for 3.0.3.

## Previous 3.0.1 corrections
- Corrected wheel/render/input steering signs, with wheel/body/world-direction regression checks.
- Deliberate reverse selection, R dashboard indicator, same four-tyre integrator and approximately 29 km/h reverse speed ceiling. Also available with manual forward gears.
- ERS toggle across keyboard, touch and gamepad; pause/reset turns it off. The toggle arms the selected strategy; Off/Harvest never deploy.
- Recognizable two-bar PAUSE button; compact right-hand instruments below the minimap.
- Whole-circuit scenery-footprint filtering, including parallel track arms, barriers, trees, stands, signs and start supports.
- Three-point chassis-mounted halo with a front post and two rear attachments; updated GLB.
- Original UI theme and livery colours retained. Saved touch layouts are preserved; reset/re-edit a saved layout if its old ERS position overlaps the new dashboard.

## Previous dynamics upgrades

- Replaced track-relative sideways motion with a planar rigid body: front steering, four tyre force budgets, yaw inertia and independent world position.
- Torque-curve drivetrain, eight gears, shift cut, engine braking, fuel mass and consumption.
- 180 kW ERS with a finite 4 MJ battery, braking/coasting harvest and strategy modes.
- Zone-controlled aero, marked on track and map, disabled by braking/wet conditions; animated front and rear flaps.
- New original AL-02 model: tapered nose/body, sidepods, exposed suspension, rotating wheels, front-wheel steering, halo, mirrors, brake-disc heat glow. Exported GLB included.
- Map-derived circuit outlines for Monza, Imola, Bahrain, Jeddah and Silverstone, with original public names and scenery.
- Five tyre compounds, individual temperatures/wear/load, combined grip, brake temperature/fade, ABS/TC modes and basic impact damage.
- Setup for fuel, tyre compound/pressure, brake bias, ride height and aero.
- Real-time 12-second service stop (rivals continue), sectors, 10 Hz telemetry chart/CSV, validated save import/export.
- Retained UI, livery colours, keyboard remapping, gamepad inputs, touch editor and tilt fallback.

Read **docs/REQUIREMENTS.md** before treating this as a full simulator. The physical model is simplified and has not been validated against real car telemetry.

## GitHub Pages

1. Extract the ZIP and upload the **contents of `apex-line`** to your repository root. Include hidden `.github` and `.nojekyll` files.
2. Push to `main`.
3. Settings → Pages → Source → **GitHub Actions**.
4. Wait for the Deploy APEX LINE workflow, then visit `https://USERNAME.github.io/REPOSITORY/`.

Alternatively publish `main` / root using branch-based Pages. All runtime imports are relative and all assets are local. No npm build, backend, paid API, login, CDN or network service is required for gameplay. No service worker/offline installer is included.

**This ZIP has not been deployed to a GitHub account.** Local project-subpath boot has been tested.

## Local play

```sh
python3 -m http.server 8080
```
Open http://localhost:8080. `file://` is unsuitable for native ES module loading. Python is only a local file-server convenience, not a gameplay dependency. A modern WebGL2 browser is needed (Three.js r170). Low is the default; HD 4400 hardware compatibility/performance is not certified.

## Controls

| Action | Default |
|---|---|
| Accelerate / brake | W/S or ↑/↓ |
| Front-wheel steer | A/D or ←/→ |
| ERS | Tap E to toggle ON/OFF |
| Reverse | Stop → release S/↓ → press S/↓ again; W/↑ brakes reverse motion, then drives forward |
| Active aero | Tap Space ON/OFF; opens only in permitted zones |
| Camera | C: chase / cockpit / high chase / nose |
| Look back | Hold B |
| Auto / Manual transmission | G (during race) |
| Automatic corner braking | V (default ON) |
| Manual up/downshift | Shift / Ctrl |
| Pause | Escape |
| Reset to track | R; invalidates current lap |
| Service | P while stopped within 120 m after start line |
| Map / reduced HUD | M / H |
| Telemetry | T (pauses session) |

Aero requires >79 km/h, substantial throttle, no braking, small steering angle, dry conditions and intact rear wing. Zones are **game-defined**, not current official DRS rules. No detection-gap rule yet.

Start with **Assisted**, automatic gears, medium tyres and dry conditions. Brake **before** sharp corners; throttle and steering share a grip budget. ERS is most useful on a straight. Select inter/wet tyres before a wet session in Race Engineering.

Settings → Driving selects Assisted / Simulation / Hardcore. Assisted and Simulation have TC/ABS; Simulation enables damage. Hardcore disables TC/ABS. They share the same integrator.

Settings → Touch/Tilt → Edit Layout: drag, resize, adjust opacity and optional visibility. Separate portrait/landscape profiles save locally. Keyboard and touch remain fallback methods. Sensor/gamepad/fullscreen APIs depend on browser and actual hardware.

## Circuit content

| Public name | Map reference |
|---|---|
| Parco Reale | Monza |
| Santerno Valley | Imola |
| Dune International | Bahrain |
| Red Sea Corniche | Jeddah |
| Royal Airfield | Silverstone |

Coordinates are from Tomislav Bacinger's MIT-licensed circuit dataset. We do not substitute invented outlines, but smoothing and flat terrain mean these are **not surveyed replicas**. Width, kerbs, barriers, buildings and zones are approximate/original. Source accuracy, layout currency, elevation and official rules are not guaranteed. See LICENSES.md.

## Testing

```sh
npm ci
npm test
npx playwright install --with-deps chromium
# Start the static server on 8080 in a separate terminal.
npm run test:browser
npm run test:upgrade
npm run test:subpath
```

Physics tests and conservative driver full-lap tests run without WebGL. Browser tests use Chromium software WebGL. `test:upgrade` also regenerates the original GLB. Local-only testing hooks are gated to localhost/127.0.0.1.

## Files

- `physics.js`, `js/physics/models.js`: dynamics, tyre/aero/engine constants
- `js/vehicle/model.js`: original procedural model and animation
- `app.js`: scene, input, sessions, projection, telemetry and UI integration
- `data/tracks/*.json`, `data/tracks.js`: sourced geometry and game zone metadata
- `assets/models/al02-original.glb`: portable neutral-pose model; runtime uses procedural animated rig
- `docs/`: physics, formats, performance, QA and requirements audit
- `docs/specifications/`: supplied master and input upgrade briefs
- `.github/workflows/pages.yml`: static deployment

Original game. Not affiliated with any official championship, team, driver, circuit operator or automotive manufacturer. No commercial racing-game meshes or official liveries are included.

Additional correction suite: `npm run test:corrections` (local server required for browser portion).
