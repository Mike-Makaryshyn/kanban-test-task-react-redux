import { useState } from "react";
import { useSelector } from "react-redux";

import useGetIssues from "./api/useGetIssues";
import Issues from "./components/Issues/Issues";

import "./App.css";

const TEST_LINK = "https://github.com/facebook/react";

const App = () => {
  const [repoInput, setRepoInput] = useState(TEST_LINK);
  const { getIssues, isLoading } = useGetIssues();

  const handleLoadClick = async () => {
    const regex = /github\.com\/(.+)\/(.+)/;
    const matches = repoInput.match(regex);

    if (!matches || matches.length !== 3) {
      console.log("Invalid URL");
      return;
    }

    const owner = matches[1];
    const name = matches[2];

    // Construct API URL and fetch issues
    const urlFromInput = `https://api.github.com/repos/${owner}/${name}/issues`;

    await getIssues(urlFromInput);
  };

  const todoes = useSelector((state: any) => state.app.todo);
  const inProgress = useSelector((state: any) => state.app.inProgress);
  const done = useSelector((state: any) => state.app.done);

  return (
    <>
      <div>
        <input
          type="text"
          value={repoInput}
          onChange={(e) => setRepoInput(e.target.value)}
        />
        <button onClick={handleLoadClick} disabled={isLoading}>
          {isLoading ? "Loading..." : "Load Issues"}
        </button>
      </div>

      <div className="issues_wrapper">
        <Issues issues={todoes} />
        <Issues issues={inProgress} />
        <Issues issues={done} />
      </div>
    </>
  );
};

export default App;
