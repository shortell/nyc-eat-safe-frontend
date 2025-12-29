import React, { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Checkbox from '@mui/material/Checkbox';
import ListItemText from '@mui/material/ListItemText';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import Badge from '@mui/material/Badge';
import Tooltip from '@mui/material/Tooltip';

const boroughs = [
    { label: 'Manhattan', value: 'Manhattan' },
    { label: 'Brooklyn', value: 'Brooklyn' },
    { label: 'Queens', value: 'Queens' },
    { label: 'THE Bronx', value: 'Bronx' },
    { label: 'Staten Island', value: 'Staten Island' },
];

const BoroughSelect = ({ selectedBoroughs, setSelectedBoroughs, onClose }) => {
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
        if (onClose) onClose(selectedBoroughs);
    };

    const handleToggle = (value) => {
        const currentIndex = selectedBoroughs.indexOf(value);
        const newChecked = [...selectedBoroughs];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setSelectedBoroughs(newChecked);
    };

    return (
        <>
            <Tooltip title="Filter by Borough">
                <IconButton
                    onClick={handleClick}
                    sx={{
                        backgroundColor: '#FFFFFF',
                        width: '56px',
                        height: '56px',
                        boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                        '&:hover': {
                            backgroundColor: '#f5f5f5',
                        },
                    }}
                >
                    <Badge badgeContent={selectedBoroughs.length} color="primary">
                        <FilterAltIcon sx={{ color: '#1655A0', fontSize: '32px' }} />
                    </Badge>
                </IconButton>
            </Tooltip>
            <Menu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                slotProps={{
                    paper: {
                        style: {
                            maxHeight: 48 * 4.5,
                            width: '20ch',
                        },
                    },
                }}
            >
                {boroughs.map((borough) => (
                    <MenuItem key={borough.value} onClick={() => handleToggle(borough.value)}>
                        <Checkbox checked={selectedBoroughs.indexOf(borough.value) > -1} />
                        <ListItemText primary={borough.label} />
                    </MenuItem>
                ))}
            </Menu>
        </>
    );
};

export default BoroughSelect;