import React, { useEffect, useContext } from "react";
import { Button } from "@mui/material";
import CodeIcon from "@mui/icons-material/Code";
import { CodeContext } from "../../App";

interface DisplayCodeProps {
  component: string;
}

const DisplayCode = ({ component }: DisplayCodeProps) => {
  const [componentName, setComponentName] = useContext(CodeContext);
  // useEffect(() => {
  //   // This block will run every time `componentName` changes
  //   console.log(`Updated componentName: ${componentName}`);
  // }, [componentName]);

  const showClick = () => {
    console.log(component);
    setComponentName(component);
    console.log(componentName);
  };
  return (
    <>
      <Button
        color="primary"
        size="small"
        sx={{ minWidth: 24, minHeight: 24, padding: 0 }}
        onClick={showClick}
      >
        <CodeIcon />
      </Button>
    </>
  );
};

export default DisplayCode;
