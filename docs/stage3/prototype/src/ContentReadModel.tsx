import {createContext,useContext} from 'react';
import {canonicalRegistry,preview} from './domain/index.ts';
import {projectPreview} from './domain/project.ts';
export const ContentReadContext=createContext({registry:canonicalRegistry,view:preview});
export const useContentReadModel=()=>useContext(ContentReadContext);
export type ContentView=ReturnType<typeof projectPreview>;
