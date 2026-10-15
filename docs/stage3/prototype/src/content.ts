import {publicationInputs} from './institutional-data.ts';
import {projectPublications,validatePublications} from './institutional-model.ts';
import {sourceDefinitions} from './source-registry.ts';
import { prepareActivityRecords, type ActivityInput, type ActivityFixture, type ActivityReferences, type ActivityMedia, type DivisionDefinition, type ProgrammeDefinition, type SourceDefinition } from './activity-model.ts';

// Curated public projections only. Private source URLs/rosters/financial/medical
// details are absent. Precise internal provenance belongs in fixture-ledger.md.
export const expeditionRecords: ActivityFixture[] = [
  {id:'te11',title:'Bukit Raya: lintas sungai, hutan hujan, dan catatan lapangan',program:'Tursina Explore',edition:'11',summary:'Ekspedisi 20 November-6 Desember 2024: perjalanan lintas moda menuju Rantau Malam, pendakian ke Puncak Kakam, serta kerja dokumentasi lingkungan dan sosial budaya.',state:'historical',location:'TN Bukit Baka Bukit Raya · Kalimantan',date:'20 November-6 Desember 2024',depth:'rich',evidenceLabel:'Draft LPJ TE11, bagian 1-4',href:'#/expedition/te11'},
  {id:'te12',title:'Trunyan',program:'Tursina Explore',edition:'12',summary:'LPJ Pengurus 2025 mencatat eksplorasi sosial budaya di Desa Trunyan. Cerita dan hasil lapangannya belum cukup terverifikasi untuk uraian panjang.',state:'historical',location:'Desa Trunyan · Bangli · Bali',date:'26 September-5 Oktober 2025',depth:'basic',evidenceLabel:'LPJ Pengurus 2025',href:'#/expedition/te12'},
];
export {syntheticMembers} from './institutional-data.ts';
export const publicWorks=projectPublications(publicationInputs,sourceDefinitions);


export const programmeDefinitions: ProgrammeDefinition[] = [
  {
    "id": "pd",
    "name": "Pemantapan Divisi",
    "href": "#/program/pd",
    "description": "Pendidikan lanjutan untuk mematangkan pengetahuan dan kemampuan anggota dalam bidang divisi."
  },
  {
    "id": "te",
    "name": "Tursina Explore",
    "href": "#/program/te",
    "description": "Ekspedisi dan edisi perjalanan yang terdokumentasi."
  }
];

export const divisionDefinitions: DivisionDefinition[] = [
  {
    "id": "GH",
    "name": "Gunung Hutan",
    "description": "Navigasi darat, manajemen perjalanan, dan pembelajaran di medan gunung serta hutan."
  },
  {
    "id": "RC",
    "name": "Panjat Tebing",
    "alias": "Rock Climbing",
    "description": "Pemanjatan, instalasi, pemetaan jalur, dan kerja tim di tebing."
  },
  {
    "id": "ORAD",
    "name": "Olahraga Arus Deras",
    "description": "Pengarungan, pembacaan sungai, teknik dayungan, dan pengenalan medan air."
  },
  {
    "id": "LH",
    "name": "Lingkungan Hidup",
    "description": "Pengamatan flora atau fauna, kondisi kawasan, dan penyajian hasil pengamatan."
  },
  {
    "id": "CAVING",
    "name": "Susur Gua",
    "alias": "Caving",
    "description": "Penelusuran dan pemetaan gua serta pengenalan instalasi dan kerja tim."
  }
];

export const activitySources=sourceDefinitions;

export const activityMedia: ActivityMedia[] = [
  {
    "id": "pd-gh-map",
    "activityId": "gh29",
    "role": "gh",
    "title": "Peta dan kompas di lapangan",
    "context": "Arsip foto memperlihatkan praktik peta-kompas dalam pendidikan Gunung Hutan XXIX.",
    "clearance": "hold",
    "creatorVerified": false
  },
  {
    "id": "pd-rc-team",
    "activityId": "rc29",
    "role": "rc",
    "title": "Pemanjatan dan kerja tim",
    "context": "Arsip foto memperlihatkan pemanjat dan tim di dasar tebing dalam pendidikan Panjat Tebing XXIX.",
    "clearance": "hold",
    "creatorVerified": false
  },
  {
    "id": "kawi-collective",
    "activityId": "kawi29",
    "role": "kawi",
    "title": "Kebersamaan Tursina",
    "context": "Dokumentasi kolektif Kawi XXIX; tidak menjadi dasar penetapan status individu.",
    "clearance": "hold",
    "creatorVerified": false
  },
  {
    "id": "batafia-field",
    "activityId": "batafia30",
    "role": "batafia",
    "title": "Pendidikan dasar di lapangan",
    "context": "Dokumentasi BATAFIA XXX memperlihatkan kegiatan bersama di medan terbuka.",
    "clearance": "hold",
    "creatorVerified": false
  }
];

export const activityInputs: ActivityInput[] = [
  {
    "id": "gh26",
    "title": "Pemantapan Divisi Gunung Hutan XXVI",
    "summary": "Pelaksanaan Gunung Hutan di Gunung Slamet tercatat dalam LPJ Pengurus 2023–2024. Laporan divisi lengkap belum dikurasi untuk uraian perjalanan.",
    "kind": "division-education",
    "depth": "basic",
    "state": "historical",
    "sourceUses": [
      {
        "sourceId": "lpj-2023-24",
        "locator": "Pemantapan Divisi XXVI, PDF fisik hlm.52–53"
      }
    ],
    "editorial": {
      "verification": "source-checked",
      "readiness": "review-draft",
      "website": "prototype",
      "report": "not-verified"
    },
    "location": "Gunung Slamet",
    "when": {
      "label": "19–26 Agustus 2023",
      "start": "2023-08-19",
      "end": "2023-08-26",
      "precision": "day-range"
    },
    "programId": "pd",
    "divisionIds": [
      "GH"
    ],
    "cohortIds": [
      "XXVI"
    ],
    "uncertainties": [
      {
        "title": "Batas catatan yang tersedia",
        "explanation": "Tanggal dan tempat bersumber dari ringkasan LPJ pengurus. Rute, hasil teknis, dan pengesahan laporan divisi tidak disimpulkan dari ringkasan ini.",
        "sourceIds": [
          "lpj-2023-24"
        ]
      }
    ]
  },
  {
    "id": "gh29",
    "title": "Pemantapan Divisi Gunung Hutan XXIX",
    "summary": "Praktik lapangan Gunung Hutan di Gunung Lawu. Arsip foto memperlihatkan kerja peta-kompas, pengamatan medan, dan dokumentasi puncak.",
    "kind": "division-education",
    "depth": "rich",
    "state": "historical",
    "sourceUses": [
      {
        "sourceId": "lpj-2025",
        "locator": "Pemantapan Divisi XXIX, halaman fisik 91–93 / cetak 85–87; standar hlm.78 / cetak 72"
      },
      {
        "sourceId": "humed-gh29",
        "locator": "Foto terpilih ditinjau pada Step2; lokasi sumber dan izin berada dalam register privat"
      }
    ],
    "editorial": {
      "verification": "source-checked",
      "readiness": "review-draft",
      "website": "prototype",
      "report": "submission-delays-reported"
    },
    "location": "Gunung Lawu",
    "when": {
      "label": "1-8 Agustus 2025",
      "start": "2025-08-01",
      "end": "2025-08-08",
      "precision": "day-range"
    },
    "programId": "pd",
    "divisionIds": [
      "GH"
    ],
    "cohortIds": [
      "XXIX"
    ],
    "chapters": [
      {
        "id": "preparation",
        "title": "Dari persiapan menuju spesialisasi.",
        "paragraphs": [
          "LPJ mencatat rangkaian pematerian dan latihan, presentasi proposal, serta simulasi sebelum pelaksanaan spesialisasi. Setelah kegiatan, presentasi laporan menjadi bagian dari rangkaian pendidikan.",
          "Catatan Gunung Hutan XXIX ditempatkan dalam rangkaian tersebut. Arsip foto memberi contoh konkret kerja peta-kompas dan pengamatan medan; foto tidak membuktikan seluruh standar telah dipenuhi."
        ],
        "sourceIds": [
          "lpj-2025",
          "humed-gh29"
        ]
      }
    ],
    "learning": {
      "title": "Navigasi dan pengelolaan perjalanan.",
      "context": "Ruang belajar berikut diringkas dari standar divisi dalam dokumen 2025. Ini sasaran pembelajaran, bukan sertifikasi atau daftar pencapaian terverifikasi kegiatan.",
      "items": [
        "Navigasi darat manual dan digital.",
        "Manajemen perjalanan, gizi, dan ekspedisi.",
        "Pengenalan survival dan pengamatan lingkungan perjalanan.",
        "Konteks sosial masyarakat serta peranan gunung bagi lingkungan."
      ],
      "sourceIds": [
        "lpj-2025"
      ]
    },
    "materials": [
      {
        "title": "Standarisasi Pemantapan Divisi 2025 / Gunung Hutan",
        "availability": "reference-only",
        "sourceId": "lpj-2025"
      }
    ],
    "mediaIds": [
      "pd-gh-map"
    ],
    "uncertainties": [
      {
        "title": "Wilayah yang belum lengkap",
        "explanation": "Baris tempat dalam laporan berhenti setelah “Kabupaten”. Halaman mempertahankan Gunung Lawu tanpa menambahkan nama kabupaten dari dugaan.",
        "sourceIds": [
          "lpj-2025"
        ]
      }
    ]
  },
  {
    "id": "rc29",
    "title": "Pemantapan Divisi Panjat Tebing XXIX",
    "summary": "Spesialisasi Panjat Tebing di Tebing Siung. Catatan program memuat pemanjatan, instalasi, pemetaan jalur, rescue group, dan konteks sosial setempat sebagai sasaran pembelajaran.",
    "kind": "division-education",
    "depth": "rich",
    "state": "historical",
    "sourceUses": [
      {
        "sourceId": "lpj-2025",
        "locator": "Pemantapan Divisi XXIX, halaman fisik 91–93 / cetak 85–87; standar hlm.78–79 / cetak 72–73"
      },
      {
        "sourceId": "humed-rc29",
        "locator": "Foto terpilih ditinjau pada Step2; lokasi sumber dan izin berada dalam register privat"
      }
    ],
    "editorial": {
      "verification": "source-checked",
      "readiness": "review-draft",
      "website": "prototype",
      "report": "submission-delays-reported"
    },
    "location": "Tebing Siung · Gunung Kidul",
    "when": {
      "label": "8-15 Agustus 2025",
      "start": "2025-08-08",
      "end": "2025-08-15",
      "precision": "day-range"
    },
    "programId": "pd",
    "divisionIds": [
      "RC"
    ],
    "cohortIds": [
      "XXIX"
    ],
    "chapters": [
      {
        "id": "field-practice",
        "title": "Belajar di tebing sebagai kerja tim.",
        "paragraphs": [
          "Pelaksanaan Panjat Tebing XXIX tercatat di Tebing Siung. Seperti rangkaian PD lainnya dalam LPJ, persiapan mencakup latihan, presentasi proposal dan simulasi, lalu diikuti presentasi laporan.",
          "Arsip dokumentasi memperlihatkan pemanjatan dan kerja tim di dasar tebing. Catatan ini tidak menambahkan grade jalur, klaim keselamatan, keberhasilan rescue, atau sertifikasi yang belum dibuktikan oleh laporan rinci."
        ],
        "sourceIds": [
          "lpj-2025",
          "humed-rc29"
        ]
      }
    ],
    "learning": {
      "title": "Pemanjatan, instalasi, dan pembacaan jalur.",
      "context": "Dokumen2025 menyebut ruang belajar berikut. Target standar dipisahkan dari hasil teknis yang telah terverifikasi.",
      "items": [
        "Artificial climbing dan sport climbing.",
        "Instalasi anchor dan pemetaan jalur pemanjatan.",
        "Pengenalan rescue group sebagai bagian standar belajar.",
        "Konteks sosial masyarakat serta peranan tebing bagi lingkungan."
      ],
      "sourceIds": [
        "lpj-2025"
      ]
    },
    "materials": [
      {
        "title": "Standarisasi Pemantapan Divisi 2025 / Panjat Tebing",
        "availability": "reference-only",
        "sourceId": "lpj-2025"
      }
    ],
    "mediaIds": [
      "pd-rc-team"
    ]
  },
  {
    "id": "orad29",
    "title": "Pemantapan Divisi Olahraga Arus Deras XXIX",
    "summary": "Pelaksanaan ORAD tercatat di Sungai Progo. Narasi teknis pengarungan dan hasil karya belum dikurasi untuk publik.",
    "kind": "division-education",
    "depth": "basic",
    "state": "historical",
    "sourceUses": [
      {
        "sourceId": "lpj-2025",
        "locator": "Pemantapan Divisi XXIX, halaman fisik 92–93 / cetak 86–87"
      }
    ],
    "editorial": {
      "verification": "source-checked",
      "readiness": "review-draft",
      "website": "prototype",
      "report": "not-verified"
    },
    "location": "Sungai Progo · Magelang",
    "when": {
      "label": "31 Juli-9 Agustus 2025",
      "start": "2025-07-31",
      "end": "2025-08-09",
      "precision": "day-range"
    },
    "programId": "pd",
    "divisionIds": [
      "ORAD"
    ],
    "cohortIds": [
      "XXIX"
    ]
  },
  {
    "id": "lh29",
    "title": "Pemantapan Divisi Lingkungan Hidup XXIX",
    "summary": "Pelaksanaan Lingkungan Hidup tercatat di Plunyon Kalikuning. Temuan lapangan dan karya belum cukup terverifikasi untuk ditampilkan.",
    "kind": "division-education",
    "depth": "basic",
    "state": "historical",
    "sourceUses": [
      {
        "sourceId": "lpj-2025",
        "locator": "Pemantapan Divisi XXIX, halaman fisik 92–93 / cetak 86–87"
      }
    ],
    "editorial": {
      "verification": "source-checked",
      "readiness": "review-draft",
      "website": "prototype",
      "report": "not-verified"
    },
    "location": "Plunyon Kalikuning · Sleman",
    "when": {
      "label": "3-8 Agustus 2025",
      "start": "2025-08-03",
      "end": "2025-08-08",
      "precision": "day-range"
    },
    "programId": "pd",
    "divisionIds": [
      "LH"
    ],
    "cohortIds": [
      "XXIX"
    ]
  },
  {
    "id": "caving29",
    "title": "Pemantapan Divisi Susur Gua XXIX",
    "summary": "Pelaksanaan Susur Gua tercatat di Gua Temanten dan Gua Nguwik. Peta dan hasil teknis belum dikurasi dari laporan divisi.",
    "kind": "division-education",
    "depth": "basic",
    "state": "historical",
    "sourceUses": [
      {
        "sourceId": "lpj-2025",
        "locator": "Pemantapan Divisi XXIX, halaman fisik 92–93 / cetak 86–87"
      }
    ],
    "editorial": {
      "verification": "source-checked",
      "readiness": "review-draft",
      "website": "prototype",
      "report": "not-verified"
    },
    "location": "Gua Temanten & Gua Nguwik · Purworejo",
    "when": {
      "label": "14-20 Agustus 2025",
      "start": "2025-08-14",
      "end": "2025-08-20",
      "precision": "day-range"
    },
    "programId": "pd",
    "divisionIds": [
      "CAVING"
    ],
    "cohortIds": [
      "XXIX"
    ]
  },
  {
    "id": "kawi29",
    "title": "Gunung Kawi XXIX",
    "summary": "Napak tilas dan rangkaian peralihan keanggotaan di Pegunungan Kawi. LPJ menyatakan pendakian tanpa pelaporan; uraian hasil tidak direka.",
    "kind": "institutional-continuity",
    "depth": "basic",
    "state": "historical",
    "sourceUses": [
      {
        "sourceId": "lpj-2025",
        "locator": "Pendakian Kawi Angkatan XXIX, halaman fisik 96–97 / cetak 90–91"
      }
    ],
    "editorial": {
      "verification": "source-checked",
      "readiness": "review-draft",
      "website": "prototype",
      "report": "without-report-as-described"
    },
    "location": "Pegunungan Kawi",
    "when": {
      "label": "21–23 November 2025",
      "start": "2025-11-21",
      "end": "2025-11-23",
      "precision": "day-range"
    },
    "cohortIds": [
      "XXIX"
    ],
    "chapters": [
      {
        "id": "continuity",
        "title": "Napak tilas dalam perjalanan organisasi.",
        "paragraphs": [
          "LPJ menjelaskan Kawi sebagai napak tilas dan jenjang pendidikan terakhir sebelum peralihan ke Anggota Biasa. Halaman ini menyajikan konteks kegiatan, bukan penetapan status keanggotaan siapa pun."
        ],
        "sourceIds": [
          "lpj-2025"
        ]
      }
    ],
    "mediaIds": [
      "kawi-collective"
    ],
    "relatedActivityIds": [
      "gh29",
      "rc29"
    ],
    "uncertainties": [
      {
        "title": "Konteks kelembagaan, bukan kisah ritual",
        "explanation": "Bentuk kegiatan dalam LPJ disebut pendakian tanpa pelaporan. Detail upacara, identitas peserta, dan hasil rinci tidak direproduksi. Hubungan ke PD XXIX adalah konteks pendidikan yang disebut dalam laporan, bukan pencocokan peserta.",
        "sourceIds": [
          "lpj-2025"
        ]
      }
    ]
  },
  {
    "id": "batafia30",
    "title": "BATAFIA XXX — diklat lapang",
    "summary": "Pendidikan dasar di Pegunungan Kawi. LPJ mencatat pemendekan rute dari 18 km menjadi 16 km. Tanggal forum terpisah belum direkonsiliasi.",
    "kind": "basic-education",
    "depth": "basic",
    "state": "historical",
    "sourceUses": [
      {
        "sourceId": "lpj-2025",
        "locator": "BATAFIA XXX, halaman fisik 94–96 / cetak 88–90"
      }
    ],
    "editorial": {
      "verification": "source-checked",
      "readiness": "review-draft",
      "website": "prototype",
      "report": "not-verified"
    },
    "location": "Pegunungan Kawi",
    "when": {
      "label": "24–26 Oktober 2025",
      "start": "2025-10-24",
      "end": "2025-10-26",
      "precision": "day-range"
    },
    "cohortIds": [
      "XXX"
    ],
    "chapters": [
      {
        "id": "basic-education",
        "title": "Pendidikan dasar melalui forum dan lapangan.",
        "paragraphs": [
          "LPJ menggambarkan BATAFIA XXX sebagai pendidikan dasar dengan bentuk forum dan kegiatan lapangan. Tanggal di atas hanya mewakili pelaksanaan lapangan yang tercatat di Pegunungan Kawi.",
          "Evaluasi laporan mencatat penyesuaian panjang rute dari 18 km menjadi 16 km. Informasi ini dipertahankan sebagai hal yang dilaporkan, tanpa menambahkan klaim pencapaian teknis atau jadwal penerimaan anggota yang berlaku saat ini."
        ],
        "sourceIds": [
          "lpj-2025"
        ]
      }
    ],
    "mediaIds": [
      "batafia-field"
    ],
    "uncertainties": [
      {
        "title": "Tanggal forum belum selaras",
        "explanation": "Baris forum dalam sumber mengulang penamaan September pada rangkaian tanggal yang belum direkonsiliasi. Tanggal forum tidak ditampilkan sebagai kepastian dan tidak diubah menjadi Oktober dari dugaan.",
        "sourceIds": [
          "lpj-2025"
        ]
      }
    ]
  },
  {
    "id": "workshop-demo",
    "title": "Lokakarya dokumentasi kegiatan",
    "summary": "Contoh sintetis kegiatan mandiri: belajar memilih, memberi konteks, dan menyiapkan dokumentasi untuk editor.",
    "state": "planned",
    "kind": "workshop",
    "depth": "basic",
    "sourceUses": [
      {
        "sourceId": "synthetic-fixture",
        "locator": "Fixture prototipe; bukan kegiatan atau jadwal institusi"
      }
    ],
    "editorial": {
      "verification": "synthetic",
      "readiness": "review-draft",
      "website": "prototype"
    }
  }
];

export const activityReferences: ActivityReferences = { programmes: programmeDefinitions, divisions: divisionDefinitions, sources: activitySources, media: activityMedia, publicationIds: publicWorks.map(w => w.id) };
export const activityRecords = prepareActivityRecords(activityInputs, activityReferences);
// Existing exports are projections of the same records, never competing authored stores.
export const pdRecords = activityRecords.filter(r => r.programId === "pd");
export const archivalActivities = activityRecords.filter(r => !r.programId && r.editorial.verification !== "synthetic");
export const standalone = activityRecords.find(r => r.id === "workshop-demo")!;

validatePublications(publicWorks,{sources:sourceDefinitions,activityIds:[...expeditionRecords,...activityRecords].map(r=>r.id),programmeIds:programmeDefinitions.map(r=>r.id)});
