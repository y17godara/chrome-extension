import React, { useState } from "react";
import Footer from "../components/navigaton/Footer";
import Header from "../components/navigaton/Header";

const Pages = {
  INDEX: "index",
  NEW: "new",
};

export default function Home() {
  const [activePage, setActivePage] = useState(Pages.INDEX);

  const navigateToPage = (page) => {
    if (Object.values(Pages).includes(page)) {
      setActivePage(page);
    }
  };
  return (
    <>
      <main
        className="container"
      >
        <Header />
        <div className="content">
          {activePage === Pages.INDEX && (
            <div>
              <h1>Home</h1>
              <button onClick={() => navigateToPage(Pages.NEW)}>New</button>
            </div>
          )}
          {activePage === Pages.NEW && (
            <div>
              <h1>New</h1>
              <button onClick={() => navigateToPage(Pages.INDEX)}>Home</button>
            </div>
          )}
        </div>
        <Footer />
      </main>
    </>
  );
}
