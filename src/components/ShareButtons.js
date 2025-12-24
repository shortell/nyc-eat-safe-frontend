"use client";

import { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

// Icons
import XIcon from '@mui/icons-material/X';
import FacebookIcon from '@mui/icons-material/FacebookRounded';
import RedditIcon from '@mui/icons-material/Reddit';

import SmsIcon from '@mui/icons-material/SmsRounded';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

export default function ShareButtons({ url, title }) {
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");

    const encodedUrl = encodeURIComponent(url);
    const encodedTitle = encodeURIComponent(title);

    const handleShare = (platform) => {
        let shareUrl = "";

        switch (platform) {
            case 'x':
                shareUrl = `https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`;
                break;
            case 'facebook':
                shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
                break;
            case 'reddit':
                shareUrl = `https://www.reddit.com/submit?url=${encodedUrl}&title=${encodedTitle}`;
                break;

            case 'sms':
                // SMS sharing
                const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
                const separator = isIOS ? '&' : '?';
                window.location.href = `sms:${separator}body=${encodedTitle} ${encodedUrl}`;
                return;
            default:
                return;
        }

        if (shareUrl) {
            window.open(shareUrl, '_blank', 'noopener,noreferrer');
        }
    };

    const handleCloseSnackbar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnackbar(false);
    };

    return (
        <>
            <Stack direction="row" spacing={1}>
                <Tooltip title="Share on X">
                    <IconButton onClick={() => handleShare('x')} aria-label="Share on X" sx={{ color: '#000000', bgcolor: '#f0f0f0', '&:hover': { bgcolor: '#e0e0e0' } }}>
                        <XIcon />
                    </IconButton>
                </Tooltip>

                <Tooltip title="Share on Facebook">
                    <IconButton onClick={() => handleShare('facebook')} aria-label="Share on Facebook" sx={{ color: '#1877F2', bgcolor: '#e7f3ff', '&:hover': { bgcolor: '#dbf0ff' } }}>
                        <FacebookIcon />
                    </IconButton>
                </Tooltip>

                <Tooltip title="Share on Reddit">
                    <IconButton onClick={() => handleShare('reddit')} aria-label="Share on Reddit" sx={{ color: '#FF4500', bgcolor: '#fff0e5', '&:hover': { bgcolor: '#ffe0cc' } }}>
                        <RedditIcon />
                    </IconButton>
                </Tooltip>



                <Tooltip title="Share via SMS">
                    <IconButton onClick={() => handleShare('sms')} aria-label="Share via SMS" sx={{ color: '#34B7F1', bgcolor: '#e0f7fa', '&:hover': { bgcolor: '#b2ebf2' } }}>
                        <SmsIcon />
                    </IconButton>
                </Tooltip>
            </Stack>

            <Snackbar open={openSnackbar} autoHideDuration={3000} onClose={handleCloseSnackbar} anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}>
                <Alert onClose={handleCloseSnackbar} severity="success" sx={{ width: '100%' }}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </>
    );
}
