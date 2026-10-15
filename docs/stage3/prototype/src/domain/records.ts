import type {InstitutionalRegistry} from './contract.ts';
// Canonical public-safe editorial records. No private originals or custody locators.
export const institutionalContent = {
  "version": "5c2a.1",
  "programmes": [
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
  ],
  "divisions": [
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
  ],
  "cohorts": [
    {
      "id": "XXVI",
      "label": "XXVI"
    },
    {
      "id": "XXVII",
      "label": "XXVII"
    },
    {
      "id": "XXVIII",
      "label": "XXVIII"
    },
    {
      "id": "XXIX",
      "label": "XXIX"
    },
    {
      "id": "XXX",
      "label": "XXX"
    }
  ],
  "periods": [
    {
      "id": "period-2022-23",
      "label": "Periode 2022–23",
      "sourceUses": [
        {
          "sourceId": "lpj-2022-23",
          "locator": "judul dokumen"
        }
      ]
    },
    {
      "id": "period-2023-24",
      "label": "Periode 2023–24",
      "sourceUses": [
        {
          "sourceId": "lpj-2023-24",
          "locator": "judul dokumen"
        }
      ]
    },
    {
      "id": "period-2024-25",
      "label": "Periode 2024–25",
      "sourceUses": [
        {
          "sourceId": "lpj-2024-25",
          "locator": "judul dokumen"
        }
      ]
    }
  ],
  "editions": [
    {
      "id": "te10-edition",
      "programmeId": "te",
      "label": "10"
    },
    {
      "id": "te11-edition",
      "programmeId": "te",
      "label": "11"
    },
    {
      "id": "te12-edition",
      "programmeId": "te",
      "label": "12"
    }
  ],
  "activities": [
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
      ],
      "dates": {
        "presentation": {
          "label": "19–26 Agustus 2023",
          "assertionId": "primary"
        },
        "assertions": [
          {
            "id": "primary",
            "role": "execution",
            "value": {
              "precision": "day-range",
              "start": "2023-08-19",
              "end": "2023-08-26"
            },
            "sourceUses": [
              {
                "sourceId": "lpj-2023-24",
                "locator": "Pemantapan Divisi XXVI, PDF fisik hlm.52–53"
              }
            ]
          }
        ],
        "reconciliation": "single-source"
      },
      "places": {
        "presentation": "Gunung Slamet",
        "assertions": [
          {
            "id": "reported",
            "label": "Gunung Slamet",
            "sourceUses": [
              {
                "sourceId": "lpj-2023-24",
                "locator": "Pemantapan Divisi XXVI, PDF fisik hlm.52–53"
              }
            ]
          }
        ],
        "reconciliation": "single-source"
      },
      "publication": {
        "institutionalAuthority": "owner-designated",
        "scope": "prototype-metadata-and-editorial-summary",
        "approval": "prototype-scope-authorized",
        "website": "preview",
        "originalReproduction": "not-authorized"
      }
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
        ],
        "basis": "documented-standard-not-achievement"
      },
      "materials": [
        {
          "title": "Standarisasi Pemantapan Divisi 2025 / Gunung Hutan",
          "availability": "reference-only",
          "sourceId": "lpj-2025"
        }
      ],
      "uncertainties": [
        {
          "title": "Wilayah yang belum lengkap",
          "explanation": "Baris tempat dalam laporan berhenti setelah “Kabupaten”. Halaman mempertahankan Gunung Lawu tanpa menambahkan nama kabupaten dari dugaan.",
          "sourceIds": [
            "lpj-2025"
          ]
        }
      ],
      "dates": {
        "presentation": {
          "label": "1-8 Agustus 2025",
          "assertionId": "primary"
        },
        "assertions": [
          {
            "id": "primary",
            "role": "execution",
            "value": {
              "precision": "day-range",
              "start": "2025-08-01",
              "end": "2025-08-08"
            },
            "sourceUses": [
              {
                "sourceId": "lpj-2025",
                "locator": "Pemantapan Divisi XXIX, halaman fisik 91–93 / cetak 85–87; standar hlm.78 / cetak 72"
              },
              {
                "sourceId": "humed-gh29",
                "locator": "Foto terpilih ditinjau pada Step2; lokasi sumber dan izin berada dalam register privat"
              }
            ]
          }
        ],
        "reconciliation": "single-source"
      },
      "places": {
        "presentation": "Gunung Lawu",
        "assertions": [
          {
            "id": "reported",
            "label": "Gunung Lawu",
            "sourceUses": [
              {
                "sourceId": "lpj-2025",
                "locator": "Pemantapan Divisi XXIX, halaman fisik 91–93 / cetak 85–87; standar hlm.78 / cetak 72"
              },
              {
                "sourceId": "humed-gh29",
                "locator": "Foto terpilih ditinjau pada Step2; lokasi sumber dan izin berada dalam register privat"
              }
            ]
          }
        ],
        "reconciliation": "incomplete"
      },
      "publication": {
        "institutionalAuthority": "owner-designated",
        "scope": "prototype-metadata-and-editorial-summary",
        "approval": "prototype-scope-authorized",
        "website": "preview",
        "originalReproduction": "not-authorized"
      }
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
        ],
        "basis": "documented-standard-not-achievement"
      },
      "materials": [
        {
          "title": "Standarisasi Pemantapan Divisi 2025 / Panjat Tebing",
          "availability": "reference-only",
          "sourceId": "lpj-2025"
        }
      ],
      "dates": {
        "presentation": {
          "label": "8-15 Agustus 2025",
          "assertionId": "primary"
        },
        "assertions": [
          {
            "id": "primary",
            "role": "execution",
            "value": {
              "precision": "day-range",
              "start": "2025-08-08",
              "end": "2025-08-15"
            },
            "sourceUses": [
              {
                "sourceId": "lpj-2025",
                "locator": "Pemantapan Divisi XXIX, halaman fisik 91–93 / cetak 85–87; standar hlm.78–79 / cetak 72–73"
              },
              {
                "sourceId": "humed-rc29",
                "locator": "Foto terpilih ditinjau pada Step2; lokasi sumber dan izin berada dalam register privat"
              }
            ]
          }
        ],
        "reconciliation": "single-source"
      },
      "places": {
        "presentation": "Tebing Siung · Gunung Kidul",
        "assertions": [
          {
            "id": "reported",
            "label": "Tebing Siung · Gunung Kidul",
            "sourceUses": [
              {
                "sourceId": "lpj-2025",
                "locator": "Pemantapan Divisi XXIX, halaman fisik 91–93 / cetak 85–87; standar hlm.78–79 / cetak 72–73"
              },
              {
                "sourceId": "humed-rc29",
                "locator": "Foto terpilih ditinjau pada Step2; lokasi sumber dan izin berada dalam register privat"
              }
            ]
          }
        ],
        "reconciliation": "single-source"
      },
      "publication": {
        "institutionalAuthority": "owner-designated",
        "scope": "prototype-metadata-and-editorial-summary",
        "approval": "prototype-scope-authorized",
        "website": "preview",
        "originalReproduction": "not-authorized"
      }
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
      "programId": "pd",
      "divisionIds": [
        "ORAD"
      ],
      "cohortIds": [
        "XXIX"
      ],
      "dates": {
        "presentation": {
          "label": "31 Juli-9 Agustus 2025",
          "assertionId": "primary"
        },
        "assertions": [
          {
            "id": "primary",
            "role": "execution",
            "value": {
              "precision": "day-range",
              "start": "2025-07-31",
              "end": "2025-08-09"
            },
            "sourceUses": [
              {
                "sourceId": "lpj-2025",
                "locator": "Pemantapan Divisi XXIX, halaman fisik 92–93 / cetak 86–87"
              }
            ]
          }
        ],
        "reconciliation": "single-source"
      },
      "places": {
        "presentation": "Sungai Progo · Magelang",
        "assertions": [
          {
            "id": "reported",
            "label": "Sungai Progo · Magelang",
            "sourceUses": [
              {
                "sourceId": "lpj-2025",
                "locator": "Pemantapan Divisi XXIX, halaman fisik 92–93 / cetak 86–87"
              }
            ]
          }
        ],
        "reconciliation": "single-source"
      },
      "publication": {
        "institutionalAuthority": "owner-designated",
        "scope": "prototype-metadata-and-editorial-summary",
        "approval": "prototype-scope-authorized",
        "website": "preview",
        "originalReproduction": "not-authorized"
      }
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
      "programId": "pd",
      "divisionIds": [
        "LH"
      ],
      "cohortIds": [
        "XXIX"
      ],
      "dates": {
        "presentation": {
          "label": "3-8 Agustus 2025",
          "assertionId": "primary"
        },
        "assertions": [
          {
            "id": "primary",
            "role": "execution",
            "value": {
              "precision": "day-range",
              "start": "2025-08-03",
              "end": "2025-08-08"
            },
            "sourceUses": [
              {
                "sourceId": "lpj-2025",
                "locator": "Pemantapan Divisi XXIX, halaman fisik 92–93 / cetak 86–87"
              }
            ]
          }
        ],
        "reconciliation": "single-source"
      },
      "places": {
        "presentation": "Plunyon Kalikuning · Sleman",
        "assertions": [
          {
            "id": "reported",
            "label": "Plunyon Kalikuning · Sleman",
            "sourceUses": [
              {
                "sourceId": "lpj-2025",
                "locator": "Pemantapan Divisi XXIX, halaman fisik 92–93 / cetak 86–87"
              }
            ]
          }
        ],
        "reconciliation": "single-source"
      },
      "publication": {
        "institutionalAuthority": "owner-designated",
        "scope": "prototype-metadata-and-editorial-summary",
        "approval": "prototype-scope-authorized",
        "website": "preview",
        "originalReproduction": "not-authorized"
      }
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
      "programId": "pd",
      "divisionIds": [
        "CAVING"
      ],
      "cohortIds": [
        "XXIX"
      ],
      "dates": {
        "presentation": {
          "label": "14-20 Agustus 2025",
          "assertionId": "primary"
        },
        "assertions": [
          {
            "id": "primary",
            "role": "execution",
            "value": {
              "precision": "day-range",
              "start": "2025-08-14",
              "end": "2025-08-20"
            },
            "sourceUses": [
              {
                "sourceId": "lpj-2025",
                "locator": "Pemantapan Divisi XXIX, halaman fisik 92–93 / cetak 86–87"
              }
            ]
          }
        ],
        "reconciliation": "single-source"
      },
      "places": {
        "presentation": "Gua Temanten & Gua Nguwik · Purworejo",
        "assertions": [
          {
            "id": "reported",
            "label": "Gua Temanten & Gua Nguwik · Purworejo",
            "sourceUses": [
              {
                "sourceId": "lpj-2025",
                "locator": "Pemantapan Divisi XXIX, halaman fisik 92–93 / cetak 86–87"
              }
            ]
          }
        ],
        "reconciliation": "single-source"
      },
      "publication": {
        "institutionalAuthority": "owner-designated",
        "scope": "prototype-metadata-and-editorial-summary",
        "approval": "prototype-scope-authorized",
        "website": "preview",
        "originalReproduction": "not-authorized"
      }
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
      "uncertainties": [
        {
          "title": "Konteks kelembagaan, bukan kisah ritual",
          "explanation": "Bentuk kegiatan dalam LPJ disebut pendakian tanpa pelaporan. Detail upacara, identitas peserta, dan hasil rinci tidak direproduksi. Hubungan ke PD XXIX adalah konteks pendidikan yang disebut dalam laporan, bukan pencocokan peserta.",
          "sourceIds": [
            "lpj-2025"
          ]
        }
      ],
      "dates": {
        "presentation": {
          "label": "21–23 November 2025",
          "assertionId": "primary"
        },
        "assertions": [
          {
            "id": "primary",
            "role": "execution",
            "value": {
              "precision": "day-range",
              "start": "2025-11-21",
              "end": "2025-11-23"
            },
            "sourceUses": [
              {
                "sourceId": "lpj-2025",
                "locator": "Pendakian Kawi Angkatan XXIX, halaman fisik 96–97 / cetak 90–91"
              }
            ]
          }
        ],
        "reconciliation": "single-source"
      },
      "places": {
        "presentation": "Pegunungan Kawi",
        "assertions": [
          {
            "id": "reported",
            "label": "Pegunungan Kawi",
            "sourceUses": [
              {
                "sourceId": "lpj-2025",
                "locator": "Pendakian Kawi Angkatan XXIX, halaman fisik 96–97 / cetak 90–91"
              }
            ]
          }
        ],
        "reconciliation": "single-source"
      },
      "publication": {
        "institutionalAuthority": "owner-designated",
        "scope": "prototype-metadata-and-editorial-summary",
        "approval": "prototype-scope-authorized",
        "website": "preview",
        "originalReproduction": "not-authorized"
      }
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
      "uncertainties": [
        {
          "title": "Tanggal forum belum selaras",
          "explanation": "Baris forum dalam sumber mengulang penamaan September pada rangkaian tanggal yang belum direkonsiliasi. Tanggal forum tidak ditampilkan sebagai kepastian dan tidak diubah menjadi Oktober dari dugaan.",
          "sourceIds": [
            "lpj-2025"
          ]
        }
      ],
      "dates": {
        "presentation": {
          "label": "24–26 Oktober 2025",
          "assertionId": "primary"
        },
        "assertions": [
          {
            "id": "primary",
            "role": "execution",
            "value": {
              "precision": "day-range",
              "start": "2025-10-24",
              "end": "2025-10-26"
            },
            "sourceUses": [
              {
                "sourceId": "lpj-2025",
                "locator": "BATAFIA XXX, halaman fisik 94–96 / cetak 88–90"
              }
            ]
          }
        ],
        "reconciliation": "single-source"
      },
      "places": {
        "presentation": "Pegunungan Kawi",
        "assertions": [
          {
            "id": "reported",
            "label": "Pegunungan Kawi",
            "sourceUses": [
              {
                "sourceId": "lpj-2025",
                "locator": "BATAFIA XXX, halaman fisik 94–96 / cetak 88–90"
              }
            ]
          }
        ],
        "reconciliation": "single-source"
      },
      "dateIssues": [
        {
          "scope": "forum",
          "explanation": "Penamaan September dalam rangkaian forum belum direkonsiliasi; tidak diganti menjadi Oktober.",
          "sourceUses": [
            {
              "sourceId": "lpj-2025",
              "locator": "BATAFIA XXX / fisik 94–96"
            }
          ]
        }
      ],
      "publication": {
        "institutionalAuthority": "owner-designated",
        "scope": "prototype-metadata-and-editorial-summary",
        "approval": "prototype-scope-authorized",
        "website": "preview",
        "originalReproduction": "not-authorized"
      }
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
      },
      "dates": {
        "presentation": {
          "label": "Tanggal belum terverifikasi"
        },
        "assertions": [],
        "reconciliation": "unknown"
      },
      "places": {
        "assertions": [],
        "reconciliation": "unknown"
      },
      "publication": {
        "institutionalAuthority": "owner-designated",
        "scope": "prototype-metadata-and-editorial-summary",
        "approval": "prototype-scope-authorized",
        "website": "preview",
        "originalReproduction": "not-authorized"
      }
    },
    {
      "id": "te11",
      "title": "Bukit Raya: lintas sungai, hutan hujan, dan catatan lapangan",
      "summary": "Ekspedisi 20 November-6 Desember 2024: perjalanan lintas moda menuju Rantau Malam, pendakian ke Puncak Kakam, serta kerja dokumentasi lingkungan dan sosial budaya.",
      "state": "historical",
      "depth": "rich",
      "kind": "expedition",
      "programId": "te",
      "editionId": "te11-edition",
      "sourceUses": [
        {
          "sourceId": "te11-report",
          "locator": "§§1–4"
        }
      ],
      "editorial": {
        "verification": "source-checked",
        "readiness": "review-draft",
        "website": "prototype"
      },
      "dates": {
        "presentation": {
          "label": "20 November-6 Desember 2024",
          "assertionId": "primary"
        },
        "assertions": [
          {
            "id": "primary",
            "role": "execution",
            "value": {
              "precision": "day-range",
              "start": "2024-11-20",
              "end": "2024-12-06"
            },
            "sourceUses": [
              {
                "sourceId": "te11-report",
                "locator": "§§1–4"
              }
            ]
          },
          {
            "id": "chronology-end",
            "role": "execution",
            "value": {
              "precision": "day-range",
              "start": "2024-11-20",
              "end": "2024-12-07"
            },
            "sourceUses": [
              {
                "sourceId": "te11-report",
                "locator": "§3.1 kronologi kepulangan"
              },
              {
                "sourceId": "lpj-2024-25",
                "locator": "PDF fisik 85 / cetak 79"
              }
            ]
          },
          {
            "id": "earlier-plan",
            "role": "planned",
            "value": {
              "precision": "day-range",
              "start": "2023-12-24",
              "end": "2024-01-14"
            },
            "sourceUses": [
              {
                "sourceId": "lpj-2023-24",
                "locator": "PDF fisik 62 / rencana pada periode 2023–2024, tidak terlaksana"
              }
            ]
          }
        ],
        "reconciliation": "unresolved"
      },
      "places": {
        "presentation": "TN Bukit Baka Bukit Raya · Kalimantan",
        "reconciliation": "unresolved",
        "assertions": [
          {
            "id": "west",
            "label": "Kalimantan Barat",
            "sourceUses": [
              {
                "sourceId": "te11-report",
                "locator": "sampul / kesimpulan"
              },
              {
                "sourceId": "lpj-2024-25",
                "locator": "PDF fisik 85"
              }
            ]
          },
          {
            "id": "central",
            "label": "Kalimantan Tengah",
            "sourceUses": [
              {
                "sourceId": "te11-report",
                "locator": "§2.2 pelaksanaan"
              }
            ]
          }
        ]
      },
      "periodAssertions": [
        {
          "periodId": "period-2023-24",
          "state": "not-executed-in-period",
          "sourceUses": [
            {
              "sourceId": "lpj-2023-24",
              "locator": "PDF fisik 62 / Program Kerja Tidak Terlaksana"
            }
          ]
        },
        {
          "periodId": "period-2024-25",
          "state": "execution-reported",
          "sourceUses": [
            {
              "sourceId": "lpj-2024-25",
              "locator": "PDF fisik 85–86"
            }
          ]
        }
      ],
      "narrative": {
        "displayTitle": "Bukit Raya",
        "deck": "Perjalanan lintas moda, hutan hujan, dan pengalaman lapangan yang dirawat menjadi catatan bersama.",
        "precisionNote": "Wilayah ditulis Kalimantan karena penamaan provinsi belum selaras dalam sumber. Rentang di atas mengikuti tanggal utama laporan.",
        "context": {
          "title": "Perjalanan dimulai sebelum jalur pendakian.",
          "paragraphs": [
            "Tursina Explore #11 menghubungkan perjalanan menuju Bukit Raya dengan perhatian pada lingkungan dan pengalaman sosial budaya. Laporan kegiatan mencatat persiapan, perpindahan moda transportasi, pendakian, dokumentasi, dan kepulangan.",
            "Ringkasan ini membaca ekspedisi sebagai rangkaian kerja lapangan. Tujuan awal, pelaksanaan yang dilaporkan, dan karya yang sudah ditemukan tidak disamakan."
          ],
          "sourceUses": [
            {
              "sourceId": "te11-report",
              "locator": "§§1–4"
            }
          ]
        },
        "journeyTitle": "Darat, laut, sungai, lalu jalur hutan.",
        "journey": [
          {
            "title": "Dari Malang ke Tanjung Perak",
            "body": "Persiapan akhir dan upacara pemberangkatan mendahului perjalanan menuju pelabuhan di Surabaya.",
            "sourceUses": [
              {
                "sourceId": "te11-report",
                "locator": "§3.1–3.2"
              }
            ],
            "dates": {
              "presentation": {
                "label": "20–21 November 2024",
                "assertionId": "reported"
              },
              "assertions": [
                {
                  "id": "reported",
                  "role": "execution",
                  "value": {
                    "precision": "day-range",
                    "start": "2024-11-20",
                    "end": "2024-11-21"
                  },
                  "sourceUses": [
                    {
                      "sourceId": "te11-report",
                      "locator": "§3.1–3.2"
                    }
                  ]
                }
              ],
              "reconciliation": "single-source"
            }
          },
          {
            "title": "Menyeberangi Laut Jawa",
            "body": "KM Bukit Raya membawa tim dari Surabaya menuju Pontianak. Waktu di kapal juga dipakai untuk menyiapkan dokumentasi ekspedisi.",
            "sourceUses": [
              {
                "sourceId": "te11-report",
                "locator": "§3.1–3.2"
              }
            ],
            "dates": {
              "presentation": {
                "label": "21–23 November 2024",
                "assertionId": "reported"
              },
              "assertions": [
                {
                  "id": "reported",
                  "role": "execution",
                  "value": {
                    "precision": "day-range",
                    "start": "2024-11-21",
                    "end": "2024-11-23"
                  },
                  "sourceUses": [
                    {
                      "sourceId": "te11-report",
                      "locator": "§3.1–3.2"
                    }
                  ]
                }
              ],
              "reconciliation": "single-source"
            }
          },
          {
            "title": "Darat dan sungai menuju Rantau Malam",
            "body": "Perjalanan berlanjut melalui Nanga Pinoh, Serawai, dan Jelundung. Moda darat, speedboat, dan klotok menghubungkan rangkaian perjalanan.",
            "sourceUses": [
              {
                "sourceId": "te11-report",
                "locator": "§3.1–3.2"
              }
            ],
            "dates": {
              "presentation": {
                "label": "25–26 November 2024",
                "assertionId": "reported"
              },
              "assertions": [
                {
                  "id": "reported",
                  "role": "execution",
                  "value": {
                    "precision": "day-range",
                    "start": "2024-11-25",
                    "end": "2024-11-26"
                  },
                  "sourceUses": [
                    {
                      "sourceId": "te11-report",
                      "locator": "§3.1–3.2"
                    }
                  ]
                }
              ],
              "reconciliation": "single-source"
            }
          },
          {
            "title": "Menjalani jalur Bukit Raya",
            "body": "Laporan mencatat pendakian selama empat hari empat malam, dengan Puncak Kakam dicapai pada 29 November sekitar pukul 13.50.",
            "sourceUses": [
              {
                "sourceId": "te11-report",
                "locator": "§3.1–3.2"
              }
            ],
            "dates": {
              "presentation": {
                "label": "27–30 November 2024",
                "assertionId": "reported"
              },
              "assertions": [
                {
                  "id": "reported",
                  "role": "execution",
                  "value": {
                    "precision": "day-range",
                    "start": "2024-11-27",
                    "end": "2024-11-30"
                  },
                  "sourceUses": [
                    {
                      "sourceId": "te11-report",
                      "locator": "§3.1–3.2"
                    }
                  ]
                }
              ],
              "reconciliation": "single-source"
            }
          },
          {
            "title": "Kembali ke Rantau Malam",
            "body": "Waktu setelah pendakian dimanfaatkan untuk pengumpulan data dan interaksi di desa sebelum perjalanan pulang.",
            "sourceUses": [
              {
                "sourceId": "te11-report",
                "locator": "§3.1–3.2"
              }
            ],
            "dates": {
              "presentation": {
                "label": "1–2 Desember 2024",
                "assertionId": "reported"
              },
              "assertions": [
                {
                  "id": "reported",
                  "role": "execution",
                  "value": {
                    "precision": "day-range",
                    "start": "2024-12-01",
                    "end": "2024-12-02"
                  },
                  "sourceUses": [
                    {
                      "sourceId": "te11-report",
                      "locator": "§3.1–3.2"
                    }
                  ]
                }
              ],
              "reconciliation": "single-source"
            }
          },
          {
            "title": "Pulang melalui rute yang disesuaikan",
            "body": "Jadwal kapal mengubah rute pulang melalui Semarang dan dilanjutkan dengan kereta ke Malang. Rincian hari akhir berbeda antarbagian laporan.",
            "sourceUses": [
              {
                "sourceId": "te11-report",
                "locator": "§3.1–3.2"
              }
            ],
            "dates": {
              "presentation": {
                "label": "Desember 2024",
                "assertionId": "reported"
              },
              "assertions": [
                {
                  "id": "reported",
                  "role": "execution",
                  "value": {
                    "precision": "month",
                    "start": "2024-12"
                  },
                  "sourceUses": [
                    {
                      "sourceId": "te11-report",
                      "locator": "§3.1–3.2"
                    }
                  ]
                }
              ],
              "reconciliation": "single-source"
            }
          }
        ],
        "notes": [
          {
            "title": "Pengalaman lapangan menjadi bahan belajar.",
            "paragraphs": [
              "Laporan menyatakan pendakian selesai dalam empat hari empat malam. Waktu setelahnya memberi ruang untuk pengumpulan data dan interaksi di Rantau Malam. Milestone Puncak Kakam pada 29 November 2024 dicatat sebagai hasil yang dilaporkan tim.",
              "Perubahan jadwal transportasi dan rute pulang menjadi bagian dari evaluasi kegiatan. Laporan menyarankan perencanaan yang memperhatikan kalender anggota, aturan perjalanan, serta alternatif transportasi."
            ],
            "sourceUses": [
              {
                "sourceId": "te11-report",
                "locator": "§3–4"
              }
            ]
          },
          {
            "title": "Tujuan, pelaksanaan, dan karya tidak selalu sama.",
            "paragraphs": [
              "Rencana awal mencakup produksi dokumenter dan perhatian pada jejak karbon. Evaluasi laporan mencatat target video disederhanakan menjadi aftermovie; keberadaan film final belum diverifikasi pada kurasi ini.",
              "Carbon offsetting tercatat sebagai niat dan pendekatan dalam laporan. Halaman ini tidak menetapkan ekspedisi sebagai kegiatan netral karbon atau menyajikan angka karbon sebagai hasil verifikasi independen."
            ],
            "sourceUses": [
              {
                "sourceId": "te11-report",
                "locator": "§3–4"
              }
            ]
          }
        ],
        "sourceNotes": [
          "Tanggal utama laporan adalah 20 November–6 Desember 2024. Kronologi kepulangan menyeberang tengah malam dan bagian lain mencatat 7 Desember. Hari akhir belum direkonsiliasi; rentang utama dipertahankan sampai sumbernya selaras.",
          "Sampul dan kesimpulan menyebut Kalimantan Barat, sementara bagian pelaksanaan menyebut Kalimantan Tengah. Halaman memakai wilayah Kalimantan."
        ],
        "evidence": [
          "Ringkasan bersumber dari Draft LPJ Tursina Explore #11: §1.1 konteks program; §2.2 tanggal dan tempat; §3.1–3.2 kronologi; §4.1 evaluasi dan saran.",
          "Catatan publik bukan salinan laporan internal atau bukti pengesahan laporan organisasi. Identitas peserta, keuangan, kesehatan, dan lampiran privat tidak dimuat.",
          "Foto, kredit pencipta, dan ketentuan publikasi belum selesai. Artikel terkait ditampilkan sebagai karya terpisah; isi penuhnya memiliki pemeriksaan publikasi sendiri."
        ]
      },
      "publication": {
        "institutionalAuthority": "owner-designated",
        "scope": "prototype-metadata-and-editorial-summary",
        "approval": "prototype-scope-authorized",
        "website": "preview",
        "originalReproduction": "not-authorized"
      }
    },
    {
      "id": "te12",
      "title": "Trunyan",
      "summary": "LPJ Pengurus 2025 mencatat eksplorasi sosial budaya di Desa Trunyan. Cerita dan hasil lapangannya belum cukup terverifikasi untuk uraian panjang.",
      "state": "historical",
      "depth": "basic",
      "kind": "expedition",
      "programId": "te",
      "editionId": "te12-edition",
      "sourceUses": [
        {
          "sourceId": "lpj-2025",
          "locator": "Tursina Explore #12"
        }
      ],
      "editorial": {
        "verification": "source-checked",
        "readiness": "review-draft",
        "website": "prototype"
      },
      "dates": {
        "presentation": {
          "label": "26 September-5 Oktober 2025",
          "assertionId": "primary"
        },
        "assertions": [
          {
            "id": "primary",
            "role": "execution",
            "value": {
              "precision": "day-range",
              "start": "2025-09-26",
              "end": "2025-10-05"
            },
            "sourceUses": [
              {
                "sourceId": "lpj-2025",
                "locator": "Tursina Explore #12"
              }
            ]
          }
        ],
        "reconciliation": "single-source"
      },
      "places": {
        "presentation": "Desa Trunyan · Bangli · Bali",
        "assertions": [
          {
            "id": "reported",
            "label": "Desa Trunyan · Bangli · Bali",
            "sourceUses": [
              {
                "sourceId": "lpj-2025",
                "locator": "Tursina Explore #12"
              }
            ]
          }
        ],
        "reconciliation": "single-source"
      },
      "publication": {
        "institutionalAuthority": "owner-designated",
        "scope": "prototype-metadata-and-editorial-summary",
        "approval": "prototype-scope-authorized",
        "website": "preview",
        "originalReproduction": "not-authorized"
      }
    },
    {
      "id": "te10",
      "title": "Pulau Siberut",
      "summary": "LPJ mencatat penelitian dan eksplorasi budaya serta lingkungan di Pulau Siberut. Laporan menyebut film dokumenter dan artikel ilmiah, tetapi judul, isi, dan izin karya belum diperiksa.",
      "state": "historical",
      "kind": "expedition",
      "depth": "basic",
      "sourceUses": [
        {
          "sourceId": "lpj-2022-23",
          "locator": "DOCX fisik 61"
        }
      ],
      "editorial": {
        "verification": "source-checked",
        "readiness": "review-draft",
        "website": "prototype"
      },
      "dates": {
        "presentation": {
          "label": "20 Desember 2022 – 4 Januari 2023",
          "assertionId": "primary"
        },
        "assertions": [
          {
            "id": "primary",
            "role": "execution",
            "value": {
              "precision": "day-range",
              "start": "2022-12-20",
              "end": "2023-01-04"
            },
            "sourceUses": [
              {
                "sourceId": "lpj-2022-23",
                "locator": "DOCX fisik 61"
              }
            ]
          }
        ],
        "reconciliation": "single-source"
      },
      "places": {
        "presentation": "Pulau Siberut · Siberut Barat · Kepulauan Mentawai",
        "assertions": [
          {
            "id": "reported",
            "label": "Pulau Siberut · Siberut Barat · Kepulauan Mentawai",
            "sourceUses": [
              {
                "sourceId": "lpj-2022-23",
                "locator": "DOCX fisik 61"
              }
            ]
          }
        ],
        "reconciliation": "single-source"
      },
      "uncertainties": [
        {
          "title": "Batas ringkasan sumber",
          "explanation": "Metadata dan konteks diringkas dari laporan pengurus. Tidak memuat daftar peserta, penilaian individu, keuangan, atau klaim pencapaian teknis.",
          "sourceIds": [
            "lpj-2022-23"
          ]
        }
      ],
      "programId": "te",
      "editionId": "te10-edition",
      "periodAssertions": [
        {
          "periodId": "period-2022-23",
          "state": "execution-reported",
          "sourceUses": [
            {
              "sourceId": "lpj-2022-23",
              "locator": "DOCX fisik 61"
            }
          ]
        }
      ],
      "publication": {
        "institutionalAuthority": "owner-designated",
        "scope": "prototype-metadata-and-editorial-summary",
        "approval": "prototype-scope-authorized",
        "website": "preview",
        "originalReproduction": "not-authorized"
      }
    },
    {
      "id": "orad26",
      "title": "Pemantapan Divisi Olahraga Arus Deras XXVI",
      "summary": "Pelaksanaan Olahraga Arus Deras XXVI tercatat dalam LPJ. Ringkasan mempertahankan identitas kegiatan tanpa mengklaim seluruh standar divisi telah dicapai.",
      "state": "historical",
      "kind": "division-education",
      "depth": "basic",
      "sourceUses": [
        {
          "sourceId": "lpj-2023-24",
          "locator": "PDF fisik 51–53"
        }
      ],
      "editorial": {
        "verification": "source-checked",
        "readiness": "review-draft",
        "website": "prototype"
      },
      "dates": {
        "presentation": {
          "label": "19 Agustus 2023 – 26 Agustus 2023",
          "assertionId": "primary"
        },
        "assertions": [
          {
            "id": "primary",
            "role": "execution",
            "value": {
              "precision": "day-range",
              "start": "2023-08-19",
              "end": "2023-08-26"
            },
            "sourceUses": [
              {
                "sourceId": "lpj-2023-24",
                "locator": "PDF fisik 51–53"
              }
            ]
          }
        ],
        "reconciliation": "single-source"
      },
      "places": {
        "presentation": "Sungai Serayu · Jawa Tengah",
        "assertions": [
          {
            "id": "reported",
            "label": "Sungai Serayu · Jawa Tengah",
            "sourceUses": [
              {
                "sourceId": "lpj-2023-24",
                "locator": "PDF fisik 51–53"
              }
            ]
          }
        ],
        "reconciliation": "single-source"
      },
      "uncertainties": [
        {
          "title": "Batas ringkasan sumber",
          "explanation": "Metadata dan konteks diringkas dari laporan pengurus. Tidak memuat daftar peserta, penilaian individu, keuangan, atau klaim pencapaian teknis.",
          "sourceIds": [
            "lpj-2023-24"
          ]
        }
      ],
      "cohortIds": [
        "XXVI"
      ],
      "programId": "pd",
      "divisionIds": [
        "ORAD"
      ],
      "publication": {
        "institutionalAuthority": "owner-designated",
        "scope": "prototype-metadata-and-editorial-summary",
        "approval": "prototype-scope-authorized",
        "website": "preview",
        "originalReproduction": "not-authorized"
      }
    },
    {
      "id": "rc26",
      "title": "Pemantapan Divisi Panjat Tebing XXVI",
      "summary": "Pelaksanaan Panjat Tebing XXVI tercatat dalam LPJ. Ringkasan mempertahankan identitas kegiatan tanpa mengklaim seluruh standar divisi telah dicapai.",
      "state": "historical",
      "kind": "division-education",
      "depth": "basic",
      "sourceUses": [
        {
          "sourceId": "lpj-2023-24",
          "locator": "PDF fisik 51–53"
        }
      ],
      "editorial": {
        "verification": "source-checked",
        "readiness": "review-draft",
        "website": "prototype"
      },
      "dates": {
        "presentation": {
          "label": "15 Januari 2024 – 20 Januari 2024",
          "assertionId": "primary"
        },
        "assertions": [
          {
            "id": "primary",
            "role": "execution",
            "value": {
              "precision": "day-range",
              "start": "2024-01-15",
              "end": "2024-01-20"
            },
            "sourceUses": [
              {
                "sourceId": "lpj-2023-24",
                "locator": "PDF fisik 51–53"
              }
            ]
          }
        ],
        "reconciliation": "single-source"
      },
      "places": {
        "presentation": "Tebing Pegat · Jawa Timur",
        "assertions": [
          {
            "id": "reported",
            "label": "Tebing Pegat · Jawa Timur",
            "sourceUses": [
              {
                "sourceId": "lpj-2023-24",
                "locator": "PDF fisik 51–53"
              }
            ]
          }
        ],
        "reconciliation": "single-source"
      },
      "uncertainties": [
        {
          "title": "Batas ringkasan sumber",
          "explanation": "Metadata dan konteks diringkas dari laporan pengurus. Tidak memuat daftar peserta, penilaian individu, keuangan, atau klaim pencapaian teknis.",
          "sourceIds": [
            "lpj-2023-24"
          ]
        }
      ],
      "cohortIds": [
        "XXVI"
      ],
      "programId": "pd",
      "divisionIds": [
        "RC"
      ],
      "publication": {
        "institutionalAuthority": "owner-designated",
        "scope": "prototype-metadata-and-editorial-summary",
        "approval": "prototype-scope-authorized",
        "website": "preview",
        "originalReproduction": "not-authorized"
      }
    },
    {
      "id": "caving26",
      "title": "Pemantapan Divisi Susur Gua XXVI",
      "summary": "Pelaksanaan Susur Gua XXVI tercatat dalam LPJ. Ringkasan mempertahankan identitas kegiatan tanpa mengklaim seluruh standar divisi telah dicapai.",
      "state": "historical",
      "kind": "division-education",
      "depth": "basic",
      "sourceUses": [
        {
          "sourceId": "lpj-2023-24",
          "locator": "PDF fisik 51–53"
        }
      ],
      "editorial": {
        "verification": "source-checked",
        "readiness": "review-draft",
        "website": "prototype"
      },
      "dates": {
        "presentation": {
          "label": "24 Januari 2024 – 30 Januari 2024",
          "assertionId": "primary"
        },
        "assertions": [
          {
            "id": "primary",
            "role": "execution",
            "value": {
              "precision": "day-range",
              "start": "2024-01-24",
              "end": "2024-01-30"
            },
            "sourceUses": [
              {
                "sourceId": "lpj-2023-24",
                "locator": "PDF fisik 51–53"
              }
            ]
          }
        ],
        "reconciliation": "single-source"
      },
      "places": {
        "presentation": "Gua Tledek, Gua Manten dan Gua Lowo Penggar · Jawa Timur",
        "assertions": [
          {
            "id": "reported",
            "label": "Gua Tledek, Gua Manten dan Gua Lowo Penggar · Jawa Timur",
            "sourceUses": [
              {
                "sourceId": "lpj-2023-24",
                "locator": "PDF fisik 51–53"
              }
            ]
          }
        ],
        "reconciliation": "single-source"
      },
      "uncertainties": [
        {
          "title": "Batas ringkasan sumber",
          "explanation": "Metadata dan konteks diringkas dari laporan pengurus. Tidak memuat daftar peserta, penilaian individu, keuangan, atau klaim pencapaian teknis.",
          "sourceIds": [
            "lpj-2023-24"
          ]
        },
        {
          "title": "Ejaan nama gua belum direkonsiliasi",
          "explanation": "Ringkasan XXVI menulis Lowo Penggar, sedangkan XXVII menulis Lowo Tenggar. Nama tidak digabung atau dikoreksi tanpa laporan rinci.",
          "sourceIds": [
            "lpj-2023-24"
          ]
        }
      ],
      "cohortIds": [
        "XXVI"
      ],
      "programId": "pd",
      "divisionIds": [
        "CAVING"
      ],
      "publication": {
        "institutionalAuthority": "owner-designated",
        "scope": "prototype-metadata-and-editorial-summary",
        "approval": "prototype-scope-authorized",
        "website": "preview",
        "originalReproduction": "not-authorized"
      }
    },
    {
      "id": "gh27",
      "title": "Pemantapan Divisi Gunung Hutan XXVII",
      "summary": "Pelaksanaan Gunung Hutan XXVII tercatat dalam LPJ. Ringkasan mempertahankan identitas kegiatan tanpa mengklaim seluruh standar divisi telah dicapai.",
      "state": "historical",
      "kind": "division-education",
      "depth": "basic",
      "sourceUses": [
        {
          "sourceId": "lpj-2023-24",
          "locator": "PDF fisik 57–59"
        }
      ],
      "editorial": {
        "verification": "source-checked",
        "readiness": "review-draft",
        "website": "prototype"
      },
      "dates": {
        "presentation": {
          "label": "17 Januari 2024 – 25 Januari 2024",
          "assertionId": "primary"
        },
        "assertions": [
          {
            "id": "primary",
            "role": "execution",
            "value": {
              "precision": "day-range",
              "start": "2024-01-17",
              "end": "2024-01-25"
            },
            "sourceUses": [
              {
                "sourceId": "lpj-2023-24",
                "locator": "PDF fisik 57–59"
              }
            ]
          }
        ],
        "reconciliation": "single-source"
      },
      "places": {
        "presentation": "Gunung Merbabu via Suwanting · Magelang",
        "assertions": [
          {
            "id": "reported",
            "label": "Gunung Merbabu via Suwanting · Magelang",
            "sourceUses": [
              {
                "sourceId": "lpj-2023-24",
                "locator": "PDF fisik 57–59"
              }
            ]
          }
        ],
        "reconciliation": "single-source"
      },
      "uncertainties": [
        {
          "title": "Batas ringkasan sumber",
          "explanation": "Metadata dan konteks diringkas dari laporan pengurus. Tidak memuat daftar peserta, penilaian individu, keuangan, atau klaim pencapaian teknis.",
          "sourceIds": [
            "lpj-2023-24"
          ]
        }
      ],
      "cohortIds": [
        "XXVII"
      ],
      "programId": "pd",
      "divisionIds": [
        "GH"
      ],
      "publication": {
        "institutionalAuthority": "owner-designated",
        "scope": "prototype-metadata-and-editorial-summary",
        "approval": "prototype-scope-authorized",
        "website": "preview",
        "originalReproduction": "not-authorized"
      }
    },
    {
      "id": "orad27",
      "title": "Pemantapan Divisi Olahraga Arus Deras XXVII",
      "summary": "Pelaksanaan Olahraga Arus Deras XXVII tercatat dalam LPJ. Ringkasan mempertahankan identitas kegiatan tanpa mengklaim seluruh standar divisi telah dicapai.",
      "state": "historical",
      "kind": "division-education",
      "depth": "basic",
      "sourceUses": [
        {
          "sourceId": "lpj-2023-24",
          "locator": "PDF fisik 57–59"
        }
      ],
      "editorial": {
        "verification": "source-checked",
        "readiness": "review-draft",
        "website": "prototype"
      },
      "dates": {
        "presentation": {
          "label": "15 Januari 2024 – 20 Januari 2024",
          "assertionId": "primary"
        },
        "assertions": [
          {
            "id": "primary",
            "role": "execution",
            "value": {
              "precision": "day-range",
              "start": "2024-01-15",
              "end": "2024-01-20"
            },
            "sourceUses": [
              {
                "sourceId": "lpj-2023-24",
                "locator": "PDF fisik 57–59"
              }
            ]
          }
        ],
        "reconciliation": "single-source"
      },
      "places": {
        "reconciliation": "unresolved",
        "assertions": [
          {
            "id": "as-written",
            "label": "Taman Nasional Baluran · Situbondo",
            "sourceUses": [
              {
                "sourceId": "lpj-2023-24",
                "locator": "PDF fisik 57–59"
              }
            ]
          }
        ]
      },
      "uncertainties": [
        {
          "title": "Batas ringkasan sumber",
          "explanation": "Metadata dan konteks diringkas dari laporan pengurus. Tidak memuat daftar peserta, penilaian individu, keuangan, atau klaim pencapaian teknis.",
          "sourceIds": [
            "lpj-2023-24"
          ]
        },
        {
          "title": "Lokasi perlu pemeriksaan silang",
          "explanation": "Baris tempat sumber memasangkan Olahraga Arus Deras dengan Taman Nasional Baluran · Situbondo. Penamaan dipertahankan sebagai pernyataan sumber; lokasi publik belum ditetapkan dan tidak ditukar berdasarkan dugaan.",
          "sourceIds": [
            "lpj-2023-24"
          ]
        }
      ],
      "cohortIds": [
        "XXVII"
      ],
      "programId": "pd",
      "divisionIds": [
        "ORAD"
      ],
      "publication": {
        "institutionalAuthority": "owner-designated",
        "scope": "prototype-metadata-and-editorial-summary",
        "approval": "prototype-scope-authorized",
        "website": "preview",
        "originalReproduction": "not-authorized"
      }
    },
    {
      "id": "lh27",
      "title": "Pemantapan Divisi Lingkungan Hidup XXVII",
      "summary": "Pelaksanaan Lingkungan Hidup XXVII tercatat dalam LPJ. Ringkasan mempertahankan identitas kegiatan tanpa mengklaim seluruh standar divisi telah dicapai.",
      "state": "historical",
      "kind": "division-education",
      "depth": "basic",
      "sourceUses": [
        {
          "sourceId": "lpj-2023-24",
          "locator": "PDF fisik 57–59"
        }
      ],
      "editorial": {
        "verification": "source-checked",
        "readiness": "review-draft",
        "website": "prototype"
      },
      "dates": {
        "presentation": {
          "label": "15 Januari 2024 – 20 Januari 2024",
          "assertionId": "primary"
        },
        "assertions": [
          {
            "id": "primary",
            "role": "execution",
            "value": {
              "precision": "day-range",
              "start": "2024-01-15",
              "end": "2024-01-20"
            },
            "sourceUses": [
              {
                "sourceId": "lpj-2023-24",
                "locator": "PDF fisik 57–59"
              }
            ]
          }
        ],
        "reconciliation": "single-source"
      },
      "places": {
        "reconciliation": "unresolved",
        "assertions": [
          {
            "id": "as-written",
            "label": "Sungai Glenmor · Banyuwangi",
            "sourceUses": [
              {
                "sourceId": "lpj-2023-24",
                "locator": "PDF fisik 57–59"
              }
            ]
          }
        ]
      },
      "uncertainties": [
        {
          "title": "Batas ringkasan sumber",
          "explanation": "Metadata dan konteks diringkas dari laporan pengurus. Tidak memuat daftar peserta, penilaian individu, keuangan, atau klaim pencapaian teknis.",
          "sourceIds": [
            "lpj-2023-24"
          ]
        },
        {
          "title": "Lokasi perlu pemeriksaan silang",
          "explanation": "Baris tempat sumber memasangkan Lingkungan Hidup dengan Sungai Glenmor · Banyuwangi. Penamaan dipertahankan sebagai pernyataan sumber; lokasi publik belum ditetapkan dan tidak ditukar berdasarkan dugaan.",
          "sourceIds": [
            "lpj-2023-24"
          ]
        }
      ],
      "cohortIds": [
        "XXVII"
      ],
      "programId": "pd",
      "divisionIds": [
        "LH"
      ],
      "publication": {
        "institutionalAuthority": "owner-designated",
        "scope": "prototype-metadata-and-editorial-summary",
        "approval": "prototype-scope-authorized",
        "website": "preview",
        "originalReproduction": "not-authorized"
      }
    },
    {
      "id": "rc27",
      "title": "Pemantapan Divisi Panjat Tebing XXVII",
      "summary": "Pelaksanaan Panjat Tebing XXVII tercatat dalam LPJ. Ringkasan mempertahankan identitas kegiatan tanpa mengklaim seluruh standar divisi telah dicapai.",
      "state": "historical",
      "kind": "division-education",
      "depth": "basic",
      "sourceUses": [
        {
          "sourceId": "lpj-2023-24",
          "locator": "PDF fisik 57–59"
        }
      ],
      "editorial": {
        "verification": "source-checked",
        "readiness": "review-draft",
        "website": "prototype"
      },
      "dates": {
        "presentation": {
          "label": "15 Januari 2024 – 20 Januari 2024",
          "assertionId": "primary"
        },
        "assertions": [
          {
            "id": "primary",
            "role": "execution",
            "value": {
              "precision": "day-range",
              "start": "2024-01-15",
              "end": "2024-01-20"
            },
            "sourceUses": [
              {
                "sourceId": "lpj-2023-24",
                "locator": "PDF fisik 57–59"
              }
            ]
          }
        ],
        "reconciliation": "single-source"
      },
      "places": {
        "presentation": "Tebing Pegat · Tulungagung",
        "assertions": [
          {
            "id": "reported",
            "label": "Tebing Pegat · Tulungagung",
            "sourceUses": [
              {
                "sourceId": "lpj-2023-24",
                "locator": "PDF fisik 57–59"
              }
            ]
          }
        ],
        "reconciliation": "single-source"
      },
      "uncertainties": [
        {
          "title": "Batas ringkasan sumber",
          "explanation": "Metadata dan konteks diringkas dari laporan pengurus. Tidak memuat daftar peserta, penilaian individu, keuangan, atau klaim pencapaian teknis.",
          "sourceIds": [
            "lpj-2023-24"
          ]
        }
      ],
      "cohortIds": [
        "XXVII"
      ],
      "programId": "pd",
      "divisionIds": [
        "RC"
      ],
      "publication": {
        "institutionalAuthority": "owner-designated",
        "scope": "prototype-metadata-and-editorial-summary",
        "approval": "prototype-scope-authorized",
        "website": "preview",
        "originalReproduction": "not-authorized"
      }
    },
    {
      "id": "caving27",
      "title": "Pemantapan Divisi Susur Gua XXVII",
      "summary": "Pelaksanaan Susur Gua XXVII tercatat dalam LPJ. Ringkasan mempertahankan identitas kegiatan tanpa mengklaim seluruh standar divisi telah dicapai.",
      "state": "historical",
      "kind": "division-education",
      "depth": "basic",
      "sourceUses": [
        {
          "sourceId": "lpj-2023-24",
          "locator": "PDF fisik 57–59"
        }
      ],
      "editorial": {
        "verification": "source-checked",
        "readiness": "review-draft",
        "website": "prototype"
      },
      "dates": {
        "presentation": {
          "label": "24 Januari 2024 – 30 Januari 2024",
          "assertionId": "primary"
        },
        "assertions": [
          {
            "id": "primary",
            "role": "execution",
            "value": {
              "precision": "day-range",
              "start": "2024-01-24",
              "end": "2024-01-30"
            },
            "sourceUses": [
              {
                "sourceId": "lpj-2023-24",
                "locator": "PDF fisik 57–59"
              }
            ]
          }
        ],
        "reconciliation": "single-source"
      },
      "places": {
        "presentation": "Gua Tledek, Gua Lowo Tenggar dan Gua Manten · Tulungagung",
        "assertions": [
          {
            "id": "reported",
            "label": "Gua Tledek, Gua Lowo Tenggar dan Gua Manten · Tulungagung",
            "sourceUses": [
              {
                "sourceId": "lpj-2023-24",
                "locator": "PDF fisik 57–59"
              }
            ]
          }
        ],
        "reconciliation": "single-source"
      },
      "uncertainties": [
        {
          "title": "Batas ringkasan sumber",
          "explanation": "Metadata dan konteks diringkas dari laporan pengurus. Tidak memuat daftar peserta, penilaian individu, keuangan, atau klaim pencapaian teknis.",
          "sourceIds": [
            "lpj-2023-24"
          ]
        },
        {
          "title": "Ejaan nama gua belum direkonsiliasi",
          "explanation": "Ringkasan XXVI menulis Lowo Penggar, sedangkan XXVII menulis Lowo Tenggar. Nama tidak digabung atau dikoreksi tanpa laporan rinci.",
          "sourceIds": [
            "lpj-2023-24"
          ]
        }
      ],
      "cohortIds": [
        "XXVII"
      ],
      "programId": "pd",
      "divisionIds": [
        "CAVING"
      ],
      "publication": {
        "institutionalAuthority": "owner-designated",
        "scope": "prototype-metadata-and-editorial-summary",
        "approval": "prototype-scope-authorized",
        "website": "preview",
        "originalReproduction": "not-authorized"
      }
    },
    {
      "id": "gh28",
      "title": "Pemantapan Divisi Gunung Hutan XXVIII",
      "summary": "Draft LPJ mencatat spesialisasi Gunung Hutan XXVIII, didahului pematerian, proposal dan simulasi serta diikuti presentasi laporan. Tidak ada klaim sertifikasi atau pencapaian teknis.",
      "state": "historical",
      "kind": "division-education",
      "depth": "basic",
      "sourceUses": [
        {
          "sourceId": "lpj-2024-25",
          "locator": "PDF fisik 78–80 / cetak 72–74"
        }
      ],
      "editorial": {
        "verification": "source-checked",
        "readiness": "review-draft",
        "website": "prototype"
      },
      "dates": {
        "presentation": {
          "label": "23 November 2024 – 1 Desember 2024",
          "assertionId": "primary"
        },
        "assertions": [
          {
            "id": "primary",
            "role": "execution",
            "value": {
              "precision": "day-range",
              "start": "2024-11-23",
              "end": "2024-12-01"
            },
            "sourceUses": [
              {
                "sourceId": "lpj-2024-25",
                "locator": "PDF fisik 78–80 / cetak 72–74"
              }
            ]
          }
        ],
        "reconciliation": "single-source"
      },
      "places": {
        "presentation": "Gunung Gede Pangrango · Cianjur",
        "assertions": [
          {
            "id": "reported",
            "label": "Gunung Gede Pangrango · Cianjur",
            "sourceUses": [
              {
                "sourceId": "lpj-2024-25",
                "locator": "PDF fisik 78–80 / cetak 72–74"
              }
            ]
          }
        ],
        "reconciliation": "single-source"
      },
      "uncertainties": [
        {
          "title": "Batas ringkasan sumber",
          "explanation": "Metadata dan konteks diringkas dari laporan pengurus. Tidak memuat daftar peserta, penilaian individu, keuangan, atau klaim pencapaian teknis.",
          "sourceIds": [
            "lpj-2024-25"
          ]
        },
        {
          "title": "Status dokumen",
          "explanation": "Sumber berlabel draft; pembacaan isi tidak menetapkan pengesahan laporan.",
          "sourceIds": [
            "lpj-2024-25"
          ]
        }
      ],
      "cohortIds": [
        "XXVIII"
      ],
      "programId": "pd",
      "divisionIds": [
        "GH"
      ],
      "publication": {
        "institutionalAuthority": "owner-designated",
        "scope": "prototype-metadata-and-editorial-summary",
        "approval": "prototype-scope-authorized",
        "website": "preview",
        "originalReproduction": "not-authorized"
      }
    },
    {
      "id": "rc28",
      "title": "Pemantapan Divisi Panjat Tebing XXVIII",
      "summary": "Draft LPJ mencatat spesialisasi Panjat Tebing XXVIII, didahului pematerian, proposal dan simulasi serta diikuti presentasi laporan. Tidak ada klaim sertifikasi atau pencapaian teknis.",
      "state": "historical",
      "kind": "division-education",
      "depth": "basic",
      "sourceUses": [
        {
          "sourceId": "lpj-2024-25",
          "locator": "PDF fisik 78–80 / cetak 72–74"
        }
      ],
      "editorial": {
        "verification": "source-checked",
        "readiness": "review-draft",
        "website": "prototype"
      },
      "dates": {
        "presentation": {
          "label": "23 November 2024 – 1 Desember 2024",
          "assertionId": "primary"
        },
        "assertions": [
          {
            "id": "primary",
            "role": "execution",
            "value": {
              "precision": "day-range",
              "start": "2024-11-23",
              "end": "2024-12-01"
            },
            "sourceUses": [
              {
                "sourceId": "lpj-2024-25",
                "locator": "PDF fisik 78–80 / cetak 72–74"
              }
            ]
          }
        ],
        "reconciliation": "single-source"
      },
      "places": {
        "presentation": "Tebing Citatah 125 · Bandung Barat",
        "assertions": [
          {
            "id": "reported",
            "label": "Tebing Citatah 125 · Bandung Barat",
            "sourceUses": [
              {
                "sourceId": "lpj-2024-25",
                "locator": "PDF fisik 78–80 / cetak 72–74"
              }
            ]
          }
        ],
        "reconciliation": "single-source"
      },
      "uncertainties": [
        {
          "title": "Batas ringkasan sumber",
          "explanation": "Metadata dan konteks diringkas dari laporan pengurus. Tidak memuat daftar peserta, penilaian individu, keuangan, atau klaim pencapaian teknis.",
          "sourceIds": [
            "lpj-2024-25"
          ]
        },
        {
          "title": "Status dokumen",
          "explanation": "Sumber berlabel draft; pembacaan isi tidak menetapkan pengesahan laporan.",
          "sourceIds": [
            "lpj-2024-25"
          ]
        }
      ],
      "cohortIds": [
        "XXVIII"
      ],
      "programId": "pd",
      "divisionIds": [
        "RC"
      ],
      "publication": {
        "institutionalAuthority": "owner-designated",
        "scope": "prototype-metadata-and-editorial-summary",
        "approval": "prototype-scope-authorized",
        "website": "preview",
        "originalReproduction": "not-authorized"
      }
    },
    {
      "id": "orad28",
      "title": "Pemantapan Divisi Olahraga Arus Deras XXVIII",
      "summary": "Draft LPJ mencatat spesialisasi Olahraga Arus Deras XXVIII, didahului pematerian, proposal dan simulasi serta diikuti presentasi laporan. Tidak ada klaim sertifikasi atau pencapaian teknis.",
      "state": "historical",
      "kind": "division-education",
      "depth": "basic",
      "sourceUses": [
        {
          "sourceId": "lpj-2024-25",
          "locator": "PDF fisik 78–80 / cetak 72–74"
        }
      ],
      "editorial": {
        "verification": "source-checked",
        "readiness": "review-draft",
        "website": "prototype"
      },
      "dates": {
        "presentation": {
          "label": "23 November 2024 – 28 November 2024",
          "assertionId": "primary"
        },
        "assertions": [
          {
            "id": "primary",
            "role": "execution",
            "value": {
              "precision": "day-range",
              "start": "2024-11-23",
              "end": "2024-11-28"
            },
            "sourceUses": [
              {
                "sourceId": "lpj-2024-25",
                "locator": "PDF fisik 78–80 / cetak 72–74"
              }
            ]
          }
        ],
        "reconciliation": "single-source"
      },
      "places": {
        "presentation": "Sungai Cilutung · Majalengka",
        "assertions": [
          {
            "id": "reported",
            "label": "Sungai Cilutung · Majalengka",
            "sourceUses": [
              {
                "sourceId": "lpj-2024-25",
                "locator": "PDF fisik 78–80 / cetak 72–74"
              }
            ]
          }
        ],
        "reconciliation": "single-source"
      },
      "uncertainties": [
        {
          "title": "Batas ringkasan sumber",
          "explanation": "Metadata dan konteks diringkas dari laporan pengurus. Tidak memuat daftar peserta, penilaian individu, keuangan, atau klaim pencapaian teknis.",
          "sourceIds": [
            "lpj-2024-25"
          ]
        },
        {
          "title": "Status dokumen",
          "explanation": "Sumber berlabel draft; pembacaan isi tidak menetapkan pengesahan laporan.",
          "sourceIds": [
            "lpj-2024-25"
          ]
        }
      ],
      "cohortIds": [
        "XXVIII"
      ],
      "programId": "pd",
      "divisionIds": [
        "ORAD"
      ],
      "publication": {
        "institutionalAuthority": "owner-designated",
        "scope": "prototype-metadata-and-editorial-summary",
        "approval": "prototype-scope-authorized",
        "website": "preview",
        "originalReproduction": "not-authorized"
      }
    },
    {
      "id": "lh28",
      "title": "Pemantapan Divisi Lingkungan Hidup XXVIII",
      "summary": "Draft LPJ mencatat spesialisasi Lingkungan Hidup XXVIII, didahului pematerian, proposal dan simulasi serta diikuti presentasi laporan. Tidak ada klaim sertifikasi atau pencapaian teknis.",
      "state": "historical",
      "kind": "division-education",
      "depth": "basic",
      "sourceUses": [
        {
          "sourceId": "lpj-2024-25",
          "locator": "PDF fisik 78–80 / cetak 72–74"
        }
      ],
      "editorial": {
        "verification": "source-checked",
        "readiness": "review-draft",
        "website": "prototype"
      },
      "dates": {
        "presentation": {
          "label": "28 November 2024 – 4 Desember 2024",
          "assertionId": "primary"
        },
        "assertions": [
          {
            "id": "primary",
            "role": "execution",
            "value": {
              "precision": "day-range",
              "start": "2024-11-28",
              "end": "2024-12-04"
            },
            "sourceUses": [
              {
                "sourceId": "lpj-2024-25",
                "locator": "PDF fisik 78–80 / cetak 72–74"
              }
            ]
          }
        ],
        "reconciliation": "single-source"
      },
      "places": {
        "presentation": "Cagar Alam Pangandaran · Pangandaran",
        "assertions": [
          {
            "id": "reported",
            "label": "Cagar Alam Pangandaran · Pangandaran",
            "sourceUses": [
              {
                "sourceId": "lpj-2024-25",
                "locator": "PDF fisik 78–80 / cetak 72–74"
              }
            ]
          }
        ],
        "reconciliation": "single-source"
      },
      "uncertainties": [
        {
          "title": "Batas ringkasan sumber",
          "explanation": "Metadata dan konteks diringkas dari laporan pengurus. Tidak memuat daftar peserta, penilaian individu, keuangan, atau klaim pencapaian teknis.",
          "sourceIds": [
            "lpj-2024-25"
          ]
        },
        {
          "title": "Status dokumen",
          "explanation": "Sumber berlabel draft; pembacaan isi tidak menetapkan pengesahan laporan.",
          "sourceIds": [
            "lpj-2024-25"
          ]
        }
      ],
      "cohortIds": [
        "XXVIII"
      ],
      "programId": "pd",
      "divisionIds": [
        "LH"
      ],
      "publication": {
        "institutionalAuthority": "owner-designated",
        "scope": "prototype-metadata-and-editorial-summary",
        "approval": "prototype-scope-authorized",
        "website": "preview",
        "originalReproduction": "not-authorized"
      }
    },
    {
      "id": "batafia27",
      "title": "BATAFIA XXVII — diklat lapang",
      "summary": "Pendidikan dasar melalui forum dan lapangan. Tanggal yang ditampilkan adalah pelaksanaan lapangan, bukan rentang forum 13 Mei–4 Juni 2023.",
      "state": "historical",
      "kind": "basic-education",
      "depth": "basic",
      "sourceUses": [
        {
          "sourceId": "lpj-2023-24",
          "locator": "PDF fisik 50–51"
        }
      ],
      "editorial": {
        "verification": "source-checked",
        "readiness": "review-draft",
        "website": "prototype"
      },
      "dates": {
        "presentation": {
          "label": "1 Juli 2023 – 4 Juli 2023",
          "assertionId": "primary"
        },
        "assertions": [
          {
            "id": "primary",
            "role": "execution",
            "value": {
              "precision": "day-range",
              "start": "2023-07-01",
              "end": "2023-07-04"
            },
            "sourceUses": [
              {
                "sourceId": "lpj-2023-24",
                "locator": "PDF fisik 50–51"
              }
            ]
          }
        ],
        "reconciliation": "single-source"
      },
      "places": {
        "presentation": "Pegunungan Kawi · Gading Kulon · Dau",
        "assertions": [
          {
            "id": "reported",
            "label": "Pegunungan Kawi · Gading Kulon · Dau",
            "sourceUses": [
              {
                "sourceId": "lpj-2023-24",
                "locator": "PDF fisik 50–51"
              }
            ]
          }
        ],
        "reconciliation": "single-source"
      },
      "uncertainties": [
        {
          "title": "Batas ringkasan sumber",
          "explanation": "Metadata dan konteks diringkas dari laporan pengurus. Tidak memuat daftar peserta, penilaian individu, keuangan, atau klaim pencapaian teknis.",
          "sourceIds": [
            "lpj-2023-24"
          ]
        }
      ],
      "cohortIds": [
        "XXVII"
      ],
      "publication": {
        "institutionalAuthority": "owner-designated",
        "scope": "prototype-metadata-and-editorial-summary",
        "approval": "prototype-scope-authorized",
        "website": "preview",
        "originalReproduction": "not-authorized"
      }
    },
    {
      "id": "batafia28",
      "title": "BATAFIA XXVIII — diklat lapang",
      "summary": "LPJ mencatat pendidikan dasar lapangan pada 1–3 Desember, berbeda dari rencana awal 30 November–3 Desember 2023.",
      "state": "historical",
      "kind": "basic-education",
      "depth": "basic",
      "sourceUses": [
        {
          "sourceId": "lpj-2023-24",
          "locator": "PDF fisik 56–57"
        }
      ],
      "editorial": {
        "verification": "source-checked",
        "readiness": "review-draft",
        "website": "prototype"
      },
      "dates": {
        "presentation": {
          "label": "1 Desember 2023 – 3 Desember 2023",
          "assertionId": "primary"
        },
        "assertions": [
          {
            "id": "primary",
            "role": "execution",
            "value": {
              "precision": "day-range",
              "start": "2023-12-01",
              "end": "2023-12-03"
            },
            "sourceUses": [
              {
                "sourceId": "lpj-2023-24",
                "locator": "PDF fisik 56–57"
              }
            ]
          },
          {
            "id": "earlier-plan",
            "role": "planned",
            "value": {
              "precision": "day-range",
              "start": "2023-11-30",
              "end": "2023-12-03"
            },
            "sourceUses": [
              {
                "sourceId": "lpj-2023-24",
                "locator": "PDF fisik 57 / evaluasi rencana awal"
              }
            ]
          }
        ],
        "reconciliation": "single-source"
      },
      "places": {
        "presentation": "Pegunungan Kawi · Gading Kulon · Dau",
        "assertions": [
          {
            "id": "reported",
            "label": "Pegunungan Kawi · Gading Kulon · Dau",
            "sourceUses": [
              {
                "sourceId": "lpj-2023-24",
                "locator": "PDF fisik 56–57"
              }
            ]
          }
        ],
        "reconciliation": "single-source"
      },
      "uncertainties": [
        {
          "title": "Batas ringkasan sumber",
          "explanation": "Metadata dan konteks diringkas dari laporan pengurus. Tidak memuat daftar peserta, penilaian individu, keuangan, atau klaim pencapaian teknis.",
          "sourceIds": [
            "lpj-2023-24"
          ]
        },
        {
          "title": "Penyebutan angkatan dalam paragraf penutup",
          "explanation": "Judul dan sasaran sumber menyebut XXVIII, tetapi paragraf Keterangan mengulang XXVII. Identitas mengikuti judul dan sasaran; ketidakselarasan tidak disembunyikan.",
          "sourceIds": [
            "lpj-2023-24"
          ]
        }
      ],
      "cohortIds": [
        "XXVIII"
      ],
      "publication": {
        "institutionalAuthority": "owner-designated",
        "scope": "prototype-metadata-and-editorial-summary",
        "approval": "prototype-scope-authorized",
        "website": "preview",
        "originalReproduction": "not-authorized"
      }
    },
    {
      "id": "kawi26",
      "title": "Gunung Kawi XXVI",
      "summary": "Napak tilas dalam rangka pendidikan organisasi. Sumber menyebut pendakian tanpa pelaporan; halaman tidak menentukan status keanggotaan individu.",
      "state": "historical",
      "kind": "institutional-continuity",
      "depth": "basic",
      "sourceUses": [
        {
          "sourceId": "lpj-2023-24",
          "locator": "PDF fisik 53–54"
        }
      ],
      "editorial": {
        "verification": "source-checked",
        "readiness": "review-draft",
        "website": "prototype"
      },
      "dates": {
        "presentation": {
          "label": "15 September 2023 – 17 September 2023",
          "assertionId": "primary"
        },
        "assertions": [
          {
            "id": "primary",
            "role": "execution",
            "value": {
              "precision": "day-range",
              "start": "2023-09-15",
              "end": "2023-09-17"
            },
            "sourceUses": [
              {
                "sourceId": "lpj-2023-24",
                "locator": "PDF fisik 53–54"
              }
            ]
          }
        ],
        "reconciliation": "single-source"
      },
      "places": {
        "presentation": "Pegunungan Kawi",
        "assertions": [
          {
            "id": "reported",
            "label": "Pegunungan Kawi",
            "sourceUses": [
              {
                "sourceId": "lpj-2023-24",
                "locator": "PDF fisik 53–54"
              }
            ]
          }
        ],
        "reconciliation": "single-source"
      },
      "uncertainties": [
        {
          "title": "Batas ringkasan sumber",
          "explanation": "Metadata dan konteks diringkas dari laporan pengurus. Tidak memuat daftar peserta, penilaian individu, keuangan, atau klaim pencapaian teknis.",
          "sourceIds": [
            "lpj-2023-24"
          ]
        }
      ],
      "cohortIds": [
        "XXVI"
      ],
      "publication": {
        "institutionalAuthority": "owner-designated",
        "scope": "prototype-metadata-and-editorial-summary",
        "approval": "prototype-scope-authorized",
        "website": "preview",
        "originalReproduction": "not-authorized"
      }
    },
    {
      "id": "srde27",
      "title": "Sekolah Riset dan Ekspedisi XXVII",
      "summary": "Forum pembekalan metodologi penelitian, manajemen ekspedisi, fotografi, videografi dan jurnalistik. Topik forum tidak dianggap bukti tersedianya karya atau materi publik.",
      "state": "historical",
      "kind": "workshop",
      "depth": "basic",
      "sourceUses": [
        {
          "sourceId": "lpj-2023-24",
          "locator": "PDF fisik 54–55"
        }
      ],
      "editorial": {
        "verification": "source-checked",
        "readiness": "review-draft",
        "website": "prototype"
      },
      "dates": {
        "presentation": {
          "label": "9 September 2023 – 10 September 2023",
          "assertionId": "primary"
        },
        "assertions": [
          {
            "id": "primary",
            "role": "execution",
            "value": {
              "precision": "day-range",
              "start": "2023-09-09",
              "end": "2023-09-10"
            },
            "sourceUses": [
              {
                "sourceId": "lpj-2023-24",
                "locator": "PDF fisik 54–55"
              }
            ]
          }
        ],
        "reconciliation": "single-source"
      },
      "places": {
        "presentation": "Sekretariat MAPALA Tursina",
        "assertions": [
          {
            "id": "reported",
            "label": "Sekretariat MAPALA Tursina",
            "sourceUses": [
              {
                "sourceId": "lpj-2023-24",
                "locator": "PDF fisik 54–55"
              }
            ]
          }
        ],
        "reconciliation": "single-source"
      },
      "uncertainties": [
        {
          "title": "Batas ringkasan sumber",
          "explanation": "Metadata dan konteks diringkas dari laporan pengurus. Tidak memuat daftar peserta, penilaian individu, keuangan, atau klaim pencapaian teknis.",
          "sourceIds": [
            "lpj-2023-24"
          ]
        }
      ],
      "cohortIds": [
        "XXVII"
      ],
      "publication": {
        "institutionalAuthority": "owner-designated",
        "scope": "prototype-metadata-and-editorial-summary",
        "approval": "prototype-scope-authorized",
        "website": "preview",
        "originalReproduction": "not-authorized"
      }
    },
    {
      "id": "organization-school26",
      "title": "Sekolah Organisasi XXVI",
      "summary": "Forum budaya organisasi lintas generasi, cara kerja organisasi dan antropologi kampus.",
      "state": "historical",
      "kind": "workshop",
      "depth": "basic",
      "sourceUses": [
        {
          "sourceId": "lpj-2023-24",
          "locator": "PDF fisik 59–60"
        }
      ],
      "editorial": {
        "verification": "source-checked",
        "readiness": "review-draft",
        "website": "prototype"
      },
      "dates": {
        "presentation": {
          "label": "22 Maret 2023",
          "assertionId": "primary"
        },
        "assertions": [
          {
            "id": "primary",
            "role": "execution",
            "value": {
              "precision": "day",
              "start": "2023-03-22"
            },
            "sourceUses": [
              {
                "sourceId": "lpj-2023-24",
                "locator": "PDF fisik 59–60"
              }
            ]
          }
        ],
        "reconciliation": "single-source"
      },
      "places": {
        "presentation": "Sekretariat MAPALA Tursina",
        "assertions": [
          {
            "id": "reported",
            "label": "Sekretariat MAPALA Tursina",
            "sourceUses": [
              {
                "sourceId": "lpj-2023-24",
                "locator": "PDF fisik 59–60"
              }
            ]
          }
        ],
        "reconciliation": "single-source"
      },
      "uncertainties": [
        {
          "title": "Batas ringkasan sumber",
          "explanation": "Metadata dan konteks diringkas dari laporan pengurus. Tidak memuat daftar peserta, penilaian individu, keuangan, atau klaim pencapaian teknis.",
          "sourceIds": [
            "lpj-2023-24"
          ]
        }
      ],
      "cohortIds": [
        "XXVI"
      ],
      "publication": {
        "institutionalAuthority": "owner-designated",
        "scope": "prototype-metadata-and-editorial-summary",
        "approval": "prototype-scope-authorized",
        "website": "preview",
        "originalReproduction": "not-authorized"
      }
    },
    {
      "id": "organization-school28",
      "title": "Sekolah Organisasi XXVIII",
      "summary": "Forum pengenalan sejarah, budaya organisasi lintas generasi, kerja organisasi dan antropologi kampus.",
      "state": "historical",
      "kind": "workshop",
      "depth": "basic",
      "sourceUses": [
        {
          "sourceId": "lpj-2024-25",
          "locator": "PDF fisik 82–84 / cetak 76–78"
        }
      ],
      "editorial": {
        "verification": "source-checked",
        "readiness": "review-draft",
        "website": "prototype"
      },
      "dates": {
        "presentation": {
          "label": "10 Maret 2024",
          "assertionId": "primary"
        },
        "assertions": [
          {
            "id": "primary",
            "role": "execution",
            "value": {
              "precision": "day",
              "start": "2024-03-10"
            },
            "sourceUses": [
              {
                "sourceId": "lpj-2024-25",
                "locator": "PDF fisik 82–84 / cetak 76–78"
              }
            ]
          }
        ],
        "reconciliation": "single-source"
      },
      "places": {
        "presentation": "Gedung B Ruang 220 · UIN Malang",
        "assertions": [
          {
            "id": "reported",
            "label": "Gedung B Ruang 220 · UIN Malang",
            "sourceUses": [
              {
                "sourceId": "lpj-2024-25",
                "locator": "PDF fisik 82–84 / cetak 76–78"
              }
            ]
          }
        ],
        "reconciliation": "single-source"
      },
      "uncertainties": [
        {
          "title": "Batas ringkasan sumber",
          "explanation": "Metadata dan konteks diringkas dari laporan pengurus. Tidak memuat daftar peserta, penilaian individu, keuangan, atau klaim pencapaian teknis.",
          "sourceIds": [
            "lpj-2024-25"
          ]
        },
        {
          "title": "Status dokumen",
          "explanation": "Sumber berlabel draft; pembacaan isi tidak menetapkan pengesahan laporan.",
          "sourceIds": [
            "lpj-2024-25"
          ]
        }
      ],
      "cohortIds": [
        "XXVIII"
      ],
      "publication": {
        "institutionalAuthority": "owner-designated",
        "scope": "prototype-metadata-and-editorial-summary",
        "approval": "prototype-scope-authorized",
        "website": "preview",
        "originalReproduction": "not-authorized"
      }
    },
    {
      "id": "earth-day-2022",
      "title": "Hari Bumi 2022",
      "summary": "Peringatan Hari Bumi melalui mural dan kegiatan bersama. Ringkasan tidak menambahkan hasil konservasi yang belum diverifikasi.",
      "state": "historical",
      "kind": "environmental-service",
      "depth": "basic",
      "sourceUses": [
        {
          "sourceId": "lpj-2022-23",
          "locator": "DOCX fisik 60–61"
        }
      ],
      "editorial": {
        "verification": "source-checked",
        "readiness": "review-draft",
        "website": "prototype"
      },
      "dates": {
        "presentation": {
          "label": "23 April 2022 – 24 April 2022",
          "assertionId": "primary"
        },
        "assertions": [
          {
            "id": "primary",
            "role": "execution",
            "value": {
              "precision": "day-range",
              "start": "2022-04-23",
              "end": "2022-04-24"
            },
            "sourceUses": [
              {
                "sourceId": "lpj-2022-23",
                "locator": "DOCX fisik 60–61"
              }
            ]
          }
        ],
        "reconciliation": "single-source"
      },
      "places": {
        "presentation": "Aula Gedung C dan tembok belakang UIN Malang",
        "assertions": [
          {
            "id": "reported",
            "label": "Aula Gedung C dan tembok belakang UIN Malang",
            "sourceUses": [
              {
                "sourceId": "lpj-2022-23",
                "locator": "DOCX fisik 60–61"
              }
            ]
          }
        ],
        "reconciliation": "single-source"
      },
      "uncertainties": [
        {
          "title": "Batas ringkasan sumber",
          "explanation": "Metadata dan konteks diringkas dari laporan pengurus. Tidak memuat daftar peserta, penilaian individu, keuangan, atau klaim pencapaian teknis.",
          "sourceIds": [
            "lpj-2022-23"
          ]
        }
      ],
      "publication": {
        "institutionalAuthority": "owner-designated",
        "scope": "prototype-metadata-and-editorial-summary",
        "approval": "prototype-scope-authorized",
        "website": "preview",
        "originalReproduction": "not-authorized"
      }
    },
    {
      "id": "tree-movement-2023",
      "title": "Hari Gerakan Satu Juta Pohon",
      "summary": "LPJ mencatat kegiatan penanaman pohon untuk menumbuhkan kesadaran pelestarian lingkungan. Jumlah pohon dan keberlanjutan penanaman belum diverifikasi.",
      "state": "historical",
      "kind": "environmental-service",
      "depth": "basic",
      "sourceUses": [
        {
          "sourceId": "lpj-2022-23",
          "locator": "DOCX fisik 61"
        }
      ],
      "editorial": {
        "verification": "source-checked",
        "readiness": "review-draft",
        "website": "prototype"
      },
      "dates": {
        "presentation": {
          "label": "13 Januari 2023 – 15 Januari 2023",
          "assertionId": "primary"
        },
        "assertions": [
          {
            "id": "primary",
            "role": "execution",
            "value": {
              "precision": "day-range",
              "start": "2023-01-13",
              "end": "2023-01-15"
            },
            "sourceUses": [
              {
                "sourceId": "lpj-2022-23",
                "locator": "DOCX fisik 61"
              }
            ]
          }
        ],
        "reconciliation": "single-source"
      },
      "places": {
        "presentation": "Bumi Perkemahan Parang Tejo",
        "assertions": [
          {
            "id": "reported",
            "label": "Bumi Perkemahan Parang Tejo",
            "sourceUses": [
              {
                "sourceId": "lpj-2022-23",
                "locator": "DOCX fisik 61"
              }
            ]
          }
        ],
        "reconciliation": "single-source"
      },
      "uncertainties": [
        {
          "title": "Batas ringkasan sumber",
          "explanation": "Metadata dan konteks diringkas dari laporan pengurus. Tidak memuat daftar peserta, penilaian individu, keuangan, atau klaim pencapaian teknis.",
          "sourceIds": [
            "lpj-2022-23"
          ]
        }
      ],
      "publication": {
        "institutionalAuthority": "owner-designated",
        "scope": "prototype-metadata-and-editorial-summary",
        "approval": "prototype-scope-authorized",
        "website": "preview",
        "originalReproduction": "not-authorized"
      }
    },
    {
      "id": "batafia29",
      "title": "BATAFIA XXIX — diklat lapang",
      "summary": "Draft LPJ melaporkan pendidikan dasar lapangan pada 11–13 Oktober 2024, setelah penyesuaian dari rencana 4–6 Oktober. Informasi kesehatan dan penilaian peserta tidak ditampilkan.",
      "state": "historical",
      "kind": "basic-education",
      "depth": "basic",
      "sourceUses": [
        {
          "sourceId": "lpj-2024-25",
          "locator": "PDF fisik 80–82 / cetak 74–76"
        }
      ],
      "editorial": {
        "verification": "source-checked",
        "readiness": "review-draft",
        "website": "prototype"
      },
      "dates": {
        "presentation": {
          "label": "11 Oktober 2024 – 13 Oktober 2024",
          "assertionId": "primary"
        },
        "assertions": [
          {
            "id": "primary",
            "role": "execution",
            "value": {
              "precision": "day-range",
              "start": "2024-10-11",
              "end": "2024-10-13"
            },
            "sourceUses": [
              {
                "sourceId": "lpj-2024-25",
                "locator": "PDF fisik 80–82 / cetak 74–76"
              }
            ]
          },
          {
            "id": "earlier-plan",
            "role": "planned",
            "value": {
              "precision": "day-range",
              "start": "2024-10-04",
              "end": "2024-10-06"
            },
            "sourceUses": [
              {
                "sourceId": "lpj-2024-25",
                "locator": "PDF fisik 82 / evaluasi perubahan tanggal lapangan"
              }
            ]
          }
        ],
        "reconciliation": "single-source"
      },
      "places": {
        "presentation": "Pegunungan Kawi · Gading Kulon · Dau",
        "assertions": [
          {
            "id": "reported",
            "label": "Pegunungan Kawi · Gading Kulon · Dau",
            "sourceUses": [
              {
                "sourceId": "lpj-2024-25",
                "locator": "PDF fisik 80–82 / cetak 74–76"
              }
            ]
          }
        ],
        "reconciliation": "single-source"
      },
      "uncertainties": [
        {
          "title": "Batas ringkasan sumber",
          "explanation": "Metadata dan konteks diringkas dari laporan pengurus. Tidak memuat daftar peserta, penilaian individu, keuangan, atau klaim pencapaian teknis.",
          "sourceIds": [
            "lpj-2024-25"
          ]
        },
        {
          "title": "Status dokumen",
          "explanation": "Sumber berlabel draft; pembacaan isi tidak menetapkan pengesahan laporan.",
          "sourceIds": [
            "lpj-2024-25"
          ]
        }
      ],
      "cohortIds": [
        "XXIX"
      ],
      "publication": {
        "institutionalAuthority": "owner-designated",
        "scope": "prototype-metadata-and-editorial-summary",
        "approval": "prototype-scope-authorized",
        "website": "preview",
        "originalReproduction": "not-authorized"
      }
    }
  ],
  "works": [
    {
      "id": "sacred-gatekeeper",
      "kind": "article",
      "title": "The Sacred Gatekeeper",
      "language": "en",
      "contributors": [
        {
          "name": "Fairus In’am Pratama",
          "role": "Penulis"
        }
      ],
      "summary": "Tulisan terkait pengalaman TE11. Metadata karya ditampilkan; isi budaya dan izin publikasinya masih memerlukan review.",
      "intro": "Sebuah artikel terkait pengalaman Tursina Explore #11. Identitas karya dan konteks hubungannya dapat ditemukan secara terpisah dari catatan ekspedisi.",
      "sourceUses": [
        {
          "sourceId": "sacred-export",
          "locator": "halaman 1"
        }
      ],
      "editorial": {
        "verification": "source-checked",
        "readiness": "review-draft",
        "website": "prototype"
      },
      "originalState": "published-as-exported",
      "availability": {
        "state": "restricted",
        "title": "Naskah lengkap belum ditampilkan.",
        "explanation": "Kredit, hak publikasi, serta konteks dan ketepatan uraian budaya masih ditinjau. Metadata karya tetap dapat dibaca dan ditelusuri kembali ke ekspedisinya."
      },
      "sections": [
        {
          "id": "context",
          "label": "Tentang karya ini",
          "title": "Tulisan memiliki ruangnya sendiri.",
          "paragraphs": [
            "Artikel ini terhubung dengan perjalanan TE11 ke Bukit Raya pada 2024. Tanggal publikasinya, 21 September 2025, merupakan tanggal karya, bukan tanggal pelaksanaan ekspedisi.",
            "Yang tersedia pada halaman ini adalah metadata terverifikasi dan konteks editorial. Naskah lengkap, foto, dan kesaksian budaya tidak direproduksi sebelum pemeriksaan publikasinya selesai."
          ]
        }
      ],
      "evidence": [
        "Judul, byline Fairus In’am Pratama, dan tanggal 21 September 2025 diperiksa pada halaman pertama ekspor artikel yang tersimpan dalam arsip institusi.",
        "Hubungan editorialnya adalah dengan TE11. Nama penulis berasal dari byline karya, bukan daftar peserta. Artikel tidak diposisikan sebagai pernyataan resmi atau kajian budaya yang telah divalidasi komunitas."
      ],
      "dates": {
        "presentation": {
          "label": "21 September 2025",
          "assertionId": "primary"
        },
        "assertions": [
          {
            "id": "primary",
            "role": "publication",
            "value": {
              "precision": "day",
              "start": "2025-09-21"
            },
            "sourceUses": [
              {
                "sourceId": "sacred-export",
                "locator": "halaman 1"
              }
            ]
          }
        ],
        "reconciliation": "single-source"
      },
      "publication": {
        "institutionalAuthority": "owner-designated",
        "scope": "prototype-metadata-and-editorial-summary",
        "approval": "prototype-scope-authorized",
        "website": "preview",
        "originalReproduction": "not-authorized"
      }
    },
    {
      "id": "carbon-debt",
      "kind": "context",
      "typeLabel": "Catatan rencana",
      "title": "Catatan karbon dalam rencana TE11",
      "summary": "Draft LPJ membahas niat carbon offsetting. Ini bukan bukti netralitas karbon atau karya final yang telah terverifikasi.",
      "sourceUses": [
        {
          "sourceId": "te11-report",
          "locator": "rencana dan evaluasi"
        }
      ],
      "editorial": {
        "verification": "source-checked",
        "readiness": "review-draft",
        "website": "prototype"
      },
      "originalState": "source-context",
      "availability": {
        "state": "summary-only",
        "title": "Catatan rencana, bukan hasil penelitian.",
        "explanation": "Ringkasan konteks sumber, bukan naskah penelitian final atau audit karbon."
      },
      "sections": [
        {
          "id": "scope",
          "title": "Niat dan hasil perlu dibedakan.",
          "paragraphs": [
            "Keberadaan rencana offsetting dalam Draft LPJ TE11 tidak membuktikan bahwa seluruh emisi telah dihitung atau dinetralkan.",
            "Catatan ini berbeda dari artikel To the Summit, Without a Carbon Debt. Keduanya memiliki identitas dan batas bukti sendiri."
          ]
        }
      ],
      "uncertainties": [
        "Tanggal catatan belum diverifikasi. Tidak ada klaim kuantitatif karbon yang disahkan di sini."
      ],
      "evidence": [
        "Ringkasan editorial dari rencana dalam Draft LPJ TE11, bukan judul karya penelitian final."
      ],
      "dates": {
        "presentation": {
          "label": "Tanggal belum terverifikasi"
        },
        "assertions": [],
        "reconciliation": "unknown"
      },
      "publication": {
        "institutionalAuthority": "owner-designated",
        "scope": "prototype-metadata-and-editorial-summary",
        "approval": "prototype-scope-authorized",
        "website": "preview",
        "originalReproduction": "not-authorized"
      }
    },
    {
      "id": "design-school",
      "kind": "resource",
      "title": "TRS — Sekolah Desain Grafis",
      "summary": "Materi pengantar tentang konteks, identitas visual, serta proses sebelum, selama, dan sesudah produksi desain.",
      "sourceUses": [
        {
          "sourceId": "design-deck",
          "locator": "halaman 4, 7 dan 9 / penelitian R4"
        }
      ],
      "editorial": {
        "verification": "prior-review",
        "readiness": "review-draft",
        "website": "prototype"
      },
      "originalState": "identified-resource",
      "availability": {
        "state": "metadata-only",
        "title": "Materi asli belum tersedia untuk dibaca atau diunduh.",
        "explanation": "Identitas dan topik materi berasal dari pemeriksaan terdahulu. Kredit, izin reproduksi dan sumber asli perlu diperiksa kembali sebelum berkas publik disediakan."
      },
      "resource": {
        "format": "PDF",
        "pages": 13,
        "topics": [
          "Konteks desain",
          "Identitas visual",
          "Pra-produksi, produksi dan pascaproduksi"
        ]
      },
      "sections": [
        {
          "id": "learning",
          "title": "Belajar dari proses, bukan hanya hasil desain.",
          "paragraphs": [
            "Materi dapat ditemukan secara mandiri di ruang pengetahuan. Hubungan dengan kegiatan tertentu belum ditetapkan.",
            "Ringkasan topik bukan pengganti deck atau penetapan kurikulum Tursina yang berlaku sekarang."
          ]
        }
      ],
      "uncertainties": [
        "Tanggal PDF tidak dianggap tanggal kegiatan. Penulis, kontributor, tanggal kegiatan dan izin unduh belum diverifikasi.",
        "Sumber asli tidak ditemukan kembali melalui koleksi Drive yang tersedia pada pemeriksaan ini."
      ],
      "evidence": [
        "Penelitian R4 membaca materi 13 halaman. Metadata terdahulu dipertahankan; tidak ada klaim baru dari nama berkas saja."
      ],
      "dates": {
        "presentation": {
          "label": "Tanggal belum terverifikasi"
        },
        "assertions": [],
        "reconciliation": "unknown"
      },
      "publication": {
        "institutionalAuthority": "owner-designated",
        "scope": "prototype-metadata-and-editorial-summary",
        "approval": "prototype-scope-authorized",
        "website": "preview",
        "originalReproduction": "not-authorized"
      }
    },
    {
      "id": "announcement-demo",
      "kind": "announcement",
      "title": "Informasi penerimaan anggota",
      "summary": "Contoh sintetis pengumuman independen. Jadwal dan kanal pendaftaran aktual belum dikonfirmasi.",
      "sourceUses": [
        {
          "sourceId": "synthetic-fixture",
          "locator": "fixture pengumuman"
        }
      ],
      "editorial": {
        "verification": "synthetic",
        "readiness": "review-draft",
        "website": "prototype"
      },
      "originalState": "synthetic-example",
      "availability": {
        "state": "demonstration",
        "title": "Contoh antarmuka, bukan pengumuman yang berlaku.",
        "explanation": "Tidak ada jadwal, kontak, pendaftaran atau perekrutan nyata pada contoh ini."
      },
      "announcement": {
        "audience": "Contoh calon pembaca"
      },
      "evidence": [
        "Seluruh pengumuman ini adalah contoh sintetis, bukan keputusan penerimaan anggota."
      ],
      "dates": {
        "presentation": {
          "label": "Tanggal belum terverifikasi"
        },
        "assertions": [],
        "reconciliation": "unknown"
      },
      "publication": {
        "institutionalAuthority": "owner-designated",
        "scope": "prototype-metadata-and-editorial-summary",
        "approval": "prototype-scope-authorized",
        "website": "preview",
        "originalReproduction": "not-authorized"
      }
    },
    {
      "id": "summit-without-carbon-debt",
      "kind": "article",
      "title": "To the Summit, Without a Carbon Debt: The Story of a Carbon-Neutral Climb in Borneo",
      "language": "en",
      "contributors": [
        {
          "name": "Fairus In’am Pratama",
          "role": "Penulis"
        }
      ],
      "summary": "Artikel terkait TE11 tentang jejak karbon dan offsetting. Metadata karya tercatat; klaim netralitas dalam naskah belum diverifikasi secara independen.",
      "sourceUses": [
        {
          "sourceId": "carbon-export",
          "locator": "halaman 1–3"
        }
      ],
      "editorial": {
        "verification": "source-checked",
        "readiness": "review-draft",
        "website": "prototype"
      },
      "originalState": "published-as-exported",
      "availability": {
        "state": "restricted",
        "title": "Metadata tersedia; naskah dan klaim masih ditinjau.",
        "explanation": "Isi artikel, gambar dan angka emisi tidak direproduksi. Judul adalah atribusi pada karya, bukan pengesahan bahwa ekspedisi netral karbon."
      },
      "sections": [
        {
          "id": "identity",
          "title": "Satu artikel, batas bukti tersendiri.",
          "paragraphs": [
            "Ekspor artikel mencantumkan judul, penulis dan tanggal serta menyebut Tursina Explore #11. Identitasnya dibedakan dari rencana dalam laporan ekspedisi.",
            "Metode penghitungan, asumsi penyerapan dan pelaksanaan serta keberlanjutan offsetting memerlukan pemeriksaan sebelum klaim hasil digunakan sebagai informasi institusi."
          ]
        }
      ],
      "evidence": [
        "Byline, tanggal dan hubungan TE11 dibaca dari isi ekspor artikel, bukan waktu unggah Drive. Bukan hasil penelitian yang telah diaudit."
      ],
      "uncertainties": [
        "Reproduksi naskah, gambar, kredit dan verifikasi klaim kuantitatif masih terbuka."
      ],
      "dates": {
        "presentation": {
          "label": "21 September 2025",
          "assertionId": "primary"
        },
        "assertions": [
          {
            "id": "primary",
            "role": "publication",
            "value": {
              "precision": "day",
              "start": "2025-09-21"
            },
            "sourceUses": [
              {
                "sourceId": "carbon-export",
                "locator": "halaman 1–3"
              }
            ]
          }
        ],
        "reconciliation": "single-source"
      },
      "publication": {
        "institutionalAuthority": "owner-designated",
        "scope": "prototype-metadata-and-editorial-summary",
        "approval": "prototype-scope-authorized",
        "website": "preview",
        "originalReproduction": "not-authorized"
      }
    },
    {
      "id": "te11-documentary-reference",
      "kind": "context",
      "title": "Video Dokumenter — lampiran TE11",
      "summary": "Lampiran berjudul Video Dokumenter memuat tempat thumbnail dan kode QR tautan. Keberadaan lampiran belum membuktikan film final yang telah diperiksa.",
      "sourceUses": [
        {
          "sourceId": "te11-video-appendix",
          "locator": "teks lampiran: thumbnail / kode QR tautan"
        },
        {
          "sourceId": "te11-report",
          "locator": "evaluasi dokumentasi"
        }
      ],
      "editorial": {
        "verification": "source-checked",
        "readiness": "review-draft",
        "website": "prototype"
      },
      "originalState": "source-context",
      "availability": {
        "state": "summary-only",
        "title": "Referensi dokumentasi; tidak ada video publik.",
        "explanation": "Tujuan tautan, isi, kredit dan hak penayangan belum diverifikasi. Tidak ada pemutar, QR atau tautan dokumen privat."
      },
      "sections": [
        {
          "id": "reference",
          "title": "Lampiran bukan verifikasi sebuah film.",
          "paragraphs": [
            "Teks yang terbaca hanya menetapkan identitas lampiran dan tempat thumbnail serta kode QR. Laporan ekspedisi juga mencatat perubahan target dokumentasi.",
            "Catatan mempertahankan jejak sumber untuk pemeriksaan selanjutnya, bukan mengumumkan perilisan dokumenter atau aftermovie."
          ]
        }
      ],
      "evidence": [
        "Isi lampiran dibaca langsung. Tautan dan gambar di dalamnya tidak diteruskan ke publik."
      ],
      "uncertainties": [
        "Judul film, pembuat, durasi, tanggal rilis, tujuan QR, isi dan izin penayangan belum ditetapkan."
      ],
      "dates": {
        "presentation": {
          "label": "Tanggal belum terverifikasi"
        },
        "assertions": [],
        "reconciliation": "unknown"
      },
      "publication": {
        "institutionalAuthority": "owner-designated",
        "scope": "prototype-metadata-and-editorial-summary",
        "approval": "prototype-scope-authorized",
        "website": "preview",
        "originalReproduction": "not-authorized"
      }
    },
    {
      "id": "summit-attack-vol4",
      "kind": "periodical",
      "typeLabel": "Majalah",
      "title": "Summit Attack Vol. 4",
      "summary": "Majalah tentang kegiatan MAPALA Tursina; LPJ menyebut peluncuran pada 24 Januari 2023 dan publikasi di website saat itu. Salinan majalah belum diperiksa untuk reproduksi.",
      "sourceUses": [
        {
          "sourceId": "lpj-2022-23",
          "locator": "DOCX fisik 60 / Bidang Humas dan Media: Summit Attack"
        }
      ],
      "dates": {
        "presentation": {
          "label": "24 Januari 2023 (peluncuran dilaporkan)",
          "assertionId": "primary"
        },
        "assertions": [
          {
            "id": "primary",
            "role": "release-reported",
            "value": {
              "precision": "day",
              "start": "2023-01-24"
            },
            "sourceUses": [
              {
                "sourceId": "lpj-2022-23",
                "locator": "DOCX fisik 60 / Bidang Humas dan Media: Summit Attack"
              }
            ]
          }
        ],
        "reconciliation": "single-source"
      },
      "editorial": {
        "verification": "source-checked",
        "readiness": "review-draft",
        "website": "prototype"
      },
      "originalState": "identified-resource",
      "availability": {
        "state": "metadata-only",
        "title": "Identitas majalah tersedia; berkas belum ditampilkan.",
        "explanation": "Sumber adalah laporan pengurus, bukan salinan majalah. Judul, tanggal peluncuran dan konteks diperiksa; format, jumlah halaman, kredit serta izin unduh belum diverifikasi."
      },
      "evidence": [
        "LPJ Pengurus 2022–2023 fisik hlm.60 menyebut Summit Attack Vol.4, peluncuran 24 Januari 2023 dan publikasi di website pada waktu itu. Ini bukan verifikasi bahwa berkas masih tersedia sekarang."
      ],
      "uncertainties": [
        "Isi, kredit pencipta, format berkas dan izin reproduksi masih perlu diperiksa."
      ],
      "publication": {
        "institutionalAuthority": "owner-designated",
        "scope": "prototype-metadata-and-editorial-summary",
        "approval": "prototype-scope-authorized",
        "website": "preview",
        "originalReproduction": "not-authorized"
      }
    }
  ],
  "history": [
    {
      "id": "founding-1995",
      "title": "Pembentukan MAPALA Tursina",
      "kind": "founding",
      "summary": "Tanggal pembentukan tercantum dalam AD. Dokumen pendirian sezaman dan kronologi awal belum dihimpun dalam prototipe.",
      "sourceUses": [
        {
          "sourceId": "ad-art-2025",
          "locator": "AD Pasal 3 / physical 2"
        }
      ],
      "uncertainties": [
        "Sumber adalah AD yang tersedia, bukan rekonstruksi lengkap kejadian tahun 1995."
      ],
      "editorial": {
        "verification": "source-checked",
        "readiness": "review-draft",
        "website": "prototype"
      },
      "dates": {
        "presentation": {
          "label": "20 Desember 1995",
          "assertionId": "primary"
        },
        "assertions": [
          {
            "id": "primary",
            "role": "milestone",
            "value": {
              "precision": "day",
              "start": "1995-12-20"
            },
            "sourceUses": [
              {
                "sourceId": "ad-art-2025",
                "locator": "AD Pasal 3 / physical 2"
              }
            ]
          }
        ],
        "reconciliation": "single-source"
      },
      "publication": {
        "institutionalAuthority": "owner-designated",
        "scope": "prototype-metadata-and-editorial-summary",
        "approval": "prototype-scope-authorized",
        "website": "preview",
        "originalReproduction": "not-authorized"
      }
    },
    {
      "id": "field-education-2023",
      "title": "Jejak pendidikan Gunung Hutan",
      "kind": "education",
      "summary": "LPJ Pengurus 2023–2024 mencatat GH XXVI di Gunung Slamet. Ini titik dokumentasi pendidikan, bukan awal program PD.",
      "sourceUses": [
        {
          "sourceId": "lpj-2023-24",
          "locator": "physical 52–53 / Pemantapan Divisi"
        }
      ],
      "relatedProgrammeIds": [
        "pd"
      ],
      "uncertainties": [
        "Laporan spesialisasi lengkap belum menjadi sumber cerita rinci."
      ],
      "periodLabel": "Sumber laporan 2023–2024",
      "editorial": {
        "verification": "source-checked",
        "readiness": "review-draft",
        "website": "prototype"
      },
      "dates": {
        "presentation": {
          "label": "19–26 Agustus 2023",
          "assertionId": "primary"
        },
        "assertions": [
          {
            "id": "primary",
            "role": "milestone",
            "value": {
              "precision": "day-range",
              "start": "2023-08-19",
              "end": "2023-08-26"
            },
            "sourceUses": [
              {
                "sourceId": "lpj-2023-24",
                "locator": "physical 52–53 / Pemantapan Divisi"
              }
            ]
          }
        ],
        "reconciliation": "single-source"
      },
      "publication": {
        "institutionalAuthority": "owner-designated",
        "scope": "prototype-metadata-and-editorial-summary",
        "approval": "prototype-scope-authorized",
        "website": "preview",
        "originalReproduction": "not-authorized"
      }
    },
    {
      "id": "expedition-knowledge-2024",
      "title": "Perjalanan yang meninggalkan catatan",
      "kind": "knowledge",
      "summary": "TE11 mendokumentasikan perjalanan ke Bukit Raya. Artikel terkait memiliki tanggal dan identitas sendiri, terpisah dari waktu ekspedisi.",
      "sourceUses": [
        {
          "sourceId": "te11-report",
          "locator": "implementasi dan evaluasi"
        },
        {
          "sourceId": "sacred-export",
          "locator": "halaman 1"
        }
      ],
      "relatedProgrammeIds": [
        "te"
      ],
      "uncertainties": [
        "Perbedaan provinsi dan tanggal akhir rinci dipertahankan pada TE11. Bukan klaim edisi pertama atau terbaru."
      ],
      "editorial": {
        "verification": "source-checked",
        "readiness": "review-draft",
        "website": "prototype"
      },
      "dates": {
        "presentation": {
          "label": "20 November–6 Desember 2024",
          "assertionId": "primary"
        },
        "assertions": [
          {
            "id": "primary",
            "role": "milestone",
            "value": {
              "precision": "day-range",
              "start": "2024-11-20",
              "end": "2024-12-06"
            },
            "sourceUses": [
              {
                "sourceId": "te11-report",
                "locator": "implementasi dan evaluasi"
              },
              {
                "sourceId": "sacred-export",
                "locator": "halaman 1"
              }
            ]
          }
        ],
        "reconciliation": "single-source"
      },
      "publication": {
        "institutionalAuthority": "owner-designated",
        "scope": "prototype-metadata-and-editorial-summary",
        "approval": "prototype-scope-authorized",
        "website": "preview",
        "originalReproduction": "not-authorized"
      }
    },
    {
      "id": "division-education-2025",
      "title": "Lima medan pembelajaran terdokumentasi",
      "kind": "education",
      "summary": "LPJ 2025 mencatat PD XXIX dalam lima bidang. Pelaksanaan lapangan dan keterlambatan penyelesaian laporan adalah catatan berbeda.",
      "sourceUses": [
        {
          "sourceId": "lpj-2025",
          "locator": "physical 91–93 / PD XXIX"
        }
      ],
      "relatedProgrammeIds": [
        "pd"
      ],
      "uncertainties": [
        "Rentang merangkum lima kegiatan, bukan tanggal acara induk baru."
      ],
      "editorial": {
        "verification": "source-checked",
        "readiness": "review-draft",
        "website": "prototype"
      },
      "dates": {
        "presentation": {
          "label": "Juli–Agustus 2025",
          "assertionId": "primary"
        },
        "assertions": [
          {
            "id": "primary",
            "role": "milestone",
            "value": {
              "precision": "day-range",
              "start": "2025-07-31",
              "end": "2025-08-20"
            },
            "sourceUses": [
              {
                "sourceId": "lpj-2025",
                "locator": "physical 91–93 / PD XXIX"
              }
            ]
          }
        ],
        "reconciliation": "single-source"
      },
      "publication": {
        "institutionalAuthority": "owner-designated",
        "scope": "prototype-metadata-and-editorial-summary",
        "approval": "prototype-scope-authorized",
        "website": "preview",
        "originalReproduction": "not-authorized"
      }
    },
    {
      "id": "kawi-continuity-2025",
      "title": "Kawi dan kesinambungan organisasi",
      "kind": "continuity",
      "summary": "Laporan menyebut Kawi XXIX sebagai napak tilas dan konteks peralihan jenjang. Tradisi dihubungkan dengan pendidikan tanpa menampilkan keputusan keanggotaan per orang.",
      "sourceUses": [
        {
          "sourceId": "lpj-2025",
          "locator": "physical 96–97 / Pendakian Kawi XXIX"
        }
      ],
      "uncertainties": [
        "Laporan menyebut pendakian tanpa pelaporan. Makna upacara dan riwayat pribadi tidak direkonstruksi dari foto."
      ],
      "editorial": {
        "verification": "source-checked",
        "readiness": "review-draft",
        "website": "prototype"
      },
      "dates": {
        "presentation": {
          "label": "21–23 November 2025",
          "assertionId": "primary"
        },
        "assertions": [
          {
            "id": "primary",
            "role": "milestone",
            "value": {
              "precision": "day-range",
              "start": "2025-11-21",
              "end": "2025-11-23"
            },
            "sourceUses": [
              {
                "sourceId": "lpj-2025",
                "locator": "physical 96–97 / Pendakian Kawi XXIX"
              }
            ]
          }
        ],
        "reconciliation": "single-source"
      },
      "publication": {
        "institutionalAuthority": "owner-designated",
        "scope": "prototype-metadata-and-editorial-summary",
        "approval": "prototype-scope-authorized",
        "website": "preview",
        "originalReproduction": "not-authorized"
      }
    },
    {
      "id": "environment-2022",
      "title": "Jejak kepedulian lingkungan",
      "kind": "education",
      "summary": "Hari Bumi 2022 menjadi salah satu titik terdokumentasi kegiatan lingkungan, bukan bukti kronologi lingkungan yang lengkap.",
      "dates": {
        "presentation": {
          "label": "23 April 2022",
          "assertionId": "primary"
        },
        "assertions": [
          {
            "id": "primary",
            "role": "milestone",
            "value": {
              "precision": "day",
              "start": "2022-04-23"
            },
            "sourceUses": [
              {
                "sourceId": "lpj-2022-23",
                "locator": "DOCX fisik 60–61"
              }
            ]
          }
        ],
        "reconciliation": "single-source"
      },
      "sourceUses": [
        {
          "sourceId": "lpj-2022-23",
          "locator": "DOCX fisik 60–61"
        }
      ],
      "uncertainties": [
        "Entri terpilih dari sumber yang tersedia; bukan kronologi tahunan lengkap."
      ],
      "editorial": {
        "verification": "source-checked",
        "readiness": "review-draft",
        "website": "prototype"
      },
      "publication": {
        "institutionalAuthority": "owner-designated",
        "scope": "prototype-metadata-and-editorial-summary",
        "approval": "prototype-scope-authorized",
        "website": "preview",
        "originalReproduction": "not-authorized"
      }
    },
    {
      "id": "siberut-2022",
      "title": "Eksplorasi budaya dan lingkungan di Siberut",
      "kind": "knowledge",
      "summary": "TE10 tercatat melintasi akhir 2022 dan awal 2023; hasil disebut dalam laporan, tetapi karya aslinya belum diverifikasi.",
      "dates": {
        "presentation": {
          "label": "20 Desember 2022",
          "assertionId": "primary"
        },
        "assertions": [
          {
            "id": "primary",
            "role": "milestone",
            "value": {
              "precision": "day",
              "start": "2022-12-20"
            },
            "sourceUses": [
              {
                "sourceId": "lpj-2022-23",
                "locator": "DOCX fisik 61"
              }
            ]
          }
        ],
        "reconciliation": "single-source"
      },
      "sourceUses": [
        {
          "sourceId": "lpj-2022-23",
          "locator": "DOCX fisik 61"
        }
      ],
      "uncertainties": [
        "Entri terpilih dari sumber yang tersedia; bukan kronologi tahunan lengkap."
      ],
      "editorial": {
        "verification": "source-checked",
        "readiness": "review-draft",
        "website": "prototype"
      },
      "publication": {
        "institutionalAuthority": "owner-designated",
        "scope": "prototype-metadata-and-editorial-summary",
        "approval": "prototype-scope-authorized",
        "website": "preview",
        "originalReproduction": "not-authorized"
      }
    },
    {
      "id": "magazine-2023",
      "title": "Pengetahuan diteruskan melalui majalah",
      "kind": "knowledge",
      "summary": "Peluncuran Summit Attack Vol.4 tercatat pada 24 Januari 2023. Salinan majalah dan rangkaian volume lain belum dikurasi.",
      "dates": {
        "presentation": {
          "label": "24 Januari 2023",
          "assertionId": "primary"
        },
        "assertions": [
          {
            "id": "primary",
            "role": "milestone",
            "value": {
              "precision": "day",
              "start": "2023-01-24"
            },
            "sourceUses": [
              {
                "sourceId": "lpj-2022-23",
                "locator": "DOCX fisik 60"
              }
            ]
          }
        ],
        "reconciliation": "single-source"
      },
      "sourceUses": [
        {
          "sourceId": "lpj-2022-23",
          "locator": "DOCX fisik 60"
        }
      ],
      "uncertainties": [
        "Entri terpilih dari sumber yang tersedia; bukan kronologi tahunan lengkap."
      ],
      "editorial": {
        "verification": "source-checked",
        "readiness": "review-draft",
        "website": "prototype"
      },
      "publication": {
        "institutionalAuthority": "owner-designated",
        "scope": "prototype-metadata-and-editorial-summary",
        "approval": "prototype-scope-authorized",
        "website": "preview",
        "originalReproduction": "not-authorized"
      }
    }
  ],
  "information": {
    "name": "Mahasiswa Pencinta Alam Tursina",
    "shortName": "MAPALA Tursina",
    "affiliation": "UIN Maulana Malik Ibrahim Malang",
    "intro": "Mahasiswa Pencinta Alam Tursina adalah unit kegiatan mahasiswa di UIN Maulana Malik Ibrahim Malang. Pendidikan lapangan, ekspedisi, kegiatan ilmiah dan pengabdian menjadi ruang belajar serta penerapan pengetahuan bersama.",
    "motto": "Dari alam aku ada, aku ada untuk alam",
    "blocks": [
      {
        "id": "character",
        "title": "Ilmu, alam dan kekeluargaan.",
        "paragraphs": [
          "Anggaran Dasar menyebut asas kekeluargaan dan sifat ilmiah, sosial, olahraga serta rekreasi. Dokumen juga menyatakan organisasi terlepas dari politik praktis.",
          "Karakter itu memberi konteks bagi kegiatan pencintaalaman, pelestarian lingkungan, pengabdian dan penerapan berbagai disiplin ilmu. Ini penjelasan dokumen, bukan daftar capaian yang diklaim sudah terpenuhi."
        ],
        "sourceUses": [
          {
            "sourceId": "ad-art-2025",
            "locator": "AD Pasal 6–10; ART Pasal 4"
          }
        ]
      },
      {
        "id": "education",
        "title": "Pengetahuan yang dipraktikkan.",
        "paragraphs": [
          "Misi dalam AD memadukan kegiatan ilmiah, keterampilan, ketahanan fisik dan mental, serta pelestarian alam dan lingkungan. Tujuannya menghubungkan kemampuan teoritis dan praktis dengan kehidupan bermasyarakat.",
          "Catatan PD menunjukkan pematerian, latihan, proposal, simulasi, spesialisasi dan presentasi laporan. Standar historis tidak otomatis menjadi kurikulum yang berlaku sekarang."
        ],
        "sourceUses": [
          {
            "sourceId": "ad-art-2025",
            "locator": "AD Pasal 9–10"
          },
          {
            "sourceId": "lpj-2025",
            "locator": "PD XXIX / physical 91–93"
          }
        ]
      },
      {
        "id": "continuity",
        "title": "Pengalaman diteruskan melalui catatan.",
        "paragraphs": [
          "AD mencatat pembentukan Tursina pada 20 Desember 1995. Arsip pendidikan, ekspedisi dan karya memberi beberapa titik untuk memahami kelanjutannya.",
          "Website menghubungkan program, kegiatan, karya dan sejarah tanpa menjadikan angkatan atau kepengurusan satu-satunya cara menelusuri organisasi."
        ],
        "sourceUses": [
          {
            "sourceId": "ad-art-2025",
            "locator": "AD Pasal 3"
          },
          {
            "sourceId": "lpj-2025",
            "locator": "PD dan Pendakian Kawi XXIX"
          }
        ]
      }
    ],
    "identityNotes": [
      "Nama, kedudukan, asas, sifat dan tujuan diringkas dari AD/ART 2025 yang tersedia. Halaman tidak menetapkan kepengurusan atau operasi terkini.",
      "ART menjelaskan simbol warna dan lambang, bukan nilai warna digital. Master emblem dan aplikasi logo universitas belum dikonfirmasi; nama institusi tetap terbaca sebagai teks."
    ]
  },
  "sources": [
    {
      "id": "lpj-2025",
      "label": "LPJ Pengurus 2025",
      "kind": "report",
      "custody": "restricted-original",
      "originalAccess": "examined",
      "acceptance": "not-established"
    },
    {
      "id": "lpj-2023-24",
      "label": "LPJ Pengurus 2023–2024",
      "kind": "report",
      "custody": "restricted-original",
      "originalAccess": "examined",
      "acceptance": "not-established"
    },
    {
      "id": "humed-gh29",
      "label": "Arsip HUMED / GH XXIX",
      "kind": "reviewed-photographs",
      "custody": "restricted-original",
      "originalAccess": "examined",
      "acceptance": "not-applicable"
    },
    {
      "id": "humed-rc29",
      "label": "Arsip HUMED / RC XXIX",
      "kind": "reviewed-photographs",
      "custody": "restricted-original",
      "originalAccess": "examined",
      "acceptance": "not-applicable"
    },
    {
      "id": "synthetic-fixture",
      "label": "Contoh sintetis",
      "kind": "synthetic",
      "custody": "synthetic",
      "originalAccess": "examined",
      "acceptance": "not-applicable"
    },
    {
      "id": "ad-art-2025",
      "label": "AD/ART MAPALA Tursina 2025",
      "kind": "charter",
      "custody": "restricted-original",
      "originalAccess": "examined",
      "acceptance": "not-applicable"
    },
    {
      "id": "te11-report",
      "label": "Draft LPJ Tursina Explore #11",
      "kind": "report",
      "custody": "restricted-original",
      "originalAccess": "examined",
      "acceptance": "not-established"
    },
    {
      "id": "sacred-export",
      "label": "Ekspor artikel The Sacred Gatekeeper",
      "kind": "article",
      "custody": "restricted-original",
      "originalAccess": "examined",
      "acceptance": "not-applicable"
    },
    {
      "id": "carbon-export",
      "label": "Ekspor artikel To the Summit, Without a Carbon Debt",
      "kind": "article",
      "custody": "restricted-original",
      "originalAccess": "examined",
      "acceptance": "not-applicable"
    },
    {
      "id": "design-deck",
      "label": "TRS — Sekolah Desain Grafis / materi 13 halaman",
      "kind": "teaching",
      "custody": "restricted-original",
      "originalAccess": "prior-review",
      "acceptance": "not-applicable"
    },
    {
      "id": "te11-video-appendix",
      "label": "Lampiran Video Dokumenter / TE11",
      "kind": "documentary-reference",
      "custody": "restricted-original",
      "originalAccess": "examined",
      "acceptance": "not-applicable"
    },
    {
      "id": "lpj-2022-23",
      "label": "LPJ Pengurus 2022–2023",
      "kind": "report",
      "custody": "restricted-original",
      "originalAccess": "examined",
      "acceptance": "not-established"
    },
    {
      "id": "lpj-2024-25",
      "label": "Draft LPJ Pengurus 2024–2025",
      "kind": "report",
      "custody": "restricted-original",
      "originalAccess": "examined",
      "acceptance": "not-established"
    },
    {
      "id": "humed-kawi-review",
      "label": "Arsip HUMED / Kawi — review Step2",
      "kind": "reviewed-photographs",
      "custody": "restricted-original",
      "originalAccess": "prior-review",
      "acceptance": "not-applicable"
    },
    {
      "id": "humed-batafia-review",
      "label": "Arsip HUMED / BATAFIA — review Step2",
      "kind": "reviewed-photographs",
      "custody": "restricted-original",
      "originalAccess": "prior-review",
      "acceptance": "not-applicable"
    },
    {
      "id": "humed-te11-review",
      "label": "Arsip HUMED / TE11 — review Step2",
      "kind": "reviewed-photographs",
      "custody": "restricted-original",
      "originalAccess": "prior-review",
      "acceptance": "not-applicable"
    }
  ],
  "media": [
    {
      "id": "pd-gh-map",
      "title": "Peta dan kompas di lapangan",
      "context": "Arsip foto memperlihatkan praktik peta-kompas dalam pendidikan Gunung Hutan XXIX.",
      "rights": "permission-verified",
      "privacy": "cleared",
      "credit": "unverified",
      "sourceUses": [
        {
          "sourceId": "humed-gh29",
          "locator": "Shortlist Step2 / usage role only; original and detailed rights register private"
        }
      ],
      "permissionEvidence": "owner-photo-permission-2026-10-15",
      "privacyEvidence": "owner-participant-permission-2026-10-15",
      "alt": "Peserta membungkuk membaca peta di tanah dengan kompas, sementara rekan berada di latar.",
      "caption": "Peserta membaca peta dan menggunakan kompas di lapangan terbuka.",
      "derivatives": [
        {
          "path": "/media/pd-gh-map-240.webp",
          "width": 240,
          "height": 427,
          "bytes": 21912,
          "sha256": "434b6bf6803dfc2b1f6e180780d7b2b806d30c09c5e6291c6f282c8709cd0e33"
        },
        {
          "path": "/media/pd-gh-map-480.webp",
          "width": 480,
          "height": 853,
          "bytes": 83336,
          "sha256": "5929631200faa9dd01c293f0e3e50de4520c1949cedd2ccdf267d7d1a5f8e826"
        },
        {
          "path": "/media/pd-gh-map-720.webp",
          "width": 720,
          "height": 1280,
          "bytes": 177630,
          "sha256": "0f94439c57af00882bf57febb8321930837b4516f981ee420fbd8ed408b68882"
        }
      ],
      "publicPath": "/media/pd-gh-map-480.webp"
    },
    {
      "id": "pd-rc-team",
      "title": "Pemanjatan dan kerja tim",
      "context": "Arsip foto memperlihatkan pemanjat dan tim di dasar tebing dalam pendidikan Panjat Tebing XXIX.",
      "rights": "permission-verified",
      "privacy": "cleared",
      "credit": "unverified",
      "sourceUses": [
        {
          "sourceId": "humed-rc29",
          "locator": "Shortlist Step2 / usage role only; original and detailed rights register private"
        }
      ],
      "permissionEvidence": "owner-photo-permission-2026-10-15",
      "privacyEvidence": "owner-participant-permission-2026-10-15",
      "alt": "Dua pemanjat berada di dinding batu dengan tali dan tim di dasar tebing.",
      "caption": "Pemanjat berada di dinding batu sementara tim berjaga di bawah.",
      "derivatives": [
        {
          "path": "/media/pd-rc-team-320.webp",
          "width": 320,
          "height": 427,
          "bytes": 49912,
          "sha256": "010ecf90742ea6f14fd5bffc421d967b933a8bfcf516d37f58d9de0253282d42"
        },
        {
          "path": "/media/pd-rc-team-640.webp",
          "width": 640,
          "height": 853,
          "bytes": 203984,
          "sha256": "8b9d21ac68667db26b58be67ca219b31809ebf7ad7607a09541e367b2f5d4b6e"
        }
      ],
      "publicPath": "/media/pd-rc-team-640.webp"
    },
    {
      "id": "kawi-collective",
      "title": "Kebersamaan Tursina",
      "context": "Dokumentasi kolektif Kawi XXIX; tidak menjadi dasar penetapan status individu.",
      "rights": "permission-verified",
      "privacy": "cleared",
      "credit": "unverified",
      "sourceUses": [
        {
          "sourceId": "humed-kawi-review",
          "locator": "Shortlist Step2 / usage role only; original and detailed rights register private"
        }
      ],
      "permissionEvidence": "owner-photo-permission-2026-10-15",
      "privacyEvidence": "owner-participant-permission-2026-10-15",
      "alt": "Kelompok Tursina berfoto bersama di area kampus dalam dokumentasi Kawi XXIX.",
      "caption": "Kelompok Tursina berfoto bersama di area kampus dalam arsip pemberangkatan Kawi XXIX.",
      "derivatives": [
        {
          "path": "/media/kawi-collective-360.webp",
          "width": 360,
          "height": 270,
          "bytes": 19286,
          "sha256": "9aba072c493b38955c2d5157c199d514b14ce198d3b1d86634edab68e81a2716"
        },
        {
          "path": "/media/kawi-collective-720.webp",
          "width": 720,
          "height": 540,
          "bytes": 53296,
          "sha256": "b6b25c4c4dcd0d0252d02cd0276ed9c78fa0037dbc1523c790b6b014a7b143b4"
        },
        {
          "path": "/media/kawi-collective-1200.webp",
          "width": 1200,
          "height": 900,
          "bytes": 103960,
          "sha256": "2fc7f882b2a34d6e49ac7a8910184834810fd79f9ff61b93171e8623ed91d949"
        }
      ],
      "publicPath": "/media/kawi-collective-720.webp"
    },
    {
      "id": "batafia-field",
      "title": "Pendidikan dasar di lapangan",
      "context": "Dokumentasi BATAFIA XXX memperlihatkan kegiatan bersama di medan terbuka.",
      "rights": "permission-verified",
      "privacy": "cleared",
      "credit": "unverified",
      "sourceUses": [
        {
          "sourceId": "humed-batafia-review",
          "locator": "Shortlist Step2 / usage role only; original and detailed rights register private"
        }
      ],
      "permissionEvidence": "owner-photo-permission-2026-10-15",
      "privacyEvidence": "owner-participant-permission-2026-10-15",
      "alt": "Kelompok peserta berponco membawa perlengkapan di jalur berkabut dalam dokumentasi BATAFIA XXX.",
      "caption": "Peserta memakai ponco dan membawa perlengkapan di jalur dengan jarak pandang rendah.",
      "derivatives": [
        {
          "path": "/media/batafia-field-480.webp",
          "width": 480,
          "height": 270,
          "bytes": 19988,
          "sha256": "268cdf84d2e2557cad53299f7ca30540c8e1499c2adb192b9af108a7e5f5ae67"
        },
        {
          "path": "/media/batafia-field-960.webp",
          "width": 960,
          "height": 540,
          "bytes": 56032,
          "sha256": "b769c1e03f1818667a5df837ba2b6ffd4884792ea0ad174f507ee739d7ca5437"
        },
        {
          "path": "/media/batafia-field-1440.webp",
          "width": 1440,
          "height": 810,
          "bytes": 98414,
          "sha256": "fe4d0ff1da657db0a431c18d04d36ea25fbf1df9331a1a51c08887f371d50b4d"
        }
      ],
      "publicPath": "/media/batafia-field-960.webp"
    },
    {
      "id": "te11-documentary",
      "title": "Dokumentasi ekspedisi TE11",
      "context": "Arsip foto ditinjau privat; penggunaan tertentu disetujui; teks kredit masih menunggu konfirmasi.",
      "rights": "permission-verified",
      "privacy": "cleared",
      "credit": "unverified",
      "sourceUses": [
        {
          "sourceId": "humed-te11-review",
          "locator": "Shortlist Step2 / usage role only; original and detailed rights register private"
        }
      ],
      "permissionEvidence": "owner-photo-permission-2026-10-15",
      "privacyEvidence": "owner-participant-permission-2026-10-15",
      "alt": "Empat peserta TE11 bersama spanduk ekspedisi dan bendera di kawasan puncak.",
      "caption": "Empat peserta TE11 berfoto bersama spanduk ekspedisi dan bendera di kawasan puncak.",
      "derivatives": [
        {
          "path": "/media/te11-documentary-480.webp",
          "width": 480,
          "height": 270,
          "bytes": 44390,
          "sha256": "3bc6ce1b62ccb7a0b532cc7e9b4efcafe6baa4b8b5db5f07ecb85d7312ada016"
        },
        {
          "path": "/media/te11-documentary-960.webp",
          "width": 960,
          "height": 541,
          "bytes": 173258,
          "sha256": "36ba9de44d01c0ddc705805b6f94144f262843fde50696063432b0c293480fe4"
        },
        {
          "path": "/media/te11-documentary-1440.webp",
          "width": 1440,
          "height": 811,
          "bytes": 379118,
          "sha256": "658c8377cf8f5587c09ce54b5608fb021e157f9a01a168884c9d2be3956fb30f"
        }
      ],
      "publicPath": "/media/te11-documentary-960.webp"
    },
    {
      "id": "te11-ecology",
      "title": "Dokumentasi ekologis TE11",
      "context": "Detail tumbuhan dari dokumentasi TE11; spesies tidak ditetapkan.",
      "sourceUses": [
        {
          "sourceId": "humed-te11-review",
          "locator": "Step2 asset03; private provenance and rights register retained separately"
        }
      ],
      "rights": "permission-verified",
      "privacy": "cleared",
      "credit": "unverified",
      "permissionEvidence": "owner-photo-permission-2026-10-15",
      "privacyEvidence": "visual-review-no-people-2026-10-15",
      "alt": "Tumbuhan berkantung di antara daun dan vegetasi lantai hutan dalam dokumentasi TE11.",
      "caption": "Tumbuhan berkantung di lantai hutan dalam dokumentasi TE11.",
      "derivatives": [
        {
          "path": "/media/te11-ecology-480.webp",
          "width": 480,
          "height": 270,
          "bytes": 38176,
          "sha256": "c50c84c556130f8cd9d896567169438980ae2020ff03fca303f2875419d09232"
        },
        {
          "path": "/media/te11-ecology-960.webp",
          "width": 960,
          "height": 541,
          "bytes": 104464,
          "sha256": "167aa6bbd4a8a7059d1aa0ea00e4ef41383899b5091a72e2ca4b4fe24487ad19"
        },
        {
          "path": "/media/te11-ecology-1280.webp",
          "width": 1280,
          "height": 721,
          "bytes": 151184,
          "sha256": "c7eee43c035f88d7ce82bbc67b432064684e1b799f253888a349abf396db164b"
        }
      ],
      "publicPath": "/media/te11-ecology-960.webp"
    }
  ],
  "mediaUses": [
    {
      "id": "kawi-collective-usage",
      "assetId": "kawi-collective",
      "recordId": "kawi29",
      "role": "kawi",
      "placement": "activity-documentary",
      "approval": {
        "decisionId": "C2A-13-KAWI",
        "recordedOn": "2026-10-15",
        "evidence": "owner-photo-permission-2026-10-15"
      },
      "sizes": "(min-width: 1254px) 437px, (min-width: 1024px) calc((100vw - 120px) / 2.6), (min-width: 768px) calc((100vw - 88px) / 2.6), calc(100vw - 32px)",
      "institutionalUse": "approved",
      "clearance": "hold",
      "purpose": "public-website"
    },
    {
      "id": "kawi-home-opening",
      "assetId": "kawi-collective",
      "recordId": "kawi29",
      "role": "kawi",
      "placement": "home-opening",
      "approval": {
        "decisionId": "C2A-13-HOME",
        "recordedOn": "2026-10-15",
        "evidence": "owner-photo-permission-2026-10-15"
      },
      "sizes": "(min-width: 1254px) 576px, (min-width: 1200px) calc((100vw - 136px) / 1.94), (min-width: 1024px) calc((100vw - 96px) / 1.94), (min-width: 768px) calc(100vw - 48px), calc(100vw - 32px)",
      "institutionalUse": "approved",
      "clearance": "hold",
      "purpose": "public-website"
    },
    {
      "id": "te11-documentary-usage",
      "assetId": "te11-documentary",
      "recordId": "te11",
      "role": "expedition",
      "placement": "expedition-lead",
      "approval": {
        "decisionId": "C2A-01-TE11",
        "recordedOn": "2026-10-15",
        "evidence": "owner-photo-permission-2026-10-15"
      },
      "sizes": "(min-width: 1024px) 960px, calc(100vw - 32px)",
      "institutionalUse": "approved",
      "clearance": "hold",
      "purpose": "public-website"
    },
    {
      "id": "te11-home-feature",
      "assetId": "te11-documentary",
      "recordId": "te11",
      "role": "expedition",
      "placement": "home-expedition",
      "approval": {
        "decisionId": "C2A-01-HOME",
        "recordedOn": "2026-10-15",
        "evidence": "owner-photo-permission-2026-10-15"
      },
      "sizes": "(min-width: 1254px) 650px, (min-width: 1024px) calc((100vw - 96px) * 0.561312), (min-width: 768px) calc(100vw - 48px), calc(100vw - 32px)",
      "institutionalUse": "approved",
      "clearance": "hold",
      "purpose": "public-website"
    },
    {
      "id": "te11-catalogue-feature",
      "assetId": "te11-documentary",
      "recordId": "te11",
      "role": "expedition",
      "placement": "te-catalogue-feature",
      "approval": {
        "decisionId": "C2A-01-CAT",
        "recordedOn": "2026-10-15",
        "evidence": "owner-photo-permission-2026-10-15"
      },
      "sizes": "(min-width: 1254px) 650px, (min-width: 1024px) calc((100vw - 96px) * 0.561312), (min-width: 768px) calc((100vw - 80px) / 2), calc(100vw - 32px)",
      "institutionalUse": "approved",
      "clearance": "hold",
      "purpose": "public-website"
    },
    {
      "id": "te11-ecology-usage",
      "assetId": "te11-ecology",
      "recordId": "te11",
      "role": "expedition-ecology",
      "placement": "expedition-ecology",
      "approval": {
        "decisionId": "C2A-03-ECO",
        "recordedOn": "2026-10-15",
        "evidence": "owner-photo-permission-2026-10-15"
      },
      "sizes": "(min-width: 1254px) 914px, (min-width: 1024px) calc(100vw - 340px), (min-width: 768px) calc(100vw - 48px), calc(100vw - 32px)",
      "institutionalUse": "approved",
      "clearance": "hold",
      "purpose": "public-website"
    },
    {
      "id": "pd-gh-map-usage",
      "assetId": "pd-gh-map",
      "recordId": "gh29",
      "role": "gh",
      "placement": "activity-documentary",
      "approval": {
        "decisionId": "C2A-07-GH",
        "recordedOn": "2026-10-15",
        "evidence": "owner-photo-permission-2026-10-15"
      },
      "sizes": "(min-width: 768px) 300px, calc(100vw - 32px)",
      "institutionalUse": "approved",
      "clearance": "hold",
      "purpose": "public-website"
    },
    {
      "id": "pd-gh-home-education",
      "assetId": "pd-gh-map",
      "recordId": "gh29",
      "role": "gh",
      "placement": "home-education-gh",
      "approval": {
        "decisionId": "C2A-07-HOME",
        "recordedOn": "2026-10-15",
        "evidence": "owner-photo-permission-2026-10-15"
      },
      "sizes": "(min-width: 1200px) 225px, (max-width: 359px) 113px, 137px",
      "institutionalUse": "approved",
      "clearance": "hold",
      "purpose": "public-website"
    },
    {
      "id": "pd-rc-team-usage",
      "assetId": "pd-rc-team",
      "recordId": "rc29",
      "role": "rc",
      "placement": "activity-documentary",
      "approval": {
        "decisionId": "C2A-10-RC",
        "recordedOn": "2026-10-15",
        "evidence": "owner-photo-permission-2026-10-15"
      },
      "sizes": "(min-width: 768px) 300px, calc(100vw - 32px)",
      "institutionalUse": "approved",
      "clearance": "hold",
      "purpose": "public-website"
    },
    {
      "id": "pd-rc-home-education",
      "assetId": "pd-rc-team",
      "recordId": "rc29",
      "role": "rc",
      "placement": "home-education-rc",
      "approval": {
        "decisionId": "C2A-10-HOME",
        "recordedOn": "2026-10-15",
        "evidence": "owner-photo-permission-2026-10-15"
      },
      "sizes": "(min-width: 1200px) 300px, (max-width: 359px) 150px, 182px",
      "institutionalUse": "approved",
      "clearance": "hold",
      "purpose": "public-website"
    },
    {
      "id": "batafia-field-usage",
      "assetId": "batafia-field",
      "recordId": "batafia30",
      "role": "batafia",
      "placement": "activity-documentary",
      "approval": {
        "decisionId": "C2A-16-BAT",
        "recordedOn": "2026-10-15",
        "evidence": "owner-photo-permission-2026-10-15"
      },
      "sizes": "(min-width: 1254px) 437px, (min-width: 1024px) calc((100vw - 120px) / 2.6), (min-width: 768px) calc((100vw - 88px) / 2.6), calc(100vw - 32px)",
      "institutionalUse": "approved",
      "clearance": "hold",
      "purpose": "public-website"
    }
  ],
  "relations": [
    {
      "id": "activity-kawi29-gh29",
      "kind": "activity-activity",
      "fromId": "kawi29",
      "toId": "gh29",
      "role": "context",
      "sourceUses": [
        {
          "sourceId": "lpj-2025",
          "locator": "Pendakian Kawi Angkatan XXIX, halaman fisik 96–97 / cetak 90–91"
        }
      ]
    },
    {
      "id": "activity-kawi29-rc29",
      "kind": "activity-activity",
      "fromId": "kawi29",
      "toId": "rc29",
      "role": "context",
      "sourceUses": [
        {
          "sourceId": "lpj-2025",
          "locator": "Pendakian Kawi Angkatan XXIX, halaman fisik 96–97 / cetak 90–91"
        }
      ]
    },
    {
      "id": "rc26-shared-departure",
      "kind": "activity-activity",
      "fromId": "rc26",
      "toId": "rc27",
      "role": "shared-departure",
      "sourceUses": [
        {
          "sourceId": "lpj-2023-24",
          "locator": "PDF fisik 53"
        }
      ]
    },
    {
      "id": "caving26-shared-departure",
      "kind": "activity-activity",
      "fromId": "caving26",
      "toId": "caving27",
      "role": "shared-departure",
      "sourceUses": [
        {
          "sourceId": "lpj-2023-24",
          "locator": "PDF fisik 53"
        }
      ]
    },
    {
      "id": "work-sacred-gatekeeper-te11",
      "kind": "work-activity",
      "fromId": "sacred-gatekeeper",
      "toId": "te11",
      "role": "discusses",
      "sourceUses": [
        {
          "sourceId": "sacred-export",
          "locator": "halaman 1"
        }
      ]
    },
    {
      "id": "work-carbon-debt-te11",
      "kind": "work-activity",
      "fromId": "carbon-debt",
      "toId": "te11",
      "role": "discusses",
      "sourceUses": [
        {
          "sourceId": "te11-report",
          "locator": "rencana dan evaluasi"
        }
      ]
    },
    {
      "id": "work-summit-without-carbon-debt-te11",
      "kind": "work-activity",
      "fromId": "summit-without-carbon-debt",
      "toId": "te11",
      "role": "discusses",
      "sourceUses": [
        {
          "sourceId": "carbon-export",
          "locator": "halaman 1–3"
        }
      ]
    },
    {
      "id": "work-te11-documentary-reference-te11",
      "kind": "work-activity",
      "fromId": "te11-documentary-reference",
      "toId": "te11",
      "role": "discusses",
      "sourceUses": [
        {
          "sourceId": "te11-video-appendix",
          "locator": "teks lampiran: thumbnail / kode QR tautan"
        },
        {
          "sourceId": "te11-report",
          "locator": "evaluasi dokumentasi"
        }
      ]
    },
    {
      "id": "history-field-education-2023-gh26",
      "kind": "history-activity",
      "fromId": "field-education-2023",
      "toId": "gh26",
      "role": "context",
      "sourceUses": [
        {
          "sourceId": "lpj-2023-24",
          "locator": "physical 52–53 / Pemantapan Divisi"
        }
      ]
    },
    {
      "id": "history-expedition-knowledge-2024-te11",
      "kind": "history-activity",
      "fromId": "expedition-knowledge-2024",
      "toId": "te11",
      "role": "context",
      "sourceUses": [
        {
          "sourceId": "te11-report",
          "locator": "implementasi dan evaluasi"
        },
        {
          "sourceId": "sacred-export",
          "locator": "halaman 1"
        }
      ]
    },
    {
      "id": "history-expedition-knowledge-2024-sacred-gatekeeper",
      "kind": "history-work",
      "fromId": "expedition-knowledge-2024",
      "toId": "sacred-gatekeeper",
      "role": "context",
      "sourceUses": [
        {
          "sourceId": "te11-report",
          "locator": "implementasi dan evaluasi"
        },
        {
          "sourceId": "sacred-export",
          "locator": "halaman 1"
        }
      ]
    },
    {
      "id": "history-division-education-2025-gh29",
      "kind": "history-activity",
      "fromId": "division-education-2025",
      "toId": "gh29",
      "role": "context",
      "sourceUses": [
        {
          "sourceId": "lpj-2025",
          "locator": "physical 91–93 / PD XXIX"
        }
      ]
    },
    {
      "id": "history-division-education-2025-rc29",
      "kind": "history-activity",
      "fromId": "division-education-2025",
      "toId": "rc29",
      "role": "context",
      "sourceUses": [
        {
          "sourceId": "lpj-2025",
          "locator": "physical 91–93 / PD XXIX"
        }
      ]
    },
    {
      "id": "history-division-education-2025-orad29",
      "kind": "history-activity",
      "fromId": "division-education-2025",
      "toId": "orad29",
      "role": "context",
      "sourceUses": [
        {
          "sourceId": "lpj-2025",
          "locator": "physical 91–93 / PD XXIX"
        }
      ]
    },
    {
      "id": "history-division-education-2025-lh29",
      "kind": "history-activity",
      "fromId": "division-education-2025",
      "toId": "lh29",
      "role": "context",
      "sourceUses": [
        {
          "sourceId": "lpj-2025",
          "locator": "physical 91–93 / PD XXIX"
        }
      ]
    },
    {
      "id": "history-division-education-2025-caving29",
      "kind": "history-activity",
      "fromId": "division-education-2025",
      "toId": "caving29",
      "role": "context",
      "sourceUses": [
        {
          "sourceId": "lpj-2025",
          "locator": "physical 91–93 / PD XXIX"
        }
      ]
    },
    {
      "id": "history-kawi-continuity-2025-kawi29",
      "kind": "history-activity",
      "fromId": "kawi-continuity-2025",
      "toId": "kawi29",
      "role": "context",
      "sourceUses": [
        {
          "sourceId": "lpj-2025",
          "locator": "physical 96–97 / Pendakian Kawi XXIX"
        }
      ]
    },
    {
      "id": "environment-2022-activity",
      "kind": "history-activity",
      "fromId": "environment-2022",
      "toId": "earth-day-2022",
      "role": "documents",
      "sourceUses": [
        {
          "sourceId": "lpj-2022-23",
          "locator": "DOCX fisik 60–61"
        }
      ]
    },
    {
      "id": "siberut-2022-activity",
      "kind": "history-activity",
      "fromId": "siberut-2022",
      "toId": "te10",
      "role": "documents",
      "sourceUses": [
        {
          "sourceId": "lpj-2022-23",
          "locator": "DOCX fisik 61"
        }
      ]
    },
    {
      "id": "magazine-2023-work",
      "kind": "history-work",
      "fromId": "magazine-2023",
      "toId": "summit-attack-vol4",
      "role": "documents",
      "sourceUses": [
        {
          "sourceId": "lpj-2022-23",
          "locator": "DOCX fisik 60"
        }
      ]
    }
  ],
  "demoMembers": [
    {
      "id": "demo-001",
      "nia": "DEMO.001.TRS",
      "name": "Anggota Contoh Satu",
      "synthetic": true
    },
    {
      "id": "demo-002",
      "nia": "DEMO.002.TRS",
      "name": "Anggota Contoh Dua",
      "synthetic": true
    },
    {
      "id": "demo-003",
      "nia": "DEMO.003.TRS",
      "name": "Anggota Contoh Tiga",
      "synthetic": true
    }
  ]
} satisfies InstitutionalRegistry;
