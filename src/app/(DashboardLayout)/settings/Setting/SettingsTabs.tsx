'use client';

import { Tabs, Tab, Box } from '@mui/material';
import { useState } from 'react';
// import SiteSettings from './SiteSettings';
// import ContentSettings from './ContentSettings';
// import SupportSettings from './SupportSettings';
// import SocialLinksSettings from './SocialLinksSettings';

const SettingsTabs = () => {
  const [tab, setTab] = useState(0);

  return (
    <>
      <Tabs
        value={tab}
        onChange={(_, v) => setTab(v)}
        sx={{ mb: 3 }}
      >
        <Tab label="Site" />
        <Tab label="Content" />
        <Tab label="Support" />
        <Tab label="Social Links" />
      </Tabs>

      <Box>
        {/* {tab === 0 && <SiteSettings />}
        {tab === 1 && <ContentSettings />}
        {tab === 2 && <SupportSettings />}
        {tab === 3 && <SocialLinksSettings />} */}
      </Box>
    </>
  );
};

export default SettingsTabs;
