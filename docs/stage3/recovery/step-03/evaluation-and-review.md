# Expert evaluation and owner review — Step 3

14 October 2026 · proposed composition only · no participant study

## Qualitative comparison

| Criterion | Alternative A — institutional discovery | Alternative B — identity through practice |
| --- | --- | --- |
| First-impression clarity | Literal organization name/purpose; collective image emphasizes the institution | Same literal introduction; map practice explains one concrete activity immediately |
| University affiliation | Explicit adjacent text plus campus collective context | Same explicit text; field photograph cannot independently establish affiliation |
| Outdoor education/activity | Copy explains it; education appears after TE feature | Concrete practice appears in opening, then the education fields |
| Programmes/publications | Broad gateways earlier; publication index/detail remain independent | Same gateways; educational activity before TE; publication block further down |
| Visual/content hierarchy | Institution → choice → example → education → works/history | Institution + practical evidence → choice → education/activity → expedition → works/history |
| Authentic material | Kawi collective, TE11 team, GH/RC practice, Kawi formation | GH practice, TE11 team, Kawi formation; avoids repeating hero GH later |
| Mobile first screen | Full identity/actions before wide collective frame; natural full-frame group treatment | Identity/actions before small native portrait case; map preserved, but smaller evidence at narrow width |
| Institutional breadth | Collective and programme gateways reduce single-event dominance | Education is more prominent; institutional life/history still appears later |
| Real-content scalability | Bounded editorial selection with stable programme gateways; sparse rows valid | Same content model; practice case can be replaced by another verified example without redoing IA |
| Approved IA compatibility | Canonical programme/edition/activity/work routes, Jejak and synthetic catalogue preserved | Same routes/relations; section order differs, not sitemap or canonical hierarchy |

Neither layout is a tested winner. The recommendation is **A as a refinement base**, with B's concrete practice-caption discipline used within education. A puts broad discovery earlier and depends less on one activity image. B remains credible when first-screen practical learning evidence is the priority. Do not combine two hero layouts or add every section twice.

## Reference roles applied

- Cambridge: immediate institutional name/affiliation and useful signposts; no university admissions hierarchy.
- NOLS: education explained by people in field activity; no commercial course funnel/video dependency.
- RGS: practice imagery beside explanatory text; no photo-overlay dependency or professional mega-menu.
- Emergence: separate authored works and visible captions/credits; no immersive editorial slogan replacing institutional introduction.
- Rijksmuseum: curated pathways into canonical content; no raw archive grid or massive search taxonomy.
- Surfrider: distinguish mission, programme and community activity; no donation/campaign-first framing.
- TinggalJalan: layered shell/sections/primitives and responsive media intent; no booking identity/components copied.

These roles derive from accepted Step 1 evidence. No new broad reference search or new design direction is selected.

## Dimension inspection and limits

The private wireframes use explicit vector layouts in CSS-equivalent pixel coordinates, not a React/CSS implementation. At 1366px width, identity starts at y=116; the explanatory copy plus both actions ends at y=503 in A and y≈378 in B. A has side-by-side identity/media columns; B has a full-width identity band above its field-practice story. At 390px, identity starts at y=84 and both actions end at y≈442. At 320px, identity starts at y=84 and both actions end at y≈524. First-screen review heights are 900, 844 and 740 respectively; viewport heights are explicit assumptions, not claims about every phone's available space.

The 320px version wraps the literal name and purpose more; two 46px buttons stack. Photography starts after those actions. The paired B practice plate remains native portrait so the map is not removed by a wide crop. Full mobile pages show the complete frame even where the first-screen fold intersects subsequent content. All text stays within page measure; long navigation labels are represented in the menu specification rather than forced into the narrow header.

Rendered PDF pages and media placement were visually inspected; first-screen position and text bounds were checked. No physical-device/touch test, browser CSS validation, keyboard implementation check, five-second participant test or preference score is claimed. Interactions are annotations/specifications only. Actual later comprehension testing should use an unfamiliar visitor, expose a first screen briefly, ask who/where/what/next without coaching, and record misunderstandings; no test outcome is invented here.

## Owner decisions

1. Refine A, B, or an explicitly described combination; identify any sections/order to revise.
2. Is the literal first-screen introduction accurate, concise and complete enough?
3. Should programme breadth or demonstrated member education receive the earlier supporting emphasis?
4. Do the proposed photo roles/crop intentions support the institution? Photo publication clearance remains a separate per-asset decision.

Owner acceptance of this research/wireframe packet is not automatic Step 4 or implementation authorization. No production, prototype, design-token, workflow, public-photo or PR merge changes are made. Stop at this composition review.
