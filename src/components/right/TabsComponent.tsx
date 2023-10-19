import { Tab, Typography, Box } from '@mui/material';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import React, { useState } from 'react';
import CodePreview from './CodePreview';

const TabsComponent = () => {
  const [value, setValue] = useState<JSX.Element | string>('1');

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%', typography: 'body1' }}>
      <TabContext value={value}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <TabList onChange={handleChange}>
            <Tab label='Code Preview' value='1' />
            <Tab label='Item Two' value='2' />
            <Tab label='Item Three' value='3' />
          </TabList>
        </Box>
        <TabPanel value='1'>
          <CodePreview />
        </TabPanel>
        <TabPanel value='2'>Item Two</TabPanel>
        <TabPanel value='3'>Item Three</TabPanel>
      </TabContext>
    </Box>
  );
};

export default TabsComponent;
