import { Tab, Typography, Box } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import React, { useState } from 'react';
import CodePreview from './CodePreview';
import DisplayContainer from './DisplayContainer';

interface TabsComponentProps {
  code: string;
  treeData: object;
}

const TabsComponent = ({ code, treeData }: TabsComponentProps) => {
  const [value, setValue] = useState<JSX.Element | string>('1');

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange}>
            <Tab label='Display' value='1' />
            <Tab label='Code Preview' value='2' />
            <Tab label='Item Three' value='3' />
          </TabList>
        </Box>
        <TabPanel value='1'>
          <DisplayContainer />
        </TabPanel>
        <TabPanel value='2'>
          <CodePreview code={code} treeData={treeData} />
        </TabPanel>
        <TabPanel value='3'>Item Three</TabPanel>
      </TabContext>
    </Box>
  );
};

export default TabsComponent;
