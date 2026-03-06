"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';

import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CommentIcon from '@mui/icons-material/Comment';
import InfoIcon from '@mui/icons-material/Info';
import PolicyIcon from '@mui/icons-material/Policy';
import Searchbar from './Searchbar';


const navigationItems = [
    { label: "Home", icon: <HomeIcon />, path: "/", href: "/" },
    { label: "Near Me", icon: <LocationOnIcon />, path: "/near-me", href: "/near-me?should_reset=true" },
    { label: "Comments", icon: <CommentIcon />, path: "/feedback", href: "/feedback" },
    { label: "About", icon: <InfoIcon />, path: "/about", href: "/about" },
];

const Headbar = () => {
    const pathname = usePathname();
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [selectedBoroughs, setSelectedBoroughs] = useState([]);

    const handleBoroughSelectClose = (boroughs) => {
        console.log("Borough selection updated:", boroughs);
    };

    const toggleDrawer = (open) => (event) => {
        if (event?.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setDrawerOpen(open);
    };

    const handleNavigation = () => {
        window.scrollTo(0, 0);
        setDrawerOpen(false);
    };

    return (
        <>
            <AppBar
                position="sticky"
                elevation={4}
                sx={{
                    background: 'linear-gradient(to bottom, #2A3E83 0%, #1655A0 90%, #016CCE 98%)',
                    boxShadow: '0 6px 20px rgba(0, 0, 0, 0.55)',
                }}
            >
                <Toolbar
                    sx={{
                        gap: { xs: 1, md: 2 },
                        py: { xs: 1.5, md: 3 },
                        flexWrap: 'nowrap',
                        alignItems: 'center',
                        // On mobile: column layout for two rows
                        flexDirection: { xs: 'column', md: 'row' },
                    }}
                >
                    {/* ── MOBILE TOP ROW + DESKTOP SINGLE ROW ── */}
                    <Box sx={{ display: 'flex', width: '100%', alignItems: 'center', gap: 1 }}>
                        {/* Hamburger menu */}
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="open navigation menu"
                            onClick={toggleDrawer(true)}
                            sx={{ flexShrink: 0 }}
                        >
                            <MenuIcon sx={{ fontSize: { xs: '1.5rem', md: '2rem' } }} />
                        </IconButton>

                        {/* Mobile title */}
                        <Typography
                            component={Link}
                            href="/"
                            noWrap
                            sx={{
                                display: { xs: 'block', md: 'none' },
                                fontFamily: "'Manrope', sans-serif",
                                fontWeight: 800,
                                fontSize: '1.9rem',
                                color: 'inherit',
                                textDecoration: 'none',
                                flexGrow: 1,
                                '&:hover': { opacity: 0.9 },
                            }}
                        >
                            NYC Eat Safe
                        </Typography>

                        {/* Desktop title */}
                        <Typography
                            component={Link}
                            href="/"
                            noWrap
                            sx={{
                                display: { xs: 'none', md: 'block' },
                                fontFamily: "'Manrope', sans-serif",
                                fontWeight: 800,
                                fontSize: '2.5rem',
                                color: 'inherit',
                                textDecoration: 'none',
                                flexShrink: 0,
                                '&:hover': { opacity: 0.9 },
                            }}
                        >
                            NYC Eat Safe
                        </Typography>

                        {/* Spacer (desktop only) */}
                        <Box sx={{ display: { xs: 'none', md: 'block' }, flexGrow: 1 }} />

                        {/* Search bar + Borough filter (desktop only inline) */}
                        <Box
                            sx={{
                                display: { xs: 'none', md: 'flex' },
                                alignItems: 'center',
                                gap: 1,
                                width: '550px',
                            }}
                        >
                            <Box sx={{ flexGrow: 1, backgroundColor: '#F0F8FF', borderRadius: '50px', p: 1, minWidth: 0, boxShadow: '0 4px 16px rgba(0,0,0,0.35)' }}>
                                <Searchbar
                                    selectedBoroughs={selectedBoroughs}
                                    setSelectedBoroughs={setSelectedBoroughs}
                                    onBoroughClose={handleBoroughSelectClose}
                                />
                            </Box>
                        </Box>

                        {/* Desktop nav icons */}
                        <Box sx={{ display: { xs: 'none', md: 'flex' }, gap: 0.5, flexShrink: 0 }}>
                            {navigationItems
                                .filter((item) => item.label !== 'Home')
                                .map((item) => (
                                    <IconButton
                                        key={item.label}
                                        component={Link}
                                        href={item.href}
                                        onClick={handleNavigation}
                                        color="inherit"
                                        sx={{
                                            flexDirection: 'column',
                                            borderRadius: '10px',
                                            px: 1.5,
                                            py: 0.75,
                                            opacity: pathname === item.path ? 1 : 0.75,
                                            '&:hover': { opacity: 1, backgroundColor: 'rgba(255,255,255,0.12)' },
                                            '& .MuiSvgIcon-root': { fontSize: '1.75rem' },
                                        }}
                                    >
                                        {item.icon}
                                        <Typography
                                            sx={{
                                                fontSize: '0.65rem',
                                                fontFamily: "'Manrope', sans-serif",
                                                fontWeight: pathname === item.path ? 700 : 500,
                                                lineHeight: 1,
                                                mt: 0.4,
                                                letterSpacing: '0.03em',
                                                color: 'inherit',
                                            }}
                                        >
                                            {item.label}
                                        </Typography>
                                    </IconButton>
                                ))}
                        </Box>
                    </Box>

                    {/* ── MOBILE BOTTOM ROW: Search bar ── */}
                    <Box
                        sx={{
                            display: { xs: 'flex', md: 'none' },
                            width: '100%',
                            pb: 1,
                        }}
                    >
                        <Box sx={{ flexGrow: 1, backgroundColor: '#F0F8FF', borderRadius: '50px', p: 1, minWidth: 0, boxShadow: '0 4px 16px rgba(0,0,0,0.35)' }}>
                            <Searchbar
                                selectedBoroughs={selectedBoroughs}
                                setSelectedBoroughs={setSelectedBoroughs}
                                onBoroughClose={handleBoroughSelectClose}
                            />
                        </Box>
                    </Box>
                </Toolbar>
            </AppBar>

            {/* Navigation drawer */}
            <Drawer
                anchor="left"
                open={drawerOpen}
                onClose={toggleDrawer(false)}
            >
                <Box
                    sx={{ width: 260 }}
                    role="presentation"
                    onClick={toggleDrawer(false)}
                    onKeyDown={toggleDrawer(false)}
                >
                    {/* Drawer header */}
                    <Box
                        sx={{
                            background: 'linear-gradient(to bottom, #2A3E83 0%, #1655A0 90%, #016CCE 98%)',
                            color: 'white',
                            px: 2,
                            py: 3,
                        }}
                    >
                        <Typography variant="h6" sx={{ fontFamily: 'monospace', fontWeight: 700 }}>
                            NYC Eat Safe
                        </Typography>
                        <Typography variant="caption" sx={{ opacity: 0.8, fontStyle: 'italic' }}>
                            An A isn&apos;t always an A
                        </Typography>
                    </Box>

                    <List>
                        {navigationItems.map((item) => (
                            <ListItem key={item.label} disablePadding>
                                <ListItemButton
                                    component={Link}
                                    href={item.href}
                                    onClick={handleNavigation}
                                    selected={pathname === item.path}
                                    sx={{
                                        '&.Mui-selected': {
                                            backgroundColor: 'rgba(22, 85, 160, 0.08)',
                                            borderRight: '3px solid #1655A0',
                                        },
                                        '&.Mui-selected:hover': {
                                            backgroundColor: 'rgba(22, 85, 160, 0.12)',
                                        },
                                    }}
                                >
                                    <ListItemIcon sx={{ color: pathname === item.path ? '#1655A0' : 'inherit' }}>
                                        {item.icon}
                                    </ListItemIcon>
                                    <ListItemText
                                        primary={item.label}
                                        primaryTypographyProps={{
                                            fontWeight: pathname === item.path ? 600 : 400,
                                            color: pathname === item.path ? '#1655A0' : 'inherit',
                                        }}
                                    />
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>

                    <Divider />

                    <List>
                        <ListItem disablePadding>
                            <ListItemButton
                                component={Link}
                                href="/privacy"
                                onClick={handleNavigation}
                                selected={pathname === '/privacy'}
                                sx={{
                                    '&.Mui-selected': {
                                        backgroundColor: 'rgba(22, 85, 160, 0.08)',
                                        borderRight: '3px solid #1655A0',
                                    },
                                }}
                            >
                                <ListItemIcon sx={{ color: pathname === '/privacy' ? '#1655A0' : 'inherit' }}>
                                    <PolicyIcon />
                                </ListItemIcon>
                                <ListItemText
                                    primary="Privacy Policy"
                                    primaryTypographyProps={{
                                        fontWeight: pathname === '/privacy' ? 600 : 400,
                                        color: pathname === '/privacy' ? '#1655A0' : 'inherit',
                                    }}
                                />
                            </ListItemButton>
                        </ListItem>
                    </List>
                </Box>
            </Drawer>
        </>
    );
};

export default Headbar;
