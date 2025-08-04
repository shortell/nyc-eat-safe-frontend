"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import HomeIcon from '@mui/icons-material/Home';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import RateReviewIcon from '@mui/icons-material/RateReview';

const navigationItems = [
  { label: "Home", icon: <HomeIcon />, path: "/" },
  { label: "Near Me", icon: <LocationOnIcon />, path: "/near-me" },
  { label: "Feedback", icon: <RateReviewIcon />, path: "/feedback" },
];

const Bottombar = () => {
  const pathname = usePathname();
  const currentTabIndex = navigationItems.findIndex(item => item.path === pathname);

  return (
    <Box sx={{ width: '100%' }}>
      <BottomNavigation
        showLabels
        value={currentTabIndex === -1 ? 0 : currentTabIndex}
        sx={{
          width: '100%',
          backgroundColor: '#F0F8FF',
          boxShadow: '0 -2px 6px rgba(0, 0, 0, 0.3)',
          position: 'fixed',
          bottom: 0,
          zIndex: 10,
        }}
      >
        {navigationItems.map((item, index) => (
          <BottomNavigationAction
            key={item.label}
            label={item.label}
            icon={item.icon}
            component={Link}
            href={item.path}
          />
        ))}
      </BottomNavigation>
    </Box>
  );
};

export default Bottombar;
