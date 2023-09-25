import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import { TabICO, TabPanel, a11yProps, TabContentTemplate } from '@pasal/cio-component-library';
import * as React from 'react';
import styles from "./tab.module.scss";
import BillingAddress from "./TabContents/BillingAddress";
import ShippingAddress from "./TabContents/ShippingAddress";



export default function PaymentTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

 

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" variant="scrollable"
          scrollButtons="auto">
          
          <TabICO  label="Shipping" {...a11yProps(0)} />
          <TabICO  label="Billing" {...a11yProps(1)} />
         
        </Tabs>
      </Box>

      <TabPanel value={value} index={0}>


        Hello World
        
      </TabPanel>
      <TabPanel value={value} index={1}>
        <TabContentTemplate>
          <BillingAddress/>
        </TabContentTemplate>
        
      </TabPanel>
      
    
    
    </Box>
  );
}

