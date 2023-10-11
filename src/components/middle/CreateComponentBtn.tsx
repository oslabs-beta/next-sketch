import React, { useState } from 'react';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogActions,
  TextField,
} from '@mui/material';
import ComponentDisplay from './ComponentDisplay';

// interface CreateComponentProps {
//   component: string;
// }

const CreateComponentBtn = () => {
  const [open, setOpen] = useState<boolean>(false);
  //useState for individual component created
  const [component, setComponent] = useState<string>('');
  //useState for all of the components that have been created
  const [listComponents, setListComponents] = useState<string[]>([]);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleTextFieldChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newComponent: string = event.target.value;
    console.log(event.target.value);
    setComponent(newComponent);
    console.log('component', component);
  };

  const handleSubmit = (event): void => {
    event.preventDefault();

    if (component === undefined || component === null || component === '') {
      alert('Invalid input');
    } else if (listComponents.includes(component)) {
      alert('Component already exists');
    } else if (
      component[0] !== component[0].toUpperCase() ||
      component.slice(1) !== component.slice(1).toLowerCase()
    ) {
      alert('Components need to be PascalCase');
    } else {
      setListComponents([...listComponents, component]);
    }
  };

  return (
    <>
      <Button onClick={handleOpen}>Create Component</Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Create new component</DialogTitle>
        <form>
          <TextField
            id='filled-basic'
            label='Component'
            variant='filled'
            placeholder='Ex: App.tsx'
            color='secondary'
            fullWidth
            onChange={handleTextFieldChange}
          />
          <DialogActions>
            <Button type='submit' onClick={handleSubmit}>
              Submit
            </Button>
            <Button onClick={handleClose}>Cancel</Button>
          </DialogActions>
        </form>
      </Dialog>

      <ComponentDisplay />
    </>
  );
};

export default CreateComponentBtn;
