# Performance and compatibility
Low default: 0.7× render pixel ratio cap, no MSAA, shadows off. Medium: 1×, shadows off. High: up to 1.35×, shadows on. Ultra: up to 1.75×, shadows on. All preserve 120 Hz physics. No reflections, SSAO, motion blur, external textures/fonts or post-processing chain.

Static meshes are batched per material. Trees overlapping road arms are excluded. One synthesized engine oscillator. Telemetry buffer capped at 18,000 rows (30 minutes at 10 Hz). It currently uses arrays and shift, not a fully pooled circular buffer. Spline/camera/UI code still allocates temporary objects; optimization debt remains.

Local Chromium software-WebGL observations ranged from 97 draw calls / 36,674 triangles to 557 draw calls / 60,642 triangles across sampled camera states. The latter exceeds the master Low draw-call goal: opponent car instancing/LOD remains needed. These are scene samples, not hardware FPS benchmarks.

**Not verified on Intel HD 4400.** Three.js r170 requires WebGL2; no WebGL1 fallback yet. Old GPU/browser drivers may fail. Use a current browser with acceleration enabled and Low quality. There is no GPU-string benchmark auto detector, adaptive resolution, temperature sensing, 30-minute memory certification or full AI LOD. These remain acceptance gates before production claims.

Background tabs skip rendering and pause gameplay/audio. Low frame rate contributes at most 0.1 s per render frame to the fixed-step accumulator, bounding catch-up. This trades wall-clock timing fidelity for stability in extreme slowdowns; race timing is simulation time.

3.0.3 increases CPU work: six full physics states, local projections and 15 potential collision pairs. Corner lookahead is skipped for pairs farther than 35 m. Rain uses one pooled Points draw call (144 particles for six cars on Low, 360 otherwise), a generated soft sprite and one pointer-transparent 2D overlay (20/48 droplets). No external assets or textures are fetched. Hardware frame-time certification remains outstanding.
