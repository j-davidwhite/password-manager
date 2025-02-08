import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"; // Add Outlet here
import Wallet from "./components/Wallet/Wallet.jsx";
import Vault from "./components/Vault.jsx";
import { useConnection } from "@solana/wallet-adapter-react";
import Dashboard from "./pages/Dashboard/Dashboard.js";
import Login from "./pages/Login.js";
import AllPasswords from "./pages/AllPasswords/AllPasswords.js";
import Notifications from "./pages/Notifications/Notifications.js";
import SharedPasswords from "./pages/sharedPasswords/SharedPasswords.js";
import Settings from "./pages/Settings/Settings";
import Profile from "./components/Profile/Profile.jsx";
import Appearance from "./components/Appearance/Appearance.jsx";
import Account from "./components/Account/Account.jsx";
import { AvatarProvider } from "./context/AvatarContext";
import { BackgroundProvider } from "./context/BackgroundContext";

const App = () => {
  const { connection } = useConnection();
  const [isAuthenticated, setIsAuthenticated] = useState(true); // always true for debugging

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };


  return (
    <BackgroundProvider>
      <AvatarProvider>
        <Router>
          <div className="app">
            <Routes>
              {isAuthenticated ? (
                <Route path="/" element={<Dashboard />}>
                  <Route path="all-passwords" element={<AllPasswords />} />
                  <Route path="notifications" element={<Notifications />} />
                  <Route
                    path="shared-passwords"
                    element={<SharedPasswords />}
                  />
                  <Route path="settings" element={<Settings />}>
                    <Route path="profile" element={<Profile />} />
                    <Route path="account" element={<Account />} />
                    <Route
                      path="wallet"
                      element={<Wallet connection={connection} />}
                    />
                    <Route path="appearance" element={<Appearance />} />
                  </Route>
                </Route>
              ) : (
                <Route path="/login" element={<Login />} />
              )}
            </Routes>
          </div>
        </Router>
      </AvatarProvider>
    </BackgroundProvider>
  );
};

export default App;
