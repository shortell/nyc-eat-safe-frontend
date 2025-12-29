"use client";

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Box from '@mui/material/Box';
import Badge from '@mui/material/Badge';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import HomeIcon from '@mui/icons-material/Home';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import RateReviewIcon from '@mui/icons-material/RateReview';
import InfoIcon from '@mui/icons-material/Info';
import CommentIcon from '@mui/icons-material/Comment';

const navigationItems = [
  { label: "Home", icon: <HomeIcon />, path: "/" },
  { label: "Near Me", icon: <LocationOnIcon />, path: "/near-me" },
  { label: "Comments", icon: <CommentIcon />, path: "/feedback", withBadge: true },
  { label: "About", icon: <InfoIcon />, path: "/about" },
];

const Bottombar = () => {
  const pathname = usePathname();
  const currentTabIndex = navigationItems.findIndex(item => item.path === pathname);
  const [showBadge, setShowBadge] = React.useState(false);

  React.useEffect(() => {
    // Check if user has already viewed comments in this session
    const hasViewed = sessionStorage.getItem('hasViewedComments');
    if (!hasViewed) {
      setShowBadge(true);
    }
  }, []);

  const handleNavigation = (path) => {
    // Scroll top logic
    const mainContent = document.getElementById('main-content');
    if (mainContent) {
      mainContent.scrollTop = 0;
    }

    // Badge logic
    if (path === '/feedback') {
      setShowBadge(false);
      sessionStorage.setItem('hasViewedComments', 'true');
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
            icon={
              item.withBadge && showBadge ? (
                <Badge variant="dot" color="error">
                  {item.icon}
                </Badge>
              ) : (
                item.icon
              )
            }
            component={Link}
            href={item.path}
            onClick={() => handleNavigation(item.path)}
          />
        ))}
      </BottomNavigation>
    </Box>
  );
};

export default Bottombar;
