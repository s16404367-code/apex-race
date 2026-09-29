# APEX LINE — OPEN-WHEEL RACING SIMULATOR
## v2.1 ADVANCED INPUT + DEVICE EXPERIENCE UPGRADE

This document is an extension to the existing APEX LINE v2.0 master development prompt.

The v2.0 physics, vehicle, tyre, aero, ERS, damage, weather, AI, progression, graphics, telemetry, legal-asset and GitHub Pages requirements remain mandatory.

This upgrade adds a professional cross-device control and display system.

---

# 1. DEVICE-FIRST DESIGN

The game must recognise three primary device classes:

### DESKTOP / LAPTOP
Keyboard and mouse first.

### GAMEPAD / CONTROLLER
Analogue controls first.

### MOBILE / TABLET
Touch, tilt and virtual controls first.

The game must never assume that one control scheme fits every device.

At startup detect:

- Touch capability
- Pointer capability
- Keyboard capability
- Gamepad capability
- Orientation
- Screen dimensions
- Device pixel ratio
- Viewport size
- Fullscreen support
- Device orientation API availability
- Motion/gyroscope capability where exposed by the browser

Do not falsely claim a capability exists merely because the browser exposes an API. Perform a usable capability check.

---

# 2. RESPONSIVE GAME CANVAS

The 3D game must automatically fit:

- 16:9 monitors
- 16:10 laptops
- 4:3 tablets
- tall mobile phones
- landscape mobile
- portrait mobile menus

The render canvas must resize dynamically when:

- browser window changes
- device rotates
- fullscreen starts
- fullscreen ends
- browser UI changes viewport size

Never stretch the 3D image non-uniformly.

Use correct aspect-ratio handling.

The HUD must reposition itself according to safe areas.

---

# 3. FULLSCREEN MODE

Provide:

## FULLSCREEN

Button available in:

- Main Menu
- Settings
- Pause Menu
- In-race quick menu

Use the browser Fullscreen API where supported.

Fullscreen must be user initiated through a button/tap.

When entering fullscreen:

- resize renderer
- recalculate camera aspect
- recalculate HUD scaling
- preserve control layout
- hide unnecessary browser-space UI
- update safe-area handling

When leaving fullscreen:

- restore normal viewport
- restore HUD dimensions
- preserve all settings

Do not reload the game when entering or exiting fullscreen.

---

# 4. DISPLAY MODES

Provide:

### WINDOWED

Normal browser mode.

### FULLSCREEN

Game occupies available display area.

### IMMERSIVE

Fullscreen with maximum HUD reduction.

### CINEMATIC

Minimal HUD for screenshots/replays.

The actual game must remain playable in every mode except cinematic mode.

---

# 5. MOBILE ORIENTATION

Preferred racing orientation:

## LANDSCAPE

When the player enters a race in portrait orientation:

Display a compact message:

ROTATE DEVICE

[Phone rotation icon]

LANDSCAPE RECOMMENDED

Do not automatically block gameplay merely because orientation locking is unavailable.

If orientation locking is supported by the browser and permitted in the current context, allow the player to enable:

### AUTO LANDSCAPE

ON / OFF

Orientation handling must degrade gracefully when browser permissions or platform restrictions prevent locking.

---

# 6. MOBILE TOUCH CONTROL SYSTEM

The mobile racing interface must NOT be a fixed collection of buttons that the player cannot move.

Create a full:

## CONTROL EDITOR

The player can edit the touch layout before racing.

---

# 7. MOBILE DEFAULT LAYOUT

Default controls:

Left side:

STEER LEFT
STEER RIGHT

Right side:

THROTTLE
BRAKE

Additional floating buttons:

ACTIVE AERO

ERS

GEAR UP

GEAR DOWN

CAMERA

LOOK BACK

PAUSE

RESET

PIT

MAP

HUD

The player may hide any optional button.

---

# 8. FREELY MOVABLE MOBILE BUTTONS

Every touch control must be draggable.

Player can:

- press and hold
- drag
- reposition
- resize
- rotate where appropriate
- change transparency
- change icon size
- change spacing
- change behaviour

Controls cannot be dragged outside the usable safe area.

Allow snapping:

OFF

Grid

Edges

---

# 9. BUTTON SIZE

Each touch control must have a configurable size.

Example range:

50% → 200%

Allow:

Small

Medium

Large

Custom

Important:

The hitbox should be larger than the visible icon when necessary.

This is particularly important for throttle and brake.

---

# 10. BUTTON OPACITY

Allow:

10%

25%

50%

75%

100%

Default controls should be visible enough to use while not unnecessarily covering the track.

Provide:

### During race opacity

### While editing opacity

---

# 11. BUTTON VISUAL STYLE

Preset themes:

- Minimal
- Motorsport
- Outline
- Solid
- Transparent
- High contrast

The icon must remain readable against:

- bright track
- dark track
- rain
- night

Do not depend only on colour to communicate function.

---

# 12. MOBILE CONTROL PROFILES

Allow multiple profiles:

### Default

### Two-thumb

### Left-hand dominant

### Right-hand dominant

### Sim

### Custom 1

### Custom 2

Save each profile.

---

# 13. TOUCH STEERING OPTIONS

Provide three steering methods.

### OPTION A — TWO BUTTON

LEFT / RIGHT

### OPTION B — VIRTUAL STEERING WHEEL

Drag left/right to steer.

Configurable:

- wheel sensitivity
- return speed
- maximum steering
- centre deadzone

### OPTION C — STEERING SLIDER

Horizontal virtual steering slider.

Player drags the steering position.

Support centre return.

---

# 14. TILT STEERING

Add:

## TILT / GYROSCOPE STEERING

Use device motion/orientation sensors when available and permitted.

Settings:

Tilt steering:
ON / OFF

Sensitivity:

0–100

Deadzone:

0–50

Response curve:

Linear

Progressive

Aggressive

Invert:

ON / OFF

Centre calibration:

CALIBRATE

When calibration is pressed:

CENTER DEVICE

[Calibrate]

Store the calibrated neutral orientation.

---

# 15. TILT ASSIST

Do not make tilt steering unusably sensitive.

Use:

- filtering
- smoothing
- deadzone
- maximum steering angle
- speed-sensitive steering

At very high speed automatically reduce excessive steering command, according to the selected assistance level.

Do not cheat the actual physics.

This is an INPUT FILTER, not an alternative physics engine.

---

# 16. TILT FAILSAFE

If motion data disappears:

Show:

TILT SIGNAL LOST

Automatically fall back to the player's configured steering method.

Never leave the steering permanently stuck at the last sensor value.

---

# 17. HYBRID MOBILE INPUT

Allow:

Tilt + touch buttons

Examples:

Tilt:
Steering

Touch:
Throttle

Touch:
Brake

Touch:
ERS

Touch:
Active Aero

This should be a first-class control configuration.

---

# 18. TOUCH GESTURES

Optional configurable gestures:

Swipe:

Camera

Two-finger tap:

Pause

Long press:

ERS

However, gestures must not interfere with:

- steering
- braking
- throttle
- accidental browser scrolling

When racing, prevent the game page itself from scrolling where possible.

---

# 19. MOBILE SAFE AREAS

Support devices with:

- notches
- rounded corners
- camera cutouts
- browser gesture areas
- navigation bars

Touch controls must stay within a safe interactive zone.

Use CSS safe-area mechanisms where supported.

---

# 20. TOUCH INPUT PRIORITY

Critical controls must have priority:

1. Steering
2. Brake
3. Throttle
4. Active aero
5. ERS
6. Gear
7. Camera
8. Other controls

Do not let a menu overlay accidentally intercept the brake/throttle touch region.

---

# 21. DESKTOP KEYBOARD REMAPPING

The existing keyboard binding system must be expanded into a proper:

## CONTROL BINDING MANAGER

Display every action individually.

Example:

Throttle
[Arrow Up]

Brake
[Arrow Down]

Steer Left
[Arrow Left]

Steer Right
[Arrow Right]

ERS
[E]

Active Aero
[Space]

Upshift
[Shift]

Downshift
[Ctrl]

---

# 22. CUSTOM KEY ASSIGNMENT

Player selects an action:

## PRESS NEW KEY

Then presses any supported keyboard key.

Store the binding.

Do not require editing a configuration file manually.

---

# 23. KEY CONFLICT DETECTION

If the player assigns a key already being used:

Display:

KEY ALREADY ASSIGNED

Used by:
Active Aero

Options:

REPLACE

CANCEL

ALLOW DUPLICATE

Prevent accidental control conflicts.

---

# 24. MULTIPLE ACTION BINDINGS

Allow:

one action → multiple keys

Example:

Throttle:

Arrow Up
W

Brake:

Arrow Down
S

This lets the player retain multiple control schemes.

---

# 25. KEYBOARD PRESETS

Provide:

### Arrow Keys

### WASD

### Custom

### Left-handed

### Right-handed

### Simulation

All can be edited.

---

# 26. ANALOGUE-LIKE KEYBOARD INPUT

Keyboard input must not behave as an instant 0/1 switch.

For throttle, brake and steering implement:

- rise rate
- fall rate
- steering ramp
- steering return rate
- optional smoothing

This should make keyboard steering controllable without changing the underlying physics.

The physics must still receive an analogue-like normalized input value.

---

# 27. KEY REPEAT PROTECTION

Do not allow operating-system key-repeat behaviour to produce unintended race inputs.

Read key state continuously.

Example:

Holding throttle should produce:

0 → 0.2 → 0.5 → 1.0

rather than repeated artificial keypress events.

---

# 28. MOUSE SUPPORT

Desktop players may optionally use mouse for:

- menus
- camera
- garage
- setup
- telemetry

Optional mouse steering may exist as an experimental feature but must NOT replace keyboard/gamepad as the default racing control.

---

# 29. GAMEPAD CONTROL EDITOR

Expand the existing controller system.

Allow:

- axis assignment
- button assignment
- axis inversion
- deadzone
- saturation
- response curve
- vibration intensity

Provide live diagnostic display:

LEFT STICK
X: +0.24
Y: -0.03

RT:
82%

LT:
0%

---

# 30. COMBINED PEDALS

Support:

Separate throttle/brake axes

OR

Combined axis

Automatically detect when practical.

Allow manual override.

---

# 31. STEERING CALIBRATION

Create a complete calibration screen.

Steps:

1. Centre wheel/stick
2. Move fully left
3. Move fully right
4. Release
5. Confirm

Store:

centre

minimum

maximum

deadzone

saturation

invert

---

# 32. CONTROL TEST LAB

Before starting a race, player may open:

## INPUT TEST

Show every input live.

Throttle bar

Brake bar

Steering bar

ERS button

Active aero

Gear

Gamepad axes

Tilt angle

Touch buttons

This makes broken controller mappings immediately obvious.

---

# 33. UNIVERSAL INPUT ACTION LAYER

All platforms must feed into the same action layer.

Architecture:

Keyboard
↓
Gamepad
↓
Touch
↓
Tilt
↓
Input Normalizer
↓
Assist Layer
↓
Vehicle Physics

Do NOT create separate physics implementations for:

desktop

mobile

gamepad

tilt

The input changes.

The car physics remains the same.

---

# 34. PRIORITY WHEN MULTIPLE INPUT METHODS ARE ACTIVE

Allow:

Keyboard

Gamepad

Touch

Tilt

to coexist.

Example:

Tilt controls steering.

Gamepad controls throttle/brake.

Touch controls ERS.

Do not allow one unused device to overwrite active inputs.

Track the most recently active device where appropriate.

---

# 35. AUTOMATIC HUD ADAPTATION

The HUD must have profiles:

### Desktop

Wide telemetry layout.

### Laptop

Compact telemetry layout.

### Tablet

Simplified layout.

### Mobile

Large essential telemetry.

### Cockpit Minimal

Only essential information.

### Full Simulation

Maximum telemetry.

---

# 36. MOBILE HUD

Mobile default must prioritise:

Speed

Gear

RPM

Lap

Position

Tyres

ERS

Active aero

Fuel

Damage

Flag

Delta

Do not put 20 tiny unreadable data fields onto a phone.

---

# 37. MOBILE HUD CUSTOMISATION

Allow HUD elements to be:

- moved
- resized
- shown/hidden
- opacity-adjusted

Examples:

Move speed display to centre.

Move ERS to top-left.

Move tyre display to bottom-right.

Save layout independently from touch controls.

---

# 38. DESKTOP HUD CUSTOMISATION

Allow optional movement/resizing of:

- minimap
- telemetry
- timing tower
- lap delta
- tyre panel
- ERS
- weather
- damage
- speed/RPM panel

Use snap-to-grid.

---

# 39. RESET LAYOUT

Every editable control/HUD system must contain:

RESET TO DEFAULT

and:

RESTORE LAST SAVED

Do not permanently destroy the player's layout by accident.

---

# 40. EDIT MODE

When editing mobile controls:

Pause the 3D simulation.

Show:

EDIT CONTROLS

[Throttle]
[Brake]
[Steer]
[ERS]
[Aero]

Each element displays:

- drag handle
- resize handle
- visibility toggle

When finished:

SAVE LAYOUT

CANCEL

RESET

---

# 41. FULLSCREEN CONTROL EDITOR

Changing to fullscreen must not reset control positions.

The engine must store layouts in logical normalized coordinates rather than raw pixels.

For example:

x = 0.84
y = 0.76
width = 0.12
height = 0.12

This allows the same layout to adapt to different screen sizes.

---

# 42. RESPONSIVE NORMALIZED UI

Never store race-control positions exclusively in absolute pixels.

Store:

x percentage

y percentage

width percentage

height percentage

anchor

safe-area offset

This ensures the buttons continue to work when:

- phone rotates
- browser changes size
- fullscreen activates
- resolution changes

---

# 43. ORIENTATION-SPECIFIC LAYOUTS

Allow separate saved layouts for:

Landscape

Portrait

Example:

Mobile Landscape:
large race controls

Mobile Portrait:
menu/garage layout

When orientation changes, switch to the corresponding UI profile.

---

# 44. MOBILE PERFORMANCE MODE

When a mobile device is detected, automatically recommend:

Low graphics

reduced particles

reduced shadows

reduced AI physics detail at distance

reduced post-processing

lower resolution scale

The player may override this unless the device/browser becomes unstable.

---

# 45. BATTERY / THERMAL CONSIDERATION

Avoid unnecessarily running maximum rendering quality on mobile.

When possible:

- reduce render resolution
- limit particle effects
- reduce shadow work
- reduce distant physics
- pause expensive UI calculations
- stop audio processing for inactive sources

Do not destroy physics fidelity merely to reduce graphics cost.

---

# 46. PAUSE / BACKGROUND BEHAVIOUR

When the browser tab becomes hidden:

Pause race simulation unless the player explicitly chooses otherwise.

Mute or greatly reduce audio.

Stop expensive rendering work.

When returning:

Synchronise safely.

Never allow a hidden browser tab to cause the car to teleport 2 km forward because of a giant frame delta.

---

# 47. MOBILE BROWSER UI

The game must tolerate browser address-bar expansion/collapse.

Viewport changes should trigger:

renderer resize

camera resize

HUD reposition

touch layout reposition

safe-area recalculation

Never reload the page.

---

# 48. SCREENSHOT / REPLAY MODE

Fullscreen should also work for:

- replay
- telemetry
- garage
- photo mode
- car setup

Photo/replay modes can hide touch controls completely.

---

# 49. ACCESSIBILITY

Add:

- high contrast UI
- larger UI mode
- colour-independent indicators
- reduced camera shake
- reduced flashing
- simplified HUD
- larger touch controls
- subtitles/text spotter
- configurable vibration
- one-hand mobile layout
- left/right-handed presets

Do not rely solely on colour to communicate flags, damage or tyre states.

---

# 50. CONTROL PROFILE SAVE FORMAT

Store control configuration as structured JSON.

Example concept:

{
  "device": "mobile-landscape",
  "steering": "tilt",
  "tiltSensitivity": 0.72,
  "tiltDeadzone": 0.08,
  "throttle": {
    "type": "touch",
    "x": 0.88,
    "y": 0.74,
    "width": 0.16,
    "height": 0.22
  },
  "brake": {
    "type": "touch",
    "x": 0.70,
    "y": 0.74,
    "width": 0.14,
    "height": 0.22
  }
}

Use normalized values.

Validate imported configurations before applying them.

---

# 51. DEVICE SWITCHING

A player may begin playing on keyboard and later connect a gamepad.

Do not reset settings.

Detect the new device and display:

CONTROLLER DETECTED

USE CONTROLLER?

YES / NO

The player can switch instantly.

---

# 52. TOUCH + KEYBOARD DEBUGGING

The debug system must show:

active input device

raw input

normalised input

filtered input

final physics input

This is important for diagnosing steering and acceleration problems.

---

# 53. MOBILE TEST CHECKLIST

Test:

Android Chrome

Android Firefox where practical

iPhone/iPad Safari where practical

Small phone

Large phone

Tablet

Landscape

Portrait

Fullscreen

Windowed

Touch-only

Tilt-only

Touch + tilt

Controller-connected mobile

Browser UI expanded

Browser UI collapsed

---

# 54. DESKTOP TEST CHECKLIST

Test:

Keyboard only

WASD

Arrow keys

Custom bindings

Gamepad

Mouse

1080p

768p

Ultrawide

Fullscreen

Windowed

Browser zoom

Different aspect ratios

Key conflict detection

Lost focus

Alt-tab / tab switching

Controller disconnect/reconnect

---

# 55. FULLSCREEN AND INPUT FAILURE SAFETY

If fullscreen fails:

Do not crash.

Show:

FULLSCREEN UNAVAILABLE

Continue in normal browser mode.

If motion permission fails:

Show:

MOTION CONTROL UNAVAILABLE

Allow touch steering.

If Gamepad API fails:

Continue keyboard/touch.

If a custom layout becomes corrupted:

Load default layout.

The simulator must always have a usable fallback.

---

# 56. MAIN MENU DEVICE SETUP

On first launch, provide:

## HOW DO YOU WANT TO DRIVE?

Keyboard

Gamepad

Touch

Tilt + Touch

Touch Steering Wheel

Player can change this later.

Do not force mobile players through a desktop control configuration.

---

# 57. RACE-START DEVICE CHECK

Before entering the track, display a small control confirmation:

CONTROL METHOD
Keyboard

or

GAMEPAD

or

TOUCH

or

TILT + TOUCH

Allow:

CHANGE CONTROLS

before lights out.

---

# 58. MOBILE GAMEPLAY LAYOUT PRINCIPLE

The actual driving screen should remain visually clear.

Do not cover:

- apexes
- braking markers
- racing line
- car
- minimap

with giant unnecessary controls.

Touch controls should be:

large enough to hit

transparent enough to see through

separated enough to avoid accidental presses.

---

# 59. PROFESSIONAL EXPERIENCE REQUIREMENT

The game should feel like:

MENU → SETTINGS → CONTROL CALIBRATION → GARAGE → GRID → RACE

rather than:

HTML page → canvas → random buttons

Every interface should look like one coherent simulator.

---

# 60. FINAL V2.1 REQUIREMENT

The player must be able to play APEX LINE comfortably through:

### PC

Keyboard with fully remappable keys

### PC

Gamepad/controller

### Mobile

Touch controls

### Mobile

Freely movable/resizable touch controls

### Mobile

Tilt steering

### Mobile

Tilt + touch hybrid

### Tablet

Touch/gamepad

### All devices

Fullscreen

### All devices

Responsive HUD

### All devices

Saved control profiles

The player's control preference must never require editing source code.

The game must adapt to the screen.

The controls must adapt to the player.

The physics must remain common across devices.

---

# 61. NON-NEGOTIABLE ARCHITECTURE

Use:

Device Detection
↓
Input Device Manager
↓
Input Binding Manager
↓
Input Normalizer
↓
Assist Layer
↓
Vehicle Physics

Separately:

Viewport Manager
↓
Responsive Layout Manager
↓
HUD Layout
↓
Touch Layout Manager

And:

Fullscreen Manager
↓
Viewport update
↓
Renderer resize
↓
Camera resize
↓
HUD recalculation
↓
Control-layout recalculation

Do not duplicate these systems separately for each screen size.

---

# 62. UPDATED PLAYER EXPERIENCE

Desktop:

Open GitHub Pages
↓
Fullscreen
↓
Choose keyboard/gamepad
↓
Configure keys
↓
Choose car
↓
Choose circuit
↓
Setup
↓
Grid
↓
Race

Mobile:

Open GitHub Pages
↓
Landscape recommendation
↓
Choose touch / tilt
↓
Control editor
↓
Move buttons freely
↓
Resize buttons
↓
Calibrate tilt
↓
Save mobile layout
↓
Fullscreen
↓
Choose car
↓
Choose circuit
↓
Setup
↓
Grid
↓
Race

---

# 63. ENGINEERING TEST

Before declaring the cross-device system complete, verify:

- Every default control works.
- Every remappable keyboard action works.
- Conflicts are detected.
- Gamepad axes calibrate.
- Touch buttons can be moved.
- Touch buttons can be resized.
- Touch positions survive rotation.
- Tilt calibration works when available.
- Tilt failure has a fallback.
- Fullscreen does not distort the camera.
- Fullscreen does not reset controls.
- Browser resize does not break controls.
- HUD remains readable.
- Lost focus cannot create runaway throttle/steering.
- Mobile scrolling does not interfere with racing.
- Physics remain identical regardless of input device.

The input system is complete only when the same car can be driven correctly by different devices without changing the underlying vehicle simulation.