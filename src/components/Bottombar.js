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
import InfoIcon from '@mui/icons-material/Info';
import CommentIcon from '@mui/icons-material/Comment';

const navigationItems = [
  { label: "Home", icon: <HomeIcon />, path: "/" },
  { label: "Near Me", icon: <LocationOnIcon />, path: "/near-me", href: "/near-me?should_reset=true" },
  { label: "Comments", icon: <CommentIcon />, path: "/feedback" },
  { label: "About", icon: <InfoIcon />, path: "/about" },
];

const Bottombar = () => {
  const pathname = usePathname();
  const currentTabIndex = navigationItems.findIndex(item => item.path === pathname);
  const handleNavigation = (path) => {
    const mainContent = document.getElementById('main-content');
    if (mainContent) {
      mainContent.scrollTop = 0;
    }
  };

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
        {navigationItems.map((item) => (
          <BottomNavigationAction
            key={item.label}
            label={item.label}
            icon={item.icon}
            component={Link}
            href={item.href || item.path}
            onClick={() => handleNavigation(item.path)}
          />
        ))}
      </BottomNavigation>
    </Box>
  );
};

export default Bottombar;
