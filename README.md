# MPA-TRS Web

Minimal Laravel 12 / Blade / Tailwind application in `application/`, compatible with PHP 8.2. Stage 1 is the first real deployment at https://mapalatursina.my.id with verified update/recovery while preserving SLiMS and E-Letter. Laravel 12.69.3 is live; active source SHA is `623bb0a024c3a72454a1f9edaa935c0b1c0e095c`. Live A → B → A update/rollback passed on 10 October 2026.

GitHub is the source of truth. CI tests Laravel on PHP 8.2/8.3, builds production dependencies/assets from lock files, validates SHA-identified release ZIPs and runs real packaged Laravel A → B → A HTTP/CSS/recovery checks in private runner paths.

Production delivery uses one encrypted FTPS ZIP upload, then one supervised cPanel File Manager extraction/recompression and CSS copy session per new release. Actions compares every extracted file against the trusted artifact before publishing a completion marker. Activation/rollback changes only a fixed private SHA selector, with critical-file/CSS and live revision checks. No file-by-file vendor deployment, remote commands, permanent preview or automatic production deployment.

Read [live deployment evidence](docs/infrastructure/stage1-live-deployment.md) and [operational runbook](docs/infrastructure/supervised-zip-deployment.md), [Stage 1 evidence](docs/infrastructure/stage1-implementation.md), [recovery](docs/infrastructure/recovery.md) and [historical Phase 3](docs/infrastructure/phase3-implementation.md). PRs #8/#9 are unfinished historical preparations/evidence, not production deployment solutions. Merges and production changes require explicit approval; branch protection is not enforced.

## Development

PHP 8.2+, Composer 2, Node 22 and Python 3.12+. In `application/`: copy `.env.example` to private `.env`, `composer install`, `php artisan key:generate`, `npm ci`, `npm run build`, `php artisan test`, `php artisan serve`. The landing page requires no database or migration. Never commit credentials, environment values, runtime storage, uploads or account backups.

At repository root: `python3 -m unittest discover -s tests/deployment -v`. `rehearse_pair.py` builds the exact Git parent as a second real Laravel release; it needs PHP/Composer/Node and Git parent history. GitHub Actions provides this runtime. Current Work scratch lacks PHP/Composer, so do not describe Python fixtures as a Laravel runtime test.

No new hosting purchase or paid add-on is required. Routine new releases still require one supervised cPanel session for extraction and CSS publication; retained-release rollback used FTPS only in the successful live test. Core Stage 1 deployment/update/recovery and existing-site checks are proved. Final handover remains pending evidence PR review/merge and mobile rendering verification. Current Actions rollback requires a downloadable trusted source artifact (A/B expire 24 October 2026); see the runbook limitation.
