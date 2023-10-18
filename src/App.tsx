import React, { Dispatch, SetStateAction, useState } from 'react';
import TagsContainer from './components/middle/TagsContainer';
import './App.css';
import CreateComponentBtn from './components/middle/CreateComponentBtn';
import CodePreview from './components/right/CodePreview';
import explorer from "./components/left/data/folderData";
import Folder from "./components/left/folder"
import useTraverseTree from "./components/left/hooks/use-traverse-tree";
import CustomEndpoint from './components/left/CustomEndpoint';

interface ComponentNameType {
  componentName: string;
  setComponentName: Dispatch<SetStateAction<string>>;
}

export const CodeContext = React.createContext<ComponentNameType | undefined>(
  undefined
);



const App = () => {
  const [explorerData, setExplorerData] = useState(explorer);
  const [componentName, setComponentName] = useState<string>('App');

  const { insertNode, deleteNode, createCustomEndpoint } = useTraverseTree();

  const handleInsertNode = (folderId: number, item: string, isFolder: boolean) => {
    const finalTree: any = insertNode(explorerData, folderId, item, isFolder)


    setExplorerData(finalTree)
  }


  const handleDeleteNode = (folderId: number) => {
      const finalTree: any = deleteNode(explorerData, folderId);
      setExplorerData(finalTree)
  }


  const handleCreateCustomEndpoint = (folderId: number, item: string, ) => {
    const finalTree: any = createCustomEndpoint(explorerData, folderId, item);
    setExplorerData(finalTree)
}



  return (
    <CodeContext.Provider value={[componentName, setComponentName]}>
      <Folder 
      handleInsertNode={handleInsertNode}
      handleDeleteNode={handleDeleteNode}
      explorer ={explorerData}
      />

      <CustomEndpoint 
      handleCreateCustomEndpoint={handleCreateCustomEndpoint}
      explorer={explorerData} 
      />
      <CreateComponentBtn />
      <div className='flex'>
        <TagsContainer />
      </div>
      <CodePreview />
    </CodeContext.Provider>
  )
}


export default App;
