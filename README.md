# MPA-TRS Web

Laravel 12 / Blade / Tailwind application foundation for MAPALA TURSINA, in `application/`. GitHub is the source of truth; GitHub Actions tests and builds commit-identified artifacts; Rumahweb receives supervised releases. Stage 1 is not deployed yet.

## Development

PHP 8.2+ with Laravel extensions, Composer 2, Node 22 and Python 3.12+. In `application/`: copy `.env.example` to private `.env`, run `composer install`, `php artisan key:generate`, `npm ci`, `npm run build`, `php artisan test` and `php artisan serve`. No database or migration is needed. Do not commit environment values, runtime storage or uploads.

At repository root: `python3 -m unittest discover -s tests/deployment -v`. Existing static probe scripts remain historical tested transport evidence. CI also tests Laravel on PHP 8.2/8.3 and builds production-only SHA-identified application ZIPs; it cannot deploy hosting.

Read [Stage 1 implementation](docs/infrastructure/stage1-implementation.md), [historical Phase 3 evidence](docs/infrastructure/phase3-implementation.md), [deployment](docs/infrastructure/deployment.md) and [recovery](docs/infrastructure/recovery.md). A permanent preview domain is deferred. Production-ready merge and live activation require explicit user approval. Preserve SLiMS, E-Letter, shared PHP and existing databases.

The authenticated private FTPS archive roundtrip is proven (run 37893378939). [Release activation preparation](docs/infrastructure/release-activation.md) adds a separately approved private file-by-file transfer and selector rehearsal. It is not a production deployment workflow, and no live application is activated yet.
