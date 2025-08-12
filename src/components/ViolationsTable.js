// 'use client';

// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableCell from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
// import TableHead from '@mui/material/TableHead';
// import TableRow from '@mui/material/TableRow';
// import Paper from '@mui/material/Paper';

// export default function ViolationsTable({ violations }) {
//     return (
//         <TableContainer component={Paper} sx={{ width: '100%' }}>
//             <Table sx={{ width: '100%', tableLayout: 'fixed' }}>
//                 <TableHead>
//                     <TableRow>
//                         <TableCell sx={{ width: 120, whiteSpace: 'nowrap', fontWeight: 'bold' }}>
//                             Flag
//                         </TableCell>
//                         <TableCell
//                             sx={{
//                                 whiteSpace: 'normal',
//                                 wordBreak: 'break-word',
//                                 overflowWrap: 'anywhere',
//                                 fontWeight: 'bold',
//                             }}
//                         >
//                             Description
//                         </TableCell>
//                     </TableRow>
//                 </TableHead>
//                 <TableBody>
//                     {violations.map((v, i) => (
//                         <TableRow key={i}>
//                             <TableCell
//                                 sx={{
//                                     whiteSpace: 'nowrap',
//                                     fontWeight: 'bold',
//                                     color:
//                                         v.critical_flag === 'Pest Critical' || v.critical_flag === 'Critical'
//                                             ? '#ab224e'
//                                             : '#2a3d83',
//                                 }}
//                             >
//                                 {v.critical_flag === 'Pest Critical' ? 'Critical' : v.critical_flag}
//                             </TableCell>
//                             <TableCell
//                                 sx={{
//                                     whiteSpace: 'normal',
//                                     wordBreak: 'break-word',
//                                     overflowWrap: 'anywhere',
//                                 }}
//                             >
//                                 {v.violation_summary}
//                             </TableCell>
//                         </TableRow>
//                     ))}
//                 </TableBody>
//             </Table>
//         </TableContainer>
//     );
// }

'use client';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

export default function ViolationsTable({ violations }) {
    return (
        <TableContainer component={Paper} sx={{ width: '100%' }}>
            <Table sx={{ width: '100%', tableLayout: 'fixed' }}>
                <TableHead>
                    <TableRow
                        sx={{
                            backgroundColor: '#2f448f',
                        }}
                    >
                        <TableCell
                            sx={{
                                width: 120,
                                whiteSpace: 'nowrap',
                                fontWeight: 700,
                                fontSize: '1rem',
                                color: '#fff',
                                paddingY: '6px', // Less vertical space
                            }}
                        >
                            Flag
                        </TableCell>
                        <TableCell
                            sx={{
                                whiteSpace: 'normal',
                                wordBreak: 'break-word',
                                overflowWrap: 'anywhere',
                                fontWeight: 700,
                                fontSize: '1rem',
                                color: '#fff',
                                paddingY: '6px', // Less vertical space
                            }}
                        >
                            Violations
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {violations.map((v, i) => (
                        <TableRow
                            key={i}
                            sx={{
                                borderBottom: '2px solid #ddd',
                            }}
                        >
                            <TableCell
                                sx={{
                                    whiteSpace: 'nowrap',
                                    fontWeight: 600,
                                    color:
                                        v.critical_flag === 'Pest Critical' || v.critical_flag === 'Critical'
                                            ? '#ab224e'
                                            : '#2a3d83',
                                }}
                            >
                                {v.critical_flag === 'Pest Critical' ? 'Critical' : v.critical_flag}
                            </TableCell>
                            <TableCell
                                sx={{
                                    whiteSpace: 'normal',
                                    wordBreak: 'break-word',
                                    overflowWrap: 'anywhere',
                                    fontFamily: "'Roboto', sans-serif",
                                    fontSize: '0.95rem',
                                }}
                            >
                                {v.violation_summary}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}







