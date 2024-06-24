import { Dispatch, SetStateAction, createContext } from 'react';
import { Tag } from '../utils/interfaces';

export interface AppContextType {
  tags: Tag[];
  setTags: Dispatch<SetStateAction<Tag[]>>;
  currentId: number;
  setCurrentId: Dispatch<SetStateAction<number>>;
  update: boolean;
  setUpdate: Dispatch<SetStateAction<boolean>>;
  reset: boolean;
  setReset: Dispatch<SetStateAction<boolean>>;
  previewFolder: string,
  setPreviewFolder: Dispatch<SetStateAction<string>>;
  currentParent: string,
  setCurrentParent: Dispatch<SetStateAction<string>>;
}

export default createContext<AppContextType | null>(null); 