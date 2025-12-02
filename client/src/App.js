import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './components/HomePage';
import MarketPage from './components/MarketPage';
import SpotPage from './components/SpotPage';
import SupportPage from './components/SupportPage';
import LearnPage from './components/LearnPage';
import SignupPage from './components/SignupPage';
import LoginPage from './components/LoginPage';
import DashboardPage from './components/DashboardPage';
import AssetPage from './components/AssetPage';
import Footer from './components/Footer';
import './App.css';
import DepositPage from './components/DepositPage';
import WithdrawPage from './components/WithdrawPage';
import OverviewPage from './components/OverviewPage';
import SecurityPage from './components/SecurityPage';
import IdentificationPage from './components/IdentificationPage';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/market" element={<MarketPage />} />
          <Route path="/spot" element={<SpotPage />} />
          <Route path="/support" element={<SupportPage />} />
          <Route path="/learn" element={<LearnPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/asset" element={<AssetPage />} />
          <Route path="/deposit" element={<DepositPage />} />
          <Route path="/withdraw" element={<WithdrawPage />} />
          <Route path="/overview" element={<OverviewPage />} />
          <Route path="/security" element={<SecurityPage />} />
          <Route path="/identification" element={<IdentificationPage />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;