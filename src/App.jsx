import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminRoutes from "./routes/AdminRoutes";

export default function App() {
  return (
    <Router>
        <Routes>
          <Route path="/*" element={<AdminRoutes />} />
        </Routes>
    </Router>
  );
}
