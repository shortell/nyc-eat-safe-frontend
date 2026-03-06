'use client';

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

// Grade color by score
function gradeColor(score) {
    if (score == null || score <= 13) return '#2850B7'; // blue  — A (0–13)
    if (score <= 27) return '#16a34a'; // green — B (14–27)
    return '#ea580c';                                   // orange — C (28+)
}

export default function HistoryChart({ inspections }) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => { setMounted(true); }, []);

    if (!mounted || !inspections || inspections.length === 0) return null;

    // Chronological order (oldest → newest)
    const sorted = [...inspections].sort(
        (a, b) => new Date(a.inspection_date) - new Date(b.inspection_date)
    );

    const scores = sorted.map((insp) => insp.score ?? 0);
    const categories = sorted.map((insp) =>
        new Date(insp.inspection_date).toLocaleDateString('en-US', {
            month: 'short',
            year: 'numeric',
        })
    );

    const latestScore = scores[scores.length - 1] ?? 0;

    const options = {
        chart: {
            height: 350,
            type: 'area',
            zoom: { enabled: false },
            toolbar: { show: false },
            fontFamily: 'Manrope, sans-serif',
            background: 'transparent',
        },
        colors: ['#2850B7'],
        dataLabels: { enabled: false },
        stroke: {
            curve: 'smooth',
            width: 3,
        },
        fill: {
            type: 'gradient',
            gradient: {
                shadeIntensity: 1,
                colorStops: [
                    { offset: 0, color: '#2850B7', opacity: 0.45 },
                    { offset: 100, color: '#2850B7', opacity: 0.04 },
                ],
            },
        },
        title: {
            text: 'Violation Score Over Time',
            align: 'left',
            style: {
                fontSize: '18px',
                fontWeight: 700,
                color: '#1a1a1a',
                fontFamily: 'Manrope, sans-serif',
            },
        },
        subtitle: {
            text: 'Lower scores are better  ·  A: 0–13  ·  B: 14–27  ·  C: 28+',
            align: 'left',
            style: {
                fontSize: '12px',
                fontWeight: 400,
                color: '#6b7280',
                fontFamily: 'Manrope, sans-serif',
            },
        },
        xaxis: {
            type: 'category',
            categories,
            labels: {
                rotate: -45,
                rotateAlways: true,
                offsetY: 8,
                style: {
                    colors: '#374151',
                    fontSize: '12px',
                    fontFamily: 'Manrope, sans-serif',
                },
            },
            axisBorder: { show: false },
            axisTicks: { show: false },
        },
        yaxis: {
            min: 0,
            max: 40,
            tickAmount: 4,
            title: {
                text: 'Score',
                offsetX: -5,
                style: {
                    color: '#64748b',
                    fontSize: '13px',
                    fontWeight: 600,
                    fontFamily: 'Manrope, sans-serif',
                },
            },
            labels: {
                formatter: (val) => Math.round(val),
                offsetX: -5,
                style: {
                    colors: '#374151',
                    fontSize: '12px',
                    fontFamily: 'Manrope, sans-serif',
                },
            },
        },
        grid: {
            borderColor: '#e2e8f0',
            strokeDashArray: 4,
            xaxis: { lines: { show: false } },
            padding: { right: 60, left: 15, bottom: 10 },
        },
        legend: { show: false },
        tooltip: {
            theme: 'light',
            y: { formatter: (val) => `Score: ${val}` },
            style: { fontFamily: 'Manrope, sans-serif' },
        },
        markers: {
            size: 0,
            hover: { size: 8 },
            discrete: sorted.map((insp, i) => ({
                seriesIndex: 0,
                dataPointIndex: i,
                fillColor: gradeColor(insp.score),
                strokeColor: '#ffffff',
                size: 6,
            })),
        },
        annotations: {
            yaxis: [
                {
                    y: 0,
                    borderColor: 'transparent',
                    borderWidth: 0,
                    label: {
                        text: 'A',
                        position: 'right',
                        offsetX: 24,
                        offsetY: 2,
                        style: {
                            color: '#1e3a8a',
                            background: '#dbeafe',
                            fontSize: '13px',
                            fontWeight: 800,
                            fontFamily: 'Manrope, sans-serif',
                            padding: { left: 7, right: 7, top: 3, bottom: 3 },
                        },
                    },
                },
                {
                    y: 14,
                    borderColor: '#16a34a',
                    borderWidth: 2,
                    strokeDashArray: 4,
                    label: {
                        text: 'B',
                        position: 'right',
                        offsetX: 24,
                        style: {
                            color: '#14532d',
                            background: '#dcfce7',
                            fontSize: '13px',
                            fontWeight: 800,
                            fontFamily: 'Manrope, sans-serif',
                            padding: { left: 7, right: 7, top: 3, bottom: 3 },
                        },
                    },
                },
                {
                    y: 28,
                    borderColor: '#ea580c',
                    borderWidth: 2,
                    strokeDashArray: 4,
                    label: {
                        text: 'C',
                        position: 'right',
                        offsetX: 24,
                        style: {
                            color: '#7c2d12',
                            background: '#ffedd5',
                            fontSize: '13px',
                            fontWeight: 800,
                            fontFamily: 'Manrope, sans-serif',
                            padding: { left: 7, right: 7, top: 3, bottom: 3 },
                        },
                    },
                },
            ],
        },
    };

    const series = [
        {
            name: 'Violation Score',
            data: scores,
        },
    ];

    return (
        <div className="w-full">
            <Chart
                options={options}
                series={series}
                type="area"
                height={350}
                width="100%"
            />
        </div>
    );
}
