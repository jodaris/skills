# Purposeful motion

Read when animation, transitions, gestures or scrolling change.

First identify what movement communicates: an action took effect, a surface entered, an item changed position or a relationship should remain clear. Keep repeated task interactions brief and interruptible. Duration and easing depend on distance and context; a small state change should not wait for a decorative sequence. Preserve useful pending/status text when animation stops.

## Choose the smallest suitable mechanism

| Mechanism | When to choose it |
| --- | --- |
| CSS transitions/keyframes | Simple hover, focus, disclosure and decorative feedback |
| Existing Motion installation | React enter/exit, layout continuity, gestures or spring-based state changes |
| GSAP | Explicit timeline choreography, complex SVG/canvas or scroll-linked storytelling that warrants it |
| Lenis | Deliberately requested smooth-scroll experiences with tested navigation, nested scroll and focus behavior |

Prefer an installed library before introducing another engine. Do not install all mechanisms as a design baseline. Motion/GSAP/Lenis are runtime libraries when used by shipped UI; CLI and test tooling are development dependencies. Verify package APIs and licensing before adopting an optional integration.

Prefer transform and opacity where appropriate, with intentional origins. Profile layout-affecting animation when it is necessary. Specify transitioned properties instead of animating every change. Clean up listeners, observers, animation loops and timelines on unmount; verify repeated mount/unmount and interrupted transitions.

Respect reduced-motion preferences in CSS and the chosen library. Remove nonessential parallax, zoom, large travel and looping decoration; keep state and content changes visible. Do not require a scroll animation to finish before content becomes available. Long-running automatic movement needs suitable pause/stop behavior. Preserve native scrolling, anchors, keyboard navigation and focus visibility; introduce scroll smoothing only for a concrete experience requirement.

For a large animated/3D treatment, establish a static or reduced-cost fallback, lazy-load optional code/assets and inspect mobile performance. A WebGL scene must not be the sole way to access essential content or actions.

Upstream API references: [Motion](https://github.com/motiondivision/motion), [GSAP](https://github.com/greensock/GSAP), [Lenis](https://github.com/darkroomengineering/lenis).
