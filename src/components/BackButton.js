'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import IconButton from '@mui/material/IconButton';

export default function BackButton() {
    const router = useRouter();

    useEffect(() => {
        // Attempt to scroll to top whenever this mounts
        window.scrollTo(0, 0);

        // Also scroll the 'main-content' div in case layout relies on that instead of window
        const mainContent = document.getElementById('main-content');
        if (mainContent) {
            mainContent.scrollTop = 0;
        }
    }, []);

    return (
        <IconButton
            onClick={() => router.back()}
            sx={{
                mb: 0.5,
                ml: 0.5,
                backgroundColor: '#2850B7',
                color: '#fff',
                width: '44px',
                height: '44px',
                boxShadow: '0 4px 6px -1px rgba(40, 80, 183, 0.4)',
                transition: 'all 0.2s',
                '&:hover': {
                    backgroundColor: '#1A52BC',
                    transform: 'translateY(-1px)',
                    boxShadow: '0 6px 8px -1px rgba(40, 80, 183, 0.5)',
                },
            }}
            aria-label="Go back"
        >
            <ArrowBackIcon sx={{ fontSize: '28px', stroke: '#fff', strokeWidth: 1 }} />
        </IconButton>
    );
}
