import React, { useEffect, useState } from 'react';
import { doc, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';
import './Dashboard.css';
import { FaBolt, FaBatteryFull, FaSolarPanel } from 'react-icons/fa';
import { MdElectricalServices } from 'react-icons/md';
import Header from '../components/Header';
import { useNavigate } from 'react-router-dom'; // ✅ Add this

const Dashboard = () => {
  const navigate = useNavigate(); // ✅ Initialize
  const [mode, setMode] = useState('solar');
  const [solarData, setSolarData] = useState(null);
  const [electricityData, setElectricityData] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const unsubSolar = onSnapshot(doc(db, 'smartInverterData', 'solarData'), (doc) => {
      setSolarData(doc.data());
    });

    const unsubElectricity = onSnapshot(doc(db, 'smartInverterData', 'electricityData'), (doc) => {
      setElectricityData(doc.data());
    });

    return () => {
      unsubSolar();
      unsubElectricity();
    };
  }, []);

  const handleToggle = () => {
    setLoading(true);
    setTimeout(() => {
      setMode((prev) => (prev === 'solar' ? 'electricity' : 'solar'));
      setLoading(false);
    }, 1000);
  };

  const renderSolarCards = () => (
    <div className="cards-container">
      <div className="card clickable" onClick={() => navigate('/voltage')}>
        <FaBolt className="icon" />
        <p>Voltage</p>
        <h2>{solarData?.voltage || '220'} V</h2>
      </div>
      <div className="card clickable" onClick={() => navigate('/ampere')}>
        <MdElectricalServices className="icon" />
        <p>Ampere</p>
        <h2>{solarData?.ampere || '5.5'} A</h2>
      </div>
      <div className="card clickable" onClick={() => navigate('/battery')}>
        <FaBatteryFull className="icon" />
        <p>Battery</p>
        <h2>{solarData?.battery || '80'}%</h2>
      </div>
      <div className="card clickable" onClick={() => navigate('/status')}>
        <FaSolarPanel className="icon" />
        <p>Status</p>
        <h2>{solarData?.status || 'Running'}</h2>
      </div>
    </div>
  );

  const renderElectricityCards = () => (
    <div className="cards-container">
      <div className="card clickable" onClick={() => navigate('/voltage')}>
        <FaBolt className="icon" />
        <p>Voltage</p>
        <h2>{electricityData?.voltage || '220'} V</h2>
      </div>
      <div className="card clickable" onClick={() => navigate('/ampere')}>
        <MdElectricalServices className="icon" />
        <p>Ampere</p>
        <h2>{electricityData?.ampere || '5.5'} A</h2>
      </div>
    </div>
  );

  return (
    <div>
      <Header />
      <div className="dashboard">
        <div className="dashboard-header">
          <h1>{mode === 'solar' ? 'Solar Panel Dashboard' : 'Electricity Dashboard'}</h1>
          <button className={`toggle-button ${mode}`} onClick={handleToggle}>
            {loading ? 'Switching...' : `Switch to ${mode === 'solar' ? 'Electricity' : 'Solar'} Mode`}
          </button>
        </div>

        {loading ? (
          <div className="loader"></div>
        ) : mode === 'solar' ? (
          renderSolarCards()
        ) : (
          renderElectricityCards()
        )}
      </div>
    </div>
  );
};

export default Dashboard;
