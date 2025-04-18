// "use client";

// import React, { useState } from 'react';
// import Box from '@mui/material/Box';
// import BottomNavigation from '@mui/material/BottomNavigation';
// import BottomNavigationAction from '@mui/material/BottomNavigationAction';
// import HomeIcon from '@mui/icons-material/Home';
// import LocationOnIcon from '@mui/icons-material/LocationOn';
// import RateReviewIcon from '@mui/icons-material/RateReview';

// const Bottombar = () => {
//     const [value, setValue] = useState(0);

//     return (
//         <Box sx={{ width: '100%' }}>
//             <BottomNavigation
//                 showLabels
//                 value={value}
//                 onChange={(event, newValue) => {
//                     setValue(newValue);
//                 }}
//             >
//                 <BottomNavigationAction label="Home" icon={<HomeIcon />} />
//                 <BottomNavigationAction label="Near Me" icon={<LocationOnIcon />} />
//                 <BottomNavigationAction label="Feedback" icon={<RateReviewIcon />} />
//             </BottomNavigation>
//         </Box>
//     );
// };

// export default Bottombar;
"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Box from '@mui/material/Box';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import HomeIcon from '@mui/icons-material/Home';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import RateReviewIcon from '@mui/icons-material/RateReview';

const Bottombar = () => {
    const [value, setValue] = useState(0);
    const router = useRouter();

    const handleNavChange = (event, newValue) => {
        setValue(newValue);

        // Navigate based on the selected tab
        switch (newValue) {
            case 0:
                router.push('/');  // Home page
                break;
            case 1:
                router.push('/near-me');  // Near Me page (create this page later)
                break;
            case 2:
                router.push('/feedback');  // Feedback page (create this page later)
                break;
            default:
                router.push('/');
        }
    };

    return (
        <Box sx={{
            width: '100%'
        }}>
            {/* <BottomNavigation
                showLabels
                value={value}
                onChange={handleNavChange}
                sx={{
                    width: '100%',
                    backgroundColor: '#F0F8FF',  // Dark blue background
                }}
            > */}
            <BottomNavigation
                showLabels
                value={value}
                onChange={handleNavChange}
                sx={{
                    width: '100%',
                    backgroundColor: '#F0F8FF',  // Dark blue background
                    boxShadow: '0 -2px 6px rgba(0, 0, 0, 0.3)' // Thicker shadow on the top edge
                }}
            >
                <BottomNavigationAction label="Home" icon={<HomeIcon />} />
                <BottomNavigationAction label="Near Me" icon={<LocationOnIcon />} />
                <BottomNavigationAction label="Feedback" icon={<RateReviewIcon />} />
            </BottomNavigation>
        </Box>
    );
};

export default Bottombar;