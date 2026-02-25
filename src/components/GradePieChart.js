'use client';

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';

const ReactApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

const GRADE_COLORS = {
    A: '#2a3d83',
    B: '#58944c',
    C: '#c6673e',
    N: '#6b7280',
    // Fallback for any other grades
    default: '#9ca3af'
};

export default function GradePieChart() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            try {
                const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/grade-distribution`);
                if (!res.ok) throw new Error('Failed to load grade distribution');
                const json = await res.json();
                setData(json);
            } catch (err) {
                console.error("Error fetching grade distribution:", err);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-10 w-10 border-4 border-gray-200 border-t-[#2a3d83]"></div>
            </div>
        );
    }

    if (!data || (Array.isArray(data) && data.length === 0)) {
        return <div className="text-center text-gray-500 py-8">No grade data available</div>;
    }

    // Normalize data to { grade: string, count: number }[]
    // API returns [{ grade_label: 'A', count: 100 }, ...]
    let processedData = [];
    if (Array.isArray(data)) {
        processedData = data.map(d => ({
            grade: d.grade_label ?? d.grade,
            count: d.count,
        }));
    } else if (typeof data === 'object') {
        processedData = Object.entries(data).map(([grade, count]) => ({ grade, count }));
    }

    // Filter out entries with no valid grade
    processedData = processedData.filter(d => d.grade != null);

    // Sort logic: A, B, C, N, then others
    const order = ['A', 'B', 'C', 'N'];
    processedData.sort((a, b) => {
        const idxA = order.indexOf(a.grade);
        const idxB = order.indexOf(b.grade);

        // If both are in the order list, compare indices
        if (idxA !== -1 && idxB !== -1) return idxA - idxB;
        // If only one is in the list, that one comes first
        if (idxA !== -1) return -1;
        if (idxB !== -1) return 1;
        // If neither, compare alphabetically (guard with String() for safety)
        return String(a.grade).localeCompare(String(b.grade));
    });

    const series = processedData.map(d => Number(d.count));
    const labels = processedData.map(d => d.grade);
    const colors = labels.map(g => GRADE_COLORS[g] || GRADE_COLORS.default);

    const total = series.reduce((s, v) => s + v, 0);

    const options = {
        chart: {
            type: 'pie',
            fontFamily: 'inherit',
            animations: { enabled: true, speed: 600 },
            toolbar: { show: false },
        },
        labels: labels,
        colors: colors,
        stroke: {
            show: true,
            colors: ['#fff'],
            width: 1,
        },
        dataLabels: {
            enabled: false,
            textAnchor: 'middle',
            distributed: false,
            offsetX: 0,
            offsetY: 0,
            style: {
                fontSize: '13px',
                fontWeight: '700',
                colors: ['#111827'],
            },
            background: {
                enabled: true,
                foreColor: '#111827',
                padding: 4,
                borderRadius: 4,
                borderWidth: 1,
                borderColor: '#e5e7eb',
                opacity: 0.92,
                dropShadow: { enabled: false },
            },
            dropShadow: { enabled: false },
            formatter: (val, opts) => {
                const grade = labels[opts.seriesIndex];
                return [`Grade ${grade}`, `${val.toFixed(1)}%`];
            },
        },
        plotOptions: {
            pie: {
                expandOnClick: true,
                dataLabels: {
                    offset: 30,
                    minAngleToShowLabel: 5,
                },
            },
        },
        legend: {
            show: true,
            position: 'bottom',
            fontSize: '14px',
            fontWeight: 600,
            labels: { colors: '#374151' },
            markers: {
                width: 12,
                height: 12,
                radius: 6,
                offsetX: -2,
            },
            itemMargin: { horizontal: 12, vertical: 6 },
            formatter: (seriesName, opts) => {
                const count = opts.w.globals.series[opts.seriesIndex];
                const pct = total > 0 ? ((count / total) * 100).toFixed(1) : '0.0';
                return `Grade ${seriesName} — ${count.toLocaleString()} (${pct}%)`;
            },
        },
        tooltip: {
            enabled: true,
            fillSeriesColor: false,
            custom: ({ series, seriesIndex, w }) => {
                const grade = labels[seriesIndex];
                const count = series[seriesIndex];
                const pct = total > 0 ? ((count / total) * 100).toFixed(1) : '0.0';
                const color = colors[seriesIndex];
                return `
                    <div style="
                        background:#fff;
                        color:#111827;
                        border:1px solid #e5e7eb;
                        border-radius:10px;
                        box-shadow:0 6px 18px rgba(0,0,0,0.10);
                        padding:10px 14px;
                        min-width:160px;
                        font-family:inherit;
                    ">
                        <div style="display:flex;align-items:center;gap:8px;margin-bottom:6px;">
                            <span style="display:inline-block;width:10px;height:10px;border-radius:50%;background:${color};"></span>
                            <span style="font-weight:700;font-size:13px;">Grade ${grade}</span>
                        </div>
                        <div style="font-size:12px;color:#6b7280;">${count.toLocaleString()} restaurants</div>
                        <div style="font-size:12px;color:#6b7280;">${pct}% of total</div>
                    </div>
                `;
            },
        },
        responsive: [{
            breakpoint: 640,
            options: {
                chart: { width: '100%' },
                legend: { position: 'bottom' },
                plotOptions: {
                    pie: { dataLabels: { offset: 20 } },
                },
            },
        }],
    };

    return (
        <div className="w-full py-4">
            <div id="grade-pie-chart" className="w-full">
                <ReactApexChart
                    options={options}
                    series={series}
                    type="pie"
                    width="100%"
                    height={420}
                />
            </div>
        </div>
    );
}
