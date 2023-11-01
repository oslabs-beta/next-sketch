import { Tab, Typography, Box } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import React, { useState } from 'react';
import CodePreview from './CodePreview';
import DisplayContainer from './DisplayContainer';
import Tree from './Tree';
import explorer from '../left/data/folderData';

interface TabsComponentProps {
  code: string;
  treeData: object;
  explorer: object;
}

  const TabsComponent = ({ code, treeData, explorer }: TabsComponentProps) => {
  const [value, setValue] = useState<JSX.Element | string>('1');
  const [treeRendered, setTreeRendered] = useState(false);

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);

    // Check if the "Tree" tab is selected and the tree hasn't been rendered yet
    if (newValue === '3' && !treeRendered) {
      setTreeRendered(true);

      // Render the tree after a delay
      setTimeout(() => {
        setTreeRendered(true);
      }, 100);
    }
  };

  return (
    <Box>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange}>
            <Tab label='Code Preview' value='2' />
            <Tab label='Tree' value='3' />
          </TabList>
        </Box>
        <TabPanel value='2'>
          <CodePreview code={code} treeData={treeData} />
        </TabPanel>
        <TabPanel value='3' sx={{ backgroundColor: '#42464C', width: '900px' }}>
          src/app
          <Tree explorer={explorer} />
        </TabPanel>
      </TabContext>
    </Box>
  );
};

export default TabsComponent;