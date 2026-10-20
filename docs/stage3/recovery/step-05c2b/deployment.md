# Step 5C-2B deployed review checkpoint

- Live review: https://fairusinampratama.github.io/mpa-trs-web/
- Served application source: `874c16cfc4980ad7546ecea6ef65114c4d741a76` (version.json and rendered footer agree).
- Source tree: `ce0a6f51d2a7c18acdd34b815eb0bb97a20a913c`.
- Native Pages run: https://github.com/fairusinampratama/mpa-trs-web/actions/runs/38825330487 — build, deploy and HTTPS verification jobs all succeeded. Build job116731350278, deployment job116731419454, verification job116731503466.
- CI run: https://github.com/fairusinampratama/mpa-trs-web/actions/runs/38825335842 — successful attempt2. Attempt1 failed only in temporary Git fixture cleanup (`test_symlink_entry` tearDown, directory objects not empty); the failed foundation job was rerun unchanged and passed. PHP8.2/8.3 jobs passed. No pipeline or production security changes.
- Independent normal-TLS readback: all24 non-marker compiled files match the exact-source local output byte for byte; see evidence/https-files.json. The artifact has25files including `.nojekyll`. All17 existing WebPs unchanged; no additional photographs, derivatives, uses or private originals.

## Actual hosted Chrome verification

Verified homepage→TE catalogue→TE11→The Sacred Gatekeeper→TE11; work date differs correctly from activity date and manuscript remains withheld. TE10/11/12 catalogue discovery and TE11 multiple related works/history links render. Direct TE11 refresh works; chapter navigation loads both approved documentary and ecology images.

Verified PD GH+XXIX combined filter→GH detail→filtered return (both filter values retained), reset; general activities keyword search→BATAFIA→query-preserving return link. GH contextual links include Kawi, history and separately labelled same-field records.

Verified publications keyword+resource type→independent design-school resource→filtered return (`Desain`, `resource` retained); metadata-only original remains unavailable with no fake download or parent activity. Tentang→Jejak exposes sourced activity/work links. Synthetic member search returns DEMO.001.TRS and a nonexistent query produces the appropriate empty state.

Live responsive harness checked homepage, TE11, PD catalogue, publications and Jejak at1366/1024/768/390/320 CSS-pixel frame widths:25 page/width observations, no horizontal overflow. The frame's vertical scrollbar consumes15px of content width; evidence compares clientWidth to scrollWidth. Mobile Menu opens and Escape closes it. These are CSS viewport checks, not physical-device/touch tests. Full domain/browser fixture and regression coverage is recorded separately in verification.md.

Captured desktop homepage, settled390px homepage, and isolated synthetic-history proof are owner review artifacts outside Git. The isolated proof deliberately shows test-only approximate/undated history and must not be mistaken for public institutional records. Hosted console entries inspected were browser-extension metadata errors, not application errors. Local regression suites reported no app runtime/image-request failures. This does not certify exhaustive accessibility or field performance.

## Preservation and review boundary

PR13 title/description now reflect the complete Stage3 prototype through5C-2B; it remains draft/unmerged. Branch remains `stage3/interactive-prototype`; main remains `ed13b2197d7908e93776cf66dce7eeb8b4b2df1f`. Documentation-only evidence commits after the application commit do not change the served application identity.

Six photographs,11 exact contextual uses,17 derivatives and the agreed credit remain unchanged: **Foto: Dokumentasi HUMED MAPALA Tursina**. Canonical role, placement, record, source, clearance and derivative checks fail closed. Restricted manuscripts, source locators, HOLD media, unconfirmed emblem and real members remain excluded.

Production Laravel, Rumahweb, SLiMS, E-Letter, DNS, databases and deployment workflows were not changed. Step6/Stage4 have not begun. Await owner acceptance of Step5C-2B; see handoff.md for bounded evaluation issues and retained compatibility adapters.
