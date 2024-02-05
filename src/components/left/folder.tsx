/* eslint-disable @typescript-eslint/no-explicit-any */
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faFolderPlus,
  faFolderClosed,
  faFolderOpen,
  faFileCirclePlus,
  faAtom,
  faMinus,
} from '@fortawesome/free-solid-svg-icons';
import Modal from '@mui/material/Modal';
import Checkbox from '@mui/material/Checkbox';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import React, { useContext, useState } from 'react';
import AppContext from '../../context/AppContext';

import { modalLayout } from '../../utils/interfaces';

interface Input {
  visible: boolean | undefined;
  isFolder: boolean | null | undefined;
}
const cacheModal: string[] = [];
function Folder({
  handleInsertNode,
  handleDeleteNode,
  handleInputBoilerFiles,
  explorer,
  setFolder,
  folder,
  setFile,
  file,
  setPostData,
  postData,
}: any) {
  const [folderIcon, setFolderIcon] = useState<string>('▶');
  const [folderLogo, setFolderLogo] = useState(
    <FontAwesomeIcon icon={faFolderClosed} />
  );

  const {
    setCodeSnippet,
    setComponentName,
    setTags,
    setCurrentId,
    setReset,
    setPreviewFolder,
  } = useContext(AppContext);
  const [open, setOpen] = useState(false);
  const [expand, setExpand] = useState(false);

  const style = {
    position: 'absolute' as const,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    height: 'fit-content',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    color: 'black',
    p: 4,
    borderRadius: '20px',
    fontSize: '1.6rem',
  };

  const [selectedItems, setSelectedItems] = useState<modalLayout>({
    default: false,
    error: false,
    layout: false,
    loading: false,
    notFound: false,
    route: false,
    template: false,
    page: true,
  });

  const [showInput, setShowInput] = useState<Input>({
    visible: false,
    isFolder: null,
  });

  const handleClose = () => {
    setOpen(false);
    setFolder('');
    setSelectedItems({
      default: false,
      error: false,
      layout: false,
      loading: false,
      notFound: false,
      route: false,
      template: false,
      page: true,
    });
  };

  const handleNewFolder = (e?: React.MouseEvent, arg?: boolean) => {
    e?.stopPropagation();
    setExpand(true);
    setFolderIcon('▼');
    setFolderLogo(<FontAwesomeIcon icon={faFolderOpen} />);

    setShowInput({
      visible: true,
      isFolder: arg,
    });

    if (arg === false) {
      console.log(e.target);
      // setComponentName();
    }
  };

  const handleModalChange = async (e?: any) => {
    const name = e.target.name.slice(0, -4);
    setPostData(true);
    setTags([]);

    setSelectedItems({
      ...selectedItems,
      [name]: true,
    });

    const fileName = e.target.name;
    setFile(fileName);

    if (!cacheModal.includes(fileName)) {
      cacheModal.push(fileName);
    }

    setComponentName(fileName);
  };

  const retrieveCode = () => {
    //This is to avoid posting a new file every time you click it (useEffect in customEndPoint)

    setPreviewFolder(explorer.parent);

    setPostData(false);

    //activates the reset, it helps so the useEffect in codePreview doesn't run completely
    setReset(true);

    //data to relate to the new code snippet
    setComponentName(explorer.name);
    setCodeSnippet(explorer.preview);
    setCurrentId(explorer.id);

    //clears the tags
    if (explorer.tags === undefined) {
      setTags([]);
    } else {
      setTags(explorer.tags);
    }
    // console.log('EXPLORER TAGS', explorer.tags)
    // setTags(explorer.tags)
  };

  const onAddFolder = async (e?: React.KeyboardEvent<HTMLInputElement>) => {
    if (e?.key === 'Enter' && e?.currentTarget.value) {
      handleInsertNode(explorer.id, e.currentTarget.value, showInput.isFolder);

      setFolder(e.currentTarget.value);

      const body = {
        fileName: e.currentTarget.value,
        folderName: explorer.name,
        isFolder: showInput.isFolder,
      };

      await fetch('http://localhost:3000/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });

      setShowInput({ ...showInput, visible: false });

      if (showInput.isFolder) setOpen(true);
    }
  };

  const handleDeleteFolder = async (e?: React.MouseEvent) => {
    e?.stopPropagation();
    handleDeleteNode(explorer.id);
    setComponentName('Page');
    setTags([]);

    await fetch('http://localhost:3000/', {
      method: 'Delete',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name: explorer.name }),
    });

    setShowInput({ ...showInput, visible: false });
  };

  if (explorer.isFolder) {
    return (
      <div style={{ marginTop: 5 }}>
        <Modal
          open={open}
          aria-labelledby='modal-title'
          aria-describedby='modal-description'
        >
          <Box sx={style}>
            <Typography
              id='modal-title'
              variant='h6'
              component='h2'
              style={{ marginBottom: 20, fontSize: 30 }}
            >
              Choose Your Template Files
            </Typography>

            <div>
              <Checkbox name='page.tsx' checked={selectedItems.page} />
              page.tsx
            </div>

            <div>
              <Checkbox
                name='default.tsx'
                checked={selectedItems.default}
                onChange={handleModalChange}
              />
              default.tsx
            </div>

            <div>
              <Checkbox
                name='error.tsx'
                checked={selectedItems.error}
                onChange={handleModalChange}
              />
              error.tsx
            </div>

            <div>
              <Checkbox
                name='layout.tsx'
                checked={selectedItems.layout}
                onChange={handleModalChange}
              />
              layout.tsx
            </div>

            <div>
              <Checkbox
                name='loading.tsx'
                checked={selectedItems.loading}
                onChange={handleModalChange}
              />
              loading.tsx
            </div>

            <div>
              <Checkbox
                name='notFound.tsx'
                checked={selectedItems.notFound}
                onChange={handleModalChange}
              />
              notFound.tsx
            </div>

            <div>
              <Checkbox
                name='route.tsx'
                checked={selectedItems.route}
                onChange={handleModalChange}
              />
              route.tsx
            </div>

            <div>
              <Checkbox
                name='template.tsx'
                checked={selectedItems.template}
                onChange={handleModalChange}
              />
              template.tsx
            </div>

            <Button onClick={handleClose} sx={{ mt: 3, fontSize: '1.3rem' }}>
              Submit
            </Button>
          </Box>
        </Modal>
        <div
          className='folder'
          onClick={() => {
            if (!expand) {
              setFolderIcon('▼');
              setFolderLogo(<FontAwesomeIcon icon={faFolderOpen} />);
            } else {
              setFolderIcon('▶');
              setFolderLogo(<FontAwesomeIcon icon={faFolderClosed} />);
            }
            setExpand(!expand);
          }}
        >
          <span>
            {folderIcon} {folderLogo} {explorer.name}
          </span>
          <div className='buttons'>
            {explorer.name !== 'app' &&
            explorer.name !== 'src' &&
            explorer.name !== 'node_modules' &&
            explorer.name !== 'public' &&
            explorer.name !== 'NextSketch' ? (
              <button
                onClick={(e) => {
                  handleNewFolder(e, true);
                }}
                style={{ color: 'pink' }}
              >
                <div style={{ color: 'red' }}>
                  {' '}
                  <FontAwesomeIcon
                    icon={faFolderPlus}
                    style={{ color: 'white', fontSize: '1.4rem' }}
                  />{' '}
                </div>
              </button>
            ) : (
              ''
            )}

            {explorer.name !== 'src' &&
            explorer.name !== 'node_modules' &&
            explorer.name !== 'public' &&
            explorer.name !== 'NextSketch' ? (
              <button onClick={(e) => handleNewFolder(e, false)}>
                <FontAwesomeIcon
                  icon={faFileCirclePlus}
                  style={{ color: 'white', fontSize: '1.4rem' }}
                />
              </button>
            ) : (
              ''
            )}

            {explorer.name !== 'app' &&
            explorer.name !== 'src' &&
            explorer.name !== 'NextSketch' ? (
              <button onClick={(e) => handleDeleteFolder(e)}>
                <FontAwesomeIcon
                  icon={faMinus}
                  style={{ color: 'white', fontSize: '1.4rem' }}
                />
              </button>
            ) : (
              ''
            )}
          </div>
        </div>

        <div style={{ display: expand ? 'block' : 'none', paddingLeft: 25 }}>
          {showInput.visible && (
            <div className='inputContainer'>
              <span>{showInput.isFolder ? ' 📁' : '📄'} </span>
              <input
                type='text'
                onKeyDown={onAddFolder}
                className='inputContainer__input cursor-blink'
                autoFocus
                onBlur={() => {
                  setShowInput({ ...showInput, visible: false });
                  setFolderIcon('▶');
                  setFolderLogo(<FontAwesomeIcon icon={faFolderClosed} />);
                  setExpand(false);
                }}
                style={{ backgroundColor: 'transparent', color: 'white' }}
              />
            </div>
          )}

          {explorer.items.map((exp: any) => {
            return (
              <Folder
                handleInsertNode={handleInsertNode}
                handleDeleteNode={handleDeleteNode}
                handleInputBoilerFiles={handleInputBoilerFiles}
                explorer={exp}
                key={exp.id}
                setFolder={setFolder}
                folder={folder}
                setFile={setFile}
                file={file}
                setPostData={setPostData}
                postData={postData}
              />
            );
          })}
        </div>
      </div>
    );
  } else if (explorer.name) {
    return (
      <div
        className={`folder${explorer.name === 'page.tsx' ? ' page ' : ''}`}
        onClick={retrieveCode}
        style={{ color: 'white' }}
      >
        {explorer.name.slice(-3) === 'tsx' ? (
          <FontAwesomeIcon className='icon' icon={faAtom} />
        ) : (
          '📄'
        )}
        {explorer.name}
        {explorer.name === 'page.tsx' ? (
          '   '
        ) : (
          <button className='deletebtn' onClick={(e) => handleDeleteFolder(e)}>
            <FontAwesomeIcon
              className='icon'
              icon={faMinus}
              style={{
                color: 'white',
                fontSize: '1.4rem',
              }}
            />
          </button>
        )}
      </div>
    );
  }
}

export default Folder;
