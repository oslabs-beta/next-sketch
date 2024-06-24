import React, {
  Dispatch,
  SetStateAction,
  useState,
  useEffect,
  createContext,
} from 'react';
import { Box, Grid, Typography, AppBar, Toolbar, Button } from '@mui/material';
import StaticTagsContainer from './components/middle/StaticTagsContainer';
import './App.css';
import CreateComponentBtn from './components/middle/CreateComponentBtn';
import explorer from './components/left/data/folderData';
import Folder from './components/left/folder';
import useTraverseTree from './components/left/hooks/use-traverse-tree';
import CustomEndpoint from './components/left/CustomEndpoint';
import TabsComponent from './components/right/TabsComponent';
import DisplayContainer from './components/right/DisplayContainer';
import { Tag, Elements, ComponentNameType, CodeSnippetType } from './utils/interfaces';
import { generateId } from './utils/generateId';
import WebFont from 'webfontloader';
import ExportButton from './components/right/ExportButton';
import AppContext from './context/AppContext';
import Tree from './components/right/Tree';
import CodePreview from './components/right/CodePreview';
import { DndContext } from '@dnd-kit/core';
import DragOverlayWrapper from './components/middle/DragOverlayWrapper';
import { image } from 'd3';

// test



export const CodeContext = createContext<ComponentNameType | undefined>(
  undefined
);

export const CodeSnippetContext = createContext<CodeSnippetType | undefined>(
  undefined
);

const App = () => {
  const [folderExpanded, setFolderExpanded] = useState(false);
  const [open, setOpen] = useState(false);
  const [explorerData, setExplorerData] = useState(explorer);
  const [componentName, setComponentName] = useState('Page');
  const [codeSnippet, setCodeSnippet] = useState<CodeSnippetType | undefined>(
    undefined
  );
  const [folder, setFolder] = useState('');
  const [file, setFile] = useState('');
  const [postData, setPostData] = useState<boolean>(false);

  // tags context
  const [tags, setTags] = useState<Tag[]>([]);
  const [currentId, setCurrentId] = useState<number>(8);
  const [update, setUpdate] = useState<boolean>(false);
  const [reset, setReset] = useState<boolean>(false);
  const [previewFolder, setPreviewFolder] = useState<string>('');
  const [currentParent, setCurrentParent] = useState<string>('');

  const [srcApp, setSrcApp] = useState(explorer.items[2]);

  const {
    insertNode,
    deleteNode,
    createCustomEndpoint,
    insertBoilerFiles,
    updatePreview,
    initialPreview,
  } = useTraverseTree();

  const handleInsertNode = (
    folderId: number,
    item: string,
    isFolder: boolean,
    preview?: string
  ) => {
    const finalTree: typeof explorer = insertNode(
      explorerData,
      folderId,
      item,
      isFolder,
      preview
    );

    setExplorerData(finalTree);
    
    for (let items of finalTree.items) {
      if (items.name === 'src') setSrcApp(items);
    }
  };

  const handleDeleteNode = (folderId?: number) => {
    const finalTree: typeof explorer = deleteNode(explorerData, folderId);
    setExplorerData(finalTree);
    for (let items of finalTree.items) {
      if (items.name === 'src') setSrcApp(items);
    }
  };

  const handleUpdatePreview = (fileId: number, preview: string, tags: Tag[]): typeof explorer | void => {
    const finalTree: typeof explorer = updatePreview(explorerData, fileId, preview, tags);

    setExplorerData(finalTree);
  };

  const handleInitialPreview = (
    folderName: string,
    fileName: string,
    preview: string,
    tags: []
  ): typeof explorer | void => {
    const finalTree: typeof explorer = initialPreview(
      explorerData,
      folderName,
      fileName,
      preview,
      tags
    );

    setExplorerData(finalTree);
  };

  const handleCreateCustomEndpoint = (
    folderId: number,
    item: string,
    isFolder?: boolean
  ): typeof explorer | void => {
    const finalTree = createCustomEndpoint(
      explorerData,
      folderId,
      item,
      isFolder
    );
    setExplorerData(finalTree);
   
    for (let items of finalTree.items) {
      if (items.name === 'src') setSrcApp(items);
    }
  };

  const handleInputBoilerFiles = (
    folderId: number,
    item: string,
    folderName: string,
    preview?: string
  ): typeof explorer | void => {
    const finalTree: any = insertBoilerFiles(
      explorerData,
      folderId,
      item,
      folderName,
      preview,
    );

    setExplorerData(finalTree);

    for (let items of finalTree.items) {
      if (items.name === 'src') setSrcApp(items);
    }
  };

  return (
    <Box>
      <AppBar position='static' sx={{ bgcolor: 'transparent', marginBottom: '2%' }}>
        <Toolbar sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{display: 'flex' }}>
          <img src='images/nslogo.png' style={{ transform: 'rotate(30deg)', width: '10%', alignSelf: 'center', height: '60px', paddingRight: '2%', marginTop: '2%' }} />


          <Typography
            className='logo'
            variant='h3'
            sx={{
            fontFamily: 'Roboto Mono',
            // marginBottom: '0.5em',
            color: 'white',
            textShadow: '2px 2px 4px rgba(255, 255, 255, 0.5)', // Adjust shadow values as needed
            alignSelf:'center'
            }}
          >
  
          NextSketch
          </Typography>
          </div>
        
          <ExportButton />
        </Toolbar>
      </AppBar>

      {/* <Box
        sx={{
          height: '87vh',
          width: '95vw',
          marginLeft: 5,
          marginRight: 4,
          
          // margin: 1,
          padding: 1,
          borderRadius: 3,
          // bgcolor: 'rgba(255, 255, 255, 0.7)',
          // boxShadow: '7px 12px 49px -14px rgba(255,255,255,1)',
          paddingTop: '1.3%',
          bgcolor: 'rgba(38,38,38)',
          // border: 2,
          // borderColor: 'red',
        }}
      >  */}
        <CodeContext.Provider value={[componentName, setComponentName]}>
          <CodeSnippetContext.Provider value={[codeSnippet, setCodeSnippet]}>
            <AppContext.Provider
              value={{
                tags,
                setTags,
                currentId,
                setCurrentId,
                update,
                setUpdate,
                reset,
                setReset,
                previewFolder,
                setPreviewFolder,
                currentParent,
                setCurrentParent,
              }}
            >
              <Grid
                container
                sx={{
                  height: '85vh',
                  paddingLeft: '1.3%',
                  // border: 2,
                  // borderColor: 'blue',
                  gap: '23px'
                }}
              >
                <Grid
                  item
                  sm={4}
                  md={3.5}
                  lg={3}
                  xl={2.5}
                  sx={{
                    maxHeight: '100%',
                    // border: 2,
                    // borderColor: 'pink',
                    paddingLeft: 1,
                    overflow: 'auto',
                    scrollbarWidth: 'none',
                    '&::-webkit-scrollbar': {
                      display: 'none', // Hide the scrollbar for WebKit browsers (Chrome, Safari, Edge, etc.)
                    },
                    '&-ms-overflow-style:': {
                      display: 'none', // Hide the scrollbar for IE
                    },
                  }}
                >
                  <CustomEndpoint
                    handleCreateCustomEndpoint={handleCreateCustomEndpoint}
                    handleInputBoilerFiles={handleInputBoilerFiles}
                    handleUpdatePreview={handleUpdatePreview}
                    handleInitialPreview={handleInitialPreview}
                    explorer={explorerData}
                    open={open}
                    setOpen={setOpen}
                    setFolder={setFolder}
                    folder={folder}
                    setFile={setFile}
                    file={file}
                    setPostData={setPostData}
                    postData={postData}
                  />
                  <Folder
                    handleInsertNode={handleInsertNode}
                    handleDeleteNode={handleDeleteNode}
                    handleInputBoilerFiles={handleInputBoilerFiles}
                    explorer={explorerData}
                    folderExpanded={folderExpanded}
                    setFolderExpanded={setFolderExpanded}
                    setFolder={setFolder}
                    folder={folder}
                    setFile={setFile}
                    file={file}
                    setPostData={setPostData}
                    postData={postData}
                  />
                </Grid>

                <DndContext>
                  <Grid
                    item
                    sm={3.75}
                    md={4}
                    lg={4.25}
                    xl={4.5}
                    sx={{
                      // border: 2,
                      // borderColor: 'black',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                  
                    }}
                  > 
                    <Box style={{alignSelf: 'flex-start', height: '40vh'}}>
                      <StaticTagsContainer />
                    </Box>
                    
                    <Box
                      sx={{
                        // border: 1,
                        // borderColor: 'lawngreen',
                        // flexGrow: 1,
                        height: '45vh',
                        background: 'transparent',
                        boxShadow: '-1px 1px 18px 0px rgba(0,0,0,0.75)',
                        borderRadius: '20px',
                    
                      }}
                    >
                      <Tree explorer={explorerData} srcApp={srcApp} />
                    </Box>
                  </Grid>

                  <Grid
                    item
                    sm={3.75}
                    md={4}
                    lg={4.25}
                    xl={4.5}
                    sx={{
                      justifyContent: 'space-between',
                      maxHeight: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      
                    }}
                  >
                    <Box
                      sx={{
                        width: '100%',
                        height: '35vh',
                        // height: '400px',
                        // border: 2,
                        // borderColor: 'orange',
                        paddingLeft: 2,
                        paddingRight: 2,
                        boxShadow: '-1px 1px 18px 0px rgba(0,0,0,0.75)',
                        borderRadius: '20px',
                        overflow: 'hidden',
                        
                      }}
                    >
                      <DisplayContainer
                        explorer={explorerData}
                        handleUpdatePreview={handleUpdatePreview}
                      />
                    </Box>

                    <Box sx={{height: '45vh'}}>
                    <CodePreview treeData={explorerData} />
                    </Box>
                    
                  </Grid>
                  <DragOverlayWrapper />
                </DndContext>
              </Grid>
            </AppContext.Provider>
          </CodeSnippetContext.Provider>
        </CodeContext.Provider>
      </Box>
    // </Box>
  );
};

export default App;
