// import React, { useContext } from 'react';
// import OutlinedInput from '@mui/material/OutlinedInput';
// import InputLabel from '@mui/material/InputLabel';
// import MenuItem from '@mui/material/MenuItem';
// import FormControl from '@mui/material/FormControl';
// import ListItemText from '@mui/material/ListItemText';
// import Select from '@mui/material/Select';
// import Checkbox from '@mui/material/Checkbox';
// import { BoroughContext } from '../context/BoroughContext'; // Import the context

// const boroughs = [
//     { label: 'Manhattan', value: 'Manhattan' },
//     { label: 'Brooklyn', value: 'Brooklyn' },
//     { label: 'Queens', value: 'Queens' },
//     { label: 'The Bronx', value: 'Bronx' },
//     { label: 'Staten Island', value: 'Staten Island' }
// ];

// const BoroughSelect = () => {
//     // Use the global state from the context
//     const { selectedBoroughs, setSelectedBoroughs } = useContext(BoroughContext);

//     const handleChange = (event) => {
//         const {
//             target: { value },
//         } = event;
//         setSelectedBoroughs(
//             typeof value === 'string' ? value.split(',') : value
//         );
//     };

//     return (
//         <div>
//             <FormControl sx={{ m: 1, width: 300 }}>
//                 <InputLabel>Borough</InputLabel>
//                 <Select
//                     multiple
//                     value={selectedBoroughs} // Use global state
//                     onChange={handleChange}
//                     input={<OutlinedInput label="Borough" />}
//                     renderValue={(selected) =>
//                         selected
//                             .map((val) => boroughs.find((b) => b.value === val)?.label)
//                             .join(', ')
//                     }
//                 >
//                     {boroughs.map((borough) => (
//                         <MenuItem key={borough.value} value={borough.value}>
//                             <Checkbox checked={selectedBoroughs.includes(borough.value)} />
//                             <ListItemText primary={borough.label} />
//                         </MenuItem>
//                     ))}
//                 </Select>
//             </FormControl>
//         </div>
//     );
// };

// export default BoroughSelect;
import React from 'react';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';

const boroughs = [
    { label: 'Manhattan', value: 'Manhattan' },
    { label: 'Brooklyn', value: 'Brooklyn' },
    { label: 'Queens', value: 'Queens' },
    { label: 'The Bronx', value: 'Bronx' },
    { label: 'Staten Island', value: 'Staten Island' },
];

const BoroughSelect = ({ selectedBoroughs, setSelectedBoroughs }) => {
    const handleChange = (event) => {
        const {
            target: { value },
        } = event;
        setSelectedBoroughs(
            typeof value === 'string' ? value.split(',') : value
        );
    };

    return (
        <div>
            <FormControl sx={{ width: '100%' }}>
                <InputLabel>Borough</InputLabel>
                <Select
                    multiple
                    sx={{
                        backgroundColor: '#F0F8FF',
                    }}
                    value={selectedBoroughs}
                    onChange={handleChange}
                    input={<OutlinedInput label="Borough" />}
                    renderValue={(selected) =>
                        selected
                            .map((val) => boroughs.find((b) => b.value === val)?.label)
                            .join(', ')
                    }
                >
                    {boroughs.map((borough) => (
                        <MenuItem key={borough.value} value={borough.value}>
                            <Checkbox checked={selectedBoroughs.includes(borough.value)} />
                            <ListItemText primary={borough.label} />
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
        </div>
    );
};

export default BoroughSelect;