import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import "./Status.css"; // ✅ Import the external stylesheet
import Header from "../components/Header";

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
      const docRef = doc(db, "readings", "VMnkCzQKEMxF8ab3pbMQ");
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setStatus(docSnap.data().status);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <Header/>
    <div className="status-page">
      <div className="status-live-box">
        <p className="status-label">Current Status</p>
        <p className="status-value">{status || "Loading..."}</p>
      </div>

      <div className="status-history-box">
        <h3 className="status-history-heading">Status History</h3>
        <table className="status-table">
          <thead>
            <tr>
              <th>Time</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {dummyStatusHistory.map((item, index) => (
              <tr key={index}>
                <td>{item.time}</td>
                <td
                  className={
                    item.status === "Active"
                      ? "status-active"
                      : item.status === "Idle"
                      ? "status-idle"
                      : "status-offline"
                  }
                >
                  {item.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    </div>
  );
};

export default Status;
