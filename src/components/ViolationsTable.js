'use client';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Chip from '@mui/material/Chip';

export default function ViolationsTable({ violations }) {
    return (
        <TableContainer sx={{ width: '100%', borderRadius: '8px', overflow: 'hidden' }}>
            <Table sx={{ width: '100%' }}>
                <TableHead>
                    <TableRow sx={{ backgroundColor: '#2f448f' }}>
                        <TableCell
                            sx={{
                                width: '140px',
                                fontWeight: 700,
                                fontSize: '0.95rem',
                                color: '#fff',
                                py: '12px',
                                textAlign: 'center',
                            }}
                        >
                            Status
                        </TableCell>
                        <TableCell
                            sx={{
                                fontWeight: 700,
                                fontSize: '0.95rem',
                                color: '#fff',
                                py: '12px',
                            }}
                        >
                            Violations
                        </TableCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                    {violations.map((v, i) => {
                        const isCritical = v.critical_flag === 'Pest Critical' || v.critical_flag === 'Critical';
                        // Simplify label if needed, otherwise use full flag text
                        const statusLabel = v.critical_flag === 'Pest Critical' ? 'Critical' : v.critical_flag;

                        return (
                            <TableRow
                                key={i}
                                sx={{
                                    '&:last-child td, &:last-child th': { border: 0 },
                                    transition: 'background-color 0.2s',
                                    '&:hover': { backgroundColor: '#f8fafc' },
                                }}
                            >
                                <TableCell
                                    sx={{
                                        verticalAlign: 'middle',
                                        textAlign: 'center',
                                        py: 2,
                                        borderBottom: '1px solid #f1f5f9',
                                    }}
                                >
                                    <Chip
                                        label={statusLabel}
                                        sx={{
                                            fontWeight: 700,
                                            fontSize: '0.8rem',
                                            height: '28px',
                                            px: 0.5,
                                            // "Brighter but more muted" -> Soft Matte colors
                                            backgroundColor: isCritical ? '#e15241' : '#555555',
                                            color: '#ffffff',
                                            '& .MuiChip-label': {
                                                paddingLeft: '8px',
                                                paddingRight: '8px',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                height: '100%',
                                            }
                                        }}
                                    />
                                </TableCell>
                                <TableCell
                                    sx={{
                                        width: 'auto',
                                        whiteSpace: 'normal',
                                        wordBreak: 'break-word',
                                        overflowWrap: 'anywhere',
                                        fontFamily: "inherit",
                                        fontSize: '0.95rem',
                                        fontWeight: 500, // Medium weight for better readability
                                        color: '#334155', // slate-700
                                        lineHeight: 1.6,
                                        verticalAlign: 'top',
                                        py: 2,
                                        borderBottom: '1px solid #f1f5f9',
                                    }}
                                >
                                    {v.violation_summary}
                                </TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
