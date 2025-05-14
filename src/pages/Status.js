import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";

const dummyStatusHistory = [
  { time: "10:00 AM", status: "Active" },
  { time: "10:15 AM", status: "Idle" },
  { time: "10:30 AM", status: "Active" },
  { time: "10:45 AM", status: "Offline" },
  { time: "11:00 AM", status: "Active" },
];

const Status = () => {
  const [status, setStatus] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      const docRef = doc(db, "readings", "VMnkCzQKEMxF8ab3pbMQ"); // Replace with actual doc ID
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setStatus(docSnap.data().status);
      }
    };

    fetchData();
  }, []);

  return (
    <div style={{ padding: "30px", backgroundColor: "#f2f2f2", minHeight: "100vh" }}>
      <h2 style={{ fontSize: "26px", marginBottom: "20px" }}>Status Details</h2>

      {/* Live Status Card */}
      <div style={{
        backgroundColor: "#fff",
        padding: "30px",
        borderRadius: "10px",
        border: "2px solid #FF914D",
        boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
        marginBottom: "40px",
        textAlign: "center"
      }}>
        <p style={{ fontSize: "20px", marginBottom: "10px" }}>Current Status</p>
        <p style={{ fontSize: "28px", fontWeight: "bold", color: "#FF914D" }}>
          {status || "Loading..."}
        </p>
      </div>

      {/* Status History Table */}
      <div style={{
        backgroundColor: "#fff",
        padding: "30px",
        borderRadius: "10px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.08)"
      }}>
        <h3 style={{ color: "#FF914D", marginBottom: "20px" }}>Status History</h3>
        <table style={{
          width: "100%",
          borderCollapse: "collapse",
          fontSize: "16px"
        }}>
          <thead>
            <tr style={{ backgroundColor: "#FF914D", color: "#fff" }}>
              <th style={{ padding: "12px", textAlign: "left", borderTopLeftRadius: "8px" }}>Time</th>
              <th style={{ padding: "12px", textAlign: "left", borderTopRightRadius: "8px" }}>Status</th>
            </tr>
          </thead>
          <tbody>
            {dummyStatusHistory.map((item, index) => (
              <tr key={index} style={{
                backgroundColor: index % 2 === 0 ? "#fdf1e8" : "#fff",
                transition: "background-color 0.3s"
              }}>
                <td style={{ padding: "12px" }}>{item.time}</td>
                <td style={{
                  padding: "12px",
                  fontWeight: "bold",
                  color:
                    item.status === "Active" ? "green" :
                    item.status === "Idle" ? "#999" :
                    item.status === "Offline" ? "red" : "#333"
                }}>
                  {item.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Status;
