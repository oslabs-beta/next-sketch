import React, { Dispatch, SetStateAction, useState } from 'react';
import { Box, Grid } from '@mui/material';
import TagsContainer from './components/middle/TagsContainer';
import './App.css';
import CreateComponentBtn from './components/middle/CreateComponentBtn';
import CodePreview from './components/right/CodePreview';
import explorer from './components/left/data/folderData';
import Folder from './components/left/folder';
import useTraverseTree from './components/left/hooks/use-traverse-tree';
import CustomEndpoint from './components/left/CustomEndpoint';
import TabsComponent from './components/right/TabsComponent';
import DisplayContainer from './components/right/DisplayContainer';
import { Tag, Elements } from './utils/interfaces';
import { generateId } from './utils/generateId';


interface ComponentNameType {
  componentName: string;
  setComponentName: Dispatch<SetStateAction<string>>;
}

export const CodeContext = React.createContext<ComponentNameType | undefined>(
  undefined
);

const App = () => {
  const [elements, setElements] = useState<Tag[]>([
    { id: generateId(),
      name: 'div',
    },
    {
      id: generateId(),
      name: 'img',
    },
    {
      id: generateId(),
      name: 'p',
    },
    {
      id: generateId(),
      name: 'form',
    },
    {
      id: generateId(),
      name: 'button',
    },
    {
      id: generateId(),
      name: 'link',
    },
  ]);

  const [explorerData, setExplorerData] = useState(explorer);
  const [componentName, setComponentName] = useState<string>('App');

  const { insertNode, deleteNode, createCustomEndpoint } = useTraverseTree();

  const handleInsertNode = (
    folderId: number,
    item: string,
    isFolder: boolean
  ) => {
    const finalTree: any = insertNode(explorerData, folderId, item, isFolder);

    setExplorerData(finalTree);
  };

  const handleDeleteNode = (folderId: number) => {
    const finalTree: any = deleteNode(explorerData, folderId);
    setExplorerData(finalTree);
  };

  const handleCreateCustomEndpoint = (folderId: number, item: string) => {
    const finalTree: any = createCustomEndpoint(explorerData, folderId, item);
    setExplorerData(finalTree);
  };

  return (
    <CodeContext.Provider value={[componentName, setComponentName]}>
      <Box sx={{ flexGrow: 1 }}>
        <Grid
          container
          justifyContent={'space-between'}
          sx={{ height: '100vh' }}
        >
          <Grid item xs={3.5}>
            <CustomEndpoint
              handleCreateCustomEndpoint={handleCreateCustomEndpoint}
              explorer={explorerData}
            />
            <Folder
              handleInsertNode={handleInsertNode}
              handleDeleteNode={handleDeleteNode}
              explorer={explorerData}
            />
          </Grid>

          <Grid item xs={4} sx={{ display: 'flex' }}>
            <Grid alignSelf={'flex-start'}>
              <CreateComponentBtn />
            </Grid>
            <TagsContainer />
          </Grid>
          
          <Grid item xs={4} sx={{ border: 2, borderColor: 'green' }}>
            <TabsComponent />
          <Grid item xs={4}>
            <CodePreview />
            {/* <DisplayContainer /> */}
          </Grid>
        </Grid>
      </Box>
    </CodeContext.Provider>
  );
};

export default App;
