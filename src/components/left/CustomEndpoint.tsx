import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Checkbox from '@mui/material/Checkbox';

interface modalLayout {
  default: boolean;
  error: boolean;
  layout: boolean;
  loading: boolean;
  notFound: boolean;
  route: boolean;
  template: boolean;
}

//----------------
const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  height: 500,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};
//MUI styling fior modal
//-----------------
const cacheModal:string[]=[];

const CustomEndpoint = ({handleCreateCustomEndpoint, handleInputBoilerFiles, explorer}: any) => {
  const [inputValue, setInputValue] = useState('');
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
    setInputValue('');
  };
  const [selectedItems, setSelectedItems] = useState<modalLayout>({
    default: false,
    error: false,
    layout: false,
    loading: false,
    notFound: false,
    route: false,
    template: false,
  });

   function handleChange(e?: any) {
    setInputValue(e.target.value);
  }

  async function handleModalChange(e?: any) {
    const name = e.target.name.slice(0, -4);
    setSelectedItems({
      ...selectedItems,
      // [name]: e.target.checked,
      [name]: true
    });
    console.log('value', e.target.name);
    console.log('inputvalue', inputValue)
    const fileName = e.target.name
    const folderName = inputValue
    
    if(!cacheModal.includes(fileName)){
    handleInputBoilerFiles(explorer.id, fileName, folderName)
      cacheModal.push(fileName)
    }
    const body ={"fileName": fileName, "folderName": folderName}

    await fetch('http://localhost:3000/',
    {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body)
    })


}



    const handleCreateCustomFolder = async (e?: React.MouseEvent) => {
        e?.stopPropagation()
        e?.preventDefault()

        const body ={"name": inputValue}

        await fetch('http://localhost:3000/',
        {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        })

            if(inputValue) {
                handleCreateCustomEndpoint(explorer.id, inputValue)
            setOpen(true);
            }
            else {
                alert('Please enter a file name')
            }






    };
    return (
        <div className='cursor'>

<form>
      <div className="input-container">
        <input
          type='text'
          autoFocus
          placeholder='New Endpoint'
          onChange={handleChange}
          value={inputValue}
          id="searchInput"
        />
        <div className="text-cursor"></div>
      </div>

      <button type='submit' onClick={handleCreateCustomFolder}>
        Submit
      </button>
    </form>
          <Modal
            open={open}
            onClose={handleClose}
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
                  name='not-found.tsx'
                  checked={selectedItems.notFound}
                  onChange={handleModalChange}
                />
                not-found.tsx
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
    
              <Button onClick={handleClose} sx={{ mt: 3 }}>
                Submit
              </Button>
            </Box>
          </Modal>
        </div>
      );
};

export default CustomEndpoint;
