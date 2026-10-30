import type { ActivityInput } from '../src/activity-model.ts';
// Test-only data: no application entry imports this module.
export const addedActivityInputs: ActivityInput[] = [
  { id:'pd-proof', title:'PD Uji Data — GH DEMO', summary:'Fixture sintetis untuk menguji penambahan record dan angkatan melalui data.', kind:'division-education', depth:'basic', state:'planned', programId:'pd', divisionIds:['GH'], cohortIds:['DEMO'], sourceUses:[{sourceId:'synthetic-fixture',locator:'Uji kontrak data'}], editorial:{verification:'synthetic',readiness:'review-draft',website:'prototype'} },
  { id:'pd-no-cohort-proof', title:'PD Uji Tanpa Angkatan', summary:'Fixture sintetis tanpa hubungan angkatan dan tanpa tanggal atau lokasi rekaan.', kind:'division-education', depth:'basic', state:'planned', programId:'pd', divisionIds:['ORAD'], sourceUses:[{sourceId:'synthetic-fixture',locator:'Uji bidang tanpa angkatan'}], editorial:{verification:'synthetic',readiness:'review-draft',website:'prototype'} },
  { id:'independent-proof', title:'Lokakarya Uji Data Mandiri', summary:'Fixture sintetis tanpa program, divisi, angkatan, tanggal atau media.', kind:'workshop', depth:'basic', state:'planned', sourceUses:[{sourceId:'synthetic-fixture',locator:'Uji kegiatan mandiri'}], editorial:{verification:'synthetic',readiness:'review-draft',website:'prototype'} },
];
