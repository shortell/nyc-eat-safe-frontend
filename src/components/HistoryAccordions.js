'use client';

import React, { useState } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Paper from '@mui/material/Paper';
import GradeLetter from '@/components/GradeLetter';
import ScoreBox from '@/components/ScoreBox';
import ViolationsTable from '@/components/ViolationsTable';
import ScoreGauge from '@/components/ScoreGauge';

export default function HistoryAccordions({ inspections }) {
    const [expanded, setExpanded] = useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    if (!inspections || inspections.length === 0) {
        return (
            <div className="text-center py-12 text-gray-500 font-medium">
                No inspection history available.
            </div>
        );
    }

    return (
        <div className="space-y-4">
            <h2 className="text-xl font-bold text-[#1a1a1a] mb-4">Inspection History</h2>
            {inspections.map((insp, idx) => {
                const sortedViolations = [...(insp.violations || [])].sort((a, b) => {
                    const pr = (v) =>
                        v.critical_flag === 'Pest Critical' ? 0 : v.critical_flag === 'Critical' ? 1 : 2;
                    return pr(a) - pr(b);
                });

                const date = new Date(insp.inspection_date).toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric',
                });

                const currentGrade = insp.grade ?? 'N';

                let projectedGrade = null;
                if (currentGrade === 'N' && insp.score !== null && insp.score !== undefined) {
                    const s = insp.score;
                    if (s <= 13) projectedGrade = 'A';
                    else if (s <= 27) projectedGrade = 'B';
                    else projectedGrade = 'C';
                }

                return (
                    <Accordion
                        key={idx}
                        expanded={expanded === `panel-${idx}`}
                        onChange={handleChange(`panel-${idx}`)}
                        sx={{
                            borderRadius: '16px !important',
                            overflow: 'hidden',
                            boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
                            border: '1px solid rgba(0,0,0,0.06)',
                            '&:before': { display: 'none' },
                            '&.Mui-expanded': {
                                margin: '0 !important',
                                boxShadow: '0 4px 20px rgba(40, 80, 183, 0.12)',
                                border: '1px solid rgba(40, 80, 183, 0.2)',
                            },
                            transition: 'all 0.3s ease',
                        }}
                    >
                        <AccordionSummary
                            expandIcon={
                                <ExpandMoreIcon
                                    sx={{
                                        color: '#2850B7',
                                        fontSize: '28px',
                                        transition: 'transform 0.3s ease',
                                    }}
                                />
                            }
                            sx={{
                                px: { xs: 2, sm: 3 },
                                py: 1.5,
                                backgroundColor: expanded === `panel-${idx}` ? '#f8faff' : '#fff',
                                transition: 'background-color 0.3s ease',
                                '&:hover': { backgroundColor: '#f8faff' },
                                minHeight: '72px',
                            }}
                        >
                            <div className="flex items-center gap-3">
                                <div
                                    className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-sm"
                                    style={{
                                        backgroundColor:
                                            currentGrade === 'A'
                                                ? '#2a3d83'
                                                : currentGrade === 'B'
                                                    ? '#58944c'
                                                    : currentGrade === 'C'
                                                        ? '#c6673e'
                                                        : '#6b7280',
                                    }}
                                >
                                    {currentGrade}
                                </div>
                                <div className="font-bold text-[#1a1a1a] text-sm sm:text-base">
                                    {date}
                                </div>
                            </div>
                        </AccordionSummary>
                        <AccordionDetails sx={{ p: 0 }}>
                            {/* Clipboard-style card inside the accordion */}
                            <div className="relative mx-auto max-w-2xl w-full py-6 px-2 sm:px-4">
                                <div
                                    className="
                                        relative rounded-[24px]
                                        bg-[#333333]
                                        shadow-[0_20px_40px_-10px_rgba(0,0,0,0.6)]
                                        pb-4 pt-4 px-2 sm:px-4
                                    "
                                >
                                    {/* Board Texture */}
                                    <div className="absolute inset-0 rounded-[24px] bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />

                                    {/* Clip Mechanism */}
                                    <div className="absolute -top-6 left-1/2 -translate-x-1/2 z-[5] w-32 h-16 flex justify-center">
                                        <div className="absolute top-6 w-28 h-8 bg-gradient-to-b from-slate-300 to-slate-400 rounded-sm shadow-sm" />
                                        <div className="
                                            relative top-0
                                            w-24 h-12
                                            bg-gradient-to-b from-slate-100 via-slate-300 to-slate-400
                                            rounded-t-[1.5rem] rounded-b-sm
                                            shadow-[0_4px_6px_rgba(0,0,0,0.4)]
                                            border-t border-white/40
                                            flex items-center justify-center
                                        ">
                                            <div className="w-4 h-4 rounded-full bg-[#1a1a1a] shadow-inner mb-4 border border-slate-400" />
                                            <div className="absolute bottom-2 left-2 w-2 h-2 rounded-full bg-slate-200 shadow-sm" />
                                            <div className="absolute bottom-2 right-2 w-2 h-2 rounded-full bg-slate-200 shadow-sm" />
                                        </div>
                                    </div>

                                    {/* Paper Sheet */}
                                    <Paper
                                        elevation={4}
                                        sx={{
                                            position: 'relative',
                                            borderRadius: '16px',
                                            overflow: 'hidden',
                                            minHeight: '300px',
                                            backgroundColor: '#ffffff',
                                            padding: { xs: '1rem', sm: '2rem' },
                                            paddingTop: { xs: '3rem', sm: '3.5rem' },
                                        }}
                                    >
                                        {/* Header */}
                                        <div className="flex flex-col items-center border-b-2 border-slate-100 pb-6 mb-6">
                                            <h3 className="text-sm font-bold tracking-widest text-slate-400 uppercase mb-2">
                                                Inspection
                                            </h3>
                                            <div className="font-mono font-bold text-slate-800 text-2xl">
                                                {date}
                                            </div>
                                        </div>

                                        {/* Grades */}
                                        <div className="flex flex-wrap sm:flex-nowrap justify-center items-center gap-4 w-full mb-8 py-6 border-y border-dashed border-slate-200">
                                            <div className="flex flex-col items-center flex-1">
                                                <span className="text-xs sm:text-sm font-bold text-slate-600 uppercase tracking-widest mb-2 whitespace-nowrap text-center">
                                                    City Grade
                                                </span>
                                                <div className="scale-110">
                                                    <GradeLetter grade={currentGrade} />
                                                </div>
                                            </div>

                                            <div className="w-px h-12 bg-slate-200 flex-none" />

                                            <div className="flex flex-col items-center flex-1">
                                                <span className="text-xs sm:text-sm font-bold text-slate-600 uppercase tracking-widest mb-2 whitespace-nowrap text-center">
                                                    Violation Score
                                                </span>
                                                <div className="scale-110">
                                                    <ScoreBox score={insp.score} />
                                                </div>
                                            </div>

                                            {projectedGrade && (
                                                <>
                                                    <div className="hidden sm:block w-px h-12 bg-slate-200 flex-none" />
                                                    <div className="flex flex-col items-center basis-full sm:flex-1 sm:basis-0">
                                                        <span className="text-xs sm:text-sm font-bold text-slate-600 uppercase tracking-widest mb-2 whitespace-nowrap text-center">
                                                            Projected Grade
                                                        </span>
                                                        <div className="scale-110">
                                                            <GradeLetter grade={projectedGrade} />
                                                        </div>
                                                    </div>
                                                </>
                                            )}
                                        </div>

                                        {/* Score Gauge */}
                                        {insp.score != null && (
                                            <div className="w-full px-4 mb-8">
                                                <ScoreGauge score={insp.score} />
                                            </div>
                                        )}

                                        {/* Violations */}
                                        <div className="w-full overflow-x-auto">
                                            <ViolationsTable violations={sortedViolations} />
                                        </div>
                                    </Paper>
                                </div>
                            </div>
                        </AccordionDetails>
                    </Accordion>
                );
            })}
        </div>
    );
}
