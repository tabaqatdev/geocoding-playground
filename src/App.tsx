import { LanguageProvider, useLanguage } from "@/i18n/context";
import { GeoSDKProvider } from "@/context/geo-sdk-context";
import { Header } from "@/components/Header";
import { Playground } from "@/components/Playground";
import { Toaster } from "@/components/ui/sonner";

function AppContent() {
  const { language } = useLanguage();

  return (
    <>
      <div className="min-h-screen bg-background">
        <Header />
        <Playground />
      </div>
      <Toaster position={language === "ar" ? "bottom-left" : "bottom-right"} richColors />
    </>
  );
}

function App() {
  return (
    <LanguageProvider>
      <GeoSDKProvider>
        <AppContent />
      </GeoSDKProvider>
    </LanguageProvider>
  );
}

export default App;
