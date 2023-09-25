import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import { TabICO, TabPanel, a11yProps } from '@pasal/cio-component-library';
import * as React from 'react';
import styles from "./tab.module.scss";
import Google from '../TabContents/Google';
// import Customize from './TabContents/customize';
// import Measurement from './TabContents/measurement';
// import Shipping from './TabContents/Shipping';
// import Assignment from './TabContents/assignment';


export default function TabSettings() {
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
                <Tabs value={value} onChange={handleChange} aria-label="Secrets">
                    <TabICO label="Google" {...a11yProps(0)} />
                    <TabICO label="AWS" {...a11yProps(1)} />
                </Tabs>
            </Box>

            <TabPanel value={value} index={0}>

                {/* <div className={styles.tab__panel}>
            Please wait...
        </div> */}
                {/* Item One */}
                <Google/>
            </TabPanel>
            <TabPanel value={value} index={1}>
                World
            </TabPanel>
        </Box>
    );
}

