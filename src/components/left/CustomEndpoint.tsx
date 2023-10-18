import React, { useState } from "react"
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Checkbox from "@mui/material/Checkbox";

//----------------
const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
  //MUI styling fior modal
//-----------------

const CustomEndpoint = ( {handleCreateCustomEndpoint, explorer}: any ) => {
    
const [inputValue, setInputValue] = useState("");
const [open, setOpen] = useState(false);
const [checklist, setChecklist] = useState([]);

const handleOpen = () => setOpen(true);
const handleClose = () => setOpen(false);

function handleChange(e?: any) {
    setInputValue(e.target.value);
    
  }

    const handleCreateCustomFolder =(e?: React.MouseEvent) => {
        e?.stopPropagation()
            e?.preventDefault()

             handleCreateCustomEndpoint(explorer.id, inputValue)
            setOpen(true);
            setInputValue('')
    
    };




    return (
        <div className='cursor' >
          
            <form >
            <input 
            type="text"
            autoFocus
            placeholder= " New Endpoint"
            onChange ={handleChange}
            value={inputValue}
            
            />
           
            <button type = "submit" onClick={handleCreateCustomFolder}>
                Submit
                </button>
            </form>


            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-title"
                aria-describedby="modal-description"
            >
            <Box sx={style}>
                <Typography id="modal-title" variant="h6" component="h2">
                New Endpoint
                </Typography>
                <Typography id="modal-description" sx={{ mt: 2 }}>
                    Content
                </Typography>
                <Button onClick={handleClose} sx={{ mt: 3 }}>
                  Close
                </Button>
                </Box>
            </Modal>



            {/* <form >
            <input 
            type="text"
            placeholder="create an endpoint" 
            autoFocus
            onKeyDown={handleCreateCustomFolder}
            />
            <button type = "submit" onClick={handleCreateCustomFolder}>Submit</button>
        
            </form>
             */}


            
        </div>
    );
};


export default CustomEndpoint;

