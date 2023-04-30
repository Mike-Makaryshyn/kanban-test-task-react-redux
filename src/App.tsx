import { useState } from "react";
import { useSelector } from "react-redux";

import useGetIssues from "./api/useGetIssues";
import Issues from "./components/Issues/Issues";

import Button from "react-bootstrap/Button";

import "./App.css";

const TEST_LINK = "https://github.com/facebook/react";

const App = () => {
  const [repoInput, setRepoInput] = useState("");
  const { getIssues, isLoading } = useGetIssues();

  const todoes = useSelector((state: any) => state.app.todo);
  const inProgress = useSelector((state: any) => state.app.inProgress);
  const done = useSelector((state: any) => state.app.done);

  const columns = [
    { name: "todo", title: "Todo", issues: todoes },
    { name: "in-progress", title: "In Progress", issues: inProgress },
    { name: "done", title: "Done", issues: done },
  ];

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

  const pasteExampleRepo = async () => {
    setRepoInput(() => TEST_LINK);
  };

  return (
    <>
      <div className="d-flex">
        <input
          type="text"
          value={repoInput}
          onChange={(e) => setRepoInput(e.target.value)}
          className="form-control me-3"
        />
        <Button
          className="w-100"
          variant="primary"
          onClick={handleLoadClick}
          disabled={isLoading}
        >
          {isLoading ? "Loading..." : "Load Issues"}
        </Button>
      </div>

      <a href="#" onClick={pasteExampleRepo}>
       Paste example repo
      </a>

      <div className="d-flex mt-4 me-4 p-4 rounded w-100">
        {columns.map((column, idx) => (
          <div key={idx} className="issues_item">
            <h2 className="fw-bold mb-4">{column.title}</h2>
            <Issues issues={column.issues} />
          </div>
        ))}
      </div>
    </>
  );
};

export default App;
