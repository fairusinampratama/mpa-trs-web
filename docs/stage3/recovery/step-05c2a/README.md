# Step 5C-2A — authentic photography integration

15 October 2026. Step5C-1 accepted. This checkpoint covers only six reviewed photographs and eleven explicitly approved placements; no Step5C-2B, Step6, backend, production action or PR13 merge.

## Owner decisions and release scope

The owner personally attests existing photographer/authorized-rights-holder permission for public institutional website display, all eleven named placements, reviewed resizing/cropping/WebP derivatives, and public GitHub/Pages derivative distribution. This firsthand attestation supersedes the earlier missing-document assessment; a missing formal licence file is not treated as evidence that permission never existed. Permission evidence is retained privately under `owner-photo-permission-2026-10-15`.

The owner additionally selected **Existing permission covers uses** for the participant/privacy question and **One shared credit** for attribution. Contextual institutional documentation and the reviewed non-sensitive frames are the assessed scope; no identities, ages, individual membership statuses or technical certifications are inferred. Asset03 has no visible people. No new universal written-consent requirement or further institutional representative is imposed.

**Exact shared credit supplied by the owner: Foto: Dokumentasi HUMED MAPALA Tursina.** Evidence: `owner-exact-shared-credit-2026-10-15`, supplied directly in the project conversation. All six records and eleven uses are now cleared under the existing asset-specific rights, privacy and usage decisions. No other asset or use inherits this clearance. The private register is updated in place; originals, correspondence and private evidence locators stay outside Git.

| Asset | Canonical ID | Approved decision IDs |
| --- | --- | --- |
| 13 | kawi-collective | C2A-13-HOME; C2A-13-KAWI |
| 01 | te11-documentary | C2A-01-HOME; C2A-01-CAT; C2A-01-TE11 |
| 03 | te11-ecology | C2A-03-ECO |
| 07 | pd-gh-map | C2A-07-HOME; C2A-07-GH |
| 10 | pd-rc-team | C2A-10-HOME; C2A-10-RC |
| 16 | batafia-field | C2A-16-BAT |

## Implemented source foundation

- Canonical asset metadata now supports alt/caption, exact credit/evidence, explicit derivative dimensions/bytes/SHA256, and independent rights/privacy evidence. Usage carries explicit placement and owner decision ID/date/evidence. Homepage uses remain associated with the genuine documented activity; no fake activity is introduced.
- `DocumentaryMedia` resolves record + placement from the canonical registry, emits responsive `srcset`/`sizes`, intrinsic dimensions, captions and exact credit text. It preserves approved native full frames and eager/high-priority opening versus lazy secondary images. Source changes recover from a previous failed image. Missing/withdrawn assets retain compact fallback.
- Role-only UI-lab and legacy media do not inherit public approval. Sparse unrelated records receive no photo. BATAFIA/Kawi can display a cleared associated image even when their narrative is sparse; they gain no invented chapters or galleries.
- One derived public-media manifest feeds build and static verification. Vite reads only manifest-authorized image paths and verifies bytes/hash before emission. The output validator rejects unknown paths, tampering, dimensions mismatch, missing approved derivatives, malformed WebP or embedded metadata/animation. No arbitrary image-extension allowance or public-directory copying is enabled.
- Shared theme, CSS/token source, accepted section sequence, canonical routes and deployment workflows are preserved.

## Earlier private implementation proof (historical)

Seventeen optimized WebP derivatives, 1,778,340 bytes in total, are prepared privately from the six hash-matched originals. Maximum width1440, except collective1200, GH720 and RC640. Full native frames retain people/banner/flag, map/compass and ground belay team. GPS/EXIF/XMP/IPTC are removed. Original archival JPEGs are not copied to the application.

Private test scaffolding clones the registry only in an entry outside the repository, supplies the visibly artificial `PRIVATE QA CREDIT - exact wording pending`, and exercises the same React components/resolver. That marker is explicitly forbidden by the public artifact validator. This is an intended-image rendering test, not an approved attribution or public release. Private screenshots and source/derivatives remain outside Git.

Verified 35 actual-photo layouts across homepage, catalogue, TE11, GH29, RC29, Kawi29 and BATAFIA30 at1366/1024/768/390/320 CSS widths. Thirty unrelated sparse/history/lab checks show no unapproved image. Also checked actual responsive image decoding, full-frame containment, alt/captions, loading priority, reserved hero geometry before/after delayed image load, failed-image fallback and refresh. No physical-device/touch, screen-reader certification or field Core Web Vitals claim.

## Public photography release

The exact shared credit resolves the final gate. The canonical public manifest now admits seventeen metadata-stripped WebPs (1,778,340 bytes) for these six photographs and eleven uses only. Every derivative has recorded dimensions, bytes and SHA256. Original JPEGs, private PDFs, other HOLD photographs and unconfirmed emblems remain excluded. Current publication evidence is recorded in deployment.md; preparation-only evidence there is explicitly historical.

The actual public build is checked at 1366/1024/768/390/320 CSS pixels, including all seven photographic routes, unrelated-context exclusion, captions/credit, image loading and fallback. Existing homepage, TE, activity and institutional regression suites remain required. CSS viewport testing is not physical-device or touch testing.

After verified Pages publication, stop for owner implementation review. No Step5C-2B, Step6 or Stage4 is authorized.
