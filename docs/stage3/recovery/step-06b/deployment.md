# Verified Step6B application release

- Application source: **bd5caca0650cbbba9bdd87970e62f0743b0b9d6c**. Parent/audit head733c96c0c11dd5d833488e07ab55192bc424da19. Source treeabb807a4ded32144387eb6793ecabcbcc32d571e matched the locally staged tree before a leased, non-forced branch update.
- Native Pages run [38860823869](https://github.com/fairusinampratama/mpa-trs-web/actions/runs/38860823869): build, deploy and HTTPS/source verification all **success**. Existing workflow unchanged.
- Foundation/application CI [38860828181](https://github.com/fairusinampratama/mpa-trs-web/actions/runs/38860828181): **success**, no rerun or weakened checks.
- Public preview: https://fairusinampratama.github.io/mpa-trs-web/#/ . Independent HTTP version.json returned full sourceSHA; existing verify_live_preview.py passed HTTPS entries/assets/version. An exact-source local rebuild passed strict artifact verification:25compiled files.
- All **24 intended HTTP files** independently byte-match that exact-source rebuild, including17WebPs, both font files, JS/CSS and public entries/version; hashes and byte counts in evidence/served-artifact.json. `.nojekyll` is a Pages build-control marker, not an HTTP content asset; its404 was excluded explicitly rather than treating it as a missing photograph. No unapproved image or new placement was released.

## Actual hosted browser verification

Cloud Chrome top-level homepage1363×936 shows bd5caca and refined availability/copy/history/footer. The existing responsive-review frame then loaded12principal pages at1366/1024/768/390/320:60settled observations, all sourcebd5caca, fonts loaded, no horizontal overflow. Frame scrollbars reserve15px (390frame→375content), unlike local native viewport tests; these methods are reported separately. Raw public-safe observations are in evidence/hosted-layouts.json.

Actual interactions verified on hosted source: homepage→TE11→related Sacred Gatekeeper→restricted-original explanation→TE11 return; compact five-link discovery; PD jump→GH+XXIX→one result→GH detail with incomplete-place note→filtered catalogue return; footer Kegiatan→general activities heading and exact#/activities destination. Existing17public derivatives remain byte-identical and decoded in the local photographic suite; actual hosted group/map/belay images and exact credit remain visible. No source-driven new public media permission is inferred.

The standalone local headless hosted-runner could not validate the proxy certificate in its NSS store. It was not counted as a pass and certificate checks were not disabled. Hosted UI verification used the available cloud Chrome and the existing public review harness; independent Python HTTPS readback and GitHub-hosted verification also passed. Browser-extension metadata errors were excluded by their chrome-extension://origin; no app-attributed runtime error was observed in the checked cloud log. Local regressions recorded no app/page/request errors.

[Draft PR13](https://github.com/fairusinampratama/mpa-trs-web/pull/13) title/body updated to current scope, draft=true, merged=false. Main remainsed13b2197d7908e93776cf66dce7eeb8b4b2df1f. Application/Stage1workflow/hosting/secret/database/production files remain untouched. Subsequent documentation-only evidence commits do not change this deployed application identity.

## Owner gate

PackagesA–D are deployed for Step6B owner acceptance. PackageE private comparison is available; current public photograph pairing remains unchanged pending exact viewing/context approval. No Stage4, production deployment, new media scope or PR merge is authorized. Rollback uses an ordinary source revert on the prototype branch and existing Pages redeployment.
