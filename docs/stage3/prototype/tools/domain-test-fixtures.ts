import type {
  InstitutionalRegistry,
  Activity,
  Work,
} from "../src/domain/contract.ts";
// Test entry only. Never imported by the public application.
export function withDomainProof(
  base: InstitutionalRegistry,
): InstitutionalRegistry {
  const r = structuredClone(base),
    sourceUses = [
      {
        sourceId: "synthetic-fixture",
        locator: "isolated canonical-contract browser proof",
      },
    ];
  const publication = {
    institutionalAuthority: "owner-designated",
    scope: "prototype-metadata-and-editorial-summary",
    approval: "prototype-scope-authorized",
    website: "preview",
    originalReproduction: "not-authorized",
  } as const;
  const editorial = {
    verification: "synthetic",
    readiness: "review-draft",
    website: "prototype",
  } as const;
  const dates = {
    presentation: { label: "Tanggal belum diketahui" },
    assertions: [],
    reconciliation: "unknown",
  } as const;
  const a: Activity = {
    id: "data-proof-te",
    title: "Edisi uji kontrak — bukan ekspedisi nyata",
    summary:
      "Fixture sintetis untuk membuktikan penambahan data, bukan halaman baru.",
    kind: "expedition",
    state: "unknown",
    depth: "basic",
    programId: "te",
    editionId: "data-proof-edition",
    dates: { ...dates, assertions: [] },
    places: { assertions: [], reconciliation: "unknown" },
    sourceUses,
    editorial,
    publication,
  };
  r.editions.push({
    id: "data-proof-edition",
    programmeId: "te",
    label: "DEMO",
  });
  r.activities.push(a);
  r.activities.push({
    ...a,
    id: "data-proof-pd",
    title: "PD uji kontrak",
    kind: "division-education",
    programId: "pd",
    editionId: undefined,
    divisionIds: ["ORAD"],
  });
  const w: Work = {
    id: "data-proof-work",
    title: "Karya uji kontrak mandiri",
    summary:
      "Metadata sintetis tanpa karya asli, tanggal atau kegiatan rekaan.",
    kind: "resource",
    dates: { ...dates, assertions: [] },
    sourceUses,
    evidence: ["Isolated test fixture"],
    editorial,
    publication,
    originalState: "synthetic-example",
    availability: {
      state: "restricted",
      title: "Naskah uji tidak dipublikasikan.",
      explanation: "Hanya metadata fixture.",
    },
  };
  r.works.push(w);
  r.history.push({
    id: "data-proof-history",
    title: "Jejak uji kontrak — bukan sejarah nyata",
    kind: "knowledge",
    summary: "Fixture bertanggal tahun saja.",
    dates: {
      presentation: { label: "2001 (contoh)", assertionId: "year" },
      assertions: [
        {
          id: "year",
          role: "milestone",
          value: { precision: "year", start: "2001" },
          sourceUses,
        },
      ],
      reconciliation: "single-source",
    },
    sourceUses,
    uncertainties: ["Synthetic test"],
    editorial,
    publication,
  });
  r.demoMembers.push({
    id: "data-proof-member",
    nia: "DEMO.CONTRACT.TRS",
    name: "Anggota Uji Kontrak",
    synthetic: true,
  });
  return r;
}
