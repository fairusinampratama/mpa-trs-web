import {createContext,useContext,type ReactNode} from 'react';
import {activityRecords,expeditionRecords,programmeDefinitions,publicWorks} from './content';
import {historyInputs,institutionalInformation,syntheticMembers} from './institutional-data';
import {sourceDefinitions} from './source-registry';
import {validateHistory,validateSyntheticMembers,type PublicationRecord,type HistoryEntry,type SyntheticMember,type InstitutionalInformation} from './institutional-model';
validateHistory(historyInputs,{sources:sourceDefinitions,activityIds:[...activityRecords,...expeditionRecords].map(r=>r.id),programmeIds:programmeDefinitions.map(r=>r.id)},publicWorks.map(w=>w.id));validateSyntheticMembers(syntheticMembers);
export type InstitutionalRegistry={works:readonly PublicationRecord[];history:readonly HistoryEntry[];members:readonly SyntheticMember[];information:InstitutionalInformation};
export const institutionalRegistry:InstitutionalRegistry={works:publicWorks,history:historyInputs,members:syntheticMembers,information:institutionalInformation};
const Context=createContext<InstitutionalRegistry>(institutionalRegistry);
// Test/private review only: no URL/API/local-storage source replacement.
export function InstitutionalContentProvider({records=institutionalRegistry,children}:{records?:InstitutionalRegistry;children:ReactNode}){return <Context.Provider value={records}>{children}</Context.Provider>;}
export function useInstitutionalRecords(){return useContext(Context);}
