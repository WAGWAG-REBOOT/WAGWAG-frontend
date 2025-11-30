"use client";
import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts";

const data = [
  { time: "13:00", value: 12 },
  { time: "13:30", value: 8 },
  { time: "14:00", value: 5 },
  { time: "14:30", value: 6 },
  { time: "15:00", value: 3 },
  { time: "15:30", value: 4 },
  { time: "16:00", value: 15 },
];

const formatXAxis = (tickItem: string) => {
  return tickItem.split(":")[0] + "시";
};
function UploadChart() {
  return (
    <div style={{ width: "100%", height: 150 }}>
      <ResponsiveContainer>
        <LineChart data={data}>
          <CartesianGrid
            stroke="rgba(255,255,255,0.2)"
            vertical={false}
          />
          <XAxis
            dataKey="time"
            stroke="#fff"
            tickFormatter={formatXAxis}
          />
          <YAxis hide />
          <Line
            type="monotone"
            dataKey="value"
            stroke="#57F98E"
            strokeWidth={1.125}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default UploadChart;
