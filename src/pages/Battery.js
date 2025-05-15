import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer
} from "recharts";
import "./Battery.css"; // ✅ Import the CSS

const dummyBatteryHistory = [
  { time: "10:00", battery: 78 },
  { time: "10:10", battery: 80 },
  { time: "10:20", battery: 76 },
  { time: "10:30", battery: 82 },
  { time: "10:40", battery: 79 },
];

const Battery = () => {
  const [battery, setBattery] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const docRef = doc(db, "readings", "VMnkCzQKEMxF8ab3pbMQ");
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setBattery(docSnap.data().battery);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="battery-page">
      <h2 className="battery-heading">Battery Details</h2>

      <div className="live-box">
        <p className="live-label">Live Battery</p>
        <p className="live-value">
          {battery !== null ? `${battery}%` : "Loading..."}
        </p>
      </div>

      <div className="chart-box">
        <h3 className="chart-heading">Battery History</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={dummyBatteryHistory}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis unit="%" />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="battery" stroke="#FF914D" strokeWidth={3} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Battery;
