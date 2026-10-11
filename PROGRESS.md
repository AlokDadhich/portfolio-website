# Portfolio Build Log

A running record of what's been built, why, and what's left. Kept in the repo
so the history survives even if chat context doesn't.

## Positioning

Site is built around one identity: **mechanical engineer who builds
computational tools for physical, real-world engineering systems** —
not a generic "full-stack developer" or "aerospace engineer" framing.
Leads with the ISRO/CADFlow/software-tools work, keeps the mechanical
CAD/CFD/fabrication work as the credibility layer underneath it.

Two resumes exist for job applications (not on the site): a
Computational Engineering/Software Tools resume (primary) and a
Mechanical Design/Manufacturing resume (secondary). The website itself
stays one coherent identity rather than forking into personas.

## Site structure

Five pages, React Router (`react-router-dom` v7), each fleshed out into
5-6 sections rather than a single block:

- **Home (`/`)** — Hero, stats strip, ISRO teaser (with globe), flagship
  projects teaser, tech marquee, CTA strip.
- **About (`/about`)** — bio + tech grid + profile panel (with globe),
  Education, Leadership & Extracurricular.
- **Experience (`/experience`)** — globe centerpiece, timeline (ISRO,
  JSW, independent projects), Publications (linked to real papers),
  Achievements & Hackathons, resume link.
- **Work (`/work`)** — intro, featured projects, other projects,
  Technical Skills by category, GitHub CTA.
- **Contact (`/contact`)** — intro, globe, form, socials, quick-info
  strip.

## Content — verified against source material

Every specific technical claim (numbers, methods, hardware) was
cross-checked against the actual research papers, not just written
from memory. Papers live in `public/papers/*.pdf` (deploys
automatically as static assets) and are linked from both the
Publications list (Experience) and each matching project's "Read
Paper" link (Work):

| Project | Paper | Verified claims |
|---|---|---|
| EOT Crane Antenna Positioning | `eot-crane.pdf` | First-author (Alok Dadhich, SAC-ISRO). Conceptual/software only — no hardware built yet, explicitly stated in the paper. Encoder-based sensing, RS-485/MEMOBUS (Yaskawa S1000), LoRa monitoring path kept separate from the wired control path, browser-based scan-planning prototype. |
| Antenna Cut Analysis Suite | `antenna-cuts.pdf` | Co-author. MATLAB tool, bilinear interpolation from a single CATR raster scan, validated against GRASP `.asc` reference cuts with peak/error/beamwidth stats. |
| Solar Still w/ Internal Condenser | `solar-still.pdf` | 34% energy efficiency, 25% net yield increase (condenser+PCM combined), 0.3 LPM optimum condenser flow rate — exact figures from the paper. |
| Biomimetic Plate Heat Exchanger | `heat-exchanger.pdf` | Leaf-structured design: +39.7% heat transfer coefficient, -14.16% pressure drop vs. flat baseline. |
| Tesla Turbine | `tesla-turbine.pdf` | CFD (SimScale) at 1200 rad/s (11460 RPM) and 600 rad/s (5730 RPM), modeled in Fusion 360, 3D-printed (Creality Ender 3, PLA), tested with compressed air. |
| Miniature CNC | `cnc.pdf` | Arduino Uno, GRBL, Inkscape → JScut → UGS pipeline, 3D-printed frame. |
| Non-Electric Solar Tracker | `solar-tracker.pdf` | R134a differential-heating tracker, >20% power increase vs. fixed panel. |
| MedBuzz | `medbuzz.pdf` | ESP8266/NodeMCU, NTP-synced alarms, browser config UI. |
| CADFlow | — (no paper) | Logitech DevStudio 2026 semifinalist, from resume only. |
| Lunar Boulder/Crater Detection | — (no paper) | ISRO hackathon, YOLOv8, from resume only. |

**Not yet added:** `Complete_User_Guide.docx` (Satellite Coverage
Analyzer) was in the same source folder as the other papers, which is
decent evidence it's Alok's own tool — but there's no matching project
card on the site yet, and authorship was never explicitly confirmed.
Flagged, not actioned.

## Visual design

- **Theme:** dark navy/blue "space/blueprint" aesthetic, monospace
  section numbering (`01.`, `02.`...), kept intact throughout every
  redesign pass.
- **Custom illustrations** (`src/components/visuals/ProjectVisual.tsx`)
  — hand-drawn SVG line-art per project (antenna polar plot, crane
  rail, CAD cube, solar still cross-section, leaf-vein heat exchanger,
  Tesla disc turbine, CNC gantry, solar tracker, pill tray, lunar
  craters) instead of stock photography, which had nothing to do with
  the actual projects.
- **ProfilePanel** (`visuals/ProfilePanel.tsx`) — replaces a fake stock
  photo in About with a designed status-card (no photo pretending to
  be Alok), now also hosts a small globe instead of a plain "AD"
  monogram.
- **Globe** (`Globe.tsx`) — cobe-based rotating WebGL globe (~5KB, no
  Three.js), marking Ahmedabad (SAC/ISRO) and Pune (VIT). Appears on
  Home, About, Experience, and Contact.
- **InteractiveGrid** (`InteractiveGrid.tsx`) — dotted circuit-grid
  background that tilts/glows toward the cursor (Cubes/Glue-dots
  style). Promoted from a Hero-only element to a global `fixed`
  backdrop (`GridBackdrop.tsx`) behind every page.
- **Cursor** (`Cursor.tsx`) — custom dot+ring cursor with an ambient
  glow, replaces the browser's default pointer on desktop.
- **Magnetic** (`Magnetic.tsx`) — buttons/links/icons pull toward the
  cursor on hover.
- **SpotlightCard** (`SpotlightCard.tsx`) — cursor-following glow +
  optional 3D tilt, used across tech-grid items, project cards, and
  info panels.
- **Reveal** (`Reveal.tsx`) — scroll-triggered fade/slide-in, built on
  a plain `IntersectionObserver` (not motion's `whileInView` — see
  Known Issues below).
- **Text is justified** (`text-align: justify`) on every body
  paragraph site-wide, per explicit request.

## Page transitions

A three-part "hyperdrive" sequence, entirely custom-built:

1. **Zoom out** — real page content (text) and the real background
   grid scale up and fade out together (~400ms), via a phase-based
   CSS transition in `App.tsx` (not a animation library).
2. **Hyperdrive** — `HyperdriveOverlay.tsx`, a canvas + `requestAnimationFrame`
   3D-perspective starfield (stars in x/y/z space, projected via focal-length
   divide, drawn as comet-trail line segments), matching a genuine
   hyperspace-jump reference rather than a simple CSS-streak burst.
   Speed follows a sine envelope (0 → peak → 0) for a smooth
   accelerate/decelerate, ~1.5s total.
3. **Zoom in** — new page content and the grid ease back down from
   the zoomed-out state, in sync with the overlay clearing.

Also plays on first page load (nothing to zoom out *from*, so it's
zoom-in only), so arriving at the site feels the same as navigating
within it.

## Known issues fixed this session (and why)

Several real bugs were found and fixed across sessions, all subtle
React-lifecycle or third-party-API-mismatch issues rather than
fundamental design problems (despite a lot of detours suspecting
otherwise):

1. **Every navigation after the first did nothing** (URL changed,
   content stayed on the old page). Root cause: `AnimatedRoutes` had
   one `useEffect` handling both "first mount" and "navigation," and
   the mount branch's cleanup unconditionally reset a `hasMounted`
   ref. React runs an effect's cleanup on *every* dependency change,
   not just true unmount — so that reset also fired on every real
   navigation, making each one after the first incorrectly re-take the
   mount branch (which never updates displayed content). Fixed by
   splitting into two independent effects: a mount-only one with an
   empty `[]` dependency array, and a separate one keyed on
   `location.pathname` for navigation.
2. **`Reveal` occasionally never fired**, leaving sections invisible.
   Rebuilt on a plain `IntersectionObserver` instead of motion's
   `whileInView`, matching the reliable pattern the rest of the
   codebase already used before Reveal existed.
3. **Glow cursor trail showed "dots"/beading along its length**, worst
   when moving the mouse fast. Two causes, fixed in order: first,
   `mix-blend-mode: screen` on the trail canvas was brightening whatever
   sat underneath, so background stars along the trail's path lit up as
   hot spots — removed. Second (the real remaining cause): the trail
   was drawn as many independent per-segment `stroke()` calls, each with
   its own round line-cap and its own `shadowBlur` — wherever the
   tapering width made two adjacent segments different widths, the
   wider one's cap poked past its neighbor, and the stacked independent
   shadows brightened every joint into a visible bead. Fixed by drawing
   the whole trail as a single continuous path per pass instead (one
   soft-glow pass, one bright-core pass using a canvas gradient for the
   head→tail color/fade), so there are no internal joints left to bead.
4. **The globe (`Globe.tsx`) rendered as a completely blank circle on
   every page** (About, Experience, Contact, Home) — found and fixed
   2026-09-12. Two stacked bugs: (a) the installed `cobe` version is
   2.0.1, whose real API has no `onRender` callback at all (that's a
   3.x-only API) — so the auto-rotation logic passed to
   `createGlobe({ onRender: ... })` was silently ignored the entire
   time, meaning the globe never actually spun via its own loop; (b)
   React 18 StrictMode's dev-only double-mount (mount → cleanup →
   mount, synchronous) called `createGlobe()` twice on the same
   `<canvas>` element, and since a canvas only ever hands out one real
   WebGL context, the second call hit that same context in a bad state
   and threw `WebGL: INVALID_OPERATION: drawArrays: no buffer is bound
   to enabled attribute` on every draw, leaving the canvas permanently
   cleared/blank. Fixed by (a) driving rotation manually via our own
   `requestAnimationFrame` loop calling `globe.update({ phi })` each
   frame (matching cobe 2.x's real API), and (b) deferring the actual
   `createGlobe()` call into a `setTimeout(fn, 0)` so StrictMode's
   synchronous phantom first mount clears the pending timeout in its
   cleanup before it ever fires — `createGlobe` now only ever really
   runs once per genuine mount, so the shared-WebGL-context conflict
   never happens. Verified via real screenshots showing the globe
   rendered with a visible continent dot-pattern and markers, and
   confirmed actual rotation by comparing two screenshots taken seconds
   apart (coastline position visibly shifted); console clean of the
   WebGL error afterward.
5. A large detour chasing "hangs" in `useAnimation().start()`,
   `AnimatePresence mode="wait"`, and `whileInView` turned out to be
   this specific test/dev environment's Browser pane reporting
   `document.hidden: true` permanently (a known headless-browser
   characteristic), which throttles `requestAnimationFrame`-driven
   animations unpredictably. Real screenshots proved content was
   rendering fine even when `javascript_exec`-based DOM polling said
   otherwise. Worth remembering if similar "stuck" symptoms show up
   again during automated testing — verify with a real screenshot
   before assuming the code is broken.

## Dependencies added

`react-router-dom` (v7, multi-page routing), `motion` (v13, the
current Framer Motion — used for `Reveal`'s `animate` prop, spotlight
cards, magnetic hover; deliberately *not* used for `useAnimation` or
`AnimatePresence`, see above), `cobe` (globe rendering).

## Globe removed site-wide (2026-09-12) — to revisit

Alok's call after seeing it fixed: it was on four pages (Home, About,
Experience, Contact) and even working correctly, the WebGL/cobe cost
was making the site feel slow. Removed the `<Globe />` usage from all
four call sites (`Hero.tsx`, `Experience.tsx`, `Contact.tsx`,
`visuals/ProfilePanel.tsx`) — the component itself (`Globe.tsx`) and
the now-fixed rotation/StrictMode logic are left in place, just
unused, so the working version isn't lost. Since nothing imports it
anymore, Vite tree-shakes `cobe` out of the bundle entirely (~15KB
smaller build). Layout was adjusted at each removal site so no page
has a leftover empty gap where the globe used to sit (Home's ISRO
teaser dropped from a 2-column grid to a single centered column;
Experience and Contact just lost the globe block cleanly; About's
ProfilePanel status card now breathes with more space between the
header row and the stats grid instead of showing an empty slot).

**Plan, per Alok:** performance-optimize the globe, then bring it back
on exactly one page (not re-add to all four) — decide which page
tomorrow. Candidate angle for the optimization pass: lower
`mapSamples` (currently 16000, likely the biggest single cost),
smaller canvas/devicePixelRatio, or only mounting it once it's
actually scrolled into view rather than on page mount.

## "Site is a bit buggy" investigation (2026-09-12, overnight) — no reproducible bug found

Alok said the site felt buggy without specifics and asked me to fix it
overnight. Ran a full sweep rather than guess blindly:

- **Console**: clean on a genuinely fresh load (cache-cleared dev
  server restart) — no errors, no warnings beyond two pre-existing
  harmless ESLint hints (`Hero.tsx`'s `texts` array dependency,
  `HyperdriveOverlay.tsx`'s now-unused eslint-disable comment).
- **Nav/routing**: works correctly. Testing initially made this *look*
  broken — a simulated click through this tool's automation didn't
  always register with React's event system (confirmed by testing
  `.click()` directly against the same DOM node, which navigated
  fine) — but that's this test harness's click simulation, not a real
  browser issue; a real mouse click is a fully trusted native event.
- **All 9 paper links + resume**: verified 200 OK via curl against the
  dev server.
- **Build/typecheck/lint**: all clean (`tsc --noEmit`, `vite build`,
  `eslint .` — 0 errors).
- **Contact form**: `handleSubmit` logic is sound (mailto link
  generation, no backend/API calls to fail).
- A few screenshots during testing looked genuinely alarming — content
  confined to a narrow strip with a stray vertical line, or a page
  covered by dense white streaks. Both traced to test-environment
  artifacts, not site bugs: the narrow-strip one came from this tool's
  `resize_window` emulation not fully propagating to real CSS
  breakpoint matching (confirmed the actual DOM was properly full-width
  via `getBoundingClientRect`); the streak-covered one was the
  `HyperdriveOverlay` transition caught mid-animation — this
  environment throttles `requestAnimationFrame` unpredictably
  (documented earlier in this file), so a transition that's a crisp
  1.5s in a real browser can appear "stuck" for several seconds here.
  Confirmed the overlay's opacity does correctly settle back to 0 once
  given time.

**Honest conclusion:** I could not find or reproduce an actual bug
beyond what's already fixed (glow-cursor dots, the globe). My best
guess for what Alok is perceiving as "buggy," given he'd already
flagged the globe as making the site "slow" the same night, is
general jank from effect density (star field + interactive grid +
glow cursor + hyperdrive all running simultaneously) rather than a
discrete broken thing — which is exactly the concern he raised
earlier ("does it feel intentional or just busy") and already the
subject of tomorrow's planned review. Didn't make speculative
performance changes tonight since nothing concrete was confirmed
broken and guessing risks introducing a real regression chasing a
phantom one. **Ask Alok for specifics when he's up** — ideally a
screenshot/recording or which page/action triggers it — since that's
the fastest path to an actual fix versus more blind sweeping.

## Globe back — one page only, 3D scroll scene, plus a new project (2026-09-12)

Per Alok's follow-up:

- **Globe re-added to exactly one page: Experience** (not Home/About/
  Contact — his call from last night was "add globe only to one
  page," and Experience is the most direct fit since the globe's
  Ahmedabad/Pune markers are literally the ISRO/VIT locations the page
  is about). `Globe.tsx` was optimized before going back in, given the
  stated reason for removing it was site-wide slowness: `mapSamples`
  cut from 16000 to 6000, `devicePixelRatio` capped at 1.5 instead of
  a flat 2, and — the bigger win — it now only initializes cobe and
  runs its rAF loop once an `IntersectionObserver` confirms the canvas
  is actually in (or near) the viewport, and pauses the loop again
  when scrolled away. A hidden/off-screen globe now costs nothing.
- **New component: `GlobeScrollScene.tsx`** — wraps the globe in a
  scroll-driven 3D scene using `animejs` v4 (new dependency,
  `onScroll` with `sync: true`, real scroll-scrubbed playback, not a
  one-shot reveal-on-enter animation). Three small figures — Satellite
  Link, Ground Antenna, Coverage Lock (lucide icons in blueprint-style
  badges, tied to the actual antenna/coverage work, not decoration for
  its own sake) — sit in a static ring around the globe and drift in
  from behind it in depth (`translateZ`, opacity, scale) as the
  section scrolls through view, while the whole group gets a gentle
  `rotateX`/`rotateY` tilt synced to scroll position. Static ring
  placement and scroll-driven depth are deliberately split across two
  nested elements so animejs's transform state never fights the CSS
  used to position each figure around the globe. Verified via direct
  DOM/style inspection at multiple scroll positions (inline
  `transform`/`opacity` values changing correctly with `window.scrollY`),
  since this Browser pane was intermittently not compositing real
  paints during this test pass — same category of tooling limitation
  documented earlier in this file, not a site issue.
- **New project added — Satellite Antenna Coverage Prediction Tool.**
  This is the confidential ISRO project (see the mind-map memory) —
  added to Projects.tsx's "other projects" list with a deliberately
  high-level description, no `paperUrl`, no `liveUrl`, and a new
  purpose-built SVG visual (`coverage-map` variant in
  `ProjectVisual.tsx` — concentric coverage rings + a ground-track
  arc, abstract enough to reveal nothing about the real tool's UI).
  Home's "Engineering Projects" stat bumped from 10+ to 11+ to match.

## Globe scroll animation fix attempt (2026-09-12, late night, before 8:30am deadline)

Alok said the 3D scroll animation "is not working" and to remove the
globe entirely tomorrow if it's still not fixed. Investigated and
found a real, measurable cause — not a guess:

- **Root cause:** the scroll-synced animation (`GlobeScrollScene.tsx`)
  maps its 0→1 progress to how far the section has scrolled through
  the viewport. The section's original height was just its natural
  content height (~300-450px) — far shorter than a full screen — so
  the *entire* tilt+depth animation completed within roughly 400px of
  scrolling. Measured directly: at scrollY 400px the animation was
  already ~53% done. That's well under half a second of normal scroll
  speed — the animation was genuinely running, just so fast it read as
  "nothing happening."
- **Fix:** the section is now `min-h-[140vh]` (about 1.4 screens tall)
  with the globe+figures+caption centered inside it as one block, so
  there's real scroll distance for the tilt and per-figure depth/fade
  to play out across — long enough to actually be felt while
  scrolling, not just a blip. Moved the "Ahmedabad — Pune" caption
  inside `GlobeScrollScene.tsx` itself (was previously a separate
  paragraph in `Experience.tsx` held next to the old short block with
  a negative-margin hack, which would've broken against the new
  height).
- **Re-confirmed the `animejs` API usage is correct** against the
  official docs directly (not from memory) — the `enter: 'bottom top',
  leave: 'top bottom', sync: true` threshold shorthand is animejs's
  own documented example for exactly this "track while scrolling
  through" use case: in the two-word form the first word is the
  *container* edge, the second is the *target* edge.
- **Honest limitation on tonight's verification:** I could not get a
  live, moving confirmation of the fix in this Browser-pane tool
  tonight, and traced why: `animejs`'s engine ships with
  `pauseOnDocumentHidden: true` by default (confirmed directly in
  `node_modules/animejs/dist/modules/engine/engine.js`) — it
  deliberately halts its whole update loop whenever
  `document.hidden` is true. This automation session reports
  `document.hidden: true` while unattended (the same well-documented
  characteristic of this tool noted earlier in this file for
  `requestAnimationFrame`-driven effects) — so anime.js is correctly,
  intentionally freezing itself here, the same way a real browser tab
  pauses animations in a backgrounded tab. It has nothing to do with
  Alok's real, focused browser tab, where `document.hidden` is false
  and the engine runs normally. I confirmed the mechanism does respond
  to scroll (measured real, changing values) *before* this session's
  tab went into that background state, and confirmed the fix's logic
  and API usage are sound by direct code review and against animejs's
  own docs — but I want to be upfront that tonight's fix is backed by
  diagnosis + a standard, correct technique, not a final green-light
  screenshot.
- **If it's still not right when Alok checks:** ask him exactly what
  "not working" looks like now — frozen/no visible change at all vs.
  present but too subtle/fast vs. something visually broken (wrong
  position, jump-cut, etc.) — since those point to different next
  fixes (the pauseOnDocumentHidden default itself, ironically, could
  also matter for a real visitor who opens the site in a background
  tab and scrolls it via a screen reader or automation — but not for
  Alok's own normal use). Don't guess again blind; get the specific
  symptom first.

## Globe scroll animation — real fix, not just a taller section (2026-09-12, still same night)

Alok tested the height fix and reported "nope its not moving while i
scroll" — a real, concrete failure, so the previous "just make the
window longer" diagnosis wasn't the whole story. Found the actual
mechanism problem this time:

- **The animation was built on anime.js's `ScrollObserver`
  (`onScroll`, `sync: true`)**, which relies on anime's own internal
  engine tick loop to recompute progress on every scroll event.
- **Rewrote it to not depend on that loop at all.** `GlobeScrollScene.tsx`
  now uses a plain `window.addEventListener('scroll', ...)` /
  `resize` listener that computes 0→1 progress directly from
  `section.getBoundingClientRect()` and the viewport height, then
  calls `.seek(progress * duration)` on animations created with
  `autoplay: false`. `seek()` renders synchronously and immediately —
  it doesn't depend on anime's engine ticking at all, which
  `ScrollObserver`'s sync mode does.
- **First rewrite attempt still used `requestAnimationFrame` to
  throttle the scroll handler** — dropped that too, after directly
  proving in this dev environment that a scheduled `rAF` callback can
  simply never fire (confirmed empirically: scheduled one, waited
  500ms, it never ran) while `scroll`/`resize` events themselves still
  fire normally. `scroll` events are cheap enough to handle
  synchronously; there's no real need to throttle through `rAF` here,
  and doing so added a dependency that can silently stop the whole
  animation with no error, no warning — exactly the failure mode
  Alok hit. The render function is now called directly from the
  event listener, nothing scheduled.
- **Verified this time with actual proof, not just code review:**
  isolated-tested `.seek()` on a throwaway element (confirmed smooth,
  correct linear interpolation at 0/0.25/0.5/0.75/1 progress), then
  drove the real, mounted component's listeners directly (via forced
  `resize` events, since this specific test tool cannot make a
  backgrounded tab actually scroll) and confirmed the on-screen
  `rotateX`/`rotateY` values change smoothly and monotonically in
  response — the full pipeline (event → geometry read → progress calc
  → `seek()` → DOM) is confirmed working end to end, not just assumed.
- Typecheck/build/lint all clean.

**If this still doesn't move for Alok:** the render pipeline itself is
now proven correct, so the next most likely cause would be something
environmental on his end (an actual console error, or the `scroll`
event target being wrong for some reason) rather than the anime.js
wiring — ask him to open DevTools console and report any red error
first, rather than guessing at the animation logic a third time.

## Art-direction pass, phase 1: Hero (2026-09-13)

Alok asked for a full art-direction pass across all 5 pages — cinematic,
spatial, Aether1-inspired storytelling instead of stacked generic
sections — but explicitly to preserve the existing star field, cursor,
grid backdrop, and page-transition system rather than replace them, and
to avoid turning it into a "sci-fi dashboard" (no HUD panels, glowing
boxes, neon). Given the scope (5 pages, real creative risk), started
with the Hero specifically since he called it out as deserving special
attention, and stopped there to check the direction before carrying it
across the rest of the site.

**What changed in `Hero.tsx`'s opening section:**
- Name ("Alok Dadhich.") now enters via a masked rise-up reveal
  (`MaskReveal`, a small local `overflow-hidden` + `motion.div`
  wrapper) instead of a plain fade — text being *revealed* rather than
  *appearing*. New — respects `prefers-reduced-motion` by skipping
  straight to the resting position.
- Scaled way up: `text-5xl` → `text-8xl` at desktop, asymmetric layout
  (content anchored lower-left, not centered) instead of a single
  centered block.
- Added a quiet, unboxed "coordinates" column on the right (desktop
  only) — `// based in`, `// discipline`, `// status` — reusing the
  site's existing code-comment label convention (already used
  elsewhere as `// isro_sac.log` etc.), not a new sci-fi HUD idiom.
  Plain text, no borders, no backgrounds — information placed in the
  space rather than boxed.
- Replaced the bordered "Check out my work!" button with an underline
  text-link + arrow (still wrapped in the existing `Magnetic`
  component) — one fewer "generic dev portfolio" button.
- Replaced the bouncing-arrow scroll cue with a thin vertical line that
  draws itself downward on a loop (new `scrollLine` keyframe in
  `index.css`) — quieter, reads as "continue" rather than a UI widget.
- Stats strip (section 2, right below the fold) de-boxed: was 4
  bordered `SpotlightCard`s in a grid, now a plain hairline-divided
  readout (`divide-x divide-slate-800`) — numbers given room instead
  of being caged.
- Fixed a real regression this introduced: the existing fixed
  left/right social-icon columns (`HeroSideLinks.tsx`, untouched)
  collided with the new wider asymmetric content at `lg:px-8` — bumped
  the hero's own side padding to `lg:px-24 xl:px-28` to clear them.
  Confirmed no more overlap at desktop width.
- Verified on mobile (375px) — coordinates column and side icons both
  correctly hidden (`hidden lg:flex`), content stacks cleanly. One
  scary-looking blank screenshot during testing was this Browser
  pane's known stale-screenshot quirk, not a real bug — confirmed via
  direct DOM/computed-style inspection (real text, real color, real
  opacity, real position) before re-screenshotting to confirm.
- Sections 3–6 of Home (ISRO teaser, flagship-projects teaser, tech
  marquee, closing CTA) were **not** touched this pass — flagged to
  Alok that these currently duplicate content that will get its own
  treatment on Experience/Work, and the right call once those pages
  are redone may be to trim or fold these rather than keep them as
  separate teaser sections, to avoid the site reading as "the same
  content stacked twice."
- Typecheck, build, and lint all clean throughout.

**No new dependencies added** — `MaskReveal` is built on the `motion`
package already in use (via `Reveal.tsx`'s pattern), nothing new
pulled in. `animejs` and `cobe` remain installed but unused
(Globe/GlobeScrollScene are still in the tree, just not imported
anywhere) since Alok cut the globe from every page.

**Not yet done — the rest of the 5-page pass:** About, Experience,
Work, Contact all still need their own visual language per the brief
(trajectories/timelines for Experience, projects-as-missions for Work,
etc.) — deliberately paused after Hero to get a read on whether this
direction is right before investing the same effort across 4 more
pages blind.

## Art-direction pass, phase 1b: scroll parallax + Home project rows (2026-09-13)

Alok's reaction to phase 1 was fair: "cards and all looks exactly the
same" (true — sections 3-6 of Home were untouched on purpose) and "no
scroll effect in the background that's the whole point" (a real gap —
nothing about the environment moved as you scrolled).

- **New: `StarfieldParallax.tsx`.** Adds scroll-linked depth to the
  *existing* star field (doesn't replace it) — each of the three
  `.stars-*` layers now drifts at its own rate as the page scrolls
  (small/far = 0.02, medium = 0.05, big/near = 0.09), on top of their
  existing auto-drift + twinkle animation. Wired through a
  `--parallax-y` CSS variable that `index.css`'s `animStar` keyframe
  now reads (`translateY(var(--parallax-y, 0px))` at both ends of the
  keyframe), so the existing infinite-loop animation is untouched,
  just offset. Respects `prefers-reduced-motion`. Verified directly:
  scrolling to y=300/600 correctly set `--parallax-y` to -6px/-12px on
  `.stars-small`, and the computed `transform` on the element reflected
  both the parallax offset and the ongoing keyframe position combined.
- **Home's flagship-project teaser (section 4) rebuilt** from a
  3-column bordered card grid into a stacked, numbered list —
  `01/02/03`, small blueprint thumbnail, large title, arrow — divided
  by hairlines like the stats strip, not boxed. Found and fixed a real
  layout bug while building this: `SpotlightCard` wraps its children in
  its own inner `<div>`, so flex classes passed to `SpotlightCard`'s
  own `className` never reached the actual content — the row was
  silently stacking instead of laying out horizontally. Fixed by
  putting the flex row on a wrapper *inside* `SpotlightCard`'s children
  instead. Worth remembering for any future `SpotlightCard` usage.
- Typecheck/build/lint clean throughout.

## Open items / possible next steps

- Satellite Coverage Analyzer — confirm authorship with Alok, then
  decide whether it gets a project card + paper link.
- Research/paper links for CADFlow and the lunar CV project don't
  exist (no papers), intentionally left without a "Read Paper" link.
- Two-resume PDFs (computational vs. mechanical) haven't been
  generated/finalized yet — currently only the single existing
  `resume.pdf` is linked from the site.
