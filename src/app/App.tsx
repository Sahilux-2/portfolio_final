import { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router";
import PortfolioWeb from "./imports/PortfolioWeb";
import CaseStudyDetail from "./pages/CaseStudyDetail";
import { SmoothScroll } from "./components/SmoothScroll";
import { AudioProvider } from "./context/AudioContext";

function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0);
      window.dispatchEvent(new Event("scroll-reset"));
    }
  }, [pathname, hash]);

  return null;
}

export default function App() {
  return (
    <BrowserRouter>
      <AudioProvider>
        <ScrollToTop />
        <Routes>
          <Route
            path="/"
            element={
              <SmoothScroll>
                <PortfolioWeb />
              </SmoothScroll>
            }
          />
          <Route path="/work/:slug" element={<CaseStudyDetail />} />
          <Route
            path="/work"
            element={
              <SmoothScroll>
                <PortfolioWeb />
              </SmoothScroll>
            }
          />
          <Route
            path="*"
            element={
              <SmoothScroll>
                <PortfolioWeb />
              </SmoothScroll>
            }
          />
        </Routes>
      </AudioProvider>
    </BrowserRouter>
  );
}