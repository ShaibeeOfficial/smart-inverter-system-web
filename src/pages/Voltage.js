import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer
} from "recharts";

const dummyVoltageHistory = [
  { time: "10:00", voltage: 210 },
  { time: "10:10", voltage: 215 },
  { time: "10:20", voltage: 208 },
  { time: "10:30", voltage: 212 },
  { time: "10:40", voltage: 218 },
];

const Voltage = () => {
  const [voltage, setVoltage] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const docRef = doc(db, "readings", "VMnkCzQKEMxF8ab3pbMQ"); // replace with your actual doc ID
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setVoltage(docSnap.data().voltage);
      } else {
        console.log("No such document!");
      }
    };

    fetchData();
  }, []);

  return (
    <div style={{ padding: "30px", backgroundColor: "#f2f2f2", minHeight: "100vh" }}>
      <h2 style={{ fontSize: "26px", marginBottom: "20px" }}>Voltage Details</h2>

      {/* 🔴 Current Live Voltage */}
      <div style={{
        backgroundColor: "#fff",
        padding: "30px",
        borderRadius: "10px",
        border: "2px solid #FF914D",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        marginBottom: "30px"
      }}>
        <p style={{ fontSize: "20px", marginBottom: "10px" }}>Live Voltage</p>
        <p style={{ fontSize: "28px", fontWeight: "bold", color: "#FF914D" }}>
          {voltage !== null ? `${voltage} V` : "Loading..."}
        </p>
      </div>

      {/* 🔵 Voltage History Chart */}
      <div style={{
        backgroundColor: "#fff",
        padding: "20px",
        borderRadius: "10px",
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)"
      }}>
        <h3 style={{ color: "#FF914D", marginBottom: "20px" }}>Voltage History</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={dummyVoltageHistory}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis unit=" V" />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="voltage" stroke="#FF914D" strokeWidth={3} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Voltage;
