# 3.0.2 — Race Assist Update

Read README.md for controls and docs/UPDATE-INSTRUCTIONS.md for the browser-only patch workflow. A full ZIP is also supplied.

- Space/touch/gamepad aero is a toggle. ON means armed: zones, speed, weather, damage and braking still determine opening. Brake closes aero but leaves it armed; pause/reset disarms.
- Pause shows only two bars, retaining tooltip/accessibility name.
- V toggles predictive corner braking (default ON). G switches Auto/Manual without leaving the race or changing the current gear. Both are remappable. Reverse remains available in both modes. Optional touch controls can be enabled in the editor.
- Curvature and backward braking envelopes cover the entire track, including the start-line seam. Wet/tyre/damage factors lower recommended speeds. Driver must steer and can disable assistance. Targets are conservative and not proven best-lap solutions.
- Leader/interval timing alternates every three simulation seconds; shared 25 m crossings are interpolated rather than estimating distance divided by current speed. Missing data shows —. Lap deficits take priority.
- Brake recovery rises with pedal demand up to 110 kW; coast recovery requests 12–30 kW depending on engine-braking setting. Actual stored power is bounded by delivered rear tyre force, speed, 70% conversion efficiency and battery capacity. No charging at rest or full throttle. Rear regen replaces friction brake torque. Engine-braking tuning shares the coast drag budget to avoid double-counting.

Testing details and limitations: docs/QA.md. Not deployed to a GitHub account; patch application and local subpath hosting tested. Hardware certification, career, detailed suspension and other master milestones remain incomplete.
