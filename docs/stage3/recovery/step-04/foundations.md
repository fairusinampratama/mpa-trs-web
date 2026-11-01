# Proposed visual foundations — Step 4

Status: owner review pending. Specifications only; no CSS source change. All numeric colors and digital dimensions are proposals, not official emblem standards.

## Identity and personality

Serious, approachable university outdoor institution; documentary people, practice and accumulated work. Literal name and full UIN affiliation remain in the opening. Use the unchanged recovered emblem only as a private reference pending canonical-master confirmation. No tracing/recoloring, university-crest extraction or invented logo. Documented symbolic light green/blue/gold/black-white meanings inform context; they do not approve these hex values. The documented motto may appear in the footer without replacing the literal introduction.

## Typography

Source Sans 3: UI/body/navigation/metadata. Source Serif 4: institutional and section titles, publication titles and long-form editorial reading. They are designed as complementary families; their different roles distinguish clear interface tasks from institutional/documentary reading. Actual private specimens use Source Sans3 v3.052 and official Google Fonts Source Serif4 v4.004 static builds, matching the verified Latin web-font versions. Adobe’s current4.005 upstream was also checked but is not silently substituted into this proposal.

| Role | Desktop | 390 / 320 mobile | Weight / tracking | Use |
| --- | --- | --- | --- | --- |
| Display | 56 / 60.5 | 36 / 38.9; 32 / 34.6 | Serif 600; normal tracking | Single page title/identity, no arbitrary oversized slogan |
| Section | 40 / 46 | 30 / 35 | Serif 600; normal | Main editorial sections |
| Content title | 30 / 36 | 26 / 32 | Serif 600 | Programme, feature, work and history-preview title |
| Activity title | 24 / 31 | 23 / 29 | Sans 600 | Dated activity rows/cards |
| Intro/body | 20 / 29; general 19 / 28 | 17 / 25 | Sans 400 | Institutional explanation and previews |
| UI/action | 17 / 24 | 17 / 24 | Sans 600 | Buttons, links, filter options |
| Metadata | 16 / 23 | 16 / 23 | Sans 400 | Date/place/type; omit unknown optional fields |
| Label | 12 / 18 | 12 / 18 | Sans 600; optional 0.02em for short uppercase labels | No long all-caps Indonesian heading |
| Caption | 14 / 20 | 14 / 20 | Sans 400 | Context/credit distinct from body |
| Editorial reading | 20 / 31 | 18 / 28 | Serif 400 | 62–70ch measure; not every UI paragraph |

Heading words wrap normally; no forced ellipsis on institution, programme or activity titles. Title/description lengths remain content constraints, not hard clipping. Desktop line breaks in the identity are deliberate; mobile uses natural wrapping. Do not tighten body tracking or use light weights to disguise density. Fallback Sans: system-ui, sans-serif; Serif: Georgia, serif. Browser fallback metrics and 200% zoom need Step 5 checks.

### Font licence and availability

Official sources: [Source Sans](https://github.com/adobe-fonts/source-sans), [Sans OFL](https://github.com/adobe-fonts/source-sans/blob/release/LICENSE.md), [Source Serif](https://github.com/adobe-fonts/source-serif), [Serif OFL](https://github.com/adobe-fonts/source-serif/blob/release/LICENSE.md). OFL 1.1 permits use/embedding/redistribution subject to its conditions. Preserve copyright/licence files and Reserved Font Name conditions; do not manufacture renamed or subset derivatives without the required review.

Upstream WOFF2 full-font sizes checked: Sans regular 109,632 B, semibold 108,900 B, bold 108,640 B; Serif regular 76,260 B, semibold 80,732 B. All five total **484,164 B**, so do not load that entire set on the homepage. Use only 400/600 roles initially; 700 is unnecessary. Prefer unchanged official Latin web-font builds and self-host after version/licence/byte validation. Use `font-display: swap`; preload only the dominant above-fold family file if network evidence justifies it. Editorial regular can load on reading pages. A modern-browser request to the official Google Fonts CSS API returned two distinct unchanged upright Latin WOFF2 builds shared by the requested 400/600 weights: Source Sans 3 **28,872 B**, Source Serif 4 **50,936 B**, **79,808 B combined**. Font metadata/axes and downloaded hashes were checked privately. This satisfies the <=160KB font-file budget, not a rendered website performance result. Prefer self-hosting these official builds with notices; request 400/600 through normal weight properties. The selected official Serif web build has only a weight axis, no optical-size axis; do not invent an optical-size setting. Both variable weight ranges200–900 cover400/600. Any future switch to Adobe4.005 or an optical-size build needs specimen/wrapping review. Actual CSS/font integration and fallback layout checks remain deferred.

## Semantic color proposals

| Token | Value | Role |
| --- | --- | --- |
| page | `#F6F4EE` | Warm neutral reading canvas |
| surface | `#FFFFFF` | Controls/panels |
| surface-muted | `#EAEDE5` | Secondary grouping |
| ink | `#20352C` | Main text |
| muted | `#536358` | Secondary text/captions |
| primary | `#214A39` | Institutional controls/field band |
| primary-hover / active | `#173B2B` / `#102D21` | Interaction feedback |
| blue | `#244C67` | Editorial navigation/labels/info |
| gold | `#AB7D27` | Small graphic rule; not normal text |
| border | `#CCD3C8` | Decorative separation, not field identification |
| control-border | `#758575` | Input/secondary-control edge |
| focus / focus-inverse | `#244C67` / `#F6F4EE` | Light/dark context focus ring |
| inverse | `#F6F4EE` | Text on primary |
| disabled-bg / ink | `#E2E7DD` / `#536358` | Inactive state |
| success / background | `#276249` / `#E7F1E8` | Success with text/icon |
| warning / background | `#80551B` / `#FBF0D8` | Review/attention with label |
| error / background | `#A43432` / `#FBEAE7` | Error field/status |
| info / background | `#244C67` / `#E6EDF3` | Informational message |

Calculated combinations: ink/page 11.88:1; muted/page 5.80:1; white/primary 9.98:1; inverse/primary 9.08:1; blue/page 8.28:1; success pair 6.19:1; warning 5.74:1; error 5.79:1; info 7.71:1; control-border/white 3.91:1. These are sRGB relative-luminance calculations, not an accessibility certification. Gold/page 3.35:1 is not allowed for normal-size text. Decorative borders need not identify controls; actual fields use control-border. Disabled controls still retain readable text.

No text is placed directly on photography in the homepage. Any future photo label uses an opaque tested surface with its known ink pair; gradients/tinted overlays are not a contrast guarantee. Color never establishes media clearance or activity status alone.

## Layout, rhythm and responsive rules

- At 1366, container 1206px with 80px gutters. Use max 1206; gutters grow beyond it. 12-column concept, 24px gaps; identity/media columns are content-specific, not a generic split for every section.
- At 1024+, retain desktop header only if actual labels fit; otherwise collapse earlier. At 768–1023, use 24px gutters and stacked hero, two-column bounded patterns when their minimum widths hold. At <768, 16px gutters, one-column discovery/activities/publications. 390/320 specifically reviewed. Breakpoints describe composition needs, not framework defaults.
- Named spacing steps: 4, 8, 12, 16, 24, 32, 40, 56, 72, 88. Small steps separate label/title/metadata; 24 supports controls and media-caption blocks; 56/88 establish mobile/desktop section transitions. Do not introduce a competing scale.
- Buttons 46px; inputs 48px; navigation hit targets at least 44px. Panel inset 20–24px desktop/16–20px mobile. Filter fields stack; long labels wrap. Reading measure 62–70ch, full-width only for discovery/context grids.
- Photographs are flat with native ratios: collective 4:3, TE11 native ≈16:9, GH 9:16, RC 3:4. No universal cover crop. Native matched-height GH/RC education pair retains map and belay team. Caption lives below; loading reserves intrinsic dimensions.
- Approved section sequence stays fixed. Bound selections (three programme entries, one expedition, education overview, three activity rows, two work types, Jejak preview) instead of adding a section per new record. Current notices appear only after separate verification; no invented empty “latest” block.

## Shape, icons, elevation and motion

Controls/panels radius 2px; focus outline outer radius 4px. Media/section corners 0. Flat panels and rules, no default shadows. A future menu may need a restrained border/elevation only for occlusion, not floating-card decoration. Icons are simple 1.5–2px strokes, 20px at UI size, with labels; no ornamental peaks, invented compass/logo or divisi mascots.

Hover changes underline/border/fill; no layout shift or photographic zoom. Focus ring 3px with 2px surface gap; inverse ring on green. Color/border transition 120–160ms; reduced motion removes nonessential transitions. No parallax, autoplay, animated counters, heavy video or carousel dependence. Timing/icon examples are specifications, not implemented behavior.
