import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import LiveMonitor from "./pages/LiveMonitor";
import AlertHistory from "./pages/AlertHistory";
import Trends from "./pages/Trends";
import ChildProfile from "./pages/ChildProfile";
import Caregivers from "./pages/Caregivers";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route element={<ProtectedRoute><Layout /></ProtectedRoute>}>
          <Route path="/live" element={<LiveMonitor />} />
          <Route path="/alerts" element={<AlertHistory />} />
          <Route path="/trends" element={<Trends />} />
          <Route path="/profile" element={<ChildProfile />} />
          <Route path="/caregivers" element={<Caregivers />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}