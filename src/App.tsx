/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import { Box, Grid, Typography, AppBar, Toolbar } from '@mui/material';
import StaticTagsContainer from './components/middle/StaticTagsContainer';
import './App.css';
import explorer from './components/left/data/folderData';
import Folder from './components/left/folder';
import useTraverseTree from './components/left/hooks/use-traverse-tree';
import CustomEndpoint from './components/left/CustomEndpoint';
import DisplayContainer from './components/right/DisplayContainer';
import { Tag } from './utils/interfaces';
import ExportButton from './components/right/ExportButton';
import AppContext from './context/AppContext';
import Tree from './components/right/Tree';
import CodePreview from './components/right/CodePreview';
import { DndContext } from '@dnd-kit/core';
import DragOverlayWrapper from './components/middle/DragOverlayWrapper';

const App = () => {
  const [folderExpanded, setFolderExpanded] = useState(false);
  const [open, setOpen] = useState(false);
  const [explorerData, setExplorerData] = useState(explorer);
  const [componentName, setComponentName] = useState('Page');
  const [codeSnippet, setCodeSnippet] = useState('');
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
    for (const items of finalTree.items) {
      if (items.name === 'src') setSrcApp(items);
    }
  };

  const handleDeleteNode = (folderId: number) => {
    const finalTree: any = deleteNode(explorerData, folderId);
    setExplorerData(finalTree);
    for (const items of finalTree.items) {
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
    for (const items of finalTree.items) {
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
      undefined,
      tags
    );

    setExplorerData(finalTree);
    // setSrcApp(finalTree.items[2]);
    for (const items of finalTree.items) {
      if (items.name === 'src') setSrcApp(items);
    }
  };

  return (
    <Box>
      <AppBar
        position='static'
        sx={{ bgcolor: 'transparent', marginBottom: '2%' }}
      >
        <Toolbar sx={{ justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex' }}>
            <img
              src='src/images/nslogo.png'
              style={{
                transform: 'rotate(30deg)',
                width: '6%',
                alignSelf: 'center',
                paddingRight: '2%',
                marginTop: '2%',
              }}
            />

            <Typography
              className='logo'
              variant='h3'
              sx={{
                fontFamily: 'Roboto Mono',
                // marginBottom: '0.5em',
                color: 'white',
                textShadow: '2px 2px 4px rgba(255, 255, 255, 0.5)', // Adjust shadow values as needed
                alignSelf: 'center',
              }}
            >
              NextSketch
            </Typography>
          </div>

          <ExportButton />
        </Toolbar>
      </AppBar>
      <AppContext.Provider
        value={{
          componentName,
          setComponentName,
          codeSnippet,
          setCodeSnippet,
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
            gap: '23px',
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
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
              }}
            >
              <Box style={{ alignSelf: 'flex-start', height: '40vh' }}>
                <StaticTagsContainer />
              </Box>

              <Box
                sx={{
                  height: '45vh',
                  background: 'transparent',
                  boxShadow: '-1px 1px 18px 0px rgba(0,0,0,0.75)',
                  borderRadius: '20px',
                }}
              >
                <Tree srcApp={srcApp} />
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
                  paddingLeft: 2,
                  paddingRight: 2,
                  boxShadow: '-1px 1px 18px 0px rgba(0,0,0,0.75)',
                  borderRadius: '20px',
                  overflow: 'hidden',
                }}
              >
                <DisplayContainer />
              </Box>

              <Box sx={{ height: '45vh' }}>
                <CodePreview />
              </Box>
            </Grid>
            <DragOverlayWrapper />
          </DndContext>
        </Grid>
      </AppContext.Provider>
    </Box>
  );
};

export default App;
