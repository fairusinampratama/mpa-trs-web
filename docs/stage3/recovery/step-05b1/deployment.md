# Verified Pages deployment — 15 October 2026

| Evidence | Result |
| --- | --- |
| Exact deployed source | `72e90d75d234dc634fd43a513666b2c1f3b20bc6` |
| Source tree | `8f384fbe2c5ac15234aa42c0f1850d791aa31b95`; local staged tree matched before exact build |
| Pages run | [38671019984](https://github.com/fairusinampratama/mpa-trs-web/actions/runs/38671019984), success: build, deploy, verify |
| Pages artifact | `github-pages`, artifact11943877635; deployment action reported source SHA as deployment ID |
| Actual deployment output | `https://fairusinampratama.github.io/mpa-trs-web/` |
| Source CI | [38671024594](https://github.com/fairusinampratama/mpa-trs-web/actions/runs/38671024594), success: foundation validation, Laravel PHP8.2 and8.3 |
| HTTPS identity | All7 HTTP-served files match exact local build byte-for-byte, including version.json, JS/CSS and the2 approved fonts. TLS certificate validation enabled. `.nojekyll` remains an artifact marker, not an HTTP entry. |
| Live browser | Homepage→catalogue→TE11→article→TE11 exercised. Chapter focus and6 stages, canonical return, direct reload, mobile menu/Escape and native source-disclosure keyboard behavior checked. |
| Live responsiveness |4 pages×5 requested frame widths1366/1024/768/390/320; no horizontal overflow. Chrome's15px scrollbar yields client widths1351/1009/753/375/305. Exact requested CSS viewport sizes were separately tested locally. |
| Live preservation |15 direct routes loaded and refreshed: homepage, catalogue, TE11, TE12, article, PD, GH29, RC29, activities, unrelated teaching work, carbon note, Jejak, synthetic members, local submission, UI-lab. |
| Controlled homepage regression | First-screen PNGs at all5 widths match a fresh build of accepted parent `adedc7d` pixel-for-pixel. Footer/source label is outside those first screens. |
| Runtime/requests | Local public browser runners recorded no runtime/console/request errors. Live logs showed only unrelated browser-extension metadata errors; no site error observed.7 intended HTTP files returned200. |

## What was delivered privately

A12-page owner review packet contains actual same-App photo renders, public/private first-screen comparisons, full-resolution desktop/mobile pages, approved-pattern comparison and a3-asset permission register. Its attached private source ZIP retains selected review derivatives, entry/config/scripts and full-resolution screenshots. It was saved persistently and read back successfully as12 pages with image-bearing review content. No private locator, image, packet, archive or real member record was added to GitHub. The local private browser was used for verification; it is not an externally hosted owner preview. The review file is the owner-accessible alternative.

## Scope / reversal

The unchanged native Pages branch/path-limited pipeline published this source. A subsequent documentation-only evidence commit does not change the served source. Reload and check footer `72e90d7` or version.json to distinguish deployed source from branch tip.

To reverse a broken preview, revert the implementation commit with a normal new commit on the authorized Stage3 branch, push, then verify its new Pages run, version.json and UI. Do not force-push or involve production.

No application/, .github/workflows/, scripts/deployment/ or tests/deployment/ files changed in this increment. No production hosting, secrets, databases, DNS or main merge. PR13 remains draft/unmerged. Step5B-1 is ready for owner implementation review; Step5B-2 and later work remain unstarted and require explicit authorization. Source/body/media uncertainties are detailed in README and verification-and-handoff.
