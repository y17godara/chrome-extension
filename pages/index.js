import React, { createContext, useState, useContext, useMemo, useCallback } from "react";

import Footer from "../components/navigaton/Footer";
import Header from "../components/navigaton/Header";
import Popup from "../components/core/popup";
// import { GlobalStateProvider, useGlobalState } from "../../pages/index";

// Create a context
const GlobalStateContext = createContext();

// Create a provider component
export const GlobalStateProvider = ({ children }) => {
  const [activePage, setActivePage] = useState("index");
  const [satus, setSatus] = useState({
    components: {},
    events: {
      data: {}
    },
    locale: {
      data: {}
    },
    storage: {
      data: {},
      type: "extension"
    },
    settings: {
      showVersion: true,
    }
  });

  // Memoize the navigateToPage function
  const navigateToPage = useCallback((page) => {
    if (["index", "new", "settings"].includes(page)) {
      setActivePage(page);
    }
  }, []);

  // Update settings state
  const updateSettings = useCallback((settings) => {
    setSatus((prev) => ({
      ...prev,
      settings: {
        ...prev.settings,
        ...settings
      }
    }));
  }, []);

  // Memoize the state value to avoid re-renders
  const contextValue = useMemo(() => ({
    activePage,
    navigateToPage,
    satus,
    setSatus,
    updateSettings,
  }), [activePage, navigateToPage, satus, setSatus, updateSettings]);

  return (
    <GlobalStateContext.Provider value={contextValue}>
      {children}
    </GlobalStateContext.Provider>
  );
};

// Create a custom hook for accessing the global state
export const useGlobalState = () => useContext(GlobalStateContext);

function HomeComponent() {
  return (
    <main className="container">
      <Header />
      <Popup />
      <Footer />
    </main>
  );
}

export default function Home() {
  return (
    <GlobalStateProvider>
      <HomeComponent />
    </GlobalStateProvider>
  );
}