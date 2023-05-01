import { useSelector, useDispatch } from "react-redux";
import { DragDropContext, Droppable, DropResult } from "react-beautiful-dnd";
import { moveIssue } from "./redux/slices/appSlice";

import Form from "./components/Form";
import Column from "./components/Column";

import "./App.css";

const App = () => {
  const dispatch = useDispatch();
  const state = useSelector((state: any) => state.app);
  const { todo, inProgress, done } = state;

  const columns = [
    { name: "todo", title: "Todo", issues: todo },
    { name: "inProgress", title: "In Progress", issues: inProgress },
    { name: "done", title: "Done", issues: done },
  ];

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
      <Form />
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
    </>
  );
};

export default App;
