import "./App.css";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Frontpage from "./pages/frontpage";
import Navbar from "./pages/navbar";
import Review from "./pages/review";
import Verify from "./pages/verify";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Frontpage />} />
        <Route index element={<Frontpage />} />
        <Route path="create" element={<Verify />} />
        {/* <Route path="edit" element={<Edit />} />
        <Route path="list" element={<List />} /> */}
        <Route path="review" element={<Review />} />
      </Routes>
    </Router>
  );
}

export default App;
