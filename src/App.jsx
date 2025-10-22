import { Routes, Route } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import ProtectedRoute from './components/ProtectedRoute';
import DashboardLayout from './components/DashboardLayout';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

import { Toaster } from "react-hot-toast";


// Lazy load pages
const Home = lazy(() => import('./Pages/Home'));
const About = lazy(() => import('./Pages/About'));
const Referral = lazy(() => import('./Pages/Referral'));
const SignUp = lazy(() => import('./Pages/SignUp'));
const Login = lazy(() => import('./Pages/Login'));
const Opportunities = lazy(() => import('./Pages/Opportunities'));
const PrivacyPolicy = lazy(() => import('./Pages/PrivacyPolicy'));
const TermsOfUse = lazy(() => import('./Pages/TermsOfUse'));
const Onboarding = lazy(() => import('./Pages/Onboarding/Onboarding'));

// User
const DashboardHome = lazy(() => import('./Pages/dashboard/DashboardHome'));
const Survey = lazy(() => import('./Pages/dashboard/Survey'));
const Offers = lazy(() => import('./Pages/dashboard/Offers'));
const More = lazy(() => import('./Pages/dashboard/More'));
const Profile = lazy(() => import('./Pages/dashboard/Profile'));
const Withdrawal = lazy(() => import('./Pages/dashboard/Withdrawal'));
const Leaderboard = lazy(() => import('./Pages/dashboard/Leaderboard'));
const Referr = lazy(() => import('./Pages/dashboard/Referr'));
const SupportChat = lazy(() => import('./Pages/dashboard/SupportChat'));

// Admin
const AdminLayout = lazy(() => import('./Pages/admin/AdminLayout'));
const AdminDashboardHome = lazy(() => import('./Pages/admin/DashboardHome'));
const Users = lazy(() => import('./Pages/admin/Users'));
const Withdrawals = lazy(() => import('./Pages/admin/Withdrawals'));
const ReferralViews = lazy(() => import('./Pages/admin/ReferralViews'));
const AdminLeaderboard = lazy(() => import('./Pages/admin/Leaderboard'));
const Settings = lazy(() => import('./Pages/admin/Settings'));
const Tasks = lazy(() => import('./Pages/admin/Tasks'));
const AdminChat = lazy(() => import('./Pages/admin/Chat/AdminChat'));
const AdminSpectators = lazy(() => import('./Pages/admin/AdminSpectators'));
const AddSpectators = lazy(() => import('./Pages/admin/AddSpectators'));

// Spectator
const SpectatorLayout = lazy(() => import('./Pages/spectator/SpectatorLayout'));
const SpectatorDashboard = lazy(() => import('./Pages/spectator/SpectatorDashboard'));
const SpectatorChat = lazy(() => import('./Pages/spectator/SpectatorChat'));
const SpectatorProfile = lazy(() => import('./Pages/spectator/SpectatorProfile'));
const SpectatorTasks = lazy(() => import('./Pages/spectator/SpectatorTasks'));

// Public layout wrapper
const PublicLayout = ({ children }) => (
  <>
    <Navbar /> 
    {children}
    <Footer />
  </>
);

export default function App() {
  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            fontSize: "14px",
            borderRadius: "8px",
            padding: "10px 15px",
          },
          success: {
            style: { background: "#22c55e", color: "#fff" },
          },
          error: {
            style: { background: "#ef4444", color: "#fff" },
          },
        }}
      />
      <Suspense fallback={<div className="text-center py-10 text-white">Loading...</div>}>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<PublicLayout><Home /></PublicLayout>} />
          <Route path="/about" element={<PublicLayout><About /></PublicLayout>} />
        <Route path="/opportunities" element={<PublicLayout><Opportunities /></PublicLayout>} />
        <Route path="/referral" element={<PublicLayout><Referral /></PublicLayout>} />
        <Route path="/signup" element={<PublicLayout><SignUp /></PublicLayout>} />
        <Route path="/login" element={<PublicLayout><Login /></PublicLayout>} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/terms-of-use" element={<TermsOfUse />} />
        <Route path="/onboarding" element={<Onboarding />} />

        {/* User Dashboard */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute allowedRoles={['user']}>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<DashboardHome />} />
          <Route path="survey" element={<Survey />} />
          <Route path="offers" element={<Offers />} />
          <Route path="more" element={<More />} />
          <Route path="profile" element={<Profile />} />
          <Route path="withdrawal" element={<Withdrawal />} />
          <Route path="referral" element={<Referr />} />
          <Route path="leaderboard" element={<Leaderboard />} />
          <Route path="support" element={<SupportChat />} />
        </Route>

        {/* Admin Dashboard */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRoles={['admin']}>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<AdminDashboardHome />} />
          <Route path="dashboard" element={<AdminDashboardHome />} />
          <Route path="users" element={<Users />} />
          <Route path="withdrawals" element={<Withdrawals />} />
          <Route path="referrals" element={<ReferralViews />} />
          <Route path="leaderboard" element={<AdminLeaderboard />} />
          <Route path="tasks" element={<Tasks />} />
          <Route path="settings" element={<Settings />} />
          <Route path="chat" element={<AdminChat />} />
          <Route path="spectators" element={<AdminSpectators />} />
          <Route path="spectators/add" element={<AddSpectators />} />
        </Route>

        {/* Spectator Dashboard */}
        <Route
          path="/spectator"
          element={
            <ProtectedRoute allowedRoles={['spectator']}>
              <SpectatorLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<SpectatorDashboard />} />
          <Route path="dashboard" element={<SpectatorDashboard />} />
          <Route path="chat" element={<SpectatorChat />} />
          <Route path="tasks" element={<SpectatorTasks />} />
          <Route path="profile" element={<SpectatorProfile />} />
        </Route>

        {/* Catch-all */}
        <Route path="*" element={<h1>404 - Page Not Found</h1>} />
      </Routes>
    </Suspense>
    </>
  );
}
