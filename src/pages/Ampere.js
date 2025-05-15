import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, Legend, ResponsiveContainer
} from "recharts";
import "./Ampere.css"; // ✅ Import the CSS

const dummyAmpereHistory = [
  { time: "10:00", ampere: 1.5 },
  { time: "10:10", ampere: 1.7 },
  { time: "10:20", ampere: 1.4 },
  { time: "10:30", ampere: 1.8 },
  { time: "10:40", ampere: 1.6 },
];

const Ampere = () => {
  const [ampere, setAmpere] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const docRef = doc(db, "readings", "VMnkCzQKEMxF8ab3pbMQ");
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setAmpere(docSnap.data().ampere);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="ampere-page">
      <h2 className="ampere-heading">Ampere Details</h2>

      <div className="live-box">
        <p className="live-label">Live Ampere</p>
        <p className="live-value">
          {ampere !== null ? `${ampere} A` : "Loading..."}
        </p>
      </div>

      <div className="chart-box">
        <h3 className="chart-heading">Ampere History</h3>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={dummyAmpereHistory}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis unit=" A" />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="ampere" stroke="#FF914D" strokeWidth={3} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Ampere;
