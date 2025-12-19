import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './components/AuthContext';
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
import AccountPage from './components/AccountPage';
import SpotHistoryPage from './components/SpotHistoryPage';
import TransactionHistoryPage from './components/TransactionHistoryPage';
import BlogPage from './components/BlogPage';
import NotificationPage from './components/NotificationPage';
import PrivacyPolicyPage from './components/PrivacyPolicyPage';
import NotFoundPage from './components/NotFoundPage';
import BackpackPage from './components/BackpackPage';
import AuthLayout from './components/AuthLayout';

// Protected route component that redirects unauthenticated users to login
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  
  if (loading) {
    return <div>Loading...</div>; // Or a spinner component
  }
  
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          {/* Public pages that anyone can access - no sidebar */}
          <Route path="/" element={<HomePage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/privacypolicy" element={<PrivacyPolicyPage />} />
          {/* Learn page always redirects to 404 */}
          <Route path="/learn" element={<Navigate to="/404" replace />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage />} />
          
          {/* Protected pages that require authentication - show sidebar */}
          <Route
            path="/market"
            element={
              <ProtectedRoute>
                <AuthLayout>
                  <MarketPage />
                </AuthLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/spot"
            element={
              <ProtectedRoute>
                <AuthLayout>
                  <SpotPage />
                </AuthLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/spothistory"
            element={
              <ProtectedRoute>
                <AuthLayout>
                  <SpotHistoryPage />
                </AuthLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/transactionhistory"
            element={
              <ProtectedRoute>
                <AuthLayout>
                  <TransactionHistoryPage />
                </AuthLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/notification"
            element={
              <ProtectedRoute>
                <AuthLayout>
                  <NotificationPage />
                </AuthLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/support"
            element={
              <ProtectedRoute>
                <AuthLayout>
                  <SupportPage />
                </AuthLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <AuthLayout>
                  <DashboardPage />
                </AuthLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/asset"
            element={
              <ProtectedRoute>
                <AuthLayout>
                  <AssetPage />
                </AuthLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/deposit"
            element={
              <ProtectedRoute>
                <AuthLayout>
                  <DepositPage />
                </AuthLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/withdraw"
            element={
              <ProtectedRoute>
                <AuthLayout>
                  <WithdrawPage />
                </AuthLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/overview"
            element={
              <ProtectedRoute>
                <AuthLayout>
                  <OverviewPage />
                </AuthLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/security"
            element={
              <ProtectedRoute>
                <AuthLayout>
                  <SecurityPage />
                </AuthLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/identification"
            element={
              <ProtectedRoute>
                <AuthLayout>
                  <IdentificationPage />
                </AuthLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/account"
            element={
              <ProtectedRoute>
                <AuthLayout>
                  <AccountPage />
                </AuthLayout>
              </ProtectedRoute>
            }
          />
          <Route path="/backpack" element={
            <ProtectedRoute>
              <BackpackPage />
            </ProtectedRoute>
          } />
          <Route path="/404" element={<NotFoundPage />} />
          <Route path="*" element={<Navigate to="/404" replace />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

// Wrapper for using auth context
function AppWithAuth() {
  return (
    <AuthProvider>
      <App />
    </AuthProvider>
  );
}

export default AppWithAuth;