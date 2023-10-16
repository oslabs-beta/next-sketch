import React, { useCallback, useContext } from 'react';
import { Button } from '@mui/material';
import CodeIcon from '@mui/icons-material/Code';
import { CodeContext } from '../../App';

interface DisplayCodeProps {
  component: string;
}

const DisplayCode = ({ component }: DisplayCodeProps) => {
  const [componentName, setComponentName] = useContext(CodeContext);
  function showClick() {
    console.log(component);
    setComponentName('lauraaa');
    console.log(componentName);
  }
  return (
    <>
      <Button
        color='primary'
        variant='outlined'
        size='small'
        onClick={showClick}
      >
        <CodeIcon />
      </Button>
    </>
  );
};

export default DisplayCode;
