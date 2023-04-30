import { useState } from "react";
import { useSelector } from "react-redux";

import useGetIssues from "./api/useGetIssues";
import Column from "./components/Column/Column";

import Button from "react-bootstrap/Button";
import "./App.css";

import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";
import { useDispatch } from "react-redux";
import { moveIssue } from "./redux/slices/appSlice";

const EXAMPLE_URL = "https://api.github.com/repos/facebook/react/issues";

const App = () => {
  const [repoInput, setRepoInput] = useState("");
  const [owner, setOwner] = useState("");
  const [name, setName] = useState("");
  const { getIssues, isLoading } = useGetIssues();
  const [alertMessage, setAlertMessage] = useState<string | null>(null);

  const state = useSelector((state: any) => state.app);
  const { todo, inProgress, done } = state;

  const dispatch = useDispatch();

  const columns = [
    { name: "todo", title: "Todo", issues: todo },
    { name: "inProgress", title: "In Progress", issues: inProgress },
    { name: "done", title: "Done", issues: done },
  ];

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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

  const handleExampleRepo = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setOwner(() => "facebook");
    setName(() => "react");
    await getIssues(EXAMPLE_URL);
  };

  const handleDragDrop = (results: DropResult) => {
    const { source, destination } = results;
    if (!destination) return;

    const fromColumn = source.droppableId as "todo" | "inProgress" | "done";
    const toColumn = destination.droppableId as "todo" | "inProgress" | "done";

    const issueId = results.draggableId;
    const toIndex = destination.index;

    dispatch(moveIssue({ issueId, fromColumn, toColumn, toIndex }));
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
          {owner} {">"} {name}
        </div>
      )}

      <DragDropContext onDragEnd={handleDragDrop}>
        <div className="d-flex mt-1 me-4 mt-3 rounded w-100">
          {columns.map((column, idx) => (
            <div key={idx} className="issues_item">
              <h3 className="fw-bold mb-4">{column.title}</h3>
              <Droppable droppableId={column.name}>
                {(provided) => (
                  <div {...provided.droppableProps} ref={provided.innerRef}>
                    <Column issues={column.issues} />
                  </div>
                )}
              </Droppable>
            </div>
          ))}
        </div>
      </DragDropContext>

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
