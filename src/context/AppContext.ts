import { Dispatch, SetStateAction, createContext } from 'react';
import { Tag } from '../utils/interfaces';

interface AppContextType {
  componentName: string;
  setComponentName: Dispatch<SetStateAction<string>>;
  codeSnippet: string;
  setCodeSnippet: Dispatch<SetStateAction<string>>;
  tags: Tag[];
  setTags: Dispatch<SetStateAction<Tag[]>>;
  currentId: number;
  setCurrentId: Dispatch<SetStateAction<number>>;
  update: boolean;
  setUpdate: Dispatch<SetStateAction<boolean>>;
  reset: boolean;
  setReset: Dispatch<SetStateAction<boolean>>;
  previewFolder: string;
  setPreviewFolder: Dispatch<SetStateAction<string>>;
  currentParent: string;
  setCurrentParent: Dispatch<SetStateAction<string>>;
}

export default createContext<AppContextType | null>(null);
