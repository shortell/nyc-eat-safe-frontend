'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import IconButton from '@mui/material/IconButton';

export default function SmartBackButton() {
    const router = useRouter();

    const handleBack = () => {
        router.back();
    };

    return (
        <IconButton
            onClick={handleBack}
            className="mb-2"
            sx={{
                position: 'sticky',
                top: '24px',
                // sticky positioning doesn't strictly use 'left' in flow layout unless in a container that supports it, 
                // but margin works reliably for spacing from the edge.
                marginLeft: '12px',
                zIndex: 900,
                backgroundColor: '#2850B7', // Midpoint between blue-600 and Headbar dark blue
                border: 'none',
                color: '#fff',
                width: '44px',
                height: '44px',
                boxShadow: '0 4px 6px -1px rgba(40, 80, 183, 0.4)',
                backdropFilter: 'none',
                transition: 'all 0.2s',
                '&:hover': {
                    backgroundColor: '#1A52BC', // Midpoint hover
                    transform: 'translateY(-1px)',
                    boxShadow: '0 6px 8px -1px rgba(40, 80, 183, 0.5)',
                },
            }}
            aria-label="Go back"
        >
            <ArrowBackIcon sx={{ fontSize: '28px', stroke: "#fff", strokeWidth: 1 }} />
        </IconButton>
    );
}
