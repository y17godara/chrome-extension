import React, { createContext, useState, useEffect, useContext, useMemo, useCallback } from "react";
import Footer from "../components/navigaton/Footer";
import Header from "../components/navigaton/Header";
import Popup from "../components/core/popup";

const GlobalStateContext = createContext();

export const GlobalStateProvider = ({ children }) => {
  const [activePage, setActivePage] = useState("index");
  const [satus, setSatus] = useState({
    components: {},
    events: { data: {} },
    locale: { data: {} },
    storage: { data: {}, type: "extension" },
    settings: { showVersion: true }
  });

  // Load all state from Chrome storage on component mount
  useEffect(() => {
    const loadState = async () => {
      try {
        const result = await chrome.storage.local.get(["y17godaraContentCreators"]);
        if (result.y17godaraContentCreators) {
          setSatus(result.y17godaraContentCreators);
          setActivePage(result.y17godaraContentCreators.activePage || "index");
        }
      } catch (error) {
        console.error("Error loading state:", error);
      }
    };

    loadState();

    // Set up the storage change listener
    const storageChangeListener = (changes, namespace) => {
      for (let [key, { oldValue, newValue }] of Object.entries(changes)) {
        console.log(
          `Storage key "${key}" in namespace "${namespace}" changed.`,
          `Old value was "${JSON.stringify(oldValue)}", new value is "${JSON.stringify(newValue)}".`
        );
      }
    };

    chrome.storage.onChanged.addListener(storageChangeListener);

    // Clean up the listener when the component unmounts
    return () => {
      chrome.storage.onChanged.removeListener(storageChangeListener);
    };
  }, []);

  // Save state to Chrome storage whenever it changes
  useEffect(() => {
    const saveState = async () => {
      try {
        await chrome.storage.local.set({ y17godaraContentCreators: { ...satus, activePage } });
        console.log("State saved");
      } catch (error) {
        console.error("Error saving state:", error);
      }
    };

    saveState();
  }, [satus, activePage]);

  const navigateToPage = useCallback((page) => {
    if (["index", "new", "settings"].includes(page)) {
      setActivePage(page);
    }
  }, []);

  const updateSettings = useCallback((newSettings) => {
    setSatus((prev) => ({
      ...prev,
      settings: { ...prev.settings, ...newSettings }
    }));
  }, []);

  const contextValue = useMemo(() => ({
    activePage,
    navigateToPage,
    satus,
    setSatus,
    updateSettings,
  }), [activePage, navigateToPage, satus, updateSettings]);

  return (
    <GlobalStateContext.Provider value={contextValue}>
      {children}
    </GlobalStateContext.Provider>
  );
};

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