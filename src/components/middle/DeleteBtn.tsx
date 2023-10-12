import { Button } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import { Context } from './CreateComponentBtn';
import { useContext } from 'react';

interface DeleteBtnProps {
  id: number;
}

function DeleteBtn({ id }: DeleteBtnProps) {
  const [listComponents, setListComponents] = useContext(Context);

  const handleRemoveClick = (event) => {
    event.preventDefault();
    const deletedComponent = id;
    setListComponents(
      listComponents.filter((component, index) => index !== deletedComponent)
    );
  };
  return (
    <>
      <Button color='error' variant='outlined' size='small'>
        <ClearIcon onClick={handleRemoveClick} />
      </Button>
    </>
  );
}

export default DeleteBtn;
