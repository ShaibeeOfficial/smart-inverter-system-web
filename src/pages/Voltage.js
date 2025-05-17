import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer
} from "recharts";
import "./Voltage.css"; // ✅ Import external CSS
import Header from "../components/Header";

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
      const docRef = doc(db, "readings", "VMnkCzQKEMxF8ab3pbMQ");
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
    <div>
      <Header />
    <div className="voltage-page">
      <div className="voltage-live-box">
        <p className="voltage-label">Live Voltage</p>
        <p className="voltage-value">
          {voltage !== null ? `${voltage} V` : "Loading..."}
        </p>
      </div>

      <div className="voltage-history-box">
        <h3 className="voltage-history-heading">Voltage History</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={dummyVoltageHistory}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis unit=" V" />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="voltage"
              stroke="#FF914D"
              strokeWidth={3}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
    </div>
  );
};

export default Voltage;
