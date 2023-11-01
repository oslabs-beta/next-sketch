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
import { Tag, Elements } from './utils/interfaces';
import { generateId } from './utils/generateId';
import WebFont from 'webfontloader';
import ExportButton from './components/right/ExportButton';
import AppContext from './context/AppContext';
import Tree from './components/right/Tree';
import CodePreview from './components/right/CodePreview';
import { DndContext } from '@dnd-kit/core';
import DragOverlayWrapper from './components/middle/DragOverlayWrapper';

// test

interface ComponentNameType {
  componentName: string;
  setComponentName: Dispatch<SetStateAction<string>>;
}

interface CodeSnippetType {
  codeSnippet: string;
  setCodeSnippet: Dispatch<SetStateAction<string>>;
}

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
    preview: string
  ) => {
    const finalTree: any = insertNode(
      explorerData,
      folderId,
      item,
      isFolder,
      preview
    );

    setExplorerData(finalTree);
    // setSrcApp(finalTree.items[2]);
    for (let items of finalTree.items) {
      if (items.name === 'src') setSrcApp(items);
    }
  };

  const handleDeleteNode = (folderId: number) => {
    const finalTree: any = deleteNode(explorerData, folderId);
    setExplorerData(finalTree);
    for (let items of finalTree.items) {
      if (items.name === 'src') setSrcApp(items);
    }
  };

  const handleUpdatePreview = (fileId: number, preview: string, tags: []) => {
    const finalTree: any = updatePreview(explorerData, fileId, preview, tags);

    setExplorerData(finalTree);
  };

  const handleInitialPreview = (
    folderName: string,
    fileName: string,
    preview: string,
    tags: []
  ) => {
    const finalTree: any = initialPreview(
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
    isFolder: boolean
  ) => {
    const finalTree: any = createCustomEndpoint(
      explorerData,
      folderId,
      item,
      isFolder
    );
    setExplorerData(finalTree);
    // setSrcApp(finalTree.items[2])
    for (let items of finalTree.items) {
      if (items.name === 'src') setSrcApp(items);
    }
  };

  const handleInputBoilerFiles = (
    folderId: number,
    item: string,
    folderName: string,
    preview: string,
    tags: []
  ) => {
    // if (item === '') return;
    const finalTree: any = insertBoilerFiles(
      explorerData,
      folderId,
      item,
      folderName,
      preview,
      tags
    );

    setExplorerData(finalTree);
    // setSrcApp(finalTree.items[2]);
    for (let items of finalTree.items) {
      if (items.name === 'src') setSrcApp(items);
    }
  };

  return (
    <Box sx={{ border: 2, borderColor: 'brown' }}>
      <AppBar position='static' sx={{ bgcolor: 'skyblue' }}>
        <Toolbar sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography
            variant='h3'
            sx={{
              fontFamily: 'Titillium Web',
              // marginBottom: '0.5em',
              color: '#061E47',
              textShadow: '2px 2px 4px rgba(255, 255, 255, 0.5)', // Adjust shadow values as needed
            }}
          >
            NextSketch
          </Typography>
          <ExportButton />
        </Toolbar>
      </AppBar>

      <Box
        sx={{
          marginTop: 6,
          marginLeft: 1,
          marginRight: 1,
          // margin: 1,
          padding: 1,
          borderRadius: 3,
          bgcolor: 'rgba(255, 255, 255, 0.7)',
          boxShadow: '7px 12px 49px -14px rgba(255,255,255,1)',
          border: 2,
          borderColor: 'red',
        }}
      >
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
                  height: '79vh',
                  border: 2,
                  borderColor: 'blue',
                }}
              >
                <Grid
                  item
                  sm={4.5}
                  md={4}
                  lg={3.5}
                  xl={3}
                  sx={{
                    maxHeight: '79vh',
                    border: 2,
                    borderColor: 'pink',
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
                    handleInitialPreview={handleInitialPreview}
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
                      border: 2,
                      borderColor: 'black',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                    }}
                  >
                    <StaticTagsContainer />
                    <Box
                      sx={{
                        border: 2,
                        borderColor: 'lawngreen',
                        flexGrow: 1,
                        background: '#42464C',
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
                      display: 'flex',
                      flexDirection: 'column',
                      border: 2,
                      borderColor: 'cyan',
                    }}
                  >
                    <Box
                      sx={{
                        width: '100%',
                        height: '35vh',
                        border: 2,
                        borderColor: 'orange',
                        paddingLeft: 2,
                        paddingRight: 2,
                      }}
                    >
                      <DisplayContainer
                        explorer={explorerData}
                        handleUpdatePreview={handleUpdatePreview}
                      />
                    </Box>
                    <CodePreview treeData={explorerData} />
                  </Grid>
                  <DragOverlayWrapper />
                </DndContext>
              </Grid>
            </AppContext.Provider>
          </CodeSnippetContext.Provider>
        </CodeContext.Provider>
      </Box>
    </Box>
  );
};

export default App;
