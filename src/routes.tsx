import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from './store/useAuthStore';

// Public Pages
import { LandingPage } from './pages/public/Landing';
import { LoginPage } from './pages/public/Login';
import { AboutPage } from './pages/public/About';
import { NotFoundPage } from './pages/public/NotFound';

// Layout
import { AppShell } from './components/layout/AppShell';

// App Pages
import { DashboardPage } from './pages/app/Dashboard';
import { DisposePage } from './pages/app/Dispose';
import { BinsPage } from './pages/app/Bins';
import { TrackingPage } from './pages/app/Tracking';
import { AiSorterPage } from './pages/app/AiSorter';
import { MarketplacePage } from './pages/app/Marketplace';
import { ListingDetailPage } from './pages/app/ListingDetail';
import { LedgerPage } from './pages/app/Ledger';
import { RewardsPage } from './pages/app/Rewards';
import { ImpactPage } from './pages/app/Impact';
import { AdminPage } from './pages/app/Admin';
import { FleetPage } from './pages/app/Fleet';
import { RecyclerPage } from './pages/app/Recycler';
import { RevenuePage } from './pages/app/Revenue';
import { CanvasPage } from './pages/app/Canvas';
import { NotificationsPage } from './pages/app/Notifications';
import { SettingsPage } from './pages/app/Settings';

const RoleHomeRedirect: React.FC = () => {
  const role = useAuthStore((s) => s.role);
  if (role === 'admin') return <Navigate to="/app/admin" replace />;
  if (role === 'recycler') return <Navigate to="/app/recycler" replace />;
  if (role === 'driver') return <Navigate to="/app/fleet" replace />;
  return <Navigate to="/app/dashboard" replace />;
};

export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Public Pages */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/about" element={<AboutPage />} />

      {/* App Shell and Nested Pages */}
      <Route path="/app" element={<AppShell />}>
        <Route index element={<RoleHomeRedirect />} />
        <Route path="dashboard" element={<DashboardPage />} />
        <Route path="dispose" element={<DisposePage />} />
        <Route path="bins" element={<BinsPage />} />
        <Route path="tracking" element={<TrackingPage />} />
        <Route path="ai-sorter" element={<AiSorterPage />} />
        <Route path="marketplace" element={<MarketplacePage />} />
        <Route path="marketplace/:id" element={<ListingDetailPage />} />
        <Route path="ledger" element={<LedgerPage />} />
        <Route path="rewards" element={<RewardsPage />} />
        <Route path="impact" element={<ImpactPage />} />
        <Route path="admin" element={<AdminPage />} />
        <Route path="fleet" element={<FleetPage />} />
        <Route path="recycler" element={<RecyclerPage />} />
        <Route path="revenue" element={<RevenuePage />} />
        <Route path="canvas" element={<CanvasPage />} />
        <Route path="notifications" element={<NotificationsPage />} />
        <Route path="settings" element={<SettingsPage />} />
      </Route>

      {/* 404 Fallback */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};
