import React, { Dispatch, SetStateAction, useContext, useState } from 'react';
import { CodeContext } from '../../App';
import {
  Button,
  Dialog,
  DialogTitle,
  DialogActions,
  TextField,
} from '@mui/material';
import ComponentDisplay from './ComponentDisplay';

interface ListComponentsType {
  listComponents: string[];
  setListComponents: Dispatch<SetStateAction<string[]>>; //dispatch it is the type used for the function used in useState
}

export const Context = React.createContext<ListComponentsType | undefined>(
  undefined
);

const CreateComponentBtn = () => {
  const [open, setOpen] = useState<boolean>(false);
  //useState for individual component created
  const [component, setComponent] = useState<string>('');
  //useState for all of the components that have been created
  const [listComponents, setListComponents] = useState<string[]>([]);
  //useContext for codePreview, when we add a component it shows the codePreview
  const [componentName, setComponentName] = useContext(CodeContext);

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
    setComponent(newComponent);
  };

  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();

    if (!component) {
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
      setComponentName(component);
      handleClose();
    }
  };

  return (
    <Context.Provider value={[listComponents, setListComponents]}>
      <Button onClick={handleOpen}>Create Component</Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Create new component</DialogTitle>
        <form>
          <TextField
            id='filled-basic'
            label='Component'
            variant='filled'
            placeholder='Ex: App'
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

      <ComponentDisplay components={listComponents} />
    </Context.Provider>
  );
};

export default CreateComponentBtn;

// onClick: React.MouseEventHandler<HTMLButtonElement>;
