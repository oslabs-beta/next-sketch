import { Dispatch, SetStateAction, createContext } from 'react';
import { Tag } from '../utils/interfaces';

interface AppContextType {
  tags: Tag[];
  setTags: Dispatch<SetStateAction<Tag[]>>;
}

export default createContext<AppContextType | null>(null); 