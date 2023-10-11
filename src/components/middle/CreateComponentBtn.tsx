import { useState } from 'react';

// interface CreateComponentProps {
//   component: string;
// }

const CreateComponentBtn = () => {
  const [open, setOpen] = useState<boolean>(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  return (
    <>
      <div></div>
      <button open={open} onClick={handleClickOpen}>
        Create Component
      </button>
    </>
  );
};

export default CreateComponentBtn;
