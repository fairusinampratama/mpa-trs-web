import test from 'node:test';
import assert from 'node:assert/strict';
import { canonicalRegistry as base } from '../src/domain/index.ts';
import { validateRegistry, resolvePublicMedia, mediaPublishable } from '../src/domain/validate.ts';
import { publicMediaManifest } from '../src/domain/media.ts';
const fixture = () => {
  const r = structuredClone(base);
  for (const a of r.media) { a.credit='verified'; a.creditText='Synthetic test attribution'; a.creditEvidence='isolated-test-only'; }
  for (const u of r.mediaUses) u.clearance='cleared';
  return validateRegistry(r);
};
test('real attested rights and approved uses do not bypass the missing shared credit', () => {
  assert.equal(base.media.length,6); assert.equal(base.mediaUses.length,11);
  assert(base.media.every(a=>a.rights==='permission-verified'&&a.privacy==='cleared'&&a.credit==='unverified'&&!a.creditText));
  assert(base.mediaUses.every(u=>u.institutionalUse==='approved'&&u.approval.evidence==='owner-photo-permission-2026-10-15'));
  assert.deepEqual(publicMediaManifest(base),{});
});
test('complete synthetic clearance resolves only the exact record and placement', () => {
  const r=fixture();
  assert.equal(resolvePublicMedia(r,'te11','te-catalogue-feature')[0].useId,'te11-catalogue-feature');
  assert.equal(resolvePublicMedia(r,'te11','expedition-lead')[0].useId,'te11-documentary-usage');
  assert.deepEqual(resolvePublicMedia(r,'te10','expedition-lead'),[]);
  assert.deepEqual(resolvePublicMedia(r,'te12','expedition-lead'),[]);
  assert.deepEqual(resolvePublicMedia(r,'te11','home-opening'),[]);
  assert.deepEqual(resolvePublicMedia(r,'gh28','activity-documentary'),[]);
});
test('detail-only approval cannot authorize the homepage or catalogue', () => {
  const r=fixture();for(const u of r.mediaUses) if(u.placement!=='expedition-lead') u.clearance='hold';
  assert.equal(resolvePublicMedia(r,'te11','expedition-lead').length,1);
  assert.deepEqual(resolvePublicMedia(r,'te11','home-expedition'),[]);
  assert.deepEqual(resolvePublicMedia(r,'te11','te-catalogue-feature'),[]);
});
test('credit, rights, privacy, use approval and derivative identity are independent gates', () => {
  for (const mutate of [a=>a.credit='unverified',a=>delete a.creditText,a=>a.creditText=' ',a=>delete a.creditEvidence,a=>a.rights='unverified',a=>delete a.permissionEvidence,a=>a.privacy='unreviewed',a=>delete a.privacyEvidence,a=>delete a.alt,a=>delete a.caption,a=>delete a.derivatives,a=>delete a.publicPath]) {
    const r=fixture(),u=r.mediaUses[0],a=r.media.find(a=>a.id===u.assetId); mutate(a); assert(!mediaPublishable(a,u)); assert.throws(()=>validateRegistry(r),/Incomplete media clearance/);
  }
  for (const mutate of [u=>u.institutionalUse='pending',u=>delete u.placement,u=>delete u.approval]) {
    const r=fixture(),u=r.mediaUses[0],a=r.media.find(a=>a.id===u.assetId); mutate(u); assert(!mediaPublishable(a,u)); assert.throws(()=>validateRegistry(r),/Incomplete media clearance/);
  }
});
test('withdrawn usage and withdrawn source record disappear from views and artifact manifest', () => {
  const r=fixture();r.mediaUses.find(u=>u.id==='kawi-home-opening').clearance='withdrawn';
  assert.deepEqual(resolvePublicMedia(r,'kawi29','home-opening'),[]);
  assert.equal(resolvePublicMedia(r,'kawi29','activity-documentary').length,1);
  r.activities.find(a=>a.id==='kawi29').publication.website='withdrawn';
  assert.deepEqual(resolvePublicMedia(r,'kawi29'),[]);
  assert(!Object.keys(publicMediaManifest(r)).some(p=>p.includes('kawi-collective')));
});
test('responsive derivatives are deduplicated across eleven uses without duplicating the asset', () => {
  const manifest=publicMediaManifest(fixture());assert.equal(Object.keys(manifest).length,17);
  const te=manifest['media/te11-documentary-960.webp'];assert.equal(te.useIds.length,3);assert.equal(te.assetId,'te11-documentary');
  assert(Object.keys(manifest).every(p=>p.startsWith('media/')&&p.endsWith('.webp')));
  assert(Object.values(manifest).every(d=>d.bytes<600000&&d.sha256.length===64));
});
test('invalid dimensions/hash/path, duplicate widths and ambiguous placements fail validation', () => {
  for(const mutate of [r=>r.media[0].derivatives[0].path='/original.jpg',r=>r.media[0].derivatives[0].sha256='bad',r=>r.media[0].derivatives[0].height=0,r=>r.media[0].derivatives.push({...r.media[0].derivatives[0]}),r=>r.mediaUses.push({...r.mediaUses[0],id:'ambiguous-use'}),r=>r.mediaUses[0].approval.recordedOn='2026-02-30']) {
    const r=fixture();mutate(r);assert.throws(()=>validateRegistry(r));
  }
});
