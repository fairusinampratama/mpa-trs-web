import { createContext, useContext, type ReactNode } from 'react';
import { activityRecords } from './content';
import type { ActivityRecord } from './activity-model';
const ActivityContext = createContext<readonly ActivityRecord[]>(activityRecords);
// In-memory injection supports isolated fixture tests/private review. No external
// URL, API, storage or end-user input can replace the published registry.
export function ActivityContentProvider({ records = activityRecords, children }: { records?: readonly ActivityRecord[]; children: ReactNode }) {
  return <ActivityContext.Provider value={records}>{children}</ActivityContext.Provider>;
}
export function useActivityRecords() { return useContext(ActivityContext); }
