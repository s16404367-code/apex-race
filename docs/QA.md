# QA results — 3.0.0

## Automated, passed in this workspace
- Identical inputs produce identical physics state.
- Standstill acceleration to plausible bounded speed, no lateral drift.
- Symmetric left/right front-steer yaw and trajectories.
- ERS gives >1 m/s advantage in comparative deployment test (observed ~6.03 m/s), depletes battery; empty battery gives no boost.
- Aero outside zone rejected, inside zone opens; braking closes.
- v² downforce scaling; open flap lowers drag and rear load.
- Combined tyre force bounded by available friction.
- Braking stable; wet slick braking slower than dry.
- Fuel mass reduces acceleration; out-of-fuel engine cuts.
- Real-time service duration, thermal-state integration, layout validation.
- Conservative automated driver completes all five outlines. Max centerline offsets: Monza 6.95 m, Imola 1.60 m, Bahrain 4.55 m, Jeddah 0.58 m, Silverstone 1.45 m. Nominal road half-width 9 m. This test does not certify human handling or AI racecraft.
- Chromium: countdown, acceleration, pause, input clearing, keyboard conflict, touch resize/save, blur pause, 390×844 no horizontal menu overflow.
- All five 3D circuits load without page errors.
- Browser rig's rear AND front flaps visibly change physical rotation values in-zone; ERS power active; brake closure.
- Original car GLB successfully generated.
- `/project/index.html` relative-path boot via local request routing, no failed requests.

## Manual inspection performed
Desktop menu and race screenshots reviewed. Original AL-02 silhouette and circuit minimap visible. Test environment uses software WebGL; screenshots do not establish target GPU performance.

## NOT verified / acceptance gates
Actual GitHub-hosted URL (no account deployment performed); HD 4400; real multi-finger phone/tablet play; gamepad calibration on hardware; iOS/Android sensor permissions; fullscreen/orientation locks and notches; 30-minute memory/thermal session; gamepad menu navigation; long race AI avoidance; all corner cases of track limits/pit servicing; accessibility audit. Real circuit elevation/width/layout-year validation not done.

No blanket 'all versions complete' status is justified. See REQUIREMENTS.md.
