import { useGlobalState } from "../../pages/index";

export default function Popup() {
  const { activePage, navigateToPage, satus, setSatus } = useGlobalState();
  return (
    <div className="content">
      {activePage === "index" && (
        <div>
          <h1>Home</h1>
        </div>
      )}
      {activePage === "new" && (
        <div>
          <h1>New</h1>
        </div>
      )}
      {activePage === "settings" && (
        <div>
          <h1>Settings</h1>
          <code>
            <pre>{JSON.stringify(satus, null, 2)}</pre>
          </code>
            <button
                onClick={() => setSatus((prev) => ({
                ...prev,
                settings: {
                    ...prev.settings,
                    showVersion: !prev.settings.showVersion
                }
                }))}
            >
                Toggle Version
            </button>
        </div>
      )}
      <div>
        <button onClick={() => navigateToPage("index")}>Home</button>
        <button onClick={() => navigateToPage("new")}>New</button>
        <button onClick={() => navigateToPage("settings")}>Settings</button>
      </div>
    </div>
  );
}
