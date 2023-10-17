import React, { Dispatch, SetStateAction, useState } from 'react';
import HTMLTagsContainer from './components/middle/HTMLTagsContainer';
import './App.css';
import CreateComponentBtn from './components/middle/CreateComponentBtn';
import CodePreview from './components/right/CodePreview';

interface ComponentNameType {
  componentName: string;
  setComponentName: Dispatch<SetStateAction<string>>;
}

export const CodeContext = React.createContext<ComponentNameType | undefined>(
  undefined
);
// import ShowFiles from "./components/left/FileStructure/ShowFiles";
import explorer from "./components/left/data/folderData";
import Folder from "./components/left/folder.tsx"
import useTraverseTree from "./components/left/hooks/use-traverse-tree.ts";
// const fs = require('fs');
// const filepath = './components/left/data/folderData.ts'

const App = () => {
  const [explorerData, setExplorerData] = useState(explorer);
  const [componentName, setComponentName] = useState<string>('App');

  const { insertNode } = useTraverseTree();

  const handleInsertNode = (folderId: number, item: string, isFolder: boolean) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const finalTree: any = insertNode(explorerData, folderId, item, isFolder)


    setExplorerData(finalTree)
  }
  return (
    <CodeContext.Provider value={[componentName, setComponentName]}>
      <Folder handleInsertNode={handleInsertNode} explorer={explorerData} />

      <CreateComponentBtn />
      <div className='flex'>
        <HTMLTagsContainer />
      </div>
      <CodePreview />
    </CodeContext.Provider>
  )
}


export default App;
