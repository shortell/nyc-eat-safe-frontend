// app/components/ScoreHistogram.js
"use client";

import dynamic from "next/dynamic";
import { useEffect, useMemo, useState } from "react";

const ReactApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

/**
 * Props:
 *  - bins?: Array<{ bin_value: number; count: number }>
 *  - dataUrl?: string (fallback fetch if bins not provided)
 *  - height?: number
 */
export default function ScoreHistogram({
  bins,
  dataUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/about`,
  height = 300,
}) {
  const [fetched, setFetched] = useState(null);

  useEffect(() => {
    if (bins?.length) return; // using provided data
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch(dataUrl, { cache: "no-store" });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json = await res.json();
        if (!cancelled) setFetched(json);
      } catch (e) {
        console.error("Failed to load histogram data:", e);
        if (!cancelled) setFetched([]);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [bins, dataUrl]);

  // Stable raw data source
  const rawData = useMemo(() => (bins && bins.length ? bins : fetched ?? []), [bins, fetched]);

  // X categories 0..16 inclusive (numbers)
  const categories = useMemo(() => Array.from({ length: 17 }, (_, i) => i), []);

  // Map incoming bins -> dense 0..17 counts (no negatives)
  const counts = useMemo(() => {
    const map = new Map();
    for (const row of rawData) {
      const b = Number(row?.bin_value);
      const c = Number(row?.count);
      if (Number.isInteger(b) && b >= 0 && b <= 16) map.set(b, c > 0 ? c : 0);
    }
    return categories.map((b) => map.get(b) ?? 0);
  }, [rawData, categories]);

  // Y-axis: round up to nearest 1000 (min 1000)
  const yMax = useMemo(() => {
    const maxVal = Math.max(0, ...counts);
    const base = Math.max(maxVal, 1000);
    return Math.ceil(base / 1000) * 1000;
  }, [counts]);

  const tickAmount = useMemo(() => Math.max(1, yMax / 1000), [yMax]);

  // Per-bar colors: 0–13 = #2a3d83, 14–17 = #58944c
  const colors = useMemo(
    () => categories.map((b) => (b <= 13 ? "#2a3d83" : "#58944c")),
    [categories]
  );

  const options = useMemo(
    () => ({
      theme: { mode: "light" }, // prevent dark-mode palette
      chart: {
        background: "transparent",
        type: "bar",
        toolbar: { show: false },
        zoom: { enabled: false },
        animations: { enabled: true },
        foreColor: "#111827",
        selection: { enabled: false },
        parentHeightOffset: 0, // remove extra top spacing
      },
      fill: { opacity: 1 }, // keep bar colors solid
      grid: {
        borderColor: "#e5e7eb",
        strokeDashArray: 3,
        padding: { left: 0, right: 0, top: 0, bottom: 0 }, // tight to edges
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "70%", // maximize horizontal use
          borderRadius: 4,
          distributed: true,
        },
      },
      dataLabels: { enabled: false },
      xaxis: {
        type: 'numeric',
        tickAmount: 18, // intervals = 18 for range -1 to 17
        min: -1,
        max: 17,
        title: {
          text: "Scores Given",
          style: { fontSize: "12px", fontWeight: 400 }
        },
        labels: {
          style: { fontSize: "11px", fontWeight: 400 },
          trim: false,
          hideOverlappingLabels: false, // Force all labels to show
          rotate: -45, // Rotate if tight on mobile
          rotateAlways: false,
          formatter: (val) => {
            const v = Math.round(Number(val));
            if (v < 0 || v > 16) return "";
            return v.toString();
          }
        },
        // axisBorder/Ticks can remain
        axisBorder: { color: "#e5e7eb" },
        axisTicks: { color: "#e5e7eb" },
      },
      yaxis: {
        min: 0,
        max: yMax,
        tickAmount,
        title: {
          text: "# of Restaurants",
          style: { fontSize: "12px", fontWeight: 400 }
        },
        labels: {
          style: { fontSize: "11px", fontWeight: 400 },
          formatter: (v) => Number(v).toLocaleString()
        },
      },

      tooltip: {
        enabled: true,
        shared: false,
        intersect: false,
        fillSeriesColor: false,
        custom: ({ series, seriesIndex, dataPointIndex, w }) => {
          // dataPointIndex correlates with our filtered categories
          const x = categories[dataPointIndex];
          const y = series?.[seriesIndex]?.[dataPointIndex] ?? 0;
          const yText = Number(y).toLocaleString();
          const dotColor = Number(x) <= 13 ? "#2a3d83" : "#58944c";
          return `
            <div style="
              background:#ffffff;
              color:#111827;
              border:1px solid #e5e7eb;
              border-radius:10px;
              box-shadow:0 6px 18px rgba(0,0,0,0.08);
              padding:10px 12px;
              min-width:160px;
            ">
              <div style="font-weight:700; font-size:12px; margin-bottom:6px;">
                Score ${x}
              </div>
              <div style="display:flex; align-items:center; gap:8px; font-size:12px;">
                <span style="
                  display:inline-block;
                  width:8px; height:8px; border-radius:9999px;
                  background:${dotColor};
                "></span>
                <span style="font-weight:600;">${yText}</span>
                <span style="color:#6b7280;">restaurants</span>
              </div>
            </div>
          `;
        },
      },
      legend: { show: false },
      states: {
        hover: { filter: { type: "lighten", value: 0.08 } },
        active: { filter: { type: "darken", value: 0.08 } },
      },
      colors,
      annotations: {
        xaxis: [
          {
            x: 13.5,
            strokeDashArray: 4,
            borderColor: "#EF4444", // red-500
            borderWidth: 2,
            label: {
              borderColor: "#EF4444",
              style: {
                color: "#fff",
                background: "#EF4444",
                fontSize: "12px",
                fontWeight: 600,
                padding: { left: 8, right: 8, top: 4, bottom: 4 },
              },
              text: ["Notice the steep drop", "off right at the cut", "off from A to B"],
              orientation: "horizontal",
              offsetY: -15,
              offsetX: -70,
            },
          },
        ],
      },
    }),
    [categories, yMax, tickAmount, colors]
  );

  const series = useMemo(() => [
    {
      name: "Restaurants",
      data: categories.map((cat, i) => ({ x: cat, y: counts[i] }))
    }
  ], [categories, counts]);

  // Full-width, no padding wrapper for maximum space (especially on mobile)
  return (
    <div className="w-full m-0 p-0">
      <ReactApexChart options={options} series={series} type="bar" height={height} />
    </div>
  );
}
