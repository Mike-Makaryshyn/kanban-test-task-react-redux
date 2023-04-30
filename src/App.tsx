import { useState } from "react";
import { useSelector } from "react-redux";

import useGetIssues from "./api/useGetIssues";
import Column from "./components/Column/Column";

import Button from "react-bootstrap/Button";
import "./App.css";

const EXAMPLE_URL = "https://api.github.com/repos/facebook/react/issues";

const App = () => {
  const [repoInput, setRepoInput] = useState("");
  const [owner, setOwner] = useState("");
  const [name, setName] = useState("");
  const { getIssues, isLoading } = useGetIssues();
  const [alertMessage, setAlertMessage] = useState<string | null>(null);

  const { todo, inProgress, done } = useSelector((state: any) => state.app);

  const columns = [
    { name: "todo", title: "Todo", issues: todo },
    { name: "inProgress", title: "In Progress", issues: inProgress },
    { name: "done", title: "Done", issues: done },
  ];

  const handleLoadClick = async () => {
    const regex = /github\.com\/(.+)\/(.+)/;
    const matches = repoInput.match(regex);

    if (!matches || matches.length !== 3) {
      setAlertMessage("Invalid URL");

      setTimeout(() => {
        setAlertMessage(null);
      }, 2000);

      return;
    }

    setOwner(() => matches[1]);
    setName(() => matches[2]);

    const urlFromInput = `https://api.github.com/repos/${matches[1]}/${matches[2]}/issues`;

    await getIssues(urlFromInput);
  };

  const handleExampleRepo = async (e: React.MouseEvent) => {
    e.preventDefault();
    setOwner(() => "facebook");
    setName(() => "react");
    await getIssues(EXAMPLE_URL);
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

      <a href="#" onClick={handleExampleRepo}>
        Load facebook/react repo as an example
      </a>

      {owner && !alertMessage && (
        <div className="mt-4" style={{ color: "#6274D3" }}>
          {owner} {">"} {name}
        </div>
      )}

      <div className="d-flex mt-1 me-4 mt-3 rounded w-100">
        {columns.map((column, idx) => (
          <div key={idx} className="issues_item">
            <h2 className="fw-bold mb-4">{column.title}</h2>
            <Column issues={column.issues} />
          </div>
        ))}
      </div>

      {alertMessage && (
        <div
          className="alert alert-danger position-absolute bottom-0 end-0 m-3"
          style={{ zIndex: 100 }}
        >
          {alertMessage}
        </div>
      )}
    </>
  );
};

export default App;
