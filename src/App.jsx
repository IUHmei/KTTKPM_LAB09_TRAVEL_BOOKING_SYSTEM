import { Navigate, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import BookingPage from "./pages/BookingPage";
import LoginPage from "./pages/LoginPage";
import TourDetailPage from "./pages/TourDetailPage";
import TourListPage from "./pages/TourListPage";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/tours" element={<TourListPage />} />
        <Route path="/tours/:id" element={<TourDetailPage />} />
        <Route path="/booking/:tourId" element={<BookingPage />} />
      </Route>
      <Route path="*" element={<Navigate to="/tours" replace />} />
    </Routes>
  );
}

export default App;
