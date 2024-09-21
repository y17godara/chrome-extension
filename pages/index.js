import React, { createContext, useState, useEffect, useContext, useMemo, useCallback } from "react";
import Footer from "../components/navigaton/Footer";
import Header from "../components/navigaton/Header";
import Popup from "../components/core/popup";

const GlobalStateContext = createContext();

const isExtension = typeof chrome !== 'undefined' && chrome.runtime && chrome.runtime.id;

export const GlobalStateProvider = ({ children }) => {
  const [activePage, setActivePage] = useState("index");
  const [currentTabUrl, setCurrentTabUrl] = useState("");
  const [satus, setSatus] = useState({
    components: {},
    events: { data: {} },
    locale: { data: {} },
    storage: { data: {}, type: "extension" },
    settings: { showVersion: true }
  });

  // Load all state from Chrome storage and get current tab URL on component mount
  useEffect(() => {
    if (!isExtension) return;

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

    const getCurrentTabUrl = async () => {
      try {
        const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
        if (tab && tab.url) {
          setCurrentTabUrl(tab.url);
        }
      } catch (error) {
        console.error("Error getting current tab URL:", error);
      }
    };

    loadState();
    getCurrentTabUrl();

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

    // Set up tab change listener
    const tabChangeListener = (tabId, changeInfo, tab) => {
      if (changeInfo.status === 'complete' && tab.active) {
        setCurrentTabUrl(tab.url || "");
      }
    };

    chrome.tabs.onUpdated.addListener(tabChangeListener);

    // Clean up the listeners when the component unmounts
    return () => {
      chrome.storage.onChanged.removeListener(storageChangeListener);
      chrome.tabs.onUpdated.removeListener(tabChangeListener);
    };
  }, []);

  // Save state to Chrome storage whenever it changes
  useEffect(() => {
    if (!isExtension) return;
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
    currentTabUrl,
    currentTabUrl,
    isExtension
  }), [activePage, navigateToPage, satus, updateSettings, currentTabUrl, currentTabUrl, isExtension]);

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