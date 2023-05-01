import { useState } from "react";

import useGetIssues from "../../api/useGetIssues";
import Button from "react-bootstrap/Button";

const EXAMPLE_URL = "https://api.github.com/repos/facebook/react/issues";

const Form = () => {
  const [repoInput, setRepoInput] = useState("");
  const [owner, setOwner] = useState("");
  const [name, setName] = useState("");
  const { getIssues, isLoading } = useGetIssues();
  const [alertMessage, setAlertMessage] = useState<string | null>(null);

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const regex = /github\.com\/(.+)\/(.+)/;
    const matches = repoInput.trim().match(regex);

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

  const handleExampleRepo = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setOwner(() => "facebook");
    setName(() => "react");
    await getIssues(EXAMPLE_URL);
  };

  return (
    <>
      <form action="#" onSubmit={handleFormSubmit} className="d-flex">
        <input
          type="text"
          value={repoInput}
          placeholder="Github repository link"
          onChange={(e) => setRepoInput(e.target.value)}
          className="form-control me-3"
        />
        <Button
          className="w-100"
          type="submit"
          variant="primary"
          disabled={isLoading}
        >
          {isLoading ? "Loading..." : "Load Issues"}
        </Button>
      </form>

      <a href="#" onClick={handleExampleRepo}>
        Load facebook/react repo as an example
      </a>

      {owner && !alertMessage && (
        <div className="mt-4" style={{ color: "#6274D3" }}>
          <a target="_blank" href={`https://github.com/${owner}`}>
            {owner}
          </a>{" "}
          {">"}{" "}
          <a target="_blank" href={`https://github.com/${owner}/${name}`}>
            {name}
          </a>
        </div>
      )}

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

export default Form;
