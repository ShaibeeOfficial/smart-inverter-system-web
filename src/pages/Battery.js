import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer
} from "recharts";

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
    <div style={{ padding: "30px", backgroundColor: "#f2f2f2", minHeight: "100vh" }}>
      <h2 style={{ fontSize: "26px", marginBottom: "20px" }}>Battery Details</h2>

      <div style={{
        backgroundColor: "#fff",
        padding: "30px",
        borderRadius: "10px",
        border: "2px solid #FF914D",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        marginBottom: "30px"
      }}>
        <p style={{ fontSize: "20px", marginBottom: "10px" }}>Live Battery</p>
        <p style={{ fontSize: "28px", fontWeight: "bold", color: "#FF914D" }}>
          {battery !== null ? `${battery}%` : "Loading..."}
        </p>
      </div>

      <div style={{
        backgroundColor: "#fff",
        padding: "20px",
        borderRadius: "10px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
      }}>
        <h3 style={{ color: "#FF914D", marginBottom: "20px" }}>Battery History</h3>
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
