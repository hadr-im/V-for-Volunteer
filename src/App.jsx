import { useCallback, useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Preloader from "./components/Preloader";
import "./index.css";

// The boarding sequence runs on a cold load of the landing page only —
// never in front of someone who deep-linked straight to the form.
const RUN_PRELOADER = !window.location.pathname.includes("register");

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  const [loading, setLoading] = useState(RUN_PRELOADER);
  const finish = useCallback(() => setLoading(false), []);

  // Pin the page to the top while the panel is up, so the hero is
  // guaranteed to be what's revealed underneath it.
  useEffect(() => {
    if (!loading) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [loading]);

  return (
    <Router>
      <ScrollToTop />

      <AnimatePresence>{loading && <Preloader onDone={finish} />}</AnimatePresence>

      <Routes>
        <Route path="/" element={<Home ready={!loading} />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}
