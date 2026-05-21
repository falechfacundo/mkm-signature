# Animation Plan A (Option 1)

## Objective
Implement premium, conversion-focused motion only in Timeline and Deliverables.
Keep Hero unchanged to protect load speed and early comprehension.

## Scope
- Timeline: high-intensity motion storytelling.
- Deliverables: high-intensity interaction with controlled hover depth.
- Hero: no additional motion work.

## Plan
1. Timeline wild upgrade
- Keep sticky scroll section.
- Draw connective progress line while scrolling.
- Add active step aura and stronger depth transitions.
- Add ambient background motion only when reduced motion is not requested.

2. Deliverables wild upgrade
- Keep stagger reveal for readability.
- Add per-card 3D tilt on pointer move.
- Add dynamic spotlight following pointer.
- Add featured-card aura pulse for visual hierarchy.

3. Performance and accessibility guards
- Respect reduced motion preferences.
- Disable hover-heavy effects on touch devices.
- Preserve readable timings and avoid blocking interactions.

4. Validation
- Run production build.
- Verify no Hero regressions.
- Verify mobile behavior is stable and responsive.

## Future Plan B (Option 2)
- Upgrade Timeline to chapter-style step transitions (one dominant step at a time).
- Add per-step background morphing states.
- Keep Deliverables in Plan A mode to avoid competing focal points.
