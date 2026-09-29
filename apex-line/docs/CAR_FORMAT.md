# Car data and model
`js/physics/models.js` exports CAR constants and COMPOUNDS. `physics.js` creates session and four-wheel states. Units and tunables are described in PHYSICS.md.

The original AL-02 visual model is created in `js/vehicle/model.js`. Named runtime references live in root.userData: body, wheels, steerPivots, frontFlaps, rearFlap, frontWing, rearWing, steering and discs. Animation consumes physical steering angle, wheel spin, measured acceleration, thermal brake state, damage and continuous flap state.

`assets/models/al02-original.glb` is a reusable neutral-pose export of original geometry/materials. Runtime uses the source rig rather than loading the GLB. GLB includes no baked animations. Generate again with `npm run test:upgrade` while the local server runs.

Physics and visual dimensions are approximate, not CAD-matched homologation measurements. No separate convex collision GLB yet. One chassis only; livery colours remain selectable.

3.0.1 replaces the torus halo with an open U-shaped tube, a front chassis post and two rear chassis attachments. Front pivot steering signs match the physical frame.
