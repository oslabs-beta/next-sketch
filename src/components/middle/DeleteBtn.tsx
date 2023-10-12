import { Button } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';

function DeleteBtn() {
  // const handleDelete = (event) {

  // }

  return (
    <>
      <Button color='error' variant='outlined' size='small'>
        <ClearIcon />
      </Button>
    </>
  );
}

export default DeleteBtn;
