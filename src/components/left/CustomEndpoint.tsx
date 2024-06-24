import React, { useContext, useState, useEffect } from 'react';
import { Box, Button, Typography, Modal, Checkbox } from '@mui/material';
import { CodeSnippetContext, CodeContext } from '../../App';
import Code from '@mui/icons-material/Code';
import { modalLayout, CustomEndpointProps } from '../../utils/interfaces';
import Prism from 'prismjs';
import AppContext, {AppContextType} from '../../context/AppContext';

//----------------
const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  height: 'fit-content',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
  borderRadius: '20px',
  fontSize: '1.6rem'

};
//MUI styling fior modal
//-----------------



const CustomEndpoint = ({
  handleCreateCustomEndpoint,
  handleInputBoilerFiles,
  handleUpdatePreview,
  handleInitialPreview,
  explorer,
  setFolder,
  folder,
  setFile,
  file,
  setPostData,
  postData,
}: CustomEndpointProps) => {
  const [open, setOpen] = useState(false);
  const [componentName, setComponentName] = useContext(CodeContext);
  const [codeSnippet, setCodeSnippet] = useContext(CodeSnippetContext);

  const {
    tags,
    setTags,
    update,
    setUpdate,
    currentId,
    previewFolder,
    setPreviewFolder,
    currentParent,
    setCurrentParent,
  }: AppContextType = useContext(AppContext)!;


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

  function handleChange(e?: React.ChangeEvent<HTMLInputElement>) {
    setFolder(e?.target.value);
    setPreviewFolder(e?.target.value as string);
  }

  useEffect(() => {
    //creating new files with code
    if (postData === true) {
     
      handlePostingFiles(folder, componentName, codeSnippet);
    }
    //updating code in existing files
    if (update === true) {
      handleUpdatingFiles(componentName, codeSnippet, previewFolder);

      handleUpdatePreview(currentId, codeSnippet, tags);

      handleInitialPreview(currentParent, componentName, codeSnippet, tags);

      setUpdate(false);
    }
    Prism.highlightAll();
  }, [codeSnippet]);

  async function handleModalChange(e?: React.ChangeEvent<HTMLInputElement>) {
    const name = e?.target.name.slice(0, -4);

    setTags([]);

    setSelectedItems({
      ...selectedItems,
      [name as string]: true,
    });

    const fileName = e?.target.name;
    setFile(fileName);

    setComponentName(fileName);
    setPostData(true);
  }

  const handlePostingFiles = async (
    folderName: string,
    fileName: string,
    code: string
  ) => {
    handleInputBoilerFiles(explorer.id, file, folder, codeSnippet);
    const body = {
      fileName: fileName,
      folderName: folderName,
      codeSnippet: code,
    };
    await fetch('http://localhost:3000/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setPostData(false);
        setCurrentParent(data[0]);
        handleInitialPreview(data[0], data[1], data[2], tags);
      });
  };

  const handleUpdatingFiles = async (
    file: string,
    code: string,
    previewFolder
  ) => {
    const body = {
      fileName: file,
      codeSnippet: code,
      folder: previewFolder,
    };
    await fetch('/updatecode', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });
  };

  const handleCreateCustomFolder = async (e?: React.MouseEvent) => {
    e?.stopPropagation();
    e?.preventDefault();

    const body = { name: folder };

    await fetch('http://localhost:3000/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (folder) {
      handleCreateCustomEndpoint(explorer.id, folder);
      setOpen(true);
    }
  };
  return (
    <div className='cursor'>
      <form>
          <input
            type='text'
            autoFocus
            placeholder='New Endpoint in src/app'
            onChange={handleChange}
            value={folder}
            id='searchInput'
          />
          <div className='text-cursor'></div>

        <button type='submit' onClick={handleCreateCustomFolder} className="jumpBtn">
          Submit
        </button>
      </form>

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

          <div className='option'>
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
    </div>
  );
};

export default CustomEndpoint;
