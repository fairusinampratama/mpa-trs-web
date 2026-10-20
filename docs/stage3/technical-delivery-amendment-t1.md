# MPA-TRS — Stage 3 Technical Delivery Amendment T1

Date: 13 October 2026, Asia/Jakarta. Version: 1.0.

Status: frontend stack CONFIRMED by the owner's Stage 3 instruction. A2, Stage 3 Plan v2 execution, and the source-control arrangement below remain pending explicit approval. This record does not mark them approved.

## 1. Governing records and approval scope

Retrieved: R1–R5, Stage 2 Approval Record A1, Project Owner Decision Register (OD-01–OD-13), Proposed Approval Addendum A2, and Stage 3 Execution Plan v2 Proposed.

A1 is approved. OD-01–OD-13 are confirmed owner direction. A2 v1.0 explicitly remains proposed; Plan v2.0 explicitly remains unauthorized for execution. The present instruction requires one consolidated approval before substantive prototype work.

On approval, Stage 3 uses R5 as amended by A1 and A2, with T1 governing frontend delivery. Earlier v2/v3/integrated proposals are supporting explanations only where reconciled by A2. P1–P7 and the five-stage roadmap remain intact.

Approval covers A2-M01–M09 and its requirement dispositions, including FR19 synthetic NIA/name catalogue and FR20 simple organizer intake; Plan v2 P1–P7; and the isolated workspace/source-control scope in §3. It does not approve Stage 3 completion or transition to Stage 4.

## 2. Confirmed frontend delivery

| Layer | Decision |
|---|---|
| Frontend | React + TypeScript |
| Build | Vite |
| Styling | Tailwind CSS 4; centralized custom Tursina tokens |
| Architecture | Shared React components for the UI laboratory and real pages |
| Development | ChatGPT Work cloud workspace |
| Content | Small source-verified and clearly synthetic fixtures; permission ledger |
| Verification | Actual desktop/mobile browser inspection; Playwright where practical |
| Backend | No production backend, authentication, database-backed CRUD or Filament implementation |

This replaces the old handoff's prohibition on a frontend framework change only for Stage 3's isolated prototype. It does not replace the live Laravel 12 foundation. Laravel + Inertia + React + Filament remains the Stage 4 preferred candidate; version/PHP/hosting/SEO feasibility is bounded future work.

## 3. Proposed workspace and durable source scope

Use the existing private repository `fairusinampratama/mpa-trs-web`. Create a focused branch `stage3/interactive-prototype` from freshly verified main. Put the standalone frontend in `prototype/`, with its own package manifest, dependency lock, Vite/TypeScript configuration, theme, fixtures, components, page routes and tests. Put decision/provenance/review records in `docs/stage3/`.

Authorize branch creation, local prototype development, commits/pushes and a draft PR for review. Any branch-name collision is inspected before reuse; no force push or overwrite of unrelated work. Approval also permits a targeted Stage 3 section in AGENTS.md on this branch to record the new scope and component conventions while preserving Stage 1 restrictions.

Keep production application files, deployment scripts, production workflows, hosting, databases and main unchanged. Prototype output is not a production release artifact. No merge is authorized; a future merge requires a separately reviewable checkpoint and actual required CI. No additional repository or hosting resource is authorized.

After each meaningful increment, preserve source and decision evidence with a commit and record its SHA. Sessions resume from the branch and its README/decision ledger, not from a running process or chat memory. Checkpoint documents include approval status, review feedback, unfinished checks and next work. Work's transient server is not durable hosting.

## 4. First executable milestone after approval

Before full website development, prove the development/review loop:

1. Verify actual runtime and locked installed React/TypeScript/Vite/Tailwind versions.
2. Run a minimal React/Vite application with a small `/ui-lab` using shared theme tokens and at least one reusable activity component.
3. Open the actual rendering in the available cloud browser; record the access method and limitations.
4. Inspect desktop and mobile viewports with a supported browser method. A narrow embedded panel is not automatically a real mobile viewport test.
5. Change a shared style token, observe the changed rendering, and retain before/after evidence.
6. Demonstrate an owner-accessible review method and preserve/retrieve source from the approved branch.

Only then proceed into P1 safe representative content, P2 two navigation candidates and P3 working visual directions. Owner selects a visual direction before whole-site refinement. The first substantive bundle connects Beranda, TE browsing, expedition detail and organizer-to-editor simulation.

## 5. Access capability: verified versus pending

| Capability | Current evidence / next proof |
|---|---|
| Work internal browser | Opened production landing successfully; access to a workspace Vite server is not yet proved |
| Owner interactive review | Not yet proved. Test whether the cloud preview can be surfaced and revisited by the owner |
| External reviewer access | Not established; no public URL, permanent domain or external hosting approved |
| Durable source | Existing private GitHub repository is readable; branch writes require approval and successful write/readback |

If Vite cannot be reached by the cloud browser or owner, report the specific limitation before expanding the website. The simplest fallback candidate is a self-contained compiled review artifact from the same React source, if Work can render it interactively; prove that capability rather than assuming it. If that fails, present a narrowly scoped private preview alternative for separate approval. Do not silently provision hosting or require local installation by the owner.

## 6. Design consistency and content boundaries

Centralize colors, semantic states, typography, spacing, grids, radii, shadows, image ratios and interaction/accessibility conventions. Reuse existing components; equivalent buttons/cards share styles. Shared changes are verified across affected pages. New token variants or editorial layouts need a recorded reason. UI-lab and pages share the same component source. Avoid unnecessary abstractions; a simple React gallery is the starting choice.

Derive identity from the established sources: logo meanings, institutional traditions and authorized Tursina imagery. Do not invent official hex values from symbolic color descriptions. Record exact asset source, factual uncertainties, credit and permission status. Accessible Drive files are not automatically publishable. Use synthetic NIA/name only; no raw archives or real membership data in the prototype. Deferred Indonesia map stays deferred. Administrator actions are visibly simulated.

## 7. Foundation verification and separate operational follow-ups

Repository main inspected: `ed13b2197d7908e93776cf66dce7eeb8b4b2df1f`, the merge of PR #12. AGENTS.md, README, live deployment evidence, supervised ZIP runbook, implementation history, recovery, hosting baseline, composer/package/Vite/CSS configuration and CI were inspected. R1–R5 were retrieved in full through successive reads.

The current application is Laravel 12/Blade, composer PHP requirement ^8.2 with platform 8.2.0, Vite ^7.0.7, Tailwind ^4.0.0 and Laravel Vite plugin ^2.0.0. React/TypeScript are absent from its package manifest. Actual Work runtime returned Node v24.19.0 and npm 11.9.0; prototype installation/build/server have not been attempted.

Production browser observation: https://mapalatursina.my.id/ opened and displayed MAPALA TURSINA / Website Under Development. This is a current landing observation, not a new full production regression or health-SHA verification.

Recorded Stage 1 evidence proves Laravel 12.69.3, active release A `623bb0a024c3a72454a1f9edaa935c0b1c0e095c`, full extraction verification and live A → B → A on 10 October. PR #12 is closed/merged (10 October 2026); its review/merge follow-up is resolved, although repository prose still calls it pending. Historical FTPS failures remain failures and are not repeated.

Separate unresolved operations: Stage 1 mobile rendering was not verified; trusted A/B Actions artifacts expire 24 October and post-expiry automated rollback is unproved; temporary probe retirement needs separate approval. No hosting experiment or remediation is performed in Stage 3 recovery.

## 8. Consolidated owner decision

Requested authorization: approve A2 v1.0 and Stage 3 Plan v2.0 with T1, and authorize the isolated `stage3/interactive-prototype` / `prototype/` branch-development and draft-PR scope described above. Begin with the working preview/UI-lab proof, then continue incremental P1–P3 within those bounds.

Approval date/effective date: pending. No authorization is inferred from this document's creation. Record the owner's explicit response separately and preserve the original proposed handoff versions.
