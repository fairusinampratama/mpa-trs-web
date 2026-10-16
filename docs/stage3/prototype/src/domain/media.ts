import type { InstitutionalRegistry } from './contract.ts';
import { resolvePublicMedia } from './validate.ts';

// Derived from the same canonical records as the React view; never a second
// authored permission list. Private originals and pending derivatives stay out.
export function publicMediaManifest(registry: InstitutionalRegistry) {
  const manifest: Record<string, { assetId: string; width: number; height: number; bytes: number; sha256: string; useIds: string[] }> = {};
  for (const record of [...registry.activities, ...registry.works, ...registry.history]) {
    for (const media of resolvePublicMedia(registry, record.id)) {
      for (const derivative of media.derivatives) {
        const path = derivative.path.slice(1);
        const existing = manifest[path];
        if (existing && existing.assetId !== media.id) throw Error('Derivative path belongs to multiple assets');
        manifest[path] ??= { assetId: media.id, width: derivative.width, height: derivative.height, bytes: derivative.bytes, sha256: derivative.sha256, useIds: [] };
        if (!manifest[path].useIds.includes(media.useId)) manifest[path].useIds.push(media.useId);
      }
    }
  }
  return manifest;
}

// Owner decision16Oct2026: optional enlargement only in these existing homepage
// contexts. This grants no new publication/use/derivative permission; callers
// must first resolve a currently publishable canonical asset for that placement.
export function homeEnlargementAuthorized(context:{assetId?:string;useId?:string;recordId?:string;placement?:string;role:string}) {
 return context.role==='gh'&&context.assetId==='pd-gh-map'&&context.useId==='pd-gh-home-education'&&context.recordId==='gh29'&&context.placement==='home-education-gh'
  || context.role==='rc'&&context.assetId==='pd-rc-team'&&context.useId==='pd-rc-home-education'&&context.recordId==='rc29'&&context.placement==='home-education-rc';
}
