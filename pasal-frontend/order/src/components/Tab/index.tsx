import * as React from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import { TabICO, TabPanel, a11yProps } from '@pasal/cio-component-library';
import Shipping from './TabContents/Shipping';
import Assignment from './TabContents/assignment';
import Customize from './TabContents/customize';
import Measurement from './TabContents/measurement';


export default function OrderTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {

    console.log(newValue)
    setValue(newValue);
  };

  const requestsLoading = {
    customize: false,
    measurement: false, 
    shipping: false,
    orderCompled: false
  }

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" variant="scrollable"
          scrollButtons="auto">
          
          <TabICO  label="customize" {...a11yProps(0)} />
          <TabICO  label="measurement" {...a11yProps(1)} />
          <TabICO  label="shipping" {...a11yProps(2)} />
          <TabICO  label="Assignment" {...a11yProps(3)} />
        </Tabs>
      </Box>

      <TabPanel value={value} index={0}>

       
        <Customize/>
        
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Measurement/>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Shipping/>
      </TabPanel>
      <TabPanel value={value} index={3}>
        <Assignment/>
      </TabPanel>
    
    </Box>
  );
}

