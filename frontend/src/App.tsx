import { useRef } from "react";
import Header from "./components/Header";
import HomeSection from "./components/sections/HomeSection";
import DetectionSection from "./components/sections/DetectionSection";
import ApiTestSection from "./components/sections/ApiTestSection";
import AboutSection from "./components/sections/AboutSection";
import { useCheckUrl } from "./hooks/useCheckUrl";

function App() {
  const { result, status, error, check } = useCheckUrl();
  const detectionRef = useRef<HTMLDivElement>(null);

  const scrollToDetection = () => {
    detectionRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      <Header />

      <HomeSection onScanNow={scrollToDetection} />
      <DetectionSection
        ref={detectionRef}
        status={status}
        result={result}
        error={error}
        onSubmit={check}
      />
      <ApiTestSection />
      <AboutSection />
    </div>
  );
}

export default App;
