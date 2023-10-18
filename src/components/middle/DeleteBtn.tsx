import React, { MouseEvent, useContext } from 'react';
import { Button } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import { Context } from './CreateComponentBtn';
import { CodeContext } from '../../App';

interface DeleteBtnProps {
  id: number;
}

function DeleteBtn({ id }: DeleteBtnProps) {
  const [listComponents, setListComponents] = useContext(Context);
  //modify code when a component is deleted
  const [componentName, setComponentName] = useContext(CodeContext);

  const handleRemoveClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const deletedComponent = id;
    setListComponents(
      listComponents.filter((component, index) => index !== deletedComponent)
    );
    setComponentName(listComponents[deletedComponent - 1]);
  };
  return (
    <>
      <Button
        color='error'
        size='small'
        sx={{ minWidth: 24, minHeight: 24, padding: 0 }}
        onClick={handleRemoveClick}
      >
        <ClearIcon />
      </Button>
    </>
  );
}

export default DeleteBtn;
