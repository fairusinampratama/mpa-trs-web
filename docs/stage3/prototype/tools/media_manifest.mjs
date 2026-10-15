import { canonicalRegistry } from '../src/domain/index.ts';
import { publicMediaManifest } from '../src/domain/media.ts';
process.stdout.write(JSON.stringify(publicMediaManifest(canonicalRegistry)));
